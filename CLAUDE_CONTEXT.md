# CLAUDE_CONTEXT.md

## Instructions for Future Claude Sessions

Before making any changes:

1. Read `/MASTER_PROMPT.md` completely.
2. Read `/CLAUDE_CONTEXT.md` completely.
3. Read `/README.md`.
4. Run `git status`.
5. Run `git log --oneline -10`.
6. Inspect the repository.
7. Compare this context against the actual implementation.
8. Run the website locally.
9. Continue from **Next Recommended Tasks**.
10. Do not rebuild completed functionality without a clear reason.
11. Preserve successful design decisions.
12. Update this file before ending the session.

---

## Project Goal

A complete, original redesign of the CENTURY 21 Luxe Marbella website — a luxury
real-estate agency covering Marbella, Benahavís, Estepona and Sotogrande. The
governing idea is that **the property is the product**, presented with the
discipline Apple gives a flagship device. Full specification in
`MASTER_PROMPT.md`.

---

## Business Research

Conducted 2026-08-20 against the live site at <https://marbellaluxe.es>.

The live site is a WordPress build on a CENTURY 21 multisite
(`/wp-content/uploads/sites/7/`), with listings fed from **Resales-Online**
(`cdn.resales-online.com`). Findings that shaped the redesign:

- **The team page still carries Lorem ipsum.** Three placeholder cards
  ("RESPONSIVE DESIGN", "SUPER FEATURES", "DRAG AND DROP" with
  *Lorem ipsum dolor sit amet…*) render above the real team content.
- **Copy errors in the live team list**: "Brocker" for Broker, "Frensh" for
  French, "Philippe .century21.es" with a stray space.
- **The homepage says "your local real estate agent in Belgium"** on a
  Costa del Sol site — leftover from another office's template.
- The listing feed is large (104 pages of villas alone) but the presentation is
  a generic portal grid. The redesign deliberately curates instead.
- Some feed images carry a **burned-in CDN watermark** (see Asset Manifest).
- The CDN exposes **`w1200` as its largest real derivative**. Every larger size
  key (`w1600`, `w1920`, `original`, `full`) returns a ~2.5KB placeholder.

## Verified Business Information

Transcribed from the live site. Codified in `lib/site.ts` and `lib/team.ts`.
**Do not invent or "improve" these values.**

| Field | Value |
|---|---|
| Name | CENTURY 21 Luxe (Marbella) |
| Office | Centro Comercial Diana Park, local 21, 29680 El Paraíso (Estepona, Málaga) |
| Phone | +34 667 273 377 |
| Email | luxe@century21.es |
| Official site | <http://luxe.century21.es> |
| Markets | Marbella, Benahavís, Estepona, Sotogrande |
| Experience | "More than 20 years on the Costa" |
| Languages | English, Spanish, Dutch, French, Russian, Ukrainian, Arabic, Swedish, Finnish |

**Team** (source: <https://marbellaluxe.es/the-team/>)

| Name | Role | Languages |
|---|---|---|
| Levi Boterdael | General Director · Broker | — |
| Olha Krasnova | CEO · Broker | — |
| Natalia Khalezina | Sales Consultant | English, Russian, Spanish |
| Souad Ouldam | Sales Consultant | English, French, Spanish |
| Jana Ille | Sales Consultant | English, Russian, Spanish |
| Philippe Van Heymbeeck | Sales Consultant | English, Dutch |
| Gabriel Pays | Sales Consultant | French |
| Sam Long | Sales Consultant | English |
| Gregory Maroquin | Sales Consultant | English, Spanish, French |
| Simon De Cock | Sales Consultant | English, Dutch, French |

Typos in the source ("Brocker", "Frensh", "Simon DeCock") are corrected in
`lib/team.ts`. No portraits are published on the live site.

---

## Current Stack

- **Next.js 16.3.1** (App Router, Turbopack) — initially scaffolded on 15.5.4,
  upgraded immediately because that version carries CVE-2025-66478.
- **React 19.1.1**
- **TypeScript 5.9** (strict)
- **Tailwind CSS v4.1.13** via `@tailwindcss/postcss`, with the design system
  declared as `@theme` tokens in `app/globals.css`
- **next/font** — Instrument Serif (display) + Inter (UI)
- **sharp** (devDependency) — asset pipeline and contact sheets only
- **playwright-core** — *not* a dependency; installed on demand with
  `npm install --no-save playwright-core` for `npm run audit`

No animation library. No UI kit. No CSS-in-JS.

---

## Repository Structure

```
app/
  globals.css              design system: tokens, primitives, motion
  layout.tsx               fonts, metadata, header/footer, proposal layer
  page.tsx                 homepage section order
  not-found.tsx
  properties/page.tsx      search page shell
  properties/[slug]/       property detail experience (SSG)
  contact/ sell/ investment/ team/
components/
  site-header.tsx          contracting, blur-on-scroll header + mobile sheet
  site-footer.tsx
  hero.tsx                 cinematic hero
  curated.tsx              scroll-snapped portfolio rail
  property-card.tsx        shared card (rail + grid)
  flagship-story.tsx       sticky cross-fading scroll narrative
  location-explorer.tsx    four markets
  feature-explorer.tsx     Architecture/Interiors/Views/Location/Lifestyle
  search-teaser.tsx        homepage 3-control search
  property-search.tsx      full filter + sort + results
  gallery.tsx              editorial grid + keyboard lightbox
  seller.tsx investment.tsx team-preview.tsx contact-section.tsx
  section-head.tsx         shared section opening
  proposal.tsx             useIsProposal + PLink
  proposal-layer.tsx       ribbon + €300 offer panel
lib/
  site.ts                  verified business information
  properties.ts            the portfolio dataset + formatters
  team.ts                  the team
  locations.ts             markets + feature facets
scripts/
  asset-manifest.json      image provenance
  fetch-assets.mjs         downloads + converts imagery  (npm run assets)
  contact-sheet.mjs        review a property's frames    (npm run contact-sheet)
  visual-audit.mjs         screenshot every section      (npm run audit)
public/properties/<REF>/NN.webp
```

---

## Current Implementation Status

### Complete

- Repository, context system, README
- Design system (tokens, type scale, motion, primitives)
- Asset pipeline: 7 properties, 108 images, downloaded and converted to WebP
- Homepage: all ten sections
- Property search page with live filtering and sorting
- Property detail experience (7 static routes) with gallery + lightbox
- Team, Sell, Investment, Contact pages
- 404 page
- Proposal mode (`?proposal=true`) with the €300 offer panel
- Responsive from 375px; reduced-motion support
- Autonomous visual audit tooling
- `npm run build` passing, all pages statically prerendered except `/contact`

### In Progress

- Nothing. The session ended at a clean, committed, building state.

### Not Started

- Live Resales-Online API integration (the dataset is a curated static snapshot)
- Form backend (the enquiry form composes a `mailto:` — see Known Issues)
- Multilingual routing (the agency works in nine languages; the site is English)
- Team portraits (none published by the client)
- Analytics, sitemap, `robots.txt`, structured data (`RealEstateListing` JSON-LD)

---

## Section Status

| Section | Status | Component |
|---|---|---|
| Navigation | Complete | `components/site-header.tsx` |
| Hero | Complete | `components/hero.tsx` |
| Curated Properties | Complete | `components/curated.tsx` |
| Flagship Property Experience | Complete | `components/flagship-story.tsx` |
| Location Explorer | Complete | `components/location-explorer.tsx` |
| Property Feature Explorer | Complete | `components/feature-explorer.tsx` |
| Property Search | Complete | `components/property-search.tsx` + `search-teaser.tsx` |
| Property Detail Page | Complete | `app/properties/[slug]/page.tsx` + `gallery.tsx` |
| Seller Section | Complete | `components/seller.tsx`, `/sell` |
| Team | Complete | `components/team-preview.tsx`, `/team` |
| Investment Section | Complete | `components/investment.tsx`, `/investment` |
| Contact | Complete | `components/contact-section.tsx`, `/contact` |
| Proposal Mode | Complete | `components/proposal-layer.tsx`, `proposal.tsx` |
| Footer | Complete | `components/site-footer.tsx` |

---

## Property Data Used

Every figure read from the client's own listing pages on 2026-08-20 and codified
in `lib/properties.ts`. **Never rely on memory for these.**

| Ref | Location | Region | Price | Bd | Ba | Built | Plot | Terrace | Used in |
|---|---|---|---|---|---|---|---|---|---|
| R5374861 | Guadalmina Baja, Marbella | Marbella | €9,900,000 | 8 | 10 | 1,303 m² | 3,112 m² | 165 m² | **Flagship** — site hero, scroll story, Architecture + Interiors facets, portfolio, detail page |
| R5439580 | El Madroñal, Benahavís | Benahavís | €6,450,000 | 4 | 5 | 526 m² | 9,632 m² | — | Benahavís market card, Views facet, portfolio, detail page |
| R5463289 | Elviria, Marbella East | Marbella | €4,200,000 | 7 | 8 | 783 m² | 6,127 m² | 230 m² | Marbella market card, Lifestyle facet, seller section image, portfolio, detail page |
| R5460766 | La Quinta, Benahavís | Benahavís | €3,650,000 | 4 | 4 | 578 m² | 5,287 m² | 181 m² | Portfolio, detail page |
| R5464381 | Sotogrande Alto, San Roque | Sotogrande | €3,350,000 | 5 | 8 | 1,051 m² | 1,786 m² | 466 m² | Sotogrande market card, `/sell` hero, portfolio, detail page |
| R5464375 | Parcelas del Golf, Nueva Andalucía | Marbella | €3,350,000 | 5 | 4 | 350 m² | 500 m² | — | Location facet, portfolio, detail page |
| R5448211 | Atalaya, Estepona | Estepona | €2,300,000 | 5 | 5 | 498 m² | 1,000 m² | 100 m² | Estepona market card, portfolio, detail page |

Source URLs (all `https://marbellaluxe.es/en/property/…`):

- `R5374861_detached-villa-guadalmina-baja/`
- `R5439580_detached-villa-el-madronal/`
- `R5463289_detached-villa-elviria/`
- `R5460766_detached-villa-la-quinta/`
- `R5464381_detached-villa-sotogrande-alto/`
- `R5464375_detached-villa-nueva-andalucia/`
- `R5448211_detached-villa-atalaya/`

Each detail page also links back to its source listing under the spec panel.

### Excluded listings

| Ref | Location | Price | Reason |
|---|---|---|---|
| R5459710 | El Presidente, Estepona | €2,650,000 | Feed images carry a burned-in `wuap72y7is` watermark |
| R4661893 | The Golden Mile, Marbella | €1,595,000 | Feed images carry a burned-in `or91yu86l1` watermark |
| R5448664 | Estepona | €849,000 | Downloaded, then dropped — R5448211 is the stronger Estepona representative |

R5448211 (Atalaya) was sourced specifically to give Estepona clean coverage after
El Presidente was rejected. If the client supplies unwatermarked masters for the
two rejected listings, add them back via `scripts/asset-manifest.json`.

---

## Asset Manifest

**Provenance.** All property imagery originates from the client's own
Resales-Online listing feed (`cdn.resales-online.com`), i.e. the same images the
agency already publishes on marbellaluxe.es. It is used here for presentation
purposes in a redesign of the agency's own site. The project owner has confirmed
this is being built **for** CENTURY 21 Luxe and that using the agency's own
listing photography to present it back to them is expected and welcome — see
*Owner Decisions*. Treat the frames as **concept imagery pending master files**:
the open question is resolution, not rights.

**Pipeline.** `scripts/asset-manifest.json` holds the CDN key, property UUID,
version stamp and frame count per listing. `npm run assets` downloads each frame,
converts it to WebP (quality 82) and writes it to
`public/properties/<REF>/NN.webp`. Existing files are skipped, so the script is
safe to re-run. **Nothing is hotlinked at runtime.**

| Ref | Frames | Intrinsic | On disk | Notable frames |
|---|---|---|---|---|
| R5374861 | 24 | 1200 × ~800 | `public/properties/R5374861/01–24.webp` | 01 pool + facade (site hero) · 02–03 facade (Architecture) · 08–16 interiors · 17–20 covered terrace · 21 lawn · 23 stair |
| R5439580 | 14 | 1200 × ~800 | `…/R5439580/01–14.webp` | 02 rooftops + sea (Benahavís card) · 13 cork oak over the coast (Views facet) |
| R5463289 | 14 | 1200 × ~800 | `…/R5463289/01–14.webp` | 03 palms + sea (Marbella card) · 04 pool + lawn (Lifestyle facet) |
| R5460766 | 14 | 1200 × ~800 | `…/R5460766/01–14.webp` | 01 aerial garden |
| R5464381 | 14 | 1200 × ~800 | `…/R5464381/01–14.webp` | 01 aerial (Sotogrande card, `/sell` hero) |
| R5464375 | 14 | 1200 × ~800 | `…/R5464375/01–14.webp` | 02 aerial over the Golf Valley (Location facet) |
| R5448211 | 14 | 1200 × ~800 | `…/R5448211/01–14.webp` | 01 facade · 02 aerial (Estepona card) |

Total: **108 images, ~18 MB**.

**Resolution ceiling.** 1200px wide is the maximum the CDN serves. It is enough
for cards, galleries and mobile, and it is the weakest link in the full-bleed
desktop heroes. Ask the client for master files before launch.

---

## Design System

Declared as `@theme` tokens in `app/globals.css`. Tailwind utilities derive from
them (`bg-ink`, `text-gold`, `text-mist`…), so the palette has exactly one home.

| Token | Value | Role |
|---|---|---|
| `--color-ink` | `#0a0a0b` | Ground |
| `--color-ink-raised` | `#121214` | Raised panels |
| `--color-ink-hairline` | `#1e1e21` | Grid rules, borders |
| `--color-bone` | `#f2efe9` | Primary text on ink; the one light section |
| `--color-paper` | `#fbfaf7` | Lightest paper |
| `--color-gold` | `#beaf87` | CENTURY 21 Relentless Gold |
| `--color-gold-lift` | `#d8caa5` | Gold hover |
| `--color-mist` | `#a4a3a0` | Body copy on ink |
| `--color-mist-dim` | `#6f6e6c` | Labels, meta |
| `--ease-luxe` | `cubic-bezier(0.16, 1, 0.3, 1)` | The only easing curve on the site |
| `--shell` | `clamp(1.25rem, 5vw, 5.5rem)` | Page inset |

**Gold discipline.** Gold is a hairline accent: eyebrows, rules, prices, focus
rings, and exactly one filled primary action. It is never a background wash.

### Typography

- **Display** — Instrument Serif 400. `line-height: 0.94`, `letter-spacing:
  -0.02em`, `text-wrap: balance`. Used for headlines, property names, prices at
  scale. Chosen over the usual Didone/Cormorant luxury clichés: it has the
  editorial authority without the wedding-invitation association.
- **UI** — Inter. Eyebrows are 11px / `0.22em` tracking / uppercase.
- **Numeric data** — `.numeric` forces tabular figures so prices and areas align
  in the spec grids. This is the detail that makes a spec strip read as data.
- Every size is a `clamp()`. There are no breakpoint-snapped font sizes.

### Motion Architecture

| Class | Trigger | Use |
|---|---|---|
| `.rise` | CSS animation on load, staggered with `--rise-delay` | Above the fold |
| `.reveal` | `animation-timeline: view()` | Below the fold |
| `.drift` | 24s infinite alternate scale | Full-bleed stills |

Cross-fades (flagship stage, location explorer, feature explorer) are
opacity/transform transitions driven by React state, 1–1.4s on `--ease-luxe`.

`prefers-reduced-motion: reduce` disables all of it.

**Why `.reveal` is CSS-only.** The first implementation used an
IntersectionObserver that added an `is-in` class. That mutates DOM React owns:
it produced hydration mismatches, and — worse — any element React re-created
(a property card after a filter change) came back at `opacity: 0` with nothing
left observing it, i.e. permanently invisible. A `view()` timeline has neither
problem, works with JavaScript disabled, and degrades to plain visible content
where the timeline is unsupported. **Do not reintroduce the observer.**

### Responsive Decisions

- Single fluid scale via `clamp()`; `--shell` grows with the viewport.
- The curated rail is horizontally scroll-snapped at every width — a swipe on
  mobile, arrow-stepped on desktop.
- The location explorer's vertical market list becomes a horizontal chip row
  below `lg`.
- Spec grids collapse 7/8 → 4 → 2 columns.
- `100svh` (not `vh`) everywhere, so mobile browser chrome does not clip heroes.

---

## Important Design Decisions

**The hero is a property, not a slogan.** The site opens on the €9.9M Guadalmina
Baja residence with its specification laid underneath as data. *Why:* it states
the positioning in one screen without a word of self-description, and it is the
literal expression of "the property is the product".

**Seven properties, not seven hundred.** The live site has 104 pages of villas.
The redesign curates. *Why:* a portal grid is a commodity experience; scarcity is
the luxury signal, and it lets every listing get real presentation.

**The feature explorer draws from across the portfolio.** Architecture /
Interiors / Views / Location / Lifestyle each show the strongest real frame for
that lens *from any listing*, credited and linked. *Why:* illustrating five
abstractions with five images of one house is weak, and stock photography was
out of the question. This turns a generic selector into a route into the
listings.

**One light section.** The seller section is the only bone-coloured section on
the site. *Why:* sellers are a different audience arriving with a different
question, and the change of ground signals that without a word.

**The flagship narrative cross-fades in place.** An earlier version let the text
scroll past a fixed image stage. It read well in motion but put two chapters on
screen at once and dragged the outgoing paragraph under the header. *Why the
change:* exactly one chapter visible, always in the same spot, is calmer and more
Apple-like.

**The contact form composes a `mailto:`.** There is no backend in this build, and
faking a success state would be the wrong kind of demo. *Why:* it genuinely works
today, on any device, with nothing to host — and swapping in a form service later
means replacing one `onSubmit`.

**Proposal mode reads `window.location`, not `useSearchParams()`.**
`useSearchParams` opts its whole subtree out of static prerendering unless every
caller sits inside a Suspense boundary — and `PLink` is used in the header,
footer and every property card, so that bailout would cascade across the site.
Reading the URL in an effect keeps all pages static; the cost is one render of
non-proposal hrefs before hydration, which is invisible.

**Investment figures are stated as ranges and disclaimed.** Andalucían ITP,
IVA + AJD, notary and holding costs are public facts, but they are presented as
indicative with an explicit "not tax or legal advice" line. *Why:* a real agency
site carries real liability.

---

## Owner Decisions

Calls made by the project owner. **Treat these as settled — do not re-raise them
each session, and do not act against them.**

| Date | Decision |
|---|---|
| 2026-08-20 | **Deployment is the owner's job.** They handle Vercel themselves. Do not add deploy tooling, CI, or `vercel.json` unless asked. |
| 2026-08-20 | **The contact form backend is deliberately deferred.** The `mailto:` compose is accepted as sufficient for now. Do not wire a form service unprompted. |
| 2026-08-20 | **Imagery rights are not a blocker.** The site is being built *for* CENTURY 21 Luxe, and presenting the agency's own listing photography back to them is expected and welcome. The watermark exclusions stand on presentation-quality grounds; the 1200px ceiling stands on resolution grounds. Neither is a rights question. |

---

## Known Issues

1. **Imagery caps at 1200px wide.** The CDN serves nothing larger; every other
   size key returns a placeholder. Visible as softness in full-bleed desktop
   heroes on a high-DPI display. **Fix: obtain master files from the client.**
2. **Two listings are excluded for watermarks.** See Excluded Listings. Not a
   rights question — the frames are simply unusable at this scale.
3. **No team portraits.** Monogram plates stand in. The layout takes real
   headshots without change.
4. **The enquiry form has no backend.** By design, and deliberately deprioritised
   by the owner — see *Owner Decisions*. Do not "fix" this unprompted.
5. **`scroll-padding-inline` is silently dropped** by the Tailwind v4 / Lightning
   CSS pipeline; the longhands `scroll-padding-left` / `-right` work. This was the
   cause of the curated rail losing its left inset. **If a shorthand appears not
   to apply, check the computed style before assuming the CSS is wrong.**
6. **`animation-timeline: view()` is unsupported in Firefox** (without a flag).
   Reveals there simply show content immediately — acceptable, and deliberate.
7. **`/contact` is server-rendered on demand** rather than static, because it
   reads `searchParams` for the `ref` prefill. Everything else is static.

## Technical Debt

- `lib/properties.ts` is a hand-maintained snapshot. A real build reads the
  Resales-Online API; the filter state model in `property-search.tsx` is already
  shaped for that swap.
- No tests. For a presentational site of this size that is a deliberate trade,
  but the price formatters and the filter/sort reducer are worth covering if the
  dataset grows.
- No sitemap, `robots.txt`, or JSON-LD structured data.
- English only, despite the agency's nine-language positioning.

---

## Next Recommended Tasks

Ranked.

1. **Add `RealEstateListing` JSON-LD** to each property detail page, plus
   `sitemap.ts` and `robots.ts`. Highest SEO return for the least work, and this
   is a business whose leads come from search.
2. **Request master imagery from the client**, then re-run `npm run assets`. The
   1200px ceiling is the single biggest remaining quality limit.
3. **Integrate the Resales-Online feed** behind `lib/properties.ts` so the
   portfolio stays current without a redeploy.
4. **Add team portraits** when supplied; `components/team-preview.tsx` and
   `app/team/page.tsx` take them in place of the monogram plates.
5. **Spanish and Dutch routes** — the two largest buyer languages after English.
6. **Run a Lighthouse pass** on the deployed build and record the numbers here.
7. **Wire the enquiry form to a real endpoint** (Formspree, Resend, or a Next.js
   route handler) — deprioritised by the owner; only on request. Replace
   `onSubmit` in `components/contact-section.tsx`.

Deployment is handled by the project owner and is not a task for a Claude
session. Record the production URL here once it is live.

---

## Commands

```bash
npm install                          # install dependencies
npm run dev                          # dev server on http://localhost:3210
npm run build                        # production build (must pass before commit)
npm start                            # serve the production build
npm run assets                       # re-download property imagery from the manifest
npm run contact-sheet -- R5374861    # review one property's frames as a grid
npm run audit                        # screenshot every section, desktop + mobile
```

`npm run audit` needs Chrome and a one-off
`npm install --no-save playwright-core`. Output lands in `./audit` (gitignored).

---

## Deployment

Not yet deployed. Recommended: **Vercel**.

1. Import `Danizarg/MarbellaLuxe` in Vercel.
2. Framework preset: Next.js. No environment variables are required — the site
   has no backend and no secrets.
3. Build command `npm run build`, output handled by the Next.js preset.
4. Property imagery is committed to the repository, so no asset step is needed at
   build time.
5. Record the production URL here and in `README.md` once live.

---

## Last Session Summary

**Date:** 2026-08-20

**Work completed**

- Verified the empty `Danizarg/MarbellaLuxe` clone, confirmed `origin` and branch.
- Researched marbellaluxe.es end to end: navigation, team, contact, listing feed,
  and the Resales-Online CDN. Recorded verified business information and the
  Lorem ipsum / copy defects found on the live site.
- Extracted real listing data for 10 candidate properties; reviewed their imagery
  as contact sheets; rejected 3 for burned-in watermarks; sourced a clean
  Estepona listing to replace one of them.
- Built the asset pipeline and downloaded 108 images (~18 MB) as local WebP.
- Scaffolded Next.js 16 + React 19 + Tailwind v4 + TypeScript. Upgraded off
  Next 15.5.4 immediately due to CVE-2025-66478.
- Built the design system and all twelve required sections across seven routes.
- Implemented proposal mode with the €300 summer offer panel.
- Ran an autonomous visual audit at 1512px and 390px and fixed what it found:
  the curated rail losing its left inset (`scroll-padding-inline` being dropped),
  weak hero scrims, the flagship narrative colliding with the header, and
  repeated photography across three sections.
- Replaced the IntersectionObserver reveal with a CSS `view()` timeline after the
  audit surfaced hydration mismatches and permanently-invisible filtered cards.
- Wrote `MASTER_PROMPT.md`, `CLAUDE_CONTEXT.md`, `README.md`.
- Recorded the owner's calls on deployment, the form backend and image rights in
  *Owner Decisions*, and re-ranked *Next Recommended Tasks* accordingly.

**Files changed:** initial commit — the entire repository.

**Build status:** `npm run build` passing. 15 routes generated; all static except
`/contact`. No TypeScript errors, no console errors, no hydration warnings.

**Git status / commit / push:** recorded in the commit that accompanies this file.
See §"Next Recommended Tasks" for where to pick up.

**Development stopped at:** a complete, building, audited redesign with the
context system in place.

**Next recommended action:** task 1 above — JSON-LD, sitemap and robots.
