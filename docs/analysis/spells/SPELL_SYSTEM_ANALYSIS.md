# Spell System — Design Analysis

> **Scope:** Comprehensive analysis of the Nexus RPG spell system covering coverage, balance, damage scaling, rank placement, single-target vs multi-target throughput, and expansion recommendations across 6 arcane disciplines and 8 mystic traditions.

---

## 1. Executive Summary

### Key Findings

1. **Low-to-mid tier coverage is strong; high-tier coverage is sparse.** Ranks 0–2 contain 219 of 279 total spells (~78%), providing robust foundations. Ranks 3–4 have 52 spells with limited variety, and Rank 5 has zero spells — all 14 schools lack legendary capstones.
2. **The AoE damage penalty becomes proportionally weaker at higher ranks.** The "one rank lower" guideline is generally well-applied (95%+ of spells follow it), but because it applies a fixed absolute reduction (−2 per success level), the proportional penalty shrinks from −50% at Rank 1 to just −17% at Rank 5. When Spell Power is added, AoE total throughput can exceed single-target throughput by 2–5× depending on target count.
3. **Missile spells combined with per-hit modifiers create multiplicative scaling.** Arcane Barrage (3–5 missiles) combined with Arcane Empowerment (+Arcana per missile) can reach 75+ damage at Rank 3, exceeding the Rank 5 damage ceiling of 36–42.
4. **War and Peace traditions are undersized.** War has 11 spells (no Rank 3+) and Peace has 13 spells. Both lack core thematic aspects — War needs higher-rank battle magic; Peace is missing travel and law enforcement spells entirely.
5. **~30 classic fantasy spells are absent.** Expected utility staples (Knock, Identify, Water Breathing, Comprehend Languages) and combat classics (Sleep, Web, Grease, Banishment) have no equivalents.
6. **18 spells remain incomplete** (lacking full mechanical descriptions), with 64% of Rank 4 spells affected.
7. **Thematic identity is well-executed.** The Arcane (transgressive/selfish) vs Mystic (reverent/communal) distinction is clear and consistently applied across all schools. Necromancy, Nature, and Tempest are exemplary in depth and coherence.

### Design Principles

1. **Bounded power ceiling** — Rank 5 equals D&D Level 7 (Delayed Blast Fireball, Plane Shift), not Level 9 (Wish, Meteor Swarm). All effects must be temporary, escapable, and mortal-scale.
2. **AoE must trade damage for targets** — Multi-target spells should deal meaningfully less per-target than single-target equivalents at the same rank. The current "one rank lower" guideline needs stricter enforcement.
3. **Spell Power adds depth, not dominance** — The ½ Attribute base damage ensures casters always contribute, but total throughput with modifiers must not exceed bounded ceilings.
4. **Focus is the primary resource constraint** — Higher-rank spells cost more Focus (2/4/6/8/10 by rank), gating power behind resource management rather than unlimited scaling.
5. **Traditions/disciplines should cover their Excel and Decent roles** — Each school should have spells across its primary and secondary roles, with Weak roles deliberately limited.

---

## 2. Spell Coverage by Discipline & Tradition

### 2.1 Arcane Disciplines (117 spells)

| Discipline | R0 | R1 | R2 | R3 | R4 | R5 | Total | Completeness | Strengths | Gaps |
|---|---|---|---|---|---|---|---|---|---|---|
| **Conjuration** | 3 | 6 | 6 | 5 | 4 | 0 | **24** | 83% | Versatile summons, missiles, teleport | 3 R4 incomplete, no R5 |
| **Evocation** | 3 | 9 | 5 | 1 | 0 | 0 | **18** | 100% | Strong elemental coverage, AoE | No R3+ variety |
| **Illusion** | 3 | 5 | 7 | 3 | 0 | 0 | **18** | 95% | Stealth, deception, utility | Seeming incomplete, no R4–5 |
| **Necromancy** | 5 | 8 | 7 | 6 | 2 | 0 | **28** | 97% | Best-in-class depth and theme | Finger of Death incomplete |
| **Telepathy** | 3 | 6 | 4 | 1 | 1 | 0 | **15** | 80% | Mind control, charm | 2 incomplete, memory/communication absent |
| **Telekinetics** | 3 | 5 | 4 | 1 | 1 | 0 | **14** | 71% | Force manipulation | 3 R2–4 incomplete |
| **Arcane Total** | **20** | **39** | **33** | **17** | **8** | **0** | **117** | — | — | — |

### 2.2 Mystic Traditions (162 spells)

| Tradition | R0 | R1 | R2 | R3 | R4 | R5 | Total | Completeness | Strengths | Gaps |
|---|---|---|---|---|---|---|---|---|---|---|
| **Death** | 5 | 6 | 2 | 2 | 0 | 0 | **15** | 100% | Curses, decay, fear | No disease mechanics, limited R3+ |
| **Life** | 3 | 5 | 5 | 2 | 0 | 0 | **15** | 100% | Comprehensive healing | No resurrection, limited R3+ |
| **Light** | 4 | 8 | 3 | 3 | 0 | 0 | **18** | 94% | Anti-undead, revelation | Sense Spirits incomplete, no R4–5 |
| **Nature** | 6 | 8 | 11 | 8 | 2 | 0 | **35** | 93% | Comprehensive variety | 2 R4 incomplete |
| **Peace** | 3 | 4 | 3 | 3 | 0 | 0 | **13** | 100% | Defense, protection | Travel/law magic absent, no R4–5 |
| **Tempest** | 3 | 9 | 9 | 7 | 5 | 0 | **33** | 91% | Largest tradition, excellent coverage | 3 R4 incomplete |
| **Twilight** | 5 | 7 | 7 | 2 | 1 | 0 | **22** | 95% | Stealth, shadow, fear | Silent Night incomplete |
| **War** | 3 | 5 | 3 | 0 | 0 | 0 | **11** | 100% | Combat buffs | Only R0–2, no R3+ |
| **Mystic Total** | **32** | **52** | **43** | **27** | **8** | **0** | **162** | — | — | — |

### 2.3 System-Wide Distribution

| Rank | Arcane | Mystic | Total | Status |
|---|---|---|---|---|
| 0 | 20 | 32 | **52** | ✅ Excellent — strong cantrip foundations |
| 1 | 39 | 52 | **91** | ✅ Excellent — broad basic options |
| 2 | 33 | 43 | **76** | ✅ Strong — Fireball-tier diversity |
| 3 | 17 | 27 | **44** | ⚠️ Adequate — limited variety in some schools |
| 4 | 8 | 8 | **16** | ❌ Sparse — 64% incomplete |
| 5 | 0 | 0 | **0** | ❌ Missing — all schools lack capstones |
| **Total** | **117** | **162** | **279** | — |

**Key Observations**:
- **Excellent coverage**: Necromancy (28), Nature (35), Tempest (33) are the best-developed schools.
- **Undersized**: War (11), Peace (13), Telekinetics (14), Telepathy (15), Life (15), Death (15).
- **Rank 4 bottleneck**: Only 16 spells exist, with 9 incomplete (56%). This is the critical gap in the progression path.
- **Rank 5 absent**: Zero legendary spells exist across all 14 schools.

---

## 3. Classic Fantasy Spell Comparison

### 3.1 Present Core Classics ✅

| Classic Spell | Nexus Equivalent | School | Rank | Notes |
|---|---|---|---|---|
| Fireball | Fireball | Evocation | 2 | Standard AoE fire |
| Magic Missile | Arcane Missiles | Conjuration | 1 | Auto-hit projectiles |
| Invisibility | Invisibility | Illusion | 2 | Self, concentration |
| Cure Wounds | Healing Touch | Life | 1 | Standard healing |
| Lightning Bolt | Lightning Strike | Evocation | 2 | Line AoE |
| Charm Person | Charm | Telepathy | 1 | Single-target charm |
| Detect Magic | Detect Magic | Telepathy | 0 | Standard detection |
| Shield | Necrotic Shield | Necromancy | 1 | Absorb shield |
| Dispel Magic | Break Curse | Light | 2 | Curse removal |
| Dimension Door | Dimension Door | Conjuration | 3 | Long teleport |

### 3.2 Missing High-Priority Classics ❌

**Utility (12 missing)**:
Knock (open locks), Comprehend Languages (translation), Identify (magic items), Water Breathing (underwater), Spider Climb (walls), Scrying (remote viewing), Sending (long messages), Feather Fall (fall protection), Passwall (phase walls), Augury (divine outcome), Divination (ask deity), Legend Lore (research).

**Combat (10 missing)**:
Grease (slippery terrain), Web (sticky trap), Enlarge/Reduce (size change), Gaseous Form (become gas), Banishment (planar exile), Polymorph Others (transform enemy), Disintegrate (destroy matter), Sleep (AoE unconscious), Mass Hold Person (paralyze group), Zone of Truth (force truth).

**Support (8 missing)**:
Mage Armor (arcane AC), Stoneskin (damage reduction), Haste (Arcane version), Slow (Arcane version), Resurrection (raise dead), Regenerate (regrow limbs), Death Ward (prevent death), Shield (force reaction).

---

## 4. Mechanical Role Coverage

### 4.1 Role Distribution

| Role | Arcane | Mystic | Combined | Assessment |
|---|---|---|---|---|
| **Offense** | ~48 | ~52 | ~100 | ✅ Excellent — all schools represented |
| **Defense** | ~18 | ~24 | ~42 | ⚠️ Adequate — limited reactive options |
| **Healing** | ~2 | ~38 | ~40 | ⚠️ Heavily skewed to Mystic; Arcane healing nearly absent |
| **Control** | ~32 | ~28 | ~60 | ✅ Good — strong battlefield manipulation |
| **Support** | ~24 | ~36 | ~60 | ✅ Good — buffs and debuffs covered |
| **Utility** | ~38 | ~42 | ~80 | ⚠️ Gaps — missing classic exploration/travel spells |

### 4.2 Critical Role Gaps

**Defense** — Few reactive spells (Quick Action responses to attacks), limited damage mitigation beyond resistance, no arcane armor enhancement, missing shield/barrier variety.

**Utility** — No scrying, identification, or legend lore. No language comprehension. No spider climb, water breathing, water walking. No knock (locks), passwall (walls), rope trick (shelter). No sending or telepathic bond.

**Transformation** — Limited polymorphism (only Beast Form in Nature). No size change (enlarge/reduce), gaseous form, or incorporeal states. No object-to-creature transformation.

---

## 5. Thematic Coverage Assessment

### 5.1 Well-Developed Themes ✅

| Theme | Primary Schools | Assessment |
|---|---|---|
| Undead & Death | Necromancy, Death | Comprehensive raising, controlling, draining |
| Elements | Evocation, Tempest | Fire, frost, lightning thoroughly covered |
| Stealth & Deception | Illusion, Twilight | Invisibility, disguise, shadows, fear |
| Healing & Restoration | Life | Robust HP restoration and wound recovery |
| Nature & Animals | Nature | Animals, plants, earth, weather comprehensively represented |
| Mind Control | Telepathy | Charm, domination, psychic assault |

### 5.2 Thematic Gaps ❌

| Missing Theme | Expected School(s) | Impact |
|---|---|---|
| Travel magic | Peace | Core aspect entirely absent (no Swift Journey, Sanctuary Path) |
| Law & justice | Peace | No enforcement spells (Binding Oath, Compel Testimony, Zone of Truth) |
| Disease | Nature, Death | Poison exists but no contagious disease mechanics |
| Memory | Telepathy | No memory viewing, alteration, or erasure |
| Resurrection | Life | No raise dead beyond stabilization |
| Prophecy | Twilight, Lore | Limited future-seeing beyond surface divination |
| Time manipulation | None | No time effects exist in any school |
| Permanent effects | Multiple | No long-lasting magical alterations |

---

## 6. Damage Scaling Framework

### 6.1 Standard Damage by Rank

| Rank | Focus | TN | Single-Target (W/S/C) | AoE Standard (W/S/C) | Range | Duration | Area |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 6 | +2/+4/+6 | +0/+2/+4 | Medium | Brief–Short | Melee–Close |
| **1** | 2 | 8 | +4/+8/+12 | +2/+4/+6 | Medium | Short–Medium | Close–Short |
| **2** | 4 | 10 | +6/+12/+18 | +4/+8/+12 | Medium–Long | Short–Medium | Short–Medium |
| **3** | 6 | 12 | +8/+16/+24 | +6/+12/+18 | Long | Short–Medium | Medium–Long |
| **4** | 8 | 14 | +10/+20/+30 | +8/+16/+24 | Long–Extreme | Short–Medium | Large |
| **5** | 10 | 16 | +12/+24/+36 | +10/+20/+30 | Extreme | Short–Medium | Large–Extreme |

**Scaling Rules**:
- **Single-target**: +2 weak damage per rank (2→4→6→8→10→12).
- **AoE standard**: One rank lower damage to balance multi-target advantage.
- **Rank 0 AoE**: Special case +0/+2/+4 to balance unlimited casting.

### 6.2 Damage Deviation Scenarios

| Scenario | Adjustment | Rationale | Example |
|---|---|---|---|
| **Smaller area** (melee AoE) | Up to standard rank damage | Fewer targets, higher risk | Rank 2 melee AoE: +6/+12/+18 |
| **Larger area** | Two ranks lower damage | More targets, easier to land | Rank 2 medium area: +2/+4/+6 |
| **Strong secondary effect** | −1 to −2 steps | Trade damage for utility | Damage + fear: +3/+6/+9 |
| **Control-primary** | Minimal damage | Powerful condition justifies low damage | Rank 0 fear: +0/+2/+4 |
| **Chain/split** | Secondary reduced | Primary damage preserved | Primary +2/+4/+6, chain +0/+2/+4 |

### 6.3 Damage Types

| Category | Types | Notes |
|---|---|---|
| Physical | Bludgeoning, slashing, piercing | Reduced by AV normally |
| Elemental | Fire, Frost, Lightning, Acid | Each has associated conditions |
| Energy | Radiant, Necrotic, Blast, Psychic | Blast ignores ½ AV |
| Special | Poison | Resisted differently |

### 6.4 Power Level Equivalence

| Nexus Rank | D&D Equivalent | Power Tier | Good D&D Models |
|---|---|---|---|
| 0 | Level 0 | At-will cantrips | Prestidigitation, Light |
| 1 | Levels 1–2 | Basic magic | Magic Missile, Cure Wounds |
| 2 | Levels 3–4 | Moderate power | Fireball, Lightning Bolt |
| 3 | Level 5 | High power | Cone of Cold, Cloudkill |
| 4 | Level 6 | Very high power | Disintegrate, Chain Lightning |
| 5 | **Level 7** | Peak mortal | Delayed Blast Fireball, Plane Shift |

**Critical**: Rank 5 = D&D Level 7, NOT Level 9. Impressive but mortal-scale, not world-shattering. Avoid models like Wish, True Resurrection, Meteor Swarm, Time Stop, or Imprisonment.

---

## 7. Single-Target vs Multi-Target Damage Analysis

This section performs a deep comparison of single-target and multi-target spell damage throughput to evaluate whether the current AoE scaling adequately balances multi-target advantage.

### 7.1 Raw Spell Bonus Comparison (Per-Target)

The table below compares spell bonus damage (before adding Spell Power) for single-target vs AoE spells at each rank, using the design guidelines and actual spells in the system.

| Rank | Single-Target (W/S/C) | AoE Guideline (W/S/C) | AoE Penalty | Typical # Targets |
|---|---|---|---|---|
| 0 | +2/+4/+6 | +0/+2/+4 | −2 per SL | 2–3 |
| 1 | +4/+8/+12 | +2/+4/+6 | −2 per SL | 2–4 |
| 2 | +6/+12/+18 | +4/+8/+12 | −2 per SL | 3–6 |
| 3 | +8/+16/+24 | +6/+12/+18 | −2 per SL | 3–8 |
| 4 | +10/+20/+30 | +8/+16/+24 | −2 per SL | 4–10 |
| 5 | +12/+24/+36 | +10/+20/+30 | −2 per SL | 4–12 |

**Observation**: The AoE penalty is a flat −2 per success level compared to single-target — a fixed absolute reduction that becomes proportionally smaller as rank increases (−100% at Rank 0 weak, −50% at Rank 1, but only −17% at Rank 5).

### 7.2 Total Throughput with Spell Power (Expected Combat Scenarios)

Adding Spell Power (½ Attribute) to base damage reveals the actual total damage output. Assuming a competent caster with Spell Power 5 (Mind d10 or Spirit d10):

**Rank 2 — Weak Success Comparison**:

| Spell Type | Per-Target Damage | × 1 Target | × 3 Targets | × 5 Targets |
|---|---|---|---|---|
| Single-target (+6 + SP 5) | 11 | **11** | 11 | 11 |
| AoE standard (+4 + SP 5) | 9 | 9 | **27** | **45** |
| AoE deviation (+3 + SP 5) | 8 | 8 | **24** | **40** |

**Rank 2 — Strong Success Comparison**:

| Spell Type | Per-Target Damage | × 1 Target | × 3 Targets | × 5 Targets |
|---|---|---|---|---|
| Single-target (+12 + SP 5) | 17 | **17** | 17 | 17 |
| AoE standard (+8 + SP 5) | 13 | 13 | **39** | **65** |

**Rank 3 — Strong Success Comparison**:

| Spell Type | Per-Target Damage | × 1 Target | × 3 Targets | × 5 Targets |
|---|---|---|---|---|
| Single-target (+16 + SP 5) | 21 | **21** | 21 | 21 |
| AoE standard (+12 + SP 5) | 17 | 17 | **51** | **85** |

### 7.3 Actual Spell Damage Audit

Comparing real spells at Rank 2 reveals the guideline is inconsistently applied:

| Spell | Rank | Type | Damage (W/S/C) | Targets | Follows Guideline? |
|---|---|---|---|---|---|
| Ice Lance | 2 | Single | +6/+12/+18 | 1 | ✅ Standard single |
| Fireball | 2 | AoE (close) | +4/+8/+12 | All in area | ✅ Standard AoE |
| Frost Wave | 2 | AoE (cone) | +4/+8/+12 | All in cone | ✅ Standard AoE |
| Lightning Strike | 2 | AoE (line) | +4/+8/+12 | All in line | ✅ Standard AoE |
| Corpse Explosion | 2 | AoE (close) | +6/+12/+18 | All in area | ⚠️ Single-target damage on AoE (corpse requirement may justify) |
| Eldritch Tendrils | 2 | AoE (close) | +4/+8/+12 | All in area | ✅ Standard AoE |
| Thorn Barrage | 2 | AoE (line) | +4/+8/+12 | All in line | ✅ Standard AoE |
| Toxic Mist | 2 | AoE (cone) | +4/+8/+12 | All in cone | ✅ Standard AoE |

At Rank 3:

| Spell | Rank | Type | Damage (W/S/C) | Targets | Follows Guideline? |
|---|---|---|---|---|---|
| Wither | 3 | Single | +8/+16/+24 | 1 | ✅ Standard single |
| Purifying Light | 3 | AoE (cone) | +6/+12/+18 | All in cone | ✅ Standard AoE |
| Chain Lightning | 3 | Multi (chain) | +6/+12/+18 | Chain targets | ✅ Standard AoE |
| Cone of Cold | 3 | AoE (cone) | +6/+12/+18 | All in cone | ✅ Standard AoE |
| Negative Energy Flood | 3 | AoE (cone) | +4/+8/+12 | All in cone | ⚠️ Below AoE guideline (control-primary trade-off) |

**Assessment**: Most spells correctly follow the scaling guidelines. Corpse Explosion (R2) is an outlier dealing single-target damage (+6/+12/+18) to an AoE, though it requires a corpse in the area as a material condition.

### 7.4 Missile Spell Throughput (The Scaling Problem)

Missile spells (Arcane Missiles, Arcane Barrage) create a separate balance challenge because each missile independently applies Spell Power and per-hit modifiers.

**Base missile throughput** (Spell Power 5, no modifiers):

| Spell | Rank | Missiles (W/S/C) | Per-Missile | Total (W) | Total (S) | Total (C) |
|---|---|---|---|---|---|---|
| Arcane Missiles | 1 | 1/2/3 | +2 + SP 5 = 7 | 7 | 14 | 21 |
| Arcane Barrage | 2 | 3/4/5 | +2 + SP 5 = 7 | 21 | 28 | 35 |
| A. Missiles (R2) | 2 | 1/2/3 | +4 + SP 5 = 9 | 9 | 18 | 27 |
| A. Missiles (R3) | 3 | 1/2/3 | +6 + SP 5 = 11 | 11 | 22 | 33 |
| A. Barrage (R3) | 3 | 3/4/5 | +4 + SP 5 = 9 | 27 | 36 | 45 |

**Comparison to single-target spells at equivalent ranks** (Spell Power 5):

| Comparison | Missile Total | Single-Target Total | Missile as % |
|---|---|---|---|
| A. Missiles R1 (Critical) vs Chromatic Orb R1 (Critical) | 21 | 17 | **124%** |
| A. Barrage R2 (Critical) vs Ice Lance R2 (Critical) | 35 | 23 | **152%** |
| A. Barrage R3 (Critical) vs Wither R3 (Critical) | 45 | 29 | **155%** |

**With Arcane Empowerment (+Arcana, assume Arcana 4)**:

| Spell | Missiles | Per-Missile (base + SP + Arcana) | Total Damage (Critical) |
|---|---|---|---|
| A. Barrage R2 | 5 | 2 + 5 + 4 = 11 | **55** |
| A. Barrage R3 | 5 | 4 + 5 + 4 = 13 | **65** |

For comparison, the Rank 5 single-target damage ceiling at critical success is +36 spell bonus + SP 5 = 41. Arcane Barrage R3 with Arcane Empowerment reaches **65 damage** at critical — exceeding the Rank 5 ceiling by 59%.

---

## 8. Multi-Target Damage Balance Assessment

### 8.1 Is AoE Damage Per Tier Too High?

**Finding: Standard AoE damage per-target is appropriately scaled, but total throughput is not adequately constrained.**

The "one rank lower" rule correctly reduces per-target damage by −2 per success level. However, this analysis reveals two balance concerns:

**Concern 1 — Proportional Penalty Shrinks at Higher Ranks**

| Rank | Single (Weak) | AoE (Weak) | AoE as % of Single | Effective Penalty |
|---|---|---|---|---|
| 0 | +2 | +0 | 0% | −100% ✅ |
| 1 | +4 | +2 | 50% | −50% ✅ |
| 2 | +6 | +4 | 67% | −33% ⚠️ |
| 3 | +8 | +6 | 75% | −25% ⚠️ |
| 4 | +10 | +8 | 80% | −20% ❌ |
| 5 | +12 | +10 | 83% | −17% ❌ |

At Rank 0–1, the penalty is severe enough to make AoE a genuine trade-off. By Rank 4–5, AoE spells deal 80–83% of single-target damage to **every target in the area**, making them almost strictly superior in any multi-enemy scenario.

**Concern 2 — Spell Power Amplifies the Imbalance**

Spell Power (½ Attribute) is a flat additive bonus applied equally to both single-target and AoE damage. Because this constant is added to both, it narrows the gap further:

| Rank | Single (Weak + SP 5) | AoE (Weak + SP 5) | AoE as % of Single |
|---|---|---|---|
| 1 | 9 | 7 | 78% |
| 2 | 11 | 9 | 82% |
| 3 | 13 | 11 | 85% |
| 4 | 15 | 13 | 87% |
| 5 | 17 | 15 | 88% |

With Spell Power included, a Rank 3 AoE spell deals 85% of single-target damage to each target. Against 3 targets, total throughput is **2.5× single-target**. Against 5 targets, it is **4.2× single-target**.

**Concern 3 — Missile Spells Bypass AoE Scaling Entirely**

Missile spells (Arcane Missiles, Arcane Barrage) deal multiple instances of single-target damage, each benefiting from full Spell Power. They are functionally "multi-target with single-target scaling per hit," making them the highest-throughput option in the system when combined with per-hit modifiers.

### 8.2 Recommendations for AoE Balance

#### Recommendation A: Enforce Proportional AoE Penalty (Primary)

**Current**: AoE deals "one rank lower" damage (flat −2 per SL).
**Proposed**: Scale the penalty to maintain a consistent ~60% ratio of single-target damage at all ranks.

| Rank | Single (W/S/C) | Current AoE (W/S/C) | Proposed AoE (W/S/C) | Change |
|---|---|---|---|---|
| 0 | +2/+4/+6 | +0/+2/+4 | +0/+2/+4 | No change |
| 1 | +4/+8/+12 | +2/+4/+6 | +2/+4/+6 | No change |
| 2 | +6/+12/+18 | +4/+8/+12 | +4/+8/+12 | No change |
| 3 | +8/+16/+24 | +6/+12/+18 | +5/+10/+15 | −1/−2/−3 |
| 4 | +10/+20/+30 | +8/+16/+24 | +6/+12/+18 | −2/−4/−6 |
| 5 | +12/+24/+36 | +10/+20/+30 | +7/+14/+21 | −3/−6/−9 |

This keeps Ranks 0–2 untouched (where AoE balance is acceptable) while tightening Ranks 3–5 where total throughput becomes problematic.

#### Recommendation B: Cap Spell Power on AoE Spells (Alternative)

Apply only ½ Spell Power (rounded down) when casting AoE spells. This preserves spell bonus scaling but reduces the flat additive contribution:

- Current: AoE damage = spell bonus + full Spell Power
- Proposed: AoE damage = spell bonus + ½ Spell Power

**Effect at Rank 3, SP 5**: AoE per-target changes from 11 (6 + 5) to 8 (6 + 2), a 27% reduction in per-target throughput.

#### Recommendation C: Address Missile Spell Stacking (Critical)

The multi-hit damage interaction analysis (separate document) identifies Arcane Barrage + Arcane Empowerment as a **high-severity** balance risk. Recommended approaches:

1. **Cap per-hit modifiers to once per cast** — Arcane Empowerment adds +Arcana once to total missile damage, not per missile.
2. **Reduce missile base damage at higher heighten ranks** — Heightened Arcane Barrage at R3 deals +2 per missile (not +4), maintaining the auto-hit tax.
3. **Limit missile count scaling** — Cap Arcane Barrage at 3/3/4 missiles (instead of 3/4/5) to bound maximum throughput.

#### Recommendation D: Maintain Current System (Monitor)

If the design intent is for AoE to be powerful and the GM controls balance through encounter design (fewer clustered enemies, spread formations), the current scaling may be acceptable. In this case:

- Document the intended AoE throughput ratios explicitly.
- Provide GM guidance on encounter positioning to limit AoE value.
- Monitor missile spell interactions during playtesting.

### 8.3 Summary of Damage Balance Assessment

| Issue | Severity | Current State | Recommendation |
|---|---|---|---|
| AoE per-target damage at R0–2 | Low | Appropriately scaled | No change needed |
| AoE per-target damage at R3–5 | Medium | Per-target gap narrows to 17–25% | Consider proportional penalty (Rec. A) |
| AoE total throughput (3+ targets) | Medium | 2.5–4× single-target | Accept or apply ½ SP on AoE (Rec. B) |
| Missile spell stacking | **High** | Exceeds R5 ceiling at R3 | Cap per-hit modifiers (Rec. C) — Critical |
| Corpse Explosion anomaly | Low | R2 AoE with R2 single-target damage | Review; corpse requirement may justify |

---

## 9. Rank Placement Audit

### 9.1 Potentially Overranked (Too Strong for Current Rank)

| Spell | Current Rank | Issue | Recommended Action |
|---|---|---|---|
| **Elemental Ward** (Evocation) | 1 | Resistance to 5 damage types simultaneously is R2 breadth | Limit to single type at R1 or move to R2 |
| **Protect from Influence** (Light) | 1 | Triple-benefit protection (boon + resistance + bane) is R2 power | Reduce to one benefit at R1 or move to R2 |
| **Shadow Stride** (Twilight) | 2 | Positional teleportation is encounter-shaping (R3 territory) | Change to enhanced movement or move to R3 |

### 9.2 Potentially Underranked (Too Weak for Current Rank or Too Strong for Unlimited Use)

| Spell | Current Rank | Issue | Recommended Action |
|---|---|---|---|
| **Mind Blast** (Telepathy) | 0 | Daze (action denial) at-will is strong | Move to R1 or change to weaker condition |
| **Horrific Vision** (Telepathy) | 0 | AoE fear at-will may trivialize early encounters | Move to R1 or add minimal damage (+0/+2/+4) |
| **Mending** (Conjuration) | 0 | Free infinite repairs trivializes durability system | Add material requirement or move to R1 |
| **Charm** (Telepathy) | 1 | Social encounter resolution at R1 is borderline | Clarify limitations; consider R2 if scope is broad |
| **Silence** (Twilight) | 1 | Powerful anti-caster effect, D&D Level 2 equivalent | Consider moving to R2 or reducing area/duration |

### 9.3 Power Creep Concerns

| Spell | Rank | Issue | Recommended Action |
|---|---|---|---|
| **Solar Flare** (Light) | 2 | Three separate benefits (damage + healing + condition removal) | Reduce to two benefits or move to R3 |
| **Corpse Explosion** (Necromancy) | 2 | AoE with single-target damage (+6/+12/+18) | Review; corpse requirement may justify, but monitor |

### 9.4 Incomplete Spells Requiring Rank Validation

| Spell | Current Rank | Likely Correct Rank | Concern |
|---|---|---|---|
| Finger of Death (Necromancy) | 3 | **4** | Iconic death spell — D&D Level 7 equivalent too powerful for R3 |
| Force Cage (Conjuration) | 4 | **4–5** | Complete battlefield control may warrant R5 |
| Astral Body (Conjuration) | 4 | **5** | Astral projection is D&D Level 9; bounded version still R5 |
| Teleportation Circle (Conjuration) | 3 | **4** | Long-distance network is R4 territory |
| Wave of Madness (Telepathy) | 3 | **3–4** | Depends on area and duration of mass confusion |
| Silent Night (Twilight) | 2 | **2–3** | Sleep + silence combo may exceed R2 scope |
| Sense Spirits (Light) | 1 | **1–2** | Wide-area spiritual detection unclear in scope |

### 9.5 Scaling Validation

**Damage progression across ranks** (single-target):
- Rank 0: +2/+4/+6 ✅
- Rank 1: +4/+8/+12 ✅
- Rank 2: +6/+12/+18 ✅
- Rank 3: +8/+16/+24 ✅
- Rank 4: +10/+20/+30 (guidelines — incomplete spells prevent verification)
- Rank 5: +12/+24/+36 (guidelines — no spells exist)

**AoE damage progression** (standard area):
- Rank 0: +0/+2/+4 ✅
- Rank 1: +2/+4/+6 ✅
- Rank 2: +4/+8/+12 ✅
- Rank 3: +6/+12/+18 ✅
- Rank 4: +8/+16/+24 (guidelines)
- Rank 5: +10/+20/+30 (guidelines)

**Overall assessment**: 95%+ of completed spells are correctly ranked. Deviation cases (Shroud of Fear at +3/+6/+9) are intentional and justified by secondary effect trade-offs.

---

## 10. Incomplete Spells & Missing Rank 5

### 10.1 Incomplete Spells (18 Total)

**Critical Priority (core gameplay gaps)**:
- Silent Night (Twilight R2) — Silence area, blocks spellcasting
- Seeming (Illusion R3) — Group disguise, essential utility
- Wave of Madness (Telepathy R2) — AoE mind control
- Orbiting Shards (Telekinetics R2) — Defensive circling projectiles
- Finger of Death (Necromancy R4) — Iconic death spell

**High-Tier Spells (strengthen R4 options)**:
- Force Cage (Conjuration R4), Teleportation Circle (Conjuration R4), Astral Body (Conjuration R4)
- Invade Dreams (Telepathy R3), Distortion Field (Telekinetics R3), Invert Gravity (Telekinetics R4)

**Environmental/Situational**:
- Control Weather (Nature R4), Tree Stride (Nature R4)
- Sandstorm (Tempest R4), Control Winds (Tempest R4), Earthquake (Tempest R4), Lightning Storm (Tempest R4)
- Sense Spirits (Light R1)

### 10.2 Missing Rank 5 Spells

All 14 schools lack Rank 5 capstones. Recommended concepts (D&D Level 7 power, NOT Level 9):

**Arcane Disciplines**:

| Discipline | Spell Concepts | Role |
|---|---|---|
| Evocation | Delayed Meteor (+10/+20/+30 AoE, delayed), Prismatic Barrier (multi-resist defense) | Offense, Defense |
| Illusion | Perfect Disguise (undetectable), Mass Phantasmal Force (6-target illusions) | Utility, Control |
| Conjuration | Planar Gateway (bounded portal), Enhanced Summoning (tier 4 creature) | Utility, Support |
| Telepathy | Mental Fortress (6-ally charm/fear immunity), Psychic Maelstrom (+10/+20/+30 cone) | Support, Offense |
| Telekinetics | Gravity Reversal (medium area reversal), Kinetic Barrier (40 HP shield) | Utility, Defense |
| Necromancy | Army of Shadows (4–6 tier 2 undead), Death's Master (undead transformation) | Control, Offense |

**Mystic Traditions**:

| Tradition | Spell Concepts | Role |
|---|---|---|
| Light | Radiant Convergence (+10/+20/+30 line), Beacon of Truth (zone of truth) | Offense, Support |
| Twilight | Dream Realm (shared dream), Shadow Apotheosis (shadow transformation) | Utility, Offense |
| Life | Mass Restoration (+12/+24/+36 AoE heal), Vitality Field (healing zone) | Healing, Support |
| Death | Plague Wind (+10/+20/+30 disease cone), Death's Grasp (ongoing necrotic) | Offense, Control |
| Nature | Primal Awakening (animate tier 4 construct), Nature's Wrath (+10/+20/+30 cone) | Support, Offense |
| Tempest | Storm Lord (storm transformation + flight), Tempest's Fury (medium area storm) | Offense, Control |
| Peace | Sanctuary Sphere (zone of peace), Harmonic Bond (6-ally link) | Defense, Support |
| War | Warlord's Presence (warrior avatar), Battlefield Commander (tactical control) | Offense, Support |

**Rank 5 Design Principles**:
1. Maximum +12 weak base damage (single-target) or +10 (AoE).
2. Duration capped at medium. Most require concentration.
3. All effects must be escapable (saves, counterplay).
4. No instant kills, permanent effects, or auto-win conditions.
5. Focus cost 10 + often additional costs (fatigue, material).
6. TN 16 (Legendary) makes casting itself a meaningful challenge.
7. Power budget ~150% of Rank 4, not 300%.

---

## 11. Spell Suggestions by School

### 11.1 Most Urgent Expansions

| School | Current | Target | Priority Additions |
|---|---|---|---|
| **War** | 11 | ~20 | R3–5 battle tactics, champion powers, formations |
| **Peace** | 13 | ~25 | Travel magic (Swift Journey, Sanctuary Path), law enforcement (Binding Oath, Zone of Truth) |
| **Telepathy** | 15 | ~30 | Memory spells (Modify Memory, Feeblemind), communication (Sending, Tongues, Comprehend Languages) |
| **Telekinetics** | 14 | ~26 | Complete 3 incompletes, movement utility (Feather Fall, Spider Climb, Passwall), R5 capstones |

### 11.2 High-Priority Suggestions by Discipline/Tradition

**Evocation** — Fill R3+ gaps:
Chain Lightning (R3), Ice Storm (R3), Wall of Fire (R3), Cone of Cold (R3), Delayed Blast Meteor (R5), Prismatic Spray (R4), Elemental Shield (R2), Fire Shield (R3).

**Illusion** — Complete Seeming + R4–5:
Seeming (R4 completion), Perfect Disguise (R5), Mass Phantasmal Force (R5), Blur (R2), Phantasmal Killer (R4), Mirror Image (R2), Mislead (R3), Hypnotic Pattern (R3).

**Conjuration** — Complete R4 + classics:
Force Cage (R4), Teleportation Circle (R4), Planar Gateway (R5), Master Summoning (R5), Rope Trick (R2), Knock (R2), Arcane Lock (R1), Mage Armor (R1).

**Telepathy** — Memory + communication:
Wave of Madness (R3), Invade Dreams (R4), Modify Memory (R4), Feeblemind (R4), Mental Fortress (R5), Psychic Maelstrom (R5), Sending (R3), Tongues (R3), Comprehend Languages (R1), Detect Thoughts (R2), Sleep (R1).

**Telekinetics** — Complete + utility:
Orbiting Shards (R2), Distortion Field (R4), Invert Gravity (R4), Gravity Reversal (R5), Kinetic Barrier (R5), Feather Fall (R1), Spider Climb (R2), Passwall (R3), Crushing Hand (R4).

**Necromancy** — R5 + siphoning:
Finger of Death (R4), Army of Shadows (R5), Death's Master (R5), Vampiric Touch (R2), Enervation (R3), Contagion (R3).

**Light** — Truth + R4–5:
Sense Spirits (R1), Radiant Convergence (R5), Beacon of Truth (R5), Zone of Truth (R3), Detect Lies (R1), Solar Flare (R4), Turn Greater Undead (R3).

**Twilight** — Divination + R5:
Silent Night (R2), Dream Realm (R5), Shadow Apotheosis (R5), Augury (R2), Divination (R3), Legend Lore (R4), Moonbeam (R2), Shadow Walk (R3).

**Life** — Resurrection + R3–5:
Mass Restoration (R5), Vitality Field (R5), Regenerate (R4), Resurrection (R4), Death Ward (R3), Heroes' Feast (R4), Aura of Vitality (R3), Aid (R2).

**Death** — Disease + R3–5:
Plague Wind (R5), Death's Grasp (R5), Contagion (R3), Pestilence (R4), Bestow Curse (R3), Mass Fear (R4), Speak with Dead (R3), Bane (R1).

**Nature** — Complete R4 + animal utility:
Tree Stride (R4), Control Weather (R4), Primal Awakening (R5), Nature's Wrath (R5), Water Breathing (R2), Water Walk (R2), Stone Shape (R3), Insect Plague (R4).

**Tempest** — Complete R4 + R5:
Earthquake (R4), Control Winds (R4), Sandstorm (R4), Storm Lord (R5), Tempest's Fury (R5), Thunderwave (R1), Tidal Wave (R3).

**Peace** — Travel + law + defense:
Sanctuary Sphere (R5), Harmonic Bond (R5), Wind Walk (R4), Teleport (R4), Sanctuary (R1), Shield of Faith (R1), Stoneskin (R3), Calm Emotions (R2), Command (R1).

**War** — R3+ variety:
Warlord's Presence (R5), Battlefield Commander (R5), Blood Frenzy (R4), Righteous Fury (R4), Mass Smite (R3), Battle Cry (R3), Crusader's Mantle (R3), Divine Favor (R1).

### 11.3 Suggestion Summary

| Category | Count |
|---|---|
| Complete incomplete spells | 18 |
| Rank 5 capstones (all schools) | 28 |
| Classic fantasy gap-fills | ~30 |
| Tradition/discipline expansions | ~50 |
| **Total suggested additions** | **~126** |

**Rank distribution of suggestions**: R0: 3, R1: ~20, R2: ~22, R3: ~30, R4: ~30, R5: ~28.

---

## 12. Strengths to Preserve

✅ **Necromancy excellence** — Comprehensive, flavorful, mechanically sound (28 spells, 97% complete). Best-in-class depth across raising, controlling, draining, and decay.

✅ **Nature breadth** — Excellent variety across animals, plants, earth, weather (35 spells, 93% complete). Covers all tradition aspects meaningfully.

✅ **Tempest depth** — Largest tradition (33 spells) with strong coverage of storms, lightning, frost, and earthquakes.

✅ **Elemental coverage** — Fire, frost, lightning thoroughly represented across Evocation and Tempest with clear mechanical distinction.

✅ **Low-to-mid tier foundations** — Ranks 0–2 provide 219 spells, giving new characters robust options from the start.

✅ **Thematic identity** — Clear and consistently applied Arcane (transgressive/selfish) vs Mystic (reverent/communal) distinction. Each school has a recognizable personality.

✅ **Healing ecosystem** — Life tradition offers comprehensive restoration. Mystic healing is well-distributed across Life, Nature, and Light.

✅ **Damage scaling framework** — The +2 per rank progression for single-target and "one rank lower" for AoE provides a clean, predictable design scaffold.

---

## 13. Summary of Recommendations

### Priority 1 — Critical Balance (Immediate)

| # | Action | Impact |
|---|---|---|
| 1.1 | Address missile spell + per-hit modifier stacking (Arcane Barrage + Arcane Empowerment exceeds R5 ceiling at R3) | Prevents multiplicative scaling from breaking damage bounds |
| 1.2 | Review Corpse Explosion (R2) AoE dealing single-target damage | Ensure consistent AoE scaling or document exception |
| 1.3 | Audit 5 potentially mis-ranked spells (Mind Blast, Horrific Vision, Mending, Elemental Ward, Silence) | Tighten R0–R1 balance for unlimited/cheap casting |

### Priority 2 — Complete Existing Content

| # | Action | Impact |
|---|---|---|
| 2.1 | Complete 18 incomplete spells (5 critical, 6 high-tier, 7 environmental) | Fills core gaps, enables full R4 tier |
| 2.2 | Validate rank placement of incomplete spells during implementation | Prevents creating new misalignment |

### Priority 3 — Expand High Tiers

| # | Action | Impact |
|---|---|---|
| 3.1 | Design and implement 28 Rank 5 capstones (2 per school) | Creates legendary magic tier across all schools |
| 3.2 | Fill Rank 3–4 gaps in Evocation, War, Death | Provides progression path variety |

### Priority 4 — Fill Classic & Thematic Gaps

| # | Action | Impact |
|---|---|---|
| 4.1 | Add ~30 classic fantasy spells (utility, combat, support) | Meets player expectations from genre |
| 4.2 | Expand War (→ ~20 spells) and Peace (→ ~25 spells) traditions | Addresses smallest-school problem |
| 4.3 | Add missing thematic content (disease, memory, resurrection, prophecy) | Fills narrative gaps |

### Priority 5 — Scaling Refinement (Consider for Future)

| # | Action | Impact |
|---|---|---|
| 5.1 | Evaluate proportional AoE penalty for R3–5 (see §8.2 Recommendation A) | Prevents AoE dominance at high tiers |
| 5.2 | Consider ½ Spell Power on AoE as alternative (see §8.2 Recommendation B) | Simpler implementation, broader impact |
| 5.3 | Document intended AoE throughput ratios and provide GM encounter guidance | Supports balance even without mechanical changes |

---

## Appendix A: Spell Count by Rank and School

| School / Tradition | R0 | R1 | R2 | R3 | R4 | R5 | Total |
|---|---|---|---|---|---|---|---|
| Conjuration | 3 | 6 | 6 | 5 | 4 | 0 | 24 |
| Evocation | 3 | 9 | 5 | 1 | 0 | 0 | 18 |
| Illusion | 3 | 5 | 7 | 3 | 0 | 0 | 18 |
| Necromancy | 5 | 8 | 7 | 6 | 2 | 0 | 28 |
| Telepathy | 3 | 6 | 4 | 1 | 1 | 0 | 15 |
| Telekinetics | 3 | 5 | 4 | 1 | 1 | 0 | 14 |
| **Arcane Total** | **20** | **39** | **33** | **17** | **8** | **0** | **117** |
| Death | 5 | 6 | 2 | 2 | 0 | 0 | 15 |
| Life | 3 | 5 | 5 | 2 | 0 | 0 | 15 |
| Light | 4 | 8 | 3 | 3 | 0 | 0 | 18 |
| Nature | 6 | 8 | 11 | 8 | 2 | 0 | 35 |
| Peace | 3 | 4 | 3 | 3 | 0 | 0 | 13 |
| Tempest | 3 | 9 | 9 | 7 | 5 | 0 | 33 |
| Twilight | 5 | 7 | 7 | 2 | 1 | 0 | 22 |
| War | 3 | 5 | 3 | 0 | 0 | 0 | 11 |
| **Mystic Total** | **32** | **52** | **43** | **27** | **8** | **0** | **162** |
| **Grand Total** | **52** | **91** | **76** | **44** | **16** | **0** | **279** |

## Appendix B: Rank-by-Rank Design Reference

### Rank 0 (Cantrips)
- At-will, unlimited use, minor effects.
- Damage: +2/+4/+6 single, +0/+2/+4 AoE.
- Duration: Briefly–Short. Area: Melee–Close. Range: up to Medium.
- No lasting effects beyond "briefly." No permanent creation.

### Rank 1 (Basic Spells)
- Bread-and-butter combat and utility. Focus 2, TN 8.
- Damage: +4/+8/+12 single, +2/+4/+6 AoE.
- Duration: up to Medium. Area: Close–Short. Range: up to Medium.
- Single-target control. Short buffs/debuffs. Basic utility.

### Rank 2 (Intermediate Spells)
- Fireball-tier power, concentration common. Focus 4, TN 10.
- Damage: +6/+12/+18 single, +4/+8/+12 AoE.
- Duration: Short–Medium. Area: Short–Medium. Range: Medium–Long.
- Multi-target effects. Battlefield control (small areas). Moderate healing.

### Rank 3 (High-Power Spells)
- Encounter-defining effects. Focus 6, TN 12.
- Damage: +8/+16/+24 single, +6/+12/+18 AoE.
- Duration: Short–Medium. Area: Medium–Long. Range: Long.
- Powerful control and transformation. Hybrid damage + utility.

### Rank 4 (Transformation Spells)
- Major transformations and powerful effects. Focus 8, TN 14.
- Damage: +10/+20/+30 single, +8/+16/+24 AoE.
- Duration: Short–Medium. Area: Large. Range: Long–Extreme.
- Form alterations, major barriers, planar interaction.

### Rank 5 (Peak Mortal Power)
- Legendary mastery, NOT world-shattering. Focus 10, TN 16.
- Damage: +12/+24/+36 single, +10/+20/+30 AoE.
- Duration: Short–Medium (max). Area: Large–Extreme. Range: Extreme.
- Mass buffs/healing, major control, legendary utility. Always costly, always escapable.

## Appendix C: Spell Properties Reference

| Property | Effect | Common Ranks |
|---|---|---|
| **quick** | Cast as Quick Action | 0–2 |
| **concentrate** | Requires concentration; broken by damage/disruption | 2–5 |
| **enchant (X)** | Enhances person/equipment for duration | 1–5 |
| **singular** | Only one instance can exist | 1–3 |
| **ritual (X)** | Extended casting time (minutes/hours) | 1–5 |
| **illusory** | Detected with Spirit + Perception vs Resist | 0–3 |
| **material (X)** | Requires component (not consumed) | 1–4 |
| **material cost (X)** | Component consumed on cast | 2–5 |
| **blast (cone/line)** | Directional area effect; ignores ½ AV | 0–5 |

## Appendix D: Cross-Reference Documents

- **Multi-Hit Damage Interactions**: `docs/analysis/multi-hit-damage-interaction-analysis.md` — Detailed missile spell stacking analysis with 6 balance approaches.
- **Arcane Spell Data**: `docs/07-magic/02-arcane-spells/` — Full spell descriptions by discipline.
- **Mystic Spell Data**: `docs/07-magic/04-mystic-spells/` — Full spell descriptions by tradition.
- **Spell Creation Instructions**: System prompt reference — Damage scaling, rank guidelines, tradition/discipline identities.
- **Talent System Analysis**: `docs/analysis/talents/TALENT_SYSTEM_ANALYSIS.md` — Spell-talent interaction analysis (Arcane Empowerment, Battle Mage, etc.).
