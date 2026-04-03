/**
 * Tags known Sunflower-registered venues in Southport with the "sunflower-friendly" tag.
 * Run with: npx tsx scripts/tag-sunflower-businesses.ts
 *
 * Businesses confirmed as Sunflower registered:
 *  - The Atkinson (Lord Street)
 *  - Southport train station (not a business listing — skipped)
 *
 * Businesses we are actively encouraging to register (add here when confirmed):
 *  - Southport Market
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SUNFLOWER_SLUGS = [
  "the-atkinson",
  "southport-market", // runs a Quiet Hour — Saturday 9–10am
];

const TAG = "sunflower-friendly";

async function main() {
  let updated = 0;
  let notFound = 0;

  for (const slug of SUNFLOWER_SLUGS) {
    const biz = await prisma.business.findUnique({ where: { slug } });

    if (!biz) {
      console.warn(`  NOT FOUND: ${slug}`);
      notFound++;
      continue;
    }

    if (biz.tags.includes(TAG)) {
      console.log(`  Already tagged: ${biz.name} (${slug})`);
      continue;
    }

    await prisma.business.update({
      where: { slug },
      data: { tags: { push: TAG } },
    });

    console.log(`  Tagged: ${biz.name} (${slug})`);
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, Not found: ${notFound}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
