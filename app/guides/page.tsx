import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { GUIDES, GUIDE_CATEGORIES, type GuideCategory } from "@/lib/guides-config";
import GuidesClient from "./GuidesClient";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Southport Guides | The Complete Local Guide Collection",
  description:
    "All of SouthportGuide's editorial guides in one place — beaches, events, areas, practical info, and food & drink. Written by locals. Updated regularly.",
  alternates: { canonical: `${BASE_URL}/guides` },
  openGraph: {
    title: "Southport Guides",
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
    type: "website",
    siteName: "SouthportGuide.co.uk",
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
        <section className="relative bg-[#1B2E4B] text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/southport-beach.webp"
              alt="Southport Beach"
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/50 via-[#1B2E4B]/40 to-[#1B2E4B]/80" />
          </div>
          <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent relative z-10" />
          <div className="relative z-10 py-20 px-4">
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
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-6">
                The beach, the pier, the big events, where to park, where to eat — all of it,
                properly written by people who live here. More added regularly.
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_ORDER.map((cat) => (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    className="text-white/70 hover:text-[#C9A84C] text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 hover:border-[#C9A84C]/50 transition-all backdrop-blur-sm bg-white/5"
                  >
                    {GUIDE_CATEGORIES[cat].label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Guide grid (search + filter + grouped sections) ── */}
        <div className="container mx-auto px-4 max-w-7xl py-16">
          <GuidesClient guides={GUIDES} />

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
