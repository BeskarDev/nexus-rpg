# Enchantments & Magic Items — Design Analysis

> **Scope:** Enchantment categories, options, scaling, and gaps. Material properties are deferred to a separate task. Named wand/staff catalogue, utility magic items catalogue, and temporary enchantments/alchemy expansion are flagged as future documents.

---

## 1. Executive Summary

### Key Findings

1. **Split armor and shield enchantments** into separate d100 tables with distinct identities (armor → passive defense; shields → active/reactive defense).
2. **Remove the spell catalyst enchantment table entirely** — catalysts are slotless items added to a slot, so stacking catalyst and slot enchantments is bad design. Catalysts use the wearable enchantment list directly.
3. **Enchantments ignore non-combat play** — only 2 of 50 enchantments touch Travel, Exploration, or Social Intrigue. Expand wearable enchantments to cover these modes.
4. **Weapon and ammo tables stay combat-focused** — non-combat enchantments belong on the wearable table. All item types can already use wearable enchantments instead of their own table.
5. **Differentiate scaling** — not all enchantments follow Q4/Q5/Q6. Some are Q4-only binary capabilities, others Q6+-only triggered powers. Immunity is never passive.
6. **Convert all tables to d100** — target counts: Ammo 10, Weapon 20, Armor 10, Shield 10, Wearable 25.
7. **Enchantments and talents must harmonize** — 2 anti-synergies identified (of Immunity, of Pure Thought) with recommended fixes.
8. **Minor Enchantment rule** — Q4-only binary enchantments tagged `[minor]` can be added to Q5+ items alongside a primary enchantment.
9. **Magic utility items need categorization** — proposed d100 tables for Containers, Everyday Objects, Instruments, Body Parts, and Natural items.
10. **Q7–Q8 signature enchantments** — legendary effects that define an item's identity (Sentient shield, Avenger's weapon, Living armor).

### Role Categories

| Role | Description |
|------|-------------|
| **Offense** | Threatens, damages, or removes opposition |
| **Defense** | Protects, mitigates harm, or creates safe posture |
| **Healing** | Restores or relieves physical, mental, or social harm |
| **Control** | Shapes enemy behaviour or the environment to your advantage |
| **Support** | Empowers allies, organises groups, or reshapes social outcomes |
| **Utility** | Exploration, knowledge, travel, resource creation, and scene tools |

### Design Principles

1. **Anti-trivialization** — enchantments grant boons on rolls, not auto-success. Resource management (supplies, fatigue, durability) must remain meaningful.
2. **GM-ease** — non-combat enchantments that provide information follow the Sense of Deduction R2 model: define what the GM reveals, how often, and at what scope. No vague "you sense danger" effects.
3. **Talent harmony** — enchantments complement talents, not replace them. A +1 boon on Perception is additive to Dungeon Delver's trap analysis, not a substitute.
4. **Limited resource discipline** — powerful active effects use limited resources (X/day or 1/scene), not passive scaling. See Appendix D for model comparison.

---

## 2. Current System Catalogue

### 2.1 Magic Item Types

| Item Type | Quality | Key Mechanic |
|-----------|---------|--------------|
| Weapons | Q3–Q8 | +1 to +5 weapon damage, durability |
| Armor/Shields/Helmets | Q4–Q8 | +1 to +5 AV, durability |
| Ammo | Q3–Q8 | +1 to +6 flat damage bonus (per-piece) |
| Spell Scrolls | Q3–Q8 | Single-use spell, rank 0–5 |
| Wands | Q4–Q8 | Single spell, 4–20 charges, catalyst bonus |
| Staffs | Q4–Q8 | 3–6 spells, 6–30 charges, catalyst bonus |
| Wearables | Q4–Q6 | Enchantment-only (no base magic bonus) |

### 2.2 Current Enchantments

#### Ammo (6 options, d6)

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Burning | Q4/Q5/Q6 | Inflict burning (4/6/8) on hit | Offense |
| 2 | Draining | Q5 only | Briefly stun target, 1/scene/target | Control |
| 3 | Ensnaring | Q4/Q5/Q6 | Grapple Large or smaller; escape TN 8/10/12 | Control |
| 4 | Shattering | Q4/Q5/Q6 | 4/6/8 blast + prone on strong/crit | Offense |
| 5 | Seeking | Q4/Q6 | Ignore range/cover, +1 boon; Q6 full cover | Support |
| 6 | Wounding | Q4/Q5/Q6 | Inflict bleeding (4/6/8), 1/scene/target | Offense |

#### Weapon (12 options, d12)

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Bloody | Q4/Q5/Q6 | Inflict/increase bleeding (2/4/6) on strong/crit | Offense |
| 2 | Booming | Q4/Q5/Q6 | Blast damage + push; 1/2/3× per day | Offense |
| 3 | Defiled | Q4/Q5/Q6 | Necrotic (2/4/6) ignoring AV | Offense |
| 4 | Flaming | Q4/Q5/Q6 | Fire (2/4/6) ignoring AV | Offense |
| 5 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support |
| 6 | Morphing | Q4 only | Transform between two weapon forms | Utility |
| 7 | Poisoner's | Q4/Q6 | +2/+4 poison damage or increased difficulty | Offense |
| 8 | Returning | Q4 only | Thrown + recall as Quick Action | Utility |
| 9 | Sacred | Q4/Q5/Q6 | Radiant (2/4/6) ignoring AV | Offense |
| 10 | Sentinel | Q4/Q5 | Glow near creature type; Q5 +1 boon vs. type | Utility |
| 11 | Slaying | Q4/Q5/Q6 | +2/+4/+6 damage vs. creature type | Offense |
| 12 | Sundering | Q4/Q5/Q6 | Ignore ½ AV; 1/2/3× per day | Offense |

#### Spell Catalyst (6 options, d6) — **Recommended for removal**

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Storing | Q4/Q5/Q6 | Store spell rank 1/2/3, cast 1×/day | Support |
| 2 | Deflecting | Q4 only | +1 Parry | Defense |
| 3 | Glowing | Q4 only | Emit light on command | Utility |
| 4 | Stabilizing | Q4/Q5/Q6 | Re-roll failed cast; 1/2/3× per day | Support |
| 5 | Volatile | Q4/Q5/Q6 | +2/+4/+6 spell damage, costs Durability | Offense |
| 6 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support |

#### Armor/Shield (6 options, d6) — **Split recommended**

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Anchoring | Q4/Q5/Q6 | Resist push/prone; retaliate 2/4/6; X/day | Defense |
| 2 | Blurring | Q4/Q5/Q6 | Mirror Image duplicates (8/9/10 Defense); X/day | Defense |
| 3 | Temperate | Q4 only | Immunity to extreme cold OR heat | Utility |
| 4 | Stalwart | Q4 only | Ignore one condition; 1×/day | Defense |
| 5 | Tough | Q4/Q5/Q6 | Gain resistance to damage; X/day | Defense |
| 6 | Silent | Q4/Q6 | Reduce rigid, remove noisy, or +1 Stealth boon | Utility |

#### Wearable (20 options, d20)

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | of Protection | Q4/Q5/Q6 | +1/+2/+3 AV (unarmored) | Defense |
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
| 12 | of Pure Thought | Q4 only | Immune to thought-reading, charm, magical sleep | Defense |
| 13 | of Fortitude | Q4/Q5/Q6 | +2/+4/+6 HP | Defense |
| 14 | of the Guardian | Q4/Q6 | +1/+2 boon on Initiative | Support |
| 15 | of Attunement | Q4/Q5/Q6 | +2/+4/+6 max Focus | Support |
| 16 | of Comprehension | Q4 only | Understand and speak one language | Utility |
| 17 | of Arcane Knowledge | Q4/Q5/Q6 | Store arcane spell rank 1/2/3, cast 1×/day | Support |
| 18 | of Divine Guidance | Q4/Q5/Q6 | Store mystic spell rank 1/2/3, cast 1×/day | Support |
| 19 | of Immunity | Q4 only | Immune to one condition | Defense |
| 20 | of Resistance | Q4 only | Resist one damage type | Defense |

### 2.3 Cost Edge Cases

> **⚠️ Wearables skip Magic Item Base Cost.** Wearables only pay base item + enchantment. Example: Q4 Amulet of Protection = 50 (base) + 1,000 (enchantment) = **1,050 coins**.

> **⚠️ Morphing uses a unique formula.** Add both base weapon costs + any material extras, then pay magic item base cost and enchantment once. Example: morphing longsword/shortsword = (50 + 25) base + 1,000 magic base + 1,000 enchantment = **2,075 coins**.

> **⚠️ Enchanted ammo uses per-piece pricing.** Up to 3 pieces per slot. Three Q4 burning arrows +1 = 15 (base) + 150 (magic base) + 150 (enchantment) = **315 coins** total.

---

## 3. Critical Analysis

### 3.1 Armor/Shield Split

Armor and shields share a single 6-entry table despite being mechanically distinct. Shields are awkwardly dual-classified as weapons. Splitting creates room for distinct identities:

- **Armor** → passive/reactive defense, environmental protection, resilience
- **Shields** → active defense, blocking, ally protection, reactive abilities

### 3.2 Catalyst Table Removal

With wands and staffs providing charge-based spellcasting, the catalyst table adds complexity without value. Spell catalysts are items without their own equipment slot — they must be integrated into an existing slot (held as a weapon, worn as an amulet, etc.). Because the catalyst shares a slot with another item, having separate catalyst enchantments creates a stacking problem: the slot item has one enchantment and the catalyst adds another, violating the one-enchantment-per-item principle. **Remove the catalyst table entirely.** Catalysts benefit from the enchantment of whatever slot item they are integrated into, using the wearable enchantment list when applicable.

| Current Catalyst | Disposition |
|-----------------|-------------|
| Storing | Remove — redundant with wand/staff spell storage |
| Deflecting | Remove — reclassify as weapon property if desired |
| Glowing | Remove — make baseline cosmetic feature of magic items |
| Stabilizing | Remove — effect overlaps with wand/staff charge economy and creates stacking issues |
| Volatile | Remove — similar stacking concern; spell damage boosts belong on the item's slot enchantment |
| Infused | Remove — already on weapon table; wand/staff charges cover this |

Named wands/staffs with bespoke abilities (D&D "Staff of Power" model) should be a separate design document.

### 3.3 Non-Combat Game Mode Gap

| Game Mode | Current Enchantments | Coverage |
|-----------|---------------------|----------|
| Combat | ~48 of 50 | ✅ Dominant |
| Travel | 2 (Temperate, Silent) | ❌ Minimal |
| Exploration | 1 (Glowing — barely relevant) | ❌ Nearly zero |
| Social Intrigue | 1 (Comprehension) | ❌ Nearly zero |

**Important:** Non-combat enchantments belong on the **wearable table**. All item types can already use wearable enchantments instead of their own. This means weapon, armor, and shield tables stay focused on their combat identity, while wearables absorb all generic/non-combat/passive/triggered effects.

#### Travel Opportunities
The Travel system uses Navigator, Scout, and optional roles with skill rolls, supply management, fatigue, and weather. Enchantment space: navigation boons, scouting boons, fatigue reduction, supply preservation, weather protection (Temperate already does this at Q4).

#### Exploration Opportunities
> **Note:** The exploration crawl system is in the analysis/design stage and NOT officially in the game rules yet. General concepts (searching, traversal, traps, discovery) can inform design without relying on specific procedures.

Enchantment space: search/Perception boons for traps, darkvision, waterbreathing, safe falls, light sources.

#### Social Intrigue Opportunities
The Social Intrigue system tracks Interest, Patience, Motivations, and Pitfalls. Enchantment space: Insight boons for reading Motivations, Influence boons, disguise, starting Interest bonuses.

### 3.4 Scaling Philosophy

Not all enchantments should follow Q4/Q5/Q6 linearly:

| Tier | Type | Examples |
|------|------|---------|
| **Q4 only** | Binary capabilities `[minor]` | Morphing, Returning, Temperate, Comprehension |
| **Q4–Q6** | Meaningfully scaled | Flaming (2/4/6), Tough (1×/2×/3× per day) |
| **Q5–Q6** | Too powerful for Q4 | Major control effects, resource-on-kill |
| **Q6 only** | Powerful triggered | Damage immunity (triggered, 1×/day) |
| **Q7–Q8** | Legendary signature | Unique abilities that define the item's identity |

**Immunity rule:** Always triggered/limited, never passive. Available Q6+ only. Exception: very narrow passive immunities (Temperate's weather immunity) are fine at Q4.

### 3.5 Minor Enchantment Rule (Option A)

Q4-only binary enchantments tagged `[minor]` can be added to Q5+ items as a secondary enchantment at their normal Q4 cost. This preserves one-primary-enchantment while allowing QoL stacking.

**`[minor]` enchantments:** Morphing, Returning, Temperate, Comprehension, Signaling (ammo), Smoke (ammo), Camouflaged (armor).

### 3.6 Talent Synergy Analysis

#### Good Synergies (Preserve)

| Enchantment | Talent | Why It Works |
|-------------|--------|-------------|
| Elemental weapons | Spellblade / Mystic Champion | Different action economies |
| of Attunement | Inexhaustible Mind / Divine Rites | More Focus benefits recovery talents |
| Infused | Spellweaver (metamagic) | Focus recovery enables metamagic |
| Blocking (shield) | Shield Mastery | Enchantment enhances talent effect |
| Guardian's (weapon) | Protective Stance | Enchantment adds redirect; talent improves Protect Ally |
| of Pathfinding | Knowledgeable Wanderer | Both grant navigation boons; stack cleanly |
| of Trapfinding | Dungeon Delver | Enchantment finds traps; talent analyzes/disables |

#### Anti-Synergies (Fix)

| Enchantment | Talent | Fix |
|-------------|--------|-----|
| of Immunity (Q4, passive) | Body of Bronze R2, Strong Mind R2, Tough Stomach R2 | Move to Q6, make triggered 1×/day |
| of Pure Thought (Q4, passive) | Divine Sense R2, Strong Mind R2 | Move to Q5+, make triggered or limited |

#### Metamagic Interactions

| Metamagic Art | Enchantment | Assessment |
|---------------|-------------|------------|
| Quickened Spell | Infused | **Synergy** — Focus recovery offsets Quickened's cost |
| Elemental Spell | Elemental weapons | **Neutral** — different damage systems |
| Empowered Spell | (no conflict) | **Clean** — Empowered adds spell damage, no overlap |
| Forked Spell | Arcane Knowledge / Divine Guidance | **Synergy** — stored spells can be Forked |
| Searing Spell | Slaying | **Synergy** — Searing overcomes resistances, Slaying adds flat damage |

### 3.7 Weapon Table Identity

Weapon enchantments are almost entirely offensive (8 of 12). Missing: defensive, control, frost, lightning, acid options. Non-combat effects (like navigation boons) belong on the wearable table, not weapons. Weapon table should expand to 20 entries while staying combat-focused.

### 3.8 Wearable Table Gaps

20 options, heavily skewed toward defense (9) and support (7). Missing: healing (0), control (0), skill-boosting, active abilities, travel/exploration/social support. With catalyst table removed and non-combat effects consolidated here, wearable should expand to 25 entries.

### 3.9 Ammo Inconsistencies

- Draining is Q5-only (no Q4 or Q6 variant)
- Seeking skips Q5
- No utility ammo (light, signals, smoke)
- Need 4 more entries to reach d100 target of 10

### 3.10 Q7–Q8 Gap

All enchantments max at Q6 despite Q7–Q8 cost tables existing. Legendary items need distinctive enchantments, not just bigger numbers.

### 3.11 Limited Resource Model Review

Based on Appendix D analysis, the following existing enchantments should change resource model:

| Enchantment | Current Model | Recommended | Rationale |
|-------------|--------------|-------------|-----------|
| Stalwart (armor) | 1×/day | **1/scene** | Defensive reaction — should be reliable per encounter |
| Tough (armor) | X/day | X/day ✓ | Correct — powerful damage resistance warrants daily management |
| Blurring (armor) | X/day | X/day ✓ | Correct — Mirror Image is powerful enough for daily management |
| Anchoring (shield) | X/day | **1/scene** | Defensive reaction — anti-push/prone should be per-encounter |
| Booming (weapon) | X/day | X/day ✓ | Correct — powerful offensive trigger |
| Sundering (weapon) | X/day | X/day ✓ | Correct — AV bypass is powerful |
| Infused (weapon) | 1×/day | 1×/day ✓ | Correct — Focus recovery is economy-breaking if more frequent |
| of Immunity | Passive | **1×/day triggered** | Must become limited (see Section 3.4) |
| of Pure Thought | Passive | **Triggered/limited** | Must become limited (see Section 3.6) |

New enchantment resource model guidance:
- **Defensive reactions** (Stalwart, Anchoring, condition removal) → **1/scene**
- **Powerful offense** (Booming, Sundering, Slaying active) → **X/day**
- **Focus/HP recovery** → **1/day always**
- **Travel/exploration** → **1/day or 1/journey**
- **Social intrigue** → **1/intrigue**
- **Condition immunity** → **1/day at Q6+**

---

## 4. Comparative Analysis

### D&D 5e

| Feature | D&D 5e | Nexus RPG | Assessment |
|---------|--------|-----------|------------|
| Rarity tiers | 4 + Artifact | 6 (Q3–Q8) | ✅ More granular |
| Weapon enchantments | 20+ | 12 | ⚠️ Expand to 20 |
| Armor enchantments | 15+ | 6 (shared) | ❌ Split and expand |
| Shield enchantments | Distinct items | Shared with armor | ❌ Needs own table |
| Non-combat items | 30+ utility | No framework | ❌ Major gap |
| Crafting integration | Optional DMG rules | Core system | ✅ Superior |

### Pathfinder 2e

| Feature | PF2e | Nexus RPG | Assessment |
|---------|------|-----------|------------|
| Rune system | Fundamental + property | Base bonus + enchantment | ✅ Similar, cleaner |
| Shield runes | Distinct category | Shared with armor | ⚠️ Should split |
| Exploration items | Several | Nearly none | ❌ Gap |
| Investment system | 10 invested items | 8 equipment slots | ✅ Similar |

### Nexus RPG Strengths
- Transparent cost formula (cleaner than D&D or PF2e)
- One enchantment per item (meaningful choice)
- 8 wearable slots (structured customization)
- Durability integration (Volatile)
- Refined non-combat subsystems (Travel, Social Intrigue) — enchantments just haven't caught up

---

## 5. Recommendations

### 5.1 Split Armor/Shield into Separate d100 Tables

**Proposed Armor Enchantments (10 entries):**

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 01–10 | Blurring | Q4/Q5/Q6 | Mirror Image duplicates (8/9/10 Defense); 1/2/3× per day | Defense |
| 11–20 | Stalwart | Q4/Q5/Q6 | Ignore one condition; 1/2/3× per scene | Defense |
| 21–30 | Tough | Q4/Q5/Q6 | Gain resistance to damage; 1/2/3× per day | Defense |
| 31–40 | Silent | Q4/Q6 | Reduce rigid, remove noisy, or +1 Stealth boon | Utility |
| 41–50 | Temperate `[minor]` | Q4 only | Immunity to extreme cold OR heat | Utility |
| 51–60 | Vigilant | Q4/Q6 | Cannot be surprised; +1/+2 boon on Initiative | Defense |
| 61–70 | Warded | Q5/Q6 | Resistance to one non-physical damage type, 1/2× per day. Q6: triggered immunity, 1×/day | Defense |
| 71–80 | Fortified | Q4/Q5/Q6 | +1/+2/+3 AV while using Guard or haven't moved this turn | Defense |
| 81–90 | Camouflaged `[minor]` | Q4 only | +1 boon on Stealth in a specific environment (chosen on creation) | Utility |
| 91–100 | Enduring | Q4/Q5/Q6 | Reduce fatigue from environmental effects by 1/2/3 per day. During travel, ignore the first Fatigue per journey | Utility |

> Stalwart uses 1/scene model with quality-scaled frequency (1/2/3 uses per scene at Q4/Q5/Q6). Temperate and Camouflaged are `[minor]`. Enduring supports Travel without trivializing fatigue management.

**Proposed Shield Enchantments (10 entries):**

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 01–10 | Anchoring | Q4/Q5/Q6 | Resist push/prone; retaliate 2/4/6 damage; 1/scene | Defense |
| 11–20 | Covering | Q4/Q5/Q6 | Quick Action: extend shield AV to adjacent ally until your next turn; 1/2/3× per day | Support |
| 21–30 | Reflecting | Q5/Q6 | On successful Resist vs. spell, caster takes 2/4 damage; 1/2× per day | Defense |
| 31–40 | Retaliating | Q4/Q5/Q6 | When hit in melee, deal 1/2/3 damage to attacker (once per round) | Defense / Offense |
| 41–50 | Shielding | Q6 only | Triggered: gain immunity to one damage type until end of next turn; 1×/day | Defense |
| 51–60 | Rallying | Q5/Q6 | When you take a Wound, allies in close range gain +1/+2 to next attack; 1/scene | Support |
| 61–70 | Warding | Q4/Q5/Q6 | +1/+2/+3 Resist vs. spells (max 10/12/14) | Defense |
| 71–80 | Bashing | Q4/Q5/Q6 | Shield bash: daze on strong/crit. Q5: also push. Q6: also prone | Offense / Control |
| 81–90 | Sentinel's | Q4/Q5 | Allies in melee range gain +1 AV. Q5: extends to close range | Support |
| 91–100 | Blocking | Q4/Q5/Q6 | Shield Mastery or shield Combat Art: +1/+2/+3 to damage reduction or Defense bonus | Defense |

> Anchoring changed to 1/scene (defensive reaction). Shielding is Q6-only triggered. Blocking explicitly synergizes with Shield Mastery talent.

### 5.2 Remove Spell Catalyst Table

Remove entirely. Catalysts use wearable enchantments directly. No migration of Stabilizing or Volatile — as slotless items added to a slot, catalyst enchantment stacking is bad design.

### 5.3 Expand Wearable Enchantments to 25

Non-combat enchantments live here. All item types can use this table instead of their own. Existing 20 entries occupy d100 01–80 (4% each). New entries 81–100:

| d100 | Name | Quality | Effect | Role | Mode |
|------|------|---------|--------|------|------|
| 81–84 | of Pathfinding | Q4/Q6 | +1/+2 boon on Navigator's roll during travel | Utility | Travel |
| 85–88 | of Trapfinding | Q4/Q6 | +1/+2 boon on Perception to detect traps/hidden features | Utility | Exploration |
| 89–92 | of Discernment | Q4/Q6 | +1/+2 boon on Insight to read NPC Motivations/Pitfalls during Social Intrigue | Support | Social |
| 93–96 | of the Healer | Q4/Q5/Q6 | When using healer's kit or Healing spell, restore +2/+4/+6 additional HP | Healing | Combat |
| 97–100 | of Darkvision | Q4/Q6 | See in darkness as dim light for medium/long range | Utility | Exploration |

> of Pathfinding stacks with Knowledgeable Wanderer (both grant navigation boons). of Trapfinding complements Dungeon Delver (enchantment finds traps, talent analyzes them). of Discernment grants boons on rolls, not auto-reveal. of the Healer is the first Healing-role enchantment.

### 5.4 Fill Weapon Gaps to 20

Weapon table stays combat-focused. 8 new entries covering missing elements and roles:

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 61–65 | Frosted | Q4/Q5/Q6 | Quick Action: frost for short duration. +2/4/6 frost ignoring AV. On strong/crit: target slowed briefly | Offense / Control |
| 66–70 | Shocking | Q4/Q5/Q6 | Quick Action: lightning for short duration. +2/4/6 lightning ignoring AV. On crit: arcs to one creature in melee range for half damage | Offense |
| 71–75 | Binding | Q5/Q6 | On strong/crit: target resists TN 10/12 or slowed; 1/2× per day | Control |
| 76–80 | Guardian's | Q4/Q5/Q6 | +1/+1/+2 Parry. 1×/day: redirect attack on adjacent ally to yourself | Defense / Support |
| 81–85 | Corrosive | Q4/Q5/Q6 | Quick Action: acid for short duration. +2/4/6 acid ignoring AV. On strong/crit: reduce target AV by 1 briefly | Offense |
| 86–90 | Silencing | Q5/Q6 | On crit: target resists TN 10/12 or silenced briefly; 1/2× per day | Control |
| 91–95 | Vigilant | Q4/Q5 | Cannot be surprised while holding. Q5: +1 boon on Initiative | Defense |
| 96–100 | Draining | Q5/Q6 | On hit: regain 2/4 HP. 1×/day | Healing |

> Binding and Silencing are Q5+ (control is inherently powerful). Guardian's synergizes with Protective Stance talent. Vigilant complements Danger Sense talent (different mechanics). Draining provides the first weapon Healing option.

### 5.5 Fix Ammo and Expand to 10

**Fixes:** Draining → Q4/Q5/Q6. Seeking → Q4/Q5/Q6.

**4 new entries:**

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 61–70 | Smoke | Q4/Q5/Q6 | On hit: smoke cloud in melee/close/short range, briefly duration. Creatures inside blinded | Utility |
| 71–80 | Frost | Q4/Q5/Q6 | On hit: 4/6/8 frost damage + slowed briefly | Offense / Control |
| 81–90 | Shocking | Q4/Q5/Q6 | On hit: 4/6/8 lightning. On strong/crit: arcs to adjacent creature for half | Offense |
| 91–100 | Marker | Q5/Q6 | On hit: target is branded with a glowing rune. Cannot benefit from concealment or darkness. All attacks against the marked target gain +1 boon briefly/short duration | Utility / Control |

> Smoke is now a scaled combat enchantment (no longer [minor]); cloud radius expands with quality. Marker replaces Signaling — a magical brand is more appropriate to the ancient world setting than modern signal flares, and is Q5+ to avoid worldbuilding implications of cheap magical communication projectiles at Q4.

### 5.6 Differentiate Scaling

| Enchantment | Current | Proposed | Rationale |
|-------------|---------|----------|-----------|
| Stalwart | Q4, 1/day | Q4/Q5/Q6, 1/2/3 per scene | Scales via frequency; 1/scene model |
| of Immunity | Q4, passive | **Q6 only, triggered 1×/day** | Undercuts talents; too powerful passive |
| of Pure Thought | Q4, passive | **Q5+, triggered or limited** | Undercuts Divine Sense R2, Strong Mind R2 |
| Draining (ammo) | Q5 only | Q4/Q5/Q6 | Should scale like other ammo |
| Seeking (ammo) | Q4/Q6 | Q4/Q5/Q6 | Fill Q5 gap |
| Glowing (catalyst) | Q4 only | Remove | Trivial; make baseline cosmetic |

### 5.7 Design Q7–Q8 Enchantments

**Principles:** Q7 = Q6 effect + triggered bonus. Q8 = signature capstone that defines the item. All triggered/limited, never passive scaling. Should feel like the item has a story.

**Scaling examples:**

| Enchantment | Q6 | Q7 | Q8 |
|-------------|-----|-----|-----|
| Flaming | 6 fire ignoring AV | +1×/day cone of flame (close, 12 fire vs. Dodge) | Permanent ignition + 1×/day flame burst (short range, 16 vs. Dodge) |
| Tough | Resistance 3×/day | +1×/day also gain +2 AV until end of next turn | +1×/scene immunity to all damage until end of next turn |
| Slaying | +6 vs. type | +1 boon vs. type | On crit, target resists TN 16 or suffers additional wound |

**Signature enchantments (Q7–Q8 only):**

| Name | Category | Quality | Effect | Role |
|------|----------|---------|--------|------|
| Sentient | Shield | Q7 | 1/scene: independently blocks one attack (adds full AV to Parry without Quick Action). 1/day: flies to intercept ranged attack on ally in close range | Defense |
| Avenger's | Weapon | Q7 | You + allies in close range gain +1 Resist. +4 radiant vs. undead/spirits. Requires Pact of Devotion. 1×/day: deal maximum damage vs. undead/spirit | Offense / Support |
| Living | Armor | Q8 | 1/scene: armor independently grapples one creature in melee. On critical hit: armor absorbs wound (loses 1 permanent Durability) | Defense |
| Phase | Wearable | Q7 | 1×/day: incorporeal for one turn. Move through objects, attacks against you have +1 bane. Cannot attack while phased | Defense / Utility |

### 5.8 Additional Enchantment Ideas

Focusing on underrepresented roles (Healing, Control) and game modes (Travel, Exploration):

#### Additional Wearable Enchantments (expansion candidates for future d100 growth)

| Name | Quality | Effect | Role | Mode |
|------|---------|--------|------|------|
| of Vigilance | Q4/Q6 | +1/+2 boon on Scout's Perception/Survival roll during travel | Utility | Travel |
| of Endurance | Q4/Q5/Q6 | Ignore 1/2/3 Fatigue per journey from travel sources | Support | Travel |
| of Provisioning | Q4 only `[minor]` | Supply Checks for rations during travel: roll twice, take better | Utility | Travel |
| of Waterbreathing | Q4 only `[minor]` | Breathe underwater; +1 boon on Athletics to swim | Utility | Exploration |
| of Featherfall | Q4 only `[minor]` | Reduce fall distance by one category; no damage from short falls | Defense | Exploration |
| of the Chameleon | Q4/Q6 | 1×/day: change appearance for medium duration. Q6: also alter voice, long duration | Utility | Social |
| of Authority | Q5/Q6 | During Social Intrigue, if NPC is Indifferent+, start with +1/+2 Interest; 1×/day | Support | Social |
| of Eloquence | Q5/Q6 | +1/+2 boon on Influence rolls during Social Intrigue | Support | Social |
| of Mending | Q4/Q5/Q6 | 1×/day: touch a creature to remove one of: poisoned, bleeding, burning. At Q5: also dazed, frightened. At Q6: also paralyzed, stunned | Healing | Combat |
| of Vitality | Q5/Q6 | When you take a short break, regain 2/4 additional HP | Healing | Combat |
| of Warding | Q4/Q5/Q6 | 1×/day: choose one ally in close range; they gain +1/+2/+3 Resist until end of scene | Support | Combat |
| of Calming | Q5/Q6 | 1×/day: end the frightened or confused condition on one creature in close range | Support | Combat |
| of Anchoring | Q4/Q5/Q6 | +1/+2/+3 on saves vs. forced movement, teleportation, and being displaced | Defense | Combat |

#### Additional Shield Enchantments (expansion candidates)

| Name | Quality | Effect | Role | Mode |
|------|---------|--------|------|------|
| Disrupting | Q5/Q6 | When you block a spell attack, the caster must resist TN 10/12 or lose concentration; 1/2× per day | Control | Combat |
| Sheltering | Q4/Q5/Q6 | While using Guard, allies behind you gain half your shield's AV | Support | Combat |

#### Additional Weapon Enchantments (expansion candidates)

| Name | Quality | Effect | Role | Mode |
|------|---------|--------|------|------|
| Disorienting | Q5/Q6 | On strong/crit: target suffers +1/+2 bane on next attack; 1/2× per day | Control | Combat |
| Pacifying | Q5/Q6 | On hit vs. a frightened or charmed target: end that condition on them; 1×/day | Control | Combat |

### 5.9 Magic Utility Item Tables

These tables cover slotless utility items generated from the random treasure system. Effects are too diverse for a generic enchantment framework — each entry is a curated named effect.

> **Note on temporary enchantments:** The alchemy system expansion (future analysis) should include temporary enchantments — potions, oils, and treatments that grant enchantment-like effects for limited durations. This provides consumable alternatives to permanent utility items.

#### Containers (d100, 10 entries)

| d100 | Name | Quality | Effect |
|------|------|---------|--------|
| 01–10 | Bag of Holding | Q4 | Interior is larger than exterior; holds up to 500 load but always weighs 1 load |
| 11–20 | Preserving Vessel | Q4 | Contents decay at half the normal rate. Rations and alchemical supplies stored inside last twice as long |
| 21–30 | Quenching Flask | Q4/Q5 | 1×/day: produces clean water (1 unit of supply). Q5: 2 units |
| 31–40 | Messenger Bottle | Q4 | Place a written message inside and speak a name; the bottle vanishes and reappears near the named person within 1 day. Returns empty. 1×/day |
| 41–50 | Censer of Warding | Q5 | Burn incense (1 supply); all creatures in close range gain +1 Resist for short duration |
| 51–60 | Bottomless Quiver | Q5 | When you make a Supply Check for basic (non-enchanted) ammo, roll twice and take the better result. Does not apply to enchanted ammo |
| 61–70 | Chest of Safekeeping | Q5 | Locked by a command word; resists all non-magical attempts to open. Contents are shielded from divination |
| 71–80 | Brazier of Warmth | Q4 | When lit, all creatures in close range are comfortable regardless of temperature. Counts as adequate shelter during travel |
| 81–90 | Decanting Vessel | Q5/Q6 | 1×/day: produce one dose of a basic alchemical substance (chosen on creation): antidote, healing salve, or lamp oil. Q6: choose each day |
| 91–100 | Amphora of Plenty | Q6 | 1×/day: produce enough food for 4 people (4 units of rations supply). Does not produce water |

#### Everyday Objects (d100, 10 entries)

| d100 | Name | Quality | Effect |
|------|------|---------|--------|
| 01–10 | Immovable Rod | Q5 | Activate: the rod fixes in place, bearing up to 500 load. Stays until deactivated |
| 11–20 | Lantern of Revealing | Q4/Q5 | Emits bright light (close range). Invisible creatures in the light become visible. Q5: extends to short range |
| 21–30 | Astral Disc | Q4 | A flat bronze disc etched with constellations. When held level and spoken to, accurately indicates cardinal directions and time of day. +1 boon on Navigator rolls during travel |
| 31–40 | Rope of Climbing | Q4 | On command, the rope (short range length) animates to tie itself, climb surfaces, or bridge gaps. +1 boon on Athletics to climb while using |
| 41–50 | Seer's Mirror | Q5 | 1×/day: gaze into the mirror and name a person known to you; glimpse a brief image of what they are currently doing (no sound, no communication) |
| 51–60 | Carpet of Flight | Q6 | Can carry up to 2 Medium creatures. Flies at normal Movement speed. Requires concentration (no other actions while piloting) |
| 61–70 | Arcane Key | Q4/Q5 | 1×/day: open one non-magical lock automatically. Q5: also magical locks, but roll Mind + Arcana vs. the lock's TN |
| 71–80 | Figurine of Summoning | Q5/Q6 | 1×/day: summon a Tier 1/2 beast companion (specific animal chosen on creation) for short duration |
| 81–90 | Rod of Mending | Q4 | 1×/day: repair one damaged non-magical item to functional condition. Does not restore magical properties or Durability |
| 91–100 | Hearthstone of Return | Q5 | Attune to a location by spending 1 hour there with a short ritual. 1×/day: teleport yourself to the attuned location (same region only, not across continents) |

#### Instruments (d100, 10 entries)

| d100 | Name | Quality | Effect |
|------|------|---------|--------|
| 01–10 | Horn of Warning | Q4 | Blow: all allies within long range cannot be surprised for short duration. Audible at very long range |
| 11–20 | Horn of Blasting | Q5 | Blow: all creatures in a cone (close range) take 6 blast damage (ignoring half AV) and are deafened briefly. Structures in range may crack. 1×/day |
| 21–30 | Drums of Marching | Q4 | During travel: allies in close range ignore 1 Fatigue per journey. Uses instrument Durability (check after each journey) |
| 31–40 | War Drum of Fury | Q5 | Beat as an Action: allies in close range gain +1 boon on their next attack this scene. 1×/scene |
| 41–50 | Chime of Opening | Q5 | 1×/day: open one locked door, chest, or container (non-magical) within close range |
| 51–60 | Sistrum of Warding | Q4 | Shake as Quick Action: undead and spirits in close range must resist (Spirit + Fortitude vs. TN 8) or become frightened briefly. 1×/scene |
| 61–70 | Flute of Calming | Q5 | 1×/day: play for one minute. All hostile creatures in close range must resist (Spirit + Fortitude vs. TN 10) or become non-aggressive for short duration. Ends if they take damage |
| 71–80 | Lyre of Distraction | Q4 | Play for one minute during Social Intrigue: one target NPC must resist (Mind + Fortitude vs. TN 8) or lose 1 Patience. 1×/intrigue |
| 81–90 | Pipes of Haunting | Q5/Q6 | Play in darkness or moonlight: all creatures in close range that can hear must resist (Spirit + Fortitude vs. TN 10/12) or become frightened for short/medium duration. 1×/scene |
| 91–100 | Bell of Communion | Q6 | 1×/day: ring during a ritual to contact one named spirit or ancestor. The GM provides one truthful answer to a yes/no question |

#### Body Parts & Natural Items (d100, 10 entries)

These items are **consumables** harvested from creatures and natural sources. Making them consumable (rather than permanent wearables) avoids conflict with wearable enchantments and creates a natural tie-in with the alchemy system and creature harvesting.

| d100 | Name | Quality | Type | Effect |
|------|------|---------|------|--------|
| 01–10 | Salve of Eagle's Vision | Q4 | Dose (apply) | Gain +1 boon on all Perception rolls and treat dim light as bright light for short duration |
| 11–20 | Dragon Scale Ash | Q5 | Dose (burn/inhale) | Gain resistance to one elemental damage type (fire, frost, or lightning) for short duration; specified by the dragon type it was harvested from |
| 21–30 | Beast Heart Extract | Q4 | Dose (drink) | Gain the keen senses of the harvested creature type; +1 boon on Perception and Survival for short duration |
| 31–40 | Serpent Fang Vial | Q4 | 3 doses (apply) | Apply to a weapon as Quick Action; the next hit inflicts the poisoned condition briefly |
| 41–50 | Feather Charm | Q5 | 1 use (crush) | Crush in hand when falling: take no damage from falls up to short range and treat longer falls as one category shorter |
| 51–60 | Carved Luck Bone | Q4 | 1 use (snap) | Snap before rolling any check: re-roll one failed roll and take the new result |
| 61–70 | Clarity Crystal Dust | Q5 | Dose (sniff) | End one of the following conditions on yourself: confused, dazed, or charmed |
| 71–80 | Amber Ward Charm | Q5 | 1 use (break) | Break when you would gain the poisoned condition or suffer a disease effect: negate that instance entirely |
| 81–90 | Moonstone Draught | Q4/Q6 | Dose (drink) | Must be consumed under open moonlight. Gain +1/+2 boon on all Spirit rolls for short duration |
| 91–100 | Heartwood Sap | Q6 | Dose (apply) | Apply to a creature at 0 HP: stabilize them automatically (no roll needed) and immediately remove the bleeding condition |

> **Quality tier guidance:** Most utility items are Q4–Q5 (accessible, useful). Items that provide powerful daily-use abilities (teleportation, summoning, flight) are Q5–Q6. Items could theoretically scale to Q7–Q8 with enhanced versions (Carpet of Flight Q7 = carry 6 creatures, no concentration required), but this should be handled in the separate named-items catalogue.

#### Bronze Age Style Notes

All utility items should evoke the ancient world aesthetic. Items replaced or renamed for period appropriateness:
- "Compass of True North" → **Astral Disc** — a magnetic compass is a medieval invention; an enchanted star-disc is suitably ancient
- "Mirror of Reflection" → **Seer's Mirror** — scrying mirrors are deeply ancient world (Egyptian, Roman oracle tradition)
- "Key of Opening" → **Arcane Key** — more evocative name
- "Token of Return" → **Hearthstone of Return** — carved ritual stone is more fitting than "token"

When designing new utility items, avoid: printed maps, mechanical clocks, glass lenses, gunpowder, printing presses, complex gears/machines. Favor: inscribed tablets, ritual vessels, carved bones/stones, woven cloth, bronze tools.

#### Worldbuilding Implications by Quality Tier

The distribution of magic items at different quality tiers implicitly defines the game world's level of magical development and its social structure.

| Quality | World Implication |
|---------|------------------|
| **Q3 (Masterwork)** | Accessible to skilled artisans in any major settlement. Non-magical but exceptional craft. Every town has a master craftsperson. |
| **Q4 (Formidable)** | Available in city-states and trade hubs. Requires a true enchanter — a specialist with Crafting rank 3–4 and Arcana/Mysticism. A few dozen such craftspeople per kingdom. Q4 items are valuable but not rare; wealthy merchants and successful soldiers might own one. |
| **Q5 (Exceptional)** | Rare. Found only in major cities, prestigious temples, or established arcane academies. Only a handful of Q5 enchanters exist per kingdom; they are known by name and sought after. Q5 items are status markers as much as tools. |
| **Q6 (Epic)** | Extremely rare. Legendary enchanters producing Q6 work are regional celebrities. Perhaps two or three active in an empire at any time. Q6 items are heirlooms, prizes, and plot hooks. |
| **Q7–Q8 (Legendary+)** | Effectively unique. Ancient relics, or the once-in-a-generation work of a master approaching the divine. Not produced in modern times without exceptional circumstances. Owning one is itself a statement of importance. |

**Design implications for enchantment availability:**
- **Communication magic at Q4** (Messenger Bottle) implies that wealthy merchants already have primitive magical postal systems — factor this into political intrigue design.
- **Navigation aids at Q4** (Astral Disc) are available to any expedition that can afford them, but don't eliminate navigation skill — they grant a boon, not auto-success.
- **Social enchantments at Q4** (of Discernment, Comprehension) would be common enough at the noble class level to assume that courts already include enchanted interrogation aids — factor this into spy/intrigue scenarios.
- **High-level utility** (Hearthstone of Return, Carpet of Flight at Q5–Q6) should feel like exceptional resources that reshape a campaign's possibilities, not routine adventuring gear.

---

## 6. Draft Examples

### 6.1 Shield — Covering (Q4/Q5/Q6)

> This shield radiates a faint protective aura. As a **Quick Action**, extend your shield's AV to one ally in **melee range** until the start of your next turn. 1/2/3× per day.
>
> **Role:** Support. **Mode:** Combat.
> **Talent synergy:** Complements Protective Stance — talent improves Protect Ally efficiency; enchantment extends shield AV passively.

### 6.2 Wearable — of Pathfinding (Q4/Q6)

> These boots find the surest path. While serving as Navigator during travel, gain +1/+2 boon on the Navigator's roll.
>
> **Role:** Utility. **Mode:** Travel.
> **Anti-trivialization:** Boons, not auto-success. Navigator still rolls. Supply management intact.
> **Talent synergy:** Stacks with Knowledgeable Wanderer (+1 boon + blunder protection).

### 6.3 Wearable — of Trapfinding (Q4/Q6)

> This item thrums near danger. +1/+2 boon on Perception to detect traps and hidden features during exploration.
>
> **Role:** Utility. **Mode:** Exploration.
> **GM-ease:** Boons on player-initiated rolls. Does not auto-detect or require GM to reveal information.
> **Talent synergy:** Enchantment finds traps; Dungeon Delver talent analyzes/disables them.

### 6.4 Wearable — of Discernment (Q4/Q6)

> This circlet sharpens the wearer's ability to read others. +1/+2 boon on Insight to discover NPC Motivations or detect Pitfalls during Social Intrigue.
>
> **Role:** Support. **Mode:** Social Intrigue.
> **Anti-trivialization:** Boons on rolls, not auto-reveal. Interest/Patience economy intact.

### 6.5 Weapon — Frosted (Q4/Q5/Q6)

> Quick Action: intensify frost for **short duration**. +2/4/6 frost damage ignoring AV. On strong/crit: target **slowed** briefly.
>
> **Role:** Offense / Control. **Mode:** Combat.
> **Talent synergy:** Slowed complements Polearm Mastery (reduced Movement on slowed targets).

### 6.6 Shield — Shielding (Q6 only)

> A rune blazes when danger is near. **Triggered:** gain immunity to one damage type (chosen on creation) until end of next turn. 1×/day.
>
> **Role:** Defense. **Mode:** Combat.
> *Demonstrates scaling philosophy: immunity is Q6-only, triggered, 1×/day — never passive.*

### 6.7 Shield — Sentient (Q7)

> The shield has limited awareness. **1/scene:** independently blocks one attack (adds full AV to Parry without Quick Action). **1/day:** flies to intercept one ranged attack on ally in close range.
>
> **Role:** Defense. **Mode:** Combat.
> *Q7-only: "sentient item" is inherently legendary. The shield has its own limited agency.*

---

## Appendix A: Enchantment Count Summary

| Category | Current | Proposed | d100 |
|----------|---------|----------|------|
| Ammo | 6 | 10 | 10% each |
| Weapon | 12 | 20 | 5% each |
| Spell Catalyst | 6 | 0 (removed) | — |
| Armor | 6 (shared) | 10 | 10% each |
| Shield | 0 (shared) | 10 | 10% each |
| Wearable | 20 | 25 | 4% each |
| **Total** | **50** | **75** | — |

## Appendix B: Role Coverage Matrices

### Current

| Role | Ammo | Weapon | Catalyst | Armor/Shield | Wearable | Total |
|------|------|--------|----------|-------------|----------|-------|
| Offense | 3 | 8 | 1 | 1 | 1 | 14 |
| Defense | 0 | 0 | 1 | 5 | 9 | 15 |
| Healing | 0 | 0 | 0 | 0 | 0 | **0** |
| Control | 2 | 0 | 0 | 0 | 0 | **2** |
| Support | 1 | 1 | 3 | 0 | 7 | 12 |
| Utility | 0 | 3 | 1 | 1 | 3 | 8 |

### Proposed (after all recommendations)

| Role | Ammo | Weapon | Armor | Shield | Wearable | Total |
|------|------|--------|-------|--------|----------|-------|
| Offense | 4 | 9 | 0 | 2 | 1 | 16 |
| Defense | 0 | 2 | 6 | 6 | 9 | 23 |
| Healing | 0 | 1 | 0 | 0 | 2 | **3** |
| Control | 2 | 3 | 0 | 1 | 0 | **6** |
| Support | 1 | 1 | 0 | 3 | 10 | 15 |
| Utility | 2 | 3 | 3 | 0 | 7 | 15 |

> Healing: 0 → 3. Control: 2 → 6. Both underrepresented roles significantly improved.

## Appendix C: Game Mode Coverage Matrices

### Current

| Mode | Ammo | Weapon | Catalyst | Armor/Shield | Wearable | Total |
|------|------|--------|----------|-------------|----------|-------|
| Combat | 6 | 12 | 6 | 6 | 17 | 47 |
| Travel | 0 | 0 | 0 | 1 | 0 | **1** |
| Exploration | 0 | 0 | 0 | 0 | 0 | **0** |
| Social | 0 | 0 | 0 | 0 | 1 | **1** |

### Proposed

| Mode | Ammo | Weapon | Armor | Shield | Wearable | Total |
|------|------|--------|-------|--------|----------|-------|
| Combat | 8 | 20 | 8 | 10 | 20 | 66 |
| Travel | 0 | 0 | 2 | 0 | 3 | **5** |
| Exploration | 0 | 0 | 0 | 0 | 3 | **3** |
| Social | 0 | 0 | 0 | 0 | 2 | **2** |

> Travel: 1 → 5. Exploration: 0 → 3. Social: 1 → 2. Significant improvement with room for growth via the additional wearable candidates in Section 5.8.

## Appendix D: Limited Resource Model Comparison

| Model | Strengths | Weaknesses | Best For |
|-------|-----------|------------|----------|
| **1/scene** | Simple tracking; resets per encounter; prevents hoarding; reliable | Ambiguous in non-combat ("what is a scene in travel?"); can be generous if scenes are frequent | Defensive reactions, condition removal, per-encounter abilities |
| **X/day** | Meaningful resource management; strategic decisions; scales with Quality; clear in all contexts | Tracking burden; encourages hoarding; "5-minute day" risk | Powerful offense, Focus/HP recovery, travel/exploration, healing |
| **1/scene/target** | Prevents stacking on single enemy; encourages variety | Complex tracking; weaker in single-boss fights | Debuffs (stun, bleed) where per-target stacking is the concern |

**Guidance:**
- Defensive reactions → 1/scene
- Powerful offense → X/day
- Focus/HP recovery → 1/day (always)
- Travel/exploration → 1/day or 1/journey
- Social intrigue → 1/intrigue
- Condition immunity → 1/day at Q6+
- Condition removal → 1/scene

## Appendix E: Talent Synergy Summary

### Synergies to Preserve

| Enchantment | Talent | Relationship |
|-------------|--------|-------------|
| Elemental weapons | Spellblade / Mystic Champion | Different action economies |
| of Attunement | Inexhaustible Mind | More Focus benefits recovery |
| Infused | Spellweaver (metamagic) | Recovery enables metamagic |
| Blocking (shield) | Shield Mastery | Enchantment enhances talent |
| Guardian's (weapon) | Protective Stance | Redirect + improved Protect Ally |
| of Pathfinding | Knowledgeable Wanderer | Stacking navigation boons |
| of Trapfinding | Dungeon Delver | Find vs. analyze/disable |

### Anti-Synergies to Fix

| Enchantment | Talent | Fix |
|-------------|--------|-----|
| of Immunity (Q4 passive) | Body of Bronze R2, Strong Mind R2 | → Q6 triggered 1×/day |
| of Pure Thought (Q4 passive) | Divine Sense R2, Strong Mind R2 | → Q5+ triggered/limited |

## Appendix F: Utility Item Category Summary

| Category | Source Count | d100 Entries | Quality Range | Notes |
|----------|-------------|-------------|---------------|-------|
| Containers | d12 sub-table | 10 | Q4–Q6 | Storage, preservation, production |
| Everyday Objects | d20 sub-table | 10 | Q4–Q6 | Tools, transportation, utility |
| Instruments | d6 sub-table | 5 | Q4–Q6 | Sound-based effects, bard integration |
| Body Parts / Natural | d12 + d8 sub-tables | 10 | Q4–Q6 | Creature-themed, harvesting tie-in |

> **Deferred:** Full named-items catalogue — separate design document.
> **Deferred:** Temporary enchantments / alchemy expansion — separate analysis.

---

## Summary of Recommendations

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| 1 | Split armor/shield into d100 tables (10 each) | Resolves classification, distinct identities | Medium |
| 2 | Remove catalyst table entirely | Eliminates redundancy and stacking problem | Low |
| 3 | Expand wearable to 25 (non-combat modes, healing) | Fills Travel/Exploration/Social gaps | Medium |
| 4 | Fill weapon to 20 (frost, lightning, acid, control, defense, healing) | Covers missing elements and roles | Medium |
| 5 | Fix ammo to 10 (Draining/Seeking gaps, utility) | Consistency + utility ammo | Low |
| 6 | Differentiate scaling (Q4-only minor, Q6+ triggered immunity) | Prevents power creep, fixes talent conflicts | Low |
| 7 | Minor Enchantment rule with `[minor]` keyword | Solves QoL tack-on problem cleanly | Low |
| 8 | Q7–Q8 signature enchantments | Enables legendary items with real identity | Medium |
| 9 | Utility item d100 tables by category | Framework for slotless magic items | Medium |
| 10 | Review limited resource models (Stalwart/Anchoring → 1/scene) | Correct resource models for defensive reactions | Low |

> **Deferred:** Material properties — separate analysis.
> **Deferred:** Named wand/staff catalogue — separate document.
> **Deferred:** Utility items full catalogue — separate document.
> **Deferred:** Temporary enchantments / alchemy — separate analysis.
