---
name: magic-item-design
description: "Create balanced magic items as treasure for Nexus RPG — weapons, armor, wearables, consumables, spell catalysts with correct cost formulas, materials, and enchantments. Use when designing magic items, treasure, enchantments, or reviewing item costs."
---

# Magic Item Design — Nexus RPG

Magic items are assembled from components with a strict cost formula. The canonical tables live in the docs — **always read the relevant table before assigning costs or effects; never price from memory.** Core system mechanics and writing standards: [../game-basics.md](../game-basics.md).

## Canonical References (single source of truth)

| Topic | File |
|-------|------|
| Quality tiers, item types, value | `docs/04-equipment/01-items.md` |
| Base weapons | `docs/04-equipment/03-weapons.md` |
| Base armor | `docs/04-equipment/04-armor.md` |
| Weapon/armor properties | `docs/04-equipment/05-armor-weapon-properties.md` |
| **Conditions** (official keyword list) | `docs/05-combat/04-conditions.md` |
| **Effect durations** (briefly/short/medium/long/very long) | `docs/06-scenes/02-effect-durations.md` |
| Spell properties (for catalysts/scrolls) | `docs/07-magic/05-spell-properties.md` |
| Magic item mechanics overview | `docs/04-equipment/07-magic-items/00-overview.md` |
| Automatic bonuses by quality | `docs/04-equipment/07-magic-items/effects.md` |
| Special materials | `docs/04-equipment/07-magic-items/materials.md` |
| Enchantment tables | `docs/04-equipment/07-magic-items/enchantments.md` |
| **Cost tables** | `docs/04-equipment/07-magic-items/cost-tables.md` |
| Design analysis (gaps, planned reworks) | `docs/analysis/enchantments-magic-items-analysis.md` |

The analysis doc contains **proposed but not-yet-implemented changes** (splitting armor/shield enchantment tables, removing the catalyst enchantment table, d100 conversion, minor-enchantment rule). Check it before designing enchantments — don't build on top of a structure that's slated for rework without flagging it.

## Cost Formula

```
Total Cost = Base Item + Magic Item Base Cost + Special Material (optional) + Enchantment (optional)
```

**Exception: wearables (rings, amulets, boots, cloaks…) skip the Magic Item Base Cost** — they only gain value from their enchantment.

Quality tiers at a glance:

| Quality | Name | Value Range | Auto Bonus (weapon dmg / AV) | For Levels |
|---------|------|-------------|------------------------------|------------|
| Q3 | Masterwork | 250–750 | — (non-magical) | 1–2 |
| Q4 | Formidable | 750–3,000 | +1 | 2–4 |
| Q5 | Exceptional | 2,500–15,000 | +2 | 5–7 |
| Q6 | Epic | 7,500–45,000 | +3 | 8–10 |
| Q7 | Legendary | 25,000–150,000 | +4 | 10+ |
| Q8 | Mythical | 75,000–450,000 | +5 | unique artifacts |

Durability bonus by quality: +1d/+1d/+2d/+2d/+3d (Q4–Q8). Magic ammo uses flat damage +1…+6 (Q3–Q8). Exact numbers per item type: `effects.md`.

## Design Principles

1. **Anti-trivialization** — enchantments grant boons on rolls, not auto-success. Resource management (supplies, fatigue, durability) must stay meaningful.
2. **Talent harmony** — enchantments complement talents, never replace them. A +1 boon on Perception adds to a talent's ability; it doesn't substitute for it.
3. **Limited resource discipline** — powerful active effects cost limited uses (X/day, 1/scene), not passive always-on scaling.
4. **GM-ease for information effects** — non-combat enchantments that reveal information must define what the GM reveals, how often, at what scope. No vague "you sense danger".
5. **One enchantment per item** — hard limit. Same-effect enchantments on multiple items don't stack (highest applies); active abilities aren't blocked by this.
6. **Match power to level** — see quality table. Q6+ in a level-1 party breaks the game economy and math.
7. **Thematic materials** — dragon scales from dragon hoards, mithril from dwarf vaults. Prefer materials the party could plausibly have harvested.
8. **Damage/healing effects follow the spell scaling frameworks** — `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 (damage per rank, AoE half-scaling) and §16 (healing: single-target 1:1 with damage, Quick Action ½, AoE half; temp HP never stacks; wound healing extremely rare). An item's effect must not exceed what a same-tier spell delivers — quality tier ≈ spell rank as the power yardstick (healing potion ≈ the equivalent-rank healing spell).

## Creation Workflow

1. **Purpose & power** — who is it for (level → quality tier), what role (combat, utility, defense, spellcasting), how rare, what makes it memorable.
2. **Base item** — martials: weapons/armor/shields; casters: spell catalysts, wearables; utility: wearables; consumables: potions/scrolls/ammo.
3. **Quality tier** — from the level table above.
4. **Special material (optional)** — read `materials.md`, pick thematically. Material quality range must fit item quality (exotic Q3–Q4, greater Q5–Q6, legendary Q7–Q8).
5. **Enchantment (optional, max one)** — read `enchantments.md`. Match enchantment type to item type. Active abilities for tactical decisions, passive for reliable benefit. Verify the enchantment's quality scaling covers your tier.
6. **Calculate cost** — read `cost-tables.md`, apply the formula, show the breakdown line by line (see examples below). Remember the wearable exception.
7. **Write description** — evocative name, visual appearance, 1–2 sentences of lore for significant items, then exact mechanical effects: bonuses, active ability usage (action type, duration, uses/day), limitations.
8. **Format** — for printable cards, produce JSON (format below).

## Worked Cost Examples

**Q4 Flaming Longsword +1**: 100 (base longsword) + 1,000 (Q4 one-handed magic base) + 1,000 (Q4 flaming enchantment) = **2,100 coins**

**Q5 Mithril Breastplate +2**: 750 (base) + 10,000 (Q5 heavy armor magic base) + 5,000 (Q5 mithril) = **15,750 coins**

**Q4 Amulet of Protection**: 50 (base amulet) + 0 (wearable — skips magic base cost!) + 1,000 (Q4 wearable enchantment) = **1,050 coins**

**Q6 Flameheart Greatsword +3**: 150 (base) + 15,000 (Q6 two-handed) + 7,500 (Q6 dragon bone) + 15,000 (Q6 flaming) = **37,650 coins**

## Treasure Distribution

- **Minor (per session)**: 1–2 consumables (Q3–Q4), 50–500 coins each.
- **Major (per arc, 3–5 sessions)**: 1 permanent item at character-level-appropriate quality.
- **Legendary (campaign milestones)**: unique named Q6+ items with materials, enchantments, and backstory.

Don't make every treasure magical — mix coins, trade goods, consumables.

## Common Mistakes

- ❌ Stacking multiple enchantments on one item.
- ❌ Charging wearables the magic item base cost.
- ❌ Inventing homebrew enchantments when an existing one fits — extend `enchantments.md` only as a deliberate design decision, checked against the analysis doc.
- ❌ Skipping the cost breakdown — value drives the game economy.
- ❌ Vague active abilities — always state action type, duration, and uses.
- ❌ Non-official keywords — conditions only from `docs/05-combat/04-conditions.md`, durations only briefly/short/medium/long/very long (`docs/06-scenes/02-effect-durations.md`), item properties only from `docs/04-equipment/05-armor-weapon-properties.md`. Complete lists: [../game-basics.md](../game-basics.md#canonical-keyword-sources).

## JSON Format (printable cards)

```json
{
  "name": "Frostbite +1",
  "category": "Weapon",
  "quality": 4,
  "type": "longsword +1",
  "material": "Glacial Steel",
  "cost": 2100,
  "load": 1,
  "description": "Forged from steel tempered in glacial waters, the blade emits a faint mist of frost. While wielding this weapon, you can use a Quick Action on your turn to encase it in frost for a short duration. While frosted, the weapon deals 2 frost damage (ignoring AV) on a hit and emits dim light in close range.",
  "properties": "slash, pierce, versatile (+1)"
}
```

- **Required**: `name` (include bonus, e.g. "Longsword +2"), `category` (`Weapon` | `Armor` | `Wearable` | `Consumable` | `Spell Scroll`), `quality` (3–8), `type` (base type + bonus, or slot for wearables e.g. `"ring (apparel slot)"`), `cost`, `load`, `description`.
- **Optional**: `material`, `properties` (comma-separated string), `uses` (consumables, typically 1).
- Multiple items: JSON array. Printing UI: `docs/10-gm-tools/00-printing/03-magic-items.mdx`.

## Optional Rules (use when the owner asks)

- **Attunement**: short rest to bond, max 3 attuned items per character.
- **Cursed items**: appear beneficial, reveal after use, need magic to remove — balance benefit vs. drawback.
- **Artifacts (beyond Q8)**: may break standard rules (multiple enchantments, intelligence, growth) — sparingly, for major story beats only.

## Publication Pipeline

Two distinct cases — don't confuse them:

**Individual treasure items** (the common case): campaign-specific loot is NOT published to docs or Notion. Deliverable = the item description + cost breakdown, plus the printable-card JSON if requested. Ephemeral output.

**Rules-table changes** (new enchantment, material, cost tier — only as a deliberate, owner-approved design decision):
1. **Docs** — update the canonical table in `docs/04-equipment/07-magic-items/` (enchantments.md, materials.md, cost-tables.md, effects.md).
2. **App JSON** — update the matching `src/utils/data/json/magic-item-*.json` file (consumed by app tools). ⚠️ Edit directly — legacy regeneration scripts are deprecated.
3. **Notion** — push via the `notion-sync` skill.
4. Check `docs/analysis/enchantments-magic-items-analysis.md` — if the change touches an area with a pending rework proposal, flag it to the owner first.

Verify docs and JSON agree, then commit together.

## Designer Feedback Loop

When the owner corrects a design decision (costing, enchantment power, distribution pacing), add it to Design Principles above so it persists for future sessions.
