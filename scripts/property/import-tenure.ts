#!/usr/bin/env tsx
/**
 * Import Census 2021 tenure data at LSOA level.
 * Maps LSOA tenure data onto PostcodeUnit via lsoa field.
 * Usage: npx tsx scripts/property/import-tenure.ts
 *
 * Fetches TS054 (Tenure of household) from ONS Nomis API for LSOAs in our DB.
 * Optionally reads from data/census-tenure-lsoa.csv if present.
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

// Nomis dataset NM_2072_1 = Census 2021 TS054 Tenure of household (England & Wales)
// cell codes: 0=all, 1=owned outright, 2=owned mortgage, 3=social rented, 4=private rented, 5=other
const NOMIS_DATASET = "NM_2072_1";
const NOMIS_CELLS = "0,1,2,3,4,5"; // Total + all tenure categories

interface TenureData {
  owned: number;  // % owner-occupied (outright + mortgage)
  rented: number; // % private rented
  social: number; // % social rented
}

async function fetchFromNomis(lsoacodes: string[]): Promise<Map<string, TenureData>> {
  const result = new Map<string, TenureData>();
  const BATCH = 50;

  for (let i = 0; i < lsoacodes.length; i += BATCH) {
    const batch = lsoacodes.slice(i, i + BATCH);
    const geoParam = batch.join(",");
    const url = `https://www.nomisweb.co.uk/api/v01/dataset/${NOMIS_DATASET}.data.csv?date=latest&geography=${geoParam}&cell=${NOMIS_CELLS}&measures=20100`;

    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const rows = parse(text, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
      }) as Record<string, string>[];

      // Group rows by LSOA
      const byLsoa = new Map<string, Map<string, number>>();
      for (const row of rows) {
        const lsoa = (row["GEOGRAPHY_CODE"] ?? row["geography code"] ?? "").trim();
        const cellCode = (row["CELL_CODE"] ?? row["cell"] ?? row["C_TENURE_9A"] ?? "").trim();
        const val = parseFloat(row["OBS_VALUE"] ?? row["VALUE"] ?? row["obs_value"] ?? "0");
        if (!lsoa) continue;
        if (!byLsoa.has(lsoa)) byLsoa.set(lsoa, new Map());
        byLsoa.get(lsoa)!.set(cellCode, val);
      }

      for (const [lsoa, cells] of byLsoa.entries()) {
        const total = [...cells.values()].find((_, idx) => idx === 0) ?? 0;
        // The cell ordering depends on the API response; sum up categories
        let ownedCount = 0, rentedCount = 0, socialCount = 0, allTotal = 0;
        for (const [code, val] of cells.entries()) {
          const c = String(code).toUpperCase();
          if (c.includes("TOTAL") || c === "0" || c === "TS054_0") {
            allTotal = val;
          } else if (c.includes("1") || c.includes("OWNED_OUTRIGHT")) {
            ownedCount += val;
          } else if (c.includes("2") || c.includes("OWNED_MORTGAGE")) {
            ownedCount += val;
          } else if (c.includes("3") || c.includes("SOCIAL")) {
            socialCount += val;
          } else if (c.includes("4") || c.includes("PRIVATE")) {
            rentedCount += val;
          }
        }
        if (allTotal > 0) {
          result.set(lsoa, {
            owned: Math.round((ownedCount / allTotal) * 1000) / 10,
            rented: Math.round((rentedCount / allTotal) * 1000) / 10,
            social: Math.round((socialCount / allTotal) * 1000) / 10,
          });
        }
      }

      if (i % 500 === 0 && i > 0) console.log(`  Fetched ${i} of ${lsoacodes.length} LSOAs...`);
    } catch (err) {
      // Skip batch on error — Nomis occasionally rate-limits
      if (i % 100 === 0) console.warn(`  Warning: Nomis batch ${i} failed:`, err instanceof Error ? err.message : String(err));
    }

    // Polite delay between Nomis batches
    if (i + BATCH < lsoacodes.length) await new Promise((r) => setTimeout(r, 200));
  }

  return result;
}

function parseLocalFile(csvPath: string): Map<string, TenureData> {
  const result = new Map<string, TenureData>();
  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.split(/\r?\n/);

  // Nomis exports have metadata rows at the top before the actual header.
  // Find the header row by looking for "2021 super output area" or a row starting with a geography label.
  let headerIdx = 0;
  for (let i = 0; i < Math.min(20, lines.length); i++) {
    if (lines[i].toLowerCase().includes("super output area") || lines[i].toLowerCase().startsWith("e01")) {
      headerIdx = i;
      break;
    }
  }

  const dataLines = lines.slice(headerIdx).join("\n");
  const records = parse(dataLines, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  for (const row of records) {
    // Nomis column is "2021 super output area - lower layer" with value like "E01006946 : Sefton 001A"
    const geoRaw = (
      row["2021 super output area - lower layer"] ??
      row["lsoa"] ?? row["LSOA"] ?? row["lsoa_code"] ?? row["geography code"] ?? ""
    ).trim();

    // Extract just the E01XXXXXX code from "E01006946 : Sefton 001A"
    const lsoa = geoRaw.split(":")[0].trim();
    if (!lsoa.startsWith("E") && !lsoa.startsWith("W")) continue;

    // Nomis columns: "Owned", "Private rented", "Social rented" (already percentages)
    const owned = parseFloat(row["Owned"] ?? row["owner_occupied"] ?? row["OwnerOccupied"] ?? "0");
    const rented = parseFloat(row["Private rented"] ?? row["private_rented"] ?? row["PrivateRented"] ?? "0");
    const social = parseFloat(row["Social rented"] ?? row["social_rented"] ?? row["SocialRented"] ?? "0");

    if (!isNaN(owned)) {
      result.set(lsoa, {
        owned,
        rented: isNaN(rented) ? 0 : rented,
        social: isNaN(social) ? 0 : social,
      });
    }
  }
  return result;
}

async function main() {
  const csvPath = path.join(process.cwd(), "data", "census-tenure-lsoa.csv");

  // Get all LSOAs from PostcodeUnit records
  const units = await prisma.postcodeUnit.findMany({
    where: { lsoa: { not: null } },
    select: { postcode: true, lsoa: true },
  });

  const uniqueLsoas = [...new Set(units.map((u) => u.lsoa).filter(Boolean) as string[])];
  console.log(`Found ${uniqueLsoas.length} unique LSOAs to enrich`);

  let byLsoa: Map<string, TenureData>;

  if (fs.existsSync(csvPath)) {
    console.log("Using local census-tenure-lsoa.csv...");
    byLsoa = parseLocalFile(csvPath);
    console.log(`  Loaded ${byLsoa.size} LSOA records from file`);
  } else {
    console.log("Fetching from Nomis Census 2021 API...");
    byLsoa = await fetchFromNomis(uniqueLsoas);
    console.log(`  Fetched ${byLsoa.size} LSOA records from Nomis`);
  }

  if (byLsoa.size === 0) {
    console.warn("\nWarning: No tenure data retrieved. Skipping update.");
    console.warn("You can manually download census-tenure-lsoa.csv from ONS Nomis (TS054 table, LSOA level).");
    await prisma.$disconnect();
    return;
  }

  let updated = 0;
  for (const u of units) {
    if (!u.lsoa) continue;
    const tenure = byLsoa.get(u.lsoa);
    if (!tenure) continue;

    await prisma.postcodeUnit.update({
      where: { postcode: u.postcode },
      data: {
        tenureOwned: tenure.owned,
        tenureRented: tenure.rented,
        tenureSocial: tenure.social,
      },
    });
    updated++;
  }

  console.log(`\n✓ Tenure import complete`);
  console.log(`  Updated: ${updated} postcodes`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
