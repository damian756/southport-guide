import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Star, MapPin, ArrowRight } from "lucide-react";
import { getCollection, COLLECTIONS, MIN_LISTINGS } from "@/lib/collections-config";
import { prisma } from "@/lib/prisma";

// Revalidate every hour so new tags appear without a code push
export const revalidate = 3600;

const BASE_URL = "https://www.southportguide.co.uk";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Not Found" };

  const url = `${BASE_URL}/collections/${slug}`;
  return {
    title: `${collection.title} | SouthportGuide.co.uk`,
    description: collection.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: collection.title,
      description: collection.metaDescription,
      url,
      type: "website",
      siteName: "SouthportGuide.co.uk",
    },
    twitter: { card: "summary", title: collection.title, description: collection.metaDescription },
  };
}

// ── Business type returned from raw query ─────────────────────────────────────

type CollectionBusiness = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string | null;
  description: string | null;
  listingTier: string;
  address: string;
  postcode: string;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  let businesses: CollectionBusiness[] = [];

  try {
    // Resolve category IDs for the collection's slugs
    const categories = await prisma.category.findMany({
      where: { slug: { in: collection.categorySlugs } },
      select: { id: true, slug: true },
    });
    const catIds = categories.map((c) => c.id);
    const catSlugById = Object.fromEntries(categories.map((c) => [c.id, c.slug]));

    if (catIds.length > 0 && collection.tags.length > 0) {
      // Query: must be in one of the categories AND have ALL the required tags
      const rawResults = await prisma.$queryRaw<(CollectionBusiness & { categoryId: string })[]>`
        SELECT
          b.id,
          b.slug,
          b.name,
          b."categoryId",
          b."shortDescription",
          b.description,
          b."listingTier",
          b.address,
          b.postcode,
          b.rating,
          b."reviewCount",
          b."priceRange"
        FROM "Business" b
        WHERE
          (b."categoryId" = ANY(${catIds}::uuid[] ) OR b."categoryId" = ANY(${catIds}::uuid[]))
          AND b.tags @> ${collection.tags}::text[]
        ORDER BY
          CASE b."listingTier"
            WHEN 'premium'  THEN 1
            WHEN 'featured' THEN 2
            WHEN 'standard' THEN 3
            ELSE 4
          END ASC,
          (COALESCE(b.rating, 0) * LOG(COALESCE(b."reviewCount", 0) + 1)) DESC,
          b.name ASC
      `;

      businesses = rawResults.map((b) => ({
        ...b,
        categorySlug: catSlugById[b.categoryId] ?? collection.categorySlugs[0],
      }));
    }
  } catch {
    // DB unavailable — render with empty list
  }

  const count = businesses.length;
  const isIndexable = count >= MIN_LISTINGS;
  const url = `${BASE_URL}/collections/${slug}`;

  // ── Structured data ──────────────────────────────────────────────────────
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collection.title,
    description: collection.metaDescription,
    url,
    numberOfItems: count,
    itemListElement: businesses.slice(0, 20).map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/${b.categorySlug}/${b.slug}`,
      name: b.name,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Collections", item: `${BASE_URL}/collections` },
      { "@type": "ListItem", position: 3, name: collection.title, item: url },
    ],
  };

  return (
    <>
      {/* noindex for thin pages */}
      {!isIndexable && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="bg-[#1B2E4B] text-white">
          <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
            <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/collections" className="hover:text-white/70 transition-colors">Collections</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/70">{collection.title}</span>
            </nav>

            <div className="text-5xl mb-4">{collection.emoji}</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {collection.title}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              {collection.intro}
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-white/50">
              <span className="font-semibold text-[#C9A84C] text-2xl">{count}</span>
              <span>{count === 1 ? "listing" : "listings"} found</span>
              {!isIndexable && (
                <span className="ml-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  · Building — more coming soon
                </span>
              )}
            </div>
          </div>

          <div className="h-6 overflow-hidden">
            <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
              <path d="M0 24L360 12C720 0 1080 0 1440 12V24H0Z" fill="#FAF8F5" />
            </svg>
          </div>
        </div>

        {/* ── Listings ─────────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 max-w-6xl py-10">

          {count === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">Building this list</h2>
              <p className="text-gray-500 max-w-sm mx-auto">
                We&apos;re working through our database to tag businesses for this collection. Check back soon.
              </p>
              <Link
                href={`/${collection.categorySlugs[0]}`}
                className="inline-flex items-center gap-2 mt-6 text-[#C9A84C] font-semibold hover:underline"
              >
                Browse all in this category <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {businesses.map((b) => (
                <BusinessCard key={b.id} business={b} />
              ))}
            </div>
          )}

          {/* ── Category link ──────────────────────────────────────────── */}
          {count > 0 && (
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm mb-3">
                Want to see everything in {collection.categorySlugs.length > 1 ? "these categories" : "this category"}?
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {collection.categorySlugs.map((catSlug) => (
                  <Link
                    key={catSlug}
                    href={`/${catSlug}`}
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#1B2E4B] px-5 py-2.5 rounded-full text-sm font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all shadow-sm"
                  >
                    Browse all {catSlug.replace(/-/g, " ")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA ──────────────────────────────────────────────────── */}
          <div className="mt-14 bg-[#1B2E4B] rounded-2xl p-8 text-center">
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Own a business that belongs here?
            </h3>
            <p className="text-white/60 text-sm mb-5 max-w-sm mx-auto">
              List your business and get featured in relevant collections across SouthportGuide.
            </p>
            <Link
              href="/claim-listing"
              className="inline-block bg-[#C9A84C] hover:bg-[#E8C87A] text-white px-7 py-3 rounded-full font-bold text-sm transition-all"
            >
              Add Your Business →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

// ── Business Card ─────────────────────────────────────────────────────────────

function BusinessCard({ business: b }: { business: CollectionBusiness }) {
  const snippet = b.shortDescription || b.description?.slice(0, 120) || null;

  return (
    <Link
      href={`/${b.categorySlug}/${b.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {b.listingTier === "premium" && (
            <span className="inline-block text-[10px] font-black bg-[#C9A84C] text-[#1B2E4B] px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
              Featured
            </span>
          )}
          <h2 className="font-display font-bold text-[#1B2E4B] text-base leading-snug group-hover:text-[#C9A84C] transition-colors line-clamp-2">
            {b.name}
          </h2>
        </div>
        {b.priceRange && (
          <span className="text-xs text-gray-400 font-semibold flex-none mt-0.5">{b.priceRange}</span>
        )}
      </div>

      {snippet && (
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{snippet}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MapPin className="w-3.5 h-3.5 flex-none" />
          <span className="truncate">{b.address}</span>
        </div>
        {b.rating != null && (
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 flex-none">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            {b.rating.toFixed(1)}
            {b.reviewCount != null && (
              <span className="text-gray-400 font-normal">({b.reviewCount})</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
