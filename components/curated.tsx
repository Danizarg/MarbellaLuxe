import { properties } from "@/lib/properties";
import { PropertyCard } from "./property-card";
import { PLink } from "./proposal";
import { SectionHead } from "./section-head";

/**
 * A conventional three-column grid.
 *
 * An earlier version used a horizontally scroll-snapped rail. It looked good and
 * it made comparing properties harder, which is the wrong trade for the part of
 * the site people actually came for: the animation budget is spent on the intro,
 * and the listings are presented the way listings should be.
 */
export function Curated() {
  const featured = properties.slice(0, 6);

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Selected properties"
          title="A short list, kept deliberately short."
          copy="We publish a fraction of what we have access to. These are the properties we would put in front of you first — villas, apartments and penthouses across Marbella, Benahavís, Estepona, Sotogrande and Mijas. The full portfolio, including plots, new developments and commercial, sits behind the search."
          action={
            <PLink
              href="/properties"
              className="inline-flex items-center gap-3 whitespace-nowrap border border-[var(--rule)] px-6 py-3.5 text-[0.72rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink"
            >
              View all {properties.length} properties
            </PLink>
          }
        />

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((property, i) => (
            <PropertyCard
              key={property.ref}
              property={property}
              priority={i < 3}
              className="reveal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
