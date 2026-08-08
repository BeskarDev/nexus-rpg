import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import { SheetChip } from '../SheetChip'

describe('SheetChip', () => {
	it('renders its label as real text', () => {
		render(<SheetChip>Athletics</SheetChip>)
		// Small caps come from `font-variant-caps`, which does NOT reach the
		// accessible name — the DOM text stays the label as written. A
		// `text-transform` here would have announced "athletics".
		expect(screen.getByText('Athletics')).toBeVisible()
	})

	it('absorbs a value behind the struck divider', () => {
		const { container } = render(<SheetChip value={3}>Athletics</SheetChip>)
		expect(container.querySelector('.cs-chip__value')).toHaveTextContent('3')
	})

	it('omits the value element when there is none', () => {
		const { container } = render(<SheetChip>Tradespeak</SheetChip>)
		expect(container.querySelector('.cs-chip__value')).toBeNull()
	})

	it('carries the identity hue as ink, never as a fill', () => {
		const { container } = render(
			<SheetChip tone="var(--cs-skill-arcana)">Arcana</SheetChip>,
		)
		const chip = container.querySelector('.cs-chip') as HTMLElement
		expect(chip.style.getPropertyValue('--cs-chip-ink')).toBe(
			'var(--cs-skill-arcana)',
		)
		// No background is ever set inline: the fill is the page, the hue is the
		// text and the keyline derived from it.
		expect(chip.style.backgroundColor).toBe('')
	})

	it('takes the banner silhouette by default', () => {
		const { container } = render(<SheetChip>Arcana</SheetChip>)
		expect(container.querySelector('.cs-chip--banner')).toBeInTheDocument()
	})

	it('renders no remove control unless the caller supplies one', () => {
		render(<SheetChip>Tradespeak</SheetChip>)
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
	})

	it('removes on demand, under a verbal accessible name', async () => {
		const onRemove = vi.fn()
		render(<SheetChip onRemove={onRemove}>Draconic</SheetChip>)
		// The visible glyph is a bare `×`; the accessible name has to say what is
		// being removed, so the two deliberately diverge.
		const remove = screen.getByRole('button', { name: 'Remove Draconic' })
		expect(remove).toHaveTextContent('×')
		await userEvent.click(remove)
		expect(onRemove).toHaveBeenCalled()
	})
})
