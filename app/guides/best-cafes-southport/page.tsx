import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight, ArrowRight, Coffee, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";
import { getBusinessLinks, bizHref } from "@/lib/guide-business-links";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("best-cafes-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "cafes Southport, coffee shops Southport, independent cafes Southport, Southport coffee, where to have coffee Southport, tea rooms Southport",
  alternates: { canonical: `${BASE_URL}/guides/best-cafes-southport` },
  openGraph: {
    title: "Cafés in Southport: A Guide by Area | SouthportGuide",
    description:
      "Cafés and coffee shops in Southport by area: Lord Street, King Street, the market, Churchtown and Birkdale Village, with tips for brunch, laptops, dogs and children.",
    url: `${BASE_URL}/guides/best-cafes-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/cafes.webp` }],
  },
};

const FAQS = [
  {
    q: "Where are the independent cafés in Southport?",
    a: "Most are on or around Lord Street and in Birkdale Village, with others on King Street, in Southport Market and in Churchtown. Several have been here for years and have their own regular customers.",
  },
  {
    q: "Are there dog-friendly cafés in Southport?",
    a: "Yes, several independent cafés in Southport welcome dogs, particularly those with outdoor seating. Look for a water bowl outside the door, that's the usual sign. The Botanic Gardens café in Churchtown is dog-friendly in the outdoor area. Birkdale Village cafés tend to be more relaxed about dogs than the town centre.",
  },
  {
    q: "Is there a good café near Southport beach?",
    a: "There are beach cafés on Marine Drive near the Promenade, mostly catering to beach visitors with ice cream, snacks and hot drinks. For an independent café, it's a 10–15 minute walk to Lord Street or the town centre.",
  },
  {
    q: "What cafés are there on Lord Street Southport?",
    a: "Lord Street has several café options, a mix of independents and small chains. Many of the independents are on the side streets immediately off Lord Street rather than the main drag. Walk the area and look for the places without laminated menus in the window.",
  },
  {
    q: "Where can I work from a café in Southport?",
    a: "Several of Southport's independent cafés have decent wifi and enough space for laptop use, particularly on weekday mornings. The Atkinson arts centre café on Lord Street has space for a longer stay. Avoid trying to camp in the smaller cafés at peak lunch times.",
  },
];

const CAFES = [
  {
    name: "Café Niko",
    area: "Lord Street",
    bestFor: "Espresso, lunch",
    notes: "Independent café on or near Lord Street, serving coffee and food, with brunch at weekends.",
  },
  {
    name: "Southport Market café area",
    area: "Town Centre Market",
    bestFor: "Lunch, casual coffee",
    notes: "The market hall has a café area with coffee and food from the market traders. Busier and livelier than a standalone café. Handy for a weekday lunch stop.",
  },
  {
    name: "The Atkinson Café",
    area: "Lord Street (in arts centre)",
    bestFor: "Longer stays, working, rainy days",
    notes: "Inside The Atkinson arts centre, with space to sit, coffee, food and wifi. Open during arts centre hours.",
  },
  {
    name: "Wayfarers Arcade Café",
    area: "Off Lord Street",
    bestFor: "Browsing stop, wet days",
    notes: "Small café inside Wayfarers Arcade, for a coffee stop while exploring the arcade. Covered.",
  },
  {
    name: "Botanic Gardens Café",
    area: "Churchtown",
    bestFor: "Post-walk, dogs welcome",
    notes: "Inside the Botanic Gardens, free entry to the gardens. Outdoor seating. Coffee and a bite to eat after the gardens. Dog-friendly outside.",
  },
  {
    name: "Birkdale Village independents",
    area: "Liverpool Road, Birkdale",
    bestFor: "Neighbourhood feel, less busy",
    notes: "A few independent cafés along Liverpool Road in Birkdale Village.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cafés in Southport: A Guide by Area",
  description:
    "A guide to cafés and coffee shops in Southport by area, from Lord Street and King Street to Churchtown and Birkdale Village.",
  url: `${BASE_URL}/guides/best-cafes-southport`,
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function BestCafesSouthportGuidePage() {
  const bizLinks = await getBusinessLinks(CAFES.map((c) => c.name));
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[55vh] flex items-end bg-[#2C1A10] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/cafes.webp"
            alt="Cafés in Southport"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
            style={{ objectPosition: "center 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl pb-14 pt-20" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">
            <Coffee className="w-4 h-4" />
            Food &amp; Drink Guide
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Cafés in Southport: A Guide by Area
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Independent coffee shops, tea rooms and café stops around Southport,
            from Lord Street to Churchtown and Birkdale Village.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>Lord Street, Churchtown, Birkdale</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-[#C9A84C]" />
              <span>Weekday mornings: quietest</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 max-w-4xl py-14">

        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">The Café Scene</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Southport has an independent café scene, with places that have been around for years alongside newer openings and the high street chains.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most of the cafés are on and around Lord Street and in Birkdale Village, with a few in less obvious spots. Churchtown and the Atkinson offer a different pace.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 my-6">
            <p className="text-[#1B2E4B] font-medium leading-relaxed">
              <span className="mr-2">☕</span>
              If you want espresso and a room to sit in, look at the independents on the Lord Street side streets and in Birkdale Village. Weekday mornings before the lunch rush are the best time to visit.
            </p>
          </div>
        </section>

        {/* Café list */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Cafés Around Town</h2>
          <div className="space-y-4">
            {CAFES.map((c) => {
              const biz = bizLinks[c.name];
              return (
              <div key={c.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {biz ? (
                        <Link href={bizHref(biz)} className="font-display font-bold text-[#1B2E4B] text-lg hover:text-[#C9A84C] transition-colors underline underline-offset-2 decoration-[#C9A84C]/40">
                          {c.name}
                        </Link>
                      ) : (
                        <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{c.name}</h3>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.area}</span>
                      <span className="text-[#C9A84C] font-semibold">{c.bestFor}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{c.notes}</p>
              </div>
            );})}
          </div>
        </section>

        {/* By need */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Finding the Right Café</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "For brunch",
                notes: "Café Niko and other Lord Street independents do brunch at weekends. Expect a wait on sunny Saturday mornings.",
              },
              {
                title: "With a laptop",
                notes: "The Atkinson café has space and wifi for longer stays. Avoid peak lunch times.",
              },
              {
                title: "With a dog",
                notes: "Botanic Gardens café (outdoor area), Birkdale Village independents, and various places with outdoor seating. Look for the water bowl outside.",
              },
              {
                title: "With young children",
                notes: "Most independent cafés in Southport are reasonably relaxed about children. The market café area and seafront spots are more casual and forgiving of noise.",
              },
            ].map(({ title, notes }) => (
              <div key={title} className="bg-[#FAF8F5] rounded-2xl p-5">
                <h3 className="font-semibold text-[#1B2E4B] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tea rooms */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Tea Rooms &amp; a Different Pace</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If coffee shops aren&apos;t the goal and you want a proper pot of tea with something to eat, there are a handful of more traditional options in Southport. The Churchtown area around the Botanic Gardens is the most appropriate setting for this, slower, quieter, and genuinely pleasant.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Wayfarers Arcade also has a café.
          </p>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-[#1B2E4B] text-sm hover:text-[#C9A84C] transition-colors list-none">
                  {q}
                  <ChevronRight className="w-4 h-4 flex-none group-open:rotate-90 transition-transform text-[#C9A84C]" />
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#FAF8F5] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">More food &amp; drink guides</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/guides/southport-eateries", label: "Where to Eat in Southport" },
              { href: "/guides/best-restaurants-southport", label: "Restaurants in Southport" },
              { href: "/guides/birkdale-village", label: "Birkdale Village" },
              { href: "/guides/dog-friendly-southport", label: "Dog-Friendly Guide" },
              { href: "/cafes", label: "Café Listings" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-[#1B2E4B] hover:text-[#C9A84C] text-sm font-semibold transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" /> {label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
