# Converting huge markdown tables into multiple smaller ones

How To:

- go to table in notion and export as HTML
- rename resulting `.html` file to fitting name
- paste file to `src/utils/input`
- execute `python html-to-md.py <file-path>` and set your relative file-path accordingly
- the result will be written into `src/utils/markdown`
- in some cases, you are done now. Some other tables require additional transformations:
  - talents, items, weapons, armor: `python split-table.py <file-path> <split-column-name>`
  - arcane spells: `python transform-arcane-spell-table.py`
  - mystic spells: `python transform-mystic-spell-table.py`
- At the end, paste the contents into the corresponding docs page.

> If you want to also update the json files that the `tools` section relies on, execute `python markdown-to-json.py` at the end.

# Converting markdown tables to CSV for Notion import

The `markdown-to-csv.py` script can export all markdown table files to CSV format with HTML preservation for Notion's "merge with CSV" feature.

## Usage

### Process all markdown files in the directory:
```bash
python markdown-to-csv.py src/utils/markdown/ src/utils/csv/ --all-files
```

### Process a single file:
```bash
python markdown-to-csv.py src/utils/markdown/talents.md src/utils/csv/talents.csv
```

## Features

- **HTML Preservation**: Converts markdown formatting to HTML tags (`<strong>`, `<em>`, `<br/>`) that Notion recognizes
- **Generic Table Support**: Automatically detects and processes any markdown table format
- **Batch Processing**: Can process all `.md` files in a directory at once
- **Notion Compatibility**: Output format is optimized for Notion's "merge with CSV" import feature

## Output

The script preserves formatting such as:
- **Bold text** → `<strong>Bold text</strong>`
- *Italic text* → `<em>Italic text</em>`
- Line breaks → `<br/>`
- Existing HTML tags are preserved

This ensures that when imported into Notion via CSV merge, all formatting (bold text, line breaks, etc.) is maintained correctly.
