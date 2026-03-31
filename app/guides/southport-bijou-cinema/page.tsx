import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-bijou-cinema");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Southport Bijou Cinema, Bijou Cinema Southport, independent cinema Southport, Screen Club Southport",
  alternates: { canonical: `${BASE_URL}/guides/southport-bijou-cinema` },
  openGraph: {
    title: "Southport Bijou Cinema | Independent Cinema Guide",
    description: "Southport's independent community cinema on Post Office Avenue, weekly screenings, Screen Club film school, and live gig nights.",
    url: `${BASE_URL}/guides/southport-bijou-cinema`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/southport-bijou-cinema.jpg` }],
  },
};

const FAQS = [
  { q: "Where is the Bijou Cinema in Southport?", a: "The Bijou Cinema is on Post Office Avenue, Southport, PR9 0AG. It is just off Lord Street in the town centre, approximately 10 minutes' walk from Southport railway station." },
  { q: "What is the Bijou Cinema?", a: "The Bijou is Southport's independent community cinema, a small, characterful venue showing a mix of current releases, classics, and specialist programming. It is the alternative to the Vue multiplex, with a more personal atmosphere and a programme that reflects what a local independent cinema should show." },
  { q: "What is Screen Club at the Bijou?", a: "Screen Club is the Bijou's Tuesday evening film school, a regular weekly screening with a focus on film education and discussion. It covers film history, genres, and techniques, and is aimed at people who want to understand cinema rather than just watch it." },
  { q: "Does the Bijou Cinema show live music?", a: "Yes, the Bijou hosts regular live gig nights in addition to film screenings. It functions as a music venue as well as a cinema, which gives it a different feel to standard multiplexes. Check the Bijou's website or social media for upcoming gig dates." },
  { q: "How do I book tickets for the Bijou Cinema?", a: "Book through the Bijou Cinema's website or social media pages. You can also turn up on the night for most screenings, but popular events and Screen Club sessions benefit from advance booking." },
  { q: "How does the Bijou compare to Vue Cinema in Southport?", a: "Vue on London Square shows mainstream releases. The Bijou shows a wider range, including arthouse, foreign language, classics, and specialist programming. They serve different needs. If you want the latest blockbuster, Vue. If you want something different, more personal, or more interesting, the Bijou." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "MovieTheater",
  name: "Southport Bijou Cinema",
  description: "Independent community cinema on Post Office Avenue, Southport. Weekly screenings, Screen Club film school, and live music nights.",
  url: `${BASE_URL}/guides/southport-bijou-cinema`,
  image: `${BASE_URL}/images/guides/southport-bijou-cinema.jpg`,
  address: { "@type": "PostalAddress", streetAddress: "Post Office Avenue", addressLocality: "Southport", postalCode: "PR9 0AG", addressCountry: "GB" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function BijouCinemaPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="bg-[#0A0A1A] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">
          {/* Poster */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[44%] order-first md:order-last">
            <Image src="/images/guides/southport-bijou-cinema.jpg" alt="Southport Bijou Cinema — independent cinema on Post Office Avenue" fill sizes="(max-width: 768px) 100vw, 44vw" className="object-contain" priority />
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Independent Cinema</span>
              <span className="text-white/50 text-sm font-medium">Post Office Avenue · PR9 0AG · Southport</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Bijou Cinema</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">Southport&apos;s independent community cinema, weekly film screenings, the Tuesday Screen Club film school, and regular live gig nights. Not the multiplex.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#whats-on" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">What&apos;s On</a>
              <a href="https://southportbijoucinema.co.uk" target="_blank" rel="noopener noreferrer" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Bijou Website</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0A0A1A] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: MapPin, value: "PR9 0AG", label: "Where", sub: "Post Office Avenue" },
              { icon: CalendarDays, value: "Weekly", label: "Screenings", sub: "Regular programme" },
              { icon: Clock, value: "Tuesdays", label: "Screen Club", sub: "Film school sessions" },
              { icon: MapPin, value: "Live Music", label: "Also", sub: "Regular gig nights" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Southport Has an Independent Cinema, and It&apos;s Good</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>Most towns of Southport&apos;s size do not have an independent cinema. The Bijou is a genuine one, not a community screening room, but a proper independent venue doing a proper cinema programme. Post Office Avenue is just off Lord Street, which means it is central and easy to get to.</p>
              <p>Screen Club on Tuesdays is the thing that makes it distinct. It is a film school as much as a screening, designed for people who want to think about what they are watching, not just watch it. If that sounds like your kind of evening, it is worth trying.</p>
              <p>The fact that it also does live gig nights tells you what kind of venue it is. It serves a community that wants something more interesting than what the multiplex offers. Southport is better for having it.</p>
            </div>
          </div>
        </section>

        <section id="whats-on" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Programme</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What the Bijou Offers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🎬", title: "Film Screenings", detail: "Regular film programme covering current releases, recent films, and classics. The selection is broader and more interesting than a standard multiplex. Check the website for the current schedule." },
              { emoji: "🎓", title: "Screen Club", detail: "Tuesday evening film school, a dedicated session focused on film as art and craft. Covers film history, technique, and genre. Run by people who take cinema seriously." },
              { emoji: "🎸", title: "Live Gig Nights", detail: "Regular live music events in the cinema space. The intimate setting works well for smaller gigs. Mix of local acts and touring musicians. Check social media for upcoming dates." },
              { emoji: "🏛️", title: "The Venue", detail: "Post Office Avenue, just off Lord Street. An older building with the kind of character that new multiplex cinemas do not have. Not the biggest or most technically advanced, but a proper cinema." },
              { emoji: "🆚", title: "vs Vue Cinema", detail: "Vue on London Square is the mainstream option for blockbusters. The Bijou is the alternative, smaller, more personal, different programme. They serve different audiences and different moods." },
              { emoji: "📅", title: "How to Book", detail: "Check the Bijou website and social media for the current schedule. Most screenings allow walk-ins, but Screen Club and popular events benefit from advance booking." },
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Bijou Cinema. FAQs</h2>
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

        <section className="bg-[#0A0A1A] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Southport Bijou Cinema · Post Office Avenue</p>
          <h2 className="font-display text-3xl font-bold mb-4">Independent Cinema in Southport</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Check the current programme on the Bijou website, screenings, Screen Club sessions, and upcoming gig nights.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://southportbijoucinema.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Bijou Cinema Website</a>
            <Link href="/guides/live-music-southport" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">Live Music Guide →</Link>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
