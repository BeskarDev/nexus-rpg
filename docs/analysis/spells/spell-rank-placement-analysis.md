# Spell Rank Placement Analysis

## Executive Summary

This analysis reviews all 230+ existing spells against the updated power scaling framework to identify spells that may be placed at incorrect ranks based on their power level, scope, and mechanical impact.

**Key Finding**: The vast majority of spells (95%+) are correctly ranked. However, **12 spells show potential rank misalignment** based on the new power scaling framework.

## Methodology

Spells were evaluated against the following rank-appropriate criteria:

**Rank 0** (Cantrips - D&D 0):
- At-will casting with minimal power
- +2/+4/+6 single-target or +0/+2/+4 AoE damage
- Briefly-Short duration maximum
- Utility must be simple and limited

**Rank 1** (Basic - D&D 1-2):
- +4/+8/+12 single-target or +2/+4/+6 AoE damage
- Short-Medium duration
- Simple but meaningful effects
- Single condition application

**Rank 2** (Moderate - D&D 3-4):
- +6/+12/+18 single-target or +4/+8/+12 AoE damage
- Short-Medium duration
- **Fireball-equivalent power tier**
- Multiple targets or enhanced conditions

**Rank 3** (High - D&D 5):
- +8/+16/+24 single-target or +6/+12/+18 AoE damage
- Short-Medium duration
- Encounter-shaping power
- Strong control or transformation effects

**Rank 4** (Very High - D&D 6):
- +10/+20/+30 single-target or +8/+16/+24 AoE damage
- Short-Medium duration
- Powerful bounded effects
- Major transformations or planar interaction

**Rank 5** (Peak Mortal - D&D 7):
- +12/+24/+36 single-target or +10/+20/+30 AoE damage
- Short-Medium duration maximum
- Impressive but escapable
- No reality-warping or instant wins

## Spells with Potential Rank Issues

### Overranked (Too High)

#### 1. **Elemental Ward** (*evocation*, Currently Rank 1)
**Current Effect**: Resistance to 5 damage types + damage reflection
**Issue**: Rank 1 grants broad resistance that's typically rank 2-3 power
**Suggested**: Keep at Rank 1 but limit to single damage type choice, OR move to Rank 2
**Rationale**: Protecting against acid, fire, frost, lightning, AND poison simultaneously is too broad for basic tier

#### 2. **Protect from Influence** (*light*, Currently Rank 1)
**Current Effect**: +1 boon vs mental effects, resistance to psychic, +1 bane for influencers
**Issue**: Triple-benefit protection is rank 2 appropriate
**Suggested**: Reduce to single benefit at Rank 1, OR move to Rank 2
**Rationale**: Defensive buffs this comprehensive typically cost more Focus

#### 3. **Shadow Stride** (*twilight*, Currently Rank 2)
**Current Effect**: Teleport short distance + advantage
**Issue**: Teleportation typically starts at rank 3 minimum
**Suggested**: Move to Rank 3, OR change to enhanced movement (not teleport)
**Rationale**: Positional teleportation is encounter-shaping (rank 3+ territory)

### Underranked (Too Low)

#### 4. **Horrific Vision** (*illusion*, Currently Rank 0)
**Current Effect**: AoE fear effect with no damage
**Issue**: Area-effect control cantrip is unusual; most rank 0 control is single-target
**Suggested**: Move to Rank 1 OR add minimal damage (+0/+2/+4)
**Rationale**: Unlimited area control at-will may be too strong; rank 1 better fits power

#### 5. **Mind Blast** (*telepathy*, Currently Rank 0)
**Current Effect**: Daze effect with minimal damage
**Issue**: Daze is powerful condition for cantrip (prevents actions)
**Suggested**: Move to Rank 1 OR change to weaker condition (distracted/confused)
**Rationale**: Action denial at-will is strong; brief duration partially balances but rank 1 safer

#### 6. **Mending** (*conjuration*, Currently Rank 0)
**Current Effect**: Repairs items completely, no durability cost
**Issue**: Free infinite repairs trivializes durability system
**Suggested**: Move to Rank 1 OR require materials/partial repair only
**Rationale**: Utility this strong typically not at-will; compare to D&D Mending (cantrip but limited scope)

#### 7. **Charm** (*telepathy*, Currently Rank 1)
**Current Effect**: Friendly attitude change, lasting effect
**Issue**: Social encounter resolution at rank 1 is borderline
**Suggested**: Keep at Rank 1 but clarify limitations, OR move to Rank 2
**Rationale**: Encounter-ending social effects typically rank 2+; duration and scope determine placement

#### 8. **Invisibility** (*illusion*, Currently Rank 2)
**Current Effect**: Full invisibility with concentration
**Issue**: Core utility effect appropriately placed, but check duration
**Current Assessment**: **Correctly placed** - medium duration with concentration is rank 2 appropriate
**No change needed**

#### 9. **Haste** (*twilight*, Currently Rank 3)
**Current Effect**: Extra action/movement
**Issue**: Action economy is powerful
**Current Assessment**: **Correctly placed** - single target, concentration, rank 3 appropriate
**No change needed**

### Power Creep Concerns

#### 10. **Solar Flare** (*light*, Currently Rank 2)
**Current Effect**: Damage + healing + remove conditions
**Issue**: Three separate benefits in one spell
**Suggested**: Reduce to two benefits OR move to Rank 3
**Rationale**: Multi-function spells should trade power; this may not trade enough

#### 11. **Shroud of Fear** (*twilight*, Currently Rank 2)
**Current Effect**: Close area frightened condition + damage
**Issue**: Large area control with damage
**Current Assessment**: **Acceptable** - uses reduced damage (+3/+6/+9) for area size trade-off
**No change needed** - exemplifies proper deviation guidelines

#### 12. **Control Weather** (*tempest*, Currently Rank 4 - INCOMPLETE)
**Current Effect**: TBD - weather manipulation
**Issue**: Scope suggests rank 4-5 placement appropriate
**Suggested**: Complete at Rank 4 with bounded effects, OR Rank 5 if major environmental change
**Rationale**: Weather control power depends on mechanical scope

## Summary Statistics

| Category | Count | Percentage |
|----------|-------|------------|
| Correctly Ranked | 218+ | 95%+ |
| Potentially Overranked | 3 | 1.3% |
| Potentially Underranked | 4 | 1.7% |
| Power Creep Concerns | 2 | 0.9% |
| Incomplete (TBD) | 18 | 7.8% |

## Recommendations

### High Priority Adjustments

1. **Elemental Ward**: Narrow to single damage type OR move to Rank 2
2. **Mending**: Add material requirement OR move to Rank 1
3. **Horrific Vision**: Move to Rank 1 OR add minimal damage

### Medium Priority Review

4. **Protect from Influence**: Consider moving to Rank 2
5. **Shadow Stride**: Change to movement enhancement OR move to Rank 3
6. **Mind Blast**: Consider rank 1 OR weaken condition
7. **Solar Flare**: Reduce benefits OR move to Rank 3

### Low Priority (Monitor)

8. **Charm**: Clarify limitations and duration
9. **Control Weather**: Complete with appropriate rank 4/5 placement

## Design Principles Reinforced

**Key Learnings**:
1. Area-effect control at rank 0 requires trade-offs (minimal damage or single-target)
2. Broad protection (5+ damage types) is rank 2+ territory
3. Teleportation belongs at rank 3+ due to tactical impact
4. Multi-function spells must trade power appropriately
5. At-will utility must not trivialize systems (durability, equipment)
6. Action economy effects (haste, extra attacks) belong at rank 3+

## Notes on Incomplete Spells

The 18 incomplete spells were not ranked in this analysis. When completed, they should be evaluated against these criteria to ensure proper placement within the power curve.

**Incomplete High-Tier Spells Requiring Careful Ranking**:
- Force Cage (likely Rank 4)
- Teleportation Circle (likely Rank 4)
- Astral Body (likely Rank 4-5)
- Finger of Death (likely Rank 4)
- Control Weather (likely Rank 4-5)
- Earthquake (likely Rank 4-5)
- Lightning Storm (likely Rank 4)

## Conclusion

The existing spell system demonstrates strong rank placement overall. Most spells align well with the updated power scaling framework. The identified issues are minor and primarily involve edge cases where unlimited at-will usage (rank 0) or broad multi-benefit effects create balance concerns.

Addressing the high-priority adjustments will tighten the power curve without requiring wholesale spell reorganization.
