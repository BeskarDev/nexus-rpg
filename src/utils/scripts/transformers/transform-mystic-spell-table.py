import pandas as pd
from pathlib import Path

# Calculate paths relative to this script
script_dir = Path(__file__).parent
utils_dir = script_dir.parent.parent
input_file = utils_dir / 'data' / 'markdown' / 'mystic-spells.md'
output_file = utils_dir / 'data' / 'split-tables' / 'mystic-spells.md'

def split_table_by_tradition(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.readlines()

    # Find the table header and rows
    header_index = content.index('Name | Tradition | Rank | Focus | Target | Range | Properties | Effect | Heightened\n')
    rows = content[header_index + 2:]

    # Split the rows into tables based on the "Tradition" column
    tables = {}
    for row in rows:
        # Skip empty lines
        if row.strip() == "":
            continue

        columns = row.split('|')
        tradition = columns[1].strip()
        if tradition not in tables:
            tables[tradition] = []

        name = columns[0].strip()
        columns[6] = ' ' + (columns[6].replace(',', ', ').strip() or '-') # add whitespaces between properties
        basic_info = '|'.join(columns[2:7])
        detailed_effect = columns[7]
        heightened_effect = columns[8]

        tables[tradition].append((name, basic_info, detailed_effect, heightened_effect))

    # Output the tables to the new markdown file
    with open(output_file, 'w') as file:
        for tradition, table_data in tables.items():
            file.write("## " + tradition.strip('') + "\n\n")

            for name, basic_info, detailed_effect, heightened_effect in table_data:
                file.write("### " + name.strip('**') + "\n\n")
                file.write('**Rank** | **Focus** | **Target** | **Range** | **Properties**\n')
                file.write('---|---|---|---|---\n')
                file.write(basic_info + '\n\n')
                file.write('**Effect** <br/>' + detailed_effect)
                if heightened_effect.strip() not in (None, ''):
                    file.write('\n\n> **Heightened** <br/>' + heightened_effect.replace('<br/><br/><strong>(Rank', '<br/><strong>(Rank') + '\n>')
                file.write('\n\n')

    print(f"Subtables written to: {output_file}")

# Run with calculated paths
split_table_by_tradition(str(input_file), str(output_file))
