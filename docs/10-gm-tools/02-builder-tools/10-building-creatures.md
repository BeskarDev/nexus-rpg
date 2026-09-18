---
sidebar_position: 10
---

# 🐲 Building Creatures

What a creature is made of, and in what order to decide it. For how creatures work at the table, see [Creature Rules](../../08-creatures/02-creature-rules.md). To have most of this done for you, use the [Creature Builder](./11-creature-builder.mdx).

## 1. Pick a tier

Each creature's power level is separated into ten tiers corresponding to the ten levels adventurers can advance in experience. As not all creatures are the same of course, balance out higher-tier statistics with lower-tier ones so the creature balances out at their intended tier.

> A single creature of any Tier should be a decent challenge for a single adventurer of the same Level. But keep in mind that special abilities and the number of combatants on either side will strongly influence this baseline of challenge. The GM should always use their intuition when determining the appropriate degree of challenge an enemy encounter should have for the adventuring group.

|  | HP | AV (light / heavy) | Defense | Max. Attribute | Skill Rank (1st / 2nd) | Weapon Damage | Ability Difficulty | Secondary Damage |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tier 0 | 5 | 0 / 1 | 6 | d6 | 0 / 1 | 2 | TN 6 | 1 |
| Tier 1 | 10 | 1 / 2 | 7 | d6 | 1 / 1 | 3 | TN 7 | 2 |
| Tier 2 | 20 | 2 / 3 | 8 | d8 | 1 / 2 | 4 | TN 8 | 2 |
| Tier 3 | 30 | 3 / 5 | 9 | d8 | 2 / 2 | 5 | TN 9 | 3 |
| Tier 4 | 40 | 4 / 6 | 10 | d10 | 2 / 3 | 6 | TN 10 | 3 |
| Tier 5 | 50 | 5 / 8 | 11 | d10 | 3 / 3 | 7 | TN 11 | 4 |
| Tier 6 | 60 | 6 / 9 | 12 | d12 | 3 / 4 | 8 | TN 12 | 4 |
| Tier 7 | 70 | 7 / 11 | 12 | d12 | 4 / 4 | 9 | TN 13 | 5 |
| Tier 8 | 80 | 8 / 12 | 13 | d12+1 | 4 / 5 | 10 | TN 14 | 5 |
| Tier 9 | 90 | 9 / 14 | 13 | d12+1 | 5 / 5 | 11 | TN 15 | 6 |
| Tier 10 | 100 | 10 / 15 | 14 | d12+2 | 5 / 5 | 12 | TN 16 | 6 |

## 2. Pick a category

The category decides how much of the party's attention the creature is built to hold, and with it how many attacks and abilities it should carry. The rules a category brings with it (Wounds, Fatigue, Morale, Resolve, troops) are on the [Creature Rules](../../08-creatures/02-creature-rules.md) page.

|  | Nr. of Wounds | Nr. of Attacks | Nr. of Abilities |
| --- | --- | --- | --- |
| Basic | 1 | 1-2 | 0-3 |
| Elite | 2 | 2-3 | 2-4 |
| Lord | 3 | 3-5 | 3-6 |

A Basic creature can have **no abilities at all**, as long as they have at least one ability or trait between them. A creature whose identity already sits in its attacks, its traits, or a subtype such as Swarm shouldn't be given a filler ability just to fill a column. A creature with neither an ability nor a trait has nothing to distinguish it and needs one of the two.

## 3. Pick a type and a size

Always assign at least one primary type. The type list, the subtypes, and the additives are on the [Creature Rules](../../08-creatures/02-creature-rules.md) page, together with the size table and the special rules for gargantuan and colossal creatures in melee. Both choices feed back into the statistics below.

## 4. Calculate the statistics

- **Hit Points.** Choose a creature's HP based on its Tier. A more frail or sturdy creature should have HP from a lower or higher tier respectively. This decision can be made by the creature's Size or other physical traits.
- **AV.** A creature's base AV should be equal to its Tier, or one and a half times its Tier (rounded up, minimum 1) for heavy armor (a hard shell, full metal armor, etc.). Different modifiers also affect the creature's AV:
  - Larger creatures should have AV from one Tier higher.
  - Smaller creatures should have AV from one Tier lower.
- **Defenses.** The base Defense of a creature is 6 + its Tier up to Tier 5, and then rises by 1 for every two Tiers above that. You can increase and decrease the values of individual Defenses but should always keep the average at the creature's Tier. When adjusting individual Defenses in Tier, you should stay within two steps from its original Tier, as to not make them much too low or too high.
  - Larger creatures should take Parry from one or two steps above their Tier and Dodge from one or two tier below it (one tier for large or huge, two tiers for gargantuan or colossal).
  - Smaller creatures should take Dodge from one or two steps above their Tier and Parry from one or two tier below it (one tier for small, two tiers for tiny).
- **Max. Attribute.** Choose which of the four attributes (Strength, Agility, Spirit, or Mind) is the creature's primary characteristic. Set that attribute to the denoted max. attribute value and the other three to values below that.
- **Skill Rank.** The creature's skill ranks between their primary skills (arcana, archery, fighting, and mysticism) and secondary skills (all other) should reflect the two values denoted by their Tier. Creatures with an even Tier have all of their skills at 1/2 their Tier, whereas creatures with an odd Tier have 1/2 their Tier - 1 for their primary attributes and 1/2 their Tier for their secondary attributes.
- **Weapon Damage.** Most damaging attacks for a creature should use 1/2 their primary attribute as the base damage. Their weapon or spell damage should then be equal to their Tier + 2. Keep in mind that this value is multiplied by the SL of their attacks and any other attacks that don't use the default damage formula, should reflect roughly the same range of damage output.
  - Attacks hitting multiple targets should use only half the creature's Weapon Damage, rounded up. Their base damage is unchanged, the same way a spell's Spell Power applies equally to single-target and multi-target spells.
- **Secondary Damage.** Some creatures carry a second, smaller instance of damage that ignores AV, such as venom, burning blood, or grave cold. This is a choice made for a single creature and not something every creature has. When a creature carries it, the amount is half their Weapon Damage, rounded up, and it is written as its own sentence so it never converts the damage type of the main attack.

  > **Venomous Bite** *(pierce)*. 10/15/20 damage. The target also takes 4 poison damage (ignore AV).
- **Ability Difficulty.** Whenever the creature uses abilities that forces their targets to roll instead, the Difficulty of that roll should be 6 + the creature's Tier.

## 5. Pick an archetype

An archetype is a set of adjustments to the statistics above, shifting a creature toward a combat role. Apply it after the base numbers are in place.

| **Archetype** | **Stat Modifiers** | **Core Identity** | **Combat Role & Behavior** |
| --- | --- | --- | --- |
| Ambusher | Normal HP, Light Armor, High Dodge, Low Parry, Avg Resist, Fast movement | Stealth & Burst | Strikes from surprise, deals big damage in opening turns, fragile if exposed. |
| Artillery | -1 Tier HP, Light/No Armor, Low Parry & Dodge, Avg Resist, +1 Tier Damage (ranged) | Long-Range Cannon | Fragile backliner with extreme ranged threat. Prefers cover and distance. |
| Bruiser | +1 Tier HP, Light Armor, High Parry, Low Dodge, Avg Resist | Frontline Brawler | Durable melee damage dealer, trades blows and pressures enemies up close. |
| Defender | +2 Tier HP, Heavy Armor, High Parry & Resist, Low Dodge, -1 Tier Damage, Slower | Tank & Protector | Soaks damage, locks down foes, defends allies through positioning. |
| Horde | -1 Tier HP, No/Light Armor, Low Defenses, -2 Tier Damage | Overwhelming Numbers | Group of many individual creatures acting together as a single unit. |
| Controller | Normal HP, Light Armor, Avg Parry, High Resist, Low Dodge | Battlefield Shaper | Disables, manipulates, or spawns minions to change flow of battle. |
| Ranged | Normal HP, Light Armor, Low Parry, Avg Dodge & Resist | Reliable Shooter | Balanced ranged attacker with consistent damage output. |
| Standard | Normal HP, Light/Medium Armor, Avg everything | Baseline Soldier | Default „generalist“ enemy with no strong strengths or weaknesses. |
| Skirmisher | Normal HP, Light Armor, Avg Parry, High Dodge, Low Resist, +1 Tier Movement, -1 Tier Damage | Mobile Harasser | Fast, evasive, focuses on hit-and-run tactics rather than raw damage. |
| Support | Normal HP, Light Armor, Avg Parry & Dodge, High Resist, -1 Tier Damage | Ally Enhancer | Buffs, heals, or protects allies, rarely the primary damage source. |
