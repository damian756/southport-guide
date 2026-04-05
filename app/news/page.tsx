import { prisma } from "@/lib/prisma";
import NewsPageClient from "./NewsPageClient";
import type { Metadata } from "next";

export const revalidate = 300; // Refresh every 5 minutes

export const metadata: Metadata = {
  title: "Southport News | Southport Live | SouthportGuide.co.uk",
  description:
    "The latest Southport news: planning applications, local business, Southport FC, community updates and more. Updated throughout the day.",
  alternates: { canonical: "https://www.southportguide.co.uk/news" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Southport News | Southport Live",
    description:
      "The latest Southport news: planning applications, local business, Southport FC, community updates and more.",
    url: "https://www.southportguide.co.uk/news",
    images: [
      {
        url: "https://www.southportguide.co.uk/og-default.png",
        width: 1200,
        height: 630,
        alt: "Southport Live News",
      },
    ],
  },
};

export type NewsItemCard = {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  sourceUrl: string | null;
  imageUrl: string | null;
  imageCredit: string | null;
  publishedAt: string | null;
  createdAt: string;
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const where = {
    status: { in: ["auto_published", "published"] },
    ...(category && category !== "all" ? { category } : {}),
  };

  const items = await prisma.newsItem.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 60,
    select: {
      id: true,
      title: true,
      summary: true,
      category: true,
      source: true,
      sourceUrl: true,
      imageUrl: true,
      imageCredit: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const latestItem = items[0];
  const lastUpdated = latestItem
    ? (latestItem.publishedAt ?? latestItem.createdAt)
    : null;

  const serialised: NewsItemCard[] = items.map((item) => ({
    ...item,
    publishedAt: item.publishedAt?.toISOString() ?? null,
    createdAt: item.createdAt.toISOString(),
  }));

  return (
    <NewsPageClient
      items={serialised}
      activeCategory={category ?? "all"}
      lastUpdated={lastUpdated?.toISOString() ?? null}
    />
  );
}
