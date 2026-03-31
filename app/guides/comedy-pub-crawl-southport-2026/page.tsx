import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Ticket, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("comedy-pub-crawl-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Comedy Pub Crawl Southport 2026, comedy pub crawl Southport April, stand-up comedy Southport pubs",
  alternates: { canonical: `${BASE_URL}/guides/comedy-pub-crawl-southport-2026` },
  openGraph: {
    title: "Comedy Pub Crawl Southport 2026 | 22 April · Multiple Venues",
    description: "Live stand-up comedy at multiple Southport pubs in one evening. 22 April 2026. Mystery route, tickets required.",
    url: `${BASE_URL}/guides/comedy-pub-crawl-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/comedy-pub-crawl-southport-2026.jpg` }],
  },
};

const FAQS = [
  { q: "When is the Comedy Pub Crawl in Southport 2026?", a: "The Comedy Pub Crawl Southport 2026 takes place on Wednesday 22 April 2026. The event runs across multiple venues in the town centre over one evening." },
  { q: "How does the Comedy Pub Crawl work?", a: "Ticket holders move between multiple Southport pubs and bars over the course of the evening, with live stand-up comedy acts performing at each venue. The route is typically revealed on the night or upon ticket purchase. You visit each venue on the crawl in sequence with the rest of the group." },
  { q: "Do I need tickets for the Comedy Pub Crawl?", a: "Yes, tickets are required in advance. The event does not operate on the door. Book through the event organiser's website or check Eventbrite and Skiddle for availability." },
  { q: "Which pubs are on the Comedy Pub Crawl route?", a: "The specific route varies each time and is often kept as a surprise until the event night or announced close to the date. Southport town centre has a good selection of comedy-friendly venues, expect a mix of larger bars and smaller pub-style venues." },
  { q: "Where should I eat before the Comedy Pub Crawl?", a: "The event starts in the evening so it is worth eating beforehand. Good options near the town centre pubs include Southport Market (street food, informal, no booking needed) or any of the Lord Street restaurants. Book ahead if you want a sit-down meal on a midweek evening." },
  { q: "How do I get home after the Comedy Pub Crawl?", a: "Last trains from Southport to Liverpool run until late but do check the Merseyrail timetable on the night. Taxis are available from the town centre, book in advance or use a taxi app. If you are staying overnight, Southport has several hotels within walking distance of the town centre pubs." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Comedy Pub Crawl Southport 2026",
  startDate: "2026-04-22T19:00:00+01:00",
  endDate: "2026-04-22T23:00:00+01:00",
  description: "Live stand-up comedy across multiple Southport pub venues in a single evening. Mystery route. Tickets required.",
  url: `${BASE_URL}/guides/comedy-pub-crawl-southport-2026`,
  image: `${BASE_URL}/images/guides/comedy-pub-crawl-southport-2026.jpg`,
  isAccessibleForFree: false,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Multiple Venues, Southport Town Centre",
    address: { "@type": "PostalAddress", addressLocality: "Southport", addressRegion: "Merseyside", addressCountry: "GB" },
  },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function ComedyPubCrawlPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="bg-[#3D1A5C] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">
          {/* Poster */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[44%] order-first md:order-last">
            <Image src="/images/guides/comedy-pub-crawl-southport-2026.jpg" alt="Comedy Pub Crawl Southport 2026 — live comedy across multiple venues" fill sizes="(max-width: 768px) 100vw, 44vw" className="object-contain" priority />
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">22 April 2026</span>
              <span className="text-white/50 text-sm font-medium">Multiple Venues · Southport · Tickets Required</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Comedy Pub Crawl
              <span className="block text-[#C9A84C]">Southport 2026</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">Live stand-up comedy at multiple Southport pubs across one evening. Mystery route revealed on the night. Tickets required, no door sales.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#how-it-works" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">How It Works</a>
              <Link href="/guides/southport-comedy-festival" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Comedy Festival Guide</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3D1A5C] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "22 April", label: "When", sub: "Wednesday 2026" },
              { icon: MapPin, value: "Town Centre", label: "Where", sub: "Multiple pubs" },
              { icon: Clock, value: "Evening", label: "Time", sub: "Typically 7pm onwards" },
              { icon: Ticket, value: "Ticketed", label: "Entry", sub: "Advance booking only" },
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
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Comedy Across Southport&apos;s Pubs. It Works</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>Southport has a genuine comedy scene, the Comedy Festival in October draws serious acts to a heated marquee at Victoria Park. The pub crawl format is a different thing: more informal, more unpredictable, and in some ways more fun because of it. You are moving between venues rather than sitting in one place all night.</p>
              <p>The mystery route element is part of the appeal. You do not know exactly where you are going until you get there. Southport has the pubs to make this work, enough variety in the town centre to keep it interesting over an evening. The comedy itself ranges from local acts to touring stand-ups depending on the event.</p>
              <p>Buy tickets in advance. These events sell out. And eat before you go, it is a long evening and pub food on a crawl is hit and miss. Southport Market or any of the Lord Street restaurants are your best options for a pre-event meal.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Format</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">How the Pub Crawl Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">On the Night</h3>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Ticket holders meet at the first venue on the route" },
                  { step: "2", text: "Comedy act performs at that venue, typically 20–30 minutes" },
                  { step: "3", text: "Group moves together to the next venue on the route" },
                  { step: "4", text: "Repeat across 4–6 venues through the evening" },
                  { step: "5", text: "Event typically ends at a final venue for drinks" },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3 items-start">
                    <span className="bg-[#C9A84C] text-[#1B2E4B] font-black text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{s.step}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">Good to Know</h3>
              <div className="space-y-2">
                {[
                  "Route is typically revealed on the night or announced close to the date",
                  "Wear comfortable shoes, you are walking between venues",
                  "Drinks not included in the ticket price, you pay at each pub",
                  "The comedy acts are the main event, not the drinking",
                  "Book tickets well in advance, previous events have sold out",
                  "Southport town centre is compact, walking distances are manageable",
                ].map((l) => (
                  <div key={l} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{l}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Comedy Pub Crawl. FAQs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />{faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#3D1A5C] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Comedy Pub Crawl · 22 April 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Book Your Tickets</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Tickets sell out. Do not leave it. Check Eventbrite or the event organiser directly.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.eventbrite.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Find Tickets</a>
            <Link href="/guides/southport-comedy-festival" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">Comedy Festival Oct 2026 →</Link>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Comedy &amp; Nightlife in Southport</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Southport Comedy Festival", month: "2–18 October 2026", desc: "15th annual comedy festival. Luxury heated marquee at Victoria Park. 17 nights.", href: "/guides/southport-comedy-festival" },
                { name: "Live Music in Southport", month: "Every Week", desc: "Where to find live music in Southport, every venue and every night.", href: "/guides/live-music-southport" },
                { name: "April Events in Southport", month: "April 2026", desc: "Everything happening in Southport this April.", href: "/events" },
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
