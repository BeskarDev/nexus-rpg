import subprocess
from pathlib import Path

# Calculate paths relative to this script
script_dir = Path(__file__).parent
utils_dir = script_dir.parent.parent

def split_tables(table_dict):
  """
  Splits markdown tables based on a given column.

  Args:
      table_dict: A dictionary where keys are input file paths and values are column names to split by.
  """

  for input_file, (split_column, header_size) in table_dict.items():
      markdown_path = utils_dir / 'data' / 'markdown' / input_file
      subprocess.run(["python3", str(script_dir / "split-table.py"), str(markdown_path), split_column, "--header_size", header_size])

if __name__ == "__main__":
  table_dict = {
      "armor.md": ("Type", "###"),
      "equipment.md": ("Category", "##"),
      "talents.md": ("Skill Requirement", "##"),
      "weapons.md": ("Type", "###"),
      "combat-arts.md": ("Category", "###"),
  }

  split_tables(table_dict)
