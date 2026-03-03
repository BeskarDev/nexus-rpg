# Enchantments & Magic Items — Comprehensive Design Analysis

## Executive Summary

This document provides a thorough analysis of the enchantment and magic item systems in Nexus RPG. The current system is well-structured with clear cost formulas, multiple enchantment categories, and a coherent Quality tier progression (Q3–Q8). However, several gaps and improvement opportunities have been identified — particularly around non-combat game modes (travel, exploration, social intrigue), the recently added wand/staff items, and the relationship between enchantments and the talent/metamagic systems.

> **Scope note:** Material properties (Greater/Legendary tiers) are deferred to a separate analysis task and are not covered here.

### Quick Stats

- **Enchantment Categories**: 5 current (Ammo, Weapon, Spell Catalyst, Armor/Shield combined, Wearable) → 5 proposed (Ammo, Weapon, Armor, Shield, Wearable; catalyst table removed — catalysts use wearable enchantments)
- **Total Unique Enchantments**: 50 (6 ammo + 12 weapon + 6 spell catalyst + 6 armor/shield + 20 wearable)
- **Magic Item Types**: 7 (Weapons, Armor/Shields/Helmets, Ammo, Spell Scrolls, Wands, Staffs, Wearables)
- **Quality Tiers**: Q3–Q8 (Masterwork through Supreme)

### Key Findings

1. **Armor and shield enchantments should be separate tables** — shields are currently awkwardly categorized as weapons for magic item purposes. Splitting them gives both armor and shields room to grow with distinct identities.
2. **Spell catalyst enchantment table should be removed** — with wands and staffs now providing robust charge-based spellcasting, the catalyst table adds complexity without clear value. Catalysts should instead use the wearable enchantment list (since catalysts must be integrated into a slot on the wearer). Some useful catalyst ideas can migrate to the wearable table.
3. **Enchantments almost entirely ignore non-combat play** — travel, exploration/dungeon delving, and social intrigue are established or in-development subsystems, but enchantments provide virtually no support for these game modes.
4. **Utility magic items need categorization** — the random treasure generator includes a "Utility" category with diverse sub-types (Everyday Object, Container, Instrument, etc.), but no framework exists for enchanting or standardizing these items. Some effects can be delivered via wearable enchantments; the rest need a curated named-item approach.
5. **Enchantment scaling philosophy needs differentiation** — not all enchantments should follow the same Q4/Q5/Q6 pattern. Some effects are inherently low-tier only, others should only appear at high quality, and scaling should add new capabilities rather than simply increasing numbers. Immunity should be high-quality, triggered, and limited — never passive.
6. **All enchantment tables should use d100** — for future-proofing and to allow clean expansion over time. Each table's entry count must be clearly divisible by 100.
7. **Enchantments and talents must work in harmony** — analysis of the talent system and metamagic arts reveals several synergy opportunities and a few potential anti-synergies that need careful design to avoid invalidating character investment.
8. **Non-combat enchantments must not trivialize game modes** — enchantments should enhance play, not eliminate resource management loops or dump unresolved work on the GM. Effects need clear resolution mechanics (see the "Sense of Deduction" Rank 2 model).
9. **Low-tier quality-of-life enchantments need a "tack on" model** — binary Q4-only capabilities (Morphing, Returning, Comprehension) shouldn't prevent a high-quality item from also having a powerful enchantment.

### Role Categories

This analysis uses the six categories established for the magic system:

| Role | Description |
|------|-------------|
| **Offense** | Threatens, damages, or removes opposition |
| **Defense** | Protects, mitigates harm, or creates safe posture |
| **Healing** | Restores or relieves physical, mental, or social harm |
| **Control** | Shapes enemy behaviour or the environment to your advantage |
| **Support** | Empowers allies, organises groups, or reshapes social outcomes |
| **Utility** | Exploration, knowledge, travel, resource creation, and scene tools |

### Design Principles

Throughout this analysis, the following principles guide all recommendations:

1. **Anti-trivialization** — enchantments should not remove entire modes of play. A navigation enchantment should grant boons, not auto-succeed on all Navigator rolls. Resource management (supplies, fatigue, durability) must remain meaningful.
2. **GM-ease** — any non-combat enchantment that requires the GM to provide information or adjudicate a novel situation must include a clear resolution mechanic. Model: the Insight talent "Sense of Deduction" Rank 2 — the GM answers true/false to one specific assessment, with a defined scope and frequency. Enchantments should follow this pattern: define what the GM reveals, how often, and at what level of detail.
3. **Talent harmony** — enchantments should complement the talent system, not replace it. An enchantment giving +1 boon on Perception is additive to Dungeon Delver's trap analysis; it doesn't replicate or invalidate the talent's unique investigation mechanic.
4. **Limited resource discipline** — powerful active effects should use limited resources (X/day or X/scene) rather than being passive. See Appendix F for a detailed comparison of 1/scene vs. X/day models.

---

## 1. Current System Catalogue

### 1.1 Magic Item Types

| Item Type | Quality Range | Key Mechanic | Notes |
|-----------|---------------|--------------|-------|
| **Weapons** | Q3–Q8 | +1 to +5 weapon damage, durability | Core combat items |
| **Armor/Shields/Helmets** | Q4–Q8 | +1 to +5 AV, durability | Magic AV bonuses start at Q4; shields are treated as both weapons and armor |
| **Ammo** | Q3–Q8 | +1 to +6 flat damage bonus | Supply-based, enchanted ammo is per-piece |
| **Spell Scrolls** | Q3–Q8 | Single-use spell, rank 0–5 | Craftable with talent |
| **Wands** | Q4–Q8 | Single spell, 4–20 charges, catalyst bonus | Recently added |
| **Staffs** | Q4–Q8 | 3–6 spells, 6–30 charges, catalyst bonus | Recently added |
| **Wearables** | Q4–Q6 | Enchantment-only (no base magic bonus) | Skip magic item base cost |

### 1.2 Enchantment Categories

> **Note on d100 future-proofing:** All enchantment tables should be converted to d100 format for future-proofing and clean expansion. This requires each table's total entry count to evenly divide 100. Current tables use d6/d12/d20 — see Section 2.10 for the conversion analysis and proposed target counts.

#### 1.2.1 Ammo Enchantments (6 options, rolled on d6)

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Burning | Q4/Q5/Q6 | Inflict burning (4/6/8) on hit | Offense |
| 2 | Draining | Q5 only | Briefly stun target, once/scene/target | Control |
| 3 | Ensnaring | Q4/Q5/Q6 | Grapple Large or smaller targets; escape TN 8/10/12 | Control |
| 4 | Shattering | Q4/Q5/Q6 | 4/6/8 blast damage to target + melee-range creatures; prone on strong/crit | Offense |
| 5 | Seeking | Q4/Q6 | Ignore range/cover penalties, +1 boon; Q6 targets behind full cover | Support |
| 6 | Wounding | Q4/Q5/Q6 | Inflict bleeding (4/6/8), once/scene/target | Offense |

#### 1.2.2 Weapon Enchantments (12 options, rolled on d12)

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Bloody | Q4/Q5/Q6 | Inflict/increase bleeding (2/4/6) on strong/crit | Offense |
| 2 | Booming | Q4/Q5/Q6 | Deal blast damage; push target; 1/2/3× per day | Offense / Control |
| 3 | Defiled | Q4/Q5/Q6 | Necrotic damage (2/4/6) ignoring AV; dims light | Offense |
| 4 | Flaming | Q4/Q5/Q6 | Fire damage (2/4/6) ignoring AV; emits light | Offense |
| 5 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support |
| 6 | Morphing | Q4 only | Transform between two weapon forms | Utility |
| 7 | Poisoner's | Q4/Q6 | +2/+4 poison damage or increased poison difficulty | Offense |
| 8 | Returning | Q4 only | Thrown property + recall as Quick Action | Utility |
| 9 | Sacred | Q4/Q5/Q6 | Radiant damage (2/4/6) ignoring AV; emits light | Offense |
| 10 | Sentinel | Q4/Q5 | Glow near creature type; Q5 +1 boon on rolls vs. type | Utility |
| 11 | Slaying | Q4/Q5/Q6 | +2/+4/+6 damage vs. creature type | Offense |
| 12 | Sundering | Q4/Q5/Q6 | Ignore 1/2 AV; 1/2/3× per day | Offense |

#### 1.2.3 Spell Catalyst Enchantments (6 options, rolled on d6)

> **Status: Recommended for removal.** See Section 2.2 for full analysis. Spell catalysts (wands, staffs, orbs) must always be integrated into an equipment slot on the wearer. They should use the **wearable enchantment list** instead of maintaining a separate table. Useful catalyst-specific effects (Stabilizing, Volatile) can migrate to the wearable table.

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Storing | Q4/Q5/Q6 | Store rank 1/2/3 spell, cast 1×/day without Focus | Support |
| 2 | Deflecting | Q4 only | +1 Parry property | Defense |
| 3 | Glowing | Q4 only | Emit light with command word | Utility |
| 4 | Stabilizing | Q4/Q5/Q6 | Re-roll failed spell cast; 1/2/3× per day | Support |
| 5 | Volatile | Q4/Q5/Q6 | +2/+4/+6 spell damage, costs Durability check | Offense |
| 6 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support |

#### 1.2.4 Armor/Shield Enchantments (6 options, rolled on d6)

> **Structural issue**: This single table covers body armor, shields, and helmets despite these being mechanically distinct item types. See Section 2.1 for the recommendation to split into separate armor and shield tables.

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Anchoring | Q4/Q5/Q6 | Resist push/prone; retaliate 2/4/6 damage; 1/2/3× per day | Defense / Offense |
| 2 | Blurring | Q4/Q5/Q6 | Mirror Image duplicates (8/9/10 Defense); 1/2/3× per day | Defense |
| 3 | Temperate | Q4 only | Immunity to extreme cold OR heat | Utility |
| 4 | Stalwart | Q4 only | Ignore one mental/physical condition; 1×/day | Defense |
| 5 | Tough | Q4/Q5/Q6 | Gain resistance to damage; 1/2/3× per day | Defense |
| 6 | Silent | Q4/Q6 | Reduce rigid, remove noisy, or +1 Stealth boon | Utility |

#### 1.2.5 Wearable Enchantments (20 options, rolled on d20)

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | of Protection | Q4/Q5/Q6 | +1/+2/+3 AV (unarmored only) | Defense |
| 2 | of Willpower | Q4/Q5/Q6 | +1/+2/+3 Resist (max 10/12/14) | Defense |
| 3 | of Guarding | Q4/Q5/Q6 | +1/+2/+3 Parry (max 10/12/14) | Defense |
| 4 | of Reflexes | Q4/Q5/Q6 | +1/+2/+3 Dodge (max 10/12/14) | Defense |
| 5 | of Shielding | Q4/Q5/Q6 | Absorb 10/15/20 non-physical damage | Defense |
| 6 | of Might | Q4/Q6 | +1/+2 Strength (up to d8/d10) | Support |
| 7 | of Swiftness | Q4/Q6 | +1/+2 Agility (up to d8/d10) | Support |
| 8 | of Wisdom | Q4/Q6 | +1/+2 Spirit (up to d8/d10) | Support |
| 9 | of Intellect | Q4/Q6 | +1/+2 Mind (up to d8/d10) | Support |
| 10 | of Ogre Strength | Q4/Q5/Q6 | +1/+2/+3 unarmed weapon damage | Offense |
| 11 | of Fast Stride | Q4/Q6 | +1/+2 Movement per turn | Utility |
| 12 | of Pure Thought | Q4 only | Immune to thought-reading, charm, magical sleep; resist psychic | Defense |
| 13 | of Fortitude | Q4/Q5/Q6 | +2/+4/+6 HP | Defense |
| 14 | of the Guardian | Q4/Q6 | +1/+2 boon on Initiative | Support |
| 15 | of Attunement | Q4/Q5/Q6 | +2/+4/+6 max Focus | Support |
| 16 | of Comprehension | Q4 only | Understand and speak one language | Utility |
| 17 | of Arcane Knowledge | Q4/Q5/Q6 | Store arcane spell rank 1/2/3, cast 1×/day | Support |
| 18 | of Divine Guidance | Q4/Q5/Q6 | Store mystic spell rank 1/2/3, cast 1×/day | Support |
| 19 | of Immunity | Q4 only | Immune to one condition | Defense |
| 20 | of Resistance | Q4 only | Resist one damage type | Defense |

### 1.3 Cost Calculation Edge Cases

The standard cost formula is: `Total Cost = Base Item + Magic Item Base Cost + Special Material (optional) + Enchantment (optional)`

This formula works cleanly for most items but has three important edge cases that can trip up GMs:

> **⚠️ Edge Case 1: Wearables skip the Magic Item Base Cost.**
> Wearable items (rings, amulets, boots, etc.) only pay the base item cost + enchantment cost. They do **not** pay the magic item base cost. This makes wearables significantly cheaper than weapons or armor of equal quality.
>
> *Example: A Q4 Amulet of Protection costs 50 (base) + 1,000 (enchantment) = **1,050 coins**, while a Q4 magic longsword costs 50 (base) + 1,000 (magic item base) = **1,050 coins** without any enchantment.*

> **⚠️ Edge Case 2: Morphing weapon has a unique cost formula.**
> Morphing requires destroying a masterwork weapon during crafting. The cost is: add both base weapon costs + any material extras for each, then pay the enchantment cost once. This breaks the standard formula.
>
> *Example: A morphing longsword/shortsword costs (50 + 25) base + 1,000 magic item base + 1,000 enchantment = **2,075 coins**.*

> **⚠️ Edge Case 3: Enchanted ammo uses per-piece pricing.**
> Regular magic ammo is supply-based (one stack = multiple uses). Enchanted ammo is sold as individual pieces (up to 3 pieces per item slot). Three pieces of enchanted ammo costs the same as one stack of regular magic ammo of the same quality.
>
> *Example: 3 pieces of Q4 burning arrows +1 cost 15 (base) + 150 (magic ammo base) + 150 (enchantment) = **315 coins** total for 3 individual uses.*

---

## 2. Critical Analysis

### 2.1 Armor and Shield Enchantments Should Be Separate Tables

**Issue:** Armor and shields currently share a single enchantment table (6 options on d6), despite being mechanically distinct item types. Shields are awkwardly dual-classified — they use the weapon damage bonus progression but share the armor enchantment table. This creates confusion and limits both item types.

**Why split:**
- **Shields have unique combat identity** — blocking, bashing, cover-extension, and reactive defense. These deserve dedicated enchantments that lean into the shield's active role in combat.
- **Body armor is passive defense** — it benefits from enchantments focused on damage reduction, environmental protection, and resilience. These don't map well to shields.
- **Helmets** are a third sub-type. They could share the armor table or have a small dedicated list (2–3 options).
- **Splitting resolves the weapon/armor categorization problem** — if shields have their own enchantment table, they no longer need to be awkwardly treated as weapons for enchantment purposes.

**Proposed split:**

| Category | Current Count | Proposed Count (d100) | Die |
|----------|--------------|----------------------|-----|
| **Armor Enchantments** | 6 (shared) | 10 | d100 (10 entries × 10 each) |
| **Shield Enchantments** | 0 (shared with armor) | 10 | d100 (10 entries × 10 each) |

**Natural fit for each table:**

- **Armor**: Tough, Blurring, Stalwart, Temperate, Silent → passive/reactive defense
- **Shield**: Anchoring → active defense; new options for blocking, riposte, cover-extension, ally protection

### 2.2 Spell Catalyst Enchantment Table Should Be Removed

**Issue:** With wands and staffs now providing robust charge-based spellcasting (including spell storage, heightening, and multi-spell holding), the existing spell catalyst enchantment table adds complexity without clear value. The cleanest solution is to **remove the catalyst enchantment table entirely**.

**Why remove rather than reduce:**
- **Catalysts must always be integrated into an equipment slot** — wands held in-hand, staffs wielded, orbs worn as amulets, etc. Since catalysts already occupy a slot, they can simply use the **wearable enchantment list** (the rules already say: "If a suffix is needed for a non-wearable item, roll on the wearable table").
- **Storing** is fully redundant with wand/staff inherent spell storage.
- **Infused** duplicates the weapon version and overlaps with wand/staff charge economy.
- **Deflecting** is more appropriate as a weapon property than a catalyst enchantment.
- **Glowing** is trivially low-impact — could be a baseline feature of all magic items.
- **Stabilizing** and **Volatile** are the only unique effects. Both can migrate to the wearable enchantment table with broader applicability (any slot-compatible catalyst benefits).

**Migration plan:**

| Current Catalyst Enchantment | Disposition |
|-----|-----|
| Storing | Remove — redundant with wand/staff inherent feature |
| Deflecting | Remove — reclassify as a weapon property if desired |
| Glowing | Remove — make a baseline cosmetic feature of magic items |
| Stabilizing | Migrate to wearable table as "of Stability" |
| Volatile | Migrate to wearable table as "of Volatility" |
| Infused | Remove — already exists on weapon table; wand/staff charge economy covers this |

**The D&D "Staff of Power" model:** Instead of generic enchantments, powerful staves and wands should be designed as unique named items with bespoke abilities. A "Staff of Storms" with a unique lightning ability is more compelling than a "Volatile Staff +2." This should be a separate design document.

### 2.3 Enchantments Ignore Non-Combat Game Modes

**Issue:** The game has established or in-development non-combat game modes — **Travel**, **Exploration/Dungeon Delving**, **Social Intrigue**, and **Challenges** — but enchantments provide virtually no support for any of them. Almost every enchantment is combat-focused.

> **Important note on exploration:** The exploration crawl system is currently in the **analysis/design stage** and is NOT yet officially in the game rules. The roles (Pathfinder, Lookout, etc.) and specific procedures are not canon. However, the general concepts — hex/point crawl exploration, searching, environmental traversal, discovery — are well-established and can inform enchantment design space without relying on specific implementation details.

#### 2.3.1 Travel Mode

The Travel system uses daily roles (Navigator, Scout, and optional Quartermaster/Forager/Hunter/Fisher) with skill rolls against a travel difficulty TN. Key mechanics include progress tracking via challenge dice, supply management, shelter-finding, weather events, fatigue, and checkpoints.

**Enchantment opportunities for travel:**
- **Navigation aids** — bonuses to Nature/Survival rolls for navigation, or reduced penalties from failed navigation
- **Scouting benefits** — bonuses to Perception/Survival rolls for scouting, or improved information from scout rolls
- **Supply preservation** — reduced supply consumption, better Supply Check results, extended durability
- **Weather/climate protection** — Temperate already does this, but only at Q4 with no scaling. The travel system includes "Extreme Climate" checkpoints that require Strength + Fortitude rolls.
- **Fatigue reduction** — the travel system generates fatigue from bad navigation, forced marches, and extreme climate. Enchantments could mitigate this.
- **Camp enhancement** — the travel system has a "Make Camp" phase with shelter-finding and rest quality

**Current enchantments that touch travel:** Temperate (Q4 only, extreme cold/heat immunity), Silent (stealth during travel). That's 2 out of 50.

#### 2.3.2 Exploration & Dungeon Delving

The general concept involves action-based exploration at a 2–4 hour time scale with searching, environmental traversal, trap interaction, and discovery. Dungeon delving uses a similar structure at a shorter time scale (delving turns).

**Enchantment opportunities for exploration:**
- **Search enhancement** — bonuses to Perception for finding hidden features or traps (complements the Dungeon Delver talent without replacing its unique investigation mechanic)
- **Light sources** — Glowing is trivial; expanded light could reveal hidden things or dispel magical darkness
- **Environmental traversal** — waterbreathing, climbing aids, safe falls, darkvision, tremorsense
- **Trap interaction** — resistance to trap damage, improved trap detection, reduced trap trigger chance

> **Design note (anti-trivialization):** Exploration enchantments must not auto-reveal all traps or bypass all environmental hazards. They should grant boons on specific rolls or provide limited-use benefits, not replace the exploration loop entirely. Compare with D&D 5e's problematic "detect magic at will" which trivializes magical trap discovery.

> **Design note (GM-ease):** Any enchantment that reveals information (e.g., "detect traps nearby") should follow the Sense of Deduction Rank 2 model — define exactly what the GM reveals (presence vs. location vs. type), how often (1×/day, 1×/scene), and what the scope is (current area, close range, etc.). Bad example: "you sense danger nearby" (vague, dumps work on GM). Good example: "once per day when you enter a new area during dungeon delving, the GM tells you whether a trap or hidden mechanism exists in the area — but not its location or type."

**Current enchantments that touch exploration:** Glowing (Q4 only, emit light). Barely relevant.

#### 2.3.3 Social Intrigue

The Social Intrigue system tracks **Interest** (NPC willingness, modifies the challenge TN), **Patience** (challenge die, d4/d6/d8), **Motivations** (hidden NPC goals that raise Interest when appealed to), and **Pitfalls** (sensitive topics that lower Interest when triggered). Key skills: Influence, Insight, Education, Lore. Resolution depends on final Interest score.

**Enchantment opportunities for social intrigue:**
- **Interest manipulation** — start negotiations with higher Interest, or recover from Pitfall triggers
- **Insight enhancement** — bonuses to read NPC Motivations or detect Pitfalls before triggering them
- **Persuasion aids** — bonuses to Influence rolls during intrigue, or extend NPC Patience
- **Deception tools** — disguise, voice alteration

> **Design note (anti-trivialization):** Social enchantments must not bypass the Social Intrigue system. Auto-detecting all Motivations would trivialize the discovery loop. Instead, limit to one free Motivation reveal per intrigue, or grant boons on specific Insight rolls.

> **Design note (GM-ease):** Social enchantments that reveal NPC information should define exactly what the GM provides. Model: "once per intrigue, the GM reveals one of the NPC's Motivations (not Pitfalls)" — clear scope, defined frequency, doesn't require GM improvisation.

**Current enchantments that touch social intrigue:** of Comprehension (language only), of the Guardian (Initiative, not social). Neither directly supports intrigue mechanics.

#### 2.3.4 Summary — Game Mode Coverage Gap

| Game Mode | Relevant Enchantments | Out of 50 Total | Coverage |
|-----------|----------------------|-----------------|----------|
| **Combat** | ~45 | 50 | ✅ Dominant |
| **Travel** | 2 (Temperate, Silent) | 50 | ❌ Minimal |
| **Exploration** | 1 (Glowing) | 50 | ❌ Nearly zero |
| **Social Intrigue** | 1 (Comprehension) | 50 | ❌ Nearly zero |
| **Downtime/Crafting** | 0 | 50 | ❌ None |

### 2.4 Utility Magic Items Need Categorization

**Issue:** The random treasure generator includes a "Utility" treasure type with a "Magical Utility Items" table (d12: Alchemical, Spell Scroll, Ammo, Wand, Staff, Everyday Object, Container, Instrument, Body Part, Natural). However, there is no framework for enchanting non-equipment utility items — items that don't fit neatly into weapon, armor, or wearable categories.

**Proposed utility item categories (based on random treasure sub-tables):**

| Category | Examples | Enchantment Approach |
|----------|---------|---------------------|
| **Containers** | Bags, boxes, pouches, vessels, urns, bottles | Curated named items (effects too diverse for a table) |
| **Everyday Objects** | Rods, ropes, lanterns, compasses, mirrors, keys | Curated named items |
| **Instruments** | Drums, flutes, horns, bells, chimes | Curated named items (could integrate with Bard archetype) |
| **Animated Objects** | Figurines, carpets, brooms, carts | Curated named items |
| **Transportation** | Boats, chariots, saddles, bridles | Curated named items |
| **Communication** | Sending stones, message bottles, speaking tubes | Curated named items |

**Recommendation:** Many "utility" effects can be delivered through wearable enchantments when the item occupies a slot (ring of featherfall, boots of waterbreathing, cloak of the chameleon). For truly slot-less utility items, a curated catalogue of named items organized by game mode is more practical than a rollable enchantment table.

> **Note for future work — Temporary enchantments:** The alchemy system could be expanded to include temporary enchantments — potions, oils, and applied treatments that grant enchantment-like effects for a limited duration. This would be a separate analysis/design document covering the alchemy system expansion, and would provide consumable versions of many enchantment effects (e.g., an oil of fire resistance as a consumable alternative to the permanent "of Resistance" wearable).

### 2.5 Enchantment Scaling Philosophy Needs Differentiation

**Issue:** The current system treats all enchantments as if they should scale from Q4 through Q6 with linearly increasing numbers. But this one-size-fits-all approach creates problems:

**Current pattern:** Most enchantments follow Q4/Q5/Q6 with values like 2/4/6, 1×/2×/3× per day, or TN 8/10/12. This is clean but leads to three issues:

1. **Some effects are inherently low-tier** — Morphing, Returning, Glowing, Temperate, and Comprehension are "quality of life" enchantments that provide a binary capability (transform weapons, throw-and-recall, emit light, ignore weather, speak a language) appropriately powered at Q4. Artificially scaling these adds complexity without value.

2. **Some effects should only appear at high quality** — powerful triggered abilities like condition immunity, damage type immunity, and major active powers (teleportation, flight, phase-shifting) are thematically inappropriate at Q4 but perfect for Q6–Q8. Currently, there's no framework for "high-quality-only" enchantments.

3. **Scaling should add capabilities, not just stack numbers** — increasing damage from 2 to 4 to 6 is simple scaling. But more interesting scaling adds new capabilities at each tier:
   - Q4: Basic effect (e.g., resistance to one damage type, triggered, 1×/day)
   - Q5: Enhanced effect (e.g., resistance to one damage type, triggered, 2×/day, also reduces that damage by a flat amount)
   - Q6: Signature effect (e.g., immunity to one damage type, triggered, 1×/day — not passive)

4. **Immunity should be limited, triggered, and high-quality** — passive immunity to a damage type or condition is extremely powerful. It should:
   - Only be available at Q6+ (not Q4)
   - Be triggered/limited (1×/day or 1×/scene), not passive
   - Cover a narrow scope (one specific condition or damage type)
   - Exception: very narrow passive immunities (like Temperate's weather immunity) are fine at Q4

**Proposed scaling tiers:**

| Tier | Enchantment Type | Examples |
|------|-----------------|---------|
| **Q4 only** | Binary capabilities; quality-of-life | Morphing, Returning, Temperate, Comprehension |
| **Q4–Q6** | Effects that scale meaningfully with power | Flaming (2/4/6 damage), Tough (1×/2×/3× per day) |
| **Q5–Q6** | Effects too powerful for Q4 but not legendary | Siphoning (resource on kill), major control effects |
| **Q6 only** | Powerful triggered abilities | Damage type immunity (triggered, 1×/day), major active powers |
| **Q7–Q8** | Legendary/mythical effects | Unique signature abilities tied to the item's identity; "holy avenger" equivalents |

### 2.6 Low-Tier QoL Enchantments and the "Tack On" Problem

**Issue:** The current rule is one enchantment per item. This means a Q6 flaming sword cannot also be a morphing sword — the player must choose between a powerful enchantment and a convenient quality-of-life feature. This feels restrictive for high-quality items where the QoL effect (morphing, returning, comprehension) is minor compared to the item's power budget.

**Three possible solutions:**

**Option A: Allow secondary low-tier enchantments as a separate upgrade.**
Allow Q4-only binary enchantments to be added to any item as a secondary enchantment at additional cost, without preventing the primary enchantment. This is the simplest approach but introduces a new rule (two enchantments) that breaks the clean "one enchantment per item" principle.

**Option B: Bundle secondary enchantments into the primary enchantment's scaling.**
A primary enchantment could include a secondary low-tier effect at higher quality tiers. Example: Morphing at Q4 is just the base effect. At Q5, morphing grants the base effect + one additional Q4-only enchantment (e.g., Returning). At Q6, morphing grants the base effect + one Q5-or-lower enchantment. This is elegant but changes the identity of the primary enchantment and creates a lot of combinatorial complexity.

**Option C: Make QoL effects a baseline property of high-quality items.**
Instead of treating QoL effects as enchantments, make them baseline properties available to any Q5+ or Q6+ item. For example, any Q6 weapon could inherently have the "morphing" or "returning" property without it counting as an enchantment. This is the cleanest solution but may feel like it devalues the Q4-only enchantments.

> **Recommendation:** Option A is the least disruptive. Define a new rule: "Items of Q5 or higher may have one **minor enchantment** (any Q4-only binary enchantment) in addition to their primary enchantment. The minor enchantment costs its normal Q4 enchantment price." This preserves the one-primary-enchantment rule while allowing QoL stacking.

> **Alternative recommendation (if Option A is too fiddly):** Option C — make Morphing, Returning, and Comprehension baseline properties of Q5+ items at no additional enchantment cost. This simplifies the system and makes high-quality items feel appropriately premium.

### 2.7 Enchantment–Talent Synergy Analysis

**Issue:** Enchantments and talents both grant special abilities to characters. If poorly designed, they can create anti-synergies where investing in a talent becomes pointless if you own a certain magic item, or vice versa. The metamagic arts add a third layer for arcane casters.

#### 2.7.1 Current Synergies (Good)

| Enchantment | Talent | Relationship |
|-------------|--------|-------------|
| Flaming/Sacred/Defiled weapon | Spellblade / Mystic Champion | **Synergy** — elemental weapon damage complements spell-infused attacks; they serve different action economies (Quick Action to activate enchantment vs. Action for spellblade) |
| of Attunement (wearable) | Inexhaustible Mind / Divine Rites | **Synergy** — more max Focus benefits talents that restore Focus based on max |
| Infused (weapon) | Spellweaver (metamagic) | **Synergy** — Focus recovery enables more metamagic use; enchantment restores resources that metamagic consumes |
| Sentinel (weapon) | Monster Hunter (Survival) | **Synergy** — Sentinel detects creature types; Monster Hunter adds damage against larger creatures. Different scopes (type vs. size) so no overlap |
| Tough (armor) | Heavy Armor Mastery (Fortitude) | **Synergy** — Tough grants resistance X/day; Heavy Armor Mastery doubles AV 1/scene. Different triggers, stack cleanly |
| Silent (armor) | Light Armor Mastery (Athletics) | **Synergy** — Silent removes noisy/reduces rigid; Light Armor Mastery ignores noisy at Rank 2 and grants Evade. They cover different properties |
| of Fast Stride (wearable) | Fast Stride (Athletics) | **Synergy** — enchantment gives +1/+2 Movement; talent gives +1 Movement and Dash as Quick Action. Additive, not redundant |

#### 2.7.2 Current Anti-Synergies (Problematic)

| Enchantment | Talent | Issue |
|-------------|--------|-------|
| **of Immunity** (condition, Q4, passive) | **Tough Stomach** R2 (end poisoned/frightened/dazed 1/scene), **Strong Mind** R2 (end mind effects 1/scene), **Body of Bronze** R2 (immune to dazed/stunned while unarmored) | **Anti-synergy** — if you wear a Ring of Immunity (dazed), Body of Bronze R2's dazed immunity is partly redundant. Tough Stomach R2's ability to end dazed/poisoned/frightened becomes less valuable if you're already immune to one of those. **Mitigation:** Moving of Immunity to Q6, making it triggered (1×/day) rather than passive, ensures the talent still has value for the many times beyond that one daily use. |
| **of Pure Thought** (Q4, passive charm/sleep/thought-reading immunity) | **Strong Mind** (Fortitude, ends mind effects), **Divine Sense** R2 (immune to charmed, frightened, poisoned) | **Anti-synergy** — of Pure Thought grants passive charm immunity at Q4. Divine Sense R2 also grants charm immunity (but also frightened and poisoned). A Q4 wearable giving a subset of what a Rank 2 talent provides cheapens the talent investment. **Mitigation:** of Pure Thought should be Q5+ or triggered/limited rather than passive. |
| **Stalwart** (Q4, ignore one condition 1/day) | **Tough Stomach** R2, **Strong Mind** R2, **Body of Bronze** R2 | **Minor overlap** — Stalwart is limited (1/day) while these talents provide repeatable but narrower immunity. The limited nature of Stalwart means the talent still has clear value. This is acceptable. |

#### 2.7.3 Metamagic Art Interactions

| Metamagic Art | Enchantment Interaction | Assessment |
|---------------|------------------------|------------|
| **Quickened Spell** (+2 Focus, cast as Quick Action) | Infused (regain Focus 1/day) | **Synergy** — Infused helps offset Quickened's higher Focus cost |
| **Elemental Spell** (+2 Focus, change damage type) | Flaming/Defiled/Sacred weapons | **Neutral** — Elemental Spell changes spell damage type; weapon enchantments affect weapon damage type. Different systems, no conflict |
| **Empowered Spell** (+X Focus, +2 damage per Focus vs. single) | Volatile catalyst (+2/4/6 spell damage) | **Potential overlap** — both add spell damage. However, Empowered costs more Focus for more damage scaling, while Volatile is fixed damage at a Durability cost. If Volatile migrates to wearable table, this becomes additive (stack cleanly) |
| **Forked Spell** (+2 Focus, cast at second target) | of Arcane Knowledge/Divine Guidance (store spell, cast 1/day) | **Synergy** — stored spells can be Forked for greater tactical value |
| **Autonomous Spell** (2× Focus, no concentration) | Stabilizing catalyst (re-roll failed cast) | **Synergy** — Stabilizing helps land the higher-cost Autonomous spell |
| **Searing Spell** (+2 Focus, ignore resistances) | Slaying weapon (+damage vs. type) | **Synergy** — Searing overcomes resistances while Slaying adds flat damage. Different mechanics, stack well |

#### 2.7.4 Recommendations for Talent Harmony

1. **of Immunity should be Q6+, triggered (1×/day), not passive** — this ensures talents that grant narrower but reliable condition immunity (Body of Bronze, Divine Sense) remain valuable.
2. **of Pure Thought should be Q5+ or triggered** — passive charm/sleep immunity at Q4 undercuts multiple talent investments.
3. **New enchantments should grant boons on skill rolls, not replicate talent abilities** — a "of Trapfinding" enchantment that grants +1 boon on Perception for traps is additive with Dungeon Delver (which grants unique investigation mechanics). But an enchantment that "automatically detects all traps" would make Dungeon Delver pointless.
4. **Enchantments that provide Focus recovery should not exceed talent-based Focus recovery rates** — Inexhaustible Mind (regain half/all Focus during short break) should remain the premier Focus recovery method. Item-based Focus recovery should be supplementary, not a replacement.

### 2.8 Weapon Enchantments — Offense-Dominated, Missing Elements

**Issue:** 12 options provide good variety, but nearly all are offensive. The few non-offensive options (Morphing, Returning, Sentinel) are limited to Q4 or Q4/Q5 and don't scale.

**Breakdown by role:**
- Offense: 8 (Bloody, Booming, Defiled, Flaming, Poisoner's, Sacred, Slaying, Sundering)
- Support: 1 (Infused — Focus recovery)
- Utility: 3 (Morphing, Returning, Sentinel)
- Defense: 0
- Control: 0 (Booming has push but is primarily offensive)
- Healing: 0

**Specific gaps:**
- **No defensive weapon enchantment** — no option enhances Parry, grants damage reduction while wielding, or provides reactive defense on being attacked.
- **No control-focused weapon enchantment** — no option inflicts slow, root, silence, or other control conditions.
- **Elemental coverage is uneven** — fire (Flaming), necrotic (Defiled), radiant (Sacred), and blast (Booming) are covered, but frost, lightning, acid, and psychic damage types have no weapon enchantment.
- **Flaming/Defiled/Sacred are mechanically identical** — same damage values, same activation (Quick Action for short duration), same AV-ignoring behavior. Only damage type and flavor differ.

### 2.9 Wearable Enchantments — Strong but Combat-Focused

**Issue:** The wearable list has 20 options (good variety), but distribution is heavily skewed toward defense and passive stat boosts, with no support for non-combat game modes.

**Breakdown by role:**
- Defense: 9 (Protection, Willpower, Guarding, Reflexes, Shielding, Fortitude, Pure Thought, Immunity, Resistance)
- Support: 7 (Might, Swiftness, Wisdom, Intellect, Attunement, Arcane Knowledge, Divine Guidance)
- Offense: 1 (Ogre Strength for unarmed only)
- Utility: 3 (Fast Stride, Guardian initiative, Comprehension)
- Control: 0
- Healing: 0

**Specific gaps:**
- **No skill-boosting wearables** — no enchantment grants bonuses to specific skills (e.g., Stealth, Perception, Nature), which would directly support travel and exploration roles.
- **No active-ability wearables** — nearly all wearable enchantments are passive. No wearable grants a daily-use active power (e.g., disguise, invisibility, teleportation).
- **No travel/exploration wearables** — beyond Comprehension, no wearable supports Navigator, Scout, or exploration roles.
- **No social wearables** — no wearable supports Influence, Insight, or other social intrigue skills.
- **Attribute caps (d8/d10) limit late-game value** — the "of Might/Swiftness/Wisdom/Intellect" enchantments can only raise attributes to d8 or d10, making them useless for characters who already have high attributes.
- **No catalyst-migrated effects** — with the catalyst table removed, the wearable table should absorb Stabilizing and Volatile as new options available to any slot-wearing spellcaster.

### 2.10 All Tables Should Use d100 Format

**Issue:** Current tables use d6, d12, and d20. For future-proofing, all tables should convert to d100 with each entry's probability weight clearly divisible by 100.

**d100 conversion requirements:**
- Each table must have a total entry count that divides evenly into 100.
- Valid counts: 4 (25 each), 5 (20 each), 10 (10 each), 20 (5 each), 25 (4 each), 50 (2 each)
- Unequal weighting is also possible (e.g., 10 common entries at 8% each + 4 rare entries at 5% each = 80% + 20% = 100%).

**Proposed target counts per table:**

| Table | Current | Target (d100) | Reasoning |
|-------|---------|---------------|-----------|
| **Ammo** | 6 (d6) | 10 (10% each) | Need 4 new entries to reach 10 |
| **Weapon** | 12 (d12) | 20 (5% each) | Need 8 new entries to reach 20; plenty of design space |
| **Armor** | (new) | 10 (10% each) | Start fresh from 5–6 existing armor entries |
| **Shield** | (new) | 10 (10% each) | Start fresh from 1 existing shield entry + 9 new |
| **Wearable** | 20 (d20) | 25 (4% each) | Need 5 new entries to reach 25; absorbs catalyst migrations + game mode entries |

> **Note:** Hitting the target count via adding options is preferred over removing existing options. The d100 format also allows for weighted distributions — e.g., more common enchantments could occupy wider ranges while rare or high-quality-only enchantments occupy narrower ranges.

### 2.11 Ammo Enchantments — Functional but Inconsistent

**Issue:** 6 options is reasonable for a consumable item type, but there are design inconsistencies.

**Specific issues:**
- **Draining is Q5 only** — unlike every other ammo enchantment, it has no Q4 or Q6 variant. This makes it unavailable to early characters and unable to improve with progression.
- **Seeking skips Q5** — available at Q4 and Q6 but not Q5, creating an awkward gap.
- **No utility ammo** — all options are offensive or control. No ammo provides light, signals, smoke screens, or non-combat utility.
- **No elemental variety** — Burning (fire) is the only elemental option. No frost, lightning, acid, or radiant ammo exists.
- **Need 4 more entries to reach d100 target of 10.**

### 2.12 Enchantment Quality Cap at Q6

**Issue:** All enchantments max out at Q6, despite the system supporting Q7 (Legendary) and Q8 (Mythical) quality tiers. The cost tables include Q7 and Q8 enchantment costs, but no enchantment descriptions exist for these tiers.

**Impact:**
- Q7–Q8 items feel mechanically incomplete — they're just "bigger numbers" without distinctive enchantment power.
- The cost of Q7–Q8 enchantments is defined (30,000–100,000+ coins) but buys nothing additional.
- Campaign-defining artifacts lack the mechanical tools to feel truly legendary.

**High-quality-only enchantment concepts (Q7–Q8):**
These should be genuinely legendary effects — equivalent to D&D's Holy Avenger, Vorpal Sword, or Shield of the Hidden Lord. Not just scaled-up versions of lower-tier enchantments.

- **Sentient Shield** (Q7–Q8) — the shield has limited awareness and can act independently; blocks one attack per round without requiring the wielder's action; can fly to intercept ranged attacks on allies in close range
- **Holy Avenger equivalent** (Q7–Q8) — weapon deals massive radiant damage to specific enemy types; grants an aura that provides allies with resistance or Resist bonuses; usable only by a character with a specific Pact of Devotion
- **Phase weapon** (Q7) — 1×/day, attacks ignore all AV and resistances for one round; after use, weapon cannot deal damage for one turn (cooldown)
- **Living armor** (Q8) — the armor can independently grapple one creature in melee range 1×/scene; when the wearer is critically hit, the armor absorbs the wound instead (but takes a permanent durability hit)

> **Design principle:** Q7–Q8 enchantments should feel like they have a story. They're not just "better Flaming" — they're unique signature effects that define the item's identity and might come with limitations or narrative hooks.

### 2.13 Limited Resource Models: 1/scene vs. X/day

Understanding the strengths and weaknesses of each resource model is critical for well-designed enchantment effects.

| Model | Strengths | Weaknesses | Best For |
|-------|-----------|------------|----------|
| **1/scene** | Simple tracking; resets every encounter; prevents "save it for later" hoarding; allows reliable use in every fight | Less meaningful for non-combat scenes (what counts as a "scene" in travel?); can feel too generous if scenes are frequent; less strategic resource management | Defensive reactions, condition removal, single-use combat abilities, effects that should be available in every fight |
| **X/day** | Creates meaningful resource management; forces strategic decisions across multiple encounters; scales well with Quality (1/2/3 per day); works for both combat and non-combat contexts | Tracking burden (players forget daily resets); encourages hoarding ("I'll save it for the boss"); the "5-minute adventuring day" problem — one big fight then rest | Powerful offensive abilities, Focus recovery, healing effects, travel/exploration abilities that span a full adventuring day |
| **1/scene/target** | Prevents ability stacking against a single enemy; encourages tactical variety; good for debuff effects | More complex tracking; less effective in single-boss encounters | Stun effects (Draining ammo), bleeding application, per-target debuffs |

**Design guidance for enchantments:**
- **Defensive reactions** → 1/scene (should always be available per encounter)
- **Powerful offensive triggers** → X/day with X scaling by Quality (e.g., 1/2/3 per day)
- **Focus/HP recovery** → 1/day (always — these are powerful economy effects)
- **Travel/exploration benefits** → 1/day or 1/journey (reset after a night's rest, work across scenes)
- **Social intrigue benefits** → 1/intrigue (treat the full intrigue as a scene)
- **Condition immunity** → 1/day at Q6+ (not passive, see Section 2.5)
- **Condition removal** → 1/scene (should be available when needed, like Stalwart)

---

## 3. Comparative Analysis with Genre Standards

### 3.1 Comparison with D&D 5e Magic Items

| Feature | D&D 5e | Nexus RPG | Assessment |
|---------|--------|-----------|------------|
| Rarity tiers | 4 (Uncommon–Legendary) + Artifact | 6 (Q3–Q8) | ✅ More granular, good |
| Weapon enchantments | 20+ distinct effects | 12 | ⚠️ Adequate but could expand |
| Armor enchantments | 15+ distinct effects | 6 (shared with shields) | ❌ Significantly fewer; split needed |
| Shield enchantments | Distinct shield items | Shared with armor | ❌ Shields have no identity |
| Wearable variety | 50+ distinct items | 20 enchantments | ⚠️ Decent for enchantment-based system |
| Staff/Wand design | Unique named items with bespoke abilities | Generic charge system + enchantment table | ⚠️ Named items approach may be better |
| Utility items | 30+ (Bag of Holding, Immovable Rod, etc.) | No framework | ❌ Major gap |
| Non-combat items | Many (Cloak of Elvenkind, Helm of Comprehension, etc.) | 3 out of 50 | ❌ Severely underdeveloped |
| Consumables | Potions, scrolls, oils | Scrolls, enchanted ammo, alchemy | ✅ Good variety with alchemy system |
| Crafting integration | Optional DMG rules | Core system with talents | ✅ Superior integration |

### 3.2 Comparison with Pathfinder 2e

| Feature | PF2e | Nexus RPG | Assessment |
|---------|------|-----------|------------|
| Rune system | Fundamental + property runes | Base bonus + enchantment | ✅ Similar approach, cleaner |
| Stacking rules | Typed bonuses, highest only | Same: typed bonuses, highest only | ✅ Identical philosophy |
| Shield runes | Distinct shield rune category | Shared with armor | ⚠️ Should differentiate |
| Catalyst/focus items | Focus spells + staves | Wands, staffs, catalyst bonus | ✅ Good foundation |
| Exploration items | Several (everburning torch, wayfinder, etc.) | Nearly none | ❌ Gap for non-combat modes |
| Social items | Diplomacy-boosting items exist | 1 (Comprehension) | ❌ Gap |
| Investment/attunement | Invested items (10 max) | Equipment slots (8) | ✅ Similar bounded system |

### 3.3 Unique Nexus RPG Strengths

1. **Cost formula transparency** — the additive cost formula is cleaner than D&D's arbitrary pricing or PF2e's level-based costs.
2. **Enchantment limit (one per item)** — prevents excessive complexity while making each enchantment choice meaningful.
3. **Wearable slot system** — 8 equipment slots with distinct wearable enchantments provides structured character customization.
4. **Durability integration** — items having durability that interacts with enchantments (Volatile) adds tactical depth.
5. **Refined non-combat systems** — Travel, Exploration, Social Intrigue, and Challenge systems are well-designed. Enchantments just haven't caught up yet.

---

## 4. Recommendations

### 4.1 Priority 1: Split Armor and Shield Enchantment Tables (d100)

**Action:** Separate the current combined armor/shield table into two distinct d100 enchantment tables with 10 entries each.

**Proposed Armor Enchantments (body armor and helmets) — 10 entries for d100:**

Armor enchantments should focus on passive/reactive defense, environmental protection, and resilience.

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 01–10 | Blurring | Q4/Q5/Q6 | Mirror Image duplicates (8/9/10 Defense); 1/2/3× per day | Defense |
| 11–20 | Stalwart | Q4/Q5/Q6 | Ignore one condition (charmed, confused, dazed, frightened, paralyzed, staggered, stunned); 1/2/3× per day | Defense |
| 21–30 | Tough | Q4/Q5/Q6 | Gain resistance to damage; 1/2/3× per day | Defense |
| 31–40 | Silent | Q4/Q6 | Reduce rigid, remove noisy, or +1 Stealth boon | Utility |
| 41–50 | Temperate | Q4 only | Immunity to extreme cold OR heat (travel/exploration) | Utility |
| 51–60 | Vigilant | Q4/Q6 | You cannot be surprised; gain +1/+2 boon on Initiative | Defense |
| 61–70 | Warded | Q5/Q6 | Gain resistance to one chosen non-physical damage type (chosen on creation); 1/2× per day. Q6: triggered immunity instead of resistance, 1×/day | Defense |
| 71–80 | Fortified | Q4/Q5/Q6 | Increase AV by +1/+2/+3 while using the Guard Action or Brace Action | Defense |
| 81–90 | Camouflaged | Q4 only | While outdoors, gain +1 boon on Stealth rolls in the environment the armor was crafted for (choose on creation: forest, desert, mountain, urban, etc.) | Utility |
| 91–100 | Enduring | Q4/Q5/Q6 | Reduce fatigue from environmental effects or forced marches by 1 per day. At Q5/Q6: reduce by 2/3. During travel, the wearer ignores the first Fatigue they would suffer per journey. | Utility |

> Note: Stalwart is updated from Q4-only to Q4/Q5/Q6 with scaling uses per day. Temperate remains Q4-only per the differentiated scaling philosophy (binary capability, appropriately powered). Warded is Q5+ only (too powerful for Q4). Enduring directly supports Travel mode without trivializing it — reduces fatigue, doesn't eliminate it.

**Proposed Shield Enchantments — 10 entries for d100:**

Shield enchantments should focus on active defense, reactive abilities, and ally protection — leaning into the shield's role as an actively used piece of equipment.

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 01–10 | Anchoring | Q4/Q5/Q6 | Resist push/prone; retaliate 2/4/6 damage; 1/2/3× per day | Defense / Offense |
| 11–20 | Covering | Q4/Q5/Q6 | As a Quick Action, extend your shield's AV to one adjacent ally until start of your next turn; 1/2/3× per day | Support |
| 21–30 | Reflecting | Q5/Q6 | When you succeed on Resist vs. a spell, the caster takes 2/4 damage of the spell's type; 1/2× per day | Defense |
| 31–40 | Retaliating | Q4/Q5/Q6 | When a creature in melee range hits you, deal 1/2/3 damage to them (once between your turns) | Defense / Offense |
| 41–50 | Shielding | Q6 only | Once per day, as a triggered ability, gain immunity to one damage type until end of next turn | Defense |
| 51–60 | Rallying | Q5/Q6 | When you take a Wound, allies in close range gain +1/+2 to their next attack; 1×/scene | Support |
| 61–70 | Warding | Q4/Q5/Q6 | While wielding this shield, gain +1/+2/+3 Resist vs. spells (max 10/12/14) | Defense |
| 71–80 | Bashing | Q4/Q5/Q6 | When you hit with a shield bash, the target is briefly dazed on a strong/crit hit. At Q5: also push close distance. At Q6: also knock prone. | Offense / Control |
| 81–90 | Sentinel's | Q4/Q5 | While wielding this shield, allies in melee range gain +1 AV (enhancement bonus). At Q5: extends to close range. | Support |
| 91–100 | Blocking | Q4/Q5/Q6 | When you use Shield Mastery or a shield-related Combat Art, add +1/+2/+3 to the damage reduction or Defense bonus | Defense |

> Note: Reflecting and Rallying are Q5+ only (too powerful for Q4). Shielding is Q6 only and triggered, not passive — per the differentiated scaling philosophy. Shield Mastery talent synergy: Blocking explicitly enhances the Shield Mastery talent and shield Combat Arts, creating a synergy where talent investment is rewarded by the enchantment.

### 4.2 Priority 2: Remove Spell Catalyst Enchantment Table

**Action:** Remove the spell catalyst enchantment table entirely. Spell catalysts (wands, staffs, orbs, conduits) should use the **wearable enchantment list** for their enchantments, since catalysts must always be integrated into an equipment slot on the wearer.

**Migration of useful catalyst effects to wearable table:**

| New Wearable Enchantment | Migrated From | Quality | Effect | Role |
|--------------------------|--------------|---------|--------|------|
| of Stability | Stabilizing (catalyst) | Q4/Q5/Q6 | While holding a spell catalyst, once per turn if you fail to cast a spell, you can re-roll the test; 1/2/3× per day | Support |
| of Volatility | Volatile (catalyst) | Q4/Q5/Q6 | While holding a spell catalyst, once per turn when dealing damage with a spell, add +2/+4/+6 damage. Roll a Durability check for the catalyst. | Offense |

> Note: These enchantments specify "while holding a spell catalyst" to maintain their thematic identity. They can be applied to any wearable slot item (a ring, amulet, bracer, etc.) — the item just needs to be the catalyst or integrate with one. This fits the rules: catalysts must always be integrated into some kind of slot on the wearer, be it as part of a weapon, amulet, or other slot.

**Named wand/staff design (separate document):** Develop a catalogue of named wands and staffs with bespoke abilities. This is where the D&D "Staff of Power" design space lives and should be a separate design document.

### 4.3 Priority 3: Add Enchantments for Non-Combat Game Modes

**Action:** Expand existing enchantment tables (especially wearables and the new armor/shield tables) with options that support Travel, Exploration, and Social Intrigue.

> **Design principles for non-combat enchantments:**
> 1. **Anti-trivialization:** Enchantments grant boons on specific rolls or provide limited-use benefits. They do NOT auto-succeed, auto-detect, or eliminate resource management.
> 2. **GM-ease:** Any information-providing effect defines exactly what the GM reveals, how often, and at what level of detail. No vague "you sense danger" effects.
> 3. **Talent harmony:** Enchantments are additive to talent abilities, not replacements. A navigation boon stacks with Knowledgeable Wanderer; it doesn't replicate the talent's unique features.

#### Travel Enchantments

| Name | Category | Quality | Effect | Role |
|------|----------|---------|--------|------|
| of Pathfinding | Wearable | Q4/Q6 | +1/+2 boon on Nature/Survival rolls for the Navigator role during travel | Utility |
| of Vigilance | Wearable | Q4/Q6 | +1/+2 boon on Perception/Survival rolls for the Scout role during travel | Utility |
| of Endurance | Wearable | Q4/Q5/Q6 | Ignore 1/2/3 Fatigue suffered per journey (from travel events, forced marches, or extreme climate — not from combat) | Support |
| of Provisioning | Wearable | Q4 only | When rolling Supply Checks for rations during travel, roll twice and take the better result | Utility |
| Wayfinder's | Weapon/Shield | Q4 only | While carried during travel, the Navigator gains +1 boon on their next Navigation roll after a failed one | Support |

> **Talent harmony check:** of Pathfinding grants a boon on navigation rolls. Knowledgeable Wanderer (Nature talent) also grants +1 boon on navigation and treats blunders as failures. These stack: a character with both gets +2 boons and blunder protection. Neither invalidates the other. Explorer of Nature (Survival) grants re-rolls in specific environments and reduces blunder options — complementary, not redundant.

#### Exploration & Dungeon Delving Enchantments

| Name | Category | Quality | Effect | Role |
|------|----------|---------|--------|------|
| of Trapfinding | Wearable | Q4/Q6 | +1/+2 boon on Perception rolls to detect traps and hidden features during dungeon delving or exploration | Utility |
| of Darkvision | Wearable | Q4/Q6 | See in darkness as dim light for medium/long range | Utility |
| of Waterbreathing | Wearable | Q4 only | Breathe underwater indefinitely; +1 boon on Athletics rolls to swim | Utility |
| of Featherfall | Wearable | Q4 only | Reduce fall distance by one category for damage; land safely from up to short range falls | Defense |
| Illuminating | Armor/Shield | Q4 only | Emit bright light in close range and dim light in short range on command (no Action). During dungeon delving, +1 boon on Search-related Perception rolls in the current area. | Utility |

> **Talent harmony check:** of Trapfinding grants boons on detection rolls. Dungeon Delver (Perception talent) grants a unique investigation mechanic (spend a minute to analyze a trap, gaining understanding of its effects and bonuses to avoid/disable). These are complementary: the enchantment helps you *find* the trap; the talent helps you *understand and dismantle* it. Neither replaces the other.

> **GM-ease check:** Illuminating's search bonus is a boon on a roll the player initiates. It doesn't ask the GM to spontaneously provide information. of Darkvision defines a clear mechanical effect (see in darkness as dim light) that doesn't require GM adjudication.

#### Social Intrigue Enchantments

| Name | Category | Quality | Effect | Role |
|------|----------|---------|--------|------|
| of the Chameleon | Wearable | Q4/Q6 | 1×/day change appearance for medium duration. Q6: also alter voice, extend to long duration | Utility |
| of Discernment | Wearable | Q4/Q6 | +1/+2 boon on Insight rolls to read NPC Motivations and detect Pitfalls during Social Intrigue | Support |
| of Authority | Wearable | Q5/Q6 | During Social Intrigue, if the NPC has a Disposition of Indifferent or better, start with +1/+2 Interest. 1×/day | Support |
| of Eloquence | Wearable | Q5/Q6 | +1/+2 boon on Influence rolls during Social Intrigue | Support |

> **Anti-trivialization check:** of Discernment grants boons on Insight rolls — it doesn't auto-reveal Motivations. of Authority provides a starting Interest bonus only with non-hostile NPCs and is 1×/day — it doesn't bypass the intrigue system. of the Chameleon provides disguise but doesn't grant automatic success on deception.

> **GM-ease check:** All effects are boons on player-initiated rolls or clearly defined mechanical bonuses (Interest modifier). No effect requires the GM to improvise information or adjudicate edge cases.

### 4.4 Priority 4: Differentiate Enchantment Scaling Across Quality Tiers

**Action:** Apply the differentiated scaling philosophy from Section 2.5 to existing enchantments. Not every enchantment needs to span Q4–Q6.

**Recommended scaling adjustments for existing enchantments:**

| Enchantment | Current | Proposed | Rationale |
|-------------|---------|----------|-----------|
| Morphing | Q4 only | Q4 only ✓ | Binary capability, no need to scale |
| Returning | Q4 only | Q4 only ✓ | Binary capability |
| Glowing | Q4 only | Remove (baseline feature) | Trivial; all magic catalysts could glow |
| Temperate | Q4 only | Q4 only ✓ | Binary environmental protection |
| Comprehension | Q4 only | Q4 only ✓ | Binary language capability |
| Stalwart | Q4 only | Q4/Q5/Q6 (1×/2×/3× per day) | Scales meaningfully via frequency |
| of Immunity | Q4 only (passive) | Q6 only (triggered, 1×/day) | Too powerful as passive Q4; undercuts talents like Body of Bronze and Strong Mind. Should be high-tier triggered. |
| of Pure Thought | Q4 only (passive) | Q5+ (triggered or limited) | Passive charm/sleep immunity at Q4 undercuts Divine Sense R2 and Strong Mind R2 talent investments. |
| of Resistance | Q4 only (passive) | Q4 (passive, single type) ✓ | Resistance is weaker than immunity; fine at Q4 |
| Sentinel | Q4/Q5 | Q4/Q5 ✓ | Scales via new capability at Q5 |
| Draining (ammo) | Q5 only | Q4/Q5/Q6 | Should scale like other ammo |
| Seeking (ammo) | Q4/Q6 | Q4/Q5/Q6 | Fill the Q5 gap |

**New high-quality-only enchantments (Q6+ only):**
- **Damage type immunity** — triggered, 1×/day, single type. Q6 shield enchantment (see Section 4.1, "Shielding").
- **Phase** — 1×/day, move through solid objects for one turn. Q6 wearable.
- **Greater Slaying** — extra wound on crit vs. chosen type, with a save. Q7+ weapon.

### 4.5 Priority 5: Fill Weapon Enchantment Gaps (target: 20 for d100)

**Action:** Add 8 weapon enchantments to reach the d100 target of 20. Cover missing elemental types, roles, and game modes.

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 61–65 | **Frosted** | Q4/Q5/Q6 | Quick Action to coat in frost for short duration. Deal 2/4/6 frost damage ignoring AV. On strong/critical hit, target is slowed briefly. | Offense / Control |
| 66–70 | **Shocking** | Q4/Q5/Q6 | Quick Action to charge with lightning for short duration. Deal 2/4/6 lightning damage ignoring AV. On critical hit, arcs to one creature in melee range of target for half damage. | Offense |
| 71–75 | **Binding** | Q5/Q6 | On strong/critical hit, target must resist (vs. TN 10/12) or be slowed for short duration. 1/2× per day. | Control |
| 76–80 | **Guardian's** | Q4/Q5/Q6 | While wielding, gain +1/+1/+2 Parry. 1×/day, when ally in melee range is hit, use Quick Action to redirect attack to yourself. | Defense / Support |
| 81–85 | **Corrosive** | Q4/Q5/Q6 | Quick Action to coat in acid for short duration. Deal 2/4/6 acid damage ignoring AV. On strong/critical hit, reduce target's AV by 1 briefly. | Offense |
| 86–90 | **Silencing** | Q5/Q6 | On critical hit, target must resist (vs. TN 10/12) or be silenced briefly. 1/2× per day. | Control |
| 91–95 | **Wayfinder's** | Q4 only | While carried during travel, the Navigator gains +1 boon on their next Navigation roll after a failed one. During exploration, gain +1 boon on Survival rolls to track creatures. | Utility |
| 96–100 | **Vigilant** | Q4/Q5 | This weapon glows faintly when danger is near. You cannot be surprised while holding it. At Q5, also gain +1 boon on Initiative. | Defense |

> Note: Binding and Silencing are Q5+ only (control effects are inherently powerful). Guardian's creates direct synergy with Protective Stance (Fighting talent) — the talent lets you use Protect Ally more efficiently, while the enchantment grants Parry and an additional redirect. Wayfinder's directly supports travel/exploration modes.

> **Talent harmony check:** Guardian's +Parry doesn't conflict with Defensive Dueling (+Parry while wielding single non-heavy weapon, no shield) because Guardian's applies to any weapon. The redirect ability complements Protective Stance (shield-based Protect Ally). Vigilant's surprise immunity complements Danger Sense (Perception) which grants re-rolls on Initiative and trap resistance — different mechanics, additive value.

### 4.6 Priority 6: Expand Wearable Enchantments (target: 25 for d100)

**Action:** Add 5 wearable enchantments to reach the d100 target of 25. Include catalyst migrations, non-combat mode support, and healing. Existing 20 entries occupy d100 positions 01–80 (4% each). New entries occupy 81–100.

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 81–84 | **of Stability** | Q4/Q5/Q6 | While holding a spell catalyst, if you fail to cast a spell you can re-roll the test once per turn; 1/2/3× per day | Support |
| 85–88 | **of Volatility** | Q4/Q5/Q6 | While holding a spell catalyst, once per turn when dealing damage with a spell, add +2/+4/+6 damage. Roll a Durability check for the catalyst. | Offense |
| 89–92 | **of the Healer** | Q4/Q5/Q6 | When you use a healer's kit or cast a Healing spell, restore +2/+4/+6 additional HP | Healing |
| 93–96 | **of Skill** | Q4/Q5/Q6 | Choose one skill. Gain +1/+2/+3 to that skill's rolls (skill bonus, max rank 3/4/5). | Support |
| 97–100 | **of Darkvision** | Q4/Q6 | See in darkness as dim light for medium/long range | Utility |

> Note: of Stability and of Volatility are migrated from the removed catalyst table but now apply to any wearable slot. of Skill provides the first skill-boosting wearable. of the Healer provides the first Healing-role enchantment. Additional non-combat wearables from Section 4.3 (of Pathfinding, of Vigilance, of Endurance, of Provisioning, of Trapfinding, etc.) can be integrated into the wearable table in a future revision to expand further toward a larger d100 table if needed.

### 4.7 Priority 7: Address Ammo Enchantment Inconsistencies (target: 10 for d100)

**Quick fixes:**
- **Draining**: Expand to Q4/Q5/Q6 scaling. Q4: briefly stun once/scene/target. Q5: briefly stun + target takes +1 bane on next roll. Q6: briefly stun + target takes +2 banes on next roll.
- **Seeking**: Add Q5 tier. Q4: ignore range/cover, +1 boon. Q5: same + ignore concealment. Q6: same + target behind full cover.

**New ammo options (to reach 10):**

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 61–70 | **Smoke** | Q4 only | On hit, creates a cloud of smoke in melee range of impact point for short duration. Creatures in smoke are blinded while inside. | Utility |
| 71–80 | **Frost** | Q4/Q5/Q6 | On hit, inflict 4/6/8 frost damage and target is slowed briefly. | Offense / Control |
| 81–90 | **Shocking** | Q4/Q5/Q6 | On hit, inflict 4/6/8 lightning damage. On strong/crit hit, arcs to one creature in melee range for half damage. | Offense |
| 91–100 | **Signaling** | Q4 only | On hit, emits bright light and loud noise at impact point for short duration; visible/audible at very long range. Non-combat utility for communication and distress signals during travel/exploration. | Utility |

> Note: Smoke and Signaling are Q4-only (binary capabilities). Frost and Shocking follow the standard elemental scaling pattern. Signaling directly supports travel/exploration by providing a communication tool.

### 4.8 Priority 8: Design Q7–Q8 Enchantment Tier

**Action:** Define what Q7–Q8 enchantments look like, following the differentiated scaling philosophy.

**Design principles for Q7–Q8:**
- Q7 enchantments provide the Q6 effect **plus** an additional triggered ability or expanded scope. Not just bigger numbers.
- Q8 enchantments provide a **signature capstone ability** that defines the item's identity and feels appropriately legendary.
- All Q7–Q8 abilities should be triggered/limited (not passive scaling of lower-tier effects).
- Effects should respect bounded power (mortal pinnacle, not reality-warping).
- Q7–Q8 items should feel like they have a story — unique signature effects with potential limitations or narrative hooks.

**Examples of well-designed Q7–Q8 scaling:**

| Enchantment | Q6 (Current) | Q7 (Proposed) | Q8 (Proposed) |
|-------------|-------------|---------------|---------------|
| **Flaming** (weapon) | 6 fire ignoring AV | 6 fire + 1×/day cone of flame (close range, 12 fire vs. Dodge) | 6 fire + weapon ignites permanently (no activation) + 1×/day flame burst in short range (16 fire vs. Dodge) |
| **Tough** (armor) | Resistance 3×/day | Resistance 3×/day + 1×/day also gain +2 AV until end of next turn | Resistance 3×/day + 1×/scene gain immunity to all damage until end of next turn (triggered) |
| **Stalwart** (armor) | Ignore condition 3×/day | Ignore condition 3×/day + 1×/day also end one ongoing condition on yourself | Ignore condition 3×/day + 1×/day you and all allies in melee range ignore one condition |
| **Slaying** (weapon) | +6 damage vs. type | +6 damage + +1 boon vs. type | +6 damage + +1 boon + on crit, target must Spirit + Fortitude vs. TN 16 or suffer additional wound |
| **of Protection** (wearable) | +3 AV unarmored | +3 AV + 1×/day absorb 10 damage | +3 AV + 1×/day absorb 20 damage + brief physical damage immunity |

> Note: Q8 "immunity" effects are always brief and triggered, never passive. This maintains bounded power while feeling legendary.

**High-quality-only signature enchantments (Q7–Q8 exclusive):**

| Name | Category | Quality | Effect | Role |
|------|----------|---------|--------|------|
| **Sentient** | Shield | Q7 | The shield has limited awareness. 1×/scene, it independently blocks one attack against you without requiring your Quick Action. The shield can also fly to intercept one ranged attack against an ally in close range, 1×/day. | Defense |
| **Avenger's** | Weapon | Q7 | While wielding, you and allies in close range gain +1 Resist. On a hit against undead or spirits, deal +4 radiant damage. Requires a character with a Pact of Devotion or similar oath. 1×/day, deal maximum damage against an undead or spirit creature. | Offense / Support |
| **Living** | Armor | Q8 | The armor can independently grapple one creature in melee range using your Fortitude, 1×/scene. When you are critically hit, the armor absorbs the wound instead (the armor loses 1 permanent Durability — irreversible). | Defense |
| **Phase** | Wearable | Q7 | 1×/day, become incorporeal for one turn. Move through solid objects and creatures. Attacks against you have +1 bane. You cannot attack or interact with physical objects while phased. | Defense / Utility |

### 4.9 Priority 9: Structural & Usability Improvements

#### d100 Table Summary

| Table | Current | Target (d100) | Status |
|-------|---------|---------------|--------|
| **Ammo** | 6 (d6) | 10 (10% each) | +4 new entries proposed |
| **Weapon** | 12 (d12) | 20 (5% each) | +8 new entries proposed |
| **Armor** | new | 10 (10% each) | 10 entries proposed |
| **Shield** | new | 10 (10% each) | 10 entries proposed |
| **Wearable** | 20 (d20) | 25 (4% each) | +5 new entries proposed (catalyst migrations + new) |

All tables use d100 with equal probability per entry. This supports:
- Clean expansion: adding new entries just requires adjusting the probability bands
- Weighted distributions: if desired, more common enchantments can occupy wider d100 ranges
- Consistency: one die type for all enchantment tables

#### Enchantment Organization

**Current structure:** Enchantments are organized by item type in a single document. This is functional but could be improved.

**Recommendation:** Keep the current single-document structure but:
1. **Split armor/shield into separate tables** (see Section 4.1).
2. **Remove spell catalyst table** (see Section 4.2).
3. Add a **quick reference table** at the top listing all enchantments by name with page anchors.
4. Add **role tags** for each enchantment using the six magic system categories (Offense, Defense, Healing, Control, Support, Utility) to help GMs select thematically appropriate items.
5. Add **game mode tags** where applicable (Combat, Travel, Exploration, Social) so GMs planning non-combat sessions can quickly find relevant items.

#### Cost Table Clarity

**Recommendation:**
1. Add worked examples directly into the cost tables document for each item type, prominently featuring the three edge cases identified in Section 1.3.
2. Bold the wearable exception rule ("Wearables skip magic item base cost") and place it in a callout box.
3. Add rows to the cost tables for "Wand" and "Staff" specifically, even if they use the same costs as one-handed/two-handed weapons.
4. Include a "Common Mistakes" callout box near the formula with the three edge cases.

#### Random Treasure Generation

The random treasure generator already includes a "Utility" category but doesn't connect to an enchantment framework.

**Recommendation:**
1. When rolling a Utility result at Q4+, provide guidance on whether the item should be magical and what kind of effect it might have (reference the game-mode enchantment lists from Section 4.3).
2. Add a simple "magic item theme" roll (d6: Combat, Travel, Exploration, Social, Spellcasting, General) to help GMs determine the enchantment's intended purpose for any magical treasure result.

#### Utility Magic Items — Categorization

Based on the random treasure generator's Magical Utility Items table (d12):

| Category | Sub-types | Enchantment Approach |
|----------|-----------|---------------------|
| **Containers** | Bags, boxes, pouches, vessels | Curated named items (e.g., Bag of Holding, Decanter of Endless Water) |
| **Everyday Objects** | Rods, ropes, lanterns, compasses, mirrors | Curated named items (e.g., Immovable Rod, Lantern of Revealing) |
| **Instruments** | Drums, flutes, horns, bells | Curated named items (Bard archetype integration) |
| **Animated/Bound** | Figurines, carpets, brooms | Curated named items (summoned allies, transportation) |
| **Communication** | Sending stones, speaking tubes | Curated named items (travel/social utility) |
| **Slot-compatible** | Any utility effect fitting a wearable slot | Use wearable enchantment table |

> **Note on temporary enchantments:** The alchemy system expansion (future analysis) should include temporary enchantments — potions, oils, and applied treatments that grant enchantment-like effects for a limited duration. This provides consumable alternatives to permanent enchantments and creates a design space for alchemy to interact with the enchantment system.

#### Low-Tier QoL "Tack On" Rule

**Recommendation (Option A from Section 2.6):** Define a new rule:

> **Minor Enchantments:** Items of Q5 or higher may have one **minor enchantment** (any Q4-only binary enchantment such as Morphing, Returning, Temperate, or Comprehension) in addition to their primary enchantment. The minor enchantment costs its normal Q4 enchantment price and is applied during creation.

This preserves the one-primary-enchantment rule while allowing QoL stacking on high-quality items. It's a simple, non-fiddly addition to the crafting flow.

> **Alternative (Option C):** Make Morphing, Returning, and Comprehension baseline properties of Q5+ items at no additional enchantment cost. This simplifies the system further but may feel like it devalues the Q4-only enchantments. The decision depends on whether the design prefers elegance (Option C) or economic clarity (Option A).

## 5. Summary of Recommendations by Priority

| Priority | Recommendation | Impact | Effort |
|----------|---------------|--------|--------|
| **1 (High)** | Split armor/shield into separate d100 enchantment tables (10 entries each) | Resolves classification issue, enables distinct identities | Medium |
| **2 (High)** | Remove spell catalyst enchantment table; catalysts use wearable list; migrate Stabilizing/Volatile | Eliminates redundancy, simplifies system | Low |
| **3 (High)** | Add enchantments for Travel, Exploration, Social Intrigue with anti-trivialization and GM-ease design | Fills major non-combat gap | Medium |
| **4 (High)** | Differentiate enchantment scaling philosophy; move of Immunity to Q6+ triggered | Prevents power creep, improves tier design, fixes talent anti-synergies | Low |
| **5 (Medium)** | Fill weapon enchantment gaps to reach d100 target of 20 entries | Covers frost, lightning, acid, control, defense | Medium |
| **6 (Medium)** | Expand wearable enchantments to d100 target of 25 (incl. catalyst migrations + Healing) | Broader character customization, first Healing enchantment | Low |
| **7 (Low)** | Fix ammo inconsistencies and expand to d100 target of 10 entries | Quality-of-life improvement, adds utility ammo | Low |
| **8 (Low)** | Design Q7–Q8 enchantment tier with signature abilities and holy-avenger-class items | Enables legendary items with unique identities | Medium |
| **9 (Low)** | Structural improvements: d100 format, role/mode tags, cost clarity, minor enchantment rule, utility categorization | Better GM experience, future-proofing | Medium |

> **Deferred:** Material properties (Greater/Legendary) — separate analysis task.
> **Deferred:** Named wand/staff catalogue — separate design document.
> **Deferred:** Utility magic items catalogue (curated named items) — separate design document.
> **Deferred:** Temporary enchantments / alchemy system expansion — separate analysis.

---

## 6. Draft Examples

### 6.1 Example: Shield Enchantment — Covering

> **covering (Q4/Q5/Q6)**
>
> This shield radiates a faint protective aura that extends beyond its physical form. As a **Quick Action**, you can extend your shield's protection to one ally in **melee range**, granting them the shield's AV bonus until the start of your next turn. You can use this ability once per day at Q4, twice at Q5, and three times at Q6.
>
> **Role:** Support. **Game Mode:** Combat.
>
> **Talent synergy:** Works alongside Protective Stance (Fighting talent) — Protective Stance lets you use Protect Ally more efficiently, while Covering extends your shield's AV passively to an ally. Different triggers, additive value.

### 6.2 Example: Travel Wearable — of Pathfinding

> **of Pathfinding (Q4/Q6)**
>
> These well-worn boots always seem to find the surest path through rough terrain. While wearing them and serving as Navigator during travel, you gain +1 boon on Spirit/Mind + Nature/Survival rolls for navigation. At Q6, the bonus increases to +2 boons.
>
> **Role:** Utility. **Game Mode:** Travel.
>
> **Anti-trivialization:** Grants boons, not automatic success. The Navigator still rolls and can still fail/blunder. Supply management and weather events remain fully intact.
>
> **Talent synergy:** Stacks with Knowledgeable Wanderer (Nature talent), which also grants +1 boon on navigation and treats blunders as failures. A character with both gets +2 boons and blunder protection — rewarding investment in both systems.

### 6.3 Example: Exploration Wearable — of Trapfinding

> **of Trapfinding (Q4/Q6)**
>
> This item thrums faintly when dangerous mechanisms are nearby. While wearing it during dungeon delving or exploration, you gain +1 boon on Perception rolls to detect traps, hidden doors, and concealed features. At Q6, the bonus increases to +2 boons.
>
> **Role:** Utility. **Game Mode:** Exploration / Dungeon Delving.
>
> **GM-ease:** The enchantment grants boons on player-initiated Perception rolls. It does NOT auto-detect traps or require the GM to spontaneously reveal information. The player still decides when to search and where; the enchantment just makes them better at it.
>
> **Talent synergy:** Complements Dungeon Delver (Perception talent), which provides a unique investigation mechanic (spend a minute to analyze a trap's effects, gaining understanding and bonuses to avoid/disable). The enchantment helps you *find* the trap; the talent helps you *understand and dismantle* it.

### 6.4 Example: Social Wearable — of Discernment

> **of Discernment (Q4/Q6)**
>
> This circlet or brooch sharpens the wearer's ability to read others. During Social Intrigue, you gain +1 boon on Spirit + Insight rolls made to discover NPC Motivations or detect Pitfalls. At Q6, the bonus increases to +2 boons.
>
> **Role:** Support. **Game Mode:** Social Intrigue.
>
> **Anti-trivialization:** Grants boons on rolls, not automatic Motivation/Pitfall discovery. The Insight roll can still fail. The intrigue's Interest/Patience economy remains intact.
>
> **GM-ease:** The GM resolves this identically to a normal Insight roll — just with a better chance of success. No new information or adjudication burden.

### 6.5 Example: New Weapon Enchantment — Frosted

> **frosted (Q4/Q5/Q6)**
>
> A thin layer of rime perpetually coats this weapon, and the air around it carries a biting chill. You can use a Quick Action on your turn to intensify the frost for a **short duration**. While intensified, the weapon emits dim light in melee range and deals 2 additional frost damage (ignoring AV) on a hit. On a **strong** or **critical hit**, the target is **slowed** briefly as ice crystals spread across their limbs. The extra frost damage increases to 4 at Q5 and 6 at Q6.
>
> **Role:** Offense / Control. **Game Mode:** Combat.
>
> **Talent synergy:** The slowed condition complements Polearm Mastery (Fighting talent) — a slowed target has reduced Movement, making it harder for them to close distance against a reach weapon user. Also synergizes with Binding (proposed weapon enchantment) thematically but not mechanically (different triggers).

### 6.6 Example: High-Tier Shield Enchantment — Shielding

> **shielding (Q6 only)**
>
> This shield bears a rune that blazes with light when its bearer is in mortal danger. Once per day, when you would take damage from a source that matches a damage type you choose when this enchantment is applied (fire, frost, lightning, acid, necrotic, or radiant), you can activate the rune as a triggered ability. Until the end of your next turn, you are **immune** to that damage type. The rune then dims and cannot be activated again until the next dawn.
>
> **Role:** Defense. **Game Mode:** Combat.
>
> *Design note: This demonstrates the differentiated scaling philosophy — immunity is Q6-only, triggered (not passive), and limited to 1×/day. Contrast with of Immunity (proposed Q6+ triggered) and of Resistance (Q4 passive, single type) — three distinct tiers of protection.*

### 6.7 Example: Legendary Shield — Sentient (Q7)

> **sentient (Q7)**
>
> This shield possesses a limited form of awareness — it subtly shifts its weight toward incoming threats and vibrates softly when allies are in danger. Once per scene, the shield independently blocks one attack against you without requiring your Quick Action (the shield adds its full AV to your Parry for that attack). Additionally, once per day, the shield can fly from your arm to intercept one ranged attack targeting an ally in close range, adding its AV to their Defense against that attack.
>
> **Role:** Defense. **Game Mode:** Combat.
>
> *Design note: This is a Q7-only enchantment — the "sentient item" concept is inherently legendary and doesn't make sense at lower tiers. The independent blocking and ally interception create a story: the shield has its own limited agency.*

---

## Appendix A: Complete Enchantment Count Summary

| Category | Current Count | Proposed Count | d100 Format |
|----------|--------------|----------------|-------------|
| Ammo | 6 | 10 | d100 (10% each) |
| Weapon | 12 | 20 | d100 (5% each) |
| Spell Catalyst | 6 | 0 (removed — use wearable list) | — |
| Armor | 6 (shared with shield) | 10 | d100 (10% each) |
| Shield | 0 (shared with armor) | 10 | d100 (10% each) |
| Wearable | 20 | 25 (including catalyst migrations) | d100 (4% each) |
| **Total** | **50** | **75** | — |

## Appendix B: Role Coverage Matrix (Current)

> Note: Some enchantments serve multiple roles (e.g., Anchoring is both Defense and Offense). The total of 51 role assignments exceeds the 50 unique enchantments because multi-role enchantments are counted once per role. Roles use the six magic system categories: Offense, Defense, Healing, Control, Support, Utility.

| Role | Ammo | Weapon | Catalyst | Armor/Shield | Wearable | Total |
|------|------|--------|----------|-------------|----------|-------|
| Offense | 3 | 8 | 1 | 1 | 1 | 14 |
| Defense | 0 | 0 | 1 | 5 | 9 | 15 |
| Healing | 0 | 0 | 0 | 0 | 0 | 0 |
| Control | 2 | 0 | 0 | 0 | 0 | 2 |
| Support | 1 | 1 | 3 | 0 | 7 | 12 |
| Utility | 0 | 3 | 1 | 1 | 3 | 8 |
| **Total** | **6** | **12** | **6** | **7** | **20** | **51** |

## Appendix C: Game Mode Coverage Matrix (Current)

| Game Mode | Ammo | Weapon | Catalyst | Armor/Shield | Wearable | Total |
|-----------|------|--------|----------|-------------|----------|-------|
| Combat | 6 | 12 | 6 | 6 | 17 | 47 |
| Travel | 0 | 0 | 0 | 1 (Temperate) | 0 | 1 |
| Exploration | 0 | 0 | 0 | 0 | 0 | 0 |
| Social Intrigue | 0 | 0 | 0 | 0 | 1 (Comprehension) | 1 |
| Downtime | 0 | 0 | 0 | 0 | 0 | 0 |

## Appendix D: Role Coverage Matrix (Proposed — After All Recommendations)

| Role | Ammo | Weapon | Armor | Shield | Wearable | Total |
|------|------|--------|-------|--------|----------|-------|
| Offense | 4 | 9 | 0 | 2 | 2 | 17 |
| Defense | 0 | 2 | 6 | 6 | 10 | 24 |
| Healing | 0 | 0 | 0 | 0 | 1 | 1 |
| Control | 2 | 2 | 0 | 1 | 0 | 5 |
| Support | 1 | 1 | 0 | 2 | 11 | 15 |
| Utility | 2 | 4 | 3 | 0 | 6 | 15 |
| **Total** | **9** | **18** | **9** | **11** | **30** | **77** |

## Appendix E: Game Mode Coverage Matrix (Proposed)

| Game Mode | Ammo | Weapon | Armor | Shield | Wearable | Total |
|-----------|------|--------|-------|--------|----------|-------|
| Combat | 8 | 18 | 8 | 10 | 19 | 63 |
| Travel | 0 | 1 | 1 | 0 | 4 | 6 |
| Exploration | 0 | 1 | 0 | 0 | 4 | 5 |
| Social Intrigue | 0 | 0 | 0 | 0 | 4 | 4 |
| Downtime | 0 | 0 | 0 | 0 | 0 | 0 |

## Appendix F: Limited Resource Model Comparison

This appendix provides a detailed comparison of the two primary resource models used in enchantment design.

### 1/scene Model

**Mechanics:** The ability refreshes at the start of each new scene (combat encounter, social intrigue, exploration event, etc.).

| Aspect | Assessment |
|--------|-----------|
| **Tracking** | ✅ Simple — binary "used/available" per scene |
| **Reliability** | ✅ High — available in every encounter |
| **Strategic depth** | ⚠️ Low — no inter-scene resource management |
| **Non-combat fit** | ⚠️ Ambiguous — "what counts as a scene?" in travel is unclear |
| **Hoarding risk** | ✅ None — resets automatically |
| **Power level** | ⚠️ Can be very generous if scenes are frequent |

**Best for:** Defensive reactions (Stalwart, Tough), condition removal, abilities that should be available in every fight but not multiple times per fight.

### X/day Model

**Mechanics:** The ability can be used X times total, refreshing after a night's rest. X typically scales with Quality (1/2/3 per day).

| Aspect | Assessment |
|--------|-----------|
| **Tracking** | ⚠️ Moderate — requires tracking uses across scenes |
| **Reliability** | ⚠️ Variable — may not be available in every encounter |
| **Strategic depth** | ✅ High — forces decisions about when to use |
| **Non-combat fit** | ✅ Clear — "per day" is unambiguous in all contexts |
| **Hoarding risk** | ⚠️ Some — players may save for "the boss fight" |
| **Power level** | ✅ Controllable — GM can tune encounter frequency |

**Best for:** Powerful offensive abilities (Booming, Sundering), Focus recovery (Infused), healing effects, travel/exploration abilities that span multiple scenes per day.

### Hybrid: 1/scene/target

**Mechanics:** The ability can be used once per scene per target. Using it on a new target doesn't consume the previous use.

**Best for:** Debuff effects (Draining ammo's stun, Wounding's bleed) where the concern is stacking the same debuff on one target repeatedly, not overall usage frequency.

### Recommendation

Use **1/scene** for defensive reactions and condition removal (should always be available when needed).
Use **X/day** for offensive powers, resource recovery, and non-combat abilities (creates meaningful resource management across a full adventuring day).
Use **1/scene/target** sparingly for debuff effects where stacking is the concern.

## Appendix G: Enchantment–Talent Synergy Summary

This appendix summarizes key synergies and anti-synergies between enchantments and talents identified in Section 2.7.

### Key Synergies to Preserve

| Enchantment | Talent | Why It Works |
|-------------|--------|-------------|
| Elemental weapons + Spellblade/Mystic Champion | Arcana/Mysticism talents | Different action economies; enchantment is Quick Action, talent is main Action |
| of Attunement + Inexhaustible Mind / Divine Rites | Arcana/Mysticism talents | More max Focus benefits Focus recovery talents |
| Infused + Spellweaver (metamagic) | Arcana talent | Focus recovery enables more metamagic use |
| Blocking (shield) + Shield Mastery | Fighting talent | Enchantment enhances talent's mechanical effect |
| Guardian's (weapon) + Protective Stance | Fighting talent | Enchantment adds redirect; talent improves Protect Ally |
| of Pathfinding + Knowledgeable Wanderer | Nature talent | Both grant navigation boons; stack cleanly |
| of Trapfinding + Dungeon Delver | Perception talent | Enchantment finds traps; talent analyzes/disables them |

### Anti-Synergies to Fix

| Enchantment | Talent | Fix |
|-------------|--------|-----|
| of Immunity (Q4, passive) | Body of Bronze R2, Strong Mind R2, Tough Stomach R2 | Move to Q6, make triggered (1×/day) |
| of Pure Thought (Q4, passive charm/sleep/thought immunity) | Divine Sense R2, Strong Mind R2 | Move to Q5+, make triggered or limited |
