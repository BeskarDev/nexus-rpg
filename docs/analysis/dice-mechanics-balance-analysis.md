# Dice Rolling Mechanics & Balance Analysis

> **Scope:** Core dice resolution system (Attribute Die + 1d6 + Skill Rank), success level probabilities, boon/bane mechanics, scaling across character progression, attack vs defense balance, Parry formula investigation, AV progression concerns, re-roll economy, SL-shifting abilities, XP pacing, and campaign-long power trajectory.

---

## 1. Executive Summary

### Key Findings

1. **The distribution is trapezoidal, not a true bell curve.** Adding a variable Attribute Die (d4–d12) to a fixed d6 produces a tapered, plateau-shaped distribution — symmetric at d4+d6, increasingly flat-topped at d10+d6 and d12+d6. This is not a flaw; it creates intentional properties where high-attribute characters have a wide reliable band while low-attribute characters have a tighter, more uncertain range.
2. **Variance is well-bounded compared to flat-die systems.** Standard deviation ranges from 2.04 (d4+d6) to 3.85 (d12+d6), all significantly tighter than a d20 system (std ≈ 5.77). This means results cluster more around the average and feel more predictable, which suits a lethal, skill-driven system.
3. **The sweet spot of difficulty tracks correctly with level.** Medium difficulty (TN 8) is the sweet spot at Level 1 (68.8% success with d8+R1), aligns perfectly at Level 3, and scales upward to Hard (TN 10) at Level 5 and Very Hard (TN 12) at Level 8–10.
4. **Boons and banes are elegantly designed and impactful.** The first boon or bane shifts the d6 component by ~0.97 on average via advantage/disadvantage, while additional boons/banes add a flat +1/−1 each. The system avoids flat numerical bonuses entirely — all roll modifications use the boon/bane framework. This is clean, intuitive, and avoids the variance-vs-certainty trap of flat modifiers.
5. **Parry scaling with shields rewards tanky builds but hits the defense cap at high levels.** A shield user's Parry exceeds Dodge by 1–3 points across levels. At Level 9+, unshielded Parry already hits the 16 cap, making the shield's +1 Parry redundant. This is a self-correcting ceiling, though mid-level shield users (L5–8) enjoy a significant defensive advantage. The current Parry formula (7 + Fighting) is justified as an intended reward for frontline investment.
6. **AV stacking reduces Weak hits to minimum damage (1) at all levels for tanky builds.** A shield-and-armor character's total AV meets or exceeds base damage + weapon damage for Weak hits throughout the campaign. Only Strong and Critical hits deal meaningful damage to heavily armored characters. This is a ⚠️ concern — it may make low-tier enemies feel irrelevant against tanks, and combats with many Weak hits could feel grindy.
7. **Re-rolls are powerful but appropriately scarce.** A single re-roll on failure adds 17–25 percentage points to success rates (most impactful when base success is ~45–55%). The combined re-roll budget (1 Disciplined Fighter/Archer per scene + 1–3 Resolve) provides 2–4 re-rolls per combat. This is well-calibrated — powerful enough to feel meaningful, scarce enough to require strategic spending.
8. **SL-shifting abilities are powerful but well-gated.** Only 3 talents shift SL upward (Assassination, Expert Rider, Shield Mastery for defense). All have narrow triggers, costs, or conditions that prevent abuse. These represent the system's most potent non-boon modifiers and should remain rare.
9. **Magic items are a core progression pillar, not optional.** The game world's design intent places magic items alongside talents as fundamental character advancement. Weapon damage (+1 to +5), AV bonuses (+1 to +5), and enchantments (flat damage ignoring AV) are essential for maintaining combat efficacy at mid-to-high tiers.
10. **XP progression pacing fulfills the "new ability every 1–2 sessions" goal.** At 1 XP/session, players earn a new talent point every 2 sessions. The per-skill caps naturally force horizontal investment. Level progression is appropriately slow (8 sessions L1→L2, ~72 sessions to L10), with early levels providing meaningful advancement without flying by.

### Design Principles Validated

| Principle | Status | Notes |
|-----------|--------|-------|
| Tight, predictable outcomes | ✅ Confirmed | Variance 4–15 vs d20's 33 |
| Meaningful skill investment | ✅ Confirmed | Each rank adds +1, each die step adds ~+1 average |
| Boons/banes as sole roll modifier | ✅ Confirmed | No flat bonuses on rolls; boons/banes handle all modification |
| Lethal combat with consequences | ✅ Confirmed | Low HP pools + bounded damage = fast, decisive fights |
| Bounded power ceiling | ✅ Confirmed | Max roll of 23 (d12+d6+R5), max defense 16 |
| Magic items as core pillar | ✅ Confirmed | Essential for damage throughput and defense at T5+ |
| Tanky frontliners rewarded | ✅ Confirmed | Shield + armor creates meaningful defensive advantage |
| AV vs damage balance | ⚠️ Monitor | Weak hits reduced to 1 vs heavy armor at all levels |
| Diminishing returns at mastery | ⚠️ Monitor | High-level mirror matches trend toward ~45–55% success |

---

## 2. Core Resolution Mechanics

### 2.1 The Dice Formula

The core resolution is:

> **Attribute Die + 1d6 + Skill Rank** vs **Target Number** (default TN 8)

- **Attribute Die**: d4 through d12+1 (starting spread at Level 1: d8/d6/d6/d4)
- **d6**: The fixed randomizer providing consistency
- **Skill Rank**: 0–5, representing trained expertise

**Level 1 Default**: A fresh adventurer begins with attributes d8/d6/d6/d4 and three skills at Rank 1. Their primary skill test is **d8 + d6 + 1**, averaging 9.0.

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
| d4 + d6 + R0 (dump stat) | 6.0 | 4.2% | 70.8% | 25.0% | 0.0% | 0.0% | 25.0% |
| d6 + d6 + R0 (secondary, untrained) | 7.0 | 2.8% | 55.6% | 33.3% | 8.3% | 0.0% | 41.7% |
| d6 + d6 + R1 (secondary, trained) | 8.0 | 0.0% | 41.7% | 41.7% | 16.7% | 0.0% | 58.3% |
| **d8 + d6 + R1 (L1 primary)** | **9.0** | **0.0%** | **31.2%** | **37.5%** | **25.0%** | **6.2%** | **68.8%** |
| d8 + d6 + R2 (L3 primary) | 10.0 | 0.0% | 20.8% | 35.4% | 31.2% | 12.5% | 79.2% |
| d8 + d6 + R3 | 11.0 | 0.0% | 12.5% | 31.2% | 35.4% | 20.8% | 87.5% |
| d10 + d6 + R2 | 11.0 | 0.0% | 16.7% | 28.3% | 30.0% | 25.0% | 83.3% |
| d10 + d6 + R3 (L5 primary) | 12.0 | 0.0% | 10.0% | 25.0% | 30.0% | 35.0% | 90.0% |
| d10 + d6 + R4 | 13.0 | 0.0% | 5.0% | 20.0% | 30.0% | 45.0% | 95.0% |
| d12 + d6 + R4 (L8 primary) | 14.0 | 0.0% | 4.2% | 16.7% | 25.0% | 54.2% | 95.8% |
| d12 + d6 + R5 (L10 primary) | 15.0 | 0.0% | 1.4% | 12.5% | 23.6% | 62.5% | 98.6% |

**Observations:**
- At **d8+R1** (Level 1 primary skill), Medium difficulty gives **68.8% success** — a solid starting point where competence is real but failure is meaningful
- At d6+R1 (Level 1 secondary skill), Medium gives 58.3% — noticeably harder, reflecting the weaker attribute
- At d8+R2 (Level 3), Medium gives ~79% — skilled and reliable
- At d12+R5 (Level 10), Medium is nearly automatic (98.6%) — mastery feels earned
- The progression from 68.8% → 79% → 90% → 98% across levels provides satisfying power growth

### 3.3 Character Profiles Across All Difficulties

**Level 1 — Primary Skill (d8, Rank 1)**

| TN | Blunder | Fail | Weak | Strong | Crit | Any Success |
|----|---------|------|------|--------|------|-------------|
| 4 (Trivial) | 0.0% | 2.1% | 18.8% | 35.4% | 43.7% | 97.9% |
| 6 (Easy) | 0.0% | 12.5% | 31.2% | 35.4% | 20.8% | 87.5% |
| 8 (Medium) | 0.0% | 31.2% | 37.5% | 25.0% | 6.2% | 68.8% |
| 10 (Hard) | 6.2% | 50.0% | 31.2% | 12.5% | 0.0% | 43.7% |
| 12 (V. Hard) | 20.8% | 58.3% | 18.7% | 2.1% | 0.0% | 20.8% |

**Level 1 — Secondary Skill (d6, Rank 1)**

| TN | Blunder | Fail | Weak | Strong | Crit | Any Success |
|----|---------|------|------|--------|------|-------------|
| 6 (Easy) | 0.0% | 16.7% | 41.7% | 33.3% | 8.3% | 83.3% |
| 8 (Medium) | 0.0% | 41.7% | 41.7% | 16.7% | 0.0% | 58.3% |
| 10 (Hard) | 8.3% | 63.9% | 25.0% | 2.8% | 0.0% | 27.8% |

**Level 1 — Dump Stat (d4, Rank 0)**

| TN | Blunder | Fail | Weak | Strong | Crit | Any Success |
|----|---------|------|------|--------|------|-------------|
| 6 (Easy) | 0.0% | 41.7% | 41.7% | 16.7% | 0.0% | 58.3% |
| 8 (Medium) | 4.2% | 70.8% | 25.0% | 0.0% | 0.0% | 25.0% |

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
| 1 | TN 8 | Medium | 68.8% success, 6.2% crit — a solid challenge for primary skills |
| 3 | TN 8–10 | Medium to Hard | 56–79% success, 2–12.5% crit — default TN still engaging |
| 5 | TN 10–12 | Hard to V. Hard | 55–75% success, 5–17% crit |
| 8 | TN 12 | Very Hard | 71% success, 21% crit |
| 10 | TN 12–14 | Very Hard to Extreme | 63–79% success, 14–29% crit |

**Assessment**: The difficulty ladder scales correctly with character level. Medium difficulty (TN 8) sits in the sweet spot at Level 1 (68.8% success for primary skills), meaning GMs can use it as the default from session one without needing to adjust. It naturally becomes routine by Level 5, exactly matching the narrative expectation that seasoned adventurers handle common tasks with ease.

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
2. **Sole modifier system**: The game uses **no flat numerical bonuses on rolls** — all roll modifications flow through boons and banes. This is an elegant design choice that avoids the "bonus stacking" problem endemic to d20 systems, where players hunt for +1s from every source. By channeling all advantages through a single mechanic, the system keeps mental math fast and makes situational modifiers immediately meaningful.
3. **Asymmetric probability shift**: The first boon/bane doesn't just shift the average — it compresses or expands the probability tail. A boon reduces the chance of rolling 1 on the d6 from 16.7% to 2.8%, while a bane increases it to 30.6%. This makes the first boon/bane feel disproportionately impactful for avoiding disaster or creating it.
4. **Graceful stacking**: Beyond the first boon/bane, each additional one adds a flat +1/−1. This is simple, predictable, and avoids diminishing-returns frustration.
5. **Net cancellation**: Boons and banes cancel 1:1 before resolution, keeping mental math fast at the table.
6. **Proportional impact**: A single boon/bane shifts success by ~10 percentage points — meaningful but not overwhelming. Two boons shift by ~16 more points. Three boons push to near-certainty (+19%). This gradient is well-calibrated.

**One Minor Observation:**
- At very high skill levels (d12+R5), a single boon on an already-dominant roll pushes success to 99%+, making boons feel less dramatic for total success. However, boons at this level primarily shift *which success tier* is achieved (Weak → Strong → Critical), which still matters for damage multipliers and spell effects.

---

## 5. Scaling & Progression Analysis

### 5.1 Average Roll Progression

| Level | Typical Config | Avg Roll | Delta |
|-------|----------------|----------|-------|
| 1 | d8 + R1 | 9.0 | — |
| 2 | d8 + R1 | 9.0 | +0.0 |
| 3 | d8 + R2 | 10.0 | +1.0 |
| 4 | d10 + R2 | 11.0 | +1.0 |
| 5 | d10 + R3 | 12.0 | +1.0 |
| 6 | d10 + R3 | 12.0 | +0.0 |
| 7 | d10 + R4 | 13.0 | +1.0 |
| 8 | d12 + R4 | 14.0 | +1.0 |
| 9 | d12 + R5 | 15.0 | +1.0 |
| 10 | d12 + R5 | 15.0 | +0.0 |

**Total progression**: +6.0 from Level 1 to Level 10 (approximately +0.67 per level).

**Assessment**: Progression is smooth and predictable. Each active level grants +1 from either a die step or skill rank. Levels 2, 6, and 10 are "plateau" levels where primary skill rolls don't improve — these naturally encourage horizontal investment. Level 2 is particularly notable: the attribute die increase (d8→d8 max) doesn't help the primary if it was already d8, so L1→L2 advancement comes from broadening to secondary skills.

### 5.2 Defense Scaling & Parry Formula Investigation

#### Current Parry Formula vs Alternatives

The current formula (Parry = 7 + Fighting) scales differently from Dodge (5 + ½ Agility) and Resist (5 + ½ Spirit/Mind) because it depends on a skill rank rather than an attribute. This creates asymmetric scaling:

| Level | Current Parry (7+Fight) | Dodge (5+½AGI) | Resist (5+½SPI) | Alt Parry (5+½STR) |
|-------|-------------------------|-----------------|------------------|---------------------|
| 1 | 8 | 8 | 9 | 9 |
| 3 (+1 def) | 10 | 10 | 10 | 10 |
| 5 (+2 def) | 12 | 11 | 12 | 12 |
| 7 (+3 def) | 14 | 12 | 13 | 13 |
| 9 (+4 def) | 16 | 14 | 15 | 15 |

**Current formula Parry gains +8 from L1→L9** (Fighting R1→R5 = +4, defense base = +4).
**Alternative (5+½STR) would gain +6 from L1→L9** (½STR d8→d12 = +2, defense base = +4).
**Dodge gains +6** (½AGI d6→d10 = +2, defense base = +4).

The current Parry formula makes melee defense the strongest defense type by 2 points at high levels. This rewards the investment of being a frontline melee fighter (who also must be in the dangerous melee zone). The alternative formula (5+½STR) would make Parry scale identically to Resist and Dodge, which would weaken melee specialists.

**Assessment**: The current formula is justified. Parry scaling faster rewards the risk of melee combat and the investment in Fighting (a single-purpose combat skill). The defense cap of 16 provides a hard ceiling that prevents runaway scaling.

#### Parry with Shields

Shields add **+1 Parry** (parry property on both Light and Heavy Shield), plus AV (Light: +1 AV, Heavy: +2 AV). This further increases the gap:

| Level | No Shield | With Shield (+1 Parry) | Dodge (secondary AGI) | Gap (Shield Parry − Dodge) |
|-------|-----------|------------------------|-----------------------|----------------------------|
| 1 | 8 | 9 | 8 | +1 |
| 3 | 10 | 11 | 10 | +1 |
| 5 | 12 | 13 | 11 | +2 |
| 7 | 14 | 15 | 12 | +3 |
| 9 | 16 | **16 (capped)** | 14 | +2 |
| 10 | 16 | **16 (capped)** | 14 | +2 |

**Key finding**: At Level 9+, an unshielded fighter's Parry already reaches the cap of 16. The shield's +1 Parry becomes **completely redundant** at this point — the shield's value at high levels is purely its AV contribution and the Shield Mastery talent options, not the Parry bonus.

**Enemy hit rates against shielded frontliner vs others** (using same-tier attacker stats):

| Level | vs No Shield (Parry) | vs Shield (Parry+1) | vs Dodge (secondary) |
|-------|----------------------|----------------------|----------------------|
| 1 | 68.8% | 56.2% | 68.8% |
| 3 | 56.2% | 43.7% | 56.2% |
| 5 | 55.0% | 45.0% | 65.0% |
| 7 | 45.0% | 35.0% | 65.0% |
| 9 | 45.8% | 37.5% | 62.5% |

**Analysis**: Shield users enjoy a 10–13pp reduction in enemy hit rates compared to unshielded Parry. The gap is most pronounced at Level 7 (35% vs 45%). Compared to Dodge-reliant characters, the difference is dramatic: at Level 7, a shielded frontliner is hit 35% of the time vs 65% for a Dodge-reliant character. This is a **30 percentage point gap**.

**Is this overpowered?** No, for several reasons:
1. **Opportunity cost**: Shield users sacrifice a two-handed weapon (+1 damage, weapon versatility) or dual-wielding (extra attacks)
2. **Heavy shields carry penalties**: heavy (d8) Strength requirement, rigid 2 (+2 banes on movement rolls and Arcana casting)
3. **Ranged vulnerability**: Shields don't boost Dodge against ranged attacks, and most enemies mix melee and ranged
4. **Shield Durability**: Shield Mastery R1 (SL reduction) requires a Durability check, degrading the shield over time
5. **Self-correcting at high levels**: The defense cap of 16 makes the shield's Parry bonus worthless at L9+

**Recommendation**: The current Parry formula (7 + Fighting) and shield bonuses are working as intended. The tanky frontline identity is a core archetype reward. No formula change needed.

#### Full Defense Progression Tables

**Martial Character (STR-focused Fighter with Shield)**

| Level | STR | AGI | Fight | Def Bonus | Parry | Parry+Shield | Dodge |
|-------|-----|-----|-------|-----------|-------|--------------|-------|
| 1 | d8 | d6 | R1 | +0 | 8 | 9 | 8 |
| 3 | d8 | d8 | R2 | +1 | 10 | 11 | 10 |
| 5 | d10 | d8 | R3 | +2 | 12 | 13 | 11 |
| 7 | d10 | d8 | R4 | +3 | 14 | 15 | 12 |
| 9 | d12 | d10 | R5 | +4 | 16 | 16 (cap) | 14 |

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
- Parry w/ Shield: +1 more, but capped at 16
- Dodge: 5 + ½ Agility (d6→d10 = +2) + defense base bonus (+4 at L9) = **+6 total**
- Resist: 5 + ½ Spirit (d8→d12 = +2) + defense base bonus (+4 at L9) = **+6 total**

**Offense scaling sources:**
- Attack roll: Attribute die average improvement (+2 from d8→d12 for a typical martial) + Skill Rank improvement (+4 from R1→R5) + d6 (unchanged) = **~+6 total**

**Critical observation**: Defense outpaces offense. Parry gains +8 while attack rolls gain ~+6. This creates a 2-point gap that widens over the campaign. This is intentional — it ensures combats don't become trivial and rewards the system's core progression pillars (magic items, talents, boons from tactics) for closing the gap.

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

### 5.5 Expected Damage Per Attack & AV Progression

#### Base Damage Output

| Matchup | Expected Damage |
|---------|-----------------|
| L1 (d8+R1, WD 3) vs T1 (Def 7, AV 1) | 6.44 |
| L1 (d8+R1, WD 3) vs T1 (Def 7, AV 2) | 5.65 |
| L3 (d8+R2, WD 4) vs T3 (Def 9, AV 3) | 4.94 |
| L5 (d10+R3, WD 5) vs T5 (Def 11, AV 5) | 5.50 |
| L5 (d10+R3, WD 6+1 magic) vs T5 (Def 11, AV 5) | 6.60 |
| L8 (d12+R4, WD 7+2 magic) vs T8 (Def 14, AV 8) | 5.33 |
| L10 (d12+R5, WD 8+3 magic) vs T10 (Def 16, AV 10) | 3.83 |

**Note**: Magic weapon damage bonuses (+1 to +5) are part of the game's **core progression**, not optional enhancement. Additionally, weapon enchantments (e.g., Flaming: +2/+4/+6 fire damage ignoring AV) provide essential damage bypassing AV at higher tiers. Expected damage with enchantments active is significantly higher than raw weapon calculations above.

#### ⚠️ AV Stacking Investigation

A dedicated tank build (heavy armor + shield + helmet) creates significant AV totals at every level:

| Level | Equipment | Total AV | Typical Enemy WD | Weak Hit Damage | Strong Hit Damage | Crit Hit Damage |
|-------|-----------|----------|-------------------|-----------------|-------------------|-----------------|
| 1 | Leather + Light Shield | 3 | 3 | 4 | 7 | 10 |
| 1 | Scale Mail + Light Shield | 5 | 3 | 2 | 5 | 8 |
| 3 | Breastplate + Light Shield + Helmet | 7 | 4 | **1 (min)** | 5 | 9 |
| 5 | Plate + Heavy Shield + Helmet | 9 | 5 | **1 (min)** | 6 | 11 |
| 5 | Q4 Breastplate + Q4 Heavy Shield + Helmet | 10 | 6 | **1 (min)** | 7 | 13 |
| 7 | Q5 Plate + Q5 Heavy Shield + Helmet | 13 | 8 | **1 (min)** | 8 | 15 |
| 9 | Q6 Plate + Q6 Heavy Shield + Helmet | 15 | 10 | **1 (min)** | 11 | 21 |

*Weak Hit Damage = base + 1×WD − AV (minimum 1). Base damage = ½ × attacking attribute.*

**Key finding**: Against heavily armored characters, **all Weak hits deal minimum 1 damage** from Level 3 onward. This is because AV meets or exceeds (base + weapon damage) for Weak success. Only Strong and Critical hits penetrate meaningfully.

**Is this a problem?** Partially:

**Arguments that it's working as intended:**
- Tank builds sacrifice offense (no two-handed weapon bonus, no dual-wielding) and mobility (heavy/rigid penalties) for this defense
- The system already has AV-bypassing mechanics: crush property (ignore half AV), pierce (re-roll misses), Precise Strike/Shot combat art (ignore ½ AV on Strong/Crit), and weapon enchantments (flat damage ignoring AV)
- Multiple Weak hits still accumulate 1 damage each, which matters in a low-HP system (adventurers have 18–42 HP)
- Creatures with high weapon damage or special abilities bypass AV limitations

**Arguments for concern:**
- Low-tier enemies (T1–T3) become essentially harmless against mid-level tanks — their Weak hits do 1 damage and they rarely score Strong hits
- Combats against many weak enemies could feel grindy (many 1-damage hits)
- The "minimum 1 damage" floor means armor never provides complete immunity, but it can make Weak hits feel meaningless

**Recommendation**: Monitor during playtesting. If tank characters trivialize low-tier encounters, consider:
- Ensuring creature design uses AV-bypassing abilities (crush weapons, special attacks that ignore AV)
- Using creature archetypes that challenge tanks through non-damage mechanics (conditions, grappling, flanking to force Dodge instead of Parry)
- The existing system tools (multiple attackers, conditions, environmental hazards) are likely sufficient mitigation

### 5.6 Progression Timeline & XP Analysis

#### Level Progression Pacing

| Level | Total XP | Delta | Sessions @1 XP | Sessions @1.3 XP | Cumulative (1.3) | Max XP/Skill |
|-------|----------|-------|-----------------|-------------------|-------------------|--------------|
| 1 | 0 | — | — | — | 0 | 2 (Rank 1) |
| 2 | 10 | 10 | 10 | ~8 | ~8 | 4 (Rank 1) |
| 3 | 16 | 6 | 6 | ~5 | ~13 | 6 (Rank 2) |
| 4 | 24 | 8 | 8 | ~6 | ~19 | 10 (Rank 2) |
| 5 | 32 | 8 | 8 | ~6 | ~25 | 12 (Rank 3) |
| 6 | 42 | 10 | 10 | ~8 | ~33 | 16 (Rank 3) |
| 7 | 52 | 10 | 10 | ~8 | ~41 | 18 (Rank 4) |
| 8 | 64 | 12 | 12 | ~9 | ~50 | 22 (Rank 4) |
| 9 | 76 | 12 | 12 | ~9 | ~59 | 24 (Rank 5) |
| 10 | 90 | 14 | 14 | ~11 | ~70 | 28 (Rank 5) |

#### Does XP Pacing Fulfill Design Goals?

**Goal 1: "New ability potential after every 1–2 sessions"**

1 Talent Point costs 2 XP. At 1 XP/session: new talent every **2 sessions**. At 1.3 XP (with milestones): every **~1.5 sessions**. ✅ This meets the design goal.

However, the **per-skill caps** at early levels (2 XP at L1, 4 XP at L2) mean players can't deepen their primary skill beyond Rank 1 until reaching Level 3 (which requires 16 total XP). This forces horizontal investment — after maxing one skill at 2 XP, remaining XP must go into other skills. This is good for breadth, but players may feel limited in deepening their primary combat identity during the first 8–13 sessions.

**Goal 2: "Early levels shouldn't just fly by"**

Level 1→2 takes **8–10 sessions** at standard XP rates. This is substantial — it means players spend approximately 2–3 months of weekly play at Level 1. This provides ample time for establishing character identity and world familiarity. ✅ Early levels are appropriately paced.

**Goal 3: "Later levels should take longer but not drag"**

- L7→L8: ~9 sessions
- L8→L9: ~9 sessions
- L9→L10: ~11 sessions

The late-game pacing is 10–50% slower than early-game transitions, creating an appropriate sense of progression without dragging. Each late-game level takes roughly 2–3 months of weekly play. ✅ Late-game pacing is reasonable.

**Goal 4: "Guide players toward horizontal progression"**

The per-skill XP caps are the primary tool:

| Level | Max XP/Skill | Total XP Available | Min Skills to Invest | Example Spread |
|-------|--------------|--------------------|-----------------------|----------------|
| 1 | 2 | 6 (creation) | 3 (from creation) | 2+2+2 across 3 skills |
| 2 | 4 | 10 | 3 | 4+4+2 across 3 skills |
| 3 | 6 | 16 | 3 | 6+6+4 across 3+ skills |
| 5 | 12 | 32 | 3 | 12+6+6+4+2+2 across 6 skills |
| 7 | 18 | 52 | 3 | 18+12+6+6+6+4 across 6 skills |
| 10 | 28 | 90 | 4 | 28+24+18+12+6+2 across 6 skills |

At Level 5, a vertically-focused player could max one skill at 12 XP, but still has 20 XP that must go elsewhere. A balanced player might spread 6+6+6+6+4+2+2 across 7 skills. Both approaches are viable, and both produce characters with multiple talents. ✅ Horizontal pressure works well.

#### XP Pacing Recommendations

The current progression is well-calibrated for the stated goals. Two minor observations:

1. **Level 1→2 gap (10 XP) feels slightly large** relative to L2→L3 (6 XP). The first level-up takes ~8 sessions while the second takes only ~5. Consider whether L2 should require 8 XP instead of 10 (making it ~6 sessions) — this would make the first level-up feel more achievable while maintaining the overall campaign length. However, the current 10 XP threshold does ensure players invest broadly before leveling, which aligns with the horizontal progression goal.

2. **Skill Rank XP costs are well-structured**: R0→R1 (2 XP) is cheap enough for quick breadth, R2→R3 (6 XP) and beyond require commitment. The Rank 2 XP cost (6 total = 4 XP from R1) is an important inflection point where casual dabbling transitions to meaningful investment.

#### Campaign Arc Pacing

- **Early game** (L1–3): ~13 sessions — characters establish identity, learn core abilities, acquire first talents
- **Mid game** (L4–6): ~20 sessions — characters develop mastery, acquire magic items, define archetype
- **Late game** (L7–10): ~37 sessions — characters refine, face legendary challenges, build toward mythic status

The slow late-game pacing is appropriate for a system where power growth is bounded and mastery is about breadth and versatility, not exponential power. The game world's theme — from "rugged low-level adventurers to renowned figures of myths and legends" — maps well to this arc.

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

## 7. Re-Roll Economy Analysis

### 7.1 Re-Roll Sources

| Source | Availability | Scope | Cost |
|--------|-------------|-------|------|
| **Resolve** | 1–3 per adventure (regained on downtime/rest) | Any test | Spend 1 Resolve |
| **Disciplined Fighter** (Fighting R1 talent) | Once per scene | Melee attack rolls | Free (talent slot) |
| **Disciplined Archer** (Archery R1 talent) | Once per scene | Ranged attack rolls | Free (talent slot) |
| **Master of Fundamentals** (Arcana R1 talent) | Once per scene | Arcane rank 0 spells | Free (talent slot) |
| **Various skill talents** (R1) | Once per scene each | Specific skill tests | Free (talent slot) |

Most re-roll talents are Rank 1, meaning they're available from character creation (one of the three starting R1 skills). A typical combat-focused Level 1 character has access to **1 Resolve + 1 Disciplined Fighter/Archer = 2 re-rolls per scene** for attack rolls.

### 7.2 Impact on Success Rates

A re-roll on failure converts P(fail) × P(success on retry) into additional success probability:

| Configuration | TN | Base Success | With 1 Re-roll | Delta |
|---------------|-----|-------------|----------------|-------|
| L1: d8 + R1 | 8 (Medium) | 68.8% | 90.2% | +21.5pp |
| L1: d8 + R1 | 10 (Hard) | 43.7% | 68.4% | +24.6pp |
| L3: d8 + R2 | 8 (Medium) | 79.2% | 95.7% | +16.5pp |
| L3: d8 + R2 | 10 (Hard) | 56.2% | 80.9% | +24.6pp |
| L5: d10 + R3 | 10 (Hard) | 75.0% | 93.7% | +18.8pp |
| L5: d10 + R3 | 12 (V. Hard) | 55.0% | 79.8% | +24.8pp |
| L8: d12 + R4 | 12 (V. Hard) | 70.8% | 91.5% | +20.7pp |
| L8: d12 + R4 | 14 (Extreme) | 54.2% | 79.0% | +24.8pp |
| L10: d12 + R5 | 14 (Extreme) | 62.5% | 85.9% | +23.4pp |
| L10: d12 + R5 | 16 (Legendary) | 45.8% | 70.7% | +24.8pp |

### 7.3 Assessment

**Key findings:**
1. **Maximum impact near 50% base success**: Re-rolls provide the largest absolute boost (~25pp) when base success is near 45–55%. This is mathematically optimal — it's where re-rolls convert the most failures into successes.
2. **Diminishing returns at high base success**: When success is already 70%+, a re-roll adds only 16–21pp (most "wasted" re-rolls occur on already-successful first attempts).
3. **Effective combat re-roll budget**: A Level 1 fighter with Disciplined Fighter and 1 Resolve has 2 re-rolls per scene for attacks. This means they can turn 2 critical misses into potential hits, or save Resolve for a clutch moment.

**Should there be more re-roll abilities?** No. The current quantity is well-calibrated:
- Re-rolls at ~25pp boost are among the most powerful abilities in the system
- Making them common would push attack success rates above 90% at most levels, undermining the threat of failure
- The "once per scene" frequency creates meaningful decision-making: do you re-roll a Weak miss hoping for a Strong hit, or save it for a complete miss later?
- Resolve's dual role (re-roll OR other uses like recovering from 0 HP) creates a genuine resource tension

**Recommendation**: Re-roll abilities should remain **rare and valuable**. The current pattern of 1 combat re-roll talent per combat skill (Fighting, Archery) plus Resolve is the right density. Adding more would devalue the existing ones and reduce combat tension.

---

## 8. Success Level Shifting Analysis

### 8.1 SL-Shifting Abilities Inventory

The system has no flat numerical bonuses on rolls. Instead, the most powerful non-boon modifiers are abilities that **shift Success Level by one step**:

| Ability | Skill/Rank | Direction | Trigger | Limitation |
|---------|-----------|-----------|---------|------------|
| **Assassination** | Stealth R1 | SL +1 (offense) | First hit on unaware enemy | Only first hit per scene; requires stealth setup |
| **Expert Rider** | Nature R2 | SL +1 (offense) | Hit during mounted Charge | Requires mount + Charge combat art |
| **Shield Mastery** | Fighting R1 | SL −1 (defense) | Enemy melee hit while wielding shield | Quick Action cost + shield Durability check |
| **Channel Superstition** | Lore R3 | Difficulty +1 step | Frightened creature's save roll | Requires target already frightened |

### 8.2 Impact Analysis

**Offensive SL+1** (Assassination, Expert Rider):

An SL+1 shift converts Weak→Strong and Strong→Critical. The damage implication is +1× weapon damage per shifted hit:

| Level | TN | % Weak (→Strong) | % Strong (→Crit) | Effective Extra Damage |
|-------|-----|-------------------|-------------------|-----------------------|
| L1 vs Def 8 | 8 | 37.5% | 25.0% | +1×WD on 62.5% of hits |
| L3 vs Def 10 | 10 | 35.4% | 18.7% | +1×WD on 54.1% of hits |
| L5 vs Def 11 | 11 | 30.0% | 25.0% | +1×WD on 55.0% of hits |
| L8 vs Def 14 | 14 | 25.0% | 20.8% | +1×WD on 45.8% of hits |

This is equivalent to adding approximately **0.5× weapon damage** to the expected damage of the triggering hit. For context, at Level 5 with WD 5, that's about +2.5 expected damage — comparable to an extra boon but expressed differently.

**Defensive SL−1** (Shield Mastery R1):

Converts enemy Weak→Fail, Strong→Weak, Crit→Strong. This:
- **Negates hits entirely** at a rate equal to the enemy's Weak hit percentage (25–37% of their hits become misses)
- **Reduces damage** on remaining hits by 1× weapon damage
- **Costs**: Quick Action (can't use other QA abilities that turn) + Durability check (degrades shield over time)

### 8.3 Is SL-Shifting Overpowered?

**No.** Each SL-shifting ability has strict gating:

1. **Assassination**: Requires the target to be unaware. Setting up stealth in combat is difficult and often consumes an entire turn. Only works on the first hit, not sustained damage.
2. **Expert Rider**: Requires a mount (expensive, vulnerable, not always available) and the Charge combat art (which has its own limitations).
3. **Shield Mastery**: Costs the Quick Action (competing with Evade, other defensive abilities), only works against melee attacks, and requires a Durability check that eventually destroys the shield.
4. **Channel Superstition**: Requires the target to already be frightened (another character must have applied this condition first). Only affects their save roll, not damage.

**Comparison to boons**: A boon provides approximately +10pp success and shifts the success distribution upward. An SL+1 shift doesn't affect whether you hit — it only upgrades the quality of hits you already land. This makes SL-shifting **complementary** to boons, not redundant. A character with a boon AND an SL shift is powerful, but the combination requires specific setup and resource expenditure.

**Recommendation**: SL-shifting abilities are well-balanced at current density (4 total across all skills). They should remain **rare** — no more than 1–2 per skill tree, always gated behind specific conditions. Any new SL-shifting ability should require a meaningful cost (action economy, resource expenditure, or narrow trigger).

---

## 9. Edge Cases & Risk Assessment

### 9.1 Low-Attribute Rolls (d4 Attribute)

Characters with d4 in an attribute (the dump stat in the default d8/d6/d6/d4 spread) rolling against TN 8 have only 25% success (with no skill) or 41.7% with Rank 1. This is appropriately punishing — a d4 represents a clear weakness. The 4.2% blunder rate (1 in 24 rolls) is low enough that blunders don't dominate their experience.

**Risk**: None. Working as intended.

### 9.2 Maximum Possible Rolls

- **Maximum roll**: d12 + 6 + 5 = 23 (with 3 boons: d12 + 8 + 5 = 25)
- **Maximum defense**: 16 (hard cap)
- **Margin**: Even the most extreme roll (25) against max defense (16) yields +9, which is a Critical Success

This confirms the 16 defense cap is appropriate — it's unreachable by most attacks and ensures even legendary characters must work for success against peak defenses.

### 9.3 Stacking Boons

With multiple boon sources (background, talents, positioning, spells), it's possible to accumulate 3+ boons. At d12+R5 with 3 boons, a Medium difficulty roll succeeds 99.9%+ of the time with 75%+ critical rate.

**Risk**: Low. This represents a fully optimized, high-level character using all their resources on their best skill. The system's resource constraints (boons from talents often cost actions, spell slots, or daily uses) naturally limit stacking. GMs should be aware that coordinated parties can stack boons on key rolls, but this is a feature (rewarding teamwork), not a bug.

### 9.4 Defense vs Offense Divergence at High Tiers

As noted in Section 5.3, the defense-offense gap reaches 2+ points at high levels, pushing mirror-match success below 50%. Since magic items are a core progression pillar, high-level adventurers are expected to have enchanted weapons with boon-granting abilities and AV-bypassing damage. The gap is real but is designed to be closed by the full suite of character advancement tools (items + talents + combat arts + tactical boons).

**Risk**: Low for campaigns following the intended "ancient world myths and legends" power trajectory. GMs should ensure magic item availability scales with character level.

### 9.5 Success Level Band Width

The 3-point width of Weak and Strong Success bands means a +3 modifier would reliably shift results by one full success tier. The system wisely avoids this risk entirely by using **no flat numerical bonuses on rolls** — all modification goes through boons/banes. The rare SL-shifting abilities (Section 8) operate on the output (Success Level) rather than the input (roll total), avoiding the stacking problem.

**Risk**: None, given the current "no flat bonuses" design discipline. This should be preserved.

### 9.6 Shield Parry Bonus Redundancy at High Levels

At Level 9+, unshielded Parry (7 + R5 + 4 defense base = 16) already hits the defense cap. The shield's +1 Parry is completely wasted. Shield value at this point comes entirely from its AV contribution and Shield Mastery talent.

**Risk**: Minimal. This is a natural ceiling that prevents shield users from becoming unkillable. Players who reach L9 with shields should be aware that the Parry benefit is maximized and the shield's value is its AV/talent synergy.

### 9.7 Flat d6 as Fixed Component

The d6 component is constant across all levels and all characters. This means:
- At low levels (d4+d6), the d6 contributes ~58% of the random variance
- At high levels (d12+d6), the d6 contributes only ~27% of the random variance

This is by design — the Attribute Die becomes dominant as characters grow, making their inherent ability more deterministic. Boons and banes (which modify the d6) have **proportionally less impact** at higher levels, but still meaningfully shift success tiers.

**Risk**: Minimal. This is a natural and appropriate feature — experienced characters are less affected by minor advantages and disadvantages, which matches narrative expectations.

---

## 10. Summary of Recommendations

### Priority 1 — Monitor During Playtesting

| Item | Concern | Recommendation |
|------|---------|----------------|
| AV stacking vs Weak hits | Tank builds reduce all Weak hits to minimum 1 damage from L3+ | Monitor if this makes combats grindy. Ensure creature designs use AV-bypassing abilities (crush weapons, special attacks). Low-tier enemies should challenge tanks through conditions, grappling, and flanking (forcing Dodge) rather than raw damage. |
| High-tier offense-defense gap | Success rates drop to ~46% at L10 vs same-tier | The system compensates through magic items and talents. Ensure item availability in published adventures scales appropriately. |
| Damage throughput at T8–T10 | Base weapon damage declines vs AV growth | Magic weapon bonuses (+1 to +5) and enchantments (flat damage ignoring AV) are the core solution. This is by design — character power grows through items. |

### Priority 2 — Validate During Content Design

| Item | Concern | Recommendation |
|------|---------|----------------|
| SL-shifting ability density | Currently 4 total; powerful but well-gated | Maintain current rarity. Any new SL-shifting ability should require narrow triggers, resource costs, or action economy trade-offs. Cap at ~1–2 per skill tree. |
| Re-roll ability density | ~20 "once per scene" re-roll talents across all skills | Current density is good for non-combat skills (breadth of re-rolls) and well-limited for combat (1 per combat skill). Avoid adding more combat attack re-rolls. |
| Creature defense variance | Fixed formula (6 + Tier) creates predictable outcomes | Creature archetypes (Bruiser, Skirmisher, etc.) should vary defense by ±2 to create diverse combat feel at all tiers. |

### Priority 3 — Document for GM Guidance

| Item | Concern | Recommendation |
|------|---------|----------------|
| Sweet spot reference | GMs need to know which TN to use at each level | Include a "recommended difficulty by level" sidebar in GM tools, referencing the sweet spot analysis from Section 3.4. TN 8 works from Level 1. |
| Progression plateau levels | Levels 2, 6, and 10 have no primary roll growth | Note in progression rules that these levels are ideal for broadening secondary skills or investing in new skill trees. |
| Magic item pacing guidance | Items are core to maintaining combat efficacy | Provide guidelines for magic item availability by level: Q4 items by L3–4, Q5 by L5–6, Q6 by L7–8, Q7+ by L9–10. |
| XP spending guidance | Players may not realize per-skill caps encourage breadth | Consider adding a sidebar in character progression explaining the horizontal investment incentive and showing example skill spreads. |

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
