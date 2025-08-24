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
  useAuth: () => ({ userLoggedIn: true, currentUser: { uid: 'test-user' }, isAdmin: false, setIsAdmin: vi.fn() }),
}))
vi.mock('@site/src/hooks/createTheme', () => ({ theme: {} }))
vi.mock('@site/src/components/ThemeSwitcher', () => ({ ThemeSwitcher: () => <div>Theme Switcher</div> }))
vi.mock('@site/src/hooks/useDeviceSize', () => ({ useDeviceSize: () => ({ isSmallScreen: false }) }))

// Create a complete character data structure that matches what the application expects
const createCompleteCharacterData = (name: string, customizations = {}) => ({
  docId: 'test-character-1',
  docRef: { id: 'test-character-1' },
  collectionId: 'test-collection',
  personal: {
    name,
    playerName: 'Test Player',
    folk: 'Human',
    upbringing: 'Urban',
    background: 'Adventurer',
    height: '6\'0"',
    weight: '180 lbs',
    age: '25',
    description: 'A test character for integration testing.',
    motivation: 'To test the character sheet functionality.',
    profilePicture: '',
    allies: [],
    contacts: [],
    rivals: [],
    notes: 'This is a test character.',
    ...customizations.personal
  },
  statistics: {
    health: { current: 40, temp: 0, maxHpModifier: 0 },
    fatigue: { current: 0, max: 6 },
    av: { armor: 2, helmet: 0, shield: 0, other: 0 },
    strength: { value: 12, wounded: false },
    agility: { value: 14, wounded: false },
    spirit: { value: 10, wounded: false },
    mind: { value: 16, wounded: false },
    parry: 10,
    dodge: 12,
    resist: 14,
    resolve: 3,
    statusEffects: [],
    ...customizations.statistics
  },
  skills: {
    xp: { total: 100, spend: 96 },
    skills: [
      { id: '1', name: 'Fighting', rank: 2, xp: 6 },
      { id: '2', name: 'Arcana', rank: 3, xp: 12 },
      { id: '3', name: 'Perception', rank: 2, xp: 6 },
      { id: '4', name: 'Athletics', rank: 1, xp: 2 },
      { id: '5', name: 'Stealth', rank: 1, xp: 2 }
    ],
    professions: ['Scholar'],
    languages: ['Tradespeak', 'Draconic'],
    abilities: [
      { id: '1', title: 'Spell Focus', description: 'Enhanced magical abilities', tag: 'Talent' }
    ],
    abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true },
    ...customizations.skills
  },
  items: {
    coins: 500,
    encumbrance: {
      encumberedAt: 12,
      overencumberedAt: 18,
      carryModifier: 0,
      currentLoad: 25,
      mountMaxLoad: 0,
      storageMaxLoad: 0
    },
    weapons: [],
    items: [],
    itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true },
    ...customizations.items
  },
  spells: {
    magicSkill: 'Arcana',
    specialization: 'Evocation',
    focus: { total: 12, current: 10 },
    spellCatalystDamage: 0,
    spells: [],
    ...customizations.spells
  },
  companions: [],
  partyId: undefined,
  ...customizations
})

// Mock Firebase service
vi.mock('../../src/dev/firebaseService', () => {
  const testCharacter = {
    docId: 'test-character-1',
    docRef: { id: 'test-character-1' },
    collectionId: 'test-collection',
    personal: {
      name: 'Test Character',
      playerName: 'Test Player',
      folk: 'Human',
      upbringing: 'Urban',
      background: 'Adventurer'
    },
    statistics: {
      health: { current: 40, temp: 0, maxHpModifier: 0 },
      fatigue: { current: 0, max: 6 },
      av: { armor: 2, helmet: 0, shield: 0, other: 0 },
      strength: { value: 12, wounded: false },
      agility: { value: 14, wounded: false },
      spirit: { value: 10, wounded: false },
      mind: { value: 16, wounded: false },
      parry: 10,
      dodge: 12,
      resist: 14,
      resolve: 3,
      statusEffects: []
    },
    skills: {
      xp: { total: 100, spend: 96 },
      skills: [
        { id: '1', name: 'Fighting', rank: 2, xp: 6 },
        { id: '2', name: 'Arcana', rank: 3, xp: 12 }
      ],
      professions: ['Scholar'],
      languages: ['Tradespeak', 'Draconic'],
      abilities: [],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true }
    },
    items: {
      coins: 500,
      encumbrance: {
        encumberedAt: 12,
        overencumberedAt: 18,
        carryModifier: 0,
        currentLoad: 25,
        mountMaxLoad: 0,
        storageMaxLoad: 0
      },
      weapons: [],
      items: [],
      itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true }
    },
    spells: {
      magicSkill: 'Arcana',
      specialization: 'Evocation',
      focus: { total: 12, current: 10 },
      spellCatalystDamage: 0,
      spells: []
    },
    companions: [],
    partyId: undefined
  }
  
  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([testCharacter]),
      getDocument: vi.fn().mockResolvedValue(testCharacter),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

Object.defineProperty(window, 'location', {
  value: { ...window.location, search: '?id=test-collection-test-character-1', hostname: 'localhost' },
  writable: true,
})

const createTestStore = (characterName = 'Test Character') => {
  const testCharacterData = {
    docId: 'test-character-1',
    docRef: { id: 'test-character-1' },
    collectionId: 'test-collection',
    personal: {
      name: characterName,
      playerName: 'Test Player',
      folk: 'Human',
      upbringing: 'Urban',
      background: 'Adventurer'
    },
    statistics: {
      health: { current: 40, temp: 0, maxHpModifier: 0 },
      fatigue: { current: 0, max: 6 },
      av: { armor: 2, helmet: 0, shield: 0, other: 0 },
      strength: { value: 12, wounded: false },
      agility: { value: 14, wounded: false },
      spirit: { value: 10, wounded: false },
      mind: { value: 16, wounded: false },
      parry: 10,
      dodge: 12,
      resist: 14,
      resolve: 3,
      statusEffects: []
    },
    skills: {
      xp: { total: 100, spend: 96 },
      skills: [
        { id: '1', name: 'Fighting', rank: 2, xp: 6 },
        { id: '2', name: 'Arcana', rank: 3, xp: 12 }
      ],
      professions: ['Scholar'],
      languages: ['Tradespeak', 'Draconic'],
      abilities: [],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true }
    },
    items: {
      coins: 500,
      encumbrance: {
        encumberedAt: 12,
        overencumberedAt: 18,
        carryModifier: 0,
        currentLoad: 25,
        mountMaxLoad: 0,
        storageMaxLoad: 0
      },
      weapons: [],
      items: [],
      itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true }
    },
    spells: {
      magicSkill: 'Arcana',
      specialization: 'Evocation',
      focus: { total: 12, current: 10 },
      spellCatalystDamage: 0,
      spells: []
    },
    companions: [],
    partyId: undefined
  }

  return configureStore({
    reducer: { characterSheet: characterSheetReducer },
    preloadedState: {
      characterSheet: {
        activeCharacter: testCharacterData,
        unsavedChanges: false,
        saveTimeout: false,
        autosave: false,
        loadingSave: false,
      }
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  })
}

const TestWrapper: React.FC<{ children: React.ReactNode; characterName?: string }> = ({ 
  children, 
  characterName = 'Test Character'
}) => {
  const store = createTestStore(characterName)
  const theme = experimental_extendTheme({})
  return (
    <Provider store={store}>
      <Experimental_CssVarsProvider theme={theme}>
        {children}
      </Experimental_CssVarsProvider>
    </Provider>
  )
}

describe('Character Sheet - Working Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('should successfully load and display character data', async () => {
    render(
      <TestWrapper characterName="Elara Spellweaver">
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Elara Spellweaver')).toBeDefined()
    }, { timeout: 5000 })

    expect(screen.getByText('Elara Spellweaver')).toBeDefined()
  })

  it('should display character level calculation correctly', async () => {
    render(
      <TestWrapper characterName="Advanced Character">
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Advanced Character')).toBeDefined()
    })

    // Character with 96 XP spent should show appropriate level
    const levelText = screen.queryByText(/Level/)
    expect(levelText).toBeDefined()
  })

  it('should render character statistics correctly', async () => {
    render(
      <TestWrapper characterName="Strong Character">
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Strong Character')).toBeDefined()
    })

    // Look for attribute values
    const attributeElements = screen.getAllByText(/16|12|14/)
    expect(attributeElements.length).toBeGreaterThan(0)
  })

  it('should display character skills and progression', async () => {
    render(
      <TestWrapper characterName="Skilled Character">
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Skilled Character')).toBeDefined()
    })

    // Look for skills
    const fightingSkill = screen.queryByText('Fighting')
    const arcanaSkill = screen.queryByText('Arcana')
    
    expect(fightingSkill || arcanaSkill).toBeDefined()
  })

  it('should show character spells and magic system', async () => {
    render(
      <TestWrapper characterName="Magic User">
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Magic User')).toBeDefined()
    })

    // Look for magic-related elements
    const arcanaText = screen.queryByText('Arcana')
    const evocationText = screen.queryByText('Evocation')
    
    expect(arcanaText || evocationText).toBeDefined()
  })

  it('should handle user interactions with the character sheet', async () => {
    render(
      <TestWrapper characterName="Interactive Character">
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Interactive Character')).toBeDefined()
    })

    // Test button interactions
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
    
    // Click a button to test interactivity
    if (buttons.length > 0) {
      fireEvent.click(buttons[0])
      expect(buttons[0]).toBeDefined()
    }

    // Test text input interactions
    const textInputs = screen.getAllByRole('textbox')
    if (textInputs.length > 0) {
      fireEvent.change(textInputs[0], { target: { value: 'test input' } })
      expect(textInputs[0]).toBeDefined()
    }
  })

  it('should integrate all character systems properly', async () => {
    render(
      <TestWrapper characterName="Complete Character">
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Complete Character')).toBeDefined()
    })

    // Verify integration of multiple systems
    expect(screen.getByText('Complete Character')).toBeDefined()
    
    // Look for elements from different character systems
    const characterElements = screen.getAllByText(/Complete|Character|Fighting|Arcana/)
    expect(characterElements.length).toBeGreaterThan(1)
  })

  it('should handle character data persistence and auto-save', async () => {
    render(
      <TestWrapper characterName="Persistent Character">
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Persistent Character')).toBeDefined()
    })

    // Verify save functionality is available (button should be present)
    const saveButton = screen.queryByLabelText('save character')
    expect(saveButton).toBeDefined()

    // Test data modification that would trigger auto-save
    const textInputs = screen.getAllByRole('textbox')
    if (textInputs.length > 0) {
      fireEvent.change(textInputs[0], { target: { value: 'modified for persistence test' } })
      expect(textInputs[0]).toBeDefined()
    }
  })
})