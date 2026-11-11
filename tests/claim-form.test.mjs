// The claim form never crashes on a refused field: the route answers with a
// sentence per field, and the form shows each beside its field
// (lib/claim-form.ts, lib/claim-schema.ts, app/api/hub/claim/submit,
// app/claim-listing/ClaimListingClient.tsx). Cases from the sign-up check:
// an email with no dot after the @, a name over 100 characters, a message
// over 2,000. Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { ClaimSchema } from "../lib/claim-schema.ts";
import {
  CLAIM_FIELD_MESSAGES, CLAIM_FORM_ERROR, MAX_MESSAGE, MAX_NAME,
  claimFieldErrors, submitErrorText, submitFieldErrors,
} from "../lib/claim-form.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const ok = { businessId: "8825d7f0-7612-41f1-b34a-76643f93c3ef", name: "Pat Owner", email: "owner@shop.co.uk", message: "I own it." };

function answer(input) {
  const parsed = ClaimSchema.safeParse(input);
  assert.equal(parsed.success, false);
  return { error: CLAIM_FORM_ERROR, fieldErrors: claimFieldErrors(parsed.error.issues) };
}

test("a valid claim passes; the limits match the form's (100 and 2,000)", () => {
  assert.equal(ClaimSchema.safeParse(ok).success, true);
  assert.equal(ClaimSchema.safeParse({ ...ok, name: "a".repeat(MAX_NAME) }).success, true);
  assert.equal(ClaimSchema.safeParse({ ...ok, message: "a".repeat(MAX_MESSAGE) }).success, true);
});

test('"owner@shop" gets the email sentence, not an object', () => {
  const a = answer({ ...ok, email: "owner@shop" });
  assert.equal(a.fieldErrors.email, CLAIM_FIELD_MESSAGES.email);
  assert.equal(typeof submitErrorText(a), "string");
});

test("a name over 100 characters and a message over 2,000 each get their own sentence", () => {
  const a = answer({ ...ok, name: "a".repeat(MAX_NAME + 1), message: "m".repeat(MAX_MESSAGE + 1) });
  assert.equal(a.fieldErrors.name, CLAIM_FIELD_MESSAGES.name);
  assert.equal(a.fieldErrors.message, CLAIM_FIELD_MESSAGES.message);
  assert.equal(a.fieldErrors.email, undefined);
  assert.deepEqual(submitFieldErrors(a), a.fieldErrors);
});

test("whatever the answer's shape, the form gets a sentence to show", () => {
  const old = { error: { formErrors: [], fieldErrors: { email: ["Invalid email address"] } } };
  assert.equal(submitErrorText(old), CLAIM_FORM_ERROR);
  assert.equal(submitFieldErrors(old).email, CLAIM_FIELD_MESSAGES.email);
  assert.equal(submitErrorText({ error: "This listing is already claimed." }), "This listing is already claimed.");
  for (const bad of [null, undefined, {}, "x", 3]) assert.equal(typeof submitErrorText(bad), "string");
});

test("the route sends sentences, and the form shows each beside its field", () => {
  const route = read("app/api/hub/claim/submit/route.ts");
  assert.doesNotMatch(route, /error\.flatten\(\)/);
  assert.match(route, /fieldErrors: claimFieldErrors\(parsed\.error\.issues\)/);
  assert.match(route, /try \{\s*body = await req\.json\(\);/);
  const form = read("app/claim-listing/ClaimListingClient.tsx");
  assert.match(form, /setSubmitError\(submitErrorText\(data\)\)/);
  assert.doesNotMatch(form, /setSubmitError\(data\.error/);
  for (const f of ["name", "email", "message"]) {
    assert.ok(form.includes(`{fieldErrors.${f} && (`), f);
    assert.match(form, new RegExp(`id="claim-${f}-error"`), f);
  }
  assert.match(form, /maxLength=\{MAX_NAME\}/);
  assert.match(form, /maxLength=\{MAX_MESSAGE\}/);
});
