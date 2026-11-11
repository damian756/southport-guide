// The claim form's rules and its error messages, shared by the submit route
// (app/api/hub/claim/submit) and the form (app/claim-listing). The route
// answers a refused field with a plain sentence per field, never an error
// object, so the form can show each message beside its field.
// No imports, so the form can use it without pulling in zod; the schema is
// in lib/claim-schema.ts. tests/claim-form.test.mjs loads both.

export const MAX_NAME = 100;
export const MAX_MESSAGE = 2000;

export type ClaimField = "businessId" | "name" | "email" | "message";

export const CLAIM_FIELD_MESSAGES: Record<ClaimField, string> = {
  businessId: "Choose your business from the search first.",
  name: `Enter your name, up to ${MAX_NAME} characters.`,
  email: "Enter a full email address, such as you@yourbusiness.co.uk.",
  message: `Keep the message to ${MAX_MESSAGE.toLocaleString("en-GB")} characters or fewer.`,
};

export const CLAIM_FORM_ERROR = "Please check the fields marked below.";

/** One plain message per refused field, from zod's issues. */
export function claimFieldErrors(issues: { path: readonly PropertyKey[] }[]): Partial<Record<ClaimField, string>> {
  const out: Partial<Record<ClaimField, string>> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "") as ClaimField;
    if (key in CLAIM_FIELD_MESSAGES && !out[key]) out[key] = CLAIM_FIELD_MESSAGES[key];
  }
  return out;
}

/**
 * The sentence the form shows for a refused submission, whatever shape the
 * answer has. A string error is shown as it is; anything else (an object, a
 * missing field) becomes a plain sentence, so the form can never try to
 * render an object.
 */
export function submitErrorText(data: unknown): string {
  const err = data && typeof data === "object" ? (data as { error?: unknown }).error : undefined;
  if (typeof err === "string" && err.trim()) return err;
  if (err && typeof err === "object") return CLAIM_FORM_ERROR;
  return "Something went wrong. Please try again.";
}

/** The field messages in a refused submission, keeping only strings. */
export function submitFieldErrors(data: unknown): Partial<Record<ClaimField, string>> {
  // The answer's own fieldErrors, or (older shape) the ones inside an error object
  const d = data && typeof data === "object" ? (data as { fieldErrors?: unknown; error?: unknown }) : {};
  const inner = d.error && typeof d.error === "object" ? (d.error as { fieldErrors?: unknown }).fieldErrors : undefined;
  const fe = d.fieldErrors ?? inner;
  const out: Partial<Record<ClaimField, string>> = {};
  if (!fe || typeof fe !== "object") return out;
  for (const key of Object.keys(CLAIM_FIELD_MESSAGES) as ClaimField[]) {
    const v = (fe as Record<string, unknown>)[key];
    if (typeof v === "string" && v) out[key] = v;
    else if (Array.isArray(v) && typeof v[0] === "string") out[key] = CLAIM_FIELD_MESSAGES[key];
  }
  return out;
}

/** The reply-time promise for claims and listing enquiries (Damian, 11 Nov 2026). */
export const REPLY_TIME = "We reply within one working day.";
