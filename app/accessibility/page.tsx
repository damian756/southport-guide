import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Flower2, Heart, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | SouthportGuide.co.uk",
  description:
    "SouthportGuide's accessibility commitments — web accessibility standards, Hidden Disabilities Sunflower membership, content standards, and how to contact us with accessibility feedback.",
  alternates: { canonical: "https://www.southportguide.co.uk/accessibility" },
};

const COMMITMENTS = [
  {
    icon: CheckCircle,
    title: "WCAG 2.1 AA target",
    body: "We aim to meet WCAG 2.1 Level AA standards across the site. This includes sufficient colour contrast, keyboard navigation, descriptive alt text for all meaningful images, properly labelled form elements, and skip-to-main-content links.",
  },
  {
    icon: CheckCircle,
    title: "Alt text on all images",
    body: "Every meaningful image on the site carries a descriptive alt attribute. Decorative images are marked as such. We review this on an ongoing basis as new content is added.",
  },
  {
    icon: CheckCircle,
    title: "Keyboard navigation",
    body: "The site is navigable by keyboard. Interactive elements — links, buttons, forms — are focusable and have visible focus indicators. We do not rely on mouse-only interactions for any core content.",
  },
  {
    icon: CheckCircle,
    title: "Responsive and mobile-first",
    body: "SouthportGuide is built mobile-first. Content reflows appropriately on all screen sizes. Text can be resized to 200% without loss of content. We do not override user font size preferences.",
  },
  {
    icon: Flower2,
    title: "Hidden Disabilities Sunflower member",
    body: "SouthportGuide is a registered member of the Hidden Disabilities Sunflower scheme. We are committed to flagging sensory-friendly venues, quiet hours, and accessibility information as standard across our guides.",
  },
  {
    icon: Heart,
    title: "Accessible content standards",
    body: "Our guides carry sensory and accessibility information as standard — not buried in footnotes. We flag noise levels, quiet hours, wheelchair access, Sunflower recognition, and the best times to visit for low-sensory experiences.",
  },
];

const KNOWN_ISSUES = [
  "Some older embedded maps (Leaflet) may not be fully navigable by keyboard. We are reviewing these on a page-by-page basis.",
  "PDF documents linked from some business listings may not be fully accessible. Where we are aware of this, we provide the key information in HTML text on the page.",
  "Video content does not currently carry closed captions. We are working toward adding captions to all video content hosted on the site.",
];

export default function AccessibilityStatementPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-[#1B2E4B] text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Accessibility
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Accessibility Statement
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            SouthportGuide.co.uk is committed to being accessible to all visitors, including those with disabilities.
            This page sets out our commitments, what we have done, and where we are still working to improve.
          </p>
          <p className="text-white/40 text-sm mt-4">Last reviewed: 2 April 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-16">

        {/* Sunflower membership */}
        <section>
          <Link
            href="/guides/southportguide-sunflower-member"
            className="group grid sm:grid-cols-[120px_1fr] rounded-2xl overflow-hidden border border-[#1C3A20]/20 hover:shadow-md transition-all"
          >
            <div className="bg-white flex items-center justify-center p-8 min-h-[100px]">
              <Image
                src="/images/sunflower/PROUD-To-SUPPORT-UK_2.webp"
                alt="Hidden Disabilities Sunflower — Proud to Support UK"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
            <div className="bg-[#1C3A20] px-8 py-8 flex flex-col justify-center">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">Hidden Disabilities Sunflower</p>
              <p className="text-white font-bold text-lg mb-2 leading-snug">Proud Sunflower member</p>
              <p className="text-white/65 text-sm leading-relaxed">
                We joined the Hidden Disabilities Sunflower scheme in April 2026. Our commitment to sensory-friendly
                content, accessible event coverage, and Southport venues that recognise the lanyard.
              </p>
              <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mt-4 group-hover:gap-2.5 transition-all">
                Read our announcement <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </section>

        {/* Our commitments */}
        <section>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-8">Our Commitments</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {COMMITMENTS.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <item.icon className="w-5 h-5 text-[#C9A84C] mb-3" />
                <h3 className="font-bold text-[#1B2E4B] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Known issues */}
        <section>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Known Issues</h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            We are aware of the following accessibility limitations and are actively working to address them:
          </p>
          <div className="space-y-3">
            {KNOWN_ISSUES.map((issue) => (
              <div key={issue} className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex gap-3">
                <span className="flex-none text-amber-600 font-bold text-sm mt-0.5">!</span>
                <p className="text-amber-900 text-sm leading-relaxed">{issue}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical compliance */}
        <section>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Technical</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4 text-gray-700 leading-relaxed text-sm">
            <p>
              SouthportGuide.co.uk is built with Next.js, using semantic HTML5 elements throughout. Headings follow a
              logical hierarchy (H1 through H4). Landmark elements (nav, main, footer) are present on every page.
            </p>
            <p>
              Colour contrast ratios meet WCAG 2.1 AA requirements for normal text (minimum 4.5:1) and large text
              (minimum 3:1). We use our navy blue (#1B2E4B) against white for primary text, which exceeds these thresholds.
            </p>
            <p>
              The site does not use autoplay audio or video with sound. Where videos autoplay, they do so muted. Users
              can pause or stop any video playback.
            </p>
            <p>
              Analytics are provided by Plausible, a privacy-first platform that does not use cookies or collect personal
              data. We do not use advertising trackers.
            </p>
          </div>
        </section>

        {/* Feedback */}
        <section>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Feedback and Contact</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              If you encounter an accessibility barrier on SouthportGuide.co.uk, please let us know. We take this
              seriously and will aim to respond within 5 working days.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you find that Sunflower lanyards are not being recognised at a Southport venue, or if you have
              information about accessible Southport that should be in our guides, we want to hear that too.
            </p>
            <a
              href="mailto:hello@southportguide.co.uk"
              className="inline-flex items-center gap-2 bg-[#1B2E4B] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#243d63] transition-colors"
            >
              hello@southportguide.co.uk
            </a>
          </div>
        </section>

        {/* Related guides */}
        <section className="grid sm:grid-cols-2 gap-5 pb-8">
          <Link
            href="/guides/accessible-southport"
            className="group bg-[#1B2E4B] text-white rounded-2xl p-6 hover:bg-[#243d63] transition-colors"
          >
            <CheckCircle className="w-6 h-6 text-[#C9A84C] mb-3" />
            <h3 className="font-bold text-white text-base mb-1.5">Accessible Southport guide</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-3">
              Venue-by-venue accessibility guide. Sunflower venues, wheelchair access, quiet hours, and practical transport.
            </p>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              View guide <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link
            href="/guides/autism-friendly-southport"
            className="group bg-[#1C3A20] text-white rounded-2xl p-6 hover:bg-[#243d2a] transition-colors"
          >
            <Heart className="w-6 h-6 text-[#C9A84C] mb-3" />
            <h3 className="font-bold text-white text-base mb-1.5">Autism and sensory-friendly guide</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-3">
              Quiet venues, sensory-safe events, best visiting times, and practical advice for autistic visitors and families.
            </p>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              View guide <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </section>

      </div>
    </main>
  );
}
