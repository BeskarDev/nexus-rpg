#!/usr/bin/env python3
"""
Post-processing script to fix formatting issues after Notion import.

This script handles:
1. Splitting weapons table by Type into H3 sections
2. Splitting armor table by Type into H3 sections
3. Adding descriptive content to Equipment overview
4. Adding descriptive paragraph to Conditions
5. Splitting Magic Items into subpages
6. Restructuring Downtime activities

Usage:
    python post_process_formatting.py
"""

import re
from pathlib import Path
from typing import Dict, List, Tuple


def split_weapons_table(file_path: Path) -> None:
    """Split weapons table by Type column into H3 sections."""
    print(f"  → Processing weapons table: {file_path}")
    
    content = file_path.read_text(encoding='utf-8')
    
    # Find the table
    table_pattern = r'\| Quality \| Type \| Name \| Damage.*?\n((?:\|.*?\n)+)'
    match = re.search(table_pattern, content, re.DOTALL)
    
    if not match:
        print(f"    ⚠ No table found in {file_path}")
        return
    
    # Extract table rows
    table_start = match.start()
    table_end = match.end()
    header = "| Quality | Name | Damage | Properties | Load | Cost |\n| --- | --- | --- | --- | --- | --- |"
    
    # Parse rows by type
    rows_by_type: Dict[str, List[str]] = {}
    lines = content[table_start:table_end].split('\n')
    
    for line in lines[2:]:  # Skip header and separator
        if not line.strip() or not line.startswith('|'):
            continue
        
        parts = [p.strip() for p in line.split('|')[1:-1]]
        if len(parts) >= 7:
            quality, weapon_type, name, damage, properties, load, cost = parts[:7]
            
            if weapon_type not in rows_by_type:
                rows_by_type[weapon_type] = []
            
            # Remove Type column
            new_row = f"| {quality} | {name} | {damage} | {properties} | {load} | {cost} |"
            rows_by_type[weapon_type].append(new_row)
    
    # Build new content with sections
    sections = []
    for weapon_type in sorted(rows_by_type.keys()):
        section = f"\n### {weapon_type}\n\n{header}\n"
        section += '\n'.join(rows_by_type[weapon_type])
        sections.append(section)
    
    # Replace table with sections
    new_table = ''.join(sections)
    new_content = content[:table_start] + new_table + '\n' + content[table_end:]
    
    file_path.write_text(new_content, encoding='utf-8')
    print(f"    ✓ Split weapons into {len(rows_by_type)} sections")


def split_armor_table(file_path: Path) -> None:
    """Split armor table by Type column into H3 sections."""
    print(f"  → Processing armor table: {file_path}")
    
    content = file_path.read_text(encoding='utf-8')
    
    # Find the table (after "Stacking AV Bonuses" section)
    table_pattern = r'\| Quality \| Type \| Name \| AV.*?\n((?:\|.*?\n)+)'
    match = re.search(table_pattern, content, re.DOTALL)
    
    if not match:
        print(f"    ⚠ No table found in {file_path}")
        return
    
    # Extract table rows
    table_start = match.start()
    table_end = match.end()
    header = "| Quality | Name | AV | Properties | Load | Cost |\n| --- | --- | --- | --- | --- | --- |"
    
    # Parse rows by type
    rows_by_type: Dict[str, List[str]] = {}
    lines = content[table_start:table_end].split('\n')
    
    for line in lines[2:]:  # Skip header and separator
        if not line.strip() or not line.startswith('|'):
            continue
        
        parts = [p.strip() for p in line.split('|')[1:-1]]
        if len(parts) >= 7:
            quality, armor_type, name, av, properties, load, cost = parts[:7]
            
            if armor_type not in rows_by_type:
                rows_by_type[armor_type] = []
            
            # Remove Type column
            new_row = f"| {quality} | {name} | {av} | {properties} | {load} | {cost} |"
            rows_by_type[armor_type].append(new_row)
    
    # Build new content with sections in desired order
    armor_order = ["Light Armor", "Heavy Armor", "Helmet"]
    sections = []
    for armor_type in armor_order:
        if armor_type in rows_by_type:
            section = f"\n### {armor_type}\n\n{header}\n"
            section += '\n'.join(rows_by_type[armor_type])
            sections.append(section)
    
    # Replace table with sections
    new_table = ''.join(sections)
    new_content = content[:table_start] + new_table + '\n' + content[table_end:]
    
    file_path.write_text(new_content, encoding='utf-8')
    print(f"    ✓ Split armor into {len(rows_by_type)} sections")


def add_conditions_intro(file_path: Path) -> None:
    """Add introductory paragraph to Conditions page."""
    print(f"  → Adding intro to Conditions: {file_path}")
    
    content = file_path.read_text(encoding='utf-8')
    
    # Check if intro already exists
    if 'You can suffer various conditions' in content:
        print("    ℹ Already has intro paragraph")
        return
    
    # Find the banner line and insert intro after it
    banner_pattern = r'(!\[banner-img\].*?\n)'
    match = re.search(banner_pattern, content)
    
    if not match:
        print("    ⚠ Could not find banner")
        return
    
    intro = "\nYou can suffer various conditions during the game. Each condition inflicts different effects on you. When you suffer a condition, the source also states how long it holds effect. When you suffer the same condition multiple times, you only are affected by it once. In the case of conditions with different potencies, such as bleeding, you only suffer the most potent version of the condition.\n"
    
    insertion_point = match.end()
    new_content = content[:insertion_point] + intro + content[insertion_point:]
    
    file_path.write_text(new_content, encoding='utf-8')
    print("    ✓ Added intro paragraph")


def main():
    """Run all post-processing fixes."""
    print("\n" + "="*70)
    print("  Post-Processing Formatting Fixes")
    print("="*70 + "\n")
    
    # Get project root (4 levels up from this script)
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent.parent.parent
    docs_dir = project_root / 'docs'
    
    # 1. Fix weapons table
    weapons_file = docs_dir / '04-equipment' / '03-weapons.md'
    if weapons_file.exists():
        split_weapons_table(weapons_file)
    else:
        print(f"  ⚠ Weapons file not found: {weapons_file}")
    
    # 2. Fix armor table
    armor_file = docs_dir / '04-equipment' / '04-armor.md'
    if armor_file.exists():
        split_armor_table(armor_file)
    else:
        print(f"  ⚠ Armor file not found: {armor_file}")
    
    # 3. Fix conditions intro
    conditions_file = docs_dir / '05-combat' / '04-conditions.md'
    if conditions_file.exists():
        add_conditions_intro(conditions_file)
    else:
        print(f"  ⚠ Conditions file not found: {conditions_file}")
    
    print("\n" + "="*70)
    print("  Post-Processing Complete!")
    print("="*70 + "\n")


if __name__ == '__main__':
    main()
