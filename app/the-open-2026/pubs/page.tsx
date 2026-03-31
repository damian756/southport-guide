import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import OpenListingCard from "@/components/OpenListingCard";

export const metadata: Metadata = {
  title: "Pubs Near Royal Birkdale | The Open 2026",
  description:
    "The best pubs within walking distance of Royal Birkdale for The Open Championship 2026. Birkdale village pubs, Southport bars, and tips for Open week drinking in Southport.",
  alternates: { canonical: "https://www.southportguide.co.uk/the-open-2026/pubs" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    title: "Pubs Near Royal Birkdale | The Open 2026",
    description: "The best pubs within walking distance of Royal Birkdale for The Open 2026. Birkdale village pubs, Southport bars, and Open week tips.",
    url: "https://www.southportguide.co.uk/the-open-2026/pubs",
  },
};

const PUBS_BY_AREA = [
  {
    area: "Birkdale Village",
    distance: "Walking distance from course",
    desc: "Birkdale village has a handful of proper local pubs that become the beating heart of Open week. They are small, atmospheric, and absolutely rammed from lunchtime onwards on championship days. If you want a drink in Birkdale, get there early or expect a long wait.",
    pubs: [
      { name: "The Fisherman's Rest", note: "Classic village local. Open from 11am, live music some evenings during Open week." },
      { name: "The Birkdale Village Inn", note: "Traditional pub atmosphere, large beer garden, good for groups." },
      { name: "Locals along Liverpool Road", note: "Several smaller bars within the village, explore on foot from the station." },
    ],
  },
  {
    area: "Southport Town Centre & Lord Street",
    distance: "10 min by taxi from course",
    desc: "Southport's town centre pub and bar scene is extensive. Lord Street, Chapel Street, and the surrounding streets have everything from Victorian boozers to cocktail bars. This is the better option for evenings when you want variety and atmosphere beyond the immediate course area.",
    pubs: [
      { name: "Coopers Bar", note: "One of the most popular in town. Live music most evenings. Good beer selection." },
      { name: "The Guest House", note: "Relaxed, local feel. Real ales and a proper pub menu." },
      { name: "The Lakehouse", note: "Near Marine Lake. Good for a post-game drink with views." },
      { name: "Lord Street bars", note: "Multiple options along the Victorian boulevard, explore at your own pace." },
    ],
  },
  {
    area: "Seafront & Ocean Plaza",
    distance: "15–20 min walk or 5 min taxi",
    desc: "The seafront has a mix of chain bars and independent spots. Less atmospheric than the town centre or Birkdale, but useful if you're staying on the seafront side of town or want somewhere with outdoor space and sea views.",
    pubs: [
      { name: "Southport seafront bars", note: "Seasonal venues with outdoor seating, good on a warm Open week evening." },
      { name: "Ocean Plaza venues", note: "Chain options, can handle larger groups, walk-in friendly." },
    ],
  },
];

const TIPS = [
  "Birkdale village pubs will be at capacity from lunchtime on championship days, arrive early or head to town",
  "Book a table at any pub serving food if you want to eat during Open week, walk-ins won't get a seat",
  "Most Southport pubs extend their hours during Open week, last orders will be later than normal",
  "The atmosphere in Southport town centre on Saturday evening (Moving Day) is genuinely special, don't rush back to your accommodation",
  "Real ale fans: several Southport pubs stock local and craft ales, ask at the bar what's on",
  "Taxi back from Birkdale village is easy in the evening, book your return in advance on busy days",
];

const FAQS = [
  {
    q: "Are there pubs walking distance from Royal Birkdale?",
    a: "Yes. Birkdale village, which sits directly adjacent to the course, has several pubs within a 5–10 minute walk of the Royal Birkdale entrance. These are the most in-demand during Open week and fill up quickly on championship days.",
  },
  {
    q: "Can I watch The Open on TV in Southport pubs?",
    a: "Yes, most Southport pubs with sports screens will be showing coverage during Open week. For those staying in Southport rather than attending every day, watching in a local pub with fellow golf fans is a great alternative.",
  },
  {
    q: "What time do Southport pubs open during The Open week?",
    a: "Many pubs in Birkdale and Southport town centre open earlier than usual during Open week, some from 9am or 10am for breakfast and early spectators. Last orders are also typically extended. Check with your chosen venue for specific hours.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "The Open 2026", item: "https://www.southportguide.co.uk/the-open-2026" },
    { "@type": "ListItem", position: 3, name: "Pubs", item: "https://www.southportguide.co.uk/the-open-2026/pubs" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

type ListingItem = {
  slug: string;
  name: string;
  shortDescription: string | null;
  address: string;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
  listingTier: string;
  images: string[];
};

export default async function OpenPubsPage() {
  let bars: ListingItem[] = [];
  try {
    const cat = await prisma.category.findFirst({ where: { slug: "bars-nightlife" } });
    if (cat) {
      bars = await prisma.business.findMany({
        where: { categoryId: cat.id },
        take: 9,
        orderBy: [{ listingTier: "desc" }, { rating: "desc" }],
        select: {
          slug: true,
          name: true,
          shortDescription: true,
          address: true,
          rating: true,
          reviewCount: true,
          priceRange: true,
          listingTier: true,
          images: true,
        },
      });
    }
  } catch {
    bars = [];
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* Hero */}
        <section className="relative h-64 md:h-80 bg-[#1B2E4B] overflow-hidden">
          <Image
            src="/images/categories/bars-nightlife.webp"
            alt="Pubs and bars near Royal Birkdale during The Open 2026"
            fill sizes="100vw" quality={75}
            className="object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/40 via-[#1B2E4B]/20 to-[#1B2E4B]/90" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
            <Link href="/the-open-2026" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> The Open 2026
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Pubs Near Royal Birkdale</h1>
            <p className="text-white/60 mt-2">Where to drink during The Open Championship 2026. Birkdale, Lord Street & beyond</p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl py-12 space-y-10">

          {/* Intro */}
          <div className="bg-white rounded-2xl border border-gray-100 p-7">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-4">Drinking at The Open. What to Expect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Open Championship is a week-long event and the pub culture around it is part of the experience. Birkdale village becomes a buzzing social hub during Open week, small pubs packed with golf fans from across the world, atmosphere you won&apos;t find anywhere else in sport. Southport town centre comes alive in the evenings.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The key thing to know: popular Birkdale pubs will be at capacity from early afternoon on championship days. If you want a table, especially for food, you need to get there early, or plan around it.
            </p>
          </div>

          {/* Pubs by area */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Pubs by Area</h2>
            <div className="space-y-6">
              {PUBS_BY_AREA.map(({ area, distance, desc, pubs }) => (
                <div key={area} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <h3 className="font-display text-lg font-bold text-[#1B2E4B]">{area}</h3>
                    <span className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                      <MapPin className="w-3 h-3" /> {distance}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-3">
                    {pubs.map(({ name, note }) => (
                      <li key={name} className="flex gap-3 text-sm">
                        <span className="text-[#C9A84C] font-bold flex-none mt-0.5">→</span>
                        <span>
                          <span className="font-semibold text-[#1B2E4B]">{name}</span>
                          {" — "}
                          <span className="text-gray-500">{note}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#1B2E4B] rounded-2xl p-7 text-white">
            <h2 className="font-display text-xl font-bold text-white mb-5">Open Week Pub Tips</h2>
            <ul className="space-y-3">
              {TIPS.map((tip) => (
                <li key={tip} className="flex gap-3 text-sm">
                  <span className="text-[#C9A84C] font-bold flex-none">→</span>
                  <span className="text-white/80">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DB bar listings */}
          {bars.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Bars &amp; Pubs in Our Directory</h2>
                <Link href="/bars-nightlife" className="text-sm font-semibold text-[#C9A84C] hover:underline">View all →</Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bars.map((b) => (
                  <OpenListingCard
                    key={b.slug}
                    {...b}
                    firstImage={b.images[0] ?? null}
                    categorySlug="bars-nightlife"
                    themeGradient="from-purple-900 to-indigo-800"
                    emoji="🍺"
                  />
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Pubs &amp; Bars FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-display font-bold text-[#1B2E4B] mb-3">{q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
            <Link href="/the-open-2026" className="text-sm font-semibold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors">
              ← Back to The Open 2026
            </Link>
            <Link href="/the-open-2026/restaurants" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              Restaurants guide →
            </Link>
            <Link href="/the-open-2026/accommodation" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              Find accommodation →
            </Link>
            <Link href="/bars-nightlife" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              All Southport bars →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
