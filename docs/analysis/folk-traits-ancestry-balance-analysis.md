# Folk Traits & Ancestry Balance — Design Analysis

> **Scope:** Mechanical balance of the 12 playable folk (Dwarf, Elf, Gnome, Hune, Orc, Goblin, Human, Catfolk, Lizardfolk, Minotaur, Dogfolk, Satyr). Covers ability budgets, combat value, utility breadth, archetype dominance, trade-offs, thematic fit, and the feasibility of culture-dependent abilities.

---

## 1. Executive Summary

### Key Findings

1. **No folk provide attribute modifiers — balance is entirely ability-driven.** All characters start with d6/d6/d6/d6 (one raised to d8, one lowered to d4). Folk differentiation comes exclusively from innate abilities, making ability budget the sole axis of folk balance.

2. **Ability counts vary from 2 to 3 per folk, but "budget weight" varies more.** Hune and Orc have only 2 abilities each, while Dwarf, Gnome, Goblin, Catfolk, Lizardfolk, Minotaur, Dogfolk, and Satyr have 3. However, individual ability power varies significantly — Lizardfolk's Thick Scales (+3 AV unarmored) is worth more than most single abilities.

3. **Lizardfolk and Minotaur are the strongest generalist folk.** Lizardfolk's +3 AV (unarmored) is equivalent to chain mail without load, rigid, or heavy penalties. Minotaur combines Giant's Blood (+2 HP, +2 carry, easier heavy weapons) with a 3-damage natural weapon and the powerful Goring Charge (double weapon damage on charge). Both folk provide strong combat value with no meaningful trade-offs.

4. **Elf and Dogfolk are the weakest mechanically.** Elf's Fleet-Footed (+1 Movement, once per combat) and Spiritual Symbiosis (reduced sleep in wilderness) are narrow and situational. Dogfolk's Keen Senses is utility-only and Pack Loyalty is once per scene with a restrictive trigger. Both folk lack reliable combat-relevant abilities.

5. **Human is the strongest caster folk by a wide margin.** Arcane Awakening (+2 Focus, catalyst-free casting) is a permanent, always-on resource boost with no equivalent for any other folk. Combined with the universally powerful Will of Perseverance (re-roll any test, once/day), Human dominates every Arcana-based archetype.

6. **Small folk (Gnome, Goblin) pay a steep mechanical tax.** Small Stature restricts versatile and heavy weapon use — a significant combat limitation — while granting only +1 boon on stealth rolls. The trade-off is unfavorable compared to medium folk who get stronger combat abilities without restrictions.

7. **Natural weapons vary dramatically in value.** Lizardfolk Jaws (3 damage, crush) and Minotaur Horns (3 damage, crush) are substantially better than Catfolk Claws (2 damage, light, slash), Dogfolk Bite (2 damage, crush), and Satyr Horns (2 damage, crush). The 3-damage weapons match or exceed many starting manufactured weapons.

8. **Defensive abilities cluster unevenly.** Dwarf (Stoneskin +1 AV, Squat Build anti-push), Lizardfolk (Thick Scales +3/+1 AV), and Hune (Stoic Mind +1 Resist) are the only folk with permanent passive defenses. Most folk have zero defensive abilities, creating a stark survivability gap.

9. **Folk traits broadly reinforce cultural identities but with uneven depth.** Dwarf (stone affinity, resilience), Lizardfolk (aquatic reptile), and Orc (fierce warrior) read clearly. Elf's spiritual connection is mechanically thin. Human's arcane identity is strong but one-dimensional.

10. **Culture-dependent abilities are feasible and recommended.** A modular system where one of each folk's abilities varies by culture would increase build diversity, reduce "always optimal" folk picks, and deepen the cultural identity of each folk. Implementation is straightforward given the existing culture tables.

### Balance Tier Summary

| Tier | Folk | Rationale |
|------|------|-----------|
| **S (Strong)** | Lizardfolk, Human, Minotaur | Best-in-class combat defense (Lizardfolk), universal re-roll + caster dominance (Human), or exceptional combat package (Minotaur) |
| **A (Above Average)** | Dwarf, Hune, Orc | Solid passive defenses (Dwarf), reliable stat boosts (Hune), or high-impact combat spike (Orc) |
| **B (Average)** | Catfolk, Satyr, Goblin | Decent niche abilities with meaningful but not crippling limitations |
| **C (Below Average)** | Gnome, Elf, Dogfolk | Narrow or situational abilities, weak combat contribution, or steep mechanical taxes |

---

## 2. Ability Budget Comparison

### 2.1 Ability Inventory

Since no folk modify attributes, the entire mechanical identity of each folk rests on their innate abilities. The following table catalogs every ability by folk, categorized by primary role.

| Folk | Ability | Role | Combat Value | Utility Value | Always-On? | Usage Limit |
|------|---------|------|-------------|--------------|-----------|-------------|
| **Dwarf** | Dwarven Sight | Utility | Low | High | Yes | — |
| | Stoneskin | Defense | High | Medium | Yes | — |
| | Squat Build | Defense | Medium | Low | Yes | — |
| **Elf** | Night Vision | Utility | Low | Medium | Yes | — |
| | Fleet-Footed | Offense | Medium | Low | No | 1/combat |
| | Spiritual Symbiosis | Utility | None | Low | Yes | — |
| **Gnome** | Natural Empath | Utility | Low | High | Yes | — |
| | Scent of Illusions | Defense | Low | Medium | Yes | — |
| | Small Stature | Mixed | Negative | Low | Yes | — |
| **Hune** | Giant's Blood | Defense | Medium | Medium | Yes | — |
| | Stoic Mind | Defense | High | Low | Yes | — |
| **Orc** | Orcish Fury | Offense | High | None | Yes | — |
| | Pride above Death | Defense | High | None | No | 1/day |
| **Goblin** | Night Vision | Utility | Low | Medium | Yes | — |
| | Quick Escape | Defense | Medium | Low | No | 1/turn |
| | Small Stature | Mixed | Negative | Low | Yes | — |
| **Human** | Will of Perseverance | Support | High | High | No | 1/day |
| | Arcane Awakening | Support | High | High | Yes | — |
| **Catfolk** | Night Vision | Utility | Low | Medium | Yes | — |
| | Intimidating Roar | Control | Medium | Low | No | 1/combat |
| | Sharp Claws | Offense | Low | Low | Yes | — |
| **Lizardfolk** | Thick Scales | Defense | Very High | Low | Yes | — |
| | Aquatic Nature | Utility | None | Medium | Yes | — |
| | Reptile Jaws | Offense | Medium | Low | Yes | — |
| **Minotaur** | Giant's Blood | Defense | Medium | Medium | Yes | — |
| | Horns | Offense | Medium | Low | Yes | — |
| | Goring Charge | Offense | High | None | Yes | — |
| **Dogfolk** | Keen Senses | Utility | None | High | Yes | — |
| | Pack Loyalty | Support | Medium | None | No | 1/scene |
| | Bite | Offense | Low | Low | Yes | — |
| **Satyr** | Wild Resilience | Defense | High | Low | No | 1/scene |
| | Horns | Offense | Low | Low | Yes | — |
| | Woodland Stride | Utility | Low | Medium | Yes | — |

### 2.2 Ability Budget Scoring

To compare folk fairly, each ability is scored on a 0–3 scale for combat value and utility value, then summed into a total budget. Negative effects (Small Stature weapon restrictions) are scored as penalties.

**Scoring Criteria:**
- **0** = No meaningful impact in this category
- **1** = Situational or minor benefit
- **2** = Reliable, frequently useful benefit
- **3** = Major, always-on or encounter-shaping benefit

| Folk | Combat Score | Utility Score | Penalties | **Net Budget** |
|------|-------------|--------------|-----------|----------------|
| **Dwarf** | 4 (Stoneskin 2 + Squat 2) | 4 (Sight 3 + Stoneskin-poison 1) | 0 | **8** |
| **Elf** | 2 (Fleet-Footed 2) | 3 (Night Vision 2 + Symbiosis 1) | 0 | **5** |
| **Gnome** | 1 (Scent 1) | 5 (Empath 3 + Scent 2) | -2 (Small Stature) | **4** |
| **Hune** | 4 (Giant's Blood 2 + Stoic Mind 2) | 2 (carry capacity 1 + heavy weapons 1) | 0 | **6** |
| **Orc** | 5 (Fury 3 + Pride 2) | 0 | 0 | **5** |
| **Goblin** | 2 (Quick Escape 2) | 3 (Night Vision 2 + Stealth 1) | -2 (Small Stature) | **3** |
| **Human** | 4 (Perseverance 2 + Awakening 2) | 4 (Perseverance 2 + Awakening 2) | 0 | **8** |
| **Catfolk** | 3 (Roar 2 + Claws 1) | 2 (Night Vision 2) | 0 | **5** |
| **Lizardfolk** | 5 (Scales 3 + Jaws 2) | 2 (Aquatic 2) | 0 | **7** |
| **Minotaur** | 6 (Giant's Blood 2 + Horns 2 + Charge 2) | 2 (carry capacity 1 + heavy weapons 1) | 0 | **8** |
| **Dogfolk** | 2 (Pack Loyalty 1 + Bite 1) | 3 (Keen Senses 3) | 0 | **5** |
| **Satyr** | 3 (Wild Resilience 2 + Horns 1) | 2 (Woodland Stride 2) | 0 | **5** |

**Budget Range:** 3 (Goblin) to 8 (Dwarf, Human, Minotaur) — a 2.7× spread that indicates meaningful imbalance.

---

## 3. Combat Value Analysis

### 3.1 Passive Defenses

Passive, always-on defensive abilities are the most consistently valuable combat traits because they apply every round without resource expenditure.

| Folk | Passive Defense | Equivalent Value |
|------|----------------|-----------------|
| **Lizardfolk** | Thick Scales: +3 AV (unarmored) or +1 AV (armored) | Unarmored: equal to chain mail (Q2, 250 coins, 2 load, rigid 1). Armored: permanent +1 AV is equivalent to a Q4 magic armor bonus (1,000+ coins). |
| **Dwarf** | Stoneskin: +1 AV | Permanent +1 AV is equivalent to a Q4 magic armor bonus. Plus poison/illness resistance. |
| **Hune** | Stoic Mind: +1 Resist | Permanent +1 Resist affects every Spirit/Mind save. Equivalent to a dedicated enchantment. |
| **Dwarf** | Squat Build: anti-prone/push | Niche but reliable against specific combat maneuvers. |

**Finding:** Lizardfolk's Thick Scales is the single strongest passive defense in the folk system. An unarmored Lizardfolk has the same AV as a chain-mailed fighter but with zero load, no rigid penalty, and no equipment slot consumed. Even armored, the +1 AV bonus stacks permanently. No other folk ability approaches this level of passive defensive value.

### 3.2 Offensive Abilities

| Folk | Offensive Ability | Damage Impact | Frequency |
|------|------------------|--------------|-----------|
| **Orc** | Orcish Fury | +weapon damage on crits (melee only) | Every crit |
| **Minotaur** | Goring Charge | +weapon damage on horn attacks after moving | Every charge |
| **Human** | Will of Perseverance | Converts failures to potential successes | 1/day |
| **Catfolk** | Intimidating Roar | AoE frighten (short range) | 1/combat |
| **Elf** | Fleet-Footed | +1 Movement for positioning | 1/combat |

**Finding:** Orc's Orcish Fury is the highest-ceiling offensive ability — on a critical hit with a greatsword (+5 weapon damage at base), it adds +5 damage, for a total critical of 20 instead of 15. However, it requires critical success (roughly 10–20% of attacks depending on skill), making it high-variance. Minotaur's Goring Charge is more reliable — it triggers on any hit after moving, making it nearly guaranteed every round for aggressive melee fighters.

### 3.3 Natural Weapons

| Folk | Weapon | Damage | Properties | Equivalent Manufactured Weapon |
|------|--------|--------|-----------|-------------------------------|
| Lizardfolk | Reptile Jaws | 3 | crush | Better than a mace (3 damage, crush, one-handed) — no load, always available |
| Minotaur | Horns | 3 | crush | Same as above |
| Catfolk | Sharp Claws | 2 | light, slash | Comparable to a dagger (2 damage, agile, light, pierce) — different properties |
| Dogfolk | Bite | 2 | crush | Comparable to a club (2 damage, crush) |
| Satyr | Horns | 2 | crush | Same as above |

**Finding:** The gap between 2-damage and 3-damage natural weapons is significant. The 3-damage weapons (Lizardfolk, Minotaur) match one-handed manufactured weapons, while 2-damage weapons (Catfolk, Dogfolk, Satyr) are closer to backup/improvised weapons. This matters most for Pugilist/Brawler builds where the natural weapon is the primary weapon.

### 3.4 Reactive & Limited-Use Abilities

| Folk | Ability | Trigger | Power | Uses |
|------|---------|---------|-------|------|
| **Orc** | Pride above Death | Suffer Injury | Ignore one Injury (potentially lethal) | 1/day |
| **Human** | Will of Perseverance | Any test | Re-roll any test | 1/day |
| **Satyr** | Wild Resilience | Spell damage or magical condition | Resist damage or negate condition | 1/scene |
| **Goblin** | Quick Escape | Enemy misses melee | Free close move, no OA | 1/turn |
| **Catfolk** | Intimidating Roar | Action use | AoE frighten (short range) | 1/combat |
| **Dogfolk** | Pack Loyalty | Close to ally | +1 boon self + brief +1 boon ally | 1/scene |
| **Elf** | Fleet-Footed | Turn use | +1 Movement | 1/combat |

**Finding:** Pride above Death (Orc) and Will of Perseverance (Human) are the most impactful limited-use abilities. Both can single-handedly change encounter outcomes. Wild Resilience (Satyr) is strong in campaigns heavy with enemy spellcasters but situational otherwise. The remaining abilities are tactically useful but rarely encounter-defining.

---

## 4. Archetype Dominance Analysis

### 4.1 Optimal Folk by Archetype

For each major archetype, which folk provides the strongest mechanical synergy?

| Archetype | Optimal Folk | Reason | Runner-Up |
|-----------|-------------|--------|-----------|
| **Barbarian** | Orc | Orcish Fury synergizes with crit-fishing in rage; Pride above Death complements low-armor aggression | Minotaur (Giant's Blood + Charge) |
| **Fighter** | Dwarf | Stoneskin + Squat Build for tank role; permanent AV/anti-push complements heavy armor | Lizardfolk (+1 AV in armor) |
| **Hoplite** | Dwarf | Same as Fighter; Squat Build anti-push is ideal for formation/zone control | Hune (Stoic Mind for Resist-heavy play) |
| **Brawler** | Minotaur | 3-damage Horns + Goring Charge + Giant's Blood creates strongest unarmed baseline | Lizardfolk (3-damage Jaws + Thick Scales) |
| **Ranger** | Elf | Fleet-Footed for kiting; Night Vision for scouting; Spiritual Symbiosis for wilderness travel | Catfolk (Night Vision + Claws backup) |
| **Rogue** | Goblin | Night Vision + Quick Escape + stealth boon for infiltration/hit-and-run | Elf (Fleet-Footed for disengagement) |
| **Sorcerer** | Human | Arcane Awakening (+2 Focus, catalyst-free casting) is exclusively for Arcana casters | — (no competitor) |
| **Warlock** | Human | Same as Sorcerer — Arcane Awakening dominates all Arcana builds | — |
| **Magus** | Human | Arcane Awakening + Will of Perseverance for hybrid melee/casting | — |
| **Summoner** | Human | More Focus = more summons | — |
| **Priest** | Hune | Stoic Mind (+1 Resist, +1 boon Spirit + Fortitude) synergizes with Spirit-based casting | Dwarf (Stoneskin for survivability) |
| **Druid** | Hune | Same as Priest; Giant's Blood for melee backup | Satyr (Wild Resilience vs magic) |
| **Champion** | Dwarf | Stoneskin + Squat Build for frontline divine warrior | Hune (Stoic Mind for Spirit-based casting) |
| **Oracle** | Gnome | Natural Empath synergizes with Insight-heavy prophecy/divination role | Hune (Stoic Mind for Spirit casting) |
| **Warlord** | Dogfolk | Pack Loyalty synergizes with leadership role; Keen Senses for battlefield awareness | Human (Will of Perseverance for clutch moments) |

### 4.2 Critical Issues

**Human dominates all Arcana archetypes.** Arcane Awakening provides +2 Focus and catalyst-free casting — abilities that directly and exclusively boost Arcana-based characters. No other folk provides any spellcasting bonus for either Arcana or Mysticism. This creates a situation where choosing any folk other than Human for a Sorcerer, Warlock, Summoner, or Magus is a significant mechanical sacrifice.

**Lizardfolk is the best "passive tankiness" folk for any archetype.** Thick Scales provides +3 AV without wearing armor or +1 AV on top of existing armor. This makes Lizardfolk the optimal choice for any character who wants survivability without investing in armor proficiency — including light-armor rogues, mages, and archers.

**No folk specifically benefits Archery, Mysticism, or Influence-focused archetypes.** The Ranger, Priest, Bard, and Warlord archetypes lack a folk with strong synergistic abilities. The "best" folk for these archetypes is typically determined by general utility (Human's re-roll, Hune's Resist) rather than thematic fit.

---

## 5. Trade-Off & Balance Assessment

### 5.1 Folk with Weak Trade-Offs

A well-balanced folk should have meaningful strengths countered by meaningful limitations or opportunity costs.

| Folk | Strengths | Weaknesses/Costs | Trade-Off Quality |
|------|-----------|-----------------|-------------------|
| **Lizardfolk** | +3 AV unarmored, 3-damage Jaws, breath-holding | Aquatic Nature is narrow | ⚠️ **Weak trade-off** — strengths far exceed costs |
| **Minotaur** | +2 HP, +2 carry, heavy weapon ease, 3-damage Horns, Goring Charge | None mechanical | ⚠️ **No trade-off** — pure upside |
| **Human** | Universal re-roll + best caster abilities | None mechanical | ⚠️ **No trade-off** — pure upside |
| **Dwarf** | +1 AV, poison resistance, anti-push/prone | Short stature (narrative only, not mechanical) | ✅ Adequate — abilities are strong but not dominant |
| **Hune** | +2 HP, +1 Resist, carry/weapon ease | Only 2 abilities | ✅ Adequate — budget is moderate |
| **Orc** | Extra crit damage, ignore one Injury | Melee-only offensive ability, short lifespan (narrative) | ✅ Adequate — high ceiling but requires crits |
| **Catfolk** | Night Vision, AoE frighten, backup claws | Roar requires Action investment, claws are low-damage | ✅ Adequate — abilities have real opportunity costs |
| **Satyr** | Magic resistance, terrain stride | Wild Resilience is situational (requires enemy magic), Horns are weak | ✅ Adequate — meta-dependent value |
| **Goblin** | Night Vision, Quick Escape | Small Stature weapon restrictions | ❌ **Over-penalized** — Small Stature cost exceeds escape benefit |
| **Gnome** | Empath, anti-illusion | Small Stature weapon restrictions | ❌ **Over-penalized** — combat tax for utility abilities |
| **Elf** | Night Vision, one extra Movement, reduced sleep | Fleet-Footed is once/combat; Symbiosis is narrow | ❌ **Under-powered** — all abilities are situational |
| **Dogfolk** | Scent tracking, pack bonus, bite | Pack Loyalty is once/scene; Keen Senses is non-combat | ❌ **Under-powered** — low combat relevance |

### 5.2 Strictly Superior Comparisons

**Minotaur vs. Hune.** Both share Giant's Blood identically. Minotaur additionally gets Horns (3 damage, crush) and Goring Charge, while Hune gets Stoic Mind (+1 Resist, +1 boon Spirit + Fortitude). Hune's Stoic Mind is valuable for Spirit-based characters, but Minotaur's combat package is strictly better for any Strength-focused build. Since Giant's Blood already supports Strength builds, Minotaur is a better Hune for the most common use case.

**Human vs. all caster folk.** No other folk provides any spellcasting bonus. Human's Arcane Awakening (+2 Focus) has no equivalent for Mysticism casters either — meaning Human is also competitive for Mysticism builds via Will of Perseverance alone.

**Lizardfolk vs. Dwarf (for passive defense).** Lizardfolk's +3 AV unarmored surpasses Dwarf's +1 AV in almost every scenario. Armored Lizardfolk still matches Dwarf at +1 AV while also having 3-damage Jaws and Aquatic Nature. Dwarf's advantages are limited to poison resistance and anti-push — real but narrower.

### 5.3 Under-Performing Folk

**Elf** has the weakest combat ability package. Fleet-Footed's +1 Movement once per combat is marginal in most encounters. Spiritual Symbiosis only matters during wilderness travel with natural vegetation — a highly situational benefit. Night Vision is shared with Catfolk and Goblin, who both get additional combat-relevant abilities.

**Dogfolk** trades all combat power for tracking utility. Keen Senses is excellent for exploration but contributes nothing in combat. Pack Loyalty is limited to once per scene and requires an ally in close range. Bite at 2 damage is a minor backup option. Dogfolk is the only folk that is better out of combat than in it, which creates a frustrating experience in a game where combat is a significant portion of play.

**Gnome** pays the steepest mechanical tax. Small Stature's weapon restrictions affect nearly every combat-relevant character concept (no versatile weapons one-handed, harder heavy weapons), and the compensation — +1 boon on stealth — is useful only for stealth-focused characters. Natural Empath is one of the best social/exploration abilities in the game, but it doesn't compensate for the combat penalty.

---

## 6. Thematic Fit Assessment

### 6.1 Cultural Identity Reinforcement

| Folk | Intended Fantasy | Mechanical Reinforcement | Thematic Grade |
|------|-----------------|------------------------|----------------|
| **Dwarf** | Sturdy crafter, stone affinity, resilient | Stoneskin (AV + poison), Squat Build (immovable), Dwarven Sight (underground) | ✅ **Excellent** — every ability reinforces dwarven identity |
| **Elf** | Nature-attuned, graceful, spiritual | Night Vision (partial), Fleet-Footed (speed), Spiritual Symbiosis (nature bond) | ⚠️ **Adequate** — mechanically thin for such a rich thematic identity |
| **Gnome** | Psychic empath, illusion-sensitive | Natural Empath (telepathy), Scent of Illusions (anti-magic) | ✅ **Excellent** — abilities are uniquely evocative and mechanically distinctive |
| **Hune** | Towering, stoic, enduring | Giant's Blood (size/strength), Stoic Mind (willpower) | ✅ **Good** — simple but effective match |
| **Orc** | Fierce warrior, proud, death-defying | Orcish Fury (brutal crits), Pride above Death (refuse to fall) | ✅ **Excellent** — abilities tell a clear warrior story |
| **Goblin** | Cunning trickster, quick, sneaky | Quick Escape (slippery), Night Vision (dark-adapted), Small Stature (stealthy) | ✅ **Good** — abilities fit the archetype despite balance issues |
| **Human** | Adaptable, innate arcane talent | Will of Perseverance (adaptability), Arcane Awakening (innate magic) | ✅ **Good** — clear identity, though arcane focus is narrow |
| **Catfolk** | Proud hunter, intimidating, predatory | Night Vision (nocturnal), Intimidating Roar (predator), Sharp Claws (natural weapons) | ✅ **Good** — solid predator fantasy |
| **Lizardfolk** | Cold-blooded survivor, armored, aquatic | Thick Scales (natural armor), Aquatic Nature (amphibious), Reptile Jaws (predator) | ✅ **Excellent** — comprehensive reptilian identity |
| **Minotaur** | Horned guardian, powerful, charging | Giant's Blood (size), Horns (natural weapon), Goring Charge (signature attack) | ✅ **Excellent** — every ability reinforces the charging bull archetype |
| **Dogfolk** | Loyal pack hunter, keen tracker | Keen Senses (tracking), Pack Loyalty (teamwork), Bite (natural weapon) | ✅ **Good** — clear canine identity, though Pack Loyalty could be stronger |
| **Satyr** | Free-spirited, magic-resistant, wild | Wild Resilience (magic resistance), Horns (natural weapon), Woodland Stride (wild terrain) | ✅ **Good** — fey/wild identity is clear |

### 6.2 Thematic Gaps

**Elf lacks a spiritual/magical identity mechanic.** The lore describes elves as living "in a spiritual symbiotic state with the life force of nature," but mechanically this manifests only as reduced sleep requirements in vegetation. There is no mechanical hook for the spiritual connection — no bonus to Mysticism, Nature, or Lore, and no interaction with spirits or natural magic.

**Human's arcane identity excludes non-magical humans.** Arcane Awakening only benefits characters who learn Arcana. A Human fighter, ranger, or rogue gains nothing from this ability. The lore describes humans as "adaptable" and "boundlessly ambitious," but only Will of Perseverance reflects this — Arcane Awakening narrows the fantasy.

**Goblin lacks a "cunning/trickery" mechanic.** The lore emphasizes goblins as cunning and resourceful, but their abilities focus on escape and stealth. There is no mechanical hook for trickery, deception, or improvisation.

---

## 7. Culture-Dependent Abilities

### 7.1 Concept

Currently, all members of a given folk share identical abilities regardless of their culture. An Ash-Dwarf (military dictatorship, volcanic wasteland) and a Sea-Dwarf (seafaring merchants, plutocratic traders) have exactly the same mechanical traits.

A **culture-dependent ability** system would designate one ability per folk as "universal" (shared by all cultures) and one as "cultural" (varying by culture). This would:
- Increase character creation variety within each folk
- Reduce "always optimal" folk picks by distributing power across cultures
- Deepen the mechanical identity of each culture
- Create meaningful choices during character creation

### 7.2 Implementation Approach

**Recommended Model: Fixed Core + Cultural Ability**

Each folk retains 1–2 "core" abilities that define the folk's biological/physical identity (e.g., Dwarven Sight, Thick Scales, Giant's Blood). One ability slot becomes a "cultural" ability that varies by culture.

**Example — Dwarf:**
- **Core (all dwarves):** Dwarven Sight, Stoneskin
- **Cultural (varies):**
  - Ghahar (Fortress-Dwarves): **Siege Expertise** — +1 boon on Crafting rolls to build or evaluate fortifications. You can identify structural weaknesses in constructed buildings by touch.
  - Urduk (Ash-Dwarves): **Ashen Endurance** — You gain resistance to fire damage. You can tolerate extreme heat environments without penalty.
  - Dhurvar (Ice-Dwarves): **Glacial Tenacity** — You gain resistance to frost damage. You can tolerate extreme cold environments without penalty.
  - Dharok (Hill-Dwarves): **Temple Builder's Eye** — +1 boon on Perception rolls to detect hidden doors, passages, or traps in stone structures.
  - Mahruk (Sea-Dwarves): **Sea Legs** — You are immune to seasickness and gain +1 boon on Athletics rolls to swim or maintain balance on watercraft.

### 7.3 Ability Replacement Candidates

For each folk, the following ability is the best candidate for cultural replacement (the one most easily reinterpreted by culture):

| Folk | Core Abilities (Keep) | Cultural Candidate (Replace) | Rationale |
|------|----------------------|----------------------------|-----------|
| Dwarf | Dwarven Sight, Stoneskin | Squat Build | Physical build is universal; cultural skill/environment adaptation varies |
| Elf | Night Vision | Fleet-Footed OR Spiritual Symbiosis | Both are adaptable to cultural variants (desert vs. forest vs. shadow) |
| Gnome | Natural Empath | Scent of Illusions | Core psychic identity stays; how gnomes apply it culturally varies |
| Hune | Giant's Blood | Stoic Mind | Physical size is universal; mental/spiritual traits vary by culture |
| Orc | Orcish Fury | Pride above Death | Warrior fury is universal; how they face death varies culturally |
| Goblin | Night Vision, Small Stature | Quick Escape | Size is biological; survival tactics vary by culture |
| Human | Will of Perseverance | Arcane Awakening | Perseverance is universal; arcane talent could vary (some cultures suppress it) |
| Catfolk | Night Vision | Intimidating Roar OR Sharp Claws | Night vision is biological; hunting style varies by culture |
| Lizardfolk | Thick Scales | Aquatic Nature OR Reptile Jaws | Scales are biological; environment adaptation varies (swamp vs. jungle vs. sea) |
| Minotaur | Giant's Blood, Horns | Goring Charge | Size and horns are biological; fighting technique varies by culture |
| Dogfolk | Keen Senses | Pack Loyalty OR Bite | Senses are biological; social behavior varies by culture |
| Satyr | Horns | Wild Resilience OR Woodland Stride | Horns are biological; magical resistance vs. terrain adaptation varies |

### 7.4 Pros and Cons

**Advantages:**
1. **Increased build diversity.** Players choosing the same folk can have meaningfully different mechanical identities based on culture.
2. **Reduced archetype dominance.** If Human's Arcane Awakening becomes a Sefkari (Oasis-Human) cultural ability, other Human cultures gain different abilities, and non-Human casters become more competitive.
3. **Deeper worldbuilding integration.** Cultural traits mechanically reinforce the lore differences between, e.g., Fortress-Dwarves and Sea-Dwarves.
4. **Design space expansion.** Each folk gains 3–7 cultural abilities instead of a single fixed set, dramatically increasing the design space for folk traits.
5. **Player agency.** Culture choice becomes a meaningful mechanical decision, not just a flavor pick.

**Disadvantages:**
1. **Increased complexity.** Players must evaluate 3–7 cultural options per folk during character creation, rather than a fixed set.
2. **Balance surface area.** Each cultural ability must be balanced against all others within the same folk, multiplying the number of balance comparisons.
3. **Character sheet and tooling impact.** Digital character sheets and the existing folk selection UI must accommodate variable abilities per culture.
4. **Lore constraints.** Some folk have only 3 cultures (Gnome, Goblin, Satyr, Human) while others have 5–7 (Dwarf, Elf, Lizardfolk). This creates uneven option counts.
5. **GM burden.** GMs must track which cultural variant each PC has, which is a minor but nonzero cognitive load.

### 7.5 Recommendation

**Adopt the culture-dependent ability system.** The advantages significantly outweigh the disadvantages. The increased build diversity and reduced archetype dominance address the two most critical balance issues in the current folk system (Human caster dominance and the Minotaur/Lizardfolk advantage).

**Implementation priority:**
1. **Immediate:** Redesign Human's Arcane Awakening as a cultural ability (highest-impact change).
2. **Near-term:** Add cultural variants for folk with the weakest balance (Elf, Dogfolk, Gnome, Goblin).
3. **Long-term:** Complete cultural variants for all 12 folk.

---

## 8. Recommendations

### 8.1 High-Priority Balance Changes

#### R1. Rebalance Lizardfolk's Thick Scales
**Problem:** +3 AV unarmored is equivalent to medium armor without any cost.
**Recommendation:** Reduce to +2 AV unarmored (still strong but no longer exceeds light armor). Keep the +1 AV when wearing armor.

#### R2. Address Human Caster Dominance
**Problem:** Arcane Awakening makes Human the objectively best folk for every Arcana archetype.
**Recommendation:** Either (a) make Arcane Awakening a cultural ability available only to specific Human cultures, or (b) add a comparable Mysticism bonus to at least one other folk to create competitive alternatives for divine casters.

#### R3. Differentiate Minotaur from Hune
**Problem:** Minotaur is a strictly better Hune for Strength-focused builds due to identical Giant's Blood plus additional combat abilities.
**Recommendation:** Give Hune a unique version of Giant's Blood with a different secondary benefit (e.g., +2 HP and +1 boon on Fortitude rolls to resist environmental hazards like heat, cold, or fatigue) to create a "towering endurance" niche distinct from Minotaur's "charging warrior" niche.

#### R4. Strengthen Elf
**Problem:** Elf has the weakest combat contribution and narrowest utility.
**Recommendation:** Upgrade Fleet-Footed to "once per scene" (from "once per combat") so it applies during chases, exploration, and social scenes. Consider adding a spiritual/nature mechanic (e.g., +1 boon on Nature or Mysticism rolls in natural environments) to reinforce the lore identity.

#### R5. Strengthen Dogfolk
**Problem:** Low combat relevance; Keen Senses is purely out-of-combat.
**Recommendation:** Expand Pack Loyalty to "once per turn" (from "once per scene") to make the teamwork mechanic a reliable combat identity. Alternatively, add a scent-based combat benefit (e.g., +1 boon on attacks against bleeding creatures, reinforcing the hunting pack fantasy).

### 8.2 Medium-Priority Balance Changes

#### R6. Reduce Small Stature Tax
**Problem:** Gnome and Goblin pay a steep combat penalty for non-combat benefits.
**Recommendation:** Add a compensating combat benefit to Small Stature (e.g., "+1 boon on Dodge rolls against attacks from Large or larger creatures") to offset the weapon restrictions. Alternatively, allow small folk to wield versatile weapons one-handed at the cost of −1 weapon damage instead of the current full prohibition.

#### R7. Add Goblin Trickery Mechanic
**Problem:** Goblin's lore emphasizes cunning and trickery, but no ability reflects this.
**Recommendation:** Replace or augment Quick Escape with a trickery ability (e.g., "Cunning Trick: Once per scene, when you succeed on a Stealth or Streetwise roll, you gain +1 boon on your next Action against the same target").

#### R8. Normalize Natural Weapon Damage
**Problem:** 3-damage natural weapons (Lizardfolk, Minotaur) are significantly stronger than 2-damage weapons (Catfolk, Dogfolk, Satyr).
**Recommendation:** Either raise all natural weapons to 2 damage with a unique property per folk, or ensure the 3-damage weapons have balancing limitations (e.g., Reptile Jaws: "cannot be used while wielding a two-handed weapon").

### 8.3 Long-Term Design Improvements

#### R9. Implement Culture-Dependent Abilities
As detailed in Section 7, adopt a system where one ability per folk varies by culture. Begin with the highest-impact folk (Human, Elf, Dogfolk) and expand to all 12 over time.

#### R10. Add Mystic Caster Folk Support
No folk currently provides a bonus for Mysticism-based spellcasting. Consider giving one or more folk (Satyr, Elf, or Gnome) a cultural or core ability that provides a Mysticism bonus (+1 Focus, +1 boon on Mysticism rolls in specific conditions, etc.) to create parity with Human's Arcana support.

#### R11. Audit Shared Abilities
Night Vision appears on Elf, Goblin, and Catfolk. Giant's Blood appears on Hune and Minotaur. Shared abilities reduce folk distinctiveness. Consider replacing shared abilities with folk-specific variants (e.g., Elf's Night Vision could become "Starlight Sight" with a unique secondary effect tied to their spiritual nature).

---

## Appendix A: Complete Folk Ability Reference

### Dwarf
- **Dwarven Sight.** Thermal vision. See at melee range in absolute darkness as bright light; up to medium distance as dim light.
- **Stoneskin.** +1 AV. +1 boon on Fortitude rolls to resist poison, intoxication, or illness.
- **Squat Build.** +1 bane on rolls to knock you prone or push you. Reduce push distance by one step.

### Elf
- **Night Vision.** See one range category further from bright and dim light sources.
- **Fleet-Footed.** +1 Movement during your turn. Once per combat.
- **Spiritual Symbiosis.** In lush wilderness, need only 4 hours sleep (remaining 4 hours for light activity).

### Gnome
- **Natural Empath.** Spirit + Insight to read surface thoughts/emotions at close range. Project feelings to close creatures. Know number and direction of living creatures close to you.
- **Scent of Illusions.** +1 boon Spirit rolls to identify magical falsehoods/illusions. +1 bane on rolls to fool you with falsehoods/illusions.
- **Small Stature.** +1 boon Agility stealth rolls. Can only wield versatile weapons two-handed (no bonus damage). Increase Strength requirement for heavy weapons by +1d (max d12).

### Hune
- **Giant's Blood.** +2 HP. +2 carrying capacity. Decrease Strength requirement for heavy weapons by −1d (min d4).
- **Stoic Mind.** +1 Resist. +1 boon on Spirit + Fortitude rolls.

### Orc
- **Orcish Fury.** Critical success on melee weapon attack: add weapon damage an additional time to total damage.
- **Pride above Death.** Ignore one Injury. Once per day.

### Goblin
- **Night Vision.** See one range category further from bright and dim light sources.
- **Quick Escape.** When enemy misses melee attack against you, move close without provoking Opportunity Attacks. Once between turns.
- **Small Stature.** +1 boon Agility stealth rolls. Can only wield versatile weapons two-handed (no bonus damage). Increase Strength requirement for heavy weapons by +1d (max d12).

### Human
- **Will of Perseverance.** Re-roll the result of one test and take the new result. Once per day.
- **Arcane Awakening.** If you have learned Arcana, +2 Focus. Can cast arcane spells without a Spell Catalyst but suffer +1 bane on the roll.

### Catfolk
- **Night Vision.** See one range category further from bright and dim light sources.
- **Intimidating Roar.** Action: Strength + Fortitude vs. Resist, each creature within short range. On success, frightened. Target can roll Spirit + Fortitude at start of turn to end. Once per combat.
- **Sharp Claws.** Brawling weapon: 2 weapon damage, light, slash.

### Lizardfolk
- **Thick Scales.** +3 AV (armor bonus). If another higher armor bonus exists, +1 AV instead.
- **Aquatic Nature.** Hold breath for 4 + ½ Strength minutes.
- **Reptile Jaws.** Brawling weapon: 3 weapon damage, crush.

### Minotaur
- **Giant's Blood.** +2 HP. +2 carrying capacity. Decrease Strength requirement for heavy weapons by −1d (min d4).
- **Horns.** Brawling weapon: 3 weapon damage, crush.
- **Goring Charge.** After spending 1+ Movement towards a creature and hitting with Horns, add weapon damage an additional time to total damage.

### Dogfolk
- **Keen Senses.** +1 boon Perception rolls based on smell. Detect presence/direction of creatures within close range by scent (requires air access).
- **Pack Loyalty.** While close to an ally, +1 boon on a melee attack; that ally briefly gains +1 boon on their next melee attack against the same target. Once per scene.
- **Bite.** Brawling weapon: 2 weapon damage, crush.

### Satyr
- **Wild Resilience.** When taking spell damage or affected by magical condition, choose to gain resistance against the damage or negate the condition. Once per scene.
- **Horns.** Brawling weapon: 2 weapon damage, crush.
- **Woodland Stride.** Natural vegetation difficult terrain counts as normal terrain. +1 boon on Agility + Athletics rolls to climb/traverse natural environments.

---

## Appendix B: Methodology Notes

### Budget Scoring Criteria (Section 2.2)

**Combat Score (0–3 per ability):**
- 0 = No combat application (e.g., Spiritual Symbiosis)
- 1 = Situational or minor combat benefit (e.g., Night Vision in dark encounters, 2-damage natural weapon)
- 2 = Reliable, frequently applicable combat benefit (e.g., +1 AV always-on, +1 Movement in combat)
- 3 = Major combat impact (e.g., +3 AV unarmored, extra damage on crits, ignore one Injury)

**Utility Score (0–3 per ability):**
- 0 = No out-of-combat application (e.g., Orcish Fury, Goring Charge)
- 1 = Narrow or situational utility (e.g., hold breath, stealth boon for Small Stature)
- 2 = Broadly useful exploration/social tool (e.g., Night Vision, Woodland Stride, Aquatic Nature)
- 3 = Highly versatile or unique utility (e.g., Natural Empath thought-reading, Dwarven Sight total darkness vision, Keen Senses scent tracking, Will of Perseverance universal re-roll)

**Penalty Score:**
- −2 = Small Stature weapon restrictions (affects primary combat capability)
