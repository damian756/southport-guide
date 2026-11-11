// OpenStreetMap standard tiles, shared by every Leaflet map on the site
// (components/ListingMap.tsx, components/CategoryMap.tsx and
// components/property/PostcodeMap.tsx).
//
// OSMF Tile Usage Policy (operations.osmfoundation.org/policies/tiles/, read 11 Nov 2026):
// - use exactly https://tile.openstreetmap.org/{z}/{x}/{y}.png (no a/b/c subdomains);
// - show visible attribution on the map ("© OpenStreetMap contributors");
// - the browser sends its own User-Agent and a Referer (our origin);
// - no bulk download or prefetching: maps only ask for the tiles in view, and the
//   listing map is only mounted when it comes near the screen.
export const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const OSM_MAX_ZOOM = 19;
