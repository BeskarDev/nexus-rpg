# Effect Template Library

**Purpose**: This document provides a comprehensive library of effect templates for spell creation in Nexus RPG. Each template includes mechanical formulas, scaling guidelines, and multiple examples across different traditions/disciplines.

---

## Table of Contents

1. [Template Overview](#template-overview)
2. [Template 1: Direct Damage](#template-1-direct-damage)
3. [Template 2: Buff/Enchantment](#template-2-buff-enchantment)
4. [Template 3: Debuff/Condition](#template-3-debuff-condition)
5. [Template 4: Summoning/Creation](#template-4-summoning-creation)
6. [Template 5: Zone/Area Control](#template-5-zone-area-control)
7. [Template 6: Utility/Exploration](#template-6-utility-exploration)
8. [Hybrid Templates](#hybrid-templates)
9. [Special Considerations](#special-considerations)

---

## Template Overview

### The Six Core Templates

Every spell in Nexus RPG uses one (or occasionally a hybrid) of these templates:

| Template | Primary Use | Success Scaling | Example Aspects |
|----------|-------------|-----------------|-----------------|
| **Direct Damage** | Harm enemies | Damage increases | *fire, lightning, frost, acid* |
| **Buff/Enchantment** | Enhance allies | Bonus/duration increases | *blessing, weapon-blessing, protection* |
| **Debuff/Condition** | Impair enemies | Severity/duration increases | *curse, charm, fear, binding* |
| **Summoning/Creation** | Manifest entities | Tier/quantity increases | *summoning, creature, creation* |
| **Zone/Area Control** | Environmental effects | Size/duration/power increases | *wall, fog, barrier, terrain* |
| **Utility/Exploration** | Non-combat function | Scope/detail increases | *communication, divination, teleport* |

### Scaling Dimensions

Spells can scale along multiple dimensions:
- **Power**: Damage, bonuses, or effect magnitude
- **Targets**: Number of creatures affected
- **Area**: Size of effect zone
- **Duration**: How long the effect lasts
- **Complexity**: Additional secondary effects

---

## Template 1: Direct Damage

### Core Formula

**Single-Target Damage**:
```
Rank 0: +2 weak / +4 strong / +6 critical
Rank 1: +4 weak / +8 strong / +12 critical
Rank 2: +6 weak / +12 strong / +18 critical
Rank 3: +8 weak / +16 strong / +24 critical
Rank 4: +10 weak / +20 strong / +30 critical
Rank 5: +12 weak / +24 strong / +36 critical
```

**AoE Damage** (reduce by one rank):
```
Rank 0 AoE: +0 weak / +2 strong / +4 critical
Rank 1 AoE: +2 weak / +4 strong / +6 critical
Rank 2 AoE: +4 weak / +8 strong / +12 critical
Rank 3 AoE: +6 weak / +12 strong / +18 critical
Rank 4 AoE: +8 weak / +16 strong / +24 critical
Rank 5 AoE: +10 weak / +20 strong / +30 critical
```

**Note**: Spell Power (½ Mind or ½ Spirit) is added to all damage values.

### Damage Type Mapping

| Damage Type | Common Aspects | Typical Conditions | Schools |
|-------------|----------------|-------------------|---------|
| **Fire** | *fire, burning, flame* | burning (2/4/6 per turn) | Evocation, Tempest, War |
| **Frost** | *frost, ice, cold* | slowed, dazed | Evocation, Twilight |
| **Lightning** | *lightning, shock, thunder* | staggered, stunned | Evocation, Tempest |
| **Acid** | *acid, corrosion, dissolve* | corroding (ignore ½ AV) | Evocation, Nature |
| **Poison** | *poison, venom, toxin* | poisoned | Nature, Death, Necromancy |
| **Necrotic** | *decay, wither, drain* | weakened, life-drained | Necromancy, Death |
| **Radiant** | *light, radiance, sun* | blinded | Light, War |
| **Psychic** | *mind, mental, thought* | frightened, confused, dazed | Telepathy, Twilight, Light |
| **Physical** | *force, impact, crush* | prone, knocked back | Conjuration, Telekinetics, Nature |
| **Blast** | *explosion, concussion* | prone, pushed (ignore ½ AV) | Evocation, War |

### Variations

#### Variation 1A: Pure Damage (No Condition)
Use when spell is purely about high damage output.

**Example - Lightning Bolt** (*evocation*, Rank 3):
```markdown
**Effect**
A stroke of lightning forming a line blasts out from you in a direction you choose.
**Weak.** Deal +8 lightning damage to all creatures in the line.
**Strong.** Deal +16 lightning damage to all creatures in the line.
**Critical.** Deal +24 lightning damage to all creatures in the line.
```

#### Variation 1B: Damage + Condition
Add condition based on success level. Reduce damage by 1 step if condition is severe.

**Example - Freezing Ray** (*evocation*, Rank 2):
```markdown
**Effect**
You fire a ray of freezing energy that chills your target to the bone.
**Weak.** Deal +6 frost damage.
**Strong.** Deal +12 frost damage and the target is briefly slowed.
**Critical.** Deal +18 frost damage and the target is briefly dazed and slowed.
```

#### Variation 1C: Damage + Secondary Targets
Primary target takes full damage, secondary targets take reduced damage.

**Example - Chain Lightning** (*tempest*, Rank 4):
```markdown
**Effect**
You unleash a bolt of lightning that arcs between foes.
**Weak.** Deal +10 lightning damage to the initial target, then +5 lightning damage to one creature in close range of them.
**Strong.** Deal +20 lightning damage to the initial target, then +10 to one secondary target, then +5 to one tertiary target.
**Critical.** Deal +30 lightning damage to the initial target, then +15 to one secondary, then +10 to one tertiary, then +5 to one quaternary target.
```

#### Variation 1D: Split Damage Types
Combine two damage types for thematic effect.

**Example - Hellfire Blast** (*evocation*, Rank 3):
```markdown
**Effect**
You conjure flames tinged with necrotic energy, dealing both burning and soul-searing damage.
**Weak.** Deal +4 fire damage and +4 necrotic damage.
**Strong.** Deal +8 fire damage and +8 necrotic damage.
**Critical.** Deal +12 fire damage and +12 necrotic damage, and the target suffers burning (4) for short duration.
```

### Examples Across Schools

**Arcane - Evocation**: Chromatic Orb, Fireball, Ice Storm, Lightning Bolt  
**Arcane - Necromancy**: Life Drain, Wither, Necrotic Blast  
**Mystic - Tempest**: Call Lightning, Earthquake, Storm of Vengeance  
**Mystic - Light**: Radiant Smite, Sunbeam, Holy Fire  
**Mystic - War**: Divine Smite, Weapon of the Gods

---

## Template 2: Buff/Enchantment

### Core Formula

**Numeric Bonuses**:
```
Rank 0-1: +1 to rolls/defenses/saves
Rank 2-3: +2 to rolls/defenses/saves
Rank 4-5: +3 to rolls/defenses/saves
```

**Damage Bonuses** (scale faster):
```
Rank 1: +2 damage
Rank 2: +4 damage
Rank 3: +6 damage
Rank 4: +8 damage
Rank 5: +10 damage
```

**Duration Scaling**:
```
Rank 0: Briefly to Short
Rank 1: Short to Medium
Rank 2: Medium
Rank 3: Medium to Long
Rank 4-5: Long
```

### Variations

#### Variation 2A: Attribute Enhancement
Boost an attribute or rolls using that attribute.

**Example - Blessing of Might** (*war*, Rank 2):
```markdown
**Effect**
You invoke martial fury to enhance an ally's strength.
**Weak.** Target gains +1 boon on Strength rolls for medium duration.
**Strong.** Target gains +2 to Strength damage and +1 boon on Strength rolls for medium duration.
**Critical.** Target's Strength die increases by one size and they gain +2 to Strength damage for medium duration.
```

#### Variation 2B: Weapon Enchantment
Add damage and/or special properties to weapons.

**Example - Flaming Weapon** (*evocation*, Rank 2):
```markdown
**Properties:** enchant (weapon), singular

**Effect**
You imbue a weapon with magical flames.
**Weak.** Weapon deals +4 fire damage and emits bright light in melee range for medium duration.
**Strong.** Weapon deals +6 fire damage, emits bright light in close range, and on critical hit inflicts burning (4) for medium duration.
**Critical.** Weapon deals +8 fire damage, emits bright light in short range, and all hits inflict burning (2) for medium duration.
```

#### Variation 2C: Defensive Enchantment
Boost armor value, resistances, or condition immunity.

**Example - Shield of Faith** (*peace*, Rank 1):
```markdown
**Properties:** enchant (body)

**Effect**
You surround an ally with a shimmering field of protective energy.
**Weak.** Target gains +1 AV for medium duration.
**Strong.** Target gains +2 AV for medium duration.
**Critical.** Target gains +2 AV and resistance to one damage type you choose for medium duration.
```

#### Variation 2D: Multi-Benefit Buff
Grant several smaller bonuses instead of one large one.

**Example - Blessing of Battle** (*war*, Rank 3):
```markdown
**Effect**
You bless an ally with the spirit of righteous combat.
**Weak.** Target gains +1 boon on attack rolls and +1 Movement for medium duration.
**Strong.** Target gains +1 boon on attack rolls, +2 damage with weapon attacks, and +1 Movement for long duration.
**Critical.** Target gains +1 boon on attack rolls, +4 damage, +2 Movement, and can re-roll one failed attack per turn for long duration.
```

### Examples Across Schools

**Arcane - Evocation**: Elemental Ward, Flame Weapon, Frost Armor  
**Arcane - Telepathy**: Mental Fortitude, Thought Shield  
**Mystic - Life**: Bless, Aid, Heroism  
**Mystic - Light**: Radiant Blessing, Sacred Weapon  
**Mystic - War**: Battle Blessing, Champion's Fury

---

## Template 3: Debuff/Condition

### Core Formula

**Target Number**: 6 + Rank

**Save Types**:
- Mental/magical effects: vs. Resist
- Physical AoE: vs. Dodge
- Grapples/holds: vs. Parry

**Condition Severity**:
```
Rank 0-1: Minor (slowed, shaken, -1 bane)
Rank 2-3: Moderate (frightened, poisoned, -2 banes, die reduced)
Rank 4-5: Severe (stunned, dominated, paralyzed)
```

**Duration**:
```
Weak: Briefly (end of next turn)
Strong: Short (until short rest)
Critical: Medium (1 hour)
```

### Variations

#### Variation 3A: Single Condition
Apply one condition that scales in duration.

**Example - Fear** (*death*, Rank 2):
```markdown
**Effect**
You invoke primal terror in your target's heart.
**Weak.** Target makes Spirit + Fortitude vs. TN 8. On failure, briefly frightened.
**Strong.** On failure, frightened for short duration.
**Critical.** On failure, frightened for medium duration and cannot willingly move closer to you.
```

#### Variation 3B: Escalating Penalty
Penalize rolls or attributes, scaling with success.

**Example - Curse of Weakness** (*necromancy*, Rank 3):
```markdown
**Effect**
You place a withering curse on your target.
**Weak.** Target makes Spirit + Fortitude vs. TN 9. On failure, -1 bane on Strength rolls for short duration.
**Strong.** On failure, -2 banes on Strength rolls and Strength damage reduced by -4 for short duration.
**Critical.** On failure, -2 banes on Strength rolls, Strength die reduced by one size, and -4 Strength damage for medium duration.
```

#### Variation 3C: Control Effect
Take control of target's actions.

**Example - Dominate Person** (*telepathy*, Rank 4):
```markdown
**Properties:** concentrate, singular

**Effect**
You seize control of a humanoid's mind.
**Weak.** Target makes Spirit + Fortitude vs. TN 10. On failure, dominated (charmed and obeys mental commands) for briefly while you concentrate.
**Strong.** On failure, dominated for short duration. Can issue new commands with Quick Action.
**Critical.** On failure, dominated for medium duration. You can see through target's eyes and hear through their ears. Target gets new save each time they take damage.
```

#### Variation 3D: AoE Condition
Apply condition to area, potentially multiple targets.

**Example - Mass Slow** (*twilight*, Rank 3):
```markdown
**Properties:** blast (burst), concentrate

**Effect**
You slow time for all creatures in the affected area.
**Weak.** All creatures in close area vs. Resist TN 9. On failure, slowed for briefly.
**Strong.** On failure, slowed for short duration.
**Critical.** On failure, slowed and staggered for short duration.
```

### Examples Across Schools

**Arcane - Telepathy**: Charm, Dominate, Suggestion, Hold Person  
**Arcane - Illusion**: Phantasmal Fear, Hypnotic Pattern  
**Arcane - Necromancy**: Curse, Fear, Paralysis  
**Mystic - Death**: Hex, Blight, Plague  
**Mystic - Twilight**: Sleep, Confusion

---

## Template 4: Summoning/Creation

### Core Formula

**Creature Tier**:
```
Weak: Tier [Rank-1], 1 creature, short duration
Strong: Tier [Rank], 1-2 creatures, medium duration
Critical: Tier [Rank+1], 2-3 creatures, medium duration
```

**Object Complexity**:
```
Rank 0-1: Small objects (tools, simple weapons)
Rank 2-3: Medium objects (complex mechanisms, quality items)
Rank 4-5: Large objects (structures, extraordinary items)
```

### Variations

#### Variation 4A: Single Creature Summon
Summon one creature that scales in tier.

**Example - Summon Elemental** (*evocation*, Rank 3):
```markdown
**Properties:** concentrate

**Effect**
You summon an elemental creature from the elemental planes.
**Weak.** Summon one Tier 2 elemental (choose fire, water, earth, or air) for short duration while you concentrate.
**Strong.** Summon one Tier 3 elemental for medium duration.
**Critical.** Summon one Tier 4 elemental for medium duration.

The elemental obeys your mental commands and acts on your initiative.
```

#### Variation 4B: Swarm Summon
Summon multiple weaker creatures instead of one strong one.

**Example - Summon Swarm** (*nature*, Rank 2):
```markdown
**Properties:** concentrate

**Effect**
You call forth a swarm of insects, rats, or bats to serve you.
**Weak.** Summon one Tier 1 swarm for short duration.
**Strong.** Summon two Tier 1 swarms or one Tier 2 swarm for medium duration.
**Critical.** Summon three Tier 2 swarms for medium duration.

Swarms fill their areas and can attack creatures within. Each swarm acts on your initiative.
```

#### Variation 4C: Object Creation
Create useful objects rather than creatures.

**Example - Create Food and Water** (*life*, Rank 2):
```markdown
**Effect**
You conjure wholesome food and clean water.
**Weak.** Create enough food and water for 3 people for one day.
**Strong.** Create enough for 9 people for one day, or 3 people for three days.
**Critical.** Create enough for 27 people for one day, or for any smaller group for proportionally longer.

The food and water are nourishing and pure, disappearing after 24 hours if not consumed.
```

#### Variation 4D: Structure Creation
Create walls, barriers, or structures.

**Example - Wall of Stone** (*nature*, Rank 4):
```markdown
**Effect**
You cause a solid barrier of stone to rise from the ground.
**Weak.** Create a short area stone wall (6 inches thick, HP 40). Lasts until destroyed.
**Strong.** Create a medium area stone wall (1 foot thick, HP 80). Lasts until destroyed.
**Critical.** Create a large area stone wall (2 feet thick, HP 160). Lasts until destroyed, becomes permanent after long duration.

The wall must have a foundation. Each 10-foot section is a separate object that can be destroyed.
```

### Examples Across Schools

**Arcane - Conjuration**: Summon Monster, Create Object, Teleport Circle  
**Arcane - Necromancy**: Animate Dead, Create Undead  
**Mystic - Nature**: Summon Beast, Speak with Plants  
**Mystic - Tempest**: Call Lightning Elemental

---

## Template 5: Zone/Area Control

### Core Formula

**Area Sizes**:
```
Rank 0-1: Melee to Close area
Rank 2-3: Close to Short area
Rank 4-5: Short to Medium area
```

**Duration**:
```
Weak: Short
Strong: Medium
Critical: Medium to Long
```

**Zone Effects**:
- Difficult terrain
- Damage on entry or per turn (use half of single-target damage)
- Buffs/debuffs while inside
- Vision/movement restriction
- Environmental properties

### Variations

#### Variation 5A: Damage Zone
Area deals damage to creatures inside.

**Example - Wall of Fire** (*evocation*, Rank 4):
```markdown
**Properties:** blast (wall), concentrate

**Effect**
You create a wall of roaring flames.
**Weak.** Create a short area wall of fire. Creatures take +5 fire damage when entering or starting turn in the wall. Lasts short duration.
**Strong.** Create a medium area wall. Creatures take +10 fire damage. Lasts medium duration.
**Critical.** Create a large area wall. Creatures take +15 fire damage and suffer burning (4). Lasts long duration.

The wall emits bright light and blocks line of sight.
```

#### Variation 5B: Terrain Modification
Change terrain properties without direct damage.

**Example - Spike Growth** (*nature*, Rank 2):
```markdown
**Properties:** persistent

**Effect**
You cause the ground to sprout painful thorns and spikes.
**Weak.** Close area becomes difficult terrain and creatures take +2 physical damage per area moved through. Lasts medium duration.
**Strong.** Short area becomes difficult terrain and creatures take +4 damage per area. Lasts long duration.
**Critical.** Medium area, +6 damage per area, and creatures that take damage are briefly slowed. Lasts long duration.
```

#### Variation 5C: Vision Obscurement
Create fog, darkness, or other sight-blocking effects.

**Example - Fog Cloud** (*twilight*, Rank 1):
```markdown
**Properties:** blast (burst), concentrate

**Effect**
You create a bank of thick fog.
**Weak.** Create close area heavily obscured fog for short duration.
**Strong.** Create short area fog for medium duration. You can see through the fog normally.
**Critical.** Create medium area fog for medium duration. You can see through it, and allies inside gain +1 boon on Dodge.
```

#### Variation 5D: Buff/Debuff Zone
Zone provides benefits to allies or penalties to enemies.

**Example - Consecrated Ground** (*light*, Rank 3):
```markdown
**Properties:** blast (aura), concentrate

**Effect**
You bless the ground around you with holy power.
**Weak.** Create close area zone centered on you. Allies inside gain +1 boon on Resist and resistance to necrotic damage. Lasts short duration.
**Strong.** Short area zone, allies gain +2 AV and resistance to necrotic/psychic. Lasts medium duration.
**Critical.** Medium area zone, allies gain +2 AV, resistance to necrotic/psychic/poison, and undead creatures suffer +1 bane on attacks. Lasts long duration.

Zone moves with you.
```

### Examples Across Schools

**Arcane - Evocation**: Wall of Fire, Ice Storm Zone, Lightning Field  
**Arcane - Conjuration**: Cloudkill, Fog Bank, Force Cage  
**Mystic - Nature**: Spike Growth, Entangle, Plant Growth  
**Mystic - Tempest**: Storm Zone, Earthquake  
**Mystic - Peace**: Sanctuary, Calm Emotions Area

---

## Template 6: Utility/Exploration

### Core Principles

Utility spells don't have strict formulas but should scale in **scope, range, detail, or duration** based on rank and success level.

**Power Scaling**:
```
Rank 0-1: Local, simple effects
Rank 2-3: Significant, complex effects
Rank 4-5: Extraordinary, reality-bending effects
```

### Variations

#### Variation 6A: Information Gathering
Detect, sense, or reveal information.

**Example - Detect Magic** (*twilight*, Rank 1):
```markdown
**Effect**
You extend your senses to detect magical auras.
**Weak.** You sense the presence of magic in close range and can determine which tradition/discipline for short duration.
**Strong.** You sense magic in short range, identify tradition/discipline and rank, and can see magical auras for medium duration.
**Critical.** You sense magic in medium range, identify all details including caster if active, and can see through magical illusions for medium duration.
```

#### Variation 6B: Communication
Speak with creatures, send messages, or establish telepathic links.

**Example - Speak with Beasts** (*nature*, Rank 1):
```markdown
**Effect**
You attune your mind to communicate with animals.
**Weak.** Communicate simple ideas with one beast in close range for short duration.
**Strong.** Hold conversation with up to three beasts in short range for medium duration. Beasts are more friendly.
**Critical.** As strong, plus gain insight into recent experiences and can request simple favors. Gain +1 boon on Nature (animals) for medium duration.
```

#### Variation 6C: Transportation
Teleport, plane shift, or provide movement.

**Example - Teleport** (*conjuration*, Rank 4):
```markdown
**Effect**
You instantly transport yourself and willing creatures to a location you've been before.
**Weak.** Teleport yourself and up to 2 willing creatures to a location in the same region (up to 100 miles).
**Strong.** Teleport yourself and up to 4 willing creatures to any location on the same plane you've visited.
**Critical.** As strong, but up to 8 creatures, and you can teleport to locations described to you even if you haven't visited them (GM determines accuracy).
```

#### Variation 6D: Object Interaction
Manipulate, repair, or identify objects.

**Example - Mending** (*conjuration*, Rank 0):
```markdown
**Effect**
You repair damage to objects using magic.
**Weak.** Repair one break or tear in an object (up to 1 foot). Cannot restore magical properties.
**Strong.** Repair multiple breaks or restore up to 50% of an object's HP.
**Critical.** Fully restore a broken non-magical object or repair magical items (requires GM approval).
```

### Examples Across Schools

**Arcane - Illusion**: Disguise Self, Invisibility, Major Image  
**Arcane - Telepathy**: Detect Thoughts, Message, Mind Link  
**Arcane - Conjuration**: Teleport, Dimension Door, Knock  
**Mystic - Twilight**: Augury, Divination, Dream  
**Mystic - Light**: Detect Lies, Locate Object, True Seeing  
**Mystic - Nature**: Speak with Animals, Plant Growth, Weather Control

---

## Hybrid Templates

Some spells combine multiple templates for complex effects. When doing so, **reduce the power of each component**.

### Hybrid Type 1: Damage + Debuff
Reduce damage by 1-2 steps, add condition.

**Example - Searing Smite** (*war*, Rank 2):
```markdown
**Effect**
You strike with divine fire that burns your foe.
**Weak.** Deal +4 fire damage (reduced from +6) and target is briefly burning (2).
**Strong.** Deal +8 fire damage (reduced from +12) and target is burning (4) for short duration.
**Critical.** Deal +12 fire damage (reduced from +18) and target is burning (6) for short duration and briefly blinded.
```

### Hybrid Type 2: Buff + Summon
Summon creature that provides buffs to allies.

**Example - Spirit Guardian** (*war*, Rank 3):
```markdown
**Properties:** concentrate

**Effect**
You summon a divine warrior spirit to protect your allies.
**Weak.** Summon Tier 2 guardian spirit. Allies in melee range of it gain +1 AV. Lasts short duration.
**Strong.** Summon Tier 3 guardian. Allies in close range gain +2 AV and +1 boon on Resist. Lasts medium duration.
**Critical.** Summon Tier 4 guardian. Allies in close range gain +2 AV, +1 boon on Resist, and can use the guardian's Dodge in place of their own. Lasts medium duration.
```

### Hybrid Type 3: Zone + Summon
Create zone that summons/controls creatures within.

**Example - Plague of Locusts** (*nature*, Rank 4):
```markdown
**Properties:** blast (burst), concentrate

**Effect**
You summon a swarm of locusts that fills an area.
**Weak.** Create close area swarm. Creatures inside take +4 physical damage per turn and area is heavily obscured. Lasts short duration.
**Strong.** Create short area swarm, +8 damage, heavily obscured, difficult terrain. Lasts medium duration.
**Critical.** Create medium area swarm, +12 damage, heavily obscured, difficult terrain, and crops/vegetation in area are destroyed. Lasts medium duration.
```

---

## Special Considerations

### Concentration Spells

Spells with `concentrate` property:
- Caster can only maintain one at a time
- Breaks if caster takes damage (Spirit + Fortitude save to maintain)
- Breaks if caster takes different Action
- Can voluntarily end at any time

**When to use**:
- Powerful ongoing effects
- Summons that need control
- Buffs/debuffs with long duration
- Zone effects that can move

### Ritual Spells

Spells with `ritual` property:
- Take extended time (minutes/hours/days)
- Cannot be used in combat
- Allow more powerful effects for their rank
- Usually utility-focused

**When to use**:
- Divination and information gathering
- Long-distance communication
- Permanent or very long-lasting effects
- Ceremonial magic

### Singular Spells

Spells with `singular` property:
- Only one instance can be active
- Recasting ends previous instance
- Prevents stacking identical buffs
- Common for enchantments

**When to use**:
- Weapon/armor enchantments
- Long-duration buffs that would stack unfairly
- Unique effects that shouldn't duplicate

### Heightening

Some spells can be cast at higher ranks:

**Format**:
```markdown
**Heighten.**
**(Rank X)** [Enhanced effect for higher rank]
**(Rank Y)** [Further enhanced effect]
```

**When to use**:
- Spells that scale cleanly (pure damage)
- When higher-rank versions add complexity naturally
- To reduce total spell count by consolidating similar effects

---

## Conclusion

These effect templates provide the mechanical foundation for creating balanced, thematic spells in Nexus RPG. By choosing the appropriate template, applying the formulas correctly, and adding thematic aspects, you can create spells that are:

- **Mechanically sound** (follow proven patterns)
- **Thematically coherent** (aspects guide implementation)
- **Appropriately powered** (rank determines strength)
- **Tactically interesting** (success levels create meaningful choices)

Use this library as a reference while designing new spells, and don't hesitate to explore variations and hybrids to create unique effects that fit your game's needs!
