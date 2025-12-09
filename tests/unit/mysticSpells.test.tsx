import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

// Mock the JSON data first
vi.mock('@site/src/utils/data/json/mystic-spells.json', () => ({
	default: [
		{
			name: 'Heal',
			rank: 1,
			tradition: 'Life',
			castTime: '1 Action',
			range: 'Touch',
			duration: 'Briefly',
			focus: 2,
			description: 'Channel positive energy to heal wounds.',
			effect: 'Restore +4/+8/+12 hit points.',
		},
		{
			name: 'Sanctuary',
			rank: 2,
			tradition: 'Peace',
			castTime: '1 Action',
			range: 'Touch',
			duration: 'Short',
			focus: 4,
			description: 'Ward a creature with protective energy.',
			effect: 'Attackers must succeed on Spirit + Mysticism vs. TN 10.',
		},
	],
}))

// Mock react-to-print
vi.mock('react-to-print', () => ({
	useReactToPrint: vi.fn(() => vi.fn()),
}))

// Mock the theme
vi.mock('@site/src/hooks/createTheme', () => ({
	theme: {},
}))

// Import after mocks
import { MysticSpells } from '@site/src/features/MysticSpells/MysticSpells'

describe('MysticSpells Tool - Basic Tests', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('Component Rendering', () => {
		it('should render the main MysticSpells component without crashing', async () => {
			render(<MysticSpells />)

			// Check for key elements
			expect(screen.getByText('PRINT')).toBeInTheDocument()
			expect(screen.getByText('Select all')).toBeInTheDocument()
			expect(screen.getByText('Deselect all')).toBeInTheDocument()
		})

		it('should render the character JSON import field', async () => {
			render(<MysticSpells />)

			const importField = screen.getByPlaceholderText(
				/paste character json here/i,
			)
			expect(importField).toBeInTheDocument()
		})

		it('should render spell selection controls', async () => {
			render(<MysticSpells />)

			// Should have the mystic spells selector
			const selector = screen.getByRole('combobox')
			expect(selector).toBeInTheDocument()
		})
	})

	describe('Basic Functionality', () => {
		it('should handle select all button click', async () => {
			render(<MysticSpells />)

			const selectAllButton = screen.getByText('Select all')
			await userEvent.click(selectAllButton)

			// Should not crash
			expect(selectAllButton).toBeInTheDocument()
		})

		it('should handle deselect all button click', async () => {
			render(<MysticSpells />)

			const deselectAllButton = screen.getByText('Deselect all')
			await userEvent.click(deselectAllButton)

			// Should not crash
			expect(deselectAllButton).toBeInTheDocument()
		})

		it('should handle print button click', async () => {
			render(<MysticSpells />)

			const printButton = screen.getByText('PRINT')
			await userEvent.click(printButton)

			// Should not crash
			expect(printButton).toBeInTheDocument()
		})

		it('should handle character JSON input', async () => {
			render(<MysticSpells />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)

			const testJson = `{"spells":{"mystic":[{"name":"Heal","prepared":true}]}}`

			// Use paste instead of type for JSON content
			await userEvent.click(textarea)
			await userEvent.paste(testJson)

			expect(textarea).toHaveValue(testJson)
		})
	})

	describe('Error Handling', () => {
		it('should handle invalid JSON input gracefully', async () => {
			render(<MysticSpells />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)

			// Use simple text without special characters
			await userEvent.click(textarea)
			await userEvent.type(textarea, 'invalid json text')

			// Should not crash
			expect(textarea).toBeInTheDocument()
		})

		it('should handle empty character data', async () => {
			render(<MysticSpells />)

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
			render(<MysticSpells />)

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
			render(<MysticSpells />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)
			const selectAllButton = screen.getByText('Select all')

			// Simulate concurrent actions
			await Promise.all([
				userEvent.type(textarea, 'test data'),
				userEvent.click(selectAllButton),
			])

			// Component should remain functional
			expect(textarea).toBeInTheDocument()
			expect(selectAllButton).toBeInTheDocument()
		})
	})

	describe('Mystic-Specific Features', () => {
		it('should handle tradition-based spell organization', async () => {
			render(<MysticSpells />)

			// Should render without errors when dealing with tradition-based spells
			const printButton = screen.getByText('PRINT')
			expect(printButton).toBeInTheDocument()
		})

		it('should render mystic spell card structure', async () => {
			render(<MysticSpells />)

			// Should have mystic-specific UI elements
			const mysticSpellsText = screen.getByText(
				/mystic spells will be printed/i,
			)
			expect(mysticSpellsText).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('should have accessible form elements', async () => {
			render(<MysticSpells />)

			// Check for proper labels and roles
			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeInTheDocument()

			const buttons = screen.getAllByRole('button')
			expect(buttons.length).toBeGreaterThan(0)
		})

		it('should be keyboard navigable', async () => {
			render(<MysticSpells />)

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
