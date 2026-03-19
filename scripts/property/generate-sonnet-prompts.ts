#!/usr/bin/env tsx
/**
 * Generate per-postcode JSON prompt files for Sonnet editorial pass.
 * Output: data/editorial-prompts/{sector|unit}-{slug}.json
 * Usage: npx tsx scripts/property/generate-sonnet-prompts.ts
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";
import { sectorToSlug, postcodeToSlug, getAreaLabelForSector } from "@/lib/property-config";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const OUT_DIR = path.join(process.cwd(), "data", "editorial-prompts");

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const sectors = await prisma.postcodeSector.findMany({
    where: { published: true },
  });

  for (const s of sectors) {
    const areaLabel = getAreaLabelForSector(s.sector);
    const prompt = {
      type: "sector",
      slug: sectorToSlug(s.sector),
      sector: s.sector,
      areaLabel,
      avgPrice3yr: s.avgPrice3yr,
      medianPrice3yr: s.medianPrice3yr,
      salesCount3yr: s.salesCount3yr,
      editorialContent: s.editorialContent,
      metaTitle: s.metaTitle,
      metaDescription: s.metaDescription,
      faqJson: s.faqJson,
      instructions: `Write Terry's neighbourhood summary (100-150 words) for ${s.sector} — ${areaLabel}, Southport. Be honest, practical, and specific. Mention what the area is actually like to live in. Then write 5-8 FAQ questions and answers. Finally suggest meta title and description. Store results in editorialContent, faqJson, metaTitle, metaDescription.`,
    };
    const outPath = path.join(OUT_DIR, `sector-${sectorToSlug(s.sector)}.json`);
    fs.writeFileSync(outPath, JSON.stringify(prompt, null, 2));
  }

  const units = await prisma.postcodeUnit.findMany({
    where: { published: true },
  });

  for (const u of units) {
    const sectorRec = await prisma.postcodeSector.findFirst({
      where: { sector: u.sector },
    });
    const areaLabel = sectorRec ? getAreaLabelForSector(u.sector) : u.sector;
    const prompt = {
      type: "unit",
      slug: postcodeToSlug(u.postcode),
      postcode: u.postcode,
      sector: u.sector,
      areaLabel,
      avgPrice3yr: u.avgPrice3yr,
      salesCount3yr: u.salesCount3yr,
      editorialContent: u.editorialContent,
      metaTitle: u.metaTitle,
      metaDescription: u.metaDescription,
      faqJson: u.faqJson,
      instructions: `Write Terry's street-level notes (60-80 words) for ${u.postcode} — ${areaLabel}, Southport. Be concise. Then write 3-5 FAQ questions and answers. Suggest meta title and description.`,
    };
    const outPath = path.join(OUT_DIR, `unit-${postcodeToSlug(u.postcode)}.json`);
    fs.writeFileSync(outPath, JSON.stringify(prompt, null, 2));
  }

  console.log(`✓ Generated ${sectors.length} sector + ${units.length} unit prompts in ${OUT_DIR}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
