// The /pricing boost tiles are built from getBoostTypes() in lib/boost-config.ts,
// the same list checkout accepts, so a boost past its deadline is not listed.
// Static read plus the pure function: no route is called.
// Run: npm run test:enquiry   (node --test tests/*.test.mjs)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { BOOST_TYPES, getBoostTypes } from "../lib/boost-config.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PAGE = readFileSync(join(ROOT, "app/pricing/page.tsx"), "utf8");

test("a boost past its deadline is not in the available list", () => {
  // The Open 2026 Fortnight closed on 12 July 2026; today is after that.
  assert.ok(new Date() >= new Date("2026-07-12"));
  assert.ok(BOOST_TYPES.some((b) => b.id === "open2026"), "still defined in the config");
  assert.ok(!getBoostTypes().some((b) => b.id === "open2026"), "but not offered");
  assert.ok(getBoostTypes().length > 0);
});

test("/pricing renders its boost tiles from getBoostTypes() and revalidates at least daily", () => {
  assert.match(PAGE, /import \{ getBoostTypes, formatPrice \} from "@\/lib\/boost-config";/);
  assert.match(PAGE, /\{getBoostTypes\(\)\.map\(\(b\) => \(/);
  assert.doesNotMatch(PAGE, /The Open 2026 Fortnight|const BOOSTS = \[/, "no hard-coded boost list");
  const m = PAGE.match(/export const revalidate = (\d+);/);
  assert.ok(m && Number(m[1]) <= 86400, "revalidate <= 86400 seconds");
});
