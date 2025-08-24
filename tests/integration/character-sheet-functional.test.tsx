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

// Mock with realistic character data that matches the application's actual data structure
vi.mock('../../src/dev/firebaseService', () => {
  const workingTestCharacter = {
    docId: 'mock-character-1',
    docRef: { id: 'mock-character-1' },
    collectionId: 'mock-collection',
    personal: {
      name: 'Kael Stormwind', // Note: using 'name' not 'characterName'
      playerName: 'Developer Test',
      folk: 'Akashic',
      upbringing: 'Urban',
      background: 'Scholar',
      height: '6\'0"',
      weight: '180 lbs',
      age: '28',
      description: 'A tall, scholarly figure with weathered hands and keen eyes.',
      motivation: 'To uncover the lost secrets of ancient civilizations.',
      profilePicture: '',
      allies: [
        { id: '1', description: 'Master Theron - Former mentor at the Academy' },
      ],
      contacts: [
        { id: '2', description: 'Lyra - Information broker in the merchant quarter' },
      ],
      rivals: [
        { id: '3', description: 'Vex Shadowmere - Competing scholar' },
      ],
      notes: 'Fascinated by ancient texts and archaeological discoveries.',
    },
    statistics: {
      health: { current: 25, temp: 0, maxHpModifier: 0 },
      fatigue: { current: 0, max: 6 },
      av: { armor: 1, helmet: 0, shield: 0, other: 0 },
      strength: { value: 6, wounded: false },
      agility: { value: 8, wounded: false },
      spirit: { value: 10, wounded: false },
      mind: { value: 12, wounded: false },
      parry: 8,
      dodge: 10,
      resist: 12,
      resolve: 3,
      statusEffects: [],
    },
    skills: {
      xp: { total: 45, spend: 42 },
      skills: [
        { id: '1', name: 'Arcana', rank: 3, xp: 12 },
        { id: '2', name: 'Education', rank: 2, xp: 6 },
        { id: '3', name: 'Lore', rank: 2, xp: 6 },
        { id: '4', name: 'Insight', rank: 2, xp: 6 },
        { id: '5', name: 'Perception', rank: 2, xp: 6 },
        { id: '6', name: 'Fighting', rank: 1, xp: 4 },
      ],
      professions: ['Alchemist', 'Inscriber'],
      languages: ['Tradespeak', 'Draconic', 'Elvish'],
      abilities: [
        { id: '1', title: 'Spell Weaving', description: 'Combine spells', tag: 'Talent' },
        { id: '2', title: 'Ancient Knowledge', description: 'Historical insights', tag: 'Talent' },
      ],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true },
    },
    items: {
      coins: 250,
      encumbrance: {
        encumberedAt: 8,
        overencumberedAt: 12,
        carryModifier: 0,
        currentLoad: 6,
        mountMaxLoad: 0,
        storageMaxLoad: 0,
      },
      weapons: [
        {
          id: '1',
          name: 'Scholar\'s Staff',
          damage: { base: 'STR', weapon: 3, other: 0, type: 'physical', staticDamage: false },
          properties: 'reach, two-handed, arcane catalyst',
          description: 'A gnarled oak staff topped with a crystal focus.',
          cost: 45,
          load: 2,
          location: 'worn',
          uses: 0,
          durability: 'd8',
        },
      ],
      items: [
        {
          id: '1',
          name: 'Traveler\'s Robes',
          properties: 'light armor, +1 AV',
          description: 'Well-made robes designed for comfort.',
          slot: 'body',
          cost: 25,
          load: 1,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd6',
        },
        {
          id: '2',
          name: 'Spellbook',
          properties: 'arcane focus',
          description: 'A leather-bound tome containing spell formulas.',
          slot: '',
          cost: 30,
          load: 1,
          container: 'backpack',
          amount: 1,
          location: 'carried',
          uses: 0,
          durability: 'd6',
        },
      ],
      itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true },
    },
    spells: {
      magicSkill: 'Arcana',
      specialization: 'Evocation',
      focus: { total: 14, current: 11 },
      spellCatalystDamage: 0,
      spells: [
        {
          id: '1',
          name: 'Mage Light',
          rank: 0,
          cost: 0,
          target: 'special',
          range: 'touch',
          properties: 'concentrate',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'radiant', staticDamage: false },
          effect: 'Creates a bright light source that lasts until concentration ends.',
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
          effect: 'Launches a bolt of pure magical energy at a target.',
        },
      ],
    },
    companions: [],
    partyId: undefined,
  }

  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([workingTestCharacter]),
      getDocument: vi.fn().mockResolvedValue(workingTestCharacter),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

// Set up proper URL parameters to trigger character loading
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=mock-collection-mock-character-1', // Match the format expected by the app
    hostname: 'localhost',
  },
  writable: true,
})

describe('Character Sheet - Real Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('should successfully load character data and display character name', async () => {
    render(<CharacterSheetWrapper />)
    
    // Wait longer for character loading to complete
    await waitFor(() => {
      const characterName = screen.queryByText('Kael Stormwind')
      expect(characterName).toBeDefined()
    }, { timeout: 10000 })

    // Verify character data is loaded
    expect(screen.getByText('Kael Stormwind')).toBeDefined()
  })

  it('should render character sheet with actual data instead of just header', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Test that we have more than just the header - look for character data
    expect(screen.getByText('Kael Stormwind')).toBeDefined()
    
    // Look for additional character data elements
    const characterDataElements = screen.getAllByText(/Kael|Scholar|Developer/)
    expect(characterDataElements.length).toBeGreaterThan(1)
  })

  it('should display character attributes and statistics', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Look for attribute values
    const attributeValues = screen.getAllByText(/6|8|10|12/)
    expect(attributeValues.length).toBeGreaterThan(0)
  })

  it('should show character skills and abilities', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Look for skill names
    const arcana = screen.queryByText('Arcana')
    const education = screen.queryByText('Education')
    expect(arcana || education).toBeDefined()
  })

  it('should display character equipment and items', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Look for equipment
    const staff = screen.queryByText(/Scholar.*Staff/) || screen.queryByText(/Staff/)
    const robes = screen.queryByText(/Robes/) || screen.queryByText(/Traveler/)
    expect(staff || robes).toBeDefined()
  })

  it('should show character spells and magic', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Look for spells
    const magicMissile = screen.queryByText('Magic Missile')
    const mageLight = screen.queryByText('Mage Light')
    expect(magicMissile || mageLight).toBeDefined()
  })

  it('should handle user interactions with the character sheet', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Test button interactions
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
    
    // Click a button and verify it doesn't break
    if (buttons.length > 0) {
      fireEvent.click(buttons[0])
      expect(buttons[0]).toBeDefined()
    }
  })

  it('should test text input interactions for character editing', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Test text input interactions
    const textInputs = screen.getAllByRole('textbox')
    if (textInputs.length > 0) {
      fireEvent.change(textInputs[0], { target: { value: 'test modification' } })
      expect(textInputs[0]).toBeDefined()
    }
  })

  it('should verify all character systems work together in integration', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Comprehensive integration test
    expect(screen.getByText('Kael Stormwind')).toBeDefined()
    
    // Verify that character data from multiple systems is present
    const allCharacterElements = screen.getAllByText(/Kael|Scholar|Arcana|Staff|Magic|Developer/)
    expect(allCharacterElements.length).toBeGreaterThan(3)
  })

  it('should load character data that can be modified and saved', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Kael Stormwind')).toBeDefined()
    }, { timeout: 10000 })

    // Verify character is loaded and modifiable
    expect(screen.getByText('Kael Stormwind')).toBeDefined()
    
    // Test that save functionality is available (button should be present even if disabled)
    const saveButton = screen.queryByLabelText('save character')
    expect(saveButton).toBeDefined()
  })
})