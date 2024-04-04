import pandas as pd
import json
import os

def markdown_to_json(file_path):
  """
  This function converts a markdown file to a pandas dataframe and outputs it as a JSON file.

  Args:
      file_path (str): Path to the markdown file.
  """
  # Read the markdown file with read_table
  try:
    df = pd.read_table(file_path, delimiter="|", skipinitialspace=True, skip_blank_lines=True)
  except pd.errors.ParserError:
    print("Error: Could not parse table using pandas.read_table.")
    return

  # Check if there are any rows (might include the separator line)
  if len(df) == 0:
    print("Error: No table data found in the markdown file.")
    return

  df = df.iloc[1:]  # Remove the first row (separator line)

  # Fix formatting
  df.columns = df.columns.str.strip()
  df.columns = df.columns.str.lower()
  for col in df.columns:
    df[col] = df[col].str.strip()
    df[col] = df[col].str.strip('**')
    
  if 'effect' in df.columns:
    df['effect'] = df['effect'].str.replace('<br/><br/>', '<br/>')
    
  if 'heightened' in df.columns:
    df['heightened'] = df['heightened'].str.replace('<br/><br/>', '<br/>')
  
  # Replace empty lines with placeholder
  df = df.fillna('-')
    
  data = df.to_dict(orient='records')
  
  # Create output filename 
  filename = os.path.basename(filepath)
  # Create output directory path
  json_dir = os.path.join(os.path.dirname(os.getcwd()), "utils/json")
  os.makedirs(json_dir, exist_ok=True)  # Create directory if it doesn't exist
  output_path = os.path.join(json_dir, os.path.splitext(filename)[0] + ".json")
  
  # Write JSON data to file (only if data exists)
  if data:
    with open(output_path, 'w') as f:
      json.dump(data, f, indent=4)
  else:
    print(f"Skipping {filepath} - Empty table found.")

# Get current working directory
current_dir = os.getcwd()

# Get all markdown files in directory (relative to current directory)
output_dir = os.path.join(current_dir, "markdown")
for filename in os.listdir(output_dir):
  if filename.endswith(".md"):
    filepath = os.path.join(output_dir, filename)
    markdown_to_json(filepath)

print("Converted markdown tables to JSON files successfully!")
