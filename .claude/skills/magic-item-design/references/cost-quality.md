# Cost & Quality Reference — Magic Item Design

Quick-reference numbers for costing and power-matching. **The canonical tables live in the docs — always read the relevant docs table before assigning final costs or effects; this file orients, the docs decide.** Canonical sources: `docs/04-equipment/07-magic-items/cost-tables.md` (all cost tables), `effects.md` (auto bonuses, ammo, scrolls, wands, staffs), `materials.md`, `enchantments.md`.

## Cost Formula

```
Total Cost = Base Item + Magic Item Base Cost + Special Material (optional) + Enchantment (optional)
```

**Exception: wearables (rings, amulets, boots, cloaks…) skip the Magic Item Base Cost** — they only gain value from their enchantment. Wearables can still use special materials. Wearable base costs come from the equipment-slot table in `cost-tables.md` (50–100 coins by slot).

Cost columns split by item class: ammo/consumables, one-handed weapon/spell catalyst, two-handed or heavy weapon, light armor/shield/helmet, heavy armor, wearable. Read the exact cell — never interpolate.

## Quality Tiers

| Quality | Name | Value Range | Auto Bonus (weapon dmg / AV) | For Levels |
|---------|------|-------------|------------------------------|------------|
| Q3 | Masterwork | 250–750 | — (non-magical) | 1–2 |
| Q4 | Lesser Magic | 750–3,000 | +1 | 3–4 |
| Q5 | Potent Magic | 2,500–15,000 | +2 | 5–6 |
| Q6 | Greater Magic | 7,500–45,000 | +3 | 7–8 |
| Q7 | Superior Magic | 25,000–150,000 | +4 | 9–10 |
| Q8 | Supreme Magic | 75,000–450,000 | +5 | beyond 10, unique artifacts |

Level bands follow the Random Treasure by Level table (`docs/10-gm-tools/01-random-tables/05-random-treasure.mdx`): each quality first appears as major treasure at the band's start and stays in circulation ~6 levels (fresh for 2, common for 4).

**Q7 is the mortal crafting ceiling** (principle 21, owner ruling 2026-07-19): mortal enchanters craft up to Q7. **Q8 items are never crafted, commissioned, or bought** — legendary/divine artifacts, found only. Q8 coin values are treasure valuations, not prices.

- **Quality tier ≈ spell rank** as the power yardstick for *repeatable* item effects (principle 8): a Q5 item's active effect sits at rank-2-spell power. **Scarce access (single-use scrolls/consumables, 1/day effects) may reach quality +1 rank** — owner ruling 2026-07-19, full parameters in [designer-principles.md](designer-principles.md) principle 8.
- Durability bonus by quality: +1d/+1d/+2d/+2d/+3d (Q4–Q8).
- Magic ammo uses flat damage +1…+6 (Q3–Q8), named with the bonus suffix ("Arrows +2" for Q4). Enchanted ammo comes in individual pieces (up to 3 per slot), destroyed on activation.
- Q3 weapons that are already Quality 3 mundane gain a masterwork property, not extra damage.
- Shields count as both weapon and armor for quality bonuses; bucklers gain the magic AV bonus too.
- Exact numbers per item type: `effects.md` — read it, don't recall it.

## Scrolls, Wands, Staffs

Full tables in `effects.md`. Orientation:

- **Spell scrolls**: single-use, any intelligent creature can invoke (Quality-tier roll or own casting roll), no Focus. Published quality mapping: spell rank 0–5 (Q3–Q8), cost 50 → 15,000 coins. Crafting needs the Spell Scribe talent, the spell known, half cost, and the listed downtime. ⚠️ **Approved but unpublished rework** (analysis §3.7): scroll ranks shift to Q3=R1 … Q7=R5 (Q8 = R5 with +1 boon), prices attach to rank. Until the docs update lands, the published docs tables govern.
- **Wands**: one spell, charge-based (charges = spell rank per cast, heighten +1/rank up to max rank +1), double as spell catalysts of their tier. Recharge: 2 Focus per charge at a short break, or 10 coins per charge at an enchanter.
- **Staffs**: multiple spells (3–6 by tier), require the matching magic skill, rank 0 spells free. Same charge and recharge rules as wands.

## Worked Cost Examples

**Q4 Flaming Longsword +1**: 100 (base longsword) + 1,000 (Q4 one-handed magic base) + 1,000 (Q4 flaming enchantment) = **2,100 coins**

**Q5 Mithril Breastplate +2**: 750 (base) + 10,000 (Q5 heavy armor magic base) + 5,000 (Q5 mithril) = **15,750 coins**

**Q4 Amulet of Protection**: 50 (base amulet) + 0 (wearable — skips magic base cost!) + 1,000 (Q4 wearable enchantment) = **1,050 coins**

**Q6 Flameheart Greatsword +3**: 150 (base) + 15,000 (Q6 two-handed) + 7,500 (Q6 dragon bone) + 15,000 (Q6 flaming) = **37,650 coins**

Always show the breakdown line by line — value drives the game economy.

## Treasure Distribution

- **Minor (per session)**: 1–2 consumables (Q3–Q4), 50–500 coins each.
- **Major (per arc, 3–5 sessions)**: 1 permanent item at character-level-appropriate quality.
- **Legendary (campaign milestones)**: unique named Q6+ items with materials, enchantments, and backstory.

Don't make every treasure magical — mix coins, trade goods, consumables.
