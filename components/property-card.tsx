"use client";

import Image from "next/image";
import {
  bathsLabel,
  bedsLabel,
  formatArea,
  imageSrc,
  isLand,
  priceLabel,
  type Property,
} from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * One card, used by the homepage grid, the search results and the related
 * properties strip.
 *
 * The photograph is the card; everything under it is a caption. Hover scales the
 * image inside a fixed frame rather than moving the card, so a grid of these
 * never reflows. The data row adapts to the category: land has no bedrooms, and
 * commercial has no meaningful bedroom count either.
 */
export function PropertyCard({
  property,
  priority,
  className = "",
}: {
  property: Property;
  priority?: boolean;
  className?: string;
}) {
  const land = isLand(property);
  const roomsWorthShowing = !land && property.beds > 0;

  return (
    <PLink
      href={`/properties/${property.slug}`}
      className={`group block ${className}`}
      aria-label={`${property.name}, ${property.location} — ${priceLabel(property)}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-raised">
        <Image
          src={imageSrc(property.ref, property.hero)}
          alt={`${property.name}, ${property.location}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 88vw, (max-width: 1280px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
          style={{ transitionTimingFunction: "var(--ease-luxe)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70" />

        <span className="absolute left-4 top-4 bg-ink/70 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.15em] text-bone backdrop-blur-sm">
          {property.category}
        </span>
        <span className="numeric absolute bottom-4 left-4 text-xs tracking-[0.15em] text-bone/80">
          {property.ref}
        </span>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-6">
        <h3 className="display text-2xl md:text-[1.75rem]">{property.name}</h3>
        <p className="numeric shrink-0 text-base text-gold">{priceLabel(property)}</p>
      </div>

      <p className="mt-1.5 text-sm text-mist-dim">{property.location}</p>
      <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-mist">{property.standfirst}</p>

      <dl className="numeric mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-ink-hairline)] pt-4 text-xs text-mist-dim">
        {roomsWorthShowing ? (
          <>
            <Datum label={property.category === "Hotel" ? "Keys" : "Beds"} value={bedsLabel(property)} />
            <Datum label="Baths" value={bathsLabel(property)} />
          </>
        ) : null}
        {property.built > 0 ? <Datum label="Built" value={formatArea(property.built)} /> : null}
        {property.plot > 0 ? <Datum label="Plot" value={formatArea(property.plot)} /> : null}
        {property.built === 0 && property.plot === 0 ? (
          <Datum label="Type" value={property.kind} />
        ) : null}
      </dl>
    </PLink>
  );
}

function Datum({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-mist-dim">{label}</dt>
      <dd className="text-mist">{value}</dd>
    </div>
  );
}
