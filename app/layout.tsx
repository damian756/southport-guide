import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavMenu from "./components/NavMenu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SouthportGuide.co.uk | Your Definitive Guide to Southport",
  description: "Discover the best restaurants, hotels, attractions, and things to do in Southport. Your complete visitor guide for The Open 2026 and beyond.",
  keywords: "Southport, restaurants Southport, hotels Southport, things to do Southport, The Open 2026, Royal Birkdale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 flex-shrink-0">
            SouthportGuide
          </Link>
          {/* Nav items (client component handles dropdown + mobile) */}
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SouthportGuide</h3>
            <p className="text-sm mb-4">
              Your definitive guide to eating, staying, and exploring Southport.
            </p>
            <p className="text-sm">
              Built by{" "}
              <a href="https://churchtownmedia.co.uk" className="text-blue-400 hover:underline">
                Churchtown Media
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/restaurants" className="hover:text-white transition">Restaurants</Link></li>
              <li><Link href="/hotels" className="hover:text-white transition">Hotels</Link></li>
              <li><Link href="/bars-nightlife" className="hover:text-white transition">Bars & Pubs</Link></li>
              <li><Link href="/attractions" className="hover:text-white transition">Attractions</Link></li>
              <li><Link href="/golf" className="hover:text-white transition">Golf</Link></li>
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Events</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/the-open-2026" className="hover:text-white transition">The Open 2026</Link></li>
              <li><Link href="/mlec" className="hover:text-white transition">MLEC</Link></li>
              <li><Link href="/events" className="hover:text-white transition">All Events</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">For Businesses</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/advertise" className="hover:text-white transition">Advertise With Us</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/claim-listing" className="hover:text-white transition">Claim Your Listing</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Business Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 SouthportGuide.co.uk. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
