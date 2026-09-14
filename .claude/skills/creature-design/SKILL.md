---
name: creature-design
description: "Design balanced, thematic creatures for Nexus RPG — stat blocks, attacks, abilities, Elite/Lord mechanics. Canonical data is src/utils/data/json/creatures.json; the tier pages are generated from it. Use when creating or revising creatures, encounter opponents, or reviewing creature stat blocks."
---

# Creature Design — Nexus RPG

Creatures sit on a tier chassis (Tier 0-10, matching adventurer levels) with abilities layered on top for
tactical identity. **One creature of a tier should challenge one adventurer of that level.**

**This file is a router. It holds no design rules.** Load what the task needs and nothing else — the
reference files below are large on purpose, and loading them "to be safe" is the main avoidable cost here.

## Where to go

| Doing | Read |
|---|---|
| **Designing or revising a creature** | [references/workflow.md](references/workflow.md) — the seven steps, their gates, and a per-step load table |
| **Any numeric figure** | [references/stat-tables.md](references/stat-tables.md) — tier stats, damage, AV, Defense spread, gear Quality, sizes, immunities. **Never derive a stat from memory** |
| **Validating a draft** | [references/validation-checklist.md](references/validation-checklist.md) |
| **Publishing an approved design** | [references/publication.md](references/publication.md) — record shape, generator guards, pipeline |
| **The design rules themselves** | [references/designer-principles.md](references/designer-principles.md) — one-line index of all 61, and which phase file holds each |
| **Editing this skill** | [references/maintaining-this-skill.md](references/maintaining-this-skill.md) |
| Core system mechanics, writing standards | [../game-basics.md](../game-basics.md) |

**Principles are split by phase so a task loads only what it needs:**
[identity.md](references/principles/identity.md) (step 1) ·
[chassis.md](references/principles/chassis.md) (step 2) ·
[attacks.md](references/principles/attacks.md) (step 3) ·
[abilities.md](references/principles/abilities.md) (step 4) ·
[writing.md](references/principles/writing.md) (any prose).
**Do not design from the index** — each summary says *which* principle applies, never what it says.

## Source-of-Truth Map

| What | Where |
|------|-------|
| **Canonical creature data** | `src/utils/data/json/creatures.json` — **edit here, never in the docs** |
| Published creatures by tier | `docs/08-creatures/03-creatures/tier-{0..10}.mdx` — **generated, do not hand-edit** |
| Creature rules (categories, Morale, troops, triggers) | `docs/08-creatures/02-creature-rules.md` |
| **Conditions** | `docs/05-combat/04-conditions.md` |
| **Effect durations** | `docs/06-scenes/02-effect-durations.md` |
| **Weapon/armor properties** | `docs/04-equipment/05-armor-weapon-properties.md` |
| Published spells | `docs/07-magic/02-arcane-spells/`, `04-mystic-spells/` |
| **Shared traits** | `src/utils/data/json/creature-traits.json` — 47 reusable passives by name; a creature stores the NAME and `content:gen` expands it |
| **Types, subtypes, additives** | `creature-types.json`, `creature-subtypes.json`, `creature-additives.json` — subtypes are an **array**, so additives sit alongside the primary value |
| Builder pre-sets and rule tables | `creature-attacks-library.json`, `creature-abilities-library.json`, `creature-type-defaults.json`, `creature-tiers.json` — the Builder's tables, **not the roster** |
| Deep analysis (survivability math, encounter building) | `docs/analysis/creatures/creature-creation-encounter-building-analysis.md` |
| **Worldbuilding vault** | `~/git/personal/nexus-rpg-vault` (separate repo, German). `04 Natur/Bestiarium` for origin lore. **Read before designing an identity. Read-only** |
| **The twelve Folk** | `docs/02-adventurers/01-folk.md` — a humanoid creature **inherits its folk's published traits** |

**Keyword discipline**: only official conditions, durations, damage types and weapon properties — lists in
[../game-basics.md](../game-basics.md#canonical-keyword-sources). Anything non-official is spelled out as
an exact mechanical effect.

**Attack damage is derived, never written down.** `formatDamageString` computes weak/strong/critical as
`base + 1x/2x/3x` weapon damage from the creature's tier. A library entry stores a **modifier** on that
baseline, never a figure — the library once froze a tier-2 bite onto a tier-9 dragon. Details and the
`critWeaponDamage` exception: [stat-tables.md](references/stat-tables.md).

## Creature Categories

| Category | HP Format | Wounds | Attacks | Abilities | Built-in Rules |
|----------|-----------|--------|---------|-----------|----------------|
| **Basic** | `40` | 1 | 1-2 | **0-3** | Rolls Morale, no Resolve, can form troops |
| **Elite** | `2×40` | 2 | 2-3 | 2-4 | 1 Resolve, +1 boon on Morale |
| **Lord** | `3×40` | 3 | 3-5 | 3-6 | 3 Resolve, second turn at half Initiative, no Morale, recovers conditions on Wound, immune to repeated conditions after one success |

When a life pool hits 0 HP the creature takes 1 Wound and immediately regains full HP. Lords also shed all
negative conditions.

**Those counts are the published ranges and they count CARD ENTRIES. A creature spends SLOTS** — one
Action, one Quick Action, its Movement, and **a Lord's second turn adds no second Quick Action** (D-165).
**Principle 60** says what is allowed to count: an attack is an option only if it differs from the one
beside it, an Elite and a Lord produce **two effects every turn** with the second never a second attack
roll, and a Lord needs a **setup-to-payoff pair**. **A Basic doing one thing a turn is intended.**
**Principle 61** is the one release valve and it is **Lord only** — a single signature ability priced in
Resolve.

**A Basic may have zero abilities** (D-054) provided it has at least one ability **or** trait. Never add a
filler ability to satisfy a column. **Never write "Special Rules" or "Combat Notes" sections** — category
rules apply automatically.

### Mandatory abilities

- **Elite** — ≥1 **Elite Trigger**, ≥1 defensive ability with counterplay (principle 10), and a **second
  effect that lands every turn**: a proactive Quick Action first, otherwise an attack rider or a Passive
  engine (principle 60b).
- **Lord** — ≥2 **Lord Triggers**, ≥1 defensive ability, the same every-turn second effect, and a
  **setup-to-payoff pair** on the Action menu (principle 60c). **Prefer a single Quick Action**: it has
  only one per round.
- **Trigger wording is fixed** — every trigger opens `When this creature suffers a Wound, …`. An Elite
  takes no ordinal, a **Lord takes one** (`their first Wound`) so its two triggers escalate rather than
  fire together. A trigger **escalates** (principle 27), and check first whether a published rule already
  does it — a band breaking when its leader falls is Morale, not a trigger.

## The three most-missed rules

Cheap to state, expensive to miss. The rest are in the phase files.

- **8.** Check every condition against its published definition — `stunned` does not disable, only
  `paralyzed` does.
- **10.** Defensive abilities and immunities need counterplay, and no auto-win offense either.
- **44.** A carried weapon's damage and properties are the catalogue's, changed only by a legitimate
  Quality step. Build-checked. Riders are allowed and are how high-tier armed creatures close the gap.

## When the owner corrects a design decision

Distil it into the matching phase file as the next free number, add its one-line summary to
[designer-principles.md](references/designer-principles.md), and record the decision in the batch's notes
file. **Never into this file.** Full procedure:
[maintaining-this-skill.md](references/maintaining-this-skill.md).
