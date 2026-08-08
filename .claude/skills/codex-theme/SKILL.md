---
name: codex-theme
description: "Design and build UI for the Nexus RPG codex theme — carved-stone cards, bronze SVG ornaments, chips and badges, and the MDX/generator components that render game content. Use when adding or restyling any component in src/components/codex/, drawing SVG ornaments, touching chip or badge styling, or building a card for a new content type."
---

# Codex Theme — Nexus RPG

The site's visual language is **carved stone inlaid with bronze**: a Bronze-Age codex
rather than a web app. This skill holds the accumulated rules for building in it, most of
them learned by getting them wrong first.

Two references carry the depth of the build side:

- **[references/ornament-craft.md](references/ornament-craft.md)** — drawing SVG ornaments
  (keystones, corner rails, dividers). Read before drawing anything.
- **[references/component-patterns.md](references/component-patterns.md)** — the React /
  MDX / remark-plugin traps that silently break content. Read before building a card or
  a generator.
- **[references/printed-card-craft.md](references/printed-card-craft.md)** — the 63 × 88mm
  printed cards. Ink instead of bronze, keyline instead of wash, points instead of `rem`,
  and the layout laws the measured autofit imposes on any card's markup. Read before
  touching `PlayingCard`, `playingCardStyles.css`, or a print card under `src/features/`.

The illustration brief is split across eight files so a task pays only for the concern it
touches, and **[references/art-direction.md](references/art-direction.md)** is the hub. Read
it before generating or replacing any banner or folk/creature artwork: it carries the
drawn-not-rendered premise, the shared spine, the palette lock, modesty and presentation, plus
the routing table for the seven concern files (registers, plate composition, setting, folk,
gods, creatures, prompting, acceptance).

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
**four** separate times: the spell card's 3px left accent bar, `TalentCard`'s per-rung
"ladder rail", `CreatureStatBlock`'s section left-bar, and the oracle answer plate's
`border-left: 3px solid var(--nexus-bronze)`.

**To group content: a background wash, spacing, or a carved SVG ornament. Never a bar.**

The fourth one is instructive, because it arrived reasoned rather than careless: the
commit called it "the same vocabulary as admonitions." An admonition is not the licence —
the theme's own admonitions carry a *type sigil* (`src/theme/Admonition/Layout`), and it
is the sigil doing the work, not an edge. If a panel needs more presence than a wash,
give it a mark, not a thicker side.

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

**Reading measure is `--nexus-measure`**, `clamp(42rem, 30rem + 20cqw, 48rem)` on a doc
sheet. It caps the whole vellum SHEET — `.theme-doc-markdown` is
`max-width: measure + 2 × --nexus-sheet-padding-x` — so prose, tables, cards and code all
describe **one right edge**. The measure is also still applied to prose at any depth, which
is what keeps a card's rule text from running to the card's full frame width.

It got here the hard way. It began at 36rem on the prose elements *only*, with tables and
cards keeping the full ~813px column, on the theory that a wide figure outdenting past a text
column is how a printed manual sets one. In practice prose stopped 237px short of every table
on the page and the ragged edge read as broken. Two standing rules fall out of that:

- **Never cap prose and leave a sibling block uncapped** *while left-aligning both*. Whatever
  the sheet contains shares its edge. The failure was **asymmetry** — all the slack piled on
  one side. A narrower block **centred** in a wider sheet is fine, and is what a spread page
  does (below).
- The measure is still the lever for *density*: a 92-character line was what forced the 1.8
  leading that made the whole site read oversized. Fix the measure before reaching for a
  smaller font — but move the sheet with it.

**The ceiling is deliberately low (48rem / ~96 characters).** A single column must not absorb
a wide monitor; the answer to a wide screen is a second column, not a longer line.

### The spread page

A page containing a `<Columns>` segment is a book page, not a reading column, so its sheet
widens to `--nexus-spread-measure` (68rem of content = two 32.75rem tracks + a 2.5rem gap,
~65 characters each — the measure law holds *per track*). Everything that is not a segment
stays at the measure and is **left-aligned**.

**A spread page has exactly TWO widths, and every block edge lands on a track edge.**

- **One track** — running text and the headings that introduce it, so a paragraph outside a
  segment is indistinguishable from one inside it.
- **Both tracks** — the page title, banner plates, tables, figures, cards. A figure spanning
  the page is the convention, and a table squeezed into half a page is worse than useless.

There is no third width. There used to be: the old single-column reading measure (48rem),
which matched neither a track (32.75rem) nor the page (68rem), so the banner stopped 244px
short of the segment below it for no reason a reader could infer. That is what made a spread
page read as two layouts stacked.

Everything is **left-aligned**, so a one-track block reads as column one of a two-column page
rather than as a narrow thing floating in a wide one.

Two traps when implementing this:

- **Derive the track from `100%`, not from `--nexus-spread-measure`.** The token is the ideal
  68rem, but the sheet is capped by the doc column and is routinely narrower — computing from
  the token gave prose a 524px track beside a real 486px one, recreating the exact
  misalignment being fixed.
- **Watch specificity.** The `> *:not(.codex-columns)` reset is (0,3,0) and silently beat the
  prose rule at (0,2,1), so every paragraph took the full page width. The prose rule carries a
  redundant `:not(.codex-columns)` purely to reach (0,3,1).

The trigger is `:has(.codex-columns)`, not front matter, so conversion is incremental and an
unconverted page renders byte-for-byte as before.

### Auto-segmentation

`src/remark/auto-columns-plugin/` wraps content in `<Columns>` at build time, so most pages
spread without being hand-marked. A run is cut at a `##` heading, a banner, a `<Columns>`, or
any JSX block.

**The placeable unit is a SECTION** — a heading plus everything under it — not a loose block.
Each multi-block section is wrapped in a `.codex-keep` box, sections are *packed* into
spreads, and the browser places whole sections into tracks instead of fragmenting prose
across them. Three consequences, each learned the hard way:

- **Columns are usually UNEQUAL, and that is correct.** A spread is as tall as its taller
  section, like a manual's page. Capping a block at half a spread — on the theory that a
  block taller than one column can't sit in one — was an *invented* constraint, and it tore
  the magic-item material tables out of the layout instead of pairing them.
- **`maxColumnLines` is the only height limit that means anything**, because a column is what
  the screen has to hold. Total height is *not* a test: rejecting tall runs left 156 runs and
  whole pages (all of Character Creation) in one column, which saves the reader no scrolling
  and just loses half the page. A run too tall becomes *several* spreads.
- **Chrome ignores `break-after: avoid` in multicol.** Keep-with-next must therefore be
  expressed as keep-*together*: the `.codex-keep` box, which `break-inside: avoid` does honour.

**Docusaurus rewrites images before any user remark plugin runs.** `transformImage` turns
every markdown image into an `mdxJsxTextElement` named `img` whose alt is an *attribute* —
there is no mdast `image` node left to match. A check written against `image` passes every
unit test (those parse markdown directly) and matches **nothing in a real build**: banners
were swept into spreads at one column wide, and the floated-portrait guard silently never
fired. Read both shapes, and build the JSX shape by hand in tests. The same applies to the
page `<header>`, which arrives as an `mdxJsxFlowElement`, not a `heading`.

Two traps in the height estimate, both of which silently broke layout:

- **Count hard line breaks.** Table cells carrying a description, a blank line and a rule
  estimated at 26 lines when they rendered at 56. Ignore `break` nodes and every such table
  is under-measured by half.
- Add per-row cell padding; no text measure can see it.

**Everything spreads, including generated content cards.** Only three things still break a
run: the page `header`, a hand-written `<Columns>` (or the pass would re-enter it), and a
banner. `breakDepth` is **1**, not 2 — breaking at every `##` predates the section model and
meant two `##` sections could never pair, so a page whose headings were all `##` stayed
single-column no matter how much content it held.

Two subtleties in how a section is bound, both load-bearing:

- **Sharing a spread → bind the section whole**, so the browser places one section per track.
  **Alone in a spread → bind only the heading and `minSectionLines` of its opening**, and let
  the rest flow. Binding a lone section whole makes it one indivisible box in one track and
  leaves the other *empty*.
- A section taller than `2 × maxColumnLines` is cut into several spreads: flowing across two
  tracks only halves it, so past that it still overruns the screen.

Measure the **placed items**, not the sections, when testing dominance and overflow — every
child of a spread is `break-inside: avoid`, so each item is atomic once emitted. And do not
charge the keep-together wrapper the card-frame constant: it is a bare `div`. That single
overshoot pushed one page (70.8 lines against a 72 limit) out of the layout entirely.

A floated plate still blocks a spread. Escape hatches are front matter `columns: false`, an
explicit `<Columns>`, and plugin options in `docusaurus.config.js`.

**A block can never "break out" of the sheet.** `.theme-doc-markdown` is *both* the vellum
surface (background, padding, radius) *and* the width cap, so anything wider than the sheet is
wider than its own background and hangs off the parchment. This was tried — measuring the doc
column in JS and pulling wider with negative margins — and it cannot be tuned into working.
**Widen the sheet instead.**

Two related traps, both hit during that attempt:

- **Bare `cqw`/`cqi` units resolve against the NEAREST container, ignoring names.** Only named
  `@container <name> (…)` *at-rules* walk past an intervening container. `100cqw` inside the
  doc flow therefore measures `.markdown`'s own already-capped box, never a wider ancestor.
- **Infima's `.container` caps the whole page row** at `--ifm-container-width-xl` (stock
  1320px, here 2000px) and is *stepped*, not fluid — so the doc column plateaus at a fixed
  width for every viewport above the breakpoint. Widening the sheet is pointless until this is
  raised, and the plateau is the number to size against. Measure it; don't assume it.

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
| Printed card shell + geometry | `src/components/PlayingCard.tsx` + `playingCardStyles.css`; the fit engine in `src/components/autofit/`. Rules: `references/printed-card-craft.md` |
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
