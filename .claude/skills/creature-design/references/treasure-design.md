# Treasure Design — creature loot tables

How to write the `lore.treasure` block so it hooks into the published economy instead of
inventing one. Every number below comes from the rules; do not derive them from memory.

| System | Where |
|---|---|
| Quality tiers and their base values | `docs/04-equipment/01-items.md` § Quality |
| Coins, selling, worked value examples | `docs/04-equipment/01-items.md` § Value |
| Weapon / armor / gear catalogue | `src/utils/data/json/{weapons,armor,equipment}.json` |
| Magic item construction and pricing | `docs/04-equipment/07-magic-items/` (`00-overview.md`, `cost-tables.md`) |
| Enchantment catalogue (closed set) | `src/utils/data/json/magic-item-enchantments.json` |
| Material catalogue (base + special) | `src/utils/data/json/magic-item-materials.json` |
| Harvesting creature parts (the tier→value anchor) | `docs/06-scenes/06-harvesting-creature-parts.md` |
| Magic item design rules | the `magic-item-design` skill |

## 1. The anchor: what a creature of this tier is worth

**Harvesting is the published tier→value curve, so price treasure against it.** A creature
that cannot be sold for more than its own corpse is not worth looting.

| Creature level | Trophy value | Tool / Material Quality |
|---|---|---|
| 1 | 2d6 coins | 1 |
| 2 | 2d6 x 5 | 2 |
| 3 | 2d6 x 10 | 3 |
| 4 | 2d6 x 20 | 4 |
| 5 | 2d6 x 50 | 5 |
| 6 | 2d6 x 100 | 5 |
| 7 | 2d6 x 200 | 6 |
| 8 | 2d6 x 500 | 6 |
| 9 | 2d6 x 1,000 | 7 |
| 10 | 2d6 x 2,000 | 7 |

Rule of thumb per row, against that tier's average trophy value (2d6 ≈ 7):

| Scale | Typical row | Why |
|---|---|---|
| **None** | no table | Reserve for creatures with no body worth harvesting and no lair — a summoned elemental, an illusion. **Not for animals.** |
| **Incidental** | ~¼ to ½ a trophy | Personal effects, a few coins. |
| **Standard** | ~½ to 1½ trophies | What a creature of this tier normally has on them. |
| **Rich** | ~1 to 3 trophies, one row well above | Grave goods, a warlord's gear. |
| **Hoard** | several rows above, one far above | A dragon's pile. The outlier IS the point. |

Two economic facts that change what a row is worth:

- **Items sell for HALF their value, and looted gear is not intact.** Trade goods and gems
  are the exception and sell for full. **Damaged sells for a quarter, broken for a tenth**
  (`01-items.md` § Value) — and `02-creature-rules.md` says equipment from fallen creatures
  is *almost always damaged*, so a creature's own kit is a **quarter** of list price in
  hand, not a half. A 100-coin battleaxe off a raider is 25 coins, or 50 after a rest spent
  repairing it. Write the sale price, and say which condition you mean.
- **A Quality rating already implies a price.** Q1 25 · Q2 75 · Q3 250 · Q4 750 · Q5 2,500
  · Q6 7,500 · Q7 25,000 · Q8 75,000 coins. Never state a `value` that contradicts the
  `stats` Quality you gave the same item.

### 1.1 Beasts are not `None` — their body is the treasure

The commonest mistake at low tier is giving an animal an empty table because it has no pockets. That
confuses **carrying** nothing with **yielding** nothing, and it ignores
`docs/06-scenes/06-harvesting-creature-parts.md`, which turns any creature into a **Trophy**, a **Tool**,
a **Material** and a day or more of food. Those four are half a table before you have invented anything,
and the harvesting page already prices them by creature level.

**The lair carries what the animal cannot.** A den, a nest, a gullet or the fill under a floor is a
legitimate home for the treasure block, and it is usually where a beast's interesting rows come from —
the jackal's den holds a bell dragged off a graveside, the crocodile's gizzard holds a signet ring. Say
in the `scale` line which it is, so a GM knows whether the loot needs a body or a search.

**Keep low-tier rows small but useful.** A dose of venom written as `Weapon Poison (weak), 1 use` is a
real item a level-1 party will coat a spear with. Belly hide written as `Leatherworking material,
Quality 1` becomes armour. Vendor trash is the failure mode, not the target.

> **Gap:** the harvesting table starts at **level 1** and has no row for level 0. Until it gains one,
> write tier-0 trophies as `1d6` coins with Quality 1 parts, which is the straight extrapolation.

## 2. Mundane gear — name the published item

A weapon or armour row must name a **real catalogue entry**, because the whole point of
the `stats` field is that the GM can look it up and hand over working statistics.

- Search `weapons.json` / `armor.json` / `equipment.json` for the closest published item.
  If the flavour name has no entry (there is no *khopesh*), name the mechanical
  equivalent: `Scimitar, Quality 2`.
- Quality 1–2 is ordinary kit, **Quality 3 is the finest non-magical craftsmanship**.
  A Q3 item is already a 250-coin prize and a real find below tier 5.
- Decoration is value, not power. A gold-inlaid Scimitar is still a Scimitar: raise the
  `value`, never the damage.
- **Magic items are Quality 3+ by definition** — never label a Q1–Q2 item "magic".

## 3. Magic items — built, not invented

Nexus magic items are **assembled from a closed catalogue**, not written freehand. An
invented effect is the single most common way a treasure row breaks the game.

Cost = **base item** + **magic item base cost** (by quality) + optional **special
material** + optional **one enchantment**. Full tables in `cost-tables.md`.

- **One enchantment per item, maximum**, and it must exist in
  `magic-item-enchantments.json`. Check `applicableCategories` (a wearable enchantment
  cannot go on a sword) and `qualityTiers` (an enchantment exists only at certain
  qualities).
- **Wearables skip the magic item base cost** — they gain value only from their
  enchantment. Slot base costs: Head/Neck/Hands/Rings/Waist 50 coins, Back/Body/Feet 100.
  Wearable enchantment cost: Q3 +300, Q4 +1,000, Q5 +3,000, Q6 +10,000.
  > Worked: an amulet (Neck, 50) with a Q4 wearable enchantment = 50 + 1,000 = **1,050 coins**.
- **Special materials** (`materialType: "special"` in `magic-item-materials.json`) come in
  quality bands — Q3–4 Chitin, Monster Bone, Wyrmhide, Dwarf-Steel…; Q5–6 Mithril,
  Adamantite, Dragon Scales…; Q7–8 Orichalcum, Aegium, Elder Dragon Bone. Match the band
  to the item's quality, and prefer a material the creature plausibly explains.
- Pitch quality against the creature's tier: **Q3–4 around tiers 3–5, Q5–6 around tiers
  6–8, Q7–8 only for tiers 9–10.** A Q6 item on a tier 2 creature breaks progression.

## 4. Materials and other rows

- **Material** rows should state a Quality, since harvesting already ties material Quality
  to creature level (table above). A tier 4 creature yielding a Quality 4 material is
  consistent; a Quality 7 one is not.
- Prefer a **named material from the catalogue** when the creature plausibly provides it
  (Monster Scales from a beast, Dragon Bone from a dragon). Invent a mundane substance
  only when nothing published fits.
- **Supplies** are the practical rows: rations, oil, rope, antitoxin — priced from
  `equipment.json`.
- **Relic** rows may be worth nothing in coins and everything in play: a name-scroll, a
  map, a key. Give them `value: "—"` and say what they unlock. Every table wants at least
  one row that is not money.

## 5. Composing the six rows

- **Spread the kinds.** Six sacks of coins is a wasted table. A good spread names two
  Valuables, one Material, one gear row, one Magic or Relic, and one Supplies.
- **Order does not encode rarity** — a d6 is flat. If something should be rare, do not put
  it on the table; put it in the creature's lair description instead.
- **Everything must be specific.** "Some gold" is not a row. "Funerary rings, 3d6 x 10
  coins" is.
- **Fit the creature's fiction.** The loot answers "why did *they* have this?" A mummy
  carries grave goods sealed in with them, not a merchant's ledger.
- Write `item` as a **name under 60 characters** (the generator enforces this), numbers in
  `stats` and `value`, and at most one short qualifying sentence in `note`.

## Worked example — Mummy (tier 4, Basic, Rich)

Tier 4 trophy ≈ 140 coins, so Standard rows sit near 100–200 and the magic row is the
outlier that makes the scale "Rich".

| d6 | kind | item | stats | value |
|---|---|---|---|---|
| 1 | Valuables | Gilded pectoral | — | 200 coins |
| 2 | Valuables | Funerary rings and amulets | — | 3d6 x 10 coins |
| 3 | Material | Sealed jar of natron and resins | Quality 4 material | 80 coins |
| 4 | Weapon | Ceremonial khopesh | Scimitar, Quality 2 | 150 coins |
| 5 | Magic | Amulet of Willpower | Wearable (neck), Quality 4 | 1,050 coins |
| 6 | Relic | Canopic jars and name-scroll | — | — |

Row 5 is the one to study: *Amulet of Willpower* is a real wearable enchantment
(`of Willpower`, wearable, Q4–6, +1/+2/+3 Resist), priced 50 (neck slot) + 1,000 (Q4
wearable enchantment) = 1,050 coins. It is thematic for a tomb guardian, mechanically
published, and correctly priced — none of which is true of an invented "amulet against
decay".

## Failure modes

- ❌ An invented magic effect. Enchantments come from the catalogue, one per item.
- ❌ A magic item below Quality 3, or an enchantment used outside its `qualityTiers` /
  `applicableCategories`.
- ❌ `value` contradicting the Quality in `stats`.
- ❌ Quality far above the creature's tier band.
- ❌ A weapon or armour row that names no published item.
- ❌ Six rows of coins, or a row as vague as "treasure".
- ❌ Decoration that adds mechanical power instead of value.
