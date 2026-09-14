# Creation Workflow

Seven steps. Each one names what to load and ends in a **gate** — questions answered in the notes file
before moving on. The gates are where designs get caught; a step without its gate answered is not done.

**Rules live in the principle files, not here.** This document is the order of operations and the
questions. Where a step cites a principle by number, open it rather than working from the summary.

## Load exactly what the step needs

| Step | Load | Do NOT load |
|---|---|---|
| **1** concept, tier, category | [identity.md](principles/identity.md), [stat-tables.md](stat-tables.md) § tier table | lore-schema, treasure-design, writing.md |
| **2** statistics | [chassis.md](principles/chassis.md), [stat-tables.md](stat-tables.md) | attacks.md, abilities, lore-schema, treasure-design |
| **3** attacks | [attacks.md](principles/attacks.md), [stat-tables.md](stat-tables.md); for an **Elite or Lord** also principle 60 in [abilities.md](principles/abilities.md), because the attack list IS the Action menu | lore-schema, treasure-design, validation-checklist |
| **4** abilities | [abilities.md](principles/abilities.md), the interaction manifest below, `conditions.json` | lore-schema, treasure-design |
| **5b** lore | [lore-schema.md](lore-schema.md), [writing.md](principles/writing.md) | chassis, stat-tables |
| **5b** treasure only | [treasure-design.md](treasure-design.md) | everything else |
| **7** validate | [validation-checklist.md](validation-checklist.md) and the phase files you actually used | the ones you did not |
| **8** publish | [publication.md](publication.md) | the principle files |
| any | [case-studies.md](case-studies.md) **only when you want the history behind a rule** | — |

**`lore-schema.md` and `treasure-design.md` are 9,500 words together and are irrelevant to a stat block.**
Loading them "to be safe" is the single largest avoidable cost in the skill.

---

## 1. Concept

Define role (infantry, ranged, brute, cavalry, artillery, spawner), tier, category, size, and creature
type. Check what already exists at that tier — query the data rather than reading a page:

```bash
python3 -c "import json;[print(f\"{c['tier']:2} {c['category']:6} {c['name']}\") for c in json.load(open('src/utils/data/json/creatures.json')) if c['tier']==3]"
```

> **Gate:**
> 1. What is the **tactical question** this creature asks the party?
> 2. What already exists at this tier, and how is this one **not** a near-duplicate?
> 3. Does the name promise what the stat block will deliver, and is it built the way principle 52 says?
>    **Ask it again at step 7**, because only then does the kit exist to check the promise against.

## 2. Base Statistics

Every figure comes off the tier table in [stat-tables.md](stat-tables.md). In short:

- **HP** — tier value, formatted per category (`40`, `2×40`, `3×40`).
- **AV** — light = tier, heavy = 1.5×tier rounded up; size ±1 tier. Bone, stone and metal are usually heavy.
- **Defenses** — base `6 + tier`, **default spread ±1** with size modifiers on top. `base + 2` is rare, is
  the tier's ceiling for one Defense, and is paid for in HP or AV (D-142).
- **Armor** — `heavy` costs one tier of Defense base, Parry mid-spread or below (D-141).
- **Attributes** — primary = tier's max die, secondaries 1-2 sizes below.
- **Skills** — primary combat or magic skill at the tier's 1st rank, others at 2nd, plus thematic skills.

Then **ask the tier adjustment question** (principle 38) and the **blades question** (principle 39). Both
are easy to skip because the unadjusted chassis already produces a legal creature, and seventeen creatures
went out unadjusted before anything flagged it.

> **Gate:**
> 1. **What is this creature better at than its tier, and what does it give up for it?** "Nothing" is a
>    real answer for a baseline and a poor one for a monster. Write the answer down either way.
> 2. **Should blades work on this creature?** That is the light/heavy decision, not the AV number.
> 3. Is every figure off the tier table, with at most **one traded pair**?

## 3. Attacks

- **Weak / Strong / Critical** = base + 1× / 2× / 3× weapon damage. Never a doubled increment.
- **Base** = half the die of **that attack's own attribute** — not the creature's highest. A caster with
  Spirit d10 and Strength d6 swings a knife off the d6.
- **Weapon damage** = the tier's figure for a **natural** weapon, the **catalogue row's damage** for a
  **carried** one (principle 23). Half, rounded up, for multi-target.
- Write as `5/7/9 damage (base 5 + weapon 2)`.

Full ladders, the gear-Quality steps and the always-on critical bonus: [stat-tables.md](stat-tables.md).

> **Gate:**
> 1. **Name the catalogue row every carried weapon resolves to**, with its damage figure. *"It is a natural
>    weapon"* is the other acceptable answer. Anything else is an invented weapon (principle 23, D-119).
> 2. Is every damage figure `base + 1x/2x/3x weapon`, base from that attack's own attribute? An
>    **always-on** critical bonus is the one exception and is declared as `critWeaponDamage` (D-135); a
>    situational one such as `slash` stays out.
> 3. **Elite and Lord: is the attack list a MENU or one option printed twice?** Attacks all cost the
>    Action, so they are the Action menu (principle 60a). Name a board state where each is the best choice.
> 4. Does the **creature** offer more than a damage number, and is every plain attack genuinely plain
>    (D-073)? It need not be an attack that carries it — the Slinger has two plain weapons and an identity
>    in a Passive.
> 5. Does any rider **add damage**? Then it is paid for in weapon damage (D-110). A condition rider is not.
> 6. **Does every carried weapon use the catalogue's real damage and properties?** Absolute and
>    build-checked (principle 44, D-133). Riders are allowed and are how an armed creature closes the
>    chassis gap; changing the weapon is not.
> 7. **Who else on the roster carries this loadout, and is that deliberate?** (D-122.) Loadout is an
>    identity axis — the rank and file carry spears, the officer carries a sword. Shields are exempt.

**Changing a weapon type changes two numbers.** Damage moves with the catalogue row, and `slash` adds
weapon damage **again** against light or no armor (D-099). Re-read the line against **both** armor cases.

## 4. Abilities

### Read before you write — the interaction manifest

**Find what your ability does in this table and read the published rule first.** Three of the eleven errors
in the tier-3 review were the same shape: an invented mechanic that a published rule already covered.

| If the ability… | Read first | What you would otherwise reinvent |
|---|---|---|
| moves a creature, pushes, throws, drags | the **`pushed`** condition, `03-distances-movement.md` | `pushed` already gives collision damage to **both** parties, and falling knocks both prone |
| deals damage without an attack roll | falling damage, `02-attacking.md` | a bespoke number that does not scale |
| reacts to something an enemy does | the **universal Quick Actions** in `01-combat-scenes.md` | Opportunity Attack and **Protect Ally** already occupy this space |
| applies a condition | that condition's text in `conditions.json` | `stunned` does not remove a turn; only `paralyzed` and `unconscious` do |
| turns a condition off | the condition's own removal clause | a second, conflicting removal rule |
| resembles a spell | the tradition's list at that rank | the Cult Priest's knife rider **was `Minor Hex` verbatim** |
| grants a sense | `creature-traits.json` and the companion distribution | a creature-only sense nobody can reuse |
| grapples, trips, shoves | the Grapple action, `01-combat-scenes.md` | size rules that already exist |
| ignores or reduces armor | `slash`, `crush`, the AV rules | a bespoke armor bypass |
| is carried by a weapon | `05-armor-weapon-properties.md` | `reach`, `versatile`, `heavy` do it already |

**If a published rule already covers your effect, cite it instead of restating it. If you genuinely cannot
find one, say so in the notes file** — that sentence is how a real gap gets found instead of papered over.

### Build in slot order, not card order

The creature has **one Action, one Quick Action and its Movement**, and a Lord's second turn adds an Action
but **no second Quick Action** (principle 60).

1. **The Action menu** — the attacks, plus any Action ability doing something an attack cannot.
2. **The one Quick Action.**
3. **The free channels** — attack riders and Passives. Everything that must not compete goes here.
4. **The mandatory trigger and defensive ability** for the category.
5. **Thematic extras** — movement, senses, auras, environmental manipulation.

**Elite and Lord: say out loud what the two effects on a turn are** before writing any text. If the answer
is *"it attacks"*, the kit is not finished however many entries the card has (principle 60b).

### The rest, in one line each

- **Ability TN** = 6 + tier. Saves usually Spirit or Strength + Fortitude. Official durations only.
- **Conditions** — principles 8, 9 and 16: design against the published text, and escalate either across
  two strong-or-critical hits or across the success level of one roll.
- **The identity effect fires on any success**, with the success level setting its degree (principle 59).
- **Limiters** are `recharge (dX)` (d4/d6/d8 only, 4+ at the **end** of the turn), `once per scene`, or
  `once between your turns`. Nothing else. **Placement is principle 45** — the qualifier is one word, the
  limiter is the last sentence, and this is the most repeated error in the programme.
- **Never a second attack in the creature's own turn** (principle 41) — but that bans a second *attack
  roll*, not a second *effect*, which principle 60b requires of every Elite and Lord.
- **A Lord, and only a Lord, may price one signature ability in Resolve** (principle 61).
- Damage or healing beyond a basic attack: principle 7, and the spell scaling frameworks.

### NPC spellcasting

> **Spellcasting** (Action). This creature can cast the following spells, rolling Mind + Arcana:
> *Attack Thoughts*, *Subtle Suggestion*. This creature can cast each of these spells once per scene.

**The ability is always called `Spellcasting`** — one generic name on every caster, so a GM finds it in the
same place on every card. Flavour names go in the lore (D-107).

- NPCs draw on the **general published roster**. No Focus, no spell slots, no per-day counting.
- **Max spell rank = the creature's magic skill rank**, straight off the tier table. Verify every spell by
  grep against `arcane-spells.json` / `mystic-spells.json`.
- **Category never raises spell rank** (D-092) — the party's counterplay floors are written against rank,
  so an Elite casting above its tier is an unanswerable fight rather than a harder one.
- **Spell damage does scale with category, through the catalyst.** A Spell Catalyst is Q2 gear on the same
  ladder as a weapon: a tier-3 Elite caster carries a **Q3 catalyst, +1 spell damage**. Spell Power is the
  base damage, the spell's `+X` is its weapon damage, the catalyst's Quality is the masterwork step.
- **What an Elite or Lord gets instead of rank:** more spells known, and **triggers that cast**.
- **To out-cast your tier, pay for it** with the step-2 adjustment — magic skill up, HP down.
- **Spells known ≈ max rank + 1.** A guideline, not a cap.
- **Front-load, do not ration.** A caster survives one to three turns; a withheld best option never fires.
- Bespoke magical abilities are valid **on top** of the list and cost an ability slot. A spell costs a line.

> **Gate:**
> 1. For **each** ability: which published rule from the manifest did you read? Name it. *"I could not find
>    one"* is an acceptable and useful answer.
> 2. Is every qualifier a **single closed-list word**, with any limiter as the **last sentence**?
> 3. Does every condition match its published text, and is every high-impact one gated?
> 4. Does the creature restate any **universal action**?
> 5. Elite and Lord: does each trigger **escalate**, and open `When this creature suffers a Wound`?
> 6. **Count the kit by SLOT** (principle 55). Two abilities competing for the Action is one ability.
> 7. **Elite and Lord: name the two effects produced on a turn** (principle 60), and check the second is
>    not a second attack roll. Then name a board state where each Action option is best — never best is
>    decoration, always best makes decoration of the rest. **A Lord also needs a setup-to-payoff pair.**
> 8. Does any condition's end clause cost the target something they choose to pay (principle 53), and is
>    every gated line visibly better than the batch's best ungated one (principle 54)?

## 5. Size, Immunities, Resistances

Size modifiers and immunity sets from [stat-tables.md](stat-tables.md). Resistances halve, weaknesses
double. Match type logic — undead are not immune to everything, living creatures are not immune to
bleeding. Immunity counterplay per principle 10.

**Published damage types only** — acid, blast, fire, force, frost, lightning, necrotic, physical, poison,
psychic, radiant. D&D's `cold` and `thunder` are not Nexus types; they drifted in once and had to be
normalised to `frost` and `blast`, and anything off the list fails to render as a chip.

**Every Undead carries `Undead Nature`** alongside its required `Mindless` or `Intelligent` additive. Do
not restate what the additive already grants.

## 5b. Lore (optional)

A **fixed structure**, not free prose, rendered collapsed behind a toggle so it never competes with
play-time reference. Same standards as rules text. Omit an optional key rather than writing an empty value
— the generator rejects unknown keys and empty strings.

Schema, environment vocabulary, physiology, treasure tables and encounter templates:
[lore-schema.md](lore-schema.md), and [treasure-design.md](treasure-design.md) before any treasure table.
The eight worked blocks in `.drafts/bestiary/creatures/tier-0-1-lore.md` are the reference implementation.

> **Gate:**
> 1. Does `tactics` cover the five things (opening, priority, turn loop, breaking off, hard limits) and
>    nothing else?
> 2. Is every treasure row a specific object with one value, and does the table total sit in its band?
> 3. Does any lore claim date the setting's history, or grant a sense the creature has not earned?

## 6. Write it into a draft, split across three files

**Never straight into `creatures.json`, and never into the tier pages at all.** A batch is three files
under the programme folder, and the split is load-bearing:

| File | Holds | Never holds |
|---|---|---|
| **`tier-<N>-batch.md`** | The **designs only** — status banner, scope table, then one section per creature: theme, role, Treat, stat block, attacks, abilities, traits | Rationale, alternatives, balance math, revisions to published records, open questions |
| **`tier-<N>-notes.md`** | Everything else — why a number moved, what was cut, revisions to published records, the balance check, and **`## Open Questions for Owner`** | Stat blocks |
| **`tier-<N>-lore.md`** | The `lore` blocks, one per creature | Stat blocks |

**The batch file is what the owner reads to review a design, so it stays lean** (D-088). The first two
batches put the reasoning inline and hit 1,195 and 1,534 lines, which buries the stat blocks somebody has
to check. Cross-reference instead of repeating: a creature section may carry one pointer line
(*"chassis rationale in the notes, § Ghoul"*). Readable markdown, not JSON — a human reads these.

## 7. Validate

Run [validation-checklist.md](validation-checklist.md) in full, then its principle sweep, then the
comparison against published creatures of the same tier and category.

## 8. Publish

Only after the owner approves the draft as production-ready. Record shape, the generator's guards and the
pipeline: [publication.md](publication.md).
