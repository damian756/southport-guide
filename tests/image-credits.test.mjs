// The Southport Agricultural Show's logo is shown whole, with its credit, wherever a
// listing image appears: the listing page hero and the category cards
// (lib/image-credits.ts, app/[category]/[slug]/page.tsx, components/CategoryBrowser.tsx).
// Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { imageCreditFor, listingImageAlt } from "../lib/image-credits.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const LOGO = "/images/agshow/southport-agricultural-show-logo-card.webp";

test("the Show's images carry the Show's credit and count as a logo", () => {
  const info = imageCreditFor(LOGO);
  assert.ok(info);
  assert.equal(info.credit, "Image: Southport Agricultural Show");
  assert.equal(info.isLogo, true);
  assert.equal(listingImageAlt("Southport Agricultural Show", LOGO), "Southport Agricultural Show logo");
});

test("other listing images are unchanged: no credit, alt is the name", () => {
  for (const src of ["/images/businesses/a-cafe.webp", "https://example.com/x.jpg", "", null, undefined]) {
    assert.equal(imageCreditFor(src), null);
  }
  assert.equal(listingImageAlt("A Cafe", "/images/businesses/a-cafe.webp"), "A Cafe");
});

test("the listing hero contains a credited logo and prints the credit", () => {
  const page = read("app/[category]/[slug]/page.tsx");
  assert.match(page, /imageCreditFor\(heroImage\)/);
  assert.match(page, /heroCredit\?\.isLogo/);
  assert.match(page, /object-contain/);
  assert.match(page, /\{heroCredit\.credit\}/);
});

test("both category card styles contain a credited logo", () => {
  const src = read("components/CategoryBrowser.tsx");
  assert.equal((src.match(/<LogoImage /g) || []).length, 2);
  assert.match(src, /object-contain/);
  assert.match(src, /\{info\.credit\}/);
});

test("no em dash in the credit or alt text", () => {
  assert.ok(!read("lib/image-credits.ts").includes("—"));
});
