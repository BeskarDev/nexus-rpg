import re

def convert_markdown_table(input_file, output_file):
    with open(input_file, 'r') as file:
        markdown_content = file.read()

    # Extract table data
    table_start = markdown_content.find('Discipline')
    table_end = markdown_content.find('\n\n', table_start)
    table_text = markdown_content[table_start:table_end]

    # Parse table using regex
    headers_match = re.search(r'\|(.+?)\|', table_text)
    if headers_match:
        headers = [header.strip() for header in headers_match.group(1).split('|')]
        table_body = table_text[table_text.find('\n')+1:]
        rows = re.findall(r'\|(.+?)\|', table_body, re.MULTILINE)
        rows = [row.strip() for row in rows]
        rows = [dict(zip(headers, [cell.strip() for cell in row.split('|')])) for row in rows]

        # Generate new markdown content
        new_content = ''
        for row in rows:
            print(row)
            discipline = row.get('Discipline', '')
            rank = row.get('Rank', '')
            name = row.get('Name', '')
            focus = row.get('Focus', '')
            target = row.get('Target', '')
            range_ = row.get('Range', '')
            properties = row.get('Properties', '')
            effect = row.get('Effect', '')

            if name.strip() != '':
                new_content += f'## {name}\n\n'
                new_content += f'*(Rank {rank} {discipline} Spell)*\n\n'
                new_content += f'- Focus: {focus}\n'
                new_content += f'- Target: {target}\n'
                new_content += f'- Range: {range_}\n'
                
                if properties.strip():
                    new_content += f'- Properties: {properties}\n\n'
                
                new_content += '**Effect**\n\n'
                new_content += f'{effect}\n\n'

        with open(output_file, 'w') as file:
            file.write(new_content)

        print(f'Conversion complete. Output saved to {output_file}.')
    else:
        print('Table not found in the input file.')

# Example usage
input_file = 'input.md'
output_file = 'output.md'
convert_markdown_table(input_file, output_file)
