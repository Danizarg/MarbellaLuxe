"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Scroll progress through a pinned section, 0 → 1.
 *
 * Returns 0 while the section's top edge is still below the viewport top, and 1
 * once its bottom edge has reached the viewport bottom. Everything in between is
 * linear, which is what makes a pinned sequence feel like it is being *driven*
 * rather than played.
 *
 * One rAF-throttled passive listener per section. No scroll library, no layout
 * thrash - the only read is a single getBoundingClientRect per frame.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      setProgress(Math.min(Math.max(-rect.top / travel, 0), 1));
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

/** True once the visitor has asked for reduced motion. Pinned sequences collapse. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Normalises `value` across the window [from, to] and clamps to 0 – 1. */
export function span(value: number, from: number, to: number) {
  if (to === from) return value >= to ? 1 : 0;
  return Math.min(Math.max((value - from) / (to - from), 0), 1);
}

/** Linear interpolation, for driving transforms from progress. */
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
