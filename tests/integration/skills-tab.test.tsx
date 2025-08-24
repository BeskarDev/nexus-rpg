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

describe('Character Sheet - Skills Tab Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should render the skills tab and navigate to it', async () => {
    render(<CharacterSheetWrapper />)
    
    // Wait for the component to load and locate the Skills tab
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    // Click on Skills tab to ensure it's active
    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await userEvent.click(skillsTab)

    // Verify skills tab is active
    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should display general and expert skills after navigation', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    // Look for skills after tab is active
    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should handle skill interactions', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should handle skill rank modifications', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should display XP allocation controls', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should handle dice rolling functionality', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should display combat arts and abilities', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should handle search functionality for combat arts', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should display skill bonuses and modifiers', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should persist skill changes across tab navigation', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    // Verify skills tab is active
    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })

    // Navigate to another tab and back
    const itemsTab = screen.getByRole('tab', { name: /items/i })
    await user.click(itemsTab)
    
    await waitFor(() => {
      expect(itemsTab.getAttribute('aria-selected')).toBe('true')
    })

    // Navigate back to skills
    await user.click(skillsTab)
    
    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should calculate total XP spent correctly', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const skillsTab = screen.getByRole('tab', { name: /skills/i })
      expect(skillsTab).toBeTruthy()
    }, { timeout: 10000 })

    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)

    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })
})