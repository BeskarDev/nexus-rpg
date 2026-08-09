---
name: creature-design
description: "Design balanced, thematic creatures for Nexus RPG — stat blocks, attacks, abilities, Elite/Lord mechanics. Canonical data is src/utils/data/json/creatures.json; the tier pages are generated from it. Use when creating or revising creatures, encounter opponents, or reviewing creature stat blocks."
---

# Creature Design — Nexus RPG

Creatures are designed on a tier chassis (Tier 0–10, matching adventurer levels) with abilities layered on top for tactical identity. A single creature of a tier should challenge one adventurer of the same level.

**All numeric tables (tier stats, size modifiers, immunity sets, validation checklist) live in [references/stat-tables.md](references/stat-tables.md) — use them exactly, do not derive stats from memory.** Core system mechanics and writing standards: [../game-basics.md](../game-basics.md).

## Source-of-Truth Map

| What | Where |
|------|-------|
| **Canonical creature data** | `src/utils/data/json/creatures.json` — **edit here, never in the docs** |
| Published creatures by tier | `docs/08-creatures/03-creatures/tier-{0..10}.mdx` — **generated, do not hand-edit** |
| Creature rules (categories, Morale, troops, triggers) | `docs/08-creatures/02-creature-rules.md` |
| **Conditions** (official keyword list) | `docs/05-combat/04-conditions.md` |
| **Effect durations** (briefly/short/medium/long/very long) | `docs/06-scenes/02-effect-durations.md` |
| **Weapon/armor properties** | `docs/04-equipment/05-armor-weapon-properties.md` |
| Published spells (for spellcasting creatures) | `docs/07-magic/02-arcane-spells/`, `04-mystic-spells/` |
| Damage/healing scaling frameworks | `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 and §16 |
| Deep analysis (survivability math, encounter building, ability catalogues) | `docs/analysis/creature-creation-encounter-building-analysis.md` |
| **Types, subtypes, additives** | `creature-types.json`, `creature-subtypes.json`, `creature-additives.json` — 12 types, subtypes are an **array** so additives sit alongside the primary value |
| **Worldbuilding vault** | `~/git/personal/nexus-rpg-vault` (separate repo, German). `04 Natur/Bestiarium` holds the cosmological origin lore, `02 Kosmologie/Seelenreiche` the soul realms. **Read before designing a creature's identity. Read-only — never write to it** |
| **The twelve Folk** | `docs/02-adventurers/01-folk.md` — a humanoid creature **inherits its folk's published traits** rather than inventing them |
| Creature Builder rule tables (app) | `src/utils/data/json/creature-*.json` (tier stats, sizes, types, archetypes — NOT the roster) |
| **Attacks library** (Builder pre-sets) | `src/utils/data/json/creature-attacks-library.json` — template attacks by tags (melee/ranged/breath/natural) and `forTypes` hints. **An entry stores `weaponDamage` (a modifier on the tier's baseline) and an optional `baseAttribute`, never a damage figure** — see below |
| **Abilities library** (Builder pre-sets) | `src/utils/data/json/creature-abilities-library.json` — template abilities by tags and `forTypes` hints |
| **Type defaults** (Builder auto-fill) | `src/utils/data/json/creature-type-defaults.json` — maps creature type+subtype to default attack/ability IDs from the libraries above |
| **Treasure**: economy, item catalogues, magic-item pricing | [references/treasure-design.md](references/treasure-design.md) — read before writing any loot table |

**Keyword discipline**: only official conditions, durations, and weapon properties — complete lists in [../game-basics.md](../game-basics.md#canonical-keyword-sources). Anything non-official must be spelled out as an exact mechanical effect.

### Attack damage is derived, never written down

An attack's damage is computed from the creature's tier, in exactly one place, by
`formatDamageString(base, tierWeaponDamage + attack.weaponDamage)`:

- The three figures are **weak / strong / critical** and are `base + wd`, `base + 2wd`,
  `base + 3wd` — a **constant step**, and the step *is* the tier's weapon damage. It runs
  2, 2, 4, 4, 5, 7, 9, 10, 11, 15, 15 across tiers 0–10 in `creatures.json`.
- `base` comes from the attribute die named by `baseAttribute` (`STR`/`AGI`/`SPI`/`MND`).
  Omit it for an attack that is pure weapon damage, such as a breath weapon.
- `weaponDamage` is a **modifier**, not a figure: a heavy or slow attack sits above the
  tier baseline, a light or ranged one below it.

**Never write a literal damage figure into a library entry.** The library did, and a
tier-9 dragon picked up a tier-2 bite: the entry froze at whatever tier its author had in
mind. The same rule is why `CreatureAttack.damage` is an *override* channel — empty means
"the tier decides", and it is only set when a specific creature genuinely departs from the
chassis.

A fixed `+4` step is the other recurring error. It is right at one tier and wrong at the
other ten: at tier 9 it promises 15/19/23 where the creature data says 18/33/48.

## Design Principles

[references/designer-principles.md](references/designer-principles.md) holds the binding rules in full: native principles 1–7 and 13, principles 8–12 ported from the spell-design and talent-design corpora, and pointers to the shared spell-design wording and condition files that bind creature text verbatim. Read it before any design pass — this list is only the shortlist of the ones most often violated.

- **1.** Stat chassis + ability menu — never let either carry the whole design.
- **3.** Damage threads the needle between glass-cannon casters and heavy-armor martials.
- **5.** Adventurers don't heal on Wounds (creatures do) — factor into lethality.
- **7.** Ability output follows the spell scaling frameworks; every referenced spell verified to exist by grep.
- **8.** Check every condition against its published definition — stunned doesn't disable, only paralyzed does.
- **9.** High-impact conditions need a save or a rolled attack, never a no-roll trigger.
- **10.** Defensive abilities and immunities need counterplay; no auto-win offense either.
- **13.** Mythological-first roster identity — D&D imports only naturalized: renamed (legal minimum), setting-fit ecology. Entry names are **anglicised, no diacritics** (Mushhushshu, Girtablilu, Edimmu, Anzu).
- **14.** A game term must say what it is; lore names stay in `lore.narrative`.
- **15.** Timer, Threat, Treat — and the Treat has **five channels**, one of them lore-only. For ordinary animals a false mechanic is worse than none.
- **16.** Condition escalation prices a disable instead of banning it.
- **17.** Bonus damage comes in three rungs — flat, costed attack, SL escalator — and they are rungs, not a right answer.
- **18.** `briefly` (one turn) and `short` (rest of the fight) are the two in-combat durations. Never spell `briefly` out longhand.

## Creature Categories

| Category | Life Pools | HP Format | Wounds | Attacks | Abilities | Built-in Rules |
|----------|-----------|-----------|--------|---------|-----------|----------------|
| **Basic** | 1 | `40` | 1 | 1–2 | **0–3** | Rolls Morale, no Resolve, can form troops |
| **Elite** | 2 | `2×40` | 2 | 2–3 | 2–4 | 1 Resolve, +1 boon on Morale |
| **Lord** | 3 | `3×40` | 3 | 3–5 | 3–6 | 3 Resolve, second round at half Initiative, no Morale, recovers conditions on Wound, immune to repeated conditions after one success |

Life pool mechanics: when a pool hits 0 HP, the creature takes 1 Wound and immediately regains full HP (next pool). Lords also shed all negative conditions.

**A Basic may have zero abilities** (D-054), provided it has **at least one ability or trait between
the two lists**. Zero of both is too thin — nothing distinguishes the creature. Never add a filler
ability to satisfy a column: a creature carrying its identity in an attack rider or a subtype such as
`Swarm` has already earned its place. Elite and Lord minimums are unchanged, because their mandatory
triggers are what define those categories.

**Do not write "Special Rules" or "Combat Notes" sections in stat blocks** — Elite/Lord built-in rules apply automatically from the category.

### Mandatory Ability Requirements

- **Elite**: ≥1 **Elite Trigger** (power surge, ability unlock, or environmental change) and ≥1 Quick Action ability (reactive or proactive). **A trigger escalates — never write one that makes the fight easier** (principle 27), and check first whether the published rules already do it: a band breaking when its leader falls is Morale, not a trigger.
- **Lord**: ≥2 **Lord Triggers**, each shifting combat dynamics, plus ≥1 reactive AND ≥1 proactive Quick Action ability.

**Trigger wording is fixed.** Open every trigger with **`When this creature suffers a Wound, …`**. "Life
pool" is jargon from this skill and the old analysis document — the published rules
(`02-creature-rules.md`) only ever say a creature *suffers a Wound* and *regains all of their HP*, so a
stat block must too. An Elite needs no ordinal: it has two Wounds and the second kills, so only one Wound
can trigger anything. A **Lord takes the ordinal** — `their first Wound`, `their second Wound` — because
three Wounds and two mandatory triggers otherwise fire everything at once instead of escalating.
- **Elite/Lord**: ≥1 defensive ability fitting the fighting style — blocking, redirecting, evading, absorbing, negating, or environmental (category table in references) — with counterplay per principle 10.

## Creation Workflow

### 1. Concept
Define role (infantry, ranged, brute, cavalry, artillery, spawner), tier, category (Basic/Elite/Lord), size, and creature type (see type table in references). Check what already exists at that tier — avoid redundant designs. Query the canonical data rather than reading a page:

```bash
python3 -c "import json;[print(f\"{c['tier']:2} {c['category']:6} {c['name']}\") for c in json.load(open('src/utils/data/json/creatures.json')) if c['tier']==3]"
```

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
- Damage/healing beyond basic attacks: principle 7 — spell scaling frameworks.
- Condition-inflicting abilities: principles 8–9 and **16** — design against the published condition text, and **escalate** rather than landing a disable off one roll.
- **Limiters**: `recharge (dX)` (4+ at the **end** of the turn, d4/d6/d8 only), `once per scene`, or `once between your turns`. Nothing else.

#### NPC spellcasting

The canonical form, as the Dark Cultist Acolyte already writes it:

> This creature can cast the following spells, rolling Mind + Arcana, once per scene each: *Attack
> Thoughts*, *Subtle Suggestion*.

- NPCs draw on the **general published roster** — 201 arcane, 285 mystic. **No Focus, no spell slots, no per-day counting.**
- **Max spell rank = the creature's magic skill rank**, straight off the tier table. Every spell verified by grep.
- **Spells known ≈ max rank + 1** — a tier-3 cultist gets three, a tier-10 lich six. **A guideline, not a cap**: a creature designed as a master spellcaster may carry more.
- **Front-load, do not ration.** A spellcaster creature survives one to three turns. Withholding its best option means it dies before using it and the encounter never shows what the creature was.
- Bespoke magical abilities are valid **on top** of the list, and cost an ability slot. A spell costs only a line.

### 5. Size, Immunities, Resistances
Apply size modifiers and category-appropriate immunity sets from references. Resistances = half damage, weaknesses = double damage. Match to creature-type logic — undead aren't immune to everything; living creatures aren't immune to bleeding. Immunity counterplay per principle 10.

**Use the published damage-type names only** — acid, blast, fire, force, frost, lightning, necrotic, physical, poison, psychic, radiant (`docs/05-combat/02-attacking.md` § Damage Types). D&D's `cold` and `thunder` are **not** Nexus types; they drifted into the data once and had to be normalised to `frost` and `blast`. Anything off that list will also fail to render as a damage chip, since the chip map follows the published table.

**Undead default trait**: every Undead carries `Undead Nature` (*does not need to breathe, eat, drink,
or sleep*), alongside its required `Mindless` or `Intelligent` additive. Do not restate what the
additive already grants.

### 5b. Lore (optional field, fixed structure)
A creature may carry an optional `lore` object — a **fixed structure**, not free prose —
rendered collapsed behind a toggle on the card's name line so it never competes with
play-time reference. Write it to the same standards as rules text: they/their/them, no
semicolons or dashes, no purple prose. Omit any optional key rather than writing an empty
value; the generator rejects unknown keys and empty strings outright.

**Full schema — keys, environment vocabulary, treasure table, encounter templates:
[references/lore-schema.md](references/lore-schema.md).** Read it before writing a lore
block, and [references/treasure-design.md](references/treasure-design.md) before writing a
treasure table. **Mummy (tier 4) is the reference implementation** in `creatures.json`.

### 6. Write it into a draft document
**Never straight into `creatures.json`, and never into the tier pages at all.** Create (or append to) a batch file under the repo-root `.drafts/creatures/` (e.g. `.drafts/creatures/tier-<N>-batch.md`, or a concept-named file). The draft holds: a status banner ("pending owner approval, not yet published"), scope, per-creature design rationale (role, tier, category, any tier-adjustment justification), the full stat block in readable markdown, and an "open questions for owner" section flagging unresolved forks. The draft is the review artifact; publication only happens after owner approval.

Keep the draft in **readable markdown**, not JSON — it is for a human reviewer. The JSON record is written at publication (see Publication Pipeline), from the approved draft.

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
- ❌ Non-published damage types (`cold`, `thunder`) — use `frost`, `blast`.
- ❌ Hand-editing `docs/08-creatures/03-creatures/tier-*.mdx` — they are generated and the CI staleness gate will fail.

## The canonical record

`creatures.json` is the source of truth; the tier pages are generated from it. Every
creature is one object in that array:

```jsonc
{
  "name": "Sand Lurker",
  "type": "Large Monstrosity",        // "<Size> <Type>"
  "tier": 3,
  "category": "Basic",                // Basic | Elite | Lord
  "armor": "Light",                   // must also appear inside `av` below
  "hp": "30",                         // "2x40" / "3x40" for Elite / Lord life pools
  "av": "3 (natural light)",
  "str": "d8", "agi": "d8", "spi": "d6", "mnd": "d4",
  "parry": 9, "dodge": 9, "resist": 8,
  "skills": ["Fighting (2)", "Stealth (3)"],
  "immunities": [], "resistances": [], "weaknesses": ["fire"],
  "attacks": [
    {
      "name": "Bite",
      "properties": ["pierce"],       // official weapon properties, no asterisks
      "text": "8/13/18 damage. On a hit, the target is grappled."
    }
  ],
  "abilities": [
    {
      "name": "Sand Sense",
      "qualifier": "Passive",         // Passive | Action | Quick Action | Elite Trigger | Lord Trigger, optionally ", 3/day"
      "text": "This creature senses any creature touching the sand within short range."
    }
  ],
  "quickActions": [],
  "lore": { }                         // optional, fixed structure — see references/lore-schema.md
}
```

Field notes that the generator enforces (it fails the build, it does not guess):

- `armor` must appear inside the `av` string — the card shows only AV, abbreviated, and
  the guard exists so the card can never hide a real difference.
- `tier` and `category` must be known values, or the creature would silently vanish from
  every page.
- Attack `text` that OPENS with a clean `X/Y/Z damage.` triple is rendered as a
  weak/strong/critical ladder, and the word "damage" is dropped. Write the triple first
  and put everything else after it. Compound forms ("…damage plus 6 fire damage") are
  left as prose on purpose.
- `properties` and `qualifier` become badges; write them as plain words, no markup.
- Every string is markdown, so conditions and damage types auto-link and chip. Do not
  hand-write links.
- `lore` is an optional fixed-structure object — omit the key rather than writing an empty
  value. Keys and shapes: [references/lore-schema.md](references/lore-schema.md).

## Publication Pipeline

Every new creature starts life in a draft document under `.drafts/creatures/` (workflow
step 6). A creature stays a draft until the owner explicitly approves it as
production-ready. On approval:

1. **`src/utils/data/json/creatures.json`** — add the record. This is the only file you
   author by hand.
2. **`bun run content:gen`** — regenerates `docs/08-creatures/03-creatures/tier-*.mdx`.
   Never edit those files directly; `bun run content:check` runs in CI and fails on any
   hand-edit or missed regeneration.
3. **Notion** — push via the `notion-sync` skill.

Then verify: `bun run content:check` clean, `bun run build` green, and the creature
appears on its tier page with the right anchor. Stop there — the owner commits manually.

The `creature-*.json` files (tier stats, sizes, types, archetypes) are the Creature
Builder's **rule tables**, not the roster. Only touch them when the creature *rules*
change, and keep them consistent with `references/stat-tables.md`.

### Tooling status

`bun run creature:build` (the CLI in `src/utils/typescript/cli/`) still emits a **markdown
stat block**, which was the publication format before this migration and no longer has a
destination. Use it for its stat MATH — it applies the tier/archetype tables correctly —
then transcribe into the JSON record above. Reworking it to emit a JSON record directly
is a known outstanding task. The in-app Creature Builder and the Creature Cards print
tool are unaffected: they exchange markdown between themselves and never read
`creatures.json`.

## Designer Feedback Loop

When the owner corrects or refines a design decision in session (a balance call, a thematic boundary, a wording rule), append it to [references/designer-principles.md](references/designer-principles.md) (next free number, bolded one-line rule + reasoning + owner-ruling provenance, under the matching section — the file states the next free number). Numeric chassis corrections go into [references/stat-tables.md](references/stat-tables.md) instead, and corrections to the `lore` object — its keys, the environment vocabulary, treasure tables, encounter templates — into [references/lore-schema.md](references/lore-schema.md). If it's frequently load-bearing, also add its one-line hook to the Design Principles shortlist above. If the correction refines a *ported* principle, note the creature-side ruling there — never edit the spell-design or talent-design files from here. This is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons go into `references/`.
