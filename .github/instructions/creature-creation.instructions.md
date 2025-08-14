# AI Agent Instructions: Creating Creatures for Nexus RPG

## Overview

You are tasked with creating balanced, thematic creatures for the Nexus RPG system. This guide provides the mechanical framework and design principles you must follow to ensure creatures integrate properly with the game's core systems.

## Core Creature Design Principles

### 1. **Tier-Based Power Scaling**
Creatures are designed for Tiers 0-10, corresponding to adventurer levels. A single creature of any Tier should provide a decent challenge for one adventurer of the same level.

### 2. **Thematic Integration**
All creatures must fit the sword-and-sorcery setting inspired by ancient civilizations. Consider:
- Historical cultural inspirations (Mesopotamian, Egyptian, Persian, etc.)
- Mythological creatures from ancient folklore
- How the creature fits into the world's ecology and societies

### 3. **Mechanical Clarity**
Every rule, ability, and stat must be unambiguous and immediately understandable.

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

## Creature Categories

### Basic Creatures
- **HP Modifier**: None
- **Wounds**: 1 (die immediately from injury)
- **Attacks**: 1-2
- **Abilities**: 1-3
- **Special Rules**: Must roll Morale, can't spend Resolve, can form troops

### Elite Creatures  
- **HP Modifier**: +10
- **Wounds**: 2 (regain all HP when taking first Wound)
- **Attacks**: 2-3
- **Abilities**: 2-4
- **Special Rules**: +1 boon on Morale rolls

### Lord Creatures
- **HP Modifier**: +20  
- **Wounds**: 3+ (equal to number of adventurers, min. 3)
- **Attacks**: 3-5
- **Abilities**: 3-6
- **Special Rules**: No Morale rolls, recover from conditions when Wounded, immune to repeated conditions after succeeding once

## Step-by-Step Creature Creation

### Step 1: Concept and Tier
1. **Define the creature's role** (infantry, ranged, brute, cavalry, artillery, spawner)
2. **Choose appropriate Tier** based on intended challenge level
3. **Select creature category** (Basic, Elite, or Lord)
4. **Determine size** (Tiny to Colossal) - affects stats and combat positioning

### Step 2: Calculate Base Statistics

#### Hit Points
- Start with base HP from tier table
- Add category modifier (+0/+10/+20)
- Adjust for size and concept (frail creatures -1 tier, sturdy creatures +1 tier)

#### Armor Value (AV)
- **Light armor**: Equal to creature's tier
- **Heavy armor**: Double the creature's tier  
- **Size adjustments**: Larger creatures +1 tier AV, smaller creatures -1 tier AV

#### Defenses (Parry/Dodge/Resist)
- **Base**: 6 + creature's tier for all three
- **Balance adjustments**: Can raise/lower individual defenses within 2 tiers of base
- **Size effects**: 
  - Large/Huge: Parry +1-2 tiers, Dodge -1-2 tiers
  - Small/Tiny: Dodge +1-2 tiers, Parry -1-2 tiers

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

#### Thematic Abilities
Create 1-6 abilities based on creature category:

**Movement Abilities**:
- Flying, swimming, burrowing, climbing
- Teleportation, phasing, invisibility

**Combat Abilities**:
- Multi-attacks, area attacks, grappling
- Damage resistance, condition immunity
- Retaliation effects, reactive abilities

**Spell-like Abilities**:
- Innate spellcasting (once per scene per spell)
- Supernatural effects mimicking spells
- Aura effects affecting nearby creatures

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
- **Constructs**: bleeding, charmed, confused, frightened, poisoned, unconscious  
- **Elementals**: Varies by type (fire elementals immune to fire, etc.)
- **Plants**: deafened, blinded (for some)

#### Resistance/Weakness Guidelines
- **Resistances**: Half damage from specific types
- **Weaknesses**: Double damage from specific types  
- **Common damage types**: physical, fire, cold, lightning, necrotic, radiant, psychic

### Step 7: Validate and Balance

#### Mechanical Checklist
- [ ] HP appropriate for tier and category
- [ ] AV follows tier guidelines
- [ ] Defenses average to 6 + tier
- [ ] Damage formula correctly applied (X/2X+base/3X+base)
- [ ] Ability TNs equal 6 + tier
- [ ] Skill ranks match tier expectations
- [ ] All conditions and spells referenced actually exist

#### Thematic Checklist  
- [ ] Abilities reflect creature nature and role
- [ ] Stats support intended combat behavior
- [ ] Fits sword-and-sorcery ancient world aesthetic
- [ ] Provides interesting tactical challenge
- [ ] Immunities/resistances make thematic sense

#### Balance Checklist
- [ ] Single creature challenges one adventurer of same tier
- [ ] Elite/Lord scaling appropriate for group encounters  
- [ ] Not trivially defeated by common tactics
- [ ] Abilities create interesting decisions for players
- [ ] Power level consistent within tier

## Common Mistakes to Avoid

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

## Final Notes

Remember that creature creation is both mechanical design and storytelling. Each creature should feel unique and interesting while adhering to the systematic framework that ensures balanced, playable encounters. When in doubt, err on the side of clarity and simplicity - players should immediately understand what a creature can do and how dangerous it is.

Always consider the creature's role in the larger world and how it might interact with adventurers beyond just combat encounters. The best creatures tell a story through their abilities and suggest interesting narrative possibilities for Game Masters.
