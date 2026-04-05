const PUBLER_API_BASE = "https://app.publer.com/api/v1";
const ARTICLE_BASE = "https://www.southportguide.co.uk/news";

const X_ACCOUNT_ID = "69d2ab9defe8d34c58a27856";
const FB_ACCOUNT_ID = "69d2ab0498f6ddba3fee7895";

let cachedWorkspaceId: string | null = null;

async function getWorkspaceId(apiKey: string): Promise<string | null> {
  if (cachedWorkspaceId) return cachedWorkspaceId;
  try {
    const res = await fetch(`${PUBLER_API_BASE}/workspaces`, {
      headers: { Authorization: `Bearer-API ${apiKey}` },
    });
    if (!res.ok) return null;
    const workspaces = await res.json() as Array<{ id: string }>;
    if (Array.isArray(workspaces) && workspaces.length > 0) {
      cachedWorkspaceId = workspaces[0].id;
      return cachedWorkspaceId;
    }
  } catch {
    // fall through
  }
  return null;
}

function buildXText(teaser: string, url: string): string {
  const hashtags = "#Southport #SouthportNews #SouthportGuide";
  // URL counts as 23 chars on X regardless of length; leave 280 - 23 - 2 - len(hashtags) - 2 for text
  const maxText = 280 - 23 - 2 - hashtags.length - 2;
  const text = teaser.length > maxText
    ? teaser.slice(0, maxText - 1).trimEnd() + "..."
    : teaser;
  return `${text}\n\n${url}\n\n${hashtags}`;
}

function buildFbText(teaser: string, url: string): string {
  return `${teaser}\n\n#Southport #SouthportNews #SouthportGuide #Merseyside`;
}

export async function postToSocial(params: {
  title: string;
  teaser: string;
  slug: string;
}): Promise<void> {
  const apiKey = process.env.PUBLER_API_KEY;
  if (!apiKey) {
    console.warn("[Publer] PUBLER_API_KEY not set — skipping social post");
    return;
  }

  const workspaceId = await getWorkspaceId(apiKey);
  if (!workspaceId) {
    console.warn("[Publer] Could not resolve workspace ID — skipping social post");
    return;
  }

  const articleUrl = `${ARTICLE_BASE}/${params.slug}`;
  const xText = buildXText(params.teaser, articleUrl);
  const fbText = buildFbText(params.teaser, articleUrl);

  // Schedule at a random time 5-120 minutes from now to avoid batch-spam on social feeds
  const delayMs = (5 + Math.floor(Math.random() * 115)) * 60 * 1000;
  const scheduledAt = new Date(Date.now() + delayMs).toISOString();

  // Facebook type must be "status" — "link" is not a valid Publer type and silently fails.
  // Including the URL in the status text triggers Facebook's own link card preview via OG tags.
  const fbTextWithUrl = `${fbText}\n\n${articleUrl}`;

  const body = {
    bulk: {
      state: "scheduled",
      posts: [
        {
          networks: {
            twitter: { type: "status", text: xText },
            facebook: { type: "status", text: fbTextWithUrl },
          },
          // scheduled_at must be per-account, not at bulk level
          accounts: [
            { id: X_ACCOUNT_ID, scheduled_at: scheduledAt },
            { id: FB_ACCOUNT_ID, scheduled_at: scheduledAt },
          ],
        },
      ],
    },
  };

  try {
    const res = await fetch(`${PUBLER_API_BASE}/posts/schedule`, {
      method: "POST",
      headers: {
        Authorization: `Bearer-API ${apiKey}`,
        "Publer-Workspace-Id": workspaceId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json() as { data?: { job_id?: string }; errors?: string[] };

    if (!res.ok) {
      console.error("[Publer] API error:", data.errors ?? data);
    } else {
      console.log(`[Publer] Scheduled Facebook + X post for ${scheduledAt}. Job ID:`, data?.data?.job_id);
    }
  } catch (err) {
    console.error("[Publer] Fetch failed:", err);
  }
}
