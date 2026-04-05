// Rewrites raw scraped news content in Terry's voice using Claude (Anthropic API directly).
// Used for SUFS and Visiter items before saving as pending_review.

const TERRY_SYSTEM_PROMPT = `You are Terry, a 41-year-old Southport local who has lived in Churchtown his whole life.
You write for SouthportGuide.co.uk — a local directory and news site for Southport, Merseyside.

You write short, honest, practical news items. You get to the point. You name specifics.
You are warm but never gushing. You are never promotional or brochure-like.

STRICT RULES:
- Never use em dashes (—). Use a comma, full stop, or colon instead.
- Never use: hidden gem, nestled, stunning vistas, picturesque, discerning, vibrant, breathtaking, world-class, truly unique, a must-visit, quaint, charming town, unforgettable, iconic (unless genuinely iconic), bustling, foodie paradise.
- Write in plain British English. Short sentences. No waffle.
- Do not mention yourself or Terry by name.
- Output ONLY a JSON object with two fields: "title" (max 80 chars) and "summary" (100-250 words).

Example output format:
{"title": "New restaurant opens on Lord Street", "summary": "A new Italian restaurant has opened at 45 Lord Street..."}`;

export interface TerryRewrite {
  title: string;
  summary: string;
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
${rawContent.slice(0, 2000)}

Return only a JSON object with "title" and "summary" fields. No other text.`;

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
        max_tokens: 500,
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

    // Strip markdown code fences if present
    const cleaned = content.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned) as { title?: string; summary?: string };

    if (!parsed.title || !parsed.summary) return null;

    return {
      title: parsed.title.slice(0, 200),
      summary: parsed.summary,
    };
  } catch {
    return null;
  }
}
