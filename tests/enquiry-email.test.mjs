// Enquiries are delivered to DELIVERY_EMAIL; the only address of ours a visitor
// sees is DISPLAY_EMAIL. Enquiry mail is sent from the site's own domain, with a
// checked reply-to, escaped values, capped fields, a honeypot and logged errors.
// No affiliate links remain. Static reads plus the pure helpers in
// lib/enquiry-email.ts: nothing is sent and no route is called.
// Run: npm run test:enquiry   (node --test tests/*.test.mjs)
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
  HONEYPOT_FIELD,
  MAX_SHORT,
  buildAutoReply,
  buildClaimNotice,
  buildEnquiryEmail,
  buildSuggestionEmail,
  cleanSubject,
  escapeHtml,
  firstTooLong,
  isHoneypotFilled,
  logSendError,
  plainAddress,
} from "../lib/enquiry-email.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const OURS = /@(seftoncoast\.network|churchtownmedia\.co\.uk|southportguide\.co\.uk)$/;

function walk(dirs, exts, fn) {
  const visit = (dir) => {
    if (!existsSync(join(ROOT, dir))) return;
    for (const name of readdirSync(join(ROOT, dir))) {
      const p = join(dir, name);
      if (statSync(join(ROOT, p)).isDirectory()) visit(p);
      else if (exts.test(name)) fn(relative(ROOT, join(ROOT, p)).split(sep).join("/"), read(p));
    }
  };
  for (const d of dirs) visit(d);
}

const constant = (name) => {
  const m = read("lib/contact.ts").match(new RegExp(`export const ${name} = "([^"]+)"`));
  assert.ok(m, `lib/contact.ts exports ${name}`);
  return m[1];
};

// ── The two addresses ─────────────────────────────────────────────────────────

test("DELIVERY_EMAIL and DISPLAY_EMAIL", () => {
  assert.equal(constant("DELIVERY_EMAIL"), "damian@churchtownmedia.co.uk");
  assert.equal(constant("DISPLAY_EMAIL"), "hello@seftoncoast.network");
});

const ROUTES = {
  "app/api/contact/route.ts": /const TO_EMAIL = DELIVERY_EMAIL;/,
  "app/api/suggest-listing/route.ts": /const TO_EMAIL = DELIVERY_EMAIL;/,
  "app/api/hub/claim/submit/route.ts": /const ADMIN_EMAIL = DELIVERY_EMAIL;/,
};

for (const [file, toLine] of Object.entries(ROUTES)) {
  test(`${file}: delivers to DELIVERY_EMAIL from the site's own domain, checks and logs the send`, () => {
    const src = read(file);
    assert.match(src, /import \{ DELIVERY_EMAIL \} from "@\/lib\/contact";/);
    assert.match(src, toLine);
    assert.match(src, /const FROM_EMAIL = process\.env\.RESEND_FROM_EMAIL \|\| "SouthportGuide <noreply@southportguide\.co\.uk>";/);
    assert.match(src, /const \{ error \} = await resend\.emails\.send\(/);
    assert.match(src, /logSendError\(/);
    assert.doesNotMatch(src, /damian@|hello@seftoncoast|resend\.dev/, "no hard-coded enquiry address");
    // The honeypot is checked before anything is sent.
    const hp = src.indexOf("isHoneypotFilled(body)");
    assert.ok(hp > 0 && hp < src.indexOf("resend.emails.send("), "honeypot checked before sending");
  });
}

test("each enquiry email's `to` is the delivery address and its reply-to the sender", () => {
  assert.match(read("app/api/contact/route.ts"), /buildEnquiryEmail\(enquiry, \{ from: FROM_EMAIL, to: TO_EMAIL, replyTo \}\)/);
  assert.match(read("app/api/suggest-listing/route.ts"), /buildSuggestionEmail\(suggestion, \{ from: FROM_EMAIL, to: TO_EMAIL, replyTo \}\)/);
  assert.match(read("app/api/hub/claim/submit/route.ts"), /\{ from: FROM_EMAIL, to: ADMIN_EMAIL, replyTo: plainAddress\(parsed\.data\.email\) \}/);
});

// Pages and texts that print our address use DISPLAY_EMAIL.
const PRINTERS = [
  "app/layout.tsx",
  "app/about/page.tsx",
  "app/accessibility/page.tsx",
  "app/advertise/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/claim-listing/activate/page.tsx",
  "app/dashboard/(hub)/layout.tsx",
  "app/dashboard/(hub)/home/page.tsx",
  "app/dashboard/(hub)/reviews/page.tsx",
  "app/guides/southport-market/page.tsx",
  "app/news/NewsPageClient.tsx",
  "app/news/[slug]/page.tsx",
  "lib/email-templates/claim-approval.ts",
];

for (const file of PRINTERS) {
  test(`${file} prints DISPLAY_EMAIL and no other address of ours`, () => {
    const src = read(file);
    assert.match(src, /import \{ DISPLAY_EMAIL \} from "@\/lib\/contact";/);
    assert.ok((src.match(/\bDISPLAY_EMAIL\b/g) ?? []).length >= 2, "uses the constant");
    const ours = (src.match(EMAIL) ?? []).filter((a) => OURS.test(a) && a !== "noreply@southportguide.co.uk");
    assert.deepEqual(ours, []);
  });
}

test("public/llms.txt prints DISPLAY_EMAIL", () => {
  assert.ok(read("public/llms.txt").includes(constant("DISPLAY_EMAIL")));
});

// Addresses of ours that may remain, and why.
const ALLOWED = new Map([
  ["lib/contact.ts", ["damian@churchtownmedia.co.uk", "hello@seftoncoast.network"]], // the two constants
  ["public/llms.txt", ["hello@seftoncoast.network"]], // static file, checked above
  ["app/api/contact/route.ts", ["noreply@southportguide.co.uk"]], // FROM
  ["app/api/suggest-listing/route.ts", ["noreply@southportguide.co.uk"]], // FROM
  ["app/api/hub/claim/submit/route.ts", ["noreply@southportguide.co.uk"]], // FROM
  ["lib/email-templates/claim-approval.ts", ["noreply@southportguide.co.uk"]], // FROM
  ["app/api/auth/forgot-password/route.ts", ["noreply@southportguide.co.uk"]], // FROM, sign-in mail
  ["app/api/cron/review-check/route.ts", ["noreply@southportguide.co.uk"]], // FROM, alert to a business
  ["app/api/cron/weekly-email/route.ts", ["noreply@southportguide.co.uk"]], // FROM, weekly email to a business
  ["app/api/reviews/route.ts", ["hello@southportguide.co.uk"]], // FROM, review confirmation
  // FROM on review mail, and the admin alert of an approved review (not an enquiry; admin code)
  ["app/api/admin/reviews/[id]/route.ts", ["hello@southportguide.co.uk", "hello@southportguide.co.uk", "hello@southportguide.co.uk", "damian@churchtownmedia.co.uk"]],
  ["app/api/cron/news-sufs/route.ts", ["contact@southportguide.co.uk"]], // news-ingest User-Agent, never shown
  ["app/api/cron/news-visiter/route.ts", ["contact@southportguide.co.uk"]], // news-ingest User-Agent, never shown
  ["app/api/hub/create-boost-checkout/route.ts", ["demo@southportguide.co.uk"]], // demo account (payment code)
  ["app/api/hub/create-pro-checkout/route.ts", ["demo@southportguide.co.uk"]], // demo account (payment code)
  ["app/api/hub/upload-image/route.ts", ["demo@southportguide.co.uk", "demo@southportguide.co.uk"]], // demo account
  ["app/dashboard/(hub)/HubShell.tsx", ["demo@southportguide.co.uk"]], // demo account check
]);

test("no other address of ours anywhere in the site's code", () => {
  const found = new Map();
  walk(["app", "components", "lib", "public"], /\.(tsx?|mjs|js|json|txt|md|html|xml)$/, (p, src) => {
    const ours = (src.match(EMAIL) ?? []).filter((a) => OURS.test(a));
    if (ours.length) found.set(p, ours);
  });
  assert.deepEqual(Object.fromEntries([...found].sort()), Object.fromEntries([...ALLOWED].sort()));
});

test("no resend.dev sender anywhere in app/ or lib/", () => {
  const hits = [];
  walk(["app", "lib"], /\.(tsx?|mjs|js|json)$/, (p, src) => {
    if (src.includes("resend.dev")) hits.push(p);
  });
  assert.deepEqual(hits, []);
});

// ── Pure helpers ──────────────────────────────────────────────────────────────

const HOSTILE = {
  name: `Jo <script>alert("x")</script>`,
  email: "jo@example.com",
  subject: "Advertise\r\nBcc: victim@example.com",
  message: `Hello <b>there</b> & "friends" 'all'`,
  businessName: "Jo's <Cafe>\nLtd",
};
const ADDR = { from: "F <f@example.com>", to: "inbox@example.com", replyTo: "jo@example.com" };

test("escapeHtml escapes the five HTML characters", () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  assert.equal(escapeHtml(undefined), "");
});

test("the contact enquiry escapes every user value and has a one-line subject", () => {
  const mail = buildEnquiryEmail(HOSTILE, ADDR);
  assert.equal(mail.to, "inbox@example.com");
  assert.doesNotMatch(mail.subject, /[\r\n]/);
  assert.equal(cleanSubject("a\r\nb\nc"), "a b c");
  assert.doesNotMatch(mail.html, /<script>|<b>there|<Cafe>/);
  assert.match(mail.html, /Jo &lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
  assert.match(mail.html, /Hello &lt;b&gt;there&lt;\/b&gt; &amp; &quot;friends&quot; &#39;all&#39;/);
  assert.match(mail.html, /Jo&#39;s &lt;Cafe&gt; Ltd/);
});

test("the suggestion and claim notices escape every user value", () => {
  const s = buildSuggestionEmail(
    { businessName: "<b>Biz</b>", category: "Cafes\nBcc: x@y.com", address: "<i>1 Road</i>", website: "javascript:alert(1)", phone: "<01>", contactName: "<Jo>", contactEmail: "jo@example.com" },
    ADDR,
  );
  assert.doesNotMatch(s.html, /<b>Biz|<i>1 Road|<Jo>|href="javascript:/);
  assert.doesNotMatch(s.subject, /[\r\n]/);
  const c = buildClaimNotice(
    { businessName: "Biz", address: "1 Road, PR8 1AA", category: "Cafes", claimantName: "<Jo>", claimantEmail: "jo@example.com", message: "<script>x</script>", reviewUrl: "https://www.southportguide.co.uk/admin/claims" },
    ADDR,
  );
  assert.doesNotMatch(c.html, /<Jo>|<script>/);
  assert.equal(c.replyTo, "jo@example.com");
});

test("the reply-to is the enquirer's address, as one plain address", () => {
  assert.equal(buildEnquiryEmail(HOSTILE, { ...ADDR, replyTo: plainAddress(" jo@example.com ") }).replyTo, "jo@example.com");
  for (const bad of [
    "a@b.com, c@d.com",
    "Jo <jo@example.com>",
    "jo@example.com\nBcc: x@y.com",
    "jo @example.com",
    "jo;x@example.com",
    "no-at-sign.example.com",
    `${"a".repeat(250)}@b.com`,
    42,
  ]) {
    assert.equal(plainAddress(bad), null, String(bad));
    assert.equal(buildEnquiryEmail(HOSTILE, { ...ADDR, replyTo: plainAddress(bad) }).replyTo, undefined);
  }
});

test("a returned or thrown send error is logged with its name and message only", () => {
  const lines = [];
  logSendError("contact", "enquiry", { name: "validation_error", message: "The domain is not verified.", statusCode: 403 }, (l) => lines.push(l));
  logSendError("contact", "auto-reply", new TypeError("fetch failed"), (l) => lines.push(l));
  assert.deepEqual(lines, [
    "[contact] enquiry email failed: validation_error: The domain is not verified.",
    "[contact] auto-reply email failed: TypeError: fetch failed",
  ]);
});

// ── Misuse: field caps, auto-reply text, honeypot ─────────────────────────────

test("short fields are capped at 100 characters", () => {
  assert.equal(MAX_SHORT, 100);
  const limits = { name: MAX_SHORT, subject: MAX_SHORT, businessName: MAX_SHORT };
  assert.equal(firstTooLong({ name: "a".repeat(100), subject: "s", businessName: undefined }, limits), null);
  assert.equal(firstTooLong({ name: "a".repeat(101), subject: "s" }, limits), "name");
  assert.equal(firstTooLong({ name: "a", businessName: "b".repeat(101) }, limits), "businessName");
  assert.match(read("app/api/contact/route.ts"), /firstTooLong\(\{ name, subject, businessName \}, \{ name: MAX_SHORT, subject: MAX_SHORT, businessName: MAX_SHORT \}\)/);
  assert.match(read("app/api/suggest-listing/route.ts"), /businessName: MAX_SHORT, category: MAX_SHORT, contactName: MAX_SHORT/);
  // The claim schema moved to lib/claim-schema.ts (shared with its test); the route uses it.
  assert.match(read("lib/claim-schema.ts"), /name: z\.string\(\)\.trim\(\)\.min\(1\)\.max\(100\)/);
  assert.match(read("app/api/hub/claim/submit/route.ts"), /ClaimSchema\.safeParse\(body\)/);
});

test("the automatic reply carries no user-supplied text", () => {
  const reply = buildAutoReply({ from: "F <f@example.com>", to: "stranger@example.com" });
  assert.equal(reply.to, "stranger@example.com");
  assert.equal(buildAutoReply.length, 1, "takes the addresses only");
  assert.doesNotMatch(reply.html + reply.subject, /Jo|script|Advertise|Bcc/);
  assert.match(read("app/api/contact/route.ts"), /buildAutoReply\(\{ from: FROM_EMAIL, to: replyTo \}\)/);
  // The claim confirmation to the claimant greets no one by the name typed in.
  assert.doesNotMatch(read("app/api/hub/claim/submit/route.ts"), /Hi \$\{/);
});

test("a filled honeypot is detected; an empty one is not", () => {
  assert.equal(HONEYPOT_FIELD, "homepage");
  assert.equal(isHoneypotFilled({ homepage: "http://spam.example" }), true);
  assert.equal(isHoneypotFilled({ homepage: "" }), false);
  assert.equal(isHoneypotFilled({ homepage: "   " }), false);
  assert.equal(isHoneypotFilled({}), false);
  assert.equal(isHoneypotFilled(null), false);
});

test("every enquiry form has the hidden honeypot and sends it", () => {
  for (const file of ["app/contact/ContactClient.tsx", "app/suggest-listing/page.tsx", "app/claim-listing/ClaimListingClient.tsx"]) {
    const src = read(file);
    assert.match(src, /name="homepage" tabIndex=\{-1\} autoComplete="off"/, file);
    assert.match(src, /aria-hidden="true" className="absolute -left-\[9999px\]/, file);
  }
  assert.match(read("app/claim-listing/ClaimListingClient.tsx"), /homepage: form\.homepage/);
  assert.match(read("app/contact/ContactClient.tsx"), /body: JSON\.stringify\(form\)/);
  assert.match(read("app/suggest-listing/page.tsx"), /body: JSON\.stringify\(fields\)/);
});

// ── No affiliate links ────────────────────────────────────────────────────────

test("no affiliate domain or tag remains in app, lib, components, content or messages", () => {
  const AFF = /awin1\.com|awclick\.php|awinmid|awinaffid|tidd\.ly|prf\.hn|booking\.com[^"'\s]*[?&]aid=|[?&]affid=|clickref|amazon\.[a-z.]+\/[^"'\s]*[?&]tag=|laterooms|sykescottages|sykes cottages|cottages\.com|goape|go ape|championstravel|champions travel|affiliate-links/i;
  const hits = [];
  walk(["app", "lib", "components", "content", "messages"], /\.(tsx?|mjs|js|json|md)$/, (p, src) => {
    const m = src.match(AFF);
    if (m) hits.push(`${p}: ${m[0]}`);
  });
  assert.deepEqual(hits, []);
  assert.equal(existsSync(join(ROOT, "lib/affiliate-links.ts")), false);
});
