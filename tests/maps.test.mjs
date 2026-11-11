// Maps (Damian, 11 Nov 2026): maps are drawn with Leaflet on OpenStreetMap tiles.
// A Google Maps embed may only be built in the click-to-load component
// (components/GoogleMapClickToLoad.tsx, for listings with a place id but no stored
// coordinates), and that component must not render an iframe before the visitor
// clicks. Static read of the source files, plus a server render of the
// click-to-load component. Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// Everything that can end up on the site. docs/, tests/ and scripts/ never render.
const DIRS = ["app", "components", "lib", "content", "messages", "public"];
const ROOT_FILES = ["next.config.ts", "vercel.json"];

const CLICK_TO_LOAD = join("components", "GoogleMapClickToLoad.tsx");
const LISTING_MAP = join("components", "ListingMap.tsx");
const LISTING_MAP_LAZY = join("components", "ListingMapLazy.tsx");
const LISTING_PAGE = join("app", "[category]", "[slug]", "page.tsx");
const PARKING_PAGE = join("app", "parking", "[slug]", "page.tsx");
const ROXY_GUIDE = join("app", "guides", "roxy-cafe-southport", "page.tsx");

const EMBED_PATTERNS = [
  /google\.[a-z.]+\/maps\/(d\/)?embed/i, // Embed API, pb= embeds and My Maps (maps/d/embed)
  /maps\.google\.[a-z.]+\/maps\?[^"'`\s]*output=embed/i,
  /[?&]output=embed/i,
  /\bembed\/v1\b/i,
];

function files(dir) {
  const out = [];
  const walk = (d) => {
    for (const name of readdirSync(join(ROOT, d))) {
      const p = join(d, name);
      if (statSync(join(ROOT, p)).isDirectory()) walk(p);
      else if (/\.(tsx?|jsx?|mjs|cjs|json|md|mdx|txt|html?|xml|svg)$/i.test(name)) out.push(p);
    }
  };
  if (existsSync(join(ROOT, dir))) walk(dir);
  return out;
}

const read = (p) => readFileSync(join(ROOT, p), "utf8");
const posix = (p) => p.split(sep).join("/");
const siteFiles = () => [...DIRS.flatMap(files), ...ROOT_FILES.filter((f) => existsSync(join(ROOT, f)))];

// String literals in a file: "...", '...' and `...` (no nesting needed here).
const literals = (src) => src.match(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g) || [];

test("no Google Maps embed URL outside the click-to-load component", () => {
  const all = siteFiles();
  assert.ok(all.length > 50, "expected to scan the site's source files");
  const hits = [];
  for (const f of all) {
    if (f === CLICK_TO_LOAD) continue;
    const src = read(f);
    for (const re of EMBED_PATTERNS) if (re.test(src)) hits.push(`${posix(f)}: ${re}`);
    // An embed URL put together from pieces: any string with "embed" in a file
    // that also talks to Google.
    if (/google/i.test(src) && literals(src).some((s) => /\bembed\b/i.test(s))) {
      hits.push(`${posix(f)}: "embed" string in a file that mentions Google`);
    }
  }
  assert.deepEqual(hits, []);
});

test("no iframe anywhere on the site except in the click-to-load component", () => {
  const hits = siteFiles().filter(
    (f) => f !== CLICK_TO_LOAD && /<iframe\b|createElement\(\s*["'`]iframe|["'`]iframe["'`]/i.test(read(f)),
  );
  assert.deepEqual(hits.map(posix), []);
});

test("the click-to-load component builds the embed and renders no iframe before a click", () => {
  const src = read(CLICK_TO_LOAD);
  assert.match(src, /google\.com\/maps\/embed\/v1\/place\?/, "embed URL lives here");
  assert.equal((src.match(/<iframe\b/g) || []).length, 1, "exactly one iframe in the component");
  assert.equal((src.match(/embedUrl\(/g) || []).length, 2, "embedUrl is defined once and called once");

  // Starts hidden, and only a click turns it on.
  assert.match(src, /const \[shown, setShown\] = useState\(false\);/);
  assert.equal((src.match(/setShown/g) || []).length, 2, "setShown is declared once and called once (no alias)");
  assert.match(src, /onClick=\{\(\) => setShown\(true\)\}/, "the click sets it");

  // Before the click: the `if (!shown) { ... }` block returns the button and no iframe.
  const guard = src.indexOf("if (!shown) {");
  assert.ok(guard > 0, "early return while not shown");
  const open = src.indexOf("{", guard);
  let depth = 0;
  let close = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) { close = i; break; }
  }
  assert.ok(close > open, "the not-shown block closes");
  const notShown = src.slice(open, close + 1);
  assert.match(notShown, /return \(/);
  assert.match(notShown, /<button[\s\S]*Show map \(Google Maps\)[\s\S]*<\/button>/);
  assert.doesNotMatch(notShown, /<iframe|embedUrl\(|src=/, "no iframe or embed URL before the click");

  // The iframe is only in the code after that block, which runs once shown is true.
  assert.ok(src.indexOf("<iframe") > close, "iframe comes after the not-shown block");
  assert.match(src.slice(close + 1), /^\s*return \(\s*<iframe\b/, "the shown branch returns the iframe");

  // Nothing before the guard renders anything from Google.
  const componentStart = src.indexOf("export default function GoogleMapClickToLoad");
  assert.ok(componentStart > 0 && componentStart < guard);
  assert.doesNotMatch(src.slice(componentStart, guard), /<iframe|embedUrl\(|google\.com|return\b/i);
});

test("the click-to-load component, rendered as the server sends it, has a button and no iframe", async () => {
  // Compile the component with esbuild (installed with tsx) and render it with
  // react-dom/server, as Next does for the first HTML. React and lucide-react
  // come from the site's own node_modules.
  const require = createRequire(join(ROOT, "package.json"));
  const { transformSync } = require("esbuild");
  const { code: js } = transformSync(read(CLICK_TO_LOAD), { loader: "tsx", format: "cjs", jsx: "automatic" });
  const mod = { exports: {} };
  new Function("require", "module", "exports", js)(require, mod, mod.exports);
  const Component = mod.exports.default;
  const React = require("react");
  const { renderToString } = require("react-dom/server");
  const html = renderToString(
    React.createElement(Component, { placeId: "TEST_PLACE_ID_123", apiKey: "TEST_API_KEY_456", name: "Test" }),
  );
  assert.match(html, /<button[^>]*>[\s\S]*Show map \(Google Maps\)[\s\S]*<\/button>/);
  assert.doesNotMatch(html, /<iframe|<embed|<object|src=|google\.com|TEST_PLACE_ID_123|TEST_API_KEY_456/i, "nothing from Google, and not the key, before the click");
});

test("the listing page: OpenStreetMap map with coordinates, click-to-load without, plain links", () => {
  const page = read(LISTING_PAGE);
  assert.doesNotMatch(page, /<iframe\b/, "no iframe on the listing page itself");
  assert.match(page, /const coords = business\.lat != null && business\.lng != null/);
  assert.match(page, /coords \? \(\s*<ListingMapLazy\b/, "the OpenStreetMap map when there are coordinates");
  assert.match(page, /: clickToLoad \? \(\s*<GoogleMapClickToLoad\b/, "click-to-load only without coordinates");
  assert.match(page, /const clickToLoad = !coords && /);

  // The plain links sit in the map block itself, under the map.
  const start = page.indexOf("{/* Location: OpenStreetMap map");
  assert.ok(start > 0, "the map block is there");
  const block = page.slice(start, page.indexOf("{/*", start + 5));
  assert.ok(block.indexOf("<ListingMapLazy") > 0, "the map is in the block");
  for (const link of ["Get directions", "View on Google Maps"]) {
    const at = block.search(new RegExp(`<a\\b[^>]*\\bhref=\\{[^}]+\\}[^>]*>\\s*${link}\\b`));
    assert.ok(at > block.indexOf("<ListingMapLazy"), `a plain "${link}" link under the map`);
  }
});

// After each map, before the next JSX comment (the next block on the page): a plain
// <a href> for each link.
function linksUnderEachMap(src, file) {
  const boxes = src.split(/<ListingMapLazy\b/).slice(1);
  assert.ok(boxes.length > 0, `${file} has a map`);
  boxes.forEach((after, i) => {
    const box = after.split("{/*")[0];
    for (const link of [/Get directions/i, /View on Google Maps/]) {
      assert.match(box, new RegExp(`<a\\b[^>]*\\bhref=[^>]*>\\s*(<[^>]+>\\s*)*${link.source}\\b`, link.flags), `${file}, map ${i + 1}: plain ${link} link under it`);
    }
  });
}

test("the parking page and the Roxy's Cafe guide use the OpenStreetMap map and keep plain links", () => {
  const parking = read(PARKING_PAGE);
  assert.doesNotMatch(parking, /<iframe\b/);
  assert.equal((parking.match(/<ListingMapLazy\b/g) || []).length, 2, "mobile and desktop map boxes");
  assert.match(parking, /const clickToLoad = !coords && /);
  linksUnderEachMap(parking, "parking page");

  const roxy = read(ROXY_GUIDE);
  assert.doesNotMatch(roxy, /<iframe\b/);
  assert.equal((roxy.match(/<ListingMapLazy\b/g) || []).length, 1);
  linksUnderEachMap(roxy, "Roxy's Cafe guide");
});

test("Leaflet is loaded lazily, in the browser only, and only through the lazy wrappers", () => {
  const lazy = read(LISTING_MAP_LAZY);
  assert.match(lazy, /dynamic\(\(\) => import\("\.\/ListingMap"\),\s*\{\s*ssr: false/);

  // The lazy wrapper mounts the map only when its box comes near the screen.
  assert.match(lazy, /const \[near, setNear\] = useState\(false\);/);
  assert.equal((lazy.match(/setNear/g) || []).length, 2, "setNear is declared once and called once (no alias)");
  const io = lazy.slice(lazy.indexOf("new IntersectionObserver("), lazy.indexOf("io.observe("));
  assert.match(io, /setNear\(true\)/, "only the IntersectionObserver turns the map on");

  // Only ListingMapLazy imports ListingMap, and pages never import Leaflet themselves.
  const importers = DIRS.flatMap(files).filter((f) =>
    /(?:from\s*|import\(\s*)["'][^"']*\/ListingMap["']/.test(read(f)),
  );
  assert.deepEqual(importers.map(posix), [posix(LISTING_MAP_LAZY)], "only ListingMapLazy imports ListingMap");
  for (const f of [LISTING_PAGE, PARKING_PAGE, ROXY_GUIDE, LISTING_MAP_LAZY]) {
    assert.doesNotMatch(read(f), /from "(react-)?leaflet"|leaflet\.css/, `${posix(f)} must not import Leaflet directly`);
  }
});

test("OpenStreetMap tiles: the policy URL and visible attribution on every map", () => {
  const tiles = read(join("lib", "osm-tiles.ts"));
  assert.match(tiles, /"https:\/\/tile\.openstreetmap\.org\/\{z\}\/\{x\}\/\{y\}\.png"/);
  assert.match(tiles, /&copy; <a href="https:\/\/www\.openstreetmap\.org\/copyright">OpenStreetMap<\/a> contributors/);

  // Every TileLayer on the site uses the shared URL and attribution.
  const all = DIRS.flatMap(files);
  const layers = all.filter((f) => /<TileLayer\b/.test(read(f)));
  assert.ok(layers.includes(LISTING_MAP), "the listing map has a tile layer");
  for (const f of layers) {
    const src = read(f);
    const n = (src.match(/<TileLayer\b/g) || []).length;
    assert.equal((src.match(/url=\{OSM_TILE_URL\}/g) || []).length, n, `${posix(f)} uses the shared tile URL`);
    assert.equal((src.match(/attribution=\{OSM_ATTRIBUTION\}/g) || []).length, n, `${posix(f)} uses the shared attribution`);
  }
  const old = all.filter((f) => /\{s\}\.tile\.openstreetmap\.org|http:\/\/tile\.openstreetmap|[abc]\.tile\.openstreetmap/.test(read(f)));
  assert.deepEqual(old.map(posix), [], "no subdomain or plain-http tile URLs");

  // The attribution control stays on.
  const hidden = all.filter((f) => /attributionControl\s*(=\s*\{\s*false\s*\}|:\s*false)|attributionControl\??\.remove\(/.test(read(f)));
  assert.deepEqual(hidden.map(posix), [], "attribution control is never turned off");

  // No prefetching: the tile host is named only in lib/osm-tiles.ts, and the tile
  // URL is only ever handed to a TileLayer (no <link rel=prefetch>, no fetch()).
  const host = siteFiles().filter((f) => f !== join("lib", "osm-tiles.ts") && /openstreetmap\.org\/\{z\}|tile\.openstreetmap\.org/i.test(read(f)));
  assert.deepEqual(host.map(posix), [], "the tile URL lives only in lib/osm-tiles.ts");
  for (const f of all.filter((f) => f !== join("lib", "osm-tiles.ts") && /\bOSM_TILE_URL\b/.test(read(f)))) {
    const uses = read(f).match(/\bOSM_TILE_URL\b/g).length - 1; // minus the import
    assert.equal(uses, (read(f).match(/url=\{OSM_TILE_URL\}/g) || []).length, `${posix(f)} only passes OSM_TILE_URL to a TileLayer`);
  }
  assert.doesNotMatch(read(join("components", "ListingMap.tsx")), /keepBuffer|prefetch|preload/i, "no extra tiles fetched");
});
