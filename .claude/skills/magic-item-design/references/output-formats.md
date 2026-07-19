# Output Formats — Magic Item Design

## Item Description Format

Order within a written item description:

1. **Evocative name** — includes the bonus for weapons/armor ("Frostbite +1"). Function in the name, poetry in the flavor (principle 18).
2. **Visual appearance** — 1 sentence.
3. **Lore** — 1–2 sentences, only for significant items (major/legendary treasure).
4. **Exact mechanical effects** — bonuses with their type, active ability usage (action type, duration, uses per day or scene), limitations. Every ability states trigger, effect, and limit.

Keyword discipline: only official conditions (`docs/05-combat/04-conditions.md`), official durations (briefly/short/medium/long/very long, `docs/06-scenes/02-effect-durations.md`), official weapon/armor properties (`docs/04-equipment/05-armor-weapon-properties.md`). Complete lists: [../../game-basics.md](../../game-basics.md#canonical-keyword-sources). Anything non-official must be spelled out as an exact mechanical effect.

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
  "description": "Forged from steel tempered in glacial waters, the blade emits a faint mist of frost. While wielding this weapon, you can use a Quick Action on your turn to encase it in frost for a short duration. While frosted, the weapon deals 2 frost damage (ignore AV) on a hit and emits dim light in close range.",
  "properties": "slash, pierce, versatile (+1)"
}
```

- **Required**: `name` (include bonus, e.g. "Longsword +2"), `category` (`Weapon` | `Armor` | `Wearable` | `Consumable` | `Spell Scroll`), `quality` (3–8), `type` (base type + bonus, or slot for wearables e.g. `"ring (apparel slot)"`), `cost`, `load`, `description`.
- **Optional**: `material`, `properties` (comma-separated string), `uses` (consumables, typically 1).
- Multiple items: JSON array. Printing UI: `docs/10-gm-tools/00-printing/03-magic-items.mdx`.

## App JSON (rules-table changes only)

Rules-table changes (new enchantments, materials) also touch the matching `src/utils/data/json/magic-item-*.json` file (`magic-item-enchantments.json`, `magic-item-materials.json`, `magic-item-wearables.json`, `magic-item-helmets.json`, `magic-item-spell-catalysts.json`). Match the existing schema of the file you edit. ⚠️ Edit directly — legacy regeneration scripts are deprecated. ⚠️ For edits to existing entries, use surgical string replacement — never parse + re-serialize the whole file.
