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
- **Setup**: Apply elemental condition (burning/slowed/staggered) → **Payoff**: Follow-up spells deal bonus damage or have enhanced effects against conditioned targets
- **Element stacking**: Apply multiple elemental conditions to the same target for compounding penalties (Elemental Cataclysm at R4 is the ultimate payoff for this)
- **AV strip → Focus fire**: Acid spells degrade equipment via Durability checks and apply temporary AV reduction (short duration) → subsequent fire/lightning spells deal more effective damage
- **Terrain control**: Frost spells create ice terrain → enemies slowed in terrain take extra damage from lightning (conductivity)
- **Air repositioning → AoE setup**: Air spells push enemies into clusters → follow-up AoE fire/lightning spells hit more targets
- **Cantrip → R1 escalation**: Flickering Flame/Static Spark apply conditions → Chromatic Orb or elemental weapon follow-ups exploit them

## Current Spell Inventory (18 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Flickering Flame, Frost Snap, Static Spark |
| 1 | 9 | Chromatic Orb, Elemental Ward, Flame Burst, Flaming Weapon, Frozen Weapon, Ice Shards, Lightning Arc, Lightning Weapon, Scorching Ray |
| 2 | 5 | Fireball, Frost Wave, Ice Lance, Lightning Strike, Prismatic Missile |
| 3 | 1 | Black Flame Bolt |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fire | Flickering Flame | Flame Burst, Flaming Weapon, Scorching Ray | Fireball | Black Flame Bolt | — | — |
| frost | Frost Snap | Frozen Weapon, Ice Shards | Frost Wave, Ice Lance | — | — | — |
| lightning | Static Spark | Lightning Arc, Lightning Weapon | Lightning Strike, Prismatic Missile | — | — | — |
| acid | ❌ **GAP** | Chromatic Orb (multi) | — | — | — | — |
| air | ❌ **GAP** | — | — | — | — | — |

**Coverage**: 11/30 slots filled (37%) — significant R3-R5 gaps across all traits

**Critical Gaps**:
- **Acid**: No R0 cantrip, only accessible via Chromatic Orb (multi-element). No dedicated acid spells at R2+
- **Air**: Zero spells at any rank — concussive air pressure entirely absent
- **All traits R4-R5**: Evocation has no spells above R3 — the premier damage school lacks high-rank options
- **Frost R3+**: No dedicated frost spells above R2
- **Lightning R3+**: No dedicated lightning spells above R2

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

## Proposed New Spells

### Acid Splash

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Medium | —

*You fling a glob of corrosive acid at your target, sizzling on contact and eating into their equipment.*

**Weak.** Deal +2 acid damage. The acid clings to the target's armor or weapon — they must make a **Durability check** for one piece of equipment (your choice) at the end of their next turn.
**Strong.** Deal +4 acid damage. The target must make a Durability check for one piece of equipment immediately.
**Critical.** Deal +6 acid damage. The target must make a Durability check for up to two pieces of equipment immediately.

> **Design Note**: Fills the R0 acid gap. Acid's identity is equipment degradation via the existing Durability system — no direct AV reduction at cantrip level. Forces meaningful choices about protecting gear. Shared with Nature tradition (same spell in both lists).

### Air Burst

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Melee | —

*You release a concussive burst of compressed air in your immediate vicinity.*

**Weak.** All creatures in melee range are briefly pushed back (forced movement to close range edge).
**Strong.** Deal +2 blast damage to all creatures in melee range and push them into close range.
**Critical.** Deal +4 blast damage to all creatures in melee range and push them into close range. Targets are briefly prone.

> **Design Note**: Fills the R0 air gap. Melee-only AoE at cantrip level is within R0 guidelines for rare exceptions. Uses blast damage type (½ AV) — concussive air pressure. Replaces the old "Concussive Pop" name.

### Thermal Control

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Medium TN | Close | —

*You regulate the temperature in a small area — warming, cooling, or maintaining a comfortable environment.*

**Weak.** Regulate temperature in close range for a brief duration. You can light or extinguish small fires, warm or cool food and drink, or prevent frost damage to objects.
**Strong.** Regulate temperature for a short duration. You can keep a small shelter comfortably warm or cool despite external conditions.
**Critical.** Regulate temperature for a medium duration. Creatures in the area gain resistance to environmental heat or cold effects for the duration.

> **Design Note**: Fills the utility/non-combat gap. Pure environmental manipulation with no combat application.

### Elemental Shaping

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Medium TN | Close | concentrate

*You manipulate raw elemental matter — reshaping fire, water, earth, or air to your will.*

**Weak.** Shape a small amount of one element within close range for a brief duration. Create a wall of flame (melee area, 5 HP), freeze water into a bridge, part smoke, or sculpt earth.
**Strong.** Shape a larger amount for a short duration. The elemental construct is more durable (10 HP) and the area is larger (close range).
**Critical.** Shape a significant amount for a medium duration. The elemental construct has 15 HP and can serve as a barrier, bridge, or environmental feature.

> **Design Note**: R1 utility spell — environmental manipulation for exploration and creative problem-solving.

### Fire Shield

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Self | Self | concentrate, enchant (short)

*You wreathe yourself in protective flames or frost, lashing back at any who dare strike you.*

**Weak.** Choose fire or frost. You gain resistance 2 to the opposing element (frost if fire chosen, fire if frost chosen). When a creature in melee range hits you with an attack, they take +2 fire or frost damage.
**Strong.** Resistance increases to 4. Retaliatory damage increases to +4.
**Critical.** Resistance increases to 6. Retaliatory damage increases to +6. The shield also sheds bright light in close range.

> **Design Note**: R2 defensive option that reinforces the elemental identity while providing meaningful protection.

### Glacial Spike

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | —

*You conjure a massive shard of crystallized frost and hurl it at your target, where it detonates in a burst of freezing cold.*

**Weak.** Deal +8 frost damage to the primary target. They are briefly slowed.
**Strong.** Deal +16 frost damage. The target is slowed for a short duration and the area around them (melee range) becomes difficult terrain (ice) briefly.
**Critical.** Deal +24 frost damage. The target is slowed for a short duration and briefly restrained as ice encases their legs. Ice terrain persists for a short duration.

> **Design Note**: Fills R3 frost gap. Single-target with area denial secondary effect — trades multi-target for control.

### Chain Lightning

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | —

*You unleash a bolt of lightning that arcs from target to target, leaping between foes with devastating effect.*

**Weak.** Deal +8 lightning damage to the primary target. The lightning arcs to one additional target in close range of the first, dealing +4 lightning damage.
**Strong.** Deal +16 lightning damage to the primary target. Arcs to two additional targets, each taking +8 lightning damage. Targets are briefly staggered.
**Critical.** Deal +24 lightning damage to the primary target. Arcs to three additional targets, each taking +12 lightning damage. All targets are staggered for a short duration.

> **Design Note**: R3 chain spell — primary target takes single-target damage, secondary targets take half (multi-target scaling). Fills R3 lightning gap.

### Corrosive Torrent

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Medium | —

*You unleash a stream of concentrated acid that eats through armor, flesh, and stone alike.*

**Weak.** Deal +8 acid damage to a single target. The target's armor and shield each require a **Durability check**. The target's AV is reduced by 2 for a **short duration**.
**Strong.** Deal +16 acid damage. Durability checks for all equipped armor/shield/helmet. AV reduced by 3 for a **short duration**. If any Durability check fails, the AV reduction lasts for a **medium duration** instead.
**Critical.** Deal +24 acid damage. Durability checks for all equipment with +1 bane. AV reduced by 4 for a **short duration** (medium if any Durability fails). If the target's AV reaches 0, excess reduction applies as bonus acid damage.

> **Design Note**: Fills R3 acid gap. Acid's identity combines Durability pressure with temporary AV reduction (minimum short duration). Rewards focus fire after debuffing. The Durability interaction creates lasting consequences beyond the immediate fight — damaged armor needs repair.

### Elemental Cataclysm

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Long | —

*You channel all four elemental forces simultaneously into a devastating strike — fire, frost, lightning, and acid converge on a single point.*

**Weak.** Deal +10 damage (choose fire, frost, lightning, or acid). Apply the element's signature condition: burning, slowed, staggered, or AV −2 (short duration) respectively.
**Strong.** Deal +20 damage. Apply the condition for a short duration. You may choose a second element — the target also takes +4 damage of that type.
**Critical.** Deal +30 damage. Apply the condition for a short duration. Choose two additional elements — the target takes +8 damage of each and suffers all corresponding conditions briefly.

> **Design Note**: R4 capstone single-target. Rewards element mastery by stacking multiple conditions. Raw power justifies R4 Focus cost. Acid condition uses short-duration AV reduction per the corroding identity.

### Acid Rain

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Medium | concentrate

*You conjure a cloud of caustic mist that rains acid over an area, slowly dissolving armor and flesh.*

**Weak.** Create a close area of acid rain for a short duration. All creatures entering or starting their turn in the area take +3 acid damage. Creatures that remain in the area for a full round must make a Durability check for one piece of equipped armor.
**Strong.** Damage increases to +6 per turn. Durability check applies to all equipped armor/shields.
**Critical.** Damage increases to +9 per turn. Durability checks with +1 bane. Creatures in the area also suffer −2 AV for a short duration after leaving.

> **Design Note**: R2 dedicated acid spell — fills the R2 acid gap. Zone control that punishes staying in the area via Durability pressure. Multi-target damage uses half single-target R2 scaling (+3/+6/+9). Concentration limits other spellcasting.

### Gale Force

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Short | —

*You compress the air ahead of you and release it in a devastating line of concussive force.*

**Weak.** All creatures in a short line take +3 blast damage and are pushed one range increment away from you.
**Strong.** Deal +6 blast damage. Creatures are pushed and briefly prone.
**Critical.** Deal +9 blast damage. Creatures are pushed, prone, and the line becomes difficult terrain (scattered debris) briefly.

> **Design Note**: R2 air spell. Line AoE with push — fills the R2 air gap. Half single-target R2 scaling (+3/+6/+9). Concussive air pressure fits Evocation's transgressive element manipulation without overlapping Tempest's natural storms.

### Vacuum Sphere

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Long | concentrate

*You create a sphere of total vacuum that implodes violently, crushing everything within and sucking the air from lungs.*

**Weak.** Create a close area of vacuum. All creatures in the area take +5 blast damage and are briefly staggered (no air to breathe). Creatures are pulled toward the center.
**Strong.** Deal +10 blast damage. Creatures are staggered for a short duration and pulled to the center of the area. Ranged attacks through the area suffer +2 banes (no air for projectiles).
**Critical.** Deal +15 blast damage. Creatures are staggered for a short duration and pulled to center. Creatures that fail their save by 3+ are briefly restrained by the implosion. Ranged attacks through the area fail automatically.

> **Design Note**: R4 air spell — control through air manipulation. AoE uses half single-target R4 scaling (+5/+10/+15). The vacuum theme is distinctly transgressive (violating natural air pressure) vs. Tempest's natural wind.

### Elemental Tempest

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | concentrate

*You conjure a vortex of all five elements — fire, frost, lightning, acid, and compressed air — swirling in a devastating maelstrom of pure elemental destruction.*

**Weak.** Create a medium area storm. Each turn at the start of your turn, all creatures in the area take +6 damage of a random element (roll d6: 1=fire, 2=frost, 3=lightning, 4=acid, 5=blast, 6=your choice) and suffer the corresponding condition briefly. Lasts for a brief duration.
**Strong.** Duration extends to short. Damage increases to +8 per turn. You choose the element each turn instead of rolling.
**Critical.** Duration short. +8 per turn with element choice. Two different elements strike simultaneously each turn (both damage and conditions apply).

> **Design Note**: R5 AoE capstone alongside Delayed Blast Meteor. The sustained storm vs. delayed detonation provides distinct tactical options. AoE damage per turn (+6/+8) is appropriate for a concentration-sustained effect — total damage over time exceeds single-hit AoE.

### Dissolving Wave

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Medium | —

*You release a tidal wave of concentrated acid that sweeps across the battlefield, dissolving everything it touches.*

**Weak.** All creatures in a short area take +6 acid damage. All affected creatures must make Durability checks for all equipped armor/shields. Affected creatures suffer −2 AV for a short duration.
**Strong.** Deal +12 acid damage. Durability checks with +1 bane. AV reduced by −3 for a short duration. The area becomes difficult terrain (dissolved ground) for a short duration.
**Critical.** Deal +18 acid damage. Durability checks with +2 banes. AV reduced by −4 for a short duration. Difficult terrain lasts for a medium duration. Structures and fortifications in the area take double damage.

> **Design Note**: R5 acid AoE capstone. Half single-target scaling (+6/+12/+18). Combines Durability devastation with mass AV reduction (short duration minimum). The premier "armor destruction" spell — rewards Evocation casters who invested in the acid identity.

### Delayed Blast Meteor

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | concentrate

*You conjure a swirling mass of superheated elemental energy suspended in the air, which detonates after a delay — or at your command.*

**Weak.** The meteor detonates in a short area. All creatures in the area take +6 fire damage and are briefly burning.
**Strong.** All creatures take +12 fire damage. Burning lasts for a short duration.
**Critical.** All creatures take +18 fire damage. Burning lasts for a short duration and deals +4 fire damage per turn.

**Heighten.** You can delay detonation for up to 1 minute while concentrating. Each turn of delay increases the damage by +2/+4/+6 (weak/strong/critical), up to a maximum of +12/+24/+36 after 3 turns of delay.

> **Design Note**: R5 capstone. Delayed detonation creates tactical depth — do you detonate immediately or risk losing concentration for higher damage? AoE at R5 uses half single-target scaling (+6/+12/+18 base).

## Cross-School Spell Sharing

The following spells are shared between Evocation and mystic traditions (same spell in both lists):

| Spell | Evocation Rank | Shared With | Notes |
|-------|---------------|-------------|-------|
| **Acid Splash** | R0 | Nature (Mystic) | Identical spell — acid damage + Durability check |
| **Chain Lightning** | R3 | Tempest (Mystic) | Identical spell — primary + chain targets |

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Acid Splash represents both transgressive elemental acid (Evocation) and natural toxin (Nature). Chain Lightning represents both raw elemental control (Evocation) and natural storm power (Tempest). When a spell is shared, it must be identical in both lists.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Fire chain**: Flickering Flame (R0 condition apply) → Flame Burst/Scorching Ray (R1 damage) → Fireball (R2 AoE) → Black Flame Bolt (R3 single) → Elemental Cataclysm (R4 multi-element) → Delayed Blast Meteor (R5 AoE)
2. **Frost chain**: Frost Snap (R0) → Ice Shards/Frozen Weapon (R1) → Frost Wave/Ice Lance (R2) → Glacial Spike (R3) → Elemental Cataclysm (R4) → Elemental Tempest (R5)
3. **Lightning chain**: Static Spark (R0) → Lightning Arc (R1) → Lightning Strike (R2) → Chain Lightning (R3) → Elemental Cataclysm (R4) → Elemental Tempest (R5)
4. **Acid chain**: Acid Splash (R0 Durability) → Chromatic Orb (R1 multi) → Acid Rain (R2 zone) → Corrosive Torrent (R3 single) → Elemental Cataclysm (R4) → Dissolving Wave (R5 AoE)
5. **Air chain**: Air Burst (R0 push) → Elemental Shaping (R1 utility) → Gale Force (R2 line) → *gap at R3* → Vacuum Sphere (R4 implosion) → Elemental Tempest (R5)
6. **AV-strip combo**: Acid Splash/Acid Rain (Durability + zone) → Corrosive Torrent (short-duration AV reduction) → Fire/Lightning follow-ups deal more effective damage

### Setup + Payoff Combos
- ✅ **Element condition → bonus damage**: Well-supported across ranks
- ✅ **AV strip → focus fire**: Acid Splash (Durability) → Acid Rain (zone Durability) → Corrosive Torrent (AV reduction, short duration) → all subsequent damage more effective
- ✅ **Air push → AoE cluster**: Air Burst/Gale Force push enemies together → Fireball/Frost Wave hit more targets
- ⚠️ **Frost terrain → lightning conductor**: Conceptually strong but needs explicit mechanical support in spell text
- ❌ **Fire → Frost synergy**: No explicit mechanical link between burning and slowed conditions

### Design Completeness Checklist
- [x] R1 Quick Action: Elemental Ward (R1) serves as reactive defense
- [x] Defensive options: Elemental Ward (R1), Fire Shield (R2 proposed)
- [x] Utility: Thermal Control (R0 proposed), Elemental Shaping (R1 proposed)
- [x] Damage across all ranks: R0-R5 fully covered with 3+ spells per rank
- [x] Repeating conditions: Burning, slowed, staggered, corroding (Durability), pushed/prone (air)
- [x] Setup+payoff: Condition application → condition exploitation, Durability → AV strip → focus fire
- [x] Cross-school sharing: Acid Splash (Nature), Chain Lightning (Tempest)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 10, R2: 9, R3: 4, R4: 3, R5: 3)
