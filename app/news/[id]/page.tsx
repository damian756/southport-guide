import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
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
} from "lucide-react";

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  planning: "Planning",
  business: "Business",
  sport: "Sport",
  council: "Council",
  community: "Community",
  events: "Events",
  "food-drink": "Food & Drink",
  property: "Property",
  "crime-safety": "Crime & Safety",
  transport: "Transport",
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  planning: Gavel,
  business: Building2,
  sport: Trophy,
  council: Users,
  community: Users,
  events: Calendar,
  "food-drink": Utensils,
  property: Home,
  "crime-safety": ShieldAlert,
  transport: Train,
};

const SOURCE_LABELS: Record<string, string> = {
  "merseyside-police": "Merseyside Police",
  "sefton-council": "Sefton Council",
  "environment-agency": "Environment Agency",
  "southport-fc": "Southport FC",
  sufs: "Stand Up For Southport",
  visiter: "Southport Visiter",
  "southport-news": "Southport News",
  "user-submitted": "Community",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await prisma.newsItem.findUnique({
    where: { id },
    select: { title: true, summary: true, imageUrl: true },
  });

  if (!item) return { title: "Not Found" };

  return {
    title: `${item.title} | Southport Live`,
    description: item.summary.slice(0, 160),
    alternates: {
      canonical: `https://www.southportguide.co.uk/news/${id}`,
    },
    openGraph: {
      type: "article",
      siteName: "SouthportGuide.co.uk",
      locale: "en_GB",
      title: item.title,
      description: item.summary.slice(0, 160),
      url: `https://www.southportguide.co.uk/news/${id}`,
      images: item.imageUrl
        ? [{ url: item.imageUrl, width: 1080, height: 720, alt: item.title }]
        : [{ url: "https://www.southportguide.co.uk/og-default.png", width: 1200, height: 630 }],
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await prisma.newsItem.findUnique({
    where: { id, status: { in: ["auto_published", "published"] } },
  });

  if (!item) notFound();

  const dateStr = item.publishedAt?.toISOString() ?? item.createdAt.toISOString();
  const sourceLabel = SOURCE_LABELS[item.source] ?? item.source;
  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category;
  const CategoryIcon = CATEGORY_ICONS[item.category] ?? Newspaper;

  // Split summary into paragraphs on double newlines or sentence boundaries
  const paragraphs = item.summary
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Back nav */}
      <div className="bg-[#1B2E4B]">
        <div className="max-w-3xl mx-auto px-4 py-3 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Southport Live
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-8 lg:px-8">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#1B2E4B]/10 text-[#1B2E4B]">
            <CategoryIcon className="w-3.5 h-3.5" />
            {categoryLabel}
          </span>
          <span className="text-gray-400 text-xs">{sourceLabel}</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1B2E4B] leading-snug mb-3">
          {item.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Clock className="w-3.5 h-3.5" />
          <time dateTime={dateStr}>{formatDate(dateStr)}</time>
        </div>

        {/* Hero image */}
        {item.imageUrl && (
          <div className="relative w-full rounded-xl overflow-hidden mb-8" style={{ aspectRatio: "16/9" }}>
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            {item.imageCredit && (
              <p className="absolute bottom-2 right-2 text-[10px] text-white/60 bg-black/30 px-1.5 py-0.5 rounded">
                {item.imageCredit}
              </p>
            )}
          </div>
        )}

        {/* Body */}
        <div className="prose prose-sm lg:prose-base max-w-none text-gray-700 leading-relaxed space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Source link */}
        {item.sourceUrl && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 mb-2">Original source</p>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#C9A84C] hover:underline"
            >
              Read the original article on {sourceLabel}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm text-[#1B2E4B] hover:text-[#C9A84C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Southport Live
          </Link>
        </div>
      </article>
    </div>
  );
}
