# Talent System Analysis

> **Scope:** Comprehensive audit of the talent system against archetype instructions, talent creation guidelines, and modern game systems (Challenges, Social Intrigue, Travel). Covers combat balance and power scaling, design pattern review, archetype signature talent coverage, martial/hybrid/caster differentiation, progression evaluation through Rank 5, Prestige Talent feasibility, capstone talent design, and a complete catalog of proposed new and updated talents.
>
> **References:** [Character Progression](../../01-basic-rules/04-character-progression.md) | [Talent Creation Guidelines](../../../.github/instructions/talent-system-design-guidelines.md) | [Archetype Instructions](../../../.github/instructions/archetype-design-guidelines.md) | [Challenge System](../../06-scenes/07-challenges/00-overview.md) | [Social Intrigue](../../06-scenes/07-challenges/01-social-intrigue.md) | [Travel](../../06-scenes/07-challenges/02-travel.md) | [Combat Arts](../../05-combat/02-combat-arts.md) | [Challenge & Social Intrigue Talent Integration](./CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md) | [Travel Talent Integration](./TRAVEL_TALENT_INTEGRATION.md)

---

## 1. Executive Summary

### Key Findings

1. **122 talents across 16 skills** form a functional foundation. 114 are fully implemented (94%), with 8 containing placeholder or stub content across 4 skills.
2. **Combat talents dominate** (~58% combat-primary), while utility, exploration, and social talents are under-represented — particularly in skills like Archery, Athletics, and Perception.
3. **Talent progression caps at Rank 3** for the vast majority of talents (only Arcane Spell Knowledge, Battle Mage, Mystical Spell Knowledge, Art of Fighting, Art of Archery, and Magical Sense reach Rank 4). No talents currently reach Rank 5, creating a dead zone for Grandmaster-level characters.
4. **Modern system integration is minimal.** Only 5 talents interact with the Challenge system, 8 with Social Intrigue, and 3 with Travel mechanics — all well below the 15+ target per system.
5. **Critical archetype gaps remain.** Oracle, Bard, Tamer, Hoplite, and Warlock lack dedicated mechanical support from the talent system. Key identity tags (Infiltration, Whip Control, Zone Control, Prophecy) have zero or near-zero talent representation.
6. **Skill disparity is significant.** Fighting has 14 talents while Streetwise has only 4. Four skills (Insight, Streetwise, Influence, Perception) have ≤5 talents, limiting build diversity for dependent archetypes.
7. **Defensive variety is thin.** Redirection (0%), Avoidance (5%), and reactive defense talents are critically under-developed for a system with lethal combat.
8. **No Rank 4–5 talent framework exists.** The progression system supports Ranks 4–5, but talent design has not followed. This gap leaves high-level characters investing XP without commensurate talent payoff.
9. **Internal scaling creates bookkeeping.** At least 28 talents have bonuses that recalculate when skill ranks or attributes increase. This creates hidden complexity for players leveling up.
10. **Several talents have problematic design patterns** including overloaded rank entries, vague triggers, stances with unclear activation/deactivation rules, and passive abilities that are strictly superior to alternatives at the same rank.

### Design Principles

1. **Fiction-first, mechanically precise.** Talents describe abilities narratively but must have unambiguous triggers, effects, and limits.
2. **Skill-internal diversity.** Every skill should support combat, utility, and downtime play through its talent pool.
3. **Bounded power ceiling.** Rank 5 = mortal pinnacle (≈ D&D level 10–12). Growth comes from efficiency, reliability, and breadth — not raw power inflation.
4. **System integration.** Talents should create meaningful interactions with Challenges, Social Intrigue, Travel, and Combat Arts.
5. **Archetype enablement.** Talents empower archetypes without locking builds. Multi-skill synergies should be rewarding, not mandatory.
6. **Minimal bookkeeping.** Talents should avoid internal scaling that forces recalculation when skill ranks or attributes change. Prefer fixed bonuses and tiered unlocks over formulas.

---

## 2. Current System Audit

### 2.1 Talent Economy

**Earning:** 1 Talent Point (TP) per 2 XP invested in a skill.

**Spending:** 1 TP to learn a new talent at Rank 1, or increase an existing talent's rank by 1.

**Constraint:** Maximum talent rank = current skill rank.

| Skill Rank | XP Required | Max Talent Rank | TP Earned (cumulative) |
|------------|-------------|-----------------|------------------------|
| 1 (Novice) | 2 | 1 | 1 |
| 2 (Adept) | 6 | 2 | 3 |
| 3 (Expert) | 12 | 3 | 6 |
| 4 (Master) | 18 | 4 | 9 |
| 5 (Grandmaster) | 24 | 5 | 12 |

**Key Observation:** A Rank 5 skill generates 12 TP. With most talents capping at Rank 3, a Grandmaster-tier character has ~3 unspendable TP per skill — a significant dead zone.

### 2.2 Talent Distribution by Skill

| Skill | Total | Max Rank | Complete | Incomplete | Combat | Utility | Hybrid |
|-------|-------|----------|----------|------------|--------|---------|--------|
| **Fighting** | 14 | 4 | 14 | 0 | 13 | 0 | 1 |
| **Fortitude** | 11 | 3 | 10 | 1 | 8 | 2 | 1 |
| **Mysticism** | 11 | 4 | 10 | 1 | 6 | 4 | 1 |
| **Archery** | 9 | 4 | 9 | 0 | 8 | 0 | 1 |
| **Athletics** | 9 | 3 | 8 | 1 | 7 | 0 | 2 |
| **Arcana** | 8 | 4 | 8 | 0 | 4 | 2 | 2 |
| **Nature** | 8 | 3 | 7 | 1 | 4 | 1 | 3 |
| **Influence** | 7 | 3 | 5 | 2 | 3 | 1 | 3 |
| **Survival** | 7 | 3 | 3 | 4 | 2 | 2 | 3 |
| **Crafting** | 6 | 3 | 5 | 1 | 1 | 4 | 1 |
| **Education** | 6 | 3 | 6 | 0 | 1 | 2 | 3 |
| **Lore** | 6 | 4 | 6 | 0 | 1 | 3 | 2 |
| **Stealth** | 6 | 3 | 4 | 2 | 2 | 3 | 1 |
| **Perception** | 5 | 3 | 5 | 0 | 3 | 0 | 2 |
| **Insight** | 5 | 3 | 4 | 1 | 1 | 1 | 3 |
| **Streetwise** | 4 | 3 | 3 | 1 | 3 | 1 | 0 |
| **Totals** | **122** | — | **114** | **8** | **67** | **26** | **29** |

**Distribution:** 55% Combat / 21% Utility / 24% Hybrid

### 2.3 Incomplete Talents

| Talent | Skill | Issue |
|--------|-------|-------|
| Adrenaline Rush | Fortitude | Stub — description only, no rank content |
| Supernatural Mobility | Athletics | Stub — description only, no rank content |
| Performer | Influence | Stub — description only, no rank content |
| Presence of Conquest | Influence | Stub — description only, no rank content |
| Foresight | Insight | Stub — description only, no rank content |
| Divine Favor | Mysticism | Stub — no rank structure defined |
| Herbalist | Nature | Stub — description only, no rank content |
| Master Artisan | Crafting | Stub — requires Artisan Rank 3, no rank content |
| Plant Lore | Nature | Rank 3 placeholder (XXX) |
| Knowledgeable Wanderer | Nature | Rank 3 incomplete (TODO) |
| Magical Sense | Lore | Rank 4 placeholder (???) |
| Roguish Wits | Stealth | Rank 3 placeholder (XXX) |
| Sleight of Hand | Stealth | Rank 3 placeholder (XXX) |
| I Know A Guy | Streetwise | Ranks 2–3 placeholder (XXX) |
| Explorer of Nature | Survival | Rank 3 placeholder (XXX) |
| Relentless Tracker | Survival | Ranks 2–3 placeholder (XXX) |
| Wilderness Expert | Survival | Rank 3 placeholder (XXX) |

**Priority:** Completing these before adding new talents prevents broken progression paths.

### 2.4 Rank Distribution

| Max Rank | Count | % |
|----------|-------|---|
| Rank 3 | 113 | 93% |
| Rank 4 | 6 | 5% |
| Stub (no ranks) | 4 | 3% |
| Rank 5 | 0 | 0% |

The six Rank 4 talents are: Arcane Spell Knowledge, Battle Mage, Mystical Spell Knowledge, Art of Fighting, Art of Archery, and Magical Sense.

---

## 3. Strengths of the Current System

### 3.1 Strong Combat Foundations

The talent system excels at providing tactical combat options across martial skills:

- **Fighting (14 talents)** covers weapon mastery (6 weapon types), defensive styles (Defensive Dueling, Protective Stance, Riposte, Shield Mastery), offensive techniques (Dual Wielder, Martial Artist, Pugilist), and skill progression (Art of Fighting, Disciplined Fighter).
- **Archery (9 talents)** provides weapon specialization (Crossbow Mastery, Expert Slinger), technique variety (Rapid Shot, Sharpshooter, Ammo Specialist), and defensive options (Reflexive Shooter, Strong Grip).
- **Fortitude (11 talents)** delivers tanking and resilience (Heavy Armor Mastery, Body of Bronze, Hard to Kill, Second Wind, Juggernaut) alongside thematic combat styles (Battle Rage, Drunken Technique).

### 3.2 Magic System Integration

Both spellcasting skills have well-designed talent support:

- **Arcana (8 talents)** covers spell knowledge progression (Arcane Spell Knowledge), combat casting (Battle Mage, Spellblade), resource management (Inexhaustible Mind, Mana Shield), and spell enhancement (Master of Fundamentals, Spellweaver, Wild Overload).
- **Mysticism (11 talents)** provides parallel progression (Mystical Spell Knowledge) with thematic breadth: divine combat (Mystic Champion, Armor of the Faithful), communal magic (Communal Practices, Pact of Devotion), sensory abilities (Divine Sense), and ritual enhancement (Divine Rites, Master of Principles, Elemental Adept, Shape Changer).

### 3.3 Clear Rank Progression

Most completed talents follow a clean progression pattern:
- **Rank 1:** Unlocks a new option or playstyle.
- **Rank 2:** Adds a payoff ability, situational boon, or secondary effect.
- **Rank 3:** Provides mastery — reliability, signature moves, or encounter-shaping tools.

This aligns well with the design guideline of *unlock → payoff → mastery*.

### 3.4 Weapon Mastery Diversity

Fighting's 6 weapon mastery talents (Axe, Blade, Heavy Weapon, Mace, Polearm, Shield) create meaningful differentiation between martial loadouts. Each mastery grants weapon-specific bonuses that complement the weapon's properties.

---

## 4. Gap Analysis

### 4.1 Skill Size Disparity

**Target:** 8–12 talents per skill for healthy build diversity.

| Category | Skills | Count Range | Status |
|----------|--------|-------------|--------|
| Over-served | Fighting | 14 | ⚠️ Could split into sub-categories |
| Well-served | Fortitude, Mysticism | 11 each | ✅ |
| Adequate | Archery, Athletics, Arcana, Nature | 8–9 | ✅ |
| Under-served | Crafting, Education, Lore, Stealth, Survival | 6–7 | ⚠️ Need 1–4 additions |
| Critically low | Influence, Insight, Perception, Streetwise | 4–5 | ❌ Need 3–6 additions each |

### 4.2 Missing Archetype Support

Cross-referencing the 26 archetypes against talent availability reveals significant gaps:

| Archetype | Pillar + Supports | Talent Coverage | Missing Elements | Priority |
|-----------|-------------------|-----------------|------------------|----------|
| **Oracle** | Mysticism, Lore, Insight, Education | 27 accessible | Prophecy, omens, foresight mechanics | Critical |
| **Bard** | Mysticism, Influence, Education, Stealth | 28 accessible | Music magic, performance effects | Critical |
| **Tamer** | Fighting, Nature, Athletics, Survival | 35 accessible | Whip control, advanced beast training | High |
| **Hoplite** | Fighting, Athletics, Influence, Fortitude | 38 accessible | Formation tactics, zone control | High |
| **Warlock** | Arcana, Lore, Insight, Fortitude | 28 accessible | Pact mechanics, curses, familiar | High |
| **Rogue** | Fighting, Stealth, Streetwise, Insight | 28 accessible | Infiltration, lockpicking, planning | High |
| **Engineer** | Crafting, Education, Archery, Perception | 26 accessible | Siege devices, contraptions, traps | Medium |
| **Apothecary** | Crafting, Education, Nature, Insight | 23 accessible | Alchemy talents, tinctures, remedies | Medium |

### 4.3 Missing Identity Tags

The following archetype-defining mechanics have zero talent representation:

| Identity Tag | Dependent Archetypes | Required Skills |
|-------------|---------------------|-----------------|
| **Infiltration** (lockpicking, bypass, silent entry) | Rogue, Duelist, Bard | Stealth, Streetwise |
| **Whip control** (reach control, trip, subdual) | Tamer | Fighting |
| **Zone control** (area denial, formation, choke points) | Hoplite, Fighter, Warlord | Fighting, Education |
| **Prophecy** (visions, omens, fate manipulation) | Oracle | Insight, Lore, Mysticism |
| **Music/Performance magic** (AoE buffs, charm through art) | Bard | Influence, Mysticism |
| **Pact mechanics** (patron obligations, eldritch abilities) | Warlock | Arcana, Lore |
| **Alchemy** (potions, bombs, remedies) | Apothecary, Engineer | Crafting, Nature |

### 4.4 Role Distribution Deficits

Evaluated against design guidelines (each skill should support combat, utility, and downtime):

| Role | Current % | Target % | Gap | Most Affected Skills |
|------|-----------|----------|-----|---------------------|
| **Offense** | 38% | 25–30% | Over-represented | Fighting, Archery |
| **Defense — Redirection** | 0% | 5–10% | ❌ Critical gap | All skills |
| **Defense — Avoidance** | 5% | 10–15% | ❌ Large gap | Athletics, Stealth, Perception |
| **Utility — Travel** | 3% | 10–15% | ❌ Large gap | Survival, Nature, Perception |
| **Utility — Exploration** | 8% | 10–15% | ⚠️ Below target | Streetwise, Insight, Nature |
| **Support — Team** | 12% | 15–20% | ⚠️ Below target | Education, Influence, Lore |
| **Healing** | 5% | 5–10% | ✅ Appropriate | Nature, Mysticism, Fortitude |

### 4.5 Defensive Talent Gaps

In a system with lethal combat, defensive variety is essential. Current defensive talents:

| Category | Examples | Count | Status |
|----------|----------|-------|--------|
| **Mitigation** | Heavy Armor Mastery, Body of Bronze, Mana Shield | 6 | ✅ Adequate |
| **Avoidance** | Evasion, Light Armor Mastery | 4 | ⚠️ Needs expansion |
| **Counterplay** | Riposte, Defensive Dueling | 3 | ⚠️ Needs expansion |
| **Redirection** | — | 0 | ❌ Missing entirely |
| **Reactive defense** | Reflexive Shooter | 1 | ❌ Near-missing |

**Recommendation:** Add redirection talents (Insight-based: redirect attacks), avoidance talents (Stealth-based: vanish in combat), and reactive defense talents (Perception-based: danger sense in combat).

---

## 5. Combat Talent Balance & Power Scale Analysis

This section analyzes the damage contribution, defensive value, and overall power of combat-relevant talents across progression tiers. The goal is to identify bonuses that are too powerful, too weak, or that create excessive bookkeeping through internal scaling.

### 5.1 Damage Formula Context

The core damage formula is: **½ Attribute (base) + Weapon Damage × SL multiplier + flat bonuses − AV**

| Success Level | Formula | Example (d10 STR, Longsword 3) |
|---------------|---------|-------------------------------|
| Weak | ½ Attr + 1 × WD | 5 + 3 = **8** |
| Strong | ½ Attr + 2 × WD | 5 + 6 = **11** |
| Critical | ½ Attr + 3 × WD | 5 + 9 = **14** |

Ability bonuses and other flat damage are added to the total (not multiplied by SL). This means a +3 ability bonus to damage always adds exactly +3, regardless of success level. This is a crucial balance property.

**Benchmark HP pools** (creature HP by tier, adventurer HP by level):

| Tier/Level | Creature HP | Adventurer HP (approx) |
|------------|------------|----------------------|
| 1 | 10 | 18 |
| 3 | 30 | 22 |
| 5 | 50 | 26 |
| 7 | 70 | 30 |
| 10 | 100 | 38 |

**Benchmark AV** (light 1–4 AV, heavy 4–6 AV, shields +2–3). A level 5 character in chain mail + shield has ~7 AV. This matters because flat damage bonuses become proportionally more important as AV rises.

### 5.2 Ability Bonus Damage Audit

**Ability bonus** is the most common talent-sourced damage modifier. Since only one ability bonus applies (highest wins), stacking is impossible — a good design property. However, the *value* of these bonuses varies considerably.

| Talent | Rank | Bonus Type | Value at R3 Skill | Value at R5 Skill | Scaling? | Assessment |
|--------|------|-----------|-------------------|-------------------|----------|------------|
| Battle Mage | R3 | +Arcana damage | +3 | +5 | ⚠️ Yes (skill rank) | Strong — +5 at R5 is the largest flat ability bonus in the system |
| Master of Fundamentals | R2 | +Arcana to R0 spell damage | +2 | +4 | ⚠️ Yes (skill rank) | Moderate — restricted to cantrips only |
| Mystic Champion / Spellblade | R1–3 | +spell damage to weapon | Varies by spell | Varies by spell | ⚠️ Yes (spell selection) | Complex — damage depends on spell choice, not a fixed value |
| Master of Principles | R2 | +Mysticism to R0 damage | +2 | +4 | ⚠️ Yes (skill rank) | Moderate — mirrors Master of Fundamentals |
| Martial Artist | R3 | +Fighting damage | +3 | +5 | ⚠️ Yes (skill rank) | Strong — applies to improvised/unarmed, which are otherwise weaker |
| Heavy Weapon Mastery | R3 | +½ Strength damage | +3 (d10) | +3 (d10) | ⚠️ Yes (attribute) | Moderate — requires giving up all movement |
| Polearm Mastery | R3 | +½ Strength on charge | +3 (d10) | +3 (d10) | ⚠️ Yes (attribute) | Moderate — Charge is situational |
| Ammo Specialist | R3 | +Archery damage | +3 | +5 | ⚠️ Yes (skill rank) | Moderate — requires Supply checks |
| Expert Slinger | R2 | +Archery at close/short | +2 | +4 | ⚠️ Yes (skill rank) | Moderate — range restricted |
| Grappler | R3 | +Athletics damage | +3 | +5 | ⚠️ Yes (skill rank) | Moderate — only while grappling |
| Assassination | R3 | +Stealth damage | +3 | +5 | ⚠️ Yes (skill rank) | Strong — combined with SL boost from R1, this is very high burst |
| Inspire Ally | R1 | +Influence damage | +1 at R1 | +5 | ⚠️ Yes (skill rank) | ⚠️ Over-powered at R1 — grants flat damage bonus from the first rank, scaling to +5 |
| Insult to Injury | R2 | +Influence damage vs distracted | +2 | +4 | ⚠️ Yes (skill rank) | Strong — party-wide damage bonus |
| Commander | R2 | +Education damage (ally) | +2 | +4 | ⚠️ Yes (skill rank) | Strong — no action cost for ally |
| Tactician | R3 | +Education damage (once/scene) | +2 | +4 | ⚠️ Yes (skill rank) | Moderate — limited use |
| Identify Weakness | R1 | +Perception damage | +1 at R1 | +4 | ⚠️ Yes (skill rank) | Strong — applies to entire party's attacks against focused target |
| Monster Hunter | R1 | +Survival damage | +1 at R1 | +4 | ⚠️ Yes (skill rank) | Moderate — only vs larger creatures |
| Animal Companion | R3 | +Nature damage | +3 | +5 | ⚠️ Yes (skill rank) | Moderate — companion attack only |

**Key Pattern:** 22 of 28 damage-relevant talents use internal scaling (bonus = skill rank or ½ attribute). This means every time a character increases a skill rank or attribute, they must recalculate the bonus from potentially multiple talents. At level-up this creates significant bookkeeping.

### 5.3 Power Level Assessment

#### Over-Performing Talents

| Talent | Issue | Details |
|--------|-------|---------|
| **Inspire Ally R1** | Damage bonus at R1 | Grants +Influence damage to ally attacks from Rank 1. At Influence 1 this is minor (+1), but the talent scales to +5 at R5 without increasing rank — a R1 talent shouldn't reach +5 damage. |
| **Insult to Injury R2** | Party-wide damage | Every ally in melee with a distracted target adds +Influence to damage. With a 4-person party, this is effectively +8 to +20 total party damage per round from a single R2 talent. |
| **Assassination R1+R3** | Burst damage stacking | R1 upgrades SL by one step (weak→strong, strong→critical) AND R3 adds +Stealth flat damage. Against an unaware target, a R3 Assassin with d10 AGI, Shortbow (3), Stealth 3 deals: 5 + 6 (strong, upgraded from weak) + 3 = **14 damage** minimum. With actual strong hit: 5 + 9 + 3 = **17**. This is nearly a one-shot on same-tier creatures. |
| **Battle Mage R3** | Scaling ceiling | +Arcana to all weapon damage. At R5 Arcana, this is +5 to every hit — the largest unconditional ability bonus in the system. Combined with R4's free cantrip, this makes Battle Mage the strongest sustained-damage talent line. |
| **Identify Weakness R1** | Party multiplier | The +Perception damage applies to the focused creature from *any* attacker, not just the user. In a 4-person party, this effectively quadruples the bonus value. |

#### Under-Performing Talents

| Talent | Issue | Details |
|--------|-------|---------|
| **Pugilist R3** | Damage cap | Unarmed damage caps at 4 weapon damage at R3. With ½ Strength (d10=5), a weak hit deals 5+4=9. A Longsword user deals 5+3=8 at weak, but 5+6=11 at strong. Unarmed needs critical hits to compete with one-handed weapons at strong hits. |
| **Strong Grip R3** | Condition + low bonus | Requires giving up all movement AND uses +½ Strength (max +3 with d10). The damage bonus is half what Battle Mage R3 provides (+5 at R5) with a harsher restriction. |
| **Mace Mastery R1** | Weak baseline | "Minimum weapon damage" sounds good but is rarely relevant. Against any AV-wearing target, weapon damage minus AV often exceeds 0 anyway. This ability matters only at high AV differentials. |
| **Expert Slinger R2** | Range restriction | +Archery damage only at close/short range with thrown weapons puts the user in melee danger for a modest bonus. Ranged fighters want to stay at medium+ range. |
| **Peak Performance R1** | Tiny bonus | +1 weapon damage (enhancement bonus) on one item overnight is negligible compared to talent opportunity cost. At R3 it becomes +2/+4 which is decent but requires 3 TP for a marginal combat bonus. |

#### Appropriately Powered Talents

| Talent | Why It Works |
|--------|-------------|
| **Riposte** | Reactive counterattack with clear trigger (enemy misses melee vs Parry), escalating utility (R2: stop movement, R3: daze). No internal scaling — effects are fixed conditions. |
| **Rapid Shot** | Clear tradeoff (R1: two attacks with banes; R2: remove banes). Power comes from action economy, not scaling numbers. |
| **Defensive Dueling** | Flat +1 Parry at R1 with a clear condition (single weapon, no shield). No recalculation needed. R2 adds a reactive option (spend Quick Action for temporary defense). |
| **Shield Mastery** | Reduces incoming SL (R1), reduces armor penalty (R2), improves durability (R3). Each rank provides a distinct mechanical benefit without scaling numbers. |
| **Evasion** | R1: Retreat as Quick Action. R2: Extra Quick Action. R3: Halve damage once per scene. Clean progression of new capabilities, no recalculation. |

### 5.4 Internal Scaling Audit

**Internal scaling** = a talent bonus that changes value when the character's skill rank or attribute die changes, requiring recalculation.

| Scaling Type | Talents Using It | Bookkeeping Impact |
|-------------|-----------------|-------------------|
| **+Skill Rank to damage** | Battle Mage, Master of Fundamentals, Master of Principles, Ammo Specialist, Expert Slinger, Grappler, Assassination, Martial Artist, Inspire Ally, Insult to Injury, Commander, Tactician, Identify Weakness, Monster Hunter, Animal Companion | **15 talents** — High impact. Must recalculate on every skill rank increase. |
| **+½ Attribute to damage** | Heavy Weapon Mastery, Polearm Mastery, Strong Grip | **3 talents** — Moderate impact. Recalculate on attribute increase (less frequent). |
| **+Skill Rank to healing** | Second Wind, Field Medic, Commander, Tactician, Inspire Ally, Pact of Devotion (Protection) | **6 talents** — Moderate impact. |
| **+Skill Rank to AV** | Body of Bronze, Armor of the Faithful, Mana Shield, Juggernaut, Expert Rider | **5 talents** — Moderate impact. Defensive scaling is less urgent to track. |
| **+Skill Rank to conditions** | Sharpshooter (marked), Defensive Dueling (marked), Drunken Technique (marked), Devious Tactics (marked) | **4 talents** — Low impact. Marked values change infrequently. |
| **+Skill Rank to uses/day** | Inexhaustible Mind, Divine Rites, Divine Sense | **3 talents** — Low impact. Recalculate once on rank-up. |

**Total:** 28 talents with some form of internal scaling. Of these, 15 scale damage with skill rank — the most impactful form of bookkeeping.

### 5.5 Recommendations: Reducing Internal Scaling

**Principle:** Replace "+Skill Rank" scaling with fixed bonuses appropriate to the talent's rank. A talent learned at R3 should have a damage bonus fixed at R3 power level — it shouldn't silently increase when the player later raises the skill to R4 or R5.

**Proposed pattern:**

| Talent Rank Acquired | Fixed Damage Bonus | Fixed Healing Bonus | Rationale |
|---------------------|-------------------|---------------------|-----------|
| R1 | +1 | +2 | Minor supplement — about +12% of a Weak hit |
| R2 | +2 | +4 | Moderate payoff — about +25% of a Weak hit |
| R3 | +3 | +6 | Strong payoff — about +35% of a Weak hit |
| R4 | +4 | +8 | Encounter-shaping territory |
| R5 | +5 | +10 | Peak mortal — the absolute ceiling |

**Example conversion:** Battle Mage R3 currently reads "add your Arcana to weapon damage (ability bonus)." At R3 Arcana this is +3, at R5 it's +5. Proposed revision: "add +3 damage to weapon attacks (ability bonus)." The bonus is now fixed and won't create surprise power spikes when Arcana increases.

**Exception:** Talents where internal scaling IS the core identity (e.g., Spell Knowledge granting +2 Focus per rank, Pugilist increasing unarmed weapon damage per rank) should keep their scaling because the rank-up *is* the investment. The concern is talents where the bonus silently scales with an unrelated progression.

### 5.6 Defensive Talent Power Assessment

| Talent | Rank | Defensive Value | Assessment |
|--------|------|----------------|------------|
| **Defensive Dueling R1** | R1 | +1 Parry (ability bonus) | ✅ Appropriate — equivalent to a shield's parry bonus, with a clear restriction |
| **Body of Bronze R1** | R1 | AV = 1 + Fortitude (armor bonus) | ⚠️ Scales from 2 to 6 AV — matches light/medium armor at low levels, exceeds it at high levels. At Fortitude 5, this grants 6 AV with no load, no rigid, and no durability concerns — strictly superior to all physical armor. |
| **Armor of the Faithful R1** | R1 | AV = 1 + Mysticism (armor bonus) | ⚠️ Same scaling issue as Body of Bronze. |
| **Heavy Armor Mastery R2** | R2 | Double AV bonus once per scene | ✅ Appropriate — limited use, reactive timing |
| **Evasion R3** | R3 | Halve physical damage once per scene | ✅ Appropriate — powerful but once per scene |
| **Mana Shield R1** | R1 | AV = 2 + spell rank (armor bonus) | ⚠️ At spell rank 5, this is 7 temporary AV — potentially higher than Plate Harness. Duration-limited but still very high ceiling. |
| **Protective Stance R3** | R3 | Resistance to damage when protecting ally | ✅ Appropriate — requires ally positioning and shield |

**Key concern:** Body of Bronze and Armor of the Faithful both scale AV with skill rank, creating unarmored characters who exceed plate armor at high levels. This contradicts the bounded power ceiling — consider capping at a fixed value (e.g., AV 4) or requiring the bonus to replace, not supplement, armor.

---

## 6. Design Pattern Audit

This section identifies talents with problematic design patterns and recommends structural improvements.

### 6.1 Problematic Design Patterns

#### Pattern A: Overloaded Rank Entries

Some talent ranks cram multiple distinct abilities into a single rank, making them hard to remember and track.

| Talent | Rank | Abilities in Single Rank | Issue |
|--------|------|------------------------|-------|
| **Battle Rage** | R1 | +1 boon on STR rolls, spend HP for damage, +1 bane on MND, can't cast spells, fatigue on end | 5 distinct effects in one rank — excessive cognitive load |
| **Pact of Devotion** | R1–R3 | Each pact type has 3–5 effects per rank across 4 pact options | Effectively 12+ sub-abilities — the most complex talent in the system |
| **Explorer's Tenacity** | R2–R3 | R2: double fatigue healing, choose fatigue over injury; R3: heal injury, double ration rolls | Multiple unrelated abilities per rank |
| **Wilderness Expert** | R2 | Establish camp boon + wake-from-rest perception roll | Two unrelated abilities |

**Recommendation:** Limit each talent rank to 1–2 mechanically distinct effects. If a talent needs more breadth, split it into separate talents or use sub-choices (like Pact of Devotion's pact types, but each type should be simpler).

#### Pattern B: Stances Without Clear Activation/Deactivation

Several talents create ongoing states ("while enraged," "while in drunken stance") without explicit rules for starting and stopping.

| Talent | Issue |
|--------|-------|
| **Battle Rage** | When does rage start? Is it a Quick Action? An Action? Can you end it early? The talent says "while enraged" but never specifies how you enter or voluntarily exit the rage state. |
| **Drunken Technique** | "While in drunken stance" — is this always on while intoxicated, or does it require activation? Can you leave the stance? |

**Recommendation:** All stance-type talents should explicitly state: (1) activation cost (Quick Action, Action, or free on turn), (2) duration (until end of scene, concentration, or voluntary), and (3) termination conditions.

#### Pattern C: Passive Abilities That Obsolete Alternatives

Some passive talents provide permanent benefits that make comparable active/limited abilities irrelevant.

| Talent | Issue |
|--------|-------|
| **Escape Artist R3** | "Movement doesn't provoke Opportunity Attacks" — this is a permanent passive that obsoletes the Retreat Action entirely. Why ever Retreat when movement is free? |
| **Body of Bronze / Armor of the Faithful** | At high skill ranks, these provide better AV than the best physical armor with zero load and no rigid penalty. This makes Heavy Armor Mastery and Light Armor Mastery irrelevant for monks and mystics. |
| **General Education R1** | "No +1 bane for untrained expert skills using Mind" — this removes the core cost of being untrained in half the expert skills. Very powerful for a R1 talent with zero ongoing cost. |

**Recommendation:** Permanent passives that remove core system penalties should either (1) be placed at higher ranks (R3+), (2) have restrictions, or (3) provide a partial mitigation rather than full removal.

#### Pattern D: Talents With Unclear or Missing Limits

| Talent | Issue |
|--------|-------|
| **Inspire Ally R1** | Adds +Influence damage to any ally's successful attack via Quick Action. No per-scene limit at R1, no range limit beyond "can see/hear within medium distance." Could theoretically be used every turn forever. |
| **Insult to Injury R2** | "You and your allies add Influence to damage" against distracted targets. No limit on how many allies benefit or for how long. |
| **Communal Practices R1** | "Exclude any number of targets" from multi-target spells. No cost, no limit — always beneficial, never requires a choice. |

**Recommendation:** Talents that provide ongoing team benefits should have either (1) a per-scene/per-day limit, (2) an action cost that prevents other actions, or (3) a condition that can be removed/countered.

### 6.2 Limited Resources vs Passive/Active Analysis

The talent system uses three resource models:

| Model | Examples | Count | Strengths | Weaknesses |
|-------|---------|-------|-----------|------------|
| **Always-on passive** | Defensive Dueling R1, Dual Wielder R1, Sharpshooter R1–R2 | ~35 | Zero tracking, always relevant | Can feel "invisible" — players forget they have them |
| **Per-scene limited** | Disciplined Fighter R1, Evasion R3, Light Armor Mastery R1 | ~40 | Creates meaningful per-encounter decisions | Can feel wasted if scene ends early |
| **Per-day limited** | Hard to Kill R2, Inexhaustible Mind R1, Divine Sense R1 | ~15 | Creates strategic resource management | Punishes players who use abilities "wrong" |
| **Conditional trigger** | Riposte (enemy misses), Stand Your Ground (pushed/prone), Reflexive Shooter (enemy enters range) | ~20 | Emerge naturally from play, reward positioning | Inconsistent — may never trigger in some combats |
| **HP/Focus cost** | Battle Rage (2 HP for damage), Inexhaustible Mind R2 (2 HP per Focus) | ~5 | Creates risk/reward tension | Complex to track, can spiral into death |

**Balance assessment:**

The system has a healthy mix of passive and limited abilities. The main issue is **inconsistent limiting patterns within the same rank tier:**

- Some R1 talents are unlimited (Inspire Ally R1: use every turn), while others are once-per-scene (Disciplined Fighter R1: reroll once). These are comparable in power but wildly different in frequency.
- Per-day abilities are rare and concentrated in Fortitude/Mysticism. More per-day abilities would create interesting daily resource management.

**Recommendation:** Establish a standard resource budget per rank:
- **R1:** One significant ability, usable once per scene OR one minor passive
- **R2:** One payoff ability, unlimited if conditional OR once per scene if unconditional
- **R3:** One mastery ability, once per scene for powerful effects OR unlimited for moderate effects

### 6.3 Specific Talent Redesign Recommendations

| Talent | Issue | Proposed Fix |
|--------|-------|-------------|
| **Inspire Ally R1** | Unlimited +Influence damage with no cost | Add "once per scene" limit at R1; R2 upgrades to "once between each of your turns" |
| **Insult to Injury R2** | Party-wide scaling damage with no limit | Cap at "+2 damage (ability bonus)" fixed, not +Influence |
| **Battle Rage** | 5 effects in R1, unclear activation | Split into: R1 = activation (Quick Action) + core benefit (+1 boon STR, spend HP for +2 damage); R2 = drawbacks reduced (no bane on Mind, temp HP); R3 = damage resistance |
| **Body of Bronze R1** | AV scales beyond armor ceiling | Cap at "AV = 1 + Fortitude (max 4)" |
| **Armor of the Faithful R1** | AV scales beyond armor ceiling | Cap at "AV = 1 + Mysticism (max 4)" |
| **Mana Shield R1** | AV can reach 7+ at high spell ranks | Cap at "AV = 2 + spell rank (max 5)" |
| **General Education R1** | Removes untrained penalty entirely at R1 | Move to R2, or change to "reduce +1 bane to +1 bane only on first use per scene" |
| **Escape Artist R3** | Removes OA system entirely | Change to "once between turns, move without provoking" (mirrors Evasion's limited approach) |
| **Pact of Devotion** | 12+ sub-abilities across 4 pacts | Reduce each pact to 2 effects per rank maximum |

---

## 7. Archetype Signature Talents & Build Differentiation

### 7.1 Archetype Signature Talent Coverage

A **signature talent** is a talent that directly enables an archetype's core fantasy — the one talent a player of that archetype would consider mandatory. Every archetype should have at least one signature talent available at R1 in their pillar skill.

| Archetype | Pillar Skill | Signature Talent(s) | Coverage | Notes |
|-----------|-------------|---------------------|----------|-------|
| Barbarian | Fighting | Battle Rage (Fortitude) | ✅ Partial | Signature is in support skill, not pillar |
| Bard | Mysticism | *None* | ❌ Missing | No performance/music magic talent exists |
| Brawler | Fighting | Pugilist, Martial Artist | ✅ Good | Two complementary options |
| Champion | Fighting | Mystic Champion (Mysticism) | ✅ Partial | Signature is in support skill |
| Druid | Mysticism | Shape Changer | ✅ Good | Clear identity talent |
| Duelist | Fighting | Defensive Dueling, Riposte | ✅ Good | Strong mechanical identity |
| Engineer | Crafting | *None* | ❌ Missing | No contraption/device talent exists |
| Fighter | Fighting | Art of Fighting, weapon masteries | ✅ Good | Weapon mastery = identity |
| Gladiator | Fighting | Grappler (Athletics) | ✅ Partial | Grappling is in support skill |
| Hoplite | Fighting | Shield Mastery, Polearm Mastery | ✅ Partial | Has weapon talents but no formation/zone control |
| Magus | Arcana | Battle Mage, Spellblade | ✅ Good | Two complementary martial-caster talents |
| Monk | Fighting | Pugilist, Martial Artist | ✅ Good | |
| Oracle | Mysticism | *None* | ❌ Missing | No prophecy/foresight talent in Mysticism |
| Priest | Mysticism | Pact of Devotion | ✅ Good | |
| Ranger | Archery | Sharpshooter, Monster Hunter (Survival) | ✅ Good | |
| Rogue | Fighting | Assassination (Stealth) | ✅ Partial | Signature is in support skill |
| Shaman | Mysticism | Divine Sense | ✅ Partial | No spirit communion talent |
| Slinger | Archery | Expert Slinger | ✅ Good | |
| Sorcerer | Arcana | Wild Overload, Spellweaver | ✅ Good | |
| Summoner | Arcana | *None* | ❌ Missing | No summoning/conjuration talent |
| Swashbuckler | Fighting | Swashbuckler (Streetwise) | ✅ Partial | Signature is in support skill |
| Tamer | Fighting | Animal Companion (Nature) | ✅ Partial | Companion is in support skill, no whip talent |
| Warlock | Arcana | *None* | ❌ Missing | No pact/patron talent for Arcana |
| Warlord | Fighting | Commander (Education) | ✅ Partial | Commands are in support skill |
| Apothecary | Crafting | *None* | ❌ Missing | No alchemy talent exists |

**Summary:** 6 archetypes lack a signature talent entirely (Bard, Engineer, Oracle, Summoner, Warlock, Apothecary). 8 archetypes have their signature talent in a support skill rather than their pillar skill, which works but weakens the pillar's identity.

### 7.2 Rank 1 Signature Talent Design Principles

Rank 1 talents unlock a new playstyle. For signature talents, the design must balance accessibility (the archetype should work from R1) with restraint (R1 shouldn't provide the archetype's full power).

**Guidelines for R1 signature talents:**

1. **Unlock, don't master.** R1 should open the door to the playstyle, not fully realize it. Example: Animal Companion R1 lets you control *one* animal at a limited tier — mastery comes at R3.
2. **One clear mechanical change.** R1 should provide exactly one new thing the character can do. Example: Defensive Dueling R1 gives +1 Parry with a single weapon.
3. **Fixed bonuses, not scaling.** R1 bonuses should be small and fixed (+1, +2, one reroll). Never "+Skill Rank" at R1 — the bonus is too small to matter early and too large later.
4. **No party-wide effects at R1.** Team buffs should start at R2 earliest. R1 is personal mastery.
5. **Clear restrictions.** Every R1 talent should state what it requires (weapon type, armor restriction, stance requirement, etc.).

**Anti-patterns to avoid at R1:**
- ❌ "+Skill damage" (scales too aggressively)
- ❌ Unlimited party buffs (too powerful for 1 TP)
- ❌ Multiple unrelated effects (overloaded)
- ❌ Removal of core system penalties (too cheap)

### 7.3 Talent Exclusivity Groups

Some archetypes draw power from fundamentally incompatible sources. The talent system should enforce these incompatibilities through **exclusivity groups** — sets of talents where you can only take one.

**Proposed exclusivity groups:**

#### Group 1: Unarmored Defense Source
- **Body of Bronze** (Fortitude) — AV from physical conditioning
- **Armor of the Faithful** (Mysticism) — AV from divine protection

**Rule:** You may only benefit from one unarmored AV talent. If you take both, only the highest AV applies (which is already true via armor bonus stacking, but should be made explicit).

#### Group 2: Arcane Power Source
- **Arcane Spell Knowledge** (Arcana) — Standard spell learning
- **Wild Overload** (Arcana) — Chaotic wild magic
- *Proposed:* **Eldritch Pact** (Arcana) — Patron-granted power

**Rule:** Eldritch Pact and Arcane Spell Knowledge should be compatible (the pact grants *additional* abilities, not replacement spellcasting). However, Wild Overload's chaotic nature could conflict with a pact's structured power. **Recommendation:** Eldritch Pact and Wild Overload are mutually exclusive. A character must choose between controlled pact magic and chaotic wild magic.

#### Group 3: Spell Infusion Style
- **Battle Mage** (Arcana) — Arcane spell-weapon hybrid
- **Spellblade** (Arcana) — Arcane spell channeled through weapon
- **Mystic Champion** (Mysticism) — Mystic spell-weapon hybrid

**Rule:** These are already implicitly exclusive (Arcana vs Mysticism prevents taking all three). However, Battle Mage and Spellblade are in the same skill and a character could take both. **Recommendation:** Battle Mage and Spellblade should be compatible — they offer different playstyles (Battle Mage = use weapon attack stat for spells + add damage; Spellblade = combine weapon + spell in one roll). Taking both is a heavy TP investment (6+ TP) that rewards specialization.

#### Group 4: Weapon Style
No current exclusivity needed — weapon mastery talents are already tied to specific weapon types and taking multiple weapon masteries is a valid build choice (versatile warrior). No restriction recommended.

### 7.4 Martial, Hybrid, and Full-Caster Differentiation

**Current state:** The talent system does not formally differentiate between martial, hybrid, and full-caster characters. Any character with the relevant skill can take any talent.

**The hybrid temptation:** Because talents are cheap (1 TP each) and skills are free-form, a Fighting character can easily dip into Mysticism or Arcana for powerful hybrid abilities. For example, a Fighter with Arcana 1 can take Battle Mage R1, gaining the ability to add Arcana to Parry/Dodge — an extremely efficient defensive boost for 1 TP.

**Is this a problem?** Analysis suggests it is **mostly a non-issue** for three reasons:

1. **XP scarcity limits dipping.** Each skill rank requires significant XP (2/6/12/18/24). A fighter who invests 2 XP for Arcana 1 + Battle Mage R1 sacrifices 2 XP that could go toward Fighting 3 or Fortitude 2. The opportunity cost is real.

2. **Spell access requires investment.** Casting actual spells requires both Arcana/Mysticism skill rank AND Spell Knowledge talents. A 1-point dip grants Battle Mage R1 but no spells — you need at least 4 XP (Arcana 1 + Arcane Spell Knowledge R1) to cast a single cantrip.

3. **Flavor alignment is natural.** The Champion archetype is explicitly a Fighting + Mysticism hybrid. The Magus is Fighting + Arcana. Hybrids are a design feature, not a bug.

**Where intervention may be needed:**

The concern arises at **Rank 3+ magic skills** where hybrid characters can access powerful spell infusion (Spellblade R3 = rank 2 spells through weapons, Mystic Champion R3 = rank 2 mystic spells through weapons) while also having Fighting 3+ for combat arts. This combination — full weapon mastery AND rank 2 spell infusion — may outperform pure martials who get similar damage but without the spell utility.

**Proposed solution — Soft differentiation through Focus economy:**

- Pure casters have high Focus pools (Spell Knowledge grants +2 per rank = up to +8 Focus) and Focus recovery talents (Inexhaustible Mind, Divine Rites).
- Hybrids spend Focus on spell infusion (Spellblade/Mystic Champion cost +2 Focus per use) but lack Focus recovery, creating a natural limit on how many infused attacks they can make.
- Pure martials have no Focus costs but also no spell utility.

This creates a natural triad:
- **Full caster:** Many spells, high Focus, weak weapons → High versatility, lower sustained damage
- **Hybrid:** Spell-infused weapons, limited Focus, moderate weapons → Burst damage, resource-constrained
- **Full martial:** No spells, no Focus costs, best weapons + combat arts → Highest sustained damage, no spell utility

**Recommendation:** The current implicit differentiation through Focus economy is sufficient. No talent exclusivity between martial and magic talents is needed. However, ensure that future R4–R5 martial talents provide enough power to keep pure martials competitive with hybrids at high levels.

---

## 8. Modern System Integration

### 8.1 Challenge System Integration

The Challenge system (challenge die + TN + skill-once rule) supports talent interaction through several hooks:

| Hook | Description | Current Talent Support |
|------|-------------|----------------------|
| Challenge die reduction | Reduce die faster on specific skills | ~3 talents |
| TN modification | Grant boons or reduce TN situationally | ~2 talents |
| Blunder mitigation | Treat blunders as failures | 1 talent (Knowledgeable Wanderer) |
| Weak success enhancement | Remove cost on weak successes | 0 talents |
| Approach bonuses | Enhance Clever/Risky/Cautious adjustments | 0 talents |
| Multi-skill flexibility | Remove secondary skill bane | 0 talents |

**Current state:** ~5 talents with challenge relevance, target 15+.

**Proposed additions** (from [Challenge & Social Intrigue Talent Integration](./CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md)):
- **Keen Observer** (Perception): Re-roll in challenges, learn details, reduce die or negate consequences.
- **Silver Tongue** (Influence): Delay Patience, gain boons after appealing to Motivations, block Interest drops.
- **Read the Room** (Insight): Boons on Investigate actions, learn Interest/Patience state, warn allies about Pitfalls.

### 8.2 Social Intrigue Integration

The Social Intrigue system (Interest, Patience, Motivations, Pitfalls) has specific mechanical hooks:

| Hook | Description | Current Talent Support |
|------|-------------|----------------------|
| Interest manipulation | Raise/protect Interest | ~4 talents (Influence-based) |
| Patience delay | Slow Patience countdown | 0 talents |
| Motivation discovery | Learn NPC Motivations | ~2 talents (Insight-based) |
| Pitfall avoidance | Discover/recover from Pitfalls | 0 talents |
| Social action enhancement | Boost specific actions (Argue, Appeal, Deceive, etc.) | ~2 talents |
| Escalation management | Resist TN increases from repeated failures | 0 talents |

**Current state:** ~8 talents with social intrigue relevance, target 15+.

### 8.3 Travel System Integration

The Travel system (Navigator, Scout, Quartermaster, Forager, Hunter, Fisher roles) provides role-based hooks:

| Hook | Description | Current Talent Support |
|------|-------------|----------------------|
| Navigator efficiency | Improve daily progress | 2 talents (Knowledgeable Wanderer, Explorer of Nature) |
| Scout effectiveness | Find shelter, avoid danger | 1 talent (Explorer of Nature) |
| Forager/Hunter yield | Gather more resources | 1 talent (Wilderness Expert) |
| Fatigue mitigation | Resist travel Fatigue | 1 talent (Explorer's Tenacity) |
| Multi-role penalty | Remove +1 bane for extra roles | 1 talent (Knowledgeable Wanderer) |
| Checkpoint interaction | Handle blockades, ambushes, extreme climate | 0 dedicated talents |

**Current state:** ~3 talents with explicit travel mechanics, target 15+.

**Proposed additions** (from [Travel Talent Integration](./TRAVEL_TALENT_INTEGRATION.md)):
- **Pathfinder** (Survival): Navigator re-rolls, progress bonuses, detour avoidance.
- **Trailblazer** (Athletics): Terrain penalty reduction, progress on zero days.
- **Cartographer's Eye** (Perception): Spot hidden checkpoints, terrain assessment.
- **Expedition Leader** (Education): Manage supplies, enhanced camp rest.
- **Road Warden** (Streetwise): Civilized travel bonuses, NPC contact for aid.
- **Seasoned Forager** (Nature): Enhanced forage yields, identify edible plants.

### 8.4 Integration Summary

| System | Current Talents | Proposed Additions | Target |
|--------|----------------|-------------------|--------|
| Challenge | ~5 | +3 | 15+ |
| Social Intrigue | ~8 | +3 (overlaps Challenge) | 15+ |
| Travel | ~3 | +6 | 15+ |
| **Total new** | — | **+9 minimum** | — |

> **Note:** Many proposed talents serve multiple systems (e.g., Keen Observer aids both Challenges and Travel scouting). The dedicated integration analyses provide complete designs: [Challenge & Social Intrigue Integration](./CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md) and [Travel Integration](./TRAVEL_TALENT_INTEGRATION.md).

---

## 9. Talent Progression Evaluation

### 9.1 Current State: Ranks 1–3

The original talent system was designed for Ranks 1–3, following a clean progression:

| Rank | Design Intent | Execution |
|------|--------------|-----------|
| **1 (Novice)** | Unlock a new playstyle or option | ✅ Well-executed across most talents |
| **2 (Adept)** | Add a payoff ability or situational boon | ✅ Consistent improvement pattern |
| **3 (Expert)** | Provide mastery, signature moves, encounter-shaping tools | ✅ Good capstone feel at this level |

This structure works well for characters through Level 6 (Skill Rank 3 cap).

### 9.2 The Rank 4–5 Gap

Characters at Levels 7–10 can invest in Skill Ranks 4–5, but the talent system offers almost nothing:

| Skill Rank | XP Invested | TP Available | Talents Available | Effective TP |
|------------|-------------|--------------|-------------------|--------------|
| 3 (Expert) | 12 | 6 | All (Rank 1–3) | 6 usable |
| 4 (Master) | 18 | 9 | 6 talents (Rank 4) | ~7 usable |
| 5 (Grandmaster) | 24 | 12 | 0 talents (Rank 5) | ~7 usable |

**Impact:** At Ranks 4–5, characters accumulate 2–5 unspendable TP per skill. This creates:
- **Diminishing returns** on XP investment at high levels.
- **Progression flatline** where leveling up feels unrewarding.
- **Narrative disconnect** where a "Grandmaster" has no abilities beyond an Expert.

### 9.3 Rank 4 Design Expectations

Following the established progression pattern (*unlock → payoff → mastery → mythic*):

**Rank 4 (Master):** Abilities should bend encounters, expand scope, and affect squads or whole journeys. A Rank 4 combatant is among the best in a city-state. A Rank 4 diplomat reshapes political outcomes. A Rank 4 survivalist guides entire expeditions through hostile territory.

**Design targets for Rank 4 talents:**
- Upgrade existing Rank 3 abilities with broader scope or reduced costs.
- Introduce encounter-shaping effects (multi-target, extended duration, party-wide benefits).
- Provide meaningful interaction with multiple game systems.
- Require tactical decisions — not automatic bonuses.

### 9.4 Rank 5 Design Expectations

**Rank 5 (Grandmaster):** The pinnacle of mortal skill. Abilities define the character as legendary within the setting. Effects should be powerful but bounded — impressive and reality-stretching, not reality-breaking.

**Design targets for Rank 5 talents:**
- Signature abilities that define a character's legend.
- Once-per-day or once-per-scene abilities with dramatic impact.
- Effects that combine combat, utility, and narrative power.
- Clear distinction from magic (mundane mastery, not supernatural).
- Bounded power ceiling: equivalent to D&D levels 10–12, not 17–20.

### 9.5 Rank 4–5 Talent Quantity Targets

To address the TP dead zone, each skill needs:

| Skill Category | Current Rank 4+ | Needed Rank 4 | Needed Rank 5 |
|---------------|-----------------|---------------|---------------|
| Combat skills (Fighting, Archery) | 2 | +3–4 each | +1–2 each |
| Magic skills (Arcana, Mysticism) | 2 | +2–3 each | +1–2 each |
| General skills (Athletics, etc.) | 0 | +2–3 each | +1 each |
| Expert skills (Crafting, etc.) | 1 | +2–3 each | +1 each |

**Minimum additions needed:** ~2–3 Rank 4 talents per skill (totaling ~26–42 across 16 skills) and ~1 Rank 5 talent per skill (~16 total).

### 9.6 Extension Strategy: Which Talents Extend to R4–R5, Which Cap at R3

Not every talent should extend beyond R3. The following classification determines which talents should grow to R4–R5, which should remain at R3, and where new R4–R5-only talents are needed.

**Classification criteria:**
- **Extend to R5** = Core identity talents that define a playstyle. These are the "career" talents a character invests in for their entire progression.
- **Extend to R4 only** = Talents with strong mechanical foundations that can benefit from one more rank of scope expansion, but don't need grandmaster-level effects.
- **Cap at R3** = Talents that are complete at R3 (their design space is fully explored), situational talents, or talents that would become too powerful at higher ranks.
- **New R4–R5 only** = Talents that exist only at R4+ because they require master/grandmaster skill to even attempt. These solve the TP dead zone without extending existing designs.

#### Fighting (14 talents)

| Talent | Current Max | Recommendation | Rationale |
|--------|-----------|----------------|-----------|
| Art of Fighting | R4 | **Extend to R5** | Core combat art access — the career talent for martial fighters |
| Shield Mastery | R3 | **Extend to R4** | Scope expansion: shield benefits to allies, advanced shield techniques |
| Defensive Dueling | R3 | **Extend to R4** | Master duelist: automatic riposte, untouchable single-combat |
| Martial Artist | R3 | **Extend to R5** | Career talent for monks/brawlers — pinnacle unarmed mastery |
| Dual Wielder | R3 | **Extend to R4** | Master dual wielder: coordinated two-weapon strikes |
| Polearm Mastery | R3 | **Extend to R4** | Zone control: area denial, formation anchoring |
| Riposte | R3 | **Cap at R3** | Complete design — counterattack with daze is a satisfying capstone |
| Disciplined Fighter | R3 | **Cap at R3** | Utility talent — reroll and extra attack are sufficient |
| Axe Mastery | R3 | **Cap at R3** | Weapon-specific — rend + bleed is a full kit |
| Blade Mastery | R3 | **Cap at R3** | Weapon-specific — property swap + boon is complete |
| Heavy Weapon Mastery | R3 | **Cap at R3** | Damage bonus + cleave synergy is sufficient |
| Mace Mastery | R3 | **Cap at R3** | Minimum damage + daze is complete |
| Protective Stance | R3 | **Cap at R3** | Ally protection is fully developed at R3 |
| Pugilist | R3 | **Cap at R3** | Unarmed damage progression — extends through Martial Artist instead |

#### Archery (9 talents)

| Talent | Current Max | Recommendation | Rationale |
|--------|-----------|----------------|-----------|
| Art of Archery | R4 | **Extend to R5** | Core combat art access for ranged fighters |
| Sharpshooter | R3 | **Extend to R4** | Extreme range mastery, anti-cover |
| Rapid Shot | R3 | **Extend to R4** | Multi-target volley, suppression fire |
| Disciplined Archer | R3 | **Cap at R3** | Mirrors Disciplined Fighter — utility complete |
| Crossbow Mastery | R3 | **Cap at R3** | Weapon-specific — stun on hit is complete |
| Expert Slinger | R3 | **Cap at R3** | Weapon-specific — throw-and-move is complete |
| Ammo Specialist | R3 | **Cap at R3** | Ammo variety is fully explored |
| Reflexive Shooter | R3 | **Cap at R3** | Reactive defense is complete |
| Strong Grip | R3 | **Cap at R3** | Heavy bow mastery is complete |

#### Arcana (8 talents)

| Talent | Current Max | Recommendation | Rationale |
|--------|-----------|----------------|-----------|
| Arcane Spell Knowledge | R4 | **Extend to R5** | Core spell access — must extend to unlock R5 spells |
| Battle Mage | R4 | **Extend to R5** | Career talent for magus archetype |
| Spellweaver | R3 | **Extend to R4** | Metamagic mastery: more arts, reduced Focus costs |
| Spellblade | R3 | **Extend to R4** | Higher-rank spell infusion |
| Wild Overload | R3 | **Cap at R3** | Chaotic design — R3's "choose your result" is already very powerful |
| Mana Shield | R3 | **Cap at R3** | Defensive scaling is sufficient |
| Master of Fundamentals | R3 | **Cap at R3** | Cantrip mastery is complete |
| Inexhaustible Mind | R3 | **Cap at R3** | Focus recovery is fully developed |

#### Mysticism (11 talents)

| Talent | Current Max | Recommendation | Rationale |
|--------|-----------|----------------|-----------|
| Mystical Spell Knowledge | R4 | **Extend to R5** | Core spell access for mystics |
| Pact of Devotion | R3 | **Extend to R5** | Career talent for priests — pact mastery at R4–R5 |
| Mystic Champion | R3 | **Extend to R4** | Higher-rank spell infusion (mirrors Spellblade) |
| Divine Rites | R3 | **Cap at R3** | Focus recovery complete |
| Communal Practices | R3 | **Cap at R3** | Targeting flexibility complete |
| Elemental Adept | R3 | **Cap at R3** | Resistance piercing complete |
| Shape Changer | R3 | **Extend to R4** | Career talent for druids — advanced forms |
| Armor of the Faithful | R3 | **Cap at R3** | Defensive scaling sufficient (with proposed cap) |
| Divine Sense | R3 | **Cap at R3** | Detection is fully developed |
| Master of Principles | R3 | **Cap at R3** | Cantrip mastery mirrors Master of Fundamentals |
| Divine Favor | Stub | **New: Design R1–R3** | Then assess for R4–R5 extension |

#### General Skills

| Skill | Talent | Recommendation | Rationale |
|-------|--------|----------------|-----------|
| Athletics | Evasion | **Extend to R4** | Master evasion: reaction-based dodge |
| Athletics | Fast Stride | **Extend to R4** | Supernatural speed |
| Athletics | Grappler | **Cap at R3** | Grappling complete |
| Athletics | Others | **Cap at R3** | Utility complete |
| Fortitude | Hard to Kill | **Extend to R5** | Career talent for tanks — death defiance |
| Fortitude | Battle Rage | **Extend to R4** | Barbarian career — fury escalation |
| Fortitude | Juggernaut | **Extend to R4** | Multi-enemy defense expansion |
| Fortitude | Others | **Cap at R3** | Utility/defense complete |
| Influence | Inspire Ally | **Extend to R4** | Warlord career — mass inspiration |
| Influence | Leading Presence | **Extend to R4** | Commander aura expansion |
| Influence | Others | **Cap at R3** | Social talents complete at R3 |
| Insight | Empath | **Extend to R4** | Combat reading mastery |
| Insight | Piercing Look | **Cap at R3** | Investigation complete |
| Perception | Danger Sense | **Extend to R4** | Preternatural awareness |
| Perception | Identify Weakness | **Extend to R4** | Master tactical analysis |
| Stealth | Assassination | **Extend to R4** | Master assassin: advanced stealth kills |
| Stealth | Hidden Strike | **Cap at R3** | One-shot technique complete |
| Survival | Monster Hunter | **Extend to R4** | Legendary hunter career |
| Survival | Trap Maker | **Extend to R4** | Master trapper |
| Nature | Animal Companion | **Extend to R5** | Career talent for tamers/druids |
| Nature | Field Medic | **Extend to R4** | Advanced battlefield medicine |
| Education | Tactician | **Extend to R4** | Battlefield command expansion |
| Education | Commander | **Extend to R4** | Mass command abilities |
| Crafting | Artisan | **Extend to R4** | Masterwork creation |
| Crafting | Peak Performance | **Cap at R3** | Enhancement bonuses sufficient |
| Lore | Magical Sense | R4 (incomplete) | **Extend to R5** | Career talent for mage hunters |
| Lore | Mage Hunter | **Extend to R4** | Anti-caster mastery |
| Streetwise | Swashbuckler | **Extend to R4** | Light weapon mastery |
| Streetwise | Thug Tactics | **Cap at R3** | Numerical advantage complete |

#### Summary

| Category | Extend to R5 | Extend to R4 | Cap at R3 | New R4–R5 Only |
|----------|-------------|-------------|-----------|----------------|
| Fighting | 2 (Art of Fighting, Martial Artist) | 4 | 8 | — |
| Archery | 1 (Art of Archery) | 2 | 6 | — |
| Arcana | 2 (Spell Knowledge, Battle Mage) | 2 | 4 | — |
| Mysticism | 2 (Spell Knowledge, Pact of Devotion) | 2 | 6 | 1 (Divine Favor) |
| General Skills | 2 (Hard to Kill, Animal Companion) | 10 | ~15 | — |
| Expert Skills | 1 (Magical Sense) | 5 | ~10 | — |
| **Total** | **10** | **25** | **~49** | **1** |

This gives 10 talents reaching R5 and 25 reaching R4 from existing talent lines, plus new talents to fill remaining TP budget gaps (see §12 for the complete catalog).

---

## 10. Prestige Talents

### 10.1 Concept

Prestige Talents (inspired by D&D 3.5e Prestige Classes) are advanced talents requiring Rank 3+ in multiple skills. They reward multi-skill investment and define archetype mastery.

**Example prerequisites:** "Requires Fighting 3 and Athletics 3" or "Requires Arcana 3 and Lore 3."

### 10.2 Feasibility Assessment

| Factor | Assessment | Notes |
|--------|------------|-------|
| **System fit** | ✅ Strong | TP economy supports multi-skill builds. Characters naturally spread XP. |
| **Archetype alignment** | ✅ Strong | Each archetype uses 4 skills. Prestige Talents reward thematic investment. |
| **Complexity cost** | ⚠️ Moderate | Adds a prerequisite layer that must be clearly communicated. |
| **Build diversity** | ✅ Positive | Creates meaningful choices between deep (single-skill) and wide (multi-skill) investment. |
| **Balance risk** | ⚠️ Moderate | Multi-skill prerequisites inherently limit availability. Must ensure single-skill paths remain viable. |

### 10.3 Recommendation: Adopt Prestige Talents

Prestige Talents are a natural fit for Nexus RPG's free-form progression model. They solve three problems:

1. **High-rank TP surplus** — Give Rank 4–5 characters meaningful spending options.
2. **Archetype definition** — Let players mechanically commit to an archetype identity.
3. **Cross-skill synergy** — The design guidelines call for inter-skill synergies; Prestige Talents make these explicit.

### 10.4 Prestige Talent Design Framework

**Structure:**
- **Prerequisites:** Rank 3+ in two named skills (the "pillar" and one supporting skill).
- **Ranks:** 1–2 (to keep investment modest alongside normal talent spending).
- **Placement:** Listed under the pillar skill's talent file, with prerequisites clearly noted.
- **Budget:** 2–4 Prestige Talents per skill, focused on archetypes that use that skill as a pillar.

**Naming convention:** Evocative names that reflect the archetype's identity, not mechanical descriptions.

### 10.5 Prestige Talent Proposals

The following are representative designs. Each addresses a specific archetype gap and requires cross-skill investment.

#### Martial Prestige Talents (Fighting pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Phalanx Commander** | Fighting 3, Influence 3 | Hoplite/Warlord | Adjacent shield-bearing allies gain +1 AV; once per scene, command a coordinated strike where all allies in melee attack simultaneously. |
| **Iron Tempest** | Fighting 3, Athletics 3 | Barbarian/Gladiator | When you reduce an enemy to 0 HP, immediately make a free melee attack against an adjacent enemy. Once per day, enter a fighting fury for a short duration: gain +1 boon on melee attacks but −2 to all defenses. |
| **Blade Dancer** | Fighting 3, Stealth 3 | Duelist/Swashbuckler | After hitting an enemy, you may move 1 area without provoking attacks. Once per scene, when you dodge an attack, make a free counter-attack. |

#### Ranged Prestige Talents (Archery pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Predator's Mark** | Archery 3, Survival 3 | Ranger | Mark a target (Quick Action). Attacks against marked targets gain +1 boon and ignore half cover. Mark persists for a short duration or until a new target is marked. |
| **Siege Engineer** | Archery 3, Crafting 3 | Engineer | You can construct and operate siege devices during downtime. In combat, thrown contraptions (alchemist fire, smoke bombs, caltrops) gain +1 boon and affect a close area. |

#### Spellcaster Prestige Talents (Arcana/Mysticism pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Eldritch Pact** | Arcana 3, Lore 3 | Warlock | Choose a Patron (Fiend, Fey, or Void). Gain a patron-specific passive benefit and one patron spell that doesn't cost Focus. Once per day, invoke your patron for a dramatic spell-like effect. |
| **Song of Power** | Mysticism 3, Influence 3 | Bard | You can weave mystic energy into performances. As an Action, perform to grant all allies in close range +1 boon on their next roll. At Rank 2, the performance also imposes −1 bane on enemies in range. Requires concentration. |
| **Prophetic Sight** | Mysticism 3, Insight 3 | Oracle | Once per day, enter a prophetic trance (1 minute) to receive a cryptic vision relevant to the current situation. At Rank 2, you can also spend 1 Resolve to grant an ally a re-roll, representing fated intervention. |

#### Skill Prestige Talents (Non-combat pillars)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Beast Bond** | Nature 3, Survival 3 | Tamer/Druid | Your animal companion gains +1 to all attributes (one die size). You can communicate simple commands without a roll. At Rank 2, your companion can act independently on your Initiative. |
| **Underworld Contact** | Streetwise 3, Influence 3 | Rogue | In any settlement, you can locate a black market contact (Mind + Streetwise vs. settlement difficulty). Contacts provide fencing, forgery, information, or smuggling services. At Rank 2, contacts offer one free favor per visit. |
| **Master Alchemist** | Crafting 3, Nature 3 | Apothecary | Your alchemy crafting yields double batches. You can identify any potion or substance on sight. At Rank 2, your potions and remedies have their effects increased by one tier. |

---

## 11. Capstone Talent Design

### 11.1 Philosophy

Capstone talents (Rank 4–5) should feel like the culmination of a character's investment. They should be:

- **Transformative** — Not just bigger numbers, but fundamentally new capabilities.
- **Signature** — Define what makes a Master or Grandmaster different from an Expert.
- **Bounded** — Impressive within the fiction, not mechanically game-breaking.
- **Gated** — Use costs (once per day, Resolve, conditions) to prevent abuse.

### 11.2 Rank 4 Capstone Templates

Rank 4 talents should extend Rank 3 mastery into encounter-shaping territory:

| Template | Pattern | Example |
|----------|---------|---------|
| **Scope Expansion** | Single-target → multi-target | Shield Mastery R4: Your shield bonus applies to adjacent allies. |
| **Action Economy** | Full Action → Quick Action | Second Wind R4: Use as Quick Action once per day. |
| **Reliability** | Conditional → consistent | Evasion R4: You can use Evasion even when surprised or restrained. |
| **System Bridge** | Combat → non-combat | Disciplined Fighter R4: Add Fighting rank to Fortitude rolls vs. fear and morale during challenges. |
| **Recovery** | Mitigate → reverse | Hard to Kill R4: Once per day, when you would suffer a Wound, remain at 1 HP instead. |

### 11.3 Rank 5 Capstone Templates

Rank 5 talents should represent the absolute pinnacle of mortal ability:

| Template | Pattern | Example |
|----------|---------|---------|
| **Legendary Action** | Once per day, dramatic effect | Art of Fighting R5: Once per day, treat any Fighting roll as a Critical Success. |
| **Permanent Enhancement** | Passive mastery bonus | Sharpshooter R5: Your ranged attacks never suffer banes from range, cover, or weather. |
| **Narrative Authority** | Player-directed story impact | Tactician R5: Once per session, declare a tactical insight that grants the party a major advantage in the current scene (GM adjudicates). |
| **Capstone Synergy** | Combine two talent lines | Battle Mage R5: When you cast a spell, you may also make a melee attack as part of the same Action. |
| **Grandmaster Signature** | Unique pinnacle ability | Martial Artist R5: Your unarmed strikes deal weapon damage equal to your equipped weapon's best damage type. Your body counts as a magic weapon. |

### 11.4 Priority Capstone Talents by Skill

| Priority | Skill | Rank 4 Candidates | Rank 5 Candidates |
|----------|-------|-------------------|-------------------|
| Critical | Fighting | Shield Mastery, Defensive Dueling, Martial Artist | Art of Fighting (extend to R5) |
| Critical | Archery | Sharpshooter, Rapid Shot | Art of Archery (extend to R5) |
| Critical | Arcana | Spellweaver, Wild Overload | Battle Mage (extend to R5), Arcane Spell Knowledge (extend to R5) |
| Critical | Mysticism | Mystic Champion, Divine Rites | Mystical Spell Knowledge (extend to R5) |
| High | Athletics | Evasion, Fast Stride | Supernatural Mobility (flesh out as R4–5) |
| High | Fortitude | Hard to Kill, Battle Rage | Juggernaut or new capstone |
| High | Influence | Inspire Ally, Leading Presence | Presence of Conquest (flesh out as R4–5) |
| High | Insight | Sense of Deduction, Empath | Foresight (flesh out as R4–5) |
| Medium | Perception | Danger Sense, Identify Weakness | New capstone |
| Medium | Stealth | Assassination, Hidden Strike | New capstone |
| Medium | Survival | Monster Hunter, Trap Maker | New capstone |
| Medium | Nature | Animal Companion, Field Medic | New capstone |
| Medium | Education | Tactician, Commander | New capstone |
| Medium | Crafting | Artisan, Peak Performance | Master Artisan (flesh out as R4–5) |
| Medium | Lore | Mage Hunter, Consult the Myths | Magical Sense (complete R4, extend to R5) |
| Medium | Streetwise | Swashbuckler, Thug Tactics | New capstone |

---

## 12. Concrete Design Recommendations

### 12.1 Phase 1: Foundation (Immediate Priority)

**Goal:** Complete incomplete talents and address critical skill gaps.

#### 12.1.1 Complete Incomplete Talents (17 entries across 8 talents)

Complete all placeholder (XXX/???) ranks and flesh out all stub talents:

| Talent | Skill | Action |
|--------|-------|--------|
| Adrenaline Rush | Fortitude | Design Ranks 1–3 (damage-triggered benefits, temp HP surge) |
| Supernatural Mobility | Athletics | Design Ranks 1–3 (wall-running, long jumps, fall reduction) |
| Performer | Influence | Design Ranks 1–3 (entertainment, crowd manipulation) |
| Presence of Conquest | Influence | Design Ranks 1–3 (fear aura, group intimidation) |
| Foresight | Insight | Design Ranks 1–3 (intuitive prediction, avoid surprise) |
| Divine Favor | Mysticism | Design Ranks 1–3 (prayer benefits, divine intervention) |
| Herbalist | Nature | Design Ranks 1–3 (potent remedies, identification) |
| Master Artisan | Crafting | Design Ranks 1–3 (requires Artisan R3 as prerequisite talent) |
| Plant Lore R3 | Nature | Design Rank 3 effect (plant identification, terrain interaction) |
| Knowledgeable Wanderer R3 | Nature | Design Rank 3 effect (bonus progress on successful travel rolls) |
| Magical Sense R4 | Lore | Design Rank 4 effect (enhanced magical detection) |
| Roguish Wits R3 | Stealth | Design Rank 3 effect (escape captivity, misdirect pursuit) |
| Sleight of Hand R3 | Stealth | Design Rank 3 effect (plant items, pick pockets in combat) |
| I Know A Guy R2–3 | Streetwise | Design Ranks 2–3 (expand contact network, favor mechanics) |
| Explorer of Nature R3 | Survival | Design Rank 3 effect (enhanced exploration role) |
| Relentless Tracker R2–3 | Survival | Design Ranks 2–3 (long-range tracking, quarry mechanics) |
| Wilderness Expert R3 | Survival | Design Rank 3 effect (advanced campcraft, shelter construction) |

#### 12.1.2 Expand Critically Low Skills (+15–20 talents)

| Skill | Current | Target | New Talents Needed | Focus Areas |
|-------|---------|--------|--------------------|-------------|
| **Insight** | 5 | 8–9 | +3–4 | Prophecy (Oracle), combat reading, defensive redirection, investigation |
| **Streetwise** | 4 | 8–9 | +4–5 | Infiltration (Rogue), urban survival, contacts/networking, dirty fighting |
| **Influence** | 7 | 9–10 | +2–3 | Battlefield commands (Warlord), crowd performance (Bard), authority |
| **Perception** | 5 | 8–9 | +3–4 | Awareness-based defense, evidence gathering, travel scouting |
| **Survival** | 7 | 9–10 | +2–3 | Travel integration, advanced tracking, wilderness mastery |
| **Stealth** | 6 | 8–9 | +2–3 | Infiltration, escape, combat stealth |

### 12.2 Phase 2: System Integration (High Priority)

**Goal:** Create talents that interact meaningfully with Challenges, Social Intrigue, and Travel.

#### 12.2.1 Challenge Talents (+6–8 talents)

New talents that interact with challenge die mechanics:

| Talent | Skill | Challenge Hook |
|--------|-------|---------------|
| **Keen Observer** | Perception | Re-roll during challenges; learn hidden details; reduce die/negate consequences |
| **Methodical Research** | Education | Reduce challenge die by extra 1 on critical; treat Library as Clever approach |
| **Dogged Pursuit** | Survival | Re-roll during chase challenges; ignore terrain penalties in pursuits |
| **Improvised Solutions** | Crafting | Use Crafting as a secondary skill without bane in physical challenges |
| **Streetwise Informant** | Streetwise | Learn challenge details in advance; reduce starting die by 1 in urban settings |
| **Tactical Assessment** | Education | Reveal TN of current challenge step; plan approach for allies |

#### 12.2.2 Social Intrigue Talents (+4–6 talents)

New talents that interact with Interest, Patience, and social actions:

| Talent | Skill | Social Hook |
|--------|-------|-------------|
| **Silver Tongue** | Influence | Delay Patience; gain boons after Motivation appeal; block Interest drops |
| **Read the Room** | Insight | Boons on Investigate; learn Interest/Patience state; warn about Pitfalls |
| **Courtly Grace** | Education | Use Education for etiquette; reduce TN for formal negotiations |
| **Threatening Presence** | Fortitude | Use Fortitude for intimidation; impose banes on enemy social actions |

#### 12.2.3 Travel Talents (+6 talents)

New talents that interact with travel roles:

| Talent | Skill | Travel Hook |
|--------|-------|-------------|
| **Pathfinder** | Survival | Navigator re-rolls; progress bonuses; detour avoidance |
| **Trailblazer** | Athletics | Terrain penalty reduction; progress on zero days |
| **Cartographer's Eye** | Perception | Spot hidden checkpoints; terrain assessment |
| **Expedition Leader** | Education | Supply management; enhanced camp rest |
| **Road Warden** | Streetwise | Civilized travel bonuses; NPC contact for aid |
| **Seasoned Forager** | Nature | Enhanced forage yields; identify edible plants |

### 12.3 Phase 3: High-Rank Progression (Medium Priority)

**Goal:** Extend talent progression to Ranks 4–5 across all skills.

#### 12.3.1 Rank 4 Extensions (~32 talents)

Every skill should have 2–3 talents that extend to Rank 4. Priority candidates:

| Skill | Talents to Extend | Design Focus |
|-------|------------------|--------------|
| Fighting | Shield Mastery, Defensive Dueling, Martial Artist, Dual Wielder | Multi-target defense, encounter control |
| Archery | Sharpshooter, Rapid Shot, Disciplined Archer | Extreme range, multi-target volleys |
| Arcana | Spellweaver, Wild Overload, Mana Shield | Spell enhancement, metamagic, defense |
| Mysticism | Mystic Champion, Divine Rites, Communal Practices | Party-wide blessings, extended rites |
| Athletics | Evasion, Fast Stride, Grappler | Supernatural agility, movement mastery |
| Fortitude | Hard to Kill, Battle Rage, Juggernaut | Death defiance, fury escalation |
| Influence | Inspire Ally, Leading Presence, Fast Talking | Mass inspiration, social dominance |
| Insight | Empath, Sense of Deduction, Piercing Look | Combat prediction, truth compulsion |
| Perception | Danger Sense, Identify Weakness, Eagle Eye | Preternatural awareness |
| Stealth | Assassination, Hidden Strike, Devious Tactics | Perfect stealth, shadow mastery |
| Survival | Monster Hunter, Trap Maker | Legendary tracking, master traps |
| Nature | Animal Companion, Field Medic | Bonded companion, advanced herbalism |
| Education | Tactician, Commander, General Education | Battlefield control, knowledge mastery |
| Crafting | Artisan, Peak Performance | Masterwork creation, quality bonuses |
| Lore | Mage Hunter, Consult the Myths | Anti-magic expertise, ritual mastery |
| Streetwise | Swashbuckler, Thug Tactics | Urban legend, criminal empire |

#### 12.3.2 Rank 5 Extensions (~16 talents)

One signature talent per skill reaching Rank 5:

| Skill | Rank 5 Talent | Signature Effect |
|-------|---------------|-----------------|
| Fighting | Art of Fighting | Once per day, auto-Critical on a Fighting roll |
| Archery | Art of Archery | Once per day, auto-Critical on an Archery roll |
| Arcana | Arcane Spell Knowledge | Access Rank 5 spells; +1 Focus |
| Mysticism | Mystical Spell Knowledge | Access Rank 5 spells; +1 Focus |
| Athletics | Supernatural Mobility | Move through enemies, wall-run, reduce fall damage dramatically |
| Fortitude | Hard to Kill | Once per day, survive lethal damage at 1 HP |
| Influence | Presence of Conquest | Demoralize all enemies in short range; shatter morale |
| Insight | Foresight | Once per day, declare you foresaw a threat and take a prepared action |
| Perception | Eagle Eye (or new) | Preternatural senses; cannot be surprised; detect invisible |
| Stealth | Assassination (or new) | Once per day, guaranteed stealth kill on unaware target (if damage sufficient) |
| Survival | Monster Hunter | Legendary hunter; +1 boon and +weapon damage vs. studied prey |
| Nature | Animal Companion | Companion becomes exceptional (acts independently, gains abilities) |
| Education | Tactician | Once per scene, declare a tactical advantage for the entire party |
| Crafting | Master Artisan | Create items one Quality tier higher; halve crafting time |
| Lore | Magical Sense | Permanent detect magic; identify enchantments on sight |
| Streetwise | Swashbuckler (or new) | Once per scene, automatically escape a grapple, trap, or restraint |

### 12.4 Phase 4: Prestige Talents (Lower Priority)

**Goal:** Introduce multi-skill talents that define archetype mastery.

Implement 15–20 Prestige Talents across combat, magic, and skill categories (see §10.5 for initial proposals). Prioritize archetypes with the weakest talent support: Oracle, Bard, Tamer, Hoplite, Warlock, Rogue.

---

## 13. Implementation Roadmap

### Priority Matrix

| Phase | Scope | Talent Count | Priority | Dependencies |
|-------|-------|-------------|----------|-------------|
| **1a** | Complete incomplete talents | ~17 entries (fill stubs and XXX) | Immediate | None |
| **1b** | Expand critically low skills | ~15–20 new | Immediate | None |
| **2** | System integration talents | ~12–16 new | High | Challenge/SI/Travel rules stable |
| **3a** | Rank 4 extensions | ~32 (extend existing) | Medium | Phase 1 complete |
| **3b** | Rank 5 capstones | ~16 new | Medium | Phase 3a complete |
| **4** | Prestige Talents | ~15–20 new | Lower | Phase 3 complete |

### Success Metrics

| Metric | Current | Phase 1 Target | Phase 2 Target | Final Target |
|--------|---------|---------------|----------------|-------------|
| Total talents | 122 | 150–155 | 165–170 | 195–210 |
| Minimum per skill | 4 | 8 | 8 | 10 |
| Incomplete talents | 8 | 0 | 0 | 0 |
| Max talent rank used | 4 | 4 | 4 | 5 |
| Challenge-interactive | ~5 | 10 | 15+ | 20+ |
| Social Intrigue-interactive | ~8 | 12 | 15+ | 20+ |
| Travel-interactive | ~3 | 8 | 15+ | 18+ |
| Skills with Rank 4 talent | 5 | 5 | 8 | 16 |
| Skills with Rank 5 talent | 0 | 0 | 4 | 16 |
| Prestige Talents | 0 | 0 | 0 | 15–20 |
| Defensive redirection % | 0% | 3% | 5–10% | 5–10% |
| Travel talent % | 3% | 8% | 10–15% | 10–15% |

---

## 14. Forward-Looking Guidance

### 14.1 Talent Design for Ongoing System Evolution

As new game systems are introduced, talent design should follow this integration protocol:

1. **Identify mechanical hooks** — What dice rolls, resources, or decisions does the new system use?
2. **Map hooks to skills** — Which skills logically interact with these hooks?
3. **Design integration talents** — Create 2–3 talents per system that use system-specific triggers and effects.
4. **Validate against archetypes** — Ensure integration talents benefit the archetypes that thematically align.

### 14.2 Scaling Talent Power at High Ranks

| Rank | Power Budget | Frequency | Scope |
|------|-------------|-----------|-------|
| 1 | Minor option unlock | At-will or per-scene | Self |
| 2 | Moderate payoff | Per-scene or conditional | Self + adjacent |
| 3 | Encounter-shaping | Per-scene or daily | Close range |
| 4 | Encounter-defining | Daily or costly | Short range / party |
| 5 | Session-defining | Daily / session | Scene-wide / narrative |

### 14.3 Avoiding Common Pitfalls

- **Don't inflate numbers.** Rank 4–5 talents should provide new options, not just +2 instead of +1.
- **Don't obsolete lower ranks.** Rank 5 Evasion shouldn't make Rank 3 Evasion feel pointless — it should expand the ability's scope.
- **Don't create mandatory talents.** No talent at any rank should be so powerful that skipping it is a trap.
- **Don't ignore non-combat.** Every Rank 4–5 talent should have at least secondary utility, exploration, or social applications.
- **Don't break bounded power.** Rank 5 is mortal pinnacle. No auto-wins, no reality-warping, no effects that bypass all defenses.

### 14.4 Talent Maintenance Schedule

- **Per release cycle:** Audit new talents against archetype coverage, system integration, and role distribution.
- **Per new system:** Run an integration analysis (see §8 pattern) and produce talent proposals.
- **Per 20 new talents:** Re-evaluate skill balance, rank distribution, and defensive variety metrics.

---

## Appendix A: Skill-by-Skill Talent Inventory

### General Skills

**Athletics (9 talents)**
Athletic Movement (R3), Bulky (R3), Escape Artist (R3), Evasion (R3), Fast Stride (R3), Grappler (R3), Light Armor Mastery (R3), Stand Your Ground (R3), Supernatural Mobility (stub)

**Fortitude (11 talents)**
Adrenaline Rush (stub), Battle Rage (R3), Body of Bronze (R3), Drunken Technique (R3), Explorer's Tenacity (R3), Hard to Kill (R3), Heavy Armor Mastery (R3), Juggernaut (R3), Second Wind (R3), Strong Mind (R3), Tough Stomach (R3)

**Influence (7 talents)**
Born Haggler (R3), Fast Talking (R3), Inspire Ally (R3), Insult to Injury (R3), Leading Presence (R3), Performer (stub), Presence of Conquest (stub)

**Insight (5 talents)**
Empath (R3), Foresight (stub), Intuitive Appraisal (R3), Piercing Look (R3), Sense of Deduction (R3)

**Perception (5 talents)**
Blind Senses (R3), Danger Sense (R3), Dungeon Delver (R3), Eagle Eye (R3), Identify Weakness (R3)

**Stealth (6 talents)**
Assassination (R3), Devious Tactics (R3), Hidden Strike (R3), Leading the Way (R3), Roguish Wits (R3, incomplete), Sleight of Hand (R3, incomplete)

### Expert Skills

**Arcana (8 talents)**
Arcane Spell Knowledge (R4), Battle Mage (R4), Inexhaustible Mind (R3), Mana Shield (R3), Master of Fundamentals (R3), Spellblade (R3), Spellweaver (R3), Wild Overload (R3)

**Archery (9 talents)**
Ammo Specialist (R3), Art of Archery (R4), Crossbow Mastery (R3), Disciplined Archer (R3), Expert Slinger (R3), Rapid Shot (R3), Reflexive Shooter (R3), Sharpshooter (R3), Strong Grip (R3)

**Crafting (6 talents)**
Artisan (R3), Efficient Worker (R3), Maintenance (R3), Master Artisan (stub), Peak Performance (R3), Quick Construction (R3)

**Education (6 talents)**
Commander (R3), Diplomat (R3), Eloquent Talker (R3), General Education (R3), Linguist (R3), Tactician (R3)

**Fighting (14 talents)**
Art of Fighting (R4), Axe Mastery (R3), Blade Mastery (R3), Defensive Dueling (R3), Disciplined Fighter (R3), Dual Wielder (R3), Heavy Weapon Mastery (R3), Mace Mastery (R3), Martial Artist (R3), Polearm Mastery (R3), Protective Stance (R3), Pugilist (R3), Riposte (R3), Shield Mastery (R3)

**Lore (6 talents)**
Channel Superstition (R3), Consult the Myths (R3), Divine Scholar (R3), Identify Artifact (R3), Mage Hunter (R3), Magical Sense (R4, R4 incomplete)

**Mysticism (11 talents)**
Armor of the Faithful (R3), Communal Practices (R3), Divine Favor (stub), Divine Rites (R3), Divine Sense (R3), Elemental Adept (R3), Master of Principles (R3), Mystic Champion (R3), Mystical Spell Knowledge (R4), Pact of Devotion (R3), Shape Changer (R3)

**Nature (8 talents)**
Animal Companion (R3), Beast Lore (R3), Expert Rider (R3), Field Medic (R3), Herbalist (stub), Knowledgeable Wanderer (R3, R3 incomplete), Plant Lore (R3, R3 incomplete), Poison Maker (R3)

**Streetwise (4 talents)**
I Know A Guy (R3, R2–3 incomplete), Jack of All Trades (R3), Swashbuckler (R3), Thug Tactics (R3)

**Survival (7 talents)**
Explorer of Nature (R3, R3 incomplete), Makeshift Artisan (R3), Monster Hunter (R3), Relentless Tracker (R3, R2–3 incomplete), Trap Maker (R3), Wilderness Expert (R3, R3 incomplete)

---

## Appendix B: Archetype-to-Talent Cross-Reference

| Archetype | Pillar | Support 1 | Support 2 | Support 3 | Accessible Talents | Critical Gaps |
|-----------|--------|-----------|-----------|-----------|-------------------|---------------|
| Apothecary | Crafting | Education | Nature | Insight | 25 | Alchemy, remedies |
| Barbarian | Fighting | Athletics | Fortitude | Survival | 41 | — |
| Bard | Mysticism | Influence | Education | Stealth | 30 | Music magic, performance |
| Brawler | Fighting | Fortitude | Streetwise | Athletics | 38 | — |
| Champion | Fighting | Mysticism | Influence | Fortitude | 43 | — |
| Druid | Mysticism | Nature | Survival | Lore | 32 | — |
| Duelist | Fighting | Athletics | Stealth | Influence | 36 | Feint mechanics |
| Engineer | Crafting | Education | Archery | Perception | 26 | Contraptions, siege |
| Fighter | Fighting | Athletics | Fortitude | Influence | 41 | Zone control |
| Gladiator | Fighting | Athletics | Influence | Fortitude | 41 | — |
| Hoplite | Fighting | Athletics | Influence | Fortitude | 41 | Formation, zone control |
| Magus | Arcana | Fighting | Education | Lore | 34 | — |
| Monk | Fighting | Athletics | Fortitude | Mysticism | 45 | — |
| Oracle | Mysticism | Lore | Insight | Education | 28 | Prophecy, omens |
| Priest | Mysticism | Education | Influence | Fighting | 38 | — |
| Ranger | Archery | Survival | Nature | Insight | 29 | Advanced tracking |
| Rogue | Fighting | Stealth | Streetwise | Insight | 29 | Infiltration |
| Shaman | Mysticism | Nature | Lore | Insight | 30 | Spirit medium |
| Slinger | Archery | Athletics | Stealth | Survival | 31 | — |
| Sorcerer | Arcana | Lore | Education | Insight | 25 | — |
| Summoner | Arcana | Education | Lore | Insight | 25 | Summon mechanics |
| Swashbuckler | Fighting | Athletics | Stealth | Influence | 36 | — |
| Tamer | Fighting | Nature | Athletics | Survival | 38 | Whip, beast training |
| Warlock | Arcana | Lore | Insight | Fortitude | 30 | Pact, curses, familiar |
| Warlord | Fighting | Influence | Education | Fortitude | 38 | Tactical commands |

---

## Appendix C: Combat Arts Interaction

The current system has 31 basic combat arts and 15 supreme combat arts (46 total). Talents interact with combat arts in several ways:

| Interaction Type | Examples | Count |
|-----------------|----------|-------|
| **Enable combat art use** | Art of Fighting (learn basic arts), Art of Archery (learn basic arts) | 2 |
| **Enhance combat art effects** | Weapon mastery talents (add damage/properties to specific weapons) | 6 |
| **Complement combat arts** | Disciplined Fighter (reliability), Rapid Shot (action economy) | 8 |
| **Substitute for combat arts** | Grappler (grapple options), Dual Wielder (off-hand attacks) | 3 |

**Gap:** No talents currently enhance or modify supreme combat arts. As supreme arts represent mastery, Rank 4–5 talents should explicitly interact with them (e.g., reduced costs, enhanced effects, new combinations).

---

## Appendix D: Complete Talent Catalog

This appendix contains fully fleshed out talent descriptions for all proposed changes: redesigns of existing problematic talents, new signature talents for under-served archetypes, R4–R5 extensions, Prestige Talents, and system integration talents.

**Format:** Each talent entry follows the standard template: talent name, skill, ranks with mechanical descriptions. Bonuses use fixed values (not scaling formulas) per §5.5 recommendations.

---

### D.1 Redesigned Existing Talents

These are revisions to talents identified in §6.3 as having problematic design patterns.

#### Inspire Ally (Influence) — Redesigned

> You rally an ally with a rousing word, a battle cry, or a gesture of confidence.

**Rank 1.** As a Quick Action on your turn, choose one ally within medium distance who can see or hear you. That ally gains +1 boon on their next roll before the start of your next turn. You can use this ability once per scene.

**Rank 2.** You can use Inspire Ally once between each of your turns (not limited to once per scene). If the inspired ally makes a successful attack, they deal +2 damage (ability bonus).

**Rank 3.** You can also target yourself with Inspire Ally. When you use this ability, the target also regains 4 HP.

*Changes: R1 now has once-per-scene limit and no longer adds scaling damage. R2 unlocks repeated use and adds fixed +2 damage instead of +Influence. R3 healing is fixed at 4 HP instead of +Influence.*

#### Insult to Injury (Influence) — Redesigned

> You mock and provoke your enemies, leaving them open to your allies' attacks.

**Rank 1.** After you hit a creature with an attack, you can use a Quick Action to Distract that creature (gaining +1 boon on the Distract roll).

**Rank 2.** When you or an ally hits a creature you have distracted, you deal +2 damage (ability bonus). Damage from other creatures ends the distracted condition unless you use Rank 3.

**Rank 3.** When an ally damages a creature you distracted, you can use a Quick Action to immediately Distract the same creature again (extending the condition). You can do this once between each of your turns.

*Changes: R2 damage is fixed at +2 instead of +Influence. This applies only to the attacker, not every ally simultaneously.*

#### Battle Rage (Fortitude) — Redesigned

> You channel your fury into a controlled fighting frenzy.

**Rank 1.** On your turn, you can use a Quick Action to enter a rage (short duration). While enraged: you gain +1 boon on Strength rolls that aren't attacks, and you can spend 2 HP when making a melee attack to deal +2 damage. You suffer +1 bane on Mind rolls and cannot cast or concentrate on spells. When your rage ends, roll Strength + Fortitude (TN 8) or suffer 1 Fatigue. You cannot use rage in heavy armor.

**Rank 2.** When you enter a rage, gain 10 temporary HP. While enraged, you gain +1 Resist (ability bonus). Spending 2 HP for damage now deals +4 damage instead of +2.

**Rank 3.** While enraged, when you take non-psychic damage, you can use a Quick Action to halve that damage (after AV subtraction). Spending 2 HP for damage now deals +6 damage instead of +4.

*Changes: Explicit Quick Action activation. Each rank adds 1–2 effects instead of 5. Damage bonus is fixed per rank instead of scaling. Drawbacks are contained to R1 instead of being spread across entries.*

#### Body of Bronze (Fortitude) — Redesigned

> Through punishing training and conditioning, your body becomes as resilient as armor.

**Rank 1.** +2 HP. While not wearing armor, your AV equals 2 (armor bonus).

**Rank 2.** +2 HP. While not wearing armor, your AV equals 3 (armor bonus). You are immune to the dazed and stunned conditions.

**Rank 3.** +2 HP. While not wearing armor, your AV equals 4 (armor bonus). You have resistance to physical damage.

*Changes: AV is now a fixed value per rank (2/3/4) instead of "1 + Fortitude" which scaled to 6. This caps the unarmored AV below heavy armor (Plate Harness = 6 AV) while still being competitive with light/medium armor.*

#### Armor of the Faithful (Mysticism) — Redesigned

> Your devotion creates a shimmering ward of spiritual protection around your body.

**Rank 1.** While not wearing armor, your AV equals 2 (armor bonus). You can use Spirit + Mysticism for weapon attacks instead of the normal attribute.

**Rank 2.** While not wearing armor, your AV equals 3 (armor bonus).

**Rank 3.** While not wearing armor, your AV equals 4 (armor bonus). You are immune to the frightened and confused conditions.

*Changes: AV is now fixed per rank (2/3/4) instead of "1 + Mysticism." Weapon attack attribute swap moved from R2 to R1 since it's the core identity.*

---

### D.2 New Signature Talents for Under-Served Archetypes

These talents fill the critical gaps identified in §7.1 where archetypes lack a signature talent.

#### Performer (Influence) — New (fills Bard gap)

> You are a master entertainer whose performances captivate audiences and stir emotions.

**Rank 1.** You can use Spirit + Influence to perform for an audience. During a rest or downtime, a successful performance grants you and all allies who listen +1 boon on their next Spirit roll (short duration). In social encounters, you can use Performance as an alternative approach for social actions.

**Rank 2.** As an Action in combat, you can begin a performance (requires concentration). While performing, allies within close range who can hear you gain +1 boon on their next roll each turn. You can maintain the performance as a Quick Action on subsequent turns.

**Rank 3.** While performing in combat, enemies within close range who can hear you suffer +1 bane on their next roll each turn (Spirit + Fortitude vs. your Resist to negate, once per scene per creature). Your performance range extends to short distance.

*Design note: This is the Bard's signature talent. R1 unlocks social/downtime performance. R2 provides combat support through an action-economy tradeoff (Action to start, Quick Action to maintain). R3 adds control.*

#### Prophetic Visions (Insight) — New (fills Oracle gap)

> You receive cryptic flashes of the future — brief moments of clarity that guide your actions.

**Rank 1.** Once per scene, when you or an ally within short range is about to make a roll, you can declare you had a vision about this moment. The creature gains +1 boon on the roll. You must declare this before the roll is made.

**Rank 2.** Once per day, during a rest, you can enter a prophetic trance (requires 10 minutes). Describe a question about the current situation to the GM. The GM provides a cryptic but truthful vision (one sentence) related to the question.

**Rank 3.** When you use your R1 vision ability and the creature succeeds, you regain the use of the ability (it doesn't count as your once-per-scene use). Additionally, once per day, you can spend 1 Resolve to grant an ally a reroll on any roll, declaring it was "fated."

*Design note: Oracle signature. R1 is a simple once-per-scene boon. R2 adds divination utility. R3 provides reliability and a powerful (but costly) reroll.*

#### Eldritch Pact (Arcana) — New (fills Warlock gap)

> You have forged a bargain with a being of immense power — a spirit lord, elder entity, or cosmic force.

**Prerequisite:** Arcane Spell Knowledge R1. You cannot also take Wild Overload (exclusivity group).

**Rank 1.** Choose a Patron type when you take this talent:
- **Fiend:** Once per scene, when you deal damage with an arcane spell, you regain 2 HP.
- **Fey:** Once per scene, after casting an arcane spell, you can teleport to an unoccupied space within close range.
- **Void:** Once per scene, when you hit with an arcane spell, the target suffers +1 bane on their next roll.

**Rank 2.** You learn one additional rank 0 spell from any discipline (this doesn't require Arcane Spell Knowledge). Your patron grants an enhanced benefit:
- **Fiend:** Regain 4 HP instead of 2. Also deal +2 fire damage to the target.
- **Fey:** Teleport range extends to short distance. You become invisible until the start of your next turn.
- **Void:** Target suffers +1 bane on all rolls until the end of their next turn.

**Rank 3.** Once per day, you can invoke your patron's direct intervention:
- **Fiend:** All enemies within close range take 6 fire damage (Spirit + Fortitude vs. TN 10 for half).
- **Fey:** You and up to 3 allies become invisible for a short duration or until attacking.
- **Void:** One creature within medium range must roll Spirit + Fortitude vs. TN 10 or be stunned for a short duration.

*Design note: Warlock signature. The exclusivity with Wild Overload prevents combining chaotic and structured power sources. Each patron provides a distinct flavor. R3 daily abilities are powerful but bounded.*

#### Contraption Builder (Crafting) — New (fills Engineer gap)

> You design and build mechanical devices, traps, and gadgets.

**Rank 1.** During a rest or downtime, you can construct a simple contraption (smoke bomb, flash powder, tripwire alarm, or grappling hook launcher) using 1 supply item. You can carry up to 3 contraptions at a time. Using a contraption is a Quick Action.

**Rank 2.** You can construct advanced contraptions (explosive charge: deals 8 blast damage in close area, Spirit + Fortitude TN 10 for half; bear trap: Agility + Athletics TN 10 or restrained; caltrops: close area becomes difficult terrain). Contraption carry limit increases to 5.

**Rank 3.** Your contraptions gain +1 boon on any required rolls. You can deploy a contraption as part of movement (no Quick Action required). Once per scene, you can jury-rig a solution to a mechanical problem (locked door, broken bridge, jammed mechanism) with an Agility + Crafting roll.

*Design note: Engineer signature. Contraptions provide prepared-utility gameplay. Fixed numbers avoid scaling issues.*

#### Spirit Medium (Mysticism) — New (fills Shaman gap)

> You commune with the spirits of the land, ancestors, and primal forces.

**Rank 1.** Once per day, during a rest, you can commune with local spirits. Roll Spirit + Mysticism (TN 8). On success, learn one of the following about the area: presence of danger, location of water/shelter, history of the place, or nature of any spiritual disturbances.

**Rank 2.** You can perceive spirits and undead within short range as a passive sense (no roll required). When you cast a mystic spell that targets spirits or undead, you gain +1 boon.

**Rank 3.** Once per scene, you can call upon a spirit for aid. Choose one: (a) a spirit guide grants you or an ally +1 boon on all rolls for a brief duration, (b) an ancestor's wrath deals 6 psychic damage to one creature within short range (vs. Resist), or (c) a nature spirit calms all non-hostile animals within short range.

*Design note: Shaman signature. Spiritual communion provides unique utility that no other talent covers.*

#### Herbalist (Nature) — New (fills Apothecary gap)

> You understand the medicinal properties of plants and can prepare remedies in the field.

**Rank 1.** During a rest, you can prepare 2 herbal remedies using 1 supply item. Remedies restore 4 HP when consumed (Action). You can identify poisonous plants, medicinal herbs, and natural toxins with a Mind + Nature roll (no supply required).

**Rank 2.** Your remedies now restore 8 HP. You can also prepare antidotes (cure one poison/disease effect) and stimulants (remove 1 Fatigue). Prepared remedies last until your next rest.

**Rank 3.** Your remedy output increases to 4 per rest. You can prepare advanced remedies: fortifying tonic (+2 temporary HP for short duration) or numbing salve (resistance to one damage type for short duration, chosen when applied).

*Design note: Apothecary signature. Works alongside the alchemy crafting system but focuses on field-prepared remedies rather than laboratory alchemy.*

#### Summoner's Bond (Arcana) — New (fills Summoner gap)

> You specialize in conjuration magic, maintaining stronger and more reliable summoned entities.

**Prerequisite:** Arcane Spell Knowledge R1 with at least one conjuration spell.

**Rank 1.** When you cast a conjuration spell that summons a creature or object, the summoned entity gains +2 temporary HP and lasts for one additional round beyond the spell's normal duration.

**Rank 2.** You can maintain concentration on two conjuration spells simultaneously (instead of one). Your summoned creatures gain +1 boon on their attacks.

**Rank 3.** Once per scene, when a summoned creature would be destroyed or dismissed, you can spend 2 Focus to sustain it for 2 additional rounds. Additionally, your summoned creatures can act on your Initiative instead of at the end of the round.

*Design note: Summoner signature. Enhances conjuration spells specifically. R2's dual concentration is the headline ability.*

---

### D.3 Rank 4 Extensions

These are new R4 entries for existing talents identified in §9.6 as needing extension.

#### Fighting R4 Extensions

**Art of Fighting R4** *(already exists — learn 2 more Combat Arts or Supreme Combat Arts)*

**Shield Mastery R4.** When you use Shield Mastery to reduce an attack's SL, adjacent allies wielding shields can also reduce the same attack's SL by one step (if the attack targeted them). Once per scene, you can use Shield Bash as a Quick Action instead of an Action.

**Defensive Dueling R4.** When you successfully parry a melee attack (the attack fails against your Parry), you can immediately make an Opportunity Attack against the attacker without spending a Quick Action. You can do this once between each of your turns.

**Martial Artist R4.** Your unarmed attacks deal 5 weapon damage. When you hit with an unarmed or improvised weapon attack, you can spend a Quick Action to force the target to roll Strength + Fortitude vs. TN 10 or be briefly stunned. Once per scene.

**Dual Wielder R4.** When you attack with two melee weapons, you can attack two different targets in reach (one attack per weapon, no additional bane). Once per scene, you can make attacks with both weapons against a single target as a single Action, applying the higher damage result.

**Polearm Mastery R4.** Enemies within your weapon's reach that move to a different position (not just entering your reach) provoke an Opportunity Attack from you. You can make these Opportunity Attacks without spending Quick Actions, up to twice between your turns.

#### Archery R4 Extensions

**Art of Archery R4** *(already exists — learn 2 more Combat Arts or Supreme Combat Arts)*

**Sharpshooter R4.** Your ranged attacks ignore cover bonuses entirely (light and heavy cover). Once per scene, you can make a "called shot" — if you hit, you can choose one: disarm the target, pin them (restrained, briefly), or blind them (briefly).

**Rapid Shot R4.** When you use Rapid Shot, you can target up to 3 different creatures within range (one attack against each, +1 bane on all rolls). On a strong or critical hit, the marked condition duration extends to short.

#### Arcana R4 Extensions

**Arcane Spell Knowledge R4** *(already exists — +2 Focus, learn 2 R4 spells)*

**Battle Mage R4** *(already exists — Quick Action cast R0 spell after weapon attack)*

**Spellweaver R4.** +2 Focus. Learn 2 more Metamagic Arts. Once per scene, you can apply one Metamagic Art to a spell without increasing its Focus cost.

**Spellblade R4.** You can use rank 3 spells with Spellblade. When you infuse a weapon attack with a spell, you can choose to apply the spell's strong-success effects regardless of the attack's actual SL (once per scene).

#### Mysticism R4 Extensions

**Mystical Spell Knowledge R4** *(already exists — +2 Focus, learn 2 R4 spells)*

**Mystic Champion R4.** You can use rank 3 spells with Mystic Champion. When you infuse a weapon attack with a mystic spell, you can extend the spell's condition effects to short duration (instead of brief).

**Shape Changer R4.** While in an alternate form, you gain an additional natural attack (can attack twice per Action, once with each natural weapon). Your form-change spells' duration extends by one step.

**Pact of Devotion R4.** Each pact gains an additional R4 benefit:
- **Glory:** When you trigger the Glory benefit, all allies within close range can also trigger it (deal +2 damage OR regain 2 HP).
- **Piety:** Your Piety Focus bonus increases to +3 per Mysticism rank. Aura defense extends to medium range.
- **Protection:** Your healing pool increases to 8×Mysticism HP. You can cure one Wound per day (costs 15 HP from your pool).
- **Vengeance:** Vow of Enmity now affects two creatures simultaneously. Your Focus-to-damage conversion becomes +3 damage per Focus spent.

#### General Skill R4 Extensions

**Evasion R4 (Athletics).** Once per scene, when you are targeted by an attack, you can use a Quick Action to roll Agility + Athletics vs. the attack roll. On success, you completely avoid the attack and can move 1 area without provoking Opportunity Attacks.

**Fast Stride R4 (Athletics).** You gain +2 Movement per turn (instead of +1). After using Fast Stride's hit-and-move ability, you don't provoke Opportunity Attacks for the rest of your turn.

**Hard to Kill R4 (Fortitude).** +2 HP. Once per day, when you would be reduced to 0 HP, you are reduced to 1 HP instead.

**Battle Rage R4 (Fortitude).** While enraged, you can spend 2 HP for +8 damage (instead of +6). When you reduce an enemy to 0 HP while enraged, you immediately regain 4 HP.

**Juggernaut R4 (Fortitude).** In melee with multiple enemies, your AV bonus cap increases to 2 + Fortitude. Once per scene, when you hit an enemy, all enemies within close range take 2 damage (your sheer presence threatens them).

**Inspire Ally R4 (Influence).** When you use Inspire Ally, you can target up to 2 allies simultaneously. Inspired allies deal +3 damage (ability bonus, instead of +2) and regain 6 HP (instead of 4).

**Leading Presence R4 (Influence).** Your aura range extends to extreme distance. Allies within your aura gain +2 Resist (ability bonus, instead of +1) and +3 damage (instead of +2).

**Empath R4 (Insight).** When you use Empath's combat reading ability on a creature and succeed, you also learn their current HP range (full/healthy/injured/critical/near death). Once per scene, you can warn an ally about an incoming attack — the ally gains +2 to their defense against that attack.

**Danger Sense R4 (Perception).** You cannot be surprised. You can take actions during surprise rounds even if your allies cannot. Your Initiative minimum increases to 10 (ignore results below 10).

**Identify Weakness R4 (Perception).** When you focus on a creature, the damage bonus increases to +3 (ability bonus). If the focused creature has any vulnerabilities, you automatically learn them.

**Assassination R4 (Stealth).** When you attack an unaware enemy from stealth, your attack's SL is upgraded by two steps (instead of one, max critical). If you reduce a creature to 0 HP from stealth, nearby enemies within close range must roll Spirit + Fortitude vs. TN 10 or become frightened of you (briefly).

**Monster Hunter R4 (Survival).** Your focused creature damage bonus increases to +4. You can maintain focus on two creatures simultaneously. When a focused creature takes a Wound, you learn one of its immunities, resistances, or weaknesses.

**Trap Maker R4 (Survival).** You can set traps during a delving turn without a Supply check (the skill itself is sufficient). Trap difficulty becomes very hard (TN 12). You can place up to 2 traps per delving turn.

**Animal Companion R4 (Nature).** Your animal companion's tier limit increases to Nature + 1. Your companion can act on its own Initiative (instead of yours) and can use 2 Combat Arts per scene.

**Field Medic R4 (Nature).** When you stabilize a dying creature, they regain consciousness with 6 HP instead of 0. Once per day, you can treat an Injury without requiring a rest (takes 10 minutes and a Supply check).

**Tactician R4 (Education).** Your Tactician scheme affects all allies (not just you). On a critical success, the first enemy to act suffers +1 bane on all rolls during their first turn. You can use Tactician once per scene (instead of once per combat).

**Commander R4 (Education).** The ally you command can choose from 3 effects (instead of 2). New option: "immediately take a movement action toward or away from the target you designate." You can command 2 allies per turn.

**Artisan R4 (Crafting).** Your crafting with ≥1 success adds +3 successes (instead of +2). You can craft items one Quality tier higher than your normal maximum (requires appropriate materials).

**Mage Hunter R4 (Lore).** When you use your Quick Action to add Lore to defenses against spells, the bonus lasts until the end of your next turn (instead of one attack). Once per scene, when you interrupt an enemy's spell (via OA or Spell Concentration failure), the enemy also loses 2 Focus.

**Magical Sense R4 (Lore).** Range extends to long distance. When detecting magic, you can also determine the specific school (tradition/discipline) and approximate rank of magical effects. You can maintain Magical Sense without Spell Concentration.

**Swashbuckler R4 (Streetwise).** +2 HP. When you hit with a light melee weapon, the target cannot use Opportunity Attacks until the start of your next turn. Once per scene, when you would be hit by a melee attack, you can use a Quick Action to roll Agility + Streetwise vs. the attack roll — on success, you avoid the hit entirely and move 1 area.

#### R5 Capstone Talents

These represent the absolute pinnacle of mortal skill. Each uses a once-per-day or once-per-session resource.

**Art of Fighting R5 (Fighting).** Learn 2 more Combat Arts or Supreme Combat Arts. Once per day, when you make a Fighting roll, you can declare it an automatic Critical Success (no roll needed). This represents a moment of perfect martial execution.

**Martial Artist R5 (Fighting).** Your unarmed attacks deal 6 weapon damage. Your body counts as a magical weapon (bypasses resistance to non-magical physical damage). Once per day, you can perform a stunning blow — on a successful unarmed hit, the target must roll Strength + Fortitude vs. TN 12 or be stunned for short duration.

**Art of Archery R5 (Archery).** Learn 2 more Combat Arts or Supreme Combat Arts. Once per day, when you make an Archery roll, you can declare it an automatic Critical Success. This represents the legendary shot — an arrow that finds its mark against all odds.

**Arcane Spell Knowledge R5 (Arcana).** +2 Focus. Learn two rank 5 or lower arcane spells.

**Battle Mage R5 (Arcana).** When you make a weapon attack, you can simultaneously cast a rank 0 or 1 spell at the same target as part of the same Action (no Quick Action or additional Focus required beyond the spell's normal cost). Once per day, you can cast a rank 2 spell as part of a weapon attack.

**Mystical Spell Knowledge R5 (Mysticism).** +2 Focus. Learn two rank 5 or lower mystic spells.

**Pact of Devotion R5 (Mysticism).** Each pact gains a pinnacle ability:
- **Glory:** Once per day, you and all allies within short range gain +1 boon on all rolls for short duration. Each ally also deals +3 damage and regains 3 HP on each hit during this time.
- **Piety:** Once per day, you can cast any mystic spell you know without spending Focus. You can also restore one ally's spent Resolve point (once per day per ally).
- **Protection:** Once per day, you can create a protective ward around all allies within short range. For a short duration, all allies gain +3 AV (ability bonus) and resistance to one damage type you choose.
- **Vengeance:** Once per day, when your Vow target deals damage to you or an ally, you can immediately make a free attack against them with +2 boons. If this attack reduces the target to 0 HP, you regain all spent Focus.

**Hard to Kill R5 (Fortitude).** +2 HP. Once per day, when you would die (suffer your third Wound), you don't. Instead, you remain at 0 HP with 2 Wounds, regain 10 HP, and can act normally on your next turn. This ability represents sheer refusal to fall.

**Animal Companion R5 (Nature).** Your animal companion's tier limit increases to Nature + 2. Your companion gains +1 to all attributes (one die size increase). Once per day, your companion can act as though it has 3 Actions this turn (instead of the normal Action + Quick Action + Movement), representing a moment of perfect coordination.

**Magical Sense R5 (Lore).** Your magical detection is now permanent and passive — you always sense magic within long range. Once per day, you can completely suppress one magical effect within short range for a short duration (as if it were dispelled). This works on enchantments, active spells, and magical traps.

---

### D.4 Prestige Talents (Fully Written)

These require R3+ in two specified skills. Each has 2 ranks maximum.

#### Phalanx Commander (Fighting + Influence)

> You are a master of coordinated combat, turning a group of shield-bearing warriors into an impenetrable wall.

**Prerequisites:** Fighting 3, Influence 3.

**Rank 1.** Adjacent allies wielding shields gain +1 AV while you are also wielding a shield. As a Quick Action on your turn, you can issue a "hold formation" command — until the start of your next turn, allies within close range who don't move gain +1 Parry.

**Rank 2.** Once per scene, you can command a coordinated strike. All allies within close range can immediately make an Opportunity Attack against an enemy in their reach. These attacks gain +1 boon.

#### Blade Dancer (Fighting + Stealth)

> You weave through combat with deadly grace, striking and vanishing before your enemies can respond.

**Prerequisites:** Fighting 3, Stealth 3.

**Rank 1.** After you hit a creature with a melee attack using a light or agile weapon, you can immediately move 1 area without provoking Opportunity Attacks (once between your turns).

**Rank 2.** Once per scene, when a melee attack against you misses, you can immediately make a free melee attack against the attacker. If this attack hits, you can also move 1 area without provoking Opportunity Attacks.

#### Iron Tempest (Fighting + Athletics)

> Your combat rage carries a devastating momentum — each enemy you fell fuels your next strike.

**Prerequisites:** Fighting 3, Athletics 3.

**Rank 1.** When you reduce an enemy to 0 HP with a melee attack, you can immediately make a free melee attack against a different enemy within reach. This free attack suffers +1 bane.

**Rank 2.** Once per day, you can enter a fighting fury (Quick Action, short duration). While in this fury: your melee attacks deal +2 damage, your Movement increases by 1, but your Parry and Dodge each decrease by 2. When the fury ends, you suffer 1 Fatigue.

#### Predator's Mark (Archery + Survival)

> You are the consummate hunter, patiently tracking and methodically dismantling your prey.

**Prerequisites:** Archery 3, Survival 3.

**Rank 1.** As a Quick Action, mark a creature you can see within long range. Attacks against your marked target gain +1 boon and ignore light cover. The mark lasts for short duration or until you mark a new creature.

**Rank 2.** While your mark is active, you can use Monster Hunter's focus ability against the marked creature without a Quick Action (it's automatic). If your marked target attempts to flee, you automatically know their direction of movement.

#### Siege Engineer (Archery + Crafting)

> You build and deploy siege-scale devices and battlefield contraptions.

**Prerequisites:** Archery 3, Crafting 3.

**Rank 1.** You can construct throwable contraptions during a rest using 2 supply items: explosive (8 blast damage in close area, Agility + Athletics TN 10 for half), smoke bomb (close area heavily obscured for brief duration), or caltrops (close area becomes difficult terrain, creatures entering take 2 damage). You can carry up to 4. Throwing uses Agility + Archery.

**Rank 2.** During downtime, you can construct a portable ballista (2 days, 10 supply items). The ballista deals 12 pierce damage at long range, requires an Action to fire and a Quick Action to reload. It can be operated by you or any ally you instruct.

#### Eldritch Pact (Arcana + Lore) — Prestige Version

*See D.2 for the full R1–R3 talent. The Prestige version below is an alternative for characters who want pact magic as a cross-skill investment rather than a primary Arcana talent.*

**Prerequisites:** Arcana 3, Lore 3.

**Rank 1.** Choose a Patron type (Fiend, Fey, or Void). You gain the patron's R1 benefit from the Eldritch Pact talent (D.2) and learn one rank 0 spell from any discipline without requiring Arcane Spell Knowledge.

**Rank 2.** You gain the patron's R2 benefit. Once per day, you can invoke your patron to reroll any one failed roll and take the new result.

#### Song of Power (Mysticism + Influence)

> Your voice channels divine energy — a hymn that strengthens allies and unsettles enemies.

**Prerequisites:** Mysticism 3, Influence 3.

**Rank 1.** As an Action, you can begin a mystic performance (requires concentration). While performing, allies within close range who can hear you gain +1 boon on their next roll each turn. You can maintain the performance with a Quick Action on subsequent turns.

**Rank 2.** While performing, enemies within close range suffer +1 bane on their next roll each turn (Spirit + Fortitude vs. your Resist to negate, once per scene per creature). Your performance range extends to short distance.

*Design note: This is the Bard's signature prestige talent. It works alongside Performer (Influence) — one provides mundane entertainment, the other channels mystic energy through art.*

#### Prophetic Sight (Mysticism + Insight)

> Your communion with divine forces grants you genuine glimpses of what is to come.

**Prerequisites:** Mysticism 3, Insight 3.

**Rank 1.** Once per day, during a rest, you can enter a prophetic trance (10 minutes). Describe a question about the future to the GM. The GM provides a cryptic but truthful vision of 1–3 sentences. The vision always contains at least one actionable detail.

**Rank 2.** Once per day, you can spend 1 Resolve to grant an ally within short range a reroll on any failed roll, declaring it was "fated to succeed." Additionally, once per scene, when combat begins, you can declare "I saw this coming" — you and one ally automatically act before all enemies in the first round (regardless of Initiative).

#### Beast Bond (Nature + Survival)

> Your connection with animals transcends training — you share a spiritual bond with your companions.

**Prerequisites:** Nature 3, Survival 3.

**Rank 1.** Your animal companion gains +1 to one attribute (one die size increase, your choice). You can communicate detailed instructions to your companion without a roll (they understand complex commands, not just simple ones).

**Rank 2.** Your companion can act on its own Initiative and makes its own decisions in combat when you are incapacitated. Once per day, you can see and hear through your companion's senses for a short duration.

#### Underworld Contact (Streetwise + Influence)

> Your reputation in the criminal underworld opens doors that wealth and status cannot.

**Prerequisites:** Streetwise 3, Influence 3.

**Rank 1.** In any settlement you've visited before, you can locate a black market contact (Mind + Streetwise vs. settlement difficulty). Contacts can provide one service: fencing stolen goods (full price), forging documents, smuggling items, or gathering criminal intelligence.

**Rank 2.** Your contacts offer one free favor per settlement per visit (no roll required for the first contact). Additionally, in any settlement, you can spend 1 day to establish a safe house — a hidden location where you and your allies cannot be found by mundane searches.

#### Master Alchemist (Crafting + Nature)

> Your understanding of natural substances and crafting processes transcends normal alchemy.

**Prerequisites:** Crafting 3, Nature 3.

**Rank 1.** When crafting alchemical items, your batch yield doubles. You can identify any potion, substance, or alchemical compound on sight (no roll required).

**Rank 2.** Your alchemical items have their numerical effects increased by 50% (round up). For example, a healing potion that restores 8 HP instead restores 12 HP. A damaging bomb that deals 6 damage deals 9 damage.

---

### D.5 System Integration Talents

These talents interact with the Challenge, Social Intrigue, and Travel systems. See §8 for the design rationale.

#### Keen Observer (Perception) — Challenge/Travel

> Your sharp senses catch details others miss, whether in a heated negotiation or a treacherous journey.

**Rank 1.** Once per scene, when making a Perception roll during a challenge, you can reroll the result.

**Rank 2.** When you succeed on a Perception roll during a challenge, you learn one hidden detail about the challenge (GM reveals a mechanical detail: the current challenge die value, a hidden TN modifier, or an alternative approach). When traveling as Scout, you can reroll one Scout check per travel day.

**Rank 3.** When you critically succeed on a Perception roll during a challenge, reduce the challenge die by an extra 1. When traveling as Scout, you reduce the Encounter Die by one step in your terrain.

#### Silver Tongue (Influence) — Social Intrigue

> You know exactly what to say, when to say it, and how to keep a conversation going your way.

**Rank 1.** Once per Social Intrigue scene, you can delay a Patience decrease by 1 (the NPC's patience doesn't decrease this round even if it normally would).

**Rank 2.** After successfully appealing to an NPC's Motivation, you gain +1 boon on your next social action against that NPC. Once per scene, when Interest would decrease, you can prevent the decrease.

**Rank 3.** You can attempt to discover one of the NPC's Pitfalls by rolling Spirit + Influence vs. the NPC's Resist. On success, the GM reveals one Pitfall. You can do this once per Social Intrigue scene.

#### Read the Room (Insight) — Social Intrigue/Challenge

> You read the emotional undercurrents of social situations, understanding what's really happening beneath the surface.

**Rank 1.** You gain +1 boon on Insight rolls during Social Intrigue scenes. Once per Social Intrigue scene, you can learn the NPC's current Interest level (exact number).

**Rank 2.** Once per Social Intrigue scene, you can learn the NPC's current Patience level. You can also warn an ally about a Pitfall before they trigger it — if you've previously discovered a Pitfall, allies who can hear you gain +1 boon to avoid it.

**Rank 3.** Once per Social Intrigue scene, you can learn one of the NPC's Motivations without rolling. Additionally, when any ally triggers a Pitfall, you can intervene — roll Spirit + Insight vs. TN 10. On success, the Pitfall's negative effect is halved.

#### Pathfinder (Survival) — Travel

> You are a master navigator who finds the safest and most efficient routes through any terrain.

**Rank 1.** When traveling as Navigator, you can reroll one Navigate check per travel day.

**Rank 2.** When you succeed as Navigator, add +1 to daily travel progress. When you roll a blunder on a Navigate check, treat it as a normal failure instead.

**Rank 3.** You can identify the safest route through hazardous terrain — once per journey, when the party would encounter a Checkpoint (blockade, ambush, extreme climate), you can roll Mind + Survival vs. TN 10 to find an alternate route that avoids it entirely.

#### Trailblazer (Athletics) — Travel

> Your physical endurance and pathfinding skill allow you to push through terrain that would stop others.

**Rank 1.** When traveling through difficult terrain, reduce terrain movement penalties by 1 step (e.g., "no progress" becomes "half progress").

**Rank 2.** On a day when the party makes zero progress, you can roll Strength + Athletics (TN 10). On success, the party makes half a day's progress instead.

**Rank 3.** You and allies within short range are immune to travel Fatigue from forced marches. Once per journey, you can declare a forced march that adds +2 to daily progress with no Fatigue cost for the party.

#### Expedition Leader (Education) — Travel

> You organize supplies, plan rest stops, and keep the group focused on the journey's objectives.

**Rank 1.** During travel, your party consumes 1 fewer ration per day (minimum 1 total). You can take the Quartermaster role without rolling — you automatically succeed at basic supply management.

**Rank 2.** When the party camps for the night, allies who rest gain +1 boon on their recovery rolls. You can organize watches such that all party members gain the benefits of a full rest (even with interrupted sleep).

**Rank 3.** Once per journey, you can declare "efficient march" — the party gains +1 daily progress for 3 consecutive days. Supply checks during your journey gain +1 boon.

---

**End of Analysis**
