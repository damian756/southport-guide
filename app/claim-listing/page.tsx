import type { Metadata } from "next";
import { Suspense } from "react";
import ClaimListingClient from "./ClaimListingClient";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Claim Your Business Listing",
  description: "Is your Southport business on our guide? Claim your free listing to update your details, opening hours, and get more visibility for locals and visitors.",
  alternates: { canonical: `${BASE_URL}/claim-listing` },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    title: "Claim Your Southport Business Listing",
    description: "Claim your free Southport business listing. Update your details, opening hours, and upgrade for featured placement.",
    url: `${BASE_URL}/claim-listing`,
  },
};

export default function ClaimListingPage() {
  return (
    <Suspense>
      <ClaimListingClient />
    </Suspense>
  );
}
