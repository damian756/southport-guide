"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type ReviewImage = { id: string; imageUrl: string };
type ReviewResponse = { id: string; body: string };

type Review = {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  starRating: number;
  title: string | null;
  body: string;
  verifiedType: string;
  approvedAt: string | null;
  images: ReviewImage[];
  response: ReviewResponse | null;
};

type RejectedNote = {
  id: string;
  removalNote: string | null;
  createdAt: string;
};

function displayName(r: Review) {
  if (r.displayName) return r.displayName;
  return `${r.firstName} ${r.lastName.charAt(0).toUpperCase()}.`;
}

function VerifiedBadge({ type }: { type: string }) {
  if (type === "purchase") {
    return (
      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium border border-amber-200">
        ✓ Verified Purchase
      </span>
    );
  }
  if (type === "email") {
    return (
      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full font-medium">
        ✓ Email Verified
      </span>
    );
  }
  return null;
}

function Stars({ n }: { n: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= n ? "text-amber-400" : "text-gray-200"}>★</span>
      ))}
    </span>
  );
}

// ── Customer Photo Gallery ─────────────────────────────────────────────────

function CustomerPhotoGallery({
  allImages,
  onOpenLightbox,
}: {
  allImages: { src: string }[];
  onOpenLightbox: (index: number) => void;
}) {
  if (allImages.length === 0) return null;
  const preview = allImages.slice(0, 12);
  const remaining = allImages.length - preview.length;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Camera className="w-4 h-4 text-gray-400" />
        <h3 className="font-semibold text-sm text-gray-700">
          Customer Photos <span className="text-gray-400 font-normal">({allImages.length})</span>
        </h3>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {preview.map((img, i) => (
          <button
            key={i}
            onClick={() => onOpenLightbox(i)}
            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            aria-label={`View photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={`Customer photo ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        {remaining > 0 && (
          <button
            onClick={() => onOpenLightbox(preview.length)}
            className="flex-shrink-0 w-20 h-20 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            aria-label={`View ${remaining} more photos`}
          >
            <span className="text-sm font-bold text-gray-600">+{remaining}</span>
            <span className="text-xs text-gray-400">more</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Review Card ────────────────────────────────────────────────────────────

function ReviewCard({
  review,
  imageOffset,
  onOpenLightbox,
}: {
  review: Review;
  imageOffset: number;
  onOpenLightbox: (index: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.body.length > 220;
  const bodyText = !isLong || expanded ? review.body : review.body.slice(0, 220) + "…";

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-[#1B2E4B]">{displayName(review)}</span>
            <Stars n={review.starRating} />
            <VerifiedBadge type={review.verifiedType} />
          </div>
          {review.title && (
            <p className="font-medium text-sm text-gray-800 mt-0.5">&ldquo;{review.title}&rdquo;</p>
          )}
        </div>
        {review.approvedAt && (
          <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">
            {new Date(review.approvedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">{bodyText}</p>

      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-1 text-xs text-[#C9A84C] font-medium hover:text-[#B8972A]"
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Read more</>
          )}
        </button>
      )}

      {review.images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {review.images.map((img, localIdx) => (
            <button
              key={img.id}
              onClick={() => onOpenLightbox(imageOffset + localIdx)}
              className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
              aria-label="View photo"
            >
              <Image
                src={img.imageUrl}
                alt="Review photo"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {review.response && (
        <div className="bg-blue-50 rounded-lg px-4 py-3 border border-blue-100">
          <p className="text-xs font-semibold text-blue-700 mb-1">Response from the business</p>
          <p className="text-sm text-gray-700">{review.response.body}</p>
        </div>
      )}
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

function Pagination({
  total,
  page,
  onChange,
}: {
  total: number;
  page: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
        // Always show first, last, current, and adjacent pages; collapse rest
        const show =
          p === 1 ||
          p === totalPages ||
          Math.abs(p - page) <= 1;

        if (!show) {
          // Show ellipsis only once per gap
          const prevShow =
            p - 1 === 1 ||
            p - 1 === totalPages ||
            Math.abs(p - 1 - page) <= 1;
          if (prevShow) {
            return (
              <span key={`ellipsis-${p}`} className="px-1 text-gray-400 text-sm">…</span>
            );
          }
          return null;
        }

        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
              p === page
                ? "bg-[#1B2E4B] text-white"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === Math.ceil(total / PAGE_SIZE)}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

type SortOption = "newest" | "highest" | "lowest" | "verified";

export default function ReviewListClient({
  reviews,
  rejected,
}: {
  reviews: Review[];
  rejected: RejectedNote[];
}) {
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Flatten all images for the gallery strip and lightbox
  const allImages = reviews.flatMap((r) =>
    r.images.map((img) => ({ src: img.imageUrl }))
  );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const sorted = [...reviews].sort((a, b) => {
    if (sort === "highest") return b.starRating - a.starRating;
    if (sort === "lowest") return a.starRating - b.starRating;
    if (sort === "verified") {
      if (a.verifiedType === "purchase" && b.verifiedType !== "purchase") return -1;
      if (b.verifiedType === "purchase" && a.verifiedType !== "purchase") return 1;
      return 0;
    }
    return new Date(b.approvedAt || 0).getTime() - new Date(a.approvedAt || 0).getTime();
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Build a map: review.id → start index in allImages[]
  const imageOffsets: Record<string, number> = {};
  let offset = 0;
  for (const r of reviews) {
    imageOffsets[r.id] = offset;
    offset += r.images.length;
  }

  function handleSortChange(newSort: SortOption) {
    setSort(newSort);
    setPage(1);
  }

  return (
    <>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allImages}
      />

      <div className="space-y-4">
        {/* Customer photo gallery strip */}
        {allImages.length > 0 && (
          <CustomerPhotoGallery
            allImages={allImages}
            onOpenLightbox={openLightbox}
          />
        )}

        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-display font-bold text-[#1B2E4B] text-lg">
            What visitors say
          </h3>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
          >
            <option value="newest">Newest first</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
            <option value="verified">Verified first</option>
          </select>
        </div>

        <div className="space-y-3">
          {paginated.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              imageOffset={imageOffsets[r.id] ?? 0}
              onOpenLightbox={openLightbox}
            />
          ))}
          {/* Removed notes only show on page 1 */}
          {page === 1 && rejected.map((r) => (
            <div key={r.id} className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4 text-sm text-gray-400 italic">
              One review removed — {r.removalNote}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            total={sorted.length}
            page={page}
            onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          />
        )}
      </div>
    </>
  );
}
