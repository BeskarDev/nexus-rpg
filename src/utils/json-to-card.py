import json

from PIL import Image, ImageDraw, ImageFont

# Define card dimensions and font size
card_width = 300
card_height = 200
font_size = 16

# Load background image for the card (optional)
# background_image = Image.open("card_background.png").resize((card_width, card_height))

# Open the JSON file
with open("json/combat-arts.json", "r") as f:
    data = json.load(f)

# Loop through each entry in the JSON data
for entry in data:
    # Create a new image for the card
    card_image = Image.new("RGB", (card_width, card_height), color="white")
    draw = ImageDraw.Draw(card_image)

    # Draw card name
    draw.text((10, 10), f"{entry['Name']}", fill="black")

    # Draw weapon compatibility
    draw.text((10, font_size + 15), f"Weapons: {entry['Weapons']}", fill="black")

    # Draw effect description
    effect_text = entry["Effect"].split("\n")
    for line in effect_text:
        draw.text((10, card_height - font_size * len(effect_text) + effect_text.index(line) * font_size), line, fill="black")

    # Save the card image (replace "card_name.png" with desired filename)
    card_image.save(f"{entry['Name']}.png")

print("Playing cards generated successfully!")
