// Editorial listing blocks (guide pages, The Open pages) show no paid places.
// A place is paid while it is on Pro (hubTier "pro") or while one of its
// boosts is running. Paid places appear only on category pages, labelled.
// The admin-set listingTier is not paid for and is not a reason to show or hide.
export function unpaidListingWhere(now: Date = new Date()) {
  return {
    hubTier: { not: "pro" },
    boosts: { none: { status: "active", startsAt: { lte: now }, endsAt: { gte: now } } },
  };
}
