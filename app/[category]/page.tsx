import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { getCategoryBySlug, isValidCategory } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import CategoryBrowser, { type BrowserBusiness } from "@/components/CategoryBrowser";
import type { MapPin as MapPinType } from "@/components/CategoryMap";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string; area?: string }>;
};

// ── Category config ──────────────────────────────────────────────────────────

const THEMES: Record<string, { gradient: string; accent: string; emoji: string; tagline: string; heroPos: string }> = {
  restaurants:      { gradient: "from-[#8B2635] to-[#C94B3B]", accent: "#C94B3B", emoji: "🍽️", tagline: "The best places to eat in Southport", heroPos: "center 75%" },
  hotels:           { gradient: "from-[#1B2E4B] to-[#2A4A73]", accent: "#1B2E4B", emoji: "🏨", tagline: "Where to stay in Southport", heroPos: "center" },
  "bars-nightlife": { gradient: "from-[#3D1A5C] to-[#6B3AA0]", accent: "#5B2D8A", emoji: "🍺", tagline: "Pubs, bars and nightlife in Southport", heroPos: "center 5%" },
  cafes:            { gradient: "from-[#6B3A1F] to-[#A06040]", accent: "#8B5E3C", emoji: "☕", tagline: "Great coffee, cafes and tea rooms", heroPos: "center 35%" },
  attractions:      { gradient: "from-[#1A5C5B] to-[#2E8B7A]", accent: "#2E7D6E", emoji: "🎡", tagline: "Things to see and do in Southport", heroPos: "center 20%" },
  "beaches-parks":  { gradient: "from-[#1A5C7A] to-[#1E8AB0]", accent: "#1A6B8A", emoji: "🏖️", tagline: "Beautiful beaches and open spaces", heroPos: "center 15%" },
  golf:             { gradient: "from-[#1A4020] to-[#2E6830]", accent: "#2C5F2E", emoji: "⛳", tagline: "World-class golf courses near Southport", heroPos: "center 20%" },
  shopping:         { gradient: "from-[#8B2847] to-[#C45C6A]", accent: "#C45C6A", emoji: "🛍️", tagline: "Shops, boutiques and markets", heroPos: "center" },
  wellness:         { gradient: "from-[#4A2060] to-[#7B3FAA]", accent: "#6B4C8B", emoji: "💆", tagline: "Spas, salons and wellness in Southport", heroPos: "center" },
  activities:       { gradient: "from-[#0D6E6E] to-[#0F9B8E]", accent: "#0D6E6E", emoji: "🏄", tagline: "Sport, leisure and outdoor activities", heroPos: "center" },
  transport:        { gradient: "from-[#2A3F5C] to-[#3A5070]", accent: "#3A4F6B", emoji: "🚌", tagline: "Getting around Southport", heroPos: "center" },
};

const CAT_ORDER = [
  "restaurants", "hotels", "bars-nightlife", "cafes",
  "attractions", "golf", "shopping", "beaches-parks",
  "wellness", "activities", "transport",
];

const FOOD_CATS = new Set(["restaurants", "cafes", "bars-nightlife", "hotels", "activities"]);

// ── Area definitions ─────────────────────────────────────────────────────────

const AREAS: { key: string; label: string; test: (addr: string, pc: string) => boolean }[] = [
  { key: "town-centre", label: "Town Centre", test: (_, pc) => pc.startsWith("PR8 1") || pc.startsWith("PR9 0") },
  { key: "birkdale",    label: "Birkdale",    test: (addr, pc) => pc.startsWith("PR8 2") || addr.includes("Birkdale") },
  { key: "ainsdale",    label: "Ainsdale",    test: (addr, pc) => pc.startsWith("PR8 3") || addr.includes("Ainsdale") },
  { key: "seafront",    label: "Seafront",    test: (addr) => ["Promenade", "Marine Drive", "Esplanade", "Ocean Plaza"].some((s) => addr.toLowerCase().includes(s.toLowerCase())) },
  { key: "churchtown",  label: "Churchtown",  test: (addr, pc) => pc.startsWith("PR9 7") || pc.startsWith("PR9 9") || addr.includes("Churchtown") },
  { key: "crossens",    label: "Crossens",    test: (addr, pc) => pc.startsWith("PR9 8") || addr.includes("Crossens") || addr.includes("Marshside") },
  { key: "formby",      label: "Formby",      test: (addr, pc) => addr.includes("Formby") || pc.startsWith("L37") || pc.startsWith("PR6") },
];

function matchesArea(address: string, postcode: string, areaKey: string): boolean {
  const def = AREAS.find((a) => a.key === areaKey);
  if (!def) return true;
  return def.test(address, postcode);
}

// ── Dynamic rendering (DB-dependent, uses searchParams) ──────────────────────

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.southportguide.co.uk";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category" };
  const theme = THEMES[category];
  const title = `${cat.name} in Southport`;
  const description = `${theme?.tagline || cat.description} — browse all listings with Google ratings, food hygiene scores and contact details on SouthportGuide.co.uk`;
  const url = `${BASE_URL}/${category}`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: "SouthportGuide.co.uk" },
    twitter: { card: "summary", title, description },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { sort, area } = await searchParams;
  if (!isValidCategory(category)) notFound();

  const cat = getCategoryBySlug(category)!;
  const theme = THEMES[category] || THEMES.restaurants;
  const isFoodCat = FOOD_CATS.has(category);
  let businesses: BrowserBusiness[] = [];
  let boostedIds: string[] = [];

  try {
    const categoryRecord = await prisma.category.findFirst({ where: { slug: category } });
    if (categoryRecord) {
      const catId = categoryRecord.id;
      const now = new Date();
      const activeBoosts = await prisma.listingBoost.findMany({
        where: {
          categoryId: catId,
          status: "active",
          startsAt: { lte: now },
          endsAt: { gte: now },
        },
        select: { businessId: true, label: true },
      });
      boostedIds = activeBoosts.map((b) => b.businessId);

      if (sort === "alpha") {
        businesses = await prisma.$queryRaw<BrowserBusiness[]>`
          SELECT id, slug, name, "shortDescription", description, "listingTier", address, postcode,
                 rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow", lat, lng
          FROM "Business"
          WHERE "categoryId" = ${catId} OR ${catId} = ANY("secondaryCategoryIds")
          ORDER BY name ASC
        `;
      } else if (sort === "hygiene") {
        businesses = await prisma.$queryRaw<BrowserBusiness[]>`
          SELECT id, slug, name, "shortDescription", description, "listingTier", address, postcode,
                 rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow", lat, lng
          FROM "Business"
          WHERE "categoryId" = ${catId} OR ${catId} = ANY("secondaryCategoryIds")
          ORDER BY
            CASE WHEN "hygieneRating" ~ '^[0-9]+$' THEN CAST("hygieneRating" AS INTEGER) ELSE -1 END DESC,
            (COALESCE(rating, 0) * LOG(COALESCE("reviewCount", 0) + 1)) DESC, name ASC
        `;
      } else if (sort === "google") {
        businesses = await prisma.$queryRaw<BrowserBusiness[]>`
          SELECT id, slug, name, "shortDescription", description, "listingTier", address, postcode,
                 rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow", lat, lng
          FROM "Business"
          WHERE "categoryId" = ${catId} OR ${catId} = ANY("secondaryCategoryIds")
          ORDER BY
            CASE "listingTier" WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 WHEN 'standard' THEN 3 ELSE 4 END ASC,
            COALESCE(rating, 0) DESC, COALESCE("reviewCount", 0) DESC, name ASC
        `;
      } else {
        businesses = await prisma.$queryRaw<BrowserBusiness[]>`
          SELECT id, slug, name, "shortDescription", description, "listingTier", address, postcode,
                 rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow", lat, lng
          FROM "Business"
          WHERE "categoryId" = ${catId} OR ${catId} = ANY("secondaryCategoryIds")
          ORDER BY
            CASE "listingTier" WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 WHEN 'standard' THEN 3 ELSE 4 END ASC,
            (COALESCE(rating, 0) * LOG(COALESCE("reviewCount", 0) + 1)) DESC, name ASC
        `;
      }

      const boostedSet = new Set(boostedIds);
      if (boostedSet.size > 0 && sort !== "alpha" && sort !== "hygiene") {
        businesses = [
          ...businesses.filter((b) => boostedSet.has(b.id)),
          ...businesses.filter((b) => !boostedSet.has(b.id)),
        ];
      }
    }
  } catch { /* DB unavailable */ }

  // Area filter applied server-side (before passing to client)
  const filteredBusinesses = area
    ? businesses.filter((b) => matchesArea(b.address ?? "", b.postcode ?? "", area))
    : businesses;

  // Map pins (only geolocated businesses)
  const mapPins: MapPinType[] = filteredBusinesses
    .filter((b) => b.lat != null && b.lng != null)
    .map((b) => ({
      slug: b.slug, name: b.name, lat: b.lat!, lng: b.lng!,
      rating: b.rating, reviewCount: b.reviewCount, priceRange: b.priceRange,
      listingTier: b.listingTier, address: b.address, category,
    }));

  const activeSort = sort || "default";
  const sortOptions = [
    { key: "default", label: "Best Match" },
    { key: "alpha",   label: "A – Z" },
    { key: "google",  label: "⭐ Google Rating" },
    ...(isFoodCat ? [{ key: "hygiene", label: "🛡️ Hygiene Rating" }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient}`}>
        <div className="absolute inset-0">
          <Image
            src={`/images/categories/${category}.webp`}
            alt="" fill sizes="100vw" quality={80}
            className="object-cover"
            style={{ objectPosition: theme.heroPos }}
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-40`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="relative container mx-auto px-4 max-w-6xl py-12 md:py-16">
          <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{cat.name}</span>
          </nav>

          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-5xl mb-4 drop-shadow-md">{theme.emoji}</div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {cat.name}
                <span className="text-white/50 font-normal"> in Southport</span>
              </h1>
              <p className="text-white/90 text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">{theme.tagline}</p>
            </div>
            <div className="hidden md:block text-right">
              <div className="font-display text-5xl font-bold text-white/20">{filteredBusinesses.length}</div>
              <div className="text-white/40 text-sm uppercase tracking-widest">listings</div>
            </div>
          </div>
        </div>

        <div className="relative h-8 overflow-hidden">
          <svg viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 32L360 16C720 0 1080 0 1440 16V32H0Z" fill="#FAF8F5" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-6">

        {/* ── Category strip ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 mb-5">
          <div className="flex flex-wrap gap-2 justify-center">
            {CAT_ORDER.map((slug) => {
              const t = THEMES[slug];
              const c = getCategoryBySlug(slug);
              if (!t || !c) return null;
              const isActive = slug === category;
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                    isActive
                      ? "text-white border-transparent shadow-sm"
                      : "text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                  style={isActive ? { backgroundColor: theme.accent, borderColor: theme.accent } : {}}
                >
                  <span className="text-sm leading-none">{t.emoji}</span>
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── CategoryBrowser: search + area + sort + list/map ────────────── */}
        <CategoryBrowser
          businesses={filteredBusinesses}
          mapPins={mapPins}
          accentColor={theme.accent}
          themeGradient={theme.gradient}
          emoji={theme.emoji}
          category={category}
          isFoodCat={isFoodCat}
          activeArea={area}
          activeSort={activeSort}
          sortOptions={sortOptions}
          areas={AREAS.map(({ key, label }) => ({ key, label }))}
          currentSort={sort}
          currentArea={area}
          boostedBusinessIds={boostedIds}
        />

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <div className="mt-14 rounded-2xl overflow-hidden">
          <div className={`bg-gradient-to-br ${theme.gradient} p-8 md:p-10 text-center`}>
            <div className="text-4xl mb-3">{theme.emoji}</div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">Own a business in this category?</h3>
            <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto">
              List for free and get discovered by thousands of visitors planning their Southport trip.
            </p>
            <Link href="/claim-listing" className="inline-block bg-[#C9A84C] hover:bg-[#E8C87A] text-white px-7 py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg">
              Add Your Business →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
