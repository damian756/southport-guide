import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { DISPLAY_EMAIL } from "@/lib/contact";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for SouthportGuide.co.uk: how we collect, use and protect your personal data in accordance with UK GDPR.",
  alternates: { canonical: "https://www.southportguide.co.uk/privacy" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    title: "Privacy Policy",
    url: "https://www.southportguide.co.uk/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#1B2E4B]">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="container mx-auto px-4 py-14 max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#C9A84C]" />
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Legal</p>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: 11 November 2026</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 space-y-10">

          <section>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">1. Who we are</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              SouthportGuide.co.uk is operated by <strong>Churchtown Media</strong>, a digital media company based in Southport, Merseyside, England.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              We are committed to protecting your personal data in accordance with the <strong>UK General Data Protection Regulation (UK GDPR)</strong> and the Data Protection Act 2018.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Contact:</strong>{" "}
              <a href={`mailto:${DISPLAY_EMAIL}`} className="text-[#C9A84C] hover:underline">
                {DISPLAY_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">2. What data we collect</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Contact forms",
                  desc: "Contact and advertising forms send your name, email address and message (and any details you give about an advert) to our inbox by email through our email provider, Resend.",
                },
                {
                  title: "Business listing submissions",
                  desc: "Business name, address, phone number, website URL, and description when you claim or submit a listing.",
                },
                {
                  title: "Billing information",
                  desc: "Handled entirely by Stripe, our payment processor. We do not store or have access to card details.",
                },
                {
                  title: "Usage data",
                  desc: "Ahrefs Web Analytics: page view statistics without cookies. It records the page address (including any query string), the referring page, your browser, operating system and device, screen size and language, and when a link is clicked or a form is sent. It uses your IP address to work out your approximate location (city level) and a daily visitor ID that cannot be linked across days; the IP address itself is discarded, not stored.",
                },
                {
                  title: "Listing counts",
                  desc: "When you use a listing's buttons (website, phone, directions, Google reviews) or view a listing, we record which listing, which button and the time. Nothing about you is stored.",
                },
                {
                  title: "Reviews",
                  desc: "If you write a review we store your name, email address, rating, text and any photos. Your email is used only to confirm the review and is never shown. Your IP address is kept for 30 days to prevent abuse and then replaced with a one-way hash.",
                },
                {
                  title: "Cookies",
                  desc: "See section 6 below for full cookie details.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C] mt-2 flex-none" />
                  <div>
                    <p className="font-semibold text-[#1B2E4B] text-sm">{title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">3. Why we collect it (legal basis)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5]">
                    <th className="text-left p-3 font-semibold text-[#1B2E4B] border border-gray-100">Purpose</th>
                    <th className="text-left p-3 font-semibold text-[#1B2E4B] border border-gray-100">Legal basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Contact enquiries", "Legitimate interest and your consent"],
                    ["Business listings", "Performance of a contract (your listing agreement)"],
                    ["Payment processing", "Performance of a contract"],
                    ["Analytics", "Legitimate interest in understanding site usage"],
                  ].map(([purpose, basis]) => (
                    <tr key={purpose}>
                      <td className="p-3 border border-gray-100 text-gray-700">{purpose}</td>
                      <td className="p-3 border border-gray-100 text-gray-500">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">4. How long we keep it</h2>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex gap-3"><span className="text-[#C9A84C]">→</span> Contact form submissions: <strong>12 months</strong></li>
              <li className="flex gap-3"><span className="text-[#C9A84C]">→</span> Business listing data: <strong>for the duration of your listing plus 6 months</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">5. Third parties we share data with</h2>
            <div className="space-y-3">
              {[
                { name: "Ahrefs (Analytics)", detail: "Ahrefs Web Analytics: page view statistics without cookies. It records the page address (including any query string), the referring page, your browser, operating system and device, screen size and language, and when a link is clicked or a form is sent. It uses your IP address to work out your approximate location (city level) and a daily visitor ID that cannot be linked across days; the IP address itself is discarded, not stored." },
                { name: "Stripe", detail: "Payment processing for paid business listings. Subject to Stripe's own privacy policy." },
                { name: "OpenStreetMap (maps)", detail: "Maps are drawn with OpenStreetMap tiles, which your browser loads from the OpenStreetMap Foundation's servers; they receive your IP address, browser type, our site's address and the map area you view. On listings without a map pin, Google Maps loads only if you click Show map." },
                { name: "Vercel", detail: "Hosts the website. Pages are served from Vercel's network, and the site's server code, including the forms and the Business Hub, runs in Vercel's lhr1 region in London, UK." },
              ].map(({ name, detail }) => (
                <div key={name} className="bg-[#FAF8F5] rounded-xl p-4">
                  <p className="font-semibold text-[#1B2E4B] text-sm mb-1">{name}</p>
                  <p className="text-gray-500 text-sm">{detail}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4 font-medium">We do not sell your personal data to any third party.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">6. Cookies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5]">
                    <th className="text-left p-3 font-semibold text-[#1B2E4B] border border-gray-100">Type</th>
                    <th className="text-left p-3 font-semibold text-[#1B2E4B] border border-gray-100">Purpose</th>
                    <th className="text-left p-3 font-semibold text-[#1B2E4B] border border-gray-100">Required?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Business Hub session", "next-auth.session-token (__Secure-next-auth.session-token on the live site): keeps a business owner signed in to the Business Hub. Set only when you sign in.", "Yes, to sign in"],
                    ["NextAuth sign-in", "next-auth.csrf-token (__Host-next-auth.csrf-token) protects the sign-in form; next-auth.callback-url (__Secure-next-auth.callback-url) returns you to the page you came from. Set only when you use the sign-in form.", "Yes, to sign in"],
                  ].map(([type, purpose, required]) => (
                    <tr key={type}>
                      <td className="p-3 border border-gray-100 text-gray-700 font-medium">{type}</td>
                      <td className="p-3 border border-gray-100 text-gray-500">{purpose}</td>
                      <td className="p-3 border border-gray-100 text-gray-500">{required}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">7. Your rights</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Under UK GDPR you have the right to:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Access your personal data",
                "Correct inaccurate data",
                "Request deletion of your data",
                "Object to or restrict processing",
                "Data portability",
                "Withdraw consent at any time",
              ].map((right) => (
                <div key={right} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-none" />
                  {right}
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-4">
              To exercise any of these rights, email{" "}
              <a href={`mailto:${DISPLAY_EMAIL}`} className="text-[#C9A84C] hover:underline">
                {DISPLAY_EMAIL}
              </a>. You may also lodge a complaint with the{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">
                Information Commissioner&apos;s Office (ICO)
              </a>.
            </p>
          </section>

          <section id="cookies">
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">8. Cookies</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              The only cookies this site sets are the NextAuth sign-in cookies, which also hold the Business Hub session (see section 6). Our analytics set no cookies.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-[#FAF8F5]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider">Purpose</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider">Consent required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["Necessary", "NextAuth sign-in and the Business Hub session: next-auth.session-token, next-auth.csrf-token and next-auth.callback-url (with a __Secure- or __Host- prefix on the live site). Set only when you sign in.", "No, needed to sign in"],
                    ["Analytics", "Ahrefs Web Analytics: page view statistics without cookies. It records the page address (including any query string), the referring page, your browser, operating system and device, screen size and language, and when a link is clicked or a form is sent. It uses your IP address to work out your approximate location (city level) and a daily visitor ID that cannot be linked across days; the IP address itself is discarded, not stored.", "No, sets no cookies"],
                  ].map(([cat, purpose, req]) => (
                    <tr key={cat}>
                      <td className="px-4 py-3 font-semibold text-[#1B2E4B] align-top whitespace-nowrap">{cat}</td>
                      <td className="px-4 py-3 text-gray-600 align-top">{purpose}</td>
                      <td className={`px-4 py-3 align-top whitespace-nowrap font-medium ${req.startsWith("No") ? "text-[#C9A84C]" : "text-gray-500"}`}>{req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              You can control cookies via your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">9. Changes to this policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this policy from time to time. When we do, we will update the &ldquo;last updated&rdquo; date at the top of this page. Continued use of the site constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          Questions?{" "}
          <Link href="/contact" className="text-[#C9A84C] hover:underline">Contact us</Link>
          {" "}·{" "}
          <Link href="/terms" className="text-[#C9A84C] hover:underline">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
}
