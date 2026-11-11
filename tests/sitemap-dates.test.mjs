// Sitemap and post dates (SEO pass, 11 Nov 2026): lastmod is the day a page's content
// last changed, never "now"; a post's dateModified is a real later day; robots.txt
// lets crawlers fetch the CSS and JavaScript; the sitemap leaves out what robots.txt
// blocks. Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { utcDate, later, postLastmod, lastmod } from "../lib/sitemap-dates.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (...p) => readFileSync(join(ROOT, ...p), "utf8");

test("dates read as midnight UTC, posts' 'D Mon YYYY' included; bad dates give null", () => {
  assert.equal(utcDate("2026-11-11")?.toISOString(), "2026-11-11T00:00:00.000Z");
  assert.equal(utcDate("15 Feb 2026")?.toISOString(), "2026-02-15T00:00:00.000Z");
  assert.equal(utcDate("3 Jul 2026")?.toISOString(), "2026-07-03T00:00:00.000Z");
  for (const bad of [undefined, null, "", "Feb 2026", "31 Feb 2026", "2026-13-01", "15 Foo 2026", "soon"]) {
    assert.equal(utcDate(bad), null, String(bad));
  }
});

test("a post's lastmod is its dateModified, else its date; nothing made up", () => {
  assert.equal(postLastmod({ date: "15 Feb 2026", dateModified: "2026-11-11" })?.toISOString().slice(0, 10), "2026-11-11");
  assert.equal(postLastmod({ date: "15 Feb 2026" })?.toISOString().slice(0, 10), "2026-02-15");
  assert.equal(postLastmod({ date: "someday" }), null);
  assert.deepEqual(lastmod(null), {});
  assert.equal(later(null, utcDate("2026-03-01"), undefined, utcDate("2026-11-11"))?.toISOString().slice(0, 10), "2026-11-11");
  assert.equal(later(), null);
});

test("every post's dateModified is YYYY-MM-DD and later than the date it shows", () => {
  const src = read("lib", "southport-data.ts");
  const posts = src.slice(src.indexOf("export const BLOG_POSTS"));
  const re = /^    date: "([^"]+)",\r?\n    dateModified: "([^"]+)",/gm;
  let n = 0;
  for (const m of posts.matchAll(re)) {
    n++;
    const shown = utcDate(m[1]);
    const modified = utcDate(m[2]);
    assert.ok(shown, `date ${m[1]}`);
    assert.ok(modified && /^\d{4}-\d{2}-\d{2}$/.test(m[2]), `dateModified ${m[2]}`);
    assert.ok(modified > shown, `${m[2]} after ${m[1]}`);
  }
  // Every dateModified in the registry sits straight after its date line.
  assert.equal(n, (posts.match(/^    dateModified: /gm) ?? []).length);
  assert.ok(n > 0);
});

test("the post JSON-LD and Open Graph use the post's own dates", () => {
  const src = read("app", "blog", "[slug]", "page.tsx");
  assert.match(src, /dateModified: post\.dateModified \?\? isoDate/);
  assert.match(src, /modifiedTime: post\.dateModified/);
  assert.doesNotMatch(src, /dateModified: isoDate,/);
});

test("the sitemap never stamps today's date and is rebuilt hourly", () => {
  const src = read("app", "sitemap.ts");
  assert.doesNotMatch(src, /new Date\(\)/);
  assert.doesNotMatch(src, /new Date\("20\d\d-/, "no hard-coded fallback dates");
  assert.match(src, /export const revalidate = 3600;/);
  for (const g of read("lib", "guides-config.ts").matchAll(/dateUpdated: "([^"]+)"/g)) {
    assert.ok(utcDate(g[1]), `guide dateUpdated ${g[1]}`);
  }
});

test("no fake 'now' dates on property pages or the home page JSON-LD", () => {
  const property = read("app", "property", "[slug]", "page.tsx");
  assert.doesNotMatch(property, /modified_time"?: new Date\(\)/);
  assert.doesNotMatch(property, /dateModified: new Date\(\)/);
  assert.doesNotMatch(property, /format\(new Date\(\)/);
  assert.doesNotMatch(read("app", "page.tsx"), /dateModified: new Date\(\)/);
});

test("robots.txt lets crawlers fetch the CSS and JavaScript, and the sitemap leaves out what it blocks", () => {
  const robots = read("app", "robots.ts");
  assert.doesNotMatch(robots, /["']\/_next\/static\/?["']/);
  assert.match(robots, /sitemap: "https:\/\/www\.southportguide\.co\.uk\/sitemap\.xml"/);
  const sitemap = read("app", "sitemap.ts");
  const blocked = [...robots.matchAll(/^\s*"(\/[^"]+)",$/gm)].map((m) => m[1]);
  assert.ok(blocked.includes("/claim-listing"));
  for (const path of blocked) {
    assert.doesNotMatch(sitemap, new RegExp("\\$\\{BASE\\}" + path.replace(/[/.]/g, "\\$&") + "[`/]"), path);
  }
});
