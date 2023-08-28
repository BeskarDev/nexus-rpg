# Converting huge markdown tables into multiple smaller ones

HowTo:

- go to table in notion
- make sure columns with empty values are at the right most position OR manually replace `"></td>` with `">-</td>` in html table
- make sure multi-select type columns are converted to text (and reverse after export)
- export as HTML
- go to [https://tableconvert.com/html-to-markdown](https://tableconvert.com/html-to-markdown)
- replace `\n` with `<br/>`
- put name column into the left most position
- check:
    - [✓] First row as headers
    - [✓] Use simple Markdown table
    - [✓] Bold first row
    - [✓] Bold first column
- copy into input.md