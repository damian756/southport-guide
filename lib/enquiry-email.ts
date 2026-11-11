// ── Enquiry emails: pure helpers ──────────────────────────────────────────────
// Builds the emails the enquiry routes send (contact form, suggest a listing,
// admin notice of a new claim) and logs a failed send. No imports, no I/O, so
// tests/enquiry-email.test.mjs can load this file directly with Node.
//
// Rules: every user value is escaped before it goes into HTML; anything placed
// in a subject line has CR and LF removed; the reply-to is one plain address.
// Against misuse of the forms to mail strangers: short fields are capped at
// 100 characters, the automatic reply carries no user-supplied text, and a
// hidden honeypot field, when filled, means "accept quietly and send nothing".

/** Hidden field on every enquiry form. People never see it; bots fill it in. */
export const HONEYPOT_FIELD = "homepage";

/** True when the hidden honeypot field was filled in (a bot): reply ok, send nothing. */
export function isHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const v = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof v === "string" ? v.trim().length > 0 : v !== undefined && v !== null && v !== false && v !== "";
}

/** Longest value accepted for a short one-line field (name, subject, business name). */
export const MAX_SHORT = 100;

/** The first field whose value is longer than its limit, or null. */
export function firstTooLong(fields: Record<string, unknown>, limits: Record<string, number>): string | null {
  for (const [key, max] of Object.entries(limits)) {
    const v = fields[key];
    if (typeof v === "string" && v.length > max) return key;
  }
  return null;
}

export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One line: CR and LF become spaces, runs of spaces collapse. */
export function cleanSubject(value: unknown): string {
  return String(value ?? "").replace(/[\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

/**
 * The value as one plain email address, or null. No display name, commas,
 * semicolons, angle brackets, quotes, spaces or line breaks; at most 254 characters.
 */
export function plainAddress(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (v.length === 0 || v.length > 254) return null;
  if (!/^[^\s@,;<>"'()\[\]\\]+@[^\s@,;<>"'()\[\]\\]+\.[^\s@,;<>"'()\[\]\\]+$/.test(v)) return null;
  return v;
}

/** An http(s) URL to put in an href, or null. */
export function safeHttpUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Log a failed send for Vercel's logs: the error's name and message only,
 * never the enquirer's text.
 */
export function logSendError(
  route: string,
  what: string,
  err: unknown,
  log: (line: string) => void = (line) => console.error(line),
): void {
  let name = "Error";
  let message = "unknown error";
  if (err && typeof err === "object") {
    const e = err as { name?: unknown; message?: unknown };
    if (typeof e.name === "string" && e.name) name = e.name;
    if (typeof e.message === "string" && e.message) message = e.message;
  } else if (typeof err === "string" && err) {
    message = err;
  }
  log(`[${route}] ${what} email failed: ${cleanSubject(name)}: ${cleanSubject(message)}`);
}

// ── Building the emails ─────────────────────────────────────────────────────

export type Addresses = { from: string; to: string; replyTo?: string | null };
export type Email = { from: string; to: string; replyTo?: string; subject: string; html: string };

type Row = { label: string; value: unknown; kind?: "text" | "email" | "url" };

function rowHtml({ label, value, kind = "text" }: Row): string {
  if (value === null || value === undefined || value === "") return "";
  const text = escapeHtml(value);
  let cell = `<span style="color: #1B2E4B;">${text}</span>`;
  if (kind === "email" && plainAddress(value)) {
    cell = `<a href="mailto:${text}" style="color: #C9A84C;">${text}</a>`;
  } else if (kind === "url") {
    const url = safeHttpUrl(value);
    if (url) cell = `<a href="${escapeHtml(url)}" style="color: #C9A84C;">${text}</a>`;
  }
  return `<tr><td style="padding: 8px 0; color: #888; font-size: 13px; width: 130px; vertical-align: top;">${escapeHtml(label)}</td><td style="padding: 8px 0;">${cell}</td></tr>`;
}

function layout(kicker: string, body: string): string {
  return `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 32px; border-radius: 8px;">
  <div style="border-bottom: 3px solid #C9A84C; padding-bottom: 16px; margin-bottom: 24px;">
    <h1 style="font-size: 24px; color: #1B2E4B; margin: 0;">Southport<span style="color: #C9A84C;">Guide</span><span style="color: #999; font-size: 14px;">.co.uk</span></h1>
    <p style="color: #666; font-size: 13px; margin: 4px 0 0;">${escapeHtml(kicker)}</p>
  </div>
  ${body}
  <p style="color: #999; font-size: 12px; text-align: center; margin-top: 24px;">SouthportGuide.co.uk. Built by <a href="https://churchtownmedia.co.uk" style="color: #C9A84C;">Churchtown Media</a></p>
</div>`;
}

function messageHtml(message: unknown): string {
  if (!message) return "";
  return `
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
    <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Message</p>
    <p style="color: #1B2E4B; line-height: 1.7; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
  </div>`;
}

function withReplyTo(addr: Addresses, subject: string, html: string): Email {
  const email: Email = { from: addr.from, to: addr.to, subject: cleanSubject(subject), html };
  const replyTo = plainAddress(addr.replyTo);
  if (replyTo) email.replyTo = replyTo;
  return email;
}

export type ContactEnquiry = {
  name: string;
  email: string;
  subject: string;
  message: string;
  businessName?: string;
};

/** The contact form (and advertising) enquiry, to the delivery inbox. */
export function buildEnquiryEmail(e: ContactEnquiry, addr: Addresses): Email {
  const subjectLine = `${e.subject}${e.businessName ? `: ${e.businessName}` : ""}`;
  const rows = [
    rowHtml({ label: "Subject", value: cleanSubject(subjectLine) }),
    rowHtml({ label: "From", value: e.name }),
    rowHtml({ label: "Email", value: e.email, kind: "email" }),
  ].join("");
  const html = layout(
    "New contact form submission",
    `<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">${rows}</table>${messageHtml(e.message)}
  <p style="color: #999; font-size: 12px; text-align: center;">Reply to this email to answer ${escapeHtml(e.name)}.</p>`,
  );
  return withReplyTo(addr, `[SouthportGuide] ${subjectLine}`, html);
}

/**
 * The automatic "thanks" to the address typed into the contact form. It holds
 * no user-supplied text, so the form cannot be used to send a message of
 * someone else's choosing to a stranger.
 */
export function buildAutoReply(addr: Addresses): Email {
  const html = layout(
    "Thanks for getting in touch",
    `<p style="color: #1B2E4B; font-size: 16px;">Hello,</p>
  <p style="color: #555; line-height: 1.7;">Thanks for getting in touch. We have received your message. We reply within one working day.</p>
  <p style="color: #555; line-height: 1.7;">In the meantime, the guide is at <a href="https://www.southportguide.co.uk" style="color: #C9A84C;">southportguide.co.uk</a>.</p>
  <p style="color: #1B2E4B; margin-top: 24px;">The SouthportGuide team</p>`,
  );
  return { from: addr.from, to: addr.to, subject: "Thanks for getting in touch. SouthportGuide.co.uk", html };
}

export type ListingSuggestion = {
  businessName: string;
  category: string;
  address?: string;
  website?: string;
  phone?: string;
  contactName: string;
  contactEmail: string;
};

/** A suggested listing, to the delivery inbox. */
export function buildSuggestionEmail(s: ListingSuggestion, addr: Addresses): Email {
  const rows = [
    rowHtml({ label: "Business name", value: s.businessName }),
    rowHtml({ label: "Category", value: s.category }),
    rowHtml({ label: "Address", value: s.address || "Not provided" }),
    rowHtml({ label: "Website", value: s.website, kind: "url" }),
    rowHtml({ label: "Phone", value: s.phone }),
    rowHtml({ label: "Submitted by", value: s.contactName }),
    rowHtml({ label: "Contact email", value: s.contactEmail, kind: "email" }),
  ].join("");
  const html = layout(
    "New business listing suggestion",
    `<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">${rows}</table>
  <p style="color: #999; font-size: 12px; text-align: center;">Reply to this email to contact ${escapeHtml(s.contactName)}.</p>`,
  );
  return withReplyTo(addr, `[SouthportGuide] New listing suggestion: ${s.businessName}`, html);
}

export type ClaimNotice = {
  businessName: string;
  address: string;
  category: string;
  claimantName: string;
  claimantEmail: string;
  message?: string | null;
  reviewUrl: string;
  /** Listing(s) this email already manages, if any: the admin decides. */
  alreadyManages?: string | null;
};

/** The admin notice of a new claim request, to the delivery inbox. */
export function buildClaimNotice(c: ClaimNotice, addr: Addresses): Email {
  const rows = [
    rowHtml({ label: "Business", value: c.businessName }),
    rowHtml({ label: "Address", value: c.address }),
    rowHtml({ label: "Category", value: c.category }),
    rowHtml({ label: "Claimant", value: c.claimantName }),
    rowHtml({ label: "Email", value: c.claimantEmail, kind: "email" }),
    ...(c.alreadyManages ? [rowHtml({ label: "Note", value: `This email already manages: ${c.alreadyManages}` })] : []),
  ].join("");
  const review = safeHttpUrl(c.reviewUrl);
  const html = layout(
    "New claim request",
    `<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">${rows}</table>${messageHtml(c.message)}
  ${review ? `<p style="margin-top: 24px;"><a href="${escapeHtml(review)}" style="display: inline-block; background: #C9A84C; color: #1B2E4B; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Review claims</a></p>` : ""}`,
  );
  return withReplyTo(addr, `[SouthportGuide] New claim request: ${c.businessName}`, html);
}
