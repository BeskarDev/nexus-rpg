# Enchantments & Magic Items — Comprehensive Design Analysis

## Executive Summary

This document provides a thorough analysis of the enchantment and magic item systems in Nexus RPG. The current system is well-structured with clear cost formulas, six enchantment categories (ammo, weapon, spell catalyst, armor/shield, wearable, and materials), and a coherent Quality tier progression (Q3–Q8). However, several gaps and improvement opportunities have been identified.

### Quick Stats

- **Enchantment Categories**: 6 (Ammo, Weapon, Spell Catalyst, Armor/Shield, Wearable, Special Materials)
- **Total Unique Enchantments**: 50 (6 ammo + 12 weapon + 6 spell catalyst + 6 armor/shield + 20 wearable)
- **Special Materials**: 40+ across 4 tiers (Primitive, Exotic, Greater, Legendary)
- **Magic Item Types**: 7 (Weapons, Armor/Shields/Helmets, Ammo, Spell Scrolls, Wands, Staffs, Wearables)
- **Quality Tiers**: Q3–Q8 (Masterwork through Supreme)

### Key Findings

1. **Spell catalyst enchantments are underdeveloped** — only 6 options, and none specifically leverage the newly added wand/staff mechanics (charges, multi-spell, heightening).
2. **Armor/shield enchantments are too few** — 6 options for an entire category, vs. 12 for weapons and 20 for wearables.
3. **Wearable enchantments dominate** — 20 options create a strong contrast with the sparse armor/shield and spell catalyst lists.
4. **Greater and Legendary materials lack mechanical definitions** — Q5+ materials list flavorful descriptions but most have no concrete mechanical properties.
5. **No enchantments exist above Q6** — despite the system supporting Q7–Q8 items, enchantments cap at Q6.
6. **Ammo enchantments have inconsistent scaling** — some scale Q4/Q5/Q6, others are fixed at Q5 only.

---

## 1. Current System Catalogue

### 1.1 Magic Item Types

| Item Type | Quality Range | Key Mechanic | Notes |
|-----------|---------------|--------------|-------|
| **Weapons** | Q3–Q8 | +1 to +5 weapon damage, durability | Core combat items |
| **Armor/Shields/Helmets** | Q4–Q8 | +1 to +5 AV, durability | Magic AV bonuses start at Q4 (no Q3 masterwork AV bonus) |
| **Ammo** | Q3–Q8 | +1 to +6 flat damage bonus | Supply-based, enchanted ammo is per-piece |
| **Spell Scrolls** | Q3–Q8 | Single-use spell, rank 0–5 | Craftable with talent |
| **Wands** | Q4–Q8 | Single spell, 4–20 charges, catalyst bonus | Recently added |
| **Staffs** | Q4–Q8 | 3–6 spells, 6–30 charges, catalyst bonus | Recently added |
| **Wearables** | Q4–Q6 | Enchantment-only (no base magic bonus) | Skip magic item base cost |

### 1.2 Enchantment Categories

#### 1.2.1 Ammo Enchantments (6 options, rolled on d6)

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Burning | Q4/Q5/Q6 | Inflict burning (4/6/8) on hit | Offense (DoT) |
| 2 | Draining | Q5 only | Briefly stun target, once/scene/target | Control |
| 3 | Ensnaring | Q4/Q5/Q6 | Grapple Large or smaller targets; escape TN 8/10/12 | Control |
| 4 | Shattering | Q4/Q5/Q6 | 4/6/8 blast damage to target + melee-range creatures; prone on strong/crit | Offense (AoE) |
| 5 | Seeking | Q4/Q6 | Ignore range/cover penalties, +1 boon; Q6 targets behind full cover | Utility |
| 6 | Wounding | Q4/Q5/Q6 | Inflict bleeding (4/6/8), once/scene/target | Offense (DoT) |

#### 1.2.2 Weapon Enchantments (12 options, rolled on d12)

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Bloody | Q4/Q5/Q6 | Inflict/increase bleeding (2/4/6) on strong/crit | Offense (DoT) |
| 2 | Booming | Q4/Q5/Q6 | Deal blast damage; push target; 1/2/3× per day | Offense/Control |
| 3 | Defiled | Q4/Q5/Q6 | Necrotic damage (2/4/6) ignoring AV; dims light | Offense (bypass) |
| 4 | Flaming | Q4/Q5/Q6 | Fire damage (2/4/6) ignoring AV; emits light | Offense (bypass) |
| 5 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support (resource) |
| 6 | Morphing | Q4 only | Transform between two weapon forms | Utility |
| 7 | Poisoner's | Q4/Q6 | +2/+4 poison damage or increased poison difficulty | Offense (synergy) |
| 8 | Returning | Q4 only | Thrown property + recall as Quick Action | Utility |
| 9 | Sacred | Q4/Q5/Q6 | Radiant damage (2/4/6) ignoring AV; emits light | Offense (bypass) |
| 10 | Sentinel | Q4/Q5 | Glow near creature type; Q5 +1 boon on rolls vs. type | Utility/Offense |
| 11 | Slaying | Q4/Q5/Q6 | +2/+4/+6 damage vs. creature type | Offense (specialized) |
| 12 | Sundering | Q4/Q5/Q6 | Ignore 1/2 AV; 1/2/3× per day | Offense (bypass) |

#### 1.2.3 Spell Catalyst Enchantments (6 options, rolled on d6)

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Storing | Q4/Q5/Q6 | Store rank 1/2/3 spell, cast 1×/day without Focus | Support (resource) |
| 2 | Deflecting | Q4 only | +1 Parry property | Defense |
| 3 | Glowing | Q4 only | Emit light with command word | Utility |
| 4 | Stabilizing | Q4/Q5/Q6 | Re-roll failed spell cast; 1/2/3× per day | Support (reliability) |
| 5 | Volatile | Q4/Q5/Q6 | +2/+4/+6 spell damage, costs Durability check | Offense (risk/reward) |
| 6 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support (resource) |

#### 1.2.4 Armor/Shield Enchantments (6 options, rolled on d6)

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | Anchoring | Q4/Q5/Q6 | Resist push/prone; retaliate 2/4/6 damage; 1/2/3× per day | Defense/Offense |
| 2 | Blurring | Q4/Q5/Q6 | Mirror Image duplicates (8/9/10 Defense); 1/2/3× per day | Defense (avoidance) |
| 3 | Temperate | Q4 only | Immunity to extreme cold OR heat | Utility |
| 4 | Stalwart | Q4 only | Ignore one mental/physical condition; 1×/day | Defense (condition) |
| 5 | Tough | Q4/Q5/Q6 | Gain resistance to damage; 1/2/3× per day | Defense (mitigation) |
| 6 | Silent | Q4/Q6 | Reduce rigid, remove noisy, or +1 Stealth boon | Utility/Stealth |

#### 1.2.5 Wearable Enchantments (20 options, rolled on d20)

| # | Enchantment | Quality | Effect Summary | Role |
|---|-------------|---------|----------------|------|
| 1 | of Protection | Q4/Q5/Q6 | +1/+2/+3 AV (unarmored only) | Defense |
| 2 | of Willpower | Q4/Q5/Q6 | +1/+2/+3 Resist (max 10/12/14) | Defense |
| 3 | of Guarding | Q4/Q5/Q6 | +1/+2/+3 Parry (max 10/12/14) | Defense |
| 4 | of Reflexes | Q4/Q5/Q6 | +1/+2/+3 Dodge (max 10/12/14) | Defense |
| 5 | of Shielding | Q4/Q5/Q6 | Absorb 10/15/20 non-physical damage | Defense |
| 6 | of Might | Q4/Q6 | +1/+2 Strength (up to d8/d10) | Attribute boost |
| 7 | of Swiftness | Q4/Q6 | +1/+2 Agility (up to d8/d10) | Attribute boost |
| 8 | of Wisdom | Q4/Q6 | +1/+2 Spirit (up to d8/d10) | Attribute boost |
| 9 | of Intellect | Q4/Q6 | +1/+2 Mind (up to d8/d10) | Attribute boost |
| 10 | of Ogre Strength | Q4/Q5/Q6 | +1/+2/+3 unarmed weapon damage | Offense |
| 11 | of Fast Stride | Q4/Q6 | +1/+2 Movement per turn | Utility (mobility) |
| 12 | of Pure Thought | Q4 only | Immune to thought-reading, charm, magical sleep; resist psychic | Defense (mental) |
| 13 | of Fortitude | Q4/Q5/Q6 | +2/+4/+6 HP | Defense (durability) |
| 14 | of the Guardian | Q4/Q6 | +1/+2 boon on Initiative | Utility (initiative) |
| 15 | of Attunement | Q4/Q5/Q6 | +2/+4/+6 max Focus | Support (resource) |
| 16 | of Comprehension | Q4 only | Understand and speak one language | Utility (social) |
| 17 | of Arcane Knowledge | Q4/Q5/Q6 | Store arcane spell rank 1/2/3, cast 1×/day | Support (spellcasting) |
| 18 | of Divine Guidance | Q4/Q5/Q6 | Store mystic spell rank 1/2/3, cast 1×/day | Support (spellcasting) |
| 19 | of Immunity | Q4 only | Immune to one condition | Defense (condition) |
| 20 | of Resistance | Q4 only | Resist one damage type | Defense (element) |

### 1.3 Special Materials Summary

| Tier | Quality | Count | Mechanical Depth |
|------|---------|-------|-----------------|
| Primitive | Q1 | 8 | All gain fragile; minimal variety |
| Mundane | Q2–Q8 | 9 (+Obsidian) | No mechanical effects (except Obsidian) |
| Exotic | Q3–Q4 | 10 | All have defined mechanical properties |
| Greater | Q5–Q6 | 10 | Only 2 have defined mechanics (Mithril, partial others) |
| Legendary | Q7–Q8 | 10 | Flavor text only; no defined mechanics |

---

## 2. Critical Analysis

### 2.1 Spell Catalyst Enchantments — Underdeveloped for Wands/Staffs

**Issue:** The spell catalyst enchantment list was designed when the only spell catalysts were generic items. With the recent addition of wands and staffs — which have distinct mechanics (charges, multi-spell holding, heightening) — the current 6 enchantments feel inadequate and fail to leverage these new subsystems.

**Specific gaps:**
- **No charge-related enchantments** — wands and staffs use charges as a core resource, but no enchantment interacts with charge economy (e.g., reduced charge cost, bonus charges on rest, charge-sharing between implements).
- **No multi-spell synergy** — staffs hold 3–6 spells, but no enchantment rewards having diverse spell selections or switching between spells tactically.
- **No heightening support** — both wands and staffs can heighten spells by spending extra charges, but no enchantment incentivizes or enhances this mechanic.
- **Glowing and Deflecting are low-impact** — Glowing is purely utilitarian (emit light), and Deflecting only provides +1 Parry. Both are fixed at Q4 with no scaling.
- **Infused appears in both weapon and catalyst lists** — this duplication suggests the catalyst list was adapted from weapons rather than designed independently.

### 2.2 Armor/Shield Enchantments — Too Few Options

**Issue:** Only 6 enchantments for an entire category that covers body armor, shields, and helmets. This is the same count as spell catalysts and ammo, despite armor/shields being among the most commonly used equipment types.

**Specific gaps:**
- **No element-specific defense** — weapon enchantments offer fire (Flaming), necrotic (Defiled), radiant (Sacred), and blast (Booming) options, but armor has no elemental resistance enchantments (that role is pushed entirely to wearables and materials).
- **No shield-specific enchantments** — shields have unique combat roles (blocking, bashing) but share a generic pool with body armor. Shield-specific enchantments could lean into active blocking, riposte, or cover-extension mechanics.
- **No helmet-specific enchantments** — helmets are a separate item type with their own AV but share the same enchantment pool as full armor.
- **Missing defensive archetypes** — no enchantments for: thorns/retaliation damage on being hit, auto-healing/regeneration, damage reflection, or group protection (extending benefits to allies).
- **Temperate and Stalwart don't scale** — both are fixed at Q4, limiting their usefulness as characters progress.

### 2.3 Enchantment Quality Cap at Q6

**Issue:** All enchantments max out at Q6, despite the system supporting Q7 (Legendary) and Q8 (Mythical) quality tiers. The cost tables include Q7 and Q8 enchantment costs, but no enchantment descriptions exist for these tiers. This means Q7–Q8 items only get higher base bonuses (+4/+5 weapon damage or AV) and potentially special materials, but no enchantment scaling.

**Impact:**
- Q7–Q8 items feel mechanically incomplete — they're just "bigger numbers" without distinctive enchantment power.
- The cost of Q7–Q8 enchantments is defined (30,000–100,000+ coins) but buys nothing additional.
- Campaign-defining artifacts lack the mechanical tools to feel truly legendary.

### 2.4 Wearable Enchantments — Strong but Imbalanced

**Issue:** The wearable list has 20 options (good variety), but distribution is heavily skewed toward defense and passive stat boosts.

**Breakdown by role:**
- Defense: 10 (Protection, Willpower, Guarding, Reflexes, Shielding, Fortitude, Pure Thought, Immunity, Resistance, and partially Ogre Strength)
- Attribute boost: 4 (Might, Swiftness, Wisdom, Intellect)
- Support: 3 (Attunement, Arcane Knowledge, Divine Guidance)
- Utility: 3 (Fast Stride, Guardian initiative, Comprehension)
- Offense: 1 (Ogre Strength for unarmed only)

**Specific gaps:**
- **No skill-boosting wearables** — no enchantment grants bonuses to specific skills (e.g., Stealth, Perception, Nature).
- **No active-ability wearables** — nearly all wearable enchantments are passive. No wearable grants a daily-use active power (e.g., teleport, invisibility, flight).
- **No social/exploration wearables** — beyond Comprehension, no wearable supports social encounters, travel, or exploration.
- **Attribute caps (d8/d10) limit late-game value** — the "of Might/Swiftness/Wisdom/Intellect" enchantments can only raise attributes to d8 or d10, making them useless for characters who already have high attributes.

### 2.5 Weapon Enchantments — Solid but Offense-Dominated

**Issue:** 12 options provide good variety, but nearly all are offensive. The few non-offensive options (Morphing, Returning, Sentinel) are limited to Q4 or Q4/Q5 and don't scale.

**Breakdown by role:**
- Offense: 8 (Bloody, Booming, Defiled, Flaming, Poisoner's, Sacred, Slaying, Sundering)
- Support: 1 (Infused — Focus recovery)
- Utility: 3 (Morphing, Returning, Sentinel)
- Defense: 0
- Control: 0 (Booming has push but is primarily offensive)

**Specific gaps:**
- **No defensive weapon enchantment** — no option enhances Parry, grants damage reduction while wielding, or provides reactive defense on being attacked.
- **No control-focused weapon enchantment** — no option inflicts slow, root, silence, or other control conditions.
- **Elemental coverage is uneven** — fire (Flaming), necrotic (Defiled), radiant (Sacred), and blast (Booming) are covered, but frost, lightning, acid, and psychic damage types have no weapon enchantment.
- **Flaming/Defiled/Sacred are mechanically identical** — same damage values, same activation (Quick Action for short duration), same AV-ignoring behavior. Only damage type and flavor differ.

### 2.6 Ammo Enchantments — Functional but Limited

**Issue:** 6 options is reasonable for a consumable item type, but there are design inconsistencies.

**Specific issues:**
- **Draining is Q5 only** — unlike every other ammo enchantment, it has no Q4 or Q6 variant. This makes it unavailable to early characters and unable to improve with progression.
- **Seeking skips Q5** — available at Q4 and Q6 but not Q5, creating an awkward gap.
- **No utility ammo** — all options are offensive or control. No ammo provides light, signals, smoke screens, or non-combat utility.
- **No elemental variety** — Burning (fire) is the only elemental option. No frost, lightning, acid, or radiant ammo exists.

### 2.7 Special Materials — Incomplete Above Exotic Tier

**Issue:** Exotic materials (Q3–Q4) are excellently designed with clear, specific mechanical properties. Greater (Q5–Q6) and Legendary (Q7–Q8) materials mostly lack defined properties.

**Specific problems:**
- **Greater materials**: Only Mithril has fully defined properties. Meteorite, Treantwood, Dragon Bone, Dragon Scales, Deep Iron, Phantom-Silk, Solarite, Lunarite, and Adamantite have flavor descriptions but incomplete or missing mechanical definitions.
- **Legendary materials**: All 10 materials (Orichalcum, Celestial Feathers, Elder Dragon Bone/Scales, Aegium, Eternite, Elderwood, Dreamweave, Titanium, Infernal Horn) have only flavor text with no defined mechanical properties.
- This means GMs must improvise properties for any item above Q4 that uses special materials, creating inconsistency between tables.

### 2.8 Cost Formula Clarity

**Issue:** The cost formula is sound but has edge cases that may confuse GMs.

- **Wearables skip magic item base cost** — this exception is noted but easy to miss. It makes wearables significantly cheaper than weapons/armor of the same quality.
- **Morphing weapon cost** — the enchantment requires destroying a masterwork weapon during crafting and has a unique cost formula (add both base costs + material extras, pay enchantment cost once). This special case breaks the standard formula pattern.
- **Enchanted ammo pricing** — individual pieces vs. supply stacks use different cost models. The rule that "3 pieces of enchanted ammo cost the same as 1 stack of regular magic ammo" is noted but could be more prominent.

### 2.9 Random Generation Tables

**Issue:** Each enchantment category uses a different die (d6, d12, d20), which is elegant for random treasure generation. However, the uneven distribution means some categories are overrepresented when rolling randomly.

- Rolling a d6 for ammo, catalyst, or armor enchantments means each option has a 16.7% chance.
- Rolling a d12 for weapons gives each option an 8.3% chance.
- Rolling a d20 for wearables gives each option a 5% chance.
- This is balanced if you first determine item type, then roll within that type. The system handles this well.

---

## 3. Comparative Analysis with Genre Standards

### 3.1 Comparison with D&D 5e Magic Items

| Feature | D&D 5e | Nexus RPG | Assessment |
|---------|--------|-----------|------------|
| Rarity tiers | 4 (Uncommon–Legendary) + Artifact | 6 (Q3–Q8) | ✅ More granular, good |
| Weapon enchantments | 20+ distinct effects | 12 | ⚠️ Adequate but could expand |
| Armor enchantments | 15+ distinct effects | 6 | ❌ Significantly fewer |
| Wearable variety | 50+ distinct items | 20 enchantments | ⚠️ Decent for enchantment-based system |
| Staff/Wand support | Distinct item entries per staff | Generic charge system | ✅ Elegant, but enchantments need updating |
| Consumables | Potions, scrolls, oils | Scrolls, enchanted ammo, alchemy | ✅ Good variety with alchemy system |
| Materials system | None (flavor only) | Tiered with mechanics | ✅ Unique strength |
| Crafting integration | Optional DMG rules | Core system with talents | ✅ Superior integration |

### 3.2 Comparison with Pathfinder 2e

| Feature | PF2e | Nexus RPG | Assessment |
|---------|------|-----------|------------|
| Rune system | Fundamental + property runes | Base bonus + enchantment | ✅ Similar approach, cleaner |
| Stacking rules | Typed bonuses, highest only | Same: typed bonuses, highest only | ✅ Identical philosophy |
| Shield enchantments | Distinct shield rune category | Shared with armor | ⚠️ Could differentiate |
| Catalyst/focus items | Focus spells + staves | Wands, staffs, catalyst bonus | ✅ Good foundation |
| Investment/attunement | Invested items (10 max) | Equipment slots (8) | ✅ Similar bounded system |

### 3.3 Unique Nexus RPG Strengths

1. **Material system** — tiered materials with mechanical properties is a distinctive feature that no major competitor handles as comprehensively.
2. **Cost formula transparency** — the additive cost formula is cleaner than D&D's arbitrary pricing or PF2e's level-based costs.
3. **Enchantment limit (one per item)** — prevents excessive complexity while making each enchantment choice meaningful.
4. **Wearable slot system** — 8 equipment slots with distinct wearable enchantments provides structured character customization.
5. **Durability integration** — items having durability that interacts with enchantments (Volatile) adds tactical depth.

---

## 4. Recommendations

### 4.1 Priority 1: Expand Spell Catalyst Enchantments for Wands/Staffs

The spell catalyst enchantment list should grow from 6 to 10–12 options (rolled on d12) to properly support wands, staffs, and generic spell catalysts. New enchantments should leverage charge mechanics, multi-spell synergy, and heightening.

**Proposed new spell catalyst enchantments:**

| # | Name | Quality | Effect | Design Notes |
|---|------|---------|--------|--------------|
| 7 | Efficient | Q4/Q5/Q6 | Once per day, cast a spell from this catalyst at one rank higher without spending additional Focus or charges. Twice/thrice per day at Q5/Q6. | Rewards heightening, differentiates from Storing |
| 8 | Overflowing | Q4/Q5/Q6 | This catalyst holds 2/4/6 additional charges beyond its normal maximum. | Directly supports wand/staff charge economy |
| 9 | Siphoning | Q5/Q6 | When you reduce a creature to 0 HP with a spell cast through this catalyst, regain 1/2 charges. Once per scene. | Offensive caster reward, risk/reward |
| 10 | Warding | Q4/Q5/Q6 | While holding this catalyst, gain +1/+2/+3 Resist against spells and magical effects (max 10/12/14). | Defensive option for casters, mirrors wearable "of Willpower" |
| 11 | Quickened | Q5/Q6 | Once per day, cast a rank 0/1 spell from this catalyst as a Quick Action instead of an Action. | Tactical flexibility, high value |
| 12 | Attuned | Q4/Q5/Q6 | Choose one spell discipline or tradition. Spells of that discipline/tradition cast through this catalyst gain +1/+2/+3 to their spell damage. | Specialization reward, stacks with base catalyst bonus as situational bonus |

**Also recommended:**
- Update **Deflecting** to scale: Q4 (+1 Parry), Q5 (+1 Parry, +1 Dodge), Q6 (+2 Parry, +1 Dodge).
- Update **Glowing** to scale: Q4 (emit light), Q5 (emit light + 1×/day cast Light cantrip without charges), Q6 (emit light + darkness/illusion dispel in close range 1×/day).

### 4.2 Priority 2: Expand Armor/Shield Enchantments

The armor/shield enchantment list should grow from 6 to 10–12 options (rolled on d12). New enchantments should differentiate armor from shields, add elemental defense, and provide active defensive options.

**Proposed new armor/shield enchantments:**

| # | Name | Quality | Effect | Design Notes |
|---|------|---------|--------|--------------|
| 7 | Reflecting | Q4/Q5/Q6 | When you successfully resist a spell targeting you, the caster takes 2/4/6 damage of the spell's type. 1/2/3× per day. | Anti-caster defense, rewards high Resist |
| 8 | Fortified | Q4/Q5/Q6 | Gain +2/+4/+6 temporary HP at the start of each combat. Lost temporary HP are restored after a short break. | Reliable damage buffer |
| 9 | Vigilant | Q4/Q5/Q6 | You cannot be surprised. Gain +1/+2/+3 to Initiative rolls while wearing this armor. | Perception-adjacent defense |
| 10 | Warding | Q4/Q5/Q6 | Choose a damage type (fire, frost, lightning, acid, necrotic, or radiant). Gain resistance to that type. At Q5, choose two types. At Q6, choose three types. | Elemental defense for armor |
| 11 | Retaliating | Q4/Q5/Q6 | When a creature in melee range hits you, deal 1/2/3 damage to them (damage type matches armor material — physical for metal, fire for solarite, etc.). | Thorns/retaliation archetype |
| 12 | Rallying | Q5/Q6 | When you take a Wound or are reduced below half HP, allies in close range gain +1/+2 to their next attack roll. Once per scene. | Tank/leadership synergy |

**Also recommended:**
- Update **Temperate** to scale: Q4 (cold or heat immunity), Q5 (cold and heat immunity), Q6 (cold and heat immunity + resistance to fire and frost damage).
- Update **Stalwart** to scale: Q4 (1×/day), Q5 (2×/day), Q6 (3×/day).

### 4.3 Priority 3: Define Greater and Legendary Material Properties

All materials should have concrete mechanical properties. This is essential for GM consistency and player decision-making.

**Proposed Greater material properties (Q5–Q6):**

| Material | Proposed Properties |
|----------|-------------------|
| **Meteorite** | Weapon/Catalyst: Spells and attacks deal +1 damage (item bonus) that ignores AV. Armor: Gain +1 Resist (item bonus) against magical effects. |
| **Treantwood** | Weapon/Shield: Once per day, if item would lose a Durability use, ignore that loss. Armor: Same, and also self-repairs 1 Durability use during a night's rest. |
| **Dragon Bone** | Weapon: Choose one element (fire, frost, lightning, acid) at creation. Deal +2 damage (item bonus) of that type on hit. Armor/Shield: Resistance to chosen element. |
| **Dragon Scales** | Armor/Shield: +1 AV (item bonus) and resistance to the element matching the dragon's type. Weapon: Not applicable (use Dragon Bone). |
| **Deep Iron** | Any: +1 boon to resist effects that would damage or destroy the item. Armor: Reduce all physical damage taken by 1 (minimum 1). |
| **Phantom-Silk** | Light Armor: -1 load (min 0), +1 boon on Stealth rolls. Wearable: The item is invisible while worn (still detectable by touch/magic). |
| **Solarite** | Weapon: Quick Action to ignite, dealing +2 fire damage (item bonus) for short duration (same bonus type as Flaming — only the higher value applies). Armor: Creatures that grapple or touch you take 2 fire damage. |
| **Lunarite** | Armor/Shield: +1 boon to Resist against spells. Catalyst: Reduce Focus cost of spells by 1 (min 1). |
| **Adamantite** | Any: Item cannot be damaged or destroyed by non-magical means. Durability checks automatically succeed against mundane damage sources. |

**Proposed Legendary material properties (Q7–Q8):**

| Material | Proposed Properties |
|----------|-------------------|
| **Orichalcum** | Any: -2 load (min 0). Weapon: +1 boon on all attack rolls. |
| **Celestial Feathers** | Light Armor/Wearable: Wearer can levitate up to close range off the ground at will (Movement action). Shield: Block ranged attacks from any direction. |
| **Elder Dragon Bone** | As Dragon Bone but +4 elemental damage and resistance applies to the element and one adjacent type (fire+acid, frost+lightning). |
| **Elder Dragon Scales** | As Dragon Scales but +2 AV and immunity (not just resistance) to the dragon's element. |
| **Aegium** | Weapon: +1 boon on attacks vs. undead, fiends, and aberrations. Armor: Immunity to frightened and charmed conditions from evil sources. |
| **Eternite** | Catalyst: +2 max Focus and reduce all spell Focus costs by 1 (min 1). Weapon: Spells channeled through this weapon gain +2 damage. |
| **Elderwood** | Catalyst/Weapon: Once per day, cast a nature or life spell you know without spending Focus. Shield: Once per day, create a wall of thorny vines in close range that provides cover for short duration. |
| **Dreamweave** | Armor/Wearable: Immunity to sleep, charm, and psychic damage. +1 boon on Resist against illusion effects. |
| **Titanium** | Armor: Reduce all physical damage by 2 (min 1). Weapon: +1 weapon damage (stacks with quality bonus). |
| **Infernal Horn** | Weapon: +2 fire damage. Once per day, release a burst of flame dealing 6 fire damage to all creatures in melee range. Armor: Immunity to fire damage. |

### 4.4 Priority 4: Add Q7–Q8 Enchantment Scaling

Enchantments should scale to Q7 and Q8 to make legendary and mythical items feel mechanically distinct.

**Scaling principles for Q7–Q8:**
- Q7 enchantments should provide the Q6 effect plus an additional secondary benefit or increased frequency.
- Q8 enchantments should provide a signature capstone ability that defines the item.

**Examples of Q7–Q8 scaling:**

| Enchantment | Q7 Effect | Q8 Effect |
|-------------|-----------|-----------|
| **Flaming** (weapon) | 8 fire damage ignoring AV; once per day, unleash a cone of flame in close range dealing 12 fire damage (vs. Dodge) | 10 fire damage ignoring AV; weapon ignites permanently (no activation needed); immune to fire while wielding |
| **Tough** (armor) | Gain resistance 4×/day; when activated, also gain +2 AV until end of next turn | Gain resistance 5×/day; at start of each turn, automatically resist the first source of damage |
| **Storing** (catalyst) | Store rank 4 spell, cast 2×/day without Focus | Store rank 5 spell, cast 3×/day without Focus; stored spell's TN increases by +2 |
| **Slaying** (weapon) | +8 damage vs. creature type; +1 boon on all rolls involving that type | +10 damage vs. creature type; on critical hit vs. that type, target must roll Spirit + Fortitude vs. TN 16 or suffer an additional wound |
| **of Protection** (wearable) | +4 AV (unarmored) | +5 AV (unarmored); once per day, create a magical shield that absorbs 20 damage |

### 4.5 Priority 5: Fill Weapon Enchantment Gaps

Add 2–4 weapon enchantments to cover missing damage types and roles:

**Proposed new weapon enchantments (expanding from d12 to d12 + special):**

| Name | Quality | Effect | Design Notes |
|------|---------|--------|--------------|
| **Frosted** | Q4/Q5/Q6 | Quick Action to coat in frost for short duration. While active, deal 2/4/6 frost damage ignoring AV and target is slowed briefly on strong/critical hit. | Fills frost gap, adds control element |
| **Shocking** | Q4/Q5/Q6 | Quick Action to charge with lightning for short duration. While active, deal 2/4/6 lightning damage ignoring AV. On critical hit, the lightning arcs to one creature in melee range of the target for half damage. | Fills lightning gap, adds AoE element |
| **Binding** | Q4/Q5/Q6 | On strong/critical hit, target must resist (vs. TN 8/10/12) or be slowed for short duration. 1/2/3× per day. | Pure control enchantment, fills gap |
| **Guardian's** | Q4/Q5/Q6 | While wielding, gain +1/+1/+2 Parry. Once per day, when an ally in melee range is hit, you can use a Quick Action to redirect the attack to yourself. | Defensive weapon enchantment, fills gap |

### 4.6 Priority 6: Add Utility and Social Wearable Enchantments

Fill gaps in the wearable list for non-combat play:

**Proposed additions (expanding from d20 to d20 + special):**

| Name | Quality | Effect | Design Notes |
|------|---------|--------|--------------|
| **of Skill** | Q4/Q5/Q6 | Choose one skill. Gain +1/+2/+3 to that skill's rolls (skill bonus type, max rank 3/4/5). | General skill boosting, versatile |
| **of the Chameleon** | Q4/Q6 | Once per day, change your appearance for medium duration (as Disguise Self). Q6: also change voice. | Active utility, fills exploration gap |
| **of Featherfall** | Q4 | When falling, reduce fall distance by medium range for damage calculation. Land safely from any height up to long range. | Classic fantasy utility |
| **of Waterbreathing** | Q4 | Breathe underwater indefinitely. Gain +1 boon on Athletics rolls to swim. | Exploration utility |
| **of Darkvision** | Q4/Q6 | See in darkness as if dim light for medium/long range. Q6: also see through magical darkness. | Exploration utility |

### 4.7 Priority 7: Address Ammo Enchantment Inconsistencies

**Quick fixes:**
- **Draining**: Expand to Q4/Q5/Q6 scaling. Q4: briefly stun once/scene/target. Q5: briefly stun once/scene/target + target takes +1 bane on next roll. Q6: briefly stun + target takes +2 banes on next roll.
- **Seeking**: Add Q5 tier. Q4: ignore range/cover, +1 boon. Q5: same + ignore concealment. Q6: same + target behind full cover.

**New ammo options:**
- **Smoke** (Q4): On hit, creates a cloud of smoke in melee range of impact point for short duration. Creatures in smoke are blinded while inside.
- **Frost** (Q4/Q5/Q6): On hit, inflict 4/6/8 frost damage and target is slowed briefly.

---

## 5. Structural & Usability Improvements

### 5.1 Enchantment Organization

**Current structure:** Enchantments are organized by item type (ammo, weapon, catalyst, armor/shield, wearable) in a single document. This is functional but could be improved.

**Recommendation:** Keep the current single-document structure but add:
1. **Quick reference table** at the top listing all enchantments by name with page anchors.
2. **Role tags** for each enchantment (Offense, Defense, Control, Support, Utility) to help GMs select thematically appropriate items.
3. **Archetype suggestions** — brief notes on which character archetypes benefit most from each enchantment.

### 5.2 Materials Document Completeness

**Current structure:** Materials are organized by tier (Primitive → Legendary), which is logical.

**Recommendation:**
1. Complete mechanical definitions for all Greater and Legendary materials (see Section 4.3).
2. Add a **"Harvesting Guide"** section noting which creature types yield which materials (e.g., Dragon Bone from draconic creatures, Monster Scales from monstrosities).
3. Add a **material compatibility table** showing which materials work with which item types (some materials logically can't be used for all items).

### 5.3 Cost Table Clarity

**Recommendation:**
1. Add worked examples directly into the cost tables document for each item type.
2. Bold the wearable exception rule ("Wearables skip magic item base cost") and place it in a callout box.
3. Add a row to the cost tables for "Wand" and "Staff" specifically, even if they use the same costs as one-handed/two-handed weapons.

### 5.4 Random Treasure Generation

**Recommendation:** Add a unified treasure generation procedure:
1. Roll item type (d8: weapon, armor, shield, helmet, wand, staff, wearable, ammo).
2. Roll quality tier (weighted by dungeon/encounter level).
3. Roll material (optional, based on quality tier).
4. Roll enchantment (using the appropriate die for item type).

---

## 6. Summary of Recommendations by Priority

| Priority | Recommendation | Impact | Effort |
|----------|---------------|--------|--------|
| **1 (High)** | Expand spell catalyst enchantments (6 → 12) | Completes wand/staff integration | Medium |
| **2 (High)** | Expand armor/shield enchantments (6 → 12) | Fills major defensive gap | Medium |
| **3 (High)** | Define Greater/Legendary material properties | Completes material system | Medium |
| **4 (Medium)** | Add Q7–Q8 enchantment scaling | Enables legendary items | Medium |
| **5 (Medium)** | Add missing weapon enchantment types | Fills elemental and role gaps | Low |
| **6 (Medium)** | Add utility/social wearable enchantments | Expands non-combat options | Low |
| **7 (Low)** | Fix ammo enchantment inconsistencies | Quality-of-life improvement | Low |
| **8 (Low)** | Structural/usability improvements | Better GM experience | Low |

---

## 7. Draft Examples

### 7.1 Example: Expanded Spell Catalyst Enchantment — Efficient

> **efficient (Q4/Q5/Q6)**
>
> This catalyst pulses with residual magical energy that amplifies spells beyond their natural limits. Once per day, when you cast a spell through this catalyst, you can cast it at one rank higher than the Focus you spend (or charges used). The spell is treated as if you had spent the Focus or charges for the higher rank, including improved effects and damage scaling. At Q5, you can use this ability twice per day. At Q6, three times per day.

### 7.2 Example: Expanded Armor Enchantment — Reflecting

> **reflecting (Q4/Q5/Q6)**
>
> This armor shimmers with a faint, mirror-like sheen that catches and redirects magical energy. When you succeed on a Resist roll against a spell that targets you, the caster suffers 2 damage of the spell's damage type as the magical energy rebounds. The damage increases to 4 at Q5 and 6 at Q6. You can use this ability once per day at Q4, twice at Q5, and three times at Q6.

### 7.3 Example: New Weapon Enchantment — Frosted

> **frosted (Q4/Q5/Q6)**
>
> A thin layer of rime perpetually coats this weapon, and the air around it carries a biting chill. You can use a Quick Action on your turn to intensify the frost for a **short duration**. While intensified, the weapon emits dim light in melee range and deals 2 additional frost damage (ignoring AV) on a hit. On a **strong** or **critical hit**, the target is **slowed** briefly as ice crystals spread across their limbs. The extra frost damage increases to 4 at Q5 and 6 at Q6.

### 7.4 Example: New Wearable Enchantment — of the Chameleon

> **of the Chameleon (Q4/Q6)**
>
> This item shimmers faintly, its surface subtly shifting colors like a desert lizard's scales. Once per day, you can use an Action to alter your physical appearance for a **medium duration**, changing your height (within one size category), weight, facial features, hair, skin color, and clothing appearance. The disguise does not hold up to physical inspection — touching you reveals the illusion. At Q6, you can also alter your voice and the disguise extends to a **long duration**.

### 7.5 Example: Defined Greater Material — Adamantite

> **Adamantite (Q5–Q6)**
>
> This incredibly dense, dark metallic ore is mined from the deepest veins of ancient mountains. Items forged from adamantite are nearly indestructible.
>
> - **Any item**: The item cannot be damaged or destroyed by non-magical means. Durability checks caused by mundane damage sources (non-magical attacks, environmental hazards, normal wear) automatically succeed. Magical effects that specifically target or destroy items still apply normally.
> - **Weapon**: The weapon ignores the first point of a target's AV on each hit (item bonus — same type as Sundering enchantment, only the higher value applies).
> - **Armor/Shield**: Once per day, when you would take a critical hit, you can reduce it to a strong hit.

---

## Appendix A: Complete Enchantment Count Summary

| Category | Current Count | Recommended Count | Die |
|----------|--------------|-------------------|-----|
| Ammo | 6 | 8 | d8 |
| Weapon | 12 | 16 | d12+d4 or d16 |
| Spell Catalyst | 6 | 12 | d12 |
| Armor/Shield | 6 | 12 | d12 |
| Wearable | 20 | 24–25 | d24 or extended d20 |
| **Total** | **50** | **72–73** | — |

## Appendix B: Role Coverage Matrix (Current)

> Note: Some enchantments serve multiple roles (e.g., Anchoring is both Defense and Offense). Row totals therefore exceed the unique enchantment count of 50 listed in the Executive Summary.

| Role | Ammo | Weapon | Catalyst | Armor/Shield | Wearable | Total |
|------|------|--------|----------|-------------|----------|-------|
| Offense | 4 | 8 | 1 | 1 | 1 | 15 |
| Defense | 0 | 0 | 1 | 5 | 10 | 16 |
| Control | 2 | 0 | 0 | 0 | 0 | 2 |
| Support | 0 | 1 | 3 | 0 | 3 | 7 |
| Utility | 0 | 3 | 1 | 1 | 3 | 8 |
| Attribute | 0 | 0 | 0 | 0 | 4 | 4 |
| **Total** | **6** | **12** | **6** | **7** | **21** | **52** |

## Appendix C: Role Coverage Matrix (Proposed — After All Recommendations)

| Role | Ammo | Weapon | Catalyst | Armor/Shield | Wearable | Total |
|------|------|--------|----------|-------------|----------|-------|
| Offense | 5 | 8 | 2 | 2 | 1 | 18 |
| Defense | 0 | 1 | 2 | 7 | 10 | 20 |
| Control | 2 | 1 | 0 | 0 | 0 | 3 |
| Support | 0 | 1 | 5 | 1 | 3 | 10 |
| Utility | 1 | 3 | 2 | 2 | 7 | 15 |
| Attribute | 0 | 0 | 0 | 0 | 4 | 4 |
| **Total** | **8** | **14** | **11** | **12** | **25** | **70** |
