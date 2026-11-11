import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getAreaLabelForSector, postcodeToSlug, sectorToSlug } from "@/lib/property-config";
import { PROPERTY_TEXT_CHANGED, distinctUnitPages, unitMeta } from "@/lib/property-text";
import { CATEGORIES } from "@/lib/config";
import { BLOG_POSTS } from "@/lib/southport-data";
import { GUIDES } from "@/lib/guides-config";
import { COLLECTIONS, MIN_LISTINGS, collectionWhere } from "@/lib/collections-config";
import { utcDate, later, postLastmod, lastmod } from "@/lib/sitemap-dates";

const BASE = "https://www.southportguide.co.uk";

// Rebuilt at most hourly, so listing changes show without a deploy (otherwise the
// sitemap is fixed at build time).
export const revalidate = 3600;

// lastmod is the day the page's content last changed, never the build date.
//
// Fixed pages: the date of the last commit that changed the page's words (git log on
// the page's files). Change the date here when you change the page's words.
const PAGE_UPDATED: Record<string, string> = {
  "/":                             "2026-11-11",
  "/events":                       "2026-11-11",
  "/blog":                         "2026-11-11",
  "/things-to-do":                 "2026-11-11",
  "/attractions/another-place-crosby": "2026-03-31",
  "/the-open-2026":                "2026-11-11",
  "/mlec":                         "2026-11-11",
  "/advertise":                    "2026-11-11",
  "/pricing":                      "2026-11-11",
  "/the-open-2026/accommodation":  "2026-11-11",
  "/the-open-2026/restaurants":    "2026-11-11",
  "/the-open-2026/getting-there":  "2026-11-11",
  "/the-open-2026/pubs":           "2026-11-11",
  "/the-open-2026/things-to-do":   "2026-11-11",
  "/mlec/accommodation":           "2026-11-11",
  "/mlec/restaurants":             "2026-11-11",
  "/mlec/getting-there":           "2026-11-11",
  "/guides":                       "2026-11-11",
  "/about":                        "2026-11-11",
  "/contact":                      "2026-11-11",
  "/accessibility":                "2026-11-11",
  "/suggest-listing":              "2026-11-11",
  "/privacy":                      "2026-11-11",
  "/terms":                        "2026-11-11",
  "/disclosure":                   "2026-11-11",
  "/collections":                  "2026-11-11",
  "/property":                     "2026-11-11",
};
// The words on the category pages (app/[category]/page.tsx) and the collection pages
// (lib/collections-config.ts) last changed on these dates. Their listings change too,
// so each takes the later of this and its newest listing's updatedAt.
const CATEGORY_COPY_UPDATED = "2026-11-11";
const COLLECTION_COPY_UPDATED = "2026-11-11";

const page = (path: string) => utcDate(PAGE_UPDATED[path]);

// Listing URLs that next.config.ts redirects elsewhere stay out of the sitemap (keep
// this list in step with the redirects there).
const REDIRECTED_LISTINGS = new Set([
  "/hotels/another-place",
  "/parking/parking-ainsdale",
  "/parking/parking-southport",
  "/parking/parking-nhs-parking",
  "/parking/parking-driving-test-candidates",
  "/parking/parking-staff-car-park-southport-hospital",
  "/parking/parking-smedley-hydro-staff-car-park-entrance",
  "/parking/parking-uk-parking-control-ltd-on-behalf-of-mwlth-nhs-trust-parking",
  "/parking/parking-drop-off-pick-up",
  "/parking/parking-freshfield-station-car-park",
  "/parking/parking-bushby-s-park",
  "/parking/parking-formby",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Blog posts ───────────────────────────────────────────────
  // Posts that point to a guide as their canonical are left out (the guide is in).
  const posts = BLOG_POSTS.filter((post) => !post.canonicalUrl);
  const newestPost = later(...posts.map(postLastmod));
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    ...lastmod(postLastmod(post)),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // ── Listings ─────────────────────────────────────────────────
  let businesses: { slug: string; updatedAt: Date; category: { slug: string } }[] = [];
  try {
    businesses = await prisma.business.findMany({
      select: { slug: true, updatedAt: true, category: { select: { slug: true } } },
      orderBy: { updatedAt: "desc" },
    });
  } catch {
    // DB unavailable: no listings
  }
  const businessPages: MetadataRoute.Sitemap = businesses
    .filter((b) => !REDIRECTED_LISTINGS.has(`/${b.category.slug}/${b.slug}`))
    .map((b) => ({
      url: `${BASE}/${b.category.slug}/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    }));

  // ── Category pages ───────────────────────────────────────────
  // A category with no listings shows "No listings yet" and is noindex
  // (app/[category]/page.tsx), so it is left out until it has some.
  const categoryCounts = new Map<string, number>();
  try {
    const cats = await prisma.category.findMany({ select: { id: true, slug: true } });
    for (const c of cats) {
      categoryCounts.set(c.slug, await prisma.business.count({
        where: { OR: [{ categoryId: c.id }, { secondaryCategoryIds: { has: c.id } }] },
      }));
    }
  } catch {
    // DB unavailable: keep every category
  }
  const dbUp = categoryCounts.size > 0;
  const newestInCategory = (slug: string) =>
    later(...businesses.filter((b) => b.category.slug === slug).map((b) => b.updatedAt));
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES
    .filter((c) => !dbUp || (categoryCounts.get(c.slug) ?? 0) > 0)
    .map((c) => ({
      url: `${BASE}/${c.slug}`,
      ...lastmod(later(utcDate(CATEGORY_COPY_UPDATED), newestInCategory(c.slug))),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

  // ── News ─────────────────────────────────────────────────────
  // /news is noindex while no item is published (app/news/page.tsx).
  let newsNewest: Date | null = null;
  let newsCount = -1;
  try {
    const where = { status: { in: ["auto_published", "published"] } };
    newsCount = await prisma.newsItem.count({ where });
    const n = await prisma.newsItem.findFirst({ where, orderBy: { createdAt: "desc" }, select: { publishedAt: true, createdAt: true } });
    newsNewest = n ? n.publishedAt ?? n.createdAt : null;
  } catch {
    // DB unavailable
  }

  // ── Static / editorial pages ─────────────────────────────────
  // /claim-listing is not here: robots.txt disallows it.
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                           ...lastmod(later(page("/"), newestPost)),     changeFrequency: "weekly",   priority: 1.0 },
    { url: `${BASE}/events`,               ...lastmod(page("/events")),                 changeFrequency: "daily",    priority: 0.9 },
    { url: `${BASE}/blog`,                 ...lastmod(later(page("/blog"), newestPost)), changeFrequency: "weekly",   priority: 0.9 },
    { url: `${BASE}/things-to-do`,         ...lastmod(page("/things-to-do")),           changeFrequency: "monthly",  priority: 0.95 },
    { url: `${BASE}/attractions/another-place-crosby`, ...lastmod(page("/attractions/another-place-crosby")), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/the-open-2026`,        ...lastmod(page("/the-open-2026")),          changeFrequency: "weekly",   priority: 0.95 },
    { url: `${BASE}/mlec`,                 ...lastmod(page("/mlec")),                   changeFrequency: "weekly",   priority: 0.9  },
    { url: `${BASE}/advertise`,            ...lastmod(page("/advertise")),              changeFrequency: "monthly",  priority: 0.75 },
    { url: `${BASE}/pricing`,              ...lastmod(page("/pricing")),                changeFrequency: "monthly",  priority: 0.75 },
    { url: `${BASE}/the-open-2026/accommodation`, ...lastmod(page("/the-open-2026/accommodation")), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/the-open-2026/restaurants`,   ...lastmod(page("/the-open-2026/restaurants")),   changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/the-open-2026/getting-there`, ...lastmod(page("/the-open-2026/getting-there")), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/the-open-2026/pubs`,          ...lastmod(page("/the-open-2026/pubs")),          changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/the-open-2026/things-to-do`,  ...lastmod(page("/the-open-2026/things-to-do")),  changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/mlec/accommodation`,   ...lastmod(page("/mlec/accommodation")),     changeFrequency: "monthly",  priority: 0.7  },
    { url: `${BASE}/mlec/restaurants`,     ...lastmod(page("/mlec/restaurants")),       changeFrequency: "monthly",  priority: 0.7  },
    { url: `${BASE}/mlec/getting-there`,   ...lastmod(page("/mlec/getting-there")),     changeFrequency: "monthly",  priority: 0.6  },
    { url: `${BASE}/guides`,               ...lastmod(page("/guides")),                 changeFrequency: "monthly",  priority: 0.90 },
    { url: `${BASE}/about`,                ...lastmod(page("/about")),                  changeFrequency: "monthly",  priority: 0.5  },
    { url: `${BASE}/contact`,              ...lastmod(page("/contact")),                changeFrequency: "monthly",  priority: 0.5  },
    ...(newsCount === 0 ? [] : [
      { url: `${BASE}/news`,               ...lastmod(newsNewest),                      changeFrequency: "weekly" as const, priority: 0.8 },
    ]),
    { url: `${BASE}/accessibility`,        ...lastmod(page("/accessibility")),          changeFrequency: "yearly",   priority: 0.4  },
    { url: `${BASE}/suggest-listing`,      ...lastmod(page("/suggest-listing")),        changeFrequency: "yearly",   priority: 0.5  },
    { url: `${BASE}/disclosure`,           ...lastmod(page("/disclosure")),             changeFrequency: "yearly",   priority: 0.3  },
    { url: `${BASE}/privacy`,              ...lastmod(page("/privacy")),                changeFrequency: "yearly",   priority: 0.2  },
    { url: `${BASE}/terms`,                ...lastmod(page("/terms")),                  changeFrequency: "yearly",   priority: 0.2  },
  ];

  // ── Guide pages (generated from config) ─────────────────────
  const guidePages: MetadataRoute.Sitemap = GUIDES.filter((g) => g.status === "published").map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    ...lastmod(utcDate(g.dateUpdated)),
    changeFrequency: (g.tags.includes("events") ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: g.seoPriority,
  }));

  // ── Collection pages ─────────────────────────────────────────
  // Same rule as the page's robots tag: under MIN_LISTINGS places it is noindex,
  // so it is left out.
  const collectionPages: MetadataRoute.Sitemap = [];
  for (const c of COLLECTIONS) {
    let count = MIN_LISTINGS;
    let newest: Date | null = null;
    try {
      count = await prisma.business.count({ where: collectionWhere(c) });
      newest = (await prisma.business.findFirst({
        where: collectionWhere(c), orderBy: { updatedAt: "desc" }, select: { updatedAt: true },
      }))?.updatedAt ?? null;
    } catch {
      // DB unavailable: keep it, with the copy date
    }
    if (count < MIN_LISTINGS) continue;
    collectionPages.push({
      url: `${BASE}/collections/${c.slug}`,
      ...lastmod(later(utcDate(COLLECTION_COPY_UPDATED), newest)),
      changeFrequency: "monthly" as const,
      priority: c.priority,
    });
  }
  const collectionIndexPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/collections`, ...lastmod(page("/collections")), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  // ── Property pages ───────────────────────────────────────────
  let propertyPages: MetadataRoute.Sitemap = [];
  try {
    const sectors = await prisma.postcodeSector.findMany({
      where: { published: true },
      select: { sector: true, updatedAt: true },
    });
    // Postcode unit pages (/property/pr84aa etc.): every indexable one (published, with
    // an editorial summary, as the page's own robots rule decides) is listed, because
    // pages that can rank stay listed (Damian, 11 Nov 2026). Before, they were left out
    // after Google crawled 139 and indexed none. Near-duplicates (title and description
    // the same as another page's apart from the postcode) stay out.
    const allSectors = new Set((await prisma.postcodeSector.findMany({ select: { sector: true } })).map((s) => s.sector));
    const units = await prisma.postcodeUnit.findMany({
      where: { published: true },
      select: { postcode: true, sector: true, editorialContent: true, metaTitle: true, metaDescription: true, avgPrice3yr: true, updatedAt: true },
    });
    const { kept } = distinctUnitPages(
      units
        .filter((u) => !!u.editorialContent)
        .map((u) => ({ ...u, ...unitMeta(u, allSectors.has(u.sector) ? getAreaLabelForSector(u.sector) : u.sector) })),
    );
    // Property text changed on every page on PROPERTY_TEXT_CHANGED, so lastmod is the later of that and the row's own change.
    const textChanged = utcDate(PROPERTY_TEXT_CHANGED);
    propertyPages = [
      { url: `${BASE}/property`, ...lastmod(later(page("/property"), ...sectors.map((s) => s.updatedAt))), changeFrequency: "weekly" as const, priority: 0.85 },
      ...sectors.map((s) => ({
        url: `${BASE}/property/${sectorToSlug(s.sector)}`,
        ...lastmod(later(s.updatedAt, textChanged)),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...kept.map((u) => ({
        url: `${BASE}/property/${postcodeToSlug(u.postcode)}`,
        ...lastmod(later(u.updatedAt, textChanged)),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ];
  } catch {
    // DB unavailable at build time
  }

  return [...staticPages, ...guidePages, ...categoryPages, ...blogPages, ...businessPages, ...collectionIndexPage, ...collectionPages, ...propertyPages];
}
