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
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-fc-matchday");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Haig Avenue parking, pubs near Haig Avenue Southport, visiting Southport FC, Southport FC away guide, Haig Avenue postcode, Meols Cop station Haig Avenue",
  alternates: { canonical: `${BASE_URL}/guides/southport-fc-matchday` },
  openGraph: {
    title: "Southport FC Matchday Guide | Haig Avenue",
    description: "Everything an away fan needs to visit Haig Avenue. Parking, pubs, travel, the ground, and making a day of Southport.",
    url: `${BASE_URL}/guides/southport-fc-matchday`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-fc-haig-avenue.webp` }],
  },
};

const FAQS = [
  {
    q: "What is the postcode for Haig Avenue?",
    a: "The postcode for Haig Avenue Stadium is PR8 6JZ. There is no car park at the stadium — you'll be looking for street parking on Haig Avenue and the surrounding residential streets.",
  },
  {
    q: "Which train station is nearest to Haig Avenue?",
    a: "Meols Cop is the closest station at about a 10-minute walk. Exit the station, turn left onto Norwood Road, walk down to the Thatch and Thistle pub at the bottom, and Haig Avenue is directly opposite. Southport station (town centre) is also an option — a 20-minute walk or take the number 44 bus from Eastbank Street.",
  },
  {
    q: "Is there a car park at Haig Avenue?",
    a: "There is no dedicated car park at the stadium. Street parking on Haig Avenue and surrounding residential streets is the main option. For popular fixtures this fills up well before kick-off — arrive early or park in the town centre and bus/walk.",
  },
  {
    q: "Which pubs near Haig Avenue are good for away fans?",
    a: "The Thatch and Thistle at the bottom of Haig Avenue (at the Norwood Road junction) is the closest option — straightforward pub with Sky Sports. The Richmond on Scarisbrick New Road is a short walk and slightly more relaxed. The Grandstand Bar at the ground itself is worth trying early on. If you have more time, Southport town centre has significantly better options — a mile and a half away, worth it if you arrive 2+ hours early.",
  },
  {
    q: "What is the away end like at Haig Avenue?",
    a: "Away supporters are in the Blowick End — an open, uncovered terrace at the south end of the ground. The Irish Sea wind can be significant on an exposed terrace. Dress in layers and bring a waterproof regardless of the forecast. The sightlines are fine.",
  },
  {
    q: "How much are tickets at Southport FC?",
    a: "Adult standing tickets are typically around £13–£15, with seated options in the Grandstand at a slight premium. Hospitality packages are also available and are good value for the level. Check southportfc.net for confirmed prices — they vary by fixture and competition.",
  },
  {
    q: "What is there to do in Southport before or after the match?",
    a: "More than most people expect. Lord Street is a genuinely impressive Victorian boulevard with independent shops and restaurants — about a 20-minute walk or short bus ride from Haig Avenue. Southport Market is good for lunch. The beach and pier are worth seeing if you arrive early enough. If the weather is poor, The Atkinson on Lord Street (arts centre, gallery, café) is one of the better rainy-day options in the North West.",
  },
  {
    q: "Is Southport FC in the National League?",
    a: "Southport FC currently compete in the National League North — the sixth tier of English football. Home games at Haig Avenue typically draw attendances in the hundreds to low thousands, rising significantly for cup fixtures and high-profile visitors.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Southport FC",
  url: "https://www.southportfc.net",
  sport: "Soccer",
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

export default function SouthportFCMatchdayGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[70vh] flex items-end bg-[#0A1B3D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-fc-matchday-hero.webp"
            alt="Haig Avenue stadium floodlights at dusk — Southport FC matchday guide"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D] via-[#0A1B3D]/60 to-[#0A1B3D]/15" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Matchday Guide
              </span>
              <span className="text-white/50 text-sm font-medium">National League North · Haig Avenue · PR8 6JZ</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              Visiting
              <span className="block text-[#C9A84C]">Haig Avenue</span>
              <span className="block text-2xl md:text-3xl text-white/70 font-semibold mt-2">The Complete Southport FC Visitor Guide</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              Everything you need to know before visiting Haig Avenue for the first time.
              Parking, pubs, getting there by train, what the away end is like, and what Southport
              has to offer before and after the match.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.southportfc.net"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Fixtures &amp; Tickets — southportfc.net →
              </a>
              <a
                href="#getting-there"
                className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Getting There
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#0A1B3D] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: MapPin, value: "PR8 6JZ", label: "Postcode", sub: "Haig Avenue, Southport" },
              { icon: Train, value: "Meols Cop", label: "Nearest Station", sub: "10-min walk" },
              { icon: Users, value: "6,008", label: "Capacity", sub: "1,537 seated" },
              { icon: Ticket, value: "~£13–£15", label: "Standing", sub: "Check southportfc.net" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">What to Expect at Haig Avenue</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Haig Avenue is a proper old non-league ground, built in 1905 and updated over the years in the
                way that lower-league clubs update things — a stand here, some floodlights there. It has character.
                It is not modern. It is a football ground in the way that football grounds used to be, and that
                is not a complaint from me.
              </p>
              <p>
                If you are visiting as an away fan, the things that actually matter: there is no car park, so
                sort your travel before you arrive. The away end (the Blowick End, at the south) is an open terrace
                and Southport in winter is on the coast, which means wind. Dress for it. The Thatch and Thistle
                at the bottom of Haig Avenue is the default option for a pre-match drink near the ground.
                It is fine. If you have more time and want something better, the town centre has it.
              </p>
              <p>
                Southport as a town is worth spending some time in. Lord Street is genuinely one of the better
                shopping streets in the North West. The beach is enormous. The market is good. If you are making
                a day of it and arriving a couple of hours before kick-off, you will find things to do.
              </p>
            </div>
          </div>
        </section>

        {/* ── Getting There ── */}
        <section id="getting-there" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Travel</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Getting to Haig Avenue</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg">
              Satnav postcode: <strong>PR8 6JZ</strong>. No car park at the ground.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Train,
                title: "By Train",
                color: "text-blue-600",
                recommended: true,
                items: [
                  "Meols Cop station — 10-minute walk. Exit left onto Norwood Road, walk to the Thatch and Thistle at the bottom, ground is directly opposite.",
                  "Southport station (town centre) — 20-minute walk or the number 44 bus from Eastbank Street.",
                  "From Liverpool: Liverpool Central to Southport on the Merseyrail Northern line, around 50 minutes, running every 15 minutes on Saturdays.",
                  "From Manchester: Manchester Piccadilly to Wigan North Western, then Northern rail to Southport. Check National Rail for times.",
                  "From the south via Liverpool: Liverpool Lime Street to Liverpool Central is a 5-minute walk, then Merseyrail onward.",
                ],
              },
              {
                icon: Car,
                title: "By Car",
                color: "text-amber-600",
                recommended: false,
                items: [
                  "Satnav: PR8 6JZ takes you to the ground. No car park at the stadium.",
                  "Street parking on Haig Avenue and surrounding residential roads fills early for popular fixtures.",
                  "Arrive at least 90 minutes before kick-off if relying on street parking near the ground.",
                  "Town centre car parks are an alternative — then walk 25–30 minutes or take the number 44 bus.",
                  "Marine Drive car park (PR8 1RX) is on the far side of town from the ground and requires a bus or longer walk.",
                ],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <div className="flex items-center gap-3 mb-4">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{item.title}</h3>
                  {item.recommended && (
                    <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
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
        </section>

        {/* ── Parking ── */}
        <section id="parking" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">On the Day</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Parking Options</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead className="bg-[#1B2E4B] text-white">
                <tr>
                  <th className="text-left px-5 py-4 font-semibold">Option</th>
                  <th className="text-left px-5 py-4 font-semibold hidden sm:table-cell">Distance to Ground</th>
                  <th className="text-left px-5 py-4 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { option: "Haig Avenue (street)", distance: "At the ground", note: "Fills early — arrive 90+ mins before KO for popular games" },
                  { option: "Surrounding residential streets", distance: "2–5 min walk", note: "Norwood Road, Scarisbrick New Road — check for residents-only signs" },
                  { option: "Town centre car parks", distance: "25–30 min walk or bus", note: "Lower stress on a matchday; bus 44 from Eastbank Street" },
                ].map((row) => (
                  <tr key={row.option} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-4 font-medium text-[#1B2E4B]">{row.option}</td>
                    <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">{row.distance}</td>
                    <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Pre-Match</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Pubs Near Haig Avenue</h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Options close to the ground are limited. If you have two or more hours before kick-off, the town
              centre is the better choice.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-4">Near the Ground</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  name: "Grandstand Bar",
                  location: "At the stadium",
                  detail: "The bar inside Haig Avenue behind the main stand. Real ale on tap. Gets crowded before big games and may limit away fan entry close to kick-off. Go early if you want to use it.",
                },
                {
                  name: "Thatch and Thistle",
                  location: "Haig Avenue / Norwood Road junction",
                  detail: "The default option for away fans — right at the bottom of the road leading to the ground. Sky Sports, food, functional. Nothing special but it works. Gets busy for popular games.",
                },
                {
                  name: "The Richmond",
                  location: "Scarisbrick New Road",
                  detail: "A short walk from the ground on Scarisbrick New Road. Slightly less hectic than the Thatch and Thistle for bigger fixtures. A reasonable alternative if you want more space.",
                },
              ].map((pub) => (
                <div key={pub.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <Beer className="w-5 h-5 text-[#C9A84C] mb-3" />
                  <h4 className="font-display font-bold text-[#1B2E4B] text-base mb-1">{pub.name}</h4>
                  <p className="text-[#C9A84C] text-xs font-semibold mb-3">{pub.location}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{pub.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-4">Town Centre (if arriving early)</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <p className="text-gray-700 leading-relaxed mb-5">
                Southport town centre is about a mile and a half from Haig Avenue — 25–30 minutes on foot or
                a short bus ride on the number 44. If you are arriving two or more hours before kick-off,
                this is the better option for a pre-match drink. The pubs are significantly better than the options
                right by the ground.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: "Tap and Bottles", desc: "CAMRA award-winning. One of the better pubs in Southport for real ale. Worth making the effort for." },
                  { name: "The Guest House", desc: "Popular town centre pub. Good atmosphere for a pre-match if you are in the area." },
                  { name: "Inn Beer Shop", desc: "Independent bottle shop and bar. If you are a beer enthusiast, worth knowing about." },
                ].map((pub) => (
                  <div key={pub.name} className="bg-[#FAF8F5] rounded-xl p-4">
                    <h4 className="font-display font-bold text-[#1B2E4B] text-sm mb-2">{pub.name}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{pub.desc}</p>
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
            </div>
          </div>
        </section>

        {/* ── The Ground ── */}
        <section id="the-ground" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Haig Avenue</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">The Ground</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                emoji: "🏟️",
                title: "Capacity",
                detail: "6,008 total. 1,537 seated in the main Grandstand. 4,471 standing across the three terraced ends.",
              },
              {
                emoji: "🎽",
                title: "Away End",
                detail: "The Blowick End — south terrace, open and uncovered. Irish Sea wind is a real factor. Bring a waterproof and layers regardless of the forecast.",
              },
              {
                emoji: "🍺",
                title: "Refreshments",
                detail: "The Grandstand Bar serves real ale and is behind the main stand. A cheeseburger and a pint on a matchday at this level is part of the appeal.",
              },
              {
                emoji: "📅",
                title: "The Club",
                detail: "Founded 1881. National League North (sixth tier). Nickname: The Sandgrounders. Colours: black and amber. Ground built 1905.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tickets ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-start gap-4">
              <Ticket className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-3">Tickets</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Adult standing tickets are typically around £13–£15. Seated options in the Grandstand
                  are available at a small premium. Hospitality packages (the club pushes these and they are
                  decent value for the level — around £47 per person) include catering and a reserved seat.
                  Check the official Southport FC website for confirmed prices and availability for each fixture,
                  as cup games and high-profile visitors may be priced differently.
                </p>
                <a
                  href="https://www.southportfc.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1B2E4B] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#C9A84C] hover:text-[#1B2E4B] transition-colors"
                >
                  Tickets — southportfc.net <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Making a Day of It ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Southport</p>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-4">Making a Day of It</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Southport is a proper Victorian seaside town. Most away fans arriving for a 3pm kick-off have
              a couple of hours to fill. Here is what is worth your time.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Lord Street",
                  desc: "Mile-long Victorian boulevard with glass canopies, independent shops, restaurants, and cafés. About 20 minutes walk from Haig Avenue. Worth an hour before a match.",
                  href: "/guides/lord-street",
                  emoji: "🏛️",
                },
                {
                  title: "Southport Beach",
                  desc: "One of England's widest beaches. Easy access from Marine Drive. In autumn and winter it is bracing — good for a short walk if you dress for it.",
                  href: "/guides/southport-beach",
                  emoji: "🏖️",
                },
                {
                  title: "Southport Market",
                  desc: "Street food and independents on Market Street in the town centre. Good for lunch if you are arriving early.",
                  href: "/attractions",
                  emoji: "🍜",
                },
                {
                  title: "Restaurants",
                  desc: "Southport has proper dining options on Lord Street and in Birkdale village. Book ahead for an evening meal — particularly at weekends.",
                  href: "/restaurants",
                  emoji: "🍽️",
                },
                {
                  title: "Cafés",
                  desc: "Independent coffee shops in the town centre and on Lord Street. Good for a sit-down before the match if the pubs are not calling.",
                  href: "/cafes",
                  emoji: "☕",
                },
                {
                  title: "Hotels",
                  desc: "If you are making a weekend of it, Southport has a range of accommodation from town centre hotels to Birkdale B&Bs.",
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
                    {item.title}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
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

        {/* ── Fixtures CTA ── */}
        <section>
          <div className="bg-[#1B2E4B] rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <CalendarDays className="w-8 h-8 text-[#C9A84C] mb-4" />
              <h2 className="font-display text-2xl font-bold mb-3">Check Fixtures and Tickets</h2>
              <p className="text-white/60 leading-relaxed">
                Southport FC publish fixtures, ticket prices, and hospitality information on their official website.
                For cup fixtures and high-profile visitors, check availability early.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-shrink-0">
              <a
                href="https://www.southportfc.net"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm text-center transition-colors"
              >
                southportfc.net →
              </a>
              <Link
                href="/guides/southport-fa-trophy-semi-final"
                className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm text-center transition-colors hover:bg-white/20"
              >
                FA Trophy Semi-Final Guide →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
