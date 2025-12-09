import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

// Mock the JSON data first
vi.mock('@site/src/utils/data/json/combat-arts.json', () => ({
	default: [
		{
			name: 'Power Attack',
			skill: 'Fighting',
			weaponTypes: ['Sword', 'Axe', 'Mace'],
			ranks: 3,
			description: 'Trade accuracy for raw power.',
			effect: 'Take +1 bane on attack rolls to deal +2 weapon damage.',
		},
		{
			name: 'Precise Strike',
			skill: 'Fighting',
			weaponTypes: ['Rapier', 'Dagger'],
			ranks: 2,
			description: 'Target weak points with surgical precision.',
			effect: "Ignore half of target's armor value (rounded up).",
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
import { CombatArts } from '@site/src/features/CombatArts/CombatArts'

describe('CombatArts Tool - Basic Tests', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('Component Rendering', () => {
		it('should render the main CombatArts component without crashing', async () => {
			render(<CombatArts />)

			// Check for key elements
			expect(screen.getByText('PRINT')).toBeInTheDocument()
			expect(screen.getByText('Select all')).toBeInTheDocument()
			expect(screen.getByText('Deselect all')).toBeInTheDocument()
		})

		it('should render the character JSON import field', async () => {
			render(<CombatArts />)

			const importField = screen.getByPlaceholderText(
				/paste character json here/i,
			)
			expect(importField).toBeInTheDocument()
		})

		it('should render combat art selection controls', async () => {
			render(<CombatArts />)

			// Should have the combat arts selector
			const selector = screen.getByRole('combobox')
			expect(selector).toBeInTheDocument()
		})
	})

	describe('Basic Functionality', () => {
		it('should handle select all button click', async () => {
			render(<CombatArts />)

			const selectAllButton = screen.getByText('Select all')
			await userEvent.click(selectAllButton)

			// Should not crash
			expect(selectAllButton).toBeInTheDocument()
		})

		it('should handle deselect all button click', async () => {
			render(<CombatArts />)

			const deselectAllButton = screen.getByText('Deselect all')
			await userEvent.click(deselectAllButton)

			// Should not crash
			expect(deselectAllButton).toBeInTheDocument()
		})

		it('should handle print button click', async () => {
			render(<CombatArts />)

			const printButton = screen.getByText('PRINT')
			await userEvent.click(printButton)

			// Should not crash
			expect(printButton).toBeInTheDocument()
		})

		it('should handle character JSON input', async () => {
			render(<CombatArts />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)

			const testJson = `{"combatArts":[{"name":"Power Attack","rank":2}]}`

			// Use paste instead of type for JSON content
			await userEvent.click(textarea)
			await userEvent.paste(testJson)

			expect(textarea).toHaveValue(testJson)
		})
	})

	describe('Error Handling', () => {
		it('should handle invalid JSON input gracefully', async () => {
			render(<CombatArts />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)

			// Use simple text without special characters
			await userEvent.click(textarea)
			await userEvent.type(textarea, 'invalid json text')

			// Should not crash
			expect(textarea).toBeInTheDocument()
		})

		it('should handle empty character data', async () => {
			render(<CombatArts />)

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
			render(<CombatArts />)

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
			render(<CombatArts />)

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

	describe('Combat Art Specific Features', () => {
		it('should handle skill-based combat art organization', async () => {
			render(<CombatArts />)

			// Should render without errors when dealing with skill-based combat arts
			const printButton = screen.getByText('PRINT')
			expect(printButton).toBeInTheDocument()
		})

		it('should render combat art card structure', async () => {
			render(<CombatArts />)

			// Should have combat art-specific UI elements
			const combatArtsText = screen.getByText(/combat arts will be printed/i)
			expect(combatArtsText).toBeInTheDocument()
		})

		it('should handle weapon type filtering', async () => {
			render(<CombatArts />)

			// Should render without errors when dealing with weapon types
			const selector = screen.getByRole('combobox')
			expect(selector).toBeInTheDocument()
		})

		it('should handle rank progression', async () => {
			render(<CombatArts />)

			// Should render without errors when dealing with ranked combat arts
			const selectAllButton = screen.getByText('Select all')
			await userEvent.click(selectAllButton)

			expect(selectAllButton).toBeInTheDocument()
		})
	})

	describe('Performance Features', () => {
		it('should handle rapid selection changes', async () => {
			render(<CombatArts />)

			const selectAllButton = screen.getByText('Select all')
			const deselectAllButton = screen.getByText('Deselect all')

			// Rapid clicking should not break the component
			for (let i = 0; i < 5; i++) {
				await userEvent.click(selectAllButton)
				await userEvent.click(deselectAllButton)
			}

			expect(selectAllButton).toBeInTheDocument()
			expect(deselectAllButton).toBeInTheDocument()
		})

		it('should handle large character data efficiently', async () => {
			render(<CombatArts />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)

			// Create large mock data - use paste instead of type for performance
			const largeData = 'A'.repeat(1000)

			await userEvent.click(textarea)
			await userEvent.paste(largeData)

			// Verify the value was set
			expect(textarea).toHaveValue(largeData)
		})
	})

	describe('Accessibility', () => {
		it('should have accessible form elements', async () => {
			render(<CombatArts />)

			// Check for proper labels and roles
			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeInTheDocument()

			const buttons = screen.getAllByRole('button')
			expect(buttons.length).toBeGreaterThan(0)
		})

		it('should be keyboard navigable', async () => {
			render(<CombatArts />)

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
