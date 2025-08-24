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

describe('Character Sheet - Responsive Design Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should render properly on desktop viewport', async () => {
    // Set desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    })

    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Desktop should display tabs horizontally
    const tabContainer = screen.getByRole('tablist')
    expect(tabContainer).toBeTruthy()
  })

  it('should handle mobile viewport correctly', async () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667,
    })

    // Trigger resize event
    window.dispatchEvent(new Event('resize'))

    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Mobile layout should still be functional
    const tabContainer = screen.getByRole('tablist')
    expect(tabContainer).toBeTruthy()
  })

  it('should handle tablet viewport correctly', async () => {
    // Set tablet viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    // Trigger resize event
    window.dispatchEvent(new Event('resize'))

    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Tablet layout should be functional
    const tabContainer = screen.getByRole('tablist')
    expect(tabContainer).toBeTruthy()
  })

  it('should respond to viewport changes dynamically', async () => {
    const { rerender } = render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Change from desktop to mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    })
    window.dispatchEvent(new Event('resize'))

    rerender(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    })

    // Change back to desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    })
    window.dispatchEvent(new Event('resize'))

    rerender(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    })
  })

  it('should handle touch interactions on mobile', async () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    const user = userEvent.setup()
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test touch interactions (clicks should work on mobile)
    const tabs = screen.getAllByRole('tab')
    
    if (tabs.length > 0) {
      await user.click(tabs[0])
      await waitFor(() => {
        expect(tabs[0].getAttribute('aria-selected')).toBe('true')
      })
    }
  })

  it('should maintain functionality across different screen orientations', async () => {
    const user = userEvent.setup()
    
    // Portrait orientation
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667,
    })

    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test navigation in portrait
    const tabs = screen.getAllByRole('tab')
    if (tabs.length > 0) {
      await user.click(tabs[0])
      await waitFor(() => {
        expect(tabs[0].getAttribute('aria-selected')).toBe('true')
      })
    }

    // Switch to landscape
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 667,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 375,
    })
    window.dispatchEvent(new Event('resize'))

    // Should still work in landscape
    await waitFor(() => {
      const tabsLandscape = screen.getAllByRole('tab')
      expect(tabsLandscape.length).toBeGreaterThan(0)
    })
  })

  it('should handle small screen edge cases', async () => {
    // Very small screen
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 280,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Should still render properly on very small screens
    const tabContainer = screen.getByRole('tablist')
    expect(tabContainer).toBeTruthy()
  })

  it('should handle large screen layouts', async () => {
    // Ultra-wide screen
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 2560,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1440,
    })

    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Should utilize large screens effectively
    const tabContainer = screen.getByRole('tablist')
    expect(tabContainer).toBeTruthy()
  })

  it('should handle Material-UI responsive breakpoints', async () => {
    const user = userEvent.setup()
    
    // Test different Material-UI breakpoints
    const breakpoints = [
      { width: 600, height: 800, name: 'sm' },  // Small
      { width: 960, height: 800, name: 'md' },  // Medium
      { width: 1280, height: 800, name: 'lg' }, // Large
      { width: 1920, height: 1080, name: 'xl' } // Extra Large
    ]

    for (const breakpoint of breakpoints) {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: breakpoint.width,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: breakpoint.height,
      })

      const { unmount } = render(<CharacterSheetWrapper />)
      
      await waitFor(() => {
        const tabs = screen.getAllByRole('tab')
        expect(tabs.length).toBeGreaterThan(0)
      }, { timeout: 10000 })

      // Test basic functionality at each breakpoint
      const tabs = screen.getAllByRole('tab')
      if (tabs.length > 0) {
        await user.click(tabs[0])
        await waitFor(() => {
          expect(tabs[0].getAttribute('aria-selected')).toBe('true')
        })
      }

      unmount()
    }
  })

  it('should handle device pixel ratio variations', async () => {
    // High DPI display
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 2,
    })

    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Should handle high DPI displays
    const tabContainer = screen.getByRole('tablist')
    expect(tabContainer).toBeTruthy()
  })

  it('should maintain performance across different viewport sizes', async () => {
    const user = userEvent.setup()
    const startTime = performance.now()
    
    render(<CharacterSheetWrapper />)
    
    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    }, { timeout: 10000 })

    // Test navigation performance
    const tabs = screen.getAllByRole('tab')
    
    for (let i = 0; i < Math.min(3, tabs.length); i++) {
      await user.click(tabs[i])
      await waitFor(() => {
        expect(tabs[i].getAttribute('aria-selected')).toBe('true')
      })
    }

    const endTime = performance.now()
    const duration = endTime - startTime

    // Should complete within reasonable time (less than 10 seconds)
    expect(duration).toBeLessThan(10000)
  })
})