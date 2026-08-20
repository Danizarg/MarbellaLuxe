"use client";

import { useRef } from "react";
import { properties } from "@/lib/properties";
import { PropertyCard } from "./property-card";
import { SectionHead } from "./section-head";

/**
 * A scroll-snapped rail rather than a grid.
 *
 * A grid asks you to compare seven houses at once; a rail asks you to look at
 * one and then decide to see the next. On desktop the arrows step by exactly one
 * card so the rhythm never breaks.
 */
export function Curated() {
  const rail = useRef<HTMLDivElement>(null);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const by = card ? card.offsetWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: by * dir, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="py-24 md:py-36">
      <div className="shell">
        <SectionHead
          eyebrow="The portfolio"
          title="Seven residences, currently."
          copy="A deliberately small list. Every property here is one we would show in person, across Marbella, Benahavís, Estepona and Sotogrande."
          action={
            <div className="hidden gap-2 md:flex">
              <RailButton onClick={() => step(-1)} label="Previous" glyph="←" />
              <RailButton onClick={() => step(1)} label="Next" glyph="→" />
            </div>
          }
        />
      </div>

      <div
        ref={rail}
        className="rail mt-16 flex gap-8 overflow-x-auto px-[var(--shell)] pb-4"
      >
        {properties.map((property, i) => (
          <div
            key={property.ref}
            data-card
            className="reveal w-[86vw] shrink-0 sm:w-[58vw] lg:w-[30rem]"
          >
            <PropertyCard property={property} priority={i < 2} />
          </div>
        ))}
        <div className="w-px shrink-0" aria-hidden />
      </div>
    </section>
  );
}

function RailButton({
  onClick,
  label,
  glyph,
}: {
  onClick: () => void;
  label: string;
  glyph: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center border border-[var(--color-ink-hairline)] text-mist transition-colors duration-500 hover:border-gold hover:text-gold"
    >
      {glyph}
    </button>
  );
}
