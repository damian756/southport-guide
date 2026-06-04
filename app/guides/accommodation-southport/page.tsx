import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Car,
  Bed,
  PoundSterling,
  Star,
  ChevronRight,
  ArrowRight,
  CalendarDays,
  Info,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";
import { LATEROOMS, CHAMPIONS_TRAVEL, COTTAGES, SYKES } from "@/lib/affiliate-links";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("accommodation-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "hotels in Southport, where to stay in Southport, Southport accommodation, B&B Southport, guest houses Southport, Southport hotels, hotels near Royal Birkdale, Southport Open 2026 accommodation",
  alternates: { canonical: `${BASE_URL}/guides/accommodation-southport` },
  openGraph: {
    title: "Where to Stay in Southport 2026 | Hotels, B&Bs & Accommodation Guide",
    description:
      "The honest guide to accommodation in Southport. Hotels, B&Bs, guest houses and self-catering by area. Prices and booking advice for all budgets.",
    url: `${BASE_URL}/guides/accommodation-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-lord-street.webp`, width: 1200, height: 630, alt: "Lord Street Southport" }],
  },
};

const HOTELS = [
  {
    name: "The Scarisbrick Hotel",
    area: "Lord Street",
    type: "Boutique / Heritage",
    priceRange: "£££",
    description:
      "The Victorian option. Been on Lord Street since 1845 and it looks the part. Good central location, rooms vary in quality so it's worth reading recent reviews before booking. Popular with weddings and events. The bar is decent.",
    bestFor: "Character, central location, Lord Street access",
    postcode: "PR8 1NL",
  },
  {
    name: "The Vincent Hotel",
    area: "Lord Street",
    type: "Contemporary",
    priceRange: "£££",
    description:
      "The contemporary choice. Modern, well-run, popular with couples and weekend breaks. Spa facilities on site. Food is reliable. Probably the most consistent option in town if you want something smart without the heritage quirks.",
    bestFor: "Modern comfort, spa, couples, weekend breaks",
    postcode: "PR8 1LW",
  },
  {
    name: "The Metropole Hotel",
    area: "Promenade / Seafront",
    type: "Traditional",
    priceRange: "££",
    description:
      "Solid mid-range option on the Promenade with sea views. Good value for what it is. Popular with families and groups. The location is great for beach access — you're right on the seafront. Not the most stylish but it does what it says.",
    bestFor: "Sea views, beach proximity, families, value",
    postcode: "PR9 0JD",
  },
  {
    name: "Premier Inn Southport Town Centre",
    area: "Town Centre",
    type: "Budget / Chain",
    priceRange: "£",
    description:
      "Reliable, consistent, and priced accordingly. Near the train station and a short walk into town. No surprises in either direction. If you want a guaranteed room at a fixed price, this does the job.",
    bestFor: "Budget, solo travellers, reliability, train access",
    postcode: "PR8 1RE",
  },
  {
    name: "Premier Inn Southport South",
    area: "Ainsdale",
    type: "Budget / Chain",
    priceRange: "£",
    description:
      "The second Premier Inn, further south towards Ainsdale. Slightly further from the town centre but useful if you're visiting for golf or the beach at the southern end. Free parking, which the town centre option doesn't always have.",
    bestFor: "Golf visitors, free parking, Ainsdale/Formby access",
    postcode: "PR8 3JA",
  },
];

const AREAS = [
  {
    name: "Town Centre / Lord Street",
    description:
      "The most central option. You're walking distance from restaurants, bars, shopping and the seafront. The Scarisbrick and The Vincent are here. Higher prices at weekends and during events. Lord Street is genuinely one of the best high streets in the North West so staying on it or near it is a good shout.",
    walkToBeach: "10 minutes",
    walkToStation: "5 minutes",
    parkingNotes: "Car parks on Lord Street and adjacent streets. Pay and display.",
  },
  {
    name: "Seafront / Promenade",
    description:
      "Sea views and direct beach access. The Metropole is here. Good for families who want to roll out of bed and onto the sand. Can be busy in summer. Marine Drive car park (PR8 1RX) right there.",
    walkToBeach: "2 minutes",
    walkToStation: "15 minutes",
    parkingNotes: "Marine Drive car park. Fills by 10am on summer Saturdays. Go early.",
  },
  {
    name: "Birkdale Village",
    description:
      "The most sought-after area for Open week (Royal Birkdale is walking distance). Quieter, more upmarket feel. The village itself has good independent restaurants and a proper local atmosphere. B&Bs and guest houses rather than big hotels. Goes first in July.",
    walkToBeach: "20 minutes",
    walkToStation: "10 minutes (Birkdale station)",
    parkingNotes: "Residential streets. Street parking generally available.",
  },
  {
    name: "Churchtown",
    description:
      "The old village at the north end of Southport, where I live. Quieter, greener, and better value than the seafront. A few good B&Bs. Excellent pubs. The Botanic Gardens are here. About 10 minutes from town by car. Worth looking at if you want calm over convenience.",
    walkToBeach: "Not walking distance. Short drive.",
    walkToStation: "Not practical on foot. Car or taxi.",
    parkingNotes: "Residential, plenty of street parking.",
  },
];

const FAQS = [
  {
    q: "What is the best area to stay in Southport?",
    a: "It depends what you're after. Lord Street is the most central and puts you near the best restaurants, shopping and nightlife. The Promenade is better if you want immediate beach access. Birkdale is the place if you're visiting for The Open 2026 at Royal Birkdale — it's walking distance from the course. Churchtown is worth considering if you want quiet and good value.",
  },
  {
    q: "How much do hotels in Southport cost?",
    a: "Budget hotels (Premier Inn) typically run £60-80 per night midweek, £90-120 at weekends. Mid-range options like the Metropole are £80-120 midweek. The Scarisbrick and Vincent are £120-180 per night typically. During Open week at Royal Birkdale (12-19 July 2026) and peak summer events (Flower Show 20-23 Aug, Air Show 29-30 Aug), prices are significantly higher and most good options sell out weeks or months in advance.",
  },
  {
    q: "Is there accommodation near Royal Birkdale for The Open 2026?",
    a: "Yes, but it has almost all gone. The Open runs 12-19 July 2026 at Royal Birkdale. Birkdale village properties (the closest to the course) were the first to go. If you haven't booked, check Formby, Ormskirk and Ainsdale as fallback options — all within 20-30 minutes of Royal Birkdale.",
  },
  {
    q: "Are there self-catering holiday lets in Southport?",
    a: "Yes. There are holiday apartments and self-catering properties around the town centre and seafront, and a small number of cottages and houses in Churchtown and Birkdale. They make sense for longer stays, families or groups who want kitchen facilities. Cottages.com and similar platforms list the main options.",
  },
  {
    q: "Which hotels in Southport have free parking?",
    a: "The Premier Inn Southport South (Ainsdale) has free parking. The Metropole has limited parking. The Scarisbrick and Vincent are on Lord Street and do not have dedicated free parking, though nearby car parks are available. The Open 2026 period is tricky for parking — check each hotel's policy when booking.",
  },
  {
    q: "Do any Southport hotels have a pool or spa?",
    a: "The Vincent Hotel has spa facilities including treatments and a thermal suite. Some of the larger hotels have basic leisure facilities. For a proper spa day, The Vincent is the most reliable option in the town centre.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AccommodationSouthportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuideLayout guide={GUIDE}>
        {/* ── Hero intro ─────────────────────────────────────────────── */}
        <section className="prose prose-lg max-w-none mb-10">
          <p className="text-xl text-gray-700 leading-relaxed">
            Southport has a proper range of accommodation. Victorian hotels on Lord Street, seafront
            options on the Promenade, B&Bs in Birkdale village, and quieter stays in Churchtown. The
            question is which type suits you and what you're doing here.
          </p>
          <p className="text-gray-700">
            If you're visiting for The Open 2026 at Royal Birkdale (12–19 July), most good options are
            already gone. Book whatever is left immediately. If you're here for anything else,
            availability is generally fine outside peak summer weekends.
          </p>
        </section>

        {/* ── Quick info bar ─────────────────────────────────────────── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: PoundSterling, label: "Budget hotels", value: "From £60/night" },
            { icon: Star, label: "Best rated area", value: "Birkdale / Lord St" },
            { icon: Car, label: "Free parking", value: "Premier Inn South" },
            { icon: CalendarDays, label: "Peak: avoid booking late", value: "Jul & Aug 2026" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-blue-50 rounded-xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-blue-700">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </section>

        {/* ── Hotels breakdown ───────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Main Hotels in Southport</h2>
          <div className="space-y-6">
            {HOTELS.map((hotel) => (
              <div key={hotel.name} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{hotel.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {hotel.area}
                      </span>
                      <span className="text-sm text-gray-400">|</span>
                      <span className="text-sm text-gray-500">{hotel.type}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-green-700 shrink-0">{hotel.priceRange}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{hotel.description}</p>
                <div className="bg-gray-50 rounded-lg px-4 py-2.5 text-sm">
                  <span className="font-medium text-gray-700">Best for: </span>
                  <span className="text-gray-600">{hotel.bestFor}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Price guide */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-semibold text-amber-900 mb-2">Price guide</h3>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div><span className="font-mono font-bold">£</span> <span className="text-gray-700">Budget: under £80/night</span></div>
              <div><span className="font-mono font-bold">££</span> <span className="text-gray-700">Mid-range: £80–130/night</span></div>
              <div><span className="font-mono font-bold">£££</span> <span className="text-gray-700">Premium: £130+/night</span></div>
            </div>
            <p className="text-xs text-amber-800 mt-2">
              Prices increase significantly during Open week (12–19 Jul), Flower Show (20–23 Aug) and Air Show (29–30 Aug). Book well in advance for these dates.
            </p>
          </div>
        </section>

        {/* ── LateRooms CTA ──────────────────────────────────────────── */}
        <section className="bg-blue-600 text-white rounded-2xl p-6 mb-10">
          <h3 className="text-lg font-bold mb-1">Search Southport Hotels</h3>
          <p className="text-blue-100 text-sm mb-4">
            Check live rates across hotels in Southport including last-minute availability.
          </p>
          <a
            href={LATEROOMS.southport}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            Check Hotels on LateRooms
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* ── Areas breakdown ────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choosing Where to Stay</h2>
          <p className="text-gray-600 mb-6">
            Southport is not large but it has distinct areas and the one you pick makes a difference.
          </p>
          <div className="space-y-5">
            {AREAS.map((area) => (
              <div key={area.name} className="border-l-4 border-blue-400 pl-5">
                <h3 className="font-bold text-gray-900 mb-1">{area.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{area.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                  <span><strong>Beach:</strong> {area.walkToBeach}</span>
                  <span><strong>Station:</strong> {area.walkToStation}</span>
                  <span><strong>Parking:</strong> {area.parkingNotes}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Open 2026 callout ──────────────────────────────────────── */}
        <section className="bg-green-700 text-white rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 shrink-0 text-green-200 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-1">The Open 2026 at Royal Birkdale</h3>
              <p className="text-green-100 text-sm leading-relaxed mb-4">
                The Open Championship runs 12–19 July 2026. Most Southport accommodation in walking
                distance of Royal Birkdale is already fully booked. If you haven't sorted a room, look
                at Formby (L37 postcode), Ormskirk, Ainsdale, and even Blackpool as fallback options.
                All are within 20–40 minutes of the course. For golf packages that include travel and
                hospitality, specialist operators can often find options when standard searches can't.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SYKES.southportOpen2026}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm"
                >
                  Sykes Cottages for Open Week
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={LATEROOMS.southportOpen2026}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm"
                >
                  Check Open Week Hotels
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={CHAMPIONS_TRAVEL.homepage}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 bg-green-600 text-white border border-green-400 font-semibold px-4 py-2 rounded-lg hover:bg-green-500 transition-colors text-sm"
                >
                  Golf Travel Packages
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Self-catering ──────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Self-Catering and Holiday Lets</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            There are holiday apartments and self-catering properties around the Southport seafront and
            town centre, and a smaller number of cottages and houses in Churchtown and Birkdale. They
            make more sense than hotels for longer stays, families who need kitchen space, or groups
            who want to spread out.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Self-catering in Southport tends to be reasonable value for the area. The Sefton Coast
            more broadly — Formby, Ainsdale, West Lancashire — has more options if you're flexible
            about being a short drive from town.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={SYKES.southport}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors text-sm"
            >
              Search Sykes Cottages near Southport
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={COTTAGES.summerSale}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              Browse on Cottages.com
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ── B&Bs note ──────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">B&Bs and Guest Houses</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Southport has a good number of B&Bs and guest houses, particularly in Birkdale and along
            the Promenade. They tend to be better value than the big hotels and offer a more
            personal stay. Quality varies more than with chains, so recent Google and TripAdvisor
            reviews are worth reading before booking.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For Open week, Birkdale B&Bs are as in-demand as the hotels. The owner-run guest houses
            near Royal Birkdale are often a better option than the town-centre hotels for golf
            visitors — you're walking to the course and there's no need to deal with tournament-week
            traffic.
          </p>
        </section>

        {/* ── Internal links ─────────────────────────────────────────── */}
        <section className="bg-gray-50 rounded-2xl p-6 mb-10">
          <h3 className="font-bold text-gray-900 mb-3">Plan the rest of your trip</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/things-to-do", label: "Things to Do in Southport" },
              { href: "/guides/parking-southport", label: "Parking in Southport" },
              { href: "/restaurants", label: "Restaurants in Southport" },
              { href: "/the-open-2026", label: "The Open 2026 Visitor Guide" },
              { href: "/guides/southport-beach", label: "Southport Beach Guide" },
              { href: "/guides/birkdale-village", label: "Birkdale Village" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 transition-colors"
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Accommodation FAQ</h2>
          <div className="space-y-5">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border-b border-gray-200 pb-5">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────────────── */}
        <section className="text-center">
          <p className="text-gray-600 mb-4">Ready to book? Check live availability.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={LATEROOMS.southport}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Search Hotels on LateRooms
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={COTTAGES.summerSale}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-gray-400 transition-colors"
            >
              Holiday Lets via Cottages.com
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </GuideLayout>
    </>
  );
}
