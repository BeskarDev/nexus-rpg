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

**Recommendation:** Add redirection talents (Insight-based: redirect attacks), avoidance talents (Stealth-based: vanish in combat), and reactive defense talents (Perception-based: danger sense in combat). See §4.5.1 below for concrete proposals.

#### 4.5.1 Proposed Defensive Talents

The following new talents address each missing defensive category. Full write-ups appear in Appendix D.

**Redirection — Redirecting Presence (Insight), New**

Uses empathic reading to manipulate enemy targeting. R1: Once per scene, when an ally within close range is attacked, use a Quick Action to redirect the attack to a different valid target (including yourself) by rolling Spirit + Insight vs. the attacker's Resist. R2: Redirection can be used once between each of your turns. R3: When you redirect an attack to yourself and the attack misses, the attacker is briefly dazed.

**Avoidance — Shadow Slip (Stealth), New**

Uses misdirection and positioning to avoid attacks entirely. R1: Once per scene, when you are attacked in melee and there is an enemy adjacent to your attacker, you can use a Quick Action to impose +1 bane on the attack against you by slipping behind cover. R2: When a melee attack against you misses, you can move to any unoccupied space within close range without provoking Opportunity Attacks. R3: Once per scene, when you are targeted by any attack, you can use a Quick Action to become briefly hidden (as if you had used the Hide action). The attack still resolves, but if it misses, you begin your next turn hidden.

**Reactive Defense — Combat Instincts (Perception), New**

Situational awareness grants split-second defensive reactions. R1: Once per scene, when you are targeted by an attack you can see coming, you can use a Quick Action to gain +2 to the targeted Defense against that attack. R2: When an ally within close range is targeted by an attack and you can see the attacker, you can use a Quick Action to warn the ally — they gain +1 to their targeted Defense. R3: You gain +1 Quick Action that can only be used for defensive Quick Actions (Evade, Protect Ally, or abilities from this talent) between your turns.

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
| **Body of Bronze R1** | R1 | AV = 1 + Fortitude (armor bonus) | ⚠️ Scales from 2 to 6 AV — matches light/medium armor at low levels, exceeds it at high levels. At Skill Rank 5 Fortitude, this grants 6 AV with no load, no rigid, and no durability concerns — strictly superior to all physical armor. |
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

**Critical rule context — spell acquisition is automatic:** When a character gains a rank in Arcana or Mysticism, they **automatically learn new spells as part of the skill rank-up** (Arcana: 2 spells per rank; Mysticism: 2 spells for Balance path, 3 spells for Devotion path). The Spell Knowledge talents (Arcane Spell Knowledge, Mystical Spell Knowledge) provide *additional* spells and +2 Focus per rank on top of this baseline. This means:

- A character with Arcana 1 already knows **two rank 0 spells and one discipline** — they can cast immediately.
- A character with Mysticism 2 already knows **four spells** (Balance) or **six spells** (Devotion) across their traditions.
- Spell Knowledge talents add breadth (more spells, more disciplines) and resources (+2 Focus), but they are **not required for basic spellcasting**.

**The hybrid temptation — real cost assessment:**

Because spell access is inherent to the magic skill rank, a Fighter who invests just 2 XP for Arcana 1 gains: one discipline, two rank 0 spells, a Focus pool, and eligibility for Battle Mage R1. This is a significant capability package for a modest XP investment.

However, analysis suggests this is **mostly a non-issue** for the following reasons:

1. **XP scarcity limits dipping.** Each skill rank requires significant XP (2/6/12/18/24). A fighter who invests 2 XP for Arcana 1 sacrifices 2 XP that could go toward Fighting 3 or Fortitude 2. The opportunity cost is real — at early levels, every 2 XP matters for hitting key skill rank thresholds.

2. **Focus pools are small without investment.** A d6 Mind character at Arcana 1 has only 4 Focus — enough for two rank 0 spells (0 Focus) and no rank 1 spells without going to HP. Without Spell Knowledge's +2 Focus per rank, sustained casting is impractical. The hybrid gets a few utility cantrips, not a full spell repertoire.

3. **Spell power scales with attributes.** Spell Power = ½ Mind (Arcana) or ½ Spirit (Mysticism). A martial character typically prioritizes Strength/Agility, leaving their casting attribute at d6 (Spell Power 3). This makes their spells significantly weaker than a dedicated caster's.

4. **Flavor alignment is intentional.** The Champion (Fighting + Mysticism) and Magus (Fighting + Arcana) are explicitly designed archetypes. Hybrids are a feature, not a bug.

**Where intervention may be needed:**

The concern arises at **Rank 3+ magic skills** where hybrid characters can access powerful spell infusion (Spellblade R3 = rank 2 spells through weapons, Mystic Champion R3 = rank 2 mystic spells through weapons) while also having Fighting 3+ for Combat Arts. This combination — full weapon mastery AND rank 2 spell infusion — may outperform pure martials who get similar damage but without the spell utility.

**Natural differentiation through Focus economy:**

The system already provides meaningful differentiation through three mechanisms:

1. **Focus pool scaling.** Pure casters with Spell Knowledge have Focus pools of 12–20+. Hybrids without Spell Knowledge talents have Focus pools of 4–10. This limits how many spell-infused attacks a hybrid can make per scene.

2. **Focus recovery access.** Pure casters have Focus recovery talents (Inexhaustible Mind, Divine Rites) that let them sustain casting across multiple encounters. Hybrids who invest in combat talents instead lack these recovery mechanisms.

3. **Attribute tension.** Pure casters maximize Mind or Spirit (boosting Spell Power, Focus, and Resist). Pure martials maximize Strength or Agility (boosting weapon damage and Dodge/Parry). Hybrids must compromise, gaining moderate effectiveness in both areas but excelling in neither.

This creates a natural triad:
- **Full caster:** Many spells, high Focus + recovery, high Spell Power → Versatile, sustained magical output
- **Hybrid:** Spell-infused weapons, limited Focus, moderate Spell Power → Burst potential, resource-constrained, falls off without rests
- **Full martial:** No spells, no Focus costs, best weapons + Combat Arts → Highest sustained physical damage, most reliable turn-to-turn output

**Recommendation:** The current implicit differentiation through Focus economy and attribute tension is sufficient. No talent exclusivity between martial and magic talents is needed. However, R4–R5 martial talents must provide enough power to keep pure martials competitive with hybrids at high levels — pure martials should gain abilities that match the versatility advantage hybrids get from their spell access.

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

### 9.6 Extension Strategy: Simplified Talent Progression Framework

Based on designer guidance, talent progression should follow **exactly three paths**. This avoids proliferating different talent types and keeps the system clean:

| Path | Ranks | Purpose | Example |
|------|-------|---------|---------|
| **Signature Talent (R1–R5)** | 1, 2, 3, 4, 5 | Core archetype identity. A character's defining talent line that grows with them from Novice to Grandmaster. | Art of Fighting, Pact of Devotion, Animal Companion |
| **Basic Low-Level Talent (R1–R3)** | 1, 2, 3 | Standard talents that unlock and complete a playstyle at the Expert tier. Design space is fully explored by R3. | Blade Mastery, Evasion, Born Haggler |
| **High-Level Talent (R4–R5)** | 4, 5 | New talents that only exist at Master/Grandmaster tier. Require high skill rank to even attempt. Represent abilities that only masters would develop. | New talents designed specifically for R4+ |

**This means:**
- No talent spans R1–R4 only (either it's signature and goes to R5, or it caps at R3).
- Prestige Talents and single-skill capstones are not separate categories — they are both implementations of the "high-level talent" path. The question is only which design principle serves better for R4–R5 content (see §10).
- The TP dead zone is solved by a combination of extending ~8–10 signature talents to R5, and creating new high-level R4–R5 talents for each skill.

#### Which Existing Talents Become Signature (R1–R5)?

These are the "career" talents — a character's defining investment from level 1 through endgame. Each should represent a core archetype identity.

| Skill | Signature Talent (R1–R5) | Archetype Served |
|-------|-------------------------|------------------|
| Fighting | Art of Fighting | Fighter, Gladiator, Hoplite (Combat Art access) |
| Fighting | Martial Artist | Monk, Brawler (unarmed combat) |
| Archery | Art of Archery | Ranger, Slinger (Combat Art access) |
| Arcana | Arcane Spell Knowledge | Sorcerer, Summoner (spell access) |
| Arcana | Battle Mage | Magus (weapon-magic hybrid) |
| Mysticism | Mystical Spell Knowledge | Priest, Druid, Shaman (spell access) |
| Mysticism | Pact of Devotion | Champion (divine warrior pact) |
| Fortitude | Hard to Kill | Barbarian, Fighter (survivability career) |
| Nature | Animal Companion | Tamer, Druid (companion career) |
| Lore | Magical Sense | Warlock, Sorcerer (arcane awareness career) |

**Total: 10 signature talents that extend to R5.**

#### Which Existing Talents Cap at R3 (Basic Low-Level)?

All remaining talents. Their design space is fully explored at R3, they're situational, or extending them further would cause power issues. This includes:

- **All weapon mastery talents** (Axe, Blade, Heavy Weapon, Mace, Polearm) — weapon-specific technique is complete at R3
- **All defensive stance talents** (Defensive Dueling, Protective Stance, Shield Mastery) — defensive kit is complete
- **All utility talents** (Born Haggler, Fast Talking, Athletic Movement, etc.) — utility effects don't need R5 power
- **All focus recovery talents** (Inexhaustible Mind, Divine Rites) — recovery scaling is sufficient
- **All cantrip mastery** (Master of Fundamentals, Master of Principles) — cantrip enhancement is complete

#### What Goes in the R4–R5 High-Level Category?

New talents designed specifically for Master and Grandmaster tiers. These fill the remaining TP budget and provide fresh options that couldn't exist at lower ranks.

The open question is **what design principle** to use for these high-level talents. Section 10 evaluates two approaches: single-skill capstones vs. cross-skill prestige talents.

#### Summary

| Progression Path | Count | Talent Types |
|-----------------|-------|--------------|
| **Signature (R1–R5)** | 10 | Art of Fighting, Martial Artist, Art of Archery, Arcane/Mystical Spell Knowledge, Battle Mage, Pact of Devotion, Hard to Kill, Animal Companion, Magical Sense |
| **Basic Low-Level (R1–R3)** | ~112 | All remaining existing talents |
| **High-Level (R4–R5)** | TBD | New talents — see §10 for design framework |

This three-path structure keeps the system clean: every talent is either a signature career talent (R1–R5), a complete low-level talent (R1–R3), or a new high-level talent (R4–R5). No talent awkwardly stops at R4.

---

## 10. High-Level Talent Design: R4–R5 Framework

The core design question for R4–R5 is: **what type of new talents should fill the high-level slot?** Two approaches are evaluated below. They are not mutually exclusive — the final system may use one, the other, or both.

### 10.1 Approach A: Single-Skill Capstone Talents

**Concept:** New R4–R5 talents within a single skill that represent advanced mastery only a Master or Grandmaster could achieve.

| Factor | Assessment | Notes |
|--------|------------|-------|
| **System fit** | ✅ Strong | Simple extension of existing talent model. No new rules needed. |
| **TP budget** | ✅ Efficient | Each skill gets 2–3 new talents at R4 and 1 at R5, absorbing surplus TP cleanly. |
| **Complexity** | ✅ Low | Players already understand single-skill talents. |
| **Archetype definition** | ⚠️ Moderate | Provides depth within a skill but doesn't reward cross-skill investment. |
| **Design space** | ⚠️ Limited | Some skills (Streetwise, Insight) struggle to fill R4–R5 with compelling single-skill effects. |

**Design principles for single-skill capstones:**
- R4 talents should be **encounter-shaping**: broader scope, multi-target, reduced action costs.
- R5 talents should be **session-defining**: once-per-day or once-per-scene dramatic abilities.
- Both should feel like fundamentally new capabilities, not just bigger numbers.
- Use clear cost gates (once per day, Resolve spend, HP cost) to prevent abuse.

### 10.2 Approach B: Prestige Talents (Cross-Skill)

**Concept:** Advanced talents requiring Rank 3+ in two skills. They reward multi-skill investment and define archetype identity through cross-skill synergy.

| Factor | Assessment | Notes |
|--------|------------|-------|
| **System fit** | ✅ Strong | TP economy supports multi-skill builds. Characters naturally spread XP across 3–4 skills. |
| **Archetype alignment** | ✅ Strong | Each archetype uses 4 skills. Prestige Talents mechanically reward thematic investment. |
| **Complexity** | ⚠️ Moderate | Adds a prerequisite layer that must be clearly communicated. New concept for players. |
| **Archetype definition** | ✅ Strong | Explicitly ties talent access to archetype skill combinations. |
| **Design space** | ✅ Rich | Cross-skill combinations open many unique effects (shield+leadership, archery+crafting, magic+social). |

**Design principles for Prestige Talents:**
- **Prerequisites:** Rank 3+ in two named skills (the "pillar" and one supporting skill).
- **Ranks:** 2 maximum (R4 and R5 only — modest investment alongside signature talents).
- **Placement:** Listed under the pillar skill, with prerequisites clearly noted.
- **Budget:** 2–4 per skill, focused on archetypes that use that skill as a pillar.

### 10.3 Recommendation

Both approaches have merit and address different needs:

| Need | Single-Skill Capstones | Prestige Talents |
|------|----------------------|------------------|
| TP dead zone | ✅ Directly fills surplus | ✅ Also fills surplus |
| Archetype identity | ⚠️ Moderate (skill-defined) | ✅ Strong (combination-defined) |
| System complexity | ✅ Minimal (no new rules) | ⚠️ Moderate (new prerequisite type) |
| Build pressure | ⚠️ None (free picks) | ✅ Rewards planned investment |
| Design uniqueness | ⚠️ Must avoid being "R3 but bigger" | ✅ Cross-skill effects are inherently novel |

**Recommended decision path:**
1. **If simplicity is paramount:** Use only single-skill capstones. Design 2–3 new R4–R5 talents per skill.
2. **If archetype identity matters most:** Use only prestige talents. Design 2–4 cross-skill talents per archetype cluster.
3. **If both goals matter (recommended):** Use both. Each skill gets 1–2 single-skill capstones (simple, universally accessible) AND 1–2 prestige talents (archetype-specific, cross-skill). This provides enough R4–R5 options to absorb the TP surplus while rewarding both deep and wide investment strategies.

### 10.4 R4–R5 Templates

Whether single-skill or prestige, R4–R5 talents should follow these templates:

#### Rank 4 Templates (Encounter-Shaping)

| Template | Pattern | Example |
|----------|---------|---------|
| **Scope Expansion** | Single-target → multi-target | Shield Mastery (new R4): Shield bonus applies to adjacent allies |
| **Action Economy** | Full Action → Quick Action | Second Wind (new R4): Use as Quick Action once per day |
| **Reliability** | Conditional → consistent | Evasion (new R4): Use even when surprised or restrained |
| **System Bridge** | Combat → Challenge/Travel | Disciplined Fighter (new R4): Add Fighting to Fortitude rolls during challenges |
| **Recovery** | Mitigate → reverse | Hard to Kill R4: When reduced to 0 HP, remain at 1 HP instead (once per day) |

#### Rank 5 Templates (Session-Defining)

| Template | Pattern | Example |
|----------|---------|---------|
| **Legendary Action** | Once per day, dramatic effect | Art of Fighting R5: Treat any Fighting roll as a Critical Success |
| **Permanent Enhancement** | Passive mastery bonus | Sharpshooter (new R5): Ranged attacks never suffer banes from range/cover/weather |
| **Narrative Authority** | Player-directed story impact | Tactician (new R5): Once per session, declare a tactical insight (GM adjudicates) |
| **Capstone Synergy** | Combine two talent lines | Battle Mage R5: Cast a spell and make a weapon attack as one Action |
| **Grandmaster Signature** | Unique pinnacle ability | Martial Artist R5: Unarmed strikes count as magic weapons; 6 weapon damage |

### 10.5 Prestige Talent Proposals

If prestige talents are adopted, the following representative designs each address a specific archetype gap. Full write-ups appear in Appendix D.

#### Martial Prestige Talents (Fighting pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Phalanx Commander** | Fighting 3, Influence 3 | Hoplite/Warlord | Adjacent shield-bearing allies gain +1 AV; once per scene, command a coordinated strike |
| **Iron Tempest** | Fighting 3, Athletics 3 | Barbarian/Gladiator | Free attack on killing blow; once per day, enter fighting fury (+1 boon attacks, −2 defenses) |
| **Blade Dancer** | Fighting 3, Stealth 3 | Duelist/Swashbuckler | Move 1 area after hitting without provoking; once per scene, counter-attack on dodge |

#### Ranged Prestige Talents (Archery pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Predator's Mark** | Archery 3, Survival 3 | Ranger | Mark target (Quick Action): +1 boon, ignore half cover (short duration) |
| **Siege Engineer** | Archery 3, Crafting 3 | Engineer | Construct siege devices; thrown contraptions gain +1 boon and affect close area |

#### Spellcaster Prestige Talents (Arcana/Mysticism pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Song of Power** | Mysticism 3, Influence 3 | Bard | Mystic performance grants allies +1 boon; R2 also imposes −1 bane on enemies |
| **Prophetic Sight** | Mysticism 3, Insight 3 | Oracle | Daily prophetic trance; R2 grants Resolve-spend re-roll to allies |

#### Skill Prestige Talents (Non-combat pillars)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Beast Bond** | Nature 3, Survival 3 | Tamer/Druid | Companion gains +1 to all attributes; R2 companion acts independently |
| **Underworld Contact** | Streetwise 3, Influence 3 | Rogue | Locate black market contacts in any settlement; R2 one free favor per visit |
| **Master Alchemist** | Crafting 3, Nature 3 | Apothecary | Double alchemy batch yield; R2 effects increased by one tier |

## 11. Concrete Design Recommendations

### 11.1 Phase 1: Foundation (Immediate Priority)

**Goal:** Complete incomplete talents and address critical skill gaps.

#### 11.1.1 Complete Incomplete Talents (17 entries across 8 talents)

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

#### 11.1.2 Expand Critically Low Skills (+15–20 talents)

| Skill | Current | Target | New Talents Needed | Focus Areas |
|-------|---------|--------|--------------------|-------------|
| **Insight** | 5 | 8–9 | +3–4 | Prophecy (Oracle), combat reading, defensive redirection, investigation |
| **Streetwise** | 4 | 8–9 | +4–5 | Infiltration (Rogue), urban survival, contacts/networking, dirty fighting |
| **Influence** | 7 | 9–10 | +2–3 | Battlefield commands (Warlord), crowd performance (Bard), authority |
| **Perception** | 5 | 8–9 | +3–4 | Awareness-based defense, evidence gathering, travel scouting |
| **Survival** | 7 | 9–10 | +2–3 | Travel integration, advanced tracking, wilderness mastery |
| **Stealth** | 6 | 8–9 | +2–3 | Infiltration, escape, combat stealth |

### 11.2 Phase 2: System Integration (High Priority)

**Goal:** Create talents that interact meaningfully with Challenges, Social Intrigue, and Travel.

#### 11.2.1 Challenge Talents (+6–8 talents)

New talents that interact with challenge die mechanics:

| Talent | Skill | Challenge Hook |
|--------|-------|---------------|
| **Keen Observer** | Perception | Re-roll during challenges; learn hidden details; reduce die/negate consequences |
| **Methodical Research** | Education | Reduce challenge die by extra 1 on critical; treat Library as Clever approach |
| **Dogged Pursuit** | Survival | Re-roll during chase challenges; ignore terrain penalties in pursuits |
| **Improvised Solutions** | Crafting | Use Crafting as a secondary skill without bane in physical challenges |
| **Streetwise Informant** | Streetwise | Learn challenge details in advance; reduce starting die by 1 in urban settings |
| **Tactical Assessment** | Education | Reveal TN of current challenge step; plan approach for allies |

#### 11.2.2 Social Intrigue Talents (+4–6 talents)

New talents that interact with Interest, Patience, and social actions:

| Talent | Skill | Social Hook |
|--------|-------|-------------|
| **Silver Tongue** | Influence | Delay Patience; gain boons after Motivation appeal; block Interest drops |
| **Read the Room** | Insight | Boons on Investigate; learn Interest/Patience state; warn about Pitfalls |
| **Courtly Grace** | Education | Use Education for etiquette; reduce TN for formal negotiations |
| **Threatening Presence** | Fortitude | Use Fortitude for intimidation; impose banes on enemy social actions |

#### 11.2.3 Travel Talents (+6 talents)

New talents that interact with travel roles:

| Talent | Skill | Travel Hook |
|--------|-------|-------------|
| **Pathfinder** | Survival | Navigator re-rolls; progress bonuses; detour avoidance |
| **Trailblazer** | Athletics | Terrain penalty reduction; progress on zero days |
| **Cartographer's Eye** | Perception | Spot hidden checkpoints; terrain assessment |
| **Expedition Leader** | Education | Supply management; enhanced camp rest |
| **Road Warden** | Streetwise | Civilized travel bonuses; NPC contact for aid |
| **Seasoned Forager** | Nature | Enhanced forage yields; identify edible plants |

### 11.3 Phase 3: High-Rank Progression (Medium Priority)

**Goal:** Implement R4–R5 content using the three-path framework from §9.6.

#### 11.3.1 Signature Talent R4–R5 Extensions (10 talents × 2 ranks = ~20 entries)

Extend the 10 identified signature talents to R4 and R5. These are the highest priority because they define the core archetype experience at Grandmaster tier.

| Skill | Signature Talent | Design Focus |
|-------|-----------------|--------------|
| Fighting | Art of Fighting | R4: more Combat Arts; R5: auto-Critical once per day |
| Fighting | Martial Artist | R4: 5 weapon damage + stun; R5: magic weapon + 6 damage |
| Archery | Art of Archery | R4: more Combat Arts; R5: auto-Critical once per day |
| Arcana | Arcane Spell Knowledge | R4: R4 spells (exists); R5: R5 spells |
| Arcana | Battle Mage | R4: Quick Action cantrip (exists); R5: spell + weapon in one Action |
| Mysticism | Mystical Spell Knowledge | R4: R4 spells (exists); R5: R5 spells |
| Mysticism | Pact of Devotion | R4: pact enhancement; R5: pinnacle pact ability |
| Fortitude | Hard to Kill | R4: survive at 1 HP; R5: refuse death once per day |
| Nature | Animal Companion | R4: independent companion; R5: exceptional companion |
| Lore | Magical Sense | R4: long range + school ID; R5: permanent detection + dispel |

#### 11.3.2 New High-Level Talents (R4–R5 only, ~16–32 entries)

Create 1–2 entirely new R4–R5 talents per skill. These fill the remaining TP surplus and provide fresh options that couldn't exist at lower ranks.

| Skill | New R4–R5 Talent | Design Focus |
|-------|------------------|--------------|
| Fighting | Warlord's Presence, Weapon Grandmastery | Battlefield command, transcendent technique |
| Archery | Overwatch | Zone control, suppression fire |
| Arcana | Arcane Mastery | Focus efficiency, spell heightening |
| Mysticism | Divine Authority | Spell empowerment, spiritual dominance |
| Athletics | Supernatural Mobility | Inhuman movement, fall resistance |
| Fortitude | Unbreakable | Condition immunity, Fatigue resistance |
| Influence | Presence of Conquest | Mass intimidation, morale breaking |
| Insight | Foresight | Predictive defense, scene awareness |
| Perception | Perfect Awareness | Total battlefield awareness |
| Stealth | Master of Shadows | Advanced hiding, combat vanishing |
| Education | Grand Strategist | Tactical analysis, party-wide bonuses |
| Crafting | Master Artisan | Quality escalation, item repair |
| Nature | Primal Bond | Animal communication, nature manipulation |
| Survival | Apex Predator | Ultimate tracking, trap mastery |
| Streetwise | Kingpin | Network establishment, favor calling |

### 11.4 Phase 4: Prestige Talents (If Adopted — Lower Priority)

**Goal:** Introduce multi-skill talents that define archetype mastery. This phase is contingent on the design decision in §10.3.

If prestige talents are adopted, implement 10–15 across combat, magic, and skill categories (see §10.5 for proposals). Prioritize archetypes with the weakest talent support: Oracle, Bard, Tamer, Hoplite, Warlock, Rogue.

---

## 12. Implementation Roadmap

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

## 13. Forward-Looking Guidance

### 13.1 Talent Design for Ongoing System Evolution

As new game systems are introduced, talent design should follow this integration protocol:

1. **Identify mechanical hooks** — What dice rolls, resources, or decisions does the new system use?
2. **Map hooks to skills** — Which skills logically interact with these hooks?
3. **Design integration talents** — Create 2–3 talents per system that use system-specific triggers and effects.
4. **Validate against archetypes** — Ensure integration talents benefit the archetypes that thematically align.

### 13.2 Scaling Talent Power at High Ranks

| Rank | Power Budget | Frequency | Scope |
|------|-------------|-----------|-------|
| 1 | Minor option unlock | At-will or per-scene | Self |
| 2 | Moderate payoff | Per-scene or conditional | Self + adjacent |
| 3 | Encounter-shaping | Per-scene or daily | Close range |
| 4 | Encounter-defining | Daily or costly | Short range / party |
| 5 | Session-defining | Daily / session | Scene-wide / narrative |

### 13.3 Avoiding Common Pitfalls

- **Don't inflate numbers.** Rank 4–5 talents should provide new options, not just +2 instead of +1.
- **Don't obsolete lower ranks.** Rank 5 Evasion shouldn't make Rank 3 Evasion feel pointless — it should expand the ability's scope.
- **Don't create mandatory talents.** No talent at any rank should be so powerful that skipping it is a trap.
- **Don't ignore non-combat.** Every Rank 4–5 talent should have at least secondary utility, exploration, or social applications.
- **Don't break bounded power.** Rank 5 is mortal pinnacle. No auto-wins, no reality-warping, no effects that bypass all defenses.

### 13.4 Talent Maintenance Schedule

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

#### Battle Mage (Arcana) — Redesigned

> You blend arcane study with martial training, weaving magic into your combat technique.

**Rank 1.** You can spend 2 Focus as a Quick Action to add +2 to your Parry or Dodge against one attack (reactive). You can also spend 4 Focus to make an additional melee weapon attack without using an Action (once per turn).

**Rank 2.** You can use Mind + Arcana for melee weapon attacks instead of the normal attribute.

**Rank 3.** Your weapon attacks deal +3 damage (ability bonus).

**Rank 4.** After making a weapon attack, you can use a Quick Action to cast a rank 0 spell targeting a single creature.

*Changes: R3 damage is fixed at +3 instead of "+Arcana" which scaled from +1 to +5. This prevents the talent from becoming the strongest flat damage bonus in the system at high Arcana ranks. The fixed +3 is appropriate for a R3 ability.*

---

### D.2 New Signature Talents for Under-Served Archetypes

These talents fill the critical gaps identified in §7.1 where archetypes lack a signature talent.

#### Performer (Influence) — New (fills Bard gap)

> You captivate audiences and stir emotions through song, story, or spectacle.

**Rank 1.** During a rest, you can roll Spirit + Influence (TN 8) to perform for your allies. On a success, choose one ally who listened — they gain +1 boon on their next Spirit roll (short duration). You can use this ability once per rest.

**Rank 2.** As an Action in combat, you can begin a performance (requires concentration). While performing, one ally within close range who can hear you gains +1 boon on their next roll each turn. You can maintain the performance as a Quick Action on subsequent turns.

**Rank 3.** While performing in combat, your performance affects all allies within close range instead of one. Additionally, one enemy within close range who can hear you suffers +1 bane on their next roll each turn (Spirit + Fortitude vs. your Resist to negate, once per scene per creature).

*Design note: This is the Bard's signature talent. R1 unlocks rest-based support for one ally — limited scope appropriate for a first talent point. R2 provides combat support through an action-economy tradeoff (Action to start, Quick Action to maintain) for one ally. R3 expands to party-wide. Performance rolls use Spirit + Influence (for social/emotional impact), Spirit + Athletics (for acrobatic or dance performances), or Mind + Education (for formal recitals) as appropriate to the fiction.*

#### Prophetic Visions (Insight) — New (fills Oracle gap)

> You receive cryptic flashes of the future — brief moments of clarity that guide your actions.

**Rank 1.** Once per day, during a rest, you can enter a brief prophetic trance. Describe a question about the immediate situation to the GM. The GM provides a cryptic but truthful impression (one sentence) — this could be a warning, an image, or a sensation. This does not require a roll.

**Rank 2.** Once per scene, when you or an ally within short range is about to make a roll, you can declare you glimpsed this moment in a vision. The creature gains +1 boon on the roll. You must declare this before the roll is made.

**Rank 3.** When you use your R2 vision ability and the creature succeeds on the roll, you regain the use of the ability (it doesn't count against your once-per-scene limit). Additionally, once per day, you can spend 1 Resolve to grant an ally a re-roll on any roll, declaring it was "fated."

*Design note: Oracle signature. R1 provides narrative utility only (information, not mechanical bonuses) — appropriately modest for a first talent point. R2 introduces the combat-relevant boon ability. R3 adds reliability and the dramatic Resolve-spend option.*

*Design note: Oracle signature. R1 provides narrative utility only (information, not mechanical bonuses) — appropriately modest for a first talent point. R2 introduces the combat-relevant boon ability. R3 adds reliability and the dramatic Resolve-spend option.*

#### Eldritch Pact (Arcana) — New (fills Warlock gap)

> You have forged a bargain with a being of immense power — a spirit lord, elder entity, or cosmic force.

**Prerequisite:** Cannot also take Wild Overload (exclusivity group — structured pact magic conflicts with chaotic wild magic).

**Rank 1.** Choose a Patron type when you take this talent:
- **Fiend:** Once per scene, when you deal damage with an arcane spell, you regain 2 HP.
- **Fey:** Once per scene, after casting an arcane spell, you can teleport to an unoccupied space within close range.
- **Void:** Once per scene, when you hit with an arcane spell, the target suffers +1 bane on their next roll.

Your pact carries obligations — the GM determines what your patron demands in return. Breaking these terms may cause you to temporarily lose access to your pact abilities until you atone.

**Rank 2.** Your patron grants enhanced benefits:
- **Fiend:** Regain 4 HP instead of 2. The target also takes +2 fire damage.
- **Fey:** Teleport range extends to short distance. You become briefly invisible after teleporting.
- **Void:** Target suffers +1 bane on all rolls until the end of their next turn.

**Rank 3.** Once per day, you can invoke your patron's direct intervention:
- **Fiend:** All enemies within close range take 6 fire damage (Spirit + Fortitude vs. TN 10 for half).
- **Fey:** You and up to 3 allies become invisible for a short duration or until attacking.
- **Void:** One creature within medium range must roll Spirit + Fortitude vs. TN 10 or be stunned briefly.

*Design note: Warlock signature. R1 provides one clear once-per-scene benefit per patron — no spell learning, no free spells, just a thematic combat trigger. The exclusivity with Wild Overload prevents combining chaotic and structured power sources. R3 daily abilities are powerful but bounded.*

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

**Rank 1.** During a rest, you can prepare 1 herbal remedy using 1 supply item. A remedy restores 4 HP when consumed (Action). Prepared remedies last until your next rest. You can also identify poisonous plants, medicinal herbs, and natural toxins without a roll.

**Rank 2.** Your remedy output increases to 2 per rest. You can also prepare antidotes (cure one poison or disease effect) and stimulants (remove 1 Fatigue) in place of healing remedies.

**Rank 3.** Your remedy output increases to 3 per rest. Each remedy now restores 8 HP instead of 4. You can also prepare advanced remedies: fortifying tonic (+2 temporary HP for short duration) or numbing salve (resistance to one damage type of your choice for short duration).

*Design note: Apothecary signature. R1 provides one remedy per rest — modest but useful. R2 adds variety. R3 increases both output and potency. Works alongside the alchemy crafting system but focuses on quick field preparation rather than laboratory work.*

#### Summoner's Bond (Arcana) — New (fills Summoner gap)

> You specialize in conjuration magic, maintaining stronger and more reliable summoned entities.

**Rank 1.** When you cast a conjuration spell that summons a creature, the summoned creature gains +2 temporary HP. If the summoned creature makes an attack, it uses your Mind + Arcana roll (instead of its own stats) to determine if it hits.

**Rank 2.** Your summoned creatures gain +1 boon on their attacks. When a summoned creature would be destroyed or dismissed before its duration ends, you can spend 2 Focus to sustain it for 2 additional rounds.

**Rank 3.** Your summoned creatures can act on your Initiative (instead of at the end of the round). Once per scene, when you summon a creature, you can summon an additional creature of the same type (both share the same spell duration and concentration).

*Design note: Summoner signature. R1 provides a modest HP buffer and uses your casting roll for attacks, making summoned creatures more reliable. R2 adds offensive power and duration extension. R3's dual summon is the headline ability. Does not break the core concentration rule — both creatures share one concentration slot.*

---

### D.3 High-Level Talents (R4–R5)

These are organized into two categories matching the three-path framework from §9.6:
- **Signature talent extensions (R4–R5):** New ranks for the 10 signature talents identified in §9.6.
- **New high-level talents (R4–R5):** Fresh talents that only exist at R4+ and represent abilities a Master/Grandmaster would develop. These absorb the remaining TP surplus.

#### D.3.1 Signature Talent R4–R5 Extensions

These add R4 and R5 to the 10 career talents.

**Art of Fighting R4** *(already exists — learn 2 more Combat Arts or Supreme Combat Arts)*

**Art of Fighting R5.** Learn 2 more Combat Arts or Supreme Combat Arts. Once per day, when you make a Fighting roll, you can declare it an automatic Critical Success (no roll needed). This represents a moment of perfect martial execution.

**Martial Artist R4.** Your unarmed attacks deal 5 weapon damage. When you hit with an unarmed or improvised weapon attack, you can spend a Quick Action to force the target to roll Strength + Fortitude vs. TN 10 or be briefly stunned. Once per scene.

**Martial Artist R5.** Your unarmed attacks deal 6 weapon damage. Your body counts as a magical weapon (bypasses resistance to non-magical physical damage). Once per day, you can perform a stunning blow — on a successful unarmed hit, the target must roll Strength + Fortitude vs. TN 12 or be stunned for short duration.

**Art of Archery R4** *(already exists — learn 2 more Combat Arts or Supreme Combat Arts)*

**Art of Archery R5.** Learn 2 more Combat Arts or Supreme Combat Arts. Once per day, when you make an Archery roll, you can declare it an automatic Critical Success. This represents the legendary shot — an arrow that finds its mark against all odds.

**Arcane Spell Knowledge R4** *(already exists — +2 Focus, learn 2 R4 spells)*

**Arcane Spell Knowledge R5.** +2 Focus. Learn two rank 5 or lower arcane spells.

**Battle Mage R4** *(already exists — Quick Action cast R0 spell after weapon attack)*

**Battle Mage R5.** When you make a weapon attack, you can simultaneously cast a rank 0 or 1 spell at the same target as part of the same Action (no Quick Action or additional Focus required beyond the spell's normal cost). Once per day, you can cast a rank 2 spell as part of a weapon attack.

**Mystical Spell Knowledge R4** *(already exists — +2 Focus, learn 2 R4 spells)*

**Mystical Spell Knowledge R5.** +2 Focus. Learn two rank 5 or lower mystic spells.

**Pact of Devotion R4.** Each pact gains an additional R4 benefit:
- **Glory:** When you trigger the Glory benefit, all allies within close range can also benefit (deal +2 damage OR regain 2 HP on their next attack).
- **Piety:** Your Piety aura defense extends to medium range. Once per scene, when an ally within range is hit by a spell, they can use your Resist instead of their own.
- **Protection:** Your healing pool increases to 40 HP. You can cure one Wound per day (costs 15 HP from your pool).
- **Vengeance:** Vow of Enmity now affects two creatures simultaneously. Your Focus-to-damage conversion becomes +3 damage per Focus spent.

**Pact of Devotion R5.** Each pact gains a pinnacle ability:
- **Glory:** Once per day, you and all allies within short range gain +1 boon on all rolls for short duration. Each ally also deals +3 damage and regains 3 HP on each hit during this time.
- **Piety:** Once per day, you can cast any mystic spell you know without spending Focus. You can also restore one ally's spent Resolve point (once per day per ally).
- **Protection:** Once per day, you can create a protective ward around all allies within short range. For a short duration, all allies gain +3 AV (ability bonus) and resistance to one damage type you choose.
- **Vengeance:** Once per day, when your Vow target deals damage to you or an ally, you can immediately make a free attack against them with +2 boons. If this attack reduces the target to 0 HP, you regain all spent Focus.

**Hard to Kill R4 (Fortitude).** +2 HP. Once per day, when you would be reduced to 0 HP, you are reduced to 1 HP instead.

**Hard to Kill R5 (Fortitude).** +2 HP. Once per day, when you would die (suffer your third Wound), you don't. Instead, you remain at 0 HP with 2 Wounds, regain 10 HP, and can act normally on your next turn.

**Animal Companion R4 (Nature).** Your animal companion's tier limit increases to Nature + 1. Your companion can act on its own Initiative (instead of yours) and can use 2 Combat Arts per scene.

**Animal Companion R5 (Nature).** Your animal companion's tier limit increases to Nature + 2. Your companion gains +1 to all attributes (one die size increase). Once per day, your companion can take 3 Actions this turn (instead of the normal Action + Quick Action + Movement).

**Magical Sense R4 (Lore).** Range extends to long distance. When detecting magic, you can also determine the specific school (tradition/discipline) and approximate rank of magical effects. You can maintain Magical Sense without Spell Concentration.

**Magical Sense R5 (Lore).** Your magical detection is now permanent and passive — you always sense magic within long range. Once per day, you can completely suppress one magical effect within short range for a short duration (as if it were dispelled). This works on enchantments, active spells, and magical traps.

#### D.3.2 New High-Level Talents (R4–R5 Only)

These are entirely new talents that only exist at the Master/Grandmaster tier. They fill the remaining TP surplus for skills where signature extensions alone aren't enough.

**Fighting — Warlord's Presence (R4–R5)**

> Your mere presence on the battlefield changes how allies and enemies fight.

**R4.** When you hit an enemy with a melee attack, one ally within close range can immediately move one area without provoking Opportunity Attacks. You can use this once between each of your turns.

**R5.** Once per day, at the start of combat, you can issue a battlefield command. All allies who can hear you gain +1 boon on their first attack and +2 to all defenses until the end of the first round.

**Fighting — Weapon Grandmastery (R4–R5)**

> You have transcended the limitations of individual weapon styles.

**R4.** Choose a second weapon type (blade, axe, mace, polearm, brawling). You gain the benefits of that weapon type's R1 mastery talent without spending TP on it. This does not count as taking that talent for prerequisite purposes.

**R5.** Once per scene, when you attack with any melee weapon, you can apply the R2 or R3 effect of any weapon mastery talent you have (even if you're using a different weapon type). This represents transcendent weapon skill.

**Archery — Overwatch (R4–R5)**

> You control a zone with your ranged weapon, punishing any enemy who dares act within it.

**R4.** Designate an area within your weapon's range as your overwatch zone (Quick Action). The first enemy that enters, leaves, or takes an action within that area each round provokes a free ranged attack from you (+1 bane). You can maintain one overwatch zone at a time.

**R5.** Your overwatch zone expands to include the designated area and all adjacent areas. You can make up to 2 free attacks per round against enemies in your zone. These attacks do not suffer the +1 bane.

**Arcana — Arcane Mastery (R4–R5)**

> Your understanding of arcane forces transcends conventional spellcasting limitations.

**R4.** Once per scene, when you cast an arcane spell of rank 2 or lower, you can reduce its Focus cost by 2 (minimum 0). Additionally, when you blunder on an arcane spell, you can spend 2 Focus to avoid rolling on the Wild Surge table.

**R5.** Once per day, you can cast any arcane spell you know as if it were heightened by one rank (increasing both its effects and Focus cost). If this would heighten it beyond rank 5, you cannot use this ability on that spell.

**Mysticism — Divine Authority (R4–R5)**

> Your connection to the divine grants you commanding spiritual presence.

**R4.** Once per scene, when you cast a mystic spell, you can choose to empower it: increase the spell's range by one step (max extreme) or its duration by one step (max long). This does not increase its Focus cost.

**R5.** Once per day, you can invoke a moment of divine authority. All enemies within short range who can see you must roll Spirit + Fortitude vs. your Resist or become briefly frightened. Undead and spirits suffer +1 bane on this roll.

**Athletics — Supernatural Mobility (R4–R5)**

> Your physical prowess defies ordinary human limitations.

**R4.** You can jump short distances without a roll. You can climb at full speed without Athletics rolls (except on magical/impossible surfaces). You can stand from prone without spending Movement.

**R5.** Once per scene, you can take an additional Movement on your turn (stacks with other Movement bonuses). While falling, you can reduce the effective distance by one category. You can move through difficult terrain at full speed.

**Fortitude — Unbreakable (R4–R5)**

> Your endurance is legendary — you have survived what would kill lesser warriors.

**R4.** You are immune to the exhaustion effects of Fatigue (you still track Fatigue but don't suffer its mechanical penalties until you would suffer a Wound from it). Once per scene, when you suffer a condition, you can choose to delay its effect until the end of your next turn.

**R5.** Once per day, when you are affected by any condition (stunned, frightened, paralyzed, etc.), you can immediately end it without spending an Action or Quick Action. You also gain +2 HP.

**Influence — Presence of Conquest (R4–R5)**

> Your force of personality overwhelms the will of lesser creatures.

**R4.** As an Action, you can project an aura of command. All enemies within close range who can hear you must roll Spirit + Fortitude vs. your Resist or be briefly dazed. You can use this once per scene.

**R5.** Once per day, you can intensify your presence. All enemies within short range must roll Spirit + Fortitude vs. your Resist or be stunned briefly (on failure) or dazed briefly (on success but not by enough to avoid the lesser effect). Allies within range gain +1 boon on their next roll from your inspiring display.

**Insight — Foresight (R4–R5)**

> Your intuition borders on the supernatural — you anticipate events moments before they happen.

**R4.** You can never be surprised. At the start of each scene, the GM tells you one piece of information about the scene that your character would intuitively sense (danger level, hidden presence, emotional undercurrent, etc.).

**R5.** Once per day, you can declare that you "saw this coming." Choose one: (a) you and one ally can re-roll any one roll this scene, or (b) you gain +2 to all Defenses for the first round of an encounter, or (c) you automatically succeed on one Insight roll to read a creature's intentions.

**Perception — Perfect Awareness (R4–R5)**

> Nothing escapes your notice — your senses are honed to an inhuman edge.

**R4.** You gain +1 boon on all Perception rolls. You can detect hidden creatures within close range without a roll (you sense them through sound, vibration, or other cues, even if you can't see them).

**R5.** Once per day, you can declare total awareness for a short duration. During this time, you cannot be flanked, all attacks against you suffer +1 bane, and you automatically detect any hidden, invisible, or disguised creature within short range.

**Stealth — Master of Shadows (R4–R5)**

> You move through shadows as naturally as others walk through light.

**R4.** While in dim light or darkness, you can use the Hide action as a Quick Action. You can hide even while being observed, provided there is dim light or darkness within close range.

**R5.** Once per scene, you can disappear from sight entirely for one round (as if invisible) — this works even in bright light and does not require a roll. At the end of the round, you reappear in any unoccupied space within short range.

**Education — Grand Strategist (R4–R5)**

> Your tactical mind operates on a level that reshapes entire encounters.

**R4.** Once per scene, you can spend an Action to analyze the battlefield. Until the end of the scene, you and all allies gain +1 to all Defenses against creatures you have analyzed (you must have observed them for at least one round).

**R5.** Once per day, before Initiative is rolled, you can declare a strategic plan. All allies gain +1 boon on their Initiative rolls and +1 boon on all rolls during the first round of combat.

**Crafting — Master Artisan (R4–R5)**

> Your craftsmanship produces works that border on the magical in their quality.

**R4.** When crafting, you can choose to take extra time (double the normal duration) to create items at one Quality tier higher than normal (stacks with Artisan R4 if applicable, but max Q6 without magical materials). Items you repair never suffer quality loss.

**R5.** Once per day, you can jury-rig any broken item to function for a short duration. During downtime, you can attempt to modify a magic item's enchantment (Mind + Crafting vs. very hard TN, on success the enchantment is replaced with a different one of the same tier).

**Nature — Primal Bond (R4–R5)**

> Your connection to the natural world grants you an almost supernatural harmony with living things.

**R4.** You can communicate with animals using simple concepts (danger, food, direction) without a roll. You gain +1 boon on all Nature rolls. Plants and non-hostile animals within close range instinctively aid you (providing cover, clearing paths, etc.) when possible.

**R5.** Once per day, you can call upon the land itself for aid. Choose one: (a) summon a swarm of creatures to distract enemies in a close area (all enemies suffer +1 bane on rolls for short duration), (b) cause natural terrain to shift in your favor (one area becomes difficult terrain or stops being difficult terrain), or (c) restore 10 HP to all allies within close range through natural energy.

**Survival — Apex Predator (R4–R5)**

> You are the ultimate hunter — no quarry escapes you, no terrain stops you.

**R4.** You can track any creature across any terrain without a roll, provided the trail is less than a day old. Your traps deal +2 damage and their TN increases to Extreme (14). When traveling, your group cannot be surprised by natural hazards.

**R5.** Once per day, you can declare a creature your quarry. For the rest of the scene, you gain +1 boon on all rolls against the quarry, your attacks against it deal +3 damage (ability bonus), and you always know its approximate location if it's within long range.

**Streetwise — Kingpin (R4–R5)**

> Your network of contacts, favors, and threats makes you a power broker in any settlement.

**R4.** In any settlement, you can establish a safe house within one day (Mind + Streetwise vs. settlement difficulty). Safe houses provide: a hidden rest location, access to black market goods at 75% price, and one free rumor about the settlement's current events.

**R5.** Once per day, you can call in a major favor from your network. Choose one: (a) arrange passage, lodging, or supplies for your group at no cost, (b) gain detailed intelligence about a target (location, habits, defenses), or (c) arrange for a distraction or diversion at a specific location and time.

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

**Rank 1.** Choose a Patron type (Fiend, Fey, or Void). You gain the patron's R1 benefit from the Eldritch Pact talent (D.2). Additionally, when you cast a spell from the discipline most associated with your patron (Evocation for Fiend, Illusion for Fey, Necromancy for Void), reduce the Focus cost by 1 (minimum 0).

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

### D.6 New Defensive Talents (Addressing §4.5 Gaps)

These talents directly address the defensive variety gaps identified in §4.5: missing redirection, thin avoidance, and near-absent reactive defense.

#### Redirecting Presence (Insight) — New (fills Redirection gap)

> You read the flow of combat and subtly manipulate enemy targeting through positioning and empathic misdirection.

**Rank 1.** Once per scene, when an ally within close range is targeted by a melee or ranged attack, you can use a Quick Action to attempt to redirect the attack. Roll Spirit + Insight vs. the attacker's Resist. On success, the attack targets a different valid creature of your choice within the attack's range (this can be you).

**Rank 2.** You can use your Redirecting Presence ability once between each of your turns (not limited to once per scene). When you redirect an attack to yourself and the attacker misses you, the attacker suffers +1 bane on their next attack.

**Rank 3.** When you redirect an attack to yourself and the attack misses you, the attacker is briefly dazed. Additionally, when you redirect an attack to an enemy, you gain +1 boon on the roll.

*Design note: This is the first redirection talent in the system, filling a critical 0% gap. R1 is once-per-scene and requires a contested roll (Spirit + Insight vs. Resist), keeping it balanced. R2 unlocks repeated use. R3 adds counterplay.*

#### Shadow Slip (Stealth) — New (fills Avoidance gap)

> Through misdirection and clever positioning, you make yourself a difficult target to pin down.

**Rank 1.** Once per scene, when you are targeted by a melee attack, you can use a Quick Action to impose +1 bane on that attack. You must not be wearing heavy armor.

**Rank 2.** When a melee attack against you misses, you can move to any unoccupied space within close range without provoking Opportunity Attacks. You can use this once between each of your turns.

**Rank 3.** Once per scene, when you are targeted by any attack, you can use a Quick Action to attempt to vanish. Roll Agility + Stealth vs. the attacker's Perception roll. On success, you become hidden (as if you had used the Hide action) and the attack suffers +1 bane. Whether the attack hits or misses, you can move to any unoccupied space within close range.

*Design note: Stealth-based avoidance for rogues and assassins. R1 is a simple defensive tool — modest but useful. R2 adds repositioning. R3 provides a dramatic disappearing act that uses the existing Hide mechanic. Requires no heavy armor, fitting stealth-focused characters.*

#### Combat Instincts (Perception) — New (fills Reactive Defense gap)

> Your acute awareness of your surroundings gives you split-second reactions to incoming threats.

**Rank 1.** Once per scene, when you are targeted by an attack you can see coming (the attacker is not hidden), you can use a Quick Action to gain +2 to the targeted Defense against that attack.

**Rank 2.** When an ally within close range is targeted by an attack you can see, you can use a Quick Action to warn them — the ally gains +2 to their targeted Defense against that attack. You can use this once between each of your turns.

**Rank 3.** You gain +1 Quick Action per round that can only be spent on defensive Quick Actions (Evade, Protect Ally, or abilities from this talent). This does not stack with Evasion's +1 Quick Action from R2.

*Design note: Perception-based reactive defense for scouts and watchful warriors. R1 provides personal defense. R2 extends to ally protection. R3's extra defensive Quick Action is powerful but limited to defense only. The explicit non-stacking clause with Evasion R2 prevents abuse.*

---

**End of Analysis**
