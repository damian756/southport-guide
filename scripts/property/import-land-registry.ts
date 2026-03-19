#!/usr/bin/env tsx
/**
 * Import Land Registry Price Paid Data for PR8/PR9 postcodes.
 * Usage: npx tsx scripts/property/import-land-registry.ts
 *
 * Place pp-complete.csv in data/ from:
 * https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads
 *
 * CSV columns (no header in standard download):
 * 0: Transaction unique identifier
 * 1: Price
 * 2: Date of Transfer (YYYY-MM-DD)
 * 3: Postcode
 * 4: Property Type (D/S/T/F)
 * 5: Old/New (Y/N)
 * 6: Duration (F/L)
 * 7: PAON
 * 8: SAON
 * 9: Street
 * 10: Locality
 * 11: Town/City
 * 12: District
 * 13: County
 * 14: PPD Category Type
 * 15: Record Status (A/C/D)
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
  const normalized = postcode.replace(/\s+/g, "").toUpperCase();
  return POSTCODE_PREFIXES.some((p) => normalized.startsWith(p));
}

interface LandRegistryRow {
  transactionId: string;
  price: number;
  dateOfTransfer: string;
  postcode: string;
  propertyType: string;
  newBuild: boolean;
  tenure: string;
  paon: string;
  saon: string;
  street: string;
  locality: string;
  town: string;
  district: string;
  county: string;
  recordStatus: string;
}

function parseRow(row: string[]): LandRegistryRow | null {
  if (row.length < 16) return null;
  const price = parseInt(row[1], 10);
  if (isNaN(price) || price <= 0) return null;
  const dateStr = row[2];
  return {
    transactionId: row[0]?.trim() || "",
    price,
    dateOfTransfer: dateStr,
    postcode: row[3]?.trim() || "",
    propertyType: row[4]?.trim() || "O",
    newBuild: row[5]?.toUpperCase() === "Y",
    tenure: row[6]?.trim() || "F",
    paon: row[7]?.trim() || "",
    saon: row[8]?.trim() || "",
    street: row[9]?.trim() || "",
    locality: row[10]?.trim() || "",
    town: row[11]?.trim() || "",
    district: row[12]?.trim() || "",
    county: row[13]?.trim() || "",
    recordStatus: row[15]?.trim() || "A",
  };
}

async function main() {
  const csvPath = path.join(process.cwd(), "data", "pp-complete.csv");
  const altPath = path.join(process.cwd(), "data", "pp-complete.csv.gz");

  if (!fs.existsSync(csvPath)) {
    console.error(`Error: ${csvPath} not found.`);
    console.error(
      "Download from https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads"
    );
    console.error("Extract and place pp-complete.csv in the data/ directory.");
    if (fs.existsSync(altPath)) {
      console.error("Note: gzipped file detected. Please run: gunzip -k pp-complete.csv.gz");
    }
    process.exit(1);
  }

  console.log("Reading Land Registry CSV (streaming)...");
  const filtered: LandRegistryRow[] = [];
  let totalRows = 0;

  await new Promise<void>((resolve, reject) => {
    const stream = createReadStream(csvPath, { encoding: "utf-8" });
    const parser = parse({
      relax_column_count: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    });

    stream
      .pipe(parser)
      .on("data", (row: string[]) => {
        totalRows++;
        if (totalRows % 500000 === 0) console.log(`  Scanned ${totalRows} rows...`);
        const first = row[0];
        if (!first || first === "Transaction unique identifier") return;
        const parsed = parseRow(row);
        if (parsed && isSouthportPostcode(parsed.postcode)) {
          filtered.push(parsed);
        }
      })
      .on("end", () => resolve())
      .on("error", reject);
  });

  console.log(`Total rows scanned: ${totalRows}`);
  console.log(`Filtered to PR8/PR9: ${filtered.length} rows`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of filtered) {
    try {
      const dateOfTransfer = new Date(row.dateOfTransfer);
      if (isNaN(dateOfTransfer.getTime())) {
        skipped++;
        continue;
      }

      await prisma.propertySale.upsert({
        where: { transactionId: row.transactionId },
        create: {
          transactionId: row.transactionId,
          price: row.price,
          dateOfTransfer,
          postcode: row.postcode,
          propertyType: row.propertyType,
          newBuild: row.newBuild,
          tenure: row.tenure,
          paon: row.paon || null,
          saon: row.saon || null,
          street: row.street || null,
          locality: row.locality || null,
          town: row.town || null,
          district: row.district || null,
          county: row.county || null,
          recordStatus: row.recordStatus,
        },
        update: {
          price: row.price,
          dateOfTransfer,
          postcode: row.postcode,
          propertyType: row.propertyType,
          newBuild: row.newBuild,
          tenure: row.tenure,
          paon: row.paon || null,
          saon: row.saon || null,
          street: row.street || null,
          locality: row.locality || null,
          town: row.town || null,
          district: row.district || null,
          county: row.county || null,
          recordStatus: row.recordStatus,
        },
      });
      imported++;
      if (imported % 50 === 0) {
        console.log(`  Imported ${imported}...`);
      }
    } catch (err: unknown) {
      console.error(`  Error: ${err instanceof Error ? err.message : String(err)}`);
      errors++;
    }
  }

  console.log(`\n✓ Import complete`);
  console.log(`  Imported: ${imported}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Errors: ${errors}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
