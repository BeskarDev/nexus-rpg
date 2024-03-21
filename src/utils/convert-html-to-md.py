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
      cell_text = cell_text.replace('Weak.<br/>', 'Weak.').replace('Strong.<br/>', 'Strong.').replace('Critical.<br/>', 'Critical.')
      cell_text = cell_text.replace('<br/><br/>Weak.', '<br/>**Weak.**').replace('<br/><br/>Strong.', '<br/>**Strong.**').replace('<br/><br/>Critical.', '<br/>**Critical.**')
      cell_text = cell_text.replace('<br/>Weak.', '<br/>**Weak.**').replace('<br/>Strong.', '<br/>**Strong.**').replace('<br/>Critical.', '<br/>**Critical.**')
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


def df_to_markdown(df, filename):
  """
  This function takes a pandas dataframe and saves it as a markdown file.

  Args:
      df (pandas.DataFrame): The dataframe to be converted.
      filename (str): The name of the output markdown file.
  """
  df = df.dropna()

  # Reorder columns with 'Name' as the first column
  df = df[['Name'] + list(df.drop('Name', axis=1))]

  # Wrap 'Name' column values in bold markdown syntax
  df['Name'] = df['Name'].map('**{}**'.format)

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

  # Save the markdown table to a file
  with open(filename, 'w') as f:
    f.write(markdown_table)


# Example usage
df = html_table_to_dataframe("input.html")
df_to_markdown(df, "output.md")

# Print confirmation message
print("Successfully converted HTML table to markdown file with Github formatting!")
