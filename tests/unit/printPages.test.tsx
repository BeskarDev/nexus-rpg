import { describe, it, expect, beforeAll } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import {
	PrintPages,
	itemsPerPage,
	pageGrid,
	CARD_PAGE,
	CARD_SIZE,
	CARD_PAGE_MARGIN,
	SHEET_PAGE,
	SHEET_SECTION,
	SHEET_PAGE_MARGIN,
} from '@site/src/features/PrintingTools'

/**
 * The preview's page count comes from the geometry, not from a hand-written
 * number. Each print tool used to carry its own `9` — in the page count, the
 * sheet count and an `index % 9 === 8` break — with nothing tying any of them to
 * the card or page size they were counting.
 */

beforeAll(() => {
	// jsdom has no ResizeObserver; `PrintPages` uses one to fit the paper to the
	// preview column. The pagination under test does not depend on it.
	Object.assign(window, {
		ResizeObserver: class {
			observe() {}
			unobserve() {}
			disconnect() {}
		},
	})
})

describe('itemsPerPage', () => {
	it('fits nine 63×88mm cards on a 192×267mm page', () => {
		// 3 across (190/63) × 3 down (265/88) — the 9 that was hardcoded.
		expect(itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN)).toBe(9)
	})

	it('fits two 133×191mm sections on the landscape sheet page', () => {
		expect(itemsPerPage(SHEET_PAGE, SHEET_SECTION, SHEET_PAGE_MARGIN)).toBe(2)
	})

	it('counts whole items only — a part-item does not get a slot', () => {
		// 100/30 is 3.33 across and 3.33 down: 9, not 11.
		expect(
			itemsPerPage({ width: 100, height: 100 }, { width: 30, height: 30 }),
		).toBe(9)
	})

	it('charges the margin to the usable area', () => {
		const page = { width: 100, height: 50 }
		const item = { width: 50, height: 50 }
		expect(itemsPerPage(page, item)).toBe(2)
		// 1mm of margin all round leaves 98 × 48 — one row no longer fits at all,
		// and the floor clamps to a single slot rather than zero.
		expect(itemsPerPage(page, item, 1)).toBe(1)
	})
})

describe('pageGrid', () => {
	it('states the column count, which the bed lays out by', () => {
		expect(pageGrid(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN)).toEqual({
			perRow: 3,
			perColumn: 3,
			perPage: 9,
		})
		expect(pageGrid(SHEET_PAGE, SHEET_SECTION, SHEET_PAGE_MARGIN)).toEqual({
			perRow: 2,
			perColumn: 1,
			perPage: 2,
		})
	})
})

describe('PrintPages', () => {
	const cards = (n: number) =>
		Array.from({ length: n }, (_, i) => <div key={i}>card {i}</div>)

	const pages = (container: HTMLElement) =>
		container.querySelectorAll('.pt-page')

	it('breaks a run of cards into pages of nine', () => {
		const { container } = render(
			<PrintPages page={CARD_PAGE} item={CARD_SIZE} margin={CARD_PAGE_MARGIN}>
				{cards(20)}
			</PrintPages>,
		)
		// 20 cards → 9 + 9 + 2.
		expect(pages(container)).toHaveLength(3)
		expect(container.textContent).toContain('Page 3 of 3')
	})

	it('puts every card on exactly one page, losing none', () => {
		const { container } = render(
			<PrintPages page={CARD_PAGE} item={CARD_SIZE} margin={CARD_PAGE_MARGIN}>
				{cards(14)}
			</PrintPages>,
		)
		const bedded = container.querySelectorAll('.pt-page__bed > *')
		expect(bedded).toHaveLength(14)
	})

	it('draws the paper at its true millimetre size', () => {
		const { container } = render(
			<PrintPages page={CARD_PAGE} item={CARD_SIZE}>
				{cards(1)}
			</PrintPages>,
		)
		const paper = container.querySelector('.pt-page__paper') as HTMLElement
		expect(paper.style.width).toBe('192mm')
		expect(paper.style.height).toBe('267mm')
	})

	it('lays the bed out as an explicit grid, never leaving it to flow', () => {
		// Two 133mm sections fit 266mm of printable width EXACTLY, so flow could
		// be tipped into wrapping by a keyline or a sub-pixel rounding of `133mm`
		// — which is what put one section per page and clipped the other.
		const { container } = render(
			<PrintPages
				page={SHEET_PAGE}
				item={SHEET_SECTION}
				margin={SHEET_PAGE_MARGIN}
			>
				{cards(2)}
			</PrintPages>,
		)
		const bed = container.querySelector('.pt-page__bed') as HTMLElement
		expect(bed.style.gridTemplateColumns).toBe('repeat(2, 1fr)')
	})

	it('gives a card page three columns', () => {
		const { container } = render(
			<PrintPages page={CARD_PAGE} item={CARD_SIZE} margin={CARD_PAGE_MARGIN}>
				{cards(9)}
			</PrintPages>,
		)
		const bed = container.querySelector('.pt-page__bed') as HTMLElement
		expect(bed.style.gridTemplateColumns).toBe('repeat(3, 1fr)')
	})

	it('shows the empty state instead of a blank page', () => {
		const { container } = render(
			<PrintPages
				page={CARD_PAGE}
				item={CARD_SIZE}
				empty={<p className="pt-empty">Nothing selected.</p>}
			>
				{[]}
			</PrintPages>,
		)
		expect(pages(container)).toHaveLength(0)
		expect(container.textContent).toContain('Nothing selected.')
	})

	it('puts the four character sheets on two pages', () => {
		const { container } = render(
			<PrintPages
				page={SHEET_PAGE}
				item={SHEET_SECTION}
				margin={SHEET_PAGE_MARGIN}
			>
				{cards(4)}
			</PrintPages>,
		)
		expect(pages(container)).toHaveLength(2)
	})
})
