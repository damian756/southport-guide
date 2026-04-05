import { prisma } from "@/lib/prisma";
import NewsReviewClient from "./NewsReviewClient";

export const metadata = {
  title: "News Review | Admin",
  description: "Review and approve pending news items.",
  robots: { index: false, follow: false },
};

export default async function AdminNewsPage() {
  const [pending, recent] = await Promise.all([
    prisma.newsItem.findMany({
      where: { status: "pending_review" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.newsItem.findMany({
      where: { status: { in: ["auto_published", "published", "rejected"] } },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  const serialise = (items: typeof pending) =>
    items.map((item) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      rawContent: item.rawContent ?? null,
      category: item.category,
      source: item.source,
      sourceUrl: item.sourceUrl ?? null,
      imageUrl: item.imageUrl ?? null,
      status: item.status,
      publishedAt: item.publishedAt?.toISOString() ?? null,
      createdAt: item.createdAt.toISOString(),
    }));

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-bold text-[#1B2E4B] mb-1">
        News Review
      </h1>
      <p className="text-sm text-gray-500 mb-1">
        {pending.length} item{pending.length !== 1 ? "s" : ""} waiting for approval
      </p>
      <p className="text-xs text-gray-400 mb-6">
        Raw headlines shown. Claude rewrites only on approve — reject freely, no credit cost.
      </p>
      <NewsReviewClient pending={serialise(pending)} recent={serialise(recent)} />
    </div>
  );
}
