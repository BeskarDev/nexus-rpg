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

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Conjuration emits: **reshaped field** above all else (walls, barriers, cages, glyphs, and summoned bodies that create cover, chokepoints, and *clusters* by cutting off escape routes), *restrained/grappled* (tendrils, force containment), and **planted anchors** (a glyph on the floor, a familiar's eyes on a target, a circle prepared in advance).

**Payoff levers** — Conjuration cashes in **position**: enemies pinned against a Wall of Force or funneled through the one gap eat its auto-hit missiles and blasts with no cover to hide behind, a triggered glyph detonates on whoever the field forced across it, and a summon flanks whoever the wall traps. The cold-cast deficit shows as action cost — a wall or summon does no damage the turn it is cast, and the missiles are on-curve alone; only the combination converts board control into kills.

**Extenders** — *prolong* is the school's native strength: its constructs are lasting, diegetic objects (a wall stands, a cage holds, a glyph waits) that keep the window open for the whole party, often without concentration. Summons *refresh* pressure every round with their own actions. Teleports (Phase Step, Dimension Door) reposition the caster to re-angle the field mid-fight.

**Solo engine** (multi-turn): T1 Wall of Force (split the enemy line, trap the priority target on your side) → T2 Arcane Barrage (auto-hit payoff on the target that now has no cover and no escape) → T3 Summon Aberration to hold the gap as the wall's duration runs down. Gated hard by Focus (constructs and summons are expensive) and by concentration on the summon.

**Party interlock**: **emits** walls, cover, chokepoints, *restrained*, and *clusters* — terrain currency every ally spends (the martial holds the one gap, the Evocation caster fireballs the pocket the wall created). **wants** enemies pushed or dragged into its constructs (forced movement from Telekinetics or Tempest slams enemies into cage range) and conditions that hold a target still long enough to seal (slowed, prone, stunned). Cross-player line: Telekinetics hurls the enemy champion against the Wall of Force and Conjuration drops the Force Cage over them while they are pinned.

**Synergy gaps**: field setup and lasting extenders are excellent, but explicit **payoffs are implicit** — almost nothing in the school mechanically rewards a trapped, walled, or restrained target (the benefit is only positional). A mid-rank payoff that bites contained enemies, and a *convert* extender (restrained → sealed), are design targets.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Grinding Walls** (R2, payoff) — command one of your force constructs to grind against a creature pinned to or trapped inside it: force damage and briefly *staggered* as the barrier presses. Only works with a construct standing and a target against it — pure contained-target payoff.
- **Seal the Cage** (R3, extender/convert) — a creature currently *restrained* or *grappled* (by anything — tendrils, a net, an ally's hold) is bound in conjured force shackles, converting the hold into *restrained* that persists after the original grip ends. The construct has durability stats per Wall of Force scaling. Converts anyone's hold into the school's lasting containment.
- **Hail of Splinters** (R3, payoff) — your standing wall or barrier fractures its surface into a storm of force shards along its length, hitting every enemy in close range of it. Turns the wall itself into a weapon — no wall, no spell.

## Current Spell Inventory (29 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Arcane Bolt, Arcane Glyph, Extraplanar Pocket |
| 1 | 7 | Alarm, Arcane Barrier, Arcane Missiles, Conjure Familiar, Hale of Blades, Infuse Item, Mage Armor |
| 2 | 7 | Arcane Barrage, Arcane Circle, Arcane Eye, Arcane Lock, Eldritch Tendrils, Phase Step, Summon Aberration |
| 3 | 7 | Arcane Blast, Astral Gate, Banishment, Burst of Tendrils, Dimension Door, Distant Eye, Wall of Force |
| 4 | 5 | Arcane Empowerment, Astral Body (incomplete), Disintegrate, Force Cage, Teleportation Circle (incomplete) |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| objects | Arcane Glyph, Extraplanar Pocket | Infuse Item | Fabricate (proposed) | Transmute Material (NEW) | Conjure Apparatus (NEW) | Arcane Genesis (NEW) |
| creatures | Conjure Servant (proposed) | Conjure Familiar | Summon Aberration | Conjure Steed (NEW) | Forge Construct (NEW) | Planar Conscription (NEW) |
| teleportation | Far Reach (proposed) | Spatial Echo (NEW) | Phase Step | Dimension Door, Astral Gate | Teleportation Circle* | Planar Gateway (proposed) |
| binding | Arcane Snare (proposed) | Alarm | Arcane Circle, Eldritch Tendrils | Binding Cage (proposed) | Force Cage | Binding Seal (proposed) |
| force | Arcane Bolt | Arcane Missiles, Arcane Barrier, Hale of Blades | Arcane Barrage, Arcane Eye | Arcane Blast, Burst of Tendrils, Wall of Force | Arcane Empowerment | Dimensional Rift (proposed) |

*Asterisk = incomplete spell*

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

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

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Arcane Deflection | 1 | You conjure a brief barrier of arcane force to deflect an incoming attack. (R1 Quick Action reactive defense) |
| Conjure Servant | 0 | You conjure a tiny, barely-visible servant of arcane energy — shaped vaguely like a small humanoid figure — to perform simple tasks. (R0 creatures cantrip, modeled on D&D's Unseen Servant) |
| Far Reach | 0 | You extend an invisible tether of spatial energy, allowing you to manipulate objects at a distance as if they were within arm's reach. (Replaces Spatial Distortion) |
| Arcane Snare | 0 | You conjure a coiling tendril of arcane force that lashes out and wraps around a creature like a constricting serpent. (Fills R0 binding gap) |
| Binding Cage | 3 | You conjure interlocking bars and walls of shimmering force around a creature, trapping it in an arcane cage. (Fills R3 binding gap with a genuinely new concept — force imprisonment rather than another summon) |
| Fabricate | 2 | You channel arcane energy into raw materials, reshaping them into a finished product. (Fills R2 objects gap) |
| Planar Gateway | 5 | You tear open a shimmering portal connecting two distant locations, allowing passage between them. (R5 capstone teleportation) |
| Dimensional Rift | 5 | You tear a wound in the fabric of reality, creating an unstable dimensional rift that warps space, gravity, and matter around it. (R5 force capstone — battlefield-warping area denial) |
| Binding Seal | 5 | You inscribe a complex pattern of arcane sigils in a circle, weaving a powerful containment ward that persists until deliberately broken. (R5 binding capstone — replaces Force Cataclysm (which duplicated the force aspect at R5)) |
| Spatial Echo | 1 | You attune your senses to the fabric of space itself, perceiving folds, tears, and hidden dimensions invisible to mundane sight. (Fills teleportation R1 gap with dimensional perception rather than actual teleportation) |
| Transmute Material | 3 | You press your hands against raw matter and channel arcane force through it, unraveling its substance at a fundamental level and reweaving it into something entirely different. (Fills objects R3 gap) |
| Conjure Steed | 3 | You tear a seam in reality and pull through a beast of semi-translucent arcane force — shaped like a horse but shimmering with otherworldly energy, its hooves leaving faint glowing prints. (Fills creatures R3 with a genuinely new concept — conjured mount for mobility and travel, not a combat creature) |
| Conjure Apparatus | 4 | You weave strands of arcane force into a complex, self-operating mechanism — a device of impossible precision that hums and clicks with contained magical energy. (Fills objects R4 gap) |
| Forge Construct | 4 | You bind arcane force into a physical shell — stone, clay, or metal — inscribing command sigils and breathing unnatural, obedient life into a hulking servant. (Fills creatures R4 with a permanent golem-like construct — a qualitatively different concept from Summon Aberration's temporary extraplanar creature) |
| Arcane Genesis | 5 | Over hours of painstaking labor, you channel raw arcane power into the fabric of matter itself, permanently imbuing mundane materials with lasting magical properties or conjuring structures from pure force. (Fills objects R5 capstone) |
| Planar Conscription | 5 | You inscribe a summoning circle of terrible potency and speak words of binding that echo across planes. A rift tears open, and through it you drag a powerful extraplanar entity into forced, resentful servitude. (Fills creatures R5 capstone with a qualitatively different concept — forcing a powerful named entity into service rather than a generic aberration) |

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
- [ ] **All aspect × rank gaps filled**: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) coverage (100%)

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
