// The claim route gives the same answer whatever the email, so it cannot be used to find out
// which emails already own listings; such a claim is stored for the admin to decide (11 Nov 2026).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const strip = (s) => s.replace(/\/\/[^\n]*/g, "");
const route = strip(fs.readFileSync(path.join(root, "app", "api", "hub", "claim", "submit", "route.ts"), "utf8"));
const mail = fs.readFileSync(path.join(root, "lib", "enquiry-email.ts"), "utf8");

test("no answer reveals that an email already has an account or a listing", () => {
  assert.doesNotMatch(route, /already manages a listing/i);
  assert.doesNotMatch(route, /account with this email/i);
});

test("an email that already manages a listing still reaches the stored claim and the same ok answer", () => {
  assert.doesNotMatch(route, /businesses\.length\s*>\s*0\)\s*\{\s*return/);
  assert.match(route, /prisma\.claimRequest\.create\(/);
  assert.match(route, /return NextResponse\.json\(\{ ok: true \}\);\s*\}\s*$/);
});

test("the admin notice says which listing the email already manages", () => {
  assert.match(route, /alreadyManages/);
  assert.match(mail, /alreadyManages\?: string \| null/);
  assert.match(mail, /This email already manages: /);
});
