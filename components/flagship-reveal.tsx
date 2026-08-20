"use client";

import Image from "next/image";
import { useRef } from "react";
import { flagship, formatArea, formatPrice, imageSrc } from "@/lib/properties";
import { mix, span, useReducedMotion, useScrollProgress } from "@/lib/use-scroll-progress";
import { PLink } from "./proposal";

/**
 * The signature moment: the flagship residence revealed by its own numbers.
 *
 * Scroll drives a single pinned stage. The guide price arrives first on black,
 * then the house emerges from the centre of the frame and grows to fill it,
 * and each subsequent specification — built area, bedrooms, plot — hands over to
 * the photograph that answers it. The animation *is* the data, which is worth
 * considerably more here than decorative motion would be.
 *
 * Every figure is the client's own, from lib/properties.ts.
 *
 * Under reduced motion this collapses to a static spread with the same content.
 */

const STAGES = [
  { image: 2, value: null, caption: null },
  { image: 9, value: formatArea(flagship.built), caption: "of built space, over three floors" },
  { image: 17, value: `${flagship.beds} bedrooms`, caption: "and ten bathrooms, each en suite" },
  { image: 21, value: formatArea(flagship.plot), caption: "of private, walled grounds" },
] as const;

export function FlagshipReveal() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const p = useScrollProgress(wrap);

  if (reduced) return <StaticFallback />;

  /* Windows through the sequence, in progress units. */
  const priceIn = span(p, 0.02, 0.1);
  const priceOut = span(p, 0.14, 0.24);
  const grow = span(p, 0.13, 0.4);

  /* Which photograph is showing, and how far through its own beat we are. */
  const beats = [
    span(p, 0.13, 0.42), // exterior arrives
    span(p, 0.44, 0.56), // interior
    span(p, 0.6, 0.72), // terrace
    span(p, 0.76, 0.88), // grounds
  ];

  const frameW = mix(42, 100, grow);
  const frameH = mix(52, 100, grow);

  return (
    <section
      ref={wrap}
      aria-label={`${flagship.name}, in detail`}
      style={{ height: "420svh" }}
      className="relative bg-ink"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Photography — the frame grows from the centre, images hand over */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative overflow-hidden"
            style={{ width: `${frameW}%`, height: `${frameH}%` }}
          >
            {STAGES.map((stage, i) => {
              const active = i === 0 ? beats[0] : beats[i];
              const next = i < STAGES.length - 1 ? beats[i + 1] : 0;
              const opacity = active * (1 - next);
              return (
                <Image
                  key={stage.image}
                  src={imageSrc(flagship.ref, stage.image)}
                  alt=""
                  aria-hidden
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                  style={{
                    opacity,
                    transform: `scale(${mix(1.12, 1.0, active)})`,
                  }}
                />
              );
            })}
            <div
              className="absolute inset-0 bg-ink"
              style={{ opacity: mix(0.55, 0.34, grow) }}
              aria-hidden
            />
          </div>
        </div>

        {/* Guide price — the opening statement, on black */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{
            opacity: priceIn * (1 - priceOut),
            transform: `translateY(${mix(0, -2.5, priceOut)}rem) scale(${mix(1, 0.96, priceOut)})`,
          }}
        >
          <p className="eyebrow">{flagship.location}</p>
          <p className="numeric display mt-6 text-[clamp(3rem,11vw,9rem)] leading-none text-bone">
            {formatPrice(flagship.price)}
          </p>
        </div>

        {/* Specifications — each one hands over to the photograph that answers it */}
        {STAGES.map((stage, i) => {
          if (!stage.value) return null;
          const inThis = beats[i];
          const outThis = i < STAGES.length - 1 ? beats[i + 1] : span(p, 0.9, 0.97);
          return (
            <div
              key={stage.value}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              style={{
                opacity: inThis * (1 - outThis),
                transform: `translateY(${mix(1.5, 0, inThis)}rem) scale(${mix(1, 1.06, outThis)})`,
              }}
              aria-hidden={inThis < 0.5}
            >
              <p className="numeric display text-[clamp(2.75rem,9vw,7.5rem)] leading-none text-bone">
                {stage.value}
              </p>
              <p className="mt-5 max-w-sm text-sm uppercase tracking-[0.22em] text-mist">
                {stage.caption}
              </p>
            </div>
          );
        })}

        {/* Resolution */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-14 text-center"
          style={{
            opacity: span(p, 0.9, 0.98),
            pointerEvents: p > 0.93 ? "auto" : "none",
          }}
        >
          <p className="eyebrow">Featured residence</p>
          <p className="display mt-4 text-[clamp(2rem,4.5vw,3.5rem)]">{flagship.name}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PLink
              href={`/properties/${flagship.slug}`}
              className="bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
            >
              View the residence
            </PLink>
            <PLink
              href={`/contact?intent=viewing&ref=${flagship.ref}`}
              className="border border-[var(--rule)] px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              Arrange a viewing
            </PLink>
          </div>
        </div>

        {/* Progress rule — quiet, but it tells you the sequence has an end */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-ink-hairline)]" aria-hidden>
          <div className="h-full bg-gold" style={{ width: `${p * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

/** Reduced motion, and the semantic content search engines read. */
function StaticFallback() {
  return (
    <section className="border-t border-[var(--color-ink-hairline)] py-24">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-raised">
          <Image
            src={imageSrc(flagship.ref, 2)}
            alt={`${flagship.name}, ${flagship.location}`}
            fill
            sizes="(max-width: 1024px) 92vw, 45vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">Featured residence · {flagship.location}</p>
          <p className="numeric display mt-5 text-[clamp(2.5rem,6vw,4.5rem)] text-bone">
            {formatPrice(flagship.price)}
          </p>
          <dl className="numeric mt-8 space-y-3 text-base text-mist">
            <div className="flex gap-3">
              <dt>Built</dt>
              <dd className="text-bone">{formatArea(flagship.built)}</dd>
            </div>
            <div className="flex gap-3">
              <dt>Bedrooms</dt>
              <dd className="text-bone">{flagship.beds}</dd>
            </div>
            <div className="flex gap-3">
              <dt>Plot</dt>
              <dd className="text-bone">{formatArea(flagship.plot)}</dd>
            </div>
          </dl>
          <PLink
            href={`/properties/${flagship.slug}`}
            className="mt-10 inline-block bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink"
          >
            View the residence
          </PLink>
        </div>
      </div>
    </section>
  );
}
