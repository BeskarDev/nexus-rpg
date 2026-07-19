# Magic Item System Analysis — Enchantments & Magic Items

> **Scope:** Enchantment categories, options, scaling, gaps, the slotless utility item space, and special materials (added 2026-07-19). Successor to `docs/analysis/enchantments-magic-items-analysis.md` (converted to this folder structure and fully re-evaluated on 2026-07-19). Per-category design catalogs live in the [catalogs/](catalogs/weapons.md) folder.
>
> **References:** [Enchantments](../../04-equipment/07-magic-items/enchantments.md) | [Cost Tables](../../04-equipment/07-magic-items/cost-tables.md) | [Effects](../../04-equipment/07-magic-items/effects.md) | [Materials](../../04-equipment/07-magic-items/materials.md) | [Curses](../../04-equipment/07-magic-items/curses.mdx) | [Travel](../../06-scenes/07-challenges/02-travel.md) | [Social Intrigue](../../06-scenes/07-challenges/01-social-intrigue.md) | [Field Alchemy](../../06-scenes/05-crafting-professions/01-field-alchemy.md) | [Harvesting](../../06-scenes/06-harvesting-creature-parts.md) | [Conditions](../../05-combat/04-conditions.md)
>
> **Related analyses:** [Materials Mechanical Effects](../materials-mechanical-effects-analysis.md) | [Alchemy & Potion Crafting](../alchemy-crafting-system.md) | [Non-Magical Equipment](../equipment/non-magical-equipment-analysis.md) | [Spell System](../spells/SPELL_SYSTEM_ANALYSIS.md) (§6 damage, §15B acid, §16 healing)
>
> **Binding design rules:** `.claude/skills/magic-item-design/references/designer-principles.md` (principles 1–20). This analysis predates that corpus in origin; the 2026-07-19 re-evaluation audited every proposal against it.

## Design Catalogs

| Catalog | Contents |
|---------|----------|
| [catalogs/ammo.md](catalogs/ammo.md) | Ammo enchantments — current 6 → proposed 10 |
| [catalogs/weapons.md](catalogs/weapons.md) | Weapon enchantments — current 12 → proposed 20 |
| [catalogs/armor.md](catalogs/armor.md) | Armor enchantments (post-split) — proposed 10 |
| [catalogs/shields.md](catalogs/shields.md) | Shield enchantments (post-split) — proposed 10 |
| [catalogs/wearables.md](catalogs/wearables.md) | Wearable enchantments — current 20 → proposed 25 + expansion candidates |
| [catalogs/utility-items.md](catalogs/utility-items.md) | Containers, everyday objects, instruments — 10 each |
| [catalogs/consumables.md](catalogs/consumables.md) | Body parts & natural consumables — 20, harvest tie-in |
| [catalogs/q8-artifacts.md](catalogs/q8-artifacts.md) | Q8 artifact construction framework for GMs — capstone/secondary/sentience/price/undoing menus, worked example |
| [catalogs/materials.md](catalogs/materials.md) | Special materials implementation catalog — Mithril rework + all 19 unfinished Greater/Legendary materials, coverage variance matrix |

---

## 1. Executive Summary

### Structural Recommendations (unchanged from v1, still pending)

1. **Split armor and shield enchantments** into separate d100 tables with distinct identities (armor → passive/reactive defense; shields → active defense and ally protection).
2. **Remove the spell catalyst enchantment table entirely** — catalysts are slotless items integrated into a slot; separate catalyst enchantments create a stacking problem. Catalysts use the enchantment of their slot item (wearable list where applicable).
3. **Convert all tables to d100** — targets: Ammo 10, Weapon 20, Armor 10, Shield 10, Wearable 25.
4. **Expand non-combat coverage on the wearable table** — only 2 of 50 published enchantments touch Travel, Exploration, or Social play; the wearable table absorbs all non-combat effects so combat tables keep their identity.
5. **Minor Enchantment rule** — Q4-only binary enchantments tagged `[minor]` may sit on a Q5+ item alongside its primary enchantment at their normal Q4 cost.
6. **Open the Q7–Q8 space** — the cost tables reach Q8 but no published enchantment scales past Q6. Q7 (mortal crafting ceiling) integrates into the normal category tables; Q8 is the artifact tier with its own GM construction framework ([catalogs/q8-artifacts.md](catalogs/q8-artifacts.md)).

### What the 2026-07-19 Re-Evaluation Changed

The game moved substantially since v1; the proposal catalogs were overhauled accordingly:

1. **Formerly deferred work now exists elsewhere.** Materials → `materials-mechanical-effects-analysis.md`. Temporary enchantments/alchemy → `alchemy-crafting-system.md` plus the *published* Field Alchemy system. Curses → published subsystem. All four v1 deferral notes are resolved.
2. **New published systems the catalogs now build on:** Travel (6 roles, Supply Checks, weather, checkpoints, Fatigue sources), Social Intrigue (Interest, Patience, Motivations, Pitfalls), Harvesting Creature Parts, Field Alchemy, and the official **marked (X)** and **distracted** conditions.
3. **The designer-principles corpus (20 binding rules) forced redesigns:** every static-TN save was scrubbed (principle 9), high-impact on-hit conditions gained the attack-roll-vs-Resist gate (principle 16), immunities became triggered/limited with circumventions (principle 13), and every proposal was validated against current talent text, not remembered talent text (principle 20).
4. **Concrete proposal corrections** — full list in [Appendix E](#appendix-e-re-evaluation-changelog).
5. **Two-track spell-access ranks adopted (owner decision, 2026-07-19):** repeatable access (wands/staffs) keeps quality ≈ rank; scarce access (scrolls, storing enchantments, single-use consumables) reaches quality-equivalent +1 rank so first-find treasure matches what casters can already cast. See §3.7.

### Role Categories

| Role | Description |
|------|-------------|
| **Offense** | Threatens, damages, or removes opposition |
| **Defense** | Protects, mitigates harm, or creates safe posture |
| **Healing** | Restores or relieves harm |
| **Control** | Shapes enemy behaviour or the environment |
| **Support** | Empowers allies or reshapes social outcomes |
| **Utility** | Exploration, knowledge, travel, resources, scene tools |

---

## 2. Current System Catalogue (verified against docs 2026-07-19)

### 2.1 Magic Item Types

| Item Type | Quality | Key Mechanic |
|-----------|---------|--------------|
| Weapons | Q3–Q8 | +1 to +5 weapon damage, durability |
| Armor/Shields/Helmets | Q4–Q8 | +1 to +5 AV, durability |
| Ammo | Q3–Q8 | +1 to +6 flat damage bonus (per-piece for enchanted) |
| Spell Scrolls | Q3–Q8 | Single-use spell, rank 0–5 |
| Wands | Q4–Q8 | One spell, 4–20 charges, catalyst bonus |
| Staffs | Q4–Q8 | 3–6 spells, 6–30 charges, catalyst bonus |
| Wearables | Q4–Q6 | Enchantment-only (skip magic item base cost) |

### 2.2 Current Enchantment Tables

Unchanged since v1 — the published tables still hold **50 entries**: Ammo 6 (d6), Weapon 12 (d12), Spell Catalyst 6 (d6), Armor/Shield shared 6 (d6), Wearable 20 (d20). Full current-state tables with audit findings live in each catalog file.

### 2.3 Cost Edge Cases

- **Wearables skip Magic Item Base Cost** — base item + enchantment only (Q4 amulet of protection = 50 + 1,000 = 1,050 coins).
- **Morphing sums both base weapons**, pays magic base and enchantment once.
- **Enchanted ammo prices per batch of 3 pieces** (3 Q4 burning arrows = 15 + 150 + 150 = 315 coins).

### 2.4 Doc Defects Found During Verification (fix independently of any proposal)

1. **`cost-tables.md` has a duplicated Q8 row** in the Enchantment Cost table with conflicting wearable values (100,000 vs. 75,000 coins). One row must go; recommend keeping 75,000 (¾ of one-handed, matching the wearable discount pattern at Q8 in the Special Material table... verify intent with owner — the other five tiers show wearable = one-handed, so 100,000 may be the intended value and the 75,000 row the stray).
2. **`effects.md` requires the talent "Spell Scribe"** for scroll crafting, but no such talent exists in `docs/03-statistics/06-talents/`. Either the talent is missing or the requirement is stale.
3. **`enchantments.md` typos:** catalyst entry "g**lowing**" has broken bold markup; catalyst "deflecting" lacks a quality tag (every other entry has one).

---

## 3. Critical Analysis

### 3.1 Armor/Shield Split

Armor and shields share one 6-entry table despite being mechanically distinct (shields dual-classify as weapons and armor). The split gives each an honest identity — see [catalogs/armor.md](catalogs/armor.md) and [catalogs/shields.md](catalogs/shields.md). Anchoring migrates to shields (active retaliation); the other five stay armor-side.

### 3.2 Catalyst Table Removal

**Framing (owner-refined 2026-07-19, principle 24): enchantments never sit on a catalyst — they sit on the host item the catalyst is part of.** A catalyst integrated into an amulet or sword benefits from that host's enchantment; a fixed, inseparable casting implement (wand, staff, orb) is its own host. A separate catalyst enchantment table therefore stacks a second enchantment onto one slot, violating the one-enchantment rule. **Remove the table entirely; no migrations.** The same host logic scopes catalyst *material* effects (see [catalogs/materials.md](catalogs/materials.md), rule 8).

| Current Catalyst | Disposition |
|-----------------|-------------|
| Storing | Remove — redundant with wands/staffs and the wearable spell-storing pair |
| Deflecting | Remove — reclassify as a weapon property if wanted |
| Glowing | Remove — make light a baseline cosmetic option of magic items |
| Stabilizing | Remove — overlaps wand/staff charge economy, stacking risk |
| Volatile | Remove — spell damage boosts belong to the slot item's enchantment |
| Infused | Remove — already on the weapon table |

Named wands/staffs with bespoke abilities remain a separate future document.

**Publication touchpoints for the catalyst-core model (all decisions owner-made 2026-07-19, principle 24 + addendum)** — general catalyst rules to update when this ships, beyond deleting the table. Publish-ready text drafts:

1. `docs/04-equipment/02-equipment/gear.md` (both catalyst entries): replace the "can be combined" sentence with the core rule — *"This catalyst core must be inlaid into a held or worn item to be usable. A loose core cannot be used for casting. The item holding the core provides its own enchantment and special material. A skilled artisan can move a core from one item to another with about an hour of careful work and a successful Crafting roll (medium 8 for Q3, hard 10 for Q4, very hard 12 for Q5, extreme 14 for Q6 and above). On a failure, the hour is lost and the attempt can be repeated."*
2. `docs/07-magic/01-magic-spells/index.md` (both casting requirement bullets): **the hand-held requirement is outdated design** — replace *"You must be holding an arcane conduit as a Spell Catalyst in your hand"* with *"You must wear or hold an item with an inlaid arcane conduit to cast arcane spells"* (and the mystic talisman line likewise).
3. `docs/04-equipment/07-magic-items/00-overview.md` or `enchantments.md`: state the host rule once where enchanting is defined — an inlaid core carries no enchantment or material of its own; fixed implements (wand, staff, orb — cores inseparable from their item) are their own host.
4. `docs/04-equipment/07-magic-items/effects.md` + `cost-tables.md`: clarify that an inlaid magic core still pays its own magic item base cost for its quality tier (that buys the spell damage bonus) while the host item pays for its own quality, material, and enchantment — two priced items sharing one slot, one enchantment and one material between them.

### 3.3 Non-Combat Coverage Gap

| Game Mode | Published Enchantments Touching It | Status of the Mode |
|-----------|-----------------------------------|--------------------|
| Combat | ~48 of 50 | — |
| Travel | 2 (Temperate, Silent) | **Published, detailed** — 6 roles, Supply Checks, weather, checkpoints, Fatigue economy |
| Exploration | ~1 | **Still unpublished** — crawl system remains at analysis stage (`../exploration-crawl-system.md`) |
| Social Intrigue | 1 (Comprehension) | **Published, detailed** — Interest, Patience, Motivations, Pitfalls |

Consequence of the re-evaluation: travel and social enchantments now name real procedure hooks (Navigator rolls, Supply Checks, starting Interest, Pitfall absorption) instead of gesturing at systems that didn't exist yet, while exploration effects stay bound to generic Perception/Athletics rolls until the crawl ships. **Anti-trivialization guardrail:** items grant boons or absorb single failures; they never delete a role, a Supply Check, or the Fatigue economy.

### 3.4 Scaling Philosophy

| Tier | Type | Examples |
|------|------|---------|
| **Q4 only** | Binary capabilities `[minor]` | Morphing, Returning, Temperate, Comprehension, Camouflaged |
| **Q4–Q6** | Meaningfully scaled | Flaming (2/4/6), Tough (1/2/3× per day), Stalwart (condition list widens) |
| **Q5–Q6** | Too powerful for Q4 | Hard control (Binding, Silencing), resource-on-hit (Leeching) |
| **Q6 only** | Powerful triggered | Damage/condition immunity, triggered, 1×/day |
| **Q7** | Signature tier — mortal crafting ceiling, integrated into the normal category tables | Q7-only entries and Q7 scaling of existing enchantments, per category catalog |
| **Q8** | Artifact tier — never crafted (owner ruling 2026-07-19, principle 21) | Built by the GM via [catalogs/q8-artifacts.md](catalogs/q8-artifacts.md); found treasure and story beats only |

**Two scaling axes, chosen deliberately:** frequency (uses per day) for offense, **scope** (condition lists, radii, target counts) for defense. The re-evaluation moved Stalwart from frequency-scaling to scope-scaling specifically because 3/scene condition-ignores at Q6 approached passive immunity.

**Immunity doctrine:** always triggered and limited, never passive, Q6+ only, with a visible circumvention (principle 13). Exception: very narrow environmental immunities (Temperate) stay passive at Q4.

### 3.5 Minor Enchantment Rule

Q4-only binary enchantments tagged `[minor]` can be added to a Q5+ item as a secondary enchantment at normal Q4 cost. Preserves one-primary-enchantment while allowing quality-of-life stacking.

**Current `[minor]` set:** Morphing, Returning, Temperate, Comprehension, Camouflaged, of Provisioning, of Waterbreathing, of Featherfall.

### 3.6 Talent Harmony (re-verified against current talent text)

Synergies to preserve:

| Enchantment | Talent | Why It Works |
|-------------|--------|-------------|
| Elemental weapons | Spellblade / Mystic Champion | Different action economies |
| of Attunement / Infused | Inexhaustible Mind / Spellweaver | Focus economy feeds recovery and metamagic |
| Blocking (shield) | Shield Mastery | Item is *dependent* on the talent's SL-reduction |
| Guardian's (weapon), Covering (shield) | Protective Stance | Item adds daily uses around the talent's Protect Ally upgrades |
| of Pathfinding | Knowledgeable Wanderer R2 | Boon sources stack (item stacking rule blocks only item duplicates) |
| of Trapfinding | Dungeon Delver R1 | Item detects, talent analyzes |
| Vigilant (armor) | Danger Sense R2 | Same-shaped Resist bonus — stacks to +4 instead of one obsoleting the other |

Anti-synergies driving redesigns:

| Enchantment | Conflicting Talent (verified) | Fix |
|-------------|------------------------------|-----|
| of Immunity (Q4 passive) | Body of Bronze R2, Strong Mind R2, Tough Stomach R2, Divine Sense R2 | Q6 only, triggered, 1×/day |
| of Pure Thought (Q4 passive) | Divine Sense R2, Strong Mind R2/R3 | Q5+, Resist-based passive + limited active |
| of Resistance (Q4 passive) — **new finding** | Body of Bronze R3, Strong Mind R3; outclasses armor Tough at its own tier | Q5, non-physical types only |
| Vigilant weapon proposal ("cannot be surprised") — **cut** | Danger Sense R2 (+2 Resist vs. surprise) | Redesigned as armor-side +2 Resist bonus |

### 3.7 Spell-Access Rank Mapping — Two-Track Framework (owner-decided 2026-07-19)

**Problem.** Quality tiers first appear as treasure two levels after casters outgrow the matching spell rank: Q4 first drops at level 3 (major treasure) when casters already cast R2, yet Q4 spell access held R1. A tier stays in circulation ~6 levels (fresh 2, common 4), so any single fixed mapping lags somewhere.

| Level | Casters cast | Q4 appears as | Q5 | Q6 |
|---|---|---|---|---|
| 3–4 | R2 | major (first find) | — | — |
| 5–6 | R3 | minor | major (first) | — |
| 7–8 | R4 | simple (common) | minor | major (first) |
| 9–10 | R5 | — | simple | minor |

**Resolution: two tracks, split on repeatability.**

**Track A — repeatable access** (wands, staffs, at-will and passive effects): **quality ≈ rank, unchanged.** The published heighten rule (+1 charge per rank, up to max rank +1) already lets a Q4 wand cast its R1 spell at R2 — repeatable access tracks the freshness window by itself. Raising base ranks here would let a Q6 staff heighten to R5 at level 7 and overtake casters. No change.

**Track B — scarce access** (single-use scrolls and consumables, 1/day storing effects): **rank = quality-equivalent +1.** Scarce access matches the caster's own rank exactly at each tier's first-find window, and gives non-casters one cast of something they cannot do at all.

| Quality | Track A (wand/staff base) | Track B (scroll / storing / single-use) |
|---------|--------------------------|------------------------------------------|
| Q3 | — | R1 (was R0) |
| Q4 | R1 (heightens to R2) | R2 |
| Q5 | R2 (heightens to R3) | R3 |
| Q6 | R3 (heightens to R4) | R4 |
| Q7 | R4 (heightens to R5) | R5 (cap) |
| Q8 | R5 | R5, plus +1 boon on the invocation roll (never above R5) |

**Decided parameters:**

1. **Invocation die stays the quality tier's die** (Q4 scroll of an R2 spell still rolls d8+1). Failure risk prices the above-band access, and a failed scroll is not consumed.
2. **Q3 scrolls hold R1** (R0 scrolls were near-worthless).
3. **Prices attach to spell rank, not quality label** — the existing per-rank scroll prices carry over (an R2 scroll costs 500 coins and is a Q4-tier treasure item), so the scroll economy needs no rework.
4. **Storing enchantments** (Storing — slated for removal with the catalyst table — of Arcane Knowledge, of Divine Guidance) store rank **2/3/4** at Q4/Q5/Q6.
5. **Single-use consumables** may reach quality-equivalent +1 rank as a *budget ceiling*, not a mandate — under-budget entries are fine, over-budget never (consumables catalog pass applied, see [catalogs/consumables.md](catalogs/consumables.md)).
6. Principle 8 in the design skill amended accordingly (owner ruling recorded 2026-07-19).

### 3.8 Special Materials (added 2026-07-19)

Materials were out of this analysis's original scope (deferred to `../materials-mechanical-effects-analysis.md`); the owner folded them back in — they are the third pillar of the item system beside quality bonuses and enchantments, providing passive and once-per-scene/day abilities.

**Current state (verified):** all 10 Exotic (Q3–Q4) materials have published effects. Above that, only Mithril does — armor/shield only. **19 materials sit in the docs with flavor text and no mechanics** (9 Greater, 10 Legendary).

**Findings:**

1. **Mithril violates the new coverage rule and under-delivers for its tier** — armor/shield only, with an effect budget (-1 load, -1 rigid) close to Exotic Chitin. Reworked in the catalog (all item types, plus noisy removal).
2. **Two owner rulings now bind material design** (recorded as principles 22 and 23): effects stay low on mental load — passive first, cooldown reactive (1/scene, 1/day) at most, nothing more complex; and every material states effects for each item type it plausibly makes (minimum three, or a stated fiction exception).
3. **Item-type coverage variance is sound at Greater/Legendary** once the catalog lands — bows have wood and horn (Treantwood, Elderwood, Infernal Horn composite bows), robes have cloth (Phantom-Silk, Dreamweave), catalysts have crystal/wood/bone at every tier above Exotic. Two Exotic gaps remain: no catalyst material and no cloth/wearable material — closable by adopting two vault proposals (Elemental Stones; a Giant Spider Silk wearable line).
4. **The old materials analysis needed a mental-load pass:** damage-die re-rolls (the system has no damage dice), strong/crit conditional clauses, and per-hit choice menus were revised out.
5. **Materials vs. enchantment identity split holds** (materials = what the item is made of, intrinsic and passive; enchantments = what it can do, active and metered). Overlap spot-checks flagged two stacking notes for publication (Eternite shield vs. Anchoring; Aegium 0-HP ward vs. the Deathless Ward artifact capstone).
6. **Two placement rulings close the remaining stacking holes** (owner decisions 2026-07-19, principles 24 and 25): catalyst material effects exist only on fixed casting implements that are their own host (wand, staff, orb) — an integrated catalyst uses its host item's material and enchantment; and wearable material effects apply only on the garment-scale Body, Back, Feet, and Hands slots — small wearables (rings, amulets) take materials for value only. Together with the catalyst enchantment removal, no slot can ever carry two materials or two enchantments, and the wearable passive pile is capped at four.

Full implementation spec: [catalogs/materials.md](catalogs/materials.md). The deep-dive lore/coherence work remains in `../materials-mechanical-effects-analysis.md`; where they diverge, the catalog governs.

### 3.9 Resource Model Guidance

| Effect class | Model |
|--------------|-------|
| Defensive reactions (Stalwart, Anchoring, condition removal) | 1/scene |
| Powerful offense (Booming, Sundering, Binding) | X/day |
| Focus/HP recovery | 1/day, always |
| Travel effects | 1/day or 1/journey |
| Social effects | 1/intrigue |
| Immunity (condition or damage) | 1/day, Q6+, triggered |

Full model comparison in [Appendix D](#appendix-d-limited-resource-model-comparison). Confirmed migrations: Stalwart and Anchoring to 1/scene; Tough, Blurring, Booming, Sundering, Infused stay as published.

> Note: §3.7's Track B interacts here — an effect on the 1/day model may carry rank+1 power precisely *because* it is scarce. Moving a Track B effect to a more generous resource model (1/scene, X/day above 1) pulls it back to the quality ≈ rank budget.

---

## 4. Comparative Analysis (condensed)

- **vs. D&D 5e:** Nexus has more granular rarity (6 tiers vs. 4) and a transparent cost formula, but D&D fields 30+ non-combat utility items where Nexus has no published framework — the utility catalogs close this.
- **vs. PF2e:** the base-bonus + enchantment split mirrors fundamental/property runes but cleaner; PF2e treats shield items as their own category, reinforcing the split recommendation.
- **Nexus strengths to preserve:** transparent cost formula, one enchantment per item, 8 wearable slots, durability integration, and — unique among the three — refined non-combat *subsystems* for items to hook into.

---

## 5. Recommendations Summary

| # | Recommendation | Detail | Effort |
|---|---------------|--------|--------|
| 1 | Split armor/shield into two d100 tables (10 each) | [armor.md](catalogs/armor.md), [shields.md](catalogs/shields.md) | Medium |
| 2 | Remove catalyst table | §3.2 | Low |
| 3 | Expand wearable table to 25 | [wearables.md](catalogs/wearables.md) | Medium |
| 4 | Fill weapon table to 20 | [weapons.md](catalogs/weapons.md) | Medium |
| 5 | Fix and expand ammo to 10 | [ammo.md](catalogs/ammo.md) | Low |
| 6 | Rescale of Immunity, of Pure Thought, of Resistance | §3.6, [wearables.md](catalogs/wearables.md) | Low |
| 7 | Minor Enchantment rule with `[minor]` keyword | §3.5 | Low |
| 8 | Q7 integrated into the normal category tables (13 Q7-only entries + scaling extensions of existing enchantments); Q8 as GM artifact framework in [q8-artifacts.md](catalogs/q8-artifacts.md) | Q7 rolls re-roll below Q7 treasure; Q8 never crafted per principle 21 | Medium |
| 9 | Utility item d100 tables by category | [utility-items.md](catalogs/utility-items.md), [consumables.md](catalogs/consumables.md) | Medium |
| 10 | Resource-model migrations (Stalwart/Anchoring → 1/scene) | §3.9 | Low |
| 11 | Fix the three doc defects (§2.4) | Independent of proposals | Trivial |
| 12 | Two-track spell-access ranks: scrolls Q3=R1 through Q7=R5, storing enchantments store rank 2/3/4, wands/staffs unchanged | §3.7 — **owner-approved 2026-07-19**, docs update pending | Low |
| 13 | Implement all 19 unfinished Greater/Legendary materials + Mithril rework; close the two Exotic gaps (catalyst, cloth) | §3.8, [materials.md](catalogs/materials.md) | Medium |

> **Still deferred:** named wand/staff catalogue (bespoke "Staff of Power"-style items) — separate future document.

---

## Appendix A: Enchantment Count Summary

| Category | Current | Proposed | d100 share |
|----------|---------|----------|------|
| Ammo | 6 | 10 | 10% each |
| Weapon | 12 | 20 | 5% each |
| Spell Catalyst | 6 | 0 (removed) | — |
| Armor | 6 (shared) | 10 | 10% each |
| Shield | 0 (shared) | 10 | 10% each |
| Wearable | 20 | 25 | 4% each |
| **Total** | **50** | **75** | — |

> Counts above are the Q4–Q6 d100 core. **Q7-only entries (13 across all catalogs) sit in the same tables** without final d100 ranges yet — a Q7 result rolled for lower-quality treasure is re-rolled. **Q8 has no table entries**: artifacts are GM-built via [catalogs/q8-artifacts.md](catalogs/q8-artifacts.md).

## Appendix B: Role Coverage (proposed, by primary role)

| Role | Ammo | Weapon | Armor | Shield | Wearable | Total (was) |
|------|------|--------|-------|--------|----------|-------|
| Offense | 5 | 11 | 0 | 1 | 1 | 18 (14) |
| Defense | 0 | 1 | 6 | 6 | 9 | 22 (15) |
| Healing | 0 | 1 | 0 | 0 | 1 | **2 (0)** |
| Control | 2 | 3 | 0 | 0 | 0 | **5 (2)** |
| Support | 2 | 1 | 0 | 3 | 9 | 15 (12) |
| Utility | 1 | 3 | 4 | 0 | 5 | 13 (8) |

Healing and Control grow further through the wearable expansion candidates (of Mending, of Vitality, of Calming) and dual-role entries (Bashing, Frosted) not counted above.

## Appendix C: Game Mode Coverage (proposed)

| Mode | Enchantment tables | Utility item tables | Notes |
|------|-------------------|--------------------|-------|
| Combat | 66 | ~14 | — |
| Travel | 2 (+3 candidates) | ~8 | Hooks: Navigator/Scout rolls, Supply Checks, Forced March, camp |
| Exploration | 2 (+2 candidates) | ~5 | Generic rolls only until the crawl system ships |
| Social | 1 (+4 candidates) | ~2 | Hooks: Interest, Patience, Motivations, Pitfalls |

## Appendix D: Limited Resource Model Comparison

| Model | Strengths | Weaknesses | Best For |
|-------|-----------|------------|----------|
| **1/scene** | Simple; resets per encounter; prevents hoarding | Ambiguous outside combat; generous with frequent scenes | Defensive reactions, condition removal |
| **X/day** | Real resource management; scales with quality; clear everywhere | Tracking burden; hoarding; "5-minute day" risk | Powerful offense, recovery, travel |
| **1/scene/target** | Prevents stacking on one enemy | Tracking complexity; weak in boss fights | Debuff riders (stun, bleed) |
| **1/journey, 1/intrigue** | Matches the subsystem's own clock | Only meaningful inside that subsystem | Travel and social effects |

## Appendix E: Re-Evaluation Changelog (v1 → 2026-07-19)

**Systems context updates**
- Deferral notes resolved: materials analysis, alchemy analysis + published Field Alchemy, published curses subsystem.
- Travel, Social Intrigue, and Harvesting are published and detailed; all travel/social proposals rewritten onto real hooks.
- marked (X) and distracted are official conditions; the bespoke "Marker" brand became **Marking** (inflicts marked).

**Principle-audit corrections**
- All static-TN saves scrubbed (Binding, Silencing, Slaying Q8, all five instruments) → attack/skill roll vs. target's Resist.
- Draining ammo stun gated behind the Resist comparison (principle 16).
- Stalwart rescaled by scope (condition list) instead of frequency.
- Vigilant weapon proposal cut (outclassed Danger Sense R2); armor Vigilant rebuilt as a stacking Resist bonus.
- **New finding:** of Resistance (Q4 passive) flagged alongside of Immunity and of Pure Thought.
- Corrosive aligned with the §15B acid rework (AV reduction Q6-only, short duration; Durability pressure on the consumable side).
- Avenger's "Pact of Devotion" requirement (nonexistent mechanic) replaced with a diegetic vigil.
- Immunities (Shielding, Warded Q6, Basilisk Eye) given triggered/limited shapes with circumventions.

**Naming dedupes**
- Draining (weapon) → Leeching; Sentinel's (shield) → Bulwark; of Anchoring (wearable) → of Sure Footing; of Vigilance → of the Far-Seeing Eye; of Warding (wearable) dropped.

**Spell-access rework (owner-approved 2026-07-19)**
- Two-track rank mapping adopted (§3.7): repeatable access (wands/staffs) keeps quality ≈ rank with heighten as the freshness window; scarce access (scrolls, storing enchantments, single-use consumables) reaches quality-equivalent +1 rank. Q3 scrolls become R1, invocation die stays the quality tier's, prices attach to rank. Principle 8 amended in the design skill.

**Legendary tier restructure (owner directions, 2026-07-19)**
- **Q7 integrated into the normal category tables** (owner direction): 13 Q7-only entries now sit as rows in the standard proposed tables (d100 ranges assigned at implementation; sub-Q7 treasure re-rolls them), plus "Q7 Scaling of Existing Entries" extension tables per catalog (Flaming, Slaying, Tough, Blurring, of Attunement). No separate per-category legendary section.
- **Q8 crafting ruling (principle 21):** Q7 is the mortal crafting ceiling under the current crafting rules; Q8 items are never crafted or commissioned — legendary/divine artifacts entering play as found treasure only, with coin values as valuations rather than prices.
- **signature-items.md replaced by [q8-artifacts.md](catalogs/q8-artifacts.md)** — a GM construction framework for Q8 artifacts in the D&D legendary-artifact mold (*Axe of the Dwarvish Lords*): seven-step procedure, mix-and-match menus (9 capstones, 7 secondary powers, sentience axes, prices, undoing conditions), and a worked example (the Axe of the Deep Kings). The former Q8 designs (Earthshaker, Living, Spellmirror, Heartseeker, Deathless Ward, Hidden Court, Twin Gates, Death-Knell, Phoenix Draught) became the capstone menu. Tears of the Phoenix window corrected to "one moon" (R5 Resurrection band, not the day-scale R4 band).

**Material placement rulings (owner decisions, 2026-07-19)**
- Principle 24: enchantments and materials belong to the catalyst's *host item*; only fixed casting implements (wand, staff, orb) are their own host and may carry catalyst material lines. Reframes §3.2's removal rationale.
- Principle 25: wearable material effects gated to the garment-scale Body, Back, Feet, and Hands slots; ring/amulet-scale wearables take materials for value and appearance only.
- §3.2 gained a publication-touchpoint list for the **catalyst-core model** with publish-ready text drafts. Owner decisions: the hand-held casting requirement is outdated — wearing or holding an item with the inlaid core suffices; a core *must* be inlaid to be usable (loose cores cast nothing); an artisan can move a core between items with an hour of work and one Crafting roll (Difficulty by core quality) — deliberately no heavier framework. Recorded as the principle 24 addendum.

**Special materials brought into scope (owner direction, 2026-07-19)**
- New §3.8 and [catalogs/materials.md](catalogs/materials.md): implementation spec for all 19 unfinished Greater/Legendary materials plus a Mithril rework (was armor/shield-only and under-tiered). Two new owner rulings recorded as principles 22 (low mental load: passive first, cooldown reactive at most) and 23 (multi-type coverage, minimum three item types). Coverage variance checked — bows, robes, catalysts, and all base item classes have tier-appropriate materials; two Exotic gaps flagged with vault-based fixes. Old materials-analysis proposals revised: no damage-die re-rolls, no strong/crit conditionals, no per-hit choice menus.

**Utility item corrections**
- Messenger Bottle Q4 → Q5 (worldbuilding reach); Hearthstone of Return Q5 → Q6 (spell-rank parity with R4 teleportation).
- Lyre of Distraction redesigned (draining Patience harms the party under the published system — the old design was backwards).
- Figurine of Summoning rewritten in creature levels; load figures flagged against the real load scale; Supply wording aligned; Decanting Vessel bound to published Field Alchemy items.
- Consumables: Serpent Venom rebuilt (was strictly worse than Q2 field alchemy), "blindsight" term removed, Phoenix Ash confirmed as the tier-parity anchor.
