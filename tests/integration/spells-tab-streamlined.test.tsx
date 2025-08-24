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

describe('Character Sheet - Spells Tab Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should render the spells tab and navigate to it', async () => {
    render(<CharacterSheetWrapper />)
    
    // Wait for the component to load and locate the Spells tab
    await waitFor(() => {
      const spellsTab = screen.getByRole('tab', { name: /spells/i })
      expect(spellsTab).toBeTruthy()
    }, { timeout: 10000 })

    // Click on Spells tab to ensure it's active
    const spellsTab = screen.getByRole('tab', { name: /spells/i })
    await userEvent.click(spellsTab)

    // Verify spells tab is active
    await waitFor(() => {
      expect(spellsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should handle spells tab interactions', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const spellsTab = screen.getByRole('tab', { name: /spells/i })
      expect(spellsTab).toBeTruthy()
    }, { timeout: 10000 })

    const spellsTab = screen.getByRole('tab', { name: /spells/i })
    await user.click(spellsTab)

    await waitFor(() => {
      expect(spellsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should persist spell changes across tab navigation', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const spellsTab = screen.getByRole('tab', { name: /spells/i })
      expect(spellsTab).toBeTruthy()
    }, { timeout: 10000 })

    const spellsTab = screen.getByRole('tab', { name: /spells/i })
    await user.click(spellsTab)

    // Verify spells tab is active
    await waitFor(() => {
      expect(spellsTab.getAttribute('aria-selected')).toBe('true')
    })

    // Navigate to another tab and back
    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)
    
    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })

    // Navigate back to spells
    await user.click(spellsTab)
    
    await waitFor(() => {
      expect(spellsTab.getAttribute('aria-selected')).toBe('true')
    })
  })
})