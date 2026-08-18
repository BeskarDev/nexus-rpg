# Evocation — Spell School Design Space

## School Identity

**Discipline**: Evocation (Arcane)
**Traits**: fire, frost, lightning, acid, air
**Identity**: Transgressive elemental manipulation — raw, destructive power over the elements
**Role Spread**: Excels: Offense | Decent: Control, Defense | Weak: Healing, Support, Utility

### Mechanical Identity
- **Primary Conditions**: Burning (fire), slowed (frost), staggered (lightning), corroding (acid), prone/pushed (air)
- **Signature Gimmick**: Element choice — many spells let the caster pick between fire/frost/lightning/acid, each with distinct secondary effects. Air spells provide concussive force and repositioning.
- **Damage Types**: Fire, Frost, Lightning, Acid, Blast
- **Corroding (Acid) Identity**: Acid spells attack equipment through the **Durability system** — forcing Durability checks on armor and weapons — and apply temporary AV reduction for at least a **short duration**. This creates a slow war of attrition against armored foes. R0 acid should NOT directly reduce AV; instead it forces Durability checks. Higher-rank acid spells combine Durability pressure with temporary AV reduction (minimum short duration).

> **Note on "air" vs Tempest "thunderstorms"**: Evocation's air trait represents raw elemental air pressure — concussive blasts, vacuum pockets, and compressed wind. This differs from Tempest's natural storm weather (hurricanes, thunder). Evocation air is transgressive manipulation of air as a raw element; Tempest channels reverent natural forces.

### Design Principles
1. Evocation is the premier damage school — highest raw damage output across all arcane disciplines
2. Elemental variety provides tactical depth: fire for sustained damage (burning), frost for control (slowed), lightning for disruption (staggered), acid for equipment degradation (corroding/Durability), air for repositioning (push/prone)
3. Defensive options exist but are limited to elemental wards and barriers
4. **Major gap**: Zero utility/non-combat spells — needs environmental manipulation
5. **Cross-school sharing**: Acid Splash and Chain Lightning exist in mystic schools (Nature and Tempest respectively) and should be shared — same spell available to both lists

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Evocation emits: *burning* (fire), *slowed* (frost), *staggered* (lightning), *corroding* + **stripped AV** (acid, via Durability checks), and *clustering / difficult terrain* (air push, ice fields).

**Payoff levers** — Evocation rewards *stacked conditions* and *clusters*: a target carrying several elemental conditions takes compounding penalties, and AoE fire/lightning cashes in grouped or terrain-locked enemies (lightning gains conductivity through ice terrain). The cold-cast deficit holds — these read as ordinary on-curve damage against a fresh target and only leap ahead once the setup is present.

**Extenders** — *refresh* conditions to keep the window open (elemental weapon enchants re-apply *burning*/*slowed* on every hit, cantrip taps like Flickering Flame/Static Spark top up a fading condition), and *prolong* via terrain (ice fields and burning ground passively re-slow or re-burn anyone standing in them). Evocation is thin on *spread* and *convert* extenders — see gaps.

**Solo engine** (multi-turn): T1 Frost Wave (*slowed* + ice terrain over a cluster) → T2 Lightning Strike (line payoff, conductive through the ice, hits the grouped and slowed) → T3 Frozen Weapon to re-slow stragglers and hold the terrain. Gated by Focus and by concentration on the terrain effect, so the engine trades sustained field control against casting anything else.

**Party interlock**: **emits** *slowed*, *burning*, *staggered*, *stripped AV*, and difficult terrain — universal currency the whole party spends (a slowed, AV-stripped enemy is a free, harder-hitting attack for every martial). **wants** *prone* and *clustering* it cannot reliably make itself. Cross-player line: a Telekinetics caster knocks the mob *prone* and packs them together, then Evocation's Fireball detonates the grounded cluster for the kill.

**Synergy gaps (updated 2026-07-17)**: the spread extender (*Wildfire*, R2) and intensity extender (*Stoke the Blaze*, R2) are published, as are the staggered payoff (*Levin Surge*, R4) and the frost convert (*Cone of Cold*, R4). The R3 frost→lightning convert (*Conducting Chill*) and self-centered air burst (*Thunderous Rupture*) are also now published (2026-07-17). No open seeds remain. The old R4 payoff capstone (*Elemental Ruin*) and cluster-maker (*Vacuum Sphere*) were passed over.

## Current Spell Inventory (37 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 6 | Acid Splash, Air Burst, Flickering Flame, Frost Snap, Static Spark, Temper Heat |
| 1 | 11 | Chromatic Orb, Concussive Bolt, Elemental Shaping, Elemental Ward (reactive), Flame Burst, Flaming Weapon, Frozen Weapon, Ice Shards, Lightning Arc, Lightning Weapon, Scorching Ray |
| 2 | 10 | Acid Rain, Fireball, Frost Wave, Frostfire Shield, Gale Force, Ice Lance, Lightning Strike, Prismatic Missile, Stoke the Blaze, Wildfire |
| 3 | 5 | Black Flame Bolt, Chain Lightning, Conducting Chill, Dissolving Ray, Thunderous Rupture |
| 4 | 3 | Cone of Cold, Levin Surge, Wall of Fire |
| 5 | 2 | Fulminate, Smoldering Star |

### Trait × Rank Coverage Matrix

> Existing spells in normal text. *Proposed new spells in italics.*

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fire | Flickering Flame | Flame Burst, Flaming Weapon, Scorching Ray | Fireball, Wildfire, Stoke the Blaze | Black Flame Bolt | Wall of Fire | Smoldering Star |
| frost | Frost Snap | Frozen Weapon, Ice Shards | Frost Wave, Ice Lance | Conducting Chill | Cone of Cold | — |
| lightning | Static Spark | Lightning Arc, Lightning Weapon | Lightning Strike, Prismatic Missile | Chain Lightning | Levin Surge | Fulminate |
| acid | Acid Splash | Chromatic Orb (multi) | Acid Rain | Dissolving Ray | — (Dissolving Ray Heighten) | — |
| air | Air Burst | Concussive Bolt | Gale Force | Thunderous Rupture | — | — |

**Additional multi-element / utility spells**: Temper Heat (R0), Elemental Ward (R1), Elemental Shaping (R1), Chromatic Orb (R1), Frostfire Shield (R2, fire/frost), Prismatic Missile (R2)

**Coverage (updated 2026-07-17)**: only published spells count as real coverage — Conducting Chill and Thunderous Rupture (both R3) published 2026-07-17. Smoldering Star (published R5) took the fire-capstone slot the old Delayed Blast Meteor seed targeted; Elemental Ruin and Vacuum Sphere (R4) were passed over in the P4 cycle. The empty R4–R5 cells are deliberate — high-rank acid rides Dissolving Ray's Heighten cascade (principle 3), and a trait does not need a dedicated capstone at every rank.

## Proposed Spell Changes

### Resolved (published 2026-07-10, multi-target scaling audit)

Lightning Strike (short line, +3/+6/+9), Fireball (+3/+6/+9), Frost Wave (+3/+6/+9), and Scorching Ray Heighten (+3/6/9 and +4/8/12 per beam) now conform to the half-scaling rule in the published docs.

### Elemental Ward — Standardized Reactive Defense — RESOLVED (published 2026-07-10, P3 batch)

Realigned to the standardized R1 reactive defense (principle 4): +2 to Parry or Dodge against the triggering attack, and a melee attacker takes 2 damage (ignore AV) of one chosen elemental type (acid, fire, frost, lightning, or poison — the canonical elemental set per Chromatic Orb / Prismatic Missile, owner ruling). Heightened reflection removed; the reflection and resistance niche moved to the published **Frostfire Shield** (R2).

## Proposed New Spells

These are **conceptual placeholders only** — design briefs naming the gap each fills, the intended combat and synergy role, and the mechanical hook. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

Role reads "combat-role / synergy-role" (synergy roles per the framework: setup / payoff / extender / standalone).

*Published from this table (2026-07-10 to 2026-07-17): Acid Splash (R0, shared with Nature), Air Burst (R0), Temper Heat (R0, renamed from Thermal Control in P9), Concussive Bolt (R1), Elemental Shaping (R1), Acid Rain (R2), Gale Force (R2), Wildfire (R2), Stoke the Blaze (R2), Chain Lightning (R3), Dissolving Ray (R3), Conducting Chill (R3), Thunderous Rupture (R3), Wall of Fire (R4), Cone of Cold (R4), Levin Surge (R4, renamed from Voltaic Surge in P9). Rejected or passed over (owner choice — do not re-seed): Elemental Ruin (R4), Vacuum Sphere (R4), Delayed Blast Meteor (R5, capstone slot taken by Smoldering Star).*

**No open seeds remain in this school.**

## Cross-School Spell Sharing

The following spells are shared between Evocation and mystic traditions (same spell in both lists):

| Spell | Evocation Rank | Shared With | Notes |
|-------|---------------|-------------|-------|
| **Acid Splash** | R0 | Nature (Mystic) | Identical spell — acid damage, ignore 1/2 AV (published Nature text; no Durability at R0 per principle 51) |
| **Chain Lightning** | R3 | Tempest (Mystic) | Identical spell — primary + chain targets |

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Acid Splash represents both transgressive elemental acid (Evocation) and natural toxin (Nature). Chain Lightning represents both raw elemental control (Evocation) and natural storm power (Tempest). When a spell is shared, it must be identical in both lists.

## Synergy & Completeness Assessment

### Spell Progression Chains
(✨ = undesigned seed)
1. **Fire chain**: Flickering Flame (R0 condition) → Flame Burst/Scorching Ray (R1 damage) → Fireball (R2 AoE) → Wildfire/Stoke the Blaze (R2 extenders) → Black Flame Bolt (R3 single) → Wall of Fire (R4 control) → Smoldering Star (R5) — **published R0–R5**
2. **Frost chain**: Frost Snap (R0 condition) → Ice Shards/Frozen Weapon (R1) → Frost Wave/Ice Lance (R2) → Conducting Chill (R3 convert, published) → Cone of Cold (R4 payoff)
3. **Lightning chain**: Static Spark (R0 condition) → Lightning Arc (R1) → Lightning Strike (R2 line) → Chain Lightning (R3 chain) → Levin Surge (R4 payoff) → Fulminate (R5 AoE) — **published R0–R5**
4. **Acid chain**: Acid Splash (R0 weak rider) → Chromatic Orb (R1 multi) → Acid Rain (R2 zone, Durability entry rank) → Dissolving Ray (R3 single, Heighten carries to R4–R5) — **published**
5. **Air chain**: Air Burst (R0 push) → Concussive Bolt (R1 single) → Gale Force (R2 line) → Thunderous Rupture (R3 self-AoE) → honest gap (R4+)
6. **AV-strip combo**: Acid Rain (R2 Durability pressure) → Dissolving Ray (AV reduction, heightened for deeper strip) → fire/lightning follow-ups and martial focus fire deal more effective damage — published
7. **Frost-to-lightning convert**: Frost Snap/Frost Wave (slowed) → Conducting Chill (restrained + lightning rod) → Lightning Strike/Chain Lightning (arcing payoff)
8. **Anti-caster**: Lightning Strike/Lightning Weapon (staggered) → Levin Surge (R4 stagger-to-stunned concentration break) — published

### Setup + Payoff Combos
- ✅ **AV strip → focus fire**: Acid Rain (zone Durability, the R2 entry rank) → Dissolving Ray (AV reduction, short duration) → all subsequent damage more effective — published
- ✅ **Air push → AoE cluster**: Gale Force packs a line → Fireball/Chain Lightning hit more targets — published
- ✅ **Air push → Wall of Fire**: shove enemies through the wall with Air Burst/Concussive Bolt for forced crossing damage — published
- ✅ **Frost convert**: Frost Snap/Frost Wave/Ice Shards apply slowed → Conducting Chill (R3, published) adds the single-target rung + lightning rod, Cone of Cold (R4) converts slowed to restrained
- ✅ **Fire engine**: Flickering Flame/Fireball apply burning → Wildfire (R2) leaps the burn to neighbors, Stoke the Blaze (R2) intensifies it — published
- ✅ **Concentration breaking**: staggered emitters → Levin Surge (R4 stagger-to-stunned) — published

### Design Completeness Checklist
- [x] R1 Quick Action: Elemental Ward (R1, realigned 2026-07-10) — standardized reactive defense (+2 Dodge/Parry, elemental backlash secondary)
- [x] Defensive options: Elemental Ward (R1), Frostfire Shield (R2), Wall of Fire (R4) — all published
- [x] Utility: Temper Heat (R0), Elemental Shaping (R1) — published, the school's non-combat answer to its declared utility gap
- [x] Damage across all ranks: published R0–R5 (Fulminate, Smoldering Star at R5)
- [x] Repeating conditions: burning, slowed, staggered, corroding (Durability + AV reduction), pushed/prone (air)
- [x] Setup+payoff: burning spread/intensify (Wildfire, Stoke the Blaze), slowed → restrained (Cone of Cold), frost→lightning bridge (Conducting Chill), Durability → AV strip → focus fire, push → cluster → AoE — all published
- [x] Cross-school sharing: Acid Splash (Nature), Chain Lightning (Tempest)
- [x] **Trait × rank coverage**: R3 published at 5 (Conducting Chill and Thunderous Rupture published 2026-07-17); frost, acid, and air R5 are deliberate open cells
