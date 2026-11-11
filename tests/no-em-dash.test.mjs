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
// The same character written as an HTML entity or a string escape. A regex
// such as /[\u2013\u2014]/ that strips dashes is fine and is not matched.
const ENTITY = /&mdash;|&#8212;|&#x2014;/i;
const ESCAPE = /(["'`])(?:(?!\1).)*\\u2014/;
const hasDash = (s) => s.includes(EM) || ENTITY.test(s) || ESCAPE.test(s);

// Covered: app/ (house-price pages and the business owners' hub included),
// components/, lib/ (email templates included), content/ (.ts, .tsx),
// public/llms.txt, and app/api/ (mail subjects and bodies, API answers).
// Not covered, and why:
const EXCLUDE = [
  /^app\/admin\//, //            internal admin screens (Damian only)
  /^app\/api\//, //              route handlers: read by their own test below
  /^lib\/rewrite-as-terry\.ts$/, // an instruction prompt, never rendered
  /^lib\/post-to-social\.ts$/, //   log messages only
];

/** Source with block and line comments blanked out (strings keep their "//" in URLs). */
function stripComments(src) {
  let out = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  out = out.replace(/(^|[^:"'`\\])\/\/[^\n]*/gm, (m, pre) => pre);
  return out;
}

function walk(dir) {
  const found = [];
  const visit = (d) => {
    if (!existsSync(join(ROOT, d))) return;
    for (const name of readdirSync(join(ROOT, d))) {
      const p = join(d, name);
      if (statSync(join(ROOT, p)).isDirectory()) visit(p);
      else if (/\.(ts|tsx)$/.test(name)) found.push(relative(ROOT, join(ROOT, p)).split(sep).join("/"));
    }
  };
  visit(dir);
  return found;
}

function files() {
  return ["app", "components", "lib", "content"].flatMap(walk).filter((p) => !EXCLUDE.some((re) => re.test(p)));
}

test("no em dash in page titles, metadata, JSON-LD, copy or rendered data files", () => {
  const hits = [];
  for (const p of files()) {
    const code = stripComments(readFileSync(join(ROOT, p), "utf8"));
    code.split("\n").forEach((line, i) => {
      if (hasDash(line)) hits.push(`${p}:${i + 1}: ${line.trim().slice(0, 120)}`);
    });
  }
  assert.deepEqual(hits, []);
});

// app/api: the mail the site sends (subjects and bodies) and the text its
// routes answer with. Two exceptions: the command-centre routes are Damian's
// own dashboard, and the Stripe boost product name (create-boost-checkout) is
// payment code, left for Damian.
const API_EXCLUDE = [/^app\/api\/command-centre\//, /^app\/api\/hub\/create-boost-checkout\/route\.ts$/];

test("no em dash in any mail the site sends or any API answer (app/api)", () => {
  const hits = [];
  for (const p of walk("app/api").filter((f) => !API_EXCLUDE.some((re) => re.test(f)))) {
    const code = stripComments(readFileSync(join(ROOT, p), "utf8"));
    code.split("\n").forEach((line, i) => {
      if (hasDash(line)) hits.push(`${p}:${i + 1}: ${line.trim().slice(0, 120)}`);
    });
  }
  assert.deepEqual(hits, []);
});

test("no em dash in public/llms.txt", () => {
  const p = join(ROOT, "public/llms.txt");
  if (existsSync(p)) {
    const text = readFileSync(p, "utf8");
    assert.equal(text.includes(EM) || ENTITY.test(text), false);
  }
});

test("the checks catch the character, its entities and its escape, and leave a dash-stripping regex alone", () => {
  for (const bad of [`a ${EM} b`, "a &mdash; b", "a &#8212; b", "a &#x2014; b", 'const t = "a \\u2014 b";']) {
    assert.ok(hasDash(bad), bad);
  }
  assert.equal(hasDash('.replace(/[\\u2013\\u2014]/g, "-")'), false);
});
