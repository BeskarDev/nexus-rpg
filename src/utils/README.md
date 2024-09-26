# Converting huge markdown tables into multiple smaller ones

HowTo:

- go to table in notion and export as HTML
- rename resulting `.html` file to fitting name
- paste file to `src/utils/input`
- execute `python html-to-md.py <file-path>` and set your relative file-path accordingly
- the result will be written into `src/utils/markdown`
- in some cases, you are done now. Some other tables require additional transformations:
  - talents, items, weapons, armor: `python split-table.py <file-path> <split-column-name>`
  - arcane spells: `python transform-arcane-spell-table.py`
  - mystic spells: `python transform-mystic-spell-table.py`
- At the end, paste the contents into the corresponding docs page.
