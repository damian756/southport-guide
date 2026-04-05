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
  MapPin,
  ExternalLink,
  ParkingCircle,
} from "lucide-react";
import ShareButtons from "./components/ShareButtons";

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

// Contextual guide links shown at the bottom of each article, based on category
const CONTEXTUAL_LINKS: Record<
  string,
  Array<{ label: string; href: string; description: string; icon: React.ElementType }>
> = {
  planning: [
    { label: "Things to Do", href: "/things-to-do", description: "Days out across Southport", icon: MapPin },
    { label: "Parking in Southport", href: "/parking", description: "Car parks, prices and postcodes", icon: ParkingCircle },
  ],
  business: [
    { label: "Restaurants & Dining", href: "/restaurants", description: "Find somewhere to eat", icon: Utensils },
    { label: "Things to Do", href: "/things-to-do", description: "Explore Southport", icon: MapPin },
  ],
  sport: [
    { label: "Things to Do", href: "/things-to-do", description: "Make the most of Southport", icon: MapPin },
    { label: "The Open 2026", href: "/the-open-2026", description: "Royal Birkdale, 12-19 July 2026", icon: Trophy },
  ],
  council: [
    { label: "Parking in Southport", href: "/parking", description: "Car parks and prices", icon: ParkingCircle },
    { label: "Things to Do", href: "/things-to-do", description: "Explore Southport", icon: MapPin },
  ],
  community: [
    { label: "Things to Do", href: "/things-to-do", description: "Days out for everyone", icon: MapPin },
    { label: "Southport Beach", href: "/southport-beach", description: "Southport's stretch of coastline", icon: MapPin },
    { label: "Parking in Southport", href: "/parking", description: "Car parks near the seafront", icon: ParkingCircle },
  ],
  events: [
    { label: "All Events in Southport", href: "/events", description: "Full events calendar", icon: Calendar },
    { label: "Things to Do", href: "/things-to-do", description: "Make the most of Southport", icon: MapPin },
    { label: "Parking in Southport", href: "/parking", description: "Get parked up easily", icon: ParkingCircle },
  ],
  "food-drink": [
    { label: "Restaurants in Southport", href: "/restaurants", description: "Full restaurant guide", icon: Utensils },
    { label: "Birkdale Village", href: "/birkdale-village", description: "Southport's independent dining quarter", icon: MapPin },
  ],
  property: [
    { label: "Southport House Prices", href: "/property", description: "Street-level property data", icon: Home },
    { label: "Things to Do", href: "/things-to-do", description: "Explore Southport", icon: MapPin },
  ],
  "crime-safety": [
    { label: "Parking in Southport", href: "/parking", description: "Secure town centre car parks", icon: ParkingCircle },
    { label: "Things to Do", href: "/things-to-do", description: "Explore Southport safely", icon: MapPin },
  ],
  transport: [
    { label: "Parking in Southport", href: "/parking", description: "Car parks, prices and postcodes", icon: ParkingCircle },
    { label: "Things to Do", href: "/things-to-do", description: "Explore Southport", icon: MapPin },
  ],
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

function formatEventDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
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

async function getUpcomingEvents() {
  return prisma.event.findMany({
    where: {
      status: "approved",
      dateStart: { gte: new Date() },
    },
    orderBy: { dateStart: "asc" },
    take: 3,
    select: {
      id: true,
      slug: true,
      name: true,
      dateStart: true,
      isFree: true,
      venueName: true,
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
      authors: ["https://www.southportguide.co.uk/news/author/terry"],
      tags: [item.category, "Southport", "Merseyside"],
      images: item.imageUrl
        ? [{ url: item.imageUrl, width: 1080, height: 720, alt: item.title }]
        : [{ url: "https://www.southportguide.co.uk/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@SouthportGuide",
      title: item.title,
      description: teaser,
      images: item.imageUrl ? [item.imageUrl] : ["https://www.southportguide.co.uk/og-default.png"],
    },
  };
}

// Subheading stored as "h2:..." in keyFacts[0] for featured articles
function parseKeyFacts(rawKeyFacts: string[]): { subheading: string | null; facts: string[] } {
  if (rawKeyFacts[0]?.startsWith("h2:")) {
    return { subheading: rawKeyFacts[0].slice(3), facts: rawKeyFacts.slice(1) };
  }
  return { subheading: null, facts: rawKeyFacts };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [item, upcomingEvents] = await Promise.all([
    getItem(slug),
    getUpcomingEvents(),
  ]);

  if (!item) notFound();

  const relatedItems = await getRelated(item.category, item.id);

  const dateStr = item.publishedAt?.toISOString() ?? item.createdAt.toISOString();
  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category;
  const CategoryIcon = CATEGORY_ICONS[item.category] ?? Newspaper;
  const canonical = `https://www.southportguide.co.uk/news/${item.slug ?? item.id}`;
  const teaser = item.summary.split("\n\n")[0]?.slice(0, 160).replace(/\n/g, " ") ?? "";

  const { subheading, facts: keyFacts } = parseKeyFacts(item.keyFacts);

  // Strip any paragraph that exactly matches the subheading (Claude sometimes includes it in body too)
  const allParagraphs = item.summary
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p && (!subheading || p !== subheading));

  const insertSubheadingAfter = item.featured && subheading ? 2 : -1;

  const contextualLinks = CONTEXTUAL_LINKS[item.category] ?? [];

  const wordCount = item.summary.split(/\s+/).filter(Boolean).length;
  const titleKeywords = item.title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 6)
    .join(", ");

  const eventSchemas = upcomingEvents.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.dateStart.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: "https://www.southportguide.co.uk/events",
    location: {
      "@type": "Place",
      name: event.venueName ?? "Southport",
      address: { "@type": "PostalAddress", addressLocality: "Southport", addressRegion: "Merseyside", addressCountry: "GB" },
    },
    organizer: { "@type": "Organization", name: "SouthportGuide.co.uk", url: "https://www.southportguide.co.uk" },
    ...(event.isFree && { isAccessibleForFree: true, offers: { "@type": "Offer", price: 0, priceCurrency: "GBP", availability: "https://schema.org/InStock" } }),
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      headline: item.title,
      description: teaser,
      datePublished: dateStr,
      dateModified: dateStr,
      url: canonical,
      author: {
        "@type": "Person",
        name: "Terry",
        jobTitle: "Local News Writer",
        description: "41-year-old Southport local, Churchtown resident, writer for SouthportGuide.co.uk Southport Live section.",
        url: "https://www.southportguide.co.uk/news/author/terry",
        worksFor: {
          "@type": "Organization",
          name: "SouthportGuide.co.uk",
          url: "https://www.southportguide.co.uk",
        },
        sameAs: [
          "https://www.facebook.com/southportguide/",
          "https://x.com/SouthportGuide",
        ],
      },
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
      ...(item.imageUrl && {
        image: { "@type": "ImageObject", url: item.imageUrl, width: 1080, height: 720 },
      }),
      articleSection: categoryLabel,
      keywords: `Southport, Merseyside, ${categoryLabel}, ${titleKeywords}`,
      wordCount,
      isAccessibleForFree: true,
      inLanguage: "en-GB",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
        { "@type": "ListItem", position: 2, name: "Southport Live", item: "https://www.southportguide.co.uk/news" },
        { "@type": "ListItem", position: 3, name: categoryLabel, item: `https://www.southportguide.co.uk/news/category/${item.category}` },
        { "@type": "ListItem", position: 4, name: item.title, item: canonical },
      ],
    },
    ...eventSchemas,
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back nav + breadcrumbs */}
      <div className="bg-[#1B2E4B]">
        <div className="max-w-3xl mx-auto px-4 py-3 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs text-white/50 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/30">/</li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Southport Live
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/30">/</li>
              <li>
                <Link href={`/news/category/${item.category}`} className="hover:text-white transition-colors">
                  {categoryLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/30">/</li>
              <li className="text-white/70 truncate max-w-[200px]" aria-current="page">
                {item.title.length > 40 ? `${item.title.slice(0, 40)}...` : item.title}
              </li>
            </ol>
          </nav>
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
        <div className="text-gray-700">
          {allParagraphs.map((para, i) => (
            <div key={i}>
              {i === 0 ? (
                <p className="text-[1.0625rem] leading-[1.8] text-gray-800 font-[425] mb-6">{para}</p>
              ) : (
                <p className="text-base leading-[1.85] text-gray-700 mb-6">{para}</p>
              )}
              {i === insertSubheadingAfter && subheading && (
                <h2 className="text-xl font-bold text-[#1B2E4B] mt-2 mb-5 pb-3 border-b border-gray-200">
                  {subheading}
                </h2>
              )}
            </div>
          ))}
        </div>

        {/* Social share — client component for copy-to-clipboard + all platforms */}
        <ShareButtons url={canonical} title={item.title} />

        {/* Terry bio */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-4 p-5 bg-[#1B2E4B]/[0.03] border border-[#1B2E4B]/10 rounded-2xl">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1B2E4B] to-[#2a4a72] flex items-center justify-center text-white text-xl font-bold font-display select-none shadow-md">
                T
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#C9A84C] rounded-full border-2 border-white" aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-bold text-[#1B2E4B]">Written by Terry</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#C9A84C]/15 text-[#8a6820] rounded-full uppercase tracking-wide">Southport Live</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                41-year-old Southport local. Lived in Churchtown his whole life. Writes the Southport Live news section. He tells it straight.
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
            href="mailto:hello@seftoncoast.network?subject=Story tip for Southport Live"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-white font-semibold text-sm rounded-xl hover:bg-[#b8963d] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
        </div>

        {/* Explore Southport — contextual guide links */}
        {contextualLinks.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Explore Southport
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contextualLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-sm transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#1B2E4B]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C]/10 transition-colors">
                      <Icon className="w-4 h-4 text-[#1B2E4B] group-hover:text-[#C9A84C] transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1B2E4B] group-hover:text-[#C9A84C] transition-colors">
                        {link.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* What's on in Southport — upcoming events */}
        {upcomingEvents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              What&apos;s on in Southport
            </h2>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href="/events"
                  className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex flex-col items-center justify-center flex-shrink-0 text-[#C9A84C]">
                      <span className="text-[10px] font-bold uppercase leading-none">
                        {formatEventDate(event.dateStart).split(" ")[0]}
                      </span>
                      <span className="text-sm font-bold leading-none mt-0.5">
                        {formatEventDate(event.dateStart).split(" ")[1]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1B2E4B] leading-snug group-hover:text-[#C9A84C] transition-colors truncate">
                        {event.name}
                      </p>
                      {event.venueName && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{event.venueName}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {event.isFree && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                        Free
                      </span>
                    )}
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C9A84C] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3">
              <Link
                href="/events"
                className="text-xs font-medium text-[#1B2E4B] hover:text-[#C9A84C] transition-colors"
              >
                All events in Southport →
              </Link>
            </div>
          </div>
        )}

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
        <div className="mt-10">
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
