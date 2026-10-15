"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroProjects = [
  {
    id: "loudsup",
    client: "LoudSup",
    industry: "Marketplace & Freelance Platform",
    service: "Web Platform & UX",
    image: "/portfolio/loudsup.png",
    url: "https://loudsup.com/",
    domain: "loudsup.com",
    badge: "Live Platform",
    tagline: "Escrow-protected freelance marketplace connecting businesses with verified talent.",
    accent: "#22C55E",
  },
  {
    id: "the-house-of-fitness",
    client: "The House of Fitness",
    industry: "Fitness & Wellness",
    service: "Website + Local SEO",
    image: "/portfolio/house-of-fitness.jpg",
    url: "https://thehouseoffitness.in/",
    domain: "thehouseoffitness.in",
    badge: "Live Portal",
    tagline: "High-converting gym portal with membership discovery and automated enquiry flow.",
    accent: "#C4A484",
  },
  {
    id: "primary-classes",
    client: "Primary Classes",
    industry: "EdTech Coaching",
    service: "Website & Parent Portal",
    image: "/portfolio/primary-classes.png",
    url: "https://www.primaryclasses.com/",
    domain: "primaryclasses.com",
    badge: "Live EdTech",
    tagline: "Live + recorded coaching platform built for class 1–8 with high parent trust.",
    accent: "#3B82F6",
  },
  {
    id: "bhumap",
    client: "Bhumap",
    industry: "Real Estate Tech",
    service: "Property Discovery Web",
    image: "/portfolio/bhumap.jpg",
    url: "https://bhumap.com/",
    domain: "bhumap.com",
    badge: "Live Portal",
    tagline: "Property search and owner listing discovery platform with verified location filters.",
    accent: "#14B8A6",
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % heroProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeProject = heroProjects[activeTab];

  return (
    <section className="hero-atmosphere grain relative overflow-hidden">
      <div className="hero-vignette" />

      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-10 h-[340px] w-[340px] sm:h-[580px] sm:w-[580px] rounded-full bg-cyan/10 blur-[100px] sm:blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-[280px] w-[280px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#3BA7FF]/8 blur-[80px] sm:blur-[100px]"
      />

      <div className="container-page relative z-[1] grid min-h-[calc(100svh-4.5rem)] w-full max-w-full min-w-0 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-16">
        {/* Left Column: Clear Value Proposition */}
        <div className="relative w-full max-w-xl min-w-0">
          {/* Trust Badge */}
          <div className="animate-rise inline-flex max-w-full items-center gap-2 rounded-full border border-cyan/30 bg-cyan/[0.08] px-3 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 shrink-0 rounded-full bg-cyan animate-pulse" />
            <span className="text-[0.68rem] sm:text-[0.72rem] font-semibold tracking-wide text-cyan leading-tight">
              In-House Digital Partner · Serving Nationwide
            </span>
          </div>

          <div className="animate-rise mt-5 sm:mt-6">
            <h1 className="display text-[1.75rem] xs:text-[1.95rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem] font-bold leading-[1.12] tracking-tight text-white break-words">
              We build & scale{" "}
              <span className="bg-gradient-to-r from-white via-cyan to-[#7dd8ff] bg-clip-text text-transparent">
                websites, apps & growth
              </span>{" "}
              for your business
            </h1>
          </div>

          <p className="animate-rise-delay-1 mt-5 sm:mt-6 text-[0.95rem] sm:text-lg leading-relaxed text-muted max-w-full break-words">
            Custom website development, mobile apps, monthly SEO management, and performance
            marketing — delivered by an accountable in-house team. No freelancer chaos.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="animate-rise-delay-2 mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center w-full max-w-full">
            <Link
              href="/#lead"
              className="btn-primary w-full sm:w-auto sm:min-w-[180px] shadow-[0_0_28px_rgba(0,200,212,0.3)] text-center text-sm font-bold"
            >
              Get a Free Proposal
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/portfolio"
              className="btn-secondary w-full sm:w-auto sm:min-w-[140px] text-center text-sm font-semibold"
            >
              View Our Work
            </Link>
          </div>

          {/* Trust Points */}
          <div className="animate-rise-delay-3 mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-3 border-t border-white/10 pt-5 sm:pt-6 sm:grid-cols-3 w-full max-w-full">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-xs text-cyan">
                ✓
              </span>
              <span className="text-xs font-medium text-ink-soft truncate">In-house team</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-xs text-cyan">
                ✓
              </span>
              <span className="text-xs font-medium text-ink-soft truncate">100% Code ownership</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1 min-w-0">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-xs text-cyan">
                ✓
              </span>
              <span className="text-xs font-medium text-ink-soft truncate">1-Day response</span>
            </div>
          </div>
        </div>

        {/* Right Column: Real Project Showcase Visual */}
        <div
          className="animate-rise-delay-2 relative mx-auto w-full max-w-full sm:max-w-[560px] min-w-0 lg:max-w-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Outer Frame / Glowing backdrop */}
          <div className="relative rounded-3xl border border-white/12 bg-[#19232d]/90 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-4 w-full min-w-0">
            {/* Top Project Selector Tabs */}
            <div className="flex items-center justify-between gap-2 border-b border-white/8 pb-3 px-1 w-full min-w-0">
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar w-full min-w-0">
                {heroProjects.map((p, idx) => {
                  const isActive = idx === activeTab;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                        isActive
                          ? "bg-cyan/20 text-cyan border border-cyan/40"
                          : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                      }`}
                    >
                      {p.client}
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex shrink-0 items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase font-semibold tracking-wider text-green-400">
                  Live Work
                </span>
              </div>
            </div>

            {/* Browser Mockup Window */}
            <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#10151c] w-full min-w-0">
              {/* Browser top navigation bar */}
              <div className="flex items-center justify-between gap-2 border-b border-white/8 bg-[#151d25] px-3 py-2 sm:px-3.5 sm:py-2.5 w-full">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-yellow-500/60" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-500/60" />
                </div>

                <div className="flex flex-1 min-w-0 max-w-[140px] sm:max-w-[240px] items-center justify-center rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] sm:text-[11px] text-white/45 truncate">
                  <span className="text-cyan/70 mr-1 shrink-0">🔒</span>
                  <span className="truncate">{activeProject.domain}</span>
                </div>

                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-cyan hover:underline shrink-0"
                >
                  Visit ↗
                </a>
              </div>

              {/* Real Project Image Screenshot */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#10151c]">
                <Image
                  src={activeProject.image}
                  alt={`${activeProject.client} screenshot`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-top transition duration-700 hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10151c] via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Meta Footer */}
              <div className="border-t border-white/8 bg-[#151d25] p-3.5 sm:p-5 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="display text-base sm:text-lg font-bold text-white">
                        {activeProject.client}
                      </h2>
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
                        {activeProject.industry}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2 max-w-md">
                      {activeProject.tagline}
                    </p>
                  </div>

                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs font-semibold text-cyan transition hover:bg-cyan/20 w-full sm:w-auto text-center"
                  >
                    Explore Site →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick interactive dots */}
            <div className="mt-3 flex items-center justify-between px-2 pt-1 text-[11px] text-muted">
              <span>Verified Hindalson Client Build</span>
              <div className="flex gap-1.5">
                {heroProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`View ${p.client}`}
                    onClick={() => setActiveTab(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeTab ? "w-6 bg-cyan" : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

