import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(0,200,212,0.12), transparent 55%), #0a0a0a",
        }}
      />
      <div className="container-page relative z-[1] py-20 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-4 text-5xl font-bold text-white sm:text-6xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/#lead" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
