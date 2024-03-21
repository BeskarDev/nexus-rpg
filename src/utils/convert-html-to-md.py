import pandas as pd
from bs4 import BeautifulSoup
import re

def html_table_to_dataframe(html_file):
  """
  This function reads an HTML table from a file and converts it into a Pandas DataFrame,
  using the first row within the table head as the header.

  Args:
      html_file (str): Path to the HTML file containing the table.

  Returns:
      pandas.DataFrame: The DataFrame containing the data from the HTML table.
  """
  # Read the HTML file
  with open(html_file, 'r') as f:
    html_content = f.read()

  # Parse the HTML content
  soup = BeautifulSoup(html_content, 'html.parser')

  # Find the table element
  table = soup.find('table')

  # Find the table head element (if it exists)
  table_head = table.find('thead')

  # Extract headers from the first row within the head (if it exists)
  if table_head:
      headers = [str(cell.text) for cell in table_head.find_all('tr')[0].find_all(['td', 'th'])]
  else:
      # Handle case where there's no table head
      headers = None  # Or provide default headers

  # Create an empty list to store the table data (excluding the header row)
  data = []

  # Extract data from each table row (skip the header row if it exists)
  for row in table.find_all('tr'):
    row_data = []
    for cell in row.find_all('td'):
      # Convert strong elements to markdown format
      cell_text = str(cell)
      TAG_RE = re.compile(r'<(?!br\s*\/?)[^>]+>')
      cell_text = TAG_RE.sub('', cell_text)
      cell_text = cell_text.replace('(<br/>', '(')
      cell_text = cell_text.replace('(Rank 1)', '**(Rank 1)**').replace('(Rank 2)', '**(Rank 2)**').replace('(Rank 3)', '**(Rank 3)**')
      cell_text = cell_text.replace('Battle Stance', '**Battle Stance**')
      cell_text = cell_text.replace('<br/><br/><br/><br/><br/>', '<br/><br/>')
      cell_text = cell_text.replace('<br/><br/><br/><br/>', '<br/><br/>')
      cell_text = cell_text.replace('<br/><br/><br/>', '<br/><br/>')
      row_data.append(cell_text)
    data.append(row_data)

  # Create the DataFrame from the data with the extracted headers (or handle missing headers)
  if headers:
      df = pd.DataFrame(data, columns=headers)
  else:
      # Handle case where there's no table head by providing default column names
      df = pd.DataFrame(data, columns=[f'Column{i+1}' for i in range(len(data[0]))])

  # Return the DataFrame
  return df


def df_to_markdown_github(df, output_file):
  """
  This function converts a Pandas DataFrame to a markdown file with Github flavored table formatting.

  Args:
      df (pandas.DataFrame): The DataFrame to convert.
      output_file (str): Path to the output markdown file.
  """
  # Convert DataFrame to markdown string with Github flavored tables
  md_table = df.to_markdown(index=False, tablefmt='github')

  # Write the markdown string to the output file
  with open(output_file, 'w') as f:
    f.write(md_table)

# Example usage
df = html_table_to_dataframe("input.html")
df_to_markdown_github(df, "output.md")

# Print confirmation message
print("Successfully converted HTML table to markdown file with Github formatting!")
