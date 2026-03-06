import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Car,
  ChevronRight,
  ArrowRight,
  Utensils,
  ShoppingBag,
  Coffee,
  Flag,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("birkdale-village");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Birkdale village, Birkdale village shops, Birkdale village restaurants, Birkdale village Southport, Liverpool Road Birkdale, Birkdale cafes",
  alternates: { canonical: `${BASE_URL}/guides/birkdale-village` },
  openGraph: {
    title: "Birkdale Village | Southport's Independent Quarter | SouthportGuide",
    description: "Independent boutiques, excellent restaurants, and proper coffee. Birkdale Village is where Southport locals actually shop and eat.",
    url: `${BASE_URL}/guides/birkdale-village`,
    images: [{ url: `${BASE_URL}/images/birkdale-village.webp` }],
  },
};

const FAQS = [
  { q: "Where is Birkdale Village?", a: "Birkdale Village is centred on Liverpool Road, Birkdale, Southport — postcode PR8 4AR. It is approximately 2 miles south of Southport town centre, and about 2 minutes' drive (or 10 minutes' walk) from Royal Birkdale Golf Club." },
  { q: "What is Birkdale Village like?", a: "Birkdale Village has the feel of a proper neighbourhood high street — independent boutiques, decent restaurants, good cafés, a butcher, an off-licence, and the general sense that you're somewhere that people actually live and use. It's quieter and more residential than Southport town centre, and that's the point." },
  { q: "Is there parking in Birkdale Village?", a: "Yes — there's on-street parking along Liverpool Road and side streets. It fills up on busy weekend mornings but isn't usually a problem on weekday visits. The village is also walkable from Birkdale train station (about 5 minutes on foot)." },
  { q: "How do I get to Birkdale Village by train?", a: "Birkdale station is on the Merseyrail Northern Line — the same line as Southport, one stop south. From Liverpool Central, trains run direct to Birkdale approximately every 20–30 minutes. The village is about a 5-minute walk from the station." },
  { q: "What shops are in Birkdale Village?", a: "Birkdale Village has a strong concentration of independent shops — fashion boutiques, homeware, gifts, jewellery, artisan food shops, and services. The absence of chain stores is one of its main attractions. The exact mix changes over time — walking the length of Liverpool Road gives you the full picture." },
  { q: "Is Birkdale Village good for dinner?", a: "Yes — Birkdale Village has a quality dining offer relative to its size. Several independent restaurants along Liverpool Road, ranging from relaxed bistro dining to more formal options. Booking ahead is recommended for Friday and Saturday evenings, particularly during The Open Championship week when the village gets very busy." },
  { q: "How far is Birkdale Village from Royal Birkdale Golf Club?", a: "Royal Birkdale Golf Club is approximately 10 minutes' walk from Birkdale Village. The club entrance is on Waterloo Road, just behind the village. During Open week, the village restaurants and cafés become the obvious pre- and post-round options for spectators." },
  { q: "Is Birkdale Village worth visiting if I'm staying in Southport?", a: "Yes — it's a completely different character to the town centre and worth the short journey. Best for an afternoon's browsing combined with lunch or dinner. The pace is slower, the quality is high, and it gives you a sense of how Southport's residents actually live rather than the tourism-facing version of the town." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "ShoppingDistrict",
  name: "Birkdale Village",
  description: "Birkdale Village — Southport's independent shopping and dining quarter, centred on Liverpool Road. Two minutes from Royal Birkdale Golf Club.",
  url: `${BASE_URL}/guides/birkdale-village`,
  geo: { "@type": "GeoCoordinates", latitude: 53.6326, longitude: -3.0258 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Liverpool Road",
    addressLocality: "Birkdale, Southport",
    postalCode: "PR8 4AR",
    addressCountry: "GB",
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

export default function BirkdaleVillageGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#2C1A10] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/birkdale-village.webp"
            alt="Birkdale Village — independent boutique shopfronts with hanging flower baskets"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A10] via-[#2C1A10]/55 to-[#2C1A10]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Southport
              </span>
              <span className="text-white/50 text-sm font-medium">PR8 4AR · 2 miles from town centre</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Birkdale
              <span className="block text-[#C9A84C]">Village</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              The locals&apos; preference. Independent boutiques, proper restaurants, and decent coffee on Liverpool Road —
              two minutes from Royal Birkdale Golf Club, and entirely worth the short detour from the town centre.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#shopping" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                Shopping &amp; Dining
              </a>
              <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Getting There →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#2C1A10] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: MapPin, value: "PR8 4AR", label: "Postcode", sub: "Liverpool Road" },
              { icon: Car, value: "2 miles", label: "From town centre", sub: "5 min drive" },
              { icon: Flag, value: "10 min walk", label: "Royal Birkdale", sub: "Golf Club" },
              { icon: Star, value: "Free", label: "Parking", sub: "On-street" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Why Locals Come Here Instead of the Town Centre</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Birkdale Village is what happens when a community supports its independents for long enough that they
                become the character of the place rather than the exception to it. Liverpool Road doesn&apos;t have a
                Greggs or a Starbucks or a Subway. What it has is a butcher that&apos;s been there for decades,
                an off-licence that actually knows its wine, a bakery that does proper bread, and a handful of
                boutiques that sell things you actually want to buy.
              </p>
              <p>
                For shopping, I&apos;d take Birkdale over Lord Street most days — it&apos;s more manageable,
                easier to park, and the quality of what you find is consistently higher.
                For dinner, the restaurants in the village hold up well: the kind of places where the cooking is serious
                but the atmosphere is relaxed, and you don&apos;t need to book three weeks ahead except on event weekends.
              </p>
              <p>
                The Royal Birkdale connection adds something too — during Open week, international golf fans find their way
                here, and the village handles it well. But on a quiet Wednesday in October it&apos;s just as good,
                if not better. That&apos;s what a proper neighbourhood looks like.
              </p>
            </div>
          </div>
        </section>

        {/* ── Shopping ── */}
        <section id="shopping" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Independent Retail</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Shopping in Birkdale</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Liverpool Road and its surrounding streets have one of the highest concentrations of independent shops
              in the Southport area. No chains. All worth browsing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "👗", category: "Fashion & Clothing", detail: "Independent fashion boutiques with a quality-over-quantity approach. Mix of women&apos;s fashion, accessories, and lifestyle clothing that you won&apos;t find in any department store. The buyers for these shops generally know what they&apos;re doing." },
              { emoji: "🏡", category: "Homeware & Gifts", detail: "Interiors shops and gift retailers stocking the kind of things that make for a proper present — not the standard Waterstones-adjacent gift shop fare. Several have strong local maker representation." },
              { emoji: "💎", category: "Jewellery", detail: "Independent jewellers with own-design ranges and quality vintage pieces. Better range and more interesting pieces than typical high street jewellers, at prices that are often more reasonable than you&apos;d expect." },
              { emoji: "🥩", category: "Food & Artisan Produce", detail: "A proper butcher, a bakery, and specialist food shops. The butcher in particular has a following — the kind of place where the staff know where the meat comes from and will tell you if you ask. Worth the visit even if you&apos;re not buying clothes." },
              { emoji: "📚", category: "Books & Stationery", detail: "A small but well-curated independent bookshop. The kind of place where the stock reflects genuine editorial choices rather than algorithms. Worth spending time in." },
              { emoji: "🌿", category: "Beauty & Wellness", detail: "Independent beauty and wellness shops with a focus on quality ingredients. Smaller specialist retailers that tend to be more interesting than chain equivalents. Good for gifts." },
            ].map((item) => (
              <div key={item.category} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.category}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#1B2E4B] rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <ShoppingBag className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-bold text-white text-base mb-2">Shopping tip</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  The village is best walked end to end — Liverpool Road is the main artery, but several worth-visiting
                  shops are on the side streets off it. Allow a couple of hours to browse properly.
                  Saturday mornings tend to be the most active. The village is quieter on weekday afternoons —
                  easier to browse, easier to park.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Eating & Drinking ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Food &amp; Drink</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Eating &amp; Drinking</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Birkdale Village&apos;s eating and drinking offer is compact but consistently good.
              Locals rate it over the town centre for a relaxed meal.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Utensils, type: "Restaurants", color: "from-[#1B2E4B] to-[#2A4A73]", highlights: ["Independent bistro dining — the village avoids chains", "Book ahead for Friday and Saturday evenings", "Open week (The Open Championship, July) gets very busy — essential to book", "Cuisine mix: modern European, Italian, and international", "Most restaurants are smaller (30–60 covers) — book early for groups"] },
              { icon: Coffee, type: "Cafés & Coffee", color: "from-[#1A4020] to-[#2E6830]", highlights: ["The village has several quality independent cafés", "Morning coffee stop before exploring the village is a well-worn routine", "Proper flat whites, not supermarket-style espresso machines", "Food menus lean toward quality over volume — good scones, good lunch", "Generally quieter and easier to get a table than Lord Street equivalents"] },
              { icon: Flag, type: "Pubs & Bars", color: "from-[#7A1A1A] to-[#B02020]", highlights: ["The Bold Hotel bar is the premium Birkdale drinking option — good cocktails, proper setting", "Several traditional pubs within walking distance", "Village pubs tend to welcome dogs — ask on arrival", "Post-round drinks culture strong during Open week", "Pre-dinner drinks are better here than town centre for a quieter start"] },
            ].map((item) => (
              <div key={item.type} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${item.color} px-6 py-5 flex items-center gap-3`}>
                  <item.icon className="w-5 h-5 text-[#C9A84C]" />
                  <h3 className="font-display font-bold text-white text-lg">{item.type}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {item.highlights.map((line) => (
                      <div key={line} className="flex gap-2 text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link href="/restaurants" className="inline-flex items-center gap-2 bg-[#1B2E4B] text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#2A4A73] transition-colors">
              Browse All Southport Restaurants <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Royal Birkdale ── */}
        <section>
          <div className="bg-gradient-to-r from-[#1A4020] to-[#2E6830] rounded-2xl p-8 md:p-12 text-white">
            <Flag className="w-8 h-8 text-[#C9A84C] mb-5" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Birkdale Village &amp; Royal Birkdale</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-white/70 text-base leading-relaxed mb-4">
                  Royal Birkdale Golf Club — one of the finest links courses in England, host of The Open Championship
                  eleven times — is approximately 10 minutes&apos; walk from the village centre. The two are neighbours
                  in the most literal sense.
                </p>
                <p className="text-white/70 text-base leading-relaxed">
                  During Open week in July 2026, Birkdale Village becomes the natural gathering point for spectators,
                  players&apos; families, and journalists staying in the area. The restaurants and cafés plan for it;
                  book ahead if you&apos;re visiting during the championship.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Walking distance to club", value: "10 minutes" },
                  { label: "Royal Birkdale ranking", value: "World Top 25" },
                  { label: "Open Championships hosted", value: "11 times" },
                  { label: "Next Open at Birkdale", value: "July 2026" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center border-b border-white/20 pb-3">
                    <span className="text-white/60 text-sm">{item.label}</span>
                    <span className="text-[#C9A84C] font-bold text-sm">{item.value}</span>
                  </div>
                ))}
                <Link href="/the-open-2026" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#E8C87A] transition-colors mt-2">
                  The Open 2026 Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Practical ── */}
        <section id="practical" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Getting There</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Practical Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <Car className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">By Car</h3>
              <div className="space-y-2">
                {[
                  "Postcode: PR8 4AR (Liverpool Road, Birkdale)",
                  "2 miles south of Southport town centre — 5–10 minute drive",
                  "On-street parking along Liverpool Road and side streets",
                  "Usually straightforward on weekdays and weekend afternoons",
                  "Open week (July) and summer Saturdays: busier — arrive before 10am",
                ].map((line) => (
                  <div key={line} className="flex gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">By Train</h3>
              <div className="space-y-2">
                {[
                  "Birkdale station: Merseyrail Northern Line, 1 stop south of Southport",
                  "From Liverpool Central: direct to Birkdale, approximately 35–40 min",
                  "From Southport: one stop south, 3–4 minutes",
                  "5-minute walk from Birkdale station to Liverpool Road",
                  "Trains run approximately every 20–30 minutes",
                ].map((line) => (
                  <div key={line} className="flex gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Birkdale vs Lord Street ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Birkdale Village vs Lord Street — Which to Choose?</h2>
              <p className="text-gray-600 mt-2 text-sm">The honest comparison.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-5 py-3 font-semibold text-[#1B2E4B]">You want…</th>
                    <th className="text-left px-5 py-3 font-semibold text-[#C9A84C]">Birkdale Village</th>
                    <th className="text-left px-5 py-3 font-semibold text-[#1B2E4B]">Lord Street</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { want: "Independent shops", birkdale: "Excellent — the whole point", lord: "Good — strong independents" },
                    { want: "A quiet browse", birkdale: "✅ Easier to move around", lord: "Busier, more footfall" },
                    { want: "Wider choice", birkdale: "Smaller — more curated", lord: "✅ More shops overall" },
                    { want: "Easy parking", birkdale: "✅ On-street, usually fine", lord: "Pay and display, busier" },
                    { want: "Good dinner", birkdale: "✅ Excellent independents", lord: "Good — wider choice" },
                    { want: "Near Royal Birkdale", birkdale: "✅ 10 min walk", lord: "20–25 min drive" },
                    { want: "Victorian architecture", birkdale: "Charming neighbourhood", lord: "✅ Spectacular" },
                    { want: "Relaxed atmosphere", birkdale: "✅ Village pace", lord: "Town centre pace" },
                  ].map((row) => (
                    <tr key={row.want} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-[#1B2E4B]">{row.want}</td>
                      <td className="px-5 py-3.5 text-gray-600 text-xs">{row.birkdale}</td>
                      <td className="px-5 py-3.5 text-gray-600 text-xs">{row.lord}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Open 2026 callout ── */}
        <section>
          <div className="bg-[#1B2E4B] rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">The Open 2026 · July 12–19</p>
              <h2 className="font-display text-2xl font-bold mb-3">Birkdale Village During Open Week</h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                Royal Birkdale Golf Club is a 10-minute walk from the village. During Open week, Birkdale Village is where players, caddies, and spectators eat, drink, and unwind. Restaurants fill up fast — book well in advance.
              </p>
            </div>
            <Link
              href="/the-open-2026"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm transition-colors whitespace-nowrap flex-shrink-0"
            >
              Open 2026 visitor guide →
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Birkdale Village — FAQs</h2>
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

      </div>
    </GuideLayout>
  );
}
