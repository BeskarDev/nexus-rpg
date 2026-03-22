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

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. If the attack is ranged and misses, you can redirect the projectile to one target within close range, dealing +2 physical damage.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Telekinetics' projectile redirection as secondary effect. No SL scaling — one reliable defensive reaction.

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

**Weak.** Deal +2 physical damage. The target is briefly slowed as crushing pressure restricts their movement.
**Strong.** Deal +4 physical damage. The target is briefly slowed.
**Critical.** Deal +6 physical damage. The target is briefly restrained by the crushing force.

> **Design Note**: Fills R0 crush gap. The primary crush condition (slowed — movement restriction from pressure) is reliable on any success. SL scales damage, with restrained as a Critical bonus. Slowed at R0 is appropriate for a no-Focus cantrip; restrained is reserved for Critical to prevent free-cantrip lockdown every turn.

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

**Weak.** Gravity reverses in a medium area for a short duration. All creatures and loose objects in the area "fall" upward to the ceiling or 10 meters, taking fall damage. Creatures can attempt to grab onto fixed objects (Strength + Athletics vs. Hard TN). Creatures that fail their save are suspended in the air, prone and unable to move normally.
**Strong.** As Weak. Suspended creatures also suffer +1 bane on all attack rolls. You can selectively exclude up to 2 creatures from the effect.
**Critical.** As Weak. Suspended creatures suffer +2 banes on all attack rolls. You can selectively exclude up to 4 creatures. Ranged attacks made into or out of the reversed gravity zone suffer +1 bane.

> **Design Note**: R5 capstone — area control through gravity manipulation. Area (medium) and duration (short) are fixed on any success — the reversal is reliable. SL scales combat penalties on suspended creatures and ally exclusion. Powerful but not instant-win — creatures can grab objects, and the caster must concentrate.

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

**Weak.** One creature is restrained for a short duration as the sphere closes around them. At the start of each of their turns, they take +3 physical damage (crush). They can attempt to escape (Strength + Athletics vs. your casting result) at the end of each of their turns.
**Strong.** As Weak, but damage increases to +6 per turn.
**Critical.** As Weak, but damage increases to +9 per turn and escape attempts suffer +1 bane.

> **Design Note**: Fills R2 crush gap. The primary condition (restrained for short duration) is fixed on any success — SL scales crushing damage. Escape is always possible, and concentration is required. Pairs well with Telekinetic Crush (R1) as a setup → payoff chain.

### Force Wall

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Hard TN | Close | concentrate

*You thrust your hands outward and an invisible wall of pure telekinetic force materializes, blocking passage and deflecting attacks.*

**Weak.** Create an impassable wall of telekinetic force up to close area in length and 3 meters tall within close range. The wall lasts for a short duration while you concentrate. Creatures and projectiles cannot pass through it. The wall is invisible but shimmers faintly when struck.
**Strong.** The wall lasts for a short duration and can be shaped (curved, angled, or circular). Ranged attacks that strike the wall are deflected harmlessly. Creatures pushed against the wall take +4 physical damage from the impact.
**Critical.** The wall lasts for a medium duration. Creatures pushed against it take +6 physical damage. You can create openings in the wall at will, allowing selective passage for allies.

> **Design Note**: R3 defensive/control spell. Creates tactical battlefield division — fits "repel" trait. Concentration prevents stacking multiple walls. Pairs with Kinetic Push/Shockwave to push enemies into the wall for bonus damage.

### Telekinetic Storm

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Medium | —

*You seize every loose object in the area — stones, debris, weapons, furniture — and hurl them in a devastating whirlwind of telekinetic fury.*

**Weak.** All creatures in a short area take +5 physical damage as objects batter them from every direction. Targets are briefly prone from the barrage.
**Strong.** Targets take +10 physical damage, are prone, and the area becomes difficult terrain (scattered debris) for a short duration.
**Critical.** Targets take +15 physical damage, are prone, the area becomes difficult terrain for a short duration, and each target is pushed one area away from the center of the storm.

> **Design Note**: R4 AoE damage with battlefield control. Damage uses half single-target R4 scaling (+5/+10/+15). The prone + difficult terrain + push effects create a devastating area denial tool. Requires loose objects in the environment — doesn't work in an empty room.

### Absolute Telekinesis

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge (creatures) or Hard TN (objects) | Long | concentrate

*You extend your will across the battlefield with absolute authority over matter and motion — lifting gates, hurling boulders, pinning warriors in place, reshaping the physical world through sheer mental force.*

**Weak.** You can telekinetically manipulate up to 3 objects or creatures within long range for a short duration. Objects: lift and move massive objects (boulders, gates, wagons) at will. Creatures (vs. Dodge): the target is briefly restrained as you hold them in place. Restrained creatures can attempt to break free (Strength + Athletics vs. your casting result) at the end of each of their turns. You can hurl objects at targets, dealing +6 physical damage on impact.
**Strong.** As Weak. Restrained creatures take +4 physical damage per turn from crushing force. Hurled object damage increases to +10.
**Critical.** As Strong. Restrained creatures take +6 physical damage per turn and suffer +1 bane on break-free attempts. Hurled object damage increases to +14. You can hurl massive objects (ships' masts, building columns).

> **Design Note**: R5 utility/offense capstone — the pinnacle of telekinetic power. Target count (up to 3) and duration (short) are fixed on any success — mastery is reliable. SL scales damage dealt through crushing and hurled objects. Concentration prevents passive abuse.

## Cross-School Spell Sharing

**No Natural Mystic Overlap**

Telekinetics has no significant thematic overlap with any Mystic tradition. The discipline's identity — transgressive force without physical contact — is distinctly arcane in nature. While Tempest (Mystic) involves physical force through storms, the mechanism (divine weather control vs. mental kinetic manipulation) is fundamentally different.

No shared spells are recommended for this discipline.

> **Design Note**: Telekinetics is one of the most purely arcane disciplines, with no reverent or communal equivalent in Mystic traditions.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Move chain**: Weak Telekinesis (R0) → Telekinetic Volley (R1) → Strong Telekinesis (R2) → Kinetic Barrage (R3 proposed) → *gap at R4* → Absolute Telekinesis (R5 proposed)
2. **Repel chain**: Kinetic Push (R0) → Shockwave (R1) → *gap at R2* → Distortion Field (R3\*)/Force Wall (R3 proposed) → *gap at R4-R5*
3. **Levitate chain**: Minor Levitation (R0 proposed) → *gap at R1* → Levitation (R2) → *gap at R3-R4* → Gravity Reversal (R5 proposed)
4. **Crush chain**: Pressure Grip (R0 proposed) → Telekinetic Crush (R1) → Crushing Sphere (R2 proposed) → *gap at R3* → *gap at R4* → Absolute Telekinesis (R5 proposed, restraint + crush damage)
5. **Gravity chain**: Gravity Shift (R0 proposed) → Gravity Orb (R1) → Stasis (R2) → *gap at R3* → Invert Gravity (R4\*)/Telekinetic Storm (R4 proposed) → Gravity Reversal (R5 proposed)

### Setup + Payoff Combos
- ✅ **Push into hazard → bonus damage**: Forced movement into environmental hazards or Force Wall is a core tactical loop
- ✅ **Prone → follow-up attacks**: Kinetic Push/Gravity Shift/Telekinetic Storm knock prone → melee allies exploit prone targets
- ✅ **Force Wall + Push**: Create wall, then push enemies into it for bonus damage — explicit spell-to-spell synergy
- ✅ **Crush chain escalation**: Pressure Grip (R0) → Crushing Sphere (R2) → Absolute Telekinesis (R5) provides escalating restraint + damage
- ⚠️ **Levitate → gravity drop**: Minor Levitation (R0) → Gravity Reversal (R5) conceptually linked but massive rank gap with no mid-rank gravity payoff

### Design Completeness Checklist
- [x] R1 Quick Action: Kinetic Deflection (R1 proposed) — standardized reactive defense (+2 Dodge/Parry, projectile redirection secondary)
- [x] Defensive options: Reflective Barrier (R1), Force Shield (R1 proposed), Kinetic Deflection (R1 proposed), Force Wall (R3 proposed) — strong defensive suite
- [x] Utility: Weak/Strong Telekinesis (R0/R2), Minor Levitation (R0 proposed), Gravity Shift (R0 proposed), Absolute Telekinesis (R5 proposed)
- [x] Damage across ranks: R0-R5 covered — Kinetic Barrage (R3), Telekinetic Storm (R4), Absolute Telekinesis/Gravity Reversal (R5)
- [x] Repeating conditions: Prone, restrained, pushed/pulled — consistent forced movement identity
- [x] Setup+payoff: Force Wall + Push combo, Crush chain escalation, Prone → ally exploitation
- ⚠️ **3 spells per rank minimum**: Met at R0-R3 (R0: 6, R1: 7, R2: 5, R3: 3). R4 has 2, R5 has 2 — both need one more spell
- ⚠️ **Remaining gaps**: Levitate R1/R3-R4, Crush R3-R4, Repel R2/R4-R5, R4 and R5 each need one more spell for 3-per-rank
