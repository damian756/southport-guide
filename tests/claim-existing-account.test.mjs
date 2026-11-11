// A claim made with the email of an existing account must leave that account exactly as it was:
// no name or password change from a public form (hotfix 11 Nov 2026). Static read of the route.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const route = fs.readFileSync(path.resolve(import.meta.dirname, "..", "app", "api", "hub", "claim", "submit", "route.ts"), "utf8");
const code = route.replace(/\/\/[^\n]*/g, ""); // ignore line comments

test("the claim route never updates a user", () => {
  assert.doesNotMatch(code, /prisma\.user\.update(Many)?\s*\(/, "the claim route must not update any user row");
  assert.doesNotMatch(code, /prisma\.user\.upsert\s*\(/, "the claim route must not upsert a user row");
});

test("an existing account is linked by id and left unchanged", () => {
  const m = code.match(/if \(!existingUser\) \{([\s\S]*?)\} else \{([\s\S]*?)\r?\n  \}/);
  assert.ok(m, "expected the new-or-existing user branch");
  const existingBranch = m[2];
  assert.match(existingBranch, /userId = existingUser\.id;/);
  assert.doesNotMatch(existingBranch, /password|name:/, "the existing-account branch must not touch name or password");
});

test("a new account is still created with a random temporary password", () => {
  assert.match(code, /prisma\.user\.create\(/);
  assert.match(code, /password: tempPassword/);
});
