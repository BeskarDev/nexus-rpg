# Converting huge markdown tables into multiple smaller ones

HowTo:

- go to table in notion
- make sure columns with empty values are at the right most position
- export as HTML
- go to [https://tableconvert.com/html-to-markdown](https://tableconvert.com/html-to-markdown)
- replace \n with <br/>
- put name column into the left most position
- check:
    - [✓] First row as headers
    - [✓] Use simple Markdown table
    - [✓] Bold first row
    - [✓] Bold first column
- copy into input.md