// The claim search forgives the way owners type their business name
// (lib/claim-search.ts; app/api/hub/claim/search). Cases from the sign-up
// check, 11 Nov 2026: each found 0 results with the old plain substring match.
// Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { nameMatches, rankByMatch, searchTokens } from "../lib/claim-search.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const finds = (query, name) => nameMatches(name, searchTokens(query));

test('"The Scarisbrick Hotel" finds "Scarisbrick Hotel" (a leading "The" is ignored)', () => {
  assert.ok(finds("The Scarisbrick Hotel", "Scarisbrick Hotel"));
  assert.ok(finds("the scarisbrick", "Scarisbrick Hotel"));
  assert.ok(finds("Scarisbrick Hotel", "The Scarisbrick Hotel"));
});

test('"fish and chips" finds the "fish & chips" listings, and the other way round', () => {
  assert.ok(finds("fish and chips", "Funky Fish & Chips"));
  assert.ok(finds("fish & chips", "Ainsdale Fish and Chips"));
  assert.ok(finds("Fish&Chips", "Mr Fish & Chips"));
});

test('"Silcocks" finds "Silcock\'s" (apostrophes and punctuation ignored)', () => {
  assert.ok(finds("Silcocks", "Silcock's Funland"));
  assert.ok(finds("silcock's", "Silcock's Funland"));
  assert.ok(finds("Bill Rimmers", "Bill Rimmer's Garage"));
});

test("partial names and any word order match; unrelated names do not", () => {
  assert.ok(finds("scaris", "Scarisbrick Hotel"));
  assert.ok(finds("hotel scarisbrick", "Scarisbrick Hotel"));
  assert.equal(finds("Vincent", "Scarisbrick Hotel"), false);
  assert.deepEqual(searchTokens("The"), [], "a query of only 'the' searches nothing");
});

test('with an extra word ("Scarisbrick Hotel Southport"), the closest names still come first', () => {
  const tokens = searchTokens("Scarisbrick Hotel Southport");
  const rows = [{ name: "Southport Pier" }, { name: "Scarisbrick Hotel" }, { name: "Scarisbrick Avenue Dental" }, { name: "Pier Café" }];
  const ranked = rankByMatch(rows, tokens).map((r) => r.name);
  assert.equal(ranked[0], "Scarisbrick Hotel");
  assert.ok(!ranked.includes("Pier Café"), "names with no word are dropped");
});

test("the route uses the forgiving match, and the form offers 'Can't see it? Tell us', not a new listing", () => {
  const route = read("app/api/hub/claim/search/route.ts");
  assert.match(route, /searchTokens\(/);
  assert.match(route, /rankByMatch\(/);
  assert.match(route, /AND: tokens\.map\(word\)/);
  const form = read("app/claim-listing/ClaimListingClient.tsx");
  assert.match(form, /Can&apos;t see it\? Tell us/);
  assert.doesNotMatch(form, /Not on the guide yet\?/);
  assert.doesNotMatch(form, /Suggest it →/);
});
