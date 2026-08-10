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

| Creature level | Trophy dice (harvesting) | Range you design inside | Middle | Tool / Material Quality |
|---|---|---|---|---|
| 1 | 2d6 | 2 to 12 | 7 | 1 |
| 2 | 2d6 x 5 | 10 to 60 | 35 | 2 |
| 3 | 2d6 x 10 | 20 to 120 | 70 | 3 |
| 4 | 2d6 x 20 | 40 to 240 | 140 | 4 |
| 5 | 2d6 x 50 | 100 to 600 | 350 | 5 |
| 6 | 2d6 x 100 | 200 to 1,200 | 700 | 5 |
| 7 | 2d6 x 200 | 400 to 2,400 | 1,400 | 6 |
| 8 | 2d6 x 500 | 1,000 to 6,000 | 3,500 | 6 |
| 9 | 2d6 x 1,000 | 2,000 to 12,000 | 7,000 | 7 |
| 10 | 2d6 x 2,000 | 4,000 to 24,000 | 14,000 | 7 |

**The dice are a design tool. The published value is static** (owner ruling). Use the dice
however suits you while writing — roll them for a value you have no opinion about, or read the
row as a **range** and place the item deliberately inside it — then write the number you
arrived at and never the dice.

Placing inside the range is the more useful half, because the specimen is usually described
already: a mange-thin jackal pelt sits near the bottom of its range, a viper skin taken whole
without a cut sits near the top, a hide ruined by careless skinning sits low. The description
and the number then say the same thing, which a rolled value cannot guarantee.

The reason the value never ships as dice: the d6 that picked the row was already the roll, a
second roll slows the table, and on a gear row a rolled amount can contradict the item's
published Quality.

### Scale is measured in trophies, and you check the WHOLE table

**Add the six rows up and divide by the tier's trophy value.** Pricing row by row is what lets a
table drift: every single row looks defensible on its own, and the total quietly reaches ten times
what the creature is worth. A tier-0 swarm was first written with a 40-coin row and a 97-coin
table against a 3-coin trophy — 32 trophies out of a creature a level-1 party kills with a torch.

| Scale | Table total | Biggest single row | What it is |
|---|---|---|---|
| **None** | no table | — | No body worth harvesting and no lair — a summoned elemental, an illusion. **Not for animals.** |
| **Incidental** | **5-10 trophies** | ~3 trophies | A den, a nest, personal effects. The tier-0 default. |
| **Standard** | **10-20 trophies** | ~6 trophies | What a creature of this tier normally has on them, or a lair with something in it. |
| **Rich** | **25-60 trophies** | ~30 trophies | Grave goods, a warlord's gear. One row carries it. |
| **Hoard** | **100+ trophies** | the outlier IS the point | A dragon's pile. |

Worked at tier 0 (trophy = 3 coins): Incidental is a **15-30 coin table** whose best row is around
**10 coins**. At tier 4 (trophy = 140) the same scale is a 700-1,400 coin table. The bands travel
with the tier, which is the whole reason they are written in trophies.

**One catalogue consumable may blow past the row cap, and that is not an error.** A single dose of
`Weapon Poison (weak)` is 17 coins because the alchemy list says so, which is nearly six tier-0
trophies on its own. Let it stand and **do not inflate the other five rows to match** — the viper's
venom being worth more than the rest of the snake is a true fact about the economy, and evening the
table out only hides it.

Creatures carrying **published equipment** break these bands entirely: see the note at the end of
§2. That tension is real and unresolved, not a licence to price freehand.

Two economic facts that change what a row is worth:

- **Items sell for HALF their value, and looted gear is not intact.** Trade goods and gems
  are the exception and sell for full. **Damaged sells for a quarter, broken for a tenth**
  (`01-items.md` § Value) — and `02-creature-rules.md` says equipment from fallen creatures
  is *almost always damaged*, so a creature's own kit is a **quarter** of list price in
  hand, not a half. A 100-coin battleaxe off a raider fetches 25 coins, or 50 after a rest
  spent repairing it. Say which condition you mean in the description, and leave the
  arithmetic to the rules.
- **A Quality rating already implies a price.** Q1 25 · Q2 75 · Q3 250 · Q4 750 · Q5 2,500
  · Q6 7,500 · Q7 25,000 · Q8 75,000 coins. Never state a `value` that contradicts the
  Quality you gave the same item.

**Both facts above are for pitching the row. Neither one goes into it.** The description says
what the item is and what it is for. It never says "sells for 7", never explains the halving,
and **never labels an item a trade good** — full-value selling is a property of the category,
published once and applied by the GM to everything in it, so restating it per row implies this
clutch of eggs is special and files them beside gemstones. Condition is the one economic word
that stays, because "damaged" and "broken" describe the object rather than the market.

**And one value per row.** No second, conditional price: not "a cut skin is worth 2", not "a
clean job is worth up to 12". Those hand the GM a fork to adjudicate before they can hand over
one item. If the condition changes the price, **pick the condition and price that** — the row
is one specific object, not a range of possible ones.

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

**Name the part as it comes off the animal.** You cut sinew off a jackal, not *dried* sinew, and hide
off a crocodile, not *tanned* hide. Drying, tanning and curing are work somebody does afterwards, and
naming the finished product hands the party a crafting step they never paid for. Write the raw part and
let the Quality carry how good it is.

### 1.2 The meat row — harvesting sets the amount, the Hunter role sets the words

Every creature that can be eaten owes a food row, and both halves of it are published. They are in
**different units**, and reconciling them is the whole of this section.

| Source | What it says |
|---|---|
| `06-harvesting-creature-parts.md` | Harvested food is used **the same day instead of a ration**, and the amount comes from **Size**: **1 daily amount from a Small creature, doubling per size step** (2 Medium, 4 Large, 8 Huge). |
| `01-how-to-roll.md` § Supply Checks | Every supply item has **3 uses**. A `d4` die spends one on a 1-3. |
| `07-challenges/02-travel.md`, Hunter role | The sentence to reuse verbatim: *"raw meat equal to 1 x simple rations (d4). At the start of each day, remove 1 use as the meat spoils."* |
| `supply.md` | `Simple Rations (d4)` = **15 coins for 3 uses**, so 5 coins a use. |

**A use is not a day, and an item is not a daily amount.** Both conversions have to be done, and
the first one is easy to miss:

- **An item is 3 uses**, so reading the Hunter role's "1 x simple rations (d4)" as a Small
  creature's yield triples what harvesting grants. The first draft did exactly that and fed a party
  six person-days off a young crocodile.
- **A use is 1.33 days.** The Supply Check spends a use on a 1-3 of a `d4`, so **75% of days cost a
  use** and the other quarter is free. One 3-use item therefore feeds someone about **four days**,
  not three.

Put together: **uses = daily amounts x 0.75, rounded up, floor 1.**

| Size | Harvesting yield | Uses | Row reads | Value |
|---|---|---|---|---|
| Tiny | (below the table, floor at 1) | 1 | `1 x simple rations (d4) with 1 use left` | 2 coins |
| Small | 1 daily amount | 1 | `1 x simple rations (d4) with 1 use left` | 2 coins |
| Medium | 2 | 2 | `1 x simple rations (d4) with 2 uses left` | 4 coins |
| Large | 4 | 3 | `1 x simple rations (d4)` | 6 coins |
| Huge | 8 | 6 | `2 x simple rations (d4)` | 12 coins |
| Gargantuan | 16 | 12 | `4 x simple rations (d4)` | 24 coins |

A **Large** creature yielding exactly one full rations item is the sanity check on the whole
derivation: four daily amounts, three uses, four days of eating. That is a deer feeding one traveller
for the better part of a week, which is the right shape.

**Value is 2 coins a use for raw meat**, half the packed price rounded down, because it spoils and a
full rations item includes a waterskin and keeps. **Preserved food found in a lair keeps the full 5
coins a use** — a week-old bundle of dried figs and salt fish is a packed ration somebody else paid
for, not a carcass. Meat is never the valuable row: a whole crocodile is
4 coins of food against 25 coins of belly hide, which is the correct relationship between what you
eat and what you sell.

Three rules on top:

- **Always carry the spoilage clause**, verbatim from the Hunter role. It is what makes harvested
  food different from bought food, and it is the reason a big kill does not solve the campaign's
  logistics.
- **Build shifts the row one step at most**, and never below one use. A lean animal sits at the
  bottom of its size band, a fat one at the top. Do not invent fractions of a use.
- **Say what it is not good for.** Carrion eaters, diseased creatures and anything dead a while are
  food a party may regret. One clause.
- **Found food has to be plausibly edible, and age is the usual disqualifier.** A sealed jar of
  grain out of a four-hundred-year-old tomb is not `1 x simple rations (d4)`, whatever the seal has
  kept out. If a row wants to hand over ancient supplies, it is a **curiosity or a trade good**, not
  food: an unbroken offering jar is worth something for the seal on its stopper and nothing for what
  is inside. Recently dropped or preserved food is fine — a week-old bundle of dried figs and salt
  fish is exactly what a market thief's nest holds.

Undead, constructs and elementals have no meat row at all. Do not write "inedible" as a row — omit
it and use the slot for something worth rolling.

> **Gap:** the harvesting table starts at **level 1** and has no row for level 0. Until it gains one,
> design tier-0 trophies against **1d6** — a range of 1 to 6, middle 3 — with Quality 1 parts. That is
> the straight extrapolation: half a level-1 trophy.

## 2. Mundane gear — name the published item

A weapon or armour row must name a **real catalogue entry**, because the whole point of the
`description` is that the GM can look it up and hand over working statistics.

- Search `weapons.json` / `armor.json` / `equipment.json` for the closest published item.
  If the flavour name has no entry (there is no *khopesh*), name the mechanical
  equivalent: `Scimitar, Quality 2`.
- Quality 1–2 is ordinary kit, **Quality 3 is the finest non-magical craftsmanship**.
  A Q3 item is already a 250-coin prize and a real find below tier 5.
- Decoration is value, not power. A gold-inlaid Scimitar is still a Scimitar: raise the
  `value`, never the damage.
- **Magic items are Quality 3+ by definition** — never label a Q1–Q2 item "magic".

> **Gear breaks the scale bands, and the gap is real.** A tier-1 raider's Battleaxe is 100 coins
> against a 7-coin trophy, so their table lands near 35 trophies where `Standard` says 10-20.
> Neither number is wrong: the harvesting curve prices a **corpse**, the item catalogue prices
> **gear**, and a humanoid carries gear. Write the catalogue price (rule 2 forbids contradicting an
> item's Quality), let the damaged condition do its work, and do not re-tune the beast bands to
> accommodate people. Open question in `.drafts/bestiary/creatures/tier-0-1-lore.md` (Q8L.1).

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
- **Supplies** are the practical rows: rations, oil, rope, antitoxin — **named from the catalogue,
  never described in prose.** "Four days of food and water for one rider" is a `Simple Rations (d4)`
  written the long way, and it hands the GM a quantity they then have to convert. Name the item and
  say how full it is.

### 4.1 Uses mean two different things, and a bundle is not "damaged"

For **gear** — a weapon, a piece of armour — uses are **durability**, and the published condition
words apply: intact, `damaged` (a quarter of value), `broken` (a tenth).

For **supplies and bundles** — rations, oil, arrows, javelins — uses are **how many are left**.
Each javelin in a bundle is a whole javelin or a broken one, with nothing in between, so a
part-spent bundle is not a damaged item: it is a full-quality item with fewer uses.

- ❌ `Javelin, Quality 2, bundle (d4), damaged and part spent` — two contradictory conditions on
  one row, and neither prices the loot.
- ✅ `Javelin, Quality 2, bundle (d4) with 1 use left` — 17 coins, being a third of the 50-coin
  bundle. Say where the rest went if it is interesting ("the rest are somewhere downrange").

**Price a part-spent supply per use**: catalogue price divided by three, times the uses left. That
is the same arithmetic the meat rows use, for the same reason.

**And never restate the repair rules.** "One rest spent on repairs makes it whole" is published,
applies to every damaged item a party ever loots, and belongs on none of them (principle 32).
### 4.2 Relic — the row that is worth nothing and changes everything

**Every table owes one row that is not money**, and `Relic` is it: a thing whose value is
what it makes possible. Two rules, and the second is the one that gets missed.

**It must UNLOCK, not merely inform.** "Somebody stopped coming to work" tells a GM a person
died and hands them nothing to do. "A priest needs this to lay them properly" resolves the
creature. Write the second kind, and if the row cannot say what it opens, it is Valuables
with a story, not a Relic.

**Vary the channel.** The first bestiary batch produced six relics out of eight that were *a
name written on something* — a wrapping, tally sticks, a signet, a name-tile, a tally cord,
a tablet. Each was defensible and the set was monotonous, which is the same failure as every
swarm reaching for `distracted`. Five channels, and **a batch may not use one more than
twice**:

| Channel | Unlocks | Examples |
|---|---|---|
| **Key** | physical access | a seal that matches a door, a tally stick cut to a lock, a warden's ring |
| **Map** | a place | a floor tile with the tomb's plan, a route scratched in a hide, a star-chart |
| **Name** | a rite, a claim, an identification | a name-tile a priest needs, a signet the village will know |
| **Proof** | leverage over a person or faction | a tally cord of who paid, an agreement tablet, a forged seal |
| **Summons** | draws something, or gets its bearer noticed | a token a cult answers, a horn, a mark that opens doors and closes others |

**Bound what a sealed thing contains.** A sealed message whose description is "it says what
it says" is the open-ended "GM decides" the house rules forbid: give a short menu of what is
plausibly inside (a shipment and a date, a name and a price, an order nobody wants attributed)
so the GM can pick one at speed.

## 5. Composing the six rows

- **Spread the kinds.** Six sacks of coins is a wasted table. A good spread names two
  Valuables, one Material, one gear row, one Magic or Relic, and one Supplies.
- **Order does not encode rarity** — a d6 is flat. If something should be rare, do not put
  it on the table; put it in the creature's lair description instead.
- **Everything must be specific.** "Some gold" is not a row. "Funerary rings, 120 coins" is.
- **Fit the creature's fiction.** The loot answers "why did *they* have this?" A mummy
  carries grave goods sealed in with them, not a merchant's ledger.
- Write `item` as a **short name** — the generator caps it at 40 characters and most rows want
  half that (`Jackal pelt`, `Sinew`). The worth goes in `value`, and one line in `description`
  says what the thing is in rules terms and what it is for. Nothing else.

## Worked example — Mummy (tier 4, Basic, Rich)

Tier 4 trophy ≈ 140 coins, so Standard rows sit near 100–200 and the magic row is the
outlier that makes the scale "Rich".

| d6 | kind | item | description | value |
|---|---|---|---|---|
| 1 | Valuables | Gilded pectoral | Sheet gold over cedar. Breaks up into three sellable pieces. | 200 coins |
| 2 | Valuables | Funerary rings | Worn on every finger, one for each of the mummy's titles. | 120 coins |
| 3 | Material | Jar of natron and resins | Crafting material, Quality 4. Preserves anything organic. | 80 coins |
| 4 | Weapon | Ceremonial khopesh | Scimitar, Quality 2. Gold inlay, soundly forged, no penalty. | 150 coins |
| 5 | Magic | Amulet of Willpower | Wearable (neck), Quality 4. While worn, you gain +1 Resist (max. 10). | 1,050 coins |
| 6 | Relic | Canopic jars and name-scroll | Names the mummy. A priest needs both to lay them. | — |

Row 5 is the one to study: *Amulet of Willpower* is a real wearable enchantment
(`of Willpower`, wearable, Q4–6, +1/+2/+3 Resist), priced 50 (neck slot) + 1,000 (Q4
wearable enchantment) = 1,050 coins. It is thematic for a tomb guardian, mechanically
published, and correctly priced — none of which is true of an invented "amulet against
decay".

## Failure modes

- ❌ An invented magic effect. Enchantments come from the catalogue, one per item.
- ❌ A magic item below Quality 3, or an enchantment used outside its `qualityTiers` /
  `applicableCategories`.
- ❌ `value` contradicting the Quality named in the description.
- ❌ A sale price in the row ("sells for 7"), a trade-good label, or any other restatement of
  the published economy.
- ❌ A second, conditional value ("a cut skin is worth 2"). One row, one object, one number.
- ❌ A clause defending the row against a mistake nobody was going to make ("Chitin proper is a
  Quality 3 special material, and this is not that"). Say it once — principle 32.
- ❌ An em dash, en dash or semicolon anywhere in the row, including `—` as a stand-in for "cannot
  be sold" — omit `value` instead. The generator fails the build on all three.
- ❌ Calling a bundle or supply `damaged` — its uses are quantity, not condition (§4.1).
- ❌ A closing quip on a row ("A trophy is still a trophy", "the rest are somewhere downrange").
  Rows are reference, not voice.
- ❌ Restating the repair rules, or describing provisions instead of naming the supply item.
- ❌ A name carrying its own description (`Jackal pelt, mange-thin`), or a processed part
  (`Dried sinew`) the party would still have to make.
- ❌ A food row that invents its own wording instead of the Hunter role's.
- ❌ Quality far above the creature's tier band.
- ❌ A weapon or armour row that names no published item.
- ❌ Six rows of coins, or a row as vague as "treasure".
- ❌ Decoration that adds mechanical power instead of value.
