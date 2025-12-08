# Notion Import Tool for Nexus RPG

Automated solution for importing Notion HTML exports into the Nexus RPG documentation.

## Overview

This tool automates the process of updating game docs from Notion exports. It handles:

- **HTML pages** → Markdown conversion with proper formatting
- **Notion databases (CSV)** → Split markdown files by category/section
- **Dynamic hashcode matching** → Routes content correctly even when Notion changes file suffixes
- **Frontmatter preservation** → Keeps existing metadata, React imports, and banner images
- **Change reporting** → Summary of what was updated

## Quick Start

### 1. Export from Notion

1. Go to your Notion workspace
2. Click the `...` menu on the page you want to export
3. Select "Export"
4. Choose "HTML" format
5. Enable "Include subpages"
6. Download the ZIP file

### 2. Run Import Script

```bash
cd src/utils/notion-import
./import-from-notion.sh ~/Downloads/notion-export.zip
```

That's it! The script will automatically:
- Extract the ZIP (including nested ZIPs)
- Validate dependencies
- Convert all pages and databases
- Map content to correct docs files
- Preserve existing structure and custom elements
- Verify changes
- Report what was updated

## How It Works

### Dynamic File Matching

Notion appends random hashcodes to filenames that change with each export. The system uses name prefixes to match files:

- **Pages**: `glob(f"{page_prefix}*.html")` - Matches "Attributes*.html" regardless of suffix
- **Databases**: `glob(f"*{db_prefix}*.csv")` - Matches "*Arcane Spells*.csv" regardless of prefix/suffix

### Structure Preservation

The import preserves all existing Docusaurus elements:

- **Frontmatter**: YAML metadata (sidebar_position, etc.)
- **React Components**: MDX files retain import statements for interactive components
- **Title & Icons**: Preserves emoji and title formatting
- **Banner Images**: Reinserts configured banner images
- **No Duplicates**: Eliminates duplicate headers from Notion export

Example preserved structure:
```markdown
---
sidebar_position: 1
---

# 💪 Attributes

![banner-img](/img/banner/attributes-banner.png)

[Content starts here - no duplicate "Attributes" header]
```

### HTML Tag Preservation

Database outputs preserve formatting tags:
- `<strong>` - Bold text
- `<em>` - Italic text
- `<br/>` - Line breaks in table cells

## Configuration

Edit `config.json` to customize mappings. Use **name prefixes only** (Notion's hashcodes change):

### Page Mappings

```json
{
  "mappings": {
    "pages": {
      "Attributes": {
        "target": "docs/03-statistics/01-attributes.md",
        "banner": "attributes-banner.png",
        "title": "💪 Attributes"
      }
    }
  }
}
```

- **Key**: Name prefix from Notion export (e.g., "Attributes")
- **target**: Relative path from project root
- **banner**: Banner image filename in `/img/banner/`
- **title**: Page title with emoji (used if no title in HTML)

### Database Mappings

```json
{
  "mappings": {
    "databases": {
      "Arcane Spells": {
        "target_dir": "docs/07-magic/02-arcane-spells",
        "type": "arcane-spells",
        "sections": ["Evocation", "Illusion", "Conjuration"]
      }
    }
  }
}
```

- **Key**: Database name prefix (e.g., "Arcane Spells")
- **target_dir**: Directory where section files will be created
- **type**: Database type (determines formatting)
- **sections**: Expected sections/categories from database

### Ignore Patterns

Skip files matching patterns:

```json
{
  "ignore_patterns": [
    "*(OLD)*",
    "*Playtest*",
    "*Test*"
  ]
}
```

## File Structure

```
src/utils/notion-import/
├── config.json                      # Mapping configuration
├── import-from-notion.sh            # Main entry point (bash)
├── import_notion.py                 # Python orchestrator
├── notion_html_converter.py         # HTML → Markdown converter
├── notion_database_converter.py     # CSV → Markdown converter
├── verify-import.py                 # Verification script
├── README.md                        # This file
└── requirements.txt                 # Python dependencies
```

## Supported Content Types

### Pages

Regular Notion pages are converted to markdown with:
- Headers (H1, H2, H3)
- Bold, italic, inline code
- Lists (ordered and unordered)
- Blockquotes and callouts
- Tables
- Images
- Links

### Databases

#### Arcane Spells / Mystic Spells
Grouped by School/Domain, formatted with:
- Rank, Focus, Target, Range, Properties table
- Effect descriptions
- Heightened variants

#### Talents
Grouped by Skill, formatted with:
- Tier designation
- Requirements
- Effect descriptions

#### Combat Arts
Single file with all arts formatted consistently

#### Creatures
Converted to tables or stat blocks

## Workflow Details

### 1. Dependency Check
- Verifies Python 3.7+ availability
- Checks for required packages (beautifulsoup4, pandas, lxml)
- Exits with helpful error if dependencies missing

### 2. Extraction
- Unzips the Notion export to temporary directory
- Handles nested ZIP files automatically
- Locates the main export directory
- Cleans up temp files after processing

### 3. Page Processing
- Matches HTML files to mappings using name prefixes
- Converts HTML to markdown
- Preserves existing frontmatter, imports, banners
- Eliminates duplicate headers
- Writes to target location

### 4. Database Processing
- Matches CSV files to mappings using name prefixes
- Converts to markdown by section
- Preserves HTML formatting tags (<strong>, <em>, <br/>)
- Splits into individual files
- Preserves frontmatter and sidebar positions

### 5. Verification
- Validates all files were written correctly
- Checks for syntax errors
- Reports any issues encountered

### 6. Reporting
Displays summary:
- Pages updated
- Databases updated
- Sections updated
- Any errors encountered

## Adding New Mappings

### For a New Page

1. Find the Notion page filename from the export (e.g., "My Page abc123def456.html")
2. Extract the name prefix (e.g., "My Page")
3. Add to `config.json` under `pages`:

```json
"My Page": {
  "target": "docs/section/my-page.md",
  "banner": "my-page-banner.png",
  "title": "📄 My Page"
}
```

### For a New Database

1. Find the CSV filename from the export (e.g., "My Database xyz789.csv")
2. Extract the name prefix (e.g., "My Database")
3. Add to `config.json` under `databases`:

```json
"My Database": {
  "target_dir": "docs/section/subsection",
  "type": "database-type",
  "sections": ["Section1", "Section2"]
}
```

4. If needed, add formatting logic to `notion_database_converter.py`

## Troubleshooting

### "Python not found" or dependency errors
Install required packages:
```bash
pip install -r requirements.txt
```

### "File not found" errors
The import script uses name prefix matching. Check that your mapping keys match the Notion export filenames (without hashcodes). Example:
- Export filename: `Attributes 4064731fdf184a4d8dec1e485d2926b0.html`
- Config key: `"Attributes"`

### Incorrect Formatting
Check the HTML structure and update converters as needed:
- `notion_html_converter.py` for pages
- `notion_database_converter.py` for databases

### Missing Structure
If frontmatter, banners, or imports are lost:
1. Verify the file already exists in docs/
2. Check `config.json` has `banner` field for pages
3. Check `import_notion.py` successfully calls `_read_existing_structure()`

## Requirements

- Python 3.7+
- beautifulsoup4
- pandas
- lxml

Install with:
```bash
pip install -r requirements.txt
```

## Development

### Testing Individual Converters

Test HTML converter:
```bash
python notion_html_converter.py path/to/page.html "Page Title"
```

Test database converter:
```bash
python notion_database_converter.py path/to/database.csv arcane-spells
```

### Modifying Converters

1. Update conversion logic in converter files
2. Test with sample files
3. Run full import with `./import-from-notion.sh` to verify

## Key Improvements

This system addresses production requirements:

1. **Dynamic Hashcode Handling** - Uses name prefix matching instead of fixed hashcodes
2. **Single Command Entry Point** - `./import-from-notion.sh` handles all steps
3. **MDX Preservation** - React component imports are preserved in MDX files
4. **Docusaurus Structure** - Frontmatter, banners, titles, and no duplicate headers
5. **HTML Tag Preservation** - Bold, italic, and line break tags survive conversion

## License

Same as Nexus RPG project.

