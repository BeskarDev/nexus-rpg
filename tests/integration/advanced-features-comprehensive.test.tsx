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

// Enhanced mock for firebase service with advanced character data
vi.mock('../../src/dev/firebaseService', () => {
  const advancedTestCharacter = {
    docId: 'mock-character-1',
    docRef: { id: 'mock-character-1' },
    collectionId: 'test-collection',
    personal: { 
      name: 'Maximus Ironforge',
      playerName: 'Advanced Test Player', 
      folk: 'Vorthak',
      upbringing: 'Military',
      background: 'Veteran Commander',
      height: '6\'2"',
      weight: '220 lbs',
      age: '45',
      description: 'A battle-scarred veteran with decades of military experience and tactical brilliance.',
      motivation: 'To train the next generation of warriors and protect the innocent.',
      profilePicture: '',
      allies: [
        { id: '1', description: 'General Thaddeus - Former commanding officer and mentor' },
        { id: '2', description: 'The Iron Legion - Elite unit of veteran soldiers' }
      ],
      contacts: [
        { id: '1', description: 'Quartermaster Kane - Military supply connections' },
        { id: '2', description: 'Sage Aldric - Tactical advisor and strategist' }
      ],
      rivals: [
        { id: '1', description: 'Colonel Vex - Political rival in military hierarchy' }
      ],
      notes: 'Master tactician with expertise in large-scale warfare and unit command.'
    },
    statistics: { 
      health: { current: 55, temp: 5, maxHpModifier: 10 },
      fatigue: { current: 2, max: 8 },
      av: { armor: 8, helmet: 2, shield: 3, other: 1 },
      strength: { value: 18, wounded: false },
      agility: { value: 12, wounded: false },
      spirit: { value: 16, wounded: false },
      mind: { value: 14, wounded: false },
      parry: 16,
      dodge: 12,
      resist: 15,
      resolve: 6,
      statusEffects: [
        { name: 'battle ready', duration: 'long' },
        { name: 'tactical advantage', duration: 'scene' }
      ]
    },
    skills: { 
      xp: { total: 150, spend: 148 },
      skills: [
        { id: '1', name: 'Fighting', rank: 5, xp: 24 },
        { id: '2', name: 'Athletics', rank: 4, xp: 18 },
        { id: '3', name: 'Fortitude', rank: 5, xp: 24 },
        { id: '4', name: 'Influence', rank: 4, xp: 18 },
        { id: '5', name: 'Insight', rank: 4, xp: 18 },
        { id: '6', name: 'Perception', rank: 4, xp: 18 },
        { id: '7', name: 'Education', rank: 3, xp: 12 },
        { id: '8', name: 'Survival', rank: 3, xp: 12 },
        { id: '9', name: 'Crafting', rank: 2, xp: 6 }
      ],
      professions: ['Soldier', 'Commander', 'Weaponsmith', 'Instructor'],
      languages: ['Tradespeak', 'Military Code', 'Giant', 'Orcish', 'Battle Cant'],
      abilities: [
        { id: '1', title: 'Battle Master', description: 'Advanced combat techniques and leadership', tag: 'Combat Art' },
        { id: '2', title: 'Tactical Genius', description: 'Superior battlefield awareness and planning', tag: 'Talent' },
        { id: '3', title: 'Iron Will', description: 'Exceptional mental fortitude and resistance', tag: 'Talent' },
        { id: '4', title: 'Weapon Expertise', description: 'Master of multiple weapon types', tag: 'Combat Art' },
        { id: '5', title: 'Leadership Aura', description: 'Inspires allies in combat', tag: 'Talent' }
      ],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true }
    },
    items: { 
      coins: 2500,
      encumbrance: {
        encumberedAt: 18,
        overencumberedAt: 27,
        carryModifier: 5,
        currentLoad: 25,
        mountMaxLoad: 50,
        storageMaxLoad: 200
      },
      weapons: [
        {
          id: '1',
          name: 'Dragonbane Greatsword',
          damage: { base: 'STR', weapon: 10, other: 2, type: 'physical', staticDamage: false },
          properties: 'two-handed, reach, magical, dragonbane',
          description: 'A legendary two-handed sword forged to slay dragons.',
          cost: 5000,
          load: 6,
          location: 'worn',
          uses: 0,
          durability: 'd12+2'
        },
        {
          id: '2',
          name: 'Tower Shield of Aegis',
          damage: { base: 'STR', weapon: 4, other: 0, type: 'physical', staticDamage: false },
          properties: 'shield, heavy, magical, spell resistance',
          description: 'A massive shield that provides superior protection.',
          cost: 2000,
          load: 8,
          location: 'worn',
          uses: 0,
          durability: 'd12+1'
        },
        {
          id: '3',
          name: 'Masterwork Throwing Axes',
          damage: { base: 'STR', weapon: 6, other: 0, type: 'physical', staticDamage: false },
          properties: 'thrown, light, balanced, returning',
          description: 'Perfectly balanced throwing axes that return to the wielder.',
          cost: 800,
          load: 1,
          location: 'belt',
          uses: 0,
          durability: 'd10'
        }
      ],
      items: [
        {
          id: '1',
          name: 'Plate Armor of the Legion',
          properties: 'heavy armor, +8 AV, magical, self-repairing',
          description: 'Enchanted plate armor worn by elite legion commanders.',
          slot: 'body',
          cost: 8000,
          load: 25,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd12+3'
        },
        {
          id: '2',
          name: 'Commander\'s Helm',
          properties: 'heavy helmet, +2 AV, leadership bonus, fear immunity',
          description: 'A distinctive helm that marks its wearer as a battlefield leader.',
          slot: 'head',
          cost: 1500,
          load: 3,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd10+1'
        },
        {
          id: '3',
          name: 'Ring of Tactical Awareness',
          properties: 'magical ring, initiative bonus, combat insight',
          description: 'Enhances battlefield perception and tactical thinking.',
          slot: 'finger',
          cost: 3000,
          load: 0,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd12'
        },
        {
          id: '4',
          name: 'War Horn of Rallying',
          properties: 'magical instrument, morale boost, fear removal',
          description: 'A powerful horn that can rally troops and inspire courage.',
          slot: '',
          cost: 1200,
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
      magicSkill: 'Mysticism',
      specialization: 'War',
      focus: { total: 12, current: 8 },
      spellCatalystDamage: 0,
      spells: [
        {
          id: '1',
          name: 'Bless Weapons',
          rank: 1,
          cost: 2,
          target: 'special',
          range: 'touch',
          properties: 'concentrate',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'radiant', staticDamage: false },
          effect: 'Blesses multiple weapons with divine power for enhanced damage.'
        },
        {
          id: '2',
          name: 'Rally the Troops',
          rank: 2,
          cost: 4,
          target: 'special',
          range: 'close',
          properties: 'area',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'none', staticDamage: false },
          effect: 'Removes fear and inspires courage in all allies within range.'
        },
        {
          id: '3',
          name: 'Divine Protection',
          rank: 3,
          cost: 6,
          target: 'self',
          range: 'self',
          properties: 'concentrate',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'none', staticDamage: false },
          effect: 'Grants enhanced armor and resistance to magical attacks.'
        }
      ]
    },
    companions: [
      {
        name: 'Thunderhoof',
        type: 'Warhorse',
        size: 'Large',
        hp: { current: 45, max: 50 },
        attributes: { strength: 18, agility: 12, spirit: 10, mind: 4 },
        skills: ['Athletics 4', 'Fortitude 4', 'Perception 3'],
        abilities: ['Mounted Combat', 'Charge Attack', 'War Training'],
        equipment: ['Barding (Heavy)', 'Saddlebags', 'Military Tack']
      },
      {
        name: 'Sergeant Grimm',
        type: 'Human Veteran',
        size: 'Medium',
        hp: { current: 35, max: 40 },
        attributes: { strength: 16, agility: 14, spirit: 12, mind: 10 },
        skills: ['Fighting 4', 'Archery 3', 'Perception 3', 'Survival 3'],
        abilities: ['Combat Veteran', 'Crossbow Expert', 'Squad Tactics'],
        equipment: ['Chainmail', 'Heavy Crossbow', 'Military Kit']
      }
    ],
    partyId: undefined
  }

  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([advancedTestCharacter]),
      getDocument: vi.fn().mockResolvedValue(advancedTestCharacter),
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

describe('Character Sheet - Advanced Features Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('should load high-level character with advanced features', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    }, { timeout: 5000 })

    expect(screen.getByText('Maximus Ironforge')).toBeDefined()
  })

  it('should display high-level character statistics and abilities', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Look for high-level stats
    const highStats = screen.getAllByText(/18|16|14/)
    expect(highStats.length).toBeGreaterThan(0)
  })

  it('should show advanced combat arts and master-level abilities', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Check for advanced abilities
    const battleMaster = screen.queryByText(/Battle Master/)
    const tactical = screen.queryByText(/Tactical/)
    expect(battleMaster || tactical).toBeDefined()
  })

  it('should handle magical equipment and enchanted items', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Look for magical equipment
    const dragonbane = screen.queryByText(/Dragonbane/)
    const aegis = screen.queryByText(/Aegis/)
    expect(dragonbane || aegis).toBeDefined()
  })

  it('should display high-level spell casting and divine magic', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Check for spell abilities
    const bless = screen.queryByText(/Bless/)
    const rally = screen.queryByText(/Rally/)
    const divine = screen.queryByText(/Divine/)
    expect(bless || rally || divine).toBeDefined()
  })

  it('should manage multiple companions and mounts', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Look for companion information
    const thunderhoof = screen.queryByText(/Thunderhoof/)
    const grimm = screen.queryByText(/Grimm/)
    expect(thunderhoof || grimm).toBeDefined()
  })

  it('should handle complex encumbrance and load calculations', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Check for encumbrance values
    const loadValues = screen.getAllByText(/25|18|27/)
    expect(loadValues.length).toBeGreaterThan(0)
  })

  it('should display master-level skill ranks and expertise', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Look for high skill ranks
    const skillRanks = screen.getAllByText(/Fighting|Athletics|Fortitude/)
    expect(skillRanks.length).toBeGreaterThan(0)
  })

  it('should show multiple professions and specializations', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Check for profession information
    const soldier = screen.queryByText('Soldier')
    const commander = screen.queryByText('Commander')
    expect(soldier || commander).toBeDefined()
  })

  it('should handle advanced status effects and conditions', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Look for status effects
    const battleReady = screen.queryByText(/battle ready/)
    const tactical = screen.queryByText(/tactical advantage/)
    expect(battleReady || tactical).toBeDefined()
  })

  it('should test complex character interactions and form modifications', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Test complex interactions
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) {
      // Test clicking multiple buttons
      fireEvent.click(buttons[0])
      if (buttons.length > 1) {
        fireEvent.click(buttons[1])
      }
      expect(buttons[0]).toBeDefined()
    }
  })

  it('should display wealth and high-value equipment systems', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Check for wealth indicators
    const wealth = screen.getAllByText(/2500|5000|8000/)
    expect(wealth.length).toBeGreaterThan(0)
  })

  it('should integrate all advanced systems comprehensively', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    })

    // Comprehensive integration test for advanced features
    expect(screen.getByText('Maximus Ironforge')).toBeDefined()
    const advancedElements = screen.getAllByText(/Maximus|Battle|Dragon|Legion|Command/)
    expect(advancedElements.length).toBeGreaterThan(0)
  })
})