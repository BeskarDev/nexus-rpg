# Tempest — Spell School Design Space

## School Identity

**Tradition**: Tempest (Mystic)
**Traits**: hurricanes, earthquakes, thunderstorms, sandstorms, floods
**Identity**: Respectful wielding of destructive natural forces — channeling storms, quakes, and floods
**Role Spread**: Excels: Offense | Decent: Control, Utility | Weak: Healing, Support, Defense

### Mechanical Identity
- **Primary Conditions**: Staggered (lightning), prone (wind/quake), deafened (thunder)
- **Signature Gimmick**: Storm power and environmental destruction — area denial, forced movement, terrain destruction
- **Damage Types**: Lightning, Frost, Blast

### Design Principles
1. Tempest is the strongest offensive mystic tradition (28/33 spells deal damage)
2. Storm and lightning effects provide both damage and control
3. Area denial through weather effects (wind, ice, sandstorm) is a key tactic
4. **Gaps**: Limited non-combat utility, "earthquakes," "sandstorms," and "floods" lack R0 representation
5. Blast damage (½ AV ignore) fits concussive storm effects — retain this identity

### Internal Synergies
- **Elemental summon → Enhanced storms**: Conjure Elemental → storms within the elemental's area deal bonus damage
- **Wind → Positioning → Lightning**: Wind push targets into hazard → lightning strikes exposed targets
- **Storm build-up**: Minor storm → major storm escalation over multiple turns

## Current Spell Inventory (33 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Gust, Static Shock, Wind Slash |
| 1 | 9 | Bursting Crackle, Curse of Tempest, Earthen Tremor, Electrified Weapon, Lightning Javelin, Storm Coat, Storm Shield, Volcanic Bolt, Wind Hose |
| 2 | 9 | Conjure Elemental, Lightning Bolt, Lightning Step, Magma Burst, Pyroclasm, Storm Cloud, Thunder Clap, Torrent, Wind Ward |
| 3 | 7 | Chain Lightning, Cone of Cold, Cyclone, Lightning Volley, Sandstorm (incomplete), Shattering Orb, Wind Wall |
| 4 | 5 | Avatar of Storms, Control Water (incomplete), Control Winds (incomplete), Earthquake (incomplete), Lightning Storm (incomplete) |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| hurricanes | Gust, Wind Slash | Wind Hose | Torrent, Wind Ward | Cyclone, Wind Wall | Control Winds* | — |
| earthquakes | ❌ **GAP** | Earthen Tremor | — | — | Earthquake* | — |
| thunderstorms | Static Shock | Bursting Crackle, Lightning Javelin, Electrified Weapon, Storm Coat | Lightning Bolt, Lightning Step, Storm Cloud, Thunder Clap | Chain Lightning, Lightning Volley, Shattering Orb | Avatar of Storms, Lightning Storm* | — |
| sandstorms | ❌ **GAP** | — | Pyroclasm | Sandstorm*, Cone of Cold | — | — |
| floods | ❌ **GAP** | — | Conjure Elemental, Magma Burst | — | Control Water* | — |

*Asterisk = incomplete spell*

**Coverage**: 21/30 slots filled (70%) — thunderstorms dominate, other traits sparse

**Critical Gaps**:
- **Earthquakes R0**: No earthquake cantrip — fundamental earth-shaking effect missing at low level
- **Sandstorms R0-R1**: No sandstorm effects below R2
- **Floods R0-R1**: No water/flood effects below R2
- **All traits R5**: No R5 capstone
- **Earthquakes R2-R3**: Massive gap between R1 Earthen Tremor and R4 Earthquake

## Proposed Spell Changes

### Lightning Bolt — Area Reduction

**Current**: Line in medium range at Rank 2
**Proposed**: Reduce to **short line** to match R2 area progression
**Rationale**: R2 spells should affect a close area or short line.

### Cone of Cold — Damage Reduction

**Current**: +6/+12/+18 AoE cone at Rank 3
**Proposed**: Reduce to **+4/+8/+12** to match half single-target scaling for R3 multi-target
**Rationale**: R3 multi-target should be +4/+8/+12 under revised scaling.

### Chain Lightning — Damage Reduction

**Current**: +6/+12/+18 chain at Rank 3
**Proposed**: Primary target +8/+16/+24 (single-target scaling), chain targets +4/+8/+12 (multi-target scaling)
**Rationale**: Chain spell pattern — primary target at full damage, secondary targets at half.

## Proposed New Spells

### Tremor

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Melee | —

*You stamp the ground and send a localized tremor rippling outward.*

**Weak.** One creature in melee range is briefly prone as the ground lurches beneath them.
**Strong.** The target is briefly prone. The ground in melee range becomes briefly difficult terrain.
**Critical.** The target is briefly prone. The ground in melee range becomes briefly difficult terrain. One adjacent object (shelf, pillar, stack of crates) is knocked over.

> **Design Note**: Fills the R0 earthquakes gap. Melee-range ground effect. Prone is the core earthquake condition and is reliable on any success — SL adds environmental effects rather than gating the primary condition.

### Sand Gust

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You whip up a blast of sand or dust, stinging eyes and obscuring vision.*

**Weak.** One target in close range is briefly blinded (sand in eyes).
**Strong.** The target is briefly blinded. You also deal +2 physical damage from stinging grit.
**Critical.** The target is briefly blinded and takes +4 physical damage. You also create a small cloud of dust in melee range (lightly obscured) for a brief duration.

> **Design Note**: Fills the R0 sandstorms gap. Blinding is the core sandstorm condition and is reliable on any success (briefly at all SL). SL adds damage and environmental effects rather than extending the blind duration.

### Splash

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You conjure a sudden burst of water that drenches and pushes a target.*

**Weak.** Deal +2 physical damage. The target is drenched (extinguishes burning condition).
**Strong.** Deal +4 physical damage. The target is pushed into close range.
**Critical.** Deal +6 physical damage. The target is pushed into close range and the ground in melee range becomes briefly difficult terrain (wet/slippery).

> **Design Note**: Fills the R0 floods gap. Water damage with push effect.

### Aftershock

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Close | —

*You slam the ground with divine fury, sending a powerful shockwave rippling through the earth.*

**Weak.** All creatures in a close area take +3 blast damage and must save or be briefly prone.
**Strong.** Deal +6 blast damage. Prone creatures in the area take an additional +3 physical damage from debris. The area becomes difficult terrain briefly.
**Critical.** Deal +9 blast damage. Prone creatures take +6 additional physical damage. Difficult terrain persists for a short duration. Structures in the area take double damage.

> **Design Note**: Fills R2 earthquakes gap. AoE uses half single-target R2 scaling (+3/+6/+9). The prone-check-then-bonus-damage creates a setup+payoff within a single spell — hitting already-prone targets harder rewards prior knockdown effects.

### Tidal Surge

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Medium | —

*You summon a powerful wave of water that crashes forward, sweeping away everything in its path.*

**Weak.** A short line of water rushes forward. All creatures in the line take +3 physical damage and are pushed one range increment away from you.
**Strong.** Deal +6 physical damage. Creatures are pushed and must save or be briefly prone. Small creatures are pushed two range increments.
**Critical.** Deal +9 physical damage. All creatures are pushed two range increments and briefly prone. The line becomes difficult terrain (flooded) for a short duration.

> **Design Note**: Fills R2 floods gap. Line AoE uses half single-target R2 scaling (+3/+6/+9). The push effect is the floods identity — repositioning + terrain alteration.

### Weather Prediction

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Easy TN | Self | ritual (1 minute)

*You read the winds and sky, predicting the weather for the near future.*

**Weak.** Predict the weather for the next 12 hours in your current area.
**Strong.** Predict the weather for the next 24 hours. You also sense any unnatural weather manipulation in the area.
**Critical.** Predict the weather for the next 3 days. You can identify whether weather is natural or magically created and roughly estimate the source's direction.

> **Design Note**: Non-combat utility cantrip — fills the Tempest utility gap.

### Storm Lord

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Self | Self | concentrate

*You become one with the storm, transforming into an avatar of elemental fury. Lightning crackles around you, winds howl at your command, and the sky darkens.*

**Weak.** For a short duration, you gain: flight (movement 6), resistance to lightning and frost damage (reduce by 4), and your melee attacks deal an additional +4 lightning damage. You can call one lightning strike per turn as a Quick Action (vs. Dodge, medium range, +6 lightning damage).
**Strong.** All Weak benefits. Lightning strike damage increases to +12. You also emit an aura of storm winds — ranged attacks against you suffer +1 bane.
**Critical.** All Weak and Strong benefits. Lightning strike damage increases to +18. You can call two lightning strikes per turn. Creatures within melee range take +2 lightning damage at the start of each of your turns.

> **Design Note**: R5 capstone — transformation into a storm avatar. Duration is fixed at short for all SL — the transformation is reliable on any success. SL scales lightning strike damage and unlocks secondary benefits (aura, extra strikes). Concentration limits other spellcasting while transformed.

### World Shaker

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Medium | concentrate

*You channel the fury of the deep earth, and the world answers. The ground heaves, splits, and buckles — buildings topple, chasms yawn open, and the very foundations of civilization shudder under divine wrath.*

**Weak.** All creatures in a medium area take +6 blast damage and must save (Strength + Athletics vs. TN 16) or be prone. Structures in the area take triple damage. The area becomes difficult terrain for a short duration.
**Strong.** Deal +12 blast damage. Prone creatures cannot stand until the start of their next turn. Structures automatically suffer critical structural damage. Chasms open — GM determines if creatures fall. Difficult terrain persists for a medium duration.
**Critical.** Deal +18 blast damage. All creatures are prone (no save). Structures collapse. Chasms open beneath up to 2 targets (vs. Dodge, fall damage if applicable). Difficult terrain persists for a medium duration. The area is permanently altered.

> **Design Note**: R5 earthquake capstone — the culmination of the earthquakes chain (Tremor → Earthen Tremor → Aftershock → Earthquake → World Shaker). AoE damage follows R5 scaling (+6/+12/+18). Structure damage and terrain destruction fit the earthquakes identity of permanent environmental alteration. Concentration limits other casting.

### Maelstrom

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | concentrate

*You call upon the primal forces of wind and water, and a massive vortex of churning waves and howling gale descends upon the battlefield — a hurricane given divine purpose, or a whirlpool that swallows the earth itself.*

**Weak.** Create a swirling vortex in a medium area at long range. All creatures in the area take +6 frost/blast damage and are pulled one range increment toward the center. Creatures in the center are restrained by churning winds and water. The area is heavily obscured.
**Strong.** Deal +12 frost/blast damage. Restrained creatures in the center take an additional +4 frost damage at the start of each of their turns. Flying creatures are grounded (lose flight for the duration).
**Critical.** Deal +18 frost/blast damage. Restrained creatures take +6 frost damage per turn. Flying creatures are grounded. You can selectively exclude up to 4 allies from the pull and restrain effects.

> **Design Note**: R5 floods/hurricanes combined capstone — massive area denial and forced movement. Damage follows R5 AoE scaling (+6/+12/+18). Pull distance, restrained condition, area, and obscurement are fixed on any success — SL scales damage and adds secondary benefits (per-turn damage, flight grounding, ally exclusion). Concentration can be broken to end the effect.

## Cross-School Spell Sharing

The following spells are shared between Tempest and arcane disciplines (same spell in both lists):

| Spell | Tempest Rank | Shared With | Notes |
|-------|-------------|-------------|-------|
| **Chain Lightning** | R3 | Evocation (Arcane) | Identical spell — primary target + chain to secondary targets |

**Concept Overlaps** (not shared, but thematically adjacent):
- **Lightning Bolt** (Tempest R2) overlaps with **Lightning Strike** (Evocation R2) — both are line-based lightning damage spells. Tempest channels divine storm power; Evocation channels raw elemental force. Similar mechanics, different flavor sources.

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Chain Lightning represents both raw elemental control (Evocation) and natural storm power (Tempest). When a spell is shared, it must be identical in both lists.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Hurricanes chain**: Gust/Wind Slash (R0) → Wind Hose (R1) → Torrent/Wind Ward (R2) → Cyclone/Wind Wall (R3) → Control Winds (R4\*) → Storm Lord/Maelstrom (R5 proposed) — **complete R0-R5**
2. **Earthquakes chain**: Tremor (R0 proposed) → Earthen Tremor (R1) → Aftershock (R2 proposed) → *gap at R3* → Earthquake (R4\*) → World Shaker (R5 proposed) — **near-complete R0-R5** (R3 gap)
3. **Thunderstorms chain**: Static Shock (R0) → Bursting Crackle/Lightning Javelin/Electrified Weapon/Storm Coat (R1) → Lightning Bolt/Storm Cloud/Thunder Clap (R2) → Chain Lightning/Lightning Volley/Shattering Orb (R3) → Avatar of Storms/Lightning Storm (R4) → Storm Lord (R5 proposed) — **complete R0-R5**
4. **Sandstorms chain**: Sand Gust (R0 proposed) → *gap at R1* → Pyroclasm (R2) → Sandstorm/Cone of Cold (R3) → *gap at R4* → *gap at R5*
5. **Floods chain**: Splash (R0 proposed) → *gap at R1* → Conjure Elemental/Magma Burst/Tidal Surge (R2 proposed) → *gap at R3* → Control Water (R4\*) → Maelstrom (R5 proposed) — near-complete (R1/R3 gaps)

### Setup + Payoff Combos
- ✅ **Wind push → lightning**: Push targets into exposed positions with Gust/Wind Hose → strike with lightning spells for full effect
- ✅ **Prone → AoE bonus**: Tremor/Earthen Tremor knocks prone → Aftershock (R2 proposed) explicitly deals bonus damage to prone targets
- ⚠️ **Storm buildup**: Minor storm effects → major storm conceptually fits, but no explicit mechanic rewards casting multiple storm spells in sequence
- ❌ **Sand → flood combo**: No mechanical link between sandstorm and flood effects

### Design Completeness Checklist
- ⚠️ R1 Quick Action: Storm Coat (R1) provides reactive lightning damage when hit, but is not a dedicated Quick Action cast — **partial coverage, could use explicit R1 Quick Action**
- [x] Defensive options: Storm Shield (R1), Wind Ward (R2), Storm Coat (R1) — solid defensive suite
- [x] Utility: Weather Prediction (R0 proposed) — fills the non-combat gap; Control Weather (R4\*) for advanced utility
- [x] Damage across ranks: R0-R5 fully covered — Storm Lord, World Shaker, and Maelstrom provide three distinct R5 capstones
- [x] Repeating conditions: Staggered, prone, deafened, pushed, restrained — consistent storm-force identity
- [x] Setup+payoff: Prone → Aftershock bonus damage is explicitly designed as setup+payoff within a single spell
- [x] R5 capstone diversity: Storm Lord (transformation), World Shaker (earthquake AoE), Maelstrom (vortex control) — three different tactical roles
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 7, R1: 9, R2: 11, R3: 7, R4: 5, R5: 3)
- ⚠️ **Remaining gaps**: Sandstorms R1/R4+, Floods R1/R3, Earthquakes R3, explicit R1 Quick Action spell
