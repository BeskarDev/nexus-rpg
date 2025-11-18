import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

// Mock react-to-print
vi.mock('react-to-print', () => ({
	useReactToPrint: vi.fn(() => vi.fn()),
}))

// Mock the theme
vi.mock('@site/src/hooks/createTheme', () => ({
	theme: {},
}))

// Import after mocks
import { MagicItems } from '@site/src/features/MagicItems/MagicItems'

describe('MagicItems Tool - Basic Tests', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('Component Rendering', () => {
		it('should render the main MagicItems component without crashing', async () => {
			render(<MagicItems />)

			// Check for key elements
			expect(screen.getByText('PRINT')).toBeInTheDocument()
			expect(screen.getByText('Select all')).toBeInTheDocument()
			expect(screen.getByText('Deselect all')).toBeInTheDocument()
		})

		it('should render the JSON import field', async () => {
			render(<MagicItems />)

			const importField = screen.getByPlaceholderText(/paste json here/i)
			expect(importField).toBeInTheDocument()
		})

		it('should render magic item selection controls', async () => {
			render(<MagicItems />)

			// Should have the category filter by text content
			const categoryText = screen.getByText('All Categories')
			expect(categoryText).toBeInTheDocument()
		})

		it('should render print button in disabled state initially', async () => {
			render(<MagicItems />)

			const printButton = screen.getByText('PRINT')
			expect(printButton).toBeDisabled()
		})
	})

	describe('Basic Functionality', () => {
		it('should handle select all button click', async () => {
			render(<MagicItems />)

			const selectAllButton = screen.getByText('Select all')
			await userEvent.click(selectAllButton)

			expect(selectAllButton).toBeInTheDocument()
		})

		it('should handle deselect all button click', async () => {
			render(<MagicItems />)

			const deselectAllButton = screen.getByText('Deselect all')
			await userEvent.click(deselectAllButton)

			expect(deselectAllButton).toBeInTheDocument()
		})

		it('should handle print button click', async () => {
			render(<MagicItems />)

			const printButton = screen.getByText('PRINT')

			// Button should be disabled initially
			expect(printButton).toBeDisabled()
		})
	})

	describe('JSON Parsing', () => {
		it('should handle valid single item JSON input', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			const testJson = JSON.stringify({
				name: 'Test Sword',
				category: 'Weapon',
				quality: '4',
				type: 'Sword',
				cost: '100 coins',
				load: '2',
				description: 'A test sword',
			})

			await userEvent.click(textarea)
			await userEvent.paste(testJson)

			// Should show success message
			expect(
				screen.getByText(/successfully loaded 1 magic item/i),
			).toBeInTheDocument()
		})

		it('should handle valid array JSON input', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			const testJson = JSON.stringify([
				{
					name: 'Test Sword',
					category: 'Weapon',
					quality: '4',
					type: 'Sword',
					cost: '100 coins',
					load: '2',
					description: 'A test sword',
				},
				{
					name: 'Test Ring',
					category: 'Wearable',
					quality: '5',
					type: 'Ring',
					cost: '500 coins',
					load: '0',
					description: 'A test ring',
				},
			])

			await userEvent.click(textarea)
			await userEvent.paste(testJson)

			// Should show success message with count
			expect(
				screen.getByText(/successfully loaded 2 magic items/i),
			).toBeInTheDocument()
		})

		it('should handle invalid JSON input gracefully', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			await userEvent.click(textarea)
			await userEvent.type(textarea, 'invalid json text')

			// Should show error message
			expect(screen.getByText(/failed to parse json/i)).toBeInTheDocument()
		})

		it('should validate required fields', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			// Missing required fields
			const testJson = JSON.stringify({
				name: 'Incomplete Item',
				// Missing category and description
			})

			await userEvent.click(textarea)
			await userEvent.paste(testJson)

			// Should show validation error
			expect(screen.getByText(/no valid items found/i)).toBeInTheDocument()
		})
	})

	describe('Category Filtering', () => {
		it('should handle category filter changes', async () => {
			render(<MagicItems />)

			// First load some items
			const textarea = screen.getByPlaceholderText(/paste json here/i)
			const testJson = JSON.stringify([
				{
					name: 'Test Sword',
					category: 'Weapon',
					quality: '4',
					type: 'Sword',
					cost: '100 coins',
					load: '2',
					description: 'A test sword',
				},
				{
					name: 'Test Potion',
					category: 'Consumable',
					quality: '3',
					type: 'Potion',
					cost: '50 coins',
					load: '1',
					description: 'A test potion',
				},
			])

			await userEvent.click(textarea)
			await userEvent.paste(testJson)

			// Filter should be available - check by text content
			const categoryText = screen.getByText('All Categories')
			expect(categoryText).toBeInTheDocument()
		})
	})

	describe('Error Handling', () => {
		it('should handle empty JSON input', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			await userEvent.click(textarea)
			await userEvent.clear(textarea)

			// Should not crash
			expect(textarea).toBeInTheDocument()
		})

		it('should handle malformed JSON arrays', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			await userEvent.click(textarea)
			await userEvent.paste('[invalid')

			// Should show error
			expect(screen.getByText(/failed to parse json/i)).toBeInTheDocument()
		})
	})

	describe('UI State Management', () => {
		it('should maintain component state across interactions', async () => {
			render(<MagicItems />)

			const selectAllButton = screen.getByText('Select all')
			const deselectAllButton = screen.getByText('Deselect all')
			const printButton = screen.getByText('PRINT')

			// Rapid interactions should not break component
			await userEvent.click(selectAllButton)
			await userEvent.click(deselectAllButton)

			// All buttons should still be available
			expect(selectAllButton).toBeInTheDocument()
			expect(deselectAllButton).toBeInTheDocument()
			expect(printButton).toBeInTheDocument()
		})

		it('should enable print button after loading items', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)
			const printButton = screen.getByText('PRINT')

			// Initially disabled
			expect(printButton).toBeDisabled()

			// Load an item
			const testJson = JSON.stringify({
				name: 'Test Item',
				category: 'Weapon',
				quality: '4',
				type: 'Sword',
				cost: '100 coins',
				load: '2',
				description: 'A test item',
			})

			await userEvent.click(textarea)
			await userEvent.paste(testJson)

			// Select the loaded item
			const selectAllButton = screen.getByText('Select all')
			await userEvent.click(selectAllButton)

			// Now should be enabled
			expect(printButton).not.toBeDisabled()
		})
	})

	describe('Magic Item Specific Features', () => {
		it('should handle all item categories', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			const categories = ['Weapon', 'Wearable', 'Consumable', 'Spell Scroll']
			const items = categories.map((category, index) => ({
				name: `Test ${category} ${index}`,
				category,
				quality: '4',
				type: category,
				cost: '100 coins',
				load: '1',
				description: `A test ${category}`,
			}))

			await userEvent.click(textarea)
			await userEvent.paste(JSON.stringify(items))

			// Should load all categories successfully
			expect(
				screen.getByText(/successfully loaded 4 magic items/i),
			).toBeInTheDocument()
		})

		it('should handle optional fields correctly', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			const itemWithOptionalFields = {
				name: 'Complete Weapon',
				category: 'Weapon',
				quality: '5',
				type: 'Longsword',
				material: 'Steel',
				cost: '500 coins',
				load: '3',
				properties: 'slash, two-handed',
				weaponDamage: '+2',
				durability: '+1d',
				description: 'A complete weapon with all fields',
				enchantment: 'Flaming blade',
				effect: '+1d6 fire damage',
				note: 'Requires attunement',
			}

			await userEvent.click(textarea)
			await userEvent.paste(JSON.stringify(itemWithOptionalFields))

			expect(
				screen.getByText(/successfully loaded 1 magic item/i),
			).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('should have accessible form elements', async () => {
			render(<MagicItems />)

			// Check for proper labels and roles
			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeInTheDocument()

			const buttons = screen.getAllByRole('button')
			expect(buttons.length).toBeGreaterThan(0)
		})

		it('should be keyboard navigable', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)
			const printButton = screen.getByText('PRINT')

			// Should be able to focus elements
			textarea.focus()
			expect(document.activeElement).toBe(textarea)

			printButton.focus()
			expect(document.activeElement).toBe(printButton)
		})
	})

	describe('Performance Features', () => {
		it('should handle large JSON data efficiently', async () => {
			render(<MagicItems />)

			const textarea = screen.getByPlaceholderText(/paste json here/i)

			// Create 50 items
			const manyItems = Array.from({ length: 50 }, (_, i) => ({
				name: `Item ${i}`,
				category: 'Weapon',
				quality: '4',
				type: 'Sword',
				cost: '100 coins',
				load: '2',
				description: `Test item ${i}`,
			}))

			await userEvent.click(textarea)
			await userEvent.paste(JSON.stringify(manyItems))

			// Should handle large datasets
			expect(
				screen.getByText(/successfully loaded 50 magic items/i),
			).toBeInTheDocument()
		})
	})
})
