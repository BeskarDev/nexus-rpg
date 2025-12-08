#!/usr/bin/env python3
"""
Notion Import Orchestrator for Nexus RPG.
Main script to automate importing Notion HTML exports into the docs directory.

Usage:
    python import_notion.py <path_to_zip_file>
    
Example:
    python import_notion.py ../../input/notion-export.zip
"""

import sys
import json
import zipfile
import tempfile
import shutil
import subprocess
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import re
from datetime import datetime

from notion_html_converter import convert_html_to_markdown
from notion_database_converter import convert_database


class NotionImporter:
    """Main orchestrator for importing Notion exports."""
    
    def __init__(self, config_path: Path):
        """Initialize with configuration file."""
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        
        self.stats = {
            'pages_updated': 0,
            'pages_skipped': 0,
            'databases_updated': 0,
            'sections_updated': 0,
            'errors': []
        }
        
        # Project root is 4 levels up from src/utils/scripts/notion-import
        self.project_root = config_path.parent.parent.parent.parent.parent
        
    def import_from_zip(self, zip_path: Path) -> bool:
        """
        Import all content from a Notion HTML export ZIP file.
        
        Args:
            zip_path: Path to the ZIP file
            
        Returns:
            True if successful, False otherwise
        """
        print(f"\n{'='*70}")
        print(f"  Notion Import for Nexus RPG")
        print(f"{'='*70}\n")
        print(f"Starting import from: {zip_path}")
        print(f"Project root: {self.project_root}\n")
        
        # Extract ZIP to temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)
            
            print(f"→ Extracting ZIP file...")
            try:
                self._extract_nested_zip(zip_path, temp_path)
            except Exception as e:
                self.stats['errors'].append(f"Failed to extract ZIP: {e}")
                print(f"  ✗ Error: {e}")
                return False
            
            # Find the main Notion export directory
            export_dir = self._find_export_dir(temp_path)
            if not export_dir:
                self.stats['errors'].append("Could not find Notion export directory")
                print(f"  ✗ Error: Could not find Notion export directory")
                return False
            
            print(f"  ✓ Found export directory: {export_dir.name}\n")
            
            # Process pages
            print(f"→ Processing pages...")
            self._process_pages(export_dir)
            print()
            
            # Process databases via existing conversion pipeline
            pipeline_ran = self._process_databases_via_pipeline(export_dir)
            
            # Process remaining databases (CSV to docs)
            print(f"→ Processing databases...")
            self._process_databases(export_dir)
            print()
        
        # Print summary
        self._print_summary()
        
        return len(self.stats['errors']) == 0
    
    def _extract_nested_zip(self, zip_path: Path, extract_to: Path):
        """Extract ZIP file, handling nested ZIPs."""
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_to)
        
        # Check for nested ZIP files
        for item in extract_to.iterdir():
            if item.is_file() and item.suffix == '.zip':
                nested_dir = extract_to / item.stem
                nested_dir.mkdir(exist_ok=True)
                with zipfile.ZipFile(item, 'r') as nested_zip:
                    nested_zip.extractall(nested_dir)
                # Move contents up one level
                for nested_item in nested_dir.iterdir():
                    shutil.move(str(nested_item), str(extract_to))
                nested_dir.rmdir()
                item.unlink()
    
    def _find_export_dir(self, temp_path: Path) -> Optional[Path]:
        """Find the main Notion export directory."""
        # Look for a directory containing HTML files
        for item in temp_path.rglob('*'):
            if item.is_dir() and list(item.glob('*.html')):
                return item
        return None
    
    def _process_pages(self, export_dir: Path):
        """Process regular HTML pages."""
        page_mappings = self.config['mappings']['pages']
        ignore_patterns = self.config.get('ignore_patterns', [])
        
        for page_prefix, mapping in page_mappings.items():
            # Find matching HTML file by prefix (handles dynamic hashcodes)
            html_files = list(export_dir.glob(f"{page_prefix}*.html"))
            
            if not html_files:
                print(f"  ⚠ Page not found: {page_prefix}")
                self.stats['pages_skipped'] += 1
                continue
            
            html_file = html_files[0]
            
            # Check ignore patterns
            if self._should_ignore(html_file.name, ignore_patterns):
                print(f"  ⊘ Skipping (ignored): {html_file.name}")
                self.stats['pages_skipped'] += 1
                continue
            
            try:
                # Convert HTML to Markdown
                title = mapping.get('title', '')
                markdown = convert_html_to_markdown(html_file, title)
                
                # Get target file path
                target_path = self.project_root / mapping['target']
                
                # Read existing file to preserve structure
                existing_content = self._read_existing_structure(target_path)
                
                # Extract sections to separate files if configured
                extract_sections = mapping.get('extract_sections', [])
                if extract_sections:
                    markdown = self._extract_sections_to_files(markdown, extract_sections)
                
                # Replace sections with reference links if configured
                replace_sections = mapping.get('replace_sections', [])
                if replace_sections:
                    markdown = self._replace_sections_with_links(markdown, replace_sections)
                
                # Create full content preserving Docusaurus structure
                content = self._create_page_content(
                    markdown, 
                    title, 
                    existing_content,
                    mapping.get('banner'),
                    mapping.get('preserve_sections')
                )
                
                # Write to target file
                target_path.parent.mkdir(parents=True, exist_ok=True)
                with open(target_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"  ✓ Updated: {mapping['target']}")
                self.stats['pages_updated'] += 1
                
            except Exception as e:
                error_msg = f"Failed to process page {html_file.name}: {e}"
                self.stats['errors'].append(error_msg)
                print(f"  ✗ Error: {error_msg}")
    
    def _process_overview_page(self, export_dir: Path, db_prefix: str, overview_config: dict):
        """Process overview HTML page for database sections."""
        # Find matching HTML file for overview
        html_files = list(export_dir.glob(f"{db_prefix}*.html"))
        
        if not html_files:
            return
        
        html_file = html_files[0]
        
        try:
            # Convert HTML to Markdown
            title = overview_config.get('title', db_prefix)
            markdown = convert_html_to_markdown(html_file, title)
            
            # Get target file
            target_path = self.project_root / overview_config['target']
            
            # Read existing structure
            existing_structure = self._read_existing_structure(target_path)
            
            # Create page content preserving structure
            final_content = self._create_page_content(
                markdown,
                title,
                existing_structure,
                None  # No banner for overview pages
            )
            
            # Write to file
            target_path.parent.mkdir(parents=True, exist_ok=True)
            with open(target_path, 'w', encoding='utf-8') as f:
                f.write(final_content)
            
            print(f"  ✓ Updated: {target_path.relative_to(self.project_root)}")
            self.stats['pages_updated'] += 1
            
        except Exception as e:
            error_msg = f"Failed to process overview page {html_file.name}: {e}"
            self.stats['errors'].append(error_msg)
            print(f"  ✗ Error: {error_msg}")
    
    def _process_databases(self, export_dir: Path):
        """Process Notion database exports (CSV files)."""
        db_mappings = self.config['mappings']['databases']
        
        for db_prefix, mapping in db_mappings.items():
            # Find matching CSV file by prefix (handles dynamic hashcodes)
            csv_files = list(export_dir.rglob(f"*{db_prefix}*.csv"))
            
            if not csv_files:
                print(f"  ⚠ Database not found: {db_prefix}")
                continue
            
            csv_file = csv_files[0]
            
            try:
                # Process overview HTML page if specified
                overview_page = mapping.get('overview_page')
                if overview_page:
                    self._process_overview_page(export_dir, db_prefix, overview_page)
                
                # Convert database to markdown sections
                db_type = mapping['type']
                sections = mapping.get('sections', [])
                split_by = mapping.get('split_by')  # Get split_by parameter
                
                section_contents = convert_database(csv_file, db_type, sections, split_by)
                
                # Write each section to its target file
                target_dir = self.project_root / mapping['target_dir']
                target_dir.mkdir(parents=True, exist_ok=True)
                
                for section_name, markdown_content in section_contents.items():
                    if not markdown_content.strip():
                        continue
                    
                    # Determine filename
                    if section_name == 'all':
                        filename = f"{db_type}.md"
                    else:
                        filename = f"{section_name.lower().replace(' ', '-')}.md"
                    
                    target_file = target_dir / filename
                    
                    # Read existing frontmatter
                    frontmatter = self._read_frontmatter(target_file)
                    
                    # Create full content
                    if frontmatter:
                        # Preserve existing frontmatter and add section title
                        content = f"{frontmatter}\n# {section_name.title()}\n\n{markdown_content}"
                    else:
                        # Create new frontmatter
                        if sections and section_name in sections:
                            position = sections.index(section_name) + 1
                        else:
                            position = 1
                        
                        content = f"""---
sidebar_position: {position}
---

# {section_name.title()}

{markdown_content}
"""
                    
                    # Write to file
                    with open(target_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    print(f"  ✓ Updated: {target_file.relative_to(self.project_root)}")
                    self.stats['sections_updated'] += 1
                
                self.stats['databases_updated'] += 1
                
            except Exception as e:
                error_msg = f"Failed to process database {csv_file.name}: {e}"
                self.stats['errors'].append(error_msg)
                print(f"  ✗ Error: {error_msg}")
    
    def _should_ignore(self, filename: str, ignore_patterns: List[str]) -> bool:
        """Check if filename matches any ignore pattern."""
        for pattern in ignore_patterns:
            # Convert glob pattern to regex
            regex_pattern = pattern.replace('*', '.*')
            if re.search(regex_pattern, filename, re.IGNORECASE):
                return True
        return False
    
    def _read_frontmatter(self, file_path: Path) -> Optional[str]:
        """Read existing frontmatter from a markdown file."""
        if not file_path.exists():
            return None
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if file starts with frontmatter
            if not content.startswith('---\n'):
                return None
            
            # Find end of frontmatter
            end_index = content.find('\n---\n', 4)
            if end_index == -1:
                return None
            
            return content[0:end_index+5]  # Include closing ---\n
        
        except Exception:
            return None
    
    def _read_existing_structure(self, file_path: Path) -> Dict[str, any]:
        """Read existing file structure including frontmatter, imports, banner, etc."""
        structure = {
            'frontmatter': None,
            'imports': [],
            'banner': None,
            'title': None,
            'is_mdx': file_path.suffix == '.mdx'
        }
        
        if not file_path.exists():
            return structure
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            lines = content.split('\n')
            i = 0
            
            # Parse frontmatter
            if lines[i].startswith('---'):
                i += 1
                frontmatter_lines = ['---']
                while i < len(lines) and not lines[i].startswith('---'):
                    frontmatter_lines.append(lines[i])
                    i += 1
                if i < len(lines):
                    frontmatter_lines.append('---')
                    i += 1
                structure['frontmatter'] = '\n'.join(frontmatter_lines)
            
            # Parse imports (for MDX files)
            while i < len(lines) and (lines[i].startswith('import ') or lines[i].strip() == ''):
                if lines[i].startswith('import '):
                    structure['imports'].append(lines[i])
                i += 1
            
            # Parse title
            while i < len(lines):
                line = lines[i].strip()
                if line.startswith('# '):
                    structure['title'] = line
                    i += 1
                    break
                i += 1
            
            # Parse banner
            if i < len(lines) and lines[i].strip().startswith('![') and 'banner' in lines[i].lower():
                structure['banner'] = lines[i].strip()
            
        except Exception:
            pass
        
        return structure
    
    def _create_page_content(
        self, 
        markdown: str, 
        title: str,
        existing_structure: Dict,
        banner_path: Optional[str] = None,
        preserve_sections: Optional[List[Dict]] = None
    ) -> str:
        """Create page content preserving Docusaurus structure."""
        parts = []
        
        # Add frontmatter
        if existing_structure['frontmatter']:
            parts.append(existing_structure['frontmatter'])
        else:
            parts.append('---\nsidebar_position: 1\n---')
        
        parts.append('')
        
        # Add imports for MDX files
        if existing_structure['is_mdx'] and existing_structure['imports']:
            parts.extend(existing_structure['imports'])
            parts.append('')
        
        # Add title (avoid duplicates from Notion conversion)
        if title:
            parts.append(f"# {title}")
            parts.append('')
        
        # Add banner
        if banner_path:
            parts.append(f"![banner-img]({banner_path})")
            parts.append('')
        elif existing_structure['banner']:
            parts.append(existing_structure['banner'])
            parts.append('')
        
        # Add markdown content, but skip if it starts with duplicate title
        markdown_lines = markdown.strip().split('\n')
        start_idx = 0
        
        # Skip duplicate title (only H1) and banner from Notion conversion
        skip_next_empty = False
        title_skipped = False
        for idx, line in enumerate(markdown_lines):
            stripped = line.strip()
            # Skip only the first H1 that is a duplicate of the title and banner images
            if not title_skipped and (re.match(r'^#\s', stripped) or stripped.startswith('![')):
                skip_next_empty = True
                if re.match(r'^#\s', stripped):
                    title_skipped = True
                continue
            # Skip empty lines immediately after title/banner
            if skip_next_empty and not stripped:
                skip_next_empty = False
                continue
            # Found actual content
            if stripped:
                start_idx = idx
                break
        
        # Add the cleaned markdown with preserved sections
        cleaned_markdown = '\n'.join(markdown_lines[start_idx:]).strip()
        
        # Insert preserved component sections if specified
        if preserve_sections:
            cleaned_markdown = self._inject_preserved_sections(cleaned_markdown, preserve_sections)
        
        parts.append(cleaned_markdown)
        
        return '\n'.join(parts) + '\n'
    
    def _inject_preserved_sections(self, markdown: str, preserve_sections: List[Dict]) -> str:
        """Inject React component sections after their marker headings."""
        lines = markdown.split('\n')
        result_lines = []
        i = 0
        
        while i < len(lines):
            line = lines[i]
            result_lines.append(line)
            
            # Check if this line matches any preserve marker
            for section in preserve_sections:
                marker = section.get('marker', '')
                component = section.get('component', '')
                
                if line.strip() == marker.strip():
                    # Add blank line, component, and another blank line
                    result_lines.append('')
                    result_lines.append(component)
                    result_lines.append('')
                    break
            
            i += 1
        
        return '\n'.join(result_lines)
    
    def _extract_sections_to_files(self, markdown: str, extract_sections: List[Dict]) -> str:
        """Extract sections to separate files and replace with reference links."""
        lines = markdown.split('\n')
        
        for section_config in extract_sections:
            start_marker = section_config.get('start_marker', '')
            end_marker = section_config.get('end_marker', '')
            target_file = section_config.get('target', '')
            title = section_config.get('title', '')
            sidebar_position = section_config.get('sidebar_position', 1)
            replacement = section_config.get('replacement', '')
            
            # Find the section boundaries
            start_idx = None
            end_idx = None
            
            for i, line in enumerate(lines):
                if start_marker and line.strip() == start_marker.strip():
                    start_idx = i
                if end_marker and line.strip().startswith(end_marker.strip()):
                    end_idx = i
                    break
            
            if start_idx is None:
                continue
            
            # If no end marker found, extract to end of document
            if end_idx is None:
                end_idx = len(lines)
            
            # Extract the section content
            section_lines = lines[start_idx:end_idx]
            section_content = '\n'.join(section_lines).strip()
            
            # Create the extracted file
            target_path = self.project_root / target_file
            target_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Create frontmatter and content for extracted file
            extracted_content = f"""---
sidebar_position: {sidebar_position}
---

{section_content}
"""
            
            with open(target_path, 'w', encoding='utf-8') as f:
                f.write(extracted_content)
            
            print(f"  ✓ Extracted: {target_file}")
            self.stats['sections_updated'] += 1
            
            # Replace the section with a reference link
            # Keep the start marker (heading) and replace everything else with the link
            lines[start_idx] = f"{start_marker}\n\n{replacement}"
            # Remove the extracted content lines
            del lines[start_idx + 1:end_idx]
        
        return '\n'.join(lines)
    
    def _replace_sections_with_links(self, markdown: str, replace_sections: List[Dict]) -> str:
        """Replace sections with reference links without creating files."""
        lines = markdown.split('\n')
        
        for section_config in replace_sections:
            start_marker = section_config.get('start_marker', '')
            end_marker = section_config.get('end_marker', '')
            replacement = section_config.get('replacement', '')
            
            # Find the section boundaries
            start_idx = None
            end_idx = None
            
            for i, line in enumerate(lines):
                if start_marker and line.strip() == start_marker.strip():
                    start_idx = i
                if end_marker and line.strip().startswith(end_marker.strip()):
                    end_idx = i
                    break
            
            if start_idx is None:
                continue
            
            # If no end marker found, skip this section
            if end_idx is None:
                end_idx = len(lines)
            
            # Replace the section with just the heading and reference link
            lines[start_idx] = f"{start_marker}\n\n{replacement}"
            # Remove the content lines
            del lines[start_idx + 1:end_idx]
        
        return '\n'.join(lines)
    
    def _process_databases_via_pipeline(self, export_dir: Path) -> bool:
        """Extract database HTMLs, run through conversion pipeline, update docs."""
        db_names = self.config.get('databases_via_pipeline', [])
        ignore_patterns = self.config.get('ignore_patterns', [])
        
        if not db_names:
            return False
        
        print(f"→ Processing databases via conversion pipeline...")
        
        utils_dir = self.project_root / 'src' / 'utils'
        input_dir = utils_dir / 'input'
        input_dir.mkdir(parents=True, exist_ok=True)
        
        # Step 1: Copy database HTML files to input/ directory
        copied_count = 0
        for db_name in db_names:
            # Find the main database HTML file
            html_files = list(export_dir.glob(f"{db_name}*.html"))
            html_files = [f for f in html_files if not self._should_ignore(f.name, ignore_patterns)]
            
            if not html_files:
                print(f"  ⚠ Database HTML not found: {db_name}")
                continue
            
            html_file = html_files[0]
            target_file = input_dir / f"{db_name.lower().replace(' ', '-')}.html"
            
            try:
                shutil.copy2(html_file, target_file)
                print(f"  ✓ Extracted: {db_name}")
                copied_count += 1
            except Exception as e:
                error_msg = f"Failed to extract {db_name}: {e}"
                self.stats['errors'].append(error_msg)
                print(f"  ✗ Error: {error_msg}")
        
        if copied_count == 0:
            print()
            return False
        
        print()
        
        # Step 2: Run the existing conversion pipeline
        print(f"→ Running conversion pipeline...")
        try:
            # Run html-to-md.py on input directory
            print(f"  → Converting HTML to markdown...")
            result = subprocess.run(
                ['python3', 'scripts/converters/html-to-md.py', 'data/input'],
                capture_output=True,
                text=True,
                cwd=utils_dir
            )
            if result.returncode != 0:
                error_msg = f"html-to-md.py failed: {result.stderr}"
                self.stats['errors'].append(error_msg)
                print(f"  ✗ {error_msg}")
                return False
            
            # Run split-tables.py
            print(f"  → Splitting tables...")
            result = subprocess.run(
                ['python3', 'scripts/transformers/split-tables.py'],
                capture_output=True,
                text=True,
                cwd=utils_dir
            )
            if result.returncode != 0:
                error_msg = f"split-tables.py failed: {result.stderr}"
                self.stats['errors'].append(error_msg)
                print(f"  ✗ {error_msg}")
                return False
            
            # Run transform scripts for spells - these reorganize flat spell tables into grouped format
            print(f"  → Transforming spell tables...")
            for script in ['scripts/transformers/transform-arcane-spell-table.py', 'scripts/transformers/transform-mystic-spell-table.py']:
                result = subprocess.run(
                    ['python3', script],
                    capture_output=True,
                    text=True,
                    cwd=utils_dir
                )
                if result.returncode != 0:
                    error_msg = f"{script} failed: {result.stderr}"
                    self.stats['errors'].append(error_msg)
                    print(f"  ✗ {error_msg}")
                    return False
            
            # Run transform script for companion traits
            print(f"  → Transforming companion traits table...")
            result = subprocess.run(
                ['python3', 'scripts/transformers/transform-companion-traits-table.py'],
                capture_output=True,
                text=True,
                cwd=utils_dir
            )
            if result.returncode != 0:
                error_msg = f"transform-companion-traits-table.py failed: {result.stderr}"
                self.stats['errors'].append(error_msg)
                print(f"  ✗ {error_msg}")
                return False
            
            # Run update-docs-from-split-tables.py
            print(f"  → Updating documentation...")
            result = subprocess.run(
                ['python3', 'scripts/transformers/update-docs-from-split-tables.py'],
                capture_output=True,
                text=True,
                cwd=utils_dir
            )
            if result.returncode != 0:
                error_msg = f"update-docs-from-split-tables.py failed: {result.stderr}"
                self.stats['errors'].append(error_msg)
                print(f"  ✗ {error_msg}")
                return False
            
            print(f"  ✓ Pipeline completed successfully")
            print()
            return True
            
        except Exception as e:
            error_msg = f"Failed to run conversion pipeline: {e}"
            self.stats['errors'].append(error_msg)
            print(f"  ✗ Error: {error_msg}")
            print()
            return False
    
    def _print_summary(self):
        """Print import summary."""
        print(f"{'='*70}")
        print(f"  Import Summary")
        print(f"{'='*70}\n")
        
        print(f"Pages updated:     {self.stats['pages_updated']}")
        print(f"Pages skipped:     {self.stats['pages_skipped']}")
        print(f"Databases updated: {self.stats['databases_updated']}")
        print(f"Sections updated:  {self.stats['sections_updated']}")
        
        if self.stats['errors']:
            print(f"\n⚠ Errors encountered: {len(self.stats['errors'])}")
            for error in self.stats['errors']:
                print(f"  - {error}")
        else:
            print(f"\n✓ Import completed successfully!")
        
        print(f"\n{'='*70}\n")


def main():
    """Main entry point."""
    if len(sys.argv) < 2:
        print("Usage: python import_notion.py <path_to_zip_file>")
        print("\nExample:")
        print("  python import_notion.py ../../input/notion-export.zip")
        sys.exit(1)
    
    zip_path = Path(sys.argv[1])
    
    if not zip_path.exists():
        print(f"Error: File not found: {zip_path}")
        sys.exit(1)
    
    if not zip_path.suffix == '.zip':
        print(f"Error: File must be a ZIP file: {zip_path}")
        sys.exit(1)
    
    # Find config file
    script_dir = Path(__file__).parent
    config_path = script_dir / 'config.json'
    
    if not config_path.exists():
        print(f"Error: Config file not found: {config_path}")
        sys.exit(1)
    
    # Run import
    importer = NotionImporter(config_path)
    success = importer.import_from_zip(zip_path)
    
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
