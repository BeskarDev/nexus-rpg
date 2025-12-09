# Feature Spec: All-in-One Notion HTML Export Automation for Docs

**Issue**: #160  
**Branch**: `feature/import-notion`  
**PR**: #161  
**Status**: ⚠️ Core features working - 1 critical bug blocking completion

---

## Executive Summary

Automated workflow for importing Notion HTML exports into Nexus RPG documentation. Single command converts HTML to Markdown, processes databases, preserves Docusaurus structure (frontmatter, banners, React components), and maps content to correct locations.

**Current State** (2025-12-09):
- ✅ Core implementation complete and working
- ✅ Test import successful (40 pages, 8 databases processed)
- ✅ Folk inline images working via config-based injection
- ✅ Blank line spacing fixed with smart insertion logic
- 🚨 **1 CRITICAL BUG** blocking completion - see [`issue-160-outstanding-bugs.md`](./issue-160-outstanding-bugs.md)
- ⏳ Requires merge strategy implementation before final deployment

---

## Problem Statement

Manual Notion-to-docs updates are error-prone and time-consuming. Each export requires:
1. Extracting/organizing files with dynamic hashcode filenames
2. Converting HTML to Markdown
3. Mapping content to correct locations
4. Preserving Docusaurus structure
5. Processing database tables
6. Avoiding duplicates and broken links

---

## Solution Architecture

```
Notion Export (ZIP) → import-from-notion.sh → import_notion.py → Updated Docs
                                                    ├─→ notion_html_converter.py (pages)
                                                    └─→ notion_database_converter.py (databases)
```

### Key Components

1. **Entry Script** (`import-from-notion.sh`): Validates environment, extracts nested ZIPs, orchestrates pipeline
2. **Orchestrator** (`import_notion.py`): Config-driven mapping, routes files to converters, tracks changes
3. **HTML Converter** (`notion_html_converter.py`): HTML→Markdown, preserves frontmatter/banners/React components
4. **Database Converter** (`notion_database_converter.py`): CSV→Markdown tables, section splitting
5. **Configuration** (`config.json`): Page/database mappings, section extraction rules

**For detailed architecture, see**: [`issue-160-implementation-details.md`](./issue-160-implementation-details.md)

---

## Recent Fixes (2025-12-09)

### ✅ Folk Inline Images - FIXED
- **Solution**: Config-based image injection via `inject_images` parameter
- **Implementation**: `_inject_images_after_sections()` method inserts images after blockquotes
- **Result**: All 10 folk types now have correct inline images

### ✅ Blank Line Spacing - FIXED  
- **Solution**: Smart blank line insertion with context awareness
- **Implementation**: 
  - Paragraphs use `\n\n` for proper block separation
  - Blank lines inserted after lists before non-list content
  - Blank lines inserted before bold section headers
  - Regex fixed to require whitespace after list markers (`r'^[-*]\s+|\d+\.\s+'`)
- **Result**: Proper spacing throughout documents, no excessive blank lines

### 🚨 Critical Issue Remaining

**Pages with Inline Databases Losing Content** - See [`issue-160-outstanding-bugs.md`](./issue-160-outstanding-bugs.md)

When a Notion page contains BOTH descriptive content AND an inline database, the database import overwrites the entire file, deleting all descriptive content including banners, intro text, and formatting.

**Affected Files** (temporarily restored from main):
- `docs/02-adventurers/03-upbringing.md`
- `docs/02-adventurers/04-background.md`
- `docs/03-statistics/06-talents/00-overview.md`

**Root Cause**: Files configured in BOTH `pages` and `databases` sections. Page import creates complete file, then database import overwrites it.

**Required Solution**: Implement merge strategy to preserve descriptive content when appending database tables.

---

## Solution Architecture

```
Notion Export (ZIP) → import-from-notion.sh → import_notion.py → Updated Docs
                                                    ├─→ notion_html_converter.py (pages)
                                                    └─→ notion_database_converter.py (databases)
```

### Key Components

1. **Entry Script** (`import-from-notion.sh`): Validates environment, extracts nested ZIPs, orchestrates pipeline
2. **Orchestrator** (`import_notion.py`): Config-driven mapping, routes files to converters, tracks changes
3. **HTML Converter** (`notion_html_converter.py`): HTML→Markdown, preserves frontmatter/banners/React components
4. **Database Converter** (`notion_database_converter.py`): CSV→Markdown tables, section splitting
5. **Configuration** (`config.json`): Page/database mappings, image injection rules, section extraction rules

**For detailed architecture, see**: [`issue-160-implementation-details.md`](./issue-160-implementation-details.md)

---

## Current Coverage

**73/~80 pages mapped (91%)**

| Section | Coverage | Status |
|---------|----------|--------|
| Basic Rules | 4 pages | ✅ |
| Adventurers | 5 pages | ✅ |
| Statistics | 6 pages | ✅ |
| Equipment | 11 pages | ✅ |
| Combat | 5 pages | ✅ |
| Scenes | 5 pages | ✅ |
| Magic | 5 pages | ✅ |
| Creatures | 4 pages | ✅ |

**Databases**: Equipment (split by Category), Creatures (split by Tier), Upbringing, Background, Conditions, Spell Properties, Downtime Activities

---

## Acceptance Criteria

- [x] **Single Command Import**: `./import-from-notion.sh <export.zip>` handles entire process
- [x] **HTML-to-Markdown Conversion**: Clean conversion with structure preservation
- [x] **Dynamic File Matching**: Handles hashcode filenames
- [x] **Database Processing**: HTML tables with proper formatting
- [x] **Structure Preservation**: Frontmatter, banners, React components intact
- [x] **Configuration System**: JSON-based mapping with 73+ page definitions
- [x] **Folk Images**: Config-based inline image injection working
- [x] **Blank Line Spacing**: Smart insertion with proper formatting
- [ ] **Merge Strategy**: Preserve descriptive content when adding database tables (BLOCKING)
- [x] **Documentation**: README with usage/configuration/troubleshooting
- [x] **Validation**: Test script verifies system integrity

---

## Roadmap

### 🚨 Phase 1: Fix Critical Merge Bug (CURRENT - BLOCKING)

**Issue**: Pages with inline databases losing all descriptive content

**Required**:
1. Implement merge strategy to detect when page AND database target same file
2. Preserve page content (banner, description, headings)
3. Append or merge database table content
4. Test with upbringing.md, background.md, talents/00-overview.md

**See**: [`issue-160-outstanding-bugs.md`](./issue-160-outstanding-bugs.md) for full details

### Phase 2: Testing & Validation (NEXT)

1. Full import test with merge strategy applied
2. Verify affected files retain all content
3. Check all links work correctly
4. Visual inspection of all pages
5. Final validation before deployment

### Phase 3: Future Enhancements (Optional)

- Auto-discovery of unmapped pages
- Automated testing with sample exports
- Enhanced error reporting
- Batch processing optimization

---

## Usage

### Basic Usage

```bash
cd /workspaces/nexus-rpg/src/utils/scripts/notion-import
./import-from-notion.sh /path/to/notion-export.zip
```

### Configuration

Edit `config.json` to add/modify page mappings:

```json
{
  "pages": {
    "Notion Page Title": {
      "target": "docs/section/file.md",
      "title": "📋 Display Title",
      "banner": "/img/banner/image.png",
      "inject_images": {
        "Section Name": "path/to/image.png"
      }
    }
  }
}
```

**For configuration details, see**: [`issue-160-implementation-details.md`](./issue-160-implementation-details.md)

---

## Key Files

- `/src/utils/scripts/notion-import/README.md` - User documentation
- `/src/utils/scripts/notion-import/config.json` - Central configuration
- `/src/utils/scripts/notion-import/import-from-notion.sh` - Entry point
- `/src/utils/scripts/notion-import/import_notion.py` - Main orchestrator
- `/src/utils/scripts/notion-import/notion_html_converter.py` - HTML→Markdown converter
- `/src/utils/scripts/notion-import/notion_database_converter.py` - Database processor

---

## Related Documents

- **Outstanding Bugs**: [`issue-160-outstanding-bugs.md`](./issue-160-outstanding-bugs.md) - Current blocking issue
- **Implementation Details**: [`issue-160-implementation-details.md`](./issue-160-implementation-details.md) - Architecture and code details
- **Original Issue**: [GitHub #160](https://github.com/BeskarDev/nexus-rpg/issues/160)
- **Pull Request**: [GitHub #161](https://github.com/BeskarDev/nexus-rpg/pull/161)

---

## Next Steps

1. 🚨 **BLOCKING**: Implement merge strategy for pages with inline databases
2. Re-run import and verify upbringing, background, talents files preserve content
3. Complete final testing and validation
4. Deploy to production workflow
