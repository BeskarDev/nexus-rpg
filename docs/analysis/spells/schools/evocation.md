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

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Evocation emits: *burning* (fire), *slowed* (frost), *staggered* (lightning), *corroding* + **stripped AV** (acid, via Durability checks), and *clustering / difficult terrain* (air push, ice fields).

**Payoff levers** — Evocation rewards *stacked conditions* and *clusters*: a target carrying several elemental conditions takes compounding penalties, and AoE fire/lightning cashes in grouped or terrain-locked enemies (lightning gains conductivity through ice terrain). The cold-cast deficit holds — these read as ordinary on-curve damage against a fresh target and only leap ahead once the setup is present.

**Extenders** — *refresh* conditions to keep the window open (elemental weapon enchants re-apply *burning*/*slowed* on every hit, cantrip taps like Flickering Flame/Static Spark top up a fading condition), and *prolong* via terrain (ice fields and burning ground passively re-slow or re-burn anyone standing in them). Evocation is thin on *spread* and *convert* extenders — see gaps.

**Solo engine** (multi-turn): T1 Frost Wave (*slowed* + ice terrain over a cluster) → T2 Lightning Strike (line payoff, conductive through the ice, hits the grouped and slowed) → T3 Frozen Weapon to re-slow stragglers and hold the terrain. Gated by Focus and by concentration on the terrain effect, so the engine trades sustained field control against casting anything else.

**Party interlock**: **emits** *slowed*, *burning*, *staggered*, *stripped AV*, and difficult terrain — universal currency the whole party spends (a slowed, AV-stripped enemy is a free, harder-hitting attack for every martial). **wants** *prone* and *clustering* it cannot reliably make itself. Cross-player line: a Telekinetics caster knocks the mob *prone* and packs them together, then Evocation's Fireball detonates the grounded cluster for the kill.

**Synergy gaps**: strong on setup and payoff, weak on **cross-target extenders** — no way to *spread* one target's stacked conditions to its neighbors, and no *convert* (e.g. burning → a spreading blaze). A capstone R4–R5 payoff that rewards the fully-stacked target (the old "Elemental Cataclysm" idea) is also still unbuilt. Both are design targets.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Wildfire** (R2, extender/spread) — a *burning* target erupts: the flames leap to enemies in close range of them, who start *burning* too. Cold-cast dead (needs an already-burning target). Fire as contagion, diegetic and countered by water or distance.
- **Conducting Chill** (R3, extender/convert) — deep-freeze a *slowed* target: they become briefly *restrained* in ice that turns them into a lightning rod, the next lightning spell against them arcs to all enemies in close range. Converts frost setup into a lightning payoff socket.
- **Elemental Ruin** (R4, payoff capstone) — single-target strike that deals +damage per distinct elemental condition the target carries (burning, slowed, staggered, poisoned, stripped AV), consuming them all. Below-curve cold, far above when fully stacked — the engine's crown.

## Current Spell Inventory (18 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Flickering Flame, Frost Snap, Static Spark |
| 1 | 9 | Chromatic Orb, Elemental Ward, Flame Burst, Flaming Weapon, Frozen Weapon, Ice Shards, Lightning Arc, Lightning Weapon, Scorching Ray |
| 2 | 5 | Fireball, Frost Wave, Ice Lance, Lightning Strike, Prismatic Missile (incomplete) |
| 3 | 1 | Black Flame Bolt |
| 4 | 0 | — |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

> Existing spells in normal text. *Proposed new spells in italics.*

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fire | Flickering Flame | Flame Burst, Flaming Weapon, Scorching Ray | Fireball | Black Flame Bolt | *Wall of Fire* | *Delayed Blast Meteor* |
| frost | Frost Snap | Frozen Weapon, Ice Shards | Frost Wave, Ice Lance | *Glacial Spike* | *Cone of Cold* | *Glacial Cataclysm* |
| lightning | Static Spark | Lightning Arc, Lightning Weapon | Lightning Strike, Prismatic Missile | *Chain Lightning* | *Voltaic Surge* | *Lightning Maelstrom* |
| acid | *Acid Splash* | Chromatic Orb (multi) | *Acid Rain* | *Corrosive Torrent* | *Vitriol* | *Dissolving Wave* |
| air | *Air Burst* | *Concussive Bolt* | *Gale Force* | *Shockwave* | *Vacuum Sphere* | *Annihilating Vortex* |

**Additional multi-element / utility spells**: *Thermal Control* (R0), Elemental Ward (R1), *Elemental Shaping* (R1), Chromatic Orb (R1), *Fire Shield* (R2, fire/frost), Prismatic Missile (R2), *Elemental Cataclysm* (R4), *Elemental Tempest* (R5)

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

**All five traits now have dedicated spells at every rank R0–R5**, plus multi-element options providing additional flexibility at R1, R2, R4, and R5.

## Proposed Spell Changes

### Lightning Strike — Area Reduction

**Current**: Line in medium range at Rank 2
**Proposed**: Reduce to **short line** to match R2 area progression (close area / short line)
**Rationale**: R2 spells should affect a close area or short line per the area progression framework.

### Fireball — Damage Reduction

**Current**: +4/+8/+12 AoE at Rank 2
**Proposed**: Reduce to **+3/+6/+9** to match half single-target scaling for multi-target R2
**Rationale**: Under the revised half-damage AoE scaling, R2 multi-target should be +3/+6/+9.

### Frost Wave — Damage Reduction

**Current**: +4/+8/+12 AoE cone at Rank 2
**Proposed**: Reduce to **+3/+6/+9** to match half single-target scaling
**Rationale**: Same as Fireball — consistent multi-target scaling.

### Elemental Ward — Standardized Reactive Defense

**Current**: Quick Action self-buff that grants brief elemental resistance (acid, fire, frost, lightning, poison). Heightened versions add damage reflection (half at R2, full at R3).
**Proposed**: Realign to the standardized R1 reactive defense pattern:
- **Quick Action** (reactive): When an enemy targets you with an attack, gain **+2 to Dodge or Parry** (your choice) against the triggering attack. If the attacker is within melee range, they take 2 damage of an element you choose (fire, frost, lightning, acid, or blast). Effect is identical on any success — no SL scaling.
- Remove heightened versions (damage reflection moves to Fire Shield at R2 which already fills that niche).
**Rationale**: All schools follow the same standardized R1 reactive defense pattern: base +2 Dodge/Parry, one school-specific secondary, no SL scaling. Evocation's secondary is elemental backlash damage — thematically fitting as transgressive energy lashes out reflexively at attackers. The current "elemental resistance" version is more of a buff than a reactive defense and doesn't match the standard.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Acid Splash | 0 | You fling a glob of corrosive acid at your target, sizzling on contact and eating into their equipment. (Fills the R0 acid gap) |
| Air Burst | 0 | You release a concussive burst of compressed air in your immediate vicinity. (Fills the R0 air gap) |
| Thermal Control | 0 | You regulate the temperature in a small area — warming, cooling, or maintaining a comfortable environment. (R0 utility cantrip) |
| Elemental Shaping | 1 | You manipulate raw elemental matter — reshaping fire, water, earth, or air to your will. (R1 utility spell) |
| Fire Shield | 2 | You wreathe yourself in protective flames or frost, lashing back at any who dare strike you. (R2 defensive option that reinforces the elemental identity while providing meaningful protection) |
| Glacial Spike | 3 | You conjure a massive shard of crystallized frost and hurl it at your target, where it detonates in a burst of freezing cold. (Fills R3 frost gap) |
| Chain Lightning | 3 | You unleash a bolt of lightning that arcs from target to target, leaping between foes with devastating effect. (R3 chain spell) |
| Corrosive Torrent | 3 | You unleash a stream of concentrated acid that eats through armor, flesh, and stone alike. (Fills R3 acid gap) |
| Elemental Cataclysm | 4 | You channel all four elemental forces simultaneously into a devastating strike — fire, frost, lightning, and acid converge on a single point. (R4 capstone single-target) |
| Acid Rain | 2 | You conjure a cloud of caustic mist that rains acid over an area, slowly dissolving armor and flesh. (R2 dedicated acid spell — fills the R2 acid gap) |
| Gale Force | 2 | You compress the air ahead of you and release it in a devastating line of concussive force. (R2 air spell) |
| Vacuum Sphere | 4 | You create a sphere of total vacuum that implodes violently, crushing everything within and sucking the air from lungs. (R4 air spell — control through air manipulation) |
| Elemental Tempest | 5 | You conjure a vortex of all five elements — fire, frost, lightning, acid, and compressed air — swirling in a devastating maelstrom of pure elemental destruction. (R5 AoE capstone alongside Delayed Blast Meteor) |
| Dissolving Wave | 5 | You release a tidal wave of concentrated acid that sweeps across the battlefield, dissolving everything it touches. (R5 acid AoE capstone) |
| Delayed Blast Meteor | 5 | You conjure a swirling mass of superheated elemental energy suspended in the air, which detonates after a delay — or at your command. (R5 capstone) |
| Concussive Bolt | 1 | You compress the air between your hands into a dense sphere of invisible force and hurl it at your target — the impact strikes like an unseen battering ram, slamming through armor with concussive fury. (Fills the R1 air gap) |
| Shockwave | 3 | You gather compressed air around your body until the pressure becomes unbearable, then release it in a devastating omnidirectional pulse — the concussive shockwave ripples outward, flattening everything in its wake. (Fills the R3 air gap) |
| Wall of Fire | 4 | You raise a roaring curtain of flame across the battlefield — a shimmering wall of superheated air and blazing fire that punishes any who approach and agonizes any who dare cross through. (Fills the R4 fire gap) |
| Cone of Cold | 4 | You exhale a blast of supernaturally cold air that flash-freezes everything before you — moisture crystallizes in an instant, metal becomes brittle, and living creatures are rimed in frost. (Fills the R4 frost gap) |
| Voltaic Surge | 4 | You channel an overwhelming lance of raw lightning into your target — not the forking discharge of a natural storm, but a concentrated, transgressive torrent of electrical power that courses through every nerve and sinew. (Fills the R4 lightning gap) |
| Vitriol | 4 | You conjure a jet of impossibly concentrated acid and direct it at your foe — the vitriol eats through armor, flesh, and bone with horrifying speed, leaving only smoking ruin and the acrid stench of dissolution. (Fills the R4 acid gap) |
| Glacial Cataclysm | 5 | You plunge a vast expanse into supernatural cold, flash-freezing the very air itself — creatures become ice statues, water solidifies in an instant, and even stone cracks from the thermal shock. This is frost wielded not as nature intended, but as a weapon of transgressive annihilation. (R5 frost capstone) |
| Lightning Maelstrom | 5 | You raise your hands and tear open the sky, calling down a barrage of lightning bolts — dozens of searing electrical strikes hammer the battlefield in rapid succession, each powerful enough to shatter stone, the combined onslaught overwhelming all within. (R5 lightning capstone) |
| Annihilating Vortex | 5 | You rip the atmosphere asunder, collapsing air pressure across a vast area before releasing it in a catastrophic pressure wave — a transgressive display of absolute dominion over the invisible element, the shockwave flattening structures and hurling creatures like ragdolls. (R5 air capstone) |

## Cross-School Spell Sharing

The following spells are shared between Evocation and mystic traditions (same spell in both lists):

| Spell | Evocation Rank | Shared With | Notes |
|-------|---------------|-------------|-------|
| **Acid Splash** | R0 | Nature (Mystic) | Identical spell — acid damage + Durability check |
| **Chain Lightning** | R3 | Tempest (Mystic) | Identical spell — primary + chain targets |

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Acid Splash represents both transgressive elemental acid (Evocation) and natural toxin (Nature). Chain Lightning represents both raw elemental control (Evocation) and natural storm power (Tempest). When a spell is shared, it must be identical in both lists.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Fire chain**: Flickering Flame (R0 condition) → Flame Burst/Scorching Ray (R1 damage) → Fireball (R2 AoE) → Black Flame Bolt (R3 single) → Wall of Fire (R4 control) → Delayed Blast Meteor (R5 AoE)
2. **Frost chain**: Frost Snap (R0 condition) → Ice Shards/Frozen Weapon (R1) → Frost Wave/Ice Lance (R2) → Glacial Spike (R3 single) → Cone of Cold (R4 cone AoE) → Glacial Cataclysm (R5 AoE)
3. **Lightning chain**: Static Spark (R0 condition) → Lightning Arc (R1) → Lightning Strike (R2 line) → Chain Lightning (R3 chain) → Voltaic Surge (R4 single) → Lightning Maelstrom (R5 AoE)
4. **Acid chain**: Acid Splash (R0 Durability) → Chromatic Orb (R1 multi) → Acid Rain (R2 zone) → Corrosive Torrent (R3 single) → Vitriol (R4 single) → Dissolving Wave (R5 AoE)
5. **Air chain**: Air Burst (R0 push) → Concussive Bolt (R1 single) → Gale Force (R2 line) → Shockwave (R3 self-AoE) → Vacuum Sphere (R4 implosion) → Annihilating Vortex (R5 AoE)
6. **AV-strip combo**: Acid Splash/Acid Rain (Durability pressure) → Corrosive Torrent (R3 AV reduction) → Vitriol (R4 heavy AV strip) → fire/lightning follow-ups deal devastating effective damage
7. **Multi-element**: Chromatic Orb (R1) → Prismatic Missile (R2) → Elemental Cataclysm (R4) → Elemental Tempest (R5)
8. **Frost stacking**: Frost Snap/Ice Shards (apply slowed) → Cone of Cold (slowed→restrained on Strong) / Glacial Cataclysm (slowed→restrained on Strong)
9. **Anti-caster**: Voltaic Surge (R4 single-target concentration break) → Lightning Maelstrom (R5 mass concentration break)

### Setup + Payoff Combos
- ✅ **Element condition → bonus damage**: Well-supported across ranks
- ✅ **AV strip → focus fire**: Acid Splash (Durability) → Acid Rain (zone Durability) → Corrosive Torrent/Vitriol (AV reduction, short duration) → all subsequent damage more effective
- ✅ **Air push → AoE cluster**: Air Burst/Concussive Bolt/Gale Force/Shockwave push enemies together → Fireball/Frost Wave/Cone of Cold hit more targets
- ✅ **Air push → Wall of Fire**: Push enemies through Wall of Fire with Concussive Bolt/Shockwave/Annihilating Vortex for forced damage
- ✅ **Frost stacking → restrained**: Frost Snap/Ice Shards apply slowed → Cone of Cold/Glacial Cataclysm escalates slowed to restrained on Strong success
- ✅ **Concentration breaking**: Voltaic Surge (R4 single) → Lightning Maelstrom (R5 mass) — dedicated anti-caster progression
- ⚠️ **Frost terrain → lightning conductor**: Conceptually strong but needs explicit mechanical support in spell text
- ❌ **Fire → Frost synergy**: No explicit mechanical link between burning and slowed conditions

### Design Completeness Checklist
- [x] R1 Quick Action: Elemental Ward (R1) — proposed standardization to +2 Dodge/Parry, elemental backlash secondary, no SL scaling
- [x] Defensive options: Elemental Ward (R1), Fire Shield (R2), Wall of Fire (R4)
- [x] Utility: Thermal Control (R0), Elemental Shaping (R1)
- [x] Damage across all ranks: R0-R5 fully covered with 3+ spells per rank
- [x] Repeating conditions: Burning, slowed, staggered, corroding (Durability + AV reduction), pushed/prone (air)
- [x] Setup+payoff: Condition stacking (frost→restrained), Durability→AV strip→focus fire, air push→AoE/wall, anti-caster (concentration breaking)
- [x] Cross-school sharing: Acid Splash (Nature), Chain Lightning (Tempest)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 11, R2: 8, R3: 5, R4: 6, R5: 6)
- [ ] **Every trait at every rank R0-R5**: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) trait×rank slots filled (100%)
- [x] **Dedicated element capstones at R5**: Fire (Delayed Blast Meteor), Frost (Glacial Cataclysm), Lightning (Lightning Maelstrom), Acid (Dissolving Wave), Air (Annihilating Vortex) — plus multi-element Elemental Tempest
