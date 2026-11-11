// The "pick" card on the home page. Set HOME_PICK to null to hide the whole
// section; to feature a new guide, fill in a HomePick object here. No markup
// changes are needed either way.
export interface HomePick {
  kicker: string; // small label above the heading, e.g. "Editor's pick"
  heading: string; // section heading
  href: string; // link to the featured guide
  image: string; // image path under /public
  imageAlt: string;
  tag: string; // pill on the card, e.g. "Cafe guide · London Street"
  title: string; // card title
  description: string;
  chips: string[];
  cta: string; // e.g. "Read the full guide"
}

// Switched off on 11 Nov 2026 until a new pick is chosen.
export const HOME_PICK: HomePick | null = null;
