import pandas as pd
import os

def convert_group_md(df):
  df = df.fillna('-')
      
  # Create markdown table header with separators for all columns
  column_separators = ["---"] * len(df.columns)
  markdown_table = "{}".format(" | ".join(df.columns)) + "\n"
  markdown_table += "{}\n".format(" | ".join(column_separators))

  # Iterate through each row in the dataframe and add it to the markdown table
  for index, row in df.iterrows():
    formatted_row = ["{}"] * len(df.columns)
    for i, value in enumerate(row.values):
      formatted_row[i] = str(value)  # Ensure all values are strings for consistent formatting
    markdown_table += "{}\n".format(" | ".join(formatted_row))

  return markdown_table

def split_table_md(input_file, split_column):
  """
  Splits a markdown table in a markdown file and writes subtables alphabetically to a single markdown file.
  The output filename is automatically generated based on the input filename.

  Args:
      input_file: Path to the markdown file containing the table.
      split_column: Name of the column to split the table by.
  """
  # Get the output directory and filename based on the input path
  output_dir = "split-tables"
  output_filename = os.path.splitext(os.path.basename(input_file))[0] + ".md"
  output_file = os.path.join(output_dir, output_filename)

  # Read the markdown file with read_table
  try:
    df = pd.read_table(input_file, delimiter="|", skipinitialspace=True, skip_blank_lines=True)
  except pd.errors.ParserError:
    print("Error: Could not parse table using pandas.read_table.")
    return

  # Check if there are any rows (might include the separator line)
  if len(df) == 0:
    print("Error: No table data found in the markdown file.")
    return

  df = df.iloc[1:]  # Remove the first row (separator line)

  # Remove trailing whitespace from column names
  df.columns = df.columns.str.strip()

  # Split groups by the split column
  split_groups = df.groupby(split_column, sort=False)

  # Generate the content for the output markdown file
  output_content = ""
  for name, group_df in split_groups:
    group_df = group_df.drop([split_column], axis=1) # delete split_column
    group_content = convert_group_md(group_df)
    output_content += f"\n## {name}\n" + group_content + "\n"

  # Write the content to the output file
  with open(output_file, 'w') as f:
    f.write(output_content)
  print(f"Subtables written to: {output_file}")
  

if __name__ == "__main__":
  import argparse

  parser = argparse.ArgumentParser(description="Split markdown table by column")
  parser.add_argument("input_file", help="Path to the markdown file")
  parser.add_argument("split_column", help="Name of the column to split the table by")
  args = parser.parse_args()

  split_table_md(args.input_file, args.split_column)
  