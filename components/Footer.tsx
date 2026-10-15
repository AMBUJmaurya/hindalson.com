import Link from "next/link";
import type { ReactNode } from "react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/website-development", label: "Website Development" },
  { href: "/services/app-development", label: "App Development" },
  { href: "/services/monthly-management", label: "Monthly Management (SEO)" },
  { href: "/services/performance-marketing", label: "Performance Marketing" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.75 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.5h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.74.98 1-3.64-.23-.37a9.58 9.58 0 0 1-1.47-5.12c0-5.3 4.31-9.61 9.62-9.61a9.55 9.55 0 0 1 6.8 2.82 9.55 9.55 0 0 1 2.81 6.8c0 5.3-4.32 9.6-9.53 9.6Zm5.27-7.2c-.29-.14-1.7-.84-1.97-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.7-1.59-1.98-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z" />
    </svg>
  );
}

const socialLinks: {
  href: string;
  label: string;
  icon: ReactNode;
  accent?: boolean;
}[] = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    href: "https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project.",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
    accent: true,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#10151c]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 0%, rgba(0,200,212,0.11), transparent 55%), radial-gradient(ellipse 40% 35% at 100% 100%, rgba(0,200,212,0.06), transparent 50%)",
        }}
      />

      <div className="container-page relative z-[1] pt-16 pb-8 sm:pt-20">
        <div className="grid gap-12 border-b border-white/8 pb-14 lg:grid-cols-[1.35fr_1fr_1fr_0.9fr]">
          <div>
            <Link href="/" className="inline-block">
              <p className="brand-mark text-[1.85rem] tracking-[0.14em] sm:text-3xl">
                Hindalson
              </p>
              <p className="brand-sub mt-2 text-[0.65rem] tracking-[0.48em] sm:text-[0.7rem]">
                Technology
              </p>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Websites, apps, SEO-led management, and growth — built with clear
              ownership for businesses across India.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="tel:+8619806710053"
                className="flex items-center gap-3 text-sm text-ink-soft transition hover:text-cyan"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
                +86 198 0671 0053
              </a>
              <a
                href="mailto:hello@hindalson.com"
                className="flex items-center gap-3 text-sm text-ink-soft transition hover:text-cyan"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
                hello@hindalson.com
              </a>
              <p className="flex items-center gap-3 text-sm text-ink-soft">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan/50" />
                India & Nationwide
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                    link.accent
                      ? "border-cyan/30 bg-cyan/10 text-cyan hover:bg-cyan/15"
                      : "border-white/10 text-white/55 hover:border-cyan/35 hover:text-cyan"
                  }`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
                  >
                    <span className="h-px w-3 bg-white/20 transition group-hover:w-5 group-hover:bg-cyan" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
                  >
                    <span className="h-px w-3 bg-white/20 transition group-hover:w-5 group-hover:bg-cyan" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              Legal
            </p>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
                  >
                    <span className="h-px w-3 bg-white/20 transition group-hover:w-5 group-hover:bg-cyan" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="btn-primary mt-8 inline-flex !px-4 !py-2.5 text-sm"
            >
              Get a Free Proposal
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="pointer-events-none select-none overflow-hidden py-10">
          <p className="display text-center text-[11vw] font-bold leading-none tracking-[-0.04em] text-white/[0.04] sm:text-[8vw]">
            HINDALSON
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hindalson Technology. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
