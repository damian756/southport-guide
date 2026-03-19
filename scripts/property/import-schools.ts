#!/usr/bin/env tsx
/**
 * Import schools from DfE GIAS and Ofsted inspection data.
 * Usage: npx tsx scripts/property/import-schools.ts
 *
 * Place in data/:
 * - schools-gias.csv (from Get Information About Schools downloads)
 * - ofsted-inspections.csv (from gov.uk Ofsted data)
 *
 * Filter: schools within ~15 miles of Southport centre (53.65, -3.0)
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

const SOUTHPORT_LAT = 53.65;
const SOUTHPORT_LNG = -3.0;
const MAX_MILES = 15;

/**
 * Convert British National Grid (OSGB36) Easting/Northing to WGS84 lat/lng.
 * Implements the OS recommended iterative approach.
 */
function bngToWGS84(easting: number, northing: number): { lat: number; lng: number } {
  const a = 6377563.396, b = 6356256.909;
  const F0 = 0.9996012717;
  const lat0 = (49 * Math.PI) / 180;
  const lng0 = (-2 * Math.PI) / 180;
  const N0 = -100000, E0 = 400000;
  const e2 = 1 - (b * b) / (a * a);
  const n = (a - b) / (a + b), n2 = n * n, n3 = n * n * n;

  let lat = lat0, M = 0;
  do {
    lat = (northing - N0 - M) / (a * F0) + lat;
    const Ma = (1 + n + 1.25 * n2 + 1.25 * n3) * (lat - lat0);
    const Mb = (3 * n + 3 * n2 + 2.625 * n3) * Math.sin(lat - lat0) * Math.cos(lat + lat0);
    const Mc = (1.875 * n2 + 1.875 * n3) * Math.sin(2 * (lat - lat0)) * Math.cos(2 * (lat + lat0));
    const Md = (35 / 24) * n3 * Math.sin(3 * (lat - lat0)) * Math.cos(3 * (lat + lat0));
    M = b * F0 * (Ma - Mb + Mc - Md);
  } while (Math.abs(northing - N0 - M) >= 0.00001);

  const sinLat = Math.sin(lat), cosLat = Math.cos(lat), tanLat = Math.tan(lat);
  const nu = a * F0 / Math.sqrt(1 - e2 * sinLat * sinLat);
  const rho = a * F0 * (1 - e2) / Math.pow(1 - e2 * sinLat * sinLat, 1.5);
  const eta2 = nu / rho - 1;
  const tan2 = tanLat * tanLat, tan4 = tan2 * tan2;
  const secLat = 1 / cosLat;
  const dE = easting - E0;

  const latOSGB = lat
    - (tanLat / (rho * nu)) * (dE * dE / 2)
    + (tanLat / (rho * Math.pow(nu, 3))) * (5 + 3 * tan2 + eta2 - 9 * tan2 * eta2) * (Math.pow(dE, 4) / 24)
    - (tanLat / (rho * Math.pow(nu, 5))) * (61 + 90 * tan2 + 45 * tan4) * (Math.pow(dE, 6) / 720);

  const lngOSGB = lng0
    + (secLat / nu) * dE
    - (secLat / Math.pow(nu, 3)) * (nu / rho + 2 * tan2) * (Math.pow(dE, 3) / 6)
    + (secLat / Math.pow(nu, 5)) * (5 + 28 * tan2 + 24 * tan4) * (Math.pow(dE, 5) / 120);

  // Helmert: OSGB36 → WGS84
  const x = nu * cosLat * Math.cos(lngOSGB);
  const y = nu * cosLat * Math.sin(lngOSGB);
  const z = (nu * (1 - e2)) * sinLat;
  const dx = 446.448, dy = -125.157, dz = 542.06;
  const rx = (0.1502 / 3600) * Math.PI / 180;
  const ry = (0.247 / 3600) * Math.PI / 180;
  const rz = (0.8421 / 3600) * Math.PI / 180;
  const s = 1 + 20.4894e-6;
  const x2 = s * (x - rz * y + ry * z) + dx;
  const y2 = s * (rz * x + y - rx * z) + dy;
  const z2 = s * (-ry * x + rx * y + z) + dz;

  // GRS80 → lat/lng
  const a2 = 6378137.0, b2 = 6356752.3141;
  const e22 = 1 - (b2 * b2) / (a2 * a2);
  const p = Math.sqrt(x2 * x2 + y2 * y2);
  let latWGS = Math.atan2(z2, p * (1 - e22));
  for (let i = 0; i < 10; i++) {
    const sinL = Math.sin(latWGS);
    const nu2 = a2 / Math.sqrt(1 - e22 * sinL * sinL);
    latWGS = Math.atan2(z2 + e22 * nu2 * sinL, p);
  }
  return {
    lat: (latWGS * 180) / Math.PI,
    lng: (Math.atan2(y2, x2) * 180) / Math.PI,
  };
}

function haversineMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function isNearSouthport(lat: number, lng: number): boolean {
  return haversineMiles(SOUTHPORT_LAT, SOUTHPORT_LNG, lat, lng) <= MAX_MILES;
}

async function main() {
  const giasPath = path.join(process.cwd(), "data", "schools-gias.csv");
  const ofstedPath = path.join(process.cwd(), "data", "ofsted-inspections.csv");

  if (!fs.existsSync(giasPath)) {
    console.error(`Error: ${giasPath} not found.`);
    console.error(
      "Download from https://get-information-schools.service.gov.uk/Downloads"
    );
    process.exit(1);
  }

  console.log("Reading GIAS schools...");
  const giasContent = fs.readFileSync(giasPath, "utf-8");
  const giasRows = parse(giasContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  const ofstedByUrn = new Map<string, { rating: number; date: string }>();
  if (fs.existsSync(ofstedPath)) {
    console.log("Reading Ofsted inspections...");
    const ofstedContent = fs.readFileSync(ofstedPath, "utf-8");
    // Ofsted file has 2 preamble rows before the actual header row — skip them
    const ofstedLines = ofstedContent.split(/\r?\n/);
    const dataLines = ofstedLines.slice(2).join("\n");
    const ofstedRows = parse(dataLines, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    }) as Record<string, string>[];

    for (const row of ofstedRows) {
      // Column names from the actual Ofsted state-funded schools CSV
      const urn = (row["URN"] ?? "").trim();
      if (!urn) continue;
      // "Latest OEIF overall effectiveness" is the current graded inspection result
      const ratingStr = (
        row["Latest OEIF overall effectiveness"] ??
        row["Overall effectiveness"] ??
        row["Rating"] ??
        ""
      ).trim();
      const dateStr = (
        row["Inspection start date of latest OEIF graded inspection"] ??
        row["Inspection start date"] ??
        row["InspectionDate"] ??
        ""
      ).trim();

      let rating = 0;
      if (ratingStr) {
        const r = parseInt(ratingStr, 10);
        if (r >= 1 && r <= 4) {
          rating = r;
        } else {
          if (/outstanding/i.test(ratingStr)) rating = 1;
          else if (/^good$/i.test(ratingStr)) rating = 2;
          else if (/requires improvement/i.test(ratingStr)) rating = 3;
          else if (/inadequate/i.test(ratingStr)) rating = 4;
        }
      }
      if (rating > 0) ofstedByUrn.set(urn, { rating, date: dateStr });
    }
    console.log(`  Loaded ${ofstedByUrn.size} Ofsted records`);
  }

  let imported = 0;
  let skipped = 0;

  for (const row of giasRows) {
    const urn = String(row["URN"] ?? row["urn"] ?? "").trim();
    if (!urn) {
      skipped++;
      continue;
    }

    const easting = parseFloat(row["Easting"] ?? "0");
    const northing = parseFloat(row["Northing"] ?? "0");
    if (!easting || !northing) { skipped++; continue; }
    const { lat, lng } = bngToWGS84(easting, northing);
    if (!isNearSouthport(lat, lng)) {
      skipped++;
      continue;
    }

    const status = (row["EstablishmentStatus (name)"] ?? row["EstablishmentStatus"] ?? row["Status"] ?? "Open").trim();
    if (status.toLowerCase().includes("closed")) {
      skipped++;
      continue;
    }

    const ofsted = ofstedByUrn.get(urn);
    let ofstedDate: Date | null = null;
    if (ofsted?.date) {
      const d = new Date(ofsted.date);
      ofstedDate = isNaN(d.getTime()) ? null : d;
    }

    const isSelective =
      /selective|grammar/i.test(row["TypeOfEstablishment (name)"] ?? "") ||
      /selective|grammar/i.test(row["TypeOfEstablishment"] ?? "");

    try {
      await prisma.school.upsert({
        where: { urn },
        create: {
          urn,
          name: (row["EstablishmentName"] ?? row["Establishment name"] ?? row["name"] ?? "Unknown").trim(),
          phase: (row["PhaseOfEducation (name)"] ?? row["PhaseOfEducation"] ?? row["Phase"] ?? "Unknown").trim(),
          schoolType: (row["TypeOfEstablishment (name)"] ?? row["TypeOfEstablishment"] ?? row["Type"] ?? "Unknown").trim(),
          religiousChar: (row["ReligiousCharacter (name)"] ?? row["ReligiousCharacter"] ?? row["Religious"] ?? null) || null,
          gender: (row["Gender (name)"] ?? row["Gender"] ?? null) || null,
          isSelective,
          address: (row["Street"] ?? row["Address"] ?? null) || null,
          postcode: (row["Postcode"] ?? row["postcode"] ?? "").trim(),
          lat,
          lng,
          ofstedRating: ofsted?.rating || null,
          ofstedDate,
          pupils: parseInt(row["NumberOfPupils"] ?? row["Pupils"] ?? "0", 10) || null,
          ageRangeLow: parseInt(row["StatutoryLowAge"] ?? row["AgeLow"] ?? "0", 10) || null,
          ageRangeHigh: parseInt(row["StatutoryHighAge"] ?? row["AgeHigh"] ?? "0", 10) || null,
          website: (row["SchoolWebsite"] ?? row["Website"] ?? null) || null,
          status: status || "Open",
        },
        update: {
          name: (row["EstablishmentName"] ?? row["Establishment name"] ?? row["name"] ?? "Unknown").trim(),
          phase: (row["PhaseOfEducation (name)"] ?? row["PhaseOfEducation"] ?? row["Phase"] ?? "Unknown").trim(),
          schoolType: (row["TypeOfEstablishment (name)"] ?? row["TypeOfEstablishment"] ?? row["Type"] ?? "Unknown").trim(),
          religiousChar: (row["ReligiousCharacter (name)"] ?? row["ReligiousCharacter"] ?? row["Religious"] ?? null) || null,
          gender: (row["Gender (name)"] ?? row["Gender"] ?? null) || null,
          isSelective,
          address: (row["Street"] ?? row["Address"] ?? null) || null,
          postcode: (row["Postcode"] ?? row["postcode"] ?? "").trim(),
          lat,
          lng,
          ofstedRating: ofsted?.rating || null,
          ofstedDate,
          pupils: parseInt(row["NumberOfPupils"] ?? row["Pupils"] ?? "0", 10) || null,
          ageRangeLow: parseInt(row["StatutoryLowAge"] ?? row["AgeLow"] ?? "0", 10) || null,
          ageRangeHigh: parseInt(row["StatutoryHighAge"] ?? row["AgeHigh"] ?? "0", 10) || null,
          website: (row["SchoolWebsite"] ?? row["Website"] ?? null) || null,
          status: status || "Open",
        },
      });
      imported++;
      if (imported % 100 === 0) console.log(`  Imported ${imported}...`);
    } catch (err: unknown) {
      console.error(`  Error URN ${urn}:`, err instanceof Error ? err.message : String(err));
      skipped++;
    }
  }

  console.log(`\n✓ Schools import complete`);
  console.log(`  Imported: ${imported}`);
  console.log(`  Skipped: ${skipped}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
