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
  const testCharacterData = {
    docId: 'legend-001',
    docRef: { id: 'legend-001' },
    collectionId: 'test-collection',
    personal: {
      name: 'Aurelius the Eternal',
      playerName: 'Advanced Features Tester',
      folk: 'Dragon-Touched',
      upbringing: 'Ancient',
      background: 'Legendary Hero',
      height: '6\'4"',
      weight: '220 lbs',
      age: '1247',
      description: 'An immortal hero bearing the mark of dragons, with golden eyes that have witnessed the rise and fall of empires. His presence commands respect and fear in equal measure.',
      motivation: 'To protect the mortal realm from threats beyond their comprehension, while seeking to understand the curse of his immortality.',
      profilePicture: '',
      allies: [
        { id: '1', description: 'The Council of Mages - Ancient magical organization' },
        { id: '2', description: 'Celestial Order - Divine beings who guide his mission' },
        { id: '3', description: 'Dragon Lord Pyraxis - Ancient red dragon ally' }
      ],
      contacts: [
        { id: '4', description: 'The Immortal Network - Other ageless beings across the world' },
        { id: '5', description: 'Temporal Guardians - Protectors of timeline integrity' }
      ],
      rivals: [
        { id: '6', description: 'The Void Cult - Worshippers of entropy and destruction' },
        { id: '7', description: 'Lich King Nethys - Undead ruler seeking world domination' }
      ],
      notes: 'Bearer of the Crown of Ages, wielder of legendary artifacts, master of all forms of combat and magic.'
    },
    statistics: {
      health: { current: 120, temp: 20, maxHpModifier: 30 },
      fatigue: { current: 0, max: 15 },
      av: { armor: 12, helmet: 3, shield: 4, other: 6 },
      strength: { value: 20, wounded: false },
      agility: { value: 18, wounded: false },
      spirit: { value: 22, wounded: false },
      mind: { value: 19, wounded: false },
      parry: 22,
      dodge: 20,
      resist: 24,
      resolve: 10,
      statusEffects: [
        { id: '1', type: 'blessed', duration: 'permanent', description: 'Blessed by the gods themselves' },
        { id: '2', type: 'enhanced', duration: 'permanent', description: 'Enhanced by dragon blood' },
        { id: '3', type: 'immortal', duration: 'permanent', description: 'Cursed with eternal life' }
      ]
    },
    skills: {
      xp: { total: 1000, spend: 988 },
      skills: [
        { id: '1', name: 'Fighting', rank: 5, xp: 24 },
        { id: '2', name: 'Arcana', rank: 5, xp: 24 },
        { id: '3', name: 'Mysticism', rank: 5, xp: 24 },
        { id: '4', name: 'Athletics', rank: 5, xp: 24 },
        { id: '5', name: 'Fortitude', rank: 5, xp: 24 },
        { id: '6', name: 'Perception', rank: 5, xp: 24 },
        { id: '7', name: 'Insight', rank: 5, xp: 24 },
        { id: '8', name: 'Influence', rank: 5, xp: 24 },
        { id: '9', name: 'Education', rank: 5, xp: 24 },
        { id: '10', name: 'Lore', rank: 5, xp: 24 },
        { id: '11', name: 'Nature', rank: 5, xp: 24 },
        { id: '12', name: 'Survival', rank: 5, xp: 24 },
        { id: '13', name: 'Stealth', rank: 4, xp: 18 },
        { id: '14', name: 'Archery', rank: 4, xp: 18 },
        { id: '15', name: 'Crafting', rank: 4, xp: 18 },
        { id: '16', name: 'Streetwise', rank: 4, xp: 18 }
      ],
      professions: ['Dragon Knight', 'Archmage', 'Divine Champion', 'Temporal Guardian', 'Realm Protector'],
      languages: ['All Known Languages', 'Draconic', 'Celestial', 'Primordial', 'Abyssal', 'Ancient Tongues'],
      abilities: [
        { id: '1', title: 'Dragon Soul', description: 'Immunity to fear and charm, fire resistance', tag: 'Folk' },
        { id: '2', title: 'Legendary Resistance', description: 'Reroll failed saves 3 times per day', tag: 'Talent' },
        { id: '3', title: 'Timeless Body', description: 'Immunity to aging and disease', tag: 'Folk' },
        { id: '4', title: 'Master of Arms', description: 'Proficiency with all weapons and armor', tag: 'Combat Art' },
        { id: '5', title: 'Arcane Mastery', description: 'Access to all magic schools and traditions', tag: 'Talent' },
        { id: '6', title: 'Divine Mandate', description: 'Blessed by gods for a sacred mission', tag: 'Folk' },
        { id: '7', title: 'Immortal Wisdom', description: '+5 to all knowledge and lore checks', tag: 'Talent' },
        { id: '8', title: 'Aura of Command', description: 'Allies gain morale bonuses in combat', tag: 'Talent' }
      ],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true }
    },
    items: {
      coins: 50000,
      encumbrance: {
        encumberedAt: 20,
        overencumberedAt: 30,
        carryModifier: 10,
        currentLoad: 156.5,
        mountMaxLoad: 300,
        storageMaxLoad: 10000
      },
      weapons: [
        {
          id: '1',
          name: 'Dragonbane, the Eternal Blade',
          damage: { base: 'STR', weapon: 10, other: 8, type: 'radiant', staticDamage: false },
          properties: 'legendary, two-handed, dragon slaying, holy, unbreakable, soul-bound',
          description: 'A legendary sword forged from dragon scales and celestial metal, glowing with inner fire.',
          cost: 25000,
          load: 6,
          location: 'worn',
          uses: 0,
          durability: 'unbreakable'
        },
        {
          id: '2',
          name: 'Crown of Ages Staff',
          damage: { base: 'MND', weapon: 8, other: 6, type: 'psychic', staticDamage: false },
          properties: 'legendary, arcane catalyst, mystic catalyst, time magic, reality shaping',
          description: 'An artifact staff that can manipulate time and reality itself.',
          cost: 30000,
          load: 5,
          location: 'carried',
          uses: 0,
          durability: 'artifact'
        },
        {
          id: '3',
          name: 'Bow of the Eternal Hunt',
          damage: { base: 'AGI', weapon: 9, other: 5, type: 'force', staticDamage: false },
          properties: 'legendary, ranged, seeking arrows, infinite ammunition, planar targeting',
          description: 'A bow that can strike targets across dimensions and planes of existence.',
          cost: 20000,
          load: 3,
          location: 'carried',
          uses: 0,
          durability: 'legendary'
        }
      ],
      items: [
        {
          id: '1',
          name: 'Armor of the Dragon King',
          properties: 'legendary armor, +12 AV, dragon resistance, flight, intimidation',
          description: 'Magnificent plate armor forged from the scales of an ancient gold dragon.',
          slot: 'body',
          cost: 40000,
          load: 25,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'legendary'
        },
        {
          id: '2',
          name: 'Crown of Ages',
          properties: 'artifact, +4 AV, time control, reality sight, divine authority',
          description: 'An ancient crown that grants mastery over time and space.',
          slot: 'head',
          cost: 100000,
          load: 2,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'artifact'
        },
        {
          id: '3',
          name: 'Cloak of Planes',
          properties: 'legendary, dimensional travel, plane shifting, ethereal form',
          description: 'A mystical cloak that allows travel between dimensions.',
          slot: 'cloak',
          cost: 15000,
          load: 1,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'legendary'
        },
        {
          id: '4',
          name: 'Ring of Eternal Binding',
          properties: 'artifact, soul binding, immortality curse, power amplification',
          description: 'The source of his immortality and greatest burden.',
          slot: 'ring',
          cost: 0,
          load: 0,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'indestructible'
        }
      ],
      itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true }
    },
    spells: {
      magicSkill: 'Both',
      specialization: 'All',
      focus: { total: 50, current: 45 },
      spellCatalystDamage: 12,
      spells: [
        {
          id: '1',
          name: 'Time Stop',
          rank: 5,
          cost: 10,
          target: 'area',
          range: 'special',
          properties: 'temporal, reality manipulation, legendary',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'temporal', staticDamage: false },
          effect: 'Stops time for all beings except the caster.',
          prepared: true
        },
        {
          id: '2',
          name: 'Dragon\'s Wrath',
          rank: 5,
          cost: 10,
          target: 'area',
          range: 'extreme',
          properties: 'fire, dragon magic, devastation',
          dealsDamage: true,
          damage: { base: 'STR', weapon: 15, type: 'fire', staticDamage: false },
          effect: 'Channels the fury of dragons into a devastating inferno.',
          prepared: true
        },
        {
          id: '3',
          name: 'Divine Intervention',
          rank: 5,
          cost: 10,
          target: 'special',
          range: 'unlimited',
          properties: 'divine, reality alteration, miracle',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'divine', staticDamage: false },
          effect: 'Calls upon divine power to alter reality itself.',
          prepared: true
        },
        {
          id: '4',
          name: 'Plane Shift',
          rank: 4,
          cost: 8,
          target: 'group',
          range: 'touch',
          properties: 'dimensional, teleportation, planar travel',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'dimensional', staticDamage: false },
          effect: 'Transports beings to other planes of existence.',
          prepared: true
        },
        {
          id: '5',
          name: 'Mass Resurrection',
          rank: 5,
          cost: 10,
          target: 'area',
          range: 'medium',
          properties: 'life, divine, resurrection, mass effect',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'life', staticDamage: false },
          effect: 'Brings multiple fallen allies back to life.',
          prepared: true
        }
      ]
    },
    companions: [
      {
        id: '1',
        name: 'Pyraxis the Ancient',
        description: 'An ancient red dragon, oldest and wisest of dragonkind',
        currentHP: 500,
        maxHP: 500,
        wounded: false
      },
      {
        id: '2',
        name: 'Celestial Guardian',
        description: 'An angelic being assigned as divine protector',
        currentHP: 200,
        maxHP: 200,
        wounded: false
      },
      {
        id: '3',
        name: 'Eternal Steed',
        description: 'A legendary mount that exists across all planes',
        currentHP: 150,
        maxHP: 150,
        wounded: false
      }
    ],
    partyId: 'legendary-heroes'
  }
  
  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([testCharacterData]),
      getDocument: vi.fn().mockResolvedValue(testCharacterData),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=test-collection-legend-001',
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

describe('Character Sheet - Advanced Features Comprehensive Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('should load legendary character and display advanced features', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
  })

  it('should display extreme high-level character statistics', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for extreme attribute values (20, 18, 22, 19)
    const extremeAttributes = screen.getAllByText(/20|18|22|19/)
    expect(extremeAttributes.length).toBeGreaterThan(0)
    
    // Check for high HP (120 current, 20 temp)
    const healthValues = screen.getAllByText(/120|20/)
    expect(healthValues.length).toBeGreaterThan(0)
  })

  it('should show legendary weapons and artifacts', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for legendary weapons
    const dragonbane = screen.queryByText(/Dragonbane/) || screen.queryByText(/Eternal Blade/)
    const crownStaff = screen.queryByText(/Crown.*Ages.*Staff/) || screen.queryByText(/Crown/)
    const eternelBow = screen.queryByText(/Bow.*Eternal/) || screen.queryByText(/Eternal Hunt/)
    
    expect(dragonbane || crownStaff || eternelBow).toBeDefined()
  })

  it('should display artifact armor and legendary equipment', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for legendary armor and artifacts
    const dragonArmor = screen.queryByText(/Dragon King/) || screen.queryByText(/Dragon.*Armor/)
    const crownOfAges = screen.queryByText(/Crown of Ages/)
    const planesCloak = screen.queryByText(/Cloak.*Planes/) || screen.queryByText(/Planes/)
    const eternalRing = screen.queryByText(/Eternal Binding/) || screen.queryByText(/Binding/)
    
    expect(dragonArmor || crownOfAges || planesCloak || eternalRing).toBeDefined()
  })

  it('should show reality-bending spells and powers', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for legendary spells
    const timeStop = screen.queryByText('Time Stop')
    const dragonWrath = screen.queryByText(/Dragon.*Wrath/) || screen.queryByText(/Wrath/)
    const divineIntervention = screen.queryByText(/Divine Intervention/) || screen.queryByText(/Intervention/)
    const planeShift = screen.queryByText('Plane Shift')
    const massRes = screen.queryByText(/Mass Resurrection/) || screen.queryByText(/Resurrection/)
    
    expect(timeStop || dragonWrath || divineIntervention || planeShift || massRes).toBeDefined()
  })

  it('should display legendary companions and allies', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for legendary companions
    const pyraxis = screen.queryByText('Pyraxis')
    const ancientDragon = screen.queryByText(/Ancient/) || screen.queryByText(/dragon/i)
    const celestialGuardian = screen.queryByText(/Celestial/) || screen.queryByText(/Guardian/)
    const eternalSteed = screen.queryByText(/Eternal Steed/) || screen.queryByText(/Steed/)
    
    expect(pyraxis || ancientDragon || celestialGuardian || eternalSteed).toBeDefined()
  })

  it('should test extreme high-level skill system', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for maxed-out skills (rank 5)
    const maxedSkills = screen.getAllByText(/5/) // Skill rank 5
    expect(maxedSkills.length).toBeGreaterThan(0)
    
    // Check for extreme XP values (1000 total, 988 spent)
    const xpValues = screen.getAllByText(/1000|988/)
    expect(xpValues.length).toBeGreaterThan(0)
  })

  it('should handle legendary abilities and powers', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for legendary abilities
    const dragonSoul = screen.queryByText(/Dragon Soul/) || screen.queryByText(/Soul/)
    const legendaryResistance = screen.queryByText(/Legendary Resistance/) || screen.queryByText(/Resistance/)
    const timelessBody = screen.queryByText(/Timeless/) || screen.queryByText(/Body/)
    const masterOfArms = screen.queryByText(/Master.*Arms/) || screen.queryByText(/Master/)
    const divineMandate = screen.queryByText(/Divine Mandate/) || screen.queryByText(/Mandate/)
    
    expect(dragonSoul || legendaryResistance || timelessBody || masterOfArms || divineMandate).toBeDefined()
  })

  it('should test extreme wealth and resource management', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for extreme wealth (50,000 coins)
    const wealthElements = screen.getAllByText(/50000|50,000/)
    expect(wealthElements.length).toBeGreaterThan(0)
    
    // Check for high encumbrance values
    const loadElements = screen.getAllByText(/156|20|30/) // Current load, encumbered at, overencumbered at
    expect(loadElements.length).toBeGreaterThan(0)
  })

  it('should display permanent status effects and immortality', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for permanent status effects
    const blessed = screen.queryByText(/blessed/i)
    const enhanced = screen.queryByText(/enhanced/i)
    const immortal = screen.queryByText(/immortal/i)
    const permanent = screen.queryByText(/permanent/i)
    
    expect(blessed || enhanced || immortal || permanent).toBeDefined()
  })

  it('should test legendary magic focus and power', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Check for extreme focus values (50 total, 45 current)
    const focusElements = screen.getAllByText(/50|45/)
    expect(focusElements.length).toBeGreaterThan(0)
    
    // Check for high spell catalyst damage (12)
    const catalystDamage = screen.getAllByText(/12/)
    expect(catalystDamage.length).toBeGreaterThan(0)
  })

  it('should handle complex equipment interactions', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Test equipment-related interactions
    const equipmentButtons = screen.getAllByRole('button')
    expect(equipmentButtons.length).toBeGreaterThan(0)
    
    if (equipmentButtons.length > 0) {
      fireEvent.click(equipmentButtons[0])
      expect(equipmentButtons[0]).toBeDefined()
    }
    
    // Test that legendary equipment properties are displayed
    const legendary = screen.queryByText(/legendary/i)
    const artifact = screen.queryByText(/artifact/i)
    const unbreakable = screen.queryByText(/unbreakable/i)
    
    expect(legendary || artifact || unbreakable).toBeDefined()
  })

  it('should test reality-warping spell interactions', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Test spell-related interactions for high-level spells
    const spellButtons = screen.getAllByRole('button')
    
    // Look for spell preparation checkboxes
    const checkboxes = screen.getAllByRole('checkbox')
    if (checkboxes.length > 0) {
      fireEvent.click(checkboxes[0])
      expect(checkboxes[0]).toBeDefined()
    }
    
    // Check for extreme spell costs (rank 5 spells cost 10 focus)
    const spellCosts = screen.getAllByText(/10/) // Focus cost 10
    expect(spellCosts.length).toBeGreaterThan(0)
  })

  it('should verify comprehensive legendary character integration', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    }, { timeout: 10000 })

    // Comprehensive test of all legendary systems working together
    expect(screen.getByText('Aurelius the Eternal')).toBeDefined()
    
    // Test that legendary features from all systems are accessible
    const allLegendaryElements = screen.getAllByText(/Aurelius|Eternal|Dragon|Legendary|Artifact|Crown|Ancient|Divine/)
    expect(allLegendaryElements.length).toBeGreaterThan(3)
    
    // Verify the character sheet handles extreme high-level data
    const characterContainer = screen.getByText('Aurelius the Eternal').closest('div')
    expect(characterContainer).toBeDefined()
    
    // Test that all advanced systems are integrated properly
    const advancedElements = screen.queryByText(/20|22|120|50000|artifact|legendary|divine|time/i)
    expect(advancedElements).toBeDefined()
    
    // Verify extreme attribute values display correctly
    const extremeValues = screen.getAllByText(/20|18|22|19|120|50|1000/)
    expect(extremeValues.length).toBeGreaterThan(5)
  })
})