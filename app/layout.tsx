import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavMenu from "./components/NavMenu";
import { CookieProvider } from "./components/CookieProvider";
import CookieBanner from "./components/CookieBanner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "SouthportGuide.co.uk — The Complete Visitor Guide to Southport",
    template: "%s | SouthportGuide.co.uk",
  },
  description:
    "Discover the best restaurants, hotels, bars, attractions and things to do in Southport. Your complete local guide — home of The Open Championship 2026.",
  keywords:
    "Southport, restaurants Southport, hotels Southport, things to do Southport, The Open 2026, Royal Birkdale, visitor guide, Southport Guide",
  authors: [{ name: "Churchtown Media", url: "https://churchtownmedia.co.uk" }],
  creator: "Churchtown Media",
  publisher: "SouthportGuide.co.uk",

  // Canonical
  alternates: {
    canonical: BASE_URL,
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE_URL,
    siteName: "SouthportGuide.co.uk",
    title: "SouthportGuide.co.uk — The Complete Visitor Guide to Southport",
    description:
      "Discover the best restaurants, hotels, bars, attractions and things to do in Southport. Your complete local guide — home of The Open Championship 2026.",
    images: [
      {
        url: `${BASE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "SouthportGuide.co.uk — Discover Southport",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "SouthportGuide.co.uk — The Complete Visitor Guide to Southport",
    description: "Discover the best restaurants, hotels, bars, attractions and things to do in Southport.",
    images: [`${BASE_URL}/og-default.png`],
    creator: "@SouthportGuide",
  },

  // Icons — served from app/icon.png and app/apple-icon.png via Next.js file convention
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "512x512", type: "image/png" }],
  },

  // PWA
  manifest: "/manifest.json",

  // Verification (add Search Console token when ready)
  // verification: { google: "YOUR_SEARCH_CONSOLE_VERIFICATION_TOKEN" },

  // Misc
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-[#FAF8F5]`}>
        <CookieProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </CookieProvider>
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-[#1B2E4B]/8 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <span className="font-display text-xl font-bold text-[#1B2E4B] group-hover:text-[#C9A84C] transition-colors">
              Southport<span className="text-[#C9A84C]">Guide</span>
            </span>
            <span className="hidden sm:block text-xs text-gray-400 font-light tracking-widest uppercase mt-0.5">.co.uk</span>
          </Link>
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1B2E4B] text-white/80">
      {/* Gold accent strip */}
      <div className="h-1 bg-gradient-to-r from-[#C9A84C] via-[#E8C87A] to-[#C9A84C]" />

      <div className="container mx-auto px-4 py-14 max-w-7xl">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-2xl font-bold text-white mb-3">
              Southport<span className="text-[#C9A84C]">Guide</span>
              <span className="text-white/40 text-sm font-normal ml-1">.co.uk</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-4 max-w-xs">
              Your definitive guide to eating, staying, and exploring Southport — home of The Open Championship 2026.
            </p>
            <div className="flex gap-3">
              <a href="https://churchtownmedia.co.uk" className="text-xs text-[#C9A84C] hover:text-[#E8C87A] transition">
                Built by Churchtown Media ↗
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Restaurants", "/restaurants"],
                ["Hotels", "/hotels"],
                ["Bars & Pubs", "/bars-nightlife"],
                ["Cafes", "/cafes"],
                ["Attractions", "/attractions"],
                ["Golf", "/golf"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-[#C9A84C] transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">More</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Beaches & Parks", "/beaches-parks"],
                ["Shopping", "/shopping"],
                ["Wellness", "/wellness"],
                ["Activities", "/activities"],
                ["Transport", "/transport"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-[#C9A84C] transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">For Business</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["List Your Business", "/claim-listing"],
                ["Pricing", "/pricing"],
                ["Advertise With Us", "/advertise"],
                ["Business Dashboard", "/dashboard"],
                ["The Open 2026", "/the-open-2026"],
                ["MLEC", "/mlec"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-[#C9A84C] transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; 2026 SouthportGuide.co.uk — All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white/70 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70 transition">Terms</Link>
            <Link href="/contact" className="hover:text-white/70 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
