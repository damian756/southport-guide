import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchUnsplashImage } from "@/lib/unsplash";
import { rewriteAsTerry } from "@/lib/rewrite-as-terry";

// Runs every 4 hours (configured in vercel.json).
// Pulls Southport Visiter RSS feed (Reach PLC local news).
// Rewrites each item in Terry's voice via Claude/OpenRouter.
// Saves as pending_review — requires admin approval before publishing.

const FEED_URL = "https://www.southportvisiter.co.uk/news/?service=rss";

const CATEGORY_MAP: Array<{ keywords: string[]; category: string }> = [
  { keywords: ["restaurant", "cafe", "food", "dining", "opening", "menu", "eat", "pub", "bar"], category: "food-drink" },
  { keywords: ["shop", "retail", "store", "business", "opens", "launch", "company"], category: "business" },
  { keywords: ["southport fc", "football", "match", "sport", "game", "rugby", "cricket"], category: "sport" },
  { keywords: ["council", "sefton", "planning", "development", "vote", "election", "mp", "councillor"], category: "council" },
  { keywords: ["event", "festival", "market", "show", "concert", "airshow", "flower show"], category: "events" },
  { keywords: ["police", "crime", "incident", "arrest", "appeal", "missing", "assault"], category: "crime-safety" },
  { keywords: ["property", "house", "homes", "housing", "rent"], category: "property" },
  { keywords: ["flood", "weather", "storm", "coast", "sea", "beach"], category: "community" },
  { keywords: ["planning", "application", "development", "building"], category: "planning" },
];

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  for (const { keywords, category } of CATEGORY_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) return category;
  }
  return "community";
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
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent": "SouthportGuide/1.0 (contact@southportguide.co.uk)",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch Visiter feed", details: String(err) },
      { status: 502 }
    );
  }

  const items = parseItems(xml);
  let inserted = 0;
  let skipped = 0;
  let rewriteFailed = 0;

  for (const item of items) {
    if (!item.title) continue;

    const externalId = `visiter-${item.guid || item.link}`;

    const existing = await prisma.newsItem.findUnique({ where: { externalId } });
    if (existing) {
      skipped++;
      continue;
    }

    const category = detectCategory(`${item.title} ${item.description}`);
    const rewritten = await rewriteAsTerry(item.title, item.description);

    if (!rewritten) rewriteFailed++;

    const image = await fetchUnsplashImage(category);
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

    await prisma.newsItem.create({
      data: {
        title: (rewritten?.title ?? item.title).slice(0, 200),
        summary: rewritten?.summary ?? item.description.slice(0, 600),
        rawContent: item.description.slice(0, 2000),
        category,
        source: "visiter",
        sourceUrl: item.link || null,
        externalId,
        imageUrl: image?.url ?? null,
        imageCredit: image?.credit ?? null,
        status: "pending_review",
        publishedAt: null,
      },
    });
    inserted++;
  }

  return NextResponse.json({
    ok: true,
    fetched: items.length,
    inserted,
    skipped,
    rewriteFailed,
  });
}
