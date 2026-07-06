---
name: creature-design
description: "Design balanced, thematic creatures for Nexus RPG — stat blocks, attacks, abilities, Elite/Lord mechanics. Use when creating or revising creatures, encounter opponents, or reviewing creature stat blocks in docs/08-creatures/."
---

# Creature Design — Nexus RPG

Creatures are designed on a tier chassis (Tier 0–10, matching adventurer levels) with abilities layered on top for tactical identity. A single creature of a tier should challenge one adventurer of the same level.

**All numeric tables (tier stats, size modifiers, immunity sets) live in [references/stat-tables.md](references/stat-tables.md) — use them exactly, do not derive stats from memory.** Core system mechanics and writing standards: [../game-basics.md](../game-basics.md).

Existing creatures: `docs/08-creatures/03-creatures/tier-{0..10}.md`. Creature rules: `docs/08-creatures/02-creature-rules.md`. Deep analysis (survivability math, encounter building, ability catalogues): `docs/analysis/creature-creation-encounter-building-analysis.md`.

**Keyword discipline**: conditions only from `docs/05-combat/04-conditions.md`, durations only briefly/short/medium/long/very long (`docs/06-scenes/02-effect-durations.md`), weapon properties only from `docs/04-equipment/05-armor-weapon-properties.md` — complete lists in [../game-basics.md](../game-basics.md#canonical-keyword-sources).

## Design Principles

1. **Stat chassis + ability menu** — the tier table provides the statistical foundation; abilities provide the tactical identity. Never let either carry the whole design.
2. **Abilities over HP bloat** — durability comes from defensive abilities (damage reduction, condition immunity, regeneration), not inflated HP. Keeps fights snappy.
3. **Damage threads the needle** — creature damage must threaten glass-cannon casters (16 HP, AV 2) without oppressing heavy-armor martials (20+ HP, AV 5–6). The linear +1 weapon damage per tier achieves this; don't break it.
4. **Bounded complexity** — a creature should be buildable in under 5 minutes with this framework and immediately understandable at the table.
5. **Adventurers don't heal on Wounds** — unlike Elite/Lord creatures, adventurers stay at 0 HP when Wounded. Party healing is their survival mechanism; factor this into lethality.
6. **Thematic integration** — sword & sorcery, ancient-world aesthetic (Mesopotamian, Egyptian, Persian, mythological folklore). Every creature suggests its place in the world's ecology.

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
- **Elite/Lord**: ≥1 defensive ability fitting the fighting style — blocking, redirecting, evading, absorbing, negating, or environmental.

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

Use only official weapon properties (agile, crush, pierce, slash, reach, light, two-handed — see `docs/04-equipment/05-armor-weapon-properties.md`).

### 4. Abilities
- **Ability TN** = 6 + tier. Saves usually Spirit/Strength + Fortitude. Official durations only (briefly, short, medium, long, very long).
- Add mandatory trigger/Quick Action/defensive abilities per category (above), then thematic abilities: movement, senses, auras, environmental manipulation.
- **Damage/healing abilities beyond basic attacks** follow the system-wide scaling frameworks: damage per rank/tier from `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 (AoE = half single-target), healing from §16 (single-target 1:1 with damage, Quick Action ½, AoE half; temp HP never stacks). A creature's ability output must stay consistent with what a same-tier caster could do.
- **Spellcasting creatures**:
  - Arcane = Mind + Arcana; Mystic = Spirit + Mysticism. Match magic type to creature nature.
  - Max spell rank = the creature's skill rank in Arcana/Mysticism.
  - Every referenced spell MUST exist in `docs/07-magic/02-arcane-spells/` or `docs/07-magic/04-mystic-spells/` — verify by grep, never import spells from other game systems.

### 5. Size, Immunities, Resistances
Apply size modifiers and category-appropriate immunity sets from references. Resistances = half damage, weaknesses = double damage. Match to creature-type logic — undead aren't immune to everything; living creatures aren't immune to bleeding.

### 6. Validate
Run the full checklist in [references/stat-tables.md](references/stat-tables.md#validation-checklist). Key failure modes:

- ❌ Damage math like `6/10/14` (doubling the increment) — correct is base + 1×/2×/3× weapon: `6/8/10`.
- ❌ Referencing undefined conditions ("cursed", "drained") — use official conditions or spell out mechanics ("+1 bane on all rolls").
- ❌ Missing Elite/Lord triggers — they define the category, not optional.
- ❌ AV or Resist raised without compensating reduction elsewhere.
- ❌ Spells above skill rank or nonexistent in the spell lists.
- ❌ Tier-inconsistent power (Tier 1 body with Tier 4 abilities).
- ❌ Single-use "I win" abilities; effects must be counterable.

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

A creature is a draft until the owner explicitly approves it as production-ready. Then:

1. **Docs** — insert the stat block into the matching tier file `docs/08-creatures/03-creatures/tier-<N>.md`, following that file's existing entry format and ordering.
2. **Notion** — push via the `notion-sync` skill.

No per-creature JSON exists — the `creature-*.json` files under `src/utils/data/json/` are the Creature Builder's **rule tables** (tier stats, sizes, types, archetypes). Only touch them when the creature *rules* change, not when adding individual creatures. If a rules change does affect them, update the JSON to stay consistent with `references/stat-tables.md` and the docs.

Commit docs (and any JSON rule-table changes) together.

## Designer Feedback Loop

When the owner corrects a design decision during a session (a stat rule, a balance call, a thematic boundary), add it to the Design Principles above or the relevant workflow step so it persists for future sessions.
