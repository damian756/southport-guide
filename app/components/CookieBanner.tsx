"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";
import { useCookieConsent } from "./CookieProvider";

export default function CookieBanner() {
  const { consent, acceptAll, acceptNecessary } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  // Don't render if consent already given
  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-[#1B2E4B] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Gold accent line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center flex-none mt-0.5">
              <Cookie className="w-4.5 h-4.5 text-[#C9A84C]" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-white text-base leading-snug">
                This site uses cookies
              </p>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                We use cookies to improve your experience and help us understand how visitors use the site. Analytics cookies are only set with your consent. Affiliate links (e.g. hotel booking) use third-party tracking.
              </p>
            </div>
          </div>

          {/* Expandable details */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 text-white/50 hover:text-white/80 text-xs font-medium transition-colors mb-4"
          >
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showDetails ? "Hide details" : "What cookies do we use?"}
          </button>

          {showDetails && (
            <div className="mb-5 rounded-xl overflow-hidden border border-white/10 text-xs">
              <div className="grid grid-cols-3 bg-white/5 text-white/40 font-semibold uppercase tracking-wider px-4 py-2">
                <span>Category</span>
                <span>Purpose</span>
                <span>Consent</span>
              </div>
              {[
                { cat: "Necessary", purpose: "Session, security, your cookie preference", consent: "Always on" },
                { cat: "Analytics", purpose: "Page views, traffic sources (Google Analytics)", consent: "Optional" },
                { cat: "Marketing", purpose: "Booking.com affiliate tracking, ad referrals", consent: "Optional" },
              ].map(({ cat, purpose, consent: c }) => (
                <div key={cat} className="grid grid-cols-3 px-4 py-3 border-t border-white/5 text-white/70">
                  <span className="font-semibold text-white/90">{cat}</span>
                  <span>{purpose}</span>
                  <span className={c === "Always on" ? "text-[#C9A84C]" : "text-white/50"}>{c}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={acceptAll}
              className="flex-1 sm:flex-none bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
            >
              Accept all
            </button>
            <button
              onClick={acceptNecessary}
              className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
            >
              Necessary only
            </button>
            <Link
              href="/privacy#cookies"
              className="text-center text-white/40 hover:text-white/70 text-xs transition-colors sm:ml-auto"
            >
              Cookie policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
