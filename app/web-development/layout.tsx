import { getWhatsAppUrl } from "@/lib/contact";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  const whatsappUrl = getWhatsAppUrl(
    "Hi Hindalson, I'd like to inquire more about a website project."
  );

  return (
    <>
      {children}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inquire more on WhatsApp at +86 198 0671 0053"
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-4 z-50 inline-flex items-center gap-2.5 rounded-full border border-cyan/40 bg-[#00c8d4] px-4 py-3 text-sm font-semibold text-[#041416] shadow-[0_12px_40px_rgba(0,200,212,0.35)] transition hover:-translate-y-0.5 hover:bg-[#00d8e4] md:bottom-7 md:left-7 md:px-5 md:text-[15px]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.5h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.74.98 1-3.64-.23-.37a9.58 9.58 0 0 1-1.47-5.12c0-5.3 4.31-9.61 9.62-9.61a9.55 9.55 0 0 1 6.8 2.82 9.55 9.55 0 0 1 2.81 6.8c0 5.3-4.32 9.6-9.53 9.6Zm5.27-7.2c-.29-.14-1.7-.84-1.97-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.7-1.59-1.98-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z" />
        </svg>
        <span>Inquire more on Whatsapp</span>
      </a>
    </>
  );
}
