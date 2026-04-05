import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchUnsplashImage } from "@/lib/unsplash";

// Runs every 4 hours (configured in vercel.json).
// Pulls Merseyside Police news via Google News RSS (official site blocks server requests).
// Filters to Southport-relevant items only.
// Auto-publishes — factual news data, no rewrite needed.

const FEED_URL =
  "https://news.google.com/rss/search?q=merseyside+police+southport&hl=en-GB&gl=GB&ceid=GB:en";

const SOUTHPORT_KEYWORDS = [
  "southport",
  "birkdale",
  "ainsdale",
  "churchtown",
  "formby",
  "sefton",
  "pr8",
  "pr9",
];

function isLocallyRelevant(text: string): boolean {
  const lower = text.toLowerCase();
  return SOUTHPORT_KEYWORDS.some((kw) => lower.includes(kw));
}

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
    const res = await fetch(FEED_URL, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch police RSS", details: String(err) },
      { status: 502 }
    );
  }

  const items = parseItems(xml);
  let inserted = 0;
  let skipped = 0;
  let irrelevant = 0;

  for (const item of items) {
    const combined = `${item.title} ${item.description}`;

    if (!isLocallyRelevant(combined)) {
      irrelevant++;
      continue;
    }

    const externalId = `police-${item.guid || item.link}`;

    const existing = await prisma.newsItem.findUnique({ where: { externalId } });
    if (existing) {
      skipped++;
      continue;
    }

    const image = await fetchUnsplashImage("crime-safety");

    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

    await prisma.newsItem.create({
      data: {
        title: item.title.slice(0, 200),
        summary: item.description.slice(0, 1000),
        category: "crime-safety",
        source: "merseyside-police",
        sourceUrl: item.link || "https://news.google.com/search?q=merseyside+police+southport",
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
    irrelevant,
  });
}
