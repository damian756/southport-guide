// Property page text from the database (written by scripts/property/push-*-content.ts):
// the stored titles, descriptions and FAQ answers use the em dash, which may not appear
// in anything a visitor sees (C:\Projects\CLAUDE.md). Replaced when the page renders, so
// a later run of the push scripts cannot bring it back. One dash introduces what
// follows, so it becomes a colon ("House Prices in PR8 1AF: Blowick, Southport"); two
// or more mark an aside, so they become commas. Terry's editorial summaries are his
// voice and are left as written.
// Pure functions, no imports: tests/property-text.test.mjs loads this file.

const DASH = /\s*\u2014\s*/g;

export function withoutEmDash(text: string): string;
export function withoutEmDash(text: string | null | undefined): string | null | undefined;
export function withoutEmDash(text: string | null | undefined): string | null | undefined {
  if (!text) return text;
  const count = (text.match(/\u2014/g) || []).length;
  if (count === 0) return text;
  return text.replace(DASH, count === 1 ? ": " : ", ");
}

export type FaqItem = { question: string; answer: string };

export function faqWithoutEmDash(items: FaqItem[]): FaqItem[] {
  return items.map((f) => ({ ...f, question: withoutEmDash(f.question), answer: withoutEmDash(f.answer) }));
}
