import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Users } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("easter-in-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Easter in Southport 2026, Easter events Southport, Easter family activities Southport, things to do Southport Easter",
  alternates: { canonical: `${BASE_URL}/guides/easter-in-southport-2026` },
  openGraph: {
    title: "Easter in Southport 2026 | Family Events 1–6 April",
    description:
      "Easter in Southport 2026, everything happening across the Easter school holidays. Cristal Palace street theatre, egg hunts, craft workshops, Easter panto, and family events by day.",
    url: `${BASE_URL}/guides/easter-in-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/easter-in-southport-2026.jpg` }],
  },
};

const FAQS = [
  {
    q: "What is on in Southport at Easter 2026?",
    a: "Easter 2026 in Southport runs from 1–6 April with a full programme of events. Highlights include Cristal Palace free street theatre by Transe Express (3–4 April), the Wayfarers Arcade Easter Egg Hunt (3–6 April), Make It! craft workshops at The Atkinson, Whistle Down the Wind musical at The Atkinson (9–11 April), and Easter family events at Southport Market.",
  },
  {
    q: "Is Cristal Palace suitable for children?",
    a: "Yes. Cristal Palace is an outdoor free event and suitable for all ages. It is an aerial street theatre spectacle with a 12-metre chandelier, live music, and 36 performers. The show starts at 7:30pm and runs approximately 90 minutes, so be prepared for a late night with younger children.",
  },
  {
    q: "Where is the Wayfarers Arcade Easter Egg Hunt?",
    a: "Wayfarers Arcade on Lord Street, Southport (PR8 1LQ). The arcade runs an Easter trail across the shops and the arcade itself. It is free to participate. Wayfarers is one of Southport's Victorian covered arcades and worth a visit in its own right.",
  },
  {
    q: "Is there parking near the Easter events in Southport?",
    a: "For Lord Street events (Cristal Palace, Wayfarers Arcade), use Tulketh Street car park (PR8 1EW). For events at The Atkinson, Lord Street car parks are within 5 minutes' walk. For Victoria Park events, street parking on surrounding residential roads or town centre car parks. The Marine Drive car park is not convenient for town centre events.",
  },
  {
    q: "Are there indoor Easter activities in Southport for rainy days?",
    a: "Yes. The Atkinson on Lord Street runs Make It! craft workshops during the Easter holidays, book through the Atkinson website. Southport Market on Market Street has indoor food stalls and events. Wayfarers Arcade is covered. The Bijou Cinema on Post Office Avenue runs regular screenings that are good for a wet afternoon.",
  },
  {
    q: "When does the Easter school holiday run in 2026?",
    a: "Easter 2026 falls on 3–4 April (Good Friday and Easter Monday). Sefton schools typically break for two weeks. Check your school's specific holiday dates, but the main Easter events are concentrated around 1–6 April.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Easter in Southport 2026",
  startDate: "2026-04-01",
  endDate: "2026-04-06",
  description:
    "Family events guide for Easter in Southport 2026. Cristal Palace street theatre, Wayfarers Easter Egg Hunt, craft workshops at The Atkinson, and more.",
  url: `${BASE_URL}/guides/easter-in-southport-2026`,
  image: `${BASE_URL}/images/guides/easter-in-southport-2026.jpg`,
  isAccessibleForFree: true,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Southport Town Centre",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Southport",
      addressRegion: "Merseyside",
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

const BY_DAY = [
  {
    day: "Wednesday 1 April",
    events: [
      { name: "EGGcellent Easter Craft Workshop", venue: "Southport Market", time: "All day", free: true },
      { name: "Make It! Craft Workshop", venue: "The Atkinson, Lord Street", time: "Book ahead", free: false },
    ],
  },
  {
    day: "Thursday 2 April",
    events: [
      { name: "Make It! Craft Workshop", venue: "The Atkinson, Lord Street", time: "Book ahead", free: false },
      { name: "Starkidz Totz in Wonderland", venue: "Southport", time: "Check venue", free: false },
      { name: "Sefton Open 2026 Opens", venue: "The Atkinson Gallery", time: "Gallery hours", free: true },
    ],
  },
  {
    day: "Thursday 3 April. Good Friday",
    events: [
      { name: "Cristal Palace", venue: "Town Hall Gardens, Lord Street", time: "7:30pm (Doors 6pm)", free: true },
      { name: "Southport Lifeboat Open Day", venue: "Southport Lifeboat Station", time: "Check times", free: true },
      { name: "Southport Artisan Market", venue: "Southport Market, PR8 1EF", time: "10am–4pm", free: true },
      { name: "Wayfarers Easter Egg Hunt begins", venue: "Wayfarers Arcade, Lord Street", time: "During opening", free: true },
      { name: "Mr and Mrs Twits Chocolate Heist", venue: "Southport", time: "Check venue", free: false },
    ],
  },
  {
    day: "Friday 4 April. Good Friday",
    events: [
      { name: "Cristal Palace (night 2)", venue: "Town Hall Gardens, Lord Street", time: "7:30pm (Doors 6pm)", free: true },
      { name: "Wayfarers Easter Egg Hunt", venue: "Wayfarers Arcade, Lord Street", time: "During opening", free: true },
    ],
  },
  {
    day: "Saturday 5 April",
    events: [
      { name: "Easter Family Rave", venue: "Southport", time: "Check venue", free: false },
      { name: "Wayfarers Easter Egg Hunt", venue: "Wayfarers Arcade, Lord Street", time: "During opening", free: true },
    ],
  },
  {
    day: "Easter Sunday 6 April",
    events: [
      { name: "Wayfarers Easter Egg Hunt (final day)", venue: "Wayfarers Arcade, Lord Street", time: "During opening", free: true },
    ],
  },
];

export default function EasterSouthportPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="bg-[#2D1B4E] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">
          {/* Poster */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[44%] order-first md:order-last">
            <Image
              src="/images/guides/easter-in-southport-2026.jpg"
              alt="Easter in Southport 2026 — family events across the Easter holidays"
              fill sizes="(max-width: 768px) 100vw, 44vw" className="object-contain"
              priority
            />
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                1–6 April 2026
              </span>
              <span className="text-white/50 text-sm font-medium">Easter Holidays · Southport</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Easter in
              <span className="block text-[#C9A84C]">Southport 2026</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              Everything happening across the Easter school holidays in one place.
              Cristal Palace street theatre, egg hunts, craft workshops, musical theatre,
              family raves, and artisan markets.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#by-day" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                Events By Day
              </a>
              <a href="#highlights" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Top Highlights
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#2D1B4E] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "1–6 Apr", label: "When", sub: "Easter school holidays" },
              { icon: MapPin, value: "Town Centre", label: "Where", sub: "Multiple venues" },
              { icon: Users, value: "Family", label: "Who For", sub: "All ages" },
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

        {/* ── Terry's Take ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Easter 2026 Has Something Worth Planning Around</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Easter with four kids means I&apos;ve done every variation of &quot;things to do in Southport over Easter&quot;
                for the past decade. Most years it is a combination of whatever the town has on, some beach time if the
                weather cooperates, and improvised days out. Easter 2026 is different.
              </p>
              <p>
                Cristal Palace on Thursday and Friday (3–4 April) is the standout event. Free, on Lord Street,
                aerial spectacle with a 12-metre chandelier and 36 performers. You should go. Both nights if possible.
                The kids will remember it. That is a high bar for a free event and I mean it sincerely.
              </p>
              <p>
                The Artisan Market runs on Good Friday. The Wayfarers Arcade egg hunt runs Thursday to Sunday.
                The Atkinson has craft workshops throughout. Between these things, Easter week has more going on
                than it has for years. The page below organises it by day so you can plan properly.
              </p>
            </div>
          </div>
        </section>

        {/* ── By Day ── */}
        <section id="by-day" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Planning Your Visit</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Easter Events by Day</h2>
          </div>
          <div className="space-y-6">
            {BY_DAY.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#1B2E4B] px-6 py-4">
                  <h3 className="text-white font-bold text-lg">{day.day}</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {day.events.map((evt) => (
                    <div key={evt.name} className="px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-1">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1B2E4B] text-sm">{evt.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{evt.venue} · {evt.time}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${evt.free ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                        {evt.free ? "Free" : "Ticketed"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Highlights ── */}
        <section id="highlights" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Not to Miss</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Easter 2026 Highlights</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "✨", title: "Cristal Palace", date: "3–4 April · Free", desc: "A 12-metre chandelier over Lord Street. Free aerial street theatre by Transe Express. 7:30pm both nights. The event of Easter.", href: "/guides/cristal-palace-southport-2026" },
              { emoji: "🐣", title: "Wayfarers Easter Egg Hunt", date: "3–6 April · Free", desc: "Easter trail through Southport's Victorian covered arcade on Lord Street. Free to join, prize for completing the hunt.", href: null },
              { emoji: "🎭", title: "Whistle Down the Wind", date: "9–11 April · Ticketed", desc: "Andrew Lloyd Webber's musical at The Atkinson. SONG Productions. Booking essential.", href: "/guides/whistle-down-the-wind-southport-2026" },
              { emoji: "🎨", title: "Make It! Craft Workshop", date: "2 & 9 April · Book ahead", desc: "Hands-on craft workshops for children at The Atkinson on Lord Street. Book directly through the Atkinson.", href: "/guides/the-atkinson-southport" },
              { emoji: "🛍️", title: "Southport Artisan Market", date: "3 April · Free", desc: "50+ independent makers at Southport Market on Good Friday. Free entry, food stalls, handmade gifts.", href: "/guides/southport-artisan-market" },
              { emoji: "🖼️", title: "Sefton Open 2026", date: "2 Apr – 13 Jun · Free", desc: "The annual open art exhibition opens at The Atkinson. Free gallery entry. Worth a look on a wet afternoon.", href: "/guides/sefton-open-2026" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1">{item.date}</p>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>
                {item.href && (
                  <Link href={item.href} className="text-[#C9A84C] text-xs font-bold hover:underline flex items-center gap-1">
                    Full Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Practical ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Getting There &amp; Parking</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-3">Town Centre Parking</h3>
                <div className="space-y-2">
                  {[
                    "Tulketh Street multi-storey, PR8 1EW, best for Lord Street events",
                    "Eastbank Street car park, PR8 1DQ. 5 min walk to The Atkinson",
                    "Southport Market has limited pay-and-display nearby",
                    "Marine Drive fills early on busy days, not convenient for town events",
                  ].map((line) => (
                    <div key={line} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-3">By Train</h3>
                <div className="space-y-2">
                  {[
                    "Southport station is on the Merseyrail Northern Line from Liverpool",
                    "30–40 min direct from Liverpool Central",
                    "Station is 10 min walk from The Atkinson and Lord Street",
                    "Good option on busy event days to avoid parking",
                  ].map((line) => (
                    <div key={line} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Easter in Southport. FAQs</h2>
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
        <section className="bg-[#2D1B4E] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Easter in Southport · 1–6 April 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Plan Your Easter Week</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Cristal Palace is the not-to-miss event. Free, on Lord Street, both nights.
            The rest of Easter week has plenty to fill the days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides/cristal-palace-southport-2026" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">
              Cristal Palace Guide
            </Link>
            <Link href="/events" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">
              Full Events Calendar →
            </Link>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
