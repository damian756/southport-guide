import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-artisan-market");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport Artisan Market, artisan market Southport, Southport Market PR8 1EF, independent market Southport",
  alternates: { canonical: `${BASE_URL}/guides/southport-artisan-market` },
  openGraph: {
    title: "Southport Artisan Market | Monthly Independent Makers Market",
    description:
      "Southport Artisan Market at Southport Market. 50+ independent makers, artists, and food producers. Monthly, free entry. Dates, what to expect, parking.",
    url: `${BASE_URL}/guides/southport-artisan-market`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/southport-artisan-market.jpg` }],
  },
};

const FAQS = [
  { q: "When is the Southport Artisan Market?", a: "The Southport Artisan Market runs monthly, typically on a Saturday or Sunday. The next date is usually the first Saturday of the month at Southport Market on Market Street (PR8 1EF). Check the Southport Market social media pages for confirmed monthly dates." },
  { q: "Where is the Southport Artisan Market?", a: "Southport Market, Market Street, Southport, PR8 1EF. The market building is a converted Victorian market hall just off Lord Street in the town centre. The artisan market runs inside the market hall and, weather permitting, extends onto Market Street itself." },
  { q: "How much does the Southport Artisan Market cost?", a: "Entry is free. There is no charge to browse the stalls. You pay for whatever you buy from the traders." },
  { q: "What is sold at the Southport Artisan Market?", a: "The market typically features 50+ stalls selling handmade crafts, artwork, jewellery, ceramics, candles, food and drink producers, plants, vintage items, and local artisan goods. The mix of stalls changes each month. Expect to spend time browsing, it is not a quick visit." },
  { q: "Is the Southport Artisan Market dog friendly?", a: "Dogs on leads are welcome at the outdoor sections of the market. The indoor Southport Market hall has its own rules on dogs, check with individual vendors. Generally, well-behaved dogs on leads are tolerated in the outdoor areas." },
  { q: "Where can I park for the Southport Artisan Market?", a: "Southport Market is just off Lord Street in the town centre. The nearest car parks are Tulketh Street multi-storey (PR8 1EW, 5 min walk) and Eastbank Street (PR8 1DQ, 7 min walk). Lord Street itself has some on-street parking. Arrive early on busy market days as town centre parking fills up." },
  { q: "Where can I eat at or near the Southport Artisan Market?", a: "Southport Market itself has a permanent food hall with several independent food operators including coffee, street food, and dessert traders. These run every day the market is open, not just on artisan market days. After browsing the artisan stalls, the food hall is the obvious choice." },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function SouthportArtisanMarketPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="bg-[#2C1A00] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">
          {/* Poster */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[44%] order-first md:order-last">
            <Image src="/images/guides/southport-artisan-market.jpg" alt="Southport Artisan Market — 50+ independent makers at Southport Market" fill sizes="(max-width: 768px) 100vw, 44vw" className="object-contain" priority />
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Monthly Event</span>
              <span className="text-white/50 text-sm font-medium">Southport Market · PR8 1EF · Free Entry</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Artisan Market</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              50+ independent makers, artists, and food producers in the heart of Southport Market.
              Monthly, free to browse, and genuinely worth the trip.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#what" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">What&apos;s There</a>
              <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Getting There</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#2C1A00] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "Monthly", label: "When", sub: "Usually 1st Saturday" },
              { icon: MapPin, value: "PR8 1EF", label: "Where", sub: "Southport Market" },
              { icon: Clock, value: "10am–4pm", label: "Hours", sub: "Typical hours" },
              { icon: MapPin, value: "Free", label: "Entry", sub: "No charge to browse" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Best Version of Southport Market</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>Southport Market is one of the better things to happen to the town centre in recent years. It took a building that had been sitting underused and turned it into something with genuine energy. The artisan market days, when 50+ independent makers fill the stalls, are the best version of the place.</p>
              <p>The mix changes month to month. Some of the regulars are excellent, good ceramics, proper food producers, jewellery worth looking at. The food hall that runs alongside it every day is decent for a coffee and something to eat. It is not a tourist trap version of a market. It is the real thing.</p>
              <p>If you are visiting Southport for the first time and you are there on an artisan market day, it should be on your list. If you live here and have not been: you are missing out. Check the Southport Market social pages for exact monthly dates before you go.</p>
            </div>
          </div>
        </section>

        <section id="what" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What to Find</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What&apos;s at the Market</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🎨", title: "Art & Prints", detail: "Original paintings, limited edition prints, photography, and illustrations from local and regional artists. Mix of established sellers and newer makers." },
              { emoji: "🏺", title: "Ceramics & Pottery", detail: "Handmade ceramics from independent potters. Everything from mugs and bowls to decorative pieces. Some of the best stalls at the market." },
              { emoji: "💍", title: "Jewellery & Accessories", detail: "Handmade jewellery, silver, semi-precious stones, repurposed materials. Not the mass-produced kind you find in high street markets." },
              { emoji: "🕯️", title: "Candles, Soaps & Wellbeing", detail: "Local makers doing scented candles, artisan soaps, and wellness products. The quality here is generally well above average." },
              { emoji: "🍞", title: "Food & Drink Producers", detail: "Artisan food producers alongside the main craft stalls. Cheese, bread, preserves, honey, and speciality food from local and regional makers." },
              { emoji: "☕", title: "Southport Market Food Hall", detail: "The permanent food hall runs every day the market is open, not just artisan market days. Coffee, street food, and dessert operators. Worth combining your market visit with lunch here." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="practical" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Getting There &amp; Parking</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">Parking</h3>
              <div className="space-y-2">
                {["Tulketh Street multi-storey, PR8 1EW. 5 min walk, usually has space", "Eastbank Street car park, PR8 1DQ. 7 min walk", "Lord Street on-street parking, limited, fills early on market days", "Arrive before 10:30am for the best parking options on busy Saturdays"].map((l) => (
                  <div key={l} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{l}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">By Train</h3>
              <div className="space-y-2">
                {["Southport station. Merseyrail Northern Line from Liverpool Central", "30–40 min direct from Liverpool", "10 min walk from the station to Southport Market", "Good option if town centre parking is likely to be busy"].map((l) => (
                  <div key={l} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{l}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Artisan Market. FAQs</h2>
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

        <section className="bg-[#2C1A00] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Southport Artisan Market · Monthly</p>
          <h2 className="font-display text-3xl font-bold mb-4">Next Market Day</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Check Southport Market&apos;s social pages for the confirmed monthly date before you visit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.southportmarket.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Southport Market Website</a>
            <Link href="/events" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">All Events →</Link>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Markets &amp; Events in Southport</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "KC Artisan Party in the Park", month: "11–12 April 2026", desc: "Two days of artisan market, live music and street food at Victoria Park.", href: "/guides/kc-artisan-party-in-the-park-southport-2026" },
                { name: "Food & Drink Festival", month: "29–31 May 2026", desc: "Bank Holiday weekend food festival, 100+ traders, free entry.", href: "/guides/southport-food-drink-festival-2026" },
                { name: "Full Events Calendar", month: "All of 2026", desc: "Everything happening in Southport this year.", href: "/events" },
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
