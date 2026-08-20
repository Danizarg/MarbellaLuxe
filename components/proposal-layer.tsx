"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { useIsProposal } from "./proposal";

/**
 * Proposal mode — reached only via `?proposal=true`.
 *
 * The site underneath stays exactly as a normal visitor would see it; this layer
 * adds a private commercial overlay on top of it. Kept deliberately quiet: a
 * hairline ribbon at the bottom of the viewport, and a full panel on request.
 */

const included = [
  "Cinematic property-led homepage",
  "Flagship residence, told in scroll",
  "Location explorer for all four markets",
  "Filterable property search",
  "Property detail experience with gallery",
  "Seller, investment and team sections",
  "Full responsive build, 375px upwards",
  "Deployed, with the source handed over",
];

export function ProposalLayer() {
  const isProposal = useIsProposal();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!isProposal) return null;

  return (
    <>
      {/* Ribbon */}
      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-[var(--rule)] bg-ink/85 backdrop-blur-xl">
        <div className="shell flex items-center justify-between gap-4 py-3.5">
          <p className="flex items-center gap-3 text-xs text-mist">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span className="hidden sm:inline">
              Private redesign proposal for {site.name} Marbella
            </span>
            <span className="sm:hidden">Redesign proposal</span>
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 border border-[var(--rule)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink"
          >
            View proposal
          </button>
        </div>
      </div>

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Redesign proposal"
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-[70] overflow-y-auto bg-ink transition-opacity duration-700",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        style={{ transitionTimingFunction: "var(--ease-luxe)" }}
      >
        <div className="shell py-16 md:py-24">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Confidential · For {site.name} Marbella</p>
              <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">
                The redesign,
                <br />
                and what it costs.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 border border-[var(--rule)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-mist transition-colors hover:border-gold hover:text-bone"
            >
              Close
            </button>
          </div>

          <p className="measure mt-8 text-base leading-relaxed text-mist">
            Everything behind this panel is a working site, not a mockup. It runs on your real
            listings, your real team, and your real contact details — the same portfolio a client
            would see, presented the way a €9.9M residence deserves to be presented.
          </p>

          <div className="mt-16 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] md:grid-cols-2">
            <div className="bg-ink p-10 md:p-14">
              <p className="text-xs uppercase tracking-[0.2em] text-mist-dim">
                Typical bespoke redesign
              </p>
              <p className="numeric display mt-6 text-[clamp(3rem,7vw,4.5rem)] text-mist-dim line-through decoration-1">
                €1,500+
              </p>
              <p className="mt-6 text-sm leading-relaxed text-mist-dim">
                What an agency of this standing would normally be quoted for a site built to this
                level of art direction and interaction detail.
              </p>
            </div>

            <div className="relative bg-ink-raised p-10 md:p-14">
              <span className="eyebrow">Your redesign</span>
              <p className="numeric display mt-6 text-[clamp(3.5rem,9vw,6rem)] text-gold">€300</p>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-bone">
                Summer offer · One-time fee
              </p>
              <p className="mt-6 text-sm leading-relaxed text-mist">
                One payment, no retainer, no licence. The code is handed over in full and the site
                is yours to host wherever you like.
              </p>
              <a
                href={`mailto:${site.email}?subject=CENTURY%2021%20Luxe%20website%20redesign`}
                className="mt-10 inline-block bg-gold px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold-lift"
              >
                Accept the offer
              </a>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="eyebrow">Included</h3>
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {included.map((item) => (
                <li
                  key={item}
                  className="border-t border-[var(--color-ink-hairline)] pt-4 text-sm leading-relaxed text-mist"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-16 text-xs leading-relaxed text-mist-dim">
            Property imagery is drawn from your own listing feed and is used here for presentation
            purposes only. Listings marked with a feed watermark were excluded — see the handover
            notes for the full asset manifest.
          </p>
        </div>
      </div>
    </>
  );
}
