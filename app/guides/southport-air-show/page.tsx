import Link from "next/link";
import Image from "next/image";
import { LATEROOMS } from "@/lib/affiliate-links";
import {
  MapPin,
  Car,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Users,
  Star,
  Clock,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-air-show");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport Air Show 2026, Southport Air Show dates, Southport Air Show free, Southport Air Show viewing, Southport airshow parking, Southport Air Show aircraft",
  alternates: { canonical: `${BASE_URL}/guides/southport-air-show` },
  openGraph: {
    title: "Southport Air Show 2026 | 29–30 August · Free · 100,000 Visitors",
    description: "One of the UK's best free air shows. Southport Beach, 29–30 August 2026. Dates, aircraft, viewing spots, parking, and everything you need to know.",
    url: `${BASE_URL}/guides/southport-air-show`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-air-show.webp` }],
  },
};

const AIRCRAFT = [
  {
    emoji: "🔴",
    name: "The Red Arrows",
    type: "RAF Display Team",
    detail: "Nine BAE Hawk T1s, nine smoke trails. When they appear at Southport the atmosphere peaks. Formation breaks and rejoins directly over the beach. Subject to their annual schedule, not confirmed every year, but regular Southport visitors.",
    tag: "Subject to schedule",
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    emoji: "✈️",
    name: "RAF Typhoon FGR4",
    type: "Eurofighter · Supersonics",
    detail: "The supersonic pass is the moment the whole beach stops. The Typhoon display team does a high alpha (nose-up) slow pass that is genuinely extraordinary. One of the loudest aircraft you will hear at close range. Ear protection for small children is not optional.",
    tag: "Regular performer",
    tagColor: "bg-green-100 text-green-800",
  },
  {
    emoji: "🏆",
    name: "Battle of Britain Memorial Flight",
    type: "Spitfire · Hurricane · Lancaster",
    detail: "The BBMF Lancaster, Spitfire, and Hurricane in formation is one of the most emotional sights in aviation. The Merlin engine sound is unlike anything else. Southport beach crowds tend to go quiet when the warbirds appear. Every year.",
    tag: "Regular performer",
    tagColor: "bg-green-100 text-green-800",
  },
  {
    emoji: "🎪",
    name: "Aerosuperbatics Wingwalkers",
    type: "Aerobatic Display",
    detail: "Performers standing on top of biplanes, performing acrobatics in flight. Easily the most visually striking ground-level spectacle. The reactions from the crowd, especially kids, are worth watching as much as the act itself.",
    tag: "Regular performer",
    tagColor: "bg-green-100 text-green-800",
  },
  {
    emoji: "🚁",
    name: "Military Helicopters",
    type: "Chinook · Wildcat · Merlin",
    detail: "Military helicopters make regular appearances at Southport, low-altitude hover displays, formation passes. A Chinook at low level directly over the beach is a crowd-stopper on its own terms. Year varies by what the military make available.",
    tag: "Year varies",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    emoji: "🪂",
    name: "RAF Falcons",
    type: "Parachute Display Team",
    detail: "The RAF's freefall parachute display team. Freefall from around 12,000 feet, trailing coloured smoke, landing with precision on the beach. Often the opening display on Saturday morning. Sets the tone for the weekend.",
    tag: "Year varies",
    tagColor: "bg-blue-100 text-blue-800",
  },
];

const TIMELINE = [
  { time: "Before 9am", label: "Travel window", desc: "Come by train. Marine Drive is full before 9am on air show weekend. If you're driving, you need to be parked by this point." },
  { time: "9:00am", label: "Secure your spot", desc: "The best beach positions start going from 9am. Arrive now for a good viewing spot on the sand. Bring chairs or a blanket, you'll be here a while." },
  { time: "10:00–11:00am", label: "Flying begins", desc: "Opening displays are typically lighter aircraft, civil aerobatics, parachute teams, training aircraft. Good quality, and the beach is still manageable." },
  { time: "12:00–2:00pm", label: "Peak crowds, food rush", desc: "This is when the beach hits maximum capacity and food stall queues are longest. Eat before midday or after 2pm if you can. This is also when the programme builds." },
  { time: "2:00–4:30pm", label: "Headline acts", desc: "The big military displays come in the afternoon session. Typhoon, BBMF, Red Arrows (if appearing), this is the peak of the day. Be in position." },
  { time: "4:30–5:00pm", label: "Closing display", desc: "The show ends with a headline act. Crowds build again for the last display. One of the best crowd atmosphere moments of the day." },
  { time: "After 5pm", label: "Dispersal", desc: "100,000 people leaving at once. Trains will be busy but manageable. Roads will be slow for 60–90 minutes. Don't attempt Marine Drive." },
];

const PARKING = [
  { name: "Train (Merseyrail)", postcode: "—", cost: "~£8 rtn", verdict: "Liverpool Central to Southport. 15 min walk to beach. The easy option. Do this.", recommended: true },
  { name: "Princes Park", postcode: "PR8 1RX", cost: "~£10", verdict: "Better car option than Marine Drive. Gets busy, arrive before 9am.", recommended: false },
  { name: "Marine Drive", postcode: "PR8 1RX", cost: "~£10", verdict: "Full before 9am on air show day. Don't plan on it.", recommended: false },
  { name: "Town centre (various)", postcode: "PR8 1QJ", cost: "£3–8", verdict: "Most reliable car option. 10–15 min walk to beach. Usually has space.", recommended: false },
  { name: "Victoria Park", postcode: "PR8 2LG", cost: "~£10", verdict: "15-min walk to beach. Reliable if you arrive by 9am. Furthest of the main options.", recommended: false },
];

const FAQS = [
  { q: "When is the Southport Air Show 2026?", a: "The Southport Air Show 2026 is confirmed for 29–30 August 2026, the Bank Holiday weekend. The show runs both Saturday and Sunday, typically 10am–5pm each day." },
  { q: "Is the Southport Air Show free?", a: "Yes, the Southport Air Show is free to attend for general spectators. You watch from Southport Beach and the Promenade at no charge. Paid grandstand packages are available for a reserved viewing area near the centre of the display line, but the entire beach is open public viewing." },
  { q: "Where is the best place to watch the Southport Air Show?", a: "The display line runs parallel to the beach. Any point along the Promenade gives a good view. The grandstand area near the Pier is the central premium spot. North of the Pier is slightly less crowded while still giving excellent views of the display line. Further south towards Ainsdale the crowd thins considerably, good if you want space." },
  { q: "How many people attend the Southport Air Show?", a: "The Southport Air Show draws over 100,000 visitors across the two days, sometimes significantly more for headline displays. It is one of the largest free air shows in the UK by attendance." },
  { q: "What aircraft perform at the Southport Air Show?", a: "The line-up varies each year but regular performers include the RAF Typhoon display team, the Battle of Britain Memorial Flight (Spitfire, Hurricane, Lancaster), the Aerosuperbatics Wingwalkers, and subject to their schedule, the Red Arrows. Military helicopters (Chinook, Wildcat) and the RAF Falcons parachute team also appear regularly. The full 2026 programme will be published on the official website ahead of the show." },
  { q: "Where should I park for the Southport Air Show?", a: "The train is the best option by some distance. Merseyrail from Liverpool Central to Southport, then 15 minutes' walk to the beach. If driving, Marine Drive fills before 9am and should not be your plan. Princes Park (PR8 1RX) is a better bet, as are town centre car parks with a 10–15 min walk to the beach." },
  { q: "What time does the Southport Air Show start and finish?", a: "Flying typically starts around 10am–11am and runs until approximately 5pm each day. Arriving early (before 9:30am) gives you the best beach positioning and easier access. The headline acts are typically in the mid-to-late afternoon session." },
  { q: "Can I bring dogs to the Southport Air Show?", a: "The airshow is on the public beach and Promenade, which are normally dog-friendly. However, jet aircraft at close range are very loud, this can be genuinely distressing for dogs. If you're bringing a dog, consider the acoustic environment and have an exit plan if needed. Keep dogs on leads in crowded areas." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Southport Air Show 2026",
  startDate: "2026-08-29",
  endDate: "2026-08-30",
  description: "One of the UK's largest free air shows, held on Southport Beach and Promenade, 29–30 August 2026.",
  url: `${BASE_URL}/guides/southport-air-show`,
  isAccessibleForFree: true,
  location: {
    "@type": "Place",
    name: "Southport Beach and Promenade",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marine Drive",
      addressLocality: "Southport",
      postalCode: "PR8 1RX",
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

export default function SouthportAirShowGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#0A1B3D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-air-show.webp"
            alt="Dramatic contrails crossing a blue sky at the Southport Air Show"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D] via-[#0A1B3D]/50 to-[#0A1B3D]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Free Event
              </span>
              <span className="text-white/50 text-sm font-medium">Southport Beach · 29–30 August 2026</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Air Show</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              One of the UK&apos;s best free air shows. Bank Holiday weekend, 29–30 August 2026.
              Over 100,000 visitors. The display line runs right along the coastline,
              the entire beach is your viewing platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#aircraft" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                Expected Aircraft →
              </a>
              <a href="#parking" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Parking & Getting There
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
              { icon: CalendarDays, value: "29–30 Aug", label: "When", sub: "Bank Holiday Weekend" },
              { icon: Users, value: "100,000+", label: "Attendance", sub: "Per year" },
              { icon: Star, value: "Free", label: "Entry", sub: "Public beach viewing" },
              { icon: Clock, value: "10am–5pm", label: "Flying times", sub: "Each day" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Air Show Is Properly Special</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                I&apos;ve been going to the Southport Air Show since I was a kid. My kids have now been going
                since they were kids. It&apos;s that kind of event, it becomes a fixture. You don&apos;t miss it.
              </p>
              <p>
                What makes it work, apart from the obvious fact that watching aircraft do extraordinary things at close range
                is inherently thrilling, is the setting. The display line runs parallel to the beach.
                The aircraft fly close to the shoreline. The sound hits you. On a clear Saturday in late August,
                with a hundred thousand other people and a Typhoon going supersonics two hundred metres overhead,
                it is genuinely one of the better experiences you can have for free in the North of England.
              </p>
              <p>
                2026 is a Bank Holiday weekend. 29 and 30 August. That means it&apos;s a proper long weekend.
                If you&apos;ve been thinking about coming for years, this is the one to actually do.
              </p>
              <p>
                Practical advice: do not try to drive to Marine Drive. You will spend the morning in traffic
                and the afternoon furious. Come by train from Liverpool. Walk to the Promenade.
                Get there by 9:30am if you want a good spot. Bring something to eat, the food stalls are good
                but the lunchtime queues are substantial. Earplugs for children under ten. The jets are loud.
              </p>
            </div>
          </div>
        </section>

        {/* ── What to Expect ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Show</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What to Expect</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "✈️", title: "The Flying Programme", detail: "A full day of displays running from approximately 10am to 5pm. Mix of military jets, warbirds, aerobatic teams, helicopters, and civilian display aircraft. The line-up varies each year, the full 2026 programme will be published at visitsouthport.com approximately 6–8 weeks before the show." },
              { emoji: "🎺", title: "The Red Arrows", detail: "The Red Arrows perform at Southport most years, subject to their annual schedule. When they appear, the atmosphere peaks. Nine Hawks, nine smoke trails, formation precision that looks impossible close-up. The beach crowd reaction is something else entirely." },
              { emoji: "⚔️", title: "Warbirds", detail: "Spitfires and Hurricanes from the Battle of Britain Memorial Flight regularly appear at Southport. The sound of a Merlin engine over the beach is the kind of thing that stays with you. Older visitors often go very quiet when the warbirds appear. Understandably." },
              { emoji: "🎪", title: "Ground Events", detail: "Static aircraft displays along the Promenade, food stalls, market traders, fairground rides, and entertainment stages. The ground events are good but secondary, the flying is the show. Plan walking and browsing between flying sets." },
              { emoji: "🎖️", title: "Grandstand Packages", detail: "Paid grandstand packages give reserved seating at the centre of the display line, nearest the Pier. Catering included. Limited number of packages. Book early through the official airshow website. Worth it if you want a guaranteed central position for the headline acts." },
              { emoji: "🏖️", title: "The Beach Itself", detail: "The entire beach is your viewing platform and it&apos;s enormous. Even at 100,000+ attendance, Southport beach absorbs the crowd. You can spread out, find your space, and watch comfortably. The wide flat beach is a genuine structural advantage over city-based events." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Expected Aircraft ── */}
        <section id="aircraft" className="scroll-mt-28">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Display Programme</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Expected Aircraft</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl leading-relaxed">
              Based on the 2025 programme and regular Southport performers. The official 2026 line-up will be confirmed at{" "}
              <a href="https://www.visitsouthport.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-medium">visitsouthport.com</a>{" "}
              typically 6–8 weeks before the show.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AIRCRAFT.map((a) => (
              <div key={a.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{a.emoji}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.tagColor}`}>{a.tag}</span>
                </div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-1">{a.name}</h3>
                <p className="text-[#C9A84C] text-[11px] font-semibold uppercase tracking-wider mb-3">{a.type}</p>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{a.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Day Timeline ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Plan Your Day</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">How the Day Unfolds</h2>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl">
              What happens when, so you can plan your arrival, food stops, and when to be in position for the main acts.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {TIMELINE.map((t, i) => (
              <div key={t.time} className={`flex gap-5 p-5 ${i < TIMELINE.length - 1 ? "border-b border-gray-50" : ""}`}>
                <div className="flex-none w-32 text-right">
                  <span className="text-[#C9A84C] font-black text-sm tabular-nums">{t.time}</span>
                </div>
                <div className="w-px bg-[#C9A84C]/25 flex-none self-stretch" />
                <div className="flex-1 min-w-0 py-0.5">
                  <p className="font-bold text-[#1B2E4B] text-sm mb-1">{t.label}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Viewing Spots ── */}
        <section id="viewing" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Where to Stand</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Best Viewing Positions</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg">
              The display line runs parallel to the beach. Every part of the seafront gives a view, but some spots are better than others.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { position: "Central (Grandstand Area)", quality: "Best", color: "bg-green-600", detail: "The paid grandstand area, centred near the Pier, is the optimal viewing position, directly in front of the main display line. If you want the best view without paying for grandstand, the public beach immediately north and south is still excellent.", tip: "Book grandstand packages early at the official website." },
              { position: "North of the Pier", quality: "Excellent", color: "bg-blue-600", detail: "The beach north of the Pier towards the Promenade hotels is consistently slightly less crowded than the grandstand area. You&apos;re still central enough for good views. Good spot if you want to spread out and not feel hemmed in.", tip: "Good option for families who need space around them." },
              { position: "South (Ainsdale direction)", quality: "Good", color: "bg-amber-600", detail: "Further south along the beach the crowds thin considerably. You&apos;re slightly off-centre to the display line, but still get excellent views. The advantage: space, quieter food queues, and easier access from Ainsdale station.", tip: "Train to Ainsdale station, walk north along the beach." },
            ].map((item) => (
              <div key={item.position} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${item.color} px-6 py-3 flex items-center justify-between`}>
                  <h3 className="font-display font-bold text-white text-base">{item.position}</h3>
                  <span className="text-white/80 text-xs font-semibold">{item.quality}</span>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: item.detail }} />
                  <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg px-3 py-2">
                    <p className="text-xs text-[#1B2E4B] font-semibold">{item.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Parking Table ── */}
        <section id="parking" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Getting There</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Parking &amp; Transport</h2>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl">
              Marine Drive fills before 9am. The train is the easy option. If you must drive, here&apos;s what to know.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1B3D] text-white">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-bold text-xs tracking-wider">Option</th>
                    <th className="text-left px-4 py-3.5 font-bold text-xs tracking-wider">Postcode</th>
                    <th className="text-left px-4 py-3.5 font-bold text-xs tracking-wider">Cost</th>
                    <th className="text-left px-4 py-3.5 font-bold text-xs tracking-wider hidden md:table-cell">Terry&apos;s verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {PARKING.map((p) => (
                    <tr key={p.name} className={`transition-colors ${p.recommended ? "bg-amber-50" : "hover:bg-[#FAF8F5]"}`}>
                      <td className="px-5 py-4 font-semibold text-[#1B2E4B]">
                        {p.recommended && (
                          <span className="inline-block mr-2 text-[10px] bg-[#C9A84C] text-[#1B2E4B] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">Best</span>
                        )}
                        {p.name}
                      </td>
                      <td className="px-4 py-4 text-gray-500 font-mono text-xs">{p.postcode}</td>
                      <td className="px-4 py-4 text-gray-700 font-semibold">{p.cost}</td>
                      <td className="px-4 py-4 text-gray-500 hidden md:table-cell text-sm">{p.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Clock, title: "Timing Advice", items: ["Arrive by 9–9:30am for good beach positioning", "Flying begins 10am–11am each day", "Eat before midday or after 2pm, queues at lunchtime are significant", "Headline military acts typically in mid-to-late afternoon", "Dispersal after 5pm is slow, trains are busy but manageable"] },
              { icon: MapPin, title: "What to Bring", items: ["Earplugs, essential for young children, strongly recommended for everyone", "Folding chairs or a blanket if you want to sit on the beach", "Binoculars, useful for higher-altitude manoeuvres", "Sunscreen, exposed beach, no shade for hours", "Packed food, reduces queuing time significantly", "Waterproof layer. Lancashire in August, always prepared"] },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <item.icon className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">{item.title}</h3>
                <div className="space-y-2">
                  {item.items.map((line) => (
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

        {/* ── Photography ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">Photography Tips</h2>
            <p className="text-gray-600 text-sm mb-6">The beach setting gives you options most airshow venues don&apos;t.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { tip: "Telephoto lens (200mm+)", desc: "Ideal for aircraft photography. If you're on a phone, this is where a clip-on telephoto lens earns its keep." },
                { tip: "Beach angle", desc: "The low shooting position from the beach gives dramatic sky shots. Get down low for aircraft on the horizon." },
                { tip: "Prop blur", desc: "For propeller-driven aircraft (Spitfire, warbirds), a 1/500s shutter gives nice prop blur without losing the aircraft. Jets need faster." },
                { tip: "Overcast days", desc: "Counterintuitively, light overcast gives better aircraft shots than bright sun, no harsh shadows, better detail in the metal." },
              ].map((p) => (
                <div key={p.tip} className="flex gap-3">
                  <Star className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#1B2E4B] text-sm mb-1">{p.tip}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Late Summer Cross-Sell ── */}
        <section>
          <div className="bg-[#1A4020] rounded-2xl p-8 md:p-10 text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">August in Southport</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Do Both in August</h2>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-6">
              The Southport Flower Show is 20–23 August 2026. The Air Show is 29–30 August, the Bank Holiday weekend.
              If you&apos;re travelling from Manchester, Liverpool, or further afield, you could do both and make a proper trip of it.
              Southport in August is worth the effort: the seafront, the restaurants on Lord Street, the beach.
              It all comes together at this time of year.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/southport-flower-show"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm transition-colors">
                Flower Show Guide →
              </Link>
              <Link href="/hotels"
                className="bg-white/10 border border-white/25 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Hotels in Southport
              </Link>
              <a
                href={LATEROOMS.southport}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-white/10 border border-white/25 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Compare on LateRooms →
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Air Show. FAQs</h2>
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

        {/* ── Other Events ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Other Major Southport Events in 2026</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "The Open 2026", month: "12–19 July 2026", desc: "The 154th Open Championship at Royal Birkdale. Southport&apos;s biggest sporting event ever.", href: "/the-open-2026" },
                { name: "Southport Flower Show", month: "20–23 August 2026", desc: "One of England&apos;s most prestigious horticultural shows. Victoria Park. Tickets from £23 early bird.", href: "/guides/southport-flower-show" },
                { name: "Full Events Calendar", month: "All of 2026", desc: "10 major events. Lightport, Comedy Festival, Fireworks Championship and more.", href: "/events" },
              ].map((item) => (
                <Link key={item.name} href={item.href} className="group bg-[#FAF8F5] rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all">
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">{item.month}</p>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                    {item.name} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
