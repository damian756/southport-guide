import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchUnsplashImage } from "@/lib/unsplash";
import { rewriteAsTerry } from "@/lib/rewrite-as-terry";
import { parseRssItems } from "@/lib/parse-rss";

// Runs every 4 hours (configured in vercel.json).
// Pulls Stand Up For Southport RSS feed.
// Rewrites each item in Terry's voice via Claude — goes to pending_review for approval.

const FEED_URL = "https://standupforsouthport.com/feed/";

const CATEGORY_MAP: Array<{ keywords: string[]; category: string }> = [
  { keywords: ["restaurant", "cafe", "food", "dining", "opening", "menu", "eat", "pub", "bar", "tikka", "pizza", "curry"], category: "food-drink" },
  { keywords: ["shop", "retail", "store", "business", "opens", "launch", "market"], category: "business" },
  { keywords: ["southport fc", "football", "match", "sport", "game", "rugby", "cricket", "haig avenue"], category: "sport" },
  { keywords: ["council", "sefton", "planning", "development", "vote", "election", "mp", "councillor"], category: "council" },
  { keywords: ["event", "festival", "market", "show", "concert", "airshow", "flower show", "bee day", "remembrance"], category: "events" },
  { keywords: ["police", "crime", "incident", "arrest", "appeal", "missing", "assault", "jailed"], category: "crime-safety" },
  { keywords: ["property", "house", "homes", "housing", "rent"], category: "property" },
  { keywords: ["flood", "weather", "storm", "coast", "sea", "beach"], category: "community" },
  { keywords: ["planning", "application", "development", "building", "demolish"], category: "planning" },
];

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  for (const { keywords, category } of CATEGORY_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) return category;
  }
  return "community";
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
      headers: { "User-Agent": "SouthportGuide/1.0 (contact@southportguide.co.uk)" },
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch SUFS feed", details: String(err) },
      { status: 502 }
    );
  }

  const items = parseRssItems(xml);
  let inserted = 0;
  let skipped = 0;
  let rewriteFailed = 0;

  for (const item of items) {
    if (!item.title) continue;

    const externalId = `sufs-${item.guid || item.link}`;
    if (!item.guid && !item.link) continue;

    const existing = await prisma.newsItem.findUnique({ where: { externalId } });
    if (existing) { skipped++; continue; }

    const category = detectCategory(`${item.title} ${item.description}`);
    const rewritten = await rewriteAsTerry(item.title, item.description || item.title);
    if (!rewritten) rewriteFailed++;

    const image = await fetchUnsplashImage(category);
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

    await prisma.newsItem.create({
      data: {
        title: (rewritten?.title ?? item.title).slice(0, 200),
        summary: rewritten?.summary ?? item.description.slice(0, 600),
        rawContent: item.description.slice(0, 2000),
        category,
        source: "sufs",
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

  return NextResponse.json({ ok: true, fetched: items.length, inserted, skipped, rewriteFailed });
}
