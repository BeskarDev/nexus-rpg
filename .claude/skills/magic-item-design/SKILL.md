---
name: magic-item-design
description: "Create balanced magic items as treasure for Nexus RPG — weapons, armor, wearables, consumables, spell catalysts with correct cost formulas, materials, and enchantments. Use when designing magic items, treasure, enchantments, or reviewing item costs."
---

# Magic Item Design — Nexus RPG

Magic items are assembled from components with a strict cost formula: base item + magic item base cost + optional special material + optional enchantment (max one). Quality tiers Q3–Q8 map to character levels and set the power budget.

**Cost formula, quality tiers, worked examples, and treasure distribution live in [references/cost-quality.md](references/cost-quality.md). The canonical numeric tables live in the docs — always read the relevant docs table before assigning costs or effects; never price from memory.** Core system mechanics and writing standards: [../game-basics.md](../game-basics.md).

## Source-of-Truth Map

| What | Where |
|------|-------|
| Quality tiers, item types, value | `docs/04-equipment/01-items.md` |
| Base weapons / armor | `docs/04-equipment/03-weapons.md`, `04-armor.md` |
| **Weapon/armor properties** | `docs/04-equipment/05-armor-weapon-properties.md` |
| **Conditions** (official keyword list) | `docs/05-combat/04-conditions.md` |
| **Effect durations** (briefly/short/medium/long/very long) | `docs/06-scenes/02-effect-durations.md` |
| Spell properties (for catalysts/scrolls) | `docs/07-magic/05-spell-properties.md` |
| Magic item mechanics overview | `docs/04-equipment/07-magic-items/00-overview.md` |
| Automatic bonuses by quality (incl. ammo, scrolls, wands, staffs) | `docs/04-equipment/07-magic-items/effects.md` |
| Special materials | `docs/04-equipment/07-magic-items/materials.md` |
| Enchantment tables | `docs/04-equipment/07-magic-items/enchantments.md` |
| **Cost tables** | `docs/04-equipment/07-magic-items/cost-tables.md` |
| Curses subsystem | `docs/04-equipment/07-magic-items/curses.mdx` |
| Damage/healing scaling frameworks | `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 and §16 |
| Design analysis (gaps, planned reworks) | `docs/analysis/magic-items/MAGIC_ITEM_SYSTEM_ANALYSIS.md` + per-category catalogs in `docs/analysis/magic-items/catalogs/` |

The analysis doc contains **proposed but not-yet-implemented changes** (splitting armor/shield enchantment tables, removing the catalyst enchantment table, d100 conversion, minor-enchantment rule). Check it before designing enchantments — don't build on top of a structure that's slated for rework without flagging it.

## Design Principles

**Binding rules distilled from owner feedback — [references/designer-principles.md](references/designer-principles.md) holds the full text.** Native principles 1–10 plus principles ported from the spell-design and talent-design corpora, and pointers to the shared spell-design wording/GM-facing/condition convention files that apply to item text verbatim. Read it before any design pass. The most frequently load-bearing: enchantments grant boons, never auto-success (1); enchantments complement talents, never replace them (2); powerful actives cost limited uses, passives stay moderate (3); information effects give the GM bounded parameters (4); one enchantment per item, hard limit (5); quality tier matches party level (6); damage/healing follows the spell scaling frameworks with quality tier ≈ spell rank for repeatable effects and +1 rank for scarce single-use or 1/day access (8); never gate an ongoing effect on a static-TN save (9); a drawback enacts its own fiction and never touches Resolve (10); items assist, never bypass (11); never scale a cap (12); a granted immunity needs a circumvention (13); high-impact conditions never ride no-roll triggers (16); weigh worldbuilding reach of information/economic items (19); validate against talents and spells, not just other items (20); Q7 is the mortal crafting ceiling — Q8 items are found artifacts, never crafted or bought (21); material effects stay low on mental load — passive first, cooldown reactive at most (22); a material serves every item type it plausibly makes, minimum three (23); catalyst enchantments and materials belong to the host item — only fixed implements (wand, staff, orb) are their own host (24); wearable material effects only on Body, Back, Feet, and Hands slots (25).

## Creation Workflow

1. **Purpose & power** — who is it for (level → quality tier), what role (combat, utility, defense, spellcasting), how rare, what makes it memorable.
2. **Base item** — martials: weapons/armor/shields; casters: spell catalysts, wearables; utility: wearables; consumables: potions/scrolls/ammo.
3. **Quality tier** — from the level table in [references/cost-quality.md](references/cost-quality.md).
4. **Special material (optional)** — read `materials.md`, pick thematically (principle 7). Material quality range must fit item quality (exotic Q3–Q4, greater Q5–Q6, legendary Q7–Q8).
5. **Enchantment (optional, max one)** — read `enchantments.md`. Match enchantment type to item type. Active abilities for tactical decisions, passive for reliable benefit. Verify the enchantment's quality scaling covers your tier. Prefer existing enchantments — extending `enchantments.md` is a rules-table change (see Publication Pipeline).
6. **Read every system the item touches** — for any effect referencing a subsystem (durability, crafting, travel, challenges, resting), open the actual rules this session and design onto the published procedure. Don't invent mechanics from memory.
7. **Calculate cost** — read `cost-tables.md`, apply the formula, show the breakdown line by line (worked examples in [references/cost-quality.md](references/cost-quality.md)). Remember the wearable exception.
8. **Write description** — order and keyword discipline per [references/output-formats.md](references/output-formats.md). For printable cards, produce the JSON format from the same file.
9. **Validate** — checklist below, then compare against 2–3 existing enchantments or items of the same quality tier: not strictly superior, and check same-job talents and spells for parity (principle 20).
10. **Check worldbuilding implications** — for items with social, economic, legal, or informational reach, apply principle 19.

For **rules-table changes** (new enchantment, material, or cost tier), write the design into a draft document first — a batch file under the repo-root `.drafts/magic-items/` with a status banner ("pending owner approval, not yet published"), design rationale, publish-ready text, and open questions for the owner. Individual campaign treasure items skip the draft step — they are ephemeral output, not published rules.

## Anti-Patterns

- ❌ Stacking multiple enchantments on one item.
- ❌ Charging wearables the magic item base cost.
- ❌ Inventing homebrew enchantments when an existing one fits — extend `enchantments.md` only as a deliberate design decision, checked against the analysis doc.
- ❌ Skipping the cost breakdown — value drives the game economy.
- ❌ Vague active abilities — always state action type, duration, and uses.
- ❌ Static-TN saves on recurring effects (principle 9); drawbacks that tax a generic stat instead of enacting their fiction (principle 10).
- ❌ Non-official keywords — conditions, durations, and item properties only from the canonical pages (complete lists: [../game-basics.md](../game-basics.md#canonical-keyword-sources)).

## Validation Checklist

- [ ] Quality tier matches the intended party level; effect power ≤ same-tier spell (quality ≈ spell rank, principle 8)
- [ ] Cost breakdown shown line by line from the docs cost tables; wearable exception applied where relevant
- [ ] Max one enchantment; material quality range fits item quality
- [ ] Every active ability states action type, duration, and uses per day/scene; passives are moderate and reliable
- [ ] Grants boons and options, never auto-success; no subsystem trivialized (principles 1, 11)
- [ ] Doesn't replace a talent's job (2) or outclass a same-job spell/talent — parity with distinct edges (20)
- [ ] No cap scaled (12); immunities carry a circumvention (13); no high-impact condition on a no-roll trigger (16)
- [ ] Recurring effects don't hang on a static-TN save (9); drawbacks/curses enact their fiction and never touch Resolve (10)
- [ ] All conditions, durations, and properties official; parameterized conditions carry their (X)
- [ ] Name is a promise in a pre-scientific register (18); worldbuilding reach checked (19)
- [ ] Rules-table changes have a draft under `.drafts/magic-items/` with rationale and open questions

## Optional Rules (use when the owner asks)

- **Attunement**: short rest to bond, max 3 attuned items per character.
- **Cursed items**: defined subsystem in `docs/04-equipment/07-magic-items/curses.mdx` (found loot only, GM-chosen not forced-roll, permanent equip/wield items only, d12 curse table). Each curse pairs a comply-benefit with a defy-price and must obey principles 9 and 10. *Break Curse* suppresses an item curse temporarily rather than destroying it; permanent removal needs destroying the item or fulfilling its release condition.
- **Artifacts (beyond Q8)**: may break standard rules (multiple enchantments, intelligence, growth) — sparingly, for major story beats only.

## Publication Pipeline

Two distinct cases — don't confuse them:

**Individual treasure items** (the common case): campaign-specific loot is NOT published to docs or Notion. Deliverable = the item description + cost breakdown, plus the printable-card JSON if requested. Ephemeral output.

**Rules-table changes** (new enchantment, material, cost tier — only as a deliberate, owner-approved design decision, drafted under `.drafts/magic-items/` first):
1. **Docs** — update the canonical table in `docs/04-equipment/07-magic-items/` (enchantments.md, materials.md, cost-tables.md, effects.md).
2. **App JSON** — update the matching `src/utils/data/json/magic-item-*.json` file per [references/output-formats.md](references/output-formats.md). ⚠️ Edit directly, surgically — legacy regeneration scripts are deprecated.
3. **Notion** — push via the `notion-sync` skill.
4. Check `docs/analysis/magic-items/MAGIC_ITEM_SYSTEM_ANALYSIS.md` and the matching catalog in `docs/analysis/magic-items/catalogs/` — if the change touches an area with a pending rework proposal, flag it to the owner first.

Verify docs and JSON agree, then stop — the owner commits manually.

## Designer Feedback Loop

When the owner corrects or refines a design decision in session (costing, enchantment power, distribution pacing), append it to [references/designer-principles.md](references/designer-principles.md) (next free number, bolded one-line rule + reasoning + owner-ruling provenance, under the matching section — the file states the next free number). If it's frequently load-bearing, also add its one-line hook to the Design Principles section above. If the correction refines a *ported* principle, note the item-side ruling there — never edit the spell-design or talent-design files from here. This is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons go into `references/`.
