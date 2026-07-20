# Keyword & Chip Detection Robustness Plan

Technical design plan for the two custom remark plugins that auto-link game terms and render mechanical chips. Goal: replace the brittle positional blacklist with **context-aware heuristics** that decide per-occurrence, needing (ideally) zero document markup.

Status: **implemented** (2026-07-20). All five phases shipped; the positional `blacklist.json` was proven inert against the whole docs tree and removed entirely. Detection is now heuristic-only (headings/bold/table-header suppression, damage-number context, zone gating, first-occurrence-per-page), with `_word` as the manual escape hatch and `bun run report:links` as the ongoing safety net. Not a game-design doc — lives here at owner request alongside other system analyses.

---

## 1. Current System

| Plugin | Location | Effect |
|--------|----------|--------|
| `auto-keyword-plugin` | `src/remark/auto-keyword-plugin/` | 52 terms → doc links (`roll`, `test`, `rank`, `boon`, `Weak`, `Strong`, `Critical`, `Heavy`, `size`…) |
| `table-chips-plugin` | `src/remark/table-chips-plugin/` | ~47 terms → colored chips (damage `fire`/`poison`, skills `Fighting`, weapons `Shield`, attributes `STR`) |

Both share a copy-pasted tokenizer and a longest-match loop. Both consult one guard: `src/remark/blacklist/blacklist.json` (56 entries).

Blacklist entry shape: `{ file, section, keyword, matchIndex }`. It says "in this file, in this section, exclude the Nth occurrence of this keyword."

## 2. Why It Rots

The blacklist **points at positions, not content.**

- `matchIndex` counts occurrences from a section start. Insert one sentence above → every later index shifts → silent wrong links, no error.
- `section` is a heading string. Rename the heading → the entry stops matching, silently.
- `getCurrentSection()` (`blacklist-manager.ts:201`) always returns `undefined`. So for **auto-keyword**, section matching never actually runs — section-scoped entries degrade to whole-file matches. Latent bug.
- Same brittleness is also hardcoded in plugin code: `isCombatArtsFile` and `isAttributeExplanationFile` path checks in `table-chips-plugin.ts:56-65`.
- Table-header detection is a crude proxy (`tableCell` + `children.length <= 1` + single word), which both over- and under-fires (see §4).

Maintaining a hand-written position index against living documents is a losing fight with entropy.

## 3. What The Blacklist Is Actually Compensating For

Reading all 56 entries, they collapse into **three false-positive clusters** — each solvable by one heuristic:

| Cluster | Example entries | Root signal the plugin ignores |
|---------|-----------------|-------------------------------|
| **A. Table headers** | `HP`, `AV` with `matchIndex: [0..50]` across creature stat blocks | Cell is in the **header row**, not a body cell |
| **B. Ability / attack names** | `Fire Body`, `Poison Mist`, `Necrotic Touch`, `Stoic Mind`, `Aquatic Nature`, `Shield Bash`, `Poisoned Dagger` | Term is one word of a **Title-Case proper name**, usually on a **bold-led ability line** |
| **C. Flavor damage in prose** | `fire` "in damage type list / natural language description" | No **damage number, dice, or the word "damage"** nearby |

Plus the `Heavy`(armor category) vs `heavy`(property) split, currently worked around with case-sensitivity — dissolved by **column-aware** cells (§5.3).

Kill these three clusters with heuristics and the blacklist shrinks to near-zero.

## 4. The Table-Cell Detection Fix (call out separately — known pain)

Current check, in both plugins:

```ts
parent.type === 'tableCell' &&
parent.children.length <= 1 &&
node.value.split(' ').length <= 1   // "single word in single-child cell" → assume header
```

Wrong on both ends:
- **Under-fires**: a multi-word header (`Target Number`) has >1 word → not skipped → gets linked.
- **Over-fires**: a legitimate single-word **body** cell (a stat-block value) is skipped when it shouldn't be.
- It never actually asks "is this the header row?" — it guesses from word count.

**Correct detection** uses the mdast structure: `table → tableRow → tableCell`. The header is unambiguously `table.children[0]` (the first `tableRow`).

```ts
// walk ancestors provided by visitParents
const table = ancestors.find(a => a.type === 'table')
const row   = ancestors.find(a => a.type === 'tableRow')
const isHeaderRow = table && row && table.children[0] === row
const colIndex = row ? row.children.indexOf(cell) : -1
```

This gives two wins at once:
1. **Real header-row detection** → deletes every `HP`/`AV`/`[0..50]` blacklist entry (cluster A).
2. **Column index** → map cell to its header text → **column semantics** (cluster in §5.3).

## 5. Heuristics (do the work, no markup)

Each replaces a blacklist cluster. All read only the AST + neighbor tokens.

### 5.1 Damage-number context (cluster C)
A damage chip fires only when the token is a damage word AND, within N tokens (default 3), there is a number, dice notation (`d6`, `2d8`), or the literal `damage`/`dmg`.

- `2 fire damage`, `deals fire` (next to a value) → chip.
- `set the temple on fire`, `campfire`, `fire spread through the hall` → plain text.

Covers the most common flavor collision (damage words are ordinary English).

### 5.2 Proper-name / bold-line suppression (cluster B)
Suppress conversion when the term sits inside a **Title-Case multi-word run** (an ability or attack name), or on a **bold-led ability line**.

- Detect Title-Case run: the matched word is capitalized AND an adjacent word (either side, across the same text node) is also capitalized and not a sentence start → part of a name (`Fire Body`, `Shield Bash`).
- Detect ability line: the text node's `strong` sibling opens the line (mdast: paragraph/listItem whose first child is `strong`) — the canonical `**Poison Mist.** …` stat-block format.

This dissolves the entire creature-ability blacklist cluster, which today is the bulk of manual entries.

### 5.3 Column-aware cells (cluster A remainder + Heavy/heavy)
Once §4 gives a column index → header text, define per-column policy in the registry. A cell under a `Damage` header resolves damage words as chips; under `Skill`, skill words; under `Category` (armor), `Heavy`/`Light` link to the category, not the property.

Removes the `Heavy` vs `heavy` case-sensitivity hack — semantics come from the column, not letter-casing.

### 5.4 First-occurrence-per-page for prose links (auto-keyword noise)
Common docs convention: auto-link a term only on its **first** occurrence per page (or per section). Kills the "every paragraph re-links `roll`/`rank`/`test`" noise and removes many low-value blacklist entries. Chips are exempt (a stat block wants every `fire` colored).

### 5.5 Inline opt-out — rare escape hatch only
Keep `_word` as a manual override for the residual cases heuristics can't infer. Target: needed on fewer than 5 spots repo-wide. It is the safety valve, not the mechanism. No positive opt-in marker introduced — heuristics are the default path.

## 6. Registry-Driven, Self-Reporting

Fold both keyword and chip definitions into one registry, one entry per term:

```ts
{
  term: 'fire',
  kind: 'chip',              // 'chip' | 'link'
  color, type: 'damage',
  caseSensitive: false,
  requireContext: 'damage-number',   // §5.1 predicate id, or null
  suppressInProperName: true,        // §5.2
  columns: { Damage: 'chip' },       // §5.3 per-column override
  firstOnlyPerPage: false,           // §5.4
}
```

Add a **build-time linkification report**: every conversion emitted as `file:line  term → link|chip  (reason)`. The author scans a diffable text artifact instead of eyeballing rendered pages. Turns "hope the blacklist is right" into a reviewable output; regressions show up in a diff.

## 7. Cleanup Riding Along

- Extract the duplicated tokenizer into one shared module (`src/remark/shared/`), used by both plugins.
- Delete `matchIndex` / `section` machinery and the dead `getCurrentSection`.
- Remove `console.warn` debug blocks in `blacklist-manager.ts` (lines ~132, ~163).
- Replace `isCombatArtsFile` / `isAttributeExplanationFile` path checks with registry `columns` / file scoping.

## 8. Phasing (each shippable independently)

| Phase | Work | Payoff |
|-------|------|--------|
| **1** | Shared tokenizer + unified registry. No behavior change. | De-risks everything after; kills code duplication. |
| **2** | Real header-row + column detection (§4, §5.3). | Deletes cluster A (all `HP`/`AV`/`[0..50]`) + Heavy/heavy hack. Fixes the table-cell bug directly. |
| **3** | Damage-number context (§5.1) + proper-name suppression (§5.2). | Deletes clusters B and C — the bulk of remaining entries. |
| **4** | First-occurrence-per-page (§5.4). | Deletes prose-link noise entries. |
| **5** | Build-time linkification report (§6). | Ongoing safety net; retire `blacklist.json` once entry count hits ~0. |

After Phases 2–3 the blacklist should be nearly empty. Phase 5 removes the file and the `blacklist/` module.

## 9. Validation

- **Golden-file test per phase**: run both plugins over a fixture set (creature stat block, armor table, spell entry, narrative prose with flavor `fire`/`fighting`) and snapshot the mdast output. No regression = every previously-correct conversion still correct, every blacklisted false-positive now suppressed by heuristic.
- **Blacklist-shrink metric**: after each phase, count entries the heuristics make redundant; delete them; confirm the golden files are unchanged.
- `bun run build` + spot-check the linkification report (Phase 5) on `docs/08-creatures/03-creatures.md` (densest mechanical page) and a narrative-heavy lore page (densest flavor).

## 10. Open Decision

None blocking. Owner chose heuristic-first with `_` opt-out as rare escape hatch (§5.5). Capitalization and `_` remain legal overrides but should become almost never necessary.
