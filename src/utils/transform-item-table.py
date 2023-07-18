def split_table_by_skill_requirement(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.readlines()

    # Find the table header and rows
    header_index = content.index(' **Name** | **Category** | **Quality** | **Load** | **Cost** | **Description** \n')
    rows = content[header_index + 2:]

    # Split the rows into tables based on the "Skill Requirement" column
    tables = {}
    for row in rows:
        # Skip empty lines
        if row.strip() == "":
            continue

        columns = row.split('|')
        category = columns[1].strip()
        if category not in tables:
            tables[category] = []
        # Exclude the "Skill Requirement" column
        table_row = columns[0] + '|' + columns[2] + '|' + columns[3] + '|' + columns[4] + '|' + columns[5]
        tables[category].append(table_row)

    # Output the tables to the new markdown file
    with open(output_file, 'w') as file:
        for category, table_rows in tables.items():
            # Write the header above each table
            file.write("### " + category.strip('**') + "\n\n")

            # Write the modified table header (without the "Skill Requirement" column)
            file.write(' **Name** | **Quality** | **Load** | **Cost** | **Description** \n')
            file.write('---|---|---|---|---\n')

            # Write the modified table rows (without the "Skill Requirement" column)
            for row in table_rows:
                file.write(row)

            # Add a newline between tables
            file.write('\n')


# Example usage
input_file = 'input.md'
output_file = 'output.md'
split_table_by_skill_requirement(input_file, output_file)
