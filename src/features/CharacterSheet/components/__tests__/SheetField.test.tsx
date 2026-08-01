import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import { SheetField } from '../SheetField'

describe('SheetField', () => {
	it('renders label and value', () => {
		render(<SheetField label="Parry" value={8} />)
		expect(screen.getByText('Parry')).toBeInTheDocument()
		expect(screen.getByText('8')).toBeInTheDocument()
	})

	it('is not a trigger when it has no editor and no open handler', () => {
		render(<SheetField label="Parry" value={8} />)
		expect(
			screen.queryByRole('button', { name: /edit/i }),
		).not.toBeInTheDocument()
	})

	describe('editor ownership', () => {
		it('opens its own popover on activation, with no anchor state at the call site', async () => {
			render(
				<SheetField
					label="Parry"
					value={8}
					editor={<div>Parry Calculator</div>}
				/>,
			)
			expect(screen.queryByText('Parry Calculator')).not.toBeInTheDocument()

			await userEvent.click(screen.getByRole('button', { name: 'Edit Parry' }))
			expect(screen.getByText('Parry Calculator')).toBeInTheDocument()
		})

		/**
		 * M13 S1. MUI portals the popover to `document.body`, outside
		 * `.character-sheet-page`, so every `--cs-*` token an editor's contents
		 * reference resolved to nothing — `background-color: var(--cs-success)` with
		 * no value paints nothing, and the HP meter inside the HP editor rendered as
		 * an empty trough while the identical component on the card rendered green.
		 *
		 * Asserted on the class rather than on a resolved colour on purpose: jsdom
		 * does not evaluate `color-mix()`, which is what every one of those tokens
		 * is built from, so a colour assertion here would pass either way. The class
		 * is the mechanism, and it is what a future refactor would drop.
		 */
		it('carries the sheet token class into the portaled popover', async () => {
			render(<SheetField label="HP" value={8} editor={<div>HP editor</div>} />)
			await userEvent.click(screen.getByRole('button', { name: 'Edit HP' }))

			const paper = document.querySelector('.MuiMenu-paper')
			expect(paper).not.toBeNull()
			expect(paper).toHaveClass('cs-tokens')
		})

		it('opens on Enter as well as click', async () => {
			render(
				<SheetField
					label="Parry"
					value={8}
					editor={<div>Parry Calculator</div>}
				/>,
			)
			screen.getByRole('button', { name: 'Edit Parry' }).focus()
			await userEvent.keyboard('{Enter}')
			expect(screen.getByText('Parry Calculator')).toBeInTheDocument()
		})

		it('gives a function editor a close callback and fires onEditClose', async () => {
			const onEditClose = vi.fn()
			render(
				<SheetField
					label="HP"
					value="25/28"
					onEditClose={onEditClose}
					editor={(close) => <button onClick={close}>Done</button>}
				/>,
			)
			await userEvent.click(screen.getByRole('button', { name: 'Edit HP' }))
			await userEvent.click(screen.getByRole('button', { name: 'Done' }))

			expect(onEditClose).toHaveBeenCalledTimes(1)
			expect(
				screen.queryByRole('button', { name: 'Done' }),
			).not.toBeInTheDocument()
		})
	})

	describe('onEditOpen without an editor', () => {
		// The defence cards' first activation migrates the legacy flat value rather
		// than opening anything.
		it('still acts as a trigger and runs the handler, opening no popover', async () => {
			const onEditOpen = vi.fn()
			render(<SheetField label="Dodge" value={10} onEditOpen={onEditOpen} />)

			await userEvent.click(screen.getByRole('button', { name: 'Edit Dodge' }))
			expect(onEditOpen).toHaveBeenCalledTimes(1)
			expect(screen.queryByRole('menu')).not.toBeInTheDocument()
		})

		it('runs before the editor opens when both are given', async () => {
			const onEditOpen = vi.fn()
			render(
				<SheetField
					label="Dodge"
					value={10}
					onEditOpen={onEditOpen}
					editor={<div>Dodge Calculator</div>}
				/>,
			)
			await userEvent.click(screen.getByRole('button', { name: 'Edit Dodge' }))
			expect(onEditOpen).toHaveBeenCalledTimes(1)
			expect(screen.getByText('Dodge Calculator')).toBeInTheDocument()
		})
	})

	describe('accessible names', () => {
		// PR F found a trigger whose name was computed from the card's whole
		// contents, announcing "button, HP 25/28 minus plus". Deriving the name from
		// `label` makes that unreachable by forgetting a prop.
		it('derives the edit name from the label', () => {
			render(<SheetField label="Focus" value={3} editor={<div>x</div>} />)
			expect(
				screen.getByRole('button', { name: 'Edit Focus' }),
			).toBeInTheDocument()
		})

		it('lets an explicit editLabel win', () => {
			render(
				<SheetField
					label="STR"
					value={6}
					editLabel="Change Strength die"
					editor={<div>x</div>}
				/>,
			)
			expect(
				screen.getByRole('button', { name: 'Change Strength die' }),
			).toBeInTheDocument()
		})

		it('derives the gloss name from the label', () => {
			// `role="note"`, not `button` — RuleInfo opens nothing and changes
			// nothing, so it deliberately stays out of the tab order.
			render(<SheetField label="Parry" value={8} info="7 + Fighting" />)
			expect(
				screen.getByRole('note', { name: 'About Parry' }),
			).toBeInTheDocument()
		})

		it('adds no gloss mark when there is no info', () => {
			render(<SheetField label="Parry" value={8} />)
			expect(screen.queryByRole('note')).not.toBeInTheDocument()
		})
	})

	describe('sizing', () => {
		it('applies the named size', () => {
			render(<SheetField label="Resolve" value={2} size="sm" data-testid="f" />)
			expect(screen.getByTestId('f')).toHaveStyle({ minWidth: '5rem' })
		})

		it('lets an explicit width override the named size', () => {
			render(
				<SheetField
					label="Resolve"
					value={2}
					size="sm"
					minWidth="9rem"
					data-testid="f"
				/>,
			)
			expect(screen.getByTestId('f')).toHaveStyle({ minWidth: '9rem' })
		})
	})

	it('prefers children over value as the read state', () => {
		render(
			<SheetField label="Fatigue" value="ignored">
				<span>pips</span>
			</SheetField>,
		)
		expect(screen.getByText('pips')).toBeInTheDocument()
		expect(screen.queryByText('ignored')).not.toBeInTheDocument()
	})
})
