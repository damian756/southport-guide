import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Star,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-year-of-culture-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport 2026 Year of Culture, Elegantly Eccentric Southport, Cristal Palace Southport, Big Top Festival Southport 2026, Southport cultural events 2026",
  alternates: { canonical: `${BASE_URL}/guides/southport-year-of-culture-2026` },
  openGraph: {
    title: "Southport 2026: Elegantly Eccentric | Year of Culture Events",
    description: "Southport's year of culture. Cristal Palace street theatre (April), Big Top Festival (May), Summer Solstice (June), Books Alive! (October). Free events across the town.",
    url: `${BASE_URL}/guides/southport-year-of-culture-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-year-of-culture-2026.webp` }],
  },
};

const EVENTS = [
  {
    slug: "cristal-palace",
    name: "Cristal Palace",
    dates: "3–4 April 2026",
    location: "Lord Street",
    emoji: "💎",
    color: "bg-violet-600",
    tagColor: "bg-violet-100 text-violet-800",
    tag: "Free",
    detail: "French street theatre company Transe Express brings its spectacular show to Lord Street. A 15-metre-wide flying chandelier transforms the street into an open-air ballroom, live music, aerial performance, and dance. Thousands watching from the pavement as the chandelier glows above the Victorian canopies. One of the defining moments of Southport's 2026 programme.",
    practical: "Free to watch on Lord Street. No tickets required. Arrive early for the best view, particularly at the central section under the glass canopies.",
  },
  {
    slug: "big-top-festival",
    name: "Big Top Festival",
    dates: "2–3 May 2026",
    location: "Southport Town Centre",
    emoji: "🎪",
    color: "bg-red-600",
    tagColor: "bg-red-100 text-red-800",
    tag: "Free / Ticketed",
    detail: "World-class modern circus takes over Southport with performances from internationally recognised companies including Circa and Gandini Juggling. Across open-air stages: breathtaking acts, live music, and hands-on workshops for all ages. The artform comes to one of its spiritual homes. Southport has a long tradition of circus and variety performance.",
    practical: "A mix of free outdoor performances and ticketed shows. Full programme at southport2026.com. Workshops suitable for all ages.",
  },
  {
    slug: "summer-solstice",
    name: "Summer Solstice",
    dates: "20 June 2026",
    location: "Victoria Park",
    emoji: "☀️",
    color: "bg-amber-500",
    tagColor: "bg-amber-100 text-amber-800",
    tag: "Ticketed",
    detail: "The longest day of the year, celebrated in Victoria Park with an 8-hour dance event. Street food village, sun terrace, live music. All tickets are VIP. Runs from 2pm to 10pm on Saturday 20 June. A more commercial event than the Year of Culture programme but a significant Southport weekend nonetheless.",
    practical: "Ticketed event, all tickets are VIP. Victoria Park, PR8 2BZ. Runs 2pm–10pm. Check eventbrite or local listings for 2026 tickets.",
  },
  {
    slug: "books-alive",
    name: "Books Alive!",
    dates: "24–31 October 2026",
    location: "Southport Town Centre",
    emoji: "📚",
    color: "bg-teal-600",
    tagColor: "bg-teal-100 text-teal-800",
    tag: "Free / Family",
    detail: "A reimagined literature festival designed for families and young readers, running through half-term week. Storytelling installations across the town, live author performances, workshops, and interactive events that turn Southport into a living storybook. Based on the same creative ambition as Lightport, culture that fills the whole town rather than a single venue.",
    practical: "Free events across the town during half-term (24–31 October). Perfect for families with primary-school age children. Full programme at southport2026.com.",
  },
];

const FAQS = [
  { q: "What is Southport 2026: Elegantly Eccentric?", a: "Southport 2026: Elegantly Eccentric is a year-round cultural programme backed by Sefton Council, the Liverpool City Region Combined Authority, and Culture Liverpool. It brings new large-scale arts and cultural events to Southport alongside the town's established annual events. The programme takes its name from Southport's history as a place of spectacle and eccentric entertainment." },
  { q: "What events are in the Southport 2026 Year of Culture?", a: "The new events are: Lightport (February, now completed), Cristal Palace street theatre on Lord Street (3–4 April), Big Top Festival circus (2–3 May), and Books Alive! family literature festival (24–31 October). The Summer Solstice event at Victoria Park (20 June) also runs during 2026, alongside the returning Flower Show, Air Show, and Fireworks Championship." },
  { q: "Is Cristal Palace free?", a: "Yes. Cristal Palace by Transe Express is a free outdoor street theatre event on Lord Street, 3–4 April 2026. No tickets are required. Turn up, find a good viewing position on Lord Street, and watch the flying chandelier performance." },
  { q: "What is the Big Top Festival?", a: "The Big Top Festival (2–3 May 2026) brings world-class circus and contemporary performance to Southport. Companies confirmed include Circa and Gandini Juggling. A mix of free outdoor performances and ticketed shows across open-air stages in the town centre. Workshops available for families." },
  { q: "When is Books Alive! in Southport?", a: "Books Alive! runs 24–31 October 2026, through the half-term school holiday week. It's a family-oriented literature festival with storytelling installations, live author performances, and interactive workshops across the town." },
  { q: "Where can I find the full Southport 2026 programme?", a: "The official programme website is southport2026.com. Individual events are also listed on visitsouthport.com and promoted through Sefton Council's event channels." },
  { q: "Is the Year of Culture programme free?", a: "Most events are free. Cristal Palace, Big Top Festival outdoor performances, and Books Alive! are free to attend. Some Big Top Festival ticketed shows have a charge. The Summer Solstice event at Victoria Park is separately ticketed. Check individual event listings for the latest information." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Southport 2026: Elegantly Eccentric",
  startDate: "2026-04-03",
  endDate: "2026-10-31",
  description: "Southport's year-round cultural programme. Cristal Palace, Big Top Festival, Summer Solstice, Books Alive!",
  url: `${BASE_URL}/guides/southport-year-of-culture-2026`,
  isAccessibleForFree: true,
  location: {
    "@type": "Place",
    name: "Southport Town Centre",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Southport",
      addressCountry: "GB",
    },
  },
  organizer: { "@type": "Organization", name: "Sefton Council / Culture Liverpool", url: "https://www.southport2026.com" },
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

export default function YearOfCulturePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1A0A40] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-year-of-culture-2026.webp"
            alt="Southport 2026 Elegantly Eccentric — Cristal Palace flying chandelier on Lord Street"
            fill sizes="100vw" quality={90} className="object-cover"
            style={{ objectPosition: "center 40%" }} priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Year-Round · 2026
              </span>
              <span className="text-white/50 text-sm font-medium">Southport · Lord Street &amp; Town Centre</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Elegantly
              <span className="block text-[#C9A84C]">Eccentric</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              Southport&apos;s year of culture. Four new large-scale events. Cristal Palace street theatre,
              Big Top Festival, Summer Solstice, and Books Alive!, plus the town&apos;s biggest year ever
              for established events.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.southport2026.com" target="_blank" rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                southport2026.com →
              </a>
              <a href="#events" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Full Programme
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#1A0A40] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "Apr–Oct", label: "Programme runs", sub: "New events across the year" },
              { icon: MapPin, value: "Lord Street", label: "Key location", sub: "Plus Victoria Park" },
              { icon: Star, value: "Mostly Free", label: "Entry", sub: "Some ticketed shows" },
              { icon: Sparkles, value: "4 New", label: "Major events", sub: "Backed by Culture Liverpool" },
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

        {/* ── What Is It ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">This Is Bigger Than an Events Calendar</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Southport has always been a town with cultural ambitions that didn&apos;t quite match its budget.
                The Victorian boulevard, the pier, the theatre history, it was always a place that put on a show.
                Elegantly Eccentric is the first serious attempt in a long time to lean into that again at scale.
              </p>
              <p>
                The four new events are genuinely different in character: Cristal Palace is French street theatre
                at its most spectacular, a 15-metre flying chandelier over Lord Street is not a thing you see
                every year. The Big Top Festival brings Circa and Gandini Juggling, which are world-class acts
                that play major venues across Europe. Books Alive! is aimed at families and young readers and
                fills half-term in a way Southport has never really had before.
              </p>
              <p>
                This sits alongside the Open Championship in July, the Flower Show in August, the Air Show on
                the Bank Holiday, and the Fireworks in September. I&apos;ve lived here 41 years and I&apos;ve never
                seen a year as packed as 2026. The council description, &apos;look back in 50 years and tell your
                grandchildren I was there&apos;, is a stretch, but it&apos;s not nothing.
              </p>
            </div>
          </div>
        </section>

        {/* ── Events ── */}
        <section id="events" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Programme</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">New Events in 2026</h2>
          </div>
          <div className="space-y-5">
            {EVENTS.map((event) => (
              <div key={event.slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${event.color} px-6 py-4 flex items-center justify-between flex-wrap gap-3`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{event.emoji}</span>
                    <div>
                      <h3 className="font-display font-bold text-white text-xl">{event.name}</h3>
                      <p className="text-white/70 text-sm">{event.dates} · {event.location}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${event.tagColor}`}>{event.tag}</span>
                </div>
                <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <p className="text-gray-700 text-sm leading-relaxed">{event.detail}</p>
                  </div>
                  <div className="bg-[#FAF8F5] rounded-xl p-4">
                    <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">Practical</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.practical}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── The Full Year ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Full Picture</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">2026. Southport&apos;s Busiest Year</h2>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl">The new events sit alongside the biggest roster of established events Southport has ever had.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { month: "February", event: "Lightport", desc: "Immersive light installation by Lucid Creates. Lord Street transformed. Completed.", done: true, href: null },
              { month: "April", event: "Cristal Palace", desc: "French street theatre. Flying chandelier. Lord Street.", done: false, href: "/guides/southport-year-of-culture-2026" },
              { month: "April", event: "Sausage & Cider Festival", desc: "Bavarian food festival. Victoria Park. 18 April.", done: false, href: "/guides/southport-sausage-cider-festival" },
              { month: "May", event: "Big Top Festival", desc: "World-class circus. Circa, Gandini Juggling.", done: false, href: "/guides/southport-year-of-culture-2026" },
              { month: "June", event: "Armed Forces Festival", desc: "Town-wide military celebration. Free. 27–28 June.", done: false, href: "/guides/southport-armed-forces-festival" },
              { month: "June", event: "Summer Solstice", desc: "8-hour dance event. Victoria Park. 20 June.", done: false, href: "/guides/southport-year-of-culture-2026" },
              { month: "July", event: "The Open Championship", desc: "Royal Birkdale. 12–19 July. The 154th Open.", done: false, href: "/the-open-2026" },
              { month: "August", event: "Southport Flower Show", desc: "Victoria Park. 20–23 August. Tickets from £23.", done: false, href: "/guides/southport-flower-show" },
              { month: "August", event: "Southport Air Show", desc: "Free. Southport Beach. 29–30 August.", done: false, href: "/guides/southport-air-show" },
              { month: "September", event: "Fireworks Championship", desc: "Victoria Park. 26–27 September. Tickets £12.", done: false, href: "/guides/southport-fireworks-championship" },
              { month: "October", event: "Comedy Festival", desc: "Victoria Park Marquee. 2–18 October. 17 nights.", done: false, href: "/guides/southport-comedy-festival" },
              { month: "October", event: "Books Alive!", desc: "Family literature festival. Half-term week.", done: false, href: "/guides/southport-year-of-culture-2026" },
            ].map((item, i) => (
              <div key={`${item.month}-${item.event}`} className={`flex gap-4 p-4 items-start ${i < 11 ? "border-b border-gray-50" : ""} ${item.done ? "opacity-50" : ""}`}>
                <div className="flex-none w-20 text-right">
                  <span className="text-[#C9A84C] font-bold text-sm">{item.month}</span>
                </div>
                <div className="w-px bg-[#C9A84C]/20 flex-none self-stretch" />
                <div className="flex-1 min-w-0">
                  {item.href ? (
                    <Link href={item.href} className="font-bold text-[#1B2E4B] text-sm hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                      {item.event} <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  ) : (
                    <p className="font-bold text-[#1B2E4B] text-sm">{item.event} {item.done && <span className="text-gray-400 font-normal">(completed)</span>}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why It Matters ── */}
        <section>
          <div className="bg-[#1A0A40] rounded-2xl p-8 md:p-10 text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Context</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Why 2026 Is Different</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-white/70 text-sm leading-relaxed">
              <div>
                <p className="text-[#C9A84C] font-bold text-base mb-2">Backed at a serious level</p>
                <p>Funded by Sefton Council, the Liverpool City Region Combined Authority, and Culture Liverpool, the same organisation behind Liverpool&apos;s major cultural events. This isn&apos;t a local authority hobby project.</p>
              </div>
              <div>
                <p className="text-[#C9A84C] font-bold text-base mb-2">MLEC is coming in 2027</p>
                <p>The Marine Lake Events Centre opens next year. 515,000 additional visitors per year projected. The 2026 cultural programme is part of repositioning Southport ahead of that opening. The town is building its case as a cultural destination.</p>
              </div>
              <div>
                <p className="text-[#C9A84C] font-bold text-base mb-2">The Open in the same year</p>
                <p>The 154th Open Championship at Royal Birkdale in July 2026 brings international attention to Southport. The cultural events give visitors more reason to come beyond golf and stay beyond the week.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport 2026. FAQs</h2>
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

      </div>
    </GuideLayout>
  );
}
