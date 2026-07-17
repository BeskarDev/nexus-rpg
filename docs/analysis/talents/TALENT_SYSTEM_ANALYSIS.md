# Talent System Analysis (v2)

> **Scope:** Comprehensive audit of the talent system against archetype instructions, talent creation guidelines, and modern game systems (Challenges, Social Intrigue, Travel). Covers combat balance and power scaling, design pattern review, archetype signature talent coverage, martial/hybrid/caster differentiation, progression evaluation through Rank 5, high-level talent framework, and a complete implementation roadmap.
>
> **Version note:** This document supersedes the v1 analysis. The two former side-documents — `CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md` and `TRAVEL_TALENT_INTEGRATION.md` — are preserved but their findings are fully merged into §5 of this document. Treat this as the single source of truth for the talent system audit.
>
> **References:** [Character Progression](../../01-basic-rules/04-character-progression.md) | [Talent Overview](../../03-statistics/06-talents/00-overview.md) | [Challenge System](../../06-scenes/07-challenges/00-overview.md) | [Social Intrigue](../../06-scenes/07-challenges/01-social-intrigue.md) | [Travel](../../06-scenes/07-challenges/02-travel.md) | [Combat Arts](../../05-combat/05-combat-arts/00-overview.md)
>
> **Per-skill detail:** Per-skill workbenches live at `docs/analysis/talents/skills/<skill>.md` (all 16 exist). This document covers system-wide findings; the workbenches cover talent-by-talent inventory, gap lists, and full design proposals — several roadmap items are already drafted there. Where a workbench and this document disagree on skill-level priorities, the workbench is the more current source.

---

## 1. Executive Summary

### 1.1 Key Findings

1. **121 talents across 16 skills** form a functional foundation. The prior analysis counted 122 — the discrepancy is a confirmed counting error in Survival (6 talents in the file, not 7). Of the 121, 104 are fully implemented (86%), with 8 stub-only talents and 9 partial talents (containing XXX/TODO/??? rank placeholders) across 11 skills.
2. **The incomplete count is 17, not 8.** The v1 analysis undercounted by conflating stubs and partial entries. 8 talents have no rank content at all (description-only stubs), and 9 additional talents have at least one rank that is a placeholder. Both types block character progression.
3. **Combat talents dominate** (~55% combat-primary), while utility, exploration, and social talents are under-represented — particularly in Archery, Athletics, Perception, and Education.
4. **Talent progression caps at Rank 3** for the vast majority of talents. Only five talents reach Rank 4 with complete content (Art of Fighting, Art of Archery, Arcane Spell Knowledge, Battle Mage, Mystical Spell Knowledge). Magical Sense reaches Rank 4 but that rank is incomplete ("???"). No talents reach Rank 5, creating a dead zone for Grandmaster-level characters.
5. **Modern system integration is minimal.** Only ~5 talents interact with the Challenge system, ~8 with Social Intrigue, and 4 with Travel mechanics — all well below the 15+ target per system.
6. **Critical archetype gaps remain.** Oracle, Bard, Engineer, Summoner, Warlock, and Apothecary lack dedicated signature talents in their pillar skill. Key identity tags (Infiltration, Whip Control, Zone Control, Prophecy, Pact Mechanics, Alchemy) have zero or near-zero talent representation.
7. **Skill disparity is significant.** Fighting has 14 talents while Streetwise has only 4. Four skills (Insight, Streetwise, Perception, Survival) have 6 or fewer complete talents, limiting build diversity for dependent archetypes.
8. **Defensive variety is thin.** Redirection has only 1 talent (Drunken Technique, requires intoxication), Avoidance sits at ~5%, and reactive defense talents are critically under-developed for a system with lethal combat.
9. **No Rank 4–5 talent framework is implemented.** The progression system supports Ranks 4–5, but talent design has not followed. This leaves high-level characters with 2–5 unspendable TP per Grandmaster skill.
10. **Internal scaling creates bookkeeping.** At least 28 talents have bonuses that recalculate when skill ranks or attributes increase. The recommended fix is fixed bonuses per rank tier (see §4.5).

### 1.2 Six Design Principles

1. **Fiction-first, mechanically precise.** Talents describe abilities narratively but must have unambiguous trigger, effect, and limit. No vague narrative-only effects.
2. **Skill-internal diversity.** Every skill should support combat, utility, and downtime play through its talent pool.
3. **Bounded power ceiling.** Rank 5 = mortal pinnacle (≈ D&D 10–12 martial). Numbers grow with rank within the §4.5 menu ceilings, but a high-rank ability is never JUST a number bump — every R4–R5 rank leads with a new capability (scope, action economy, reliability, system bridge), with numeric growth as an accompaniment (owner ruling 2026-07-17).
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

**Key Observation:** A Rank 5 skill generates 12 TP. With most talents capping at Rank 3 and only 5 complete Rank 4 talents (none at Rank 5), a Grandmaster-tier character has ~3–5 unspendable TP per skill — a significant dead zone that makes high-level play feel unrewarding.

### 2.2 Talent Distribution by Skill

Counts verified directly from source files (2026-07 audit). "Incomplete" = stub-only OR has any XXX/TODO/??? rank entry.

| Skill | Total | Max Rank | Complete | Incomplete | Incomplete Details |
|-------|-------|----------|----------|------------|--------------------|
| **Fighting** | 14 | 4 | 14 | 0 | — |
| **Fortitude** | 11 | 3 | 10 | 1 | Adrenaline Rush (stub) |
| **Mysticism** | 11 | 4 | 10 | 1 | Divine Favor (stub) |
| **Archery** | 9 | 4 | 9 | 0 | — |
| **Athletics** | 9 | 3 | 8 | 1 | Supernatural Mobility (stub) |
| **Nature** | 8 | 3 | 5 | 3 | Herbalist (stub); Knowledgeable Wanderer R3 (TODO); Plant Lore R3 (XXX) |
| **Arcana** | 8 | 4 | 8 | 0 | — |
| **Influence** | 7 | 3 | 5 | 2 | Performer (stub); Presence of Conquest (stub) |
| **Education** | 6 | 3 | 6 | 0 | — |
| **Lore** | 6 | 4 | 5 | 1 | Magical Sense R4 (???) |
| **Crafting** | 6 | 3 | 5 | 1 | Master Artisan (stub) |
| **Stealth** | 6 | 3 | 4 | 2 | Roguish Wits R3 (XXX); Sleight of Hand R3 (XXX) |
| **Survival** | 6 | 3 | 3 | 3 | Explorer of Nature R3 (XXX); Relentless Tracker R2–3 (XXX); Wilderness Expert R3 (XXX) |
| **Perception** | 5 | 3 | 5 | 0 | — |
| **Insight** | 5 | 3 | 4 | 1 | Foresight (stub) |
| **Streetwise** | 4 | 3 | 3 | 1 | I Know A Guy R2–3 (XXX) |
| **Totals** | **121** | — | **104** | **17** | |

> **Note on Survival count:** The v1 analysis listed Survival as 7 talents. Direct file audit finds 6. The discrepancy appears to be a historical counting error; no 7th talent exists in the current file.

### 2.3 Incomplete Talent Inventory

**Stub talents (no rank content — description-only):**

| Talent | Skill | Stub Text |
|--------|-------|-----------|
| Adrenaline Rush | Fortitude | "something with taking damage to gain benefits" |
| Supernatural Mobility | Athletics | "High rank talent allowing supernatural jumps and other forms of movement" |
| Performer | Influence | "Excel at entertaining and swaying crowds" |
| Presence of Conquest | Influence | "High level talent working like conquerers haki from one piece..." |
| Foresight | Insight | "High level talent for supernatural insight leaning into instinctively predicting the future" |
| Divine Favor | Mysticism | Description-only; mentions Favor pool equal to Mysticism per day, no rank structure |
| Herbalist | Nature | "Create potent remedies" |
| Master Artisan | Crafting | "Requires Artisan Rank 3" (prerequisite stated, no rank content) |

**Partial talents (one or more ranks with XXX/TODO/??? placeholder):**

| Talent | Skill | Incomplete Ranks |
|--------|-------|-----------------|
| Knowledgeable Wanderer | Nature | R3 (TODO) |
| Plant Lore | Nature | R3 (XXX) |
| Magical Sense | Lore | R4 (???) |
| Roguish Wits | Stealth | R3 (XXX) |
| Sleight of Hand | Stealth | R3 (XXX) |
| I Know A Guy | Streetwise | R2–3 (XXX) |
| Explorer of Nature | Survival | R3 (XXX) |
| Relentless Tracker | Survival | R2–3 (XXX) |
| Wilderness Expert | Survival | R3 (XXX) |

**Priority:** Completing stubs and partial entries before adding new talents prevents broken progression paths and unreachable TP investments.

### 2.4 Rank Distribution

| Max Rank | Talent Count | % of Total |
|----------|-------------|------------|
| Rank 5 | 0 | 0% |
| Rank 4 (complete) | 5 | 4% |
| Rank 4 (partial — Magical Sense) | 1 | 1% |
| Rank 3 (complete) | 107 | 88% |
| Stub (no ranks) | 8 | 7% |

**Rank 4-complete talents:** Art of Fighting (Fighting), Art of Archery (Archery), Arcane Spell Knowledge (Arcana), Battle Mage (Arcana), Mystical Spell Knowledge (Mysticism).

**Dead zone impact:** A Grandmaster (Skill 5) has 12 TP but only ~7–8 are spendable with current content per combat skill. The unspendable TP accumulates across every high-level skill investment.

### 2.5 System Strengths

- **Combat foundations are strong.** Fighting (14), Archery (9), and Fortitude (11) provide diverse tactical options across weapon mastery, defensive stances, offensive techniques, and thematic combat styles.
- **Magic integration is well-designed.** Arcana (8) and Mysticism (11) cover spell progression, combat casting, resource management, and spell enhancement with clear role separation.
- **Rank progression follows a clean pattern.** R1 unlocks, R2 pays off, R3 masters — consistent with the *unlock → payoff → mastery* guideline.
- **Weapon mastery creates meaningful differentiation.** Six weapon-type talents give martial characters distinct loadout identities.
- **Several talents already serve modern systems.** Knowledgeable Wanderer, Explorer's Tenacity, Empath, Sense of Deduction, and Diplomat all interact substantively with current game systems.

---

## 3. Gap Analysis

### 3.1 Skill Size Disparity

**Target:** 8–12 talents per skill for healthy build diversity.

| Category | Skills | Talent Count | Status |
|----------|--------|-------------|--------|
| Over-served | Fighting | 14 | ⚠️ Could sub-categorize; not urgent |
| Well-served | Fortitude, Mysticism | 11 each | ✅ |
| Adequate | Archery, Athletics, Arcana, Nature | 8–9 | ✅ |
| Under-served | Education, Lore, Crafting, Stealth, Influence | 6–7 | ⚠️ Need 1–4 additions |
| Critically low | Survival, Perception, Insight, Streetwise | 4–6 | ❌ Need 3–6 additions each |

### 3.2 Missing Archetype Support

All 25 archetypes cross-referenced against accessible complete talents (pillar + 3 support skills):

| Archetype | Pillar | Accessible Complete Talents | Signature Coverage | Critical Gaps |
|-----------|--------|---------------------------|-------------------|---------------|
| Apothecary | Crafting | ~24 | ❌ Missing | Alchemy, remedies, tinctures |
| Barbarian | Fighting | ~39 | ✅ (Battle Rage via Fortitude) | — |
| Bard | Mysticism | ~28 | ❌ Missing | Music magic, performance |
| Brawler | Fighting | ~36 | ✅ (Pugilist, Martial Artist) | — |
| Champion | Fighting | ~41 | ✅ (Mystic Champion, Pact) | — |
| Druid | Mysticism | ~29 | ✅ (Shape Changer) | — |
| Duelist | Fighting | ~33 | ✅ (Defensive Dueling, Riposte) | Feint mechanics |
| Engineer | Crafting | ~24 | ❌ Missing | Contraptions, siege devices |
| Fighter | Fighting | ~39 | ✅ (Art of Fighting, masteries) | Zone control |
| Gladiator | Fighting | ~39 | ✅ (Grappler via Athletics) | — |
| Hoplite | Fighting | ~39 | ⚠️ Partial (Shield/Polearm) | Formation tactics, zone control |
| Magus | Arcana | ~32 | ✅ (Battle Mage, Spellblade) | — |
| Monk | Fighting | ~43 | ✅ (Pugilist, Martial Artist) | — |
| Oracle | Mysticism | ~25 | ❌ Missing | Prophecy, omens, foresight |
| Priest | Mysticism | ~36 | ✅ (Pact of Devotion) | — |
| Ranger | Archery | ~26 | ✅ (Sharpshooter, Monster Hunter) | Advanced tracking |
| Rogue | Fighting | ~25 | ⚠️ Partial (Assassination via Stealth) | Infiltration, lockpicking |
| Shaman | Mysticism | ~27 | ⚠️ Partial (Divine Sense) | Spirit medium |
| Slinger | Archery | ~28 | ✅ (Expert Slinger) | — |
| Sorcerer | Arcana | ~23 | ✅ (Wild Overload, Spellweaver) | — |
| Summoner | Arcana | ~23 | ❌ Missing | Summon mechanics, conjuration |
| Swashbuckler | Fighting | ~33 | ✅ (Swashbuckler via Streetwise) | — |
| Tamer | Fighting | ~35 | ⚠️ Partial (Animal Companion via Nature) | Whip control, advanced training |
| Warlock | Arcana | ~27 | ❌ Missing | Pact mechanics, curses, familiar |
| Warlord | Fighting | ~36 | ⚠️ Partial (Commander via Education) | Tactical commands |

**Summary:** 6 archetypes completely lack a signature talent (Bard, Engineer, Oracle, Summoner, Warlock, Apothecary). 7 more have their signature in a support skill rather than their pillar skill, which is functional but weakens the pillar's identity.

### 3.3 Missing Identity Tags

The following archetype-defining mechanics have zero talent representation:

| Identity Tag | Dependent Archetypes | Required Skills |
|-------------|---------------------|-----------------|
| **Infiltration** (lockpicking, bypass, silent entry) | Rogue, Duelist, Bard | Stealth, Streetwise |
| **Whip control** (reach control, trip, subdual) | Tamer | Fighting |
| **Zone control** (area denial, formation, choke points) | Hoplite, Fighter, Warlord | Fighting, Education |
| **Prophecy** (visions, omens, fate guidance) | Oracle | Insight, Lore, Mysticism |
| **Music/Performance magic** (AoE buffs, charm through art) | Bard | Influence, Mysticism |
| **Pact mechanics** (patron obligations, eldritch abilities) | Warlock | Arcana, Lore |
| **Alchemy** (potions, bombs, remedies) | Apothecary, Engineer | Crafting, Nature |

### 3.4 Role Distribution Deficits

Evaluated against design guidelines (each skill should support combat, utility, and downtime):

| Role | Current % | Target % | Gap | Most Affected Skills |
|------|-----------|----------|-----|---------------------|
| **Offense** | ~38% | 25–30% | Over-represented | Fighting, Archery |
| **Defense — Redirection** | ~1% | 5–10% | ❌ Critical | Only Drunken Technique, requires intoxication |
| **Defense — Avoidance** | ~5% | 10–15% | ❌ Large gap | Athletics, Stealth, Perception |
| **Utility — Travel** | ~3% | 10–15% | ❌ Large gap | Survival, Nature, Perception |
| **Utility — Exploration** | ~8% | 10–15% | ⚠️ Below target | Streetwise, Insight, Nature |
| **Support — Team** | ~12% | 15–20% | ⚠️ Below target | Education, Influence, Lore |
| **Healing** | ~5% | 5–10% | ✅ Appropriate | Nature, Mysticism, Fortitude |

### 3.5 Defensive Talent Gaps

In a system with lethal combat, defensive variety is essential:

| Category | Examples | Count | Status |
|----------|----------|-------|--------|
| **Mitigation** | Heavy Armor Mastery, Body of Bronze, Mana Shield | 6 | ✅ Adequate |
| **Avoidance** | Evasion, Light Armor Mastery | 4 | ⚠️ Needs expansion |
| **Counterplay** | Riposte, Defensive Dueling | 3 | ⚠️ Needs expansion |
| **Redirection** | Drunken Technique R1 (requires intoxication) | 1 | ❌ Near-missing |
| **Reactive defense** | Reflexive Shooter (ranged only) | 1 | ❌ Near-missing |

**Key issue:** Drunken Technique is the only redirection talent and requires intoxication. Glass cannon melee archetypes (Rogue, Swashbuckler, Duelist) have few survival tools beyond Evasion.

**Proposed defensive talent additions:**

| Talent | Skill | Category | Archetype Fit | Core Mechanic |
|--------|-------|----------|---------------|---------------|
| **Deflecting Presence** | Insight | Redirection | Oracle, Shaman, Warlord | Interpose self when ally attacked; redirect to yourself only |
| **Shadow Slip** | Stealth | Avoidance | Rogue, Swashbuckler, Assassin | Bane on melee attacks; reposition on miss; vanish 1/scene |
| **Combat Instincts** | Perception | Reactive defense | Ranger, Scout, vigilant fighters | Boost Defense on reaction; extra defensive Quick Action at R3 |
| **Desperate Gambit** | Athletics | Risky avoidance | Glass cannons, squishy melee | Acrobatic dodge (Agility + Athletics vs. Hard TN) to halve damage; fall prone on failure |
| **Arcane Warding** | Arcana | Magical defense | Sorcerer, Summoner, Magus | Spend Focus as Quick Action for Resist boost or damage-absorbing barrier |
| **Guardian's Oath** | Mysticism | Protective defense | Priest, Champion, Druid | Enhance Protect Ally; briefly grant adjacent allies Defense bonus |

---

## 4. Combat Talent Balance

### 4.1 Damage Formula Context

Core damage formula: **½ Attribute (base) + Weapon Damage × SL multiplier + flat bonuses − AV**

| Success Level | Formula | Example (d10 STR, Longsword WD 3) |
|---------------|---------|-----------------------------------|
| Weak | ½ Attr + 1 × WD | 5 + 3 = **8** |
| Strong | ½ Attr + 2 × WD | 5 + 6 = **11** |
| Critical | ½ Attr + 3 × WD | 5 + 9 = **14** |

Flat bonuses (talent ability bonuses) are added after the SL multiplication — not multiplied. A +3 ability bonus always adds exactly +3 regardless of success level. Talent damage riders are incremental, not multiplicative.

**Benchmark HP pools:**

| Tier | Creature HP | Adventurer HP (approx) |
|------|------------|------------------------|
| 1 | 10 | 18 |
| 3 | 30 | 22 |
| 5 | 50 | 26 |
| 7 | 70 | 30 |
| 10 | 100 | 38 |

### 4.2 Ability Bonus Damage Audit

Only one ability bonus applies per hit (highest wins), preventing stacking. However, the value of these bonuses varies considerably by implementation:

| Talent | Rank | Bonus at R3 Skill | Bonus at R5 Skill | Scales? | Assessment |
|--------|------|-------------------|-------------------|---------|------------|
| Battle Mage R3 | 3 | +3 | +5 | ⚠️ Yes | Strong — +5 at R5 is the largest flat ability bonus |
| Martial Artist R3 | 3 | +3 | +5 | ⚠️ Yes | Moderate — improvised/unarmed are weaker base |
| Assassination R3 | 3 | +3 | +5 | ⚠️ Yes | ❌ High burst combined with R1 SL upgrade |
| Ammo Specialist R3 | 3 | +3 | +5 | ⚠️ Yes | Moderate — requires supply checks |
| Grappler R3 | 3 | +3 | +5 | ⚠️ Yes | Moderate — only while grappling |
| Inspire Ally R1 | 1 | +1 | +5 | ⚠️ Yes | ❌ Over — R1 talent reaches +5 at R5 |
| Insult to Injury R2 | 2 | +2 | +4 | ⚠️ Yes | ❌ Over — party-wide multiplier effect |
| Commander R2 | 2 | +2 | +4 | ⚠️ Yes | Strong — no action cost for ally |
| Identify Weakness R1 | 1 | +1 | +4 | ⚠️ Yes | ❌ Over — applies to all party vs. target |
| Monster Hunter R1 | 1 | +1 | +4 | ⚠️ Yes | Moderate — larger creatures only |

**Key pattern:** 22 of 28 damage-relevant talents use internal scaling (+skill rank or +½ attribute). This means every skill rank increase triggers recalculation across multiple talents — significant bookkeeping burden at high levels.

### 4.3 Power Level Assessment

**Over-performing:**

| Talent | Issue |
|--------|-------|
| **Inspire Ally R1** | Grants +Influence damage to ally attacks from Rank 1, no per-scene limit. Scales to +5 at R5. A R1 talent should not silently become a +5 party-wide damage buff. |
| **Insult to Injury R2** | Every ally adds +Influence to damage vs. distracted target. 4-person party = +8 to +20 total party damage per round from one R2 talent. |
| **Assassination R1+R3 stack** | R1 upgrades SL by one step AND R3 adds +Stealth flat damage. Against unaware target with d10 AGI, Shortbow (WD 3), Stealth 3: 5 + 9 (critical upgraded from strong) + 3 = **17 damage** — near one-shot on same-tier creatures. |
| **Battle Mage R3** | +Arcana to all weapon damage. At R5 Arcana = +5 unconditional to every hit. Largest sustained ability bonus in the system. |
| **Identify Weakness R1** | The +Perception bonus applies to the entire party's attacks against the focused target. Quadruples the effective bonus value in a 4-person party. |

**Under-performing:**

| Talent | Issue |
|--------|-------|
| **Pugilist R3** | Unarmed caps at WD 4 at R3. Against armored targets, needs critical hits to match one-handed weapons at strong hits. |
| **Strong Grip R3** | Requires forfeiting all movement AND uses +½ STR (max +3 with d10), while Battle Mage R3 provides +5 with no restriction. |
| **Peak Performance R1** | +1 weapon damage overnight is negligible compared to TP opportunity cost. |

**Appropriately powered (exemplars):** Riposte (reactive trigger, fixed conditions), Rapid Shot (action economy tradeoff), Defensive Dueling (flat +1 Parry, clear restriction), Shield Mastery (new capability per rank without scaling numbers), Evasion (escalating capabilities, no recalculation).

### 4.4 Internal Scaling Audit

| Scaling Type | Talent Count | Bookkeeping Impact |
|-------------|-------------|-------------------|
| +Skill Rank to damage | 15 | High — recalculate on every skill rank increase |
| +½ Attribute to damage | 3 | Moderate — attribute increases are less frequent |
| +Skill Rank to healing | 6 | Moderate |
| +Skill Rank to AV | 5 | Moderate |
| +Skill Rank to conditions / uses | 7 | Low |

**Total:** 28 talents with some form of internal scaling. 15 scale damage — the most impactful type.

### 4.5 Recommendations: Fixed Bonus Menus

Replace "+Skill Rank" scaling with fixed bonuses from a small even-step menu (owner ruling 2026-07-17: damage bonuses come only from **+2 / +4 / +6** — no odd values, minimal mental math at the table).

**Damage menu — {+2, +4, +6}, slow ceilings** (owner ruling 2026-07-17, second refinement):

| Rank Acquired | Ceiling | Guidance |
|--------------|---------|----------|
| R1 | +2, exceptional | Riders are normally absent at R1; +2 only for rolled or tightly limited activations |
| R2 | +2 | The normal entry point for a damage rider |
| R3 | +4 | |
| R4 | +4 default, +6 exceptional | First rank where +6 is legal — resource-costed or heavily conditional only |
| R5 | +6 | Broadly available |

This gives R4–R5 talents a sanctioned numeric axis: a rider may grow to +6 at high ranks. The binding constraint (owner ruling 2026-07-17): a high-rank ability must never be JUST a number bump — that reads boring and uninspired. Every R4–R5 rank leads with a new capability (scope, action economy, reliability, system bridge, recovery — §8.4 templates); menu-step growth rides along as an accompaniment, never as the rank's whole content.

**Healing menu — {+2, +4, +6}:** R1 +2 · R2 +4 · R3 +6. Healing runs one step ahead of damage because it competes with the Life-tradition bottleneck, not the damage curve. **Whole-ability heals** (the heal IS the entire ability, paid with an action and a use limit — Second Wind model) run their own ladder above the rider menu: 4 at R1, +2 per talent rank thereafter (6 at R2, 8 at R3) — owner ruling 2026-07-17. **Marked (X)** values come from the damage menu at the acquiring rank (X is bonus damage on the next attack).

**Pool menu — {5, 10, 20}** (owner ruling 2026-07-17): temporary HP and damage-absorption barriers (the *of Shielding* model) use doubling steps, not the rider menu — temp HP never stacks with itself, so widely spaced values keep "which source wins" readable, and the values mirror creature HP brackets. Ceilings: 5 = R2–R3 talents · 10 = R4–R5 or heavily restricted grants (stance-bound, once per day, high Focus cost per refresh) · 20 = R5 capstones and legendary effects only (20 exceeds most adventurer max HP). Prefer an absorption barrier over temp HP when the granting ability belongs to a build that also generates temp HP elsewhere — barriers stack alongside temp HP, avoiding the highest-wins collision (Mana Shield rework precedent). **Cast-parameter exemption:** pool values set by the spell being cast (Mana Shield's barrier at twice the cast spell's rank, known at cast time) are exempt from the fixed menu, the same way rank-up-identity talents are exempt from the rider menus.

**Defense bonuses (Parry, Dodge, Resist, Defenses) — {+1, +2}:** defenses swing TN math far harder than damage; +2 is the ceiling for any single talent-granted defense bonus. **AV** follows the §4.6 caps.

**Exception:** Talents where rank-up IS the core identity (Spell Knowledge granting +2 Focus per rank, Pugilist increasing unarmed damage per rank) keep their scaling. The concern is talents where the bonus silently scales with an unrelated progression.

### 4.6 Defensive AV Scaling Issues

Body of Bronze and Armor of the Faithful both used "AV = 1 + Skill" (armor bonus), scaling to AV 6 at Rank 5 — exceeding plate armor. Mana Shield reached AV 7 at high spell ranks. **Resolved (P0.2, published 2026-07-17):**
- Body of Bronze: capped at +4, explicit exclusivity preamble
- Armor of the Faithful: capped at +4, explicit exclusivity preamble
- Mana Shield: reworked away from AV entirely — now an absorption barrier at twice the cast spell's rank (cast-parameter exemption, §4.5)

---

## 5. Modern System Integration

> *This section merges the complete findings of the former `CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md` and `TRAVEL_TALENT_INTEGRATION.md` documents. Those files are preserved as historical reference but §5 is the authoritative summary. All design proposals from those documents are incorporated here.*

### 5.1 Challenge System Mechanics Review

The Challenge system uses a single die (d6–d12) as a progress tracker. Talents can interact with:

| Mechanic | Description | Talent Hook |
|----------|-------------|-------------|
| **Challenge Die** | d6–d12, reduced by successes | Reduce by extra on specific skills; prevent increase on blunders |
| **Target Number** | TN 8–16 per step | Grant boons or reduce TN for specific challenge types |
| **Critical Success** | Die −2 + bonus effect | Trigger additional effects on crits |
| **Weak Success Cost** | Progress at a cost | Mitigate weak success costs |
| **Failure Consequence** | No progress + consequence | Reduce consequence severity |
| **Skill-Once Rule** | Each skill usable only once per challenge | Enable skill substitution; allow one-time reuse |
| **Approach Adjustments** | Clever/Risky/Cautious TN modifiers | Enhance approach benefits or reduce penalties |
| **Compound Challenges** | Multiple dice in parallel | Contribute to two objectives; coordinate allies |

### 5.2 Challenge System — Existing Talent Audit

**Talents with direct challenge interaction:**

| Talent | Skill | Challenge Interaction |
|--------|-------|----------------------|
| Jack of All Trades | Streetwise | Skill substitution; defeat the skill-once rule (R1 once, R2 persist, R3 second skill) |
| General Education | Education | R2: substitute Education for any Mind-based expert skill once/scene |
| Knowledgeable Wanderer | Nature | R2: blunders treated as failures during travel challenges |
| Sense of Deduction | Insight | R2–R3: true/false assessment in Research challenges; multiple queries at R3 |
| Commander | Education | R1: +1 boon to any ally roll, including challenge rolls |
| Danger Sense | Perception | R2: adds Perception to Resist vs. surprise at chase-to-combat transitions |
| Eagle Eye | Perception | R1/R3: useful in Exploration/Tracking challenges |
| Explorer of Nature | Survival | R2: reduces negative navigator options in chosen terrain |
| Relentless Tracker | Survival | R1: re-roll tracking tests |
| Tactician | Education | R1: re-roll Initiative and boons — applicable at challenge transitions |
| Explorer's Tenacity | Fortitude | R1: re-roll environmental Fortitude tests during challenge consequences |

**Current:** ~5 talents interact with core challenge mechanics (die, consequences, skill-once rule). **Target:** 15+.

### 5.3 Social Intrigue System — Existing Talent Audit

The Social Intrigue system uses Interest (NPC willingness, −1 to +3), Patience (challenge die, d4–d8), Motivations, and Pitfalls. Social actions: Argue, Appeal, Deceive, Investigate, Leverage, Concede, Assist.

**Talents with direct social intrigue interaction:**

| Talent | Skill | Social Interaction |
|--------|-------|-------------------|
| Fast Talking | Influence | R1: re-roll failed Influence in social situations; R2: enhanced Assist action |
| Inspire Ally | Influence | +1 boon on any test applies to intrigue rolls |
| Leading Presence | Influence | R1: morale/fear resistance helps vs. intimidation-based Pitfalls; R2: Resist bonus aids contested actions |
| Empath | Insight | R1–R3: re-roll and +1 boon on emotional/personality Insight — directly enhances Investigate action for Motivation/Pitfall discovery |
| Piercing Look | Insight | R1–R2: re-roll vs. deception; +1 boon/bane — enhances all intrigue rolls vs. specific NPC |
| Sense of Deduction | Insight | R2–R3: true/false binary assessment — powerful investigation tool during Social Intrigue |
| Diplomat | Education | R1–R3: cultural etiquette maps to Motivation/Pitfall discovery; R2 is a specialized Investigate action |
| Eloquent Talker | Education | R1: Education substitutes for Influence — Education-focused characters as primary social actors |
| Linguist | Education | Enables Social Intrigue with foreign NPCs |
| Roguish Wits | Stealth | R1: re-roll Stealth to convince of falsehood — supports Deceive action |
| Sleight of Hand | Stealth | R1–R2: plant/steal items — supports Leverage action |
| Jack of All Trades | Streetwise | Skill substitution valuable in challenge/social contexts |
| I Know A Guy | Streetwise | R1: contact network supports Leverage action narrative |
| Strong Mind | Fortitude | R1–R2: resist charm/fear during hostile negotiations |
| Channel Superstition | Lore | Demoralize applicable as social pressure |

**Current:** ~8 talents interact with core Social Intrigue mechanics. **Target:** 15+.

### 5.4 Challenge and Social Intrigue — Gaps and Proposed Talents

**Critical missing interaction types:**

| Gap | Priority |
|-----|----------|
| Patience management — no talent delays the Patience timer | ❌ Critical |
| Interest manipulation — no talent directly raises or protects Interest | ❌ Critical |
| Pitfall recovery — no talent recovers from triggered Pitfalls | ❌ High |
| Weak success mitigation — no talent removes cost on weak successes | ❌ High |
| Challenge die manipulation beyond normal success | ⚠️ Medium |
| Consequence mitigation — no talent reduces severity of failure consequences | ⚠️ Medium |

**Proposed new talents (full mechanical designs preserved in archived `CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md`):**

| Talent | Skill | Key Mechanic | Priority |
|--------|-------|--------------|----------|
| **Silver Tongue** | Influence | R1: delay Patience die by 1 on successful Influence roll (1/scene); R2: +1 boon after Motivation appeal; R3: prevent one Interest drop (1/scene) | High |
| **Read the Room** | Insight | R1: +1 boon on Investigate actions; R2: after discovering Motivation/Pitfall, learn exact Interest or Patience value; R3: warn allies, block triggered Pitfall Interest loss (1/Pitfall) | High |
| **Keen Observer** | Perception | R1: re-roll Perception during any challenge (1/scene); R2: learn one hidden challenge detail on success; R3: critical success → extra −1 die OR negate one consequence | Medium |
| **Streetwise Informant** | Streetwise | R1: re-roll Streetwise in urban challenges (1/scene); R2: pre-scene intel (roll to learn 1 Motivation/Pitfall before Social Intrigue); R3: once/scene extra −1 challenge die on success | Medium |
| **Methodical Research** | Education | R1: failed roll still reveals a minor clue in Research challenges; R2: negate pending consequence on success; R3: once/challenge, add your Education to an ally's skill rank | Medium |
| **Dogged Pursuit** | Survival | R1: failed Survival roll in Tracking/Chase challenge doesn't increase die (1/scene); R2: reuse one already-used skill once per challenge; R3: on success impose +1 bane on quarry's evasion roll | High |

**Completing existing incomplete talents for social/challenge play:**
- **Relentless Tracker R2–R3:** quarry information details + trail recovery (1/scene)
- **I Know A Guy R2–R3:** intelligence gathering; contact in new settlements (lower SL)
- **Roguish Wits R3:** successful deception freezes Patience die for that exchange (1/scene)
- **Sleight of Hand R3:** planted evidence grants +1 boon on Leverage/Deceive; stolen document reveals Motivation or Pitfall

### 5.5 Travel System — Mechanics Review

The travel system uses named roles with specific dice. Talents can interact with:

| Travel Mechanic | Key Rolls | Current Talent Support |
|----------------|-----------|----------------------|
| **Navigator** | Spirit/Mind + Nature | Knowledgeable Wanderer, Explorer of Nature |
| **Scout** | Spirit + Perception/Survival | Explorer of Nature (indirect) |
| **Quartermaster** | Mind + Crafting/Education | None specific |
| **Forager** | Spirit/Mind + Nature | Plant Lore, Wilderness Expert |
| **Hunter** | Agility/Spirit + Survival | Explorer of Nature, Wilderness Expert |
| **Forced March / Fatigue** | STR + Fortitude | Explorer's Tenacity |
| **Weather Events** | STR + Fortitude | Explorer's Tenacity, Tough Stomach |
| **Supply Checks** | Supply die | Explorer's Tenacity R3 |
| **Multi-Role Penalty** | +1 bane per extra role | Knowledgeable Wanderer R1 |
| **Checkpoint Encounters** | Various | None dedicated |

**Current:** 4 talents with direct travel mechanics interaction; 12+ with indirect relevance. **Target:** 15+.

### 5.6 Travel System — Existing Talent Audit

**Talents with direct travel interaction:**

| Talent | Skill | Travel Interaction |
|--------|-------|-------------------|
| **Knowledgeable Wanderer** | Nature | R1: no multi-role bane; R2: +1 boon on navigation, blunders → failures; R3: TODO (bonus progress — needs completion) |
| **Explorer of Nature** | Survival | R1: re-roll Survival/Nature in chosen environment; R2: navigator reduces options on blunder, scout reduces Encounter Die (⚠️ terminology outdated — should reference Travel Event Table); R3: XXX |
| **Explorer's Tenacity** | Fortitude | R1: re-roll Fortitude vs. environmental hazards; R2: double Fatigue loss during rest, absorb Injury as Fatigue (1/day); R3: heal Injury during bad night, re-roll Supply Checks |
| **Wilderness Expert** | Survival | R1: create rations from gathered food; R2: +1 boon camp establishment, alert on night attack; R3: XXX |

**Strong indirect travel relevance:** Expert Rider (mounted progress), Animal Companion (scout/hunter assist), Plant Lore R2 (+1 forager unit), Danger Sense (ambush checkpoints), Eagle Eye (scout landmarks), Bulky (encumbrance management), Jack of All Trades (any travel role substitution), General Education (Quartermaster via Education), Field Medic (injury recovery during travel).

### 5.7 Travel System — Gaps and Proposed Talents

**Missing coverage by travel role:**

| Travel Role | Gap |
|-------------|-----|
| Quartermaster | No dedicated talent; only General Education offers indirect support |
| Scout (Perception-based) | Eagle Eye is combat-focused; no talent specifically boosts scouting rolls |
| Navigator (Education-based) | No talent for scholarly/civilized-land navigation |
| Fisher | No talent improves fishing |
| Checkpoint interaction | No talent dedicated to blockades, ambushes, extreme climate |

**Proposed new talents (full mechanical designs preserved in archived `TRAVEL_TALENT_INTEGRATION.md`):**

| Talent | Skill | Key Travel Mechanic | Priority |
|--------|-------|---------------------|---------|
| **Pathfinder** | Survival | R1: as Navigator, ignore terrain penalty OR remove 1 Fatigue; R2: re-roll failed navigation (1/day); R3: free "fast pace" on strong/critical, once/journey detour avoidance | High |
| **Trailblazer** | Athletics | R1: STR + Athletics to resist forced march Fatigue; assist Navigator with +1 boon; R2: substitute Athletics for Fortitude at Extreme Climate checkpoints; R3: group Fatigue resistance, once/journey recover 1 progress on zero-progress day | High |
| **Cartographer's Eye** | Perception | R1: as Scout, Navigator gains +1 boon OR learn next Travel Event category; R2: "avoid danger" uses 3 rolls (choose 1); R3: critical Scout → automatic shelter; once/journey Hidden Checkpoint warning | Medium |
| **Expedition Leader** | Education | R1: Quartermaster using Mind + Education; route intelligence at safepoints; R2: strong Quartermaster dismisses Wear and Tear; weather anticipation roll; R3: +1 boon Education travel rolls; once/journey rest day at checkpoint | Medium |
| **Road Warden** | Streetwise | R1: supply discount or next safepoint intel; +1 boon on NPC traveler interactions; R2: Scout on road → automatic shelter; Streetwise to bypass Encounter (−1 progress); R3: road navigation boon; once/journey contact provides aid | Medium |
| **Seasoned Forager** | Nature | R1: gathered food +1 day freshness OR +1 material unit; R2: identify poisonous harvest before consumption; forage under pressure (with bane); R3: strong success → non-spoiling food; once/journey restorative meal (−1 Fatigue per party member) | Medium |

**Terminology fix:** Explorer of Nature R2 references "Encounter Die" which no longer exists. Update to reference the Travel Event Table or Scout's "avoid danger" bonus.

### 5.8 Integration Summary

| System | Current Direct | Proposed Additions | Target |
|--------|---------------|-------------------|--------|
| Challenge | ~5 | +6–8 new | 15+ |
| Social Intrigue | ~8 | +4–6 new | 15+ |
| Travel | 4 | +6 new | 15+ |
| **New talent designs total** | — | **~15 minimum** | — |

Several proposed talents serve multiple systems simultaneously (Cartographer's Eye aids both Challenges and Travel scouting; Dogged Pursuit aids both Tracking and Chase challenges). Cross-system designs are preferred over narrow single-system ones.

---

## 6. Design Pattern Audit

### 6.1 Problematic Patterns

#### Pattern A: Overloaded Rank Entries

| Talent | Issue |
|--------|-------|
| **Battle Rage R1** | 5 distinct effects in one rank (boon on STR, HP spend for damage, bane on MND, no spellcasting, Fatigue on end) |
| **Pact of Devotion R1–R3** | Each pact type has 3–5 effects per rank across 4 pact options — effectively 12+ sub-abilities |
| **Explorer's Tenacity R2–R3** | R2: double Fatigue healing + choose Fatigue over Injury; R3: heal Injury + double ration rolls — multiple unrelated abilities per rank |
| **Wilderness Expert R2** | Camp establishment boon + wake-from-rest Perception roll — two unrelated abilities |

**Fix:** Limit each rank to 1–2 mechanically distinct effects. Split broader talents, or use sub-choices.

#### Pattern B: Stances Without Lifecycle Rules

| Talent | Missing Rule |
|--------|-------------|
| **Battle Rage** | Never states activation cost (Quick Action?), whether you can voluntarily exit, or duration beyond "scene ends or unconscious" |
| **Drunken Technique** | "While in drunken stance" — always-on while intoxicated or requires activation? Can you exit voluntarily? |

**Fix:** All stance-type talents must state (1) activation cost, (2) duration, and (3) termination conditions.

#### Pattern C: Passives That Obsolete System Elements

| Talent | Issue |
|--------|-------|
| **Escape Artist R3** | "Movement doesn't provoke Opportunity Attacks" — permanent passive making Retreat obsolete. Should be once-between-turns. |
| **Body of Bronze / Armor of the Faithful** | At high skill ranks, exceeds plate armor AV with zero encumbrance. Makes Heavy/Light Armor Mastery irrelevant for those builds. |
| **General Education R1** | Removes the untrained penalty entirely at R1 for all Mind-based expert skills — very powerful for a single TP. |

**Fix:** Permanent passives that remove core system penalties should be placed at R3+, restricted, or offer partial mitigation.

#### Pattern D: Talents With Missing Limits

| Talent | Missing Limit |
|--------|--------------|
| **Inspire Ally R1** | Unlimited +Influence damage to any ally, every turn. No per-scene limit, no range gate beyond medium distance. |
| **Insult to Injury R2** | "You and your allies add Influence to damage" — no limit on allies benefiting or duration. |
| **Communal Practices R1** | "Exclude any number of targets" from multi-target spells — no cost, no limit, always beneficial. |

### 6.2 Resource Model Analysis

| Model | Count | Assessment |
|-------|-------|------------|
| **Always-on passive** | ~35 | Healthy if limited in power; "invisible" but zero tracking |
| **Per-scene limited** | ~40 | Healthy — creates meaningful decisions each encounter |
| **Per-day limited** | ~15 | Good for strategic resource management |
| **Conditional trigger** | ~20 | Emerge naturally — reward positioning and play |
| **HP/Focus cost** | ~5 | Risk/reward tension; complex to track |

**Standard budget per rank (binding):**
- **R1:** One significant ability once per scene OR one minor passive
- **R2:** One payoff ability — unlimited if conditional, once per scene if unconditional
- **R3:** One mastery ability — once per scene if powerful, unlimited if moderate
- **R4:** Once per scene for scope-expansion; once per day for outcome-reversal
- **R5:** Once per day for dramatic effects; permanent passives for mundane mastery only

### 6.3 Specific Talent Redesign Recommendations

| Talent | Issue | Proposed Fix |
|--------|-------|-------------|
| **Inspire Ally R1** | Unlimited party damage | Add "once per scene" at R1; R2 upgrades to once-between-turns + fixed +2 damage |
| **Insult to Injury R2** | Party-wide scaling damage | Fixed +2 damage (ability bonus) only for the talent user |
| **Battle Rage** | 5 effects in R1, unclear activation | R1: Quick Action to enter + core benefit; R2: temp HP + Resist bonus; R3: damage resistance |
| **Body of Bronze R1** | AV exceeds plate | Cap: "AV = 1 + Fortitude (max 4)" |
| **Armor of the Faithful R1** | AV exceeds plate | Cap: "AV = 1 + Mysticism (max 4)" |
| **Mana Shield R1** | AV reaches 7+ | Cap: "AV = 2 + spell rank (max 5)" |
| **General Education R1** | Removes untrained penalty entirely | R1 reduces bane to +1 for first use per scene; full removal moves to R2 |
| **Escape Artist R3** | Removes OA system entirely | Change to "once between turns, move without provoking" |
| **Pact of Devotion** | 12+ sub-abilities | Reduce each pact to maximum 2 effects per rank |

---

## 7. Archetype Signature Coverage

### 7.1 Signature Talent Table

A **signature talent** directly enables an archetype's core fantasy — the one talent a player of that archetype considers mandatory, available at R1 in their pillar skill.

| Archetype | Pillar | Signature Talent(s) | In Pillar? | Status |
|-----------|--------|---------------------|------------|--------|
| Apothecary | Crafting | None | — | ❌ Missing |
| Barbarian | Fighting | Battle Rage (Fortitude) | No | ⚠️ Support skill |
| Bard | Mysticism | None | — | ❌ Missing |
| Brawler | Fighting | Pugilist, Martial Artist | ✅ Yes | ✅ Good |
| Champion | Fighting | Mystic Champion (Mysticism) | No | ⚠️ Support skill |
| Druid | Mysticism | Shape Changer | ✅ Yes | ✅ Good |
| Duelist | Fighting | Defensive Dueling, Riposte | ✅ Yes | ✅ Good |
| Engineer | Crafting | None | — | ❌ Missing |
| Fighter | Fighting | Art of Fighting, weapon masteries | ✅ Yes | ✅ Good |
| Gladiator | Fighting | Grappler (Athletics) | No | ⚠️ Support skill |
| Hoplite | Fighting | Shield Mastery, Polearm Mastery | ✅ Yes | ⚠️ No zone control |
| Magus | Arcana | Battle Mage, Spellblade | ✅ Yes | ✅ Good |
| Monk | Fighting | Pugilist, Martial Artist | ✅ Yes | ✅ Good |
| Oracle | Mysticism | None | — | ❌ Missing |
| Priest | Mysticism | Pact of Devotion | ✅ Yes | ✅ Good |
| Ranger | Archery | Sharpshooter | ✅ Yes | ✅ Good |
| Rogue | Fighting | Assassination (Stealth) | No | ⚠️ Support skill |
| Shaman | Mysticism | Divine Sense | ✅ Yes | ⚠️ No spirit medium talent |
| Slinger | Archery | Expert Slinger | ✅ Yes | ✅ Good |
| Sorcerer | Arcana | Wild Overload, Spellweaver | ✅ Yes | ✅ Good |
| Summoner | Arcana | None | — | ❌ Missing |
| Swashbuckler | Fighting | Swashbuckler (Streetwise) | No | ⚠️ Support skill |
| Tamer | Fighting | Animal Companion (Nature) | No | ⚠️ No whip talent |
| Warlock | Arcana | None | — | ❌ Missing |
| Warlord | Fighting | Commander (Education) | No | ⚠️ Support skill |

**Score:** 6 archetypes missing entirely; 8 have signatures in support skills (functional); 11 have strong pillar coverage.

### 7.2 R1 Signature Design Principles

1. **Unlock, don't master.** R1 opens the door — not full power.
2. **One clear mechanical change.** Exactly one new capability.
3. **Fixed bonuses, not scaling.** Never "+Skill Rank" at R1. Small fixed values (+1, +2, one reroll).
4. **No party-wide effects at R1.** Team buffs start at R2 earliest.
5. **Clear restrictions stated.** Weapon type, armor limit, stance requirement.

**Anti-patterns at R1:** "+Skill damage"; unlimited party buffs; multiple unrelated effects; removal of core system penalties.

### 7.3 Exclusivity Groups

**Group 1: Unarmored Defense Source**
Body of Bronze (Fortitude — conditioning) and Armor of the Faithful (Mysticism — faith) are mutually exclusive by armor bonus stacking. Make this explicit in the talent text.

**Group 2: Arcane Power Source**
A proposed Eldritch Pact and Wild Overload should be mutually exclusive — structured patron power vs. chaotic wild magic are incompatible identities. Eldritch Pact and Arcane Spell Knowledge are compatible.

**Group 3: Spell Infusion Style**
Battle Mage + Spellblade (Arcana) are compatible — different playstyles. Heavy TP investment rewards specialization.

---

## 8. Talent Progression Framework

### 8.1 Three-Path System

Every talent follows exactly one of three paths — designer decision, binding. No talent may stop at R4.

| Path | Ranks | Purpose | Examples |
|------|-------|---------|---------|
| **Signature (R1–R5)** | 1, 2, 3, 4, 5 | Core archetype identity. Career talent growing from Novice to Grandmaster. Exactly 11 designated (see §8.3). | Art of Fighting, Pact of Devotion, Animal Companion |
| **Basic (R1–R3)** | 1, 2, 3 | Standard talents — playstyle fully unlocked at Expert tier. Default for new talents (~112 existing). | Blade Mastery, Evasion, Born Haggler |
| **High-Level (R4–R5)** | 4, 5 only | Prestige talents — only at Master/Grandmaster tier. New options that can't exist at lower ranks. May have cross-skill prerequisites. | New designs — see §8.4–8.5 |

### 8.2 The Rank 4–5 Gap

| Skill Rank | XP Invested | TP Available | Usable TP (current content) | Unspendable |
|------------|-------------|--------------|------------------------------|-------------|
| R3 (Expert) | 12 | 6 | 6 | 0 |
| R4 (Master) | 18 | 9 | ~7–8 | 1–2 |
| R5 (Grandmaster) | 24 | 12 | ~7–8 | 4–5 |

**Impact:** High-level characters accumulate unspendable TP. Leveling up from R4 to R5 provides zero talent benefit in most skills.

### 8.3 The Eleven Signature Talents (R1–R5 — closed list)

> Battle Rage promoted to the signature list by owner ruling 2026-07-17 (during the P0.2 rework): it is the Barbarian's core career talent and must fill R4–R5. List grew 10 → 11.

| Skill | Signature Talent | Archetype(s) Served | Current Status |
|-------|-----------------|---------------------|----------------|
| Fighting | Art of Fighting | Fighter, Gladiator, Hoplite | R4 complete; needs R5 |
| Fighting | Martial Artist | Monk, Brawler | R3 complete; needs R4–R5 |
| Archery | Art of Archery | Ranger, Slinger | R4 complete; needs R5 |
| Arcana | Arcane Spell Knowledge | Sorcerer, Summoner | R4 complete; needs R5 |
| Arcana | Battle Mage | Magus | R4 complete; needs R5 |
| Mysticism | Mystical Spell Knowledge | Priest, Druid, Shaman | R4 complete; needs R5 |
| Mysticism | Pact family (Glory, Piety, Protection, Vengeance) | Champion | Split into four standalone talents, R1–R3 published (P0.2b, 2026-07-17); counts as one signature slot. Each needs R4–R5 (P4, four small designs) |
| Fortitude | Hard to Kill | Barbarian, Fighter | R3 complete; needs R4–R5 |
| Fortitude | Battle Rage | Barbarian | R1–R3 rework published (P0.2, 2026-07-17); needs R4–R5. Seeds: chosen-cost Fatigue push (extra action, pay 1 Fatigue when the rage ends), +6 rider step, temp HP step to 10 |
| Nature | Animal Companion | Tamer, Druid | R3 complete; needs R4–R5 |
| Lore | Magical Sense | Warlock, Sorcerer | R4 partial (???); needs R4 completion + R5 |

### 8.4 R4–R5 Design Templates

**Rank 4 — Encounter-Shaping:**

| Template | Pattern | Example |
|----------|---------|---------|
| Scope Expansion | Single-target → multi-target | Shield Mastery R4: shield bonus extends to adjacent allies |
| Action Economy | Full Action → Quick Action | Second Wind R4: use as Quick Action once per day |
| Reliability | Conditional → consistent | Evasion R4: usable even when surprised or restrained |
| System Bridge | Combat → Challenge/Travel | Disciplined Fighter R4: add Fighting to Fortitude in challenges |
| Recovery | Mitigate → reverse | Hard to Kill R4: survive at 1 HP when reduced to 0 HP (1/day) |

**Rank 5 — Session-Defining:**

| Template | Pattern | Example |
|----------|---------|---------|
| Legendary Action | Once per day, dramatic effect | Art of Fighting R5: treat any Fighting roll as Critical Success |
| Permanent Enhancement | Passive mundane mastery | Sharpshooter R5: no banes from range/cover/weather on ranged attacks |
| Narrative Authority | Player-directed story impact | Tactician R5: once per session, declare tactical insight (GM adjudicates) |
| Capstone Synergy | Combine two talent lines | Battle Mage R5: cast a spell and make a weapon attack as one Action |
| Grandmaster Signature | Unique pinnacle ability | Martial Artist R5: unarmed strikes count as magic weapons; 6 weapon damage |

### 8.5 High-Level Talent Proposals (R4–R5 only)

**Single-skill capstones** (simpler; no prerequisites; 1–2 per skill):

| Skill | New R4–R5 Talent | Design Focus |
|-------|-----------------|--------------|
| Fighting | Warlord's Presence | Allies in close range gain +1 boon; once/scene coordinated strike |
| Archery | Overwatch | Reaction attacks against creatures moving in line of sight |
| Arcana | Arcane Mastery | Reduce spell cost by 1 for rank-0 and rank-1 spells |
| Mysticism | Divine Authority | +1 SL step for one mystic spell per scene |
| Athletics | Supernatural Mobility | Complete existing stub: wall-run, long jump, extreme fall mitigation |
| Fortitude | Unbreakable | Once per day, become briefly immune to all conditions |
| Influence | Presence of Conquest | Complete existing stub: fear aura vs. all nearby enemies |
| Insight | Foresight | Complete existing stub: predictive defense, preview next round |
| Perception | Perfect Awareness | No creature within short range can be hidden from you |
| Stealth | Master of Shadows | Vanish mid-combat as an Action; re-enter stealth from any cover |
| Education | Grand Strategist | Once per scene, declare one creature's next action before they roll |
| Crafting | Master Artisan | Complete existing stub: create Quality 4–5 items |
| Nature | Primal Bond | Communicate complex ideas with any animal; terrain manipulation |
| Survival | Apex Predator | Unerringly follow quarry once per journey; trap mastery upgrade |
| Streetwise | Kingpin | Establish contact in any settlement; one major favor per arc |
| Lore | Arcane Repository | Recall any magical knowledge without rolling; identify all active spells in short range |

**Cross-skill prestige talents** (richer; requires prerequisites; archetype-specific):

| Prestige Talent | Prerequisites | Archetype | Effect |
|----------------|---------------|-----------|--------|
| **Phalanx Commander** | Fighting 3, Influence 3 | Hoplite/Warlord | Adjacent shield-bearers +1 AV; once/scene coordinated strike |
| **Iron Tempest** | Fighting 3, Athletics 3 | Barbarian/Gladiator | Free attack on killing blow; once/day fighting fury |
| **Blade Dancer** | Fighting 3, Stealth 3 | Duelist/Swashbuckler | Move after hit without OA; once/scene counter-attack on dodge |
| **Predator's Mark** | Archery 3, Survival 3 | Ranger | Mark target: +1 boon, ignore half cover |
| **Siege Engineer** | Archery 3, Crafting 3 | Engineer | Construct siege devices; thrown contraptions with area effect |
| **Song of Power** | Mysticism 3, Influence 3 | Bard | Performance grants allies +1 boon; R2 imposes −1 bane on enemies |
| **Prophetic Sight** | Mysticism 3, Insight 3 | Oracle | Daily prophetic trance; R2 Resolve-spend re-roll for allies |
| **Beast Bond** | Nature 3, Survival 3 | Tamer/Druid | Companion +1 all attributes; R2 acts independently |
| **Underworld Contact** | Streetwise 3, Influence 3 | Rogue | Black market access; one free favor per visit |
| **Master Alchemist** | Crafting 3, Nature 3 | Apothecary | Double alchemy batch yield; R2 effects increase by one tier |

**Recommendation:** Use both. Each skill gets 1–2 single-skill capstones (accessible without prerequisites) AND 1–2 prestige talents (archetype-specific, rewards cross-skill investment).

---

## 9. Implementation Roadmap (v2.1 — re-sequenced 2026-07-17)

> **Revision note:** This roadmap supersedes the v2 phase plan after a challenge review. Key changes:
>
> 1. **Balance fixes to live talents now come first.** The §4.5/§4.6/§6.3 recommendations were previously absent from every phase — new content would have been balanced against a broken baseline.
> 2. **Rank 5 spell access promoted to top priority.** Rank 5 arcane and mystic spells are now published, but Arcane Spell Knowledge and Mystical Spell Knowledge still cap at "rank 4 or lower" — there is currently no legal way to learn a rank 5 spell.
> 3. **Former Phases 1b and 2 merged.** The undersized-skill additions and the system-integration talents are largely the same designs (Road Warden and Streetwise Informant ARE the Streetwise expansion, Pathfinder and Dogged Pursuit ARE the Survival expansion). One design pass per skill, not two.
> 4. **Archetype signature work gated behind a spell-catalog re-audit.** The signature gap list (§3.2) predates the full spell expansion; several gaps (Summoner, Warlock, Oracle, Bard) may be partially closed spell-side.
> 5. **High-rank program cut to demand-driven scope.** The blanket plan (1–2 capstones for all 16 skills plus 10–15 prestige talents, up to ~47 high-rank designs) overstates the dead zone: TP always has breadth sinks in large skills; literal TP exhaustion only occurs in small skills. Priority goes to pillar skills and TP-exhausted skills.
> 6. **Per-skill workbenches (`skills/<skill>.md`) are now the finer-grained source.** Several proposals below already have full drafts there — those items are review-and-promote, not design-from-scratch.
>
> Subsection numbering within §9 changed in this revision. External references to old §9.x subsections may be off by one phase.

### 9.1 P0 — Baseline Fixes (immediate, before any new design)

> **STATUS: P0.1–P0.4 and P0.2b PUBLISHED 2026-07-17** (docs, talents.json, general-rulings, skill references; Notion sync in the same batch). Pact of Devotion split into four standalone talents (Glory, Piety, Protection, Vengeance) per P0.2b. Draft records in `.drafts/talents/p0-*.md`.

**P0.1 — Rank 5 spell access (live blocker):**

| Talent | Skill | Action |
|--------|-------|--------|
| Arcane Spell Knowledge | Arcana | Design R5: +2 Focus, learn two rank 5 or lower spells |
| Mystical Spell Knowledge | Mysticism | Design R5: +2 Focus, learn two rank 5 or lower spells |

**P0.2 — Balance pass on live talents.** Apply the §6.3 redesigns and §4.6 AV caps: Inspire Ally, Insult to Injury, Identify Weakness, Battle Rage, Escape Artist R3 (verified still "Your Movement is unprovoked" — unlimited passive; change to once between turns), General Education R1, Assassination R1+R3 stack, Body of Bronze, Armor of the Faithful, Mana Shield, Pact of Devotion effect count.

**P0.3 — Fixed-bonus conversion.** Apply the §4.5 fixed bonus table to the internally scaling talents (28 total; the 15 damage-scaling talents first — verified still live, e.g. Expert Slinger R2 and Martial Artist R3 "+skill to damage").

**Rationale for ordering:** every talent designed in later phases is validated by comparison against published neighbors. Fixing the baseline first prevents new content from inheriting the scaling and limit anti-patterns.

### 9.2 P1 — Complete Incomplete Talents

**P1.1 — Nine partial talents** (recommendations pre-approved in this analysis; cheap wins):

| Talent | Skill | Action Required |
|--------|-------|----------------|
| Plant Lore R3 | Nature | Complete Rank 3 (plant identification, terrain interaction) |
| Knowledgeable Wanderer R3 | Nature | Recommended: "+2 HP. When you succeed on any travel role roll, the party gains +1 progress (once per day)" |
| Magical Sense R4 | Lore | Recommended: long range + identify active spell schools on creatures |
| Roguish Wits R3 | Stealth | Recommended: Patience die doesn't tick on successful deception (1/scene) |
| Sleight of Hand R3 | Stealth | Recommended: planted evidence grants +1 boon on Leverage/Deceive; stolen document reveals Motivation/Pitfall |
| I Know A Guy R2–R3 | Streetwise | R2: intelligence gathering; R3: contact in previously-unvisited settlements at lower SL |
| Explorer of Nature R3 | Survival | Third chosen environment + enhanced exploration. Also fix R2 wording: "Encounter Die" → current Travel Event Table terminology |
| Relentless Tracker R2–R3 | Survival | R2: quarry information details on success; R3: +1 boon, never lose trail (1/scene recovery) |
| Wilderness Expert R3 | Survival | Recommended: warming meal or trail mix (boon vs. weather OR Supply Check advantage) |

**P1.2 — Five uncontested stubs** (design as Basic R1–R3):

| Talent | Skill | Direction |
|--------|-------|-----------|
| Adrenaline Rush | Fortitude | Damage-triggered benefits, temp HP surge |
| Performer | Influence | Entertainment, crowd effects (Bard support) |
| Divine Favor | Mysticism | Prayer benefits, daily Favor pool for Priest/Champion |
| Herbalist | Nature | Remedy creation (Apothecary support) |
| Master Artisan | Crafting | Prerequisite: Artisan R3; Quality 4–5 items |

**P1.3 — Three contested stubs (owner decision required before design):**

Supernatural Mobility (Athletics), Presence of Conquest (Influence), and Foresight (Insight) carry contradictory instructions: the v2 Phase 1a said "Design R1–R3" while §8.5 lists them as High-Level R4–R5 capstones. The three-path rule (§8.1) allows only one. Additionally, all three are framed as supernatural abilities ("supernatural jumps", conqueror's aura, "instinctively predicting the future"), which conflicts with the R5 principle that Grandmaster abilities are mortal pinnacle, never supernatural.

Per stub, the owner must decide: (a) progression path — Basic R1–R3 or High-Level R4–R5, and (b) power framing — re-scope to peak-mortal capability, or explicitly justify a supernatural exception (e.g. mystic-empowered flavor). Design work on these three is blocked until decided.

### 9.3 P2 — Merged Expansion Pass (replaces former Phases 1b and 2)

**Goal:** minimum 8 complete talents per skill AND 15+ direct-interaction talents per modern system, achieved in **one design pass per undersized skill**, driven by that skill's workbench (`skills/<skill>.md`). The system-integration proposals (§5.4, §5.7) and defensive proposals (§3.5) are the raw material for these passes, not a separate phase.

Order by severity:

| Order | Skill | Complete Now | Target | Anchor Proposals (workbench has details) |
|-------|-------|--------------|--------|------------------------------------------|
| 1 | **Streetwise** | 3 | 8–9 | Infiltration/lockpicking, forgery, Road Warden, Streetwise Informant; I Know A Guy completion counts |
| 2 | **Survival** | 3 | 8–9 | Pathfinder, Dogged Pursuit; P1.1 completions count |
| 3 | **Insight** | 4 | 8–9 | Read the Room, Deflecting Presence, prophecy space (pending P1.3 Foresight decision) |
| 4 | **Perception** | 5 | 8–9 | Combat Instincts, Keen Observer, Cartographer's Eye |
| 5 | **Stealth** | 4 | 8–9 | Shadow Slip, infiltration (shared tag with Streetwise); P1.1 completions count |
| 6 | **Influence** | 5 | 9–10 | Silver Tongue; Performer counts (P1.2) |

**Riding along in the same passes** (skills not undersized, but proposals fill the critical redirection/avoidance gap): Desperate Gambit (Athletics), Arcane Warding (Arcana), Guardian's Oath (Mysticism), Trailblazer (Athletics), Expedition Leader + Methodical Research (Education), Seasoned Forager (Nature).

Several of these proposals already have full mechanical drafts in the workbenches (e.g. Read the Room, Deflecting Presence in `skills/insight.md`). For those, the work is: re-validate against the P0-corrected baseline and current design principles, then promote through the draft → approval → publication pipeline.

### 9.4 P3 — Archetype Signature Re-Audit (gate before signature design)

The §3.2 gap list (Bard, Engineer, Oracle, Summoner, Warlock, Apothecary lacking signatures) predates the full spell expansion. Conjuration, telepathy, necromancy, death, peace and other schools now carry substantial archetype identity spell-side.

1. **Audit first:** re-check each of the 6 archetypes against the current spell catalog and the talents added in P1/P2. A caster archetype whose identity is fully expressed through spells plus Spell Knowledge lines may need no dedicated talent at all.
2. **Then design targeted R1–R3 signatures** only where a gap survives. Expected survivors: **Apothecary** and **Engineer** (Crafting pillar — no spell support exists for Crafting), possibly the Bard performance angle beyond the Performer talent.
3. **Signatures enter at R1** in the pillar skill. The old plan's cross-skill R4+ prestige talents do not solve signature gaps — a level-1 Oracle needs an entry point, not a Master-tier capstone.

### 9.5 P4 — High-Rank Progression (scoped)

**P4.1 — Extend the eleven signature talents to R4–R5** (the real dead-zone fix for pillar skills):

| Signature Talent | Status | Action |
|----------------|--------|--------|
| Arcane Spell Knowledge | R4 complete | R5 moved to **P0.1** (live blocker) |
| Mystical Spell Knowledge | R4 complete | R5 moved to **P0.1** (live blocker) |
| Battle Mage | R4 complete | Design R5: cast spell + weapon attack in one Action |
| Art of Fighting | R4 complete | Design R5: once/day treat Fighting roll as Critical Success |
| Art of Archery | R4 complete | Design R5: once/day treat Archery roll as Critical Success |
| Martial Artist | R3 complete | Design R4: 5 WD + stun on hit; R5: magic weapon, 6 WD |
| Pact family (Glory, Piety, Protection, Vengeance) | R1–R3 published as four talents (P0.2b) | Design R4–R5 per pact: enhancement + pinnacle ability, four small designs |
| Hard to Kill | R3 complete | Design R4: survive at 1 HP (1/day); R5: refuse death once per day |
| Animal Companion | R3 complete | Design R4: companion acts independently; R5: +1 all attributes |
| Magical Sense | R4 partial | Fix R4 (???): long range + school identification; design R5: permanent passive detection |

**P4.2 — New High-Level R4–R5 talents, demand-driven scope.** NOT 1–2 capstones for all 16 skills. Start with ~6–8 designs covering:

- **Pillar skills** where Grandmaster investment is most common: Fighting, Archery, Arcana, Mysticism, Fortitude.
- **TP-exhausted small skills** where a Grandmaster literally runs out of rank-slots (Streetwise pre-P2: 4 talents × 3 ranks = 12 slots = exactly 12 TP). Re-check exhaustion after P2 lands — expansion may already solve it.

Rationale for the cut: the "dead zone" is overstated for large skills. Fighting offers ~40 rank-slots against 12 TP — spending is always possible, it just lacks rank-appropriate excitement. The signature extensions (P4.1) address that feel for the builds that actually reach Grandmaster. Blanket 16-skill R5 coverage is content inflation without demand.

**P4.3 — Acceptance criterion for martial R4–R5 designs:** interact with supreme Combat Arts (reduced costs, enhanced effects, new combinations) — the Appendix C gap. High-rank martial talents that ignore Combat Arts waste the system's existing high-level hook.

### 9.6 Deferred / Cut

| Item | Status | Reason |
|------|--------|--------|
| Blanket prestige-talent program (old Phase 4: 10–15 cross-skill designs) | Deferred | Revisit after P4 lands and play data exists. §8.5 prestige proposals remain a design pool. Signature gaps are handled by P3 at R1, not by prestige talents |
| "Total talents 195–210" metric | Cut | Count inflation as a goal contradicts the §3.1 finding that Fighting is over-served and combat over-represented |
| "All 16 skills with Rank 5" metric | Cut | See P4.2 rationale — demand-driven, not blanket |

### 9.7 Success Metrics (revised)

| Metric | Current (v2 audit) | After P0–P1 | After P2–P3 | Final Target |
|--------|-------------------|-------------|-------------|--------------|
| Rank 5 spells learnable via talents | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| Over-performing talents (§4.3 list) unfixed | 5+ | 0 | 0 | 0 |
| Damage-scaling talents converted to fixed bonuses | 0/15 | 15/15 | 15/15 | 15/15 |
| Stub/incomplete talents | 17 | ≤3 (P1.3 pending decision) | 0 | 0 |
| Min complete per skill | 3 (Survival, Streetwise) | 3 | 8 | 8 |
| Challenge-interactive | ~5 direct | ~7 | 15+ | 15+ |
| Social Intrigue-interactive | ~8 direct | ~10 | 15+ | 15+ |
| Travel-interactive | 4 direct | ~8 | 15+ | 15+ |
| Defensive redirection % | ~1% | ~1% | 5–10% | 5–10% |
| Archetypes with viable identity path (talent OR spell-side, per P3 audit) | 14/25 | 16/25 | 22/25 | 25/25 |
| Signature talents at R5 | 0/10 | 2/10 (Spell Knowledge lines) | 2/10 | 10/10 |
| High-level (R4–R5) capstones beyond signatures | 0 | 0 | 0 | 6–8 |

---

## 10. References

### Authoritative Sources

| Document | Location | Contents |
|----------|----------|----------|
| Talent design skill | `.claude/skills/talent-design/SKILL.md` | Creation workflow, validation checklist, anti-patterns, publication pipeline |
| Skill themes & archetypes | `.claude/skills/talent-design/references/skill-themes.md` | Bonus types, role spreads, all 25 archetypes with identity tags |
| Published talent files | `docs/03-statistics/06-talents/<skill>.md` | Single source of truth for all live talent text |
| Conditions | `docs/05-combat/04-conditions.md` | Official condition keyword list |
| Effect durations | `docs/06-scenes/02-effect-durations.md` | briefly/short/medium/long/very long definitions |
| Challenge system | `docs/06-scenes/07-challenges/00-overview.md` | Challenge die, TN, skill-once rule, consequences |
| Social Intrigue | `docs/06-scenes/07-challenges/01-social-intrigue.md` | Interest, Patience, Motivations, Pitfalls, social actions |
| Travel system | `docs/06-scenes/07-challenges/02-travel.md` | Roles, terrain modifiers, checkpoints, events |

### Former Side Documents (superseded by §5)

- `CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md` — Preserved for full mechanical write-ups of 6 proposed talents (Silver Tongue, Read the Room, Keen Observer, Streetwise Informant, Dogged Pursuit, Methodical Research) and 4 talent completions (Relentless Tracker, I Know A Guy, Roguish Wits, Sleight of Hand). §5 of this document contains all design conclusions.
- `TRAVEL_TALENT_INTEGRATION.md` — Preserved for full mechanical write-ups of 6 proposed talents (Pathfinder, Trailblazer, Cartographer's Eye, Expedition Leader, Road Warden, Seasoned Forager) and 4 talent completions (Explorer of Nature, Knowledgeable Wanderer, Wilderness Expert, Relentless Tracker). §5 of this document contains all design conclusions.

### Per-Skill Workbenches

All 16 exist at `docs/analysis/talents/skills/<skill>.md`. Each covers: talent-by-talent inventory with role classification, skill-specific gap analysis and archetype support mapping, full write-ups of proposed new talents (several P2 roadmap items are fully drafted there), and validation results per existing talent. For skill-level priorities, the workbench supersedes this document where they disagree.

---

## Appendix A: Skill-by-Skill Talent Inventory

Verified from source files, 2026-07 audit.

**Fighting (14 talents — 14 complete)**
Art of Fighting (R4), Axe Mastery (R3), Blade Mastery (R3), Defensive Dueling (R3), Disciplined Fighter (R3), Dual Wielder (R3), Heavy Weapon Mastery (R3), Mace Mastery (R3), Martial Artist (R3), Polearm Mastery (R3), Protective Stance (R3), Pugilist (R3), Riposte (R3), Shield Mastery (R3)

**Fortitude (11 talents — 10 complete, 1 stub)**
Adrenaline Rush (**stub**), Battle Rage (R3), Body of Bronze (R3), Drunken Technique (R3), Explorer's Tenacity (R3), Hard to Kill (R3), Heavy Armor Mastery (R3), Juggernaut (R3), Second Wind (R3), Strong Mind (R3), Tough Stomach (R3)

**Mysticism (11 talents — 10 complete, 1 stub)**
Armor of the Faithful (R3), Communal Practices (R3), Divine Favor (**stub**), Divine Rites (R3), Divine Sense (R3), Elemental Adept (R3), Master of Principles (R3), Mystic Champion (R3), Mystical Spell Knowledge (R4), Pact of Devotion (R3), Shape Changer (R3)

**Archery (9 talents — 9 complete)**
Ammo Specialist (R3), Art of Archery (R4), Crossbow Mastery (R3), Disciplined Archer (R3), Expert Slinger (R3), Rapid Shot (R3), Reflexive Shooter (R3), Sharpshooter (R3), Strong Grip (R3)

**Athletics (9 talents — 8 complete, 1 stub)**
Athletic Movement (R3), Bulky (R3), Escape Artist (R3), Evasion (R3), Fast Stride (R3), Grappler (R3), Light Armor Mastery (R3), Stand Your Ground (R3), Supernatural Mobility (**stub**)

**Nature (8 talents — 5 complete, 3 incomplete)**
Animal Companion (R3), Beast Lore (R3), Expert Rider (R3), Field Medic (R3), Herbalist (**stub**), Knowledgeable Wanderer (R3, **R3 TODO**), Plant Lore (R3, **R3 XXX**), Poison Maker (R3)

**Arcana (8 talents — 8 complete)**
Arcane Spell Knowledge (R4), Battle Mage (R4), Inexhaustible Mind (R3), Mana Shield (R3), Master of Fundamentals (R3), Spellblade (R3), Spellweaver (R3), Wild Overload (R3)

**Influence (7 talents — 5 complete, 2 stubs)**
Born Haggler (R3), Fast Talking (R3), Inspire Ally (R3), Insult to Injury (R3), Leading Presence (R3), Performer (**stub**), Presence of Conquest (**stub**)

**Education (6 talents — 6 complete)**
Commander (R3), Diplomat (R3), Eloquent Talker (R3), General Education (R3), Linguist (R3), Tactician (R3)

**Lore (6 talents — 5 complete, 1 partial)**
Channel Superstition (R3), Consult the Myths (R3), Divine Scholar (R3), Identify Artifact (R3), Mage Hunter (R3), Magical Sense (R4, **R4 ???**)

**Crafting (6 talents — 5 complete, 1 stub)**
Artisan (R3), Efficient Worker (R3), Maintenance (R3), Master Artisan (**stub**), Peak Performance (R3), Quick Construction (R3)

**Stealth (6 talents — 4 complete, 2 partial)**
Assassination (R3), Devious Tactics (R3), Hidden Strike (R3), Leading the Way (R3), Roguish Wits (R3, **R3 XXX**), Sleight of Hand (R3, **R3 XXX**)

**Survival (6 talents — 3 complete, 3 partial)**
Explorer of Nature (R3, **R3 XXX**), Makeshift Artisan (R3), Monster Hunter (R3), Relentless Tracker (R3, **R2–3 XXX**), Trap Maker (R3), Wilderness Expert (R3, **R3 XXX**)
> *Note: v1 analysis listed 7 talents. Direct file audit finds 6. No 7th talent exists in the current file.*

**Perception (5 talents — 5 complete)**
Blind Senses (R3), Danger Sense (R3), Dungeon Delver (R3), Eagle Eye (R3), Identify Weakness (R3)

**Insight (5 talents — 4 complete, 1 stub)**
Empath (R3), Foresight (**stub**), Intuitive Appraisal (R3), Piercing Look (R3), Sense of Deduction (R3)

**Streetwise (4 talents — 3 complete, 1 partial)**
I Know A Guy (R3, **R2–3 XXX**), Jack of All Trades (R3), Swashbuckler (R3), Thug Tactics (R3)

---

## Appendix B: Archetype-to-Talent Cross-Reference

| Archetype | Pillar | Support 1 | Support 2 | Support 3 | Complete Talents Accessible | Critical Missing |
|-----------|--------|-----------|-----------|-----------|----------------------------|-----------------|
| Apothecary | Crafting | Education | Nature | Insight | ~24 | Alchemy, tinctures, remedies |
| Barbarian | Fighting | Athletics | Fortitude | Survival | ~39 | — |
| Bard | Mysticism | Influence | Education | Stealth | ~28 | Music magic, performance signature |
| Brawler | Fighting | Fortitude | Streetwise | Athletics | ~36 | — |
| Champion | Fighting | Mysticism | Influence | Fortitude | ~41 | — |
| Druid | Mysticism | Nature | Survival | Lore | ~29 | — |
| Duelist | Fighting | Athletics | Stealth | Influence | ~33 | Feint mechanics |
| Engineer | Crafting | Education | Archery | Perception | ~24 | Contraptions, siege devices |
| Fighter | Fighting | Athletics | Fortitude | Influence | ~39 | Zone control |
| Gladiator | Fighting | Athletics | Influence | Fortitude | ~39 | — |
| Hoplite | Fighting | Athletics | Influence | Fortitude | ~39 | Formation, zone control |
| Magus | Arcana | Fighting | Education | Lore | ~32 | — |
| Monk | Fighting | Athletics | Fortitude | Mysticism | ~43 | — |
| Oracle | Mysticism | Lore | Insight | Education | ~25 | Prophecy, omens, foresight |
| Priest | Mysticism | Education | Influence | Fighting | ~36 | — |
| Ranger | Archery | Survival | Nature | Insight | ~26 | Advanced tracking |
| Rogue | Fighting | Stealth | Streetwise | Insight | ~25 | Infiltration, lockpicking |
| Shaman | Mysticism | Nature | Lore | Insight | ~27 | Spirit medium |
| Slinger | Archery | Athletics | Stealth | Survival | ~28 | — |
| Sorcerer | Arcana | Lore | Education | Insight | ~23 | — |
| Summoner | Arcana | Education | Lore | Insight | ~23 | Summon/conjure mechanics |
| Swashbuckler | Fighting | Athletics | Stealth | Influence | ~33 | — |
| Tamer | Fighting | Nature | Athletics | Survival | ~35 | Whip control, beast training |
| Warlock | Arcana | Lore | Insight | Fortitude | ~27 | Pact, curses, familiar |
| Warlord | Fighting | Influence | Education | Fortitude | ~36 | Formation commands |

---

## Appendix C: Combat Arts Interaction

| Interaction Type | Examples | Count |
|-----------------|----------|-------|
| **Enable access** | Art of Fighting (basic CAs), Art of Archery (basic CAs) | 2 |
| **Enable Supreme CA access** | Art of Fighting R3, Art of Archery R3 | 2 |
| **Enhance specific CAs** | Weapon mastery talents (damage/properties per weapon type) | 6 |
| **Complement CAs** | Disciplined Fighter (reliability), Rapid Shot (action economy) | 8 |
| **Substitute for CAs** | Grappler (grapple options), Dual Wielder (off-hand attacks) | 3 |

**Gap:** No talent currently enhances or modifies supreme Combat Arts beyond unlocking access. R4–R5 talents should interact with supreme CAs (reduced costs, enhanced effects, new combinations) as they represent the techniques only a master could develop.
