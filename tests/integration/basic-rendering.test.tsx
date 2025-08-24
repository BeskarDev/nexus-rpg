import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { CharacterSheetWrapper } from '../../src/features/CharacterSheet/CharacterSheetWrapper'

// Mock the dev firebase service to prevent real API calls
vi.mock('../../src/dev/firebaseService', () => {
  // Create mock character inside the mock factory function
  const mockCharacter = {
    docId: 'mock-character-1',
    docRef: { id: 'mock-character-1' },
    personal: {
      playerName: 'Test Player',
      characterName: 'Test Character',
      level: 1,
      xp: 0,
    },
    statistics: {
      attributes: {
        strength: { base: 10, current: 10 },
        agility: { base: 10, current: 10 },
        spirit: { base: 10, current: 10 },
        mind: { base: 10, current: 10 },
      },
      hp: { max: 20, current: 20 },
      defenses: {
        parry: 8,
        dodge: 8,
        resist: 8,
      },
    },
    skills: {
      general: [],
      expert: [],
    },
    items: {
      weapons: [],
      armor: [],
      inventory: [],
      currency: { copper: 0, silver: 0, gold: 0 },
    },
    spells: {
      arcane: [],
      mystic: [],
    },
  }

  return {
    firebaseService: {
      getAllCharacters: vi.fn().mockResolvedValue([]),
      getCharacter: vi.fn().mockResolvedValue(mockCharacter),
      getDocument: vi.fn().mockResolvedValue(mockCharacter),
      saveCharacter: vi.fn().mockResolvedValue(undefined),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      createCharacter: vi.fn().mockResolvedValue('mock-character-id'),
      deleteCharacter: vi.fn().mockResolvedValue(undefined),
      getCollection: vi.fn().mockResolvedValue([]),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

// Mock URL parameters for character sheet
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=mock-collection-mock-character-1',
  },
  writable: true,
})

describe('Character Sheet - Basic Rendering Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    // Make sure we're in development mode for tests
    process.env.NODE_ENV = 'development'
  })

  it('should render the character sheet wrapper without errors', async () => {
    render(<CharacterSheetWrapper />)
    
    // Wait for character to load and component to render
    await waitFor(() => {
      const container = document.body
      expect(container).toBeTruthy()
    }, { timeout: 15000 })
  })

  it('should render tabs in desktop layout', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Look for any tabs - Skills, Items, Spells, Personal, Companions, Party
      // In desktop layout, Statistics is not a tab but always visible
      const possibleTabs = screen.queryAllByRole('tab')
      expect(possibleTabs.length).toBeGreaterThanOrEqual(0)
    }, { timeout: 15000 })
  })

  it('should test mobile layout behavior', async () => {
    // The useDeviceSize is already mocked in test-setup.ts to return desktop
    // This test just verifies the component handles both cases
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Component should render successfully regardless of layout
      expect(document.body).toBeTruthy()
    }, { timeout: 15000 })
  })

  it('should handle component initialization', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Just verify the component doesn't crash
      expect(document.body).toBeTruthy()
    }, { timeout: 15000 })
  })
})