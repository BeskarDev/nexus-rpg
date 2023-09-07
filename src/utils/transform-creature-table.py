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
            formatted_lines.append(f"**- {parts[0]}.** {parts[1]}")
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
            output.append(f"*{row['Size']}, {row['Category']} {row['Type']}* \n\n")
            output.append(f"**Initiative** {row['Initiative']}<br />")

            output.append(f"**HP** {row['HP']}, **AV** {row['AV (Types)']}<br />")

            stat_list = [s.strip() for s in row['Stats'].split('/')]
            if len(stat_list) == 4:
                output.append(f"**STR** {stat_list[0]}, **AGI** {stat_list[1]}, **SPI** {stat_list[2]}, **MND** {stat_list[3]}<br />")

            defense_list = [s.strip() for s in row['Parry / Dodge / Resist'].split('/')]
            if len(defense_list) == 3:
                output.append(f"**Parry** {defense_list[0]}, **Dodge** {defense_list[1]}, **Resist** {defense_list[2]}\n\n")

            output.append(f"**Skills** {row['Skills']}\n\n")

            if row['Resistances'] != '-':
                output.append(f"**Resistances** {row['Resistances']}\n\n")
                
            if row['Weaknesses'] != '-':
                output.append(f"**Weaknesses** {row['Weaknesses']}\n\n")
            
            output.append(f"**Actions**<br />{format_actions_abilities(row['Actions'])}\n\n")
            output.append(f"**Abilities**<br />{format_actions_abilities(row['Abilities'])}\n\n")

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