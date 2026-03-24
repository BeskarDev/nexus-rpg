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

## 9. Proposed Folk Ability Reworks

This section presents complete, concrete ability set reworks for all 12 folk based on the findings in Sections 2–6 and the recommendations in Section 8. All proposals focus exclusively on **innate biological and physical traits** — cultural abilities are excluded from this comparison to keep it aligned with the current rules structure.

### 9.1 Design Goals

1. **Narrow the budget spread.** Current range is 3–8 (2.7× spread). Target: 5–8 (1.6× spread).
2. **Standardize at 3 abilities per folk** where biologically justified. Two-ability folk (Hune, Orc, Human) gain a third innate trait.
3. **Eliminate shared abilities.** Night Vision (Elf/Goblin/Catfolk) and Giant's Blood (Hune/Minotaur) are replaced with folk-specific variants that share the same base effect but add a unique secondary.
4. **Ensure every folk has at least one combat-relevant ability.** No folk should be purely utility-focused.
5. **Soften the Small Stature tax.** Add a defensive combat benefit that thematically fits small folk.
6. **Address archetype dominance.** Reduce Human's caster monopoly; differentiate Hune from Minotaur.
7. **Preserve thematic identity.** Every change must reinforce the folk's biological/physical fantasy, not contradict it.

### 9.2 Change Legend

- ✅ **KEEP** — Ability unchanged from current rules.
- 🔄 **REWORK** — Ability modified (text changed).
- 🆕 **NEW** — Ability added (folk previously had fewer abilities).
- ❌ **REMOVED** — Ability or effect removed.

---

### 9.3 Dwarf

> Innate biology: Dense bones, squat muscular frame, thermal vision, stone-like constitution, toxin-resistant metabolism.

**Verdict: No changes.** Dwarf is well-balanced (budget 8 but no single dominant ability) and every ability strongly reinforces dwarven biology. The three abilities cover defense (Stoneskin), resilience (Squat Build), and utility (Dwarven Sight) — a model distribution.

**Dwarven Sight.** ✅ KEEP
You can roughly make out differences in temperature by sight, granting you vision even in total darkness. You can see at melee range in absolute darkness as in bright light and up to a medium distance as in dim light.

**Stoneskin.** ✅ KEEP
You gain +1 AV. When you have to roll with Fortitude to withstand poison, intoxication, or illness, you gain +1 boon on the roll.

**Squat Build.** ✅ KEEP
You impose +1 bane on rolls that attempt to knock you prone or push you. Also when you are pushed, reduce the distance by one step (if you are pushed close, instead you aren't pushed at all).

| Metric | Before | After |
|--------|--------|-------|
| Combat Budget | 4 | 4 |
| Utility Budget | 4 | 4 |
| Net Budget | **8** | **8** |

---

### 9.4 Elf

> Innate biology: Slender, graceful frame, spiritually bonded to living nature, supernaturally keen senses, long-lived.

**Verdict: Significant buff.** All three abilities are reworked. Night Vision becomes Spirit Sight with a unique spiritual secondary. Fleet-Footed upgrades to once per scene. Spiritual Symbiosis gains a meaningful Nature bonus balanced by a lore-accurate downside in barren terrain.

**Spirit Sight.** 🔄 REWORK *(replaces Night Vision)*
You can see one range category further from sources of bright and dim light. Additionally, you can faintly perceive spiritual emanations — you gain +1 boon on Spirit + Perception rolls to detect undead, spirits, or active magical auras within close range.

> *Design rationale: Differentiates from generic Night Vision (R11). The spiritual sensing reflects the lore's "spiritual symbiotic state with the life force of nature" and gives elves a unique detection niche that no other folk occupies.*

**Fleet-Footed.** 🔄 REWORK
You can choose to gain +1 Movement during your turn. You can use this ability once per scene.

> *Design rationale: Upgrading from once/combat to once/scene (R4) means the ability applies to chases, exploration, and social encounters — not just fights. This better reflects elven grace as a constant physical trait.*

**Spiritual Symbiosis.** 🔄 REWORK
You draw sustenance from the living world around you. While in natural environments with vegetation, you only need to sleep for 4 hours each night (allowing 4 hours for light activity), and you gain +1 boon on Nature rolls. After spending more than a day in desolate or barren terrain without access to vegetation, you suffer +1 bane on Spirit rolls until you spend at least one hour in a natural environment.

> *Design rationale: The Nature boon gives this ability actual mechanical weight in play (R4). The barren terrain penalty is drawn directly from the lore ("suffer physically when in barren or lifeless terrain for too long") and creates a genuine trade-off that other folk don't share — making Elf the first folk with a meaningful biological downside.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 2 | 4 | +2 (spirit detection in combat, scene-frequency mobility) |
| Utility Budget | 3 | 5 | +2 (Nature boon, spiritual detection out of combat) |
| Penalties | 0 | -1 | -1 (barren terrain bane) |
| Net Budget | **5** | **8** | **+3** |

---

### 9.5 Gnome

> Innate biology: Small stature, innate psychic/empathic neurology, illusion-sensitive perception, stout build.

**Verdict: Small Stature rework.** The two signature abilities (Natural Empath, Scent of Illusions) are excellent and unchanged. Small Stature gains a combat-relevant defensive benefit to offset the weapon restrictions.

**Natural Empath.** ✅ KEEP
You can read the surface thoughts and emotions of any close creature by rolling Spirit + Insight. You can also project your feelings to a creature close to you, allowing you to communicate simple ideas with animals and other creatures. You also intuitively know how many living creatures are close to you and their general direction.

**Scent of Illusions.** ✅ KEEP
You can instinctively make out illusions and invisible things. You gain +1 boon on Spirit rolls to identify magical falsehoods and illusions and impose +1 bane on rolls to fool you with falsehoods or illusions.

**Small Stature.** 🔄 REWORK
You are of small size. This grants you the following effects:

- You gain +1 boon on Agility rolls to hide or move stealthily.
- You gain +1 boon on Dodge rolls against attacks from creatures of large size or bigger.
- You can only wield versatile weapons two-handed and don't add a bonus to weapon damage from it.
- Increase the Strength requirement for heavy weapons you wield by +1d (max. d12).

> *Design rationale: The new Dodge boon against large+ creatures (R6) is both thematically intuitive (small targets are harder to hit for big attackers) and mechanically relevant (many monsters are large+). This compensates for the weapon restrictions without removing them, maintaining the "small folk trade-off" while making it fair.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 1 | 2 | +1 (Dodge vs. large) |
| Utility Budget | 5 | 5 | — |
| Penalties | -2 | -1 | +1 (softened by dodge) |
| Net Budget | **4** | **6** | **+2** |

---

### 9.6 Hune

> Innate biology: Towering frame (2.1–2.3m), immense physical endurance, thick skin, environmentally hardy, imposing presence.

**Verdict: Differentiate from Minotaur + add third ability.** Giant's Blood is reworked into Towering Endurance with an environmental-resistance focus distinct from Minotaur's combat-focused Powerful Build. A new third ability (Imposing Stature) reflects Hune's natural intimidation factor.

**Towering Endurance.** 🔄 REWORK *(replaces Giant's Blood)*
+2 HP. You also gain the following effects:

- Add +2 to your carrying capacity.
- You gain +1 boon on Fortitude rolls to resist environmental hazards such as extreme heat, cold, exhaustion, or altitude.

> *Design rationale: Differentiating from Minotaur (R3, R11). Hune keeps the HP and carry capacity that reflect their massive size, but the heavy weapon ease moves to Minotaur exclusively. In exchange, Hune gains environmental hardiness — fitting their lore as caravan guards, builders, and nomadic travelers who thrive in harsh climates.*

**Stoic Mind.** ✅ KEEP
+1 Resist. You gain +1 boon on Spirit + Fortitude rolls.

**Imposing Stature.** 🆕 NEW
Your towering frame commands respect and inspires caution. You gain +1 boon on Influence rolls to intimidate. Creatures attempting to intimidate or frighten you suffer +1 bane on the roll.

> *Design rationale: Hune had only 2 abilities — the fewest of any folk. Imposing Stature fills a social/defensive niche that reflects their biological reality (they're 2+ meters tall) without overlapping with any existing folk ability. The anti-frighten component adds combat relevance.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 4 | 4 | — (Stoic Mind + anti-frighten replaces heavy weapon ease) |
| Utility Budget | 2 | 4 | +2 (environmental resistance, intimidation boon) |
| Net Budget | **6** | **8** | **+2** |

---

### 9.7 Orc

> Innate biology: Muscular build, fast-maturing metabolism, adrenaline-heavy endocrine system, dense muscle fiber, fierce temperament.

**Verdict: Add third ability.** Orcish Fury and Pride above Death are excellently designed and unchanged. A new third ability (Adrenaline Surge) reflects the orc's biological fight response and adds a reliable combat mechanic alongside the high-ceiling crit ability.

**Orcish Fury.** ✅ KEEP
When you roll a critical success on an attack with a melee weapon, add your weapon damage an additional time to the total damage.

**Pride above Death.** ✅ KEEP
When you suffer one Injury, you can choose to ignore it. You can use this ability once per day.

**Adrenaline Surge.** 🆕 NEW
When you take damage from an attack, you can choose to gain +1 boon on all melee attack rolls until the end of your next turn. You can use this ability once per combat.

> *Design rationale: Orcs had only 2 abilities. Adrenaline Surge fills a reactive combat niche — orcs get more dangerous when wounded, a classic fantasy trope grounded in their aggressive biology. It synergizes with Orcish Fury (more boons → higher rolls → more crits → more bonus damage) without being redundant. The once/combat limit prevents it from being overwhelming.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 5 | 7 | +2 (Adrenaline Surge) |
| Utility Budget | 0 | 0 | — |
| Net Budget | **5** | **7** | **+2** |

---

### 9.8 Goblin

> Innate biology: Small, wiry frame, dark-adapted eyes, hyperactive reflexes, nimble digits, heightened fight-or-flight response.

**Verdict: Enhanced Quick Escape + Small Stature rework.** Quick Escape gains a hide-after-dodge option reflecting goblin biology (instinct to vanish after evading). Small Stature gains the same dodge benefit as Gnome.

**Night Vision.** ✅ KEEP
You can see one range category further from sources of bright and dim light.

> *Note: With Elf and Catfolk receiving folk-specific vision abilities, Goblin becomes the sole folk with generic Night Vision — fitting for underground/cave-dwelling biology.*

**Quick Escape.** 🔄 REWORK
When an enemy misses you with a melee attack, you can choose to move close without provoking Opportunity Attacks. If suitable cover or concealment is within the area you move to, you can immediately attempt to hide as part of this movement (rolling Agility + Stealth as normal). You can use this ability once between turns.

> *Design rationale: The hide-after-dodge option (R7) captures the goblin's biological flight response — they don't just run, they vanish. This makes Quick Escape meaningfully more powerful for stealth-oriented characters while retaining the same trigger and frequency. The hide attempt still requires a roll and suitable concealment, preventing automatic abuse.*

**Small Stature.** 🔄 REWORK
You are of small size. This grants you the following effects:

- You gain +1 boon on Agility rolls to hide or move stealthily.
- You gain +1 boon on Dodge rolls against attacks from creatures of large size or bigger.
- You can only wield versatile weapons two-handed and don't add a bonus to weapon damage from it.
- Increase the Strength requirement for heavy weapons you wield by +1d (max. d12).

> *Design rationale: Same as Gnome (R6). The Dodge boon against large+ creatures applies equally to both small folk.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 2 | 3 | +1 (hide-after-dodge, Dodge vs. large) |
| Utility Budget | 3 | 4 | +1 (stealth flexibility) |
| Penalties | -2 | -1 | +1 (softened) |
| Net Budget | **3** | **6** | **+3** |

---

### 9.9 Human

> Innate biology: Innate arcane sensitivity, adaptive neurology, relentless perseverance, rapid learning, arcane-resonant physiology.

**Verdict: Nerf Arcane Awakening + add third ability.** Focus bonus reduced from +2 to +1, breaking caster dominance while preserving identity. A new third ability (Arcane Sensitivity) gives all humans — not just casters — a connection to their innate arcane nature.

**Will of Perseverance.** ✅ KEEP
Re-roll the result of one test and take the new result. You can use this ability once per day.

**Arcane Awakening.** 🔄 REWORK
You have a natural talent for the arcane arts. If you have learned Arcana, you gain +1 Focus. You can cast arcane spells without a Spell Catalyst, but suffer +1 bane on the roll.

> *Design rationale: Reducing from +2 Focus to +1 (R2) halves the caster advantage. At Arcana Rank 1 with d8 Mind, the Focus formula gives (8-2) + 2×1 = 8 Focus baseline. Human previously gained 10 (25% bonus); now gains 9 (12.5% bonus). This still makes Human the best Arcana folk but no longer creates a dominant gap. Catalyst-free casting with +1 bane remains as an interesting situational option.*

**Arcane Sensitivity.** 🆕 NEW
Your innate connection to arcane energy grants you a subtle awareness of magic. You can detect the presence of active magical effects, enchanted objects, and magical auras within close range, perceiving them as a faint shimmer or tingling sensation. This ability reveals the presence and general location of magic but not its specific nature or school.

> *Design rationale: Human's arcane identity previously only mattered for Arcana casters. Arcane Sensitivity gives every human — fighters, rogues, rangers — a useful biological trait derived from their arcane-resonant physiology. It fills a detection niche distinct from Gnome (thoughts/emotions), Elf (spirits/undead), and Dogfolk (scent), creating a unique identity across the folk.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 4 | 3 | -1 (Focus nerf) |
| Utility Budget | 4 | 5 | +1 (Arcane Sensitivity) |
| Net Budget | **8** | **8** | **0** (redistributed from caster power to universal utility) |

---

### 9.10 Catfolk

> Innate biology: Feline musculature, retractable claws, powerful larynx (roar), nocturnal-adapted eyes, predatory motion tracking.

**Verdict: Night Vision → Predator's Eyes.** The vision ability gains a motion-tracking secondary that differentiates it from other folk and reinforces the predator biology. Other abilities unchanged.

**Predator's Eyes.** 🔄 REWORK *(replaces Night Vision)*
You can see one range category further from sources of bright and dim light. Your predatory vision is attuned to movement — you gain +1 boon on Perception rolls to spot or track moving creatures.

> *Design rationale: Differentiates from generic Night Vision (R11) while reflecting feline biology (cats excel at tracking motion). The Perception boon for moving targets has both combat utility (spotting hidden enemies who move) and exploration utility (tracking prey/quarry), reinforcing the hunter identity.*

**Intimidating Roar.** ✅ KEEP
You can use your Action in combat to unleash a powerful lion's roar. Roll Strength + Fortitude vs. Resist against each creature within short range. On a success, they are frightened of you. They can roll Spirit + Fortitude at the start of their turns. On a success, they stop being frightened. You can use this ability once per combat.

**Sharp Claws.** ✅ KEEP
You can use your claws (2 weapon damage, light, slash) as brawling weapons instead of unarmed attacks.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 3 | 4 | +1 (motion-tracking in combat) |
| Utility Budget | 2 | 3 | +1 (tracking Perception boon) |
| Net Budget | **5** | **7** | **+2** |

---

### 9.11 Lizardfolk

> Innate biology: Dense keratinous scales, cold-blooded metabolism, amphibious lungs, powerful jaw musculature.

**Verdict: Nerf Thick Scales + enhance Aquatic Nature.** Scale AV reduced from +3 to +2 unarmored — still the best natural armor in the game but no longer equivalent to medium armor for free. Aquatic Nature gains a swimming boon for better gameplay relevance.

**Thick Scales.** 🔄 REWORK
Your natural scales grant +2 AV (armor bonus). If you have another higher armor bonus, gain +1 AV instead.

> *Design rationale: Reducing from +3 to +2 AV (R1) eliminates the "free chain mail" problem. At +2, unarmored Lizardfolk match leather armor (2 AV) — still strong for zero load and no equipment slot, but no longer surpassing the first two tiers of manufactured armor. The +1 AV when wearing armor is unchanged, keeping Lizardfolk attractive for armored builds.*

**Aquatic Nature.** 🔄 REWORK
You can hold your breath for 4 + ½ Strength minutes. You also gain +1 boon on Athletics rolls to swim.

> *Design rationale: The swimming boon makes this ability relevant more frequently than pure breath-holding. Lizardfolk should feel aquatically competent in any water encounter, not just during prolonged submersion.*

**Reptile Jaws.** ✅ KEEP
You can use your bite (3 weapon damage, crush) as a brawling weapon instead of unarmed attacks.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 5 | 4 | -1 (AV nerf) |
| Utility Budget | 2 | 3 | +1 (swimming boon) |
| Net Budget | **7** | **7** | **0** (redistributed from passive defense to utility) |

---

### 9.12 Minotaur

> Innate biology: Bovine skull with horns, powerful musculature, charging gait, dense bone structure, heavy build.

**Verdict: Differentiate from Hune.** Giant's Blood becomes Powerful Build — retaining HP and heavy weapon ease while dropping carry capacity (now Hune-exclusive). This creates a clear split: Hune = endurance/resilience, Minotaur = combat/aggression.

**Powerful Build.** 🔄 REWORK *(replaces Giant's Blood)*
+2 HP. You also gain the following effects:

- Add +1 to your carrying capacity.
- Decrease the Strength requirement for heavy weapons you wield by -1d (min. d4).

> *Design rationale: Differentiating from Hune (R3, R11). Minotaur retains HP and heavy weapon ease (combat-focused) but carry capacity is reduced to +1 (from +2) with full +2 moving to Hune. The remaining abilities (Horns + Goring Charge) provide the aggressive combat identity that Hune now lacks, creating a clear niche split.*

**Horns.** ✅ KEEP
You can use your horns (3 weapon damage, crush) as a brawling weapon instead of unarmed attacks.

**Goring Charge.** ✅ KEEP
After you spend 1 or more Movement towards a creature and hit them with an attack using your horns, add your weapon damage an additional time to the total damage.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 6 | 5 | -1 (reduced carry) |
| Utility Budget | 2 | 1 | -1 (carry +1 instead of +2) |
| Net Budget | **8** | **6** | **-2** |

---

### 9.13 Dogfolk

> Innate biology: Canine olfactory system, acute hearing, pack-bonding instinct, strong jaw.

**Verdict: Significant combat buffs.** Keen Senses gains a blood-scent combat application (boon vs. bleeding targets). Pack Loyalty broadens to any attack type (not just melee) and gains a second use. These changes make Dogfolk the "teamwork and pursuit" folk without changing their core identity.

**Keen Senses.** 🔄 REWORK
You have an extraordinary sense of smell and hearing. You gain +1 boon on Perception rolls based on smell or hearing. You can detect the presence and general direction of creatures within close range by scent alone, even if you can't see them, as long as air can reach you from their location. In combat, you gain +1 boon on attack rolls against bleeding creatures — you can smell their wounds. Weather or other environmental factors may hinder scent-based abilities.

> *Design rationale: The bleeding-target boon (R5) transforms a pure-utility ability into a combat/utility hybrid. It reinforces the hunting-pack fantasy — dogfolk pursue wounded prey — and synergizes naturally with allies who inflict bleeding (via weapons with the bloody enchantment, bleeding conditions from combat arts, etc.). This gives Dogfolk a combat identity without removing their exploration strengths.*

**Pack Loyalty.** 🔄 REWORK
While you are close to an ally, you can coordinate your attack. You gain +1 boon on an attack roll and that ally also briefly gains +1 boon on their next attack against the same target. You can use this ability twice per combat.

> *Design rationale: Two changes: "melee attack" → "attack" (works for ranged Dogfolk too) and "once per scene" → "twice per combat" (R5). The frequency increase makes Pack Loyalty a reliable tactical tool rather than a single-use novelty, and broadening to any attack type means Dogfolk rangers and archers benefit alongside Dogfolk fighters.*

**Bite.** ✅ KEEP
You can use your bite (2 weapon damage, crush) as a brawling weapon instead of unarmed attacks.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 2 | 5 | +3 (bleeding boon, doubled Pack Loyalty, any attack type) |
| Utility Budget | 3 | 3 | — |
| Net Budget | **5** | **8** | **+3** |

---

### 9.14 Satyr

> Innate biology: Goat legs with hooves, small horns, innate magical resistance, sure-footed in rough terrain.

**Verdict: Minor enhancement to Woodland Stride.** Wild Resilience and Horns are well-designed. Woodland Stride gains a balance/footing component that provides minor combat relevance in outdoor encounters.

**Wild Resilience.** ✅ KEEP
When you take damage from a spell or are affected by a magical effect that applies a condition, you can choose to either gain resistance against the damage or negate the condition. You can use this ability once per scene.

**Horns.** ✅ KEEP
You can use your horns (2 weapon damage, crush) as a brawling weapon instead of unarmed attacks.

**Woodland Stride.** 🔄 REWORK
You treat difficult terrain caused by natural vegetation as normal terrain. Your sure-footed hooves grant you +1 boon on Agility + Athletics rolls to climb, balance, or traverse natural environments. You also gain +1 boon on rolls to resist being knocked prone while on natural ground.

> *Design rationale: The prone-resistance boon on natural ground gives Woodland Stride a minor defensive combat application in outdoor encounters. Satyrs with goat legs should be among the hardest creatures to topple on uneven ground. This is narrower than Dwarf's Squat Build (which works on any surface) but provides some combat relevance in the right environments.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 3 | 4 | +1 (prone resistance on natural ground) |
| Utility Budget | 2 | 2 | — |
| Net Budget | **5** | **6** | **+1** |

---

### 9.15 Revised Balance Comparison

| Folk | Before Budget | After Budget | Change | New Tier |
|------|:---:|:---:|:---:|:---:|
| **Dwarf** | 8 | 8 | — | A |
| **Elf** | 5 | 8 | +3 | A |
| **Gnome** | 4 | 6 | +2 | B |
| **Hune** | 6 | 8 | +2 | A |
| **Orc** | 5 | 7 | +2 | A |
| **Goblin** | 3 | 6 | +3 | B |
| **Human** | 8 | 8 | 0 | A |
| **Catfolk** | 5 | 7 | +2 | A |
| **Lizardfolk** | 7 | 7 | 0 | A |
| **Minotaur** | 8 | 6 | -2 | B |
| **Dogfolk** | 5 | 8 | +3 | A |
| **Satyr** | 5 | 6 | +1 | B |

**New range:** 6–8 (1.3× spread, down from 2.7×).
**New tiers:** 8 folk at A-tier, 4 at B-tier, 0 at S-tier or C-tier.

The B-tier folk (Gnome, Goblin, Minotaur, Satyr) all have clear reasons for their slightly lower budget:
- **Gnome/Goblin**: Small Stature still carries a net penalty despite the dodge addition — a biological constraint that creates a genuine trade-off.
- **Minotaur**: Three combat-focused abilities with limited utility. The charging warrior niche is powerful but narrow.
- **Satyr**: Wild Resilience is meta-dependent (strongest in magic-heavy campaigns). The folk's value varies more by campaign than by build.

### 9.16 Change Summary Matrix

| Folk | Ability 1 | Ability 2 | Ability 3 | Key Change |
|------|-----------|-----------|-----------|------------|
| **Dwarf** | Dwarven Sight ✅ | Stoneskin ✅ | Squat Build ✅ | None |
| **Elf** | Spirit Sight 🔄 | Fleet-Footed 🔄 | Spiritual Symbiosis 🔄 | Major buff; unique spiritual detection; scene-frequency mobility; Nature boon with barren-terrain penalty |
| **Gnome** | Natural Empath ✅ | Scent of Illusions ✅ | Small Stature 🔄 | Dodge boon vs. large+ creatures added |
| **Hune** | Towering Endurance 🔄 | Stoic Mind ✅ | Imposing Stature 🆕 | Differentiated from Minotaur; environmental resistance; new intimidation ability |
| **Orc** | Orcish Fury ✅ | Pride above Death ✅ | Adrenaline Surge 🆕 | New reactive combat boon when damaged |
| **Goblin** | Night Vision ✅ | Quick Escape 🔄 | Small Stature 🔄 | Hide-after-dodge option; Dodge boon vs. large+ |
| **Human** | Will of Perseverance ✅ | Arcane Awakening 🔄 | Arcane Sensitivity 🆕 | Focus +2→+1; new magical detection for all humans |
| **Catfolk** | Predator's Eyes 🔄 | Intimidating Roar ✅ | Sharp Claws ✅ | Motion-tracking Perception boon |
| **Lizardfolk** | Thick Scales 🔄 | Aquatic Nature 🔄 | Reptile Jaws ✅ | AV +3→+2 unarmored; swimming boon added |
| **Minotaur** | Powerful Build 🔄 | Horns ✅ | Goring Charge ✅ | Differentiated from Hune; carry +2→+1 |
| **Dogfolk** | Keen Senses 🔄 | Pack Loyalty 🔄 | Bite ✅ | Bleeding-target boon; 2×/combat any attack |
| **Satyr** | Wild Resilience ✅ | Horns ✅ | Woodland Stride 🔄 | Prone resistance on natural ground |

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
