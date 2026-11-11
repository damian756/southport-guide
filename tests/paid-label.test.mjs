// "Paid placement" only when someone pays (recheck must-fix 2, 11 Nov 2026). The seeded
// demo listing is on hubTier "pro" with no subscription, and was shown as
// "Featured · Paid placement". A listing counts as Pro only with a subscription
// behind it (the Stripe webhook sets both together), and the subscription id never
// reaches a client component. Static read (app/[category]/page.tsx,
// app/[category]/[slug]/page.tsx, components/). Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const CASE = /CASE WHEN "hubTier" = 'pro' AND "stripeSubscriptionId" IS NOT NULL THEN 'pro' ELSE 'free' END AS "hubTier"/g;

test("the category page reports Pro only with a subscription, in every sort", () => {
  const page = read("app/[category]/page.tsx");
  const selects = page.match(/SELECT[\s\S]*?FROM "Business"/g) || [];
  const browser = selects.filter((s) => /AS "firstImage"/.test(s));
  assert.equal(browser.length, 4, "four sort orders");
  for (const s of browser) {
    assert.equal((s.match(CASE) || []).length, 1, "hubTier is derived from the subscription");
    assert.doesNotMatch(s.replace(CASE, ""), /"hubTier"|"stripeSubscriptionId"/, "neither column is selected raw");
  }
});

test("the listing page labels Paid placement only with a subscription", () => {
  const page = read("app/[category]/[slug]/page.tsx");
  const uses = [...page.matchAll(/\{(.*)&& \(\s*<span[^>]*>\{PRO_BADGE\}/g)].map((m) => m[1]);
  assert.equal(uses.length, 1, "one Paid placement badge");
  assert.match(uses[0], /business\.hubTier === "pro" && !!business\.stripeSubscriptionId/);
});

test("no client component is given a subscription id", () => {
  const out = [];
  const walk = (d) => {
    for (const n of readdirSync(join(ROOT, d))) {
      const p = join(d, n);
      if (statSync(join(ROOT, p)).isDirectory()) walk(p);
      else if (/\.tsx?$/.test(n)) out.push(p);
    }
  };
  if (existsSync(join(ROOT, "components"))) walk("components");
  const hits = out.filter((f) => /stripeSubscriptionId/.test(read(f)));
  assert.deepEqual(hits, []);
  const listing = read("app/[category]/[slug]/page.tsx");
  assert.doesNotMatch(listing, /=\{business\}|\{\.\.\.business\b/, "the listing object is never spread into a component");
});
