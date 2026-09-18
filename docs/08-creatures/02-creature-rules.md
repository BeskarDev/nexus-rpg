---
sidebar_position: 2
---

# 📜 Creature Rules

![banner-img](/img/banner/creature-rules-banner.png)

Creatures act in the same basic ways adventurers do, but some details differ:

- Spell-casting creatures don’t use Focus for their spells. Instead, they are limited in their use of individual spells. They can only cast each spell once. After they have cast each spell once, they regain their single use of each spell again.
- Creature attacks or abilities refer to different groups of combatants with the following meanings.
  - “Creature”: refers to the creatures themselves.
  - “Creatures”: refers to all creatures, regardless of allegiance.
  - “Allies”: refers to all other creatures aligned with the creature.
  - “Opponents”: refers to the adventurers, their allies, as well as other creature groups that are opposed to the creature and their allies.

This page covers how creatures work at the table. For how to build one, see [Building Creatures](../10-gm-tools/02-builder-tools/10-building-creatures.md).

## Creature Types

Creatures are categorized by their fundamental nature, defining mechanical interactions with spells, abilities, and effects.

### Primary Types

| Type | Description | Subtypes |
|------|-------------|----------|
| **Automaton** | Made things given motion, whether from a mortal workshop or a god's forge. | Golem, Animated Object, Vessel |
| **Beast** | Natural animals lacking inherent magic. | Mammal, Reptile, Bird, Insect, Aquatic, Saurian |
| **Divine Beast** | Shaped or marked by a god, and made for a purpose. Bound to a duty, a place, or a mandate. | Guardian, Omen, Forsaken |
| **Draconic** | Elemental spirit-beings permanently bound to the material world, and their lesser kin. | True Dragon, Celestial Dragon, Lesser, Serpent, Dragonkin |
| **Giant** | The titanic-era lineage. Some held onto their minds, some did not. | Elder, Feral |
| **Horror** | Things belonging to no realm at all, and what their presence does to living matter. | Warped, Adapted, Cosmic |
| **Humanoid** | The peoples, and those descended or fallen from them. | The twelve folk, and others |
| **Magical Beast** | Magic in the biology, with no maker and no purpose. | Hybrid, Hive, Primal, Aberrant |
| **Ooze** | Amorphous bodies that flow, cling, and consume. | - |
| **Plant** | Animate vegetation and fungal growth, mobile or rooted. | Tree, Fungus, Vine |
| **Spirit** | Beings aligned to one of the spirit realms, manifesting its nature. | Celestial, Infernal, Primordial, Sylvan, Chthonic, Astral |
| **Undead** | The dead returned through necromancy or curse. | Corporeal, Incorporeal |

A creature may carry more than one subtype. A werewolf is **Human** and **Shapechanger**; an Urduk fire-elemental automaton is **Vessel** and **Intelligent**.

Two boundaries decide the cases that look alike:

- A **Spirit** belongs to a realm. A **Horror** belongs to nothing.
- A **Draconic** creature is permanently manifest in the material world. A **Spirit** moves between realms.

### Additives

Additives are subtypes that describe a nature cutting across the types, rather than a kind of creature.

**Mindless** or **Intelligent**: whether there is a mind to reach. A mindless creature doesn't roll Morale, can't be parleyed with, and is immune to being charmed, frightened, or confused. An intelligent one is none of those things. Every Undead and Automaton carries one or the other.

**Shapechanger**: can alter its physical form.

**Swarm**: one creature that is a mass of small bodies. Resistant to damage from effects targeting a single creature, immune to conditions from such effects, can't be grappled, and occupies an area. While a swarm is at half HP or lower, their attacks deal half damage, rounded up, as too few of them are left to cover a target. This is not the same as the Horde archetype, which is many separate creatures fighting as a troop.

**Amorphous**: no fixed form. Squeezes through any gap, can't be grappled, and has no anatomy to target. Every ooze is amorphous.

### Using Types

Types determine spell targeting (e.g., *Control Beast*), equipment bonuses (e.g., silverroot vs. undead), ability interactions (e.g., favored enemy), and immunity patterns.

## Creature Categories

Creatures can come in different categories representing their importance and power level. A creature's category decides how many Wounds they can take, how much Fatigue they can endure, whether they roll Morale, and how they use Resolve.

### Basic

The most simple type of creature you encounter in almost every combat. They are goons who die quickly and can't do too much. But beware them in great numbers.

Basic creatures…

- can only take one Wound and instantly die from one Injury.
- can’t spend Resolve.
- have to roll for Morale if things go bad for them.
- can combine with their allies into troops.

**Morale**

When the tide of battle turns against them, they need to roll Spirit + Fortitude to hold their morale. The following situations require creatures to roll for morale:

- The number of creatures is reduced below half their original size.
- All elite creatures or lords are dead or otherwise removed from the fight.

**Troops**

Larger numbers of the same type of basic creature can also be grouped into troops. Typically three or more creatures with the same statistics and equipment should be grouped into a troop.

For this, treat the whole troop as one creature using the members statistics and the following rules:

- **HP.** Track the normal HP of one of the troop’s members and reduce it with any damage against the troop. Whenever the troop’s HP is reduced to 0, one of its members dies and their HP are reset to the maximum, being further reduced by any excess damage. Large amounts of damage from a single attack can also take out multiple of the troop’s members if it exceeds the troop’s HP multiple times.<br/>The troop is disbanded once their size is reduced to two or less.
- **Area of Effect.** For effects that target multiple members of the troop, treat each member as a single creature. Damage applied to multiple members is added together and applied to the troop as a whole. When applying conditions or other lasting effects, split the original troop into two new troops (if enough members remain) between those affected and those that are not affected.

> **Example: Attacking a troop**
> The adventurers face a troop of five goblins. The troop has 10 HP and 2 AV, the same as a single goblin. One of the adventurers attacks the troop with a cleave attack, targeting three of its members. They hit and deal 13 damage to each target. The goblin troop’s 2 AV reduces this to 11 damage per target and therefore 33 damage in total against the troop itself. From this damage, three goblins in the troop die and a fourth loses 3 HP. Since the troop has fewer than three members left, the GM immediately rolls for Morale to see if the two remaining goblins flee or continue the fight as single creatures.

- **Targeting.** When choosing a target, all members of the troop choose the same target. You can split the original troop into multiple troops (if enough members remain) when you want to split the troop up for multiple targets.
- **Troop Bonus.** This bonus is equal to half the troop size (rounded down).
- **Rolling Tests.** Roll only once for the entire troop. If the members have ranks in the skill they roll with, add the troop bonus instead of that skill rank to the result.
- **Dealing Damage.** Roll a single attack for the entire troop using the rules above. Troops don’t use the normal rules for dealing damage. Instead, the troop deals damage according to the SL of the roll:

Any other abilities or effects that increase the damage of the troop are added only once to the total damage dealt.
  - **Blunder.** No damage.
  - **Failure.** (Base Damage + Weapon Damage) x Troop Bonus
  - **Weak.** (Base Damage + Weapon Damage) x (1 + Troop Bonus)
  - **Strong.** (Base Damage + Weapon Damage) x (2 + Troop Bonus)
  - **Critical.** (Base Damage + Weapon Damage) x (3 + Troop Bonus)

> **Example: Getting attacked by a troop**
> A troop of five goblin warriors attacks you with their daggers (2 weapon damage). They roll their attack with 1d8 (Agility) + 1d6 + 2 (troop bonus). Based on the SL, they deal the following amount of damage:
> - **Blunder.** No damage.
> - **Failure.** 12 damage. ([4 base + 2 weapon] x 2)
> - **Weak.** 18 damage. ([4 base + 2 weapon] x 3)
> - **Strong.** 24 damage. ([4 base + 2 weapon] x 4)
> - **Critical.** 30 damage. ([4 base + 2 weapon] x 5)

### Elite

Few and far between you will encounter the elite among creatures.

Elite creatures…

- can take up to two Wounds. When they suffer their first Wound, they regain all of their HP (this can't be negated) and recover from all negative conditions and effects affecting them.
- they start the scene with 1 Resolve.
- have to roll for Morale, but gain +1 boon on it.

### Lord

Lords are the highlight of a whole adventure. They are often the powerful leader of an entire faction of creatures.

Lord creatures…

- can take up to three Wounds. When they suffer a Wound, they regain all of their HP (this can't be negated) and recover from all negative conditions and effects affecting them.
- when they succeed on a roll to withstand or recover from any condition, they are immune to that type of condition for the rest of the scene.
- start the scene with 3 Resolve.
- can have a single signature ability that charges Resolve as its cost. Spending Resolve on it means giving up a re-roll later in the same fight.
- get a second round per turn at half their original Initiative.
- don’t have to roll for Morale.

### Fatigue

Creatures don't track the max. HP reduction that Fatigue causes for adventurers. For them, Fatigue is simply how far they can be worn down before they drop, and how much they can take depends on their category.

| | Basic | Elite | Lord |
| --- | --- | --- | --- |
| Max. Fatigue | 2 | 4 | 6 |

When a creature reaches their maximum, they fall unconscious and stay that way for the rest of the scene. This mirrors the Wounds each category can take, so wearing a creature down with Fatigue costs roughly the same effort as fighting through their life pools.

Fatigue is not a condition. Suffering a Wound doesn't remove it.

## Size

While adventurers are generally small or medium sized, there are a variety of other-sized creatures from tiny to colossal:

| Size Category | Modifier | Example Creatures |
| --- | --- | --- |
| Tiny | -2 | house cat |
| Small | -1 | domesticated dog |
| Medium | +0 | wolf |
| Large | +1 | horse |
| Huge | +2 | mountain giant |
| Gargantuan | +3 | fully-grown dragon |
| Colossal | +4 | dragon turtle |

Each size category's modifier influences several of the creature's statistics (see [Building Creatures](../10-gm-tools/02-builder-tools/10-building-creatures.md)).

### Big creatures in melee combat

While tiny to huge creatures are handled by the normal rules for distances and when you can attack creatures in melee, creatures bigger than that are an exception. Each creature of these size categories has the following rules applied to them:

**Gargantuan (+3).** This creature fills up an entire area.

- Other creatures can’t enter this creatures area, unless they grapple onto it or roll some other form of test to pass.
- Creatures in adjacent areas are considered close to this creature. They can choose to get into melee range, as if they were in the same area with it.
- When determining any other range category, treat any of the adjacent areas of this creature as the maximum distance you have to cover.

**Colossal (+4).** This creature fills up multiple areas.

- This creature takes up the area it is in, as well as all adjacent areas. It is considered to be within any of those areas at the same time.
- Other creatures can’t enter this creatures areas, unless they grapple onto it or roll some other form of test to pass.
- Creatures in adjacent areas to any of this creatures areas are considered close to this creature. They can choose to get into melee range, as if they were in the same area with it.
- When determining any other range category, treat any of the adjacent areas of any of this creatures areas as the maximum distance you have to cover.

## Creatures with multiple parts

Some creatures consist of multiple parts. Either because of their sheer size, because it is an object with multiple parts, or a unit consisting of multiple creatures, such as a rider and their mount.

Each individual part has its own HP, Defenses, and attacks. A creature can target a specific part of such a creature or object with an attack but suffers +1 bane on the roll. Once a part is brought to 0 HP, it is considered disabled and the creature suffers a Wound from it (if it is a vital part). A disabled part no longer contributes its attacks and abilities to the entire creature or object.

An example is targeting a large dragon's wings to bring it down to the ground.

When the adventurers first encounter or start combat with a creature or object with multiple parts, the GM informs them about all available parts as targets.

## Ability Keywords

**Recharge (dX)**

After using this ability, roll the die indicated and keep it visible for all players. At the end of each of the creature’s turns, reduce the die by one step. If it would be reduced to 0, the ability is available for use again.

## Looting Equipment from Creatures

Adventurers might want to add the equipment of fallen creatures to their own arsenal. With few exceptions, equipment from fallen creatures is always damaged, as a result of bad maintenance, or from the damage they suffered in the fight before. You can repair the Equipment during a rest, to return them to full strength.
