import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  getAreaLabelForSector,
  sectorToSlug,
  postcodeToSlug,
  slugToSector,
} from "@/lib/property-config";
import PropertyBreadcrumb from "@/components/property/PropertyBreadcrumb";
import PropertyPriceChart from "@/components/property/PropertyPriceChart";
import PropertyTypeChart from "@/components/property/PropertyTypeChart";
import EPCDistributionChart from "@/components/property/EPCDistributionChart";
import TenureMix from "@/components/property/TenureMix";
import SchoolsList from "@/components/property/SchoolsList";
import CrimeSummary from "@/components/property/CrimeSummary";
import FloodRiskBadge from "@/components/property/FloodRiskBadge";
import BroadbandSummary from "@/components/property/BroadbandSummary";
import ComparisonTable from "@/components/property/ComparisonTable";
import DataFreshness from "@/components/property/DataFreshness";
import MethodologySection from "@/components/property/MethodologySection";
import StampDutyCalc from "@/components/property/StampDutyCalc";
import MortgageEstimate from "@/components/property/MortgageEstimate";
import PostcodeMap from "@/components/property/PostcodeMap";
import NearbyBusinesses from "@/components/property/NearbyBusinesses";
import PropertyFAQ from "@/components/property/PropertyFAQ";
import SalesTable from "@/components/property/SalesTable";
import LocalContext from "@/components/property/LocalContext";
import MerseyrailTimes from "@/components/property/MerseyrailTimes";
import { format } from "date-fns";

const BASE_URL = "https://www.southportguide.co.uk";

type Props = { params: Promise<{ slug: string }> };

function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function generateStaticParams() {
  const sectors = await prisma.postcodeSector.findMany({
    where: { published: true },
    select: { sector: true },
  });
  const units = await prisma.postcodeUnit.findMany({
    where: { published: true },
    select: { postcode: true },
  });
  return [
    ...sectors.map((s) => ({ slug: sectorToSlug(s.sector) })),
    ...units.map((u) => ({ slug: postcodeToSlug(u.postcode) })),
  ];
}

export const revalidate = 86400;

async function getPageData(slug: string) {
  const isSectorSlug = slug.includes("-");
  let sector = null;
  let unit = null;

  if (isSectorSlug) {
    const sectorStr = slugToSector(slug);
    sector = await prisma.postcodeSector.findFirst({
      where: { sector: sectorStr, published: true },
    });
  }

  if (!sector) {
    const units = await prisma.postcodeUnit.findMany({
      where: { published: true },
      select: { postcode: true },
    });
    const match = units.find((u) => postcodeToSlug(u.postcode) === slug);
    if (match) {
      unit = await prisma.postcodeUnit.findUnique({
        where: { postcode: match.postcode },
      });
    }
  }

  return { sector, unit };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { sector, unit } = await getPageData(slug);

  if (sector) {
    const areaLabel = getAreaLabelForSector(sector.sector);
    const title = (sector.metaTitle as string) ?? `House Prices in ${sector.sector} — ${areaLabel}, Southport`;
    const desc =
      (sector.metaDescription as string) ??
      `Average house price in ${sector.sector} is £${((sector.avgPrice3yr ?? 0) / 1000).toFixed(0)}k. See recent sales, schools, crime data and local amenities.`;
    return {
      title,
      description: desc,
      alternates: { canonical: `${BASE_URL}/property/${slug}` },
      openGraph: {
        title,
        description: desc,
        url: `${BASE_URL}/property/${slug}`,
        siteName: "SouthportGuide.co.uk",
        type: "website",
        images: [
          {
            url: `${BASE_URL}/og-property.webp`,
            width: 1200,
            height: 630,
            alt: `House prices in ${sector.sector} — ${areaLabel}, Southport`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: desc,
        images: [`${BASE_URL}/og-property.webp`],
      },
      other: {
        "article:modified_time": new Date().toISOString().split("T")[0],
      },
    };
  }

  if (unit) {
    const sectorRec = await prisma.postcodeSector.findFirst({
      where: { sector: unit.sector },
    });
    const areaLabel = sectorRec ? getAreaLabelForSector(unit.sector) : unit.sector;
    const title =
      (unit.metaTitle as string) ?? `House Prices in ${unit.postcode} — ${areaLabel}, Southport`;
    const desc =
      (unit.metaDescription as string) ??
      `Average house price in ${unit.postcode} is £${((unit.avgPrice3yr ?? 0) / 1000).toFixed(0)}k. See recent sales and local data.`;
    const hasContent = !!(unit.editorialContent);
    return {
      title,
      description: desc,
      alternates: { canonical: `${BASE_URL}/property/${slug}` },
      robots: hasContent ? undefined : { index: false, follow: true },
    };
  }

  return { title: "Property" };
}

export default async function PropertySlugPage({ params }: Props) {
  const { slug } = await params;
  const { sector, unit } = await getPageData(slug);

  if (sector) {
    return <SectorPage sector={sector} slug={slug} />;
  }
  if (unit) {
    return <UnitPage unit={unit} slug={slug} />;
  }

  notFound();
}

async function SectorPage({
  sector,
  slug,
}: {
  sector: { id: string; sector: string; lat: number; lng: number; avgPrice3yr: number | null; medianPrice3yr: number | null; salesCount3yr: number; editorialContent: string | null; metaTitle: string | null; metaDescription: string | null; faqJson: unknown };
  slug: string;
}) {
  const areaLabel = getAreaLabelForSector(sector.sector);

  const [quarterlyPrices, propertyTypeData, epcDist, crimeData, crimePrev, crimeAvg, schools, unitsInSector, southportAvg] =
    await Promise.all([
      prisma.$queryRaw<
        { quarter: string; avg_price: number; cnt: number }[]
      >`
        SELECT to_char("dateOfTransfer", 'YYYY-Q') AS quarter,
               AVG(price)::int AS avg_price,
               COUNT(*)::int AS cnt
        FROM "PropertySale"
        WHERE postcode LIKE ${sector.sector + "%"}
          AND "dateOfTransfer" >= NOW() - INTERVAL '5 years'
          AND "recordStatus" != 'D'
        GROUP BY to_char("dateOfTransfer", 'YYYY-Q')
        ORDER BY quarter
      `,
      prisma.$queryRaw<
        { property_type: string; avg_price: number; cnt: number }[]
      >`
        SELECT "propertyType" AS property_type,
               AVG(price)::int AS avg_price,
               COUNT(*)::int AS cnt
        FROM "PropertySale"
        WHERE postcode LIKE ${sector.sector + "%"}
          AND "dateOfTransfer" >= NOW() - INTERVAL '3 years'
          AND "recordStatus" != 'D'
        GROUP BY "propertyType"
      `,
      prisma.$queryRaw<{ rating: string; cnt: number }[]>`
        SELECT "currentRating" AS rating, COUNT(*)::int AS cnt
        FROM "EPCRecord"
        WHERE postcode LIKE ${sector.sector + "%"}
        GROUP BY "currentRating"
      `,
      prisma.$queryRaw<{ category: string; count: number }[]>`
        SELECT category, COALESCE(SUM(count), 0)::int AS count
        FROM "CrimeSnapshot"
        WHERE sector = ${sector.sector}
          AND month >= to_char(NOW() - INTERVAL '12 months', 'YYYY-MM')
        GROUP BY category
      `,
      prisma.$queryRaw<{ category: string; count: number }[]>`
        SELECT category, COALESCE(SUM(count), 0)::int AS count
        FROM "CrimeSnapshot"
        WHERE sector = ${sector.sector}
          AND month >= to_char(NOW() - INTERVAL '24 months', 'YYYY-MM')
          AND month < to_char(NOW() - INTERVAL '12 months', 'YYYY-MM')
        GROUP BY category
      `,
      // Southport-wide average crimes per sector — total AND per category (last 12 months)
      prisma.$queryRaw<{ category: string | null; avg_count: number }[]>`
        SELECT category, ROUND(AVG(cat_total))::int AS avg_count
        FROM (
          SELECT sector, category, COALESCE(SUM(count), 0) AS cat_total
          FROM "CrimeSnapshot"
          WHERE month >= to_char(NOW() - INTERVAL '12 months', 'YYYY-MM')
          GROUP BY sector, category
        ) sub
        GROUP BY category
        UNION ALL
        SELECT NULL AS category, ROUND(AVG(sector_total))::int AS avg_count
        FROM (
          SELECT sector, COALESCE(SUM(count), 0) AS sector_total
          FROM "CrimeSnapshot"
          WHERE month >= to_char(NOW() - INTERVAL '12 months', 'YYYY-MM')
          GROUP BY sector
        ) sub
      `,
      prisma.school.findMany({
        where: { status: "Open" },
        select: {
          id: true,
          name: true,
          phase: true,
          schoolType: true,
          ofstedRating: true,
          ofstedDate: true,
          isSelective: true,
          address: true,
          website: true,
          lat: true,
          lng: true,
        },
      }),
      prisma.postcodeUnit.findMany({
        where: { sector: sector.sector, published: true },
        select: { postcode: true, avgPrice3yr: true, salesCount3yr: true, floodZone: true },
      }),
      prisma.postcodeSector.aggregate({
        _avg: { avgPrice3yr: true },
        where: { published: true },
      }),
    ]);

  const schoolsWithDistance = schools
    .filter((s) => s.lat != null && s.lng != null)
    .map((s) => ({
      ...s,
      distanceM: Math.round(haversineMeters(sector.lat, sector.lng, s.lat!, s.lng!)),
    }))
    .sort((a, b) => a.distanceM - b.distanceM)
    .slice(0, 15)
    .map((s) => ({
      id: s.id,
      name: s.name,
      phase: s.phase,
      schoolType: s.schoolType,
      ofstedRating: s.ofstedRating,
      ofstedDate: s.ofstedDate,
      isSelective: s.isSelective,
      distanceM: s.distanceM,
      address: s.address,
      website: s.website,
    }));

  // Derive the sector-level flood zone from its units.
  // Show the most prevalent zone; if tied between 2 and 3, prefer the higher (more cautious).
  const zoneCounts = { "1": 0, "2": 0, "3": 0 };
  for (const u of unitsInSector) {
    const z = u.floodZone as string | null;
    if (z === "1" || z === "2" || z === "3") zoneCounts[z]++;
  }
  const totalZoned = zoneCounts["1"] + zoneCounts["2"] + zoneCounts["3"];
  let sectorFloodZone: string | null = null;
  if (totalZoned > 0) {
    // Pick the zone that covers the majority; if zone 3 is present at all (>10%), show that
    if (zoneCounts["3"] / totalZoned > 0.1) sectorFloodZone = "3";
    else if (zoneCounts["2"] / totalZoned > 0.2) sectorFloodZone = "2";
    else sectorFloodZone = "1";
  }

  const prevByCat = new Map(crimePrev.map((c) => [c.category, c.count]));
  const crimeByCategory = crimeData.map((c) => ({
    category: c.category,
    count: c.count,
    prevCount: prevByCat.get(c.category) ?? 0,
  }));

  const prevTotal = crimePrev.reduce((a, b) => a + b.count, 0);
  const totalCrime = crimeByCategory.reduce((a, b) => a + b.count, 0);

  // crimeAvg rows: NULL category = overall average; named category = per-category average
  const southportAvgCrime = crimeAvg.find((r) => r.category === null)?.avg_count ?? 0;
  const southportAvgByCategory = new Map(
    crimeAvg.filter((r) => r.category !== null).map((r) => [r.category as string, r.avg_count])
  );

  const comparisonRows = [
    {
      metric: "Average price",
      postcode: sector.avgPrice3yr ? `£${(sector.avgPrice3yr / 1000).toFixed(0)}k` : "—",
      southport: southportAvg._avg.avgPrice3yr
        ? `£${((southportAvg._avg.avgPrice3yr as number) / 1000).toFixed(0)}k`
        : "—",
    },
    {
      metric: "Sales (3yr)",
      postcode: String(sector.salesCount3yr),
      southport: "—",
    },
  ];

  const faqItems = (sector.faqJson as { question: string; answer: string }[] | null) ?? [];
  const sectorPageUrl = `${BASE_URL}/property/${slug}`;

  const placeLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${sector.sector} — ${areaLabel}, Southport`,
    geo: { "@type": "GeoCoordinates", latitude: sector.lat, longitude: sector.lng },
    containedInPlace: {
      "@type": "City",
      name: "Southport",
      sameAs: "https://en.wikipedia.org/wiki/Southport",
    },
  };
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `House prices in ${sector.sector}`,
    description: `Average and median house prices, sales data for ${sector.sector}, Southport.`,
    dateModified: new Date().toISOString().split("T")[0],
    creator: {
      "@type": "Organization",
      name: "SouthportGuide.co.uk",
      url: BASE_URL,
      sameAs: "https://www.southportguide.co.uk",
    },
    distribution: {
      "@type": "DataDownload",
      name: "Land Registry Price Paid Data",
      url: "https://www.gov.uk/government/collections/price-paid-data",
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Property", item: `${BASE_URL}/property` },
      { "@type": "ListItem", position: 3, name: `${sector.sector} — ${areaLabel}`, item: sectorPageUrl },
    ],
  };
  const faqLd = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;
  const offerLd = sector.avgPrice3yr
    ? {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: `Property in ${sector.sector}, Southport`,
        areaServed: {
          "@type": "PostalAddress",
          postalCode: sector.sector,
          addressLocality: "Southport",
          addressCountry: "GB",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "GBP",
          price: Math.round(sector.avgPrice3yr),
          offerCount: sector.salesCount3yr,
        },
      }
    : null;
  const mapPoints = schoolsWithDistance.slice(0, 5).map((s) => ({
    id: s.id,
    name: s.name,
    lat: schools.find((x) => x.id === s.id)!.lat!,
    lng: schools.find((x) => x.id === s.id)!.lng!,
    type: "school" as const,
    subtitle: s.phase,
  }));

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Property", href: "/property" },
    { label: `${sector.sector} — ${areaLabel}`, href: undefined },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {offerLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />}

      {/* ── Hero header ── */}
      <header className="bg-[var(--navy)]">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <PropertyBreadcrumb items={breadcrumbs} light />

          <div className="mt-5">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--gold)]">
              {areaLabel} · Southport
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold text-white sm:text-4xl">
              House Prices in {sector.sector}
            </h1>
          </div>

          {/* Stat pills */}
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            {sector.avgPrice3yr && (
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wide">3yr average</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  £{(sector.avgPrice3yr / 1000).toFixed(0)}k
                </p>
              </div>
            )}
            {sector.medianPrice3yr && (
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wide">Median</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  £{(sector.medianPrice3yr / 1000).toFixed(0)}k
                </p>
              </div>
            )}
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide">Sales (3yr)</p>
              <p className="mt-1 text-2xl font-bold text-white">{sector.salesCount3yr}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-6 min-w-0 overflow-hidden">

            {/* Terry's editorial callout — first thing below the header */}
            {sector.editorialContent && (
              <div className="flex gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-5">
                <div className="mt-0.5 shrink-0 text-2xl">📍</div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--teal)] mb-2">
                    Terry&apos;s view
                  </p>
                  <p className="text-gray-800 leading-relaxed">{sector.editorialContent}</p>
                </div>
              </div>
            )}

            {/* Local context — Open 2026 / MLEC where relevant */}
            <LocalContext sector={sector.sector} />

            {quarterlyPrices.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--navy)]/10 text-sm">📈</span>
                  Price trend
                </h2>
                <PropertyPriceChart
                  data={quarterlyPrices.map((q) => ({
                    quarter: q.quarter,
                    avgPrice: q.avg_price,
                    count: q.cnt,
                  }))}
                />
              </section>
            )}

            {propertyTypeData.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--navy)]/10 text-sm">🏠</span>
                  By property type
                </h2>
                <PropertyTypeChart
                  data={propertyTypeData.map((p) => ({
                    type: p.property_type,
                    avgPrice: p.avg_price,
                    count: p.cnt,
                  }))}
                />
              </section>
            )}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--navy)]/10 text-sm">⚖️</span>
                vs Southport average
              </h2>
              <ComparisonTable rows={comparisonRows} />
            </section>

            {schoolsWithDistance.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">🎓</span>
                  Nearby schools
                </h2>
                <SchoolsList schools={schoolsWithDistance} maxDistanceM={2400} />
              </section>
            )}

            {crimeByCategory.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-sm">🔐</span>
                  Crime — last 12 months
                </h2>
                <CrimeSummary
                  categories={crimeByCategory}
                  totalCount={totalCrime}
                  prevTotalCount={prevTotal}
                  southportAvg={southportAvgCrime}
                  southportAvgByCategory={southportAvgByCategory}
                />
              </section>
            )}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <NearbyBusinesses lat={sector.lat} lng={sector.lng} radiusM={1600} limit={8} />
            </section>

            {faqItems.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)]/20 text-sm">❓</span>
                  Frequently asked
                </h2>
                <PropertyFAQ items={faqItems} />
              </section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">

            {/* Flood risk */}
            <FloodRiskBadge zone={sectorFloodZone} isSector />

            {/* Merseyrail commute times */}
            <MerseyrailTimes sector={sector.sector} />

            {/* Broadband */}
            <BroadbandSummary avgMbps={null} maxMbps={null} fttpAvailable={null} />

            {/* Calculators */}
            <div className="rounded-2xl border border-[var(--navy)]/20 bg-[var(--navy)] p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Calculators</p>
              <div className="space-y-5">
                <StampDutyCalc defaultPrice={sector.avgPrice3yr ?? 250000} dark />
                <div className="border-t border-white/10 pt-5">
                  <MortgageEstimate defaultPrice={sector.avgPrice3yr ?? 250000} dark />
                </div>
              </div>
            </div>

            {/* Postcodes in this sector */}
            {unitsInSector.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
                  Postcodes in {sector.sector}
                </h3>
                <ul className="divide-y divide-gray-100">
                  {unitsInSector.map((u) => (
                    <li key={u.postcode}>
                      <Link
                        href={`/property/${postcodeToSlug(u.postcode)}`}
                        className="flex items-center justify-between py-2 text-sm hover:text-[var(--teal)]"
                      >
                        <span className="font-medium text-[var(--navy)]">{u.postcode}</span>
                        <span className="text-gray-500">
                          £{((u.avgPrice3yr ?? 0) / 1000).toFixed(0)}k
                          <span className="ml-1 text-xs text-gray-400">({u.salesCount3yr})</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Data provenance */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <MethodologySection />
              <div className="mt-3">
                <DataFreshness priceDate={format(new Date(), "MMMM yyyy")} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

async function UnitPage({
  unit,
  slug,
}: {
  unit: {
    postcode: string;
    sector: string;
    lat: number;
    lng: number;
    avgPrice3yr: number | null;
    medianPrice3yr: number | null;
    salesCount3yr: number;
    floodZone: string | null;
    avgBroadband: number | null;
    editorialContent: string | null;
    faqJson: unknown;
  };
  slug: string;
}) {
  const sectorRec = await prisma.postcodeSector.findFirst({
    where: { sector: unit.sector },
  });
  const areaLabel = sectorRec ? getAreaLabelForSector(unit.sector) : unit.sector;

  const sales = await prisma.propertySale.findMany({
    where: { postcode: unit.postcode, recordStatus: { not: "D" } },
    orderBy: { dateOfTransfer: "desc" },
    take: 20,
    select: {
      dateOfTransfer: true,
      price: true,
      propertyType: true,
      tenure: true,
      newBuild: true,
    },
  });

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Property", href: "/property" },
    { label: `${unit.sector} — ${areaLabel}`, href: `/property/${sectorToSlug(unit.sector)}` },
    { label: unit.postcode, href: undefined },
  ];

  const faqArray = (unit.faqJson as { question: string; answer: string }[] | null) ?? [];

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* ── Hero header ── */}
      <header className="bg-[var(--navy)]">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <PropertyBreadcrumb items={breadcrumbs} light />

          <div className="mt-5">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--gold)]">
              {areaLabel} · Southport
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold text-white sm:text-4xl">
              House Prices in {unit.postcode}
            </h1>
          </div>

          {/* Stat pills */}
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            {unit.avgPrice3yr ? (
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wide">3yr average</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  £{(unit.avgPrice3yr / 1000).toFixed(0)}k
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wide">3yr average</p>
                <p className="mt-1 text-lg font-semibold text-white/50">—</p>
              </div>
            )}
            {unit.medianPrice3yr ? (
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wide">Median</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  £{(unit.medianPrice3yr / 1000).toFixed(0)}k
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wide">Median</p>
                <p className="mt-1 text-lg font-semibold text-white/50">—</p>
              </div>
            )}
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide">Sales (3yr)</p>
              <p className="mt-1 text-2xl font-bold text-white">{unit.salesCount3yr}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-6 min-w-0 overflow-hidden">

            {/* Area context note */}
            {unit.editorialContent && (
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--teal)] mb-2">
                  About this postcode
                </p>
                <p className="text-gray-800 leading-relaxed text-sm">{unit.editorialContent}</p>
              </div>
            )}

            {sales.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--navy)]/10 text-sm">🏷️</span>
                  Recent sales
                </h2>
                <SalesTable
                  sales={sales.map((s) => ({
                    dateOfTransfer: s.dateOfTransfer,
                    price: s.price,
                    propertyType: s.propertyType,
                    tenure: s.tenure,
                    newBuild: s.newBuild,
                  }))}
                />
              </section>
            )}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <NearbyBusinesses lat={unit.lat} lng={unit.lng} radiusM={800} limit={5} />
            </section>

            {faqArray.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)]/20 text-sm">❓</span>
                  Frequently asked
                </h2>
                <PropertyFAQ items={faqArray} />
              </section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">

            {/* Back to sector */}
            <Link
              href={`/property/${sectorToSlug(unit.sector)}`}
              className="flex items-center gap-2 rounded-xl border border-[var(--teal)]/30 bg-teal-50 px-4 py-3 text-sm font-medium text-[var(--teal)] hover:bg-teal-100 transition-colors"
            >
              <span>←</span>
              <span>All of {unit.sector} — {areaLabel}</span>
            </Link>

            {/* Flood risk */}
            <FloodRiskBadge zone={unit.floodZone} />

            {/* Broadband */}
            <BroadbandSummary
              avgMbps={unit.avgBroadband}
              maxMbps={null}
              fttpAvailable={null}
            />

            {/* Calculators */}
            <div className="rounded-2xl border border-[var(--navy)]/20 bg-[var(--navy)] p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Calculators</p>
              <div className="space-y-5">
                <StampDutyCalc defaultPrice={unit.avgPrice3yr ?? 250000} dark />
                <div className="border-t border-white/10 pt-5">
                  <MortgageEstimate defaultPrice={unit.avgPrice3yr ?? 250000} dark />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
