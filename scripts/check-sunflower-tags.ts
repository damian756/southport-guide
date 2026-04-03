import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL || "" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tagged = await prisma.business.findMany({
    where: { tags: { has: "sunflower-friendly" } },
    select: { slug: true, name: true, tags: true },
  });
  console.log("Sunflower-tagged businesses:");
  tagged.forEach((b) => console.log(`  ${b.name} (${b.slug})`));

  const market = await prisma.business.findMany({
    where: { name: { contains: "Market", mode: "insensitive" } },
    select: { slug: true, name: true },
  });
  console.log("\nMarket-named businesses:");
  market.forEach((b) => console.log(`  ${b.name} (${b.slug})`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
