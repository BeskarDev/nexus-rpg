# Lore Schema — the creature `lore` object

Part of the creature-design skill; see [../SKILL.md](../SKILL.md).

A creature may carry a `lore` object, rendered collapsed behind a toggle on the card's
name line so it never competes with play-time reference. It is a **fixed structure**, not
free prose: every creature answers the same questions in the same order, so a reader
learns the shape once. Half the parts are prose and half are shorthand, and the split is
the point.

| Key | Kind | What to write |
|---|---|---|
| `narrative` | **prose**, required | One short passage in the setting's voice. What this creature *is*, not what it does. 2–3 sentences. |
| `environment` | shorthand | Terrain terms, **ordered generic to specific**: `["Desert", "Ruins", "Tomb"]`. See below. |
| `ecology` | **prose** | How they live: diet, range, activity, what wakes or draws them, what people believe and do about them. |
| `tactics` | **prose** | What they actually do in a fight — opening move, what they target, when they break off. Reference their own abilities by name. |
| `treasure` | shorthand + **d6 table** | `{ "scale": "...", "table": [...6 rows...] }`. See below. |
| `organization` | shorthand | Encounter templates (see below). Always include a solitary entry if they are ever met alone. |

Write it to the same standards as rules text: they/their/them, no semicolons or dashes,
no purple prose. Tactics should tell a GM how to *run* them, not restate the stat block.
Omit any optional key rather than writing an empty value — the generator rejects unknown
keys and empty strings outright, so the structure cannot drift entry by entry.

## Writing the prose

`narrative`, `ecology` and `tactics` are the only free prose in the whole schema, which
makes them the only place the writing can go wrong. Four rules, in priority order:

**1. One idea per sentence.** The commonest defect is a sentence carrying three: a subject,
a participial aside, and a second independent clause bolted on with "and". Long sentences
are fine when they are long about *one thing*. Split the moment a second thing arrives.

**2. Open on the concrete thing, close on the turn.** The first sentence is an
establishing shot — what a person would see. Save the wit, the reversal or the dry
observation for the last sentence, where the reader already has an image to hang it on. An
aphorism in the opening slot ("They are the funeral's other congregation") makes the reader
decode before they have been given anything to decode *with*.

**3. Never make the reader unpack an idiom to reach a fact.** "Keeping the distance a
thrown stone travels" is a riddle whose answer is "just out of reach". Write the answer.
Ornament belongs on things the reader already understands.

**4. Write for a middle schooler.** Plain words, short clauses, one idea per sentence — the full rule
and its test live in [../../game-basics.md](../../game-basics.md#reading-level). Hard words are for
precision, never for texture: `sinew` and `signet` stay because they name a thing exactly, while a
`bund` is a bank and `offal` is guts. Varied lengths, too: Three or four sentences with a mix of
lengths reads faster than two balanced ones. Avoid meta-phrasing that explains the
sentence you are writing — "which in practice means", "what this amounts to is" — because
it is always shorter to just say the thing.

> **Before.** They are the funeral's other congregation. Every burial road out of a city has
> its jackals, keeping the distance a thrown stone travels, and every gravedigger knows the
> ones that work their stretch. Nobody has ever successfully driven them off anything.
>
> **After.** A lean grey scavenger of the burial roads. Jackals follow funerals at the edge
> of a thrown stone's range, and they have learned which processions leave food. Every
> gravedigger knows the ones that work their stretch, and none of them has ever driven one
> off for good.

Same length, same facts, and the reader now sees the animal before being told what to think
about it. **This is not a licence to write flatly** — the last clause of the rewrite is the
same joke as the original's last sentence. It just arrives after the image instead of
in place of one.

## Environment

**Environment is a ranked vocabulary**, and the list must run broadest to narrowest:

| rank | meaning | terms |
|---|---|---|
| 1 | region — the land you travel through | Desert, Grassland, Steppe, Forest, Jungle, Mountains, Hills, Marsh, Coast, Sea, River, Wastes, Arctic, Underground, Sky, Otherworld |
| 2 | site — the place you arrive at | Ruins, Settlement, City, Temple, Fortress, Caves, Mine, Road, Farmland, Battlefield, Necropolis, Ship |
| 3 | feature — the chamber or lair you enter | Tomb, Crypt, Vault, Shrine, Lair, Nest, Den, Well, Sewer, Barrow |

This is **groundwork for a future encounter builder**: "a desert tomb, challenging for
three level-4 characters" is a rank-1 filter plus a rank-3 filter, and a tool can only
intersect creature lists per level if every entry agrees on what is broad and what is
narrow. An unknown term or an out-of-order list fails the build. Adding a term is a
deliberate act — extend `ENVIRONMENT_RANKS` in `generate-creatures.ts` rather than
inventing a synonym no filter will ever match.

## Treasure

**Treasure is a rollable d6 table**, not flavour text. Prose tells a GM what a creature
has and leaves them inventing specifics mid-session; a table is usable at once, and six
typed rows are what a future **hoard generator** can compose from.

**Read [treasure-design.md](treasure-design.md) before writing a
treasure table.** Loot is where creature design touches the most other systems at once —
the item catalogues, magic-item construction and pricing, the enchantment and material
catalogues, Quality tiers, and the coin economy — and every one of them has published
numbers that a treasure row can contradict. That file holds the tier→value anchor (the
harvesting table), the pricing formulas, and the worked Mummy example.

The four rules that matter most, in short:

1. **Price against the harvesting table.** It is the published creature-level→coins curve;
   a creature worth less than its own corpse is not worth looting. Items sell for **half**
   value (trade goods and gems for full).
2. **Name published items.** A weapon or armour row cites a real entry from
   `weapons.json` / `armor.json` — there is no *khopesh*, so the ceremonial one is a
   `Scimitar, Quality 2`. Decoration raises value, never damage.
3. **Magic items are assembled, not invented.** Base item + quality + optional special
   material + **at most one enchantment from `magic-item-enchantments.json`**, respecting
   its `applicableCategories` and `qualityTiers`. Magic items are Quality 3+. Keep quality
   in the creature's tier band: Q3–4 ≈ tiers 3–5, Q5–6 ≈ 6–8, Q7–8 only 9–10.
4. **Spread the six rows** across kinds, make every one specific, and give at least one
   row that is worth nothing in coins and everything in play (a name-scroll, a key, a map).

Schema:

```json
"treasure": {
  "scale": "Rich",
  "table": [
    { "kind": "Weapon", "item": "Ceremonial khopesh",
      "stats": "Scimitar, Quality 2", "value": "150 coins",
      "note": "Gold-inlaid but soundly forged, so it carries no penalty." },
    { "kind": "Magic", "item": "Amulet of Willpower",
      "stats": "Wearable (neck), Quality 4", "value": "1,050 coins",
      "note": "While worn, you gain +1 Resist (max. 10)." }
  ]
}
```

| field | required | content |
|---|---|---|
| `kind` | yes | **Weapon, Armor, Magic, Material, Valuables, Supplies, Relic** — closed, so a generator can filter and a GM can find the weapon without reading six rows. |
| `item` | yes | The **name only**, under 60 characters. The generator rejects prose here. |
| `stats` | when it has rules | What it IS in core-rules terms: `Scimitar, Quality 2`, `Wearable (neck), Quality 4`. |
| `value` | usually | `150 coins`, `3d6 x 10 coins`, or `—` when it cannot be sold. Never contradict the Quality in `stats`. |
| `note` | optional | One short qualifier, or a magic item's actual published effect. Not a paragraph. |

`scale` is one of **None, Incidental, Standard, Rich, Hoard** — how much, relative to what
is normal for their tier. A `table` of **exactly six rows** is required unless the scale is
`None`.

> **Treasure scale is new vocabulary.** Nexus has no published treasure-by-tier system,
> so these five words were introduced with the bestiary's lore layer and describe relative
> quantity only. If a real treasure system lands later, this is the vocabulary to
> reconcile with.

## Organization

**Encounter templates** come in two shapes. Either N of this creature:

```json
{ "name": "Warden squad", "count": "2-4" }
```

or a mixed band naming other creatures, for the bands this creature is actually met in:

```json
{ "name": "Tomb guard", "composition": [
    { "count": "1",    "creature": "Mummy Lord" },
    { "count": "6-10", "creature": "Mummy" }
] }
```

Exactly one of `count` or `composition` — both is a size stated twice, neither says
nothing. Every name in a `composition` is **resolved against the roster and linked to
that creature's entry**, across tiers, and the build fails naming any creature that does
not exist. So a band can reference a leader written later, but only after that leader is
in `creatures.json`.

## Reference implementation

**Mummy (tier 4) is the reference implementation** — read it in `creatures.json` before
writing your first lore block.
