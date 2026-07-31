import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import React from 'react'
import { GlossMark } from '../GlossMark'
import { RuleInfo } from '../RuleInfo'

describe('GlossMark', () => {
	/**
	 * The query has to be a real carved void, not an overpaint. M13 S1 kept the
	 * mark outside `sigils:check`, which is what normally enforces this — so the
	 * two mask-safety rules that still matter for a solid mark are pinned here
	 * instead of being left to nothing.
	 */
	it('carves the query as an even-odd void in one currentColor mass', () => {
		const { container } = render(<GlossMark />)
		const paths = container.querySelectorAll('path')
		expect(paths).toHaveLength(1)
		expect(paths[0]).toHaveAttribute('fill-rule', 'evenodd')
		expect(container.querySelector('svg')).toHaveAttribute('fill', 'currentColor')
		// No stroke anywhere: a stroke is not mask-safe geometry, and it is also
		// what would make this read as an outline icon next to the solid sigils.
		expect(container.innerHTML).not.toMatch(/stroke/)
	})

	/**
	 * 13px is a measured floor, not a preference: the query's hook and stem merge
	 * into a grey blob at 10px on the sigil rasteriser, which is the size the
	 * `stylus` mark this replaced used to render at. A future tidy-up that
	 * "matches the old size" would silently undo the legibility fix.
	 */
	it('defaults to the size the void actually survives', () => {
		const { container } = render(<GlossMark />)
		const svg = container.querySelector('svg')!
		expect(svg).toHaveAttribute('width', '13')
		expect(svg).toHaveAttribute('height', '13')
	})

	it('is decorative, so it is hidden from assistive tech', () => {
		const { container } = render(<GlossMark />)
		expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
	})
})

describe('RuleInfo', () => {
	// The mark is hidden, so the note itself has to carry the accessible name —
	// otherwise swapping the glyph left the affordance unnamed.
	it('names the note even though its mark is hidden', () => {
		render(<RuleInfo label="About HP">Hit Points: your health</RuleInfo>)
		expect(screen.getByRole('note', { name: 'About HP' })).toBeInTheDocument()
	})

	it('falls back to a generic name when no label is given', () => {
		render(<RuleInfo>Some rule</RuleInfo>)
		expect(screen.getByRole('note', { name: 'Rules info' })).toBeInTheDocument()
	})
})
