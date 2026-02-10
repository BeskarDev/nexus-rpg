# Spell Power Calculator

**Purpose**: Quick reference tables and formulas for ensuring custom spells have rank-appropriate power levels in Nexus RPG.

---

## Table of Contents

1. [Damage Calculator](#damage-calculator)
2. [Bonus Calculator](#bonus-calculator)
3. [Summoning Calculator](#summoning-calculator)
4. [Duration Guidelines](#duration-guidelines)
5. [Area Size Guidelines](#area-size-guidelines)
6. [Condition Severity Guidelines](#condition-severity-guidelines)
7. [Power Budget System](#power-budget-system)
8. [Quick Validation Checklist](#quick-validation-checklist)

---

## Damage Calculator

### Base Damage by Rank and Target Type

| Rank | Single-Target (W/S/C) | AoE (W/S/C) | Secondary Target | Damage per Turn (DoT) |
|------|-----------------------|-------------|------------------|-----------------------|
| **0** | +2/+4/+6 | +0/+2/+4 | +0/+1/+2 | 1-2 |
| **1** | +4/+8/+12 | +2/+4/+6 | +1/+2/+3 | 2-3 |
| **2** | +6/+12/+18 | +4/+8/+12 | +2/+4/+6 | 3-4 |
| **3** | +8/+16/+24 | +6/+12/+18 | +3/+6/+9 | 4-5 |
| **4** | +10/+20/+30 | +8/+16/+24 | +4/+8/+12 | 5-6 |
| **5** | +12/+24/+36 | +10/+20/+30 | +5/+10/+15 | 6-8 |

**Legend**: W = Weak success, S = Strong success, C = Critical success

**Remember**: Add Spell Power (½ Mind or ½ Spirit) to all damage values.

### Damage Adjustments

**When to reduce damage**:
- **Add strong condition**: Reduce by 1-2 steps (e.g., +8/16/24 → +6/12/18)
- **Multiple damage types**: Split total damage between types
- **Hybrid spell**: Reduce damage if combining with buff/summon/zone effect
- **Very large AoE**: Reduce by additional step if area is 2+ sizes larger than standard

**When damage can stay standard**:
- Pure damage spell with no secondary effects
- Condition is minor (briefly slowed, +1 bane)
- Single-target focus

### Damage Type Modifiers

Some damage types have special properties that affect power budget:

| Damage Type | Special Property | Power Adjustment |
|-------------|------------------|------------------|
| **Acid** | Ignore ½ AV (corrosive) | Standard damage |
| **Blast** | Ignore ½ AV (concussive) | Standard damage |
| **Fire** | Adds burning (DoT) | Standard if burning is only on crit |
| **Frost** | Adds slowed condition | Standard if briefly slowed |
| **Lightning** | Potential chain effect | Reduce by 1 step if chains |
| **Necrotic** | Life drain/healing | Reduce by 1-2 steps if heals caster |
| **Physical** | No special effects | Standard damage |
| **Poison** | Adds poisoned condition | Standard if save negates |
| **Psychic** | Mental effects | Standard damage |
| **Radiant** | Extra damage to undead | Standard damage |

### Chain/Split Damage

When damage bounces between targets:

**Primary → Secondary → Tertiary Chain**:
- Primary: Full damage
- Secondary: ½ damage (round down)
- Tertiary: ¼ damage (round down)

**Example** (Rank 3 strong success):
- Primary: +16 damage
- Secondary: +8 damage
- Tertiary: +4 damage

**Split Between Two Targets**:
- Each target: ¾ of normal damage (round down)

**Example** (Rank 2 strong success split):
- Normal: +12 damage to one
- Split: +9 damage to each of two

---

## Bonus Calculator

### Numeric Bonuses by Rank

| Rank | Skill/Attack Bonus | Armor/Defense Bonus | Save Bonus | Attribute Boost |
|------|---------------------|---------------------|------------|-----------------|
| **0** | +1 boon | +1 AV | +1 boon | - |
| **1** | +1 boon | +1 AV | +1 boon | - |
| **2** | +1-2 boon | +2 AV | +1 boon | +1 die size |
| **3** | +2 boon | +2 AV | +1-2 boon | +1 die size |
| **4** | +2-3 boon | +3 AV | +2 boon | +2 die sizes |
| **5** | +3 boon | +3 AV | +2 boon | +2 die sizes |

**Notes**:
- Boons don't stack from same spell
- Multiple +AV buffs don't stack from same source
- Attribute boosts are temporary (duration-limited)

### Damage Bonus Enhancement

When buffing weapon damage or spell damage:

| Rank | Weapon Damage Bonus | Spell Damage Bonus |
|------|---------------------|---------------------|
| **0** | - | - |
| **1** | +2 | +2 |
| **2** | +4 | +4 |
| **3** | +6 | +6 |
| **4** | +8 | +8 |
| **5** | +10 | +10 |

### Resistance/Immunity Bonuses

| Rank | Effect |
|------|--------|
| **0-1** | Resistance to 1 damage type |
| **2-3** | Resistance to 2-3 damage types |
| **4-5** | Resistance to 3-5 damage types or immunity to 1 type |

**Never grant**: Immunity to all damage types, immunity to multiple damage types at low ranks.

### Temporary Hit Points

| Rank | Temporary HP Granted |
|------|---------------------|
| **0-1** | Spell Power × 1 |
| **2-3** | Spell Power × 2 |
| **4-5** | Spell Power × 3 |

**Example**: Rank 3 buff by caster with Spirit d10 (Spell Power 5):
- Grants 5 × 2 = 10 temporary HP

---

## Summoning Calculator

### Creature Tier by Spell Rank

| Spell Rank | Weak Success | Strong Success | Critical Success |
|------------|--------------|----------------|------------------|
| **0** | - | - | - |
| **1** | Tier 0 (1) | Tier 1 (1) | Tier 2 (1-2) |
| **2** | Tier 1 (1) | Tier 2 (1-2) | Tier 3 (2) |
| **3** | Tier 2 (1) | Tier 3 (1-2) | Tier 4 (2-3) |
| **4** | Tier 3 (1) | Tier 4 (1-2) | Tier 5 (2-3) |
| **5** | Tier 4 (1) | Tier 5 (1-2) | Tier 5 (3-4) |

**Numbers in parentheses** = quantity of creatures summoned.

### Summoning Duration

| Spell Rank | Weak Duration | Strong Duration | Critical Duration |
|------------|---------------|-----------------|-------------------|
| **1** | Briefly | Short | Short |
| **2** | Short | Short | Medium |
| **3** | Short | Medium | Medium |
| **4** | Short | Medium | Long |
| **5** | Medium | Long | Long |

**With Concentration**: Usually extends to next duration tier (briefly → short, short → medium).

### Swarm Summoning

When summoning multiple weaker creatures instead of one strong one:

- Replace one creature with **2 creatures of 1 tier lower**
- Or replace with **3-4 creatures of 2 tiers lower**

**Example** (Rank 3 strong success):
- Standard: 1 Tier 3 creature
- Swarm Option 1: 2 Tier 2 creatures
- Swarm Option 2: 3-4 Tier 1 creatures

### Object Creation Size

| Spell Rank | Object Size | Complexity |
|------------|-------------|------------|
| **0-1** | Small (hand-sized) | Simple (rope, tool) |
| **2-3** | Medium (chest-sized) | Moderate (furniture, weapons) |
| **4-5** | Large (wagon-sized) | Complex (structures, mechanisms) |

**Duration for created objects**:
- Temporary: Short to Medium duration
- Permanent: Requires Rank 4-5, usually with material cost

---

## Duration Guidelines

### Duration by Rank and Success Level

| Rank | Weak Success | Strong Success | Critical Success |
|------|--------------|----------------|------------------|
| **0** | Briefly | Briefly-Short | Short |
| **1** | Briefly-Short | Short | Short-Medium |
| **2** | Short | Short-Medium | Medium |
| **3** | Short-Medium | Medium | Medium-Long |
| **4** | Medium | Medium-Long | Long |
| **5** | Medium-Long | Long | Long-Permanent |

### Duration Categories (Time)

| Category | In Combat | In Exploration | In Downtime |
|----------|-----------|----------------|-------------|
| **Briefly** | End of next turn | ~1 minute | ~1 minute |
| **Short** | Until short rest | ~10 minutes | ~10 minutes |
| **Medium** | Until long rest | ~1 hour | ~1 hour |
| **Long** | Until recovery | ~8 hours | ~8 hours |
| **Permanent** | No end | No end | No end |

### Duration Modifiers

**Increase duration** if:
- Spell requires concentration (breaks easily)
- Effect is minor (e.g., light emission)
- Spell has material cost

**Decrease duration** if:
- Effect is very powerful (e.g., dominated condition)
- Spell grants major bonus (+3 or more)
- Spell has no save/defense roll

---

## Area Size Guidelines

### Area Sizes by Rank

| Rank | Weak Success | Strong Success | Critical Success |
|------|--------------|----------------|------------------|
| **0** | Melee (5 ft) | Melee (5 ft) | Close (30 ft) |
| **1** | Melee-Close | Close | Close-Short |
| **2** | Close | Close-Short | Short |
| **3** | Close-Short | Short | Short-Medium |
| **4** | Short | Short-Medium | Medium |
| **5** | Short-Medium | Medium | Medium-Large |

### Range Categories (Distance)

| Category | Distance | Typical Use |
|----------|----------|-------------|
| **Melee** | 5 ft | Adjacent targets, touch spells |
| **Close** | 30 ft | Small room, close group |
| **Short** | 60 ft | Medium room, small battlefield |
| **Medium** | 120 ft | Large room, typical combat range |
| **Long** | 240 ft | Open field, long-distance |
| **Very Long** | 480 ft | Extreme range, sniper shots |
| **Extreme** | 960 ft | Artillery, scrying |

### Blast Shape Areas

| Shape | Description | Area Covered |
|-------|-------------|--------------|
| **Cone** | Spreads from caster | Length = range, width = 1 category less |
| **Line** | Straight path | Length = range, width = melee (5 ft) |
| **Burst** | Centered on point | Radius = listed area size |
| **Wall** | Barrier between points | Length = 2× area size, height/thickness = 10 ft |
| **Aura** | Centered on caster | Radius = listed area size, moves with caster |

---

## Condition Severity Guidelines

### Minor Conditions (Rank 0-1)

**Duration**: Briefly to Short

- **Slowed**: Movement reduced by 1 range category
- **Shaken**: -1 bane on attack rolls
- **Dazed**: -1 bane on all rolls
- **Burning (low)**: 2 damage per turn
- **Blinded (briefly)**: Cannot see
- **Deafened**: Cannot hear

### Moderate Conditions (Rank 2-3)

**Duration**: Short to Medium

- **Frightened**: Cannot willingly approach source, -1 bane on all rolls
- **Poisoned**: -1 bane on attack and damage rolls
- **Burning (moderate)**: 4 damage per turn
- **Charmed**: Friendly disposition, won't attack charmer
- **Confused**: Random action or no action
- **Staggered**: Can take Action OR Move, not both
- **Restrained**: Movement 0, -2 banes on attack/Dodge

### Severe Conditions (Rank 4-5)

**Duration**: Briefly to Short (very powerful, so short duration)

- **Stunned**: Cannot take actions or reactions, auto-fail Dodge
- **Paralyzed**: Incapacitated, auto-fail physical saves
- **Unconscious**: Asleep or knocked out
- **Dominated**: Charmed and obeys mental commands
- **Petrified**: Turned to stone
- **Blinded (long)**: Extended vision loss

### Save Frequency

**No save**: Very rare, only for utility or self-buff  
**Save negates**: Most common for conditions  
**Save ends**: Condition persists until successful save  
**Save once**: Initial save, no repeats  
**Save each turn**: Powerful effects, target gets repeated chances

**Example frequencies**:
- Rank 1-2: Save negates, no repeats
- Rank 3-4: Save negates, repeat save at end of duration
- Rank 5: Save negates, repeat save each turn or when take damage

---

## Power Budget System

### Allocating Spell Power

Each spell has a "power budget" based on its rank. You can spend this budget on various effects.

**Base Budget by Rank**:
- Rank 0: 1 point
- Rank 1: 2 points
- Rank 2: 3 points
- Rank 3: 4 points
- Rank 4: 5 points
- Rank 5: 6 points

### Effect Costs

| Effect | Power Cost |
|--------|------------|
| **Standard damage** (for rank) | 1 point |
| **Minor condition** (briefly, minor effect) | 0.5 points |
| **Moderate condition** (short, moderate effect) | 1 point |
| **Severe condition** (stunned, dominated) | 2 points |
| **Buff (+1 bonus)** | 0.5 points |
| **Buff (+2 bonus)** | 1 point |
| **Buff (+3 bonus)** | 1.5 points |
| **Summon (tier = rank)** | 1.5 points |
| **Zone (standard size)** | 1 point |
| **Utility (information)** | 0.5-1 point |
| **Utility (transportation)** | 1-2 points |

### Example Power Budgets

**Rank 2 Spell (3 points)**:
- Option A: Standard AoE damage (1) + moderate condition on crit (1) = 2 points ✅
- Option B: Standard single-target damage (1) + buff ally (+2 bonus) (1) = 2 points ✅
- Option C: Summon Tier 2 creature (1.5) + zone effect (1) = 2.5 points ✅
- Option D: Standard damage (1) + severe condition (2) = 3 points, but REDUCE damage by 1 step ✅

**Rank 4 Spell (5 points)**:
- Option A: High AoE damage (1) + moderate condition (1) + secondary damage (0.5) = 2.5 points ✅
- Option B: Summon Tier 4 creature (1.5) + buff allies (+3 bonus) (1.5) = 3 points ✅
- Option C: Standard damage (1) + severe condition (2) + zone effect (1) = 4 points ✅

### Red Flags (Over Budget)

❌ Rank 2 spell with standard damage + severe condition + AoE (would cost 4+ points)  
❌ Rank 1 buff granting +3 bonus and resistance to 3 damage types (would cost 3+ points)  
❌ Rank 3 summon creating 3× Tier 4 creatures (would cost 6+ points)

**Solution**: Reduce one component (damage, condition severity, area, duration, or tier).

---

## Quick Validation Checklist

Use this checklist to validate your custom spell:

### Damage Validation
- [ ] Single-target damage matches rank formula exactly
- [ ] AoE damage is reduced by one rank
- [ ] If adding condition, damage is reduced by 1-2 steps
- [ ] Damage type is appropriate for tradition/discipline

### Bonuses Validation
- [ ] Numeric bonuses match rank (+1 at low, +2 at mid, +3 at high)
- [ ] Damage bonuses follow rank progression (+2/+4/+6/+8/+10)
- [ ] Multiple bonuses don't exceed power budget
- [ ] Duration is appropriate for bonus magnitude

### Summoning Validation
- [ ] Creature tier matches rank (Tier = Rank ±1)
- [ ] Quantity is reasonable (1-3 creatures max at crit)
- [ ] Duration scales with success level
- [ ] Concentration required if creatures act independently

### Condition Validation
- [ ] Condition severity matches rank (minor/moderate/severe)
- [ ] Target Number is 6 + Rank
- [ ] Save type is appropriate (Resist/Dodge/Parry)
- [ ] Duration scales: Weak = briefly, Strong = short, Critical = medium

### Area Validation
- [ ] Area size matches rank guidelines
- [ ] Larger areas have reduced damage or effects
- [ ] Blast shape is clearly defined
- [ ] Range is appropriate for area size

### Duration Validation
- [ ] Duration matches rank and effect power
- [ ] Concentration required for powerful ongoing effects
- [ ] Permanent effects only at Rank 4-5 with costs
- [ ] Duration scales meaningfully with success levels

### General Balance
- [ ] Power budget doesn't exceed rank allocation
- [ ] Not strictly better than existing spells
- [ ] Has clear counterplay or limitations
- [ ] Rank 5 or below (bounded power ceiling)

### Clarity Validation
- [ ] All mechanics are unambiguous
- [ ] Success levels clearly defined
- [ ] Properties correctly listed
- [ ] Targeting is explicit (vs. Dodge/Resist/Parry or auto-hit)

---

## Example Calculations

### Example 1: Rank 3 Damage Spell

**Goal**: Create a fire spell for a boss enemy.

**Damage**: Rank 3 AoE = +6/+12/+18  
**Condition**: Burning (4) on critical (minor addition)  
**Area**: Close burst (standard for Rank 3)  
**Duration**: Short for burning  

**Validation**:
- ✅ Damage matches Rank 3 AoE formula
- ✅ Burning only on critical is minor addition
- ✅ Close area is standard
- ✅ Power budget: 1 (damage) + 0.5 (condition on crit) = 1.5 / 4 available ✅

**Result**: Balanced spell, proceed to write.

### Example 2: Rank 2 Buff Spell

**Goal**: Create a weapon enhancement.

**Bonus**: +4 damage (Rank 2 standard)  
**Duration**: Medium (standard for Rank 2)  
**Properties**: enchant (weapon), singular  
**Additional**: Emits light  

**Validation**:
- ✅ +4 damage matches Rank 2 formula
- ✅ Medium duration appropriate
- ✅ Light emission is flavor (no cost)
- ✅ Power budget: 1 (damage bonus) = 1 / 3 available ✅

**Result**: Balanced, has room for small addition on strong/crit.

### Example 3: Rank 4 Summoning Spell

**Goal**: Summon powerful elemental.

**Weak**: Tier 3 (1 creature), short duration  
**Strong**: Tier 4 (1 creature), medium duration  
**Critical**: Tier 5 (2 creatures), medium duration  

**Validation**:
- ✅ Tiers match Rank 4 guidelines
- ✅ Quantities reasonable
- ✅ Duration scales appropriately
- ✅ Power budget: 1.5 (summon) + 0.5 (extra creature on crit) = 2 / 5 available ✅

**Result**: Balanced, has room for minor rider effect.

### Example 4: Rank 5 Control Spell (INVALID)

**Goal**: Dominate person permanently.

**Condition**: Dominated (severe condition = 2 points)  
**Duration**: Permanent (should cost 2+ points)  
**Save**: None  

**Validation**:
- ❌ Power budget: 2 (condition) + 2 (permanent) + 1 (no save) = 5, but condition + permanent together is broken
- ❌ Exceeds Rank 5 bounded power ceiling
- ❌ No counterplay (no save, no end)

**Fix**:
- Change to "Medium duration while concentrating"
- Add "Target can save at end of each turn"
- Add "Breaks if target takes damage"

**Result After Fix**:
- ✅ Power budget: 2 (condition) + concentration limit + saves = reasonable
- ✅ Has counterplay

---

## Conclusion

Use these tables and guidelines to quickly validate that your custom spells are balanced and appropriate for their rank. When in doubt:

1. **Start conservative** (use lower values)
2. **Compare to existing spells** at the same rank
3. **Test in actual play** and adjust if needed
4. **Respect the power ceiling** (Rank 5 ≠ godlike)

Remember: It's easier to buff a weak spell than nerf an overpowered one!
