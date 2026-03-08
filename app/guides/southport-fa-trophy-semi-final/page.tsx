import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Car,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Train,
  Beer,
  Ticket,
  Trophy,
  Wind,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-fa-trophy-semi-final");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport FC FA Trophy semi-final, Haig Avenue parking, pubs near Haig Avenue, visiting Southport FC, Southend United away guide, FA Trophy 2026",
  alternates: { canonical: `${BASE_URL}/guides/southport-fa-trophy-semi-final` },
  openGraph: {
    title: "Southport FC v Southend — FA Trophy Semi-Final Matchday Guide",
    description: "Parking, pubs, getting to Haig Avenue, and what Southport has to offer. The complete visitor guide for 28 March 2026.",
    url: `${BASE_URL}/guides/southport-fa-trophy-semi-final`,
    images: [{ url: `${BASE_URL}/images/southport-fc-haig-avenue.webp` }],
  },
};

const FAQS = [
  {
    q: "What is the postcode for Haig Avenue?",
    a: "The postcode for Haig Avenue Stadium is PR8 6JZ. Put this in your satnav and it will take you directly to the ground. Note there is no car park at the stadium — you'll be looking for street parking on Haig Avenue and surrounding roads.",
  },
  {
    q: "Which train station is nearest to Haig Avenue?",
    a: "Meols Cop is the closest station — about a 10-minute walk to the ground. Come out of the station, turn left onto Norwood Road, walk down to the Thatch and Thistle pub at the bottom, and Haig Avenue is directly opposite. Southport station (town centre) is also an option but it's a 20-minute walk or a short bus ride on the number 44 from Eastbank Street.",
  },
  {
    q: "Is there parking at Haig Avenue?",
    a: "There is no dedicated car park at Haig Avenue. Supporters park on Haig Avenue itself and the surrounding residential streets. For a game of this size, those streets will fill up well before kick-off. Arriving early is essential. Alternatively, park in the town centre and take the number 44 bus or walk the mile and a half to the ground.",
  },
  {
    q: "Which pubs near Haig Avenue allow away fans?",
    a: "The Thatch and Thistle at the junction of Norwood Road and Haig Avenue is the most convenient option near the ground — it has Sky Sports and food. The Richmond on Scarisbrick New Road is a short walk away and tends to be slightly more relaxed. Both are fine for away fans. The Grandstand Bar at the ground itself serves real ale and is worth checking, but gets crowded and may restrict entry close to kick-off.",
  },
  {
    q: "What is the away end like at Haig Avenue?",
    a: "Away supporters are in the Blowick End — an open terrace at the south end of the ground. It is uncovered. The Irish Sea wind is a real factor at Haig Avenue, particularly on the exposed terrace. Dress accordingly: waterproof, layers, and do not underestimate how cold a March afternoon on an open terrace can be. The views of the pitch are fine.",
  },
  {
    q: "How much are tickets for the FA Trophy semi-final?",
    a: "Check the official Southport FC website at southportfc.net for confirmed ticket prices and availability for the semi-final. General admission standing at Haig Avenue is typically around £13–£15 for adults. This is a big occasion — confirm ticket availability before travelling.",
  },
  {
    q: "How do I get from Liverpool to Haig Avenue?",
    a: "From Liverpool, the simplest route is Liverpool Central to Southport on the Merseyrail Northern line (approximately 50 minutes, runs regularly). From Southport station walk to Eastbank Street and take the number 44 bus to Haig Avenue, or walk the 20 minutes. Alternatively, come off at Meols Cop station if that service runs on matchday — confirm timetables with Merseyrail.",
  },
  {
    q: "What if Southport win and go to Wembley?",
    a: "If Southport beat Southend United and reach the FA Trophy Final at Wembley, we will publish a full Wembley guide immediately — travel from Southport, where to stay in London, and everything you need to know. It would be the first time Southport have reached a Trophy Final since 1998.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "Southport FC v Southend United — FA Trophy Semi-Final",
  description: "FA Trophy 2025/26 semi-final at Haig Avenue, Southport. First FA Trophy semi-final for the club in 28 years.",
  url: `${BASE_URL}/guides/southport-fa-trophy-semi-final`,
  startDate: "2026-03-28",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Haig Avenue Stadium",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Haig Avenue",
      addressLocality: "Southport",
      postalCode: "PR8 6JZ",
      addressCountry: "GB",
    },
  },
  organizer: {
    "@type": "SportsOrganization",
    name: "Southport FC",
    url: "https://www.southportfc.net",
  },
  competitor: [
    { "@type": "SportsTeam", name: "Southport FC" },
    { "@type": "SportsTeam", name: "Southend United" },
  ],
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

export default function FATrophySemiFinalGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1B3D] via-[#1B2E4B] to-[#0A1B3D]" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                FA Trophy Semi-Final
              </span>
              <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Saturday 28 March 2026
              </span>
              <span className="text-white/50 text-sm font-medium">Haig Avenue · Southport</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              Southport FC
              <span className="block text-[#C9A84C]">v Southend United</span>
              <span className="block text-2xl md:text-3xl text-white/70 font-semibold mt-2">FA Trophy Semi-Final — Haig Avenue</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              The biggest home game at Haig Avenue in 28 years. Away fans, day trippers, and first-time visitors
              to Southport — here is everything you need before you travel.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.southportfc.net"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Tickets — southportfc.net →
              </a>
              <a href="#getting-there" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Getting There
              </a>
              <a href="#pubs" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Pubs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts bar ── */}
      <div className="bg-[#0A1B3D] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "28 March", label: "Date", sub: "Saturday, 2026" },
              { icon: MapPin, value: "PR8 6JZ", label: "Ground", sub: "Haig Avenue, Southport" },
              { icon: Trophy, value: "FA Trophy", label: "Competition", sub: "Semi-Final — one game" },
              { icon: Ticket, value: "~£13–£15", label: "Tickets", sub: "Check southportfc.net" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4 py-4">
                <s.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                <div className="text-lg font-extrabold text-[#C9A84C]">{s.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                <div className="text-[11px] text-white/40 mt-1">{s.sub}</div>
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Biggest Game in a Generation</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                I have lived in this town my entire life and I cannot remember Haig Avenue being this loud for a home
                game. The quarter-final against Yeovil drew nearly 3,700 people. The semi-final against Southend
                will be bigger again. It is the first time Southport FC have been in a Trophy semi-final in 28 years.
                If you understand what that means to a town that has had a complicated relationship with football
                at this level for a long time, you understand why people are genuinely excited.
              </p>
              <p>
                If you are coming from Southend, or you are visiting Southport for the first time and fancying the
                match: welcome. This is genuinely a good place to spend a day. There is more here than the football —
                Lord Street, the seafront, Southport Market, decent pubs and restaurants. If the weather holds on
                a March Saturday and you arrive a couple of hours early, you can make a proper day of it.
              </p>
              <p>
                The practical things that matter: there is no car park at the ground, street parking fills up early,
                the away end is open to the elements, and the Thatch and Thistle at the bottom of Haig Avenue gets
                busy before kick-off. Come by train if you can. It is much less stressful.
              </p>
              <p>
                And if Southport win — the town will be going to Wembley for the first time in a generation. Book
                a room now just in case.
              </p>
            </div>
          </div>
        </section>

        {/* ── The Occasion ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Context</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Why This Match Matters</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                emoji: "🏆",
                title: "First Semi in 28 Years",
                detail: "Southport FC have not reached an FA Trophy semi-final since 1998. The 1998 run ended in a final at Wembley — the club lost to Cheltenham Town. This is the first time since then they have come within one result of returning.",
              },
              {
                emoji: "⚽",
                title: "The Quarter-Final",
                detail: "The quarter-final against Yeovil Town at Haig Avenue drew 3,696 — a massive crowd for National League North level. The atmosphere was described as the best at the ground in years. The semi-final is expected to be bigger again.",
              },
              {
                emoji: "🎯",
                title: "One Game from Wembley",
                detail: "The FA Trophy Final is played at Wembley Stadium. Win this semi-final and Southport FC are there. That is what is at stake. It is a single-leg tie — everything decided in 90 minutes at Haig Avenue.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Getting There ── */}
        <section id="getting-there" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Travel</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Getting to Haig Avenue</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg">
              Postcode: <strong>PR8 6JZ</strong>. There is no car park at the stadium — plan your travel accordingly.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Train,
                title: "By Train (Recommended)",
                color: "text-blue-600",
                items: [
                  "Meols Cop station is the closest — 10-minute walk to the ground. Exit the station, turn left onto Norwood Road, walk down to the Thatch and Thistle pub at the bottom. Haig Avenue is directly opposite the pub.",
                  "Southport station (town centre) — 20-minute walk or take the number 44 bus from Eastbank Street to Haig Avenue.",
                  "From Liverpool: Liverpool Central (Merseyrail Northern line) to Southport, around 50 minutes. Trains run every 15 minutes on Saturdays.",
                  "From Manchester or further afield: Manchester Piccadilly to Wigan North Western, then Northern rail to Southport. Check National Rail for the latest times.",
                ],
              },
              {
                icon: Car,
                title: "By Car",
                color: "text-amber-600",
                items: [
                  "Satnav postcode: PR8 6JZ. This takes you directly to Haig Avenue.",
                  "There is no car park at the stadium. Street parking on Haig Avenue and surrounding residential streets fills well before kick-off for a game this size.",
                  "If you arrive early (2+ hours before kick-off), you have more options. Arriving 30–60 minutes before will mean searching.",
                  "Consider parking in Southport town centre and taking the number 44 bus, or walking the mile and a half to the ground in around 25–30 minutes.",
                ],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <item.icon className={`w-6 h-6 ${item.color} mb-4`} />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">{item.title}</h3>
                <div className="space-y-3">
                  {item.items.map((line, i) => (
                    <div key={i} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-2xl p-6">
            <p className="text-sm text-[#1B2E4B] leading-relaxed">
              <strong>Tip for Southend fans travelling from Essex:</strong> Liverpool Lime Street to Liverpool Central
              is a 5-minute walk, then Merseyrail to Southport. If you are travelling in a group, this avoids driving
              entirely and means you can have a proper day out. A lot of away fans on this route make a day of
              Liverpool before heading to Southport.
            </p>
          </div>
        </section>

        {/* ── Parking section ── */}
        <section id="parking" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Parking</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Parking Near Haig Avenue</h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              There is no car park at the stadium. Here is what you are working with.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                option: "Street Parking — Haig Avenue",
                timing: "Arrive 2+ hours early",
                color: "bg-green-600",
                detail: "The road itself and the immediate surrounding streets are the main option. For a game this size, arrive at least two hours before kick-off to have a reasonable chance. Residential streets around the ground — Scarisbrick New Road, Norwood Road — fill fast.",
              },
              {
                option: "Town Centre Car Parks",
                timing: "Walk 25–30 mins or bus",
                color: "bg-blue-600",
                detail: "Southport town centre has several car parks with lower stress on a matchday. Park on Lord Street or the Promenade car parks, then walk (25–30 minutes) or take the number 44 bus. Good option if you want to have a look around town before the match.",
              },
              {
                option: "Bus from Town Centre",
                timing: "Number 44 from Eastbank St",
                color: "bg-amber-600",
                detail: "If you are parked in the town centre or arriving at Southport station, the number 44 bus runs along the route toward Haig Avenue. Check Merseytravel for the exact stop and timetable on the day.",
              },
            ].map((item) => (
              <div key={item.option} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${item.color} px-6 py-3`}>
                  <h3 className="font-display font-bold text-white text-sm">{item.option}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{item.timing}</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link
              href="/guides/parking-southport"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors"
            >
              Full Southport Parking Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Pubs ── */}
        <section id="pubs" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before the Match</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Pubs Near Haig Avenue</h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Options near the ground are limited but functional. If you have time, Southport town centre (a mile and a half
              away) is the better call for a proper pre-match drink.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "The Grandstand Bar",
                location: "At the ground",
                type: "Ground bar",
                badge: "At the ground",
                badgeColor: "bg-[#1B2E4B] text-white",
                detail: "The bar inside Haig Avenue behind the main stand. Serves real ale. Gets crowded before a big game and may restrict away fan entry close to kick-off. Worth trying if you arrive early, but have a backup plan.",
                tip: "Go early — it fills up.",
              },
              {
                name: "Thatch and Thistle",
                location: "Norwood Road / Haig Avenue junction",
                type: "Pub",
                badge: "Most convenient",
                badgeColor: "bg-green-700 text-white",
                detail: "Right at the bottom of Haig Avenue, directly opposite the ground entrance. Sky Sports, food available, decent enough for a pre-match. Nothing special but it does the job. Gets very busy before a game this size.",
                tip: "Arrive early — tables go fast.",
              },
              {
                name: "The Richmond",
                location: "Scarisbrick New Road",
                type: "Pub",
                badge: "Short walk",
                badgeColor: "bg-blue-700 text-white",
                detail: "A few minutes from the ground on Scarisbrick New Road. Slightly more relaxed than the Thatch and Thistle before a big game. A reasonable option for away fans who want a bit more space.",
                tip: "Less crowded alternative.",
              },
              {
                name: "Tap and Bottles",
                location: "Town centre",
                type: "Craft beer",
                badge: "Best pint",
                badgeColor: "bg-amber-600 text-white",
                detail: "Luke Randles (of the Southport BID) ran this for years — proper CAMRA-award-winning pub in the town centre. If you are arriving 2+ hours early and want a genuinely good pint, this is where to go. About 20–25 minutes walk from the ground.",
                tip: "Worth the walk if you have time.",
              },
              {
                name: "The Guest House",
                location: "Town centre",
                type: "Pub",
                badge: "Town centre",
                badgeColor: "bg-purple-700 text-white",
                detail: "A popular town centre pub that gets mentioned by away fans researching the area. Good atmosphere, central location. Bus the mile and a half to the ground from here when you are ready.",
                tip: "Get the bus back — don't rush.",
              },
              {
                name: "Inn Beer Shop",
                location: "Town centre",
                type: "Bottle shop/bar",
                badge: "Specialist",
                badgeColor: "bg-gray-700 text-white",
                detail: "Independent bottle shop and bar in Southport town centre. Good selection. If you are a beer enthusiast and have time before the match, worth knowing about.",
                tip: "Good for a different kind of pre-match.",
              },
            ].map((pub) => (
              <div key={pub.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Beer className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pub.badgeColor}`}>
                    {pub.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-1">{pub.name}</h3>
                <p className="text-[#C9A84C] text-xs font-semibold mb-3">{pub.location}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{pub.detail}</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-500 font-medium">{pub.tip}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link
              href="/bars-nightlife"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors"
            >
              All Southport pubs and bars <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── The Ground ── */}
        <section id="the-ground" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Haig Avenue</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">The Ground</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Wind,
                title: "The Blowick End (Away)",
                highlight: "Bring layers",
                items: [
                  "Away supporters are in the Blowick End — the open terrace at the south end of the ground.",
                  "It is uncovered. The wind comes in off the Irish Sea and it can be bitter on an exposed terrace in March. Do not underestimate this.",
                  "Wear a waterproof and proper layers. A matchday that starts mild can turn cold quickly in an open terrace.",
                  "The sightlines are fine — this is a decent lower-league ground. The atmosphere can be good for a game with this kind of stakes.",
                ],
              },
              {
                icon: MapPin,
                title: "Ground Details",
                highlight: "Capacity: 6,008",
                items: [
                  "Total capacity: 6,008 (1,537 seated, 4,471 standing).",
                  "The Jack Carr Stand (west) is the main home terrace. The Grandstand (east) has the seating and the bar.",
                  "Haig Avenue was built in 1905. It is a traditional lower-league football ground — not modern but with genuine character.",
                  "Hospitality packages are available via the club — the club pushes this and it is decent value for the level. Check southportfc.net.",
                ],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <item.icon className="w-6 h-6 text-[#C9A84C] mb-3" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-1">{item.title}</h3>
                <p className="text-[#C9A84C] text-xs font-semibold mb-4">{item.highlight}</p>
                <div className="space-y-2.5">
                  {item.items.map((line, i) => (
                    <div key={i} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Making a Day of It ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Beyond the Match</p>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-4">Making a Day of Southport</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              If you are travelling from Southend or further afield, Southport is worth a few hours of your time
              before the match. It is a proper Victorian seaside town with a long beach, a mile-long boulevard
              of glass-canopied shops and restaurants, an indoor market, and an arts centre. Here is where to go
              if you arrive early.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Lord Street",
                  desc: "Southport's Victorian boulevard — glass canopies, independent shops, restaurants, and cafés. A 20-minute walk from Haig Avenue. Worth an hour on a dry morning.",
                  href: "/guides/lord-street",
                  emoji: "🏛️",
                },
                {
                  title: "Southport Beach",
                  desc: "One of England's widest beaches. Marine Drive car park (PR8 1RX) gives you direct access. In March it will be bracing. Excellent for a short walk.",
                  href: "/guides/southport-beach",
                  emoji: "🏖️",
                },
                {
                  title: "Southport Market",
                  desc: "Street food, independent traders, and a good atmosphere. On Market Street in the town centre. Good option for lunch before the match if you are in town early.",
                  href: "/attractions",
                  emoji: "🍜",
                },
                {
                  title: "The Atkinson",
                  desc: "Lord Street arts centre — gallery, theatre, café. If you are in town with time to spare and the weather is poor, this is genuinely excellent.",
                  href: "/attractions",
                  emoji: "🎨",
                },
                {
                  title: "Restaurants",
                  desc: "Southport has proper dining. If you are staying overnight, book ahead — particularly at weekends. Lord Street and Birkdale village have the best options.",
                  href: "/restaurants",
                  emoji: "🍽️",
                },
                {
                  title: "Hotels",
                  desc: "If you are making a weekend of it, book now. If Southport win and go to Wembley, accommodation will be a story in itself. Booking ahead is sensible.",
                  href: "/hotels",
                  emoji: "🛏️",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group bg-[#FAF8F5] rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="text-2xl mb-3">{item.emoji}</div>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-sm mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                    {item.title} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── If They Win ── */}
        <section>
          <div className="bg-[#0A1B3D] rounded-2xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-5">
              <Trophy className="w-8 h-8 text-[#C9A84C]" />
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">If Southport Win</p>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Southport FC at Wembley</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-2xl">
              If Southport beat Southend United, they go to the FA Trophy Final at Wembley Stadium.
              It would be the first time the club has appeared at Wembley since reaching the final in 1998.
              We will publish a full Wembley guide within 24 hours of the final whistle — travel from Southport,
              where to stay in London, the history, and everything you need.
            </p>
            <p className="text-white/50 text-sm">
              If you are visiting Southport for the semi-final, you already know where to look. Keep this page bookmarked.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Haig Avenue — FAQs</h2>
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

        {/* ── Permanent guide CTA ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">The Full Matchday Guide</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Not just here for the Trophy? Our permanent Haig Avenue matchday guide covers every away visit
              to Southport FC — parking, pubs, travel, the ground, and how to make the most of a day in the town.
            </p>
            <Link
              href="/guides/southport-fc-matchday"
              className="inline-flex items-center gap-2 bg-[#1B2E4B] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#C9A84C] hover:text-[#1B2E4B] transition-colors"
            >
              Southport FC Matchday Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
