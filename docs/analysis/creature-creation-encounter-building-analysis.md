# Creature Creation System & Encounter Building — Design Analysis

> **Scope:** Professional design analysis of the creature creation system for GMs, covering tier progression balance, adventurer survivability analysis, encounter building guidelines (including action economy, troop scaling, and Lord turn order), Creature Builder review, random table frameworks for attacks/abilities organized by the six roles, elite/lord ability catalogues, and a step-by-step creature building guide.

---

## 1. Executive Summary

### Key Findings

1. **Tier-to-level scaling is well-calibrated but under-documented.** Creature tiers map cleanly to adventurer levels for 1v1 encounters, but the rules lack explicit encounter-building math for parties of 3–5 adventurers. GMs must rely on intuition rather than guidelines.
2. **Creature damage output is appropriately bounded.** The system deliberately avoids D&D 5E-style HP bloat — creature survivability should come from defensive abilities, not inflated HP pools. Creature damage output must thread the needle between threatening glass-cannon Sorcerers (16 HP, AV 2) without being oppressive against heavy-armor Champions (20+ HP, AV 5–6). The current tier scaling achieves this through its linear weapon damage (+1/tier) against adventurers whose effective HP pool is much larger than their raw HP (3 Wounds, Resolve, healing, fatigue buffer).
3. **The Creature Builder has strong preset content but no rules-side catalogue.** The React builder already offers 27 preset attacks and 46 preset abilities with auto-calculated damage. However, these exist only in the app — the "Creature Abilities" section in the rules is a TODO stub. GMs building without the app have no reference.
4. **Random tables exist for creature *concepts* but not for creature *mechanics*.** The random creature generator (`06-random-creature.mdx`) generates appearance and flavor but provides no mechanical attacks or abilities. The rules need tables that output gameable effects.
5. **Elite Triggers and Lord Triggers need a catalogue.** Currently, these are bespoke per creature. A categorized ability catalogue — organized by the six roles (Offense, Defense, Healing, Control, Support, Utility) — would dramatically reduce GM prep time.
6. **Encounter building needs a Threat Budget system that accounts for action economy.** A simple point-based framework must reflect that troops amplify damage on failure, Lords act twice per round, and that total creature actions vs. adventurer actions is the primary driver of encounter lethality.

### Design Principles

1. **Stat chassis + ability menu** — The tier table provides the statistical foundation; abilities provide the tactical identity. Both must be equally accessible.
2. **Abilities over HP bloat** — Formidable creatures should be durable through defensive abilities (damage reduction, condition immunity, regeneration), not raw HP inflation. This keeps fights snappy.
3. **Random tables for speed, catalogues for precision** — Random tables enable improvisation; structured catalogues enable intentional design. Both serve different GM workflows.
4. **Six roles organize abilities** — The six roles (Offense, Defense, Healing, Control, Support, Utility) from the magic system provide the organizing principle for ability catalogues, with passive/active/reactive as a secondary axis within each role.
5. **Bounded complexity** — A creature should be buildable in under 5 minutes using the framework. Pre-built ability packages keep prep fast without sacrificing variety.

---

## 2. Tier Progression & Survivability Analysis

### 2.1 Creature Tier vs. Adventurer Level — Statistical Comparison

The following table compares creature statistics at each tier against a typical adventurer of the corresponding level. The system assumes a 1:1 mapping between adventurer level and creature tier. Adventurer values assume a primary combat skill (Fighting or Archery) and standard progression.

| Adventurer Level / Creature Tier | Creature HP | Adventurer HP | Creature Defense | Adventurer Defense | Creature Max Die | Adventurer Max Die | Creature Skill | Adventurer Skill |
|---|---|---|---|---|---|---|---|---|
| 1 | 10 | 18–20 | 7 | 7–8 | d6 | d6–d8 | 1 | 1 |
| 2 | 20 | 20–22 | 8 | 8–9 | d8 | d8 | 1–2 | 1–2 |
| 3 | 30 | 22–24 | 9 | 9–10 | d8 | d8 | 2 | 2 |
| 4 | 40 | 24–26 | 10 | 10–11 | d10 | d10 | 2–3 | 2–3 |
| 5 | 50 | 26–30 | 11 | 11–12 | d10 | d10 | 3 | 3 |
| 6 | 60 | 28–32 | 12 | 12–13 | d12 | d10–d12 | 3–4 | 3–4 |
| 7 | 70 | 30–34 | 13 | 13–14 | d12 | d12 | 4 | 4 |
| 8 | 80 | 32–36 | 14 | 14–15 | d12+1 | d12 | 4–5 | 4–5 |
| 9 | 90 | 34–38 | 15 | 15 | d12+1 | d12 | 5 | 5 |
| 10 | 100 | 36–42 | 16 | 15–16 | d12+2 | d12 | 5 | 5 |

### 2.2 Adventurer Survivability Scaling

The system deliberately avoids HP bloat. Adventurer survivability comes from multiple layered systems — not just raw HP. The following analysis tracks **Effective Hit Points (EHP)** — the total damage an adventurer can absorb before dying — for both a defensive "high-end" build and an offensive "low-end" build.

#### Survivability Formulas

- **Base HP** = 12 + Strength die value (d4=16, d6=18, d8=20, d10=22, d12=24). Hard cap: 50.
- **Level HP** = +2 per level after Level 1.
- **Fatigue buffer** = 6 points × 2 HP each = 12 HP of emergency capacity (reduces max HP).
- **Wounds** = 3 total. Each wound at 0 HP resets the HP pool (adventurer regains HP after rest; in combat, subsequent wounds are taken at 0 HP).
- **AV** = reduces each incoming hit. Over many hits, this multiplies effective HP.
- **Resolve** = re-rolls (3 max). Not directly HP but prevents hits or improves saves.

#### High-End Survivability: "The Champion" (Tank Build)

Assumes: STR d8→d10→d12 over levels, Fighting primary, heavy armor + shield investment.

| Level | Raw HP | AV (Armor + Shield + Helm) | Defense (Parry / Dodge) | Effective HP per Wound | Notes |
|---|---|---|---|---|---|
| 1 | 20 | 4 (scale mail) + 1 (shield) = 5 | 8 / 6 | ~35 (20 HP, 5 AV absorbs ~3 per hit) | Low level, basic gear |
| 3 | 26 | 5 (breastplate) + 2 (shield) + 1 (helm) = 8 | 10 / 8 | ~65 (26 HP, AV 8 negates most weak hits) | Shield + heavy armor online |
| 5 | 30 | 5 + 2 + 1 = 8, +magic items | 12 / 10 | ~80+ (AV blocks most single-target damage) | Talents add mitigation |
| 7 | 34 | 6 (plate) + 3 (Q3 shield) + 1 = 10 | 14 / 12 | ~110+ (most attacks deal 1 damage) | Nearly immune to weak hits |
| 10 | 42 | 6 + 3 + 1 + magic = 12+ | 16 / 14 | ~150+ (only strong/critical hits threaten) | Peak mortal defense |

#### Low-End Survivability: "The Sorcerer" (Glass Cannon Build)

Assumes: STR d4, MND primary, light armor only, no Fighting investment.

| Level | Raw HP | AV (Armor) | Defense (Parry / Dodge / Resist) | Effective HP per Wound | Notes |
|---|---|---|---|---|---|
| 1 | 16 | 2 (leather) | 7 / 8 / 9 | ~20 (AV 2 barely helps) | Extremely fragile |
| 3 | 20 | 2–3 (leather/banded) | 8 / 9 / 10 | ~28 | One strong creature hit is a wound |
| 5 | 24 | 3 + wearables | 9 / 10 / 11 | ~35 | Relies on Dodge/Resist, not Parry |
| 7 | 28 | 3–4 + magic items | 10 / 11 / 12 | ~42 | Mana Shield talent provides emergency AV |
| 10 | 34 | 4 + magic items | 11 / 12 / 14 | ~55 | Still fragile in melee, strong vs. spells |

#### Creature Damage vs. Adventurer Survivability

The critical question: **Does creature damage output scale appropriately against both defensive and offensive adventurers?**

| Tier | Creature Weak Hit | Creature Strong Hit | Creature Critical Hit | Champion EHP (per Wound) | Sorcerer EHP (per Wound) | Hits to Wound Champion | Hits to Wound Sorcerer |
|---|---|---|---|---|---|---|---|
| 1 | 6 | 9 | 12 | ~35 | ~20 | 4–6 weak hits | 3–4 weak hits |
| 3 | 9 | 14 | 19 | ~65 | ~28 | 7+ weak hits | 3 weak hits |
| 5 | 12 | 19 | 26 | ~80 | ~35 | 7+ weak hits | 3 weak hits |
| 7 | 15 | 24 | 33 | ~110 | ~42 | 7+ weak hits | 3 weak hits |
| 10 | 20 | 32 | 44 | ~150 | ~55 | 7+ weak hits | 3 weak hits |

**Key findings:**

- **Glass-cannon adventurers consistently fall in ~3 weak hits.** Creature damage keeps pace with Sorcerer-type HP growth, ensuring these builds feel dangerous without being impossible. This is correct — offensive builds *should* fear sustained combat.
- **Defensive adventurers scale away from creature damage.** By mid-tiers (5+), Champions can shrug off weak hits entirely (AV absorbs most of the damage). This is also correct — it rewards investment in heavy armor and creates a meaningful difference from glass cannons.
- **Strong and critical hits are the real threat.** Against all builds, creature strong/critical hits deal dangerous damage. This means fights hinge on success levels, not raw volume — keeping combat snappy and decisive.
- **Creature damage scaling is intentionally linear.** The +1 weapon damage per tier avoids the HP-bloat treadmill. Formidable creatures should enhance their threat through **defensive abilities** (regeneration, damage reduction, condition immunities, phase shifts) rather than through ever-increasing HP pools. This keeps every hit meaningful and every fight fast.

### 2.3 Scaling Assessment

**What works well:**

- **Defense parity.** Creature base defense (6 + tier) closely tracks adventurer defenses (Parry 7 + Fighting rank + level bonus; Dodge 5 + ½ Agility + level bonus). At every tier, creatures and adventurers trade hits at comparable rates.
- **Attribute die parity.** Creature max attributes and adventurer max attributes follow nearly identical progressions (d6 → d8 → d10 → d12), ensuring roll distributions stay matched.
- **Skill rank parity.** Creature primary skill ranks (0 → 1 → 2 → 3 → 4 → 5) closely mirror adventurer skill rank progression through XP investment.
- **HP asymmetry is intentional and correct.** Creatures have higher single-pool HP (60–100 at high tiers) vs. adventurers (28–42 raw HP). But adventurers have 3 Wounds, Resolve, healing, and fatigue buffer, making their total EHP competitive with creature HP — particularly for defensive builds.
- **Linear creature damage avoids HP bloat.** This is a deliberate design choice. Creature survivability comes from abilities (regeneration, resistances, condition recovery for Elite/Lord) not from inflated HP. This keeps fights snappy — hits always matter.

**Areas of concern:**

- **Tier 0 creatures are too weak for Level 1 parties.** A Tier 0 creature (5 HP, Defense 6, d6 attributes) is trivially defeated by any Level 1 adventurer. The naming and guidance should make clear that Tier 0 is for non-combat creatures or swarm fodder only.
- **Tiers 8–10 defense compression.** At the highest tiers, creature defense (14–16) and ability difficulty (TN 14–16) approach adventurer maximum defense (16 cap). This compresses hit rates. This is acceptable for climactic encounters but should be documented as intentional.
- **Defensive builds may trivialize sustained creature damage at mid-tiers.** A Champion with AV 8+ at Tier 5 reduces most creature weak hits to 1–4 damage. This is intentional (rewarding build investment), but GMs should be guided to use abilities (crush property, condition effects, ability-based damage that ignores AV) to threaten tanky adventurers.

### 2.4 Recommendations

1. **Add a "Tier vs. Party Level" sidebar** to the creature rules clarifying that Tier X = challenge for 1 adventurer of Level X, not a full party.
2. **Document the intentional design choice** — creatures scale through abilities, not HP bloat. Defensive adventurers require ability-based threats (conditions, AV-ignoring damage, forced saves), not higher raw damage.
3. **Flag Tier 0 explicitly** as "non-threatening / environmental creatures" in both the rules and the builder.
4. **Add guidance for threatening tanky adventurers** — use crush property (ignores half AV), conditions that bypass armor, forced saves against Dodge (their weak defense), and multi-target attacks.

---

## 3. Encounter Building Framework

### 3.1 Action Economy as Primary Balance Driver

The most important factor in encounter balance is **action economy** — how many actions the creature side gets vs. the adventurer side. In Nexus RPG:

- Each **adventurer** gets 1 Action + 1 Quick Action + Movement per turn.
- Each **Basic creature** gets 1 Action + Movement (rarely has Quick Actions).
- Each **Elite creature** gets 1 Action + 1 Quick Action + Movement, starts with 1 Resolve.
- Each **Lord creature** gets **2 full turns** per round (at full Initiative and half Initiative), 1 Action + Quick Actions on each, starts with 3 Resolve.
- **Troops** condense multiple Basic creatures into 1 action, but amplify damage output (see §3.4).

**Critical insight:** A party of 4 adventurers gets 4 Actions per round. Matching this with 4 Basic creatures creates a balanced exchange. But 8 Basic creatures (as 2 troops) get only 2 actions — yet deal devastating damage because of the troop multiplier. And 1 Lord creature gets 2 actions — but each with far higher damage and abilities. Raw creature count is misleading; **effective actions × action quality** determines balance.

### 3.2 Threat Budget System

The following system uses **Threat Points (TP)** as a universal currency for encounter difficulty, calibrated around action economy.

#### Threat Point Values

| Creature Category | Base TP | Action Economy Rationale |
|---|---|---|
| **Basic** (individual) | 1 TP | 1 action, low damage, dies fast |
| **Basic** (in troop of 4) | 3 TP total | 1 action but troop bonus multiplies damage; deals damage even on failure |
| **Elite** | 4 TP | 1 action + Quick Action, Resolve, trigger ability, higher stats |
| **Lord** | 8 TP | 2 full turns per round, 3 Resolve, multiple triggers, condition recovery |

> **Note on troops:** A troop of 4 Basics costs 4 individual TP but fights as a single unit worth ~3 TP in threat. The "discount" reflects the troop being vulnerable to AoE damage and morale checks, but the troop bonus (+2 for 4 members) makes them deal damage even on a failure roll — this is the primary threat amplifier that prevents the "10 goblins can't hit the level 10 fighter" problem.

#### Encounter Difficulty Budgets

| Difficulty | TP Budget | Description |
|---|---|---|
| **Easy** | Party Size × 1 | Quick skirmish, low risk. Consumes few resources. |
| **Moderate** | Party Size × 2 | Standard encounter. Tests the party without serious danger. |
| **Hard** | Party Size × 3 | Significant challenge. Likely costs Resolve, healing, or Wounds. |
| **Deadly** | Party Size × 4+ | Life-threatening. Retreat is a valid option. Boss fights. |

> **Example (party of 4, Level 5, Hard = 12 TP):**
> - 1 Elite (4 TP) + 2 troops of 4 Basics (6 TP) = 10 TP — a leader with organized warband. Under budget allows some breathing room.
> - 1 Lord (8 TP) + 4 Basic individuals (4 TP) = 12 TP — a boss with expendable minions.
> - 3 Elites (12 TP) = 12 TP — three dangerous sub-bosses (very action-heavy, very hard).
> - 4 troops of 4 Basics (12 TP) = 12 TP — a 16-creature horde in 4 troop blocks. Devastating if concentrated, vulnerable to AoE.

#### Tier Adjustment: Exponential, Not Linear

Each tier of difference between creature and party represents a significant power gap — **higher defenses mean fewer hits land, and higher damage means each hit is more dangerous.** The TP adjustment must be exponential, not ±1.

| Tier Difference | TP Multiplier | Rationale |
|---|---|---|
| −3 or more below | ×0 (trivial) | Can't meaningfully threaten the party; useful only as narrative flavor. |
| −2 below party level | ×0.25 (round down) | Hits rarely land; damage is negligible even when they do. Troops may still be relevant. |
| −1 below party level | ×0.5 (round down) | Reduced hit chance, reduced damage. Relevant in large numbers or troops. |
| Equal to party level | ×1 (base) | Baseline balance. |
| +1 above party level | ×1.5 (round up) | Noticeably harder to hit, deals more damage. A single creature punches above its weight. |
| +2 above party level | ×2 | A serious threat. One creature above tier is worth two at-tier. |
| +3 or more above | ×3+ | Boss encounter territory. Should be paired with appropriate party level and abilities. |

> **Example:** A Tier 7 Elite (base 4 TP) against a Level 5 party = 4 × 2 = 8 TP. That single Elite is equivalent to a Deadly-tier threat for a 2-person party, or a Hard encounter for a 3-person party.

### 3.3 Lord Turn Order Investigation

**Current rule:** Lords get a second round at half their original Initiative.

**Proposed variant:** Lords take a turn after EVERY adventurer (i.e., the Lord acts, then one adventurer acts, then the Lord acts again, etc.).

#### Analysis

| Factor | Current (½ Init) | Proposed (After Every Adventurer) |
|---|---|---|
| **Actions per round** | 2 | Equal to number of adventurers (3–5 in typical party) |
| **Burst potential** | Back-to-back turns possible | Actions spread evenly throughout round |
| **Counterplay** | Adventurers can coordinate between Lord's two turns | No safe window to coordinate |
| **Feel** | Two distinct "phases" of the Lord's turn | Relentless, oppressive presence |
| **Balance** | Manageable for 3–5 adventurer parties | Potentially overwhelming — Lord gets 4+ actions vs. party's 4 |

**Assessment:** The "turn after every adventurer" variant is **too powerful** for standard play. A Lord already has 3 Resolve, condition recovery, and powerful triggers. Giving it 4–5 actions per round would make it nearly unkillable by a same-tier party without highly optimized builds. The current ½ Initiative second turn is the correct balance — it gives the Lord two distinct action windows that the party can strategize around, creating meaningful tactical decisions.

**Recommendation:** Keep the current rule. If a Lord feels too easy, the solution is stronger abilities and higher tier, not more actions. A Lord should feel like "two dangerous creatures in one body," not "an unstoppable force that acts every other turn."

### 3.4 Troop Efficiency: Statistical Validation

The troop rules are the system's answer to the classic D&D problem of low-level creatures becoming irrelevant against high-level characters. Let's validate the math.

#### Troop Damage Formula (from the rules)

A troop rolls once: Attribute die + 1d6 + Troop Bonus (replacing skill rank).

| SL | Damage Formula |
|---|---|
| Blunder | 0 |
| Failure | (Base + Weapon Damage) × Troop Bonus |
| Weak | (Base + Weapon Damage) × (1 + Troop Bonus) |
| Strong | (Base + Weapon Damage) × (2 + Troop Bonus) |
| Critical | (Base + Weapon Damage) × (3 + Troop Bonus) |

#### Example: Troop of 4 Tier 1 Goblins (d6 Agility, weapon damage 3, base 3) vs. Level 5 Fighter (Parry 12, AV 8)

- **Troop Bonus:** +2 (half of 4, replaces skill rank 1)
- **Attack roll:** d6 + 1d6 + 2. Average = 3.5 + 3.5 + 2 = 9. Must beat Parry 12.
- **Hit rate:** Roughly 20–25% for weak success, ~5% for strong, ~1% for critical. ~40% failure, ~30% blunder.
- **On Failure (the key difference):** Damage = (3 + 3) × 2 = **12 damage** → reduced by AV 8 = **4 damage.**
- **On Weak:** (3 + 3) × 3 = **18 damage** → 18 - 8 = **10 damage.**
- **On Strong:** (3 + 3) × 4 = **24 damage** → 24 - 8 = **16 damage.**

**Without troop rules:** 4 individual Tier 1 goblins rolling separately against Parry 12 would need to roll 12+ on d6 + 1d6 + 1 (average 8). They'd hit roughly 10% of the time and deal 5–7 damage per hit, minus AV 8 = mostly 0–1 damage. They're functionally irrelevant.

**With troop rules:** The troop deals **4+ damage even on failure** and **10+ on a weak success.** Against the Level 5 Fighter's 30 HP, this is meaningful — a troop of goblins can contribute to an encounter even when dramatically out-leveled.

#### Does this work at extreme level gaps?

**Troop of 6 Tier 1 Goblins vs. Level 10 Fighter (Parry 16, AV 12):**

- **Troop Bonus:** +3
- **Attack roll:** d6 + 1d6 + 3. Average = 10. Must beat Parry 16.
- **On Failure:** (3 + 3) × 3 = 18 → 18 - 12 = **6 damage.**
- **On Weak (rare):** (3 + 3) × 4 = 24 → 24 - 12 = **12 damage.**

Even against a Level 10 tank, the troop still deals 6 damage on failure — chipping away over multiple rounds. This validates the troop system as working correctly: low-tier creatures remain relevant threats in sufficient numbers without requiring individual rolls for each creature.

**Conclusion:** The troop system successfully solves the "10 goblins vs. the level 10 fighter" problem. Troops deal meaningful damage even on failure, scale with group size, and make large encounters fast to run (1 roll instead of 10). The troop bonus replacing skill rank is the key mechanic that keeps troops competitive.

### 3.5 Encounter Composition Guidelines

Beyond raw numbers, *composition* determines encounter feel:

| Pattern | TP Budget Guide | Description |
|---|---|---|
| **Horde** | Many troops (3 TP each) | Overwhelming numbers, swarm tactics. Vulnerable to AoE. |
| **Leader + Minions** | 1 Elite (4 TP) + individual or troop Basics | Classic "boss with bodyguards." Leader uses abilities while minions absorb attacks. |
| **Elite Pair** | 2 Elites (8 TP) with different archetypes | Tactical variety, flanking pressure. Very action-heavy. |
| **Solo Boss** | 1 Lord (8 TP) alone | Climactic showdown. Lord's double turn and 3 Resolve compensate for being outnumbered. |
| **Boss + Entourage** | 1 Lord (8 TP) + troops/Basics | The classic final encounter. Lord provides abilities; minions provide action economy. |
| **Gauntlet** | Multiple waves of Basics/troops | Attrition, resource drain. Budget applies per wave; total may exceed normal budget. |
| **Mixed Arms** | Ranged + melee + controller archetypes | Tactical complexity, positional play. Most interesting encounters. |

### 3.6 Encounter Modifiers

The following factors should adjust the GM's assessment of encounter difficulty beyond raw TP:

| Factor | Effect on Difficulty |
|---|---|
| **Terrain advantage (creatures)** | +1 difficulty step |
| **Surprise round (creatures)** | +1 difficulty step |
| **Adventurers are fatigued/wounded** | +1 difficulty step |
| **Adventurers have terrain advantage** | −1 difficulty step |
| **Adventurers have surprise** | −1 difficulty step |
| **Environmental hazards (neutral)** | +1 difficulty step |
| **Creature actions > party actions** | Significant danger increase — the side with more effective actions usually wins |

---

## 4. Creature Builder Review

### 4.1 Current Strengths

The React Creature Builder provides a robust foundation with more pre-built content than initially assessed:

- **Tier-based auto-calculation** — HP, AV, defenses, attributes, skill ranks, weapon damage, and ability TN are all calculated from the tier table with archetype and size modifiers.
- **10 archetypes** with distinct stat profiles (Standard, Ambusher, Artillery, Bruiser, Defender, Horde, Controller, Ranged, Skirmisher, Support) covering all major tactical roles.
- **7 size categories** (Tiny to Colossal) with appropriate defense/AV trade-offs.
- **27 preset attacks** — including Bite (3 variants), Claw (2), Slam (2), Beak, Talons, Horn, Antlers, Tail Swipe, Tusks, Pincer, Mandibles, Constrict, Fist, Kick, Tongue, Death Roll, Web, Rock Throw, Screech, Lightning Strike, Fire Touch, Flame Bolt, Tentacles, and Whelm. Each includes auto-calculated damage, weapon properties, and secondary effects.
- **46 preset abilities** — organized into Movement (10), Aquatic (4), Senses (8), Combat (7), Defensive (6), Special Forms (4), and Utility (7). These cover flying, climbing, keen senses, pack tactics, multiattack, pounce, regeneration, and more.
- **Category system** (Basic/Elite/Lord) correctly formats HP as single/2×/3× life pools.
- **Validation system** that warns when custom stats deviate more than ±2 tiers from expected ranges.

### 4.2 Current Gaps

1. **Attack types and effects are bundled.** The builder's 27 presets combine the attack *form* (Bite, Claw) with a fixed secondary *effect* (grapple, bleed). GMs cannot mix and match — e.g., choosing a "Bite" form with a "Poison" effect. The rules should present attack types and attack effects as separate choices.
2. **No Elite Trigger / Lord Trigger templates.** These mechanically critical abilities are entirely freeform, despite following predictable patterns across existing creatures.
3. **No Quick Action templates.** Elite and Lord creatures require Quick Actions, but the builder doesn't guide GMs toward appropriate options.
4. **No rules-side reference.** All 27 attacks and 46 abilities live only in the React app code. The "Creature Abilities" section in the rules document is a TODO stub. GMs building without the app have no reference.
5. **Abilities lack role-based organization.** The builder organizes abilities by locomotion/sense type, not by combat role (Offense, Defense, Control, etc.). This makes it hard for GMs to find "I need a defensive ability for my Bruiser."

### 4.3 Recommendations

1. **Separate attack type from attack effect** in both the builder and the rules. Present two independent choices: (a) attack form (Bite, Claw, Fist, Spell, etc.) with base properties, and (b) attack effect (Knockdown, Poison, Bleed, etc.) as a secondary modifier.
2. **Add Elite/Lord trigger templates** as a dedicated section when Elite or Lord category is selected.
3. **Add ability catalogues organized by the six roles** (Offense, Defense, Healing, Control, Support, Utility) to the rules document and the builder.
4. **Port the existing 27 attacks and 46 abilities to the rules** as reference tables, filling the TODO stub.

---

## 5. Random Tables Framework

### 5.1 Design Philosophy

Random tables for creature mechanics serve two distinct purposes, which should be kept separate:

| Table Type | Purpose | Where It Belongs | User |
|---|---|---|---|
| **Concept Tables** | Generate creature appearance, theme, flavor | Random Tables (GM Tools) | Improvisation, session prep |
| **Mechanical Tables** | Generate attacks, abilities, triggers | Core Rules + Builder | Creature stat block completion |

The existing concept tables (`06-random-creature.mdx`) are excellent for inspiration. What the system lacks is the *mechanical* layer — tables that output gameable effects a GM can drop directly into a stat block.

### 5.2 Attack Tables: Types and Effects (Separate)

Attack creation uses two independent rolls: (1) choose or roll an **Attack Type** for the physical form and base properties, then (2) choose or roll an **Attack Effect** for the secondary condition. Spells use only the Attack Type table and never add attack effects — spell effects come from the spell itself.

#### Table 1a: Melee Attack Types (d12)

| d12 | Attack Type | Properties | Notes |
|---|---|---|---|
| 1 | **Bite** | crush | Standard predator attack. |
| 2 | **Bite** | pierce | Piercing variant — snakes, lizards. |
| 3 | **Claw** | slash, light | Fast slashing — cats, raptors. -1 weapon damage for light. |
| 4 | **Claw** | slash | Heavy slashing — bears, demons. |
| 5 | **Slam/Fist** | crush | Blunt force — golems, giants. |
| 6 | **Beak** | agile, pierce | Birds, insectoids. |
| 7 | **Horn/Antlers** | pierce | Charging beasts, minotaurs. |
| 8 | **Tail Swipe** | crush, reach | Large reptiles, dragons. |
| 9 | **Tusks** | crush | Boars, elephants, orcs. |
| 10 | **Pincer/Mandibles** | crush | Insects, crustaceans. |
| 11 | **Constrict** | crush | Serpents, tentacle creatures. Grapple + restrain on hit. |
| 12 | **Tentacles** | pierce | Aberrations, cephalopods. |

#### Table 1b: Ranged Attack Types (d8)

| d8 | Attack Type | Properties | Notes |
|---|---|---|---|
| 1 | **Rock Throw** | crush, thrown (short/medium) | Giants, apes, constructs. |
| 2 | **Web** | thrown (close/short) | Spiders, silk-producing creatures. No damage — restrains target. |
| 3 | **Screech/Sonic Blast** | blast, cone | Sound-based. -1 weapon damage for AoE. |
| 4 | **Flame Bolt** | thrown (short/medium) | Fire elementals, demons. Fire damage type. |
| 5 | **Lightning Strike** | thrown (medium) | Storm creatures, spirits. Lightning damage type. |
| 6 | **Acid Spit** | thrown (short) | Oozes, insects. Acid damage type. |
| 7 | **Spine/Quill Volley** | thrown (short/medium), light | Porcupine-type creatures. |
| 8 | **Tongue** | agile, reach | Amphibians. No damage — grapple and pull target. |

#### Table 1c: Weapon Attack Types (d8)

For humanoid creatures wielding manufactured weapons.

| d8 | Attack Type | Properties | Notes |
|---|---|---|---|
| 1 | **Sword** | pierce | Versatile (+1) if two-handed. Standard soldiers. |
| 2 | **Axe** | slash | Brutal warriors. Light variant for dual wielding. |
| 3 | **Mace/Club** | crush | Temple guardians, brutes. |
| 4 | **Spear** | pierce, reach, two-handed | Formation fighters, guards. |
| 5 | **Dagger** | agile, light, pierce | Rogues, assassins. Thrown (short) variant. |
| 6 | **Bow** | ammo, range (medium), two-handed | Scouts, archers. |
| 7 | **Sling/Thrown** | ammo, crush, thrown (medium) | Skirmishers, goblins. |
| 8 | **Greatsword/Greataxe** | heavy, slash/pierce, two-handed | Elite warriors. +1 weapon damage. |

#### Guidance: Single vs. Multi-Attack

- **Single attack:** Standard for Basic creatures. Use full weapon damage.
- **Dual wielding:** Two attacks with the *light* property. Each deals -1 weapon damage (light penalty).
- **Multi-attack (Elite/Lord):** 2–3 attacks. Use full weapon damage for the primary; secondary attacks can use different types for variety.
- **AoE attacks:** Deal half weapon damage to all targets in range. Use cone, line, or blast properties.

#### Table 2: Attack Effects (d12)

Roll on this table to add a secondary effect to any non-spell attack. Each effect triggers on a specific success level.

| d12 | Effect | Trigger | Description |
|---|---|---|---|
| 1 | **Knockdown** | Strong or critical hit | Target falls prone. |
| 2 | **Grapple** | On hit | Creature attempts to grapple the target (vs. equal or smaller size). |
| 3 | **Push** | Strong or critical hit | Target is pushed close distance. |
| 4 | **Bleed** | Strong or critical hit | Target suffers bleeding (weapon damage). |
| 5 | **Poison** | Strong or critical hit | Target is poisoned for a short duration. |
| 6 | **Burn** | Strong or critical hit | Target suffers burning (weapon damage). |
| 7 | **Stun** | Strong or critical hit | Target is dazed until end of their next turn. |
| 8 | **Disarm** | Strong or critical hit | Target drops one held item. |
| 9 | **Slow** | Strong or critical hit | Target is slowed until end of their next turn. |
| 10 | **Fear** | Strong or critical hit | Target is frightened until end of their next turn. |
| 11 | **Drain** | On hit | Creature regains HP equal to half damage dealt. |
| 12 | **Chain** | Strong or critical hit | One additional target in close range takes half damage. |

### 5.3 Ability Tables by Role

Abilities are organized by the six roles from the magic system: **Offense, Defense, Healing, Control, Support, and Utility.** Within each role, abilities are tagged as Passive, Active (costs Action), or Reactive (Quick Action, triggered).

#### Offense Abilities (d8)

| d8 | Ability | Type | Effect |
|---|---|---|---|
| 1 | **Charge** | Passive | If this creature spends Movement towards its target during the turn it attacks, it gains +1 boon on the attack and deals +2 damage. |
| 2 | **Ambush Predator** | Passive | This creature deals +(weapon damage) extra damage against surprised targets. |
| 3 | **Aura of Pain** | Passive | At the start of this creature's turn, each opponent within melee range takes (tier) damage of an appropriate type. |
| 4 | **Frenzy** | Active (1/day) | For a short duration, this creature gains +1 boon on attacks and +1 additional attack per turn. |
| 5 | **Breath Weapon** | Active (recharge d6) | All creatures in a cone/line to short range must roll vs. Dodge. On a hit, deal damage as a normal attack of an appropriate type. On strong/critical, targets also suffer a condition. |
| 6 | **Ground Slam** | Active | All creatures in melee range must roll Agility + Athletics vs. ability TN or take (weapon damage × 2) damage and fall prone. |
| 7 | **Reactive Strike** | Reactive | When an opponent in melee range attacks an ally, this creature can make a melee attack against that opponent. |
| 8 | **Tail/Wing Sweep** | Reactive (proactive) | All opponents in melee range must roll Agility + Athletics vs. ability TN or take (weapon damage) damage and fall prone. |

#### Defense Abilities (d8)

| d8 | Ability | Type | Effect |
|---|---|---|---|
| 1 | **Relentless** | Passive | The first time this creature would suffer an Injury, it can ignore it. |
| 2 | **Regeneration** | Passive | This creature regains (tier × 2) HP at the start of its turn if it has at least 1 HP. |
| 3 | **Magic Resistance** | Passive | This creature gains +1 boon on saves against spells and magical effects. |
| 4 | **Incorporeal** | Passive | This creature can move through other creatures and objects as difficult terrain. Takes (tier) damage if ending turn inside an object. Resistant to physical damage from non-magical weapons. |
| 5 | **Hard Shell** | Reactive | As a Quick Action, this creature retracts into its shell, doubling AV but preventing Actions and Movement until re-emerging. |
| 6 | **Shield Wall** | Reactive | When targeted by an attack, gain +2 to the targeted defense until end of turn. |
| 7 | **Dodge Roll** | Reactive | When targeted by an attack, move close without provoking attacks. |
| 8 | **Absorb Magic** | Reactive | When targeted by a spell, roll Spirit + Fortitude vs. the caster's result. On success, negate the spell and regain (tier × 2) HP. |

#### Healing Abilities (d4)

| d4 | Ability | Type | Effect |
|---|---|---|---|
| 1 | **Life Drain Aura** | Passive | When this creature deals damage with a melee attack, it regains HP equal to half the damage dealt. |
| 2 | **Rally Cry** | Active (1/day) | All allied creatures within short range regain (tier × 3) HP. |
| 3 | **Consume Ally** | Active | This creature consumes one adjacent allied Basic creature to regain HP equal to that creature's remaining HP. |
| 4 | **Rejuvenating Burst** | Reactive | When this creature drops below half HP, it immediately regains (tier × 2) HP. 1/day. |

#### Control Abilities (d8)

| d8 | Ability | Type | Effect |
|---|---|---|---|
| 1 | **Frightful Presence** | Active | Each opponent within short range must roll Spirit + Fortitude vs. ability TN or become frightened for a short duration. |
| 2 | **Web/Entangle** | Active | One target in short range is restrained until they escape (Strength + Athletics vs. ability TN). |
| 3 | **Charm/Command** | Active | One target in short range must roll Spirit + Fortitude vs. ability TN or become charmed for a short duration. |
| 4 | **Terrifying Roar** | Active | All opponents within short range must roll Spirit + Fortitude vs. ability TN or be frightened and pushed close. |
| 5 | **Dreadful Gaze** | Active | One target in short range must roll Spirit + Fortitude vs. ability TN or be paralyzed until end of their next turn. |
| 6 | **Toxic Cloud** | Active | Creates a poison cloud in close range for a short duration. Creatures entering or starting their turn in the cloud take (weapon damage) poison damage. |
| 7 | **Intimidating Growl** | Reactive (proactive) | One opponent in short range suffers +1 bane on their next attack. |
| 8 | **Burrowing Ambush** | Active | This creature burrows underground and reappears in any unoccupied space within short range. The first attack after resurfacing gains +1 boon. |

#### Support Abilities (d6)

| d6 | Ability | Type | Effect |
|---|---|---|---|
| 1 | **Pack Tactics** | Passive | While in a troop or in melee range of allies, this creature's attacks gain +1 boon. |
| 2 | **Formation Fighting** | Passive | While adjacent to an ally, this creature gains +1 Parry. |
| 3 | **Commanding Shout** | Reactive (proactive) | One allied creature within short range can immediately move or make an attack. |
| 4 | **Summon Allies** | Active (1/day) | Summon 1d4 Basic creatures of equal or lower tier. They arrive at the start of the next round. |
| 5 | **Innate Spellcasting** | Passive | This creature can cast 2–3 spells (matching its tier's skill rank) once per scene each. Choose thematically appropriate spells from the arcane or mystic spell lists. |
| 6 | **Quick Cast** | Reactive (proactive) | Cast a rank 0 or rank 1 spell as a Quick Action. |

#### Utility Abilities (d6)

| d6 | Ability | Type | Effect |
|---|---|---|---|
| 1 | **Keen Senses** | Passive | +1 boon on Perception rolls (specify sense: scent, hearing, or sight). |
| 2 | **Flying** | Passive | This creature can fly with 2 Movement per turn. If on the ground, it can only spend 1 Movement during its turn in total. |
| 3 | **Spider Climb** | Passive | This creature can climb difficult surfaces, including ceilings, without treating it as difficult terrain. |
| 4 | **Sunlight/Element Sensitivity** | Passive (weakness) | This creature suffers +1 bane on attacks while exposed to a specific element or condition. |
| 5 | **Detect** | Reactive (proactive) | Make a Perception check to locate hidden creatures. |
| 6 | **Reposition** | Reactive (proactive) | Move close without provoking attacks. |

---

## 6. Elite & Lord Ability Catalogue

### 6.1 Elite Trigger Abilities (d10)

Every Elite creature must have one Elite Trigger that activates when its first life pool is depleted. Roll or choose from the following:

| d10 | Trigger Name | Role | Effect |
|---|---|---|---|
| 1 | **Berserk Fury** | Offense | This creature's attacks deal +(weapon damage) extra damage for the rest of the scene. |
| 2 | **Desperate Roar** | Control | All opponents within short range must roll Spirit + Fortitude vs. ability TN or become frightened until end of their next turn. |
| 3 | **Aura Eruption** | Offense | This creature gains a damage aura. All opponents ending their turn in melee range take (weapon damage) damage of an appropriate type for the rest of the scene. |
| 4 | **Summon Reinforcements** | Support | 1d4+1 Basic creatures of 2 tiers lower appear in short range. |
| 5 | **Power Surge** | Offense | All of this creature's attributes increase by one die size for the rest of the scene. |
| 6 | **Terrain Hazard** | Control | The creature's area and all adjacent areas gain a hazard (burning, freezing, toxic, unstable) for the rest of the scene. Creatures starting their turn in the hazard take (weapon damage) damage. |
| 7 | **Ability Recharge** | Utility | The creature immediately recharges all recharge abilities and can use one as a free action. |
| 8 | **Enraged Assault** | Offense | This creature immediately makes two melee attacks against different targets. |
| 9 | **Hardened Resolve** | Defense | This creature gains resistance to all damage types for a short duration. |
| 10 | **Adaptive Defense** | Defense | This creature gains immunity to the damage type that depleted its first life pool for the rest of the scene. |

### 6.2 Lord Trigger Abilities (d10)

Lord creatures must have at least one Lord Trigger that activates each time a life pool is depleted. Roll or choose:

| d10 | Trigger Name | Role | Effect |
|---|---|---|---|
| 1 | **Cataclysmic Blast** | Offense | All creatures within short range must roll Agility + Athletics vs. ability TN or take (weapon damage × 3) damage and be knocked prone. |
| 2 | **Dark Resurrection** | Support | 1d4 defeated Basic allies are reanimated with half HP in short range. |
| 3 | **Phase Shift** | Defense | This creature teleports to any location within medium range and becomes invisible until the start of its next turn. |
| 4 | **Empowered Minions** | Support | All allied creatures gain +1 boon on attacks and +(weapon damage) extra damage for the rest of the scene. |
| 5 | **Elemental Storm** | Control | Choose a damage type. For the rest of the scene, at the start of each of this creature's turns, all opponents within short range take (weapon damage) damage of that type. |
| 6 | **Devastating Strike** | Offense | This creature immediately makes one attack with triple weapon damage against each opponent in melee range. |
| 7 | **Regenerative Burst** | Healing | This creature regains (tier × 5) HP immediately and gains regeneration (tier × 2) HP per turn for the rest of the scene. |
| 8 | **Reality Warp** | Control | The battlefield changes dramatically — create an environmental effect (difficult terrain, hazard zone, darkness, etc.) that lasts for the rest of the scene. |
| 9 | **Blood Frenzy** | Offense | This creature gains an additional attack per turn and +1 Movement for the rest of the scene. |
| 10 | **Dominate** | Control | One opponent within short range must roll Spirit + Fortitude vs. ability TN or be charmed and fight for the creature until the end of their next turn. |

### 6.3 Abilities by Archetype Role

The following table maps recommended ability roles to each archetype, guiding GMs toward thematically appropriate choices. Use the ability tables in §5.3 to select specific abilities within each role.

| Archetype | Primary Role | Secondary Role | Recommended Trigger Type |
|---|---|---|---|
| **Standard** | Offense | Support | Offense (Berserk Fury, Enraged Assault) |
| **Ambusher** | Offense | Utility | Offense (Power Surge) |
| **Artillery** | Offense | Control | Utility (Ability Recharge) |
| **Bruiser** | Offense | Defense | Offense (Enraged Assault, Aura Eruption) |
| **Defender** | Defense | Support | Defense (Hardened Resolve, Adaptive Defense) |
| **Horde** | Support | Offense | Support (Summon Reinforcements) |
| **Controller** | Control | Defense | Control (Terrain Hazard, Elemental Storm) |
| **Ranged** | Offense | Utility | Defense (Adaptive Defense) |
| **Skirmisher** | Offense | Utility | Offense (Power Surge) |
| **Support** | Support | Healing | Support (Empowered Minions) |

---

## 7. Step-by-Step Creature Building Guide

### Quick Build (Under 5 Minutes)

Use this procedure to build a creature from scratch using the tier table, archetype system, and ability catalogues.

#### Step 1: Concept (30 seconds)

Decide three things:
- **What is it?** Choose a creature type (Beast, Humanoid, Undead, etc.) and size.
- **What tier?** Match to the party's average level.
- **How important is it?** Basic (minion/fodder), Elite (sub-boss), or Lord (final boss).

#### Step 2: Statistics (1 minute)

Use the Creature Builder tool or the tier table:

1. **Look up the tier row** for HP, AV, Defense, Max Attribute, Skill Ranks, Weapon Damage, and Ability TN.
2. **Choose an archetype** that matches the creature's combat role (Bruiser for a frontline brawler, Artillery for a ranged blaster, etc.). Apply the archetype's stat modifiers.
3. **Apply size modifiers** to AV and defenses.
4. **Set attributes** — assign the max die to the primary attribute, lower dice to the rest.
5. **Assign skills** — choose 2–4 appropriate skills at the tier's skill rank values.

#### Step 3: Attacks (1 minute)

Every creature needs at least one attack.

1. **Choose an attack type** — roll on or choose from the Attack Type tables (§5.2, Tables 1a/1b/1c): Melee for beasts and brawlers, Ranged for casters and archers, Weapon for humanoids.
2. **Choose an attack effect** — roll on or choose from the Attack Effects table (§5.2, Table 2). Common choices: Knockdown for brutes, Poison for beasts, Grapple for predators. Spells do not add attack effects.
3. **Calculate damage** — Base Damage (½ primary attribute) + Weapon Damage per SL: Weak / Strong / Critical.
4. **Multi-attack guidance:**
   - **Single attack** = full weapon damage.
   - **Dual wielding** = two *light* attacks, each at -1 weapon damage.
   - **Elite/Lord multi-attack** = 2–3 attacks, primary at full damage, secondaries can vary type.
   - **AoE attacks** = half weapon damage to all targets.

#### Step 4: Abilities (1–2 minutes)

Choose abilities from the six role tables (§5.3), using the archetype's recommended primary/secondary roles (§6.3) as guidance:

- **Basic creatures:** 1–2 abilities. Choose from the archetype's primary role table.
- **Elite creatures:** 2–3 abilities from primary + secondary role tables + 1 Elite Trigger (§6.1).
- **Lord creatures:** 3–5 abilities spanning primary, secondary, and one additional role + 1 Lord Trigger (§6.2).

Each ability is already tagged as Passive, Active, or Reactive — distribute them for variety:
- Every Elite needs at least 1 Reactive ability (Quick Action).
- Every Lord needs at least 1 Reactive (defensive) and 1 Reactive (proactive) ability.

#### Step 5: Finishing Touches (30 seconds)

1. **Add immunities/resistances/weaknesses** appropriate to creature type:
   - Undead: immune to bleeding, charmed, confused, frightened, poisoned, unconscious.
   - Automatons: immune to bleeding, charmed, confused, frightened, poisoned, unconscious.
   - Spirits: immune to conditions from their element, often resistant to physical damage.
   - Beasts: typically no special immunities.
2. **Name the creature** — evocative names that suggest the creature's nature.
3. **Done.** Use the stat block format or export from the builder.

### Example: Building a Tier 4 Elite Controller

Following the steps above:

**Step 1 — Concept:** A Medium Spirit (Infernal), Tier 4, Elite. A mid-boss demonic entity that manipulates the battlefield.

**Step 2 — Statistics (Controller archetype):**

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 2×40 | 4 (light) | d6 | d8 | d10 | d8 | 10 | 9 | 12 |

**Skills:** Arcana (3), Fortitude (3), Insight (3), Perception (3)

**Step 3 — Attacks:**
- **Attack Type:** Flame Bolt (from Table 1b, row 4) — thrown (short/medium), fire damage type.
- **Attack Effect:** Burn (from Table 2, row 6) — on strong or critical, target suffers burning.
- **Hellfire Bolt** (*thrown, short/medium*). 11/17/23 fire damage. On a strong or critical hit, the target suffers burning (6).

**Step 4 — Abilities:**
- **Primary role (Control):** Charm/Command (Active) — One target in short range rolls Spirit + Fortitude vs. TN 10 or is charmed for a short duration.
- **Primary role (Control):** Intimidating Growl (Reactive, proactive) — One opponent in short range suffers +1 bane on their next attack.
- **Secondary role (Defense):** Magic Resistance (Passive) — +1 boon on saves against spells and magical effects.
- **Extra flavor:** Aura of Dread (Passive, from Offense role) — Opponents starting their turn in melee range take 4 psychic damage.
- **Elite Trigger:** Terrain Hazard (from §6.1, row 6) — When the first life pool is depleted, the creature's area erupts in hellfire. Creatures starting their turn in melee range take (weapon damage) fire damage for the rest of the scene.

**Immunities:** fire damage, charmed, frightened

**Step 5 — Name:** **Infernal Deceiver**

---

## 8. Integration with Existing Tools

### 8.1 Rules Integration

The attack tables (§5.2), ability catalogues by role (§5.3), and trigger catalogues (§6) should be added to the creature rules document (`docs/08-creatures/02-creature-rules.md`) under the existing "Creature Abilities" heading (currently a TODO). This gives all GMs access to the framework regardless of whether they use the digital builder.

### 8.2 Builder Integration (Future)

The following enhancements would integrate the framework into the React Creature Builder:

1. **Decouple attack type from effect** — present two separate selectors (type + effect) instead of bundled presets. The existing 27 preset attacks can be preserved as "quick picks" that pre-select both.
2. **Add ability catalogues organized by role** — the existing 46 presets should be re-tagged with their role (Offense/Defense/Healing/Control/Support/Utility) for filtering.
3. **Add Elite/Lord trigger template selector** — appears when Elite or Lord category is selected.
4. **Add "Quick Generate" button** — rolls on the random tables to auto-populate attacks and abilities based on archetype.

### 8.3 Relationship to Concept Tables

The existing random creature concept tables (`06-random-creature.mdx`) generate *what the creature looks like*. The mechanical tables proposed here generate *what the creature does in combat*. The recommended workflow is:

1. **Roll concept** (existing tables) → get creature type, shape, attributes, adaptations.
2. **Set tier and archetype** (builder or manual) → get statistical chassis.
3. **Roll or choose attack type + effect** (§5.2) → get attacks.
4. **Roll or choose abilities by role** (§5.3) → get abilities.
5. **Choose trigger** (§6) if Elite/Lord → complete creature.

---

## 9. Summary of Recommendations

### Priority 1 — Core Rules (Immediate)

| # | Recommendation | Location |
|---|---|---|
| 1 | Fill the "Creature Abilities" TODO with attack type tables (melee, ranged, weapon) + attack effect table | `docs/08-creatures/02-creature-rules.md` |
| 2 | Add ability catalogues organized by six roles (Offense, Defense, Healing, Control, Support, Utility) | `docs/08-creatures/02-creature-rules.md` |
| 3 | Add Elite Trigger and Lord Trigger catalogues with role tags | `docs/08-creatures/02-creature-rules.md` |
| 4 | Add encounter building guidelines (Threat Budget system with action economy) | `docs/08-creatures/02-creature-rules.md` or new `encounter-building.md` |
| 5 | Add step-by-step creature building guide | `docs/08-creatures/02-creature-rules.md` |
| 6 | Add adventurer survivability analysis as GM reference (low-end vs. high-end builds) | `docs/08-creatures/02-creature-rules.md` |

### Priority 2 — Builder Enhancements (Future)

| # | Recommendation | Component |
|---|---|---|
| 7 | Decouple attack type from attack effect (two separate selectors) | `CreatureAdvancedSettings.tsx` |
| 8 | Re-tag existing 46 abilities by role for filtering | `CreatureAdvancedSettings.tsx` |
| 9 | Add Elite/Lord trigger template selector | `CreatureAdvancedSettings.tsx` |
| 10 | Add "Quick Generate" button using random tables + archetype mapping | `CreatureAdvancedSettings.tsx` |

### Priority 3 — Balance Documentation

| # | Recommendation | Location |
|---|---|---|
| 11 | Document Tier 0 as non-combat / environmental creatures | Creature rules, Builder tooltip |
| 12 | Add "Tier vs. Party Level" sidebar clarifying 1:1 encounter baseline | Creature rules |
| 13 | Document intentional design: abilities > HP bloat for creature survivability | Creature rules |
| 14 | Add guidance for threatening tanky adventurers (crush, conditions, forced saves) | Creature rules |

---

## Appendix A: Damage Calculation Reference

For quick reference when building creature attacks:

**Base Damage** = ½ primary attribute die average

| Attribute Die | Average | Base Damage |
|---|---|---|
| d4 | 2.5 | 2 |
| d6 | 3.5 | 3 |
| d8 | 4.5 | 4 |
| d10 | 5.5 | 5 |
| d12 | 6.5 | 6 |
| d12+1 | 7.5 | 7 |
| d12+2 | 8.5 | 8 |

**Damage Formula:**
- **Weak:** Base Damage + Weapon Damage
- **Strong:** Base Damage + (2 × Weapon Damage)
- **Critical:** Base Damage + (3 × Weapon Damage)

**Weapon Damage by Tier:**

| Tier | Weapon Damage | Weak (d8 primary) | Strong | Critical |
|---|---|---|---|---|
| 0 | 2 | 6 | 8 | 10 |
| 1 | 3 | 6 | 9 | 12 |
| 2 | 4 | 8 | 12 | 16 |
| 3 | 5 | 9 | 14 | 19 |
| 4 | 6 | 10 | 16 | 22 |
| 5 | 7 | 12 | 19 | 26 |
| 6 | 8 | 14 | 22 | 30 |
| 7 | 9 | 15 | 24 | 33 |
| 8 | 10 | 17 | 27 | 37 |
| 9 | 11 | 18 | 29 | 40 |
| 10 | 12 | 20 | 32 | 44 |

> **Note:** Multi-target attacks use half the creature's weapon damage in the damage formula (i.e., halve only the weapon damage component, not the base damage). The table above assumes a d8 (base damage 4) primary attribute for reference; adjust base damage for the creature's actual primary attribute.

## Appendix B: Creature Category Quick Reference

| Feature | Basic | Elite | Lord |
|---|---|---|---|
| **Life Pools** | 1 | 2 | 3 |
| **Wounds** | 1 (instant death) | 2 | 3 |
| **HP Format** | "40" | "2×40" | "3×40" |
| **Attacks** | 1–2 | 2–3 | 3–5 |
| **Abilities** | 1–3 | 2–4 (incl. trigger) | 3–6 (incl. triggers) |
| **Quick Actions** | 0–1 | 1+ required | 2+ required (reactive + proactive) |
| **Resolve** | 0 | 1 | 3 |
| **Morale** | Must roll | +1 boon on roll | No roll needed |
| **Second Turn** | No | No | Yes (½ Initiative) |
| **Condition Recovery** | No | On first Wound | On every Wound |
| **Condition Immunity** | No | No | After succeeding once |
| **Threat Points** | 1 TP | 4 TP | 8 TP |

## Appendix C: Existing Creature Ability Patterns

Analysis of abilities across existing creature stat blocks (Tier 0–10) reveals the following recurring patterns:

### Most Common Passive Abilities
1. **Keen Senses** (scent/hearing/sight) — 15+ creatures
2. **Pack Tactics** — 8+ creatures (canines, goblins, kobolds, tribal warriors)
3. **Undead/Construct Nature** — all undead and automatons
4. **Flying** — all avian, draconic, and some spirit creatures
5. **Charge** — boars, cavalry, bull-type creatures
6. **Spider/Wall Climb** — spiders, vampire lords, some elementals
7. **Magic Resistance** — satyrs, some spirits, some boss creatures
8. **Regeneration** — trolls, vampires, some spirits

### Most Common Active Abilities
1. **Frightful Presence** — dragons, powerful undead, demons
2. **Breath Weapon** (recharge d6) — all dragons
3. **Innate Spellcasting** — cultists, priests, spellcaster humanoids
4. **Charm/Command** — vampires, fey, some spirits
5. **Summon Allies** — vampire lords, some demons

### Most Common Quick Actions
1. **Wing Attack** — all flying creatures Large+
2. **Tail Sweep** — dragons, large reptiles
3. **Stomp** — giants, large creatures
4. **Command Undead/Allies** — undead lords, warlords
5. **Shell/Shield Defense** — turtles, armored creatures

### Elite Trigger Patterns
1. **Immediate area attack** (roar, blast, eruption) — most common
2. **Recharge and use breath weapon** — dragons
3. **Stat boost** (attribute increase, damage aura) — powerful creatures
4. **Environmental change** (hazard zone) — elemental creatures

### Lord Trigger Patterns
1. **Area damage + condition** (sandstorm, blood frenzy) — most common
2. **Summon reinforcements** — undead lords, demon lords
3. **Phase/teleport + repositioning** — cunning lords
4. **Regenerative burst** — trolls, nature-based lords
