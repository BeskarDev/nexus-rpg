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

## References

Load these only when the sync actually needs them.

| File | When you need it |
|---|---|
| [references/page-map.md](references/page-map.md) | Always, to resolve a changed doc file → its Notion page URL. Grep it for the doc path or page name; you only need the matching rows. Also lists the Notion-only pages that must never be synced from docs. |
| [references/inline-databases.md](references/inline-databases.md) | When a sync touches Talents, Combat Arts, Creatures, or Equipment — collection IDs, what is and isn't text-syncable, and the schemas/formats for creating Talent and Mystic Spell records. |
| [references/rate-limits.md](references/rate-limits.md) | On a 429/529, or before a multi-page sync — pacing, backoff, the SQL-router fallback, caching, and chunking rules. |

---

## What to sync / what not to

**Sync:** all pages under `docs/` except `docs/analysis/`

**Do NOT sync:**
- `docs/analysis/` — design/research documents, no Notion equivalent, intentionally local-only
- `docs/template.md` — scaffold file
- Notion pages with `(OLD)`, `(old)`, or `(TODO)` in the name — stale/deprecated, ignore them

**⚠️ Four pages are inline-database backed** — Talents, Combat Arts, Creatures, and Equipment store their entries in an embedded Notion DB, so only their intro text is syncable (Creatures and Equipment have no syncable text at all). Individual entries require manual DB record edits — flag that to the user. Details, collection IDs, and record schemas: [references/inline-databases.md](references/inline-databases.md).

**⚠️ Notion rate-limits this integration.** Go sequential, pace your calls, and see [references/rate-limits.md](references/rate-limits.md) for the backoff rules if you hit a 429 or 529.

---

## Sync workflow

### Check what's out of sync

1. Look at recent git commits (`git log --oneline -10 --name-only`) to find changed doc files
2. Map changed files to Notion pages using [references/page-map.md](references/page-map.md)
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
