"use client";

// Leaflet map with one pin, on OpenStreetMap tiles: business listings, parking
// pages and guides with a stored location. Loaded only in the browser through
// components/ListingMapLazy.tsx, so Leaflet and its CSS are never part of a page
// that shows no map.

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Browser, divIcon, type Map as LeafletMap } from "leaflet";
import { OSM_ATTRIBUTION, OSM_MAX_ZOOM, OSM_TILE_URL } from "@/lib/osm-tiles";

type Props = { lat: number; lng: number; name: string };

// Same teardrop pin as the category map.
const PIN = divIcon({
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  html: `<div style="
    width:28px;height:28px;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    background:#1B2E4B;
    border:2px solid white;
    box-shadow:0 2px 6px rgba(0,0,0,0.35);
  "></div>`,
});

export default function ListingMap({ lat, lng, name }: Props) {
  // The map box is one tab stop (arrow keys pan, + and - zoom); Tab moves on
  // through the zoom buttons and attribution to the links under the map.
  const label = (map: LeafletMap | null) => {
    const el = map?.getContainer();
    if (!el) return;
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", `Map showing where ${name} is`);
  };

  return (
    <MapContainer
      ref={label}
      center={[lat, lng]}
      zoom={16}
      scrollWheelZoom={false}
      // On phones one finger scrolls the page, two fingers zoom the map.
      dragging={!Browser.mobile}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url={OSM_TILE_URL} attribution={OSM_ATTRIBUTION} maxZoom={OSM_MAX_ZOOM} />
      <Marker position={[lat, lng]} icon={PIN} interactive={false} keyboard={false} />
    </MapContainer>
  );
}
