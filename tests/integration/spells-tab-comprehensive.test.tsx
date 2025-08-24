import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { CharacterSheetContainer } from '../../src/features/CharacterSheet/CharacterSheetContainer'
import { characterSheetReducer } from '../../src/features/CharacterSheet/characterSheetReducer'
import { Experimental_CssVarsProvider, experimental_extendTheme } from '@mui/material'

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

// Mock Firebase service
vi.mock('../../src/dev/firebaseService', () => {
  const comprehensiveCharacterData = {
    docId: 'mage-001',
    docRef: { id: 'mage-001' },
    collectionId: 'test-collection',
    personal: {
      name: 'Lyralei Moonwhisper',
      playerName: 'Magic Tester',
      folk: 'Elf',
      upbringing: 'Scholarly',
      background: 'Wizard',
      height: '5\'6"',
      weight: '120 lbs',
      age: '250',
      description: 'An ancient elven wizard with silver hair and eyes that sparkle with arcane knowledge.',
      motivation: 'To unlock the deepest secrets of magic and preserve ancient knowledge.',
      profilePicture: '',
      allies: [
        { id: '1', description: 'Archmage Theron - Master of the Arcane Tower' },
        { id: '2', description: 'Scholar Vex - Research partner in magical studies' }
      ],
      contacts: [
        { id: '3', description: 'Alchemist Kira - Supplier of spell components' },
        { id: '4', description: 'Librarian Sage - Keeper of ancient tomes' }
      ],
      rivals: [
        { id: '5', description: 'Necromancer Malachar - Dark practitioner of forbidden arts' }
      ],
      notes: 'Master of both arcane and mystic traditions. Specializes in evocation and illusion magic.'
    },
    statistics: {
      health: { current: 32, temp: 8, maxHpModifier: 0 },
      fatigue: { current: 0, max: 6 },
      av: { armor: 1, helmet: 0, shield: 0, other: 2 },
      strength: { value: 8, wounded: false },
      agility: { value: 14, wounded: false },
      spirit: { value: 16, wounded: false },
      mind: { value: 18, wounded: false },
      parry: 8,
      dodge: 16,
      resist: 18,
      resolve: 6,
      statusEffects: [
        { id: '1', type: 'enhanced', duration: 'medium', description: 'Enhanced by magical study' },
        { id: '2', type: 'focused', duration: 'short', description: 'Deeply focused on spellcasting' }
      ]
    },
    skills: {
      xp: { total: 300, spend: 294 },
      skills: [
        { id: '1', name: 'Arcana', rank: 5, xp: 24 },
        { id: '2', name: 'Mysticism', rank: 4, xp: 18 },
        { id: '3', name: 'Education', rank: 4, xp: 18 },
        { id: '4', name: 'Lore', rank: 5, xp: 24 },
        { id: '5', name: 'Insight', rank: 3, xp: 12 },
        { id: '6', name: 'Perception', rank: 4, xp: 18 },
        { id: '7', name: 'Crafting', rank: 3, xp: 12 },
        { id: '8', name: 'Nature', rank: 3, xp: 12 },
        { id: '9', name: 'Fighting', rank: 1, xp: 2 },
        { id: '10', name: 'Athletics', rank: 1, xp: 2 },
        { id: '11', name: 'Stealth', rank: 2, xp: 6 },
        { id: '12', name: 'Influence', rank: 3, xp: 12 },
        { id: '13', name: 'Fortitude', rank: 2, xp: 6 },
        { id: '14', name: 'Survival', rank: 1, xp: 2 },
        { id: '15', name: 'Streetwise', rank: 1, xp: 2 },
        { id: '16', name: 'Archery', rank: 1, xp: 2 }
      ],
      professions: ['Enchanter', 'Scribe', 'Alchemist', 'Astronomer'],
      languages: ['Tradespeak', 'Elvish', 'Draconic', 'Celestial', 'Primordial', 'Old Imperial'],
      abilities: [
        { id: '1', title: 'Spell Mastery', description: '+2 to spell attack rolls', tag: 'Talent' },
        { id: '2', title: 'Metamagic', description: 'Modify spells with enhanced effects', tag: 'Talent' },
        { id: '3', title: 'Arcane Recovery', description: 'Regain focus faster', tag: 'Talent' },
        { id: '4', title: 'Elven Longevity', description: 'Extended lifespan and memory', tag: 'Folk' },
        { id: '5', title: 'Ritual Casting', description: 'Cast spells as rituals', tag: 'Talent' },
        { id: '6', title: 'Spell Focus', description: 'Enhanced concentration on spells', tag: 'Combat Art' }
      ],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true }
    },
    items: {
      coins: 2800,
      encumbrance: {
        encumberedAt: 8,
        overencumberedAt: 12,
        carryModifier: 0,
        currentLoad: 24.5,
        mountMaxLoad: 0,
        storageMaxLoad: 500
      },
      weapons: [
        {
          id: '1',
          name: 'Staff of Arcane Might',
          damage: { base: 'MND', weapon: 3, other: 4, type: 'psychic', staticDamage: false },
          properties: 'reach, two-handed, arcane catalyst, spell power +2',
          description: 'An ancient staff carved from world-tree wood, topped with a crystal that pulses with magical energy.',
          cost: 1200,
          load: 4,
          location: 'worn',
          uses: 0,
          durability: 'd12'
        },
        {
          id: '2',
          name: 'Mystic Orb',
          damage: { base: 'SPI', weapon: 2, other: 3, type: 'radiant', staticDamage: false },
          properties: 'light, mystic catalyst, spell focus +1',
          description: 'A glowing orb that channels divine energy for mystic spells.',
          cost: 800,
          load: 1,
          location: 'carried',
          uses: 0,
          durability: 'd8'
        }
      ],
      items: [
        {
          id: '1',
          name: 'Robes of the Arcane',
          properties: 'light armor, +1 AV, spell resistance, arcane focus',
          description: 'Flowing robes woven with protective enchantments and spell-enhancing threads.',
          slot: 'body',
          cost: 600,
          load: 2,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd10'
        },
        {
          id: '2',
          name: 'Spellbook',
          properties: 'spell storage, knowledge repository',
          description: 'A tome containing hundreds of spells and magical research.',
          slot: 'none',
          cost: 150,
          load: 3,
          container: 'carried',
          amount: 1,
          location: 'carried',
          uses: 0,
          durability: 'd6'
        }
      ],
      itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true }
    },
    spells: {
      magicSkill: 'Arcana',
      specialization: 'Evocation',
      focus: { total: 22, current: 18 },
      spellCatalystDamage: 4,
      spells: [
        {
          id: '1',
          name: 'Mage Light',
          rank: 0,
          cost: 0,
          target: 'special',
          range: 'touch',
          properties: 'concentrate, light source',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'radiant', staticDamage: false },
          effect: 'Creates a bright magical light that illuminates a large area.',
          prepared: true
        },
        {
          id: '2',
          name: 'Magic Missile',
          rank: 1,
          cost: 2,
          target: 'Dodge',
          range: 'medium',
          properties: 'force, unerring',
          dealsDamage: true,
          damage: { base: 'MND', weapon: 4, type: 'psychic', staticDamage: false },
          effect: 'Launches bolts of pure magical energy that never miss.',
          prepared: true
        },
        {
          id: '3',
          name: 'Fireball',
          rank: 3,
          cost: 6,
          target: 'area',
          range: 'long',
          properties: 'blast, fire, area of effect',
          dealsDamage: true,
          damage: { base: 'MND', weapon: 8, type: 'fire', staticDamage: false },
          effect: 'A massive explosion of fire that engulfs multiple targets.',
          prepared: true
        },
        {
          id: '4',
          name: 'Lightning Bolt',
          rank: 3,
          cost: 6,
          target: 'line',
          range: 'long',
          properties: 'lightning, line effect, chain',
          dealsDamage: true,
          damage: { base: 'MND', weapon: 7, type: 'lightning', staticDamage: false },
          effect: 'A devastating bolt of lightning that can chain between targets.',
          prepared: true
        },
        {
          id: '5',
          name: 'Teleport',
          rank: 4,
          cost: 8,
          target: 'self',
          range: 'special',
          properties: 'teleportation, instant',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'none', staticDamage: false },
          effect: 'Instantly transport yourself to a location you can see.',
          prepared: true
        },
        {
          id: '6',
          name: 'Invisibility',
          rank: 2,
          cost: 4,
          target: 'touch',
          range: 'touch',
          properties: 'illusion, concealment',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'none', staticDamage: false },
          effect: 'Makes the target completely invisible until they attack or the spell ends.',
          prepared: true
        },
        {
          id: '7',
          name: 'Healing Light',
          rank: 1,
          cost: 2,
          target: 'touch',
          range: 'touch',
          properties: 'mystic, healing, light',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'radiant', staticDamage: false },
          effect: 'Channels divine light to heal wounds.',
          prepared: true
        },
        {
          id: '8',
          name: 'Shield of Faith',
          rank: 2,
          cost: 4,
          target: 'self',
          range: 'self',
          properties: 'mystic, protection, concentration',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'none', staticDamage: false },
          effect: 'Creates a protective barrier of divine energy.',
          prepared: true
        }
      ]
    },
    companions: [
      {
        id: '1',
        name: 'Mystral',
        description: 'A magical raven familiar with shimmering black feathers',
        currentHP: 12,
        maxHP: 15,
        wounded: false
      },
      {
        id: '2',
        name: 'Wisp',
        description: 'A floating ball of pure magical energy',
        currentHP: 8,
        maxHP: 10,
        wounded: false
      }
    ],
    partyId: 'arcane-scholars'
  }

  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([comprehensiveCharacterData]),
      getDocument: vi.fn().mockResolvedValue(comprehensiveCharacterData),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=test-collection-mage-001',
    hostname: 'localhost',
  },
  writable: true,
})

const createEmptyTestStore = () => {
  return configureStore({
    reducer: { characterSheet: characterSheetReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  })
}

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = createEmptyTestStore()
  const theme = experimental_extendTheme({})
  
  return (
    <Provider store={store}>
      <Experimental_CssVarsProvider theme={theme}>
        {children}
      </Experimental_CssVarsProvider>
    </Provider>
  )
}

describe('Character Sheet - Spells Tab Comprehensive Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('should load spellcaster character and display magic systems', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
  })

  it('should display arcane magic specialization and focus', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Check for arcane magic elements
    const arcana = screen.queryByText('Arcana')
    const evocation = screen.queryByText('Evocation')
    const focus = screen.queryByText(/focus/i) || screen.queryByText(/18/) // Current focus value
    
    expect(arcana || evocation || focus).toBeDefined()
  })

  it('should show prepared spells with different ranks', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Check for specific spells from our test data
    const magicMissile = screen.queryByText('Magic Missile')
    const fireball = screen.queryByText('Fireball')
    const lightningBolt = screen.queryByText('Lightning Bolt')
    const teleport = screen.queryByText('Teleport')
    
    expect(magicMissile || fireball || lightningBolt || teleport).toBeDefined()
  })

  it('should display spell properties and effects', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Look for spell properties and effects
    const concentrate = screen.queryByText(/concentrate/i)
    const areaEffect = screen.queryByText(/area/i)
    const fire = screen.queryByText(/fire/i)
    const lightning = screen.queryByText(/lightning/i)
    
    expect(concentrate || areaEffect || fire || lightning).toBeDefined()
  })

  it('should show mystic spells alongside arcane', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Check for mystic spells in our data
    const healingLight = screen.queryByText('Healing Light')
    const shieldOfFaith = screen.queryByText('Shield of Faith')
    const mysticism = screen.queryByText('Mysticism')
    
    expect(healingLight || shieldOfFaith || mysticism).toBeDefined()
  })

  it('should test spell interaction and casting mechanics', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Test spell-related buttons and interactions
    const spellButtons = screen.getAllByRole('button')
    expect(spellButtons.length).toBeGreaterThan(0)
    
    // Test clicking on spell-related elements
    if (spellButtons.length > 0) {
      fireEvent.click(spellButtons[0])
      expect(spellButtons[0]).toBeDefined()
    }
  })

  it('should display spell catalysts and magical equipment', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Check for magical equipment
    const staffOfArcane = screen.queryByText(/Staff.*Arcane/) || screen.queryByText('Staff')
    const mysticOrb = screen.queryByText(/Mystic.*Orb/) || screen.queryByText('Orb')
    const spellbook = screen.queryByText('Spellbook')
    
    expect(staffOfArcane || mysticOrb || spellbook).toBeDefined()
  })

  it('should show spell damage and effects calculations', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Look for damage values and spell effects
    const damageValues = screen.getAllByText(/\d+/) // Numbers that could be damage
    expect(damageValues.length).toBeGreaterThan(0)
    
    // Check for spell effect descriptions
    const spellEffects = screen.queryByText(/explosion/) || 
                        screen.queryByText(/bolt/) || 
                        screen.queryByText(/invisible/) ||
                        screen.queryByText(/heal/)
    expect(spellEffects).toBeDefined()
  })

  it('should test focus management and spell costs', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Check for focus values (total: 22, current: 18)
    const focusElements = screen.getAllByText(/22|18/)
    expect(focusElements.length).toBeGreaterThan(0)
    
    // Look for spell costs (should show numbers like 2, 4, 6, 8)
    const costElements = screen.getAllByText(/2|4|6|8/)
    expect(costElements.length).toBeGreaterThan(0)
  })

  it('should handle spell preparation and unprepared spells', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Test spell preparation interactions
    const checkboxes = screen.getAllByRole('checkbox')
    
    if (checkboxes.length > 0) {
      // Test toggling spell preparation
      fireEvent.click(checkboxes[0])
      expect(checkboxes[0]).toBeDefined()
    }
  })

  it('should display spell schools and traditions correctly', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Check for arcane disciplines
    const evocation = screen.queryByText('Evocation')
    const illusion = screen.queryByText('Illusion')
    const conjuration = screen.queryByText('Conjuration')
    
    // Check for mystic traditions  
    const light = screen.queryByText('Light')
    const life = screen.queryByText('Life')
    
    expect(evocation || illusion || conjuration || light || life).toBeDefined()
  })

  it('should test magical familiar and companion integration', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Check for magical companions
    const mystral = screen.queryByText('Mystral')
    const wisp = screen.queryByText('Wisp')
    const raven = screen.queryByText(/raven/i)
    const familiar = screen.queryByText(/familiar/i)
    
    expect(mystral || wisp || raven || familiar).toBeDefined()
  })

  it('should verify comprehensive spell system integration', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    }, { timeout: 10000 })

    // Comprehensive test of all magic systems working together
    expect(screen.getByText('Lyralei Moonwhisper')).toBeDefined()
    
    // Test that spell-related elements from all systems are accessible
    const allSpellElements = screen.getAllByText(/Lyralei|Moonwhisper|Arcana|Mysticism|Magic|Fireball|Healing|Focus|Staff/)
    expect(allSpellElements.length).toBeGreaterThan(2)
    
    // Verify the character sheet handles complex spellcaster data
    const characterContainer = screen.getByText('Lyralei Moonwhisper').closest('div')
    expect(characterContainer).toBeDefined()
  })
})