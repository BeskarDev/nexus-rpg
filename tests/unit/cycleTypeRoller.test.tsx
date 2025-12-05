import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CycleTypeRoller from '../../src/components/CycleTypeRoller'

describe('CycleTypeRoller', () => {
	it('renders dungeon configuration section', () => {
		render(<CycleTypeRoller />)
		expect(screen.getByText('Dungeon Configuration')).toBeInTheDocument()
	})

	it('renders dungeon rank selector with default value', () => {
		render(<CycleTypeRoller />)
		expect(screen.getByLabelText('Dungeon Rank')).toBeInTheDocument()
	})

	it('renders dungeon scope selector', () => {
		render(<CycleTypeRoller />)
		expect(screen.getByLabelText('Dungeon Scope')).toBeInTheDocument()
	})

	it('shows rank advice card', () => {
		render(<CycleTypeRoller />)
		expect(screen.getByText('Rank 1 Advice')).toBeInTheDocument()
		expect(
			screen.getByText(/Low-tier dungeon: Use Tier 0-2 creatures/),
		).toBeInTheDocument()
	})

	it('renders cycle roller section with buttons', () => {
		render(<CycleTypeRoller />)
		expect(screen.getByText('Cycle Roller')).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: /Roll Cycle Type/i }),
		).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: /Roll Lock & Key/i }),
		).toBeInTheDocument()
	})

	it('displays a cycle type when roll button is clicked', async () => {
		// Mock Math.random to return a predictable value
		const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0) // Will roll 1

		render(<CycleTypeRoller />)

		const rollButton = screen.getByRole('button', { name: /Roll Cycle Type/i })
		fireEvent.click(rollButton)

		expect(screen.getByText(/Cycle Type:/)).toBeInTheDocument()
		expect(screen.getByText(/Two Alternative Paths/)).toBeInTheDocument()

		mockRandom.mockRestore()
	})

	it('displays a lock and key type when roll button is clicked', async () => {
		// Mock Math.random to return a predictable value
		const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.5) // Will roll 4

		render(<CycleTypeRoller />)

		const rollButton = screen.getByRole('button', { name: /Roll Lock & Key/i })
		fireEvent.click(rollButton)

		expect(screen.getByText(/Lock & Key:/)).toBeInTheDocument()
		expect(
			screen.getByText(/Powerful monster and method to defeat\/evade/),
		).toBeInTheDocument()

		mockRandom.mockRestore()
	})

	it('shows scope description when a scope is selected', async () => {
		render(<CycleTypeRoller />)

		const scopeSelect = screen.getByLabelText('Dungeon Scope')

		// Click to open the select dropdown
		fireEvent.mouseDown(scopeSelect)

		// Find and click the "Small" option in the dropdown menu
		const smallOption = await screen.findByText(
			'Small (2-4 hours / One-Shot)',
			{ selector: 'li' },
		)
		fireEvent.click(smallOption)

		// The scope description should now be visible
		expect(
			screen.getByText(/A compact dungeon for a single session/),
		).toBeInTheDocument()
		expect(screen.getByText(/Recommended:/)).toBeInTheDocument()
	})

	it('updates rank advice when rank is changed', async () => {
		render(<CycleTypeRoller />)

		const rankSelect = screen.getByLabelText('Dungeon Rank')

		// Click to open the select dropdown
		fireEvent.mouseDown(rankSelect)

		// Find and click "Rank 5" option
		const rank5Option = await screen.findByText('Rank 5', { selector: 'li' })
		fireEvent.click(rank5Option)

		// Check that the high-tier advice is shown
		expect(screen.getByText('Rank 5 Advice')).toBeInTheDocument()
		expect(
			screen.getByText(/High-tier dungeon: Use Tier 4-6 creatures/),
		).toBeInTheDocument()
	})

	it('can roll multiple cycle types consecutively', () => {
		render(<CycleTypeRoller />)

		const rollButton = screen.getByRole('button', { name: /Roll Cycle Type/i })

		// Roll multiple times
		fireEvent.click(rollButton)
		expect(screen.getByText(/Cycle Type:/)).toBeInTheDocument()

		fireEvent.click(rollButton)
		expect(screen.getByText(/Cycle Type:/)).toBeInTheDocument()

		fireEvent.click(rollButton)
		expect(screen.getByText(/Cycle Type:/)).toBeInTheDocument()
	})
})
