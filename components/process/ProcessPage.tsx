"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { processPrinciples, processSteps } from "@/data/process";

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

export function ProcessPage() {
  const hero = useInView<HTMLElement>(0.08);
  const journey = useInView<HTMLElement>(0.08);
  const deep = useInView<HTMLElement>(0.08);
  const principles = useInView<HTMLElement>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = processSteps[active];

  useEffect(() => {
    if (!journey.inView || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % processSteps.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [journey.inView, paused]);

  return (
    <div
      className="svc-grain relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 55% 40% at 10% 0%, rgba(0,200,212,0.15), transparent 55%),
          radial-gradient(ellipse 40% 35% at 95% 22%, rgba(167,139,250,0.09), transparent 50%),
          radial-gradient(ellipse 50% 30% at 50% 100%, rgba(0,200,212,0.05), transparent 55%),
          #10151c
        `,
      }}
    >
      {/* HERO */}
      <section
        ref={hero.ref}
        className={`relative z-[1] ${hero.inView ? "procpage-in" : ""}`}
      >
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <nav className="procpage-rise mb-8 text-sm text-white/40">
            <Link href="/" className="transition hover:text-cyan">
              Home
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white/70">Process</span>
          </nav>

          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="procpage-rise text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-cyan">
                Hindalson Technology
              </p>
              <h1 className="procpage-rise-d1 serif mt-5 max-w-3xl text-4xl text-white sm:text-6xl md:text-[4.4rem]">
                A clear path from{" "}
                <span className="bg-gradient-to-r from-white via-cyan to-[#7B6CFF] bg-clip-text text-transparent">
                  first call
                </span>{" "}
                to long-term growth.
              </h1>
              <div className="procpage-rise-d2 mt-6 h-px w-28 bg-gradient-to-r from-cyan to-transparent" />
              <p className="procpage-rise-d2 mt-6 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
                Five stages. One accountable team. No guesswork between kickoff, launch, and
                ongoing care.
              </p>
              <div className="procpage-rise-d3 mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#lead"
                  className="btn-svc text-white"
                  style={{
                    background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
                    boxShadow: "0 12px 40px rgba(0,200,212,0.25)",
                  }}
                >
                  Start with Discovery →
                </Link>
                <Link href="/portfolio" className="btn-svc-ghost">
                  See our work
                </Link>
              </div>
            </div>

            {/* Animated stage orbit */}
            <div className="procpage-rise-d3 relative mx-auto w-full max-w-sm">
              <div className="relative aspect-square">
                <div
                  aria-hidden
                  className="procpage-ring absolute inset-[8%] rounded-full border border-dashed border-cyan/25"
                />
                <div
                  aria-hidden
                  className="absolute inset-[22%] rounded-full border border-white/8"
                />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan">
                      5 stages
                    </p>
                    <p className="serif mt-2 text-3xl text-white">One path</p>
                    <p className="mt-2 text-sm text-white/40">Listen → Grow</p>
                  </div>
                </div>
                {processSteps.map((step, i) => {
                  const angle = (i / processSteps.length) * 360 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + 42 * Math.cos(rad);
                  const y = 50 + 42 * Math.sin(rad);
                  return (
                    <div
                      key={step.num}
                      className="procpage-node absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-bold"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        borderColor: `${step.accent}66`,
                        background: `${step.accent}18`,
                        color: step.accent,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    >
                      {step.num}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE JOURNEY */}
      <section
        ref={journey.ref}
        className={`relative z-[1] border-t border-white/8 section-pad ${
          journey.inView ? "procpage-in" : ""
        }`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="container-page">
          <div className="procpage-rise max-w-2xl">
            <p className="eyebrow">The journey</p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">
              How every project moves
            </h2>
            <p className="mt-4 text-base text-white/45">
              Hover or tap a stage. Watch the path fill as we walk through delivery.
            </p>
          </div>

          <div className="procpage-rise-d1 mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            {/* Step rail */}
            <div className="relative">
              <div className="absolute bottom-3 left-[21px] top-3 w-px bg-white/10" />
              <div
                className="absolute left-[21px] top-3 w-px origin-top bg-gradient-to-b from-cyan via-cyan to-cyan/20 transition-all duration-700 ease-out"
                style={{
                  height: `calc(${((active + 1) / processSteps.length) * 100}% - 0.75rem)`,
                }}
              />
              <ol className="relative space-y-2">
                {processSteps.map((step, index) => {
                  const isActive = index === active;
                  const done = index < active;
                  return (
                    <li key={step.num}>
                      <button
                        type="button"
                        onClick={() => setActive(index)}
                        onMouseEnter={() => setActive(index)}
                        className={`flex w-full gap-4 rounded-2xl border p-4 text-left transition duration-300 sm:p-5 ${
                          isActive
                            ? "border-cyan/35 bg-[#0f1618]"
                            : "border-transparent hover:bg-white/[0.02]"
                        }`}
                      >
                        <div
                          className={`relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition duration-300 ${
                            isActive
                              ? "procpage-glow border-cyan bg-cyan text-[#061315]"
                              : done
                                ? "border-cyan/50 bg-cyan/15 text-cyan"
                                : "border-white/15 bg-[#151d25] text-white/40"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${
                              isActive ? "text-cyan" : "text-white/30"
                            }`}
                          >
                            {step.tag}
                          </p>
                          <h3
                            className={`display mt-1 text-lg font-bold sm:text-xl ${
                              isActive ? "text-white" : "text-white/55"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`mt-1.5 text-sm leading-relaxed ${
                              isActive ? "text-white/55" : "text-white/30"
                            }`}
                          >
                            {step.text}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Active stage panel */}
            <div
              key={current.num}
              className="procpage-panel relative overflow-hidden rounded-[1.5rem] border border-white/10 p-7 sm:p-9"
              style={{
                background: `linear-gradient(145deg, ${current.accent}18, transparent 42%), linear-gradient(160deg, #151d25, #10151c)`,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full blur-3xl"
                style={{ background: `${current.accent}28` }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  maskImage: "radial-gradient(ellipse 70% 60% at 70% 30%, black, transparent)",
                }}
              />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p
                    className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: current.accent }}
                  >
                    Stage {current.num} · {current.tag}
                  </p>
                  <span className="rounded-full border border-white/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white/45">
                    {current.duration}
                  </span>
                </div>
                <h3 className="serif mt-5 text-4xl text-white sm:text-5xl">{current.title}</h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">
                  {current.detail}
                </p>

                <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/35">
                  What you get
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {current.deliverables.map((item, i) => (
                    <li
                      key={item}
                      className="procpage-deliver flex items-start gap-3 text-sm text-white/65"
                      style={{ animationDelay: `${0.08 + i * 0.06}s` }}
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: current.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex gap-1.5">
                  {processSteps.map((step, index) => (
                    <button
                      key={step.num}
                      type="button"
                      aria-label={`Show ${step.title}`}
                      onClick={() => setActive(index)}
                      className="h-1.5 flex-1 rounded-full transition duration-500"
                      style={{
                        background:
                          index <= active ? current.accent : "rgba(255,255,255,0.12)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEEP STRIP — horizontal stage cards as interaction rows, not hero cards */}
      <section
        ref={deep.ref}
        className={`relative z-[1] border-t border-white/8 section-pad ${
          deep.inView ? "procpage-in" : ""
        }`}
      >
        <div className="container-page">
          <div className="procpage-rise max-w-2xl">
            <p className="eyebrow">At a glance</p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">
              Full path, no surprises
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="procpage-row group grid items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-5 transition duration-300 sm:grid-cols-[auto_1fr_auto] sm:px-7"
                style={{ animationDelay: `${0.06 + i * 0.08}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${step.accent}66`;
                  e.currentTarget.style.background = `${step.accent}0f`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="display text-2xl font-bold"
                    style={{ color: `${step.accent}99` }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/35">
                      {step.tag}
                    </p>
                    <h3 className="serif text-xl text-white sm:text-2xl">{step.title}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/45 sm:max-w-xl">
                  {step.text}
                </p>
                <p
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: step.accent }}
                >
                  {step.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section
        ref={principles.ref}
        className={`relative z-[1] border-t border-white/8 section-pad ${
          principles.inView ? "procpage-in" : ""
        }`}
      >
        <div className="container-page">
          <div className="procpage-rise max-w-2xl">
            <p className="eyebrow">How we run it</p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-4xl">
              Process without the chaos
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {processPrinciples.map((item, i) => (
              <div
                key={item.title}
                className="procpage-rise border-l border-cyan/35 pl-5"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <h3 className="serif text-xl text-white sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              Ready when you are
            </p>
            <h2 className="serif mt-4 max-w-2xl text-3xl text-white sm:text-5xl">
              Start at stage one — we’ll handle the rest.
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
