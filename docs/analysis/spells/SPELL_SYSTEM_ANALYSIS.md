# Spell System — Design Analysis

> **Scope:** Comprehensive analysis of the Nexus RPG spell system covering coverage, balance, damage scaling, rank placement, single-target vs multi-target throughput, and expansion recommendations across 6 arcane disciplines and 8 mystic traditions.

---

## 1. Executive Summary

### Key Findings

1. **R5 tier is now complete across all 14 schools.** After the P5 Mystic R5 batch (2026-07-14), all 14 traditions and disciplines have at least one R5 spell. Rank 5 now holds 31+ spells (5 arcane tracked pre-P5.2 arcane batches + 26 mystic: *Fulminate*, *Resurrection*, *Control Weather*, *Earthquake*, *Lightning Storm*, 4 Conjuration capstones, and the full P5 mystic haul of 22 spells across War/Peace/Light/Twilight/Death/Life/Nature/Tempest). The system-wide total reaches ~389 spells.
2. **Multi-target damage should use half single-target scaling at Rank 2+.** The previous "one rank lower" guideline used a flat −2 reduction that became proportionally weaker at higher ranks. The revised approach halves the single-target spell bonus for multi-target spells at R2+ (R0–R1 unchanged), creating a consistent 50% penalty that remains meaningful at all ranks. Spell Power and spell catalyst bonuses apply equally, so the actual per-target gap narrows in play — but still rewards clustering 3+ targets as an intentional AoE payoff.
3. **Missile spells need damage type reconsideration.** Arcane Missiles/Barrage currently use blast damage (ignoring ½ AV), but the intended weakness is per-missile AV reduction. The blast property undermines this by halving AV before it applies. A neutral "arcane" damage type with full AV application per missile would better serve the design intent. Moving Arcane Barrage to Rank 3 is also under consideration as an alternative or complementary fix.
4. **War, Peace, and Death traditions are undersized.** War (15 spells, R3 tier published in v0.12.0) and Peace (15) now reach R3 but stop there. Death is the thinnest above R1 (only 2 spells each at R2 and R3). All three have full audited seed sets ready for design batches.
5. **Most classic fantasy spells are now covered.** The v0.10.0–v0.11.1 batches added the missing utility staples (Knock, Identify, Sending, Feather Fall, Comprehend Languages as Borrowed Tongue, Augury, Divination, scrying as Distant Eye/Moonlit Mirror), combat classics (Sleep, Grease, Banishment, Disintegrate, Gaseous Form, Zone of Truth, Diminish), and support classics (Resurrection, Mage Armor, arcane Haste, Stone Skin rename). Remaining absentees: Water Breathing, Spider Climb, Passwall, Web, Polymorph Others, Mass Hold Person, and the mid resurrection rungs (Revivify R3, Raise Dead R4).
6. **Only 3 spells remain incomplete** (stub effect text): *Prismatic Missile* (Evocation R2), *Detect Life* (Life R2), *Stone Pillar* (Nature R3). The former R4 backlog (Control Weather, Tree Stride, Sandstorm, Control Winds, Earthquake, Lightning Storm, Orbiting Shards, Distortion Field, Astral Body, Teleportation Circle, and others) is fully published.
7. **Thematic identity is well-executed.** The Arcane (transgressive/selfish) vs Mystic (reverent/communal) distinction is clear and consistently applied across all schools. Necromancy, Nature, and Tempest are exemplary in depth and coherence.
8. **Every school now has an R1 Quick Action reactive** (P3 published Arcane Deflection, Death's Rebuke, Bark Shield, Dusk Veil for the four that lacked one). Separately, several published R1 quick spells predate the standardized reactive pattern (+2 Dodge/Parry, school secondary, no SL scaling) and are flagged for alignment review in their school checklists (e.g. Death Ward, War Cry is offensive not reactive).
9. **School internal design is now systematically mapped and seeded.** All 14 per-school design-space files (docs/analysis/spells/schools/) carry a full synergy declaration (setup/payoff/extender levers, solo engine, party interlock), a trait×rank coverage matrix, and an **audited seed table** (~200 seeds total) in a uniform format: every seed states its combat role, synergy role, the traits and conditions it engages, and what it combos with. Overlap-with-published and "bigger version of X" seeds were culled or converted to Heighten extensions in the 2026-07 seed audit (§13 is a pointer).
10. **Spell tags between schools and spell lists add complexity without meaningful gameplay benefit.** Traits work better as design tools for coverage auditing (§17) than as a player-facing mechanical layer.
11. **A "force" damage type (full AV per hit) should replace blast on 5 arcane projectile spells**, preserving blast (½ AV ignore) for concussive effects only. This clarifies the mechanical distinction between magical projectiles and explosive concussive force (§15).
12. **Healing spell scaling matches damage scaling 1:1 for single-target**, with Quick Action healing appropriately halved and AoE healing following multi-target scaling. No major rebalancing needed (§16).
13. **Trait×rank coverage is tracked per school with honest gaps.** Every school's matrix in `docs/analysis/spells/schools/` now marks each slot as published, seeded (✨), covered by a proposed Heighten extension, or an honest empty cell (a deliberate non-goal — e.g. Twilight moon R5, Telekinetics crush R0/R4, Nature water R3/R4). Published coverage above R2 remains the systemic weak point; the seeds are the closing plan.

### Design Principles

1. **Bounded power ceiling** — Rank 5 equals D&D Level 7 (Delayed Blast Fireball, Plane Shift), not Level 9 (Wish, Meteor Swarm). All effects must be temporary, escapable, and mortal-scale.
2. **AoE must trade damage for targets** — Multi-target spells deal half single-target spell bonus at Rank 2+ (R0–R1 unchanged). This ensures AoE is rewarding against clustered groups (3+ targets) but never strictly superior to focused fire.
3. **Spell Power adds depth, not dominance** — The ½ Attribute base damage ensures casters always contribute, but total throughput with modifiers must not exceed bounded ceilings.
4. **Focus is the primary resource constraint** — Higher-rank spells cost more Focus (2/4/6/8/10 by rank), gating power behind resource management rather than unlimited scaling.
5. **Traditions/disciplines should cover their Excel and Decent roles** — Each school should have spells across its primary and secondary roles, with Weak roles deliberately limited.
6. **Area scales with rank** — R0–R1 spells are almost all single-target (rare melee AoE). R2 affects close area or short line. R3 affects short area. R4 affects medium area. R5 affects up to long area.
7. **Every school needs internal completeness** — Each school should have: at least one R1 Quick Action reactive spell, defensive options, utility/non-combat effects, some damage capability (even if restricted), repeating conditions/gimmick identity, and setup+payoff synergies.
8. **Spells assist, never bypass** — Travel, social, and exploration spells should provide bonuses on skill checks (boons, reduced difficulty) rather than automatically succeeding at challenges. Magic enhances the game modes without trivializing them.
9. **SL scales magnitude, not effect type** — Primary utility and control effects (conditions, target counts, durations) must be reliable on any success. Only damage, healing, and secondary effects (bonus banes, tactical options) should scale by Success Level. A control spell that applies "dazed" on Weak should still apply "dazed" on Critical — the Critical adds damage or secondary debuffs, not an upgrade to "stunned" or "dominated."
10. **Heighten, don't duplicate** — Higher-rank versions of existing spells should use the Heightened mechanic, not become entirely new spells. "Conjure Guardian" at R3 is a heightened "Conjure Familiar" — not a separate spell entry. Reserve new spell slots for genuinely different concepts.
11. **Standardized reactive defense pattern** — Every school's R1 Quick Action reactive spell follows the same base template: "+2 to Dodge or Parry against the triggering attack" with one school-specific secondary effect (no SL scaling). This mirrors the weapon enhancement pattern where all traditions share the same base (+2 damage) with unique secondaries.
12. **R5 material costs match item economy** — Rank 5 spells with material cost components should use costs appropriate to the Q6-Q7 item economy (5,000+ coins), not trivial amounts. These spells are available at the same power level where Q6-Q7 items circulate.
13. **Aspects are thematic seeds, not literal requirements** — When filling trait×rank gaps, don't force literal interpretations. A "teleportation" cantrip doesn't require actual teleportation at R0 — it means spatial manipulation appropriate for that power level. Think creatively: interact-at-range, spatial awareness, dimensional echoes.

---

## 2. Spell Coverage by Discipline & Tradition

*Counts regenerated from `docs/07-magic` on 2026-07-13.*

### 2.1 Arcane Disciplines (154 spells)

| Discipline | R0 | R1 | R2 | R3 | R4 | R5 | Total | Strengths | Gaps |
|---|---|---|---|---|---|---|---|---|---|
| **Conjuration** | 3 | 8 | 8 | 7 | 5 | 4 | **35** | Versatile summons, missiles, teleport, first school complete R0–R5 (P5.1) | — |
| **Evocation** | 3 | 9 | 6 | 3 | 3 | 1 | **25** | Full damage curve R0–R5 restored | R5 breadth (Fulminate only) |
| **Illusion** | 3 | 6 | 7 | 4 | 1 | 0 | **21** | Stealth, deception, belief-collapse payoffs | No R5 |
| **Necromancy** | 5 | 8 | 7 | 6 | 5 | 0 | **31** | Best-in-class depth and theme, corpse-free hedge published | No R5 capstone |
| **Telepathy** | 3 | 7 | 6 | 5 | 2 | 0 | **23** | Mind control, influence ladder complete | No R5 |
| **Telekinetics** | 3 | 7 | 7 | 5 | 1 | 0 | **23** | Forced movement, in-school payoffs published | Thin R4, no R5 |
| **Arcane Total** | **20** | **45** | **41** | **30** | **17** | **1** | **154** | — | — |

### 2.2 Mystic Traditions (213 spells)

| Tradition | R0 | R1 | R2 | R3 | R4 | R5 | Total | Strengths | Gaps |
|---|---|---|---|---|---|---|---|---|---|
| **Death** | 5 | 7 | 5 | 4 | 1 | 3 | **25** | Curses, ancestry, affliction-harvest engine with its R4 battery, full R5 trio | — |
| **Life** | 3 | 5 | 6 | 3 | 3 | 3 | **23** | Full resurrection ladder, Wellspring of Life, Genesis | — |
| **Light** | 4 | 9 | 4 | 4 | 2 | 2 | **25** | Anti-undead, revelation, Dawnbreak + Final Judgement capstones | — |
| **Nature** | 6 | 9 | 13 | 9 | 3 | 4 | **44** | Largest school, full breadth, Control Weather + Cataclysmic Eruption + Primeval Form + Primal Awakening | — |
| **Peace** | 3 | 5 | 4 | 4 | 2 | 3 | **21** | Defense, protection, Sanctuary Sphere + Sacred Covenant + Pilgrim's Road | — |
| **Tempest** | 3 | 10 | 9 | 5 | 5 | 4 | **36** | Healthiest top end (5×R4, 4×R5 with Avatar of Storms promoted + Eye of the Storm + Magma Geyser R4 added) | — |
| **Twilight** | 5 | 7 | 12 | 5 | 5 | 4 | **38** | Stealth, shadow, dreams, fate, full R4 tier + Dream Realm/Shadowform/Fate's Decree/Phantom World R5 | — |
| **War** | 3 | 6 | 4 | 4 | 3 | 3 | **23** | Combat buffs, full fear+bleed engine to R4, Avatar of War + Final Triumph + Divine Retribution R5 | — |
| **Mystic Total** | **32** | **58** | **57** | **38** | **24** | **26** | **235** | — | — |

### 2.3 System-Wide Distribution

| Rank | Arcane | Mystic | Total | Status |
|---|---|---|---|---|
| 0 | 20 | 32 | **52** | ✅ Excellent — strong cantrip foundations |
| 1 | 45 | 58 | **103** | ✅ Excellent — broad basic options, every school has its standard-chassis R1 reactive |
| 2 | 41 | 57 | **98** | ✅ Strong — Fireball-tier diversity |
| 3 | 30 | 38 | **68** | ✅ Strong — every school holds at least 3 spells |
| 4 | 17 | 24 | **41** | ✅ Healthy — every school publishes at least one R4 spell, and the four thin schools got their breadth (P4.5 batch, 2026-07-13) |
| 5 | 5 | 26 | **31+** | ✅ Complete — all 14 schools have at least one R5 spell (arcane count of 5 predates P5.2–P5.4 arcane batches; mystic count accurate to 2026-07-14) |
| **Total** | **158** | **235** | **393** | — |

**Key Observations**:
- **Excellent coverage**: Nature (44), Twilight (38), Tempest (36), Necromancy (31), Conjuration (35) are the best-developed schools.
- **Rank 5 complete**: every school holds at least one R5 spell after the P5 Mystic batch (2026-07-14). R5 now has 31+ spells system-wide.
- **Rank 3 unevenness**: the total looks adequate but Evocation (1) and Telepathy (1) have holes right where their damage/control curves should peak.
- **Incomplete backlog cleared to 3 stubs**: Prismatic Missile (Evocation R2), Detect Life (Life R2), Stone Pillar (Nature R3).

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

### 3.2 Classic Coverage Status (updated after v0.10.0–v0.11.1)

**Added — Utility** (batch 1, v0.10.0): Knock, Identify, Sending, Feather Fall, Comprehend Languages (*Borrowed Tongue*), Augury, Divination, Scrying (*Distant Eye* arcane / *Moonlit Mirror* mystic), Legend Lore (partially, via *Psychometry* Heighten), plus Arcane Lock, Illuminated Script, Gift of the Wild, Warded Threshold, Updraft.

**Added — Combat** (batch 2, v0.11.0): Sleep, Grease, Banishment (+ mystic *Serene Exile*), Disintegrate, Gaseous Form, Zone of Truth, Enlarge/Reduce (Enlarge = existing *Law of the Strongest*; Reduce = new *Diminish*). Also filled: *Finger of Death*, *Force Cage*, and the new R5 *Resurrection* as Disintegrate's sole countermeasure.

**Added — Support** (batch 3, v0.11.1): Mage Armor, Haste (arcane, Telekinetics), Stoneskin (*Rock Skin* renamed to *Stone Skin* + R5 heighten). Already covered by existing spells: Shield (*Necrotic Shield*), Death Ward (*Death Ward*, Necromancy), Regenerate (*Healing* wound ritual, *Vitality Field*), Slow (mystic *Slow* exists; the slowed condition is widely available in arcane spells as riders).

**Added — Batch 4** (completes the classic gap list): Web (Conjuration R2), Polymorph (Nature R3), Mass Hold (Telepathy R4), Part Stone (Telekinetics R3, the classic Passwall as a permanent bore), Revivify (Life R3) and Raise Dead (Life R4) completing the resurrection ladder, plus the two remaining Conjuration R4 stubs filled: Astral Body (shared Conjuration/Telepathy) and Teleportation Circle. Water Breathing and Spider Climb were confirmed already covered by *Gift of the Wild* (Nature R2, its Gills and Spiderlimbs options).

**Still missing** (deliberately deferred, not classic staples): Passwall's phase-through variant (Part Stone bores instead), and niche transmutation like Flesh to Stone beyond *Petrification*. The high-priority classic gap list from this section is now **cleared**.

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
| Travel magic | Peace | Nearly absent — only Warded Threshold (R2) published; rest is concept seeds |
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

**Open Question — Force Damage Type**: Missile spells (Arcane Missiles, Arcane Barrage) currently use blast damage, which ignores ½ AV. However, the intended weakness of missile spells is per-missile AV reduction. Blast's ½ AV ignore undermines this. A "force" damage type that applies full AV per hit would better serve the design intent. See §7.6 for detailed analysis and §15 for the full force vs. blast type split proposal.

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

**Resurrection Framework**: Resurrection is placed higher than D&D defaults — Revivify at R3, Raise Dead at R4, Resurrection at R5. True Resurrection does not exist. See §8.3 below for the detailed resurrection framework.

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
| ~~Finger of Death (Necromancy)~~ | — | **4** | ✅ Resolved — published at R4 in v0.11.0 |
| ~~Force Cage (Conjuration)~~ | — | **4** | ✅ Resolved — published at R4 in v0.11.0 (durability stats, breakable) |
| ~~Teleportation Circle (Conjuration)~~ | — | **4** | ✅ Resolved — published at R4 |
| ~~Wave of Madness, Silent Night, Sense Spirits~~ | — | — | ✅ Resolved — published complete at their ranks |
| ~~Astral Body (Conjuration/Telepathy, shared)~~ | 4 | **4** | ✅ Re-validated at R4 during the P5.1 Conjuration R5 batch (2026-07-13): scouting-only form, tight tether, snap-back on damage sit under the R5 ceiling. Tether re-worded to "a thousand paces" (principle 71 errata, both copies + Alarm) |
| Prismatic Missile (Evocation) | 2 | **2** | Stub — validate on completion |
| Detect Life (Life) | 2 | **2** | Stub — validate on completion |
| Stone Pillar (Nature) | 3 | **3** | Stub — validate on completion (ceiling-crush wording needs bounding) |

---

## 9. Incomplete Spells & the R4–R5 Frontier

### 9.1 Incomplete Spells (3 remaining)

The former 16-spell backlog is cleared. Remaining stubs (placeholder effect text only):

- **Prismatic Missile** (Evocation R2) — multi-element missile concept
- **Detect Life** (Life R2) — life-sense divination
- **Stone Pillar** (Nature R3) — terrain-shaping pillar (current stub text implies a ceiling-crush use that needs bounding at design time)

### 9.2 The Rank 4–5 Frontier

5 R5 spells and 41 R4 spells are published; 10 schools lack R5 and none lack R4 (P4 + P4.5 batches). Per-school status (seeds = audited concepts in `docs/analysis/spells/schools/`, updated 2026-07-13):

| School | Published R4 / R5 | Top-tier seeds ready | Next design target |
|---|---|---|---|
| War | 3 / 0 | Avatar of War, Final Triumph, Divine Retribution (R5) | R5 batch |
| Peace | 2 / 0 | Sanctuary Sphere, Sacred Covenant, The Pilgrim's Road (R5) | R5 batch |
| Light | 2 / 0 | Dawnbreak, Final Judgement (R5) | R5 batch |
| Illusion | 1 / 2 | — (Mirage Arcane, Maze of Madness published 2026-07-13) | ✅ R5 capped |
| Death | 1 / 0 | Inexorable Doom, Pall of the Grave, Ancestral Convergence (R5) | R5 batch |
| Evocation | 3 / 2 | R5 breadth seeds (frost/acid/air) | R5 breadth (Smoldering Star published 2026-07-13) |
| Telepathy | 2 / 3 | Shatter Psyche, Prescient Awareness (R4 additions) | ✅ R5 capped (Psychic Maelstrom, Absolute Control, Mindwipe published 2026-07-13) |
| Telekinetics | 1 / 1 | Telekinetic Storm, Telekinetic Flight, Repulsion Field (R4) + Heighten extensions | R4 breadth (Annihilating Wave R5 published 2026-07-13) |
| Twilight | 5 / 0 | Dream Realm, Shadowform, Fate's Decree, Phantom World, Everlasting Night (R5) | R5 batch (resolve Phantom World vs. Mirage Arcane first) |
| Necromancy | 5 / 4 | — (Soul Harvest, Entropy, Eternal Servitude, Desecration published 2026-07-13) | ✅ R5 capped |
| Conjuration | 5 / 4 | — (P5.1 published 2026-07-13: Planar Gateway, Binding Seal, Arcane Genesis, Subjugation) | ✅ Complete R0–R5 |
| Life | 3 / 1 | Wellspring of Life, Genesis (R5) | R5 breadth |
| Nature | 3 / 1 | Cataclysmic Eruption, Primeval Form, Primal Awakening (R5) | R5 breadth |
| Tempest | 5 / 2 | Breadth polish seeds only | Healthy — lowest priority |

The old concept lists formerly in this section are superseded by the per-school seed tables, which carry synergy roles and tag engagement per seed.

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

| School | Current | Target (published + seeds) | Priority Additions |
|---|---|---|---|
| **Death** | 15 | ~31 | R2–R3 first (2 spells each today): the affliction-harvest engine (Grave Chill, Weight of Dooms, The Reckoning) before any R4–R5 |
| **War** | 15 | ~28 | R4–R5 battle magic (Blood Frenzy, Champion's Challenge, Avatar of War) — R3 tier published in v0.12.0 |
| **Peace** | 15 | ~34 | Travel and law pillars through R5 (Binding Oath, Safe Passage, Sanctuary Sphere) |
| **Evocation** | 19 | ~38 | R3–R4 hole (1 spell at R3, 0 at R4 despite an R5): Chain Lightning, Cone of Cold, Wall of Fire tier |
| **Telepathy** | 19 | ~36 | R3 hole (1 spell), then the influence-ladder top (Break the Will, Absolute Control) |
| **Telekinetics** | 19 | ~30 | In-school payoffs at R2–R3 (Grinding Weight, Kinetic Implosion, Meteoric Throw), then R4–R5 |

### 10.2 Per-School Suggestions

**Moved — superseded by the conceptual seed tables** in each school's file under `docs/analysis/spells/schools/` (section "Proposed New Spells") and the synergy gap sketches in each school's Internal Synergies section. Those are the maintained suggestion lists; the lists previously here were stale drafts.

## 11. Strengths to Preserve

✅ **Necromancy excellence** — Comprehensive, flavorful, mechanically sound (28 spells). Best-in-class depth across raising, controlling, draining, and decay.

✅ **Nature breadth** — Largest school (38 spells) with excellent variety across animals, plants, earth, water, poison, and a published R5 (Control Weather).

✅ **Tempest depth** — 34 spells and the system's healthiest top end (4 at R4, 2 at R5).

✅ **Elemental coverage** — Fire, frost, lightning thoroughly represented across Evocation and Tempest with clear mechanical distinction.

✅ **Low-to-mid tier foundations** — Ranks 0–2 provide 235 spells, giving new characters robust options from the start.

✅ **Thematic identity** — Clear and consistently applied Arcane (transgressive/selfish) vs Mystic (reverent/communal) distinction. Each school has a recognizable personality.

✅ **Healing ecosystem** — Life tradition offers comprehensive restoration. Mystic healing is well-distributed across Life, Nature, and Light.

✅ **Damage scaling framework** — The +2 per rank progression for single-target and "one rank lower" for AoE provides a clean, predictable design scaffold.

---

## 12. Summary of Recommendations — Road to Fully Healthy Schools

*Reworked 2026-07-10 after the seed audit. "Fully healthy" means: no stubs, every school has its R1 reactive, its declared synergy engine has published rungs at every stage (setup, payoff, extender), its Excels/Decent roles are covered R0–R5, and it has at least one R4 and one R5 spell. Every design batch below draws from the audited seed table in the school's file and runs through the spell-design skill.*

### Priority 1 — Finish What Is Started — ✅ DONE (published 2026-07-10)

| # | Action | Impact |
|---|---|---|
| 1.1 | Complete the 3 remaining stubs: **Prismatic Missile** (Evocation R2), **Detect Life** (Life R2), **Stone Pillar** (Nature R3) | Zero incomplete spells in the published docs |
| 1.2 | Publish the pending Heighten extensions logged in school files: Moonbeam R3–R5 (Twilight), Spectral Army R4–R5 (Necromancy), Shockwave / Telekinetic Volley / Gravity Orb / Strong Telekinesis (Telekinetics), Major Illusion R3–R4 (Illusion) | Covers many upper trait×rank slots without new spell entries (principle 3) |
| 1.3 | ~~Acid Splash durability rework~~ **Rejected by owner** (2026-07-10, principle 51): published R0 text (ignore 1/2 AV) stays — at-will Durability checks are far too powerful. Acid's Durability identity starts at R2+ (§15B) | Decision recorded; no doc change |
| 1.4 | Fix stale **"encumbrance limit"** → **carrying capacity** in Weak Telekinesis and Strong Telekinesis (principle 52; system-wide sweep found no other spells) | Published text matches current Carrying Capacity rules |

### Priority 2 — Sick Schools First — ✅ DONE (all five batches published 2026-07-10, plus the multi-target/multi-hit/healing scaling audit)

| # | Batch | Why first |
|---|---|---|
| 2.1 | **Death R2–R3** (Grave Chill, Curse of Frailty, Weight of Dooms, Harvest seeds through The Reckoning) | Thinnest school above R1 (2/2/0/0); its signature affliction-harvest gimmick has zero published rungs |
| 2.2 | **Evocation R3–R4** (Chain Lightning, Dissolving Ray, Cone of Cold, Wall of Fire, Voltaic Surge tier) | The flagship damage school has 1 spell at R3 and 0 at R4 — casters lose their damage curve exactly where it should peak |
| 2.3 | **Telepathy R3** (Psychic Lance, Psychic Probe, Puppet's Step, Implant Suggestion) | 1 spell at R3; the influence ladder (dazed → charmed → commanded) is missing its middle rungs |
| 2.4 | **Telekinetics R2–R3 payoffs** (Grinding Weight, Relentless Grip, Kinetic Implosion, Meteoric Throw) | The premier setup school has near-zero in-school payoff — its engine cannot close a loop alone |
| 2.5 | **Twilight R2 engine rungs** (Fangs of the Dark, Shadow Mantle, Written in the Stars) | The stated "cast from darkness" core and the fate trait have no published mechanics |

### Priority 3 — R1 Reactive Baseline — ✅ DONE (published 2026-07-10)

| # | Action | Outcome |
|---|---|---|
| 3.1 | ~~Design the 4 missing R1 Quick Action reactives~~ **Published**: Arcane Deflection (Conjuration), Death's Rebuke (Death), Bark Shield (Nature), Dusk Veil (Twilight) — all on the standard chassis (principle 4), flat with no Heighten (owner ruling) | Every school with an empty R1 quick slot now has baseline reactive play |
| 3.2 | ~~Align pre-standard R1 quick spells~~ **Resolved**: Elemental Ward realigned to the chassis (elemental backlash secondary) with new companion **Frostfire Shield** (R2) absorbing the removed resistance/reflection niche; Death Ward, Storm Shield, Share Harm, Rapid Vitality, Updraft keep their school-flavored forms by owner-approved verdict | Reactive chassis consistent; distinctive published reactives grandfathered |

*Still seeded for their school batches (P4/P5): Retaliating Fury (War), Kinetic Deflection (Telekinetics), Sustaining Grace (Life), Absorb Harm (Peace), Radiant Rebuke (Light), Illusory Dodge (Illusion), Mental Shield (Telepathy) — these schools already have some R1 quick spell.*

### Priority 4 — Raise Every School to R4 — ✅ DONE (published 2026-07-12)

| # | Batch | Outcome |
|---|---|---|
| 4.1 | **War R4** | ✅ Blood Frenzy, Champion's Challenge, Siege Breaker published, plus Counterstroke (R2) and Retaliating Fury (R1 reactive) |
| 4.2 | **Peace R4** | ✅ Pilgrim's Gate, Redemptive Sacrifice published, plus Absorb Harm (R1 reactive) |
| 4.3 | **Light R4** | ✅ Divine Judgement, Hallowed Radiance published, plus Radiant Rebuke (R1 reactive) |
| 4.4 | **Illusion R4** | ✅ Phantasmal Catastrophe published, plus Shattered Veil (R3) and Illusory Dodge (R1 reactive) |
| 4.4b | **Death R4** | ✅ Pestilence published (Death had joined the zero-R4 set after P2) |
| 4.5 | **Nature / Life / Twilight / Necromancy R4 breadth** — ✅ **DONE (published 2026-07-13)** | Primal Guardian, Verdant Restoration; Greater Restoration, Life Ward (+ Abundance of Life Heighten to R5); Eclipse, Dreamwalking, Prophecy, Veil of Secrets; Necrotic Plague, Soul Cage, Possess Corpse. Also shipped: Diseases rules section, narrative distance/duration keyword ladders, Everlasting Night→Darkness rename (name reseeded at Twilight R5) |

*The batch also shipped the **strike** spell property (Mighty Strike, Shillelagh, Glorious Strike, Siege Breaker), the **invisible** condition (Invisibility, Mislead, Shadow Meld reworded), Healing Touch's Heighten extension to R5, and Death's Rebuke's poisoned-back secondary.*

### Priority 5 — R5 Capstones (target: at least one per school; 10 schools have none)

| # | Batch | Seeds |
|---|---|---|
| 5.1 | Conjuration (best R4 tier, R5-ready) — ✅ **DONE (published 2026-07-13)** | Planar Gateway, Binding Seal, Arcane Genesis, Subjugation (drafted as Planar Conscription) published — first school complete R0–R5. Also shipped: principle 72 (cross-sphere travel needs a Quality 6+ attuned object), Astral Body/Alarm narrative-distance erratas |
| 5.2 | Necromancy — ✅ **DONE (published 2026-07-13)** | Soul Harvest, Entropy, Eternal Servitude, Desecration published. Also shipped: greater undead companion traits (ghoul, ghost, wraith in traits.md, Eternal Servitude exclusive), Solar Flare R4/R5 Heighten errata (Desecration counterplay), principle 74 |
| 5.3 | War, Peace, Light ✅ **DONE (2026-07-14)**; Illusion ✅ **DONE (2026-07-13)** | Avatar of War, Final Triumph, Divine Retribution; Sanctuary Sphere, Sacred Covenant, The Pilgrim's Road; Dawnbreak, Final Judgement; ~~Mirage Arcane, Maze of Madness~~ published. Also shipped: Sandstorm R5 Heighten, Control Water R5 Heighten, Magma Geyser (new R4 Tempest), Avatar of Storms R4→R5 promotion, Eye of the Storm (new R5 Tempest), Wellspring of Life (Life R5), Genesis (Life R5), Cataclysmic Eruption/Primeval Form/Primal Awakening (Nature R5), Healing Burst R4/R5 Heighten cascade, Aid R4/R5 Heighten cascade |
| 5.4 | Twilight, Death ✅ **DONE (2026-07-14)**; Telepathy + Telekinetics ✅ **DONE 2026-07-13** | ~~Psychic Maelstrom, Absolute Control, Mindwipe; Annihilating Wave~~ published; Dream Realm, Shadowform, Fate's Decree, Phantom World; Inexorable Doom, Pall of the Grave, Ancestral Convergence |
| 5.5 | ✅ **RESOLVED (2026-07-13)**: Phantom World vs. Mirage Arcane split by scale/axis (landscape rite vs. battlefield mind-control); Annihilating Wave vs. Cataclysmic Eruption split by tempo (instant burst vs. standing field) — see the P5 arcane batch draft for the resolutions | No duplicate identities at the capstone tier |

### Priority 6 — Carried-Over Balance Items (still open)

| # | Action | Status |
|---|---|---|
| 6.1 | **Force damage type conversion** (§15): Arcane Missiles/Barrage and 3 others still use blast | Open — not yet implemented in docs |
| 6.2 | Review **Corpse Explosion** (R2 AoE at full single-target +6/+12/+18; recommended +4/+8/+12) | Open — unchanged in docs |
| 6.3 | Audit flagged mis-ranked spells: Mind Blast (R0 daze), ~~Elemental Ward~~ (resolved by the P3 realign), Silence, Shadow Stride, Protect from Influence, Solar Flare (§8) | Open |
| 6.4 | Systematic R2+ AoE damage pass under the half-scaling rule (§6–7) | Open — verify per school during its design batch |
| 6.5 | Re-validate **Astral Body** (R4, shared Conjuration/Telepathy) against the R5 ceiling during those schools' R5 batches | ✅ Done for Conjuration (P5.1, 2026-07-13): stays R4, tether errata applied. Confirm nothing new arises in the Telepathy R5 batch |

### Priority 7 — Low-Rank Aspect Completion + Deferred Capstones (new, opened 2026-07-13)

Once the R5 capstone tier is complete, the remaining gaps are at the bottom of the ladder: many trait (aspect) cells at R0–R2 are still seeds, not published spells. This priority sweeps every school's trait × rank matrix for empty R0–R2 aspect cells and designs the missing spells fresh, so each school has real coverage of its own aspects from the ground up (not just at the showy high ranks).

| # | Batch | Scope |
|---|---|---|
| 7.1 | **R0–R2 aspect-seed backfill, all 14 schools** | Per school, work the trait × rank matrix: design every undesigned R0–R2 aspect cell that is an honest gap (not a deliberate empty). Includes the still-unpublished low-rank seeds surfaced during P4–P5 (e.g. War's Terror's Edge / Avenging Oath / War Banner, Peace's Steady Hands / Shield of the Meek / **Binding Oath** / Oathmark, Death's Miasma / Minor Hex, Life's Beacon of Hope / Sustaining Grace, and each school's equivalents). Designing **Binding Oath (R2)** + the Oathmark oathbreaker state unblocks the forward-reference in Sacred Covenant (R5). |
| 7.2 | **Deferred R5 capstones** | Pick up the two R5 seeds left out of the P5 mystic batch's named scope: Peace's **Undying Devotion** (selflessness R5 payoff) and Twilight's **Everlasting Night** (moon R5, the retired name of the R2 *Darkness* spell, reseeded as enduring region-scale night). Design fresh against the R5 chassis; Everlasting Night must sit distinct from Light's Dawnbreak (its natural counter). |
| 7.3 | **"Unprovoked movement" keyword** (owner idea, 2026-07-14) | Many effects grant movement that "does not provoke any reaction" (Primal Awakening's Carry, Ancestral Convergence's Bear me, forced-movement riders, various repositioning spells). Coin a defined keyword/area-property-style term for movement that provokes no reactions, define it once in the movement rules (`docs/05-combat/03-distances-movement.md`), then sweep all spells/talents/combat arts to reference it by name (principle 53 — reference keywords, don't re-explain). Shortens recurring wording across the corpus. |

Sequence after P5. 7.2 is small and can ship whenever; 7.1 is the long tail and runs as per-school passes.

### Sequencing Note

Priorities 1–3 are small and unblock the rest. Priorities 4–5 are the bulk design work — run them as per-school batches (a school's P4 and P5 batch can be combined when its seed table is strong, e.g. War, Light, Twilight). Priority 6 items piggyback on whichever batch touches the affected school. When a school's batch lands, update its file's inventory, matrix, chains, and checklist, tick it here, and sync docs → JSON → Notion per the publication pipeline.

---

## 13. School Internal Design Gap Analysis

**Moved — this section is superseded by the per-school design-space files in `docs/analysis/spells/schools/<school>.md`.** Those files are the maintained layer and contain everything this section used to hold, in newer form:

- **Identity, traits, primary conditions, signature gimmick** — the School Identity / Mechanical Identity sections (summary table also in the spell-design skill's `references/schools.md`).
- **Internal completeness checks** (R1 Quick Action, defense, utility, damage, gimmick, combos) — each school's Design Completeness Checklist.
- **Synergy theory** — each school's Internal Synergies section, instantiating the setup/payoff/extender framework (`.claude/skills/spell-design/references/synergy-framework.md`), including a synergy-gaps line and gap-closing spell sketches.
- **Trait×rank coverage and gap lists** — each school's Trait × Rank Coverage Matrix.
- **Proposed spells** — conceptual seed tables (design fresh via the spell-design skill; principle 19).

Cross-school orientation (which school emits/rewards which shared states, top synergy gap per school) lives in the **Synergy Quick Reference** table in `references/schools.md` of the spell-design skill.

## 14. Spell Tags System Investigation

### 14.1 Proposed System

Each discipline/tradition currently lists 3–5 **traits** (aspects) that define its thematic identity — e.g., Evocation lists *fire, frost, lightning, acid, air*; Death lists *plagues, curses, fear, decay, ancestry*. These traits serve as design guidelines for which spells belong to which school.

> **Evocation Trait Rename**: The former "blast" trait has been renamed to **"air"** — representing raw elemental air pressure (concussive blasts, vacuum pockets, compressed wind). This distinguishes Evocation's transgressive air manipulation from Tempest's reverent natural storm weather. Air-trait spells still deal blast *damage type* (½ AV ignore); only the trait name changes.

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

**Nexus RPG Context**: With 315 spells across 14 schools, the current system is small enough that tradition-level organization is sufficient. Each school has 15–38 spells — small enough to browse directly. The PF2e model works for larger spell lists but adds overhead that isn't justified at Nexus's current scale.

### 14.5 Conclusion

**Recommendation: Do NOT implement spell tags as a player-facing mechanical layer.**

The existing trait system already provides thematic guidance for spell design without adding formal mechanics. Spell selection is already flexible — casters choose individual spells from their tradition's full list. Tags would add organizational overhead without meaningful gameplay benefit since the system already allows choosing any spell from your tradition.

**Tags are better used as a DESIGN TOOL** for ensuring trait coverage (see §17) rather than a player-facing mechanic. The trait coverage audit in §17 demonstrates how traits can systematically identify gaps in each school's spell list — this design-side benefit is achieved without exposing tags to players.

If the spell list grows significantly (500+ spells), revisiting tags as an organizational aid may become worthwhile. At the current ~315-spell scale, tradition-level access is sufficient.

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

## 15A. Cross-School Spell Sharing

### 15A.1 Principle

Spells may be shared between arcane disciplines and mystic traditions (cross-category only — never within arcane-to-arcane or mystic-to-mystic). When a spell appears in multiple schools, it must be **identical** in both lists — same rank, same Focus cost, same effects, same properties. This ensures consistent rules and avoids confusion.

### 15A.2 Identified Cross-School Overlaps

| Spell | Arcane School | Mystic School | Rank | Rationale |
|---|---|---|---|---|
| **Acid Splash** | Evocation | Nature | 0 | Acid is both a raw element (Evocation) and a natural toxin (Nature). Same Durability-based mechanic in both. |
| **Chain Lightning** | Evocation | Tempest | 3 | Lightning is both raw elemental power (Evocation) and natural storm force (Tempest). |
| **True Strike** | Telepathy | Light | 1 | Foresight-based combat buff fits both mental insight (Telepathy) and divine clarity (Light). |

> **Note**: Necromancy (arcane) and Death (mystic) were initially considered for cross-school sharing (Animate Corpse, Control Undead, Corpse Explosion). However, despite thematic overlap, their fundamentally opposed philosophies (transgressive defilement vs. reverential acceptance) should produce mechanically distinct spells. Cross-school sharing between these two is **not recommended**.

### 15A.3 Guidelines for Future Sharing

1. **Thematic fit required**: Both schools must have a clear thematic reason for the spell
2. **Mechanical identity**: The spell must use damage types and conditions consistent with both schools
3. **No balance bypass**: Sharing should not give one school access to a role it should be Weak in
4. **Limit scope**: Most schools should share 1–3 spells maximum — heavy overlap undermines school identity

---

## 15B. Acid / Corroding Mechanic Rework

### 15B.1 Design Intent

Acid damage's unique identity is **equipment degradation** — weakening enemies by destroying their gear over time. This creates a distinct tactical niche: Evocation casters choosing acid trade raw damage for strategic advantage against armored foes.

### 15B.2 Mechanic: Durability Interaction

Acid spells interact with the existing **Durability system** (items have 3 uses, Durability die rolled on check, 1–3 = lose a use, last use = damaged, damaged + fail = broken):

- **R0 (Acid Splash)**: **No Durability interaction — owner decision (2026-07-10, principle 51).** The published weak static rider (ignore 1/2 AV) is intentional and stays. At-will Durability checks are far too powerful: an R0 spell spammed every turn grinds equipment to dust for free. Attrition riders start at Focus-costed ranks.
- **R2 (Acid Rain)**: Zone-based Durability pressure — creatures staying in the zone face repeated checks. No immediate AV reduction. **The entry rank for acid's Durability identity.**
- **R3 (Dissolving Ray)**: Combine Durability checks with **temporary AV reduction** lasting at least a **short duration**. This is the payoff rank where acid becomes tactically impactful.
- **R5 (Dissolving Wave)**: Mass Durability devastation with significant AV reduction (short duration). The capstone acid spell.

### 15B.3 Balance Rationale

- **No R0 Durability or AV reduction**: at-will attrition riders are free equipment destruction over enough turns (principle 51), and direct AV reduction at cantrip level is too fiddly and too powerful. The cantrip keeps its weak static rider; the degradation identity begins at R2 where casts cost Focus.
- **Short duration minimum**: When AV reduction does appear (R3+), it lasts at least a short duration. Brief (1-turn) AV reduction creates excessive bookkeeping for minimal tactical impact. Short duration (several rounds) creates a meaningful window to exploit.
- **Durability as identity**: Unlike other elements (fire=burning, frost=slowed, lightning=staggered), acid's identity is "your stuff gets worse." This interacts with the Crafting/repair downtime system, creating cross-pillar gameplay.

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

## 17. Trait Coverage Audit — Moved

**Superseded by the per-school Trait × Rank Coverage Matrices** in `docs/analysis/spells/schools/<school>.md` (2026-07 seed audit). Those matrices are the maintained layer: each of the 30 trait×rank slots per school is marked as published, seeded (✨), covered by a proposed Heighten extension, or an honest empty cell. The R0 cantrip proposals formerly listed here (Surface Recall, Miasma, Minor Hex, Moment of Clarity, Stern Gaze, Righteous Strike, Tremor, Sand Gust, Splash, Gravity Shift, Wayfinder's Mark, and others) were absorbed into the school seed tables with full role and synergy annotations.

Use the school matrices as the ongoing design audit tool: before designing a new spell, check the school's matrix and prioritize filling seeded gaps over adding depth to covered traits.

> **Trait Rename (retained decision)**: The Evocation "blast" trait was renamed to **"air"** to represent raw elemental air pressure (concussive blasts, vacuum, compressed wind), distinguishing Evocation's transgressive air manipulation from Tempest's natural storm weather. Spells using this trait still deal blast *damage type* (½ AV ignore) — the trait name changed, not the damage type.

---

## Appendix A: Spell Count by Rank and School

*Regenerated from `docs/07-magic` on 2026-07-13 (matches §2).*

| School / Tradition | R0 | R1 | R2 | R3 | R4 | R5 | Total |
|---|---|---|---|---|---|---|---|
| Conjuration | 3 | 8 | 8 | 7 | 5 | 4 | 35 |
| Evocation | 3 | 9 | 6 | 3 | 3 | 1 | 25 |
| Illusion | 3 | 6 | 7 | 4 | 1 | 0 | 21 |
| Necromancy | 5 | 8 | 7 | 6 | 5 | 0 | 31 |
| Telepathy | 3 | 7 | 6 | 5 | 2 | 0 | 23 |
| Telekinetics | 3 | 7 | 7 | 5 | 1 | 0 | 23 |
| **Arcane Total** | **20** | **45** | **41** | **30** | **17** | **5** | **158** |
| Death | 5 | 7 | 5 | 4 | 1 | 0 | 22 |
| Life | 3 | 5 | 6 | 3 | 3 | 1 | 21 |
| Light | 4 | 9 | 4 | 4 | 2 | 0 | 23 |
| Nature | 6 | 9 | 13 | 9 | 3 | 1 | 41 |
| Peace | 3 | 5 | 4 | 4 | 2 | 0 | 18 |
| Tempest | 3 | 10 | 9 | 5 | 5 | 2 | 34 |
| Twilight | 5 | 7 | 12 | 5 | 5 | 0 | 34 |
| War | 3 | 6 | 4 | 4 | 3 | 0 | 20 |
| **Mystic Total** | **32** | **58** | **57** | **38** | **24** | **4** | **213** |
| **Grand Total** | **52** | **103** | **98** | **68** | **41** | **9** | **371** |

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
