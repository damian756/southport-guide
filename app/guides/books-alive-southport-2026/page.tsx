import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("books-alive-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Books Alive Southport 2026, Books Alive literature festival, Southport literature festival October, half term events Southport",
  alternates: { canonical: `${BASE_URL}/guides/books-alive-southport-2026` },
  openGraph: {
    title: "Books Alive! Literature Festival Southport 2026 | 24–31 October",
    description: "Books Alive! Southport 2026, family literature festival over October half-term. Storytelling, author events, workshops. 24–31 October. Free events.",
    url: `${BASE_URL}/guides/books-alive-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/books-alive-southport-2026.jpg` }],
  },
};

const FAQS = [
  { q: "When is Books Alive! in Southport 2026?", a: "Books Alive! Southport 2026 runs from Saturday 24 October to Saturday 31 October 2026, a week across the October half-term school holiday." },
  { q: "What is Books Alive! in Southport?", a: "Books Alive! is Southport's family literature festival, a week-long programme of storytelling installations, author performances, and workshops aimed at children and families. It takes place at venues across Southport town centre, with a focus on making literature accessible and engaging for young audiences." },
  { q: "Is Books Alive! free?", a: "The majority of Books Alive! events are free. Some ticketed workshops and author events may require booking. Check the Books Alive! programme for the specific events and any associated costs." },
  { q: "Is Books Alive! suitable for families?", a: "Yes. Books Alive! is specifically designed as a family literature festival. Events are tailored to different age groups from young children to teenagers. It is one of Southport's key family events of the autumn." },
  { q: "Where do Books Alive! events take place?", a: "Books Alive! takes place at multiple venues across Southport town centre, including The Atkinson on Lord Street (gallery, theatre, and library), Southport Market, Wayfarers Arcade, and other town centre locations. The festival is designed to be walked between venues." },
  { q: "Is this the first year of Books Alive! in Southport?", a: "Books Alive! is part of the Southport 2026: Elegantly Eccentric programme, the town's year of culture. The format of a literature festival in October is new for 2026. Check the Southport 2026 website for programme details as they are announced." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Books Alive! Literature Festival Southport 2026",
  startDate: "2026-10-24",
  endDate: "2026-10-31",
  description: "Week-long family literature festival in Southport over October half-term. Storytelling installations, author performances, and workshops at venues across the town. Free events.",
  url: `${BASE_URL}/guides/books-alive-southport-2026`,
  image: `${BASE_URL}/images/guides/books-alive-southport-2026.jpg`,
  isAccessibleForFree: true,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Southport Town Centre (Multiple Venues)",
    address: { "@type": "PostalAddress", addressLocality: "Southport", addressRegion: "Merseyside", addressCountry: "GB" },
  },
  organizer: { "@type": "Organization", name: "Southport 2026: Elegantly Eccentric / Sefton Council" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function BooksAlivePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="bg-[#2E1A00] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">
          {/* Poster */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[44%] order-first md:order-last">
            <Image src="/images/guides/books-alive-southport-2026.jpg" alt="Books Alive! Literature Festival Southport 2026 — half-term family events" fill sizes="(max-width: 768px) 100vw, 44vw" className="object-contain" priority />
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">24–31 October 2026</span>
              <span className="text-white/50 text-sm font-medium">October Half-Term · Multiple Venues · Free</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Books Alive!
              <span className="block text-[#C9A84C]">Southport 2026</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">Southport&apos;s family literature festival across October half-term. Storytelling installations, author performances, workshops, and events at venues across the town. Mostly free.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#what" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">What&apos;s On</a>
              <Link href="/guides/southport-year-of-culture-2026" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Southport 2026 Programme</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#2E1A00] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "24–31 Oct", label: "When", sub: "October half-term" },
              { icon: MapPin, value: "Town Centre", label: "Where", sub: "Multiple venues" },
              { icon: Clock, value: "One Week", label: "Duration", sub: "Full festival week" },
              { icon: MapPin, value: "Mostly Free", label: "Cost", sub: "Some ticketed events" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Half-Term in Southport Just Got More Interesting</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>October half-term with four kids is a logistical problem that needs to be solved seven days in a row. Books Alive! is a genuinely useful addition to the half-term calendar, free events, indoor venues, and programming that is designed for children rather than tolerating their presence.</p>
              <p>The festival is new for 2026 as part of the Elegantly Eccentric programme. Storytelling installations across the town centre are the kind of thing my kids would actually engage with, interactive, exploratory, spread across multiple venues so you are moving between things rather than sitting still. The Atkinson is the obvious hub, with the library and gallery and workshop space all in one building.</p>
              <p>More details will come as the programme is confirmed closer to the date. Check the Southport 2026 and Atkinson websites for updates. Worth putting in the diary now.</p>
            </div>
          </div>
        </section>

        <section id="what" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Festival</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What to Expect</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "📚", title: "Storytelling Installations", detail: "Large-scale storytelling installations across Southport town centre, designed to be discovered as you move between venues. The kind of thing that works for all ages." },
              { emoji: "✍️", title: "Author Performances", detail: "Author events and performances across the festival week. Mix of children's authors and other writers. Some may require booking, check the programme as it is released." },
              { emoji: "🎨", title: "Workshops", detail: "Hands-on creative writing and literacy workshops, particularly at The Atkinson. Some free, some ticketed. Suitable for different age groups." },
              { emoji: "🏛️", title: "The Atkinson Hub", detail: "The Atkinson on Lord Street is the main hub, gallery, theatre, library, and workshop spaces all under one roof. The library is an obvious anchor point for a literature festival." },
              { emoji: "🛍️", title: "Multiple Venues", detail: "The festival is designed to be walked, events across The Atkinson, Southport Market, Wayfarers Arcade, and other town centre venues. A good way to see a different side of Southport." },
              { emoji: "🍂", title: "October Half-Term", detail: "Week of 24–31 October covers the Sefton schools October half-term. Specific school holiday dates may vary, check your school. The festival runs across the full week." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Books Alive!. FAQs</h2>
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

        <section className="bg-[#2E1A00] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Books Alive! · 24–31 October 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Half-Term Literature Festival</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Programme details confirmed closer to the date. Check The Atkinson and Southport 2026 websites for updates.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides/the-atkinson-southport" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">The Atkinson Guide</Link>
            <Link href="/guides/southport-year-of-culture-2026" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">Southport 2026 →</Link>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Southport Autumn Events 2026</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Southport Comedy Festival", month: "2–18 October 2026", desc: "15th annual comedy festival. 17 nights at Victoria Park. Runs just before Books Alive!", href: "/guides/southport-comedy-festival" },
                { name: "British Musical Fireworks Championship", month: "26–27 September 2026", desc: "Pyrotechnics choreographed to music. Two nights at Victoria Park.", href: "/guides/southport-fireworks-championship" },
                { name: "The Atkinson Southport", month: "Year-round", desc: "Gallery, theatre, café, and library on Lord Street, the Books Alive! hub.", href: "/guides/the-atkinson-southport" },
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
