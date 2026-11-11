// ── Listing order and paid labels ────────────────────────────────────────────
// What pays changes order, and is labelled: an active category boost (first),
// then a Pro listing (hubTier "pro", with a subscription behind it: the category
// query reports "pro" only then) in its own primary category. Nothing else
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

/** A category page has up to two Featured places. */
export const MAX_FEATURED = 2;

/**
 * The paid places featured on a category page: boosted listings first, then
 * Pro listings in their primary category, in the order they came in, at most
 * MAX_FEATURED in all. Paid places beyond that keep their normal place.
 */
export function featuredPlaces<T extends OrderableListing>(
  listings: T[],
  opts: { categoryId: string; boostedIds: Iterable<string> },
): { boosted: string[]; pro: string[] } {
  const boostedSet = new Set(opts.boostedIds);
  const boosted = listings.filter((b) => boostedSet.has(b.id)).map((b) => b.id);
  const pro = listings.filter((b) => !boostedSet.has(b.id) && isPaidFeatured(b, opts.categoryId)).map((b) => b.id);
  const picked = new Set([...boosted, ...pro].slice(0, MAX_FEATURED));
  return { boosted: boosted.filter((id) => picked.has(id)), pro: pro.filter((id) => picked.has(id)) };
}

/**
 * The Featured places (up to two: boosts first, then Pro in its primary
 * category) first, then everyone else, each group keeping the order it came in.
 */
export function orderListings<T extends OrderableListing>(
  listings: T[],
  opts: { categoryId: string; boostedIds: Iterable<string> },
): T[] {
  const featured = featuredPlaces(listings, opts);
  const boosted = new Set(featured.boosted);
  const pro = new Set(featured.pro);
  const rank = (b: T) => (boosted.has(b.id) ? 0 : pro.has(b.id) ? 1 : 2);
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
