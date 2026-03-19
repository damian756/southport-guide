#!/usr/bin/env tsx
/**
 * Geocode unique postcodes from PropertySale using postcodes.io bulk API.
 * Creates PostcodeUnit records with lat, lng, lsoa, ward.
 * Usage: npx tsx scripts/property/geocode-postcodes.ts
 *
 * Run after import-land-registry.ts.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const POSTCODES_IO_BULK = "https://api.postcodes.io/postcodes";
const BATCH_SIZE = 100;

function postcodeToSector(postcode: string): string {
  const normalized = postcode.replace(/\s+/g, " ").trim().toUpperCase();
  const parts = normalized.split(" ");
  if (parts.length < 2) return normalized;
  const outcode = parts[0];
  const incode = parts[1];
  return `${outcode} ${incode.charAt(0)}`;
}

interface PostcodesIoResult {
  query: string;
  result: {
    latitude: number;
    longitude: number;
    lsoa?: string;          // LSOA name (e.g. "Sefton 011A")
    admin_ward?: string;
    parliamentary_constituency?: string;
    codes?: {
      lsoa?: string;        // LSOA code (e.g. "E01006512") — needed for ONS/Nomis lookups
      admin_ward?: string;
    };
  } | null;
}

async function geocodeBatch(postcodes: string[]): Promise<PostcodesIoResult[]> {
  const res = await fetch(POSTCODES_IO_BULK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postcodes }),
  });
  if (!res.ok) {
    throw new Error(`postcodes.io error: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { status: number; result: PostcodesIoResult[] };
  return data.result;
}

async function main() {
  const uniquePostcodes = await prisma.propertySale.findMany({
    select: { postcode: true },
    distinct: ["postcode"],
  });
  const postcodes = uniquePostcodes.map((r) => r.postcode.trim()).filter(Boolean);
  console.log(`Found ${postcodes.length} unique postcodes to geocode`);

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (let i = 0; i < postcodes.length; i += BATCH_SIZE) {
    const batch = postcodes.slice(i, i + BATCH_SIZE);
    const cleanBatch = batch.map((p) => p.replace(/\s+/g, " ").trim());
    console.log(`Geocoding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(postcodes.length / BATCH_SIZE)}...`);

    try {
      const results = await geocodeBatch(cleanBatch);
      await new Promise((r) => setTimeout(r, 200)); // Rate limit

      for (let j = 0; j < results.length; j++) {
        const r = results[j];
        const postcode = cleanBatch[j];
        if (!postcode) continue;

        const sector = postcodeToSector(postcode);
        const result = r?.result;

        if (!result) {
          failed++;
          continue;
        }

        const existing = await prisma.postcodeUnit.findUnique({
          where: { postcode },
        });

        const data = {
          sector,
          lat: result.latitude,
          lng: result.longitude,
          // Use the ONS LSOA code (E01XXXXXX) rather than name for Nomis/Census lookups
          lsoa: result.codes?.lsoa || result.lsoa || null,
          ward: result.admin_ward || null,
        };

        if (existing) {
          await prisma.postcodeUnit.update({
            where: { postcode },
            data,
          });
          updated++;
        } else {
          await prisma.postcodeUnit.create({
            data: {
              postcode,
              ...data,
            },
          });
          created++;
        }
      }
    } catch (err) {
      console.error(`Batch error:`, err);
      failed += batch.length;
    }
  }

  // Create/update PostcodeSector records with centroid (avg lat/lng of units)
  const sectorUnits = await prisma.postcodeUnit.groupBy({
    by: ["sector"],
    _avg: { lat: true, lng: true },
    _count: true,
  });

  for (const s of sectorUnits) {
    const avgLat = s._avg.lat ?? 53.65;
    const avgLng = s._avg.lng ?? -3.0;
    await prisma.postcodeSector.upsert({
      where: { sector: s.sector },
      create: {
        sector: s.sector,
        lat: avgLat,
        lng: avgLng,
        unitCount: s._count,
      },
      update: { unitCount: s._count, lat: avgLat, lng: avgLng },
    });
  }

  console.log(`\n✓ Geocode complete`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Failed: ${failed}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
