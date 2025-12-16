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
  
  # Determine the JSON output directory (support both running from data/ and utils/)
  current_dir = os.getcwd()
  if os.path.basename(current_dir) == 'data':
    # Running from data/ directory - JSON goes in data/json/
    json_dir = os.path.join(current_dir, "json")
  elif os.path.basename(current_dir) == 'utils':
    # Running from utils/ directory - JSON goes in data/json/
    json_dir = os.path.join(current_dir, "data", "json")
  else:
    # Fallback: assume json directory is at current_dir/json
    json_dir = os.path.join(current_dir, "json")
  
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

# Determine the markdown directory (support both running from data/ and utils/)
if os.path.basename(current_dir) == 'data':
    # Running from data/ directory - markdown is in the same directory
    markdown_dir = os.path.join(current_dir, "markdown")
elif os.path.basename(current_dir) == 'utils':
    # Running from utils/ directory - markdown is in data/markdown/
    markdown_dir = os.path.join(current_dir, "data", "markdown")
else:
    # Fallback: assume markdown is at current_dir/markdown
    markdown_dir = os.path.join(current_dir, "markdown")

# Verify the markdown directory exists
if not os.path.exists(markdown_dir):
    print(f"Error: Markdown directory not found at {markdown_dir}")
    exit(1)

for filename in os.listdir(markdown_dir):
    if filename.endswith(".md"):
        filepath = os.path.join(markdown_dir, filename)
        markdown_to_json(filepath)

print("Converted markdown tables to JSON files successfully!")
