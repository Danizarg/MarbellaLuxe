import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 max-w-[14ch] text-[clamp(2.5rem,7vw,5rem)]">
        That address is not on our books.
      </h1>
      <p className="measure mt-7 text-base leading-relaxed text-mist">
        The page you were after has moved or never existed. The portfolio is where most people
        were going anyway.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/properties"
          className="bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
        >
          View the portfolio
        </Link>
        <Link
          href="/"
          className="border border-[var(--rule)] px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:text-gold"
        >
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
