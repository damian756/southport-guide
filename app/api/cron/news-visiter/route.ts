import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseRssItems } from "@/lib/parse-rss";
import { detectNewsCategory } from "@/lib/categorize-news";

// Runs every 4 hours (configured in vercel.json).
// Stores raw items as pending_review — NO Claude call here.
// Claude rewrites only when admin approves (saves credits on rejected items).

const FEED_URL =
  "https://news.google.com/rss/search?q=southport+merseyside+news&hl=en-GB&gl=GB&ceid=GB:en";
const MAX_AGE_DAYS = 14;

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
      { error: "Failed to fetch feed", details: String(err) },
      { status: 502 }
    );
  }

  const items = parseRssItems(xml);
  let inserted = 0;
  let skipped = 0;
  let tooOld = 0;

  for (const item of items) {
    if (!item.title) continue;
    if (!item.guid && !item.link) continue;

    if (item.pubDate) {
      const ageMs = Date.now() - new Date(item.pubDate).getTime();
      if (ageMs > MAX_AGE_DAYS * 86400000) { tooOld++; continue; }
    }

    const externalId = `southport-news-${item.guid || item.link}`;
    const existing = await prisma.newsItem.findUnique({ where: { externalId } });
    if (existing) { skipped++; continue; }

    const raw = item.description || item.title;
    const category = detectNewsCategory(`${item.title} ${raw}`);

    await prisma.newsItem.create({
      data: {
        title: item.title.slice(0, 200),
        summary: raw.slice(0, 600),
        rawContent: raw.slice(0, 2000),
        category,
        source: "visiter",
        sourceUrl: item.link || null,
        externalId,
        status: "pending_review",
        publishedAt: null,
      },
    });
    inserted++;
  }

  return NextResponse.json({ ok: true, fetched: items.length, inserted, skipped, tooOld });
}
