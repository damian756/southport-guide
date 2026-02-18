"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ConsentLevel = "all" | "necessary" | null;

interface CookieContextValue {
  consent: ConsentLevel;
  acceptAll: () => void;
  acceptNecessary: () => void;
  resetConsent: () => void;
}

const CookieContext = createContext<CookieContextValue>({
  consent: null,
  acceptAll: () => {},
  acceptNecessary: () => {},
  resetConsent: () => {},
});

const STORAGE_KEY = "sg_cookie_consent";

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentLevel>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentLevel | null;
    if (stored === "all" || stored === "necessary") {
      setConsent(stored);
    }
    setMounted(true);
  }, []);

  function acceptAll() {
    localStorage.setItem(STORAGE_KEY, "all");
    setConsent("all");
    // Fire event so any deferred analytics scripts can initialise
    window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: "all" }));
  }

  function acceptNecessary() {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setConsent("necessary");
    window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: "necessary" }));
  }

  function resetConsent() {
    localStorage.removeItem(STORAGE_KEY);
    setConsent(null);
  }

  // Avoid hydration mismatch — don't render consent-dependent UI until mounted
  if (!mounted) return <>{children}</>;

  return (
    <CookieContext.Provider value={{ consent, acceptAll, acceptNecessary, resetConsent }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieContext);
}
