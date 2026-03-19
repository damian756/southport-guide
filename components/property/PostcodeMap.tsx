"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });
import { divIcon } from "leaflet";

export type MapPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "school" | "business";
  href?: string;
  subtitle?: string;
};

type Props = {
  center: { lat: number; lng: number };
  points: MapPoint[];
  height?: number;
};

export default function PostcodeMap({ center, points, height = 400 }: Props) {
  const validPoints = points.filter((p) => p.lat && p.lng);

  if (validPoints.length === 0) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
        style={{ height }}
      >
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
        </MapContainer>
      </div>
    );
  }

  const schoolColor = "#2E7D6E";
  const businessColor = "#1B2E4B";

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
      style={{ height }}
    >
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        {validPoints.map((p) => {
          const color = p.type === "school" ? schoolColor : businessColor;
          const icon = divIcon({
            className: "",
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -28],
            html: `<div style="
              width:24px;height:24px;
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              background:${color};
              border:2px solid white;
              box-shadow:0 2px 6px rgba(0,0,0,0.35);
            "></div>`,
          });

          return (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
              <Popup maxWidth={240}>
                <div style={{ fontFamily: "system-ui,sans-serif", padding: "2px 0" }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#1B2E4B", margin: "0 0 4px" }}>
                    {p.name}
                  </p>
                  {p.subtitle && (
                    <p style={{ color: "#6b7280", fontSize: 11, margin: "0 0 8px" }}>{p.subtitle}</p>
                  )}
                  {p.href && (
                    <a
                      href={p.href}
                      style={{
                        display: "inline-block",
                        background: color,
                        color: "white",
                        textDecoration: "none",
                        borderRadius: 20,
                        padding: "5px 14px",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      View →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="absolute bottom-4 left-4 z-[1000] flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2 text-xs text-gray-600 shadow backdrop-blur-sm">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-[#2E7D6E]" />
          Schools
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-[#1B2E4B]" />
          Businesses
        </span>
      </div>
    </div>
  );
}
