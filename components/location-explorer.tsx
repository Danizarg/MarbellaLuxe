"use client";

import Image from "next/image";
import { useState } from "react";
import { countIn, locations } from "@/lib/locations";
import { imageSrc } from "@/lib/properties";

/**
 * The five markets, explored one at a time.
 *
 * Selecting a market does not simply cross-fade the stage: the incoming
 * photograph opens from its bottom edge under a clip mask while settling out of
 * a slight scale, and the statement swaps behind a mask so the words rise. The
 * list itself stays put so the eye never has to re-find it, and a hairline
 * travels down the left of the active market.
 */
export function LocationExplorer() {
  const [active, setActive] = useState(0);
  const current = locations[active];

  return (
    <section id="locations" className="border-t border-[var(--color-ink-hairline)] py-24 md:py-32">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="meta-in seq-1 eyebrow">Where we work</p>
          <h2 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]">
            <span className="mask">
              <span className="mask-line seq-2">Five markets, twenty minutes apart.</span>
            </span>
          </h2>
          <p className="meta-in seq-3 mt-7 max-w-[54ch] text-base leading-relaxed text-mist">
            The Costa del Sol is not one market, and treating it as one is the most expensive
            mistake a buyer makes here.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Selector */}
          {/* min-w-0: a grid item defaults to min-width:auto, so the nowrap
              market row below forces the whole track wider than the viewport. */}
          <div className="min-w-0 lg:col-span-4">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:block lg:gap-0 lg:overflow-visible lg:pb-0">
              {locations.map((location, i) => {
                const isActive = i === active;
                return (
                  <li key={location.region} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "true" : undefined}
                      className="group relative w-full whitespace-nowrap border-t border-[var(--color-ink-hairline)] px-4 py-4 text-left lg:whitespace-normal lg:px-0 lg:py-6"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-px bg-gold transition-all duration-700"
                        style={{
                          width: isActive ? "100%" : "0%",
                          transitionTimingFunction: "var(--ease-luxe)",
                        }}
                      />
                      <span className="flex items-baseline justify-between gap-4">
                        <span
                          className={[
                            "display text-2xl transition-colors duration-500 md:text-3xl",
                            isActive ? "text-bone" : "text-mist-dim group-hover:text-mist",
                          ].join(" ")}
                        >
                          {location.region}
                        </span>
                        <span className="numeric hidden text-xs text-mist-dim lg:block">
                          {String(countIn(location.region)).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="mt-1.5 hidden text-xs tracking-wide text-mist-dim lg:block">
                        {location.note}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Stage */}
          <div className="min-w-0 lg:col-span-8">
            <div className="clip-reveal relative aspect-[16/10] overflow-hidden bg-ink-raised">
              {locations.map((location, i) => (
                <Image
                  key={location.region}
                  src={imageSrc(location.imageRef, location.imageIndex)}
                  alt={`${location.region} — Costa del Sol`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 60vw"
                  aria-hidden={i !== active}
                  className="object-cover"
                  style={{
                    opacity: i === active ? 1 : 0,
                    clipPath: i === active ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                    transform: i === active ? "scale(1)" : "scale(1.07)",
                    transition:
                      "opacity 900ms var(--ease-luxe), clip-path 900ms var(--ease-luxe), transform 1400ms var(--ease-luxe)",
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            </div>

            <div className="mt-8">
              <p
                key={`${current.region}-statement`}
                className="display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.1]"
              >
                <span className="mask">
                  <span className="loc-swap mask-line">{current.statement}</span>
                </span>
              </p>
              <p
                key={`${current.region}-copy`}
                className="loc-fade mt-5 max-w-[58ch] text-base leading-relaxed text-mist"
              >
                {current.copy}
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2">
                {current.areas.map((area) => (
                  <li
                    key={area}
                    className="border border-[var(--color-ink-hairline)] px-3.5 py-1.5 text-xs tracking-wide text-mist"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
