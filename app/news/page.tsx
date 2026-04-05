import { prisma } from "@/lib/prisma";
import NewsPageClient from "./NewsPageClient";
import type { Metadata } from "next";

export const revalidate = 300;

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
  twitter: {
    card: "summary_large_image",
    site: "@SouthportGuide",
    title: "Southport News | Southport Live",
    description: "The latest Southport news: planning applications, local business, Southport FC, community updates and more.",
    images: ["https://www.southportguide.co.uk/og-default.png"],
  },
};

export type NewsItemCard = {
  id: string;
  slug: string | null;
  title: string;
  summary: string;
  category: string;
  source: string;
  sourceUrl: string | null;
  imageUrl: string | null;
  imageCredit: string | null;
  featured: boolean;
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

  const [featuredItem, items] = await Promise.all([
    // Fetch the most recent featured item (always, regardless of category filter)
    category && category !== "all"
      ? Promise.resolve(null)
      : prisma.newsItem.findFirst({
          where: { status: { in: ["auto_published", "published"] }, featured: true },
          orderBy: { publishedAt: "desc" },
          select: {
            id: true,
            slug: true,
            title: true,
            summary: true,
            category: true,
            source: true,
            sourceUrl: true,
            imageUrl: true,
            imageCredit: true,
            featured: true,
            publishedAt: true,
            createdAt: true,
          },
        }),
    prisma.newsItem.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 60,
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        category: true,
        source: true,
        sourceUrl: true,
        imageUrl: true,
        imageCredit: true,
        featured: true,
        publishedAt: true,
        createdAt: true,
      },
    }),
  ]);

  const latestItem = items[0];
  const lastUpdated = latestItem
    ? (latestItem.publishedAt ?? latestItem.createdAt)
    : null;

  function serialiseItem(item: (typeof items)[0]): NewsItemCard {
    return {
      ...item,
      publishedAt: item.publishedAt?.toISOString() ?? null,
      createdAt: item.createdAt.toISOString(),
    };
  }

  const serialisedFeatured = featuredItem ? serialiseItem(featuredItem) : null;

  // Exclude the featured item from the grid to avoid duplication
  const serialisedItems: NewsItemCard[] = items
    .filter((item) => !featuredItem || item.id !== featuredItem.id)
    .map(serialiseItem);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Southport Live",
    description: "The latest Southport news: planning applications, local business, Southport FC, community updates and more.",
    url: "https://www.southportguide.co.uk/news",
    ...(lastUpdated && { dateModified: lastUpdated.toISOString() }),
    publisher: {
      "@type": "Organization",
      name: "SouthportGuide.co.uk",
      url: "https://www.southportguide.co.uk",
      logo: { "@type": "ImageObject", url: "https://www.southportguide.co.uk/favicon-32x32.png", width: 32, height: 32 },
      parentOrganization: {
        "@type": "Organization",
        name: "Churchtown Media",
        url: "https://churchtownmedia.co.uk",
      },
    },
    about: { "@type": "Place", name: "Southport", containedInPlace: { "@type": "Place", name: "Merseyside, England" } },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsPageClient
        items={serialisedItems}
        featuredItem={serialisedFeatured}
        activeCategory={category ?? "all"}
        lastUpdated={lastUpdated?.toISOString() ?? null}
      />
    </>
  );
}
