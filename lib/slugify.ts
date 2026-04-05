// Slug utilities for news article URLs.
// makeNewsSlug appends the first 8 chars of the UUID so slugs are always unique
// even when two articles share a similar title.

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .slice(0, 70);
}

export function makeNewsSlug(title: string, id: string): string {
  const base = slugify(title);
  const suffix = id.slice(0, 8);
  return `${base}-${suffix}`;
}
