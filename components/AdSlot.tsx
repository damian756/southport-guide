import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AD_SLOTS, activeSponsor, advertiseHref, getAdOption, type AdSlotDef } from "@/lib/ad-slots";

// One advert space. Filled: the sponsor's card, labelled "Advertisement" (home
// page) or "Sponsor" (guides, events, posts), with a rel="sponsored" link.
// Empty: the "advertise here" card that names the space and links to
// /advertise?space=<id>#<option>. Spaces and sponsors live in lib/ad-slots.ts.

const FEATURED_NOUN: Record<string, string> = {
  "featured-restaurants": "restaurant",
  "featured-cafes": "cafe",
  "featured-bars-nightlife": "bar or pub",
  "featured-hotels": "hotel or B&B",
  "featured-attractions": "attraction",
  "featured-shopping": "shop",
  "featured-golf": "golf business",
  "featured-wellness": "business",
  "featured-activities": "activity",
};

function emptyCopy(slot: AdSlotDef): { kicker: string; heading: string; body: string } {
  switch (slot.kind) {
    case "home":
      return {
        kicker: "Advertising space",
        heading: "Your Southport business here",
        body: "One local business on the home page, clearly labelled as an advert, with a photo, a few words about you and a link.",
      };
    case "featured":
      return {
        kicker: "Featured spot available",
        heading: `Put your ${FEATURED_NOUN[slot.id] ?? "business"} at the top of this page`,
        body: "A boost puts you above the other listings for a set period, marked Featured so visitors know it is a paid placement. Listings below stay in their normal order.",
      };
    case "event":
      return {
        kicker: "Sponsor this event guide",
        heading: `Sponsor the ${slot.label} guide`,
        body: "Your business shown at the end of this guide for the six weeks before the event, labelled as a sponsor.",
      };
    case "post":
      return {
        kicker: "Sponsor this post",
        heading: `Sponsor the ${slot.label} post`,
        body: "Your business shown once at the end of this post, labelled as a sponsor. Adverts never appear inside a review, and paying for a space does not change what we write.",
      };
    default:
      return {
        kicker: "Sponsor this guide",
        heading: `Sponsor the ${slot.label} guide`,
        body: "Your business shown once at the end of this guide, labelled as a sponsor. Adverts never appear inside a review, and paying for a space does not change what we write.",
      };
  }
}

export default function AdSlot({ id, className = "" }: { id: string; className?: string }) {
  const slot = AD_SLOTS[id];
  if (!slot) return null;

  const sponsor = activeSponsor(slot);

  if (sponsor) {
    if (process.env.NODE_ENV !== "production" && sponsor.text.trim().split(/\s+/).length > 30) {
      console.warn(`[AdSlot] ${id}: sponsor text is over 30 words`);
    }
    const label = slot.kind === "home" ? "Advertisement" : "Sponsor";
    return (
      <aside
        aria-label={label}
        data-ad-slot={slot.id}
        className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:items-center ${className}`}
      >
        {sponsor.image && (
          <div className="relative w-full sm:w-48 aspect-[16/10] flex-none rounded-xl overflow-hidden bg-[#FAF8F5]">
            <Image src={sponsor.image} alt={sponsor.name} fill sizes="(max-width: 640px) 100vw, 192px" className="object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1B2E4B] mb-1.5">{label}</p>
          <p className="font-display text-lg font-bold text-[#1B2E4B] leading-snug mb-1">
            <a href={sponsor.url} target="_blank" rel="sponsored noopener" className="hover:text-[#C9A84C] transition-colors">
              {sponsor.name}
            </a>
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">{sponsor.text}</p>
        </div>
        <a
          href={sponsor.url}
          target="_blank"
          rel="sponsored noopener"
          className="self-start sm:self-center flex-none inline-flex items-center gap-2 bg-[#1B2E4B] hover:bg-[#C9A84C] hover:text-[#1B2E4B] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
        >
          Visit website <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </aside>
    );
  }

  const option = getAdOption(slot.option);
  const copy = emptyCopy(slot);
  const priceName = slot.kind === "featured" ? slot.title : slot.kind === "post" ? "Post sponsor" : option?.name;
  const priceLine = option?.from;

  return (
    <aside
      aria-label="Advertising space"
      data-ad-slot={slot.id}
      className={`rounded-2xl border-[1.5px] border-dashed border-[#C9A84C]/60 bg-[#FAF8F5] px-6 py-5 flex flex-wrap items-center justify-between gap-4 ${className}`}
    >
      <div className="min-w-[240px] flex-[1_1_380px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A84C] mb-1.5">{copy.kicker}</p>
        <p className="font-display text-[19px] font-bold text-[#1B2E4B] leading-snug mb-1.5">{copy.heading}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{copy.body}</p>
      </div>
      <div className="flex flex-col items-start gap-2">
        {option && priceLine && (
          <span className="text-[13px] font-semibold text-[#1B2E4B]">
            {priceName} · {priceLine}
          </span>
        )}
        <Link
          href={advertiseHref(slot)}
          className="inline-block bg-[#1B2E4B] hover:bg-[#C9A84C] hover:text-[#1B2E4B] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
        >
          See advertising options
        </Link>
      </div>
    </aside>
  );
}
