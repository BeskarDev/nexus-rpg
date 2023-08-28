def process_table_row(row):
    tier, animal_type, category, size, initiative, name, hp, av_types, stats, parry_dodge_resist, skills, weaknesses, resistances, actions, abilities = row.split('|')
    return {
        'Tier': tier.strip(),
        'Type': animal_type.strip(),
        'Category': category.strip(),
        'Size': size.strip(),
        'Initiative': initiative.strip(),
        'Name': name.strip(),
        'HP': hp.strip(),
        'AV (Types)': av_types.strip(),
        'Stats': stats.strip(),
        'Parry / Dodge / Resist': parry_dodge_resist.strip(),
        'Skills': skills.strip(),
        'Weaknesses': weaknesses.strip(),
        'Resistances': resistances.strip(),
        'Actions': actions.strip(),
        'Abilities': abilities.strip()
    }

def format_actions_abilities(text):
    lines = text.split('<br />')
    formatted_lines = []
    
    for line in lines:
        parts = line.split('. ', 1)
        if len(parts) >= 2:
            formatted_lines.append(f"**{parts[0]}.** {parts[1]}")
        else:
            formatted_lines.append(line)
    
    return '<br />'.join(formatted_lines)

def generate_output(data):
    output = []
    
    grouped_data = {}  # Group data by Tier
    for row in data:
        tier = row['Tier']
        if tier in grouped_data:
            grouped_data[tier].append(row)
        else:
            grouped_data[tier] = [row]
    
    for tier, rows in grouped_data.items():
        output.append(f"## Tier {tier}\n\n")
        for row in rows:
            output.append(f"### {row['Name']}\n\n")
            output.append(f"*{row['Size']}, {row['Category']} {row['Type']}*  \n\n")
            output.append("| **Initiative** | **HP** | **AV (Types)** |  \n")
            output.append("|---|---|---|  \n")
            output.append(f"| {row['Initiative']} | {row['HP']} | {row['AV (Types)']} |  \n\n")
            output.append("| **STR** | **AGI** | **SPI** | **MND** |  \n")
            output.append("|---|---|---|---|  \n")
            output.append(f"| {row['Stats'].replace(' / ', ' | ')} |  \n\n")
            output.append("| **Parry** | **Dodge** | **Resist** |  \n")
            output.append("|---|---|---|  \n")
            output.append(f"| {row['Parry / Dodge / Resist'].replace(' / ', ' | ')} |  \n\n")
            output.append(f"**Skills**<br />{row['Skills']}  \n\n")

            if row['Weaknesses'] != '-':
                output.append(f"**Weaknesses**<br />{row['Weaknesses']}  \n\n")
        
            if row['Resistances'] != '-':
                output.append(f"**Resistances**<br />{row['Resistances']}  \n\n")
            
            output.append(f"**Actions**<br />{format_actions_abilities(row['Actions'])}  \n\n")
            output.append(f"**Abilities**<br />{format_actions_abilities(row['Abilities'])}  \n\n")

    return ''.join(output)

# Read input markdown from input.md file
with open('input.md', 'r') as input_file:
    input_markdown = input_file.read()

rows = input_markdown.strip().split('\n')
header_row = rows[0]
rows = rows[2:-1]  # Skip the header and separator line, and remove the footer line
data = [process_table_row(row) for row in rows]
output_markdown = generate_output(data)

# Write the output to output.md file
with open('output.md', 'w') as output_file:
    output_file.write(output_markdown)