"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

export type MapPin = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
  listingTier: string;
  address: string;
  category: string;
};

type Props = {
  pins: MapPin[];
  accentColor: string;
};

// Southport town centre
const DEFAULT_CENTER: [number, number] = [53.6452, -3.0056];
const DEFAULT_ZOOM = 13;

export default function CategoryMap({ pins, accentColor }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamic import to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix Leaflet's broken default icon paths in bundled envs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!containerRef.current || mapRef.current) return;

      const validPins = pins.filter((p) => p.lat && p.lng);

      // Centre on pins if available, else default
      let center: [number, number] = DEFAULT_CENTER;
      let zoom = DEFAULT_ZOOM;
      if (validPins.length === 1) {
        center = [validPins[0].lat, validPins[0].lng];
        zoom = 15;
      }

      const map = L.map(containerRef.current, {
        center,
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      mapRef.current = map;

      // OpenStreetMap tiles — free, no API key
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Build a coloured circle marker for each pin
      const markerColor = accentColor || "#1B2E4B";

      validPins.forEach((pin) => {
        const isFeatured = pin.listingTier === "featured" || pin.listingTier === "premium";

        const icon = L.divIcon({
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -30],
          html: `<div style="
            width:28px;height:28px;border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            background:${isFeatured ? "#C9A84C" : markerColor};
            border:2px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.35);
          "></div>`,
        });

        const ratingHtml = pin.rating
          ? `<span style="display:inline-flex;align-items:center;gap:3px;background:#fffbeb;border:1px solid #fde68a;color:#92400e;border-radius:12px;padding:2px 8px;font-size:11px;font-weight:700;">
               ★ ${pin.rating.toFixed(1)}${pin.reviewCount ? ` <span style="font-weight:400;color:#b45309;">(${pin.reviewCount.toLocaleString()})</span>` : ""}
             </span>`
          : "";

        const priceHtml = pin.priceRange
          ? `<span style="color:#6b7280;font-size:11px;font-weight:600;">${pin.priceRange}</span>`
          : "";

        const popup = L.popup({ maxWidth: 240, className: "sg-popup" }).setContent(`
          <div style="font-family:system-ui,sans-serif;padding:2px 0;">
            <p style="font-weight:700;font-size:13px;color:#1B2E4B;margin:0 0 4px;">${pin.name}</p>
            <p style="color:#9ca3af;font-size:11px;margin:0 0 8px;">${pin.address.split(",")[0]}</p>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
              ${ratingHtml}${priceHtml}
            </div>
            <a href="/${pin.category}/${pin.slug}"
               style="display:inline-block;background:${markerColor};color:white;text-decoration:none;
                      border-radius:20px;padding:5px 14px;font-size:12px;font-weight:700;">
              View listing →
            </a>
          </div>
        `);

        L.marker([pin.lat, pin.lng], { icon }).addTo(map).bindPopup(popup);
      });

      // Fit map to all pins
      if (validPins.length > 1) {
        const bounds = L.latLngBounds(validPins.map((p) => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 520 }}>
      <div ref={containerRef} className="w-full h-full" />
      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow text-xs text-gray-600 flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: accentColor }} />
          Standard
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full inline-block bg-[#C9A84C]" />
          Featured
        </span>
      </div>
    </div>
  );
}

// Lightweight placeholder shown while client map loads
export function MapSkeleton() {
  return (
    <div className="w-full rounded-2xl bg-gray-100 border border-gray-200 animate-pulse flex items-center justify-center" style={{ height: 520 }}>
      <div className="text-center text-gray-400">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-sm">Loading map…</p>
      </div>
    </div>
  );
}
