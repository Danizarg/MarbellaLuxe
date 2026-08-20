"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { flagship, formatArea, formatPrice, imageSrc } from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * The flagship residence, told in scroll.
 *
 * A sticky full-viewport stage holds both the imagery and the narrative, and the
 * two cross-fade together as scroll advances the chapter. An earlier version let
 * the text scroll past a fixed stage, which reads well in motion but puts two
 * chapters on screen at once and drags the outgoing paragraph under the header -
 * cross-fading in place keeps exactly one chapter visible, always in the same
 * spot on the page.
 *
 * Progress is read from the container rect inside a rAF-throttled scroll
 * listener: no scroll library, no layout thrash.
 */

const chapters = [
  { image: 2, title: "Arrival", body: flagship.story[0] },
  { image: 9, title: "The living floor", body: flagship.story[1] },
  { image: 17, title: "Below and beyond", body: flagship.story[2] },
];

export function FlagshipStory() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.999);
      setActive(Math.min(Math.floor(progress * chapters.length), chapters.length - 1));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section aria-label={`Flagship residence: ${flagship.name}`} className="bg-ink">
      <div ref={wrap} style={{ height: `${chapters.length * 100}svh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Imagery */}
          {chapters.map((chapter, i) => (
            <div
              key={chapter.image}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-opacity duration-[1.4s]"
              style={{
                opacity: i === active ? 1 : 0,
                transitionTimingFunction: "var(--ease-luxe)",
              }}
            >
              <Image
                src={imageSrc(flagship.ref, chapter.image)}
                alt={`${flagship.name}: ${chapter.title}`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{
                  transform: `scale(${i === active ? 1.04 : 1.12})`,
                  transition: "transform 2.4s var(--ease-luxe)",
                }}
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/60 to-ink/15" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

          {/* Narrative — cross-faded in place, one chapter at a time */}
          <div className="shell relative flex h-full items-center">
            <div className="relative w-full max-w-[34rem]">
              {chapters.map((chapter, i) => (
                <div
                  key={chapter.title}
                  aria-hidden={i !== active}
                  className={[
                    "transition-all duration-[1.1s]",
                    i === active ? "" : "pointer-events-none absolute inset-0",
                  ].join(" ")}
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "none" : "translateY(1.25rem)",
                    transitionTimingFunction: "var(--ease-luxe)",
                  }}
                >
                  <p className="eyebrow">{chapter.title}</p>
                  <p className="display mt-6 text-[clamp(1.375rem,2.1vw,1.875rem)] leading-[1.3]">
                    {chapter.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter counter, seated at the foot of the stage */}
          <div className="shell absolute inset-x-0 bottom-8 flex items-center gap-4">
            <span className="eyebrow">Flagship residence</span>
            <span className="h-px w-16 bg-[var(--rule)]" />
            <span className="numeric text-xs text-mist-dim">
              {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Specification — the same residence, handed over as data */}
      <div className="relative overflow-hidden py-24 md:py-32">
        <Image
          src={imageSrc(flagship.ref, 21)}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/85" />

        <div className="shell relative">
          <p className="reveal eyebrow">{flagship.location}</p>
          <h2 className="reveal display mt-6 text-[clamp(2.5rem,6vw,5rem)]">{flagship.name}</h2>

          <dl className="reveal numeric mt-12 grid max-w-4xl grid-cols-2 gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] md:grid-cols-4">
            <Cell label="Guide price" value={formatPrice(flagship.price)} accent />
            <Cell label="Built" value={formatArea(flagship.built)} />
            <Cell label="Plot" value={formatArea(flagship.plot)} />
            <Cell label="Terrace" value={formatArea(flagship.terrace)} />
            <Cell label="Bedrooms" value={String(flagship.beds)} />
            <Cell label="Bathrooms" value={String(flagship.baths)} />
            <Cell label="Type" value={flagship.type} />
            <Cell label="Reference" value={flagship.ref} />
          </dl>

          <div className="reveal mt-12 flex flex-wrap gap-4">
            <PLink
              href={`/properties/${flagship.slug}`}
              className="bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
            >
              Full detail &amp; gallery
            </PLink>
            <PLink
              href="/contact"
              className="border border-[var(--rule)] px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              Arrange a private viewing
            </PLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-ink/85 p-5 md:p-6">
      <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">{label}</dt>
      <dd className={`mt-2 text-lg ${accent ? "text-gold" : "text-bone"}`}>{value}</dd>
    </div>
  );
}
