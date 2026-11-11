import Link from "next/link";
import { Mail, BarChart2, Shield, Users } from "lucide-react";

export const metadata = {
  title: "Advertise on SouthportGuide | Sefton Coast Network",
  description:
    "Reach Southport visitors and local residents. Featured business listings and display advertising across the Sefton Coast Network.",
  alternates: { canonical: "https://www.southportguide.co.uk/advertise" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    title: "Advertise on SouthportGuide | Sefton Coast Network",
    description:
      "Reach Southport visitors and local residents. Featured listings and display advertising across the Sefton Coast Network.",
    url: "https://www.southportguide.co.uk/advertise",
  },
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="bg-[#0d1b2a] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#c9a84c] mb-4">
            Advertising &amp; Partnerships
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Reach the Sefton Coast audience.<br />
            <span className="text-[#c9a84c]">Four local guides</span> covering this coast.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mb-10 leading-relaxed">
            SouthportGuide is part of the Sefton Coast Network: four editorial sites covering Southport, Formby, and the links golf corridor. No tourist board. No aggregator content. Local guides written for the people who use them.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:partnerships@seftoncoast.network"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8952a] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              partnerships@seftoncoast.network
            </a>
            <Link
              href="/claim-listing"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Claim a free listing
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats band ── */}
      <div className="bg-[#0d1b2a] border-t border-white/10 px-4 pb-10">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 pt-2">
          {[
            { stat: "4", label: "Editorial sites" },
            { stat: "18", label: "Languages on SeftonLinks" },
            { stat: "500+", label: "Business listings" },
          ].map((item) => (
            <div key={item.label} className="text-center py-6">
              <div className="text-3xl font-extrabold text-[#c9a84c] mb-1">{item.stat}</div>
              <div className="text-sm text-white/50 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two routes ── */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-[#c9a84c] mb-3">Two ways to advertise</p>
          <h2 className="text-3xl font-bold text-[#0d1b2a]">Featured listings and display advertising</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Featured listings */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-[#2E6B3E] px-6 py-5">
              <h3 className="text-white font-bold text-lg">Featured Business Listings</h3>
              <p className="text-white/70 text-sm mt-1">For Southport businesses that want to stand out in the directory</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Your business appears in the relevant SouthportGuide category with enhanced placement, a featured badge, photos, extended description, and a direct link. Visible to everyone searching for what you do in Southport.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Priority position in category listings",
                  "Featured badge and enhanced profile",
                  "Photos, description, website link",
                  "Homepage placement by arrangement",
                  "Click and view analytics in the Business Hub dashboard",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-[#2E6B3E] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link
                  href="/pricing"
                  className="flex-1 text-center bg-[#2E6B3E] hover:bg-[#245530] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
                >
                  View listing prices
                </Link>
                <Link
                  href="/claim-listing"
                  className="flex-1 text-center border border-[#2E6B3E] text-[#2E6B3E] hover:bg-[#2E6B3E] hover:text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
                >
                  Claim free listing
                </Link>
              </div>
            </div>
          </div>

          {/* Display advertising */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-[#0d1b2a] px-6 py-5">
              <h3 className="text-white font-bold text-lg">Display Advertising</h3>
              <p className="text-white/70 text-sm mt-1">For brands targeting the Sefton Coast audience across the network</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Display placements on SouthportGuide, FormbyGuide and SeftonLinks, with positions agreed by arrangement. Category exclusivity included. One relationship and one invoice across the network.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Placement positions agreed by arrangement",
                  "Placement on SeftonLinks by arrangement",
                  "Category exclusivity for contract term",
                  "Monthly performance reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-[#c9a84c] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:partnerships@seftoncoast.network"
                className="block text-center bg-[#0d1b2a] hover:bg-[#1a3050] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                Request media kit
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Network section ── */}
      <div className="bg-gray-50 border-t border-gray-100 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-[#c9a84c] mb-3">The Network</p>
            <h2 className="text-3xl font-bold text-[#0d1b2a] mb-3">The sites</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Display advertising packages can cover one site or several. The Premium package covers SouthportGuide, FormbyGuide and SeftonLinks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "SouthportGuide.co.uk",
                color: "bg-[#0d1b2a]",
                desc: "The main visitor guide to Southport: hotels, restaurants, things to do and events, for local residents and visitors planning trips.",
                tags: ["Southport residents", "Visitors", "Families"],
              },
              {
                name: "FormbyGuide.co.uk",
                color: "bg-[#2E6B3E]",
                desc: "A guide to Formby: the National Trust beach, the pinewoods and the village restaurants.",
                tags: ["Formby residents", "Liverpool day trippers", "Village diners", "NT visitors"],
              },
              {
                name: "SeftonLinks.com",
                color: "bg-[#1a3820]",
                desc: "Specialist links golf guide to the Sefton Coast: Royal Birkdale, Hillside, Formby Golf Club and more. Available in 18 languages.",
                tags: ["Golf visitors", "International"],
              },
            ].map((site) => (
              <div key={site.name} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className={`${site.color} px-4 py-4`}>
                  <p className="text-white font-bold text-sm">{site.name}</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{site.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {site.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Packages summary ── */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[#c9a84c] mb-3">Display Advertising</p>
          <h2 className="text-3xl font-bold text-[#0d1b2a]">Network packages</h2>
          <p className="text-gray-500 mt-3 text-sm">All packages are six-month minimum contracts. Category exclusivity included.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Core",
              sites: "SouthportGuide + FormbyGuide",
              price: "£450",
              total: "£2,700",
              featured: false,
              features: [
                "Placement positions on both sites by arrangement",
                "Category exclusivity",
                "Monthly reporting",
              ],
            },
            {
              name: "Premium",
              sites: "SouthportGuide + FormbyGuide + SeftonLinks",
              price: "£650",
              total: "£3,900",
              featured: true,
              features: [
                "All Core placements",
                "SeftonLinks placement by arrangement",
                "Category exclusivity across all three sites",
                "Monthly reporting",
                "Up to 2 creative updates per month",
              ],
            },
            {
              name: "Full Network",
              sites: "All four Sefton Coast Network sites",
              price: "£800",
              total: "£4,800",
              featured: false,
              features: [
                "All Premium placements",
                "SeftonCoastWildlife included",
                "Quarterly review call",
                "Monthly reporting",
              ],
            },
          ].map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl overflow-hidden border-2 ${pkg.featured ? "border-[#c9a84c]" : "border-gray-200"}`}
            >
              <div className={`px-5 py-4 ${pkg.featured ? "bg-[#0d1b2a]" : "bg-gray-50"}`}>
                {pkg.featured && (
                  <span className="inline-block bg-[#c9a84c] text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2">
                    Recommended
                  </span>
                )}
                <h3 className={`font-bold text-lg ${pkg.featured ? "text-white" : "text-[#0d1b2a]"}`}>{pkg.name}</h3>
                <p className={`text-xs mt-0.5 ${pkg.featured ? "text-white/60" : "text-gray-400"}`}>{pkg.sites}</p>
              </div>
              <div className="p-5 bg-white">
                <div className="mb-1">
                  <span className="text-3xl font-extrabold text-[#0d1b2a]">{pkg.price}</span>
                  <span className="text-gray-400 text-sm"> / month</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">{pkg.total} · 6-month minimum contract</p>
                <ul className="space-y-2 mb-5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${pkg.featured ? "bg-[#c9a84c]" : "bg-[#2E6B3E]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:partnerships@seftoncoast.network"
                  className={`block text-center font-semibold py-2.5 rounded-lg text-sm transition-colors ${
                    pkg.featured
                      ? "bg-[#c9a84c] hover:bg-[#b8952a] text-white"
                      : "border border-[#0d1b2a] text-[#0d1b2a] hover:bg-[#0d1b2a] hover:text-white"
                  }`}
                >
                  Enquire about this package
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          All placements are clearly labelled as Advertisement or Sponsored on site. All outbound links carry rel="sponsored". Full terms in the media kit.
        </p>
      </div>

      {/* ── Why advertise ── */}
      <div className="bg-gray-50 border-t border-gray-100 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0d1b2a]">Why it works</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6 text-[#c9a84c]" />,
                title: "Trusted editorial",
                body: "The network is independent. No tourist board and no aggregator copy.",
              },
              {
                icon: <Shield className="w-6 h-6 text-[#c9a84c]" />,
                title: "Category exclusivity",
                body: "No competitor in your category will appear on the same site during your contract. That is a firm commitment, not a best-efforts clause.",
              },
              {
                icon: <BarChart2 className="w-6 h-6 text-[#c9a84c]" />,
                title: "Simple and transparent",
                body: "Static image ads and one invoice. No ad tech and no tracking scripts.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#0d1b2a] mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-[#0d1b2a] text-white px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Get the media kit</h2>
          <p className="text-white/60 mb-8 text-sm leading-relaxed">
            Email us at partnerships@seftoncoast.network and we will send the full media kit including ad specifications, package details, and terms. We respond to all advertising enquiries within one working day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:partnerships@seftoncoast.network"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#b8952a] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              partnerships@seftoncoast.network
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Use the contact form
            </Link>
          </div>
          <p className="text-white/30 text-xs mt-8">
            For business directory listings, visit <Link href="/pricing" className="underline hover:text-white/60">our pricing page</Link> or <Link href="/claim-listing" className="underline hover:text-white/60">claim a free listing</Link>.
          </p>
        </div>
      </div>

    </div>
  );
}
