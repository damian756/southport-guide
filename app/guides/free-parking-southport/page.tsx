import Link from "next/link";
import Image from "next/image";
import { MapPin, Car, ChevronRight, ArrowRight, Clock, Info } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("free-parking-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "free parking Southport, free car park Southport, where to park free Southport, free parking near Southport beach, free parking Lord Street",
  alternates: { canonical: `${BASE_URL}/guides/free-parking-southport` },
  openGraph: {
    title: "Free Parking in Southport | Every Free Option With Postcodes | SouthportGuide",
    description:
      "Free parking in Southport: every free car park, free on-street area, and low-cost option in the town. Postcodes and honest walking times from a local.",
    url: `${BASE_URL}/guides/free-parking-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/parking.webp` }],
  },
};

const FREE_OPTIONS = [
  {
    name: "Cambridge Road, Churchtown",
    postcode: "PR9 9NB",
    type: "Free car park",
    walkTo: "Churchtown village: 2 min. Hesketh Park: 5 min. Town centre: 20 min drive.",
    notes: "Decent capacity. Good base for Churchtown. Not practical for the beach.",
    href: null,
  },
  {
    name: "Roe Lane (on-street)",
    postcode: "PR9 9DX",
    type: "Free on-street",
    walkTo: "Lord Street (north end): 8 min. Southport station: 10 min.",
    notes: "Free on weekdays. Residential streets, check signs for any restrictions. Generally fine Mon–Sat daytime.",
    href: null,
  },
  {
    name: "Scarisbrick Avenue (on-street)",
    postcode: "PR8 6PX",
    type: "Free on-street",
    walkTo: "Lord Street (central): 10 min. Town centre: 12 min.",
    notes: "Free residential bays. Busy on weekends but usually some spaces available on weekday mornings.",
    href: null,
  },
  {
    name: "Albert Road, Birkdale (on-street)",
    postcode: "PR8 2AJ",
    type: "Free on-street",
    walkTo: "Birkdale village: 3 min. Birkdale station: 5 min.",
    notes: "Good for Birkdale village restaurants and shops. Not useful for the beach or town centre.",
    href: null,
  },
  {
    name: "Shore Road, Ainsdale (seasonal)",
    postcode: "PR8 2QD",
    type: "Free on-street",
    walkTo: "Ainsdale beach: 10 min walk.",
    notes: "Free on the road itself outside peak season. The official Ainsdale beach car park charges from April. Shore Road fills fast on sunny summer days, arrive before 9am.",
    href: null,
  },
  {
    name: "Botanic Road area (on-street)",
    postcode: "PR9 7NN",
    type: "Free on-street",
    walkTo: "Churchtown Botanic Gardens: 2 min. The Hesketh Arms: 1 min.",
    notes: "Free residential parking around the botanic gardens. Not useful for the seafront.",
    href: null,
  },
];

const PAID_BUT_CHEAP = [
  { name: "Marine Drive (Beach)", postcode: "PR8 1RQ", cost: "From £1.50", notes: "Pay-and-display. Main beach car park. Cheaper than town centre multi-storeys." },
  { name: "Tulketh Street", postcode: "PR8 1DP", cost: "From £1.00", notes: "Cheap surface car park. Good for Lord Street (north). Limited spaces." },
  { name: "Market Street", postcode: "PR8 1HH", cost: "From £1.00", notes: "Central. Good for the market and southern Lord Street." },
];

const FAQS = [
  {
    q: "Is there any completely free parking near Southport Beach?",
    a: "Not in the immediate beach area. Marine Drive is pay-and-display. The closest free options are residential streets around 15-20 minutes' walk from the beach. For the beach specifically, Marine Drive is the practical choice, prices are lower than the town centre car parks and you pay for what you use.",
  },
  {
    q: "What is the closest free parking to Lord Street?",
    a: "Roe Lane and the residential streets between the railway line and Lord Street are your best options. It is roughly an 8-10 minute walk to the northern end of Lord Street. Free on weekdays; some restrictions apply on weekends so check the signs.",
  },
  {
    q: "Is there free parking at Ainsdale Beach?",
    a: "Shore Road is free outside peak season and works as an alternative when the official Ainsdale car park (which charges from April) is full. It fills fast on sunny days so arrive early. The official Ainsdale car park is about £3-4 for a full day, which is reasonable if Shore Road is full.",
  },
  {
    q: "Can blue badge holders park free in Southport?",
    a: "Yes. Blue badge holders can park free in designated blue badge bays throughout Southport town centre and in most Sefton Council managed car parks, subject to time limits. On-street bays marked for blue badge use are available on Lord Street and around the town centre. Check the bay markings and any time restrictions displayed.",
  },
  {
    q: "Is the Tesco or Morrisons car park free?",
    a: "Supermarket car parks in Southport are typically free for customers while shopping, with a time limit (usually 2-3 hours). They are not practical for beach or town centre use as they are a fair distance from both, and you risk a fine if you are not shopping.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Parking in Southport",
  description:
    "Every free and low-cost parking option in Southport, with postcodes and walking times to the main destinations.",
  url: `${BASE_URL}/guides/free-parking-southport`,
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

export default function FreeParkingSouthportPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* Hero */}
      <div className="relative min-h-[50vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/parking.webp"
            alt="Free parking in Southport"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
            style={{ objectPosition: "center 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl pb-14 pt-20" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">
            <Car className="w-4 h-4" />
            Practical Guide
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Free Parking in Southport
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            It does exist. Every free car park, free on-street area, and low-cost option in Southport,
            with postcodes and honest walking times.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>6 free options listed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-[#C9A84C]" />
              <span>Walking times included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick answer strip */}
      <div className="bg-[#1B2E4B] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Free near Lord Street", value: "Roe Lane area" },
              { label: "Free near Churchtown", value: "Cambridge Road" },
              { label: "Free near Ainsdale beach", value: "Shore Road (seasonal)" },
              { label: "Beach parking (paid)", value: "PR8 1RQ from £1.50" },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 py-4 text-center">
                <p className="text-white/50 text-[11px] uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 max-w-4xl py-14">

        {/* Honest intro */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">The Honest Answer</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Free parking in Southport is not near the beach and it is not in the town centre. If you want to park free and be within a few minutes' walk of the sand or Lord Street, that is not really possible. The main beach and town centre car parks all charge.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            What does exist is a ring of free residential street parking within 10-20 minutes' walk of most destinations, a few free surface car parks in the outer areas, and some seasonal free options near the beaches. This guide maps all of it properly.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4">
            <p className="text-[#1B2E4B] font-medium leading-relaxed text-sm">
              If you are visiting for the beach or for shopping, the paid car parks are genuinely not expensive. Marine Drive is from £1.50 and most town centre options are £2-4 for a few hours. Sometimes a 10-minute walk from the free option to save £2 is not worth the bother. Your call.
            </p>
          </div>
        </section>

        {/* Free options table */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Free Parking Options in Southport</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            These are the options we have confirmed as genuinely free, with no hidden time limits that would get you a ticket on a typical visit.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B2E4B] text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Location</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Postcode</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">Type</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden lg:table-cell">Walking distance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {FREE_OPTIONS.map((row) => (
                  <tr key={row.name} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#1B2E4B]">
                      <div>{row.href ? (
                        <Link href={row.href} className="hover:text-[#C9A84C] underline underline-offset-2 decoration-[#C9A84C]/40 transition-colors">
                          {row.name}
                        </Link>
                      ) : row.name}</div>
                      <div className="text-gray-500 text-xs mt-0.5 font-normal lg:hidden">{row.walkTo}</div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">{row.postcode}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell">{row.type}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden lg:table-cell">{row.walkTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500">
            Always check the signs on the day. Parking restrictions can change and residential permit zones expand. If there is a sign saying anything other than what you expected, believe the sign.
          </p>
        </section>

        {/* On-street detail */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">On-Street Parking Near the Town Centre</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The most useful free option if you are visiting Lord Street is the cluster of residential streets between the railway line and the town centre. Roe Lane, Scarisbrick Avenue, and the streets running off them are your best bet.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            On weekdays in term time, finding a space here is straightforward. On Saturday afternoons in July and August, you are competing with everyone who has had the same idea. Get there before 10am on a busy summer day and you should be fine.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 mb-4">
            <p className="text-[#1B2E4B] font-medium leading-relaxed text-sm">
              <span className="mr-2">⚠️</span>
              Enforcement is active in and around Southport town centre. If you are not sure whether a bay is free, do not assume. Read the sign. A parking fine is considerably more expensive than a £2 car park ticket.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Some streets north of Lord Street have residents' permit zones, particularly closer to the centre. These are clearly signed. Park in a non-permit bay and you are fine.
          </p>
        </section>

        {/* Cheap but paid */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Worth Knowing: Low-Cost Paid Options</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If free parking is not available or not convenient, these are the cheapest paid options close to the main destinations.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B2E4B] text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Car Park</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Postcode</th>
                  <th className="text-left px-5 py-3.5 font-semibold">From</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {PAID_BUT_CHEAP.map((row) => (
                  <tr key={row.name} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#1B2E4B]">{row.name}</td>
                    <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">{row.postcode}</td>
                    <td className="px-5 py-3.5 text-[#1B2E4B] font-semibold">{row.cost}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Blue badge */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Blue Badge Parking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Blue badge holders can park free in designated blue badge bays throughout Southport, including on Lord Street and in most Sefton Council managed car parks. Time limits apply (typically 3 hours on-street, longer in car parks), so check the signs.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Blue badge bays on Lord Street are located at regular intervals along the boulevard. The town centre car parks all have dedicated blue badge sections, usually near the entrances.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Info,
                title: "On-street blue badge bays",
                body: "Available along Lord Street and in the town centre. Unlimited parking time in designated bays, but follow any time restrictions displayed at specific locations.",
              },
              {
                icon: MapPin,
                title: "Car parks with blue badge sections",
                body: "NCP London Street, Tulketh Street, Eastbank Street, and Market Street all have blue badge spaces near the entrances. Free for blue badge holders in council-managed car parks.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] flex items-center justify-center flex-none">
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base">{title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Common Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-[#1B2E4B] text-sm hover:text-[#C9A84C] transition-colors list-none">
                  {q}
                  <ChevronRight className="w-4 h-4 flex-none group-open:rotate-90 transition-transform text-[#C9A84C]" />
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Full directory CTA */}
        <section className="bg-[#1B2E4B] rounded-2xl p-6 md:p-8 mb-10 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-none">
              <Car className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <p className="font-display font-bold text-lg">Full Parking Directory</p>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            We have mapped 106 verified car parks across Southport and the Sefton Coast, including every free option on this page. Use the map view, filter by area, or filter for EV charging.
          </p>
          <Link
            href="/parking"
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm transition-all"
          >
            Browse all 106 car parks <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Related guides */}
        <section className="bg-[#FAF8F5] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Related guides</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/guides/parking-southport", label: "Parking in Southport (full guide)" },
              { href: "/guides/southport-beach", label: "Southport Beach Guide" },
              { href: "/guides/dog-friendly-southport", label: "Dog-Friendly Guide" },
              { href: "/guides/lord-street", label: "Lord Street" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-[#1B2E4B] hover:text-[#C9A84C] text-sm font-semibold transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" /> {label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
