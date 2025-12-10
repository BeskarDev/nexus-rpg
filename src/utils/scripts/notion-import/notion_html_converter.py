#!/usr/bin/env python3
"""
Notion HTML to Markdown converter for Nexus RPG documentation.
Converts Notion HTML pages to markdown format matching the existing docs structure.
"""

import re
from bs4 import BeautifulSoup, NavigableString
from pathlib import Path


class NotionHtmlConverter:
    """Convert Notion HTML exports to Markdown format."""
    
    def __init__(self):
        self.in_list = False
        self.list_level = 0
        
    def convert_file(self, html_file: Path, title: str = None, strip_tables: bool = False) -> str:
        """
        Convert a Notion HTML file to markdown.
        
        Args:
            html_file: Path to the HTML file
            title: Optional title override
            strip_tables: If True, removes all table elements before conversion
            
        Returns:
            Markdown content as string
        """
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
            
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Extract title from HTML if not provided
        if not title:
            title_elem = soup.find('title')
            if title_elem:
                title = title_elem.text.strip()
        
        # Find the main content area (usually in article or body)
        content_area = soup.find('article') or soup.find('body')
        if not content_area:
            return ""
        
        # Strip tables if requested (for overview pages that will have tables added separately)
        if strip_tables:
            for table in content_area.find_all('table'):
                table.decompose()
        
        # Preprocess: merge consecutive single-item lists (Notion quirk)
        self._merge_consecutive_lists(content_area)
        
        # Convert the content
        markdown = self._convert_element(content_area)
        
        # Clean up markdown
        markdown = self._clean_markdown(markdown)
        
        return markdown
    
    def _merge_consecutive_lists(self, element):
        """
        Merge consecutive single-item lists (common in Notion exports).
        Notion sometimes creates separate <ul> or <ol> elements for each item
        instead of a single list with multiple items.
        """
        # Process all child elements recursively (only elements, not text nodes)
        for child in list(element.children):
            if hasattr(child, 'name') and child.name:  # Only process tag elements
                self._merge_consecutive_lists(child)
        
        # Now merge consecutive single-item lists that are direct children
        for list_type in ['ul', 'ol']:
            i = 0
            children = list(element.children)
            while i < len(children):
                child = children[i]
                
                # Skip non-list elements
                if not hasattr(child, 'name') or child.name != list_type:
                    i += 1
                    continue
                
                items = child.find_all('li', recursive=False)
                if len(items) != 1:
                    i += 1
                    continue
                
                # For ordered lists, check if item has nested lists (don't merge these)
                if list_type == 'ol':
                    first_li = items[0]
                    if first_li.find(['ul', 'ol'], recursive=False):
                        # This ol item has nested lists, don't merge
                        i += 1
                        continue
                
                # This is a single-item list, look for consecutive ones
                consecutive = [child]
                current_start = int(child.get('start', 1)) if list_type == 'ol' else None
                j = i + 1
                
                while j < len(children):
                    next_child = children[j]
                    
                    # Skip non-element nodes
                    if not hasattr(next_child, 'name'):
                        j += 1
                        continue
                    
                    # If it's a list of the same type with single item, add to consecutive
                    if next_child.name == list_type:
                        next_items = next_child.find_all('li', recursive=False)
                        if len(next_items) == 1:
                            # For ordered lists, check start attribute and nested lists
                            if list_type == 'ol':
                                next_start = int(next_child.get('start', 1))
                                # Don't merge if start values are different or if has nested lists
                                next_li = next_items[0]
                                if next_start != current_start + len(consecutive) or next_li.find(['ul', 'ol'], recursive=False):
                                    break
                            
                            consecutive.append(next_child)
                            j += 1
                            continue
                    
                    # Otherwise stop looking
                    break
                
                # If we found multiple consecutive lists, merge them
                if len(consecutive) > 1:
                    # Move all items to first list
                    for list_elem in consecutive[1:]:
                        for li in list_elem.find_all('li', recursive=False):
                            child.append(li)
                        list_elem.decompose()
                    
                    # Update children list
                    children = list(element.children)
                
                i += 1
    
    def _convert_element(self, element, depth=0) -> str:
        """Recursively convert HTML elements to markdown."""
        if isinstance(element, NavigableString):
            text = str(element)
            # Skip pure whitespace between block elements
            if text.strip() == '':
                return ''
            return text
        
        tag = element.name
        result = []
        
        # Handle different HTML tags
        if tag == 'h1':
            content = self._get_text_content(element)
            if content and not content.startswith('#'):
                result.append(f"\n# {content}\n")
        elif tag == 'h2':
            content = self._get_text_content(element)
            if content:
                result.append(f"\n## {content}\n")
        elif tag == 'h3':
            content = self._get_text_content(element)
            if content:
                result.append(f"\n### {content}\n")
        elif tag == 'h4':
            # Skip h4 collection titles from Notion (they have class="collection-title")
            if 'collection-title' in element.get('class', []):
                return ''
            # Otherwise treat as regular h4 header
            content = self._get_text_content(element)
            if content:
                result.append(f"\n#### {content}\n")
        elif tag in ['h5', 'h6']:
            # Skip h5-h6 headers (usually duplicates or navigation)
            return ''
        elif tag == 'p':
            content = self._convert_children(element)
            if content.strip():
                # Double newline after paragraphs for proper markdown block spacing
                result.append(f"\n{content}\n\n")
        elif tag == 'strong' or tag == 'b':
            content = self._convert_children(element)
            result.append(f"**{content}**")
        elif tag == 'em' or tag == 'i':
            content = self._convert_children(element)
            result.append(f"*{content}*")
        elif tag == 'code':
            content = self._get_text_content(element)
            result.append(f"`{content}`")
        elif tag == 'pre':
            code_elem = element.find('code')
            if code_elem:
                content = code_elem.get_text()
                result.append(f"\n```\n{content}\n```\n")
            else:
                content = element.get_text()
                result.append(f"\n```\n{content}\n```\n")
        elif tag == 'ul':
            # Notion uses ul for bullet lists
            list_items = []
            for li in element.find_all('li', recursive=False):
                # Process main content first
                li_content_parts = []
                nested_lists = []
                
                for child in li.children:
                    if hasattr(child, 'name'):
                        if child.name in ['ul', 'ol']:
                            # Direct nested list
                            nested_lists.append(child)
                        elif child.name == 'div':
                            # Check if div contains a nested list (Notion wraps them)
                            for nested in child.find_all(['ul', 'ol'], recursive=False):
                                nested_lists.append(nested)
                            # Also process any text content in the div
                            for subchild in child.children:
                                if not hasattr(subchild, 'name') or subchild.name not in ['ul', 'ol']:
                                    li_content_parts.append(self._convert_element(subchild, depth))
                        else:
                            li_content_parts.append(self._convert_element(child, depth))
                    else:
                        li_content_parts.append(self._convert_element(child, depth))
                
                main_content = ''.join(li_content_parts).strip()
                list_items.append(f"- {main_content}")
                
                # Handle nested lists with proper indentation
                for nested_list in nested_lists:
                    nested_md = self._convert_element(nested_list, depth + 1).strip()
                    # Indent nested list items
                    indented = '\n'.join('  ' + line if line.strip() else '' for line in nested_md.split('\n'))
                    list_items.append(indented)
            
            result.append(f"\n{chr(10).join(list_items)}\n")
        elif tag == 'ol':
            # Notion uses ol for numbered lists - respect the start attribute
            start_num = int(element.get('start', 1))
            list_items = []
            for idx, li in enumerate(element.find_all('li', recursive=False), start_num):
                # Process main content first
                li_content_parts = []
                nested_lists = []
                
                for child in li.children:
                    if hasattr(child, 'name'):
                        if child.name in ['ul', 'ol']:
                            # Direct nested list
                            nested_lists.append(child)
                        elif child.name == 'div':
                            # Check if div contains a nested list (Notion wraps them)
                            for nested in child.find_all(['ul', 'ol'], recursive=False):
                                nested_lists.append(nested)
                            # Also process any text content in the div
                            for subchild in child.children:
                                if not hasattr(subchild, 'name') or subchild.name not in ['ul', 'ol']:
                                    li_content_parts.append(self._convert_element(subchild, depth))
                        else:
                            li_content_parts.append(self._convert_element(child, depth))
                    else:
                        li_content_parts.append(self._convert_element(child, depth))
                
                main_content = ''.join(li_content_parts).strip()
                list_items.append(f"{idx}. {main_content}")
                
                # Handle nested lists with proper indentation
                for nested_list in nested_lists:
                    nested_md = self._convert_element(nested_list, depth + 1).strip()
                    # Indent nested list items (3 spaces for numbered lists to align with text)
                    indented = '\n'.join('   ' + line if line.strip() else '' for line in nested_md.split('\n'))
                    list_items.append(indented)
            
            result.append(f"\n{chr(10).join(list_items)}\n")
        elif tag == 'li':
            # Handle nested lists
            content = self._convert_children(element)
            return content
        elif tag == 'blockquote' or 'callout' in element.get('class', []):
            content = self._convert_children(element)
            # Check if this blockquote contains br-separated list items
            # (e.g., "1. Item<br/>2. Item<br/>3. Item")
            if '<br/>' in content:
                # Check if it looks like a numbered list
                lines = content.split('<br/>')
                if all(line.strip() and line.strip()[0].isdigit() and '.' in line.strip()[:3] for line in lines if line.strip()):
                    # Convert to proper numbered list within blockquote
                    list_lines = []
                    for line in lines:
                        line = line.strip()
                        if line:
                            list_lines.append(line)
                    # Format as blockquote with list items on separate lines
                    quoted = '\n'.join(f"> {line}" for line in list_lines)
                    result.append(f"\n{quoted}\n")
                else:
                    # Not a numbered list, just convert br to newlines
                    lines = content.replace('<br/>', '\n').strip().split('\n')
                    quoted = '\n'.join(f"> {line}" if line.strip() else '>' for line in lines)
                    result.append(f"\n{quoted}\n")
            else:
                # Regular blockquote without br elements
                lines = content.strip().split('\n')
                quoted = '\n'.join(f"> {line}" if line.strip() else '>' for line in lines)
                result.append(f"\n{quoted}\n")
        elif tag == 'a':
            text = self._get_text_content(element)
            href = element.get('href', '')
            # Clean up Notion internal links - convert to relative paths or preserve external
            if href.startswith('http'):
                # Check if this is a Notion internal link that should be converted
                if 'notion.so' in href or 'nexus-rpg' in href:
                    # Preserve the link so it can be replaced by link_mappings later
                    # Extract the filename from the URL (e.g., "06-wild-surge-table.mdx")
                    import re
                    match = re.search(r'/([^/]+\.(md|mdx))$', href)
                    if match:
                        filename = match.group(1)
                        result.append(f"[{text}]({filename})")
                    else:
                        # If no filename pattern found, just keep the text
                        result.append(text)
                else:
                    # External link, preserve as-is
                    result.append(f"[{text}]({href})")
            else:
                result.append(text)
        elif tag == 'img':
            alt = element.get('alt', '')
            src = element.get('src', '')
            # Check if src is a local path or needs conversion
            if src.startswith('http'):
                # Extract filename from URL and convert to local path
                # Notion often uses pattern like: .../filename-hashcode.ext
                import re
                filename_match = re.search(r'/([^/]+\.(jpg|jpeg|png|gif|webp))$', src, re.IGNORECASE)
                if filename_match:
                    filename = filename_match.group(1)
                    # Remove hashcode pattern (e.g., dwarf-9690b5da2510981f81d96d0dd19dd88e.jpeg -> dwarf.jpeg)
                    clean_filename = re.sub(r'-[0-9a-f]{32}', '', filename)
                    
                    # Determine path based on alt text
                    # Banner images use absolute path, inline content images use relative path
                    if alt in ['banner-img', 'banner', '']:
                        # Banner image at top of page
                        src = f"/img/banner/{clean_filename}"
                    else:
                        # Inline content image (folk-img, creature-img, etc.) - use relative path
                        src = f"./img/{clean_filename}"
                    
                    result.append(f"\n![{alt}]({src})\n")
                else:
                    # Fallback: use original if pattern not matched, but add warning comment
                    result.append(f"\n<!-- TODO: Fix image path -->\n![{alt or 'image'}]({src})\n")
            else:
                # Already a local path, preserve as-is
                result.append(f"\n![{alt or 'image'}]({src})\n")
        elif tag == 'table':
            # Convert table to markdown
            table_md = self._convert_table(element)
            result.append(f"\n{table_md}\n")
        elif tag == 'br':
            result.append('<br/>')
        elif tag in ['header', 'footer']:
            # Skip header/footer elements (contain metadata like page category)
            return ''
        elif tag in ['div', 'span', 'article', 'section']:
            # Container elements - just process children
            result.append(self._convert_children(element))
        elif tag == 'hr':
            result.append('\n---\n')
        else:
            # For unknown tags, just process children
            result.append(self._convert_children(element))
        
        return ''.join(result)
    
    def _convert_children(self, element) -> str:
        """Convert all children of an element."""
        result = []
        for child in element.children:
            result.append(self._convert_element(child))
        return ''.join(result)
    
    def _get_text_content(self, element) -> str:
        """Get text content preserving basic formatting."""
        result = []
        for child in element.children:
            if isinstance(child, NavigableString):
                result.append(str(child))
            elif child.name in ['strong', 'b']:
                result.append(f"**{self._get_text_content(child)}**")
            elif child.name in ['em', 'i']:
                result.append(f"*{self._get_text_content(child)}*")
            elif child.name == 'code':
                result.append(f"`{child.get_text()}`")
            elif child.name == 'br':
                result.append('<br/>')
            else:
                result.append(self._get_text_content(child))
        return ''.join(result)
    
    def _convert_table(self, table_element) -> str:
        """Convert HTML table to markdown table."""
        rows = []
        
        # Get header row
        thead = table_element.find('thead')
        if thead:
            header_row = thead.find('tr')
            if header_row:
                headers = []
                for th in header_row.find_all(['th', 'td']):
                    headers.append(self._get_text_content(th).strip())
                rows.append('| ' + ' | '.join(headers) + ' |')
                rows.append('| ' + ' | '.join(['---' for _ in headers]) + ' |')
        
        # Get body rows
        tbody = table_element.find('tbody')
        if tbody:
            tbody_rows = tbody.find_all('tr')
            
            # Check if first row should be treated as header (contains th elements)
            if not thead and tbody_rows:
                first_row = tbody_rows[0]
                # If first row has any th elements, treat it as header
                if first_row.find('th'):
                    headers = []
                    for cell in first_row.find_all(['th', 'td']):
                        headers.append(self._get_text_content(cell).strip())
                    rows.append('| ' + ' | '.join(headers) + ' |')
                    rows.append('| ' + ' | '.join(['---' for _ in headers]) + ' |')
                    # Skip first row in body processing
                    tbody_rows = tbody_rows[1:]
            
            # Process remaining body rows
            for tr in tbody_rows:
                cells = []
                for idx, cell in enumerate(tr.find_all(['th', 'td'])):
                    # Check if cell has multiple span elements (Notion multi-select)
                    spans = cell.find_all('span', class_='selected-value')
                    if len(spans) > 1:
                        # Multiple values - join with commas
                        cell_content = ', '.join(span.get_text().strip() for span in spans)
                    else:
                        # Single value or plain text
                        cell_content = self._get_text_content(cell).strip()
                    # Replace newlines with <br/>
                    cell_content = cell_content.replace('\n', '<br/>')
                    cells.append(cell_content)
                if cells:
                    rows.append('| ' + ' | '.join(cells) + ' |')
        elif not thead:
            # Table without thead/tbody
            for tr in table_element.find_all('tr'):
                cells = []
                for idx, td in enumerate(tr.find_all(['td', 'th'])):
                    cell_content = self._get_text_content(td).strip()
                    cell_content = cell_content.replace('\n', '<br/>')
                    cells.append(cell_content)
                if cells:
                    if not rows:
                        # First row as header
                        rows.append('| ' + ' | '.join(cells) + ' |')
                        rows.append('| ' + ' | '.join(['---' for _ in cells]) + ' |')
                    else:
                        rows.append('| ' + ' | '.join(cells) + ' |')
        
        return '\n'.join(rows)
    
    def _clean_markdown(self, markdown: str) -> str:
        """Clean up the generated markdown."""
        # Notion exports HTML-encoded br tags which become literal <br> without slash
        # Convert them to proper XHTML format with closing slash
        markdown = markdown.replace('<br>', '<br/>')
        
        # Remove excessive blank lines (max one blank line = two newlines)
        markdown = re.sub(r'\n{3,}', '\n\n', markdown)
        
        # Ensure blank line before bold text that starts a line (acts as section label)
        # Pattern: **Text:** or **Text.**
        lines = markdown.split('\n')
        result = []
        for i, line in enumerate(lines):
            # Check if this line is bold text at start of line with : or . at end
            stripped = line.strip()
            if stripped.startswith('**') and ((':' in stripped and stripped.endswith(':')) or ('.' in stripped and stripped.endswith('.'))):
                # Check previous line
                if i > 0 and result:
                    prev = result[-1]
                    # Add blank line before if previous line wasn't blank and wasn't a heading
                    if prev.strip() and not prev.strip().startswith('#'):
                        result.append('')
            result.append(line)
        
        markdown = '\n'.join(result)
        
        # Ensure blank lines after lists when followed by non-list content
        lines = markdown.split('\n')
        result = []
        for i, line in enumerate(lines):
            result.append(line)
            
            # If this line is a list item
            if re.match(r'^\s*[-*]\s+|^\s*\d+\.\s+', line):
                # Check if next line exists and is not a list item and not blank
                if i + 1 < len(lines):
                    next_line = lines[i + 1]
                    # If next line is not blank and not a list item, add blank line
                    if next_line.strip() and not re.match(r'^\s*[-*]\s+|^\s*\d+\.\s+', next_line):
                        result.append('')
        
        markdown = '\n'.join(result)
        
        # Handle Notion's quirk: consecutive single list items separated by blank lines
        # Collapse blank lines between list items of the same list type
        lines = markdown.split('\n')
        result = []
        i = 0
        
        while i < len(lines):
            result.append(lines[i])
            
            # Check if current line is a list item
            current = lines[i].lstrip()
            is_list_item = re.match(r'^[-*]\s+|\d+\.\s+', current)  # Fixed regex: require whitespace after marker
            
            if is_list_item and i + 2 < len(lines):
                # Check if next non-empty line is also a list item
                next_line = lines[i + 1].lstrip() if i + 1 < len(lines) else ''
                next_next_line = lines[i + 2].lstrip() if i + 2 < len(lines) else ''
                
                # If current line is a list item, next line is blank, and line after is also a list item
                if next_line == '' and re.match(r'^[-*]\s+|\d+\.\s+', next_next_line):  # Fixed regex
                    # Skip the blank line
                    i += 2
                    continue
            
            i += 1
        
        markdown = '\n'.join(result)
        
        # Remove leading/trailing whitespace
        markdown = markdown.strip()
        
        # Remove trailing <br/> tags
        while markdown.endswith('<br/>'):
            markdown = markdown[:-5].strip()
        
        # Ensure file ends with single newline
        if not markdown.endswith('\n'):
            markdown += '\n'
        
        return markdown


def convert_html_to_markdown(html_file: Path, title: str = None, strip_tables: bool = False) -> str:
    """
    Convert a Notion HTML file to markdown.
    
    Args:
        html_file: Path to HTML file
        title: Optional title for the page
        strip_tables: If True, removes all table elements before conversion
        
    Returns:
        Markdown content as string
    """
    converter = NotionHtmlConverter()
    return converter.convert_file(html_file, title, strip_tables)


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python notion_html_converter.py <html_file> [title]")
        sys.exit(1)
    
    html_file = Path(sys.argv[1])
    title = sys.argv[2] if len(sys.argv) > 2 else None
    
    if not html_file.exists():
        print(f"Error: File not found: {html_file}")
        sys.exit(1)
    
    markdown = convert_html_to_markdown(html_file, title)
    print(markdown)
