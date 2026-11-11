// The review form (components/ReviewForm.tsx) posts to /api/reviews, which
// stores a pending review and emails a verification link to the address typed
// in. Against misuse: a hidden honeypot field (filled = reply ok, store nothing,
// send nothing) and 100-character caps on the short fields. Static reads plus
// the pure helpers in lib/enquiry-email.ts: no route is called, nothing is sent.
// Run: npm run test:enquiry   (node --test tests/*.test.mjs)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { HONEYPOT_FIELD, MAX_SHORT, firstTooLong, isHoneypotFilled } from "../lib/enquiry-email.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const ROUTE = read("app/api/reviews/route.ts");
const FORM = read("components/ReviewForm.tsx");

const LIMITS = { firstName: MAX_SHORT, lastName: MAX_SHORT, displayName: MAX_SHORT, email: MAX_SHORT, title: MAX_SHORT };

test("the route checks the honeypot before it reads the database, stores, uploads or sends", () => {
  const hp = ROUTE.indexOf("if (isHoneypotFilled(fields))");
  assert.ok(hp > 0, "honeypot check present");
  for (const later of ["prisma.business.findUnique(", "prisma.review.create(", "put(`reviews/", "resend.emails.send("]) {
    const at = ROUTE.indexOf(later);
    assert.ok(at > hp, `${later} comes after the honeypot check`);
  }
  // A filled honeypot gets a plain ok reply, with no review id.
  const branch = ROUTE.slice(hp, ROUTE.indexOf("});", hp) + 3);
  assert.match(branch, /return NextResponse\.json\(\{ success: true \}\);/);
});

test("a filled honeypot in the posted fields is detected; an empty one is not", () => {
  assert.equal(HONEYPOT_FIELD, "homepage");
  assert.equal(isHoneypotFilled({ businessId: "b", email: "x@example.com", homepage: "http://spam.example" }), true);
  assert.equal(isHoneypotFilled({ businessId: "b", email: "x@example.com", homepage: "" }), false);
  assert.equal(isHoneypotFilled({ businessId: "b", email: "x@example.com" }), false);
});

test("short review fields are capped at 100 characters, before anything is stored or sent", () => {
  assert.match(ROUTE, /firstTooLong\(\s*\{ firstName, lastName, displayName, email, title \},\s*\{ firstName: MAX_SHORT, lastName: MAX_SHORT, displayName: MAX_SHORT, email: MAX_SHORT, title: MAX_SHORT \},?\s*\)/);
  const cap = ROUTE.indexOf("firstTooLong(");
  assert.ok(cap > 0 && cap < ROUTE.indexOf("prisma.review.create(") && cap < ROUTE.indexOf("resend.emails.send("));
  assert.equal(firstTooLong({ firstName: "a".repeat(100), lastName: "b", email: "c@example.com" }, LIMITS), null);
  assert.equal(firstTooLong({ firstName: "a", lastName: "b".repeat(101) }, LIMITS), "lastName");
  assert.equal(firstTooLong({ firstName: "a", email: `${"e".repeat(95)}@example.com` }, LIMITS), "email");
  assert.equal(firstTooLong({ firstName: "a", title: "t".repeat(101) }, LIMITS), "title");
});

test("the form has the hidden honeypot, sends it, and caps the short inputs", () => {
  assert.match(FORM, /aria-hidden="true" className="absolute -left-\[9999px\]/);
  assert.match(FORM, /name="homepage" tabIndex=\{-1\} autoComplete="off"/);
  assert.match(FORM, /form\.append\("homepage", homepage\);/);
  for (const setter of ["setFirstName", "setLastName", "setEmail", "setTitle"]) {
    const at = FORM.indexOf(`onChange={(e) => ${setter}(e.target.value)}`);
    assert.ok(at > 0, setter);
    const input = FORM.slice(FORM.lastIndexOf("<input", at), FORM.indexOf("/>", at));
    assert.match(input, /maxLength=\{100\}/, `${setter} input has maxLength 100`);
  }
});
