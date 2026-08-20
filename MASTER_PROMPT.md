# MASTER_PROMPT.md

**This file is the permanent specification for the MarbellaLuxe redesign.**

It is not a progress log. Do not replace it with status notes, do not delete
requirements from it because they are finished, and do not narrow it. Progress
belongs in `CLAUDE_CONTEXT.md`.

Repository: <https://github.com/Danizarg/MarbellaLuxe> — the single source of
truth for this project. Nothing important about this project may exist only in a
Claude conversation.

---

## 1. The project

A complete redesign of the CENTURY 21 Luxe Marbella website
(<https://marbellaluxe.es>), an international luxury real-estate agency on the
Costa del Sol.

This is an **entirely separate project** from the Marbella Interior Design
repository. Marbella Interior Design is **not** the design template. Do not
modify that repository, and do not carry its art direction across. This is a
fresh design.

### The conceptual formula

> **Apple-level interaction quality**
> **+ CENTURY 21 Luxe identity**
> **+ Marbella luxury real estate**
> **+ exceptional property photography**
> **+ completely original art direction**

### The governing idea

**The property is the product.**

A €2M–€10M villa deserves the same digital presentation discipline that Apple
gives a flagship device. The primary interaction benchmark is
<https://www.apple.com/es/macbook-pro/>: full-bleed imagery, sticky scroll
staging, restrained type at very large sizes, one easing curve used everywhere,
specification presented as data rather than as marketing copy, and generous
negative space. Build toward that standard.

---

## 2. Required sections

The redesign must cover all of the following.

| # | Section | Requirement |
|---|---|---|
| 1 | **Animated intro** | A full cinematic opener in front of the site. See §3a. |
| 2 | **Cinematic hero** | One property, full-bleed, staged entrance. Not a slogan over a stock photo. |
| 3 | **Curated properties** | A small, deliberate selection — not a dump of the whole feed. |
| 4 | **Featured property feature** | The most expensive listing gets an extended editorial spread. |
| 5 | **Location explorer** | Every market the agency trades in, explored one at a time. |
| 6 | **Property feature explorer** | Architecture / Interiors / Views / Location / Lifestyle selector. |
| 7 | **Property search** | Filterable by type, market, budget and bedrooms, updating live. |
| 8 | **Property detail experience** | Hero, specification strip, narrative, gallery with lightbox, related properties. |
| 9 | **Rentals** | Long-term rentals, plus short-term and landlord services. |
| 10 | **Services** | Valuation, renovations, architect studio, buying agent, developers. |
| 11 | **Team** | The real team, with real roles and languages. |
| 12 | **Seller section** | Valuation and marketing services for owners. |
| 13 | **Investment section** | Purchase costs and the buying-from-abroad case. |
| 14 | **About & careers** | Who the agency is, and how to work for it. |
| 15 | **Contact** | Real office, phone, email; a working enquiry path. |
| 16 | **Proposal mode** | See §6. |

### Full content coverage — required

The redesign must cover the agency's **whole business**, not just villa sales. That
means every property type they trade in — villas, apartments, penthouses, new
developments, plots and land, commercial premises, hotels, and rentals — and every
service they publish. A redesign that quietly drops their rentals, commercial or
renovations business is not a redesign of their site.

Where the live site spreads one subject across several near-identical pages (five
"Renovations <town>" pages, for instance), consolidate rather than reproduce.

---

## 3a. Where the animation goes

**The intro is animated. The site is not.**

- The **intro** is a full cinematic opener — plates cross-fading behind the
  wordmark, the markets cycling, and the panel lifting to reveal the hero. Spend
  the animation budget here.
- **Everything after it is presented normally.** Properties appear in a
  conventional grid. The featured residence is a magazine spread, not a
  scroll-hijacked stage. Sections reveal gently on scroll and otherwise stay
  still.
- The intro plays **once per session**, on the homepage only. Deep links to a
  property or a service never sit behind an animation. It is skippable from the
  first frame and never plays for a visitor who has asked for reduced motion.

Scroll-jacking, pinned stages and multi-screen scroll narratives are explicitly
out of scope for the property pages. They demo well and they make the most
expensive property on the site harder to read than the cheapest.

## 3b. Writing

**Write normally.** Full sentences, real paragraphs, the register of a good estate
agency that respects its reader.

- Property descriptions run to three or four substantial paragraphs, not three
  clipped lines. Say what the house is, how it is arranged, what the plot does,
  and what the area actually offers.
- Section copy carries two paragraphs where one would leave the reader short.
- Avoid the aphoristic, clipped, one-clause-per-line style. It reads as styling
  rather than as information, and buyers spending millions want information.
- Never pad. Fuller does not mean vaguer — every added sentence should carry a
  fact, a number or a genuine judgement.

## 3. Art direction rules

- **Original.** No template look, no borrowed layout, no reuse of the Marbella
  Interior Design system.
- **Gold is a hairline, never a fill.** CENTURY 21 Relentless Gold appears on
  rules, eyebrows and prices. It does not become a background colour except on a
  single primary action.
- **Type does the work.** A light editorial serif at display sizes; a tight
  grotesk for everything else. Numeric data is always tabular so columns align.
- **One easing curve** for the entire site.
- **One ground.** Near-black throughout, broken exactly once by a light section,
  so the change of ground signals a change of audience.
- **Whitespace is the luxury signal**, not ornament.

### Imagery rules

- Property imagery must be **real imagery of the real listings**. No stock
  photography anywhere on the site.
- Imagery is **downloaded into the repository** and served locally. The site must
  never hotlink the client's listing-feed CDN at runtime.
- **Never publish a watermarked frame.** Feed images carrying a burned-in CDN
  watermark are unusable at luxury presentation scale — exclude the listing
  rather than crop around it, and record the exclusion.
- Every image used must be recorded in the asset manifest in `CLAUDE_CONTEXT.md`
  with its source, resolution, property, and where it is used.

---

## 4. Data rules

- **Never rely on memory for property data.** Reference, price, bedrooms,
  bathrooms, built area, plot and terrace are read from the client's own listing
  pages and recorded in `CLAUDE_CONTEXT.md` with the source URL.
- Narrative and marketing copy may be written for the redesign. **Hard numbers
  may not be invented.**
- Business facts (address, phone, email, team, languages) come from the live
  site and are recorded under "Verified Business Information".
- Anything that could be read as tax, legal or investment advice must be stated
  as indicative and explicitly disclaimed.

---

## 5. Responsive, animation and QA requirements

### Responsive

- Works from **375px** upwards. No horizontal overflow at any width.
- Touch targets are comfortable; the desktop rail becomes a swipeable rail, not a
  cramped grid.
- Type scales fluidly with `clamp()` rather than snapping between breakpoints.

### Animation

- Motion is **staged, slow and singular** — long tails, near-instant attack.
- Above the fold: a load-time staged entrance.
- Below the fold: a scroll-driven reveal.
- Full-bleed stills drift slowly so a static photograph still breathes.
- **`prefers-reduced-motion: reduce` must disable all of it** and leave the site
  fully usable.
- Animation must never be implemented by mutating DOM that React owns.

### QA — before any session ends

1. `npm run build` must pass.
2. Fix genuine errors. Do not silence them.
3. `git status`, review `git diff`.
4. Update `CLAUDE_CONTEXT.md`.
5. Update `README.md` if the commands or structure changed.
6. Commit completed work with a descriptive message.
7. Push to `origin/main` if authentication is available.
8. **Confirm the push succeeded. Never claim work was pushed unless Git confirms it.**

### Autonomous visual audit

The build is not finished when it compiles. Screenshot every section at desktop
and mobile widths, look at the images, and fix what is wrong — contrast,
collisions, clipped insets, repeated photography. `npm run audit` exists for
this. Re-audit after fixing.

---

## 6. Proposal mode

The site supports `/?proposal=true` on any route.

- **Normal mode** — the redesigned CENTURY 21 Luxe website, exactly as a client
  or buyer would see it. No trace of the proposal.
- **Proposal mode** — the same website, plus a private commercial overlay.

Proposal mode must carry across internal navigation, so the whole site can be
browsed from a single link without dropping back to normal mode.

The proposal presents:

```
Typical bespoke redesign
€1,500+

Your redesign
€300
Summer offer · One-time fee
```

Keep it visually premium. It is a private document shown to a client, not a
pricing page.

---

## 7. Git workflow

All meaningful work stays inside `Danizarg/MarbellaLuxe`.

Use descriptive commits:

```
feat: initialize MarbellaLuxe redesign
feat: build cinematic luxury property hero
feat: add flagship property storytelling
feat: build interactive location explorer
feat: add luxury property detail experience
feat: implement proposal mode
fix: improve mobile property experience
docs: update Claude project context
```

Never use meaningless commits: `changes`, `stuff`, `update`.

---

## 8. Cross-PC continuity — mandatory

This project may be worked on from several computers. A future workflow may be:

```bash
git clone https://github.com/Danizarg/MarbellaLuxe
```

…followed by a brand-new Claude Code session whose entire instruction is:

> Read MASTER_PROMPT.md and CLAUDE_CONTEXT.md, inspect the repository and continue.

**That must be sufficient.** Therefore never allow important information to exist
only in a Claude conversation. If a future session would need to know it, it goes
in the repository.

---

## 9. Required repository files

| File | Purpose |
|---|---|
| `MASTER_PROMPT.md` | This file. The permanent specification. |
| `CLAUDE_CONTEXT.md` | Persistent development memory. Updated every session. |
| `README.md` | Project purpose, install, run, build, structure, deployment. |
