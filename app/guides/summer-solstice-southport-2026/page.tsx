import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Ticket, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("summer-solstice-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Summer Solstice Festival Southport 2026, Summer Solstice Southport June, outdoor dance event Southport Victoria Park",
  alternates: { canonical: `${BASE_URL}/guides/summer-solstice-southport-2026` },
  openGraph: {
    title: "Summer Solstice Festival Southport 2026 | 20 June Victoria Park",
    description: "Summer Solstice Festival Southport 2026 — 8-hour dance and music event at Victoria Park. 20 June, 2pm–10pm. Ticketed.",
    url: `${BASE_URL}/guides/summer-solstice-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/summer-solstice-southport-2026.jpg` }],
  },
};

const FAQS = [
  { q: "When is the Summer Solstice Festival in Southport 2026?", a: "The Summer Solstice Festival takes place on Saturday 20 June 2026 at Victoria Park, Southport. The event runs from 2pm to 10pm — an 8-hour outdoor event on the longest day of the year." },
  { q: "What is the Summer Solstice Festival in Southport?", a: "The Summer Solstice Festival is an outdoor dance and music event at Victoria Park, forming part of the Southport 2026: Elegantly Eccentric cultural programme. It runs on the summer solstice — the longest day — for 8 hours of continuous music and performance." },
  { q: "Do I need tickets for the Summer Solstice Festival?", a: "Yes — the Summer Solstice Festival is a ticketed VIP event. Tickets must be purchased in advance. Check the Southport 2026 website and Southport BID for ticket information." },
  { q: "Where is Victoria Park in Southport?", a: "Victoria Park is on Rotten Row, Southport, PR8 2BZ — Southport's main public park, used for the Flower Show, Sausage & Cider Festival, and other major events. It is approximately 15 minutes' walk from Southport railway station." },
  { q: "What type of music is at the Summer Solstice Festival?", a: "The Summer Solstice Festival focuses on dance and electronic music. It is positioned as a premium outdoor dance event. The 8-hour format and VIP positioning suggests a festival-quality production rather than a local night out." },
  { q: "Is the Summer Solstice Festival family friendly?", a: "The event is an evening dance event running until 10pm, which makes it more adult-oriented. It is not described as a family festival. Check the official event information for age restrictions." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Summer Solstice Festival Southport 2026",
  startDate: "2026-06-20T14:00:00+01:00",
  endDate: "2026-06-20T22:00:00+01:00",
  description: "8-hour outdoor dance and music festival at Victoria Park, Southport, on the summer solstice. 20 June 2026, 2pm–10pm. Ticketed event.",
  url: `${BASE_URL}/guides/summer-solstice-southport-2026`,
  image: `${BASE_URL}/images/guides/summer-solstice-southport-2026.jpg`,
  isAccessibleForFree: false,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Victoria Park, Southport",
    address: { "@type": "PostalAddress", streetAddress: "Rotten Row", addressLocality: "Southport", postalCode: "PR8 2BZ", addressCountry: "GB" },
  },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function SummerSolsticePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="relative min-h-[75vh] flex items-end bg-[#3D2A00] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/guides/summer-solstice-southport-2026.jpg" alt="Summer Solstice Festival Southport 2026 at Victoria Park" fill sizes="100vw" quality={90} className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2A00] via-[#3D2A00]/50 to-[#3D2A00]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">20 June 2026</span>
              <span className="text-white/50 text-sm font-medium">Victoria Park · PR8 2BZ · 2pm–10pm</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Summer Solstice
              <span className="block text-[#C9A84C]">Festival Southport</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">8 hours of outdoor dance and music at Victoria Park on the longest day. 20 June, 2pm–10pm. Ticketed VIP event as part of Southport 2026: Elegantly Eccentric.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#what" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">About the Event</a>
              <Link href="/guides/southport-year-of-culture-2026" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">2026 Programme</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3D2A00] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "20 June", label: "When", sub: "Summer Solstice, Saturday" },
              { icon: MapPin, value: "PR8 2BZ", label: "Where", sub: "Victoria Park" },
              { icon: Clock, value: "2pm–10pm", label: "Hours", sub: "8-hour event" },
              { icon: Ticket, value: "Ticketed", label: "Entry", sub: "VIP event" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Eight Hours on the Longest Day</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>Victoria Park in June is a different thing entirely to Victoria Park in April. This is peak summer — or as close as you get in Merseyside. The Summer Solstice is the longest day of the year. Eight hours of music starting at 2pm means you are dancing in daylight for most of it.</p>
              <p>The VIP positioning means this is not a cheap night out. But it is a proper outdoor event with production values to match. Part of the Southport 2026: Elegantly Eccentric programme, which has delivered at every event so far this year — Cristal Palace, Big Top Festival. The standard has been high.</p>
              <p>If outdoor dance events are your thing and you are within travelling distance of Southport, this is worth planning around. Check the Southport 2026 website for ticket information.</p>
            </div>
          </div>
        </section>

        <section id="what" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Event</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What to Expect</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <div className="text-3xl mb-3">☀️</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-3">Summer Solstice Setting</h3>
              <p className="text-gray-600 text-sm leading-relaxed">The event is timed to the longest day of the year — maximum daylight, evening light that lasts until after 10pm at this latitude. Victoria Park in full summer with an evening music event is about as good as outdoor events get in this part of the country.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <div className="text-3xl mb-3">🎵</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-3">Dance &amp; Music Focus</h3>
              <p className="text-gray-600 text-sm leading-relaxed">An 8-hour outdoor dance event with live music and DJ sets. The VIP positioning suggests premium production — stage, sound, lighting — rather than a basic outdoor event. Check the Southport 2026 website for the confirmed line-up as it is announced.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Summer Solstice Festival — FAQs</h2>
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

        <section className="bg-[#3D2A00] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Summer Solstice · 20 June 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">The Longest Day in Southport</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Check the Southport 2026 website for ticket information and confirmed line-up.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides/southport-year-of-culture-2026" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Southport 2026 Programme</Link>
            <Link href="/guides/southport-armed-forces-festival" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">Armed Forces Festival (June) →</Link>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
