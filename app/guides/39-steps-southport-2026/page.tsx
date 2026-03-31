import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Ticket, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("39-steps-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "39 Steps Southport 2026, Southport Little Theatre, Southport Dramatic Club, thriller play Southport April",
  alternates: { canonical: `${BASE_URL}/guides/39-steps-southport-2026` },
  openGraph: {
    title: "The 39 Steps Southport 2026 | Little Theatre 10–18 April",
    description: "The 39 Steps by Southport Dramatic Club at the Little Theatre on Hoghton Street. 9-night run, 10–18 April 2026.",
    url: `${BASE_URL}/guides/39-steps-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/39-steps-southport-2026.jpg` }],
  },
};

const FAQS = [
  { q: "When is The 39 Steps at Southport Little Theatre?", a: "The 39 Steps runs at Southport Little Theatre from Friday 10 April to Saturday 18 April 2026. This is a nine-night run. Evening performances are typically at 7:30pm. Check the Little Theatre website for the complete schedule and any matinee performances." },
  { q: "Where is Southport Little Theatre?", a: "Southport Little Theatre is on Hoghton Street, Southport, PR9 0SX. It is approximately 10 minutes' walk from Southport railway station and 15 minutes from the Lord Street town centre." },
  { q: "What is The 39 Steps play?", a: "The 39 Steps is a stage adaptation of John Buchan's 1915 spy novel, made famous by Alfred Hitchcock's 1935 film. The comedic stage version, adapted by Patrick Barlow, uses four actors to play all 150 characters and is known for its inventive staging and physical comedy. It is a fast-paced, entertaining thriller." },
  { q: "How do I book tickets for The 39 Steps at the Little Theatre?", a: "Book directly through Southport Little Theatre's website. The Little Theatre is a community theatre with a loyal audience, so early booking is recommended, particularly for weekend performances." },
  { q: "Is Southport Little Theatre accessible?", a: "Contact the Little Theatre directly to discuss access requirements. The venue is a traditional community theatre and access arrangements vary, it is best to call ahead if you have specific needs." },
  { q: "Is there parking near Southport Little Theatre?", a: "Hoghton Street is in the town centre area, close to several pay-and-display car parks. The nearest are on King Street and the multi-storey on Tulketh Street (PR8 1EW). Street parking is limited in the immediate area. Arriving by train is a good option. Southport station is 10 min walk." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "The 39 Steps. Southport Dramatic Club at Southport Little Theatre",
  startDate: "2026-04-10T19:30:00+01:00",
  endDate: "2026-04-18T22:00:00+01:00",
  description: "The 39 Steps performed by Southport Dramatic Club at the Little Theatre, Hoghton Street. 9-night run, 10–18 April 2026.",
  url: `${BASE_URL}/guides/39-steps-southport-2026`,
  image: `${BASE_URL}/images/guides/39-steps-southport-2026.jpg`,
  isAccessibleForFree: false,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Southport Little Theatre",
    address: { "@type": "PostalAddress", streetAddress: "Hoghton Street", addressLocality: "Southport", postalCode: "PR9 0SX", addressCountry: "GB" },
  },
  organizer: { "@type": "Organization", name: "Southport Dramatic Club" },
  performer: { "@type": "PerformingGroup", name: "Southport Dramatic Club" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function ThirtyNineStepsPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="bg-[#1A1A2E] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">
          {/* Poster */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[44%] order-first md:order-last">
            <Image src="/images/guides/39-steps-southport-2026.jpg" alt="The 39 Steps at Southport Little Theatre 2026 — Southport Dramatic Club" fill sizes="(max-width: 768px) 100vw, 44vw" className="object-contain" priority />
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">10–18 April 2026</span>
              <span className="text-white/50 text-sm font-medium">Little Theatre · Hoghton Street · PR9 0SX</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              The 39 Steps
              <span className="block text-[#C9A84C]">Southport 2026</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">Southport Dramatic Club&apos;s production of John Buchan&apos;s classic spy thriller. Nine nights at the Little Theatre. Booking essential.</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.southportlittletheatre.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">Book Tickets</a>
              <a href="#about" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">About the Show</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A2E] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "10–18 Apr", label: "When", sub: "Nine-night run" },
              { icon: MapPin, value: "PR9 0SX", label: "Where", sub: "Little Theatre, Hoghton St" },
              { icon: Clock, value: "7:30pm", label: "Showtimes", sub: "Evening performances" },
              { icon: Ticket, value: "Ticketed", label: "Entry", sub: "Book in advance" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Little Theatre Is Worth Knowing About</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>Southport Little Theatre is one of those institutions that most people who have not been to Southport long do not know about. It is an independent community theatre that has been running for decades, on Hoghton Street just away from the main drag. Southport Dramatic Club are the resident company and they produce proper drama. The 39 Steps is exactly the kind of thing they do well.</p>
              <p>The stage adaptation of The 39 Steps, the Patrick Barlow version, not the original novel, is clever, funny, and physically inventive. It uses four actors to play all 150 characters. Done well, it is genuinely entertaining. Done badly, it is a nightmare. Southport Dramatic Club are experienced enough that it tends to be the former.</p>
              <p>Nine nights. Weekend performances will go first. Book early if you want a choice of date.</p>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">About the Production</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">The 39 Steps. About the Show</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">The Story</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Based on John Buchan&apos;s 1915 spy novel and the Patrick Barlow stage adaptation. Richard Hannay, a bored Londoner, gets embroiled in a spy plot and finds himself on the run across Britain. The stage version, four actors, 150 characters, relentless pace, is a comedy thriller. The Hitchcock film is famous; the stage adaptation is a different animal entirely.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">Southport Little Theatre</h3>
              <p className="text-gray-600 text-sm leading-relaxed">The Little Theatre on Hoghton Street is one of Southport&apos;s independent cultural venues. It is a proper theatre, raked seating, a real stage, technical lighting, and a bar. Southport Dramatic Club have been performing here for decades. It is the kind of venue that sustains a town&apos;s cultural life over the long term.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">The 39 Steps Southport. FAQs</h2>
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

        <section className="bg-[#1A1A2E] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">The 39 Steps · 10–18 April 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Book Your Seats</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Nine nights. Weekend shows will go first. Book through the Little Theatre website.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.southportlittletheatre.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Book at Little Theatre</a>
            <Link href="/guides/whistle-down-the-wind-southport-2026" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">Whistle Down the Wind →</Link>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Theatre &amp; Arts in Southport</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Whistle Down the Wind", month: "9–11 April 2026", desc: "Andrew Lloyd Webber musical at The Atkinson. SONG Productions. Three nights only.", href: "/guides/whistle-down-the-wind-southport-2026" },
                { name: "The Atkinson Southport", month: "Year-round", desc: "Gallery, theatre, café, and library on Lord Street. The cultural anchor of Southport.", href: "/guides/the-atkinson-southport" },
                { name: "Easter in Southport 2026", month: "1–6 April 2026", desc: "All Easter events. Cristal Palace, egg hunts, workshops, and more.", href: "/guides/easter-in-southport-2026" },
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
