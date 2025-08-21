// Chip mappings for different content types
export interface ChipMapping {
  [key: string]: {
    color: string;
    type: string;
  };
}

export const chipMappings: ChipMapping = {
  // Damage Types
  'acid': { color: 'green', type: 'damage' },
  'fire': { color: 'red', type: 'damage' },
  'frost': { color: 'blue', type: 'damage' },
  'lightning': { color: 'yellow', type: 'damage' },
  'necrotic': { color: 'purple', type: 'damage' },
  'poison': { color: 'green', type: 'damage' },
  'psychic': { color: 'purple', type: 'damage' },
  'radiant': { color: 'yellow', type: 'damage' },

  // Skills
  'Athletics': { color: 'orange', type: 'skill' },
  'Crafting': { color: 'brown', type: 'skill' },
  'Nature': { color: 'green', type: 'skill' },
  'Survival': { color: 'green', type: 'skill' },
  'Fighting': { color: 'red', type: 'skill' },
  'Fortitude': { color: 'orange', type: 'skill' },
  'Perception': { color: 'blue', type: 'skill' },
  'Arcana': { color: 'purple', type: 'skill' },
  'Influence': { color: 'yellow', type: 'skill' },
  'Lore': { color: 'blue', type: 'skill' },
  'Mysticism': { color: 'purple', type: 'skill' },
  'Insight': { color: 'blue', type: 'skill' },
  'Stealth': { color: 'grey', type: 'skill' },
  'Streetwise': { color: 'grey', type: 'skill' },
  'Education': { color: 'blue', type: 'skill' },
  'Archery': { color: 'brown', type: 'skill' },

  // Weapon Categories
  'Axe': { color: 'brown', type: 'weapon' },
  'Blade': { color: 'grey', type: 'weapon' },
  'Bow': { color: 'brown', type: 'weapon' },
  'Brawling': { color: 'orange', type: 'weapon' },
  'Crossbow': { color: 'brown', type: 'weapon' },
  'Mace': { color: 'grey', type: 'weapon' },
  'Polearm': { color: 'brown', type: 'weapon' },
  'Shield': { color: 'blue', type: 'weapon' },
  'Thrown': { color: 'orange', type: 'weapon' },
};