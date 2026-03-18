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

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| objects | Arcane Glyph, Extraplanar Pocket | Infuse Item | — | — | — | — |
| creatures | ❌ **GAP** | Conjure Familiar | Summon Aberration | — | — | — |
| teleportation | ❌ **GAP** | — | Phase Step | Dimension Door, Astral Gate | Teleportation Circle* | — |
| binding | — | Alarm | Arcane Circle, Eldritch Tendrils | — | Force Cage* | — |
| force | Arcane Bolt | Arcane Missiles, Arcane Barrier, Hale of Blades | Arcane Barrage, Arcane Eye | Arcane Blast, Burst of Tendrils, Wall of Force | Arcane Empowerment | — |

*Asterisk = incomplete spell*

**Coverage**: 17/30 slots filled (57%) — strong at R1-R3, weak at R0 and R4-R5

**Critical Gaps**:
- **Creatures R0**: No summoning cantrip — the first summon isn't until R1
- **Teleportation R0-R1**: No teleport below R2 — a core identity trait locked to mid-ranks
- **Objects R2+**: No object-creation spells above R1
- **Binding R0, R3**: Gaps in the binding progression
- **All traits R5**: No capstone spells

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

### Arcane Snare

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You conjure a brief tether of arcane force that wraps around a creature's limbs.*

**Weak.** The target's movement is reduced by 1 until the end of their next turn.
**Strong.** The target's movement is reduced by 2 until the end of their next turn.
**Critical.** The target is briefly restrained as the tether locks tight.

> **Design Note**: Fills R0 binding gap. Cantrip-level movement denial — weak version of Eldritch Tendrils.

### Conjure Guardian

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Hard TN | Close | concentrate

*You summon a formidable extraplanar entity — a hulking creature of force and shadow bound to your will.*

**Weak.** Summon a Tier 2 guardian in close range. It acts on your initiative, has basic melee attacks, and lasts for a brief duration.
**Strong.** The guardian is Tier 3. It lasts for a short duration and can intercept attacks targeting adjacent allies (redirect one attack per round to itself).
**Critical.** The guardian is Tier 3 with enhanced durability (+10 HP). It lasts for a short duration and can intercept two attacks per round.

> **Design Note**: Fills R3 creatures gap. Mid-tier summon with defensive utility — a bodyguard rather than a damage dealer, complementing R2's offensive Summon Aberration.

### Fabricate

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Medium TN | Close | ritual (10 minutes)

*You channel arcane energy into raw materials, reshaping them into a finished product.*

**Weak.** Transform raw materials within close range into a simple finished object (rope from plant fiber, a wooden door from timber, a stone block from rubble). The object is functional but crude.
**Strong.** Create a more refined object. You can produce items that would normally require basic Crafting tools. The quality is equivalent to a skilled artisan.
**Critical.** Create a finely crafted object. You can produce items up to Q2 quality. Complex mechanisms (locks, hinges) are possible if you have the relevant Crafting knowledge.

> **Design Note**: Fills R2 objects gap. Ritual prevents combat abuse. Requires raw materials — doesn't create something from nothing. Doesn't replace Crafting skill (no Q3+ items, no magical items).

### Planar Gateway

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Long | concentrate, ritual (10 minutes), material cost (500 coins)

*You tear open a shimmering portal connecting two distant locations, allowing passage between them.*

**Weak.** Create a portal to a location you have visited before on the same plane. The portal is large enough for one creature to pass through per turn. It remains open for a brief duration.
**Strong.** The portal remains open for a short duration. Up to two creatures can pass through per turn.
**Critical.** The portal remains open for a medium duration. Up to four creatures can pass through per turn. You can choose to make the portal one-way or two-way.

> **Design Note**: R5 capstone — bounded teleportation. Short duration, concentration, expensive material cost. Not unlimited (mortal-scale).

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Force chain**: Arcane Bolt (R0) → Arcane Missiles/Hale of Blades (R1) → Arcane Barrage (R2) → Arcane Blast (R3) → Arcane Empowerment (R4) → *needs R5 offensive capstone*
2. **Creatures chain**: Conjure Vermin (R0 proposed) → Conjure Familiar (R1) → Summon Aberration (R2) → Conjure Guardian (R3 proposed) → *gap at R4-R5*
3. **Teleportation chain**: Blink Step (R0 proposed) → *gap at R1* → Phase Step (R2) → Dimension Door/Astral Gate (R3) → Teleportation Circle (R4\*) → Planar Gateway (R5 proposed)
4. **Binding chain**: Arcane Snare (R0 proposed) → Alarm (R1) → Arcane Circle/Eldritch Tendrils (R2) → *gap at R3* → Force Cage (R4\*) → *needs R5*
5. **Objects chain**: Arcane Glyph/Extraplanar Pocket (R0) → Infuse Item (R1) → Fabricate (R2 proposed) → *gap at R3-R5*

### Setup + Payoff Combos
- ✅ **Familiar scout → targeting**: Conjure Familiar marks targets, follow-up spells gain +1 boon
- ✅ **Wall of Force → isolation**: Split battlefield creates tactical advantage for force spells
- ⚠️ **Binding → force damage payoff**: Restrained targets should be vulnerable to force attacks, but no explicit mechanic links them
- ❌ **Summon → teleport combo**: No synergy between summoning and teleportation effects

### Design Completeness Checklist
- [x] R1 Quick Action: Arcane Deflection (R1 proposed) — force barrier reactive defense
- [x] Defensive options: Arcane Barrier (R1), Arcane Deflection (R1 proposed)
- [x] Utility: Extraplanar Pocket (R0), Arcane Eye (R2), Fabricate (R2 proposed)
- [x] Damage across ranks: R0-R4 covered via force chain; R5 needs an offensive capstone
- ⚠️ Repeating conditions: Restrained via binding spells, but limited condition variety overall
- [x] Setup+payoff: Familiar → boon, Wall → isolation are well-defined
- ⚠️ **Remaining gaps**: Teleportation R1, Objects R3+, Binding R3, no R5 force damage spell

### Impact & Trivialization Review
- **Blink Step (R0 teleport)**: Minimal risk — melee/close range only, cantrip-level repositioning. Does not bypass exploration.
- **Fabricate (R2 item creation)**: Moderate risk — could bypass Crafting challenges. **Mitigations**: ritual (10 min), requires raw materials, caps at Q2 quality, cannot create magical items. Crafting skill remains essential for anything above basic goods.
- **Planar Gateway (R5 portal)**: Low risk at R5 power level — Very Hard TN, concentration, 500-coin material cost consumed, must have visited the destination. Appropriate for peak mortal magic. GMs retain narrative control over which locations qualify as "visited."
