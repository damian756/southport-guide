import Link from "next/link";
import Image from "next/image";
import { MapPin, Car, ChevronRight, ArrowRight, Clock, CreditCard } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("parking-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "parking Southport, Southport car parks, parking near Southport beach, Marine Drive parking, Lord Street parking, Southport town centre parking, free parking Southport",
  alternates: { canonical: `${BASE_URL}/guides/parking-southport` },
  openGraph: {
    title: "Parking in Southport | Car Parks, Prices & Tips",
    description:
      "Where to park in Southport, car parks near the beach, Lord Street, and the town centre. Prices, postcodes, and which ones fill first on a summer Saturday.",
    url: `${BASE_URL}/guides/parking-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/transport.webp` }],
  },
};

const FAQS = [
  {
    q: "Is parking free in Southport?",
    a: "Most car parks in Southport are paid. The main free options are on-street residential parking in the streets north of Lord Street (off Roe Lane and similar), and some free bays in Churchtown village. Marine Drive (beach parking) and the town centre car parks all charge. Expect to pay £2–£5 depending on duration.",
  },
  {
    q: "Where is the best place to park near Southport Beach?",
    a: "Marine Drive car park (PR8 1RQ) is the main option for beach parking, it runs alongside the promenade and beach. It's a large car park so it can accommodate significant numbers, but it does fill on busy summer Saturdays and during the Air Show. Arrive before 10am in peak season to be safe.",
  },
  {
    q: "Where should I park for Lord Street?",
    a: "The most convenient options for Lord Street are Tulketh Street car park (PR8 1DP) for the northern end, Eastbank Street (PR8 1DG) for the central stretch, and Market Street for the southern end. All are within a few minutes' walk.",
  },
  {
    q: "Is there parking near Southport Pier?",
    a: "Yes. Marine Drive car park is the closest to Southport Pier, approximately 5 minutes' walk. The Promenade car park (PR8 1RQ) is also nearby.",
  },
  {
    q: "What is the postcode for Southport beach parking?",
    a: "Marine Drive car park postcode is PR8 1RQ. This will get you to the main beach-side car park on Marine Drive, which runs along the seafront.",
  },
  {
    q: "Is there EV charging in Southport?",
    a: "Yes, but provision is patchy. Confirmed EV charging points exist at the NCP on London Street, the Morrisons on Meols Cop Road, and at several hotel car parks. Coverage is improving but it is not universal, check Zap-Map or our parking directory (filter by EV charging) before you travel if it is essential.",
  },
  {
    q: "Can I park free on the street in Southport?",
    a: "On-street parking on residential streets north of Lord Street (off Roe Lane, Scarisbrick Avenue, and similar streets) is often free on weekdays. Some areas have residents' permit requirements. Check the signs, enforcement is active in the centre. Summer weekends reduce your free options considerably.",
  },
];

const CAR_PARKS = [
  { name: "Marine Drive (Beach)", postcode: "PR8 1RQ", best: "Beach, Pier, Promenade", notes: "Main beach car park. Fills on summer Saturdays, arrive early.", href: "/parking/parking-southport-marine-drive-car-park" },
  { name: "Esplanade", postcode: "PR8 1RX", best: "Beach, seafront", notes: "Pay-and-display on the Esplanade, steps from the sand.", href: "/parking/parking-esplanade-parking" },
  { name: "NCP London Street", postcode: "PR8 1QU", best: "Town centre, Lord Street", notes: "Multi-storey. Covered, good in wet weather. Central for Lord Street.", href: "/parking/parking-ncp-southport-london-street" },
  { name: "Tulketh Street", postcode: "PR8 1DP", best: "Lord Street (north)", notes: "Convenient for The Atkinson and northern Lord Street." },
  { name: "Eastbank Street", postcode: "PR8 1DG", best: "Lord Street (central)", notes: "Multi-storey. Central for Lord Street shopping." },
  { name: "Market Street", postcode: "PR8 1HH", best: "Town centre, Market", notes: "Good for the market hall and southern Lord Street." },
  { name: "Cambridge Road", postcode: "PR9 9NB", best: "Hesketh Park, Churchtown", notes: "Free. Good base for Churchtown and Hesketh Park." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Parking in Southport. Complete Guide",
  description:
    "Where to park in Southport, car parks near the beach, Lord Street, and the town centre. Prices, postcodes, and tips from a local.",
  url: `${BASE_URL}/guides/parking-southport`,
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

export default function ParkingSouthportGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[50vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/transport.webp"
            alt="Parking in Southport"
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
            Parking in Southport
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Where to park near the beach, Lord Street, and the town centre.
            Postcodes, prices, and which car parks fill first on a summer Saturday.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>Beach parking: PR8 1RQ</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <CreditCard className="w-4 h-4 text-[#C9A84C]" />
              <span>Most car parks: £2–£5</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick answer strip ── */}
      <div className="bg-[#1B2E4B] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Beach parking postcode", value: "PR8 1RQ" },
              { label: "Lord St parking", value: "Tulketh / Eastbank" },
              { label: "Typical cost", value: "£2–£5" },
              { label: "Peak arrival (summer)", value: "Before 10am" },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 py-4 text-center">
                <p className="text-white/50 text-[11px] uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 max-w-4xl py-14">

        {/* Car parks table */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Southport Car Parks at a Glance</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The table below covers the main car parks. Use the postcode in your satnav. Southport&apos;s one-way system means the approach matters.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B2E4B] text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Car Park</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Postcode</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Best for</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {CAR_PARKS.map((row) => (
                  <tr key={row.name} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#1B2E4B]">
                      {"href" in row && row.href ? (
                        <Link href={row.href} className="hover:text-[#C9A84C] underline underline-offset-2 decoration-[#C9A84C]/40 transition-colors">
                          {row.name}
                        </Link>
                      ) : row.name}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">{row.postcode}</td>
                    <td className="px-5 py-3.5 text-gray-600">{row.best}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            See the full directory of{" "}
            <Link href="/parking" className="text-[#C9A84C] font-semibold hover:underline">
              106 car parks across Southport and the Sefton Coast →
            </Link>
          </p>
        </section>

        {/* Beach parking */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Parking Near Southport Beach</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Marine Drive is the main beach-side car park. It runs along the promenade for about a mile, with pay-and-display bays facing the beach. Postcode: <strong>PR8 1RQ</strong>.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 my-6">
            <p className="text-[#1B2E4B] font-medium leading-relaxed">
              <span className="mr-2">⚠️</span>
              On summer Saturdays and during the Air Show, Marine Drive fills by around 10–11am. If you&apos;re arriving later, have a backup plan, the town centre car parks are a 10–15 minute walk from the beach.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Promenade car park (same postcode area) is adjacent and slightly less busy. Both are pay-and-display. Prices are lower here than in the town centre, worth it if you&apos;re spending the day at the beach rather than shopping.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The train is worth considering for busy days. Southport station is about 15 minutes&apos; walk from the beach via Lord Street, and avoids the parking stress entirely. Merseyrail runs regularly from Liverpool.
          </p>
        </section>

        {/* Lord Street parking */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Parking for Lord Street</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For shopping on Lord Street, Tulketh Street car park (PR8 1DP) is the most convenient for the northern end near The Atkinson. Eastbank Street multi-storey (PR8 1DG) serves the central stretch and has more capacity.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Free on-street parking is usually available on residential side streets running north from Lord Street, off Roe Lane, Scarisbrick Avenue, and similar. Check the signs carefully; some areas have permit requirements.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Weekday mornings in term time are the easiest time to park. Saturday mornings in summer are the hardest.
          </p>
        </section>

        {/* EV Charging */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">EV Charging in Southport Car Parks</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EV provision in Southport is improving but still patchy. If charging is essential for your visit, plan ahead rather than assuming there will be a point available when you arrive.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Confirmed EV charging locations include:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B2E4B] text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Location</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Postcode</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {[
                  { name: "NCP London Street", postcode: "PR8 1QU", notes: "Multi-storey town centre. Most reliable for EV in the centre." },
                  { name: "Morrisons, Meols Cop Road", postcode: "PR8 6AF", notes: "Supermarket car park. Free to use while shopping." },
                  { name: "Southport Holiday Inn", postcode: "PR8 1RE", notes: "Hotel car park. Check availability if not a guest." },
                  { name: "Pontins Southport", postcode: "PR8 3JS", notes: "Holiday park. Primarily for guests but publicly accessible chargers." },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#1B2E4B]">{row.name}</td>
                    <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">{row.postcode}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 mb-4">
            <p className="text-[#1B2E4B] font-medium leading-relaxed text-sm">
              Coverage changes. Before travelling, check{" "}
              <a href="https://www.zap-map.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] font-semibold hover:underline">Zap-Map</a>
              {" "}for real-time charger availability or use the EV filter in our{" "}
              <Link href="/parking" className="text-[#C9A84C] font-semibold hover:underline">parking directory</Link>
              {" "}to see all confirmed EV locations.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            The Marine Drive beach car park and most of the smaller town centre surface car parks do not currently have EV points. If you need a charge during a beach day, the NCP on London Street is your most reliable option and is a 15-minute walk from the seafront.
          </p>
        </section>

        {/* Tips */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Practical Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Clock,
                title: "Arrive early in summer",
                body: "Marine Drive fills by 10–11am on busy summer Saturdays. The Air Show (August) and the Flower Show (August) are the two weekends to plan around most carefully.",
              },
              {
                icon: Car,
                title: "Consider the train",
                body: "Merseyrail from Liverpool Central to Southport takes about 50 minutes. On peak summer days and event weekends, the train removes all parking stress.",
              },
              {
                icon: MapPin,
                title: "Blue badge bays",
                body: "Blue badge holders can park in designated bays throughout the town centre and on Marine Drive. Several car parks have specific blue badge sections, check the car park entrance boards.",
              },
              {
                icon: CreditCard,
                title: "Payment methods",
                body: "Most Southport car parks now accept contactless card payment. Some still require cash for short stays, it's worth having coins as a backup.",
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
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Frequently Asked Questions</h2>
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

        <section className="bg-[#1B2E4B] rounded-2xl p-6 md:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
          <div className="flex-1 min-w-0">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Staying Overnight?</p>
            <p className="text-white/80 text-sm leading-relaxed">
              If you&apos;re visiting for more than a day, Southport has hotels on Lord Street, the seafront, and in Birkdale.
              During Open week (July 2026) and summer event weekends, accommodation books out quickly. Check availability early.
            </p>
          </div>
          <Link
            href="/hotels"
            className="flex-none bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-5 py-2.5 rounded-full font-bold text-sm transition-colors whitespace-nowrap"
          >
            Hotels in Southport →
          </Link>
        </section>

        <section className="bg-[#FAF8F5] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">More practical guides</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/guides/southport-beach", label: "Southport Beach Guide" },
              { href: "/hotels", label: "Hotels in Southport" },
              { href: "/guides/dog-friendly-southport", label: "Dog-Friendly Guide" },
              { href: "/guides/rainy-day-southport", label: "Rainy Day Guide" },
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
