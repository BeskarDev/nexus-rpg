> Part of the notion-sync skill; see [../SKILL.md](../SKILL.md).

# ⚠️ Inline database pages — partial sync only

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
