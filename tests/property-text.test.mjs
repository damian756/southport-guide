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
  assert.equal((page.match(/const title = withoutEmDash\(/g) || []).length, 2, "sector and unit titles");
  assert.equal((page.match(/const desc = withoutEmDash\(/g) || []).length, 2, "sector and unit descriptions");
  assert.match(page, /const faqItems = faqWithoutEmDash\(/);
  assert.match(page, /const faqArray = faqWithoutEmDash\(/);
  assert.ok(!readFileSync(join(ROOT, "lib", "property-text.ts"), "utf8").includes(ED), "no literal dash in the helper");
});
