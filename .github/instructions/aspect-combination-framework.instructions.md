# Aspect Combination Framework for Spell Design

## Purpose
This document provides AI agents with systematic instructions for using the aspect combination framework when designing spells for Nexus RPG. This framework is inspired by Spheres of Power's modular approach while maintaining Nexus RPG's bounded power level and pre-defined spell structure.

## Core Principles

### 1. Aspect-Driven Design
Every spell must be built from **aspects** - thematic keywords that define the spell's identity and mechanical implementation.

### 2. Template-Based Structure
Use one of six **effect templates** to ensure consistent mechanical patterns.

### 3. Bounded Power Ceiling
Respect Nexus RPG's power limit: **Rank 5 = Peak Mortal Magic** (≈D&D 7th level, NOT 9th level).

### 4. Role Alignment
Spells should serve the tradition/discipline's **Excels or Decent roles**, avoiding Weak roles.

---

## Step-by-Step Spell Design Process

### Step 1: Select Tradition/Discipline
Choose the appropriate magic school for the spell's theme and function.

**Arcane Disciplines**:
- Evocation (elemental offense)
- Illusion (sensory manipulation)
- Conjuration (summoning/creation)
- Telepathy (mind control)
- Telekinetics (force manipulation)
- Necromancy (life/death magic)

**Mystic Traditions**:
- Light (truth, purification)
- Twilight (dreams, mystery)
- Life (healing, growth)
- Death (decay, endings)
- Nature (wilderness, animals)
- Tempest (storms, disasters)
- Peace (protection, sanctuary)
- War (combat, glory)

### Step 2: Choose 1-3 Aspects
Select aspects from the tradition/discipline's aspect pool.

**Requirements**:
- Minimum 1 primary aspect (required)
- Maximum 3 total aspects (maintains clarity)
- All aspects must come from chosen tradition/discipline
- Aspects should work together thematically

**Example**:
- Tradition: Tempest
- Aspects: *thunderstorm*, *lightning-strike*
- Valid: ✅ (2 aspects, both from Tempest)

### Step 3: Select Effect Template
Choose one of six effect templates:

1. **Direct Damage** - Deals damage, possibly with conditions
2. **Buff/Enchantment** - Enhances allies or equipment
3. **Debuff/Condition** - Impairs enemies
4. **Summoning/Creation** - Brings creatures/objects into existence
5. **Zone/Area Control** - Creates lasting environmental effects
6. **Utility/Exploration** - Non-combat functionality

### Step 4: Choose Delivery Method
Select how the effect reaches targets:

**Core Properties**:
- `blast (cone)` - Conical area
- `blast (line)` - Line area
- `blast (burst)` - Area centered on point
- `blast (chain)` - Bounces between targets
- `blast (wall)` - Creates barrier
- `blast (aura)` - Centered on caster, moves with them
- Single-target (no property needed)

**Modifiers**:
- `concentrate` - Requires concentration
- `enchant (X)` - Temporary enhancement
- `illusory` - Can be disbelieved
- `quick` - Cast as Quick Action
- `ritual (X)` - Extended casting time
- `singular` - Only one instance active
- `persistent` - Creates lasting effect
- `triggered` - Activates on condition

### Step 5: Determine Rank
Match spell power to appropriate rank (0-5).

**Rank Guidelines**:
- **Rank 0**: Minor effects, unlimited use, +2/4/6 single-target damage
- **Rank 1**: Basic spells, +4/8/12 single-target damage
- **Rank 2**: Moderate power, +6/12/18 single-target damage
- **Rank 3**: Significant spells, +8/16/24 single-target damage
- **Rank 4**: Very powerful, +10/20/30 single-target damage
- **Rank 5**: Peak mortal magic, +12/24/36 single-target damage

**AoE Adjustment**: Reduce damage by one rank (e.g., Rank 2 AoE = Rank 1 damage values).

### Step 6: Apply Template Formula
Use the appropriate effect template's mechanical formula.

### Step 7: Write Spell Description
Structure the spell text properly:

```markdown
### Spell Name (*tradition/discipline*, Rank X)
**Properties:** [list all properties]

**Effect**
[Evocative flavor description incorporating aspects]
**Weak.** [Mechanical effect for weak success]
**Strong.** [Mechanical effect for strong success]
**Critical.** [Mechanical effect for critical success]

[Optional: Additional utility uses or special notes]

**Heighten.** [Optional: Higher-rank versions if spell scales well]
```

### Step 8: Validate
Check the spell against all combination rules and guidelines.

---

## Effect Template Formulas

### Template 1: Direct Damage

**Structure**: `[Damage Type] + [Delivery] → [Damage + Optional Condition]`

**Formula**:
```
Single-Target:
Weak: +[Rank×2] damage
Strong: +[Rank×4] damage
Critical: +[Rank×6] damage

AoE (reduce by one rank):
Weak: +[(Rank-1)×2] damage
Strong: +[(Rank-1)×4] damage
Critical: +[(Rank-1)×6] damage
```

**Conditions**:
Add conditions based on damage type and success level:
- Fire: burning (2/4/6 per turn)
- Frost: slowed/dazed
- Lightning: staggered/stunned
- Acid: corroding (half AV)
- Poison: poisoned
- Necrotic: weakened/life-drained
- Psychic: frightened/confused
- Radiant: blinded

**Example**:
```markdown
### Flame Bolt (*evocation*, Rank 2)
**Properties:** -

**Effect**
You hurl a bolt of roaring flame at your target.
**Weak.** Deal +6 fire damage.
**Strong.** Deal +12 fire damage and the target suffers burning (2) for short duration.
**Critical.** Deal +18 fire damage and the target suffers burning (4) for short duration.
```

### Template 2: Buff/Enchantment

**Structure**: `[Bonus Type] + [Target] + [Duration] → [Enhancement + Special]`

**Formula**:
```
Numeric Bonuses (scale with rank):
Rank 0-1: +1 bonus
Rank 2-3: +2 bonus
Rank 4-5: +3 bonus

Damage Bonuses (scale faster):
Rank 1: +2 damage
Rank 2: +4 damage
Rank 3: +6 damage
Rank 4: +8 damage
Rank 5: +10 damage
```

**Durations** (based on rank):
- Rank 0: Briefly to Short
- Rank 1: Short to Medium
- Rank 2: Medium
- Rank 3: Medium to Long
- Rank 4-5: Long

**Example**:
```markdown
### Blessing of Might (*war*, Rank 2)
**Properties:** enchant (body)

**Effect**
You invoke the spirit of battle, empowering an ally with supernatural strength.
**Weak.** Target gains +1 boon on Strength rolls for medium duration.
**Strong.** Target gains +2 to Strength-based damage and +1 boon on Strength rolls for medium duration.
**Critical.** Target gains +4 to Strength-based damage, +1 boon on Strength rolls, and resistance to physical damage for medium duration.
```

### Template 3: Debuff/Condition

**Structure**: `[Condition] + [Save Type] + [Duration] → [Effect + Scaling]`

**Formula**:
```
Target Number: 6 + Rank
Save: vs. Resist (most common), vs. Dodge (physical effects), vs. Parry (grapples)

Duration Scaling:
Weak: Briefly (end of next turn)
Strong: Short (until short rest)
Critical: Medium (1 hour)
```

**Condition Severity** (based on rank):
- Rank 0-1: Minor (e.g., slowed, shaken)
- Rank 2-3: Moderate (e.g., frightened, poisoned)
- Rank 4-5: Severe (e.g., stunned, dominated)

**Example**:
```markdown
### Curse of Weakness (*death*, Rank 2)
**Properties:** -

**Effect**
You place a withering curse upon your target, sapping their strength.
**Weak.** Target makes Spirit + Fortitude vs. TN 8. On failure, they suffer -1 bane on Strength rolls for short duration.
**Strong.** On failure, they suffer -2 banes on Strength rolls and deal -2 damage with Strength-based attacks for short duration.
**Critical.** On failure, they suffer -2 banes on Strength rolls, deal -4 damage with Strength-based attacks, and their Strength die is reduced by one size for medium duration.
```

### Template 4: Summoning/Creation

**Structure**: `[Entity Type] + [Tier/Quantity] + [Duration] → [Summoned Effect]`

**Formula**:
```
Creature Tier (based on spell rank):
Weak: Tier [Rank-1], 1 creature, short duration
Strong: Tier [Rank], 1-2 creatures, medium duration
Critical: Tier [Rank+1], 2-3 creatures, medium duration

Minimum Tier 0, Maximum Tier 5 (respects bounded power)
```

**Control**:
- Summoned creatures obey mental commands
- Act on caster's initiative
- Disappear when duration ends or when reduced to 0 HP
- If concentration breaks (if required), may turn hostile (GM discretion)

**Example**:
```markdown
### Summon Fire Elemental (*evocation*, Rank 3)
**Properties:** concentrate

**Effect**
You tear open a rift to the elemental plane of fire, summoning a creature of living flame to serve you.
**Weak.** Summon one Tier 2 fire elemental in medium range. It obeys your mental commands for short duration while you concentrate.
**Strong.** Summon one Tier 3 fire elemental or two Tier 2 fire elementals for medium duration while you concentrate.
**Critical.** Summon one Tier 4 fire elemental, two Tier 3 elementals, or three Tier 2 elementals for medium duration while you concentrate.

Summoned elementals have fire immunity and their attacks deal fire damage. If your concentration breaks, they become uncontrolled but don't turn hostile.
```

### Template 5: Zone/Area Control

**Structure**: `[Area Size] + [Zone Effect] + [Duration] → [Environmental Change]`

**Formula**:
```
Area Sizes (based on rank):
Rank 0-1: Melee to Close
Rank 2-3: Close to Short
Rank 4-5: Short to Medium

Duration:
Weak: Short
Strong: Medium
Critical: Medium to Long

Effects:
- Difficult terrain
- Damage on entry/per turn
- Buffs/debuffs while inside
- Vision/movement restriction
- Elemental/magical properties
```

**Example**:
```markdown
### Wall of Thorns (*nature*, Rank 3)
**Properties:** blast (wall), concentrate

**Effect**
You cause a wall of thorny vines to erupt from the ground, creating a barrier of twisted plants.
**Weak.** Create a short area wall of thorns. The wall is difficult terrain and creatures take +4 physical damage when entering or starting their turn in the wall. Lasts short duration while you concentrate.
**Strong.** As weak, but the wall is medium area, deals +8 damage, and lasts medium duration.
**Critical.** As strong, but creatures that take damage from the wall are also briefly grappled by thorns (restrained). You can use a Quick Action to reshape the wall.

The wall has HP equal to your spell power ×5 and can be destroyed.
```

### Template 6: Utility/Exploration

**Structure**: `[Function] + [Target/Range] + [Duration] → [Non-Combat Effect]`

**Formula**:
```
Utility effects vary widely - focus on:
- Information gathering
- Communication
- Movement/transportation
- Environmental manipulation
- Social interaction
- Downtime activities

Power scaling:
Rank 0-1: Local, simple effects
Rank 2-3: Significant, complex effects
Rank 4-5: Extraordinary, reality-bending effects
```

**Example**:
```markdown
### Speak with Beasts (*nature*, Rank 1)
**Properties:** -

**Effect**
You attune your mind to the natural world, allowing you to communicate with animals.
**Weak.** You can communicate simple ideas with one beast in close range for short duration. The beast understands you but may not cooperate.
**Strong.** You can hold a conversation with up to three beasts in short range for medium duration. Beasts are more inclined to be friendly unless you've harmed them.
**Critical.** As strong, but you also gain insight into the beast's recent experiences and can ask them to perform simple favors. Additionally, you gain +1 boon on Nature rolls related to animals for medium duration.
```

---

## Aspect Pools (Quick Reference)

### Arcane Disciplines

**Evocation**: fire, frost, lightning, acid, blast, elemental-barrier, burning, chilling, shocking, corroding, concussive, ward, immunity, absorption

**Illusion**: trickery, misdirection, obfuscation, hallucination, distortion, invisibility, disguise, phantom, false-terrain, confusion, mental-defense, sensory-enhancement, truth-revelation

**Conjuration**: summoning, creation, teleportation, binding, force, creature, object, extradimensional, portal, anchor, dismissal, imprisonment, planar

**Telepathy**: mind-reading, mental-command, charm, domination, memory, influence, communication, insight, compulsion, suggestion, psychic-defense, mental-link, thought-projection

**Telekinetics**: movement, levitation, force-barrier, crushing, gravity, push, pull, hold, fly, weight-manipulation, momentum, acceleration, orbital

**Necromancy**: decay, undeath, life-drain, corpse-animation, defilement, aging, withering, puppetry, death-speak, curse, soul-capture, resurrection, phylactery

### Mystic Traditions

**Light**: sun, illumination, truth, clarity, judgement, revelation, purification, anti-undead, guidance, radiance, prophecy, blessing, consecration

**Twilight**: moon, dreams, secrets, fate, illusion, sleep, prophecy, shadow, transformation, destiny, nightmare, divination, balance

**Life**: vitality, healing, blessing, growth, fertility, restoration, cure-disease, strengthen-bonds, hope, community, regeneration, renewal, birth

**Death**: plague, curse, fear, decay, ancestry, disease, wither, dread, decomposition, ancestral-communion, ending, mourning, inheritance

**Nature**: earth, water, animals, plants, weather, terrain, beast-communication, growth, adaptation, natural-hazard, ecosystem, symbiosis, primal-force

**Tempest**: hurricane, earthquake, thunderstorm, sandstorm, flood, lightning-strike, wind, tremor, deluge, storm-summoning, cataclysm, elemental-fury, atmospheric-pressure

**Peace**: calm, protection, sanctuary, safe-travel, law, emotion-control, ward, refuge, journey-blessing, oath, truce, asylum, covenant

**War**: fury, weapon-blessing, battle-cry, blood-magic, triumph, combat-rage, martial-prowess, tactical-advantage, honorable-wound, victory, duel, champion, glory

---

## Combination Rules (Checklist)

When designing a spell, validate against these rules:

### ✅ Rule 1: Primary Aspect Required
- [ ] Spell includes at least one primary aspect from its tradition/discipline

### ✅ Rule 2: Maximum Three Aspects
- [ ] Spell uses no more than three aspects total
- [ ] All aspects come from the same tradition/discipline

### ✅ Rule 3: Effect Template Match
- [ ] Spell uses one of the six effect templates
- [ ] Template formula correctly applied

### ✅ Rule 4: Delivery Method Consistency
- [ ] Spell uses appropriate delivery method property
- [ ] No conflicting delivery methods (can't be both cone and line)

### ✅ Rule 5: Role Alignment
- [ ] Spell aligns with tradition/discipline's Excels or Decent roles
- [ ] Weak roles avoided unless intentionally subversive

### ✅ Rule 6: Rank-Appropriate Power
- [ ] Damage values match rank scaling guidelines
- [ ] Conditions appropriate for rank severity
- [ ] Duration appropriate for rank
- [ ] Total spell power doesn't exceed rank limits

### ✅ Rule 7: Bounded Power Ceiling
- [ ] Rank 5 is maximum (peak mortal magic)
- [ ] No reality-warping effects (e.g., wish, time stop)
- [ ] Effects have clear counterplay or limitations

### ✅ Rule 8: Mechanical Clarity
- [ ] All effects have clear mechanical implementation
- [ ] Target numbers, damage values, durations specified
- [ ] No ambiguous or narrative-only effects

---

## Common Patterns and Examples

### Pattern 1: Elemental Blast
**Aspects**: One elemental type (fire, frost, lightning, etc.)  
**Template**: Direct Damage  
**Delivery**: Single-target or `blast` property  
**Variations**: Add condition based on element, scale damage with rank

### Pattern 2: Weapon Enhancement
**Aspects**: Element or damage type  
**Template**: Buff/Enchantment  
**Delivery**: `enchant (weapon)`  
**Variations**: Add bonus damage, condition on hit, light emission

### Pattern 3: Protective Ward
**Aspects**: Protection, barrier, defense  
**Template**: Buff/Enchantment or Zone Control  
**Delivery**: `enchant (body)` or `blast (aura)`  
**Variations**: AV bonus, damage resistance, condition immunity

### Pattern 4: Mind Control
**Aspects**: Charm, domination, mental-command  
**Template**: Debuff/Condition  
**Delivery**: vs. Resist  
**Variations**: Scale duration and control level with success

### Pattern 5: Environmental Hazard
**Aspects**: Natural phenomenon (storm, earthquake, etc.)  
**Template**: Zone/Area Control  
**Delivery**: `blast (burst)` or `blast (wall)`  
**Variations**: Difficult terrain, damage over time, vision obscurement

---

## Anti-Patterns (What to Avoid)

### ❌ Mixing Disciplines/Traditions
Don't combine aspects from different schools:
- ❌ Wrong: Evocation *fire* + Necromancy *life-drain*
- ✅ Right: Evocation *fire* + Evocation *blast*

### ❌ Exceeding Power Ceiling
Don't create Rank 5 spells that match D&D 9th level effects:
- ❌ Wrong: "Wish" (reality alteration)
- ❌ Wrong: "Time Stop" (breaks action economy)
- ✅ Right: "Meteor Swarm equivalent" (big damage but counterable)

### ❌ Too Many Aspects
Don't combine more than three aspects:
- ❌ Wrong: *fire*, *lightning*, *blast*, *ward*, *immunity*
- ✅ Right: *fire*, *lightning*, *blast*

### ❌ Ambiguous Mechanics
Don't create narrative-only effects without clear rules:
- ❌ Wrong: "The target is cursed with misfortune (GM decides effects)"
- ✅ Right: "The target suffers -1 bane on all rolls for short duration"

### ❌ Role Violation
Don't create spells in Weak roles without justification:
- ❌ Wrong: Evocation healing spell (Weak role for Evocation)
- ✅ Right: Evocation damage spell (Excels role)

### ❌ Conflicting Properties
Don't combine incompatible delivery methods:
- ❌ Wrong: `blast (cone)` + `blast (line)`
- ✅ Right: `blast (cone)` only

---

## Workflow Summary

1. **Choose tradition/discipline** based on spell theme
2. **Select 1-3 aspects** from that tradition/discipline
3. **Pick effect template** (damage, buff, debuff, summon, zone, utility)
4. **Choose delivery method** (single-target, blast shape, enchant, etc.)
5. **Determine rank** (0-5 based on desired power)
6. **Apply template formula** for mechanical values
7. **Write spell description** with flavor and mechanics
8. **Validate** against all combination rules

---

## Advanced Techniques

### Heightening
Some spells can be cast at higher ranks for increased power:

```markdown
**Heighten.**
**(Rank 2)** Deal +6/12/18 damage instead.
**(Rank 3)** Deal +8/16/24 damage instead.
```

Use for spells that scale well without additional complexity.

### Multi-Effect Spells
Combine templates for hybrid effects (reduce power of each):

```markdown
**Weak.** Deal +4 damage (Template 1) and target is slowed (Template 3).
```

Reduce damage by 1-2 steps from standard to account for added condition.

### Conditional Effects
Add situational bonuses or effects:

```markdown
**Strong.** Deal +8 damage. If target is already burning, deal +4 additional damage.
```

### Scaling by Success Level
Create meaningful differences between Weak/Strong/Critical:

- **Weak**: Base effect
- **Strong**: Enhanced effect + additional target or condition
- **Critical**: Maximum effect + multiple benefits or long duration

---

## Quality Assurance

Before finalizing a spell, ask:

1. **Is it thematic?** Do the aspects clearly convey the spell's identity?
2. **Is it balanced?** Does the power level match the rank?
3. **Is it clear?** Can a GM adjudicate this without ambiguity?
4. **Is it useful?** Does this solve problems or create interesting decisions?
5. **Is it unique?** Does this offer something existing spells don't?
6. **Is it bounded?** Does it respect the Rank 5 power ceiling?

---

## Conclusion

This framework provides systematic guidance for creating spells that:
- Maintain thematic consistency through aspect selection
- Use proven mechanical templates for balance
- Respect Nexus RPG's bounded power philosophy
- Support both internal design and GM homebrewing

By following these guidelines, you can create spells that feel both evocative and mechanically sound, capturing the modular spirit of Spheres of Power while preserving Nexus RPG's tight balance control.
