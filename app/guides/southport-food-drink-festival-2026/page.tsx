import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-food-drink-festival-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Southport Food and Drink Festival 2026, food festival Southport May, Bank Holiday Southport food event",
  alternates: { canonical: `${BASE_URL}/guides/southport-food-drink-festival-2026` },
  openGraph: {
    title: "Southport Food and Drink Festival 2026 | 29–31 May Bank Holiday",
    description: "Southport Food and Drink Festival 2026 — three days across the Bank Holiday weekend. Free entry, 100+ traders, live entertainment. 29–31 May.",
    url: `${BASE_URL}/guides/southport-food-drink-festival-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/southport-food-drink-festival-2026.jpg` }],
  },
};

const FAQS = [
  { q: "When is the Southport Food and Drink Festival 2026?", a: "The Southport Food and Drink Festival 2026 runs from Friday 29 May to Sunday 31 May 2026 — the Bank Holiday weekend. This is one of the busiest weekends in Southport's events calendar." },
  { q: "Is the Southport Food and Drink Festival free?", a: "Entry to the Food and Drink Festival is free. There is no charge to attend. You pay for food and drink from the traders." },
  { q: "How many traders are at the Southport Food and Drink Festival?", a: "The festival typically features 100+ food and drink traders. The mix includes street food, artisan food producers, local restaurants serving festival portions, international cuisine, and drinks specialists." },
  { q: "Where is the Southport Food and Drink Festival?", a: "The festival takes place in Southport town centre — typically across Lord Street, the town square, and surrounding streets. The exact layout varies each year. The whole area is given over to the festival for the three days." },
  { q: "Is the Southport Food and Drink Festival family friendly?", a: "Yes. The festival is a family event — there is live entertainment alongside the food traders, and the open outdoor setting is good for families. There is also live music and other entertainment across the three days." },
  { q: "Can I stay overnight for the Southport Food and Drink Festival?", a: "Yes, but book early. The Bank Holiday weekend of 29–31 May is one of Southport's busiest weekends, with the Food and Drink Festival plus the final days of Beer Week (20–25 May). Hotels fill up. Book accommodation as far in advance as possible." },
  { q: "What else is on in Southport at the same time as the Food Festival?", a: "Beer Week runs from 20–25 May, so the early part overlaps with the Food and Drink Festival weekend. The Big Top Festival is 2–3 May. May is Southport's busiest month for events in 2026." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Southport Food and Drink Festival 2026",
  startDate: "2026-05-29",
  endDate: "2026-05-31",
  description: "Three-day food and drink festival in Southport town centre over the Bank Holiday weekend. Free entry, 100+ traders, live entertainment.",
  url: `${BASE_URL}/guides/southport-food-drink-festival-2026`,
  image: `${BASE_URL}/images/guides/southport-food-drink-festival-2026.jpg`,
  isAccessibleForFree: true,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Southport Town Centre",
    address: { "@type": "PostalAddress", addressLocality: "Southport", addressRegion: "Merseyside", addressCountry: "GB" },
  },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function FoodDrinkFestivalPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="relative min-h-[75vh] flex items-end bg-[#3D1A00] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/guides/southport-food-drink-festival-2026.jpg" alt="Southport Food and Drink Festival 2026 — Bank Holiday weekend town centre event" fill sizes="100vw" quality={90} className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D1A00] via-[#3D1A00]/50 to-[#3D1A00]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">29–31 May 2026</span>
              <span className="text-white/50 text-sm font-medium">Town Centre · Free Entry · Bank Holiday</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport Food
              <span className="block text-[#C9A84C]">&amp; Drink Festival</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">100+ food and drink traders across Southport town centre. Three days over the Bank Holiday weekend. Free entry, live entertainment.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#what" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">What&apos;s There</a>
              <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Hotels &amp; Parking</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3D1A00] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "29–31 May", label: "When", sub: "Bank Holiday weekend" },
              { icon: MapPin, value: "Town Centre", label: "Where", sub: "Lord Street & surrounding" },
              { icon: Clock, value: "3 Days", label: "Duration", sub: "Fri, Sat, Sun" },
              { icon: MapPin, value: "Free", label: "Entry", sub: "No admission charge" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Best Weekend to Visit Southport in 2026</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>The late May Bank Holiday is when Southport is at its best. The Food and Drink Festival turns the town centre into something genuinely worth visiting — 100+ traders, the town buzzing, weather that has a reasonable chance of cooperating. The combination of the festival and a Bank Holiday weekend makes it worth travelling for.</p>
              <p>The quality of the food traders varies, as it does at any festival of this size. The better producers tend to be the local and regional ones rather than the national festival circuit operators. Worth arriving early on Saturday when it is quieter and the choice is better.</p>
              <p>One warning: accommodation sells out. If you are thinking about staying over for this weekend, book now. This is not a drill. The Bank Holiday weekend with the Food Festival plus the final weekend of Beer Week means every hotel in town has been pre-booked for months.</p>
            </div>
          </div>
        </section>

        <section id="what" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What to Expect</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What&apos;s at the Festival</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🍽️", title: "100+ Food Traders", detail: "Street food, artisan food producers, local restaurant pop-ups, and international cuisine. The range is broad — you will find something worth eating regardless of preference." },
              { emoji: "🍺", title: "Drinks Specialists", detail: "Craft beer, artisan gin, local spirits, and wine traders. The drinks element is strong — expect both local producers and specialist importers." },
              { emoji: "🎵", title: "Live Entertainment", detail: "Live music and entertainment across the three days alongside the food traders. The festival has a programme beyond just eating." },
              { emoji: "🛍️", title: "Artisan Producers", detail: "Local food producers selling direct — cheese, preserves, bread, charcuterie. These tend to be the best value and most interesting part of the food offer." },
              { emoji: "👨‍👩‍👧‍👦", title: "Family Friendly", detail: "Open outdoor festival suitable for all ages. The scale of the event means there is plenty of space to move around with children." },
              { emoji: "📅", title: "Three Days", detail: "Friday 29, Saturday 30, and Sunday 31 May. Saturday typically the busiest. Friday afternoon and Sunday morning quieter and more relaxed for browsing." },
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
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Planning Your Visit</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Hotels, Parking &amp; Getting There</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
              <h3 className="font-display font-bold text-amber-900 text-lg mb-3">Book Accommodation Now</h3>
              <p className="text-amber-800 text-sm leading-relaxed">The late May Bank Holiday is Southport&apos;s busiest weekend. With the Food Festival and Beer Week simultaneously, hotels book out months in advance. If you are considering staying overnight, check availability now and book immediately. Lord Street hotels are most convenient — Bold Hotel, Vincent Hotel, Premier Inn on the Promenade.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">Parking on Festival Weekend</h3>
              <div className="space-y-2">
                {["Town centre car parks fill early on Bank Holiday Saturday", "Arrive before 10am for the easiest parking", "Tulketh Street multi-storey PR8 1EW — most central", "Alternatively: train from Liverpool, walk from station (10 min)", "Marine Drive fills by 9am on Bank Holiday weekends"].map((l) => (
                  <div key={l} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{l}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Food &amp; Drink Festival — FAQs</h2>
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

        <section className="bg-[#3D1A00] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Food &amp; Drink Festival · 29–31 May 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Free Entry. Book Your Hotel Now.</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">The festival is free. Your accommodation is not — and it books out. Sort the hotel first.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides/southport-beer-week-2026" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Beer Week Guide</Link>
            <Link href="/events" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">All May Events →</Link>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
