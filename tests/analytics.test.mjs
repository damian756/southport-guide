// Google Analytics 4 is gone: no gtag script, no measurement id, nothing that
// calls gtag or dataLayer. Ahrefs Web Analytics (cookieless) stays.
// Run: npm run test:enquiry   (node --test tests/*.test.mjs)
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

test("no Google Analytics script, id or gtag/dataLayer call in app, components or lib", () => {
  const hits = [];
  const visit = (dir) => {
    if (!existsSync(join(ROOT, dir))) return;
    for (const name of readdirSync(join(ROOT, dir))) {
      const p = join(dir, name);
      if (statSync(join(ROOT, p)).isDirectory()) visit(p);
      else if (/\.(tsx?|jsx?|mjs)$/.test(name)) {
        const src = readFileSync(join(ROOT, p), "utf8");
        const m = src.match(/googletagmanager\.com|google-analytics\.com|G-FY0P030KNH|\bgtag\(|dataLayer/);
        if (m) hits.push(`${relative(ROOT, join(ROOT, p)).split(sep).join("/")}: ${m[0]}`);
      }
    }
  };
  for (const d of ["app", "components", "lib", "public"]) visit(d);
  assert.deepEqual(hits, []);
});

test("Ahrefs Web Analytics is still loaded", () => {
  assert.match(readFileSync(join(ROOT, "app/layout.tsx"), "utf8"), /https:\/\/analytics\.ahrefs\.com\/analytics\.js/);
});
