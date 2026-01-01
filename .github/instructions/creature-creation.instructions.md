# AI Agent Instructions: Creating Creatures for Nexus RPG

## Overview

You are an AI agent tasked with creating balanced, thematic creatures for the Nexus RPG system. This comprehensive guide provides the mechanical framework and design principles you mus### Step 6: Add Immun### Step 8: Apply Size Modifications

| Size | Modifier | Special Rules |
|------|----------|---------------|
| Tiny | -2 | Dodge focus, stealth bonuses |
| Small | -1 | Agility advantages |
| Medium | +0 | Standard rules |
| Large | +1 | Strength focus, harder to hit with ranged |
| Huge | +2 | Area control |
| Gargantuan | +3 | Fills entire area |
| Colossal | +4 | Fills multiple areas |

**Gargantuan/Colossal Combat Rules**:
- Creatures can't enter their areas without special means
- Adjacent areas count as close range
- Can be attacked from multiple directions

### Step 9: Add Immunities, Resistances, and Weaknesses

#### Common Immunity Sets
- **Undead**: bleeding, charmed, confused, deafened, frightened, poisoned, unconscious
- **Automatons**: bleeding, charmed, confused, frightened, poisoned, unconscious  
- **Spirits (Primordial)**: Varies by type (fire spirits immune to fire, etc.)
- **Plants**: deafened, blinded (for some)

#### Resistance/Weakness Guidelines
- **Resistances**: Half damage from specific types
- **Weaknesses**: Double damage from specific types  
- **Common damage types**: physical, fire, cold, lightning, necrotic, radiant, psychic

### Step 10: Validate and Balance, and Weaknesses

#### Common Immunity Sets
- **Undead**: bleeding, charmed, confused, deafened, frightened, poisoned, unconscious
- **Automatons**: bleeding, charmed, confused, frightened, poisoned, unconscious  
- **Spirits (Primordial)**: Varies by type (fire spirits immune to fire, etc.)
- **Plants**: deafened, blinded (for some)

#### Resistance/Weakness Guidelines
- **Resistances**: Half damage from specific types
- **Weaknesses**: Double damage from specific types  
- **Common damage types**: physical, fire, cold, lightning, necrotic, radiant, psychic

### Step 7: Apply Tier Adjustment for Thematic Design (Optional)

Sometimes you may want to create creatures that don't fit perfectly into the standard tier progression. For example:
- Ancient liches with frail bodies but immense magical power
- Brutish ogres with tough bodies but weak minds
- Swift assassins with low health but high agility

**Tier Adjustment Rules**:
1. **Maximum adjustment**: You may adjust any single stat by exactly one tier up or down
2. **Balance requirement**: When you reduce one stat by a tier, you MUST increase a different stat by one tier
3. **Examples**:
   - Frail Mummy Lord: HP from Tier 5 (70 instead of 80), Spirit from Tier 7 (d12+1 instead of d12)
   - Brutish Ogre: Mind from Tier 2 (d8 instead of d10), Strength from Tier 5 (d10 instead of d8)
   - Swift Assassin: HP from Tier 2 (20 instead of 30), Agility from Tier 4 (d10 instead of d8)

**When to Use Tier Adjustment**:
- When standard stats don't match the creature's thematic concept
- To create memorable, unique opponents with distinct strengths and weaknesses
- To represent specific creature backgrounds (ancient magic, genetic mutations, divine curses, etc.)

**What NOT to Adjust**:
- Never adjust more than one stat up or down without balancing
- Don't reduce defensive stats without compensating with offensive improvements
- Avoid creating creatures that are too specialized to be interesting opponents

### Step 8: Apply Size Modificationssure creatures integrate properly with the game's core systems.

**CRITICAL**: Always follow the exact formulas and mechanics described here. Do not deviate from the mathematical relationships unless explicitly instructed.

## Core Creature Design Principles

### 1. **Tier-Based Power Scaling**
Creatures are designed for Tiers 0-10, corresponding to adventurer levels. A single creature of any Tier should provide a decent challenge for one adventurer of the same level.

### 2. **Multi-Life Pool System**
Elite and Lord creatures use a unique life pool system:
- **Basic**: Single life pool (base HP)
- **Elite**: Two life pools (2 × base HP, written as "2×40" for Tier 4)
- **Lord**: Three or more life pools (3+ × base HP, written as "3×40" for Tier 4)

### 3. **Thematic Integration**
All creatures must fit the sword-and-sorcery setting inspired by ancient civilizations. Consider:
- Historical cultural inspirations (Mesopotamian, Egyptian, Persian, etc.)
- Mythological creatures from ancient folklore
- How the creature fits into the world's ecology and societies

### 4. **Mechanical Clarity**
Every rule, ability, and stat must be unambiguous and immediately understandable. AI agents must be able to implement these creatures without ambiguity.

## Creature Statistics Table

Use this table as your foundation for creature stats:

| Tier | HP | AV (light/heavy) | Defense | Max Attribute | Skill Rank (1st/2nd) | Weapon Damage | Ability Difficulty |
|------|----|--------------------|---------|---------------|----------------------|---------------|--------------------|
| 0    | 5  | 0/1               | 6       | d6            | 0/1                  | 2             | TN 6               |
| 1    | 10 | 1/2               | 7       | d6            | 1/1                  | 3             | TN 7               |
| 2    | 20 | 2/4               | 8       | d8            | 1/2                  | 4             | TN 8               |
| 3    | 30 | 3/6               | 9       | d8            | 2/2                  | 5             | TN 9               |
| 4    | 40 | 4/8               | 10      | d10           | 2/3                  | 6             | TN 10              |
| 5    | 50 | 5/10              | 11      | d10           | 3/3                  | 7             | TN 11              |
| 6    | 60 | 6/12              | 12      | d12           | 3/4                  | 8             | TN 12              |
| 7    | 70 | 7/14              | 13      | d12           | 4/4                  | 9             | TN 13              |
| 8    | 80 | 8/16              | 14      | d12+1         | 4/5                  | 10            | TN 14              |
| 9    | 90 | 9/18              | 15      | d12+1         | 5/5                  | 11            | TN 15              |
| 10   | 100| 10/20             | 16      | d12+2         | 5/5                  | 12            | TN 16              |

## Creature Categories and Life Pool Systems

### Basic Creatures
- **Life Pools**: 1 (single HP pool)
- **HP Format**: Standard HP value (e.g., "40" for Tier 4)
- **Wounds**: 1 (die immediately from injury)
- **Attacks**: 1-2
- **Abilities**: 1-3
- **Special Rules**: Must roll Morale, can't spend Resolve, can form troops

### Elite Creatures  
- **Life Pools**: 2 (double HP pools)
- **HP Format**: "2×[base HP]" (e.g., "2×40" for Tier 4 Elite)
- **Wounds**: 2 (regain all HP when taking first Wound)
- **Attacks**: 2-3
- **Abilities**: 2-4 (including mandatory Elite Trigger ability)
- **Special Rules**: Start with 1 Resolve, +1 boon on Morale rolls

**Elite Life Pool Mechanics**:
- Track HP normally for the first life pool
- When first life pool reaches 0 HP, creature takes 1 Wound and immediately regains full HP (second life pool)
- When second life pool reaches 0 HP, creature takes final Wound and dies
- **Elite Trigger**: MUST have an ability that activates when the first life pool is depleted

### Lord Creatures
- **Life Pools**: 3 (exactly 3 life pools)
- **HP Format**: "3×[base HP]" (e.g., "3×40" for Tier 4 Lord)
- **Wounds**: 3 (regain all HP when taking any Wound)
- **Attacks**: 3-5
- **Abilities**: 3-6 (including mandatory Lord Trigger abilities)
- **Special Rules**: Start with 3 Resolve, get second round per turn at half Initiative, no Morale rolls, recover from conditions when Wounded, immune to repeated conditions after succeeding once

**Lord Life Pool Mechanics**:
- Track HP normally for current life pool
- When any life pool reaches 0 HP, creature takes 1 Wound and immediately regains full HP (next life pool)
- Each time a life pool is depleted, creature recovers from all negative conditions
- **Lord Triggers**: MUST have abilities that activate when life pools are depleted

## Mandatory Trigger Abilities

### Elite Trigger Abilities
Required when first life pool is depleted. Choose one approach:

**Power Surge**: 
- Gain +1 tier to all attributes for remainder of combat
- Example: "When the first life pool is depleted, the creature's fury awakens. All attributes increase by one die size for the remainder of the scene."

**Ability Unlock**:
- Gain access to a powerful new ability
- Example: "When the first life pool is depleted, the creature can now use [Devastating Attack] once per turn."

**Environmental Change**:
- Alter the battlefield significantly
- Example: "When the first life pool is depleted, the ground erupts in flames. All areas gain the Burning terrain effect."

### Lord Trigger Abilities
Required when any life pool is depleted. Design 1-2 triggers:

**Power Enhancement**:
- Major tactical shift or power increase
- Example: "When any life pool is depleted, the creature's attributes increase by one die size and it gains +2 weapon damage."

**Environmental/Summon Effect**:
- Alter battlefield or summon allies
- Example: "When any life pool is depleted, summon 2d4 Tier 2 minions in adjacent areas."

## Step-by-Step Creature Creation

### Step 1: Concept and Tier
1. **Define the creature's role** (infantry, ranged, brute, cavalry, artillery, spawner)
2. **Choose appropriate Tier** based on intended challenge level
3. **Select creature category** (Basic, Elite, or Lord)
4. **Determine size** (Tiny to Colossal) - affects stats and combat positioning
5. **Assign creature type** from the official list below

#### Official Creature Types

| Type | Description | Common Subtypes |
|------|-------------|-----------------|
| **Aberration** | Eldritch horrors from outside reality with alien physiologies | — |
| **Automaton** | Artificial beings animated by magic or divine power | Golem, Animated Object, Magical Construct |
| **Beast** | Natural animals and fauna lacking inherent magic | Mammal, Reptile, Bird, Fish, Insect, Hybrid |
| **Draconic** | Winged serpents with elemental attunement and breath weapons | Chromatic, Metallic, Elemental, Wyvern |
| **Giant** | Mythical beings of immense size with supernatural properties | Stone Giant, Cyclops, Troll, Ogre |
| **Humanoid** | Sentient anthropomorphic peoples | Human, Goblinoid, Orc, Elf |
| **Monstrosity** | Magical beasts with supernatural abilities | Chimera, Hydra, Griffin, Magical Beast |
| **Ooze** | Amorphous creatures, typically mindless and corrosive | — |
| **Plant** | Animate vegetation and fungal creatures | Treant, Myconid, Vine Creature |
| **Spirit** | Extraplanar beings manifesting cosmic forces | Celestial, Primordial, Infernal |
| **Undead** | Beings that died and returned through necromancy | Physical, Ethereal |

### Step 2: Calculate Base Statistics

#### Hit Points
**Basic Creatures**:
- Use base HP from tier table directly
- Adjust for size and concept (frail creatures -1 tier, sturdy creatures +1 tier)

**Elite Creatures**:
- Calculate base HP from tier table
- Format as "2×[base HP]" (e.g., Tier 4 = 40, written as "2×40")

**Lord Creatures**:
- Calculate base HP from tier table  
- Always use exactly 3 life pools
- Format as "3×[base HP]" (e.g., Tier 4 = 40, written as "3×40")

**Tier Flexibility for Thematic Design**:
- You may adjust individual stats up or down by one tier to create thematic variation
- **CRITICAL**: When reducing one stat by a tier, you MUST increase another stat by a tier to maintain balance
- Example: A frail but magically powerful creature might use HP from one tier lower but attributes from one tier higher
- This allows creating creatures like ancient liches (frail bodies, powerful magic) or brutish ogres (tough bodies, weak minds)
- The creature's overall challenge rating should still match its intended tier

#### Armor Value (AV)
- **Light armor**: Equal to creature's tier
- **Heavy armor**: Double the creature's tier  
- **Size adjustments**: Larger creatures +1 tier AV, smaller creatures -1 tier AV
- **CRITICAL - Creature Type Guidelines**:
  - **Bone-based creatures**: Use natural heavy armor due to dense structure
  - **Stone/metal constructs**: Typically use natural heavy armor unless specifically agile
  - **When using higher tier AV**: Must balance by reducing another stat by equivalent amount (e.g., reduce HP by one tier if increasing AV by one tier)

#### Defenses (Parry/Dodge/Resist)
- **Base**: 6 + creature's tier for all three
- **Balance adjustments**: Can raise/lower individual defenses within 2 tiers of base
- **Size effects**: 
  - Large/Huge: Parry +1-2 tiers, Dodge -1-2 tiers
  - Small/Tiny: Dodge +1-2 tiers, Parry -1-2 tiers
- **CRITICAL - Resist Limits**: Resist should rarely exceed 6 + tier + 2. High mental attributes don't automatically justify excessive Resist values - maintain tier-appropriate balance.

#### Attributes
- **Primary attribute**: Set to tier's "Max Attribute" value
- **Secondary attributes**: Set below primary, typically 1-2 die sizes smaller
- **Mental attributes**: Consider creature intelligence and willpower

#### Skills  
- **Primary skills**: Fighting, Arcana, Archery, Mysticism at "1st" rank from table
- **Secondary skills**: All others at "2nd" rank from table
- **Thematic skills**: Add ranks based on creature background (e.g., Stealth for ambush predators)

### Step 3: Design Attacks

#### Damage Calculation Formula
**CRITICAL**: Always use this exact formula:
- **Weak Success**: Base Damage + Weapon Damage
- **Strong Success**: Base Damage + (2 × Weapon Damage)  
- **Critical Success**: Base Damage + (3 × Weapon Damage)

#### Base Damage
- Use **half the primary attribute die average** (d6=3, d8=4, d10=5, d12=6, d12+1=7, d12+2=8)

#### Weapon Damage  
- **Single target**: Tier + 2
- **Multiple targets**: Half normal weapon damage (Tier + 2) ÷ 2

#### Attack Properties
Use weapon properties from the rules:
- **agile**: Roll with Agility instead of Strength
- **crush**: Ignore half enemy AV (rounded up)
- **pierce**: Re-roll failed attacks once per turn
- **slash**: Extra weapon damage vs. light/no armor
- **reach**: Attack at close range, +1 bane if enemy in melee
- **light**: Can be dual-wielded
- **two-handed**: Requires both hands, +2 banes if used one-handed

### Step 4: Create Special Abilities

#### Ability Difficulty
- **Target Number**: 6 + creature's tier
- **Save attempts**: Usually Spirit + Fortitude or Strength + Fortitude
- **Duration**: Use standard durations (briefly, short, medium, long)

#### Mandatory Trigger Abilities for Elite/Lord

**Elite Creatures (REQUIRED)**:
Must include 1+ Elite Trigger abilities that activates when the first life pool is depleted:
- Power enhancement (attribute increases, damage bonuses)
- New ability access (previously unavailable attacks/effects)
- Environmental manipulation (terrain changes, summons)

**Lord Creatures (REQUIRED)**:
Must include 2+ Lord Trigger abilities whenever one of the life pools is depleted:
- Each trigger should significantly change combat dynamics

**Quick Action Requirements**:
- **Elite creatures**: Must have at least one Quick Action ability (reactive or proactive)
- **Lord creatures**: Must have at least one reactive Quick Action ability AND one proactive Quick Action ability
- **Reactive Quick Actions**: Triggered by enemy actions, often defensive (e.g., "When targeted by an attack...")
- **Proactive Quick Actions**: Used on the creature's own turn for tactical advantage

**Note**: Elite and Lord creatures have built-in special rules (Resolve, condition recovery, etc.) that are defined by the core rules. You do not need to include "Special Rules" or "Combat Notes" sections in the stat block - these mechanics are understood to apply automatically based on the creature category.

#### Thematic Abilities
Create additional abilities based on creature category:

**Movement Abilities**:
- Flying, swimming, burrowing, climbing
- Teleportation, phasing, invisibility

**Combat Abilities**:
- Multi-attacks, area attacks, grappling
- Damage resistance, condition immunity
- Retaliation effects, reactive abilities
- **Defensive abilities**: All Elite/Lord creatures should have at least one defensive ability that fits their fighting style and nature:
  - **Blocking**: Shield abilities, damage reduction, armor enhancement (heavily armored creatures, guardians)
  - **Redirecting**: Parry and riposte, damage reflection, attack deflection (skilled warriors, weapon masters)
  - **Evading**: Dodge bonuses, teleportation, phasing, displacement (agile creatures, assassins, ethereal beings)
  - **Absorbing**: Damage conversion, healing on hit, temporary HP gain (undead, constructs, magical beings)
  - **Negating**: Condition immunity, spell resistance, effect cancellation (magical creatures, divine beings)
  - **Environmental**: Terrain manipulation for protection, concealment, cover creation (earth elementals, druids)

**Quick Action Abilities**:
- **Reactive**: Triggered by enemy actions, often defensive (damage reduction, counterattacks, condition negation)
- **Proactive**: Used on creature's turn for tactical advantage (positioning, buffs, additional attacks)
- **Required for Elites**: At least one Quick Action ability (reactive or proactive)
- **Required for Lords**: At least one reactive AND one proactive Quick Action ability

**Defensive Ability Examples by Fighting Style**:
- **Heavy Infantry**: "Iron Will" - reduce incoming damage by 2 when using a shield
- **Agile Skirmisher**: "Evasive Maneuvers" - Quick Action to gain +4 Dodge against next attack
- **Spellcaster**: "Arcane Ward" - absorb spell damage and convert to temporary HP
- **Berserker**: "Battle Fury" - gain damage reduction when below half HP
- **Assassin**: "Shadow Step" - Quick Action to teleport and avoid attacks
- **Guardian**: "Protective Stance" - redirect attacks from allies to self

**Spell-like Abilities**:
- Innate spellcasting (once per scene per spell)
- Supernatural effects mimicking spells
- Aura effects affecting nearby creatures
- **CRITICAL**: When giving creatures spellcasting abilities, you MUST verify that all referenced spells actually exist in the game's spell lists
- **CRITICAL - Spell Rank Balance**: Creatures can only cast spells up to their relevant skill rank. Match spell ranks to the creature's actual skill level in Arcana/Mysticism
- **CRITICAL - Spellcasting Attributes**: Always use the correct attribute pairings for spellcasting:
  - **Arcane Magic**: Mind + Arcana (wizard, sorcerer, warlock magic)
  - **Mystic Magic**: Spirit + Mysticism (priest, cleric, paladin, druid, monk magic)
- **Arcane vs. Mystic Magic**:
  - **Arcane**: Wizard, Sorcerer, Warlock magic - raw magical power, elemental forces, illusions, enchantments
  - **Mystic**: Priest, Cleric, Paladin, Druid, Monk magic - divine power, nature magic, light/shadow, life/death
- Check the arcane spells list (docs/07-magic/02-arcane-spells.md) and mystic spells list (docs/07-magic/04-mystic-spells.md) for valid spell names
- Do not reference spells from other game systems (D&D, Pathfinder, etc.) that don't exist in Nexus RPG
- Use only spells that are thematically appropriate for the creature type and tier
- Match the magic type to the creature's nature: undead sorcerers use arcane, divine champions use mystic

**Utility Abilities**:
- Senses (blindsight, tremorsense, keen smell)
- Communication, shapeshifting
- Environmental manipulation

### Step 5: Apply Size Modifications

| Size | Modifier | Special Rules |
|------|----------|---------------|
| Tiny | -2 | Dodge focus, stealth bonuses |
| Small | -1 | Agility advantages |
| Medium | +0 | Standard rules |
| Large | +1 | Strength focus, harder to hit with ranged |
| Huge | +2 | Area control |
| Gargantuan | +3 | Fills entire area |
| Colossal | +4 | Fills multiple areas |

**Gargantuan/Colossal Combat Rules**:
- Creatures can't enter their areas without special means
- Adjacent areas count as close range
- Can be attacked from multiple directions

### Step 6: Add Immunities, Resistances, and Weaknesses

#### Common Immunity Sets
- **Undead**: bleeding, charmed, confused, deafened, frightened, poisoned, unconscious
- **Automatons**: bleeding, charmed, confused, frightened, poisoned, unconscious  
- **Spirits (Primordial)**: Varies by type (fire spirits immune to fire, etc.)
- **Plants**: deafened, blinded (for some)

#### Resistance/Weakness Guidelines
- **Resistances**: Half damage from specific types
- **Weaknesses**: Double damage from specific types  
- **Common damage types**: physical, fire, cold, lightning, necrotic, radiant, psychic

### Step 7: Validate and Balance

#### Mechanical Checklist
- [ ] HP appropriate for tier and category
- [ ] HP format correct for category (basic: "40", elite: "2×40", lord: "3×40")
- [ ] AV follows tier guidelines and creature type (bone/stone creatures typically use heavy armor)
- [ ] Defenses average to 6 + tier (Resist should rarely exceed 6 + tier + 2)
- [ ] Damage formula correctly applied (X/2X+base/3X+base)
- [ ] Ability TNs equal 6 + tier
- [ ] Skill ranks match tier expectations
- [ ] Number of attacks appropriate for category (Basic: 1-2, Elite: 2-3, Lord: 3-5)
- [ ] Number of abilities appropriate for category (Basic: 1-3, Elite: 2-4, Lord: 3-6)
- [ ] Elite creatures have mandatory Elite Trigger ability
- [ ] Lord creatures have mandatory Lord Trigger abilities
- [ ] Elite creatures start with 1 Resolve, Lords start with 3 Resolve
- [ ] Lord creatures get second round per turn at half Initiative
- [ ] Elite/Lord creatures have at least one defensive ability that fits their fighting style
- [ ] Elite creatures have at least one Quick Action ability (required)
- [ ] Lord creatures have at least one reactive Quick Action ability
- [ ] Lord creatures have at least one proactive Quick Action ability
- [ ] All conditions and spells referenced actually exist in the Nexus RPG rules
- [ ] Spellcasting creatures can only cast spells up to their relevant skill rank
- [ ] Spellcasting creatures use correct attribute pairings (Mind + Arcana for arcane, Spirit + Mysticism for mystic)
- [ ] If using tier adjustment for thematic reasons, ensure one stat is reduced while another is increased by the same amount
- [ ] Spellcasting abilities only reference spells that exist in the arcane or mystic spell lists
- [ ] All weapon properties, damage types, ranges, and conditions used are valid in the system

#### Thematic Checklist  
- [ ] Abilities reflect creature nature and role
- [ ] Stats support intended combat behavior
- [ ] Fits sword-and-sorcery ancient world aesthetic
- [ ] Provides interesting tactical challenge
- [ ] Immunities/resistances make thematic sense

#### Balance Checklist
- [ ] Single creature challenges one adventurer of same tier
- [ ] Elite/Lord scaling appropriate for group encounters  
- [ ] Elite Trigger abilities provide meaningful power increase without being overwhelming
- [ ] Lord Trigger abilities create dramatic combat phases
- [ ] Not trivially defeated by common tactics
- [ ] Abilities create interesting decisions for players
- [ ] Power level consistent within tier

## Common Mistakes to Avoid

### ❌ **Armor Value Errors**
- **Wrong**: Bone-based creature with light armor
- **Right**: Bone/stone creatures typically use heavy armor due to material density
- **Wrong**: High AV without balancing reduction elsewhere
- **Right**: When increasing AV above tier standard, reduce another stat equivalently

### ❌ **Resist Value Errors**
- **Wrong**: Resist values significantly above tier guidelines
- **Right**: Keep Resist within reasonable bounds (rarely above 6 + tier + 2)

### ❌ **Spell Rank Errors**
- **Wrong**: Creatures casting spells above their skill rank
- **Right**: Match spell ranks to actual skill levels in Arcana/Mysticism

### ❌ **Missing Trigger Abilities**
- Elite creatures MUST have an ability that triggers when first life pool depletes
- Lord creatures MUST have abilities that trigger when life pools are depleted
- These are not optional - they define the creature category

### ❌ **Incorrect Special Rules**
- **Wrong**: Including "Special Rules" or "Combat Notes" sections in stat blocks
- **Right**: Elite/Lord special rules are automatic based on creature category
- Elite creatures automatically start with 1 Resolve and get +1 boon on Morale
- Lord creatures automatically start with 3 Resolve, get second rounds, and don't roll Morale

### ❌ **Damage Calculation Errors**
- **Wrong**: 6/10/14 damage (using +4 for strong, +8 for critical)
- **Right**: 6/8/10 damage (base 4 + weapon 2, then +4, +6)

### ❌ **Undefined Conditions**
- Don't reference "cursed" or "drained" - these aren't official conditions
- Use specific mechanical effects: "+1 bane on all rolls" instead of vague curses

### ❌ **Inappropriate Immunities**  
- Undead shouldn't be immune to everything
- Living creatures shouldn't be immune to bleeding or unconscious
- Match immunities to creature type logic

### ❌ **Power Level Inconsistency**
- Tier 1 creatures shouldn't have Tier 4 abilities
- Elite/Lord bonuses should enhance, not completely change the creature
- Avoid single-use "I win" abilities

### ❌ **Unclear Ability Language**
- Specify exact conditions, durations, and save types
- Use consistent terminology from the core rules
- Include all mechanical details players need

## Example Creature Template

```markdown
### **[Creature Name]** ([Size] [Type])

**Tier:** X ([Category])

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| XX | XX | dX | dX | dX | dX  | XX    | XX    | XX     |

**Skills:** [Primary Skills] (X), [Secondary Skills] (X)

**Immunities:** [If any]
**Resistances:** [If any]  
**Weaknesses:** [If any]

**Attacks:**

- **[Attack Name]** (*properties*). X/Y/Z damage (base + weapon). [Additional effects].

**Abilities:**

- **[Ability Name].** [Clear mechanical description with TNs, durations, and effects].
```

## Example: Elite Creature with Proper Life Pool Format

### **Sand Viper Elite** (Medium Beast)

**Tier:** 4 (Elite)

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 2×40 | 4 | d8 | d10 | d8 | d6 | 10 | 12 | 8 |

**Skills:** Fighting (2), Stealth (3), Athletics (3)

**Attacks:**

- **Venomous Bite** (*pierce*). 5/7/9 damage (base 5 + weapon 2). Target makes Spirit + Fortitude vs TN 10 or becomes poisoned for short duration.

**Abilities:**

- **Elite Trigger - Desert Fury.** When the first life pool is depleted, the Sand Viper's rage awakens. Its Agility increases to d12 and it gains +2 weapon damage for the remainder of the scene.
- **Sand Camouflage.** While in sandy terrain, gains +2 boons on Stealth rolls and can move through sand as if it were water.
- **Serpentine Dodge (Quick Action, Reactive).** When targeted by an attack, the Sand Viper can twist away with serpentine grace. Roll Agility + Athletics vs. TN 10. On a success, gain +2 Dodge against the triggering attack. On a strong success, gain +4 Dodge. On a critical success, gain +6 Dodge and move to an adjacent area without provoking attacks.

## Final Notes

Remember that creature creation is both mechanical design and storytelling. Each creature should feel unique and interesting while adhering to the systematic framework that ensures balanced, playable encounters. When in doubt, err on the side of clarity and simplicity - players should immediately understand what a creature can do and how dangerous it is.

Always consider the creature's role in the larger world and how it might interact with adventurers beyond just combat encounters. The best creatures tell a story through their abilities and suggest interesting narrative possibilities for Game Masters.
