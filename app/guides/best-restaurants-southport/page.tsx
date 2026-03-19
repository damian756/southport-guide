import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight, ArrowRight, Utensils, Star, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";
import { getBusinessLinks, bizHref } from "@/lib/guide-business-links";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("best-restaurants-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "best restaurants Southport, restaurants in Southport, where to eat Southport, Southport dining, Bistrot Veronique Southport, V-Cafe Southport, restaurants Lord Street Southport",
  alternates: { canonical: `${BASE_URL}/guides/best-restaurants-southport` },
  openGraph: {
    title: "Best Restaurants in Southport 2026 | Honest Local Guide | SouthportGuide",
    description:
      "The best restaurants in Southport — Terry's honest guide. Lord Street, Birkdale Village, and the places most visitors never find. No sponsored results.",
    url: `${BASE_URL}/guides/best-restaurants-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/restaurants.webp` }],
  },
};

const FAQS = [
  {
    q: "What is the best restaurant in Southport?",
    a: "Bistrot Véronique on Scarisbrick New Road is consistently the most discussed fine dining option in Southport — French bistro cooking, proper wine list, booking essential. For a less formal option that still delivers, V-Café on Lord Street has a loyal following. The restaurant scene in Birkdale Village has also improved significantly over the last few years.",
  },
  {
    q: "Do I need to book restaurants in Southport?",
    a: "For the better restaurants — yes, especially Friday and Saturday evenings. Bistrot Véronique in particular books up well in advance at weekends. During Open week (July) and Flower Show weekend (August), the entire town's restaurant capacity gets stretched — book as early as possible for those dates.",
  },
  {
    q: "Is Southport good for dining?",
    a: "Better than its reputation suggests. The top end is genuinely good — Bistrot Véronique competes with anything in Liverpool. The mid-range has improved considerably in the last decade, particularly in Birkdale Village. The weakest area is the area immediately around the seafront, which skews more toward casual eating.",
  },
  {
    q: "Where should I eat near Southport Beach?",
    a: "The seafront has more casual options — beach cafés, fish and chips, and a few pub-grills. For a proper meal, head inland to Lord Street or Birkdale Village. It's 15–20 minutes' walk from the beach to the better restaurants. If you're combining beach and dinner, factor in the walk or a short drive.",
  },
  {
    q: "Are there good Indian restaurants in Southport?",
    a: "Yes — Southport has a solid selection of Indian restaurants. Several are on or near Lord Street and in the wider town centre. The quality varies, but there are reliable options for a good curry. Check current reviews on Google Maps for up-to-date recommendations.",
  },
  {
    q: "Are there restaurants suitable for children in Southport?",
    a: "Most of Southport's restaurants are family-friendly, particularly at lunch. The more formal end (Bistrot Véronique, for example) is better as an adult evening option. Pizza and pasta options, the seafront casual dining spots, and the Birkdale Village end of the market all work well with children.",
  },
];

const RESTAURANTS = [
  {
    name: "Bistrot Véronique",
    area: "Town Centre",
    style: "French Bistro",
    price: "££££",
    bookAhead: true,
    notes: "The best fine dining option in Southport. Proper French bistro cooking, serious wine list. On Scarisbrick New Road. Book at least a week ahead for weekend evenings.",
  },
  {
    name: "V-Café",
    area: "Lord Street",
    style: "Modern European",
    price: "£££",
    bookAhead: true,
    notes: "A Lord Street institution with a loyal following. Good for a proper lunch or dinner. Smart casual. Booking recommended for evenings.",
  },
  {
    name: "The Vincent Hotel Restaurant",
    area: "Lord Street",
    style: "Hotel Restaurant / Contemporary",
    price: "£££",
    bookAhead: false,
    notes: "The restaurant in The Vincent Hotel on Lord Street. Good quality, reliable execution. Works well for business meals and special occasions.",
  },
  {
    name: "Thai Terrace",
    area: "Town Centre",
    style: "Thai",
    price: "££",
    bookAhead: true,
    notes: "Consistently good Thai cooking in Southport. Popular and gets busy — worth booking. Good value relative to the quality.",
  },
  {
    name: "Birkdale Village restaurants",
    area: "Birkdale Village",
    style: "Various",
    price: "££–£££",
    bookAhead: true,
    notes: "The village has a growing restaurant scene — check what's current on Liverpool Road. The mix changes but quality has been improving. Booking advised for Friday and Saturday evenings.",
  },
  {
    name: "Don Luigi",
    area: "Lord Street",
    style: "Italian",
    price: "££",
    bookAhead: false,
    notes: "Reliable Italian on Lord Street. Good for a family dinner or casual evening. Consistent over the years.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Best Restaurants in Southport — Honest Local Guide",
  description:
    "The best restaurants in Southport, ranked honestly by locals — Lord Street, Birkdale Village, and the places most visitors never find.",
  url: `${BASE_URL}/guides/best-restaurants-southport`,
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

export default async function BestRestaurantsSouthportGuidePage() {
  const bizLinks = await getBusinessLinks(RESTAURANTS.map((r) => r.name));
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[60vh] flex items-end bg-[#2C1A10] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/restaurants.webp"
            alt="Best restaurants in Southport"
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
            <Utensils className="w-4 h-4" />
            Food &amp; Drink Guide
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Best Restaurants in Southport
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Terry&apos;s honest guide. No sponsored placements. Lord Street, Birkdale Village,
            and the places most visitors never find.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-[#C9A84C]" />
              <span>Top pick: Bistrot Véronique</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-[#C9A84C]" />
              <span>Weekends: book ahead</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 max-w-4xl py-14">

        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">The Honest Assessment</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Southport&apos;s restaurant scene is better than its reputation. The top end competes with anything in Liverpool. The mid-range has improved significantly over the last decade. The weakest area is the zone immediately around the seafront — which skews heavily toward casual eating and pub food.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The places worth knowing about are mostly on or near Lord Street, in Birkdale Village, or on the side streets running off the main drag. They don&apos;t advertise much. Some have been here for decades. Most visitors stumble on them or don&apos;t find them at all.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 my-6">
            <p className="text-[#1B2E4B] font-medium leading-relaxed">
              <span className="mr-2">📅</span>
              During Open week (July 12–19) and Flower Show weekend (August 20–23), Southport&apos;s entire restaurant capacity gets stretched. Book 2–4 weeks ahead for those dates — not just a few days.
            </p>
          </div>
        </section>

        {/* Restaurant table */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">The Restaurants Worth Knowing</h2>
          <div className="space-y-4">
            {RESTAURANTS.map((r, i) => {
              const biz = bizLinks[r.name];
              return (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#C9A84C] font-black text-sm">#{i + 1}</span>
                      {biz ? (
                        <Link href={bizHref(biz)} className="font-display font-bold text-[#1B2E4B] text-lg hover:text-[#C9A84C] transition-colors underline underline-offset-2 decoration-[#C9A84C]/40">
                          {r.name}
                        </Link>
                      ) : (
                        <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{r.name}</h3>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.area}</span>
                      <span>{r.style}</span>
                      <span className="font-semibold text-[#1B2E4B]">{r.price}</span>
                      {r.bookAhead && <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">Book ahead</span>}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.notes}</p>
              </div>
            );})}
          </div>
        </section>

        {/* Area breakdown */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Where to Eat by Area</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                area: "Lord Street & Town Centre",
                notes: "The main concentration of restaurants. Mix of quality — the better independents are on or just off Lord Street. Best for an evening out. Walk the length first and see what appeals.",
              },
              {
                area: "Birkdale Village",
                notes: "Growing dining scene on Liverpool Road. More relaxed than the town centre. Good for a neighbourhood dinner feel. 2 miles south of the town centre — worth the short drive.",
              },
              {
                area: "Seafront & Promenade",
                notes: "More casual — beach cafés, fish and chips, pub food. Good for a quick lunch after the beach. Not the area for a special occasion dinner.",
              },
              {
                area: "Churchtown",
                notes: "Village pubs and local restaurants rather than destination dining. Good for a relaxed lunch combined with the Botanic Gardens or Hesketh Park.",
              },
            ].map(({ area, notes }) => (
              <div key={area} className="bg-[#FAF8F5] rounded-2xl p-5">
                <h3 className="font-semibold text-[#1B2E4B] mb-2">{area}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking tips */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Booking Tips</h2>
          <ul className="space-y-3">
            {[
              "Bistrot Véronique: book at least a week ahead for weekend evenings. More for Open week and Flower Show.",
              "Most mid-range Lord Street restaurants: 2–3 days notice for weekends, walk-in usually fine for weekday lunches.",
              "Birkdale Village: call ahead for Friday and Saturday evenings — smaller rooms fill quickly.",
              "Open week (July) and Flower Show (August): treat these as peak season and book everything as early as possible.",
              "Lunch is generally easier than dinner across all restaurants — useful if you're flexible.",
            ].map((tip) => (
              <li key={tip} className="flex gap-3 text-gray-700">
                <span className="text-[#C9A84C] font-bold flex-none mt-0.5">→</span>
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
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
              { href: "/guides/best-cafes-southport", label: "Best Cafés" },
              { href: "/guides/birkdale-village", label: "Birkdale Village" },
              { href: "/guides/lord-street", label: "Lord Street" },
              { href: "/restaurants", label: "Restaurant Listings" },
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
