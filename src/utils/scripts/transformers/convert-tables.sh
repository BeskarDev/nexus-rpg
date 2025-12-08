#!/bin/bash
# DEPRECATED: This script is from the old workflow
# Use the Notion import system instead: scripts/notion-import/import_notion.py
#
# If you need to use this legacy workflow:
# 1. Place HTML files in ../../data/input/
# 2. Run from src/utils/ directory

echo "⚠️  DEPRECATED: This is a legacy script from the old workflow"
echo "Use the Notion import system instead:"
echo "  python3 scripts/notion-import/import_notion.py <notion-export.zip>"
echo ""
read -p "Continue with legacy workflow? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Change to src/utils directory
cd "$(dirname "$0")/../.." || exit 1

echo "Converting HTML files to Markdown..."
python3 scripts/converters/html-to-md.py data/input

sleep 1

printf "\nSplitting Markdown tables...\n"
python3 scripts/transformers/split-tables.py
python3 scripts/transformers/transform-arcane-spell-table.py
python3 scripts/transformers/transform-mystic-spell-table.py
python3 scripts/transformers/transform-companion-traits-table.py

sleep 1

printf "\nConverting JSON tables...\n"
python3 scripts/converters/markdown-to-json.py

sleep 1

printf "\nConverting Markdown to CSV...\n"
for file in data/markdown/*.md; do
    filename=$(basename "$file" .md)
    if [ "$filename" = "mystic-spells" ]; then
        python3 scripts/converters/markdown-to-csv.py "$file" "data/csv/${filename}.csv" --type mystic-spells
    fi
done

sleep 1

printf "\nUpdating documentation pages...\n"
python3 scripts/transformers/update-docs-from-split-tables.py

printf "\nAll done!\n"
printf "\nNext steps:\n"
printf "  1. Review the updated pages in docs/\n"
printf "  2. Run 'npm run build' to verify the build succeeds\n"
printf "  3. Commit the changes\n"
