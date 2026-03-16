import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  Waves,
  History,
  Camera,
  Car,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-pier");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport Pier, Southport pier length, how long is Southport pier, visit Southport pier, Southport pier history, England second longest pier",
  alternates: { canonical: `${BASE_URL}/guides/southport-pier` },
  openGraph: {
    title: "Southport Pier | England's Second Longest",
    description: "1,108 metres of Victorian engineering over the Irish Sea. Free to walk. Views to Wales on a clear day.",
    url: `${BASE_URL}/guides/southport-pier`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/southport-pier.webp` }],
  },
};

const FAQS = [
  { q: "How long is Southport Pier?", a: "Southport Pier is 1,108 metres long (3,636 feet). It is England's second longest pier — Southend-on-Sea Pier in Essex takes the top spot at 2,158 metres. Southport Pier stretches out from the seafront over the Irish Sea estuary." },
  { q: "Is Southport Pier free to visit?", a: "Yes — it is free to walk. You can walk the full length of the pier and back without paying anything. There was historically a tram that ran along the pier but this is not currently in operation. The pier itself is open to pedestrians." },
  { q: "What is the postcode for Southport Pier?", a: "The postcode for the pier entrance is PR8 1QP, on the Promenade near the seafront. Park along Marine Drive (PR8 1RX) or use nearby seafront car parks and walk to the pier — it's on the Promenade, easy to find." },
  { q: "Can you see Wales from Southport Pier?", a: "On a clear day, yes. From the end of the pier you can see across the Ribble Estuary and the Irish Sea. The Welsh hills — Snowdonia — are visible on exceptionally clear days, particularly in winter when visibility is best." },
  { q: "When was Southport Pier built?", a: "Southport Pier opened in 1860, making it one of the oldest seaside piers in England. It has been extended, restored, and renovated several times since, including a major restoration in the early 2000s that brought it back to its current state." },
  { q: "How long does it take to walk Southport Pier?", a: "About 15–20 minutes each way at a relaxed pace. The full return walk takes approximately 35–40 minutes. There is no rushing required — the views change as you walk further out, and the end of the pier has the best panoramic views over the estuary." },
  { q: "Is Southport Pier accessible for wheelchairs?", a: "The pier has a flat, level surface and is generally accessible for wheelchairs and pushchairs, though the decking surface may be uneven in places. The Promenade approach to the pier is fully accessible." },
  { q: "What is at the end of Southport Pier?", a: "A shelter and seating at the pierhead, along with the best views available from Southport — a 360-degree panorama across the Irish Sea estuary, the coastline north towards Blackpool, and south towards Formby. On a clear day the Welsh mountains are visible to the south-west." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Southport Pier",
  description: "Southport Pier — 1,108 metres long, England's second longest pier. Victorian, restored, free to walk. Views over the Irish Sea estuary from the pierhead.",
  url: `${BASE_URL}/guides/southport-pier`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
  geo: { "@type": "GeoCoordinates", latitude: 53.6475, longitude: -3.0155 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "The Promenade",
    addressLocality: "Southport",
    postalCode: "PR8 1QP",
    addressCountry: "GB",
  },
  isAccessibleForFree: true,
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

export default function SouthportPierGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/southport-pier.webp"
            alt="Southport Pier stretching out over the Irish Sea at dusk"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E4B] via-[#1B2E4B]/55 to-[#1B2E4B]/15" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                England&apos;s 2nd Longest
              </span>
              <span className="text-white/50 text-sm font-medium">Since 1860</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Pier</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              1,108 metres of Victorian engineering over the Irish Sea. England&apos;s second longest pier,
              free to walk, with views to Wales on a clear day. Allow 40 minutes for the return trip.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#history" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                Discover the Pier
              </a>
              <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Practical Info →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#1B2E4B] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "1,108m", label: "Length", sub: "3,636 feet" },
              { value: "1860", label: "Year Opened", sub: "Over 165 years old" },
              { value: "Free", label: "Admission", sub: "No charge to walk" },
              { value: "40 min", label: "Return Walk", sub: "Relaxed pace" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4 py-4">
                <div className="text-2xl font-extrabold text-[#C9A84C]">{s.value}</div>
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Why Southport Pier Is Worth the Walk</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                People who haven&apos;t been tend to think it&apos;s just a pier — a bit of Victorian nostalgia, something you tick off
                and move on from. It isn&apos;t. The walk out to the end of Southport Pier is one of those experiences that changes
                your understanding of where you are. You walk out over the beach, over the sand, over the estuary —
                and by the time you reach the pierhead you&apos;re over a kilometre out from the shore, with nothing but water
                and sky in every direction except back the way you came.
              </p>
              <p>
                From the end you get a proper sense of the Sefton Coast: the dunes stretching south towards Formby and
                Crosby, the Lancashire plain behind you, the Irish Sea opening out to the west. On a clear winter&apos;s day
                you can see the Welsh hills — Snowdonia — on the southern horizon. It&apos;s a forty-minute round walk and
                it costs nothing. That combination is rare.
              </p>
              <p>
                My kids went through a phase of insisting on walking it every single visit to the seafront.
                I thought they&apos;d grow out of it. They haven&apos;t. Neither have I.
              </p>
            </div>
          </div>
        </section>

        {/* ── History ── */}
        <section id="history" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Background</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">A Brief History</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <History className="w-8 h-8 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-4">Built in 1860</h3>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>
                  Southport Pier opened on 2nd August 1860 — one of the earliest pleasure piers in England.
                  The original structure was a simple iron pier for promenading and accessing steamboat services
                  that used to call at the pierhead.
                </p>
                <p>
                  The pier was extended multiple times as Southport grew as a resort. A tramway was added to
                  carry visitors along its length — the pier tram became a Southport institution, operating for
                  over a century before modern operational constraints made it unviable.
                </p>
                <p>
                  Significant restoration works in the late 1990s and early 2000s brought the pier back from
                  a state of considerable disrepair. The current pier is well-maintained, fully open to pedestrians,
                  and expected to be around for a good while longer.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { year: "1860", event: "Pier opens", detail: "Original iron structure opens to the public on 2nd August. One of England's first pleasure piers." },
                { year: "1863", event: "Tramway added", detail: "Horse-drawn tram service introduced to carry visitors along the pier length — later converted to electric." },
                { year: "1897", event: "Major extension", detail: "Pier extended to its current length of 1,108 metres (3,636 feet), making it England's second longest." },
                { year: "2003", event: "Restoration completed", detail: "Major £7m restoration project completed, saving the pier from closure and returning it to full public use." },
              ].map((item) => (
                <div key={item.year} className="flex gap-5 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex-shrink-0 w-16 text-center">
                    <p className="text-[#C9A84C] font-extrabold text-lg leading-tight">{item.year}</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-[#1B2E4B] text-sm">{item.event}</p>
                    <p className="text-gray-600 text-xs leading-relaxed mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Walk ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Experience</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">The Walk Out</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The pier is best understood in three sections — what you see at the start, halfway out, and at the end.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                section: "The Entrance",
                distance: "0–200m",
                emoji: "🏛️",
                color: "bg-[#1B2E4B]",
                detail: "The pier entrance is on the Promenade, right alongside the seafront. The first section is over the beach — at low tide you're walking above sand, at high tide above water. The views back to the town and along the Promenade begin immediately. King's Gardens and Marine Lake are visible on your left.",
              },
              {
                section: "The Middle",
                distance: "200–800m",
                emoji: "🌊",
                color: "bg-[#1A5C7A]",
                detail: "Halfway out, the pier crosses over the water regardless of tide. The wind picks up here — take a layer even in summer, it's noticeably cooler over open water than on the Promenade. The views widen. Formby and the dunes are visible to the south. The coast curves away in both directions.",
              },
              {
                section: "The Pierhead",
                distance: "800–1,108m",
                emoji: "🔭",
                color: "bg-[#1A4020]",
                detail: "The end of the pier. A shelter, seating, and the best views in Southport. 360-degree panorama — the Irish Sea to the west, the Lancashire coast to the north, the Welsh hills on a clear day to the south-west, and the town of Southport behind you. Worth every step. Stay for a few minutes.",
              },
            ].map((item) => (
              <div key={item.section} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${item.color} px-6 py-5 flex items-center gap-3`}>
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <p className="text-white/60 text-xs font-semibold">{item.distance}</p>
                    <h3 className="font-display text-lg font-bold text-white">{item.section}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Practical ── */}
        <section id="practical" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Practical Information</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: MapPin,
                title: "Getting There",
                content: [
                  "Postcode: PR8 1QP (Promenade entrance)",
                  "From the station: 12-minute walk along Lord Street and the Promenade",
                  "From Marine Drive parking: 5-minute walk along the seafront",
                  "Bus: multiple routes stop on the Promenade",
                ],
              },
              {
                icon: Car,
                title: "Parking",
                content: [
                  "Marine Drive bays: free, on the seafront — fills early on summer weekends",
                  "Esplanade car park: pay and display, nearest to the pier entrance",
                  "Town centre NCP: pay and display, 12-minute walk",
                  "On-street on Promenade: limited, check signs",
                ],
              },
              {
                icon: Clock,
                title: "When to Visit",
                content: [
                  "Open year-round, no entry times — pedestrian access at all hours",
                  "Sunset walks are exceptional — the pier faces west over the Irish Sea",
                  "Winter mornings: often the pier to yourself, views at their clearest",
                  "Summer afternoons: busiest period — still manageable, the pier is long",
                ],
              },
              {
                icon: Camera,
                title: "Photography Tips",
                content: [
                  "Best light: golden hour before sunset — the pier becomes a silhouette",
                  "Best tide: low to mid — maximum sand visible below",
                  "From the pierhead: face west at sunset for the best shot",
                  "Looking back to town: the pier makes a strong leading line shot from the end",
                ],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <item.icon className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">{item.title}</h3>
                <div className="space-y-2">
                  {item.content.map((line) => (
                    <div key={line} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Views ── */}
        <section>
          <div className="bg-gradient-to-r from-[#1B2E4B] to-[#2A4A73] rounded-2xl p-8 md:p-12 text-white">
            <Waves className="w-8 h-8 text-[#C9A84C] mb-5" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">What You Can See from the End</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
              The view from the pierhead is the whole point of the walk. On a clear day it covers an enormous stretch
              of the North West coastline.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { direction: "North", sight: "Blackpool", detail: "Blackpool Tower is visible on a clear day — about 18 miles away." },
                { direction: "West", sight: "Irish Sea", detail: "Open sea stretching towards Ireland. Dramatic in all weather." },
                { direction: "South-West", sight: "Welsh Mountains", detail: "Snowdonia on exceptional days — 60+ miles. Winter visibility best." },
                { direction: "South", sight: "Formby & Dunes", detail: "The Sefton Coast dune system stretching south — 7 miles to Formby." },
              ].map((item) => (
                <div key={item.direction} className="bg-white/10 rounded-xl p-5">
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">{item.direction}</p>
                  <p className="font-display font-bold text-white text-lg mb-1">{item.sight}</p>
                  <p className="text-white/60 text-xs leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Compare Piers ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">In Context</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">England&apos;s Longest Piers</h2>
            <p className="text-gray-600 mt-2 max-w-xl text-base">Where Southport Pier ranks — and why it&apos;s the more interesting walk.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1B2E4B] text-white">
                    <th className="text-left px-5 py-3 font-semibold">Rank</th>
                    <th className="text-left px-5 py-3 font-semibold">Pier</th>
                    <th className="text-left px-5 py-3 font-semibold">Length</th>
                    <th className="text-left px-5 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { rank: "1st", pier: "Southend-on-Sea", length: "2,158m", notes: "Requires its own railway train — purely a length competition" },
                    { rank: "2nd", pier: "Southport", length: "1,108m", notes: "Better walk, better views, better town", highlight: true },
                    { rank: "3rd", pier: "Herne Bay", length: "1,068m", notes: "Kent. Less interesting views." },
                    { rank: "4th", pier: "Ryde (Isle of Wight)", length: "700m", notes: "Ferry pier, not primarily a pleasure pier" },
                  ].map((row) => (
                    <tr key={row.pier} className={row.highlight ? "bg-[#C9A84C]/10" : "hover:bg-gray-50 transition-colors"}>
                      <td className="px-5 py-3.5 font-bold text-[#C9A84C]">{row.rank}</td>
                      <td className={`px-5 py-3.5 font-medium ${row.highlight ? "text-[#1B2E4B] font-bold" : "text-gray-800"}`}>{row.pier}</td>
                      <td className="px-5 py-3.5 text-gray-600 font-mono">{row.length}</td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Pier — FAQs</h2>
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

        {/* ── Nearby ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">While You&apos;re on the Seafront</h2>
              <p className="text-gray-600 mt-2 text-sm max-w-lg mx-auto">Everything below is within 10 minutes of the pier entrance.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { name: "Southport Beach", href: "/guides/southport-beach", detail: "One of the widest beaches in England — right alongside the pier entrance. Walk the pier, then walk the beach." },
                { name: "King's Gardens", href: "/attractions", detail: "17 acres of free gardens with adventure playground, crazy golf, and Victorian features. 5 minutes from the pier." },
                { name: "Marine Lake", href: "/activities", detail: "140 acres of flat water with boat hire and pedalos. Perimeter path is a lovely easy walk alongside the pier." },
              ].map((item) => (
                <Link key={item.name} href={item.href} className="group bg-[#FAF8F5] rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all">
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                    {item.name} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
