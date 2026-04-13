import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Car,
  CalendarDays,
  Train,
  Clock,
  Beer,
  Utensils,
  BedDouble,
  ChevronRight,
  Star,
  ArrowRight,
  AlertCircle,
  Stamp,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-beer-week-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport Beer Week 2026, Southport Beer Week, southport ale trail, southport pubs may 2026, things to do southport bank holiday may",
  alternates: { canonical: `${BASE_URL}/guides/southport-beer-week-2026` },
  openGraph: {
    title: "Southport Beer Week 2026 | 20–25 May · Ale Trail & Complete Visitor Guide",
    description:
      "18 pubs, 90+ beers, free ale trail across Southport town centre. 20–25 May 2026. Getting here from Liverpool, Manchester and Wigan, parking, hotels, and the Big Top Festival on the same weekend.",
    url: `${BASE_URL}/guides/southport-beer-week-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/beer-week.webp` }],
  },
};

// ── Venue data ───────────────────────────────────────────────────────────────

const VENUES = [
  {
    name: "Tap and Bottles",
    area: "Lord Street / Town Centre",
    note: "Independent craft beer bar with rotating taps and an extensive bottled range. Usually the strongest lineup on the trail.",
    badge: "Craft Specialist",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    name: "The Guesthouse",
    area: "Town Centre",
    note: "One of Southport's busiest pubs. Large bar, good range, lively atmosphere all week. Expect queues Thursday to Saturday evening.",
    badge: "High Volume",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    name: "The Masons Arms",
    area: "Town Centre",
    note: "Traditional pub with a serious approach to real ale. The quiet option if you want a proper pint without the noise.",
    badge: "Real Ale",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    name: "The Windmill",
    area: "Birkdale",
    note: "Worth the 10-minute walk south. Quieter than the town centre venues, good beer garden, dog-friendly.",
    badge: "Dog Friendly",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    name: "The Lakeside Inn",
    area: "Marine Lake / Promenade",
    note: "Views across Marine Lake. Good spot mid-afternoon before the evening rush starts on the main trail.",
    badge: "Best Views",
    badgeColor: "bg-sky-100 text-sky-800",
  },
  {
    name: "Sinclair's",
    area: "Town Centre",
    note: "Popular bar in the Northern Quarter. Strong craft selection and a good food menu if you need something to eat between pints.",
    badge: "Food Available",
    badgeColor: "bg-orange-100 text-orange-800",
  },
  {
    name: "Punch Tarmey's",
    area: "Town Centre",
    note: "Long-standing Southport bar. Multiple floors, plenty of space. Gets packed on Friday and Saturday evenings.",
    badge: "Large Venue",
    badgeColor: "bg-red-100 text-red-800",
  },
  {
    name: "The Bugle Tap",
    area: "Town Centre",
    note: "One of the newer additions: a specialist beer bodega format with a tight, well-curated range. Worth seeking out.",
    badge: "New for 2026",
    badgeColor: "bg-teal-100 text-teal-800",
  },
];

// ── Travel data ──────────────────────────────────────────────────────────────

const TRAVEL_ROUTES = [
  {
    from: "Liverpool",
    detail: "Liverpool Central",
    direction: "Merseyrail Northern Line direct to Southport",
    journey: "~45 min",
    frequency: "Every 15–30 min",
    lastTrain: "Around 23:30 from Southport",
    tip: "Cheapest option. Direct, no changes. Day return under £10 with a railcard. Buy on the Merseyrail app.",
    icon: "🚂",
  },
  {
    from: "Manchester",
    detail: "Manchester Victoria",
    direction: "Northern Rail to Wigan Wallgate, change to Merseyrail",
    journey: "~1 hr 30 min",
    frequency: "Hourly",
    lastTrain: "Check return from Southport. Allow time for the Wigan connection.",
    tip: "Check the timetable before you go. Missing the Wigan connection adds 30 minutes to your journey home.",
    icon: "🚆",
  },
  {
    from: "Wigan",
    detail: "Wigan Wallgate",
    direction: "Merseyrail direct to Southport",
    journey: "~45 min",
    frequency: "Every 30 min",
    lastTrain: "Around 23:15 from Southport",
    tip: "Great value. Direct service. Use Wigan Wallgate, not Wigan North Western (they are different stations).",
    icon: "🚂",
  },
  {
    from: "Preston",
    detail: "Preston Station",
    direction: "Change at Wigan Wallgate for Merseyrail",
    journey: "~1 hr",
    frequency: "Roughly hourly",
    lastTrain: "Check return timetable. Plan ahead.",
    tip: "Direct trains from Preston to Wigan Wallgate, then Merseyrail to Southport. About an hour total.",
    icon: "🚆",
  },
  {
    from: "Blackpool",
    detail: "Blackpool North",
    direction: "Northern Rail to Preston, then change at Wigan Wallgate",
    journey: "~1 hr 45 min",
    frequency: "Hourly",
    lastTrain: "Last Merseyrail back to Wigan by 23:00. Check ahead.",
    tip: "Two changes required. Driving to the edge of Southport and getting a cab into town may be more practical.",
    icon: "🚆",
  },
];

const PARKING = [
  {
    name: "Marine Drive Car Park",
    postcode: "PR8 1RX",
    walk: "12 min to town centre",
    cost: "From £2 / 2 hrs · £7 all day",
    notes: "Large, open-air. Fills by 10am on summer Saturdays.",
    tip: "Best option if driving in the morning. Walk along the promenade to start your trail.",
  },
  {
    name: "Tulketh Street Car Park",
    postcode: "PR8 1EF",
    walk: "3 min to Lord Street",
    cost: "From £1.50 / 1 hr · £6 all day",
    notes: "Multi-storey. Right in the town centre. Tight spaces on upper floors.",
    tip: "Closest to most of the trail venues. Gets full from early afternoon on bank holidays.",
  },
  {
    name: "Morrisons / London Street",
    postcode: "PR8 1JL",
    walk: "5 min to Lord Street",
    cost: "Free 2 hrs with Morrisons purchase",
    notes: "Not a public car park, but used as overflow on busy days.",
    tip: "Pick something up in Morrisons to validate 2-hour free parking while you are in town.",
  },
  {
    name: "Virginia Street Car Park",
    postcode: "PR8 1SH",
    walk: "6 min to town centre",
    cost: "From £1.50 / 1 hr",
    notes: "Small surface car park. Gets busy from noon on event days.",
    tip: "Good fallback if the others are full. Quieter side of town centre.",
  },
  {
    name: "Floral Hall Car Park",
    postcode: "PR8 1QU",
    walk: "8 min to town centre",
    cost: "From £2 / day",
    notes: "Near the promenade. Good if you want to walk along the seafront.",
    tip: "Start at Lakeside Inn, then work your way into the town centre as the evening builds.",
  },
];

// ── FAQs ────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "When is Southport Beer Week 2026?",
    a: "Southport Beer Week 2026 runs from Wednesday 20 May to Monday 25 May 2026. The weekend falls on the Spring Bank Holiday, which is why it works well for visitors travelling from outside Southport. You get the Sunday and Monday without using annual leave.",
  },
  {
    q: "Is Southport Beer Week free?",
    a: "Yes. The ale trail itself is free to join. You pick up a trail booklet from any participating venue, get your stamp card, and the only thing you spend money on is the beer. Most pints are at standard pub prices. There is no event entry fee or wristband to buy.",
  },
  {
    q: "How many pubs are involved in Southport Beer Week 2026?",
    a: "18 pubs and bars are signed up for 2026, with over 90 different beers across the trail. The range spans craft lager, real ale, stouts, and IPAs. The full venue list and trail booklet are available from Southport BID and participating pubs at the start of the week.",
  },
  {
    q: "How do I get the Beer Week trail booklet?",
    a: "Trail booklets are available free from any participating venue from the opening night on 20 May. Pick one up at your first stop. The booklet lists all venues, the beers available at each, and includes the stamp card for tracking your trail progress.",
  },
  {
    q: "What is the best day to visit Southport for Beer Week?",
    a: "Wednesday evening and Thursday are quieter. You can take your time, talk to bar staff about what is on, and get round more venues without queuing. Friday and Saturday evenings are the busiest and most atmospheric. The bank holiday Monday is a good option for a more relaxed final day.",
  },
  {
    q: "How do I get to Southport from Liverpool for Beer Week?",
    a: "Merseyrail Northern Line from Liverpool Central, direct to Southport. About 45 minutes. Trains run every 15 to 30 minutes and the last service back from Southport is around 23:30. Under £10 return with a railcard. Buy tickets on the Merseyrail app.",
  },
  {
    q: "How do I get to Southport from Manchester for Beer Week?",
    a: "Northern Rail from Manchester Victoria to Wigan Wallgate, then Merseyrail direct to Southport. About 1 hour 30 minutes total, hourly service. Check the return timetable before you go. Missing the Wigan connection adds 30 minutes to your journey.",
  },
  {
    q: "Is there parking in Southport town centre for Beer Week?",
    a: "Yes. Tulketh Street (PR8 1EF) is closest to the town centre venues, about 3 minutes walk to Lord Street. Marine Drive (PR8 1RX) is large but fills on bank holiday weekends. If you are driving in for an evening session, Tulketh Street is the most practical option. Drink driving laws apply. If you are doing the full trail, get the train.",
  },
  {
    q: "What else is happening in Southport during Beer Week 2026?",
    a: "The Big Top Festival runs in Victoria Park over the bank holiday weekend with live music and entertainment. The Southport Food and Drink Festival also coincides with the bank holiday period. It is a genuinely busy weekend to be in the town.",
  },
  {
    q: "Where should I stay for Southport Beer Week?",
    a: "Anywhere in the town centre works. Most of the trail venues are on or near Lord Street. The Bold Hotel on Lord Street is closest to the action. For value, there are several B&Bs and smaller hotels within 10 minutes walk of the main venues. Book early. The bank holiday weekend fills quickly.",
  },
];

// ── Schema LD ────────────────────────────────────────────────────────────────

const EVENT_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Southport Beer Week 2026",
  startDate: "2026-05-20",
  endDate: "2026-05-25",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  description:
    "Six-day ale trail across 18 Southport pubs and bars. Over 90 beers. Free to join. Pick up a trail booklet from any participating venue. Running 20 to 25 May 2026 over the Spring Bank Holiday weekend.",
  url: `${BASE_URL}/guides/southport-beer-week-2026`,
  image: `${BASE_URL}/images/beer-week.webp`,
  location: {
    "@type": "Place",
    name: "Southport Town Centre",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Southport",
      addressRegion: "Merseyside",
      postalCode: "PR8 1DA",
      addressCountry: "GB",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Southport BID",
    url: "https://southportbid.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    description: "Free to join. Trail booklet available from any participating venue.",
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

// ── Shared heading style ─────────────────────────────────────────────────────

const H2 = "text-3xl font-bold text-[#1B2E4B] border-l-4 border-amber-500 pl-4 mb-6";

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SouthportBeerWeekGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1C0D00] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/beer-week.webp"
            alt="Southport Beer Week 2026 ale trail across 18 pubs and bars"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover hidden md:block"
            style={{ objectPosition: "center 40%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D00] via-[#1C0D00]/60 to-[#1C0D00]/20" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-amber-500 text-[#1C0D00] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                20–25 May 2026
              </span>
              <span className="bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full">
                Bank Holiday Weekend
              </span>
              <span className="text-white/50 text-sm">Southport Town Centre</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-amber-400">Beer Week 2026</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              Six days. 18 pubs and bars. 90+ beers. Free ale trail across Southport town centre on the Spring Bank
              Holiday weekend. Here is everything you need to plan the trip, wherever you are coming from.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#ale-trail"
                className="bg-amber-500 hover:bg-amber-400 text-[#1C0D00] font-bold px-6 py-3 rounded-lg transition-colors"
              >
                The Ale Trail
              </a>
              <a
                href="#getting-here"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                Getting Here
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts Bar ── */}
      <div className="bg-[#1C0D00] border-t border-amber-900/40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-amber-900/30">
            {[
              { icon: CalendarDays, label: "Dates", value: "20–25 May 2026" },
              { icon: Beer, label: "Venues", value: "18 pubs & bars" },
              { icon: Star, label: "Beers", value: "90+ on the trail" },
              { icon: Stamp, label: "Entry", value: "Free to join" },
              { icon: MapPin, label: "Location", value: "Southport Town Centre" },
              { icon: CalendarDays, label: "Weekend", value: "Bank Holiday" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center justify-center py-5 px-3 text-center">
                <Icon className="w-5 h-5 text-amber-400 mb-1.5" />
                <p className="text-white/50 text-xs uppercase tracking-wide">{label}</p>
                <p className="text-white font-semibold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 max-w-7xl py-16 space-y-0">

        {/* ── What is Beer Week — two-column intro ── */}
        <section className="py-14">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <h2 className={H2}>What is Southport Beer Week?</h2>
              <div className="space-y-5 text-gray-700 leading-relaxed text-[1.05rem]">
                <p>
                  Southport Beer Week is a six-day real ale and craft beer trail organised by{" "}
                  <a href="https://southportbid.com" target="_blank" rel="nofollow noopener noreferrer" className="text-amber-700 hover:text-amber-800 font-medium underline">
                    Southport BID
                  </a>{" "}
                  across the town centre. Eighteen pubs and bars sign up, each putting on a curated selection of beers
                  you would not normally find on their standard menu: breweries from across the North West and beyond,
                  alongside some of the better-known national craft producers.{" "}
                  <a href="https://southportbid.com/beer-week/" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-800 font-medium underline">
                    Full details at Southport BID.
                  </a>
                </p>
                <p>
                  The mechanic is simple. Pick up a trail booklet from any participating venue, collect a stamp at each
                  pub you visit, and work your way around the trail at whatever pace suits you. There is no entry fee,
                  no wristband, no pre-booking required. You just turn up and order a pint.
                </p>
                <p>
                  The timing is deliberate. The Spring Bank Holiday weekend means you can make a proper trip of it.
                  Arrive Wednesday or Thursday when it is quieter, hit the busiest evenings on Friday and Saturday,
                  and still have the Monday to recover. Southport town centre is compact enough to walk between
                  every venue on the trail.
                </p>
                <p>
                  This guide is for people travelling from outside Southport: Liverpool, Manchester, Wigan, Preston,
                  Blackpool. It covers how to get here, where to park, where to stay, and what else is on that weekend.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#1B2E4B] rounded-2xl p-6 text-white sticky top-6">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Trail at a glance</p>
                <div className="space-y-3">
                  {[
                    { label: "Dates", value: "20–25 May 2026" },
                    { label: "Duration", value: "6 days" },
                    { label: "Venues", value: "18 pubs and bars" },
                    { label: "Beers on trail", value: "90+" },
                    { label: "Entry", value: "Free" },
                    { label: "Trail booklet", value: "From any venue" },
                    { label: "Organiser", value: "Southport BID" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-white/60 text-sm">{label}</span>
                      <span className="text-white font-semibold text-sm text-right">{value}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://southportbid.com/beer-week/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#1C0D00] font-bold py-2.5 rounded-lg transition-colors text-sm w-full"
                >
                  Official Beer Week info <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ale Trail ── */}
        <section id="ale-trail" className="py-14 border-t border-slate-100">
          <h2 className={H2}>The Ale Trail: How It Works</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            18 venues. One trail booklet. Collect your stamps, try the beers, pace yourself.
          </p>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              {
                step: "1",
                title: "Pick up your booklet",
                desc: "Available free from any participating venue from 20 May. Ask at the bar on your first stop.",
              },
              {
                step: "2",
                title: "Collect your stamps",
                desc: "Each venue stamps your card when you buy a Beer Week pint. Work through the trail at your own pace across the week.",
              },
              {
                step: "3",
                title: "Explore the beers",
                desc: "Each pub has a curated Beer Week selection: ales, craft lagers, stouts, IPAs. Beers you will not find on their standard menu.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-black text-base mb-4">
                  {step}
                </div>
                <h3 className="font-bold text-[#1B2E4B] text-base mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Venues */}
          <h3 className="text-xl font-bold text-[#1B2E4B] mb-5">Confirmed Venues</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {VENUES.map((venue) => (
              <div
                key={venue.name}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="font-bold text-[#1B2E4B] text-base leading-tight">{venue.name}</h4>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${venue.badgeColor}`}>
                    {venue.badge}
                  </span>
                </div>
                <p className="text-amber-700 text-xs font-medium flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" /> {venue.area}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{venue.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">10 more venues to be announced</p>
                <p className="text-amber-800 text-sm">
                  The full list of 18 venues will be published by Southport BID ahead of the event. The 8 above are
                  confirmed for 2026. Check{" "}
                  <a href="https://southportbid.com/beer-week/" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                    southportbid.com/beer-week
                  </a>{" "}
                  for the complete venue list and trail booklet when available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Terry callout ── */}
        <section className="py-6">
          <div className="bg-gradient-to-br from-[#1B2E4B] to-[#243d63] rounded-2xl p-8 text-white">
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-[#1B2E4B] font-black text-lg flex-shrink-0">
                T
              </div>
              <div className="max-w-3xl">
                <p className="font-bold text-amber-400 mb-3 text-sm uppercase tracking-wide">Terry says</p>
                <p className="text-white/90 text-lg leading-relaxed mb-3">
                  &ldquo;If you are coming from Liverpool, just get the Merseyrail. It is 45 minutes and you do not
                  have to think about driving home. From Manchester or Wigan, same logic applies. The train into
                  Southport station drops you 10 minutes walk from most of the trail.
                </p>
                <p className="text-white/90 text-lg leading-relaxed">
                  Wednesday and Thursday are the nights to go if you actually want to talk about the beer. By Friday
                  evening it is brilliant but noisy. The Big Top Festival running the same weekend means the whole
                  town is buzzing. It is a genuinely good combination.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Getting Here ── */}
        <section id="getting-here" className="py-14 border-t border-slate-100">
          <h2 className={H2}>Getting to Southport for Beer Week</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            Southport has direct Merseyrail services from Liverpool and Wigan. If you are planning the ale trail,
            the train is the obvious choice and usually the cheapest.
          </p>

          <div className="space-y-4 mb-10">
            {TRAVEL_ROUTES.map((route) => (
              <div key={route.from} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center gap-3">
                  <span className="text-2xl">{route.icon}</span>
                  <div className="flex-1">
                    <span className="font-bold text-[#1B2E4B] text-base">{route.from}</span>
                    <span className="text-slate-500 text-sm ml-2">({route.detail})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700 text-sm">{route.journey}</span>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-1">Route</p>
                      <p className="text-slate-700">{route.direction}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-1">Frequency</p>
                      <p className="text-slate-700">{route.frequency}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-1">Last train back</p>
                      <p className="text-slate-700">{route.lastTrain}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg px-4 py-3 flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-800 text-sm">{route.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-[#1B2E4B] mb-3 flex items-center gap-2 text-base">
              <Car className="w-5 h-5 text-slate-500" /> Driving to Southport
            </h3>
            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <p>
                Southport is well connected by road: M58 from the east, A565 from Liverpool. Junction 3 of the M58
                puts you 10 minutes from the town centre. If you are driving in for a daytime session and heading
                home in the afternoon, parking is straightforward.
              </p>
              <p>
                If you are doing the evening trail, drive in and get a taxi home, or stay over. Drink driving
                laws apply. On the bank holiday weekend, roads into Southport can be slow from midday on Saturday.
                Arrive before 11am or after 7pm to avoid the worst of it on the A565 from Liverpool.
              </p>
            </div>
          </div>
        </section>

        {/* ── Parking ── */}
        <section id="parking" className="py-14 border-t border-slate-100">
          <h2 className={H2}>Parking in Southport</h2>
          <p className="text-gray-600 mb-6 text-lg max-w-2xl">
            Five main options for Beer Week. Tulketh Street is closest to the trail. On bank holiday weekends,
            arrive early or expect to walk further than planned.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Car Park</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Postcode</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Walk</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PARKING.map((p) => (
                  <tr key={p.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#1B2E4B]">{p.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5 md:hidden">{p.walk}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 whitespace-nowrap">{p.postcode}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{p.walk}</td>
                    <td className="px-4 py-3 text-slate-600">{p.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {PARKING.map((p) => (
              <div key={p.name + "-tip"} className="flex gap-3 text-sm bg-white border border-slate-100 rounded-lg px-4 py-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 mt-1.5" />
                <p className="text-gray-600">
                  <span className="font-semibold text-slate-700">{p.name}:</span> {p.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Where to Stay ── */}
        <section id="where-to-stay" className="py-14 border-t border-slate-100">
          <h2 className={H2}>Where to Stay</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            Staying over makes the most sense for Beer Week. The town centre has a good range of hotels and B&Bs
            within walking distance of every venue on the trail.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {[
              {
                name: "The Bold Hotel",
                area: "Lord Street",
                desc: "Right on Lord Street, 5 minutes walk from most of the trail. Boutique hotel, good rooms. Book well ahead for bank holiday weekends.",
                tier: "Boutique",
                tierColor: "bg-blue-100 text-blue-700",
              },
              {
                name: "Sandgrounder Hotel",
                area: "Promenade",
                desc: "Modern hotel on the promenade, 10 to 12 minutes walk from the town centre trail. Good value. Sea-view rooms worth the upgrade.",
                tier: "Mid-range",
                tierColor: "bg-blue-100 text-blue-700",
              },
              {
                name: "Holiday Inn Southport",
                area: "Town Centre",
                desc: "Reliable, consistently good. Close to Lord Street. Better for groups who want a straightforward hotel without surprises.",
                tier: "Chain",
                tierColor: "bg-slate-100 text-slate-700",
              },
              {
                name: "B&Bs and Guest Houses",
                area: "Various",
                desc: "Southport has a good number of B&Bs along the Promenade and near the train station. Better value than hotels, usually more flexible on early check-in.",
                tier: "Budget / Value",
                tierColor: "bg-green-100 text-green-700",
              },
            ].map((hotel) => (
              <div key={hotel.name} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-[#1B2E4B] leading-tight">{hotel.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${hotel.tierColor}`}>
                    {hotel.tier}
                  </span>
                </div>
                <p className="text-amber-700 text-xs font-medium flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" /> {hotel.area}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{hotel.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3 mb-5">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-900 text-sm">
              <span className="font-semibold">Book early.</span> The bank holiday weekend fills quickly, especially
              with Big Top Festival also running. Do not assume there will be availability in May if you are looking
              in April.
            </p>
          </div>

          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 text-[#1B2E4B] font-semibold hover:text-amber-700 transition-colors"
          >
            Browse all Southport hotels and accommodation <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* ── Where to Eat ── */}
        <section id="where-to-eat" className="py-14 border-t border-slate-100">
          <h2 className={H2}>Where to Eat</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            Trail pubs mostly do bar snacks. For a proper meal before or between sessions, these are the closest
            options to the main venues.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {[
              {
                name: "Bistrot Verite",
                area: "Waterloo Road, Birkdale",
                desc: "Proper French bistro, 15 minutes from town centre. The best food in Southport by most measures. Book ahead for Beer Week weekend.",
                badge: "Book ahead",
                badgeColor: "bg-red-100 text-red-700",
              },
              {
                name: "Hickory's Smokehouse",
                area: "Town Centre",
                desc: "American BBQ and cocktails. Good for a group and handles large tables well. Filling enough to set you up for the trail.",
                badge: "Good for groups",
                badgeColor: "bg-green-100 text-green-700",
              },
              {
                name: "Southport Market",
                area: "Market Street",
                desc: "Street food market in the town centre with multiple vendors and no booking required. Good for a quick bite between venues.",
                badge: "No booking",
                badgeColor: "bg-blue-100 text-blue-700",
                href: "/guides/southport-market",
              },
              {
                name: "The Bold Hotel Restaurant",
                area: "Lord Street",
                desc: "If you are staying at The Bold, eat there at least once. Good cooking, Lord Street setting. Can be slow on busy evenings.",
                badge: "Hotel dining",
                badgeColor: "bg-purple-100 text-purple-700",
              },
            ].map((r) => (
              <div key={r.name} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-[#1B2E4B] leading-tight">{r.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${r.badgeColor}`}>
                    {r.badge}
                  </span>
                </div>
                <p className="text-amber-700 text-xs font-medium flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" /> {r.area}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                {r.href && (
                  <Link href={r.href} className="text-[#C9A84C] text-xs font-bold hover:underline mt-3 inline-flex items-center gap-1">
                    Full Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-[#1B2E4B] font-semibold hover:text-amber-700 transition-colors"
          >
            Full Southport restaurant guide <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* ── What Else is On ── */}
        <section className="py-14 border-t border-slate-100">
          <h2 className={H2}>What Else is On That Weekend</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            Beer Week does not happen in isolation. The bank holiday weekend in Southport in May is genuinely busy.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-gradient-to-b from-purple-50 to-white border border-purple-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                🎪
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[#1B2E4B]">Big Top Festival</h3>
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">Same weekend</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Live music festival in a luxury heated marquee at Victoria Park, running over the bank holiday weekend.
                Part of Southport&apos;s 2026 cultural programme. Victoria Park is 15 minutes walk from the town centre trail.
                Check{" "}
                <a href="https://southport2026.com" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">
                  southport2026.com
                </a>{" "}
                for the full lineup.
              </p>
            </div>

            <div className="bg-gradient-to-b from-orange-50 to-white border border-orange-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                🍽️
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[#1B2E4B]">Food &amp; Drink Festival</h3>
                <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">Same weekend</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Southport&apos;s food and drink festival overlaps with Beer Week across the bank holiday. Local producers,
                street food vendors, and independent traders across the town centre. Good for lunch between trail venues.
              </p>
            </div>

            <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                🏖️
              </div>
              <h3 className="font-bold text-[#1B2E4B] mb-2">Southport Beach</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                One of the widest beaches in England. Late May can be genuinely good weather. The beach and Marine
                Lake are worth a few hours in the morning before an afternoon and evening on the trail.
              </p>
            </div>
          </div>
        </section>

        {/* ── Practical Notes ── */}
        <section className="py-14 border-t border-slate-100">
          <h2 className={H2}>Practical Notes</h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[
              {
                title: "Pacing yourself",
                icon: "🍺",
                points: [
                  "18 venues over 6 days is achievable without destroying yourself",
                  "3 to 4 venues per evening is a sensible target",
                  "The trail is designed to be done across multiple days, not in one go",
                  "Half pints are your friend. Most venues are happy to serve them",
                ],
              },
              {
                title: "Getting the booklet",
                icon: "📗",
                points: [
                  "Free from any participating venue from 20 May",
                  "Southport BID will publish the full venue list before the event",
                  "Keep it safe. Stamps are the record of your trail progress",
                  "Ask bar staff which Beer Week beers they recommend. Most know the range well",
                ],
              },
              {
                title: "Weather",
                icon: "🌤️",
                points: [
                  "Late May in Southport can be warm and sunny, or grey and cool",
                  "A light jacket is sensible for evening venue-hopping even in good weather",
                  "The trail is indoor so weather only affects the walk between pubs",
                  "The beach is worth it on a sunny day. Go in the morning before the trail",
                ],
              },
              {
                title: "Last trains",
                icon: "🚂",
                points: [
                  "Liverpool Central: last Merseyrail around 23:30 from Southport",
                  "Wigan Wallgate: last service around 23:15. Check before you go",
                  "Southport station is 10 minutes walk from the town centre",
                  "Taxis to the station are quick if you are cutting it close",
                ],
              },
              {
                title: "Dogs on the trail",
                icon: "🐾",
                points: [
                  "The Windmill and The Lakeside Inn both welcome dogs",
                  "Check individual venues before turning up on a busy evening",
                  "Most pubs will have water available if you ask at the bar",
                  "Southport Beach is dog-friendly year-round",
                ],
              },
              {
                title: "Getting around",
                icon: "🚶",
                points: [
                  "The town centre trail is entirely walkable. 10 to 15 minutes between most venues",
                  "Birkdale venues are a 20-minute walk south or a short cab",
                  "Taxis are readily available but busy on Friday and Saturday nights",
                  "Book a cab in advance on bank holiday Saturday evening",
                ],
              },
            ].map(({ title, icon, points }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-[#1B2E4B] mb-4 flex items-center gap-2">
                  <span className="text-xl">{icon}</span> {title}
                </h3>
                <ul className="space-y-2.5">
                  {points.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 border-t border-slate-100">
          <h2 className={H2}>Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-[#1B2E4B] text-sm leading-snug">{q}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 pt-3 border-t border-slate-100">
                  <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-6 pb-14">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-[#1C0D00] mb-3">Is your pub or bar part of Beer Week?</h2>
            <p className="text-[#1C0D00]/70 mb-7 max-w-lg mx-auto">
              If you run a venue in Southport and want to get listed on this guide or featured on SouthportGuide.co.uk,
              get in touch.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/claim-listing"
                className="bg-[#1C0D00] text-amber-400 font-bold px-6 py-3 rounded-lg hover:bg-[#2d1600] transition-colors"
              >
                List your venue
              </Link>
              <Link
                href="/bars-nightlife"
                className="bg-white/25 text-[#1C0D00] font-semibold px-6 py-3 rounded-lg hover:bg-white/40 transition-colors"
              >
                Browse Southport pubs &amp; bars
              </Link>
            </div>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
