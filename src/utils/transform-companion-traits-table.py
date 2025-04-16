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
                outfile.write(f"## {type_name if pd.notna(type_name) else 'Unknown'}\n\n")  # Handle missing 'Type'
                for index, row in group.iterrows():
                    outfile.write(f"### {row['Name'] if pd.notna(row['Name']) else 'Unnamed'}\n\n")  # Handle missing 'Name'
                    outfile.write("| Statistic | Value |\n")
                    outfile.write("|---|---|\n")
                    for col in ['HP', 'AV', 'Strength', 'Agility', 'Spirit', 'Mind', 'Parry', 'Dodge', 'Resist']:
                        if pd.notna(row[col]) and row[col] != '':
                            outfile.write(f"| {col} | {row[col]} |\n")
                    outfile.write("\n")
                    outfile.write(f"**Size:** {row['Size'] if pd.notna(row['Size']) else 'Unknown'}\n")
                    outfile.write(f"**Skills:** {row['Skills'] if pd.notna(row['Skills']) else 'None'}\n")
                    if pd.notna(row['Immunities']) and row['Immunities'] != '':
                        outfile.write(f"**Immunities:** {row['Immunities']}\n")
                    if pd.notna(row['Resistances']) and row['Resistances'] != '':
                        outfile.write(f"**Resistances:** {row['Resistances']}\n")
                    if pd.notna(row['Weaknesses']) and row['Weaknesses'] != '':
                        outfile.write(f"**Weaknesses:** {row['Weaknesses']}\n")
                    outfile.write(f"**Attack 1:** {row['Attack 1'] if pd.notna(row['Attack 1']) else 'None'}\n")
                    if pd.notna(row['Attack 2']) and row['Attack 2'] != '':
                        outfile.write(f"**Attack 2:** {row['Attack 2']}\n")
                    if pd.notna(row['Ability 1']) and row['Ability 1'] != '':
                        outfile.write(f"**Ability 1:** {row['Ability 1']}\n")
                    if pd.notna(row['Ability 2']) and row['Ability 2'] != '':
                        outfile.write(f"**Ability 2:** {row['Ability 2']}\n")
                    if pd.notna(row['Ability 3']) and row['Ability 3'] != '':
                        outfile.write(f"**Ability 3:** {row['Ability 3']}\n")
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
