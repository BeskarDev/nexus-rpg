import pandas as pd
import os

def restructure_markdown_table(input_filepath, output_filepath):
    """
    Loads a markdown table, restructures its columns into separate text portions
    grouped by the 'Type' column, and saves it to a new markdown file.

    Args:
        input_filepath (str): The path to the input markdown file.
        output_filepath (str): The path to the output markdown file.
    """
    try:
        with open(input_filepath, 'r') as f:
            lines = f.readlines()

        # Find the start and end of the table
        start_index = -1
        end_index = -1
        for i, line in enumerate(lines):
            if '--- | ---' in line:
                start_index = i - 1
            elif len(line.strip()) == 0 and start_index != -1 and end_index == -1:
                end_index = i
                break
        if end_index == -1 and start_index != -1:
            end_index = len(lines)

        if start_index == -1:
            print(f"Error: Could not find a valid markdown table in '{input_filepath}'.")
            return

        header = [h.strip() for h in lines[start_index].strip('|').split('|')]
        data_lines = [line.strip() for line in lines[start_index + 2:end_index]]
        data = []
        for line in data_lines:
          values = [v.strip() for v in line.strip('|').split('|')]
          if len(values) == len(header):
            data.append(dict(zip(header, values)))
          else:
            # Fill missing columns with None to ensure all lines are processed
            while len(values) < len(header):
                values.append(None)
            data.append(dict(zip(header, values)))

        df = pd.DataFrame(data)

        output_dir = os.path.dirname(output_filepath)
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        with open(output_filepath, 'w') as outfile:
            grouped = df.groupby('Type', dropna=False, sort=False)  # Ensure rows without 'Type' are not excluded
            for type_name, group in grouped:
                outfile.write(f"### {type_name if pd.notna(type_name) else 'Unknown'}\n\n")  # Handle missing 'Type'
                for index, row in group.iterrows():
                    outfile.write(f"#### {row['Name'] if pd.notna(row['Name']) else 'Unnamed'}\n\n")  # Handle missing 'Name'

                    combined_data = {
                      "Stats": {col: row[col] if pd.notna(row[col]) and row[col] != '' else '-' for col in ['HP', 'AV']},
                      "Attributes": ", ".join(
                        f"{f'+{value}d' if value and int(value) > 0 else f'{value}d'} {key}"
                        for key, value in {col: row[col] if pd.notna(row[col]) else '' for col in ['Strength', 'Agility', 'Spirit', 'Mind']}.items()
                        if value
                      ),
                      "Defenses": ", ".join(
                        f"{f'+{value}' if value and int(value) > 0 else f'{value}'} {key}"
                        for key, value in {col: row[col] if pd.notna(row[col]) else '' for col in ['Parry', 'Dodge', 'Resist']}.items()
                        if value
                      )
                    }

                    # Combine all keys and values into a single table
                    all_headers = []
                    all_values = []
                    for category, data in combined_data.items():
                      if category == "Attributes":
                        all_headers.append("Attributes")
                        all_values.append(data if data else "-")
                      elif category == "Defenses":
                        all_headers.append("Defenses")
                        all_values.append(data if data else "-")
                      else:
                        for key, value in data.items():
                          all_headers.append(f"{key}")
                          if key in ['HP', 'Parry', 'Dodge', 'Resist']:
                            try:
                              all_values.append(f"+{value}" if value and int(value) > 0 else f"{value}")
                            except ValueError:
                              all_values.append(f"{value}")  # Fallback to original value if parsing fails
                          else:
                            all_values.append(value)

                    if all_headers:
                      outfile.write("| " + " | ".join(all_headers) + " |\n")
                      outfile.write("| " + " | ".join(["---"] * len(all_headers)) + " |\n")
                      outfile.write("| " + " | ".join(str(value) for value in all_values) + " |\n")

                    outfile.write("\n")
                    outfile.write(f"**Skills:** {row['Skills'] if pd.notna(row['Skills']) else 'None'}\n\n")
                    if pd.notna(row['Immunities']) and row['Immunities'] != '':
                        outfile.write(f"**Immunities:** {row['Immunities']}\n\n")
                    if pd.notna(row['Resistances']) and row['Resistances'] != '':
                        outfile.write(f"**Resistances:** {row['Resistances']}\n\n")
                    if pd.notna(row['Weaknesses']) and row['Weaknesses'] != '':
                        outfile.write(f"**Weaknesses:** {row['Weaknesses']}\n\n")

                    # Group attacks and abilities into list items
                    attacks = []
                    if pd.notna(row['Attack 1']) and row['Attack 1'] != '':
                      attacks.append(row['Attack 1'])
                    if pd.notna(row['Attack 2']) and row['Attack 2'] != '':
                      attacks.append(row['Attack 2'])

                    abilities = []
                    if pd.notna(row['Ability 1']) and row['Ability 1'] != '':
                      abilities.append(row['Ability 1'])
                    if pd.notna(row['Ability 2']) and row['Ability 2'] != '':
                      abilities.append(row['Ability 2'])
                    if pd.notna(row['Ability 3']) and row['Ability 3'] != '':
                      abilities.append(row['Ability 3'])

                    if attacks:
                      outfile.write("**Attacks:**\n")
                      for attack in attacks:
                        outfile.write(f"- {attack}\n")
                      outfile.write("\n")

                    if abilities:
                      outfile.write("**Abilities:**\n")
                      for ability in abilities:
                        outfile.write(f"- {ability}\n")
                      outfile.write("\n")
                    outfile.write("\n")

        print(f"Successfully restructured data and saved to '{output_filepath}'.")

    except FileNotFoundError:
        print(f"Error: Input file '{input_filepath}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    input_file = "markdown/companion-traits.md"
    output_file = "split-tables/companion-traits.md"
    restructure_markdown_table(input_file, output_file)
