#!/usr/bin/env tsx
/**
 * Fetch crime data from police.uk API for each postcode sector.
 * Stores 12 months of crime by category in CrimeSnapshot.
 * Usage: npx tsx scripts/property/fetch-crime.ts
 *
 * Run after geocode-postcodes.ts (sectors need lat/lng).
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { subMonths, format } from "date-fns";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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

async function main() {
  const sectors = await prisma.postcodeSector.findMany({
    select: { sector: true, lat: true, lng: true },
  });

  console.log(`Fetching crime for ${sectors.length} sectors (12 months)...`);

  const months: string[] = [];
  for (let i = 0; i < 12; i++) {
    months.push(format(subMonths(new Date(), i), "yyyy-MM"));
  }

  let totalUpserted = 0;
  for (const sec of sectors) {
    for (const month of months) {
      const byCategory = await fetchCrimeForMonth(sec.lat, sec.lng, month);
      await new Promise((r) => setTimeout(r, 150)); // Rate limit

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
    console.log(`  Done ${sec.sector}`);
  }

  console.log(`\n✓ Crime fetch complete`);
  console.log(`  Upserted: ${totalUpserted} records`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
