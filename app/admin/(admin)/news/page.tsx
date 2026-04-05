import { prisma } from "@/lib/prisma";
import NewsReviewClient from "./NewsReviewClient";

export const metadata = {
  title: "News Review | Admin",
  description: "Review and approve pending news items.",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 100;

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; page?: string }>;
}) {
  const { view = "pending", page: pageStr = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const isPending = view !== "approved";

  const [items, totalCount, pendingCount] = await Promise.all([
    isPending
      ? prisma.newsItem.findMany({
          where: { status: "pending_review" },
          orderBy: { createdAt: "desc" },
          skip,
          take: PAGE_SIZE,
        })
      : prisma.newsItem.findMany({
          where: { status: { in: ["published", "auto_published"] } },
          orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
          skip,
          take: PAGE_SIZE,
        }),
    isPending
      ? prisma.newsItem.count({ where: { status: "pending_review" } })
      : prisma.newsItem.count({
          where: { status: { in: ["published", "auto_published"] } },
        }),
    // Always show pending count in the header regardless of tab
    prisma.newsItem.count({ where: { status: "pending_review" } }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const serialise = (arr: typeof items) =>
    arr.map((item) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      rawContent: item.rawContent ?? null,
      category: item.category,
      source: item.source,
      sourceUrl: item.sourceUrl ?? null,
      imageUrl: item.imageUrl ?? null,
      status: item.status,
      featured: item.featured,
      slug: item.slug ?? null,
      publishedAt: item.publishedAt?.toISOString() ?? null,
      createdAt: item.createdAt.toISOString(),
    }));

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-bold text-[#1B2E4B] mb-1">
        News Review
      </h1>
      <p className="text-xs text-gray-400 mb-6">
        Raw headlines shown. Claude rewrites on approve. Feature button fetches the full article and writes 500+ words for the hero slot.
      </p>
      <NewsReviewClient
        items={serialise(items)}
        view={isPending ? "pending" : "approved"}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pendingCount={pendingCount}
      />
    </div>
  );
}
