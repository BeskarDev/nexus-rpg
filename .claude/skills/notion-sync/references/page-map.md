> Part of the notion-sync skill; see [../SKILL.md](../SKILL.md).

# Doc → Notion page mapping

Many Docusaurus pages (split by subdirectory) collapse into **one** Notion page. The table below shows the canonical mapping. When syncing, merge all listed doc files into the single Notion page.

### Basic Rules

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Changelog | `https://app.notion.com/p/3002b511d2af4c2d8d4520c83d1271a5` | **Notion-only** — release log, updated manually per sync (see the Changelog section in [../SKILL.md](../SKILL.md)) |
| How To Roll | `https://app.notion.com/p/7cc5249c298f47fd882ecffde06eb1c8` | `docs/01-basic-rules/01-how-to-roll.md` |
| Character Creation | `https://app.notion.com/p/cb536d8f121c441e8e857dcb7e8bd718` | `docs/01-basic-rules/02-character-creation.md` |
| Character Progression | `https://app.notion.com/p/148541d587118097abc4f1d1d1b66c1c` | `docs/01-basic-rules/04-character-progression.md` |
| General Rulings | `https://app.notion.com/p/a2fe865be7c74fdf98d436243617d673` | `docs/01-basic-rules/05-general-rulings.md` |

> Quickstart characters (`docs/01-basic-rules/03-quickstart-characters/`) have no Notion equivalent — they are Docusaurus-only reference sheets.

### Adventurers

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Folk | `https://app.notion.com/p/d648f54c00b143c390162fa1684493a2` | `docs/02-adventurers/01-folk.md` |
| Languages | `https://app.notion.com/p/c14ec8742075496c91c21b14732ec7d3` | `docs/02-adventurers/02-languages.md` |
| Upbringing | `https://app.notion.com/p/7867d924af644b94a446c36d825229e3` | `docs/02-adventurers/03-upbringing.md` |
| Background | `https://app.notion.com/p/74eea7258a1c496384b3d10b4835039d` | `docs/02-adventurers/04-background.md` |
| NPCs and Relationships | `https://app.notion.com/p/153541d58711800e82fdec6b4983259b` | `docs/02-adventurers/05-npc-relations.md` |

### Statistics

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Attributes | `https://app.notion.com/p/4064731fdf184a4d8dec1e485d2926b0` | `docs/03-statistics/01-attributes.md` |
| Hit Points, Exhaustion, and Wounds | `https://app.notion.com/p/dee1ee5dda9e4fc7b66c33c57f92927e` | `docs/03-statistics/02-hit-points-wounds.md` |
| Defenses | `https://app.notion.com/p/61d65292874241078fa5c9745f3e8642` | `docs/03-statistics/03-defenses.md` |
| Resolve | `https://app.notion.com/p/a88e27c562584b59a039847b7d6bed0f` | `docs/03-statistics/04-resolve.md` |
| Skills | `https://app.notion.com/p/fb76a87473ec4880a79ae3e290fac6c1` | `docs/03-statistics/05-skills.md` |
| Talents ⚠️ | `https://app.notion.com/p/e5d7a07a558e4b4e9b16618043d03fe7` | `docs/03-statistics/06-talents/00-overview.md` (intro text only) — **inline DB + sub-pages; see [inline-databases.md](./inline-databases.md)** |

### Combat

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Combat Scenes | `https://app.notion.com/p/ebfd895f5aa64ef39d68e0dc2fac3bf1` | `docs/05-combat/01-combat-scenes.md` |
| Attacking | `https://app.notion.com/p/6f5335b858ec435ba1e312f2b0b0a966` | `docs/05-combat/02-attacking.md` |
| Distances & Movement | `https://app.notion.com/p/a6ca58c46737426eb19abc691d6e428d` | `docs/05-combat/03-distances-movement.md` |
| Conditions | `https://app.notion.com/p/fceb13238be1489694feb93c968fc714` | `docs/05-combat/04-conditions.md` |
| Combat Arts ⚠️ | `https://app.notion.com/p/f1c6922c7dd44b3592b7f9ed56976351` | `docs/05-combat/05-combat-arts/00-overview.md` (intro text only) — **actual arts list is inline DB; see [inline-databases.md](./inline-databases.md)** |

### Items

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Items | `https://app.notion.com/p/21c541d5871180f9bbd0c38b0dafe10e` | `docs/04-equipment/01-items.md` |
| Equipment ⚠️ | `https://app.notion.com/p/2e632a9fbed6470892368f1f9d59b307` | `docs/04-equipment/02-equipment/00-overview.md` + all `docs/04-equipment/02-equipment/*.md` (merged) — **inline DB, no text body; see [inline-databases.md](./inline-databases.md)** |
| Weapons | `https://app.notion.com/p/7795cbfb406e46459412cb4623e307a4` | `docs/04-equipment/03-weapons.md` |
| Armor | `https://app.notion.com/p/21b99f5ab9bf44a1bb2b39a71e7296f0` | `docs/04-equipment/04-armor.md` |
| Weapon & Armor Properties | `https://app.notion.com/p/33fd6d641c214c1da0d191ee46f8f411` | `docs/04-equipment/05-armor-weapon-properties.md` |
| Exotic Weapons | `https://app.notion.com/p/4d512317b71d48daaf15614d4468975a` | `docs/04-equipment/06-exotic-weapons.md` |
| Magic Items | `https://app.notion.com/p/203541d5871180a0aafed2c2a760c5d0` | `docs/04-equipment/07-magic-items/00-overview.md` + `cost-tables.md` + `effects.md` + `enchantments.md` + `materials.md` (merged) |

### Time Intervals

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Scenes & Time Scales | `https://app.notion.com/p/311541d58711803f930cce2122282ed7` | `docs/06-scenes/01-scenes-time-intervals.md` |
| Effect Durations | `https://app.notion.com/p/819d7f4b7fa644aea87ba9023c0adfd1` | `docs/06-scenes/02-effect-durations.md` |
| Resting | `https://app.notion.com/p/529578a4d457416ea113f0f10c42a28b` | `docs/06-scenes/03-resting.md` |
| Downtime | `https://app.notion.com/p/6a1ae735202f4c95a4345df0655b6c68` | `docs/06-scenes/04-downtime/00-overview.md` + `activities.md` (merged) |
| Crafting Professions | `https://app.notion.com/p/151541d587118020a209c4d6afe9e90b` | `docs/06-scenes/05-crafting-professions.md` |
| Harvesting Creature Parts | `https://app.notion.com/p/18f541d5871180b19280d5eff63a4561` | `docs/06-scenes/06-harvesting-creature-parts.md` |
| Challenges | `https://app.notion.com/p/311541d5871180118177df9da7fc85a4` | `docs/06-scenes/07-challenges/00-overview.md` |
| Social Intrigue | `https://app.notion.com/p/Social-Intrigue-311541d5871180e7b7bbdb3a6e0a75f7` | `docs/06-scenes/07-challenges/01-social-intrigue.md` |
| Travel | `https://app.notion.com/p/Travel-311541d58711800287c2e3b467721040` | `docs/06-scenes/07-challenges/02-travel.md` |

### Magic

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Magic & Spells | `https://app.notion.com/p/d0587e860f65446cb6aa4332e1fd43ec` | `docs/07-magic/01-magic-spells/index.md` |
| Arcane Spells | `https://app.notion.com/p/b503539c7a7342a3a5d89c346f4557a4` | `docs/07-magic/02-arcane-spells/00-overview.md` + all discipline files (merged) |
| Metamagic Arts | `https://app.notion.com/p/950d25addb2c4f9e801c687cb0493c87` | `docs/07-magic/03-metamagic-arts.md` |
| Mystic Spells | `https://app.notion.com/p/4fd1e40551414db0a2b4437d875a2309` | `docs/07-magic/04-mystic-spells/00-overview.md` + all domain files (merged) |
| Spell Properties | `https://app.notion.com/p/09faa9f09b204a9785c4ab8eee69010f` | `docs/07-magic/05-spell-properties.md` |

### NPCs

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Mounts & Companions | `https://app.notion.com/p/dd40057282774a6fb0e5c30e7c447563` | `docs/08-creatures/01-mounts-companions/equipment.md` + `mounts.md` + `traits.md` (merged) |
| Creature Rules | `https://app.notion.com/p/afe4dc6d3df44599a5b7141ab5b2d8d0` | `docs/08-creatures/02-creature-rules.md` |
| Bestiary ⚠️ | `https://app.notion.com/p/3b8541d5871181c9b0c9f4d86005baaa` | **The current roster.** Child DB `collection://5cbb0071-c751-4124-a468-f0a4f4904022`, one page per creature, generated from `src/utils/data/json/creatures.json`. Stat block + lore live in the page body, filterable facts in properties. Do not hand-edit: regenerate from the JSON |
| Creatures ⚠️ (legacy) | `https://app.notion.com/p/adbdd0508ed9426194a6b310a416154b` | **Superseded by Bestiary.** Old inline DB with the retired vocabulary (types `Animal`/`Daimon`, category `Master`, sizes with modifiers). Kept until the roster rebuild is finished |

### GM Tools

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Random Treasure | `https://app.notion.com/p/3ae557915beb47178506989648dc6d26` | `docs/10-gm-tools/01-random-tables/05-random-treasure.mdx` |
| Random Creatures | `https://app.notion.com/p/206541d587118085a1e9cf8c596662ce` | `docs/10-gm-tools/01-random-tables/06-random-creature.mdx` |
| Random Spells | `https://app.notion.com/p/208541d58711803e921ffdc7af8bb24c` | `docs/10-gm-tools/01-random-tables/07-random-spell.mdx` |
| Random Names | `https://app.notion.com/p/20c541d5871180c18709e1cd2d781f86` | `docs/10-gm-tools/01-random-tables/08-random-name.mdx` |
| Random Challenges | `https://app.notion.com/p/238541d5871180629f7cfe20bc56cfb2` | `docs/10-gm-tools/01-random-tables/09-random-challenge.mdx` |

---

### Notion-only pages (no doc equivalent — do not sync from docs)

These pages exist only in Notion. They are authoritative in Notion and have no corresponding doc file.

| Notion page | Notion URL | Notes |
|---|---|---|
| Wild Surge | `https://app.notion.com/p/2a7541d5871180709532c25a63e24ccc` | d100 wild surge table + permanent mutations table |
| Mystic Penance | `https://app.notion.com/p/2a7541d5871180bd917ccaf8609b086c` | d6 penance table for mystic spell blunders |
| Runewriting | `https://app.notion.com/p/83a4270f09ff4d24aed922bb3f5b9177` | Stub / WIP — runewriting rules for mystic casters |
| Exploration | `https://app.notion.com/p/313541d58711800a82a4e530dfbe387b` | Stub / WIP — hex exploration system notes |
| Random Encounters | `https://app.notion.com/p/32d541d58711807c86cdcfb5a46a304a` | Stub / WIP — random encounter structure notes |
| Rewards | `https://app.notion.com/p/011ba83dd84d4ce1870ec7f162a8eb5f` | Loot/coin reward tables by adventuring tier |
