#!/usr/bin/env tsx
/**
 * Import flood zone data from GetTheData Open Flood Risk by Postcode.
 * Maps Environment Agency PROB_4BAND values to flood zones 1/2/3.
 * Usage: npx tsx scripts/property/import-flood-zones.ts
 *
 * Download from: https://download.getthedata.com/downloads/open_flood_has_risk.csv
 * Place as data/flood-risk.csv
 *
 * Attribution: Contains Environment Agency data licensed under OGL v3.0
 * Derived from Open Postcode Geo (getthedata.com)
 *
 * PROB_4BAND mapping:
 *   High   (>1 in 30 annual chance)       → Zone 3
 *   Medium (1 in 30–100 annual chance)    → Zone 3
 *   Low    (1 in 100–1000 annual chance)  → Zone 2
 *   Very Low / missing                    → Zone 1
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const POSTCODE_PREFIXES = ["PR8", "PR9"];

function isSouthportPostcode(postcode: string): boolean {
  const n = postcode.replace(/\s+/g, "").toUpperCase();
  return POSTCODE_PREFIXES.some((p) => n.startsWith(p));
}

function probToZone(prob: string): string {
  const p = prob.trim().toLowerCase();
  if (p === "high" || p === "medium") return "3";
  if (p === "low") return "2";
  return "1";
}

function normalisePostcode(raw: string): string {
  const pc = raw.replace(/['"]/g, "").replace(/\s+/g, " ").trim().toUpperCase();
  // Ensure space before incode if missing (e.g. PR83NU → PR8 3NU)
  if (!pc.includes(" ")) {
    return pc.slice(0, -3) + " " + pc.slice(-3);
  }
  return pc;
}

async function main() {
  const csvPath = path.join(process.cwd(), "data", "flood-risk.csv");
  if (!fs.existsSync(csvPath)) {
    console.error(`Error: ${csvPath} not found.`);
    console.error("Download from https://download.getthedata.com/downloads/open_flood_has_risk.csv");
    process.exit(1);
  }

  // Stream the file line by line — no headers, columns are:
  // postcode, FID, PROB_4BAND, SUITABILITY, PUB_DATE, RISK_FOR_INSURANCE_SOP, easting, northing, lat, lng
  const floodByPostcode = new Map<string, string>(); // postcode → zone

  const rl = readline.createInterface({ input: fs.createReadStream(csvPath), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line.trim()) continue;
    const parts = line.split(",");
    if (parts.length < 3) continue;
    const raw = parts[0];
    const prob = parts[2];
    const pc = normalisePostcode(raw);
    if (isSouthportPostcode(pc)) {
      floodByPostcode.set(pc, probToZone(prob));
    }
  }

  console.log(`Found ${floodByPostcode.size} PR8/PR9 postcodes with flood risk data`);

  // Get all PostcodeUnit records
  const units = await prisma.postcodeUnit.findMany({ select: { postcode: true } });
  let updated = 0;
  let zone1 = 0, zone2 = 0, zone3 = 0;

  for (const unit of units) {
    const zone = floodByPostcode.get(unit.postcode) ?? "1";
    await prisma.postcodeUnit.update({
      where: { postcode: unit.postcode },
      data: { floodZone: zone },
    });
    updated++;
    if (zone === "1") zone1++;
    else if (zone === "2") zone2++;
    else zone3++;
  }

  console.log(`\n✓ Flood zone import complete`);
  console.log(`  Updated: ${updated} postcodes`);
  console.log(`  Zone 1 (low risk):    ${zone1}`);
  console.log(`  Zone 2 (medium risk): ${zone2}`);
  console.log(`  Zone 3 (high risk):   ${zone3}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
