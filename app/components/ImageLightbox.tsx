"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  containerClassName?: string;
  imageClassName?: string;
  children?: React.ReactNode;
}

export default function ImageLightbox({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  containerClassName = "",
  imageClassName = "",
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`relative cursor-zoom-in group/lb ${containerClassName}`}
        onClick={() => setOpen(true)}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={imageClassName}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 1200}
            height={height ?? 800}
            className={imageClassName}
            priority={priority}
          />
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover/lb:opacity-100 transition-opacity pointer-events-none z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5">
            <svg
              className="w-3.5 h-3.5 text-white"
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
        {children}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/25 text-white rounded-full p-2.5 transition-colors z-10"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="absolute bottom-5 left-0 right-0 text-center text-white/40 text-sm px-4 line-clamp-1">
            {alt}
          </p>
        </div>
      )}
    </>
  );
}
