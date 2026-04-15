import Link from "next/link";
import Image from "next/image";
import { MapPin, Car, ChevronRight, ArrowRight, ShoppingBag, Utensils, Coffee, Star } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("lord-street");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Lord Street Southport, Lord Street shops, Lord Street restaurants, Lord Street parking, Victorian boulevard Southport, shopping Southport town centre",
  alternates: { canonical: `${BASE_URL}/guides/lord-street` },
  openGraph: {
    title: "Lord Street Southport | The Complete Guide",
    description:
      "Lord Street is a mile-long Victorian boulevard, glass canopies, independent boutiques, restaurants, and one of England's finest streets. Your complete guide.",
    url: `${BASE_URL}/guides/lord-street`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/shopping.webp` }],
  },
};

const FAQS = [
  {
    q: "Where is Lord Street, Southport?",
    a: "Lord Street runs through the heart of Southport town centre, roughly parallel to the seafront. The main shopping and dining stretch runs from Chapel Street in the north to Nevill Street in the south. Postcode for the northern end: PR8 1QN.",
  },
  {
    q: "Why is Lord Street famous?",
    a: "Lord Street is one of the finest Victorian boulevards in England. It's famous for its glass-canopied walkways, wide tree-lined central reservation, and elegant Victorian architecture. The most discussed theory is that Napoleon III, who lived in exile in Southport before becoming Emperor of France, was inspired by Lord Street when he commissioned Baron Haussmann to redesign Paris. Historians debate this, but the architectural parallels are striking.",
  },
  {
    q: "What is there to do on Lord Street?",
    a: "Lord Street is best as a walking and browsing destination, independent boutiques, cafés, restaurants, and the glass-canopied arcade stretch. The Wayfarers Arcade (off Lord Street) is worth a detour for independent shops and a coffee stop. The Atkinson arts centre is at the northern end. Most visitors combine shopping with lunch or dinner.",
  },
  {
    q: "Where can I park for Lord Street?",
    a: "The closest car parks to Lord Street are Tulketh Street car park (PR8 1DP, short walk from the northern end), Eastbank Street (PR8 1DG), and Promenade car park (PR8 1RQ, slightly further). Marine Drive is the best option for beach parking if you're combining both. On weekdays, on-street pay-and-display on the side streets is usually available.",
  },
  {
    q: "Is Lord Street good for restaurants?",
    a: "Yes. Lord Street and its immediate side streets have a solid restaurant and café offer. From relaxed lunch spots to proper evening dining. The concentration gets better the further south you go toward the Birkdale end. Booking recommended on Friday and Saturday evenings.",
  },
  {
    q: "What is Wayfarers Arcade?",
    a: "Wayfarers Arcade is a Victorian indoor arcade running off Lord Street. It's covered, heated, and has a mix of independent shops, cafés, and a relaxed atmosphere. It's a good rainy-day option and genuinely different from a standard shopping centre.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "LandmarksOrHistoricalBuildings",
  name: "Lord Street, Southport",
  description:
    "Lord Street is a mile-long Victorian boulevard at the heart of Southport, glass canopies, independent boutiques, restaurants, and the street that may have inspired Haussmann's Paris.",
  url: `${BASE_URL}/guides/lord-street`,
  geo: { "@type": "GeoCoordinates", latitude: 53.6472, longitude: -3.0072 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lord Street",
    addressLocality: "Southport",
    postalCode: "PR8 1QN",
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

export default function LordStreetGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[60vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/shopping.webp"
            alt="Lord Street, Southport"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl pb-14 pt-20" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">
            <ShoppingBag className="w-4 h-4" />
            Areas Guide
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Lord Street
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Southport&apos;s mile-long Victorian boulevard. Glass canopies, independent shops, proper restaurants,
            and the street that may have inspired Haussmann&apos;s redesign of Paris.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>Postcode: PR8 1QN</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Car className="w-4 h-4 text-[#C9A84C]" />
              <span>Tulketh St or Eastbank St car parks</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick facts strip ── */}
      <div className="bg-[#1B2E4B] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Length", value: "1 mile" },
              { label: "Nearest postcode", value: "PR8 1QN" },
              { label: "Best for", value: "Browsing & dining" },
              { label: "Parking", value: "Tulketh St / Eastbank" },
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

        {/* What is Lord Street */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">What is Lord Street?</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Lord Street is a mile-long boulevard running through the heart of Southport town centre. It&apos;s one of the finest Victorian streets in England, wide, tree-lined, with glass-and-iron canopied walkways along the eastern side that keep you dry when it inevitably rains.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The street was laid out in the early 19th century and developed through the Victorian era as Southport grew into one of England&apos;s most fashionable seaside resorts. The glass canopies over the pavement were added later and are now the defining visual feature, they&apos;re functional as well as attractive, which in Lancashire is always the right priority.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The mix on Lord Street today is mostly independent, boutiques, cafés, restaurants, jewellers, gift shops, with some nationals mixed in. The southern end toward Birkdale has the better independent concentration. The northern end, near The Atkinson, is more mixed but includes Wayfarers Arcade (worth visiting).
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 my-6">
            <p className="text-[#1B2E4B] font-medium leading-relaxed">
              <span className="mr-2">📍</span>
              Lord Street runs north-south through Southport town centre. The main shopping stretch is roughly between Chapel Street (north) and Nevill Street (south). Allow at least an hour for a proper walk; more if you&apos;re stopping to eat.
            </p>
          </div>
        </section>

        {/* Napoleon connection */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Did Lord Street Inspire Paris?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This is the most interesting thing about Lord Street, and it&apos;s genuinely debated. Louis Napoleon Bonaparte, the future Napoleon III, Emperor of France, lived in exile in Southport in the 1840s. He stayed on Lord Street and, according to the story, was so impressed by its wide boulevards and glass-covered promenades that when he came to power and commissioned Baron Haussmann to redesign Paris in the 1850s, the influence of Lord Street can be seen in the result.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether that&apos;s entirely accurate, historians argue about. But the architectural parallels between Lord Street and the covered arcades of central Paris are there, and the story is plausible enough that it&apos;s become part of the street&apos;s identity. There&apos;s a blue plaque marking Napoleon&apos;s connection on the street.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The practical version for visitors: Lord Street looks and feels like a proper boulevard. Wide, with a central reservation of trees and gardens, and those glass canopies keeping you dry. It&apos;s genuinely pleasant to walk compared to most British high streets.
          </p>
        </section>

        {/* What to see and do */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">What to Do on Lord Street</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: ShoppingBag,
                title: "Shopping",
                body: "The independent shops are the main draw, boutique clothing, homeware, gifts, jewellery, artisan food. The mix changes but there's generally something worth a look. Better on the southern half of the street.",
              },
              {
                icon: Coffee,
                title: "Wayfarers Arcade",
                body: "A Victorian indoor arcade just off Lord Street. Covered, independently run, with cafés and smaller shops inside. Good rainy-day option and genuinely unlike a shopping centre.",
              },
              {
                icon: Star,
                title: "The Atkinson",
                body: "Southport's arts centre at the northern end of Lord Street, gallery, theatre, café, museum. Free entry to the gallery. Regular exhibitions and a solid events programme. Worth 45 minutes even if you don't plan to.",
              },
              {
                icon: Utensils,
                title: "Eating and Drinking",
                body: "Lord Street has restaurants, cafés, and bars across a wide range. Best to walk the length first and see what appeals. The side streets immediately off Lord Street often have the better independent places.",
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

        {/* Parking */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Parking for Lord Street</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            There are several car parks within easy walking distance. Tulketh Street is the most convenient for the northern end; Eastbank Street and Market Street serve the central stretch.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B2E4B] text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Car Park</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Postcode</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Walk to Lord St</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {[
                  { name: "Tulketh Street", code: "PR8 1DP", walk: "2 min" },
                  { name: "Eastbank Street", code: "PR8 1DG", walk: "3 min" },
                  { name: "Market Street", code: "PR8 1HH", walk: "4 min" },
                  { name: "NCP London Street", code: "PR8 1QU", walk: "3 min", href: "/parking/parking-ncp-southport-london-street" },
                  { name: "Marine Drive (Beach)", code: "PR8 1RQ", walk: "10 min", href: "/parking/parking-southport-marine-drive-car-park" },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#1B2E4B]">
                      {"href" in row && row.href ? (
                        <Link href={row.href} className="hover:text-[#C9A84C] underline underline-offset-2 decoration-[#C9A84C]/40 transition-colors">
                          {row.name}
                        </Link>
                      ) : row.name}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">{row.code}</td>
                    <td className="px-5 py-3.5 text-gray-600">{row.walk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-3">
            Free on-street parking is usually available on residential side streets north of Lord Street on weekdays. Summer Saturdays are busier, arrive before 11am.{" "}
            <Link href="/parking" className="text-[#C9A84C] font-semibold hover:underline">Browse all Southport car parks →</Link>
          </p>
        </section>

        {/* Getting there */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Getting to Lord Street</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Southport train station (PR8 1BN) is about 5 minutes&apos; walk from Lord Street, exit the station and head west. Merseyrail Northern Line runs from Liverpool Central with trains roughly every 30 minutes; the journey is about 50 minutes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By car, Lord Street is signed from the main A565 approach road into Southport town centre. The car parks listed above are all accessible from the town centre ring road.
          </p>
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

        {/* Related guides nav */}
        <section className="bg-[#FAF8F5] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Also in Southport</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/guides/birkdale-village", label: "Birkdale Village" },
              { href: "/guides/churchtown", label: "Churchtown" },
              { href: "/guides/parking-southport", label: "Parking Guide" },
              { href: "/guides/best-restaurants-southport", label: "Best Restaurants" },
              { href: "/property", label: "Southport House Prices" },
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
