# Data Directory

Working directory for generated and intermediate files during the import/conversion process.

**Note:** This directory contains generated files and is typically not committed to version control (except for JSON data files used by the application).

## Structure

### `/input/`
Source files for conversion:
- Notion HTML exports (`.html` files)
- Notion ZIP exports (entire workspace exports)

### `/markdown/`
Converted markdown files from HTML exports. These are intermediate files used in the transformation pipeline.

### `/split-tables/`
Transformed and split markdown tables after processing. These contain reorganized content ready to be merged into documentation.

### `/csv/`
CSV exports of markdown tables, formatted for importing into Notion via "merge with CSV" feature. HTML tags are preserved for formatting.

### `/json/`
JSON data files used by the web application:
- Spell definitions
- Talent lists
- Equipment catalogs
- Creature data
- etc.

These files are consumed by React components and builder tools.

## Workflow

```
input/*.html  →  [html-to-md.py]  →  markdown/*.md
                                          ↓
                                    [transform scripts]
                                          ↓
                                   split-tables/*.md
                                          ↓
                              [update-docs-from-split-tables.py]
                                          ↓
                                  docs/**/*.md (updated)
```

## Git Tracking

- `input/` - Ignored (source files)
- `markdown/` - Ignored (intermediate files)
- `split-tables/` - Ignored (intermediate files)
- `csv/` - Ignored (export files)
- `json/` - **Tracked** (application data)
