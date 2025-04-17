import subprocess

def split_tables(table_dict):
  """
  Splits markdown tables based on a given column.

  Args:
      table_dict: A dictionary where keys are input file paths and values are column names to split by.
  """

  for input_file, (split_column, header_size) in table_dict.items():
      subprocess.run(["python", "split-table.py", "markdown/" + input_file, split_column, "--header_size", header_size])

if __name__ == "__main__":
  table_dict = {
      "armor.md": ("Type", "###"),
      "items.md": ("Category", "##"),
      "talents.md": ("Skill Requirement", "##"),
      "weapons.md": ("Type", "##"),
  }

  split_tables(table_dict)
