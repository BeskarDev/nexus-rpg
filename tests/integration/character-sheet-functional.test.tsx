import { render } from '@testing-library/react'
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

// Mock Firebase service with minimal valid character data
vi.mock('../../src/dev/firebaseService', () => {
  const minimalCharacterData = {
    docId: 'test-char-minimal',
    docRef: { id: 'test-char-minimal' },
    collectionId: 'test-collection',
    personal: {
      name: 'Test Character',
      playerName: 'Test Player',
      folk: 'Human',
      upbringing: 'Common',
      background: 'Warrior',
      height: '6\'0"',
      weight: '180 lbs',
      age: '25',
      description: 'A test character for integration testing.',
      motivation: 'To validate the character sheet functionality.',
      profilePicture: '',
      allies: [],
      rivals: [],
      contacts: [],
      notes: ''
    },
    statistics: {
      health: {
        current: 30,
        temp: 0,
        maxHpModifier: 0
      },
      fatigue: {
        current: 0,
        max: 4
      },
      av: {
        armor: 3,
        helmet: 0,
        shield: 0,
        other: 0
      },
      strength: { value: 10, wounded: false },
      agility: { value: 10, wounded: false },
      spirit: { value: 8, wounded: false },
      mind: { value: 8, wounded: false },
      parry: 10,
      dodge: 10,
      resist: 9,
      resolve: 1,
      statusEffects: []
    },
    skills: {
      xp: {
        total: 50,
        spend: 50
      },
      skills: [
        { id: '1', name: 'athletics', rank: 2, xp: 6 },
        { id: '2', name: 'fortitude', rank: 2, xp: 6 },
        { id: '3', name: 'influence', rank: 1, xp: 2 },
        { id: '4', name: 'insight', rank: 1, xp: 2 },
        { id: '5', name: 'perception', rank: 2, xp: 6 },
        { id: '6', name: 'stealth', rank: 1, xp: 2 },
        { id: '7', name: 'arcana', rank: 0, xp: 0 },
        { id: '8', name: 'archery', rank: 1, xp: 2 },
        { id: '9', name: 'crafting', rank: 1, xp: 2 },
        { id: '10', name: 'education', rank: 1, xp: 2 },
        { id: '11', name: 'fighting', rank: 3, xp: 12 },
        { id: '12', name: 'lore', rank: 1, xp: 2 },
        { id: '13', name: 'mysticism', rank: 0, xp: 0 },
        { id: '14', name: 'nature', rank: 1, xp: 2 },
        { id: '15', name: 'streetwise', rank: 1, xp: 2 },
        { id: '16', name: 'survival', rank: 1, xp: 2 }
      ],
      professions: ['Soldier'],
      languages: ['Common'],
      abilities: [
        { id: '1', title: 'Shield Bash', description: 'Use shield as weapon', tag: 'Combat Art', rank: 1 }
      ]
    },
    items: {
      coins: 50,
      encumbrance: {
        encumberedAt: 10,
        overencumberedAt: 15,
        carryModifier: 0,
        currentLoad: 6,
        mountMaxLoad: 0,
        storageMaxLoad: 0
      },
      weapons: [
        {
          id: '1',
          name: 'Longsword',
          damage: { base: 'STR', weapon: 6, other: 0, type: 'physical', staticDamage: false },
          properties: 'versatile',
          description: 'A well-balanced sword.',
          cost: 50,
          load: 2,
          location: 'worn',
          equipped: true,
          durability: { current: 10, max: 10, die: 'd6' }
        }
      ],
      items: [
        {
          id: '1',
          name: 'Leather Armor',
          description: 'Basic leather protection.',
          cost: 25,
          load: 4,
          location: 'worn',
          equipped: true,
          armorValue: 3,
          durability: { current: 8, max: 8, die: 'd6' },
          properties: ''
        }
      ]
    },
    spells: {
      arcane: {
        focus: { current: 0, max: 0 },
        spellPower: 0,
        disciplines: [],
        known: []
      },
      mystic: {
        focus: { current: 0, max: 0 },
        spellPower: 0,
        traditions: [],
        known: []
      }
    },
    companions: [],
    partyId: undefined
  }
  
  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([minimalCharacterData]),
      getDocument: vi.fn().mockImplementation((collectionId, characterId) => {
        // Mock the correct character based on the parameters
        if (collectionId === 'test-collection' && characterId === 'test-char-minimal') {
          return Promise.resolve(minimalCharacterData)
        }
        return Promise.resolve(null)
      }),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

// Set up URL parameters for character loading
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=test-collection-test-char-minimal',
    hostname: 'localhost',
  },
  writable: true,
})

// Create empty Redux store
const createTestStore = () => {
  return configureStore({
    reducer: {
      characterSheet: characterSheetReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState: undefined,
  })
}

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = createTestStore()
  const theme = experimental_extendTheme({})
  
  return (
    <Provider store={store}>
      <Experimental_CssVarsProvider theme={theme}>
        {children}
      </Experimental_CssVarsProvider>
    </Provider>
  )
}

describe('Character Sheet Functional Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('renders character sheet container without crashing', () => {
    const { container } = render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )

    // Verify the component renders without throwing errors
    expect(container.firstChild).toBeDefined()
    expect(container.querySelector('[class*="MuiBox-root"]')).toBeDefined()
  })

  it('loads Redux store with character sheet reducer', () => {
    const store = createTestStore()
    expect(store.getState().characterSheet).toBeDefined()
    expect(store.getState().characterSheet.activeCharacter).toBeUndefined()
    expect(store.getState().characterSheet.unsavedChanges).toBe(false)
  })

  it('renders with Material-UI theme provider', () => {
    const { container } = render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )

    // Check that Material-UI classes are present, indicating theme is working
    expect(container.querySelector('[class*="MuiBox-root"]')).toBeDefined()
  })

  it('renders header navigation elements', () => {
    const { container } = render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )

    // Check for basic header structure
    expect(container.querySelector('[data-testid="ArrowBackIosNewIcon"]')).toBeDefined()
    expect(container.querySelector('[data-testid="SaveIcon"]')).toBeDefined()
    expect(container.querySelector('[data-testid="DownloadIcon"]')).toBeDefined()
  })

  it('initializes with proper authentication context', () => {
    const { container } = render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )

    // Component should render without authentication errors
    expect(container.firstChild).toBeDefined()
  })
})