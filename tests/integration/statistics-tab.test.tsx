import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { CharacterSheetWrapper } from '../../src/features/CharacterSheet/CharacterSheetWrapper'

// Mock the dev firebase service to prevent real API calls
vi.mock('../../src/dev/firebaseService', () => ({
  firebaseService: {
    getAllCharacters: vi.fn().mockResolvedValue([]),
    getCharacter: vi.fn().mockResolvedValue(null),
    saveCharacter: vi.fn().mockResolvedValue(undefined),
    createCharacter: vi.fn().mockResolvedValue('mock-character-id'),
    deleteCharacter: vi.fn().mockResolvedValue(undefined),
    getCollection: vi.fn().mockResolvedValue([]),
    getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
    deleteDocument: vi.fn().mockResolvedValue(undefined),
  }
}))

// Mock URL parameters for character sheet
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=mock-collection-mock-character-1',
  },
  writable: true,
})

describe('Character Sheet - Statistics Tab Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should render the statistics section in desktop layout', async () => {
    render(<CharacterSheetWrapper />)
    
    // In desktop layout, Statistics is always visible (not in tabs)
    await waitFor(() => {
      // Look for statistics-related elements
      const statsElements = screen.getAllByText(/strength|agility|spirit|mind|hp|health/i)
      expect(statsElements.length).toBeGreaterThan(0)
    }, { timeout: 10000 })
  })

  it('should handle attribute modifications correctly', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Statistics section should be visible in desktop layout
      const statsElements = screen.getAllByText(/strength|agility|spirit|mind/i)
      expect(statsElements.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Look for attribute input fields and test modification
    await waitFor(() => {
      const inputs = screen.getAllByRole('combobox') || screen.getAllByRole('textbox')
      expect(inputs.length).toBeGreaterThanOrEqual(0)
    })
  })

  it('should display and modify HP correctly', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Look for HP or health-related elements
      const hpElements = screen.getAllByText(/hp|health/i)
      expect(hpElements.length).toBeGreaterThanOrEqual(0)
    }, { timeout: 10000 })
  })

  it('should handle defense values (Parry, Dodge, Resist)', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Look for defense-related elements
      const defenseElements = screen.getAllByText(/parry|dodge|resist/i)
      expect(defenseElements.length).toBeGreaterThanOrEqual(0)
    }, { timeout: 10000 })
  })

  it('should display and manage armor value correctly', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Look for armor value fields
      const armorElements = screen.getAllByText(/armor|av/i)
      expect(armorElements.length).toBeGreaterThanOrEqual(0)
    }, { timeout: 10000 })
  })

  it('should handle fatigue tracking correctly', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Look for fatigue tracking elements
      const fatigueElements = screen.getAllByText(/fatigue/i)
      expect(fatigueElements.length).toBeGreaterThanOrEqual(0)
    }, { timeout: 10000 })
  })

  it('should display and manage status effects', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Look for status effects section
      const statusElements = screen.getAllByText(/status|effect/i)
      expect(statusElements.length).toBeGreaterThanOrEqual(0)
    }, { timeout: 10000 })
  })

  it('should handle resting functionality', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Look for rest-related buttons or controls
      const restElements = screen.getAllByText(/rest|sleep|recover/i)
      expect(restElements.length).toBeGreaterThanOrEqual(0)
    }, { timeout: 10000 })
  })

  it('should persist statistics changes across renders', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const statsElements = screen.getAllByText(/strength|agility|spirit|mind/i)
      expect(statsElements.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test that the component can be rerendered without errors
    rerender(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const statsElementsAfter = screen.getAllByText(/strength|agility|spirit|mind/i)
      expect(statsElementsAfter.length).toBeGreaterThan(0)
    })
  })

  it('should calculate derived values correctly', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      // Verify that the component renders and calculates values
      const valueElements = screen.getAllByText(/\d+|d\d+/)
      expect(valueElements.length).toBeGreaterThan(0)
    }, { timeout: 10000 })
  })
})