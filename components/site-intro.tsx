"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { imageSrc } from "@/lib/properties";
import { locations } from "@/lib/locations";

/**
 * The intro sequence.
 *
 * One cinematic opener, in front of the site rather than woven through it: three
 * plates cross-fade behind the wordmark, the markets cycle once, and the whole
 * panel lifts to reveal the hero already settled underneath.
 *
 * It plays once per session and never for a visitor who has asked for reduced
 * motion. Timings live in globals.css so the sequence can be re-tuned without
 * touching this file; the total runtime is 4.6s, and the skip control is
 * available from the first frame.
 */

const PLATES = [
  { ref: "R5374861", index: 1 },
  { ref: "R5439580", index: 2 },
  { ref: "R5463289", index: 3 },
];

/** Must match the intro-lift delay + duration in globals.css. */
const RUNTIME_MS = 4600;
const STORAGE_KEY = "mlx-intro-seen";

export function SiteIntro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    // Returning visitors and reduced-motion users skip it outright. The head
    // script has usually already set this, but re-checking keeps the component
    // correct if it is ever mounted on a client-side navigation.
    if (
      sessionStorage.getItem(STORAGE_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      root.dataset.intro = "seen";
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(finish, RUNTIME_MS);

    function finish() {
      window.clearTimeout(timer);
      sessionStorage.setItem(STORAGE_KEY, "1");
      root.dataset.intro = "seen";
      document.body.style.overflow = "";
      setDone(true);
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const skip = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    document.documentElement.dataset.intro = "seen";
    document.body.style.overflow = "";
    setDone(true);
  };

  if (done) return null;

  return (
    <div className="site-intro" aria-label="Introduction" role="presentation">
      {/* Plates */}
      {PLATES.map((plate, i) => (
        <div
          key={plate.ref}
          className="intro-plate"
          style={{ animationDelay: `${i * 1.1}s` }}
          aria-hidden
        >
          <Image
            src={imageSrc(plate.ref, plate.index)}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-ink/65" aria-hidden />

      {/* Wordmark */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="intro-rule block h-px w-32 bg-gold" aria-hidden />

        <p className="intro-track mt-8 text-[0.7rem] font-medium uppercase text-bone sm:text-xs">
          Century 21
        </p>

        <p
          className="intro-fade display mt-3 text-[clamp(3.5rem,12vw,8rem)] leading-none text-gold"
          style={{ ["--intro-delay" as string]: "900ms" }}
        >
          Luxe
        </p>

        {/* Markets cycle through a single slot */}
        <div className="relative mt-10 h-6 w-full max-w-md" aria-hidden>
          {locations.slice(0, 4).map((location, i) => (
            <span
              key={location.region}
              className="intro-market flex items-center justify-center text-[0.7rem] uppercase tracking-[0.28em] text-mist"
              style={{ ["--intro-delay" as string]: `${1700 + i * 480}ms` }}
            >
              {location.region}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 right-[var(--shell)] z-10 text-[0.65rem] uppercase tracking-[0.2em] text-mist transition-colors hover:text-bone"
      >
        Skip
      </button>
    </div>
  );
}

/**
 * Runs before first paint so a returning visitor never sees a frame of the
 * intro. Kept as a string because it must be inlined into the document.
 */
export const introHeadScript = `try{if(sessionStorage.getItem('${STORAGE_KEY}')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='seen'}}catch(e){}`;
