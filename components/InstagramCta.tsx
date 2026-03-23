import { Instagram } from "lucide-react";

/** Canonical SouthportGuide Instagram — single social channel for the site */
export const INSTAGRAM_URL = "https://www.instagram.com/southportguide/" as const;

type Variant = "footer" | "contact" | "compact";

/**
 * Accessible, brand-aligned Instagram CTA. Use one variant per context.
 */
export function InstagramCta({ variant }: { variant: Variant }) {
  const label = "SouthportGuide on Instagram";
  const handle = "@southportguide";

  if (variant === "compact") {
    return (
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (${handle})`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:border-[#C9A84C]/50 hover:bg-white/[0.12] hover:text-[#E8C87A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]"
      >
        <Instagram className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
      </a>
    );
  }

  if (variant === "contact") {
    return (
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} — opens in a new tab`}
        className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#C9A84C]/35 hover:shadow-md"
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] shadow-inner"
          aria-hidden
        >
          <Instagram className="h-6 w-6 text-white" strokeWidth={2.25} />
        </span>
        <span className="min-w-0 text-left">
          <span className="font-display text-sm font-bold text-[#1B2E4B] group-hover:text-[#C9A84C] transition-colors">
            Follow on Instagram
          </span>
          <span className="mt-0.5 block text-xs text-gray-500">{handle} · drone, walks &amp; what&apos;s on</span>
        </span>
        <span className="ml-auto text-[#C9A84C] text-sm font-semibold opacity-0 transition group-hover:opacity-100 max-sm:hidden">
          Follow →
        </span>
      </a>
    );
  }

  // footer
  return (
    <div className="mt-6">
      <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">Follow us</p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (${handle}) — opens in a new tab`}
        className="group flex max-w-sm items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 shadow-lg shadow-black/25 transition duration-300 hover:border-[#C9A84C]/45 hover:from-white/[0.11] hover:to-white/[0.05] hover:shadow-xl hover:shadow-[#C9A84C]/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]"
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] ring-2 ring-white/10 transition group-hover:ring-[#C9A84C]/30 group-hover:scale-[1.03]"
          aria-hidden
        >
          <Instagram className="h-6 w-6 text-white" strokeWidth={2.25} />
        </span>
        <span className="min-w-0 text-left">
          <span className="font-display text-sm font-bold text-white transition group-hover:text-[#E8C87A]">
            Instagram
          </span>
          <span className="mt-0.5 block text-xs text-white/50 transition group-hover:text-white/65">{handle}</span>
        </span>
        <span
          className="ml-auto hidden text-[#C9A84C] text-xs font-bold uppercase tracking-wide opacity-70 transition group-hover:opacity-100 sm:block"
          aria-hidden
        >
          ↗
        </span>
      </a>
    </div>
  );
}
