"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "24 residences" rather than "24 of 24 match".
 *
 * The count reads as a statement about the portfolio when nothing is filtered,
 * and as a result when something is. When it changes, the number crossfades in
 * place — a real transition between two true values, not a counting animation
 * ticking through numbers that were never the answer.
 */
export function ResultCount({
  count,
  total,
  className = "",
}: {
  count: number;
  total: number;
  className?: string;
}) {
  const [shown, setShown] = useState(count);
  const [swapping, setSwapping] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setShown(count);
      return;
    }
    if (count === shown) return;

    setSwapping(true);
    const timer = window.setTimeout(() => {
      setShown(count);
      setSwapping(false);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [count, shown]);

  const filtered = count !== total;

  return (
    <p className={`text-sm text-mist ${className}`} role="status" aria-live="polite">
      <span className="sr-only">
        {count} of {total} properties match
      </span>
      <span
        aria-hidden
        className="numeric inline-block text-gold transition-all duration-200"
        style={{
          opacity: swapping ? 0 : 1,
          transform: swapping ? "translateY(-0.35rem)" : "none",
          transitionTimingFunction: "var(--ease-luxe)",
        }}
      >
        {shown}
      </span>{" "}
      <span aria-hidden>
        {shown === 1 ? "residence" : "residences"}
        {filtered ? <span className="text-mist-dim"> of {total}</span> : null}
      </span>
    </p>
  );
}
