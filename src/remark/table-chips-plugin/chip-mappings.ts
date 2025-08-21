// Chip mappings for different content types
export interface ChipMapping {
  [key: string]: {
    color: string;
    type: string;
  };
}

export const chipMappings: ChipMapping = {
  // Damage Types (9 total)
  'acid': { color: 'lime', type: 'damage' },
  'blast': { color: 'orange', type: 'damage' },
  'fire': { color: 'red', type: 'damage' },
  'frost': { color: 'cyan', type: 'damage' },
  'lightning': { color: 'yellow', type: 'damage' },
  'necrotic': { color: 'purple', type: 'damage' },
  'poison': { color: 'green', type: 'damage' },
  'psychic': { color: 'pink', type: 'damage' },
  'radiant': { color: 'gold', type: 'damage' },

  // Skills (16 total)
  'Athletics': { color: 'orange', type: 'skill' },
  'Crafting': { color: 'brown', type: 'skill' },
  'Nature': { color: 'green', type: 'skill' },
  'Survival': { color: 'olive', type: 'skill' },
  'Fighting': { color: 'red', type: 'skill' },
  'Fortitude': { color: 'maroon', type: 'skill' },
  'Perception': { color: 'blue', type: 'skill' },
  'Arcana': { color: 'purple', type: 'skill' },
  'Influence': { color: 'gold', type: 'skill' },
  'Lore': { color: 'navy', type: 'skill' },
  'Mysticism': { color: 'indigo', type: 'skill' },
  'Insight': { color: 'teal', type: 'skill' },
  'Stealth': { color: 'grey', type: 'skill' },
  'Streetwise': { color: 'slate', type: 'skill' },
  'Education': { color: 'blue', type: 'skill' },
  'Archery': { color: 'tan', type: 'skill' },

  // Weapon Categories (9 total)
  'Axe': { color: 'brown', type: 'weapon' },
  'Blade': { color: 'silver', type: 'weapon' },
  'Bow': { color: 'tan', type: 'weapon' },
  'Brawling': { color: 'orange', type: 'weapon' },
  'Crossbow': { color: 'copper', type: 'weapon' },
  'Mace': { color: 'grey', type: 'weapon' },
  'Polearm': { color: 'bronze', type: 'weapon' },
  'Shield': { color: 'steel', type: 'weapon' },
  'Thrown': { color: 'amber', type: 'weapon' },

  // Attributes (4 total)
  'Strength': { color: 'red', type: 'attribute' },
  'STR': { color: 'red', type: 'attribute' },
  'Agility': { color: 'green', type: 'attribute' },
  'AGI': { color: 'green', type: 'attribute' },
  'Spirit': { color: 'blue', type: 'attribute' },
  'SPI': { color: 'blue', type: 'attribute' },
  'Mind': { color: 'purple', type: 'attribute' },
  'MND': { color: 'purple', type: 'attribute' },
};