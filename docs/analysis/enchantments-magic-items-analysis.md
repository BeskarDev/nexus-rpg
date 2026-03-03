# Enchantments & Magic Items — Comprehensive Design Analysis

## Executive Summary

This document provides a thorough analysis of the enchantment and magic item systems in Nexus RPG. The current system is well-structured with clear cost formulas, multiple enchantment categories, and a coherent Quality tier progression (Q3–Q8). However, several gaps and improvement opportunities have been identified — particularly around non-combat game modes (travel, exploration, social intrigue) and the recently added wand/staff items.

> **Scope note:** Material properties (Greater/Legendary tiers) are deferred to a separate analysis task and are not covered here.

### Quick Stats

- **Enchantment Categories**: 6 (Ammo, Weapon, Spell Catalyst, Armor/Shield combined, Wearable, Utility)
- **Total Unique Enchantments**: 50 (6 ammo + 12 weapon + 6 spell catalyst + 6 armor/shield + 20 wearable)
- **Magic Item Types**: 7 (Weapons, Armor/Shields/Helmets, Ammo, Spell Scrolls, Wands, Staffs, Wearables)
- **Quality Tiers**: Q3–Q8 (Masterwork through Supreme)

### Key Findings

1. **Armor and shield enchantments should be separate tables** — shields are currently awkwardly categorized as weapons for magic item purposes. Splitting them gives both armor and shields room to grow with distinct identities.
2. **Spell catalyst enchantments need reassessment** — with wands and staffs now providing robust charge-based spellcasting, the value of generic catalyst enchantments is uncertain. Consider replacing the category with unique wand/staff abilities (like D&D's Staff of Power model) rather than expanding a potentially redundant enchantment table.
3. **Enchantments almost entirely ignore non-combat play** — travel, exploration/dungeon delving, and social intrigue have recently been refined into full subsystems, but enchantments provide no support for these game modes.
4. **Utility magic items have no enchantment framework** — the random treasure generator already includes a "Utility" category, but no standardized enchantment system exists for non-equipment magic items.
5. **Enchantment scaling philosophy needs differentiation** — not all enchantments should follow the same Q4/Q5/Q6 pattern. Some effects are inherently low-tier only, others should only appear at high quality, and scaling should add new capabilities rather than simply increasing numbers.
6. **Ammo enchantments have inconsistent scaling** — some scale Q4/Q5/Q6, others are fixed at Q5 only.

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

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Storing | Q4/Q5/Q6 | Store rank 1/2/3 spell, cast 1×/day without Focus | Support |
| 2 | Deflecting | Q4 only | +1 Parry property | Defense |
| 3 | Glowing | Q4 only | Emit light with command word | Utility |
| 4 | Stabilizing | Q4/Q5/Q6 | Re-roll failed spell cast; 1/2/3× per day | Support |
| 5 | Volatile | Q4/Q5/Q6 | +2/+4/+6 spell damage, costs Durability check | Offense |
| 6 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support |

#### 1.2.4 Armor/Shield Enchantments (6 options, rolled on d6)

> **Structural issue**: This single table covers body armor, shields, and helmets despite these being mechanically distinct item types. See Section 2.2 for the recommendation to split into separate armor and shield tables.

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

| Category | Current Count | Proposed Count | Die |
|----------|--------------|----------------|-----|
| **Armor Enchantments** | 6 (shared) | 6–8 | d6 or d8 |
| **Shield Enchantments** | 0 (shared with armor) | 6–8 | d6 or d8 |

**Natural fit for each table:**

- **Armor**: Tough, Blurring, Stalwart, Temperate, Silent → passive/reactive defense
- **Shield**: Anchoring → active defense; new options for blocking, riposte, cover-extension, ally protection

### 2.2 Spell Catalyst Enchantments — Redundancy with Wands/Staffs

**Issue:** With wands and staffs now providing robust charge-based spellcasting (including spell storage, heightening, and multi-spell holding), the existing spell catalyst enchantment table may be largely redundant. Wands and staffs already do what Storing and Infused do — they store spells and manage Focus economy.

**The D&D "Staff of Power" model:** In D&D 5e, powerful staves don't use generic enchantments — they are unique named items with bespoke abilities (e.g., Staff of Power grants +2 AC, +2 saving throws, +2 spell attack rolls, and can cast a specific list of spells). This suggests the right approach for Nexus RPG may be to:

1. **Deprecate or shrink the generic spell catalyst enchantment table** — reduce to 3–4 universally useful options that don't overlap with wand/staff inherent features.
2. **Design specific named wands and staffs** — each with a unique ability tailored to its theme (e.g., "Staff of Storms" — can cast Tempest spells and once per day unleash a lightning bolt as a bonus ability; "Wand of Binding" — spells cast through it have +1 to escape TN).
3. **Keep a minimal enchantment list for non-wand/staff catalysts** — generic spell catalysts (orbs, conduits, talismans) still benefit from a small enchantment table.

**Current overlaps:**
- **Storing** (catalyst) ↔ Wands/Staffs inherently store spells
- **Infused** (catalyst) ↔ Wands/Staffs already manage Focus via charges
- **Stabilizing** — unique value, no overlap
- **Volatile** — unique value, no overlap
- **Deflecting** — more of a weapon property than a catalyst enchantment
- **Glowing** — trivially low-impact

**Recommendation:** Rather than expanding the catalyst enchantment table from 6 to 12 (as initially proposed), consider:
- Keep 4 core catalyst enchantments: **Stabilizing**, **Volatile**, and 2 new options that provide value regardless of whether the catalyst is a wand, staff, or generic implement.
- Develop a separate design document for **named wands and staffs** with bespoke abilities — this is where the real design space lives.

### 2.3 Enchantments Ignore Non-Combat Game Modes

**Issue:** The game has recently refined four distinct non-combat game modes — **Travel**, **Exploration/Dungeon Delving**, **Social Intrigue**, and **Challenges** — but enchantments provide virtually no support for any of them. Almost every enchantment is combat-focused.

#### 2.3.1 Travel Mode

The Travel system uses daily roles (Navigator, Scout, Quartermaster, Forager, Hunter, Fisher) with skill rolls against a travel difficulty TN. Key mechanics include progress tracking, supply management, shelter-finding, weather events, and fatigue.

**Enchantment opportunities for travel:**
- **Navigation aids** — bonuses to Nature rolls for the Navigator, or bonus progress
- **Scouting benefits** — bonuses to Perception/Survival rolls for the Scout, or guaranteed shelter
- **Supply preservation** — reduce ration consumption, resist wear-and-tear events, extend supply durability
- **Weather protection** — (Temperate already does this for armor, but only at Q4 with no scaling)
- **Fatigue reduction** — reduce or prevent Fatigue from forced marches, bad navigation, or harsh environments
- **Mount/vehicle enhancement** — improve travel progress with mounts

**Current enchantments that touch travel:** Temperate (Q4 only, extreme cold/heat immunity), Silent (stealth during travel). That's it.

#### 2.3.2 Exploration & Dungeon Delving

The Exploration system uses action-based roles (Pathfinder, Lookout, Forager) at a 2–4 hour time scale with dice timers, terrain searches, and discovery. Dungeon delving uses a similar event-timer structure with room-by-room exploration.

**Enchantment opportunities for exploration:**
- **Search enhancement** — bonuses to Perception for finding hidden features, or automatic detection of traps/secrets within a range
- **Light sources** — (Glowing already does this trivially, but could be expanded to reveal hidden things, dispel magical darkness, or mark paths)
- **Environmental traversal** — waterbreathing, climbing aids, safe falls, darkvision, tremorsense
- **Trap interaction** — resistance to trap damage, automatic trap detection, reduced trap trigger chance
- **Mapping aids** — reveal terrain of adjacent areas, remember paths taken, compass-like orientation

**Current enchantments that touch exploration:** Glowing (Q4 only, emit light). Barely relevant.

#### 2.3.3 Social Intrigue

The Social Intrigue system tracks **Interest** (NPC willingness), **Patience** (challenge die), **Motivations**, and **Pitfalls**. Key skills: Influence, Insight, Education, Lore. Resolution depends on final Interest score.

**Enchantment opportunities for social intrigue:**
- **Interest manipulation** — start negotiations with higher Interest, or recover from Pitfall triggers
- **Insight enhancement** — bonuses to read NPC Motivations or detect Pitfalls before triggering them
- **Persuasion aids** — bonuses to Influence rolls during intrigue, or extend NPC Patience
- **Deception tools** — disguise, voice alteration, undetectable lies (of the Chameleon-type effects)
- **Authority projection** — bonuses to Influence in formal contexts, or impose +1 bane on NPC Resist during social encounters

**Current enchantments that touch social intrigue:** of Comprehension (language only), of the Guardian (Initiative, not social). Neither directly supports intrigue mechanics.

#### 2.3.4 Summary — Game Mode Coverage Gap

| Game Mode | Relevant Enchantments | Out of 50 Total | Coverage |
|-----------|----------------------|-----------------|----------|
| **Combat** | ~45 | 50 | ✅ Dominant |
| **Travel** | 2 (Temperate, Silent) | 50 | ❌ Minimal |
| **Exploration** | 1 (Glowing) | 50 | ❌ Nearly zero |
| **Social Intrigue** | 1 (Comprehension) | 50 | ❌ Nearly zero |
| **Downtime/Crafting** | 0 | 50 | ❌ None |

### 2.4 Utility Magic Items Have No Enchantment Framework

**Issue:** The random treasure generator includes a "Utility" treasure type (Gear, Alchemical, Supply, Tool, Spell Scroll, Knowledge), and the wearable slot table covers 12 distinct body locations. However, there is no framework for enchanting non-equipment utility items — items that don't fit neatly into weapon, armor, or wearable categories.

**Examples of utility magic items from genre standards:**
- **Bags of Holding** (extradimensional storage)
- **Immovable Rods** (utility tool)
- **Decanter of Endless Water** (resource creation)
- **Sending Stones** (communication)
- **Rope of Climbing** (exploration tool)
- **Lantern of Revealing** (detection tool)

**The challenge:** These items are highly diverse in function. Unlike weapons (damage-focused) or armor (defense-focused), utility items span exploration, travel, social, and downtime categories. This makes standardized enchantment tables difficult — the effects are too varied to roll randomly.

**Possible approaches:**
1. **Curated list** — instead of a rollable enchantment table, provide a catalogue of named utility items organized by game mode (travel, exploration, social, downtime). GMs pick from the list rather than rolling randomly.
2. **Wearable expansion** — many "utility" effects can be delivered through wearable enchantments. Boots of Waterbreathing, Cloak of the Chameleon, Ring of Featherfall, etc. This keeps the existing slot system and just expands the wearable enchantment list.
3. **Consumable enchantments** — one-use or limited-use items that provide powerful utility effects (already partially covered by alchemy and spell scrolls).

**Recommendation:** A combination of approach 1 (curated named items for truly unique effects) and approach 2 (expand wearable enchantments for effects that fit the slot system). A separate design document for named utility items would be valuable.

### 2.5 Enchantment Scaling Philosophy Needs Differentiation

**Issue:** The current system treats all enchantments as if they should scale from Q4 through Q6 with linearly increasing numbers. But this one-size-fits-all approach creates problems:

**Current pattern:** Most enchantments follow Q4/Q5/Q6 with values like 2/4/6, 1×/2×/3× per day, or TN 8/10/12. This is clean but leads to two issues:

1. **Some effects are inherently low-tier** — Morphing, Returning, Glowing, Temperate, and Comprehension are "quality of life" enchantments that don't need to scale. They provide a binary capability (transform weapons, throw-and-recall, emit light, ignore weather, speak a language) that is appropriately powered at Q4. Artificially scaling these adds complexity without value.

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
| **Q4 only** | Binary capabilities; quality-of-life | Morphing, Returning, Glowing, Temperate, Comprehension |
| **Q4–Q6** | Effects that scale meaningfully with power | Flaming (2/4/6 damage), Tough (1×/2×/3× per day), Stalwart (1×/2×/3× per day) |
| **Q5–Q6** | Effects too powerful for Q4 but not legendary | Siphoning (resource on kill), Quickened (cast as Quick Action) |
| **Q6 only** | Powerful triggered abilities | Damage type immunity (triggered, 1×/day), major active powers |
| **Q7–Q8** | Legendary/mythical effects | Unique signature abilities tied to the item's identity |

### 2.6 Weapon Enchantments — Offense-Dominated, Missing Elements

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

### 2.7 Wearable Enchantments — Strong but Combat-Focused

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
- **No travel/exploration wearables** — beyond Comprehension, no wearable supports the Navigator, Scout, Pathfinder, or Lookout roles.
- **No social wearables** — no wearable supports Influence, Insight, or other social intrigue skills.
- **Attribute caps (d8/d10) limit late-game value** — the "of Might/Swiftness/Wisdom/Intellect" enchantments can only raise attributes to d8 or d10, making them useless for characters who already have high attributes.

### 2.8 Ammo Enchantments — Functional but Inconsistent

**Issue:** 6 options is reasonable for a consumable item type, but there are design inconsistencies.

**Specific issues:**
- **Draining is Q5 only** — unlike every other ammo enchantment, it has no Q4 or Q6 variant. This makes it unavailable to early characters and unable to improve with progression.
- **Seeking skips Q5** — available at Q4 and Q6 but not Q5, creating an awkward gap.
- **No utility ammo** — all options are offensive or control. No ammo provides light, signals, smoke screens, or non-combat utility.
- **No elemental variety** — Burning (fire) is the only elemental option. No frost, lightning, acid, or radiant ammo exists.

### 2.9 Enchantment Quality Cap at Q6

**Issue:** All enchantments max out at Q6, despite the system supporting Q7 (Legendary) and Q8 (Mythical) quality tiers. The cost tables include Q7 and Q8 enchantment costs, but no enchantment descriptions exist for these tiers.

**Impact:**
- Q7–Q8 items feel mechanically incomplete — they're just "bigger numbers" without distinctive enchantment power.
- The cost of Q7–Q8 enchantments is defined (30,000–100,000+ coins) but buys nothing additional.
- Campaign-defining artifacts lack the mechanical tools to feel truly legendary.

**Note:** Per the scaling philosophy in Section 2.5, Q7–Q8 enchantments should not simply be "Q6 but more." They should provide unique signature abilities that define the item's identity, consistent with the bounded-power design (Rank 5 = mortal pinnacle).

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

### 4.1 Priority 1: Split Armor and Shield Enchantment Tables

**Action:** Separate the current combined armor/shield table into two distinct enchantment tables. This resolves the shield weapon/armor classification issue and gives each item type room for a distinct identity.

**Proposed Armor Enchantments (body armor and helmets):**

Armor enchantments should focus on passive/reactive defense, environmental protection, and resilience.

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Blurring | Q4/Q5/Q6 | Mirror Image duplicates (8/9/10 Defense); 1/2/3× per day | Defense |
| 2 | Stalwart | Q4/Q5/Q6 | Ignore one condition (charmed, confused, dazed, frightened, paralyzed, staggered, stunned); 1/2/3× per day | Defense |
| 3 | Tough | Q4/Q5/Q6 | Gain resistance to damage; 1/2/3× per day | Defense |
| 4 | Silent | Q4/Q6 | Reduce rigid, remove noisy, or +1 Stealth boon | Utility |
| 5 | Temperate | Q4 only | Immunity to extreme cold OR heat (travel/exploration) | Utility |
| 6 | Vigilant | Q4/Q6 | You cannot be surprised; gain +1/+2 boon on Initiative | Defense |

> Note: Stalwart is updated from Q4-only to Q4/Q5/Q6 with scaling uses per day. Temperate remains Q4-only per the differentiated scaling philosophy (binary capability, appropriately powered).

**Proposed Shield Enchantments:**

Shield enchantments should focus on active defense, reactive abilities, and ally protection — leaning into the shield's role as an actively used piece of equipment.

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Anchoring | Q4/Q5/Q6 | Resist push/prone; retaliate 2/4/6 damage; 1/2/3× per day | Defense / Offense |
| 2 | Covering | Q4/Q5/Q6 | As a Quick Action, extend your shield's AV to one adjacent ally until start of your next turn; 1/2/3× per day | Support |
| 3 | Reflecting | Q5/Q6 | When you succeed on Resist vs. a spell, the caster takes 2/4 damage of the spell's type; 1/2× per day | Defense |
| 4 | Retaliating | Q4/Q5/Q6 | When a creature in melee range hits you, deal 1/2/3 damage to them | Defense / Offense |
| 5 | Shielding | Q6 only | Once per day, as a triggered ability, gain immunity to one damage type until end of next turn | Defense |
| 6 | Rallying | Q5/Q6 | When you take a Wound or drop below half HP, allies in close range gain +1/+2 to their next attack; 1×/scene | Support |

> Note: Reflecting and Rallying are Q5+ only (too powerful for Q4). Shielding is Q6 only and triggered, not passive — per the differentiated scaling philosophy.

### 4.2 Priority 2: Reassess Spell Catalyst Enchantments

**Action:** Reduce the generic catalyst enchantment table and invest design effort into named wand/staff items with bespoke abilities.

**Reduced Catalyst Enchantments (keep 4 core options):**

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Stabilizing | Q4/Q5/Q6 | Re-roll failed spell cast; 1/2/3× per day | Support |
| 2 | Volatile | Q4/Q5/Q6 | +2/+4/+6 spell damage, costs Durability check | Offense |
| 3 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support |
| 4 | Warding | Q4/Q5/Q6 | While holding, gain +1/+2/+3 Resist vs. spells (max 10/12/14) | Defense |

> **Removed:** Storing (redundant with wand/staff spell storage), Deflecting (more appropriate as a weapon property), Glowing (trivial — can be a baseline feature of all magic catalysts).

**Named Wand/Staff Design (separate document recommendation):**

Rather than expanding the generic enchantment table, develop a catalogue of named wands and staffs, each with a unique ability. Examples:

| Item | Quality | Unique Ability | Precedent |
|------|---------|---------------|-----------|
| Staff of Storms | Q5 | Holds Tempest spells; 1×/day unleash a lightning bolt (close range, 12 lightning damage vs. Dodge) | D&D Staff of Power |
| Wand of Binding | Q4 | Holds a Conjuration/Control spell; spells cast through it add +2 to escape/resist TN | D&D Wand of Paralysis |
| Staff of Healing | Q5 | Holds Life spells; 1×/day cast a healing spell at +1 rank without extra charges | D&D Staff of Healing |
| Wand of Detection | Q4 | Holds a detection spell; 1×/day detect magic in medium range for free | D&D Wand of Magic Detection |

### 4.3 Priority 3: Add Enchantments for Non-Combat Game Modes

**Action:** Expand existing enchantment tables (especially wearables and the new armor/shield tables) with options that support Travel, Exploration, and Social Intrigue.

#### Travel Enchantments

| Name | Category | Quality | Effect | Role |
|------|----------|---------|--------|------|
| of Pathfinding | Wearable | Q4/Q6 | +1/+2 boon on Nature rolls for the Navigator role during travel | Utility |
| of Vigilance | Wearable | Q4/Q6 | +1/+2 boon on Perception/Survival rolls for the Scout role during travel | Utility |
| of Endurance | Wearable | Q4/Q5/Q6 | Ignore 1/2/3 Fatigue suffered during travel per journey | Support |
| of Provisioning | Wearable | Q4 only | When rolling Supply Checks for rations during travel, roll twice and take the better result | Utility |
| Wayfinder's | Weapon/Shield | Q4 only | While carried during travel, the Navigator gains +1 boon on their next Navigation roll after a failed one | Support |

#### Exploration & Dungeon Delving Enchantments

| Name | Category | Quality | Effect | Role |
|------|----------|---------|--------|------|
| of Trapfinding | Wearable | Q4/Q6 | +1/+2 boon on Perception rolls to detect traps and hidden features | Utility |
| of Darkvision | Wearable | Q4/Q6 | See in darkness as dim light for medium/long range | Utility |
| of Waterbreathing | Wearable | Q4 only | Breathe underwater indefinitely; +1 boon on Athletics rolls to swim | Utility |
| of Featherfall | Wearable | Q4 only | Reduce fall distance by medium range for damage; land safely from up to long range | Defense |
| Illuminating | Armor/Shield | Q4 only | Emit bright light in close range and dim light in short range on command (no Action). In dungeon delving, +1 boon on Search actions in the current area. | Utility |

#### Social Intrigue Enchantments

| Name | Category | Quality | Effect | Role |
|------|----------|---------|--------|------|
| of the Chameleon | Wearable | Q4/Q6 | 1×/day change appearance for medium duration. Q6: also alter voice, extend to long duration | Utility |
| of Discernment | Wearable | Q4/Q6 | +1/+2 boon on Insight rolls to read NPC Motivations and detect Pitfalls during Social Intrigue | Support |
| of Authority | Wearable | Q5/Q6 | During Social Intrigue, start with +1/+2 Interest if you are known to the NPC. 1×/day | Support |
| of Eloquence | Wearable | Q5/Q6 | +1/+2 boon on Influence rolls during Social Intrigue | Support |

### 4.4 Priority 4: Differentiate Enchantment Scaling Across Quality Tiers

**Action:** Apply the differentiated scaling philosophy from Section 2.5 to existing enchantments. Not every enchantment needs to span Q4–Q6.

**Recommended scaling adjustments for existing enchantments:**

| Enchantment | Current | Proposed | Rationale |
|-------------|---------|----------|-----------|
| Morphing | Q4 only | Q4 only ✓ | Binary capability, no need to scale |
| Returning | Q4 only | Q4 only ✓ | Binary capability |
| Glowing | Q4 only | Remove or make baseline | Trivial; all magic catalysts could glow |
| Temperate | Q4 only | Q4 only ✓ | Binary environmental protection |
| Comprehension | Q4 only | Q4 only ✓ | Binary language capability |
| Stalwart | Q4 only | Q4/Q5/Q6 (1×/2×/3× per day) | Scales meaningfully via frequency |
| of Immunity | Q4 only | Q6 only (triggered, 1×/day) | Too powerful as passive Q4; should be high-tier triggered |
| of Resistance | Q4 only | Q4 (passive, single type) ✓ | Resistance is weaker than immunity; fine at Q4 |
| Sentinel | Q4/Q5 | Q4/Q5 ✓ | Scales via new capability at Q5 |
| Draining (ammo) | Q5 only | Q4/Q5/Q6 | Should scale like other ammo |
| Seeking (ammo) | Q4/Q6 | Q4/Q5/Q6 | Fill the Q5 gap |

**New high-quality-only enchantments (Q6+ only):**
- **Damage type immunity** — triggered, 1×/day, single type. Q6 shield enchantment (see Section 4.1).
- **Phase** — 1×/day, move through solid objects for one turn. Q6 wearable.
- **Greater Slaying** — extra wound on crit vs. chosen type, with a save. Q7+ weapon.

### 4.5 Priority 5: Fill Weapon Enchantment Gaps

**Action:** Add 2–4 weapon enchantments covering missing elemental types and roles.

| Name | Quality | Effect | Role |
|------|---------|--------|------|
| **Frosted** | Q4/Q5/Q6 | Quick Action to coat in frost for short duration. Deal 2/4/6 frost damage ignoring AV. On strong/critical hit, target is slowed briefly. | Offense / Control |
| **Shocking** | Q4/Q5/Q6 | Quick Action to charge with lightning for short duration. Deal 2/4/6 lightning damage ignoring AV. On critical hit, arcs to one creature in melee range of target for half damage. | Offense |
| **Binding** | Q5/Q6 | On strong/critical hit, target must resist (vs. TN 10/12) or be slowed for short duration. 1/2× per day. | Control |
| **Guardian's** | Q4/Q5/Q6 | While wielding, gain +1/+1/+2 Parry. 1×/day, when ally in melee range is hit, use Quick Action to redirect attack to yourself. | Defense / Support |

> Note: Binding is Q5+ only (control effects are inherently powerful and should not be available at the cheapest tier).

### 4.6 Priority 6: Expand Wearable Enchantments for Non-Combat

**Action:** Add skill-boosting and active-ability wearables that support all game modes. Most travel/exploration/social wearables are covered in Section 4.3. Additional general-purpose additions:

| Name | Quality | Effect | Role |
|------|---------|--------|------|
| **of Skill** | Q4/Q5/Q6 | Choose one skill. Gain +1/+2/+3 to that skill's rolls (skill bonus, max rank 3/4/5). | Support |
| **of the Healer** | Q4/Q5/Q6 | When you use a healer's kit or cast a Healing spell, restore +2/+4/+6 additional HP | Healing |

### 4.7 Priority 7: Address Ammo Enchantment Inconsistencies

**Quick fixes:**
- **Draining**: Expand to Q4/Q5/Q6 scaling. Q4: briefly stun once/scene/target. Q5: briefly stun + target takes +1 bane on next roll. Q6: briefly stun + target takes +2 banes on next roll.
- **Seeking**: Add Q5 tier. Q4: ignore range/cover, +1 boon. Q5: same + ignore concealment. Q6: same + target behind full cover.

**New ammo options:**
- **Smoke** (Q4 only): On hit, creates a cloud of smoke in melee range of impact point for short duration. Creatures in smoke are blinded while inside. (Utility — binary capability, Q4 only)
- **Frost** (Q4/Q5/Q6): On hit, inflict 4/6/8 frost damage and target is slowed briefly.

### 4.8 Priority 8: Design Q7–Q8 Enchantment Tier

**Action:** Define what Q7–Q8 enchantments look like, following the differentiated scaling philosophy.

**Design principles for Q7–Q8:**
- Q7 enchantments provide the Q6 effect **plus** an additional triggered ability or expanded scope. Not just bigger numbers.
- Q8 enchantments provide a **signature capstone ability** that defines the item's identity and feels appropriately legendary.
- All Q7–Q8 abilities should be triggered/limited (not passive scaling of lower-tier effects).
- Effects should respect bounded power (mortal pinnacle, not reality-warping).

**Examples of well-designed Q7–Q8 scaling:**

| Enchantment | Q6 (Current) | Q7 (Proposed) | Q8 (Proposed) |
|-------------|-------------|---------------|---------------|
| **Flaming** (weapon) | 6 fire ignoring AV | 6 fire + 1×/day cone of flame (close range, 12 fire vs. Dodge) | 6 fire + weapon ignites permanently (no activation) + 1×/day flame burst in short range (16 fire vs. Dodge) |
| **Tough** (armor) | Resistance 3×/day | Resistance 3×/day + 1×/day also gain +2 AV until end of next turn | Resistance 3×/day + 1×/scene gain immunity to all damage until end of next turn (triggered) |
| **Stalwart** (armor) | Ignore condition 3×/day | Ignore condition 3×/day + 1×/day also end one ongoing condition on yourself | Ignore condition 3×/day + 1×/day you and all allies in melee range ignore one condition |
| **Slaying** (weapon) | +6 damage vs. type | +6 damage + +1 boon vs. type | +6 damage + +1 boon + on crit, target must Spirit + Fortitude vs. TN 16 or suffer additional wound |
| **of Protection** (wearable) | +3 AV unarmored | +3 AV + 1×/day absorb 10 damage | +3 AV + 1×/day absorb 20 damage + brief physical damage immunity |

> Note: Q8 "immunity" effects are always brief and triggered, never passive. This maintains bounded power while feeling legendary.

---

## 5. Structural & Usability Improvements

### 5.1 Enchantment Organization

**Current structure:** Enchantments are organized by item type (ammo, weapon, catalyst, armor/shield, wearable) in a single document. This is functional but could be improved.

**Recommendation:** Keep the current single-document structure but:
1. **Split armor/shield into separate tables** (see Section 4.1).
2. Add a **quick reference table** at the top listing all enchantments by name with page anchors.
3. Add **role tags** for each enchantment using the six magic system categories (Offense, Defense, Healing, Control, Support, Utility) to help GMs select thematically appropriate items.
4. Add **game mode tags** where applicable (Combat, Travel, Exploration, Social) so GMs planning non-combat sessions can quickly find relevant items.

### 5.2 Cost Table Clarity

**Recommendation:**
1. Add worked examples directly into the cost tables document for each item type, prominently featuring the three edge cases identified in Section 1.3.
2. Bold the wearable exception rule ("Wearables skip magic item base cost") and place it in a callout box.
3. Add rows to the cost tables for "Wand" and "Staff" specifically, even if they use the same costs as one-handed/two-handed weapons.
4. Include a "Common Mistakes" callout box near the formula with the three edge cases.

### 5.3 Random Treasure Generation

The random treasure generator already includes a "Utility" category but doesn't connect to an enchantment framework.

**Recommendation:**
1. When rolling a Utility result at Q4+, provide guidance on whether the item should be magical and what kind of effect it might have (reference the game-mode enchantment lists from Section 4.3).
2. Add a simple "magic item theme" roll (d6: Combat, Travel, Exploration, Social, Spellcasting, General) to help GMs determine the enchantment's intended purpose for any magical treasure result.

---

## 6. Summary of Recommendations by Priority

| Priority | Recommendation | Impact | Effort |
|----------|---------------|--------|--------|
| **1 (High)** | Split armor/shield enchantment tables | Resolves classification issue, enables distinct identities | Medium |
| **2 (High)** | Reassess spell catalyst enchantments; consider named wand/staff items | Avoids redundancy with wand/staff mechanics | Medium |
| **3 (High)** | Add enchantments for Travel, Exploration, Social Intrigue | Fills major non-combat gap | Medium |
| **4 (High)** | Differentiate enchantment scaling philosophy | Prevents power creep, improves tier design | Low |
| **5 (Medium)** | Fill weapon enchantment elemental and role gaps | Covers frost, lightning, control, defense | Low |
| **6 (Medium)** | Expand wearable enchantments for non-combat + Healing | Broader character customization | Low |
| **7 (Low)** | Fix ammo enchantment inconsistencies | Quality-of-life improvement | Low |
| **8 (Low)** | Design Q7–Q8 enchantment tier | Enables legendary items | Medium |
| **9 (Low)** | Structural/usability improvements (role tags, game mode tags, cost clarity) | Better GM experience | Low |

> **Deferred:** Material properties (Greater/Legendary) — separate analysis task.
> **Deferred:** Named wand/staff catalogue — separate design document.
> **Deferred:** Utility magic items catalogue — separate design document.

---

## 7. Draft Examples

### 7.1 Example: Shield Enchantment — Covering

> **covering (Q4/Q5/Q6)**
>
> This shield radiates a faint protective aura that extends beyond its physical form. As a **Quick Action**, you can extend your shield's protection to one ally in **melee range**, granting them the shield's AV bonus until the start of your next turn. You can use this ability once per day at Q4, twice at Q5, and three times at Q6.
>
> **Role:** Support. **Game Mode:** Combat.

### 7.2 Example: Travel Wearable — of Pathfinding

> **of Pathfinding (Q4/Q6)**
>
> These well-worn boots always seem to find the surest path through rough terrain. While wearing them and serving as Navigator during travel, you gain +1 boon on Spirit/Mind + Nature rolls for navigation. At Q6, the bonus increases to +2 boons, and once per journey you can automatically succeed on a Navigation roll that would otherwise fail.
>
> **Role:** Utility. **Game Mode:** Travel.

### 7.3 Example: Exploration Wearable — of Trapfinding

> **of Trapfinding (Q4/Q6)**
>
> This item thrums faintly when dangerous mechanisms are nearby. While wearing it during dungeon delving or exploration, you gain +1 boon on Perception rolls to detect traps, hidden doors, and concealed features. At Q6, the bonus increases to +2 boons, and the item audibly vibrates when you enter an area containing a hidden trap (GM reveals that a trap exists, but not its location or type).
>
> **Role:** Utility. **Game Mode:** Exploration / Dungeon Delving.

### 7.4 Example: Social Wearable — of Discernment

> **of Discernment (Q4/Q6)**
>
> This circlet or brooch sharpens the wearer's ability to read others. During Social Intrigue, you gain +1 boon on Spirit + Insight rolls made to discover NPC Motivations or detect Pitfalls. At Q6, the bonus increases to +2 boons, and once per intrigue you can learn one Motivation or Pitfall automatically without a roll.
>
> **Role:** Support. **Game Mode:** Social Intrigue.

### 7.5 Example: New Weapon Enchantment — Frosted

> **frosted (Q4/Q5/Q6)**
>
> A thin layer of rime perpetually coats this weapon, and the air around it carries a biting chill. You can use a Quick Action on your turn to intensify the frost for a **short duration**. While intensified, the weapon emits dim light in melee range and deals 2 additional frost damage (ignoring AV) on a hit. On a **strong** or **critical hit**, the target is **slowed** briefly as ice crystals spread across their limbs. The extra frost damage increases to 4 at Q5 and 6 at Q6.
>
> **Role:** Offense / Control. **Game Mode:** Combat.

### 7.6 Example: High-Tier Shield Enchantment — Shielding

> **shielding (Q6 only)**
>
> This shield bears a rune that blazes with light when its bearer is in mortal danger. Once per day, when you would take damage from a source that matches a damage type you choose when this enchantment is applied (fire, frost, lightning, acid, necrotic, or radiant), you can activate the rune as a triggered ability. Until the end of your next turn, you are **immune** to that damage type. The rune then dims and cannot be activated again until the next dawn.
>
> **Role:** Defense. **Game Mode:** Combat.
>
> *Design note: This demonstrates the differentiated scaling philosophy — immunity is Q6-only, triggered (not passive), and limited to 1×/day.*

---

## Appendix A: Complete Enchantment Count Summary

| Category | Current Count | Proposed Count | Die |
|----------|--------------|----------------|-----|
| Ammo | 6 | 8 | d8 |
| Weapon | 12 | 16 | d12+d4 or d16 |
| Spell Catalyst | 6 | 4 (reduced) | d4 |
| Armor | 6 (shared with shield) | 6 | d6 |
| Shield | 0 (shared with armor) | 6 | d6 |
| Wearable | 20 | 30+ (including game-mode options) | d20 + special |
| **Total** | **50** | **70+** | — |

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

| Role | Ammo | Weapon | Catalyst | Armor | Shield | Wearable | Total |
|------|------|--------|----------|-------|--------|----------|-------|
| Offense | 4 | 8 | 1 | 0 | 1 | 1 | 15 |
| Defense | 0 | 1 | 1 | 4 | 3 | 10 | 19 |
| Healing | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| Control | 2 | 1 | 0 | 0 | 0 | 0 | 3 |
| Support | 1 | 1 | 2 | 0 | 2 | 11 | 17 |
| Utility | 1 | 3 | 0 | 2 | 0 | 8 | 14 |
| **Total** | **8** | **14** | **4** | **6** | **6** | **31** | **69** |

## Appendix E: Game Mode Coverage Matrix (Proposed)

| Game Mode | Ammo | Weapon | Catalyst | Armor | Shield | Wearable | Total |
|-----------|------|--------|----------|-------|--------|----------|-------|
| Combat | 8 | 14 | 4 | 5 | 6 | 18 | 55 |
| Travel | 0 | 1 | 0 | 0 | 0 | 4 | 5 |
| Exploration | 0 | 0 | 0 | 1 | 0 | 4 | 5 |
| Social Intrigue | 0 | 0 | 0 | 0 | 0 | 4 | 4 |
| Downtime | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
