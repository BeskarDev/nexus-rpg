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
| Creature Builder rule tables (app) | `src/utils/data/json/creature-*.json` (tier stats, sizes, types, archetypes — NOT the roster) |
| **Treasure**: economy, item catalogues, magic-item pricing | [references/treasure-design.md](references/treasure-design.md) — read before writing any loot table |

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
- Damage/healing beyond basic attacks and spellcasting rules: principle 7 — spell scaling frameworks, max spell rank = magic skill rank, every spell verified to exist by grep.
- Condition-inflicting abilities: principles 8–9 — design against the published condition text, saves for high-impact conditions.

### 5. Size, Immunities, Resistances
Apply size modifiers and category-appropriate immunity sets from references. Resistances = half damage, weaknesses = double damage. Match to creature-type logic — undead aren't immune to everything; living creatures aren't immune to bleeding. Immunity counterplay per principle 10.

**Use the published damage-type names only** — acid, blast, fire, force, frost, lightning, necrotic, physical, poison, psychic, radiant (`docs/05-combat/02-attacking.md` § Damage Types). D&D's `cold` and `thunder` are **not** Nexus types; they drifted into the data once and had to be normalised to `frost` and `blast`. Anything off that list will also fail to render as a damage chip, since the chip map follows the published table.

### 5b. Lore (optional field, fixed structure)
A creature may carry a `lore` object, rendered collapsed behind a toggle on the card's
name line so it never competes with play-time reference. It is a **fixed structure**, not
free prose: every creature answers the same questions in the same order, so a reader
learns the shape once. Half the parts are prose and half are shorthand, and the split is
the point.

| Key | Kind | What to write |
|---|---|---|
| `narrative` | **prose**, required | One short passage in the setting's voice. What this creature *is*, not what it does. 2–3 sentences. |
| `environment` | shorthand | Terrain terms, **ordered generic to specific**: `["Desert", "Ruins", "Tomb"]`. See below. |
| `ecology` | **prose** | How they live: diet, range, activity, what wakes or draws them, what people believe and do about them. |
| `tactics` | **prose** | What they actually do in a fight — opening move, what they target, when they break off. Reference their own abilities by name. |
| `treasure` | shorthand + **d6 table** | `{ "scale": "...", "table": [...6 rows...] }`. See below. |
| `organization` | shorthand | Encounter templates (see below). Always include a solitary entry if they are ever met alone. |

Write it to the same standards as rules text: they/their/them, no semicolons or dashes,
no purple prose. Tactics should tell a GM how to *run* them, not restate the stat block.
Omit any optional key rather than writing an empty value — the generator rejects unknown
keys and empty strings outright, so the structure cannot drift entry by entry.

**Environment is a ranked vocabulary**, and the list must run broadest to narrowest:

| rank | meaning | terms |
|---|---|---|
| 1 | region — the land you travel through | Desert, Grassland, Steppe, Forest, Jungle, Mountains, Hills, Marsh, Coast, Sea, River, Wastes, Arctic, Underground, Sky, Otherworld |
| 2 | site — the place you arrive at | Ruins, Settlement, City, Temple, Fortress, Caves, Mine, Road, Farmland, Battlefield, Necropolis, Ship |
| 3 | feature — the chamber or lair you enter | Tomb, Crypt, Vault, Shrine, Lair, Nest, Den, Well, Sewer, Barrow |

This is **groundwork for a future encounter builder**: "a desert tomb, challenging for
three level-4 characters" is a rank-1 filter plus a rank-3 filter, and a tool can only
intersect creature lists per level if every entry agrees on what is broad and what is
narrow. An unknown term or an out-of-order list fails the build. Adding a term is a
deliberate act — extend `ENVIRONMENT_RANKS` in `generate-creatures.ts` rather than
inventing a synonym no filter will ever match.

**Treasure is a rollable d6 table**, not flavour text. Prose tells a GM what a creature
has and leaves them inventing specifics mid-session; a table is usable at once, and six
typed rows are what a future **hoard generator** can compose from.

**Read [references/treasure-design.md](references/treasure-design.md) before writing a
treasure table.** Loot is where creature design touches the most other systems at once —
the item catalogues, magic-item construction and pricing, the enchantment and material
catalogues, Quality tiers, and the coin economy — and every one of them has published
numbers that a treasure row can contradict. That file holds the tier→value anchor (the
harvesting table), the pricing formulas, and the worked Mummy example.

The four rules that matter most, in short:

1. **Price against the harvesting table.** It is the published creature-level→coins curve;
   a creature worth less than its own corpse is not worth looting. Items sell for **half**
   value (trade goods and gems for full).
2. **Name published items.** A weapon or armour row cites a real entry from
   `weapons.json` / `armor.json` — there is no *khopesh*, so the ceremonial one is a
   `Scimitar, Quality 2`. Decoration raises value, never damage.
3. **Magic items are assembled, not invented.** Base item + quality + optional special
   material + **at most one enchantment from `magic-item-enchantments.json`**, respecting
   its `applicableCategories` and `qualityTiers`. Magic items are Quality 3+. Keep quality
   in the creature's tier band: Q3–4 ≈ tiers 3–5, Q5–6 ≈ 6–8, Q7–8 only 9–10.
4. **Spread the six rows** across kinds, make every one specific, and give at least one
   row that is worth nothing in coins and everything in play (a name-scroll, a key, a map).

Schema:

```json
"treasure": {
  "scale": "Rich",
  "table": [
    { "kind": "Weapon", "item": "Ceremonial khopesh",
      "stats": "Scimitar, Quality 2", "value": "150 coins",
      "note": "Gold-inlaid but soundly forged, so it carries no penalty." },
    { "kind": "Magic", "item": "Amulet of Willpower",
      "stats": "Wearable (neck), Quality 4", "value": "1,050 coins",
      "note": "While worn, you gain +1 Resist (max. 10)." }
  ]
}
```

| field | required | content |
|---|---|---|
| `kind` | yes | **Weapon, Armor, Magic, Material, Valuables, Supplies, Relic** — closed, so a generator can filter and a GM can find the weapon without reading six rows. |
| `item` | yes | The **name only**, under 60 characters. The generator rejects prose here. |
| `stats` | when it has rules | What it IS in core-rules terms: `Scimitar, Quality 2`, `Wearable (neck), Quality 4`. |
| `value` | usually | `150 coins`, `3d6 x 10 coins`, or `—` when it cannot be sold. Never contradict the Quality in `stats`. |
| `note` | optional | One short qualifier, or a magic item's actual published effect. Not a paragraph. |

`scale` is one of **None, Incidental, Standard, Rich, Hoard** — how much, relative to what
is normal for their tier. A `table` of **exactly six rows** is required unless the scale is
`None`.

**Encounter templates** come in two shapes. Either N of this creature:

```json
{ "name": "Warden squad", "count": "2-4" }
```

or a mixed band naming other creatures, for the bands this creature is actually met in:

```json
{ "name": "Tomb guard", "composition": [
    { "count": "1",    "creature": "Mummy Lord" },
    { "count": "6-10", "creature": "Mummy" }
] }
```

Exactly one of `count` or `composition` — both is a size stated twice, neither says
nothing. Every name in a `composition` is **resolved against the roster and linked to
that creature's entry**, across tiers, and the build fails naming any creature that does
not exist. So a band can reference a leader written later, but only after that leader is
in `creatures.json`.

**Mummy (tier 4) is the reference implementation** — read it in `creatures.json` before
writing your first lore block.

> **Treasure scale is new vocabulary.** Nexus has no published treasure-by-tier system,
> so these five words were introduced with the bestiary's lore layer and describe relative
> quantity only. If a real treasure system lands later, this is the vocabulary to
> reconcile with.

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
  "lore": "Optional. Non-mechanical setting text, rendered collapsed under the block."
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
- `lore` is optional — omit the key rather than writing `""`.

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

When the owner corrects or refines a design decision in session (a balance call, a thematic boundary, a wording rule), append it to [references/designer-principles.md](references/designer-principles.md) (next free number, bolded one-line rule + reasoning + owner-ruling provenance, under the matching section — the file states the next free number). Numeric chassis corrections go into [references/stat-tables.md](references/stat-tables.md) instead. If it's frequently load-bearing, also add its one-line hook to the Design Principles section above. If the correction refines a *ported* principle, note the creature-side ruling there — never edit the spell-design or talent-design files from here. This is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons go into `references/`.
