import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchUnsplashImage } from "@/lib/unsplash";
import { makeNewsSlug } from "@/lib/slugify";

// Runs every 2 hours (configured in vercel.json).
// Pulls Environment Agency flood warnings for the Sefton/Southport area via their API.
// Uses the Flood Warning API — open data, no key required.
// Auto-publishes — safety-critical structured data.

// Sefton coast flood areas — EA area codes for Southport/Sefton coastal zone
const FLOOD_API_URL =
  "https://environment.data.gov.uk/flood-monitoring/id/floods?county=Merseyside&min-severity=3";

type EAFlood = {
  "@id": string;
  description?: string;
  severity?: string;
  severityLevel?: number;
  message?: string;
  floodArea?: {
    label?: string;
    county?: string;
    riverOrSea?: string;
  };
  timeRaised?: string;
  timeMessageChanged?: string;
};

function severityLabel(level: number): string {
  if (level === 1) return "Severe Flood Warning";
  if (level === 2) return "Flood Warning";
  if (level === 3) return "Flood Alert";
  return "Flood Information";
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let floods: EAFlood[];
  try {
    const res = await fetch(FLOOD_API_URL, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { items?: EAFlood[] };
    floods = data.items ?? [];
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch flood data", details: String(err) },
      { status: 502 }
    );
  }

  let inserted = 0;
  let skipped = 0;

  for (const flood of floods) {
    const floodId = flood["@id"].split("/").pop() ?? flood["@id"];
    const timeKey = flood.timeMessageChanged ?? flood.timeRaised ?? new Date().toISOString();
    // Include time in externalId so updated warnings create new items
    const externalId = `flood-${floodId}-${timeKey}`;

    const existing = await prisma.newsItem.findUnique({ where: { externalId } });
    if (existing) {
      skipped++;
      continue;
    }

    const level = flood.severityLevel ?? 4;
    const label = severityLabel(level);
    const area = flood.floodArea?.label ?? "Southport area";
    const river = flood.floodArea?.riverOrSea ? ` (${flood.floodArea.riverOrSea})` : "";

    const title = `${label}: ${area}${river}`.slice(0, 200);
    const summary =
      flood.message?.trim() ||
      flood.description?.trim() ||
      `The Environment Agency has issued a ${label.toLowerCase()} for ${area}. Check gov.uk/check-flood-risk for the latest updates.`;

    const image = await fetchUnsplashImage("community");
    const pubDate = flood.timeRaised ? new Date(flood.timeRaised) : new Date();
    const id = crypto.randomUUID();
    const slug = makeNewsSlug(title, id);

    await prisma.newsItem.create({
      data: {
        id,
        slug,
        title,
        summary: summary.slice(0, 1000),
        category: "community",
        source: "environment-agency",
        sourceUrl: "https://check-for-flooding.service.gov.uk/find-location",
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
    fetched: floods.length,
    inserted,
    skipped,
  });
}
