#!/usr/bin/env tsx
/**
 * Aggregate PropertySale data into PostcodeUnit and PostcodeSector.
 * Computes 3-year sales count, average and median price.
 * Optionally enriches from EPCRecord (avg rating, floor area).
 * Usage: npx tsx scripts/property/aggregate-postcodes.ts
 *
 * Run after geocode-postcodes.ts.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const THREE_YEARS_AGO = new Date();
THREE_YEARS_AGO.setFullYear(THREE_YEARS_AGO.getFullYear() - 3);

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function main() {
  console.log("Aggregating sales (last 3 years)...");

  const sales = await prisma.propertySale.findMany({
    where: {
      dateOfTransfer: { gte: THREE_YEARS_AGO },
      recordStatus: { not: "D" },
    },
    select: { postcode: true, price: true },
  });

  const byPostcode = new Map<string, number[]>();
  for (const s of sales) {
    const pc = s.postcode.trim();
    if (!byPostcode.has(pc)) byPostcode.set(pc, []);
    byPostcode.get(pc)!.push(s.price);
  }

  function postcodeToSector(pc: string): string {
    const n = pc.replace(/\s+/g, " ").trim().toUpperCase();
    const parts = n.split(" ");
    if (parts.length >= 2) return `${parts[0]} ${parts[1].charAt(0)}`;
    if (parts[0] && parts[0].length >= 4) return `${parts[0].slice(0, 3)} ${parts[0].slice(3, 4)}`;
    return n;
  }

  const bySector = new Map<string, number[]>();
  for (const [postcode, prices] of byPostcode) {
    const sector = postcodeToSector(postcode);
    if (sector.length >= 4) {
      const existing = bySector.get(sector) ?? [];
      bySector.set(sector, [...existing, ...prices]);
    }
  }

  let unitsUpdated = 0;
  for (const [postcode, prices] of byPostcode) {
    const count = prices.length;
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / count);
    const med = Math.round(median(prices));

    await prisma.postcodeUnit.updateMany({
      where: { postcode },
      data: {
        salesCount3yr: count,
        avgPrice3yr: avg,
        medianPrice3yr: med,
      },
    });
    unitsUpdated++;
  }

  let sectorsUpdated = 0;
  for (const [sector, prices] of bySector) {
    const count = prices.length;
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / count);
    const med = Math.round(median(prices));

    await prisma.postcodeSector.updateMany({
      where: { sector },
      data: {
        salesCount3yr: count,
        avgPrice3yr: avg,
        medianPrice3yr: med,
      },
    });
    sectorsUpdated++;
  }

  // EPC enrichment if EPCRecord has data
  const epcCount = await prisma.ePCRecord.count();
  if (epcCount > 0) {
    console.log("Enriching from EPC data...");
    const epcByPostcode = await prisma.$queryRaw<
      { postcode: string; avg_rating: string; avg_floor: number }[]
    >`
      SELECT postcode,
             MODE() WITHIN GROUP (ORDER BY "currentRating") AS avg_rating,
             AVG("floorArea")::float AS avg_floor
      FROM "EPCRecord"
      WHERE "floorArea" IS NOT NULL AND "floorArea" > 0
      GROUP BY postcode
    `;

    for (const row of epcByPostcode) {
      const pc = row.postcode.trim();
      await prisma.postcodeUnit.updateMany({
        where: { postcode: pc },
        data: {
          avgEpcRating: row.avg_rating || null,
          avgFloorArea: row.avg_floor ? Math.round(row.avg_floor * 10) / 10 : null,
        },
      });
    }
  }

  console.log(`\n✓ Aggregate complete`);
  console.log(`  Units updated: ${unitsUpdated}`);
  console.log(`  Sectors updated: ${sectorsUpdated}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
