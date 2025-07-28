import os
import argparse
import pandas as pd
from bs4 import BeautifulSoup
import re

def fix_multiple_tags(text):
    """Fixes multiple occurrences of HTML tags in a string."""

    pattern = r"(<(?:strong|em)>)\1+"  # Handle multiple opening tags
    text = re.sub(pattern, r"\1", text)

    pattern = r"(</(?:strong|em)>)\1+"  # Handle multiple closing tags
    text = re.sub(pattern, r"\1", text)

    return text


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
    for cell_index, cell in enumerate(row.find_all('td')):
      cell_text = str(cell)
          
      # Check if cell belongs to "Properties" column
      if headers and (headers[cell_index] == "Properties" or headers[cell_index] == "Weapons" or headers[cell_index] == "Skills" or headers[cell_index] == "Immunities" or headers[cell_index] == "Resistances" or headers[cell_index] == "Weaknesses" or headers[cell_index] == "Suggested Skills"):
          # Combine text from all span elements within the cell
          properties = [str(span.text.strip()) for span in cell.find_all('span')]
          properties.sort()
          cell_text = ", ".join(properties)
      else:
          # Remove tags for other cells
          TAG_RE =re.compile(r'<(?!(br\s*\/?|strong|\/strong|em|\/em))[^>]+>')
          cell_text = TAG_RE.sub('', cell_text)
          cell_text = re.sub(r'\xa0', ' ', cell_text)
          
          # Fix too many tags / order of tags
          cell_text = fix_multiple_tags(cell_text)
          cell_text = cell_text.replace('(<br/>', '(')
          cell_text = cell_text.replace('<strong><br/><br/></strong>', '')
          cell_text = cell_text.replace('<strong><br/>', '<br/><strong>')
          cell_text = cell_text.replace('<br/></strong>', '</strong>')
          cell_text = cell_text.replace('<em><br/><br/></em>', '')
          cell_text = cell_text.replace('<br/><br/><br/><br/><br/>', '<br/><br/>')
          cell_text = cell_text.replace('<br/><br/><br/><br/>', '<br/><br/>')
          cell_text = cell_text.replace('<br/><br/><br/>', '<br/><br/>')
          
          # Fix formatting
          cell_text = cell_text.replace('<br/><br/><strong>Weak.', '<br/><strong>Weak.').replace('<br/><br/><strong>Strong.', '<br/><strong>Strong.').replace('<br/><br/><strong>Critical.', '<br/><strong>Critical.')
          cell_text = cell_text.replace('<br/> <br/><br/>', '<br/><br/>')
          cell_text = cell_text.replace('<br/><br/><strong><br/>', '<br/><br/><strong>')
          cell_text = cell_text.replace('- <br/>', '- ')
          cell_text = cell_text.replace('<br/><strong>- </strong>', '- ')
          
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

  if 'Name' in df.columns:
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


if __name__ == "__main__":
  parser = argparse.ArgumentParser(description="Convert HTML to Markdown")
  parser.add_argument("input_dir", default="input", nargs="?", help="Path to the input directory (default: input)")
  args = parser.parse_args()

  input_dir = os.path.abspath(args.input_dir)

  if not os.path.exists(input_dir):
      print(f"Error: Input directory '{input_dir}' does not exist.")
      exit(1)

  for filename in os.listdir(input_dir):
      input_file = os.path.join(input_dir, filename)

      if os.path.isfile(input_file):
          # Convert file to DataFrame
          df = html_table_to_dataframe(input_file)

          # Get filename without extension
          filename, extension = os.path.splitext(filename)

          # Create output directory if it doesn't exist
          output_dir = os.path.join(os.getcwd(), "markdown")
          if not os.path.exists(output_dir):
              os.makedirs(output_dir)

          # Create output filename with markdown extension
          output_file = os.path.join(output_dir, filename + ".md")

          df_to_markdown(df, output_file)

          print(f"Successfully converted {filename}!")
