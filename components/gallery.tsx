"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { imageSrc, type Property } from "@/lib/properties";

/**
 * Editorial grid, then a full-bleed lightbox.
 *
 * The grid deliberately breaks rhythm - every third image runs full width - so a
 * gallery of eight stills does not read as a contact sheet. Arrow keys and Escape
 * work in the lightbox because anyone reviewing a €9.9M house will use them.
 */
export function Gallery({ property }: { property: Property }) {
  const images = property.gallery;
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((current) =>
        current === null ? current : (current + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <section className="shell py-20 md:py-28">
      <div className="reveal flex items-end justify-between gap-6">
        <h2 className="eyebrow">Gallery</h2>
        <p className="numeric text-xs text-mist-dim">
          {String(images.length).padStart(2, "0")} images
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5">
        {images.map((n, i) => {
          const wide = i % 3 === 2;
          return (
            <button
              key={n}
              type="button"
              onClick={() => setOpen(i)}
              className={[
                "reveal group relative overflow-hidden bg-ink-raised",
                wide ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]",
              ].join(" ")}
              aria-label={`Open image ${i + 1} of ${images.length}`}
            >
              <Image
                src={imageSrc(property.ref, n)}
                alt={`${property.name}, image ${i + 1}`}
                fill
                sizes={wide ? "(max-width: 768px) 96vw, 90vw" : "(max-width: 768px) 48vw, 45vw"}
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                style={{ transitionTimingFunction: "var(--ease-luxe)" }}
              />
            </button>
          );
        })}
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${property.name} gallery`}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/97 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-[var(--shell)] py-5">
            <p className="numeric text-xs tracking-[0.15em] text-mist">
              {String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              <span className="ml-4 text-mist-dim">{property.name}</span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="border border-[var(--rule)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-mist transition-colors hover:border-gold hover:text-bone"
            >
              Close
            </button>
          </div>

          <div className="relative flex-1">
            <Image
              key={images[open]}
              src={imageSrc(property.ref, images[open])}
              alt={`${property.name}, image ${open + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-3 py-6">
            <NavButton onClick={() => step(-1)} label="Previous image" glyph="←" />
            <NavButton onClick={() => step(1)} label="Next image" glyph="→" />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function NavButton({
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
      className="grid h-12 w-12 place-items-center border border-[var(--color-ink-hairline)] text-mist transition-colors duration-500 hover:border-gold hover:text-gold"
    >
      {glyph}
    </button>
  );
}
