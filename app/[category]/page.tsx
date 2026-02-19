import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Star, ArrowUpDown, ShieldCheck, ShieldAlert, ShieldX, Shield, MapPin, ChevronRight } from "lucide-react";
import { getCategoryBySlug, isValidCategory } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import ViewToggle from "@/components/ViewToggle";
import type { MapPin as MapPinType } from "@/components/CategoryMap";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string; area?: string }>;
};

// Category visual themes
const THEMES: Record<string, { gradient: string; light: string; accent: string; emoji: string; tagline: string; heroPos: string }> = {
  restaurants:      { gradient: "from-[#8B2635] to-[#C94B3B]", light: "#FDF0EE", accent: "#C94B3B", emoji: "🍽️", tagline: "The best places to eat in Southport", heroPos: "center 75%" },
  hotels:           { gradient: "from-[#1B2E4B] to-[#2A4A73]", light: "#EEF1F7", accent: "#1B2E4B", emoji: "🏨", tagline: "Where to stay in Southport", heroPos: "center" },
  "bars-nightlife": { gradient: "from-[#3D1A5C] to-[#6B3AA0]", light: "#F3EEF9", accent: "#5B2D8A", emoji: "🍺", tagline: "Pubs, bars and nightlife in Southport", heroPos: "center 5%" },
  cafes:            { gradient: "from-[#6B3A1F] to-[#A06040]", light: "#FAF0E8", accent: "#8B5E3C", emoji: "☕", tagline: "Great coffee, cafes and tea rooms", heroPos: "center 35%" },
  attractions:      { gradient: "from-[#1A5C5B] to-[#2E8B7A]", light: "#E8F5F3", accent: "#2E7D6E", emoji: "🎡", tagline: "Things to see and do in Southport", heroPos: "center 20%" },
  "beaches-parks":  { gradient: "from-[#1A5C7A] to-[#1E8AB0]", light: "#E8F4FA", accent: "#1A6B8A", emoji: "🏖️", tagline: "Beautiful beaches and open spaces", heroPos: "center 15%" },
  golf:             { gradient: "from-[#1A4020] to-[#2E6830]", light: "#E8F2E8", accent: "#2C5F2E", emoji: "⛳", tagline: "World-class golf courses near Southport", heroPos: "center 20%" },
  shopping:         { gradient: "from-[#8B2847] to-[#C45C6A]", light: "#FAE8EC", accent: "#C45C6A", emoji: "🛍️", tagline: "Shops, boutiques and markets", heroPos: "center" },
  wellness:         { gradient: "from-[#4A2060] to-[#7B3FAA]", light: "#F0E8F8", accent: "#6B4C8B", emoji: "💆", tagline: "Spas, salons and wellness in Southport", heroPos: "center" },
  activities:       { gradient: "from-[#0D6E6E] to-[#0F9B8E]", light: "#E6F5F5", accent: "#0D6E6E", emoji: "🏄", tagline: "Sport, leisure and outdoor activities", heroPos: "center" },
  transport:        { gradient: "from-[#2A3F5C] to-[#3A5070]", light: "#E8EEF5", accent: "#3A4F6B", emoji: "🚌", tagline: "Getting around Southport", heroPos: "center" },
};

const FOOD_CATS = new Set(["restaurants", "cafes", "bars-nightlife", "hotels", "activities"]);

// Southport neighbourhood definitions — postcode-first, address-string fallback
// PR8 1 = town centre | PR8 2 = Birkdale | PR8 3 = Ainsdale
// PR9 0 = north town/seafront | PR9 7/9 = Churchtown | PR9 8 = Crossens/Marshside
const AREAS: { key: string; label: string; test: (addr: string, pc: string) => boolean }[] = [
  {
    key: "town-centre",
    label: "Town Centre",
    test: (addr, pc) => pc.startsWith("PR8 1") || pc.startsWith("PR9 0"),
  },
  {
    key: "birkdale",
    label: "Birkdale",
    test: (addr, pc) => pc.startsWith("PR8 2") || addr.includes("Birkdale"),
  },
  {
    key: "ainsdale",
    label: "Ainsdale",
    test: (addr, pc) => pc.startsWith("PR8 3") || addr.includes("Ainsdale"),
  },
  {
    key: "seafront",
    label: "Seafront",
    test: (addr) =>
      ["Promenade", "Marine Drive", "Esplanade", "Ocean Plaza"].some((s) =>
        addr.toLowerCase().includes(s.toLowerCase())
      ),
  },
  {
    key: "churchtown",
    label: "Churchtown",
    test: (addr, pc) =>
      pc.startsWith("PR9 7") || pc.startsWith("PR9 9") || addr.includes("Churchtown"),
  },
  {
    key: "crossens",
    label: "Crossens",
    test: (addr, pc) =>
      pc.startsWith("PR9 8") || addr.includes("Crossens") || addr.includes("Marshside"),
  },
  {
    key: "formby",
    label: "Formby",
    test: (addr, pc) =>
      addr.includes("Formby") || pc.startsWith("L37") || pc.startsWith("PR6"),
  },
];

type Business = {
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  listingTier: string;
  address: string;
  postcode: string;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
  hygieneRating: string | null;
  hygieneRatingShow: boolean;
  lat: number | null;
  lng: number | null;
};

function getSnippet(b: Business): string | null {
  if (b.shortDescription) return b.shortDescription;
  if (b.description) {
    const first = b.description.split(/(?<=[.!?])\s+/)[0] ?? b.description;
    return first.length > 140 ? first.slice(0, 137) + "…" : first;
  }
  return null;
}

function getArea(address: string): string {
  const areas = ["Birkdale", "Ainsdale", "Churchtown", "Crossens", "Marshside",
                 "Formby", "Ormskirk", "Scarisbrick", "Banks", "Halsall", "Burscough"];
  for (const a of areas) { if (address.includes(a)) return a; }
  return "Southport";
}

function matchesAreaFilter(address: string, postcode: string, areaKey: string): boolean {
  const area = AREAS.find((a) => a.key === areaKey);
  if (!area) return true;
  return area.test(address, postcode);
}

function hygieneStyle(r: string): { bg: string; text: string; border: string } {
  const n = parseInt(r);
  if (n >= 4) return { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200" };
  if (n === 3) return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" };
  if (n <= 2)  return { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200" };
  return               { bg: "bg-gray-50",  text: "text-gray-500",   border: "border-gray-200" };
}

function HygieneIcon({ r }: { r: string }) {
  const n = parseInt(r);
  if (n >= 4) return <ShieldCheck className="w-3 h-3" />;
  if (n === 3) return <Shield className="w-3 h-3" />;
  if (n >= 0)  return <ShieldAlert className="w-3 h-3" />;
  return <ShieldX className="w-3 h-3" />;
}

export async function generateStaticParams() {
  return Object.keys(THEMES).map((category) => ({ category }));
}

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
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "SouthportGuide.co.uk",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { sort, area } = await searchParams;
  if (!isValidCategory(category)) notFound();

  const cat = getCategoryBySlug(category)!;
  const theme = THEMES[category] || THEMES.restaurants;
  const isFoodCat = FOOD_CATS.has(category);
  let businesses: Business[] = [];

  try {
    const categoryRecord = await prisma.category.findFirst({ where: { slug: category } });
    if (categoryRecord) {
      const catId = categoryRecord.id;

      if (sort === "alpha") {
        businesses = await prisma.$queryRaw<Business[]>`
          SELECT slug, name, "shortDescription", description, "listingTier", address, postcode, rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow", lat, lng
          FROM "Business" WHERE "categoryId" = ${catId} ORDER BY name ASC
        `;
      } else if (sort === "hygiene") {
        businesses = await prisma.$queryRaw<Business[]>`
          SELECT slug, name, "shortDescription", description, "listingTier", address, postcode, rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow", lat, lng
          FROM "Business" WHERE "categoryId" = ${catId}
          ORDER BY
            CASE WHEN "hygieneRating" ~ '^[0-9]+$' THEN CAST("hygieneRating" AS INTEGER) ELSE -1 END DESC,
            (COALESCE(rating, 0) * LOG(COALESCE("reviewCount", 0) + 1)) DESC, name ASC
        `;
      } else if (sort === "google") {
        businesses = await prisma.$queryRaw<Business[]>`
          SELECT slug, name, "shortDescription", description, "listingTier", address, postcode, rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow", lat, lng
          FROM "Business" WHERE "categoryId" = ${catId}
          ORDER BY
            CASE "listingTier" WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 WHEN 'standard' THEN 3 ELSE 4 END ASC,
            COALESCE(rating, 0) DESC, COALESCE("reviewCount", 0) DESC, name ASC
        `;
      } else {
        businesses = await prisma.$queryRaw<Business[]>`
          SELECT slug, name, "shortDescription", description, "listingTier", address, postcode, rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow", lat, lng
          FROM "Business" WHERE "categoryId" = ${catId}
          ORDER BY
            CASE "listingTier" WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 WHEN 'standard' THEN 3 ELSE 4 END ASC,
            (COALESCE(rating, 0) * LOG(COALESCE("reviewCount", 0) + 1)) DESC, name ASC
        `;
      }
    }
  } catch { /* DB unavailable */ }

  // Apply area filter in JS (address-string matching)
  const filteredBusinesses = area
    ? businesses.filter((b) => matchesAreaFilter(b.address, b.postcode, area))
    : businesses;

  const activeSort = sort || "default";
  const sortOptions = [
    { key: "default", label: "Best Match" },
    { key: "alpha",   label: "A – Z" },
    { key: "google",  label: "⭐ Google Rating" },
    ...(isFoodCat ? [{ key: "hygiene", label: "🛡️ Hygiene Rating" }] : []),
  ];

  // Build map pins (only businesses with coordinates)
  const mapPins: MapPinType[] = filteredBusinesses
    .filter((b) => b.lat != null && b.lng != null)
    .map((b) => ({
      slug: b.slug,
      name: b.name,
      lat: b.lat!,
      lng: b.lng!,
      rating: b.rating,
      reviewCount: b.reviewCount,
      priceRange: b.priceRange,
      listingTier: b.listingTier,
      address: b.address,
      category,
    }));

  // Helper to build URL preserving all params
  function buildUrl(overrides: Record<string, string | undefined>) {
    const merged: Record<string, string> = {};
    if (sort) merged.sort = sort;
    if (area) merged.area = area;
    Object.entries(overrides).forEach(([k, v]) => {
      if (v === undefined) delete merged[k];
      else merged[k] = v;
    });
    const qs = new URLSearchParams(merged).toString();
    return `/${category}${qs ? `?${qs}` : ""}`;
  }

  // The list grid — passed as a React node to ViewToggle
  const listGrid = (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-0">
      {filteredBusinesses.length === 0 ? (
        <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">{theme.emoji}</div>
          <p className="text-gray-500 text-lg mb-2">No listings {area ? "in this area" : "yet"}</p>
          {area ? (
            <Link href={`/${category}`} className="text-[#C9A84C] font-semibold text-sm hover:underline">
              Clear area filter
            </Link>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-6">Be the first to list your business here.</p>
              <Link href="/claim-listing" className="inline-block bg-[#C9A84C] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#B8972A] transition-colors">
                Add Your Business
              </Link>
            </>
          )}
        </div>
      ) : (
        filteredBusinesses.map((b) => {
          const isFeatured = b.listingTier === "featured" || b.listingTier === "premium";
          const areaName = getArea(b.address);
          const showHygiene = isFoodCat && b.hygieneRating && b.hygieneRatingShow && /^\d+$/.test(b.hygieneRating);
          const hStyle = showHygiene && b.hygieneRating ? hygieneStyle(b.hygieneRating) : null;

          return (
            <Link
              key={b.slug}
              href={`/${category}/${b.slug}`}
              className={`group flex flex-col bg-white rounded-2xl overflow-hidden card-hover border transition-colors ${
                isFeatured
                  ? "border-[#C9A84C]/40 ring-1 ring-[#C9A84C]/15 shadow-md"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              {/* Coloured top strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient} ${isFeatured ? "h-2" : ""}`} />

              <div className="p-5 flex flex-col flex-1">
                {isFeatured && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#C9A84C]/20">
                      ✦ Featured
                    </span>
                  </div>
                )}

                <h2 className="font-display font-bold text-[#1B2E4B] text-lg leading-snug group-hover:text-[#C9A84C] transition-colors mb-1 line-clamp-2">
                  {b.name}
                </h2>

                <p className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  {areaName}{areaName !== "Southport" ? ", Southport" : ""}
                </p>

                {(() => {
                  const snippet = getSnippet(b);
                  return snippet ? (
                    <p className="text-gray-500 text-sm line-clamp-2 flex-1 mb-4 leading-relaxed">{snippet}</p>
                  ) : <div className="flex-1 mb-4" />;
                })()}

                <div className="flex items-center gap-2 flex-wrap mt-auto pt-3 border-t border-gray-50">
                  {b.rating ? (
                    <span className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {b.rating.toFixed(1)}
                      {b.reviewCount && (
                        <span className="font-normal text-amber-500">
                          ({b.reviewCount >= 1000 ? `${(b.reviewCount / 1000).toFixed(1)}k` : b.reviewCount})
                        </span>
                      )}
                    </span>
                  ) : null}

                  {showHygiene && hStyle && b.hygieneRating && (
                    <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${hStyle.bg} ${hStyle.text} ${hStyle.border}`}>
                      <HygieneIcon r={b.hygieneRating} />
                      FSA {b.hygieneRating}★
                    </span>
                  )}

                  <div className="ml-auto flex items-center gap-2">
                    {b.priceRange && (
                      <span className="text-gray-400 text-xs font-semibold">{b.priceRange}</span>
                    )}
                    <span
                      className="text-xs font-bold group-hover:translate-x-0.5 transition-transform"
                      style={{ color: theme.accent }}
                    >
                      View →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* ── Category Hero ─────────────────────────────────────── */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient}`}>
        <div className="absolute inset-0">
          <Image
            src={`/images/categories/${category}.webp`}
            alt=""
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
            style={{ objectPosition: theme.heroPos }}
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-40`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="relative container mx-auto px-4 max-w-6xl py-12 md:py-16">
          {/* Breadcrumb */}
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

        {/* Wave */}
        <div className="relative h-8 overflow-hidden">
          <svg viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 32L360 16C720 0 1080 0 1440 16V32H0Z" fill="#FAF8F5"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-8">

        {/* ── Area filter pills ──────────────────────────────── */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs font-medium text-gray-400">Area:</span>
          <Link
            href={buildUrl({ area: undefined })}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
              !area
                ? "bg-[#1B2E4B] text-white border-[#1B2E4B]"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
            }`}
          >
            All areas
          </Link>
          {AREAS.map(({ key, label }) => (
            <Link
              key={key}
              href={buildUrl({ area: key })}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                area === key
                  ? "text-white border-transparent"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
              }`}
              style={area === key ? { backgroundColor: theme.accent, borderColor: theme.accent } : {}}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── Sort bar + Map/List toggle ─────────────────────── */}
        <div className="flex items-center gap-2 mb-6 flex-wrap bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
          <ArrowUpDown className="w-4 h-4 text-gray-300 ml-1 flex-shrink-0" />
          <span className="text-xs font-medium text-gray-400 mr-1">Sort:</span>
          {sortOptions.map(({ key, label }) => (
            <Link
              key={key}
              href={buildUrl({ sort: key === "default" ? undefined : key })}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeSort === key
                  ? `text-white shadow-sm`
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
              style={activeSort === key ? { backgroundColor: theme.accent } : {}}
            >
              {label}
            </Link>
          ))}
          <span className="ml-auto text-xs text-gray-400 hidden sm:block mr-2">
            {filteredBusinesses.length} listing{filteredBusinesses.length !== 1 ? "s" : ""}
            {area ? ` · ${AREAS.find((a) => a.key === area)?.label}` : ""}
          </span>

          {/* View toggle is client-side */}
          <ViewToggle
            pins={mapPins}
            accentColor={theme.accent}
            listView={listGrid}
          />
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────── */}
        <div className="mt-14 rounded-2xl overflow-hidden">
          <div className={`bg-gradient-to-br ${theme.gradient} p-8 md:p-10 text-center`}>
            <div className="text-4xl mb-3">{theme.emoji}</div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Own a business in this category?
            </h3>
            <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto">
              List for free and get discovered by thousands of visitors planning their Southport trip.
            </p>
            <Link
              href="/claim-listing"
              className="inline-block bg-[#C9A84C] hover:bg-[#E8C87A] text-white px-7 py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg"
            >
              Add Your Business →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
