#!/usr/bin/env python3
"""
Update documentation pages from split-tables/ directory.
Reads transformed content and updates corresponding pages in docs/
"""

import os
import sys
from pathlib import Path
import re

# Define mappings from split-tables files to docs directories
CONTENT_MAPPINGS = {
    'mystic-spells': {
        'source_file': 'split-tables/mystic-spells.md',
        'target_dir': '../../docs/07-magic/04-mystic-spells',
        'sections': ['Light', 'Twilight', 'Life', 'Death', 'Nature', 'Tempest', 'Peace', 'War']
    },
    'arcane-spells': {
        'source_file': 'split-tables/arcane-spells.md',
        'target_dir': '../../docs/07-magic/02-arcane-spells',
        'sections': ['Evocation', 'Illusion', 'Conjuration', 'Telepathy', 'Telekinetics', 'Necromancy']
    },
    'talents': {
        'source_file': 'split-tables/talents.md',
        'target_dir': '../../docs/03-statistics/06-talents',
        'sections': ['Arcana', 'Archery', 'Athletics', 'Crafting', 'Education', 'Fighting', 
                    'Fortitude', 'Influence', 'Insight', 'Lore', 'Mysticism', 'Nature',
                    'Perception', 'Stealth', 'Streetwise', 'Survival']
    }
}

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

def read_existing_frontmatter(file_path):
    """Read existing frontmatter from a file if it exists."""
    if not os.path.exists(file_path):
        return None
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Check if file starts with frontmatter
    if not content.startswith('---\n'):
        return None
    
    # Find end of frontmatter
    end_index = content.find('\n---\n', 4)
    if end_index == -1:
        return None
    
    return content[0:end_index+5]  # Include the closing ---\n

def update_content_type(content_type, config):
    """Update all pages for a specific content type."""
    source_file = Path(config['source_file'])
    
    if not source_file.exists():
        print(f"  ⚠ Warning: Source file not found: {source_file}")
        return False
    
    with open(source_file, 'r') as f:
        transformed_content = f.read()
    
    target_dir = Path(config['target_dir'])
    if not target_dir.exists():
        print(f"  ⚠ Warning: Target directory not found: {target_dir}")
        return False
    
    updated_count = 0
    for section in config['sections']:
        section_content = extract_section_content(transformed_content, section)
        if section_content is None:
            print(f"  ⚠ Warning: No content found for {section}")
            continue
        
        # Determine target file
        target_file = target_dir / f"{section.lower()}.md"
        
        # Read existing frontmatter if file exists
        frontmatter = read_existing_frontmatter(target_file)
        
        if frontmatter:
            # Preserve existing frontmatter
            page_content = f"{frontmatter}\n# {section}\n\n{section_content}\n"
        else:
            # Create new frontmatter with position
            position = config['sections'].index(section) + 1
            page_content = f"""---
sidebar_position: {position}
---

# {section}

{section_content}
"""
        
        # Write to the target file
        with open(target_file, 'w') as f:
            f.write(page_content)
        
        updated_count += 1
        print(f"  ✓ Updated {section}")
    
    return updated_count > 0

def main():
    print("\n" + "="*60)
    print("  Updating documentation pages from split-tables/")
    print("="*60 + "\n")
    
    success_count = 0
    total_count = len(CONTENT_MAPPINGS)
    
    for content_type, config in CONTENT_MAPPINGS.items():
        print(f"→ Updating {content_type}...")
        if update_content_type(content_type, config):
            success_count += 1
        print()
    
    print("="*60)
    if success_count == total_count:
        print(f"✓ Successfully updated all {total_count} content types!")
    else:
        print(f"⚠ Updated {success_count}/{total_count} content types")
    print("="*60 + "\n")
    
    return 0 if success_count == total_count else 1

if __name__ == '__main__':
    sys.exit(main())
