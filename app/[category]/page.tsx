import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Star, MapPin, ArrowUpDown, ShieldCheck, ShieldAlert, ShieldX, Shield } from "lucide-react";
import { getCategoryBySlug, isValidCategory } from "@/lib/config";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export async function generateStaticParams() {
  return [
    { category: "restaurants" },
    { category: "hotels" },
    { category: "bars-nightlife" },
    { category: "cafes" },
    { category: "attractions" },
    { category: "beaches-parks" },
    { category: "shopping" },
    { category: "golf" },
    { category: "activities" },
    { category: "wellness" },
    { category: "transport" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category" };
  return {
    title: `${cat.name} in Southport | SouthportGuide.co.uk`,
    description: `${cat.description} — browse all listings, compare Google ratings, food hygiene scores and more on SouthportGuide.co.uk`,
  };
}

type Business = {
  slug: string;
  name: string;
  shortDescription: string | null;
  listingTier: string;
  address: string;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
  hygieneRating: string | null;
  hygieneRatingShow: boolean;
};

// Which categories show food hygiene
const FOOD_CATS = new Set(["restaurants", "cafes", "bars-nightlife", "hotels", "activities"]);

// Extract short area label from address
function getArea(address: string): string {
  const areas = ["Birkdale", "Ainsdale", "Churchtown", "Crossens", "Marshside",
                 "Formby", "Ormskirk", "Scarisbrick", "Banks", "Halsall", "Burscough"];
  for (const a of areas) { if (address.includes(a)) return a; }
  return "Southport";
}

// Hygiene rating colours
function hygieneColor(r: string): { bg: string; text: string; border: string } {
  const n = parseInt(r);
  if (n === 5 || n === 4) return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
  if (n === 3)             return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" };
  if (n <= 2)              return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
  return                          { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" };
}

function hygieneIcon(r: string) {
  const n = parseInt(r);
  if (n >= 4) return <ShieldCheck className="w-3.5 h-3.5" />;
  if (n === 3) return <Shield className="w-3.5 h-3.5" />;
  if (n <= 2 && n >= 0) return <ShieldAlert className="w-3.5 h-3.5" />;
  return <ShieldX className="w-3.5 h-3.5" />;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { sort } = await searchParams;
  if (!isValidCategory(category)) notFound();
  const cat = getCategoryBySlug(category)!;
  const isFoodCat = FOOD_CATS.has(category);

  let businesses: Business[] = [];

  try {
    const categoryRecord = await prisma.category.findFirst({ where: { slug: category } });
    if (categoryRecord) {
      const catId = categoryRecord.id;

      if (sort === "alpha") {
        businesses = await prisma.$queryRaw<Business[]>`
          SELECT slug, name, "shortDescription", "listingTier", address, rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow"
          FROM "Business"
          WHERE "categoryId" = ${catId}
          ORDER BY name ASC
        `;
      } else if (sort === "hygiene") {
        businesses = await prisma.$queryRaw<Business[]>`
          SELECT slug, name, "shortDescription", "listingTier", address, rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow"
          FROM "Business"
          WHERE "categoryId" = ${catId}
          ORDER BY
            CASE
              WHEN "hygieneRating" ~ '^[0-9]+$' THEN CAST("hygieneRating" AS INTEGER)
              ELSE -1
            END DESC,
            (COALESCE(rating, 0) * LOG(COALESCE("reviewCount", 0) + 1)) DESC,
            name ASC
        `;
      } else if (sort === "google") {
        businesses = await prisma.$queryRaw<Business[]>`
          SELECT slug, name, "shortDescription", "listingTier", address, rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow"
          FROM "Business"
          WHERE "categoryId" = ${catId}
          ORDER BY
            CASE "listingTier"
              WHEN 'premium'  THEN 1
              WHEN 'featured' THEN 2
              WHEN 'standard' THEN 3
              ELSE 4
            END ASC,
            COALESCE(rating, 0) DESC,
            COALESCE("reviewCount", 0) DESC,
            name ASC
        `;
      } else {
        // Default: featured first, then weighted score
        businesses = await prisma.$queryRaw<Business[]>`
          SELECT slug, name, "shortDescription", "listingTier", address, rating, "reviewCount", "priceRange", "hygieneRating", "hygieneRatingShow"
          FROM "Business"
          WHERE "categoryId" = ${catId}
          ORDER BY
            CASE "listingTier"
              WHEN 'premium'  THEN 1
              WHEN 'featured' THEN 2
              WHEN 'standard' THEN 3
              ELSE 4
            END ASC,
            (COALESCE(rating, 0) * LOG(COALESCE("reviewCount", 0) + 1)) DESC,
            name ASC
        `;
      }
    }
  } catch {
    // DB not connected
  }

  const activeSort = sort || "default";
  const sortOptions = [
    { key: "default", label: "Best Match" },
    { key: "alpha",   label: "A – Z" },
    { key: "google",  label: "Google Rating" },
    ...(isFoodCat ? [{ key: "hygiene", label: "Hygiene Rating" }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <nav className="text-sm text-gray-500 mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-gray-900 font-medium">{cat.name}</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{cat.name} in Southport</h1>
              <p className="text-gray-500 mt-1">{businesses.length} listings</p>
            </div>
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2 mt-5 flex-wrap">
            <ArrowUpDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-500 mr-1">Sort by:</span>
            {sortOptions.map(({ key, label }) => (
              <Link
                key={key}
                href={key === "default" ? `/${category}` : `/${category}?sort=${key}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeSort === key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {businesses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-4 text-lg">No listings yet. Check back soon!</p>
            <Link href="/claim-listing" className="text-blue-600 hover:underline font-medium">List your business →</Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => {
              const isFeatured = b.listingTier === "featured" || b.listingTier === "premium";
              const area = getArea(b.address);
              const showHygiene = isFoodCat && b.hygieneRating && b.hygieneRatingShow;
              const hygieneNum = b.hygieneRating && /^\d+$/.test(b.hygieneRating) ? b.hygieneRating : null;
              const hColor = hygieneNum ? hygieneColor(hygieneNum) : null;

              return (
                <Link
                  key={b.slug}
                  href={`/${category}/${b.slug}`}
                  className={`group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border ${
                    isFeatured ? "border-blue-300 ring-1 ring-blue-100" : "border-gray-100 hover:border-blue-200"
                  }`}
                >
                  {/* Featured banner */}
                  {isFeatured && (
                    <div className="bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
                      FEATURED LISTING
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    {/* Name + area */}
                    <div className="mb-3">
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight line-clamp-2">
                        {b.name}
                      </h2>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {area}{area !== "Southport" ? ", Southport" : ""}
                      </p>
                    </div>

                    {/* Description */}
                    {b.shortDescription && (
                      <p className="text-gray-500 text-sm line-clamp-2 flex-1 mb-4">
                        {b.shortDescription}
                      </p>
                    )}

                    {/* Ratings row */}
                    <div className="flex items-center gap-2 flex-wrap mt-auto pt-3 border-t border-gray-50">
                      {/* Google rating */}
                      {b.rating ? (
                        <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-100">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {b.rating.toFixed(1)}
                          {b.reviewCount && (
                            <span className="text-amber-500 font-normal">
                              ({b.reviewCount >= 1000 ? `${(b.reviewCount / 1000).toFixed(1)}k` : b.reviewCount})
                            </span>
                          )}
                        </span>
                      ) : null}

                      {/* Hygiene rating */}
                      {showHygiene && hColor && hygieneNum && (
                        <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${hColor.bg} ${hColor.text} ${hColor.border}`}>
                          {hygieneIcon(hygieneNum)}
                          Hygiene {hygieneNum}/5
                        </span>
                      )}

                      {/* Price */}
                      {b.priceRange && (
                        <span className="text-gray-400 text-xs font-medium ml-auto">{b.priceRange}</span>
                      )}

                      {/* View arrow */}
                      <span className={`text-blue-600 text-xs font-semibold group-hover:translate-x-0.5 transition-transform ${b.priceRange ? "" : "ml-auto"}`}>
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
          <p className="text-gray-900 font-semibold text-lg mb-1">Own a {cat.name.toLowerCase().replace(/s$/, "")} in Southport?</p>
          <p className="text-gray-500 text-sm mb-4">Get your business listed for free — add photos, manage your food hygiene display, and attract more customers.</p>
          <Link href="/claim-listing" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition text-sm">
            Add Your Business →
          </Link>
        </div>
      </div>
    </div>
  );
}
