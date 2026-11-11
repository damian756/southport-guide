"use client";

// Click-to-load Google map, for the few listings that have a Google place id but
// no stored latitude and longitude. Nothing is requested from Google until the
// visitor presses the button. The embed is Google's keyless one, searched by the
// listing's name and address, so no API key is ever sent to the browser. This is
// the only file on the site allowed to build a Google Maps embed URL:
// tests/maps.test.mjs checks that, that no iframe is rendered before the click,
// and that no key is passed in.

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

type Props = { query: string; name: string };

function embedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}

export default function GoogleMapClickToLoad({ query, name }: Props) {
  const [shown, setShown] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  // The button goes away on click; move focus to the map that replaces it.
  useEffect(() => {
    if (shown) frame.current?.focus();
  }, [shown]);

  if (!shown) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <button
          type="button"
          onClick={() => setShown(true)}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Show map (Google Maps)
        </button>
        <p className="max-w-xs text-xs text-gray-500">
          The map comes from Google. Nothing is loaded from Google until you click.
        </p>
      </div>
    );
  }

  return (
    <iframe
      ref={frame}
      src={embedUrl(query)}
      className="absolute inset-0 h-full w-full border-0"
      title={`Google map showing where ${name} is`}
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
