// One reply time for claims and listing enquiries, worded so it can be kept
// (Damian, 11 Nov 2026): "We reply within one working day." Fails if any of
// these files promises another figure. Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");

// Where the site promises a time for a claim or an enquiry about a listing.
const FILES = [
  "app/claim-listing/ClaimListingClient.tsx", // claim page
  "app/api/hub/claim/submit/route.ts", //        claim confirmation email
  "app/contact/ContactClient.tsx", //            contact page (claims, listings, advertising)
  "lib/enquiry-email.ts", //                     contact auto-reply
  "app/dashboard/(hub)/layout.tsx", //           hub page for a just-claimed listing
  "app/advertise/page.tsx", //                   advertising enquiries
];
const OTHER_FIGURE = /24 hours|48 hours|business days?|1[–-]2 (working|business)|one or two (working|business)|two working days(?! of)|within [0-9]+ (working )?days|up to [0-9]+ (hours|days)/i;
// The advertise page's "goes live within two working days" is about an advert
// going live after payment, not a reply time, so it is allowed there.
const ALLOWED = [/Your advert goes live within two working days\./];

test("each file says 'within one working day'", () => {
  for (const f of FILES) assert.match(read(f), /within one working day/i, f);
  assert.match(read("app/claim-listing/ClaimListingClient.tsx"), /We reply within one working day\./);
  assert.match(read("app/api/hub/claim/submit/route.ts"), /We reply within one working day\./);
  assert.match(read("app/advertise/page.tsx"), /We reply to advertising enquiries within one working day\./);
});

test("no file promises another reply time", () => {
  const hits = [];
  for (const f of FILES) {
    let src = read(f);
    for (const re of ALLOWED) src = src.replace(re, "");
    src.split("\n").forEach((line, i) => {
      if (OTHER_FIGURE.test(line)) hits.push(`${f}:${i + 1}: ${line.trim().slice(0, 100)}`);
    });
  }
  assert.deepEqual(hits, []);
});
