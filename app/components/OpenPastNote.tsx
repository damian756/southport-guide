import Link from "next/link";
import { CalendarDays } from "lucide-react";

/** Shown at the top of The Open 2026 visitor pages, which were written before the championship. */
export default function OpenPastNote() {
  return (
    <div role="note" className="bg-amber-50 border-b border-amber-200">
      <div className="container mx-auto px-4 max-w-6xl py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#1B2E4B]">
        <CalendarDays className="w-4 h-4 text-[#B8972A] flex-none" aria-hidden />
        <p className="font-semibold">
          The Open 2026 at Royal Birkdale finished on 19 July 2026. This page was written for Open week and is kept for reference.
        </p>
        <Link href="/the-open-2026" className="text-[#8a6d1f] underline underline-offset-2 hover:text-[#1B2E4B]">
          Results and review
        </Link>
      </div>
    </div>
  );
}
