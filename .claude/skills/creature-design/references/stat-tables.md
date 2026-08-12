# Creature Stat Tables

Canonical numeric reference for creature design. Use these values exactly.

## Tier Statistics Table

| Tier | HP | AV (light/heavy) | Defense | Max Attribute | Skill Rank (1st/2nd) | Weapon Damage | Ability Difficulty | Secondary dmg |
|------|----|------------------|---------|---------------|----------------------|---------------|--------------------|---------------|
| 0    | 5  | 0/1              | 6       | d6            | 0/1                  | 2             | TN 6               | 1 |
| 1    | 10 | 1/2              | 7       | d6            | 1/1                  | 3             | TN 7               | 2 |
| 2    | 20 | 2/3              | 8       | d8            | 1/2                  | 4             | TN 8               | 2 |
| 3    | 30 | 3/5              | 9       | d8            | 2/2                  | 5             | TN 9               | 3 |
| 4    | 40 | 4/6              | 10      | d10           | 2/3                  | 6             | TN 10              | 3 |
| 5    | 50 | 5/8              | 11      | d10           | 3/3                  | 7             | TN 11              | 4 |
| 6    | 60 | 6/9              | **12**  | d12           | 3/4                  | 8             | TN 12              | 4 |
| 7    | 70 | 7/11             | **12**  | d12           | 4/4                  | 9             | TN 13              | 5 |
| 8    | 80 | 8/12             | **13**  | d12+1         | 4/5                  | 10            | TN 14              | 5 |
| 9    | 90 | 9/14             | **13**  | d12+1         | 5/5                  | 11            | TN 15              | 6 |
| 10   | 100| 10/15            | **14**  | d12+2         | 5/5                  | 12            | TN 16              | 6 |

Base damage from attribute die: d6→3, d8→4, d10→5, d12→6, d12+1→7, d12+2→8.

**AV** (D-014): light = tier, heavy = **1.5 × tier rounded up, minimum 1**. Chosen to track the player
AV progression so the two sides stay legible against each other. The minimum exists only for tier 0,
where the formula returns 0 and heavy armor would otherwise be indistinguishable from light.

**Defense** (D-015): `6 + tier` through tier 5, then **+1 per two tiers**. Player accuracy grows +6
across ten levels while a flat +1-per-tier Defense grew +10, sliding player hit rates from 79% down to
46%. This curve holds 55–71%.

**Changing an attack's target defense** — write the whole roll as the attack text's **first sentence**:

> `Roll Strength + Fortitude vs. Dodge. Target all creatures in a short cone. On a success, …`

`Roll <Attribute> + <Skill> vs. <Defense>.` is the only sanctioned form. **There is no `vs. Dodge`
property**, and the defense never appears without the attribute and skill beside it, because leaving the
default weapon-attack path means declaring the whole roll rather than swapping one number. Once the roll
is written out, the outcome clause reads **"On a success"**, not "On a hit". Default mapping if you do
not override it (`docs/03-statistics/03-defenses.md`): melee and touch attacks vs. **Parry**, ranged and
area vs. **Dodge**, mental and environmental vs. **Resist**. Attacks written in this form do not need
`agile` — stating `Roll Agility + …` already does that job, and `agile` exists only to let an ordinary
weapon attack substitute Agility for Strength.

**Writing the roll frees the skill, not just the defense** — and that is the more useful half. An
attack scored on the competence it actually uses says something a stat line cannot: the Leatherwing's
theft rolls `Agility + Perception` because spotting a loose pouch is Perception, and since that creature
has Perception (1) and Fighting (0), the block states by itself that it is better at robbing you than at
hurting you. Reach for a non-combat skill whenever the attack is not really a fight.

### What a rider costs, and what a second natural attack is worth

**A rider that adds damage is paid for in weapon damage. A rider that adds a condition is not** (D-110).
Damage stacks with damage and compounds against the same clock; a condition changes what happens next and
is already gated by a success level, which is its price. So the Reed Viper's venom costs it weapon
damage, and the Jackal's prone, the Grave Husk's grapple, the Ghoul's daze and the Cult Priest's
`blinded` are all free.

**A second natural attack has no catalogue entry to cite, so the gate is the price** (D-116):

| | Damage | Examples |
|---|---|---|
| **Gated** behind a grapple, condition or state | **full tier weapon damage** | `Death Roll`, `Bearing Down` |
| **Ungated**, usable any turn | **below the tier's figure** | `Pull Down`, the Ogre's `Fist` |

### Paired attacks: AV is subtracted twice {#paired-attacks}

**AV applies to each attack separately**, so splitting one Action into two attacks is taxed twice. Run
these rows before a trigger grants a paired attack (principle 41, D-124) — the instinct that two attacks
are roughly twice one attack is wrong in both directions:

| Against | One attack (8/12/16) | Paired with a 7/10/13 off-hand | Gain |
|---|---|---|---|
| **AV 5** martial, strong | 12 - 5 = **7** | (12-5) + (10-5) = **12** | +5 |
| **AV 5** martial, weak | 8 - 5 = **3** | (8-5) + (7-5) = **5** | +2 |
| **AV 2** caster, strong | 12 - 2 = **10** | (12-2) + (10-2) = **18** | **+8** |

**Against armor it is a moderate gain. Against an unarmored caster it is a burst**, and 18 into a 16 HP
body in one Action is over the line principle 3 draws. **Constrain where the math says**, not
everywhere: the Captain's pair must take **two different targets**, which removes the bottom row and
gives the party a stated counterplay.

### AV: sources, stacking and vocabulary

Three rules (D-114), and this was the last chassis number without one:

1. **The tier's light/heavy figure is the TOTAL** from natural hide plus worn armor. Not a budget to
   spend twice.
2. **A shield adds +1 on top** and is named in the string. Shields gain AV only from **Quality 4**
   (`07-magic-items/effects.md`), so a Q2 or Q3 shield is +1.
3. **The vocabulary is closed.** `natural light` / `natural heavy` for hide, chitin, bone and clay;
   `light armor` / `heavy armor` for worn gear; `light armor and shield` when both. Never mixed, never
   invented.

**The light/heavy word decides whether blades work** (principle 39), so it is a design choice, not a
label for the number.

**Paired natural weapons** — claws, talons, pincers — carry the **`light`** property and therefore attack
**twice in one Action, with no bane**: `02-attacking.md` exempts *"unarmed attacks or natural weapons that
are part of your body (e.g. a lionfolk's claws or any monster's natural attacks)"* from the dual-wield
penalty. **Each attack takes half the tier's weapon damage**, rounded up.

The halving is the catalog's own ladder rather than a creature-only rule. At Quality 2 a **light** weapon
is weapon damage **2**, a one-handed weapon **3**, a two-handed weapon **4** — and the tier's weapon damage
sits on the **two-handed** rung, with a published `Claw` entry sitting on the light one. So two light
attacks and one two-handed attack come to the same total, exactly as they do for a player.

What this buys, measured at tier 2 against the reference build: paired claws at 6/8/10 deal **2.25 a turn
against an armored martial**, below a single full-damage attack's 2.88, and **8.58 against a caster**, above
its 7.00. **Each hit is taxed by AV separately**, so many small hits are worse against armor and better
against soft targets. That trade is the point, not a defect — a first draft of the tier-2 ghoul wrote paired
claws at the *full* tier figure and produced a Basic that out-damaged its own Elite.

A **single** natural weapon — a bite, a gore, a sting, a grapple that uses both hands — takes the tier's
full weapon damage and does not carry `light`.

**Multi-target attacks** halve the **weapon damage only**, rounded up — base damage is unchanged. This
is symmetric with the spell system, where Spell Power applies equally to single-target and multi-target
spells and only the SL-scaling spell bonus is halved (`SPELL_SYSTEM_ANALYSIS.md` §6). Halving the
*total* would halve the flat component too, and multi-target attacks would collapse to the AV floor at
every tier.

**Secondary damage** (D-017): half weapon damage rounded up, for an attack carrying a separate
AV-ignoring damage instance. **A per-creature design channel, never a chassis line.** Written in its own
sentence after the damage triple (D-018):

> `10/15/20 damage. The target also takes 4 poison damage (ignore AV). On a strong or critical hit, the
> target is briefly poisoned.`

Anything that continues the first sentence past the triple breaks the DamageLadder render **and** trips
the damage-type conversion rule in `02-attacking.md`, turning the whole attack into that type.

### Recharge (D-024)

> **Recharge (dX).** At the **end** of each of this creature's turns, roll dX. On a **4+**, the ability
> recharges.

Same shape as Durability and Supply checks, where 4+ is the favourable outcome. Rolled at the end of the
turn so the party has a full round knowing it is back.

| Die | Chance | Expected gap | Uses per 5 rounds |
|---|---|---|---|
| **d4** | 25% | 4.0 turns | **2.0** — a dragon's breath |
| **d6** | 50% | 2.0 turns | 3.0 |
| **d8** | 62.5% | 1.6 turns | 3.5 |

**A bigger die recharges faster**, which inverts the D&D intuition — a creature's rarest, biggest ability
carries the **smallest** die. Only d4, d6 and d8 are usable; above d8 the curve flattens and the die stops
carrying information.

Other limiters: `once per scene`, and `once between your turns` for anything off-turn. **No `X/day`, no
`once per combat`, no `once per turn`.**

### Where a limiter goes — the LAST SENTENCE of the effect, never the qualifier

**A limiter is written as the final sentence of the ability's or attack's text.** It never goes in the
`qualifier` field, never in an attack's `properties`, and never mid-sentence.

> ✅ **Spellcasting** (Action). This creature can cast the following spells, rolling Spirit + Mysticism:
> *Cloud of Sickness*, *Curse of Death*, *Rotting Grasp*. **This creature can cast each of these spells
> once per scene.**
>
> ✅ **Searing Breath** (Action). Roll Strength + Fortitude vs. Dodge against each creature in a short
> cone. 12/18/24 fire damage. **Recharge (d4).**
>
> ❌ **Spellcasting** (Action, once per scene each). …
> ❌ **Rites of the Grave** *(recharge (d6))*. …

**Why the end of the text.** The qualifier is **what kind of action this is** and nothing else, so the
badge stays one word a GM can scan. The limiter is a rule about frequency, which belongs with the rest of
the rules text, where it is read at the moment the ability is used rather than parsed out of a header.

**The qualifier field carries exactly one value** from the closed list: `Passive`, `Action`,
`Quick Action`, `Elite Trigger`, `Lord Trigger`. Nothing follows it, ever.

**Which abilities may carry a limiter at all** (unchanged from D-077, only the placement moved):

| Qualifier | May be limited? |
|---|---|
| `Action` | **Yes.** This is the only one that can |
| `Quick Action` | **No.** It already means "once between your turns" (`01-combat-scenes.md`), so a limiter charges the creature twice for one restriction |
| `Passive` | **No, and it is a category error.** A Passive is always on, so there is nothing to limit |
| `Elite Trigger` / `Lord Trigger` | **No.** They fire once by construction, and a Lord's ordinal (`their first Wound`) does the sequencing |

**On attacks**, the limiter is likewise the last sentence and **not a property badge**. It must stay out
of the damage sentence, because anything continuing the first sentence past the triple breaks the
DamageLadder render (D-018) — so write the triple, then the rider, then the limiter.

**If a Passive needs a cap, the fix is the trigger, not a limiter.** Gate it on something already
infrequent — a strong or critical hit, a state, a circumstance — and the frequency falls out of the
fiction with nothing to track:

> ~~**Feeding Frenzy** (Passive, once between your turns). When this creature hits a dazed creature…~~
> **Feeding Frenzy** (Passive). On a strong or critical hit against a dazed creature, …

That rewrite also fixed a second defect the limiter was hiding: **`once between your turns` names the
off-turn window**, so on a Passive firing off the creature's own attacks it limited nothing at all.

## Creature Types

Canonical data: `creature-types.json`, `creature-subtypes.json`, `creature-additives.json`.

| Type | Description | Subtypes |
|------|-------------|----------|
| **Automaton** | Made things given motion, from a mortal workshop or a god's forge | Golem, Animated Object, Vessel |
| **Beast** | Natural animals lacking inherent magic | Mammal, Reptile, Bird, Insect, Aquatic, **Saurian** |
| **Divine Beast** | Shaped or marked by a god, made for a purpose. Bound to a duty, place, or mandate — **and the mandate is a Treat** | Guardian, Omen, Forsaken |
| **Draconic** | Elemental spirit-beings permanently bound to the material world, and their lesser kin | True Dragon, Celestial Dragon, Lesser, Serpent, Dragonkin |
| **Giant** | The titanic-era lineage. Some held onto their minds, some did not | Elder, Feral |
| **Horror** | Things belonging to no realm, and what their presence does to living matter | Warped, Adapted, Cosmic |
| **Humanoid** | The peoples, and those descended or fallen from them | The twelve folk (`docs/02-adventurers/01-folk.md`), extensible |
| **Magical Beast** | Magic in the biology, no maker, no purpose | Hybrid, Hive, Primal, Aberrant |
| **Ooze** | Amorphous bodies that flow, cling, and consume | — |
| **Plant** | Animate vegetation and fungal growth | Tree, Fungus, Vine |
| **Spirit** | Beings aligned to one of the spirit realms | Celestial, Infernal, Primordial, Sylvan, Chthonic, Astral |
| **Undead** | The dead returned through necromancy or curse | Corporeal, Incorporeal |

**Subtype is an array** — a creature may carry more than one. A werewolf is `["Human", "Shapechanger"]`.

**Two boundary rules** settle the cases that look alike:
- A **Spirit** belongs to a realm; a **Horror** belongs to nothing.
- A **Draconic** creature is permanently manifest; a **Spirit** moves between realms.

### Additives

Subtypes describing a nature that cuts across types, rather than a kind of creature.

| Additive | Effect |
|---|---|
**Every Undead carries the `Undead Nature` trait by default** — *does not need to breathe, eat, drink,
or sleep* — in the same way it must carry `Mindless` or `Intelligent`. Write it on every undead rather
than re-deriving what being dead means per creature, and never restate what the additive already grants
(`Mindless` already covers no Morale roll and immunity to charmed, frightened and confused).

| **Mindless** / **Intelligent** | Mindless: no Morale roll, no parley, immune to charmed/frightened/confused. Intelligent: none of those. **One is required on every Undead and Automaton** |
| **Shapechanger** | Can alter its physical form |
| **Swarm** | One creature that is a mass of bodies. Resistant to single-target damage, immune to single-target conditions, cannot be grappled, occupies an area. **At half HP or lower their attacks deal half damage, rounded up** — the additive's cost, repeated in each swarm's attack text. **Not the Horde archetype**, which is many creatures in a troop |
| **Amorphous** | No fixed form. Squeezes through gaps, cannot be grappled, no anatomy to target. Every Ooze has it |

### What subtype does NOT own

Three axes have their own fields, and every retired subtype leaked into one of them:

| Axis | Field that owns it |
|---|---|
| Combat role | `creature-archetypes.json` — Standard, Ambusher, Artillery, Bruiser, Defender, Horde, Controller, Ranged, Skirmisher, Support |
| Size | `creature-sizes.json` |
| Element / damage identity | `resistances`, `weaknesses`, attack damage types |

**Element is never a subtype** — a "Fire Dragon" subtype holds one creature across a tier ladder.
**Role is never a subtype.** **Material is never a subtype** — it predicts only defence, and cannot hold a construct made of bound flame.

## Size Modifiers

| Size | Modifier | Special Rules |
|------|----------|---------------|
| Tiny | -2 | Dodge focus, stealth bonuses |
| Small | -1 | Agility advantages |
| Medium | +0 | Standard rules |
| Large | +1 | Strength focus, harder to hit with ranged |
| Huge | +2 | Area control |
| Gargantuan | +3 | Fills entire area |
| Colossal | +4 | Fills multiple areas |

**Gargantuan/Colossal combat rules:**
- Creatures can't enter their areas without special means
- Adjacent areas count as close range
- Can be attacked from multiple directions

Size effects on stats: larger → AV +1 tier, Parry +1–2 tiers, Dodge −1–2 tiers. Smaller → AV −1 tier, Dodge +1–2 tiers, Parry −1–2 tiers.

## Immunity Sets

**Condition immunity follows the `Mindless` / `Intelligent` additive, not the type** (D-045). The
outgoing roster gave every undead blanket charm and fear immunity regardless of whether it had a mind,
across six inconsistent sets. Tying it to the additive means **a lich can be frightened and a skeleton
cannot**, which is both correct and a tactical lever for the party.

- **Mindless** (required on Undead and Automaton, or `Intelligent`): charmed, frightened, confused.
- **Undead**, additionally: bleeding, poisoned, unconscious.
- **Automaton**, additionally: bleeding, poisoned, unconscious.
- **Spirit (Primordial)**: its own element — the sanctioned embodiment case (D-036).
- **Amorphous** additive: grappled, and no anatomy to target.

### Resistances, weaknesses and immunities

**Resistance** = half damage. **Weakness** = double damage.

**Damage types** — the published list, nothing else: acid, blast, fire, force, frost, lightning,
necrotic, physical, poison, psychic, radiant. (`cold` and `thunder` are D&D; they are `frost` and
`blast`.)

Three binding rules:

1. **Any damage resistance or immunity requires at least one damage weakness** (D-035). Mechanically
   checkable: `resistances` non-empty implies `weaknesses` non-empty. In the outgoing roster **30 of 49
   creatures with a resistance had no weakness**, and the offenders skewed high-tier — the Lords were all
   armour and no seam.
2. **Damage immunities are rare, identity-gated, one type, and normally tier 7+** (D-036). The creature
   must *be* the thing, not merely use it: a fire spirit made of flame is immune, a hound that *breathes*
   fire is resistant. **Prefer a resistance** — half damage still lets the party's approach work while
   making it a worse choice, which is a tactical statement rather than a wall. In the outgoing roster
   **100% of tier 8–9 creatures had one**, most often fire, which is the D&D failure mode where a
   specialist stops existing for the back half of a campaign.
   **Exception:** an embodiment (a fire spirit) may carry it at any tier **provided the immunity is
   bundled with its drawback in the same ability**, as `Flame Body` does.
3. **Physical is an ordinary damage type** (D-037). No "resistant to non-magical weapons" wording — it
   imports a material rule Nexus does not have. **Permanent physical immunity is never given out, at any
   tier — even a ghost is only resistant.** Where the fiction demands untouchability, use the window
   (defensive shape 8).

## Weapon Properties (common)

| Property | Effect |
|----------|--------|
| **agile** | Roll attacks with Agility instead of Strength (Agility also becomes base damage) |
| **crush** | Ignore ½ of enemy's AV (rounded up); from multiple sources, ignore all AV |
| **pierce** | On a failed attack roll, re-roll once between your turns |
| **slash** | On a hit vs. light or no armor, add weapon damage an additional time |
| **reach** | Attack at close range; +1 bane while any enemy is in your melee range |
| **light** | Can be dual-wielded |
| **two-handed** | Requires both hands; one-handed attacks suffer +2 banes |

**Canonical list — always verify against `docs/04-equipment/05-armor-weapon-properties.md` before using a property.**

## Conditions & Durations

Use only official conditions (`docs/05-combat/04-conditions.md`) and durations (`docs/06-scenes/02-effect-durations.md`): briefly, short, medium, long, very long. Complete condition list and duration definitions: [../../game-basics.md](../../game-basics.md#canonical-keyword-sources).

## Defensive Toolkit — eight shapes

Every Elite and Lord needs at least one, matched to fighting style. **Every one names a cost and a
counterplay the party can act on** — something they can *do*, not something they can hope for.

| # | Shape | How it works | Cost | Counterplay | Earliest |
|---|---|---|---|---|---|
| 1 | **Retaliation** | Attackers take damage on a melee hit | Only fires when attacked | Attack at range, or accept the trade | Basic, tier 1 |
| 2 | **Positional gating** | Regeneration or a bonus that switches off in a named circumstance | Worse in the wrong place | Create the circumstance — fire, sunlight, running water | Basic, tier 2 |
| 3 | **Ally redirection** | Redirect an incoming attack to a nearby ally | Costs the ally | Kill the minions first | Basic, tier 2 |
| 4 | **Stance trade** | Trade all offense for defense until they leave the stance | Their whole turn | Walk away, or ignore them | Basic, tier 1 |
| 5 | **Conditional negation** | Roll to halve or negate a specific kind of incoming damage | A roll that can fail, and it is narrow | Use a different damage source | Elite, tier 3 |
| 6 | **Regrowth** | Restore HP or a lost part on a stated trigger | Bounded and interruptible | Deny the trigger, or burst past it | Elite, tier 4 |
| 7 | **Success-level reduction** | Reduce an incoming hit by one SL step (D-011) | Limited uses | Land more hits, or use effects that do not read SL | Elite, tier 5 |
| 8 | **State-gated defence** | Strong while in a state, weaker the moment the creature acts (D-037) | **The creature's own aggression opens the window** | Time the attack to the window | Elite, tier 5 |

**Shape 8 is the one to reach for whenever a permanent immunity is tempting.** Unlike shape 2, whose off
switch is a circumstance the party must arrange, shape 8's off switch is **the creature doing what it
wants to do** — so the window is guaranteed, costs the GM nothing to track, and arrives exactly when the
creature is most threatening.

> **Untouchable** (Passive). This creature is immune to physical damage. When they attack, or interact
> with a physical object or creature, they become only resistant to physical damage briefly.

### Two hard limits

**No auto-success on a failed save, at any tier** (D-023). Legendary Resistance has no Nexus equivalent
and nothing replaces it — the category rules already cover it four times over: **Resolve** (Elite 1,
Lord 3, spend to re-roll), **condition wipe on every Wound**, the **Lord condition lockout** (succeed
once against a type, immune to it for the scene), and the **Lord double turn**.

**A defensive ability may grant at most +2 to a single Defense**, lasting until the start of the
creature's next turn and costing a Quick Action. **+1 is the default.** One-off AV bonuses are uncapped.
One Defense point is worth ~18.5% of incoming damage from tier 5 up; one AV point is worth 2–7%, so
**Defense is 3x to 9x stronger per point** — at tier 10, +2 Defense is worth roughly +9 AV. Working in
[`../../game-basics.md`](../../game-basics.md#roll-distribution--what-one-point-is-worth).

## Validation Checklist

### Chassis
- [ ] HP for tier; format matches category (`40` / `2×40` / `3×40`)
- [ ] AV = tier (light) or **1.5 × tier rounded up** (heavy) — D-014
- [ ] Defense from the tier table (**+1 per two tiers above tier 5**); Resist ≤ base + 2 — D-015
- [ ] Damage = base + 1×/2×/3× weapon damage. Never a doubled increment
- [ ] **Paired natural weapons carry `light` and take HALF the tier's weapon damage each** (they attack twice); a single natural weapon takes the full figure — D-076
- [ ] Ability TNs = 6 + tier
- [ ] Skill ranks match the tier table
- [ ] Tier adjustments balanced — one stat down for one stat up, one pair only

### Taxonomy
- [ ] Type is one of the twelve; subtype values come from `creature-subtypes.json` or `creature-additives.json`
- [ ] **Undead and Automaton carry exactly one of `Mindless` / `Intelligent`**
- [ ] Condition immunities follow the additive, not the type
- [ ] Anglicised name, no diacritics (D-050)

### Abilities
- [ ] Every ability has a **Trigger**, an **Effect** naming who/what/how much/how long, and a **Limit**
- [ ] Qualifier is ONE closed-list value with nothing after it; any limiter is the LAST SENTENCE of the text; limiter is `recharge (dX)`, `once per scene`, or `once between your turns`
- [ ] **The limiter is in the `qualifier`, and only on an `Action`** — never on a Passive, never in an attack's `properties` (attacks badge it instead) — D-077
- [ ] **No `X/day`, no `once per combat`, no `once per turn`**; `recharge` uses d4/d6/d8 only
- [ ] Attack count fits category (Basic 1–2, Elite 2–3, Lord 3–5)
- [ ] Ability count fits category (Basic 3, Elite 4, Lord 6). **Named slots count toward the total and may overlap** — D-030
- [ ] Elite: Elite Trigger + defensive + Quick Action. **Lord: two Lord Triggers** + defensive + reactive and proactive Quick Actions
- [ ] Trait count within guideline (Basic 2, Elite 3, Lord 4); over it, the rest is tuned down — D-026
- [ ] Every trait passes the four boundary questions
- [ ] No "Special Rules" or "Combat Notes" sections — category rules are automatic

### Defence
- [ ] Every defensive ability names a **cost** and a **counterplay the party can act on**
- [ ] **No auto-success on a failed save, at any tier** — D-023
- [ ] No more than **+2 to a single Defense**, ending by the creature's next turn. AV bonuses uncapped
- [ ] **`resistances` non-empty implies `weaknesses` non-empty** — D-035
- [ ] Damage immunity is rare, identity-gated, one type, normally tier 7+ — D-036
- [ ] **No permanent physical immunity**; no "non-magical weapons" wording — D-037

### Wording
- [ ] Official conditions and durations only; damage types from the published list
- [ ] Duration chosen deliberately: `briefly` (one turn) for common riders, `short` (rest of the fight) for signature effects
- [ ] **The duration comes BEFORE the condition: `briefly dazed`, never `dazed briefly`** — D-074
- [ ] **`briefly` never spelled out longhand** as "until the end of their next turn"
- [ ] Disabling conditions **escalate**, never land off a single roll — D-029
- [ ] Secondary damage in its own sentence after the triple, with `(ignore AV)` — D-018
- [ ] Rider magnitudes scale with tier; grapples state their limb cost
- [ ] they/their/them for creatures. No semicolons, no em or en dashes
- [ ] Every spell verified by grep against `arcane-spells.json` / `mystic-spells.json`; rank ≤ magic skill rank

### Thematic and balance
- [ ] One clear tactical lesson; a Treat the party can act on (any of the five channels)
- [ ] Fits sword & sorcery ancient-world aesthetic; drawn from the vault where possible
- [ ] Single creature ≈ one same-level adventurer; power consistent within tier
- [ ] Triggers create phases rather than raising numbers
- [ ] Not trivially defeated by common tactics; no auto-win abilities

## Worked Example

**Girtablilu, Gate Guardian** — a scorpion-bodied sentinel bound by an oath it did not choose, set to
hold the mountain gate where the sun rises. It must challenge everyone who approaches, and it must let
pass anyone who answers rightly.

**Tactical lesson:** *can players get past a defender who is stronger standing still than moving?*

| Field | Value |
|---|---|
| Size / Type | Large **Divine Beast** |
| Subtype | `["Guardian"]` |
| Tier / Category | 4, Elite |
| Archetype | Defender |

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|-----|-----|-----|-----|-------|-------|--------|
| 2×40 | 8 | d10 | d8 | d8 | d6 | 11 | 9 | 10 |

**Skills:** Fighting (2), Athletics (3), Perception (3)

**Chassis working** (scratch, never published): tier-4 baseline is AV 6 heavy, Defense 10. One pair
adjusted — **+1 tier of AV** for the chitin plate, **paid for with −1 tier of Dodge**. Parry +1 for Large.
Derived: base damage 5 (d10), weapon damage 6, ability TN 10, secondary damage 3.

**Attacks:**

- **Planted Sting** (*pierce, reach*). This creature can only use this attack if they skip all Movement
  this turn, before and after the attack. 12/19/26 damage. The target also takes 3 poison damage
  (ignore AV). On a strong or critical hit, the target is briefly poisoned.
- **Claw** (*crush*). 11/17/23 damage. On a strong or critical hit against a creature of equal or smaller
  size, the target is pushed close.

**Abilities:**

- **Threshold Stance** (Quick Action). This creature plants themselves in the gateway. Until the start of
  their next turn they gain +2 Parry, and any creature that tries to move past them must roll Strength or
  Agility + Athletics vs. TN 10 or have their Movement end. This creature cannot use Movement while in
  the stance.
- **Sunrise Vow** (Elite Trigger). When this creature suffers a Wound, the oath tightens. For
  the rest of the scene they cannot willingly move further than close range from the gate, and their
  attacks deal +3 damage while they stand within it.

**Traits:** Night Vision. Blindsense (close).

**Why this passes:**

- **Signature move carries the lesson.** `Planted Sting` is rung 2 of the damage ladder (D-021) — the cost
  clause *is* the tactical question. `12/19/26` is base 5 + weapon 7 at 1×/2×/3×.
- **The Treat is structural.** A girtablilu that chases you does 11/17/23 with no poison instead of
  12/19/26. Threat and Treat from one mechanic, costing no ability slot.
- **Defensive shape 4** (stance trade), matched to a guardian. **+2 Parry is the cap** (D-025), one round,
  costs a Quick Action — and the cost is what the party exploits.
- **The trigger changes the problem, not a number.** It makes the creature more dangerous *and* more
  exploitable at once, rather than raising attack and damage for the scene.
- **Slots:** four available, two used — Threshold Stance covers defensive **and** Quick Action (D-030
  permits overlap), Sunrise Vow is the Elite Trigger. Two attacks (Elite range 2–3), two traits (under 3).
