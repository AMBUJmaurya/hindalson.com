import Link from "next/link";

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Fast Communication",
    text: "Direct access to the engineers and designers building your project — no layers of sales reps or lost emails.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Business-Focused Approach",
    text: "Every layout, CTA, and flow is engineered to generate qualified enquiries, conversions, and tangible ROI.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Custom Solutions",
    text: "Tailored to your specific workflows and branding. No lazy cookie-cutter templates that slow your site down.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Scalable Technology",
    text: "Built with modern Next.js, React, Node.js, and cloud backends engineered to handle traffic growth effortlessly.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Ongoing Support & SEO",
    text: "We stay after launch with technical fixes, ranking improvements, backups, security, and monthly reporting.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "100% Asset Ownership",
    text: "You own all source code, design assets, and credentials upon handover. Zero proprietary lock-in.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#10151c] section-pad border-t border-white/8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 20%, rgba(0,200,212,0.08), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 80%, rgba(0,200,212,0.05), transparent 50%)",
        }}
      />

      <div className="container-page relative z-[1]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Why Choose Hindalson</p>
            <h2 className="display mt-3 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
              Built like a{" "}
              <span className="bg-gradient-to-r from-white via-cyan to-[#7dd8ff] bg-clip-text text-transparent">
                product company.
              </span>
              <br />
              <span className="text-white/40">Priced for growing businesses.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/#lead" className="btn-primary text-sm shadow-[0_0_24px_rgba(0,200,212,0.25)] w-full sm:w-auto text-center">
              Get a Free Proposal →
            </Link>
          </div>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#19232d]/80 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-[#1f2c38]"
            >
              {/* Subtle hover glow inside card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan/0 blur-2xl transition duration-500 group-hover:bg-cyan/15"
              />

              <div className="flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan transition duration-300 group-hover:bg-cyan group-hover:text-[#061315]">
                  {item.icon}
                </div>
                <span className="display text-xs font-semibold tracking-widest text-white/20 group-hover:text-cyan/70 transition">
                  0{index + 1}
                </span>
              </div>

              <h3 className="display mt-5 text-lg font-bold text-white sm:text-xl group-hover:text-cyan transition-colors">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-12 rounded-2xl border border-cyan/25 bg-gradient-to-r from-cyan/[0.08] via-white/[0.02] to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="display text-xl font-bold text-white sm:text-2xl">
              Serious delivery. Clear ownership. <span className="text-cyan">No freelancer chaos.</span>
            </p>
            <p className="mt-1 text-sm text-muted max-w-xl">
              One unified team for websites, mobile apps, SEO management, and performance marketing.
            </p>
          </div>
          <Link href="/contact" className="btn-secondary w-full sm:w-auto text-center sm:whitespace-nowrap text-sm">
            Contact Our Team →
          </Link>
        </div>
      </div>
    </section>
  );
}

