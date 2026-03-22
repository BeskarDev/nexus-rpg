# Conjuration — Spell School Design Space

## School Identity

**Discipline**: Conjuration (Arcane)
**Traits**: objects, creatures, teleportation, binding, force
**Identity**: Unnatural creation and forced summoning — bringing things into existence or relocating them
**Role Spread**: Excels: Utility | Decent: Offense, Support | Weak: Healing, Defense, Control

### Mechanical Identity
- **Primary Conditions**: Restrained, grappled (force containment), displaced (forced teleportation)
- **Signature Gimmick**: Summoning, force constructs, and spatial manipulation — creating things from nothing, auto-hit missiles, containment wards, teleportation
- **Damage Types**: Force (proposed — currently blast), Blast, Acid
- **Binding Identity**: Binding in Conjuration means creating lasting magical constructs that confine, seal, or anchor — wards, barriers, force cages, dimensional anchors. Not merely movement restriction, but active containment through conjured structures.

### Design Principles
1. Conjuration is the most versatile arcane discipline — summons, missiles, teleportation, barriers, storage
2. Missile spells (Arcane Missiles, Arcane Barrage) are the signature offensive tool — auto-hit with per-missile AV reduction as the balancing weakness
3. Summoned creatures provide action economy advantage
4. Teleportation provides tactical mobility but must respect rank power level (no teleportation at R0)
5. Binding creates lasting constructs: wards, cages, seals — not just movement debuffs
6. **Key change**: Missile spells should use force damage (full AV per hit) instead of blast

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
| teleportation | Far Reach (proposed) | — | Phase Step | Dimension Door, Astral Gate | Teleportation Circle* | Planar Gateway (proposed) |
| binding | Arcane Snare (proposed) | Alarm | Arcane Circle, Eldritch Tendrils | Binding Cage (proposed) | Force Cage* | Binding Seal (proposed) |
| force | Arcane Bolt | Arcane Missiles, Arcane Barrier, Hale of Blades | Arcane Barrage, Arcane Eye | Arcane Blast, Burst of Tendrils, Wall of Force | Arcane Empowerment | Dimensional Rift (proposed) |

*Asterisk = incomplete spell*

**Coverage**: 23/30 slots filled (77%) — strong at R0-R3 with proposed spells, R4-R5 improved. Binding chain now complete R0-R5.

**Critical Gaps**:
- **Teleportation R1**: No teleport or spatial spell at R1
- **Objects R3+**: No object-creation spells above R2
- **Creatures R3+**: No dedicated summon above R2 — use heightened Summon Aberration instead

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

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. If the attack misses, a force fragment strikes the attacker for +2 force damage.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Conjuration's force-damage secondary. No SL scaling — one reliable defensive reaction.

### Conjure Vermin

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Medium TN | Close | —

*You conjure a tiny, barely-visible servant of arcane energy — shaped vaguely like a small humanoid figure — to perform simple tasks.*

**Effect.** On a success, conjure an invisible arcane servant that lasts for a short duration. The servant can perform simple manual tasks: carry objects up to 5 load, open unlocked doors, hold items, clean surfaces, or fetch nearby unattended objects within close range. It has 1 HP, no combat capability, and cannot attack or be used as a shield. It moves at your command but cannot travel beyond close range from you. The servant is invisible but can be detected with a Perception check vs. your casting result.

> **Design Note**: R0 creatures cantrip, modeled on D&D's Unseen Servant. No SL escalation — one predictable utility effect. The servant provides minor convenience but cannot replace skill checks, carry heavy loads, or contribute in combat.

### Far Reach

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Medium TN | Close | —

*You extend an invisible tether of spatial energy, allowing you to manipulate objects at a distance as if they were within arm's reach.*

**Effect.** On a success, you can interact with one unattended object within close range as if you were touching it: pull a lever, turn a key, pick up a small item (up to 1 load), open an unlocked container, or press a button. The interaction must be something you could accomplish with one hand. The effect is instantaneous.

> **Design Note**: Replaces Spatial Distortion. Fills R0 teleportation/spatial gap without actual teleportation — spatial manipulation (interact at range) rather than defensive warping. Simple, predictable utility cantrip with no SL scaling.

### Arcane Snare

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You conjure a coiling tendril of arcane force that lashes out and wraps around a creature like a constricting serpent.*

**Weak.** Deal +2 force damage to the target.
**Strong.** Deal +4 force damage. The target is briefly grappled as the tendril constricts around them.
**Critical.** Deal +6 force damage. The target is grappled for a short duration. They can roll Strength + Athletics vs. TN 8 to escape.

> **Design Note**: Fills R0 binding gap. Damage scales by SL (appropriate for combat cantrip). Grapple condition as secondary effect on Strong+ — like a serpent's constriction. Uses binding as containment, not just movement debuff.

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
5 | 10 | Very Hard TN | Long | concentrate, ritual (10 minutes), material cost (5,000 coins)

*You tear open a shimmering portal connecting two distant locations, allowing passage between them.*

**Effect.** On a success, create a two-way portal to a location you have visited before on the same plane. The portal is large enough for two creatures to pass through per turn. It remains open for a short duration while you concentrate. You can make the portal one-way (preventing passage from the other side) or disguise its appearance at the destination.

> **Design Note**: R5 capstone teleportation. Predictable effect on any success — no SL scaling for a spell whose core function must be reliable. Material cost increased to 5,000 coins (appropriate for R5 power level in Q6-Q7 item economy). Concentration prevents combat abuse.

### Dimensional Rift

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Long | concentrate, material cost (5,000 coins)

*You tear a wound in the fabric of reality, creating an unstable dimensional rift that warps space, gravity, and matter around it.*

**Effect.** On a success, create a dimensional rift in a short area at long range. Creatures inside the area are pulled toward the center (movement toward the center costs nothing, movement away costs double). Creatures that start their turn in the rift take +6 force damage. The rift lasts for a short duration while you concentrate.

> **Design Note**: R5 force capstone — battlefield-warping area denial. Damage (+6 base, appropriate for R5 multi-target) with movement control. No SL scaling on primary effect — the rift just works. Material cost increased to 5,000 coins (R5 economy). Concentration limits duration.

### Binding Seal

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Medium | ritual (1 hour), material cost (5,000 coins)

*You inscribe a complex pattern of arcane sigils in a circle, weaving a powerful containment ward that persists until deliberately broken.*

**Effect.** On a success, create one of the following binding effects:
- **Creature Binding**: Target one willing or restrained creature. The creature is bound to the warded area (short area). It cannot leave the warded area, use teleportation, or travel between planes. The binding lasts for a long duration or until the sigils are physically destroyed (the sigils have 40 HP and 8 AV).
- **Portal Seal**: Permanently close one portal, dimensional rift, or planar breach within the warded area. The seal persists until the sigils are destroyed.
- **Dimensional Anchor**: Create a warded area (short area) that prevents all teleportation and planar travel into or out of the area for a long duration.

> **Design Note**: R5 binding capstone — replaces Force Cataclysm (which duplicated the force aspect at R5). Represents the pinnacle of conjuration's binding power: containment, sealing, and dimensional anchoring. Three modes give tactical flexibility. Ritual casting prevents combat abuse. Material cost 5,000 coins appropriate for R5 economy. No SL scaling — predictable capstone effect.

## Cross-School Spell Sharing

**Potential Overlap: Conjuration (Arcane) ↔ Nature (Mystic)**

The Conjure Familiar spell concept overlaps with Nature's Wild Companion — both provide an animal or creature companion for scouting and utility. Key overlap areas:

- **Conjure Familiar** (R1) and Nature's **Wild Companion** serve similar mechanical roles (scout, minor utility, action economy) but differ in flavor: conjuration pulls an extraplanar entity, Nature bonds with a natural animal
- **Summoning spells** at higher ranks could overlap with Nature's animal summoning, though Conjuration summons extraplanar creatures while Nature calls natural beasts

**Shared Spell Candidates**: Conjure Familiar is a strong candidate for cross-school sharing between Conjuration (Arcane) and Nature (Mystic), as both provide a creature companion for scouting and utility. The shared version should use identical mechanics in both spell lists.

> **Design Note**: Conjuration summons are unnatural (forced, extraplanar) while Nature summons are harmonious (willing, natural). Despite different flavor, the mechanical effect of "gain a small companion creature" is identical.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Force chain**: Arcane Bolt (R0) → Arcane Missiles/Hale of Blades (R1) → Arcane Barrage (R2) → Arcane Blast (R3) → Arcane Empowerment (R4) → Dimensional Rift (R5 proposed) — **complete R0-R5**
2. **Creatures chain**: Conjure Vermin (R0 proposed) → Conjure Familiar (R1) → Summon Aberration (R2) → *heightened summons at R3+* — use heightened Summon Aberration for higher-tier summoning
3. **Teleportation chain**: Far Reach (R0 proposed) → *gap at R1* → Phase Step (R2) → Dimension Door/Astral Gate (R3) → Teleportation Circle (R4\*) → Planar Gateway (R5 proposed)
4. **Binding chain**: Arcane Snare (R0 proposed) → Alarm (R1) → Arcane Circle/Eldritch Tendrils (R2) → Binding Cage (R3 proposed) → Force Cage (R4\*) → Binding Seal (R5 proposed) — **complete R0-R5!**
5. **Objects chain**: Arcane Glyph/Extraplanar Pocket (R0) → Infuse Item (R1) → Fabricate (R2 proposed) → *gap at R3-R5*

### Setup + Payoff Combos
- ✅ **Familiar scout → targeting**: Conjure Familiar marks targets, follow-up spells gain +1 boon
- ✅ **Wall of Force → isolation**: Split battlefield creates tactical advantage for force spells
- ✅ **Force chain → Dimensional Rift**: Full R0-R5 force progression with area-denial capstone
- ✅ **Binding chain → Binding Seal**: Full R0-R5 binding progression from snare to containment — Arcane Snare grapples targets, making them easier to imprison with Binding Cage/Force Cage
- ⚠️ **Summon → teleport combo**: No synergy between summoning and teleportation effects

### Design Completeness Checklist
- [x] R1 Quick Action: Arcane Deflection (R1 proposed) — standardized reactive defense (+2 Dodge/Parry, force damage secondary)
- [x] Defensive options: Arcane Barrier (R1), Arcane Deflection (R1 proposed)
- [x] Utility: Extraplanar Pocket (R0), Far Reach (R0 proposed), Conjure Vermin (R0 proposed), Arcane Eye (R2), Fabricate (R2 proposed), Planar Gateway (R5 proposed)
- [x] Damage across ranks: R0-R5 fully covered via force chain — Dimensional Rift (R5 proposed) provides capstone damage
- [x] Repeating conditions: Grappled/restrained via binding chain (Arcane Snare, Eldritch Tendrils, Binding Cage, Force Cage, Binding Seal)
- [x] Setup+payoff: Familiar → boon, Wall → isolation, Snare → Cage (binding chain), Force chain R0-R5
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 7, R2: 7, R3: 6, R4: 5, R5: 3)
- ⚠️ **Remaining gaps**: Teleportation R1, Objects R3+, Creatures R3+

### Impact & Trivialization Review
- **Far Reach (R0 spatial manipulation)**: Minimal risk — interact with one unattended object within close range. Cannot bypass locks, traps, or skill checks. Pure convenience cantrip.
- **Conjure Vermin (R0 servant)**: Minimal risk — carries items, fetches objects, opens doors. No combat capability, no skill replacement, stays within close range.
- **Fabricate (R2 item creation)**: Moderate risk — could bypass Crafting challenges. **Mitigations**: ritual (10 min), requires raw materials, caps at Q2 quality, cannot create magical items. Crafting skill remains essential for anything above basic goods.
- **Binding Cage (R3 imprisonment)**: Low risk — concentration required, cage is destructible (30 HP, 6 AV). Restrained condition reliable on any success — SL adds damage and spell suppression.
- **Planar Gateway (R5 portal)**: Low risk at R5 power level — Very Hard TN, concentration, 5,000-coin material cost, must have visited destination. Predictable effect on any success. GMs retain narrative control.
- **Dimensional Rift (R5 area control)**: Low risk at R5 power level — Very Hard TN, concentration, 5,000-coin material cost. Predictable area denial with fixed damage.
- **Binding Seal (R5 containment)**: Low risk — ritual (1 hour), 5,000-coin material cost, target must be willing or restrained. Three modes provide flexibility without overpowering any one use case.
