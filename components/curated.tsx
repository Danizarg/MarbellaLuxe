import { properties } from "@/lib/properties";
import { PropertyCard } from "./property-card";
import { rhythmAt } from "@/lib/grid-rhythm";
import { PLink } from "./proposal";

/**
 * Five properties, in editorial rhythm rather than five identical tiles.
 *
 * The first card runs wide, the second stands portrait, the rest sit level —
 * enough variation for the page to read as curated, little enough that the grid
 * is still scannable. Five is the count that fills exactly two rows of three.
 */
export function Curated() {
  const featured = properties.slice(0, 5);

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div className="max-w-2xl">
            <p className="meta-in seq-1 eyebrow">Selected properties</p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]">
              <span className="mask">
                <span className="mask-line seq-2">A short list, kept short.</span>
              </span>
            </h2>
            <p className="meta-in seq-3 mt-7 max-w-[52ch] text-base leading-relaxed text-mist">
              We publish a fraction of what we can access. Villas, apartments and penthouses across
              five markets — with plots, new developments and commercial behind the search.
            </p>
          </div>

          <PLink
            href="/properties"
            className="meta-in seq-3 inline-flex items-center gap-3 whitespace-nowrap border border-[var(--rule)] px-6 py-3.5 text-[0.72rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink"
          >
            All {properties.length} properties
          </PLink>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((property, i) => {
            const rhythm = rhythmAt(i);
            return (
              <PropertyCard
                key={property.ref}
                property={property}
                priority={i < 2}
                className={`reveal ${rhythm.span}`}
                aspect={rhythm.aspect}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
