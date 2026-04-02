"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageItem {
  src: string;
  alt: string;
}

interface Props {
  images: ImageItem[];
  gridClassName?: string;
  itemClassName?: string;
  imageClassName?: string;
  sizes?: string;
}

export default function GalleryLightbox({
  images,
  gridClassName,
  itemClassName,
  imageClassName,
  sizes,
}: Props) {
  const [idx, setIdx] = useState<number | null>(null);

  const prev = useCallback(
    () => setIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length]
  );

  useEffect(() => {
    if (idx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [idx, prev, next]);

  return (
    <>
      <div className={gridClassName}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative cursor-zoom-in group/lb overflow-hidden ${itemClassName ?? ""}`}
            onClick={() => setIdx(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={sizes}
              className={imageClassName}
            />
            <div className="absolute inset-0 bg-black/0 group-hover/lb:bg-black/15 transition-colors" />
            <div className="absolute top-1.5 right-1.5 opacity-0 group-hover/lb:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-1">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {idx !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center"
          onClick={() => setIdx(null)}
        >
          <button
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/25 text-white rounded-full p-2.5 transition-colors z-10"
            onClick={() => setIdx(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            className="relative w-full h-full max-w-5xl max-h-[88vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[idx].src}
              alt={images[idx].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <p className="absolute bottom-12 left-0 right-0 text-center text-white/40 text-sm px-4 line-clamp-1">
            {images[idx].alt}
          </p>

          {images.length > 1 && (
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === idx ? "bg-white" : "bg-white/30 hover:bg-white/60"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdx(i);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
