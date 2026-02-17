import Link from "next/link";
import { Check } from "lucide-react";

export const metadata = {
  title: "Pricing | List Your Business on SouthportGuide",
  description: "Pricing for business listings on SouthportGuide.co.uk. Free, Standard, Featured and Premium tiers.",
};

const tiers = [
  {
    name: "Free",
    price: "£0",
    desc: "Basic listing",
    features: ["Name, address, website link", "Appears in category search", "Claim to update details"],
    cta: "Claim your listing",
    href: "/claim-listing",
    highlighted: false,
  },
  {
    name: "Standard",
    price: "£29",
    period: "/month",
    desc: "Full profile",
    features: ["Up to 10 photos", "Extended description (500 words)", "Opening hours & phone", "Social links", "Standard listing badge"],
    cta: "Get Standard",
    href: "/claim-listing?tier=standard",
    highlighted: false,
  },
  {
    name: "Featured",
    price: "£59",
    period: "/month",
    desc: "Stand out",
    features: ["Everything in Standard", "Featured badge", "Top of category placement", "Homepage carousel", "Monthly analytics"],
    cta: "Get Featured",
    href: "/claim-listing?tier=featured",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "£99",
    period: "/month",
    desc: "Maximum visibility",
    features: ["Everything in Featured", "Booking integration", "Video embed", "Priority support", "Dedicated account manager"],
    cta: "Get Premium",
    href: "/claim-listing?tier=premium",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join 500+ Southport businesses. Choose the tier that fits your goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-xl shadow-lg p-6 bg-white ${
                t.highlighted ? "ring-2 ring-blue-600 scale-105" : ""
              }`}
            >
              {t.highlighted && (
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mb-4">
                  POPULAR
                </span>
              )}
              <h2 className="text-xl font-bold text-gray-900">{t.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{t.desc}</p>
              <p className="mt-4">
                <span className="text-3xl font-bold text-gray-900">{t.price}</span>
                {t.period && <span className="text-gray-600">{t.period}</span>}
              </p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={t.href}
                className={`mt-6 block w-full text-center py-3 rounded-lg font-semibold transition ${
                  t.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">Special event packages</p>
          <p className="text-sm text-gray-500">
            <strong>The Open 2026</strong> featured listing: £199–499 one-off.{" "}
            <strong>MLEC Partner</strong>: £299–599/year.{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> for details.
          </p>
        </div>
      </div>
    </div>
  );
}
