#!/bin/bash
# Quick wrapper script for Notion import

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if ZIP file is provided
if [ -z "$1" ]; then
    echo "Usage: ./run-import.sh <path_to_notion_export.zip>"
    echo ""
    echo "Example:"
    echo "  ./run-import.sh ../input/notion-export.zip"
    exit 1
fi

ZIP_FILE="$1"

# Check if file exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: File not found: $ZIP_FILE"
    exit 1
fi

# Check Python dependencies
echo "Checking dependencies..."
python3 -c "import bs4, pandas" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Installing required Python packages..."
    pip install -r "$SCRIPT_DIR/requirements.txt"
fi

# Run the import
echo ""
python3 "$SCRIPT_DIR/import_notion.py" "$ZIP_FILE"
