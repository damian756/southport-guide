import type { Metadata } from "next";

// The page is a client component, so its metadata lives here. Without it the page
// took the site's default title and pointed its canonical at the home page.
const URL = "https://www.southportguide.co.uk/suggest-listing";
const TITLE = "Suggest a Business Listing in Southport";
const DESCRIPTION =
  "Know a Southport business that is not in the guide? Suggest it here. Every suggestion is reviewed, and listings are added free of charge.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "SouthportGuide.co.uk",
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: "https://www.southportguide.co.uk/og-default.png", width: 1200, height: 630, alt: "SouthportGuide.co.uk" }],
  },
};

export default function SuggestListingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
