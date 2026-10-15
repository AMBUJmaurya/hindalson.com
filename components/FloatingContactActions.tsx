"use client";

import { getWhatsAppUrl } from "@/lib/contact";

interface FloatingContactActionsProps {
  emailHref?: string;
}

export function FloatingContactActions({
  emailHref = "mailto:projects@hindalson.com?subject=Website%20project%20enquiry",
}: FloatingContactActionsProps) {
  const whatsappUrl = getWhatsAppUrl("Hi Hindalson, I'd like to discuss a project.");

  function handleContactClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = document.getElementById("enquire");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleEmailClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-email-sheet"));
    }
  }

  return (
    <aside
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-4 z-50 flex flex-col items-center gap-2.5 sm:gap-3 md:bottom-7 md:right-7"
      aria-label="Floating contact actions"
    >
      {/* 1. Contact Us (Top) */}
      <a
        href="#enquire"
        onClick={handleContactClick}
        aria-label="Contact Us"
        className="inline-flex h-11 w-11 sm:h-12 sm:w-12 md:h-[52px] md:w-[52px] items-center justify-center rounded-xl border border-cyan/30 bg-[#12282c] text-cyan shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-[#18353a] hover:text-white"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      </a>

      {/* 2. Email (Middle) */}
      <a
        href={emailHref}
        onClick={handleEmailClick}
        aria-label="Email Hindalson"
        className="inline-flex h-11 w-11 sm:h-12 sm:w-12 md:h-[52px] md:w-[52px] items-center justify-center rounded-xl border border-cyan/30 bg-[#12282c] text-cyan shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-[#18353a] hover:text-white"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </a>

      {/* 3. WhatsApp (Bottom) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex h-11 w-11 sm:h-12 sm:w-12 md:h-[52px] md:w-[52px] items-center justify-center rounded-xl border border-cyan/30 bg-[#12282c] text-cyan shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-[#18353a] hover:text-white"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.5h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.74.98 1-3.64-.23-.37a9.58 9.58 0 0 1-1.47-5.12c0-5.3 4.31-9.61 9.62-9.61a9.55 9.55 0 0 1 6.8 2.82 9.55 9.55 0 0 1 2.81 6.8c0 5.3-4.32 9.6-9.53 9.6Zm5.27-7.2c-.29-.14-1.7-.84-1.97-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.7-1.59-1.98-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z" />
        </svg>
      </a>
    </aside>
  );
}
