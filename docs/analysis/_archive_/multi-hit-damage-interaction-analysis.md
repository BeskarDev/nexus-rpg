# Multi-Hit & Damage Modifier Interaction Analysis

> **Scope:** Interaction of multi-hit spells, combat arts, and abilities with damage-boosting modifiers. Identifies scaling breakpoints and proposes balance approaches that preserve design flexibility.

---

## 1. Executive Summary

### Key Findings

1. **Multi-hit spells apply Spell Power per missile.** Arcane Missiles and Arcane Barrage each add Spell Power (½ Mind) to every missile. Combined with per-hit damage modifiers, total output scales multiplicatively with missile count.
2. **Arcane Empowerment is the primary amplifier.** Adding Arcana (up to 5) to every missile's damage creates the steepest scaling curve when paired with multi-missile spells.
3. **Arcane Circle stacks damage per SL per missile.** Because each missile "counts as a weak success," the per-SL damage bonus from Arcane Circle applies to each missile individually.
4. **Empowered Spell metamagic already self-limits for multi-hit.** Its rules text specifies "+1 damage per extra Focus if the spell deals damage multiple times," halving the benefit for multi-hit spells.
5. **Combat art multi-hits are better controlled.** Flurry, Barrage, Dual Wielding, and Hundred Palm Strike all carry bane penalties, separate attack rolls, or reduced damage that naturally curb stacking.
6. **Weapon enchantment on-hit effects are gated.** Most weapon enchantments require separate hit rolls, strong/critical thresholds, or daily use limits, preventing runaway stacking.

### Risk Assessment

| Interaction | Severity | Notes |
|-------------|----------|-------|
| Arcane Empowerment + Arcane Barrage | **High** | +Arcana per missile × 3–5 missiles |
| Arcane Circle + Arcane Missiles/Barrage | **Medium** | +2 per SL per missile, but requires standing in circle |
| Spell Catalyst bonus + missile spells | **Low** | Flat +1/2/3 applied once to base, not per missile |
| Empowered Spell + missile spells | **Low** | Already halved by rules text |
| Battle Mage R3 + Hundred Palm Strike | **N/A** | Applies to weapon attacks, not spells; separate systems |
| Weapon enchantments + Flurry/Barrage | **Low** | Each extra attack is a new roll with banes |

---

## 2. Catalogue of Multi-Hit Mechanics

### 2.1 Multi-Hit Spells

| Spell | School | Rank | Missiles (W/S/C) | Damage per Missile | Auto-Hit? | Notes |
|-------|--------|------|-------------------|--------------------|-----------|-------|
| **Arcane Missiles** | Conjuration | 1 | 1 / 2 / 3 | +2 blast (ign. ½ AV) | Yes | Heighten R2: +4, R3: +6 |
| **Arcane Barrage** | Conjuration | 2 | 3 / 4 / 5 | +2 blast (ign. ½ AV) | Yes | Heighten R3: +4 |
| **Hale of Blades** | Conjuration | 1 | 3 targets (single roll) | +2/+4/+6 per target | No | Standard AoE damage, not truly "multi-hit" |

> **Key distinction:** Arcane Missiles and Arcane Barrage create independent missiles that each "automatically hit, counting as a weak success." This means each missile independently triggers on-hit and per-damage modifiers. Hale of Blades targets multiple creatures with a single effect and does not produce separate hits.

### 2.2 Multi-Hit Combat Arts

| Combat Art | Category | Weapons | Mechanic | Penalty |
|------------|----------|---------|----------|---------|
| **Flurry** | Basic | Melee (non-heavy) | Extra attack roll | +1 bane |
| **Barrage** | Basic | Bow, Thrown (non-heavy) | Extra attack roll | +1 bane |
| **Supreme Barrage** | Supreme | Bow, Thrown (non-heavy) | Two extra attack rolls | +1 bane / +2 banes |
| **Hundred Palm Strike** | Supreme | Brawling | 2/3/4 weak hits from one roll | No extra penalty |
| **Dual Wielding** | Core rule | Two light weapons | Two attacks, one Action | +1 bane (both) |
| **Cleave / Supreme Cleave** | Basic/Supreme | Two-handed melee | Multi-target, single roll | −1× weapon damage per target |
| **Volley** | Basic | Ranged (non-heavy) | Multi-target, single roll | −1× weapon damage per target |

> **Key distinction:** Flurry, Barrage, and Supreme Barrage require separate attack rolls for each extra attack, naturally limiting stacking. Hundred Palm Strike converts a single roll into multiple weak hits, making it the closest melee analogue to missile spells.

### 2.3 Multi-Hit Talent Abilities

| Talent | Skill | Rank | Mechanic | Penalty |
|--------|-------|------|----------|---------|
| **Disciplined Fighter R3** | Fighting | 3 | Quick Action extra attack | +1 bane |
| **Disciplined Archer R3** | Archery | 3 | Quick Action extra attack | +1 bane |
| **Dual Wielder R3** | Fighting | 3 | Third attack when dual-wielding | +1 bane |
| **Rapid Shot R1** | Archery | 1 | Two attacks per Action | +1 bane (both), R2 removes bane |
| **Master of Fundamentals R3** | Arcana | 3 | Quick Action re-cast rank 0 spell | +1 bane |
| **Master of Principles R3** | Mysticism | 3 | Quick Action re-cast rank 0 spell | +1 bane |
| **Martial Artist R3** | Fighting | 3 | Extra weak hit with agile weapon | +1 bane |
| **Shape Changer R2** | Mysticism | 2 | Quick Action extra natural weapon attack | +1 bane |
| **Battle Mage R4** | Arcana | 4 | Quick Action rank 0 spell after weapon attack | None (but limited to rank 0) |

---

## 3. Catalogue of Damage-Boosting Modifiers

### 3.1 Spell Damage Modifiers

| Source | Type | Bonus | Application | Stacks with Missiles? |
|--------|------|-------|-------------|----------------------|
| **Spell Power** (½ Mind/Spirit) | Base | +2 to +6 | Added to each "+X damage" entry | **Yes — per missile** |
| **Spell Catalyst** (magic item) | Item bonus | +1/+2/+3 (Q4/Q5/Q6) | Added to spell damage | **Ambiguous — see §4** |
| **Arcane Empowerment** (R4 spell) | Ability | +Arcana (1–5) | "Whenever you deal damage with an arcane spell" | **Yes — per missile** |
| **Arcane Circle** (R2 spell) | Situational | +2/+4 per SL | "deals +X damage per SL with any arcane spell" | **Yes — per missile** |
| **Infuse Item** (catalyst option) | Enhancement | +1/+2/+3 spell damage | Applied to spell damage values | **Ambiguous — see §4** |
| **Empowered Spell** (metamagic) | Metamagic | +2/Focus (single) or +1/Focus (multi-hit) | Explicitly halved for multi-hit | **Halved** |
| **Condensed Spell** (metamagic) | Metamagic | +1 per SL | Reduces area, increases damage | Applies to AoE only |
| **Master of Fundamentals R2** | Ability | +Arcana | Rank 0 spells only | N/A (no rank 0 missile spells) |
| **Pact of Devotion: Glory** | Ability | +2 damage | Alternating spell/weapon turns | **Yes — once per cast** |
| **Pact of Devotion: Vengeance R2** | Ability | +2/Focus spent | Weapon attacks only | N/A |
| **Pact of Devotion: Piety R3** | Ability | +1× spell damage | 1/scene, adds spell damage again | **Yes — per missile** |

### 3.2 Weapon Damage Modifiers (for Combat Art Multi-Hits)

| Source | Type | Bonus | Application | Stacks with Extra Hits? |
|--------|------|-------|-------------|------------------------|
| **Base Damage** (½ Attribute) | Base | +2 to +6 | Per attack roll | Yes — each roll |
| **Weapon Damage** (item) | Weapon | varies | Per attack roll | Yes — each roll |
| **Weapon Enchantment (flaming, etc.)** | Item | 2/4/6 ign. AV | "on a hit" | Yes — per successful hit |
| **Enchant Weapon spell (e.g. Flaming Weapon)** | Spell | +2/+4/+6 fire | "deals +X fire damage" | Yes — per hit |
| **Battle Mage R3** | Ability | +Arcana | "on a hit with melee or ranged weapon" | Yes — per hit |
| **Expert Slinger R2** | Ability | +Archery | "on a hit at close/short range" | Yes — per hit |
| **Ammo Specialist R3** | Ability | +Archery | "attack with special ammo" | Yes — per hit |
| **Heavy Weapon Mastery R3** | Ability | +½ Strength | "on a hit, skip all Movement" | Once per turn |
| **Strong Grip R3** | Archery | +½ Strength | "on a hit with heavy ranged" | Yes — per hit |
| **Axe Mastery R2** | Fighting | Bleeding = WD | Strong/critical, light/no armor | Per qualifying hit |
| **Blade Mastery R2** | Fighting | Ignore ½ AV or marked(2) | Strong/critical only | Per qualifying hit |

---

## 4. Interaction Analysis — Problem Cases

### 4.1 Arcane Missiles + Arcane Empowerment (PRIMARY CONCERN)

**Setup:** Arcana 4, Mind d12 (Spell Power 6), Arcane Empowerment active, Arcane Missiles heightened to Rank 3.

| Component | Per Missile | Source |
|-----------|------------|--------|
| Spell Power (½ Mind) | +6 | Base |
| Arcane Missiles R3 spell damage | +6 | Spell |
| Arcane Empowerment | +4 | "whenever you deal damage with an arcane spell" |
| **Subtotal per missile** | **16** | |

| SL | Missiles | Damage per Missile | Total Damage | AV Reduction |
|----|----------|--------------------|--------------|--------------|
| Weak | 1 | 16 | **16** | ½ AV ignored |
| Strong | 2 | 16 | **32** | ½ AV ignored |
| Critical | 3 | 16 | **48** | ½ AV ignored |

**Comparison:** A Rank 3 single-target spell like Arcane Blast deals Spell Power + 8/16/24 (e.g. 14/22/30 with SP 6). Arcane Missiles at critical success deals **48 damage** — 60% more than a dedicated rank 3 single-target blast, from a rank 1 spell (heightened to 3) that auto-hits and ignores cover.

### 4.2 Arcane Barrage + Arcane Empowerment (HIGHEST CONCERN)

**Setup:** Arcana 5, Mind d12 (Spell Power 6), Arcane Empowerment active, Arcane Barrage heightened to Rank 3.

| Component | Per Missile | Source |
|-----------|------------|--------|
| Spell Power (½ Mind) | +6 | Base |
| Arcane Barrage R3 spell damage | +4 | Spell |
| Arcane Empowerment | +5 | Arcana rank |
| **Subtotal per missile** | **15** | |

| SL | Missiles | Damage per Missile | Total Damage | AV Reduction |
|----|----------|--------------------|--------------|--------------|
| Weak | 3 | 15 | **45** | ½ AV ignored |
| Strong | 4 | 15 | **60** | ½ AV ignored |
| Critical | 5 | 15 | **75** | ½ AV ignored |

**Comparison:** This is a rank 2 spell (heightened to 3) that at critical success deals **75 damage** — well beyond any rank 5 damage ceiling in the system's design guidelines (max Spell Power + 12/24/36 single-target at rank 5, typically 18/30/42 with SP 6).

### 4.3 Arcane Circle + Missile Spells (MEDIUM CONCERN)

**Setup:** Arcana 4, Mind d12, standing in Arcane Circle (heightened R3, granting +4 damage per SL), casting Arcane Barrage.

Each missile "counts as a weak success," so the per-SL bonus applies at the weak level (+4 once, not ×2 or ×3).

| Component | Per Missile |
|-----------|------------|
| Spell Power | +6 |
| Arcane Barrage base | +2 |
| Arcane Circle (weak SL) | +4 |
| **Subtotal** | **12** |

| SL | Missiles | Total |
|----|----------|-------|
| Weak | 3 | **36** |
| Strong | 4 | **48** |
| Critical | 5 | **60** |

**Compounding:** If Arcane Empowerment is also active, add +4 or +5 per missile, reaching **80–85** at critical.

### 4.4 Empowered Spell + Missile Spells (LOW CONCERN — Already Mitigated)

The Empowered Spell metamagic explicitly states: "+1 damage per extra Focus if the spell deals damage multiple times." This halves its benefit for missile spells. Spending maximum Focus (5 extra) adds only +5 total damage spread across all missiles, not per missile. This is a model of intentional multi-hit-aware design.

### 4.5 Hundred Palm Strike + Weapon Modifiers (MODERATE CONCERN)

**Setup:** Fighting 4, Strength d10 (base 5), Pugilist R3 (4 weapon damage), Flaming Weapon R2 active (+4 fire damage per hit), critical success with Hundred Palm Strike.

| Component | Per Hit |
|-----------|---------|
| Base (½ Str) | +5 |
| Weapon damage (×1 weak hit) | +4 |
| Flaming Weapon | +4 |
| **Subtotal** | **13** |

| SL | Hits | Total |
|----|------|-------|
| Weak | 2 | **26** |
| Strong | 3 | **39** |
| Critical | 4 | **52** |

This is high for a melee ability but requires:
- Supreme Combat Art (rank 3+ Fighting investment)
- Pugilist R3 (rank 3 Fighting investment)
- Flaming Weapon active (rank 1+ Arcana/separate caster, enchant slot, Focus cost)

The high investment naturally gates the output. However, adding Battle Mage R3 (+Arcana per hit) would increase each hit further if it applied to melee while using Hundred Palm Strike.

### 4.6 Spell Catalyst Damage + Missile Spells (AMBIGUOUS)

The spell catalyst bonus states it adds to "spell damage." Two interpretations:

1. **Per-cast (safe):** The +1/+2/+3 bonus is added once to the total spell damage, not per missile.
2. **Per-missile (problematic):** Each missile deals its own spell damage, so the catalyst bonus applies to each.

**Current ruling is ambiguous.** Clarifying that spell catalyst bonuses apply once per casting (not per missile) would prevent +3 × 5 = +15 extra damage at high quality.

---

## 5. Why Missile Spells Are Unique

Missile spells occupy a unique design space that amplifies modifier interactions:

| Property | Missile Spells | Standard AoE | Extra Attacks (Combat Arts) |
|----------|---------------|--------------|----------------------------|
| Number of damage instances | 1–5 per cast | 1 per target | 1 per extra roll |
| Separate hit rolls? | No (auto-hit) | No (single roll vs. each target) | Yes (new roll per attack) |
| Spell Power applied per instance? | Yes | Yes (once per target) | N/A (base damage per roll) |
| "On hit" triggers per instance? | Debatable | Typically once | Yes (per hit) |
| Scaling with modifiers | Multiplicative | Linear (per target) | Linear with accuracy penalty |

The critical difference: **auto-hit + multiple damage instances + Spell Power per instance** creates a multiplicative relationship with flat per-damage modifiers that no other mechanic in the system shares.

---

## 6. Balance Approaches

### Approach A: Cap Modifiers Per Cast (Recommended)

**Rule:** "When a spell creates multiple damage instances (such as individual missiles), flat damage bonuses from other spells and abilities (e.g. Arcane Empowerment, Arcane Circle) apply only once to the total damage, not to each instance individually. Spell Power and the spell's own listed damage still apply to each instance."

**Effect on §4.2 (Arcane Barrage + Arcane Empowerment, critical):**
- Per missile: 6 (SP) + 4 (spell) = 10
- Total: 5 × 10 = 50
- Arcane Empowerment: +5 (once)
- **New total: 55** (down from 75)

| Pros | Cons |
|------|------|
| Simple rule, easy to remember | Reduces the appeal of buff-then-blast combos |
| Preserves missile spell identity (SP + spell damage per missile) | May feel arbitrary for "whenever you deal damage" wording |
| Targeted fix — doesn't affect other multi-hit mechanics | Requires errata to Arcane Empowerment wording |

### Approach B: Per-Missile Damage Reduction

**Rule:** "When a spell creates multiple projectiles or damage instances from a single casting, each instance after the first deals reduced damage from external modifiers. External flat bonuses (from other spells, abilities, or items, but not Spell Power or the spell's own damage) are halved (rounded down) for each instance beyond the first."

**Effect on §4.2 (Arcane Barrage + Arcane Empowerment, critical, 5 missiles):**
- Missile 1: 6 + 4 + 5 = 15
- Missiles 2–5: 6 + 4 + 2 = 12 each
- **New total: 15 + 48 = 63** (down from 75)

| Pros | Cons |
|------|------|
| Graduated reduction feels organic | More math at the table |
| First missile still feels powerful | Tracking "first vs. rest" adds complexity |
| Preserves some multi-hit stacking reward | Players may find it unintuitive |

### Approach C: Redesign Missile Spells as Fixed-Damage

**Rule:** Remove the "+" from missile damage (making it static, not adding Spell Power). Missiles would deal flat 2/4/6 damage each instead of Spell Power + 2/4/6.

**Effect on §4.2 (Arcane Barrage heightened R3, Arcane Empowerment, critical):**
- Per missile: 4 (static) + 5 (Empowerment) = 9
- **New total: 5 × 9 = 45** (down from 75)

| Pros | Cons |
|------|------|
| Eliminates Spell Power multiplication entirely | Significant nerf to missiles without buffs |
| Makes missiles a utility/chip-damage option | Changes spell identity — missiles become weak at base |
| Simplest mechanical fix | May require rebalancing missile damage numbers upward |

### Approach D: Cap External Bonuses to Once Per Turn

**Rule:** "Damage bonuses from other active spells (Arcane Empowerment, Arcane Circle, etc.) can only add their bonus damage once per turn, regardless of how many damage instances you create."

**Effect on §4.2:** Same as Approach A.

| Pros | Cons |
|------|------|
| Broadest fix — covers all future interactions | Heavy-handed; affects legitimate single-attack + buff combos too |
| Simple tracking (once per turn) | Reduces value of concentration buffs dramatically |
| Future-proof | May discourage buff-oriented play entirely |

### Approach E: Reword Problem Sources (Targeted Errata)

Instead of a blanket rule, adjust the specific problem abilities:

1. **Arcane Empowerment:** Change "whenever you deal damage with an arcane spell" → "whenever you deal damage with an arcane spell, add your Arcana to the damage once per casting."
2. **Arcane Circle:** Change "deals +X damage per SL" → "deals +X damage per SL once per casting."
3. **Spell Catalyst bonus:** Clarify "applies once per casting, not per damage instance."

| Pros | Cons |
|------|------|
| Minimal disruption to other mechanics | Requires identifying every problematic source |
| Preserves modifier stacking for single-hit spells | New abilities may re-introduce the problem |
| Easy to understand per-ability | Inconsistent if some sources say "per casting" and others don't |

### Approach F: Missile Damage Budget Model

**Rule:** Missile spells have a fixed total damage budget, divided among missiles. More missiles = lower per-missile damage.

**Example redesign of Arcane Barrage (Rank 2):**
- Weak: 3 missiles dealing +2 each = +6 total
- Strong: 4 missiles dealing +2 each = +8 total (instead of current +8 total)
- Critical: 5 missiles dealing +2 each = +10 total

This is already how they work. The approach would extend the budget to external modifiers: "External damage bonuses add to the total budget, then divide equally among missiles."

| Pros | Cons |
|------|------|
| Mathematically clean | Very unusual rule for a TTRPG; hard to calculate at the table |
| Perfect scaling control | Unintuitive — players expect each missile to hit equally |
| Elegant on paper | Fractional damage per missile at high counts |

---

## 7. Comparison of Approaches

| Criterion | A (Cap/Cast) | B (Diminish) | C (Static) | D (1/Turn) | E (Errata) | F (Budget) |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|
| Simplicity | ★★★★ | ★★ | ★★★★★ | ★★★★ | ★★★ | ★ |
| Preserves missile identity | ★★★★ | ★★★★ | ★★ | ★★★★ | ★★★★★ | ★★★ |
| Future-proof | ★★★★ | ★★★ | ★★★★★ | ★★★★★ | ★★ | ★★★★ |
| Minimal disruption | ★★★ | ★★★ | ★★ | ★★ | ★★★★★ | ★★ |
| Table usability | ★★★★ | ★★ | ★★★★★ | ★★★★ | ★★★★ | ★ |
| Buff play preserved | ★★★ | ★★★★ | ★★★ | ★★ | ★★★★ | ★★★ |

---

## 8. Recommendations

### Primary Recommendation: Approach E (Targeted Errata) + Approach A as General Rule

Combine a general principle with targeted fixes:

1. **Add a general rule under Spell Damage** (§ Magic & Spells):
   > "When a spell creates multiple separate damage instances (such as individual missiles), external damage bonuses from other spells, abilities, or items apply only once to the spell's total damage, not to each instance. The spell's own listed damage and your Spell Power apply to each instance normally."

2. **Errata Arcane Empowerment** to clarify:
   > "Whenever you deal damage with an arcane spell, add your Arcana to the damage **once per casting**."

3. **Errata Arcane Circle** to clarify:
   > "… deals +X damage per SL with any arcane spell **once per casting**."

4. **Clarify Spell Catalyst** damage bonus:
   > "Your spell catalyst's damage bonus applies once per casting."

### Secondary Recommendation: Audit Future Content

When designing new spells or abilities that grant "bonus damage on hit" or "bonus damage when dealing damage with a spell," always specify whether the bonus is:
- **Per casting** (applies once regardless of damage instances)
- **Per target** (applies once per unique creature damaged)
- **Per instance** (applies to every damage roll — use sparingly)

### Damage Ceiling Reference (Post-Fix)

With recommendations applied, the adjusted damage for the worst case (Arcane Barrage R3 + Arcane Empowerment, Arcana 5, Mind d12, critical):

| Component | Value |
|-----------|-------|
| Per missile: SP(6) + spell(4) | 10 × 5 missiles = 50 |
| Arcane Empowerment (once) | +5 |
| **Total** | **55** |

This is high but appropriate for a character investing a rank 4 concentration spell (8 Focus, Extreme TN 14, causes Fatigue when ending) and a rank 2 spell (4 Focus, Hard TN 10) in the same combat, requiring Arcana 4–5 and Mind d12. Compare to single-target Arcane Blast R3: SP(6) + 8/16/24 = 14/22/30 — the multi-spell investment produces roughly 1.8–2.5× a dedicated single blast, which is reasonable given the setup cost and two Action investment.

---

## 9. Impact on Combat Art Multi-Hits

Combat art multi-hits (Flurry, Barrage, Hundred Palm Strike, etc.) are **not affected** by the recommended spell rule, nor do they need equivalent restrictions, because:

1. **Separate attack rolls** — each extra attack can miss, and bane penalties make misses likely.
2. **Weapon modifier bonuses are gated** — enchantment on-hit effects have daily/scene limits, strong/critical thresholds, or both.
3. **Hundred Palm Strike** — the closest analogue to missile spells — produces weak hits from a single roll, but weapon enchantments like Flaming Weapon apply per hit by design (this is expected and priced into the Supreme Combat Art investment).
4. **Battle Mage R3** adds Arcana per weapon hit, but this requires Fighting 1+ and Arcana 3+, and only applies to weapon attacks — not spells.

If future designs introduce weapon-side "add X damage whenever you deal damage with a weapon" effects similar to Arcane Empowerment, a parallel "once per attack action" clause should be included.

---

## 10. Ambiguity Resolutions

The following should be clarified in rules text regardless of which balance approach is adopted:

| Ambiguity | Recommended Ruling | Rationale |
|-----------|-------------------|-----------|
| Does Spell Power apply per missile? | **Yes** — each missile says "+X damage" | Consistent with spell damage rules: "+X" adds to Spell Power |
| Does spell catalyst bonus apply per missile? | **No** — once per casting | Catalyst enhances the caster, not each projectile |
| Does Arcane Empowerment apply per missile? | **No** — once per casting (errata) | Prevents multiplicative scaling beyond design ceiling |
| Does Arcane Circle bonus apply per missile? | **No** — once per casting (errata) | Same rationale as Arcane Empowerment |
| Does Pact of Devotion: Glory apply per missile? | **No** — once per casting | "When you cast a spell" = once per cast |
| Does Pact of Devotion: Piety R3 apply per missile? | **No** — once per casting | "Add the spell damage an additional time" = total spell effect, not per missile |
| Do weapon enchant spells (Flaming Weapon) apply per melee hit? | **Yes** — per hit | Designed for weapon attacks; multi-attack penalties gate this |
| Do magic item weapon enchantments apply per hit? | **Yes** — per successful hit | On-hit triggers are standard for weapon enchantments |

---

## Appendix A: Full Worked Example — Before & After

### Before (No Fix)

**Character:** Arcana 5, Mind d12+1 (SP 7), Spell Catalyst +3 (Q6), Arcane Empowerment active, standing in Arcane Circle (R3).

Casting Arcane Barrage (heightened R3), critical success (5 missiles):

| Per Missile | Value |
|-------------|-------|
| Spell Power | 7 |
| Spell damage (R3) | 4 |
| Spell Catalyst | 3 |
| Arcane Empowerment | 5 |
| Arcane Circle (weak SL) | 4 |
| **Total per missile** | **23** |
| **× 5 missiles** | **115 damage** |

This exceeds any reasonable damage ceiling by a wide margin.

### After (Recommended Fix)

Same character and setup, with "once per casting" rule applied:

| Per Missile | Value |
|-------------|-------|
| Spell Power | 7 |
| Spell damage (R3) | 4 |
| **Per-missile total** | **11** |

| Once Per Casting | Value |
|------------------|-------|
| Spell Catalyst | 3 |
| Arcane Empowerment | 5 |
| Arcane Circle (weak SL) | 4 |
| **Once-per-casting total** | **12** |

| Final Total | |
|-------------|-------|
| 5 × 11 + 12 | **67 damage** |

This represents a powerful but bounded outcome (roughly equivalent to two rank 3 blasts) from a character who has:
- Invested a rank 4 concentration spell (8 Focus, Extreme TN, Fatigue on end)
- Cast a rank 2 setup spell (Arcane Circle, 4 Focus)
- Achieved a critical success on a Hard TN 10 roll
- Spent minimum 12 Focus in setup alone

---

## Appendix B: Design Checklist for Future Multi-Hit Abilities

When designing any new ability that creates multiple damage instances:

- [ ] Does Spell Power or base damage apply per instance? (Expected: yes)
- [ ] Do external flat bonuses apply per instance or per casting? (Specify explicitly)
- [ ] Does the ability have natural limiters (miss chance, bane penalties, resource cost)?
- [ ] At maximum stacking, does total damage stay within the rank's power ceiling?
- [ ] Is the total investment (actions, Focus, talent ranks) proportional to output?
- [ ] Does the ability text use "per casting," "per instance," or "per target" language?
