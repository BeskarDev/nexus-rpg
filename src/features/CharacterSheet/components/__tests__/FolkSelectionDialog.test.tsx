import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FolkSelectionDialog } from '../FolkSelectionDialog'

// Mock the folk data
vi.mock('../../../../utils/data/json/folk.json', () => ({
	default: [
		{
			name: 'Dwarf',
			category: 'Old Folk',
			quote: 'The stone remembers what flesh forgets.',
			description:
				'Carved of the stone itself, dwarves maintain a deep connection to the earth.',
			abilities: [
				{ name: 'Dwarven Sight', description: 'You can see in darkness' },
				{ name: 'Stoneskin', description: 'You gain +1 AV' },
			],
			languages: ['Dwarven'],
			cultures: [],
		},
		{
			name: 'Elf',
			category: 'Old Folk',
			quote: 'We do not conquer the land—we commune with it.',
			description: 'Living in spiritual symbiosis with nature.',
			abilities: [
				{ name: 'Night Vision', description: 'Enhanced sight in low light' },
				{
					name: 'Fleet-Footed',
					description: 'Gain +1 Movement once per combat',
				},
			],
			languages: ['Elvish'],
			cultures: [],
		},
	],
}))

describe('FolkSelectionDialog', () => {
	const mockOnClose = vi.fn()
	const mockOnSelectFolk = vi.fn()

	beforeEach(() => {
		mockOnClose.mockClear()
		mockOnSelectFolk.mockClear()
	})

	it('renders when open', () => {
		render(
			<FolkSelectionDialog
				open={true}
				onClose={mockOnClose}
				onSelectFolk={mockOnSelectFolk}
			/>,
		)

		// Check for the dialog by looking for unique elements that should be present
		expect(
			screen.getByPlaceholderText(
				'Search by name, category, or description...',
			),
		).toBeDefined()
		// The count line is the ledger's now (M13 S8), and the plural of "folk" is
		// "folk" — the picker passes `itemNounPlural` for exactly this.
		expect(screen.getByText(/2 folk/)).toBeDefined()
	})

	it('does not render when closed', () => {
		render(
			<FolkSelectionDialog
				open={false}
				onClose={mockOnClose}
				onSelectFolk={mockOnSelectFolk}
			/>,
		)

		expect(
			screen.queryByPlaceholderText(
				'Search by name, category, or description...',
			),
		).toBeNull()
	})

	it('displays folk data correctly', async () => {
		render(
			<FolkSelectionDialog
				open={true}
				onClose={mockOnClose}
				onSelectFolk={mockOnSelectFolk}
			/>,
		)

		await waitFor(() => {
			expect(screen.getByText('Dwarf')).toBeDefined()
			expect(screen.getByText('Elf')).toBeDefined()
			expect(screen.getAllByText('Old Folk')).toHaveLength(2)
		})
	})

	it('allows searching folk', async () => {
		render(
			<FolkSelectionDialog
				open={true}
				onClose={mockOnClose}
				onSelectFolk={mockOnSelectFolk}
			/>,
		)

		const searchInput = screen.getByPlaceholderText(/search/i)
		fireEvent.change(searchInput, { target: { value: 'dwarf' } })

		await waitFor(() => {
			expect(screen.getByText('Dwarf')).toBeDefined()
			expect(screen.queryByText('Elf')).toBeNull()
		})
	})

	it('calls onSelectFolk when folk is selected', async () => {
		render(
			<FolkSelectionDialog
				open={true}
				onClose={mockOnClose}
				onSelectFolk={mockOnSelectFolk}
			/>,
		)

		// The row IS the choice since M13 S8 — no radio in a first table cell. It is
		// an `option` carrying its own `aria-selected`, so this is also the assertion
		// that the picker still speaks single selection after being folded onto the
		// multi-select ledger.
		const dwarfRow = await screen.findByRole('option', { name: /Dwarf/ })
		fireEvent.click(dwarfRow)
		expect(dwarfRow).toHaveAttribute('aria-selected', 'true')

		// Click the Select Folk button
		const selectButton = screen.getByRole('button', { name: /select folk/i })
		fireEvent.click(selectButton)

		await waitFor(() => {
			expect(mockOnSelectFolk).toHaveBeenCalledWith(
				expect.objectContaining({
					name: 'Dwarf',
					category: 'Old Folk',
				}),
			)
		})
	})

	it('calls onClose when dialog is cancelled', () => {
		render(
			<FolkSelectionDialog
				open={true}
				onClose={mockOnClose}
				onSelectFolk={mockOnSelectFolk}
			/>,
		)

		const closeButton = screen.getByRole('button', { name: /cancel/i })
		fireEvent.click(closeButton)

		expect(mockOnClose).toHaveBeenCalled()
	})
})
