import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, AlertTriangle, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotels Near Royal Birkdale | The Open 2026 Accommodation Guide | Southport Guide",
  description:
    "Find the closest hotels to Royal Birkdale for The Open Championship 2026. Every Southport hotel ranked by distance from the course, with walking times, prices and live availability.",
  alternates: { canonical: "https://www.southportguide.co.uk/the-open-2026/accommodation" },
  openGraph: {
    title: "Hotels Near Royal Birkdale | The Open 2026 Accommodation Guide",
    description: "Every Southport hotel ranked by distance from Royal Birkdale golf course — walking times, prices and live availability for The Open Championship 2026.",
    images: [{ url: "/images/categories/hotels.webp" }],
  },
};

// Distance data — measured from Royal Birkdale Golf Club main entrance
const HOTELS_BY_DISTANCE = [
  { name: "Birkdale Guesthouses & B&Bs", distance: "0.3–0.8 miles", walk: "6–16 min", drive: "2–4 min", price: "£", note: "Closest possible — book months ahead", bookingUrl: "https://www.booking.com/searchresults.html?ss=Birkdale%2C+Southport&checkin=2026-07-12&checkout=2026-07-19" },
  { name: "The Vincent Hotel", distance: "0.9 miles", walk: "18 min", drive: "4 min", price: "£££", note: "Southport's finest — luxury boutique", bookingUrl: "https://www.booking.com/hotel/gb/the-vincent.html?checkin=2026-07-12&checkout=2026-07-19" },
  { name: "Ramada Plaza Southport", distance: "1.1 miles", walk: "22 min", drive: "5 min", price: "£££", note: "Large hotel, conference facilities, seafront", bookingUrl: "https://www.booking.com/hotel/gb/ramada-plaza-southport.html?checkin=2026-07-12&checkout=2026-07-19" },
  { name: "Holiday Inn Southport", distance: "1.3 miles", walk: "26 min", drive: "6 min", price: "££", note: "Reliable chain, good availability", bookingUrl: "https://www.booking.com/hotel/gb/holiday-inn-southport.html?checkin=2026-07-12&checkout=2026-07-19" },
  { name: "Scarisbrick Hotel", distance: "1.4 miles", walk: "28 min", drive: "6 min", price: "££", note: "Historic Lord Street hotel, character property", bookingUrl: "https://www.booking.com/hotel/gb/the-scarisbrick.html?checkin=2026-07-12&checkout=2026-07-19" },
  { name: "Premier Inn Southport", distance: "1.5 miles", walk: "30 min", drive: "7 min", price: "£", note: "Best-value option, book early for Open week", bookingUrl: "https://www.booking.com/hotel/gb/premier-inn-southport-town-centre.html?checkin=2026-07-12&checkout=2026-07-19" },
  { name: "The Bold Hotel", distance: "1.6 miles", walk: "32 min", drive: "7 min", price: "££", note: "Boutique hotel on Lord Street, popular with golfers", bookingUrl: "https://www.booking.com/hotel/gb/the-bold.html?checkin=2026-07-12&checkout=2026-07-19" },
  { name: "The Metropole Hotel", distance: "1.7 miles", walk: "34 min", drive: "8 min", price: "££", note: "Victorian seafront hotel, traditional atmosphere", bookingUrl: "https://www.booking.com/hotel/gb/the-metropole-southport.html?checkin=2026-07-12&checkout=2026-07-19" },
  { name: "Travelodge Southport", distance: "1.8 miles", walk: "36 min", drive: "8 min", price: "£", note: "Budget-friendly, no frills, functional", bookingUrl: "https://www.booking.com/hotel/gb/travelodge-southport-hotel.html?checkin=2026-07-12&checkout=2026-07-19" },
  { name: "Royal Clifton Hotel", distance: "2.0 miles", walk: "40 min", drive: "9 min", price: "££", note: "Seafront location, sea views from upper floors", bookingUrl: "https://www.booking.com/hotel/gb/royal-clifton.html?checkin=2026-07-12&checkout=2026-07-19" },
];

const AREA_GUIDE = [
  {
    area: "Birkdale Village",
    proximity: "Walking distance — 10–15 min on foot",
    best: "Anyone who wants maximum convenience. Walk to and from the course every day without transport.",
    status: "Almost fully booked",
    statusColor: "text-red-500",
    notes: ["Closest possible to the course — some options under 10 minutes", "Birkdale village has excellent restaurants and pubs for evenings", "Book 6–12 months ahead for future Opens"],
  },
  {
    area: "Southport Town Centre",
    proximity: "2 miles — 10 min taxi or shuttle bus",
    best: "Most visitors. Widest range of accommodation, restaurants, and evening entertainment.",
    status: "Limited availability",
    statusColor: "text-amber-500",
    notes: ["Lord Street, The Grand, and surrounding hotels", "Excellent evening options — restaurants, bars, live music", "Easy park and ride access from Victoria Park"],
  },
  {
    area: "Formby",
    proximity: "20 min drive — best via A565",
    best: "Those who've left it late or want a quieter base with good road access.",
    status: "Check current availability",
    statusColor: "text-green-600",
    notes: ["Good independent B&Bs and holiday lets", "Beautiful beach and red squirrel reserve nearby", "Easy drive to park and ride sites"],
  },
  {
    area: "Ormskirk / Skelmersdale",
    proximity: "25–30 min drive via A570",
    best: "Last-resort option if coastal options are gone. Cheaper but less atmosphere.",
    status: "Generally available",
    statusColor: "text-green-600",
    notes: ["Good motorway access (M58)", "Less connected to the Open atmosphere", "Budget-friendly option for groups"],
  },
];

const FAQS = [
  {
    q: "How far is Southport from Royal Birkdale?",
    a: "Royal Birkdale Golf Club is located in Birkdale, approximately 1–2 miles south of Southport town centre. Most Southport hotels are between a 15–40 minute walk from the course, or 5–10 minutes by taxi.",
  },
  {
    q: "Can you walk from Southport town centre to Royal Birkdale?",
    a: "Yes — it is walkable from most central hotels in 20–35 minutes along flat, straightforward roads. The walk along Waterloo Road and Liverpool Road is well-signed during Open week and many spectators prefer it to dealing with transport queues.",
  },
  {
    q: "Which Southport hotels are closest to Royal Birkdale golf course?",
    a: "The closest options are guesthouses and B&Bs in Birkdale itself, within 0.3–0.8 miles of the course. In Southport town centre, The Vincent Hotel and Ramada Plaza are the nearest major hotels at under 1.1 miles from the course entrance.",
  },
  {
    q: "Is there accommodation available in Birkdale itself?",
    a: "Yes — Birkdale village has several guesthouses and B&Bs within walking distance of the course. These book out very quickly for Open week. Check availability immediately — these are typically the first properties to sell out.",
  },
  {
    q: "How do I get from my hotel to Royal Birkdale during Open week?",
    a: "Walking is recommended for hotels within 2 miles. Merseyrail trains run to Birkdale station (approximately 10–15 minutes walk from the course entrance). Taxis from Southport town centre take around 10 minutes and cost £8–12 each way. The R&A also operates a park and ride shuttle service.",
  },
  {
    q: "What is the closest train station to Royal Birkdale?",
    a: "Birkdale railway station on the Merseyrail Southport line is the closest, approximately a 10–15 minute walk from the course entrance. Trains run frequently from Liverpool Central and Southport station throughout the day.",
  },
];

const TIPS = [
  "Book tonight — every day you wait, availability decreases and prices rise",
  "Self-catering sleeps groups more cheaply than multiple hotel rooms",
  "Check Booking.com and direct hotel websites — rates differ",
  "Ask your accommodation about parking during Open week — on-site parking is worth its weight",
  "Some hotels offer shuttle packages — worth asking when you call",
  "If your first choice is full, call the hotel directly — some allocations aren't listed online",
];

// JSON-LD structured data
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "The Open 2026", item: "https://www.southportguide.co.uk/the-open-2026" },
    { "@type": "ListItem", position: 3, name: "Accommodation", item: "https://www.southportguide.co.uk/the-open-2026/accommodation" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hotels Near Royal Birkdale — The Open 2026",
  description: "Hotels and accommodation in Southport ranked by distance from Royal Birkdale Golf Club for The Open Championship 2026",
  itemListElement: HOTELS_BY_DISTANCE.map((h, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: h.name,
    description: `${h.distance} from Royal Birkdale — ${h.walk} walk, ${h.drive} drive`,
  })),
};

export default async function OpenAccommodationPage() {
  let featuredHotels: { slug: string; name: string; shortDescription: string | null; address: string; rating: number | null }[] = [];
  try {
    const cat = await prisma.category.findFirst({ where: { slug: "hotels" } });
    if (cat) {
      featuredHotels = await prisma.business.findMany({
        where: { categoryId: cat.id },
        take: 6,
        orderBy: [{ listingTier: "desc" }, { rating: "desc" }],
        select: { slug: true, name: true, shortDescription: true, address: true, rating: true },
      });
    }
  } catch {
    featuredHotels = [];
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* Hero */}
        <section className="relative h-64 md:h-80 bg-[#1B2E4B] overflow-hidden">
          <Image
            src="/images/categories/hotels.webp"
            alt="Hotels near Royal Birkdale for The Open Championship 2026"
            fill sizes="100vw" quality={75}
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/50 via-[#1B2E4B]/30 to-[#1B2E4B]/90" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
            <Link href="/the-open-2026" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> The Open 2026
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Hotels Near Royal Birkdale</h1>
            <p className="text-white/60 mt-2">The Open Championship 2026 — every accommodation option ranked by distance from the course</p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl py-12 space-y-10">

          {/* Urgency banner */}
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-none mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 text-sm">Book immediately — accommodation is nearly gone</p>
              <p className="text-amber-700 text-sm mt-1 leading-relaxed">
                The Open Championship brings 250,000 spectators to Southport over seven days. Hotels and B&Bs in Birkdale and Southport town centre were heavily booked within weeks of the fixture confirmation. If you need accommodation for Open week, every day of delay reduces your options.
              </p>
            </div>
          </div>

          {/* Distance table — the core asset */}
          <div>
            <div className="mb-5">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Hotels Ranked by Distance from Royal Birkdale</h2>
              <p className="text-gray-500 text-sm mt-1">All distances measured from Royal Birkdale Golf Club main entrance on Waterloo Road. Sorted closest first.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#1B2E4B] text-white">
                    <tr>
                      <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Hotel / Accommodation</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Distance</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Walk</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Drive</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-xs uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3.5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {HOTELS_BY_DISTANCE.map((h, i) => (
                      <tr key={i} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-[#1B2E4B]">{h.name}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{h.note}</p>
                        </td>
                        <td className="px-4 py-4 font-bold text-[#C9A84C] whitespace-nowrap">{h.distance}</td>
                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{h.walk}</td>
                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{h.drive}</td>
                        <td className="px-4 py-4 text-gray-700 font-semibold">{h.price}</td>
                        <td className="px-4 py-4">
                          <a
                            href={h.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-flex items-center gap-1 bg-[#003580] hover:bg-[#002a6e] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                          >
                            Check availability <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-[#FAF8F5] border-t border-gray-100">
                <p className="text-xs text-gray-400">Prices are approximate and subject to change. Booking.com links open in a new tab. Distances verified via Google Maps from Royal Birkdale main entrance.</p>
              </div>
            </div>
          </div>

          {/* Area guide */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Area by Area Guide</h2>
            <div className="space-y-4">
              {AREA_GUIDE.map(({ area, proximity, best, status, statusColor, notes }) => (
                <div key={area} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#1B2E4B]">{area}</h3>
                      <p className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                        <MapPin className="w-3 h-3" /> {proximity}
                      </p>
                    </div>
                    <span className={`text-xs font-bold whitespace-nowrap mt-1 ${statusColor}`}>{status}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4"><span className="font-semibold text-[#1B2E4B]">Best for:</span> {best}</p>
                  <ul className="space-y-1.5">
                    {notes.map((note) => (
                      <li key={note} className="flex gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C9A84C] flex-none mt-0.5" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Booking tips */}
          <div className="bg-[#1B2E4B] rounded-2xl p-7 text-white">
            <h2 className="font-display text-xl font-bold text-white mb-5">Booking Tips</h2>
            <ul className="space-y-3">
              {TIPS.map((tip) => (
                <li key={tip} className="flex gap-3 text-sm">
                  <span className="text-[#C9A84C] font-bold flex-none">→</span>
                  <span className="text-white/80">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured hotel listings from DB */}
          {featuredHotels.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Southport Hotels in Our Directory</h2>
                <Link href="/hotels" className="text-sm font-semibold text-[#C9A84C] hover:underline">View all →</Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredHotels.map((h) => (
                  <Link
                    key={h.slug}
                    href={`/hotels/${h.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-md transition-all p-5"
                  >
                    <h3 className="font-bold text-[#1B2E4B] group-hover:text-[#C9A84C] transition-colors text-sm">{h.name}</h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{h.shortDescription || h.address}</p>
                    {h.rating && <p className="text-amber-500 text-xs font-semibold mt-2">★ {h.rating.toFixed(1)}</p>}
                    <span className="text-[#C9A84C] text-sm font-semibold mt-3 inline-block">View listing →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQ block */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Accommodation FAQ — The Open 2026</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-display font-bold text-[#1B2E4B] mb-3">{q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
            <Link href="/the-open-2026" className="text-sm font-semibold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors">
              ← Back to The Open 2026
            </Link>
            <Link href="/the-open-2026/getting-there" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              Transport guide →
            </Link>
            <Link href="/the-open-2026/restaurants" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              Where to eat →
            </Link>
            <Link href="/the-open-2026/pubs" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              Pubs near the course →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
