#!/usr/bin/env python3
"""
Verify the Notion import was successful by checking key files.
"""

from pathlib import Path
import sys

def verify_import():
    """Verify that expected files exist and have content."""
    project_root = Path(__file__).parent.parent.parent.parent
    
    # Key files to check
    checks = [
        # Pages
        "docs/03-statistics/01-attributes.md",
        "docs/01-basic-rules/02-character-creation.md",
        "docs/05-combat/02-attacking.md",
        
        # Spell sections
        "docs/07-magic/02-arcane-spells/evocation.md",
        "docs/07-magic/02-arcane-spells/necromancy.md",
        "docs/07-magic/04-mystic-spells/light.md",
        "docs/07-magic/04-mystic-spells/death.md",
        
        # Talent sections
        "docs/03-statistics/06-talents/arcana.md",
        "docs/03-statistics/06-talents/fighting.md",
        
        # Other databases
        "docs/05-combat/05-combat-arts/combat-arts.md",
        "docs/08-creatures/03-creatures/creatures.md",
    ]
    
    print("\n" + "="*60)
    print("  Verifying Notion Import")
    print("="*60 + "\n")
    
    all_ok = True
    for file_path in checks:
        full_path = project_root / file_path
        
        if not full_path.exists():
            print(f"✗ Missing: {file_path}")
            all_ok = False
            continue
        
        # Check file has content
        size = full_path.stat().st_size
        if size < 100:  # Arbitrary small size
            print(f"⚠ Too small: {file_path} ({size} bytes)")
            all_ok = False
        else:
            print(f"✓ OK: {file_path} ({size} bytes)")
    
    print("\n" + "="*60)
    if all_ok:
        print("✓ All checks passed!")
    else:
        print("⚠ Some checks failed - review above")
    print("="*60 + "\n")
    
    return 0 if all_ok else 1

if __name__ == '__main__':
    sys.exit(verify_import())
