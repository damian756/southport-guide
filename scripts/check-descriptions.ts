import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });

async function main() {
  const slugs = ["hickory-s-smokehouse-southport", "hickorys-smokehouse", "hickorys-southport"];

  for (const slug of slugs) {
    const b = await prisma.business.findFirst({
      where: { slug },
      select: { name: true, description: true },
    });
    if (b) {
      console.log(`\n=== ${b.name} ===\n${b.description}\n`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
