"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { PLink } from "./proposal";

/**
 * Transparent while the hero is on screen, then a blurred hairline bar.
 * Height contracts on scroll - the same trick Apple uses to hand vertical space
 * back to the product once you have committed to reading.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled || open
          ? "border-b border-[var(--color-ink-hairline)] bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent",
      ].join(" ")}
      style={{ transitionTimingFunction: "var(--ease-luxe)" }}
    >
      <div
        className={[
          "shell flex items-center justify-between transition-[height] duration-500",
          scrolled ? "h-16" : "h-20 md:h-24",
        ].join(" ")}
        style={{ transitionTimingFunction: "var(--ease-luxe)" }}
      >
        <PLink href="/" className="group flex items-baseline gap-2.5" aria-label={`${site.name} home`}>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-bone">
            Century 21
          </span>
          <span className="display text-lg leading-none text-gold">Luxe</span>
        </PLink>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <PLink
              key={item.href}
              href={item.href}
              className="group relative text-[0.8125rem] tracking-wide text-mist transition-colors duration-300 hover:text-bone"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-[width] duration-500 group-hover:w-full" />
            </PLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden text-[0.8125rem] tracking-wide text-mist transition-colors hover:text-bone md:block"
          >
            {site.phone}
          </a>
          <PLink
            href="/contact"
            className="hidden border border-[var(--rule)] px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink sm:block"
          >
            Arrange a viewing
          </PLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={[
                  "absolute left-0 block h-px w-full bg-bone transition-transform duration-500",
                  open ? "top-1.5 rotate-45" : "top-0",
                ].join(" ")}
                style={{ transitionTimingFunction: "var(--ease-luxe)" }}
              />
              <span
                className={[
                  "absolute left-0 block h-px w-full bg-bone transition-transform duration-500",
                  open ? "top-1.5 -rotate-45" : "top-3",
                ].join(" ")}
                style={{ transitionTimingFunction: "var(--ease-luxe)" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={[
          "grid overflow-hidden bg-ink transition-[grid-template-rows] duration-700 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
        style={{ transitionTimingFunction: "var(--ease-luxe)" }}
      >
        <div className="min-h-0">
          <nav className="shell flex flex-col gap-1 pb-10 pt-4" aria-label="Mobile">
            {nav.map((item, i) => (
              <PLink
                key={item.href}
                href={item.href}
                className="display border-b border-[var(--color-ink-hairline)] py-4 text-[2rem] text-bone transition-opacity"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </PLink>
            ))}
            <a
              href={`tel:${site.phoneHref}`}
              className="numeric mt-6 text-sm tracking-wide text-gold"
            >
              {site.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
