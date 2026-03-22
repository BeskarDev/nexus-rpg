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

## Current Spell Inventory (24 existing + 16 proposed = 40 total)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Arcane Bolt, Arcane Glyph, Extraplanar Pocket |
| 1 | 6 | Alarm, Arcane Barrier, Arcane Missiles, Conjure Familiar, Hale of Blades, Infuse Item |
| 2 | 6 | Arcane Barrage, Arcane Circle, Arcane Eye, Eldritch Tendrils, Phase Step, Summon Aberration |
| 3 | 5 | Arcane Blast, Astral Gate, Burst of Tendrils, Dimension Door, Wall of Force |
| 4 | 4 | Arcane Empowerment, Astral Body (incomplete), Force Cage (incomplete), Teleportation Circle (incomplete) |
| 5 | 0 | — |

**Proposed spells (16):** Arcane Snare (R0), Conjure Servant (R0), Far Reach (R0), Arcane Deflection (R1), *Spatial Echo (R1, NEW)*, Fabricate (R2), Binding Cage (R3), *Transmute Material (R3, NEW)*, *Conjure Steed (R3, NEW)*, *Conjure Apparatus (R4, NEW)*, *Forge Construct (R4, NEW)*, Binding Seal (R5), Dimensional Rift (R5), Planar Gateway (R5), *Arcane Genesis (R5, NEW)*, *Planar Conscription (R5, NEW)*

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| objects | Arcane Glyph, Extraplanar Pocket | Infuse Item | Fabricate (proposed) | Transmute Material (NEW) | Conjure Apparatus (NEW) | Arcane Genesis (NEW) |
| creatures | Conjure Servant (proposed) | Conjure Familiar | Summon Aberration | Conjure Steed (NEW) | Forge Construct (NEW) | Planar Conscription (NEW) |
| teleportation | Far Reach (proposed) | Spatial Echo (NEW) | Phase Step | Dimension Door, Astral Gate | Teleportation Circle* | Planar Gateway (proposed) |
| binding | Arcane Snare (proposed) | Alarm | Arcane Circle, Eldritch Tendrils | Binding Cage (proposed) | Force Cage* | Binding Seal (proposed) |
| force | Arcane Bolt | Arcane Missiles, Arcane Barrier, Hale of Blades | Arcane Barrage, Arcane Eye | Arcane Blast, Burst of Tendrils, Wall of Force | Arcane Empowerment | Dimensional Rift (proposed) |

*Asterisk = incomplete spell*

**Coverage**: 30/30 slots filled (100%) — all aspects covered at all ranks R0-R5. Every progression chain complete.

**Critical Gaps**: None — all gaps filled.
- ~~**Teleportation R1**: No teleport or spatial spell at R1~~ → Filled by **Spatial Echo** (NEW)
- ~~**Objects R3+**: No object-creation spells above R2~~ → Filled by **Transmute Material** (R3 NEW), **Conjure Apparatus** (R4 NEW), **Arcane Genesis** (R5 NEW)
- ~~**Creatures R3+**: No dedicated summon above R2~~ → Filled by **Conjure Steed** (R3 NEW), **Forge Construct** (R4 NEW), **Planar Conscription** (R5 NEW)

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

### Conjure Servant

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

**Effect.** On a hit, the target is briefly grappled as the tendril constricts around them. They can escape by rolling Strength + Athletics vs. your casting result.
**Weak.** Deal +0 force damage.
**Strong.** Deal +2 force damage.
**Critical.** Deal +4 force damage.

> **Design Note**: Fills R0 binding gap. Grapple condition (primary containment effect) is reliable on any success — consistent with "SL scales magnitude, not effect type" principle. Control-primary damage (+0/+2/+4) appropriate for R0. Uses binding as containment, not just movement debuff.

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

### Spatial Echo

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Medium TN | Short | concentrate

*You attune your senses to the fabric of space itself, perceiving folds, tears, and hidden dimensions invisible to mundane sight.*

**Effect.** On a success, for a short duration while you concentrate, you gain awareness of spatial distortions within short range. You can detect extradimensional spaces (such as those created by Extraplanar Pocket), concealed portals or doorways, active teleportation effects, and dimensional wards or anchors. You also sense the approximate location of invisible or phasing creatures within range. This grants +1 boon on Perception checks to locate or analyze such phenomena.

> **Design Note**: Fills teleportation R1 gap with dimensional perception rather than actual teleportation. "Teleportation" at R1 means spatial awareness — sensing the dimensional fabric. Assists rather than bypasses Perception checks (+1 boon). Concentration limits duration.

### Transmute Material

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Hard TN | Close | ritual (10 minutes)

*You press your hands against raw matter and channel arcane force through it, unraveling its substance at a fundamental level and reweaving it into something entirely different.*

**Weak.** Transmute up to 10 load of one non-magical material into another non-magical material of equal or lesser value (stone to iron, wood to stone, clay to glass). The transmuted material is functional but impure — items crafted from it suffer +1 bane on durability checks. The transmutation is permanent.
**Strong.** As above, but the transmutation is clean and complete. No durability penalty.
**Critical.** As above, and the transmuted material is of exceptional purity. Items crafted from it gain +1 boon on their first durability check.

You cannot create precious metals (gold, silver), magical materials (mithril, adamantite), or living matter.

> **Design Note**: Fills objects R3 gap. Genuinely new concept from Fabricate (R2) — changes material composition rather than reshaping form. Ritual prevents combat abuse. Cannot create precious or magical materials (prevents economy abuse). Primary effect (transmutation) works on any success; SL scales quality (magnitude).

### Conjure Steed

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Hard TN | Close | singular

*You tear a seam in reality and pull through a beast of semi-translucent arcane force — shaped like a horse but shimmering with otherworldly energy, its hooves leaving faint glowing prints.*

**Effect.** On a success, conjure an arcane steed (large creature) for a medium duration. The steed serves as a willing mount and can carry up to two riders. It has 30 HP, 6 AV, and Defense 9. It moves at twice normal movement speed and can traverse difficult terrain without penalty. For brief bursts (one turn at a time), the steed can gallop across water or up vertical surfaces. The steed cannot attack and dissipates harmlessly if destroyed — riders land safely in their current area. Casting this spell again dismisses the previous steed.

> **Design Note**: Fills creatures R3 with a genuinely new concept — conjured mount for mobility and travel, not a combat creature. Different from heightened Summon Aberration (which upgrades the combat companion). Stats match Tier 3 creature guidelines. Predictable effect on any success (no SL scaling for a transport summon). Singular property prevents stacking.

### Conjure Apparatus

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN | Close | ritual (1 hour)

*You weave strands of arcane force into a complex, self-operating mechanism — a device of impossible precision that hums and clicks with contained magical energy.*

**Effect.** On a success, conjure a magical apparatus that performs one complex function for a medium duration. Choose one mode:
- **Forge**: A magical workstation that grants +2 boons on Crafting checks and can work with materials up to Q5 quality. Includes conjured tools appropriate to any trade.
- **Engine**: A self-operating mechanism (crane, pump, mill, or press) that performs heavy labor equivalent to ten workers for the duration. Can lift up to 50 load, move earth, process raw materials, or power simple constructions.
- **Sentinel**: A ward construct that monitors a medium area. It sounds a mental alarm when creatures enter the area and can illuminate intruders with arcane light, granting +1 boon on Perception checks to detect them.

> **Design Note**: Fills objects R4 gap. Three utility modes give Conjuration its "versatile utility" identity. Ritual prevents combat abuse. Enhances skills and labor without replacing them. Forge mode synergizes with Transmute Material (R3) for an objects crafting chain.

### Forge Construct

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN | Close | ritual (1 hour), material cost (1,000 coins)

*You bind arcane force into a physical shell — stone, clay, or metal — inscribing command sigils and breathing unnatural, obedient life into a hulking servant.*

**Effect.** On a success, animate a medium or large construct from available materials. The construct is permanent and follows your verbal commands. It uses Tier 4 creature statistics: 40 HP, 8 AV (heavy armor), Defense 10, Strength d10, and attacks with a slam (weapon damage 6, physical). The construct is immune to bleeding, charmed, confused, frightened, poisoned, and unconscious conditions. It cannot speak, use tools requiring fine manipulation, or exercise independent judgment. You can only have one active construct — creating a new one causes the previous to crumble. If you are incapacitated, the construct becomes inert until you recover.

> **Design Note**: Fills creatures R4 with a permanent golem-like construct — a qualitatively different concept from Summon Aberration's temporary extraplanar creature. Material cost (1,000 coins) reflects physical crafting. Tier 4 stats provide reliable combat support. Permanent duration balanced by single-construct limit and material investment. Transgressive arcane identity: forcing unnatural life into dead matter.

### Arcane Genesis

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Close | ritual (8 hours), material cost (5,000 coins)

*Over hours of painstaking labor, you channel raw arcane power into the fabric of matter itself, permanently imbuing mundane materials with lasting magical properties or conjuring structures from pure force.*

**Effect.** On a success, create one of the following permanent magical works:
- **Enchanted Object**: Permanently imbue one non-magical item with a single minor magical property (perpetual glow, self-cleaning, temperature regulation, resistance to mundane wear, or similar utility enchantment). This cannot grant combat bonuses or replicate weapon/armor enchantments.
- **Arcane Structure**: Create a permanent structure of conjured force — a bridge, tower, wall, or similar construction up to a medium area in size. The structure has 60 HP and 10 AV. It repairs itself at 10 HP per day.
- **Conjured Repository**: Create a permanent extradimensional storage space anchored to a physical location (a door, chest, or archway). The space can hold up to 100 load of items and can only be accessed from the anchor point.

> **Design Note**: Fills objects R5 capstone. Material cost 5,000 coins (R5 economy). 8-hour ritual prevents any combat relevance. Creates lasting magical utility without granting combat power — weapon/armor enchanting remains Crafting's domain. Three modes give the "utility master" capstone fitting Conjuration's identity.

### Planar Conscription

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Medium | ritual (1 hour), material cost (5,000 coins), singular

*You inscribe a summoning circle of terrible potency and speak words of binding that echo across planes. A rift tears open, and through it you drag a powerful extraplanar entity into forced, resentful servitude.*

**Effect.** On a success, summon a powerful extraplanar entity (Tier 5 elite creature, determined by the GM) bound to your service for a short duration. The entity obeys your verbal commands but is openly hostile — it seeks any loophole or ambiguity in your orders. The entity has its own initiative, takes its own turns, and can attack and use abilities appropriate to its nature.

The binding is maintained by the summoning circle (short area). If the circle is physically disrupted (the sigils have 40 HP and 8 AV) or you fall unconscious, the entity breaks free and is no longer bound to obey you. At the end of the duration, the entity is banished to its plane of origin.

> **Design Note**: Fills creatures R5 capstone with a qualitatively different concept — forcing a powerful named entity into service rather than a generic aberration. Hostile binding creates dramatic tension (the entity wants to break free). Material cost 5,000 coins and ritual balance the power of a Tier 5 elite creature. Circle-based binding (not concentration) allows the caster to act freely but creates a targetable vulnerability. Quintessentially transgressive arcane magic.

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
2. **Creatures chain**: Conjure Servant (R0 proposed) → Conjure Familiar (R1) → Summon Aberration (R2, heighten for R3 combat) → Conjure Steed (R3 NEW, mobility) → Forge Construct (R4 NEW, permanent) → Planar Conscription (R5 NEW, powerful entity) — **complete R0-R5**
3. **Teleportation chain**: Far Reach (R0 proposed) → Spatial Echo (R1 NEW) → Phase Step (R2) → Dimension Door/Astral Gate (R3) → Teleportation Circle (R4\*) → Planar Gateway (R5 proposed) — **complete R0-R5**
4. **Binding chain**: Arcane Snare (R0 proposed) → Alarm (R1) → Arcane Circle/Eldritch Tendrils (R2) → Binding Cage (R3 proposed) → Force Cage (R4\*) → Binding Seal (R5 proposed) — **complete R0-R5**
5. **Objects chain**: Arcane Glyph/Extraplanar Pocket (R0) → Infuse Item (R1) → Fabricate (R2 proposed) → Transmute Material (R3 NEW) → Conjure Apparatus (R4 NEW) → Arcane Genesis (R5 NEW) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Familiar scout → targeting**: Conjure Familiar marks targets, follow-up spells gain +1 boon
- ✅ **Wall of Force → isolation**: Split battlefield creates tactical advantage for force spells
- ✅ **Force chain → Dimensional Rift**: Full R0-R5 force progression with area-denial capstone
- ✅ **Binding chain → Binding Seal**: Full R0-R5 binding progression from snare to containment — Arcane Snare grapples targets, making them easier to imprison with Binding Cage/Force Cage
- ✅ **Objects crafting chain**: Fabricate (shape) → Transmute Material (change substance) → Conjure Apparatus (create tools) → Arcane Genesis (permanent creation) — building toward mastery of matter
- ✅ **Creatures evolution chain**: Each rank offers a genuinely different creature concept — servant (utility) → familiar (scout) → aberration (combat) → steed (mobility) → construct (permanent guardian) → conscripted entity (powerful ally)
- ⚠️ **Summon → teleport combo**: No direct synergy between summoning and teleportation effects (acceptable — chains are internally complete)

### Design Completeness Checklist
- [x] R1 Quick Action: Arcane Deflection (R1 proposed) — standardized reactive defense (+2 Dodge/Parry, force damage secondary)
- [x] Defensive options: Arcane Barrier (R1), Arcane Deflection (R1 proposed)
- [x] Utility: Extraplanar Pocket (R0), Far Reach (R0 proposed), Conjure Servant (R0 proposed), Arcane Eye (R2), Fabricate (R2 proposed), Spatial Echo (R1 NEW), Conjure Apparatus (R4 NEW), Arcane Genesis (R5 NEW), Planar Gateway (R5 proposed)
- [x] Damage across ranks: R0-R5 fully covered via force chain — Dimensional Rift (R5 proposed) provides capstone damage
- [x] Repeating conditions: Grappled/restrained via binding chain (Arcane Snare, Eldritch Tendrils, Binding Cage, Force Cage, Binding Seal)
- [x] Setup+payoff: Familiar → boon, Wall → isolation, Snare → Cage (binding chain), Force chain R0-R5, Objects crafting chain (Fabricate → Transmute → Apparatus → Genesis)
- [x] Creatures across ranks: Conjure Servant (R0) → Conjure Familiar (R1) → Summon Aberration (R2) → Conjure Steed (R3 NEW) → Forge Construct (R4 NEW) → Planar Conscription (R5 NEW) — each a genuinely distinct concept
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 8, R2: 7, R3: 8, R4: 6, R5: 5)
- [x] **All aspect × rank gaps filled**: 30/30 coverage (100%)

### Impact & Trivialization Review
- **Far Reach (R0 spatial manipulation)**: Minimal risk — interact with one unattended object within close range. Cannot bypass locks, traps, or skill checks. Pure convenience cantrip.
- **Conjure Servant (R0 servant)**: Minimal risk — carries items, fetches objects, opens doors. No combat capability, no skill replacement, stays within close range.
- **Spatial Echo (R1 dimensional perception, NEW)**: Minimal risk — grants +1 boon on Perception, doesn't auto-detect. Assists rather than bypasses exploration. Concentration limits duration.
- **Fabricate (R2 item creation)**: Moderate risk — could bypass Crafting challenges. **Mitigations**: ritual (10 min), requires raw materials, caps at Q2 quality, cannot create magical items. Crafting skill remains essential for anything above basic goods.
- **Binding Cage (R3 imprisonment)**: Low risk — concentration required, cage is destructible (30 HP, 6 AV). Restrained condition reliable on any success — SL adds damage and spell suppression.
- **Transmute Material (R3 material conversion, NEW)**: Moderate risk — could affect economy. **Mitigations**: ritual (10 min), cannot create precious metals or magical materials, cannot create living matter. Economy-breaking transmutations explicitly excluded.
- **Conjure Steed (R3 mount, NEW)**: Low risk — provides fast travel, not combat power. Steed cannot attack. Medium duration limits scope. Singular property prevents stacking.
- **Conjure Apparatus (R4 magical device, NEW)**: Low risk — ritual (1 hour) prevents combat abuse. Three utility modes enhance existing skills (+2 boons on Crafting, +1 boon on Perception) without replacing them. Medium duration limits scope.
- **Forge Construct (R4 permanent golem, NEW)**: Moderate risk — permanent combat creature. **Mitigations**: 1,000-coin material cost, single-construct limit, no independent judgment, inert if caster incapacitated. Tier 4 stats appropriate for R4 power level.
- **Planar Gateway (R5 portal)**: Low risk at R5 power level — Very Hard TN, concentration, 5,000-coin material cost, must have visited destination. Predictable effect on any success. GMs retain narrative control.
- **Dimensional Rift (R5 area control)**: Low risk at R5 power level — Very Hard TN, concentration, 5,000-coin material cost. Predictable area denial with fixed damage.
- **Binding Seal (R5 containment)**: Low risk — ritual (1 hour), 5,000-coin material cost, target must be willing or restrained. Three modes provide flexibility without overpowering any one use case.
- **Arcane Genesis (R5 permanent creation, NEW)**: Low risk at R5 — 8-hour ritual, 5,000-coin material cost. Cannot create combat items (no weapon/armor enchanting). Three modes (minor enchantment, structure, storage) provide lasting utility without combat imbalance.
- **Planar Conscription (R5 powerful summon, NEW)**: Moderate risk — Tier 5 elite creature is powerful. **Mitigations**: 5,000-coin material cost, ritual (1 hour), hostile entity seeks loopholes, binding circle can be attacked (40 HP, 8 AV), short duration, entity breaks free if caster falls unconscious. High power balanced by high risk.
