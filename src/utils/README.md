# Nexus RPG Utilities

Tools and utilities for managing Nexus RPG content, data conversion, and documentation updates.

## Directory Structure

```
src/utils/
├── scripts/              # All Python scripts
│   ├── notion-import/   # ⭐ Main import system
│   ├── converters/      # Format conversion tools
│   ├── transformers/    # Table transformation scripts
│   ├── extractors/      # Data extraction utilities
│   └── maintenance/     # Maintenance & analysis tools
├── typescript/          # TypeScript utilities for frontend
├── data/               # Working directory (generated files)
│   ├── input/         # Source HTML/ZIP files
│   ├── markdown/      # Converted markdown
│   ├── split-tables/  # Transformed tables
│   ├── csv/          # CSV exports
│   └── json/         # JSON data for app
├── __tests__/          # Tests
└── creature-template.json
```

See [scripts/README.md](./scripts/README.md) for detailed script documentation.

## Quick Start

### Primary Workflow: Notion Import

The **all-in-one Notion import system** handles the complete pipeline from Notion export to updated documentation:

```bash
# Export from Notion (HTML format with subpages)
# Then run:
cd src/utils/scripts/notion-import
python3 import_notion.py ~/Downloads/notion-export.zip
```

This automatically:
1. ✅ Extracts and converts Notion HTML pages to markdown
2. ✅ Processes database tables through transformation pipeline
3. ✅ Updates all corresponding documentation pages
4. ✅ Preserves custom React components
5. ✅ Manages section extraction and replacement

**Configuration:** `scripts/notion-import/config.json`

See detailed documentation: [scripts/notion-import/README.md](./scripts/notion-import/README.md)

## Common Tasks

### Export Tables to CSV for Notion

```bash
# Single file
cd scripts/converters
python3 markdown-to-csv.py ../../data/markdown/talents.md ../../data/csv/talents.csv

# All files in directory
python3 markdown-to-csv.py ../../data/markdown/ ../../data/csv/ --all-files
```

### Scan for Keywords

```bash
cd scripts/maintenance
python3 scan_keywords.py           # Scan all keywords
python3 scan_keywords.py -k fire   # Scan specific keywords
```

### Extract Data to JSON

```bash
cd scripts/extractors
python3 extract-folk-from-markdown.py
```

## Development

### TypeScript Utilities

Frontend utilities are in `typescript/`. Import them in React components:

```typescript
import { calculateCompanionHP } from '@site/src/utils/typescript/companion/companionCalculations';
```

### Testing

Run tests from project root:
```bash
npm test src/utils/__tests__/
```

## Configuration Files

- `scripts/notion-import/config.json` - Main import mappings and settings
- `creature-template.json` - Creature builder templates

## Data Flow

```
Notion Export (ZIP)
     ↓
scripts/notion-import/import_notion.py
     ↓
data/input/*.html → data/markdown/*.md → data/split-tables/*.md
     ↓
docs/**/*.md (updated)
     ↓
data/json/*.json (for app)
```

## Troubleshooting

### Import Issues

1. **Encoding errors:** The converter automatically falls back to latin-1
2. **Wrong table:** Converter prioritizes `collection-content` tables
3. **Missing content:** Check `scripts/notion-import/config.json` mappings
4. **Transform errors:** Ensure input files exist in `data/markdown/`

### Path Issues

All scripts now use relative paths from their location. Run them from anywhere, or from the recommended location:

```bash
cd src/utils/scripts/notion-import
python3 import_notion.py <zip>
```

## Contributing

When adding new scripts:
1. Place in appropriate subdirectory (`scripts/converters/`, etc.)
2. Use relative paths with `../../data/` prefix
3. Update the relevant README
4. Add tests in `__tests__/`
