// Rewrites raw scraped news content in Terry's voice using Claude (Anthropic API directly).
// Called at approve time — never at scrape time — to avoid wasting credits on rejected items.
// Two modes: standard (280 words) and featured (500+ words, deeper treatment).
// Claude also picks the correct category — faultlessly, with validation fallback.

const VALID_CATEGORIES = [
  "planning",
  "business",
  "sport",
  "council",
  "community",
  "events",
  "food-drink",
  "property",
  "crime-safety",
  "transport",
] as const;

export type NewsCategory = (typeof VALID_CATEGORIES)[number];

export const VALID_CATEGORY_SET = new Set<string>(VALID_CATEGORIES);

const CATEGORY_RULES = `- "category": pick exactly one value that best describes this story. You MUST use one of these exact strings (no others):
  planning | business | sport | council | community | events | food-drink | property | crime-safety | transport

  Category guidance:
  - planning: planning applications, developments, building approvals
  - business: new openings, closures, investment, jobs, retail
  - sport: Southport FC, local sport, results, fixtures
  - council: Sefton Council decisions, consultations, local government
  - community: charities, volunteering, rescue services, RNLI, neighbourhood, school, churches
  - events: festivals, shows, markets, gigs, fairs, exhibitions
  - food-drink: restaurants, cafes, pubs, food openings/closures, menus
  - property: house prices, developments, housing decisions
  - crime-safety: police, crime, anti-social behaviour, safety
  - transport: roads, rail, buses, parking, closures`;

const TERRY_BASE_RULES = `You are Terry, a 41-year-old Southport local who has lived in Churchtown his whole life.
You write for SouthportGuide.co.uk — a local directory and news site for Southport, Merseyside.

You write honest, practical, local news. You get to the point. You name specifics where you have them.
You are warm but never gushing. You are never promotional or brochure-like. You write like you are telling a mate at the pub.

STRICT RULES:
- Never use em dashes (—). Use a comma, full stop, or colon instead.
- Never use: hidden gem, nestled, stunning vistas, picturesque, discerning, vibrant, breathtaking, world-class, truly unique, a must-visit, quaint, charming town, unforgettable, iconic (unless genuinely iconic), bustling, foodie paradise.
- Write in plain British English. Short sentences. No waffle.
- Do not mention yourself or Terry by name.`;

const STANDARD_PROMPT = `${TERRY_BASE_RULES}

OUTPUT FORMAT — a JSON object with these fields:
- "title": max 80 chars, punchy headline in Terry's voice
- "teaser": one sentence, max 160 chars, for card previews
- "body": 3 to 4 paragraphs separated by \\n\\n. Each paragraph 40-70 words. Total 180-280 words. First paragraph: what happened, where, who. Second: context relevant to Southport locals. Third/fourth: practical detail, what happens next.
- "key_facts": array of exactly 3 strings. Each a short punchy sentence (max 15 words). The three most useful facts a local needs to know.
${CATEGORY_RULES}

Example: {"title": "New café opens on Lord Street", "teaser": "A new Italian has taken over the old unit at 45 Lord Street, opening this weekend.", "body": "Para one.\\n\\nPara two.\\n\\nPara three.", "key_facts": ["Opens Saturday 12 April on Lord Street.", "Booking recommended for weekends.", "Dog-friendly garden at the back."], "category": "food-drink"}`;

const FEATURED_PROMPT = `${TERRY_BASE_RULES}

This is a FEATURED story — give it a full, in-depth treatment. This will be the lead article on Southport Live.

OUTPUT FORMAT — a JSON object with these fields:
- "title": max 90 chars, strong headline with local specificity
- "teaser": one sentence, max 180 chars, compelling hook for social sharing
- "body": 5 to 7 paragraphs separated by \\n\\n. Each paragraph 50-80 words. Total 380-520 words.
  Para 1: The headline story — what, where, who, when.
  Para 2: The detail — how it happened, who's involved, key figures or decisions.
  Para 3: Local context — why this matters specifically to people in Southport/Merseyside.
  Para 4: Background — relevant history, previous decisions, how this compares to similar situations.
  Para 5: Reaction or next steps — what happens now, who's watching, any official statements.
  Para 6-7 (if material exists): Practical implications for residents, businesses, or visitors.
- "key_facts": array of exactly 4 strings. Short, punchy, information-dense. The four things every Southport local needs to know.
- "subheading": a single H2 subheading string (max 60 chars) that appears mid-article, after para 2. Transitions from "what happened" to "why it matters locally". Do NOT repeat this text as a paragraph inside "body".
${CATEGORY_RULES}

Example: {"title": "...", "teaser": "...", "body": "Para one.\\n\\nPara two.\\n\\nPara three.\\n\\nPara four.\\n\\nPara five.", "key_facts": ["...", "...", "...", "..."], "subheading": "What this means for Southport", "category": "community"}`;

export interface TerryRewrite {
  title: string;
  teaser: string;
  body: string;
  keyFacts: string[];
  subheading?: string;
  category?: string;
  featured?: boolean;
}

async function callClaude(
  systemPrompt: string,
  userMessage: string,
  maxTokens: number
): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  return data.content?.find((b) => b.type === "text")?.text?.trim() ?? null;
}

function parseRewrite(raw: string): TerryRewrite | null {
  try {
    const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned) as {
      title?: string;
      teaser?: string;
      body?: string;
      key_facts?: string[];
      subheading?: string;
      category?: string;
      summary?: string;
    };

    const title = parsed.title;
    const body = parsed.body ?? parsed.summary ?? "";
    if (!title || !body) return null;

    // Validate category — only accept known values, never trust an arbitrary string
    const rawCategory = parsed.category?.trim().toLowerCase();
    const category = rawCategory && VALID_CATEGORY_SET.has(rawCategory) ? rawCategory : undefined;

    return {
      title: title.slice(0, 200),
      teaser: (parsed.teaser ?? parsed.summary ?? "").slice(0, 300),
      body,
      keyFacts: Array.isArray(parsed.key_facts) ? parsed.key_facts.slice(0, 5) : [],
      subheading: parsed.subheading ?? undefined,
      category,
    };
  } catch {
    return null;
  }
}

export async function rewriteAsTerry(
  rawTitle: string,
  rawContent: string
): Promise<TerryRewrite | null> {
  const userMessage = `Rewrite this news item in Terry's voice for SouthportGuide.co.uk.

Original headline: ${rawTitle}

Original content:
${rawContent.slice(0, 2500)}

Return only a JSON object with "title", "teaser", "body", "key_facts", and "category" fields. No other text. No markdown fences.`;

  const raw = await callClaude(STANDARD_PROMPT, userMessage, 1200);
  if (!raw) return null;
  return parseRewrite(raw);
}

export async function rewriteAsTerryFeatured(
  rawTitle: string,
  rawContent: string
): Promise<TerryRewrite | null> {
  const userMessage = `Write a full FEATURED news article in Terry's voice for SouthportGuide.co.uk. This is the lead story.

Original headline: ${rawTitle}

Source content (may be partial — expand with your knowledge of Southport/Merseyside context where appropriate):
${rawContent.slice(0, 5000)}

Return only a JSON object with "title", "teaser", "body", "key_facts", "subheading", and "category" fields. No other text. No markdown fences.
IMPORTANT: Do NOT include the subheading text as a paragraph inside "body". The subheading appears separately between paragraphs.`;

  const raw = await callClaude(FEATURED_PROMPT, userMessage, 1900);
  if (!raw) return null;
  const result = parseRewrite(raw);
  if (result) result.featured = true;
  return result;
}
