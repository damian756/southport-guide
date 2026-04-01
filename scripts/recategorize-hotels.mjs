import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) { console.error("DATABASE_URL not set"); process.exit(1); }

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

// Patterns that strongly indicate accommodation, not a restaurant
const HOTEL_PATTERNS = [
  /\bhotel\b/i,
  /\bguest\s*house\b/i,
  /\bbed\s*(&|and)\s*breakfast\b/i,
  /\bb\s*&\s*b\b/i,
  /\bb&b\b/i,
  /\blodge\b/i,
  /\bapartment/i,
  /\bsuite\b/i,
  /\bcottage/i,
  /\bglamping\b/i,
  /\bholiday\s*(let|park|cottage)/i,
  /\bboutique\s*rooms?\b/i,
  /\bcaravan\b/i,
];

// Names that should NOT be moved despite matching a pattern
const EXCLUDE_NAMES = [
  /^silcock/i, // Silcock's Pier Family Restaurant
  /pizza/i,    // "Hotel Casa" might match but pizza places shouldn't
];

async function main() {
  const restaurantsCat = await prisma.category.findFirst({ where: { slug: "restaurants" } });
  const hotelsCat = await prisma.category.findFirst({ where: { slug: "hotels" } });

  if (!restaurantsCat || !hotelsCat) {
    console.error("Could not find restaurants or hotels category");
    process.exit(1);
  }

  console.log(`Restaurants category ID: ${restaurantsCat.id}`);
  console.log(`Hotels category ID:      ${hotelsCat.id}`);
  console.log();

  const businesses = await prisma.business.findMany({
    where: { categoryId: restaurantsCat.id },
    select: { id: true, slug: true, name: true, secondaryCategoryIds: true },
    orderBy: { name: "asc" },
  });

  console.log(`Total businesses in restaurants: ${businesses.length}`);
  console.log();

  const toMove = [];

  for (const b of businesses) {
    const nameMatch = HOTEL_PATTERNS.some((p) => p.test(b.name));
    if (!nameMatch) continue;

    const excluded = EXCLUDE_NAMES.some((p) => p.test(b.name));
    if (excluded) continue;

    toMove.push(b);
  }

  console.log(`Businesses to move to hotels: ${toMove.length}`);
  console.log("---");
  for (const b of toMove) {
    console.log(`  ${b.name} (${b.slug})`);
  }
  console.log();

  if (process.argv.includes("--dry-run")) {
    console.log("DRY RUN - no changes made. Remove --dry-run to execute.");
    await prisma.$disconnect();
    return;
  }

  let moved = 0;
  for (const b of toMove) {
    // Add restaurants as a secondary category so they still show up on /restaurants
    const secondaryIds = new Set(b.secondaryCategoryIds || []);
    secondaryIds.add(restaurantsCat.id);
    // Remove hotels from secondary if it was there
    secondaryIds.delete(hotelsCat.id);

    await prisma.business.update({
      where: { id: b.id },
      data: {
        categoryId: hotelsCat.id,
        secondaryCategoryIds: [...secondaryIds],
      },
    });
    moved++;
    console.log(`  Moved: ${b.name}`);
  }

  console.log();
  console.log(`Done. ${moved} businesses moved from restaurants to hotels.`);
  console.log("Old restaurant URLs will 308 redirect to /hotels/ automatically.");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
