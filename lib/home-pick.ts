// The editorial feature card on the home page. Set HOME_PICK to null to hide the
// whole section; to feature something new, fill in a HomePick object here. It is
// our own choice, not a paid placement, so it carries no "Featured", "Sponsored"
// or advert label. No markup changes are needed either way.
export interface HomePick {
  kicker: string; // small label above the heading, e.g. "Coming in April 2027"
  heading: string; // section heading
  href: string; // link to the featured guide or post
  image: string; // image path under /public
  imageAlt: string;
  /** Visible credit shown on the image, e.g. "Image: Southport Agricultural Show". */
  imageCredit?: string;
  /** "contain" shows the whole image (a logo) on imageBackground instead of cropping it. */
  imageFit?: "cover" | "contain";
  imageBackground?: string; // CSS colour behind a contained image
  tag: string; // pill on the card, e.g. "17 to 18 April 2027 · Victoria Park"
  title: string; // card title
  description: string;
  chips: string[];
  cta: string; // e.g. "Read the full guide"
}

// 11 Nov 2026: the Southport Agricultural Show, from the organisers' email of
// that evening and their website. Image: the show's logo, from
// southportagriculturalshow.co.uk (home page), resized for this card.
export const HOME_PICK: HomePick | null = {
  kicker: "Coming in April 2027",
  heading: "A new show at Victoria Park",
  href: "/blog/southport-agricultural-show-2027",
  image: "/images/agshow/southport-agricultural-show-logo-card.webp",
  imageAlt:
    "The Southport Agricultural Show logo: an ear of wheat above green fields in a circle, with the words Southport Agricultural Show, Est. 2027",
  imageCredit: "Image: Southport Agricultural Show",
  imageFit: "contain",
  imageBackground: "#F6F2ED",
  tag: "17 to 18 April 2027 · Victoria Park",
  // Non-breaking spaces keep "Agricultural Show" and "and entertainment." together when they wrap
  title: "Southport Agricultural Show",
  description:
    "Two days of farming, food and rural life, in the show's first year. Local produce, modern and vintage machinery, livestock, demonstrations and entertainment.",
  chips: [],
  cta: "Dates, tickets and getting there",
};
