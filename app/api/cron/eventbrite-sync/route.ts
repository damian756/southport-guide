import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Runs daily at 06:00 UTC (configured in vercel.json).
// Pulls events from Ticketmaster Discovery API within 10km of Southport.
// Uses TICKETMASTER_API_KEY — get a free key at developer.ticketmaster.com

const SOUTHPORT_LATLONG = "53.6452,-3.0056";
const RADIUS = "10";
const UNIT = "km";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type TmEvent = {
  id: string;
  name?: string;
  url?: string;
  dates?: {
    start?: { localDate?: string; localTime?: string };
    end?: { localDate?: string; localTime?: string };
    status?: { code?: string };
  };
  priceRanges?: Array<{ min?: number; max?: number; currency?: string }>;
  classifications?: Array<{
    segment?: { name?: string };
    genre?: { name?: string };
  }>;
  _embedded?: {
    venues?: Array<{ name?: string; city?: { name?: string } }>;
  };
  description?: string;
};

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "TICKETMASTER_API_KEY not configured" },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    latlong: SOUTHPORT_LATLONG,
    radius: RADIUS,
    unit: UNIT,
    countryCode: "GB",
    size: "50",
    sort: "date,asc",
  });

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?${params}`;
  const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `Ticketmaster API error: ${res.status}`, details: text },
      { status: 502 }
    );
  }

  const data = (await res.json()) as {
    _embedded?: { events?: TmEvent[] };
    page?: { totalElements?: number };
  };

  const events = data._embedded?.events ?? [];
  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const ev of events) {
    const externalId = `tm-${ev.id}`;
    const name = ev.name ?? "Untitled Event";
    const startDate = ev.dates?.start?.localDate;
    const startTime = ev.dates?.start?.localTime ?? "00:00:00";
    const endDate = ev.dates?.end?.localDate;

    if (!startDate) {
      skipped++;
      continue;
    }

    // Skip cancelled events
    if (ev.dates?.status?.code === "cancelled") {
      skipped++;
      continue;
    }

    const dateStart = new Date(`${startDate}T${startTime}`);
    const dateEnd = endDate ? new Date(`${endDate}T23:59:00`) : dateStart;

    const venueName = ev._embedded?.venues?.[0]?.name ?? null;
    const classificationName =
      ev.classifications?.[0]?.segment?.name ??
      ev.classifications?.[0]?.genre?.name ??
      null;

    const isFree = (ev.priceRanges?.[0]?.min ?? 1) === 0;

    const slug = `${slugify(name)}-${startDate}-${ev.id.slice(-6)}`;

    const existing = await prisma.event.findUnique({ where: { externalId } });

    if (existing) {
      // Only update if still approved (don't override admin-hidden events)
      if (existing.status !== "hidden") {
        await prisma.event.update({
          where: { id: existing.id },
          data: {
            name,
            dateStart,
            dateEnd,
            venueName,
            category: classificationName,
            link: ev.url ?? null,
            isFree,
          },
        });
      }
      updated++;
    } else {
      await prisma.event.create({
        data: {
          slug,
          name,
          description: ev.description ?? null,
          dateStart,
          dateEnd,
          venueName,
          category: classificationName,
          source: "eventbrite", // keep field value consistent; source column label in admin shows "eventbrite"
          externalId,
          status: "approved",
          link: ev.url ?? null,
          isFree,
          featured: false,
        },
      });
      inserted++;
    }
  }

  return NextResponse.json({
    ok: true,
    fetched: events.length,
    inserted,
    updated,
    skipped,
  });
}
