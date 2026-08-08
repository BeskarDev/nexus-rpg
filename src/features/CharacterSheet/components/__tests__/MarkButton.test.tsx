import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import { MarkButton } from '../MarkButton'

describe('MarkButton', () => {
	it('shows the glyph and announces the action in words', async () => {
		const onClick = vi.fn()
		render(<MarkButton glyph="+" label="Add Skill" onClick={onClick} />)

		// The visible sign and the accessible name deliberately diverge: "+"
		// announced bare says nothing about what is being added.
		const button = screen.getByRole('button', { name: 'Add Skill' })
		expect(button).toHaveTextContent('+')

		await userEvent.click(button)
		expect(onClick).toHaveBeenCalled()
	})

	it('is a real button, so it is keyboard reachable', async () => {
		const onClick = vi.fn()
		render(<MarkButton glyph="×" label="Remove Draconic" onClick={onClick} />)

		await userEvent.tab()
		expect(
			screen.getByRole('button', { name: 'Remove Draconic' }),
		).toHaveFocus()
		await userEvent.keyboard('{Enter}')
		expect(onClick).toHaveBeenCalled()
	})

	it('does not submit a surrounding form', () => {
		render(<MarkButton glyph="+" label="Add" onClick={vi.fn()} />)
		expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
	})
})
