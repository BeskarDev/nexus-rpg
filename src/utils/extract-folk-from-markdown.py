#!/usr/bin/env python3
"""
Script to extract Folk data from docs/02-adventurers/01-folk.md and generate JSON file.
Extracts folk name, abilities, languages, and cultural information.
"""

import json
import re
import os

def extract_folk_data(markdown_file_path):
    """Extract folk data from the markdown file."""
    
    with open(markdown_file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Split into sections for Old Folk and New Folk
    # Find the "## The Old Folk" and "## The New Folk" sections
    old_folk_match = re.search(r'## The Old Folk\n(.*?)(?=## The New Folk)', content, re.DOTALL)
    new_folk_match = re.search(r'## The New Folk\n(.*?)$', content, re.DOTALL)
    
    folk_data = []
    
    if old_folk_match:
        old_folk_content = old_folk_match.group(1)
        folk_data.extend(extract_folk_from_section(old_folk_content, "Old Folk"))
    
    if new_folk_match:
        new_folk_content = new_folk_match.group(1)
        folk_data.extend(extract_folk_from_section(new_folk_content, "New Folk"))
    
    return folk_data

def extract_folk_from_section(section_content, folk_category):
    """Extract individual folk entries from a section."""
    folk_list = []
    
    # Find all folk entries (they start with ### FolkName)
    folk_matches = re.finditer(r'### ([A-Za-z]+)\n\n(.*?)(?=### [A-Za-z]+|\Z)', section_content, re.DOTALL)
    
    for match in folk_matches:
        folk_name = match.group(1)
        folk_content = match.group(2)
        
        # Extract the quote (flavor text)
        quote_match = re.search(r'> "(.*?)"\n>', folk_content, re.DOTALL)
        quote = quote_match.group(1).strip() if quote_match else ""
        
        # Extract description paragraph
        description_match = re.search(r'!\[folk-img\].*?\n\n(.*?)(?=\*\*Known Cultures|\*\*Far Away Cultures|\*\*Size)', folk_content, re.DOTALL)
        description = description_match.group(1).strip() if description_match else ""
        
        # Extract known cultures
        known_cultures = extract_cultures(folk_content, "Known Cultures")
        
        # Extract far away cultures  
        far_away_cultures = extract_cultures(folk_content, "Far Away Cultures")
        
        # Extract abilities (lines starting with ** that aren't Size, Age, Known Cultures, etc.)
        abilities = extract_abilities(folk_content)
        
        # Extract languages from abilities or description
        languages = extract_languages(folk_content, description)
        
        folk_entry = {
            "name": folk_name,
            "category": folk_category,
            "quote": quote,
            "description": description,
            "known_cultures": known_cultures,
            "far_away_cultures": far_away_cultures,
            "abilities": abilities,
            "languages": languages
        }
        
        folk_list.append(folk_entry)
    
    return folk_list

def extract_cultures(content, culture_type):
    """Extract culture information."""
    cultures = []
    pattern = rf'\*\*{culture_type}:\*\*\s*\n\n((?:- \*\*.*?\n)*)'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        cultures_text = match.group(1)
        # Extract culture entries (lines starting with -)
        culture_matches = re.finditer(r'- \*\*([^*()]+)\s*\([^)]+\)\*\*:\s*([^\n]+)', cultures_text)
        for culture_match in culture_matches:
            culture_name = culture_match.group(1).strip()
            culture_desc = culture_match.group(2).strip()
            cultures.append({
                "name": culture_name,
                "description": culture_desc
            })
    
    return cultures

def extract_abilities(content):
    """Extract folk abilities."""
    abilities = []
    
    # Find ability entries (lines starting with ** that are ability names)
    ability_patterns = [
        r'\*\*([^*\n]+)\.\*\* ([^\n]+(?:\n(?!- |\*\*)[^\n]*)*)',
    ]
    
    for pattern in ability_patterns:
        matches = re.finditer(pattern, content)
        for match in matches:
            ability_name = match.group(1).strip()
            ability_desc = match.group(2).strip()
            
            # Skip if this looks like metadata (Size, Age, Known Cultures, etc.)
            if ability_name in ['Size', 'Age', 'Known Cultures', 'Far Away Cultures']:
                continue
            
            abilities.append({
                "name": ability_name,
                "description": ability_desc
            })
    
    return abilities

def extract_languages(content, description):
    """Extract language information from content and description."""
    languages = []
    
    # Look for common trade tongue mention
    if "common trade tongue" in content.lower() or "tradespeak" in content.lower():
        languages.append("Tradespeak")
    
    # Look for folk-specific languages
    folk_languages = {
        "Dwarf": "Dwarven", 
        "Elf": "Elvish",
        "Gnome": "Gnomish", 
        "Hune": "Giant",
        "Orc": "Orcish",
        "Goblin": "Goblin",
        "Human": "Human Dialect",
        "Catfolk": "Catfolk",
        "Lionfolk": "Catfolk", 
        "Lizardfolk": "Lizardfolk",
        "Minotaur": "Giant"
    }
    
    # Try to match folk name to language
    for folk, lang in folk_languages.items():
        if folk.lower() in content.lower():
            if lang not in languages:
                languages.append(lang)
            break
    
    return languages

def main():
    # Get current working directory
    current_dir = os.getcwd()
    
    # Path to the folk markdown file
    markdown_file = os.path.join(current_dir, "docs", "02-adventurers", "01-folk.md")
    
    if not os.path.exists(markdown_file):
        print(f"Error: File not found: {markdown_file}")
        return
    
    # Extract folk data
    folk_data = extract_folk_data(markdown_file)
    
    # Create output directory
    output_dir = os.path.join(current_dir, "src", "utils", "json")
    os.makedirs(output_dir, exist_ok=True)
    
    # Output path
    output_file = os.path.join(output_dir, "folk.json")
    
    # Write JSON data
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(folk_data, f, indent=2, ensure_ascii=False)
    
    print(f"Successfully extracted {len(folk_data)} folk entries to {output_file}")
    
    # Print summary
    for folk in folk_data:
        print(f"- {folk['name']} ({folk['category']}) - {len(folk['abilities'])} abilities, {len(folk['languages'])} languages")

if __name__ == "__main__":
    main()