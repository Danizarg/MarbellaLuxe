"use client";

import { useEffect, useId, useRef, useState } from "react";

export type Option = { value: string; label: string };

/**
 * The search control, as a configurator rather than a form.
 *
 * A native `<select>` renders an operating-system menu — grey, 13px, and
 * completely outside the design. On the one interaction that converts a visitor
 * into an enquiry, that is the wrong place to give up. This is a listbox with an
 * animated panel, large hit areas and a travelling active state.
 *
 * Keyboard support is the part people skip: Enter/Space/↓ opens, ↑ ↓ move,
 * Home/End jump, Enter selects, Escape closes and returns focus, Tab closes.
 * Clicking outside closes.
 */
export function SelectField({
  label,
  value,
  options,
  onChange,
  align = "start",
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  const selected = options.findIndex((o) => o.value === value);
  const current = options[selected] ?? options[0];

  useEffect(() => {
    if (!open) return;
    setCursor(selected < 0 ? 0 : selected);

    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, selected]);

  const commit = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
    button.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        button.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setCursor(0);
        break;
      case "End":
        e.preventDefault();
        setCursor(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(cursor);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-baseline gap-3 text-left"
      >
        <span
          id={`${id}-label`}
          className="text-[0.65rem] uppercase tracking-[0.18em] text-mist-dim"
        >
          {label}
        </span>
        <span className="flex-1 text-sm text-bone transition-colors group-hover:text-gold">
          {current?.label}
        </span>
        <span
          aria-hidden
          className="text-[0.6rem] text-mist-dim transition-transform duration-500"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transitionTimingFunction: "var(--ease-luxe)",
          }}
        >
          ▾
        </span>
      </button>

      {/* Panel — height and opacity animate, so it opens rather than appears */}
      <div
        className={[
          "absolute z-50 mt-4 min-w-[15rem] overflow-hidden border border-[var(--color-ink-hairline)] bg-ink/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-500",
          align === "end" ? "right-0" : "left-0",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transitionTimingFunction: "var(--ease-luxe)",
        }}
      >
        <ul role="listbox" aria-labelledby={`${id}-label`} className="min-h-0 overflow-y-auto">
          {options.map((option, i) => {
            const isSelected = option.value === value;
            const isCursor = i === cursor;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  tabIndex={-1}
                  onPointerEnter={() => setCursor(i)}
                  onClick={() => commit(i)}
                  className={[
                    "relative flex w-full items-center justify-between gap-6 px-5 py-3.5 text-left text-sm transition-colors duration-300",
                    isSelected ? "text-gold" : isCursor ? "text-bone" : "text-mist",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px bg-gold transition-opacity duration-300"
                    style={{ opacity: isCursor || isSelected ? 1 : 0 }}
                  />
                  {option.label}
                  {isSelected ? <span aria-hidden className="text-[0.6rem]">●</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
