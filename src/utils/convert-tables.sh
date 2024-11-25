#!/bin/bash

echo "Converting HTML files to Markdown..."
python html-to-md.py

sleep 1

printf "\nSplitting Markdown tables...\n"
python split-tables.py
python transform-arcane-spell-table.py
python transform-mystic-spell-table.py

sleep 1

printf "\nConverting JSON tables...\n"
python markdown-to-json.py

printf "\nAll done!"
