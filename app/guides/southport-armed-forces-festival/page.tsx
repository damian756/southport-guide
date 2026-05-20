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
    "Southport Armed Forces Festival 2026, Armed Forces Day Southport, Southport military parade 2026, King's Gardens Southport, National Armed Forces Day Southport 2027, Southport wartime history",
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
  { place: "King's Gardens", desc: "Formal gardens adjacent to the Promenade, the key gathering point for the Drumhead Service and memorial events. Veterans' organisations have a strong presence here throughout both days.", highlight: "Memorial Area" },
  { place: "Princes Park", desc: "Static display area for military vehicles, equipment, and interactive exhibits. Families with children tend to gravitate here. Hands-on elements and military machinery up close.", highlight: "Vehicle Displays" },
  { place: "The Atkinson", desc: "Southport's cultural centre on Lord Street hosts exhibitions and events related to armed forces heritage. Worth checking the specific programme for 2026 at theatkinson.co.uk.", highlight: "Cultural Programme" },
  { place: "Town Centre", desc: "Lord Street and the wider town centre hosts additional entertainment, cadet displays, and community stalls throughout both days. The whole of Southport becomes part of the event.", highlight: "Wider Festival" },
];

const FAQS = [
  { q: "When is the Southport Armed Forces Festival 2026?", a: "The Southport Armed Forces Festival 2026 takes place on Saturday 27 and Sunday 28 June 2026." },
  { q: "Is the Southport Armed Forces Festival free?", a: "Yes. The Armed Forces Festival is a free town-wide event. There is no entry charge to attend the parades, fly-overs, vehicle displays, or entertainment across the Promenade, King's Gardens, Princes Park, and the town centre." },
  { q: "What happens at the Southport Armed Forces Festival?", a: "The festival includes a Drumhead Service, military parades on the Promenade, fly-overs, static vehicle and equipment displays, live entertainment, cadet displays, and community events. It spans multiple locations across the town over two full days." },
  { q: "Is the Armed Forces Festival just for veterans?", a: "Not at all. It is a community event for everyone. Veterans, service families, cadets, and members of the public are all welcome. It is a family-friendly event and many people attend purely for the spectacle of the parade and fly-overs." },
  { q: "Why is the 2026 festival significant?", a: "The 2026 Armed Forces Festival is a proof-of-concept event supporting Southport's bid to host the full National Armed Forces Day in 2027. If the 2026 festival demonstrates the town can deliver a major event at scale, Southport hopes to host one of the UK's largest Armed Forces Day celebrations the following year, potentially combined with the Air Show." },
  { q: "Will there be a fly-over at the Southport Armed Forces Festival?", a: "Military fly-overs are part of the planned programme. The specific aircraft will be confirmed closer to the event. The Promenade is the best viewing location as the aircraft pass over the coast." },
  { q: "What is the connection between Southport and the Second World War?", a: "Southport has genuine wartime significance. Children were evacuated here from Bootle and Liverpool during the Blitz. RAF Woodvale at Ainsdale helped defend the Irish Sea and Liverpool. Pleasureland was taken over by the Air Ministry during the war. Families across Southport, Bootle, Seaforth and Merseyside have direct personal connections to that history." },
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
            alt="Southport war memorial — the Grade II* listed monument in King's Gardens, focal point of the Armed Forces Festival"
            fill sizes="100vw" quality={90} className="object-cover"
            style={{ objectPosition: "center 35%" }} priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
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
              A free town-wide celebration across the Promenade, King&apos;s Gardens, Princes Park, and town centre.
              Military parades, fly-overs, Drumhead Service, and vehicle displays. 27–28 June 2026.
              And the beginning of something bigger.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#programme" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                What&apos;s On →
              </a>
              <a href="#wartime" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Southport&apos;s Wartime Story
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">This One Matters More Than Usual</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Southport has a genuine connection with the armed forces that goes deeper than a two-day event
                on the seafront. Merseyside was at the heart of the Second World War effort. Children were
                evacuated here from Bootle and Liverpool during the Blitz. RAF Woodvale at Ainsdale helped
                defend the Irish Sea corridor and Liverpool. Pleasureland itself was commandeered by the
                Air Ministry during the war. Families across this area have direct personal connections to
                that history, and those connections are still here in living memory.
              </p>
              <p>
                The Armed Forces Festival on the Promenade captures something real. The Drumhead Service in
                particular, an open-air memorial service with serving personnel, veterans and cadets, is worth
                attending even if you&apos;ve never been to anything like it before. The emotion is not
                performed. It&apos;s the genuine thing.
              </p>
              <p>
                The 2026 festival carries extra weight. There is a serious conversation in Southport about
                turning this into something much larger, potentially the UK&apos;s biggest Armed Forces Day
                event. A full week, not just a weekend. The whole town, not just the Promenade.
                The 2026 festival is where that ambition gets tested. It is worth your attention.
              </p>
            </div>
          </div>
        </section>

        {/* ── Wartime History ── */}
        <section id="wartime" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Why It Matters Here</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport&apos;s Wartime Story</h2>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl">
              This isn&apos;t just history written in books. For many families across Southport, Bootle,
              Liverpool and the wider region, it is personal.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                emoji: "✈️",
                title: "RAF Woodvale",
                body: "The airfield at Ainsdale, a few miles south of Southport town centre, was a working RAF base that played a direct role in defending the Irish Sea corridor and the Port of Liverpool during the Second World War. The base still operates today as a mixed civilian and military airfield. Its presence is why the Armed Forces connection to this part of Merseyside is more than symbolic.",
              },
              {
                emoji: "🚂",
                title: "The Evacuees",
                body: "During the Blitz, children were evacuated from Bootle, Liverpool, Seaforth, and the heavily bombed areas around the docks to the relative safety of Southport. Families across this region have parents and grandparents who were evacuated here, or who took in evacuees. The connection between Southport and the communities of Liverpool and Bootle runs through that shared wartime experience.",
              },
              {
                emoji: "🎡",
                title: "Pleasureland and the War Effort",
                body: "Southport&apos;s famous Pleasureland amusements were taken over by the Air Ministry during the Second World War. Fairground operators and entertainment businesses across the region contributed to the war effort in ways that are part of local family histories. Some of those families still have businesses and connections in Southport today.",
              },
              {
                emoji: "🔥",
                title: "The Home Front",
                body: "Bombs fell on Southport. Lives were lost. Homes were damaged. Fire service personnel dealt with the aftermath of the bombing of Liverpool and Bootle, the kind of scenes that take a lifetime to process. The story of ordinary people doing extraordinary things in impossible circumstances is not abstract history here. It belongs to specific families, specific streets, specific names.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-[#FAF8F5] rounded-2xl p-6 border border-gray-100">
            <p className="text-gray-700 text-[1.05rem] leading-relaxed italic">
              &ldquo;I am sure there are many families across this area with their own stories to tell.
              Stories of service, evacuation, loss, survival, humour, hardship. Perhaps now is the time
              to tell them, before those memories are lost forever.&rdquo;
            </p>
            <p className="text-sm text-[#C9A84C] font-semibold mt-3">Local community voice, May 2026</p>
          </div>
        </section>

        {/* ── Programme ── */}
        <section id="programme" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What&apos;s On</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Festival Programme 2026</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "⛪", title: "Drumhead Service", detail: "The traditional open-air armed forces memorial service. Conducted by military chaplains with serving personnel, veterans, cadets, and the public. One of the most genuinely moving events in the programme." },
              { emoji: "🎺", title: "Military Parade", detail: "Serving personnel, veterans, and cadets marching along the Promenade. The seafront backdrop makes this one of the most impressive settings for a military parade in the North of England." },
              { emoji: "✈️", title: "Fly-Overs", detail: "Military aircraft fly-overs over the Promenade and seafront. Specific aircraft confirmed closer to the event. The coastal approach gives a clear sky for the passes." },
              { emoji: "🚛", title: "Vehicle Displays", detail: "Military vehicles on static display at Princes Park. Armoured vehicles, trucks, and equipment. Hands-on elements for families. Military personnel available to answer questions." },
              { emoji: "🎭", title: "Live Entertainment", detail: "Music and entertainment across the festival sites throughout both days. Military bands, community performances, and family activities. Full programme published by Sefton Council ahead of the event." },
              { emoji: "🎖️", title: "Cadets and Veterans", detail: "Cadet forces from across Merseyside participate. Veterans&apos; organisations have a prominent presence throughout the festival. All service eras are represented and honoured." },
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
              The festival spans the whole of Southport. Here&apos;s what&apos;s where.
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

        {/* ── 2027 Vision ── */}
        <section id="vision" className="scroll-mt-28">
          <div className="bg-[#0D1A30] rounded-2xl p-8 md:p-12 text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">The Bigger Picture</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5">
              Could Southport Host the UK&apos;s Biggest Armed Forces Day?
            </h2>
            <div className="space-y-4 text-white/75 leading-relaxed max-w-3xl mb-8">
              <p>
                There is a serious and growing conversation in Southport about taking the Armed Forces
                Festival well beyond its current two-day format. The vision, which has support from local
                business owners, community leaders, and armed forces organisations, is for a full week of
                events spread across the entire town.
              </p>
              <p>
                The practical case for Southport is strong. The Marine Lake, the Promenade, the parks, the
                wide seafront, and the town&apos;s existing events infrastructure all lend themselves to a
                large-scale armed forces event. Unlike some coastal towns, Southport does not need to rely
                on tides or close significant roads to host events at scale.
              </p>
              <p>
                The vision includes elements that would be genuinely distinctive: a 1940s heritage area
                covering the wartime story of the region, a Marine Lake spectacle, the Red Arrows over the
                seafront, simulators and interactive displays for young people, cadet challenges, and an
                event that honours veterans from all eras rather than just recent conflicts. Combine it
                with the Air Show and you have a Bank Holiday weekend like nothing else on the UK coast.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[
                { emoji: "🔴", label: "Red Arrows over the seafront" },
                { emoji: "🪖", label: "Vintage military vehicles and tanks" },
                { emoji: "🎵", label: "1940s swing to modern family entertainment" },
                { emoji: "🌊", label: "Marine Lake pyrotechnic show" },
                { emoji: "🎓", label: "Simulators and cadet challenges" },
                { emoji: "🏪", label: "Street food, markets and family zones" },
                { emoji: "📸", label: "1940s heritage area and storytelling" },
                { emoji: "🎖️", label: "Veterans from all service eras" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-xl p-3 flex items-center gap-3 text-sm">
                  <span className="text-xl flex-none">{item.emoji}</span>
                  <span className="text-white/80 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm italic mb-5">
              The 2026 festival is the proof of concept. The town is watching. So, by all accounts, is the Ministry of Defence.
            </p>
            <Link href="/guides/southport-air-show"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm hover:text-white transition-colors">
              Southport Air Show 2026: also August Bank Holiday weekend <ArrowRight className="w-4 h-4" />
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
              { icon: MapPin, title: "Getting There", items: [
                "The Promenade (PR8 1RX) is the main hub for parade and fly-overs",
                "By train: Southport station (Merseyrail from Liverpool Central), 15 min walk to the Promenade",
                "Town centre car parks: 10–15 min walk to King's Gardens and Princes Park",
                "Marine Drive car park: on the Promenade, fills early on busy event weekends",
              ]},
              { icon: Clock, title: "Planning Tips", items: [
                "Full programme with timings published by Sefton Council ahead of the event",
                "Promenade positions go early for the parade. Arrive before the march starts",
                "Princes Park vehicle displays are less crowded and more accessible for families",
                "The Atkinson events may require tickets. Check ahead at theatkinson.co.uk",
              ]},
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
                { name: "The Open Championship", month: "12–19 July 2026", desc: "Royal Birkdale. The 154th Open. Southport's biggest sporting event in decades.", href: "/the-open-2026" },
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
