# Dice Rolling Mechanics & Balance Analysis

> **Scope:** Core dice resolution system (Attribute Die + 1d6 + Skill Rank), success level probabilities, boon/bane mechanics, scaling across character progression, attack vs. defense balance, Parry formula, AV progression, re-roll economy, SL-shifting abilities, XP pacing, and campaign-long power trajectory.

---

## 1. Executive Summary

### Key Findings

1. **The distribution is trapezoidal, not a bell curve.** Adding a variable Attribute Die (d4–d12) to a fixed d6 produces a plateau-shaped distribution. High-attribute characters have a wide, reliable band of outcomes; low-attribute characters have a tighter, more uncertain range. This is a distinctive property that differentiates Nexus from both d20 (uniform) and 2d6 (strongly bell-curved) systems.

2. **Variance is well-bounded.** Standard deviation ranges from 2.04 (d4+d6) to 3.85 (d12+d6) — 2.2× to 8× tighter than a d20 (std ≈ 5.77). Skilled characters fail less randomly, and investment in attributes and skills reliably improves outcomes.

3. **Difficulty scales correctly with level.** Medium difficulty (TN 8) is the sweet spot at Level 1 (68.8% success with d8+R1), naturally becomes routine by Level 5, and scales upward to Very Hard (TN 12) at Level 8–10.

4. **Boons and banes are elegantly designed.** The first boon/bane shifts average roll by ~0.97 via advantage/disadvantage; each additional adds a flat ±1. All roll modification flows exclusively through boons/banes — no flat numerical bonuses exist. Each boon shifts total success by approximately 10 percentage points.

5. **Parry scaling rewards frontline investment without being overpowered.** Parry (7 + Fighting) gains +8 from L1→L9, outpacing Dodge (+6). With a shield, the gap is most pronounced at Level 7 (35% enemy hit rate vs. 65% for Dodge users) but self-corrects at Level 9+ when unshielded Parry already reaches the defense cap of 16. Opportunity costs (no two-handed weapons, rigid/heavy penalties, ranged vulnerability) keep this in check.

6. **AV progression is well-calibrated against tier-appropriate enemies.** Using Tier N creature stats against Level N players, Weak hits deal **2–3 damage** against maximum tank builds — well-reduced but not negligible in a low-HP system. Strong hits (7–14 damage) and Critical hits (12–25 damage) remain highly threatening throughout.

7. **Re-rolls are powerful but appropriately scarce.** A single re-roll on failure adds 17–25 percentage points to success — most impactful near 50% base success. The budget of ~2–4 re-rolls per combat (Resolve + Disciplined Fighter/Archer) is well-calibrated. More would push attack success above 90% and undermine combat tension.

8. **SL-shifting abilities are powerful but well-gated.** Three talents shift SL upward offensively (Assassination, Expert Rider) and one shifts it defensively (Shield Mastery). All have narrow triggers, action costs, or resource requirements. Each is equivalent to approximately +0.5× weapon damage per triggering hit. Current density is correct.

9. **Magic items are a core progression pillar.** Weapon damage (+1 to +5), AV bonuses (+1 to +5), and AV-ignoring enchantments are essential for maintaining combat efficacy at mid-to-high tiers. The system is designed around this — the world's theme of "rugged adventurers to mythic legends" is realized through item-driven progression alongside talents.

10. **XP pacing is well-calibrated.** Characters begin with 6 XP already spent (3 starting skills at Rank 1). Only 4 more XP are needed from play to reach Level 2 (~3 sessions at standard rate). First Rank 2 access arrives at Level 3 (~8 sessions from start). The 2 XP/session variant is recommended for biweekly and casual groups to produce a campaign of practical length.

### Design Principles Validated

| Principle | Status | Notes |
|-----------|--------|-------|
| Tight, predictable outcomes | ✅ Confirmed | Variance 4–15 vs. d20's 33 |
| Meaningful skill investment | ✅ Confirmed | Each rank adds +1; each die step adds ~+1 average |
| Boons/banes as sole roll modifier | ✅ Confirmed | No flat bonuses on rolls; all modification through boons/banes |
| Lethal combat with consequences | ✅ Confirmed | Low HP pools + bounded damage = fast, decisive fights |
| Bounded power ceiling | ✅ Confirmed | Max roll 23 (d12+d6+R5), max defense 16 |
| Magic items as core pillar | ✅ Confirmed | Essential for damage throughput and AV bypass at T5+ |
| Tanky frontliners rewarded | ✅ Confirmed | Shield + armor cuts Weak hits from ~6–18 to 2–3 vs. tier-matched foes |
| Diminishing returns at mastery | ⚠️ Monitor | High-level mirror matches trend toward ~45–55% success rate |

---

## 2. Core Resolution Mechanics

### 2.1 The Dice Formula

> **Attribute Die + 1d6 + Skill Rank** vs. **Target Number** (default TN 8)

- **Attribute Die**: d4 through d12+2 (Level 1 default spread: d8/d6/d6/d4)
- **1d6**: Fixed randomizer providing baseline consistency across all characters
- **Skill Rank**: 0–5, representing trained expertise

A fresh Level 1 adventurer allocates their starting attributes as d8/d6/d6/d4 and begins with three skills at Rank 1. Their primary skill test rolls **d8 + d6 + 1**, averaging 9.0.

### 2.2 Distribution Shape

Adding two dice of different sizes produces a **trapezoidal** distribution. The plateau widens as the Attribute Die grows:

**d4 + d6** — Nearly triangular. Sharp peak at 5–7 (16.7% each), tight range (2–10).

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

**d8 + d6** — Trapezoidal plateau at 7–9 (12.5% each). Wider range (2–14).

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

**d12 + d6** — Wide plateau at 7–13 (8.3% each). Nearly uniform across 7 values, with tapered tails (2–18).

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

High-level characters have a wide reliable band rather than a single peak, which differentiates Nexus from both d20 (fully uniform) and 2d6 (strongly peaked) systems.

### 2.3 Variance & Standard Deviation

| Configuration | Average | Std Dev | Variance | Range |
|---------------|---------|---------|----------|-------|
| d4 + d6 | 6.0 | 2.04 | 4.17 | 2–10 |
| d6 + d6 | 7.0 | 2.42 | 5.83 | 2–12 |
| d8 + d6 | 8.0 | 2.86 | 8.17 | 2–14 |
| d10 + d6 | 9.0 | 3.34 | 11.17 | 2–16 |
| d12 + d6 | 10.0 | 3.85 | 14.83 | 2–18 |
| **1d20 (comparison)** | **10.5** | **5.77** | **33.25** | **1–20** |

The system's variance is **2.2× to 8× tighter** than a d20. Even at d12, the standard deviation is 33% lower than a d20 roll. Extreme results (blunders and criticals) remain possible but are rarer — appropriate for a "mortal-scale, consequences matter" design.

---

## 3. Success Level Probability Analysis

### 3.1 Success Level Bands

| Difference to TN | Success Level | Band Width |
|-------------------|---------------|------------|
| −6 or lower | Blunder | Open-ended |
| −5 to −1 | Failure | 5 points |
| 0 to +2 | Weak Success | 3 points |
| +3 to +5 | Strong Success | 3 points |
| +6 or more | Critical Success | Open-ended |

The 3-point width of Weak and Strong Success covers approximately one standard deviation of the d6 component, creating natural tiers that respond meaningfully to small bonuses (+1 to +3).

### 3.2 Success Probabilities vs. TN 8 (Medium Difficulty)

| Configuration | Avg | Blunder | Fail | Weak | Strong | Crit | Any Success |
|---------------|-----|---------|------|------|--------|------|-------------|
| d4 + d6 + R0 (dump stat, untrained) | 6.0 | 4.2% | 70.8% | 25.0% | 0.0% | 0.0% | 25.0% |
| d6 + d6 + R0 (secondary, untrained) | 7.0 | 2.8% | 55.6% | 33.3% | 8.3% | 0.0% | 41.7% |
| d6 + d6 + R1 (secondary, trained) | 8.0 | 0.0% | 41.7% | 41.7% | 16.7% | 0.0% | 58.3% |
| **d8 + d6 + R1 (L1 primary)** | **9.0** | **0.0%** | **31.2%** | **37.5%** | **25.0%** | **6.2%** | **68.8%** |
| d8 + d6 + R2 (L3 primary) | 10.0 | 0.0% | 20.8% | 35.4% | 31.2% | 12.5% | 79.2% |
| d10 + d6 + R3 (L5 primary) | 12.0 | 0.0% | 10.0% | 25.0% | 30.0% | 35.0% | 90.0% |
| d12 + d6 + R4 (L8 primary) | 14.0 | 0.0% | 4.2% | 16.7% | 25.0% | 54.2% | 95.8% |
| d12 + d6 + R5 (L10 primary) | 15.0 | 0.0% | 1.4% | 12.5% | 23.6% | 62.5% | 98.6% |

The progression from 68.8% → 79% → 90% → 99% across levels provides satisfying, smooth power growth. At Level 10, Medium difficulty is nearly automatic — mastery feels earned.

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

The "sweet spot" for engaging rolls is approximately 55–85% total success with 5–35% critical chance and below 5% blunder risk.

| Level | Sweet Spot TN | Difficulty Label | Notes |
|-------|--------------|------------------|-------|
| 1 | TN 8 | Medium | 68.8% success, 6.2% crit |
| 3 | TN 8–10 | Medium to Hard | 56–79% success, 2–12.5% crit |
| 5 | TN 10–12 | Hard to V. Hard | 55–75% success, 5–17% crit |
| 8 | TN 12 | Very Hard | 71% success, 21% crit |
| 10 | TN 12–14 | Very Hard to Extreme | 63–79% success, 14–29% crit |

**Assessment**: The difficulty ladder scales correctly with character level. Medium difficulty (TN 8) is the right default from session one for primary skill tests. It naturally becomes routine by Level 5, matching the narrative expectation that seasoned adventurers handle common tasks with ease, while still challenging new characters.

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

### 4.2 Impact on Success Rates (d8 + d6 + Rank 2 vs. TN 8)

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

1. **Sole modifier system**: The game uses **no flat numerical bonuses on rolls** — all roll modifications flow exclusively through boons/banes. This eliminates the "bonus stacking" problem endemic to d20 systems and keeps mental math fast with every situational modifier immediately meaningful.

2. **Asymmetric tail compression**: The first boon/bane doesn't merely shift the average — it compresses or expands the probability tail. A boon reduces the chance of rolling 1 on the d6 from 16.7% to 2.8%; a bane raises it to 30.6%. The first boon/bane therefore feels disproportionately impactful for avoiding disasters or creating them.

3. **Graceful stacking**: Beyond the first boon/bane, each additional one adds a flat ±1 — simple, predictable, and free of diminishing-returns frustration.

4. **Well-calibrated impact**: A single boon/bane shifts total success by ~10 percentage points, which is meaningful but not overwhelming. Two boons add ~16 more points; three push to near-certainty (+19%). The gradient is well-sized for the system's power level.

5. **Net cancellation**: Boons and banes cancel 1:1 before resolution, keeping resolution fast.

**Observation**: At very high skill levels (d12+R5), a boon already pushes total success above 99%, so the marginal impact on *whether* you succeed diminishes. However, boons at this level shift *which success tier* is achieved (Weak → Strong → Critical), which still meaningfully affects damage multipliers and spell effects.

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

**Total progression**: +6.0 across Level 1–10 (~+0.67 per level).

**Assessment**: Progression is smooth and predictable. Each active level grants +1 from a die step or a skill rank increase. Levels 2, 6, and 10 are "plateau" levels — no primary roll improvement — which naturally encourage players to invest horizontally into secondary skills rather than forcing more out of their primary.

### 5.2 Defense Scaling & Parry Formula

#### Formulas and Scaling Comparison

| Level | Parry (7+Fight) | Dodge (5+½AGI) | Resist (5+½SPI) | Alt Parry (5+½STR) |
|-------|-----------------|-----------------|------------------|---------------------|
| 1 | 8 | 8 | 9 | 9 |
| 3 (+1 def) | 10 | 10 | 10 | 10 |
| 5 (+2 def) | 12 | 11 | 12 | 12 |
| 7 (+3 def) | 14 | 12 | 13 | 13 |
| 9 (+4 def) | 16 | 14 | 15 | 15 |

- **Parry** (7 + Fighting): gains **+8** from L1→L9 (Rank +4, defense base +4)
- **Dodge / Resist**: gain **+6** each (½ attribute d6→d10 = +2, defense base +4)
- An alternative formula (5 + ½ STR) would gain +6 — identical to Dodge/Resist

The current formula makes Parry the strongest defense by 2 points at high levels, rewarding the risk of frontline melee combat and investment in Fighting (a single-purpose combat skill). The alternative formula would equalize melee defense with all others, reducing the distinct identity of the frontline archetype.

**Assessment**: The current formula is justified. The defense cap of 16 provides a hard ceiling preventing runaway scaling.

#### Shield Interactions

Shields add **+1 Parry** (both Light and Heavy) plus AV (Light: +1 AV, Heavy: +2 AV).

| Level | No Shield | With Shield | Dodge (secondary AGI) | Gap (Shield − Dodge) |
|-------|-----------|-------------|----------------------|----------------------|
| 1 | 8 | 9 | 8 | +1 |
| 3 | 10 | 11 | 10 | +1 |
| 5 | 12 | 13 | 11 | +2 |
| 7 | 14 | 15 | 12 | +3 |
| 9 | 16 | **16 (cap)** | 14 | +2 |
| 10 | 16 | **16 (cap)** | 14 | +2 |

At Level 9+, unshielded Parry already reaches the cap. The shield's +1 Parry is redundant; its value at high levels comes entirely from AV and Shield Mastery talent interactions.

**Enemy hit rates against shielded frontliner vs. others** (same-tier attacker):

| Level | vs. No Shield | vs. Shield (+1 Parry) | vs. Dodge (secondary) |
|-------|---------------|-----------------------|-----------------------|
| 1 | 68.8% | 56.2% | 68.8% |
| 3 | 56.2% | 43.7% | 56.2% |
| 5 | 55.0% | 45.0% | 65.0% |
| 7 | 45.0% | 35.0% | 65.0% |
| 9 | 45.8% | 37.5% | 62.5% |

Shield users enjoy a 10–13pp reduction in enemy hit rates. The gap vs. Dodge-reliant characters reaches 30pp at Level 7 but is balanced by:
1. Sacrifice of two-handed weapons or dual-wielding
2. Heavy shield penalties (rigid 2: +2 banes on movement and Arcana casting)
3. No Dodge benefit against ranged attacks
4. Shield Mastery (SL reduction) requires a Durability check, degrading the shield over time

**Assessment**: Shield + armor is a well-rewarded frontline identity, not an overpowered combination. The design is intentional.

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

### 5.3 Attack vs. Defense Scaling

**Offense vs. defense over 10 levels:**

- Attack roll gains: +2 from d8→d12 (attribute die avg) + 4 from R1→R5 (skill rank) = **~+6 total**
- Parry gains: +4 from R1→R5 (Fighting rank) + 4 from defense base bonuses = **+8 total**
- Dodge/Resist gains: +2 from attribute + 4 from defense base = **+6 total**

Defense outpaces offense by 2 points for Parry. This is intentional — combat remains dangerous at all levels and rewards the system's core progression pillars (magic items, tactical boons, talents) for closing the gap.

**Mirror-match success rates** (same-level attacker vs. Parry defender):

| Level | Player Avg Roll | Parry | Success Rate | Crit Rate |
|-------|-----------------|-------|--------------|-----------|
| 1 | 9.0 (d8+R1) | 8 | 68.8% | 6.2% |
| 3 | 10.0 (d8+R2) | 10 | 56.2% | 2.1% |
| 5 | 12.0 (d10+R3) | 12 | 55.0% | 5.0% |
| 7 | 13.0 (d10+R4) | 14 | 45.0% | 5.0% |
| 8 | 14.0 (d12+R4) | 14 | 54.2% | 8.3% |
| 10 | 15.0 (d12+R5) | 16 | 45.8% | 4.2% |

Success rates oscillate between 45% and 69%, trending downward. The oscillation occurs because die-step upgrades (boosting both offense and defense) and skill rank upgrades (boosting offense more) alternate levels.

### 5.4 Player Attacks vs. Creature Defenses

Creature defense formula: 6 + Tier.

| Matchup | Player Avg | Creature Def | Success | Crit |
|---------|-----------|--------------|---------|------|
| L1 vs. T1 (d8+R1 vs. 7) | 9.0 | 7 | 79.2% | 12.5% |
| L3 vs. T3 (d8+R2 vs. 9) | 10.0 | 9 | 68.8% | 6.2% |
| L5 vs. T5 (d10+R3 vs. 11) | 12.0 | 11 | 65.0% | 10.0% |
| L7 vs. T7 (d10+R4 vs. 13) | 13.0 | 13 | 55.0% | 5.0% |
| L8 vs. T8 (d12+R4 vs. 14) | 14.0 | 14 | 54.2% | 8.3% |
| L10 vs. T10 (d12+R5 vs. 16) | 15.0 | 16 | 45.8% | 4.2% |

Hit rates decline from ~79% at L1 to ~46% at L10 (a 33pp shift). The system compensates through:
1. **Magic items** — +1 to +5 weapon/spell damage and situational boons
2. **Talents** — boons, re-rolls, and bonus damage on specific conditions
3. **Combat Arts** — additional attack options and modifiers
4. **Tactical boons** — flanking, positioning, and environmental advantages
5. **Multiple attacks** — dual-wielding and multi-attack talents
6. **Creature variety** — not all creatures maximize defense; archetypes like Bruisers trade defense for HP

GMs should be aware that high-tier combats rely more on tactical synergy than raw statistics, and should ensure magic item availability scales with character level.

### 5.5 Expected Damage Per Attack & AV Progression

#### Damage Output

Expected damage with core magic item progression:

| Matchup | Expected Damage |
|---------|-----------------|
| L1 (d8+R1, WD 3) vs. T1 (Def 7, AV 1) | 6.44 |
| L3 (d8+R2, WD 4) vs. T3 (Def 9, AV 3) | 4.94 |
| L5 (d10+R3, WD 6+1 magic) vs. T5 (Def 11, AV 5) | 6.60 |
| L8 (d12+R4, WD 7+2 magic) vs. T8 (Def 14, AV 8) | 5.33 |
| L10 (d12+R5, WD 8+3 magic) vs. T10 (Def 16, AV 10) | 3.83 |

Magic weapon damage bonuses (+1 to +5) are part of the game's **core progression**. Weapon enchantments (e.g., Flaming: +2/+4/+6 fire damage ignoring AV) provide essential damage bypassing at higher tiers. Expected damage with enchantments active is significantly higher than these base calculations.

#### AV Stacking vs. Tank Builds

The table below uses **Tier N creature stats against a Level N character** — the game's intended tier-matched challenge. Creature base damage = ½ × max attribute; weapon damage from the creature design table.

| Level | Equipment | Total AV | Creature Base | Creature WD | Weak Hit | Strong Hit | Crit Hit |
|-------|-----------|----------|---------------|-------------|----------|------------|----------|
| 1 | Leather + Light Shield | 3 | 3 (d6) | 3 (T1) | 3 | 6 | 9 |
| 1 | Scale Mail + Light Shield | 5 | 3 (d6) | 3 (T1) | **1 (min)** | 4 | 7 |
| 3 | Breastplate + Light Shield + Helmet | 7 | 4 (d8) | 5 (T3) | **2** | 7 | 12 |
| 5 | Plate + Heavy Shield + Helmet | 9 | 5 (d10) | 7 (T5) | **3** | 10 | 17 |
| 5 | Q4 Breastplate + Q4 Heavy Shield + Helmet | 10 | 5 (d10) | 7 (T5) | **2** | 9 | 16 |
| 7 | Q5 Plate + Q5 Heavy Shield + Helmet | 13 | 6 (d12) | 9 (T7) | **2** | 11 | 20 |
| 9 | Q6 Plate + Q6 Heavy Shield + Helmet | 15 | 7 (d12+1) | 11 (T9) | **3** | 14 | 25 |

*Formula: Damage = creature base + N×WD − tank AV (minimum 1), where N = 1 (Weak), 2 (Strong), 3 (Crit).*

**Assessment**: Against tier-appropriate creatures, Weak hits deal 2–3 damage against maximum tank builds. This is substantially reduced from the raw attack (6–18 across levels), but far from negligible — Weak hits still accumulate in a system where adventurers have 18–42 HP. Strong hits (7–14) and Critical hits (12–25) remain highly threatening throughout.

The AV system is well-calibrated: the tank's defensive investment is meaningfully rewarded without making Weak hits trivially harmless. The one edge case — Scale Mail + Light Shield at Level 1 — reduces Weak hits to the minimum of 1, but this requires an unusually expensive early build unlikely for most starting characters.

AV-bypassing mechanics (crush property, Precise Strike combat art, weapon enchantments) and creature design tools (conditions, grappling, flanking to force Dodge) provide natural counterplay against heavy armor throughout the campaign.

### 5.6 XP Progression & Campaign Pacing

#### Starting Position

Characters begin play with **6 XP already spent** from character creation (3 starting skills × 2 XP each = Rank 1 in each). The Level 1 threshold is 0 total XP; reaching Level 2 (10 total XP) requires only **4 more XP from sessions**.

| Level | Total XP | XP Earned in Play | Sessions @1 XP | Sessions @1.3 XP | Sessions @2 XP | Max XP/Skill |
|-------|----------|-------------------|----------------|-------------------|----------------|--------------|
| 1 | 0 | 0 | — | — | — | 2 (Rank 1) |
| 2 | 10 | 4 | 4 | ~3 | 2 | 4 (Rank 1) |
| 3 | 16 | 10 | 10 | ~8 | 5 | 6 (Rank 2) |
| 4 | 24 | 18 | 18 | ~14 | 9 | 10 (Rank 2) |
| 5 | 32 | 26 | 26 | ~20 | 13 | 12 (Rank 3) |
| 6 | 42 | 36 | 36 | ~28 | 18 | 16 (Rank 3) |
| 7 | 52 | 46 | 46 | ~35 | 23 | 18 (Rank 4) |
| 8 | 64 | 58 | 58 | ~45 | 29 | 22 (Rank 4) |
| 9 | 76 | 70 | 70 | ~54 | 35 | 24 (Rank 5) |
| 10 | 90 | 84 | 84 | ~65 | 42 | 28 (Rank 5) |

*"XP Earned in Play" counts only XP earned in sessions. "Sessions @1.3 XP" reflects the average of 1 standard + occasional milestone sessions.*

#### Design Goal Assessment

**Goal: New ability potential every 1–2 sessions**

1 Talent Point costs 2 XP. At 1 XP/session, a new talent every 2 sessions. At 1.3 XP average (with milestones), every ~1.5 sessions. ✅

**Goal: Early levels shouldn't fly by**

Level 1→2 requires 4 XP from play (~3 sessions at 1.3 avg). Players spend 2–4 sessions at Level 1 establishing their character before their first level-up. The more meaningful early milestone is first Rank 2 access, which comes at Level 3 (~8 sessions from start). ✅

**Goal: Later levels take longer but don't drag**

Late-game level transitions:
- L7→L8: ~9 sessions at 1.3 avg XP
- L8→L9: ~9 sessions
- L9→L10: ~11 sessions

Late-game pacing is 50–80% slower per level than early-game transitions. ✅

**Goal: Guide players toward horizontal progression**

Per-skill XP caps are the primary mechanism:

| Level | Max XP/Skill | Total XP | Example Spread |
|-------|--------------|----------|----------------|
| 1 | 2 | 6 (creation) | 2+2+2 across 3 skills |
| 2 | 4 | 10 | 4+4+2 across 3+ skills |
| 3 | 6 | 16 | 6+6+4 across 3+ skills |
| 5 | 12 | 32 | 12+6+6+4+2+2 across 6 skills |
| 10 | 28 | 90 | 28+24+18+12+6+2 across 6 skills |

At every level, the gap between the per-skill cap and the total XP available forces investment across multiple skills. ✅

#### Primary Skill Deepening

Characters begin with their primary skill already at Rank 1 (2 XP from creation). The path to Rank 2:
- Level 1 cap (2 XP): already at cap; no further investment possible
- Level 2 cap (4 XP): +2 more invested → total 4 XP, still Rank 1
- **Level 3 cap (6 XP): +2 more invested → total 6 XP = Rank 2 unlocked**

| XP Rate | Sessions to L2 | Sessions to L3 (Rank 2 unlocked) |
|---------|----------------|-----------------------------------|
| 1 XP/session | ~4 sessions | ~10 sessions |
| 1.3 XP avg | ~3 sessions | ~8 sessions |
| 2 XP/session | ~2 sessions | ~5 sessions |

At standard rates, Rank 2 arrives within 2 months of weekly play — a reasonable balance between breadth and vertical investment. If earlier Rank 2 access is desired, raising the Level 2 cap from 4 to 6 XP would unlock it at L2 (~3 sessions), with the trade-off of reduced horizontal pressure at that level.

#### XP Rate by Play Frequency

| Metric | 1 XP/session | 2 XP/session |
|--------|--------------|--------------|
| New talent frequency | Every ~1.5 sessions | Every session |
| L1→L10 total sessions | ~65 | ~38 |
| Weekly play: full campaign | ~15 months | ~9 months |
| Biweekly play: full campaign | ~30 months | ~18 months |
| Monthly play: full campaign | ~65 months | ~38 months |

**Recommendation**: Document both rates as options:
- **1 XP/session** for weekly groups seeking a long-form campaign (~15 months)
- **2 XP/session** for biweekly or casual groups, or groups that prefer faster advancement (~18 months biweekly)

For monthly groups, even the 2 XP rate produces a multi-year campaign; starting at higher levels or running a compressed L1–6 arc is recommended. The per-skill caps regulate power growth equally under both rates.

#### Campaign Arc

- **Early game** (L1–3): ~8 sessions — establish character identity, first Rank 2 abilities
- **Mid game** (L4–6): ~20 sessions — deepen mastery, acquire magic items, define archetype
- **Late game** (L7–10): ~37 sessions — refine, face legendary challenges, approach mythic status

*(Assumes 1.3 XP/session. For 2 XP/session, scale by ~0.65.)*

---

## 6. Trained vs. Untrained

| Configuration | Average | vs. TN 8 Success |
|---------------|---------|------------------|
| Untrained Expert skill (d8 + 1 bane + R0) | 7.0 | 44.1% |
| Trained Rank 1 (d8 + d6 + R1) | 9.0 | 68.8% |
| Trained Rank 2 (d8 + d6 + R2) | 10.0 | 79.2% |

**Assessment**: The untrained penalty (+1 bane, no skill rank) creates a 24.7pp gap vs. Rank 1 at Medium difficulty — substantial enough that training matters while not making untrained attempts impossible. The hard barrier for magic skills (Arcana, Mysticism cannot be attempted untrained) appropriately enforces distinct arcane/mystic class identities. General skills (no untrained penalty) ensure all characters can participate in common challenges.

---

## 7. Re-Roll Economy

### 7.1 Re-Roll Sources

| Source | Availability | Scope | Cost |
|--------|-------------|-------|------|
| **Resolve** | 1–3 per adventure | Any test | Spend 1 Resolve |
| **Disciplined Fighter** (Fighting R1) | Once per scene | Melee attack rolls | Talent slot |
| **Disciplined Archer** (Archery R1) | Once per scene | Ranged attack rolls | Talent slot |
| **Master of Fundamentals** (Arcana R1) | Once per scene | Arcane rank 0 spells | Talent slot |
| **Various skill talents** (R1) | Once per scene each | Specific skill tests | Talent slot |

Most re-roll talents are Rank 1 and available from character creation. A typical combat-focused Level 1 character has **2 re-rolls per scene** for attack rolls (1 Disciplined Fighter/Archer + 1 Resolve).

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

Re-rolls are most impactful near 50% base success (~25pp boost) and diminish at high base success rates (70%+: only 16–21pp). This is mathematically optimal — re-rolls convert the most failures into successes where failure is most likely.

**Current density is well-calibrated.** Re-rolls at ~25pp boost are among the most powerful abilities in the system. Adding more would push attack success above 90% at most levels, undermining combat tension. The "once per scene" frequency creates meaningful decision-making between re-rolling a Weak miss and saving the ability for a complete miss. Resolve's dual role (re-roll or recover from 0 HP) creates genuine resource tension.

**Recommendation**: Re-roll abilities should remain **rare and valuable** — the current density of one combat re-roll talent per combat skill (Fighting, Archery) plus Resolve is the right calibration. Adding more combat attack re-rolls would devalue the existing ones.

---

## 8. Success Level Shifting

### 8.1 SL-Shifting Abilities Inventory

The most powerful non-boon modifiers in the system shift Success Level by one step rather than adding numerical bonuses to the roll:

| Ability | Skill/Rank | Direction | Trigger | Limitation |
|---------|-----------|-----------|---------|------------|
| **Assassination** | Stealth R1 | SL +1 (offense) | First hit on unaware enemy | First hit per scene; requires stealth setup |
| **Expert Rider** | Nature R2 | SL +1 (offense) | Hit during mounted Charge | Requires mount + Charge combat art |
| **Shield Mastery** | Fighting R1 | SL −1 (defense) | Enemy melee hit while wielding shield | Quick Action cost + shield Durability check |
| **Channel Superstition** | Lore R3 | Difficulty +1 step | Frightened creature's save roll | Target must already be frightened |

### 8.2 Impact Analysis

**Offensive SL+1** — converts Weak→Strong and Strong→Critical:

| Level | TN | % Weak (→Strong) | % Strong (→Crit) | Effective Extra Damage |
|-------|-----|-------------------|-------------------|-----------------------|
| L1 vs. Def 8 | 8 | 37.5% | 25.0% | +1×WD on 62.5% of hits |
| L3 vs. Def 10 | 10 | 35.4% | 18.7% | +1×WD on 54.1% of hits |
| L5 vs. Def 11 | 11 | 30.0% | 25.0% | +1×WD on 55.0% of hits |
| L8 vs. Def 14 | 14 | 25.0% | 20.8% | +1×WD on 45.8% of hits |

This adds approximately **0.5× weapon damage** to the expected value of the triggering hit — comparable to a boon in impact but expressed through quality of success rather than hit probability.

**Defensive SL−1** (Shield Mastery) — converts enemy Weak→Fail, Strong→Weak, Crit→Strong:
- Negates 25–37% of hits entirely (those that would have been Weak)
- Reduces damage on remaining hits by 1× weapon damage
- Costs the Quick Action and a Durability check on the shield

### 8.3 Assessment

**SL-shifting is not overpowered.** Each ability is gated behind specific conditions:

- **Assassination**: Requires the target to be unaware. Setting up stealth in combat typically costs a full turn and only benefits the first hit.
- **Expert Rider**: Requires maintaining a mount (expensive, vulnerable) and using the Charge combat art.
- **Shield Mastery**: Competes with other Quick Action abilities and degraded the shield over time via Durability checks.
- **Channel Superstition**: The target must already be frightened, requiring prior setup by another character.

SL-shifting is complementary to boons, not redundant — boons increase the chance of hitting, while SL+1 upgrades the quality of hits already landed. A character combining both is powerful but requires specific setup and resource investment.

**Recommendation**: Maintain current rarity (~4 total across all skills). Any new SL-shifting ability should require a meaningful cost (action economy, resource expenditure, or narrow trigger). Cap at ~1–2 per skill tree.

---

## 9. Edge Cases & Risk Assessment

### 9.1 Low-Attribute Rolls (d4 Attribute)

Characters with a d4 attribute (the dump stat in the default d8/d6/d6/d4 spread) have only 25% success vs. TN 8 without a skill rank, or 41.7% with Rank 1. This is appropriately punishing and the 4.2% blunder rate is low enough that it doesn't dominate their experience.

**Risk**: None. Working as intended.

### 9.2 Maximum Possible Rolls

- **Maximum roll**: d12 + 6 + R5 = 23; with 3 boons: d12 + 8 + R5 = 25
- **Maximum defense**: 16 (hard cap)
- **Maximum margin**: +9 above cap defense, confirming the ceiling is appropriate

Even fully optimized, a character produces Critical Success against max defense. The cap ensures peak defenses aren't unassailable.

**Risk**: None. The 16 cap is correctly placed.

### 9.3 Stacking Boons

With multiple sources (backgrounds, talents, positioning, spells), accumulating 3+ boons is possible. At d12+R5 with 3 boons vs. Medium difficulty, success is ~99.9% with a ~75% critical rate.

**Risk**: Low. This requires a fully optimized high-level character using all available resources on their best skill. Resource costs (boons from talents often cost actions or daily uses) naturally limit sustained stacking. Rewarding coordinated boon stacking is a feature, not a bug.

### 9.4 Defense vs. Offense Divergence at High Tiers

The 2-point gap between Parry and attack roll progression drops mirror-match success to ~45% at Level 10. Magic items (core progression), talents, and tactical boons are the intended mechanism for closing this gap.

**Risk**: Low for campaigns following the intended power trajectory. GMs should ensure magic item availability scales with character level and that published adventures provide tier-appropriate equipment.

### 9.5 Success Level Band Width

The 3-point width of Weak and Strong bands means a flat +3 modifier would reliably shift results by one full tier. The system avoids this by using no flat numerical bonuses on rolls whatsoever. SL-shifting abilities operate on the *output* (Success Level), not the *input* (roll total), bypassing the stacking problem entirely.

**Risk**: None, given the current design discipline. The "no flat roll bonuses" principle must be preserved.

### 9.6 Shield Parry Redundancy at Level 9+

Unshielded Parry (7 + R5 + 4 defense base = 16) already hits the cap at Level 9. The shield's +1 Parry is wasted at this point. Shield value comes entirely from AV and Shield Mastery talent interactions.

**Risk**: Minimal. This is a natural ceiling that prevents shield users from becoming unkillable. Players should be informed that the shield's Parry benefit maxes out at L9.

### 9.7 Fixed d6 Proportionality

The d6 component contributes ~58% of random variance at low levels (d4+d6) and ~27% at high levels (d12+d6). Boons and banes (which modify the d6) therefore have proportionally less impact on variance at higher levels, while still meaningfully shifting success tier distribution.

**Risk**: Minimal. This is an intended feature — experienced characters become less swayed by minor situational advantages, matching narrative expectations of mastery.

---

## 10. Summary of Recommendations

### Priority 1 — Monitor During Playtesting

| Item | Concern | Recommendation |
|------|---------|----------------|
| Off-tier encounters vs. tanks | Heavy armor significantly outclasses enemies more than 2 tiers below character level | Ensure encounters feature tier-appropriate challenges; lower-tier enemies should threaten through conditions, numbers, and grappling rather than raw damage |
| High-tier offense gap | Same-tier hit rates decline to ~46% at L10 | Ensure magic item availability in published adventures scales with character level and that players can access boon-granting tools |
| Damage throughput at T8–T10 | Base weapon damage flattens vs. AV growth | Magic weapon bonuses and AV-ignoring enchantments are the designed solution; confirm expected item pacing is documented and accessible to GMs |

### Priority 2 — Validate During Content Design

| Item | Concern | Recommendation |
|------|---------|----------------|
| SL-shifting ability density | Currently 4 total; powerful but well-gated | Maintain rarity; any new SL-shifting ability needs narrow triggers, resource costs, or action economy trade-offs. Cap at ~1–2 per skill tree. |
| Re-roll ability density | ~20 "once per scene" re-roll talents across all skills | Current density is good for non-combat skills; avoid adding more combat attack re-rolls specifically |
| Creature defense variety | Fixed formula (6 + Tier) creates predictable outcomes | Creature archetypes should vary defense by ±2 to create diverse combat encounters across all tiers |

### Priority 3 — Document for GM Guidance

| Item | Recommendation |
|------|----------------|
| Recommended difficulty by level | TN 8 is the default for primary skills at Level 1; include a sidebar showing sweet spot TNs per level (Section 3.4) |
| Progression plateau levels | Levels 2, 6, and 10 have no primary roll growth — good times to invest in secondary skills |
| Magic item pacing | Q4 items by L3–4, Q5 by L5–6, Q6 by L7–8, Q7+ by L9–10 |
| XP rate by play frequency | 1 XP/session for weekly long-form campaigns (~15 months); 2 XP/session for biweekly or casual groups (~18 months biweekly) |
| Horizontal progression guidance | Sidebar explaining per-skill caps as breadth incentive with example spreads at each level |

---

## Appendix A: Methodology

All probability calculations used exact combinatorial enumeration (not Monte Carlo simulation):

1. All outcomes were enumerated for each die combination (e.g., d8+d6 = 48 equally likely outcomes)
2. Each outcome was classified into success level bands relative to the specified TN
3. Probabilities calculated as (favorable outcomes) ÷ (total outcomes)

Boon/bane calculations used all 36 outcomes of 2d6 with max/min selection, plus flat modifiers for additional boons/banes beyond the first.

Expected damage calculations used:
- **Base damage** = ½ × Attribute (from the attribute modifier table)
- **On Weak**: base + 1× weapon damage − AV (minimum 1)
- **On Strong**: base + 2× weapon damage − AV (minimum 1)
- **On Critical**: base + 3× weapon damage − AV (minimum 1)
- **On Fail/Blunder**: 0 damage
- **Expected** = Σ (damage × probability) across all outcomes

---

## Appendix B: Key Statistical Reference

### Average Rolls by Configuration

| Attr Die | +R0 | +R1 | +R2 | +R3 | +R4 | +R5 |
|----------|-----|-----|-----|-----|-----|-----|
| d4 | 6.0 | 7.0 | 8.0 | 9.0 | 10.0 | 11.0 |
| d6 | 7.0 | 8.0 | 9.0 | 10.0 | 11.0 | 12.0 |
| d8 | 8.0 | 9.0 | 10.0 | 11.0 | 12.0 | 13.0 |
| d10 | 9.0 | 10.0 | 11.0 | 12.0 | 13.0 | 14.0 |
| d12 | 10.0 | 11.0 | 12.0 | 13.0 | 14.0 | 15.0 |

### Total Success Rate vs. TN (d8 + d6 + Rank 2 — Typical Mid-Level)

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
