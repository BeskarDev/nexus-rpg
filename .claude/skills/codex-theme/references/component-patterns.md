# Component Patterns — codex components, MDX and generators

The integration rules for `src/components/codex/`, the content generators, and the remark
plugins. Most entries here are **silent failures**: the page still builds and looks fine,
but content has quietly lost its links, its chips, or its meaning.

## 1. Rule text is markdown CHILDREN, never a JSX string prop

**The single most important rule on this page.** The keyword and chip plugins operate on
markdown text nodes. Anything passed as a prop is a plain attribute string, so it renders
unlinked and unchipped — and nothing warns you.

```jsx
<TraitItem>fire, poison damage, charmed</TraitItem>   ✅ chips + condition links
<StatBlockTrait immunities="fire, charmed" />          ❌ silently dead text
```

This has been hit **three separate times**: creature trait rows, the damage ladder's type,
and attack properties. Each time the fix was the same — move the value from a prop to
children.

**The dividing line:** props are for dice, integers and enum-ish values (`rank={3}`,
`parry={9}`, `target="vs. Dodge"`). Anything a player could look up — a condition, a
damage type, a weapon property, a skill — is rule text and must be children.

> "Stat-band values are props" is a rule about **dice and integers**, not a licence to prop
> anything that sits near the top of a card.

## 2. Moving text into a component changes what the plugins see

Both plugins skip text inside `heading`, `link` and `strong` ancestors. Entry names used to
be `**Bold**`, which meant that guard covered them. Wrapping them in `<EntryName>` dropped
them out of it, and "Undead **Nature**" started chipping "Nature" as a skill.

Anything holding a NAME rather than prose must be added to `NAME_ELEMENTS` in
`src/remark/shared/zones.ts`, which both plugins consult.

The mirror case: a component can also *establish* context the heuristics cannot see. The
chip plugin gates damage-type words on a nearby number or the word "damage" in the same
text node; once the card dropped that redundant word, `necrotic` arrived alone and stopped
chipping. `DAMAGE_ZONE_ELEMENTS` fixes that — being inside `<DamageLadder>` or
`<TraitItem>` satisfies the gate outright, because the container is a stronger signal than
any window of characters.

**Whenever you move content into or out of a component, check both lists.**

## 3. Keyword links carry an INLINE style — reset it with `!important`

The auto-keyword plugin writes its typography as an inline `style` attribute on the
anchor (`font-variant:small-caps;text-transform:lowercase;font-size:large`). An inline
style outranks any class selector, so a linked word inside a small badge renders at
`large` and blows the badge apart.

Every compact inline container (`.badge`, `.traitItem`, `.ladderKind`, `.encounterParts`)
needs a metric reset:

```css
.badge a:not(:global(.chip)) {
  font: inherit !important;
  font-size: inherit !important;
  font-variant: inherit !important;
  text-transform: inherit !important;
  /* … */
}
```

Exclude `.chip` — chips are deliberately styled marks, not stray links needing taming.
This is one of the few places `!important` is correct rather than lazy.

## 4. The CSS minifier drops some shorthands

`text-decoration: underline dotted color-mix(…)` is silently collapsed to plain
`underline`, losing both the style and the colour. Use longhand
(`text-decoration-line` / `-style` / `-color`).

**Always verify a rule survived into `build/assets/css/*.css`** — and remember rule ORDER
decides which of two `!important` declarations wins, so check where yours landed.

## 5. Register generated components globally

Anything a generator emits must be in `src/theme/MDXComponents.tsx`, or MDX renders it as
an unknown element. Also export from `src/components/codex/index.ts`. Forgetting either is
a build error, not a silent one — the only failure here that announces itself.

## 6. Generators: fail loud, never paper over

The generators shape-check as they run and **throw**, naming the offending entry. That
strictness has repeatedly caught real corruption, including a stray record accidentally
inserted into the wrong array during an edit.

- Reject unknown keys, not just missing ones — an unknown key is how a schema drifts entry
  by entry.
- Reject empty strings where a value is optional: omit the key instead, so a blank section
  can never render.
- Validate cross-references against the real data (an encounter template naming a creature
  that does not exist fails by name).
- Where the generator reformats content, **guard the reformat with a test**: the damage
  ladder is reconstructed back to its source string and compared, so a split that swallowed
  a clause would fail rather than ship.

## 7. Lifting children

A card may lift a child out of the flow — the `### Name` heading into a name row, a
`CreatureLore` block into the header. Match on **component type**, not position:

```jsx
const loreIndex = rest.findIndex(
  (child) => React.isValidElement(child) && child.type === CreatureLore,
)
```

Position alone is a silent contract that breaks the moment the generator's output order
changes.

## 8. Interactive components

- Prefer native elements. `<details>` gives a free, accessible disclosure — but note its
  summary and panel must be the same element, so it cannot place a toggle in a header and
  the panel elsewhere. That constraint is why the creature lore toggle is React state.
- Keep collapsed content **rendered and `hidden`**, not unmounted, so it stays in the
  static HTML for the search index.
- Clear timers on unmount, disable a button mid-animation, and gate motion on
  `prefers-reduced-motion` in both the component and the CSS.
- `Math.random()` and `Date.now()` are fine in an event handler, but never during render —
  they would differ between SSR and hydration.

## 9. Theming Docusaurus's own surfaces

Reach for the lightest mechanism that gets there — CSS on a stable class, then an
`MDXComponents` element map, then a swizzle that WRAPS `@theme-original/...`. Four traps
found doing the M8 default-theme pass:

- **A frame on a markdown `<table>` does not fit its rows.** Infima makes tables
  `display: block; overflow: auto`, so the table box spans the full column while the rows
  are only as wide as their content — a border floats detached (measured: a 759px frame
  around 344px of rows). Fix is the `table` element map to `DocTable`, which moves the
  scroll container and the frame to a wrapper and puts the table back to
  `display: table; width: 100%`. Pass props straight through so `thead`/`tbody` stay
  intrinsics — `RollableTable` finds them by element type.
- **Override Infima's `--ifm-*` vars instead of fighting its rules.** The admonition frame
  is entirely `--ifm-alert-border-width` / `-radius` / `-padding-*` / `-shadow` set on
  `.alert`; the theme keeps the box model and the result survives upgrades. A component
  that then needs its own padding back (`MagicCallout`) should set the same vars, not race
  the `padding` shorthand.
- **Theme-internal class names are hashed CSS modules.** `admonitionHeading_xJq3`,
  `codeBlockTitle_…`, `collapsibleContent_…`. Match the stable substring —
  `[class*='admonitionHeading']` — and add your own stable hook via the wrapper's
  `className` for anything you need to target precisely.
- **`prism-react-renderer` writes the code background as an inline style** on the `pre`,
  which outranks every class selector. The stone fill only lands with
  `background-color: transparent !important`.

An ornament tiled along a repeated element must be ONE full-width element. A frieze mask
put on each `th` restarts its phase at every column edge and seams. Sizing and weighting
that band is [ornament-craft §10](ornament-craft.md).

**An ornament that belongs to a FRAME must be `position: sticky` inside a scroll container.**
A block child of `overflow-x: auto` is only as wide as the *visible* box, so scrolling a wide
table right dragged `.codex-table-slab::before` out of view and left the cornice ending
mid-slab while the border — which never scrolls — carried on. `position: sticky; left: 0`
pins it back to the scrollport so frame and cornice stay one edge.

**To replace a theme icon, swizzle `@theme/Icon/<Name>` — never the component using it.**
Docusaurus routes every glyph through one of these, so a single file changes the artwork
everywhere it appears and inherits all of the caller's behaviour for free. `Icon/Arrow`
covers both the sidebar collapse button and the expand tab; `Icon/LightMode`,
`Icon/DarkMode` and `Icon/SystemColorMode` cover the three states of the colour-mode
toggle. Spread `{...props}` first so the caller's `className` lands, then set your own
`width`/`height`/`viewBox` after it.

Icons in a cluster must share a CONSTRUCTION, not just a size. The colour-mode set is one
rimmed disc through three states (rays + core → half-lit → crescent), which is what makes
it read as one control cycling rather than three unrelated pictures.

**Do not redraw a brand mark.** A glyph can be recut in the codex hand when a label sits
beside it carrying the meaning; a bare brand mark has no label and recognition *is* its
function. Style the setting instead — inset in a carved keyline roundel, matching the
colour-mode icons' ring-and-core build, silhouette untouched. Note such a mark is consumed
as a CSS mask, so its fill must be a literal colour: `currentColor` does not resolve inside
a masked or backgrounded image. (The GitHub mark that this rule was written for now lives
in the footer's link columns, not the navbar — see the mobile bar note below.)

### The navbar renders every item TWICE

Below 996px Docusaurus renders each navbar item a second time inside `.navbar-sidebar`, and
the two copies do **not** share a class: the top bar gets `.navbar__item`, the drawer gets
`.menu__link`. Three consequences, all of which shipped as bugs:

- **Never qualify a custom navbar class with `.navbar__item`.** `.navbar__item.navbar-sigil::before`
  set `content` only in the top bar, so the mask-image resolved in the drawer but the box
  never did and the phone's chapter list was naked labels. Use the bare custom class.
- **Infima hides the top-bar copies** with `.navbar__item { display: none }`, because the
  drawer already carries them. Any rule that gives those items a `display` at higher
  specificity (an icon cluster at 0,3,0) silently un-hides them into a bar with no room, and
  they overlap whatever else is on the right. Re-hide inside the mobile media query.
- **The mobile search container is `position: absolute; right: var(--ifm-navbar-padding-horizontal)`**
  (`Navbar/Search/styles.module.css`), on the assumption it is the only thing on the right of
  a phone bar. With a colour-mode toggle beside it the two are pinned to the same edge and
  sit on top of each other. `position: static` puts it back in the flex row, where the
  cluster's own `column-gap` and `align-items: center` align it like any other control.

Rules that override an earlier same-specificity rule must come LATER in `custom.css` —
a mobile media query near the top of the file loses to a desktop rule 1000 lines down.

## 10. Two units that silently do nothing

- **`ch` resolves against the ELEMENT's own font, not the body's.** A shared
  `--nexus-measure: 72ch` capped paragraphs at 576px but did nothing at all to headings:
  72ch of 28px Cinzel is wider than the column, so the `max-width` never bound. A measure
  shared across elements of different sizes must be an absolute length (`36rem`).
- **`font-size: large` is an ABSOLUTE keyword, not a relative one.** It is pinned at 18px
  and neither inherits nor scales, so the same declaration that is +7% in body text is
  catastrophic inside an 11px badge. The auto-keyword plugin emitted this for every game
  keyword, and three components had grown `font-size: inherit !important` resets to undo
  it. Relative emphasis is `em`; usually the right answer is to not set size at all.

When a `max-width` or `font-size` appears to have no effect, measure the rendered box
before assuming a specificity problem — check `build/assets/css/*.css` for the rule, then
read the computed width in the browser.

## 11. Restyling a third-party plugin (the search bar)

`@easyops-cn/docusaurus-search-local` is the awkward case, and it taught four things worth
reusing for any vendored component:

- **Prefer the plugin's own CSS variables to a selector.** It reads
  `--search-local-modal-background`, `-hit-background`, `-hit-shadow`, `-modal-shadow`,
  `-highlight-color`, `-hit-active-color`, `-muted-color`. Setting those in `:root` needs no
  specificity fight and survives upgrades. Only reach for a selector where the value is
  hardcoded (its 6px dropdown and 4px row radii are).
- **Equal specificity loses to load order.** Its `.searchBar .dropdownMenu` (0,2,0) ships in
  a stylesheet that loads AFTER `custom.css`, so a matching 0,2,0 selector silently lost.
  Winning needs one component more — `.navbar__search [class*='searchBar']
  [class*='dropdownMenu']` — matched on stable substrings, never the hashed suffix.
- **ALWAYS tag-qualify a `[class*=…]` selector.** CSS-module names nest by prefix, so the
  substring you match on almost always matches a CHILD too, and your background gets painted
  twice — once as an unexplained slab behind the real element. This has now bitten twice:
  `[class*='collapseSidebarButton']` also matches its icon (`collapseSidebarButtonIcon…`),
  and `[class*='searchHint']` also matches its wrapper (`searchHintContainer…`). Write
  `button[class*='collapseSidebarButton']`, `kbd[class*='searchHint']`. When a mystery
  rectangle appears behind a glyph, this is the first thing to check.
- **Watch for one vendor token doing two jobs.** `--search-local-highlight-color` is both
  the selected row's *background fill* and the matched-text *ink*. That is the cyan
  two-token problem again: a value legible as ink is a saturated block as a fill. Keep the
  token on the ink job and override the fill separately.
- **A presentation attribute on an inner `<g>` beats a rule on the `svg`.** The sidebar
  collapse icon carries `<g fill="#7a7a7a">`, so `svg { fill: currentColor }` left it grey;
  the `g`/`path` must be targeted. Same for Infima's disclosure caret, which is a
  background-image data-URI with `fill="rgba(0,0,0,0.5)"` baked in and tintable only via
  `filter` — replaced with a flat `clip-path` triangle so it takes the bronze token.

Doc titles reach three surfaces built from the raw title, and all three need the legacy
leading emoji stripped at render (`stripLeadingEmoji`) plus the page sigil: the sidebar,
the breadcrumbs, **and the prev/next paginator**. The paginator was missed for a while
because it is the only one of the three you have to scroll to see.

## 10. Verification checklist for a new content type

1. `bun run content:gen` then `content:check` clean.
2. `bun run build` green, with no NEW broken links or anchors.
3. **Anchor parity** — every `### Name` slug from the old page still resolves.
4. **TOC** lists what it should and excludes card-internal headings
   (`toc_max_heading_level`).
5. **Keyword links and chips** actually render in the built HTML, inside the card's
   children — grep for them, do not assume.
6. Search index carries the entry names and anchors.
7. App-side consumers untouched (`git status`), unless a change is deliberate and logged.
