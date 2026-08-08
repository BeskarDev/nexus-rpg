import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import { FieldText, SheetField } from '../SheetField'

const inField = (ui: React.ReactNode, label = 'Motivation') =>
	render(<SheetField label={label}>{ui}</SheetField>)

describe('FieldText', () => {
	it('takes its accessible name from the enclosing field label', () => {
		// These inputs had NO accessible name before S11 — CardHeader is a visual
		// label, not an associated one, so each announced as a bare text box.
		inField(<FieldText value="" onChange={vi.fn()} />)
		expect(
			screen.getByRole('textbox', { name: 'Motivation' }),
		).toBeInTheDocument()
	})

	it('derives the placeholder from the label', () => {
		inField(<FieldText value="" onChange={vi.fn()} />)
		expect(screen.getByPlaceholderText('your motivation')).toBeInTheDocument()
	})

	it('lets an explicit placeholder win', () => {
		inField(<FieldText value="" onChange={vi.fn()} placeholder="anything" />)
		expect(screen.getByPlaceholderText('anything')).toBeInTheDocument()
	})

	it('reports each keystroke but commits on blur', async () => {
		const onChange = vi.fn()
		const onBlur = vi.fn()
		inField(<FieldText value="" onChange={onChange} onBlur={onBlur} />)

		const input = screen.getByRole('textbox', { name: 'Motivation' })
		await userEvent.type(input, 'abc')
		expect(onChange).toHaveBeenCalledTimes(3)
		expect(onBlur).not.toHaveBeenCalled()

		await userEvent.tab()
		expect(onBlur).toHaveBeenCalledTimes(1)
	})

	it('renders a trailing action alongside the field', async () => {
		const onPick = vi.fn()
		inField(
			<FieldText
				value="Akashic"
				onChange={vi.fn()}
				action={<button onClick={onPick}>Select folk from list</button>}
			/>,
			'Folk',
		)
		await userEvent.click(
			screen.getByRole('button', { name: 'Select folk from list' }),
		)
		expect(onPick).toHaveBeenCalledTimes(1)
		expect(screen.getByRole('textbox', { name: 'Folk' })).toHaveValue('Akashic')
	})

	it('renders a textarea when multiline', () => {
		inField(<FieldText value="" onChange={vi.fn()} multiline />, 'Description')
		expect(screen.getByRole('textbox', { name: 'Description' }).tagName).toBe(
			'TEXTAREA',
		)
	})
})
