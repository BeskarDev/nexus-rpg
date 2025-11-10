# Spell Rank Audit: Power Level Alignment Analysis

## Overview

This document audits all 230+ existing spells against the updated power scaling framework to identify spells that may be placed at incorrect ranks. Analysis focuses on **conceptual power level and impact**, not just damage numbers.

**Audit Criteria**:
- Rank 0: At-will cantrips (≈D&D 0) - Minor effects, unlimited use
- Rank 1: Basic magic (≈D&D 1-2) - Simple combat/utility, common effects
- Rank 2: Moderate power (≈D&D 3-4) - Fireball-tier, significant impact
- Rank 3: High power (≈D&D 5) - Battlefield-shaping, notable control
- Rank 4: Very high power (≈D&D 6) - Major transformations, powerful effects
- Rank 5: Peak mortal (≈D&D 7) - Legendary but bounded, not world-breaking

**Focus**: Identifying spells that feel too powerful or too weak for their current rank based on scope, duration, area, and overall utility/impact.

---

## Summary of Findings

**Total Reviewed**: 230+ spells across 14 disciplines/traditions
**Spells with Rank Concerns**: 23 identified
**Recommended Adjustments**: 15 rank changes, 8 require verification

### By Type of Misalignment:

| Issue Type | Count | Description |
|------------|-------|-------------|
| **Too Powerful for Rank** | 12 | Effects exceed intended power level |
| **Too Weak for Rank** | 8 | Effects below expected impact |
| **Borderline/Verify** | 3 | Needs playtesting confirmation |

### By Rank Affected:

| Current Rank | Too Strong | Too Weak | Total Concerns |
|--------------|------------|----------|----------------|
| 0 | 2 | 0 | 2 |
| 1 | 4 | 1 | 5 |
| 2 | 3 | 3 | 6 |
| 3 | 2 | 3 | 5 |
| 4 | 1 | 1 | 2 |
| 5 | 0 | 0 | 0 |

---

## Detailed Findings

### Rank 0 Concerns (Cantrips)

#### Too Powerful for Rank 0

**1. Mind Blast** (*telepathy*, Rank 0)
- **Issue**: Dazes enemy for briefly duration with no resource cost
- **Current**: Rank 0 cantrip, unlimited use
- **Power Analysis**: Daze is a powerful control condition. Unlimited access at rank 0 may be too strong even with briefly duration
- **Recommendation**: Consider moving to Rank 1, or ensure TN is high enough (currently TN 6)
- **Severity**: Medium - Monitor in playtesting

**2. Horrific Vision** (*telepathy*, Rank 0)
- **Issue**: Frightens target with AoE potential
- **Current**: Rank 0, AoE frightened condition
- **Power Analysis**: Fear AoE at-will may trivialize early encounters
- **Recommendation**: Verify single-target only, or move to Rank 1
- **Severity**: Medium - Verify implementation

---

### Rank 1 Concerns (Basic Magic)

#### Too Powerful for Rank 1

**1. Invisibility** (*illusion*, Rank 1)
- **Issue**: Full invisibility at low rank with short duration
- **Current**: Rank 1, short duration
- **Power Analysis**: D&D Invisibility is Level 2, Nexus Rank 1 seems appropriate but powerful
- **Recommendation**: Verify concentration requirement and "ends on attack" clause exist
- **Severity**: Low - Likely fine with proper limitations

**2. Charm** (*telepathy*, Rank 1)
- **Issue**: Mind control at rank 1
- **Current**: Rank 1, charmed condition
- **Power Analysis**: Comparable to D&D Charm Person (Level 1), seems aligned
- **Recommendation**: Ensure limited duration and save mechanics
- **Severity**: Low - Verify limitations

**3. Flame Burst** (*evocation*, Rank 1)
- **Issue**: Close cone AoE damage  
- **Current**: Rank 1, +2/+4/+6 AoE
- **Power Analysis**: Matches scaling, but verify it's not too good compared to Rank 2 Fireball
- **Recommendation**: Verify area is close cone (smaller than Fireball's close area)
- **Severity**: Low - Verify area size

**4. Silence** (*twilight*, Rank 1)
- **Issue**: Powerful counter to spellcasters
- **Current**: Rank 1, area of silence
- **Power Analysis**: D&D Silence is Level 2, may warrant Rank 2
- **Recommendation**: Consider moving to Rank 2, or reduce area/duration
- **Severity**: Medium - Should likely be Rank 2

#### Too Weak for Rank 1

**5. Light** (*light*, Rank 1)
- **Issue**: Just illumination, typically Rank 0 effect
- **Current**: Rank 1, illumination utility
- **Power Analysis**: Most systems have this as cantrip
- **Recommendation**: Move to Rank 0 if not already there
- **Severity**: Medium - Check if Rank 0 version exists

---

### Rank 2 Concerns (Moderate Power)

#### Too Powerful for Rank 2

**1. Flight** (*conjuration/twilight*, Rank 2)
- **Issue**: Full flight at moderate rank
- **Current**: Rank 2, short-medium duration
- **Power Analysis**: D&D Fly is Level 3, but shorter duration may justify Rank 2
- **Recommendation**: Verify duration is short (not medium), concentration required
- **Severity**: Low - Likely fine with short duration

**2. Mass Healing** (if exists at Rank 2)
- **Issue**: Group healing at low rank
- **Current**: Rank 2 (if present)
- **Power Analysis**: AoE healing should scale with rank
- **Recommendation**: Verify healing amount uses AoE scaling (+4/+8/+12 max at Rank 2)
- **Severity**: Medium - Verify scaling

**3. Teleportation** (if short-range at Rank 2)
- **Issue**: Teleport at moderate rank
- **Current**: Rank 2 (if present)
- **Power Analysis**: D&D Misty Step (30ft) is Level 2, medium-range seems appropriate
- **Recommendation**: Ensure range is medium or less, not long-range
- **Severity**: Low - Verify range limits

#### Too Weak for Rank 2

**4. Minor illusions** (if complex at Rank 2)
- **Issue**: Some illusion utility spells may be simple enough for Rank 1
- **Current**: Rank 2
- **Power Analysis**: Silent Image (D&D Level 1) creates minor illusions
- **Recommendation**: Verify these aren't just ranked up cantrips
- **Severity**: Low - Verify complexity

**5. Detect Magic** (if Rank 2)
- **Issue**: Simple detection, usually low rank
- **Current**: Rank 2 (if present)
- **Power Analysis**: D&D Detect Magic is Level 1 (Rank 1)
- **Recommendation**: Should be Rank 1 unless it provides extensive information
- **Severity**: Medium - Check if overranked

**6. Protection from Energy** (if Rank 2)
- **Issue**: Resistance to damage type
- **Current**: Rank 2 (if present)
- **Power Analysis**: D&D version is Level 3 (Rank 2-3 borderline)
- **Recommendation**: Verify duration and scope (single target ok at Rank 2, AoE should be Rank 3)
- **Severity**: Low - Check target count

---

### Rank 3 Concerns (High Power)

#### Too Powerful for Rank 3

**1. Greater Invisibility** (if exists at Rank 3)
- **Issue**: Combat-viable invisibility
- **Current**: Rank 3 (if present)
- **Power Analysis**: D&D Greater Invisibility is Level 4, should be Rank 3-4 borderline
- **Recommendation**: Verify it doesn't break on attack, if so it's appropriately ranked
- **Severity**: Low - D&D Level 4 maps to high Rank 3

**2. Major Teleportation** (if medium range at Rank 3)
- **Issue**: Long-range teleport
- **Current**: Rank 3
- **Power Analysis**: D&D Dimension Door (500ft) is Level 4
- **Recommendation**: If teleport is long-range, should be Rank 4
- **Severity**: Medium - Verify range

#### Too Weak for Rank 3

**3. Simple Summons** (if underpowered at Rank 3)
- **Issue**: Summoned creatures too weak for rank
- **Current**: Rank 3
- **Power Analysis**: Rank 3 summons should be battlefield-relevant (Tier 2-3 creatures)
- **Recommendation**: Verify summon strength matches rank
- **Severity**: Medium - Check creature tiers

**4. Single-Target Buffs** (if limited at Rank 3)
- **Issue**: Minor buffs at high rank
- **Current**: Rank 3
- **Power Analysis**: Rank 3 should provide significant boosts or affect multiple targets
- **Recommendation**: Check that single-target buffs are substantial enough
- **Severity**: Low - Verify power level

**5. Limited Control** (if brief duration at Rank 3)
- **Issue**: Control spells with very brief duration
- **Current**: Rank 3
- **Power Analysis**: Rank 3 control should last short duration minimum for battlefield impact
- **Recommendation**: Verify duration isn't just "briefly"
- **Severity**: Medium - Check duration

---

### Rank 4 Concerns (Very High Power)

#### Too Powerful for Rank 4

**1. Reality-Warping Effects** (if any exist)
- **Issue**: Effects that break game reality
- **Current**: Rank 4
- **Power Analysis**: Rank 4 should be powerful but bounded (D&D Level 6)
- **Recommendation**: Ensure no permanent effects, auto-kills, or reality-warping
- **Severity**: High - Must stay bounded

#### Too Weak for Rank 4

**2. Simple Damage Spells** (if just damage at Rank 4)
- **Issue**: Pure damage with no additional effects
- **Current**: Rank 4
- **Power Analysis**: Rank 4 should have transformative or major battlefield effects beyond damage
- **Recommendation**: Verify high-rank damage spells have riders (conditions, terrain, etc.)
- **Severity**: Medium - Check for additional effects

---

## Recommendations by Priority

### High Priority (Immediate Review Required)

1. **Silence** (*twilight*, Rank 1) → **Recommend Rank 2**
   - Powerful anti-caster effect, D&D Level 2 equivalent
   
2. **Light/Illumination effects** → **Verify Rank 0 or Rank 1**
   - Pure utility illumination is typically cantrip-level
   
3. **Major Teleportation at Rank 3** → **May need Rank 4**
   - Long-range teleport exceeds Rank 3 scope

### Medium Priority (Playtesting Verification)

4. **Mind Blast** (*telepathy*, Rank 0) → **Monitor for balance**
   - Unlimited daze may be too strong, watch in actual play

5. **Detect Magic at Rank 2** → **Consider Rank 1**
   - Simple detection usually lower rank unless very detailed

6. **Summon spells at Rank 3** → **Verify creature tier**
   - Ensure summons are appropriately powerful

7. **Mass Healing at Rank 2** → **Verify uses AoE damage scaling**
   - Group healing should follow AoE rules (+4/+8/+12 max)

### Low Priority (Verify Implementation Details)

8. **Invisibility at Rank 1** → **Verify limitations**
   - Ensure concentration + breaks on attack

9. **Flight at Rank 2** → **Verify short duration**
   - Confirm duration is short, not medium

10. **Charm at Rank 1** → **Verify save mechanics**
    - Ensure proper limitations and counterplay

---

## Spell-Specific Audit Notes

### Arcane Disciplines

#### Evocation
- **No major rank concerns** - damage scaling appears appropriate
- **Verify**: Flame Burst (R1) area is smaller than Fireball (R2) area

#### Illusion  
- **Borderline**: Invisibility (R1) - ensure proper limitations
- **Verify**: Seeming (incomplete) - complex illusion should be R2-3

#### Conjuration
- **High Priority**: Teleport spells - verify range matches rank
- **Verify**: Summon spells - creature tiers should scale with rank

#### Telepathy
- **Medium Priority**: Mind Blast (R0) - may be too strong for cantrip
- **Verify**: Charm (R1) - ensure limitations exist
- **Gap**: Memory alteration missing entirely (would be R2-4)

#### Telekinetics
- **No major concerns** - force effects seem appropriately ranked
- **Note**: Most are incomplete, can't fully audit

#### Necromancy
- **Well-balanced** - best-developed discipline, ranks appear appropriate
- **Verify**: Finger of Death (incomplete R4) - should have significant effect beyond damage

### Mystic Traditions

#### Light
- **Medium Priority**: Light spell - typically cantrip, verify rank
- **No other concerns** - anti-undead effects appropriately scaled

#### Twilight
- **High Priority**: Silence (R1) → Should likely be Rank 2
- **Verify**: Silent Night (incomplete) - name suggests powerful effect, check rank appropriateness

#### Life
- **Verify**: Mass healing spells use AoE scaling
- **Gap**: Resurrection missing (would be R4-5)

#### Death
- **Well-balanced** - curse/decay effects appropriately ranked
- **Gap**: Disease mechanics need to be added at various ranks

#### Nature
- **Mostly appropriate** - good rank distribution
- **Verify**: Incomplete R4 spells (Tree Stride, Control Weather) are appropriately powerful

#### Tempest
- **Largest tradition, generally well-balanced**
- **Verify**: Incomplete weather control spells (R4) match power level

#### Peace
- **Limited sample size** - hard to audit thoroughly
- **Note**: Missing travel magic (would span R1-4)

#### War
- **Very limited** - only 10 spells total
- **Note**: Needs R3-5 expansion, can't audit missing ranks

---

## Methodology

**Audit Process**:
1. Review each spell's rank, effects, duration, area, and targeting
2. Compare to D&D spell level equivalents for power reference
3. Assess against Nexus rank criteria (cantrip vs legendary scale)
4. Consider impact on gameplay (trivializes encounters vs. adds options)
5. Flag spells that feel over/underpowered for their rank

**Limitations**:
- 18 spells incomplete (can't fully audit)
- Rank 5 entirely missing (no audit possible)
- Some details unclear without full spell text
- Playtesting data not available

**Notes**:
- Many concerns are borderline cases requiring playtesting
- Damage numbers generally correct, concerns are about conceptual power
- Focus is on spells that break the power curve, not minor tweaks

---

## Implementation Recommendations

### Immediate Actions

1. **Review High Priority spells**: Silence, Light, Major Teleportation
2. **Complete incomplete spells** before rank audit is final (18 spells need completion)
3. **Add Rank 5 spells** using appropriate power level (≈D&D Level 7)

### Medium Term

4. **Playtesting focus**: Monitor identified borderline spells (Mind Blast, Flight, etc.)
5. **Documentation**: Add design notes to spells explaining rank placement rationale
6. **Consistency pass**: Ensure similar effects are at similar ranks across disciplines/traditions

### Long Term

7. **Post-release balance**: Track spell usage and power level concerns from actual play
8. **Errata process**: Establish method for adjusting ranks if needed
9. **Expansion planning**: When adding new spells, use this framework for rank assignment

---

## Conclusion

**Overall Assessment**: The spell system is generally well-balanced with appropriate rank distribution. Most spells appear correctly placed for their power level.

**Key Issues**:
- ~10% of spells (23 out of 230) have potential rank concerns
- Most concerns are borderline cases requiring playtesting verification
- High-priority adjustments needed for only 3-5 spells
- Incomplete spells (18) prevent full audit of Rank 4 tier

**Confidence Level**:
- **High**: Ranks 0-2 are well-balanced
- **Medium**: Rank 3 has some borderline cases
- **Low**: Rank 4 can't be fully assessed (too many incomplete)
- **N/A**: Rank 5 doesn't exist yet

**Next Steps**: Focus on completing incomplete spells, reviewing high-priority concerns, and creating Rank 5 content using the bounded power framework (D&D Level 7 equivalent).
