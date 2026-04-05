// Keyword-based news categorizer — runs at scrape time, zero LLM cost.
// Uses a scoring approach: counts all keyword matches per category and picks the winner.
// Multi-word phrases score higher than single words (more specific = more confident).
// Claude then confirms or corrects the category at approve time.

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "food-drink": [
    "restaurant", "cafe", "coffee shop", "dining", "eating out", "food", "pub", "bar",
    "menu", "chef", "pizza", "curry", "bakery", "diner", "kitchen", "takeaway",
    "bistro", "brasserie", "bisto", "butty", "brunch", "supper club",
  ],
  business: [
    "new business", "company opens", "new shop", "retail", "store opens", "business opens",
    "investment", "jobs created", "new jobs", "employs", "enterprise", "launch",
    "opens its doors", "new opening", "expanding",
  ],
  sport: [
    "southport fc", "haig avenue", "sandgrounders", "fa trophy", "fa cup", "football match",
    "league table", "fixture", "goal", "manager", "squad", "wembley",
    "rugby", "cricket", "athletics", "golf tournament", "swimming gala",
    "sport", "sporting",
  ],
  council: [
    "sefton council", "councillor", "council cabinet", "council committee",
    "local authority", "council budget", "council meeting", "consultation",
    "mp ", "local election", "vote", "parliament",
  ],
  events: [
    "festival", "open day", "concert", "gig", "show", "fair", "exhibition",
    "airshow", "flower show", "market stall", "ceremony", "parade",
    "charity event", "fundraising event", "carnival",
  ],
  planning: [
    "planning application", "planning permission", "planning notice", "planning appeal",
    "planning approval", "planning committee", "demolish", "building works",
    "development proposal", "listed building consent",
  ],
  community: [
    "volunteer", "spring clean", "litter pick", "fundrais", "donation",
    "lifeboat", "rnli", "rescue", "community group", "charity fundrais",
    "church", "raffle", "clean up", "neighbourhood", "community centre",
    "food bank", "homeless", "age uk", "samaritans",
  ],
  "crime-safety": [
    "police", "arrested", "crime", "theft", "assault", "drug dealing",
    "criminal", "sentenced", "jailed", "court", "stabbing", "robbery",
    "fraud", "missing person", "wanted", "merseyside police",
  ],
  property: [
    "house price", "property market", "estate agent", "housing development",
    "sold for", "rent", "landlord", "mortgage", "new homes", "development site",
    "planning approved for homes",
  ],
  transport: [
    "road closure", "train service", "bus route", "traffic closure",
    "rail", "pothole", "bypass", "transport link", "parking charges",
    "speed limit", "roadworks",
  ],
};

/**
 * Scores text against all categories using weighted keyword matching.
 * Multi-word phrases score 3× vs single-word keywords — more specific = more confident.
 * Returns the highest-scoring category, or `defaultCategory` if nothing matches.
 */
export function detectNewsCategory(
  text: string,
  defaultCategory = "community"
): string {
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        score += kw.includes(" ") ? 3 : 1;
      }
    }
    scores[category] = score;
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] > 0 ? best[0] : defaultCategory;
}
