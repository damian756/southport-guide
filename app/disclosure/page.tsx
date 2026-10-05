import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";

const PAGE_URL = "https://www.southportguide.co.uk/disclosure";
const DESCRIPTION =
  "Who publishes SouthportGuide.co.uk, how it is paid for, and the other interests of its publisher.";

export const metadata = {
  title: "Disclosure",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    title: "Disclosure",
    description: DESCRIPTION,
    url: PAGE_URL,
  },
};

const h2 = "font-display text-xl font-bold text-[#1B2E4B] mb-4";
const p = "text-gray-600 leading-relaxed";

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <section className="bg-[#1B2E4B]">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="container mx-auto px-4 py-14 max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-[#C9A84C]" />
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Transparency</p>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2">Disclosure</h1>
          <p className="text-white/50 text-sm">Last updated: 5 October 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 space-y-10">

          <section>
            <h2 className={h2}>Who publishes this guide</h2>
            <p className={p}>
              SouthportGuide.co.uk is published by <strong>Churchtown Media Ltd</strong>, a company registered in England and Wales (Company No. 16960442). Registered office: Suite RA01, 195-197 Wood Street, London, E17 3NU. Damian Roche is its director. He lives in Southport.
            </p>
          </section>

          <section>
            <h2 className={h2}>How it is paid for</h2>
            <p className={`${p} mb-3`}>
              The guide is paid for by Churchtown Media Ltd and by featured listings from local businesses. Some booking links earn us a small affiliate commission, and these are marked where they appear.
            </p>
            <p className={p}>
              A paid listing gives a business more visibility in the directory. It does not change what we write about that business.
            </p>
          </section>

          <section>
            <h2 className={h2}>Current interests</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
              <li>Churchtown Media Ltd, the publisher of this site.</li>
              <li>
                <a href="https://www.institrace.co.uk" rel="nofollow noopener" target="_blank" className="text-[#C9A84C] hover:underline font-medium">
                  Institrace
                </a>
                , a public records index run by Churchtown Media Ltd.
              </li>
              <li>
                The other Sefton Coast Network sites, also published by Churchtown Media Ltd: FormbyGuide.co.uk, SeftonLinks.com and SeftonCoastWildlife.co.uk.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>Former interests</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
              <li>SIBA Digital (closed October 2026).</li>
              <li>The Sandgrounder (closed September 2026).</li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>BID levy</h2>
            <p className={p}>
              Churchtown Media Ltd does not occupy rateable premises inside a Business Improvement District and does not pay a BID levy.
            </p>
          </section>

          <section>
            <h2 className={h2}>Politics</h2>
            <p className={p}>
              Damian Roche has no political affiliation. SouthportGuide has no link to any political party.
            </p>
          </section>

          <section>
            <h2 className={h2}>Changes</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We update this page when any of these interests change. The date at the top shows the last update.
            </p>
          </section>

        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          Questions?{" "}
          <Link href="/contact" className="text-[#C9A84C] hover:underline">Contact us</Link>
          {" "}·{" "}
          <Link href="/about" className="text-[#C9A84C] hover:underline">About the guide</Link>
        </div>
      </div>
    </div>
  );
}
