"use client";

import { useEffect, useRef, useState } from "react";
import {
  fetchPublishedTestimonials,
  type PublicTestimonial,
} from "@/lib/api";

const FALLBACK: PublicTestimonial[] = [
  {
    id: "fallback-1",
    quote:
      "Communication was direct and clear, milestones were honest, and the final web platform matched what was promised from day one.",
    name: "Partner Team",
    business: "LoudSup",
    focus: "Marketplace Web Build",
    rating: 5,
  },
  {
    id: "fallback-2",
    quote:
      "They didn’t disappear after launch. Ongoing monthly management and SEO made a measurable difference for our local search discovery.",
    name: "Management Team",
    business: "The House of Fitness",
    focus: "Website + Local SEO",
    rating: 5,
  },
  {
    id: "fallback-3",
    quote:
      "Structured process, clean UI design, and quick turnarounds. Working with Hindalson felt like having a dedicated internal team.",
    name: "Leadership",
    business: "Primary Classes",
    focus: "EdTech Web Portal",
    rating: 5,
  },
  {
    id: "fallback-4",
    quote:
      "We needed an accountable team for ongoing web platform updates and property search UX. Hindalson kept delivery steady and reliable.",
    name: "Operations Team",
    business: "Bhumap",
    focus: "PropTech Discovery",
    rating: 5,
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1 text-cyan" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [testimonials, setTestimonials] = useState<PublicTestimonial[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedTestimonials().then((data) => {
      if (!cancelled && data.length > 0) {
        setTestimonials(data);
        setIndex(0);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || testimonials.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [inView, paused, testimonials.length]);

  const active = testimonials[index] ?? testimonials[0];
  if (!active) return null;

  function prev() {
    setIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }

  function next() {
    setIndex((current) => (current + 1) % testimonials.length);
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 bg-[#10151c] section-pad"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 20% 20%, rgba(0,200,212,0.1), transparent 55%), radial-gradient(ellipse 40% 35% at 90% 80%, rgba(0,200,212,0.06), transparent 50%)",
        }}
      />

      <div className="container-page relative z-[1]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Client Feedback</p>
            <h2 className="display mt-3 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
              Trust earned in delivery,{" "}
              <span className="bg-gradient-to-r from-white via-cyan to-[#7dd8ff] bg-clip-text text-transparent">
                not the pitch.
              </span>
            </h2>
            <p className="mt-4 text-base text-muted max-w-lg">
              What founders and business leaders say about partnering with Hindalson.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.02] text-white/70 transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.02] text-white/70 transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Main Featured Testimonial */}
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#19232d] p-7 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full bg-cyan/10 blur-3xl"
            />

            <div key={active.id} className="voice-panel relative">
              <div className="flex items-center justify-between gap-3 mb-6">
                {active.rating ? <Stars count={active.rating} /> : <div />}
                <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-[11px] font-semibold text-cyan uppercase tracking-wider">
                  Client Collaboration
                </span>
              </div>

              <blockquote className="display text-xl font-medium leading-relaxed tracking-tight text-white sm:text-2xl md:text-[1.75rem]">
                “{active.quote}”
              </blockquote>

              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-bold text-white">{active.business}</p>
                  <p className="text-xs text-cyan/90 font-medium mt-0.5">
                    {active.name ? `${active.name} · ` : ""}{active.focus}
                  </p>
                </div>

                <div className="flex gap-1.5">
                  {testimonials.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Show testimonial from ${item.business}`}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === index ? "w-8 bg-cyan" : "w-3 bg-white/15 hover:bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Selectors Rail */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {testimonials.map((item, i) => {
              const isActive = i === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIndex(i)}
                  className={`rounded-2xl border p-4 sm:p-5 text-left transition duration-300 ${
                    isActive
                      ? "border-cyan/45 bg-cyan/[0.08] shadow-[0_0_30px_rgba(0,200,212,0.12)]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`display text-base font-bold ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                    >
                      {item.business}
                    </p>
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                        isActive ? "text-cyan" : "text-white/25"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 line-clamp-2 text-xs leading-relaxed ${
                      isActive ? "text-muted" : "text-white/35"
                    }`}
                  >
                    “{item.quote}”
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

