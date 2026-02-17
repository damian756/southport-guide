import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavMenu from "./components/NavMenu";

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

export const metadata: Metadata = {
  title: "SouthportGuide.co.uk | Your Definitive Guide to Southport",
  description: "Discover the best restaurants, hotels, attractions, and things to do in Southport. Your complete visitor guide for The Open 2026 and beyond.",
  keywords: "Southport, restaurants Southport, hotels Southport, things to do Southport, The Open 2026, Royal Birkdale",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-[#FAF8F5]`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
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
