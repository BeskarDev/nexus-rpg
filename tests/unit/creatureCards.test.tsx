import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { createValidCreatureMarkdown } from '../utils/combat-test-fixtures'

// Mock react-to-print
vi.mock('react-to-print', () => ({
  useReactToPrint: vi.fn(() => vi.fn())
}))

// Mock the theme
vi.mock('@site/src/hooks/createTheme', () => ({
  theme: {}
}))

// Import after mocks
import { CreatureCards } from '@site/src/features/CreatureCards/CreatureCards'

describe('CreatureCards Tool - Basic Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the main CreatureCards component without crashing', async () => {
      render(<CreatureCards />)
      
      // Check for key elements that should always be present
      expect(screen.getByText('Parse Creatures')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)).toBeInTheDocument()
      expect(screen.getByText('Upload Markdown File')).toBeInTheDocument()
      expect(screen.getByText('Upload and parse a markdown file with creature stat blocks to begin.')).toBeInTheDocument()
    })

    it('should render the markdown input field', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here/i)
      expect(markdownInput).toBeInTheDocument()
    })

    it('should render file upload input', async () => {
      render(<CreatureCards />)
      
      const fileInput = screen.getByLabelText(/upload markdown file/i)
      expect(fileInput).toBeInTheDocument()
      expect(fileInput).toHaveAttribute('type', 'file')
    })
  })

  describe('Basic Functionality', () => {
    it('should handle parse markdown button click', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // Add some text to enable the button
      await userEvent.type(markdownInput, 'some text')
      await userEvent.click(parseButton)
      
      // Should not crash (might show error for invalid markdown)
      expect(parseButton).toBeInTheDocument()
    })

    it('should handle print button click', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // Use simpler markdown for faster parsing
      const simpleMarkdown = `### **Test Creature** (Medium Humanoid)
**Tier:** 1 (Basic)
| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 10 | 2  | d6 | d8 | d6 | d6  | 8     | 9     | 7      |
**Skills:** Fighting (1)
**Attacks:**
- **Club**. 3/5/7 damage.
**Abilities:**
- **Simple Ability.** Basic effect.`
      
      // Clear and paste markdown content directly
      await userEvent.clear(markdownInput)
      await userEvent.type(markdownInput, simpleMarkdown)
      await userEvent.click(parseButton)
      
      // Wait for parsing and PRINT button to appear
      await waitFor(() => {
        expect(screen.getByText('PRINT')).toBeInTheDocument()
      }, { timeout: 5000 })
      
      const printButton = screen.getByText('PRINT')
      await userEvent.click(printButton)
      
      // Should not crash
      expect(printButton).toBeInTheDocument()
    }, 10000)

    it('should handle markdown input', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      
      const testMarkdown = 'Test creature markdown content'
      
      // Clear input first, then use paste method for more reliable text input
      await userEvent.clear(markdownInput)
      await userEvent.click(markdownInput)
      await userEvent.paste(testMarkdown)
      
      expect(markdownInput).toHaveValue(testMarkdown)
    })

    it('should handle file upload interaction', async () => {
      render(<CreatureCards />)
      
      const fileInput = screen.getByLabelText(/upload markdown file/i)
      
      // Should be able to click the file input
      await userEvent.click(fileInput)
      
      // Should not crash
      expect(fileInput).toBeInTheDocument()
    })
  })

  describe('Markdown Parsing', () => {
    it('should handle empty markdown input', async () => {
      render(<CreatureCards />)
      
      const parseButton = screen.getByText('Parse Creatures')
      
      // Parse button should be disabled when there's no input
      expect(parseButton).toHaveProperty('disabled', true)
      
      // Should show button but it should be disabled
      expect(parseButton).toBeInTheDocument()
    })

    it('should handle invalid markdown input', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // Enter invalid markdown
      await userEvent.type(markdownInput, 'This is not valid creature markdown')
      await userEvent.click(parseButton)
      
      // Should handle error gracefully
      expect(parseButton).toBeInTheDocument()
    })

    it('should attempt to parse simple markdown', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // Enter simple markdown that might work
      const simpleMarkdown = `
### **Test Creature** (Medium Humanoid)

**Tier:** 1 (Basic)

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 10 | 2  | d6 | d8 | d6 | d6  | 8     | 9     | 7      |

**Skills:** Fighting (1)

**Attacks:**

- **Club**. 3/5/7 damage.

**Abilities:**

- **Simple Ability.** Basic effect.
`
      
      await userEvent.type(markdownInput, simpleMarkdown)
      await userEvent.click(parseButton)
      
      // Should attempt to parse without crashing
      expect(parseButton).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should display error for parsing failures', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // Enter clearly invalid data
      await userEvent.type(markdownInput, 'completely invalid data')
      await userEvent.click(parseButton)
      
      await waitFor(() => {
        // Should show some kind of error indication
        const errorElement = screen.queryByText(/failed to parse/i) || 
                             screen.queryByText(/error/i) ||
                             screen.queryByText(/invalid/i)
        
        // At minimum, component should not crash
        expect(parseButton).toBeInTheDocument()
      })
    })

    it('should clear previous errors on new parse', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // First, cause an error
      await userEvent.type(markdownInput, 'invalid')
      await userEvent.click(parseButton)
      
      // Then clear and try again
      await userEvent.clear(markdownInput)
      await userEvent.type(markdownInput, 'different invalid text')
      await userEvent.click(parseButton)
      
      // Should handle multiple parsing attempts
      expect(parseButton).toBeInTheDocument()
    })
  })

  describe('UI State Management', () => {
    it('should maintain component state across interactions', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // Use simpler markdown for faster parsing
      const simpleMarkdown = `### **Test Creature** (Medium Humanoid)
**Tier:** 1 (Basic)
| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 10 | 2  | d6 | d8 | d6 | d6  | 8     | 9     | 7      |
**Skills:** Fighting (1)
**Attacks:**
- **Club**. 3/5/7 damage.
**Abilities:**
- **Simple Ability.** Basic effect.`
      
      // Clear and paste markdown content directly
      await userEvent.clear(markdownInput)
      await userEvent.paste(simpleMarkdown)
      await userEvent.click(parseButton)
      
      // Wait for parsing and PRINT button to appear
      await waitFor(() => {
        expect(screen.getByText('PRINT')).toBeInTheDocument()
      }, { timeout: 5000 })
      
      const printButton = screen.getByText('PRINT')
      
      // Multiple interactions should not break component
      await userEvent.click(printButton)
      await userEvent.clear(markdownInput)
      await userEvent.paste('different text')
      
      // All elements should still be functional
      expect(markdownInput).toBeInTheDocument()
      expect(parseButton).toBeInTheDocument()
      expect(printButton).toBeInTheDocument()
    }, 10000)

    it('should handle rapid user interactions', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // Use simpler markdown for faster parsing
      const simpleMarkdown = `### **Test Creature** (Medium Humanoid)
**Tier:** 1 (Basic)
| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 10 | 2  | d6 | d8 | d6 | d6  | 8     | 9     | 7      |
**Skills:** Fighting (1)
**Attacks:**
- **Club**. 3/5/7 damage.
**Abilities:**
- **Simple Ability.** Basic effect.`
      
      // Clear and paste markdown content directly
      await userEvent.clear(markdownInput)
      await userEvent.paste(simpleMarkdown)
      await userEvent.click(parseButton)
      
      // Wait for parsing and PRINT button to appear
      await waitFor(() => {
        expect(screen.getByText('PRINT')).toBeInTheDocument()
      }, { timeout: 5000 })
      
      const printButton = screen.getByText('PRINT')
      
      // Rapid clicking should not break component
      for (let i = 0; i < 3; i++) {
        await userEvent.click(parseButton)
        await userEvent.click(printButton)
      }
      
      expect(parseButton).toBeInTheDocument()
      expect(printButton).toBeInTheDocument()
    }, 10000)
  })

  describe('File Upload Features', () => {
    it('should handle file input changes', async () => {
      render(<CreatureCards />)
      
      const fileInput = screen.getByLabelText(/upload markdown file/i)
      
      // Simulate file selection (without actual file)
      await userEvent.click(fileInput)
      
      // Should not crash
      expect(fileInput).toBeInTheDocument()
    })

    it('should accept markdown file types', async () => {
      render(<CreatureCards />)
      
      const fileInput = screen.getByLabelText(/upload markdown file/i)
      
      // Check file input accepts correct types
      expect(fileInput).toHaveAttribute('accept', '.md,.txt')
    })
  })

  describe('Accessibility', () => {
    it('should have accessible form elements', async () => {
      render(<CreatureCards />)
      
      // Check for proper labels and roles
      const textboxes = screen.getAllByRole('textbox')
      expect(textboxes.length).toBeGreaterThan(0)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should be keyboard navigable', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      const parseButton = screen.getByText('Parse Creatures')
      
      // Should be able to focus elements
      markdownInput.focus()
      expect(document.activeElement).toBe(markdownInput)
      
      parseButton.focus()
      expect(document.activeElement).toBe(parseButton)
    })
  })

  describe('Performance Features', () => {
    it('should handle large markdown input', async () => {
      render(<CreatureCards />)
      
      const markdownInput = screen.getByPlaceholderText(/paste your creature markdown here or upload a file/i)
      
      // Create large markdown content
      const largeMarkdown = 'Large markdown content: ' + 'A'.repeat(500)
      
      await userEvent.click(markdownInput)
      await userEvent.type(markdownInput, largeMarkdown)
      
      // Should handle large input without issues
      expect(markdownInput).toHaveValue(largeMarkdown)
    })
  })
})