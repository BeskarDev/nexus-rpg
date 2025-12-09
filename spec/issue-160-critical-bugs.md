# Issue #160 - Critical Import Bugs Discovered

**Date Discovered**: December 9, 2025  
**Severity**: HIGH - Multiple issues blocking correct import of all database-backed pages  
**Blocking**: Production use until all fixed

---

## Summary

Test import identified 14 critical bugs that affect HTML converter, blank line insertion, and database processing. These are distinct from the Notion URL link bug and represent fundamental issues with how content is being processed during import.

---

## Bug #1: Inline Images Replaced with Notion URLs

**Severity**: HIGH  
**Files Affected**: Folk page and likely all pages with inline images  
**Example**:
```markdown
# Current (WRONG)
[](https://nexus-rpg-d04d1.web.app/assets/images/dwarf-9690b5da2510981f81d96d0dd19dd88e.jpeg)

# Expected (CORRECT)
![dwarf-img](/img/banner/dwarf.jpeg)
```

**Root Cause**: HTML converter replacing image markdown with empty link containing Notion hosting URL instead of preserving/converting to local image reference.

**Impact**: 
- Inline folk portrait images broken
- Any other inline images broken
- Makes pages look broken visually

**Fix Required**: Update `notion_html_converter.py` to:
1. Detect inline images in HTML (`<img>` tags)
2. Extract filename or generate local reference
3. Convert to proper markdown image syntax with local path: `![alt-text](/img/path/filename.png)`
4. Do NOT create empty links with URLs

---

## Bug #2: Missing Blank Lines Between Content Blocks

**Severity**: HIGH  
**Files Affected**: Folk abilities, HP document, and likely all text-heavy pages  
**Examples**:
```markdown
# Current (WRONG - all on one line when rendered)
**Dwarven Sight.** You can roughly make out differences in temperature by sight...
**Stoneskin.** You gain +1 AV...
**Squat Build.** You impose +1 bane...

# Expected (CORRECT - separated blocks)
**Dwarven Sight.** You can roughly make out differences in temperature by sight...

**Stoneskin.** You gain +1 AV...

**Squat Build.** You impose +1 bane...
```

Also seen in blockquotes and paragraphs in HP file - text runs together without line breaks.

**Root Cause**: HTML converter not inserting blank lines between `</p></blockquote>` and next block element in HTML structure.

**Impact**:
- All ability descriptions render as continuous text
- Blockquotes merge with following paragraphs
- Makes document unreadable and hard to parse
- Affects layout and visual hierarchy

**Fix Required**: Update `notion_html_converter.py` to:
1. Detect block-level element boundaries
2. Insert blank lines between distinct blocks (paragraphs, blockquotes, lists, tables, headings)
3. Be smart about NOT adding extra lines where not needed (e.g., between list items)
4. Handle nested structures correctly

---

## Bug #3: Broken Table Properties (CSV Import Issue)

**Severity**: HIGH  
**Files Affected**: Weapons table (and all database tables imported from CSV)  
**Example**:
```markdown
# Current (WRONG - no spaces, unreadable)
| Axe | Throwing Axe | 2 | bundle (d4)lightslashthrown (short/medium) | 1 | 25 |

# Expected (CORRECT - properly formatted with spaces)
| Axe | Throwing Axe | 2 | bundle (d4), light, slash, thrown (short/medium) | 1 | 25 |
```

Properties are concatenated without separators: `bundle (d4)lightslashthrown` should be `bundle (d4), light, slash, thrown`.

**Root Cause**: CSV files have properties in single cells without separation. Converter should use HTML parent file instead (has properly separated table data) or add intelligent parsing to split concatenated properties.

**Impact**:
- Weapons table unreadable
- Equipment tables unreadable
- All other database tables broken
- Players cannot understand weapon/equipment properties

**Fix Required**: 
1. **PRIMARY**: Change import strategy to use parent HTML files (where databases are embedded as tables with proper cell separation) instead of CSV exports
2. **FALLBACK**: If HTML not available, add property parser to split concatenated values by detecting common property names (light, heavy, versatile, slash, pierce, crush, etc.)

---

## Bug #4: Weapons Table Should Be Split by Type

**Severity**: HIGH  
**Files Affected**: `docs/04-equipment/03-weapons.md`  
**Current State**: Single 37-row table with Type column containing: Axe, Blade, Bow, Brawling, Crossbow, Mace, Polearm, Shield, Thrown

**Expected State**: 
- Separate table for each weapon type in subfiles OR
- Table split by type with section headers within single file
- Similar to how Talents are handled (separate pages per talent)
- OR use existing split-tables script from pipeline databases

**Example**:
```markdown
## Axes

| Name | Damage | Properties | Cost |
| Throwing Axe | 2 | bundle (d4), light, slash, thrown | 25 |
| Hatchet | 2 | agile, light, slash | 50 |
...

## Blades

| Name | Damage | Properties | Cost |
...
```

**Root Cause**: Importing entire weapons table as-is from CSV without post-processing to split by Type column.

**Impact**:
- Weapons page is overwhelming single table
- Hard to find specific weapon type
- Poor user experience (37 rows is too much)
- Inconsistent with how Talents/Spells should be handled

**Fix Required**:
1. Add config rule to split weapons by Type column
2. Create subpages for each weapon type (axes.md, blades.md, etc.)
3. Update weapons overview to link to subpages
4. OR use existing split-tables pipeline script if available

---

## Bug #5: Armor Should Be Split by Type

**Severity**: HIGH  
**Files Affected**: `docs/04-equipment/04-armor.md`  
**Expected**: Individual tables for each armor type, same pattern as weapons

**Root Cause**: Same as weapons - importing entire table without splitting

**Impact**: Same as weapons - unreadable single large table

**Fix Required**: Apply same solution as weapons

---

## Bug #6: Equipment Overview Overwritten with Table

**Severity**: HIGH  
**Files Affected**: `docs/04-equipment/02-equipment/00-overview.md`  
**Current State**: File contains equipment table instead of overview content

**Expected**: 
- Overview page with introduction, links to subpages
- Equipment table split into subpages (if applicable)
- Similar to how Talents overview should work

**Root Cause**: Import script not respecting section extraction rules for Equipment database

**Impact**: 
- No overview page, users see raw table
- Cannot navigate equipment types
- Inconsistent with intended architecture

**Fix Required**: 
1. Restore/create proper overview.md with intro content
2. Split equipment table if multiple categories exist
3. Update config to handle Equipment like Talents (with extraction rules)

---

## Bug #7: Magic Items Overview Overwritten with Table

**Severity**: HIGH  
**Files Affected**: `docs/04-equipment/07-magic-items/00-overview.md`  
**Expected**: 
- Overview page with magic items introduction
- Subpages for different magic item categories
- Magic Item Cost Tables, Effects, Materials, Enchantments as separate pages or subsections

**Root Cause**: Same as Equipment - table overwrites overview instead of respecting splits

**Impact**: Same as Equipment - no navigation, raw table instead of overview

**Fix Required**: Same as Equipment

---

## Bug #8: Combat Arts Overview Overwritten with Table

**Severity**: HIGH  
**Files Affected**: `docs/05-combat/05-combat-arts/00-overview.md`  
**Expected**: 
- Overview page with Combat Arts introduction
- Combat Arts split into separate pages (by weapon type or category)
- Should not be single massive table

**Root Cause**: Import not respecting split configuration

**Impact**: Unreadable overview with raw combat arts table

**Fix Required**: 
1. Restore overview.md with intro content
2. Split Combat Arts table into subpages
3. Update overview to link to subpages

---

## Bug #9: Talents Overview Contains Full Talents Table

**Severity**: HIGH  
**Files Affected**: `docs/03-statistics/06-talents/00-overview.md`  
**Current State**: Massive table with ALL talents (100+ rows) instead of overview

**Expected**:
- Overview.md with introduction and links to talent pages
- Individual talent pages (from JSON pipeline database)
- Table NOT in overview

**Root Cause**: Importing talents CSV/table into overview instead of keeping overview separate and using pipeline database for individual talent pages

**Impact**:
- Overview page unusable (131 lines of single table)
- Cannot navigate talents
- Defeats purpose of individual talent pages

**Fix Required**:
1. Restore overview.md with brief introduction
2. Remove talents table from overview
3. Ensure talents pipeline database populates individual talent pages
4. Link from overview to talent categories/subpages

---

## Bug #10: Arcane Spells Overview Overwritten with Table

**Severity**: HIGH  
**Files Affected**: `docs/07-magic/02-arcane-spells/00-overview.md`  
**Expected**: 
- Overview page with arcane spells introduction
- Individual spell pages from pipeline database
- No table in overview

**Root Cause**: CSV table overwrites overview instead of respecting pipeline database split

**Impact**: Unreadable overview with raw spell table

**Fix Required**: 
1. Restore overview.md
2. Remove spell table from overview
3. Ensure pipeline database handles individual spell pages

---

## Bug #11: Mystic Spells Overview Overwritten with Table

**Severity**: HIGH  
**Files Affected**: `docs/07-magic/04-mystic-spells/00-overview.md`  
**Expected**: Same as Arcane Spells

**Fix Required**: Same as Arcane Spells

---

## Bug #12: Creatures Overview Overwritten with Table

**Severity**: HIGH  
**Files Affected**: `docs/08-creatures/03-creatures/00-overview.md`  
**Expected**:
- Overview page with creatures introduction
- Links to creature categories or creature pages
- No raw table

**Root Cause**: CSV table overwrites overview

**Impact**: Unreadable overview with raw creature data

**Fix Required**: 
1. Restore overview.md with intro
2. Remove table from overview
3. Link to creatures or creature categories

---

## Bug #13: Conditions Table Should Import from HTML Not CSV

**Severity**: MEDIUM  
**Files Affected**: `docs/05-combat/04-conditions.md`  
**Expected**: 
- Conditions table imported from HTML parent file (where embedded in page)
- Should use HTML converter, not CSV converter
- Properties properly separated with spaces/formatting

**Root Cause**: Importing from CSV instead of HTML parent

**Impact**: 
- Properties may be concatenated (like weapons)
- Formatting lost
- Should be parsed from HTML page structure

**Fix Required**: 
1. Use HTML parent file instead of CSV
2. Extract table from HTML using proper cell parsing
3. Ensure properties are properly separated

---

## Bug #14: Spell Properties Table Should Import from HTML Not CSV

**Severity**: MEDIUM  
**Files Affected**: `docs/07-magic/05-spell-properties.md`  
**Expected**: 
- Table imported from HTML with proper formatting
- Properties/values properly separated
- Use HTML converter not CSV

**Root Cause**: CSV import losing formatting

**Impact**: Table formatting broken

**Fix Required**: Use HTML parent file instead of CSV

---

## Bug #15: Downtime Activities Should Be Split Into Subpages

**Severity**: HIGH  
**Files Affected**: `docs/06-scenes/04-downtime/00-overview.md` and `docs/06-scenes/04-downtime/activities.md`  
**Current State**: 
- Overview has markdown formatting issues (extra list marker: `- brainstorming`)
- Activities table/content likely in separate file
- Not properly integrated

**Expected**:
- Overview.md with introduction and links
- Separate page for each downtime activity (Working, Artistry, Carousing, Craftwork, Crime, Healing, etc.)
- Similar to Talents architecture
- No raw table in overview

**Root Cause**: 
1. HTML converter not handling markdown list artifacts
2. Section extraction/splitting not working for Downtime
3. Activities not being properly split

**Impact**:
- Overview has visible markdown errors
- Cannot navigate downtime activities
- Activities content not properly organized

**Fix Required**:
1. Fix HTML converter to not insert spurious markdown list markers
2. Implement section extraction for Downtime Activities
3. Split activities into individual pages
4. Restore overview with proper navigation

---

## Bug #16: Upbringing and Background Tables Are Broken

**Severity**: HIGH  
**Files Affected**: 
- `docs/02-adventurers/03-upbringing.md`
- `docs/02-adventurers/04-background.md`

**Expected**: 
- Tables imported from HTML parent files with proper formatting
- Properties/descriptions properly separated
- Use existing table conversion logic

**Root Cause**: 
- Likely importing from CSV with broken formatting
- OR not using table conversion pipeline
- Properties concatenated like weapons

**Impact**: Tables unreadable, broken descriptions

**Fix Required**:
1. Use HTML parent files instead of CSV
2. Apply proper table parsing from HTML
3. Use existing conversion pipeline if available

---

## Root Cause Analysis

These bugs fall into three categories:

### Category A: HTML Converter Issues (Bugs 1, 2)
- Image handling broken
- Blank line insertion not working
- **Fix Location**: `notion_html_converter.py`

### Category B: Database Import Strategy (Bugs 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
- All attempting to use CSV exports instead of HTML parent files
- CSV loses structure and formatting
- Overview pages overwritten by tables instead of respecting splits
- **Fix Location**: `import_notion.py` and config.json strategy

### Category C: Database Split/Pipeline Issues (Bugs 9, 10, 11, 15)
- Overview pages not respecting section extraction rules
- Tables not being split into subpages properly
- Pipeline database integration not working
- **Fix Location**: Section extraction configuration and pipeline integration

---

## Recommended Fix Order

### Phase 1 (Critical - Blocks all other work)
1. Fix import strategy to use HTML files instead of CSV for tables
2. Fix HTML converter image handling
3. Fix blank line insertion in HTML converter

### Phase 2 (Blocks section splitting)
4. Fix overview page overwrites (respect section extraction)
5. Implement table splitting rules
6. Test Talents, Spells, Creatures, Combat Arts, Equipment

### Phase 3 (Data quality)
7. Fix Downtime markdown artifacts
8. Verify all table formatting is readable
9. Full validation test

---

## Testing Required

After fixes:
1. Run import with test ZIP
2. Verify no images are broken URLs
3. Verify blank lines exist between all text blocks
4. Verify tables have proper property separation
5. Verify overview pages are not overwritten
6. Verify all expected subpages created
7. Check all links work
8. Visual inspection of ~20 pages

---

## Files Requiring Code Changes

- `src/utils/scripts/notion-import/notion_html_converter.py` - Image handling, blank line insertion
- `src/utils/scripts/notion-import/import_notion.py` - CSV vs HTML strategy, section extraction
- `src/utils/scripts/notion-import/config.json` - Add split rules for Weapons, Armor, Talents, Spells, Creatures, Combat Arts, Equipment, Magic Items, Downtime

---

## Configuration Updates Needed

Add to config.json for proper handling:

```json
{
  "split_tables": [
    {
      "page": "Weapons",
      "split_by": "Type",
      "create_subpages": true
    },
    {
      "page": "Armor",
      "split_by": "Type",
      "create_subpages": true
    },
    // ... more as needed
  ]
}
```

And ensure all these pages use HTML parent files, not CSV exports.
