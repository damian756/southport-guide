import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight, ArrowRight, Utensils, Star, Clock, PoundSterling } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-eateries");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport eateries, where to eat Southport, restaurants Southport, Southport food, eating out Southport, Southport dining, best food Southport, Southport restaurants Lord Street",
  alternates: { canonical: `${BASE_URL}/guides/southport-eateries` },
  openGraph: {
    title: "Southport Eateries | Where to Eat in Southport | Local Guide",
    description:
      "The complete guide to eating out in Southport — where to go by area, occasion, and budget. Lord Street, Birkdale Village, Churchtown, and the seafront. Written by a local.",
    url: `${BASE_URL}/guides/southport-eateries`,
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
    note: "The top end of Southport dining. Proper French bistro — technically strong, good wine list, worth the bill. On Scarisbrick New Road, not Lord Street itself, but a 2-minute walk. Book a week ahead at weekends.",
    bookAhead: true,
  },
  {
    name: "V-Café",
    style: "Modern British / All-day",
    price: "£££",
    note: "Reliable and popular on Lord Street. Works equally well for a lunch or an evening out. Crowd-pleaser in the best sense — good food, good service, not trying too hard.",
    bookAhead: true,
  },
  {
    name: "Bistro Bar Med",
    style: "Mediterranean",
    price: "£££",
    note: "Mediterranean-influenced menu on Lord Street. Reliable for a relaxed evening — pasta, fish, salads done well. Good for groups. Worth booking on weekend evenings.",
    bookAhead: false,
  },
  {
    name: "The Vinegar Tap",
    style: "Fish & Chips / Casual",
    price: "££",
    note: "If you want proper fish and chips without going to the seafront, this is the answer. Sit-in and takeaway. Queue on Friday lunchtimes — that's always a good sign.",
    bookAhead: false,
  },
  {
    name: "Southport Market",
    style: "Street food hall",
    price: "£–££",
    note: "The indoor market hall off Lord Street. Multiple independent vendors — pizza, wraps, Korean, Indian, burgers. Good for groups where everyone wants something different. No booking, just turn up.",
    bookAhead: false,
  },
];

const BIRKDALE_PICKS = [
  {
    name: "The Swan",
    style: "Classic British pub / dining",
    price: "£££",
    note: "The most-recommended pub meal in Southport among locals. Good kitchen, proper portions, reliable service. Gets busy — call ahead for evening sittings at weekends.",
    bookAhead: true,
  },
  {
    name: "Volare",
    style: "Italian",
    price: "£££",
    note: "Italian on Liverpool Road, Birkdale. The pasta is good. The kind of place that becomes a regular once you've been — familiar, honest, not trying to be anything other than a solid Italian.",
    bookAhead: false,
  },
  {
    name: "The Birkdale Palms",
    style: "Café / Brunch / Light meals",
    price: "££",
    note: "Best brunch option in Birkdale. The eggs benedict is worth going out of your way for. Gets busy on Sunday mornings — expect a short wait.",
    bookAhead: false,
  },
  {
    name: "Crust & Co",
    style: "Pizza",
    price: "££",
    note: "Good independent pizza place in Birkdale. Sourdough bases, quality ingredients. Works well for a relaxed evening without the formality of a full sit-down restaurant.",
    bookAhead: false,
  },
];

const CHURCHTOWN_PICKS = [
  {
    name: "The Hesketh Arms",
    style: "Traditional British pub / food",
    price: "££–£££",
    note: "The best pub meal in Churchtown — old stone pub, solid Sunday lunch, reliable kitchen year-round. Worth the 10-minute drive from the town centre. Dog-friendly in the garden.",
    bookAhead: true,
  },
  {
    name: "The Bold Arms",
    style: "Traditional pub",
    price: "££",
    note: "A proper village local in the heart of Churchtown village. Less food-focused than the Hesketh, but good for a pint and a pie if you're passing through the village.",
    bookAhead: false,
  },
];

const SEAFRONT_PICKS = [
  {
    name: "The Funky Fish Bar",
    style: "Fish & Chips / Seafront",
    price: "££",
    note: "The best of the seafront fish and chip options. Proper batter, decent portions, works as a sit-down or takeaway. Gets very busy in summer — arrive before 12:30 or after 2:30.",
    bookAhead: false,
  },
  {
    name: "Ocean Plaza Food Court",
    style: "Chain options / Casual",
    price: "£–££",
    note: "The retail park on the seafront has the usual chain café options — useful to know they're there, especially with children, but not a destination in itself.",
    bookAhead: false,
  },
];

const BY_OCCASION = [
  {
    occasion: "Date night",
    pick: "Bistrot Véronique",
    note: "Book at least a week ahead. Dress reasonably well. Order the French onion soup.",
    link: "/restaurants",
  },
  {
    occasion: "Big family lunch",
    pick: "The Swan, Birkdale",
    note: "Space for larger groups, good food, decent prices. Call ahead to reserve.",
    link: "/restaurants",
  },
  {
    occasion: "Post-beach food",
    pick: "Funky Fish Bar or Southport Market",
    note: "Salt in the air, chips in hand — the correct choice after a beach walk. Market for groups who can't agree.",
    link: "/restaurants",
  },
  {
    occasion: "Sunday lunch",
    pick: "The Hesketh Arms, Churchtown",
    note: "Book ahead. Take the 10-minute drive to Churchtown. You won't regret it.",
    link: "/restaurants",
  },
  {
    occasion: "Quick weekday lunch",
    pick: "Southport Market or Vinegar Tap",
    note: "Both quick, both reliable, both good value. Market for variety, Vinegar Tap if you're after fish and chips.",
    link: "/restaurants",
  },
  {
    occasion: "Coffee and something good",
    pick: "Birkdale Palms or any of the Lord Street independents",
    note: "Skip the chains and go independent — the quality gap is significant in Southport.",
    link: "/cafes",
  },
  {
    occasion: "Open Championship week",
    pick: "Book everything weeks in advance",
    note: "The entire town fills up for Open week in July 2026. Every decent restaurant will be rammed. Book as soon as you know you're coming.",
    link: "/the-open-2026",
  },
];

const CUISINES = [
  { type: "French / European fine dining", where: "Bistrot Véronique — best in town by most accounts" },
  { type: "Italian", where: "Volare (Birkdale), Bistro Bar Med (Lord Street)" },
  { type: "Indian / Curry", where: "Several options on and around Lord Street — check Google ratings for current form" },
  { type: "Chinese", where: "A handful of options in the town centre — worth checking current reviews" },
  { type: "Thai", where: "Limited but available — check the restaurants directory for current listings" },
  { type: "Fish & Chips", where: "Funky Fish Bar (seafront), Vinegar Tap (town centre)" },
  { type: "Pizza", where: "Crust & Co (Birkdale), Southport Market vendors" },
  { type: "Street food / casual", where: "Southport Market — best variety in one place" },
  { type: "Pub food", where: "Hesketh Arms (Churchtown), The Swan (Birkdale)" },
  { type: "Brunch", where: "Birkdale Palms — best in town for brunch" },
];

const FAQS = [
  {
    q: "What are the best places to eat in Southport?",
    a: "Bistrot Véronique on Scarisbrick New Road is the standout for a proper occasion — French bistro, good wine list, book ahead. For everyday eating out, The Swan in Birkdale and V-Café on Lord Street are the most consistently recommended. Southport Market is the best option for groups with mixed tastes.",
  },
  {
    q: "Where should I eat on Lord Street in Southport?",
    a: "V-Café and Bistro Bar Med are both reliable options on Lord Street itself. For something slightly more special, Bistrot Véronique is around the corner on Scarisbrick New Road — 2 minutes' walk and a noticeable step up in quality.",
  },
  {
    q: "Are there good restaurants near Southport Beach?",
    a: "The seafront has casual options — fish and chips, beach cafés, and a few pub-grill type places. For a proper restaurant meal, it's worth the 15-minute walk or short drive into town to Lord Street or Birkdale Village. The quality difference is significant.",
  },
  {
    q: "Do I need to book restaurants in Southport?",
    a: "For the better places, yes — especially Friday and Saturday evenings. Bistrot Véronique books out a week or more in advance at weekends. During Open week (July 2026), the whole town's restaurant capacity gets stretched — book as early as possible.",
  },
  {
    q: "Where is the best Sunday lunch in Southport?",
    a: "The Hesketh Arms in Churchtown is the locals' choice for Sunday lunch. Worth the 10-minute drive from the town centre. Book in advance — it fills up. The Swan in Birkdale is a close second.",
  },
  {
    q: "What is the difference between Southport eateries and restaurants?",
    a: "In Southport, the two terms are used interchangeably. Eateries just means anywhere you can get food — from a sit-down restaurant to a market vendor. This guide covers the full range, from casual lunch spots to places worth booking for a special evening.",
  },
  {
    q: "Are there vegetarian or vegan options in Southport?",
    a: "Yes. Most of the mid-range and upmarket restaurants in Southport now have solid vegetarian options. Bistro Bar Med and V-Café both cater well. Southport Market has street food vendors with vegan-specific options. The independent café scene in Birkdale and on Lord Street generally handles dietary requirements without fuss.",
  },
  {
    q: "Where can I eat near Southport train station?",
    a: "The station is on Chapel Street, a short walk from Lord Street. Southport Market is the closest option with variety. V-Café, Bistro Bar Med, and most of the Lord Street restaurants are within 5–10 minutes on foot.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Guide",
  name: "Southport Eateries — Where to Eat in Southport",
  description:
    "The complete guide to eating out in Southport — where to go by area, occasion, and budget. Lord Street, Birkdale Village, Churchtown, and the seafront.",
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

export default function SouthportEateriesGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/restaurants.webp"
            alt="Eating out in Southport — restaurants on Lord Street"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E4B] via-[#1B2E4B]/55 to-[#1B2E4B]/15" />
        </div>
        <div className="relative container mx-auto px-4 pb-14 pt-28 max-w-7xl">
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
              Where to eat in Southport — by area, by occasion, and by budget. Lord Street, Birkdale Village,
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
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">Quick answers</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Best occasion meal", value: "Bistrot Véronique" },
              { label: "Best pub lunch", value: "The Swan, Birkdale" },
              { label: "Best Sunday lunch", value: "Hesketh Arms" },
              { label: "Best food market", value: "Southport Market" },
              { label: "Best fish & chips", value: "Funky Fish Bar" },
              { label: "Best brunch", value: "Birkdale Palms" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Eating Out in Southport — The Honest Version</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Southport&apos;s food scene is better than its reputation, and its reputation is better than it was a decade ago.
                The headline act is Bistrot Véronique — proper French bistro cooking, not playing at it, a genuinely good restaurant by any standard.
                The mid-range in Birkdale Village has been quietly improving: The Swan does the kind of pub lunch that makes you book a table for next week before you&apos;ve finished pudding.
              </p>
              <p>
                Lord Street is the obvious starting point for eating out. It&apos;s a long street — the choice is spread out — and quality varies.
                V-Café and Bistro Bar Med are both reliable. For fine dining, walk two minutes to Scarisbrick New Road and you&apos;re at Bistrot Véronique.
                For something quick and good, Southport Market has the most variety in one place.
              </p>
              <p>
                The seafront is weaker, honestly. Fish and chips at Funky Fish Bar are worth having, but the cluster of
                chain-adjacent options around Ocean Plaza is not why you come to Southport.
                Churchtown, ten minutes from the town centre, is often missed: the Hesketh Arms does the best Sunday lunch in town, full stop.
              </p>
              <p>
                One practical note: during Open week (July 2026, Royal Birkdale), the entire town&apos;s eating capacity gets stretched.
                Every good restaurant will be full. Book well ahead if you&apos;re coming for the golf.
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
              length — quality is patchy, but the best places are worth finding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {LORD_STREET_PICKS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{r.name}</h3>
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
              You can eat, browse, and walk the full length without getting wet. Factor that in when the weather turns — which it does.
            </p>
          </div>
        </section>

        {/* ── Birkdale Village ── */}
        <section id="birkdale" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">2 miles south of town</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Birkdale Village</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The locals&apos; preference for an evening out — less tourist-facing, more neighbourhood feel.
              Liverpool Road in Birkdale has a cluster of independent restaurants and cafés that rewards knowing about.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {BIRKDALE_PICKS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{r.name}</h3>
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
              <span className="font-bold text-[#C9A84C]">Birkdale tip:</span> Birkdale Village is also two minutes from Royal Birkdale Golf Club,
              making it the natural base for Open Championship visitors. Accommodation on Liverpool Road and nearby streets is practical for golf week.
              <Link href="/the-open-2026" className="text-[#C9A84C] hover:underline ml-1">The Open 2026 guide →</Link>
            </p>
          </div>
        </section>

        {/* ── Churchtown ── */}
        <section id="churchtown" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">10 minutes from town centre</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Churchtown</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Most visitors to Southport never make it to Churchtown. That&apos;s their loss — it&apos;s the oldest part of town,
              and it has the best pub lunch in Southport.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {CHURCHTOWN_PICKS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{r.name}</h3>
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
              Honest answer: the seafront is the weakest area for eating in Southport. There are exceptions — fish and chips are always appropriate here — but for a proper meal, head inland.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SEAFRONT_PICKS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{r.name}</h3>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Where to Eat — By Occasion</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The right place depends on what kind of day you&apos;re having. Here&apos;s the shortcut.
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
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Good food, sensible prices</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Budget Eats in Southport</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Southport is not an expensive town to eat in — most mid-range places are very reasonable.
              Here&apos;s the best of the honest, affordable end.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Southport Market",
                note: "Multiple vendors under one roof. Pizza, curry, burgers, Korean, wraps. Nothing costs much. No booking required — turn up and choose.",
                price: "£–££",
              },
              {
                name: "The Vinegar Tap",
                note: "Proper fish and chips without going to the seafront. The queue at lunchtime tells you everything you need to know.",
                price: "££",
              },
              {
                name: "Lord Street independents",
                note: "Lunch specials on Lord Street and the surrounding streets. Café lunches, sandwiches, soups — most under £10. Worth exploring on foot.",
                price: "£–££",
              },
              {
                name: "Funky Fish Bar",
                note: "Seafront fish and chips — the correct way to spend £12 on a sunny afternoon by the beach.",
                price: "££",
              },
              {
                name: "Birkdale Palms",
                note: "Brunch is the best-value meal here. Good eggs, good coffee, good price for the quality.",
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
                tip: "Friday and Saturday evenings at the better places — book at least a few days ahead. Sunday lunch at Hesketh Arms or The Swan — book by Thursday. Open Championship week — book weeks ahead.",
              },
              {
                icon: MapPin,
                title: "Getting between areas",
                tip: "Lord Street to Birkdale is about 15 minutes on foot, or 5 minutes by car. Churchtown is 10 minutes by car from Lord Street. Parking is generally easy in Birkdale and Churchtown.",
              },
              {
                icon: PoundSterling,
                title: "Paying",
                tip: "Most places accept cards. A few smaller cafés and market vendors are cash-preferred — worth having a tenner on you. Service charge is not always included — check the bill.",
              },
              {
                icon: Star,
                title: "Checking current form",
                tip: "This guide covers the reliable places, but restaurants change. Check Google reviews for current ratings before booking anywhere specific. Recency matters.",
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
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/guides/best-restaurants-southport" className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all">
              <h3 className="font-display font-bold text-[#1B2E4B] text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">Best Restaurants in Southport</h3>
              <p className="text-gray-500 text-xs">Terry&apos;s ranked guide to the top tables in town.</p>
            </Link>
            <Link href="/guides/best-cafes-southport" className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all">
              <h3 className="font-display font-bold text-[#1B2E4B] text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">Best Cafés in Southport</h3>
              <p className="text-gray-500 text-xs">Independent coffee shops and tea rooms worth knowing about.</p>
            </Link>
            <Link href="/guides/birkdale-village" className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all">
              <h3 className="font-display font-bold text-[#1B2E4B] text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">Birkdale Village</h3>
              <p className="text-gray-500 text-xs">The locals&apos; neighbourhood — shops, restaurants, and why it&apos;s worth the walk.</p>
            </Link>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Eateries — FAQs</h2>
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
