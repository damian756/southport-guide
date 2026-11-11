// ── Advertising spaces on SouthportGuide ─────────────────────────────────────
// Every advert space on the site, keyed by a stable id. The id appears in the
// "advertise here" link (/advertise?space=<id>#<option>) and in contact-form
// enquiries, so do not rename one once it is live.
//
// To put an advert live (after the invoice is paid): set `sponsor` on the slot.
//   sponsor: {
//     name: "Business name",
//     url: "https://their-site.example",
//     text: "Up to 30 words about them.",
//     image: "/images/their-photo.webp",   // optional, a file under /public
//     until: "2027-02-28",                 // optional, last day shown (UK date)
//   }
// Set it back to null when the booking ends. A sponsor whose `until` date has
// passed shows as the empty "advertise here" card on its own.
//
// Featured places on category pages are not sold here: they are the Business
// Hub's Pro listings and boosts (/pricing, Stripe). The `featured-*` slots only
// name the empty card that points to them.
//
// Rules: one advert per page at most; adverts are labelled on the card; paid
// links carry rel="sponsored noopener". No adverts on listing pages, reviews,
// "best of" guides, about, privacy, terms, disclosure, contact, claim-listing,
// the advertise page, the 404 page, the dashboard, admin or property pages.

export type Sponsor = {
  name: string;
  url: string;
  /** Up to 30 words. */
  text: string;
  /** Optional image path under /public, e.g. "/images/sponsor-photo.webp". */
  image?: string;
  /** Optional last day the advert shows, "YYYY-MM-DD" (UK date). */
  until?: string;
};

export type AdOptionId =
  | "featured"
  | "guide-sponsor"
  | "event-sponsor"
  | "home-card"
  | "sponsored-article"
  | "christmas"
  | "network";

export type AdOption = {
  id: AdOptionId;
  name: string;
  /** Headline price, e.g. "£69". */
  price: string;
  /** "a month", "one-off", "per event". */
  per: string;
  /** Short line under the price. */
  note: string;
  /** Used on the empty card, e.g. "from £69 a month plus VAT". */
  from: string;
  term: string;
  points: string[];
};

export const AD_OPTIONS: AdOption[] = [
  {
    id: "featured",
    name: "Featured in a category",
    // Pro and boosts are sold by card through the Business Hub (Stripe adds no
    // VAT), so they show the price paid and never sit under "plus VAT".
    // Prices as on /pricing: Pro £39 a month or £390 a year; boosts from £10.
    price: "£39",
    per: "a month for Pro",
    note: "or £390 a year. Boosts from £10. Paid by card at the price shown",
    from: "Pro at £39 a month, or a boost from £10",
    term: "Through the Business Hub",
    points: [
      "Pro listings sort above standard listings in their category",
      "A boost puts your business at the top of its category page for a set period",
      "Pro and boosted places are marked Featured, with the words Paid placement",
      "Claim your free listing first, then upgrade in the Business Hub",
    ],
  },
  {
    id: "guide-sponsor",
    name: "Guide sponsor",
    price: "£69",
    per: "a month",
    note: "3 months minimum",
    from: "from £69 a month plus VAT",
    term: "One sponsor per guide or post",
    points: [
      "The Southport Beach, Southport Pier, Things to Do or Parking guide, or one of our seasonal, walking and events posts (each post is its own space)",
      "Your card shown once at the end of the guide, labelled Sponsor",
      "Adverts never appear inside a review, and paying for a space does not change what we write.",
    ],
  },
  {
    id: "event-sponsor",
    name: "Event guide sponsor",
    price: "£199",
    per: "per event",
    note: "the six weeks before the event",
    from: "£199 per event plus VAT",
    term: "One sponsor per event",
    points: [
      "Headline sponsor of our Southport Air Show or Southport Flower Show guide",
      "Your card shown at the end of the guide, labelled Sponsor",
      "Runs for the six weeks before the event",
    ],
  },
  {
    id: "home-card",
    name: "Home page card",
    price: "£89",
    per: "a month",
    note: "3 months minimum",
    from: "from £89 a month plus VAT",
    term: "One business at a time",
    points: [
      "A card on the SouthportGuide home page, labelled Advertisement",
      "Photo, up to 30 words about you and a link",
      "Change the photo and words once a month if you like",
    ],
  },
  {
    id: "sponsored-article",
    name: "Sponsored article",
    price: "£195",
    per: "one-off",
    note: "live for 12 months",
    from: "£195 one-off plus VAT",
    term: "Labelled Sponsored at the top",
    points: [
      "A useful post about something you run: an event, a walk, a seasonal menu",
      "Written with you, checked for facts, in plain English",
      "Bylined \"Sponsored by\" your business, and never presented as a review",
    ],
  },
  {
    id: "christmas",
    name: "Christmas package",
    price: "£149",
    per: "for December",
    note: "the whole of December",
    from: "£149 for December plus VAT",
    term: "December only",
    points: [
      "The home page card for the whole of December",
      "Plus one boost credit for your category page",
    ],
  },
];

export const NETWORK_BUNDLE: AdOption = {
  id: "network",
  name: "Sefton Coast bundle",
  price: "£149",
  per: "a month",
  note: "3 months minimum",
  from: "from £149 a month plus VAT",
  term: "One invoice",
  points: [
    "Home page card on SouthportGuide, FormbyGuide, SeftonLinks and Sefton Coast Wildlife",
    "Pro-level placement on SouthportGuide, and Featured in your category on FormbyGuide",
    "One invoice for all four sites",
  ],
};

export type SlotKind = "home" | "featured" | "guide" | "event" | "post";

export type AdSlotDef = {
  id: string;
  kind: SlotKind;
  option: AdOptionId;
  /** Names the space, e.g. "Sponsor of the Southport Beach guide". */
  title: string;
  /** Short name used on the empty card, e.g. "Southport Beach". */
  label: string;
  sponsor: Sponsor | null;
};

function guide(id: string, label: string): AdSlotDef {
  return { id, kind: "guide", option: "guide-sponsor", title: `Sponsor of the ${label} guide`, label, sponsor: null };
}

function event(id: string, label: string): AdSlotDef {
  return { id, kind: "event", option: "event-sponsor", title: `Sponsor of the ${label} guide`, label, sponsor: null };
}

function post(slug: string, label: string): AdSlotDef {
  return { id: `post-${slug}`, kind: "post", option: "guide-sponsor", title: `Sponsor of the ${label} post`, label, sponsor: null };
}

function featured(category: string, label: string): AdSlotDef {
  return { id: `featured-${category}`, kind: "featured", option: "featured", title: `Featured in ${label}`, label, sponsor: null };
}

const SLOT_LIST: AdSlotDef[] = [
  // Home page: after the "Latest from the Guide" blog strip.
  { id: "home-card", kind: "home", option: "home-card", title: "Home page card", label: "Home page", sponsor: null },

  // Category pages: an empty card pointing to Pro and boosts, shown only when
  // fewer than two Featured or boosted places are showing.
  featured("restaurants", "Restaurants"),
  featured("cafes", "Cafes"),
  featured("bars-nightlife", "Bars & Pubs"),
  featured("hotels", "Hotels"),
  featured("attractions", "Attractions"),
  featured("shopping", "Shopping"),
  featured("golf", "Golf"),
  featured("wellness", "Wellness"),
  featured("activities", "Activities"),

  // Guide sponsors: one card at the end of each guide.
  guide("guide-southport-beach", "Southport Beach"),
  guide("guide-southport-pier", "Southport Pier"),
  guide("guide-things-to-do", "Things to Do in Southport"),
  guide("guide-parking-southport", "Parking in Southport"),

  // Event guide sponsors.
  event("event-air-show", "Southport Air Show"),
  event("event-flower-show", "Southport Flower Show"),

  // End of post: seasonal, walks and events posts that do not name or judge a business.
  post("autumn-walks-southport", "Autumn Walks in Southport"),
  post("southport-marine-lake-seafront-walk", "Marine Lake and Seafront Walk"),
  post("southport-marine-lake-summer", "Marine Lake in Summer"),
  post("hesketh-park-southport", "Hesketh Park"),
  post("beachcombing-ainsdale-winter", "Beachcombing at Ainsdale"),
  post("southport-fireworks-championship-explained", "Fireworks Championship"),
  post("southport-air-show-best-viewing-spots-2026", "Air Show Viewing Spots"),
  post("southport-flower-show-first-timers-guide-2026", "Flower Show First Timer's"),
];

export const AD_SLOTS: Record<string, AdSlotDef> = Object.fromEntries(SLOT_LIST.map((s) => [s.id, s]));

/** Category pages that can show the empty Featured card. */
export const FEATURED_CATEGORIES = SLOT_LIST.filter((s) => s.kind === "featured").map((s) => s.id.replace(/^featured-/, ""));

export function getAdOption(id: string): AdOption | undefined {
  if (id === NETWORK_BUNDLE.id) return NETWORK_BUNDLE;
  return AD_OPTIONS.find((o) => o.id === id);
}

/** Today's date in the UK as "YYYY-MM-DD". */
function ukToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
}

/** The slot's sponsor if one is set and its `until` date has not passed. */
export function activeSponsor(slot: AdSlotDef): Sponsor | null {
  const s = slot.sponsor;
  if (!s) return null;
  if (s.until && s.until < ukToday()) return null;
  return s;
}

/** Link from an empty card to the advertise page, naming the space. */
export function advertiseHref(slot: AdSlotDef): string {
  return `/advertise?space=${encodeURIComponent(slot.id)}#${slot.option}`;
}

/** Link from the advertise page to the contact form. */
export function enquiryHref(space?: string): string {
  return `/contact?topic=advertise${space ? `&space=${encodeURIComponent(space)}` : ""}`;
}

/**
 * What a `space` value from a URL refers to: a slot title or an option name.
 * Only known ids are accepted, so nothing typed into a URL is echoed back.
 */
export function describeSpace(space: string | undefined): string | null {
  if (!space) return null;
  const slot = AD_SLOTS[space];
  if (slot) return slot.title;
  const option = getAdOption(space);
  return option ? option.name : null;
}

/** The post-end slot for a blog post, if it has one. */
export function postSlotId(slug: string): string | null {
  const id = `post-${slug}`;
  return AD_SLOTS[id] ? id : null;
}
