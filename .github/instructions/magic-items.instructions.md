# Magic Item Creation Instructions for Nexus RPG

This file provides comprehensive guidance for creating magic items as treasure for adventures in Nexus RPG. All magic items must follow the system's established rules and cost formulas.

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Understanding Magic Item Components](#understanding-magic-item-components)
3. [Step-by-Step Creation Process](#step-by-step-creation-process)
4. [Quality Tiers and Power Levels](#quality-tiers-and-power-levels)
5. [Cost Calculation Formula](#cost-calculation-formula)
6. [Design Guidelines](#design-guidelines)
7. [JSON Format for Printing](#json-format-for-printing)

## Quick Reference

**Formula:** `Total Cost = Base Item + Magic Item Base Cost + Special Material (optional) + Enchantment (optional)`

**Important:** Wearable items skip the Magic Item Base Cost—they only gain value from enchantments.

**Quality Ranges:**
- Q3: Masterwork (non-magical but expertly crafted)
- Q4-Q5: Lesser/Potent magic items (common magical treasures)
- Q6: Greater magic items (rare and powerful)
- Q7-Q8: Legendary/Mythical (unique artifacts)

## Understanding Magic Item Components

### 1. Base Item
The foundation of any magic item. Choose from:
- **Weapons**: See [docs/04-equipment/03-weapons.md](/workspaces/nexus-rpg/docs/04-equipment/03-weapons.md)
- **Armor/Shields/Helmets**: See [docs/04-equipment/04-armor.md](/workspaces/nexus-rpg/docs/04-equipment/04-armor.md)
- **Wearables**: Equipment slot items (amulets, rings, boots, cloaks, etc.)
- **Consumables**: Potions, scrolls, enchanted ammunition
- **Spell Catalysts**: Wands, staves, orbs used for spellcasting

### 2. Quality Tier
Determines power level and rarity:
- **Q3 (Masterwork)**: 250-750 coins - Expertly crafted, may have minor magical properties
- **Q4 (Formidable)**: 750-3,000 coins - True magical items, +1 bonuses
- **Q5 (Exceptional)**: 2,500-15,000 coins - Potent magic, +2 bonuses
- **Q6 (Epic)**: 7,500-45,000 coins - Rare treasures, +3 bonuses
- **Q7 (Legendary)**: 25,000-150,000 coins - Hero's weapons, +4 bonuses
- **Q8 (Mythical)**: 75,000-450,000 coins - Divine artifacts, +5 bonuses

For detailed quality descriptions, see [docs/04-equipment/01-items.md](/workspaces/nexus-rpg/docs/04-equipment/01-items.md#quality)

### 3. Magic Item Effects (Automatic)
Magic items gain automatic bonuses based on quality:

**Weapons/Spell Catalysts:**
- **Weapon/Spell Damage**: +1/+2/+3/+4/+5 (Q4/Q5/Q6/Q7/Q8)
- **Durability**: +1d/+1d/+2d/+2d/+3d

**Armor/Shields/Helmets:**
- **AV Bonus**: +1/+2/+3/+4/+5 (Q4/Q5/Q6/Q7/Q8)
- **Durability**: +1d/+1d/+2d/+2d/+3d

**Magic Ammo:**
- **Flat Damage Bonus**: +1/+2/+3/+4/+5/+6 (Q3/Q4/Q5/Q6/Q7/Q8)

For complete details, see [docs/04-equipment/07-magic-items/effects.md](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/effects.md)

### 4. Special Materials (Optional)
Named materials that provide unique properties:

**Exotic Materials (Q3-Q4):**
- **Chitin**: -1 load for armor
- **Iron/Cursestone**: +1 boon vs spirits, +1 bane on Mysticism
- **Monster Bone/Scales**: -1 load, resistance abilities
- **Silverroot**: +1 boon vs lycanthropes/undead
- **Dwarf-Steel**: Re-roll durability checks
- **Darkwood**: -1 load for wooden weapons/shields

**Greater Materials (Q5-Q6):**
- **Mithril**: -1 load, -1 rigid for armor
- **Dragon Scales**: Elemental resistance
- **Adamantite**: Extremely durable
- **Meteorite**: Magically reactive

**Legendary Materials (Q7-Q8):**
- **Orichalcum**: Nearly weightless
- **Celestial Feathers**: Flight properties
- **Elder Dragon materials**: Exceptional elemental properties
- **Aegium**: Divine metal
- **Eternite**: Highly magical crystal metal

For the complete materials list and properties, see [docs/04-equipment/07-magic-items/materials.md](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/materials.md)

### 5. Enchantments (Optional)
Powerful magical abilities beyond standard bonuses. **Limit one enchantment per item.**

**Categories:**
- **Weapon Enchantments**: Flaming, bloody, returning, slaying, etc.
- **Armor/Shield Enchantments**: Anchoring, blurring, temperate, stalwart, etc.
- **Spell Catalyst Enchantments**: Storing, deflecting, stabilizing, volatile, etc.
- **Wearable Enchantments**: Of Protection, of Might, of Swiftness, of Fortitude, etc.
- **Ammo Enchantments**: Burning, seeking, wounding, shattering, etc.

**Stacking Rule:** Multiple items with the same enchantment effect don't stack—only the highest applies. Active abilities (requiring an Action) are not blocked.

For complete enchantment tables and descriptions, see [docs/04-equipment/07-magic-items/enchantments.md](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/enchantments.md)

## Step-by-Step Creation Process

### Step 1: Determine Purpose and Power Level
Ask yourself:
- **Who is this for?** (Level 1-3 characters = Q3-Q4, Level 4-7 = Q4-Q5, Level 8+ = Q6+)
- **What role does it fill?** (Combat enhancement, utility, defense, spellcasting)
- **How rare should it be?** (Common treasure vs. legendary artifact)
- **What makes it memorable?** (Unique visual description, lore, special effects)

### Step 2: Choose Base Item
Select an appropriate base item type:
- For **martial characters**: Weapons, armor, shields
- For **spellcasters**: Spell catalysts, wearables that boost magic
- For **utility**: Wearables with movement, skill, or attribute bonuses
- For **consumables**: Potions, scrolls, enchanted ammo

### Step 3: Select Quality Tier
Match quality to character level and campaign power:
- **Q3**: Masterwork items for starting characters or early treasures
- **Q4**: First "true" magic items, appropriate for levels 1-4
- **Q5**: Mid-campaign treasures, levels 5-7
- **Q6**: Major treasures, levels 8-10
- **Q7-Q8**: Campaign-defining artifacts

### Step 4: Add Special Material (Optional)
Choose if you want unique mechanical properties:
- Use **thematically appropriate** materials (dragon scales from dragons, mithril from dwarves)
- Consider **harvesting opportunities** (players defeated the creature that provided the material)
- Balance **mechanical benefit** vs. **cost increase**

### Step 5: Add Enchantment (Optional)
Select one enchantment that fits the item's theme:
- **Active abilities** for items you want players to use tactically
- **Passive bonuses** for reliable, always-on benefits
- Match **item type** to **enchantment type** (weapon enchantments on weapons, etc.)
- Ensure enchantment **scales appropriately** with quality tier

### Step 6: Calculate Total Cost
Use the formula from the cost tables:

**Example 1: Q4 Flaming Longsword +1**
- Base longsword (Q2): 100 coins
- Magic item base cost (Q4 one-handed weapon): +1,000 coins
- Flaming enchantment (Q4 one-handed weapon): +1,000 coins
- **Total: 2,100 coins**

**Example 2: Q5 Mithril Breastplate +2**
- Base breastplate (Q3): 750 coins
- Magic item base cost (Q5 heavy armor): +10,000 coins
- Mithril special material (Q5 heavy armor): +5,000 coins
- **Total: 15,750 coins**

**Example 3: Q4 Amulet of Protection**
- Base amulet (neck slot): 50 coins
- Magic item base cost: 0 coins (wearables skip this!)
- "Of Protection" enchantment (Q4 wearable): +1,000 coins
- **Total: 1,050 coins**

For complete cost tables, see [docs/04-equipment/07-magic-items/cost-tables.md](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/cost-tables.md)

### Step 7: Write Description
Create compelling item descriptions:
- **Name**: Evocative and descriptive (e.g., "Frostbite, Blade of Winter's Wrath")
- **Appearance**: Visual details that make it memorable
- **History/Lore**: Brief backstory (1-2 sentences) if it's a significant item
- **Mechanical Effects**: Clear statement of all bonuses, properties, and enchantments
- **Usage Notes**: How active abilities work, recharge conditions, limitations

### Step 8: Format for Use
Prepare the item for your game:
- **For printing**: Convert to JSON format (see below)
- **For VTT/digital**: Include in character sheet or item database
- **For physical game**: Write on index card or print magic item card

## Quality Tiers and Power Levels

### Character Level Guidelines

| Character Levels | Appropriate Quality | Typical Value Range |
|-----------------|---------------------|---------------------|
| 1-2 | Q3 Masterwork | 250-1,000 coins |
| 2-4 | Q4 Lesser Magic | 750-5,000 coins |
| 5-7 | Q5 Potent Magic | 2,500-20,000 coins |
| 8-10 | Q6 Greater Magic | 7,500-60,000 coins |
| 10+ | Q7-Q8 Legendary+ | 25,000+ coins |

### Treasure Distribution Guidelines

**Minor Treasure (per session):**
- 1-2 consumables (Q3-Q4 potions, scrolls, enchanted ammo)
- Value: 50-500 coins per item

**Major Treasure (per arc, 3-5 sessions):**
- 1 permanent magic item appropriate to character level
- Value: Follow character level guidelines above

**Legendary Treasure (campaign milestones):**
- Unique named items with backstory
- Often Q6+ with special materials and enchantments
- May have additional unique abilities beyond standard rules

## Design Guidelines

### DO:
✅ **Match power to character level** - Q4 for early game, Q5-Q6 for mid/late game
✅ **Consider party composition** - Give fighters weapons, casters spell catalysts or wearables
✅ **Use thematic materials** - Dragon scales from dragon hoards, mithril from dwarf vaults
✅ **Make enchantments memorable** - Active abilities create tactical decisions
✅ **Balance cost vs. power** - Higher quality = rarer treasure
✅ **Include visual descriptions** - "The blade glows with inner fire" not just "+1 damage"
✅ **Respect the one enchantment limit** - Choose the most impactful enchantment
✅ **Consider harvesting materials** - Let players craft items from creature parts

### DON'T:
❌ **Don't stack multiple enchantments** - One per item maximum
❌ **Don't forget wearables skip magic item base cost** - They're cheaper than weapons/armor
❌ **Don't give Q6+ items to level 1 characters** - Breaks game balance
❌ **Don't ignore material requirements** - Magic items need special materials thematically
❌ **Don't make every treasure magical** - Mix in gold, trade goods, consumables
❌ **Don't forget the stacking rule** - Multiple "of Protection" items don't stack
❌ **Don't create homebrew enchantments without consulting rules** - Use existing enchantments
❌ **Don't skip calculating costs** - Value matters for game economy

### Thematic Considerations

**Fire-themed Items:**
- Materials: Phoenix materials, fire elemental essence, volcanic obsidian
- Enchantments: Flaming, burning ammo
- Visuals: Red glow, warmth, smoke wisps

**Ice/Cold-themed Items:**
- Materials: Glacial ice, winter drake scales, frozen materials
- Enchantments: Frost damage effects
- Visuals: Blue glow, frost crystals, cold mist

**Holy/Divine Items:**
- Materials: Celestial feathers, aegium, sanctified metals
- Enchantments: Sacred, radiant damage
- Visuals: Golden light, warmth, divine symbols

**Dark/Necromantic Items:**
- Materials: Undead creature parts, cursed materials
- Enchantments: Defiled, draining, necrotic effects
- Visuals: Dark aura, withering effect, eerie presence

**Nature-themed Items:**
- Materials: Elderwood, treantwood, natural materials
- Enchantments: Nature-based effects
- Visuals: Living wood, growing vines, natural patterns

**Protection/Defense Items:**
- Materials: Adamantite, deep iron, sturdy materials
- Enchantments: Of Protection, anchoring, stalwart
- Visuals: Shimmering wards, solid construction

## JSON Format for Printing

Magic items can be printed as physical cards using the magic item printing feature. Format items as JSON:

### Single Item Format:
```json
{
  "name": "Frostbite +1",
  "category": "Weapon",
  "quality": 4,
  "type": "longsword +1",
  "material": "Glacial Steel",
  "cost": 2100,
  "load": 1,
  "description": "This longsword is forged from steel tempered in glacial waters. The blade constantly emits a faint mist of frost. While wielding this weapon, you can use a Quick Action on your turn to encase it in frost for a short duration. While frosted, the weapon deals 2 frost damage (ignoring AV) on a hit and emits dim light in close range.",
  "properties": "slash, pierce, versatile (+1)"
}
```

### Multiple Items Array:
```json
[
  {
    "name": "Ring of Protection +1",
    "category": "Wearable",
    "quality": 4,
    "type": "ring (apparel slot)",
    "cost": 1050,
    "load": 0,
    "description": "A silver ring engraved with protective runes. While wearing this ring and not wearing armor, you gain +1 AV (enhancement bonus)."
  },
  {
    "name": "Potion of Healing",
    "category": "Consumable",
    "quality": 3,
    "type": "potion",
    "cost": 125,
    "load": 0,
    "description": "Drinking this potion as an Action restores 2d6+2 HP.",
    "uses": 1
  }
]
```

### JSON Field Reference:

**Required Fields:**
- `name` (string): Item name including quality bonus (e.g., "Longsword +2")
- `category` (string): One of: "Weapon", "Armor", "Wearable", "Consumable", "Spell Scroll"
- `quality` (number): 3-8 (corresponds to Q3-Q8)
- `type` (string): Base item type with bonuses OR equipment slot for wearables
- `cost` (number): Total calculated cost in coins
- `load` (number): Weight/encumbrance value
- `description` (string): Complete item description including all effects

**Optional Fields:**
- `material` (string): Special material name if applicable
- `properties` (string): Weapon/armor properties (see property rules)
- `uses` (number): For consumables - how many times it can be used

### Common Categories:

**"Weapon"**: Swords, axes, bows, etc.
- type example: "longsword +2 (pierce, versatile +1)"
- Include weapon damage bonus in name
- Include properties in separate field

**"Armor"**: Body armor, helmets, shields
- type example: "breastplate +2 (heavy d8, rigid 2)"
- Include AV bonus in name
- Include properties in separate field

**"Wearable"**: Rings, amulets, cloaks, boots, belts, gloves, etc.
- type example: "ring (apparel slot)" or "amulet (neck slot)"
- Specify equipment slot in type field
- Load is typically 0

**"Consumable"**: Potions, oils, single-use items
- type example: "potion" or "oil"
- Must include `uses` field (typically 1)
- Cost is per use

**"Spell Scroll"**: Magic scrolls with stored spells
- type example: "arcane spell scroll (rank 2)"
- Include spell name and rank in description
- See spell scroll rules for costs and effects

### Property String Format:

For weapons/armor with properties, list them comma-separated:
- `"agile, light, pierce, versatile (+1)"` - for weapons
- `"heavy (d8), rigid 2"` - for armor
- `"AV +2, parry +1, rigid 1"` - for shields

See [docs/04-equipment/05-armor-weapon-properties.md](/workspaces/nexus-rpg/docs/04-equipment/05-armor-weapon-properties.md) for complete property list.

## Reference Documentation

### Core Rules:
- [Equipment Overview](/workspaces/nexus-rpg/docs/04-equipment/01-items.md) - Quality tiers, item types, value
- [Weapons](/workspaces/nexus-rpg/docs/04-equipment/03-weapons.md) - Weapon types and base stats
- [Armor](/workspaces/nexus-rpg/docs/04-equipment/04-armor.md) - Armor types and base stats
- [Properties](/workspaces/nexus-rpg/docs/04-equipment/05-armor-weapon-properties.md) - All weapon/armor properties

### Magic Items:
- [Magic Item Overview](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/00-overview.md) - How magic items work
- [Magic Item Effects](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/effects.md) - Automatic bonuses by quality
- [Special Materials](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/materials.md) - Material properties and types
- [Enchantments](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/enchantments.md) - All available enchantments
- [Cost Tables](/workspaces/nexus-rpg/docs/04-equipment/07-magic-items/cost-tables.md) - Complete pricing information

### Printing:
- [Magic Item Printing](/workspaces/nexus-rpg/docs/10-gm-tools/00-printing/03-magic-items.mdx) - Card printing interface

## Quick Examples

### Example 1: Early Game Weapon (Q4)
**Silverroot Shortsword +1**
```json
{
  "name": "Silverroot Shortsword +1",
  "category": "Weapon",
  "quality": 4,
  "type": "shortsword +1",
  "material": "Silverroot",
  "cost": 1550,
  "load": 1,
  "description": "This masterfully crafted shortsword is carved from the sacred Silverroot Oak. Silver veins run through the pale wood, and it feels unnaturally light. The weapon grants +1 boon on attacks against lycanthropes and undead creatures.",
  "properties": "agile, light, pierce"
}
```
**Breakdown:** 50 (base) + 1,000 (Q4 one-handed) + 500 (Q4 silverroot material) = 1,550 coins

### Example 2: Mid-Game Armor (Q5)
**Stalwart Chitin Breastplate +2**
```json
{
  "name": "Stalwart Chitin Breastplate +2",
  "category": "Armor",
  "quality": 5,
  "type": "breastplate +2",
  "material": "Chitin",
  "cost": 18250,
  "load": 2,
  "description": "This breastplate is crafted from the hardened carapace of a giant beetle, magically reinforced to rival steel. The overlapping plates are lightweight yet incredibly durable. While wearing this armor, whenever an effect would inflict the charmed, confused, dazed, frightened, paralyzed, staggered, or stunned condition on you, you can choose to ignore that condition. You can use this ability once per day.",
  "properties": "heavy (d8), rigid 2"
}
```
**Breakdown:** 750 (base) + 10,000 (Q5 heavy armor) + 2,500 (Q5 chitin) + 5,000 (Q5 stalwart enchantment) = 18,250 coins
**Note:** Load reduced from 3 to 2 due to chitin's -1 load property

### Example 3: Wearable Item (Q4)
**Boots of Fast Stride +1**
```json
{
  "name": "Boots of Fast Stride +1",
  "category": "Wearable",
  "quality": 4,
  "type": "boots (feet slot)",
  "cost": 1100,
  "load": 0,
  "description": "These dark leather boots are reinforced with silver thread patterns. While wearing these boots, you gain +1 Movement per turn. Ideal for scouts and quick strikers."
}
```
**Breakdown:** 100 (base boots) + 0 (wearables skip magic item base cost!) + 1,000 (Q4 wearable enchantment) = 1,100 coins

### Example 4: Legendary Weapon (Q6)
**Flameheart, Dragon's Wrath +3**
```json
{
  "name": "Flameheart +3",
  "category": "Weapon",
  "quality": 6,
  "type": "greatsword +3",
  "material": "Dragon Bone",
  "cost": 37650,
  "load": 2,
  "description": "This massive greatsword was forged from the bones of an ancient red dragon, its blade etched with draconic runes that glow with inner fire. The crossguard is shaped like dragon wings. While holding this weapon, you can use a Quick Action on your turn to ignite it with flames for a short duration. While ignited, the weapon emits bright light in melee range, dim light in close range, and deals 6 fire damage (ignoring AV) on a hit. You can use this ability twice per day.",
  "properties": "heavy (d8), pierce, two-handed"
}
```
**Breakdown:** 150 (base) + 15,000 (Q6 two-handed) + 7,500 (Q6 dragon bone) + 15,000 (Q6 flaming enchantment) = 37,650 coins
**Note:** The flaming enchantment at Q6 deals 6 fire damage (scaling: Q4=2, Q5=4, Q6=6)

### Example 5: Consumable (Q4)
**Potion of Giant Strength**
```json
{
  "name": "Potion of Giant Strength",
  "category": "Consumable",
  "quality": 4,
  "type": "potion",
  "cost": 325,
  "load": 0,
  "description": "This thick red liquid swirls with golden flecks. Drinking this potion as an Action temporarily increases your Strength by two steps (up to d10) for a medium duration (about 10 minutes). After the duration ends, you suffer one level of exhaustion.",
  "uses": 1
}
```
**Breakdown:** 50 (Q4 base value modifier for consumable) + 150 (Q4 consumable magic item base cost) + 150 (Q4 consumable enchantment equivalent) = 350 coins (approximate)

### Example 6: Spell Catalyst (Q5)
**Staff of Spell Storing +2**
```json
{
  "name": "Staff of Storing +2",
  "category": "Weapon",
  "quality": 5,
  "type": "quarterstaff +2",
  "cost": 6100,
  "load": 1,
  "description": "This gnarled oak staff is topped with a crystal that pulses with arcane energy. Carved runes spiral down its length. As a spell catalyst, it grants +2 spell damage. Once per day, you can choose any rank 2 spell you know—the staff stores this spell within its crystal. You can cast the stored spell once per day without spending Focus.",
  "properties": "crush, reach, versatile (+1)"
}
```
**Breakdown:** 100 (base staff) + 3,000 (Q5 one-handed weapon) + 3,000 (Q5 storing enchantment) = 6,100 coins

---

## Additional Notes

### Harvesting and Crafting
Players with appropriate talents can:
- **Harvest materials** from defeated creatures (see creature harvesting rules)
- **Craft magic items** during downtime (requires time, materials, and skills)
- **Commission enchantments** from NPCs (pay full cost + time)

### Attunement (Optional Rule)
Some GMs may require **attunement** for powerful items:
- Attunement requires a short rest and bonds the item to one character
- Limit characters to 3 attuned items maximum
- Prevents item swapping mid-combat
- Makes treasure distribution more meaningful

### Cursed Items (Optional)
Create cursed items for narrative challenges:
- Appear as beneficial magic items
- Reveal curse after attunement or use
- Require Remove Curse or similar magic to un-equip
- Balance powerful benefits with significant drawbacks

### Artifact-Level Items (Beyond Q8)
Truly unique campaign-defining items may:
- Break standard rules (multiple enchantments, impossible combinations)
- Have intelligence and personality
- Grow in power with the wielder
- Come with significant roleplay hooks
- Should be used sparingly for major story beats

---

*For questions or clarifications on magic item creation, consult the core rulebooks or ask your Game Master.*
