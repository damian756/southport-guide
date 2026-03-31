import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("kc-artisan-party-in-the-park-southport-2026");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "KC Artisan Party in the Park Southport 2026, party in the park Southport April, Victoria Park Southport event",
  alternates: { canonical: `${BASE_URL}/guides/kc-artisan-party-in-the-park-southport-2026` },
  openGraph: {
    title: "KC Artisan Party in the Park Southport 2026 | 11–12 April",
    description: "Two days of live music, artisan stalls, street food, and family entertainment at Victoria Park. 11–12 April 2026. Free entry.",
    url: `${BASE_URL}/guides/kc-artisan-party-in-the-park-southport-2026`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/kc-artisan-party-in-the-park-southport-2026.jpg` }],
  },
};

const FAQS = [
  { q: "When is KC Artisan Party in the Park in Southport 2026?", a: "KC Artisan Party in the Park 2026 takes place on Saturday 11 April and Sunday 12 April at Victoria Park, Southport (PR8 2BZ)." },
  { q: "Is KC Artisan Party in the Park free?", a: "Yes, entry to KC Artisan Party in the Park is free. You pay for anything you buy from the stalls or food traders." },
  { q: "What is at KC Artisan Party in the Park?", a: "The event features artisan market stalls from independent makers and crafters, live music performances across the two days, street food traders, and entertainment for families and children. It runs as an outdoor festival across Victoria Park." },
  { q: "Where is Victoria Park in Southport?", a: "Victoria Park is on Rotten Row, Southport, postcode PR8 2BZ. It is approximately 15 minutes' walk from Southport railway station and 10–15 minutes from the town centre. It is the same park used for the Sausage & Cider Festival and the Flower Show." },
  { q: "Is KC Artisan Party in the Park family friendly?", a: "Yes. The event includes family entertainment alongside the artisan market and live music. It is designed as an all-ages outdoor event. Dogs on leads are usually welcome in the park itself." },
  { q: "How do I get to Victoria Park for KC Party in the Park?", a: "Victoria Park is accessible by car (park on surrounding residential streets), by train (15 min walk from Southport station), or by bus. Town centre car parks are a 10–15 min walk from the park entrance on Rotten Row." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "KC Artisan Party in the Park Southport 2026",
  startDate: "2026-04-11",
  endDate: "2026-04-12",
  description: "Two-day outdoor festival at Victoria Park, Southport. Live music, artisan market stalls, street food, and family entertainment. Free entry.",
  url: `${BASE_URL}/guides/kc-artisan-party-in-the-park-southport-2026`,
  image: `${BASE_URL}/images/guides/kc-artisan-party-in-the-park-southport-2026.jpg`,
  isAccessibleForFree: true,
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

export default function KCArtisanParkPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="relative min-h-[75vh] flex items-end bg-[#1A3D20] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/guides/kc-artisan-party-in-the-park-southport-2026.jpg" alt="KC Artisan Party in the Park Southport 2026 at Victoria Park" fill sizes="100vw" quality={90} className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D20] via-[#1A3D20]/50 to-[#1A3D20]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">11–12 April 2026</span>
              <span className="text-white/50 text-sm font-medium">Victoria Park · PR8 2BZ · Free</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              KC Artisan
              <span className="block text-[#C9A84C]">Party in the Park</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">Two days of live music, artisan market stalls, street food, and family entertainment at Victoria Park. Easter weekend, free entry.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#what" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">What&apos;s There</a>
              <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Getting There</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A3D20] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "11–12 Apr", label: "When", sub: "Easter weekend" },
              { icon: MapPin, value: "PR8 2BZ", label: "Where", sub: "Victoria Park" },
              { icon: Clock, value: "Both Days", label: "Duration", sub: "Two-day festival" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Victoria Park on a Spring Weekend</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>Victoria Park suits this kind of event well. The space is right, the setting is pleasant, and two days of artisan stalls and live music over Easter weekend makes for a decent family day out. It runs on the Sunday after Good Friday and Cristal Palace, so if you are making a long Easter weekend of it in Southport, this slots neatly into the programme.</p>
              <p>The artisan element is genuine — independent makers rather than mass-produced market fare. The live music keeps it from feeling like just a shopping event. Combine it with lunch from the food traders and you have a full Saturday or Sunday covered without spending much.</p>
              <p>Weather in April in Merseyside is what it is. If it is good, Victoria Park on a sunny spring weekend is one of the better places to spend an afternoon. Bring a layer regardless.</p>
            </div>
          </div>
        </section>

        <section id="what" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">At the Event</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What&apos;s There</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🎸", title: "Live Music", detail: "Live music performances across both days. Mix of local and regional acts. The stage is a central part of the event rather than background entertainment." },
              { emoji: "🏺", title: "Artisan Market Stalls", detail: "Independent makers selling handmade goods — crafts, jewellery, ceramics, prints, and more. The artisan element is what distinguishes it from a standard market." },
              { emoji: "🍔", title: "Street Food", detail: "Street food traders across the park. Wide range of food options. Better than average for a park event — independent operators rather than chain concessions." },
              { emoji: "👨‍👩‍👧‍👦", title: "Family Entertainment", detail: "Activities and entertainment for families with children. Specific family programming alongside the main market and music." },
              { emoji: "🌳", title: "Victoria Park Setting", detail: "Victoria Park is Southport's main public park — mature trees, open green space, and enough room to spread out. A proper park festival setting." },
              { emoji: "📅", title: "Easter Weekend", detail: "Runs Saturday 11 and Sunday 12 April, directly after the Good Friday events including Cristal Palace. Good for combining with the wider Easter programme." },
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-3">By Car</h3>
                <div className="space-y-2">
                  {["Victoria Park postcode: PR8 2BZ", "Street parking on Rotten Row and surrounding roads", "Town centre car parks — 10–15 min walk to the park", "Do not rely on finding a space directly outside on busy days"].map((l) => (
                    <div key={l} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{l}</span></div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-3">By Train</h3>
                <div className="space-y-2">
                  {["Southport station — Merseyrail Northern Line from Liverpool", "15 min walk from the station to Victoria Park", "Good option for Easter weekend when parking is busier"].map((l) => (
                    <div key={l} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{l}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">KC Party in the Park — FAQs</h2>
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

        <section className="bg-[#1A3D20] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">KC Artisan Party in the Park · 11–12 April 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Free. Victoria Park. Easter Weekend.</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Artisan stalls, live music, street food, and family entertainment across two days.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides/easter-in-southport-2026" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Easter Events Guide</Link>
            <Link href="/events" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">All Southport Events →</Link>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
