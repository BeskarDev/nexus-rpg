# Telekinetics — Spell School Design Space

## School Identity

**Discipline**: Telekinetics (Arcane)
**Traits**: move, repel, levitate, crush, gravity
**Identity**: Transgressive force without physical contact — pure kinetic manipulation
**Role Spread**: Excels: Utility | Decent: Offense, Defense | Weak: Healing, Support, Control

### Mechanical Identity
- **Primary Conditions**: Prone (knocked down), restrained (held in place), pushed/pulled (forced movement)
- **Signature Gimmick**: Positioning control — moving creatures and objects, forced movement, gravity manipulation
- **Damage Types**: Physical, Blast, Lightning

### Design Principles
1. Telekinetics excels at battlefield repositioning — push, pull, levitate, drop
2. Forced movement is the primary control tool (different from conditions)
3. Blast damage (½ AV ignore) fits kinetic shockwave effects
4. **Major gaps**: No R1 Quick Action reactive spell, weak defensive options, 3+ R0 traits missing
5. Levitate/crush/gravity traits need cantrip-level representation

### Internal Synergies
- **Setup**: Push/pull target into hazard or ally's reach → **Payoff**: Prone targets take +2 damage from next attack
- **Setup**: Levitate ally → **Payoff**: Gravity-enhanced melee attacks deal bonus damage

## Current Spell Inventory (14 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Kinetic Pull, Kinetic Push, Weak Telekinesis |
| 1 | 5 | Gravity Orb, Reflective Barrier, Shockwave, Telekinetic Crush, Telekinetic Volley |
| 2 | 4 | Levitation, Orbiting Shards (incomplete), Stasis, Strong Telekinesis |
| 3 | 1 | Distortion Field (incomplete) |
| 4 | 1 | Invert Gravity (incomplete) |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| move | Weak Telekinesis | Telekinetic Volley | Strong Telekinesis | — | — | — |
| repel | Kinetic Push | Shockwave | — | Distortion Field* | — | — |
| levitate | ❌ **GAP** | — | Levitation | — | — | — |
| crush | ❌ **GAP** | Telekinetic Crush | — | — | — | — |
| gravity | ❌ **GAP** | Gravity Orb | Stasis | — | Invert Gravity* | — |

*Asterisk = incomplete spell*

**Coverage**: 10/30 slots filled (33%) — tied with Telepathy for weakest arcane discipline

**Critical Gaps**:
- **Levitate R0**: No levitation cantrip — a core fantasy expectation
- **Crush R0**: No crushing force cantrip
- **Gravity R0**: No gravity manipulation cantrip
- **Move R3+**: No advanced telekinesis above R2
- **All traits R5**: No R5 capstone. R3-R4 also extremely thin (1 each, both incomplete)

## Proposed New Spells

### Kinetic Deflection

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | quick

*You telekinetically deflect an incoming projectile, redirecting its force.*

**Weak.** As a Quick Action when targeted by a ranged attack, gain +2 to Dodge against the triggering attack.
**Strong.** Gain +4 to Dodge. If the attack misses, you deflect the projectile harmlessly.
**Critical.** Gain +4 to Dodge. If the attack misses, you redirect the projectile to another target within close range, dealing +2 physical damage to them.

> **Design Note**: Fills the missing R1 Quick Action reactive spell. Ranged-only deflection fits the telekinetic theme.

### Force Shield

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | concentrate, enchant (short)

*You maintain a shimmering barrier of telekinetic force around yourself.*

**Weak.** Gain +1 AV (situational bonus) for a short duration while concentrating.
**Strong.** Gain +2 AV (situational bonus) for a short duration.
**Critical.** Gain +2 AV (situational bonus) for a short duration. When a melee attacker hits you, they are pushed into close range.

> **Design Note**: Defensive spell for Telekinetics — force barrier fits the identity.

### Minor Levitation

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Easy TN | Close | —

*You lift a small object into the air with a thought, holding it aloft briefly.*

**Weak.** Levitate one unattended object (up to 1 load) to a height of close range for a brief duration. You can move it slowly within close range.
**Strong.** Levitate up to 2 load. You can move the object more precisely, manipulating it at distance (open doors, pull levers).
**Critical.** Levitate up to 3 load. You can throw the levitated object at a target within close range, dealing +2 physical damage.

> **Design Note**: Fills R0 levitate gap. Object-only levitation at cantrip level.

### Pressure Grip

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You close your fist and telekinetic force crushes around a target.*

**Weak.** Deal +2 physical damage. The target feels intense pressure but is not restrained.
**Strong.** Deal +4 physical damage. The target is briefly slowed as the crushing force restricts their movement.
**Critical.** Deal +6 physical damage. The target is briefly restrained by the crushing force.

> **Design Note**: Fills R0 crush gap. Single-target damage with escalating restraint.

### Gravity Shift

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You alter the pull of gravity on a creature or object, making it briefly lighter or heavier.*

**Weak.** Target one creature or object. Increase or decrease its effective weight by half for a brief duration. Heavier: target's movement is reduced by 1. Lighter: target can jump twice as far.
**Strong.** Increase or decrease weight more dramatically. Heavier: target's movement is reduced by 2 and they can't jump. Lighter: target gains +1 movement.
**Critical.** Extreme weight alteration. Heavier: target is briefly prone as gravity pins them. Lighter: target gains +2 movement and ignores difficult terrain for a brief duration.

> **Design Note**: Fills R0 gravity gap. Versatile utility with both offensive (heavy) and supportive (light) options.

### Gravity Reversal

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | concentrate

*You invert gravity in a large area, causing everything within to fall upward.*

**Weak.** Gravity reverses in a short area for a brief duration. All creatures and loose objects in the area "fall" upward to the ceiling or 10 meters, taking fall damage. Creatures can attempt to grab onto fixed objects (Strength + Athletics vs. Hard TN).
**Strong.** The area expands to medium and lasts for a short duration. Creatures that fail their save are suspended in the air, prone and unable to move normally. They can make ranged attacks at +1 bane.
**Critical.** The area is medium and lasts for a medium duration. You can selectively exclude up to 4 creatures from the effect. Suspended creatures are prone and suffer +2 banes on all attack rolls.

> **Design Note**: R5 capstone — area control through gravity manipulation. Powerful but not instant-win — creatures can grab objects, and the caster must concentrate.

### Kinetic Barrage

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | —

*You seize multiple objects in the environment — stones, debris, weapons — and hurl them at your enemies in a devastating volley.*

**Weak.** Deal +4 physical damage to all creatures in a close area. Targets are briefly pushed (forced movement 1 area away from the center).
**Strong.** Deal +8 physical damage. Targets are pushed and briefly prone.
**Critical.** Deal +12 physical damage. Targets are pushed, prone, and the area becomes difficult terrain (scattered debris) for a short duration.

> **Design Note**: Fills R3 move/repel gap. AoE at R3 uses half single-target scaling (+4/+8/+12). Environmental manipulation — uses terrain objects rather than pure force.

### Crushing Sphere

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Medium | concentrate

*You encase a creature in a sphere of concentrated telekinetic force that slowly crushes inward.*

**Weak.** One creature is briefly restrained as the sphere closes around them. At the start of their next turn, they take +3 physical damage (crush).
**Strong.** The target is restrained for a short duration. They take +6 physical damage at the start of each of their turns. They can attempt to escape (Strength + Athletics vs. your casting result).
**Critical.** As Strong, but damage increases to +9 per turn and escape attempts suffer +1 bane.

> **Design Note**: Fills R2 crush gap. Sustained single-target control — escalating damage rewards maintaining concentration. Pairs well with Telekinetic Crush (R1) as a setup → payoff chain.
