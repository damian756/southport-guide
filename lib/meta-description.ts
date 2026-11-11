// Meta description from a longer piece of copy (a post's excerpt): its whole
// sentences up to about 160 characters, so the search snippet ends on a full stop
// instead of being cut off mid-word. When whole sentences would leave it short
// (under 120), the copy is used whole, as before. The copy itself is not changed.
// No imports, so tests/meta-description.test.mjs can load this file.

export function metaDescription(text: string, max = 160, min = 120): string {
  const copy = text.replace(/\s+/g, " ").trim();
  if (copy.length <= max) return copy;
  // A sentence ends at . ! or ? followed by a space, so "4.6" and "£3.95" stay whole.
  const sentences = copy.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const s of sentences) {
    const next = out ? `${out} ${s}` : s;
    if (next.length > max) break;
    out = next;
  }
  return out.length >= min ? out : copy;
}
