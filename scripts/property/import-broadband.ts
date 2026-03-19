#!/usr/bin/env tsx
/**
 * Import Ofcom broadband data for PR8/PR9 postcodes.
 * Usage: npx tsx scripts/property/import-broadband.ts
 *
 * Place ofcom-broadband.csv in data/ from:
 * https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations/connected-nations-2024/connected-nations-2024-data-downloads
 *
 * CSV should have postcode, avg download speed (Mbps), max speed, FTTP availability.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

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
  const csvPath = path.join(process.cwd(), "data", "ofcom-broadband.csv");
  if (!fs.existsSync(csvPath)) {
    console.error(`Error: ${csvPath} not found.`);
    console.error("Download from Ofcom Connected Nations data downloads.");
    process.exit(1);
  }

  const content = fs.readFileSync(csvPath, "utf-8");
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  // Use postcode_space (spaced format) if available, else fall back to postcode
  const filtered = records.filter((r) => {
    const pc = getField(r, "postcode_space", "postcode", "POSTCODE", "Postcode");
    return pc && isSouthportPostcode(pc);
  });

  console.log(`Filtered to PR8/PR9: ${filtered.length} rows`);

  let updated = 0;
  for (const row of filtered) {
    // Use postcode_space which already has the correct spaced format
    const rawPc = getField(row, "postcode_space", "postcode", "POSTCODE", "Postcode");
    const pc = rawPc.replace(/\s+/g, " ").trim().toUpperCase();

    // Estimate avg speed from tier percentages (midpoint of each tier × proportion)
    const pct02 = parseFloat(row["% of premises with 0<2Mbit/s download speed"] ?? "0") / 100;
    const pct25 = parseFloat(row["% of premises with 2<5Mbit/s download speed"] ?? "0") / 100;
    const pct510 = parseFloat(row["% of premises with 5<10Mbit/s download speed"] ?? "0") / 100;
    const pct1030 = parseFloat(row["% of premises with 10<30Mbit/s download speed"] ?? "0") / 100;
    const pct30300 = parseFloat(row["% of premises with 30<300Mbit/s download speed"] ?? "0") / 100;
    const pct300plus = parseFloat(row["% of premises with >=300Mbit/s download speed"] ?? "0") / 100;
    const avgSpeed = (pct02 * 1) + (pct25 * 3.5) + (pct510 * 7.5) + (pct1030 * 20) + (pct30300 * 165) + (pct300plus * 500);

    // UFBB 100Mbit/s availability as max broadband indicator (in Mbps)
    const ufbb100 = parseFloat(row["UFBB (100Mbit/s) availability (% premises)"] ?? "0");
    const maxSpeed = ufbb100 > 50 ? 100 : (ufbb100 > 0 ? 30 : 10);

    // Gigabit availability as FTTP proxy
    const gigabitPct = parseFloat(row["Gigabit availability (% premises)"] ?? "0");
    const fttpAvailable = gigabitPct > 50;

    const unit = await prisma.postcodeUnit.findUnique({ where: { postcode: pc } });
    if (unit) {
      await prisma.postcodeUnit.update({
        where: { postcode: pc },
        data: {
          avgBroadband: isNaN(avgSpeed) ? null : Math.round(avgSpeed * 10) / 10,
          maxBroadband: isNaN(maxSpeed) ? null : maxSpeed,
          fttpAvailable,
        },
      });
      updated++;
    }
  }

  console.log(`\n✓ Broadband import complete`);
  console.log(`  Updated: ${updated} postcodes`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
