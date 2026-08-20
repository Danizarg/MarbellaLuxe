"use client";

import Image from "next/image";
import { useState } from "react";
import { countIn, locations } from "@/lib/locations";
import { imageSrc } from "@/lib/properties";
import { SectionHead } from "./section-head";

/**
 * The four markets, explored one at a time.
 *
 * Selecting a market cross-fades the stage and swaps the copy; the list itself
 * stays put so the eye never has to re-find it. On mobile the list becomes a
 * horizontal set of chips above the stage.
 */
export function LocationExplorer() {
  const [active, setActive] = useState(0);
  const current = locations[active];

  return (
    <section id="locations" className="border-t border-[var(--color-ink-hairline)] py-24 md:py-36">
      <div className="shell">
        <SectionHead
          eyebrow="Where we work"
          title="Five markets, twenty minutes apart."
          copy={[
            "The Costa del Sol is not one market, and treating it as one is the most expensive mistake a buyer makes here. A house moves by several million euros depending on which side of a ridge it sits on, how far it is from the water, and whether the plot behind it can ever be built on.",
            "These are the five markets we work in, what distinguishes each of them, and the sub-areas within them that actually determine price.",
          ]}
        />

        <div className="reveal mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Selector */}
          <div className="lg:col-span-4">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:block lg:gap-0 lg:overflow-visible lg:pb-0">
              {locations.map((location, i) => {
                const isActive = i === active;
                return (
                  <li key={location.region} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "true" : undefined}
                      className={[
                        "group w-full whitespace-nowrap border-t px-4 py-4 text-left transition-colors duration-500 lg:whitespace-normal lg:px-0 lg:py-6",
                        isActive
                          ? "border-gold"
                          : "border-[var(--color-ink-hairline)] hover:border-mist-dim",
                      ].join(" ")}
                    >
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
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink-raised">
              {locations.map((location, i) => (
                <Image
                  key={location.region}
                  src={imageSrc(location.imageRef, location.imageIndex)}
                  alt={`${location.region} — Costa del Sol`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 60vw"
                  aria-hidden={i !== active}
                  className="object-cover transition-opacity duration-1000"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transitionTimingFunction: "var(--ease-luxe)",
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>

            <div className="mt-8">
              {current.copy.map((paragraph, i) => (
                <p
                  key={i}
                  className={`max-w-[62ch] text-base leading-relaxed text-mist ${i ? "mt-5" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
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
