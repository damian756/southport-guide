// Images we show with the owner's permission and a visible credit. A logo is shown whole
// (contained on a light background), never cropped, and its alt text says it is a logo.
// Matched by path prefix, so a listing's stored image path is enough.

export type ImageCredit = {
  credit: string; // shown on the image, e.g. "Image: Southport Agricultural Show"
  isLogo: boolean;
  background: string; // CSS colour behind a contained image
};

const CREDITS: { prefix: string; info: ImageCredit }[] = [
  {
    prefix: "/images/agshow/",
    info: { credit: "Image: Southport Agricultural Show", isLogo: true, background: "#F6F2ED" },
  },
];

export function imageCreditFor(src: string | null | undefined): ImageCredit | null {
  if (!src) return null;
  return CREDITS.find((c) => src.startsWith(c.prefix))?.info ?? null;
}

/** Alt text for a listing image: "[name] logo" for a logo, otherwise the name. */
export function listingImageAlt(name: string, src: string | null | undefined): string {
  return imageCreditFor(src)?.isLogo ? `${name} logo` : name;
}
