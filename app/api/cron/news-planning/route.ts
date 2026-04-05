import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchUnsplashImage } from "@/lib/unsplash";

// Runs every 6 hours (configured in vercel.json).
// Pulls recent planning applications from Sefton Council's public planning search.
// Filters to Southport postcodes (PR8, PR9) only.
// Auto-publishes — public register data.

// Sefton Council planning search API (Idox Uniform system — public)
const PLANNING_URL =
  "https://pa.sefton.gov.uk/online-applications/search.do?action=simple&searchType=Application";

// Fallback: use their weekly list RSS if direct search is unavailable
const PLANNING_RSS_URL =
  "https://pa.sefton.gov.uk/online-applications/search.do?action=weeklyList&searchType=Application";

const SOUTHPORT_POSTCODES = ["PR8", "PR9"];
const SOUTHPORT_AREAS = ["southport", "birkdale", "ainsdale", "churchtown", "crossens"];

function isSouthportApplication(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    SOUTHPORT_POSTCODES.some((pc) => lower.includes(pc.toLowerCase())) ||
    SOUTHPORT_AREAS.some((area) => lower.includes(area))
  );
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

function buildSummary(title: string, description: string, link: string): string {
  const parts: string[] = [];

  // Try to extract application reference from title or description
  const refMatch = (title + " " + description).match(/\b([A-Z]{2,3}\/\d{4}\/\d{4,}[A-Z]*)\b/);
  const ref = refMatch?.[1];

  parts.push(`A planning application has been submitted to Sefton Council.`);
  if (ref) parts.push(`Reference: ${ref}.`);
  if (description && description.length > 20) {
    parts.push(description.slice(0, 400));
  }
  parts.push(`View the full application on the Sefton Council planning portal.`);

  return parts.join(" ").trim();
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Try the weekly list RSS feed from Sefton's Idox system
  let xml = "";
  let fetchError = "";

  for (const url of [PLANNING_RSS_URL, PLANNING_URL]) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "SouthportGuide/1.0 (news aggregator; contact@southportguide.co.uk)",
        },
        next: { revalidate: 0 },
      });
      if (res.ok) {
        xml = await res.text();
        if (xml.includes("<item>")) break;
      }
    } catch (err) {
      fetchError = String(err);
    }
  }

  if (!xml || !xml.includes("<item>")) {
    return NextResponse.json(
      { error: "Could not fetch planning feed", details: fetchError },
      { status: 502 }
    );
  }

  const items = parseItems(xml);
  let inserted = 0;
  let skipped = 0;
  let irrelevant = 0;

  for (const item of items) {
    const combined = `${item.title} ${item.description} ${item.link}`;

    if (!isSouthportApplication(combined)) {
      irrelevant++;
      continue;
    }

    const externalId = `planning-${item.guid || item.link}`;

    const existing = await prisma.newsItem.findUnique({ where: { externalId } });
    if (existing) {
      skipped++;
      continue;
    }

    const image = await fetchUnsplashImage("planning");
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

    await prisma.newsItem.create({
      data: {
        title: item.title.slice(0, 200),
        summary: buildSummary(item.title, item.description, item.link),
        rawContent: item.description,
        category: "planning",
        source: "sefton-council",
        sourceUrl: item.link || "https://pa.sefton.gov.uk/online-applications/",
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
