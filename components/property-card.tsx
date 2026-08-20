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
 * Photography dominates; the text is a caption.
 *
 * An earlier version carried a full sentence of description on every card, which
 * pushed the image down to roughly half the card. On an index page that sentence
 * is dead weight — the photograph is what sells a €2M villa, and the description
 * belongs on the property's own page. The card is now about four-fifths image.
 *
 * `aspect` lets the grid vary the shape of the frame without varying the
 * component, which is how the editorial layout gets its rhythm.
 */
export function PropertyCard({
  property,
  priority,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  property: Property;
  priority?: boolean;
  className?: string;
  aspect?: string;
}) {
  const showRooms = !isLand(property) && property.beds > 0;

  return (
    <PLink
      href={`/properties/${property.slug}`}
      className={`group block ${className}`}
      aria-label={`${property.name}, ${property.location} — ${priceLabel(property)}`}
    >
      <div className={`relative overflow-hidden bg-ink-raised ${aspect}`}>
        <Image
          src={imageSrc(property.ref, property.hero)}
          alt={`${property.name}, ${property.location}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 88vw, (max-width: 1280px) 60vw, 46vw"
          className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "var(--ease-luxe)" }}
        />

        {/* Just enough gradient to seat the reference, not an overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/55 to-transparent" />

        <span className="numeric absolute bottom-4 left-4 text-[0.65rem] tracking-[0.15em] text-bone/75">
          {property.ref}
        </span>

        <span className="absolute bottom-4 right-4 translate-y-2 text-[0.65rem] uppercase tracking-[0.18em] text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View property ↗
        </span>
      </div>

      <div className="transition-transform duration-500 group-hover:-translate-y-0.5">
        <p className="mt-5 text-[0.65rem] uppercase tracking-[0.18em] text-mist-dim">
          {property.location} · {property.kind}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="display text-2xl md:text-[1.75rem]">{property.name}</h3>
          <p className="numeric shrink-0 text-base text-gold">{priceLabel(property)}</p>
        </div>

        <dl className="numeric mt-4 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-[var(--color-ink-hairline)] pt-3 text-xs text-mist-dim">
          {showRooms ? (
            <>
              <Datum
                label={property.category === "Hotel" ? "Keys" : "Beds"}
                value={bedsLabel(property)}
              />
              <Datum label="Baths" value={bathsLabel(property)} />
            </>
          ) : null}
          {property.built > 0 ? <Datum label="Built" value={formatArea(property.built)} /> : null}
          {property.plot > 0 ? <Datum label="Plot" value={formatArea(property.plot)} /> : null}
          {property.built === 0 && property.plot === 0 ? (
            <Datum label="Type" value={property.kind} />
          ) : null}
        </dl>
      </div>
    </PLink>
  );
}

function Datum({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1.5">
      <dt className="text-mist-dim">{label}</dt>
      <dd className="text-mist">{value}</dd>
    </div>
  );
}
