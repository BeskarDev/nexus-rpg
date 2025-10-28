# Spell Rank Design Guidelines

## Quick Reference Table

| Rank | Focus | TN | Single | AoE | Range | Duration | Area | Key Features |
|------|-------|-----|--------|-----|-------|----------|------|--------------|
| **0** | 0 | 6 | +2/+4/+6 | +0/+2/+4 | Medium | Brief-Short | Melee-Close | At-will, cantrips, unlimited use |
| **1** | 2 | 8 | +4/+8/+12 | +2/+4/+6 | Medium | Short-Medium | Close-Short | Basic combat/utility |
| **2** | 4 | 10 | +6/+12/+18 | +4/+8/+12 | Medium-Long | Short-Medium | Short-Medium | Fireball tier, concentration starts |
| **3** | 6 | 12 | +8/+16/+24 | +6/+12/+18 | Long | Short-Medium | Medium-Long | High power, encounter-defining |
| **4** | 8 | 14 | Variable | Variable | Long-Extreme | Short-Medium | Large | Transformations, buffs, control |
| **5** | 10 | 16 | +10/+20/+30 | +8/+16/+24 | Extreme | Short-Medium | Large-Extreme | Peak mortal, bounded power |

**Damage Scaling Rules**:
- **Single-Target**: +2 per rank progression (2→4→6→8→10 weak damage)
- **AoE Standard**: One rank lower damage (balances multi-target)
- **Rank 0 AoE**: Special case +0/+2/+4 (balances unlimited casting)

---

## Core Mechanics

### Damage by Success Level
- **Weak Success** (0-2 above TN): Base damage value
- **Strong Success** (3-5 above TN): 2× base damage
- **Critical Success** (6+ above TN): 3× base damage

### Range Categories
- **Touch**: Direct contact
- **Melee**: Within melee range (~2m)
- **Close**: ~10 meters
- **Short**: ~20 meters
- **Medium**: ~30 meters
- **Long**: ~60 meters
- **Very Long**: ~120 meters
- **Extreme**: ~250+ meters

### Duration Categories
- **Instantaneous**: Immediate effect
- **Briefly**: Until end of caster's next turn
- **Short**: Until short break (~10 minutes)
- **Medium**: 1 hour
- **Long**: Until night's rest (~8 hours)

### Area Sizes
- **Melee**: Small area around caster
- **Close**: ~10m radius/cone/line
- **Short**: ~20m radius/cone/line
- **Medium**: ~30m radius/cone/line
- **Long**: ~60m radius/cone/line
- **Very Long**: ~120m radius/cone/line

---

## Rank-by-Rank Guide

### Rank 0 (Cantrips)
**Core Identity**: At-will spells, unlimited use, minor effects

**Capabilities**:
- Damage: +2/+4/+6 single, +0/+2/+4 AoE
- No concentration required
- Brief effects only (max "short" duration)
- Melee-Close area maximum
- 1-3 targets maximum

**Examples**: Arcane Bolt, Flickering Flame, Restore Life, Horrific Vision, Kinetic Push

**Constraints**:
- No lasting effects beyond "briefly"
- No permanent creation
- No more than 6 base damage
- AoE reduced to prevent spam

---

### Rank 1 (Basic Spells)
**Core Identity**: Bread-and-butter combat and utility

**Capabilities**:
- Damage: +4/+8/+12 single, +2/+4/+6 AoE (cone/line)
- Range: Touch to Medium
- Duration: Instantaneous to Medium
- Area: Close-Short cones/lines
- Concentration: Rare, for sustained effects

**Examples**: Magic Missile, Burning Hands, Shield, Healing Touch, Charm Person

**Typical Effects**:
- Reliable single-target damage (4-12)
- Small area attacks (2-6 per target)
- Short buffs/debuffs
- Basic utility (light, detect, unlock simple locks)

**Properties**: May have **quick**, **enchant**, **singular**, **illusory**

**Constraints**:
- Maximum "medium" duration
- Single-target control effects only
- No permanent changes

---

### Rank 2 (Intermediate Spells)
**Core Identity**: Fireball-tier power, concentration common

**Capabilities**:
- Damage: +6/+12/+18 single, +4/+8/+12 AoE
- Range: Medium-Long
- Duration: Short-Medium (concentration extends this)
- Area: Short-Medium radius/cone/line
- Multi-target effects common

**Examples**: Fireball, Invisibility, Hold Person, Lesser Restoration, Shatter

**Typical Effects**:
- Moderate single-target damage (6-18)
- Area damage (4-12 per target)
- Battlefield control (small areas)
- Moderate healing/restoration
- Illusions and deceptions

**Heightening**: Common; +50% effect when cast at Rank 3

**Properties**: **concentrate**, **enchant**, **ritual**, **illusory**, **material**

**Constraints**:
- Concentration breaks on damage/disruption
- Area limited to "medium" range
- Effects are temporary (no permanence without ritual)

---

### Rank 3 (High-Power Spells)
**Core Identity**: Encounter-defining effects, high power

**Capabilities**:
- Damage: +8/+16/+24 single, +6/+12/+18 AoE
- Range: Long
- Duration: Short-Medium (often concentration)
- Area: Medium-Long radius/cone/line
- Powerful control and utility

**Examples**: Lightning Bolt, Haste, Dispel Magic, Revivify, Counterspell

**Typical Effects**:
- High single-target damage (8-24)
- Area damage (6-18 per target)
- Multi-creature buffs/debuffs
- Significant control (terrain, movement)
- Moderate resurrections/restorations

**Special Characteristics**:
- Can shape encounters significantly
- Often provides tactical choices (area shape, target selection)
- May have ongoing effects that change battlefield

**Properties**: **concentrate**, **ritual**, **material cost**, **singular**

**Constraints**:
- Concentration still breakable
- Maximum "medium" duration
- Cannot create permanent changes without cost
- Effects are escapable (saves, countermeasures)

---

### Rank 4 (Transformation Spells)
**Core Identity**: Major transformations, powerful buffs/control

**Damage Philosophy**: Most Rank 4 spells don't deal direct damage. Focus is on:
- Polymorphing (alter form/abilities)
- Major buffs (+4 to attributes, flight, resistances)
- Powerful control (walls, zones, domination)
- Utility (teleportation, planar effects, scrying)

**Capabilities**:
- Damage: Variable (when applicable)
- Range: Long-Extreme
- Duration: Short-Medium (concentration common)
- Area: Large (affects multiple areas or whole encounters)
- Transformative effects

**Examples**: Polymorph, Greater Invisibility, Wall of Force, Dimension Door, Banishment

**Typical Effects**:
- Form alterations (beast forms, enlarged/reduced)
- Major tactical advantages (flight, invisibility, teleport)
- Powerful barriers and zones
- Plane-touching effects (banishment, summoning)

**Properties**: **concentrate**, **ritual**, **material cost**, **singular**, **enchant**

**Constraints**:
- Transformations are temporary
- Concentration required for most
- No instant-win conditions
- Bounded to mortal scale

---

### Rank 5 (Peak Mortal Power)
**Core Identity**: Legendary mastery, NOT world-shattering

**Capabilities**:
- Damage: +10/+20/+30 single, +8/+16/+24 AoE
- Range: Extreme
- Duration: Short-Medium (max, never permanent)
- Area: Large-Extreme (multiple areas, whole battlefields)
- Peak tactical and strategic effects

**Power Level**: D&D Level 7 equivalent (Delayed Blast Fireball, Plane Shift), NOT Level 9 (Wish, Meteor Swarm)

**Typical Effects**:
- Maximum single-target damage (10-30)
- Large area damage (8-24 per target)
- Mass buffs/healing (affect squads/parties)
- Major control (reshape battlefield, dominate groups)
- Legendary utility (long-range teleport, major divination)

**Example Concepts**:
- *Delayed Meteor* (Evocation): +8/+16/+24 AoE, massive blast
- *Mass Restoration* (Life): +10/+20/+30 healing or +8/+16/+24 to group
- *Storm Lord* (Tempest): Control weather in large area, summon storm
- *Warlord's Presence* (War): Buff entire squad, battlefield command

**Power Principles** (Rank 5 is NOT):
- ✗ Reality warping (no Wish)
- ✗ Instant kills (save opportunities exist)
- ✗ Permanent effects (max "medium" duration)
- ✗ City-destroying (bounded area)
- ✗ Auto-win conditions (always escapable)
- ✗ Raising armies (limited summons)
- ✗ Invulnerability (can be countered)

**Properties**: **concentrate**, **ritual**, **material cost**, **singular**

**Constraints**:
- Always costly (Focus 10, often additional costs)
- Maximum "medium" duration
- Bounded to mortal scale
- Must be escapable
- Cannot create permanence
- Power shared with magic items

---

## Damage Scaling Deviations

### When to Adjust Standard Scaling

The standard table assumes **typical area sizes** for each rank. Deviate when spell design creates significant trade-offs:

| Scenario | Adjustment | Example |
|----------|------------|---------|
| **Smaller Area** | Up to standard rank damage | Rank 2 melee AoE: +6/+12/+18 |
| **Larger Area** | Two ranks lower | Rank 2 medium area: +2/+4/+6 |
| **Strong Secondary** | -1 to -2 steps | Damage + fear: +3/+6/+9 |
| **Chain/Split** | Secondary reduced | Primary +2/+4/+6, chain +0/+2/+4 |
| **Control-Primary** | Minimal damage | Strong effect: +0/+2/+4 |

**Balance Principle**: Total spell power stays consistent. More damage = smaller area/fewer targets. More utility = less damage. More effects = each effect weaker.

**Examples from Current System**:
- *Shroud of Fear* (Rank 2, close area, fear effect): +3/+6/+9 (below standard)
- *Fireball* (Rank 2, close area, standard): +4/+8/+12 (standard AoE)
- *Static Spark* (Rank 0, chain lightning): Primary +2/+4/+6, secondary +0/+2/+4
- *Horrific Vision* (Rank 0, psychic + fear): +0/+2/+4 (control-primary)

---

## Spell Properties Reference

| Property | Effect | Common Ranks |
|----------|--------|--------------|
| **quick** | Cast as Quick Action | 0-2 |
| **concentrate** | Requires concentration; breaks on damage/disruption | 2-5 |
| **enchant (X)** | Enhances person/equipment for duration | 1-5 |
| **singular** | Only one instance can exist | 1-3 |
| **ritual (X)** | Extended casting time (minutes/hours) | 1-5 |
| **illusory** | Can be detected with Spirit + Perception vs Resist | 0-3 |
| **material (X)** | Requires component (not consumed) | 1-4 |
| **material cost (X)** | Component consumed on cast | 2-5 |
| **blast (cone/line)** | Directional area effect | 0-5 |

---

## Damage Types

### Physical
- **Physical**: Bludgeoning, slashing, piercing

### Elemental
- **Fire**: Burning, heat, ignition
- **Frost**: Cold, freezing, slowing
- **Lightning**: Electrical, shocking, chaining
- **Acid**: Corrosion, dissolving

### Energy
- **Radiant**: Light, holy, purifying
- **Necrotic**: Decay, death, withering
- **Blast**: Pure force, concussive
- **Psychic**: Mental, fear, confusion

### Special
- **Poison**: Toxins, venom (resisted differently)

---

## Spell Design Checklist

### 1. Rank Appropriate?
- [ ] Power level matches rank expectations
- [ ] Focus cost and TN correct for rank
- [ ] Range, duration, and area within rank limits
- [ ] Damage aligns with table (or justified deviation)

### 2. Mechanically Sound?
- [ ] Clear trigger, effect, and limits
- [ ] Success levels defined (Weak/Strong/Critical)
- [ ] Attack roll or save specified
- [ ] Duration and concentration specified
- [ ] Properties correctly applied

### 3. Balanced?
- [ ] Total spell power consistent with rank
- [ ] Trade-offs justified (damage vs area vs utility)
- [ ] Not strictly better than existing spells
- [ ] Escapable (saves, countermeasures exist)

### 4. Thematically Appropriate?
- [ ] Fits discipline/tradition identity
- [ ] Reflects Bronze Age sword & sorcery aesthetic
- [ ] Cultural flavor evocative
- [ ] Power bounded to mortal scale (especially Rank 5)

---

## Design Philosophy

### Power Curve
- Rank 0-1: Basic utility and combat
- Rank 2-3: Encounter-shaping power
- Rank 4-5: Campaign-defining legendary effects

### Bounded Power
- Rank 5 = D&D Level 7, NOT Level 9
- No reality warping, instant kills, or permanence
- All effects temporary, escapable, costly
- Power shared with magic items

### Bronze Age Sword & Sorcery
- Evocative of ancient civilizations
- Mortal heroes, not demigods
- Tactical depth through choices, not raw power
- Cultural and mythic flavor over mechanics
