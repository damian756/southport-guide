import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Star,
  Clock,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-armed-forces-festival");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport Armed Forces Festival 2026, Armed Forces Day Southport, Southport military parade 2026, King's Gardens Southport",
  alternates: { canonical: `${BASE_URL}/guides/southport-armed-forces-festival` },
  openGraph: {
    title: "Southport Armed Forces Festival 2026 | 27–28 June · Free Event",
    description: "Town-wide Armed Forces Festival in Southport, 27–28 June 2026. Military parades on the Promenade, fly-overs, Drumhead Service, vehicles on display. Free to attend.",
    url: `${BASE_URL}/guides/southport-armed-forces-festival`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-armed-forces-festival.webp` }],
  },
};

const LOCATIONS = [
  { place: "The Promenade", desc: "The main parade route. Thousands line the seafront to watch the military march past. The backdrop of the Irish Sea behind the columns of service personnel is genuinely moving.", highlight: "Main Parade" },
  { place: "King's Gardens", desc: "Formal gardens adjacent to the Promenade, one of the key gathering points for the festival. Memorial service area and a natural focus point for veterans and family groups.", highlight: "Memorial Area" },
  { place: "Princes Park", desc: "Static display area for military vehicles, equipment, and interactive exhibits. Families with children tend to gravitate here, hands-on elements and military machinery up close.", highlight: "Vehicle Displays" },
  { place: "The Atkinson", desc: "Southport's cultural centre on Lord Street plays a role in the programme, exhibitions and events related to armed forces heritage. Worth checking the specific programme for 2026.", highlight: "Cultural Programme" },
  { place: "Town Centre", desc: "The wider town centre hosts additional entertainment, cadet displays, and community stalls throughout both days. The whole of Southport becomes part of the event rather than a single venue.", highlight: "Wider Festival" },
];

const FAQS = [
  { q: "When is the Southport Armed Forces Festival 2026?", a: "The Southport Armed Forces Festival 2026 takes place on Saturday 27 and Sunday 28 June 2026." },
  { q: "Is the Southport Armed Forces Festival free?", a: "Yes, the Armed Forces Festival is a free town-wide event. There is no entry charge to attend the parades, fly-overs, vehicle displays, or entertainment across the Promenade, King's Gardens, Princes Park, and the town centre." },
  { q: "What happens at the Southport Armed Forces Festival?", a: "The festival includes a Drumhead Service (the traditional open-air armed forces memorial service), military parades on the Promenade, fly-overs, static vehicle and equipment displays, live entertainment, cadet displays, and community events. It spans multiple locations across the town." },
  { q: "Is the Armed Forces Festival just for veterans?", a: "Not at all, it's a community event for everyone. Veterans, service families, cadets, and members of the public are all welcome. It's a family-friendly event and many people attend purely for the spectacle of the parade and fly-overs." },
  { q: "Why is the 2026 festival significant?", a: "The 2026 Armed Forces Festival is a proof-of-concept event supporting Southport's bid to host the full National Armed Forces Day in 2027. If the 2026 festival goes well, Southport hopes to host one of the UK's largest National Armed Forces Day celebrations the following year." },
  { q: "Will there be a fly-over at the Southport Armed Forces Festival?", a: "Military fly-overs are part of the planned programme. The specific aircraft will be confirmed closer to the event. The Promenade is the best viewing location for fly-overs as the aircraft pass over the coast." },
  { q: "Where should I go for the Armed Forces Festival?", a: "For the parade, the Promenade is the main location. For military vehicles and family-friendly interactive displays, Princes Park is the key area. For the Drumhead Service and memorial events, King's Gardens. The Atkinson on Lord Street also hosts related events. The full programme with timings will be published by Sefton Council ahead of the event." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Southport Armed Forces Festival 2026",
  startDate: "2026-06-27",
  endDate: "2026-06-28",
  description: "Town-wide Armed Forces Festival in Southport, 27–28 June 2026. Free to attend.",
  url: `${BASE_URL}/guides/southport-armed-forces-festival`,
  isAccessibleForFree: true,
  location: {
    "@type": "Place",
    name: "Southport Promenade and Town Centre",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marine Drive",
      addressLocality: "Southport",
      postalCode: "PR8 1RX",
      addressCountry: "GB",
    },
  },
  organizer: { "@type": "Organization", name: "Sefton Council" },
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

export default function ArmedForcesFestivalPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#0D1A30] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-armed-forces-festival.webp"
            alt="Southport Armed Forces Festival — military parade on the seafront with fly-over"
            fill sizes="100vw" quality={90} className="object-cover"
            style={{ objectPosition: "center 35%" }} priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A30] via-[#0D1A30]/50 to-[#0D1A30]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Free Event
              </span>
              <span className="text-white/50 text-sm font-medium">Southport · 27–28 June 2026</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport Armed
              <span className="block text-[#C9A84C]">Forces Festival</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              A free town-wide celebration of the armed forces across Southport&apos;s Promenade,
              King&apos;s Gardens, Princes Park, and town centre. Military parades, fly-overs,
              Drumhead Service, and vehicle displays. 27–28 June 2026.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#programme" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                What&apos;s On →
              </a>
              <a href="#locations" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Festival Locations
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#0D1A30] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "27–28 Jun", label: "When", sub: "Saturday & Sunday" },
              { icon: MapPin, value: "Town-wide", label: "Where", sub: "Promenade to Lord Street" },
              { icon: Star, value: "Free", label: "Entry", sub: "No tickets required" },
              { icon: Users, value: "2 Days", label: "Duration", sub: "Full programme both days" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">This One Matters More Than Usual in 2026</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Southport has a genuine connection with the armed forces. Merseyside has always had strong
                military ties and you feel it in the town in a way that&apos;s not performative.
                The Armed Forces Festival on the Promenade is one of those events where the emotion is real.
                The Drumhead Service in particular, an open-air memorial service with serving personnel,
                veterans, and cadets, is worth attending even if you&apos;ve never been to anything like it before.
              </p>
              <p>
                The 2026 festival carries extra significance. Southport is bidding to host the full
                National Armed Forces Day in 2027, which would be one of the UK&apos;s largest
                single-day events, potentially combined with the Air Show. The 2026 festival is
                essentially the proof-of-concept. The town wants to show it can do this at scale.
              </p>
              <p>
                It&apos;s free, it spans the entire town, and it&apos;s one of those events where you genuinely
                feel proud of where you live. The Promenade is the main location for the parade and fly-overs.
                Get there early for a good position on the seafront.
              </p>
            </div>
          </div>
        </section>

        {/* ── Programme ── */}
        <section id="programme" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What&apos;s On</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Festival Programme</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "⛪", title: "Drumhead Service", detail: "The traditional open-air armed forces memorial service. Conducted by military chaplains with serving personnel, veterans, cadets, and the public. One of the most moving events in the programme. Timings confirmed by Sefton Council ahead of the event." },
              { emoji: "🎺", title: "Military Parade", detail: "Columns of serving personnel, veterans, and cadets marching along the Promenade. The seafront backdrop makes this one of the most impressive settings for a military parade in the North of England. The crowd lines both sides of the route." },
              { emoji: "✈️", title: "Fly-Overs", detail: "Military aircraft fly-overs over the Promenade and seafront. Specific aircraft confirmed ahead of the event. The coastal approach gives a clear sky for the passes. The Promenade is the prime viewing location." },
              { emoji: "🚛", title: "Vehicle Displays", detail: "Military vehicles on static display at Princes Park, armoured vehicles, trucks, and equipment. Hands-on elements for families. Military personnel on hand to answer questions. A particular draw for children." },
              { emoji: "🎭", title: "Live Entertainment", detail: "Music and entertainment across the festival sites throughout both days. Military bands, community performances, and family activities. The full entertainment programme will be published by Sefton Council ahead of the event." },
              { emoji: "🎖️", title: "Cadets & Veterans", detail: "Cadet forces from across Merseyside participate. Veterans&apos; organisations have a prominent presence throughout the festival. The event is explicitly inclusive of all service eras, from veterans of earlier conflicts to those who served recently." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Locations ── */}
        <section id="locations" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Where to Go</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Festival Locations</h2>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl">
              The festival spans the whole of Southport, not a single venue. Here&apos;s what&apos;s where.
            </p>
          </div>
          <div className="space-y-3">
            {LOCATIONS.map((loc) => (
              <div key={loc.place} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-5">
                <div className="flex-none">
                  <span className="inline-block bg-[#0D1A30] text-[#C9A84C] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">{loc.highlight}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2E4B] text-base mb-1">{loc.place}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{loc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2027 Context ── */}
        <section>
          <div className="bg-[#0D1A30] rounded-2xl p-8 md:p-10 text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Looking Ahead</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Southport Is Bidding for National Armed Forces Day 2027</h2>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-6">
              The 2026 festival is Southport&apos;s proof-of-concept for hosting the full National Armed Forces Day in 2027,
              one of the UK&apos;s largest single-day events. The ambition is to combine it with the Air Show for a
              major Bank Holiday weekend event. The 2026 festival is where that bid gets made or broken.
            </p>
            <Link href="/guides/southport-air-show"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm hover:text-white transition-colors">
              Southport Air Show guide, also Bank Holiday Weekend <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Practical ── */}
        <section id="practical" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Practical Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: MapPin, title: "Getting There", items: ["The Promenade (PR8 1RX) is the main hub for parade and fly-overs", "By train: Southport station (Merseyrail from Liverpool), 15 min walk to Promenade", "Town centre car parks: 10–15 min walk to King's Gardens and Princes Park", "Marine Drive car park: on the Promenade, fills early on busy event weekends"] },
              { icon: Clock, title: "Planning Tips", items: ["Full programme with timings published by Sefton Council ahead of the event", "Promenade positions go early for the parade, arrive before the march begins", "Princes Park vehicle displays are less crowded and more accessible for families", "The Atkinson events inside may require tickets, check ahead at theatkinson.co.uk"] },
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

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Armed Forces Festival. FAQs</h2>
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
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Southport Events in 2026</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "The Open Championship", month: "12–19 July 2026", desc: "Royal Birkdale. The 154th Open. Southport's biggest sporting event.", href: "/the-open-2026" },
                { name: "Southport Air Show", month: "29–30 August 2026", desc: "Free. 100,000+ spectators. Bank Holiday weekend on Southport Beach.", href: "/guides/southport-air-show" },
                { name: "Flower Show", month: "20–23 August 2026", desc: "One of England's most prestigious horticultural shows. Victoria Park.", href: "/guides/southport-flower-show" },
              ].map((item) => (
                <Link key={item.name} href={item.href} className="group bg-[#FAF8F5] rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all">
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">{item.month}</p>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                    {item.name} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
