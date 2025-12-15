# Issue #160 - Implementation Details

This document contains detailed implementation information for the Notion import system.

## Architecture

The system uses a pipeline architecture with these components:

```
import-from-notion.sh (entry point)
  ↓
import_notion.py (orchestrator)
  ↓
├─→ notion_html_converter.py (page converter)
└─→ notion_database_converter.py (database converter)
```

### Component Responsibilities

#### 1. Entry Script: `import-from-notion.sh`
- Validates Python environment
- Checks for required dependencies
- Extracts nested ZIP structure
- Invokes main orchestrator
- Reports success/failure

#### 2. Orchestrator: `import_notion.py`
- Parses config.json
- Matches HTML files to page/database mappings
- Routes files to appropriate converter
- Handles section extraction/replacement
- Coordinates multi-file operations

#### 3. HTML Converter: `notion_html_converter.py`
- Converts Notion HTML to clean Markdown
- Preserves frontmatter and banners
- Converts internal links (BUG: not working for Notion URLs)
- Handles MDX components
- Processes Notion-specific formatting

#### 4. Database Converter: `notion_database_converter.py`
- Processes CSV exports
- Generates overview pages
- Extracts sections into separate files
- Replaces extracted content with reference links

#### 5. Configuration: `config.json`
- Central mapping registry
- Page definitions with frontmatter
- Database configurations
- Section extraction rules

## Configuration Schema

### Page Mapping Structure
```json
{
  "pages": {
    "Notion Page Title": {
      "target": "docs/path/to/file.md",
      "title": "📋 Display Title",
      "banner": "/img/banner/image.png",
      "preserve_sections": [/* optional */],
      "extract_sections": [/* optional */],
      "replace_sections": [/* optional */]
    }
  }
}
```

### Database Configuration Structure
```json
{
  "databases": {
    "Database Name": {
      "csv_path": "docs/path/database.csv"
    }
  },
  "pipeline_databases": {
    "Database Name": {
      "json_path": "src/data/database.json"
    }
  }
}
```

## File Processing Flow

### Regular Page Import
1. Match HTML file to config mapping by title
2. Extract frontmatter from config
3. Convert HTML body to Markdown
4. Insert banner on line 7
5. Convert internal links to relative paths
6. Write to target path

### Page with Section Extraction
1. Import as regular page
2. Extract marked sections to separate files
3. Replace extracted content with reference links
4. Preserve specified sections (e.g., MDX components)

### Database Import
1. Match CSV file to database config
2. Clean and process CSV content
3. Write to target CSV path
4. No overview page generation (simplified approach)

## Current Configuration Coverage

**Total Pages Mapped**: 73/~80 (91%)

### By Section
- Basic Rules: 4 pages (excluding Quickstart Characters - not in Notion)
- Adventurers: 5 pages
- Statistics: 6 pages (including Talents overview)
- Equipment: 11 pages (including subsections)
- Combat: 5 pages (including Combat Arts overview)
- Scenes: 5 pages (including Downtime subsections)
- Magic: 5 pages (including spell overviews)
- Creatures: 4 pages (including Mounts subsections)

### Database Configuration
- **CSV Databases**: Creatures, Equipment
- **Pipeline Databases**: Talents, Combat Arts, Arcane Spells, Mystic Spells, Companion Traits

### Missing Coverage
- Quickstart Characters (not in Notion yet)
- Possibly embedded subsections (needs investigation)

## Known Bugs & Limitations

### Critical Bugs (Blocking Production)
1. **Notion URL Links**: Internal links converted to `https://www.notion.so/...` instead of relative paths
   - **Files Affected**: Magic & Spells index, Mounts page
   - **Fix Required**: Update `notion_html_converter.py` link detection logic

### Minor Issues (Non-Blocking)
1. **Page Name Sensitivity**: Config keys must exactly match Notion export names
   - Case-sensitive
   - Punctuation-sensitive
   - Fixed for "Hit Points, Exhaustion, and Wounds" and "Scenes & Time"

### Design Decisions
1. **No Overview Page Generation**: Databases use manual overview pages (00-overview.md)
2. **Nested ZIP Handling**: Script handles both single and nested ZIP structures
3. **Banner Preservation**: Banners always inserted at line 7, never overwritten
4. **MDX Component Preservation**: Uses `preserve_sections` config to protect React components

## Testing

### Validation Script: `test-system.sh`
Located at: `src/utils/scripts/notion-import/test-system.sh`

Checks:
- All required scripts exist
- Python environment available
- Required dependencies installed
- config.json is valid JSON
- Expected directories exist

### Test Data
- Latest test: December 9, 2025
- Test ZIP: `dde09a98-bcc1-428b-ab04-a8e8966ca7f9_ExportBlock-56fab807-94ff-48ca-b22b-cde3e997f105.zip`
- Results: 38 files successfully imported, 2 critical bugs found

See `issue-160-test-results.md` for detailed test results.

## Development History

### Key Milestones
1. **Initial Implementation**: Basic HTML-to-Markdown conversion
2. **Section Extraction**: Added ability to extract subsections from overview pages
3. **Database Support**: CSV import and processing
4. **Configuration Expansion**: Grew from 11 to 73 page mappings
5. **Test Import**: First full test with production data (Dec 9, 2025)

### Lessons Learned
1. **Exact Names Matter**: Config keys must exactly match Notion export
2. **Nested ZIPs**: Notion exports can have nested ZIP structures
3. **Banner Handling**: Always preserve existing banners, insert on line 7
4. **Link Conversion**: Most complex part, requires careful URL parsing
5. **Testing Essential**: Found critical bugs only through full import test
