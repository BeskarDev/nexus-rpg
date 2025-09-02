#!/usr/bin/env python3
"""
Keyword Scanner for Nexus RPG Documentation

This script scans all documentation files for keyword occurrences that are not yet
blacklisted and provides all the information needed to add them to the blacklist.

Usage:
    python scan_keywords.py                    # Scan for all keywords from keywords.ts
    python scan_keywords.py -k fire ice light  # Scan for specific keywords only
    python scan_keywords.py --help             # Show help
"""

import os
import re
import json
import argparse
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional


class KeywordScanner:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.docs_path = self.project_root / "docs"
        self.blacklist_path = self.project_root / "src" / "remark" / "blacklist" / "blacklist.json"
        self.keywords_path = self.project_root / "src" / "remark" / "auto-keyword-plugin" / "keywords.ts"
        self.chip_mappings_path = self.project_root / "src" / "remark" / "table-chips-plugin" / "chip-mappings.ts"
        
        # Load blacklist and keywords
        self.blacklist = self._load_blacklist()
        self.keywords = self._load_keywords()
        
    def _load_blacklist(self) -> List[Dict]:
        """Load the current blacklist"""
        try:
            with open(self.blacklist_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Could not load blacklist: {e}")
            return []
    
    def _load_keywords(self) -> Set[str]:
        """Extract keywords from keywords.ts and chip-mappings.ts files"""
        keywords = set()
        
        # Load from keywords.ts
        try:
            with open(self.keywords_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Extract keyword keys from the keywords object
            # Looking for patterns like "keyword": "/path/to/link"
            keyword_pattern = r"(?:^\s*|\s+)(['\"]?)([^'\"\s:]+)\1\s*:"
            matches = re.findall(keyword_pattern, content, re.MULTILINE)
            
            # Filter out non-keyword entries (like comments, exports, etc.)
            for _, keyword in matches:
                # Skip TypeScript/JS keywords and non-game terms
                if keyword in ['export', 'const', 'keywords', 'Record', 'string', 'docs', 'basic', 'rules', 'etc']:
                    continue
                if keyword.startswith('//') or keyword.startswith('/*'):
                    continue
                keywords.add(keyword)
                
        except Exception as e:
            print(f"Warning: Could not load keywords.ts: {e}")
        
        # Load from chip-mappings.ts
        try:
            with open(self.chip_mappings_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Extract keywords from chipMappings object
            # Looking for patterns like "keyword: { color: '...', type: '...' }"
            chip_pattern = r"^\s*(['\"]?)([^'\"\s:]+)\1\s*:\s*\{"
            matches = re.findall(chip_pattern, content, re.MULTILINE)
            
            for _, keyword in matches:
                # Skip TypeScript/JS keywords
                if keyword in ['export', 'const', 'chipMappings', 'ChipMapping', 'color', 'type', 'displayText']:
                    continue
                keywords.add(keyword)
                
        except Exception as e:
            print(f"Warning: Could not load chip-mappings.ts: {e}")
        
        return keywords
    
    def _get_blacklisted_matches(self) -> Dict[str, Set[Tuple[str, int]]]:
        """Get all blacklisted keyword/file/index combinations"""
        blacklisted = {}
        
        for entry in self.blacklist:
            file = entry['file']
            keyword = entry['keyword'].lower()
            match_indices = entry.get('matchIndex', [])
            
            # Handle both single index and array of indices
            if isinstance(match_indices, int):
                match_indices = [match_indices]
            elif match_indices is None:
                # If no matchIndex specified, it blacklists ALL occurrences
                match_indices = list(range(1000))  # Large range to cover all
            
            if keyword not in blacklisted:
                blacklisted[keyword] = set()
                
            for index in match_indices:
                blacklisted[keyword].add((file, index))
                
        return blacklisted
    
    def _find_markdown_files(self) -> List[Path]:
        """Find all markdown files in the docs directory"""
        md_files = []
        for root, dirs, files in os.walk(self.docs_path):
            for file in files:
                if file.endswith('.md'):
                    md_files.append(Path(root) / file)
        return md_files
    
    def _extract_sections(self, content: str) -> Dict[int, str]:
        """Extract section headers and their line numbers"""
        sections = {}
        lines = content.split('\n')
        
        for i, line in enumerate(lines):
            # Match markdown headers (# ## ### etc.)
            header_match = re.match(r'^(#{1,6})\s+(.+)$', line)
            if header_match:
                sections[i] = header_match.group(2).strip()
                
        return sections
    
    def _get_current_section(self, line_num: int, sections: Dict[int, str]) -> Optional[str]:
        """Get the current section for a given line number"""
        current_section = None
        for section_line, section_title in sections.items():
            if section_line <= line_num:
                current_section = section_title
            else:
                break
        return current_section
    
    def _find_keyword_occurrences(self, content: str, keyword: str) -> List[Tuple[int, int, str]]:
        """Find all occurrences of a keyword in content"""
        # Case-insensitive search with word boundaries
        pattern = r'\b' + re.escape(keyword) + r'\b'
        matches = []
        
        lines = content.split('\n')
        for line_num, line in enumerate(lines):
            for match in re.finditer(pattern, line, re.IGNORECASE):
                matches.append((line_num, match.start(), line.strip()))
                
        return matches
    
    def scan_file(self, file_path: Path, target_keywords: Set[str]) -> List[Dict]:
        """Scan a single file for keyword occurrences"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Warning: Could not read {file_path}: {e}")
            return []
        
        # Get relative path from project root
        rel_path = file_path.relative_to(self.project_root)
        
        # Extract sections
        sections = self._extract_sections(content)
        
        findings = []
        blacklisted_matches = self._get_blacklisted_matches()
        
        for keyword in target_keywords:
            keyword_lower = keyword.lower()
            occurrences = self._find_keyword_occurrences(content, keyword)
            
            for match_index, (line_num, char_pos, line_content) in enumerate(occurrences):
                # Check if this specific occurrence is already blacklisted
                is_blacklisted = False
                if keyword_lower in blacklisted_matches:
                    for blacklisted_file, blacklisted_index in blacklisted_matches[keyword_lower]:
                        if str(rel_path) == blacklisted_file and match_index == blacklisted_index:
                            is_blacklisted = True
                            break
                        # Also check if ALL occurrences are blacklisted (when index >= 1000)
                        if str(rel_path) == blacklisted_file and blacklisted_index >= 1000:
                            is_blacklisted = True
                            break
                
                if not is_blacklisted:
                    current_section = self._get_current_section(line_num, sections)
                    
                    findings.append({
                        'file': str(rel_path),
                        'keyword': keyword,
                        'matchIndex': match_index,
                        'lineNumber': line_num + 1,  # 1-based line numbers
                        'lineContent': line_content,
                        'section': current_section,
                        'characterPosition': char_pos
                    })
        
        return findings
    
    def scan_all_files(self, target_keywords: Set[str]) -> List[Dict]:
        """Scan all markdown files for keyword occurrences"""
        md_files = self._find_markdown_files()
        all_findings = []
        
        print(f"Scanning {len(md_files)} markdown files for {len(target_keywords)} keywords...")
        
        for file_path in md_files:
            findings = self.scan_file(file_path, target_keywords)
            all_findings.extend(findings)
            
        return all_findings
    
    def format_findings(self, findings: List[Dict]) -> str:
        """Format findings for display"""
        if not findings:
            return "No unblacklisted keyword occurrences found!"
        
        output = []
        output.append(f"Found {len(findings)} unblacklisted keyword occurrences:\n")
        
        # Group by file
        by_file = {}
        for finding in findings:
            file = finding['file']
            if file not in by_file:
                by_file[file] = []
            by_file[file].append(finding)
        
        for file, file_findings in sorted(by_file.items()):
            output.append(f"📁 {file}")
            
            for finding in file_findings:
                section_info = f" (in section: {finding['section']})" if finding['section'] else ""
                output.append(f"  • {finding['keyword']} [index {finding['matchIndex']}] at line {finding['lineNumber']}{section_info}")
                output.append(f"    → {finding['lineContent']}")
                output.append("")
                
        return "\n".join(output)
    
    def generate_blacklist_entries(self, findings: List[Dict]) -> str:
        """Generate blacklist entries in JSON format"""
        if not findings:
            return "[]"
        
        entries = []
        
        # Group by file and keyword to create efficient blacklist entries
        grouped = {}
        for finding in findings:
            key = (finding['file'], finding['keyword'])
            if key not in grouped:
                grouped[key] = []
            grouped[key].append(finding['matchIndex'])
        
        for (file, keyword), indices in grouped.items():
            entry = {
                "file": file,
                "keyword": keyword,
                "matchIndex": indices if len(indices) > 1 else indices[0],
                "comment": f"Exclude '{keyword}' occurrences in {file}"
            }
            entries.append(entry)
        
        return json.dumps(entries, indent=2)


def main():
    parser = argparse.ArgumentParser(
        description="Scan documentation for unblacklisted keyword occurrences",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scan_keywords.py                    # Scan for all keywords
  python scan_keywords.py -k fire ice light  # Scan for specific keywords
  python scan_keywords.py --json             # Output suggested blacklist entries
        """
    )
    
    parser.add_argument(
        '-k', '--keywords',
        nargs='+',
        help='Specific keywords to scan for (default: all keywords from keywords.ts)'
    )
    
    parser.add_argument(
        '--json',
        action='store_true',
        help='Output suggested blacklist entries in JSON format'
    )
    
    parser.add_argument(
        '--project-root',
        default='.',
        help='Path to project root directory (default: current directory)'
    )
    
    args = parser.parse_args()
    
    # Initialize scanner
    scanner = KeywordScanner(args.project_root)
    
    if not scanner.keywords:
        print("Error: No keywords found. Check keywords.ts file.")
        return 1
    
    # Determine target keywords
    if args.keywords:
        target_keywords = set(args.keywords)
        # Validate that provided keywords exist
        invalid_keywords = target_keywords - scanner.keywords
        if invalid_keywords:
            print(f"Warning: The following keywords are not recognized: {', '.join(invalid_keywords)}")
            target_keywords = target_keywords - invalid_keywords
    else:
        target_keywords = scanner.keywords
    
    if not target_keywords:
        print("Error: No valid keywords to scan for.")
        return 1
    
    # Scan for occurrences
    findings = scanner.scan_all_files(target_keywords)
    
    # Output results
    if args.json:
        print(scanner.generate_blacklist_entries(findings))
    else:
        print(scanner.format_findings(findings))
    
    return 0


if __name__ == '__main__':
    sys.exit(main())