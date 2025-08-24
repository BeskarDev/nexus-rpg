import { CombatArt } from '@site/src/types/CombatArt'
import { Creature, Attack, Ability } from '@site/src/types/Creature'
import { Character } from '@site/src/types/Character'

/**
 * Test fixtures for Combat Arts and Creature testing
 * Provides sample data for testing combat-related tools
 */

export const createMockCombatArts = (): CombatArt[] => [
  {
    name: 'Power Attack',
    skill: 'Fighting',
    weaponTypes: ['Sword', 'Axe', 'Mace'],
    ranks: 3,
    description: 'Trade accuracy for raw power.',
    effect: 'Take +1 bane on attack rolls to deal +2 weapon damage.',
    ranks2: 'Take +2 banes to deal +4 weapon damage.',
    ranks3: 'Take +3 banes to deal +6 weapon damage.'
  },
  {
    name: 'Precise Strike',
    skill: 'Fighting',
    weaponTypes: ['Rapier', 'Dagger'],
    ranks: 2,
    description: 'Target weak points with surgical precision.',
    effect: 'Ignore half of target\'s armor value (rounded up).',
    ranks2: 'Ignore all of target\'s armor value.'
  },
  {
    name: 'Rapid Shot',
    skill: 'Archery',
    weaponTypes: ['Bow', 'Crossbow'],
    ranks: 3,
    description: 'Fire multiple projectiles in quick succession.',
    effect: 'Make an additional attack as a Quick Action.',
    ranks2: 'Make two additional attacks as Quick Actions.',
    ranks3: 'Make three additional attacks as Quick Actions.'
  }
]

export const createCharacterWithCombatArts = (): Character => ({
  id: 'test-warrior-character',
  personal: {
    playerName: 'Test Player',
    characterName: 'Master Warrior',
    background: 'Soldier',
    ancestry: 'Human',
    description: 'A skilled combatant'
  },
  statistics: {
    attributes: {
      strength: 'd12',
      agility: 'd10',
      spirit: 'd8',
      mind: 'd6'
    },
    hitPoints: { current: 55, maximum: 55 },
    resolve: { current: 3, maximum: 3 },
    focus: { current: 6, maximum: 6 },
    armorValue: 6,
    defenses: {
      parry: 14,
      dodge: 12,
      resist: 8
    },
    statusEffects: [],
    experience: {
      spent: 60,
      total: 60
    }
  },
  skills: {
    general: {
      athletics: 3,
      fortitude: 3,
      influence: 2,
      insight: 1,
      perception: 2,
      stealth: 1
    },
    expert: {
      arcana: 0,
      archery: 3,
      crafting: 1,
      education: 1,
      fighting: 4,
      lore: 0,
      mysticism: 0,
      nature: 1,
      streetwise: 2,
      survival: 2
    }
  },
  combatArts: [
    { name: 'Power Attack', rank: 3 },
    { name: 'Precise Strike', rank: 2 },
    { name: 'Rapid Shot', rank: 1 }
  ],
  spells: {
    arcane: [],
    mystic: []
  },
  equipment: {
    weapons: [
      {
        name: 'Longsword',
        type: 'Sword',
        damage: '6',
        properties: ['versatile'],
        quality: 3,
        load: 2
      }
    ],
    items: [],
    armorAndShields: [],
    load: 2
  },
  companions: []
})

export const createMockCreatures = (): Creature[] => [
  {
    name: 'Goblin Warrior',
    category: 'Basic',
    size: 'Small',
    type: 'Humanoid',
    tier: 1,
    hitPoints: '10',
    armorValue: 2,
    attributes: {
      strength: 'd6',
      agility: 'd8',
      spirit: 'd6',
      mind: 'd6'
    },
    defenses: {
      parry: 8,
      dodge: 9,
      resist: 7
    },
    skills: ['Fighting (1)', 'Stealth (2)', 'Survival (1)'],
    immunities: [],
    resistances: [],
    weaknesses: [],
    attacks: [
      {
        name: 'Rusty Scimitar',
        properties: ['slash'],
        damage: '3/5/7',
        description: 'A crude but effective blade.'
      }
    ],
    abilities: [
      {
        name: 'Pack Tactics',
        description: 'Gains +1 boon on attack rolls when allies are adjacent to the target.'
      }
    ]
  },
  {
    name: 'Ancient Dragon',
    category: 'Lord',
    size: 'Gargantuan',
    type: 'Dragon',
    tier: 10,
    hitPoints: '3×100',
    armorValue: 20,
    attributes: {
      strength: 'd12+2',
      agility: 'd12',
      spirit: 'd12+2',
      mind: 'd12+1'
    },
    defenses: {
      parry: 18,
      dodge: 16,
      resist: 18
    },
    skills: ['Fighting (5)', 'Arcana (5)', 'Perception (5)', 'Intimidation (5)'],
    immunities: ['fire', 'frightened', 'charmed'],
    resistances: ['physical'],
    weaknesses: ['cold'],
    attacks: [
      {
        name: 'Massive Claws',
        properties: ['reach', 'crush'],
        damage: '12/16/20',
        description: 'Devastating claws that can rend through steel.'
      },
      {
        name: 'Fire Breath',
        properties: ['blast', 'line'],
        damage: '15/20/25',
        description: 'A torrent of dragonfire that incinerates everything in its path.',
        range: 'Long'
      }
    ],
    abilities: [
      {
        name: 'Lord Trigger - Draconic Fury',
        description: 'When a life pool is depleted, all attributes increase by one die size and gain +3 weapon damage.'
      },
      {
        name: 'Legendary Resistance',
        description: 'Can automatically succeed on any resistance roll 3 times per day.'
      },
      {
        name: 'Frightful Presence',
        description: 'All creatures within Long range must make Spirit + Fortitude vs TN 16 or become frightened.'
      }
    ]
  }
]

export const createValidCreatureMarkdown = (): string => `
### **Goblin Warrior** (Small Humanoid)

**Tier:** 1 (Basic)

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 10 | 2  | d6 | d8 | d6 | d6  | 8     | 9     | 7      |

**Skills:** Fighting (1), Stealth (2), Survival (1)

**Attacks:**

- **Rusty Scimitar** (*slash*). 3/5/7 damage. A crude but effective blade.

**Abilities:**

- **Pack Tactics.** Gains +1 boon on attack rolls when allies are adjacent to the target.

---

### **Ancient Dragon** (Gargantuan Dragon)

**Tier:** 10 (Lord)

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 3×100 | 20 | d12+2 | d12 | d12+2 | d12+1 | 18 | 16 | 18 |

**Skills:** Fighting (5), Arcana (5), Perception (5), Intimidation (5)

**Immunities:** fire, frightened, charmed
**Resistances:** physical
**Weaknesses:** cold

**Attacks:**

- **Massive Claws** (*reach, crush*). 12/16/20 damage. Devastating claws that can rend through steel.
- **Fire Breath** (*blast, line*). 15/20/25 damage (Long range). A torrent of dragonfire that incinerates everything in its path.

**Abilities:**

- **Lord Trigger - Draconic Fury.** When a life pool is depleted, all attributes increase by one die size and gain +3 weapon damage.
- **Legendary Resistance.** Can automatically succeed on any resistance roll 3 times per day.
- **Frightful Presence.** All creatures within Long range must make Spirit + Fortitude vs TN 16 or become frightened.
`

export const createInvalidCreatureMarkdown = (): string => `
### **Invalid Creature** (No Type)

**Tier:** Not a number

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| invalid | text | data | here | bad | format | wrong | bad | terrible |

**Skills:** No proper format

**Attacks:**

- **Bad Attack**. No damage values.

**Abilities:**

- Incomplete ability description
`

export const createComplexCreatureMarkdown = (): string => `
### **Elite Orc Champion** (Medium Humanoid)

**Tier:** 4 (Elite)

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 2×40 | 8 | d10 | d8 | d8 | d6 | 12 | 10 | 8 |

**Skills:** Fighting (3), Athletics (2), Intimidation (3), Survival (2)

**Immunities:** frightened
**Resistances:** physical (half damage)
**Weaknesses:** fire (double damage)

**Attacks:**

- **Massive Greataxe** (*two-handed, slash, crush*). 6/10/14 damage. A weapon of incredible size and weight.
- **Shield Bash** (*crush*). 4/6/8 damage. Uses shield as a weapon.

**Abilities:**

- **Elite Trigger - Berserker Rage.** When first life pool is depleted, gain +2 to all attributes and immunity to conditions for remainder of combat.
- **Intimidating Presence.** Adjacent enemies take +1 bane on attack rolls.
- **Shield Wall (Quick Action, Reactive).** When targeted by ranged attack, gain +4 AV against that attack.
`

export const createCharacterWithoutCombatArts = (): Character => ({
  id: 'test-scholar-character',
  personal: {
    playerName: 'Test Player',
    characterName: 'Learned Scholar',
    background: 'Academic',
    ancestry: 'Elf',
    description: 'A bookish intellectual'
  },
  statistics: {
    attributes: {
      strength: 'd6',
      agility: 'd6',
      spirit: 'd10',
      mind: 'd12'
    },
    hitPoints: { current: 30, maximum: 30 },
    resolve: { current: 3, maximum: 3 },
    focus: { current: 14, maximum: 14 },
    armorValue: 1,
    defenses: {
      parry: 7,
      dodge: 7,
      resist: 14
    },
    statusEffects: [],
    experience: {
      spent: 40,
      total: 40
    }
  },
  skills: {
    general: {
      athletics: 0,
      fortitude: 1,
      influence: 3,
      insight: 4,
      perception: 3,
      stealth: 1
    },
    expert: {
      arcana: 4,
      archery: 0,
      crafting: 0,
      education: 5,
      fighting: 0,
      lore: 4,
      mysticism: 0,
      nature: 2,
      streetwise: 0,
      survival: 0
    }
  },
  combatArts: [], // No combat arts
  spells: {
    arcane: [
      { name: 'Read Magic', prepared: true },
      { name: 'Detect Magic', prepared: true }
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

export const createValidCombatArtCharacterJson = (): string => 
  JSON.stringify(createCharacterWithCombatArts(), null, 2)

export const createCreatureMarkdownFile = (): string => 
  createValidCreatureMarkdown()

export const createLargeCreatureMarkdown = (): string => {
  let markdown = ''
  for (let i = 1; i <= 5; i++) {
    markdown += `
### **Test Creature ${i}** (Medium Humanoid)

**Tier:** ${i} (Basic)

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| ${i * 10} | ${i} | d${6 + i * 2 > 12 ? 12 : 6 + i * 2} | d8 | d8 | d6 | ${6 + i} | ${7 + i} | ${6 + i} |

**Skills:** Fighting (${i}), Perception (${i})

**Attacks:**

- **Basic Attack**. ${i + 2}/${i + 4}/${i + 6} damage. A standard attack.

**Abilities:**

- **Test Ability ${i}.** This creature has ability number ${i}.

---
`
  }
  return markdown
}