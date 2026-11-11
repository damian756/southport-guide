import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { ADVERTISING_SUBJECT } from "@/lib/contact";
import { describeSpace } from "@/lib/ad-slots";

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

type Props = { searchParams: Promise<{ topic?: string; space?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { topic, space } = await searchParams;
  // Links from the advertise page: /contact?topic=advertise&space=<slot or option id>.
  // Only known ids are named, so nothing typed into a URL is echoed back.
  const isAdvertising = topic === "advertise";
  const spaceTitle = isAdvertising ? describeSpace(space) : null;
  return (
    <ContactClient
      initialSubject={isAdvertising ? ADVERTISING_SUBJECT : undefined}
      initialMessage={spaceTitle ? `I'm interested in: ${spaceTitle}` : undefined}
    />
  );
}
