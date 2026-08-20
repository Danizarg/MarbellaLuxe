# MarbellaLuxe

A complete redesign of the **CENTURY 21 Luxe Marbella** website — a luxury
real-estate agency operating across Marbella, Benahavís, Estepona and Sotogrande
on the Costa del Sol.

The governing idea is that **the property is the product**. The animation budget
is spent on a single cinematic intro; after that the site is calm — properties are
presented in a conventional grid, with large photography, full-length descriptions
and specification laid out as data rather than as marketing copy.

It covers the agency's whole business: villas, apartments, penthouses, new
developments, plots, commercial premises, hotels and long-term rentals, alongside
valuation, renovations, architectural design, buying agency and development
advisory. Built on their **real listings, real team and real contact details** —
this is a working site, not a mockup.

---

## Technology

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript 5.9 (strict) |
| Styling | Tailwind CSS v4 — design tokens declared as `@theme` in `app/globals.css` |
| Type | Instrument Serif (display) + Inter (UI), via `next/font` |
| Images | Local WebP under `public/properties`, served through `next/image` |
| Tooling | `sharp` for the asset pipeline; `playwright-core` (on demand) for visual audits |

No animation library, no UI kit, no CSS-in-JS. Motion is CSS and a single
`rAF`-throttled scroll listener.

---

## Installation

```bash
git clone https://github.com/Danizarg/MarbellaLuxe
cd MarbellaLuxe
npm install
```

Property imagery is committed to the repository, so there is no asset step on a
fresh clone.

## Development

```bash
npm run dev
```

Serves on <http://localhost:3210>.

## Production build

```bash
npm run build
npm start
```

The build must pass before any commit. 15 routes are generated; everything is
statically prerendered except `/contact`, which reads a query parameter.

---

## Project structure

```
app/                 routes and the design system (globals.css)
  properties/        search page + [slug] detail experience (24 listings)
  rentals/           long-term rental schedule
  services/          service index + [slug] pages (5 services)
  about/ careers/ sell/ investment/ team/ contact/
components/          every section of the site, one file each
lib/                 site · properties · rentals · services · team · locations
scripts/             asset pipeline, contact sheets, visual audit
public/properties/   listing imagery, <REF>/NN.webp
```

`lib/` holds all content. **Business facts and property figures are transcribed
from the client's own site and must not be invented** — every value is recorded
with its source in `CLAUDE_CONTEXT.md`.

---

## The intro

The homepage opens with a 4.6-second cinematic sequence — property plates
cross-fading behind the wordmark, the markets cycling, then the panel lifting to
reveal the hero already settled underneath.

It plays **once per session**, on the homepage only, is skippable from the first
frame (click Skip, or press Escape / Enter / Space), and never plays for a visitor
who has asked for reduced motion. Deep links to a property or a service page never
sit behind it.

To watch it again, open a private window or clear the `mlx-intro-seen` key from
sessionStorage.

Timings live in `app/globals.css`; the total runtime is mirrored in `RUNTIME_MS`
in `components/site-intro.tsx` — **change both together**.

Everything after the intro is deliberately quiet: a conventional property grid, an
editorial spread for the featured residence, and gentle scroll reveals. No
scroll-jacking.

## Normal preview mode

```
http://localhost:3210/
```

The redesigned CENTURY 21 Luxe website exactly as a client or buyer would see
it. No trace of the proposal.

## Proposal mode

```
http://localhost:3210/?proposal=true
```

The same website plus a private commercial overlay: a hairline ribbon at the foot
of the viewport, and a full panel presenting the redesign and its price.
Proposal mode carries across internal navigation, so the whole site can be
browsed from a single link.

Works on any route — `/properties?proposal=true`, `/team?proposal=true`, and so
on.

---

## Commands

```bash
npm run dev                          # dev server on :3210
npm run build                        # production build
npm start                            # serve the production build
npm run assets                       # re-download listing imagery from the manifest
npm run contact-sheet -- R5374861    # review one property's frames as a grid
npm run audit                        # screenshot every section, desktop + mobile
```

`npm run audit` drives the Chrome already on the machine and needs a one-off
`npm install --no-save playwright-core`. Screenshots land in `./audit`
(gitignored). Use it after any layout change — the build compiling is not the
same as the layout being right.

---

## Context system

This repository is designed to be recoverable without the conversation that
produced it.

| File | Purpose |
|---|---|
| [`MASTER_PROMPT.md`](./MASTER_PROMPT.md) | The permanent specification. Requirements, art direction, data and QA rules. Never replace with progress notes. |
| [`CLAUDE_CONTEXT.md`](./CLAUDE_CONTEXT.md) | Persistent development memory: verified business information, every property and image used with its source, design decisions and why, known issues, and the ranked next tasks. Updated every session. |
| `scripts/asset-manifest.json` | Image provenance — CDN key, UUID and frame count per listing. |

A new session should be able to start from:

> Read MASTER_PROMPT.md and CLAUDE_CONTEXT.md, inspect the repository and continue.

---

## Deployment

Handled by the project owner, on **Vercel**. Nothing special is required: the
Next.js preset works as-is, there are no environment variables and no secrets,
and the imagery ships in the repository so nothing extra runs at build time.

Record the production URL here and in `CLAUDE_CONTEXT.md` once it is live.

---

## A note on the imagery

Property photographs are the agency's own, drawn from their Resales-Online
listing feed, and are downloaded into this repository rather than hotlinked.

Two constraints shaped which frames are used, and neither is about rights:

- **Watermarks.** Some feed images carry a burned-in CDN watermark. Those
  listings were excluded rather than cropped around — a watermark is not
  survivable at full-bleed luxury scale.
- **Resolution.** The feed serves nothing wider than 1200px; every larger size
  key returns a placeholder. That is the quality ceiling on the desktop heroes,
  and master files from the agency are the fix.

Full provenance for every image is in `CLAUDE_CONTEXT.md` → *Asset Manifest*.
