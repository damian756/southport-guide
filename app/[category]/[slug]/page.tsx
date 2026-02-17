import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, Globe, Clock, Star, ChevronRight, Lock, ShieldCheck, ShieldAlert, ShieldX, Shield } from "lucide-react";
import { getCategoryBySlug, isValidCategory } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ category: string; slug: string }> };

// Map category slugs to Schema.org @type
const SCHEMA_TYPES: Record<string, string> = {
  restaurants:      "Restaurant",
  hotels:           "LodgingBusiness",
  "bars-nightlife": "BarOrPub",
  cafes:            "CafeOrCoffeeShop",
  golf:             "SportsClub",
  shopping:         "Store",
  wellness:         "BeautySalon",
  attractions:      "TouristAttraction",
  "beaches-parks":  "Park",
  activities:       "LocalBusiness",
  transport:        "LocalBusiness",
};

// Categories that might have food hygiene ratings
const FOOD_CATS = new Set(["restaurants", "cafes", "bars-nightlife", "hotels", "activities"]);

function extractArea(address: string, _postcode: string): string {
  const areas = ["Birkdale", "Ainsdale", "Churchtown", "Crossens", "Marshside",
                 "Formby", "Ormskirk", "Scarisbrick", "Banks", "Halsall", "Burscough"];
  for (const area of areas) {
    if (address.includes(area)) return area;
  }
  return "Southport";
}

function formatAddress(address: string, postcode: string): string {
  let addr = address.replace(/,?\s*(United Kingdom|UK)$/i, "").trim();
  if (postcode && !addr.includes(postcode)) addr = `${addr}, ${postcode}`;
  return addr;
}

function buildTitle(name: string, catName: string, area: string): string {
  return `${name} | ${catName} in ${area}, Southport | SouthportGuide.co.uk`;
}

function buildMetaDescription(
  name: string, catName: string, area: string,
  description: string | null, shortDescription: string | null,
  rating: number | null, reviewCount: number | null
): string {
  if (description) {
    const stripped = description.replace(/\n/g, " ").trim();
    return stripped.length > 155 ? stripped.slice(0, 152) + "…" : stripped;
  }
  if (shortDescription) {
    return `${name} – ${shortDescription} ${rating ? `Rated ${rating}/5` : ""} ${area !== "Southport" ? `in ${area}, Southport` : "in Southport"}. Find address, opening hours & more on SouthportGuide.co.uk`.slice(0, 160);
  }
  return `${name} – ${catName} in ${area !== "Southport" ? `${area}, ` : ""}Southport. ${rating && reviewCount ? `Rated ${rating.toFixed(1)}/5 by ${reviewCount.toLocaleString()} Google reviewers. ` : ""}Find opening hours, directions and contact details on SouthportGuide.co.uk`.slice(0, 160);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isValidCategory(category)) return { title: "Business" };
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: slug };

  try {
    const catRecord = await prisma.category.findFirst({ where: { slug: category } });
    if (!catRecord) return { title: slug };
    const b = await prisma.business.findFirst({
      where: { slug, categoryId: catRecord.id },
      select: { name: true, address: true, postcode: true, shortDescription: true, description: true, rating: true, reviewCount: true, images: true },
    });
    if (!b) return { title: slug };

    const area = extractArea(b.address, b.postcode);
    const title = buildTitle(b.name, cat.name, area);
    const desc = buildMetaDescription(b.name, cat.name, area, b.description, b.shortDescription, b.rating, b.reviewCount);
    const imageUrl = b.images?.[0] || null;

    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        type: "website",
        siteName: "SouthportGuide.co.uk",
        ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: b.name }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: desc,
        ...(imageUrl ? { images: [imageUrl] } : {}),
      },
    };
  } catch {
    return { title: slug };
  }
}

export default async function BusinessPage({ params }: Props) {
  const { category, slug } = await params;
  if (!isValidCategory(category)) notFound();
  const cat = getCategoryBySlug(category)!;

  type Business = {
    id: string;
    name: string;
    address: string;
    postcode: string;
    lat: number | null;
    lng: number | null;
    phone: string | null;
    website: string | null;
    description: string | null;
    shortDescription: string | null;
    listingTier: string;
    priceRange: string | null;
    openingHours: unknown;
    images: string[];
    claimed: boolean;
    rating: number | null;
    reviewCount: number | null;
    placeId: string | null;
    hygieneRating: string | null;
    hygieneRatingDate: Date | null;
    hygieneRatingShow: boolean;
  };

  let business: Business | null = null;
  let related: { slug: string; name: string; rating: number | null; reviewCount: number | null; address: string; priceRange: string | null }[] = [];

  try {
    const categoryRecord = await prisma.category.findFirst({ where: { slug: category } });
    if (categoryRecord) {
      business = await prisma.business.findFirst({
        where: { slug, categoryId: categoryRecord.id },
        select: {
          id: true, name: true, address: true, postcode: true, lat: true, lng: true,
          phone: true, website: true, description: true, shortDescription: true,
          listingTier: true, priceRange: true, openingHours: true, images: true,
          claimed: true, rating: true, reviewCount: true, placeId: true,
          hygieneRating: true, hygieneRatingDate: true, hygieneRatingShow: true,
        },
      }) as Business | null;

      if (business) {
        related = await prisma.$queryRaw<typeof related>`
          SELECT slug, name, rating, "reviewCount", address, "priceRange"
          FROM "Business"
          WHERE "categoryId" = ${categoryRecord.id}
            AND id != ${business.id}
          ORDER BY (COALESCE(rating, 0) * LOG(COALESCE("reviewCount", 0) + 1)) DESC
          LIMIT 4
        `;
      }
    }
  } catch {
    // DB not connected
  }

  if (!business) notFound();

  const isFeatured = business.listingTier === "featured" || business.listingTier === "premium";
  const area = extractArea(business.address, business.postcode);
  const formattedAddress = formatAddress(business.address, business.postcode);
  const mapsKey = process.env.GOOGLE_PLACES_API_KEY;
  const isFoodCategory = FOOD_CATS.has(category);

  // Build JSON-LD structured data
  const schemaType = SCHEMA_TYPES[category] || "LocalBusiness";
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: business.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.replace(/,?\s*(United Kingdom|UK)$/i, "").split(",")[0].trim(),
      addressLocality: area,
      addressRegion: "Merseyside",
      postalCode: business.postcode,
      addressCountry: "GB",
    },
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.website ? { url: business.website } : {}),
    ...(business.lat && business.lng ? {
      geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng },
    } : {}),
    ...(business.rating && business.reviewCount ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: business.rating.toFixed(1),
        reviewCount: business.reviewCount,
        bestRating: "5",
        worstRating: "1",
      },
    } : {}),
    ...(business.priceRange ? { priceRange: business.priceRange } : {}),
    ...(business.description || business.shortDescription ? {
      description: business.description || business.shortDescription,
    } : {}),
    ...(business.images?.[0] ? { image: business.images[0] } : {}),
  };

  // Opening hours for JSON-LD
  if (business.openingHours && typeof business.openingHours === "object") {
    const oh = business.openingHours as { weekdayText?: string[] };
    if (oh.weekdayText?.length) {
      const specs = oh.weekdayText.map((line: string) => {
        const [day, times] = line.split(": ");
        if (!times || times === "Closed") return null;
        if (times === "Open 24 hours") {
          return { "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${day}`, opens: "00:00", closes: "23:59" };
        }
        const [open, close] = times.split(" – ").map((t: string) => {
          const [time, ampm] = t.split(" ");
          const [h, m] = time.split(":").map(Number);
          const h24 = ampm === "PM" && h !== 12 ? h + 12 : (ampm === "AM" && h === 12 ? 0 : h);
          return `${String(h24).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}`;
        });
        return { "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${day}`, opens: open, closes: close };
      }).filter(Boolean);
      if (specs.length) jsonLd.openingHoursSpecification = specs;
    }
  }

  // Map embed URL – use placeId if available, else lat/lng
  const mapSrc = mapsKey
    ? business.placeId
      ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=place_id:${business.placeId}&zoom=16`
      : business.lat && business.lng
        ? `https://www.google.com/maps/embed/v1/view?key=${mapsKey}&center=${business.lat},${business.lng}&zoom=16&maptype=roadmap`
        : null
    : null;

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-5xl">

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${category}`} className="hover:text-blue-600">{cat.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{business.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Main column ─────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Hero card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="h-56 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  {business.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={business.images[0]} alt={business.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-7xl text-blue-200 select-none">📍</span>
                  )}
                </div>

                <div className="p-6">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {isFeatured && (
                      <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">FEATURED</span>
                    )}
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{cat.name}</span>
                    {business.priceRange && (
                      <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{business.priceRange}</span>
                    )}
                    {/* Food Hygiene badge inline with other badges */}
                    {isFoodCategory && (
                      <HygieneBadgeInline
                        rating={business.hygieneRating}
                        date={business.hygieneRatingDate}
                        claimed={business.claimed}
                        show={business.hygieneRatingShow}
                      />
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>

                  {/* Google rating */}
                  {business.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex items-center gap-1 bg-amber-50 text-amber-700 font-semibold px-3 py-1.5 rounded-full border border-amber-200 text-sm">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        {business.rating.toFixed(1)}
                        {business.reviewCount && (
                          <span className="text-amber-600 font-normal ml-1">({business.reviewCount.toLocaleString()} reviews)</span>
                        )}
                      </span>
                      <span className="text-xs text-gray-400">Google rating</span>
                    </div>
                  )}

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    {business.website && (
                      <a
                        href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                      >
                        <Globe className="w-4 h-4" /> Visit Website
                      </a>
                    )}
                    {business.phone && (
                      <a
                        href={`tel:${business.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                      >
                        <Phone className="w-4 h-4 text-blue-500" /> {business.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {(business.description || business.shortDescription) && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About {business.name}</h2>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
                    {(business.description || business.shortDescription)!
                      .split("\n\n")
                      .filter(Boolean)
                      .map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                </div>
              )}

              {/* Address + Hours */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" /> Address
                    </h2>
                    <address className="text-gray-700 not-italic leading-relaxed text-sm">
                      {formattedAddress}
                    </address>
                    {business.lat && business.lng && (
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-blue-600 text-sm hover:underline font-medium"
                      >
                        Get directions →
                      </a>
                    )}
                  </div>

                  {business.openingHours != null && typeof business.openingHours === "object" && (
                    <div>
                      <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" /> Opening Hours
                      </h2>
                      <OpeningHours data={business.openingHours} />
                    </div>
                  )}
                </div>
              </div>

              {/* Google Maps embed */}
              {mapSrc && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 pt-5 pb-2">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" /> Location
                    </h2>
                  </div>
                  <iframe
                    loading="lazy"
                    className="w-full h-80"
                    src={mapSrc}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing location of ${business.name}`}
                  />
                </div>
              )}

              {/* Food Hygiene Rating — full card (food categories only) */}
              {isFoodCategory && (
                <HygieneCard
                  name={business.name}
                  rating={business.hygieneRating}
                  date={business.hygieneRatingDate}
                  claimed={business.claimed}
                  show={business.hygieneRatingShow}
                />
              )}

              {/* Related listings */}
              {related.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">More {cat.name} in Southport</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/${category}/${r.slug}`}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group border border-gray-100"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition text-sm truncate">{r.name}</p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {r.address.replace(/,?\s*(United Kingdom|UK)$/i, "").split(",").slice(-2).join(",").trim()}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          {r.rating && (
                            <span className="flex items-center gap-0.5 text-xs text-amber-600 font-medium">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {r.rating.toFixed(1)}
                            </span>
                          )}
                          {r.priceRange && <span className="block text-xs text-gray-400">{r.priceRange}</span>}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href={`/${category}`} className="block text-center text-blue-600 text-sm mt-4 hover:underline font-medium">
                    View all {cat.name} →
                  </Link>
                </div>
              )}
            </div>

            {/* ── Sidebar ──────────────────────────────────── */}
            <div className="space-y-4">

              {/* Quick info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
                <h3 className="font-semibold text-gray-900">Quick Info</h3>

                {business.phone && (
                  <InfoRow icon={<Phone className="w-4 h-4 text-blue-500" />} label="Phone">
                    <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="text-gray-800 text-sm hover:text-blue-600">{business.phone}</a>
                  </InfoRow>
                )}

                {business.website && (
                  <InfoRow icon={<Globe className="w-4 h-4 text-blue-500" />} label="Website">
                    <a
                      href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline break-all"
                    >
                      {business.website.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                    </a>
                  </InfoRow>
                )}

                <InfoRow icon={<MapPin className="w-4 h-4 text-blue-500" />} label="Location">
                  <span className="text-gray-800 text-sm">{area}{area !== "Southport" ? ", Southport" : ""}</span>
                </InfoRow>

                {business.priceRange && (
                  <InfoRow icon={<span className="w-4 h-4 text-blue-500 text-sm font-bold leading-none mt-0.5">£</span>} label="Price range">
                    <span className="text-gray-800 text-sm">{business.priceRange}</span>
                  </InfoRow>
                )}

                {business.rating && (
                  <InfoRow icon={<Star className="w-4 h-4 text-amber-400 fill-amber-400" />} label="Google rating">
                    <span className="text-gray-800 text-sm">
                      {business.rating.toFixed(1)}/5
                      {business.reviewCount && <span className="text-gray-500"> ({business.reviewCount.toLocaleString()} reviews)</span>}
                    </span>
                  </InfoRow>
                )}
              </div>

              {/* Hygiene sidebar teaser (food cats only) */}
              {isFoodCategory && (
                <HygieneSidebar
                  rating={business.hygieneRating}
                  date={business.hygieneRatingDate}
                  claimed={business.claimed}
                  show={business.hygieneRatingShow}
                />
              )}

              {/* Claim listing */}
              {!business.claimed && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                  <p className="font-semibold text-blue-900 mb-1">Is this your business?</p>
                  <p className="text-blue-700 text-sm mb-4">Claim your free listing to update details, manage your food hygiene display, and attract more customers.</p>
                  <Link
                    href="/claim-listing"
                    className="block text-center bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition"
                  >
                    Claim Free Listing
                  </Link>
                </div>
              )}

              {/* Upgrade */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Upgrade this listing</p>
                <p className="text-gray-700 text-sm mb-3">Get more visibility with a featured listing from £29/month</p>
                <Link href="/pricing" className="text-blue-600 text-sm font-medium hover:underline">View pricing →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Helper components ────────────────────────────────────────────────────

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}

// Hygiene rating config
const HYGIENE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ReactNode; description: string }> = {
  "5": { label: "5 – Very Good", color: "text-green-700", bg: "bg-green-50", border: "border-green-300", icon: <ShieldCheck className="w-5 h-5 text-green-600" />, description: "Top food hygiene standards" },
  "4": { label: "4 – Good", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: <ShieldCheck className="w-5 h-5 text-green-500" />, description: "Good food hygiene standards" },
  "3": { label: "3 – Generally Satisfactory", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-300", icon: <Shield className="w-5 h-5 text-yellow-500" />, description: "Generally satisfactory hygiene" },
  "2": { label: "2 – Improvement Necessary", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-300", icon: <ShieldAlert className="w-5 h-5 text-orange-500" />, description: "Improvement necessary" },
  "1": { label: "1 – Major Improvement Required", color: "text-red-700", bg: "bg-red-50", border: "border-red-300", icon: <ShieldAlert className="w-5 h-5 text-red-500" />, description: "Major improvement required" },
  "0": { label: "0 – Urgent Improvement Required", color: "text-red-900", bg: "bg-red-100", border: "border-red-400", icon: <ShieldX className="w-5 h-5 text-red-700" />, description: "Urgent improvement required" },
  "AwaitingInspection": { label: "Awaiting Inspection", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-300", icon: <Shield className="w-5 h-5 text-gray-400" />, description: "Not yet inspected" },
  "Exempt": { label: "Exempt", color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200", icon: <Shield className="w-5 h-5 text-gray-400" />, description: "Not required to be rated" },
};

function HygieneBadgeInline({ rating, date: _date, claimed, show }: {
  rating: string | null; date: Date | null; claimed: boolean; show: boolean;
}) {
  if (!claimed) {
    return (
      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full border border-gray-200">
        <Lock className="w-3 h-3" /> Hygiene rating
      </span>
    );
  }
  if (!show || !rating) return null;
  const cfg = HYGIENE_CONFIG[rating];
  if (!cfg) return null;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium", cfg.bg, cfg.color, cfg.border)}>
      {rating === "5" || rating === "4" ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
      FSA {cfg.label}
    </span>
  );
}

function HygieneCard({ name, rating, date, claimed, show }: {
  name: string; rating: string | null; date: Date | null; claimed: boolean; show: boolean;
}) {
  const cfg = rating ? HYGIENE_CONFIG[rating] : null;

  if (!claimed) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
            <Lock className="w-7 h-7 text-gray-400" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900 mb-1">Food Hygiene Rating</h2>
            <p className="text-gray-500 text-sm mb-3">
              The food hygiene rating for <strong>{name}</strong> from the Food Standards Agency is available to verified owners.
              Businesses with a high rating can choose to display it as a trust signal.
            </p>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Lock className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-blue-800 text-sm font-medium">Claim this listing to view and manage your hygiene rating display</span>
            </div>
            <Link href="/claim-listing" className="inline-block mt-3 text-blue-600 text-sm font-medium hover:underline">
              Claim this listing →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!show || !rating || !cfg) return null;

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border p-6", cfg.border)}>
      <h2 className="font-semibold text-gray-900 mb-4">Food Hygiene Rating</h2>
      <div className="flex items-center gap-4">
        <div className={cn("w-20 h-20 rounded-xl flex flex-col items-center justify-center border-2 flex-shrink-0", cfg.bg, cfg.border)}>
          <span className={cn("text-3xl font-black", cfg.color)}>{rating === "AwaitingInspection" || rating === "Exempt" ? "–" : rating}</span>
          <span className={cn("text-xs font-medium", cfg.color)}>/ 5</span>
        </div>
        <div>
          <p className={cn("text-lg font-bold", cfg.color)}>{cfg.label}</p>
          <p className="text-gray-600 text-sm mt-1">{cfg.description} as rated by the Food Standards Agency</p>
          {date && (
            <p className="text-gray-400 text-xs mt-1">
              Last inspected: {new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
          <a
            href="https://ratings.food.gov.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-xs hover:underline mt-2 inline-block"
          >
            food.gov.uk
          </a>
        </div>
      </div>
    </div>
  );
}

function HygieneSidebar({ rating, date, claimed, show }: {
  rating: string | null; date: Date | null; claimed: boolean; show: boolean;
}) {
  if (!claimed) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-4 h-4 text-amber-600" />
          <span className="font-semibold text-amber-900 text-sm">Food Hygiene Rating</span>
        </div>
        <p className="text-amber-800 text-xs mb-3">
          Claim this listing to view your FSA food hygiene rating and choose whether to display it to visitors.
        </p>
        <Link href="/claim-listing" className="block text-center bg-amber-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-amber-600 transition">
          Claim to view rating
        </Link>
      </div>
    );
  }

  if (!show || !rating) return null;

  const cfg = HYGIENE_CONFIG[rating];
  if (!cfg) return null;

  const numRating = parseInt(rating);
  return (
    <div className={cn("rounded-xl border p-4", cfg.bg, cfg.border)}>
      <div className="flex items-center gap-2 mb-1">
        {cfg.icon}
        <span className={cn("font-semibold text-sm", cfg.color)}>Food Hygiene</span>
      </div>
      <p className={cn("font-bold text-lg", cfg.color)}>{cfg.label}</p>
      {date && <p className="text-gray-500 text-xs mt-1">Inspected {new Date(date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</p>}
      {!isNaN(numRating) && (
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={cn("h-2 flex-1 rounded-full", n <= numRating ? (numRating >= 4 ? "bg-green-400" : numRating === 3 ? "bg-yellow-400" : "bg-red-400") : "bg-gray-200")} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Opening Hours ────────────────────────────────────────────────────────

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function OpeningHours({ data }: { data: unknown }) {
  if (!data || typeof data !== "object") return null;
  const hours = data as { weekdayText?: string[]; periods?: Array<{ open: { day: number; time: string }; close?: { day: number; time: string } }> };

  if (hours.weekdayText?.length) {
    const today = new Date().getDay();
    const reordered = [...hours.weekdayText.slice(1), hours.weekdayText[0]];
    const todayIndex = today === 0 ? 6 : today - 1;
    return (
      <ul className="space-y-0.5">
        {reordered.map((line, i) => {
          const colonIdx = line.indexOf(": ");
          const day = line.slice(0, colonIdx);
          const time = line.slice(colonIdx + 2);
          const isToday = i === todayIndex;
          return (
            <li key={day} className={cn("flex justify-between text-sm py-1 px-2 rounded", isToday ? "bg-blue-50 font-semibold text-blue-800" : "text-gray-600")}>
              <span className="w-24 flex-shrink-0">{day}</span>
              <span className="text-right text-xs leading-relaxed">{time}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  if (hours.periods?.length) {
    const fmt = (t: string) => {
      const h = parseInt(t.slice(0, 2)), m = t.slice(2);
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${h12}:${m} ${ampm}`;
    };
    return (
      <ul className="space-y-1">
        {hours.periods.map((p, i) => (
          <li key={i} className="flex justify-between text-sm text-gray-600">
            <span>{DAY_NAMES[p.open.day]}</span>
            <span>{fmt(p.open.time)}{p.close ? ` – ${fmt(p.close.time)}` : " (24h)"}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <p className="text-sm text-gray-400">Hours not available</p>;
}
