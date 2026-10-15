"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  {
    num: "01",
    title: "Website Development",
    short: "Web Development",
    tagline: "High-performance websites that look premium, load instantly, and convert visitors.",
    description:
      "Custom business websites, e-commerce stores, and high-converting landing pages built with clean code, modern UI/UX, and foundational SEO ready for Google indexing.",
    href: "/services/website-development",
    deliverables: [
      "Custom UI/UX & Responsive Layouts",
      "Next.js / Modern Stack Performance",
      "Lead Capture & CRM Integrations",
      "Complete Source Code Ownership",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M6 7h2M10 7h.01M12 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    badge: "Most Requested",
  },
  {
    num: "02",
    title: "App Development",
    short: "App Development",
    tagline: "iOS, Android & cross-platform applications built for real daily users.",
    description:
      "Native-feel mobile apps and web platforms with clean user flows, secure API architecture, responsive performance, and complete app store deployment support.",
    href: "/services/app-development",
    deliverables: [
      "Interactive UI/UX & Wireframing",
      "React Native & Flutter Cross-Platform",
      "Scalable API & Database Architecture",
      "Play Store & App Store Deployment",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    badge: "Scalable Tech",
  },
  {
    num: "03",
    title: "Monthly Management (SEO)",
    short: "Monthly Management",
    tagline: "Compounding SEO, technical health, security updates, and monthly reporting.",
    description:
      "Your website shouldn't freeze after launch. We provide ongoing technical SEO, keyword ranking improvements, content updates, security patches, backups, and transparent reports.",
    href: "/services/monthly-management",
    deliverables: [
      "Technical & On-Page SEO Audits",
      "Speed Optimization & Core Web Vitals",
      "Routine Content & Page Updates",
      "Transparent Monthly Performance Report",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 13.5L9 7.5L14 12.5L21 5.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M15 5.5H21V11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    badge: "Compounding ROI",
  },
  {
    num: "04",
    title: "Performance Marketing",
    short: "Performance Marketing",
    tagline: "High-intent Meta & Google campaigns focused on qualified business leads.",
    description:
      "Data-driven ad management designed to generate real customer enquiries, not vanity clicks. Includes ad copywriting, funnel page optimization, tracking setup, and weekly optimizations.",
    href: "/services/performance-marketing",
    deliverables: [
      "Google Search & Intent Ads",
      "Meta (Instagram & FB) Lead Funnels",
      "Pixel, Conversion API & Tag Setup",
      "Weekly A/B Testing & Optimization",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    badge: "Growth Engine",
  },
];

export function ServicesSnapshot() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#10151c] section-pad">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 85% 30%, rgba(0,200,212,0.14), transparent 60%)",
        }}
      />

      <div className="container-page relative z-[1]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Core Services</p>
            <h2 className="display mt-3 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
              Four focused services.{" "}
              <span className="bg-gradient-to-r from-white via-cyan to-[#7dd8ff] bg-clip-text text-transparent">
                One accountable partner.
              </span>
            </h2>
          </div>
          <Link href="/services" className="btn-secondary w-full sm:w-auto text-center text-sm">
            View All Services Overview →
          </Link>
        </div>

        {/* Desktop Interactive Split Card View */}
        <div className="grid items-stretch overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#19232d] shadow-[0_30px_90px_rgba(0,0,0,0.5)] lg:grid-cols-[0.92fr_1.08fr]">
          {/* Service index rail */}
          <div className="border-b border-white/10 bg-[#151d25] lg:border-b-0 lg:border-r">
            {services.map((service, index) => {
              const isActive = index === active;
              return (
                <button
                  key={service.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`group flex w-full items-center gap-4 border-b border-white/8 px-6 py-5 text-left transition last:border-b-0 sm:px-7 sm:py-6 ${
                    isActive ? "bg-cyan/[0.08]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition duration-300 ${
                      isActive
                        ? "border-cyan/40 bg-cyan/15 text-cyan"
                        : "border-white/10 bg-white/[0.02] text-white/40 group-hover:text-white"
                    }`}
                  >
                    {service.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold tracking-wider transition ${
                          isActive ? "text-cyan" : "text-white/30"
                        }`}
                      >
                        {service.num}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-cyan/70 font-semibold">
                        {service.badge}
                      </span>
                    </div>
                    <span
                      className={`mt-1 block text-lg font-bold tracking-tight transition sm:text-xl ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <span
                    className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition sm:flex ${
                      isActive
                        ? "border-cyan/40 bg-cyan/15 text-cyan translate-x-1"
                        : "border-white/10 text-white/20"
                    }`}
                    aria-hidden
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Detail Stage */}
          <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#151d25] via-[#10151c] to-[#10151c] p-7 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 top-8 h-56 w-56 rounded-full border border-cyan/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-cyan/60 via-cyan/15 to-transparent"
            />

            <div key={current.num} className="animate-rise relative">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan">
                  Service {current.num} · {current.badge}
                </span>
              </div>

              <h3 className="display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {current.tagline}
              </h3>

              <p className="mt-4 text-[0.98rem] leading-relaxed text-muted max-w-lg">
                {current.description}
              </p>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                  What’s Included:
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {current.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-ink-soft">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan/20 text-[10px] text-cyan">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-8 flex flex-col gap-3 pt-6 border-t border-white/8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={current.href}
                className="btn-primary w-full sm:w-auto text-center justify-center text-sm shadow-[0_0_20px_rgba(0,200,212,0.25)]"
              >
                Learn More About {current.short}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/#lead"
                className="text-xs font-semibold text-cyan hover:underline text-center sm:text-left"
              >
                Request Proposal for this Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

