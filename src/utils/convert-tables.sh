#!/bin/bash

echo "Converting HTML files to Markdown..."
python html-to-md.py

sleep 1

printf "\nSplitting Markdown tables...\n"
python split-tables.py
python transform-arcane-spell-table.py
python transform-mystic-spell-table.py
python transform-companion-traits-table.py

sleep 1

printf "\nConverting JSON tables...\n"
python markdown-to-json.py

sleep 1

printf "\nConverting Markdown to CSV...\n"
for file in markdown/*.md; do
    filename=$(basename "$file" .md)
    if [ "$filename" = "mystic-spells" ]; then
        python markdown-to-csv.py "$file" "csv/${filename}.csv" --type mystic-spells
    fi
done

sleep 1

printf "\nUpdating documentation pages...\n"
python update-docs-from-split-tables.py

printf "\nAll done!\n"
printf "\nNext steps:\n"
printf "  1. Review the updated pages in docs/\n"
printf "  2. Run 'npm run build' to verify the build succeeds\n"
printf "  3. Commit the changes\n"
