# Alchemy & Potion Crafting — Design Analysis

> **Scope:** Alchemical crafting as a modular system — procedures for downtime and field use, ingredient systems built on the existing Supply framework, integration with challenge dice, magic item creation, and enchantment systems.
>
> **References:** [Craft an Item](../06-scenes/04-downtime/activities.md) | [Challenges](../06-scenes/07-challenges.md) | [Downtime Overview](../06-scenes/04-downtime/00-overview.md) | [Downtime Activities](../06-scenes/04-downtime/activities.md) | [Crafting Professions](../06-scenes/05-crafting-professions.md) | [Magic Item Effects](../04-equipment/07-magic-items/effects.md) | [Enchantments](../04-equipment/07-magic-items/enchantments.md) | [Cost Tables](../04-equipment/07-magic-items/cost-tables.md) | [Supply](../04-equipment/02-equipment/supply.md) | [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) | [Travel](../06-scenes/09-travel.md)
>
> **Related Analyses:** [Downtime System Analysis](./downtime-system-analysis.md) | [Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md) | [Materials Mechanical Effects Analysis](./materials-mechanical-effects-analysis.md) | [Non-Magical Equipment Analysis](./equipment/non-magical-equipment-analysis.md)

---

## 1. Executive Summary

### Key Findings

1. **Modular recipe system.** Alchemical products are built from three choices: **Effect** (what it does) + **Quality** (how potent) + **Delivery Method** (how it reaches the target). This replaces static item lists with a flexible, combinable framework. Equipment list alchemy items are treated as **known recipes** that any alchemist can craft without experimentation.
2. **Two crafting modes.** Downtime crafting uses challenge dice for multi-week batch production. Field alchemy allows quick, single-item crafting during adventures with a single roll — faster but riskier and less efficient.
3. **Simplified ingredients.** The old three-tag system (Essence / Catalyst / Binder) is streamlined. Generic **Alchemy Supplies** per Quality tier serve as the baseline catalyst and are drawn from the existing Supply item category. A specific **Essence** determines the product's effect. Special reagents can optionally enhance duration or add secondary properties.
4. **Mind or Spirit.** Alchemy supports two approaches: **Mind + Crafting** for methodical, empirical preparation (the apothecary grinding minerals in a bronze mortar) and **Spirit + Crafting** for intuitive, tradition-guided practice (the herbalist reading omens and following ancestral recipes). The player chooses which attribute to use when they craft.
5. **Challenge dice unify crafting progress.** Downtime alchemical crafting uses the same challenge die framework as all other multi-step activities (see [Downtime System Analysis §3.3](./downtime-system-analysis.md)). The die is placed on the table as a visible progress tracker.
6. **Ingredients from travel.** The existing Forager travel role yields useful materials that feed directly into alchemy. Creature harvesting during adventures also produces essences. These connect adventuring to downtime crafting.
7. **Base catalog vs. custom products.** Items on the [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) list are always-known recipes — any alchemist can craft them. Items from the [Non-Magical Equipment Analysis](./equipment/non-magical-equipment-analysis.md) (Q1–Q3 mundane alchemicals) are purchasable gear, not alchemy-crafted. Custom products beyond the base catalog require experimentation to discover.
8. **Integration with magic items.** Alchemical reagents serve as material prerequisites for enchantment crafting. Temporary alchemical effects (weapon coatings, enhancement draughts) function as non-stacking parallels to permanent enchantments.

### Design Principles

1. **Bronze Age aesthetic** — All ingredients, tools, and processes must fit the ancient world setting: clay vessels, bronze mortars, reed-wrapped bundles, plant resins, mineral powders, animal-derived substances. No glass beakers, no gunpowder, no modern chemistry.
2. **Modular over static** — The recipe system generates products from combinations, not from a fixed list. Known recipes are shortcuts; experimentation expands the alchemist's repertoire.
3. **Two speeds** — Downtime crafting is efficient and supports batch production. Field alchemy is quick but costly and limited to known recipes.
4. **Supply integration** — Generic Alchemy Supplies from the Supply category serve as catalysts. Essences are the specific, effect-defining ingredient. This connects to the existing equipment economy.
5. **Bounded power** — Alchemical products provide temporary, consumable advantages. They complement magic items and talents, never replace them.
6. **Lingering Fatigue** — Fatigue from alchemy consequences is Lingering Fatigue (see [Downtime System Analysis §3.6](./downtime-system-analysis.md)).

---

## 2. Compatibility Analysis

### What Works

| System | Status | Notes |
|--------|--------|-------|
| **Craft an Item** | ✅ | Downtime alchemy uses the same activity, profession requirement, weekly expenses, and challenge die structure. |
| **Crafting Professions** | ✅ | "Alchemist" is an established profession. Skill test = Mind/Spirit + Crafting. |
| **Quality Tiers** | ✅ | Alchemical products follow Q1–Q7 with the same Crafting rank requirements and difficulty TNs. |
| **Supply Items** | ✅ | Existing Supply category includes crafting materials at Q1–Q4 that map directly to alchemy catalysts. |
| **Travel Forager** | ✅ | The Forager role already yields "useful materials (primitive materials d6)" — these are valid alchemy inputs. |
| **Consumable Pricing** | ✅ | Existing alchemy items (healing potions, bombs, poisons) have established costs compatible with the ingredient system. |

### Gaps Addressed

| System | Status | Gap | Addressed In |
|--------|--------|-----|-------------|
| **Challenge Dice** | ⚠️ | Old document used "track successes" rather than challenge die terminology. | §3 |
| **Field Crafting** | ❌ | No procedure for quick crafting during adventures. | §4 |
| **Modular Recipes** | ❌ | Old system mapped only to static item lists with no combinable framework. | §5 |
| **Supply Integration** | ❌ | No connection between generic Supply materials and alchemy ingredients. | §3.2 |
| **Mind vs. Spirit** | ❌ | Only Mind + Crafting was specified; intuitive/traditional approach excluded. | §3.1 |
| **Non-Magical Alchemicals** | ❌ | Relationship between mundane alchemicals (equipment analysis) and crafted products undefined. | §2.1 |
| **Magic Item Integration** | ❌ | No procedure for alchemy ↔ enchantment pipeline. | §7 |
| **Travel Foraging** | ⚠️ | Forager yields materials but no explicit link to alchemy ingredients. | §6.3 |
| **Consequences** | ⚠️ | Old mishap table was disconnected from Complication table format. | §3.4 |

### 2.1 Base Catalog vs. Custom Products

The question of which alchemical items belong where:

**Base Catalog (Always Available as Known Recipes)**

All items on the [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) page — healing salves, healing potions, weapon poisons, paralyzing poisons, fire/smoke bombs, flammable paste, acid vial, antitoxin, heightening potion. These are purchasable in settlements at their listed cost, and any alchemist can craft them without experimentation.

**Mundane Alchemicals (Purchasable Gear, Not Alchemy-Crafted)**

The 17 items proposed in the [Non-Magical Equipment Analysis](./equipment/non-magical-equipment-analysis.md) (e.g., blinding dust, stench gourd, luminous paste, cat's-eye oil, ironblood draught, etc.) are Q1–Q3 mundane preparations available for purchase at any appropriate settlement. They do **not** require the Alchemist profession to use — they are standard equipment, like rope or a camping kit. An alchemist *can* craft them using the standard Craft an Item rules with appropriate proficiency, just as a smith can repair a bronze blade. However, an alchemist who wants more potent (Q4+) or custom-delivery versions of similar effects must use the modular recipe system (§5).

**Custom Products (Alchemy-Only, Require Experimentation)**

Any product assembled through the modular recipe system (§5) that goes beyond the base catalog. These require either a known recipe (learned through experimentation or taught by a mentor) or the experimentation procedure. This is the exclusive domain of the Alchemist profession.

> **Design Note:** This three-tier distinction keeps the equipment list clean, ensures non-alchemists can buy useful consumables, and reserves the modular recipe system as the alchemist's unique value proposition.

---

## 3. Downtime Alchemical Crafting

Downtime alchemy uses the standard **Craft an Item** activity with the **Alchemist** profession. The procedure incorporates challenge dice and the consequence framework from the [Downtime System Analysis](./downtime-system-analysis.md).

### 3.1 Skill Test

The Alchemist profession supports two attributes. **The player chooses which to use each time they make an alchemy roll:**

- **Mind + Crafting** — The empirical approach. Methodical measurement, careful observation, and recorded formulas. Fits the apothecary, the temple physician, the court poisoner who keeps meticulous clay-tablet notes.
- **Spirit + Crafting** — The intuitive approach. Ancestral knowledge, reading the color of smoke, tasting the mixture, trusting tradition. Fits the village herbalist, the wandering healer, the shaman who learned from their grandmother.

Both are equally valid — the game world's "ancient science" does not distinguish between empirical and intuitive knowledge the way modern cultures do.

> **Design Note:** This mirrors the Forager travel role, which already allows Spirit/Mind + Nature. The dual-attribute approach also opens alchemy to a wider range of character archetypes (Apothecary, Shaman, Druid, Oracle) without requiring separate professions.

### 3.2 Ingredients: Essence + Alchemy Supplies

The ingredient system is simplified to two components:

**Essence** — The specific, effect-defining ingredient. Determines *what* the product does. Acquired through gathering, harvesting, purchase, or questing.

| Essence Type | Examples (Bronze Age flavoring) |
|-------------|-------------------------------|
| Healing | Honey, willow bark, comfrey root, sacred lotus |
| Fire | Sulfur crystals, naphtha resin, salamander gland |
| Frost | Snowmelt essence, white mineral salt, cave lichen |
| Poison | Scorpion venom, hemlock extract, toad secretion |
| Enhancement | Bull's blood, lion mane extract, eagle-eye berries |
| Sleep | Poppy extract, mandrake root, lotus pollen |
| Perception | Desert hawk bile, cave-fish oil, starflower tincture |
| Protection | Turtle shell powder, iron-rich clay, boar tusk dust |

**Alchemy Supplies** — The generic catalyst that activates and stabilizes the essence. Represented by the existing **Supply** category items, which already scale by Quality:

| Supply Item | Quality | Cost | Alchemy Role |
|-------------|---------|------|-------------|
| Primitive Materials (d6) | Q1 | 25 coins | Basic catalyst — binds Q1 essences into crude preparations |
| Simple Materials (d6) | Q2 | 75 coins | Standard catalyst — stable enough for common salves and poisons |
| Advanced Materials (d6) | Q3 | 250 coins | Refined catalyst — supports complex potions and bombs |
| Formidable Materials (d6) | Q4 | 750 coins | Potent catalyst — enables magical-quality alchemical products |

For Q5+ products, catalysts must be sourced from rare or magical materials (quest rewards, creature harvests, or specialist merchants). No generic Supply item exists at these tiers.

**Special Reagents (Optional Modifiers)**

Beyond the basic Essence + Supplies formula, special reagents can modify a product's properties:

| Reagent Type | Effect | Example |
|-------------|--------|---------|
| **Stabilizer** | Extends duration by one step (briefly → short, short → medium) | Cedar resin, beeswax, rendered tallow |
| **Intensifier** | Increases effect potency by one step within the Quality tier | Concentrated naphtha, distilled venom, temple-blessed water |
| **Carrier** | Changes delivery method (see §5.2) without altering the core effect | Animal bladder (splash), hollow reed (inhaled), clay vessel (contact) |

**Cost Model: Supply Items Replace Fixed Ingredient Cost**

When crafting an alchemical product, spend **1 use** of the appropriate Supply item to provide the catalyst. This replaces the old "ingredient cost = ½ item value" model for the catalyst portion. The Essence must still be acquired separately (purchased, gathered, or harvested). Total material cost per crafting attempt = Essence cost + Supply use cost. The Supply die tracks how many crafting attempts your materials support before running out.

| Component | Source | Cost Example (Q3 product) |
|-----------|--------|---------------------------|
| Essence | Purchase, gather, harvest | 40–100 coins (see §6.1) |
| Alchemy Supplies (catalyst) | Supply item: Advanced Materials | 1 use of d6 Supply (250 coins for full supply) |
| Special reagent (optional) | Purchase or gather | Varies by reagent type |

### 3.3 Downtime Procedure (Step by Step)

#### Step 1: Choose Product and Quality

Select what you want to create — either a **known recipe** from the base catalog or a **custom product** using the modular system (§5). Determine the Quality tier.

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

#### Step 2: Provide Materials

You need:
- **1 Essence** of the appropriate type and Quality (or higher).
- **1 use of Alchemy Supplies** at the product's Quality tier (or higher). Spend 1 use from the appropriate Supply item.
- **Optional special reagents** (stabilizer, intensifier, or carrier) if modifying the base recipe.

For products Q5+, the catalyst must be a specific rare material rather than a generic Supply item (see §3.2).

#### Step 3: Pay Expenses and Roll

Pay weekly expenses and roll **Mind/Spirit + Crafting** vs. the product's Crafting TN.

| Result | Challenge Die Reduction |
|--------|------------------------|
| **Blunder** | No reduction. Trigger an **Alchemy Consequence** (see §3.4). |
| **Failure** | No reduction. Optionally reduce by 1 by **doubling** weekly expenses for this week. |
| **Weak Success** | Reduce challenge die by 1. |
| **Strong Success** | Reduce challenge die by 2. |
| **Critical Success** | Reduce challenge die by 3. |

#### Step 4: Track Progress

When the challenge die reaches **0**, the product is complete. Receive the finished item.

If the challenge die has not reached 0, continue crafting in a subsequent downtime week (paying weekly expenses again). Record the current challenge die value between sessions.

**Batch Crafting:** If a single roll produces enough reduction to complete multiple identical products (e.g., rolling a critical on a Q1 item), you may create up to your Crafting rank identical items. Spend 1 additional Supply use per extra item.

> **Example — Brewing a Healing Potion (Q3):**
> Kesra the herbalist (Crafting 2, Spirit d8) decides to brew a healing potion — a known recipe from the base catalog. She places a d6 showing 4 on the table (Q3 challenge die). She has sacred lotus (Essence: healing, Q3) and spends 1 use of her Advanced Materials (Q3 Supply). She pays 50 coins weekly expenses and rolls Spirit + Crafting vs. TN 8.
>
> *Week 1:* Strong success — the die drops from 4 to 2. The lotus pulp dissolves cleanly into the mineral carrier.
>
> *Week 2:* Weak success — the die drops from 2 to 1. She sun-dries the mixture in shallow clay bowls.
>
> *Week 3:* Weak success — the die reaches 0. The potion is sealed in a stoppered clay flask. Total: 3 weeks × 50 coins expenses.

### 3.4 Alchemy Consequences

On a **blunder** during alchemical crafting, roll on the **Alchemy Consequence Table**. These replace the generic Complication table for alchemy-specific results.

**Alchemy Consequence Table (d6)**

| d6 | Consequence |
|----|-------------|
| 1 | **Toxic Fumes.** Acrid vapors fill your workspace. Gain 1 **Lingering Fatigue**. |
| 2 | **Explosion.** Your clay vessel shatters violently. Suffer 2d6 blast damage. Your workspace is unusable for 1d4 days (costs 50 coins in replacement vessels and tools). |
| 3 | **Contamination.** The batch is ruined. The Essence is destroyed — you must acquire a new one. |
| 4 | **Unstable Result.** The product appears finished but is flawed. It functions normally but has one unpredictable side effect determined by the GM (e.g., changes the user's skin color, emits a foul odor, causes brief nausea). |
| 5 | **Setback.** The reaction stalls. Increase the challenge die by 1 (up to its starting value). |
| 6 | **Severe Burn.** Suffer 1 Wound from boiling liquid or caustic splash. You cannot continue any crafting activity until the Wound is healed. |

> **Lingering Fatigue Note:** Fatigue from alchemy consequences is **Lingering Fatigue** — not removed by normal nightly rest. Removed by the Recover, Leisure, or Provide Offering activities (see [Downtime System Analysis §3.6](./downtime-system-analysis.md)).

### 3.5 Talent Synergies

Existing Crafting talents apply to alchemical crafting:

| Talent | Alchemy Application |
|--------|-------------------|
| **Artisan R1** | Re-roll one crafting test per scene (applies to alchemy rolls). |
| **Artisan R2** | When reducing the challenge die by 1+, reduce it by an additional 1. |
| **Artisan R3** | When reducing the challenge die by 1+, reduce it by an additional 2. |
| **Efficient Worker R1** | When rolling a Supply check for alchemy materials, roll twice and take the higher result. |
| **Efficient Worker R2** | When you finish crafting an alchemical item, regain 1/10 of the item's cost in coins. |
| **Efficient Worker R3** | Every crafting roll reduces the challenge die by at least 1 (even on failure). |

---

## 4. Field Alchemy (Quick Crafting During Adventures)

Not all alchemy happens in a workshop. An alchemist in the field — crouched behind a ruin wall, working by firelight in camp, or hastily mixing reagents before a battle — can produce a single item with a quick, improvised procedure.

### 4.1 Requirements

- **Alchemist profession** and **Alchemist's Supplies** (50 coins, 1 load — the standard toolkit of bronze mortar, clay vessels, reed stirring rods, and a pouch of common reagents).
- The product must be a **known recipe** (base catalog or previously learned through experimentation). No experimentation in the field.
- **1 Essence** of appropriate type and Quality.
- **1 use of Alchemy Supplies** (the toolkit's Supply die — functions as the catalyst).

### 4.2 Procedure

Field alchemy takes **one Action during a rest** (short or long rest) or **10 minutes of uninterrupted work** outside of combat. It produces a **single item** — no batch crafting.

Roll **Mind/Spirit + Crafting** vs. the product's Crafting TN with **+1 bane** (reflecting improvised conditions — no proper workspace, limited temperature control, rushed preparation).

| Result | Outcome |
|--------|---------|
| **Blunder** | The Essence is destroyed. Roll on the Alchemy Consequence Table (§3.4). |
| **Failure** | The mixture fails. The Essence is spent but you retain your Alchemy Supplies use. *(Field failure is harsher than downtime: improvised conditions mean the Essence cannot be salvaged from a failed reaction. This is the cost of speed.)* |
| **Weak Success** | You produce the item, but it is **unstable** — it must be used within a short duration or it loses potency and becomes inert. |
| **Strong Success** | You produce the item normally. |
| **Critical Success** | You produce the item and retain the Alchemy Supplies use (no Supply spend). |

### 4.3 Limitations

- **One item per rest.** Field alchemy is quick and dirty — you cannot mass-produce.
- **Known recipes only.** The pressure of field conditions does not allow experimentation.
- **Maximum Quality = Crafting rank + 1.** You cannot attempt field alchemy beyond your practical skill ceiling. A Crafting 2 alchemist can field-craft up to Q3.
- **No challenge die.** Field alchemy is resolved in a single roll — it does not use multi-week tracking.

> **Example — Field-Mixing an Antitoxin:**
> The party's scout has been bitten by a venomous asp. Tadese the apothecary (Crafting 1, Mind d8) has Alchemist's Supplies and a vial of purified serpent gland (Essence: antivenom, Q2). During the party's short rest, he crushes the gland in his bronze mortar, mixes it with mineral powder from his supplies, and rolls Mind + Crafting vs. TN 6 with +1 bane. He rolls a strong success — the antitoxin is ready. The scout drinks it and is cured.

### 4.4 Field vs. Downtime Comparison

| Aspect | Field Alchemy | Downtime Alchemy |
|--------|--------------|-----------------|
| **Time** | 1 rest / 10 minutes | 1+ weeks (challenge die) |
| **Output** | Single item | Batch possible |
| **Recipes** | Known only | Known or experimental |
| **Quality Cap** | Crafting rank + 1 | Per standard table |
| **Roll Modifier** | +1 bane | None |
| **Efficiency** | Essence consumed even on failure | Essence only lost on blunder (contamination) |
| **Best For** | Emergency healing, quick poisons, mid-adventure needs | Stockpiling, experimentation, high-Quality products |

---

## 5. Modular Recipe System

The heart of the alchemy system is its modularity. Rather than referencing a fixed product list, an alchemist builds products by combining three choices.

### 5.1 Effect Categories

The **Effect** determines what the product does. Each effect has a base mechanical result that scales with Quality.

| Effect | Base Result | Scaling by Quality |
|--------|------------|-------------------|
| **Healing** | Restore HP or treat Wounds | Q1: +1 boon on Wound healing. Q2: +2 boons. Q3: regain 8 HP. Q4: 16 HP. Q5: 24 HP. |
| **Damage (element)** | Deal elemental damage (fire, acid, frost, lightning) | Q2: +2. Q3: +3. Q4: +4. Q5: +6. Q6: +8. |
| **Poison** | Inflict poison damage + condition | Per poison table (§5.4) |
| **Enhancement** | Temporary attribute or combat boost | Q2–Q3: +1 boon on narrow category. Q4: +1 die size to attribute (max d10). Q5+: stronger/broader effects. |
| **Protection** | Grant resistance or condition immunity | Q3: +1 boon on saves vs. one element. Q4: resistance to one damage type (short). Q5: immunity to one condition (short). |
| **Perception** | Enhance or alter senses | Q2: dim light treated as bright (eyes sting in bright light). Q3: darkvision. Q4: see invisible. Q5: tremorsense. |
| **Mobility** | Grant movement modes | Q3: water breathing. Q4: spider climb. Q5: gaseous form. |
| **Concealment** | Hide, mask, or alter appearance | Q2: mask scent. Q3: muffle sound. Q4: invisibility (breaks on attack/cast). |

### 5.2 Delivery Methods

The **Delivery Method** determines how the product reaches its target. Each method has a mechanical implication.

| Delivery | Application | Range | Target | Notes |
|----------|-----------|-------|--------|-------|
| **Draught** (drink) | Action to consume | Self | Single (drinker) | Default for self-buffs. Can be administered to willing/unconscious creature. |
| **Salve** (apply) | Action to apply | Melee | Single (touched) | External application — wounds, skin, armor. Slower onset but longer lasting. |
| **Coating** (weapon) | Quick Action to coat | — | Single (next hit) | Applied to weapon or ammo. Effect triggers on next successful hit. Lasts short duration or until triggered. |
| **Thrown** (splash) | Action to throw | Short | Area (melee range of impact) | Clay vessel or bladder. Shatters on impact. Affects all in splash radius. Uses bundle Supply die. |
| **Inhaled** (vapor) | Action to deploy | Close | Area (close range cloud) | Smoke, gas, or powder. Lingers for short duration. Targets must save or be affected. |
| **Contact** (surface) | Action to coat surface | Melee | Single (first creature to touch) | Trap-like application — doors, weapons, coins. Delayed onset. |

**Delivery Method Modifiers:**

Changing delivery from the default for an effect adds complexity:

- **Thrown/Inhaled versions** of single-target effects **halve the numeric effect** (to balance multi-target reach). Example: A Q4 healing draught restores 16 HP to one drinker; a Q4 healing thrown splash restores 8 HP to each target in the area. For non-numeric effects (e.g., condition removal), reduce duration by one step instead.
- **Contact delivery** adds a save for the target (Spirit + Fortitude vs. product's TN) even for effects that normally auto-apply.
- **Coating delivery** only triggers once (on next hit), then is consumed.

### 5.3 Building a Custom Product

**Step 1:** Choose an **Effect** from §5.1.
**Step 2:** Choose a **Quality** tier (determines potency, crafting requirements, and cost).
**Step 3:** Choose a **Delivery Method** from §5.2 (apply any delivery modifiers).
**Step 4:** Check if this combination is a **known recipe**. If not, it requires **experimentation** (§5.5).

> **Example — Multi-Target Healing Cloud (Q4):**
> Nima wants to create a thrown healing mist — a clay vessel that shatters and releases a healing vapor cloud. She chooses:
> - **Effect:** Healing (Q4 = 16 HP to single target)
> - **Delivery:** Thrown (splash) — area delivery reduces single-target potency by one step → **8 HP to each target in melee range of impact**
> - **Quality:** Q4 (Crafting rank 2 required, TN 10)
>
> This is not a base catalog recipe, so Nima must use the experimentation procedure first. Once learned, she can craft it freely — including via field alchemy.

**Custom Product Cost Guidelines:**

Until a full recipe catalogue is published, use the following formula for pricing custom products:

| Quality | Base Cost (single-target draught) | Thrown/Inhaled (area) modifier | Coating modifier | Contact modifier |
|---------|----------------------------------|-------------------------------|-----------------|-----------------|
| Q1 | 15 coins | ×1.5 | ×0.75 | ×0.75 |
| Q2 | 30–50 coins | ×1.5 | ×0.75 | ×0.75 |
| Q3 | 125 coins | ×1.5 | ×0.75 | ×0.75 |
| Q4 | 375 coins | ×1.5 | ×0.75 | ×0.75 |
| Q5 | 1,250 coins | ×1.5 | ×0.75 | ×0.75 |

Base cost matches existing alchemy item pricing at each tier. Area delivery costs more (multiple targets). Coating/Contact cost less (single-use trigger, limited applicability). GMs may adjust within ±25% for unusual combinations.

### 5.4 Poison Effects Reference

Poisons follow the modular system but have their own scaling table due to their condition-based mechanics:

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

**Delivery options for poisons:**

| Delivery | Application | Save Attribute | Onset |
|----------|-----------|----------------|-------|
| **Injury** (coat weapon) | Quick Action to coat weapon/ammo | Strength + Fortitude | On next successful hit |
| **Contact** (coat surface) | Action to coat a surface or object | Spirit + Fortitude | Immediate on touch |
| **Ingested** (mix in food/drink) | Must be mixed into consumable undetected | Strength + Fortitude | 1d10 minutes after consumption |
| **Inhaled** (release gas) | Action to deploy; cloud fills close range | Spirit + Fortitude | Immediate; all in cloud must save |

These follow the general delivery rules from §5.2 with the poison-specific saves and onsets listed above.

### 5.5 Experimentation

When an alchemist wants to create a product that is **not** a known recipe — a novel Effect + Quality + Delivery combination — they must experiment.

- The alchemist describes the intended product. The GM confirms the combination is valid and assigns the appropriate Quality tier.
- All crafting rolls for the experimental product suffer **+1 bane**.
- On a **blunder**, roll twice on the Alchemy Consequence Table and apply both results.
- If the product is completed successfully, the alchemist **learns the recipe** and can craft it again without the experimentation penalty (including via field alchemy).
- Recipes can also be learned from **mentors, ancient texts, or recovered formula tablets** without experimentation.

> **Known Recipe Rule:** All items on the [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) page are **always known recipes** for any character with the Alchemist profession. No experimentation is needed for these base catalog items.

---

## 6. Ingredient Acquisition

### 6.1 Essence Cost Reference

| Quality | Essence Cost | Example Sources (Bronze Age) |
|---------|-------------|------------------------------|
| Q1 | 1–5 coins | Common herbs, mineral ash, river clay, dried beetles |
| Q2 | 5–25 coins | Medicinal plants, copper dust, charcoal, animal glands |
| Q3 | 40–100 coins | Rare temple flowers, monster blood, volcanic mineral salts |
| Q4 | 200–400 coins | Dragon bile, troll blood, giant organs, deep-earth crystals |
| Q5 | 800–1,500 coins | Phoenix ash, celestial minerals, primordial tree sap |
| Q6 | 4,000–8,000 coins | Elder dragon parts, divine ichor, meteor fragments |
| Q7 | 15,000+ coins | Legendary materials, cosmic essences, god-touched substances |

### 6.2 Gather Ingredients (Downtime Activity)

Gathering essences is a downtime activity. Roll **Mind/Spirit + Nature** or **Agility/Spirit + Survival** (player's choice — foraging knowledge vs. wilderness scouting).

| Min. Settlement Rank | Requirements | Expenses |
|----------------------|-------------|---------|
| 1 (Hamlet) | Nature or Survival skill | 0 coins/week |

Choose a target ingredient Quality:

| Quality | Gathering TN | Yield on Success |
|---------|-------------|-----------------|
| Q1 | Easy (6) | 1d6 essences |
| Q2 | Easy (6) | 1d4 essences |
| Q3 | Medium (8) | 1d3 essences |
| Q4 | Hard (10) | 1d2 essences |
| Q5 | Very Hard (12) | 1 essence |
| Q6 | Extreme (14) | 1 essence |
| Q7 | Legendary (16) | 1 essence |

**Blunder.** No yield. Roll on the Gathering Complication table:

| d6 | Gathering Complication |
|----|----------------------|
| 1 | **Poisonous Contact.** Save Spirit + Fortitude vs. TN 10 or gain **poisoned** (short duration). Gain 1 Lingering Fatigue on failure. |
| 2 | **Hostile Creature.** You stumble into a creature's territory. The GM introduces a brief combat encounter or a tense escape. |
| 3 | **Spoiled Yield.** Your collected ingredients are contaminated by weather or parasites. Lose any ingredients gathered this week. |
| 4 | **Unwanted Attention.** A rival herbalist, local authority, or territorial faction notices your foraging. The GM introduces a minor complication. |
| 5 | **Lost Time.** You cannot use this activity again next week. |
| 6 | **Nothing Extra.** The blunder is bad enough on its own. |

**Failure.** No yield. No additional consequence.

**Weak Success.** Yield as listed.

**Strong Success.** Yield as listed, plus one additional essence of one Quality tier lower (minimum Q1).

**Critical Success.** Double the listed yield.

### 6.3 Travel Foraging

The existing **Forager** travel role (see [Travel](../06-scenes/09-travel.md)) already yields useful materials:

- **Useful materials bonus:** "You gain primitive materials (d6)." These are Q1 Alchemy Supplies — valid as catalysts for Q1 field alchemy only. (Free travel materials cannot substitute for purchased Q2+ Supply items.)
- **Edible plants bonus:** While primarily food, an alchemist can repurpose edible plants as Q1 healing or utility essences at the GM's discretion.

Additionally, a **dedicated foraging effort** during travel can yield essences:

- An alchemist filling the Forager role may choose to **forage for essences instead of food/water**. Replace the standard Forager bonuses with:
  - **Weak Success:** Gather 1 essence of Quality equal to the terrain's ingredient tier (see table below).
  - **Strong Success:** Gather 1d3 essences at the terrain's tier.
  - **Critical Success:** Gather 1d3 essences at the terrain's tier, plus 1 essence one tier higher.
- Consequences remain unchanged from the standard Forager role.

**Default Terrain Ingredient Tiers:**

| Terrain Type | Ingredient Tier | Example Essences |
|-------------|----------------|-----------------|
| Barren desert, salt flats, open sea | Q1 | Mineral salts, dried lichens, sand beetle husks |
| Scrubland, dry steppe, rocky hills | Q1–Q2 | Hardy herbs, copper-bearing stones, scorpion venom |
| Fertile river valley, temperate forest | Q2 | Medicinal plants, tree resins, common animal parts |
| Lush jungle, tropical marsh, deep cave | Q2–Q3 | Rare flowers, luminous fungi, exotic reptile glands |
| Enchanted forest, sacred grove, spirit-touched oasis | Q3–Q4 | Temple flowers, spirit-infused sap, elemental crystals |
| Primordial wasteland, divine ruins, planar rift zone | Q4+ | Dragon-territory flora, meteor-touched minerals, divine residue |

> GMs may adjust terrain tiers based on specific regions in their campaign. The table above provides default guidelines.

> **Design Note:** This connects adventuring directly to crafting. An alchemist who forages during travel arrives at a settlement with essences ready for downtime crafting — or for field alchemy during the next adventure.

### 6.4 Creature Harvesting

Use the existing Harvesting Creature Parts rules. Harvested creature parts count as essences at the creature's tier Quality:

- A **venomous creature** yields poison essences.
- An **elemental creature** (fire salamander, frost serpent) yields elemental damage essences.
- A **regenerating creature** (troll, hydra) yields healing essences.
- A **magical creature** yields essences appropriate to its nature (GM's judgment).

A successful harvest yields **1d4 essence units** per creature.

### 6.5 Market Purchase

Settlements stock essences up to their market tier:

| Settlement Rank | Max Essence Quality | Notes |
|----------------|--------------------|----|
| 1 (Hamlet) | Q2 | Common herbs, mineral powders |
| 2 (Village) | Q3 | Rare plants, monster-derived ingredients from local hunters |
| 3 (Town) | Q4 | Specialty merchants, temple apothecaries, trade caravan goods |
| 4 (City) | Q5 | Master alchemists, guild storehouses, imported rarities |
| 5+ (Capital) | Q6 | Royal apothecaries, planar materials, legendary reagents (extremely rare, GM discretion) |

Q7 essences are never available for purchase — they must be quested for.

---

## 7. Integration with Magic Items & Enchantments

See the [Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md) for the full enchantment framework.

### 7.1 Alchemical Reagents as Enchantment Materials

When crafting a magic item via Craft an Item, higher-Quality items require magical ingredients as material cost. **Alchemical essences and refined reagents satisfy this requirement.** An alchemist who can produce or source the correct reagents provides a direct material pipeline.

| Magic Item Quality | Reagent Role | Example (Bronze Age) |
|-------------------|-------------|---------|
| Q3 (Masterwork) | No reagent needed — mundane materials. | Fine bronze, seasoned cedar wood. |
| Q4 (Lesser Magic) | Alchemical reagent as activating agent. | Volcanic mineral salts to awaken a blade's enchantment. |
| Q5 (Potent Magic) | Rare reagent as magical binding agent. | Phoenix ash to stabilize a Flaming enchantment. |
| Q6 (Greater Magic) | Exotic reagent as core magical component. | Elder dragon bile to fuel a Q6 Slaying weapon. |
| Q7+ (Legendary) | Legendary reagent as essential catalyst. | Cosmic essence, divine ichor — quest-only materials. |

> **Design Note:** This creates a party collaboration pipeline: the alchemist gathers and refines reagents, which feed into the smith's or inscriber's magic item projects. Neither role is strictly required — materials can always be purchased — but the synergy rewards investment in both professions.

### 7.2 Alchemical Products as Temporary Enchantments

Some alchemical products function as **temporary enchantments** — short-duration enhancements applied to weapons, armor, or the body. These do not stack with permanent enchantments of the same type (only the highest bonus applies).

| Product Type | Enchantment Parallel | Stacking Rule |
|-------------|---------------------|---------------|
| **Weapon Coating (fire/frost/acid)** | Functions like Flaming/Frost/Corrosive weapon (temporary) | Higher bonus applies; does not stack with permanent equivalent. |
| **Armor Oil (resistance)** | Functions like Tough armor (temporary) | Higher bonus applies. |
| **Attribute Draught** | Functions like a wearable "of Might/Swiftness" (temporary) | Higher bonus applies. |
| **Flammable Paste** | Grants a temporary weapon property | Does not stack with the same permanent property. |

> **Design Note:** Temporary alchemical effects let characters without magic items access enchantment-like benefits, and let characters with magic items gain *different* (non-overlapping) temporary benefits. The [Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md) deferred "Temporary enchantments / alchemy" — this framework fulfills that deferral.

### 7.3 Alchemical Augmentation of Enchantment Crafting

An alchemist can contribute to a magic item's creation as a **support role**:

- **Alchemical Preparation (optional step):** Spend one downtime week preparing reagents for a specific magic item. Roll Mind/Spirit + Crafting vs. the item's Crafting TN.
  - **Success:** The primary crafter gains **+1 boon** on their next crafting roll for that item.
  - **Failure:** No benefit beyond the week's expenses.
  - **Blunder:** Roll on the Alchemy Consequence Table (§3.4). Reagents wasted.

---

## 8. Quick Reference: Player Summary

### Downtime Crafting at a Glance

1. **Choose** a known recipe or design a custom product (Effect + Quality + Delivery).
2. **Provide** 1 Essence + 1 Supply use (+ optional special reagents).
3. **Pay** weekly expenses and **roll** Mind/Spirit + Crafting vs. Crafting TN.
4. **Reduce** the challenge die: weak = −1, strong = −2, critical = −3.
5. **On blunder:** Roll on Alchemy Consequence Table (d6). No progress.
6. **On failure:** No progress (optionally force −1 by doubling expenses).
7. **Repeat** each downtime week until the challenge die reaches 0.
8. **Receive** finished product.

### Field Alchemy at a Glance

1. Must be a **known recipe**. Need Alchemist's Supplies + 1 Essence.
2. Takes **one rest Action** or **10 minutes**. Single item only.
3. Roll Mind/Spirit + Crafting vs. TN with **+1 bane**.
4. Weak = unstable (use quickly). Strong = normal. Critical = no Supply spend.

### Quick Reference Table

| Quality | Challenge Die | TN | Weekly Expenses | Max Field Quality |
|---------|--------------|-----|-----------------|-------------------|
| Q1 | 1 | 6 | 10 | Crafting 0+ |
| Q2 | 2 | 6 | 20 | Crafting 1+ |
| Q3 | 4 | 8 | 50 | Crafting 2+ |
| Q4 | 6 | 10 | 200 | Crafting 3+ |
| Q5 | 8 | 12 | 1,000 | Crafting 4+ |
| Q6 | 10 | 14 | 5,000 | Crafting 5+ |
| Q7 | 12 | 16 | 25,000 | — (downtime only) |

---

## 9. Summary of Recommendations

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| 1 | Adopt modular recipe system (Effect + Quality + Delivery) | Transforms alchemy from static list to flexible crafting | High |
| 2 | Add field alchemy for single-item quick crafting during adventures | Enables mid-adventure alchemy without full downtime | Medium |
| 3 | Support Mind OR Spirit for alchemy skill tests | Opens alchemy to broader archetype range (Apothecary, Shaman, Druid) | Low |
| 4 | Use existing Supply items as generic alchemy catalysts | Connects alchemy to existing equipment economy, simplifies ingredients | Low |
| 5 | Define base catalog vs. mundane alchemicals vs. custom products | Clarifies what alchemists uniquely provide vs. purchasable gear | Low |
| 6 | Integrate travel Forager role as essence acquisition method | Connects adventuring to downtime crafting pipeline | Low |
| 7 | Adopt challenge dice for all downtime alchemical progress tracking | Unifies terminology with Craft an Item and challenge system | Low |
| 8 | Replace old mishap table with Alchemy Consequence Table | Consistent consequence framework across downtime activities | Low |
| 9 | Establish alchemical reagents as materials for enchantment crafting | Creates alchemy ↔ enchantment pipeline and party collaboration | Medium |
| 10 | Define temporary alchemical effects as non-stacking enchantment parallels | Preserves enchantment value while giving alchemy a clear combat niche | Medium |
| 11 | Bronze Age thematic pass on all ingredient and process flavor | Consistent with game world aesthetic | Low |
| 12 | Apply Lingering Fatigue rule to all alchemy consequences | Consistent with downtime fatigue framework | Low |

> **Deferred:** Full recipe catalogue with exact costs per Effect + Delivery combination — separate document.
> **Deferred:** Alchemist-specific talents beyond existing Crafting talents — talent analysis scope.
> **Deferred:** Poison crafting as a distinct profession vs. Alchemist sub-specialty — professions scope.

---

## Appendix A: Base Catalog Conversion

All items on the [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) page are known recipes. The modular system maps them as follows:

| Item Name | Quality | Effect | Delivery | Modular Equivalent |
|-----------|---------|--------|----------|--------------------|
| Healing Salve (weak) | Q1 | Healing | Salve | Healing + Q1 + Salve |
| Acid Vial | Q2 | Damage (acid) | Thrown | Damage (acid) + Q2 + Thrown |
| Antitoxin | Q2 | Protection (poison) | Draught | Protection + Q2 + Draught |
| Flammable Paste | Q2 | Damage (fire) | Coating | Damage (fire) + Q2 + Coating |
| Healing Salve (simple) | Q2 | Healing | Salve | Healing + Q2 + Salve |
| Paralyzing Poison (weak) | Q2 | Poison | Coating | Poison + Q2 + Coating |
| Weapon Poison (weak) | Q2 | Poison (damage) | Coating | Poison + Q2 + Coating |
| Fire Bomb | Q3 | Damage (fire) | Thrown | Damage (fire) + Q3 + Thrown |
| Healing Salve (potent) | Q3 | Healing | Salve | Healing + Q3 + Salve |
| Heightening Potion | Q3 | Enhancement | Draught | Enhancement + Q3 + Draught |
| Paralyzing Poison (decent) | Q3 | Poison | Coating | Poison + Q3 + Coating |
| Potion of Healing (weak) | Q3 | Healing | Draught | Healing + Q3 + Draught |
| Smoke Bomb | Q3 | Concealment | Thrown | Concealment + Q3 + Thrown |
| Weapon Poison (decent) | Q3 | Poison (damage) | Coating | Poison + Q3 + Coating |
| Potion of Healing (decent) | Q4 | Healing | Draught | Healing + Q4 + Draught |
| Weapon Poison (strong) | Q4 | Poison (damage) | Coating | Poison + Q4 + Coating |
| Paralyzing Poison (strong) | Q5 | Poison | Coating | Poison + Q5 + Coating |
| Potion of Healing (strong) | Q5 | Healing | Draught | Healing + Q5 + Draught |

---

## Appendix B: Non-Magical Alchemicals Compatibility

The [Non-Magical Equipment Analysis](./equipment/non-magical-equipment-analysis.md) proposed 17 new alchemical substances at Q1–Q3. These are **mundane preparations** — purchasable by anyone without the Alchemist profession. They can also be crafted by an alchemist using the standard Craft an Item rules. The "Modular Equivalent" column shows how each item maps to the recipe system, demonstrating that the modular framework is compatible with (but does not replace) these purchasable items.

| Item | Quality | Category | Modular Equivalent (if crafted) |
|------|---------|----------|-------------------------------|
| Ochre Marking Powder | Q1 | Sensory | Concealment (reveal) + Q1 + Thrown |
| Woad War Paint | Q1 | Enhancement | Enhancement (intimidation) + Q1 + Salve |
| Blinding Dust | Q2 | Disruption | Concealment + Q2 + Inhaled |
| Stench Gourd | Q2 | Disruption | Poison (nausea) + Q2 + Thrown |
| Resin Adhesive | Q2 | Control | Mobility (impede) + Q2 + Thrown |
| Luminous Paste | Q2 | Utility | Perception (light) + Q2 + Salve |
| Verdigris Blight | Q2 | Sabotage | Unique niche — no standard modular equivalent |
| Smelling Salts | Q2 | Healing | Healing (awaken) + Q2 + Inhaled |
| Honey Poultice | Q2 | Healing | Healing (bleeding) + Q2 + Salve |
| Cooling Salve | Q2 | Healing | Protection (fire) + Q2 + Salve |
| Warming Tonic | Q2 | Enhancement | Protection (cold) + Q2 + Draught |
| Sacred Incense | Q2 | Ritual | Unique niche — mystic skill support |
| Pitch Pot | Q3 | Damage | Damage (fire) + Q3 + Thrown with area denial |
| Natron Solvent | Q3 | Utility | Unique niche — dissolving agent |
| Cat's-Eye Oil | Q3 | Perception | Perception (dim light) + Q3 + Salve |
| Poppy Milk | Q3 | Enhancement | Enhancement (pain suppression) + Q3 + Draught |
| Ironblood Draught | Q3 | Enhancement | Protection (bleeding/poison) + Q3 + Draught |

> **Key Insight:** These mundane alchemicals are available for purchase at Q1–Q3 without requiring Alchemist proficiency. An alchemist's unique value starts at the modular recipe system — creating *custom combinations* (e.g., a thrown healing mist, an inhaled sleep cloud) or *higher-Quality versions* of similar effects that mundane preparations cannot achieve. The base catalog (Appendix A) includes some Q4–Q5 items as always-known recipes because these are established alchemical products in the game world — their formulas are widely taught. Custom products at any Quality still require experimentation.

---

## Appendix C: Example Crafting Walkthroughs

### Downtime: Brewing Fire Bombs (Q3, Batch)

**Setup:**
- Alchemist: Kenet, Crafting 2, Mind d8
- Product: Fire Bomb (Q3, known recipe) — challenge die d6 starting at 4, TN 8
- Materials: Sulfur crystals (Essence: fire, Q3) + 1 use of Advanced Materials (Q3 Supply, 250 coins)
- Weekly expenses: 50 coins/week

**Week 1:** Roll Mind (d8) + Crafting (2) + 1d6 vs. TN 8 → Result: 11 (strong success). Die: 4 → 2.

**Week 2:** Roll → Result: 9 (weak success). Die: 2 → 1.

**Week 3:** Roll → Result: 14 (critical success, −3). Die: 1 → 0. **Complete!** Kenet has Crafting 2, so he could batch-craft a second fire bomb by spending another Supply use.

**Total:** 3 weeks × 50 coins + 1 Supply use + 1 Essence = 150 coins expenses.

### Downtime: Experimenting with a Healing Mist (Q4, Custom)

**Setup:**
- Alchemist: Nima, Crafting 2, Spirit d8
- Custom Product: Healing + Q4 + Thrown (splash). Not a known recipe — requires experimentation.
- Effect: 8 HP to each target in melee range (reduced from 16 HP due to area delivery).
- Materials: Sacred lotus (Essence: healing, Q4) + 1 use of Formidable Materials (Q4 Supply) + carrier reagent (clay vessel for splash delivery)
- Challenge die d6 starting at 6, TN 10, +1 bane for experimentation

**Week 1:** Roll Spirit (d8) + Crafting (2) + 1d6 vs. TN 10, +1 bane → Result: 8 (failure). No progress. Nima chooses not to double expenses.

**Week 2:** Roll → Result: 12 (weak success despite bane). Die: 6 → 5.

**Week 3:** Roll → Result: 11 (weak success). Die: 5 → 4.

**Week 4:** Roll → Result: 13 (strong success). Die: 4 → 2.

**Week 5:** Roll → Result: 4 (blunder!). Roll twice on consequences: Toxic Fumes (1 Lingering Fatigue) + Setback (die increases by 1, back to 3).

**Week 6:** Nima takes Leisure to remove the Lingering Fatigue. No crafting this week.

**Week 7:** Roll → Result: 15 (critical success, −3). Die: 3 → 0. **Complete!**

**Result:** Nima learns the recipe. Future crafts of this healing mist have no experimentation penalty.

### Field: Emergency Antitoxin (Q2)

**Setup:**
- Alchemist: Tadese, Crafting 1, Mind d8
- Known recipe: Antitoxin (Q2)
- Materials: Serpent gland (Essence: antivenom, Q2) + 1 use of Alchemist's Supplies

**During short rest:** Roll Mind (d8) + Crafting (1) + 1d6 vs. TN 6, +1 bane → Result: 9 (strong success). Antitoxin produced normally. The poisoned ally drinks it and is cured.

### Collaborative: Alchemist Supporting Enchantment Crafting

**Setup:**
- Alchemist: Kenet, Crafting 2, Mind d8 — preparing reagents
- Smith: Barak, Crafting 3, Strength d10 — crafting a Q4 enchanted bronze blade
- Kenet spends one downtime week on alchemical preparation

**Kenet's Week:** Roll Mind (d8) + Crafting (2) + 1d6 vs. TN 10 → Result: 12 (success). Barak gains +1 boon on his next crafting roll.

**Barak's Week:** Rolls with +1 boon from Kenet's preparation, improving his chance of a strong or critical success on the magic item's challenge die.

> This models the collaborative workshop: the alchemist refines reagents that the smith hammers into the blade during enchanting. Neither bypasses the challenge die — Kenet's preparation only improves Barak's odds.
