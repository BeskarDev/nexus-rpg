# Conjuration — Spell School Design Space

## School Identity

**Discipline**: Conjuration (Arcane)
**Traits**: objects, creatures, teleportation, binding, force
**Identity**: Unnatural creation and forced summoning — bringing things into existence or relocating them
**Role Spread**: Excels: Utility | Decent: Offense, Support | Weak: Healing, Defense, Control

### Mechanical Identity
- **Primary Conditions**: Restrained (force bindings), displaced (forced teleportation)
- **Signature Gimmick**: Summoning and force constructs — creating things from nothing, auto-hit missiles, teleportation
- **Damage Types**: Force (proposed — currently blast), Blast, Acid

### Design Principles
1. Conjuration is the most versatile arcane discipline — summons, missiles, teleportation, barriers, storage
2. Missile spells (Arcane Missiles, Arcane Barrage) are the signature offensive tool — auto-hit with per-missile AV reduction as the balancing weakness
3. Summoned creatures provide action economy advantage
4. Teleportation provides tactical mobility
5. **Key change**: Missile spells should use force damage (full AV per hit) instead of blast

### Internal Synergies
- **Setup**: Conjure Familiar (scout/mark target) → **Payoff**: Spells against familiar-marked targets gain +1 boon
- **Setup**: Wall of Force (split battlefield) → **Payoff**: Enemies near walls vulnerable to force damage
- **Summoning chain**: Conjure Familiar (R1) → Summon Aberration (R2) → Enhanced summoning (R5)

## Current Spell Inventory (24 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Arcane Bolt, Arcane Glyph, Extraplanar Pocket |
| 1 | 6 | Alarm, Arcane Barrier, Arcane Missiles, Conjure Familiar, Hale of Blades, Infuse Item |
| 2 | 6 | Arcane Barrage, Arcane Circle, Arcane Eye, Eldritch Tendrils, Phase Step, Summon Aberration |
| 3 | 5 | Arcane Blast, Astral Gate, Burst of Tendrils, Dimension Door, Wall of Force |
| 4 | 4 | Arcane Empowerment, Astral Body (incomplete), Force Cage (incomplete), Teleportation Circle (incomplete) |

### Trait Coverage Gaps

| Trait | R0 | R1+ | Gap |
|-------|-----|------|-----|
| objects | ✅ | ✅ | — |
| creatures | ❌ | ✅ | Missing R0 creature summon |
| teleportation | ❌ | ✅ (R2+) | Missing R0 teleport cantrip |
| binding | ❌ | ✅ | Covered at R1+ (Eldritch Tendrils, Force Cage) |
| force | ✅ | ✅ | — |

## Proposed Spell Changes

### Arcane Bolt — Change Damage Type

**Current**: Blast damage (ignores ½ AV)
**Proposed**: **Force damage** (full AV applies)
**Rationale**: Pure magical projectile. Force damage type better represents neutral magical energy.

### Arcane Missiles — Change Damage Type

**Current**: Blast damage (ignores ½ AV)
**Proposed**: **Force damage** (full AV applies per missile)
**Rationale**: Per-missile AV reduction is the intended weakness. Blast undermines this.

### Arcane Barrage — Change Damage Type + Consider Rank Move

**Current**: R2, blast damage
**Proposed**: **Force damage** (full AV applies per missile). Consider moving to R3 for power-level reasons (see §7.6 of main analysis).

### Hale of Blades — Add Damage Type

**Current**: Untyped damage
**Proposed**: **Force damage**
**Rationale**: Magical energy blades should have explicit damage type.

## Proposed New Spells

### Arcane Deflection

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | quick

*You conjure a brief barrier of arcane force to deflect an incoming attack.*

**Weak.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack.
**Strong.** Gain +4 to your Dodge or Parry against the triggering attack.
**Critical.** Gain +4 to your Dodge or Parry. If the attack misses, the barrier persists until the start of your next turn, granting +2 to Dodge or Parry against further attacks.

> **Design Note**: Fills the missing R1 Quick Action reactive spell for Conjuration. Force barrier theme.

### Conjure Vermin

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Medium TN | Close | —

*You conjure a small creature from thin air — a rat, spider, beetle, or similar vermin — for a brief task.*

**Weak.** Conjure a tiny creature that lasts briefly. It can carry a small item, serve as a brief distraction, or scout a melee-range area. The creature has 1 HP and no combat capability.
**Strong.** The creature lasts for a short duration and can scout up to close range, carrying messages or triggering simple mechanisms.
**Critical.** The creature lasts for a short duration, can carry small items up to close range, and you can see through its eyes briefly.

> **Design Note**: Fills R0 creatures gap. Non-combat utility summon.

### Blink Step

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Easy TN | Self | quick

*You briefly dissolve into arcane energy and reappear a short distance away.*

**Weak.** Teleport to an unoccupied space within melee range.
**Strong.** Teleport to an unoccupied space within close range.
**Critical.** Teleport to an unoccupied space within close range. You don't provoke attacks of opportunity from this movement.

> **Design Note**: Fills R0 teleportation gap. Very short range, cantrip-level repositioning.

### Planar Gateway

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Long | concentrate, ritual (10 minutes), material cost (500 coins)

*You tear open a shimmering portal connecting two distant locations, allowing passage between them.*

**Weak.** Create a portal to a location you have visited before on the same plane. The portal is large enough for one creature to pass through per turn. It remains open for a brief duration.
**Strong.** The portal remains open for a short duration. Up to two creatures can pass through per turn.
**Critical.** The portal remains open for a medium duration. Up to four creatures can pass through per turn. You can choose to make the portal one-way or two-way.

> **Design Note**: R5 capstone — bounded teleportation. Short duration, concentration, expensive material cost. Not unlimited (mortal-scale).
