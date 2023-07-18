def split_table_by_skill_requirement(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.readlines()

    # Find the table header and rows
    header_index = content.index(' **Name** | **Skill Requirement** | **Description** \n')
    rows = content[header_index + 2:]

    # Split the rows into tables based on the "Skill Requirement" column
    tables = {}
    for row in rows:
        # Skip empty lines
        if row.strip() == "":
            continue

        columns = row.split('|')
        skill_requirement = columns[1].strip()
        if skill_requirement not in tables:
            tables[skill_requirement] = []
        # Exclude the "Skill Requirement" column
        table_row = columns[0] + '|' + columns[2]
        tables[skill_requirement].append(table_row)

    # Output the tables to the new markdown file
    with open(output_file, 'w') as file:
        for skill_requirement, table_rows in tables.items():
            # Write the header above each table
            file.write("## " + skill_requirement.strip('**') + "\n\n")

            # Write the modified table header (without the "Skill Requirement" column)
            file.write(' **Name** | **Description** \n')
            file.write('---|---\n')

            # Write the modified table rows (without the "Skill Requirement" column)
            for row in table_rows:
                file.write(row)

            # Add a newline between tables
            file.write('\n')


# Example usage
input_file = 'input.md'
output_file = 'output.md'
split_table_by_skill_requirement(input_file, output_file)
