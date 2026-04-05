import { prisma } from "../lib/prisma";

async function main() {
  const del = await prisma.newsItem.deleteMany({
    where: { status: "pending_review" },
  });
  console.log(`Deleted ${del.count} stale pending_review items.`);
  await prisma.$disconnect();
}

main().catch(console.error);
