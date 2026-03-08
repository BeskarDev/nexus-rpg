# Alchemy & Potion Crafting — Design Analysis

> **Scope:** Alchemical crafting as a downtime activity — procedures, ingredient systems, product categories, and integration with the challenge dice framework, magic item creation, and enchantment systems.
>
> **References:** [Craft an Item](../06-scenes/04-downtime/activities.md) | [Challenges](../06-scenes/07-challenges.md) | [Downtime Overview](../06-scenes/04-downtime/00-overview.md) | [Downtime Activities](../06-scenes/04-downtime/activities.md) | [Crafting Professions](../06-scenes/05-crafting-professions.md) | [Magic Item Effects](../04-equipment/07-magic-items/effects.md) | [Enchantments](../04-equipment/07-magic-items/enchantments.md) | [Cost Tables](../04-equipment/07-magic-items/cost-tables.md)
>
> **Related Analyses:** [Downtime System Analysis](./downtime-system-analysis.md) | [Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md) | [Materials Mechanical Effects Analysis](./materials-mechanical-effects-analysis.md)

---

## 1. Executive Summary

### Key Findings

1. **Challenge dice unify crafting progress.** Alchemical crafting uses the same challenge die framework as all other multi-step downtime activities (see [Downtime System Analysis §3.3](./downtime-system-analysis.md)). "Required Successes" become a challenge die placed on the table — visible, shared progress tracking.
2. **Alchemy is a Crafting profession, not a parallel system.** All alchemical crafting follows the standard Craft an Item activity with alchemy-specific ingredients, consequences, and product types. No separate subsystem required.
3. **Consequences replace the old mishap table.** Failures and blunders during alchemical crafting trigger consequences aligned with the Complication table ([Downtime System Analysis §3.2](./downtime-system-analysis.md)) plus alchemy-specific results (toxic fumes, explosions, contamination).
4. **Alchemical products feed into magic item creation.** Potions, oils, and coatings are standalone consumables. Alchemical reagents also serve as **material prerequisites** for enchanting magic items — bridging alchemy and the enchantment system ([Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md)).
5. **Ingredient acquisition is streamlined.** Gathering uses a single downtime activity (Gather Ingredients) with a standard difficulty/yield table. Creature harvesting and market purchase remain available sources.
6. **Lingering Fatigue applies.** Fatigue from alchemy consequences is **Lingering Fatigue** — it does not heal through normal nightly rest (see [Downtime System Analysis §3.6](./downtime-system-analysis.md)).

### Design Principles

1. **Unified terminology** — Use challenge dice, consequences, Lingering Fatigue, and other terms consistently with the broader downtime and challenge systems.
2. **Fiction-first products** — Alchemical items should feel tangible: potions bubble, poisons reek, bombs crackle. Mechanical effects are clear, but flavor comes first.
3. **Bounded power** — Alchemical products provide temporary, consumable advantages. They complement magic items and talents, never replace them.
4. **Crafting rank gates power** — Higher-Quality products require higher Crafting ranks, matching the standard Craft an Item table. No shortcuts.
5. **Integration over isolation** — Alchemy connects to magic items (reagents as materials), enchantments (alchemical prerequisites), and downtime (gathering, crafting, selling).

---

## 2. Compatibility Analysis

### What Works

| System | Status | Notes |
|--------|--------|-------|
| **Craft an Item** | ✅ | Alchemy uses the same activity, profession requirement, weekly expenses, and success-tracking structure. |
| **Crafting Professions** | ✅ | "Alchemist" is an established crafting profession. Skill test = Mind + Crafting. |
| **Quality Tiers** | ✅ | Alchemical products follow Q1–Q7 with the same Crafting rank requirements and difficulty TNs. |
| **Consumable Pricing** | ✅ | Existing consumable items (healing potions, bombs, poisons) have established costs that align with the ingredient system. |

### Gaps Addressed

| System | Status | Gap | Addressed In |
|--------|--------|-----|-------------|
| **Challenge Dice** | ⚠️ | Old alchemy document used "track successes" rather than challenge die terminology. | §3.1 |
| **Consequences** | ⚠️ | Old mishap table was alchemy-specific and disconnected from the Complication table. | §3.2 |
| **Magic Item Integration** | ❌ | No procedure for how alchemical products connect to enchantment creation or magic item crafting. | §5 |
| **Lingering Fatigue** | ❌ | Old document referenced generic "Fatigue" without the Lingering Fatigue rule. | §3.2 |
| **Gathering Activity** | ⚠️ | Gathering existed but used an isolated complication table. Aligned with the standard Complication table. | §4 |

---

## 3. Alchemical Crafting Procedure

Alchemical crafting uses the standard **Craft an Item** downtime activity with the **Alchemist** profession. The procedure below incorporates challenge dice and the consequence framework from the [Downtime System Analysis](./downtime-system-analysis.md).

### 3.1 Step-by-Step Procedure

#### Step 1: Choose Product and Quality

Select what you want to create and its Quality tier. This determines the challenge die size, crafting difficulty, and material costs.

| Quality | Crafting Rank | Challenge Die | Crafting TN | Weekly Expenses |
|---------|---------------|---------------|-------------|-----------------|
| Q1 | 0 | d4 (starts at 1) | Easy (6) | 10 coins/week |
| Q2 | 0 | d4 (starts at 2) | Easy (6) | 20 coins/week |
| Q3 | 1 | d6 (starts at 4) | Medium (8) | 50 coins/week |
| Q4 | 2 | d6 (starts at 6) | Hard (10) | 200 coins/week |
| Q5 | 3 | d8 (starts at 8) | Very Hard (12) | 1,000 coins/week |
| Q6 | 4 | d10 (starts at 10) | Extreme (14) | 5,000 coins/week |
| Q7 | 5 | d12 (starts at 12) | Legendary (16) | 25,000 coins/week |

> **Challenge Die:** Place the appropriate die on the table showing its starting value. This is your visible progress tracker — identical to challenge dice used in other activities and scenes (see [Challenges](../06-scenes/07-challenges.md)).

#### Step 2: Gather Materials

You need ingredients totaling **½ the product's final cost**. Sources:

- **Purchase** at a settlement market (availability capped by settlement rank).
- **Gather Ingredients** downtime activity (see §4).
- **Creature Harvesting** — harvested creature parts count as alchemical ingredients at the creature's tier Quality.
- **Quest Rewards** — Q5+ materials are rarely available for purchase and must be quested for or harvested.

**Ingredient Tags:**

| Tag | Role | Examples |
|-----|------|---------|
| **Essence** | Core effect — defines what the product does | Healing herbs, fire salts, monster venom, sleep pollen |
| **Catalyst** | Activates or amplifies the essence | Pure water, volatile spirits, elemental dust |
| **Binder** | Extends duration or stabilizes the mixture | Tree resin, mineral powder, animal fat |

**Minimum Recipe:** 1 Essence + 1 Catalyst. Add Binders for extended duration, additional Essences for combined effects.

#### Step 3: Pay Expenses and Roll

Pay weekly expenses (see table above) and roll **Mind + Crafting** vs. the product's Crafting TN.

| Result | Challenge Die Reduction |
|--------|------------------------|
| **Blunder** | No reduction. Trigger an **Alchemy Consequence** (see §3.2). |
| **Failure** | No reduction. Optionally reduce by 1 by **doubling** weekly expenses for this week. |
| **Weak Success** | Reduce challenge die by 1. |
| **Strong Success** | Reduce challenge die by 2. |
| **Critical Success** | Reduce challenge die by 3. |

#### Step 4: Track Progress

When the challenge die reaches **0**, the product is complete. Pay the material cost and receive the finished item.

If the challenge die has not reached 0, you may continue crafting in a subsequent downtime week (paying weekly expenses again). Record the current challenge die value between sessions.

**Batch Crafting:** If a single roll produces enough reduction to complete multiple identical products (e.g., rolling a critical on a Q1 item), you may create up to your Crafting rank identical items. Pay full material cost for each additional item.

> **Example — Brewing a Healing Potion (Q3):**
> Alara (Crafting 2, Mind d8) decides to brew a healing potion. She places a d6 showing 4 on the table (Q3 challenge die). She has healing herbs (Essence) and pure water (Catalyst) totaling 62 coins in materials. She pays 50 coins weekly expenses and rolls Mind + Crafting vs. TN 8.
>
> *Week 1:* She rolls a strong success — the die drops from 4 to 2. Good progress.
>
> *Week 2:* She rolls a weak success — the die drops from 2 to 1. Almost there.
>
> *Week 3:* She rolls a weak success — the die reaches 0. She pays 62 coins for materials and receives the finished healing potion. Total time: 3 weeks, 150 coins expenses + 62 coins materials.

### 3.2 Alchemy Consequences

On a **blunder** during alchemical crafting, roll on the **Alchemy Consequence Table** below. These replace the generic Complication table for alchemy-specific results, reflecting the volatile nature of alchemical work.

**Alchemy Consequence Table (d6)**

| d6 | Consequence |
|----|-------------|
| 1 | **Toxic Fumes.** Noxious vapors fill your workspace. Gain 1 **Lingering Fatigue**. |
| 2 | **Explosion.** Your mixture detonates. Suffer 2d6 blast damage. Your workspace is unusable for 1d4 days (costs an additional 50 coins to repair). |
| 3 | **Contamination.** The batch is ruined. Lose half your invested ingredient value (rounded up). |
| 4 | **Unstable Result.** The product appears finished but is flawed. It functions normally but has one unpredictable side effect determined by the GM (e.g., changes the user's skin color, emits a foul odor, causes brief nausea after use). |
| 5 | **Setback.** The reaction stalls. Increase the challenge die by 1 (up to its starting value). |
| 6 | **Severe Burn.** Suffer 1 Wound. You cannot continue any crafting activity until the Wound is healed. |

On a **failure** (not a blunder), there is no additional consequence beyond the lack of progress — unless the alchemist chooses to force progress by doubling weekly expenses (see Step 3).

> **Lingering Fatigue Note:** Fatigue gained from alchemy consequences is Lingering Fatigue. It is not removed by normal nightly rest. It can be removed by the Recover activity, the Leisure activity, or the Provide Offering activity (see [Downtime System Analysis §3.6](./downtime-system-analysis.md)).

### 3.3 Experimentation

An alchemist can attempt to create a product from an **untested recipe** — combining ingredients without a known formula.

- The alchemist describes the intended effect and the GM assigns an appropriate Quality tier.
- All crafting rolls for the experimental product suffer **+1 bane**.
- On a **blunder**, roll twice on the Alchemy Consequence Table and apply both results.
- If the product is completed successfully, the alchemist **learns the recipe** and can craft it again without the experimentation penalty.

### 3.4 Talent Synergies

Existing Crafting talents apply to alchemical crafting:

| Talent | Alchemy Application |
|--------|-------------------|
| **Artisan R1** | Re-roll one crafting test per scene (applies to alchemy rolls). |
| **Artisan R2** | When reducing the challenge die by 1+, reduce it by an additional 1. |
| **Artisan R3** | When reducing the challenge die by 1+, reduce it by an additional 2. |
| **Efficient Worker R1** | When rolling a Supply check for materials, roll twice and take the higher result. |
| **Efficient Worker R2** | When you finish crafting an alchemical item, regain 1/10 of the item's cost in coins. |
| **Efficient Worker R3** | Every crafting roll reduces the challenge die by at least 1 (even on failure). |

---

## 4. Gathering Ingredients

Gathering alchemical ingredients is a downtime activity. Roll **Mind/Spirit + Nature** or **Agility/Spirit + Survival** (player's choice based on approach: foraging knowledge vs. wilderness scouting).

### Gather Ingredients Activity

| Min. Settlement Rank | Requirements | Expenses |
|----------------------|-------------|---------|
| 1 (Hamlet) | Nature or Survival skill | 0 coins/week |

Choose a target ingredient Quality. The TN matches the standard Crafting difficulty for that Quality:

| Quality | Gathering TN | Yield on Success |
|---------|-------------|-----------------|
| Q1 | Easy (6) | 1d6 ingredients |
| Q2 | Easy (6) | 1d4 ingredients |
| Q3 | Medium (8) | 1d3 ingredients |
| Q4 | Hard (10) | 1d2 ingredients |
| Q5 | Very Hard (12) | 1 ingredient |
| Q6 | Extreme (14) | 1 ingredient |
| Q7 | Legendary (16) | 1 ingredient |

**Blunder.** No yield. Roll on the Complication table ([Downtime System Analysis §3.2](./downtime-system-analysis.md)) with the following alchemy-flavored substitutions:

| d6 | Gathering Complication |
|----|----------------------|
| 1 | **Poisonous Contact.** Save Spirit + Fortitude vs. TN 10 or gain **poisoned** (short duration). Gain 1 Lingering Fatigue on failure. |
| 2 | **Hostile Creature.** You stumble into a creature's territory. The GM introduces a brief combat encounter or a tense escape. |
| 3 | **Spoiled Yield.** Your collected ingredients are contaminated by weather or parasites. Lose any ingredients gathered this week. |
| 4 | **Unwanted Attention.** A rival herbalist, local authority, or territorial faction notices your foraging. The GM introduces a minor complication. |
| 5 | **Lost Time.** You cannot use this activity again next week. |
| 6 | **Nothing Extra.** The blunder is bad enough on its own. |

**Failure.** No yield. No additional consequence.

**Weak Success.** Yield as listed in the table above.

**Strong Success.** Yield as listed, plus one additional ingredient of one Quality tier lower (minimum Q1).

**Critical Success.** Double the listed yield.

### Other Acquisition Methods

- **Market Purchase:** Settlements stock ingredients up to settlement rank + 1 in Quality (Hamlet = Q2, Village = Q3, Town = Q4, City = Q5). Costs follow the Ingredient Cost table in §6.1.
- **Creature Harvesting:** Use the Harvesting Creature Parts rules. Harvested parts count as alchemical ingredients at the creature's tier Quality. A creature harvested for alchemical purposes yields 1d4 ingredient units per successful harvest.
- **Quest Rewards:** Q5+ ingredients are rare treasures. They are seldom available for purchase and typically must be obtained through adventuring, trade with specialists, or faction connections.

---

## 5. Integration with Magic Items & Enchantments

This section describes how the alchemy system connects to the magic item and enchantment systems. See the [Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md) for the full enchantment framework.

### 5.1 Alchemical Reagents as Enchantment Materials

When crafting a magic item via the Craft an Item activity, higher-Quality items require magical ingredients as part of their material cost. **Alchemical reagents satisfy this requirement.** An alchemist who can produce or source the correct reagents provides a direct material pipeline for magic item creation.

| Magic Item Quality | Reagent Role | Example |
|-------------------|-------------|---------|
| Q3 (Masterwork) | No reagent needed — mundane materials only. | Fine steel, seasoned wood. |
| Q4 (Lesser Magic) | Alchemical reagent as activating agent. | Elemental salts to awaken a weapon's enchantment. |
| Q5 (Potent Magic) | Rare reagent as magical binding agent. | Phoenix ash to stabilize a Flaming enchantment. |
| Q6 (Greater Magic) | Exotic reagent as core magical component. | Elder dragon bile to fuel a Q6 Slaying weapon. |
| Q7+ (Legendary) | Legendary reagent as essential catalyst. | Cosmic essence, divine ichor — quest-only materials. |

> **Design Note:** This creates a natural workflow: an adventuring party's alchemist gathers and refines reagents during downtime, which then feed into the party smith's or enchanter's magic item projects. Neither role is strictly required — you can always purchase materials — but the synergy rewards investment in both crafting professions.

### 5.2 Alchemical Products as Temporary Enchantments

Some alchemical products function as **temporary enchantments** — short-duration enhancements applied to weapons, armor, or the user's body. These explicitly do not stack with permanent enchantments of the same type (following the standard stacking rule: only the highest bonus of a given type applies).

| Product Type | Enchantment Parallel | Stacking Rule |
|-------------|---------------------|---------------|
| **Weapon Coating (fire)** | Functions like Flaming weapon (temporary) | Does not stack with a permanent Flaming enchantment. The higher bonus applies. |
| **Armor Oil (resistance)** | Functions like Tough armor (temporary) | Does not stack with a permanent Tough enchantment. The higher bonus applies. |
| **Attribute Potion** | Functions like a wearable "of Might/Swiftness" (temporary) | Does not stack with a permanent attribute enchantment. The higher bonus applies. |
| **Enhancement Paste** | Grants a temporary weapon property | Does not stack with the same permanent property. |

> **Design Note:** Temporary alchemical effects let characters without magic items access enchantment-like benefits for a scene or encounter, and let characters with magic items gain different (non-overlapping) temporary benefits. This preserves the value of permanent enchantments while giving alchemy a clear combat niche. The [Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md) deferred "Temporary enchantments / alchemy" to this document — the above framework fulfills that deferral.

### 5.3 Alchemical Augmentation of Enchantment Crafting

When crafting a magic item that includes an enchantment, an alchemist can contribute by preparing specialized reagents during the enchanting process. This is a **support role**, not a replacement for the smith or enchanter:

- **Alchemical Preparation (optional step):** Before or during a magic item's crafting, an alchemist can spend one downtime week preparing reagents specifically for that item. Roll Mind + Crafting vs. the item's Crafting TN.
  - **Success:** The crafter working on the magic item gains **+1 boon** on their next crafting roll for that item.
  - **Failure:** No benefit, but no additional cost beyond the week's expenses.
  - **Blunder:** Roll on the Alchemy Consequence Table (§3.2). The reagents are wasted.

This models the collaborative nature of high-Quality item creation without bypassing the challenge die progress system.

---

## 6. Product Categories

Alchemical products fall into five categories. Each includes a design guideline for effects by Quality tier.

### 6.1 Ingredient Cost Reference

| Quality | Ingredient Cost | Example Sources |
|---------|----------------|----------------|
| Q1 | 1–5 coins | Common herbs, ash, basic minerals |
| Q2 | 5–25 coins | Medicinal plants, copper dust, charcoal, animal parts |
| Q3 | 40–100 coins | Rare flowers, monster blood, elemental salts |
| Q4 | 200–400 coins | Dragon bile, troll blood, giant organs |
| Q5 | 800–1,500 coins | Phoenix ash, unicorn horn, celestial minerals |
| Q6 | 4,000–8,000 coins | Elder dragon parts, divine ichor |
| Q7 | 15,000+ coins | Legendary materials, cosmic essences |

### 6.2 Healing Products

Restore HP, cure conditions, or aid recovery.

| Quality | Example Product | Effect |
|---------|----------------|--------|
| Q1 | Healing Salve (weak) | Apply to Wound, +1 boon on healing roll |
| Q2 | Healing Salve (simple) | Apply to Wound, +2 boons on healing roll |
| Q2 | Antitoxin | Drink as Action — automatic success on next poison save |
| Q3 | Healing Potion (weak) | Drink as Action — regain 8 HP |
| Q3 | Healing Salve (potent) | Apply to Wound — auto-heal Wound on next rest |
| Q4 | Healing Potion (decent) | Drink as Action — regain 16 HP |
| Q5 | Healing Potion (strong) | Drink as Action — regain 24 HP |
| Q5 | Curative Elixir | Drink as Action — cure one non-magical disease or remove one poison |
| Q6 | Restorative Draught | Drink as Action — regain 32 HP and remove one condition (GM's choice of eligible conditions) |

### 6.3 Poisons

Poisons use Poison-tagged Essences and a specific delivery type.

**Delivery Types:**

| Type | Application | Save | Onset |
|------|------------|------|-------|
| **Contact** | Coat surface (Action) | Spirit + Fortitude | Immediate |
| **Ingested** | Mix in food/drink | Strength + Fortitude | 1d10 minutes |
| **Inhaled** | Release gas (close area) | Spirit + Fortitude | Immediate |
| **Injury** | Coat weapon (Quick Action) | Strength + Fortitude | On hit |

**Effects by Quality:**

| Quality | Save TN | Damage | Condition | Duration |
|---------|---------|--------|-----------|----------|
| Q1 | 6 | +2 poison | **poisoned** | Briefly |
| Q2 | 8 | +4 poison | **poisoned** | Briefly |
| Q3 | 10 | +4 poison | **poisoned** + **staggered** | Short |
| Q4 | 12 | +6 poison | **poisoned** + **staggered** | Short |
| Q5 | 14 | +6 poison | **stunned** or **paralyzed** | Medium |
| Q6 | 16 | +8 poison | **stunned** or **paralyzed** | Medium |
| Q7 | 18 | +10 poison | **unconscious** | Long |

**Ending Effects:** Target saves at turn end. Ally can treat with Action + Spirit/Mind + Nature vs. poison TN.

**Stacking:** Same poison doesn't stack. Different poisons track separately.

### 6.4 Bombs and Offensive Consumables

Thrown or deployed items dealing area damage or inflicting conditions.

| Quality | Example Product | Effect |
|---------|----------------|--------|
| Q2 | Smoke Bomb | Throw (close range) — creates obscured area for short duration |
| Q3 | Fire Bomb | Throw (short range) — +3 fire damage to all in melee of target |
| Q3 | Acid Flask | Throw (short range) — +3 acid damage, target's AV reduced by 1 for short duration |
| Q4 | Frost Bomb | Throw (short range) — +4 frost damage to all in melee of target, targets are **slowed** (briefly) |
| Q4 | Thunderstone | Throw (short range) — +4 blast damage, targets save Spirit + Fortitude vs. TN 10 or **deafened** (short) |
| Q5 | Alchemist's Fire | Throw (medium range) — +6 fire damage to all in close range of target, targets are **burning** (short) |

### 6.5 Enhancement Consumables

Temporary buffs applied to weapons, armor, or the user's body.

| Quality | Example Product | Effect |
|---------|----------------|--------|
| Q2 | Weapon Poison (weak) | Coat weapon — +2 poison damage on next hit |
| Q3 | Weapon Poison (decent) | Coat weapon — +4 poison damage on next hit |
| Q3 | Heightening Potion | Drink — +1 Movement, +1 boon on attacks (short duration) |
| Q4 | Weapon Poison (strong) | Coat weapon — +6 poison damage on next hit |
| Q4 | Potion of Strength | Drink — increase STR by one die size (max d10) for medium duration |
| Q4 | Armor Oil | Apply to armor — gain resistance to one damage type (short duration, 1 use) |
| Q5 | Invisibility Potion | Drink — become invisible (short duration). Ends if you attack or cast a spell. |
| Q5 | Potion of Giant's Might | Drink — increase STR by one die size (max d12) and grow to Large size for short duration |
| Q6 | Elixir of Elemental Form | Drink — gain resistance to one element, +2 weapon damage of that element, immunity to related conditions (medium duration) |

### 6.6 Utility Consumables

Non-combat products for exploration, travel, and social situations.

| Quality | Example Product | Effect |
|---------|----------------|--------|
| Q2 | Glowvial | Shake to produce bright light in close range for medium duration |
| Q2 | Tanglefoot Bag | Throw (close range) — area becomes difficult terrain (short duration) |
| Q3 | Darkvision Elixir | Drink — gain darkvision for medium duration |
| Q3 | Waterbreathing Potion | Drink — breathe underwater for medium duration |
| Q4 | Spider Climb Oil | Apply to hands/feet — climb any surface for short duration |
| Q4 | Scent Mask | Apply — you emit no scent for medium duration (+2 boons on Stealth vs. creatures with keen smell) |
| Q5 | Gaseous Form Potion | Drink — become a cloud of vapor for short duration. Can pass through small gaps. Cannot attack or cast spells. |
| Q5 | Potion of Tongues | Drink — understand and speak all languages for medium duration |

---

## 7. Quick Reference: Player Summary

### Alchemical Crafting at a Glance

1. **Choose** product and Quality tier → determines challenge die, TN, and costs.
2. **Acquire** ingredients (purchase, gather, or harvest) totaling ½ the product's cost.
3. **Pay** weekly expenses and **roll** Mind + Crafting vs. Crafting TN.
4. **Reduce** the challenge die: weak = −1, strong = −2, critical = −3.
5. **On blunder:** Roll on Alchemy Consequence Table (d6). No progress.
6. **On failure:** No progress (optionally force −1 by doubling expenses).
7. **Repeat** each downtime week until the challenge die reaches 0.
8. **Pay** material cost → receive finished product.

### Quick Crafting Reference Table

| Quality | Challenge Die | TN | Material Cost | Weekly Expenses | Weeks (avg) |
|---------|--------------|-----|--------------|-----------------|-------------|
| Q1 | 1 | 6 | ½ item cost | 10 | 1 |
| Q2 | 2 | 6 | ½ item cost | 20 | 1–2 |
| Q3 | 4 | 8 | ½ item cost | 50 | 2–4 |
| Q4 | 6 | 10 | ½ item cost | 200 | 3–6 |
| Q5 | 8 | 12 | ½ item cost | 1,000 | 4–8 |
| Q6 | 10 | 14 | ½ item cost | 5,000 | 5–10 |
| Q7 | 12 | 16 | ½ item cost | 25,000 | 6–12 |

> **Average weeks** assumes a mix of weak and strong successes. Talented alchemists with high Crafting ranks complete products faster.

---

## 8. Summary of Recommendations

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| 1 | Adopt challenge dice for all alchemical crafting progress tracking | Unifies terminology with Craft an Item and challenge system | Low |
| 2 | Replace old mishap table with Alchemy Consequence Table aligned to Complication table format | Consistent consequence framework across all downtime activities | Low |
| 3 | Define Gather Ingredients as a formal downtime activity with standard result tiers | Clear procedure for ingredient acquisition during downtime | Low |
| 4 | Establish alchemical reagents as valid materials for magic item enchantment crafting | Creates alchemy ↔ enchantment pipeline and party collaboration | Medium |
| 5 | Define temporary alchemical effects as non-stacking parallels to permanent enchantments | Preserves enchantment value while giving alchemy a clear combat niche | Medium |
| 6 | Add alchemical preparation as optional support step during enchantment crafting | Rewards party collaboration without bypassing challenge die progress | Low |
| 7 | Expand product catalogue with utility and exploration consumables | Fills non-combat gap (matching enchantment analysis findings) | Medium |
| 8 | Apply Lingering Fatigue rule to all alchemy-related Fatigue consequences | Consistent with downtime fatigue framework | Low |

> **Deferred:** Full alchemical recipe catalogue with exact costs — separate document.
> **Deferred:** Alchemist-specific talents beyond existing Crafting talents — talent analysis scope.
> **Deferred:** Poison crafting as a distinct profession vs. Alchemist sub-specialty — professions scope.

---

## Appendix A: Legacy Item Conversion

Existing Equipment alchemy items map to this system's categories and costs:

| Item Name | Quality | Material Cost (½ item value) | Category | Effect Summary |
|-----------|---------|------------------------------|----------|---------------|
| Healing Salve (weak) | Q1 | ~7 coins | Healing | Apply to Wound, +1 boon healing |
| Antitoxin | Q2 | ~15 coins | Healing | Cure one poison |
| Healing Salve (simple) | Q2 | ~15 coins | Healing | Apply to Wound, +2 boons healing |
| Weapon Poison (weak) | Q2 | ~25 coins | Enhancement | +2 poison damage on hit |
| Paralyzing Poison (weak) | Q2 | ~15 coins | Poison | **Poisoned** (short), save TN 8 |
| Fire Bomb | Q3 | ~62 coins | Bomb | +3 fire to all in melee |
| Healing Potion (weak) | Q3 | ~62 coins | Healing | Regain 8 HP |
| Healing Salve (potent) | Q3 | ~62 coins | Healing | Auto-heal Wound on next rest |
| Heightening Potion | Q3 | ~62 coins | Enhancement | +1 Move, +1 boon attacks (short) |
| Weapon Poison (decent) | Q3 | ~62 coins | Enhancement | +4 poison damage |
| Paralyzing Poison (decent) | Q3 | ~62 coins | Poison | **Poisoned** + **staggered**, save TN 10 |
| Healing Potion (decent) | Q4 | ~187 coins | Healing | Regain 16 HP |
| Weapon Poison (strong) | Q4 | ~187 coins | Enhancement | +6 poison damage |
| Paralyzing Poison (strong) | Q5 | ~625 coins | Poison | **Stunned**, save TN 14 |
| Healing Potion (strong) | Q5 | ~625 coins | Healing | Regain 24 HP |

---

## Appendix B: Example Crafting Walkthrough

### Crafting a Fire Bomb (Q3)

**Setup:**
- Alchemist: Crafting 1, Mind d8
- Product: Fire Bomb (Q3) — challenge die d6 starting at 4, TN 8
- Ingredients: Elemental sulfur (Essence: fire, Q3, 50 coins) + Volatile spirits (Catalyst, Q3, 65 coins) + Pitch (Binder, Q2, 10 coins) = 62 coins material cost (½ the item value)
- Weekly expenses: 50 coins/week

**Week 1:** Roll Mind (d8) + Crafting (1) + 1d6 vs. TN 8 → Result: 11 (strong success). Challenge die: 4 → 2.

**Week 2:** Roll again → Result: 9 (weak success). Challenge die: 2 → 1.

**Week 3:** Roll again → Result: 13 (critical success). Challenge die: 1 → 0. **Complete!**

**Total Cost:** 150 coins expenses (3 weeks × 50) + 62 coins materials = **212 coins**.

### Crafting a Potion of Strength (Q4) with Alchemical Preparation Support

**Setup:**
- Alchemist (support): Crafting 2, Mind d8 — prepares reagents
- Smith (primary crafter): Crafting 3, Mind d10 — crafting a Q4 magic sword with an enchantment
- The alchemist spends one downtime week preparing enchantment reagents

**Alchemist's Preparation Week:** Roll Mind (d8) + Crafting (2) + 1d6 vs. TN 10 → Result: 12 (success). The smith gains +1 boon on their next crafting roll for the magic sword.

**Smith's Crafting Week:** The smith rolls with +1 boon from the alchemist's preparation, improving their chance of a strong or critical success on the Q4 magic item's challenge die.

> This illustrates the collaborative pipeline: the alchemist contributes expertise that accelerates (but does not bypass) the enchantment crafting process.
