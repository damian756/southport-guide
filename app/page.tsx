import Link from "next/link";
import Image from "next/image";
import {
  Star, Utensils, Hotel, Beer, Coffee, MapPin, ShoppingBag, Flag,
  Waves, Dumbbell, Car, Sparkles, ArrowRight, Music, CalendarDays,
  Newspaper, TrendingUp, Building2, Train, Shield, Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BLOG_POSTS, getBlogPostCategory, getUpcomingEvents } from "@/lib/southport-data";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Southport Visitor Guide | Restaurants, Hotels & Things to Do | SouthportGuide.co.uk" },
  description: "The independent guide to Southport — restaurants, hotels, bars, attractions, beaches, golf, and events. Written by locals who live here. Your complete guide to visiting Southport, Merseyside.",
  alternates: { canonical: "https://www.southportguide.co.uk" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Southport Visitor Guide | SouthportGuide.co.uk",
    description: "The independent guide to Southport — restaurants, hotels, bars, attractions, beaches, golf, and events. Written by locals.",
    url: "https://www.southportguide.co.uk",
    images: [{ url: "https://www.southportguide.co.uk/southport-pier.webp", width: 1200, height: 630, alt: "SouthportGuide.co.uk" }],
  },
};

// ── Category configuration ────────────────────────────────────────────────
const CATEGORIES = [
  { slug: "restaurants",    label: "Restaurants",     icon: Utensils,    emoji: "🍽️", gradient: "from-[#8B2635] to-[#C94B3B]",  light: "#FDF0EE" },
  { slug: "hotels",         label: "Hotels",          icon: Hotel,       emoji: "🏨", gradient: "from-[#1B2E4B] to-[#2A4A73]",  light: "#EEF1F7" },
  { slug: "bars-nightlife", label: "Bars & Pubs",     icon: Beer,        emoji: "🍺", gradient: "from-[#3D1A5C] to-[#6B3AA0]",  light: "#F3EEF9" },
  { slug: "cafes",          label: "Cafes",           icon: Coffee,      emoji: "☕", gradient: "from-[#6B3A1F] to-[#A06040]",  light: "#FAF0E8" },
  { slug: "attractions",    label: "Attractions",     icon: MapPin,      emoji: "🎡", gradient: "from-[#1A5C5B] to-[#2E8B7A]",  light: "#E8F5F3" },
  { slug: "beaches-parks",  label: "Beaches & Parks", icon: Waves,       emoji: "🏖️", gradient: "from-[#1A5C7A] to-[#1E8AB0]",  light: "#E8F4FA" },
  { slug: "golf",           label: "Golf",            icon: Flag,        emoji: "⛳", gradient: "from-[#1A4020] to-[#2E6830]",  light: "#E8F2E8" },
  { slug: "shopping",       label: "Shopping",        icon: ShoppingBag, emoji: "🛍️", gradient: "from-[#8B2847] to-[#C45C6A]",  light: "#FAE8EC" },
  { slug: "wellness",       label: "Wellness",        icon: Sparkles,    emoji: "💆", gradient: "from-[#4A2060] to-[#7B3FAA]",  light: "#F0E8F8" },
  { slug: "activities",     label: "Activities",      icon: Dumbbell,    emoji: "🏄", gradient: "from-[#0D6E6E] to-[#0F9B8E]",  light: "#E6F5F5" },
  { slug: "transport",      label: "Transport",       icon: Car,         emoji: "🚌", gradient: "from-[#2A3F5C] to-[#3A5070]",  light: "#E8EEF5" },
];

// ── Neighbourhood guide ───────────────────────────────────────────────────
const NEIGHBOURHOODS = [
  {
    name: "Churchtown",
    desc: "The historic village at the north end. Georgian streets, the Botanic Gardens, a proper village pub. Where Terry lives.",
    sector: "PR9 9",
    slug: "pr9-9",
    image: "/images/neighbourhoods/churchtown.webp",
    accent: "amber",
    accentClass: "border-amber-400",
  },
  {
    name: "Birkdale",
    desc: "The premium end. Wide tree-lined roads, large Edwardian houses, Royal Birkdale Golf Club. Consistently the highest prices in PR8.",
    sector: "PR8 4",
    slug: "pr8-4",
    image: "/images/neighbourhoods/birkdale.webp",
    accent: "gold",
    accentClass: "border-[#C9A84C]",
  },
  {
    name: "Ainsdale",
    desc: "National Trust beach and pinewoods on the doorstep. Popular with families who've priced out of Birkdale. Good value coastal living.",
    sector: "PR8 3",
    slug: "pr8-3",
    image: "/images/neighbourhoods/ainsdale.webp",
    accent: "sky",
    accentClass: "border-sky-400",
  },
  {
    name: "Town Centre",
    desc: "Lord Street, the seafront, Southport station. Merseyrail direct to Liverpool Central. Flats and terraces — the most affordable entry point.",
    sector: "PR8 1 / PR9 0",
    slug: "pr8-1",
    image: "/images/neighbourhoods/town-centre.webp",
    accent: "teal",
    accentClass: "border-teal-400",
  },
  {
    name: "Banks & Crossens",
    desc: "Flat farmland, quiet roads, big skies. Rural living within 15 minutes of town. You get a lot of house for the money out here.",
    sector: "PR9 8",
    slug: "pr9-8",
    image: "/images/neighbourhoods/banks-crossens.webp",
    accent: "green",
    accentClass: "border-green-400",
  },
];

function getArea(address: string): string {
  const areas = ["Birkdale", "Ainsdale", "Churchtown", "Crossens", "Formby", "Ormskirk", "Scarisbrick"];
  for (const a of areas) { if (address.includes(a)) return a; }
  return "Southport";
}

function formatK(n: number): string {
  if (n >= 1000000) return `£${(n / 1000000).toFixed(1)}m`;
  if (n >= 1000) return `£${Math.round(n / 1000)}k`;
  return `£${n}`;
}

export default async function Home() {
  let categoryCounts: Record<string, number> = {};
  let featured: {
    slug: string; name: string; shortDescription: string | null;
    rating: number | null; reviewCount: number | null;
    address: string; category: { slug: string };
    heroImage: string | null;
  }[] = [];
  let totalBusinesses = 0;
  let propertyAvgPrice = 0;
  let propertySalesCount = 0;
  let propertySectorsCount = 0;
  let totalReviews = 0;
  let totalBlogPosts = BLOG_POSTS.length;

  try {
    const [cats, featuredRaw, propStats, propSectors, reviewStats] = await Promise.all([
      prisma.category.findMany({
        select: { slug: true, _count: { select: { businesses: true } } },
      }),
      prisma.$queryRaw<typeof featured>`
        SELECT b.slug, b.name, b."shortDescription", b.rating, b."reviewCount", b.address,
               json_build_object('slug', c.slug) as category,
               CASE WHEN array_length(b.images, 1) > 0 THEN b.images[1] ELSE NULL END AS "heroImage"
        FROM "Business" b
        JOIN "Category" c ON c.id = b."categoryId"
        WHERE c.slug NOT IN ('transport')
          AND b.rating IS NOT NULL
          AND b."reviewCount" > 100
        ORDER BY (b.rating * LOG(b."reviewCount" + 1)) DESC
        LIMIT 7
      `,
      prisma.$queryRaw<{ avg_price: number; total_sales: number }[]>`
        SELECT AVG(price)::int AS avg_price, COUNT(*)::int AS total_sales
        FROM "PropertySale"
        WHERE (postcode LIKE 'PR8%' OR postcode LIKE 'PR9%')
          AND "dateOfTransfer" >= NOW() - INTERVAL '3 years'
          AND "recordStatus" != 'D'
      `,
      prisma.postcodeSector.count({ where: { published: true } }),
      prisma.$queryRaw<{ total_reviews: number }[]>`
        SELECT COALESCE(SUM("reviewCount"), 0)::int AS total_reviews
        FROM "Business"
        WHERE "reviewCount" IS NOT NULL
      `,
    ]);

    categoryCounts = Object.fromEntries(cats.map((c) => [c.slug, c._count.businesses]));
    totalBusinesses = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
    featured = featuredRaw;
    propertyAvgPrice = propStats[0]?.avg_price ?? 0;
    propertySalesCount = propStats[0]?.total_sales ?? 0;
    propertySectorsCount = propSectors;
    totalReviews = reviewStats[0]?.total_reviews ?? 0;
  } catch { /* DB unavailable — graceful degradation */ }

  const catMeta: Record<string, { gradient: string; light: string; emoji: string }> =
    Object.fromEntries(CATEGORIES.map((c) => [c.slug, { gradient: c.gradient, light: c.light, emoji: c.emoji }]));

  const upcomingEvents = getUpcomingEvents(12);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const todayLabel = `${today.getDate()} ${MONTHS[today.getMonth()]} ${today.getFullYear()}`;
  const todayISO = today.toISOString().slice(0, 10);

  function formatPostDate(dateStr: string) {
    return dateStr === todayLabel ? "Today" : dateStr;
  }
  function formatEventLabel(event: { isoDate: string; dayLabel: string }) {
    return event.isoDate === todayISO ? "Today" : event.dayLabel;
  }
  const openDays = Math.ceil(
    (new Date("2026-07-12").getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.southportguide.co.uk/#website",
        url: "https://www.southportguide.co.uk",
        name: "SouthportGuide.co.uk",
        description: "The independent guide to Southport — restaurants, hotels, bars, attractions, beaches, golf, and events. Written by locals.",
        publisher: { "@id": "https://www.southportguide.co.uk/#organization" },
        inLanguage: "en-GB",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.southportguide.co.uk/restaurants?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.southportguide.co.uk/#organization",
        name: "SouthportGuide.co.uk",
        url: "https://www.southportguide.co.uk",
        logo: {
          "@type": "ImageObject",
          url: "https://www.southportguide.co.uk/og-default.png",
          width: 1200,
          height: 630,
        },
        sameAs: [
          "https://www.instagram.com/southportguide/",
          "https://www.facebook.com/southportguide/",
          "https://www.formbyguide.co.uk",
          "https://www.seftonlinks.com",
          "https://seftoncoastwildlife.co.uk",
          "https://seftoncoast.network",
          "https://www.linkedin.com/company/churchtownmedia",
          "https://churchtownmedia.co.uk",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.southportguide.co.uk/#webpage",
        url: "https://www.southportguide.co.uk",
        name: "Southport Visitor Guide | Restaurants, Hotels & Things to Do | SouthportGuide.co.uk",
        description: "The independent guide to Southport — restaurants, hotels, bars, attractions, beaches, golf, and events. Written by locals who live here.",
        isPartOf: { "@id": "https://www.southportguide.co.uk/#website" },
        about: {
          "@type": "City",
          name: "Southport",
          sameAs: "https://en.wikipedia.org/wiki/Southport",
        },
        inLanguage: "en-GB",
        dateModified: new Date().toISOString().slice(0, 10),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    <div className="min-h-screen flex flex-col">

      {/* ══════════════════════════════════════════════════════
          HERO — SPLIT LAYOUT
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#1B2E4B] overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        <div className="flex flex-col md:flex-row md:min-h-[560px]">

          {/* LEFT: Pier image */}
          <div className="relative w-full h-60 sm:h-72 md:h-auto md:flex-none md:w-[58%] overflow-hidden">
            <Image
              src="/southport-pier.webp"
              alt="Southport Pier at sunset"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              quality={85}
              className="object-cover object-center"
            />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1B2E4B]" />
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1B2E4B]" />
          </div>

          {/* RIGHT: Live pulse panel */}
          <div className="flex-1 flex flex-col justify-center px-6 py-10 md:px-10 md:py-12">

            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-400/25 mb-5 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Updated Daily
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
              Your Local Guide<br />
              <span className="text-[#C9A84C]">to Southport.</span>
            </h1>

            <p className="text-white/60 text-sm md:text-base mb-7 leading-relaxed max-w-sm">
              Restaurants, hotels, beaches, and{" "}
              <Link href="/property" className="text-white/80 hover:text-[#C9A84C] underline underline-offset-2 transition-colors">house prices</Link>
              {" "}— written by locals who actually live here.
            </p>

            {/* Open countdown card */}
            <Link
              href="/the-open-2026"
              className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#C9A84C]/40 rounded-2xl p-4 mb-5 flex items-center gap-4 transition-all self-start w-full max-w-xs"
            >
              <div className="text-center flex-none">
                <div className="font-display text-4xl font-bold text-[#C9A84C] leading-none">{openDays}</div>
                <div className="text-white/40 text-[9px] uppercase tracking-widest mt-1">days</div>
              </div>
              <div className="w-px h-10 bg-white/10 flex-none" />
              <div className="min-w-0">
                <div className="text-white font-bold text-sm group-hover:text-[#C9A84C] transition-colors">The Open Championship</div>
                <div className="text-white/50 text-xs mt-0.5">⛳ Royal Birkdale · July 2026</div>
                <div className="text-[#C9A84C] text-xs mt-1.5">Plan your visit →</div>
              </div>
            </Link>

            {/* Next 2 upcoming events */}
            <div className="mb-6 w-full max-w-xs">
              <p className="text-white/35 text-[10px] uppercase tracking-widest mb-2">Coming up</p>
              <div className="space-y-2">
                {upcomingEvents.slice(0, 2).map((event, i) => (
                  <a
                    key={i}
                    href={event.link}
                    target={event.link.startsWith("http") ? "_blank" : undefined}
                    rel={event.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2.5 transition-colors group"
                  >
                    <span className="text-lg flex-none">{event.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate group-hover:text-[#C9A84C] transition-colors">{event.title}</p>
                      <p className="text-white/40 text-xs">{formatEventLabel(event)} · {event.venue}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/25 group-hover:text-[#C9A84C] flex-none transition-colors" />
                  </a>
                ))}
              </div>
              <Link href="/events" className="text-xs text-white/35 hover:text-[#C9A84C] transition-colors mt-2 inline-block">
                View full 2026 calendar →
              </Link>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-xs px-3 py-1.5 rounded-full transition-all"
                >
                  <span>{cat.emoji}</span> {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="h-10 overflow-hidden relative">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 40L60 35C120 30 240 20 360 15C480 10 600 10 720 15C840 20 960 30 1080 32C1200 33 1320 25 1380 21L1440 17V40H0Z" fill="#FAF8F5"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRACTICAL QUICK-ANSWER STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 py-3">
            <span className="text-[10px] font-bold text-[#1B2E4B]/40 uppercase tracking-widest mr-1 hidden sm:inline">Quick answers:</span>
            {[
              { icon: "🏖️", label: "Beach postcode", value: "PR8 1RX", href: "/guides/southport-beach" },
              { icon: "🚆", label: "Train station", value: "Southport", href: "/guides/getting-to-southport" },
              { icon: "🅿️", label: "Marine Drive car park", value: "PR8 1RX", href: "/guides/parking-southport" },
              { icon: "🛍️", label: "Lord Street", value: "PR8 1PX", href: "/shopping" },
              { icon: "🎭", label: "The Atkinson", value: "PR8 1DB", href: "/attractions/the-atkinson-southport" },
              { icon: "🏠", label: "House prices", value: "PR8 & PR9 data", href: "/property" },
            ].map(({ icon, label, value, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-1.5 bg-white hover:bg-[#1B2E4B] border border-gray-200 hover:border-[#1B2E4B] text-[#1B2E4B] hover:text-white text-xs px-3 py-2 rounded-full transition-all group whitespace-nowrap"
              >
                <span className="text-sm">{icon}</span>
                <span className="font-semibold">{label}:</span>
                <span className="text-[#C9A84C] group-hover:text-[#E8C87A] font-bold">{value}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT'S ON — EVENTS STRIP
      ══════════════════════════════════════════════════════ */}
      {upcomingEvents.length > 0 && (
        <section className="py-12 bg-[#FAF8F5]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">Updated weekly</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] flex items-center gap-2">
                  <CalendarDays className="w-6 h-6 text-[#C9A84C]" />
                  What&apos;s On in Southport
                </h2>
              </div>
              <Link href="/events" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#1B2E4B] hover:text-[#C9A84C] font-semibold transition-colors">
                Full calendar <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
              {upcomingEvents.map((event, i) => (
                <a
                  key={i}
                  href={event.link}
                  target={event.link.startsWith("http") ? "_blank" : undefined}
                  rel={event.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex-none w-44 snap-start bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest mb-2">{formatEventLabel(event)}</div>
                  <div className="text-2xl mb-2">{event.emoji}</div>
                  <h3 className="font-bold text-[#1B2E4B] text-sm leading-tight mb-1 group-hover:text-[#C9A84C] transition-colors line-clamp-2">{event.title}</h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-1">{event.venue}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">{event.category}</span>
                    {event.free
                      ? <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Free</span>
                      : <span className="text-[10px] font-semibold text-[#1B2E4B]/50 bg-gray-100 px-2 py-0.5 rounded-full">Tickets</span>
                    }
                  </div>
                </a>
              ))}

              <Link
                href="/events"
                className="flex-none w-44 snap-start bg-[#1B2E4B] rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:bg-[#C9A84C] transition-colors"
              >
                <CalendarDays className="w-8 h-8 text-[#C9A84C] group-hover:text-white mb-3 transition-colors" />
                <span className="font-bold text-white text-sm">Full 2026 Calendar</span>
                <span className="text-white/50 group-hover:text-white/80 text-xs mt-1 transition-colors">All events →</span>
              </Link>
            </div>

            <Link href="/events" className="mt-4 text-sm text-[#C9A84C] font-semibold sm:hidden block text-center">
              View full 2026 calendar →
            </Link>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          LATEST FROM THE BLOG
      ══════════════════════════════════════════════════════ */}
      {(() => {
        const featuredPosts = BLOG_POSTS.filter((p) => p.featured);
        const latestPosts = (() => {
          if (featuredPosts.length >= 6) return featuredPosts.slice(0, 6);
          const usedSlugs = new Set(featuredPosts.map((p) => p.slug));
          const rest = [...BLOG_POSTS].reverse().filter((p) => !usedSlugs.has(p.slug));
          return [...featuredPosts, ...rest].slice(0, 6);
        })();
        const featPost = latestPosts[0];
        const featCat = featPost ? getBlogPostCategory(featPost) : null;
        const row1Side = latestPosts.slice(1, 3);
        const row2Posts = latestPosts.slice(3, 6);
        return (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">Southport Guide Blog</p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-[#C9A84C]" />
                    Latest from the Guide
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">{totalBlogPosts}+ articles written by locals</p>
                </div>
                <Link href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#1B2E4B] hover:text-[#C9A84C] font-semibold transition-colors">
                  All posts <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Row 1 — hero + 2 small cards */}
              <div className="grid md:grid-cols-3 gap-5">
                {featPost && (
                  <Link
                    href={`/blog/${featPost.slug}`}
                    className="group md:col-span-2 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-xl transition-all flex flex-col"
                  >
                    <div className="relative h-52 md:h-64 overflow-hidden flex-none">
                      <Image
                        src={featPost.image}
                        alt={featPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        quality={85}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="bg-[#1B2E4B] text-[#C9A84C] text-[11px] font-bold px-3 py-1.5 rounded-full shadow">
                          New
                        </span>
                        {featCat && (
                          <span
                            className="text-white text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow"
                            style={{ backgroundColor: featCat.color }}
                          >
                            {featCat.label}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-gray-400 text-xs mb-2">{formatPostDate(featPost.date)}</p>
                      <h3 className="font-display font-bold text-[#1B2E4B] text-xl leading-snug mb-3 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                        {featPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                        {featPost.excerpt}
                      </p>
                      <span className="text-[#C9A84C] text-sm font-semibold group-hover:translate-x-0.5 transition-transform inline-block">
                        Read more →
                      </span>
                    </div>
                  </Link>
                )}

                <div className="flex flex-col gap-5">
                  {row1Side.map((post) => {
                    const cat = getBlogPostCategory(post);
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-lg transition-all flex flex-col flex-1"
                      >
                        <div className="relative h-36 overflow-hidden flex-none">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={75}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          {cat && (
                            <span
                              className="absolute bottom-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            >
                              {cat.label}
                            </span>
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-display font-bold text-[#1B2E4B] text-base leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                            <span>{formatPostDate(post.date)}</span>
                            <span className="text-[#C9A84C] font-semibold">Read →</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Row 2 — 3 equal cards */}
              {row2Posts.length > 0 && (
                <div className="grid md:grid-cols-3 gap-5 mt-5">
                  {row2Posts.map((post) => {
                    const cat = getBlogPostCategory(post);
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-lg transition-all flex flex-col"
                      >
                        <div className="relative h-40 overflow-hidden flex-none">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={75}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          {cat && (
                            <span
                              className="absolute bottom-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            >
                              {cat.label}
                            </span>
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-display font-bold text-[#1B2E4B] text-base leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                            <span>{formatPostDate(post.date)}</span>
                            <span className="text-[#C9A84C] font-semibold">Read →</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              <div className="mt-8 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B2E4B] border border-[#1B2E4B]/20 px-6 py-2.5 rounded-full hover:bg-[#1B2E4B] hover:text-white transition-all"
                >
                  All {totalBlogPosts}+ posts →
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ══════════════════════════════════════════════════════
          STATS / TRUST BAR
      ══════════════════════════════════════════════════════ */}
      <section className="py-10 bg-[#1B2E4B]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/10">
            {[
              {
                icon: <Building2 className="w-5 h-5 text-[#C9A84C]" />,
                value: totalBusinesses > 0 ? `${totalBusinesses.toLocaleString()}+` : "950+",
                label: "local businesses listed",
              },
              {
                icon: <Star className="w-5 h-5 text-[#C9A84C]" />,
                value: totalReviews > 0 ? `${Math.round(totalReviews / 1000)}k+` : "180k+",
                label: "verified Google reviews",
              },
              {
                icon: <Newspaper className="w-5 h-5 text-[#C9A84C]" />,
                value: `${totalBlogPosts}+`,
                label: "editorial articles",
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-[#C9A84C]" />,
                value: propertySectorsCount > 0 ? `${propertySectorsCount}` : "10",
                label: "postcode sectors mapped",
              },
            ].map(({ icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-4 py-2">
                <div className="mb-2">{icon}</div>
                <div className="font-display text-2xl md:text-3xl font-bold text-white">{value}</div>
                <div className="text-white/50 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROPERTY FEATURE STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-[#0F1F35]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Land Registry data · PR8 &amp; PR9</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                <Link href="/property" className="hover:text-[#C9A84C] transition-colors">
                  Southport House Prices
                </Link>
              </h2>
              <p className="text-white/70 leading-relaxed mb-5 max-w-lg">
                Every sale in PR8 and PR9 over three years. School Ofsted ratings, crime by category, flood zones, broadband speeds, and Merseyrail commute times — all in one place. This is what Rightmove doesn&apos;t give you.
              </p>
              <div className="flex flex-wrap gap-3 text-sm mb-5">
                {[
                  "Land Registry data",
                  "School Ofsted ratings",
                  "Crime by category",
                  "Flood zones",
                  "Merseyrail times",
                ].map((tag) => (
                  <span key={tag} className="bg-white/10 text-white/80 rounded-full px-3 py-1">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/property"
                  className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm transition-all"
                >
                  <TrendingUp className="w-4 h-4" />
                  Explore House Prices
                </Link>
                <Link
                  href="/blog/southport-house-prices-by-postcode"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all border border-white/20"
                >
                  Read the guide
                </Link>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex-none md:w-64 lg:w-80 grid grid-cols-2 gap-2">
              {[
                {
                  label: "Postcodes",
                  value: propertySectorsCount > 0 ? `${propertySectorsCount} sectors` : "10 sectors",
                  icon: <MapPin className="w-4 h-4 text-[#C9A84C]" />,
                },
                {
                  label: "3yr Sales",
                  value: propertySalesCount > 100 ? `${propertySalesCount.toLocaleString()}` : "1,200+",
                  icon: <Building2 className="w-4 h-4 text-[#C9A84C]" />,
                },
                {
                  label: "3yr Avg Price",
                  value: propertyAvgPrice > 0 ? formatK(propertyAvgPrice) : "~£200k",
                  icon: <TrendingUp className="w-4 h-4 text-[#C9A84C]" />,
                },
                {
                  label: "Top Sector",
                  value: "Birkdale PR8 4",
                  icon: <Shield className="w-4 h-4 text-[#C9A84C]" />,
                },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-1">{icon}</div>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">{label}</p>
                  <p className="text-white font-bold text-sm mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          NEIGHBOURHOOD GUIDE
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Five very different places</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B] mb-3">Explore Southport&apos;s Areas</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Southport isn&apos;t one place. Churchtown feels nothing like Birkdale, which feels nothing like Ainsdale. Here&apos;s the honest breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {NEIGHBOURHOODS.map((n) => (
              <Link
                key={n.slug}
                href={`/property/${n.slug}`}
                className="group relative overflow-hidden rounded-2xl min-h-[220px] flex flex-col card-hover"
              >
                <Image
                  src={n.image}
                  alt={n.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  quality={80}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {/* top sector badge */}
                <div className="absolute top-3 left-3">
                  <span className={`bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border ${n.accentClass}`}>
                    {n.sector}
                  </span>
                </div>
                {/* content */}
                <div className="relative mt-auto p-5">
                  <h3 className="font-display text-xl font-bold text-white mb-1.5 group-hover:text-[#C9A84C] transition-colors">
                    {n.name}
                  </h3>
                  <p className="text-white/65 text-xs leading-relaxed line-clamp-3">
                    {n.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[#C9A84C] text-xs font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    House prices &amp; data →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/property"
              className="inline-flex items-center gap-2 bg-[#1B2E4B] hover:bg-[#2A4A73] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all"
            >
              All 10 postcode sectors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EXPLORE CATEGORIES
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Everything in one place</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B] mb-3">Explore Southport</h2>
            <p className="text-gray-400 text-sm">
              {totalBusinesses.toLocaleString() || "999"} local businesses across {CATEGORIES.length} categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.slug] || 0;
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl card-hover min-h-[120px] sm:min-h-[140px]"
                >
                  <Image
                    src={`/images/categories/${cat.slug}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    quality={80}
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative p-5 flex flex-col justify-end h-full text-center">
                    <h3 className="text-white font-bold text-sm leading-tight mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{cat.label}</h3>
                    <p className="text-white/90 text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      {count > 0 ? `${count} listings` : "Explore →"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/things-to-do"
              className="inline-flex items-center gap-2 bg-[#1B2E4B] hover:bg-[#2A4A73] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all"
            >
              Things to Do in Southport <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TOP RATED — MAGAZINE GRID
      ══════════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="py-16 bg-[#FAF8F5]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Verified by Google</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B] mb-3">Top Rated in Southport</h2>
              <p className="text-gray-400 text-sm">The highest-rated businesses in Southport, ranked by thousands of verified Google reviews</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Big card — first item */}
              {featured[0] && (() => {
                const b = featured[0];
                const theme = catMeta[b.category.slug];
                const area = getArea(b.address);
                return (
                  <Link
                    href={`/${b.category.slug}/${b.slug}`}
                    className="md:col-span-2 group relative overflow-hidden rounded-2xl min-h-[260px] card-hover"
                  >
                    {b.heroImage ? (
                      <Image
                        src={b.heroImage}
                        alt={b.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        quality={80}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme?.gradient || "from-[#1B2E4B] to-[#2A4A73]"}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#C9A84C] text-white text-xs font-bold px-3 py-1 rounded-full">
                        #1 Rated
                      </span>
                    </div>
                    <div className="relative p-7 flex flex-col justify-end h-full min-h-[260px]">
                      <div className="mt-auto">
                        <span className="text-white/60 text-xs uppercase tracking-wider">
                          {theme?.emoji} {b.category.slug.replace("-", " ")} · {area}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-1 mb-2 group-hover:text-[#C9A84C] transition-colors">
                          {b.name}
                        </h3>
                        {b.shortDescription && (
                          <p className="text-white/70 text-sm line-clamp-2 mb-3">{b.shortDescription}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[#C9A84C]">
                            <Star className="w-4 h-4 fill-[#C9A84C]" />
                            <span className="font-bold text-white">{b.rating?.toFixed(1)}</span>
                            {b.reviewCount && <span className="text-white/50 text-sm">({b.reviewCount.toLocaleString()} reviews)</span>}
                          </div>
                          <span className="text-white/70 text-sm group-hover:text-white group-hover:translate-x-0.5 transition-all">
                            View listing →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })()}

              {/* Two smaller cards */}
              <div className="grid grid-rows-2 gap-4">
                {featured.slice(1, 3).map((b, i) => {
                  const theme = catMeta[b.category.slug];
                  const area = getArea(b.address);
                  return (
                    <Link
                      key={b.slug}
                      href={`/${b.category.slug}/${b.slug}`}
                      className="group relative overflow-hidden rounded-2xl card-hover"
                    >
                      {b.heroImage ? (
                        <Image
                          src={b.heroImage}
                          alt={b.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          quality={75}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme?.gradient || "from-[#1B2E4B] to-[#2A4A73]"}`} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#C9A84C] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                          #{i + 2}
                        </span>
                      </div>
                      <div className="relative p-5 flex flex-col justify-end min-h-[118px]">
                        <div className="mt-auto">
                          <span className="text-white/50 text-xs">{theme?.emoji} {area}</span>
                          <h3 className="font-display font-bold text-white text-lg leading-tight group-hover:text-[#C9A84C] transition-colors line-clamp-1">
                            {b.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
                            <span className="text-white font-semibold text-sm">{b.rating?.toFixed(1)}</span>
                            {b.reviewCount && <span className="text-white/50 text-xs">({b.reviewCount.toLocaleString()})</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom row — 4 more */}
              {featured.slice(3, 7).map((b, i) => {
                const theme = catMeta[b.category.slug];
                const area = getArea(b.address);
                return (
                  <Link
                    key={b.slug}
                    href={`/${b.category.slug}/${b.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/30 card-hover"
                  >
                    {b.heroImage ? (
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={b.heroImage}
                          alt={b.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          quality={75}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <span className="absolute top-2 right-2 bg-[#C9A84C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          #{i + 4}
                        </span>
                      </div>
                    ) : null}
                    <div className="p-5">
                      {!b.heroImage && (
                        <div className="flex items-start justify-between mb-3">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: theme?.light || "#EEF1F7", color: "#1B2E4B" }}
                          >
                            {theme?.emoji} {b.category.slug.replace(/-/g, " ")}
                          </span>
                          <span className="text-[#C9A84C] text-xs font-bold">#{i + 4}</span>
                        </div>
                      )}
                      {b.heroImage && (
                        <span
                          className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2"
                          style={{ backgroundColor: theme?.light || "#EEF1F7", color: "#1B2E4B" }}
                        >
                          {theme?.emoji} {b.category.slug.replace(/-/g, " ")}
                        </span>
                      )}
                      <h3 className="font-display font-bold text-[#1B2E4B] text-base group-hover:text-[#C9A84C] transition-colors mb-1 line-clamp-2">
                        {b.name}
                      </h3>
                      <p className="text-gray-400 text-xs mb-3">{area}</p>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-sm text-gray-800">{b.rating?.toFixed(1)}</span>
                        {b.reviewCount && <span className="text-gray-400 text-xs">({b.reviewCount.toLocaleString()})</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          TERRY'S INTRODUCTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-[#FAF8F5] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-8">
            {/* Avatar/icon */}
            <div className="flex-none">
              <div className="w-20 h-20 rounded-2xl bg-[#1B2E4B] flex items-center justify-center text-4xl shadow-lg">
                🏡
              </div>
            </div>
            {/* Content */}
            <div className="flex-1">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Why trust this guide</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-4">
                Written by people who actually live here.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                I&apos;ve lived in Churchtown my whole life — 41 years. I&apos;ve eaten in most of the restaurants in this town, some of them multiple times a week when the kids were small. I know where Marine Drive car park fills up by 10am on a summer Saturday, and I know which end of Lord Street to park on. I have a bulldog called Frank who has opinions about beer gardens.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                SouthportGuide is what I&apos;d show someone who asked for an honest, up-to-date guide — not a reprint of the council website. If something isn&apos;t worth your time, I say so.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#1B2E4B] hover:bg-[#2A4A73] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                >
                  <Users className="w-4 h-4" />
                  About the guide
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 border border-[#1B2E4B]/20 text-[#1B2E4B] hover:bg-[#1B2E4B] hover:text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                >
                  <Newspaper className="w-4 h-4" />
                  Read the blog
                </Link>
              </div>
            </div>
            {/* Trust signals */}
            <div className="flex-none md:w-48 flex flex-col gap-3">
              {[
                { icon: "📍", label: "Based in Churchtown" },
                { icon: "🐾", label: "Dog-friendly tested" },
                { icon: "👨‍👩‍👧‍👦", label: "Family-tested" },
                { icon: "🔄", label: "Updated daily" },
                { icon: "🚫", label: "No sponsored rankings" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100 shadow-sm">
                  <span className="text-lg flex-none">{icon}</span>
                  <span className="text-xs font-semibold text-[#1B2E4B]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SOUTHPORT BEACH FEATURE STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-[#1A5C7A]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">One of England&apos;s widest</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                <Link href="/guides/southport-beach" className="hover:text-[#C9A84C] transition-colors">
                  Southport Beach
                </Link>
              </h2>
              <p className="text-white/70 leading-relaxed mb-5 max-w-lg">
                Postcode PR8 1RX. Free entry. Dogs welcome year-round. At low tide the sea retreats over a kilometre
                — it&apos;s a coastal landscape like nothing else in the North West.
              </p>
              <div className="flex flex-wrap gap-3 text-sm mb-5">
                <span className="bg-white/10 text-white/80 rounded-full px-3 py-1">Free to visit</span>
                <span className="bg-white/10 text-white/80 rounded-full px-3 py-1">Dogs welcome</span>
                <span className="bg-white/10 text-white/80 rounded-full px-3 py-1">Sunsets worth the trip</span>
                <span className="bg-white/10 text-white/80 rounded-full px-3 py-1">22 miles of coast</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/guides/southport-beach"
                  className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm transition-all"
                >
                  Southport Beach Guide <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/guides/southport-pier"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all border border-white/20"
                >
                  Southport Pier Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="flex-none md:w-64 lg:w-80 grid grid-cols-2 gap-2">
              {[
                { label: "Postcode", value: "PR8 1RX" },
                { label: "Parking", value: "Free" },
                { label: "Entry", value: "Free" },
                { label: "Dogs", value: "Welcome" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">{label}</p>
                  <p className="text-white font-bold text-sm mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BIG EVENTS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Coming to Southport</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Big Events</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* The Open */}
            <Link href="/the-open-2026" className="group relative overflow-hidden rounded-2xl bg-[#1A4020] p-8 hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0">
                <Image src="/images/open-2026.webp" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" quality={80} className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A4020]/60 to-[#2E6830]/40" />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
              <div className="relative">
                <span className="inline-block text-4xl mb-4">⛳</span>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Royal Birkdale · 2026</p>
                <h3 className="font-display text-3xl font-bold text-white mb-3">The Open Championship</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Golf&apos;s oldest major returns to Royal Birkdale. Book accommodation early — Southport fills up fast.
                </p>
                <span className="inline-flex items-center gap-2 bg-[#C9A84C] text-white text-sm font-semibold px-5 py-2.5 rounded-full group-hover:bg-[#E8C87A] transition-colors">
                  Plan your visit <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* MLEC */}
            <Link href="/mlec" className="group relative overflow-hidden rounded-2xl bg-[#3D1A5C] p-8 hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0">
                <Image src="/images/mlec.webp" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" quality={80} className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#3D1A5C]/60 to-[#6B3AA0]/40" />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
              <div className="relative">
                <span className="inline-block text-4xl mb-4"><Music className="w-10 h-10 text-[#C9A84C]" /></span>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Opening April 2027</p>
                <h3 className="font-display text-3xl font-bold text-white mb-3">Marine Lake Events Centre</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Southport&apos;s new 4,000-capacity events and entertainment venue on the Marine Lake. Opening 2027.
                </p>
                <span className="inline-flex items-center gap-2 bg-[#C9A84C] text-white text-sm font-semibold px-5 py-2.5 rounded-full group-hover:bg-[#E8C87A] transition-colors">
                  Find out more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </div>

          {/* Additional events row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { emoji: "🌸", label: "Flower Show", date: "Aug 2026", href: "/events" },
              { emoji: "✈️", label: "Air Show", date: "Sep 2026", href: "/events" },
              { emoji: "⚽", label: "Southport FC", date: "Season ongoing", href: "/events" },
              { emoji: "🎆", label: "Illuminations", date: "Autumn 2026", href: "/events" },
            ].map(({ emoji, label, date, href }) => (
              <Link
                key={label}
                href={href}
                className="group bg-white rounded-2xl px-4 py-4 border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-md transition-all flex items-center gap-3"
              >
                <span className="text-2xl flex-none">{emoji}</span>
                <div>
                  <p className="font-bold text-[#1B2E4B] text-sm group-hover:text-[#C9A84C] transition-colors">{label}</p>
                  <p className="text-gray-400 text-xs">{date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BUSINESS CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#1B2E4B] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2E7D6E]/8 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center max-w-2xl">
          <div className="font-display text-4xl font-bold text-white mb-4">
            List Your Business.<br />
            <span className="text-[#C9A84C]">It&apos;s Free.</span>
          </div>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Join {totalBusinesses.toLocaleString() || "999"}+ businesses on Southport&apos;s fastest-growing guide. Get discovered by visitors planning their trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/claim-listing"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-[#C9A84C]/30"
            >
              Claim Your Free Listing →
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-full font-semibold text-base transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
