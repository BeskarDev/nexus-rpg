# Prestige Talents GDD (R4–R5)

> **Status:** Open design document. Successor to the retired Talent System Analysis (archived 2026-08-18 at `../_archive_/talents/TALENT_SYSTEM_ANALYSIS.md`). The base talent system is **complete for its current scope** (owner ruling, 2026-08-18): 148 talents, no stubs, all 16 skills covered through R1–R3. The single remaining talent-design frontier is high-level **prestige talents at Rank 4 and Rank 5**.

---

## 1. Scope

Design the R4–R5 layer of the talent system: capstone talents and R4–R5 extensions of existing signature talents. Everything below R4 is out of scope. The old 8-talents-per-skill floor is no longer a blocking target (Lore sits at 6, Crafting at 7, both accepted for now).

Two work streams, carried over from the retired analysis's roadmap P4:

1. **P4.1 — Signature extensions.** Existing talents whose fantasy justifies growth past their current cap.
2. **P4.2 — Per-skill capstones.** New R4–R5 talents giving each skill a prestige endpoint.

## 2. Current R4–R5 Inventory

The only talents in `src/utils/data/json/talents.json` that reach R4 or R5 today:

| Talent | Skill | Reaches |
|---|---|---|
| Arcane Spell Knowledge | Arcana | R5 |
| Mystic Spell Knowledge | Mysticism | R5 |
| Supernatural Mobility | Athletics | R5 |
| Master Artisan | Crafting | R5 |
| Presence of Conquest | Influence | R5 |
| Foresight | Insight | R5 |
| Shape Changer | Nature | R4+ |
| Maintenance | Crafting | R4 |
| Battle Mage | Arcana | R4 (R5 open) |
| Art of Fighting | Fighting | R4 (R5 open) |
| Art of Archery | Archery | R4 (R5 open) |
| Magical Sense | Lore | R4 (R5 open) |

Skills with **no** R4+ talent at all: Education, Fortitude, Lore (Magical Sense caps R4), Perception, Stealth, Streetwise, Survival, Telepathy-adjacent none applicable.

## 3. P4.1 — Signature Extension Backlog

| Talent | Skill | Current cap | Target |
|---|---|---|---|
| Battle Mage | Arcana | R4 | R5 |
| Art of Fighting | Fighting | R4 | R5 |
| Art of Archery | Archery | R4 | R5 |
| Magical Sense | Lore | R4 | R5 |
| Martial Artist | Fighting | R3 | R4–R5 |
| Hard to Kill | Fortitude | R3 | R4–R5 |
| Animal Companion | Nature | R3 | R4–R5 |
| Pact of Glory / Piety / Protection / Vengeance | Mysticism | R3 | R4–R5 (shared prestige pattern across all four pacts) |

## 4. P4.2 — Per-Skill Capstone Seeds

Seed concepts below come from the archived per-skill workbenches (`../_archive_/talents/skills/<skill>.md`). **Treat them as inspiration, not designs**: the workbench drafts predate the 2026-07 balance pass (fixed magnitude menus, two-lane rider rule, whole-ability heal ladders) and some seeds were drafted at lower ranks. Every promoted seed gets a fresh design under the current `talent-design` skill principles.

| Skill | Seed concepts (archived workbench) |
|---|---|
| Arcana | Eldritch Pact, Summoner's Bond, Arcane Mastery, Grand Conjuration, Arcane Dominion |
| Archery | Predator's Mark, Windreader, Phantom Strike, Living Cyclone |
| Athletics | Perfect Form, Unstoppable Charge, Arena Legend |
| Crafting | Works of Legend, Apex Synthesis |
| Education | Grand Strategist, The Theoretician, Mentor's Legacy |
| Fighting | Phalanx Commander, Blade Dancer, Scar-Forged |
| Fortitude | Unbreakable, Iron Anchor |
| Influence | Voice of Command, Diplomatic Renown, Voice of the Masses |
| Insight | Eye of the Seer, Calculated Pressure |
| Lore | Master of Myths, True Name, Voice of Ages |
| Mysticism | Song of Power, Prophetic Sight, Divine Authority |
| Nature | Voice of the Wild, Poisoner's Crown, Grand Physicker |
| Perception | Constant Vigil, Tactical Prescience, Perfect Witness |
| Stealth | Master of Shadows |
| Streetwise | Underworld Legend, Criminal Instinct |
| Survival | Apex Predator, Ghost of the Wilderness, Against All Odds |

## 5. Design Constraints

- **Mortal pinnacle ceiling.** R5 talents are the martial/skill counterpart of R5 spells: peak mortal capability, never reality-warping. Bounded ceiling per the core design pillars.
- **Power budgets** follow the current fixed magnitude menus (damage riders {+2, +4, +6}, defense {+1, +2}, pools {5, 10, 20}) with R4–R5 sitting at the top of each ladder. Full tables: `talent-design` skill, `references/principles/power-budget.md`.
- **Level gating does the pacing.** R4 requires character Level 5+, R5 requires Level 8+ (skill rank caps by level). Prestige talents don't need extra prerequisites beyond skill rank.
- **One prestige identity per skill first.** Before adding a second R5 to any skill, every skill should have at least one R4+ option.
- **Reference implementations.** ASK/MSK (rank ladder as identity), Supernatural Mobility, Presence of Conquest, and Foresight are the shipped R5 patterns to calibrate against.

## 6. Definition of Done

Every skill has at least one talent reaching R4, the P4.1 backlog is emptied or explicitly rejected, and all published entries live in `talents.json` with regenerated docs (`bun run content:gen`, green `content:check`).
