// Shared RSS parsing utilities used by news scrapers.

// Strips CDATA wrappers and decodes common HTML entities.
export function cleanXml(xml: string): string {
  return xml
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

// Extracts the text content of the first matching tag in the given XML block.
// Works for both plain text and CDATA-wrapped content (after cleanXml is applied).
export function extractTag(xml: string, tag: string): string {
  const match = xml.match(
    new RegExp("<" + tag + "[^>]*>([\\s\\S]*?)<\\/" + tag + ">", "s")
  );
  return match?.[1]?.trim() ?? "";
}

// Strips HTML tags, leaving plain text.
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type RssItem = {
  title: string;
  description: string;
  link: string;
  guid: string;
  pubDate: string;
};

// Parses RSS/Atom XML and returns an array of items.
// Handles both CDATA-wrapped and plain text content.
export function parseRssItems(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const raw = match[1];
    // Strip CDATA from this block before extracting fields
    const block = cleanXml(raw);

    // For description, prefer content:encoded (WordPress full post)
    const contentEncoded = raw.match(
      /<content:encoded>([\s\S]*?)<\/content:encoded>/
    );
    const rawContent = contentEncoded
      ? cleanXml(contentEncoded[1])
      : extractTag(block, "description");

    items.push({
      title: stripHtml(extractTag(block, "title")),
      description: stripHtml(rawContent).slice(0, 2000),
      link: extractTag(block, "link").trim(),
      guid: extractTag(block, "guid").trim(),
      pubDate: extractTag(block, "pubDate").trim(),
    });
  }

  return items;
}
