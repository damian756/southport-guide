import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight, ArrowRight, Coffee, Clock, Star } from "lucide-react";
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
    "best cafes Southport, coffee shops Southport, independent cafes Southport, Southport coffee, where to have coffee Southport, tea rooms Southport",
  alternates: { canonical: `${BASE_URL}/guides/best-cafes-southport` },
  openGraph: {
    title: "Best Cafés in Southport 2026 | Independent Coffee Guide | SouthportGuide",
    description:
      "The best independent cafés in Southport — proper coffee, food worth ordering, and the places locals actually use. Terry's guide.",
    url: `${BASE_URL}/guides/best-cafes-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/cafes.webp` }],
  },
};

const FAQS = [
  {
    q: "Where is the best coffee in Southport?",
    a: "The best independent coffee in Southport is found in the cafés on or around Lord Street and in Birkdale Village. The independent places consistently outperform the chains for espresso quality and atmosphere. Several have been here for years and have their own loyal customer base.",
  },
  {
    q: "Are there dog-friendly cafés in Southport?",
    a: "Yes — several of the better independent cafés in Southport welcome dogs, particularly those with outdoor seating. Look for a water bowl outside the door — that's the usual sign. The Botanic Gardens café in Churchtown is dog-friendly in the outdoor area. Birkdale Village cafés tend to be more relaxed about dogs than the town centre.",
  },
  {
    q: "Is there a good café near Southport beach?",
    a: "There are beach cafés on Marine Drive near the Promenade — mostly catering to beach visitors with the usual ice cream, snacks, and basic hot drinks. For a proper independent café with good espresso, you'll need to walk 10–15 minutes to Lord Street or the town centre.",
  },
  {
    q: "What are the best cafés on Lord Street Southport?",
    a: "Lord Street has several café options — a mix of independents and small chains. The better independent ones are usually on the side streets immediately off Lord Street rather than the main drag. Walk the area and look for the places without laminated menus in the window.",
  },
  {
    q: "Where can I work from a café in Southport?",
    a: "Several of Southport's independent cafés have decent wifi and enough space for laptop use, particularly on weekday mornings. The Atkinson arts centre café on Lord Street is one of the more comfortable options for a longer stay. Avoid trying to camp in the smaller cafés at peak lunch times.",
  },
];

const CAFES = [
  {
    name: "Café Niko",
    area: "Lord Street",
    bestFor: "Proper espresso, lunch",
    notes: "One of Southport's best-regarded independent cafés. Good coffee, food worth ordering. Popular for weekend brunch. On or near Lord Street.",
  },
  {
    name: "The Atkinson Café",
    area: "Lord Street (in arts centre)",
    bestFor: "Longer stays, working, rainy days",
    notes: "Inside The Atkinson arts centre. More space than most. Decent coffee, straightforward food. Good wifi. Open during arts centre hours.",
  },
  {
    name: "Wayfarers Arcade Café",
    area: "Off Lord Street",
    bestFor: "Browsing stop, wet days",
    notes: "Small café inside Wayfarers Arcade. Good for a coffee stop while exploring the arcade. Covered and comfortable.",
  },
  {
    name: "Botanic Gardens Café",
    area: "Churchtown",
    bestFor: "Post-walk, dogs welcome",
    notes: "Inside the Botanic Gardens — free entry to the gardens. Outdoor seating. Good for coffee and a straightforward bite after the gardens. Dog-friendly outside.",
  },
  {
    name: "Birkdale Village independents",
    area: "Liverpool Road, Birkdale",
    bestFor: "Neighbourhood feel, less busy",
    notes: "A few good independent cafés along Liverpool Road in Birkdale Village. More relaxed than the town centre. Worth the short drive or train ride.",
  },
  {
    name: "Southport Market café area",
    area: "Town Centre Market",
    bestFor: "Lunch, casual coffee",
    notes: "The market hall has a café area with coffee and food from the market traders. More atmosphere than a standalone café. Good for a weekday lunch stop.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Best Cafés in Southport — Independent Coffee Guide",
  description:
    "The best independent cafés and coffee shops in Southport — where locals actually go. Terry's honest guide.",
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
            alt="Best cafés in Southport"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
            style={{ objectPosition: "center 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A10] via-[#2C1A10]/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl pb-14 pt-20">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">
            <Coffee className="w-4 h-4" />
            Food &amp; Drink Guide
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Best Cafés in Southport
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Independent coffee shops and the places locals actually go.
            Proper espresso, food worth ordering, no chains.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-[#C9A84C]" />
              <span>Best: Café Niko, Lord Street</span>
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
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">The Honest Assessment</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Southport has a decent independent café scene — better than you&apos;d expect from a town this size, worse than Liverpool&apos;s Northern Quarter. The best places are independents that have been around long enough to know what they&apos;re doing. The chains are where you end up when you can&apos;t find anywhere else.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The concentration of good cafés is on and around Lord Street and in Birkdale Village. A few are in less obvious spots — Churchtown and the Atkinson are worth knowing about for a different pace.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 my-6">
            <p className="text-[#1B2E4B] font-medium leading-relaxed">
              <span className="mr-2">☕</span>
              If you want good espresso and a nice room to sit in, the independents on the Lord Street side streets and in Birkdale Village are the answer. Weekday mornings before the lunch rush are the best time to visit.
            </p>
          </div>
        </section>

        {/* Café list */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">The Cafés Worth Knowing</h2>
          <div className="space-y-4">
            {CAFES.map((c, i) => {
              const biz = bizLinks[c.name];
              return (
              <div key={c.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#C9A84C] font-black text-sm">#{i + 1}</span>
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
                notes: "Café Niko and the better Lord Street independents do proper brunch at weekends. Expect a wait on sunny Saturday mornings. Worth it.",
              },
              {
                title: "With a laptop",
                notes: "The Atkinson café is the most comfortable for longer stays — space, wifi, and nobody rushing you. Avoid peak lunch times.",
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
            If coffee shops aren&apos;t the goal and you want a proper pot of tea with something to eat, there are a handful of more traditional options in Southport. The Churchtown area around the Botanic Gardens is the most appropriate setting for this — slower, quieter, and genuinely pleasant.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Wayfarers Arcade also has a relaxed café that doesn&apos;t feel rushed. Good for a mid-afternoon sit-down without the pressure of a busy lunch service.
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
              { href: "/guides/best-restaurants-southport", label: "Best Restaurants" },
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
