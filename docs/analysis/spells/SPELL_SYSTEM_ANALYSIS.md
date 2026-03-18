# Spell System — Design Analysis

> **Scope:** Comprehensive analysis of the Nexus RPG spell system covering coverage, balance, damage scaling, rank placement, single-target vs multi-target throughput, and expansion recommendations across 6 arcane disciplines and 8 mystic traditions.

---

## 1. Executive Summary

### Key Findings

1. **Low-to-mid tier coverage is strong; high-tier coverage is sparse.** Ranks 0–2 contain 219 of 279 total spells (~78%), providing robust foundations. Ranks 3–4 have 52 spells with limited variety, and Rank 5 has zero spells — all 14 schools lack legendary capstones.
2. **Multi-target damage should use half single-target scaling at Rank 2+.** The previous "one rank lower" guideline used a flat −2 reduction that became proportionally weaker at higher ranks. The revised approach halves the single-target spell bonus for multi-target spells at R2+ (R0–R1 unchanged), creating a consistent 50% penalty that remains meaningful at all ranks. Spell Power and spell catalyst bonuses apply equally, so the actual per-target gap narrows in play — but still rewards clustering 3+ targets as an intentional AoE payoff.
3. **Missile spells need damage type reconsideration.** Arcane Missiles/Barrage currently use blast damage (ignoring ½ AV), but the intended weakness is per-missile AV reduction. The blast property undermines this by halving AV before it applies. A neutral "arcane" damage type with full AV application per missile would better serve the design intent. Moving Arcane Barrage to Rank 3 is also under consideration as an alternative or complementary fix.
4. **War and Peace traditions are undersized.** War has 11 spells (no Rank 3+) and Peace has 13 spells. Both lack core thematic aspects — War needs higher-rank battle magic; Peace is missing travel and law enforcement spells entirely.
5. **~30 classic fantasy spells are absent.** Expected utility staples (Knock, Identify, Water Breathing, Comprehend Languages) and combat classics (Sleep, Web, Grease, Banishment) have no equivalents.
6. **18 spells remain incomplete** (lacking full mechanical descriptions), with 64% of Rank 4 spells affected.
7. **Thematic identity is well-executed.** The Arcane (transgressive/selfish) vs Mystic (reverent/communal) distinction is clear and consistently applied across all schools. Necromancy, Nature, and Tempest are exemplary in depth and coherence.
8. **Five schools lack a Rank 1 reactive Quick Action spell.** Conjuration, Telekinetics, Death, Nature, and Twilight have no quick defensive or support spell at R1. Every school should have at least one to ensure baseline reactive play for casters of any tradition/discipline.
9. **School internal design needs systematic attention.** Many schools lack clear setup+payoff spell combos, consistent condition/gimmick identities, or balanced role coverage. A per-school gap analysis (§13) identifies specific deficiencies and proposes concrete new spells.
10. **Spell tags between schools and spell lists add complexity without meaningful gameplay benefit.** Traits work better as design tools for coverage auditing (§17) than as a player-facing mechanical layer.
11. **A "force" damage type (full AV per hit) should replace blast on 5 arcane projectile spells**, preserving blast (½ AV ignore) for concussive effects only. This clarifies the mechanical distinction between magical projectiles and explosive concussive force (§15).
12. **Healing spell scaling matches damage scaling 1:1 for single-target**, with Quick Action healing appropriately halved and AoE healing following multi-target scaling. No major rebalancing needed (§16).
13. **Multiple schools have significant R0 trait coverage gaps**, with Evocation, Telepathy, Telekinetics, Peace, and Tempest each missing 2–3 cantrips for uncovered aspects (§17).

### Design Principles

1. **Bounded power ceiling** — Rank 5 equals D&D Level 7 (Delayed Blast Fireball, Plane Shift), not Level 9 (Wish, Meteor Swarm). All effects must be temporary, escapable, and mortal-scale.
2. **AoE must trade damage for targets** — Multi-target spells deal half single-target spell bonus at Rank 2+ (R0–R1 unchanged). This ensures AoE is rewarding against clustered groups (3+ targets) but never strictly superior to focused fire.
3. **Spell Power adds depth, not dominance** — The ½ Attribute base damage ensures casters always contribute, but total throughput with modifiers must not exceed bounded ceilings.
4. **Focus is the primary resource constraint** — Higher-rank spells cost more Focus (2/4/6/8/10 by rank), gating power behind resource management rather than unlimited scaling.
5. **Traditions/disciplines should cover their Excel and Decent roles** — Each school should have spells across its primary and secondary roles, with Weak roles deliberately limited.
6. **Area scales with rank** — R0–R1 spells are almost all single-target (rare melee AoE). R2 affects close area or short line. R3 affects short area. R4 affects medium area. R5 affects up to long area.
7. **Every school needs internal completeness** — Each school should have: at least one R1 Quick Action reactive spell, defensive options, utility/non-combat effects, some damage capability (even if restricted), repeating conditions/gimmick identity, and setup+payoff synergies.

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

| Rank | Focus | TN | Single-Target (W/S/C) | Multi-Target (W/S/C) | Default Range | Duration | Default Area |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 6 | +2/+4/+6 | +0/+2/+4 | Medium | Brief–Short | Single / Melee |
| **1** | 2 | 8 | +4/+8/+12 | +2/+4/+6 | Medium | Short–Medium | Single / Melee |
| **2** | 4 | 10 | +6/+12/+18 | +3/+6/+9 | Medium–Long | Short–Medium | Close area / Short line |
| **3** | 6 | 12 | +8/+16/+24 | +4/+8/+12 | Long | Short–Medium | Short area |
| **4** | 8 | 14 | +10/+20/+30 | +5/+10/+15 | Long–Extreme | Short–Medium | Medium area |
| **5** | 10 | 16 | +12/+24/+36 | +6/+12/+18 | Extreme | Short–Medium | Long area |

**Scaling Rules**:
- **Single-target**: +2 weak damage per rank (2→4→6→8→10→12).
- **Multi-target (R2+)**: Half single-target spell bonus — consistently 50% per-target penalty at all ranks.
- **Multi-target (R0–R1)**: Legacy scaling preserved (+0/+2/+4 and +2/+4/+6) because at-will and low-Focus spells need stronger constraints.
- **Duo-target spells**: Edge case between single and multi. Use ~75% of single-target damage (+4/+9/+13 at R2) or full single-target damage with a limiting condition (e.g., targets must be adjacent).

**Note on Spell Power and Spell Catalysts**: Spell Power (½ Attribute) and spell catalyst damage bonuses apply equally to single-target and multi-target spells. This narrows the effective per-target gap in play (see §7.2), but the 50% spell bonus penalty still creates meaningful differentiation. The design intent is that AoE rewards clustering 3+ targets — hitting 3 targets at half damage per target yields 150% total throughput vs single-target, which is the intended payoff.

### 6.2 Area Progression by Rank

| Rank | Default Area | Notes |
|---|---|---|
| **0** | Single-target | Rare exceptions: melee-range AoE only |
| **1** | Single-target | Rare exceptions: melee-range AoE only |
| **2** | Close area or short line | First true AoE tier. Lightning Bolt/Strike should be nerfed from medium line to short line. |
| **3** | Short area | Encounter-shaping AoE begins |
| **4** | Medium area | Major battlefield control |
| **5** | Long area | Maximum AoE reach |

**Existing spells requiring area adjustment**: Lightning Strike (Evocation R2) and Lightning Bolt (Tempest R2) currently use a line in medium range. Under this framework, they should be reduced to a short line to match R2 area progression.

### 6.3 Range Modification Framework

| Default Range | Rank Reference |
|---|---|
| Medium | R0–R1 |
| Medium–Long | R2 |
| Long | R3 |
| Long–Extreme | R4 |
| Extreme | R5 |

**Range Tradeoffs**:

| Modification | Cost / Benefit | Example |
|---|---|---|
| **Longer range** (+1 step) | −1 per success level damage, or +1 Focus cost, or lose secondary effect | A R2 spell at Long range deals +2/+4/+6 instead of +3/+6/+9 |
| **Shorter range** (−1 step) | +1 per success level damage, or gain secondary condition, or reduced Focus | A R2 melee-only AoE can deal full single-target damage (+6/+12/+18) |
| **Touch/Melee only** | Up to full single-target damage on AoE, or strong secondary effect | Melee AoE justified at full damage due to positioning risk |
| **Self only** | Stronger effect than targeted equivalent, or longer duration | Self-buffs can be more potent than ally-targeted versions |

**Principle**: Range and area are part of the power budget. Spells with reduced range/area can be more potent per-target; spells with extended range/area should be less potent per-target or cost more Focus.

### 6.4 Damage Deviation Scenarios

| Scenario | Adjustment | Rationale | Example |
|---|---|---|---|
| **Melee AoE** | Up to standard single-target damage | Fewer targets, positioning risk | Rank 2 melee AoE: +6/+12/+18 |
| **Larger area** (one step up) | Reduce by −1 per SL from multi-target | More targets, easier to land | Rank 3 medium area: +3/+6/+9 |
| **Strong secondary effect** | −1 to −2 steps from base | Trade damage for utility | Multi-target + fear: +2/+4/+6 at R2 |
| **Control-primary** | Minimal damage | Powerful condition justifies low damage | Rank 0 fear: +0/+2/+4 |
| **Chain/split** | Secondary hit reduced | Primary damage preserved | Primary +4/+8/+12, chain +2/+4/+6 |
| **Duo-target** | ~75% single-target | Between single and multi | Rank 2 duo: +4/+9/+13 |

### 6.5 Damage Types

| Category | Types | Notes |
|---|---|---|
| Physical | Bludgeoning, slashing, piercing | Reduced by AV normally |
| Elemental | Fire, Frost, Lightning, Acid | Each has associated conditions |
| Energy | Radiant, Necrotic, Blast, Psychic | Blast ignores ½ AV |
| Special | Poison | Resisted differently |

**Open Question — Arcane/Force Damage Type**: Missile spells (Arcane Missiles, Arcane Barrage) currently use blast damage, which ignores ½ AV. However, the intended weakness of missile spells is per-missile AV reduction. Blast's ½ AV ignore undermines this. A neutral "arcane" or "force" damage type that applies full AV per hit would better serve the design intent. See §7.6 for detailed analysis.

### 6.6 Power Level Equivalence

| Nexus Rank | D&D Equivalent | Power Tier | Good D&D Models |
|---|---|---|---|
| 0 | Level 0 | At-will cantrips | Prestidigitation, Light |
| 1 | Levels 1–2 | Basic magic | Magic Missile, Cure Wounds |
| 2 | Levels 3–4 | Moderate power | Fireball, Lightning Bolt |
| 3 | Level 5 | High power | Cone of Cold, Cloudkill, **Revivify** |
| 4 | Level 6 | Very high power | Disintegrate, Chain Lightning, **Raise Dead** |
| 5 | **Level 7** | Peak mortal | Delayed Blast Fireball, Plane Shift, **Resurrection** |

**Critical**: Rank 5 = D&D Level 7, NOT Level 9. Impressive but mortal-scale, not world-shattering. Avoid models like Wish, True Resurrection, Meteor Swarm, Time Stop, or Imprisonment.

**Resurrection Framework**: See §8.3 for the detailed resurrection framework.

---

## 7. Multi-Target & Missile Damage Analysis

This section compares single-target and multi-target spell damage throughput under the revised half-damage scaling to evaluate balance.

### 7.1 Spell Bonus Comparison (Per-Target, Before Spell Power)

| Rank | Single-Target (W/S/C) | Multi-Target (W/S/C) | Penalty | Penalty % |
|---|---|---|---|---|
| 0 | +2/+4/+6 | +0/+2/+4 | −2 per SL | −100% / −50% / −33% |
| 1 | +4/+8/+12 | +2/+4/+6 | −2 per SL | −50% |
| 2 | +6/+12/+18 | +3/+6/+9 | −3/−6/−9 | **−50%** |
| 3 | +8/+16/+24 | +4/+8/+12 | −4/−8/−12 | **−50%** |
| 4 | +10/+20/+30 | +5/+10/+15 | −5/−10/−15 | **−50%** |
| 5 | +12/+24/+36 | +6/+12/+18 | −6/−12/−18 | **−50%** |

**Key Improvement**: The revised scaling maintains a consistent 50% spell bonus penalty at R2+, compared to the old system where the penalty shrank from −33% at R2 to −17% at R5.

### 7.2 Total Throughput with Spell Power (SP 5, Mind/Spirit d10)

Spell Power is a flat additive bonus that narrows the per-target gap. Spell catalyst bonuses (+1 to +3 at higher levels) have the same effect. This table shows the actual per-target and total damage in realistic play:

**Rank 2 — Weak Success**:

| Spell Type | Per-Target | × 1 Target | × 3 Targets | × 5 Targets |
|---|---|---|---|---|
| Single-target (+6 + SP 5) | 11 | **11** | 11 | 11 |
| Multi-target (+3 + SP 5) | 8 | 8 | **24** | **40** |

**Rank 2 — Strong Success**:

| Spell Type | Per-Target | × 1 Target | × 3 Targets | × 5 Targets |
|---|---|---|---|---|
| Single-target (+12 + SP 5) | 17 | **17** | 17 | 17 |
| Multi-target (+6 + SP 5) | 11 | 11 | **33** | **55** |

**Rank 3 — Strong Success**:

| Spell Type | Per-Target | × 1 Target | × 3 Targets | × 5 Targets |
|---|---|---|---|---|
| Single-target (+16 + SP 5) | 21 | **21** | 21 | 21 |
| Multi-target (+8 + SP 5) | 13 | 13 | **39** | **65** |

**Rank 3 — With Spell Catalyst +2**:

| Spell Type | Per-Target | × 1 Target | × 3 Targets | × 5 Targets |
|---|---|---|---|---|
| Single-target (+16 + SP 5 + cat 2) | 23 | **23** | 23 | 23 |
| Multi-target (+8 + SP 5 + cat 2) | 15 | 15 | **45** | **75** |

### 7.3 Balance Assessment of Revised Scaling

**Is multi-target too weak?** No. Against 3 targets (the design assumption for standard AoE), total throughput is:
- R2 Weak: 24 vs 11 single = **218%** total throughput
- R2 Strong: 33 vs 17 single = **194%** total throughput
- R3 Strong: 39 vs 21 single = **186%** total throughput

AoE delivers roughly 2× total damage against 3 targets, which rewards clustering and punishes tight formations. Against 5 targets, total throughput reaches 3–4×, which is a powerful positional payoff.

**Is multi-target too strong?** Per-target damage is consistently lower:
- R2 Weak: 8 vs 11 = 73% per-target (with SP included)
- R3 Strong: 13 vs 21 = 62% per-target

This means AoE never replaces single-target for priority target elimination. The trade-off is genuine: focus fire vs area pressure.

**Impact of spell catalysts**: At higher levels, spell catalyst damage bonuses (+1 to +3) are flat additives that apply equally. This narrows the gap slightly (as shown in the R3 catalyst example above), which is acceptable because catalyst investment represents character progression that should empower all spell types.

### 7.4 Comparison to Previous System

| Rank | Old AoE as % of Single (bonus only) | New AoE as % of Single (bonus only) | Change |
|---|---|---|---|
| 0 | 0–50% | 0–50% | No change |
| 1 | 50% | 50% | No change |
| 2 | 67% | **50%** | −17% per-target |
| 3 | 75% | **50%** | −25% per-target |
| 4 | 80% | **50%** | −30% per-target |
| 5 | 83% | **50%** | −33% per-target |

The revised scaling creates the most significant impact at high ranks, where the old system was weakest.

### 7.5 Actual Spell Damage Audit

Comparing real spells at Rank 2 against the revised guidelines:

| Spell | Rank | Type | Damage (W/S/C) | Targets | Revised Guideline | Status |
|---|---|---|---|---|---|---|
| Ice Lance | 2 | Single | +6/+12/+18 | 1 | +6/+12/+18 | ✅ Correct |
| Fireball | 2 | AoE (close) | +4/+8/+12 | All in area | +3/+6/+9 | ⚠️ Above revised guideline |
| Frost Wave | 2 | AoE (cone) | +4/+8/+12 | All in cone | +3/+6/+9 | ⚠️ Above revised guideline |
| Lightning Strike | 2 | AoE (line) | +4/+8/+12 | All in line | +3/+6/+9 | ⚠️ Above revised guideline + area too large |
| Corpse Explosion | 2 | AoE (close) | +6/+12/+18 | All in area | +3/+6/+9 | ⚠️ Full single-target damage (corpse cost may justify) |
| Thorn Barrage | 2 | AoE (line) | +4/+8/+12 | All in line | +3/+6/+9 | ⚠️ Above revised guideline |
| Toxic Mist | 2 | AoE (cone) | +4/+8/+12 | All in cone | +3/+6/+9 | ⚠️ Above revised guideline |

At Rank 3:

| Spell | Rank | Type | Damage (W/S/C) | Targets | Revised Guideline | Status |
|---|---|---|---|---|---|---|
| Wither | 3 | Single | +8/+16/+24 | 1 | +8/+16/+24 | ✅ Correct |
| Purifying Light | 3 | AoE (cone) | +6/+12/+18 | All in cone | +4/+8/+12 | ⚠️ Above revised guideline |
| Chain Lightning | 3 | Multi (chain) | +6/+12/+18 | Chain | +4/+8/+12 | ⚠️ Above revised guideline |
| Cone of Cold | 3 | AoE (cone) | +6/+12/+18 | All in cone | +4/+8/+12 | ⚠️ Above revised guideline |

**Note**: All existing AoE spells were built under the old "one rank lower" system. Adopting half-damage scaling means existing R2+ AoE spells would need their damage reduced. This is a significant but systematic change — roughly −1 per SL at R2, −2 per SL at R3, etc.

### 7.6 Missile Spell Analysis

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

#### Current Missile Statistics

| Spell | Rank | Missiles (W/S/C) | Per-Missile Damage | Current Damage Type |
|---|---|---|---|---|
| Arcane Missiles | 1 | 1/2/3 | +2 blast (ignores ½ AV) | Blast |
| Arcane Barrage | 2 | 3/4/5 | +2 blast (ignores ½ AV) | Blast |

#### The Blast Damage Type Problem

The intended weakness of missile spells is that **AV reduces each missile independently** — against high-AV targets, most of the missile damage is absorbed. However, the blast property (ignores ½ AV) directly undermines this:

| Target AV | Full AV per missile | ½ AV per missile (blast) | Damage lost per missile |
|---|---|---|---|
| 4 | −4 | −2 | Blast saves 2 per missile |
| 8 | −8 | −4 | Blast saves 4 per missile |
| 12 | −12 | −6 | Blast saves 6 per missile |

With 5 missiles (Arcane Barrage critical), blast saves 10–30 total damage against medium-to-heavy armor. This is the opposite of the design intent.

**Recommendation**: Replace blast with a neutral "arcane" or "force" damage type that applies **full AV per missile**. This restores the intended weakness (AV reduces each hit fully) while maintaining the strength (auto-hit, flexible targeting, multiplicative Spell Power).

#### Option A: Move Arcane Barrage to Rank 3

If Arcane Barrage stays at +2 per missile but moves to R3:

| Scenario | Barrage R3 (Critical, 5 missiles) | Wither R3 (Critical) | Comparison |
|---|---|---|---|
| SP 5, no AV | 5 × (2 + 5) = **35** | 8 + 16 + 24... wait — damage = SP + 3×WD = 5 + 24 = **29** | Barrage 121% |
| SP 5, AV 4 (full per missile) | 5 × (7 − 4) = **15** | 29 − 4 = **25** | Barrage 60% |
| SP 5, AV 8 (full per missile) | 5 × (7 − 8) = **0** (min 5) | 29 − 8 = **21** | Barrage 24% |
| SP 5, AV 4 (blast ½ AV) | 5 × (7 − 2) = **25** | 29 − 4 = **25** | Barrage 100% |

With full AV per missile and no blast, Arcane Barrage at R3 is balanced: excellent against unarmored targets (35 vs 29), poor against armored (15 vs 25), and terrible against heavy armor (min damage vs 21). This creates genuine tactical choice.

#### Option B: Apply Multi-Target Damage Scaling to Missiles

If missiles use half-damage scaling: at R2, each missile would deal +3 instead of +2; at R3, each would deal +4. This is a modest increase but treats missiles as standard multi-target, losing their unique identity.

**Assessment**: Option A (move to R3 + force damage type) is the stronger design. It preserves missile identity (auto-hit, flexible targeting, strong vs unarmored) while creating clear counterplay (armor) and removing the blast damage type conflict.

#### Arcane Empowerment Interaction

With Arcane Empowerment (+Arcana per arcane spell damage), missiles still gain the bonus per missile. At Arcana 4 with R3 Barrage and force damage:

| Target AV | Per-Missile (2 + SP 5 + Arcana 4 = 11) | × 5 Missiles | Net Damage |
|---|---|---|---|
| 0 | 11 | **55** | Very high but unarmored |
| 4 | 7 | **35** | Strong |
| 8 | 3 | **15** | Weak |
| 12 | 0 (min 5 total) | **5** | Minimal |

At AV 0, this is extremely high — but Arcane Empowerment is a R4 concentration spell with significant costs (fatigue + paralysis on end). The combination of R3 Barrage + R4 Empowerment represents a 10 Focus investment (6 + 4 minimum). The ceiling is high but the resource cost and AV counterplay keep it bounded.

### 7.7 Summary of Multi-Target & Missile Assessment

| Issue | Severity | Resolution |
|---|---|---|
| AoE spell bonus scaling at R2+ | **Resolved** | Half single-target adopted. Consistent 50% penalty. |
| AoE total throughput (3+ targets) | **Acceptable** | ~2× total at 3 targets is the intended payoff for clustering. |
| Missile blast damage type | **High** | Replace with force/arcane (full AV per missile). Restores intended weakness. |
| Arcane Barrage rank placement | **Medium** | Move to R3 (recommended) or keep at R2 with force damage. |
| Missile + Empowerment stacking | **Medium** | High ceiling acceptable with R4 concentration cost + full AV counterplay. |
| Corpse Explosion anomaly | **Low** | R2 AoE with full single-target damage. Corpse requirement may justify. |
| Existing AoE spells above new guideline | **Medium** | Systematic reduction needed (~−1 per SL at R2, ~−2 per SL at R3). |

---

## 8. Rank Placement Audit

This section evaluates whether spell concepts are placed at appropriate ranks. The focus is on **conceptual power level** — whether the type of effect belongs at that rank — rather than specific damage values.

### 8.1 Potentially Overranked (Concept Too Strong for Current Rank)

| Spell | Current Rank | Conceptual Issue | Recommended Action |
|---|---|---|---|
| **Elemental Ward** (Evocation) | 1 | Resistance to 5 damage types simultaneously is an R2 breadth concept | Limit to 1–2 chosen types at R1, or move to R2 |
| **Protect from Influence** (Light) | 1 | Triple-benefit protection (boon + resistance + bane) is an R2 layered concept | Reduce to one benefit at R1, or move to R2 |
| **Shadow Stride** (Twilight) | 2 | Tactical teleportation is an encounter-shaping concept (R3 territory) | Change to enhanced movement, or move to R3 |
| **Silence** (Twilight) | 1 | Anti-caster zone is a powerful denial concept (D&D Level 2 equivalent) | Consider R2 for area silence; R1 for single-target only |

### 8.2 Potentially Underranked (Concept Too Weak for Current Rank or Too Strong for Unlimited Use)

| Spell | Current Rank | Conceptual Issue | Recommended Action |
|---|---|---|---|
| **Mind Blast** (Telepathy) | 0 | Daze (action denial) at-will is a strong control concept | Move to R1, or change to weaker condition (e.g., briefly distracted) |
| **Charm** (Telepathy) | 1 | Social encounter resolution is a strong concept for R1 | Clarify limitations; consider R2 if scope is broad |

### 8.3 Resurrection Magic Framework

Resurrection is placed higher than D&D defaults due to the game's gritty bronze age / sword & sorcery setting. Bringing back the dead should feel weighty, costly, and rare.

| Concept | Nexus Rank | D&D Equivalent | Rationale |
|---|---|---|---|
| **Revivify** (restore recently dead, within minutes) | **3** | D&D Level 3 (R2) | Even immediate resurrection is already powerful and world-affecting in a gritty setting. R3 ensures it requires a skilled caster. |
| **Raise Dead** (restore dead within days, conditions apply) | **4** | D&D Level 5 (R3) | Restoring someone dead for days is a major miracle. R4 gates this behind expert practitioners. |
| **Resurrection** (restore dead within weeks/months) | **5** | D&D Level 7 (R4) | Peak mortal magic. Reversing death at this scale is the pinnacle of Life tradition mastery. |
| **True Resurrection** | **Does not exist** | D&D Level 9 | Too powerful for mortal-scale magic. Exceeds the bounded power ceiling. |

All resurrection spells should carry heavy costs: material costs (consumed), fatigue, long casting times (ritual), and narrative consequences.

### 8.4 Power Creep Concerns

| Spell | Rank | Conceptual Issue | Recommended Action |
|---|---|---|---|
| **Solar Flare** (Light) | 2 | Three separate benefits (damage + healing + condition removal) in one cast | Reduce to two benefits or move to R3 |
| **Corpse Explosion** (Necromancy) | 2 | AoE with single-target damage values | Review; corpse requirement may justify, but monitor under new scaling |

### 8.5 Incomplete Spells Requiring Rank Validation

| Spell | Current Rank | Likely Correct Rank | Conceptual Concern |
|---|---|---|---|
| Finger of Death (Necromancy) | 3 | **4** | Iconic death spell — direct killing magic is an R4 concept |
| Force Cage (Conjuration) | 4 | **4–5** | Complete battlefield imprisonment may warrant R5 |
| Astral Body (Conjuration) | 4 | **5** | Astral projection is peak mortal magic, even bounded |
| Teleportation Circle (Conjuration) | 3 | **4** | Long-distance network creation is an R4 infrastructure concept |
| Wave of Madness (Telepathy) | 3 | **3–4** | Mass confusion depends on area and duration |
| Silent Night (Twilight) | 2 | **2–3** | Sleep + silence combo may exceed R2 conceptual scope |
| Sense Spirits (Light) | 1 | **1–2** | Wide-area spiritual detection unclear in scope |

---

## 9. Incomplete Spells & Missing Rank 5

### 9.1 Incomplete Spells (18 Total)

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

### 9.2 Missing Rank 5 Spells

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

## 10. Spell Suggestions by School

### 10.1 Most Urgent Expansions

| School | Current | Target | Priority Additions |
|---|---|---|---|
| **War** | 11 | ~20 | R3–5 battle tactics, champion powers, formations |
| **Peace** | 13 | ~25 | Travel magic (Swift Journey, Sanctuary Path), law enforcement (Binding Oath, Zone of Truth) |
| **Telepathy** | 15 | ~30 | Memory spells (Modify Memory, Feeblemind), communication (Sending, Tongues, Comprehend Languages) |
| **Telekinetics** | 14 | ~26 | Complete 3 incompletes, movement utility (Feather Fall, Spider Climb, Passwall), R5 capstones |

### 10.2 High-Priority Suggestions by Discipline/Tradition

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

### 10.3 Suggestion Summary

| Category | Count |
|---|---|
| Complete incomplete spells | 18 |
| Rank 5 capstones (all schools) | 28 |
| Classic fantasy gap-fills | ~30 |
| Tradition/discipline expansions | ~50 |
| **Total suggested additions** | **~126** |

**Rank distribution of suggestions**: R0: 3, R1: ~20, R2: ~22, R3: ~30, R4: ~30, R5: ~28.

---

## 11. Strengths to Preserve

✅ **Necromancy excellence** — Comprehensive, flavorful, mechanically sound (28 spells, 97% complete). Best-in-class depth across raising, controlling, draining, and decay.

✅ **Nature breadth** — Excellent variety across animals, plants, earth, weather (35 spells, 93% complete). Covers all tradition aspects meaningfully.

✅ **Tempest depth** — Largest tradition (33 spells) with strong coverage of storms, lightning, frost, and earthquakes.

✅ **Elemental coverage** — Fire, frost, lightning thoroughly represented across Evocation and Tempest with clear mechanical distinction.

✅ **Low-to-mid tier foundations** — Ranks 0–2 provide 219 spells, giving new characters robust options from the start.

✅ **Thematic identity** — Clear and consistently applied Arcane (transgressive/selfish) vs Mystic (reverent/communal) distinction. Each school has a recognizable personality.

✅ **Healing ecosystem** — Life tradition offers comprehensive restoration. Mystic healing is well-distributed across Life, Nature, and Light.

✅ **Damage scaling framework** — The +2 per rank progression for single-target and "one rank lower" for AoE provides a clean, predictable design scaffold.

---

## 12. Summary of Recommendations

### Priority 1 — Adopted Scaling Changes (Implement Now)

| # | Action | Impact |
|---|---|---|
| 1.1 | **Adopt half-damage AoE scaling at R2+** — Multi-target spell bonus = 50% of single-target (R0–R1 unchanged). Existing R2+ AoE spells need systematic damage reduction. | Consistent 50% penalty replaces shrinking "one rank lower" gap |
| 1.2 | **Adopt area progression by rank** — R0–R1 single/melee only, R2 close/short line, R3 short area, R4 medium area, R5 long area. Nerf Lightning Strike/Bolt from medium line to short line. | Clear area-power budget per rank |
| 1.3 | **Replace blast damage on missiles with force/arcane type** — Full AV per missile hit, restoring intended per-missile AV weakness | Fixes blast property undermining missile balance design |

### Priority 2 — Critical Balance (Immediate)

| # | Action | Impact |
|---|---|---|
| 2.1 | Move Arcane Barrage to Rank 3 (or apply multi-target scaling at R2) | Prevents R2 missile throughput exceeding R3 single-target |
| 2.2 | Audit 3 potentially mis-ranked spells (Mind Blast, Elemental Ward, Silence) | Tighten R0–R1 balance for unlimited/cheap casting |
| 2.3 | Review Corpse Explosion (R2) AoE dealing single-target damage | Ensure consistent scaling or document exception |

### Priority 3 — School Internal Completeness (See §13)

| # | Action | Impact |
|---|---|---|
| 3.1 | Add R1 Quick Action reactive spells to 5 schools missing them (Conjuration, Telekinetics, Death, Nature, Twilight) | Every school gets baseline reactive play |
| 3.2 | Add defensive options to offense-heavy schools (Evocation, War, Tempest) | Ensures no school is purely one-dimensional |
| 3.3 | Add utility/non-combat spells to combat-focused schools | Supports exploration and downtime for all caster types |
| 3.4 | Establish consistent condition/gimmick identities per school | Creates recognizable mechanical personality |
| 3.5 | Design setup+payoff spell combos within each school | Rewards investing deeply in one school |

### Priority 4 — Complete Existing Content

| # | Action | Impact |
|---|---|---|
| 4.1 | Complete 18 incomplete spells (5 critical, 6 high-tier, 7 environmental) | Fills core gaps, enables full R4 tier |
| 4.2 | Validate rank placement of incomplete spells during implementation | Prevents creating new misalignment |

### Priority 5 — Expand High Tiers

| # | Action | Impact |
|---|---|---|
| 5.1 | Design and implement 28 Rank 5 capstones (2 per school) | Creates legendary magic tier across all schools |
| 5.2 | Fill Rank 3–4 gaps in Evocation, War, Death | Provides progression path variety |
| 5.3 | Implement resurrection framework: Revivify R3, Raise Dead R4, Resurrection R5 | Provides gritty bronze age resurrection scaling |

### Priority 6 — Fill Classic & Thematic Gaps

| # | Action | Impact |
|---|---|---|
| 6.1 | Add ~30 classic fantasy spells (utility, combat, support) | Meets player expectations from genre |
| 6.2 | Expand War (→ ~20 spells) and Peace (→ ~25 spells) traditions | Addresses smallest-school problem |
| 6.3 | Add missing thematic content (disease, memory, resurrection, prophecy) | Fills narrative gaps |

### Priority 7 — Damage Type Refinement (See §15)

| # | Action | Impact |
|---|---|---|
| 7.1 | **Introduce "force" damage type** — Full AV per hit, for neutral magical projectiles. Convert 5 blast spells (Arcane Bolt, Arcane Glyph, Arcane Missiles, Arcane Barrage, Hale of Blades) to force | Separates magical projectiles (force, full AV) from concussive effects (blast, ½ AV ignore) |
| 7.2 | Keep blast damage on concussive spells (Kinetic Push, Shockwave, Gust, Thunder Clap, etc.) | Preserves thematic identity of explosive/concussive effects |
| 7.3 | Audit remaining blast spells for correct categorization | Ensures consistent damage type application |

### Priority 8 — Trait Coverage Gaps (See §17)

| # | Action | Impact |
|---|---|---|
| 8.1 | Fill R0 trait gaps for worst-coverage schools (Evocation acid/blast, Telepathy domination/memory, Telekinetics levitate/crush/gravity) | Ensures all traditions/disciplines have cantrip-level representation of their core aspects |
| 8.2 | Fill R0 trait gaps for mystic traditions (Peace travel/law, Tempest earthquakes/sandstorms/floods, Twilight fate) | Provides thematic completeness at the entry level |
| 8.3 | Use trait coverage table (§17) as ongoing design audit tool when adding new spells | Systematic approach to filling gaps across all ranks |

---

## 13. School Internal Design Gap Analysis

This section evaluates each of the 14 schools against the internal completeness requirements:
1. **R1 Quick Action** — At least one reactive (quick) spell at Rank 1
2. **Defensive options** — Spells that protect, mitigate, or shield
3. **Utility/non-combat** — Exploration, travel, downtime, knowledge effects
4. **Damage capability** — Every school should deal damage (even if restricted)
5. **Condition/gimmick identity** — Repeating conditions and signature effects
6. **Setup + Payoff synergies** — Spell combos that reward investing in one school

### 13.1 Arcane Disciplines

#### Conjuration (24 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ❌ **Missing** | No reactive quick spell |
| Defensive options | ✅ | Arcane Barrier, Wall of Force |
| Utility/non-combat | ✅ | Conjure Familiar, Extraplanar Pocket, Arcane Eye |
| Damage capability | ✅ | Arcane Missiles, Arcane Barrage, Force Bolt, Burst of Tendrils |
| Condition identity | ⚠️ Weak | Restrained (2), invisible (2) — no strong repeating theme |
| Setup + Payoff | ⚠️ Weak | Summoning is the main through-line but lacks explicit combo triggers |

**Identity**: Summoning, teleportation, force constructs. The school creates things from nothing.

**Proposed R1 Quick Action**: *Arcane Deflection* — Quick Action when targeted by an attack. Conjure a brief force barrier; gain +2 to Parry or Dodge against the triggering attack. On a critical success, the barrier persists until your next turn.

**Proposed condition identity**: Restrained (force bindings), displaced (forced teleportation). Add restrained effects to more spells for consistent identity.

**Proposed synergy**: Setup = Conjure Familiar (scout/mark target) → Payoff = Missiles/spells gain +1 boon against marked targets. Setup = Wall of Force (split battlefield) → Payoff = enemies near walls vulnerable to force damage.

#### Evocation (18 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | Elemental Ward (resistance to 5 types) |
| Defensive options | ✅ | Elemental Ward |
| Utility/non-combat | ❌ **Missing** | Zero non-combat spells (100% damage/combat) |
| Damage capability | ✅ | Strongest damage school — fire, frost, lightning, acid |
| Condition identity | ✅ | Burning (5), slowed (4), staggered (3) — strong elemental conditions |
| Setup + Payoff | ⚠️ Weak | Elemental variety exists but no explicit combo chain |

**Identity**: Raw elemental destruction. Best-in-class damage across fire, frost, lightning, acid.

**Gap — Utility**: Evocation has zero non-combat spells. Even a pure damage school should have some environmental manipulation.

**Proposed utility spells**: *Elemental Shaping* (R1, reshape small amounts of fire/water/earth/air for environmental effect — light fires, freeze water, clear smoke), *Thermal Control* (R0, regulate temperature in an area — comfort, preserve food, prevent freezing).

**Proposed synergy**: Setup = Apply burning/slowed/staggered condition → Payoff = Evocation spells deal +2 bonus damage to targets already suffering an elemental condition (a hypothetical "Elemental Exploitation" pattern that could be a talent rather than a spell).

#### Illusion (18 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | Mirror Image (create decoys when attacked) |
| Defensive options | ✅ | Mirror Image, Invisibility |
| Utility/non-combat | ✅ | Disguise Form, Illusionary Terrain, Minor Illusion |
| Damage capability | ✅ | Phantasmal Killer, psychic damage spells |
| Condition identity | ✅ | Frightened (2), invisible (2), grappled (illusory restraints) |
| Setup + Payoff | ✅ | Concentration-based layering (6 concentration spells build false reality) |

**Identity**: Deception, false reality, mental manipulation. Well-designed school with good internal completeness.

**Minor gap**: Could benefit from a R0 sensory trick cantrip (create a brief sound/smell/visual to distract).

#### Necromancy (28 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | Death Ward (absorb damage into necrotic shield) |
| Defensive options | ✅ | Death Ward, Necrotic Shield |
| Utility/non-combat | ✅ | Animate Horde, Control Undead, Reaper's Harvest, Speak with Dead |
| Damage capability | ✅ | Excellent — 22/28 spells deal damage |
| Condition identity | ✅ | Stunned (5), paralyzed (3), life drain — strong death/decay theme |
| Setup + Payoff | ✅ | Summon undead → Control Undead. Kill enemies → Corpse Explosion. Drain life → fuel abilities |

**Identity**: Best-in-class design. Death, undead, life manipulation. Strong synergies and coherent identity. Model school for others to emulate.

#### Telekinetics (14 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ❌ **Missing** | No reactive quick spell |
| Defensive options | ⚠️ Weak | No explicit defensive spell (some positioning can serve defensively) |
| Utility/non-combat | ✅ | Levitation, Gravity Orb, Invert Gravity |
| Damage capability | ✅ | Force-based damage, physical manipulation |
| Condition identity | ⚠️ Weak | Prone (2), invisible (2) — no strong repeating theme |
| Setup + Payoff | ⚠️ Weak | Positioning manipulation exists but lacks explicit combo triggers |

**Identity**: Force and movement manipulation. Move things, crush things, alter gravity.

**Proposed R1 Quick Action**: *Kinetic Deflection* — Quick Action when targeted by a ranged attack. Telekinetically deflect the projectile; gain +2 to Dodge against the triggering ranged attack. On a critical success, redirect the projectile to another target in close range.

**Proposed defensive spell**: *Force Shield* (R1, concentrate) — Maintain a telekinetic barrier. Gain +1 AV (situational bonus) for the duration.

**Proposed condition identity**: Prone (knocked down), restrained (held in place), pushed/pulled (forced movement). Add forced movement effects more consistently.

**Proposed synergy**: Setup = Push/pull target into hazard or ally's reach → Payoff = Prone targets take +2 damage from next attack. Setup = Levitate ally → Payoff = Gravity-enhanced attacks deal bonus damage.

#### Telepathy (15 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | Foresight (warn ally), True Strike (enhance next attack) |
| Defensive options | ⚠️ Weak | Foresight is supportive but no direct protection |
| Utility/non-combat | ✅ | Detect Magic, Control Beast, telepathic communication |
| Damage capability | ✅ | Psychic damage spells |
| Condition identity | ✅ | Dazed (2), confused, charmed, dominated — mind control theme |
| Setup + Payoff | ⚠️ Weak | Limited combo potential within the school |

**Identity**: Mind control, mental manipulation, psychic assault. Good condition identity but needs more synergies.

**Proposed defensive spell**: *Mental Shield* (R1) — Briefly gain resistance to psychic damage and +1 boon on saves against charm/fear effects.

**Proposed synergy**: Setup = Charm/daze target (lower mental defenses) → Payoff = Subsequent Telepathy spells against charmed/dazed targets gain +1 boon. Setup = Read thoughts → Payoff = Insight into target grants +1 boon on social or combat interactions.

### 13.2 Mystic Traditions

#### Death (15 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ❌ **Missing** | No reactive quick spell |
| Defensive options | ✅ | Curse of Death (retaliatory curse on attackers) |
| Utility/non-combat | ⚠️ Weak | Limited — mostly combat curses and damage |
| Damage capability | ✅ | 12/15 spells deal damage, necrotic/frost |
| Condition identity | ✅ | Poisoned (3), decay (2), cursed effects — strong plague/curse theme |
| Setup + Payoff | ⚠️ Moderate | Curse chains exist but could be stronger |

**Identity**: Plagues, curses, fear, decay, ancestry. Strong thematic identity but missing reactive play and utility.

**Proposed R1 Quick Action**: *Death's Rebuke* — Quick Action when you take damage from an attack. The attacker suffers +2 necrotic damage (ignoring AV) and is briefly poisoned on a strong success.

**Proposed utility spells**: *Commune with Ancestors* (R1, ritual) — Speak with dead ancestors for guidance on a question. *Sense Death* (R0) — Detect dead creatures, undead, or necrotic energy within close range.

**Proposed synergy**: Setup = Apply curse/poison → Payoff = Death spells deal +2 bonus damage to cursed/poisoned targets. Curse stacking: multiple minor curses build toward a major affliction.

#### Life (15 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | Rapid Vitality (quick healing) |
| Defensive options | ✅ | Life Shield, Blessing of Life, Abundance of Life |
| Utility/non-combat | ✅ | Detect Life, various healing in downtime |
| Damage capability | ⚠️ Restricted | 6/15 spells deal damage — radiant/force, mostly as overload effects |
| Condition identity | ✅ | Dazed (2), stunned (2) — life force overload |
| Setup + Payoff | ⚠️ Moderate | Healing chains exist (heal → buff → sustain) |

**Identity**: Vitality, blessings, community, hope. Primarily healing/support with restricted damage (life force overload).

**Gap — Damage**: Life's damage should feel restricted and defensive — overloading life force, punishing undead, or retaliatory bursts. It should never be efficient for pure offense.

**Proposed damage patterns**: *Vitality Overload* (R1) — Deal radiant damage to a target by overwhelming their body with life energy. Deals +4/+8/+12 but heals the caster for half the damage dealt. Effective against undead, less efficient than Evocation against living targets.

**Proposed synergy**: Setup = Heal ally (activate blessing) → Payoff = Blessed allies gain +1 boon on their next action. Setup = Life Shield (absorb damage) → Payoff = When shield breaks, release stored energy as radiant burst.

#### Light (18 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | Protect from Influence, True Strike |
| Defensive options | ✅ | Blessing of Dawn, Blessing of Light |
| Utility/non-combat | ✅ | Break Curse, Detect Lies, Illuminated Sight (7 utility spells) |
| Damage capability | ✅ | 10/18 spells deal radiant/magical damage |
| Condition identity | ✅ | Blinded (3), reveal invisible (3) — revelation/purification theme |
| Setup + Payoff | ✅ | Anti-undead/illusion combos (reveal → destroy). Blessing → enhanced ally actions |

**Identity**: Sun, illumination, truth, clarity, judgement. Well-rounded tradition with strong identity. Good model alongside Necromancy.

#### Nature (35 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ❌ **Missing** | No reactive quick spell |
| Defensive options | ✅ | Blessing of Nature, Sudden Growth (barrier) |
| Utility/non-combat | ✅ | Excellent — 11+ utility spells (animal messenger, speak with animals, purify water, etc.) |
| Damage capability | ✅ | 19/35 spells deal damage — poison, physical, acid |
| Condition identity | ✅ | Poisoned (4), restrained (3), entangled — strong natural hazard theme |
| Setup + Payoff | ✅ | Beast form → enhanced attacks. Plant growth → entangle → poison. Weather → terrain control |

**Identity**: Harmonious adaptation with natural world. Most versatile tradition (35 spells). Strong across all categories.

**Proposed R1 Quick Action**: *Bark Shield* — Quick Action when targeted by an attack. Briefly harden your skin with bark-like growth; gain +2 AV (situational bonus) against the triggering attack. On a critical success, the attacker takes +2 physical damage from thorns.

#### Peace (13 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | Share Harm (retaliatory damage reflection) |
| Defensive options | ✅ | Blessing of Peace, protective barriers |
| Utility/non-combat | ⚠️ Weak | Anti-Magic Field, Spell-breaking Wave — but missing travel and law enforcement |
| Damage capability | ⚠️ Restricted | 8/13 spells deal damage, but low — psychic/blast deterrent damage |
| Condition identity | ✅ | Dazed (2), charmed, calmed — pacification theme |
| Setup + Payoff | ⚠️ Weak | Limited combo potential; mostly independent effects |

**Identity**: Calmness, protection, selflessness, travel, law. Strong concept but undersized (13 spells) with major thematic gaps.

**Gap — Travel magic**: Core aspect entirely absent. Needs Swift Journey, Sanctuary Path, safe rest, road ward spells.

**Gap — Law enforcement**: No truth/oath/binding spells. Needs Zone of Truth, Binding Oath, Compel Testimony.

**Proposed synergy**: Setup = Calm/pacify target → Payoff = Calmed targets more susceptible to truth-telling or persuasion (social synergy). Setup = Blessing of Peace (protection) → Payoff = Protected allies who don't attack gain enhanced healing or resistance.

#### Tempest (33 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | Storm Shield (defend with Resist, melee counterattack) |
| Defensive options | ✅ | Storm Shield |
| Utility/non-combat | ⚠️ Moderate | Conjure Elemental, Control Winds — limited non-combat variety |
| Damage capability | ✅ | Strongest damage tradition — 28/33 spells deal damage |
| Condition identity | ✅ | Staggered (6), prone (5), deafened (4) — powerful storm/impact theme |
| Setup + Payoff | ✅ | Elemental summon → enhanced storms. Wind control → positioning → lightning strike |

**Identity**: Hurricanes, earthquakes, thunderstorms, sandstorms, floods. Excellent offensive tradition.

**Gap — Utility**: Could benefit from non-combat weather manipulation (calm storms, predict weather, create favorable winds for travel).

#### Twilight (22 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ❌ **Missing** | No reactive quick spell |
| Defensive options | ⚠️ Weak | Obscuring Veil provides concealment but no direct protection |
| Utility/non-combat | ✅ | Dark Sight, Everlasting Night, Obscuring Veil, Shadow Clone (8 utility spells) |
| Damage capability | ✅ | 14/22 spells deal damage — frost/psychic |
| Condition identity | ✅ | Slowed (2), invisible (2), frightened (2) — shadow/dream/fear theme |
| Setup + Payoff | ✅ | Shadow clone → dual attack. Darkness → stealth → ambush. Dream → prophecy |

**Identity**: Moon, dreams, secrets, fate, illusion. Good utility depth but missing reactive play and defense.

**Proposed R1 Quick Action**: *Shadow Veil* — Quick Action when targeted by an attack. Wrap yourself in shadow; the attacker suffers +1 bane on the triggering attack. On a critical success, you become briefly invisible after the attack resolves.

**Proposed defensive spell**: *Moonlight Ward* (R1) — Briefly gain resistance to psychic and frost damage, and +1 boon on saves against fear and sleep effects.

**Proposed synergy**: Setup = Create darkness/shadow area → Payoff = Twilight spells cast from within darkness gain +1 boon or +2 damage. Setup = Dream/prophecy → Payoff = Foreseen events grant allies +1 boon on related actions.

#### War (11 spells)

| Requirement | Status | Details |
|---|---|---|
| R1 Quick Action | ✅ | War Cry (frighten enemies in range) |
| Defensive options | ❌ **Missing** | No defensive spells — entirely offensive/buff focused |
| Utility/non-combat | ⚠️ Weak | Only Haste has non-combat utility |
| Damage capability | ✅ | 9/11 spells deal damage or enhance weapons |
| Condition identity | ✅ | Frightened (3), bleeding (2) — battle fury/intimidation theme |
| Setup + Payoff | ⚠️ Weak | Buff + attack exists but no explicit combo chain |

**Identity**: Fury, pride, blood, justice, triumph. Strong concept but severely undersized (11 spells, no R3+).

**Gap — Defensive**: War tradition should have a "stand your ground" defensive spell (inspired by warrior valor, not pacifism).

**Proposed defensive spell**: *Shield of Valor* (R1) — Briefly gain +2 AV (situational bonus) and immunity to the frightened condition. Fits the "courage in battle" theme.

**Gap — R3+ content**: No spells above R2. Needs Battle Cry (R3, mass buff), Warlord's Presence (R5, avatar of war).

**Proposed synergy**: Setup = Frighten enemy with War Cry → Payoff = Attacks against frightened targets deal +2 damage (a "fear exploitation" pattern). Setup = Weapon blessing → Payoff = Blessed weapon crits apply bleeding.

### 13.3 Gap Summary

#### Missing R1 Quick Action Spells (5 schools)

| School | Proposed Spell | Effect |
|---|---|---|
| Conjuration | Arcane Deflection | Quick, +2 Parry/Dodge vs triggering attack |
| Telekinetics | Kinetic Deflection | Quick, +2 Dodge vs ranged attack, possible redirect |
| Death | Death's Rebuke | Quick, +2 necrotic counterattack when hit |
| Nature | Bark Shield | Quick, +2 AV vs triggering attack, thorn damage |
| Twilight | Shadow Veil | Quick, +1 bane on attacker, possible invisibility |

#### Schools Missing Defensive Options (3 schools)

| School | Gap | Proposed Solution |
|---|---|---|
| Evocation | No defense beyond Elemental Ward | Already has Elemental Ward — but may want an R2 option |
| War | Zero defensive spells | Shield of Valor (R1, +2 AV + fear immunity) |
| Telekinetics | No explicit defense | Force Shield (R1, concentrate, +1 AV) |

#### Schools Missing Utility/Non-Combat (4 schools)

| School | Gap | Proposed Solution |
|---|---|---|
| Evocation | Zero non-combat spells | Elemental Shaping (R1), Thermal Control (R0) |
| War | Minimal utility | Tactical Assessment (R1, read enemy dispositions) |
| Death | Limited utility | Commune with Ancestors (R1, ritual), Sense Death (R0) |
| Tempest | Limited non-combat | Weather Prediction (R0), Favorable Winds (R1, travel aid) |

#### Condition/Gimmick Identity Summary

| School | Primary Conditions | Signature Gimmick |
|---|---|---|
| Conjuration | Restrained, displaced | Summoning, teleportation |
| Evocation | Burning, slowed, staggered | Element choice (fire/frost/lightning/acid) |
| Illusion | Frightened, invisible | False reality, detection vs belief |
| Necromancy | Stunned, paralyzed, life drain | Undead creation, corpse manipulation |
| Telekinetics | Prone, restrained, forced movement | Positioning control, gravity |
| Telepathy | Dazed, confused, charmed, dominated | Mind reading, mental command |
| Death | Poisoned, decayed, cursed | Curse stacking, plague |
| Life | Dazed, stunned (overload) | Healing, blessing, vitality transfer |
| Light | Blinded, revealed | Anti-undead, truth revelation |
| Nature | Poisoned, restrained, entangled | Beast/plant synergy, natural hazards |
| Peace | Dazed, calmed, charmed | Pacification, protection, law |
| Tempest | Staggered, prone, deafened | Storm power, environmental destruction |
| Twilight | Slowed, frightened, invisible | Shadow manipulation, dream/fate |
| War | Frightened, bleeding | Weapon blessing, battle fury |

---

## 14. Spell Tags System Investigation

### 14.1 Proposed System

Each discipline/tradition currently lists 3–5 **traits** (aspects) that define its thematic identity — e.g., Evocation lists *fire, frost, lightning, acid, blast*; Death lists *plagues, curses, fear, decay, ancestry*. These traits serve as design guidelines for which spells belong to which school.

The proposed **spell tags system** would formalize these traits into a mechanical layer between schools and individual spells:

1. Each tradition/discipline defines 3–5 **tags** (identical to current traits).
2. Every spell is assigned one or more tags from its school's list.
3. Casters who learn a tradition/discipline gain access to all spells with matching tags.
4. **Cross-school sharing**: Some tags appear in multiple schools (e.g., "decay" in both Death and Necromancy), allowing limited cross-tradition access.

### 14.2 Potential Benefits

| Benefit | Description |
|---|---|
| **Cross-tradition flexibility** | Shared tags (e.g., Death "decay" + Necromancy "decay") would let casters access thematically overlapping spells across school boundaries |
| **Easier multiclassing** | A character studying both Nature and Death could access "decay"-tagged spells from either, creating organic hybrid builds |
| **Better organization** | Tags provide a searchable, filterable taxonomy for large spell lists — players can browse by tag within their tradition |
| **Themed sub-builds** | Within a single tradition, a caster could specialize in a subset of tags (e.g., a Tempest caster focusing only on "thunderstorms" and "floods" tags) |
| **Design consistency** | Forces spell designers to explicitly categorize each spell's thematic identity |

### 14.3 Potential Drawbacks

| Drawback | Description |
|---|---|
| **Adds complexity layer** | A new mechanical system between schools and spells adds cognitive load for players and GMs |
| **Traditions already function as organizational units** | Casters already choose from their school's full spell list — tags add overhead without changing what's accessible |
| **Could blur school identity** | Cross-school tag sharing might undermine the distinct identity of each tradition/discipline |
| **Bookkeeping for minimal benefit** | Since casters already choose individual spells from their school, tags don't change available options — they just add categorization |
| **Balancing cross-access** | Shared tags create implicit multiclass pathways that need careful balance review |

### 14.4 Comparison to Other Systems

**D&D 5e School Tags**: D&D labels every spell with a school (Evocation, Abjuration, etc.), but these tags have minimal mechanical impact — they exist primarily for organization and the rare "school specialist" feature. The tags don't gate spell access (wizards learn from any school).

**Pathfinder 2e Traditions + Traits**: PF2e uses a two-layer system where spells belong to traditions (Arcane, Divine, Occult, Primal) AND have traits (fire, mental, healing, etc.). Traits serve mechanical functions (resistance interactions, trigger conditions) beyond organization. This works because PF2e has ~700 spells and complex interactions that benefit from granular tagging.

**Nexus RPG Context**: With 279 spells across 14 schools, the current system is small enough that tradition-level organization is sufficient. Each school has 11–35 spells — small enough to browse directly. The PF2e model works for larger spell lists but adds overhead that isn't justified at Nexus's current scale.

### 14.5 Conclusion

**Recommendation: Do NOT implement spell tags as a player-facing mechanical layer.**

The existing trait system already provides thematic guidance for spell design without adding formal mechanics. Spell selection is already flexible — casters choose individual spells from their tradition's full list. Tags would add organizational overhead without meaningful gameplay benefit since the system already allows choosing any spell from your tradition.

**Tags are better used as a DESIGN TOOL** for ensuring trait coverage (see §17) rather than a player-facing mechanic. The trait coverage audit in §17 demonstrates how traits can systematically identify gaps in each school's spell list — this design-side benefit is achieved without exposing tags to players.

If the spell list grows significantly (500+ spells), revisiting tags as an organizational aid may become worthwhile. At the current 279-spell scale, tradition-level access is sufficient.

---

## 15. Force Damage Type Analysis

### 15.1 Problem Statement

The analysis in §7.6 identified that blast damage on missile spells undermines their intended weakness (per-missile AV reduction). This section expands that investigation to determine which spells should use a new **force** damage type vs. retaining **blast**.

### 15.2 Damage Type Definitions

| Type | Identity | AV Interaction | Thematic Use |
|---|---|---|---|
| **Force** (proposed) | Neutral magical energy — not elemental, not psychic, not physical weapons | **Full AV applies** per hit | Magical projectiles, arcane constructs, pure magical energy |
| **Blast** (existing) | Concussive/explosive energy — shockwaves, detonations, sonic booms | **½ AV ignored** (concussive force bypasses armor partially) | Explosions, shockwaves, thunder, concussive wind |

**Key distinction**: Force is precise magical energy that armor can fully deflect. Blast is area concussive force that partially bypasses armor through sheer impact pressure.

### 15.3 Current Blast Damage Spells (11 total)

**Conjuration (5 spells using blast)**:
- Arcane Bolt (R0) — single magical projectile
- Arcane Glyph (R0) — magical trap/explosion
- Arcane Missiles (R1) — multiple magical projectiles
- Arcane Barrage (R2) — volley of magical projectiles
- Arcane Blast (R3) — concussive force wave

**Telekinetics (2 spells using blast)**:
- Kinetic Push (R0) — concussive kinetic wave
- Shockwave (R1) — expanding kinetic shockwave

**Tempest (4 spells using blast)**:
- Gust (R0) — concussive wind blast
- Bursting Crackle (R1) — concussive sonic burst
- Thunder Clap (R2) — concussive thunder
- Shattering Orb (R3) — concussive detonation

**Other (1 spell already using force)**:
- Ancestral Warriors (War, R2) — "+4 force damage" (already correct)

**Untyped candidates**:
- Hale of Blades (Conjuration, R2) — magical energy blades (currently untyped)

### 15.4 Recommended Conversion Table

| Spell | School | Rank | Current Type | Recommended Type | Rationale |
|---|---|---|---|---|---|
| Arcane Bolt | Conjuration | 0 | Blast | **Force** | Pure magical projectile; AV should fully apply |
| Arcane Glyph | Conjuration | 0 | Blast | **Force** | Magical trap energy; not concussive |
| Arcane Missiles | Conjuration | 1 | Blast | **Force** | Per-missile AV is the intended weakness |
| Arcane Barrage | Conjuration | 2 | Blast | **Force** | Per-missile AV is the intended weakness |
| Arcane Blast | Conjuration | 3 | Blast | **Blast** (keep) | Concussive force wave; ½ AV fits thematically |
| Hale of Blades | Conjuration | 2 | Untyped | **Force** | Magical energy blades; should have explicit type |
| Ancestral Warriors | War | 2 | Force | **Force** (keep) | Already correctly typed |
| Kinetic Push | Telekinetics | 0 | Blast | **Blast** (keep) | Concussive kinetic wave |
| Shockwave | Telekinetics | 1 | Blast | **Blast** (keep) | Concussive shockwave |
| Gust | Tempest | 0 | Blast | **Blast** (keep) | Concussive wind |
| Bursting Crackle | Tempest | 1 | Blast | **Blast** (keep) | Concussive sonic burst |
| Thunder Clap | Tempest | 2 | Blast | **Blast** (keep) | Concussive thunder |
| Shattering Orb | Tempest | 3 | Blast | **Blast** (keep) | Concussive detonation |

### 15.5 Summary

**Total changes**: 5 spells change from blast/untyped to force (Arcane Bolt, Arcane Glyph, Arcane Missiles, Arcane Barrage, Hale of Blades). 1 spell is confirmed as already correct (Ancestral Warriors). 7 spells retain blast (all Telekinetics and Tempest blast spells).

**Pattern**: The split follows school lines cleanly — Conjuration's "arcane energy" projectiles become force, while Telekinetics/Tempest's concussive effects remain blast. This reinforces each school's mechanical identity:
- **Conjuration force**: Precise magical projectiles, countered by armor (full AV)
- **Telekinetics blast**: Raw kinetic impact, partially bypasses armor (½ AV ignore)
- **Tempest blast**: Elemental concussive force, partially bypasses armor (½ AV ignore)

**Damage Type Table Update** (for §6.5):

| Category | Types | Notes |
|---|---|---|
| Physical | Bludgeoning, slashing, piercing | Reduced by AV normally |
| Elemental | Fire, Frost, Lightning, Acid | Each has associated conditions |
| Energy | Radiant, Necrotic, **Force**, Blast, Psychic | Force = full AV; Blast = ignores ½ AV |
| Special | Poison | Resisted differently |

---

## 16. Healing Spell Power Level Investigation

### 16.1 Healing Spell Inventory

#### Rank 0 Healing

| Spell | Tradition | Effect (W/S/C or fixed) | Type | Notes |
|---|---|---|---|---|
| Restore Life | Life | +2/+4/+6 HP | Single-target | Standard healing cantrip |
| Life Shield | Life | 5 temp HP | Single-target | Preventive (temp HP) |
| Verdant Blast | Life | Heal 2/4 nearby allies | Multi-target | Hybrid damage + heal |
| Rejuvenation | Nature | +0/+2/+4 HP/turn | Single-target HoT | Healing over time |
| Tranquil Mind | Peace | +2/+4/+6 HP | Single-target | Peace-tradition healing |

#### Rank 1 Healing

| Spell | Tradition | Effect (W/S/C or fixed) | Type | Notes |
|---|---|---|---|---|
| Healing Touch | Life | +4/+8/+12 HP (ritual: heal 1 wound) | Single-target | Core healing spell |
| Rapid Vitality | Life | +2/+4/+6 HP | Quick Action | Half damage, double action economy |
| Blessing of Life | Life | 5 temp HP (heighten: 10/20) | Single-target | Scalable temp HP |
| Overflow of Life | Life | Stops dying OR +3/+6/+9 radiant | Hybrid | Dual-mode spell |
| Vitalizing Weapon | Life | 4 HP on strong/crit hit | Enchant | Heal-on-hit weapon buff |

#### Rank 2 Healing

| Spell | Tradition | Effect (W/S/C or fixed) | Type | Notes |
|---|---|---|---|---|
| Aid | Life | 10 temp HP × up to 4 allies (heighten: 20) | Multi-target | Very efficient preventive HP |
| Hallow Ground | Life | +2 HP/turn (heighten: +4) | Zone HoT | Area healing over time |
| Healing Burst | Life | +3/+6/+9 HP (heighten: +5/+10/+15) | AoE cone | Multi-target burst heal |

#### Rank 3 Healing

| Spell | Tradition | Effect (W/S/C or fixed) | Type | Notes |
|---|---|---|---|---|
| Solar Flare | Light | +3/+6/+9 HP to allies | AoE | Hybrid damage + heal |
| Abundance of Life | Life | +4 HP/turn in zone + heal 1 wound (1/day) | Zone | Powerful sustained healing |

### 16.2 Healing vs. Damage Scaling Comparison

| Rank | Single-Target Damage (W/S/C) | Single-Target Healing | Healing as % of Damage | Assessment |
|---|---|---|---|---|
| 0 | +2/+4/+6 | +2/+4/+6 (Restore Life) | **100%** | ✅ Matched |
| 1 | +4/+8/+12 | +4/+8/+12 (Healing Touch) | **100%** | ✅ Matched |
| 2 | +6/+12/+18 | +3/+6/+9 (Healing Burst, AoE) | **50%** (multi-target) | ✅ Follows AoE scaling |
| 3 | +8/+16/+24 | +4 HP/turn zone (Abundance) | Sustained, not burst | ✅ Different paradigm |

**Quick Action healing**: Rapid Vitality at R1 heals +2/+4/+6 — exactly **50%** of single-target damage (+4/+8/+12). This is correct: bonus action healing that doesn't replace your main action should heal at half the normal rate.

**Multi-target healing**: Healing Burst at R2 heals +3/+6/+9 — exactly **50%** of single-target R2 damage (+6/+12/+18). This perfectly follows the multi-target scaling framework from §6.1.

### 16.3 Action Economy Analysis

In a typical 4-person party, healing competes directly with damage for the caster's Action. Consider:

- **Healing one ally** = not damaging one enemy. If healing matches damage 1:1, the net effect is zero (you restore what the enemy would deal, but don't reduce enemy output).
- **Preventing an ally death** is tactically more valuable than dealing equivalent damage — a dead ally loses all future actions.
- **Therefore**: Healing matching damage 1:1 is slightly favorable to healers, which is appropriate because healing is reactive (requires an ally to be damaged) while damage is proactive.

**Healing Touch at R1 matching damage scaling perfectly (+4/+8/+12)** is correct. The reactive nature of healing (you must have a wounded ally) and the opportunity cost (not dealing damage) balance the 1:1 ratio.

**Quick Action healing (Rapid Vitality) at half damage** is well-designed. It doesn't replace your main Action, so it provides bonus healing on top of whatever else you do. Half scaling prevents it from being strictly better than dedicated healing.

### 16.4 Specific Spell Assessments

**Aid (R2) — Potentially Overtuned?**
Aid grants 10 temp HP to up to 4 allies = 40 total preventive HP for 4 Focus. By comparison:
- Fireball at R2 deals +3/+6/+9 to all targets in area (roughly 6–9 damage per target after SP)
- Aid prevents 40 total damage across the party

However, temp HP has key limitations: it doesn't stack (multiple Aids don't compound), it expires, and it doesn't heal actual damage. The 4-target efficiency is high but the non-stacking rule limits abuse. **Assessment: Probably balanced**, but monitor in play.

**Wound Healing — Appropriately Rare**
Only two spells heal wounds:
- Healing Touch (R1, ritual mode only — extended casting time, not usable in combat)
- Abundance of Life (R3, once per day limit)

This extreme rarity is correct for a gritty system where wounds represent serious injuries. Wound healing should feel like a significant event, not routine.

**Temp HP Economy**
Multiple spells grant temp HP (Life Shield R0: 5, Blessing of Life R1: 5/10/20, Aid R2: 10/20). Since temp HP doesn't stack, these form a graduated shield system rather than a compounding one. This is well-designed.

### 16.5 Scaling Projection for R4–R5

Based on the established patterns, healing at higher ranks should follow:

| Rank | Single-Target Healing (projected) | Multi-Target Healing (projected) | Quick Action (projected) |
|---|---|---|---|
| 4 | +10/+20/+30 | +5/+10/+15 | +5/+10/+15 |
| 5 | +12/+24/+36 | +6/+12/+18 | +6/+12/+18 |

**Recommendation**: When designing R4–R5 Life tradition spells (Mass Restoration, Vitality Field), ensure healing values follow these projections. R5 single-target healing at +12/+24/+36 represents the absolute peak of mortal healing — equivalent to restoring roughly half a high-level character's HP at critical success.

### 16.6 Conclusion

**Healing scaling is well-calibrated.** It matches damage scaling 1:1 for single-target, uses half-scaling for multi-target and Quick Action healing, and wound recovery is appropriately rare. No major balance changes are needed.

**Key findings**:
1. Single-target healing = single-target damage (correct)
2. Quick Action healing = ½ single-target damage (correct)
3. AoE healing follows multi-target scaling naturally (correct)
4. Wound healing is extremely rare — 2 spells total (intentionally gritty)
5. Temp HP doesn't stack, preventing shield-stacking abuse
6. Aid is efficient but balanced by non-stacking temp HP rules
7. Life tradition holds most healing (intentional bottleneck per tradition system)

**Minor recommendations**:
- Ensure R4–R5 healing scales to +10/+20/+30 and +12/+24/+36 respectively
- Consider adding one R3 single-target burst heal to Life (currently R3 only has sustained/zone healing)
- Light and Nature have limited healing — this is intentional but worth monitoring

---

## 17. Trait Coverage Audit (Rank 0 and Cross-Rank)

### 17.1 Methodology

Each school defines 3–5 traits (aspects) that represent its thematic identity. This audit checks whether at least one spell exists for each trait at Rank 0 (cantrip level), providing entry-level representation of the school's full identity. Cross-rank coverage is also assessed.

### 17.2 Arcane Discipline Coverage

#### Evocation: fire, frost, lightning, acid, blast

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| fire | ✅ | ✅ | ✅ | ✅ | — | — | Well-covered (Firebolt, Fireball, etc.) |
| frost | ✅ | ✅ | ✅ | — | — | — | Frost Bolt, Ice Lance, Frost Wave |
| lightning | ✅ | ✅ | ✅ | — | — | — | Shock, Lightning Strike |
| acid | ❌ | ✅ | — | — | — | — | No R0 acid cantrip — gap |
| blast | ❌ | — | — | — | — | — | No R0 blast cantrip — gap |

**R0 gaps**: acid, blast (2 missing). Evocation cantrips cover fire/frost/lightning but lack acid and pure blast options.

#### Illusion: trickery, misdirection, obfuscation, hallucinations, distortion

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| trickery | ✅ | ✅ | ✅ | ✅ | — | — | Minor Illusion, Phantasmal Force |
| misdirection | ✅ | ✅ | ✅ | — | — | — | Distracting Whisper, Mirror Image |
| obfuscation | ✅ | ✅ | ✅ | — | — | — | Blur, Invisibility |
| hallucinations | — | ✅ | ✅ | ✅ | — | — | Phantasmal Force, Phantasmal Killer |
| distortion | ❌ | — | ✅ | — | — | — | Arguably covered by Minor Illusion; no dedicated R0 distortion |

**R0 gaps**: distortion (1 missing, arguable). Good overall coverage.

#### Conjuration: objects, creatures, teleportation, binding, force

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| objects | ✅ | ✅ | ✅ | ✅ | ✅ | — | Conjure tools, weapons, barriers |
| creatures | ❌ | ✅ | ✅ | ✅ | ✅ | — | No R0 creature summon — gap |
| teleportation | ❌ | — | ✅ | ✅ | ✅ | — | No R0 teleport cantrip — gap |
| binding | — | ✅ | ✅ | ✅ | — | — | Force bindings |
| force | ✅ | ✅ | ✅ | ✅ | — | — | Arcane Bolt, Missiles, Barrage |

**R0 gaps**: creatures, teleportation (2 missing).

#### Telepathy: influence, communication, insight, domination, memory

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| influence | ✅ | ✅ | ✅ | — | — | — | Mind Blast, Charm |
| communication | ✅ | ✅ | — | — | — | — | Detect Magic (telepathic sense) |
| insight | ✅ | ✅ | ✅ | — | — | — | Detect Magic, True Strike |
| domination | ❌ | ✅ | ✅ | — | ✅ | — | No R0 domination cantrip — gap |
| memory | ❌ | — | — | — | — | — | No memory spells at any rank — major gap |

**R0 gaps**: domination, memory (2 missing). Memory is absent across ALL ranks.

#### Telekinetics: move, repel, levitate, crush, gravity

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| move | ✅ | ✅ | ✅ | — | — | — | Weak Telekinesis, Kinetic Pull |
| repel | ✅ | ✅ | — | — | — | — | Kinetic Push |
| levitate | ❌ | ✅ | ✅ | — | — | — | No R0 levitate — gap |
| crush | ❌ | — | — | — | — | — | No crush spells at low ranks — gap |
| gravity | ❌ | — | — | — | ✅ | — | No R0 gravity cantrip — gap |

**R0 gaps**: levitate, crush, gravity (3 missing). Only move and repel have cantrip representation.

#### Necromancy: decay, undeath, siphoning, defilement, puppetry

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| decay | ✅ | ✅ | ✅ | ✅ | — | — | Necrotic Grasp, Wither |
| undeath | ✅ | ✅ | ✅ | ✅ | ✅ | — | Animate Dead, Control Undead |
| siphoning | ✅ | ✅ | ✅ | ✅ | — | — | Life Drain, Vampiric Touch |
| defilement | ✅ | ✅ | ✅ | — | — | — | Desecrate, Corpse Explosion |
| puppetry | ✅ | ✅ | ✅ | ✅ | — | — | Control Undead, Animate Horde |

**R0 gaps**: None (0 missing). ✅ Excellent — all 5 traits covered at R0.

### 17.3 Mystic Tradition Coverage

#### Light: sun, illumination, truth, clarity, judgement

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| sun | ✅ | ✅ | ✅ | ✅ | — | — | Sacred Light, Solar Flare |
| illumination | ✅ | ✅ | ✅ | — | — | — | Light cantrip, Illuminated Sight |
| truth | — | ✅ | ✅ | — | — | — | Detect Lies, Break Curse |
| clarity | ❌ | — | — | — | — | — | No R0 clarity cantrip — gap |
| judgement | ❌ | — | — | — | — | — | No R0 judgement cantrip — gap |

**R0 gaps**: clarity, judgement (2 missing).

#### Twilight: moon, dreams, secrets, fate, illusion

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| moon | ✅ | ✅ | ✅ | — | — | — | Moonlight, Dark Sight |
| dreams | ✅ | ✅ | ✅ | — | — | — | Lullaby, dream-related effects |
| secrets | ✅ | ✅ | ✅ | — | — | — | Obscuring Veil, Shadow Clone |
| fate | ❌ | — | — | — | ✅ | — | No R0 fate cantrip — gap (Whispers of Doubt is fear, not fate) |
| illusion | ✅ | ✅ | ✅ | ✅ | — | — | Shadow-based illusions |

**R0 gaps**: fate (1 missing).

#### Life: vitality, blessings, community, hope, fertility

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| vitality | ✅ | ✅ | ✅ | ✅ | — | — | Restore Life, Healing Touch |
| blessings | — | ✅ | ✅ | — | — | — | Blessing of Life |
| community | ✅ | ✅ | ✅ | — | — | — | Verdant Blast (heal allies), Aid |
| hope | ✅ | ✅ | — | — | — | — | Life Shield (protection from despair) |
| fertility | ❌ | — | — | — | — | — | No fertility spells — gap |

**R0 gaps**: fertility (1 missing).

#### Death: plagues, curses, fear, decay, ancestry

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| plagues | ❌ | — | — | — | — | — | No disease/plague cantrip — gap |
| curses | ❌ | ✅ | ✅ | — | — | — | No R0 curse cantrip — gap |
| fear | ✅ | ✅ | — | ✅ | — | — | Glimpse of Mortality |
| decay | ✅ | ✅ | ✅ | ✅ | — | — | Decay, Wither |
| ancestry | ✅ | ✅ | — | — | — | — | Spared from Death |

**R0 gaps**: plagues, curses (2 missing).

#### Nature: earth, water, poison, animals, plants

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| earth | ✅ | ✅ | ✅ | ✅ | ✅ | — | Stone-related spells |
| water | ✅ | ✅ | ✅ | ✅ | — | — | Water manipulation |
| poison | ✅ | ✅ | ✅ | ✅ | — | — | Toxic spells |
| animals | ✅ | ✅ | ✅ | ✅ | ✅ | — | Beast Form, animal spells |
| plants | ✅ | ✅ | ✅ | ✅ | — | — | Thorn, growth spells |

**R0 gaps**: None (0 missing). ✅ Excellent — all 5 traits covered at R0.

#### Tempest: hurricanes, earthquakes, thunderstorms, sandstorms, floods

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| hurricanes | ✅ | ✅ | ✅ | ✅ | — | — | Gust, wind spells |
| earthquakes | ❌ | — | — | ✅ | ✅ | — | No R0 earthquake cantrip — gap |
| thunderstorms | ✅ | ✅ | ✅ | ✅ | ✅ | — | Lightning, thunder spells |
| sandstorms | ❌ | — | — | — | ✅ | — | No R0 sandstorm cantrip — gap |
| floods | ❌ | — | — | ✅ | — | — | No R0 flood cantrip — gap |

**R0 gaps**: earthquakes, sandstorms, floods (3 missing). Only hurricanes and thunderstorms have cantrip representation.

#### Peace: calmness, protection, selflessness, travel, law

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| calmness | ✅ | ✅ | ✅ | — | — | — | Calming presence spells |
| protection | ✅ | ✅ | ✅ | ✅ | — | — | Blessing of Peace, barriers |
| selflessness | ✅ | ✅ | — | — | — | — | Share Harm |
| travel | ❌ | — | — | — | — | — | No travel spells at any rank — major gap |
| law | ❌ | — | — | — | — | — | No law/justice spells at any rank — major gap |

**R0 gaps**: travel, law (2 missing). Both are absent across ALL ranks — major thematic gaps.

#### War: fury, pride, blood, justice, triumph

| Trait | R0 | R1 | R2 | R3 | R4 | R5 | Notes |
|---|---|---|---|---|---|---|---|
| fury | ✅ | ✅ | ✅ | — | — | — | War Cry, weapon blessings |
| pride | ✅ | ✅ | — | — | — | — | Battle presence effects |
| blood | — | ✅ | ✅ | — | — | — | Blood-themed combat spells |
| justice | ❌ | — | — | — | — | — | No R0 justice cantrip — arguably covered by War's combat honor |
| triumph | ❌ | — | — | — | — | — | No R0 triumph cantrip — gap |

**R0 gaps**: justice, triumph (2 missing, arguably covered by War's general combat theme).

### 17.4 R0 Gap Summary

| School | Traits | R0 Coverage | R0 Gaps | Severity |
|---|---|---|---|---|
| **Necromancy** | 5 | **5/5** ✅ | None | — |
| **Nature** | 5 | **5/5** ✅ | None | — |
| **Illusion** | 5 | **4/5** | distortion (arguable) | Low |
| **Twilight** | 5 | **4/5** | fate | Low |
| **Life** | 5 | **4/5** | fertility | Low |
| **Conjuration** | 5 | **3/5** | creatures, teleportation | Medium |
| **Light** | 5 | **3/5** | clarity, judgement | Medium |
| **Death** | 5 | **3/5** | plagues, curses | Medium |
| **War** | 5 | **3/5** | justice, triumph | Medium |
| **Evocation** | 5 | **3/5** | acid, blast | Medium |
| **Telepathy** | 5 | **3/5** | domination, memory | Medium–High |
| **Peace** | 5 | **3/5** | travel, law | High (absent ALL ranks) |
| **Telekinetics** | 5 | **2/5** | levitate, crush, gravity | High |
| **Tempest** | 5 | **2/5** | earthquakes, sandstorms, floods | High |

### 17.5 Priority Gap-Fill Recommendations

#### Highest Priority (traits absent across ALL ranks)

| School | Missing Trait | Proposed Cantrip | Effect |
|---|---|---|---|
| **Peace** | travel | *Wayfinder's Mark* (R0) | Briefly mark a path; allies gain +1 boon on navigation within close range |
| **Peace** | law | *Binding Word* (R0) | Target must speak truthfully for one statement (vs. Resist); briefly only |
| **Telepathy** | memory | *Surface Recall* (R0) | Read one surface memory from willing target; brief flashes only |

#### High Priority (3 traits missing at R0)

| School | Missing Traits | Proposed Cantrips |
|---|---|---|
| **Telekinetics** | levitate, crush, gravity | *Minor Levitation* (R0, briefly lift small object), *Pressure Grip* (R0, squeeze held target for +2/+4/+6), *Gravity Shift* (R0, briefly alter gravity on small object) |
| **Tempest** | earthquakes, sandstorms, floods | *Tremor* (R0, briefly shake ground in melee range), *Sand Gust* (R0, blind one target briefly with sand/dust), *Splash* (R0, conjure a splash of water to push/distract) |

#### Medium Priority (2 traits missing at R0)

| School | Missing Traits | Proposed Cantrips |
|---|---|---|
| **Evocation** | acid, blast | *Acid Splash* (R0, +2/+4/+6 acid damage), *Concussive Pop* (R0, +0/+2/+4 blast in melee area) |
| **Conjuration** | creatures, teleportation | *Conjure Vermin* (R0, summon tiny creature briefly for distraction), *Blink Step* (R0, teleport to melee range briefly) |
| **Telepathy** | domination, memory | *Commanding Thought* (R0, one brief mental command — move/stop), *Surface Recall* (see above) |
| **Death** | plagues, curses | *Miasma* (R0, sicken one target briefly), *Minor Hex* (R0, target suffers +1 bane on next roll) |
| **Light** | clarity, judgement | *Moment of Clarity* (R0, remove one minor condition from ally briefly), *Stern Gaze* (R0, compel target to hesitate — briefly dazed vs. Resist) |
| **War** | justice, triumph | *Righteous Strike* (R0, +2/+4/+6 to weapon attack against enemy who attacked ally), *Victor's Rush* (R0, gain +1 movement after defeating enemy) |

### 17.6 Conclusion

**Two schools (Necromancy, Nature) have perfect R0 trait coverage** — every aspect has cantrip-level representation. These serve as models for other schools.

**Five schools have significant gaps (3+ traits missing at R0)**: Telekinetics, Tempest, Conjuration, Telepathy, and Evocation. These schools lack cantrip-level representation for core aspects of their identity.

**Two schools have traits absent across ALL ranks**: Peace (travel, law) and Telepathy (memory). These are the most critical gaps — entire thematic pillars with zero spell support at any rank.

**Recommendation**: Use this trait coverage audit as an ongoing design tool when adding new spells. Before designing a new spell for a school, check the coverage table and prioritize filling gaps over adding depth to already-covered traits. The trait system works best as an internal design checklist (see §14 conclusion) rather than a player-facing mechanic.

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
- Damage: +2/+4/+6 single, +0/+2/+4 multi-target.
- Duration: Briefly–Short. Area: Single-target only. Range: up to Medium.
- No lasting effects beyond "briefly." No permanent creation.

### Rank 1 (Basic Spells)
- Bread-and-butter combat and utility. Focus 2, TN 8.
- Damage: +4/+8/+12 single, +2/+4/+6 multi-target.
- Duration: up to Medium. Area: Single-target only. Range: up to Medium.
- Single-target control. Short buffs/debuffs. Basic utility.

### Rank 2 (Intermediate Spells)
- First rank with standard AoE spells. Focus 4, TN 10.
- Damage: +6/+12/+18 single, +3/+6/+9 multi-target (half of single-target spell bonus).
- Duration: Short–Medium. Area: Close area or short line. Range: Medium–Long.
- Battlefield control begins. Moderate healing.

### Rank 3 (High-Power Spells)
- Encounter-defining effects. Focus 6, TN 12.
- Damage: +8/+16/+24 single, +4/+8/+12 multi-target (half of single-target spell bonus).
- Duration: Short–Medium. Area: Short area (larger than R2 close area). Range: Long.
- Powerful control and transformation. Hybrid damage + utility.

### Rank 4 (Transformation Spells)
- Major transformations and powerful effects. Focus 8, TN 14.
- Damage: +10/+20/+30 single, +5/+10/+15 multi-target (half of single-target spell bonus).
- Duration: Short–Medium. Area: Medium area. Range: Long–Extreme.
- Form alterations, major barriers, planar interaction.

### Rank 5 (Peak Mortal Power)
- Legendary mastery, NOT world-shattering. Focus 10, TN 16.
- Damage: +12/+24/+36 single, +6/+12/+18 multi-target (half of single-target spell bonus).
- Duration: Short–Medium (max). Area: Long area. Range: Extreme.
- Mass buffs/healing, major control, legendary utility. Always costly, always escapable.

**Area Progression** (ascending): Close < Short < Medium < Long. See §6.2 for full framework. R0–R1 spells are single-target by design; rare melee-range exceptions (e.g., Shroud of Fear) exist but should not be treated as standard AoE.

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
