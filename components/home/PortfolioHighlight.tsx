"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { portfolioProjects } from "@/data/portfolio";

export function PortfolioHighlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const featured = portfolioProjects.slice(0, 6);
  const displayedProjects =
    activeCategory === "all"
      ? featured
      : featured.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden section-pad bg-[#10151c] border-t border-white/8 ${
        inView ? "work-in-view" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% -10%, rgba(0,200,212,0.12), transparent 55%), #10151c",
        }}
      />

      <div className="container-page relative z-[1]">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow">Real Production Work</p>
            <h2 className="display mt-3 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
              Work that builds{" "}
              <span className="bg-gradient-to-r from-white via-cyan to-[#7dd8ff] bg-clip-text text-transparent">
                trust & results.
              </span>
            </h2>
            <p className="mt-4 text-base text-muted max-w-lg">
              Live websites and digital platforms built for real businesses across India.
              Explore live links and project details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link href="/portfolio" className="btn-primary text-sm shadow-[0_0_24px_rgba(0,200,212,0.25)] w-full sm:w-auto text-center">
              View All Case Studies →
            </Link>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <article
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151d25] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              style={{ animationDelay: `${0.06 + index * 0.08}s` }}
            >
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between border-b border-white/8 bg-[#19232d] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500/50" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/50" />
                  <span className="h-2 w-2 rounded-full bg-green-500/50" />
                </div>
                <span className="truncate max-w-[150px] text-[10px] text-white/40">
                  {project.domain}
                </span>
                <span className="text-[10px] uppercase font-semibold text-cyan/80">
                  {project.year}
                </span>
              </div>

              {/* Project Image View */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#10151c]">
                <Image
                  src={project.image}
                  alt={`${project.client} website screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151d25] via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: project.accent }}
                    >
                      {project.service}
                    </span>
                    <span className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                      {project.industry}
                    </span>
                  </div>

                  <h3 className="display text-xl font-bold text-white group-hover:text-cyan transition-colors">
                    {project.client}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Feature Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.focus.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/6 bg-white/[0.02] px-2 py-1 text-[10px] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan transition hover:text-white"
                  >
                    Visit Live Site ↗
                  </a>
                  <Link
                    href="/portfolio"
                    className="text-xs text-muted hover:text-white transition"
                  >
                    View Case Details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center w-full max-w-full">
          <Link
            href="/portfolio"
            className="inline-flex max-w-full items-center justify-center text-center gap-2 rounded-xl border border-white/12 bg-white/[0.02] px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-cyan/40 hover:bg-cyan/[0.06] hover:text-cyan w-full sm:w-auto"
          >
            Explore All Case Studies & Live Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

