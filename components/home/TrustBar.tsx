const clients = [
  { name: "LoudSup", label: "Talent Marketplace" },
  { name: "The House of Fitness", label: "Fitness Portal" },
  { name: "Primary Classes", label: "EdTech Platform" },
  { name: "Bhumap", label: "PropTech Discovery" },
  { name: "King's Food", label: "Cloud Kitchen" },
  { name: "Credo Future Care", label: "Travel & Services" },
  { name: "Garib Nawaz Foundation", label: "Nonprofit NGO" },
];

export function TrustBar() {
  const row = [...clients, ...clients];

  return (
    <section className="relative w-full max-w-full overflow-hidden border-y border-white/8 bg-[#090b0e] py-6 sm:py-8">
      <div className="container-page w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cyan/90">
            Trusted by Ambitious Businesses Across India
          </p>
        </div>

        <div className="relative mt-4 sm:mt-5 w-full max-w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 sm:w-20 bg-gradient-to-r from-[#090b0e] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 sm:w-20 bg-gradient-to-l from-[#090b0e] to-transparent" />

          <div className="animate-marquee flex w-max items-center gap-6 sm:gap-12">
            {row.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="group flex shrink-0 items-center gap-2.5 sm:gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-3.5 sm:px-4 py-2 transition hover:border-cyan/30 hover:bg-cyan/[0.04]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/60 group-hover:bg-cyan transition" />
                <span className="display whitespace-nowrap text-sm sm:text-base font-bold tracking-wide text-white/60 group-hover:text-white transition">
                  {item.name}
                </span>
                <span className="hidden sm:inline-block rounded bg-white/[0.04] px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-muted">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

