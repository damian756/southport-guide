// Slug utilities for news article URLs.

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .slice(0, 80);
}

// Used as a fallback only — makeUniqueNewsSlug is preferred at publish time.
export function makeNewsSlug(title: string, id: string): string {
  const base = slugify(title);
  const suffix = id.slice(0, 8);
  return `${base}-${suffix}`;
}

// Returns a clean slug without a hex suffix.
// Pass an async exists() checker so the caller can handle collision by appending -2, -3 etc.
export async function makeUniqueNewsSlug(
  title: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  const base = slugify(title);
  if (!(await exists(base))) return base;

  for (let i = 2; i <= 99; i++) {
    const candidate = `${base}-${i}`;
    if (!(await exists(candidate))) return candidate;
  }

  // Absolute fallback — should never be hit in practice
  return `${base}-${Date.now()}`;
}
