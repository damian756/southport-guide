import { prisma } from "../lib/prisma";

async function main() {
  const item = await prisma.newsItem.findFirst({
    where: { status: "pending_review" },
    orderBy: { createdAt: "desc" },
    select: { title: true, summary: true, slug: true, createdAt: true },
  });

  if (!item) {
    console.log("No pending items found.");
  } else {
    console.log("Title:", item.title);
    console.log("Slug:", item.slug);
    console.log("Created:", item.createdAt);
    console.log("Paragraphs:", item.summary.split("\n\n").length);
    console.log("\n--- SUMMARY ---\n");
    console.log(item.summary);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
