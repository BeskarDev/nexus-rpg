# Scripts

This directory contains all Python scripts for data processing, conversion, and automation.

## Directory Structure

### `/notion-import/`
**Primary workflow** - All-in-one Notion import system that handles the complete pipeline from Notion ZIP export to updated documentation.

**Main Command:**
```bash
cd scripts/notion-import
python3 import_notion.py <path-to-notion-export.zip>
```

This automatically:
- Extracts and processes Notion HTML pages
- Converts databases through the full transformation pipeline
- Updates documentation files
- Preserves React components
- Manages section extraction/replacement

See [notion-import/README.md](./notion-import/README.md) for details.

### `/converters/`
Format conversion utilities that transform between different data formats:
- `html-to-md.py` - Convert Notion HTML exports to markdown
- `markdown-to-csv.py` - Export markdown tables to CSV for Notion import
- `markdown-to-json.py` - Convert markdown tables to JSON

### `/transformers/`
Table transformation and documentation update scripts:
- `split-table.py` / `split-tables.py` - Split large tables by categories
- `transform-arcane-spell-table.py` - Reorganize arcane spells by discipline
- `transform-mystic-spell-table.py` - Reorganize mystic spells by tradition
- `transform-companion-traits-table.py` - Group companion traits by type
- `transform-creature-table.py` - Process creature stat blocks
- `update-docs-from-split-tables.py` - Apply transformed content to docs
- `convert-tables.sh` - **DEPRECATED** legacy workflow script

### `/extractors/`
Data extraction utilities:
- `extract-folk-from-markdown.py` - Extract folk data from markdown to JSON

### `/maintenance/`
Maintenance and analysis tools:
- `scan_keywords.py` - Scan documentation for keyword usage and blacklist management

## Typical Workflows

### Notion Content Update (Recommended)
Use the all-in-one import system for any Notion updates:
```bash
cd scripts/notion-import
python3 import_notion.py ~/Downloads/notion-export.zip
```

### Manual CSV Export for Notion
To export specific tables back to Notion:
```bash
cd scripts/converters
python3 markdown-to-csv.py ../../data/markdown/talents.md ../../data/csv/talents.csv
```

### Keyword Scanning
Check for new keyword occurrences:
```bash
cd scripts/maintenance
python3 scan_keywords.py
```
