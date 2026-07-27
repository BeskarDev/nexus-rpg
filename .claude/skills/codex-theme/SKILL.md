---
name: codex-theme
description: "Design and build UI for the Nexus RPG codex theme — carved-stone cards, bronze SVG ornaments, chips and badges, and the MDX/generator components that render game content. Use when adding or restyling any component in src/components/codex/, drawing SVG ornaments, touching chip or badge styling, or building a card for a new content type."
---

# Codex Theme — Nexus RPG

The site's visual language is **carved stone inlaid with bronze**: a Bronze-Age codex
rather than a web app. This skill holds the accumulated rules for building in it, most of
them learned by getting them wrong first.

Three references carry the depth:

- **[references/ornament-craft.md](references/ornament-craft.md)** — drawing SVG ornaments
  (keystones, corner rails, dividers). Read before drawing anything.
- **[references/component-patterns.md](references/component-patterns.md)** — the React /
  MDX / remark-plugin traps that silently break content. Read before building a card or
  a generator.
- **[references/art-direction.md](references/art-direction.md)** — the illustration brief:
  two registers (wide Moebius plates, hatched D&D-3.5-style figures), the palette lock,
  prompt templates and the acceptance checklist. Read before generating or replacing any
  banner or folk/creature artwork.

## Composition, not just surface

A page can pass every rule below and still read as a web app, because the theme
lives in the *composition* as much as the styling. Three tells, all found on the
old homepage:

- **A translucent panel floating over a photograph.** The scrim-over-hero is the
  streaming-service pattern, and it makes the artwork spend most of its area
  being covered up. Art belongs in a bounded, framed **plate** — carved edges,
  its own keyline — with the words on stone beside or beneath it.
- **A grid of equally-weighted tiles.** That is a dashboard. A codex opens on a
  **contents page**: ruled rows, a mark, a name, and a line saying what is
  inside. It is also the better navigation, because ten naked labels tell a
  newcomer nothing.
- **No hierarchy.** Decide who is arriving and what the two or three things they
  could want are, give those weight, and let everything else be an index.

Verify the layout at 430px as well as full width — a two-column index loses its
alignment long before three cards get uncomfortable.

## The one rule that gets broken most

**Never use a straight rule as a grouping device.** A keyline is right as a *frame or
border on a container*. A bare `border-left` or long rule used to bind, group or accent
content reads as flat digital UI chrome against carved stone, and it has been rejected
three separate times: the spell card's 3px left accent bar, `TalentCard`'s per-rung
"ladder rail", and `CreatureStatBlock`'s section left-bar.

**To group content: a background wash, spacing, or a carved SVG ornament. Never a bar.**

## Flat, always

No drop shadows, inset bevels, glossy highlights, or struck-metal depth effects — a
beveled plaque reads as a generic web button. Get material character by flat means:
keyline borders, flat fills, inlaid motifs, engraved hairlines, concentric borders.

`outline` with a negative offset is a legitimate flat second keyline. `filter:
drop-shadow` is not, even when used as an outline.

## Colour

- **Bronze on stone is the whole page.** `--ifm-color-primary` is bronze; surfaces are
  `--ifm-background-surface-color`. Mix with `color-mix(in srgb, … , transparent)` rather
  than hard-coding tints, so both themes track.
- **Nothing carries a block of saturated colour.** Chips originally had solid fills and
  read as stickers laid on carved stone — the clash was the colour MASS, not the hue. The
  fix was to move colour from the fill to the **ink** (see Chips below).
- **To stay legible in both themes, mix a hue toward `--ifm-font-color-base`**, not toward
  white or black. That token is light on dark and dark on light, so one declaration
  lightens the hue in dark mode and darkens it in light mode while holding the hue.
- Jewel tones (lapis / carnelian / emerald) are reserved for KEY or divine marks, never
  general accents. Rune-cyan is reserved for magic.

## The card family

Every generated content type gets a card in `src/components/codex/`, sharing `CardFrame`
(four diamond corner marks plus a top-edge keystone) but differentiated by weight and
motif:

| Card | Keystone | Frame weight | Why |
|---|---|---|---|
| `SpellCodexCard` | winged sun disc | nested concentric border | the primary content; concentric is its mark of primacy and **nothing else may use it** |
| `CombatArtCard` | crossed khopeshes | single frame | middle weight; long rule text, no stat band |
| `TalentCard` | stepped ziggurat | single frame | the rank ladder inside already supplies structure |
| `ConditionCard` | twin serpents | single thin frame, dense | many short entries; subordinate on purpose |
| `CreatureStatBlock` | horned bull | single frame | densest content; internal structure does the work |

Corner rails match the keystone per family, so a card's corners echo its own motif.

**A new content type gets its own keystone and corner rail**, drawn to
[references/ornament-craft.md](references/ornament-craft.md). Check the keystone's
overhang against the card's `margin-top` — a taller motif needs more clearance or it
collides with the card stacked above.

## Chips and badges — a graded system

Four registers, quietest to loudest. Picking the wrong one is the most common styling
mistake, because they all look similar in isolation.

| Register | Use | Treatment |
|---|---|---|
| `LoreTag`, `TraitItem` | reading-only values that never matter mid-combat | faintest wash or hairline, no border |
| `StatBadge`, weapon tags, tier chip | mechanical *values* on a card | keyline + faint wash, small caps |
| `Cartouche` | a *label* that heads a row or field | tapered nameplate with end bars |
| plugin chips (skill / damage / weapon / attribute) | auto-detected game keywords | per-family clip-path silhouette + coloured ink |

**Plugin chips carry identity in the INK, not a fill.** Each is a keyline around the card
surface with its identity hue on the text. Per-family silhouettes:

- **skill** — pointed tag, both ends (a banner: a named proficiency)
- **damage** — cut-corner tessera (an inlaid stone chip)
- **weapon** — chevron, pointed right (a blade profile)
- **attribute** — plain square, hard corners (a die face)

A clipped shape **cannot take a `border`**, so the outline is two flat layers: a keyline
beneath, and the card surface inset 1.5px above it punching the middle out. Any unclipped
chip must use a **1.5px** border to match that visual weight, and **no border radius** —
the clipped families have hard vertices by construction, so a radius anywhere else is the
only rounded corner in the set.

Identity hues live in `--chip-fill`, set per variant in `custom.css`.

## Type scale — never write a raw font-size

Every size comes from one ladder of tokens in `custom.css`. Before it existed there were
**28 distinct rem values across 69 declarations**, some 0.32px apart — differences nobody
can see, but each one a decision to re-make.

| Token | px | For |
|---|---|---|
| `--nexus-text-3xs` … `-2xs` | 10, 11 | micro captions, badge + cartouche labels |
| `--nexus-text-xs` | 12 | chips, TOC, breadcrumbs |
| `--nexus-text-sm` | 14 | nav UI (navbar, sidebar, paginator), card meta |
| `--nexus-text-dense` | 15 | tables, creature stat block — **scan** surfaces |
| `--nexus-text-base` | 16 | body prose |
| `--nexus-text-md` / `-lg` | 18, 20 | h4, card titles |
| `--nexus-text-xl` / `-2xl` / `-3xl` | 22, 28, 36 | h3 / h2 / h1 ceilings |

Three rules that go with it:

- **`html` stays at the browser's 16px.** Overriding the root font size breaks the
  reader's own zoom setting. Build on top of it.
- **h1/h2/h3 are `clamp()`, not fixed.** Infima ships a `<576px` step-down, but it works by
  reassigning `--ifm-h*-font-size`, so any rule setting `font-size` directly defeats it —
  that is how h1 stayed at 38.4px on a 390px phone. `clamp()` cannot be defeated and has no
  breakpoint jump.
- **h4 must stay above body size.** Infima's default h4 is 1rem, which sat *below* the
  reading size. Check any heading level you touch against `--nexus-text-base`.

**Reading measure is `--nexus-measure` (42rem / ~84 characters of Spectral).** It caps the
whole vellum SHEET — `.theme-doc-markdown` is `max-width: measure + 2 × --nexus-sheet-padding-x`
— so prose, tables, cards and code all describe **one right edge**. The measure is also still
applied to prose at any depth, which is what keeps a card's rule text from running to the
card's full frame width.

It got here the hard way. It began at 36rem on the prose elements *only*, with tables and
cards keeping the full ~813px column, on the theory that a wide figure outdenting past a text
column is how a printed manual sets one. In practice prose stopped 237px short of every table
on the page and the ragged edge read as broken. Two standing rules fall out of that:

- **Never cap prose and leave a sibling block uncapped.** Whatever the sheet contains shares
  its edge.
- The measure is still the lever for *density*: a 92-character line was what forced the 1.8
  leading that made the whole site read oversized. Fix the measure before reaching for a
  smaller font — but move the sheet with it.

## Density

Cards inherit Infima's open reading-column rhythm, which is far too airy for a stat block.
Every card scopes its own tightening: paragraphs ~0.3–0.4rem bottom margin, near-flush
lists, and **zero `li > p` margins** — markdown wraps multi-line list items in `<p>`,
which silently re-inflates every gap you just closed.

## Accessibility, non-negotiable

- Decorative SVG is `aria-hidden`; the text label always sits beside it.
- A custom mark must not be the only carrier of meaning — `DieToken` shows the numeral
  inside the polygon and puts the full value in an `srOnly` span.
- Disclosures use `aria-expanded` + `aria-controls`, and their panel stays **rendered and
  `hidden`** rather than unmounted, so the prose stays in the static HTML for the search
  index.
- Animation respects `prefers-reduced-motion` in BOTH the component and the CSS.
- A stat glyph must state what the stat actually does. A running figure for Dodge was
  wrong — Dodge is the defense against *ranged* attacks — and a glyph that misstates the
  rules is worse than no glyph.

## Where things live

| What | Where |
|---|---|
| Codex components | `src/components/codex/` (+ `index.ts` barrel) |
| Ornament kit | `src/components/codex/ornaments.tsx` + `.module.css` |
| Sigils | `src/components/codex/sigil-paths.ts` (geometry) + `sigil-geometry.ts` (drawing primitives) + `page-sigils.ts` (doc → mark). Rules: `references/ornament-craft.md` § Sigils |
| Sigil tooling | `bun run sigils:check` (design law, in CI) · `bun run sigils:masks [--check]` (navbar mask block in `custom.css`, in CI) · `bun run sigils:sheet [out.png]` (contact sheet) · `/dev/sigils` (dev-only review gallery) |
| Global MDX registration | `src/theme/MDXComponents.tsx` — a generated component MUST be registered here; also where markdown intrinsics are remapped (`hr` → `LozengeDivider`, `table` → `DocTable`) |
| Theme swizzles (all wrappers) | `src/theme/` — `Admonition/Layout` (type sigil), `Footer/Layout` (colophon crest + wordmark), `DocSidebarItems`, `DocBreadcrumbs` |
| Chips, global tokens, bullets | `src/css/custom.css` |
| Content generators | `src/utils/content-gen/` |
| Remark plugins (keywords, chips) | `src/remark/` |

## Working rules

- **Verify in the built output, not the source.** The CSS minifier silently collapses some
  shorthands, and rule order decides which of two `!important` declarations wins. Grep
  `build/assets/css/*.css` and the built HTML.
- **Ask before a site-wide restyle.** Chip styling touches every page; card styling
  touches one content type. The blast radius should match the confidence.
- **The owner reviews visually.** Geometry, symmetry, text-loss and markup can be verified
  mechanically and should be. Whether it *looks* right cannot — say so rather than
  implying a screenshot was checked.
