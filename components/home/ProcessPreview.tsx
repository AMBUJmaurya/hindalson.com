"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/process";

const steps = processSteps;

export function ProcessPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden border-y border-line bg-[#10151c] section-pad ${
        inView ? "process-in-view" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(0,200,212,0.1), transparent 60%)",
        }}
      />

      <div className="container-page relative z-[1]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="display mt-4 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
              A clear path from{" "}
              <span className="bg-gradient-to-r from-white to-cyan bg-clip-text text-transparent">
                first call
              </span>{" "}
              to long-term growth.
            </h2>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-cyan to-transparent" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted lg:text-right">
            Five stages. One accountable team. No guesswork between kickoff and care.
          </p>
        </div>

        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-0 right-0 top-[22px] h-px bg-white/10" />
          <div className="process-line-x absolute left-0 top-[22px] h-px w-full bg-gradient-to-r from-cyan via-cyan to-cyan/30" />

          <ol className="relative grid grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <li
                  key={step.title}
                  className="process-step"
                  onMouseEnter={() => setActive(index)}
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                  >
                    <div
                      className={`relative z-[1] mb-8 flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition duration-300 ${
                        isActive
                          ? "process-node-active border-cyan bg-cyan text-[#061315]"
                          : "border-cyan/35 bg-[#151d25] text-cyan"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p
                      className={`text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition ${
                        isActive ? "text-cyan" : "text-white/30"
                      }`}
                    >
                      {step.tag}
                    </p>
                    <h3
                      className={`display mt-2 text-xl font-bold transition ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed transition ${
                        isActive ? "text-muted" : "text-white/30"
                      }`}
                    >
                      {step.text}
                    </p>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-2 left-[21px] top-2 w-px bg-white/10" />
          <div className="process-line-y absolute left-[21px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan via-cyan to-cyan/20" />

          <ol className="relative space-y-2">
            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <li
                  key={step.title}
                  className="process-step"
                  onClick={() => setActive(index)}
                >
                  <div
                    className={`relative flex gap-4 rounded-2xl border p-4 transition duration-300 ${
                      isActive
                        ? "border-cyan/35 bg-[#19232d]"
                        : "border-transparent bg-transparent"
                    }`}
                  >
                    <div
                      className={`relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition ${
                        isActive
                          ? "process-node-active border-cyan bg-cyan text-[#061315]"
                          : "border-cyan/35 bg-[#151d25] text-cyan"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p
                        className={`text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${
                          isActive ? "text-cyan" : "text-white/30"
                        }`}
                      >
                        {step.tag}
                      </p>
                      <h3 className="display mt-1 text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#151d25]">
          <div className="flex items-center gap-2 px-5 pt-4">
            {steps.map((step, index) => (
              <button
                key={step.num}
                type="button"
                aria-label={`Show ${step.title}`}
                onClick={() => setActive(index)}
                className={`h-1 flex-1 rounded-full transition duration-500 ${
                  index <= active ? "bg-cyan" : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <div key={steps[active].num} className="animate-rise px-5 py-5 sm:px-7 sm:py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              Stage {steps[active].num} · {steps[active].tag}
            </p>
            <p className="display mt-2 text-2xl font-bold text-white sm:text-3xl">
              {steps[active].title}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {steps[active].text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
