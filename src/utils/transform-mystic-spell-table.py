def split_table_by_Tradition(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.readlines()

    # Find the table header and rows
    header_index = content.index(' **Name** | **Tradition** | **Rank** | **Focus** | **Target** | **Range** | **Properties** | **Effect** \n')
    rows = content[header_index + 2:]

    # Split the rows into tables based on the "Tradition" column
    tables = {}
    for row in rows:
        # Skip empty lines
        if row.strip() == "":
            continue

        columns = row.split('|')
        Tradition = columns[1].strip()
        if Tradition not in tables:
            tables[Tradition] = []
        # Exclude the "Tradition" column using slicing
        table_row = '|'.join(columns[:1] + columns[2:])
        tables[Tradition].append(table_row)

    # Output the tables to the new markdown file
    with open(output_file, 'w') as file:
        for Tradition, table_rows in tables.items():
            # Write the header above each table
            file.write("## **" + Tradition.strip('**') + "**\n\n")

            # Write the modified table header (without the "Tradition" column)
            file.write(' **Name** | **Rank** | **Focus** | **Target** | **Range** | **Properties** | **Effect** \n')
            file.write('---|---|---|---|---|---|---\n')

            # Write the modified table rows (without the "Tradition" column)
            for row in table_rows:
                file.write(row)

            # Add a newline between tables
            file.write('\n')


# Example usage
input_file = 'input.md'
output_file = 'output.md'
split_table_by_Tradition(input_file, output_file)
