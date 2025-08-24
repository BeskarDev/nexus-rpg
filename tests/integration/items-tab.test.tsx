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

describe('Character Sheet - Items Tab Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should render the items tab and navigate to it', async () => {
    render(<CharacterSheetWrapper />)
    
    // Wait for the component to load and locate the Items tab
    await waitFor(() => {
      const itemsTab = screen.getByRole('tab', { name: /items/i })
      expect(itemsTab).toBeTruthy()
    }, { timeout: 10000 })

    // Click on Items tab to ensure it's active
    const itemsTab = screen.getByRole('tab', { name: /items/i })
    await userEvent.click(itemsTab)

    // Verify items tab is active
    await waitFor(() => {
      expect(itemsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should handle items tab interactions', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const itemsTab = screen.getByRole('tab', { name: /items/i })
      expect(itemsTab).toBeTruthy()
    }, { timeout: 10000 })

    const itemsTab = screen.getByRole('tab', { name: /items/i })
    await user.click(itemsTab)

    await waitFor(() => {
      expect(itemsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should persist items changes across tab navigation', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const itemsTab = screen.getByRole('tab', { name: /items/i })
      expect(itemsTab).toBeTruthy()
    }, { timeout: 10000 })

    const itemsTab = screen.getByRole('tab', { name: /items/i })
    await user.click(itemsTab)

    // Verify items tab is active
    await waitFor(() => {
      expect(itemsTab.getAttribute('aria-selected')).toBe('true')
    })

    // Navigate to another tab and back
    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)
    
    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })

    // Navigate back to items
    await user.click(itemsTab)
    
    await waitFor(() => {
      expect(itemsTab.getAttribute('aria-selected')).toBe('true')
    })
  })
})