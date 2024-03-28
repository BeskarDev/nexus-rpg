def split_table_by_discipline(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.readlines()

    # Find the table header and rows
    header_index = content.index('Name | Discipline | Rank | Focus | Target | Range | Properties | Effect\n')
    rows = content[header_index + 2:]

    # Split the rows into tables based on the "Discipline" column
    tables = {}
    for row in rows:
        # Skip empty lines
        if row.strip() == "":
            continue

        columns = row.split('|')
        discipline = columns[1].strip()
        if discipline not in tables:
            tables[discipline] = []

        name = columns[0].strip()
        columns[6] = ' ' + (columns[6].replace(',', ', ').strip() or '-') # add whitespaces between properties
        basic_info = '|'.join(columns[2:7])
        detailed_effect = columns[7]

        tables[discipline].append((name, basic_info, detailed_effect))

    # Output the tables to the new markdown file
    with open(output_file, 'w') as file:
        for discipline, table_data in tables.items():
            file.write("## " + discipline.strip('**') + "\n\n")

            for name, basic_info, detailed_effect in table_data:
                file.write("### " + name.strip('**') + "\n\n")
                file.write('**Rank** | **Focus** | **Target** | **Range** | **Properties**\n')
                file.write('---|---|---|---|---\n')
                file.write(basic_info + '\n\n')
                file.write('**Effect**<br />' + detailed_effect + '\n\n')

# Example usage
input_file = 'output/arcane-spells.md'
output_file = 'split-tables/arcane-spells.md'
split_table_by_discipline(input_file, output_file)
