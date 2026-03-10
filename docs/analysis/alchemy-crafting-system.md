# Alchemy & Potion Crafting — Design Analysis

> **Scope:** Modular alchemical crafting — procedures for downtime and field use, ingredient systems built on the existing Supply framework, integration with challenge dice, magic item creation, and enchantment systems.
>
> **References:** [Craft an Item](../06-scenes/04-downtime/activities.md) | [Challenges](../06-scenes/07-challenges/00-overview.md) | [Downtime Overview](../06-scenes/04-downtime/00-overview.md) | [Crafting Professions](../06-scenes/05-crafting-professions.md) | [Magic Item Effects](../04-equipment/07-magic-items/effects.md) | [Enchantments](../04-equipment/07-magic-items/enchantments.md) | [Cost Tables](../04-equipment/07-magic-items/cost-tables.md) | [Supply](../04-equipment/02-equipment/supply.md) | [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) | [Travel](../06-scenes/07-challenges/02-travel.md)
>
> **Related Analyses:** [Downtime System Analysis](./downtime-system-analysis.md) | [Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md) | [Materials Mechanical Effects Analysis](./materials-mechanical-effects-analysis.md) | [Non-Magical Equipment Analysis](./equipment/non-magical-equipment-analysis.md)

---

## 1. Executive Summary

### Key Findings

1. **Modular recipe system.** Products are built from **Effect** + **Quality** + **Delivery Method**. Equipment list alchemy items are always-known recipes; novel combinations require experimentation to discover.
2. **Two crafting speeds.** Downtime crafting uses challenge dice for efficient batch production (1 essence per batch, weekly expenses cover all other materials). Field alchemy is a quick single-roll, single-item procedure that burns through materials faster (1 essence + 1 supply use per item).
3. **Simplified ingredients.** Two components: an **Essence** (determines effect) and **Alchemy Supplies** (generic catalyst from the Supply category, consumed only in field alchemy). Optional **Binder** modifiers extend duration, expand area, or add delayed triggers.
4. **Mind or Spirit.** Alchemy supports **Mind + Crafting** (empirical apothecary) or **Spirit + Crafting** (intuitive herbalist/shaman). Player chooses per roll.
5. **Experimentation as separate challenge.** Discovering new recipes uses its own challenge die — a research effort distinct from the production crafting itself.
6. **Travel integration.** The Forager travel role yields supplies that feed directly into field alchemy. Creature harvesting produces essences.
7. **Three-tier item classification.** Base catalog (Alchemy Equipment page) = always-known recipes. Mundane alchemicals (Non-Magical Equipment Analysis) = purchasable gear. Custom products (modular system) = alchemy-only.
8. **Magic item pipeline.** Alchemical reagents serve as material prerequisites for enchantment crafting. Temporary alchemical effects are non-stacking parallels to permanent enchantments.

### Design Principles

1. **Bronze Age aesthetic** — Clay vessels, bronze mortars, plant resins, mineral powders. No glass beakers, no gunpowder, no modern chemistry.
2. **Modular over static** — Recipes are combinations, not a fixed list. Known recipes are shortcuts; experimentation expands the repertoire.
3. **Two speeds, clear trade-offs** — Downtime is efficient (batch production, lower material cost). Field is fast but expensive and limited.
4. **Bounded power** — Alchemical products are temporary and consumable. They complement magic items and talents, never replace them.
5. **Lingering Fatigue** — Fatigue from alchemy consequences is Lingering Fatigue (see [Downtime System Analysis §3.6](./downtime-system-analysis.md)).

---

## 2. Comparative Analysis

### 2.1 D&D 5e

**Approach:** Tool proficiency (Alchemist's Supplies) with general crafting rules. Potions are treated as magic items; crafting time and cost scale by rarity. The Artificer class (Alchemist subclass) provides class-specific alchemy features.

**Strengths:** Simple; integrates into the existing magic item economy.

**Weaknesses:**
- No modular recipe building — fixed item list only.
- Crafting times are prohibitively long at higher rarities (weeks to months for a single potion).
- No field/quick crafting option outside Artificer class features.
- No ingredient sourcing gameplay — just gold and time.
- Buying is almost always more efficient than crafting, undermining the fantasy.

### 2.2 Pathfinder 2e

**Approach:** Alchemist is a full class with dedicated subsystems. Key mechanics include:
- **Advanced Alchemy:** Create free items at start of day using daily reagent pool. Items last until next daily preparation.
- **Quick Alchemy:** Create items on the fly (1 Action) but they expire at end of turn if not used. Costs reagents.
- **Formulas:** Recipes must be known. New formulas discovered through Research downtime activity, purchased, or found.
- **Categories:** Bombs, elixirs, mutagens, poisons, tools — each with distinct mechanical identity.

**Strengths:**
- Dual-speed crafting (advanced/quick) with clear economic trade-offs.
- Formula system creates progression — discovering recipes feels rewarding.
- Categories give each product type distinct mechanical identity.
- Daily reagent economy provides meaningful resource management.

**Weaknesses:**
- Tied to a specific class — non-Alchemists have very limited access.
- Quick Alchemy's "use it this turn or lose it" can feel restrictive.
- Mutagens (self-buffs with drawbacks) require careful balance work.
- No true modular recipe building — still a fixed formula list, just large.

### 2.3 Lessons for Nexus

| Design Element | D&D 5e | PF2e | Nexus Approach |
|----------------|--------|------|----------------|
| **Crafting speed** | Slow only | Fast + prepared | Field + downtime (§5, §6) |
| **Recipe system** | Fixed list | Fixed formulas | Modular: Effect + Quality + Delivery (§4) |
| **Recipe discovery** | N/A | Research activity | Experimentation challenge die (§7) |
| **Resource economy** | Gold + time | Daily reagent pool | Essence + Supply + weekly expenses |
| **Quick crafting** | None (base rules) | Quick Alchemy (1 Action) | Field Alchemy (1 rest, +1 bane) (§6) |
| **Batch production** | None | Advanced Alchemy (daily) | Downtime batch (Crafting rank items) (§5) |
| **Access** | Tool proficiency | Alchemist class | Alchemist profession (any class) |
| **Buying vs. crafting** | Buying dominates | Balanced | Mundane items buyable; custom requires crafting (§3.3) |

### 2.4 Identified Gaps in Current Proposal

| Gap | Source | Resolution |
|-----|--------|------------|
| Per-tier effect formulas not standardized | PF2e's level-scaling model | §4.1 Effect Table with formulas |
| No binder/modifier system for delivery | PF2e's additive feats on alchemical items | §4.3 Binder Modifiers |
| Experimentation too vague | PF2e's Research downtime activity | §7 Experimentation as challenge die |
| Downtime batch yield unclear | PF2e's daily reagent pool model | §5 batch yield = Crafting rank |
| Field alchemy cost differentiation weak | PF2e's Quick Alchemy reagent cost | §6 field consumes essence + supply per item |

---

## 3. Compatibility with Existing Systems

### 3.1 System Fit

| System | Status | Notes |
|--------|--------|-------|
| **Craft an Item** | ✅ | Downtime alchemy uses the same activity, profession requirement, and weekly expenses. |
| **Crafting Professions** | ✅ | "Alchemist" is an established profession. Proposal extends to Mind/Spirit + Crafting. |
| **Quality Tiers** | ✅ | Products follow Q1–Q7 with standard Crafting rank requirements and TNs. |
| **Supply Items** | ✅ | Existing Supply materials (Q1–Q4) map to field alchemy catalysts. |
| **Challenge Dice** | ✅ | Same framework as all challenge activities (see [Challenges](../06-scenes/07-challenges/00-overview.md)). |
| **Travel Forager** | ✅ | Forager role yields materials that feed into field alchemy. |
| **Consumable Pricing** | ✅ | Existing alchemy item costs are compatible with the per-tier pricing model. |

### 3.2 Gaps Addressed

| Gap | Status | Addressed In |
|-----|--------|-------------|
| No modular recipe building | ❌ → ✅ | §4 |
| No field crafting procedure | ❌ → ✅ | §6 |
| Mind-only skill test | ⚠️ → ✅ | §4 (Mind or Spirit) |
| No recipe discovery mechanic | ❌ → ✅ | §7 |
| No batch production for downtime | ❌ → ✅ | §5 |
| Experimentation = just a bane | ⚠️ → ✅ | §7 (own challenge die) |
| No magic item integration pipeline | ❌ → ✅ | §9 |
| Old mishap table disconnected | ⚠️ → ✅ | §5.3 |

### 3.3 Base Catalog vs. Custom Products

**Base Catalog (Always-Known Recipes):** All items on the [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) page — healing salves, healing potions, weapon poisons, paralyzing poisons, fire/smoke bombs, flammable paste, acid vial, antitoxin, heightening potion. Any alchemist can craft these without experimentation.

**Mundane Alchemicals (Purchasable Gear):** The 17 items from the [Non-Magical Equipment Analysis](./equipment/non-magical-equipment-analysis.md) (blinding dust, stench gourd, cat's-eye oil, ironblood draught, etc.) are Q1–Q3 mundane preparations. They do **not** require the Alchemist profession — they are standard purchasable equipment. An alchemist wanting more potent or custom-delivery versions uses the modular system.

**Custom Products (Alchemy-Only):** Any modular combination (§4) beyond the base catalog. Requires a known recipe or the experimentation procedure (§7). This is the alchemist's unique domain.

---

## 4. Core Mechanics

### 4.1 Skill Test

The Alchemist profession supports two attributes. **The player chooses per roll:**

- **Mind + Crafting** — Empirical approach. Methodical measurement, recorded formulas, careful observation. The apothecary, the temple physician, the court poisoner with clay-tablet notes.
- **Spirit + Crafting** — Intuitive approach. Ancestral knowledge, reading the color of smoke, tasting the mixture, trusting tradition. The village herbalist, the shaman, the wandering healer.

> **Design Note:** Mirrors the Forager travel role (Spirit/Mind + Nature). Opens alchemy to Apothecary, Shaman, Druid, and Oracle archetypes without separate professions.

### 4.2 Effect Table

Each effect has a **per-tier formula** that determines potency at any Quality level. The **Multi-Target** column specifies how the effect changes when delivered via area methods (Thrown, Inhaled).

| Effect | Per-Tier Formula (Single Target) | Multi-Target Adjustment | Duration | Cost/Tier |
|--------|----------------------------------|------------------------|----------|-----------|
| **Healing** | Restore **4 HP × tier** | Half HP (2 × tier per target) | Instant | 15 / 30 / 125 / 375 / 1,250 |
| **Damage** | Deal **+2 × tier** elemental damage (fire, acid, frost, lightning) | Half damage (+1 × tier per target) | Instant | 15 / 30 / 125 / 375 / 1,250 |
| **Poison** | Per poison table (§4.5) | Unchanged (area poisons use Inhaled delivery) | Varies | Per poison table |
| **Enhancement** | Q1–Q3: +1 boon on narrow action category. Q4+: +1 die size to one attribute (max d10) | Reduce duration by one step | Short (Q1–Q3) / Medium (Q4+) | 15 / 30 / 125 / 375 / 1,250 |
| **Protection** | Q1–Q2: +1 boon on saves vs. one element. Q3–Q4: resistance to one damage type. Q5+: immunity to one condition | Reduce duration by one step | Short | 15 / 30 / 125 / 375 / 1,250 |
| **Perception** | Q1: sharpen one sense (+1 boon). Q2: dim light as bright. Q3: darkvision. Q4: see invisible. Q5: tremorsense | Not applicable — self-only | Medium | 15 / 30 / 125 / 375 / 1,250 |
| **Mobility** | Q2: +1 Movement. Q3: water breathing. Q4: spider climb. Q5: gaseous form | Not applicable — self-only | Short (Q2–Q3) / Medium (Q4+) | — / 30 / 125 / 375 / 1,250 (no Q1) |
| **Concealment** | Q1: mask scent/tracks. Q2: muffle sound (+1 boon Stealth). Q3: obscure area (smoke). Q4: invisibility (breaks on attack/cast) | Reduce duration by one step | Short | 15 / 30 / 125 / 375 / 1,250 |

> **Reading the Table:** "4 HP × tier" means a Q3 Healing product restores 12 HP to a single target, or 6 HP per target when delivered as a Thrown splash or Inhaled cloud. Costs listed are base prices for single-target Draught delivery; see §4.3 for delivery cost modifiers.
>
> **On Duration:** Effects with "Instant" duration (Healing, Damage) are resolved immediately — no ongoing effect. For these, the Salve delivery extension has no mechanical impact on the effect itself, but extends the *shelf life* of the applied preparation (the salve remains active on the skin/wound for one step longer before losing potency). Enhancement, Protection, and Concealment effects have timed durations — the Salve extension applies directly to those.

### 4.3 Delivery Methods

Each delivery method has specific rules for how it resolves the product's effect. The **default** delivery for most effects is **Draught** (self-consumed).

**Draught (drink).** Consume as an Action. Affects the drinker only. Can be administered to a willing or unconscious creature in melee range. This is the default delivery — no cost modifier.

**Salve (apply).** Apply to one creature in melee range as an Action. External application on skin, wounds, or armor. The product's duration is extended by one step compared to Draught (e.g., short → medium). *Cost modifier: ×1.*

**Coating (weapon).** Apply to one weapon or one ammo type as a Quick Action. The effect triggers on the next successful hit, then is consumed. Lasts until triggered or for a short duration (whichever comes first). *Cost modifier: ×0.75.*

**Thrown (splash).** Throw a clay vessel as an Action to short range. The vessel shatters on impact. All creatures in melee range of the impact point are affected. Numeric effects are **halved** per the Multi-Target column. Non-numeric effects have their duration reduced by one step. *Cost modifier: ×1.5.*

**Inhaled (vapor).** Deploy as an Action. A cloud of smoke, gas, or powder fills close range for a short duration. Creatures entering or starting their turn in the cloud must save (Spirit + Fortitude vs. product's TN) or be affected. Numeric effects are **halved** per the Multi-Target column. *Cost modifier: ×1.5.*

**Contact (trap).** Apply to a surface or object in melee range as an Action. The first creature to touch the treated surface is affected. The target must save (Spirit + Fortitude vs. product's TN) even for effects that normally auto-apply. Lasts until triggered or for a medium duration. *Cost modifier: ×0.75.*

### 4.4 Binder Modifiers

Binders are optional modifiers that enhance the delivery of a product. Each binder requires a special reagent (purchased or gathered) and increases the product's cost. **One binder per product maximum.**

| Binder | Effect | Reagent Examples | Cost Modifier |
|--------|--------|-----------------|---------------|
| **Stabilizer** | Extends product duration by one step (briefly → short → medium) | Cedar resin, beeswax, rendered tallow | +50% base cost |
| **Intensifier** | Increases numeric effect by +25% (round down). Applied to the base single-target value *before* any multi-target halving. | Concentrated naphtha, distilled venom, temple-blessed water | +100% base cost |
| **Expander** | Increases area of Thrown/Inhaled by one range step (melee → close, close → short) | Animal fat, powdered sulfur, fine mineral dust | +75% base cost |
| **Delayed Release** | After the primary effect ends, a weaker secondary effect triggers (half the original numeric value, briefly duration) | Slow-burning pitch, clay microspheres, layered resin | +50% base cost |

> **Example — Stabilized Healing Draught (Q3):** Base: 12 HP, short duration effects. Stabilizer extends duration to medium. Cost: 125 × 1.5 = ~188 coins. The stabilizer (beeswax seal) keeps the mixture potent for longer between preparation and use.

### 4.5 Poison Table

Poisons use the modular system but have their own scaling due to condition-based mechanics:

| Quality | Save TN | Damage | Condition | Duration | Cost |
|---------|---------|--------|-----------|----------|------|
| Q1 | 6 | +2 poison | **poisoned** | Briefly | 15 |
| Q2 | 8 | +4 poison | **poisoned** | Briefly | 50 |
| Q3 | 10 | +4 poison | **poisoned** + **staggered** | Short | 125 |
| Q4 | 12 | +6 poison | **poisoned** + **staggered** | Short | 375 |
| Q5 | 14 | +6 poison | **stunned** or **paralyzed** | Medium | 1,250 |
| Q6 | 16 | +8 poison | **stunned** or **paralyzed** | Medium | 5,000 |
| Q7 | 18 | +10 poison | **unconscious** | Long | 25,000 |

**Ending Effects:** Target saves at turn end. An ally can treat with Action + Spirit/Mind + Nature vs. poison TN.
**Stacking:** Same poison doesn't stack. Different poisons track separately.

**Poison Delivery Methods:**

| Delivery | Application | Save | Onset |
|----------|-----------|------|-------|
| Injury (coat weapon) | Quick Action to coat weapon/ammo | Strength + Fortitude | On next hit |
| Contact (coat surface) | Action to coat surface/object | Spirit + Fortitude | Immediate on touch |
| Ingested (mix in food/drink) | Must be mixed undetected | Strength + Fortitude | 1d10 minutes |
| Inhaled (release gas) | Action to deploy; close range cloud | Spirit + Fortitude | Immediate; all in cloud save |

### 4.6 Crafting Table

| Quality | Crafting Rank | Challenge Die | Crafting TN | Weekly Expenses | Batch Yield |
|---------|---------------|---------------|-------------|-----------------|-------------|
| Q1 | 0 | d4 @ 1 | Easy (6) | 10 coins | 1 item (rank 0) or Crafting rank |
| Q2 | 0 | d4 @ 2 | Easy (6) | 20 coins | 1 item (rank 0) or Crafting rank |
| Q3 | 1 | d6 @ 4 | Medium (8) | 50 coins | Crafting rank items |
| Q4 | 2 | d6 @ 6 | Hard (10) | 200 coins | Crafting rank items |
| Q5 | 3 | d8 @ 8 | Very Hard (12) | 1,000 coins | Crafting rank items |
| Q6 | 4 | d10 @ 10 | Extreme (14) | 5,000 coins | Crafting rank items |
| Q7 | 5 | d12 @ 12 | Legendary (16) | 25,000 coins | Crafting rank items |

**Challenge Die Reduction:** Weak success = −1. Strong success = −2. Critical success = −3.

**Batch Yield:** When the challenge die reaches 0, the alchemist produces a batch of identical products equal to their **Crafting rank** (minimum 1). At Crafting rank 0, batch yield is always 1. This represents the efficiency of a proper workshop and sustained effort.

### 4.7 Alchemy Consequence Table

On a **blunder** during alchemical crafting, roll d6:

| d6 | Consequence |
|----|-------------|
| 1 | **Toxic Fumes.** Acrid vapors fill the workspace. Gain 1 **Lingering Fatigue**. |
| 2 | **Explosion.** Clay vessel shatters violently. Suffer 2d6 blast damage. Workspace unusable for 1d4 days (50 coins in repairs). |
| 3 | **Contamination.** The batch is ruined. The Essence is destroyed — acquire a new one to continue. |
| 4 | **Unstable Result.** Product appears finished but has an unpredictable side effect (GM determines: skin discoloration, foul odor, brief nausea, etc.). |
| 5 | **Setback.** The reaction stalls. Increase the challenge die by 1 (up to starting value). |
| 6 | **Severe Burn.** Suffer 1 Wound from boiling liquid or caustic splash. Cannot continue crafting until the Wound is healed. |

> **Lingering Fatigue:** Not removed by nightly rest. Removed by Recover, Leisure, or Provide Offering activities.

### 4.8 Talent Synergies

| Talent | Alchemy Application |
|--------|-------------------|
| **Artisan R1** | Re-roll one crafting test per scene (applies to alchemy rolls). |
| **Artisan R2** | When reducing the challenge die by 1+, reduce it by an additional 1. |
| **Artisan R3** | When reducing the challenge die by 1+, reduce it by an additional 2. |
| **Efficient Worker R1** | When rolling a Supply check for field alchemy materials, roll twice and take the higher result. |
| **Efficient Worker R2** | When you finish crafting an alchemical item, regain 1/10 of the item's cost in coins. |
| **Efficient Worker R3** | Every crafting roll reduces the challenge die by at least 1 (even on failure). |

---

## 5. Downtime Crafting

Downtime alchemy uses the **Craft an Item** activity with the Alchemist profession. It is the efficient, workshop-based mode of production.

### 5.1 Procedure

**Step 1 — Choose product and Quality.** Select a known recipe from the base catalog (Appendix A) or a custom product designed via the modular system (§4). If the recipe is unknown, it must first be discovered through experimentation (§7).

**Step 2 — Provide Essence.** Spend **1 Essence** of the appropriate type and Quality (or higher). This single Essence supplies the entire batch — downtime efficiency means one Essence is stretched across multiple products through careful preparation and controlled reactions. No separate Supply item use is needed; weekly expenses cover catalyst materials, workspace costs, and incidental reagents.

**Step 3 — Pay expenses and roll.** Pay weekly expenses per the Crafting Table (§4.6). Roll **Mind/Spirit + Crafting** vs. the product's Crafting TN.

| Result | Effect |
|--------|--------|
| **Blunder** | No progress. Roll on Alchemy Consequence Table (§4.7). |
| **Failure** | No progress. Optionally force −1 by doubling this week's expenses. |
| **Weak Success** | Challenge die −1. |
| **Strong Success** | Challenge die −2. |
| **Critical Success** | Challenge die −3. |

**Step 4 — Track progress.** When the challenge die reaches **0**, the batch is complete. Receive **Crafting rank identical products** (minimum 1). If the die has not reached 0, continue next downtime week.

> **Example — Brewing Healing Potions (Q3):**
> Kesra (Crafting 2, Spirit d8) brews healing potions (known recipe). She places a d6 at 4, provides 1 sacred lotus essence (Q3 healing), and pays 50 coins/week.
> *Week 1:* Strong success → die drops 4 → 2.
> *Week 2:* Weak success → die drops 2 → 1.
> *Week 3:* Weak success → die reaches 0. Batch complete: **2 healing potions** (Crafting rank 2). Total cost: 3 × 50 = 150 coins expenses + 1 essence.

### 5.2 Key Properties

- **1 Essence per batch.** A single Essence supplies the whole production run. This is the primary efficiency advantage over field alchemy.
- **Weekly expenses cover materials.** No separate Supply item consumption. The weekly expenses represent workspace upkeep, catalyst replenishment, fuel, and incidental reagents.
- **Batch yield = Crafting rank.** Higher skill produces more per batch. A Crafting 1 alchemist makes 1 item; a Crafting 4 alchemist makes 4 identical items from the same effort.
- **Optional binders** can be applied to the entire batch (one binder type per batch). Add the binder cost modifier to the base cost of each item in the batch.

---

## 6. Field Alchemy

Field alchemy is quick, improvised crafting during adventures — crouched behind a ruin wall, working by firelight, or hastily mixing reagents before battle.

### 6.1 Requirements

- **Alchemist profession** and **Alchemist's Supplies** (50 coins, 1 load — bronze mortar, clay vessels, reed stirring rods, common reagents).
- The product must be a **known recipe** (base catalog or previously discovered). No experimentation in the field.
- **1 Essence** of appropriate type and Quality (consumed regardless of outcome).
- **1 use of Alchemy Supplies** (Supply die — consumed on all results except critical success).

### 6.2 Procedure

Field alchemy takes **one Action during a rest** (short or long) or **10 minutes** of uninterrupted work. It produces a **single item**.

Roll **Mind/Spirit + Crafting** vs. the product's Crafting TN with **+1 bane**.

| Result | Outcome |
|--------|---------|
| **Blunder** | Essence destroyed. Supply use consumed. Roll on Alchemy Consequence Table. |
| **Failure** | Mixture fails. Essence consumed. Supply use consumed. *(Improvised conditions prevent salvaging a failed reaction.)* |
| **Weak Success** | Product is **unstable** — must be used within a short duration or it becomes inert. Supply use consumed. |
| **Strong Success** | Product created normally. Supply use consumed. |
| **Critical Success** | Product created normally. **No Supply use consumed** (the alchemist's expertise conserves materials). |

### 6.3 Limitations

- **One item per rest.** No mass production in the field.
- **Known recipes only.** No experimentation under pressure.
- **Maximum Quality = Crafting rank + 1.** A Crafting 2 alchemist can field-craft up to Q3.
- **No challenge die.** Resolved in a single roll.
- **Both Essence and Supply consumed.** This is the key efficiency penalty vs. downtime crafting.

### 6.4 Field vs. Downtime Comparison

| Aspect | Field Alchemy | Downtime Alchemy |
|--------|--------------|-----------------|
| **Time** | 1 rest / 10 minutes | 1+ weeks (challenge die) |
| **Output** | Single item | Batch (Crafting rank items) |
| **Essence cost** | 1 per item | 1 per batch |
| **Supply cost** | 1 use per item | None (expenses cover it) |
| **Recipes** | Known only | Known or newly discovered (§7) |
| **Quality cap** | Crafting rank + 1 | Per Crafting Table |
| **Roll modifier** | +1 bane | None |
| **Best for** | Emergency healing, mid-adventure poisons, quick field needs | Stockpiling, experimentation, high-Quality products, batch efficiency |

---

## 7. Recipe Discovery (Experimentation)

When an alchemist wants to create a product that is **not** a known recipe — a novel Effect + Quality + Delivery combination — they must first experiment to discover the formula. This is a **separate challenge** from the actual crafting of the product.

### 7.1 Procedure

**Step 1 — Define the target product.** The alchemist describes the intended combination (e.g., Healing + Q4 + Thrown). The GM confirms it is a valid combination.

**Step 2 — Set experimentation challenge die.** Based on the target recipe's Quality:

| Recipe Quality | Experimentation Die | Experimentation TN | Weekly Expenses |
|---------------|--------------------|--------------------|-----------------|
| Q1–Q2 | d4 @ 2 | Easy (6) | 10 coins |
| Q3 | d4 @ 4 | Medium (8) | 25 coins |
| Q4 | d6 @ 4 | Hard (10) | 100 coins |
| Q5 | d6 @ 6 | Very Hard (12) | 500 coins |
| Q6 | d8 @ 8 | Extreme (14) | 2,500 coins |
| Q7 | d10 @ 10 | Legendary (16) | 10,000 coins |

**Step 3 — Experiment each week.** Pay weekly expenses (covering experimental materials — partial essences, test batches, discarded attempts) and roll **Mind/Spirit + Crafting** vs. Experimentation TN.

| Result | Effect |
|--------|--------|
| **Blunder** | No progress. Experimentation die increases by 1 (up to starting value). Consume 1 additional Essence of the target type (this is a separate cost beyond weekly expenses — the blunder destroys a full Essence in a catastrophic failed experiment). |
| **Failure** | No progress. |
| **Weak Success** | Experimentation die −1. |
| **Strong Success** | Experimentation die −2. |
| **Critical Success** | Experimentation die −3. |

**Step 4 — Recipe learned.** When the experimentation die reaches **0**, the alchemist permanently learns the recipe. They can now craft it normally via downtime (§5) or field alchemy (§6) — no penalty, no additional experimentation.

### 7.2 Key Properties

- **Experimentation produces no product.** It only unlocks the recipe. The alchemist must then craft the item separately.
- **Experimentation costs are lower** than full crafting expenses (representing small-scale test batches rather than full production runs).
- **Blunders cost Essence.** Failed experiments waste material — a meaningful risk that encourages careful planning.
- **Recipes from other sources.** Recipes can also be learned from mentors, ancient formula tablets, or purchased from master alchemists — bypassing experimentation entirely.

### 7.3 Known Recipe Rule

All items on the [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) page are **always-known recipes** for any character with the Alchemist profession. No experimentation required for base catalog items.

> **Example — Discovering a Healing Mist (Q4 Thrown):**
> Nima (Crafting 2, Spirit d8) wants to create a thrown healing cloud — Healing + Q4 + Thrown. This isn't in the base catalog.
> She starts an experimentation challenge: d6 @ 4, TN 10, 100 coins/week.
> *Week 1:* Failure — no progress.
> *Week 2:* Weak success — die 4 → 3.
> *Week 3:* Strong success — die 3 → 1.
> *Week 4:* Weak success — die 1 → 0. Recipe learned!
> Now Nima can craft the healing mist using standard downtime crafting (d6 @ 6, TN 10, 200 coins/week, 1 essence for a batch of 2).

---

## 8. Ingredient Acquisition

### 8.1 Essence Cost Reference

| Quality | Essence Cost | Example Sources (Bronze Age) |
|---------|-------------|------------------------------|
| Q1 | 1–5 coins | Common herbs, mineral ash, river clay, dried beetles |
| Q2 | 5–25 coins | Medicinal plants, copper dust, charcoal, animal glands |
| Q3 | 40–100 coins | Rare temple flowers, monster blood, volcanic mineral salts |
| Q4 | 200–400 coins | Dragon bile, troll blood, giant organs, deep-earth crystals |
| Q5 | 800–1,500 coins | Phoenix ash, celestial minerals, primordial tree sap |
| Q6 | 4,000–8,000 coins | Elder dragon parts, divine ichor, meteor fragments |
| Q7 | 15,000+ coins | Legendary materials, cosmic essences, god-touched substances |

### 8.2 Gather Ingredients (Downtime Activity)

Roll **Mind/Spirit + Nature** or **Agility/Spirit + Survival** (player's choice).

| Min. Settlement Rank | Requirements | Expenses |
|----------------------|-------------|---------|
| 1 (Hamlet) | Nature or Survival skill | 0 coins/week |

| Target Quality | Gathering TN | Yield |
|---------------|-------------|-------|
| Q1 | Easy (6) | 1d6 essences |
| Q2 | Easy (6) | 1d4 essences |
| Q3 | Medium (8) | 1d3 essences |
| Q4 | Hard (10) | 1d2 essences |
| Q5 | Very Hard (12) | 1 essence |
| Q6 | Extreme (14) | 1 essence |
| Q7 | Legendary (16) | 1 essence |

**Blunder:** No yield. Roll on Gathering Complication table:

| d6 | Complication |
|----|-------------|
| 1 | **Poisonous Contact.** Save Spirit + Fortitude vs. TN 10 or gain **poisoned** (short). 1 Lingering Fatigue on failure. |
| 2 | **Hostile Creature.** Stumble into a creature's territory. GM introduces a brief combat or tense escape. |
| 3 | **Spoiled Yield.** Ingredients contaminated by weather or parasites. Lose any gathered this week. |
| 4 | **Unwanted Attention.** A rival, local authority, or faction notices your foraging. Minor complication. |
| 5 | **Lost Time.** Cannot use this activity again next week. |
| 6 | **Nothing Extra.** The blunder is punishment enough. |

**Failure:** No yield. **Weak:** Yield as listed. **Strong:** Yield + 1 extra essence one tier lower. **Critical:** Double yield.

### 8.3 Travel Foraging

The **Forager** travel role (see [Travel](../06-scenes/07-challenges/02-travel.md)) yields useful materials:

- **Useful materials bonus:** "You gain primitive materials (d6)." These are Q1 Alchemy Supplies — valid catalysts for Q1 field alchemy.
- **Edible plants bonus:** An alchemist can repurpose edible plants as Q1 healing or utility essences (GM discretion).

**Dedicated Essence Foraging:** An alchemist filling the Forager role may **forage for essences instead of food/water**:

- **Weak:** 1 essence at terrain tier. **Strong:** 1d3 essences at terrain tier. **Critical:** 1d3 at terrain tier + 1 essence one tier higher.

| Terrain | Ingredient Tier | Examples |
|---------|----------------|---------|
| Barren desert, salt flats, open sea | Q1 | Mineral salts, dried lichens, sand beetle husks |
| Scrubland, dry steppe, rocky hills | Q1–Q2 | Hardy herbs, copper-bearing stones, scorpion venom |
| Fertile river valley, temperate forest | Q2 | Medicinal plants, tree resins, common animal parts |
| Lush jungle, tropical marsh, deep cave | Q2–Q3 | Rare flowers, luminous fungi, exotic reptile glands |
| Sacred grove, spirit-touched oasis | Q3–Q4 | Temple flowers, spirit-infused sap, elemental crystals |
| Primordial wasteland, planar rift zone | Q4+ | Dragon-territory flora, meteor-touched minerals |

### 8.4 Creature Harvesting

Harvested creature parts count as essences at the creature's tier Quality:

- **Venomous creature** → poison essences.
- **Elemental creature** (fire salamander, frost serpent) → elemental damage essences.
- **Regenerating creature** (troll, hydra) → healing essences.
- **Magical creature** → essences appropriate to its nature (GM judgment).

Successful harvest yields **1d4 essence units** per creature.

### 8.5 Market Purchase

| Settlement Rank | Max Essence Quality | Notes |
|----------------|--------------------|----|
| 1 (Hamlet) | Q2 | Common herbs, mineral powders |
| 2 (Village) | Q3 | Rare plants, monster-derived ingredients |
| 3 (Town) | Q4 | Specialty merchants, temple apothecaries |
| 4 (City) | Q5 | Master alchemists, guild storehouses |
| 5+ (Capital) | Q6 | Royal apothecaries, planar materials (rare, GM discretion) |

Q7 essences are never purchasable — they must be quested for.

---

## 9. Magic Item Integration

See [Enchantments & Magic Items Analysis](./enchantments-magic-items-analysis.md) for the full enchantment framework.

### 9.1 Reagents as Enchantment Materials

Higher-Quality magic items require magical ingredients. **Alchemical essences and refined reagents satisfy this requirement:**

| Magic Item Quality | Reagent Role | Example |
|-------------------|-------------|---------|
| Q3 (Masterwork) | None needed | Fine bronze, seasoned cedar |
| Q4 (Lesser Magic) | Activating agent | Volcanic mineral salts |
| Q5 (Potent Magic) | Binding agent | Phoenix ash |
| Q6 (Greater Magic) | Core magical component | Elder dragon bile |
| Q7+ (Legendary) | Essential catalyst | Cosmic essence, divine ichor |

### 9.2 Temporary Enchantment Parallels

Some alchemical products function as **temporary enchantments**. They do **not** stack with permanent enchantments of the same type (highest bonus applies).

| Product Type | Enchantment Parallel | Stacking |
|-------------|---------------------|----------|
| Weapon Coating (fire/frost/acid) | Flaming/Frost/Corrosive weapon | Higher applies |
| Armor Oil (resistance) | Tough armor | Higher applies |
| Attribute Draught | "of Might/Swiftness" wearable | Higher applies |
| Flammable Paste | Temporary weapon property | Does not stack |

### 9.3 Collaborative Enchantment Support

An alchemist can support magic item creation:

- Spend one downtime week preparing reagents for a specific magic item.
- Roll Mind/Spirit + Crafting vs. the item's Crafting TN.
- **Success:** Primary crafter gains **+1 boon** on their next crafting roll.
- **Failure:** No benefit. **Blunder:** Roll on Alchemy Consequence Table; reagents wasted.

---

## 10. Quick Reference

### Downtime Crafting (8 Steps)

1. **Choose** a known recipe or design a custom product (Effect + Quality + Delivery).
2. **Discover** the recipe first if it's not known (§7 — separate experimentation challenge).
3. **Provide** 1 Essence (covers the entire batch).
4. **Pay** weekly expenses and **roll** Mind/Spirit + Crafting vs. TN.
5. **Reduce** challenge die: weak −1, strong −2, critical −3.
6. **On blunder:** Roll Alchemy Consequence Table. No progress.
7. **Repeat** each week until challenge die reaches 0.
8. **Receive** batch of Crafting rank identical products.

### Field Alchemy (4 Steps)

1. Must be **known recipe**. Need Alchemist's Supplies + 1 Essence.
2. Takes **1 rest Action** or **10 minutes**. Single item only.
3. Roll Mind/Spirit + Crafting vs. TN with **+1 bane**. Essence always consumed. Supply use consumed (except critical).
4. Weak = unstable (use quickly). Strong/Critical = normal product.

### Quick Reference Table

| Quality | Challenge Die | TN | Weekly Expenses | Batch Yield | Field Max Quality |
|---------|--------------|-----|-----------------|-------------|-------------------|
| Q1 | d4 @ 1 | 6 | 10 | Crafting rank | Crafting 0+ |
| Q2 | d4 @ 2 | 6 | 20 | Crafting rank | Crafting 1+ |
| Q3 | d6 @ 4 | 8 | 50 | Crafting rank | Crafting 2+ |
| Q4 | d6 @ 6 | 10 | 200 | Crafting rank | Crafting 3+ |
| Q5 | d8 @ 8 | 12 | 1,000 | Crafting rank | Crafting 4+ |
| Q6 | d10 @ 10 | 14 | 5,000 | Crafting rank | Crafting 5+ |
| Q7 | d12 @ 12 | 16 | 25,000 | — (downtime only) | — |

---

## 11. Summary of Recommendations

| # | Recommendation | Priority | Effort |
|---|---------------|----------|--------|
| 1 | Adopt modular recipe system (Effect + Quality + Delivery) with per-tier formulas | High | High |
| 2 | Implement dual-speed crafting: downtime batch (1 essence/batch) vs. field (1 essence + 1 supply/item) | High | Medium |
| 3 | Add experimentation as separate challenge die for recipe discovery | High | Medium |
| 4 | Support Mind or Spirit for alchemy skill tests | Medium | Low |
| 5 | Add binder modifiers for delivery enhancement (stabilizer, intensifier, expander, delayed release) | Medium | Medium |
| 6 | Use existing Supply items as field alchemy catalysts | Medium | Low |
| 7 | Integrate travel Forager role as essence acquisition method | Medium | Low |
| 8 | Establish alchemical reagents as enchantment crafting materials | Medium | Medium |
| 9 | Define temporary alchemical effects as non-stacking enchantment parallels | Medium | Low |
| 10 | Adopt challenge dice for all downtime alchemy progress tracking | Low | Low |
| 11 | Replace old mishap table with Alchemy Consequence Table | Low | Low |
| 12 | Bronze Age thematic pass on all ingredients and processes | Low | Low |

**Deferred:** Full recipe catalogue with exact cost per combination — separate document.
**Deferred:** Alchemist-specific talents beyond existing Crafting talents — talent analysis scope.
**Deferred:** Poison crafting as distinct profession vs. Alchemist sub-specialty — professions scope.

---

## Appendix A: Base Catalog Conversion

All items on the [Alchemy Equipment](../04-equipment/02-equipment/alchemy.md) page are known recipes:

| Item | Q | Effect | Delivery | Modular Formula |
|------|---|--------|----------|----------------|
| Healing Salve (weak) | 1 | Healing | Salve | Healing + Q1 + Salve |
| Acid Vial | 2 | Damage (acid) | Thrown | Damage + Q2 + Thrown |
| Antitoxin | 2 | Protection (poison) | Draught | Protection + Q2 + Draught |
| Flammable Paste | 2 | Damage (fire) | Coating | Damage + Q2 + Coating |
| Healing Salve (simple) | 2 | Healing | Salve | Healing + Q2 + Salve |
| Paralyzing Poison (weak) | 2 | Poison | Coating | Poison + Q2 + Coating |
| Weapon Poison (weak) | 2 | Poison | Coating | Poison + Q2 + Coating |
| Fire Bomb | 3 | Damage (fire) | Thrown | Damage + Q3 + Thrown |
| Healing Salve (potent) | 3 | Healing | Salve | Healing + Q3 + Salve |
| Heightening Potion | 3 | Enhancement | Draught | Enhancement + Q3 + Draught |
| Paralyzing Poison (decent) | 3 | Poison | Coating | Poison + Q3 + Coating |
| Potion of Healing (weak) | 3 | Healing | Draught | Healing + Q3 + Draught |
| Smoke Bomb | 3 | Concealment | Thrown | Concealment + Q3 + Thrown |
| Weapon Poison (decent) | 3 | Poison | Coating | Poison + Q3 + Coating |
| Potion of Healing (decent) | 4 | Healing | Draught | Healing + Q4 + Draught |
| Weapon Poison (strong) | 4 | Poison | Coating | Poison + Q4 + Coating |
| Paralyzing Poison (strong) | 5 | Poison | Coating | Poison + Q5 + Coating |
| Potion of Healing (strong) | 5 | Healing | Draught | Healing + Q5 + Draught |

> **Compatibility Note — Healing Values:** The per-tier healing formula (4 HP × tier) produces Q3: 12 HP, Q4: 16 HP, Q5: 20 HP. Existing equipment values are 8/16/24 HP. The modular formula provides a consistent progression that should supersede the current values. **This is an intentional breaking change** — the Q4 value (16 HP) is already aligned; Q3 increases from 8 → 12 HP, Q5 decreases from 24 → 20 HP. The Equipment page should be updated once this analysis is approved. The per-tier formula enables the modular system to work predictably for all custom combinations (e.g., thrown healing mists, healing salves at novel tiers).

---

## Appendix B: Non-Magical Alchemicals Compatibility

The 17 items from the [Non-Magical Equipment Analysis](./equipment/non-magical-equipment-analysis.md) are purchasable mundane preparations (Q1–Q3). They do **not** require the Alchemist profession.

| Item | Q | Modular Equivalent |
|------|---|-------------------|
| Ochre Marking Powder | 1 | Concealment (reveal) + Q1 + Thrown |
| Woad War Paint | 1 | Enhancement (intimidation) + Q1 + Salve |
| Blinding Dust | 2 | Concealment + Q2 + Inhaled |
| Stench Gourd | 2 | Poison (nausea) + Q2 + Thrown |
| Resin Adhesive | 2 | Mobility (impede) + Q2 + Thrown |
| Luminous Paste | 2 | Perception (light) + Q2 + Salve |
| Verdigris Blight | 2 | Unique niche — no standard equivalent |
| Smelling Salts | 2 | Healing (awaken) + Q2 + Inhaled |
| Honey Poultice | 2 | Healing (bleeding) + Q2 + Salve |
| Cooling Salve | 2 | Protection (fire) + Q2 + Salve |
| Warming Tonic | 2 | Protection (cold) + Q2 + Draught |
| Sacred Incense | 2 | Unique niche — mystic support |
| Pitch Pot | 3 | Damage (fire) + Q3 + Thrown |
| Natron Solvent | 3 | Unique niche — dissolving agent |
| Cat's-Eye Oil | 3 | Perception (dim light) + Q3 + Salve |
| Poppy Milk | 3 | Enhancement (pain suppression) + Q3 + Draught |
| Ironblood Draught | 3 | Protection (bleeding/poison) + Q3 + Draught |

> **Tier boundary:** Mundane alchemicals are purchasable at Q1–Q3. The alchemist's value starts with custom combinations and Q4+ products.

---

## Appendix C: Worked Examples

### Example 1: Downtime Batch — Fire Bombs (Q3)

**Setup:** Kenet (Crafting 2, Mind d8). Fire Bomb (Q3, known). Challenge d6 @ 4, TN 8, 50 coins/week. 1 sulfur crystal essence (Q3 fire).

*Week 1:* Roll 11 (strong). Die: 4 → 2.
*Week 2:* Roll 9 (weak). Die: 2 → 1.
*Week 3:* Roll 14 (critical). Die: 1 → 0. **Complete!**

**Result:** 2 fire bombs (Crafting rank 2). Total: 150 coins expenses + 1 essence.

### Example 2: Experimentation — Healing Mist (Q4 Thrown)

**Setup:** Nima (Crafting 2, Spirit d8). Healing + Q4 + Thrown is unknown — must experiment first.

**Phase 1 — Experimentation:** d6 @ 4, TN 10, 100 coins/week.
*Week 1:* Roll 8 (failure). No progress.
*Week 2:* Roll 11 (weak). Die: 4 → 3.
*Week 3:* Roll 13 (strong). Die: 3 → 1.
*Week 4:* Roll 10 (weak). Die: 1 → 0. **Recipe learned!**
Experimentation cost: 400 coins expenses.

**Phase 2 — Crafting:** d6 @ 6, TN 10, 200 coins/week. 1 sacred lotus essence (Q4 healing).
*Week 5:* Roll 12 (strong). Die: 6 → 4.
*Week 6:* Roll 14 (critical). Die: 4 → 1.
*Week 7:* Roll 10 (weak). Die: 1 → 0. **Complete!**

**Result:** 2 healing mists (Crafting rank 2). Each: Healing + Q4 + Thrown = 8 HP per target in melee range of impact (16 HP single-target halved for area delivery). **Grand total:** 400 coins experimentation expenses + 600 coins crafting expenses + 1 production essence = 1,000 coins + 1 essence. (Had Nima blundered during experimentation, she would have also lost an additional essence to a failed experiment.)

### Example 3: Field Emergency — Antitoxin (Q2)

**Setup:** Tadese (Crafting 1, Mind d8). Antitoxin (Q2, known). TN 6 + 1 bane. 1 serpent gland essence (Q2). 1 use Alchemist's Supplies.

**During short rest:** Roll Mind + Crafting vs. TN 6, +1 bane → Result: 9 (strong). Antitoxin produced normally. Essence consumed, Supply use consumed. The poisoned ally drinks it and is cured.

### Example 4: Collaborative Enchantment Support

**Setup:** Kenet (Crafting 2, Mind d8) prepares reagents. Barak (Crafting 3, Strength d10) crafts a Q4 enchanted bronze blade.

*Kenet's week:* Roll Mind + Crafting vs. TN 10 → 12 (success). Barak gains +1 boon on his next crafting roll.
*Barak's next roll:* Uses +1 boon from Kenet's preparation, improving odds of strong/critical success on the weapon's challenge die.
