# Plugin Blacklist System

This directory contains configuration files for excluding specific terms from automatic conversion by Docusaurus plugins.

## How It Works

The blacklist system prevents the auto-keyword-plugin and table-chips-plugin from converting specified terms in certain contexts. This is useful when terms appear in natural language where automatic linking would be inappropriate.

## Configuration Files

- `blacklist.json` - Main blacklist configuration
- `README.md` - This documentation file

## Blacklist Format

The blacklist uses an array format where each entry specifies:

```json
[
  {
    "file": "docs/path/to/file.md",
    "section": "Section Title (optional)",
    "keyword": "term to exclude",
    "matchIndex": 0,
    "plugin": "auto-keyword|table-chips|both"
  }
]
```

### Fields

- **file**: Relative path from project root (required)
- **section**: Section heading within the file (optional, uses H1-H6 headings)
- **keyword**: Exact term to exclude from conversion (required)
- **matchIndex**: Zero-based index of which match to exclude (optional, excludes all if not specified)
- **plugin**: Which plugin(s) to apply blacklist to (optional, defaults to "both")

### Examples

```json
[
  {
    "file": "docs/basic-rules/how-to-roll.md",
    "section": "Success Levels",
    "keyword": "Weak",
    "matchIndex": 0,
    "plugin": "auto-keyword"
  },
  {
    "file": "docs/combat/attacking.md",
    "keyword": "fire",
    "plugin": "table-chips"
  },
  {
    "file": "docs/equipment/armor.md",
    "section": "Light Armor",
    "keyword": "Light"
  }
]
```

## Adding New Entries

1. Edit `blacklist.json`
2. Add a new entry with the required fields
3. Test your changes by building the site
4. Commit your changes

## Finding Section Names

Section names correspond to markdown headings (H1-H6). For example:
- `# Main Title` → section: "Main Title"  
- `## Subsection` → section: "Subsection"
- `### Details` → section: "Details"

## Finding Match Indices

If a term appears multiple times in a section and you only want to exclude specific instances:
1. Count occurrences from the beginning of the section (0-based)
2. Use the `matchIndex` field to specify which occurrence to exclude
3. Omit `matchIndex` to exclude all occurrences