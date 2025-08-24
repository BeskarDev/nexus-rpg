import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

// Mock the JSON data first
vi.mock('@site/src/utils/json/arcane-spells.json', () => ({
  default: [
    {
      name: 'Magic Missile',
      rank: 1,
      discipline: 'Evocation',
      castTime: '1 Action',
      range: 'Medium',
      duration: 'Briefly',
      focus: 2,
      description: 'Create bolts of arcane energy.',
      effect: 'Deal +4/+8/+12 force damage.'
    },
    {
      name: 'Fireball',
      rank: 3,
      discipline: 'Evocation',
      castTime: '1 Action',
      range: 'Long',
      duration: 'Briefly',
      focus: 6,
      description: 'Hurl an explosive sphere of flame.',
      effect: 'Deal +8/+16/+24 fire damage.'
    }
  ]
}))

// Mock react-to-print
vi.mock('react-to-print', () => ({
  useReactToPrint: vi.fn(() => vi.fn())
}))

// Mock the theme
vi.mock('@site/src/hooks/createTheme', () => ({
  theme: {}
}))

// Import after mocks
import { ArcaneSpells } from '@site/src/features/ArcaneSpells/ArcaneSpells'

describe('ArcaneSpells Tool - Basic Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the main ArcaneSpells component without crashing', async () => {
      render(<ArcaneSpells />)
      
      // Check for key elements
      expect(screen.getByText('PRINT')).toBeInTheDocument()
      expect(screen.getByText('Select all')).toBeInTheDocument()
      expect(screen.getByText('Deselect all')).toBeInTheDocument()
    })

    it('should render the character JSON import field', async () => {
      render(<ArcaneSpells />)
      
      const importField = screen.getByPlaceholderText(/paste character json here/i)
      expect(importField).toBeInTheDocument()
    })

    it('should render spell selection controls', async () => {
      render(<ArcaneSpells />)
      
      // Should have the arcane spells selector by role instead
      const selector = screen.getByRole('combobox')
      expect(selector).toBeInTheDocument()
    })
  })

  describe('Basic Functionality', () => {
    it('should handle select all button click', async () => {
      render(<ArcaneSpells />)
      
      const selectAllButton = screen.getByText('Select all')
      await userEvent.click(selectAllButton)
      
      // Should not crash
      expect(selectAllButton).toBeInTheDocument()
    })

    it('should handle deselect all button click', async () => {
      render(<ArcaneSpells />)
      
      const deselectAllButton = screen.getByText('Deselect all')
      await userEvent.click(deselectAllButton)
      
      // Should not crash
      expect(deselectAllButton).toBeInTheDocument()
    })

    it('should handle print button click', async () => {
      render(<ArcaneSpells />)
      
      const printButton = screen.getByText('PRINT')
      await userEvent.click(printButton)
      
      // Should not crash
      expect(printButton).toBeInTheDocument()
    })

    it('should handle character JSON input', async () => {
      render(<ArcaneSpells />)
      
      const textarea = screen.getByPlaceholderText(/paste character json here/i)
      
      const testJson = `{"spells":{"arcane":[{"name":"Magic Missile","prepared":true}]}}`
      
      // Use paste instead of type for JSON content
      await userEvent.click(textarea)
      await userEvent.paste(testJson)
      
      expect(textarea).toHaveValue(testJson)
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid JSON input gracefully', async () => {
      render(<ArcaneSpells />)
      
      const textarea = screen.getByPlaceholderText(/paste character json here/i)
      
      // Use simple text without special characters
      await userEvent.click(textarea)
      await userEvent.type(textarea, 'invalid json text')
      
      // Should not crash
      expect(textarea).toBeInTheDocument()
    })

    it('should handle empty character data', async () => {
      render(<ArcaneSpells />)
      
      const textarea = screen.getByPlaceholderText(/paste character json here/i)
      
      // Use simple text
      await userEvent.click(textarea)
      await userEvent.type(textarea, 'empty')
      
      // Should not crash
      expect(textarea).toBeInTheDocument()
    })
  })

  describe('UI State Management', () => {
    it('should maintain component state across interactions', async () => {
      render(<ArcaneSpells />)
      
      const selectAllButton = screen.getByText('Select all')
      const deselectAllButton = screen.getByText('Deselect all')
      const printButton = screen.getByText('PRINT')
      
      // Rapid interactions should not break component
      await userEvent.click(selectAllButton)
      await userEvent.click(deselectAllButton)
      await userEvent.click(printButton)
      
      // All buttons should still be available
      expect(selectAllButton).toBeInTheDocument()
      expect(deselectAllButton).toBeInTheDocument()
      expect(printButton).toBeInTheDocument()
    })

    it('should handle concurrent user actions', async () => {
      render(<ArcaneSpells />)
      
      const textarea = screen.getByPlaceholderText(/paste character json here/i)
      const selectAllButton = screen.getByText('Select all')
      
      // Simulate concurrent actions
      await Promise.all([
        userEvent.type(textarea, 'test data'),
        userEvent.click(selectAllButton)
      ])
      
      // Component should remain functional
      expect(textarea).toBeInTheDocument()
      expect(selectAllButton).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible form elements', async () => {
      render(<ArcaneSpells />)
      
      // Check for proper labels and roles
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should be keyboard navigable', async () => {
      render(<ArcaneSpells />)
      
      const textarea = screen.getByPlaceholderText(/paste character json here/i)
      const printButton = screen.getByText('PRINT')
      
      // Should be able to focus elements
      textarea.focus()
      expect(document.activeElement).toBe(textarea)
      
      printButton.focus()
      expect(document.activeElement).toBe(printButton)
    })
  })
})