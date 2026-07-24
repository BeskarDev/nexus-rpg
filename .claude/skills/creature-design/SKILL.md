---
name: creature-design
description: "Design balanced, thematic creatures for Nexus RPG — stat blocks, attacks, abilities, Elite/Lord mechanics. Use when creating or revising creatures, encounter opponents, or reviewing creature stat blocks in docs/08-creatures/."
---

# Creature Design — Nexus RPG

Creatures are designed on a tier chassis (Tier 0–10, matching adventurer levels) with abilities layered on top for tactical identity. A single creature of a tier should challenge one adventurer of the same level.

**All numeric tables (tier stats, size modifiers, immunity sets, validation checklist) live in [references/stat-tables.md](references/stat-tables.md) — use them exactly, do not derive stats from memory.** Core system mechanics and writing standards: [../game-basics.md](../game-basics.md).

## Source-of-Truth Map

| What | Where |
|------|-------|
| Published creatures by tier | `docs/08-creatures/03-creatures/tier-{0..10}.md` |
| Creature rules (categories, Morale, troops, triggers) | `docs/08-creatures/02-creature-rules.md` |
| **Conditions** (official keyword list) | `docs/05-combat/04-conditions.md` |
| **Effect durations** (briefly/short/medium/long/very long) | `docs/06-scenes/02-effect-durations.md` |
| **Weapon/armor properties** | `docs/04-equipment/05-armor-weapon-properties.md` |
| Published spells (for spellcasting creatures) | `docs/07-magic/02-arcane-spells/`, `04-mystic-spells/` |
| Damage/healing scaling frameworks | `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 and §16 |
| Deep analysis (survivability math, encounter building, ability catalogues) | `docs/analysis/creature-creation-encounter-building-analysis.md` |
| Creature Builder rule tables (app) | `src/utils/data/json/creature-*.json` |

**Keyword discipline**: only official conditions, durations, and weapon properties — complete lists in [../game-basics.md](../game-basics.md#canonical-keyword-sources). Anything non-official must be spelled out as an exact mechanical effect.

## Design Principles

**Binding rules distilled from owner feedback — [references/designer-principles.md](references/designer-principles.md) holds the full text.** Native principles 1–7 plus principles ported from the spell-design and talent-design corpora, and pointers to the shared spell-design wording/condition convention files that apply to creature text verbatim. Read it before any design pass. The most frequently load-bearing: stat chassis + ability menu, never one alone (1); abilities over HP bloat (2); damage threads the needle between casters and heavy martials (3); buildable in 5 minutes, understandable at the table (4); adventurers don't heal on Wounds — factor into lethality (5); ability output follows the spell scaling frameworks, spells verified to exist by grep (7); check every condition against its published definition — stunned doesn't disable, only paralyzed does (8); high-impact conditions need a save or rolled attack, never a no-roll trigger (9); defensive abilities and immunities need counterplay, no auto-win offense (10); limits live in the fiction (11); mythological-first roster identity — D&D imports allowed only naturalized: renamed (legal minimum) with setting-fit ecology (13); creatures are they/their/them, never it/its (shared wording conventions).

## Creature Categories

| Category | Life Pools | HP Format | Wounds | Attacks | Abilities | Built-in Rules |
|----------|-----------|-----------|--------|---------|-----------|----------------|
| **Basic** | 1 | `40` | 1 | 1–2 | 1–3 | Rolls Morale, no Resolve, can form troops |
| **Elite** | 2 | `2×40` | 2 | 2–3 | 2–4 | 1 Resolve, +1 boon on Morale |
| **Lord** | 3 | `3×40` | 3 | 3–5 | 3–6 | 3 Resolve, second round at half Initiative, no Morale, recovers conditions on Wound, immune to repeated conditions after one success |

Life pool mechanics: when a pool hits 0 HP, the creature takes 1 Wound and immediately regains full HP (next pool). Lords also shed all negative conditions.

**Do not write "Special Rules" or "Combat Notes" sections in stat blocks** — Elite/Lord built-in rules apply automatically from the category.

### Mandatory Ability Requirements

- **Elite**: ≥1 **Elite Trigger** (fires when first pool depletes: power surge, ability unlock, or environmental change) and ≥1 Quick Action ability (reactive or proactive).
- **Lord**: ≥2 **Lord Triggers** (fire when any pool depletes; each should shift combat dynamics) plus ≥1 reactive AND ≥1 proactive Quick Action ability.
- **Elite/Lord**: ≥1 defensive ability fitting the fighting style — blocking, redirecting, evading, absorbing, negating, or environmental (category table in references) — with counterplay per principle 10.

## Creation Workflow

### 1. Concept
Define role (infantry, ranged, brute, cavalry, artillery, spawner), tier, category (Basic/Elite/Lord), size, and creature type (see type table in references). Check the relevant `tier-N.md` file for what already exists at that tier — avoid redundant designs.

### 2. Base Statistics (from tier table)
- **HP**: tier table value, formatted per category (`40`, `2×40`, `3×40`).
- **AV**: light = tier, heavy = 2×tier. Bone/stone/metal creatures typically heavy. Size: ±1 tier.
- **Defenses** (Parry/Dodge/Resist): base 6 + tier each; individual defenses may shift within 2 of base. Large/Huge: Parry up, Dodge down; Small/Tiny: reverse. **Resist rarely above 6 + tier + 2** — high mental attributes don't justify more.
- **Attributes**: primary = tier's max attribute die; secondaries 1–2 die sizes below.
- **Skills**: primary combat/magic skills at "1st" rank from table, others at "2nd"; add thematic skills (Stealth for ambushers, etc.).

**Tier adjustment (optional, thematic)**: shift any single stat one tier up or down — but every reduction must be balanced by raising a different stat one tier (frail lich: −1 tier HP, +1 tier Spirit). Overall challenge must stay at the intended tier. Never adjust more than one stat pair.

### 3. Attacks
Damage formula — always exactly:
- **Weak** = Base + Weapon | **Strong** = Base + 2×Weapon | **Critical** = Base + 3×Weapon
- **Base damage** = half primary attribute die (d6→3, d8→4, d10→5, d12→6, d12+1→7, d12+2→8)
- **Weapon damage** = tier + 2 single-target; half that for multi-target
- Write as `5/7/9 damage (base 5 + weapon 2)`.

Use only official weapon properties (`docs/04-equipment/05-armor-weapon-properties.md`).

### 4. Abilities
- **Ability TN** = 6 + tier. Saves usually Spirit/Strength + Fortitude. Official durations only.
- Add mandatory trigger/Quick Action/defensive abilities per category (above), then thematic abilities: movement, senses, auras, environmental manipulation.
- Damage/healing beyond basic attacks and spellcasting rules: principle 7 — spell scaling frameworks, max spell rank = magic skill rank, every spell verified to exist by grep.
- Condition-inflicting abilities: principles 8–9 — design against the published condition text, saves for high-impact conditions.

### 5. Size, Immunities, Resistances
Apply size modifiers and category-appropriate immunity sets from references. Resistances = half damage, weaknesses = double damage. Match to creature-type logic — undead aren't immune to everything; living creatures aren't immune to bleeding. Immunity counterplay per principle 10.

### 6. Write it into a draft document
**Never straight into the published tier files.** Create (or append to) a batch file under the repo-root `.drafts/creatures/` (e.g. `.drafts/creatures/tier-<N>-batch.md`, or a concept-named file). The draft holds: a status banner ("pending owner approval, not yet published"), scope, per-creature design rationale (role, tier, category, any tier-adjustment justification), the full stat block in publish-ready format, and an "open questions for owner" section flagging unresolved forks. The draft is the review artifact; publication only happens after owner approval.

### 7. Validate
Run the full checklist in [references/stat-tables.md](references/stat-tables.md#validation-checklist), then sanity-check against 2–3 published creatures of the same tier and category — comparable power, no strict domination. Key failure modes:

- ❌ Damage math like `6/10/14` (doubling the increment) — correct is base + 1×/2×/3× weapon: `6/8/10`.
- ❌ Referencing undefined conditions ("cursed", "drained") — use official conditions or spell out mechanics ("+1 bane on all rolls").
- ❌ Missing Elite/Lord triggers — they define the category, not optional.
- ❌ AV or Resist raised without compensating reduction elsewhere.
- ❌ Spells above skill rank or nonexistent in the spell lists.
- ❌ Tier-inconsistent power (Tier 1 body with Tier 4 abilities).
- ❌ Single-use "I win" abilities; effects must be counterable (principle 10).
- ❌ "It/its" for creatures — always they/their/them.

## Stat Block Template

```markdown
### **[Creature Name]** ([Size] [Type])

**Tier:** X ([Category])

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| XX | XX | dX | dX | dX | dX  | XX    | XX    | XX     |

**Skills:** [Skill] (X), [Skill] (X)

**Immunities:** [if any]
**Resistances:** [if any]
**Weaknesses:** [if any]

**Attacks:**

- **[Name]** (*properties*). X/Y/Z damage (base X + weapon Y). [Effects with TN and duration].

**Abilities:**

- **[Name].** [Trigger, effect, limit — exact TNs, durations, conditions].
```

Worked example (Elite with correct formats): see [references/stat-tables.md](references/stat-tables.md#worked-example).

## Publication Pipeline

Every new creature starts life in a draft document under `.drafts/creatures/` (workflow step 6). A creature stays a draft until the owner explicitly approves it as production-ready. On approval, publish (then optionally delete or archive the draft file):

1. **Docs** — insert the stat block into the matching tier file `docs/08-creatures/03-creatures/tier-<N>.md`, following that file's existing entry format and ordering.
2. **Notion** — push via the `notion-sync` skill.

No per-creature JSON exists — the `creature-*.json` files under `src/utils/data/json/` are the Creature Builder's **rule tables** (tier stats, sizes, types, archetypes). Only touch them when the creature *rules* change, not when adding individual creatures. If a rules change does affect them, update the JSON to stay consistent with `references/stat-tables.md` and the docs.

Verify docs (and any JSON rule-table changes) agree, then stop — the owner commits manually.

## Designer Feedback Loop

When the owner corrects or refines a design decision in session (a balance call, a thematic boundary, a wording rule), append it to [references/designer-principles.md](references/designer-principles.md) (next free number, bolded one-line rule + reasoning + owner-ruling provenance, under the matching section — the file states the next free number). Numeric chassis corrections go into [references/stat-tables.md](references/stat-tables.md) instead. If it's frequently load-bearing, also add its one-line hook to the Design Principles section above. If the correction refines a *ported* principle, note the creature-side ruling there — never edit the spell-design or talent-design files from here. This is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons go into `references/`.
