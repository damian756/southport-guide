// Paid placement on category pages: active boosts first (unchanged), then Pro
// listings (hubTier "pro") in their primary category, each labelled as paid.
// The admin-set listingTier is not paid for: it neither sorts nor labels.
// A lapsed or cancelled Pro (hubTier back to "free") loses both.
// Pure functions from lib/listing-order.ts plus static reads.
// Run: npm run test:enquiry   (node --test tests/*.test.mjs)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { BOOST_BADGE, PRO_BADGE, isPaidFeatured, orderListings, paidBadge } from "../lib/listing-order.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const CAT = "cat-bars";

const list = [
  { id: "a", name: "A, high rating", hubTier: "free", categoryId: CAT, listingTier: "featured" },
  { id: "b", name: "B", hubTier: "free", categoryId: CAT, listingTier: "free" },
  { id: "pro", name: "Pro place", hubTier: "pro", categoryId: CAT, listingTier: "free" },
  { id: "pro2", name: "Pro elsewhere", hubTier: "pro", categoryId: "cat-food", listingTier: "free" },
  { id: "boost", name: "Boosted", hubTier: "free", categoryId: CAT, listingTier: "free" },
];

test("boosts first, then Pro in its own category, then the rest in their order", () => {
  const ids = orderListings(list, { categoryId: CAT, boostedIds: ["boost"] }).map((b) => b.id);
  assert.deepEqual(ids, ["boost", "pro", "a", "b", "pro2"]);
});

test("Pro sorts above standard listings even with no boosts; the unpaid 'featured' tier does not", () => {
  const ids = orderListings(list, { categoryId: CAT, boostedIds: [] }).map((b) => b.id);
  assert.equal(ids[0], "pro");
  assert.deepEqual(ids.slice(1), ["a", "b", "pro2", "boost"]);
});

test("Pro carries a paid badge; boosts keep theirs; unpaid listings have none", () => {
  const opts = { categoryId: CAT, boostedIds: ["boost"] };
  assert.equal(PRO_BADGE, "Featured · Paid placement");
  assert.equal(paidBadge(list[2], opts), PRO_BADGE);
  assert.equal(paidBadge(list[4], opts), BOOST_BADGE);
  assert.equal(paidBadge(list[0], opts), null, "listingTier 'featured' is not paid");
  assert.equal(paidBadge(list[3], opts), null, "Pro is featured only in its primary category");
});

test("a lapsed or cancelled Pro (hubTier not 'pro') loses both the order and the badge", () => {
  for (const hubTier of ["free", "cancelled", null, undefined]) {
    const lapsed = { ...list[2], hubTier };
    const ids = orderListings([list[0], lapsed], { categoryId: CAT, boostedIds: [] }).map((b) => b.id);
    assert.deepEqual(ids, ["a", "pro"], `hubTier ${hubTier}`);
    assert.equal(isPaidFeatured(lapsed, CAT), false);
    assert.equal(paidBadge(lapsed, { categoryId: CAT, boostedIds: [] }), null);
  }
});

test("the pages use the paid order and labels, not listingTier", () => {
  const page = read("app/[category]/page.tsx");
  assert.doesNotMatch(page, /CASE "listingTier"/);
  assert.match(page, /orderListings\(businesses, \{ categoryId: catId, boostedIds \}\)/);
  assert.match(page, /"hubTier", "categoryId"/);
  const browser = read("components/CategoryBrowser.tsx");
  assert.doesNotMatch(browser, /Editor&apos;s Pick|Editor's Pick/);
  assert.doesNotMatch(browser, /listingTier === "(featured|premium)"/);
  assert.match(browser, /"Featured · Paid placement"/);
  const listing = read("app/[category]/[slug]/page.tsx");
  assert.match(listing, /business\.hubTier === "pro" && \(/);
  assert.doesNotMatch(listing, /✦ FEATURED/);
  assert.doesNotMatch(read("app/collections/[slug]/page.tsx"), /tierOrder|listingTier === "premium"/);
  for (const p of ["app/the-open-2026/accommodation/page.tsx", "app/the-open-2026/pubs/page.tsx", "app/the-open-2026/restaurants/page.tsx"]) {
    assert.doesNotMatch(read(p), /orderBy: \[\{ listingTier/, p);
  }
  assert.match(read("app/components/GuideLayout.tsx"), /hubTier: \{ not: "pro" \}/);
});
