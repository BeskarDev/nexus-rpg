# Spell Rank Misalignment Analysis

## Overview

This document analyzes existing spells that may be placed at incorrect ranks based on the established power scaling guidelines. While damage numbers are generally correct, some spells have effects, scope, or utility that don't match their current rank's power level expectations.

## Power Level Guidelines (Reference)

| Rank | Power Level | D&D Equivalent | Expected Scope |
|------|-------------|----------------|----------------|
| 0 | Cantrips | Levels 0-1 | At-will, minor effects, unlimited casting |
| 1 | Basic | Level 2 | Simple combat/utility, short duration |
| 2 | Moderate | Levels 3-4 | Fireball tier, encounter-shaping |
| 3 | High | Level 5 | Powerful effects, battlefield control |
| 4 | Very High | Level 6 | Major transformations, significant scope |
| 5 | Peak Mortal | Level 7 | Legendary but bounded, mortal-scale pinnacle |

## Spells Requiring Rank Adjustment

### Rank 0 → Rank 1 (Too Powerful for Unlimited Casting)

**None Identified** - Rank 0 spells appropriately balanced with +0/+2/+4 AoE damage and limited single-target effects.

### Rank 1 → Rank 0 (Too Weak for Focus Cost)

**None Identified** - Rank 1 spells provide appropriate value for 2 Focus cost.

### Rank 1 → Rank 2 (Underranked)

**Sense Spirits** (*light*, Rank 1)
- **Current**: Incomplete spell, lacks full implementation
- **Issue**: Spiritual detection across wide areas typically Rank 2 utility
- **Recommendation**: Complete as Rank 2 spell or significantly limit range/duration for Rank 1

### Rank 2 → Rank 1 (Overranked)

**None Identified** - Rank 2 spells appropriately scaled for Fireball-tier power.

### Rank 2 → Rank 3 (Underranked)

**Silent Night** (*twilight*, Rank 2)
- **Current**: Incomplete spell
- **Issue**: Based on name/theme, likely provides significant stealth or sleep effect over area
- **Recommendation**: If area sleep/silence effect, belongs at Rank 3 (compare to D&D's *Silence* at level 2, but with sleep adds control)

**Shroud of Fear** (*twilight*, Rank 2)
- **Current**: Close area fear effect with +3/+6/+9 damage
- **Issue**: Already uses reduced damage for strong AoE control effect
- **Recommendation**: Consider Rank 3 if fear duration/area is substantial; otherwise appropriate

### Rank 3 → Rank 2 (Overranked)

**None Identified** - Rank 3 spells provide appropriate high-power effects.

### Rank 3 → Rank 4 (Underranked)

**Finger of Death** (*necromancy*, Rank 3) - **INCOMPLETE**
- **Current**: Incomplete spell
- **Issue**: D&D equivalent is Level 7, iconic single-target "death" spell
- **Recommendation**: Move to Rank 4 (equivalent to D&D Level 6) or keep at Rank 3 with significant limitations (not instant death, high save, temporary effect)
- **Design Note**: If keeping at Rank 3, should be powerful necrotic damage (+8/+16/+24 single-target) with condition, NOT instant death

**Teleportation Circle** (*conjuration*, Rank 3) - **INCOMPLETE**
- **Current**: Incomplete spell
- **Issue**: Long-distance teleportation network typically higher rank
- **Recommendation**: Move to Rank 4 for permanent circles, or limit to short-duration waypoints at Rank 3

**Wave of Madness** (*telepathy*, Rank 3) - **INCOMPLETE**
- **Current**: Incomplete spell
- **Issue**: Mass psychic control/confusion effect
- **Recommendation**: If affecting large area with lasting confusion, belongs at Rank 4; keep at Rank 3 only if brief duration and limited area

### Rank 4 → Rank 3 (Overranked)

**None Identified** - Most Rank 4 spells are incomplete; completed ones (transformations) appropriately powerful.

### Rank 4 → Rank 5 (Underranked)

**Astral Body** (*conjuration*, Rank 4) - **INCOMPLETE**
- **Current**: Incomplete spell
- **Issue**: Astral projection is typically very high-tier magic (D&D Level 9)
- **Recommendation**: Move to Rank 5 with bounded mortal-scale implementation (limited duration, short distance, medium duration max)

**Force Cage** (*conjuration*, Rank 4) - **INCOMPLETE**
- **Current**: Incomplete spell
- **Issue**: Complete battlefield control over medium duration
- **Recommendation**: Consider Rank 5 for long-duration impenetrable cage, or keep at Rank 4 with escape options and short duration

### Rank 5 Considerations

**No Current Rank 5 Spells** - All need to be created at appropriate power level (D&D Level 7 equivalent, NOT Level 9).

## Incomplete Spells Requiring Rank Validation

The following incomplete spells should have their rank validated during implementation:

### High Priority (May Need Rank Adjustment)

| Spell | Current Rank | Potential Issue | Recommendation |
|-------|--------------|-----------------|----------------|
| Finger of Death | 3 | Iconic death spell, possibly too weak for name | Consider Rank 4 or limit to strong necrotic damage at 3 |
| Force Cage | 4 | Powerful control, possibly Rank 5 worthy | Keep at 4 with limitations or move to 5 |
| Astral Body | 4 | Typically very high-tier | Move to Rank 5 with mortal-scale bounds |
| Teleportation Circle | 3 | Long-distance networks typically higher | Keep at 3 for temporary, 4 for permanent |
| Wave of Madness | 3 | Mass confusion could be higher | Keep at 3 if brief/limited, 4 if substantial |
| Silent Night | 2 | Sleep + silence combo possibly higher | Validate area and duration fit Rank 2 |
| Sense Spirits | 1 | Spiritual detection scope unclear | Complete at 1 or move to 2 based on range |

### Medium Priority (Likely Correct Rank)

| Spell | Current Rank | Notes |
|-------|--------------|-------|
| Seeming | 3 | Group disguise appropriate for Rank 3 |
| Orbiting Shards | 3 | Defensive spell appropriate for high rank |
| Invade Dreams | 4 | Dream manipulation appropriately high-tier |
| Distortion Field | 4 | Space manipulation fits Rank 4 |
| Invert Gravity | 4 | Powerful environmental change fits Rank 4 |

### Environmental Spells (Likely Correct Ranks)

| Spell | Current Rank | Notes |
|-------|--------------|-------|
| Control Weather | 4 | Weather control appropriately high-tier |
| Tree Stride | 4 | Transportation through trees fits Rank 4 |
| Sandstorm | 4 | Environmental hazard fits Rank 4 |
| Control Winds | 4 | Powerful air manipulation fits Rank 4 |
| Earthquake | 4 | Massive environmental effect fits Rank 4 |
| Lightning Storm | 4 | Sustained electrical hazard fits Rank 4 |

## Completed Spells Analysis

### Well-Ranked Spells (Sample)

**Fireball** (*evocation*, Rank 2)
- **Damage**: +4/+8/+12 AoE (close area)
- **Assessment**: ✓ Correctly placed - iconic Rank 2 spell, matches D&D Level 3

**Chromatic Orb** (*evocation*, Rank 1)
- **Damage**: +4/+8/+12 single-target
- **Assessment**: ✓ Correctly placed - solid single-target basic spell with elemental choice

**Radiant Burst** (*light*, Rank 1)
- **Damage**: +2/+4/+6 AoE (melee area)
- **Assessment**: ✓ Correctly placed - smaller AoE with appropriate lower damage

**Elemental Ward** (*evocation*, Rank 1)
- **Effect**: Brief resistance to 5 damage types
- **Assessment**: ✓ Correctly placed - defensive utility at basic tier

### Slightly High-Impact for Rank (But Acceptable)

**Detect Lies** (*light*, Rank 0)
- **Effect**: Reveal emotions, prevent hiding, +1 boon to Insight
- **Assessment**: ⚠ Powerful for cantrip but balanced by close range and short duration
- **Recommendation**: Keep as-is, strong utility cantrip

**Revealing Burst** (*light*, Rank 0)
- **Effect**: Break illusions/invisibility in short area
- **Assessment**: ⚠ Powerful anti-illusion but balanced by short range
- **Recommendation**: Keep as-is, niche counter-magic

## Scaling Validation

### Damage Progression Audit

**Single-Target Spells**:
- Rank 0: +2/+4/+6 ✓
- Rank 1: +4/+8/+12 ✓
- Rank 2: +6/+12/+18 ✓
- Rank 3: +8/+16/+24 ✓
- Rank 4: +10/+20/+30 (NEW - was Variable)
- Rank 5: +12/+24/+36 (NEW - was +10/+20/+30)

**AoE Spells** (one rank lower rule):
- Rank 0: +0/+2/+4 ✓
- Rank 1: +2/+4/+6 ✓
- Rank 2: +4/+8/+12 ✓
- Rank 3: +6/+12/+18 ✓
- Rank 4: +8/+16/+24 (NEW - was Variable)
- Rank 5: +10/+20/+30 (NEW - was +8/+16/+24)

**Deviation Cases** (by area size/secondary effects):
- All existing deviations appear intentional and justified
- Shroud of Fear (+3/+6/+9 at Rank 2) trades damage for control
- Static Spark (chain +0/+2/+4 at Rank 0) splits primary damage
- Various weapon enchantments (+2/+4/+6 at R1-3) appropriate for sustained buff

## Recommendations Summary

### Immediate Actions

1. **Update Rank 4-5 Damage Scaling**:
   - Rank 4 single: +10/+20/+30, AoE: +8/+16/+24
   - Rank 5 single: +12/+24/+36, AoE: +10/+20/+30

2. **Review During Implementation**:
   - Finger of Death (Rank 3 → possibly Rank 4)
   - Astral Body (Rank 4 → possibly Rank 5)
   - Force Cage (Rank 4 → possibly Rank 5 or add escape options)
   - Teleportation Circle (Rank 3 → validate scope)
   - Wave of Madness (Rank 3 → validate area and duration)

3. **Minor Adjustments**:
   - Sense Spirits: Complete with appropriate scope for Rank 1 or move to Rank 2
   - Silent Night: Validate effect matches Rank 2 power level

### No Changes Needed

- All cantrips (Rank 0) appropriately scaled for unlimited casting
- Rank 1-2 completed spells correctly placed
- Most Rank 3-4 spells have appropriate effects for their tier
- Deviation cases are justified by secondary effects or area sizes

## Conclusion

**Overall Assessment**: The spell system shows strong consistency in rank placement for completed spells. Damage scaling is correct and follows the established +2 progression per rank. The primary concerns are:

1. **Incomplete spells** need validation during implementation (18 total)
2. **Rank 4-5 damage values** need updating to maintain +2 progression
3. **Iconic high-power spells** (Finger of Death, Astral Body, Force Cage) may need rank adjustments based on final implementation

**Confidence**: High for completed spells, Medium for incomplete spells pending implementation details.
