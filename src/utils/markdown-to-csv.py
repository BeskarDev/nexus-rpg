#!/usr/bin/env python3
"""
Convert Markdown files to CSV format for importing into databases.
"""

import os
import re
import csv
import argparse
from pathlib import Path

def parse_mystic_spells(markdown_content):
    """Parse mystic spells from markdown content."""
    spells = []
    
    # Split content by tradition sections
    tradition_pattern = r'^## (\w+)$'
    sections = re.split(tradition_pattern, markdown_content, flags=re.MULTILINE)
    
    # Skip the header (everything before first tradition)
    for i in range(1, len(sections), 2):
        tradition = sections[i]
        section_content = sections[i+1] if i+1 < len(sections) else ""
        
        # Find all spells in this tradition
        spell_pattern = r'### ([^\n]+)\n\n\*\*Rank\*\* \| \*\*Focus\*\* \| \*\*Target\*\* \| \*\*Range\*\* \| \*\*Properties\*\*\n---\|---\|---\|---\|---\n ([0-9]) \| ([0-9]+) \| ([^|]+) \| ([^|]+) \| ([^|\n]+)(?:\n\n\*\*Effect\*\* <br\/> (.+?)(?=\n\n(?:### |## |$)|$))?(?:\n\n> \*\*Heightened\*\* <br\/> (.+?)(?=\n\n(?:### |## |>|$)|$))?'
        
        matches = re.finditer(spell_pattern, section_content, re.DOTALL)
        
        for match in matches:
            name = match.group(1).strip()
            rank = match.group(2).strip()
            focus = match.group(3).strip()
            target = match.group(4).strip()
            range_val = match.group(5).strip()
            properties = match.group(6).strip()
            effect = match.group(7).strip() if match.group(7) else ""
            heightened = match.group(8).strip() if match.group(8) else "-"
            
            # Clean up effect text
            effect = re.sub(r'<br\/>', ' ', effect)
            effect = re.sub(r'\n+', ' ', effect)
            effect = effect.strip()
            
            # Clean up heightened text
            if heightened != "-":
                heightened = re.sub(r'<br\/>', ' ', heightened)
                heightened = re.sub(r'\n+', ' ', heightened)
                heightened = heightened.strip()
            
            spell = {
                'name': name,
                'tradition': tradition,
                'rank': rank,
                'focus': focus,
                'target': target,
                'range': range_val,
                'properties': properties,
                'effect': effect,
                'heightened': heightened
            }
            
            spells.append(spell)
    
    return spells

def write_csv(spells, output_file):
    """Write spells to CSV file."""
    if not spells:
        print(f"No spells found to write to {output_file}")
        return
    
    fieldnames = ['name', 'tradition', 'rank', 'focus', 'target', 'range', 'properties', 'effect', 'heightened']
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(spells)
    
    print(f"Successfully wrote {len(spells)} spells to {output_file}")

def main():
    parser = argparse.ArgumentParser(description='Convert markdown files to CSV format')
    parser.add_argument('input_file', help='Input markdown file')
    parser.add_argument('output_file', help='Output CSV file')
    parser.add_argument('--type', choices=['mystic-spells'], default='mystic-spells',
                        help='Type of content to parse (default: mystic-spells)')
    
    args = parser.parse_args()
    
    # Read input file
    with open(args.input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse content based on type
    if args.type == 'mystic-spells':
        data = parse_mystic_spells(content)
    else:
        raise ValueError(f"Unsupported content type: {args.type}")
    
    # Write CSV
    write_csv(data, args.output_file)

if __name__ == '__main__':
    main()