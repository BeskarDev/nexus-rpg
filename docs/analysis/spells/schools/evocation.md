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

**Synergy gaps**: strong on setup and payoff, historically weak on **cross-target extenders**. The revised seed set targets exactly these holes: *Wildfire* (spread — burning jumps to neighbors), *Conducting Chill* (convert — slowed → restrained, plus a lightning-rod socket), and *Elemental Ruin* (the R4 payoff capstone rewarding the fully-stacked target). See the Proposed New Spells table.

## Current Spell Inventory (18 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Flickering Flame, Frost Snap, Static Spark |
| 1 | 9 | Chromatic Orb, Elemental Ward (reactive), Flame Burst, Flaming Weapon, Frozen Weapon, Ice Shards, Lightning Arc, Lightning Weapon, Scorching Ray |
| 2 | 6 | Fireball, Frost Wave, Frostfire Shield, Ice Lance, Lightning Strike, Prismatic Missile |
| 3 | 3 | Black Flame Bolt, Chain Lightning, Dissolving Ray |
| 4 | 3 | Cone of Cold, Levin Surge, Wall of Fire |
| 5 | 2 | Fulminate, Smoldering Star |

### Trait × Rank Coverage Matrix

> Existing spells in normal text. *Proposed new spells in italics.*

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fire | Flickering Flame | Flame Burst, Flaming Weapon, Scorching Ray | Fireball, *Wildfire* | Black Flame Bolt | Wall of Fire | *Delayed Blast Meteor* |
| frost | Frost Snap | Frozen Weapon, Ice Shards | Frost Wave, Ice Lance | *Conducting Chill* | Cone of Cold | — |
| lightning | Static Spark | Lightning Arc, Lightning Weapon | Lightning Strike, Prismatic Missile | Chain Lightning | Levin Surge | Fulminate |
| acid | *Acid Splash* | Chromatic Orb (multi) | *Acid Rain* | Dissolving Ray | — (Dissolving Ray Heighten) | — |
| air | *Air Burst* | *Concussive Bolt* | *Gale Force* | *Thunderous Rupture* | *Vacuum Sphere* | — |

**Additional multi-element / utility spells**: *Temper Heat* (R0), Elemental Ward (R1), *Elemental Shaping* (R1), Chromatic Orb (R1), Frostfire Shield (R2, fire/frost), Prismatic Missile (R2), *Elemental Ruin* (R4)

**Coverage**: only published spells count as real coverage — proposed entries (italics) are undesigned seeds (principle 19). The empty R4–R5 cells are deliberate: fire and lightning each carry one R5 capstone (seeded Delayed Blast Meteor, published Fulminate), and high-rank acid rides Dissolving Ray's Heighten cascade (principle 3) instead of a duplicate spell entry. A trait does not need a dedicated capstone at every rank — an honest gap beats a filler seed. If a frost or air R5 concept with a genuinely distinct identity emerges, it earns a seed then.

## Proposed Spell Changes

### Resolved (published 2026-07-10, multi-target scaling audit)

Lightning Strike (short line, +3/+6/+9), Fireball (+3/+6/+9), Frost Wave (+3/+6/+9), and Scorching Ray Heighten (+3/6/9 and +4/8/12 per beam) now conform to the half-scaling rule in the published docs.

### Elemental Ward — Standardized Reactive Defense — RESOLVED (published 2026-07-10, P3 batch)

Realigned to the standardized R1 reactive defense (principle 4): +2 to Parry or Dodge against the triggering attack, and a melee attacker takes 2 damage (ignore AV) of one chosen elemental type (acid, fire, frost, lightning, or poison — the canonical elemental set per Chromatic Orb / Prismatic Missile, owner ruling). Heightened reflection removed; the reflection and resistance niche moved to the published **Frostfire Shield** (R2).

## Proposed New Spells

These are **conceptual placeholders only** — design briefs naming the gap each fills, the intended combat and synergy role, and the mechanical hook. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

Role reads "combat-role / synergy-role" (synergy roles per the framework: setup / payoff / extender / standalone).

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Acid Splash | 0 | Offense / standalone | Adopt Nature's published Acid Splash unchanged (acid damage, ignore 1/2 AV) as a shared spell — identical text in both lists. **No Durability check at R0** (owner decision, principle 51: at-will attrition riders are far too powerful). Acid's Durability identity starts at Acid Rain (R2). |
| Air Burst | 0 | Offense / setup | Concussive burst of compressed air (air trait) around the caster: blast damage in melee range and pushes targets a close distance away. Emits pushed positioning at will, feeding field payoffs such as shoving enemies into Wall of Fire or out of reach. |
| Temper Heat | 0 | Utility / standalone | Warm, chill, or hold the temperature of a small area or object (fire and frost traits at trick scale, principle 6). Weak-role seed kept deliberately: the school identity flags zero non-combat spells as its major gap, and this is the R0 utility answer. |
| Concussive Bolt | 1 | Offense / setup | Single-target bolt of compressed air: blast damage (ignores half AV), and on a strong or critical success the target is pushed a close distance and falls prone if they collide with an obstacle. Emits pushed/prone, the shared socket martials and Telekinetics payoffs spend. |
| Elemental Shaping | 1 | Utility / standalone | Reshape or move existing elemental material in range: bend a bonfire around a camp, carve or melt ice, part smoke or fumes (fire, frost, air traits — earth and water belong to Nature). Weak-role seed justified by the school's declared utility gap. |
| Acid Rain | 2 | Control / extender | Placed caustic zone (fixed-TN cast, flat per-tick acid damage per principle 44) that also forces a Durability check on the armor of any creature ending their turn inside. Prolong extender: keeps stripped-AV pressure open across turns for focus fire and Elemental Ruin. |
| Gale Force | 2 | Offense / setup | Short line of compressed wind: blast damage to each target and pushes them toward the line's far end, packing them together. Emits cluster — the exact state Fireball and Chain Lightning pay off. |
| Wildfire | 2 | Offense / extender | A creature already burning erupts: modest fire damage to them, and the flames leap to enemies in close range, who start burning too. Cold-cast dead (requires a burning target). This is the school's missing spread extender, chaining Flickering Flame or Fireball burns across the field, countered by water or spacing. Designed in P7.1 Batch 1: spread inherits the target's current burning value (fire spreads as hot as it already burns). |
| Stoke the Blaze | 2 | Offense / extender | (Owner idea, designed in P7.1 Batch 1.) The intensity sibling to Wildfire's spread: a direct SL-scaled fire strike (vs. Dodge, +4/8/12 — one step below the R2 single column to pay for the rider) on a burning target, plus a flat +2 to their *burning (X)* and a duration refresh. Pairs with Wildfire (spread the now-hotter burn onward) and rewards the fire-condition engine. Cold-cast dead (needs a burning target); douse rule is the counterplay. |
| Chain Lightning | 3 | Offense / payoff | Full-damage primary lightning bolt with reduced-damage chain hits leaping to enemies close to each other (chain scaling per the deviation table). Payoff on the cluster socket, and the natural spender of a Conducting Chill lightning rod. Shared with Tempest (identical in both lists). |
| Conducting Chill | 3 | Control / extender | Deep-freeze a slowed target: they are briefly restrained in ice (convert extender, slowed to restrained), and the ice acts as a lightning rod so the next lightning spell that hits them arcs to enemies in close range of them. Converts frost setup into a lightning payoff socket. |
| Dissolving Ray | 3 | Offense / setup | Single-target acid stream: damage plus AV reduction (min. 0) for a short duration and a Durability check — the corroding identity in full. Emits stripped AV as shared party currency. Its Heighten cascade carries dedicated acid to R4–R5, so no separate high-rank acid nuke is seeded (principle 3). |
| Thunderous Rupture | 3 | Offense / setup | Self-centered omnidirectional pressure pulse: blast damage in a close area, pushing targets away, and knocking them prone on a strong or critical success. Emits prone and buys the caster space when surrounded. |
| Wall of Fire | 4 | Control / extender | Standing curtain of flame with flat crossing/adjacency fire damage (principle 44) and burning on anyone who passes through. Prolong extender and field reshape. Pairs with the air push seeds (Air Burst, Gale Force, Thunderous Rupture, Vacuum Sphere) that force enemies through it. Needs concrete durability stats per principle 35. |
| Cone of Cold | 4 | Offense / payoff | Medium frost cone at reduced multi-target damage (strong-secondary trade per the deviation table): targets are briefly slowed, and targets that were already slowed are briefly restrained instead (slowed to restrained convert). Cold-cast it seeds its own follow-up; on Frost Wave setup it is the frost engine's R4 payoff. |
| Levin Surge | 4 | Offense / payoff | Single-target lightning lance priced below the R4 single-target curve when cast cold. Against a staggered target it deals bonus damage and upgrades the stagger to briefly stunned, breaking concentration. Payoff on the staggered socket Lightning Strike and Lightning Weapon emit. |
| Elemental Ruin | 4 | Offense / payoff | Single-target strike dealing bonus damage per distinct exploitable state the target carries (burning, slowed, staggered, prone, reduced AV), consuming the conditions it counts. Well below curve cold, far above when fully stacked. The condition engine's crown and the school's multi-element capstone. |
| Vacuum Sphere | 4 | Control / setup | Collapse the air at a point: creatures in the area are dragged toward the center and take blast damage, and mundane flames inside are snuffed out. Emits cluster — the state the school wants most — teeing up Fireball, Chain Lightning, or Delayed Blast Meteor. |
| Delayed Blast Meteor | 5 | Offense / standalone | A hanging orb of superheated force planted at a point, detonating on command or after a set delay, its damage growing the longer it waits (the Delayed Blast Fireball ceiling model — never Meteor Swarm). Cashes in clusters that allies or Vacuum Sphere pack together. Mandatory material cost 5,000+ per R5 rules. |

## Cross-School Spell Sharing

The following spells are shared between Evocation and mystic traditions (same spell in both lists):

| Spell | Evocation Rank | Shared With | Notes |
|-------|---------------|-------------|-------|
| **Acid Splash** | R0 | Nature (Mystic) | Identical spell — acid damage, ignore 1/2 AV (published Nature text; no Durability at R0 per principle 51) |
| **Chain Lightning** | R3 | Tempest (Mystic) | Identical spell — primary + chain targets |

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Acid Splash represents both transgressive elemental acid (Evocation) and natural toxin (Nature). Chain Lightning represents both raw elemental control (Evocation) and natural storm power (Tempest). When a spell is shared, it must be identical in both lists.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Fire chain**: Flickering Flame (R0 condition) → Flame Burst/Scorching Ray (R1 damage) → Fireball (R2 AoE) → Wildfire (R2 spread) → Black Flame Bolt (R3 single) → Wall of Fire (R4 control) → Delayed Blast Meteor (R5)
2. **Frost chain**: Frost Snap (R0 condition) → Ice Shards/Frozen Weapon (R1) → Frost Wave/Ice Lance (R2) → Conducting Chill (R3 convert) → Cone of Cold (R4 payoff)
3. **Lightning chain**: Static Spark (R0 condition) → Lightning Arc (R1) → Lightning Strike (R2 line) → Chain Lightning (R3 chain) → Levin Surge (R4 payoff) → Fulminate (R5 AoE, published)
4. **Acid chain**: Acid Splash (R0 weak rider) → Chromatic Orb (R1 multi) → Acid Rain (R2 zone, Durability entry rank) → Dissolving Ray (R3 single, Heighten carries to R4–R5)
5. **Air chain**: Air Burst (R0 push) → Concussive Bolt (R1 single) → Gale Force (R2 line) → Thunderous Rupture (R3 self-AoE) → Vacuum Sphere (R4 implosion)
6. **AV-strip combo**: Acid Rain (R2 Durability pressure) → Dissolving Ray (AV reduction, heightened for deeper strip) → fire/lightning follow-ups and martial focus fire deal more effective damage
7. **Condition-stack engine**: any two elemental setups (burning, slowed, staggered, prone, reduced AV) → Elemental Ruin (R4 payoff consumes the stack)
8. **Frost-to-lightning convert**: Frost Snap/Frost Wave (slowed) → Conducting Chill (restrained + lightning rod) → Lightning Strike/Chain Lightning (arcing payoff)
9. **Anti-caster**: Lightning Strike/Lightning Weapon (staggered) → Levin Surge (R4 stagger-to-stunned concentration break)

### Setup + Payoff Combos
- ✅ **Element condition → bonus damage**: well-supported across ranks, capped by Elemental Ruin (R4) consuming the full stack
- ✅ **AV strip → focus fire**: Acid Rain (zone Durability, the R2 entry rank) → Dissolving Ray (AV reduction, short duration) → all subsequent damage more effective
- ✅ **Air push → AoE cluster**: Gale Force packs a line, Vacuum Sphere drags a room together → Fireball/Chain Lightning/Delayed Blast Meteor hit more targets
- ✅ **Air push → Wall of Fire**: shove enemies through the wall with Air Burst/Concussive Bolt/Thunderous Rupture for forced crossing damage
- ✅ **Frost convert**: Frost Snap/Frost Wave/Ice Shards apply slowed → Conducting Chill (R3) or Cone of Cold (R4) converts slowed to restrained
- ✅ **Fire spread**: Flickering Flame/Fireball apply burning → Wildfire (R2) leaps the burn to neighbors
- ✅ **Frost → lightning conductor**: Conducting Chill explicitly turns a frozen target into an arc socket for the next lightning spell
- ✅ **Concentration breaking**: staggered emitters → Levin Surge (R4 stagger-to-stunned)

### Design Completeness Checklist
- [x] R1 Quick Action: Elemental Ward (R1, realigned 2026-07-10) — standardized reactive defense (+2 Dodge/Parry, elemental backlash secondary)
- [x] Defensive options: Elemental Ward (R1), Frostfire Shield (R2), Wall of Fire (R4) — all published
- [x] Utility: Temper Heat (R0 seed), Elemental Shaping (R1 seed) — the school's only non-combat coverage, kept despite the Weak role because the identity section names utility as the major gap
- [x] Damage across all ranks: published R0–R3 plus Fulminate (R5); seeds fill R4 and reinforce R5
- [x] Repeating conditions: burning, slowed, staggered, corroding (Durability + AV reduction), pushed/prone (air)
- [x] Setup+payoff: condition stack → Elemental Ruin, slowed → restrained converts, burning spread (Wildfire), frost → lightning rod (Conducting Chill), Durability → AV strip → focus fire, push → cluster → AoE
- [x] Cross-school sharing: Acid Splash (Nature), Chain Lightning (Tempest)
- [ ] **Trait × rank coverage**: published coverage is thin at R3+ (see inventory); seeds cover every trait through R4. Frost, acid, and air R5 are deliberate open cells (see matrix note) — no filler seeds
- [ ] **Element capstones at R5**: lightning published (Fulminate), fire seeded (Delayed Blast Meteor); frost/acid/air intentionally unseeded until a distinct concept earns the slot
