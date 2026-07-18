---
name: notion-sync
description: "Sync Nexus Legends game content between the local Docusaurus docs and the Notion workspace. Use when the user asks to sync, push, or update Notion from the docs, or to check if Notion is up to date. Handles the non-1:1 mapping where multiple doc files often collapse into one Notion page."
---

# Notion Sync — Nexus Legends

## Workspace

- **Database:** 🎲 Nexus Legends
- **Database URL:** `https://app.notion.com/p/cff43d94715947f3b882b43f08fa3d5a`
- **Data source:** `collection://7d7dd3f5-9a13-4f9c-8976-a84044fd3700`
- **MCP tool prefix:** `mcp__notion__*`

Query all pages:
```sql
SELECT url, Name, Status FROM "collection://7d7dd3f5-9a13-4f9c-8976-a84044fd3700" ORDER BY Status, Name
```

---

## What to sync / what not to

**Sync:** all pages under `docs/` except `docs/analysis/`

**Do NOT sync:**
- `docs/analysis/` — design/research documents, no Notion equivalent, intentionally local-only
- `docs/template.md` — scaffold file
- Notion pages with `(OLD)`, `(old)`, or `(TODO)` in the name — stale/deprecated, ignore them

---

## Doc → Notion page mapping

Many Docusaurus pages (split by subdirectory) collapse into **one** Notion page. The table below shows the canonical mapping. When syncing, merge all listed doc files into the single Notion page.

### Basic Rules

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Changelog | `https://app.notion.com/p/3002b511d2af4c2d8d4520c83d1271a5` | **Notion-only** — release log, updated manually per sync (see Changelog section below) |
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
| Talents ⚠️ | `https://app.notion.com/p/e5d7a07a558e4b4e9b16618043d03fe7` | `docs/03-statistics/06-talents/00-overview.md` (intro text only) — **inline DB + sub-pages; see note below** |

### Combat

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Combat Scenes | `https://app.notion.com/p/ebfd895f5aa64ef39d68e0dc2fac3bf1` | `docs/05-combat/01-combat-scenes.md` |
| Attacking | `https://app.notion.com/p/6f5335b858ec435ba1e312f2b0b0a966` | `docs/05-combat/02-attacking.md` |
| Distances & Movement | `https://app.notion.com/p/a6ca58c46737426eb19abc691d6e428d` | `docs/05-combat/03-distances-movement.md` |
| Conditions | `https://app.notion.com/p/fceb13238be1489694feb93c968fc714` | `docs/05-combat/04-conditions.md` |
| Combat Arts ⚠️ | `https://app.notion.com/p/f1c6922c7dd44b3592b7f9ed56976351` | `docs/05-combat/05-combat-arts/00-overview.md` (intro text only) — **actual arts list is inline DB; see note below** |

### Items

| Notion page | Notion URL | Doc file(s) |
|---|---|---|
| Items | `https://app.notion.com/p/21c541d5871180f9bbd0c38b0dafe10e` | `docs/04-equipment/01-items.md` |
| Equipment ⚠️ | `https://app.notion.com/p/2e632a9fbed6470892368f1f9d59b307` | `docs/04-equipment/02-equipment/00-overview.md` + all `docs/04-equipment/02-equipment/*.md` (merged) — **inline DB, no text body; see note below** |
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
| Creatures ⚠️ | `https://app.notion.com/p/adbdd0508ed9426194a6b310a416154b` | **Inline DB only — creature stat blocks stored in Notion DB, not page text; docs `tier-*.md` files are not text-syncable here** |

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

---

### ⚠️ Inline database pages — partial sync only

Four Notion pages store their primary content in an **embedded inline Notion database**, not as page text. The `mcp__notion__notion-update-page` tool can only update the page's intro text, not the DB records.

| Notion page | What can be text-synced | What cannot |
|---|---|---|
| **Talents** | `00-overview.md` intro text (how talents work, categories list) | Individual talent entries — stored as linked sub-pages and an inline DB (`collection://80c7247e-c500-409c-aaa2-4b13d973f820`) |
| **Combat Arts** | `00-overview.md` intro text (learning/using combat arts) | The arts list itself — stored in inline DB (`collection://62e8ea52-eedf-4429-b340-305105fb06a3`) |
| **Creatures** | Nothing — the page is almost entirely the inline DB | Creature stat blocks — stored in inline DB (`collection://75eaf287-6abb-4c2c-a7a7-90765535f3b0`) |
| **Equipment** | Nothing — `notion-fetch` on the page returns only a page title and an embedded `<database>` block, no intro text at all | Every item row — stored in inline DB **"Equipment & Livestock"** (`collection://ec33e70f-c82d-4657-9620-d105b90554e4`) |

When a doc change affects **only intro text** on these pages, a normal text sync is fine. When it affects the individual entries (a talent, a combat art, a creature stat block, an equipment item), flag this to the user — those require manual Notion DB record edits.

**Equipment DB schema** (`collection://ec33e70f-c82d-4657-9620-d105b90554e4`): `Name` (title), `Category` (select: Animals, Alchemy, Clothes, Container, Gear, Supply, Toolkit, Trade Good, Transportation), `Cost` (number), `Load` (number), `Quality` (number), `Description` (text). Records map 1:1 to individual equipment-table rows across `docs/04-equipment/02-equipment/*.md` — there is no merged-page text body to diff against, so match by item name via `notion-search` scoped to the data source, then create/update records directly. Unlike Talents/Combat Arts, Equipment has no per-record sub-page content — everything lives in the row properties, page body stays blank.

---

## Sync workflow

### Check what's out of sync

1. Look at recent git commits (`git log --oneline -10 --name-only`) to find changed doc files
2. Map changed files to Notion pages using the table above
3. Fetch the Notion page (`mcp__notion__notion-fetch` with the page URL)
4. Compare content — key things to check:
   - Section names match
   - New sections exist in Notion
   - Deleted sections are removed in Notion
   - Tables are structurally identical
   - Rule mechanics are word-for-word accurate (don't paraphrase)

### Push changes to Notion

Use `mcp__notion__notion-update-page` to write updated content.

**Rules when writing:**
- Preserve all Notion-only content (callout blocks, icons, linked mentions) — only change what differs
- Strip Docusaurus frontmatter (`---` blocks) and MDX-specific syntax before writing
- For merged pages (multiple doc files → one Notion page): concatenate doc sections in logical order, don't repeat headings
- **Never use markdown pipe tables** (`| col | col |` / `|---|---|`) — Notion renders the separator row as a literal data row. Use Notion's XML table format instead:
  ```
  <table header-row="true">
  <tr>
  <td>**Header 1**</td>
  <td>**Header 2**</td>
  </tr>
  <tr>
  <td>data</td>
  <td>data</td>
  </tr>
  </table>
  ```
  If a doc file uses markdown pipe tables, convert them to this XML format before writing to Notion.
- Blockquote `>` → Notion callout block
- Preserve the page's Notion icon and cover image — never overwrite them
- Curly quotes (`"` `"`) inside `old_str`/`new_str` must be escaped as `“` / `”` — literal curly quotes break JSON parsing in the MCP tool

### Changelog

**Every sync that carries rule changes must update the Changelog page.**

- URL: `https://app.notion.com/p/3002b511d2af4c2d8d4520c83d1271a5`
- Status: Basic Rules (Notion-only page, no doc equivalent)
- The Changelog is the canonical release log for players. It is the intended mechanism for communicating what changed in each version.

**Format** — each version is a `<details>` block prepended at the top of the page content:

```
<details>
<summary>vX.Y.Z</summary>
	- Category Name
		- change description (lowercase, imperative or past tense)
		- change description
	- Another Category
		- change description
</details>
```

Categories match Notion Status values: `Basic Rules`, `Adventurers`, `Statistics`, `Combat`, `Items`, `Magic`, `Time Intervals`, `NPCs`, `GM Tools`.

**⚠️ Balance `</details>` tags when editing blocks.** Every version is one `<details>…</details>` toggle. When merging or removing version blocks via `update_content`, the `old_str` and `new_str` must contain the **same number of `</details>` closers** — if `old_str` swallows a closing tag that `new_str` does not restore, the affected toggle stays open and Notion silently **nests every following version inside it** (they collapse and look deleted, though nothing is lost). Before running such an edit, count the `<details>` / `</details>` tags on both sides. If a merge would unbalance them, prefer a full-body `replace_content` with clean, correctly-closed markdown over a surgical `update_content`. (This exact bug hid v0.9.1 and older after the v0.9.2→v0.10.0 merge; the fix was a full `replace_content` rewrite.)

**When to add a Changelog entry:**
- Rule text changed (mechanics, numbers, wording that affects play)
- New section or content added
- Section removed or renamed

**When NOT to add a Changelog entry:**
- Pure formatting fixes (em-dash → comma, etc.)
- Sync-only runs where Notion was just catching up to already-released wiki content (the wiki commit already caused a Changelog entry at release time)

**Default: append to the current latest version, do NOT create a new one.** A version number stands for a *release*, not a sync. Until the owner cuts an actual release, every sync's changes go into the topmost existing `<details>` block — add or extend bullets under the right Category (create the Category sub-list if absent), keeping them grouped. The owner explicitly folds interim version bumps back into one open version (e.g. v0.10.0–v0.11.1 were merged into a single open v0.10.0 for the whole spell-design cycle). Only start a **new** `<summary>` block when the owner says they are releasing / cutting a version, or explicitly asks for a new version number.

**When you do bump (owner's call only):** fetch the Changelog, read the most recent `<summary>` tag, and increment the patch version (Z) for small changes, minor version (Y) for significant new systems, major version (X) for complete overhauls.

If the changes being synced were already released (i.e. the git commit predates today and the Changelog already has an entry covering them), do not add a duplicate entry — just confirm the existing entry covers it.

### Uncertainty rule

If the mapping for a specific file is unclear, fetch the Notion page first and compare headings/content to identify the match before writing anything.

---

## Rate limiting strategy

Notion enforces per-integration request limits. Bursting through them causes 429 (rate limited) and occasionally 529 (server overloaded) errors. Treat both identically.

### Rules

**Keep load modest by default:**
- Never fire more than one Notion API call at a time — sequential only, no parallel fetches
- Between consecutive calls, wait at least 1 second
- For a sync session touching more than 5 pages, wait 2 seconds between calls

**On 429 or 529:**
1. Read the `retry_after` value from the error's `additional_data` (seconds)
2. If present: wait exactly that duration, then retry once
3. If absent: use exponential backoff — wait `2^attempt` seconds (2s, 4s, 8s, 16s…), cap at 60s
4. After 5 consecutive failures on the same call, stop and report the error to the user

**SQL router fallback:** `notion-query-data-sources` (SQL mode) hits a separate collection-router quota that can stay rate-limited (`collection_router_upstream_429`) even after the retry wait, while page fetch/search/update endpoints still work. When looking up specific records in an inline DB, fall back to `notion-search` scoped to the data source (`data_source_url`) to find record page IDs, then `notion-fetch` + `notion-update-page` (`update_properties`) per record.

**Cache aggressively:**
- If a Notion page was already fetched this session, use that result — do not re-fetch unless the user explicitly asks for a fresh read
- After writing a page, mark it as "written this session" — don't re-read it to verify (the write either errored or it didn't)

**Batch reads before writes:**
- In a multi-page sync, fetch all Notion pages first, diff all of them, then write only the ones that need changes
- Never interleave reads and writes — complete all reads, then do all writes

**Request page data in chunks for large pages:**
- If a Notion page has more than ~400 lines of content, split the update into logical sections (one H2 block at a time) rather than rewriting the entire page body in one call

---

## Adding entries to inline databases

For the three inline-DB pages (Talents, Combat Arts, Creatures), individual records are **sub-pages inside the collection**, not page text. Use `mcp__notion__notion-create-pages` with a `data_source_id` parent to add new entries.

### Talents — how to create an entry

**Schema** (`collection://80c7247e-c500-409c-aaa2-4b13d973f820`):

| Property | Type | Notes |
|---|---|---|
| `Name` | title | Talent name |
| `Skill Requirement` | multi_select JSON | e.g. `["Arcana"]` — must be a valid JSON array string containing one or more skill names from the allowed list |
| `Description` | text | Full talent text — all ranks inline, separated by `<br><br>` |

**Skill options:** Arcana, Archery, Athletics, Crafting, Education, Fighting, Fortitude, Influence, Insight, Lore, Mysticism, Nature, Perception, Stealth, Streetwise, Survival

**Content format:** All three rank descriptions live in the `Description` property (not the page body — the page body stays blank). Format:

```
**(Rank 1)** Rank 1 ability text here.<br><br>**(Rank 2)** Rank 2 ability text here.<br><br>**(Rank 3)** Rank 3 ability text here.
```

- Bold `**(Rank N)**` at the start of each rank block
- `<br><br>` (HTML double line-break) as the separator between ranks — NOT blank lines or `\n\n`
- No heading levels, no bullet lists at top level — just inline formatted text

**Example MCP call:**

```json
{
  "parent": { "type": "data_source_id", "data_source_id": "80c7247e-c500-409c-aaa2-4b13d973f820" },
  "pages": [{
    "properties": {
      "Name": "Mana Shield",
      "Skill Requirement": "[\"Arcana\"]",
      "Description": "**(Rank 1)** Gain AV equal to 2 + the spell's rank when you cast an arcane spell.<br><br>**(Rank 2)** AV from Mana Shield doesn't end when you take damage.<br><br>**(Rank 3)** When you take damage, you may double the AV bonus — but the ability ends immediately after."
    }
  }]
}
```

> Do NOT pass a `content` field — the page body should remain blank. All talent content lives in `Description`.

### Mystic Spells — how to create an entry

**Schema** (`collection://a299a0b4-0539-4821-b1f0-35eca435ea0a`):

| Property | Type | Notes |
|---|---|---|
| `Name` | title | Spell name |
| `Tradition` | select | One of: Light, Twilight, Life, Death, Nature, Tempest, Peace, War |
| `Rank` | number | 0–3 |
| `Focus` | number | Focus cost (0 for rank 0) |
| `Range` | select | Self, Touch, Melee, Close, Short, Medium, Long, Very Long, Extreme |
| `Target` | select | vs. Parry, vs. Dodge, vs. Resist, Special, Medium (8), Hard (10), Very Hard (12), Extreme (14) |
| `Properties` | multi_select JSON | e.g. `["blast (cone)", "quick"]` — options: blast (cone), blast (line), concentrate, continuous, enchant (body), enchant (eyes), enchant (weapon), illusionary, ritual (minutes), ritual (hours), singular, strike, quick |
| `Effect` | text | Spell effect text — intro + weak/strong/critical inline |
| `Heightened` | text | Heightened ranks inline — omit or empty string if no heightened effect |

**Effect format** — intro text, then `<br>` before each result tier:

```
Intro description text.<br>**Weak.** Weak result text.<br>**Strong.** Strong result text.<br>**Critical.** Critical result text.
```

For success-based spells (no weak/strong/critical), just write the effect text with `<br>` for line breaks within it:

```
On a success, the target gains the following effects:<br>- Effect one.<br>- Effect two.<br>This spell lasts for a medium duration.
```

**Heightened format** — `**(Rank N)**` with single `<br>` between ranks:

```
**(Rank 2)** Rank 2 heightened effect.<br>**(Rank 3)** Rank 3 heightened effect.
```

> Page body stays blank — all spell content lives in the properties.
