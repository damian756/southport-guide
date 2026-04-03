import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Ticket,
  Clock,
  Star,
  Mic,
} from "lucide-react";
import SensoryInfoCard from "@/app/components/SensoryInfoCard";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-comedy-festival");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport Comedy Festival 2026, Southport Comedy Festival tickets, Southport Comedy Festival lineup, Victoria Park comedy marquee",
  alternates: { canonical: `${BASE_URL}/guides/southport-comedy-festival` },
  openGraph: {
    title: "Southport Comedy Festival 2026 | 2–18 October · Lineup & Tickets",
    description: "15th annual Southport Comedy Festival. Luxury heated marquee at Victoria Park, 2–18 October 2026. Confirmed acts include Henning Wehn and Gary Delaney.",
    url: `${BASE_URL}/guides/southport-comedy-festival`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-comedy-festival.webp` }],
  },
};

const CONFIRMED_ACTS = [
  { name: "Henning Wehn", desc: "German Comedy Ambassador to the UK. Regular Mock the Week, Would I Lie to You, QI. Consistently one of the strongest live acts on the circuit." },
  { name: "Gary Delaney", desc: "BAFTA-nominated. The UK's best one-liner comedian. Every sentence is a punchline. Not for people who like build-up jokes." },
  { name: "Scott Bennett", desc: "Northern comic. Clean, sharp, family-friendly, but funny. Won Best Show at multiple festivals. One of the most consistent live performers around." },
  { name: "Laura Smyth", desc: "Stand-up comedian and writer. Fresh, sharp material. One of the breakout acts of the past few years on the UK circuit." },
];

const FAQS = [
  { q: "When is the Southport Comedy Festival 2026?", a: "The Southport Comedy Festival 2026 runs from Friday 2 October to Sunday 18 October 2026. 17 days. It's the 15th annual festival." },
  { q: "Where is the Southport Comedy Festival?", a: "The festival takes place in a luxury heated and seated marquee in the grounds of Victoria Park, Southport. The entrance is via the Esplanade, postcode PR8 1RX." },
  { q: "How do I buy tickets for the Southport Comedy Festival?", a: "Tickets are available through southportcomedyfestival.com, Skiddle, and Ticketmaster. Shows vary in price depending on the act, book early for popular shows as several sell out each year. More acts will be announced through 2026." },
  { q: "Who is performing at the Southport Comedy Festival 2026?", a: "Confirmed acts so far include Henning Wehn, Gary Delaney, Scott Bennett, and Laura Smyth. More acts will be announced over the coming months. Check southportcomedyfestival.com for the full programme as it builds." },
  { q: "How many people attend the Southport Comedy Festival?", a: "The 2025 festival attracted over 6,000 attendees with nine sell-out shows. The festival has grown significantly year on year since it began in 2012. It's now a substantial event in the Southport calendar." },
  { q: "Is the marquee warm?", a: "Yes, the venue is a luxury heated and seated marquee specifically designed for the event. Courtesy of Elite Events. It's comfortable even in a cold October evening. You won't need to wear your coat inside." },
  { q: "Is there parking at Victoria Park for the comedy festival?", a: "Victoria Park has limited on-site parking. Town centre car parks are the most practical option. 10–15 minutes' walk from the Esplanade entrance. By train: Southport station is approximately 20 minutes' walk. Bus services also run to the town centre." },
  { q: "Can I go to the comedy festival with children?", a: "Some shows are suitable for families and some are not, it depends entirely on the act. Check the individual show listings at southportcomedyfestival.com for content guidance before booking. Scott Bennett's shows, for example, are generally family-friendly. Others are adult content." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Southport Comedy Festival 2026",
  startDate: "2026-10-02",
  endDate: "2026-10-18",
  description: "15th annual Southport Comedy Festival. 17 nights in a luxury heated marquee at Victoria Park, Southport.",
  url: `${BASE_URL}/guides/southport-comedy-festival`,
  location: {
    "@type": "Place",
    name: "Victoria Park Marquee, Southport",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Esplanade",
      addressLocality: "Southport",
      postalCode: "PR8 1RX",
      addressCountry: "GB",
    },
  },
  organizer: { "@type": "Organization", name: "Elite Events", url: "https://southportcomedyfestival.com" },
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

export default function ComedyFestivalPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1C0A00] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-comedy-festival.webp"
            alt="Southport Comedy Festival — packed luxury marquee at Victoria Park"
            fill sizes="100vw" quality={90} className="object-cover"
            style={{ objectPosition: "center 45%" }} priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0A00] via-[#1C0A00]/55 to-[#1C0A00]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                15th Annual Festival
              </span>
              <span className="text-white/50 text-sm font-medium">Victoria Park Marquee · 2–18 October 2026</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Comedy Festival</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              17 nights of live comedy in a luxury heated marquee at Victoria Park.
              Over 6,000 tickets sold in 2025. Confirmed 2026 acts include Henning Wehn,
              Gary Delaney, and more to be announced.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://southportcomedyfestival.com/whats-on" target="_blank" rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                Get Tickets →
              </a>
              <a href="#lineup" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                2026 Lineup So Far
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#1C0A00] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "2–18 Oct", label: "When", sub: "17 nights" },
              { icon: MapPin, value: "PR8 1RX", label: "Where", sub: "Victoria Park Marquee" },
              { icon: Star, value: "6,000+", label: "Attend each year", sub: "9 sell-outs in 2025" },
              { icon: Ticket, value: "15th Year", label: "Anniversary", sub: "Est. 2012" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Southport Does Comedy Better Than You&apos;d Expect</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                The Comedy Festival has been running since 2012 and has got considerably better each year.
                The marquee setup works well, heated, seated properly, decent acoustics for a temporary venue.
                It feels like a proper theatre, not a converted tent.
              </p>
              <p>
                The acts they get are genuinely good. Henning Wehn is excellent live, better than on TV.
                Gary Delaney is one of the best one-liner comics in the country and Southport gets him
                on a proper stage in a venue that&apos;s the right size for that kind of comedy.
                Nine sell-out shows in 2025. This is not a struggling fringe event.
              </p>
              <p>
                One practical point: the more popular shows sell out well in advance.
                When they announce the line-up for individual dates, book the shows you want immediately.
                Don&apos;t wait. The full programme builds up through 2026, sign up to their mailing list
                at southportcomedyfestival.com to get notified when new shows go on sale.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2026 Lineup ── */}
        <section id="lineup" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Confirmed So Far</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">2026 Lineup</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl leading-relaxed">
              First acts confirmed. More to be announced throughout 2026, check{" "}
              <a href="https://southportcomedyfestival.com/whats-on" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-medium">southportcomedyfestival.com</a>{" "}
              for the full programme as it builds.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {CONFIRMED_ACTS.map((act) => (
              <div key={act.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex gap-4">
                <div className="flex-none w-12 h-12 rounded-full bg-[#1C0A00] flex items-center justify-center">
                  <Mic className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{act.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-[#FAF8F5] rounded-2xl p-6 text-center">
            <p className="text-gray-600 text-sm mb-3">More acts being announced throughout 2026</p>
            <a href="https://southportcomedyfestival.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors">
              Sign up at southportcomedyfestival.com <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ── The Venue ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Venue</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">What to Expect</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🎪", title: "The Marquee", detail: "A luxury heated and seated marquee in Victoria Park, courtesy of Elite Events. Tiered seating, proper acoustics, a real stage. Comfortable even on a cold October night. Entrance via the Esplanade, PR8 1RX." },
              { emoji: "🎟️", title: "How to Book", detail: "Tickets via southportcomedyfestival.com, Skiddle, or Ticketmaster. Shows vary in price depending on the act. Book early, popular shows sell out. The full programme builds over the year as new acts are confirmed." },
              { emoji: "🍺", title: "Bar & Atmosphere", detail: "Bar available at the venue. The atmosphere is that of a proper comedy club night, not a theatre with rules about drinks. The audience is there to enjoy themselves. Shows typically run 60–90 minutes." },
              { emoji: "👨‍👩‍👧", title: "Family Shows", detail: "Some shows are family-friendly, some are adult content. Check individual show listings before booking. Scott Bennett and similar acts are suitable for older children. Gary Delaney is firmly adult." },
              { emoji: "🚗", title: "Getting There", detail: "Victoria Park Esplanade entrance, PR8 1RX. Town centre car parks 10–15 min walk. Southport train station 20 min walk, or short taxi. Bus services run to the town centre from across the region." },
              { emoji: "📅", title: "17 Nights", detail: "The festival runs 2 October to 18 October. 17 days. Most nights have one show. Some nights have two shows (early and late). Not all nights are the same act, browse by show rather than by date." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            ))}
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
              { icon: MapPin, title: "Venue & Getting Here", items: ["Victoria Park Marquee, entrance via Esplanade, PR8 1RX", "Town centre car parks: 10–15 min walk", "Southport railway station: approximately 20 min walk", "Taxi from town centre: 5 min and inexpensive"] },
              { icon: Clock, title: "Booking Tips", items: ["Book early. 9 shows sold out in 2025", "More acts announced throughout 2026, sign up to the mailing list", "Check show-specific content guidance before booking for children", "Tickets via southportcomedyfestival.com, Skiddle, or Ticketmaster"] },
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

        {/* ── Sensory & Accessibility ── */}
        <SensoryInfoCard
          noiseLevel="high"
          noiseLevelNote="Amplified live comedy in an enclosed marquee. Audience laughter, PA system, occasional music between acts."
          crowdDensity="moderate"
          crowdDensityNote="Fixed seating venue with defined capacity. Predictable environment. Seats are allocated — you know where you will be."
          quietSpace="Outside the marquee between shows. Victoria Park itself is calm. The foyer area is quieter than inside the main tent."
          sensoryTriggers={["Indoor enclosed space with amplified sound", "Unexpected audience laughter and applause", "Darkness during performances", "Sudden punchlines causing crowd noise peaks", "Crowded bar area before shows"]}
          sunflowerNote="Contact southportcomedyfestival.com ahead of your visit for accessibility requirements. Fixed seating means a predictable and manageable environment."
          lowSensoryTip="Aisle seats give the clearest exit route if you need to leave. The marquee is heated and comfortable, which removes cold as a compounding sensory factor. October weeknights are quieter than weekends. Midweek shows tend to have smaller audiences."
        />

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Comedy Festival. FAQs</h2>
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
        <section className="bg-[#1C0A00] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Southport Comedy Festival 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Book Early. Shows Sell Out.</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Nine sell-out shows in 2025. The popular acts go fast. Check the full programme and book at the official website.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://southportcomedyfestival.com/whats-on" target="_blank" rel="noopener noreferrer"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">
              Get Tickets, southportcomedyfestival.com
            </a>
            <Link href="/hotels" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">
              Hotels in Southport →
            </Link>
          </div>
        </section>

        {/* ── Other Events ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Southport Events in 2026</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Fireworks Championship", month: "26–27 September 2026", desc: "Pyro-musical competition at Victoria Park. Tickets £12. No gate sales.", href: "/guides/southport-fireworks-championship" },
                { name: "Southport Air Show", month: "29–30 August 2026", desc: "Free. 100,000+ on Southport Beach. RAF displays, Red Arrows, warbirds.", href: "/guides/southport-air-show" },
                { name: "Full Events Calendar", month: "All of 2026", desc: "10+ major events from spring to autumn.", href: "/events" },
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
