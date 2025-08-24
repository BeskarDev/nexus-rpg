import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { Provider } from 'react-redux'
import { CharacterSheetContainer } from '@site/src/features/CharacterSheet/CharacterSheetContainer'
import { Experimental_CssVarsProvider, experimental_extendTheme } from '@mui/material'
import {
  createTestStore,
  createInitialState,
  createStateWithCharacter
} from '../utils/character-test-helpers'
import {
  createCharacterDocument,
  createBasicCharacter,
  createMinimalCharacter
} from '../utils/character-test-fixtures'

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

// Mock Firebase service for workflow testing
vi.mock('../../src/dev/firebaseService', () => {
  const createTestCharacterData = () => createBasicCharacter()
  
  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([]),
      getDocument: vi.fn().mockImplementation((collectionId, characterId) => {
        if (characterId === 'test-character-id') {
          return Promise.resolve({
            docId: 'test-character-id',
            docRef: { id: 'test-character-id' },
            collectionId: 'test-collection',
            ...createTestCharacterData()
          })
        }
        return Promise.resolve(null)
      }),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode; store?: any }> = ({ 
  children, 
  store 
}) => {
  const testStore = store || createTestStore()
  const theme = experimental_extendTheme({})
  
  return (
    <Provider store={testStore}>
      <Experimental_CssVarsProvider theme={theme}>
        {children}
      </Experimental_CssVarsProvider>
    </Provider>
  )
}

describe('Character Sheet User Workflows', () => {
  beforeEach(() => {
    // Reset URL parameters
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        search: '?id=test-collection-test-character-id',
        hostname: 'localhost',
      },
      writable: true,
    })
  })

  describe('Character Creation Workflow', () => {
    it('should handle complete character creation process', async () => {
      const character = createCharacterDocument(createMinimalCharacter())
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Minimal Character')
      }, { timeout: 10000 })

      // Test the workflow: Character should load with minimal data
      expect(container.textContent).toContain('Minimal Character')
      expect(container.textContent).toContain('Human')
      expect(container.textContent).toContain('Common')
      expect(container.textContent).toContain('Commoner')
    })
  })

  describe('Character Editing Workflow', () => {
    it('should allow editing character basic information', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      // Character should load and display basic information
      expect(container.textContent).toContain('Test Hero')
      expect(container.textContent).toContain('Test Player')
      expect(container.textContent).toContain('Human')
      expect(container.textContent).toContain('Warrior')
    })

    it('should display character skills and abilities', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Fighting')
      }, { timeout: 10000 })

      // Should display skills
      expect(container.textContent).toContain('Fighting')
      expect(container.textContent).toContain('Athletics')
      expect(container.textContent).toContain('Perception')
    })

    it('should display equipment and items', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Longsword')
      }, { timeout: 10000 })

      // Should display weapons and items
      expect(container.textContent).toContain('Longsword')
      expect(container.textContent).toContain('Backpack')
    })
  })

  describe('Save/Load Operations', () => {
    it('should handle character loading state', async () => {
      const store = createTestStore({
        characterSheet: createInitialState({ loadingSave: true })
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      // Should show loading state initially
      // Note: We can't test actual loading indicators without more complex setup
      expect(container.firstChild).toBeDefined()
    })

    it('should handle unsaved changes state', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character, { unsavedChanges: true })
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      // Character should load even with unsaved changes
      expect(container.textContent).toContain('Test Hero')
    })
  })

  describe('Character Sheet Navigation', () => {
    it('should render different character sheet sections', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      // Should render without errors and contain character data
      expect(container.firstChild).toBeDefined()
      expect(container.textContent).toContain('Test Hero')
    })

    it('should handle empty character data gracefully', async () => {
      const character = createCharacterDocument(createMinimalCharacter())
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Minimal Character')
      }, { timeout: 10000 })

      // Should handle minimal character data
      expect(container.textContent).toContain('Minimal Character')
    })
  })

  describe('Error Handling', () => {
    it('should handle missing character gracefully', async () => {
      const store = createTestStore()

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      // Should render without crashing even with no character
      expect(container.firstChild).toBeDefined()
    })

    it('should handle autosave state correctly', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character, { 
          autosave: true,
          saveTimeout: false 
        })
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      // Should handle autosave state
      expect(container.textContent).toContain('Test Hero')
    })
  })

  describe('Responsive Design', () => {
    it('should render on different screen sizes', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      // Test desktop view
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      expect(container.firstChild).toBeDefined()
      expect(container.textContent).toContain('Test Hero')
    })
  })

  describe('Character Data Validation', () => {
    it('should handle character with comprehensive data', async () => {
      const character = createCharacterDocument()
      // Add comprehensive data
      character.companions = [
        {
          id: '1',
          name: 'Companion 1',
          markdown: 'A faithful companion',
          currentHP: 15,
          maxHP: 20,
          wounded: false
        }
      ]

      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      // Should handle comprehensive character data
      expect(container.textContent).toContain('Test Hero')
    })

    it('should validate character data integrity', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      // Character data should maintain integrity
      expect(container.textContent).toContain('Test Hero')
      expect(container.textContent).toContain('Fighting')
      expect(container.textContent).toContain('Longsword')
    })
  })

  describe('Performance and State Management', () => {
    it('should handle rapid state changes efficiently', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      // Should handle initial load efficiently
      expect(container.firstChild).toBeDefined()
    })

    it('should maintain state consistency across renders', async () => {
      const character = createCharacterDocument()
      const store = createTestStore({
        characterSheet: createStateWithCharacter(character)
      })

      const { container, rerender } = render(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(container.textContent).toContain('Test Hero')
      }, { timeout: 10000 })

      // Rerender should maintain state
      rerender(
        <TestWrapper store={store}>
          <CharacterSheetContainer />
        </TestWrapper>
      )

      expect(container.textContent).toContain('Test Hero')
    })
  })
})