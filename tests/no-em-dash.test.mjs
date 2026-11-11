// No em dash (U+2014) in anything a visitor or a search engine sees
// (C:\Projects\CLAUDE.md): page titles and descriptions, metadata exports,
// OpenGraph and JSON-LD built in code, visible copy, and the lib/ and content/
// data files that render. Static read: comments are stripped first, so an em
// dash left in a code comment is fine. Run: npm run test:enquiry
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const EM = "\u2014";

// Covered: app/, components/, lib/, content/ (.ts, .tsx), public/llms.txt.
// Not covered, and why:
const EXCLUDE = [
  /^app\/admin\//, //            internal admin screens (Damian only)
  /^app\/dashboard\//, //        business dashboard, behind sign-in; not changed in this job
  /^app\/api\//, //              route handlers: admin emails and Stripe code are not edited here
  /^app\/property\//, //         house-price pages, outside this job (reported)
  /^components\/property\//, //  their components (reported)
  /^lib\/rewrite-as-terry\.ts$/, // an instruction prompt, never rendered
  /^lib\/post-to-social\.ts$/, //   log messages only
  /^lib\/event-intel\.ts$/, //      dashboard text
];

/** Source with block and line comments blanked out (strings keep their "//" in URLs). */
function stripComments(src) {
  let out = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  out = out.replace(/(^|[^:"'`\\])\/\/[^\n]*/gm, (m, pre) => pre);
  return out;
}

function files() {
  const found = [];
  const visit = (dir) => {
    if (!existsSync(join(ROOT, dir))) return;
    for (const name of readdirSync(join(ROOT, dir))) {
      const p = join(dir, name);
      if (statSync(join(ROOT, p)).isDirectory()) visit(p);
      else if (/\.(ts|tsx)$/.test(name)) found.push(relative(ROOT, join(ROOT, p)).split(sep).join("/"));
    }
  };
  for (const d of ["app", "components", "lib", "content"]) visit(d);
  return found.filter((p) => !EXCLUDE.some((re) => re.test(p)));
}

test("no em dash in page titles, metadata, JSON-LD, copy or rendered data files", () => {
  const hits = [];
  for (const p of files()) {
    const code = stripComments(readFileSync(join(ROOT, p), "utf8"));
    code.split("\n").forEach((line, i) => {
      if (line.includes(EM)) hits.push(`${p}:${i + 1}: ${line.trim().slice(0, 120)}`);
    });
  }
  assert.deepEqual(hits, []);
});

test("no em dash in public/llms.txt", () => {
  const p = join(ROOT, "public/llms.txt");
  if (existsSync(p)) assert.equal(readFileSync(p, "utf8").includes(EM), false);
});
