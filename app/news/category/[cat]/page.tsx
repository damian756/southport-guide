// Category landing pages: /news/category/planning, /news/category/sport, etc.
// Dedicated, indexable pages for each news category — better for SEO than query params.

import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  Newspaper,
  Gavel,
  Building2,
  Trophy,
  Users,
  Calendar,
  Utensils,
  Home,
  ShieldAlert,
  Train,
  AlertTriangle,
} from "lucide-react";

export const revalidate = 300;

const CATEGORIES: Record<string, { label: string; description: string; icon: React.ElementType }> = {
  planning: {
    label: "Planning",
    description: "Planning applications, approvals, and developments in Southport and the Sefton area.",
    icon: Gavel,
  },
  business: {
    label: "Business",
    description: "Local business news: openings, closures, investment, and jobs in Southport.",
    icon: Building2,
  },
  sport: {
    label: "Sport",
    description: "Southport FC, local sport, and results. If it happened on a pitch or in a pool near Southport, it's here.",
    icon: Trophy,
  },
  council: {
    label: "Council",
    description: "Sefton Council decisions, meetings, consultations, and local government news.",
    icon: Users,
  },
  community: {
    label: "Community",
    description: "Local community news, charity, volunteering, and events that matter to Southport residents.",
    icon: Users,
  },
  events: {
    label: "Events",
    description: "What's on in Southport: festivals, markets, shows, and everything else worth putting in the diary.",
    icon: Calendar,
  },
  "food-drink": {
    label: "Food & Drink",
    description: "Restaurant news, new openings, closures, and food and drink updates across Southport.",
    icon: Utensils,
  },
  property: {
    label: "Property",
    description: "Property news, new developments, and housing updates for Southport and the Sefton area.",
    icon: Home,
  },
  "crime-safety": {
    label: "Crime & Safety",
    description: "Merseyside Police updates, crime news, and safety information for Southport.",
    icon: ShieldAlert,
  },
  transport: {
    label: "Transport",
    description: "Road closures, rail updates, parking, and transport news for Southport.",
    icon: Train,
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((cat) => ({ cat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const category = CATEGORIES[cat];
  if (!category) return { title: "Not Found" };

  return {
    title: `${category.label} News Southport | Southport Live`,
    description: category.description,
    alternates: { canonical: `https://www.southportguide.co.uk/news/category/${cat}` },
    openGraph: {
      type: "website",
      siteName: "SouthportGuide.co.uk",
      locale: "en_GB",
      title: `${category.label} News Southport`,
      description: category.description,
      url: `https://www.southportguide.co.uk/news/category/${cat}`,
    },
  };
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const category = CATEGORIES[cat];

  if (!category) notFound();

  const CategoryIcon = category.icon;

  const items = await prisma.newsItem.findMany({
    where: {
      status: { in: ["published", "auto_published"] },
      category: cat,
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 40,
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      imageUrl: true,
      featured: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const categoryUrl = `https://www.southportguide.co.uk/news/category/${cat}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${category.label} News Southport`,
      description: category.description,
      url: categoryUrl,
      about: { "@type": "Thing", name: `${category.label} in Southport, Merseyside` },
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
        { "@type": "ListItem", position: 2, name: "Southport Live", item: "https://www.southportguide.co.uk/news" },
        { "@type": "ListItem", position: 3, name: category.label, item: categoryUrl },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header */}
      <div className="bg-[#1B2E4B] text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All news
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <CategoryIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold font-display">
              {category.label}
            </h1>
          </div>
          <p className="text-white/60 text-sm max-w-2xl">{category.description}</p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-5xl mx-auto px-4 py-8 lg:px-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <AlertTriangle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No articles yet in {category.label}.</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => {
              const timeStr = (item.publishedAt ?? item.createdAt).toISOString();
              return (
                <Link
                  key={item.id}
                  href={`/news/${item.slug ?? item.id}`}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="relative h-40 bg-gray-50 flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <Newspaper className="w-10 h-10 text-gray-200" />
                      </div>
                    )}
                    {item.featured && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#C9A84C] text-white text-xs font-semibold rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="font-semibold text-[#1B2E4B] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 flex-1">
                      {item.summary.split("\n\n")[0]}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(timeStr)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* All categories nav */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Browse by category
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORIES).map(([slug, catData]) => {
              const CatIcon = catData.icon;
              return (
                <Link
                  key={slug}
                  href={`/news/category/${slug}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    slug === cat
                      ? "bg-[#1B2E4B] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#1B2E4B] hover:text-[#1B2E4B]"
                  }`}
                >
                  <CatIcon className="w-3 h-3" />
                  {catData.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
