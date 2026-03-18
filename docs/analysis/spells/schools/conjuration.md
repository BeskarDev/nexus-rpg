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
| objects | Arcane Glyph, Extraplanar Pocket | Infuse Item | Fabricate (proposed) | — | — | — |
| creatures | Conjure Vermin (proposed) | Conjure Familiar | Summon Aberration | — | — | — |
| teleportation | Spatial Distortion (proposed) | — | Phase Step | Dimension Door, Astral Gate | Teleportation Circle* | Planar Gateway (proposed) |
| binding | Arcane Snare (proposed) | Alarm | Arcane Circle, Eldritch Tendrils | Binding Cage (proposed) | Force Cage* | — |
| force | Arcane Bolt | Arcane Missiles, Arcane Barrier, Hale of Blades | Arcane Barrage, Arcane Eye | Arcane Blast, Burst of Tendrils, Wall of Force | Arcane Empowerment | Force Cataclysm (proposed), Dimensional Rift (proposed) |

*Asterisk = incomplete spell*

**Coverage**: 22/30 slots filled (73%) — strong at R0-R3 with proposed spells, R4-R5 improving

**Critical Gaps**:
- **Teleportation R1**: No teleport or spatial spell at R1
- **Objects R3+**: No object-creation spells above R2
- **Creatures R3+**: No dedicated summon above R2 — use heightened Summon Aberration instead
- **Binding R5**: No capstone binding spell

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

**Weak.** Conjure a tiny creature that lasts briefly. It can carry a small item, serve as a brief distraction, or scout up to close range. The creature has 1 HP and no combat capability.
**Strong.** As above, and the creature can trigger simple mechanisms (pull a lever, push a button) or retrieve a small item within close range.
**Critical.** As above, and you can see through the creature's eyes for its duration.

> **Design Note**: Fills R0 creatures gap. Non-combat utility summon. Core effect (summon creature, brief duration) is reliable on any success — SL adds capabilities, not duration.

### Spatial Distortion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Medium TN | Self | quick

*You briefly warp the space around yourself, causing your position to blur and shift — not true teleportation, but a flicker of displaced reality.*

**Weak.** Until the end of your next turn, the first attack against you suffers +1 bane as your position seems slightly off.
**Strong.** Until the end of your next turn, all attacks against you suffer +1 bane.
**Critical.** Until the end of your next turn, all attacks against you suffer +1 bane. Additionally, you can shift 1 space in any direction without provoking opportunity attacks.

> **Design Note**: Fills R0 teleportation gap without actual teleportation — a spatial warp that hints at the school's mastery of space without granting true relocation at cantrip level.

### Arcane Snare

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You conjure a brief tether of arcane force that wraps around a creature's limbs.*

**Weak.** The target's movement is reduced by 2 until the end of their next turn.
**Strong.** As above, and the target suffers +1 bane on Dodge rolls until the end of their next turn.
**Critical.** As above, and the target suffers +1 bane on all Athletics rolls until the end of their next turn.

> **Design Note**: Fills R0 binding gap. Cantrip-level movement denial. Core effect (movement reduction) is reliable on any success — SL adds secondary debuffs, not escalating conditions.

### Binding Cage

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Medium | concentrate

*You conjure interlocking bars and walls of shimmering force around a creature, trapping it in an arcane cage.*

**Weak.** Conjure a cage of force around one target. The target is restrained for a short duration. The cage has 30 HP and 6 AV. The target or allies can attack the cage to free the trapped creature.
**Strong.** As above, and the cage deals +4 force damage to any creature that starts its turn inside.
**Critical.** As above with +8 force damage per turn, and the cage suppresses spellcasting inside it (creatures inside suffer +1 bane on all spell rolls).

> **Design Note**: Fills R3 binding gap with a genuinely new concept — force imprisonment rather than another summon. Creature summoning at R3 should use heightened Summon Aberration instead. Restrained condition is reliable on any success.

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

**Weak.** Create a two-way portal to a location you have visited before on the same plane. The portal is large enough for two creatures to pass through per turn. It remains open for a short duration while you concentrate.
**Strong.** As above, and creatures passing through the portal arrive precisely at their intended position (no disorientation or scatter).
**Critical.** As above, and you can make the portal one-way (preventing passage from the other side) or disguise its appearance at the destination.

> **Design Note**: R5 capstone — bounded teleportation. Core effect (portal, 2 creatures/turn, short duration) is reliable on any success. SL adds tactical options, not throughput.

### Dimensional Rift

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Long | concentrate, material cost (500 coins)

*You tear a permanent wound in the fabric of reality, creating an unstable dimensional rift that warps space, gravity, and matter around it.*

**Weak.** Create a dimensional rift in a short area at long range. Creatures inside the area are pulled toward the center (movement toward the center costs nothing, movement away costs double). Creatures that start their turn in the rift take +6 force damage. The rift lasts for a short duration while you concentrate.
**Strong.** As above, and creatures inside the rift are slowed (half movement). Damage increases to +12 force damage.
**Critical.** As above, and creatures inside the rift are restrained unless they succeed on a Strength + Athletics check vs. TN 16. Damage increases to +18 force damage.

> **Design Note**: R5 capstone — battlefield-warping force magic. Concentration and material cost limit abuse. Area denial + damage + movement control represents the pinnacle of spatial manipulation. Army-scale summoning at R5 should use heightened versions of existing summon spells instead.

### Force Cataclysm

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | —

*You channel an overwhelming surge of raw arcane force into a single devastating blast, striking your target with the full, focused power of conjured destruction.*

**Weak.** Deal +12 force damage to a single target.
**Strong.** Deal +24 force damage. The target is briefly staggered as the force impact overwhelms them.
**Critical.** Deal +36 force damage. The target is restrained for a short duration as residual force energy pins them in place.

> **Design Note**: R5 single-target offensive capstone for the force chain. Damage follows standard R5 single-target scaling (+12/+24/+36). The restrained condition on critical ties into Conjuration's binding identity. No concentration — a pure burst finisher.

## Cross-School Spell Sharing

**Potential Overlap: Conjuration (Arcane) ↔ Nature (Mystic)**

The Conjure Familiar spell concept overlaps with Nature's Wild Companion — both provide an animal or creature companion for scouting and utility. Key overlap areas:

- **Conjure Familiar** (R1) and Nature's **Wild Companion** serve similar mechanical roles (scout, minor utility, action economy) but differ in flavor: conjuration pulls an extraplanar entity, Nature bonds with a natural animal
- **Summoning spells** at higher ranks could overlap with Nature's animal summoning, though Conjuration summons extraplanar creatures while Nature calls natural beasts

**Shared Spell Candidates**: Conjure Familiar is a strong candidate for cross-school sharing between Conjuration (Arcane) and Nature (Mystic), as both provide a creature companion for scouting and utility. The shared version should use identical mechanics in both spell lists.

> **Design Note**: Conjuration summons are unnatural (forced, extraplanar) while Nature summons are harmonious (willing, natural). Despite different flavor, the mechanical effect of "gain a small companion creature" is identical.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Force chain**: Arcane Bolt (R0) → Arcane Missiles/Hale of Blades (R1) → Arcane Barrage (R2) → Arcane Blast (R3) → Arcane Empowerment (R4) → Force Cataclysm/Dimensional Rift (R5 proposed) — **complete R0-R5**
2. **Creatures chain**: Conjure Vermin (R0 proposed) → Conjure Familiar (R1) → Summon Aberration (R2) → *heightened summons at R3+* — use heightened Summon Aberration for higher-tier summoning
3. **Teleportation chain**: Spatial Distortion (R0 proposed) → *gap at R1* → Phase Step (R2) → Dimension Door/Astral Gate (R3) → Teleportation Circle (R4\*) → Planar Gateway (R5 proposed)
4. **Binding chain**: Arcane Snare (R0 proposed) → Alarm (R1) → Arcane Circle/Eldritch Tendrils (R2) → Binding Cage (R3 proposed) → Force Cage (R4\*) → *gap at R5*
5. **Objects chain**: Arcane Glyph/Extraplanar Pocket (R0) → Infuse Item (R1) → Fabricate (R2 proposed) → *gap at R3-R5*

### Setup + Payoff Combos
- ✅ **Familiar scout → targeting**: Conjure Familiar marks targets, follow-up spells gain +1 boon
- ✅ **Wall of Force → isolation**: Split battlefield creates tactical advantage for force spells
- ✅ **Force chain → Force Cataclysm**: Full R0-R5 force damage progression with devastating single-target capstone
- ⚠️ **Binding → force damage payoff**: Restrained targets (from Binding Cage, Arcane Snare) should be vulnerable to force attacks, but no explicit mechanic links them
- ⚠️ **Summon → teleport combo**: No synergy between summoning and teleportation effects

### Design Completeness Checklist
- [x] R1 Quick Action: Arcane Deflection (R1 proposed) — force barrier reactive defense
- [x] Defensive options: Arcane Barrier (R1), Arcane Deflection (R1 proposed)
- [x] Utility: Extraplanar Pocket (R0), Arcane Eye (R2), Fabricate (R2 proposed), Planar Gateway (R5 proposed)
- [x] Damage across ranks: R0-R5 fully covered via force chain — Force Cataclysm (R5 proposed) completes the progression
- ⚠️ Repeating conditions: Restrained via binding spells (Arcane Snare, Binding Cage, Force Cage), but limited condition variety overall
- [x] Setup+payoff: Familiar → boon, Wall → isolation, Force chain R0-R5
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 7, R2: 7, R3: 6, R4: 5, R5: 3)
- ⚠️ **Remaining gaps**: Teleportation R1, Objects R3+, Creatures R3+, Binding R5

### Impact & Trivialization Review
- **Spatial Distortion (R0 spatial warp)**: Minimal risk — defensive bane only, no actual teleportation. Thematically hints at conjuration's spatial mastery without granting relocation at cantrip level.
- **Fabricate (R2 item creation)**: Moderate risk — could bypass Crafting challenges. **Mitigations**: ritual (10 min), requires raw materials, caps at Q2 quality, cannot create magical items. Crafting skill remains essential for anything above basic goods.
- **Binding Cage (R3 imprisonment)**: Low risk — concentration required, cage is destructible (30 HP, 6 AV). The trapped creature or their allies can break the cage. Restrained condition is reliable on any success — SL adds damage and spellcasting suppression.
- **Planar Gateway (R5 portal)**: Low risk at R5 power level — Very Hard TN, concentration, 500-coin material cost consumed, must have visited the destination. Core effect (2 creatures/turn, short duration) is reliable — SL adds tactical options. GMs retain narrative control over which locations qualify as "visited."
- **Dimensional Rift (R5 area control)**: Low risk at R5 power level — Very Hard TN, concentration, 500-coin material cost. Area denial with damage and movement control. Replaces army-scale summoning which should use heightened existing summon spells instead.
- **Force Cataclysm (R5 damage)**: Low risk — straightforward single-target damage at appropriate R5 scaling. No unusual interactions or edge cases. The restrained condition on critical is a bonus, not the primary effect.
