# Wearables — Enchantment Design Catalog

> **Status:** Design proposals pending owner approval. Nothing here is published. Current-state table verified against `docs/04-equipment/07-magic-items/enchantments.md` on 2026-07-19.

## Category Identity

Wearables are the game's generic enchantment surface: 8 equipment slots, suffix enchantments, no magic item base cost. **All item types may roll on this table instead of their own**, which makes it the designated home for every non-combat, passive, and cross-mode effect. Weapon/armor/shield tables stay in their combat lanes because this table absorbs everything else.

- **Role focus:** everything, and the only table covering Travel, Exploration, and Social Intrigue.
- **Power yardstick:** quality ≈ spell rank. A Q4 wearable active ≈ rank 1 spell, used 1/day.
- **Resource models:** passives moderate and always-on; travel effects 1/day or 1/journey; social effects 1/intrigue; healing 1/day.

## Current Inventory (20 entries, d20)

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | of Protection | Q4/Q5/Q6 | +1/+2/+3 AV (unarmored) | Defense |
| 2 | of Willpower | Q4/Q5/Q6 | +1/+2/+3 Resist (max 10/12/14) | Defense |
| 3 | of Guarding | Q4/Q5/Q6 | +1/+2/+3 Parry (max 10/12/14) | Defense |
| 4 | of Reflexes | Q4/Q5/Q6 | +1/+2/+3 Dodge (max 10/12/14) | Defense |
| 5 | of Shielding | Q4/Q5/Q6 | Absorb 10/15/20 non-physical damage per night's rest | Defense |
| 6 | of Might | Q4/Q6 | +1/+2 Strength steps (up to d8/d10) | Support |
| 7 | of Swiftness | Q4/Q6 | +1/+2 Agility steps (up to d8/d10) | Support |
| 8 | of Wisdom | Q4/Q6 | +1/+2 Spirit steps (up to d8/d10) | Support |
| 9 | of Intellect | Q4/Q6 | +1/+2 Mind steps (up to d8/d10) | Support |
| 10 | of Ogre Strength | Q4/Q5/Q6 | +1/+2/+3 unarmed weapon damage | Offense |
| 11 | of Fast Stride | Q4/Q6 | +1/+2 Movement per turn | Utility |
| 12 | of Pure Thought | Q4 only | Immune to thought-reading, charm, magical sleep; psychic resistance | Defense |
| 13 | of Fortitude | Q4/Q5/Q6 | +2/+4/+6 HP | Defense |
| 14 | of the Guardian | Q4/Q6 | +1/+2 boon on Initiative | Support |
| 15 | of Attunement | Q4/Q5/Q6 | +2/+4/+6 max Focus | Support |
| 16 | of Comprehension | Q4 only | Understand and speak one language | Utility |
| 17 | of Arcane Knowledge | Q4/Q5/Q6 | Store arcane spell rank 1/2/3, cast 1×/day (→ rank 2/3/4, see audit finding 6) | Support |
| 18 | of Divine Guidance | Q4/Q5/Q6 | Store mystic spell rank 1/2/3, cast 1×/day (→ rank 2/3/4, see audit finding 6) | Support |
| 19 | of Immunity | Q4 only | Immune to one condition, passive | Defense |
| 20 | of Resistance | Q4 only | Resist one damage type, passive | Defense |

### Audit Findings (2026-07-19 re-evaluation)

1. **of Immunity must move to Q6, triggered.** Q4 passive condition immunity undercuts Body of Bronze R2 (immune dazed/stunned while unarmored), Strong Mind R2, Tough Stomach R2, and Divine Sense R2 (immune charmed/frightened/poisoned) — talent ranks players pay for. Confirmed against current talent text 2026-07-19; the original finding stands. Redesign: **Q6 only — once per day, when you would suffer the chosen condition, you ignore it.** Triggered and limited satisfies principles 3, 13, and 20.
2. **of Pure Thought must move to Q5 with limited uses.** Same conflict class (Divine Sense R2, Strong Mind R2). Redesign: **Q5/Q6 — passive: attempts to read your thoughts require the reader's roll to beat your Resist +2. Active: once per day (twice at Q6), when you would be charmed or magically put to sleep, ignore that effect.** Psychic resistance rider stays Q6 only (parity with Strong Mind R3).
3. **NEW finding — of Resistance has the same disease.** Q4 passive damage-type resistance undercuts Body of Bronze R3 (physical resistance) and Strong Mind R3 (psychic resistance) and outclasses the armor "Tough" enchantment (X/day) with an always-on version at the same tier. Recommendation: **restrict to Q5, non-physical damage types only** (acid, blast, fire, frost, lightning, necrotic, poison, psychic, radiant already exclude physical — but the tier moves to Q5 so a permanent resistance costs Potent-tier money and never beats Tough at its own tier by being both cheaper and unlimited).
4. **Attribute items (of Might etc.) respect the cap rules** — the "(up to d8/d10)" ceilings are caps, not scalers; no change (principle 12 satisfied).
5. **Old §5.8 expansion list pruned**: "of Warding" dropped (redundant with of Willpower plus the new shield Warding), "of Endurance" merged into armor Enduring, "of Vigilance" renamed (collision with armor Vigilant), "of Anchoring" renamed (collision with shield Anchoring).
6. **of Arcane Knowledge / of Divine Guidance store rank 2/3/4 at Q4/Q5/Q6** (was 1/2/3) — owner-approved two-track spell-access ruling (main analysis §3.7): a 1/day stored cast is scarce access and sits one rank above the quality equivalent. The stored spell must still be one the creator knows; invoking uses the spell scroll rules unchanged.

## Proposed Catalog (25 entries, d100)

Entries 01–80: the current 20 (4% each) with the four redesigns above (of Immunity, of Pure Thought, of Resistance, and the storing rank bump). New entries:

| d100 | Name | Quality | Effect | Role | Mode |
|------|------|---------|--------|------|------|
| 81–84 | of Pathfinding | Q4/Q6 | While serving as Navigator during travel, gain +1/+2 boon on your Navigation rolls. | Utility | Travel |
| 85–88 | of Trapfinding | Q4/Q6 | Gain +1/+2 boon on Perception rolls to detect traps and hidden mechanisms. | Utility | Exploration |
| 89–92 | of Discernment | Q4/Q6 | Gain +1/+2 boon on Insight rolls to discover an NPC's Motivations or notice a Pitfall during Social Intrigue. | Support | Social |
| 93–96 | of the Healer | Q4/Q5/Q6 | When you restore HP to another creature with a spell, ability, or supply item, they regain +2/+4/+6 additional HP. Once per turn. | Healing | Combat |
| 97–100 | of Darkvision | Q4/Q6 | You treat darkness as dim light within medium/long range. | Utility |
| — | Phase | Q7 only | Once per day, Quick Action — become incorporeal until the start of your next turn: you can move through creatures and solid barriers up to a close distance thick, and attacks against you suffer +1 bane. While incorporeal you cannot attack, cast spells, or pick up objects. If you end the effect inside a solid object, you are shunted to the nearest open space and take 8 damage (ignore AV). | Defense / Utility |
| — | of the Pilgrim | Q7 only | Once per day, Action — you and up to three allies in close range vanish in a swirl of dust and reappear at a spot you can see within long range. Each traveler arrives briefly dazed except you. | Utility / Support |

> **d100 note:** Q7-only entries carry no d100 range yet — final allocation happens at implementation. A Q7 entry rolled for lower-quality treasure is re-rolled.

### Q7 Scaling of Existing Entries

| Enchantment | Q6 | Q7 (proposed) |
|-------------|-----|----------------|
| of Attunement | +6 max Focus | +8 max Focus. Also: once per day, Quick Action — regain 6 Focus | Exploration |

### Expansion Candidates (future growth beyond 25)

Updated against the published Travel and Social Intrigue systems; all effects hook real procedures.

| Name | Quality | Effect | Role | Mode |
|------|---------|--------|------|------|
| of the Far-Seeing Eye | Q4/Q6 | While serving as Scout during travel, gain +1/+2 boon on your Scouting rolls. | Utility | Travel |
| of Provisioning `[minor]` | Q4 only | When you roll a Supply Check for rations during travel, roll twice and take the better result. | Utility | Travel |
| of Waterbreathing `[minor]` | Q4 only | You can breathe underwater. Gain +1 boon on Athletics rolls to swim. | Utility | Exploration |
| of Featherfall `[minor]` | Q4 only | Treat any fall as one range category shorter. You take no damage from falls of close distance or less. | Defense | Exploration |
| of the Chameleon | Q4/Q6 | Once per day, change your appearance (clothing, features, apparent folk) for a medium duration. At Q6, you can also mimic a specific person's face and voice for a long duration. The disguise does not hold up to touch. | Utility | Social |
| of Eloquence | Q5/Q6 | Once per intrigue, after failing an Influence roll during Social Intrigue, re-roll it (Q6: you may do this twice per intrigue). | Support | Social |
| of Authority | Q5/Q6 | Once per intrigue, when a Social Intrigue begins against an NPC whose disposition is Indifferent or better, increase the starting Interest by +1 (+2 at Q6, max. +3). | Support | Social |
| of Mending | Q4/Q5/Q6 | Once per day, touch a creature to end one condition on them. Q4 list: bleeding (X), burning (X), poisoned. Q5 adds: dazed, frightened. Q6 adds: paralyzed, stunned. | Healing | Combat |
| of Vitality | Q5/Q6 | During each short break, you regain 2/4 additional HP. | Healing | Combat |
| of Calming | Q5/Q6 | Once per day (twice at Q6), use an Action to end the frightened or confused condition on one creature in close range. | Support | Combat |
| of Sure Footing | Q4/Q5/Q6 | Add +1/+2/+3 to your Resist against effects that would push you or knock you prone. | Defense | Combat |

### Entry Design Notes

- **of Pathfinding** stacks with Knowledgeable Wanderer R2 (+1 boon on navigation) — item and talent are both boon sources on the same roll, and the enchantment stacking rule only blocks *item* duplicates. Verified against current talent text.
- **of Trapfinding** feeds Dungeon Delver: the enchantment helps *detect* the mechanism, the talent's R1 analysis ability then takes over. Exploration crawl procedures remain unpublished (analysis stage only, `docs/analysis/exploration-crawl-system.md`), so the wording binds to plain Perception rolls, not crawl-specific steps.
- **of Discernment** grants boons on rolls the Social Intrigue system already calls for (Motivation discovery via Insight); it never auto-reveals — Interest/Patience economy stays intact.
- **of the Healer** — trigger tightened to "restore HP to another creature" so it cannot buff self-healing loops, and once per turn so multi-heal spells do not multiply it. Numbers follow the healing framework (§16: flat riders small, no wound healing).
- **of Authority** respects the Interest cap (+3) explicitly — it accelerates a good start, never breaks the ceiling (principle 12) — and stays Q5+ for worldbuilding reach (courts full of cheap Interest-buying trinkets would warp intrigue play, principle 19).
- **of Eloquence** re-rolls instead of granting flat boons so it cannot stack with talent boon sources into near-auto-success.
- **of Mending** mirrors redesigned Stalwart's scope-scaling (list grows with quality, frequency flat).
- **of Sure Footing** is the renamed "of Anchoring" — Resist-bonus shape keeps it distinct from the shield enchantment's ignore-effect.

### Q7 Entry Notes

- **Phase** — hard counterplay built in: no offense while phased, shunt damage on a bad exit (principle 13).
- **of the Pilgrim** — rank-4 group-teleport power (*Pilgrim's Gate* parity) with combat friction: allies arrive briefly dazed, so it is an escape and repositioning tool, not a free alpha-strike.
- **Q8**: no Q8 rows in this table. A legendary wearable (the Deathless Ward capstone) is built as an artifact via the [Q8 artifact framework](q8-artifacts.md).

## Open Questions for Owner

1. of Resistance: agree to Q5 non-physical only, or keep Q4 but convert to a triggered X/day model like armor Tough?
2. of Darkvision at Q4 medium range — strong for exploration-heavy campaigns; move the Q4 tier to close range?
3. of the Healer once per turn vs. once per day: current proposal is per-turn passive rider (moderate numbers). Confirm comfort with an always-on healing amplifier at Q4.
