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
real-estate agency covering Marbella, Benahavís, Estepona, Sotogrande and Mijas.
The governing idea is that **the property is the product**. The animation budget
is spent on a single cinematic intro; everything after it is presented normally.
Full specification in `MASTER_PROMPT.md`.

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
- **The homepage links to a Townhouse listing page that 404s.**
- The listing feed is large (104 pages of villas alone) but the presentation is a
  generic portal grid.
- **The live site's accent colour is `rgb(190, 175, 135)`** — exactly CENTURY 21
  Relentless Gold `#beaf87`, which is the token this redesign uses.
- Feed images are inconsistent: some carry a **burned-in CDN watermark**, and
  **every rental listing** is served under a watermarking key.
- The CDN exposes **`w1200` as its largest real derivative** for sales listings
  (`w800` for rentals). Larger size keys return a ~2.5KB placeholder.

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
| Headline markets | Marbella, Benahavís, Estepona, Sotogrande |
| Also trades in | Mijas (La Cala, Mijas Pueblo, Calahonda) |
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
  globals.css              design system: tokens, primitives, intro, motion
  layout.tsx               fonts, metadata, intro head script, header/footer
  page.tsx                 homepage: intro + section order
  not-found.tsx
  properties/page.tsx      search page shell
  properties/[slug]/       property detail experience (SSG, 24 routes)
  rentals/                 long-term rental schedule
  services/page.tsx        service index
  services/[slug]/         service detail (SSG, 5 routes)
  about/ careers/ sell/ investment/ team/ contact/
components/
  site-intro.tsx           the cinematic opener + its no-flash head script
  site-header.tsx          contracting, blur-on-scroll header + mobile sheet
  site-footer.tsx          full site map, three link groups
  hero.tsx                 cinematic hero
  curated.tsx              featured properties grid
  property-card.tsx        shared card, adapts to category
  flagship-story.tsx       featured residence editorial spread
  location-explorer.tsx    the five markets
  feature-explorer.tsx     Architecture/Interiors/Views/Location/Lifestyle
  search-teaser.tsx        homepage 4-control search
  property-search.tsx      full filter + sort + results
  gallery.tsx              editorial grid + keyboard lightbox
  seller.tsx investment.tsx team-preview.tsx contact-section.tsx
  section-head.tsx         shared section opening (accepts multiple paragraphs)
  proposal.tsx             useIsProposal + PLink
  proposal-layer.tsx       ribbon + €300 offer panel
lib/
  site.ts                  verified business information, header + footer nav
  properties.ts            24 sale listings + formatters
  rentals.ts               8 rental listings (no imagery — see below)
  team.ts                  the team
  locations.ts             five markets + feature facets
  services.ts              five service pages
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
- Design system (tokens, type scale, motion, intro, primitives)
- Asset pipeline: 24 properties, 244 images, downloaded and converted to WebP
- Cinematic intro sequence, once per session, homepage only
- Homepage: hero, featured grid, featured residence, locations, facets, search,
  seller, investment, team, contact
- Property search with type / market / budget / bedroom filters and sorting
- Property detail experience (24 static routes) with gallery + lightbox
- Rentals schedule (8 listings, desktop table + mobile cards)
- Services index and five service pages (SSG)
- About, Careers, Team, Sell, Investment, Contact pages
- 404 page
- Proposal mode (`?proposal=true`) with the €300 offer panel
- Responsive from 375px; reduced-motion support throughout
- `npm run build` passing — 41 routes, all static except `/contact`

### In Progress

- Nothing. The session ended at a clean, committed, building state.

### Not Started

- Live Resales-Online API integration (the dataset is a curated static snapshot)
- Form backend — deliberately deferred, see *Owner Decisions*
- Multilingual routing (the agency works in nine languages; the site is English)
- Team portraits (none published by the client)
- Sitemap, `robots.txt`, structured data (`RealEstateListing` JSON-LD)

---

## Section Status

| Section | Status | Component / route |
|---|---|---|
| Intro sequence | Complete | `components/site-intro.tsx` |
| Navigation | Complete | `components/site-header.tsx` |
| Hero | Complete | `components/hero.tsx` |
| Featured properties | Complete | `components/curated.tsx` |
| Featured residence | Complete | `components/flagship-story.tsx` |
| Location Explorer | Complete | `components/location-explorer.tsx` |
| Feature Explorer | Complete | `components/feature-explorer.tsx` |
| Property Search | Complete | `property-search.tsx` + `search-teaser.tsx` |
| Property Detail Page | Complete | `app/properties/[slug]/` + `gallery.tsx` |
| Rentals | Complete | `app/rentals/` |
| Services | Complete | `app/services/`, `app/services/[slug]/` |
| Seller Section | Complete | `components/seller.tsx`, `/sell` |
| Team | Complete | `components/team-preview.tsx`, `/team` |
| Investment Section | Complete | `components/investment.tsx`, `/investment` |
| About | Complete | `app/about/` |
| Careers | Complete | `app/careers/` |
| Contact | Complete | `components/contact-section.tsx`, `/contact` |
| Proposal Mode | Complete | `proposal-layer.tsx`, `proposal.tsx` |
| Footer | Complete | `components/site-footer.tsx` |

---

## Property Data Used

24 sale listings, every figure read from the client's own listing pages on
2026-08-20 and codified in `lib/properties.ts`. **Never rely on memory for
these.** Source URLs are all `https://marbellaluxe.es/en/property/<REF>_<slug>/`
and each detail page links back to its own source.

| Ref | Location | Region | Category | Price | Bd | Ba | Built | Plot | Terrace |
|---|---|---|---|---|---|---|---|---|---|
| R5374861 | Guadalmina Baja | Marbella | Villa | €9,900,000 | 8 | 10 | 1,303 | 3,112 | 165 |
| R5439580 | El Madroñal | Benahavís | Villa | €6,450,000 | 4 | 5 | 526 | 9,632 | — |
| R5463289 | Elviria | Marbella | Villa | €4,200,000 | 7 | 8 | 783 | 6,127 | 230 |
| R5460766 | La Quinta | Benahavís | Villa | €3,650,000 | 4 | 4 | 578 | 5,287 | 181 |
| R5464381 | Sotogrande Alto | Sotogrande | Villa | €3,350,000 | 5 | 8 | 1,051 | 1,786 | 466 |
| R5464375 | Nueva Andalucía | Marbella | Villa | €3,350,000 | 5 | 4 | 350 | 500 | — |
| R5448211 | Atalaya | Estepona | Villa | €2,300,000 | 5 | 5 | 498 | 1,000 | 100 |
| R5464111 | Puerto Banús | Marbella | Apartment | €2,390,000 | 2 | 2 | 138 | — | 10 |
| R5464102 | Estepona | Estepona | Apartment | €1,250,000 | 3 | 2 | 111 | — | 40 |
| R5464096 | Nueva Andalucía | Marbella | Apartment | €769,999 | 2 | 2 | 137 | — | 8 |
| R5464078 | Estepona | Estepona | Apartment | €545,000 | 2 | 2 | 97 | — | 33 |
| R5164585 | Elviria | Marbella | Penthouse | €1,070,000 | 3 | 3 | 120 | — | 60 |
| R5443516 | Atalaya | Estepona | Penthouse | €895,000 | 3 | 3 | 169 | — | 81 |
| R5463838 | Nueva Andalucía | Marbella | Penthouse | €749,000 | 2 | 2 | 140 | — | 100 |
| R5444944-N | Estepona | Estepona | New development | €4,750,000 | 7 | 10 | 761 | 2,043 | 284 |
| R4974751-N | Benahavís | Benahavís | New development | €2,875,000 – €3,625,000 | 3–4 | 4 | 378 | 2,775 | 233 |
| R5443351-N | La Cala de Mijas | Mijas | New development | €1,300,000 | 3 | 2 | 109 | — | 47 |
| R5453572-N | Estepona | Estepona | New development | €847,000 – €963,991 | 3–4 | 2–3 | 194 | — | 69 |
| R5461963 | Sotogrande | Sotogrande | Plot | €1,150,000 | — | — | — | 2,837 | — |
| R5457280 | Cerros del Águila | Mijas | Plot | €1,100,000 | — | — | — | 45,110 | — |
| R5464654 | Estepona | Estepona | Commercial | €1,850,000 | — | 5 | 350 | — | 600 |
| R5455462 | Marbella | Marbella | Commercial | €330,000 | — | — | 76 | — | — |
| R4943824 | Estepona | Estepona | Hotel | €10,000,000 | 54 keys | 54 | 2,315 | 571 | — |
| R5396800 | Torreguadiaro | Sotogrande | Hotel | €5,500,000 | 12 keys | 12 | 455 | 1,502 | — |

R5374861 is the flagship: site hero, featured residence spread, Architecture and
Interiors facets. Region assignments for locations outside the four headline
markets: Puerto Banús → Marbella, Atalaya → Estepona, La Cala and Cerros del
Águila → Mijas, Torreguadiaro → Sotogrande.

### Rental listings (8, no imagery)

`lib/rentals.ts`. R5177188-L Costalita €15,000 pcm · R5114644-L Sotogrande
€10,000 · R5375902-L El Paraíso €8,500 · R5355280-L Benamara €5,000 ·
R5419801-L Puerto Banús €4,500 · R5063653-L Nueva Andalucía €4,000 ·
R5076376-L The Golden Mile €3,700 · R5419741-L Costalita €2,200.

### Excluded listings

| Ref | Reason |
|---|---|
| R5459710 (El Presidente, €2.65M) | Watermark, CDN key `wuap72y7is` |
| R4661893 (Golden Mile, €1.595M) | Watermark, CDN key `or91yu86l1` |
| R5410183 (Costalita penthouse, €2.8M) | Watermark, CDN key `8usg2qssqc` |
| R5448664 (Estepona, €849k) | Superseded by R5448211 as the Estepona representative |
| R5449183 (Marbella restaurant, €1.7M) | Only available frames are unusable at presentation scale |
| R5443939 (Mijas Golf plot, €8M) | Feed reports a 42 m² plot for €8M — a data error on the client's side |
| R5462329 (Estepona "plot", €2.3M) | Listed as a plot but carries 7 beds and 495 m² built; category is wrong at source |

---

## Asset Manifest

**Provenance.** All property imagery originates from the client's own
Resales-Online listing feed, i.e. the images the agency already publishes. The
project owner has confirmed this is expected and welcome — see *Owner Decisions*.
Treat the frames as **concept imagery pending master files**: the open question
is resolution, not rights.

**Pipeline.** `scripts/asset-manifest.json` holds the CDN key, property UUID,
version stamp, derivative size and frame count per listing. `npm run assets`
downloads each frame, converts it to WebP (quality 82) and writes it to
`public/properties/<REF>/NN.webp`. Existing files are skipped, so the script is
safe to re-run. **Nothing is hotlinked at runtime.**

- **Sales listings** are served at `w1200` with one shared filename sequence.
- **Rental listings** are served at `w800` with a *different* filename sequence —
  hence the two filename sets in the manifest.

Totals: **24 properties, 244 images, ~32 MB.** Frame counts run 24 (flagship),
14 (the original six villas), 8 (most), 6 (R5455462) and 5 (R5461963).

Notable frames: R5374861/01 pool + facade (site hero), /02–03 facade
(Architecture facet), /09 interiors, /21 lawn · R5439580/02 rooftops + sea,
/13 cork oak over the coast (Views facet) · R5463289/03 palms + sea (Marbella
card), /04 pool + lawn (Lifestyle facet) · R5464375/02 Golf Valley aerial
(Location facet) · R5443351-N/01 lagoon pool (Mijas card).

**Resolution ceiling.** 1200px is the maximum the CDN serves. Enough for cards,
galleries and mobile; it is the weakest link in the full-bleed desktop heroes.
Ask the client for master files before launch.

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
| `--color-gold` | `#beaf87` | CENTURY 21 Relentless Gold — matches the live site exactly |
| `--color-gold-lift` | `#d8caa5` | Gold hover |
| `--color-mist` | `#a4a3a0` | Body copy on ink |
| `--color-mist-dim` | `#6f6e6c` | Labels, meta |
| `--ease-luxe` | `cubic-bezier(0.16, 1, 0.3, 1)` | The only easing curve on the site |
| `--shell` | `clamp(1.25rem, 5vw, 5.5rem)` | Page inset |

**Gold discipline.** Gold is a hairline accent: eyebrows, rules, prices, focus
rings, and exactly one filled primary action. It is never a background wash.

### Typography

- **Display** — Instrument Serif 400, `line-height: 0.94`, `letter-spacing:
  -0.02em`, `text-wrap: balance`. Chosen over the usual Didone/Cormorant luxury
  clichés: editorial authority without the wedding-invitation association.
- **UI** — Inter. Eyebrows are 11px / `0.22em` tracking / uppercase.
- **Numeric data** — `.numeric` forces tabular figures so prices and areas align
  in the spec grids.
- Every size is a `clamp()`. There are no breakpoint-snapped font sizes.
- Body copy is capped at `max-w-[62ch]` (`[64ch]` on long-form pages).

### Motion Architecture

| Class | Trigger | Use |
|---|---|---|
| `.site-intro` + `intro-*` | CSS animation on load | The intro sequence only |
| `.rise` | CSS animation on load, staggered with `--rise-delay` | Above the fold |
| `.reveal` | `animation-timeline: view()` | Below the fold |
| `.drift` | 24s infinite alternate scale | Full-bleed stills |

Cross-fades (location explorer, feature explorer) are opacity transitions driven
by React state, ~1s on `--ease-luxe`. `prefers-reduced-motion: reduce` disables
all of it, including the intro.

**Intro timings** live entirely in `globals.css` so the sequence can be re-tuned
without touching the component: plates 2.2s each staggered 1.1s, rule 1.2s from
0.15s, wordmark tracking-in 1.4s from 0.4s, markets cycling from 1.7s, panel lift
1s from 3.6s. Total runtime 4.6s, mirrored in `RUNTIME_MS` in
`components/site-intro.tsx` — **change both together.**

**Why `.reveal` is CSS-only.** The first implementation used an
IntersectionObserver that added an `is-in` class. That mutates DOM React owns: it
produced hydration mismatches, and any element React re-created (a property card
after a filter change) came back at `opacity: 0` with nothing left observing it,
i.e. permanently invisible. A `view()` timeline has neither problem, works with
JavaScript disabled, and degrades to plain visible content where unsupported.
**Do not reintroduce the observer.**

### Responsive Decisions

- Single fluid scale via `clamp()`; `--shell` grows with the viewport.
- Property spec strips use `md:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]` so
  a plot rendering three cells and a hotel rendering six both fill the row.
- The rentals schedule is a table on desktop and stacked cards below `md` — a
  horizontally scrolling table pushes the rent off the right edge on a phone.
- The location explorer's vertical market list becomes a horizontal chip row
  below `lg`.
- `100svh` (not `vh`) everywhere, so mobile browser chrome does not clip heroes.

---

## Important Design Decisions

**The animation lives in the intro; the site is calm.** A 4.6s cinematic opener
plays once per session on the homepage, then lifts to reveal the hero already
settled. *Why:* it gives the brand a moment of theatre without making the
listings — the thing people came for — harder to read.

**Properties are shown normally.** The featured grid is a conventional
three-column grid, and the flagship is an editorial spread with large photography
and real paragraphs. An earlier build used a scroll-snapped rail and a sticky
scroll-hijacked narrative; both were replaced. *Why:* a rail makes comparison
harder, and scroll-jacking made the most expensive property on the site harder to
read than the cheapest.

**The writing is full-length.** Property descriptions run to three or four
substantial paragraphs; section copy carries two. *Why:* an earlier draft used a
clipped, aphoristic register that read as styling rather than as information.
Buyers spending millions want information.

**The hero is a property, not a slogan.** The site opens on the €9.9M Guadalmina
Baja residence with its specification laid underneath as data.

**24 properties, not 2,400.** The live site has 104 pages of villas alone. The
redesign curates and covers every category rather than dumping the feed.

**The feature explorer draws from across the portfolio.** Each of the five lenses
shows the strongest real frame for it *from any listing*, credited and linked.
*Why:* illustrating five abstractions with five images of one house is weak, and
stock photography was out of the question.

**Rentals are published without photography.** Every rental on the feed sits
under CDN key `wuap72y7is`, which watermarks everything it serves. The rentals
index is a typographic schedule instead, with a line explaining that photography
is sent on request. *Why:* watermarked photography on a site at this level is
worse than none. `lib/rentals.ts` documents how to switch it back.

**Services are consolidated.** The live site has five near-identical "Renovations
<town>" pages; here that is one page listing the areas. *Why:* easier to maintain
and considerably better for search than five pages of duplicated copy.

**One light section.** The seller section is the only bone-coloured section on the
site, because sellers are a different audience arriving with a different question.

**The contact form composes a `mailto:`.** No backend, and faking a success state
would be the wrong kind of demo. Swapping in a form service later means replacing
one `onSubmit`.

**Proposal mode reads `window.location`, not `useSearchParams()`.**
`useSearchParams` opts its whole subtree out of static prerendering unless every
caller sits inside a Suspense boundary — and `PLink` is used in the header,
footer and every property card, so that bailout would cascade across the site.

**Investment figures are stated as ranges and disclaimed.** Andalucían ITP,
IVA + AJD, notary and holding costs are public facts, but they are presented as
indicative with an explicit "not tax or legal advice" line.

---

## Owner Decisions

Calls made by the project owner. **Treat these as settled — do not re-raise them
each session, and do not act against them.**

| Date | Decision |
|---|---|
| 2026-08-20 | **Deployment is the owner's job.** They handle Vercel themselves. Do not add deploy tooling, CI, or `vercel.json` unless asked. |
| 2026-08-20 | **The contact form backend is deliberately deferred.** The `mailto:` compose is accepted as sufficient for now. Do not wire a form service unprompted. |
| 2026-08-20 | **Imagery rights are not a blocker.** The site is being built *for* CENTURY 21 Luxe, and presenting the agency's own listing photography back to them is expected and welcome. |
| 2026-08-20 | **Cover the whole business.** Every property type and every service, not villa sales alone. |
| 2026-08-20 | **Animate the intro, not the site.** Properties are to be shown normally. |
| 2026-08-20 | **Write normally.** Full paragraphs, not clipped one-liners. |

---

## Known Issues

1. **Imagery caps at 1200px wide** (800px for rentals). The CDN serves nothing
   larger; every other size key returns a placeholder. Visible as softness in
   full-bleed desktop heroes on a high-DPI display. **Fix: master files.**
2. **Five listings are excluded for watermarks or unusable frames**, and every
   rental is watermarked. See *Excluded listings* and *Important Design
   Decisions*.
3. **Two of the client's own listings carry bad category data** (R5443939,
   R5462329) and were dropped rather than corrected — correcting a client's feed
   silently is worse than omitting it. Worth raising with them.
4. **No team portraits.** Monogram plates stand in. The layout takes real
   headshots without change.
5. **The enquiry form has no backend.** By design, and deliberately deprioritised
   by the owner. Do not "fix" this unprompted.
6. **`scroll-padding-inline` is silently dropped** by the Tailwind v4 / Lightning
   CSS pipeline; the longhands work. **If a shorthand appears not to apply, check
   the computed style before assuming the CSS is wrong.**
7. **`animation-timeline: view()` is unsupported in Firefox** (without a flag).
   Reveals there simply show content immediately — acceptable, and deliberate.
8. **`/contact` is server-rendered on demand** rather than static, because it
   reads `searchParams` for the `ref` prefill. Everything else is static.
9. **A `caret-color: transparent` hydration warning** appears in dev on pages
   with form inputs. It is injected by Chrome's autofill, not by this codebase —
   `grep -r caret app components lib` returns nothing. Ignore it.

## Technical Debt

- `lib/properties.ts` is a hand-maintained snapshot. A real build reads the
  Resales-Online API; the filter state model in `property-search.tsx` is already
  shaped for that swap.
- No tests. For a presentational site that is a deliberate trade, but the price
  formatters and the filter/sort reducer are worth covering if the dataset grows.
- No sitemap, `robots.txt`, or JSON-LD structured data.
- English only, despite the agency's nine-language positioning.

---

## Next Recommended Tasks

Ranked.

1. **Add `RealEstateListing` JSON-LD** to each property detail page, plus
   `sitemap.ts` and `robots.ts`. Highest SEO return for the least work, and this
   is a business whose leads come from search. 24 property pages and 5 service
   pages now make this materially more valuable than it was.
2. **Request master imagery from the client** — including unwatermarked rental
   frames, which would let the rentals section adopt the standard property card.
   Then re-run `npm run assets`.
3. **Integrate the Resales-Online feed** behind `lib/properties.ts` so the
   portfolio stays current without a redeploy.
4. **Add team portraits** when supplied.
5. **Spanish and Dutch routes** — the two largest buyer languages after English.
6. **Run a Lighthouse pass** on the deployed build and record the numbers here.
   Watch LCP on the homepage: the intro preloads a large plate.
7. **Wire the enquiry form to a real endpoint** — deprioritised by the owner;
   only on request.

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
It sets the intro's sessionStorage flag before each shot so section screenshots
are not obscured by the opener.

---

## Deployment

Handled by the project owner, on **Vercel**. The Next.js preset works as-is,
there are no environment variables and no secrets, and imagery ships in the
repository so nothing extra runs at build time. Record the production URL here
and in `README.md` once live.

---

## Last Session Summary

**Date:** 2026-08-20 (second working session, same day)

**Work completed**

- Expanded the portfolio from 7 villas to **24 listings across seven categories**
  — villas, apartments, penthouses, new developments, plots, commercial and
  hotels — plus **8 long-term rentals**. Scraped every figure from the client's
  own listing pages and reviewed all imagery as contact sheets before selecting.
- Rejected three further listings for watermarks and two for bad category data at
  source; discovered that the entire rental inventory is watermarked and designed
  the rentals section around that rather than shipping watermarked photography.
- Added **Mijas** as a fifth market, since the client genuinely trades there.
- Built the **cinematic intro**: three plates cross-fading behind the wordmark,
  markets cycling, panel lifting to reveal the hero. Once per session, homepage
  only, skippable, disabled under reduced motion, with a blocking head script so
  returning visitors never see a frame of it.
- **Removed the scroll-jacking**: the curated rail became a conventional grid and
  the sticky flagship narrative became an editorial spread.
- **Rewrote every piece of copy at full length** — property stories now run three
  to four paragraphs, section copy two.
- Added new routes: `/rentals`, `/services`, `/services/[slug]` (×5), `/about`,
  `/careers`. Rebuilt the footer as a full site map.
- Added a property-type filter to search; made the spec strip auto-fit so a plot
  no longer leaves an empty cell; gave rentals a stacked mobile layout.
- Ran the visual audit at 1512px and 390px across 32 routes and fixed what it
  found.

**Files changed:** most of `lib/`, most of `components/`, several new routes, the
asset manifest and pipeline, and all three documentation files.

**Build status:** `npm run build` passing. **41 routes**, all statically
prerendered except `/contact`. No TypeScript errors.

**Development stopped at:** a complete, building, audited site covering the
agency's whole business.

**Next recommended action:** task 1 above — JSON-LD, sitemap and robots.
