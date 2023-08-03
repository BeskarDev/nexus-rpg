def split_table_by_discipline(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.readlines()

    # Find the table header and rows
    header_index = content.index(' **Name** | **Discipline** | **Rank** | **Focus** | **Target** | **Range** | **Properties** | **Effect** \n')
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
        # Exclude the "Discipline" column using slicing
        table_row = '|'.join(columns[:1] + columns[2:])

        # Bolden key strings
        table_row = table_row.replace('Weak.', '**Weak.**')
        table_row = table_row.replace('Strong.', '**Strong.**')
        table_row = table_row.replace('Critical.', '**Critical.**')

        tables[discipline].append(table_row)

    # Output the tables to the new markdown file
    with open(output_file, 'w') as file:
        for discipline, table_rows in tables.items():
            # Write the header above each table
            file.write("## **" + discipline.strip('**') + "**\n\n")

            # Write the modified table header (without the "Discipline" column)
            file.write(' **Name** | **Rank** | **Focus** | **Target** | **Range** | **Properties** | **Effect** \n')
            file.write('---|---|---|---|---|---|---\n')

            # Write the modified table rows (without the "Discipline" column)
            for row in table_rows:
                file.write(row)

            # Add a newline between tables
            file.write('\n')


# Example usage
input_file = 'input.md'
output_file = 'output.md'
split_table_by_discipline(input_file, output_file)
