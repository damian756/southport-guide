// ── Listing order and paid labels ────────────────────────────────────────────
// What pays changes order, and is labelled: an active category boost (first),
// then a Pro listing (hubTier "pro") in its own primary category. Nothing else
// changes the order: the admin-set `listingTier` (standard, featured, premium)
// is not paid for, so it neither sorts first nor earns a badge. A Pro listing
// that lapses or is cancelled has hubTier "free" again and loses both.
// Pure functions, no imports: tests/listing-order.test.mjs loads this file.

export const PRO_BADGE = "Featured · Paid placement";
export const BOOST_BADGE = "Featured This Week · Paid placement";

export type OrderableListing = {
  id: string;
  hubTier?: string | null;
  categoryId?: string | null;
};

/** A Pro listing shown in its own primary category: sorts above standard listings and is labelled as paid. */
export function isPaidFeatured(listing: OrderableListing, categoryId: string): boolean {
  return listing.hubTier === "pro" && listing.categoryId === categoryId;
}

/**
 * Boosted listings first (as before), then Pro listings in their primary
 * category, then everyone else, each group keeping the order it came in.
 */
export function orderListings<T extends OrderableListing>(
  listings: T[],
  opts: { categoryId: string; boostedIds: Iterable<string> },
): T[] {
  const boosted = new Set(opts.boostedIds);
  const rank = (b: T) => (boosted.has(b.id) ? 0 : isPaidFeatured(b, opts.categoryId) ? 1 : 2);
  return listings
    .map((b, i) => ({ b, i, r: rank(b) }))
    .sort((x, y) => x.r - y.r || x.i - y.i)
    .map((x) => x.b);
}

/** The paid label for a listing card, or null for an unpaid one. */
export function paidBadge(listing: OrderableListing, opts: { categoryId: string; boostedIds: Iterable<string> }): string | null {
  if (new Set(opts.boostedIds).has(listing.id)) return BOOST_BADGE;
  if (isPaidFeatured(listing, opts.categoryId)) return PRO_BADGE;
  return null;
}
