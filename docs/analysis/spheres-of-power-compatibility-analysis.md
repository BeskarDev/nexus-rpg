# Spheres of Power Compatibility Analysis for Nexus RPG

**Document Purpose**: Systematic analysis comparing Nexus RPG's magic system with the Spheres of Power approach, with a comprehensive proposal for implementing a spheres-style aspect combination system suitable for internal design and GM homebrew guidance.

**Date**: 2026-02-10  
**Status**: Design Proposal

---

## Executive Summary

This document analyzes the compatibility between Nexus RPG's existing magic system and the "Spheres of Power" modular approach to spell construction. While Nexus RPG uses pre-defined spells within thematic traditions/disciplines, Spheres of Power uses combinatorial building blocks (talents) to construct spell effects on-the-fly. 

**Key Finding**: Nexus RPG's existing **aspects system** within traditions/disciplines already provides a foundation for spheres-style design. The proposal extends this into a **formal aspect combination framework** that can guide both spell creation and GM homebrewing while maintaining Nexus RPG's bounded power level and tactical clarity.

---

## 1. System Comparison Analysis

### 1.1 Nexus RPG Magic System Structure

#### Core Architecture
- **Two Schools**: Arcana (Mind-based) vs. Mysticism (Spirit-based)
- **14 Total Categories**: 6 Arcane Disciplines + 8 Mystic Traditions
- **Power Source**: Mental transgression (Arcana) vs. spiritual reverence (Mysticism)
- **Spell Access**: Pre-defined spell lists, learned through talents
- **Casting Mechanics**: Attribute + Skill vs. TN, Focus cost, Success Level scaling

#### Organizational Framework

**Arcane Disciplines** (6):
1. **Evocation** - *fire, frost, lightning, acid, blast* → Raw elemental offense
2. **Illusion** - *deception, misdirection, hallucinations* → Sensory manipulation
3. **Conjuration** - *summoning, teleportation, creation* → Object/creature manifestation
4. **Telepathy** - *mind control, influence, domination* → Mental violation
5. **Telekinetics** - *movement, levitation, gravity* → Force manipulation
6. **Necromancy** - *decay, undeath, siphoning* → Life/death manipulation

**Mystic Traditions** (8):
1. **Light** - *sun, illumination, truth, clarity, judgement*
2. **Twilight** - *moon, dreams, secrets, fate, illusion*
3. **Life** - *vitality, blessings, community, hope, fertility*
4. **Death** - *plagues, curses, fear, decay, ancestry*
5. **Nature** - *earth, water, animals, plants*
6. **Tempest** - *hurricanes, earthquakes, thunderstorms, sandstorms, floods*
7. **Peace** - *calmness, protection, selflessness, travel, law*
8. **War** - *fury, pride, blood, justice, triumph*

#### Aspect System
Each tradition/discipline already includes **aspect keywords** (shown in italics above) that:
- Define thematic boundaries for spell creation
- Guide flavor and mechanical implementation
- Provide design constraints for balanced spell construction
- Appear in spell descriptions to reinforce identity

#### Role Distribution
Each tradition/discipline has defined role focuses:
- **Excels** (1): Primary strength
- **Decent** (2): Secondary capabilities
- **Weak** (3): Rare/ineffective applications

**Example - Evocation**:
- Excels: Offense
- Decent: Control, Defense
- Weak: Healing, Support, Utility

### 1.2 Spheres of Power System Structure

#### Core Architecture
- **Modular Spheres**: 20+ thematic spheres (Destruction, Creation, Nature, Mind, etc.)
- **Talent-Based**: Players acquire talents within spheres to customize abilities
- **Combinatorial Design**: Effects built from component parts (e.g., Blast Type + Blast Shape)
- **Spell Points**: Resource pool for powering advanced effects; basic abilities often at-will
- **Flexible Casting**: Effects constructed at casting time from available talents

#### Destruction Sphere Example
The clearest example of modular combination:

**Blast Types** (damage/effect):
- Fire Blast, Frost Blast, Shock Blast, Force Blast, Acid Blast
- Stone Blast, Thunder Blast, Light Blast, Negative Blast
- Each type has unique damage and side effects

**Blast Shapes** (delivery method):
- Ray (single-target line)
- Explosive Orb (area burst)
- Energy Strike (melee attack)
- Chain Blast (multiple targets)
- Line, Cone, Wall, Aura, Trap

**Combination Rule**: One Blast Type + One Blast Shape = Complete Attack
- Example: Fire Blast + Explosive Orb = Fireball effect
- Example: Frost Blast + Ray = Ice beam single-target attack

**Advanced Talents**: Modify the base combination with additional effects, range increases, split attacks, etc.

### 1.3 Comparative Analysis

| Aspect | Nexus RPG | Spheres of Power |
|--------|-----------|------------------|
| **Spell Construction** | Pre-defined spells with fixed effects | On-the-fly combination from talents |
| **Thematic Organization** | Traditions/Disciplines with aspects | Spheres with talent trees |
| **Power Scaling** | Spell Rank 0-5 (bounded mortal peak) | Spell Points + talent improvements |
| **Casting Predictability** | Players know exact spell effects | Effects vary based on talent combos |
| **Design Complexity** | Moderate - curated spell lists | High - combinatorial explosion |
| **GM Prep Burden** | Low - pre-defined spells | Moderate - need to understand combos |
| **Player Creativity** | Limited to spell selection | High - freeform combinations |
| **Balance Control** | Tight - each spell individually tested | Challenging - emergent interactions |
| **Flavor Consistency** | Strong - aspects guide each spell | Dependent on talent selection |

---

## 2. Compatibility Assessment

### 2.1 Overlaps and Synergies

#### ✅ Existing Aspect Keywords
Nexus RPG **already uses aspect-based design** for spell creation:
- Each tradition/discipline lists 4-8 aspects (e.g., *fire, frost, lightning* for Evocation)
- Spell creation instructions require incorporating 1-3 aspects per spell
- Aspects provide thematic coherence similar to sphere identities

#### ✅ Role-Based Design
Both systems categorize magic by **tactical function**:
- Nexus: Offense, Defense, Healing, Control, Support, Utility
- Spheres: Varies by sphere but similar combat/utility/social categorization

#### ✅ Modular Spell Properties
Nexus RPG has **11 spell properties** that can be combined:
- `blast (cone)`, `blast (line)`, `concentrate`, `enchant`, `illusory`, `material`, `quick`, `ritual`, `singular`
- These function similarly to Spheres' shape modifiers

#### ✅ Success Level Scaling
Nexus spells scale with **Success Levels** (Weak/Strong/Critical):
- Provides built-in power variance without needing separate talents
- Similar to Spheres' heightened effects or spell point expenditure

### 2.2 Limitations and Challenges

#### ❌ Fixed Spell Lists vs. Combinatorial Freedom
- **Nexus**: 176 pre-defined spells (73 arcane, 103 mystic)
- **Spheres**: Infinitely combinable effects from talent selections
- **Impact**: Nexus prioritizes balance and GM predictability over player creativity

#### ❌ Power Ceiling Differences
- **Nexus**: Rank 5 = mortal peak (≈D&D 7th level)
- **Spheres**: Can scale to high-level Pathfinder/5e power
- **Impact**: Direct port would break Nexus' bounded power philosophy

#### ❌ Casting Time Differences
- **Nexus**: Spells cast as Actions with fixed effects
- **Spheres**: Many sphere abilities at-will with spell point costs for enhancement
- **Impact**: Would require significant mechanical rework

#### ❌ Focus vs. Spell Points
- **Nexus**: Focus pool (limited daily resource, requires rest to recover)
- **Spheres**: Spell Points (larger pool, more granular spending)
- **Impact**: Different resource economy philosophies

### 2.3 Opportunities for Adaptation

#### 🔶 Aspect Combination Framework
Nexus RPG could formalize **aspect combinations** as a design tool:
- Use existing aspect keywords as building blocks
- Create guidelines for combining 2-3 aspects per spell
- Maintain pre-defined spells but provide clearer homebrew structure

#### 🔶 Metamagic Arts Expansion
Existing **Metamagic Arts** (14 modifications) function like Spheres talents:
- Could expand to include more "shape" modifiers (e.g., Chain, Trap, Wall)
- Provide systematic spell modification without full combinatorial freedom

#### 🔶 GM Homebrew Guidelines
Create structured tools for GMs to **design custom spells** using:
- Aspect selection (choose 1-3 from tradition/discipline)
- Effect type (damage, condition, utility)
- Delivery method (single-target, AoE, blast shape)
- Power level (match to spell rank)

#### 🔶 Expanded Spell Properties
Add more **delivery method properties**:
- `blast (chain)` - bounces between targets
- `blast (wall)` - creates barrier
- `blast (aura)` - centered on caster
- Functions like Spheres' shape talents but remains a property

---

## 3. Proposed Aspect Combination Framework

### 3.1 Design Philosophy

**Goal**: Provide a **structured, extensible magic system** that:
1. Maintains Nexus RPG's pre-defined spell approach for balance
2. Empowers GMs to create custom spells with clear guidelines
3. Uses aspect combinations to ensure thematic consistency
4. Supports all six tactical roles (not just damage)
5. Preserves bounded power ceiling (Rank 5 = mortal peak)

**Non-Goal**: Not attempting to port Spheres of Power's full combinatorial freedom or power scaling.

### 3.2 Core Components

The proposed framework has **four primary components**:

#### Component 1: Aspect Pools
Formal lists of aspects for each tradition/discipline (already exist, formalized below).

#### Component 2: Effect Templates
Generic mechanical frameworks that aspects plug into (damage, buff, debuff, summon, etc.).

#### Component 3: Delivery Methods
How the effect reaches targets (single-target, AoE shapes, enchantments, zones).

#### Component 4: Rank Scaling
Power level appropriate to spell rank (0-5), respecting bounded ceiling.

### 3.3 Aspect Pools (Formalized)

#### Arcane Disciplines

**Evocation**:
- **Primary Aspects**: fire, frost, lightning, acid, blast
- **Secondary Aspects**: elemental-barrier, burning, chilling, shocking, corroding, concussive
- **Tertiary Aspects**: ward, immunity, absorption

**Illusion**:
- **Primary Aspects**: trickery, misdirection, obfuscation, hallucination, distortion
- **Secondary Aspects**: invisibility, disguise, phantom, false-terrain, confusion
- **Tertiary Aspects**: mental-defense, sensory-enhancement, truth-revelation

**Conjuration**:
- **Primary Aspects**: summoning, creation, teleportation, binding, force
- **Secondary Aspects**: creature, object, extradimensional, portal, anchor
- **Tertiary Aspects**: dismissal, imprisonment, planar

**Telepathy**:
- **Primary Aspects**: mind-reading, mental-command, charm, domination, memory
- **Secondary Aspects**: influence, communication, insight, compulsion, suggestion
- **Tertiary Aspects**: psychic-defense, mental-link, thought-projection

**Telekinetics**:
- **Primary Aspects**: movement, levitation, force-barrier, crushing, gravity
- **Secondary Aspects**: push, pull, hold, fly, weight-manipulation
- **Tertiary Aspects**: momentum, acceleration, orbital

**Necromancy**:
- **Primary Aspects**: decay, undeath, life-drain, corpse-animation, defilement
- **Secondary Aspects**: aging, withering, puppetry, death-speak, curse
- **Tertiary Aspects**: soul-capture, resurrection, phylactery

#### Mystic Traditions

**Light**:
- **Primary Aspects**: sun, illumination, truth, clarity, judgement
- **Secondary Aspects**: revelation, purification, anti-undead, guidance, radiance
- **Tertiary Aspects**: prophecy, blessing, consecration

**Twilight**:
- **Primary Aspects**: moon, dreams, secrets, fate, illusion
- **Secondary Aspects**: sleep, prophecy, shadow, transformation, destiny
- **Tertiary Aspects**: nightmare, divination, balance

**Life**:
- **Primary Aspects**: vitality, healing, blessing, growth, fertility
- **Secondary Aspects**: restoration, cure-disease, strengthen-bonds, hope, community
- **Tertiary Aspects**: regeneration, renewal, birth

**Death**:
- **Primary Aspects**: plague, curse, fear, decay, ancestry
- **Secondary Aspects**: disease, wither, dread, decomposition, ancestral-communion
- **Tertiary Aspects**: ending, mourning, inheritance

**Nature**:
- **Primary Aspects**: earth, water, animals, plants, weather
- **Secondary Aspects**: terrain, beast-communication, growth, adaptation, natural-hazard
- **Tertiary Aspects**: ecosystem, symbiosis, primal-force

**Tempest**:
- **Primary Aspects**: hurricane, earthquake, thunderstorm, sandstorm, flood
- **Secondary Aspects**: lightning-strike, wind, tremor, deluge, storm-summoning
- **Tertiary Aspects**: cataclysm, elemental-fury, atmospheric-pressure

**Peace**:
- **Primary Aspects**: calm, protection, sanctuary, safe-travel, law
- **Secondary Aspects**: emotion-control, ward, refuge, journey-blessing, oath
- **Tertiary Aspects**: truce, asylum, covenant

**War**:
- **Primary Aspects**: fury, weapon-blessing, battle-cry, blood-magic, triumph
- **Secondary Aspects**: combat-rage, martial-prowess, tactical-advantage, honorable-wound, victory
- **Tertiary Aspects**: duel, champion, glory

### 3.4 Effect Templates

Effect templates are **generic mechanical frameworks** that aspects customize:

#### Template 1: Direct Damage
**Structure**: `[Aspect Type] + [Delivery Method] → [Damage + Condition]`

**Generic Formula**:
```
Weak: +[Rank×2] [damage-type] damage
Strong: +[Rank×4] [damage-type] damage + [condition]
Critical: +[Rank×6] [damage-type] damage + [enhanced condition]
```

**Example - Evocation Fire**:
- Aspect: *fire*
- Delivery: Single-target ray
- Result: Fire damage with burning condition
- Spell: Flickering Flame (Rank 0)

**Example - Tempest Lightning**:
- Aspect: *lightning-strike*
- Delivery: Blast (line)
- Result: Lightning damage with stunned condition
- Spell: Lightning Bolt (Rank 3)

#### Template 2: Buff/Enchantment
**Structure**: `[Aspect Effect] + [Target] + [Duration] → [Bonus + Special]`

**Generic Formula**:
```
Weak: +1 to [attribute/skill/damage]
Strong: +2 to [attribute/skill/damage]
Critical: +3 to [attribute/skill/damage] + [condition immunity]
```

**Example - War Weapon Blessing**:
- Aspect: *weapon-blessing*
- Target: Touch (weapon)
- Result: +damage, condition on hit
- Spell: Radiant Weapon (Rank 1)

**Example - Life Vitality**:
- Aspect: *vitality*
- Target: Touch (creature)
- Result: Temporary HP, condition resistance
- Spell: Blessing of Vitality (Rank 2)

#### Template 3: Debuff/Condition
**Structure**: `[Aspect Effect] + [Delivery Method] + [Save Type] → [Condition + Duration]`

**Generic Formula**:
```
Weak: [Minor condition] for briefly
Strong: [Major condition] for short
Critical: [Severe condition] for medium
```

**Example - Telepathy Charm**:
- Aspect: *charm*
- Delivery: Single-target vs. Resist
- Result: Charmed condition, mental influence
- Spell: Charm Person (Rank 1)

**Example - Death Curse**:
- Aspect: *curse*
- Delivery: Touch vs. Resist
- Result: Cursed condition, -1 bane on rolls
- Spell: Hex (Rank 1)

#### Template 4: Summoning/Creation
**Structure**: `[Aspect Type] + [Summoned Entity] + [Duration] → [Creature/Object]`

**Generic Formula**:
```
Weak: Tier [Rank-1] creature, 1 summoned, short duration
Strong: Tier [Rank] creature, 1-2 summoned, medium duration
Critical: Tier [Rank+1] creature, 2-3 summoned, medium duration
```

**Example - Conjuration Creature**:
- Aspect: *summoning, creature*
- Entity: Elemental or beast
- Result: Summoned ally for duration
- Spell: Summon Lesser Elemental (Rank 2)

**Example - Nature Animal**:
- Aspect: *animals*
- Entity: Natural beast appropriate to environment
- Result: Animal companion or swarm
- Spell: Summon Animal Ally (Rank 1)

#### Template 5: Zone/Area Control
**Structure**: `[Aspect Effect] + [Area Size] + [Duration] → [Zone Effect]`

**Generic Formula**:
```
Weak: Melee area, short duration, [minor effect]
Strong: Close area, medium duration, [moderate effect]
Critical: Short area, medium duration, [major effect]
```

**Example - Evocation Fire Zone**:
- Aspect: *fire, barrier*
- Area: Close area wall
- Result: Wall of fire blocking passage, damage on crossing
- Spell: Wall of Fire (Rank 3)

**Example - Peace Sanctuary**:
- Aspect: *sanctuary, protection*
- Area: Short area centered on location
- Result: Zone preventing hostile actions
- Spell: Sanctuary (Rank 2)

#### Template 6: Utility/Exploration
**Structure**: `[Aspect Function] + [Target/Range] + [Duration] → [Non-combat Effect]`

**Generic Formula**:
```
Varies widely - focus on narrative/exploration value
```

**Example - Light Revelation**:
- Aspect: *truth, revelation*
- Function: Detect lies, reveal invisibility
- Result: Information gathering
- Spell: Detect Lies (Rank 0)

**Example - Twilight Dreams**:
- Aspect: *dreams, prophecy*
- Function: Send/receive dream messages
- Result: Long-range communication
- Spell: Dream Message (Rank 2)

### 3.5 Delivery Methods (Expanded)

Expand the existing spell properties to include more delivery options:

#### Existing Properties (from Nexus RPG)
- `blast (cone)` - Conical area effect
- `blast (line)` - Line area effect
- `concentrate` - Requires ongoing concentration
- `enchant (X)` - Temporary enchantment on person/equipment
- `illusory` - False sensory information
- `quick` - Cast as Quick Action
- `ritual (X)` - Extended casting time
- `singular` - Only one instance active

#### Proposed Additional Properties

**Delivery Shapes**:
- `blast (chain)` - Bounces between up to [Rank+1] targets in range
  - Example: "Chain Lightning - affects 1/2/3 targets based on success"
  
- `blast (wall)` - Creates a barrier in a line between two points
  - Example: "Wall of Fire - blocks passage, damages on crossing"
  
- `blast (burst)` - Centered on a point, affects area around it
  - Example: "Fireball - explodes at target location"
  
- `blast (aura)` - Centered on caster, moves with them
  - Example: "Aura of Protection - follows caster"

**Effect Modifiers**:
- `split` - Can divide effect between multiple targets at reduced power
  - Example: "Split enchantment across 2 weapons at half bonus each"
  
- `persistent` - Creates lasting zone or object
  - Example: "Persistent fog, remains until dispersed"
  
- `triggered` - Effect activates on specific condition
  - Example: "Glyph of Warding - triggers when creature approaches"

### 3.6 Rank Scaling Guidelines

Maintain Nexus RPG's bounded power ceiling:

| Rank | Focus Cost | Power Level | Aspect Complexity | Example Effects |
|------|------------|-------------|-------------------|-----------------|
| 0 | 0 | Cantrips | 1 primary aspect | +2/4/6 damage, minor utility |
| 1 | 2 | Basic | 1-2 aspects | +4/8/12 damage, single condition, simple buff |
| 2 | 4 | Moderate | 1-2 aspects | +6/12/18 damage, AoE effects, summon Tier 1 |
| 3 | 6 | High | 2 aspects | +8/16/24 damage, significant zones, summon Tier 2-3 |
| 4 | 8 | Very High | 2-3 aspects | +10/20/30 damage, powerful buffs, summon Tier 3-4 |
| 5 | 10 | Peak Mortal | 2-3 aspects | +12/24/36 damage, reality-bending utility, summon Tier 4-5 |

**Key Constraint**: Rank 5 is the absolute peak of mortal magic, equivalent to D&D 7th level spells, NOT 9th level.

### 3.7 Combination Rules

**Rule 1: Primary Aspect Required**
Every spell must include at least one **primary aspect** from its tradition/discipline.

**Rule 2: Maximum Three Aspects**
No spell should combine more than three aspects total (maintains thematic clarity).

**Rule 3: Effect Template Match**
Spell must use one of the six effect templates (damage, buff, debuff, summon, zone, utility).

**Rule 4: Delivery Method Consistency**
Choose one delivery method property (can't be both `blast (cone)` and `blast (line)`).

**Rule 5: Role Alignment**
Spell should align with tradition/discipline's Excels or Decent roles (avoid Weak roles).

**Rule 6: Rank-Appropriate Power**
Total spell power must match rank scaling guidelines (no Rank 1 spells with Rank 5 effects).

---

## 4. Implementation Proposal

### 4.1 Three-Tier Implementation

#### Tier 1: Internal Design Tool (Immediate)
Use aspect combination framework to **guide spell creation** for core spell lists:
- Checklist for spell designers: "Does this spell use 1-3 appropriate aspects?"
- Quality control: "Does the aspect combination match the tradition/discipline identity?"
- Gap analysis: "What aspect combinations are missing from our spell list?"

**Implementation Steps**:
1. Add formal aspect pools to spell creation instructions
2. Create effect template library with examples
3. Update spell creation checklist with combination rules
4. Audit existing spells against framework

#### Tier 2: GM Homebrew Guidelines (Short-term)
Create **GM-facing documentation** for custom spell design:
- "How to Build a Spell" guide using aspect combination
- Worked examples showing aspect → effect template → delivery → final spell
- Power level calculator ensuring rank-appropriate effects
- Troubleshooting guide for common balance pitfalls

**Implementation Steps**:
1. Write comprehensive GM guide document
2. Include 10+ worked examples across all traditions/disciplines
3. Create spell power calculator tool or table
4. Provide conversion guide for adapting spells from other systems

#### Tier 3: Player-Facing Options (Long-term, Optional)
Introduce **optional rules** for players to customize spells:
- "Spell Variants" - alternate delivery methods for existing spells
- "Metamagic Arts Expansion" - more spell modifiers mimicking Spheres talents
- "Custom Spell Crafting" - player/GM collaboration to design unique signature spells

**Implementation Steps**:
1. Design variant spell system (choose different delivery for known spell)
2. Expand Metamagic Arts with new modifiers
3. Create player spell crafting rules with GM approval requirement
4. Balance test new options against existing spells

### 4.2 Documentation Structure

Proposed new documents:

#### `/docs/analysis/spheres-of-power-compatibility-analysis.md` (This Document)
Comprehensive analysis and proposal.

#### `/.github/instructions/aspect-combination-framework.instructions.md`
AI agent instructions for using aspect combinations in spell design.

#### `/docs/gm-resources/homebrew-spell-creation-guide.md`
GM-facing guide with step-by-step instructions and examples.

#### `/docs/gm-resources/effect-template-library.md`
Library of effect templates with mechanical formulas.

#### `/docs/gm-resources/spell-power-calculator.md`
Tables and formulas for ensuring rank-appropriate spell power.

### 4.3 Sample GM Homebrew Workflow

**Example**: GM wants to create a custom Tempest spell for a storm-themed boss.

**Step 1: Choose Tradition/Discipline**
- Tradition: Tempest (Mystic)
- Primary Role: Offense

**Step 2: Select Aspects (1-3)**
- Primary: *thunderstorm*
- Secondary: *lightning-strike*
- Tertiary: (none needed)

**Step 3: Choose Effect Template**
- Template: Direct Damage + Zone Control hybrid

**Step 4: Select Delivery Method**
- Property: `blast (burst)` (area effect)
- Additional: `persistent` (zone remains)

**Step 5: Determine Rank**
- Desired Power: High (suitable for boss)
- Chosen Rank: 4

**Step 6: Apply Formulas**
- Base Damage: Rank 4 AoE = +8/16/24 lightning damage
- Zone Effect: Short area storm, medium duration
- Additional: Lightning strikes random target each round (GM determines)

**Step 7: Write Spell**

---

### **Thunderstorm** (*tempest*, Rank 4)
**Properties:** blast (burst), persistent, concentrate

**Effect**
You call down a furious storm centered on a point in long range. Dark clouds gather and lightning crackles.
**Weak.** Deal +8 lightning damage to all creatures in the area. The storm persists for medium duration, creating a short area zone of difficult terrain with heavy rain and wind.
**Strong.** Deal +16 lightning damage to all creatures in the area. The storm persists, and on each of your subsequent turns, lightning strikes a random creature in the zone for +4 lightning damage (no roll).
**Critical.** Deal +24 lightning damage to all creatures in the area. The storm persists, and on each of your subsequent turns, you can direct a lightning strike at a chosen creature in the zone for +8 lightning damage (no roll).

While you concentrate on this spell, you can use a Quick Action to move the storm up to short range per turn.

---

**Step 8: Validate**
- ✅ Uses 2 appropriate Tempest aspects
- ✅ Aligns with Offense (Excels) role
- ✅ Rank 4 damage matches scaling guidelines (+8/16/24 for AoE)
- ✅ Delivery method (burst + persistent) is consistent
- ✅ Power level appropriate (strong but not Rank 5)
- ✅ Has clear counterplay (can leave the zone, break concentration)

---

## 5. Design Examples

### 5.1 Pure Damage Spell (Evocation + Fire + Lightning)

**Aspects**: *fire*, *lightning*  
**Template**: Direct Damage  
**Delivery**: `blast (chain)`  
**Rank**: 3

---

### **Elemental Chain** (*evocation*, Rank 3)
**Properties:** blast (chain)

**Effect**
You unleash a bolt of crackling energy that leaps between foes, alternating between searing fire and shocking electricity.
**Weak.** Deal +8 fire damage to the initial target, then +4 lightning damage to one creature in close range of them, then +4 fire damage to one creature in close range of the second target.
**Strong.** Deal +16 fire damage to the initial target, then +8 lightning damage to one creature in close range of them, then +8 fire damage to one creature in close range of the second target. Each target hit by lightning is briefly staggered.
**Critical.** Deal +24 fire damage to the initial target, then +12 lightning damage to one creature in close range of them, then +12 fire damage to one creature in close range of the second target. Lightning targets are briefly stunned, fire targets suffer burning (4).

---

### 5.2 Defensive Spell (Peace + Protection + Sanctuary)

**Aspects**: *protection*, *sanctuary*  
**Template**: Zone Control + Buff  
**Delivery**: `blast (aura)`, `concentrate`  
**Rank**: 2

---

### **Circle of Sanctuary** (*peace*, Rank 2)
**Properties:** blast (aura), concentrate

**Effect**
You invoke a protective circle around yourself, blessing the ground with the power of sanctuary.
**Weak.** Create a close area zone centered on you. Allies within the zone gain +1 AV and +1 boon on Resist rolls. The zone moves with you and lasts while you concentrate (maximum medium duration).
**Strong.** As weak, but allies also gain resistance to psychic damage and cannot be forcibly moved out of the zone.
**Critical.** As strong, but the zone also deflects hostile magic. When a hostile spell targets a creature in the zone, the caster suffers +1 bane on the casting roll.

---

### 5.3 Utility Spell (Twilight + Dreams + Secrets)

**Aspects**: *dreams*, *secrets*  
**Template**: Utility/Communication  
**Delivery**: `ritual (hours)`  
**Rank**: 2

---

### **Dream Council** (*twilight*, Rank 2)
**Properties:** ritual (hours), concentrate

**Effect**
You enter a trance and project your consciousness into the dream realm, where you can contact and communicate with others across vast distances.
**Weak.** You can send a dream message to one creature you know, regardless of distance (but they must be on the same plane). The message can be up to one minute of speech. The target receives the message when they next sleep.
**Strong.** You can hold a two-way conversation in the dream realm with up to three creatures you know. All participants must be asleep. The dream conference can last up to one hour.
**Critical.** As strong, but you can also share visual memories and emotions. Additionally, you can observe the dreams of willing participants, potentially gaining insight into their subconscious concerns (GM determines what you learn).

---

### 5.4 Support Spell (Life + Blessing + Community)

**Aspects**: *blessing*, *community*  
**Template**: Buff (Multi-target)  
**Delivery**: Touch (multiple targets)  
**Rank**: 1

---

### **Communal Blessing** (*life*, Rank 1)
**Properties:** -

**Effect**
You invoke the blessings of life and community, touching allies to strengthen their bonds and bolster their spirits.
**Weak.** Touch up to three willing creatures in melee range. Each gains +1 boon on their next roll within short duration.
**Strong.** As weak, but allies also gain temporary hit points equal to your spell power (½ Spirit).
**Critical.** As strong, but allies also gain +1 boon on all rolls for short duration (not just the next roll).

---

### 5.5 Control Spell (Telepathy + Domination + Mental-Command)

**Aspects**: *domination*, *mental-command*  
**Template**: Debuff/Condition  
**Delivery**: vs. Resist (single-target)  
**Rank**: 4

---

### **Puppet Master** (*telepathy*, Rank 4)
**Properties:** concentrate, singular

**Effect**
You seize control of a creature's mind, forcing them to obey your mental commands like a puppet on strings.
**Weak.** Target makes Spirit + Fortitude vs. your Resist. On a failure, the target is dominated (charmed and you can issue mental commands) for briefly while you concentrate.
**Strong.** As weak, but the target is dominated for short duration. You can use a Quick Action on your turns to issue a new command.
**Critical.** As strong, but the target is dominated for medium duration. Additionally, you can see through the target's eyes and hear through their ears as a Quick Action.

While dominated, the target obeys commands but can resist actions that would cause obvious harm to themselves (GM discretion). If the target takes damage, they can immediately attempt a new save to break free.

---

### 5.6 Summoning Spell (Conjuration + Creature + Binding)

**Aspects**: *summoning*, *creature*, *binding*  
**Template**: Summoning  
**Delivery**: Medium range, summon point  
**Rank**: 3

---

### **Summon Bound Elemental** (*conjuration*, Rank 3)
**Properties:** concentrate

**Effect**
You tear open a rift to the elemental planes and forcibly summon a creature of raw elemental power, binding it to your will.
**Weak.** Summon one Tier 2 elemental (choose fire, water, earth, or air) in medium range. It obeys your mental commands for short duration while you concentrate.
**Strong.** Summon one Tier 3 elemental or two Tier 2 elementals. They obey your mental commands for medium duration while you concentrate.
**Critical.** Summon one Tier 4 elemental, two Tier 3 elementals, or three Tier 2 elementals. They obey your mental commands for medium duration while you concentrate. Additionally, when the spell ends, you can choose to banish them back to their home plane (preventing hostile retaliation).

Summoned elementals act on your initiative and follow simple commands. If your concentration breaks, they immediately turn hostile.

---

## 6. Benefits of the Proposed System

### 6.1 For Spell Designers (AI Agents)

✅ **Clear Design Framework**: Aspect combinations provide systematic guidance  
✅ **Consistency Checking**: Easy to verify spells align with tradition/discipline identity  
✅ **Gap Identification**: Spot missing aspect combinations in spell lists  
✅ **Balance Tools**: Templates ensure rank-appropriate power levels  
✅ **Extensibility**: Easy to add new aspects or templates without breaking existing spells  

### 6.2 For Game Masters

✅ **Homebrew Confidence**: Clear rules for creating balanced custom spells  
✅ **Player Requests**: Can evaluate proposed custom spells against framework  
✅ **NPC Spellcasters**: Quick spell design for villains and unique encounters  
✅ **Setting Flavor**: Can create culture-specific spell variants using aspect combinations  
✅ **Adaptation Guide**: Convert spells from other systems using templates  

### 6.3 For Players (If Tier 3 Implemented)

✅ **Spell Customization**: Variants and metamagic for personalization  
✅ **Character Identity**: Signature custom spells with GM approval  
✅ **Tactical Options**: More ways to solve problems with flexible spell use  
✅ **System Mastery**: Deep understanding of magic system through combination rules  

### 6.4 For System Design

✅ **Maintains Balance**: Pre-defined spells ensure thorough playtesting  
✅ **Preserves Theme**: Aspect requirements keep spells feeling consistent  
✅ **Scalable Content**: Easy to add new spells systematically  
✅ **Clear Boundaries**: Rank scaling prevents power creep  
✅ **Spheres-Inspired**: Captures modular spirit without full complexity  

---

## 7. Implementation Roadmap

### Phase 1: Internal Design Tool (Week 1-2)
- [ ] Formalize aspect pools in spell creation instructions
- [ ] Create effect template library document
- [ ] Update spell creation checklist with combination rules
- [ ] Audit 10 sample spells against framework
- [ ] Document findings and refine templates

### Phase 2: GM Homebrew Guide (Week 3-4)
- [ ] Write comprehensive GM homebrew spell creation guide
- [ ] Create 10+ worked examples across all traditions/disciplines
- [ ] Design spell power calculator tables
- [ ] Develop troubleshooting guide for common issues
- [ ] Include conversion guidelines from other systems

### Phase 3: Documentation Integration (Week 5-6)
- [ ] Integrate aspect combination framework into existing docs
- [ ] Create visual diagrams showing aspect → template → spell flow
- [ ] Add GM resources section to documentation site
- [ ] Provide printable reference sheets for GMs
- [ ] Create example spell anthology showing framework in action

### Phase 4: Testing and Refinement (Week 7-8)
- [ ] Internal testing of GM homebrew guidelines
- [ ] Create 20+ sample spells using framework
- [ ] Validate against existing spell balance
- [ ] Gather feedback from playtest GMs
- [ ] Refine templates and guidelines based on feedback

### Phase 5: Optional Player Options (Week 9-12, Optional)
- [ ] Design spell variant system
- [ ] Expand Metamagic Arts
- [ ] Create player spell crafting rules
- [ ] Balance test player options
- [ ] Integrate into core rules if successful

---

## 8. Conclusion

### 8.1 Summary of Findings

**Compatibility**: Nexus RPG's existing aspect-based design is **highly compatible** with Spheres of Power's modular philosophy. The system already uses aspect keywords to guide spell creation, making formalization of aspect combinations a natural extension.

**Limitations**: Direct porting of Spheres of Power's full combinatorial freedom is **not recommended** due to:
- Different power ceilings (bounded mortal magic vs. high-level magic)
- Balance philosophy (curated spell lists vs. emergent combinations)
- Resource economy differences (Focus vs. Spell Points)
- Casting time models (fixed Action economy vs. at-will abilities)

**Opportunities**: Aspect combination framework provides:
- **Systematic spell design** tool for internal development
- **GM homebrew guidelines** for custom spell creation
- **Potential player options** for spell customization (optional)
- **Extensible foundation** for future magic system expansion

### 8.2 Recommended Approach

**Primary Recommendation**: Implement **Tier 1 (Internal Design Tool)** and **Tier 2 (GM Homebrew Guidelines)** immediately.

This approach:
- Maintains Nexus RPG's balance and design philosophy
- Provides clear value to GMs without system changes
- Uses existing aspect system as foundation
- Captures spirit of Spheres of Power modularity
- Preserves bounded power ceiling
- Enables systematic spell creation and expansion

**Optional Recommendation**: Consider **Tier 3 (Player Options)** after successful testing of Tiers 1-2.

Player-facing options require:
- Extensive playtesting for balance
- Clear GM approval processes
- Integration with existing rules
- Community feedback and iteration

### 8.3 Next Steps

1. **Review and approve this analysis** with design team
2. **Create formal aspect pools** in spell creation instructions
3. **Develop effect template library** with mechanical formulas
4. **Write GM homebrew guide** with worked examples
5. **Test framework** by creating 20+ sample spells
6. **Iterate and refine** based on testing results
7. **Integrate into documentation** once validated

### 8.4 Final Notes

The proposed aspect combination framework represents a **middle ground** between:
- Nexus RPG's curated, balanced spell lists
- Spheres of Power's modular, combinatorial freedom

By formalizing the existing aspect system and providing clear templates, Nexus RPG gains the benefits of systematic spell design and GM homebrew support while maintaining tight balance control and thematic consistency.

The framework is **extensible** - new aspects, templates, or delivery methods can be added as the system evolves without breaking existing spells. This positions Nexus RPG for long-term growth while preserving its core design philosophy.

---

**Document Version**: 1.0  
**Author**: AI Analysis (based on Nexus RPG documentation and Spheres of Power research)  
**Status**: Proposal for Review  
**Next Review**: After design team feedback
