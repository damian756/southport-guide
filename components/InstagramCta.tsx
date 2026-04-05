import { Instagram } from "lucide-react";

export const INSTAGRAM_URL = "https://www.instagram.com/southportguide/" as const;
export const FACEBOOK_URL  = "https://www.facebook.com/southportguide/" as const;
export const X_URL         = "https://x.com/SouthportGuide" as const;

/** Facebook 'f' logo — inline SVG (lucide-react has no Facebook icon) */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

/** X (Twitter) logo — inline SVG */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

type Variant = "footer" | "contact" | "compact";

/**
 * Social links for SouthportGuide — Instagram, Facebook and X.
 * Replaces the old InstagramCta component (same prop API).
 */
export function InstagramCta({ variant }: { variant: Variant }) {
  return <SocialLinks variant={variant} />;
}

export function SocialLinks({ variant }: { variant: Variant }) {

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on Instagram (@southportguide) — opens in a new tab"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:border-[#C9A84C]/50 hover:bg-white/[0.12] hover:text-[#E8C87A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]"
        >
          <Instagram className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
        </a>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on Facebook — opens in a new tab"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 hover:text-[#4fa3ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
        >
          <FacebookIcon className="h-[18px] w-[18px]" />
        </a>
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on X (Twitter) — opens in a new tab"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:border-white/40 hover:bg-white/[0.12] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <XIcon className="h-[16px] w-[16px]" />
        </a>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className="flex flex-col gap-3">
        {/* Instagram */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on Instagram — opens in a new tab"
          className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-[#C9A84C]/35 hover:shadow-md"
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] shadow-inner"
            aria-hidden
          >
            <Instagram className="h-6 w-6 text-white" strokeWidth={2.25} />
          </span>
          <span className="min-w-0 text-left">
            <span className="font-display text-sm font-bold text-[#1B2E4B] group-hover:text-[#C9A84C] transition-colors block">
              Follow on Instagram
            </span>
            <span className="mt-0.5 block text-xs text-gray-500">@southportguide · drone, walks &amp; what&apos;s on</span>
          </span>
          <span className="ml-auto text-[#C9A84C] text-sm font-semibold opacity-0 transition group-hover:opacity-100 max-sm:hidden" aria-hidden>
            Follow →
          </span>
        </a>

        {/* Facebook */}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on Facebook — opens in a new tab"
          className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-[#1877F2]/30 hover:shadow-md"
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] shadow-inner"
            aria-hidden
          >
            <FacebookIcon className="h-6 w-6 text-white" />
          </span>
          <span className="min-w-0 text-left">
            <span className="font-display text-sm font-bold text-[#1B2E4B] group-hover:text-[#1877F2] transition-colors block">
              Follow on Facebook
            </span>
            <span className="mt-0.5 block text-xs text-gray-500">@southportguide · news &amp; events</span>
          </span>
          <span className="ml-auto text-[#1877F2] text-sm font-semibold opacity-0 transition group-hover:opacity-100 max-sm:hidden" aria-hidden>
            Follow →
          </span>
        </a>

        {/* X */}
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on X (Twitter) — opens in a new tab"
          className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-gray-400/40 hover:shadow-md"
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black shadow-inner"
            aria-hidden
          >
            <XIcon className="h-6 w-6 text-white" />
          </span>
          <span className="min-w-0 text-left">
            <span className="font-display text-sm font-bold text-[#1B2E4B] group-hover:text-black transition-colors block">
              Follow on X (Twitter)
            </span>
            <span className="mt-0.5 block text-xs text-gray-500">@SouthportGuide · live news updates</span>
          </span>
          <span className="ml-auto text-black text-sm font-semibold opacity-0 transition group-hover:opacity-100 max-sm:hidden" aria-hidden>
            Follow →
          </span>
        </a>
      </div>
    );
  }

  // footer
  return (
    <div className="mt-6">
      <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">Follow us</p>
      <div className="flex flex-col gap-3">
        {/* Instagram */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on Instagram (@southportguide) — opens in a new tab"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 shadow-lg shadow-black/25 transition duration-300 hover:border-[#C9A84C]/45 hover:from-white/[0.11] hover:to-white/[0.05] hover:shadow-xl hover:shadow-[#C9A84C]/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] ring-2 ring-white/10 transition group-hover:ring-[#C9A84C]/30 group-hover:scale-[1.03]"
            aria-hidden
          >
            <Instagram className="h-5 w-5 text-white" strokeWidth={2.25} />
          </span>
          <span className="min-w-0 text-left">
            <span className="font-display text-sm font-bold text-white transition group-hover:text-[#E8C87A] block">
              Instagram
            </span>
            <span className="mt-0.5 block text-xs text-white/50 transition group-hover:text-white/65">@southportguide</span>
          </span>
          <span className="ml-auto hidden text-[#C9A84C] text-xs font-bold uppercase tracking-wide opacity-70 transition group-hover:opacity-100 sm:block" aria-hidden>
            ↗
          </span>
        </a>

        {/* Facebook */}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on Facebook — opens in a new tab"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 shadow-lg shadow-black/25 transition duration-300 hover:border-[#1877F2]/40 hover:from-white/[0.11] hover:to-white/[0.05] hover:shadow-xl hover:shadow-[#1877F2]/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] ring-2 ring-white/10 transition group-hover:ring-[#1877F2]/40 group-hover:scale-[1.03]"
            aria-hidden
          >
            <FacebookIcon className="h-5 w-5 text-white" />
          </span>
          <span className="min-w-0 text-left">
            <span className="font-display text-sm font-bold text-white transition group-hover:text-[#4fa3ff] block">
              Facebook
            </span>
            <span className="mt-0.5 block text-xs text-white/50 transition group-hover:text-white/65">@southportguide</span>
          </span>
          <span className="ml-auto hidden text-[#1877F2] text-xs font-bold uppercase tracking-wide opacity-70 transition group-hover:opacity-100 sm:block" aria-hidden>
            ↗
          </span>
        </a>

        {/* X */}
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SouthportGuide on X (@SouthportGuide) — opens in a new tab"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 shadow-lg shadow-black/25 transition duration-300 hover:border-white/25 hover:from-white/[0.11] hover:to-white/[0.05] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black ring-2 ring-white/10 transition group-hover:ring-white/25 group-hover:scale-[1.03]"
            aria-hidden
          >
            <XIcon className="h-5 w-5 text-white" />
          </span>
          <span className="min-w-0 text-left">
            <span className="font-display text-sm font-bold text-white transition group-hover:text-white block">
              X
            </span>
            <span className="mt-0.5 block text-xs text-white/50 transition group-hover:text-white/65">@SouthportGuide</span>
          </span>
          <span className="ml-auto hidden text-white text-xs font-bold uppercase tracking-wide opacity-70 transition group-hover:opacity-100 sm:block" aria-hidden>
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}
