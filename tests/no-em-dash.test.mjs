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
// components/, lib/, content/ (.ts, .tsx), public/llms.txt, and in app/api/
// the subject lines of the mail the site sends.
// Not covered, and why:
const EXCLUDE = [
  /^app\/admin\//, //            internal admin screens (Damian only)
  /^app\/api\//, //              route handlers: their mail subjects are read by the test below
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

test("no em dash in the subject of any mail the site sends (app/api)", () => {
  const hits = [];
  for (const p of walk("app/api")) {
    const code = stripComments(readFileSync(join(ROOT, p), "utf8"));
    for (const m of code.matchAll(/subject:\s*(`[^`]*`|"[^"]*"|'[^']*')/g)) {
      if (hasDash(m[1])) hits.push(`${p}: ${m[1].slice(0, 100)}`);
    }
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
