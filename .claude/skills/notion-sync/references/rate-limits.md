> Part of the notion-sync skill; see [../SKILL.md](../SKILL.md).

# Rate limiting strategy

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
