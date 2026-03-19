import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { format, subMonths } from "date-fns";

const POLICE_API = "https://data.police.uk/api/crimes-street/all-crime";

async function fetchCrimeForMonth(lat: number, lng: number, month: string): Promise<Record<string, number>> {
  const byCategory: Record<string, number> = {};
  const url = `${POLICE_API}?lat=${lat}&lng=${lng}&date=${month}`;
  const res = await fetch(url);
  if (!res.ok) return byCategory;
  const crimes = (await res.json()) as { category: string }[];
  for (const c of crimes) {
    const cat = c.category || "other";
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  }
  return byCategory;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sectors = await prisma.postcodeSector.findMany({
    select: { sector: true, lat: true, lng: true },
  });

  const months: string[] = [];
  for (let i = 0; i < 12; i++) {
    months.push(format(subMonths(new Date(), i), "yyyy-MM"));
  }

  let totalUpserted = 0;
  for (const sec of sectors) {
    for (const month of months) {
      const byCategory = await fetchCrimeForMonth(sec.lat, sec.lng, month);
      await new Promise((r) => setTimeout(r, 150));

      for (const [category, count] of Object.entries(byCategory)) {
        await prisma.crimeSnapshot.upsert({
          where: {
            sector_month_category: { sector: sec.sector, month, category },
          },
          create: { sector: sec.sector, month, category, count },
          update: { count },
        });
        totalUpserted++;
      }
    }
  }

  return NextResponse.json({ ok: true, upserted: totalUpserted });
}
