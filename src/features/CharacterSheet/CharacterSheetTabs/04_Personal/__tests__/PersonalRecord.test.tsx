import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import React from 'react'
import { PersonalRecord } from '../PersonalRecord'

/**
 * Replaces `NameCard.test.tsx` and `PersonalCards.test.tsx` (M13 S6).
 *
 * Those tested nine card components that each wrapped one field; the fields are rows in
 * one `RecordPlate` now, so the behaviour they asserted — a value renders, typing calls
 * `onChange`, blurring calls `onBlur` — is asserted once against the row renderer. The
 * picker case is new: it is the one row variant that carries a second control.
 */
const field = (overrides: Partial<Parameters<typeof PersonalRecord>[0]['fields'][0]> = {}) => ({
	label: 'Name',
	sigil: 'name' as const,
	value: 'Test Character',
	onChange: vi.fn(),
	onBlur: vi.fn(),
	...overrides,
})

describe('PersonalRecord', () => {
	it('renders each field as a labelled row carrying its value', () => {
		render(
			<PersonalRecord
				fields={[field(), field({ label: 'Age', sigil: 'age', value: '31' })]}
			/>,
		)
		expect(screen.getByDisplayValue('Test Character')).toBeInTheDocument()
		expect(screen.getByDisplayValue('31')).toBeInTheDocument()
		expect(screen.getByText('Name')).toBeInTheDocument()
		expect(screen.getByText('Age')).toBeInTheDocument()
	})

	it('reports typing and blurring to the field that owns the value', () => {
		const onChange = vi.fn()
		const onBlur = vi.fn()
		render(<PersonalRecord fields={[field({ onChange, onBlur })]} />)

		const input = screen.getByDisplayValue('Test Character')
		fireEvent.change(input, { target: { value: 'Kesh' } })
		expect(onChange).toHaveBeenCalledWith('Kesh')

		fireEvent.blur(input)
		expect(onBlur).toHaveBeenCalled()
	})

	it('gives a picker row a second control, and other rows none', () => {
		const onPick = vi.fn()
		render(
			<PersonalRecord
				fields={[
					field({ label: 'Folk', sigil: 'folk', value: 'Human', onPick }),
					field({ label: 'Age', sigil: 'age', value: '31' }),
				]}
			/>,
		)
		const buttons = screen.getAllByRole('button')
		expect(buttons).toHaveLength(1)
		fireEvent.click(buttons[0])
		expect(onPick).toHaveBeenCalled()
	})
})
