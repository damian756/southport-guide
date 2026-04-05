// Unsplash image fetcher for news items.
// Builds a contextual query from the article title keywords + category fallback.
// Returns { url, credit } or null if the API is unavailable.

const CATEGORY_KEYWORDS: Record<string, string> = {
  planning: "construction building architecture",
  business: "small business shop retail",
  sport: "football stadium sport",
  council: "government council meeting",
  community: "community neighbourhood volunteers",
  events: "outdoor event festival crowd",
  "food-drink": "restaurant food dining",
  property: "house property real estate",
  "crime-safety": "police safety security",
  transport: "train station transport travel",
};

const FALLBACK_KEYWORD = "Southport England seaside town";

// Common English stop words to strip before using title as a query
const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "as","by","from","is","are","was","were","be","been","being","have","has",
  "had","do","does","did","will","would","could","should","may","might",
  "that","this","these","those","it","its","not","no","so","up","out",
  "if","after","over","about","into","than","more","also","been","just",
  "new","two","three","four","five","six","seven","eight","nine","ten",
  "southport","sefton","merseyside","lancashire",
]);

function extractTitleKeywords(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w))
    .slice(0, 4)
    .join(" ");
}

export interface UnsplashResult {
  url: string;
  credit: string; // "Photo by {name} on Unsplash"
}

export async function fetchUnsplashImage(
  category: string,
  title?: string
): Promise<UnsplashResult | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;

  const categoryKeyword = CATEGORY_KEYWORDS[category] ?? FALLBACK_KEYWORD;

  // Build a query that blends title keywords with the category fallback
  const titleKeywords = title ? extractTitleKeywords(title) : "";
  const query = titleKeywords
    ? `${titleKeywords} ${categoryKeyword.split(" ")[0]}`
    : categoryKeyword;

  try {
    const params = new URLSearchParams({
      query,
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

    let results = data.results ?? [];

    // If title-based query returned nothing, fall back to category-only
    if (results.length === 0 && titleKeywords) {
      const fallbackParams = new URLSearchParams({
        query: categoryKeyword,
        per_page: "10",
        orientation: "landscape",
        content_filter: "high",
      });
      const fallbackRes = await fetch(
        `https://api.unsplash.com/search/photos?${fallbackParams}`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
            "Accept-Version": "v1",
          },
          next: { revalidate: 0 },
        }
      );
      if (fallbackRes.ok) {
        const fallbackData = (await fallbackRes.json()) as { results?: typeof results };
        results = fallbackData.results ?? [];
      }
    }

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
