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
| `physiology` | shorthand + one line | `{ "size", "weight", "lifespan", "reproduction" }`. The body facts, under the ecology. See below. |
| `tactics` | **prose** | How a GM **runs** them: opening move, what they target, how they behave under pressure, when they break off. **The creature is the subject of every sentence**, and their own attacks and abilities are the only game terms allowed. See below. |
| `treasure` | shorthand + **d6 table** | `{ "scale": "...", "table": [...6 rows...] }`. See below. |
| `organization` | shorthand | The group sizes this creature is naturally met in, in the D&D 3.5 Organization style: `Solitary`, `Pack (3-6)`, mixed bands. See below. |

Write it to the same standards as rules text: they/their/them, no purple prose, and **no em
dashes, en dashes or semicolons anywhere** (CLAUDE.md) — the generator now walks every string in
the block and fails the build on all three, including inside a treasure row. Split the sentence,
use "such as", or omit the field. An unsellable row omits `value` rather than writing `—` for it. Tactics should tell a GM how to *run* them, not restate the stat block.
Omit any optional key rather than writing an empty value — the generator rejects unknown
keys and empty strings outright, so the structure cannot drift entry by entry.

## Writing the prose

`narrative`, `ecology`, `tactics` and `physiology.reproduction` are the only free prose in the
whole schema, which makes them the only place the writing can go wrong. **The rules and their
worked examples live in [principles/writing.md](principles/writing.md) (principles 29-32) — read
it before writing prose.** This is the checklist to run against a finished draft:

| # | Check | Principle |
|---|---|---|
| 1 | One idea per sentence. Long is fine when it is long about one thing. | 29 |
| 2 | Open on the concrete thing, close on the turn. No aphorism in the first slot. | 29 |
| 3 | No idiom the reader has to unpack to reach a fact. | 29 |
| 3a | **Register pass, on the finished draft.** Go noun by noun for the **hard word**, then clause by clause for the **clever construction** made of common words. Point at the fact each sentence delivers and count the steps to it. **List what you swapped** — a pass with no list did not happen. | 29a |
| 4 | Read it aloud — any unintended pause is the defect. | 30 |
| 5 | No modern narrator. Attribute beliefs, never debunk them, leave the truth open. | 31 |
| 6 | Only `tactics` addresses the table. No "the party" elsewhere — the generator enforces it. | — |
| 7 | Say it once. Cut any clause defending a statement already made. | 32 |
| 8 | Middle-school register, plain words, varied sentence lengths. | 29 |

Rule 6 is schema-specific and has no principle behind it: `narrative`, `ecology` and
`physiology` describe a creature that existed before the campaign and carries on after it, so
they name the people who actually meet them — villagers, gravediggers, tomb robbers, masons.
`tactics` is GM instruction, so "the party" is the right word there.

> **Before.** They boil up when the floor is broken. That makes them a consequence of what the
> party just did, not an ambush.
>
> **After.** They boil up when the floor is broken. They do not lie in wait, so whoever wakes
> them has just broken the floor they nest under, and that is usually a robber, a mason, or a
> priest come to re-seal a chamber.

The second costs nothing and buys three named kinds of person, any of whom can be an NPC, a
rumour or a corpse in the room.

## Tactics

**`tactics` is combat instructions.** It tells a GM how to play this creature in an encounter and
nothing else. Everything it says should be actionable at the table in the middle of a fight.

**The five things it covers**, in roughly this order, omitting any that do not apply:

| | |
|---|---|
| **Opening** | how the fight starts. Do they ambush, wait, close, open at range, refuse to start one at all? What triggers them? |
| **Target priority** | who they attack. "Whoever is already hurt", "whoever comes at the line", "the nearest hands" |
| **The turn loop** | which attack or ability, in what order, and what it sets up. This is where their own abilities are named |
| **Breaking off** | when they flee, when they stop pursuing, what they will not follow past, or that they do not rout at all |
| **Hard limits** | anything that overrides the above. Cannot be parleyed with, will not leave the burial ground, turns from fire |

**Cut everything else.** The recurring failure is not length, it is **justification**: a sentence that
explains why the instruction is correct instead of giving another instruction.

| ❌ rambling | ✅ instruction |
|---|---|
| "Claws are the opening, because the claws are what lands the daze and the daze is what makes the next one worse" | "Lead with **Claws**, which dazes and then stuns" |
| "Once a target is stunned they bite, every time, since **Feeding Frenzy** puts the HP back and nothing else on the card does" | "Against a stunned target they switch to the **Bite** and stay on it" |
| "**Braced Spear** is what they are for" | "**Braced Spear** catches anyone trying to leave their reach, so hold the position and let people walk into it" |
| "They do not strike twice. They take hold and lean, and a held character on the ground under a dead weight is how a husk actually kills somebody" | "Once they have hold, switch to **Bearing Down** and use it every turn after, which puts the held character prone" |
| "One is a nuisance and twenty are the encounter" | *(cut, it is a remark about the design)* |

Three specific bans, each of which produced a rewrite:

- **No design commentary.** "Wounding them changes the fight rather than ending it", "which sets them
  apart from most of the dead", "they are the softest thing in the encounter and they know it". True,
  and none of it tells a GM what the creature does.
- **No saying it twice.** The Ghoul said "two things move a ghoul off a target, an easier body and
  fear" and then said both of them again in the next sentence.
- **No fiction that repeats `narrative` or `ecology`.** Those fields exist and the GM has read them.

**Length follows from this, it is not a target.** A creature with a simple loop is done in fifty words.
Ninety is a lot. The batch-2 rewrite cut nine fields from an average of 122 words to 91 without losing
a single instruction, because everything removed was explanation.

It is still **read aloud-able prose, not a rules paragraph**. The creature's own attacks and abilities are named in **bold**, because that
is how a GM finds the line on the card. **Everything else is plain language.**

**Never code-style an ability name** (owner ruling, 2026-08-11). Backticks are for code, and this
is prose a GM reads at the table. The house style already has a channel for a mechanical term and it
is bold — `docs/CLAUDE.md`, *"**Bold** for mechanical terms and conditions"*. An ability name in a
sentence that is **already** bolded for emphasis simply stays inside it: write
**"Braced Spear is what they are for."**, never nested bold.

| ❌ game term | ✅ plain |
|---|---|
| "no amount of Stealth solves it" | "no amount of creeping solves it" |
| "an ally who cuts the grappled character free" | "whoever cuts their friend loose" |
| "walk a medium distance and the encounter is over" | "walk away far enough and it is over, and `Grave-Bound` says how far" |
| "the band **rolls Morale**, because the published trigger fires when the elites are removed" | "the band's nerve goes with them" |

The reason is division of labour, not squeamishness about rules. **The numbers are already on the
card**, one line above, and a GM who wants the exact leash distance reads the ability. What tactics
adds is the thing no stat block can hold: what these creatures *want*, who they go for, and when
they stop. Spending its sentences restating skill names and range bands wastes the only field that
can say those things, and it makes a paragraph a GM has to parse rather than glance at.

**The creature is the subject, and the emphasis rules are in
[principles/writing.md](principles/writing.md) principle 33** — cut staging rather than converting it,
turn every limit into behaviour, and test whether the sentence would survive in a scout's report.

Two consequences worth stating:

- **Name the creature's own ability rather than the rule it invokes.** `Grave-Bound` beats "a
  medium distance", because the ability carries the number and cannot drift from it.
- **A published rule the party triggers is described by its effect**, not its name. The band losing
  its nerve *is* Morale, and every GM runs it without being told which trigger fired.

**`tactics` says whether the creature can be talked to, and `Intelligent` does not** (D-079). The
additive is a mechanical statement — a mind exists, so no automatic immunity to mind-affecting
conditions, and the creature may cast or command its own kind. It is **not** a promise that parley
works. Whether it does is a lore statement, written in `ecology` and `tactics`, and it may say no. A
ghoul cooperates inside its colony, coordinates a hunt, and still sees an adventurer as food. Say so
in the field, because a GM running the encounter off the card otherwise has to guess, and half of them
will guess wrong in each direction.

**And where parley does work, `tactics` says what ends the arrangement** (D-125). A creature that can be
dealt with is not a creature whose bargain holds, and silence on the point reads as "the deal holds",
which is the default a GM applies and usually the wrong one. **The distinction is culture, not
intelligence.** A Folk has custom, obligation and memory of an agreement, so a deal with one is enforced
by something outside the moment. A creature dealing purely from appetite has none of that scaffolding,
and it is not treacherous either, because treachery needs a promise the creature understands itself to be
breaking. The deal simply stops being the easiest option and nothing in the creature registers a change.

One clause, actionable at the table:

| ✅ | Creature |
|---|---|
| "an ogre the party has paid turns on them the moment something easier stands closer" | Ogre |
| "they can be talked to before the rite starts and not once it has" | Cult Priest |

**This is also the honest form of a *buyable* Treat.** Being able to pay a creature off is a good
counterplay channel and it is only interesting while it stays a gamble. A creature that can be reliably
bought is an encounter the party skips with coin.

**A field that says a mechanic was added must be updated when the mechanic is** (D-073 and D-071's
consequence). `tactics` is the field most likely to fall silently out of date, because nothing in the
build gate compares it to the attacks and abilities beside it. When a published creature gains an
attack, a rider or a trait, re-read its `tactics` in the same pass: three records in batch 1 gained
their best mechanic and briefed a GM on the old one for a week.

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
narrow.

**All three ranks are closed lists, not just rank 1.** The 16 regions, 12 sites and 10
features above are the whole vocabulary, and the generator rejects anything else by name —
`Graveyard` and `Ossuary` fail the build exactly as an invented region would. That is the
point of the field: a tag is only a filter if several creatures share it, and a bestiary
that coins `Ossuary` for the one creature that inspired it has written a tag that matches
one entry and competes with `Crypt` forever. It also rejects a repeated term.

**Adding a term is a deliberate act with a bar to clear.** Extend `ENVIRONMENT_RANKS` in
`generate-creatures.ts` only when the new term (a) names a place several creatures would
carry, and (b) is not a synonym of an existing one at the same rank. Otherwise use the
nearest published term — a graveyard is a `Necropolis`, a bone-vault is a `Crypt`, a
sinkhole is `Caves`. **A slightly loose fit that filters is worth more than an exact word
nobody can query.**

**Rank 1 works like a habitat tag, so list EVERY region the creature is found in.** This is
the rule most easily got wrong, because one region always feels like enough while writing
the entry. It is not: a GM filtering for "grassland, level 1" gets whatever the tags say and
nothing else, so a jackal tagged only `Desert` is missing from every grassland encounter it
belongs in. Two or three regions is normal, and the generator **requires at least one**.

Rank 2 and rank 3 are the opposite discipline: **specific, and only where they really live.**
`Necropolis` and `Tomb` on the beetles means "you meet these in tombs", and adding a site
they are merely plausible in dilutes every filter that mentions it. Ask of a rank-1 term
"could they be here?" and of a rank-2 or rank-3 term "is this where they are?"

> **Worked.** Jackal: `["Desert", "Grassland", "Road", "Necropolis"]` — two habitats they
> range across, then the two places a party actually meets them. Grave Husk:
> `["Desert", "Grassland", "Battlefield", "Necropolis", "Barrow"]` — they rise wherever
> rites were skipped, so the sites carry the meaning and the regions stay broad.

## Physiology

The body facts, rendered as a short section directly under Ecology. Three
measurements badge as tags, and reproduction is one line of prose.

```json
"physiology": {
  "size": "80 cm at the shoulder, 1.2 m long",
  "weight": "12 kg",
  "lifespan": "10 to 12 years",
  "reproduction": "One litter of four to six pups a year, born in a dug den and running with the pack by the end of a season."
}
```

| field | kind | what to write |
|---|---|---|
| `size` | measurement | **Height or length, whichever the anatomy makes meaningful.** Upright creatures give height, four-legged ones shoulder height and often length too, snakes and worms length, winged ones may add wingspan. Metric, and say which dimension it is: `1.4 m tall`, `2.6 m long`, `4 m wingspan`. |
| `weight` | measurement | Metric: `12 kg`, `1.8 t`. Give a range when the spread matters more than the average. |
| `lifespan` | measurement | `10 to 12 years`. For things that do not age, state what actually ends them: `Does not age, and 400 years is an ordinary age for one`. |
| `reproduction` | one line of prose | How they breed, and how long it takes. One or two sentences, never a paragraph. **Omit for anything that does not breed** — see rule 4. |
| `note` | one line of prose | **Folk-flexible humanoids only** — a pointer sentence, in place of every other field, see rule 8. |

Rules:

1. **Every measured field states a figure with its unit.** The generator rejects
   `size: "large"` — a tag reading "large" tells the reader nothing the size chip on the
   card did not already say. If a figure is genuinely unknowable, **omit the key**.
2. **Metric only, one system throughout the bestiary.** Ranges use "to", never a dash.
   **Distances use the published vocabulary and nothing else**
   (`docs/05-combat/03-distances-movement.md`): the range bands (melee, close, short, medium,
   long, very long, extreme), metres, or areas — one area being **6 by 6 m**. Never invent a
   unit. `3 paces of floor` was rejected for exactly this: `a thousand paces` is a published
   *narrative* distance meaning **1.5 km**, so paces already mean something, and a reader who
   knows the rules reads three of them as an eighth of a mile.
3. **A swarm's measurements are one animal's, and the headcount goes in `reproduction`.** The
   tags say how big a single beetle is, because that is the fact nothing else on the card
   carries. **The space a swarm occupies is already on the stat block** — a `Medium` swarm
   fills a Medium creature's space, roughly 2 to 3 m across — so repeating it in physiology
   states it twice and invites the two to disagree. Close the reproduction line with the rough
   count instead: *"A swarm is two to three thousand of them."* Same for any creature whose
   entry is a mass rather than a body.
4. **Anything that does not breed omits `reproduction` entirely.** Undead, constructs,
   elementals and summoned things: leave the key out. Do not write "they make no more of
   themselves", and **do not repurpose the field** for what raises or builds them — that is
   origin, it belongs in `ecology` or `narrative`, and a physiology block is the wrong place to
   explain a rite. The Grave Husk carries size, weight and lifespan, and nothing else.
5. **A humanoid's whole physiology block points to `01-folk.md`, not just `reproduction`**
   (owner ruling, 2026-08-12). Size, weight, lifespan and breeding are already published there
   per folk (§ Physical Traits by Folk, § Age Groups by Folk), and a bestiary entry restating
   them earns its place on the card less than the same lines spent on `ecology` or `tactics`.
   `reproduction` is dropped outright. See rule 8, below, for `size`/`weight`/`lifespan`, and for
   the `note` field that replaces all four.
6. **This is a short section, not a second ecology.** Three tags and one sentence. Behaviour,
   diet and range belong in `ecology`, above it. Anything the party can exploit belongs in
   `tactics`.
7. **Keep the figures consistent with the creature's size category and their tier.** A
   Medium creature that weighs 900 kg is a data entry error the generator cannot catch.
8. **A generic-role humanoid is folk-flexible unless its name specifies a folk** (owner ruling,
   2026-08-12; see also identity.md principle 47). *Veteran*, *Spearman*, *Cult Priest*,
   *Captain*: nothing in the name ties the role to one folk, so the GM may embody it as any of
   the twelve, and the card must not silently assume otherwise. *Orc Raider*, *Orc Band-Leader*:
   the name is the folk, and the card is written for that folk alone.

   **For a flexible entry, `size`, `weight` and `lifespan` are omitted, not defaulted.** A made-up
   "default folk" (human, by habit) is exactly the invented figure rule 1 already forbids — it
   just moves the invention from one field to three. `01-folk.md` § Physical Traits by Folk / Age
   Groups by Folk already holds the real number for whichever folk the GM assigns the role to, so
   the card states none of them. `narrative`, `ecology` and `tactics` are written so nothing in
   them contradicts any folk playing the role.

   **The block is not silently absent, though — it carries a pointer** (owner ruling,
   2026-08-12, revised same day). Omitting `physiology` outright reads as an oversight to a GM
   scanning the card, not a decision, so a flexible entry instead sets exactly one field:

   ```json
   "physiology": {
     "note": "Depends on the folk of this creature. See \"Physical Traits by Folk\" in the Folk section for more details."
   }
   ```

   `note` is the whole block on a flexible entry — never alongside `size`, `weight`,
   `lifespan` or `reproduction` on the same record (the generator rejects the combination). It
   renders exactly where `reproduction`'s prose line would, with no measurement tags ahead of
   it, so the section still appears on the card instead of vanishing.

Every field is optional and the whole block is optional, but a creature with a
`physiology` block carrying no fields fails the build.

**A figure describes a creature or an object. It never dates history** (D-085). The two are easy to
confuse because both are numbers in lore, and only one of them is a problem:

| | |
|---|---|
| ✅ **Fine** — how old a thing gets | "a husk still walking a road may be 200 years dead", "colonies 300 years under the same necropolis are known", "figures 400 years in the ground stand up when the chamber is opened", "four centuries old and it still burns" |
| ❌ **Out** — when a historical event happened | "the potters are four centuries gone", any date on when a craft was lost, a dynasty fell, or an art was last practised |

A creature's endurance is a property of the creature, and a GM can use it: 200 years dead tells them
what era the corpse came out of without fixing anything else. **Dating the fallen age is different**,
because that is the setting's chronology, and a number there is a timeline a GM can contradict and a
mythic loss reduced to a fact to look up (principle 34). Write "long gone", "in an age that knew how".

`lifespan` still requires a figure, so a creature that genuinely has none omits the key rather than
hedging in it.

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
    { "kind": "Weapon", "item": "Ceremonial khopesh", "value": "150 coins",
      "description": "Scimitar, Quality 2. Gold inlay, soundly forged, no penalty." },
    { "kind": "Magic", "item": "Amulet of Willpower", "value": "1,050 coins",
      "description": "Wearable (neck), Quality 4. While worn, you gain +1 Resist (max. 10)." }
  ]
}
```

| field | required | content |
|---|---|---|
| `kind` | yes | **Weapon, Armor, Magic, Trophy, Tool, Material, Valuables, Supplies, Relic** — closed, so a generator can filter and a GM can find the weapon without reading six rows. Trophy, Tool and Material are the published harvesting categories, used here with the same meaning. |
| `item` | yes | The **name only**, under 40 characters, and shorter than that in practice: `Jackal pelt`, `Jackal meat`, `Sinew`. The generator rejects prose here. |
| `description` | usually | One line: what it IS in core-rules terms and what it is FOR. `Scimitar, Quality 2. Gold inlay, no penalty.` |
| `value` | usually | A **flat coin figure**: `150 coins`. **Omit the field entirely** when the thing cannot be sold, so no badge renders. **Never dice**, and never a dash. Never contradict the Quality named in the description. |

**Four rules for the two text fields**, all of them corrections of the first draft:

1. **The name is what a player says out loud.** `Jackal pelt`, not `Jackal pelt, mange-thin`.
   Condition, quality and detail go in the description.
2. **Name the thing that is actually there.** You cut `Sinew` off a jackal, not `Dried sinew`
   — the drying is work somebody does afterwards. Write the raw part, and let the quality say
   how good it is.
3. **The description must earn its line, and it closes on the last useful word.** It says what the
   item IS in core-rules terms and what it is FOR. Then it stops. **Treasure rows carry no
   quips** — the closing joke that reads well in a paragraph of lore is dead weight in a table a GM
   scans mid-session, and six of them in one table is a voice rather than a reference.

   Cut in the tier-0 pass, all of them final sentences: *"A trophy is still a trophy."* · *"or a
   necklace nobody will admire"* · *"Small, sharp, and easy to carry."* · *"There is not much of
   it."* · *"and never missed"* · *"Somebody is still annoyed about losing it."* · *"Edible if you
   are not fussy."* · *"It says what it says."* · *"The rest are somewhere downrange."* · *"Worth
   nothing, and worth a great deal."*

   **The test is whether the sentence changes what the GM hands over or what the party can do with
   it.** Provenance passes when it is a lead ("painted with the band's mark, which every village on
   the river knows"), and fails when it is only colour ("dropped in a market, and never missed").
   Personality belongs in `narrative` and `ecology`, which are built for it.
4. **Every published value is a flat number of coins, never a die.** A table mixing `1d6 coins`
   with `15 coins` asks the GM to roll twice for one row, and the d6 that picked the row was
   the roll. Dice stay a **design tool**: where the rules give a value as dice (harvesting
   trophies), roll them or read them as a range and place the item inside it deliberately, then
   write the number you landed on. A mange-thin pelt sits at the bottom of its range, an
   unbroken skin near the top. Ranges and middles per tier are in
   [treasure-design.md](treasure-design.md) §1.
5. **One number per row, and no economics in the description.** `value` is what the thing is
   worth. Never write a sale price ("sells for 7"), never explain the halving rule, never
   label an item a **trade good**, and never give a second, conditional value ("a cut skin is
   worth 2", "a clean job is worth up to 12"). All of that is either the published rules
   applied for the reader, or a fork the GM has to adjudicate before handing over one item.
   **If a condition changes the price, pick the condition and price it** — the row describes
   one specific object, not a range of possible ones.

   The trade-good clause is the subtle one. Whether an item sells at full or half value is a
   **property of its category**, published once and applied by the GM to everything. Restating
   it per row implies this particular clutch of eggs is special, and it quietly files them
   beside gemstones. Say what the thing is. The rules price it.

> `stats` and `note` were separate fields until the tier-0 review. They produced rows that said
> the same thing twice and notes spent on "sells for 7". One `description` replaces both, and the
> generator rejects the old keys by name.

`scale` is one of **None, Incidental, Standard, Rich, Hoard** — how much, relative to what
is normal for their tier. A `table` of **exactly six rows** is required unless the scale is
`None`.

> **Treasure scale is new vocabulary.** Nexus has no published treasure-by-tier system,
> so these five words were introduced with the bestiary's lore layer and describe relative
> quantity only. If a real treasure system lands later, this is the vocabulary to
> reconcile with.

## Organization

**This is the D&D 3.5 Organization line, split into rows.** That line reads *"Solitary, pair,
or pack (3-6)"*, and it is a **list of the group sizes this creature is naturally encountered
in** — the GM's first answer to "how many do I put in this room?" Each row is one of those
options: a **group term** plus how many it contains.

So the name is a **standard group term**, not a description of the scene:

| use | for |
|---|---|
| `Solitary` | one, met alone. **Almost every creature gets this row, and it goes first.** |
| `Pair` | two, usually mated or paired by role |
| `Pack`, `Flock`, `Herd`, `Swarm`, `Colony`, `Nest`, `Roost` | the natural grouping of an animal |
| `Gang`, `Band`, `Mob`, `Troop`, `Warband`, `Patrol`, `Company` | organised or massed groups |

Themed variants are welcome where they carry real information, exactly as 3.5 used "slaver
band" or "hunting party": `Burial-road pack`, `Raiding file`, `Harvest raid`. Keep the group
term recognisable inside them.

What it is **not** is a description of where or when you meet them. These all failed review:
`Underfoot` (an adverb), `Under a landing stage` and `Roost above a fish quay` (the place),
`A bad stretch of channel` and `The one on the road` (prose with an article), `Alone, come to
talk` (a sentence). Each became a group term: `Solitary`, `Colony`, `Roost`, `Nest`, `Mob`.
The generator rejects a leading article, a comma, and anything over 28 characters.

Rows come in two shapes. Either N of this creature:

```json
{ "name": "Pack", "count": "3-6" }
```

or a mixed band naming other creatures, which is how 3.5 wrote "band (6-11 plus 1 leader)":

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

**Mixed bands are the point of the field, not an edge case.** Any creature that fights
alongside others owes at least one `composition` row: a leader with their followers, a
handler with their beasts, a caster with their bodyguard. A Zakhar Band-Leader that lists only
solitary rows is a stat block a GM has to build an encounter around from scratch, when the
whole reason the creature exists is the band behind them.

**The counts form one ladder: no gaps, no overlaps, and they agree with the rest of the
entry.** `Pack (3-6)` under `Burial-road pack (6-9)` makes six mean two different things, and
`Gang (2-3)` above `Mob (5-8)` leaves four unanswered. Read the row set as a single sequence
from one upward. Then check it against what the entry already claims: an ecology saying
"family groups of four to nine" and a reproduction line saying "six to ten eggs" are
**numbers the organization rows have to match**, since the two sit inches apart on the card.

**Never annotate a row as a troop.** `02-creature-rules.md` already says three or more basic
creatures with the same statistics are typically grouped into a troop, so "(as a troop)" on a
`Pack (3-6)` row restates a published default and implies the rows without it are exempt.
Give the count and stop. The same test applies to every other rule a row might be tempted to
repeat: if the core rules decide it from the number, the row does not say it.

**Write the band on BOTH cards.** The same `Harvest raid` row belongs on the Band-Leader and
on the Raider, so a GM who opened either one sees the same menu. The rows are identical in
content, and the links resolve in both directions.

## Reference implementation

The roster was emptied for the bestiary rebuild, so there is no lore block in
`creatures.json` to copy yet. **The eight worked examples in
`.drafts/bestiary/creatures/tier-0-1-lore.md` are the reference** — read them before writing
your first lore block. They cover every awkward case the schema has: a swarm, an undead with
no reproduction line at all, and two humanoids whose figures come from `01-folk.md` rather than from
invention.
