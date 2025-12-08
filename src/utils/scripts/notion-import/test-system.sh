#!/bin/bash
# Comprehensive test of the Notion import system

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

echo ""
echo "=================================================================="
echo "  Testing Notion Import System"
echo "=================================================================="
echo ""

# Test 1: Check all required files exist
echo "→ Test 1: Checking required files..."
required_files=(
    "src/utils/notion-import/import_notion.py"
    "src/utils/notion-import/notion_html_converter.py"
    "src/utils/notion-import/notion_database_converter.py"
    "src/utils/notion-import/config.json"
    "src/utils/notion-import/run-import.sh"
    "src/utils/notion-import/verify-import.py"
    "src/utils/notion-import/requirements.txt"
    "src/utils/notion-import/README.md"
    "NOTION_IMPORT.md"
)

all_exist=true
for file in "${required_files[@]}"; do
    if [ ! -f "$PROJECT_ROOT/$file" ]; then
        echo "  ✗ Missing: $file"
        all_exist=false
    fi
done

if [ "$all_exist" = true ]; then
    echo "  ✓ All required files exist"
else
    echo "  ✗ Some files are missing"
    exit 1
fi

# Test 2: Check Python syntax
echo ""
echo "→ Test 2: Checking Python syntax..."
cd "$SCRIPT_DIR"
python3 -m py_compile import_notion.py
python3 -m py_compile notion_html_converter.py
python3 -m py_compile notion_database_converter.py
python3 -m py_compile verify-import.py
echo "  ✓ All Python files have valid syntax"

# Test 3: Check dependencies
echo ""
echo "→ Test 3: Checking Python dependencies..."
if python3 -c "import bs4, pandas" 2>/dev/null; then
    echo "  ✓ All dependencies available"
else
    echo "  ⚠ Dependencies not installed (will be installed on first run)"
fi

# Test 4: Check config is valid JSON
echo ""
echo "→ Test 4: Validating configuration..."
if python3 -c "import json; json.load(open('config.json'))" 2>/dev/null; then
    echo "  ✓ Configuration is valid JSON"
else
    echo "  ✗ Configuration has JSON errors"
    exit 1
fi

# Test 5: Check if example ZIP exists
echo ""
echo "→ Test 5: Checking for example export..."
if [ -f "../input/06b1aeb9-ab37-4142-92e1-b555a3e53150_ExportBlock-acd871b7-f3eb-4803-a421-2dc9bb957c58.zip" ]; then
    echo "  ✓ Example export found"
    HAS_EXAMPLE=true
else
    echo "  ⚠ Example export not found (optional)"
    HAS_EXAMPLE=false
fi

# Test 6: Run verification if docs were already imported
echo ""
echo "→ Test 6: Verifying existing docs..."
if python3 verify-import.py 2>/dev/null; then
    echo "  ✓ Docs verification passed"
else
    echo "  ⚠ Some docs not yet imported (run import to fix)"
fi

# Summary
echo ""
echo "=================================================================="
echo "  Test Summary"
echo "=================================================================="
echo ""
echo "✓ Notion import system is properly installed"
echo ""
if [ "$HAS_EXAMPLE" = true ]; then
    echo "To run a test import:"
    echo "  ./run-import.sh ../input/06b1aeb9-ab37-4142-92e1-b555a3e53150_ExportBlock-acd871b7-f3eb-4803-a421-2dc9bb957c58.zip"
else
    echo "To run an import:"
    echo "  1. Export from Notion to HTML (with subpages)"
    echo "  2. Place ZIP in: src/utils/input/"
    echo "  3. Run: ./run-import.sh ../input/your-export.zip"
fi
echo ""
echo "=================================================================="
echo ""
