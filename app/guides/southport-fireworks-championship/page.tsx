import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Car,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Ticket,
  Clock,
  Star,
  Music,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-fireworks-championship");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "British Musical Fireworks Championship 2026, Southport fireworks 2026, Victoria Park fireworks, Southport fireworks tickets",
  alternates: { canonical: `${BASE_URL}/guides/southport-fireworks-championship` },
  openGraph: {
    title: "British Musical Fireworks Championship Southport 2026 | 26–27 September",
    description: "The UK's premier pyro-musical fireworks competition. Victoria Park, Southport, 26–27 September 2026. Tickets £12. No gate sales.",
    url: `${BASE_URL}/guides/southport-fireworks-championship`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-fireworks-championship.webp` }],
  },
};

const TEAMS_2025 = [
  { name: "Imperial Lotus SE", title: "2023 Champions", note: "Saturday night headline act" },
  { name: "Dragon Fireworks", title: "2021 Champions", note: "Saturday" },
  { name: "Optimum Fireworks", title: "2022 Champions", note: "Saturday closing display" },
  { name: "Pyrotex Fireworks", title: "2010 & 2011 Champions", note: "Sunday night headline act" },
  { name: "Bright Sparks", title: "2016 & 2024 Champions", note: "Sunday" },
  { name: "Jubilee Fireworks", title: "1999 & 2008 Champions", note: "Sunday exhibition display" },
];

const FAQS = [
  { q: "When is the British Musical Fireworks Championship 2026?", a: "The British Musical Fireworks Championship 2026 takes place on Saturday 26 and Sunday 27 September 2026 at Victoria Park, Southport. Gates open at 5:30pm each day and displays run until approximately 9:30pm." },
  { q: "How much are tickets for the Southport Fireworks Championship?", a: "Tickets for the British Musical Fireworks Championship are £12 per person plus a booking fee (based on 2025 pricing — confirm at visitsouthport.com for 2026). Children under 5 are free. Carers enter free with a full-paying ticket holder. There are no gate sales — all tickets must be booked online in advance." },
  { q: "Is there parking at the British Musical Fireworks Championship?", a: "The official event car park is Princes Park (near Victoria Park), open from 4pm on event days. Parking is £8 per car, payable by cash or card. Disabled parking is available at Splash World on a first-come, first-served basis with a valid blue badge." },
  { q: "What is the British Musical Fireworks Championship?", a: "It's a competitive fireworks event where professional pyrotechnic companies create displays choreographed to music. Competitors are judged on synchronisation, mood, and flow. Previous champions return for Champion of Champions events in special years. It's not just a fireworks show — it's a competition where each team is trying to win." },
  { q: "Can I buy tickets at the gate?", a: "No. There are no gate sales at Victoria Park. All tickets for the British Musical Fireworks Championship must be purchased online in advance. Book at visitsouthport.com. Do not turn up without a ticket." },
  { q: "Are dogs allowed at the Southport Fireworks Championship?", a: "Dogs are technically permitted but the organisers strongly advise against bringing them. Professional fireworks displays produce extremely loud noise at close range — this is genuinely distressing for most dogs. If you do bring a dog, keep it on a lead at all times." },
  { q: "What else is at the fireworks event?", a: "Alongside the fireworks displays, the event includes a drone show (new addition from 2025), street food, bars and hot drinks, children's inflatables, glitter and face painting, and other entertainment. Arrive early to make the most of the ground entertainment before the evening programme." },
  { q: "How do I get to Victoria Park for the fireworks?", a: "By train: Southport and Birkdale stations are both approximately 15 minutes' walk from Victoria Park. By car: use the official Princes Park car park (open from 4pm on event days). Follow event signage on arrival in Southport." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "British Musical Fireworks Championship 2026",
  startDate: "2026-09-26",
  endDate: "2026-09-27",
  description: "The UK's premier pyro-musical fireworks competition, held at Victoria Park, Southport, 26–27 September 2026.",
  url: `${BASE_URL}/guides/southport-fireworks-championship`,
  location: {
    "@type": "Place",
    name: "Victoria Park, Southport",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Victoria Park",
      addressLocality: "Southport",
      postalCode: "PR8 2LG",
      addressCountry: "GB",
    },
  },
  organizer: { "@type": "Organization", name: "Sefton Council Tourism" },
  offers: [
    {
      "@type": "Offer",
      name: "Adult Ticket",
      price: "12.00",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: "https://www.visitsouthport.com/event/british-musical-fireworks-championship/16966101/",
    },
    {
      "@type": "Offer",
      name: "Child Under 5",
      price: "0.00",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
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

export default function FireworksChampionshipPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#0A0A2E] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-fireworks-championship.webp"
            alt="British Musical Fireworks Championship at Victoria Park Southport — spectacular night display"
            fill sizes="100vw" quality={90} className="object-cover"
            style={{ objectPosition: "center 40%" }} priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A2E] via-[#0A0A2E]/55 to-[#0A0A2E]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Ticketed Event
              </span>
              <span className="text-white/50 text-sm font-medium">Victoria Park · 26–27 September 2026</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              British Musical
              <span className="block text-[#C9A84C]">Fireworks Championship</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              The UK&apos;s premier pyro-musical fireworks competition. Professional teams choreograph displays
              to music in a head-to-head championship at Victoria Park. Tickets £12. No gate sales.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.visitsouthport.com/event/british-musical-fireworks-championship/16966101/" target="_blank" rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                Buy Tickets — £12 →
              </a>
              <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Parking & Practical Info
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#0A0A2E] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "26–27 Sep", label: "When", sub: "Saturday & Sunday" },
              { icon: MapPin, value: "PR8 2LG", label: "Where", sub: "Victoria Park" },
              { icon: Ticket, value: "£12", label: "Tickets", sub: "Book online — no gate sales" },
              { icon: Clock, value: "5:30–9:30pm", label: "Hours", sub: "Gates open 5:30pm" },
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

        {/* ── Important: No Gate Sales ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
          <div className="flex-none text-2xl">⚠️</div>
          <div>
            <p className="font-bold text-amber-900 text-base mb-1">No gate sales — advance tickets only</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Unlike most events, the British Musical Fireworks Championship has <strong>no ticket sales at the venue</strong>.
              You must book online in advance at{" "}
              <a href="https://www.visitsouthport.com/event/british-musical-fireworks-championship/16966101/" target="_blank" rel="noopener noreferrer" className="underline font-medium">visitsouthport.com</a>.
              Do not turn up hoping to buy on the night.
            </p>
          </div>
        </div>

        {/* ── Terry's Take ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">It&apos;s a Competition, Not Just a Display</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Most people come to the fireworks expecting a display and get something considerably more interesting.
                This is a competition. The teams are trying to win. Every burst is choreographed to music.
                They&apos;re judged on synchronisation, mood, and flow. There&apos;s craft in it that you don&apos;t get
                from a display-only event, and once you understand what you&apos;re watching, you watch it differently.
              </p>
              <p>
                The setting is genuinely good — Victoria Park at night, a proper crowd, the trees lit from below.
                The 2025 show added a drone display before the fireworks, which was actually worth watching.
                Hundreds of drones moving in formation before the teams go on.
                It&apos;s worth being there from 5:30pm for all of it.
              </p>
              <p>
                Practical note: book your tickets the moment they go on sale. This event does sell out.
                And the no-gate-sales rule is serious — I&apos;ve seen people turn up without tickets expecting to get in.
                They didn&apos;t. Book online. Princes Park is your best car option; the official car park opens at 4pm.
                Or just take the train — Birkdale station is a 15-minute walk.
              </p>
            </div>
          </div>
        </section>

        {/* ── What It Is ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Competition</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🎵", title: "Pyro-Musical Format", detail: "Each competing team fires a display precisely choreographed to a music track of their choice. The fireworks — timing, colour, tempo, intensity — are designed to match the music. You&apos;re watching two things at once and the synchronisation is what impresses or disappoints." },
              { emoji: "🏆", title: "Championship Judging", detail: "Teams are judged by an independent panel on three criteria: synchronisation (how precisely the fireworks match the music), mood (does the display match the emotional character of the track), and flow (coherence and pacing across the full display). The winners are announced after Sunday&apos;s final." },
              { emoji: "🚁", title: "The Drone Show", detail: "Added for 2025: a drone show runs before the main fireworks programme each evening at 7:45pm. Hundreds of illuminated drones paint shapes and stories across the night sky. It&apos;s genuinely impressive as a standalone spectacle. Arrive before 7:45pm to see the full evening." },
              { emoji: "⚔️", title: "Champion of Champions", detail: "In special years, the championship becomes a &apos;Champion of Champions&apos; event where previous title holders return to compete. 2025 was one of those years. 2026 format TBC — check visitsouthport.com for the confirmed programme." },
              { emoji: "🍔", title: "Ground Entertainment", detail: "Before the displays begin: street food stalls, bars and hot drinks, children&apos;s inflatables, glitter and face painting. Arrive from 5:30pm when gates open to get food before it gets busy. The queues build from around 7pm." },
              { emoji: "♿", title: "Accessibility", detail: "Designated disabled viewing area on hard standing with clear sightlines and dedicated toilet facilities. Blue badge holders can access Victoria Park from 5pm — 30 minutes before the main gates open. Disabled parking at Splash World car park, first-come first-served." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── 2025 Teams (reference) ── */}
        <section>
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Competitors</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Previous Champions</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl leading-relaxed">
              The 2025 show was a Champion of Champions event. The 2026 line-up will be confirmed at{" "}
              <a href="https://www.visitsouthport.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-medium">visitsouthport.com</a>.
              These are the calibre of companies that compete at Southport.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-50">
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-4">Saturday Night</p>
                <div className="space-y-3">
                  {TEAMS_2025.slice(0, 3).map((t) => (
                    <div key={t.name} className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#1B2E4B] text-sm">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-4">Sunday Night</p>
                <div className="space-y-3">
                  {TEAMS_2025.slice(3).map((t) => (
                    <div key={t.name} className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#1B2E4B] text-sm">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Practical ── */}
        <section id="practical" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Parking, Tickets &amp; Getting There</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Car, title: "Parking", items: ["Official car park: Princes Park — opens 4pm on event days, £8 per car", "Disabled parking: Splash World car park, blue badge required, first-come first-served", "Town centre car parks: 10–15 min walk to Victoria Park", "Nearest train stations: Southport or Birkdale (both 15 min walk) — recommended"] },
              { icon: Ticket, title: "Tickets — Important", items: ["£12 per adult + booking fee (2025 pricing — confirm for 2026)", "Children under 5: FREE", "Carers: free entry with documentation (DLA, PIP, Access Card etc.)", "Book only at visitsouthport.com — NO gate sales. Tickets not available on the night."] },
              { icon: Clock, title: "Timings", items: ["Gates open: 5:30pm each day", "Blue badge holders: access from 5:00pm", "Drone show: 7:45pm each evening (before fireworks)", "First fireworks team: 8:00pm each night", "Final display: approximately 9:00–9:30pm"] },
              { icon: MapPin, title: "What to Bring", items: ["Warm layers — Victoria Park in September, late evening, usually cold", "Hot drinks from the stalls or bring a flask", "Ear defenders for young children — professional fireworks are very loud", "Printed or digital ticket — required for entry", "Blue badge if using disabled parking at Splash World"] },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <item.icon className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">{item.title}</h3>
                <div className="space-y-2">
                  {item.items.map((line) => (
                    <div key={line} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: line }} />
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">British Musical Fireworks — FAQs</h2>
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
        <section className="bg-[#0A0A2E] rounded-2xl p-8 md:p-12 text-center text-white">
          <Music className="w-8 h-8 text-[#C9A84C] mx-auto mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">British Musical Fireworks Championship 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Book Before It Sells Out</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Tickets are £12. There are no gate sales. When it&apos;s sold out, it&apos;s sold out.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.visitsouthport.com/event/british-musical-fireworks-championship/16966101/" target="_blank" rel="noopener noreferrer"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">
              Book Tickets — visitsouthport.com
            </a>
            <Link href="/hotels" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">
              Hotels in Southport →
            </Link>
          </div>
        </section>

        {/* ── Other Events ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Other Southport Events in 2026</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Southport Flower Show", month: "20–23 August 2026", desc: "One of England's most prestigious horticultural shows. Victoria Park. Tickets from £23.", href: "/guides/southport-flower-show" },
                { name: "Southport Air Show", month: "29–30 August 2026", desc: "Free. 100,000+ spectators on Southport Beach. One of the UK's best air shows.", href: "/guides/southport-air-show" },
                { name: "Comedy Festival", month: "2–18 October 2026", desc: "15th annual comedy festival. Luxury heated marquee at Victoria Park. 17 nights.", href: "/guides/southport-comedy-festival" },
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
