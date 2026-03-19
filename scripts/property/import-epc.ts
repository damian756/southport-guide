#!/usr/bin/env tsx
/**
 * Import EPC (Energy Performance Certificate) data for PR8/PR9 postcodes.
 * Usage: npx tsx scripts/property/import-epc.ts
 *
 * Place epc-domestic.csv in data/ from:
 * https://epc.opendatacommunities.org/ (requires free registration)
 *
 * Or use the bulk download and filter for PR8/PR9 postcodes.
 * CSV columns vary; script supports common field names.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";
import { createReadStream } from "fs";
import { parse } from "csv-parse";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const POSTCODE_PREFIXES = ["PR8", "PR9"];

function isSouthportPostcode(postcode: string): boolean {
  const n = postcode.replace(/\s+/g, "").toUpperCase();
  return POSTCODE_PREFIXES.some((p) => n.startsWith(p));
}

function getField(row: Record<string, string>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v != null && String(v).trim()) return String(v).trim();
  }
  return "";
}

async function main() {
  const csvPath = path.join(process.cwd(), "data", "epc-domestic.csv");
  if (!fs.existsSync(csvPath)) {
    console.error(`Error: ${csvPath} not found.`);
    console.error("Download from https://epc.opendatacommunities.org/");
    process.exit(1);
  }

  console.log("Reading EPC CSV...");
  const rows: Record<string, string>[] = [];

  await new Promise<void>((resolve, reject) => {
    const stream = createReadStream(csvPath, { encoding: "utf-8" });
    const parser = parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
      bom: true,
    });

    stream
      .pipe(parser)
      .on("data", (row: Record<string, string>) => {
        const pc = getField(row, "postcode", "POSTCODE", "post-code");
        if (pc && isSouthportPostcode(pc)) rows.push(row);
      })
      .on("end", () => resolve())
      .on("error", reject);
  });

  console.log(`Filtered to PR8/PR9: ${rows.length} rows`);

  let imported = 0;
  let skipped = 0;

  for (const row of rows) {
    const lmkKey = getField(row, "lmk-key", "LMK_KEY", "lmk_key", "certificate_hash");
    if (!lmkKey) {
      skipped++;
      continue;
    }

    const postcode = getField(row, "postcode", "POSTCODE", "post-code").replace(/\s+/g, " ").trim();
    const address = getField(row, "address", "ADDRESS", "address1");
    const rating = getField(row, "current-energy-rating", "CURRENT_ENERGY_RATING", "current-energy-efficiency-rating");
    const potentialRating = getField(row, "potential-energy-rating", "POTENTIAL_ENERGY_RATING");
    const floorArea = parseFloat(getField(row, "total-floor-area", "TOTAL_FLOOR_AREA", "floor-area"));
    const propertyType = getField(row, "property-type", "PROPERTY_TYPE");
    const builtForm = getField(row, "built-form", "BUILT_FORM");
    const constructionAge = getField(row, "construction-age-band", "CONSTRUCTION_AGE_BAND");
    const lodgementStr = getField(row, "lodgement-datetime", "LODGEMENT_DATETIME", "lodgement-date");

    let lodgementDate: Date | null = null;
    if (lodgementStr) {
      const d = new Date(lodgementStr);
      lodgementDate = isNaN(d.getTime()) ? null : d;
    }

    try {
      await prisma.ePCRecord.upsert({
        where: { lmkKey },
        create: {
          lmkKey,
          address: address || postcode,
          postcode,
          currentRating: rating || "G",
          potentialRating: potentialRating || null,
          floorArea: isNaN(floorArea) || floorArea <= 0 ? null : floorArea,
          propertyType: propertyType || null,
          builtForm: builtForm || null,
          constructionAge: constructionAge || null,
          lodgementDate,
        },
        update: {
          address: address || postcode,
          postcode,
          currentRating: rating || "G",
          potentialRating: potentialRating || null,
          floorArea: isNaN(floorArea) || floorArea <= 0 ? null : floorArea,
          propertyType: propertyType || null,
          builtForm: builtForm || null,
          constructionAge: constructionAge || null,
          lodgementDate,
        },
      });
      imported++;
      if (imported % 500 === 0) console.log(`  Imported ${imported}...`);
    } catch (err: unknown) {
      console.error(`  Error:`, err instanceof Error ? err.message : String(err));
      skipped++;
    }
  }

  console.log(`\n✓ EPC import complete`);
  console.log(`  Imported: ${imported}`);
  console.log(`  Skipped: ${skipped}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
