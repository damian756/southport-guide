"use client";

import { useEffect } from "react";

export function ViewTracker({ businessId }: { businessId: string }) {
  useEffect(() => {
    fetch("/api/hub/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId }),
    }).catch(() => {
      // A blocked or failed count (an ad blocker, a dropped connection) is not the
      // visitor's problem: no console error, nothing shown.
    });
  }, [businessId]);
  return null;
}
