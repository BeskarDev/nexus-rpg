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

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Conjuration emits: **reshaped field** above all else (walls, barriers, cages, glyphs, and summoned bodies that create cover, chokepoints, and *clusters* by cutting off escape routes), *restrained/grappled* (tendrils, force containment), and **planted anchors** (a glyph on the floor, a familiar's eyes on a target, a circle prepared in advance).

**Payoff levers** — Conjuration cashes in **position**: enemies pinned against a Wall of Force or funneled through the one gap eat its auto-hit missiles and blasts with no cover to hide behind, a triggered glyph detonates on whoever the field forced across it, and a summon flanks whoever the wall traps. The cold-cast deficit shows as action cost — a wall or summon does no damage the turn it is cast, and the missiles are on-curve alone; only the combination converts board control into kills.

**Extenders** — *prolong* is the school's native strength: its constructs are lasting, diegetic objects (a wall stands, a cage holds, a glyph waits) that keep the window open for the whole party, often without concentration. Summons *refresh* pressure every round with their own actions. Teleports (Phase Step, Dimension Door) reposition the caster to re-angle the field mid-fight.

**Solo engine** (multi-turn): T1 Wall of Force (split the enemy line, trap the priority target on your side) → T2 Arcane Barrage (auto-hit payoff on the target that now has no cover and no escape) → T3 Summon Aberration to hold the gap as the wall's duration runs down. Gated hard by Focus (constructs and summons are expensive) and by concentration on the summon.

**Party interlock**: **emits** walls, cover, chokepoints, *restrained*, and *clusters* — terrain currency every ally spends (the martial holds the one gap, the Evocation caster fireballs the pocket the wall created). **wants** enemies pushed or dragged into its constructs (forced movement from Telekinetics or Tempest slams enemies into cage range) and conditions that hold a target still long enough to seal (slowed, prone, stunned). Cross-player line: Telekinetics hurls the enemy champion against the Wall of Force and Conjuration drops the Force Cage over them while they are pinned.

**Synergy gaps**: field setup and lasting extenders are excellent, but explicit **payoffs are implicit** — almost nothing published mechanically rewards a trapped, walled, or restrained target (the benefit is only positional). The revised seed set targets exactly this: *Grinding Walls* (R2) and *Hail of Splinters* (R3) bite targets pinned to the school's own constructs, *Seal the Cage* (R3) is the convert extender (anyone's hold → lasting force containment), and the published **Binding Seal** (R5) caps the containment payoff line. See the Proposed New Spells table.

## Current Spell Inventory (35 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Arcane Bolt, Arcane Glyph, Extraplanar Pocket |
| 1 | 8 | Alarm, Arcane Barrier, Arcane Deflection, Arcane Missiles, Conjure Familiar, Hale of Blades, Infuse Item, Mage Armor |
| 2 | 8 | Arcane Barrage, Arcane Circle, Arcane Eye, Arcane Lock, Eldritch Tendrils, Phase Step, Summon Aberration, Web |
| 3 | 7 | Arcane Blast, Astral Gate, Banishment, Burst of Tendrils, Dimension Door, Distant Eye, Wall of Force |
| 4 | 5 | Arcane Empowerment, Astral Body, Disintegrate, Force Cage, Teleportation Circle |
| 5 | 4 | Arcane Genesis, Binding Seal, Planar Gateway, Subjugation |

### Trait × Rank Coverage Matrix

> Existing spells in normal text. *Proposed new spells in italics.*

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| objects | Arcane Glyph, Extraplanar Pocket | Infuse Item | *Fabricate* | *Transmute Material* | *Conjure Apparatus* | Arcane Genesis |
| creatures | *Conjure Servant* | Conjure Familiar | Summon Aberration | *Conjure Steed* | *Forge Construct* | Subjugation |
| teleportation | *Far Reach* | *Spatial Echo* | Phase Step | Dimension Door, Astral Gate, Banishment | Teleportation Circle | Planar Gateway |
| binding | *Arcane Snare* | Alarm | Arcane Lock, Eldritch Tendrils, Web | *Seal the Cage* | Force Cage | Binding Seal |
| force | Arcane Bolt | Arcane Missiles, Arcane Barrier, Arcane Deflection, Hale of Blades, Mage Armor | Arcane Barrage, Arcane Circle, *Grinding Walls* | Arcane Blast, Burst of Tendrils, Wall of Force, *Hail of Splinters* | Disintegrate, Arcane Empowerment | — (Disintegrate Heighten) |

**Coverage**: only published spells count as real coverage — proposed entries (italics) are undesigned seeds (principle 19). Every trait now has published coverage at R5 except force, a deliberate open cell: Disintegrate's published Heighten already carries the force line to R5 (principle 3), so no separate force capstone is seeded. Conjuration is the first school complete R0–R5 (P5.1 batch, 2026-07-13).

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

These are **conceptual placeholders only** — design briefs naming the gap each fills, the intended combat and synergy role, and the mechanical hook. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

Role reads "combat-role / synergy-role" (synergy roles per the framework: setup / payoff / extender / standalone).

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Conjure Servant | 0 | Utility / standalone | Conjure a faint servant of force that performs simple physical tasks in close range: carry, fetch, hold, tidy. No combat capability and no skill rolls of its own (Unseen Servant model). Pure Excels-Utility coverage at R0 for the creatures trait. |
| Far Reach | 0 | Utility / standalone | Fold space so your reach extends to a point you can see in close range: interact with one unattended object as if touching it (teleportation trait at trick scale, principle 6). Interaction at range only — hurling, dragging, and force movement stay Telekinetics territory. |
| Arcane Snare | 0 | Offense / setup | A loop of conjured force lashes around one target: minor damage and the target is briefly grappled (binding at cantrip scale, principle 6). Emits the held state that Seal the Cage converts and that martials and Web exploit. |
| Spatial Echo | 1 | Utility / standalone | Attune to the fabric of space: gain +1 boon on Perception rolls to notice hidden openings and concealed spaces, and automatically sense active teleportation effects, extraplanar pockets, and dimensional breaches in range (bounded reveal list per principle 29). The school's counter-intelligence against its own signature tricks. |
| Fabricate | 2 | Utility / standalone | Ritual (minutes) that reshapes provided raw materials into a finished mundane product, capped at Q2 quality, never magical items. Assists rather than bypasses Crafting (principles 1 and 27): the skill stays essential above basic goods. |
| Grinding Walls | 2 | Offense / payoff | Command one of your standing force constructs (Arcane Barrier, Wall of Force) to grind against a creature pinned against or trapped inside it: force damage and briefly staggered. Cold-cast dead — no construct in contact, no spell. The school's first mechanical payoff on its own field. |
| Seal the Cage | 3 | Control / extender | Convert any existing hold on a creature (tendrils, webs, a martial ally's grapple) into conjured force shackles: they stay restrained for the duration even after the original grip ends. The shackles have durability stats per Wall of Force scaling (principle 35). A convert extender that turns anyone's momentary hold into the school's lasting containment. |
| Hail of Splinters | 3 | Offense / payoff | Your standing wall or barrier fractures its surface into a storm of force shards, striking every enemy in close range along its length. No wall, no spell — turns the field itself into a weapon and punishes enemies funneled against the construct. |
| Transmute Material | 3 | Utility / standalone | Ritual (minutes) that reweaves a volume of raw matter into another mundane substance, such as stone to clay or timber to fiber. Cannot produce precious metals, magical materials, or living matter — the exclusions carry the economy safety (principle 33). |
| Conjure Steed | 3 | Utility / standalone | Conjure a semi-translucent force steed with mount statistics for a medium duration (singular, cannot attack). Travel and repositioning utility in the Excels role — it moves the party, it does not fight. |
| Conjure Apparatus | 4 | Utility / standalone | Weave force into a self-operating device chosen from a bounded menu of modes, such as a workshop granting Crafting boons, a sentinel granting Perception boons, or a laboring engine for heavy work. Ritual (hours) keeps it out of combat; boons assist skills, never replace them (principle 1). |
| Forge Construct | 4 | Support / extender | Bind force into a physical golem shell: a lasting tier 4 companion-statted guardian with a significant material cost, a single-construct limit, and no independent judgment. A refresh extender — its actions apply pressure every round without concentration, and it holds the gaps the school's walls create. |

## Cross-School Spell Sharing

**Potential Overlap: Conjuration (Arcane) ↔ Nature (Mystic)**

The Conjure Familiar spell concept overlaps with Nature's Wild Companion — both provide an animal or creature companion for scouting and utility. Key overlap areas:

- **Conjure Familiar** (R1) and Nature's **Wild Companion** serve similar mechanical roles (scout, minor utility, action economy) but differ in flavor: conjuration pulls an extraplanar entity, Nature bonds with a natural animal
- **Summoning spells** at higher ranks could overlap with Nature's animal summoning, though Conjuration summons extraplanar creatures while Nature calls natural beasts

**Shared Spell Candidates**: Conjure Familiar is a strong candidate for cross-school sharing between Conjuration (Arcane) and Nature (Mystic), as both provide a creature companion for scouting and utility. The shared version should use identical mechanics in both spell lists.

> **Design Note**: Conjuration summons are unnatural (forced, extraplanar) while Nature summons are harmonious (willing, natural). Despite different flavor, the mechanical effect of "gain a small companion creature" is identical.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Force chain**: Arcane Bolt (R0) → Arcane Missiles/Hale of Blades (R1) → Arcane Barrage (R2) → Arcane Blast (R3) → Disintegrate (R4, Heighten to R5) — published complete; Grinding Walls (R2) and Hail of Splinters (R3) add the construct-payoff branch
2. **Creatures chain**: Conjure Servant (R0 seed) → Conjure Familiar (R1) → Summon Aberration (R2, heighten for R3 combat) → Conjure Steed (R3 seed, mobility) → Forge Construct (R4 seed, lasting) → Subjugation (R5, tier 7 conscripted entity) — published complete at top
3. **Teleportation chain**: Far Reach (R0 seed) → Spatial Echo (R1 seed) → Phase Step (R2) → Dimension Door/Astral Gate (R3) → Teleportation Circle (R4) → Planar Gateway (R5) — published complete R2–R5
4. **Binding chain**: Arcane Snare (R0 seed) → Alarm (R1) → Arcane Lock/Eldritch Tendrils/Web (R2) → Seal the Cage (R3 seed, convert) → Force Cage (R4) → Binding Seal (R5, payoff) — published complete at top
5. **Objects chain**: Arcane Glyph/Extraplanar Pocket (R0) → Infuse Item (R1) → Fabricate (R2 seed) → Transmute Material (R3 seed) → Conjure Apparatus (R4 seed) → Arcane Genesis (R5) — published at both ends

### Setup + Payoff Combos
- ✅ **Familiar scout → targeting**: Conjure Familiar marks targets, follow-up spells gain +1 boon
- ✅ **Wall → contained-target payoff**: Wall of Force/Arcane Barrier pin or funnel enemies → Grinding Walls (R2) and Hail of Splinters (R3) mechanically bite whoever the field caught — the school's declared payoff gap, now seeded
- ✅ **Hold → lasting containment**: any grapple or restraint (Arcane Snare, Web, Eldritch Tendrils, a martial ally's hold) → Seal the Cage (R3 convert) → Force Cage (R4) → Binding Seal (R5 payoff on the contained — published: seals a subdued creature for up to one year)
- ✅ **Objects crafting chain**: Fabricate (shape) → Transmute Material (change substance) → Conjure Apparatus (create tools) → Arcane Genesis (lasting creation)
- ✅ **Creatures evolution chain**: each rank offers a genuinely different creature concept — servant (utility) → familiar (scout) → aberration (combat) → steed (mobility) → construct (lasting guardian) → conscripted entity (powerful, risky ally)
- ⚠️ **Summon → teleport combo**: No direct synergy between summoning and teleportation effects (acceptable — chains are internally complete)

### Design Completeness Checklist
- [x] R1 Quick Action: Arcane Deflection (R1, published 2026-07-10) — standardized reactive defense (+2 Dodge/Parry, lingering-cover secondary)
- [x] Defensive options: Arcane Barrier (R1), Mage Armor (R1), Arcane Deflection (R1)
- [x] Utility: Extraplanar Pocket (R0), Arcane Eye (R2), Distant Eye (R3) published; Far Reach, Conjure Servant, Spatial Echo, Fabricate, Transmute Material, Conjure Steed, Conjure Apparatus, Arcane Genesis, Planar Gateway seeds
- [x] Damage across ranks: published complete R0–R5 (Arcane Bolt → Missiles → Barrage → Blast → Disintegrate with R5 Heighten)
- [x] Repeating conditions: grappled/restrained via the binding chain (Arcane Snare, Eldritch Tendrils, Web, Seal the Cage, Force Cage, Binding Seal)
- [x] Setup+payoff: wall/pin → Grinding Walls/Hail of Splinters, hold → Seal the Cage → Binding Seal, familiar → boon
- [x] Creatures across ranks: servant → familiar → aberration → steed → construct → conscripted entity, each a distinct concept
- [x] **3 spells per rank minimum**: published alone meets it at every rank R0–R5 (four R5 spells published in P5.1, plus the Disintegrate/Web/Arcane Lock/Mage Armor/Teleportation Circle Heightens)
- [x] **Trait × rank coverage**: every trait published at R5 except force (deliberately open via Disintegrate's Heighten, see matrix note); remaining seeds fill mid-rank utility cells only

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
- **Planar Gateway (R5 portal, PUBLISHED)**: Low risk — TN 16, ritual (minutes), concentrate, 5,000 coins consumed per casting, cross-sphere mode double-gated behind a Quality 6+ attuned object (principle 72). Two-way frame is deliberate risk. Exact arrival only at visited places.
- **Binding Seal (R5 containment, PUBLISHED)**: Low risk — target must already be subdued (grappled, restrained, unconscious, or willing) through the whole ritual, so the spell banks a won fight rather than winning one (tier cap dropped on that basis, owner audit). Shell blocks all outside effects (never a kill assist), breakable stats, monthly escape roll, one-year maximum.
- **Arcane Genesis (R5 permanent creation, PUBLISHED)**: Low risk — architecture only (bounded five-form menu within medium range), nothing carriable, worthless substance, anti-entombment push clause, breakable stone stats per section. Crafting and magic-item niches untouched.
- **Subjugation (R5 powerful summon, PUBLISHED, drafted as Planar Conscription)**: Moderate risk accepted — tier 7 entity (owner audit raised it from 6) for one day, priced in risk: resentful literal-word service, breakable physical circle, binding dies with the caster, freed entity typically turns on the binder. Singular.
