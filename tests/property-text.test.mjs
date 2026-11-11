// Property pages show no em dash from the database text (lib/property-text.ts,
// app/property/[slug]/page.tsx). The patterns are the stored ones (read 11 Nov 2026):
// every title, the shared unit FAQ answer, sector descriptions and FAQ answers.
// Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { faqWithoutEmDash, withoutEmDash } from "../lib/property-text.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ED = "—";

test("one dash becomes a colon", () => {
  assert.equal(withoutEmDash(`House Prices in PR8 1AF ${ED} Blowick, Southport`), "House Prices in PR8 1AF: Blowick, Southport");
  assert.equal(withoutEmDash(`House Prices in PR8 4 ${ED} Southport Town Centre`), "House Prices in PR8 4: Southport Town Centre");
  assert.equal(withoutEmDash(`Yes ${ED} consistently popular`), "Yes: consistently popular");
  assert.equal(withoutEmDash(`gives you the key facts ${ED} average price, recent sales`), "gives you the key facts: average price, recent sales");
});

test("a pair of dashes (an aside) becomes commas", () => {
  assert.equal(withoutEmDash(`The road ${ED} busy at weekends ${ED} has shops`), "The road, busy at weekends, has shops");
});

test("text without a dash, and empty values, are unchanged", () => {
  assert.equal(withoutEmDash("House Prices in PR8 1AF: Blowick, Southport"), "House Prices in PR8 1AF: Blowick, Southport");
  assert.equal(withoutEmDash(null), null);
  assert.equal(withoutEmDash(undefined), undefined);
  assert.equal(withoutEmDash(""), "");
});

test("FAQ questions and answers are both cleaned, other fields kept", () => {
  const [f] = faqWithoutEmDash([{ question: `Is it busy ${ED} really?`, answer: `Yes ${ED} at weekends`, extra: 1 }]);
  assert.deepEqual(f, { question: "Is it busy: really?", answer: "Yes: at weekends", extra: 1 });
});

test("the property page runs every title, description and FAQ through the helper", () => {
  const page = readFileSync(join(ROOT, "app", "property", "[slug]", "page.tsx"), "utf8");
  assert.equal((page.match(/const title = withoutEmDash\(/g) || []).length, 1, "the sector title");
  assert.equal((page.match(/const desc = withoutEmDash\(/g) || []).length, 1, "the sector description");
  assert.match(page, /= unitMeta\(unit, areaLabel\)/, "the unit title and description (unitMeta runs withoutEmDash)");
  assert.match(page, /const faqItems = faqWithoutEmDash\(/);
  assert.match(page, /const faqArray = faqWithoutEmDash\(/);
  assert.ok(!readFileSync(join(ROOT, "lib", "property-text.ts"), "utf8").includes(ED), "no literal dash in the helper");
});

// Postcode pages in the sitemap (11 Nov 2026, late): every indexable one, less near-duplicates.
import { PROPERTY_TEXT_CHANGED, distinctUnitPages, unitMeta } from "../lib/property-text.ts";

test("unitMeta builds the page's title and description, stored text first", () => {
  assert.deepEqual(unitMeta({ postcode: "PR8 6HS", avgPrice3yr: 278000 }, "Blowick"), {
    title: "House Prices in PR8 6HS: Blowick, Southport",
    description: "Average house price in PR8 6HS is £278k. See recent sales and local data.",
  });
  assert.deepEqual(unitMeta({ postcode: "PR8 1AF", metaTitle: `House Prices in PR8 1AF ${ED} Blowick, Southport`, metaDescription: "PR8 1AF in Blowick. £263k average from 3 sales." }, "Blowick"), {
    title: "House Prices in PR8 1AF: Blowick, Southport",
    description: "PR8 1AF in Blowick. £263k average from 3 sales.",
  });
});

test("pages the same as another apart from the postcode are left out, the whole group", () => {
  const p = (postcode, price) => ({ postcode, title: `House Prices in ${postcode}: Blowick, Southport`, description: `${postcode} in Blowick, Southport. £${price}k average from 3 sales. Data for ${postcode.replace(" ", "")}.` });
  const { kept, left } = distinctUnitPages([p("PR8 6AA", 263), p("PR8 6AB", 263), p("PR8 6AC", 192), p("PR9 0AA", 263)]);
  assert.deepEqual(left.map((x) => x.postcode), ["PR8 6AA", "PR8 6AB", "PR9 0AA"]);
  assert.deepEqual(kept.map((x) => x.postcode), ["PR8 6AC"]);
});

test("the sitemap lists postcode pages with the page's own rule and real dates", () => {
  const sitemap = readFileSync(join(ROOT, "app", "sitemap.ts"), "utf8");
  assert.match(sitemap, /prisma\.postcodeUnit\.findMany\(\{\s*where: \{ published: true \}/);
  assert.match(sitemap, /\.filter\(\(u\) => !!u\.editorialContent\)/, "indexable only: the page is noindex without a summary");
  assert.match(sitemap, /distinctUnitPages\(/);
  assert.match(sitemap, /unitMeta\(u, /);
  assert.equal((sitemap.match(/\.\.\.lastmod\(later\((s|u)\.updatedAt, textChanged\)\)/g) || []).length, 2, "sector and unit dates");
  assert.equal(PROPERTY_TEXT_CHANGED, "2026-11-11");
  const page = readFileSync(join(ROOT, "app", "property", "[slug]", "page.tsx"), "utf8");
  assert.match(page, /const \{ title, description: desc \} = unitMeta\(unit, areaLabel\);/, "the page and the sitemap share one title rule");
  assert.match(page, /robots: hasContent \? undefined : \{ index: false, follow: true \}/, "pages without a summary stay noindex");
});

test("the accessibility title names the brand once (the layout adds it)", () => {
  const a = readFileSync(join(ROOT, "app", "accessibility", "page.tsx"), "utf8");
  assert.match(a, /title: "Accessibility Statement",/);
  assert.match(readFileSync(join(ROOT, "app", "layout.tsx"), "utf8"), /template: "%s \| SouthportGuide\.co\.uk"/);
});
