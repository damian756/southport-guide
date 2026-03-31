import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("cristal-palace-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Cristal Palace Southport 2026, Transe Express Southport, street theatre Southport April 2026, Town Hall Gardens Southport event",
  alternates: { canonical: `${BASE_URL}/guides/cristal-palace-southport-2026` },
  openGraph: {
    title: "Cristal Palace Southport 2026 | 3–4 April · Free Street Theatre",
    description:
      "Cristal Palace 2026, free aerial street theatre by Transe Express. 12-metre chandelier, 36 performers, Town Hall Gardens, Lord Street. 3–4 April, 7:30pm.",
    url: `${BASE_URL}/guides/cristal-palace-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/cristal-palace-southport-2026.jpg` }],
  },
};

const FAQS = [
  {
    q: "When is Cristal Palace in Southport 2026?",
    a: "Cristal Palace takes place on Thursday 3 April and Friday 4 April 2026. Gates open at 6pm and the performance begins at 7:30pm each night. The show runs for approximately 90 minutes.",
  },
  {
    q: "Where is Cristal Palace Southport 2026?",
    a: "Town Hall Gardens, Lord Street, Southport. The gardens sit directly in front of Southport Town Hall on the main boulevard. There are road closures on Lord Street from 4pm on both performance nights.",
  },
  {
    q: "Is Cristal Palace free to attend?",
    a: "Yes, Cristal Palace is completely free. No tickets are required. Turn up from 6pm to claim your spot. For the best view of the chandelier, arrive early, the gardens fill up quickly once the performance area is established.",
  },
  {
    q: "What is Cristal Palace?",
    a: "Cristal Palace is a large-scale aerial street theatre production by French company Transe Express. The centrepiece is a 12-metre chandelier suspended above the audience, from which 36 performers, including 20 young dancers from Southport schools, perform a 90-minute spectacle of dance, music, and aerial work. It was created to celebrate 150 years of dance and music.",
  },
  {
    q: "Where is the best place to stand for Cristal Palace?",
    a: "The chandelier is suspended above the centre of the performance area, so the best spots are on the sides of the gardens where you can look up at the aerial performers. Avoid the immediate front of the Town Hall steps as the viewing angle can be awkward. Arrive by 6:30pm to secure a good spot.",
  },
  {
    q: "Where can I park for Cristal Palace Southport?",
    a: "Lord Street car parks. Tulketh Street (PR8 1EW) and the nearby multi-storey are the closest. Do not attempt Marine Drive; it is not convenient for Lord Street events. There are also paid car parks off Eastbank Street and Chapel Street, both within 10 minutes' walk of Town Hall Gardens.",
  },
  {
    q: "Is Cristal Palace accessible for disabled visitors?",
    a: "Town Hall Gardens is on flat ground and should be accessible for wheelchair users. The event is outdoors. There are no dedicated accessible viewing platforms confirmed at this stage, contact Sefton Council's events team if you need specific accessibility information.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Cristal Palace Southport 2026",
  startDate: "2026-04-03T19:30:00+01:00",
  endDate: "2026-04-04T21:00:00+01:00",
  description:
    "Free large-scale aerial street theatre by French company Transe Express. A 12-metre chandelier suspended above Town Hall Gardens, 36 local performers, 90-minute spectacle. Part of Southport 2026: Elegantly Eccentric.",
  url: `${BASE_URL}/guides/cristal-palace-southport-2026`,
  image: `${BASE_URL}/images/guides/cristal-palace-southport-2026.jpg`,
  isAccessibleForFree: true,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Town Hall Gardens, Lord Street, Southport",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lord Street",
      addressLocality: "Southport",
      postalCode: "PR8 1DA",
      addressCountry: "GB",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Sefton Council / Southport BID",
    url: "https://www.southport2026.co.uk",
  },
  performer: {
    "@type": "PerformingGroup",
    name: "Transe Express",
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

export default function CristalPalacePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="bg-[#1A1040] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">
          {/* Poster */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[44%] order-first md:order-last">
            <Image
              src="/images/guides/cristal-palace-southport-2026.jpg"
              alt="Cristal Palace Southport 2026 — free aerial street theatre by Transe Express on Lord Street"
              fill sizes="(max-width: 768px) 100vw, 44vw" className="object-contain"
              priority
            />
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                3–4 April 2026
              </span>
              <span className="text-white/50 text-sm font-medium">Town Hall Gardens · Lord Street · Free</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Cristal Palace
              <span className="block text-[#C9A84C]">Southport 2026</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              French theatre company Transe Express brings a 12-metre chandelier to Lord Street.
              36 performers, 90 minutes of aerial spectacle, 20 young Southport dancers.
              Free. Doors 6pm, show 7:30pm.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#what" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                What to Expect
              </a>
              <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Parking &amp; Getting There
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#1A1040] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "3–4 April", label: "When", sub: "Thursday & Friday 2026" },
              { icon: MapPin, value: "PR8 1DA", label: "Where", sub: "Town Hall Gardens, Lord St" },
              { icon: Clock, value: "7:30pm", label: "Show Time", sub: "Doors open 6pm" },
              { icon: MapPin, value: "Free", label: "Entry", sub: "No tickets required" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Most Spectacular Free Event Southport Has Staged in Years</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                I&apos;ve lived in Southport my whole life and I genuinely cannot remember the last time an event made me
                stop and think &quot;this is something special.&quot; Transe Express are serious. They&apos;ve performed at major
                festivals across Europe. The chandelier. 12 metres across, suspended above the crowd, is not a
                gimmick. It is the show.
              </p>
              <p>
                The fact that 20 young dancers from Southport schools are part of the 36-performer cast matters.
                This is not a touring production that parachutes into town and leaves. It is rooted here, which
                makes it worth attending on principle alone.
              </p>
              <p>
                It is also free. Completely free. On Lord Street. On a Thursday and Friday night in April.
                Go on both nights if you can. The second performance is often sharper once the cast have read the crowd.
                Turn up by 6:30pm if you want a good spot. The gardens will fill up.
              </p>
            </div>
          </div>
        </section>

        {/* ── What's There ── */}
        <section id="what" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Event</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What to Expect</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                emoji: "✨",
                title: "The Chandelier",
                detail: "A 12-metre chandelier is suspended above Town Hall Gardens at height. It is the centrepiece of the entire production. Performers work from it, around it, and beneath it throughout the 90-minute show.",
              },
              {
                emoji: "🎭",
                title: "Transe Express",
                detail: "French street theatre company Transe Express have been making large-scale outdoor productions since the 1980s. This show, combining aerial work, dance, and live music, was created to celebrate 150 years of dance and music.",
              },
              {
                emoji: "💃",
                title: "36 Performers Including Southport Dancers",
                detail: "The cast of 36 includes 20 young dancers from Southport schools. This is a genuine collaboration with the local community, not just a touring production. Some of these kids have been rehearsing for months.",
              },
              {
                emoji: "🎵",
                title: "Live Music",
                detail: "The production features live music throughout. Not background music, but integrated performance, it is part of the show structure. The combination of aerial work, dance, and live music is what makes Transe Express productions distinctive.",
              },
              {
                emoji: "🌟",
                title: "Two Performances",
                detail: "Thursday 3 April and Friday 4 April. Both are free. Both start at 7:30pm. If you can only attend one, either is worth going to. If you can attend both, the Friday performance often benefits from the company having settled into the space.",
              },
              {
                emoji: "🗺️",
                title: "Lord Street Setting",
                detail: "Town Hall Gardens are on the main boulevard of Lord Street, right in the heart of Southport. The road closes from 4pm on both performance nights. The setting. Victorian buildings, the boulevard, the gardens, is genuinely good for this kind of event.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Road Closures ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Important</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Road Closures &amp; Timing</h2>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7 mb-6">
            <h3 className="font-display font-bold text-amber-900 text-lg mb-3">Lord Street Closes at 4pm on Both Days</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Lord Street is closed to traffic from 4pm on Thursday 3 April and Friday 4 April.
              If you are driving, do not attempt to park on Lord Street or approach from the town centre end
              after 4pm. Use Tulketh Street car park (PR8 1EW) or Eastbank Street car parks and walk in.
              The road closures are part of the event setup, plan your arrival accordingly.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { time: "4:00pm", label: "Lord Street closes to traffic", colour: "bg-red-50 border-red-100" },
              { time: "6:00pm", label: "Doors open, gardens accessible", colour: "bg-green-50 border-green-100" },
              { time: "7:30pm", label: "Performance begins", colour: "bg-blue-50 border-blue-100" },
            ].map((t) => (
              <div key={t.time} className={`${t.colour} border rounded-xl p-5 text-center`}>
                <div className="text-2xl font-black text-[#1B2E4B] mb-1">{t.time}</div>
                <div className="text-sm text-gray-600">{t.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Practical ── */}
        <section id="practical" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Parking, Getting There &amp; Where to Eat</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">Parking for Cristal Palace</h3>
              <div className="space-y-2">
                {[
                  "Tulketh Street car park, PR8 1EW. 5 min walk, multi-storey, most convenient",
                  "Eastbank Street car park, PR8 1DQ. 8 min walk to Town Hall Gardens",
                  "Chapel Street car park. 10 min walk, paid, usually has space",
                  "Do NOT use Marine Drive, too far from Lord Street for this event",
                  "Road closures begin 4pm, park before then or approach from side streets",
                ].map((line) => (
                  <div key={line} className="flex gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">Where to Eat on Lord Street Beforehand</h3>
              <div className="space-y-2">
                {[
                  "The Bold Hotel restaurant, smart pre-theatre menu, book ahead",
                  "La Lanterna, Lord Street. Italian, reliable, books up on event nights",
                  "Bettys Bar & Restaurant, casual, good value, no booking needed usually",
                  "Southport Market, Market Street, street food, no booking, 10 min walk",
                  "Most Lord Street restaurants are full on event nights, book in advance",
                ].map((line) => (
                  <div key={line} className="flex gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Cristal Palace Southport. FAQs</h2>
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
        <section className="bg-[#1A1040] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Cristal Palace · 3–4 April 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Free. Lord Street. Both Nights.</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            No tickets. No booking. Turn up from 6pm, get a good spot by 6:30pm, and see
            something genuinely extraordinary on Lord Street.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/events" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">
              See All April Events
            </Link>
            <Link href="/guides/easter-in-southport-2026" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">
              Easter in Southport →
            </Link>
          </div>
        </section>

        {/* ── Related Events ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Southport Events in April 2026</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Easter in Southport 2026", month: "1–6 April 2026", desc: "All the Easter events, egg hunts, craft workshops, panto, and more.", href: "/guides/easter-in-southport-2026" },
                { name: "Sausage & Cider Festival", month: "18 April 2026", desc: "Bavarian food festival at Victoria Park. Bratwurst, ciders, oompah bands.", href: "/guides/southport-sausage-cider-festival" },
                { name: "Southport 2026: Elegantly Eccentric", month: "Year-round", desc: "The full cultural programme. Cristal Palace, Big Top, Summer Solstice, Books Alive!", href: "/guides/southport-year-of-culture-2026" },
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
