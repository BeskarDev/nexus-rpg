---
name: docs-layout
description: "Shape markdown in docs/ so the auto-columns plugin lays it out well — two-column spreads, section sizing, tables and plates that fit a track. Use when editing or reformatting doc pages for layout, running a content formatting pass, diagnosing why a page renders single-column, or tuning the auto-columns plugin."
---

# Docs Layout — Nexus RPG

Every doc page is laid out by `src/remark/auto-columns-plugin/`, which wraps runs of
content in `<Columns>` at build time. **You do not write the layout; you write markdown
that the plugin can lay out.** This skill is how to do that, and how to find out what it
actually did.

The visual language those spreads sit in — the sheet, the measure, the keep-together box —
belongs to `codex-theme`. Read that skill for *why* the layout looks the way it does; read
this one for *how to write pages for it*.

## The one command

```bash
bun run layout:report                     # whole corpus
bun run layout:report docs/05-combat      # one chapter
bun run layout:report --worst 30          # + boxes nearest the column limit
```

It reports, per page: how many spreads formed, which runs were refused and **why**, and
which boxes come closest to the column limit. It calls the plugin's own exported functions,
so it cannot drift from a real build.

The script itself runs under **`node --experimental-strip-types`, never `bun`** — bun 1.2.x
cannot resolve `unist-util-visit-parents/do-not-use-color` in remark's dependency tree. The
`layout:report` npm script already invokes node; that is the only reason it is not a `bun`
script like every other one in `package.json`. It is also why the plugin imports `unist` with
`import type` — don't "fix" that back.

**Start a formatting pass by running it.** Do not open pages and guess.

## The mental model

A page is cut into **runs** at breakers, each run is split into **sections** (a heading plus
everything under it), sections are **packed** into spreads, and each spread is emitted only
if it passes the tests below.

| Concept | What it is |
|---|---|
| breaker | ends a run outright: the page `header`, a hand-written `<Columns>`, a `banner-img`, `---`, front matter, an `import` |
| section | a heading + all blocks until the next heading. Blocks before any heading are one-block sections |
| box | what actually gets placed in a track. A bound section, or a loose block. **Every box is `break-inside: avoid`** |
| spread | one `<Columns>` block: a set of sections packed to fit two columns |

Defaults that matter when writing: **~65 characters per track line**, **72 lines max per
column**, **12 lines minimum** to bother spreading, **9 lines** minimum kept beside a heading.

## Two layout modes

A run is partitioned into **card** stretches and **prose** stretches, and they lay out
differently. Both end up as `<Columns>`; only the mode differs.

| Mode | For | Placement |
|---|---|---|
| `flow` (multicol) | prose | down one track, up the next |
| `grid` (CSS grid) | a run of cards | row-major: card 1 left, card 2 right, card 3 left |

Grid is not a preference for cards. Multicol makes each column a fragmentainer, and Chrome
resolves an absolutely-positioned descendant against the **wrong** one — a creature card's
keystone rendered in the opposite column, a thousand pixels from its card. Grid places whole
boxes and has no fragmentainers.

### The ornament-in-the-wrong-column bug

The single most recurring fault in this layout, hit three times from three directions: a
blockquote's corner diamonds painted twice, half-cut, on the table above it; a creature card's
keystone in the opposite column; an `h2`'s cornice diamond stuck in the left column while its
heading sat in the right. **One cause: Chrome mishandles absolutely-positioned descendants
inside a multicol fragmentainer**, and the codex is built on abspos ornament.

**The fix is one rule — every direct child of `.columns` is monolithic:**

```css
.columns > * { display: inline-block; width: 100%; vertical-align: top; }
```

An inline-block cannot be fragmented, so there is no second fragment to paint into and no
ambiguity about which column a box belongs to. `break-inside: avoid`, `contain: layout`,
`overflow: clip` and forcing a stacking context were each tried and **none worked**.

Two things that rule needs:
- `.columns { font-size: 0 }` with the size restored on each child. Inline-blocks honour the
  newline markdown puts between blocks, which would otherwise become a visible gap.
- It must NOT apply in grid mode (`.grid > * { display: block }`) — grid items are placed, not
  fragmented, so the scaffolding is unnecessary there.

Replacing multicol wholesale was tried and reverted: it also fixes the bug, but it hands
column balancing from the browser to the plugin's height estimates, which is a real quality
loss across every prose spread. **Prefer the monolithic rule; keep the browser balancing.**

**A card grid is deliberately not height-bounded.** Row-major scanning never sends the reader
back up a column, so the scroll-back argument that shapes the prose path does not apply.

Cards in a grid have their **vertical margins zeroed**; the row gap owns that spacing. Grid
margins do not collapse, so leaving both stacked a card's own `margin` onto the gap. The
`1.5rem` row gap is a **floor, not a taste** — the deepest keystone overhang in the kit is
21px, and a smaller gap puts an ornament on top of the card above it.

Which sections become a grid:

- **two or more consecutive bare cards** (no heading of their own)
- **a heading whose whole section is ≥2 cards** — the generated spell pages, `## Rank 0`
  followed by every card of that rank. The heading is emitted directly above the grid.
- **never a heading with ONE card.** `## Curse Effects` plus a `RollableTable` stays an
  ordinary section. Partitioning by card-ness on *raw nodes* instead of sections put that
  heading in a flow spread's right-hand column with its table dumped full-width beneath —
  the two severed. Partition on **sections**.

## Reading a refusal

The report names one of five reasons. Each has a different fix.

| Reason | What it means | Usual fix |
|---|---|---|
| `too-few-boxes` | fewer than 2 placeable boxes — one track would fill, the other stay empty | split a monolithic table, or add sub-headings so sections form |
| `too-short` | under `minLines` | usually correct; leave it |
| `one-box-dominates` | one box is >82% of the spread, so tracks come out lopsided | break the giant block up, or pair it with more content |
| `box-taller-than-column` | a single box exceeds 72 lines and cannot be split by the browser | split the section, or accept it going full-width single-column |
| `floated-plate` | a `folk-img` portrait is in the run; a 300px float in a 32rem track leaves three words a line | expected — leave it |

`too-few-boxes` and `one-box-dominates` are where a formatting pass earns its keep. Together
they are the overwhelming majority of refusals, and both mean *the same thing*: **the page is
one undifferentiated slab.**

## Writing markdown that lays out

**Give a long table sub-headings.** The equipment pages refuse with `too-few-boxes` because
each is a single 100-line table under one heading — one box, nothing to pair it with. Split
by category (`### Light Armor`, `### Heavy Armor`) and each becomes a section that can sit
beside another.

**Keep a section under ~72 lines.** That is one column. Past it the section flows across both
tracks, which is fine for prose but wrong for a table (a table cannot fragment, so it is
refused and goes full-width instead). Estimate: a table row costs roughly `ceil(rowChars/65)`
lines, **plus one line per `<br/>`** — see the estimation trap below.

**Heading depth is layout.** Only `#` ends a run. `##` and `###` both start sections and pair
freely, so use them for anything you would like to see side by side. A page whose headings
are all one level still works; a page with *no* sub-headings under a long `##` cannot pair
anything.

**Two comparable sections beside each other is the good case.** Sibling tiers, opposed
options, paired lists. Order them adjacently in the source and the packer will put them in
one spread.

**Uneven columns are fine.** A spread is as tall as its taller section, like a printed page.
Do not restructure content to make columns match.

## When to override

- **`<Columns>` by hand** — when the automatic bracket is wrong and you want an exact
  grouping. The pass never re-enters one. `docs/02-adventurers/01-folk.md` is the worked
  example.
- **`columns: false` in front matter** — a page that must stay single column.
- **Neither, usually.** Reach for the source shape first: an override freezes one page while
  a better heading structure improves every pass that follows.

## Estimation traps

Heights are estimated from source text at build time — there is no DOM. Two things fool it,
and both have silently broken layout before:

- **Hard line breaks.** Cells carrying a description, a blank line and a rule measured 26
  lines and rendered at 56. `<br/>` is counted now; if you add a construct that renders taller
  than its text length implies, check it against a real page.
- **The keep-together wrapper is not a card.** It is a bare `div`. Charging it the card-frame
  constant once pushed a page 1.75 lines over the limit and dropped it out of the layout
  entirely.

If a page lays out oddly and the numbers look fine, **measure the real thing** in the browser
rather than trusting the estimate:

```js
[...document.querySelectorAll('.codex-columns')].map(s =>
  [...s.children].map(c => ({
    tag: c.tagName,
    col: c.getBoundingClientRect().left < 600 ? 'L' : 'R',
    px: Math.round(c.getBoundingClientRect().height),
  })))
```

## Verifying a pass

1. `layout-report.mts` before and after — refusal counts should fall, and no page should
   newly go flat.
2. `bun run build`, then check the built HTML, not the dev server. **Plugin and config
   changes are not hot-reloaded**; a dev server started before your edit will show stale
   layout and has cost real debugging time. `.docusaurus/` also caches — `rm -rf .docusaurus`
   when output looks impossible.
3. Spot-check the widest and densest pages in a browser at ~1920px and at ~430px.
4. `bun run content:check` if you touched any generated page — those are regenerated from
   JSON and hand edits are rejected in CI.

## Docusaurus rewrites the tree before the plugin sees it

This is the trap that has cost the most time, and it makes unit tests lie.

`transformImage` runs before any user remark plugin and turns every markdown image into an
`mdxJsxTextElement` named `img`, with alt as an **attribute** — there is no mdast `image` node
left. The h1 likewise arrives as an `mdxJsxFlowElement` named `header`, not a `heading`.

A check written against the mdast shape therefore **passes every unit test** (those parse
markdown directly) **and matches nothing in a real build**. That is exactly how banners ended
up inside spreads at one column wide while the suite was green.

- Handle both node shapes in any new detection.
- Build the JSX shape by hand in tests — see `src/remark/__tests__/auto-columns-plugin.test.ts`,
  the "shape Docusaurus actually produces" block.
- When source and build disagree, **instrument the plugin during a real build** and dump the
  nodes. It is faster than reasoning about it.

## Where things live

| What | Where |
|---|---|
| The plugin | `src/remark/auto-columns-plugin/auto-columns-plugin.ts` (header comment carries the full rationale) |
| Registration + options | `docusaurus.config.js`, last in `remarkPlugins` |
| Tests | `src/remark/__tests__/auto-columns-plugin.test.ts` |
| `<Columns>` component + CSS | `src/components/codex/Columns.tsx` / `.module.css` |
| Sheet, measure, spread page | `src/css/custom.css` (`--nexus-measure`, `--nexus-spread-measure`, `:has(.codex-columns)`) |
| This report | `.claude/skills/docs-layout/scripts/layout-report.mts` |

## Working rules

- **Change the source shape before changing the thresholds.** A threshold moved to fix one
  page moves every page.
- **Retune against measured numbers.** When tuning a default, sweep it and print the outcomes
  rather than picking a value that sounds right — `maxColumnLines` was set that way, and the
  working band turned out to be narrow.
- **Never hand-edit generated `.mdx`** (spells, conditions, combat arts, talents, creatures).
  Edit the JSON and run `bun run content:gen`.
- **The owner reviews visually.** Counts, refusals and geometry can be checked mechanically
  and should be. Whether a spread *reads* well cannot — say so rather than implying you looked.
