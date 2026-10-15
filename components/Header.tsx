"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const serviceLinks = [
  {
    href: "/services/website-development",
    label: "Website Development",
    desc: "Fast, custom & conversion-ready business sites",
  },
  {
    href: "/services/app-development",
    label: "App Development",
    desc: "iOS, Android & cross-platform mobile apps",
  },
  {
    href: "/services/monthly-management",
    label: "Monthly Management (SEO)",
    desc: "Ongoing SEO, technical care & performance updates",
  },
  {
    href: "/services/performance-marketing",
    label: "Performance Marketing",
    desc: "Targeted Meta & Google ad campaigns for qualified leads",
  },
];

const navLinks = [
  { href: "/portfolio", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#151d25]/92 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex flex-col leading-none transition duration-200 hover:opacity-90"
          aria-label="Hindalson Technology home"
        >
          <span className="brand-mark text-[1.05rem] tracking-[0.12em] sm:text-[1.15rem]">
            Hindalson
          </span>
          <span className="brand-sub mt-1 text-[0.55rem] tracking-[0.38em] sm:text-[0.58rem]">
            Technology
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main Navigation">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-cyan font-semibold" : "text-ink-soft hover:text-white"
            }`}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isServicesActive ? "text-cyan font-semibold" : "text-ink-soft hover:text-white"
              }`}
              aria-expanded={servicesOpen}
            >
              Services
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                <div className="w-[320px] rounded-2xl border border-white/12 bg-[#19232d] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                  <div className="px-3 py-2 border-b border-white/8 mb-1">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan">
                      Our Offerings
                    </p>
                  </div>
                  {serviceLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`group block rounded-xl p-2.5 transition-colors ${
                          isActive
                            ? "bg-cyan/15 text-white"
                            : "text-ink-soft hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <p className="text-sm font-semibold text-white group-hover:text-cyan transition-colors">
                          {link.label}
                        </p>
                        <p className="mt-0.5 text-xs text-muted line-clamp-1">{link.desc}</p>
                      </Link>
                    );
                  })}
                  <div className="mt-2 border-t border-white/8 p-1">
                    <Link
                      href="/services"
                      className="block text-center rounded-lg py-1.5 text-xs font-semibold text-cyan hover:bg-cyan/10 transition-colors"
                    >
                      View All Services Overview →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-cyan font-semibold" : "text-ink-soft hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#lead"
            className="btn-primary !px-4 !py-2.5 text-sm shadow-[0_0_24px_rgba(0,200,212,0.25)]"
          >
            Get a Free Proposal
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-surface-elevated text-white lg:hidden transition hover:border-cyan/40"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-4 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full bg-white transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="border-t border-white/10 bg-[#151d25]/98 backdrop-blur-xl lg:hidden">
          <div className="container-page flex flex-col gap-1 py-5">
            <Link
              href="/"
              className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                pathname === "/" ? "bg-cyan/15 text-cyan" : "text-ink-soft hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <div className="my-1 border-t border-white/8 pt-2">
              <p className="eyebrow px-3.5 pb-2">Services</p>
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    pathname === link.href
                      ? "bg-cyan/15 text-cyan"
                      : "text-ink-soft hover:bg-white/[0.04] hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="block font-semibold">{link.label}</span>
                  <span className="block text-xs text-muted">{link.desc}</span>
                </Link>
              ))}
            </div>

            <div className="my-1 border-t border-white/8 pt-2">
              <p className="eyebrow px-3.5 pb-2">Company</p>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    pathname === link.href
                      ? "bg-cyan/15 text-cyan"
                      : "text-ink-soft hover:bg-white/[0.04] hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-2.5 pt-2 border-t border-white/10">
              <Link
                href="/#lead"
                className="btn-primary text-center"
                onClick={() => setOpen(false)}
              >
                Get a Free Proposal
              </Link>
              <a
                href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center text-sm"
                onClick={() => setOpen(false)}
              >
                Chat on WhatsApp
              </a>
              <a
                href="tel:+8619806710053"
                className="text-center text-xs font-medium text-white/60 hover:text-cyan transition py-1"
                onClick={() => setOpen(false)}
              >
                Call: +86 198 0671 0053
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

