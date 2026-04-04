import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { sectorToSlug, getAreaLabelForSector } from "@/lib/property-config";
import { TrendingUp, Shield, Train, School, Waves, Wifi, ChevronRight, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "House Prices in Southport | PR8 & PR9 Data",
  description:
    "House prices, recent sales, school Ofsted ratings, crime data and local amenities for every postcode in Southport. PR8 and PR9, from Birkdale to Churchtown. Land Registry data, updated regularly.",
  alternates: { canonical: `${BASE_URL}/property` },
  openGraph: {
    title: "House Prices in Southport. Honest Data, Local Knowledge",
    description:
      "House prices, recent sales, school Ofsted ratings, crime data and local amenities for every postcode in Southport. PR8 and PR9.",
    url: `${BASE_URL}/property`,
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/og-property.webp`, width: 1200, height: 630 }],
  },
};

export const revalidate = 86400;

const SECTOR_COLOURS: Record<string, string> = {
  "PR8 1": "border-l-teal-500",
  "PR8 2": "border-l-sky-400",
  "PR8 3": "border-l-sky-400",
  "PR8 4": "border-l-amber-400",
  "PR8 5": "border-l-green-400",
  "PR8 6": "border-l-slate-400",
  "PR9 0": "border-l-teal-500",
  "PR9 7": "border-l-violet-400",
  "PR9 8": "border-l-green-400",
  "PR9 9": "border-l-amber-500",
};

const SECTOR_NOTES: Record<string, string> = {
  "PR8 1": "Town centre streets, flats and terraces. Best transport links. Merseyrail direct.",
  "PR8 2": "Coastal. Woodvale and Ainsdale-on-Sea. Some of the best sea-proximity value in the North West.",
  "PR8 3": "Ainsdale. Family-friendly with National Trust on the doorstep. Strong demand.",
  "PR8 4": "Birkdale. The premium sector. Large Edwardian houses, Royal Birkdale Golf Club, highest prices.",
  "PR8 5": "Scarisbrick and rural south. Genuinely rural. Different character to the coast.",
  "PR8 6": "Blowick. Most affordable PR8 sector. Predominantly terraced. Solid demand.",
  "PR9 0": "Town centre and promenade. Seafront access, mixed types. MLEC development nearby.",
  "PR9 7": "High Park and Norwood. Terrace-heavy, one of the more affordable parts of the area.",
  "PR9 8": "Banks and Crossens. Rural eastern fringe. Good-sized properties for the price.",
  "PR9 9": "Churchtown and Marshside. Victorian semis, Botanic Gardens, consistently strong demand.",
};

const FAQS = [
  {
    q: "What is the average house price in Southport?",
    a: "Average house prices in Southport vary significantly by postcode sector. Birkdale (PR8 4) is consistently the highest, with large detached properties. The most affordable entry points are PR9 7 (High Park and Norwood) and PR8 6 (Blowick). PR9 9 (Churchtown) and PR8 3 (Ainsdale) sit in the mid-range and offer strong value relative to the quality of the area. Prices across the PR8 and PR9 area average broadly in the £170,000–£250,000 range depending on sector and property type.",
  },
  {
    q: "Is Southport a good place to buy a house?",
    a: "Southport has several things going for it as a place to buy. The Merseyrail line to Liverpool Central (approximately 45 minutes) makes it practical for commuters. The beach, the National Trust coastline at Ainsdale, the independent village feel of Churchtown and Birkdale, and the Botanic Gardens all provide genuine quality of life. The town's investment pipeline (The Open Championship returning to Royal Birkdale in July 2026, and the Marine Lake Events Centre opening in 2027) points toward improving footfall and visitor economy. Property prices remain significantly more affordable than Liverpool's suburbs of comparable quality.",
  },
  {
    q: "Which is the most expensive area in Southport?",
    a: "PR8 4 (Birkdale) is consistently the highest-priced postcode sector in Southport. Wide roads, large Edwardian detached and semi-detached houses, proximity to Royal Birkdale Golf Club, and a strong local identity all contribute. PR9 9 (Churchtown) and PR8 3 (Ainsdale) are typically the next tier. PR8 1 (town centre) and PR9 7 (High Park) are at the affordable end.",
  },
  {
    q: "What is the most affordable area to buy in Southport?",
    a: "PR9 7 (High Park and Norwood) and PR8 6 (Blowick) are typically the most affordable postcode sectors in Southport. Both are predominantly terraced housing with good access to the town centre. PR8 1 (town centre) also offers competitive prices for flats and smaller terraced properties, with the advantage of direct Merseyrail access.",
  },
  {
    q: "How does Southport compare to other areas for property value?",
    a: "Southport is substantially more affordable than Liverpool's more fashionable suburbs (Woolton, Allerton, West Derby) while offering comparable commute times on the Merseyrail Northern Line. Compared to Formby and Crosby, Southport is generally cheaper, particularly at the Birkdale end. The combination of coastal access, good schools in certain sectors, and ongoing investment makes the area attractive relative to price.",
  },
  {
    q: "Where can I find the best schools near Southport?",
    a: "School catchment varies significantly by postcode. Each sector page on this guide shows the nearest Ofsted-rated schools with inspection grades and distances. Generally, PR9 9 (Churchtown) and PR8 4 (Birkdale) have strong school options within catchment. The sector-level school data on this guide is sourced from the DfE Get Information About Schools database and current Ofsted inspection reports.",
  },
  {
    q: "What is the flood risk in Southport?",
    a: "Flood risk varies by postcode across PR8 and PR9. Coastal and low-lying areas carry higher flood zone classifications. Each unit postcode page on this guide shows the Environment Agency flood zone designation. Buyers should check flood zone data carefully for any specific postcode, particularly along the coastal strip and near the Marine Lake. Banks and Crossens (PR9 8) includes some higher-risk agricultural land.",
  },
  {
    q: "What is Southport like for commuting to Liverpool?",
    a: "Southport has direct Merseyrail Northern Line trains to Liverpool Central, running roughly every 20–30 minutes during peak hours. Journey time is approximately 43–48 minutes. The Merseyrail station is in the town centre. Most postcode sectors in PR8 and PR9 are within a few miles of the station, with some (like PR8 4 and PR8 3 near Birkdale and Hillside stations) having their own local stops. Each sector page on this guide shows the nearest station and typical journey times.",
  },
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

const DATASET_LD = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Southport House Prices by Postcode. PR8 & PR9",
  description:
    "Land Registry Price Paid Data for Southport postcodes PR8 and PR9, enriched with Ofsted school ratings, police.uk crime data, Environment Agency flood zones, EPC energy ratings, and Ofcom broadband speeds.",
  url: `${BASE_URL}/property`,
  creator: { "@type": "Organization", name: "SouthportGuide.co.uk", url: BASE_URL },
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  temporalCoverage: "2022/2025",
  spatialCoverage: {
    "@type": "Place",
    name: "Southport, Merseyside",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Southport",
      addressRegion: "Merseyside",
      addressCountry: "GB",
    },
  },
};

export default async function PropertyLandingPage() {
  const [sectors, stats] = await Promise.all([
    prisma.postcodeSector.findMany({
      where: { published: true },
      orderBy: { sector: "asc" },
      select: { sector: true, avgPrice3yr: true, salesCount3yr: true, medianPrice3yr: true },
    }),
    prisma.$queryRaw<
      { total_sales: number; avg_price: number; median_price: number; sector_count: number }[]
    >`
      SELECT COUNT(*)::int AS total_sales,
             AVG(price)::int AS avg_price,
             PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price)::int AS median_price,
             COUNT(DISTINCT LEFT(postcode, CASE WHEN postcode ~ '^PR[89] ' THEN 4 ELSE 3 END))::int AS sector_count
      FROM "PropertySale"
      WHERE (postcode LIKE 'PR8%' OR postcode LIKE 'PR9%')
        AND "dateOfTransfer" >= NOW() - INTERVAL '3 years'
        AND "recordStatus" != 'D'
    `,
  ]);

  const s = stats[0];
  const totalSales = s?.total_sales ?? 0;
  const avgPrice = s?.avg_price ?? 0;
  const medianPrice = s?.median_price ?? 0;

  const highestSector = sectors.length
    ? sectors.reduce((a, b) => ((a.avgPrice3yr ?? 0) > (b.avgPrice3yr ?? 0) ? a : b))
    : null;
  const lowestSector = sectors.filter((s) => s.avgPrice3yr).length
    ? sectors.filter((s) => s.avgPrice3yr).reduce((a, b) => ((a.avgPrice3yr ?? 0) < (b.avgPrice3yr ?? 0) ? a : b))
    : null;

  function fmtK(n: number) {
    return `£${Math.round(n / 1000)}k`;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(DATASET_LD) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* ── Hero ── */}
        <header className="bg-[#1B2E4B] relative overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
          </div>
          <div className="relative container mx-auto max-w-5xl px-4 py-12">
            <nav className="flex items-center gap-1 text-sm text-white/40 mb-6">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/70">House Prices</span>
            </nav>

            <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-2">
              Southport · PR8 &amp; PR9 · Land Registry data
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              House Prices in Southport
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-8">
              Every Land Registry sale across PR8 and PR9 over three years, broken down by postcode sector with school Ofsted ratings, crime comparisons, flood zones, broadband speeds, and Merseyrail commute times. The things Rightmove doesn&apos;t show you.
            </p>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "3-year sales", value: totalSales > 0 ? totalSales.toLocaleString() : "—" },
                { label: "Average price", value: avgPrice > 0 ? fmtK(avgPrice) : "—" },
                { label: "Median price", value: medianPrice > 0 ? fmtK(medianPrice) : "—" },
                { label: "Postcode sectors", value: sectors.length.toString() },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-center min-w-[90px]">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wide">{label}</p>
                  <p className="mt-1 text-xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-5xl px-4 py-10 space-y-12">

          {/* ── Feature chips ── */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "Land Registry sold prices" },
              { icon: <School className="w-3.5 h-3.5" />, label: "Ofsted school ratings" },
              { icon: <Shield className="w-3.5 h-3.5" />, label: "Crime vs Southport average" },
              { icon: <Waves className="w-3.5 h-3.5" />, label: "Flood risk by postcode" },
              { icon: <Wifi className="w-3.5 h-3.5" />, label: "Broadband speeds" },
              { icon: <Train className="w-3.5 h-3.5" />, label: "Merseyrail commute times" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm">
                <span className="text-[#C9A84C]">{icon}</span> {label}
              </span>
            ))}
          </div>

          {/* ── Terry's take ── */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-3">Terry&apos;s take</p>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-5">Why Southport Property Is More Interesting Than It Looks</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                I&apos;ve lived in Southport for 41 years. I&apos;ve watched the property market go through quiet periods and active ones.
                What I notice now is that there are two very different conversations happening depending on which end of town you&apos;re looking at.
              </p>
              <p>
                At the Birkdale end (PR8 4), you&apos;re talking about some of the most desirable residential streets in Merseyside. Wide roads, large Edwardian houses, Royal Birkdale Golf Club around the corner. Prices reflect that. At the High Park end (PR9 7) or Blowick (PR8 6), you&apos;re in solid, affordable terraced housing with good access to the town centre and the Merseyrail line. Both are legitimate choices. They&apos;re just completely different places.
              </p>
              <p>
                What I find missing from the national property portals is the context. Knowing a house sold for £220,000 doesn&apos;t tell you whether the nearest primary school is Outstanding or Requires Improvement, whether the street floods, or how long it takes to get to Liverpool Central on a Tuesday morning. That&apos;s what we&apos;ve tried to build here: one place with all of it.
              </p>
              <p>
                The timing matters too. The Open Championship returns to Royal Birkdale in July 2026 and the Marine Lake Events Centre opens in 2027. Both will change the volume of visitors to Southport. Whether that flows through to property prices is speculative, but the logic is there: more footfall, more hospitality spend, more infrastructure. Worth factoring in if you&apos;re thinking long-term.
              </p>
            </div>
          </section>

          {/* ── Sector grid ── */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Browse by Postcode Sector</h2>
              <p className="text-gray-500 text-sm mt-1">Select a sector for full price history, school data, crime breakdown, and more.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((sec) => {
                const accentClass = SECTOR_COLOURS[sec.sector] ?? "border-l-gray-300";
                const note = SECTOR_NOTES[sec.sector];
                return (
                  <Link
                    key={sec.sector}
                    href={`/property/${sectorToSlug(sec.sector)}`}
                    className={`group flex flex-col rounded-2xl border border-gray-200 border-l-4 ${accentClass} bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-gray-300`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-[#1B2E4B] text-base">{sec.sector}</p>
                        <p className="text-sm font-medium text-gray-600">{getAreaLabelForSector(sec.sector)}</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        {sec.avgPrice3yr ? (
                          <p className="font-bold text-[#1B2E4B] text-base">{fmtK(sec.avgPrice3yr)}</p>
                        ) : (
                          <p className="text-sm text-gray-400">—</p>
                        )}
                        <p className="text-xs text-gray-400">{sec.salesCount3yr} sales (3yr)</p>
                      </div>
                    </div>
                    {note && (
                      <p className="text-xs text-gray-500 leading-relaxed mt-1 line-clamp-2">{note}</p>
                    )}
                    <div className="mt-3 flex items-center gap-1 text-[#C9A84C] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      View full data <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── Area comparison ── */}
          {highestSector && lowestSector && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">The Price Range Across Southport</h2>
              <p className="text-gray-500 text-sm mb-6">Three-year average, all property types.</p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">Highest avg: {highestSector.sector}</p>
                  <p className="font-display text-3xl font-bold text-[#1B2E4B]">{fmtK(highestSector.avgPrice3yr ?? 0)}</p>
                  <p className="text-xs text-gray-500 mt-1">{getAreaLabelForSector(highestSector.sector)}</p>
                </div>
                {avgPrice > 0 && (
                  <div className="rounded-xl bg-[#FAF8F5] border border-gray-200 p-5 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Area average (3yr)</p>
                    <p className="font-display text-3xl font-bold text-[#1B2E4B]">{fmtK(avgPrice)}</p>
                    <p className="text-xs text-gray-500 mt-1">All sectors combined</p>
                  </div>
                )}
                <div className="rounded-xl bg-teal-50 border border-teal-200 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-1">Most affordable: {lowestSector.sector}</p>
                  <p className="font-display text-3xl font-bold text-[#1B2E4B]">{fmtK(lowestSector.avgPrice3yr ?? 0)}</p>
                  <p className="text-xs text-gray-500 mt-1">{getAreaLabelForSector(lowestSector.sector)}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The spread between the highest and lowest average sectors in Southport reflects genuine neighbourhood differences, not just housing stock. Birkdale (PR8 4) has larger properties and a different buyer profile to High Park (PR9 7). They happen to share the same postcode district but are distinct places with distinct markets. Each sector page unpacks what drives the numbers.
              </p>
            </section>
          )}

          {/* ── What makes this different ── */}
          <section className="bg-[#1B2E4B] rounded-2xl p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-3">What this guide gives you</p>
            <h2 className="font-display text-2xl font-bold text-white mb-6">More Than a List of Sold Prices</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: <TrendingUp className="w-5 h-5 text-[#C9A84C]" />,
                  title: "Real sold prices",
                  desc: "Land Registry Price Paid Data: what actually changed hands, not asking prices. 3-year averages, medians, and monthly trend charts.",
                },
                {
                  icon: <School className="w-5 h-5 text-[#C9A84C]" />,
                  title: "School Ofsted ratings",
                  desc: "Every school within 2km of each sector, with Ofsted grade, phase, and distance. Sourced directly from the DfE database.",
                },
                {
                  icon: <Shield className="w-5 h-5 text-[#C9A84C]" />,
                  title: "Crime by category",
                  desc: "12 months of police.uk data broken down by category, with a comparison to the Southport average so you can see whether a sector is above or below typical.",
                },
                {
                  icon: <Waves className="w-5 h-5 text-[#C9A84C]" />,
                  title: "Flood zone classification",
                  desc: "Environment Agency flood risk zone for every postcode in the sector. Zones 1, 2, and 3. Relevant for the coastal and low-lying parts of Southport.",
                },
                {
                  icon: <Wifi className="w-5 h-5 text-[#C9A84C]" />,
                  title: "Broadband speeds",
                  desc: "Ofcom Connected Nations data showing average and maximum download speeds and gigabit availability for each postcode area.",
                },
                {
                  icon: <Train className="w-5 h-5 text-[#C9A84C]" />,
                  title: "Merseyrail commute times",
                  desc: "Nearest Merseyrail station, walking distance, and typical journey time to Southport town centre and Liverpool Central, for every sector.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white/10 rounded-xl p-5">
                  <div className="mb-3">{icon}</div>
                  <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Upcoming context ── */}
          <section className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="text-2xl mb-3">⛳</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">The Open 2026: Royal Birkdale</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Golf&apos;s oldest major returns to Royal Birkdale in July 2026. The championship brings 200,000+ visitors over the week and puts Birkdale (PR8 4) and the surrounding sectors in the global spotlight. Accommodation is already scarce.
              </p>
              <Link href="/the-open-2026" className="text-[#C9A84C] text-sm font-semibold hover:text-[#1B2E4B] transition-colors flex items-center gap-1">
                The Open 2026 guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="text-2xl mb-3">🏗️</div>
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">MLEC: Opening 2027</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                The Marine Lake Events Centre, a 4,000-capacity arena on the seafront, opens in 2027 with projections of 515,000 additional visitors annually. Relevant context for anyone looking at PR9 0 (Town Centre & Promenade) or PR8 1 sectors.
              </p>
              <Link href="/mlec" className="text-[#C9A84C] text-sm font-semibold hover:text-[#1B2E4B] transition-colors flex items-center gap-1">
                MLEC guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* ── FAQs ── */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Southport Property: Common Questions</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-display font-semibold text-[#1B2E4B] text-base mb-3 flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                    {q}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pl-6">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Methodology + data sources ── */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-5">Data Sources &amp; Methodology</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              All data on this guide comes from open government and public sources. We do not adjust, estimate, or editorially modify the underlying figures. They are published as received, with context added where useful. Crime counts are updated monthly via the police.uk API. Land Registry data is updated as new Price Paid records are released (typically 2–3 months after completion). School data reflects the most recent Ofsted inspection at the time of the last data refresh.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { src: "HM Land Registry Price Paid Data", licence: "OGL v3", href: "https://www.gov.uk/government/collections/price-paid-data" },
                { src: "DfE Get Information About Schools", licence: "OGL v3", href: "https://get-information-schools.service.gov.uk" },
                { src: "Ofsted inspection outcomes", licence: "OGL v3", href: "https://www.gov.uk/government/collections/ofsted-inspection-outcomes" },
                { src: "police.uk Crime Data API", licence: "OGL v3", href: "https://data.police.uk" },
                { src: "Energy Performance Certificate (EPC) register", licence: "OGL v3", href: "https://epc.opendatacommunities.org" },
                { src: "Environment Agency Flood Risk", licence: "OGL v3", href: "https://environment.data.gov.uk" },
                { src: "Ofcom Connected Nations broadband data", licence: "OGL v3", href: "https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations" },
                { src: "Merseyrail journey times", licence: "Timetable-derived", href: "https://www.merseyrail.org" },
              ].map(({ src, licence, href }) => (
                <div key={src} className="flex items-start gap-2.5 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <div>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#1B2E4B] hover:text-[#C9A84C] font-medium transition-colors">
                      {src}
                    </a>
                    <span className="text-gray-400 ml-1.5 text-xs">({licence})</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Local guides ── */}
          <section className="bg-[#FAF8F5] rounded-2xl border border-gray-100 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-4">Related guides</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/guides/birkdale-village", label: "Birkdale Village", desc: "Southport's upmarket independent quarter." },
                { href: "/guides/churchtown", label: "Churchtown Guide", desc: "The historic village at the north end." },
                { href: "/guides/lord-street", label: "Lord Street", desc: "The Victorian boulevard at the heart of Southport." },
                { href: "/the-open-2026", label: "The Open 2026", desc: "Royal Birkdale, July 2026." },
                { href: "/mlec", label: "MLEC", desc: "The 4,000-cap venue opening 2027." },
                { href: "/blog/southport-house-prices-by-postcode", label: "House Prices Blog Post", desc: "Terry's honest breakdown of what each area is really like." },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-[#1B2E4B] text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">{label}</h3>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="bg-[#1B2E4B] rounded-2xl p-8 text-center text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Property services in Southport?</p>
            <h2 className="font-display text-2xl font-bold mb-3">Estate Agents, Solicitors &amp; Surveyors</h2>
            <p className="text-white/60 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              List your property services business on SouthportGuide and reach people actively researching buying or selling in the area.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/claim-listing"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3 rounded-full font-bold text-sm transition-all"
              >
                List Your Business
              </Link>
              <Link
                href="/blog/southport-house-prices-by-postcode"
                className="bg-white/10 border border-white/25 text-white px-7 py-3 rounded-full font-semibold text-sm transition-all hover:bg-white/20"
              >
                Read the House Prices Guide
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
