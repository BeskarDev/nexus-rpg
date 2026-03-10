# Dice Rolling Mechanics & Balance Analysis

> **Scope:** Core dice resolution system (Attribute Die + 1d6 + Skill Rank), success level probabilities, boon/bane mechanics, scaling across character progression, attack vs defense balance, and campaign-long power trajectory.

---

## 1. Executive Summary

### Key Findings

1. **The distribution is trapezoidal, not a true bell curve.** Adding a variable Attribute Die (d4–d12) to a fixed d6 produces a tapered, plateau-shaped distribution — symmetric at d4+d6, increasingly flat-topped at d10+d6 and d12+d6. This is not a flaw; it creates intentional properties where high-attribute characters have a wide reliable band while low-attribute characters have a tighter, more uncertain range.
2. **Variance is well-bounded compared to flat-die systems.** Standard deviation ranges from 2.04 (d4+d6) to 3.85 (d12+d6), all significantly tighter than a d20 system (std ≈ 5.77). This means results cluster more around the average and feel more predictable, which suits a lethal, skill-driven system.
3. **The sweet spot of difficulty tracks correctly with level.** Medium difficulty (TN 8) is the sweet spot at Level 3, Hard (TN 10) at Level 5, and Very Hard (TN 12) at Level 8–10. GMs can rely on the standard difficulty ladder without recalibration as the campaign progresses.
4. **Boons and banes are elegantly designed and impactful.** The first boon or bane shifts the d6 component by ~0.97 on average via advantage/disadvantage, while additional boons/banes add a flat +1/−1 each. The first boon/bane compresses or expands the probability tail, making it feel more meaningful than a flat modifier. The system is intuitive and significant without being overwhelming.
5. **Attack vs same-level defense success rates decline at high levels.** When both attacker and defender progress symmetrically (same-tier creature), success rates drop from ~69% at Level 1 to ~46% at Level 10. This is a deliberate consequence of defense scaling faster than offense (defense base bonuses + skill ranks vs offense dice + skill ranks), and may require monitoring for "whiff" frustration at high tiers.
6. **Damage output per attack flattens at high tiers.** Expected damage against same-tier creatures peaks in mid-levels and slightly decreases at Levels 8–10, primarily due to Armor Value growth outpacing weapon damage growth. This is mitigated by magic items, talents, and multi-attack options, but represents a design tension worth monitoring.
7. **Untrained expert skill penalties are appropriately punishing.** The +1 bane drops success rates by ~25 percentage points (from ~56% to ~44% for d8 + R0 vs TN 8), creating meaningful differentiation between trained and untrained characters.
8. **Progression pacing is smooth across 10 levels.** Average roll totals increase from 8.0 (Level 1) to 15.0 (Level 10), a +7 total increase. Combined with defense base bonuses (+4 total by Level 9), the system avoids both early-game helplessness and late-game trivialization.

### Design Principles Validated

| Principle | Status | Notes |
|-----------|--------|-------|
| Tight, predictable outcomes | ✅ Confirmed | Variance 4–15 vs d20's 33 |
| Meaningful skill investment | ✅ Confirmed | Each rank adds +1, each die step adds ~+1 average |
| Boons/banes as primary modifier | ✅ Confirmed | ~+1 average swing per boon/bane, intuitive mechanic |
| Lethal combat with consequences | ✅ Confirmed | Low HP pools + bounded damage = fast, decisive fights |
| Bounded power ceiling | ✅ Confirmed | Max roll of 23 (d12+d6+R5), max defense 16 |
| Diminishing returns at mastery | ⚠️ Monitor | High-level mirror matches trend toward ~45–55% success |

---

## 2. Core Resolution Mechanics

### 2.1 The Dice Formula

The core resolution is:

> **Attribute Die + 1d6 + Skill Rank** vs **Target Number** (default TN 8)

- **Attribute Die**: d4 through d12 (with d4−1 and d12+1 as extreme extensions)
- **d6**: The fixed randomizer providing consistency
- **Skill Rank**: 0–5, representing trained expertise

### 2.2 Distribution Shape Analysis

Adding two dice of different sizes produces a **trapezoidal** (not bell-curve) distribution. The shape evolves with attribute die size:

**d4 + d6** — Closest to triangular. Peaks sharply at 5–7 (16.7% each), tapers symmetrically. This creates maximum uncertainty: results are concentrated but the range is tight (2–10).

```
 2:   4.2%  ██
 3:   8.3%  ████
 4:  12.5%  ██████
 5:  16.7%  ████████
 6:  16.7%  ████████
 7:  16.7%  ████████
 8:  12.5%  ██████
 9:   8.3%  ████
10:   4.2%  ██
```

**d8 + d6** — Trapezoidal with flat plateau at 7–9 (12.5% each). Wider range (2–14), more spread.

```
 2:   2.1%  █
 3:   4.2%  ██
 4:   6.2%  ███
 5:   8.3%  ████
 6:  10.4%  █████
 7:  12.5%  ██████
 8:  12.5%  ██████
 9:  12.5%  ██████
10:  10.4%  █████
11:   8.3%  ████
12:   6.2%  ███
13:   4.2%  ██
14:   2.1%  █
```

**d12 + d6** — Wide plateau at 7–13 (8.3% each). The distribution becomes nearly uniform across 7 values, with tapered tails. High-attribute characters have a wide "reliable band."

```
 2:   1.4%  █
 3:   2.8%  █
 4:   4.2%  ██
 5:   5.6%  ██
 6:   6.9%  ███
 7:   8.3%  ████
 8:   8.3%  ████
 9:   8.3%  ████
10:   8.3%  ████
11:   8.3%  ████
12:   8.3%  ████
13:   8.3%  ████
14:   6.9%  ███
15:   5.6%  ██
16:   4.2%  ██
17:   2.8%  █
18:   1.4%  █
```

**Design Implication**: The flat-topped distribution at high attributes means high-level characters have more consistent results within a wide band. They rarely roll very low, but also don't cluster tightly around one peak the way 2d6 would. This is a distinctive property that differentiates Nexus from both d20 (fully uniform) and 2d6 (strongly bell-curved) systems.

### 2.3 Variance & Standard Deviation

| Configuration | Average | Std Dev | Variance | Range |
|---------------|---------|---------|----------|-------|
| d4 + d6 | 6.0 | 2.04 | 4.17 | 2–10 |
| d6 + d6 | 7.0 | 2.42 | 5.83 | 2–12 |
| d8 + d6 | 8.0 | 2.86 | 8.17 | 2–14 |
| d10 + d6 | 9.0 | 3.34 | 11.17 | 2–16 |
| d12 + d6 | 10.0 | 3.85 | 14.83 | 2–18 |
| **1d20 (comparison)** | **10.5** | **5.77** | **33.25** | **1–20** |

The system's variance is **2.2× to 8× tighter** than a d20, depending on attribute size. Even at d12, the standard deviation (3.85) is 33% lower than a d20. This means:

- Skilled characters fail less randomly than in d20 systems
- Investment in attributes and skills reliably improves outcomes
- Extreme results (blunders and criticals) remain possible but are rarer, which matches the "mortal-scale, consequences matter" design intent

---

## 3. Success Level Probability Analysis

### 3.1 Success Level Bands

| Difference to TN | Success Level | Width |
|-------------------|---------------|-------|
| −6 or lower | Blunder | Open-ended |
| −5 to −1 | Failure | 5 points |
| 0 to +2 | Weak Success | 3 points |
| +3 to +5 | Strong Success | 3 points |
| +6 or more | Critical Success | Open-ended |

The **3-point width** of Weak and Strong Success means each success tier covers approximately one standard deviation of the d6 component. This creates natural "tiers" that respond meaningfully to small bonuses (+1 to +3).

### 3.2 Success Probabilities vs TN 8 (Medium Difficulty)

| Configuration | Avg | Blunder | Fail | Weak | Strong | Crit | Any Success |
|---------------|-----|---------|------|------|--------|------|-------------|
| d4 + d6 + R0 | 6.0 | 4.2% | 70.8% | 25.0% | 0.0% | 0.0% | 25.0% |
| d6 + d6 + R0 | 7.0 | 2.8% | 55.6% | 33.3% | 8.3% | 0.0% | 41.7% |
| d6 + d6 + R1 | 8.0 | 0.0% | 41.7% | 41.7% | 16.7% | 0.0% | 58.3% |
| d8 + d6 + R0 | 8.0 | 2.1% | 41.7% | 35.4% | 18.7% | 2.1% | 56.2% |
| d8 + d6 + R1 | 9.0 | 0.0% | 31.2% | 37.5% | 25.0% | 6.2% | 68.8% |
| d8 + d6 + R2 | 10.0 | 0.0% | 20.8% | 35.4% | 31.2% | 12.5% | 79.2% |
| d8 + d6 + R3 | 11.0 | 0.0% | 12.5% | 31.2% | 35.4% | 20.8% | 87.5% |
| d10 + d6 + R2 | 11.0 | 0.0% | 16.7% | 28.3% | 30.0% | 25.0% | 83.3% |
| d10 + d6 + R3 | 12.0 | 0.0% | 10.0% | 25.0% | 30.0% | 35.0% | 90.0% |
| d10 + d6 + R4 | 13.0 | 0.0% | 5.0% | 20.0% | 30.0% | 45.0% | 95.0% |
| d12 + d6 + R3 | 13.0 | 0.0% | 8.3% | 20.8% | 25.0% | 45.8% | 91.7% |
| d12 + d6 + R5 | 15.0 | 0.0% | 1.4% | 12.5% | 23.6% | 62.5% | 98.6% |

**Observations:**
- At d6+R1 (typical Level 1 adventurer), Medium difficulty gives ~58% success — challenging but achievable
- At d8+R2 (Level 3), Medium gives ~79% — skilled and reliable
- At d12+R5 (Level 10), Medium is nearly automatic (98.6%) — mastery feels earned
- The progression from 58% → 79% → 90% → 98% across levels provides satisfying power growth without ever trivializing Medium tasks too early

### 3.3 Character Profiles Across All Difficulties

**Level 1 (d6, Rank 1)**

| TN | Blunder | Fail | Weak | Strong | Crit | Any Success |
|----|---------|------|------|--------|------|-------------|
| 4 (Trivial) | 0.0% | 2.8% | 25.0% | 44.4% | 27.8% | 97.2% |
| 6 (Easy) | 0.0% | 16.7% | 41.7% | 33.3% | 8.3% | 83.3% |
| 8 (Medium) | 0.0% | 41.7% | 41.7% | 16.7% | 0.0% | 58.3% |
| 10 (Hard) | 8.3% | 63.9% | 25.0% | 2.8% | 0.0% | 27.8% |
| 12 (V. Hard) | 27.8% | 63.9% | 8.3% | 0.0% | 0.0% | 8.3% |

**Level 3 (d8, Rank 2)**

| TN | Blunder | Fail | Weak | Strong | Crit | Any Success |
|----|---------|------|------|--------|------|-------------|
| 4 (Trivial) | 0.0% | 0.0% | 12.5% | 31.2% | 56.2% | 100.0% |
| 6 (Easy) | 0.0% | 6.2% | 25.0% | 37.5% | 31.2% | 93.7% |
| 8 (Medium) | 0.0% | 20.8% | 35.4% | 31.2% | 12.5% | 79.2% |
| 10 (Hard) | 2.1% | 41.7% | 35.4% | 18.7% | 2.1% | 56.2% |
| 12 (V. Hard) | 12.5% | 56.2% | 25.0% | 6.2% | 0.0% | 31.2% |
| 14 (Extreme) | 31.2% | 56.2% | 12.5% | 0.0% | 0.0% | 12.5% |

**Level 5 (d10, Rank 3)**

| TN | Blunder | Fail | Weak | Strong | Crit | Any Success |
|----|---------|------|------|--------|------|-------------|
| 6 (Easy) | 0.0% | 1.7% | 15.0% | 28.3% | 55.0% | 98.3% |
| 8 (Medium) | 0.0% | 10.0% | 25.0% | 30.0% | 35.0% | 90.0% |
| 10 (Hard) | 0.0% | 25.0% | 30.0% | 28.3% | 16.7% | 75.0% |
| 12 (V. Hard) | 5.0% | 40.0% | 30.0% | 20.0% | 5.0% | 55.0% |
| 14 (Extreme) | 16.7% | 48.3% | 25.0% | 10.0% | 0.0% | 35.0% |

**Level 8 (d12, Rank 4)**

| TN | Blunder | Fail | Weak | Strong | Crit | Any Success |
|----|---------|------|------|--------|------|-------------|
| 8 (Medium) | 0.0% | 4.2% | 16.7% | 25.0% | 54.2% | 95.8% |
| 10 (Hard) | 0.0% | 13.9% | 23.6% | 25.0% | 37.5% | 86.1% |
| 12 (V. Hard) | 1.4% | 27.8% | 25.0% | 25.0% | 20.8% | 70.8% |
| 14 (Extreme) | 8.3% | 37.5% | 25.0% | 20.8% | 8.3% | 54.2% |
| 16 (Legendary) | 20.8% | 41.7% | 23.6% | 12.5% | 1.4% | 37.5% |

**Level 10 (d12, Rank 5)**

| TN | Blunder | Fail | Weak | Strong | Crit | Any Success |
|----|---------|------|------|--------|------|-------------|
| 8 (Medium) | 0.0% | 1.4% | 12.5% | 23.6% | 62.5% | 98.6% |
| 10 (Hard) | 0.0% | 8.3% | 20.8% | 25.0% | 45.8% | 91.7% |
| 12 (V. Hard) | 0.0% | 20.8% | 25.0% | 25.0% | 29.2% | 79.2% |
| 14 (Extreme) | 4.2% | 33.3% | 25.0% | 23.6% | 13.9% | 62.5% |
| 16 (Legendary) | 13.9% | 40.3% | 25.0% | 16.7% | 4.2% | 45.8% |

### 3.4 Sweet Spot Analysis

The "sweet spot" for engaging rolls is approximately 55–85% total success with 5–35% critical chance and below 5% blunder risk. This analysis shows which TN bands match that sweet spot at each level:

| Level | Sweet Spot TN | Difficulty Label | Notes |
|-------|--------------|------------------|-------|
| 1 | TN 6 | Easy | 83% success, 8% crit — Medium (TN 8) is a stretch at 58% |
| 3 | TN 8 | Medium | 79% success, 12.5% crit — aligns with default TN |
| 5 | TN 10–12 | Hard to V. Hard | 55–75% success, 5–17% crit |
| 8 | TN 12 | Very Hard | 71% success, 21% crit |
| 10 | TN 12–14 | Very Hard to Extreme | 63–79% success, 14–29% crit |

**Assessment**: The difficulty ladder scales correctly with character level. A GM who uses Medium (TN 8) as the default for "everyday" tasks will find that it naturally transitions from "challenging" at Level 1 to "routine" by Level 5, exactly matching the narrative expectation that seasoned adventurers handle common tasks with ease. Hard and Very Hard difficulties remain engaging throughout the mid-to-late game.

---

## 4. Boon & Bane Analysis

### 4.1 Mechanic Summary

| Condition | Mechanic | Average d6 Result |
|-----------|----------|-------------------|
| Normal | Roll 1d6 | 3.50 |
| 1 Boon | Roll 2d6, take highest | 4.47 (+0.97) |
| 1 Bane | Roll 2d6, take lowest | 2.53 (−0.97) |
| 2 Boons | 2d6 take highest + 1 | 5.47 (+1.97) |
| 2 Banes | 2d6 take lowest − 1 | 1.53 (−1.97) |
| 3 Boons | 2d6 take highest + 2 | 6.47 (+2.97) |
| 3 Banes | 2d6 take lowest − 2 | 0.53 (−2.97) |

### 4.2 Impact on Success Rates (d8 + d6 + Rank 2 vs TN 8)

| Condition | Avg Roll | Fail | Weak | Strong | Crit | Any Success |
|-----------|----------|------|------|--------|------|-------------|
| 2 Banes | 8.0 | 43.4% | 37.5% | 17.4% | 1.7% | 56.6% |
| 1 Bane | 9.0 | 31.3% | 37.2% | 26.7% | 4.9% | 68.8% |
| Normal | 10.0 | 20.8% | 35.4% | 31.2% | 12.5% | 79.2% |
| 1 Boon | 11.0 | 10.4% | 33.7% | 35.8% | 20.1% | 89.6% |
| 2 Boons | 12.0 | 4.9% | 26.7% | 37.2% | 31.3% | 95.1% |
| 3 Boons | 13.0 | 1.7% | 17.4% | 37.5% | 43.4% | 98.3% |

### 4.3 Assessment

**Strengths:**
1. **Intuitive**: The advantage/disadvantage mechanic (2d6 take highest/lowest) is familiar from modern RPGs and immediately understandable.
2. **Asymmetric probability shift**: The first boon/bane doesn't just shift the average — it compresses or expands the probability tail. A boon reduces the chance of rolling 1 on the d6 from 16.7% to 2.8%, while a bane increases it to 30.6%. This makes the first boon/bane feel disproportionately impactful for avoiding disaster or creating it.
3. **Graceful stacking**: Beyond the first boon/bane, each additional one adds a flat +1/−1. This is simple, predictable, and avoids diminishing-returns frustration.
4. **Net cancellation**: Boons and banes cancel 1:1 before resolution, keeping mental math fast at the table.
5. **Proportional impact**: A single boon/bane shifts success by ~10 percentage points — meaningful but not overwhelming. Two boons shift by ~16 more points. Three boons push to near-certainty (+19%). This gradient is well-calibrated.

**One Minor Concern:**
- At very high skill levels (d12+R5), a single boon on an already-dominant roll pushes success to 99%+, making boons feel wasted. However, the system's architecture means boons at this level primarily shift *which success tier* is achieved (Weak → Strong → Critical), which still matters for damage multipliers and spell effects.

---

## 5. Scaling & Progression Analysis

### 5.1 Average Roll Progression

| Level | Typical Config | Avg Roll | Delta |
|-------|----------------|----------|-------|
| 1 | d6 + R1 | 8.0 | — |
| 2 | d8 + R1 | 9.0 | +1.0 |
| 3 | d8 + R2 | 10.0 | +1.0 |
| 4 | d10 + R2 | 11.0 | +1.0 |
| 5 | d10 + R3 | 12.0 | +1.0 |
| 6 | d10 + R3 | 12.0 | +0.0 |
| 7 | d10 + R4 | 13.0 | +1.0 |
| 8 | d12 + R4 | 14.0 | +1.0 |
| 9 | d12 + R5 | 15.0 | +1.0 |
| 10 | d12 + R5 | 15.0 | +0.0 |

**Total progression**: +7.0 from Level 1 to Level 10 (approximately +0.78 per level).

**Assessment**: This is remarkably linear and predictable. Each level typically grants +1 to the average roll from either a die step increase or a skill rank increase. The plateau at Levels 6 and 10 (no primary stat/skill growth) creates natural "consolidation" levels where the character broadens rather than deepens, which is good for encouraging secondary skill investment.

### 5.2 Defense Scaling

**Martial Character (STR-focused Fighter)**

| Level | STR | AGI | Fight | Def Bonus | Parry | Dodge |
|-------|-----|-----|-------|-----------|-------|-------|
| 1 | d8 | d6 | R1 | +0 | 8 | 8 |
| 3 | d8 | d8 | R2 | +1 | 10 | 10 |
| 5 | d10 | d8 | R3 | +2 | 12 | 11 |
| 7 | d10 | d8 | R4 | +3 | 14 | 12 |
| 9 | d12 | d10 | R5 | +4 | 16 | 14 |

**Caster Character (SPI-focused Mystic)**

| Level | SPI | AGI | Myst | Def Bonus | Resist | Dodge |
|-------|-----|-----|------|-----------|--------|-------|
| 1 | d8 | d6 | R1 | +0 | 9 | 8 |
| 3 | d8 | d6 | R2 | +1 | 10 | 9 |
| 5 | d10 | d6 | R3 | +2 | 12 | 10 |
| 7 | d10 | d8 | R4 | +3 | 13 | 12 |
| 9 | d12 | d8 | R5 | +4 | 15 | 13 |

**Defense scaling sources** (using the game's ½ × Attribute lookup table: d6=3, d8=4, d10=5, d12=6)**:**
- Parry: 7 + Fighting rank (R1→R5 = +4) + defense base bonus (+4 at L9) = **+8 total**
- Dodge: 5 + ½ Agility (d6→d10 = +2) + defense base bonus (+4 at L9) = **+6 total**
- Resist: 5 + ½ Spirit (d8→d12 = +2) + defense base bonus (+4 at L9) = **+6 total**

**Offense scaling sources:**
- Attack roll: Attribute die average improvement (+2 from d8→d12 for a typical martial) + Skill Rank improvement (+4 from R1→R5) + d6 (unchanged) = **~+6 total**

**Critical observation**: Defense outpaces offense. Parry gains +8 while attack rolls gain ~+6. This creates a 2-point gap that widens over the campaign. This is intentional — it ensures combats don't become trivial one-shot affairs as characters advance. However, it also means the system relies on boons, talents, and magic items to close the gap for offense.

### 5.3 Attack vs Same-Tier Defense

| Level | Player Avg Roll | Same-Tier Defense | Success Rate | Crit Rate |
|-------|-----------------|-------------------|--------------|-----------|
| 1 | 9.0 (d8+R1) | 8 (Parry) | 68.8% | 6.2% |
| 3 | 10.0 (d8+R2) | 10 (Parry) | 56.2% | 2.1% |
| 5 | 12.0 (d10+R3) | 12 (Parry) | 55.0% | 5.0% |
| 7 | 13.0 (d10+R4) | 14 (Parry) | 45.0% | 5.0% |
| 8 | 14.0 (d12+R4) | 14 (Parry) | 54.2% | 8.3% |
| 10 | 15.0 (d12+R5) | 16 (Parry) | 45.8% | 4.2% |

**Analysis**: In mirror-match scenarios (equal combatants), success rates oscillate between 45% and 69%, trending downward. This mirrors the intended design where combat is dangerous at all levels. The oscillation occurs because die-step upgrades (which boost both offense and defense) and skill rank upgrades (which boost offense more than defense) alternate.

### 5.4 Player Attacks vs Creature Defenses by Tier

Using creature defense formula (6 + Tier):

| Matchup | Player Avg | Creature Def | Success | Crit |
|---------|-----------|--------------|---------|------|
| L1 vs T1 (d8+R1 vs 7) | 9.0 | 7 | 79.2% | 12.5% |
| L3 vs T3 (d8+R2 vs 9) | 10.0 | 9 | 68.8% | 6.2% |
| L5 vs T5 (d10+R3 vs 11) | 12.0 | 11 | 65.0% | 10.0% |
| L7 vs T7 (d10+R4 vs 13) | 13.0 | 13 | 55.0% | 5.0% |
| L8 vs T8 (d12+R4 vs 14) | 14.0 | 14 | 54.2% | 8.3% |
| L10 vs T10 (d12+R5 vs 16) | 15.0 | 16 | 45.8% | 4.2% |

**Trend**: Players start with ~79% hit rates against same-tier creatures and decline to ~46% at top tier. This is a significant shift of 33 percentage points. The system compensates through:

1. **Magic items** providing +1 to +5 weapon/spell damage and situational boons
2. **Talents** offering boons, re-rolls, and bonus damage on specific conditions
3. **Combat Arts** adding additional attack options and modifiers
4. **Boons from positioning**, flanking, and tactical advantages
5. **Multiple attacks** (dual-wielding, multi-attack talents) creating more chances to hit
6. **Creature design** — not all creatures maximize defense; archetypes like Bruisers trade defense for HP

Despite these mitigations, GMs should be aware that high-tier combats rely more heavily on tactical play and synergy than on raw statistics.

### 5.5 Expected Damage Per Attack

| Matchup | Expected Damage |
|---------|-----------------|
| L1 (d8+R1, WD 3) vs T1 (Def 7, AV 1) | 6.44 |
| L1 (d8+R1, WD 3) vs T1 (Def 7, AV 2) | 5.65 |
| L3 (d8+R2, WD 4) vs T3 (Def 9, AV 3) | 4.94 |
| L5 (d10+R3, WD 5) vs T5 (Def 11, AV 5) | 5.50 |
| L5 (d10+R3, WD 6) vs T5 (Def 11, AV 5) | 6.60 |
| L8 (d12+R4, WD 7) vs T8 (Def 14, AV 8) | 5.33 |
| L10 (d12+R5, WD 8) vs T10 (Def 16, AV 10) | 3.83 |

**Assessment**: Average expected damage peaks in early-to-mid levels and declines at Tiers 8–10 for raw weapon attacks. This is where **magic item bonuses**, **weapon enchantments** (which add flat damage ignoring AV), and **talents** (providing bonus damage on conditions) become essential for maintaining adequate damage throughput. The system intentionally shares power growth with items and abilities rather than relying solely on base dice scaling.

### 5.6 Progression Timeline

| Level | Total XP | Est. Sessions | Cumulative Sessions |
|-------|----------|---------------|---------------------|
| 1 | 0 | — | 0 |
| 2 | 10 | ~8 | ~8 |
| 3 | 16 | ~5 | ~13 |
| 4 | 24 | ~6 | ~19 |
| 5 | 32 | ~6 | ~25 |
| 6 | 42 | ~8 | ~33 |
| 7 | 52 | ~8 | ~41 |
| 8 | 64 | ~10 | ~51 |
| 9 | 76 | ~10 | ~61 |
| 10 | 90 | ~11 | ~72 |

*(Assumes ~1.3 XP per session average with milestone bonuses.)*

The progression is front-loaded — characters reach Level 3 in ~13 sessions (getting out of the "fragile novice" phase), while the jump from Level 8 to 10 takes ~21 sessions. This pacing means:

- **Early game** (L1–3): ~13 sessions — characters establish identity, learn core abilities
- **Mid game** (L4–6): ~20 sessions — characters develop mastery, acquire magic items
- **Late game** (L7–10): ~39 sessions — characters refine, face legendary challenges

The slow late-game pacing is appropriate for a system where power growth is bounded and mastery is about breadth and versatility, not exponential power.

---

## 6. Trained vs Untrained Analysis

| Configuration | Average | vs TN 8 Success |
|---------------|---------|-----------------|
| Untrained Expert (d8 + 1 bane + R0) | 7.0 | 44.1% |
| Trained Rank 1 (d8 + d6 + R1) | 9.0 | 68.8% |
| Trained Rank 2 (d8 + d6 + R2) | 10.0 | 79.2% |

**Assessment**: The untrained penalty (+1 bane, no skill rank) creates a 24.7 percentage point gap vs Rank 1 on Medium difficulty. This is substantial enough to make training matter while not making untrained attempts impossible. The inability to attempt magic skills (Arcana, Mysticism) while untrained creates hard class boundaries for spellcasting, which is appropriate for a system with distinct arcane/mystic identities.

General skills (no untrained penalty) allow all characters to participate in basic Athletics, Perception, etc., ensuring no one is completely locked out of common challenges. This is good accessibility design.

---

## 7. Edge Cases & Risk Assessment

### 7.1 Low-Attribute Rolls (d4 Attribute)

Characters with d4 in an attribute rolling against TN 8 have only 25% success (with no skill) or 41.7% with Rank 1. This is appropriately punishing — a d4 represents "Poor" ability and should feel like a genuine weakness. However, a d4 character with R0 has a 4.2% blunder rate (1 in 24 rolls), which is low enough that blunders don't dominate their experience.

**Risk**: None. Working as intended.

### 7.2 Maximum Possible Rolls

- **Maximum roll**: d12 + 6 + 5 = 23 (with 3 boons: d12 + 8 + 5 = 25)
- **Maximum defense**: 16 (hard cap)
- **Margin**: Even the most extreme roll (25) against max defense (16) yields +9, which is a Critical Success

This confirms the 16 defense cap is appropriate — it's unreachable by most attacks and ensures even legendary characters must work for success against peak defenses.

### 7.3 Stacking Boons

With multiple boon sources (background, talents, positioning, spells), it's possible to accumulate 3+ boons. At d12+R5 with 3 boons, a Medium difficulty roll succeeds 99.9%+ of the time with 75%+ critical rate.

**Risk**: Low. This represents a fully optimized, high-level character using all their resources on their best skill. The system's resource constraints (boons from talents often cost actions, spell slots, or daily uses) naturally limit stacking. GMs should be aware that coordinated parties can stack boons on key rolls, but this is a feature (rewarding teamwork), not a bug.

### 7.4 Defense vs Offense Divergence at High Tiers

As noted in Section 5.3, the defense-offense gap reaches 2+ points at high levels, pushing mirror-match success below 50%. This could feel frustrating in:
- **PvP scenarios** or duels between equal combatants (unlikely to be common)
- **Fights against high-defense creatures** without magic item support
- **Campaigns where magic items are scarce** and talents are the primary power source

**Risk**: Moderate. The system's intent is clear (defense-favoring, lethal combat), but GMs running low-magic campaigns should be aware that high-tier combat may feel more "whiff-heavy" without item support.

### 7.5 Success Level Band Width

The 3-point width of Weak and Strong Success bands means a +3 bonus reliably shifts results by one full success tier. This is elegant but creates a specific risk: effects that grant exactly +3 (or multiples of 3) are disproportionately powerful because they guarantee a full tier upgrade. Designers should be aware of this when creating bonuses.

**Risk**: Low, if bonus values are kept within the established +1/+2 range for most effects.

### 7.6 Flat d6 as Fixed Component

The d6 component is constant across all levels and all characters. This means:
- At low levels (d4+d6), the d6 contributes ~58% of the random variance
- At high levels (d12+d6), the d6 contributes only ~27% of the random variance

This is by design — the Attribute Die becomes dominant as characters grow, making their inherent ability more deterministic. However, the fixed d6 also means boons and banes have **proportionally less impact** at higher levels (the d6 is a smaller share of the total roll). A boon still shifts the average by ~1, but on a d12+R5 roll averaging 15, that ~1 is only a ~6.7% shift vs ~12.5% at d6+R1 averaging 8.

**Risk**: Minimal. This is a natural and appropriate feature — experienced characters are less affected by minor advantages and disadvantages, which matches narrative expectations.

---

## 8. Summary of Recommendations

### Priority 1 — Monitor (No Immediate Action Needed)

| Item | Concern | Recommendation |
|------|---------|----------------|
| High-tier offense-defense gap | Success rates drop to ~46% at L10 vs same-tier | Monitor during playtesting; ensure talent trees and magic items provide sufficient boon sources. Consider adding 1–2 combat arts or talents that grant attack boons at high ranks. |
| Damage throughput at T8–T10 | Expected damage declines when AV outpaces weapon damage | Magic item weapon damage (+1 to +5) and enchantments (flat damage ignoring AV) are the intended solution. Verify item availability in published adventures matches this assumption. |
| Boon value diminishment at high levels | Boons shift ~1 point on rolls averaging 14–15 | This is by design, but ensure high-level talents offer boons on *success level* (shifting Weak→Strong) rather than just on the roll itself. |

### Priority 2 — Validate During Content Design

| Item | Concern | Recommendation |
|------|---------|----------------|
| Bonus value discipline | +3 bonuses guarantee a full success tier shift | Keep most bonuses at +1 or +2. Reserve +3 or higher for rare, costly, or high-rank abilities. |
| Creature defense variance | Fixed formula (6 + Tier) creates predictable outcomes | Creature archetypes (Bruiser, Skirmisher, etc.) should vary defense by ±2 to create diverse combat feel at all tiers. |
| Low-magic campaign viability | System assumes magic items compensate for defense-offense gap | Consider an optional rule or guidance for GMs running low-magic settings: e.g., reduce creature defenses by 1 at T6+, or grant adventurers a flat +1 attack at Level 7+. |

### Priority 3 — Document for GM Guidance

| Item | Concern | Recommendation |
|------|---------|----------------|
| Sweet spot reference | GMs may not know which TN to use at each level | Include a "recommended difficulty by level" sidebar in GM tools, referencing the sweet spot analysis from Section 3.4. |
| Progression plateau levels | Levels 6 and 10 have no primary stat growth | Note in progression rules that these levels are ideal for broadening secondary skills, acquiring new general skills, or investing in out-of-class abilities. |
| Boon stacking awareness | Coordinated parties can stack 3+ boons | Include a GM tip about recognizing boon stacking as earned teamwork. Optionally suggest a soft cap (e.g., "boons beyond +3 provide diminishing returns") if it becomes problematic. |

---

## Appendix A: Methodology

All probability calculations were performed using exact combinatorial enumeration (not Monte Carlo simulation). For each die combination:
1. All possible outcomes were enumerated (e.g., d8+d6 = 48 equally likely outcomes)
2. Each outcome was classified into success level bands relative to the specified TN
3. Probabilities were calculated as (favorable outcomes) / (total outcomes)

Boon/bane calculations used all 36 outcomes of 2d6 with max/min selection, then added flat modifiers for additional boons/banes beyond the first.

Expected damage calculations used the formula:
- **Base damage** = ½ × Attribute (from the attribute modifier table)
- **On Weak**: base + 1× weapon damage − AV (minimum 1)
- **On Strong**: base + 2× weapon damage − AV (minimum 1)
- **On Critical**: base + 3× weapon damage − AV (minimum 1)
- **On Fail/Blunder**: 0 damage
- **Expected** = Σ (damage × probability) across all outcomes

## Appendix B: Key Statistical Reference

### Average Rolls by Configuration

| Attr Die | +R0 | +R1 | +R2 | +R3 | +R4 | +R5 |
|----------|-----|-----|-----|-----|-----|-----|
| d4 | 6.0 | 7.0 | 8.0 | 9.0 | 10.0 | 11.0 |
| d6 | 7.0 | 8.0 | 9.0 | 10.0 | 11.0 | 12.0 |
| d8 | 8.0 | 9.0 | 10.0 | 11.0 | 12.0 | 13.0 |
| d10 | 9.0 | 10.0 | 11.0 | 12.0 | 13.0 | 14.0 |
| d12 | 10.0 | 11.0 | 12.0 | 13.0 | 14.0 | 15.0 |

### Total Success Rate vs TN (d8 + d6 + Rank 2 — "Typical Mid-Level")

| TN | Any Success |
|----|-------------|
| 4 (Trivial) | 100.0% |
| 6 (Easy) | 93.7% |
| 8 (Medium) | 79.2% |
| 10 (Hard) | 56.2% |
| 12 (V. Hard) | 31.2% |
| 14 (Extreme) | 12.5% |
| 16 (Legendary) | 2.1% |

### Boon/Bane Average Shift Summary

| Condition | Avg d6 Result | Shift from Normal |
|-----------|---------------|-------------------|
| 3 Banes | 0.53 | −2.97 |
| 2 Banes | 1.53 | −1.97 |
| 1 Bane | 2.53 | −0.97 |
| Normal | 3.50 | 0 |
| 1 Boon | 4.47 | +0.97 |
| 2 Boons | 5.47 | +1.97 |
| 3 Boons | 6.47 | +2.97 |
