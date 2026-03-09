# Creature Creation System & Encounter Building — Design Analysis

> **Scope:** Professional design analysis of the creature creation system for GMs, covering tier progression balance, encounter building guidelines, Creature Builder review, random table frameworks for attacks/abilities, elite/lord ability catalogues, and a step-by-step creature building guide.

---

## 1. Executive Summary

### Key Findings

1. **Tier-to-level scaling is well-calibrated but under-documented.** Creature tiers map cleanly to adventurer levels for 1v1 encounters, but the rules lack explicit encounter-building math for parties of 3–5 adventurers. GMs must rely on intuition rather than guidelines.
2. **The Creature Builder component is mechanically sound but lacks pre-built content.** The React tool correctly calculates stats from tier, archetype, and size, but attacks and abilities must be written freeform — there are no selectable templates or random tables integrated into the builder.
3. **Attacks and abilities are the creative bottleneck.** The tier table, archetypes, and category system (Basic/Elite/Lord) provide a strong statistical chassis. However, the "Creature Abilities" section in the rules is a TODO stub. GMs have stat blocks but no menu of gameable effects to choose from.
4. **Random tables exist for creature *concepts* but not for creature *mechanics*.** The random creature generator (`06-random-creature.mdx`) generates appearance and flavor (shape, head attributes, body attributes, adaptions) but provides no mechanical attacks or abilities.
5. **Elite Triggers and Lord Triggers need a catalogue.** Currently, these are bespoke per creature. A categorized ability catalogue — organized by archetype role — would dramatically reduce GM prep time.
6. **Encounter building needs a Threat Budget system.** A simple point-based framework (creature category × tier) would let GMs construct balanced encounters without memorizing complex formulas.

### Design Principles

1. **Stat chassis + ability menu** — The tier table provides the statistical foundation; abilities provide the tactical identity. Both must be equally accessible.
2. **Random tables for speed, catalogues for precision** — Random tables enable improvisation; structured catalogues enable intentional design. Both serve different GM workflows.
3. **Archetype = tactical role** — The 10 existing archetypes already define combat roles. Ability catalogues should be organized around these same roles.
4. **Bounded complexity** — A creature should be buildable in under 5 minutes using the framework. Pre-built ability packages keep prep fast without sacrificing variety.

---

## 2. Tier Progression Analysis

### 2.1 Creature Tier vs. Adventurer Level — Statistical Comparison

The following table compares creature statistics at each tier against a typical adventurer of the corresponding level. Adventurer values assume a primary combat skill (Fighting or Archery) and standard progression.

| Level / Tier | Creature HP | Adventurer HP | Creature Defense | Adventurer Defense | Creature Max Die | Adventurer Max Die | Creature Skill | Adventurer Skill |
|---|---|---|---|---|---|---|---|---|
| 1 | 10 | 18–20 | 7 | 7–8 | d6 | d6–d8 | 1 | 1 |
| 2 | 20 | 20–22 | 8 | 8–9 | d8 | d8 | 1–2 | 1–2 |
| 3 | 30 | 22–24 | 9 | 9–10 | d8 | d8 | 2 | 2 |
| 4 | 40 | 24–26 | 10 | 10–11 | d10 | d10 | 2–3 | 2–3 |
| 5 | 50 | 26–30 | 11 | 11–12 | d10 | d10 | 3 | 3 |
| 6 | 60 | 28–32 | 12 | 12–13 | d12 | d10–d12 | 3–4 | 3–4 |
| 7 | 70 | 30–34 | 13 | 13–14 | d12 | d12 | 4 | 4 |
| 8 | 80 | 32–36 | 14 | 14–15 | d12+1 | d12 | 4–5 | 4–5 |
| 9 | 90 | 34–38 | 15 | 15 | d12+1 | d12 | 5 | 5 |
| 10 | 100 | 36–42 | 16 | 15–16 | d12+2 | d12 | 5 | 5 |

### 2.2 Scaling Assessment

**What works well:**

- **Defense parity.** Creature base defense (6 + tier) closely tracks adventurer defenses (Parry 7 + Fighting rank + level bonus; Dodge 5 + ½ Agility + level bonus). At every tier, creatures and adventurers trade hits at comparable rates.
- **Attribute die parity.** Creature max attributes and adventurer max attributes follow nearly identical progressions (d6 → d8 → d10 → d12), ensuring roll distributions stay matched.
- **Skill rank parity.** Creature primary skill ranks (0 → 1 → 2 → 3 → 4 → 5) closely mirror adventurer skill rank progression through XP investment.
- **HP divergence is intentional.** Creatures have higher HP at mid-to-high tiers (60–100 vs. 28–42 for adventurers), which accounts for the fact that adventurers have 3 Wounds, Resolve, healing, and magic items. Creature HP represents their total combat endurance; adventurer HP is just one life pool of three.

**Areas of concern:**

- **Tier 0 creatures are too weak for Level 1 parties.** A Tier 0 creature (5 HP, Defense 6, d6 attributes) is trivially defeated by any Level 1 adventurer. This is by design ("Harmless"), but GMs may misjudge Tier 0 as "appropriate for Level 1." The naming and guidance should make clear that Tier 0 is for non-combat creatures or swarm fodder only.
- **Tiers 8–10 outpace adventurer defenses.** At the highest tiers, creature defense (14–16) and ability difficulty (TN 14–16) approach or exceed adventurer maximum defense (15–16). This compresses hit rates and makes high-tier fights feel "swingy." This is acceptable for climactic encounters but should be documented as intentional.
- **Weapon damage scaling is linear but adventurer damage is not.** Creature weapon damage scales +1 per tier (2 → 12). Adventurer damage benefits from talents, combat arts, magic items, and spell synergies, creating non-linear power spikes at certain levels. This divergence means a Tier 5 creature's damage output may feel underwhelming against a well-equipped Level 5 party unless the creature has strong abilities.

### 2.3 Recommendations

1. **Add a "Tier vs. Party Level" sidebar** to the creature rules clarifying that Tier X = challenge for 1 adventurer of Level X, not a full party.
2. **Document the intentional HP asymmetry** — creatures trade raw HP for the adventurers' multi-wound system, Resolve, and healing access.
3. **Flag Tier 0 explicitly** as "non-threatening / environmental creatures" in both the rules and the builder.

---

## 3. Encounter Building Framework

### 3.1 Threat Budget System

The following system provides GMs with a quick, intuitive method for constructing balanced encounters. It uses **Threat Points (TP)** as a universal currency for encounter difficulty.

#### Threat Point Values

| Creature Category | Threat Points (per creature) |
|---|---|
| Basic | 1 TP |
| Elite | 3 TP |
| Lord | 5 TP |

> **Tier matching:** All TP values assume the creature's tier matches the party's average level. Adjust TP by ±1 for each tier of difference (minimum 0 TP).

#### Encounter Difficulty Budgets

| Difficulty | TP Budget | Description |
|---|---|---|
| **Easy** | Party Size × 1 | Quick skirmish, low risk. Consumes few resources. |
| **Moderate** | Party Size × 2 | Standard encounter. Tests the party without serious danger. |
| **Hard** | Party Size × 3 | Significant challenge. Likely costs Resolve, healing, or Wounds. |
| **Deadly** | Party Size × 4 | Life-threatening. Retreat is a valid option. Boss fights. |

> **Example:** A party of 4 Level 3 adventurers faces a Hard encounter (4 × 3 = 12 TP). The GM could build this as:
> - 1 Elite (3 TP) + 9 Basic (9 TP) = 12 TP — a leader with a warband
> - 2 Elites (6 TP) + 6 Basic (6 TP) = 12 TP — two lieutenants with soldiers
> - 1 Lord (5 TP) + 7 Basic (7 TP) = 12 TP — a boss with minions
> - 12 Basic (12 TP) = 12 TP — a large horde (likely grouped into troops)

#### Tier Adjustment Modifier

When creatures are above or below the party's average level, adjust their TP contribution:

| Tier Difference | TP Modifier |
|---|---|
| −2 or more below party level | ½ TP (round down, min 0) |
| −1 below party level | −1 TP (min 0) |
| Equal to party level | Base TP |
| +1 above party level | +1 TP |
| +2 or more above party level | +2 TP |

> **Example:** A Tier 5 Elite creature against a Level 3 party contributes 3 (base) + 2 (two tiers above) = 5 TP instead of 3 TP.

### 3.2 Encounter Composition Guidelines

Beyond raw numbers, *composition* determines encounter feel:

| Pattern | Description | Recommended For |
|---|---|---|
| **Horde** | Many Basic creatures (troops) | Overwhelming numbers, swarm tactics |
| **Leader + Minions** | 1 Elite/Lord + Basic creatures | Classic "boss with bodyguards" |
| **Elite Pair** | 2 Elites with different archetypes | Tactical variety, flanking pressure |
| **Solo Boss** | 1 Lord (high tier) alone | Climactic showdown, uses Lord double-turn |
| **Gauntlet** | Multiple waves of Basic creatures | Attrition, resource drain |
| **Mixed Arms** | Ranged + melee + controller archetypes | Tactical complexity, positional play |

### 3.3 Troop Efficiency

When using many Basic creatures, GMs should group them into troops (3+ identical creatures). Troop combat is faster to run and produces higher damage output than individual creatures:

| Troop Size | Troop Bonus | Effective Damage Multiplier vs. Individual |
|---|---|---|
| 3 | +1 | ~2× (deals damage even on failure) |
| 4 | +2 | ~3× |
| 5 | +2 | ~3× (same bonus, extra HP buffer) |
| 6 | +3 | ~4× |

> **Rule of thumb:** A troop of 4 Basic creatures at party-level tier is roughly equivalent to 1 Elite creature in terms of total threat.

### 3.4 Encounter Modifiers

The following factors should adjust the GM's assessment of encounter difficulty beyond raw TP:

| Factor | Effect on Difficulty |
|---|---|
| **Terrain advantage (creatures)** | +1 difficulty step |
| **Surprise round (creatures)** | +1 difficulty step |
| **Adventurers are fatigued/wounded** | +1 difficulty step |
| **Adventurers have terrain advantage** | −1 difficulty step |
| **Adventurers have surprise** | −1 difficulty step |
| **Environmental hazards (neutral)** | +1 difficulty step |

---

## 4. Creature Builder Review

### 4.1 Current Strengths

The React Creature Builder (`src/components/CreatureBuilder.tsx`) provides a robust statistical foundation:

- **Tier-based auto-calculation** — HP, AV, defenses, attributes, skill ranks, weapon damage, and ability TN are all calculated from the tier table with archetype and size modifiers.
- **10 archetypes** with distinct stat profiles (Standard, Ambusher, Artillery, Bruiser, Defender, Horde, Controller, Ranged, Skirmisher, Support) covering all major tactical roles.
- **7 size categories** (Tiny to Colossal) with appropriate defense/AV trade-offs.
- **Validation system** that warns when custom stats deviate more than ±2 tiers from expected ranges.
- **Multiple output formats** — stat block preview, markdown export, and CLI tool for automation.
- **Category system** (Basic/Elite/Lord) correctly formats HP as single/2×/3× life pools.

### 4.2 Current Gaps

1. **No pre-built attack templates.** GMs must manually type attack names, properties, damage, and effects. The builder should offer a menu of common attacks (Bite, Claw, Slam, Weapon Strike, Breath Weapon, Ranged Blast, etc.) with auto-calculated damage.
2. **No pre-built ability templates.** The most time-consuming part of creature design — writing abilities with correct TNs, save types, and balanced effects — has no automation or template support.
3. **No Elite Trigger / Lord Trigger templates.** These mechanically critical abilities are entirely freeform, despite following predictable patterns across existing creatures.
4. **No Quick Action templates.** Elite and Lord creatures require Quick Actions, but the builder doesn't guide GMs toward appropriate options.
5. **No random generation for attacks/abilities.** The random creature generator provides concept and appearance but stops short of generating mechanical content.

### 4.3 Recommendations

1. **Add a pre-built attack catalogue** to the builder, organized by attack type (melee, ranged, area, special). Each template should auto-scale damage to the selected tier.
2. **Add a pre-built ability catalogue** organized by role (see §6 below). Each ability should include the correct TN and save type for the selected tier.
3. **Add Elite/Lord trigger templates** as a dedicated section when Elite or Lord category is selected.
4. **Integrate random table rolls** into the builder as a "Quick Generate" button that populates attacks and abilities from the catalogues.

---

## 5. Random Tables Framework

### 5.1 Design Philosophy

Random tables for creature mechanics serve two distinct purposes, which should be kept separate:

| Table Type | Purpose | Where It Belongs | User |
|---|---|---|---|
| **Concept Tables** | Generate creature appearance, theme, flavor | Random Tables (GM Tools) | Improvisation, session prep |
| **Mechanical Tables** | Generate attacks, abilities, triggers | Core Rules + Builder | Creature stat block completion |

The existing concept tables (`06-random-creature.mdx`) are excellent for inspiration. What the system lacks is the *mechanical* layer — tables that output gameable effects a GM can drop directly into a stat block.

### 5.2 Proposed Mechanical Random Tables

The following tables should be added to the creature rules (`docs/08-creatures/02-creature-rules.md`) as part of the "Creature Abilities" section (currently a TODO stub). Each table uses a d12 for sufficient variety without overwhelming choice.

#### Table 1: Basic Attack Effects (d12)

Roll on this table to add a secondary effect to any creature attack.

| d12 | Effect | Example |
|---|---|---|
| 1 | **Knockdown** — On a strong or critical hit, the target falls prone. | Tail sweep, shoulder charge |
| 2 | **Grapple** — On a hit, the creature attempts to grapple the target. | Bite and hold, tentacle wrap |
| 3 | **Push** — On a strong or critical hit, the target is pushed close. | Shield bash, horn charge |
| 4 | **Bleed** — On a strong or critical hit, the target suffers bleeding (weapon damage). | Claw slash, jagged bite |
| 5 | **Poison** — On a strong or critical hit, the target is poisoned for a short duration. | Venomous bite, toxic spit |
| 6 | **Burn** — On a strong or critical hit, the target suffers burning (weapon damage). | Flaming strike, fire breath |
| 7 | **Stun** — On a critical hit, the target is dazed until end of their next turn. | Thunder slam, psychic lash |
| 8 | **Disarm** — On a strong or critical hit, the target drops one held item. | Weapon snatch, tail whip |
| 9 | **Slow** — On a strong or critical hit, the target is slowed until end of their next turn. | Frost touch, entangling web |
| 10 | **Fear** — On a critical hit, the target is frightened until end of their next turn. | Terrifying screech, death gaze |
| 11 | **Drain** — On a hit, the creature regains HP equal to half the damage dealt. | Life drain, blood siphon |
| 12 | **Chain** — On a strong or critical hit, one additional creature in close range takes half damage. | Lightning arc, psychic echo |

#### Table 2: Passive Abilities (d12)

Roll on this table to add a passive ability to any creature.

| d12 | Ability | Effect |
|---|---|---|
| 1 | **Keen Senses** | +1 boon on Perception rolls (specify sense: scent, hearing, or sight). |
| 2 | **Pack Tactics** | While in a troop or in melee range of allies, this creature's attacks gain +1 boon. |
| 3 | **Charge** | If this creature spends Movement towards its target during the turn it attacks, it gains +1 boon on the attack and deals +2 damage. |
| 4 | **Ambush Predator** | This creature deals +(weapon damage) extra damage against surprised targets. |
| 5 | **Magic Resistance** | This creature gains +1 boon on saves against spells and magical effects. |
| 6 | **Relentless** | The first time this creature would suffer an Injury, it can ignore it. |
| 7 | **Regeneration** | This creature regains (tier × 2) HP at the start of its turn if it has at least 1 HP. |
| 8 | **Aura of Pain** | At the start of this creature's turn, each opponent within melee range takes (tier) damage of an appropriate type. |
| 9 | **Elusive** | When missed by a melee attack, this creature can move close without provoking attacks. |
| 10 | **Formation Fighting** | While adjacent to an ally, this creature gains +1 Parry. |
| 11 | **Sunlight/Element Sensitivity** | This creature suffers +1 bane on attacks while exposed to a specific element or condition. |
| 12 | **Incorporeal** | This creature can move through other creatures and objects as difficult terrain. Takes (tier) damage if ending turn inside an object. |

#### Table 3: Active Abilities (d12)

Roll on this table to add an active ability (costs an Action) to any creature.

| d12 | Ability | Effect |
|---|---|---|
| 1 | **Frightful Presence** | Each opponent within short range must roll Spirit + Fortitude vs. ability TN or become frightened for a short duration. |
| 2 | **Breath Weapon** | Recharge (d6). All creatures in a cone/line to short range must roll vs. Dodge. Deal (weapon damage × 3) damage of an appropriate type. |
| 3 | **Summon Allies** | 1/day. Summon 1d4 Basic creatures of equal or lower tier. They arrive at the start of the next round. |
| 4 | **Web/Entangle** | One target in short range is restrained until they escape (Strength + Athletics vs. ability TN). |
| 5 | **Charm/Command** | One target in short range must roll Spirit + Fortitude vs. ability TN or become charmed for a short duration. |
| 6 | **Terrifying Roar** | All opponents within short range must roll Spirit + Fortitude vs. ability TN or be frightened and pushed close. |
| 7 | **Ground Slam** | All creatures within melee range must roll Agility + Athletics vs. ability TN or take (weapon damage × 2) damage and fall prone. |
| 8 | **Toxic Cloud** | Creates a poison cloud in close range for a short duration. Creatures entering or starting their turn in the cloud take (weapon damage) poison damage. |
| 9 | **Dreadful Gaze** | One target in short range must roll Spirit + Fortitude vs. ability TN or be paralyzed until end of their next turn. |
| 10 | **Innate Spellcasting** | This creature can cast 2–3 spells (matching its tier's skill rank) once per scene each. Choose thematically appropriate spells. |
| 11 | **Frenzy** | 1/day. For a short duration, this creature gains +1 boon on attacks and +1 additional attack per turn. |
| 12 | **Burrowing Ambush** | This creature can burrow underground and reappear in any unoccupied space within short range. The first attack after resurfacing gains +1 boon. |

#### Table 4: Quick Actions (d10)

Roll on this table to add a Quick Action to Elite or Lord creatures.

| d10 | Quick Action | Type | Effect |
|---|---|---|---|
| 1 | **Reactive Strike** | Reactive | When an opponent in melee range attacks an ally, this creature can make a melee attack against that opponent. |
| 2 | **Shield Wall** | Reactive | When targeted by an attack, gain +2 to the targeted defense until end of turn. |
| 3 | **Commanding Shout** | Proactive | One allied creature within short range can immediately move or make an attack. |
| 4 | **Tail/Wing Sweep** | Proactive | All opponents in melee range must roll Agility + Athletics vs. ability TN or take (weapon damage) damage and fall prone. |
| 5 | **Dodge Roll** | Reactive | When targeted by an attack, move close without provoking attacks. |
| 6 | **Intimidating Growl** | Proactive | One opponent in short range suffers +1 bane on their next attack. |
| 7 | **Quick Cast** | Proactive | Cast a rank 0 or rank 1 spell as a Quick Action. |
| 8 | **Detect** | Proactive | Make a Perception check to locate hidden creatures. |
| 9 | **Reposition** | Proactive | Move close without provoking attacks. |
| 10 | **Absorb Magic** | Reactive | When targeted by a spell, roll Spirit + Fortitude vs. the caster's result. On a success, negate the spell and regain (tier × 2) HP. |

---

## 6. Elite & Lord Ability Catalogue

### 6.1 Elite Trigger Abilities (d10)

Every Elite creature must have one Elite Trigger that activates when its first life pool is depleted. Roll or choose from the following:

| d10 | Trigger Name | Effect |
|---|---|---|
| 1 | **Berserk Fury** | This creature's attacks deal +(weapon damage) extra damage for the rest of the scene. |
| 2 | **Desperate Roar** | All opponents within short range must roll Spirit + Fortitude vs. ability TN or become frightened until end of their next turn. |
| 3 | **Aura Eruption** | This creature gains a damage aura. All opponents ending their turn in melee range take (weapon damage) damage of an appropriate type for the rest of the scene. |
| 4 | **Summon Reinforcements** | 1d4+1 Basic creatures of 2 tiers lower appear in short range. |
| 5 | **Power Surge** | All of this creature's attributes increase by one die size for the rest of the scene. |
| 6 | **Terrain Hazard** | The creature's area and all adjacent areas gain a hazard (burning, freezing, toxic, unstable) for the rest of the scene. Creatures starting their turn in the hazard take (weapon damage) damage. |
| 7 | **Ability Recharge** | The creature immediately recharges all recharge abilities and can use one as a free action. |
| 8 | **Enraged Assault** | This creature immediately makes two melee attacks against different targets. |
| 9 | **Hardened Resolve** | This creature gains resistance to all damage types for a short duration. |
| 10 | **Adaptive Defense** | This creature gains immunity to the damage type that depleted its first life pool for the rest of the scene. |

### 6.2 Lord Trigger Abilities (d10)

Lord creatures must have at least one Lord Trigger that activates each time a life pool is depleted. Roll or choose:

| d10 | Trigger Name | Effect |
|---|---|---|
| 1 | **Cataclysmic Blast** | All creatures within short range must roll Agility + Athletics vs. ability TN or take (weapon damage × 3) damage and be knocked prone. |
| 2 | **Dark Resurrection** | 1d4 defeated Basic allies are reanimated with half HP in short range. |
| 3 | **Phase Shift** | This creature teleports to any location within medium range and becomes invisible until the start of its next turn. |
| 4 | **Empowered Minions** | All allied creatures gain +1 boon on attacks and +(weapon damage) extra damage for the rest of the scene. |
| 5 | **Elemental Storm** | Choose a damage type. For the rest of the scene, at the start of each of this creature's turns, all opponents within short range take (weapon damage) damage of that type. |
| 6 | **Devastating Strike** | This creature immediately makes one attack with triple weapon damage against each opponent in melee range. |
| 7 | **Regenerative Burst** | This creature regains (tier × 5) HP immediately and gains regeneration (tier × 2) HP per turn for the rest of the scene. |
| 8 | **Reality Warp** | The battlefield changes dramatically — roll on the Terrain Hazard table or create an environmental effect that lasts for the rest of the scene. |
| 9 | **Blood Frenzy** | This creature gains an additional attack per turn and +1 Movement for the rest of the scene. |
| 10 | **Dominate** | One opponent within short range must roll Spirit + Fortitude vs. ability TN or be charmed and fight for the creature until the end of their next turn. |

### 6.3 Abilities by Archetype Role

The following table maps recommended ability types to each archetype, guiding GMs toward thematically appropriate choices.

| Archetype | Recommended Passive | Recommended Active | Recommended Quick Action | Recommended Trigger |
|---|---|---|---|---|
| **Standard** | Formation Fighting, Charge | Frightful Presence | Reactive Strike | Berserk Fury |
| **Ambusher** | Ambush Predator, Elusive | Burrowing Ambush | Dodge Roll | Power Surge |
| **Artillery** | Keen Senses | Breath Weapon, Toxic Cloud | Quick Cast | Ability Recharge |
| **Bruiser** | Charge, Relentless | Ground Slam, Frenzy | Tail/Wing Sweep | Enraged Assault |
| **Defender** | Formation Fighting, Regeneration | Frightful Presence | Shield Wall, Reactive Strike | Hardened Resolve |
| **Horde** | Pack Tactics | Summon Allies | Commanding Shout | Summon Reinforcements |
| **Controller** | Aura of Pain, Magic Resistance | Web/Entangle, Charm/Command, Dreadful Gaze | Intimidating Growl | Terrain Hazard |
| **Ranged** | Keen Senses, Ambush Predator | Breath Weapon | Reposition | Adaptive Defense |
| **Skirmisher** | Elusive, Charge | Burrowing Ambush | Dodge Roll, Reposition | Power Surge |
| **Support** | Regeneration, Formation Fighting | Innate Spellcasting, Summon Allies | Commanding Shout, Quick Cast | Empowered Minions |

---

## 7. Step-by-Step Creature Building Guide

### Quick Build (Under 5 Minutes)

Use this procedure to build a creature from scratch using the tier table, archetype system, and ability catalogues.

#### Step 1: Concept (30 seconds)

Decide three things:
- **What is it?** Choose a creature type (Beast, Humanoid, Undead, etc.) and size.
- **What tier?** Match to the party's average level.
- **How important is it?** Basic (minion/fodder), Elite (sub-boss), or Lord (final boss).

#### Step 2: Statistics (1 minute)

Use the Creature Builder tool or the tier table:

1. **Look up the tier row** for HP, AV, Defense, Max Attribute, Skill Ranks, Weapon Damage, and Ability TN.
2. **Choose an archetype** that matches the creature's combat role (Bruiser for a frontline brawler, Artillery for a ranged blaster, etc.). Apply the archetype's stat modifiers.
3. **Apply size modifiers** to AV and defenses.
4. **Set attributes** — assign the max die to the primary attribute, lower dice to the rest.
5. **Assign skills** — choose 2–4 appropriate skills at the tier's skill rank values.

#### Step 3: Attacks (1 minute)

Every creature needs at least one attack.

1. **Choose a primary attack** — melee (Bite, Claw, Weapon) or ranged (Bow, Spell, Breath).
2. **Calculate damage** — Base Damage (½ primary attribute die average) + Weapon Damage per SL: Weak / Strong / Critical.
3. **Add a secondary effect** — roll on or choose from the Basic Attack Effects table (§5.2, Table 1). Common choices: Knockdown for brutes, Poison for beasts, Grapple for predators.
4. **Optional: Add a second attack** — use a different damage type or range. Multi-target attacks deal half weapon damage.

#### Step 4: Abilities (1–2 minutes)

- **Basic creatures:** 1–2 passive abilities. Roll on or choose from the Passive Abilities table (§5.2, Table 2).
- **Elite creatures:** 1–2 passives + 1 active ability + 1 Quick Action + 1 Elite Trigger.
  - Roll on the Active Abilities table (§5.2, Table 3) for the active ability.
  - Roll on the Quick Actions table (§5.2, Table 4) for the Quick Action.
  - Roll on the Elite Trigger table (§6.1) for the trigger.
- **Lord creatures:** 2 passives + 1–2 active abilities + 1–2 Quick Actions + 1 Lord Trigger.
  - Roll on each relevant table, or use the archetype recommendations (§6.3) for guidance.

#### Step 5: Finishing Touches (30 seconds)

1. **Add immunities/resistances/weaknesses** appropriate to creature type:
   - Undead: immune to bleeding, charmed, confused, frightened, poisoned, unconscious.
   - Automatons: immune to bleeding, charmed, confused, frightened, poisoned, unconscious.
   - Spirits: immune to conditions from their element, often resistant to physical damage.
   - Beasts: typically no special immunities.
2. **Name the creature** — evocative names that suggest the creature's nature.
3. **Done.** Use the stat block format or export from the builder.

### Example: Building a Tier 4 Elite Controller

Following the steps above:

**Step 1 — Concept:** A Medium Spirit (Infernal), Tier 4, Elite. A mid-boss demonic entity that manipulates the battlefield.

**Step 2 — Statistics (Controller archetype):**

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 2×40 | 4 (light) | d6 | d8 | d10 | d8 | 10 | 9 | 12 |

**Skills:** Arcana (3), Fortitude (3), Insight (3), Perception (3)

**Step 3 — Attacks:**
- **Hellfire Bolt** (*range (medium)*). 9/15/21 fire damage. On a strong or critical hit, the target suffers burning (4).

**Step 4 — Abilities:**
- **Magic Resistance (Passive).** +1 boon on saves against spells and magical effects.
- **Aura of Dread (Passive).** Opponents starting their turn in melee range take 4 psychic damage.
- **Charm/Command (Action).** One target in short range rolls Spirit + Fortitude vs. TN 10 or is charmed for a short duration.
- **Intimidating Growl (Quick Action, Proactive).** One opponent in short range suffers +1 bane on their next attack.
- **Terrain Hazard (Elite Trigger).** When the first life pool is depleted, the creature's area erupts in hellfire. Creatures starting their turn in melee range take 6 fire damage for the rest of the scene.

**Immunities:** fire damage, charmed, frightened

**Step 5 — Name:** **Infernal Deceiver**

---

## 8. Integration with Existing Tools

### 8.1 Rules Integration

The mechanical random tables (§5.2) and ability catalogues (§6) should be added to the creature rules document (`docs/08-creatures/02-creature-rules.md`) under the existing "Creature Abilities" heading (currently a TODO). This gives all GMs access to the framework regardless of whether they use the digital builder.

### 8.2 Builder Integration (Future)

The following enhancements would integrate the framework into the React Creature Builder:

1. **Attack Template Selector** — dropdown menu of common attacks with auto-calculated damage.
2. **Ability Template Selector** — searchable catalogue of abilities, filtered by archetype compatibility.
3. **"Quick Generate" Button** — rolls on the random tables to auto-populate attacks and abilities.
4. **Trigger Template Panel** — appears when Elite/Lord is selected, offering appropriate triggers.

### 8.3 Relationship to Concept Tables

The existing random creature concept tables (`06-random-creature.mdx`) generate *what the creature looks like*. The mechanical tables proposed here generate *what the creature does in combat*. The recommended workflow is:

1. **Roll concept** (existing tables) → get creature type, shape, attributes, adaptations.
2. **Set tier and archetype** (builder or manual) → get statistical chassis.
3. **Roll or choose mechanics** (new tables) → get attacks, abilities, triggers.
4. **Combine** → complete, playable creature.

---

## 9. Summary of Recommendations

### Priority 1 — Core Rules (Immediate)

| # | Recommendation | Location |
|---|---|---|
| 1 | Fill the "Creature Abilities" TODO section with the mechanical random tables from §5.2 | `docs/08-creatures/02-creature-rules.md` |
| 2 | Add Elite Trigger and Lord Trigger catalogues from §6.1–6.2 | `docs/08-creatures/02-creature-rules.md` |
| 3 | Add archetype-to-ability mapping from §6.3 | `docs/08-creatures/02-creature-rules.md` |
| 4 | Add encounter building guidelines (Threat Budget system) from §3 | `docs/08-creatures/02-creature-rules.md` or new `encounter-building.md` |
| 5 | Add step-by-step creature building guide from §7 | `docs/08-creatures/02-creature-rules.md` |

### Priority 2 — Builder Enhancements (Future)

| # | Recommendation | Component |
|---|---|---|
| 6 | Add pre-built attack templates with auto-scaling damage | `CreatureBuilder.tsx` |
| 7 | Add pre-built ability catalogue, searchable and filterable | `CreatureBuilder.tsx` |
| 8 | Add Elite/Lord trigger template selector | `CreatureBuilder.tsx` |
| 9 | Add "Quick Generate" button using random tables | `CreatureBuilder.tsx` |
| 10 | Integrate concept tables + mechanical tables into unified generation flow | `06-random-creature.mdx` + Builder |

### Priority 3 — Balance Documentation

| # | Recommendation | Location |
|---|---|---|
| 11 | Document Tier 0 as non-combat / environmental creatures | Creature rules, Builder tooltip |
| 12 | Add "Tier vs. Party Level" sidebar clarifying 1:1 encounter baseline | Creature rules |
| 13 | Document intentional HP asymmetry between creatures and adventurers | Creature rules |

---

## Appendix A: Damage Calculation Reference

For quick reference when building creature attacks:

**Base Damage** = ½ primary attribute die average

| Attribute Die | Average | Base Damage |
|---|---|---|
| d4 | 2.5 | 2 |
| d6 | 3.5 | 3 |
| d8 | 4.5 | 4 |
| d10 | 5.5 | 5 |
| d12 | 6.5 | 6 |
| d12+1 | 7.5 | 7 |
| d12+2 | 8.5 | 8 |

**Damage Formula:**
- **Weak:** Base Damage + Weapon Damage
- **Strong:** Base Damage + (2 × Weapon Damage)
- **Critical:** Base Damage + (3 × Weapon Damage)

**Weapon Damage by Tier:**

| Tier | Weapon Damage | Weak (d8 primary) | Strong | Critical |
|---|---|---|---|---|
| 0 | 2 | 6 | 8 | 10 |
| 1 | 3 | 6 | 9 | 12 |
| 2 | 4 | 8 | 12 | 16 |
| 3 | 5 | 9 | 14 | 19 |
| 4 | 6 | 10 | 16 | 22 |
| 5 | 7 | 12 | 19 | 26 |
| 6 | 8 | 14 | 22 | 30 |
| 7 | 9 | 15 | 24 | 33 |
| 8 | 10 | 17 | 27 | 37 |
| 9 | 11 | 18 | 29 | 40 |
| 10 | 12 | 20 | 32 | 44 |

> **Note:** Multi-target attacks should deal half weapon damage. The table above assumes a d8 (base damage 4) primary attribute for reference; adjust base damage for the creature's actual primary attribute.

## Appendix B: Creature Category Quick Reference

| Feature | Basic | Elite | Lord |
|---|---|---|---|
| **Life Pools** | 1 | 2 | 3 |
| **Wounds** | 1 (instant death) | 2 | 3 |
| **HP Format** | "40" | "2×40" | "3×40" |
| **Attacks** | 1–2 | 2–3 | 3–5 |
| **Abilities** | 1–3 | 2–4 (incl. trigger) | 3–6 (incl. triggers) |
| **Quick Actions** | 0–1 | 1+ required | 2+ required (reactive + proactive) |
| **Resolve** | 0 | 1 | 3 |
| **Morale** | Must roll | +1 boon on roll | No roll needed |
| **Second Turn** | No | No | Yes (½ Initiative) |
| **Condition Recovery** | No | On first Wound | On every Wound |
| **Condition Immunity** | No | No | After succeeding once |
| **Threat Points** | 1 TP | 3 TP | 5 TP |

## Appendix C: Existing Creature Ability Patterns

Analysis of abilities across existing creature stat blocks (Tier 0–10) reveals the following recurring patterns:

### Most Common Passive Abilities
1. **Keen Senses** (scent/hearing/sight) — 15+ creatures
2. **Pack Tactics** — 8+ creatures (canines, goblins, kobolds, tribal warriors)
3. **Undead/Construct Nature** — all undead and automatons
4. **Flying** — all avian, draconic, and some spirit creatures
5. **Charge** — boars, cavalry, bull-type creatures
6. **Spider/Wall Climb** — spiders, vampire lords, some elementals
7. **Magic Resistance** — satyrs, some spirits, some boss creatures
8. **Regeneration** — trolls, vampires, some spirits

### Most Common Active Abilities
1. **Frightful Presence** — dragons, powerful undead, demons
2. **Breath Weapon** (recharge d6) — all dragons
3. **Innate Spellcasting** — cultists, priests, spellcaster humanoids
4. **Charm/Command** — vampires, fey, some spirits
5. **Summon Allies** — vampire lords, some demons

### Most Common Quick Actions
1. **Wing Attack** — all flying creatures Large+
2. **Tail Sweep** — dragons, large reptiles
3. **Stomp** — giants, large creatures
4. **Command Undead/Allies** — undead lords, warlords
5. **Shell/Shield Defense** — turtles, armored creatures

### Elite Trigger Patterns
1. **Immediate area attack** (roar, blast, eruption) — most common
2. **Recharge and use breath weapon** — dragons
3. **Stat boost** (attribute increase, damage aura) — powerful creatures
4. **Environmental change** (hazard zone) — elemental creatures

### Lord Trigger Patterns
1. **Area damage + condition** (sandstorm, blood frenzy) — most common
2. **Summon reinforcements** — undead lords, demon lords
3. **Phase/teleport + repositioning** — cunning lords
4. **Regenerative burst** — trolls, nature-based lords
