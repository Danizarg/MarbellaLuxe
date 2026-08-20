"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { flagship, formatArea, formatPrice, imageSrc } from "@/lib/properties";
import { locations } from "@/lib/locations";
import { mix, span, useReducedMotion, useScrollProgress } from "@/lib/use-scroll-progress";
import { PLink } from "./proposal";

/**
 * The intro and the hero are one pinned composition, driven by scroll.
 *
 * You land on the brand card; you scroll; it resolves into the hero. There is no
 * timer and no video — the sequence only advances because the visitor advances
 * it, which is what makes it read as an intro to *this site* rather than as a
 * splash screen bolted in front of it.
 *
 * The `Luxe` wordmark has exactly one lifecycle: it appears, it establishes the
 * brand, it lifts away, and only then does the header wordmark fade in. The two
 * are never on screen together — an earlier timed version overlapped them and
 * looked like a stacking bug.
 *
 * Under reduced motion the whole sequence collapses to the finished hero.
 */

/* Scroll windows, all in progress units (0 – 1) of the pinned section. */
const BRAND_OUT = [0.2, 0.4] as const;
const VEIL_LIFT = [0.14, 0.62] as const;
const HERO_IN = [0.46, 0.9] as const;

export function IntroHero() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const raw = useScrollProgress(wrap);
  const p = reduced ? 1 : raw;

  /* The header wordmark waits until ours has gone. */
  useEffect(() => {
    if (reduced) {
      document.documentElement.dataset.brand = "site";
      return;
    }
    /* Strictly after the brand card has reached zero, plus a beat. The two
       wordmarks must never be legible at the same time. */
    document.documentElement.dataset.brand = p > BRAND_OUT[1] + 0.04 ? "site" : "intro";
  }, [p, reduced]);

  useEffect(() => () => {
    document.documentElement.dataset.brand = "site";
  }, []);

  const brandOut = span(p, BRAND_OUT[0], BRAND_OUT[1]);
  const veil = mix(0.9, 0, span(p, VEIL_LIFT[0], VEIL_LIFT[1]));
  const hero = span(p, HERO_IN[0], HERO_IN[1]);

  /* Staggered windows inside the hero reveal, so the lines arrive in order. */
  const line = (i: number) => span(hero, i * 0.12, 0.42 + i * 0.12);

  return (
    <section
      ref={wrap}
      aria-label={`${flagship.name}, ${flagship.location}`}
      style={{ height: reduced ? "100svh" : "240svh" }}
      className="relative"
    >
      <div className="sticky top-0 h-[100svh] min-h-[36rem] w-full overflow-hidden">
        {/* The property is present from the first frame — the veil is what lifts */}
        <div
          className="absolute inset-0"
          style={{ transform: `scale(${mix(1.24, 1.04, span(p, 0, 0.72))})` }}
        >
          <Image
            src={imageSrc(flagship.ref, flagship.hero)}
            alt={`${flagship.name} — ${flagship.location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Intro veil */}
        <div
          className="absolute inset-0 bg-ink"
          style={{ opacity: veil }}
          aria-hidden
        />

        {/* Hero scrims, faded in as the veil goes */}
        <div className="absolute inset-0" style={{ opacity: hero }} aria-hidden>
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink via-ink/85 to-transparent" />
        </div>

        {/* ---------------------------------------------------------- brand card */}
        {!reduced ? (
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{
              opacity: 1 - brandOut,
              transform: `translateY(${mix(0, -3.5, brandOut)}rem) scale(${mix(1, 0.93, brandOut)})`,
            }}
            aria-hidden={p > BRAND_OUT[1]}
          >
            <span className="brand-rule block h-px w-32 bg-gold" />
            <p className="brand-track mt-8 text-[0.7rem] font-medium uppercase text-bone sm:text-xs">
              Century 21
            </p>
            <p
              className="rise display mt-3 text-[clamp(3.5rem,12vw,8rem)] leading-none text-gold"
              style={{ ["--rise-delay" as string]: "700ms" }}
            >
              Luxe
            </p>
            <p
              className="rise mt-9 max-w-md text-[0.65rem] uppercase tracking-[0.26em] text-mist"
              style={{ ["--rise-delay" as string]: "1000ms" }}
            >
              {locations.map((l) => l.region).join(" · ")}
            </p>
          </div>
        ) : null}

        {/* --------------------------------------------------------- hero content */}
        <div
          className="shell relative flex h-full flex-col justify-end pb-16 md:pb-24"
          style={{ opacity: hero > 0 ? 1 : 0 }}
        >
          <p
            className="eyebrow"
            style={{ opacity: line(0), transform: `translateY(${mix(12, 0, line(0))}px)` }}
          >
            {flagship.location}
          </p>

          {/* Two wide lines rather than three narrow ones — a horizontal
              composition sits better against the architecture behind it. */}
          <h1 className="display mt-6 max-w-[38rem] text-[clamp(2.5rem,6.2vw,5.75rem)] md:max-w-none">
            {["Some houses are not listed.", "They are presented."].map((text, i) => (
              <span key={text} className="mask">
                <span
                  className="mask-line"
                  style={{
                    animation: "none",
                    opacity: line(i + 1),
                    transform: `translateY(${mix(105, 0, line(i + 1))}%)`,
                  }}
                >
                  {text}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6 md:mt-14"
            style={{ opacity: line(3), transform: `translateY(${mix(14, 0, line(3))}px)` }}
          >
            <Spec label="Guide price" value={formatPrice(flagship.price)} lead />
            <Spec label="Built" value={formatArea(flagship.built)} />
            <Spec label="Plot" value={formatArea(flagship.plot)} />
            <Spec label="Bedrooms" value={String(flagship.beds)} />
            <Spec label="Reference" value={flagship.ref} />
          </div>

          <div
            className="mt-12 flex flex-wrap items-center gap-4"
            style={{
              opacity: line(4),
              transform: `translateY(${mix(14, 0, line(4))}px)`,
              pointerEvents: line(4) > 0.9 ? "auto" : "none",
            }}
          >
            <PLink
              href={`/properties/${flagship.slug}`}
              className="bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
            >
              View the residence
            </PLink>
            <PLink
              href="/properties"
              className="border border-[var(--rule)] px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              The full portfolio
            </PLink>
          </div>
        </div>

        {/* Scroll cue — present while the intro is still asking to be advanced */}
        {!reduced ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-7 flex flex-col items-center gap-3"
            style={{ opacity: 1 - span(p, 0.08, 0.3) }}
            aria-hidden
          >
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-mist-dim">Scroll</span>
            <span className="block h-10 w-px overflow-hidden bg-[var(--color-ink-hairline)]">
              <span className="cue-run block h-full w-full bg-gold" />
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Spec({ label, value, lead }: { label: string; value: string; lead?: boolean }) {
  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">{label}</p>
      <p
        className={
          lead
            ? "numeric display mt-2 text-3xl text-gold md:text-4xl"
            : "numeric mt-2 text-lg text-bone"
        }
      >
        {value}
      </p>
    </div>
  );
}
