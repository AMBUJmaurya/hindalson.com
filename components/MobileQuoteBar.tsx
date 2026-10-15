"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileQuoteBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[#151d25]/95 p-3 backdrop-blur md:hidden">
      <Link href="/contact" className="btn-primary w-full">
        Get a Free Proposal
      </Link>
    </div>
  );
}
