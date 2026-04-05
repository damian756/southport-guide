import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchUnsplashImage } from "@/lib/unsplash";
import { rewriteAsTerry } from "@/lib/rewrite-as-terry";
import { parseRssItems } from "@/lib/parse-rss";
import { makeNewsSlug } from "@/lib/slugify";

// Runs every 4 hours (configured in vercel.json).
// Pulls Merseyside Police / crime news via Google News RSS scoped to Southport.
// Rewrites each item in Terry's voice — goes to pending_review for approval.

const FEED_URL =
  "https://news.google.com/rss/search?q=merseyside+police+southport&hl=en-GB&gl=GB&ceid=GB:en";
const MAX_NEW = 6;

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
      { error: "Failed to fetch Google News RSS", details: String(err) },
      { status: 502 }
    );
  }

  const items = parseRssItems(xml);
  let inserted = 0;
  let skipped = 0;
  let rewriteFailed = 0;

  for (const item of items) {
    if (inserted >= MAX_NEW) break;
    if (!item.title) continue;

    const externalId = `police-${item.guid || item.link}`;
    if (!item.guid && !item.link) continue;

    const existing = await prisma.newsItem.findUnique({ where: { externalId } });
    if (existing) { skipped++; continue; }

    const rewritten = await rewriteAsTerry(item.title, item.description || item.title);
    if (!rewritten) rewriteFailed++;

    const image = await fetchUnsplashImage("crime-safety");
    const title = (rewritten?.title ?? item.title).slice(0, 200);
    const id = crypto.randomUUID();
    const slug = makeNewsSlug(title, id);

    await prisma.newsItem.create({
      data: {
        id,
        slug,
        title,
        summary: rewritten?.body ?? rewritten?.teaser ?? item.description.slice(0, 600),
        rawContent: item.description,
        category: "crime-safety",
        source: "merseyside-police",
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
