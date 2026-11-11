// Schema and metadata (SEO pass, 11 Nov 2026). Static read of the source files, plus
// the meta description helper. Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { metaDescription } from "../lib/meta-description.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (...p) => readFileSync(join(ROOT, ...p), "utf8");
// The source without its whole-line comments (which may name what was removed).
const code = (src) => src.replace(/^\s*\/\/.*$/gm, "");
const LISTING = read("app", "[category]", "[slug]", "page.tsx");
const PARKING = code(read("app", "parking", "[slug]", "page.tsx"));

test("listing and parking JSON-LD hours come from lib/opening-hours.ts, not a local parser", () => {
  for (const [name, src] of [["listing", LISTING], ["parking", PARKING]]) {
    assert.match(src, /from "@\/lib\/opening-hours"/, name);
    assert.match(src, /openingHoursSpecification\(business\.openingHours\)/, name);
    assert.doesNotMatch(src, /times\.split\(" – "\)/, name);
  }
});

test("the hours list starts on Monday as stored, so 'today' is the right row", () => {
  for (const [name, src] of [["listing", LISTING], ["parking", PARKING]]) {
    assert.match(src, /const sundayFirst = \/\^Sunday:\/\.test\(hours\.weekdayText\[0\] \?\? ""\);/, name);
    assert.match(src, /const reordered = sundayFirst \? \[\.\.\.hours\.weekdayText\.slice\(1\), hours\.weekdayText\[0\]\] : \[\.\.\.hours\.weekdayText\];/, name);
  }
});

test("listing meta descriptions skip a short opener or a question from the stored text", () => {
  assert.match(LISTING, /const MIN_META_FROM_DESCRIPTION = 90;/);
  assert.match(LISTING, /if \(result\.length >= MIN_META_FROM_DESCRIPTION\) return result\.slice\(0, 160\);/);
  assert.match(PARKING, /first\.length >= 70 && first\.length <= 130 && !first\.endsWith\("\?"\)/);
});

test("parking JSON-LD carries no rating: the only one shown is Google's", () => {
  const ld = PARKING.slice(PARKING.indexOf("const jsonLd"), PARKING.indexOf("const breadcrumbLd"));
  assert.ok(ld.length > 100);
  assert.doesNotMatch(ld, /aggregateRating:|"@type": "AggregateRating"|review:/);
});

test("listing JSON-LD rating only from the site's own approved reviews, which the page prints", () => {
  const ld = LISTING.slice(LISTING.indexOf("const jsonLd"), LISTING.indexOf("const hoursSpec"));
  assert.match(ld, /siteReviewCount > 0 \? \{\s*aggregateRating/);
  assert.doesNotMatch(ld, /business\.rating/);
});

test("listing JSON-LD url is the business's site only where the page shows it (claimed)", () => {
  assert.match(LISTING, /url: business\.website && business\.claimed \? websiteHref\(business\.website\) : listingUrl\(business\.category\.slug, slug\)/);
  assert.doesNotMatch(LISTING, /\{ url: business\.website \}/);
});

test("a listing shown under a second category is canonical to its own category's page", () => {
  const meta = LISTING.slice(LISTING.indexOf("export async function generateMetadata"), LISTING.indexOf("export default async function"));
  assert.match(meta, /secondaryCategoryIds: \{ has: catRecord\.id \}/);
  assert.match(meta, /const canonicalUrl = listingUrl\(primary, slug\)/);
  // A redirect thrown inside try/catch is swallowed, so it is called after it.
  assert.match(meta, /\}\s*\/\/ Outside the try[^\n]*\n\s*if \(movedTo\) permanentRedirect\(movedTo\);/);
  assert.doesNotMatch(LISTING, /if \(moved\) permanentRedirect/);
});

test("no site-wide canonical or og:url default that points every page at the home page", () => {
  const layout = read("app", "layout.tsx");
  const meta = layout.slice(layout.indexOf("export const metadata"), layout.indexOf("export default function"));
  assert.doesNotMatch(meta, /canonical:/);
  assert.doesNotMatch(meta, /\burl: BASE_URL/);
  assert.match(read("app", "suggest-listing", "layout.tsx"), /canonical: URL/);
});

test("WebSite and Organization are described once, on the home page; no SearchAction to a missing /search", () => {
  const home = code(read("app", "page.tsx"));
  assert.match(home, /"@type": "WebSite"/);
  assert.match(home, /"@type": "Organization"/);
  assert.doesNotMatch(home, /SearchAction|TouristInformationCenter|"LocalBusiness"/);
  const about = code(read("app", "about", "page.tsx"));
  assert.doesNotMatch(about, /"@type": "WebSite"/);
  assert.match(about, /"@type": "AboutPage"/);
});

test("pages that show a breadcrumb trail describe it in a BreadcrumbList", () => {
  for (const p of [
    ["app", "components", "GuideLayout.tsx"],
    ["app", "[category]", "page.tsx"],
    ["app", "property", "page.tsx"],
    ["app", "guides", "roxy-cafe-southport", "page.tsx"],
    ["app", "guides", "seasons-southport", "page.tsx"],
  ]) {
    assert.match(read(...p), /"@type": "BreadcrumbList"/, p.join("/"));
  }
});

test("guide Article JSON-LD takes dateModified from the guide's dateUpdated", () => {
  for (const g of ["accessible-southport", "autism-friendly-southport", "getting-to-southport", "southport-market", "southportguide-sunflower-member", "the-open-2026-accessibility", "woodvale-community-centre"]) {
    const src = read("app", "guides", g, "page.tsx");
    assert.match(src, /dateModified: GUIDE\.dateUpdated,/, g);
    assert.match(src, /image: /, g);
  }
});

test("'More in' links the posts nearest in date, and no post links to a missing kids guide", () => {
  const post = read("app", "blog", "[slug]", "page.tsx");
  assert.match(post, /\.sort\(\(a, b\) => a\.gap - b\.gap \|\| a\.i - b\.i\)/);
  const content = read("lib", "blog-content.ts");
  assert.doesNotMatch(content, /href: "\/southport-with-kids"|href: "\/guides\/southport-with-kids"/);
  assert.match(content, /"southport-with-kids-full-guide": \[/);
});

test("thin pages carry one robots tag from their metadata, not a second one in the body", () => {
  const collection = read("app", "collections", "[slug]", "page.tsx");
  assert.doesNotMatch(collection, /<meta name="robots"/);
  assert.match(collection, /robots: \{ index: false, follow: true \}/);
  assert.match(read("app", "[category]", "page.tsx"), /robots: \{ index: false, follow: true \}/);
  assert.match(read("app", "news", "page.tsx"), /robots: \{ index: false, follow: true \}/);
});

test("meta description: whole sentences up to 160 characters, else the copy as it is", () => {
  const short = "Hotels near Royal Birkdale, every one listed by walking distance.";
  assert.equal(metaDescription(short), short);
  // Cut after a whole sentence that fits.
  assert.equal(
    metaDescription("Southport Pier has been closed since December 2022, and a £20m restoration was approved in March 2026 by the Department for Business and Trade. Here is what is open nearby instead, from the Marine Lake to the beach."),
    "Southport Pier has been closed since December 2022, and a £20m restoration was approved in March 2026 by the Department for Business and Trade.",
  );
  // Prices and decimals are not sentence ends.
  assert.equal(
    metaDescription("Coffee from £3.95 and cake for £7.50, with 4.6 stars from 1,200 Google reviewers and a table by the window on most weekday mornings when it is quiet. The owner opened it in 2025 after eight years at a restaurant."),
    "Coffee from £3.95 and cake for £7.50, with 4.6 stars from 1,200 Google reviewers and a table by the window on most weekday mornings when it is quiet.",
  );
  // Whole sentences would leave it under 120 characters: the copy is kept whole.
  const choppy = "Royal Birkdale, 12 to 19 July. Eight weeks out and the town is almost fully booked. Here is the picture of what accommodation, restaurants and transport options are still available, and what to do.";
  assert.equal(metaDescription(choppy), choppy);
  assert.doesNotMatch(read("app", "blog", "[slug]", "page.tsx"), /description: post\.excerpt,\n\s*alternates/);
});
