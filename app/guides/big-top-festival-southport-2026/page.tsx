import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("big-top-festival-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Big Top Festival Southport 2026, circus festival Southport May, Circa Southport, Gandini Juggling Southport",
  alternates: { canonical: `${BASE_URL}/guides/big-top-festival-southport-2026` },
  openGraph: {
    title: "Big Top Festival Southport 2026 | 2–3 May · Circus Arts",
    description: "Big Top Festival Southport 2026 — two days of world-class circus arts. Circa and Gandini Juggling. 2–3 May. Free outdoor events and ticketed shows.",
    url: `${BASE_URL}/guides/big-top-festival-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/big-top-festival-southport-2026.jpg` }],
  },
};

const FAQS = [
  { q: "When is Big Top Festival in Southport 2026?", a: "Big Top Festival Southport 2026 takes place on Saturday 2 and Sunday 3 May 2026. It is part of the Bank Holiday weekend that also coincides with Southport Beer Week." },
  { q: "What is the Big Top Festival in Southport?", a: "Big Top Festival is a circus and street arts festival in Southport town centre, part of the Southport 2026: Elegantly Eccentric cultural programme. It features world-class circus companies including Circa (Australia) and Gandini Juggling (UK), with a mix of free outdoor performances and ticketed indoor shows." },
  { q: "Is Big Top Festival free?", a: "Some elements are free — outdoor performances in the town centre are free to watch. Some ticketed indoor shows require tickets. Check the Southport 2026 website for the specific programme and which performances are free versus ticketed." },
  { q: "Who is performing at Big Top Festival 2026?", a: "Confirmed performers include Circa, an acclaimed Australian physical theatre and circus company, and Gandini Juggling, one of the world's leading contemporary juggling companies. Both are internationally touring companies of the highest quality." },
  { q: "Where does Big Top Festival take place in Southport?", a: "Big Top Festival takes place across Southport town centre — on Lord Street, in the town's public spaces, and at The Atkinson. Some performances may be in Victoria Park. The outdoor performances typically move through the town centre over the two days." },
  { q: "Is Big Top Festival family friendly?", a: "Yes. Circus and street arts are inherently accessible and engaging for all ages. The outdoor performances are particularly suitable for families. It is one of the best events of the year for bringing children into town." },
  { q: "Can I combine Big Top Festival with Southport Beer Week?", a: "Yes — Southport Beer Week runs 20–25 May across 18 town-centre pubs, and the Big Top Festival falls at the start of that period. The Bank Holiday weekend of 2–3 May is one of the busiest weekends of Southport's year. Plan accommodation well in advance if you are staying over." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Big Top Festival Southport 2026",
  startDate: "2026-05-02",
  endDate: "2026-05-03",
  description: "Two-day circus and street arts festival in Southport town centre. Circa and Gandini Juggling. Free outdoor events and ticketed shows.",
  url: `${BASE_URL}/guides/big-top-festival-southport-2026`,
  image: `${BASE_URL}/images/guides/big-top-festival-southport-2026.jpg`,
  isAccessibleForFree: false,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Southport Town Centre",
    address: { "@type": "PostalAddress", addressLocality: "Southport", addressRegion: "Merseyside", addressCountry: "GB" },
  },
  organizer: { "@type": "Organization", name: "Sefton Council / Southport 2026: Elegantly Eccentric" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function BigTopFestivalPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="relative min-h-[75vh] flex items-end bg-[#5C1A1A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/guides/big-top-festival-southport-2026.jpg" alt="Big Top Festival Southport 2026 — circus arts festival" fill sizes="100vw" quality={90} className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5C1A1A] via-[#5C1A1A]/50 to-[#5C1A1A]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">2–3 May 2026</span>
              <span className="text-white/50 text-sm font-medium">Southport Town Centre · Circus Arts</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Big Top Festival
              <span className="block text-[#C9A84C]">Southport 2026</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">World-class circus arts across Southport town centre. Circa and Gandini Juggling. Two days. Free outdoor shows and ticketed performances. Bank Holiday weekend.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#what" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">What&apos;s On</a>
              <Link href="/guides/southport-year-of-culture-2026" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Southport 2026 Programme</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#5C1A1A] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "2–3 May", label: "When", sub: "Bank Holiday Weekend" },
              { icon: MapPin, value: "Town Centre", label: "Where", sub: "Southport" },
              { icon: Clock, value: "Two Days", label: "Duration", sub: "Outdoor + indoor shows" },
              { icon: MapPin, value: "Mostly Free", label: "Entry", sub: "Some ticketed shows" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Circus in the Town Centre. This Is Worth Your Bank Holiday.</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>Circa are not a touring novelty act. They are an Australian physical theatre company with an international reputation. Gandini Juggling are similarly serious — they have performed at the Edinburgh Festival and major arts venues across Europe. Bringing them to Southport for a Bank Holiday weekend is a genuine coup.</p>
              <p>The outdoor free shows are the heart of it — circus in a town centre on a spring Bank Holiday weekend is exactly what these streets are built for. Lord Street with performers in it, the weather cooperating, and people stopping to watch: that is the version of Southport I am proud of.</p>
              <p>The Bank Holiday weekend also runs into Beer Week (20–25 May). If you are planning to visit Southport for an event weekend, Big Top plus Beer Week is the combination to plan around. Book accommodation early — May is busy.</p>
            </div>
          </div>
        </section>

        <section id="what" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Companies</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Who Is Performing</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <div className="text-3xl mb-3">🎪</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-3">Circa</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">Australian physical theatre and circus company. Circa blend acrobatics, dance, and theatre into performances that are as much about emotion as technical skill. They have performed at major arts festivals worldwide. Their outdoor work is designed to stop crowds in their tracks.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <div className="text-3xl mb-3">🤹</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-3">Gandini Juggling</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">One of the world&apos;s leading contemporary juggling companies, based in the UK. Gandini&apos;s work transcends what most people think of when they hear &quot;juggling&quot; — it is choreographed, musical, and genuinely theatrical. Multiple Edinburgh Festival Fringe appearances and international touring.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Big Top Festival — FAQs</h2>
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

        <section className="bg-[#5C1A1A] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Big Top Festival · 2–3 May 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Bank Holiday Circus in Southport Town Centre</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Free outdoor shows. Ticketed performances at The Atkinson. World-class companies. Book accommodation early.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides/southport-year-of-culture-2026" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Southport 2026 Programme</Link>
            <Link href="/guides/southport-beer-week-2026" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">Beer Week (May) →</Link>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
