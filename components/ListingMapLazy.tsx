"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Leaflet is imported dynamically and never rendered on the server. The map is
// mounted when its box comes near the screen, so a visitor who never scrolls to
// it (or a box hidden at this screen width) asks the OpenStreetMap tile servers
// for nothing.
const ListingMap = dynamic(() => import("./ListingMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">Loading map</div>
  ),
});

type Props = { lat: number; lng: number; name: string };

export default function ListingMapLazy(props: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="absolute inset-0">
      {near ? <ListingMap {...props} /> : null}
    </div>
  );
}
