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

printf "\nAll done!"
