import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import OpenListingCard from "@/components/OpenListingCard";

export const metadata: Metadata = {
  title: "Restaurants Near Royal Birkdale | The Open 2026",
  description:
    "The best restaurants and dining in Southport and Birkdale for The Open Championship 2026. Book ahead, venues near Royal Birkdale fill up weeks in advance during Open week.",
  alternates: { canonical: "https://www.southportguide.co.uk/the-open-2026/restaurants" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    title: "Restaurants Near Royal Birkdale | The Open 2026",
    description: "The best restaurants in Southport and Birkdale for The Open 2026. Book ahead — venues fill weeks in advance.",
    url: "https://www.southportguide.co.uk/the-open-2026/restaurants",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "The Open 2026", item: "https://www.southportguide.co.uk/the-open-2026" },
    { "@type": "ListItem", position: 3, name: "Restaurants", item: "https://www.southportguide.co.uk/the-open-2026/restaurants" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where should I eat near Royal Birkdale during The Open 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Birkdale village has the closest restaurants and pubs to Royal Birkdale, within a 5-minute walk of the course. Book well in advance — these venues fill up entirely during Open week. Southport town centre (10 minutes by taxi) has a wider selection of restaurants along Lord Street." },
    },
    {
      "@type": "Question",
      name: "Do I need to book restaurants in advance for Open week 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, absolutely. With 250,000 spectators in the area, restaurant demand far exceeds normal capacity. Evening reservations from Thursday to Sunday within two miles of the course are essentially fully booked weeks in advance. Book now." },
    },
    {
      "@type": "Question",
      name: "Are there restaurants inside Royal Birkdale during The Open?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — on-course hospitality and food concessions are available inside the grounds, but prices are high. Many spectators eat properly at their accommodation or a local restaurant before arriving, and use on-course facilities for snacks and drinks only." },
    },
  ],
};

const AREA_DINING = [
  {
    area: "Birkdale Village",
    desc: "The closest dining to the course and the most in-demand during Open week. A handful of excellent independent restaurants and traditional pubs sit within a five-minute walk of Royal Birkdale. Book tables weeks in advance. Regulars and hotel guests fill them first.",
    tips: ["Book at least 6–8 weeks in advance for evening slots", "Lunch reservations on championship days are also popular. Don't assume walk-ins work.", "The village pubs are atmospheric for post-round drinks"],
  },
  {
    area: "Lord Street, Southport",
    desc: "Southport's main boulevard has the widest range of restaurants and bars in the area: Italian, modern British, casual dining, and independent cafes all line the Victorian canopy. A short taxi or shuttle from the course, and the better choice for evening entertainment if you want variety.",
    tips: ["More availability than Birkdale, but book for evening sittings during Open week", "Coopers Bar has live music every evening", "Wayfarers Arcade has good café options for lunch before play"],
  },
  {
    area: "Ocean Plaza / Seafront",
    desc: "The seafront development has chains and casual dining options that can absorb larger groups without a booking. Not the most atmospheric option but practical for families or large parties who need flexibility.",
    tips: ["Hickory's Smokehouse is good for groups and families", "Walk-in friendly compared to town centre venues", "Good for a quick pre-course breakfast"],
  },
];

const OPEN_DINING_TIPS = [
  "Book restaurants now. Even venues that don't usually fill up will be full during Open week.",
  "If you can't get an evening reservation, lunch bookings are easier to secure",
  "On-course hospitality is available for premium ticket packages, check theopen.com",
  "Food within the course grounds is available but expensive. Eat a proper meal at your accommodation before arriving.",
  "Evening meals in Birkdale village are the most atmospheric. Worth the effort of an early booking.",
  "Some Southport restaurants add an Open week supplement. Check when booking.",
];

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

export default async function OpenRestaurantsPage() {
  let restaurants: ListingItem[] = [];
  let bars: ListingItem[] = [];

  const SELECT = {
    slug: true,
    name: true,
    shortDescription: true,
    address: true,
    rating: true,
    reviewCount: true,
    priceRange: true,
    listingTier: true,
    images: true,
  } as const;

  try {
    const [rCat, bCat] = await Promise.all([
      prisma.category.findFirst({ where: { slug: "restaurants" } }),
      prisma.category.findFirst({ where: { slug: "bars-nightlife" } }),
    ]);
    if (rCat) {
      restaurants = await prisma.business.findMany({
        where: { categoryId: rCat.id },
        take: 9,
        orderBy: [{ listingTier: "desc" }, { rating: "desc" }],
        select: SELECT,
      });
    }
    if (bCat) {
      bars = await prisma.business.findMany({
        where: { categoryId: bCat.id },
        take: 6,
        orderBy: [{ listingTier: "desc" }, { rating: "desc" }],
        select: SELECT,
      });
    }
  } catch {
    restaurants = [];
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
          src="/images/categories/restaurants.webp"
          alt="Restaurants and dining in Southport for The Open Championship 2026"
          fill sizes="100vw" quality={75}
          className="object-cover"
          style={{ objectPosition: "center 25%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/40 via-[#1B2E4B]/20 to-[#1B2E4B]/90" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <Link href="/the-open-2026" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> The Open 2026
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Where to Eat During The Open 2026</h1>
          <p className="text-white/60 mt-2">Restaurants and pubs in Southport and Birkdale, July 12–19</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-12 space-y-10">

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-gray-100 p-7">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="w-5 h-5 text-amber-500 flex-none mt-0.5" />
            <p className="font-bold text-amber-700 text-sm">Book restaurants now. Open week is not a normal week in Southport.</p>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            250,000 spectators. One week. A town whose restaurants could not normally accommodate half that number if they all arrived on the same evening. Southport&apos;s dining scene is genuinely good, but during Open week, it is under extraordinary pressure. The venues that locals love, that visitors rave about, that have reasonable prices and proper food, will be fully booked weeks before the first round.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Book now. For dinner particularly. Lunch is more forgiving, especially if you&apos;re flexible on timing. But dinner from Thursday to Sunday, within two miles of Royal Birkdale, is essentially a sold market.
          </p>
        </div>

        {/* Area dining guide */}
        <div>
          <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Where to Eat: Area Guide</h2>
          <div className="space-y-5">
            {AREA_DINING.map(({ area, desc, tips }) => (
              <div key={area} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <h3 className="font-display text-lg font-bold text-[#1B2E4B]">{area}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-1.5">
                  {tips.map((tip) => (
                    <li key={tip} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[#C9A84C] font-bold flex-none">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Practical tips */}
        <div className="bg-[#1B2E4B] rounded-2xl p-7 text-white">
          <h2 className="font-display text-xl font-bold text-white mb-5">Open Week Dining Tips</h2>
          <ul className="space-y-3">
            {OPEN_DINING_TIPS.map((tip) => (
              <li key={tip} className="flex gap-3 text-sm">
                <span className="text-[#C9A84C] font-bold flex-none">→</span>
                <span className="text-white/80">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Restaurant listings */}
        {restaurants.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Southport Restaurants</h2>
              <Link href="/restaurants" className="text-sm font-semibold text-[#C9A84C] hover:underline">View all →</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants.map((r) => (
                <OpenListingCard
                  key={r.slug}
                  {...r}
                  firstImage={r.images[0] ?? null}
                  categorySlug="restaurants"
                  themeGradient="from-orange-900 to-red-800"
                  emoji="🍽️"
                />
              ))}
            </div>
          </div>
        )}

        {/* Bars */}
        {bars.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Bars &amp; Pubs</h2>
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

        {/* Fallback */}
        {restaurants.length === 0 && bars.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm mb-4">Browse our full Southport restaurant and bar directory.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/restaurants" className="bg-[#1B2E4B] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#2A4A73] transition-colors">
                Restaurants →
              </Link>
              <Link href="/bars-nightlife" className="border border-[#1B2E4B]/20 text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#1B2E4B] hover:text-white transition-colors">
                Bars &amp; Pubs →
              </Link>
            </div>
          </div>
        )}

        {/* Blog post link */}
        <div className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-[#1B2E4B] text-sm">From the blog</p>
            <p className="text-gray-600 text-sm mt-1">Read Terry&apos;s honest guide to the best restaurants in Southport for 2026. Written by someone who&apos;s eaten in most of them.</p>
          </div>
          <Link href="/blog/best-restaurants-southport-2026" className="flex-none bg-[#1B2E4B] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#2A4A73] transition-colors whitespace-nowrap">
            Read the guide →
          </Link>
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
          <Link href="/the-open-2026" className="text-sm font-semibold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors">
            ← Back to The Open 2026
          </Link>
          <Link href="/the-open-2026/accommodation" className="text-sm font-semibold text-[#C9A84C] hover:underline">
            Find accommodation →
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
