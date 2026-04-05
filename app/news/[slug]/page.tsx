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
  CheckCircle2,
  Mail,
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

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

async function getItem(slug: string) {
  return prisma.newsItem.findFirst({
    where: {
      status: { in: ["auto_published", "published"] },
      OR: [{ slug }, { id: slug }],
    },
  });
}

async function getRelated(category: string, excludeId: string) {
  return prisma.newsItem.findMany({
    where: {
      status: { in: ["auto_published", "published"] },
      category,
      id: { not: excludeId },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      imageUrl: true,
      category: true,
      publishedAt: true,
      createdAt: true,
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItem(slug);

  if (!item) return { title: "Not Found" };

  const dateStr = item.publishedAt?.toISOString() ?? item.createdAt.toISOString();
  const canonical = `https://www.southportguide.co.uk/news/${item.slug ?? item.id}`;
  const teaser = item.summary.split("\n\n")[0]?.slice(0, 160).replace(/\n/g, " ") ?? "";

  return {
    title: `${item.title} | Southport Live`,
    description: teaser,
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName: "SouthportGuide.co.uk",
      locale: "en_GB",
      title: item.title,
      description: teaser,
      url: canonical,
      publishedTime: dateStr,
      authors: ["https://www.southportguide.co.uk"],
      tags: [item.category, "Southport", "Merseyside"],
      images: item.imageUrl
        ? [{ url: item.imageUrl, width: 1080, height: 720, alt: item.title }]
        : [{ url: "https://www.southportguide.co.uk/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: teaser,
      images: item.imageUrl ? [item.imageUrl] : ["https://www.southportguide.co.uk/og-default.png"],
    },
  };
}

// Extract featured subheading stored as "h2:..." in keyFacts[0]
function parseKeyFacts(rawKeyFacts: string[]): { subheading: string | null; facts: string[] } {
  if (rawKeyFacts[0]?.startsWith("h2:")) {
    return {
      subheading: rawKeyFacts[0].slice(3),
      facts: rawKeyFacts.slice(1),
    };
  }
  return { subheading: null, facts: rawKeyFacts };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getItem(slug);

  if (!item) notFound();

  const relatedItems = await getRelated(item.category, item.id);

  const dateStr = item.publishedAt?.toISOString() ?? item.createdAt.toISOString();
  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category;
  const CategoryIcon = CATEGORY_ICONS[item.category] ?? Newspaper;
  const canonical = `https://www.southportguide.co.uk/news/${item.slug ?? item.id}`;
  const teaser = item.summary.split("\n\n")[0]?.slice(0, 160).replace(/\n/g, " ") ?? "";

  const { subheading, facts: keyFacts } = parseKeyFacts(item.keyFacts);

  // Split body at subheading insertion point (after 2nd paragraph for featured)
  const allParagraphs = item.summary
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const insertSubheadingAfter = item.featured && subheading ? 2 : -1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: teaser,
    datePublished: dateStr,
    dateModified: dateStr,
    url: canonical,
    author: {
      "@type": "Person",
      name: "Terry",
      description: "41-year-old Southport local, Churchtown resident, writer for SouthportGuide.co.uk",
      url: "https://www.southportguide.co.uk/news",
    },
    publisher: {
      "@type": "Organization",
      name: "SouthportGuide.co.uk",
      url: "https://www.southportguide.co.uk",
      logo: {
        "@type": "ImageObject",
        url: "https://www.southportguide.co.uk/og-default.png",
      },
    },
    ...(item.imageUrl && {
      image: {
        "@type": "ImageObject",
        url: item.imageUrl,
        width: 1080,
        height: 720,
      },
    }),
    articleSection: categoryLabel,
    keywords: `Southport, Merseyside, ${categoryLabel}`,
    isAccessibleForFree: true,
    inLanguage: "en-GB",
  };

  const shareUrl = encodeURIComponent(canonical);
  const shareTitle = encodeURIComponent(item.title);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          {item.featured && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#C9A84C]/15 text-[#C9A84C]">
              Featured
            </span>
          )}
        </div>

        {/* Headline */}
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1B2E4B] leading-snug mb-3">
          {item.title}
        </h1>

        {/* Date */}
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

        {/* Key facts box */}
        {keyFacts.length > 0 && (
          <div className="mb-8 bg-[#1B2E4B]/5 border border-[#1B2E4B]/10 rounded-xl p-5">
            <p className="text-xs font-semibold text-[#1B2E4B]/60 uppercase tracking-wide mb-3">
              Key facts
            </p>
            <ul className="space-y-2">
              {keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#1B2E4B]">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body — with optional mid-article subheading for featured pieces */}
        <div className="space-y-5 text-gray-700 leading-relaxed text-base">
          {allParagraphs.map((para, i) => (
            <>
              <p key={i}>{para}</p>
              {i === insertSubheadingAfter && subheading && (
                <h2
                  key={`h2-${i}`}
                  className="text-xl font-bold text-[#1B2E4B] pt-2"
                >
                  {subheading}
                </h2>
              )}
            </>
          ))}
        </div>

        {/* Social share */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Share this story
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>

        {/* Terry bio */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1B2E4B] flex items-center justify-center flex-shrink-0 text-white text-lg font-bold select-none">
              T
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1B2E4B]">Written by Terry</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                41-year-old Southport local. Lived in Churchtown his whole life.
                Writes the Southport Live news section for SouthportGuide.co.uk.
                He tells it straight.
              </p>
            </div>
          </div>
        </div>

        {/* Got a story CTA */}
        <div className="mt-8 bg-[#1B2E4B] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            <p className="font-bold text-base leading-snug">Got a tip or a story?</p>
            <p className="text-white/70 text-sm mt-1">
              Know something Southport should know about? Send it over.
            </p>
          </div>
          <a
            href="mailto:news@southportguide.co.uk?subject=Story tip"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-white font-semibold text-sm rounded-xl hover:bg-[#b8963d] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
        </div>

        {/* Related articles */}
        {relatedItems.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              More {categoryLabel} news
            </h2>
            <div className="space-y-3">
              {relatedItems.map((related) => {
                const relatedTime = (related.publishedAt ?? related.createdAt).toISOString();
                const RelatedIcon = CATEGORY_ICONS[related.category] ?? Newspaper;
                return (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug ?? related.id}`}
                    className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all group"
                  >
                    {related.imageUrl ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={related.imageUrl}
                          alt={related.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <RelatedIcon className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1B2E4B] leading-snug line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
                        {related.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(relatedTime)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
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
