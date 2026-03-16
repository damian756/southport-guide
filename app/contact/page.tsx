import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the SouthportGuide team. List your business, enquire about advertising, report an issue, or just say hello.",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    title: "Contact SouthportGuide",
    description: "Get in touch with the SouthportGuide team. List your business, enquire about advertising, or just say hello.",
    url: `${BASE_URL}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
