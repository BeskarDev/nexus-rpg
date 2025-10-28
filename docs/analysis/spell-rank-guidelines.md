# Spell Rank Design Guidelines

## Quick Reference Table

| Rank | Focus Cost | Target Number | Damage (Single) | Damage (AoE) | Max Range | Typical Duration | Area Size | Notes |
|------|------------|---------------|-----------------|--------------|-----------|------------------|-----------|-------|
| 0 | 0 | Easy (6) | +2/+4/+6 | +2/+4/+6 | Medium | Briefly-Short | Melee-Close | Cantrips, at-will |
| 1 | 2 | Medium (8) | +4/+8/+12 | +2/+4/+6 | Medium | Short-Medium | Close-Short | Basic spells |
| 2 | 4 | Hard (10) | +6/+12/+18 | +4/+8/+12 | Medium-Long | Short-Medium | Short-Medium | Fireball tier |
| 3 | 6 | Very Hard (12) | +8/+16/+24 | +6/+12/+18 | Long | Short-Medium | Medium-Long | High power |
| 4 | 8 | Extreme (14) | Variable | Variable | Long-Extreme | Short-Medium | Large | Transformations |
| 5 | 10 | Legendary (16) | +10/+20/+30 | +8/+16/+24 | Extreme | Short-Medium | Large-Extreme | Peak mortal |

## Detailed Rank Guidelines

### Rank 0 (Cantrips)

**Core Identity**: At-will utility and minor combat options. Can be cast repeatedly without resource cost.

#### Statistics
- **Focus Cost**: 0 (no cost, unlimited use)
- **Target Number**: Easy (6) for static rolls
- **Attack Rolls**: vs. Dodge, Parry, or Resist (varies by spell)
- **Range**: Typically Touch, Melee, Close, or Medium
  - Touch: Direct contact
  - Melee: Within melee range
  - Close: ~10 meters
  - Medium: ~30 meters
- **Duration**: 
  - Instantaneous (damage/effect happens immediately)
  - Briefly (until end of next turn)
  - Short (until short break, ~10 minutes)
  - Medium (1 hour, rare for rank 0)

#### Damage Scaling
**Single Target**:
- Weak Success: +2 damage
- Strong Success: +4 damage
- Critical Success: +6 damage

**Multi-Target/AoE**:
- Same as single target: +2/+4/+6
- Area: Typically melee or close range
- Targets: 1-3 creatures maximum

#### Typical Effects
- **Damage**: 2-6 damage plus spell power
- **Utility**: Simple effects (light, detect magic, minor illusions)
- **Buffs/Debuffs**: Brief conditions (1 round)
- **Healing**: 2-6 HP restoration
- **Control**: Brief grapple, slow, or minor terrain

#### Examples from System
- **Arcane Bolt** (Conjuration): +2/+4/+6 blast damage, Medium range
- **Flickering Flame** (Evocation): +2/+4/+6 fire damage, Medium range, can ignite objects
- **Restore Life** (Life): +2/+4/+6 HP healing or +3/+6/+9 radiant vs undead
- **Horrific Vision** (Illusion): +0/+2/+4 psychic, briefly frightened
- **Kinetic Push** (Telekinetics): +2/+4/+6 damage + push close/short distance

#### Design Constraints
- No concentration (instant or very brief)
- No lasting effects beyond "briefly"
- Cannot create permanent objects or creatures
- Cannot deal more than 6 base damage
- Cannot affect more than close area

---

### Rank 1 (Basic Spells)

**Core Identity**: Bread-and-butter combat and utility spells. First tier that costs resources but provides reliable effects.

#### Statistics
- **Focus Cost**: 2
- **Target Number**: Medium (8) for static rolls
- **Attack Rolls**: vs. Dodge, Parry, or Resist
- **Range**: Touch to Medium (rare Long)
  - Touch: Direct contact
  - Melee: Within melee range  
  - Close: ~10 meters
  - Short: ~20 meters
  - Medium: ~30 meters
- **Duration**:
  - Instantaneous (attacks)
  - Briefly (1 round)
  - Short (10 minutes)
  - Medium (1 hour)

#### Damage Scaling
**Single Target**:
- Weak Success: +4 damage
- Strong Success: +8 damage
- Critical Success: +12 damage

**Multi-Target/AoE** (Cone/Line):
- Weak Success: +2 damage per target
- Strong Success: +4 damage per target
- Critical Success: +6 damage per target

**Multi-Target/AoE** (Area - rare at rank 1):
- Weak Success: +3 damage per target
- Strong Success: +6 damage per target
- Critical Success: +9 damage per target

#### Area of Effect
- **Cone**: Close range (affects short cone from caster)
- **Line**: Medium range line
- **Radius**: Melee or close area (rare)
- **Targets**: Typically affects 2-6 creatures

#### Typical Effects
- **Damage**: 4-12 plus spell power (single), 2-6 plus spell power (multi)
- **Healing**: 4-12 HP (single target), 2-6 HP (multi-target rare)
- **Buffs**: +1-2 to rolls, resistance to damage type, temp HP (5-10)
- **Debuffs**: Brief to short conditions (slowed, frightened, etc.)
- **Control**: Grapple, difficult terrain, minor summons
- **Utility**: Invisibility, disguise, minor teleportation

#### Properties
- **quick**: Can be cast as Quick Action (not common)
- **concentrate**: Requires concentration to maintain
- **enchant**: Enhances person or equipment
- **singular**: Only one instance can exist
- **ritual**: Takes longer to cast (minutes)

#### Examples from System
- **Chromatic Orb** (Evocation): +4/+8/+12 elemental damage, choose fire/frost/lightning
- **Flame Burst** (Evocation): +2/+4/+6 fire cone AoE
- **Arcane Missiles** (Conjuration): Auto-hit 3 targets for +2 blast each
- **Healing Touch** (Life): +4/+8/+12 HP healing or heal 1 Wound (ritual)
- **Mirror Image** (Illusion): Create 3 defensive duplicates
- **Animate Corpse** (Necromancy): Raise 1 tier 1 undead

#### Design Constraints
- Maximum single-target damage: +12 (before spell power)
- Maximum AoE damage: +6 (before spell power)
- Duration: Maximum medium (1 hour)
- Area: Maximum short radius
- Cannot create tier 2+ creatures
- Cannot provide more than 10 temp HP
- Bonuses limited to +1-2

---

### Rank 2 (Intermediate Spells)

**Core Identity**: Fireball-tier spells. Solid battlefield impact with meaningful AoE and utility.

#### Statistics
- **Focus Cost**: 4
- **Target Number**: Hard (10) for static rolls
- **Attack Rolls**: vs. Dodge, Parry, or Resist
- **Range**: Medium to Long
  - Medium: ~30 meters
  - Long: ~60 meters
- **Duration**:
  - Instantaneous (attacks)
  - Briefly (1 round)
  - Short (10 minutes)
  - Medium (1 hour, common)

#### Damage Scaling
**Single Target**:
- Weak Success: +6 damage
- Strong Success: +12 damage
- Critical Success: +18 damage

**Multi-Target/AoE** (one rank lower):
- Weak Success: +4 damage per target
- Strong Success: +8 damage per target
- Critical Success: +12 damage per target

#### Area of Effect
- **Cone**: Short to medium range
- **Line**: Medium to long range
- **Radius**: Close to short area
- **Targets**: 4-10+ creatures

#### Typical Effects
- **Damage**: 6-18 plus spell power (single), 4-12 plus spell power (AoE)
- **Healing**: 6-18 HP (single), 4-12 HP (AoE)
- **Buffs**: +2-3 to rolls, multiple resistances, temp HP (10-20)
- **Debuffs**: Short to medium duration conditions
- **Control**: Strong grapple/restraint, summon tier 2 creatures, teleportation
- **Utility**: Greater invisibility, scrying, zone control

#### Heightening
Many rank 2 spells can be heightened to rank 3 for enhanced effects:
- Increased damage: Single +8/+16/+24, AoE +6/+12/+18
- Larger area
- Additional targets
- Longer duration

#### Examples from System
- **Fireball** (Evocation): +4/+8/+12 fire AoE damage in close area, Medium range (current system, matches AoE scaling)
- **Lightning Strike** (Evocation): +4/+8/+12 lightning line damage (current system, matches AoE scaling)
- **Arcane Barrier** (Conjuration): Create force wall with 20 HP, 4 AV
- **Invisibility** (Illusion): Become invisible for short duration
- **Healing Burst** (Life): +4/+8/+12 HP to all allies in cone (current system, matches AoE scaling)
- **Summon Aberration** (Conjuration): Summon tier 2 creature

**Note**: Current system uses +4/+8/+12 for rank 2 AoE, which correctly follows "one rank lower" scaling (rank 1 single-target damage).

#### Design Constraints
- Maximum single-target damage: +18 base (before spell power)
- Maximum AoE damage: +12 base (one rank lower)
- Heightened single maximum: +24 base (rank 3)
- Heightened AoE maximum: +18 base (rank 3 AoE = rank 2 single)
- Duration: Maximum medium (1 hour)
- Area: Maximum short radius
- Cannot create tier 3+ creatures (base)
- Temp HP maximum: 20
- Bonuses limited to +2-3

---

### Rank 3 (High-Power Spells)

**Core Identity**: Major battlefield impact. Characters earn renown for using these. Signature powerful spells.

#### Statistics
- **Focus Cost**: 6
- **Target Number**: Very Hard (12) for static rolls
- **Attack Rolls**: vs. Dodge, Parry, or Resist
- **Range**: Medium to Long (some Extreme)
  - Long: ~60 meters
  - Very Long: ~120 meters
- **Duration**:
  - Instantaneous (attacks)
  - Briefly (1 round)
  - Short (10 minutes, common)
  - Medium (1 hour)

#### Damage Scaling
**Single Target**:
- Weak Success: +8 damage
- Strong Success: +16 damage
- Critical Success: +24 damage

**Multi-Target/AoE** (one rank lower):
- Weak Success: +6 damage per target
- Strong Success: +12 damage per target
- Critical Success: +18 damage per target

**Hybrid Effects** (Damage + Healing):
- Single target damage: +8/+16/+24 to enemies
- AoE damage: +6/+12/+18 to enemies
- Healing: +4/+8/+12 to allies (half single damage value)

#### Area of Effect
- **Cone**: Medium to long range
- **Line**: Long range
- **Radius**: Medium to long area
- **Targets**: 6-15+ creatures

#### Typical Effects
- **Damage**: 8-24 plus spell power (single), 6-18 plus spell power (AoE)
- **Healing**: 8-24 HP (single), 6-18 HP (group)
- **Buffs**: Powerful transformations, multiple effects, significant bonuses
- **Debuffs**: Paralysis, petrification, long-lasting conditions
- **Control**: Summon tier 3 creatures, major terrain alteration, mass effects
- **Utility**: Long-range teleportation, powerful illusions, major zone control

#### Special Characteristics
- Often provide multiple benefits simultaneously
- May have powerful unique effects (re-roll tests, immunity to conditions)
- Battlefield-defining spells
- Some last entire encounters

#### Examples from System
- **Black Flame Bolt** (Evocation): +6/+12/+18 fire single-target (current system uses rank 2 single value, should be +8/+16/+24)
- **Arcane Blast** (Conjuration): +6/+12/+18 blast single-target (current system uses rank 2 single value, should be +8/+16/+24)
- **Solar Flare** (Light): +6/+12/+18 radiant AoE + heal allies +3/+6/+9 (current system, correctly uses rank 2 single for AoE)
- **Blessing of Dawn** (Light): Regen 4 HP/turn, immunity to fear/charm, see through illusions, re-roll tests
- **Phantasmal Killer** (Illusion): Repeated psychic damage + fear, concentrated terror
- **Dimension Door** (Conjuration): Teleport to long range location
- **Petrification** (Nature): Turn creature to stone (tier limited)

**Note**: Current system rank 3 spells use +6/+12/+18, which should be updated to +8/+16/+24 for single-target and +6/+12/+18 for AoE (one rank lower).

#### Design Constraints
- Maximum single-target damage: +24 base (before spell power)
- Maximum AoE damage: +18 base (one rank lower)
- Duration: Maximum medium (1 hour), some short for powerful effects
- Area: Maximum long radius
- Can create/summon tier 3 creatures
- Powerful buffs but still bounded (not invulnerability)
- Effects are escapable (saves, counterspells)

---

### Rank 4 (Transformation Spells)

**Core Identity**: Among the best in a city-state. Focus on transformations, massive environmental control, and sustained empowerment rather than direct damage.

#### Statistics
- **Focus Cost**: 8
- **Target Number**: Extreme (14) for static rolls
- **Attack Rolls**: Rare (most are buffs/utility)
- **Range**: Self to Extreme
  - Extreme: ~240 meters (large-scale environmental)
- **Duration**:
  - Short (10 minutes, common for transformations)
  - Medium (1 hour, environmental)
  - Can be extended by recasting

#### Damage Philosophy
Rank 4 spells rarely deal direct damage. Instead they:
- Add damage to other spells (add Arcana/Mysticism to damage)
- Provide sustained damage over time (+2-4 per turn in auras)
- Transform the caster for enhanced combat capability

**Environmental Damage**:
- Massive effects: +12-16 damage (ignoring partial AV)
- Affects huge areas or multiple creatures
- Often repeatable each turn

#### Area of Effect
- **Self**: Transformation and empowerment
- **Close to Short**: Personal auras and zones
- **Long to Extreme**: Environmental manipulation
- **Massive Scale**: Can affect entire battlefields or regions

#### Typical Effects
- **Transformations**: 
  - Gain flight, temp HP (10+), multiple resistances
  - Add skill rank to spell damage
  - Reduce spell costs (-2 Focus)
  - Enhanced physical/magical capabilities
  - Duration: Short (can extend by recasting)
  - Drawback: Fatigue when ends
  
- **Environmental Control**:
  - Manipulate weather, water, terrain over extreme distances
  - Reshape battlefield fundamentally
  - Create massive zones of effect
  - Duration: Medium or sustained
  
- **Utility**:
  - Planar travel (incomplete in current system)
  - Major summoning (tier 4 creatures)
  - Reality-bending effects (limited)

#### Properties
- **concentrate**: Always required
- **enchant (body)**: For transformation spells
- Often have significant drawbacks (Fatigue, paralysis)

#### Examples from System
- **Arcane Empowerment** (Conjuration): Add Arcana to damage, -2 Focus cost, 8 damage type resistances, short duration, 1 Fatigue when ends
- **Embrace of Night** (Twilight): Invisible in darkness, phase through walls, -2 Focus, resistances
- **Avatar of Storms** (Tempest): Flight, 10 temp HP, resistances, add Mysticism to damage, +2 retaliation
- **Control Water** (Tempest): Massive water manipulation (floods, splits, redirects) over extreme range
- **Death's Embrace** (Necromancy - incomplete): Undead transformation

#### Design Constraints
- Direct damage rare, focus on empowerment
- Transformations: Short duration maximum
- Always require concentration
- Always have drawbacks (Fatigue, paralysis, etc.)
- Cost-reduction limited to -2 Focus
- Damage additions: Add skill rank (not multipliers)
- Temp HP: 10-20 maximum
- Environmental effects bounded to extreme range
- Cannot create permanent changes

---

### Rank 5 (Peak Mortal Power)

**Core Identity**: Pinnacle of mortal magical achievement. Legendary spells that define casters but remain bounded within mortal limits. Equivalent to D&D Level 7, NOT Level 9.

#### Statistics
- **Focus Cost**: 10
- **Target Number**: Legendary (16) for static rolls
- **Attack Rolls**: vs. Dodge, Parry, or Resist
- **Range**: Long to Extreme
  - Long: ~60 meters
  - Extreme: ~240 meters
- **Duration**:
  - Short (10 minutes, most common)
  - Medium (1 hour, maximum)
  - **Never permanent**

#### Damage Scaling
**Single Target**:
- Weak Success: +10 damage
- Strong Success: +20 damage
- Critical Success: +30 damage

**Multi-Target/AoE** (one rank lower - uses Rank 3 single):
- Weak Success: +8 damage per target
- Strong Success: +16 damage per target
- Critical Success: +24 damage per target

**Note**: AoE damage uses rank 3 single-target values, maintaining bounded power while providing meaningful progression.

#### Area of Effect
- **Large Areas**: Medium to long radius
- **Extreme Range**: Can target distant locations
- **Mass Effects**: Affect 8-12+ creatures
- **Not Unlimited**: Still bounded to battlefield scale

#### Typical Effects

**Offensive Spells**:
- Single-target damage: +10/+20/+30 plus spell power
- AoE damage: +8/+16/+24 plus spell power
- Area: Large (medium to long radius)
- Additional effects: Conditions, terrain changes
- Escapable: Always allow saves or countermeasures

**Transformation Spells** (Enhanced Rank 4):
- All rank 4 benefits
- Enhanced damage bonus (+4 instead of +2)
- Additional unique abilities
- Still short duration
- Still have drawbacks (2 Fatigue instead of 1)

**Healing/Support**:
- Mass healing: +10/+20/+30 HP to multiple allies
- Continuous healing: +6 HP per turn in zone
- Cure conditions and Wounds
- Temporary, not resurrection

**Control**:
- Animate tier 4 creatures (temporarily)
- Massive terrain manipulation
- Powerful but escapable control effects
- Short to medium duration

**Utility**:
- Planar travel (to known locations)
- Perfect disguises (but detectable)
- Shared mental spaces
- Mass transportation

#### Properties
- **concentrate**: Common but not universal
- **enchant (body)**: For transformation types
- Often costly (2 Fatigue, other drawbacks)
- Legendary TN (16) makes them difficult to cast

#### Power Principles
1. **Impressive but Bounded**: Powerful effects within mortal limits
2. **Escapable**: Saves, dispels, counterspells always available
3. **Temporary**: Maximum medium duration (no permanent effects)
4. **Costly**: Focus 10, often 2 Fatigue or other costs
5. **Difficult**: Legendary TN (16) - hard to cast reliably
6. **Mortal Scale**: Battlefield impact, not city-destroying
7. **No Instant Wins**: No auto-kills, no reality warping
8. **Counterable**: Can be disrupted, dispelled, or resisted

#### Example Concepts (from power analysis)
- **Delayed Meteor** (Evocation): +8/+16/+24 fire AoE in medium area, delayed detonation, Long range
- **Mass Restoration** (Life): Heal +10/+20/+30 HP single or +8/+16/+24 HP group, remove all conditions, heal 1 Wound from each ally
- **Storm Lord** (Tempest): Flight, add Mysticism to storm damage, immunity to weather, +4 retaliation, short duration, 2 Fatigue
- **Army of Shadows** (Necromancy): Animate 4-6 tier 2 undead, short duration (not permanent)
- **Sanctuary Sphere** (Peace): Peace zone in medium area, violence difficult but possible, healing over time
- **Warlord's Presence** (War): Add Mysticism to weapon damage, extra attacks, inspire allies, short duration, 2 Fatigue

#### What Rank 5 is NOT
❌ Reality warping (no Wish)
❌ Permanent effects (no True Polymorph)
❌ Resurrection from long-dead (no True Resurrection)
❌ City-destroying power (no Meteor Swarm)
❌ Time manipulation (no Time Stop)
❌ Immortality or invulnerability
❌ Automatic success/instant wins
❌ Permanent summons or creations

#### Design Constraints
- Maximum single-target damage: +30 base (before spell power)
- Maximum AoE damage: +24 base (one rank lower - uses rank 3 single)
- Duration: Maximum medium (1 hour)
- Area: Maximum extreme range or long radius
- Temp HP maximum: 30-40
- Transformations: 150% of rank 4 power, not 200%+
- Always escapable (saves, concentration breaks, counterspells)
- Always temporary
- Always costly (high Focus, Fatigue, other drawbacks)
- Target tier limits still apply
- Cannot create permanent changes to reality

---

## Special Mechanics by Rank

### Concentration
- **Ranks 0-1**: Rare
- **Rank 2**: Common for sustained effects
- **Rank 3-4**: Very common for powerful effects
- **Rank 5**: Common but not universal

Breaking concentration:
- Take damage: Roll vs. TN equal to damage taken
- Other disruption as determined by GM

### Heightening
Spells can be cast at higher ranks for enhanced effects:
- **Rank 1 → 2**: Usually +50% damage or effect
- **Rank 2 → 3**: Usually +50% damage or effect
- Specific heightening options listed per spell

### Properties Quick Reference

| Property | Meaning | Common Ranks |
|----------|---------|--------------|
| **quick** | Cast as Quick Action | 0-2 |
| **concentrate** | Requires concentration | 2-5 |
| **enchant (X)** | Enhances person/equipment | 1-5 |
| **singular** | Only one instance exists | 1-3 |
| **ritual (X)** | Takes extended time | 1-4 |
| **illusory** | Can be detected/disbelieved | 0-3 |
| **material (X)** | Requires component, not consumed | 1-4 |
| **material cost (X)** | Component consumed | 2-5 |
| **blast (cone/line)** | Area effect shape | 1-5 |

---

## Damage Type Reference

### Physical Damage Types
- **Physical**: Generic physical harm
- **Slash**: Cutting weapons (extra vs light armor)
- **Pierce**: Piercing weapons (re-roll failed attacks)
- **Crush**: Bludgeoning weapons (ignore half AV)

### Elemental Damage Types
- **Fire**: Ignites, creates burning condition
- **Frost**: Slows, creates difficult terrain
- **Lightning**: Chains between targets, staggers
- **Acid**: Ignores half AV, corrodes equipment

### Energy Damage Types
- **Blast/Force**: Pure kinetic energy, ignores half AV
- **Radiant**: Holy/light energy, extra vs undead
- **Necrotic**: Death energy, prevents healing
- **Psychic**: Mental damage, ignores armor completely

### Special Damage Types
- **Poison**: Toxins, creates poisoned condition

---

## Range Reference

| Range | Distance | Typical Use |
|-------|----------|-------------|
| Touch | Direct contact | Healing, melee attacks |
| Melee | Weapon reach | Melee spell attacks |
| Close | ~10 meters | Personal AoE, nearby targets |
| Short | ~20 meters | Medium-range spells |
| Medium | ~30 meters | Standard spell range |
| Long | ~60 meters | Long-range attacks |
| Very Long | ~120 meters | Extreme range (rare) |
| Extreme | ~240 meters | Environmental, strategic |

---

## Duration Reference

| Duration | Length | Typical Use |
|----------|--------|-------------|
| Instantaneous | Immediate | Damage, healing, immediate effects |
| Briefly | Until end of next turn | Cantrip conditions, quick buffs |
| Short | Until short break (~10 min) | Combat buffs, sustained spells |
| Medium | 1 hour | Long-lasting buffs, utility |
| Long | Until long rest (~8 hours) | Curses, long-term enchantments |

---

## Area of Effect Reference

| Area Size | Approximate Radius | Creatures Affected |
|-----------|-------------------|-------------------|
| Melee | ~2 meters | 2-4 creatures |
| Close | ~5 meters | 4-8 creatures |
| Short | ~10 meters | 6-12 creatures |
| Medium | ~20 meters | 10-20 creatures |
| Long | ~30 meters | 15-30 creatures |

**Cone/Line Areas**:
- Cone: Width increases with distance (final width ~half range)
- Line: Straight path to target point

---

## Design Philosophy Summary

### Power Curve Principles
1. **Rank 0**: Unlimited but weak (at-will utility)
2. **Rank 1**: Reliable combat effectiveness (2 Focus)
3. **Rank 2**: Battlefield impact (Fireball tier)
4. **Rank 3**: Signature powerful spells (memorable)
5. **Rank 4**: Transformative effects (few but impactful)
6. **Rank 5**: Peak mortal magic (legendary but bounded)

### Bounded Power Philosophy
- **Mortal Scale**: Magic affects encounters and battles, not entire wars or worlds
- **Temporary**: No permanent reality changes
- **Escapable**: Always counterable or resistible
- **Costly**: Higher ranks require significant resources
- **Difficult**: Higher TNs make powerful magic unreliable
- **Balanced**: Share power with magic items, not just spells

### Bronze Age Sword & Sorcery
Magic in Nexus RPG should feel:
- **Ancient and Mysterious**: Not scientific or systematic
- **Powerful but Dangerous**: High-rank magic has costs
- **Bound by Mortality**: Even at rank 5, casters are mortal
- **Culturally Significant**: Magic tied to traditions and disciplines
- **Tactically Deep**: Many options, meaningful choices
- **Memorable**: Spells create memorable moments, not routine solutions

---

## Quick Reference: Spell Design Checklist

When designing a new spell, verify:

### Rank Appropriate?
- [ ] Focus cost matches rank (0/2/4/6/8/10)
- [ ] Target number matches rank (6/8/10/12/14/16)
- [ ] Damage within rank guidelines
- [ ] Duration appropriate for rank
- [ ] Range appropriate for rank
- [ ] Area size appropriate for rank

### Mechanically Sound?
- [ ] Clear trigger and effect
- [ ] Defines all Success Levels (Weak/Strong/Critical)
- [ ] Uses correct bonus types if applicable
- [ ] Follows existing spell property conventions
- [ ] Interacts cleanly with other systems

### Balanced?
- [ ] Not strictly better than existing spells
- [ ] Provides interesting tactical choice
- [ ] Escapable/counterable
- [ ] Respects bounded power ceiling
- [ ] Appropriate cost for effect

### Thematically Appropriate?
- [ ] Fits discipline/tradition theme
- [ ] Appropriate cultural flavor
- [ ] Bronze Age sword & sorcery feel
- [ ] Mortal-scale power (especially ranks 4-5)

---

**End of Spell Rank Guidelines**

Use this document as a reference when creating or evaluating spells to ensure consistency, balance, and thematic appropriateness across all ranks.
