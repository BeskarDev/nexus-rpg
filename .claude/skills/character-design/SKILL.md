---
name: character-design
description: "Build and review complete Nexus RPG characters — player fantasy, party role, attributes, origin, skills, talents, combat arts, spells, equipment. Use when designing or auditing a quickstart archetype, judging whether a build is thematic, balanced and synergistic, or answering 'is this a good character?'"
---

# Character Design — Nexus RPG

A character is not a list of choices, it is **one fantasy expressed nine times**. Attributes,
origin, skills, talents, arts, spells and gear are separate systems, and a good build is the
one where each of them says the same thing.

This skill builds a character from scratch and audits one that already exists. Core system
mechanics and writing standards: [../game-basics.md](../game-basics.md).

## Source-of-Truth Map

| What | Where |
|------|-------|
| **Quickstart archetype data** | `src/utils/data/json/archetypes.json` — **edit here, never in the docs** |
| Published archetype pages | `docs/01-basic-rules/03-quickstart-characters/*.mdx` — **generated, do not hand-edit** |
| Creation procedure (the nine steps) | `docs/01-basic-rules/02-character-creation.md` |
| Attributes, HP, defenses, skills | `docs/03-statistics/01-attributes.md`, `02-hit-points-wounds.md`, `03-defenses.md`, `05-skills.md` |
| Talents | `src/utils/data/json/talents.json`; published per skill under `docs/03-statistics/06-talents/` |
| Combat arts | `src/utils/data/json/combat-arts.json`; rules in `docs/05-combat/05-combat-arts/00-overview.md` |
| Spells | `src/utils/data/json/{arcane,mystic}-spells.json`; rules in `docs/07-magic/01-magic-spells/index.md` |
| Upbringings / backgrounds | `src/utils/data/json/upbringings.json` (21), `backgrounds.json` (47) |
| Equipment catalogues | `src/utils/data/json/{weapons,armor,equipment}.json`; load rules in `docs/04-equipment/01-items.md` |
| Companions | `docs/08-creatures/01-mounts-companions/` |
| Derivation + build audit code | `src/utils/content-gen/archetype-derivation.ts` — the arithmetic the build gate already enforces |

## The Nine Steps

Work them in order. Each step is answerable only because the one before it is settled; a build
that picks talents before it knows its fantasy ends up as a pile of good options that do not
add up.

| # | Step | Reference |
|---|------|-----------|
| 1 | **Name the player fantasy** in one sentence | [references/fantasy-and-roles.md](references/fantasy-and-roles.md) |
| 2 | **Judge the roles** the fantasy implies | [references/fantasy-and-roles.md](references/fantasy-and-roles.md) |
| 3 | **Distribute attributes** (one d8, one d4, two d6) | [references/attributes.md](references/attributes.md) |
| 4 | **Choose upbringing and background** | [references/origins.md](references/origins.md) |
| 5 | **Choose seven skills, three at rank 1** | [references/skills.md](references/skills.md) |
| 6 | **Choose one talent per rank-1 skill** | [references/talents.md](references/talents.md) |
| 7 | **Choose combat arts** (Fighting / Archery only) | [references/combat-arts.md](references/combat-arts.md) |
| 8 | **Choose spells** (Arcana / Mysticism only) | [references/spells.md](references/spells.md) |
| 9 | **Buy equipment**, then the companion if the build has one | [references/equipment.md](references/equipment.md), [references/companions.md](references/companions.md) |

**To review an existing character rather than build one, follow the same nine steps as an
audit** — reconstruct what fantasy the build implies, then ask at each step whether the choice
serves it. The rubric, the scoring, and the failure modes are in
[references/review-rubric.md](references/review-rubric.md).

## Design Principles

1. **The fantasy is the specification.** Every later choice is judged against one sentence: *"a
   X who does Y."* If a choice cannot be traced to that sentence, it is filler, however strong
   it is in isolation.
2. **Roles are a promise to the table.** A build that claims Tank must actually hold a line at
   rank 1 — not at rank 3. Claim what the sheet delivers now.
3. **Three rank-1 skills is the whole budget.** They are the character. Rank-0 skills are
   colour, coverage and growth potential, not capability — an expert skill at rank 0 still
   rolls at +1 bane.
4. **Talents carry the identity.** Attributes and gear are amplifiers; the three rank-1 talents
   are the only place where a build gets a *rule of its own*. If two archetypes differ only in
   equipment, they are the same character.
5. **Synergy over accumulation.** Prefer picks that make each other better (a debuff the build
   can exploit, a Quick Action that fits a turn with a spare one) over three unconnected
   strong picks. State the combination explicitly.
6. **Turn economy is a resource like coins.** Count what the build wants to do on a turn:
   Action, Quick Action, Movement. Two competing Quick Actions in one build is a conflict, not
   a synergy.
7. **The build must function at rank 1, unaided.** No plan whose first working turn requires a
   talent's rank 3, a level-4 attribute bump, or an item the character cannot afford.
8. **Cover the party's floor, not every eventuality.** A quickstart character should be able to
   contribute in combat, in exploration, and in a social scene — but it earns its seat by being
   the best in the party at one of them.
9. **Coins are a design surface.** A kit that spends 350 on one weapon says something; so does
   one that keeps 100 back. What it must not do is buy things the build never uses — or leave a
   purse idle while the build fights its own carrying capacity.
10. **Stay inside the mortal ceiling.** Rank 1 is a competent novice, not a hero: 3 skills at
    Novice, one talent each, four spells or two-to-three combat arts. Power fantasy comes from
    focus, never from breadth.

## Anti-Patterns

- ❌ **The tourist** — seven skills that each point somewhere different, no through-line.
- ❌ **Talent taken for the name** — a talent whose rank 1 does nothing the build can use yet.
- ❌ **The unarmed art** — a combat art the kit carries no legal weapon for (the build gate
  fails on this, and it has happened).
- ❌ **The dead attribute** — d8 in an attribute no rank-1 skill or talent rolls.
- ❌ **Second-wave synergy** — "this works once Fighting hits rank 3."
- ❌ **Role cosplay** — claiming Support with no ability that touches an ally.
- ❌ **Spell soup** — four spells that are four damage options, or four utility effects with no
  answer to a fight.
- ❌ **Gear that outshines the build** — a kit whose best feature is an item any character
  could buy.

## Validation Checklist

- [ ] One-sentence fantasy stated, and every step traceable to it
- [ ] Roles claimed match what the rank-1 sheet actually delivers
- [ ] Attributes: exactly one d8, one d4, two d6; the d8 feeds a rank-1 skill or a talent
- [ ] Derived stats sane for the role (HP, Parry, Dodge, Resist, carrying capacity)
- [ ] Upbringing and background exist in the catalogues and fit the fantasy
- [ ] Seven distinct skills; three at rank 1; customisations (`†`) are thematic, not optimal-only
- [ ] Three talents, one per rank-1 skill, each usable on turn one
- [ ] Talent rank-1 abilities do not compete for the same Quick Action
- [ ] Combat arts: exactly `2 × (weapon skills at rank 1) + 1 × (at rank 0)`, each matching a
      weapon in the kit
- [ ] Spells: correct count for the mode (Arcana 4, Balance 4, Devotion 6), ranks 0–1 only,
      catalyst bought
- [ ] Focus pool computed, and the build's per-scene spell plan fits inside it
- [ ] Equipment within 350 coins, free ammunition claimed; **capacity bought (Traveler's
      Backpack, 50c, +2, no load) before any kit is cut**; load over carrying capacity only as a
      deliberate trade, never above twice capacity, and the page carries the encumbered note
- [ ] Every item resolves to a catalogue entry by its exact name
- [ ] The build has at least one answer in combat, in exploration, and in a social scene
- [ ] Nothing in the build waits for rank 2+ to function

## Publication Pipeline

Quickstart archetypes are **JSON-canonical**. A revised archetype is published by:

1. **`src/utils/data/json/archetypes.json`** — the only file authored by hand. Equipment is a
   catalogue reference (`{ item, quantity?, note? }`) using the exact catalogue name; talents,
   combat arts, companions and familiars carry a short gloss each; `spellData` carries
   `{ magicSkill, mode, options[] }`.
2. **`bun run content:gen`** — regenerates the page and the overview. The generator is also the
   auditor: it recomputes coins, load, carrying capacity, focus pool, rank-0 skills, `†` marks
   and the combat-art count, and **fails the build** when the data cannot produce them.
3. **Notion** — push via the `notion-sync` skill.

Then verify `bun run content:check` clean and `bun run build` green. The same JSON builds a new
player's sheet through `createInitialCharacter`, so a data change is a change to the character
sheet as well as to the docs — never a docs-only edit.

## Designer Feedback Loop

When the owner corrects or refines a judgement in session — a role call, a talent preference, a
"this is not what that archetype is for" — append it to the matching reference file as a
bolded one-line rule plus its reasoning and provenance. This is the accumulated design memory
for characters; keep SKILL.md lean and let `references/` grow.
