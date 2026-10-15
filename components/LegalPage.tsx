import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, updated, children }: LegalPageProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 20% 0%, rgba(0,200,212,0.12), transparent 55%), #0a0a0a",
        }}
      />

      <div className="container-page relative z-[1] py-14 sm:py-20">
        <nav className="mb-8 text-sm text-muted">
          <Link href="/" className="transition hover:text-cyan">
            Home
          </Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-white/70">{title}</span>
        </nav>

        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        <div className="mt-6 h-px w-24 bg-gradient-to-r from-cyan to-transparent" />

        <article className="legal-prose mt-12 max-w-3xl">{children}</article>

        <div className="mt-14 flex flex-wrap gap-3 border-t border-white/10 pt-8">
          <Link href="/privacy" className="btn-secondary !px-4 !py-2.5 text-sm">
            Privacy Policy
          </Link>
          <Link href="/terms" className="btn-secondary !px-4 !py-2.5 text-sm">
            Terms of Service
          </Link>
          <Link href="/#lead" className="btn-primary !px-4 !py-2.5 text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
