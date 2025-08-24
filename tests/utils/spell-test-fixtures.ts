import { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import { MysticSpell } from '@site/src/types/MysticSpell'
import { Character } from '@site/src/types/Character'

/**
 * Test fixtures for spell-related testing
 * Provides sample data for ArcaneSpells and MysticSpells tools
 */

export const createMockArcaneSpells = (): ArcaneSpell[] => [
  {
    name: 'Magic Missile',
    rank: 1,
    discipline: 'Evocation',
    castTime: '1 Action',
    range: 'Medium',
    duration: 'Briefly',
    focus: 2,
    description: 'Create bolts of arcane energy that strike unerringly.',
    effect: 'Deal +4/+8/+12 force damage.',
    heighten: 'Deal +2 additional damage per rank above 1st.'
  },
  {
    name: 'Fireball',
    rank: 3,
    discipline: 'Evocation',
    castTime: '1 Action',
    range: 'Long',
    duration: 'Briefly',
    focus: 6,
    description: 'Hurl an explosive sphere of flame.',
    effect: 'Deal +8/+16/+24 fire damage in a large area.',
    heighten: 'Deal +4 additional damage per rank above 3rd.'
  },
  {
    name: 'Invisibility',
    rank: 2,
    discipline: 'Illusion',
    castTime: '1 Action',
    range: 'Touch',
    duration: 'Medium',
    focus: 4,
    description: 'Render a creature invisible to normal sight.',
    effect: 'Target becomes invisible until they attack or cast a spell.'
  }
]

export const createMockMysticSpells = (): MysticSpell[] => [
  {
    name: 'Heal',
    rank: 1,
    tradition: 'Life',
    castTime: '1 Action',
    range: 'Touch',
    duration: 'Briefly',
    focus: 2,
    description: 'Channel positive energy to heal wounds.',
    effect: 'Restore +4/+8/+12 hit points.',
    heighten: 'Restore +2 additional hit points per rank above 1st.'
  },
  {
    name: 'Sanctuary',
    rank: 2,
    tradition: 'Peace',
    castTime: '1 Action',
    range: 'Touch',
    duration: 'Short',
    focus: 4,
    description: 'Ward a creature with protective energy.',
    effect: 'Attackers must succeed on Spirit + Mysticism vs. TN 10 to target the warded creature.'
  },
  {
    name: 'Call Lightning',
    rank: 3,
    tradition: 'Tempest',
    castTime: '1 Action',
    range: 'Long',
    duration: 'Briefly',
    focus: 6,
    description: 'Call down a bolt of lightning from the sky.',
    effect: 'Deal +8/+16/+24 lightning damage.'
  }
]

export const createCharacterWithArcaneSpells = (): Character => ({
  id: 'test-arcane-character',
  personal: {
    playerName: 'Test Player',
    characterName: 'Arcane Wizard',
    background: 'Scholar',
    ancestry: 'Human',
    description: 'A powerful wizard'
  },
  statistics: {
    attributes: {
      strength: 'd6',
      agility: 'd8',
      spirit: 'd10',
      mind: 'd12'
    },
    hitPoints: { current: 45, maximum: 45 },
    resolve: { current: 3, maximum: 3 },
    focus: { current: 12, maximum: 12 },
    armorValue: 2,
    defenses: {
      parry: 8,
      dodge: 10,
      resist: 14
    },
    statusEffects: [],
    experience: {
      spent: 50,
      total: 50
    }
  },
  skills: {
    general: {
      athletics: 2,
      fortitude: 1,
      influence: 3,
      insight: 2,
      perception: 3,
      stealth: 1
    },
    expert: {
      arcana: 4,
      archery: 0,
      crafting: 1,
      education: 3,
      fighting: 1,
      lore: 2,
      mysticism: 0,
      nature: 0,
      streetwise: 1,
      survival: 0
    }
  },
  spells: {
    arcane: [
      { name: 'Magic Missile', prepared: true },
      { name: 'Fireball', prepared: true },
      { name: 'Invisibility', prepared: false }
    ],
    mystic: []
  },
  equipment: {
    weapons: [],
    items: [],
    armorAndShields: [],
    load: 0
  },
  companions: []
})

export const createCharacterWithMysticSpells = (): Character => ({
  id: 'test-mystic-character',
  personal: {
    playerName: 'Test Player',
    characterName: 'Divine Cleric',
    background: 'Acolyte',
    ancestry: 'Elf',
    description: 'A faithful healer'
  },
  statistics: {
    attributes: {
      strength: 'd8',
      agility: 'd6',
      spirit: 'd12',
      mind: 'd10'
    },
    hitPoints: { current: 40, maximum: 40 },
    resolve: { current: 3, maximum: 3 },
    focus: { current: 14, maximum: 14 },
    armorValue: 4,
    defenses: {
      parry: 9,
      dodge: 8,
      resist: 12
    },
    statusEffects: [],
    experience: {
      spent: 45,
      total: 45
    }
  },
  skills: {
    general: {
      athletics: 1,
      fortitude: 3,
      influence: 2,
      insight: 3,
      perception: 2,
      stealth: 0
    },
    expert: {
      arcana: 0,
      archery: 1,
      crafting: 0,
      education: 2,
      fighting: 2,
      lore: 1,
      mysticism: 4,
      nature: 2,
      streetwise: 0,
      survival: 1
    }
  },
  spells: {
    arcane: [],
    mystic: [
      { name: 'Heal', prepared: true },
      { name: 'Sanctuary', prepared: true },
      { name: 'Call Lightning', prepared: false }
    ]
  },
  equipment: {
    weapons: [],
    items: [],
    armorAndShields: [],
    load: 0
  },
  companions: []
})

export const createCharacterWithoutSpells = (): Character => ({
  id: 'test-warrior-character',
  personal: {
    playerName: 'Test Player',
    characterName: 'Mighty Warrior',
    background: 'Soldier',
    ancestry: 'Dwarf',
    description: 'A stalwart fighter'
  },
  statistics: {
    attributes: {
      strength: 'd12',
      agility: 'd10',
      spirit: 'd8',
      mind: 'd6'
    },
    hitPoints: { current: 50, maximum: 50 },
    resolve: { current: 3, maximum: 3 },
    focus: { current: 4, maximum: 4 },
    armorValue: 6,
    defenses: {
      parry: 12,
      dodge: 10,
      resist: 8
    },
    statusEffects: [],
    experience: {
      spent: 40,
      total: 40
    }
  },
  skills: {
    general: {
      athletics: 3,
      fortitude: 3,
      influence: 1,
      insight: 1,
      perception: 2,
      stealth: 0
    },
    expert: {
      arcana: 0,
      archery: 2,
      crafting: 1,
      education: 0,
      fighting: 4,
      lore: 0,
      mysticism: 0,
      nature: 1,
      streetwise: 1,
      survival: 2
    }
  },
  spells: {
    arcane: [],
    mystic: []
  },
  equipment: {
    weapons: [],
    items: [],
    armorAndShields: [],
    load: 0
  },
  companions: []
})

export const createInvalidCharacterJson = (): string => `{
  "invalid": "json structure",
  "missing": "required fields"
}`

export const createValidCharacterJson = (): string => 
  JSON.stringify(createCharacterWithArcaneSpells(), null, 2)

export const createValidMysticCharacterJson = (): string => 
  JSON.stringify(createCharacterWithMysticSpells(), null, 2)