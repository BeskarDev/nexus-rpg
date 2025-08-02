#!/usr/bin/env python3
"""
Convert Markdown files to CSV format for importing into databases.
Enhanced to support all markdown table formats and preserve HTML for Notion CSV import.
"""

import os
import re
import csv
import argparse
from pathlib import Path

def sanitize_html_for_notion(text):
    """
    Sanitize and format HTML content for Notion CSV import.
    Converts markdown formatting to HTML tags that Notion recognizes.
    Preserves newlines and formatting for proper Notion display.
    """
    if not text:
        return ""
    
    # Clean up the text first
    text = text.strip()
    
    # Convert markdown bold (**text**) to HTML bold (<strong>text</strong>)
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    
    # Convert markdown italic (*text*) to HTML italic (<em>text</em>)  
    text = re.sub(r'\*(?!\*)(.*?)\*(?!\*)', r'<em>\1</em>', text)
    
    # Preserve existing <br/> and <br> tags
    text = re.sub(r'<br\s*/?>', '<br/>', text)
    
    # Convert line breaks to HTML breaks for Notion
    text = re.sub(r'\n+', '<br/>', text)
    
    # Clean up any double breaks
    text = re.sub(r'(<br/>){3,}', '<br/><br/>', text)
    
    return text

def parse_generic_table(markdown_content):
    """Parse any markdown table format generically."""
    tables = []
    
    # Split content by lines
    lines = markdown_content.strip().split('\n')
    
    current_table = None
    headers = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check if this is a table row (contains |)
        if '|' in line:
            # Remove leading/trailing pipes and split
            cells = [cell.strip() for cell in line.strip('|').split('|')]
            
            # Skip separator lines (contains only -, |, and spaces)
            if re.match(r'^[\s\-|:]+$', line):
                continue
                
            # If we don't have headers yet, this is the header row
            if headers is None:
                headers = cells
                current_table = {
                    'headers': headers,
                    'rows': []
                }
                continue
            
            # This is a data row
            if current_table and len(cells) == len(headers):
                # Create a row dict with sanitized HTML content
                row_dict = {}
                for i, cell in enumerate(cells):
                    if i < len(headers):
                        # Sanitize the content for Notion
                        sanitized_content = sanitize_html_for_notion(cell)
                        row_dict[headers[i]] = sanitized_content
                current_table['rows'].append(row_dict)
        else:
            # Non-table line, finish current table if exists
            if current_table and current_table['rows']:
                tables.append(current_table)
                current_table = None
                headers = None
    
    # Add the last table if exists
    if current_table and current_table['rows']:
        tables.append(current_table)
    
    return tables
def parse_mystic_spells(markdown_content):
    """Parse mystic spells from markdown content (legacy function for compatibility)."""
    tables = parse_generic_table(markdown_content)
    if tables:
        return tables[0]['rows']  # Return the first table's rows
    return []

def write_csv(data, output_file, headers=None):
    """Write data to CSV file."""
    if not data:
        print(f"No data found to write to {output_file}")
        return
    
    # If data is a list of tables, use the first table
    if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict) and 'headers' in data[0]:
        table = data[0]
        fieldnames = table['headers']
        rows = table['rows']
    else:
        # Legacy format - list of dictionaries
        rows = data
        if headers:
            fieldnames = headers
        elif rows:
            fieldnames = list(rows[0].keys())
        else:
            print(f"No data to write to {output_file}")
            return
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"Successfully wrote {len(rows)} rows to {output_file}")

def process_all_markdown_files(input_dir, output_dir):
    """Process all markdown files in the input directory."""
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    
    # Create output directory if it doesn't exist
    output_path.mkdir(parents=True, exist_ok=True)
    
    processed_files = []
    
    for md_file in input_path.glob("*.md"):
        print(f"Processing {md_file.name}...")
        
        # Read the markdown file
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse the content
        tables = parse_generic_table(content)
        
        if tables:
            for i, table in enumerate(tables):
                # Generate output filename
                base_name = md_file.stem
                if len(tables) > 1:
                    output_filename = f"{base_name}_table_{i+1}.csv"
                else:
                    output_filename = f"{base_name}.csv"
                
                output_file = output_path / output_filename
                
                # Write the CSV
                write_csv([table], output_file)
                processed_files.append(output_filename)
        else:
            print(f"No tables found in {md_file.name}")
    
    return processed_files

def main():
    parser = argparse.ArgumentParser(description='Convert markdown files to CSV format')
    parser.add_argument('input', help='Input markdown file or directory')
    parser.add_argument('output', help='Output CSV file or directory')
    parser.add_argument('--type', choices=['mystic-spells', 'generic', 'all'], default='generic',
                        help='Type of content to parse (default: generic)')
    parser.add_argument('--all-files', action='store_true',
                        help='Process all markdown files in input directory')
    
    args = parser.parse_args()
    
    input_path = Path(args.input)
    output_path = Path(args.output)
    
    if args.all_files or input_path.is_dir():
        # Process all markdown files in directory
        if not input_path.is_dir():
            print(f"Error: {input_path} is not a directory")
            return
        
        processed_files = process_all_markdown_files(input_path, output_path)
        print(f"\nProcessed {len(processed_files)} files:")
        for filename in processed_files:
            print(f"  - {filename}")
    else:
        # Process single file
        if not input_path.exists():
            print(f"Error: {input_path} does not exist")
            return
        
        # Read input file
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse content based on type
        if args.type == 'mystic-spells':
            data = parse_mystic_spells(content)
            # For backward compatibility, use the legacy format
            write_csv(data, output_path)
        else:  # generic
            tables = parse_generic_table(content)
            if tables:
                write_csv(tables, output_path)
            else:
                print(f"No tables found in {input_path}")

if __name__ == '__main__':
    main()