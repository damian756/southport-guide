import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("sefton-open-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Sefton Open 2026, Sefton Open exhibition Southport, The Atkinson art exhibition 2026, open art exhibition Southport",
  alternates: { canonical: `${BASE_URL}/guides/sefton-open-2026` },
  openGraph: {
    title: "Sefton Open 2026 | The Atkinson 2 April–13 June · Free Exhibition",
    description: "Sefton Open 2026 at The Atkinson, Lord Street, Southport. Annual open art exhibition. 2 April to 13 June. Free entry.",
    url: `${BASE_URL}/guides/sefton-open-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/sefton-open-2026.jpg` }],
  },
};

const FAQS = [
  { q: "What is the Sefton Open?", a: "The Sefton Open is an annual open art exhibition held at The Atkinson on Lord Street, Southport. It is an open submission exhibition where artists from across Sefton and the wider region submit work to be selected and displayed. Categories typically include painting, drawing, sculpture, print, photography, and mixed media." },
  { q: "When is the Sefton Open 2026?", a: "The Sefton Open 2026 runs from Thursday 2 April to Saturday 13 June 2026 at The Atkinson, Lord Street, Southport (PR8 1DB). It is open during normal Atkinson gallery hours." },
  { q: "How much does it cost to see the Sefton Open?", a: "Entry to the Sefton Open is free. The Atkinson gallery is free to visit. No tickets or booking is required." },
  { q: "Can I buy work from the Sefton Open?", a: "Yes — work in the Sefton Open is generally for sale. Prices and purchase arrangements are handled through The Atkinson. Speak to the gallery staff if you are interested in buying a piece." },
  { q: "How do I get to The Atkinson for the Sefton Open?", a: "The Atkinson is on Lord Street, Southport, PR8 1DB. Parking at Tulketh Street multi-storey (PR8 1EW, 5 min walk) or Eastbank Street car park. Train: Southport station is 10 min walk via Lord Street." },
  { q: "Can artists submit work to the Sefton Open?", a: "Yes — the Sefton Open is an open submission exhibition. Submission details, deadlines, and eligibility criteria are published by The Atkinson each year. Check the Atkinson website for the submission process for future exhibitions." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "ExhibitionEvent",
  name: "Sefton Open 2026",
  startDate: "2026-04-02",
  endDate: "2026-06-13",
  description: "Annual open art exhibition at The Atkinson, Lord Street, Southport. Painting, sculpture, print, mixed media from Sefton and regional artists. Free entry.",
  url: `${BASE_URL}/guides/sefton-open-2026`,
  image: `${BASE_URL}/images/guides/sefton-open-2026.jpg`,
  isAccessibleForFree: true,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "The Atkinson",
    address: { "@type": "PostalAddress", streetAddress: "Lord Street", addressLocality: "Southport", postalCode: "PR8 1DB", addressCountry: "GB" },
  },
  organizer: { "@type": "Organization", name: "The Atkinson", url: "https://www.theatkinson.co.uk" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function SeftonOpenPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="relative min-h-[75vh] flex items-end bg-[#0A2E3D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/guides/sefton-open-2026.jpg" alt="Sefton Open 2026 at The Atkinson Southport — free art exhibition" fill sizes="100vw" quality={90} className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E3D] via-[#0A2E3D]/50 to-[#0A2E3D]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">2 Apr – 13 Jun 2026</span>
              <span className="text-white/50 text-sm font-medium">The Atkinson · Lord Street · Free Entry</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Sefton Open
              <span className="block text-[#C9A84C]">2026</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">The annual open art exhibition at The Atkinson on Lord Street. Painting, sculpture, print, and mixed media from local and regional artists. Two and a half months. Free to visit.</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.theatkinson.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">The Atkinson Website</a>
              <Link href="/guides/the-atkinson-southport" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Atkinson Venue Guide</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0A2E3D] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "2 Apr–13 Jun", label: "When", sub: "10 weeks" },
              { icon: MapPin, value: "PR8 1DB", label: "Where", sub: "The Atkinson, Lord St" },
              { icon: Clock, value: "Tue–Sat", label: "Open", sub: "10am–5pm" },
              { icon: MapPin, value: "Free", label: "Entry", sub: "No charge" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Best of What Local Artists Are Making Right Now</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>The Sefton Open is the exhibition I go to every year without having to think about it. It runs from April, so it is the thing that is on when you visit in Easter or spring. Two and a half months at The Atkinson. Free. No pretence about it.</p>
              <p>It is an open exhibition — any artist from the area can submit. That means the quality varies and there is always something that makes you think the selection panel had a generous day. It also means there are always a few things that are genuinely excellent. The discovery element is part of the appeal.</p>
              <p>The work is for sale. The prices are reasonable by the standards of original art. If you visit and find something you want on your wall, you can buy it through the gallery. Worth knowing.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">About the Exhibition</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What the Sefton Open Shows</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🎨", title: "Painting & Drawing", detail: "The largest category — oil, watercolour, acrylic, gouache, and mixed media. Landscapes, portraits, abstracts, and observational work from artists across Sefton and the north-west." },
              { emoji: "🖼️", title: "Print", detail: "Printmaking including etching, screen print, linocut, and lithography. Often strong in open exhibitions — the discipline of printmaking tends to produce focused, considered work." },
              { emoji: "🏺", title: "Sculpture & 3D", detail: "Three-dimensional work including sculpture, ceramics, and installation. The Atkinson gallery has good space for larger pieces." },
              { emoji: "📷", title: "Photography", detail: "Fine art photography as part of the exhibition selection. Local and regional photographers submitting work alongside the other disciplines." },
              { emoji: "🎭", title: "Mixed Media", detail: "Work that does not fit neatly into a single category — collage, textiles, assemblage, and pieces combining multiple techniques." },
              { emoji: "💰", title: "Work for Sale", detail: "Most work in the Sefton Open is priced for sale. Speak to gallery staff for details of any piece. Original art from local artists at accessible prices — this is one of the better opportunities to buy something that means something." },
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Sefton Open 2026 — FAQs</h2>
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

        <section className="bg-[#0A2E3D] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Sefton Open 2026 · 2 April – 13 June</p>
          <h2 className="font-display text-3xl font-bold mb-4">Free. The Atkinson. Ten Weeks.</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">No booking required. Free entry. Check The Atkinson website for opening times.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides/the-atkinson-southport" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">The Atkinson Guide</Link>
            <a href="https://www.theatkinson.co.uk" target="_blank" rel="noopener noreferrer" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">theatkinson.co.uk →</a>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
