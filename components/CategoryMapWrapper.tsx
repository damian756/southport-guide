"use client";

import dynamic from "next/dynamic";
import { MapSkeleton, type MapPin } from "./CategoryMap";

const CategoryMap = dynamic(() => import("./CategoryMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default function CategoryMapWrapper({
  pins,
  accentColor,
}: {
  pins: MapPin[];
  accentColor: string;
}) {
  return <CategoryMap pins={pins} accentColor={accentColor} />;
}
