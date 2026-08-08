# Talents — step 6, and the heart of the build

Source of truth: `src/utils/data/json/talents.json` (148 talents). Published per skill under
`docs/03-statistics/06-talents/`. **Always read the target skill's actual pool before
choosing** — the summaries here orient, they do not replace the text.

## The rule

**Every 2 XP in a skill grants 1 talent point for that skill.** A rank-1 skill has spent 2 XP,
so a starting character gets **exactly one rank-1 talent per rank-1 skill: three talents,
never four.**

Constraints at creation:

- A talent's `skill requirement` must be a skill the character has **at rank 1**. Rank 0 buys
  no talents.
- **Ranks are bought in order**, so at creation the character takes rank 1 of a talent. A
  talent with no rank 1 (a High-Level talent, R4–R5 only — `Master Artisan`, `Foresight`,
  `Supernatural Mobility`, `Presence of Conquest`) **cannot be taken by a starting character.**
- One talent per skill at creation — a second talent in the same skill costs another 2 XP.

## Why this step matters most

Attributes and equipment make a character better at things everyone can do. **A talent is the
only place where a rank-1 character gets a rule that is theirs.** Two builds with the same
skills and different talents are different characters; two builds with the same talents and
different gear are the same character in different clothes.

So the three talents must, between them:

1. **Deliver the fantasy's verb** — at least one talent a player will use to do the thing the
   one-sentence fantasy promises.
2. **Deliver the claimed role** — a Tank needs a talent that protects; a Support needs one that
   touches an ally; a Controller needs one that imposes or denies.
3. **Give the character something to do on a turn they have no good option** — a Quick Action,
   a re-roll, a reaction-shaped trigger.

## The selection rubric

Score each candidate against these, in this order:

| # | Test | Fails when |
|---|---|---|
| 1 | **Fantasy payload** — does using it feel like the sentence? | It is generically strong (`+2 HP`) with no identity |
| 2 | **Usable at rank 1, with THIS sheet** | It keys off a weapon, spell, armor or skill the build does not have |
| 3 | **Frequency** — will it come up most sessions? | Once-per-day, one environment, one enemy type, one downtime activity |
| 4 | **Turn economy fit** | It wants the Quick Action another chosen talent already wants |
| 5 | **Synergy** — does it make another pick better? | Three unconnected good picks (see the pairs below) |
| 6 | **Role payload** | Nothing in the three touches an ally / protects / controls, but the role claims it |

**Rule: at least one of the three talents must be legible in play as "the archetype's thing".**
If a reader cannot point at one line and say *that is what a Hoplite does*, the build has three
upgrades and no identity.

## Turn-economy conflicts — the most common build fault

Rank-1 talents cluster hard on the **Quick Action**. A build holding three of these is holding
one, twice wasted:

- Fighting: `Shield Mastery`, `Axe Mastery`, `Polearm Mastery`, `Riposte`
- Athletics: `Escape Artist`, `Fast Stride`, `Evasion`, `Stand your Ground`
- Influence: `Inspire Ally`, `Insult to Injury`, `Rallying Cry`
- Stealth: `Devious Tactics` · Perception: `Eagle Eye`, `Identify Weakness`, `Combat Instincts`
- Arcana: `Battle Mage`, `Spellblade`, `Spellbreaker` · Mysticism: `Mystic Champion`

Two Quick-Action talents is acceptable when they fire on **different triggers** (one on your
turn, one on an enemy's action). Two that both want your own turn's Quick Action is a conflict
— say so, and swap one for a passive or an Action-economy talent.

**Passives and always-on talents are the safe third pick**: `Pugilist`, `Body of Bronze`,
`Defensive Dueling`, `Bulky`, `Dual Wielder`, `Sharpshooter`, `Heavy Armor Mastery`.

## Synergy patterns that actually work

- **Make-then-exploit**: a talent that inflicts a condition or a bane plus one that punishes it
  — `Identify Weakness` into any damage art; `Insult to Injury` (Distract) into `Assassination`.
- **Enable-the-weapon**: `Pugilist` (unarmed counts as brawling weapons) turns every brawling
  combat art on — without it, an unarmed build cannot legally use one.
- **Survive-the-choice**: an aggressive stance plus a survivability talent — `Battle Rage` with
  `Hard to Kill` or `Body of Bronze`; `Rapid Shot` with `Reflexive Shooter`.
- **Cast-and-swing**: `Spellblade` / `Mystic Champion` (spell into a weapon attack) with a
  weapon skill at rank 0 and one combat art.
- **Reliability stack**: a re-roll plus a boon source, so the build's signature roll rarely
  whiffs — `Disciplined Fighter` / `Disciplined Archer` / `Master of Fundamentals` /
  `Master of Principles` are the four re-roll anchors, one per engine skill.
- **Talk-then-read**: `Read the Room` or `Take Their Measure` before `Fast Talking` or
  `Eloquent Talker`.

## What each skill's rank-1 pool is FOR

| Skill | The pool's job at rank 1 | Anchors |
|---|---|---|
| **Fighting** | Weapon-family identity and defensive tricks. The largest pool (14). | `Shield Mastery`, `Defensive Dueling`, `Riposte`, `Pugilist`, `Dual Wielder`, `Heavy Weapon Mastery`, per-weapon Masteries |
| **Archery** | Fixing the ranged weapon's weaknesses. | `Rapid Shot`, `Sharpshooter`, `Reflexive Shooter`, `Crossbow Mastery`, `Disciplined Archer` |
| **Athletics** | Movement, escape, and body control. | `Fast Stride`, `Escape Artist`, `Grappler`, `Stand your Ground`, `Bulky`, `Light Armor Mastery` |
| **Fortitude** | Staying up: HP, AV without armor, resisting. | `Second Wind`, `Body of Bronze`, `Hard to Kill`, `Battle Rage`, `Heavy Armor Mastery`, `Strong Mind` |
| **Influence** | Ally buffs and social pressure — the party-facing pool. | `Inspire Ally`, `Leading Presence`, `Rallying Cry`, `Fast Talking`, `Insult to Injury` |
| **Insight** | Reading people, and one protective pick. | `Piercing Look`, `Read the Room`, `Empath`, `Deflecting Presence` |
| **Perception** | Noticing, initiative, and target-marking. | `Danger Sense`, `Eagle Eye`, `Identify Weakness`, `Keen Observer`, `Combat Instincts` |
| **Stealth** | Opening from surprise, infiltration, deception. | `Assassination`, `Hidden Strike`, `Devious Tactics`, `Infiltrator`, `Leading the Way` |
| **Streetwise** | City play, contacts, and scrappy melee. | `Thug Tactics`, `Swashbuckler`, `Jack of All Trades`, `City's Pulse`, `I Know A Guy` |
| **Survival** | Travel, tracking, traps, wilderness craft. | `Relentless Tracker`, `Trap Maker`, `Explorer of Nature`, `Pathfinder`, `Monster Hunter` |
| **Nature** | Animals, medicine, alchemy — and the companion. | `Animal Companion`, `Field Medic`, `Herbalist`, `Poison Maker`, `Beast Lore` |
| **Crafting** | Making, repairing, and pre-buffing gear. | `Peak Performance`, `Artisan`, `Bomb Maker`, `Maintenance`, `Efficient Worker` |
| **Education** | Knowledge as a party tool, plus command. | `Commander`, `Tactician`, `Eloquent Talker`, `Linguist`, `General Education` |
| **Lore** | The supernatural: identifying it, hunting it. | `Consult the Myths`, `Magical Sense`, `Identify Artifact`, `Mage Hunter`, `Channel Superstition` |
| **Arcana** | Spell reliability, defense, and spell-weapon fusion. | `Master of Fundamentals`, `Battle Mage`, `Mana Shield`, `Spellblade`, `Arcane Spell Knowledge`, `Spellweaver` |
| **Mysticism** | Pacts, ally-facing magic, and armor from faith. | `Master of Principles`, `Armor of the Faithful`, `Mystic Champion`, `Communal Practices`, the four `Pact of …` talents |

Two notes that catch builds out:

- **`Animal Companion` is a NATURE talent** (Tier ≤ your Nature rank), not Survival. The mounts
  chapter still says Survival in one line; `talents.json` is canonical.
- **`Arcane Spell Knowledge` / `Mystical Spell Knowledge` give +2 Focus and extra spells** —
  the correct pick for a caster whose fantasy is breadth, and the wrong one for a caster who
  needs a rule of their own at rank 1.

## Checks before moving on

- Exactly three talents, one per rank-1 skill, each with a real rank 1.
- Each is usable with the sheet as built (weapon type, armor, spell, skill all present).
- At most one talent competing for the character's own-turn Quick Action.
- At least one talent delivers the fantasy verb, and at least one delivers the claimed role.
- The gloss written for each talent on the archetype page states what it DOES in six to twelve
  words, in the player's terms — not the talent's full rule text.
