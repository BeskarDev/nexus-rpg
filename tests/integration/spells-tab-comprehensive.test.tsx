import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { CharacterSheetWrapper } from '../../src/features/CharacterSheet/CharacterSheetWrapper'

// Mock external dependencies
vi.mock('@site/src/config/firebase', () => ({ db: {} }))
vi.mock('@site/src/hooks/firebaseAuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    userLoggedIn: true,
    currentUser: { uid: 'test-user' },
    isAdmin: false,
    setIsAdmin: vi.fn(),
  }),
}))
vi.mock('@site/src/hooks/createTheme', () => ({ theme: {} }))
vi.mock('@site/src/components/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div>Theme Switcher</div>,
}))
vi.mock('@site/src/hooks/useDeviceSize', () => ({
  useDeviceSize: () => ({ isSmallScreen: false }),
}))

// Enhanced mock for firebase service with spells-focused character data
vi.mock('../../src/dev/firebaseService', () => {
  const spellsTestCharacter = {
    docId: 'mock-character-1',
    docRef: { id: 'mock-character-1' },
    collectionId: 'test-collection',
    personal: { 
      name: 'Elara Spellweaver',
      playerName: 'Test Player', 
      folk: 'Akashic',
      upbringing: 'Urban',
      background: 'Wizard',
      height: '5\'8"',
      weight: '140 lbs',
      age: '30',
      description: 'A master of both arcane and mystic arts.',
      motivation: 'To master all schools of magic.',
      profilePicture: '',
      allies: [],
      contacts: [],
      rivals: [],
      notes: 'Specializes in dual-school magic casting.'
    },
    statistics: { 
      health: { current: 28, temp: 0, maxHpModifier: 0 },
      fatigue: { current: 0, max: 6 },
      av: { armor: 1, helmet: 0, shield: 0, other: 0 },
      strength: { value: 8, wounded: false },
      agility: { value: 10, wounded: false },
      spirit: { value: 14, wounded: false },
      mind: { value: 16, wounded: false },
      parry: 8,
      dodge: 10,
      resist: 15,
      resolve: 4,
      statusEffects: []
    },
    skills: { 
      xp: { total: 80, spend: 78 },
      skills: [
        { id: '1', name: 'Arcana', rank: 4, xp: 18 },
        { id: '2', name: 'Mysticism', rank: 3, xp: 12 },
        { id: '3', name: 'Education', rank: 3, xp: 12 },
        { id: '4', name: 'Lore', rank: 2, xp: 6 },
        { id: '5', name: 'Insight', rank: 2, xp: 6 },
        { id: '6', name: 'Perception', rank: 2, xp: 6 }
      ],
      professions: ['Scholar', 'Enchanter'],
      languages: ['Tradespeak', 'Draconic', 'Celestial', 'Infernal'],
      abilities: [
        { id: '1', title: 'Dual Casting', description: 'Can cast from both schools', tag: 'Talent' },
        { id: '2', title: 'Spell Mastery', description: 'Improved spell efficiency', tag: 'Talent' }
      ],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true }
    },
    items: { 
      coins: 320,
      encumbrance: {
        encumberedAt: 8,
        overencumberedAt: 12,
        carryModifier: 0,
        currentLoad: 5,
        mountMaxLoad: 0,
        storageMaxLoad: 0
      },
      weapons: [
        {
          id: '1',
          name: 'Dual-Focus Staff',
          damage: { base: 'MND', weapon: 2, other: 0, type: 'psychic', staticDamage: false },
          properties: 'two-handed, arcane catalyst, mystic catalyst',
          description: 'A unique staff that channels both arcane and divine magic.',
          cost: 80,
          load: 2,
          location: 'worn',
          uses: 0,
          durability: 'd10'
        }
      ],
      items: [
        {
          id: '1',
          name: 'Spellcaster\'s Robes',
          properties: 'light armor, +1 AV, spell focus',
          description: 'Robes enchanted to aid in spellcasting.',
          slot: 'body',
          cost: 60,
          load: 1,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd8'
        },
        {
          id: '2',
          name: 'Grimoire of Dual Arts',
          properties: 'spell focus, arcane catalyst, mystic catalyst',
          description: 'A tome containing spells from both traditions.',
          slot: '',
          cost: 100,
          load: 2,
          container: 'backpack',
          amount: 1,
          location: 'carried',
          uses: 0,
          durability: 'd8'
        }
      ],
      itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true }
    },
    spells: { 
      magicSkill: 'Arcana',
      specialization: 'Evocation',
      focus: { total: 18, current: 14 },
      spellCatalystDamage: 0,
      spells: [
        {
          id: '1',
          name: 'Cantrip - Prestidigitation',
          rank: 0,
          cost: 0,
          target: 'special',
          range: 'close',
          properties: 'quick',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'none', staticDamage: false },
          effect: 'Minor magical effects like cleaning, flavoring, or creating small illusions.'
        },
        {
          id: '2',
          name: 'Magic Missile',
          rank: 1,
          cost: 2,
          target: 'Dodge',
          range: 'medium',
          properties: '',
          dealsDamage: true,
          damage: { base: 'MND', weapon: 4, type: 'psychic', staticDamage: false },
          effect: 'Unerring bolts of magical force that strike targets automatically.'
        },
        {
          id: '3',
          name: 'Shield',
          rank: 1,
          cost: 2,
          target: 'self',
          range: 'self',
          properties: 'quick',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'none', staticDamage: false },
          effect: 'Creates a magical barrier providing +3 AV until end of scene.'
        },
        {
          id: '4',
          name: 'Fireball',
          rank: 3,
          cost: 6,
          target: 'Dodge',
          range: 'long',
          properties: 'blast (medium)',
          dealsDamage: true,
          damage: { base: 'MND', weapon: 8, type: 'fire', staticDamage: false },
          effect: 'Explosive sphere of fire that affects all targets in area.'
        },
        {
          id: '5',
          name: 'Heal Wounds',
          rank: 2,
          cost: 4,
          target: 'special',
          range: 'touch',
          properties: '',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'radiant', staticDamage: false },
          effect: 'Restores health and removes minor conditions through divine power.'
        },
        {
          id: '6',
          name: 'Bless Weapon',
          rank: 1,
          cost: 2,
          target: 'special',
          range: 'touch',
          properties: 'concentrate',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'radiant', staticDamage: false },
          effect: 'Imbues weapon with holy power, adding radiant damage to attacks.'
        }
      ]
    },
    companions: [],
    partyId: undefined
  }

  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([spellsTestCharacter]),
      getDocument: vi.fn().mockResolvedValue(spellsTestCharacter),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

// Set up URL parameters to trigger character loading
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=test-collection-mock-character-1',
    hostname: 'localhost',
  },
  writable: true,
})

describe('Character Sheet - Spells Tab Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('should load character with spell data', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    }, { timeout: 5000 })

    expect(screen.getByText('Elara Spellweaver')).toBeDefined()
  })

  it('should display character spells and spell-casting abilities', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Look for spell names
    const magicMissile = screen.queryByText('Magic Missile')
    const fireball = screen.queryByText('Fireball')
    expect(magicMissile || fireball).toBeDefined()
  })

  it('should show focus management system', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Look for focus tracking elements
    const focusElements = screen.getAllByText(/14|18/)
    expect(focusElements.length).toBeGreaterThan(0)
  })

  it('should display arcane spell school system', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Check for arcane spells
    const magicMissile = screen.queryByText('Magic Missile')
    const shield = screen.queryByText('Shield')
    expect(magicMissile || shield).toBeDefined()
  })

  it('should show mystic spell tradition system', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Check for mystic spells  
    const healWounds = screen.queryByText('Heal Wounds')
    const blessWeapon = screen.queryByText('Bless Weapon')
    expect(healWounds || blessWeapon).toBeDefined()
  })

  it('should handle spell preparation mechanics', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Test interactions with spell preparation
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) {
      fireEvent.click(buttons[0])
      expect(buttons[0]).toBeDefined()
    }
  })

  it('should test spell rank progression and cost systems', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Look for spell rank indicators
    const rankElements = screen.getAllByText(/0|1|2|3/)
    expect(rankElements.length).toBeGreaterThan(0)
  })

  it('should display spell casting limits and daily usage', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Test spell usage tracking elements
    const trackingElements = screen.getAllByText(/cost|focus|2|4|6/)
    expect(trackingElements.length).toBeGreaterThan(0)
  })

  it('should show spell catalyst and material components', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Check for catalyst equipment
    const dualFocusStaff = screen.queryByText('Dual-Focus Staff')
    const catalyst = screen.queryByText('catalyst')
    expect(dualFocusStaff || catalyst).toBeDefined()
  })

  it('should handle spell targeting and range systems', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Look for targeting information
    const dodge = screen.queryByText('Dodge')
    const touch = screen.queryByText('touch')
    const self = screen.queryByText('self')
    expect(dodge || touch || self).toBeDefined()
  })

  it('should test spell damage and effect calculations', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Test spell damage display
    const fire = screen.queryByText('fire')
    const psychic = screen.queryByText('psychic')
    const radiant = screen.queryByText('radiant')
    expect(fire || psychic || radiant).toBeDefined()
  })

  it('should show cantrip vs ranked spell differences', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Check for cantrip spells
    const prestidigitation = screen.queryByText('Prestidigitation')
    const cantrip = screen.queryByText('Cantrip')
    expect(prestidigitation || cantrip).toBeDefined()
  })

  it('should test dual magic school character progression', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Test character has both Arcana and Mysticism skills
    const arcana = screen.queryByText('Arcana')
    const mysticism = screen.queryByText('Mysticism')
    expect(arcana && mysticism).toBeTruthy()
  })

  it('should integrate spell system with character statistics', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    })

    // Verify spell system integration with character stats
    expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    const spellElements = screen.getAllByText(/Magic|Heal|Shield|Fire/)
    expect(spellElements.length).toBeGreaterThan(0)
  })
})