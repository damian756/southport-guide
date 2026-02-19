"use client";

import { useState } from "react";
import { LayoutGrid, Map } from "lucide-react";
import CategoryMapWrapper from "./CategoryMapWrapper";
import type { MapPin } from "./CategoryMap";

type Props = {
  pins: MapPin[];
  accentColor: string;
  listView: React.ReactNode;
};

export default function ViewToggle({ pins, accentColor, listView }: Props) {
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <>
      {/* Toggle buttons */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setView("list")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            view === "list"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          List
        </button>
        <button
          onClick={() => setView("map")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            view === "map"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          Map
        </button>
      </div>

      {/* Content */}
      <div className="mt-0">
        {view === "list" ? (
          listView
        ) : (
          <CategoryMapWrapper pins={pins} accentColor={accentColor} />
        )}
      </div>
    </>
  );
}
