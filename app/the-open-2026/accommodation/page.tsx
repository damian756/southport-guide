import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, AlertTriangle, MapPin, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Where to Stay for The Open 2026 | Accommodation Near Royal Birkdale | SouthportGuide",
  description:
    "Hotels, B&Bs, and self-catering accommodation for The Open Championship 2026 at Royal Birkdale. Book now — accommodation in Southport and Birkdale is selling fast.",
};

const AREA_GUIDE = [
  {
    area: "Birkdale Village",
    proximity: "Walking distance — 10–15 min on foot",
    best: "Anyone who wants maximum convenience. You can walk to and from the course without relying on transport.",
    status: "Almost fully booked",
    statusColor: "text-red-500",
    notes: ["Closest possible to the course", "Birkdale village has good restaurants and pubs for evenings", "Book 6–12 months in advance for future Opens"],
  },
  {
    area: "Southport Town Centre",
    proximity: "2 miles — 10 min taxi or shuttle bus",
    best: "Most visitors. The widest range of accommodation, restaurants, and evening entertainment. Park and ride access.",
    status: "Limited availability",
    statusColor: "text-amber-500",
    notes: ["Lord Street, The Grand, and surrounding hotels", "Excellent evening options — restaurants, bars, live music", "Easy park and ride access from Victoria Park"],
  },
  {
    area: "Formby",
    proximity: "20 min drive — best via A565",
    best: "Those who've left it late or prefer a quieter base with good road access.",
    status: "Check current availability",
    statusColor: "text-green-600",
    notes: ["Good independent B&Bs and holiday lets", "Beautiful beach and squirrel reserve if you have a free morning", "Easy drive to park and ride sites"],
  },
  {
    area: "Ormskirk / Skelmersdale",
    proximity: "25–30 min drive via A570",
    best: "Last-resort option if coastal options are gone. Cheaper, more available, but less atmosphere.",
    status: "Generally available",
    statusColor: "text-green-600",
    notes: ["Good motorway access (M58)", "Less connected to Open atmosphere", "Budget-friendly option for groups"],
  },
];

const TIPS = [
  "Book tonight — every day you wait, availability decreases",
  "Self-catering sleeps groups more cheaply than multiple hotel rooms",
  "Check Booking.com, Airbnb, and direct hotel websites for the best rate",
  "Ask your accommodation about parking during Open week — on-site parking is worth its weight",
  "Some hotels offer shuttle packages — worth asking when you call to book",
  "If your first choice is full, call the hotel directly — some allocations aren't listed online",
];

export default async function OpenAccommodationPage() {
  let hotels: { slug: string; name: string; shortDescription: string | null; address: string }[] = [];
  try {
    const cat = await prisma.category.findFirst({ where: { slug: "hotels" } });
    if (cat) {
      hotels = await prisma.business.findMany({
        where: { categoryId: cat.id },
        take: 12,
        select: { slug: true, name: true, shortDescription: true, address: true },
      });
    }
  } catch {
    hotels = [];
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* Hero */}
      <section className="relative h-64 md:h-80 bg-[#1B2E4B] overflow-hidden">
        <Image
          src="/images/categories/hotels.webp"
          alt="Accommodation for The Open Championship 2026 near Royal Birkdale, Southport"
          fill sizes="100vw" quality={75}
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/50 via-[#1B2E4B]/30 to-[#1B2E4B]/90" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <Link href="/the-open-2026" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> The Open 2026
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Where to Stay for The Open 2026</h1>
          <p className="text-white/60 mt-2">Hotels, B&amp;Bs and self-catering near Royal Birkdale, Southport — July 12–19</p>
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

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-gray-100 p-7">
          <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-4">Choosing Where to Stay</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The right base for Open week depends on your priorities. If you want to walk to the course every morning without worrying about transport, Birkdale village is the answer — but those options are almost entirely gone at this point. Southport town centre is the next best option: good transport connections, excellent evening dining and nightlife, and a genuine Open week atmosphere across the whole town.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For groups who&apos;ve left it late, self-catering properties in Formby or further afield may be the most practical option. A car is essential if you&apos;re staying more than 15 minutes from Southport, but the park and ride network makes the course accessible from across the region.
          </p>
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

        {/* Hotel listings from DB */}
        {hotels.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Southport Hotels &amp; Accommodation</h2>
              <Link href="/hotels" className="text-sm font-semibold text-[#C9A84C] hover:underline">View all →</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {hotels.map((h) => (
                <Link
                  key={h.slug}
                  href={`/hotels/${h.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-md transition-all p-5"
                >
                  <h3 className="font-bold text-[#1B2E4B] group-hover:text-[#C9A84C] transition-colors">{h.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{h.shortDescription || h.address}</p>
                  <span className="text-[#C9A84C] text-sm font-semibold mt-3 inline-block">View &amp; book →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Fallback if no DB hotels */}
        {hotels.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-7 text-center">
            <p className="text-gray-500 text-sm mb-4">Browse all Southport hotels and accommodation in our directory.</p>
            <Link href="/hotels" className="inline-flex items-center gap-2 bg-[#1B2E4B] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#2A4A73] transition-colors">
              View Southport hotels →
            </Link>
          </div>
        )}

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
        </div>
      </div>
    </div>
  );
}
