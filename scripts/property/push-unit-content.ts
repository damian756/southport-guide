#!/usr/bin/env tsx
/**
 * Generate and push programmatic meta titles, descriptions, and editorial snippets
 * for all published unit (full postcode) pages.
 *
 * Content is data-driven and written in Terry's voice — specific, practical, honest.
 * Unit pages get noindex until editorial content is present, so this script
 * enables indexing by writing content to every unit.
 *
 * Run: npx tsx scripts/property/push-unit-content.ts
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SECTOR_AREA_LABELS: Record<string, string> = {
  "PR8 1": "Town Centre",
  "PR8 2": "Woodvale & Ainsdale-on-Sea",
  "PR8 3": "Ainsdale",
  "PR8 4": "Birkdale",
  "PR8 5": "Scarisbrick & Rural South",
  "PR8 6": "Blowick",
  "PR9 0": "Town Centre & Promenade",
  "PR9 7": "High Park & Norwood",
  "PR9 8": "Banks & Crossens",
  "PR9 9": "Churchtown & Marshside",
};

/** Roughly what this postcode is in plain English — used in editorial snippets */
const SECTOR_CHARACTER: Record<string, string> = {
  "PR8 1": "Southport's town centre, close to Lord Street and the beach",
  "PR8 2": "the coastal strip near Woodvale and the National Trust sand dunes",
  "PR8 3": "Ainsdale village, with its own shops, station, and community feel",
  "PR8 4": "Birkdale — one of Southport's most sought-after residential areas, near the village and Royal Birkdale Golf Club",
  "PR8 5": "the southern edge of Southport, extending toward rural Scarisbrick",
  "PR8 6": "Blowick on the eastern side of Southport, a practical and affordable residential area",
  "PR9 0": "Southport's promenade and seafront area, close to the Pier and Marine Drive",
  "PR9 7": "High Park and Norwood — residential Southport between the town centre and Churchtown",
  "PR9 8": "Crossens and Banks, the northernmost edge of Southport into rural Lancashire",
  "PR9 9": "Churchtown and Marshside — Southport's historic village, popular with families",
};

function buildEditorial(postcode: string, sector: string, avgPrice3yr: number | null, salesCount3yr: number): string {
  const areaLabel = SECTOR_AREA_LABELS[sector] ?? sector;
  const character = SECTOR_CHARACTER[sector] ?? `the ${areaLabel} area of Southport`;
  const priceStr = avgPrice3yr ? `around £${Math.round(avgPrice3yr / 1000)}k` : "varying prices";
  const salesStr = salesCount3yr === 1 ? "1 sale" : `${salesCount3yr} sales`;

  return `${postcode} is a postcode in ${character}. Over the last three years there have been ${salesStr} in this postcode at an average of ${priceStr}. The data above covers all recorded Land Registry transactions, including the most recent sales, flood risk, broadband, and nearby schools. For a broader picture of the area, see the ${sector} sector page.`;
}

function buildFaqs(postcode: string, sector: string, avgPrice3yr: number | null, salesCount3yr: number): { question: string; answer: string }[] {
  const areaLabel = SECTOR_AREA_LABELS[sector] ?? sector;
  const priceStr = avgPrice3yr ? `£${Math.round(avgPrice3yr / 1000)}k` : "not enough data to average";

  return [
    {
      question: `What are house prices in ${postcode}?`,
      answer: `The 3-year average price for ${postcode} is ${priceStr}, based on ${salesCount3yr} Land Registry sale${salesCount3yr !== 1 ? "s" : ""}. See the recent sales table above for individual transactions.`,
    },
    {
      question: `What area of Southport is ${postcode}?`,
      answer: `${postcode} is in the ${sector} postcode sector, covering ${areaLabel}. See the ${sector} area guide for schools, crime data, and neighbourhood information for the wider area.`,
    },
    {
      question: `Is ${postcode} a good postcode to buy in?`,
      answer: `That depends on your priorities. The data above gives you the key facts — average price, recent sales, flood risk, broadband speeds, and nearby schools. The ${sector} area guide has the fuller neighbourhood picture.`,
    },
    {
      question: `What is the flood risk for ${postcode}?`,
      answer: `Flood risk for ${postcode} is shown in the flood risk badge above, based on Environment Agency data. Check this carefully if the property is near the coast or any watercourse.`,
    },
  ];
}

function buildMetaTitle(postcode: string, sector: string): string {
  const areaLabel = SECTOR_AREA_LABELS[sector] ?? sector;
  return `House Prices in ${postcode} — ${areaLabel}, Southport`;
}

function buildMetaDescription(postcode: string, sector: string, avgPrice3yr: number | null, salesCount3yr: number): string {
  const areaLabel = SECTOR_AREA_LABELS[sector] ?? sector;
  const priceStr = avgPrice3yr ? `£${Math.round(avgPrice3yr / 1000)}k average` : "see data";
  return `${postcode} in ${areaLabel}, Southport. ${priceStr} from ${salesCount3yr} sale${salesCount3yr !== 1 ? "s" : ""}. Land Registry prices, schools, flood risk and broadband data for ${postcode}.`;
}

async function main() {
  const units = await prisma.postcodeUnit.findMany({
    where: { published: true },
  });

  console.log(`Processing ${units.length} unit pages…`);

  let updated = 0;
  const BATCH = 50;

  for (let i = 0; i < units.length; i += BATCH) {
    const batch = units.slice(i, i + BATCH);
    await Promise.all(
      batch.map((u) =>
        prisma.postcodeUnit.update({
          where: { id: u.id },
          data: {
            editorialContent: buildEditorial(u.postcode, u.sector, u.avgPrice3yr, u.salesCount3yr),
            metaTitle: buildMetaTitle(u.postcode, u.sector),
            metaDescription: buildMetaDescription(u.postcode, u.sector, u.avgPrice3yr, u.salesCount3yr),
            faqJson: buildFaqs(u.postcode, u.sector, u.avgPrice3yr, u.salesCount3yr),
          },
        })
      )
    );
    updated += batch.length;
    process.stdout.write(`\r  ${updated}/${units.length} updated`);
  }

  console.log(`\n✓ Done. ${updated} unit pages updated.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
