import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CharacterSheetCard } from '../CharacterSheetCard'
import { Menu } from '@mui/material'

describe('CharacterSheetCard', () => {
	it('renders children correctly', () => {
		render(
			<CharacterSheetCard>
				<div data-testid="test-child">Test Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('test-child')).toBeInTheDocument()
	})

	it('displays header when provided', () => {
		render(
			<CharacterSheetCard header={<div data-testid="test-header">Header</div>}>
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('test-header')).toBeInTheDocument()
	})

	it('displays footer when provided', () => {
		render(
			<CharacterSheetCard footer={<div data-testid="test-footer">Footer</div>}>
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('test-footer')).toBeInTheDocument()
	})

	// M9 S6: the config gear is gone — the card body is the one way into edit
	// state, at every weight. These three tests used to drive `card-config-button`.
	it('opens the editor when the card body is clicked', () => {
		const handleClick = vi.fn()
		render(
			<CharacterSheetCard onConfigClick={handleClick} data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		fireEvent.click(screen.getByTestId('card'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('is not a button when it has no editor', () => {
		render(
			<CharacterSheetCard data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('card')).not.toHaveAttribute('role', 'button')
	})

	// The guard that keeps a card's own controls working: HP's damage/healing
	// buttons and the pip checkboxes must not also open the calculator.
	it('does not open the editor when an inner control is clicked', () => {
		const handleClick = vi.fn()
		render(
			<CharacterSheetCard
				onConfigClick={handleClick}
				editLabel="Edit HP"
				data-testid="card"
			>
				<button type="button" data-testid="inner">
					minus
				</button>
			</CharacterSheetCard>,
		)
		fireEvent.click(screen.getByTestId('inner'))
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('names itself for assistive tech when it is the trigger', () => {
		render(
			<CharacterSheetCard onConfigClick={vi.fn()} editLabel="Edit Parry">
				<div>8</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByRole('button', { name: 'Edit Parry' })).toBeInTheDocument()
	})

	it('opens the editor from the keyboard', () => {
		const handleClick = vi.fn()
		render(
			<CharacterSheetCard onConfigClick={handleClick} data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		fireEvent.keyDown(screen.getByTestId('card'), { key: 'Enter' })
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	// M9 S6: `info` replaced a Tooltip that wrapped the WHOLE card. Hover is back
	// as a desktop compromise, but the target is the stylus mark alone — so the
	// gloss must not be reachable from the card body, only from the mark.
	it('shows info on hovering the mark, not the card', async () => {
		render(
			<CharacterSheetCard
				info="Parry is 7 + Fighting"
				infoLabel="About Parry"
				data-testid="card"
			>
				<div>Content</div>
			</CharacterSheetCard>,
		)

		fireEvent.mouseOver(screen.getByTestId('card'))
		expect(screen.queryByText('Parry is 7 + Fighting')).not.toBeInTheDocument()

		fireEvent.mouseOver(screen.getByLabelText('About Parry'))
		// MUI Tooltip has an enter delay, so this has to be awaited rather than
		// asserted synchronously.
		expect(await screen.findByText('Parry is 7 + Fighting')).toBeInTheDocument()
	})

	it('renders no info mark when info is omitted', () => {
		render(
			<CharacterSheetCard>
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.queryByLabelText('Rules info')).not.toBeInTheDocument()
	})

	it('applies custom sx props', () => {
		render(
			<CharacterSheetCard sx={{ backgroundColor: 'red' }} data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('card')).toBeInTheDocument()
	})

	it('applies minWidth prop', () => {
		render(
			<CharacterSheetCard minWidth="10rem" data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		const card = screen.getByTestId('card')
		expect(card).toHaveStyle({ minWidth: '10rem' })
	})

	it('applies maxWidth prop', () => {
		render(
			<CharacterSheetCard maxWidth="20rem" data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		const card = screen.getByTestId('card')
		expect(card).toHaveStyle({ maxWidth: '20rem' })
	})

	it('applies custom border color', () => {
		const testColor = '#ff0000'
		render(
			<CharacterSheetCard borderColor={testColor} data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		const card = screen.getByTestId('card')
		expect(card).toHaveStyle({ border: `1px solid ${testColor}` })
	})
})
