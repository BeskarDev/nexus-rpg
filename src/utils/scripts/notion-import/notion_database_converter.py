#!/usr/bin/env python3
"""
Notion database converter for Nexus RPG.
Converts Notion database CSV exports to split markdown files by category/section.
"""

import pandas as pd
from pathlib import Path
from typing import Dict, List, Optional
import sys
import os
import re

# Import fix_multiple_tags from parent directory
sys.path.append(str(Path(__file__).parent.parent))
try:
    from html_to_md import fix_multiple_tags
except ImportError:
    # Fallback implementation
    def fix_multiple_tags(text):
        """Fixes multiple occurrences of HTML tags in a string."""
        pattern = r"(<(?:strong|em)>)\1+"
        text = re.sub(pattern, r"\1", text)
        pattern = r"(</(?:strong|em)>)\1+"
        text = re.sub(pattern, r"\1", text)
        return text


class NotionDatabaseConverter:
    """Convert Notion database exports to markdown files."""
    
    def __init__(self):
        # Default section column names (can be overridden by split_by parameter)
        self.section_column_names = {
            'arcane-spells': 'Discipline',
            'mystic-spells': 'Tradition',
            'talents': 'Skill Requirement',
            'combat-arts': 'Category',
            'creatures': 'Tier'
        }
    
    def convert_csv_to_markdown(
        self,
        csv_file: Path,
        db_type: str,
        sections: List[str] = None,
        split_by: str = None
    ) -> Dict[str, str]:
        """
        Convert a Notion database CSV to markdown content grouped by section.
        
        Args:
            csv_file: Path to CSV file
            db_type: Type of database (arcane-spells, mystic-spells, talents, etc.)
            sections: Expected sections/categories
            split_by: Column name to split by (overrides default)
            
        Returns:
            Dictionary mapping section name to markdown content
        """
        # Read CSV
        df = pd.read_csv(csv_file)
        
        # Get the column name used for grouping
        section_column = split_by or self.section_column_names.get(db_type)
        
        if not section_column or section_column not in df.columns:
            # No grouping - return all content as single section
            markdown = self._dataframe_to_markdown(df, db_type)
            return {'all': markdown}
        
        # Group by section
        result = {}
        
        # For creatures, map Tier numbers to tier-N format
        if db_type == 'creatures' and section_column == 'Tier':
            for tier_num in sorted(df[section_column].unique()):
                section_df = df[df[section_column] == tier_num].copy()
                if not section_df.empty:
                    markdown = self._dataframe_to_markdown(section_df, db_type)
                    result[f'tier-{int(tier_num)}'] = markdown
        # For combat-arts, map Category to lowercase
        elif db_type == 'combat-arts' and section_column == 'Category':
            for category in df[section_column].unique():
                section_df = df[df[section_column] == category].copy()
                if not section_df.empty:
                    markdown = self._dataframe_to_markdown(section_df, db_type)
                    result[category.lower()] = markdown
        # Default: use sections as-is
        else:
            for section in sections or df[section_column].unique():
                section_df = df[df[section_column] == section].copy()
                if not section_df.empty:
                    markdown = self._dataframe_to_markdown(section_df, db_type)
                    result[section] = markdown
        
        return result
    
    def _dataframe_to_markdown(self, df: pd.DataFrame, db_type: str) -> str:
        """Convert dataframe to markdown format matching existing docs."""
        
        if db_type in ['arcane-spells', 'mystic-spells']:
            return self._format_spells(df)
        elif db_type == 'talents':
            return self._format_talents(df)
        elif db_type == 'combat-arts':
            return self._format_combat_arts(df)
        elif db_type == 'creatures':
            return self._format_creatures(df)
        else:
            # Fallback to generic table format
            return self._format_generic_table(df)
    
    def _format_spells(self, df: pd.DataFrame) -> str:
        """Format spells in the standard spell format."""
        spells = []
        
        # Sort by Rank, then by Name
        if 'Rank' in df.columns:
            df = df.sort_values(['Rank', 'Name'])
        
        for _, row in df.iterrows():
            spell = []
            
            # Spell name as header
            name = row.get('Name', 'Unnamed Spell')
            # Remove AAAAA prefix that Notion sometimes adds for sorting
            name = name.replace('AAAAA', '').strip()
            
            spell.append(f"### {name}\n")
            
            # Create the properties table
            props = []
            props.append("**Rank** | **Focus** | **Target** | **Range** | **Properties**")
            props.append("---|---|---|---|---")
            
            rank = str(row.get('Rank', '')).strip()
            focus = str(row.get('Focus', '')).strip()
            target = str(row.get('Target', '')).strip()
            spell_range = str(row.get('Range', '')).strip()
            properties = str(row.get('Properties', '-')).strip()
            
            if properties == '' or properties == 'nan':
                properties = '-'
            
            props.append(f" {rank} | {focus} | {target} | {spell_range} | {properties}")
            spell.append('\n'.join(props))
            
            # Effect
            effect = str(row.get('Effect', ''))
            if effect and effect != 'nan':
                effect = self._clean_html_formatting(effect)
                spell.append(f"\n**Effect** <br/> {effect}")
            
            # Heightened (if present)
            heightened = str(row.get('Heightened', ''))
            if heightened and heightened != 'nan' and heightened.strip():
                heightened = self._clean_html_formatting(heightened)
                spell.append(f"\n> **Heightened** <br/> {heightened}\n\n>")
            
            spell.append('\n')
            spells.append('\n'.join(spell))
        
        return '\n'.join(spells)
    
    def _format_talents(self, df: pd.DataFrame) -> str:
        """Format talents as a simple 2-column table (Name | Description)."""
        import re
        
        # Create table header
        rows = []
        rows.append("Name | Description")
        rows.append("--- | ---")
        
        # Sort by Name
        df = df.sort_values(['Name'])
        
        for _, row in df.iterrows():
            name = row.get('Name', 'Unnamed Talent')
            
            # Build description from Description field
            description = str(row.get('Description', ''))
            if description and description != 'nan':
                # Convert newlines to <br/><br/>
                description = description.replace('\n\n', '<br/><br/>')
                description = description.replace('\n', '<br/>')
                
                # Clean HTML formatting (but preserve already added br tags)
                description = self._clean_html_formatting(description)
                
                # Format rank sections with strong tags
                # Replace "(Rank N)" with "<strong>(Rank N)</strong>"
                description = re.sub(r'\(Rank (\d+)\)', r'<strong>(Rank \1)</strong>', description)
            else:
                description = ""
            
            # Add row (name bold, description with formatting)
            rows.append(f"**{name}** | {description}")
        
        return '\n'.join(rows)
    
    def _format_combat_arts(self, df: pd.DataFrame) -> str:
        """Format combat arts as a table with name, weapons, and effects."""
        lines = []
        
        # Add table header
        lines.append("| Name | Weapons | Effect |")
        lines.append("| ---- | ------- | ------ |")
        
        # Sort by name for consistent ordering
        df_sorted = df.sort_values('Name')
        
        for _, row in df_sorted.iterrows():
            name = row.get('Name', '')
            weapons = row.get('Weapons', '')
            effect = row.get('Effect', '')
            
            if not name:
                continue
            
            # Clean HTML formatting from effect
            if effect and effect != 'nan':
                effect = self._clean_html_formatting(str(effect))
            else:
                effect = ""
            
            # Escape pipe characters in content to avoid breaking the table
            name = str(name).replace('|', '\\|')
            weapons = str(weapons).replace('|', '\\|') if weapons and str(weapons) != 'nan' else ''
            effect = effect.replace('|', '\\|').replace('\n', ' ')
            
            lines.append(f"| {name} | {weapons} | {effect} |")
        
        return "\n".join(lines)
    
    def _format_creatures(self, df: pd.DataFrame) -> str:
        """Format creatures as markdown."""
        # For creatures, we typically want to keep them as a table
        # or format each as a stat block - for now, use table format
        return self._format_generic_table(df)
    
    def _format_generic_table(self, df: pd.DataFrame) -> str:
        """Format dataframe as a generic markdown table."""
        # Drop empty rows
        df = df.dropna(how='all')
        
        if df.empty:
            return ""
        
        # Reorder with Name column first if present
        if 'Name' in df.columns:
            cols = ['Name'] + [col for col in df.columns if col != 'Name']
            df = df[cols]
        
        # Create markdown table
        lines = []
        
        # Header
        lines.append(' | '.join(str(col) for col in df.columns))
        lines.append(' | '.join(['---' for _ in df.columns]))
        
        # Rows
        for _, row in df.iterrows():
            cells = []
            for val in row.values:
                if pd.isna(val):
                    cells.append('')
                else:
                    # Clean HTML formatting
                    cell_str = str(val)
                    cell_str = self._clean_html_formatting(cell_str)
                    cells.append(cell_str)
            lines.append(' | '.join(cells))
        
        return '\n'.join(lines) + '\n'
    
    def _clean_html_formatting(self, text: str) -> str:
        """Clean up HTML formatting in text content, preserving <strong>, <em>, <br/> tags."""
        if not text or text == 'nan':
            return ''
        
        # Convert to string
        text = str(text)
        
        # Fix multiple tags
        text = fix_multiple_tags(text)
        
        # Clean up common Notion HTML artifacts while preserving formatting tags
        text = text.replace('(<br/>', '(')
        text = text.replace('<strong><br/><br/></strong>', '')
        text = text.replace('<strong><br/>', '<br/><strong>')
        text = text.replace('<br/></strong>', '</strong>')
        text = text.replace('<em><br/><br/></em>', '')
        text = text.replace('<br/><br/><br/><br/><br/>', '<br/><br/>')
        text = text.replace('<br/><br/><br/><br/>', '<br/><br/>')
        text = text.replace('<br/><br/><br/>', '<br/><br/>')
        text = text.replace('<br/> <br/><br/>', '<br/><br/>')
        text = text.replace('<br/><br/><strong><br/>', '<br/><br/><strong>')
        text = text.replace('- <br/>', '- ')
        text = text.replace('<br/><strong>- </strong>', '- ')
        
        # Fix formatting around keywords (matching original script)
        text = text.replace('<br/><br/><strong>Weak.', '<br/><strong>Weak.')
        text = text.replace('<br/><br/><strong>Strong.', '<br/><strong>Strong.')
        text = text.replace('<br/><br/><strong>Critical.', '<br/><strong>Critical.')
        
        # Clean up whitespace
        text = text.replace('\xa0', ' ')
        text = text.strip()
        
        return text


def convert_database(
    csv_file: Path,
    db_type: str,
    sections: List[str] = None,
    split_by: str = None
) -> Dict[str, str]:
    """
    Convert a Notion database CSV export to markdown.
    
    Args:
        csv_file: Path to CSV file
        db_type: Database type
        sections: Expected sections
        split_by: Column name to split by (overrides default)
        
    Returns:
        Dictionary mapping section names to markdown content
    """
    converter = NotionDatabaseConverter()
    return converter.convert_csv_to_markdown(csv_file, db_type, sections, split_by)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python notion_database_converter.py <csv_file> <db_type> [sections...]")
        sys.exit(1)
    
    csv_file = Path(sys.argv[1])
    db_type = sys.argv[2]
    sections = sys.argv[3:] if len(sys.argv) > 3 else None
    
    if not csv_file.exists():
        print(f"Error: File not found: {csv_file}")
        sys.exit(1)
    
    result = convert_database(csv_file, db_type, sections)
    
    for section, markdown in result.items():
        print(f"\n{'='*60}")
        print(f"Section: {section}")
        print('='*60)
        print(markdown)
