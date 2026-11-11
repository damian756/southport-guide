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

/** The day this file's replacement first changed every property page's title, description and FAQ (commit 07540f0). */
export const PROPERTY_TEXT_CHANGED = "2026-11-11";

export type UnitMetaInput = {
  postcode: string;
  metaTitle?: unknown;
  metaDescription?: unknown;
  avgPrice3yr?: number | null;
};

/** A postcode unit page's title and description: the page (generateMetadata) and the sitemap both use this. */
export function unitMeta(u: UnitMetaInput, areaLabel: string): { title: string; description: string } {
  const title = withoutEmDash(
    (u.metaTitle as string | null | undefined) ?? `House Prices in ${u.postcode}: ${areaLabel}, Southport`);
  const description = withoutEmDash(
    (u.metaDescription as string | null | undefined) ??
    `Average house price in ${u.postcode} is £${((u.avgPrice3yr ?? 0) / 1000).toFixed(0)}k. See recent sales and local data.`);
  return { title, description };
}

/**
 * Postcode pages for the sitemap (Damian, 11 Nov 2026: pages that can rank are listed).
 * Pages whose title and description match another page's apart from the postcode are
 * near-duplicates and are left out, every page of such a group.
 */
export function distinctUnitPages<T extends { postcode: string; title: string; description: string }>(
  pages: T[],
): { kept: T[]; left: T[] } {
  const key = (p: T) => {
    const spaced = p.postcode;
    const bare = spaced.replace(/\s+/g, "");
    const mask = (s: string) => s.split(spaced).join("#").split(bare).join("#").split(bare.toLowerCase()).join("#");
    return `${mask(p.title)}\n${mask(p.description)}`;
  };
  const counts = new Map<string, number>();
  for (const p of pages) counts.set(key(p), (counts.get(key(p)) ?? 0) + 1);
  return {
    kept: pages.filter((p) => counts.get(key(p)) === 1),
    left: pages.filter((p) => (counts.get(key(p)) ?? 0) > 1),
  };
}
