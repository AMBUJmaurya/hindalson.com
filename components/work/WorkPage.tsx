"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import {
  portfolioFilters,
  portfolioProjects,
  type PortfolioProject,
  type ProjectCategory,
} from "@/data/portfolio";

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function BrowserFrame({
  project,
  className = "",
}: {
  project: PortfolioProject;
  className?: string;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/frame relative block overflow-hidden rounded-2xl border border-white/12 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition hover:border-white/25 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 text-[0.65rem] tracking-wide text-white/30">
          {project.domain}
        </div>
        <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan sm:inline">
          Visit →
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#151d25]">
        <Image
          src={project.image}
          alt={`${project.client} website screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top transition duration-700 group-hover/frame:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
      </div>
    </a>
  );
}

export function WorkPage() {
  const hero = useInView<HTMLElement>(0.08);
  const stage = useInView<HTMLElement>(0.1);
  const stream = useInView<HTMLElement>(0.08);
  const industries = useInView<HTMLElement>();

  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [activeId, setActiveId] = useState(portfolioProjects[0].id);
  const [spot, setSpot] = useState({ x: 50, y: 40 });

  const filtered = useMemo(() => {
    if (filter === "all") return portfolioProjects;
    return portfolioProjects.filter((p) => p.category === filter);
  }, [filter]);

  useEffect(() => {
    if (!filtered.some((p) => p.id === activeId) && filtered[0]) {
      setActiveId(filtered[0].id);
    }
  }, [filtered, activeId]);

  useEffect(() => {
    if (!stage.inView || filtered.length < 2) return;
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const idx = filtered.findIndex((p) => p.id === current);
        const next = filtered[(idx + 1) % filtered.length];
        return next.id;
      });
    }, 4500);
    return () => window.clearInterval(id);
  }, [stage.inView, filtered]);

  const active = filtered.find((p) => p.id === activeId) ?? filtered[0] ?? portfolioProjects[0];

  const onStageMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y });
  };

  const uniqueIndustries = [...new Set(portfolioProjects.map((p) => p.industry))];

  return (
    <div
      className="svc-grain relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 55% 40% at 12% 0%, rgba(0,200,212,0.14), transparent 55%),
          radial-gradient(ellipse 40% 35% at 92% 18%, rgba(59,167,255,0.09), transparent 50%),
          radial-gradient(ellipse 50% 30% at 50% 100%, rgba(0,200,212,0.05), transparent 55%),
          #10151c
        `,
      }}
    >
      <section
        ref={hero.ref}
        className={`relative z-[1] ${hero.inView ? "workpage-in" : ""}`}
      >
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <nav className="workpage-rise mb-8 text-sm text-white/40">
            <Link href="/" className="transition hover:text-cyan">
              Home
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white/70">Work</span>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="workpage-rise text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-cyan">
                Hindalson Technology
              </p>
              <h1 className="workpage-rise-d1 serif mt-5 text-5xl text-white sm:text-7xl md:text-[5.5rem]">
                Selected{" "}
                <span className="workpage-word relative inline-block">
                  work
                  <span
                    aria-hidden
                    className="workpage-underline absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-cyan to-transparent"
                  />
                </span>
              </h1>
              <p className="workpage-rise-d2 mt-6 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
                Live projects for real businesses — open any case to visit the site we built.
              </p>
            </div>

            <div className="workpage-rise-d3 grid grid-cols-2 gap-4 sm:gap-5">
              {[
                { value: `${portfolioProjects.length}`, label: "Live projects" },
                { value: "10+", label: "Businesses served" },
                { value: "India", label: "Serving nationwide" },
                { value: "4", label: "Service lines" },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-cyan/30 pl-4">
                  <p className="display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/35">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={stage.ref}
        className={`relative z-[1] border-t border-white/8 section-pad !pt-10 ${
          stage.inView ? "workpage-in" : ""
        }`}
      >
        <div className="container-page">
          <div className="workpage-rise flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Featured stage</p>
              <h2 className="serif mt-3 text-3xl text-white sm:text-4xl">
                Browse by focus
              </h2>
            </div>
            <div
              role="tablist"
              aria-label="Filter projects"
              className="flex flex-wrap gap-1 border-b border-white/10"
            >
              {portfolioFilters.map((item) => {
                const isActive = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(item.id)}
                    className={`relative px-4 py-3 text-sm font-semibold tracking-wide transition ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <span className="workpage-tab absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-cyan" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            onMouseMove={onStageMove}
            className="workpage-rise-d1 relative mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-60 transition duration-300"
              style={{
                background: `radial-gradient(520px circle at ${spot.x}% ${spot.y}%, ${active.accent}22, transparent 45%)`,
              }}
            />

            <div className="relative z-[1] border-b border-white/10 bg-[#0a0c0e]/90 backdrop-blur-sm lg:border-b-0 lg:border-r">
              <div className="max-h-[420px] overflow-y-auto lg:max-h-[560px]">
                {filtered.map((project, index) => {
                  const isActive = project.id === active.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onMouseEnter={() => setActiveId(project.id)}
                      onFocus={() => setActiveId(project.id)}
                      onClick={() => setActiveId(project.id)}
                      className={`group flex w-full items-center gap-4 border-b border-white/8 px-5 py-5 text-left transition last:border-b-0 sm:px-7 ${
                        isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <span
                        className={`display text-sm font-semibold tracking-[0.14em] transition ${
                          isActive ? "text-cyan" : "text-white/20 group-hover:text-white/40"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`display truncate text-lg font-bold tracking-tight sm:text-xl ${
                            isActive ? "text-white" : "text-white/45"
                          }`}
                        >
                          {project.client}
                        </p>
                        <p className="mt-1 truncate text-[0.68rem] uppercase tracking-[0.14em] text-white/25">
                          {project.industry} · {project.domain}
                        </p>
                      </div>
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full transition ${
                          isActive
                            ? "scale-100 bg-cyan shadow-[0_0_12px_rgba(0,200,212,0.8)]"
                            : "scale-75 bg-white/15"
                        }`}
                      />
                    </button>
                  );
                })}
                {filtered.length === 0 ? (
                  <p className="px-7 py-12 text-sm text-white/40">
                    No projects in this filter yet — try All work.
                  </p>
                ) : null}
              </div>
            </div>

            <div
              key={active.id}
              className="workpage-stage relative z-[1] flex min-h-[380px] flex-col overflow-hidden sm:min-h-[520px]"
            >
              <div className="relative min-h-[200px] flex-1 sm:min-h-[280px]">
                <Image
                  src={active.image}
                  alt={`${active.client} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10151c] via-[#10151c]/55 to-transparent" />
              </div>

              <div className="relative -mt-24 px-7 pb-7 sm:px-10 sm:pb-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: active.accent }}
                  >
                    {active.service}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] text-white/35">
                    {active.year}
                  </span>
                </div>
                <h3 className="serif mt-3 text-3xl text-white sm:text-5xl">{active.client}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                  {active.summary}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-svc text-white"
                    style={{
                      background: `linear-gradient(90deg, ${active.accent}, #00c8d4)`,
                      boxShadow: `0 12px 40px ${active.accent}40`,
                    }}
                  >
                    Visit live site →
                  </a>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    {active.industry}
                  </p>
                </div>
                <div className="mt-6 flex gap-1.5">
                  {filtered.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      aria-label={`Show ${project.client}`}
                      onClick={() => setActiveId(project.id)}
                      className="h-1.5 rounded-full transition duration-500"
                      style={{
                        width: project.id === active.id ? 28 : 10,
                        background:
                          project.id === active.id ? active.accent : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={stream.ref}
        className={`relative z-[1] border-t border-white/8 section-pad ${
          stream.inView ? "workpage-in" : ""
        }`}
      >
        <div className="container-page">
          <div className="workpage-rise max-w-2xl">
            <p className="eyebrow">Case stream</p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">
              Every build has a job to do
            </h2>
            <p className="mt-4 text-base text-white/45">
              Real screenshots. Live links. Click any preview to open the project.
            </p>
          </div>

          <div className="mt-14 space-y-12 lg:space-y-16">
            {(filter === "all" ? portfolioProjects : filtered).map((project, index) => {
              const reverse = index % 2 === 1;
              return (
                <article
                  key={project.id}
                  className="workpage-row group rounded-3xl border border-white/10 bg-white/[0.015] p-6 sm:p-8 lg:p-10 transition duration-500 hover:border-cyan/30"
                  style={{ animationDelay: `${0.06 + index * 0.07}s` }}
                >
                  <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
                    <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
                      <BrowserFrame project={project} className="workpage-frame" />
                      
                      {/* Tech stack badges */}
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                          Tech:
                        </span>
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] font-medium text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-svc text-white"
                          style={{
                            background: `linear-gradient(90deg, ${project.accent}, #00c8d4)`,
                            boxShadow: `0 10px 30px ${project.accent}30`,
                          }}
                        >
                          Visit {project.domain} →
                        </a>
                      </div>
                    </div>

                    <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span
                          className="display text-sm font-semibold tracking-[0.2em]"
                          style={{ color: project.accent }}
                        >
                          CASE {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/20">/</span>
                        <span className="text-[0.72rem] uppercase tracking-[0.18em] text-white/40">
                          {project.industry}
                        </span>
                      </div>

                      <h3 className="serif mt-3 text-3xl text-white sm:text-4xl">
                        {project.client}
                      </h3>

                      <p className="mt-3 text-base leading-relaxed text-white/60">
                        {project.summary}
                      </p>

                      {/* Structured Case Breakdown: Problem -> Solution -> Key Work -> Result */}
                      <div className="mt-6 space-y-4 border-t border-white/8 pt-5">
                        <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan">
                            01 · Problem
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/70">
                            {project.problem}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#3BA7FF]">
                            02 · Hindalson Solution
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/70">
                            {project.solution}
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                              03 · Key Work
                            </p>
                            <ul className="mt-1.5 space-y-1">
                              {project.keyWork.map((kw) => (
                                <li key={kw} className="flex items-center gap-2 text-xs text-white/60">
                                  <span className="h-1 w-1 rounded-full bg-cyan" />
                                  {kw}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                              04 · Verified Outcome
                            </p>
                            <p className="mt-1.5 text-xs font-medium text-emerald-300">
                              {project.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={industries.ref}
        className={`relative z-[1] border-t border-white/8 py-14 ${
          industries.inView ? "workpage-in" : ""
        }`}
      >
        <div className="container-page">
          <p className="workpage-rise text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Industries we support
          </p>
          <div className="workpage-rise-d1 mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {uniqueIndustries.map((name) => (
              <span
                key={name}
                className="display text-lg font-semibold tracking-wide text-white/30 transition hover:text-cyan/80 sm:text-xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] border-t border-white/8 section-pad">
        <div className="container-page">
          <div
            className="overflow-hidden rounded-[1.6rem] border border-cyan/30 p-8 sm:p-12"
            style={{
              background:
                "linear-gradient(145deg, rgba(0,200,212,0.12), #151d25 45%, #10151c)",
              boxShadow: "0 0 60px rgba(0,200,212,0.1)",
            }}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              Start yours
            </p>
            <h2 className="serif mt-4 max-w-2xl text-3xl text-white sm:text-5xl">
              Ready for work that looks this serious?
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/50">
              Tell us what you need. We’ll reply with clear next steps — usually within one
              business day.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#lead"
                className="btn-svc text-white"
                style={{
                  background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
                  boxShadow: "0 12px 40px rgba(0,200,212,0.25)",
                }}
              >
                Get a Free Proposal →
              </Link>
              <a
                href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-svc-ghost"
                style={{ borderColor: "rgba(0,200,212,0.45)" }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
