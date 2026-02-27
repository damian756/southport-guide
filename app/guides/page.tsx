import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { GUIDES, GUIDE_CATEGORIES, type GuideCategory } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Southport Guides | The Complete Local Guide Collection | SouthportGuide",
  description:
    "All of SouthportGuide's editorial guides in one place — beaches, events, areas, practical info, and food & drink. Written by locals. Updated regularly.",
  alternates: { canonical: `${BASE_URL}/guides` },
  openGraph: {
    title: "Southport Guides | SouthportGuide.co.uk",
    description:
      "The complete collection of Southport local guides — beaches, events, neighbourhoods, parking, and where to eat. Written by someone who lives here.",
    url: `${BASE_URL}/guides`,
    images: [{ url: `${BASE_URL}/southport-pier.webp` }],
  },
};

// Category display order for the index page
const CATEGORY_ORDER: GuideCategory[] = [
  "beaches-coast",
  "events",
  "areas",
  "practical",
  "food-drink",
];

const COLLECTION_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Southport Guides",
  description:
    "The complete collection of editorial guides to Southport — beaches, events, areas, practical info, and food & drink.",
  url: `${BASE_URL}/guides`,
  publisher: {
    "@type": "Organization",
    name: "SouthportGuide.co.uk",
    url: BASE_URL,
  },
  hasPart: GUIDES.filter((g) => g.status === "published").map((g) => ({
    "@type": "Article",
    name: g.title,
    url: `${BASE_URL}/guides/${g.slug}`,
    description: g.description,
    image: `${BASE_URL}${g.heroImage}`,
  })),
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides` },
  ],
};

export default function GuidesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* ── Hero ── */}
        <div className="bg-[#1B2E4B] text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-xs text-white/40">
                <li><Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link></li>
                <li className="text-white/30">›</li>
                <li className="text-white/70 font-semibold">Guides</li>
              </ol>
            </nav>
            <div className="flex items-center gap-4 mb-5">
              <BookOpen className="w-8 h-8 text-[#C9A84C] flex-shrink-0" />
              <div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">
                  SouthportGuide.co.uk
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                  The Guides
                </h1>
              </div>
            </div>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-6">
              The beach, the pier, the big events, where to park, where to eat — all of it,
              properly written by people who live here. More added regularly.
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_ORDER.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className="text-white/60 hover:text-[#C9A84C] text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 hover:border-[#C9A84C]/50 transition-all"
                >
                  {GUIDE_CATEGORIES[cat].label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Category Sections ── */}
        <div className="container mx-auto px-4 max-w-7xl py-16 space-y-20">
          {CATEGORY_ORDER.map((category) => {
            const guides = GUIDES.filter((g) => g.category === category);
            if (guides.length === 0) return null;
            const { label, description } = GUIDE_CATEGORIES[category];
            const published = guides.filter((g) => g.status === "published");
            const comingSoon = guides.filter((g) => g.status === "coming-soon");

            return (
              <section key={category} id={category} className="scroll-mt-24">
                {/* Section header */}
                <div className="flex items-end justify-between mb-8 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-1">
                      {published.length} guide{published.length !== 1 ? "s" : ""} published
                      {comingSoon.length > 0 ? ` · ${comingSoon.length} coming` : ""}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B]">
                      {label}
                    </h2>
                    <p className="text-gray-600 mt-1 text-base">{description}</p>
                  </div>
                </div>

                {/* Published guides */}
                {published.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                    {published.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
                      >
                        {/* Hero image */}
                        <div className="relative h-44 overflow-hidden">
                          <Image
                            src={guide.heroImage}
                            alt={guide.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="bg-[#C9A84C] text-[#1B2E4B] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {label}
                            </span>
                          </div>
                        </div>
                        {/* Content */}
                        <div className="p-5">
                          <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-1.5 group-hover:text-[#C9A84C] transition-colors leading-tight">
                            {guide.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                            {guide.description}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm">
                            Read guide <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Coming soon guides */}
                {comingSoon.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {comingSoon.map((guide) => (
                      <div
                        key={guide.slug}
                        className="bg-white/50 rounded-xl border border-gray-200 border-dashed p-5 opacity-70"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Coming Soon
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-gray-600 text-base mb-1">
                          {guide.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{guide.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {/* ── Bottom CTA ── */}
          <section className="bg-[#1B2E4B] rounded-2xl p-8 md:p-12 text-center text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">
              Southport Business?
            </p>
            <h2 className="font-display text-3xl font-bold mb-4">
              Get Featured in These Guides
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              SouthportGuide reaches visitors actively planning their trip. 
              List your business and appear in relevant guides — the beach guide shows beach cafés, 
              the Birkdale guide shows Birkdale businesses, automatically.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/claim-listing"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors"
              >
                List Your Business
              </Link>
              <Link
                href="/things-to-do"
                className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20"
              >
                Things to Do in Southport →
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
