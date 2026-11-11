import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight, ArrowRight, Utensils, Star, Clock, PoundSterling } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";
import { getBusinessLinks, bizHref, type BusinessLinkData } from "@/lib/guide-business-links";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-eateries");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport eateries, where to eat Southport, restaurants Southport, Southport food, eating out Southport, Southport dining, Southport restaurants Lord Street",
  alternates: { canonical: `${BASE_URL}/guides/southport-eateries` },
  openGraph: {
    title: "Southport Eateries | Where to Eat in Southport | Local Guide",
    description:
      "The complete guide to eating out in Southport, where to go by area, occasion, and budget. Lord Street, Birkdale Village, Churchtown, and the seafront. Written by a local.",
    url: `${BASE_URL}/guides/southport-eateries`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/restaurants.webp` }],
  },
};

const QUICK_LINKS = [
  { href: "#lord-street", label: "Lord Street", icon: MapPin },
  { href: "#birkdale", label: "Birkdale Village", icon: MapPin },
  { href: "#churchtown", label: "Churchtown", icon: MapPin },
  { href: "#seafront", label: "Seafront", icon: MapPin },
  { href: "#by-occasion", label: "By Occasion", icon: Star },
  { href: "#budget", label: "Budget Eats", icon: PoundSterling },
  { href: "#cuisines", label: "By Cuisine", icon: Utensils },
  { href: "#tips", label: "Tips", icon: Clock },
  { href: "#faq", label: "FAQs", icon: ChevronRight },
];

const LORD_STREET_PICKS = [
  {
    name: "Bistrot Véronique",
    style: "French bistro",
    price: "££££",
    note: "French bistro with a wine list. On Scarisbrick New Road, not Lord Street itself, but a 2-minute walk. Book a week ahead at weekends.",
    bookAhead: true,
  },
  {
    name: "V-Café",
    style: "Modern British / All-day",
    price: "£££",
    note: "All-day restaurant on Lord Street, open for lunch and for an evening out.",
    bookAhead: true,
  },
  {
    name: "Bistro Bar Med",
    style: "Mediterranean",
    price: "£££",
    note: "Mediterranean-influenced menu on Lord Street: pasta, fish and salads. Takes groups. Worth booking on weekend evenings.",
    bookAhead: false,
  },
  {
    name: "The Vinegar Tap",
    style: "Fish & Chips / Casual",
    price: "££",
    note: "Fish and chips in the town centre, without going to the seafront. Sit-in and takeaway. Expect a queue on Friday lunchtimes.",
    bookAhead: false,
  },
  {
    name: "Southport Market",
    style: "Street food hall",
    price: "£–££",
    note: "The indoor market hall off Lord Street. Multiple independent vendors, pizza, wraps, Korean, Indian, burgers. Good for groups where everyone wants something different. No booking, just turn up.",
    bookAhead: false,
  },
];

const BIRKDALE_PICKS = [
  {
    name: "The Swan",
    style: "Classic British pub / dining",
    price: "£££",
    note: "Pub dining in Birkdale. Gets busy, so call ahead for evening sittings at weekends.",
    bookAhead: true,
  },
  {
    name: "Volare",
    style: "Italian",
    price: "£££",
    note: "Italian restaurant on Liverpool Road, Birkdale, serving pasta.",
    bookAhead: false,
  },
  {
    name: "The Birkdale Palms",
    style: "Café / Brunch / Light meals",
    price: "££",
    note: "Café in Birkdale serving brunch, including eggs benedict, and light meals. Gets busy on Sunday mornings, expect a short wait.",
    bookAhead: false,
  },
  {
    name: "Crust & Co",
    style: "Pizza",
    price: "££",
    note: "Independent pizza place in Birkdale with sourdough bases. A relaxed evening option, less formal than a full sit-down restaurant.",
    bookAhead: false,
  },
];

const CHURCHTOWN_PICKS = [
  {
    name: "The Hesketh Arms",
    style: "Traditional British pub / food",
    price: "££–£££",
    note: "Old stone pub in Churchtown serving food year-round, including Sunday lunch. A 10-minute drive from the town centre. Dog-friendly in the garden.",
    bookAhead: true,
  },
  {
    name: "The Bold Arms",
    style: "Traditional pub",
    price: "££",
    note: "A village local in the heart of Churchtown village, for a pint and a pie if you're passing through.",
    bookAhead: false,
  },
];

const SEAFRONT_PICKS = [
  {
    name: "The Funky Fish Bar",
    style: "Fish & Chips / Seafront",
    price: "££",
    note: "Fish and chips on the seafront, sit-down or takeaway. Gets very busy in summer, arrive before 12:30 or after 2:30.",
    bookAhead: false,
  },
  {
    name: "Ocean Plaza Food Court",
    style: "Chain options / Casual",
    price: "£–££",
    note: "The retail park on the seafront has chain café options, useful to know about, especially with children.",
    bookAhead: false,
  },
];

const BY_OCCASION = [
  {
    occasion: "Date night",
    pick: "Bistrot Véronique",
    note: "French bistro. Book at least a week ahead. Dress reasonably well.",
    link: "/restaurants",
  },
  {
    occasion: "Big family lunch",
    pick: "The Swan, Birkdale",
    note: "Space for larger groups. Call ahead to reserve.",
    link: "/restaurants",
  },
  {
    occasion: "Post-beach food",
    pick: "Funky Fish Bar or Southport Market",
    note: "Fish and chips near the beach, or the market for groups who can't agree.",
    link: "/restaurants",
  },
  {
    occasion: "Sunday lunch",
    pick: "The Hesketh Arms, Churchtown, or The Swan, Birkdale",
    note: "Book ahead, by Thursday for a Sunday table. Churchtown is a 10-minute drive from the town centre.",
    link: "/restaurants",
  },
  {
    occasion: "Quick weekday lunch",
    pick: "Southport Market or Vinegar Tap",
    note: "Both take walk-ins. Market for variety, Vinegar Tap if you're after fish and chips.",
    link: "/restaurants",
  },
  {
    occasion: "Coffee and something good",
    pick: "Birkdale Palms or any of the Lord Street independents",
    note: "Independent cafés in Birkdale Village and on and around Lord Street.",
    link: "/cafes",
  },
];

const CUISINES = [
  { type: "French / European fine dining", where: "Bistrot Véronique (Scarisbrick New Road)" },
  { type: "Italian", where: "Volare (Birkdale), Bistro Bar Med (Lord Street)" },
  { type: "Indian / Curry", where: "Several options on and around Lord Street, check Google ratings for current form" },
  { type: "Chinese", where: "A handful of options in the town centre, worth checking current reviews" },
  { type: "Thai", where: "Limited but available, check the restaurants directory for current listings" },
  { type: "Fish & Chips", where: "Funky Fish Bar (seafront), Vinegar Tap (town centre)" },
  { type: "Pizza", where: "Crust & Co (Birkdale), Southport Market vendors" },
  { type: "Street food / casual", where: "Southport Market, many vendors in one place" },
  { type: "Pub food", where: "Hesketh Arms (Churchtown), The Swan (Birkdale)" },
  { type: "Brunch", where: "Birkdale Palms (Birkdale), Lord Street independent cafés" },
];

const FAQS = [
  {
    q: "Where can I eat out in Southport?",
    a: "Bistrot Véronique on Scarisbrick New Road is a French bistro with a wine list; book ahead. For everyday eating out, there is The Swan in Birkdale and V-Café on Lord Street. Southport Market suits groups with mixed tastes.",
  },
  {
    q: "Where should I eat on Lord Street in Southport?",
    a: "V-Café and Bistro Bar Med are both on Lord Street itself. Bistrot Véronique, a French bistro, is around the corner on Scarisbrick New Road, 2 minutes' walk away.",
  },
  {
    q: "Are there good restaurants near Southport Beach?",
    a: "The seafront has casual options, fish and chips, beach cafés, and a few pub-grill type places. For a sit-down restaurant meal, it's a 15-minute walk or short drive into town to Lord Street or Birkdale Village.",
  },
  {
    q: "Do I need to book restaurants in Southport?",
    a: "For many places, yes, especially Friday and Saturday evenings. Bistrot Véronique books out a week or more in advance at weekends. On big event weekends, such as the Flower Show, book as early as possible.",
  },
  {
    q: "Where can I get Sunday lunch in Southport?",
    a: "The Hesketh Arms in Churchtown and The Swan in Birkdale both do Sunday lunch. Churchtown is a 10-minute drive from the town centre. Book in advance, as both get busy.",
  },
  {
    q: "What is the difference between Southport eateries and restaurants?",
    a: "In Southport, the two terms are used interchangeably. Eateries just means anywhere you can get food, from a sit-down restaurant to a market vendor. This guide covers the full range, from casual lunch spots to places worth booking for a special evening.",
  },
  {
    q: "Are there vegetarian or vegan options in Southport?",
    a: "Yes. Most of the mid-range and upmarket restaurants in Southport now have solid vegetarian options. Bistro Bar Med and V-Café both have vegetarian options. Southport Market has street food vendors with vegan-specific options. The independent café scene in Birkdale and on Lord Street generally handles dietary requirements without fuss.",
  },
  {
    q: "Where can I eat near Southport train station?",
    a: "The station is on Chapel Street, a short walk from Lord Street. Southport Market is the closest option with variety. V-Café, Bistro Bar Med, and most of the Lord Street restaurants are within 5–10 minutes on foot.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Guide",
  name: "Southport Eateries. Where to Eat in Southport",
  description:
    "The complete guide to eating out in Southport, where to go by area, occasion, and budget. Lord Street, Birkdale Village, Churchtown, and the seafront.",
  url: `${BASE_URL}/guides/southport-eateries`,
  publisher: {
    "@type": "Organization",
    name: "SouthportGuide.co.uk",
    url: BASE_URL,
  },
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

function BizName({ name, links }: { name: string; links: Record<string, BusinessLinkData> }) {
  const data = links[name];
  if (data) {
    return (
      <Link href={bizHref(data)} className="text-[#C9A84C] hover:text-[#1B2E4B] underline underline-offset-2 decoration-[#C9A84C]/50 transition-colors font-semibold">
        {name}
      </Link>
    );
  }
  return <span>{name}</span>;
}

export default async function SouthportEateriesGuidePage() {
  const ALL_NAMES = [
    ...LORD_STREET_PICKS.map((r) => r.name),
    ...BIRKDALE_PICKS.map((r) => r.name),
    ...CHURCHTOWN_PICKS.map((r) => r.name),
    ...SEAFRONT_PICKS.map((r) => r.name),
  ];
  const bizLinks = await getBusinessLinks(ALL_NAMES);

  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/restaurants.webp"
            alt="Eating out in Southport: restaurants on Lord Street"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 pb-14 pt-28 max-w-7xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Food Guide
              </span>
              <span className="text-white/50 text-sm font-medium">SouthportGuide.co.uk</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Eateries</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              Where to eat in Southport, by area, by occasion, and by budget. Lord Street, Birkdale Village,
              Churchtown, the seafront, and the places most visitors never find.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#lord-street"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Explore the Guide
              </a>
              <Link
                href="/restaurants"
                className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Browse All Listings →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Nav ── */}
      <div className="sticky top-16 z-20 bg-[#1B2E4B]/97 backdrop-blur-sm border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-0.5 overflow-x-auto py-2.5 scrollbar-hide">
            {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-white/60 hover:text-[#C9A84C] text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap transition"
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Answer ── */}
      <div className="bg-[#1B2E4B] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">At a glance</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "French bistro", value: "Bistrot Véronique" },
              { label: "Pub food", value: "Hesketh Arms, The Swan" },
              { label: "Sunday lunch", value: "Hesketh Arms, The Swan" },
              { label: "Food market", value: "Southport Market" },
              { label: "Fish & chips", value: "Funky Fish Bar, Vinegar Tap" },
              { label: "Brunch", value: "Birkdale Palms" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{item.label}</p>
                <p className="text-white font-bold text-xs mt-1 leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-20">

        {/* ── Terry's Take ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Eating Out in Southport: An Overview</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Southport has places to eat for most occasions, from French bistro cooking at Bistrot Véronique on Scarisbrick New Road
                to pub dining at The Swan in Birkdale Village, where Liverpool Road has its own cluster of independent restaurants and cafés.
              </p>
              <p>
                Lord Street is the obvious starting point for eating out. It&apos;s a long street and the choice is spread out.
                V-Café and Bistro Bar Med are both on Lord Street, and Bistrot Véronique is two minutes away on Scarisbrick New Road.
                For something quick, Southport Market has many vendors in one place.
              </p>
              <p>
                The seafront leans toward casual food: Funky Fish Bar does fish and chips, and there are chain options around Ocean Plaza.
                Churchtown, ten minutes from the town centre, is often missed: the Hesketh Arms there does Sunday lunch.
              </p>
              <p>
                One practical note: on big event weekends, such as the Flower Show, restaurants fill up. Book well ahead.
              </p>
            </div>
          </div>
        </section>

        {/* ── Lord Street ── */}
        <section id="lord-street" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Town Centre</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Lord Street &amp; Town Centre</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Lord Street is a Victorian boulevard wide enough to feel relaxed rather than rushed. The eating options run the full
              length, from cafés to restaurants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {LORD_STREET_PICKS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-lg"><BizName name={r.name} links={bizLinks} /></h3>
                    <p className="text-[#C9A84C] text-xs font-semibold mt-0.5">{r.style}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-bold text-gray-600">{r.price}</span>
                    {r.bookAhead && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                        Book ahead
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#FAF8F5] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-[#1B2E4B]">Good to know:</span> Lord Street&apos;s covered arcades give it a built-in rain advantage.
              You can eat, browse, and walk the full length without getting wet. Factor that in when the weather turns, which it does.
            </p>
          </div>
        </section>

        {/* ── Birkdale Village ── */}
        <section id="birkdale" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">2 miles south of town</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Birkdale Village</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The locals&apos; preference for an evening out, less tourist-facing, more neighbourhood feel.
              Liverpool Road in Birkdale has a cluster of independent restaurants and cafés that rewards knowing about.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {BIRKDALE_PICKS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-lg"><BizName name={r.name} links={bizLinks} /></h3>
                    <p className="text-[#C9A84C] text-xs font-semibold mt-0.5">{r.style}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-bold text-gray-600">{r.price}</span>
                    {r.bookAhead && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                        Book ahead
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#1B2E4B] rounded-2xl p-5 text-white">
            <p className="text-sm leading-relaxed text-white/80">
              <span className="font-bold text-[#C9A84C]">Birkdale tip:</span> Birkdale Village is also close to Royal Birkdale Golf Club,
              so it suits golfers visiting the course.
            </p>
          </div>
        </section>

        {/* ── Churchtown ── */}
        <section id="churchtown" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">10 minutes from town centre</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Churchtown</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Most visitors to Southport never make it to Churchtown. It&apos;s the oldest part of town,
              with two village pubs that serve food.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {CHURCHTOWN_PICKS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-lg"><BizName name={r.name} links={bizLinks} /></h3>
                    <p className="text-[#C9A84C] text-xs font-semibold mt-0.5">{r.style}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-bold text-gray-600">{r.price}</span>
                    {r.bookAhead && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                        Book ahead
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#FAF8F5] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-[#1B2E4B]">While you&apos;re there:</span> Churchtown&apos;s Botanic Gardens are free and right next to the Hesketh Arms.
              A Sunday lunch followed by a walk around the gardens is a very good way to spend an afternoon.
              <Link href="/guides/churchtown" className="text-[#C9A84C] hover:underline ml-1">Churchtown guide →</Link>
            </p>
          </div>
        </section>

        {/* ── Seafront ── */}
        <section id="seafront" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Marine Drive · PR8 1RX</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">The Seafront</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The seafront is mostly casual eating: fish and chips and chain cafés. For a sit-down meal, head inland.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SEAFRONT_PICKS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-lg"><BizName name={r.name} links={bizLinks} /></h3>
                    <p className="text-[#C9A84C] text-xs font-semibold mt-0.5">{r.style}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-600 flex-shrink-0">{r.price}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── By Occasion ── */}
        <section id="by-occasion" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Matched to your visit</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Where to Eat. By Occasion</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Some places to consider, matched to the kind of day you&apos;re having.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BY_OCCASION.map((item) => (
              <div key={item.occasion} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Utensils className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">{item.occasion}</p>
                </div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2">{item.pick}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.note}</p>
                <Link href={item.link} className="text-[#C9A84C] text-xs font-semibold hover:text-[#1B2E4B] transition-colors flex items-center gap-1">
                  Browse listings <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Budget Eats ── */}
        <section id="budget" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Affordable options</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Budget Eats in Southport</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Southport is not an expensive town to eat in, most mid-range places are very reasonable.
              Here&apos;s the affordable end.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Southport Market",
                note: "Multiple vendors under one roof. Pizza, curry, burgers, Korean, wraps. Nothing costs much. No booking required, turn up and choose.",
                price: "£–££",
              },
              {
                name: "The Vinegar Tap",
                note: "Fish and chips without going to the seafront. Expect a queue at lunchtime.",
                price: "££",
              },
              {
                name: "Lord Street independents",
                note: "Lunch specials on Lord Street and the surrounding streets. Café lunches, sandwiches, soups, most under £10. Worth exploring on foot.",
                price: "£–££",
              },
              {
                name: "Funky Fish Bar",
                note: "Seafront fish and chips, around £12, for a sunny afternoon by the beach.",
                price: "££",
              },
              {
                name: "Birkdale Palms",
                note: "Brunch, with eggs and coffee on the menu.",
                price: "££",
              },
              {
                name: "Indian restaurants, town centre",
                note: "Several reliable Indian restaurants around Lord Street and the town centre. Prices are very reasonable. Check Google ratings for current recommendations.",
                price: "££",
              },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base">{item.name}</h3>
                  <span className="text-sm font-bold text-gray-500 flex-shrink-0">{item.price}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── By Cuisine ── */}
        <section id="cuisines" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What are you after?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Eateries by Cuisine</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              A quick reference if you know what you want and just need to find it.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B2E4B] text-white">
                  <th className="text-left px-6 py-3 font-semibold">Cuisine / Type</th>
                  <th className="text-left px-6 py-3 font-semibold">Where to go</th>
                </tr>
              </thead>
              <tbody>
                {CUISINES.map((row, i) => (
                  <tr key={row.type} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-3.5 font-medium text-[#1B2E4B]">{row.type}</td>
                    <td className="px-6 py-3.5 text-gray-600">{row.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/restaurants"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors"
            >
              Browse the full restaurant directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Practical Tips ── */}
        <section id="tips" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before you go</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Practical Tips</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Clock,
                title: "When to book",
                tip: "Friday and Saturday evenings at popular places, book at least a few days ahead. Sunday lunch at Hesketh Arms or The Swan, book by Thursday.",
              },
              {
                icon: MapPin,
                title: "Getting between areas",
                tip: "Lord Street to Birkdale is about 15 minutes on foot, or 5 minutes by car. Churchtown is 10 minutes by car from Lord Street. Parking is generally easy in Birkdale and Churchtown.",
              },
              {
                icon: PoundSterling,
                title: "Paying",
                tip: "Most places accept cards. A few smaller cafés and market vendors are cash-preferred, worth having a tenner on you. Service charge is not always included, check the bill.",
              },
              {
                icon: Star,
                title: "Checking current form",
                tip: "Restaurants change. Check Google reviews for current ratings before booking anywhere specific. Recency matters.",
              },
              {
                icon: Utensils,
                title: "Dietary requirements",
                tip: "Most mid-range and above restaurants in Southport handle dietary requirements well. Ring ahead to confirm for more specific requirements at the fine dining end.",
              },
              {
                icon: ChevronRight,
                title: "If everything is booked",
                tip: "Southport Market has no booking required. The Vinegar Tap is walk-in. Most cafés on Lord Street do food during the day without reservations. There is always somewhere to eat.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <item.icon className="w-5 h-5 text-[#C9A84C] mb-3" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related guides strip ── */}
        <section className="bg-[#FAF8F5] rounded-2xl p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-4">Related guides</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/guides/best-restaurants-southport" className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all">
              <h3 className="font-display font-bold text-[#1B2E4B] text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">Restaurants in Southport</h3>
              <p className="text-gray-500 text-xs">Restaurants by area, with booking tips.</p>
            </Link>
            <Link href="/guides/best-cafes-southport" className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all">
              <h3 className="font-display font-bold text-[#1B2E4B] text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">Cafés in Southport</h3>
              <p className="text-gray-500 text-xs">Independent coffee shops and tea rooms by area.</p>
            </Link>
            <Link href="/guides/birkdale-village" className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all">
              <h3 className="font-display font-bold text-[#1B2E4B] text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">Birkdale Village</h3>
              <p className="text-gray-500 text-xs">The locals&apos; neighbourhood, shops, restaurants, and why it&apos;s worth the walk.</p>
            </Link>
            <Link href="/hotels" className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all">
              <h3 className="font-display font-bold text-[#1B2E4B] text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">Hotels in Southport</h3>
              <p className="text-gray-500 text-xs">From The Bold on Lord Street to seafront B&amp;Bs.</p>
            </Link>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Eateries. FAQs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#1B2E4B] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Southport restaurant?</p>
          <h2 className="font-display text-3xl font-bold mb-4">Get Your Restaurant in Front of Visitors</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            SouthportGuide.co.uk is the independent visitor guide to Southport. List your restaurant and reach people actively planning to eat out in town.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/claim-listing"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors"
            >
              List Your Restaurant
            </Link>
            <Link
              href="/restaurants"
              className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20"
            >
              Browse All Restaurants
            </Link>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
