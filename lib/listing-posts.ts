// ── Posts about a listed place ───────────────────────────────────────────────
// Business slug -> blog post slugs. The listing page shows each as a plain
// "Read more" link under the description. Kept in code, not the database.
import { BLOG_POSTS, type BlogPost } from "@/lib/southport-data";

export const LISTING_POSTS: Record<string, string[]> = {
  "southport-agricultural-show": ["southport-agricultural-show-2027"],
};

/** The posts linked from a listing, in the order given above */
export function postsForListing(businessSlug: string): BlogPost[] {
  return (LISTING_POSTS[businessSlug] ?? [])
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined);
}
