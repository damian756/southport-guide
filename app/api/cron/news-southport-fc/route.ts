import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchUnsplashImage } from "@/lib/unsplash";

// Runs every 6 hours (configured in vercel.json).
// Pulls Southport FC news from their official RSS feed.
// Auto-publishes — official club content.

const FEED_URL = "https://www.southportfc.net/news/rss.xml";

function extractText(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/${tag}>`, "s"));
  return match?.[1]?.trim() ?? "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseItems(xml: string): Array<{ title: string; description: string; link: string; guid: string; pubDate: string }> {
  const items: Array<{ title: string; description: string; link: string; guid: string; pubDate: string }> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    items.push({
      title: stripHtml(extractText(block, "title")),
      description: stripHtml(extractText(block, "description")),
      link: extractText(block, "link"),
      guid: extractText(block, "guid"),
      pubDate: extractText(block, "pubDate"),
    });
  }
  return items;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let xml: string;
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent": "SouthportGuide/1.0 (contact@southportguide.co.uk)",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    // Southport FC may not have a standard RSS feed — log and return gracefully
    return NextResponse.json(
      { error: "Failed to fetch Southport FC feed", details: String(err) },
      { status: 502 }
    );
  }

  const items = parseItems(xml);
  let inserted = 0;
  let skipped = 0;

  for (const item of items) {
    if (!item.title) continue;

    const externalId = `southport-fc-${item.guid || item.link}`;

    const existing = await prisma.newsItem.findUnique({ where: { externalId } });
    if (existing) {
      skipped++;
      continue;
    }

    const image = await fetchUnsplashImage("sport");
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

    const summary = item.description?.length > 30
      ? item.description.slice(0, 600)
      : `Latest news from Southport FC. ${item.title}.`;

    await prisma.newsItem.create({
      data: {
        title: item.title.slice(0, 200),
        summary,
        category: "sport",
        source: "southport-fc",
        sourceUrl: item.link || "https://www.southportfc.net/news",
        externalId,
        imageUrl: image?.url ?? null,
        imageCredit: image?.credit ?? null,
        status: "auto_published",
        publishedAt: pubDate,
      },
    });
    inserted++;
  }

  return NextResponse.json({
    ok: true,
    fetched: items.length,
    inserted,
    skipped,
  });
}
