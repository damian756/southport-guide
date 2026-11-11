// Dates for the sitemap's lastmod (app/sitemap.ts). lastmod is the day a page's
// content last changed, never the day of the build or the request; a page with no
// real date gets no lastmod rather than a made-up one.
// No imports, so tests/sitemap-dates.test.mjs can load this file.

const MONTHS: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

/**
 * "2026-11-11" or a post's "15 Feb 2026" -> that day at midnight UTC (not the
 * server's time zone). null when it cannot be read.
 */
export function utcDate(s: string | null | undefined): Date | null {
  if (!s) return null;
  let iso = s.trim();
  const m = iso.match(/^(\d{1,2}) ([A-Z][a-z]{2}) (\d{4})$/);
  if (m) {
    if (!MONTHS[m[2]]) return null;
    iso = `${m[3]}-${MONTHS[m[2]]}-${m[1].padStart(2, "0")}`;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  return isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== iso ? null : d;
}

/** The latest of the dates given, ignoring missing ones; null if there are none. */
export function later(...dates: (Date | null | undefined)[]): Date | null {
  return dates.reduce<Date | null>((a, d) => (d && (!a || d > a) ? d : a), null);
}

/** A post's lastmod: the last change to its words, else the date it shows. */
export function postLastmod(post: { date: string; dateModified?: string }): Date | null {
  return utcDate(post.dateModified) ?? utcDate(post.date);
}

/** Spread into a sitemap entry: lastModified only when there is a real date. */
export function lastmod(d: Date | null | undefined): { lastModified?: Date } {
  return d ? { lastModified: d } : {};
}
