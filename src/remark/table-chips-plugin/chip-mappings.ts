// Chip mappings for different content types
export interface ChipMapping {
  [key: string]: {
    color: string;
    type: string;
    displayText?: string;
  };
}

export const chipMappings: ChipMapping = {
  // Damage Types (9 total) - More pastel colors
  'acid': { color: 'lime-pastel', type: 'damage' },
  'blast': { color: 'orange-pastel', type: 'damage' },
  'fire': { color: 'red-pastel', type: 'damage' },
  'frost': { color: 'cyan-pastel', type: 'damage' },
  'lightning': { color: 'yellow-pastel', type: 'damage' },
  'necrotic': { color: 'purple-pastel', type: 'damage' },
  'poison': { color: 'green-pastel', type: 'damage' },
  'psychic': { color: 'pink-pastel', type: 'damage' },
  'radiant': { color: 'gold-pastel', type: 'damage' },

  // Skills (16 total) - More pastel colors
  'Athletics': { color: 'orange-pastel', type: 'skill' },
  'Crafting': { color: 'brown-pastel', type: 'skill' },
  'Nature': { color: 'green-pastel', type: 'skill' },
  'Survival': { color: 'olive-pastel', type: 'skill' },
  'Fighting': { color: 'red-pastel', type: 'skill' },
  'Fortitude': { color: 'maroon-pastel', type: 'skill' },
  'Perception': { color: 'blue-pastel', type: 'skill' },
  'Arcana': { color: 'purple-pastel', type: 'skill' },
  'Influence': { color: 'gold-pastel', type: 'skill' },
  'Lore': { color: 'navy-pastel', type: 'skill' },
  'Mysticism': { color: 'indigo-pastel', type: 'skill' },
  'Insight': { color: 'teal-pastel', type: 'skill' },
  'Stealth': { color: 'grey-pastel', type: 'skill' },
  'Streetwise': { color: 'slate-pastel', type: 'skill' },
  'Education': { color: 'blue-pastel', type: 'skill' },
  'Archery': { color: 'tan-pastel', type: 'skill' },

  // Weapon Categories (9 total) - More pastel colors
  'Axe': { color: 'brown-pastel', type: 'weapon' },
  'Blade': { color: 'silver-pastel', type: 'weapon' },
  'Bow': { color: 'tan-pastel', type: 'weapon' },
  'Brawling': { color: 'orange-pastel', type: 'weapon' },
  'Crossbow': { color: 'copper-pastel', type: 'weapon' },
  'Mace': { color: 'grey-pastel', type: 'weapon' },
  'Polearm': { color: 'bronze-pastel', type: 'weapon' },
  'Shield': { color: 'steel-pastel', type: 'weapon' },
  'Thrown': { color: 'amber-pastel', type: 'weapon' },

  // Attributes (4 total) - New colors as requested: STR -> red, AGI -> green, SPI -> light purple, MND -> blue
  'Strength': { color: 'red', type: 'attribute' },
  'STR': { color: 'red', type: 'attribute' },
  'Agility': { color: 'green', type: 'attribute' },
  'AGI': { color: 'green', type: 'attribute' },
  'Spirit': { color: 'light-purple', type: 'attribute' },
  'SPI': { color: 'light-purple', type: 'attribute' },
  'Mind': { color: 'blue', type: 'attribute' },
  'MND': { color: 'blue', type: 'attribute' },
};