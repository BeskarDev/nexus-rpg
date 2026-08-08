import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ActionMark, ActionGlyph } from '../components/ActionMark'
import { ACTION_TYPES, ActionType } from '@site/src/types/ActionType'

/**
 * The six action marks must be told apart at a glance (M13 S8c, owner review 3).
 *
 * The first cut was a full wedge, a half wedge and a wedge striking a bar — three
 * variations on ONE silhouette, which is precisely how not to build a set that has
 * to be read instantly. The owner compared them against the Material icons Quick
 * Ref still used and was right that those read faster.
 *
 * A test cannot judge whether a glyph is understandable. It can hold the floor:
 * six types, six DIFFERENT drawings, each with an accessible name.
 */

const geometryOf = (type: ActionType) => {
	const { container } = render(<ActionGlyph actionType={type} />)
	const svg = container.querySelector('svg')!
	return Array.from(svg.children)
		.map((node) => node.getAttribute('d') ?? node.outerHTML)
		.join('|')
}

describe('ActionMark', () => {
	it('draws a distinct shape for every action type', () => {
		const shapes = ACTION_TYPES.map(geometryOf)
		// The failure this catches: two types quietly sharing a path, which is
		// exactly what Material does with `Bolt` and `FlashOn`.
		expect(new Set(shapes).size).toBe(ACTION_TYPES.length)
	})

	it('covers every action type, so none falls through to Other', () => {
		const other = geometryOf('Other')
		const fellThrough = ACTION_TYPES.filter(
			(type) => type !== 'Other' && geometryOf(type) === other,
		)
		expect(fellThrough).toEqual([])
	})

	it('names itself, because the column heading over it is blank', () => {
		// The glyph is the only carrier of meaning in that cell, which the theme
		// forbids unless the mark itself is named.
		for (const type of ACTION_TYPES) {
			const { getByRole, unmount } = render(<ActionMark actionType={type} />)
			expect(getByRole('img', { name: type })).toBeTruthy()
			unmount()
		}
	})

	it('still prints the words for a wrapped row', () => {
		// Below the ledger breakpoint there is no column header at all.
		const { container } = render(<ActionMark actionType="Quick Action" />)
		expect(container.querySelector('.cs-cell-label')?.textContent).toBe(
			'Quick Action',
		)
	})

	it('leaves the bare glyph out of the accessibility tree', () => {
		// In a menu row and a section header the words sit right beside it, so
		// naming the mark too would say everything twice.
		const { container } = render(<ActionGlyph actionType="Passive" />)
		expect(container.querySelector('svg')).toHaveAttribute(
			'aria-hidden',
			'true',
		)
	})
})
