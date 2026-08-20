"use client";

import Image from "next/image";
import { useState } from "react";
import { facets } from "@/lib/locations";
import { imageSrc } from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * Architecture / Interiors / Views / Location / Lifestyle.
 *
 * Rather than illustrating five abstractions with stock photography, each lens
 * shows the single strongest real image for it in the current portfolio and
 * credits the listing it came from - so the selector is also a route into the
 * properties. Full-bleed stage, hairline tab row underneath.
 */
export function FeatureExplorer() {
  const [active, setActive] = useState(0);
  const current = facets[active];

  return (
    <section className="relative border-t border-[var(--color-ink-hairline)]">
      <div className="relative h-[78svh] min-h-[32rem] w-full overflow-hidden">
        {facets.map((facet, i) => (
          <Image
            key={facet.id}
            src={imageSrc(facet.imageRef, facet.imageIndex)}
            alt={facet.label}
            fill
            sizes="100vw"
            aria-hidden={i !== active}
            className="object-cover transition-opacity duration-1000"
            style={{
              opacity: i === active ? 1 : 0,
              transitionTimingFunction: "var(--ease-luxe)",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />

        <div className="shell relative flex h-full flex-col justify-end pb-14">
          <p className="eyebrow">How buyers actually choose</p>
          <h2 className="display mt-5 max-w-[14ch] text-[clamp(2.25rem,6vw,5rem)]">
            {current.headline}
          </h2>
          <p className="measure mt-6 text-base leading-relaxed text-mist">{current.copy}</p>

          <PLink
            href={`/properties/${current.creditSlug}`}
            className="mt-7 inline-flex w-fit items-center gap-3 text-xs uppercase tracking-[0.18em] text-mist transition-colors hover:text-gold"
          >
            <span className="h-px w-8 bg-gold" />
            Photographed at {current.creditName}
          </PLink>
        </div>
      </div>

      {/* Tabs */}
      <div className="shell">
        <ul className="grid grid-cols-2 gap-px border-t border-[var(--color-ink-hairline)] sm:grid-cols-3 lg:grid-cols-5">
          {facets.map((facet, i) => {
            const isActive = i === active;
            return (
              <li key={facet.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "relative w-full px-1 py-6 text-left text-sm tracking-wide transition-colors duration-500",
                    isActive ? "text-bone" : "text-mist-dim hover:text-mist",
                  ].join(" ")}
                >
                  <span className="numeric mr-3 text-[0.65rem] text-mist-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {facet.label}
                  <span
                    className="absolute left-0 top-0 h-px bg-gold transition-[width] duration-700"
                    style={{
                      width: isActive ? "100%" : "0%",
                      transitionTimingFunction: "var(--ease-luxe)",
                    }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
