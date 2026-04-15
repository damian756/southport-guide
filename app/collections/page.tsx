import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS, MIN_LISTINGS } from "@/lib/collections-config";
import { prisma } from "@/lib/prisma";

// Revalidate every hour so tag counts stay fresh
export const revalidate = 3600;

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Collections | Curated Lists of Southport Businesses",
  description:
    "Curated collections of Southport businesses, dog-friendly restaurants, hotels with parking, live music bars, and more. Filtered, local, and honest.",
  alternates: { canonical: `${BASE_URL}/collections` },
  openGraph: {
    title: "Collections | SouthportGuide.co.uk",
    description: "Curated Southport business collections — dog-friendly, family-friendly, outdoor seating, late night, and more.",
    url: `${BASE_URL}/collections`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
  },
};

const COLLECTION_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Southport Collections",
  description: "Curated collections of Southport businesses — dog-friendly restaurants, hotels with parking, live music bars, and more.",
  url: `${BASE_URL}/collections`,
  publisher: { "@type": "Organization", name: "SouthportGuide.co.uk", url: BASE_URL },
};

async function getCollectionCounts(): Promise<Record<string, number>> {
  try {
    const rows = await prisma.$queryRaw<{ tag: string; count: number }[]>`
      SELECT tag, COUNT(*)::int AS count
      FROM "Business", unnest(tags) AS tag
      GROUP BY tag
    `;
    return Object.fromEntries(rows.map((r) => [r.tag, r.count]));
  } catch {
    return {};
  }
}

export default async function CollectionsIndexPage() {
  const tagCounts = await getCollectionCounts();

  // A collection is "live" if at least one of its required tags has enough matches
  // considering its category scope (approximate — exact count is on the individual page)
  const liveCollections = COLLECTIONS.filter((c) => {
    const count = c.tags.reduce((sum, tag) => sum + (tagCounts[tag] ?? 0), 0);
    return count >= MIN_LISTINGS;
  });

  const comingSoon = COLLECTIONS.filter((c) => {
    const count = c.tags.reduce((sum, tag) => sum + (tagCounts[tag] ?? 0), 0);
    return count < MIN_LISTINGS;
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_LD) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="relative text-white overflow-hidden">
          <Image
            src="/images/collections/collections-hero.jpg"
            alt="Lord Street boulevard, Southport"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="relative py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6">
                <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                <span className="text-white/20">›</span>
                <span className="text-white/70">Collections</span>
              </nav>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">SouthportGuide.co.uk</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.9)' }}>
                Southport Collections
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                Filtered lists of Southport businesses, dog-friendly, family-friendly, outdoor seating, and more. 
                No aggregator ranking. Just what&apos;s actually there, with a bit of honest context.
              </p>
            </div>
          </div>
          <div className="relative h-6 overflow-hidden">
            <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
              <path d="M0 24L360 12C720 0 1080 0 1440 12V24H0Z" fill="#FAF8F5" />
            </svg>
          </div>
        </div>

        {/* ── Grid ──────────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 max-w-6xl py-12">
          {/* Live collections */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveCollections.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                {c.image ? (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-2xl">{c.emoji}</span>
                  </div>
                ) : (
                  <div className="text-3xl p-6 pb-0">{c.emoji}</div>
                )}
                <div className="p-5">
                  <h2 className="font-display font-bold text-[#1B2E4B] text-base leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                    {c.metaDescription}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[#C9A84C] text-sm font-semibold">
                    View list <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming soon — collapsed, not linked */}
          {comingSoon.length > 0 && (
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Coming soon</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {comingSoon.map((c) => (
                  <div
                    key={c.slug}
                    className="bg-white/60 rounded-xl border border-gray-100 border-dashed p-4 opacity-60"
                  >
                    <span className="text-2xl mb-2 block">{c.emoji}</span>
                    <p className="font-semibold text-[#1B2E4B] text-sm leading-snug">{c.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 bg-[#1B2E4B] rounded-2xl p-8 text-center">
            <h2 className="font-display text-xl font-bold text-white mb-2">
              Own a business in Southport?
            </h2>
            <p className="text-white/60 text-sm mb-5 max-w-sm mx-auto">
              List your business and we&apos;ll include you in relevant collections automatically.
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
