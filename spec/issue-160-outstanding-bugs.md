# Outstanding Critical Bugs for Issue #160

**Last Updated**: 2025-12-09  
**Status**: 🚨 2 Critical Bugs Blocking Completion  
**Temporary Fix Applied**: ✅ Affected files restored from main branch

---

## Summary

The import script successfully processes most files but has a critical bug where pages containing both descriptive content AND inline database tables lose all their descriptive content. The affected files have been temporarily restored from the main branch to their correct state.

**Next Steps:**
1. Implement merge strategy for pages with inline databases (Issue #1)
2. Verify database processing order doesn't cause overwrites (Issue #2)
3. Re-run import script and verify all files retain their content
4. Complete testing checklist at end of document

---

## Issue #1: Pages with Inline Databases Losing All Content 🚨 **P0 - BLOCKING**

### Problem Description

When a Notion page contains BOTH descriptive content AND an inline database table, the database import process **completely overwrites** the entire page file with just the table, **deleting all other content** including:
- Banner images
- Emoji in titles
- Introduction/description paragraphs
- Section headings
- Formatting (bold text, etc.)

### Affected Files (Now Restored)

1. **`docs/02-adventurers/03-upbringing.md`** - ✅ Restored from main
   - Was missing: Banner image, emoji, description, section heading
   - Now has: Complete content with banner + description + table

2. **`docs/02-adventurers/04-background.md`** - ✅ Restored from main
   - Was missing: Banner image, emoji, description paragraph
   - Now has: Complete content with banner + description + table

3. **`docs/03-statistics/06-talents/00-overview.md`** - ✅ Restored from main
   - Was incorrectly: 130-row full talents database table
   - Now has: Overview/guide content explaining talent system (no table)
   - ❌ Should have: Overview/guide content explaining talents system
   - ❌ Currently has: Full 130-row talents table
   - ✅ Expected: Overview content only (table should be in skill-specific subpages)

### Root Cause Analysis

**Configuration Conflict**:
- These pages are defined in BOTH `pages` and `databases` sections of `config.json`
- Example for Upbringing:
  ```json
  // In pages section:
  "Upbringing": {
    "target": "docs/02-adventurers/03-upbringing.md",
    "title": "🏡 Upbringing",
    "banner": "/img/banner/upbringing-banner.png"
  }
  
  // In databases section:
  "Upbringing": {
    "target": "docs/02-adventurers/03-upbringing.md",  // SAME FILE!
    "type": "upbringing",
    "use_html": true
  }
  ```

**Processing Flow**:
1. ✅ Page import runs first → Creates file with ALL content (banner, text, table)
2. ❌ Database import runs second → **OVERWRITES** entire file with just table
3. Result: All non-table content is lost

### File State Examples

**Upbringing - Expected (main branch):**
```markdown
---
sidebar_position: 3
---

# 🖼 Upbringing

![banner-img](/img/banner/upbringing-banner.png)

Choose the upbringing of your adventurer. This determines in what environment they were born and lived during their youth.

### List of upbringings

Name | Description | Suggested Skills
--- | --- | ---
**Agricultural** | Raised on a farm... | Crafting, Nature, Survival
**Apprenticed** | Raised as a member... | Crafting, Insight, Perception
...
```

**Upbringing - Actual (local branch after script):**
```markdown
---
sidebar_position: 3
---

# Upbringing

| Name | Description | Suggested Skills |
| --- | --- | --- |
| Agricultural | Raised on a farm... | Crafting, Nature, Survival |
| Apprenticed | Raised as a member... | Crafting, Insight, Perception |
...
```
❌ Missing: Emoji in title, banner image, description paragraph, section heading, bold formatting

---

**Talents Overview - Expected (main branch):**
```markdown
---
sidebar_position: 0
---

# 🎯 Talents

![banner-img](/img/banner/talents-banner.png)

Talents are special abilities that enhance your character's capabilities in specific skills.

## How Talents Work

- **Learning Talents**: When you reach certain ranks in a skill...
- **Rank Requirements**: Each talent has rank requirements...

## Talent Categories by Skill

Browse talents by skill below:

### Combat Skills
- [**Archery**](./archery) - Ranged weapon mastery
- [**Fighting**](./fighting) - Melee weapon mastery
...
```

**Talents Overview - Actual (local branch after script):**
```markdown
---
sidebar_position: 0
---

# 🎯 Talents

![banner-img](/img/banner/talents-banner.png)

| Skill Requirement | Name | Description |
| --- | --- | --- |
| Arcana | Arcane Spell Knowledge | (rank 1) +2 Focus. Learn two rank 0...
| Arcana | Battle Mage | (rank 1) When you are attacked...
...130 more rows...
```
❌ All intro/guide content removed, replaced with 130-row table

### Expected Behavior

Two different patterns are needed:

**Pattern A: Single-Page with Inline Table** (Upbringing, Background)
- File should contain: Banner + Description + Table (all in one markdown file)
- Table is NOT split, remains inline
- No separate subpages created

**Pattern B: Overview Page + Split Database** (Talents, Combat Arts, Spells)
- Overview file: Banner + Description + Guide content (NO table)
- Separate subpages: Tables split by skill/school/category
- Overview page should NEVER be overwritten with table

### Solution Requirements

The import system needs to support merging page content with database content:

1. **Detect Content Conflicts**: 
   - Check if page and database target the same file
   - Warn or error if configuration is ambiguous

2. **Merge Strategy for Pattern A**:
   - Import page content first (banner, text)
   - Extract table from database
   - Insert table at appropriate location within page content
   - Preserve ALL non-table content

3. **Separation Strategy for Pattern B**:
   - Import overview page as regular page (NO database processing on this file)
   - Process database separately to create subpages
   - Use different target paths to prevent overwriting

4. **Configuration Flags**:
   ```json
   // Option 1: Flag to preserve page content
   "Upbringing": {
     "target": "docs/02-adventurers/03-upbringing.md",
     "type": "upbringing",
     "use_html": true,
     "preserve_page_content": true  // NEW FLAG
   }
   
   // Option 2: Different targets
   "Talents": {
     "target_dir": "docs/03-statistics/06-talents",  // Subpages only
     "skip_overview": true,  // Don't create overview.md from table
     "use_html": true
   }
   ```

### Investigation Checklist

- [ ] Examine Notion HTML structure for these pages
- [ ] Determine where table appears relative to other content
- [ ] Check if Notion exports these as single HTML file or separate files
- [ ] Verify order of database processing relative to page processing
- [ ] Test if reading existing file before database write would preserve content

---

## Issue #2: Database Processing Order and Overwrites 🚨 **P1 - RELATED**

### Problem Description

The current pipeline processes pages first, then databases. When both target the same file, the database overwrites the page without merging.

### Current Flow
```
1. _process_pages() → Creates/updates files
2. _process_databases() → Overwrites some of the same files
```

### Solution Needed

Implement one of these strategies:

**Option A: Smart Merging**
- Before writing database output, check if file exists
- If exists and was created by page processing, merge content
- Extract table position markers or use heuristics to place table correctly

**Option B: Processing Order Change**
- Process databases first (create table files)
- Process pages second (merge descriptive content into table files)
- Requires reversing current flow

**Option C: Separate Tracking**
- Track which files were created by page processing
- Mark files as "protected" from database overwrites
- Require explicit merge flag to allow database updates

---

## Testing Checklist

Once fixed, verify:

### Upbringing Page
- [ ] Has banner image at top
- [ ] Has introduction text explaining upbringings
- [ ] Has full table with all upbringing options
- [ ] Proper markdown formatting throughout

### Background Page
- [ ] Has banner image at top
- [ ] Has introduction text explaining backgrounds
- [ ] Has full table with all background options
- [ ] Proper markdown formatting throughout

### Talents Overview Page
- [ ] Has banner image at top
- [ ] Has "How Talents Work" section
- [ ] Has "Talent Categories by Skill" section with links
- [ ] Has "Choosing Talents" section
- [ ] Does NOT have the full talents table
- [ ] Links to skill-specific pages (archery, fighting, etc.) work

### Talents Subpages
- [ ] Each skill has its own page (archery.md, fighting.md, etc.)
- [ ] Each subpage contains only talents for that skill
- [ ] Tables properly formatted

---

## Priority and Impact

**Priority**: P0 - BLOCKING RELEASE  
**Impact**: HIGH - Data loss, missing content, broken user experience  
**Affected Users**: All documentation users looking for talents, upbringings, or backgrounds  
**Workaround**: None - content is completely missing

---

## Related Files

- `src/utils/scripts/notion-import/import_notion.py` - Main orchestrator
- `src/utils/scripts/notion-import/config.json` - Configuration with conflicts
- `src/utils/scripts/notion-import/notion_html_converter.py` - Page conversion
- `docs/02-adventurers/03-upbringing.md` - Affected file
- `docs/02-adventurers/04-background.md` - Affected file
- `docs/03-statistics/06-talents/00-overview.md` - Affected file

