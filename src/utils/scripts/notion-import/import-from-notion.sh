#!/bin/bash
# Notion Import - Main Entry Point
# Automates the complete workflow for importing Notion HTML exports into docs

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_step() {
    echo -e "${BLUE}→${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_header() {
    echo ""
    echo "======================================================================"
    echo "  $1"
    echo "======================================================================"
    echo ""
}

# Check arguments
if [ -z "$1" ]; then
    echo "Usage: $0 <path_to_notion_export.zip>"
    echo ""
    echo "Example:"
    echo "  $0 ../input/notion-export.zip"
    exit 1
fi

ZIP_FILE="$1"

# Check if file exists
if [ ! -f "$ZIP_FILE" ]; then
    print_error "File not found: $ZIP_FILE"
    exit 1
fi

if [ ! "${ZIP_FILE: -4}" == ".zip" ]; then
    print_error "File must be a ZIP file: $ZIP_FILE"
    exit 1
fi

# Start workflow
print_header "Notion Import for Nexus RPG"

echo "Source: $ZIP_FILE"
echo "Target: $PROJECT_ROOT/docs/"
echo ""

# Step 1: Check Python dependencies
print_step "Checking dependencies..."
if python3 -c "import bs4, pandas" 2>/dev/null; then
    print_success "All dependencies available"
else
    print_warning "Installing required Python packages..."
    pip install -q -r "$SCRIPT_DIR/requirements.txt"
    print_success "Dependencies installed"
fi

sleep 0.5

# Step 2: Extract ZIP file
print_step "Extracting ZIP file..."
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

unzip -q "$ZIP_FILE" -d "$TEMP_DIR" 2>&1 | head -n 5 || true

# Handle nested ZIPs
for nested_zip in "$TEMP_DIR"/*.zip; do
    if [ -f "$nested_zip" ]; then
        unzip -q "$nested_zip" -d "$TEMP_DIR"
        rm "$nested_zip"
    fi
done

print_success "ZIP extracted to temporary directory"

sleep 0.5

# Step 3: Run Python import script
print_step "Processing pages and databases..."
echo ""

cd "$SCRIPT_DIR"
python3 import_notion.py "$ZIP_FILE" 2>&1

echo ""

# Step 4: Verification
print_step "Verifying import..."
if python3 verify-import.py 2>&1 | grep -q "All checks passed"; then
    print_success "Import verification passed"
else
    print_warning "Some files may need manual review"
fi

sleep 0.5

# Final summary
print_header "Import Complete!"

echo "Next steps:"
echo "  1. Review the updated pages in docs/"
echo "  2. Check git diff: git diff docs/"
echo "  3. Run: yarn build"
echo "  4. Commit the changes if everything looks good"
echo ""
echo "For detailed logs, see the output above."
echo ""
