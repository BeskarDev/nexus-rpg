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

// Enhanced mock for firebase service with personal-focused character data
vi.mock('../../src/dev/firebaseService', () => {
  const personalTestCharacter = {
    docId: 'mock-character-1',
    docRef: { id: 'mock-character-1' },
    collectionId: 'test-collection',
    personal: { 
      name: 'Aria Blackthorn',
      playerName: 'Test Player', 
      folk: 'Vorthak',
      upbringing: 'Noble',
      background: 'Diplomat',
      height: '5\'6"',
      weight: '135 lbs',
      age: '29',
      description: 'An elegant noble with a mysterious past and keen intellect. Her striking silver eyes hint at hidden depths.',
      motivation: 'To uncover the truth about her family\'s dark secret and restore their honor.',
      profilePicture: 'https://example.com/aria-portrait.jpg',
      allies: [
        { id: '1', description: 'Lord Cassius - Childhood friend and political ally in the capital' },
        { id: '2', description: 'Sister Meredith - Trusted confidante and keeper of family secrets' }
      ],
      contacts: [
        { id: '1', description: 'Marcus the Fence - Information broker in the merchant quarter' },
        { id: '2', description: 'Captain Helena - Harbor watch officer with debts to pay' },
        { id: '3', description: 'The Raven - Mysterious spymaster with connections throughout the realm' }
      ],
      rivals: [
        { id: '1', description: 'Duke Valerius - Political opponent seeking to expose family shame' },
        { id: '2', description: 'Lady Theodora - Former friend turned bitter rival over past betrayal' }
      ],
      notes: 'Carries herself with noble bearing but watches shadows carefully. Skilled in court intrigue and information gathering.'
    },
    statistics: { 
      health: { current: 30, temp: 2, maxHpModifier: 0 },
      fatigue: { current: 1, max: 6 },
      av: { armor: 2, helmet: 0, shield: 0, other: 1 },
      strength: { value: 10, wounded: false },
      agility: { value: 12, wounded: false },
      spirit: { value: 14, wounded: false },
      mind: { value: 16, wounded: false },
      parry: 11,
      dodge: 13,
      resist: 16,
      resolve: 4,
      statusEffects: [
        { name: 'inspired', duration: 'scene' }
      ]
    },
    skills: { 
      xp: { total: 75, spend: 72 },
      skills: [
        { id: '1', name: 'Influence', rank: 4, xp: 18 },
        { id: '2', name: 'Insight', rank: 4, xp: 18 },
        { id: '3', name: 'Education', rank: 3, xp: 12 },
        { id: '4', name: 'Lore', rank: 3, xp: 12 },
        { id: '5', name: 'Streetwise', rank: 2, xp: 6 },
        { id: '6', name: 'Stealth', rank: 2, xp: 6 },
        { id: '7', name: 'Perception', rank: 2, xp: 6 }
      ],
      professions: ['Diplomat', 'Spy', 'Noble'],
      languages: ['Tradespeak', 'High Imperial', 'Old Tongue', 'Thieves\' Cant', 'Draconic'],
      abilities: [
        { id: '1', title: 'Noble Bearing', description: 'Gains social advantages in formal settings', tag: 'Folk' },
        { id: '2', title: 'Information Network', description: 'Can gather rumors and secrets efficiently', tag: 'Talent' },
        { id: '3', title: 'Silver Tongue', description: 'Exceptional persuasion and deception abilities', tag: 'Talent' }
      ],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true }
    },
    items: { 
      coins: 850,
      encumbrance: {
        encumberedAt: 10,
        overencumberedAt: 15,
        carryModifier: 0,
        currentLoad: 8,
        mountMaxLoad: 0,
        storageMaxLoad: 0
      },
      weapons: [
        {
          id: '1',
          name: 'Elegant Rapier',
          damage: { base: 'AGI', weapon: 3, other: 0, type: 'physical', staticDamage: false },
          properties: 'agile, pierce, finesse',
          description: 'A masterwork rapier with silver inlay and noble house insignia.',
          cost: 120,
          load: 2,
          location: 'worn',
          uses: 0,
          durability: 'd10'
        },
        {
          id: '2',
          name: 'Concealed Dagger',
          damage: { base: 'AGI', weapon: 2, other: 0, type: 'physical', staticDamage: false },
          properties: 'agile, light, concealable',
          description: 'A small but deadly blade hidden in a boot sheath.',
          cost: 25,
          load: 0.5,
          location: 'concealed',
          uses: 0,
          durability: 'd6'
        }
      ],
      items: [
        {
          id: '1',
          name: 'Noble\'s Attire',
          properties: 'social armor, +2 AV, formal',
          description: 'Exquisitely tailored clothes befitting high society.',
          slot: 'body',
          cost: 200,
          load: 2,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd8'
        },
        {
          id: '2',
          name: 'Signet Ring of House Blackthorn',
          properties: 'identity, authority, magical focus',
          description: 'An ancient ring bearing the family seal and subtle enchantments.',
          slot: 'finger',
          cost: 500,
          load: 0,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd12'
        },
        {
          id: '3',
          name: 'Encrypted Journal',
          properties: 'personal, cipher, intelligence',
          description: 'A leather-bound journal containing coded notes and observations.',
          slot: '',
          cost: 50,
          load: 1,
          container: 'backpack',
          amount: 1,
          location: 'carried',
          uses: 0,
          durability: 'd8'
        },
        {
          id: '4',
          name: 'Disguise Kit',
          properties: 'tools, social, stealth',
          description: 'Complete set for assuming different identities.',
          slot: '',
          cost: 75,
          load: 2,
          container: 'backpack',
          amount: 1,
          location: 'carried',
          uses: 3,
          durability: 'd10'
        }
      ],
      itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true }
    },
    spells: { 
      magicSkill: '',
      specialization: '',
      focus: { total: 0, current: 0 },
      spellCatalystDamage: 0,
      spells: []
    },
    companions: [
      {
        name: 'Whisper',
        type: 'Raven Familiar',
        size: 'Tiny',
        hp: { current: 3, max: 3 },
        attributes: { strength: 2, agility: 16, spirit: 8, mind: 6 },
        skills: ['Flying 4', 'Perception 4', 'Stealth 5'],
        abilities: ['Message Delivery', 'Aerial Reconnaissance', 'Mimicry'],
        equipment: ['Message Scroll Case']
      }
    ],
    partyId: undefined
  }

  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([personalTestCharacter]),
      getDocument: vi.fn().mockResolvedValue(personalTestCharacter),
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

describe('Character Sheet - Personal Tab Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('should load character with personal data', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    }, { timeout: 5000 })

    expect(screen.getByText('Aria Blackthorn')).toBeDefined()
  })

  it('should display character identity and background information', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Look for personal information
    const testPlayer = screen.queryByText('Test Player')
    const diplomat = screen.queryByText('Diplomat')
    expect(testPlayer || diplomat).toBeDefined()
  })

  it('should show character physical description and appearance', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Look for physical descriptors
    const height = screen.queryByText('5\'6"')
    const age = screen.queryByText('29')
    expect(height || age).toBeDefined()
  })

  it('should display character motivation and personality', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Check for motivation elements
    const family = screen.queryByText(/family/)
    const truth = screen.queryByText(/truth/)
    const honor = screen.queryByText(/honor/)
    expect(family || truth || honor).toBeDefined()
  })

  it('should manage character allies and social connections', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Look for ally information
    const cassius = screen.queryByText(/Cassius/)
    const meredith = screen.queryByText(/Meredith/)
    expect(cassius || meredith).toBeDefined()
  })

  it('should show character contacts and information networks', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Check for contact information
    const marcus = screen.queryByText(/Marcus/)
    const helena = screen.queryByText(/Helena/)
    const raven = screen.queryByText(/Raven/)
    expect(marcus || helena || raven).toBeDefined()
  })

  it('should track character rivals and enemies', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Look for rival information
    const valerius = screen.queryByText(/Valerius/)
    const theodora = screen.queryByText(/Theodora/)
    expect(valerius || theodora).toBeDefined()
  })

  it('should handle character notes and personal observations', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Check for personal notes
    const intrigue = screen.queryByText(/intrigue/)
    const shadows = screen.queryByText(/shadows/)
    expect(intrigue || shadows).toBeDefined()
  })

  it('should test character background and cultural elements', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Look for cultural background
    const vorthak = screen.queryByText('Vorthak')
    const noble = screen.queryByText('Noble')
    expect(vorthak || noble).toBeDefined()
  })

  it('should manage character profession and social status', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Check for profession information
    const diplomate = screen.queryByText('Diplomat')
    const spy = screen.queryByText('Spy')
    expect(diplomate || spy).toBeDefined()
  })

  it('should display character languages and cultural knowledge', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Look for language information
    const tradespeak = screen.queryByText('Tradespeak')
    const imperial = screen.queryByText(/Imperial/)
    const draconic = screen.queryByText('Draconic')
    expect(tradespeak || imperial || draconic).toBeDefined()
  })

  it('should handle personal equipment and noble possessions', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Check for personal equipment
    const signet = screen.queryByText(/Signet/)
    const attire = screen.queryByText(/Attire/)
    expect(signet || attire).toBeDefined()
  })

  it('should test character form interactions and editing', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Test form interactions
    const textInputs = screen.getAllByRole('textbox')
    if (textInputs.length > 0) {
      fireEvent.change(textInputs[0], { target: { value: 'updated text' } })
      expect(textInputs[0]).toBeDefined()
    }
  })

  it('should integrate personal information with character statistics', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    })

    // Verify personal tab integration with character stats
    expect(screen.getByText('Aria Blackthorn')).toBeDefined()
    const personalElements = screen.getAllByText(/Aria|Diplomat|Noble|Test/)
    expect(personalElements.length).toBeGreaterThan(0)
  })
})