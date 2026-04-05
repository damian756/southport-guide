// Unsplash image fetcher for news items.
// Uses the Unsplash Source API to find a relevant image per news category.
// Returns { url, credit } or null if the API is unavailable.

const CATEGORY_KEYWORDS: Record<string, string> = {
  planning: "construction building architecture",
  business: "small business shop retail",
  sport: "football stadium sport",
  council: "government council meeting",
  community: "community neighbourhood people",
  events: "outdoor event festival crowd",
  "food-drink": "restaurant food dining",
  property: "house property real estate",
  "crime-safety": "police safety security",
  transport: "train station transport travel",
};

const FALLBACK_KEYWORD = "Southport England seaside town";

export interface UnsplashResult {
  url: string;
  credit: string; // "Photo by {name} on Unsplash"
}

export async function fetchUnsplashImage(
  category: string
): Promise<UnsplashResult | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;

  const keyword = CATEGORY_KEYWORDS[category] ?? FALLBACK_KEYWORD;

  try {
    const params = new URLSearchParams({
      query: keyword,
      per_page: "10",
      orientation: "landscape",
      content_filter: "high",
    });

    const res = await fetch(
      `https://api.unsplash.com/search/photos?${params}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
          "Accept-Version": "v1",
        },
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) return null;

    const data = (await res.json()) as {
      results?: Array<{
        urls?: { regular?: string };
        user?: { name?: string };
        links?: { html?: string };
      }>;
    };

    const results = data.results ?? [];
    if (results.length === 0) return null;

    // Pick a random result from the first 10 so cards don't all look the same
    const pick = results[Math.floor(Math.random() * results.length)];
    const url = pick.urls?.regular;
    const name = pick.user?.name ?? "Unsplash";

    if (!url) return null;

    return {
      url,
      credit: `Photo by ${name} on Unsplash`,
    };
  } catch {
    return null;
  }
}
