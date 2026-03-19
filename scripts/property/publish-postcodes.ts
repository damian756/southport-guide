#!/usr/bin/env tsx
/**
 * Set published=true for PostcodeUnit where salesCount3yr >= 3.
 * Usage: npx tsx scripts/property/publish-postcodes.ts
 *
 * Run after aggregate-postcodes.ts.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const MIN_SALES = 3;

async function main() {
  const published = await prisma.postcodeUnit.updateMany({
    where: { salesCount3yr: { gte: MIN_SALES } },
    data: { published: true },
  });

  const unpublished = await prisma.postcodeUnit.updateMany({
    where: { salesCount3yr: { lt: MIN_SALES } },
    data: { published: false },
  });

  console.log(`✓ Publish complete`);
  console.log(`  Published (>= ${MIN_SALES} sales): ${published.count}`);
  console.log(`  Unpublished (< ${MIN_SALES} sales): ${unpublished.count}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
