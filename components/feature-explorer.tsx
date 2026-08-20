"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { facets } from "@/lib/locations";
import { imageSrc } from "@/lib/properties";
import { mix, span, useReducedMotion, useScrollProgress } from "@/lib/use-scroll-progress";
import { PLink } from "./proposal";

/**
 * Architecture → Interiors → Views → Location → Lifestyle, pinned.
 *
 * Scroll advances the lens. The photograph does not simply cross-fade: the
 * incoming frame opens from its bottom edge under a clip mask while settling out
 * of a slight scale, the outgoing one drifts up and away, and the headline swaps
 * behind a mask so the words rise rather than blink. The rule under the tab row
 * travels continuously with scroll rather than snapping between positions.
 *
 * Each lens shows the strongest real frame for it in the portfolio and credits
 * the listing it came from, so the sequence is also a route into the properties.
 *
 * Tabs remain clickable — they scroll to their own segment. Under reduced motion
 * the whole thing collapses to a plain tabbed panel.
 */
export function FeatureExplorer() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const p = useScrollProgress(wrap);

  const count = facets.length;
  const index = Math.min(Math.floor(p * count), count - 1);
  const local = p * count - index; // 0 – 1 within the active lens

  const goTo = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.45) / count) * travel, behavior: "smooth" });
  };

  if (reduced) return <StaticExplorer />;

  return (
    <section
      ref={wrap}
      aria-label="How buyers choose"
      style={{ height: `${count * 100}svh` }}
      className="relative border-t border-[var(--color-ink-hairline)]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
        {/* Photography */}
        {facets.map((facet, i) => {
          const state = i - index; // 0 = active, -1 = just left, 1 = next
          const open = i === index ? span(local, 0, 0.28) : i < index ? 1 : 0;
          const leaving = i === index - 1 ? span(local, 0, 0.28) : 0;
          if (state > 0 || state < -1) return null;

          return (
            <div
              key={facet.id}
              className="absolute inset-0"
              aria-hidden
              style={{
                clipPath: `inset(0 0 ${(1 - open) * 100}% 0)`,
                zIndex: i,
              }}
            >
              <Image
                src={imageSrc(facet.imageRef, facet.imageIndex)}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
                style={{
                  transform: `scale(${mix(1.1, 1.0, open)}) translateY(${mix(0, -3, leaving)}%)`,
                  opacity: 1 - leaving * 0.35,
                }}
              />
            </div>
          );
        })}

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-ink via-ink/45 to-ink/25" aria-hidden />

        {/* Copy */}
        <div className="shell relative z-30 flex h-full flex-col justify-end pb-32 md:pb-36">
          <p
            className="eyebrow"
            style={{ opacity: span(local, 0.04, 0.2) * (1 - span(local, 0.9, 1)) }}
          >
            How buyers actually choose · {String(index + 1).padStart(2, "0")}
          </p>

          {/* The headline rises out of a mask on entry and fades as it leaves —
              sliding it out under the mask alone left it sitting half-clipped
              through the hand-over, which reads as a rendering fault. */}
          <h2
            className="display mt-5 max-w-[18ch] text-[clamp(2.25rem,6vw,5rem)]"
            style={{ opacity: 1 - span(local, 0.9, 1) }}
          >
            <span className="mask">
              <span
                className="mask-line"
                style={{
                  animation: "none",
                  transform: `translateY(${mix(110, 0, span(local, 0.05, 0.34))}%)`,
                }}
              >
                {facets[index].headline}
              </span>
            </span>
          </h2>

          <p
            className="mt-6 max-w-[56ch] text-base leading-relaxed text-mist"
            style={{
              opacity: span(local, 0.12, 0.34) * (1 - span(local, 0.86, 1)),
              transform: `translateY(${mix(10, 0, span(local, 0.12, 0.34))}px)`,
            }}
          >
            {facets[index].copy}
          </p>

          <PLink
            href={`/properties/${facets[index].creditSlug}`}
            className="mt-7 inline-flex w-fit items-center gap-3 text-xs uppercase tracking-[0.18em] text-mist transition-colors hover:text-gold"
            style={{ opacity: span(local, 0.2, 0.42) * (1 - span(local, 0.86, 1)) }}
          >
            <span className="h-px w-8 bg-gold" />
            Photographed at {facets[index].creditName}
          </PLink>
        </div>

        {/* Tab row — the rule travels with scroll rather than snapping */}
        <div className="absolute inset-x-0 bottom-0 z-30 border-t border-[var(--color-ink-hairline)] bg-ink/55 backdrop-blur-md">
          <div className="shell relative">
            <span
              className="absolute top-0 h-px bg-gold transition-none"
              style={{ left: `calc(var(--shell) + ${p * 80}%)`, width: "20%" }}
              aria-hidden
            />
            <ul className="grid grid-cols-5">
              {facets.map((facet, i) => (
                <li key={facet.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === index ? "true" : undefined}
                    className={[
                      "w-full px-1 py-5 text-left text-xs tracking-wide transition-colors duration-500 sm:text-sm",
                      i === index ? "text-bone" : "text-mist-dim hover:text-mist",
                    ].join(" ")}
                  >
                    <span className="numeric mr-2 text-[0.6rem] text-mist-dim sm:mr-3 sm:text-[0.65rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden sm:inline">{facet.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: the same content as a plain tabbed panel. */
function StaticExplorer() {
  const [active, setActive] = useState(0);
  const facet = facets[active];

  return (
    <section className="border-t border-[var(--color-ink-hairline)]">
      <div className="relative h-[70svh] min-h-[26rem] w-full overflow-hidden">
        <Image
          src={imageSrc(facet.imageRef, facet.imageIndex)}
          alt={facet.label}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
        <div className="shell relative flex h-full flex-col justify-end pb-14">
          <p className="eyebrow">How buyers actually choose</p>
          <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.25rem,6vw,5rem)]">
            {facet.headline}
          </h2>
          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-mist">{facet.copy}</p>
        </div>
      </div>
      <div className="shell">
        <ul className="grid grid-cols-2 border-t border-[var(--color-ink-hairline)] sm:grid-cols-3 lg:grid-cols-5">
          {facets.map((f, i) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`w-full px-1 py-6 text-left text-sm ${
                  i === active ? "text-bone" : "text-mist-dim"
                }`}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
