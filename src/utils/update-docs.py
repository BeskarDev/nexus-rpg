#!/usr/bin/env python3
"""
Master script to transform HTML tables and automatically update documentation pages.

Usage:
    python update-docs.py <content-type> <html-file>
    
Example:
    python update-docs.py mystic-spells input/mystic-spells.html
    python update-docs.py arcane-spells input/arcane-spells.html
    python update-docs.py talents input/talents.html
    python update-docs.py combat-arts input/combat-arts.html
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

# Define content type mappings to docs directories
CONTENT_MAPPINGS = {
    'mystic-spells': {
        'transform_script': 'transform-mystic-spell-table.py',
        'split_file': 'split-tables/mystic-spells.md',
        'target_dir': '../../docs/07-magic/04-mystic-spells',
        'section_field': 'tradition',  # Which field determines the split
        'sections': ['Light', 'Twilight', 'Life', 'Death', 'Nature', 'Tempest', 'Peace', 'War']
    },
    'arcane-spells': {
        'transform_script': 'transform-arcane-spell-table.py',
        'split_file': 'split-tables/arcane-spells.md',
        'target_dir': '../../docs/07-magic/02-arcane-spells',
        'section_field': 'discipline',
        'sections': ['Evocation', 'Illusion', 'Conjuration', 'Telepathy', 'Telekinetics', 'Necromancy']
    },
    'talents': {
        'split_script': 'split-table.py',
        'split_field': 'Skill',
        'markdown_file': 'markdown/talents.md',
        'target_dir': '../../docs/03-statistics/06-talents',
        'sections': ['Arcana', 'Archery', 'Athletics', 'Crafting', 'Education', 'Fighting', 
                    'Fortitude', 'Influence', 'Insight', 'Lore', 'Mysticism', 'Nature',
                    'Perception', 'Stealth', 'Streetwise', 'Survival']
    },
    'combat-arts': {
        'markdown_file': 'markdown/combat-arts.md',
        'target_dir': '../../docs/05-combat/05-combat-arts',
        'custom_split': True  # Requires custom logic for Basic/Supreme split
    }
}

def run_command(cmd, description):
    """Run a shell command and handle errors."""
    print(f"\n→ {description}...")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ✗ Error: {result.stderr}")
        return False
    print(f"  ✓ Success")
    return True

def extract_section_content(content, section_name):
    """Extract content for a specific section from transformed markdown."""
    lines = content.split('\n')
    section_start = None
    section_end = None
    
    for i, line in enumerate(lines):
        if line.strip() == f"## {section_name}":
            section_start = i
        elif section_start is not None and line.startswith('## ') and line.strip() != f"## {section_name}":
            section_end = i
            break
    
    if section_start is None:
        return None
    
    if section_end is None:
        section_end = len(lines)
    
    # Extract section content (skip the ## header)
    section_lines = lines[section_start+1:section_end]
    return '\n'.join(section_lines).strip()

def update_mystic_spells(html_file):
    """Update mystic spell tradition pages."""
    config = CONTENT_MAPPINGS['mystic-spells']
    
    # Step 1: Convert HTML to markdown
    if not run_command(f"python html-to-md.py {html_file}", "Converting HTML to markdown"):
        return False
    
    # Step 2: Transform the spell table
    if not run_command(f"python {config['transform_script']}", "Transforming spell table"):
        return False
    
    # Step 3: Read the transformed content
    split_file = Path(config['split_file'])
    if not split_file.exists():
        print(f"  ✗ Error: Split file not found: {split_file}")
        return False
    
    with open(split_file, 'r') as f:
        transformed_content = f.read()
    
    # Step 4: Update each tradition page
    print(f"\n→ Updating tradition pages...")
    target_dir = Path(config['target_dir'])
    
    for tradition in config['sections']:
        section_content = extract_section_content(transformed_content, tradition)
        if section_content is None:
            print(f"  ✗ Warning: No content found for {tradition}")
            continue
        
        # Build the full page content
        page_content = f"""---
sidebar_position: {config['sections'].index(tradition) + 1}
---

# {tradition}

{section_content}
"""
        
        # Write to the target file
        target_file = target_dir / f"{tradition.lower()}.md"
        with open(target_file, 'w') as f:
            f.write(page_content)
        print(f"  ✓ Updated {tradition}")
    
    return True

def update_arcane_spells(html_file):
    """Update arcane spell discipline pages."""
    config = CONTENT_MAPPINGS['arcane-spells']
    
    # Step 1: Convert HTML to markdown
    if not run_command(f"python html-to-md.py {html_file}", "Converting HTML to markdown"):
        return False
    
    # Step 2: Transform the spell table
    if not run_command(f"python {config['transform_script']}", "Transforming spell table"):
        return False
    
    # Step 3: Read the transformed content
    split_file = Path(config['split_file'])
    if not split_file.exists():
        print(f"  ✗ Error: Split file not found: {split_file}")
        return False
    
    with open(split_file, 'r') as f:
        transformed_content = f.read()
    
    # Step 4: Update each discipline page
    print(f"\n→ Updating discipline pages...")
    target_dir = Path(config['target_dir'])
    
    for discipline in config['sections']:
        section_content = extract_section_content(transformed_content, discipline)
        if section_content is None:
            print(f"  ✗ Warning: No content found for {discipline}")
            continue
        
        # Build the full page content
        page_content = f"""---
sidebar_position: {config['sections'].index(discipline) + 1}
---

# {discipline}

{section_content}
"""
        
        # Write to the target file
        target_file = target_dir / f"{discipline.lower()}.md"
        with open(target_file, 'w') as f:
            f.write(page_content)
        print(f"  ✓ Updated {discipline}")
    
    return True

def update_talents(html_file):
    """Update talent skill pages."""
    config = CONTENT_MAPPINGS['talents']
    
    # Step 1: Convert HTML to markdown
    if not run_command(f"python html-to-md.py {html_file}", "Converting HTML to markdown"):
        return False
    
    # Step 2: Split the table by skill
    if not run_command(f"python {config['split_script']} {config['markdown_file']} {config['split_field']}", 
                      "Splitting talent table"):
        return False
    
    # Step 3: Update each skill page
    print(f"\n→ Updating skill talent pages...")
    target_dir = Path(config['target_dir'])
    split_tables_dir = Path('split-tables')
    
    for skill in config['sections']:
        # Read the split table file
        split_file = split_tables_dir / f"talents_{skill}.md"
        if not split_file.exists():
            print(f"  ✗ Warning: No split file found for {skill}")
            continue
        
        with open(split_file, 'r') as f:
            talent_content = f.read()
        
        # Build the full page content
        page_content = f"""---
sidebar_position: {config['sections'].index(skill) + 1}
---

# {skill}

{talent_content}
"""
        
        # Write to the target file
        target_file = target_dir / f"{skill.lower()}.md"
        with open(target_file, 'w') as f:
            f.write(page_content)
        print(f"  ✓ Updated {skill}")
    
    return True

def main():
    if len(sys.argv) < 3:
        print("Usage: python update-docs.py <content-type> <html-file>")
        print("\nAvailable content types:")
        for content_type in CONTENT_MAPPINGS.keys():
            print(f"  - {content_type}")
        sys.exit(1)
    
    content_type = sys.argv[1]
    html_file = sys.argv[2]
    
    if content_type not in CONTENT_MAPPINGS:
        print(f"Error: Unknown content type '{content_type}'")
        print(f"Available types: {', '.join(CONTENT_MAPPINGS.keys())}")
        sys.exit(1)
    
    if not os.path.exists(html_file):
        print(f"Error: HTML file not found: {html_file}")
        sys.exit(1)
    
    print(f"═══════════════════════════════════════════════════════")
    print(f"  Updating {content_type} documentation")
    print(f"═══════════════════════════════════════════════════════")
    
    # Call the appropriate update function
    if content_type == 'mystic-spells':
        success = update_mystic_spells(html_file)
    elif content_type == 'arcane-spells':
        success = update_arcane_spells(html_file)
    elif content_type == 'talents':
        success = update_talents(html_file)
    elif content_type == 'combat-arts':
        print("Combat arts update not yet implemented")
        success = False
    else:
        print(f"Error: Update function not implemented for {content_type}")
        success = False
    
    if success:
        print(f"\n✓ Documentation updated successfully!")
        print(f"\nNext steps:")
        print(f"  1. Review the changes in {CONTENT_MAPPINGS[content_type]['target_dir']}")
        print(f"  2. Run 'npm run build' to verify the build succeeds")
        print(f"  3. Commit the changes")
    else:
        print(f"\n✗ Documentation update failed")
        sys.exit(1)

if __name__ == '__main__':
    main()
