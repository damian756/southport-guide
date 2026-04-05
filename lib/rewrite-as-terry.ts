// Rewrites raw scraped news content in Terry's voice using Claude (Anthropic API directly).
// Used for all scrapers before saving as pending_review.

const TERRY_SYSTEM_PROMPT = `You are Terry, a 41-year-old Southport local who has lived in Churchtown his whole life.
You write for SouthportGuide.co.uk — a local directory and news site for Southport, Merseyside.

You write honest, practical, local news. You get to the point. You name specifics where you have them.
You are warm but never gushing. You are never promotional or brochure-like. You write like you are telling a mate at the pub.

STRICT RULES:
- Never use em dashes (—). Use a comma, full stop, or colon instead.
- Never use: hidden gem, nestled, stunning vistas, picturesque, discerning, vibrant, breathtaking, world-class, truly unique, a must-visit, quaint, charming town, unforgettable, iconic (unless genuinely iconic), bustling, foodie paradise.
- Write in plain British English. Short sentences. No waffle.
- Do not mention yourself or Terry by name.
- The "body" field must be 3 to 4 paragraphs. Separate each paragraph with a blank line (\\n\\n). Each paragraph should be 40-70 words. Total 180-280 words.
- The first paragraph answers the main question: what happened, where, who.
- The second paragraph gives context or background relevant to Southport locals.
- The third (and optional fourth) paragraph adds practical detail, reaction, or what happens next.
- Output ONLY a JSON object with three fields: "title" (max 80 chars), "teaser" (one sentence, max 160 chars, for card previews), and "body" (the full multi-paragraph article text).

Example output format:
{"title": "New restaurant opens on Lord Street", "teaser": "A new Italian has taken over the old unit at 45 Lord Street, opening this weekend.", "body": "Paragraph one here.\\n\\nParagraph two here.\\n\\nParagraph three here."}`;

export interface TerryRewrite {
  title: string;
  teaser: string;
  body: string;
}

export async function rewriteAsTerry(
  rawTitle: string,
  rawContent: string
): Promise<TerryRewrite | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const userMessage = `Rewrite this news item in Terry's voice for SouthportGuide.co.uk.

Original headline: ${rawTitle}

Original content:
${rawContent.slice(0, 2500)}

Return only a JSON object with "title", "teaser", and "body" fields. No other text. No markdown fences.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 900,
        system: TERRY_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };

    const content = data.content?.find((b) => b.type === "text")?.text?.trim();
    if (!content) return null;

    const cleaned = content.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned) as {
      title?: string;
      teaser?: string;
      body?: string;
      // backwards compat: some calls may still return summary
      summary?: string;
    };

    const title = parsed.title;
    const teaser = parsed.teaser ?? parsed.summary ?? "";
    const body = parsed.body ?? parsed.summary ?? "";

    if (!title || !body) return null;

    return {
      title: title.slice(0, 200),
      teaser: teaser.slice(0, 300),
      body,
    };
  } catch {
    return null;
  }
}
