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
The governing idea is that **the property is the product**, and that **scroll
should reveal information rather than just move the page**. Three moments are
pinned and scroll-driven — the intro resolving into the hero, the featured
residence told through its own numbers, and the Architecture → Lifestyle sequence
— and everything between them is a normal page you can read and click.

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
- **next/font** — Literata (display, variable, opsz axis) + Inter (UI)
- **sharp** (devDependency) — asset pipeline and contact sheets only
- **playwright-core** — *not* a dependency; installed on demand with
  `npm install --no-save playwright-core` for `npm run audit`

No animation library. No UI kit. No CSS-in-JS.

---

## Repository Structure

```
app/
  globals.css              design system: tokens, primitives, motion vocabulary
  layout.tsx               fonts, metadata, header/footer
  icon.svg                 site icon
  page.tsx                 homepage: section order + the impact/information rhythm
  not-found.tsx
  properties/page.tsx      search page shell
  properties/[slug]/       property detail experience (SSG, 24 routes)
  rentals/                 long-term rental schedule
  services/page.tsx        service index
  services/[slug]/         service detail (SSG, 5 routes)
  about/ careers/ sell/ investment/ team/ contact/
components/
  intro-hero.tsx           PINNED. scroll intro resolving into the hero
  flagship-reveal.tsx      PINNED. the residence told through its own numbers
  feature-explorer.tsx     PINNED. Architecture → Interiors → Views → Location → Lifestyle
  flagship-story.tsx       editorial spread + the typographic Interlude (light)
  photo-band.tsx           bright full-bleed contrast reset
  curated.tsx              featured properties, editorial grid
  property-card.tsx        shared card — photo-dominant, variable aspect
  select-field.tsx         the site's own listbox (replaces native select)
  result-count.tsx         "24 residences", crossfading on change
  location-explorer.tsx    the five markets
  search-teaser.tsx        homepage configurator
  property-search.tsx      full filter + sort + results
  gallery.tsx              editorial grid + keyboard lightbox
  site-header.tsx          contracting header; hides while data-brand="intro"
  site-footer.tsx          full site map, three link groups
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
  grid-rhythm.ts           editorial grid spans and aspects
  use-scroll-progress.ts   the pinned-section primitive (+ span, mix)
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
- Design system (tokens, type scale, motion vocabulary, primitives)
- Asset pipeline: 24 properties, 244 images, downloaded and converted to WebP
- Scroll intro resolving into the hero, with a clean wordmark handover
- Flagship reveal — the residence told through price, built area, bedrooms, plot
- Pinned Architecture → Lifestyle sequence with a travelling active rule
- Typographic interlude and bright photographic band as contrast resets
- Editorial property grid (variable spans and aspects) on homepage and search
- Custom listbox replacing native selects, with full keyboard support
- Property search with type / market / budget / bedroom filters, curated default
  sort, and a grid that transitions rather than snapping
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

- **Display** — **Literata**, weight 500, `font-variation-settings: "opsz" 72`,
  `line-height: 1`, `letter-spacing: -0.018em`, `text-wrap: balance`.
  *Why this face:* it is wide and **low-contrast**, so its stems stay solid at 90px
  over a photograph. The previous face (Instrument Serif) is narrow and
  high-contrast — at hero size its hairlines read as thin and the line looks
  under-set, which is the most common way a luxury headline fails. Six candidates
  were rendered side by side at hero size on the real hero photograph before
  choosing; the comparison is reproducible from *Known Issues*.
  **Do not drop the weight back to 400, and do not swap in a Didone.**
- **UI** — Inter. Eyebrows are 11px / `0.22em` tracking / uppercase.
- **Numeric data** — `.numeric` forces tabular figures so prices and areas align
  in the spec grids.
- Every size is a `clamp()`. There are no breakpoint-snapped font sizes.
- Body copy is capped at `max-w-[62ch]` (`[64ch]` on long-form pages).
### Motion Architecture

The site has three pinned, scroll-driven moments and a shared vocabulary for
everything else. `lib/use-scroll-progress.ts` provides the primitive: one
rAF-throttled passive listener per pinned section, returning 0 → 1 across its
travel, plus `span()` and `mix()` for windowing and interpolation.

**The three pinned moments** — do not add a fourth.

| Component | Height | What scroll drives |
|---|---|---|
| `intro-hero.tsx` | 240svh | Veil lifts, wordmark leaves, hero resolves |
| `flagship-reveal.tsx` | 420svh | Price → frame grows from centre → each specification hands over to the photograph that answers it |
| `feature-explorer.tsx` | 500svh | Architecture → Interiors → Views → Location → Lifestyle |

Each collapses to a static equivalent under reduced motion. `flagship-reveal.tsx`
and `feature-explorer.tsx` render a full static fallback; `intro-hero.tsx` forces
progress to 1 and drops to `100svh`.

**The vocabulary**, all `view()` timelines in `globals.css`, so they cost no
JavaScript and degrade to plain visible content where unsupported:

| Class | Content | Movement |
|---|---|---|
| `.mask` + `.mask-line` | Typography | Lines rise out of an overflow clip |
| `.clip-reveal` / `.clip-reveal-up` | Photography | Frame opens, image settles from scale 1.08 |
| `.meta-in` | Labels, metadata | Small opacity and translate |
| `.reveal` | Generic blocks | Rise |
| `.rise` | Above the fold | Load-time entrance, `--rise-delay` |
| `.drift` | Full-bleed stills | 24s scale, infinite alternate |

`.seq-1` … `.seq-4` offset the `animation-range` so a composition arrives in
order — image, label, headline, copy — sequenced by **scroll distance**, not
time, so the order holds however fast the visitor scrolls.

**The wordmark handover.** `intro-hero.tsx` sets `data-brand` on `<html>`;
`globals.css` fades the header out while it reads `"intro"`. The switch happens
strictly *after* the intro brand card has reached zero opacity
(`p > BRAND_OUT[1] + 0.04`), because an earlier threshold left a scroll window in
which both wordmarks were legible — which is exactly the stacking-bug impression
the design must avoid. **If you retime the brand card, retime this too, and
re-check frame-by-frame at 390px and 1512px.**

The brand card's *entrance* is time-based CSS (`.brand-rule`, `.brand-track`,
`.rise`) rather than scroll-driven: at zero scroll there is no progress to drive
it, and a visitor who never scrolls must still be met by the wordmark.

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

**The intro is scroll-driven, not timed.** The visitor lands on the brand card
and scrolls; the veil lifts, the wordmark leaves, the hero resolves. *Why:* a
timed splash is something you sit through; a scroll intro is something you
perform, and it belongs to the site rather than sitting in front of it. It also
means the visitor is already scrolling by the time the hero arrives.

**The wordmark has exactly one lifecycle.** The header hides while
`data-brand="intro"` and only appears once the intro card has reached zero. *Why:*
two `Luxe` marks on screen at once reads as a stacking bug, not as branding. The
first fix left a narrow scroll window where both were faintly legible — it took a
frame-by-frame capture at two widths to see it. **Re-check that way after any
retiming.**

**Three pinned moments, deliberately no more.** Intro/hero, flagship reveal,
feature explorer. *Why:* the page has to alternate impact and information. A
fourth pinned section would turn a property site into a showreel, and a buyer
still has to be able to find a price.

**The flagship reveal is built from real data.** Guide price, then 1,303 m², then
8 bedrooms, then 3,112 m² — each handing over to the photograph that answers it.
*Why:* the specification *is* the animation. That is worth far more than
decorative motion, and it cannot be accused of being style over substance.

**The homepage seduces; the property pages explain.** Homepage chapters are a
label, a headline-sized statement and one or two supporting sentences. The full
four-paragraph account lives on the property page. *Why:* a hundred-word block
beside a photograph reads as an architectural brochure. Nothing was deleted — it
moved to where someone who has decided to care will actually read it.

**Property cards are roughly 70% image.** Location and type, name, price, four
numbers. No description sentence. *Why:* on an index the photograph sells the
property; the sentence is dead weight and pushes the image down to half the card.

**The grid has an editorial rhythm.** A wide feature, a portrait, three level
frames, a portrait, a second wide — repeating every seven cards, and *only above
`xl`*. *Why:* identical tiles read as a portal. Below `xl` every card is 4:3,
because a landscape photograph cropped to portrait at full phone width shows
mostly ceiling.

**The default sort is "Featured".** The flagship first, then price descending.
*Why:* strict price order opened the portfolio with a 54-key hotel's guest-room
photograph, because it is €100k more expensive than the villa. One position, and
the page leads with its best image. It is labelled, so it is not a lie.

**Selects are the site's own listbox.** *Why:* a native `<select>` renders an
operating-system menu — grey, 13px, outside the design — on the single
interaction that turns a visitor into an enquiry. Full keyboard support
(Enter/Space/↓ to open, arrows, Home/End, Escape) is the part that usually gets
skipped, and it is implemented.

**"24 residences", not "24 of 24 match".** The count crossfades between two true
values when filters change. *Why:* a counting animation would tick through
numbers that were never the answer.

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
| 2026-08-20 | **The intro is a scroll intro, not a video.** It happens on load *and scroll*. Superseded the earlier timed overlay. |
| 2026-08-20 | **Do not touch the opening.** The hero is the strongest part of the design. Bring later sections up to it; never drag it down to meet them. |
| 2026-08-20 | **The hero headline runs wide** — two lines, not three. |
| 2026-08-20 | **Homepage copy is short; detail pages are full.** Reduce visible homepage copy by roughly a quarter to a third. |
| 2026-08-20 | **The properties page must not read as a portal.** Editorial grid, photo-dominant cards, configurator filter bar. |

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
10. **The homepage is 25 screens tall** (≈21,600px at 1512×850). Three pinned
    sections account for about half of it. That is intentional, but it means the
    homepage is a *sequence*, not a page — audit it as a scroll run, and never
    judge a pinned section from one screenshot.
11. **Always look at an image before assigning it to a facet or a card.** The
    Lifestyle facet originally pointed at `R5463289/04`, which is an interior —
    duplicating the Interiors facet and contradicting its own headline ("Three
    hundred days of outdoors"). Frame indices are not self-describing. Use
    `npm run contact-sheet -- <REF>`.

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

**Date:** 2026-08-20 (third working session, same day)

Driven by a full video review of the deployed site. The headline finding was that
the opening was the strongest part and the rest did not hold that level.

**Work completed**

- **Replaced the timed intro overlay with a scroll intro.** `intro-hero.tsx`
  merges intro and hero into one pinned composition: land on the brand card,
  scroll, the veil lifts and the hero resolves. The brand entrance is time-based
  CSS (there is no progress to drive it at zero scroll); the exit is scroll-driven.
- **Fixed the wordmark handover properly.** The header hides behind
  `data-brand="intro"` and appears strictly after the intro card reaches zero.
  Verified frame-by-frame at 390px and 1512px — the first attempt still left a
  narrow window with two faint marks.
- **Widened the hero headline** to two lines from three.
- **Built the flagship reveal** — the signature moment. Guide price on black, the
  house emerging from the centre of the frame and growing to fill it, then
  1,303 m², 8 bedrooms, 3,112 m², each handing over to the photograph that
  answers it. Every figure is the client's own.
- **Removed the remaining scroll-jacking from the editorial spread** and rewrote
  its chapters as label + statement + one or two sentences.
- **Pinned the Architecture to Lifestyle sequence** with clip-mask image
  hand-overs, a masked headline swap, and a rule that travels with scroll. Tabs
  still work — they scroll to their own segment.
- **Built a motion vocabulary** (`.mask` / `.clip-reveal` / `.meta-in` / `.seq-*`)
  so typography, photography and metadata each move differently, sequenced by
  scroll distance rather than by time.
- **Added two contrast resets**: a light typographic interlude built on 1,303 m²,
  and a bright full-bleed photographic band in the long dark lower stretch.
- **Rebuilt the properties page**: editorial grid rhythm, photo-dominant cards
  with no description sentence, custom listbox filter bar, "24 residences" with a
  crossfading count, and a grid that transitions rather than snapping.
- **Cut homepage copy** by roughly a third; location and facet copy reduced to one
  paragraph each.
- Added `app/icon.svg`; corrected "four markets" to five on the properties page.

**Faults the audit caught and fixed**

- Brand card invisible at zero scroll — its entrance was scroll-driven.
- Empty grey frame before the flagship reveal's first image.
- Facet headline sitting half-clipped under its mask through the hand-over.
- **Lifestyle facet pointing at an interior photograph** — duplicating Interiors
  and contradicting its own headline. Now the Atalaya penthouse terrace.
- Six-row filter bar swallowing half the viewport on a phone.
- Portrait card crops showing mostly ceiling at full phone width.
- A 54-key hotel's guest room leading the portfolio ahead of the flagship.

**Build status:** `npm run build` passing. 41 routes, all static except
`/contact`. No TypeScript errors, no console errors, no failing requests across a
full homepage scroll.

**Development stopped at:** a complete, audited site whose motion carries all the
way from the intro to the footer.

**Next recommended action:** task 1 above — JSON-LD, sitemap and robots.
