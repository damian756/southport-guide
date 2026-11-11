// Forgiving business-name search for the claim page (app/api/hub/claim/search).
// An owner types the name as they say it, not as it is stored, so:
//  - "and" and "&" count the same, and so does a leading (or any) "The";
//  - punctuation and apostrophes are ignored ("Silcocks" finds "Silcock's");
//  - every remaining word must appear somewhere in the name, in any order,
//    as part of a word ("Scarisbrick Hotel" finds "The Scarisbrick Hotel");
//  - if no name has every word, names with the most of them come first
//    ("Scarisbrick Hotel Southport" still finds "Scarisbrick Hotel").
// Pure functions, no imports: tests/claim-search.test.mjs loads this file.

const STOP_WORDS = new Set(["the", "and"]);

/**
 * The search words for a query: lower case, "&" read as "and", apostrophes
 * and other punctuation removed, "the" and "and" left out, and a trailing
 * "s" dropped from longer words so "Silcocks" also matches "Silcock's".
 * Each word is then matched as a case-insensitive substring of the stored name.
 */
export function searchTokens(query: string): string[] {
  const cleaned = query
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’‘`]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
  const words = cleaned.split(/\s+/).filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
  return [...new Set(words.map((w) => (w.length > 4 && w.endsWith("s") ? w.slice(0, -1) : w)))];
}

/** How many of the words a stored name contains (case-insensitive substring, as the database matches). */
export function tokensMatched(name: string, tokens: string[]): number {
  const n = name.toLowerCase();
  return tokens.filter((t) => n.includes(t)).length;
}

/** True when a stored name contains every search word. */
export function nameMatches(name: string, tokens: string[]): boolean {
  return tokens.length > 0 && tokensMatched(name, tokens) === tokens.length;
}

/**
 * Best matches first: names with every word, then names with the most words,
 * then shorter names (closer to what was typed), then A to Z. Names with no
 * word at all are dropped.
 */
export function rankByMatch<T extends { name: string }>(rows: T[], tokens: string[]): T[] {
  return rows
    .map((r) => ({ r, m: tokensMatched(r.name, tokens) }))
    .filter((x) => x.m > 0)
    .sort((a, b) => b.m - a.m || a.r.name.length - b.r.name.length || a.r.name.localeCompare(b.r.name))
    .map((x) => x.r);
}
