// Every mail to a business owner checks Resend's answer and logs a refused
// send (name and message only), as the enquiry routes do: the claim
// confirmation, the approval with its set-password link, and the rejection.
// A failed admin notice no longer turns a stored claim into an error page.
// Static reads plus lib/enquiry-email.ts. Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { logSendError } from "../lib/enquiry-email.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const OWNER_MAIL = {
  "app/api/hub/claim/submit/route.ts": ["claimant confirmation"],
  "app/api/admin/claims/[id]/approve/route.ts": ["approval and set-password link"],
  "app/api/admin/claims/[id]/reject/route.ts": ["rejection"],
};

test("each send to an owner reads Resend's answer and logs a failure", () => {
  for (const [file, whats] of Object.entries(OWNER_MAIL)) {
    const src = read(file);
    const sends = (src.match(/resend\.emails\.send\(/g) ?? []).length;
    const checked = (src.match(/const \{ error \} = await resend\.emails\.send\(/g) ?? []).length;
    assert.ok(sends > 0, file);
    assert.equal(checked, sends, `${file}: every send checks { error }`);
    assert.doesNotMatch(src, /^\s*await resend\.emails\.send\(/m, `${file}: no unchecked send`);
    for (const what of whats) {
      assert.match(src, new RegExp(`if \\(error\\) logSendError\\("[a-z]+", "${what}", error\\)`), `${file}: ${what}`);
      assert.match(src, new RegExp(`catch \\(err\\) \\{\\s*logSendError\\("[a-z]+", "${what}", err\\)`), `${file}: ${what} thrown`);
    }
  }
});

test("a failed admin notice is logged, not thrown, once the claim is stored", () => {
  const src = read("app/api/hub/claim/submit/route.ts");
  assert.doesNotMatch(src, /throw err/);
});

test("the log line carries the error's name and message only", () => {
  const lines = [];
  logSendError("claims", "rejection", { name: "validation_error", message: "Invalid `to` field", statusCode: 422, to: "owner@example.com" }, (l) => lines.push(l));
  assert.deepEqual(lines, ["[claims] rejection email failed: validation_error: Invalid `to` field"]);
  assert.doesNotMatch(lines[0], /owner@example\.com/);
});
