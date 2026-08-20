"use client";

import Image from "next/image";
import { formatArea, formatPrice, imageSrc, type Property } from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * One card, used by both the curated rail and the search grid.
 *
 * The photograph is the card; everything else is a caption underneath it. Hover
 * scales the image inside a fixed frame rather than moving the card, so a grid
 * of these never reflows.
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
  return (
    <PLink
      href={`/properties/${property.slug}`}
      className={`group block ${className}`}
      aria-label={`${property.name}, ${property.location} — ${formatPrice(property.price)}`}
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
        <span className="numeric absolute bottom-4 left-4 text-xs tracking-[0.15em] text-bone/80">
          {property.ref}
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-4 pt-6">
        <h3 className="display text-2xl md:text-[1.75rem]">{property.name}</h3>
        <p className="numeric shrink-0 text-base text-gold">{formatPrice(property.price)}</p>
      </div>

      <p className="mt-1.5 text-sm text-mist-dim">{property.location}</p>
      <p className="measure mt-4 text-sm leading-relaxed text-mist">{property.standfirst}</p>

      <dl className="numeric mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-ink-hairline)] pt-4 text-xs text-mist-dim">
        <Datum label="Beds" value={String(property.beds)} />
        <Datum label="Baths" value={String(property.baths)} />
        <Datum label="Built" value={formatArea(property.built)} />
        <Datum label="Plot" value={formatArea(property.plot)} />
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
