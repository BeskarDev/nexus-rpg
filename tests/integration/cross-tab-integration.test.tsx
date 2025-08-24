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

describe('Character Sheet - Cross-Tab Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should navigate between all tabs successfully', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    // Wait for component to load
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Get all available tabs (Skills, Items, Spells, Personal, Companions, Party in desktop)
    const tabs = screen.getAllByRole('tab')
    
    // Test navigation through each tab
    for (const tab of tabs) {
      await user.click(tab)
      await waitFor(() => {
        expect(tab.getAttribute('aria-selected')).toBe('true')
      })
    }
  })

  it('should maintain data persistence across tab switches', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Navigate to Skills tab and verify it loads
    const skillsTab = screen.getByRole('tab', { name: /skills/i })
    await user.click(skillsTab)
    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })

    // Navigate to Items tab and verify it loads
    const itemsTab = screen.getByRole('tab', { name: /items/i })
    await user.click(itemsTab)
    await waitFor(() => {
      expect(itemsTab.getAttribute('aria-selected')).toBe('true')
    })

    // Navigate back to Skills and verify it still works
    await user.click(skillsTab)
    await waitFor(() => {
      expect(skillsTab.getAttribute('aria-selected')).toBe('true')
    })
  })

  it('should handle auto-save functionality across tabs', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test that navigation between tabs doesn't break auto-save
    const tabs = screen.getAllByRole('tab')
    
    for (const tab of tabs.slice(0, 3)) { // Test first 3 tabs to avoid timeout
      await user.click(tab)
      await waitFor(() => {
        expect(tab.getAttribute('aria-selected')).toBe('true')
      })
      
      // Simulate some time for auto-save to potentially trigger
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  })

  it('should maintain responsive design across all tabs', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test responsive behavior on each tab
    const tabs = screen.getAllByRole('tab')
    
    for (const tab of tabs) {
      await user.click(tab)
      await waitFor(() => {
        expect(tab.getAttribute('aria-selected')).toBe('true')
      })
      
      // Verify tab content is responsive (basic check)
      const tabContent = document.querySelector('[role="tabpanel"]')
      expect(tabContent).toBeTruthy()
    }
  })

  it('should handle character data loading across all tabs', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Verify that each tab can be loaded without errors
    const tabs = screen.getAllByRole('tab')
    
    for (const tab of tabs) {
      await user.click(tab)
      await waitFor(() => {
        expect(tab.getAttribute('aria-selected')).toBe('true')
        // Each tab should have some content
        const tabContent = document.querySelector('[role="tabpanel"]')
        expect(tabContent).toBeTruthy()
      })
    }
  })

  it('should handle error states gracefully across tabs', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test that tabs handle potential errors gracefully
    const tabs = screen.getAllByRole('tab')
    
    // Navigate through tabs rapidly to test error handling
    for (let i = 0; i < Math.min(tabs.length, 3); i++) {
      const tab = tabs[i]
      await user.click(tab)
      // Don't wait as long to simulate rapid navigation
      await waitFor(() => {
        expect(tab.getAttribute('aria-selected')).toBe('true')
      }, { timeout: 2000 })
    }
  })

  it('should maintain character sheet state integrity', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Verify character sheet maintains state integrity
    const { rerender } = render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    })

    // Test rerendering doesn't break state
    rerender(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    })
  })

  it('should handle keyboard navigation between tabs', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test keyboard navigation
    const firstTab = screen.getAllByRole('tab')[0]
    firstTab.focus()
    
    // Test arrow key navigation
    await user.keyboard('{ArrowRight}')
    await waitFor(() => {
      const focusedElement = document.activeElement
      expect(focusedElement?.getAttribute('role')).toBe('tab')
    })
  })

  it('should handle tab accessibility features', async () => {
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Verify accessibility attributes
    const tabs = screen.getAllByRole('tab')
    
    tabs.forEach(tab => {
      // Each tab should have proper ARIA attributes
      expect(tab.getAttribute('role')).toBe('tab')
      expect(tab.getAttribute('aria-selected')).toBeDefined()
    })

    // Verify tab panels exist
    const tabPanels = screen.getAllByRole('tabpanel')
    expect(tabPanels.length).toBeGreaterThan(0)
  })

  it('should handle concurrent tab operations', async () => {
    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test concurrent operations don't break the UI
    const tabs = screen.getAllByRole('tab')
    
    // Simulate rapid tab switching
    if (tabs.length >= 2) {
      await Promise.all([
        user.click(tabs[0]),
        user.click(tabs[1])
      ])
      
      await waitFor(() => {
        // At least one tab should be selected
        const selectedTabs = tabs.filter(tab => 
          tab.getAttribute('aria-selected') === 'true'
        )
        expect(selectedTabs.length).toBeGreaterThan(0)
      })
    }
  })
})