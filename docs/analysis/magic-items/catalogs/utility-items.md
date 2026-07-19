# Utility Items — Design Catalog (Containers, Everyday Objects, Instruments)

> **Status:** Design proposals pending owner approval. Nothing here is published. These are slotless named items for the random treasure system — curated effects, not enchantment-formula items.

## Category Identity

Utility items are the "wondrous item" space: magical objects that are not equipment in a combat slot. Effects are too diverse for the enchantment framework, so each entry is a curated named item.

**Pricing model** (derived from the published cost tables, verified 2026-07-19):

- **Permanent items** price like wearables (no magic item base cost): base item + wearable-tier enchantment cost. Q4 ≈ 1,100 / Q5 ≈ 3,100 / Q6 ≈ 10,100 / Q7 ≈ 30,100 coins. Q8 utility items are artifacts (principle 21) — built via the [Q8 artifact framework](q8-artifacts.md), with valuations rather than prices.
- **Single-use consumables** use the ammo/consumable columns: Q4 ≈ 350 / Q5 ≈ 1,050 / Q6 ≈ 3,050 coins (see [consumables.md](consumables.md)).

**Design rules for this space:**

1. Anti-trivialization above all — these items brush against Supply Checks, Fatigue, navigation, and locks. Assist the roll or shave the worst case; never delete the subsystem (principle 11).
2. Information effects carry bounded GM parameters with a safety valve (principle 4).
3. Any target-facing effect is rolled by the *user* against the target's Resist — never a target save against a static TN (principles 9 and 15).
4. Bronze Age register: inscribed tablets, ritual vessels, carved bone, bronze discs. No compasses, clocks, lenses, or gears (principle 18).
5. Permanent utility items are **repeatable access** under the two-track ruling (main analysis §3.7): effect power stays at quality ≈ spell rank. Only their single-use cousins in [consumables.md](consumables.md) may use the +1 rank scarce ceiling.

### Audit Findings (2026-07-19 re-evaluation)

1. **All five instrument save effects used static TNs (8/10/12)** — a direct principle 9 violation once PCs or high-level enemies face them. Every one is redesigned to "roll [skill] vs. each target's Resist", making instruments actual skill items.
2. **Messenger Bottle moved Q4 → Q5.** The original analysis flagged cheap magical communication as worldbuilding-shaping, then priced it at Q4 anyway. Q5 aligns it with the same reasoning that pushed the old Marker ammo to Q5+ (principle 19).
3. **Hearthstone of Return moved Q5 → Q6.** Quality ≈ spell rank: daily self-teleportation to a bonded site is rank 3–4 spell territory (*Pilgrim's Gate* is R4), far above Q5 ≈ R2. Q6 with same-region limit is the honest tier.
4. **Figurine of Summoning rewritten in creature levels** — the game has creature levels, not tiers. Bounded to a specific stat block chosen at creation.
5. **Supply wording aligned** — "produces 1 unit of supply" replaced with actual Supply system language (uses, Supply Checks, rations).
6. **Chest of Safekeeping divination shield given GM parameters** (what it blocks, what it leaks).

## Containers (d100, 10 entries)

| d100 | Name | Quality | Cost | Effect |
|------|------|---------|------|--------|
| 01–10 | Bag of Holding | Q4 | 1,100 | The interior is far larger than the exterior. It holds up to 10 load but always counts as 1 load carried. Sharp objects must be wrapped or they pierce the weave (GM may rule the bag damaged). |
| 11–20 | Preserving Vessel | Q4 | 1,100 | Contents do not rot or spoil. Raw food stored inside keeps until removed, and removed food spoils at its normal pace. Stored supply items never lose uses to spoilage effects. |
| 21–30 | Quenching Flask | Q4/Q5 | 1,100 / 3,100 | Once per day, the flask fills with clean water. One filling covers the daily water needs of 2/4 people (counts toward the "food and water" camp condition, but not food). |
| 31–40 | Messenger Bottle | Q5 | 3,100 | Once per day, seal a written message inside and speak the name of a person you have met. The bottle vanishes and reappears within reach of them by the next dawn, then returns empty within a day. If the named person is dead, warded, or on another plane, the bottle returns unopened. |
| 41–50 | Censer of Warding | Q5 | 3,100 | Burn incense (1 use of supplies) as an Action. All allies in close range gain +1 Resist (enhancement bonus) for a short duration. |
| 51–60 | Bottomless Quiver | Q5 | 3,100 | When you roll a Supply Check for non-enchanted ammo, roll twice and take the better result. Does not apply to enchanted ammo pieces. |
| 61–70 | Chest of Safekeeping | Q5 | 3,100 | Locks and unlocks only by its command word. It resists all non-magical opening attempts, and magical attempts must beat a hard (10) Difficulty. Divination magic cannot reveal the contents; it can still reveal the chest's location and that it is warded. |
| 71–80 | Brazier of Warmth | Q4 | 1,100 | While lit, all creatures in close range are comfortable regardless of natural cold or heat. Counts as shelter for the "make camp" step in cold environments. Does not protect against Extreme Climate checkpoint rolls. |
| 81–90 | Decanting Vessel | Q5/Q6 | 3,100 / 10,100 | Once per day, produce one dose of a basic alchemical substance chosen at creation: herbal antidote, herbal remedy (weak), or lamp oil. At Q6, choose the substance each day. The dose loses potency at the next dawn. |
| 91–100 | Amphora of Plenty | Q6 | 10,100 | Once per day, produce plain food enough for 4 people for one day (counts toward the "food and water" camp condition, but not water). |
| — | Ark of Provision | Q7 | 30,100 | Once per day, the ark fills: plain food and clean water enough for 8 people for one day (covers the "food and water" camp condition for them). Food not eaten by the next dawn turns to dust. |

> **d100 note:** Q7 entries carry no d100 range yet — final allocation at implementation; re-roll Q7 results for lower-quality treasure.

> **Design note:** Quenching Flask and Amphora of Plenty are deliberate complements (water/food) that each cover only half the camp requirement — supply management stays a live system unless the party invests in both at real cost. Decanting Vessel's products match the published Field Alchemy catalog items by name, and its doses expire like field-alchemy products do.

## Everyday Objects (d100, 10 entries)

| d100 | Name | Quality | Cost | Effect |
|------|------|---------|------|--------|
| 01–10 | Immovable Rod | Q5 | 3,100 | Speak the command word: the rod fixes itself in place, bearing up to 10 load of force. A creature can wrench it loose with a very hard (12) Strength + Athletics roll. Speaking the word again releases it. |
| 11–20 | Lantern of Revealing | Q4/Q5 | 1,100 / 3,100 | Emits bright light in close range (Q5: short range). Invisible creatures and objects in the light are visible as shimmering outlines. |
| 21–30 | Astral Disc | Q4 | 1,100 | A bronze disc etched with constellations. Held level, it truthfully shows the cardinal directions and the time of day. While serving as Navigator and consulting it, gain +1 boon on your Navigation rolls. |
| 31–40 | Rope of Climbing | Q4 | 1,100 | On command, this rope (short range length) snakes upward, ties, unties, or knots itself. It can anchor to a surface within its length. Climbing with it grants +1 boon on Athletics rolls to climb. |
| 41–50 | Seer's Mirror | Q5 | 3,100 | Once per day, gaze into the mirror and name a person you have met. You glimpse a silent image of them and their immediate surroundings for a moment. The GM shows one of: where they roughly are, what they are doing, or who they are with. If the person is dead, warded, or on another plane, the mirror shows only fog. |
| 51–60 | Carpet of Flight | Q6 | 10,100 | Carries up to 2 Medium creatures, flying with normal Movement. The rider guiding it must concentrate as if on a spell and can take no Actions while steering. If concentration breaks, the carpet sinks gently to the ground. |
| 61–70 | Arcane Key | Q4/Q5 | 1,100 / 3,100 | Once per day, open one non-magical lock without a roll. At Q5, it also works on magical locks: roll Mind + Arcana vs. the lock's Difficulty. |
| 71–80 | Figurine of Summoning | Q5/Q6 | 3,100 / 10,100 | Once per day, speak the command word: the figurine becomes a living beast (a specific stat block of level 2 or lower at Q5, level 4 or lower at Q6, chosen at creation) for a short duration. It obeys simple commands and reverts if slain. |
| 81–90 | Rod of Mending | Q4 | 1,100 | Once per day, touch one damaged non-magical item: it becomes functional again (a broken tool works, torn rope rejoins). It cannot restore lost uses, Durability steps of magic items, or consumed supplies. |
| 91–100 | Hearthstone of Return | Q6 | 10,100 | Attune the stone to a location by resting there for a night and completing a short rite. Once per day, as an Action, you teleport to the attuned location. The stone only reaches a location in the same region, and everything you carry travels with you (no other creatures). |
| — | Chariot of the Winds | Q7 | 30,100 | This bronze chariot needs no beast: it flies at normal Movement carrying up to 4 Medium creatures. The driver steers with simple commands and can act freely (no concentration), but the chariot lands at the end of any scene in which it takes damage, descending gently. |

> **d100 note:** Q7 entries carry no d100 range yet — final allocation at implementation; re-roll Q7 results for lower-quality treasure.

> **Design note:** Immovable Rod and Bag of Holding load values use the game's load scale in single digits — the old "500 load" figure assumed a different scale and would out-carry a mule train. Owner should sanity-check both numbers against the equipment load table before implementation.

## Instruments (d100, 10 entries)

All target-facing instruments now use the user's roll against the targets' Resist. Playing an instrument for its magic is an Action unless stated otherwise.

| d100 | Name | Quality | Cost | Effect |
|------|------|---------|------|--------|
| 01–10 | Horn of Warning | Q4 | 1,100 | Blow the horn: all allies within long range cannot be surprised for a short duration, and sleeping allies in that range wake. The call carries to very long range. Once per day. |
| 11–20 | Horn of Blasting | Q5 | 3,100 | Blow the horn: roll Strength + Fortitude vs. the Resist of each creature in a close-range cone. On a success against a target, they take 6 blast damage (ignore 1/2 AV) and are briefly deafened. Unattended brittle objects in the cone crack. Once per day. |
| 21–30 | Drums of Marching | Q4 | 1,100 | Play while the group breaks camp: today, the first party member who would suffer Fatigue from Forced March ignores it. Once per travel day. |
| 31–40 | War Drum of Fury | Q5 | 3,100 | Beat the drum as an Action: each ally in close range gains +1 boon on their next attack roll this scene. Once per scene. |
| 41–50 | Chime of Opening | Q5 | 3,100 | Strike the chime: one non-magical lock, latch, or bar within close range springs open. Once per day. |
| 51–60 | Sistrum of Warding | Q4 | 1,100 | Shake as a Quick Action: roll Spirit + Mysticism (or Spirit + Lore) vs. the Resist of each undead and spirit in close range. On a success against a target, they are briefly frightened of you. Once per scene. |
| 61–70 | Flute of Calming | Q5 | 3,100 | Play for a full minute: roll Spirit + Influence vs. the Resist of each hostile creature in close range that can hear you. On a success against a target, they become non-aggressive for a short duration. The effect on a target ends early if they or their allies take damage. Once per day. |
| 71–80 | Lyre of the Silver Tongue | Q4 | 1,100 | Play during a Social Intrigue exchange: once per intrigue, after an ally's failed Influence roll, that roll counts as having advanced the Patience die but inflicts no Pitfall or Interest loss (the music smooths over the misstep). |
| 81–90 | Pipes of Haunting | Q5/Q6 | 3,100 / 10,100 | Play in darkness or dim light: roll Spirit + Influence (or Spirit + Mysticism) vs. the Resist of each creature of your choice in close (Q6: short) range that can hear you. On a success against a target, they are frightened of you for a short duration. Once per scene. |
| 91–100 | Bell of Communion | Q6 | 10,100 | Once per day, ring the bell during a short rite naming one dead person or spirit you know by name. The GM answers one yes/no question truthfully as that spirit would know it, or states that the spirit does not know, refuses, or is beyond reach. |
| — | Warhorn of the Host | Q7 | 30,100 | Once per day, blow the horn as an Action: each ally in short range gains +1 boon on attack rolls for a short duration and 5 temporary HP. The temporary HP does not stack with any other source. |

> **d100 note:** Q7 entries carry no d100 range yet — final allocation at implementation; re-roll Q7 results for lower-quality treasure.

> **Design note:** Lyre of the Silver Tongue replaces the old "Lyre of Distraction" (which drained NPC Patience — under the published Patience system the die advancing on every roll already IS the pressure; draining Patience *hurts* the party, so the old design was mechanically backwards). The new effect spends the item's magic to absorb a failure, which is the actually useful intervention in the published system.

### Q7 Entry Notes

- **Ark of Provision** deliberately covers food *and* water where the Q4–Q6 pair (Quenching Flask, Amphora of Plenty) each cover half — full camp logistics is the Q7 privilege.
- **Chariot of the Winds** is the promised Carpet of Flight upgrade (more riders, no concentration) with a damage-forced landing as its combat limiter.
- **Warhorn of the Host** is a rank-4-grade mass buff; the temporary HP carries the no-stacking rule explicitly.
- **Q8**: no Q8 rows in these tables. Legendary utility objects (the Hidden Court, Twin Gates, and Death-Knell capstones) are artifacts — built via the [Q8 artifact framework](q8-artifacts.md).

## Worldbuilding Implications by Quality Tier

| Quality | World Implication |
|---------|------------------|
| **Q3 (Masterwork)** | Skilled artisans in any major settlement. Exceptional craft, no magic. |
| **Q4 (Lesser Magic)** | City-states and trade hubs. A few dozen capable enchanters per kingdom. Wealthy merchants and veteran soldiers own a piece or two. |
| **Q5 (Potent Magic)** | Major cities, prestigious temples, arcane academies. Enchanters of this rank are known by name. Items are status markers. Communication magic starts here — magical post is the privilege of rulers and trade princes, not a public service. |
| **Q6 (Greater Magic)** | Legendary crafters, two or three per empire. Heirlooms, prizes, plot hooks. Teleportation, flight, and speaking with the dead live here — each Q6 item in circulation is a fact of regional politics. |
| **Q7 (Superior Magic)** | The mortal crafting ceiling. Once-in-a-generation work of a living master — commissioning one is a campaign event, not a purchase. Effectively unique in any one kingdom. |
| **Q8 (Supreme Magic)** | Never crafted by mortals (principle 21). Legendary and divine artifacts — found, inherited, or bestowed, each with a name and a history. Listed values are treasure valuations, not prices. See [q8-artifacts.md](q8-artifacts.md). |

## Open Questions for Owner

1. Load numbers (Bag of Holding 10, Immovable Rod 10) need a check against the equipment load scale — what does a mule or a full pack actually weigh in load?
2. Instruments keying off Spirit + Influence/Mysticism/Lore: comfortable with alternative-skill options per item, or standardize one skill per instrument?
3. Decanting Vessel producing field-alchemy items: should its output instead consume the alchemy analysis's essence economy once that system lands?
