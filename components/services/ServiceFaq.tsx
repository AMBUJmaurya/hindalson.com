"use client";

import { useState } from "react";

type Faq = { q: string; a: string };

export function ServiceFaq({ faqs, accent = "#00c8d4" }: { faqs: Faq[]; accent?: string }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-2xl border transition duration-300"
            style={{
              borderColor: isOpen ? `${accent}59` : "rgba(255,255,255,0.1)",
              background: isOpen ? `${accent}14` : "#101010",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-white sm:text-lg">{faq.q}</span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm transition"
                style={{
                  borderColor: isOpen ? `${accent}66` : "rgba(255,255,255,0.1)",
                  background: isOpen ? `${accent}22` : "transparent",
                  color: isOpen ? accent : "rgba(255,255,255,0.4)",
                }}
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="animate-rise border-t border-white/8 px-5 pb-5 pt-4 sm:px-6">
                <p className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
