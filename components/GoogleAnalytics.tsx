"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-G71N01G1Y3";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    // First load is already sent by the layout gtag('config', ...)
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (typeof window.gtag !== "function") return;

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("config", GA_ID, {
      page_path: pagePath,
      anonymize_ip: true,
    });
  }, [pathname, searchParams]);

  return null;
}
