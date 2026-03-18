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

### Trait Coverage Gaps

| Trait | R0 | R1+ | Gap |
|-------|-----|------|-----|
| hurricanes | ✅ | ✅ | — |
| earthquakes | ❌ | ✅ (R1+) | Missing R0 earthquake cantrip |
| thunderstorms | ✅ | ✅ | — |
| sandstorms | ❌ | ✅ (R3+) | Missing R0 sandstorm cantrip |
| floods | ❌ | ✅ (R2+) | Missing R0 flood cantrip |

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

**Weak.** One creature in melee range must succeed or stumble. They suffer +1 bane on their next movement.
**Strong.** The target is briefly prone.
**Critical.** The target is prone and the ground in melee range becomes briefly difficult terrain.

> **Design Note**: Fills the R0 earthquakes gap. Melee-range ground effect.

### Sand Gust

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You whip up a blast of sand or dust, stinging eyes and obscuring vision.*

**Weak.** One target in close range is briefly blinded (sand in eyes).
**Strong.** The target is blinded for a short duration.
**Critical.** The target is blinded for a short duration. You also create a small cloud of dust in melee range (lightly obscured) for a brief duration.

> **Design Note**: Fills the R0 sandstorms gap. Blinding effect ties into the sand/dust theme.

### Splash

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You conjure a sudden burst of water that drenches and pushes a target.*

**Weak.** Deal +2 physical damage. The target is drenched (extinguishes burning condition).
**Strong.** Deal +4 physical damage. The target is pushed into close range.
**Critical.** Deal +6 physical damage. The target is pushed into close range and the ground in melee range becomes briefly difficult terrain (wet/slippery).

> **Design Note**: Fills the R0 floods gap. Water damage with push effect.

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

**Weak.** For a brief duration, you gain: flight (movement 6), resistance to lightning and frost damage (reduce by 4), and your melee attacks deal an additional +4 lightning damage. You can call one lightning strike per turn as a Quick Action (vs. Dodge, medium range, +6/+12/+18 lightning damage).
**Strong.** Duration extends to short. Lightning strike damage increases to +8/+16/+24. You also emit an aura of storm winds — ranged attacks against you suffer +1 bane.
**Critical.** Duration extends to short. All bonuses active. You can call two lightning strikes per turn. Creatures within melee range take +2 lightning damage at the start of each of your turns.

> **Design Note**: R5 capstone — transformation into a storm avatar. Concentration limits other spellcasting while transformed.
