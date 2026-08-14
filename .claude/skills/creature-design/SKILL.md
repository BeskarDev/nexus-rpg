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
| **Shared traits** (canonical) | `src/utils/data/json/creature-traits.json` — 47 reusable passives by name. A creature stores the NAME, `content:gen` expands it into a full Passive ability |
| **Types, subtypes, additives** | `creature-types.json`, `creature-subtypes.json`, `creature-additives.json` — 12 types, subtypes are an **array** so additives sit alongside the primary value |
| **Worldbuilding vault** | `~/git/personal/nexus-rpg-vault` (separate repo, German). `04 Natur/Bestiarium` holds the cosmological origin lore, `02 Kosmologie/Seelenreiche` the soul realms. **Read before designing a creature's identity. Read-only — never write to it** |
| **The twelve Folk** | `docs/02-adventurers/01-folk.md` — a humanoid creature **inherits its folk's published traits** rather than inventing them |
| Creature Builder rule tables (app) | `src/utils/data/json/creature-*.json` (tier stats, sizes, types, archetypes — NOT the roster) |
| **Attacks library** (Builder pre-sets) | `src/utils/data/json/creature-attacks-library.json` — template attacks by tags (melee/ranged/breath/natural) and `forTypes` hints. **An entry stores `weaponDamage` (a modifier on the tier's baseline) and an optional `baseAttribute`, never a damage figure** — see below |
| **Abilities library** (Builder pre-sets) | `src/utils/data/json/creature-abilities-library.json` — template abilities by tags and `forTypes` hints |
| **Type defaults** (Builder auto-fill) | `src/utils/data/json/creature-type-defaults.json` — maps creature type+subtype to default attack/ability IDs from the libraries above |
| **Treasure**: economy, item catalogues, magic-item pricing | [references/treasure-design.md](references/treasure-design.md) — read before writing any loot table |

### Every rule has ONE home

**A rule stated in two files will drift, and the second copy will be the one somebody follows.** That is
not a hypothesis — the limiter placement was written in three files, one drifted, and the wrong version
was followed three times before anyone noticed. Other files may **point** at a rule. They may not restate
it.

| Rule area | Its one home |
|---|---|
| Tier statistics, damage math, **carried gear Quality**, AV sources and stacking, recharge, limiter placement, validation checklist | [references/stat-tables.md](references/stat-tables.md) |
| Naming, taxonomy, folk inheritance, senses, magical naturalism, magic in decline | [references/principles/identity.md](references/principles/identity.md) |
| Chassis shape, tier adjustment, size and reach, light vs heavy, Timer/Threat/Treat | [references/principles/chassis.md](references/principles/chassis.md) |
| Conditions, counterplay, triggers, universal actions, leashes, reactive attacks, riders | [references/principles/abilities.md](references/principles/abilities.md) |
| Prose register, pronouns, saying it once, lore voice | [references/principles/writing.md](references/principles/writing.md) |
| The `lore` object: keys, `tactics`, environment, physiology, organization | [references/lore-schema.md](references/lore-schema.md) |
| Treasure economy, scales, relic channels, row composition | [references/treasure-design.md](references/treasure-design.md) |
| Workflow, categories, publication, what to load when | **this file** |
| The history behind a rule | [references/case-studies.md](references/case-studies.md) |

**When a ruling lands, put it in its home and add a pointer elsewhere if it is genuinely needed.** Adding
the full rule twice is how the skill breaks.

### Surface map — what else changes when you change this

**A rule that reaches more than one file has to be applied to all of them in the same pass.** The
companion trait library sat stale for a whole session because a pronoun fix went into the creature copy
only.

| Change this | And these change with it |
|---|---|
| A creature record (`creatures.json`) | `bun run content:gen` regenerates `docs/08-creatures/03-creatures/tier-*.mdx`. Nothing else |
| A **shared trait**'s text | **six files** (D-129): `creature-traits.json`, `companion-traits.json`, `creature-abilities-library.json` (the Builder pre-set), `docs/08-creatures/01-mounts-companions/traits.md`, and the two legacy Notion source tables `src/utils/data/markdown/companion-traits.md` and `split-tables/companion-traits.md`. **Plus any creature carrying a same-named `ability`** — the generator machine-checks the first two agree and does **not** compare abilities to the trait library, which is how `Pack Tactics` ended up with four wordings. Grep the name across the repo |
| A trait's **name** | the above, plus every `traits` array that references it — unknown names fail the build |
| A creature's **name** | every `lore.organization` `composition` row that names it, across all records |
| A **type, subtype or additive** | `creature-types.json` / `creature-subtypes.json` / `creature-additives.json`, plus `docs/08-creatures/02-creature-rules.md`'s type table |
| The **tier tables** | `references/stat-tables.md` **and** `creature-tiers.json` (the Builder's copy) **and** `02-creature-rules.md`'s derivation notes |
| A **condition or damage type** | it is published rules, not ours — change `conditions.json` / the attacking page, and the generator's guard lists follow |
| A **design ruling** | its one home above, the index in `references/designer-principles.md`, and the decision record |

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

**51 binding principles, split by phase so a task loads only what it needs.** Full text in
[references/principles/](references/principles/); the one-line index of all 46 and the
"which file when" table are in
[references/designer-principles.md](references/designer-principles.md).

| Before you… | Read |
|---|---|
| pick a concept, tier, category (step 1) | [identity.md](references/principles/identity.md) — naming, taxonomy, folk inheritance, magical naturalism, magic in decline |
| set statistics and attacks (steps 2-3) | [chassis.md](references/principles/chassis.md) — stat chassis, damage bands, Timer/Threat/Treat |
| write abilities or a trigger (step 4) | [abilities.md](references/principles/abilities.md) — conditions, counterplay, escalation, durations, universal actions |
| write any text at all | [writing.md](references/principles/writing.md) — canonical wordings, pronouns, lore prose, say-it-once |

**Do not design from the index.** The summaries say *which* principle applies, never what it
says — every one of them is a compressed ruling with a worked example behind it.

The three most-violated, kept here because they are cheap to state and expensive to miss:

- **8.** Check every condition against its published definition — `stunned` doesn't disable, only `paralyzed` does.
- **10.** Defensive abilities and immunities need counterplay; no auto-win offense either.
- **44.** A carried weapon's damage and properties are the catalogue's, changed only by a legitimate
  Quality step. Build-checked. Riders on weapon attacks are allowed and are how high-tier armed creatures
  close the chassis gap.
- **15.** Timer, Threat, Treat — the Treat has **five channels**, one of them lore-only. For ordinary animals a false mechanic is worse than none.

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

### Load exactly what the step needs

**The skill is ~41k tokens. No task needs all of it.** Load per step and the routine cost of a
stat-block pass drops by roughly 12,600 tokens with nothing removed from the skill (Q9.5).

| Step | Load | Do NOT load |
|---|---|---|
| **1** concept, tier, category | [identity.md](references/principles/identity.md), [stat-tables.md](references/stat-tables.md) § tier table | lore-schema, treasure-design, writing.md |
| **2-3** statistics, attacks | [chassis.md](references/principles/chassis.md), [stat-tables.md](references/stat-tables.md) | lore-schema, treasure-design |
| **4** abilities | [abilities.md](references/principles/abilities.md), the **interaction manifest** below, `conditions.json` | lore-schema, treasure-design |
| **5b** lore | [lore-schema.md](references/lore-schema.md), [writing.md](references/principles/writing.md) | chassis, stat-tables |
| **5b** treasure only | [treasure-design.md](references/treasure-design.md) | everything else |
| **7** validate | the phase files you actually used | the ones you did not |
| any | [case-studies.md](references/case-studies.md) **only when you want the history behind a rule** | — |

**`lore-schema.md` and `treasure-design.md` are 9,500 words together and are irrelevant to a stat
block.** Loading them "to be safe" is the single largest avoidable cost in the skill.


### 1. Concept
Define role (infantry, ranged, brute, cavalry, artillery, spawner), tier, category (Basic/Elite/Lord), size, and creature type (see type table in references). Check what already exists at that tier — avoid redundant designs. Query the canonical data rather than reading a page:

```bash
python3 -c "import json;[print(f\"{c['tier']:2} {c['category']:6} {c['name']}\") for c in json.load(open('src/utils/data/json/creatures.json')) if c['tier']==3]"
```


> **Gate — answer these in the notes file before step 2:**
> 1. What is the **tactical question** this creature asks the party?
> 2. What already exists at this tier, and how is this one **not** a near-duplicate?
> 3. Does the name promise exactly what the stat block will deliver?

### 2. Base Statistics (from tier table)
- **HP**: tier table value, formatted per category (`40`, `2×40`, `3×40`).
- **AV**: light = tier, heavy = 1.5×tier rounded up. Bone/stone/metal creatures typically heavy. Size: ±1 tier.
  **The light/heavy choice is about `slash`, not only about AV** (principle 39): a heavy-armored creature
  is immune to the slash bonus, so blades lose about a third of their damage against it. Ask whether
  swords should work on this creature and write the answer down.
- **Defenses** (Parry/Dodge/Resist): base 6 + tier each. **The default spread is ±1** — one up, one flat, one
  down — with **size modifiers on top** (Large/Huge: Parry up, Dodge down; Small/Tiny: reverse). **`base + 2`
  is rare, is the ceiling for any single Defense at that tier, and must be paid for in HP or AV** so it does
  not become a wall (D-142). One point of Defense is worth far more than one point of AV — the arithmetic is
  in [references/stat-tables.md](references/stat-tables.md#the-defense-spread-base-1-by-default-base--2-is-the-tiers-rare-ceiling-d-142).
- **Armor**: `heavy` costs the creature **one tier of Defense base**, and its Parry sits at the middle of the
  spread or below. Heavy armor buys AV, not being hard to hit (D-141).
- **Attributes**: primary = tier's max attribute die; secondaries 1–2 die sizes below.
- **Skills**: primary combat/magic skills at "1st" rank from table, others at "2nd"; add thematic skills (Stealth for ambushers, etc.).

#### Tier adjustment — ask this for every creature, do not skip it

**Shift one stat a tier up, and pay for it by shifting another a tier down.** This is what makes two
creatures of the same tier feel like different animals instead of the same body with different text,
and it is the step most likely to be skipped, because the unadjusted chassis already produces a
*legal* creature. The first three bestiary batches produced **seventeen creatures with zero
adjustments**, including an ogre with average Strength and trained skill, and nothing flagged it
(D-097).

**The question, asked out loud at this step:** *what is this creature better at than its tier, and
what does it give up for that?*

| Trade | Says | Example |
|---|---|---|
| Attribute up, **skill rank down** | Brutal physique, no technique | Ogre: d10 Strength, Fighting (1) |
| Skill rank up, attribute down | Trained and slight | a duellist, an assassin |
| Magic skill up, **HP down** | Out-casts their tier, dies to two hits | the frail adept |
| **HP up, Defense down** | A slab. Easy to hit, hard to drop | the shambling dead |
| **AV up, HP down** | Hard shell, brittle inside | fired clay, chitin |
| Defense up, HP down | Evasive and fragile | a skirmisher |

**"Nothing" is a real answer** — for a professional soldier, a city guard, a rank-and-file raider. Those
are the baseline the adjusted creatures are read against, and if everything is adjusted then nothing is.
Expect roughly **a third of a batch** to carry one, not all of it and not none.

**Hard limits, because the chassis is tightly calibrated:**

- **One pair only.** One stat up, one stat down. Never two pairs.
- **One tier of movement, never more.** Two tiers is debatable in very few circumstances and should be
  treated as a design error until argued. **Defense is the stat to be most careful with** — one point
  moves hit rates several percent across the whole encounter, so a Defense shift is a bigger change than
  the same "one tier" of HP.
- **The overall challenge stays at the intended tier.** If the trade makes the creature plainly better,
  it is not a trade.
- **Tier 0 has almost no headroom** and tier 1 little: HP cannot go below the tier-0 floor and skills are
  already at 0/1, so the low tiers are mostly unadjusted by structure rather than by choice.


> **Gate — answer these before step 3:**
> 1. **What is this creature better at than its tier, and what does it give up for it?** "Nothing" is a
>    real answer for a baseline and a poor one for a monster. Write the answer down either way.
> 2. **Should blades work on this creature?** That is the light/heavy decision, not the AV number.
> 3. Is every figure off the tier table, with at most **one traded pair**?

### 3. Attacks
Damage formula — always exactly:
- **Weak** = Base + Weapon | **Strong** = Base + 2×Weapon | **Critical** = Base + 3×Weapon
- **Base damage** = half the die of **the attribute that attack uses** — Strength, or **Agility for an
  `agile` weapon** (d6→3, d8→4, d10→5, d12→6, d12+1→7, d12+2→8). **Not the creature's highest die.** A
  caster with Spirit d10 and Strength d6 swings a knife off the **d6**.
- **Weapon damage** — the tier's figure from the table in
  [references/stat-tables.md](references/stat-tables.md) for a **natural** weapon; the **catalogue row's
  damage** for a **carried** weapon (principle 23). Half, rounded up, for multi-target.
- Write as `5/7/9 damage (base 5 + weapon 2)`.

**A carried weapon is a published weapon or a published reskin of one** (principle 23, D-119). Name it
whatever suits the culture, then take its properties and its damage from the catalogue row verbatim.
`docs/04-equipment/03-weapons.md` carries the regional reskin tables for exactly this: *Flail* counts as
*Mace*, *Scepter* as *Quarterstaff*, *Khopesh* as *Scimitar*, *Dagger* as *Shortsword*. Use only official
weapon properties (`docs/04-equipment/05-armor-weapon-properties.md`).

> **Gate — answer these before step 4:**
> 1. **Name the catalogue row every carried weapon resolves to**, in the notes file, with its damage
>    figure. "It is a natural weapon" is the other acceptable answer. Anything else is an invented weapon
>    (D-119) — this rule existed as principle 23 for three batches and was still broken by a `Censer`
>    written as `(crush, reach)`.
> 2. Is every damage figure `base + 1x/2x/3x weapon`, with base taken from **that attack's own
>    attribute** and the weapon value from the catalogue row or the tier figure? **An always-on critical
>    bonus is the one exception** — it is folded into the critical figure and declared as
>    `critWeaponDamage` (D-135), while a situational one such as `slash` stays out.
>    [stat-tables.md § Always-on bonuses](references/stat-tables.md#always-on).
> 3. Does the **creature** offer more than a damage number, and is every plain attack genuinely plain
>    (D-073)? It does **not** have to be an attack that carries it — the published **Slinger** has two
>    plain weapons and puts its effect in a Passive, which is the right pattern for any creature whose
>    whole loadout is plain catalogue gear.
> 4. Does any rider **add damage**? If so, it is paid for in weapon damage (D-110).
> 5. **Does every carried weapon use the catalogue's real damage and real properties?** This is
>    **absolute and build-checked** (D-133): set `weapon` on the attack to the row it resolves to, copy the
>    property list verbatim, and take the damage from the row plus **only** the Quality step your tier and
>    category allow (D-091). **Never dock weapon damage to pay for a rider.** A deliberate exception sets
>    `quality` on the attack and says why here. Omit `weapon` for natural weapons.
>    **Riders themselves are allowed** — they are how an armed creature closes the chassis gap at high tier
>    (principle 40). Prefer the catalogue's own channel where one exists (`entangle` for movement, `crush`
>    for armor, `slash` for light armor), and at tiers 0-2 ask what the rider is *for*, since gear still
>    keeps pace with the chassis there. An effect that needs the object to be special is an ability.
> 6. **Who else on the roster carries this loadout, and is that deliberate?** (D-122.) Sharing a kit is
>    correct when the sharing *is* the design — the Veteran is *a better Spearman* on purpose. It is a
>    defect when it is inheritance nobody re-examined, which is how a Captain ended up as the third
>    record with `Spear` + `Shield Bash`. **Loadout is an identity axis**, and the fiction usually names
>    the fix: the rank and file carry spears, the officer carries a sword. Shields are exempt — a shield
>    doing a shield's job is not a collision.

**Changing a weapon type changes two numbers, so check both.** Damage moves with the catalogue row, and
`slash` adds weapon damage **a second time** against light or no armor (D-099). A Q3 Broadsword on a
tier-3 officer reads 8/12/16 against a martial and **12/16/20 against an unarmored caster**, which is
principle 3's needle threaded the wrong way. Swap a weapon, then re-read the damage line against **both**
armor cases and against the creature's own category rung ([the gear-Quality ladder](references/stat-tables.md#carried-gear-quality--per-tier-and-category-d-091), D-091).

### 4. Abilities

#### Read before you write — the interaction manifest

**Before writing any ability, find what it does in this table and read the published rule first.** Three
of the eleven errors in the tier-3 review were the same shape: **an invented mechanic that a published
rule already covered**, written because the design satisfied a checklist without consulting the system it
touched. This table exists to make that impossible to do by accident.

| If the ability… | Read first | What you would otherwise reinvent |
|---|---|---|
| moves a creature, pushes, throws, drags | the **`pushed`** condition, `03-distances-movement.md` | `pushed` already gives collision damage to **both** parties and the falling rules knock both prone |
| deals damage without an attack roll | falling damage, `02-attacking.md` | a bespoke number that does not scale |
| reacts to something an enemy does | the **universal Quick Actions** in `01-combat-scenes.md` | Opportunity Attack and **Protect Ally** already occupy this space |
| applies a condition | that condition's text in `conditions.json` | `stunned` does not remove a turn; only `paralyzed` and `unconscious` do |
| turns a condition off | the condition's own removal clause | a second, conflicting removal rule |
| resembles a spell | the tradition's list at that rank | the Cult Priest's knife rider **was `Minor Hex` verbatim** |
| grants a sense | `creature-traits.json` and the companion distribution | a creature-only sense nobody can reuse |
| grapples, trips, shoves | the Grapple action, `01-combat-scenes.md` | size rules that already exist |
| ignores or reduces armor | `slash`, `crush`, the AV rules | a bespoke armor bypass |
| is carried by a weapon | `05-armor-weapon-properties.md` | `reach`, `versatile`, `heavy` do it already |

**The rule in one line: if a published rule already covers your effect, cite it instead of restating it.
If you genuinely cannot find one, say so in the notes file** — that sentence is how a real gap gets
found instead of quietly papered over.

- **Ability TN** = 6 + tier. Saves usually Spirit/Strength + Fortitude. Official durations only.
- Add mandatory trigger/Quick Action/defensive abilities per category (above), then thematic abilities: movement, senses, auras, environmental manipulation.
- Damage/healing beyond basic attacks: principle 7 — spell scaling frameworks.
- Condition-inflicting abilities: principles 8–9 and **16** — design against the published condition text, and **escalate** rather than landing a disable off one roll.
- **Limiters**: `recharge (dX)` (4+ at the **end** of the turn, d4/d6/d8 only), `once per scene`, or `once between your turns`. Nothing else.
- **A limiter is the LAST SENTENCE of the effect text. Never the qualifier, never an attack property.**
  The qualifier is one word saying what kind of action this is, and nothing follows it. This is the most
  frequently repeated error in the programme, so check it on every ability you write:
  > ✅ `**Spellcasting** (Action). This creature can cast … *Rotting Grasp*. **This creature can cast each of these spells once per scene.**`
  > ❌ `**Spellcasting** (Action, once per scene each). …`
- **Never give a creature a second attack in its own turn.** The Nexus form is a **conditional second
  attack as a Quick Action**, triggered on something an enemy does (principle 41). It closes the
  armed-humanoid damage gap, keeps the GM's turn short, and comes with counterplay built in.

#### NPC spellcasting

The canonical form, as the Dark Cultist Acolyte already writes it:

> **Spellcasting** (Action). This creature can cast the following spells, rolling Mind + Arcana:
> *Attack Thoughts*, *Subtle Suggestion*. This creature can cast each of these spells once per scene.

**The ability is always called `Spellcasting`.** One generic name reused on every caster in the roster,
so a GM finds it in the same place on every card. Flavour names — `Rites of the Grave`, `Blood Litanies`
— go in the lore, never on the ability (D-107). The limiter is the **last sentence**, never the
qualifier.

- NPCs draw on the **general published roster** — 201 arcane, 285 mystic. **No Focus, no spell slots, no per-day counting.**
- **Max spell rank = the creature's magic skill rank**, straight off the tier table. Every spell verified by grep.
- **Category never raises spell rank** (D-092). Basic, Elite and Lord casters at one tier share a
  ceiling, exactly as a tier-3 Elite fighter has the same Fighting (2) as the tier-3 Basic. Category
  buys HP, triggers, actions and **gear Quality**, never a skill rank. The counterplay floors are
  written against spell rank — rank 2 answers arrive at level 3, rank 3 at level 5 — so an Elite
  casting a rank above its tier is an unanswerable fight rather than a harder one.
- **Spell damage does scale with category, through the catalyst.** A Spell Catalyst is Quality 2 gear
  and takes the same ladder as a weapon (`07-magic-items/effects.md`): +1 spell damage per step above
  base. So the [gear-Quality ladder](references/stat-tables.md#carried-gear-quality--per-tier-and-category-d-091) applies unchanged — a tier-3 Elite caster carries a **Q3 catalyst, +1 spell
  damage**, precisely as a tier-3 Elite fighter carries a Q3 weapon. The parallel is exact: **Spell
  Power (half Mind or Spirit) is the caster's base damage, the spell's own `+X` is its weapon damage,
  and the catalyst's Quality is the masterwork step.**
- **What an Elite or Lord caster gets instead of rank:** more spells known (the "rank + 1" figure is a
  guideline, not a cap), and **triggers that cast** — an Elite Trigger that refreshes its best spell or
  casts one free is the caster's version of `Blood Up`.
- **To out-cast your tier, pay for it.** The tier-adjustment rule (step 2) already allows one stat up a
  tier against another down: a frail hierophant takes magic skill at tier + 1 and gives up HP. That is
  the sanctioned lever, and it costs something.
- **Spells known ≈ max rank + 1** — a tier-3 cultist gets three, a tier-10 lich six. **A guideline, not a cap**: a creature designed as a master spellcaster may carry more.
- **Front-load, do not ration.** A spellcaster creature survives one to three turns. Withholding its best option means it dies before using it and the encounter never shows what the creature was.
- Bespoke magical abilities are valid **on top** of the list, and cost an ability slot. A spell costs only a line.


> **Gate — answer these before step 5:**
> 1. For **each** ability: did you read the published rule it touches, from the interaction manifest?
>    Name it in the notes. "I could not find one" is an acceptable answer and a useful one.
> 2. Is every qualifier a **single closed-list word**, with any limiter as the **last sentence**?
> 3. Does every condition match its published text, and is every high-impact one gated?
> 4. Does the creature restate any **universal action**?
> 5. Elite/Lord only: does each trigger **escalate**, and open `When this creature suffers a Wound`?

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

**Full schema — keys, environment vocabulary, physiology, treasure table, encounter templates:
[references/lore-schema.md](references/lore-schema.md).** Read it before writing a lore
block, and [references/treasure-design.md](references/treasure-design.md) before writing a
treasure table. The **eight worked blocks in `.drafts/bestiary/creatures/tier-0-1-lore.md`**
are the reference implementation while the roster is being rebuilt.


> **Gate — answer these before step 6:**
> 1. Does `tactics` cover the five things (opening, priority, turn loop, breaking off, hard limits) and
>    nothing else?
> 2. Is every treasure row a specific object with one value, and does the table total sit in its band?
> 3. Does any lore claim date the setting's history, or grant a sense the creature has not earned?

### 6. Write it into a draft, split across three files
**Never straight into `creatures.json`, and never into the tier pages at all.** A batch is **three
files** under `.drafts/creatures/` (or the programme folder in use), and the split is load-bearing:

| File | Holds | Never holds |
|---|---|---|
| **`tier-<N>-batch.md`** | The **designs only.** Status banner, a scope table of what is in the batch, and one section per creature: a one-line theme, role and Treat, then the stat block, attacks, abilities and traits in readable markdown | Rationale, alternatives considered, balance math, revisions to published records, open questions |
| **`tier-<N>-notes.md`** | Everything else. Why a number moved, what was cut and why, revisions to already-published records, the balance check, failure-mode tables, and the **`## Open Questions for Owner`** section | Stat blocks |
| **`tier-<N>-lore.md`** | The `lore` blocks, one per creature | Stat blocks |

**The batch file is the thing the owner reads to review a design, so it stays lean** (owner ruling,
2026-08-11, D-088). The first two batches put the reasoning inline and landed at 1,195 and 1,534 lines
before their lore files, which buries the eight stat blocks somebody actually has to check. Reasoning is
worth keeping — it is why a later session does not re-litigate a settled call — it just does not belong
between two creatures.

**Cross-reference rather than repeat.** The batch file's banner links to its notes file, and a creature
section may carry a single pointer line (*"chassis rationale in the notes, § Ghoul"*). Say it once
(principle 32) applies across the pair.

Keep all three in **readable markdown**, not JSON — they are for a human reviewer. The JSON record is
written at publication (see Publication Pipeline), from the approved draft.

### 7. Validate
Run the full checklist in [references/stat-tables.md](references/stat-tables.md#validation-checklist), then sanity-check against 2–3 published creatures of the same tier and category — comparable power, no strict domination.

**Then run the principle sweep.** Open each phase file you used and check the draft against its
principles by number. A design pass that never re-opened a principle file has not been validated,
it has been written — the recurring failures below were all caught this way, one review at a time:

| Sweep | Ask of the draft |
|---|---|
| [identity.md](references/principles/identity.md) | Does the name promise what the stat block delivers? Is a real animal called by its real name, an invented one built as *one* deviation, a folk creature inheriting only what its folk entry grants? |
| [chassis.md](references/principles/chassis.md) | Is every number off the tier table, with at most one traded pair? **Was the tier-adjustment question asked, and is the answer written down even when it is "no"?** Does the encounter have a Timer, a Threat and a Treat — and is the Treat real rather than invented? |
| [abilities.md](references/principles/abilities.md) | Every condition checked against its published text? Every high-impact one gated by a save or a roll? Every defence counterable? Triggers escalating, opening `When this creature suffers a Wound`? Nothing restating a universal action? **Is every qualifier a single word with no limiter attached, and is every limiter the last sentence of its text?** **Does every carried attack declare its `weapon` row, with the catalogue's properties and damage (principle 44)? The build checks it, so a green `content:check` is the answer.** |
| [writing.md](references/principles/writing.md) | Canonical wordings copied verbatim? Subject named where two creatures share a sentence? Superstitions recorded rather than debunked, nothing said twice? **Register pass run on every prose field and every treasure row, with the swap list written down** — the hard word, and the clever construction made of common words (29a). A punctuation sweep is not a register pass and will not catch one. |

Key failure modes:

- ❌ Damage math like `6/10/14` (doubling the increment) — correct is base + 1×/2×/3× weapon: `6/8/10`.
  An **always-on** critical bonus is the one legitimate departure and must be declared (D-135).
- ❌ **A carried weapon whose damage or properties are not the catalogue's** — an invented property, a
  bespoke damage figure, or weapon damage docked to pay for a rider. Broken three times, so the build now
  fails on it ([principle 44](references/principles/abilities.md), D-133). Riders are fine; changing the
  weapon is not.
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
  "size": "Large",                    // own field, from creature-sizes.json
  "type": "Magical Beast",            // one of the twelve
  "subtype": ["Primal"],              // ARRAY — subtypes plus any additives.
                                      // `Mindless` or `Intelligent` is REQUIRED
                                      // here on every Undead and Automaton
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
      "qualifier": "Passive",         // Passive | Action | Quick Action | Elite Trigger | Lord Trigger.
                                      // ONE value, NOTHING after it. A limiter is never written here —
                                      // it is the LAST SENTENCE of `text`. Only `Action` may have one.
                                      // The qualifier also DECIDES WHICH CARD GROUP this renders under
                                      // (D-147), so it is structural, not decorative.
      "text": "This creature senses any creature touching the sand within short range."
    }
  ],
  "traits": ["Keen Scent"],           // NAMES ONLY, resolved from creature-traits.json
  "lore": { }                         // optional, fixed structure — see references/lore-schema.md
}
```

### Traits are stored by name and resolved at build time

A creature's **shared** passives — `Keen Scent`, `Amphibious`, `Undead Nature`,
`Blindsight (close)` — go in `traits` as **names only**. Their wording lives once in
`src/utils/data/json/creature-traits.json` (47 entries, extracted from the companion trait
library so creatures and companions cannot drift on what a trait means), and
`content:gen` **expands each name into a full `Passive` ability** on the published card.

- **The card shows no seam.** A GM reads one Abilities list with every effect spelled out.
  The split is an authoring convenience: one fix to a trait's text reaches every creature
  carrying it.
- **Unknown names fail the build**, which is what catches a near-miss: the first batch
  wrote `Blindsense`, and the published trait is `Blindsight (close)`.
- **Parameterised traits carry their parameter in the name** — `Blindsight (close)`,
  `Blindsight (medium)`, `Flying (Wings)`, `Darkvision (medium/long)` — because that is how
  the trait library already stores them.
- **A trait unique to one creature is not a trait.** Write it as an ability on that creature.
  The library is for wording used more than once.

Field notes that the generator enforces (it fails the build, it does not guess):

- `armor` must appear inside the `av` string — the card shows only AV, abbreviated, and
  the guard exists so the card can never hide a real difference.
- `tier` and `category` must be known values, or the creature would silently vanish from
  every page.
- Attack `text` that OPENS with a clean `X/Y/Z damage.` triple is rendered as a
  weak/strong/critical ladder, and the word "damage" is dropped. Write the triple first
  and put everything else after it. Compound forms ("…damage plus 6 fire damage") are
  left as prose on purpose.
- **The card groups entries by when a GM uses them, not by array** (D-147): **Actions** (every
  `attacks` entry plus abilities qualified `Action`), then **Quick Actions**, **Triggers**, and
  **Passives** (including resolved traits). So `qualifier` is structural — it picks the group.
- `properties` become badges; write them as plain words, no markup. **`qualifier` does not** — its
  group heading already states it, so only attacks carry badges.
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
**Notion is out of the design process** (owner ruling, 2026-08-11). The workspace's inline databases are the pre-migration system and keeping them in sync costs more than it returns. The `notion-sync` skill stays available for a deliberate, owner-requested push. Do not run it as a publication step.

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

When the owner corrects or refines a design decision in session (a balance call, a thematic boundary, a wording rule), append it to the matching phase file in [references/principles/](references/principles/) — `chassis`, `identity`, `abilities` or `writing` — as the next free number (bolded one-line rule + reasoning + owner-ruling provenance), **and add its one-line summary to the index in [references/designer-principles.md](references/designer-principles.md)**, which states the next free number. Numeric chassis corrections go into [references/stat-tables.md](references/stat-tables.md) instead, and corrections to the `lore` object — its keys, the environment vocabulary, treasure tables, encounter templates — into [references/lore-schema.md](references/lore-schema.md). If it's frequently load-bearing, also add its one-line hook to the Design Principles shortlist above. If the correction refines a *ported* principle, note the creature-side ruling there — never edit the spell-design or talent-design files from here. This is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons go into `references/`.
