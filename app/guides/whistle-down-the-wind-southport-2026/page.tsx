import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Ticket, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("whistle-down-the-wind-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Whistle Down the Wind Southport 2026, The Atkinson Southport theatre, SONG Productions Southport musical April",
  alternates: { canonical: `${BASE_URL}/guides/whistle-down-the-wind-southport-2026` },
  openGraph: {
    title: "Whistle Down the Wind Southport 2026 | The Atkinson 9–11 April",
    description: "Andrew Lloyd Webber's Whistle Down the Wind performed by SONG Productions at The Atkinson, Lord Street. 9–11 April 2026.",
    url: `${BASE_URL}/guides/whistle-down-the-wind-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/whistle-down-the-wind-southport-2026.jpg` }],
  },
};

const FAQS = [
  { q: "When is Whistle Down the Wind at The Atkinson?", a: "Whistle Down the Wind runs at The Atkinson on Thursday 9, Friday 10, and Saturday 11 April 2026. Check The Atkinson's website for specific performance times — evening shows plus possible matinees on the Saturday." },
  { q: "What is Whistle Down the Wind?", a: "Whistle Down the Wind is a musical by Andrew Lloyd Webber with lyrics by Jim Steinman, based on the novel by Mary Hayley Bell. It tells the story of children in the American Deep South who believe a stranger hiding in their barn is Jesus Christ. It contains powerful Lloyd Webber ballads and is considered one of his most affecting works." },
  { q: "Who is performing Whistle Down the Wind at The Atkinson?", a: "The Southport performance is by SONG Productions. SONG (Southport) are a local theatre company who produce regular musical theatre productions at The Atkinson. They have a strong track record of quality local theatre productions." },
  { q: "How do I book tickets for Whistle Down the Wind at The Atkinson?", a: "Book directly through The Atkinson's website at atkinson.co.uk or call the box office. Booking in advance is essential — The Atkinson's studio theatre is intimate and the run is only three nights." },
  { q: "Where is The Atkinson Southport?", a: "The Atkinson is on Lord Street, Southport, PR8 1DB. It is in the centre of town on the main boulevard. Parking is available at the nearby Tulketh Street multi-storey (PR8 1EW, 5 min walk)." },
  { q: "Is there somewhere to eat near The Atkinson before the show?", a: "Yes. Lord Street has numerous restaurants within a few minutes' walk of The Atkinson. La Lanterna (Italian), The Bold Hotel restaurant, and several cafés and casual dining options are all close. Book ahead for a pre-show meal — midweek evenings in April can be busy." },
  { q: "Is The Atkinson accessible for disabled visitors?", a: "The Atkinson is an accessible venue with step-free access, hearing loops, and accessible toilet facilities. Contact the box office in advance if you have specific access requirements." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Whistle Down the Wind — SONG Productions at The Atkinson Southport",
  startDate: "2026-04-09T19:30:00+01:00",
  endDate: "2026-04-11T22:00:00+01:00",
  description: "Andrew Lloyd Webber's Whistle Down the Wind performed by SONG Productions at The Atkinson, Lord Street, Southport. 9–11 April 2026.",
  url: `${BASE_URL}/guides/whistle-down-the-wind-southport-2026`,
  image: `${BASE_URL}/images/guides/whistle-down-the-wind-southport-2026.jpg`,
  isAccessibleForFree: false,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "The Atkinson",
    address: { "@type": "PostalAddress", streetAddress: "Lord Street", addressLocality: "Southport", postalCode: "PR8 1DB", addressCountry: "GB" },
  },
  organizer: { "@type": "Organization", name: "SONG Productions" },
  performer: { "@type": "PerformingGroup", name: "SONG Productions Southport" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function WhistleDownTheWindPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="relative min-h-[75vh] flex items-end bg-[#3D0A0A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/guides/whistle-down-the-wind-southport-2026.jpg" alt="Whistle Down the Wind at The Atkinson Southport 2026 — SONG Productions musical theatre" fill sizes="100vw" quality={90} className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D0A0A] via-[#3D0A0A]/50 to-[#3D0A0A]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">9–11 April 2026</span>
              <span className="text-white/50 text-sm font-medium">The Atkinson · Lord Street · PR8 1DB</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Whistle Down
              <span className="block text-[#C9A84C]">the Wind</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">Andrew Lloyd Webber&apos;s powerful musical at The Atkinson on Lord Street. Three nights only. SONG Productions. Booking essential.</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.theatkinson.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">Book at The Atkinson</a>
              <Link href="/guides/the-atkinson-southport" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Atkinson Venue Guide</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3D0A0A] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "9–11 Apr", label: "When", sub: "Three nights only" },
              { icon: MapPin, value: "PR8 1DB", label: "Where", sub: "The Atkinson, Lord St" },
              { icon: Clock, value: "7:30pm", label: "Show Time", sub: "Evening performances" },
              { icon: Ticket, value: "Ticketed", label: "Entry", sub: "Book via atkinson.co.uk" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">SONG at The Atkinson: Local Theatre Worth Going To</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>SONG Productions are one of Southport&apos;s best-kept secrets. They produce proper musical theatre at The Atkinson — not amateur dramatics in the pejorative sense, but genuinely accomplished productions with good production values and strong performances. Whistle Down the Wind is one of Lloyd Webber&apos;s best scores. The songs hold up.</p>
              <p>The Atkinson&apos;s theatre is an intimate space. A three-night run means tickets go quickly. If you are interested in this, book now rather than later. The box office number is on the Atkinson website.</p>
              <p>The Atkinson itself is worth knowing about if you do not already. Gallery, café, library, and a proper arts programme. It is the cultural anchor of the town and one of the places that makes Southport more interesting than it might otherwise be.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">About the Show</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">About Whistle Down the Wind</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">The Musical</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Whistle Down the Wind is an Andrew Lloyd Webber musical with lyrics by Jim Steinman. It is based on Mary Hayley Bell&apos;s 1959 novel and the subsequent film. Set in the American Deep South, it follows children who discover a fugitive hiding in their barn and believe him to be Jesus Christ. The score includes powerful ballads and ensemble pieces.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-3xl mb-3">🎪</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">SONG Productions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">SONG (Southport) is a local theatrical company producing regular musical theatre at The Atkinson. They have produced productions including Chicago, Grease, and other major musicals to a consistently high standard. A Southport institution worth supporting.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Whistle Down the Wind — FAQs</h2>
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

        <section className="bg-[#3D0A0A] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Whistle Down the Wind · 9–11 April 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Three Nights Only — Book Now</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">The Atkinson&apos;s studio theatre is intimate. Three nights sells out. Book through the Atkinson website.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.theatkinson.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Book at theatkinson.co.uk</a>
            <Link href="/guides/the-atkinson-southport" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">The Atkinson Guide →</Link>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
