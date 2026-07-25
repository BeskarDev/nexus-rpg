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

## 9. Verification checklist for a new content type

1. `bun run content:gen` then `content:check` clean.
2. `bun run build` green, with no NEW broken links or anchors.
3. **Anchor parity** — every `### Name` slug from the old page still resolves.
4. **TOC** lists what it should and excludes card-internal headings
   (`toc_max_heading_level`).
5. **Keyword links and chips** actually render in the built HTML, inside the card's
   children — grep for them, do not assume.
6. Search index carries the entry names and anchors.
7. App-side consumers untouched (`git status`), unless a change is deliberate and logged.
