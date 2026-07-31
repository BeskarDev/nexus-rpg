import { render, screen } from '@testing-library/react'
import { createPortal } from 'react-dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import { UnifiedListItem } from '../DynamicList/UnifiedListItem'

describe('UnifiedListItem — expanding variant', () => {
	it('starts collapsed and reveals the details on first activation', async () => {
		render(
			<UnifiedListItem
				summaryContent={<span>Bronze Spear</span>}
				detailsContent={<span>a heavy thrusting weapon</span>}
			/>,
		)

		const summary = screen.getByRole('button', { name: /Bronze Spear/ })
		expect(summary).toHaveAttribute('aria-expanded', 'false')

		await userEvent.click(summary)
		expect(summary).toHaveAttribute('aria-expanded', 'true')
		expect(screen.getByText('a heavy thrusting weapon')).toBeVisible()
	})

	it('collapses again on a second activation', async () => {
		render(
			<UnifiedListItem
				summaryContent={<span>Bronze Spear</span>}
				detailsContent={<span>details</span>}
				defaultExpanded
			/>,
		)
		const summary = screen.getByRole('button', { name: /Bronze Spear/ })
		expect(summary).toHaveAttribute('aria-expanded', 'true')

		await userEvent.click(summary)
		expect(summary).toHaveAttribute('aria-expanded', 'false')
	})

	it('is reachable and operable from the keyboard', async () => {
		render(
			<UnifiedListItem
				summaryContent={<span>Bronze Spear</span>}
				detailsContent={<span>details</span>}
			/>,
		)
		const summary = screen.getByRole('button', { name: /Bronze Spear/ })

		await userEvent.tab()
		expect(summary).toHaveFocus()

		await userEvent.keyboard('{Enter}')
		expect(summary).toHaveAttribute('aria-expanded', 'true')
	})

	it('honours a controlled expanded state and reports changes', async () => {
		const onExpandChange = vi.fn()
		render(
			<UnifiedListItem
				summaryContent={<span>Bronze Spear</span>}
				detailsContent={<span>details</span>}
				expanded={false}
				onExpandChange={onExpandChange}
			/>,
		)
		const summary = screen.getByRole('button', { name: /Bronze Spear/ })

		await userEvent.click(summary)
		expect(onExpandChange).toHaveBeenCalledWith(true)
		// Still collapsed: the parent owns the state, the row does not self-expand.
		expect(summary).toHaveAttribute('aria-expanded', 'false')
	})

	it('renders the gutter mark only when one is given', () => {
		const { container, rerender } = render(
			<UnifiedListItem
				summaryContent={<span>Bronze Spear</span>}
				detailsContent={<span>details</span>}
			/>,
		)
		// The disclosure mark is NOT an `svg` since M13 S6 — it is the site's carved
		// caret token, painted as a CSS mask, so it is asserted by its own class and the
		// sigil count is the count of drawn marks alone.
		expect(container.querySelectorAll('.cs-chevron')).toHaveLength(1)
		expect(container.querySelectorAll('svg')).toHaveLength(0)

		rerender(
			<UnifiedListItem
				summaryContent={<span>Bronze Spear</span>}
				detailsContent={<span>details</span>}
				sigil="strength"
			/>,
		)
		expect(container.querySelectorAll('svg')).toHaveLength(1)
	})
})

describe('UnifiedListItem — non-expanding variant', () => {
	it('renders no disclosure control when there is nothing to disclose', () => {
		render(<UnifiedListItem summaryContent={<span>Athletics</span>} />)

		expect(screen.getByText('Athletics')).toBeVisible()
		// No accordion summary, so no button and no aria-expanded — a row that
		// opens onto nothing is what this variant exists to avoid (F4).
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
		expect(document.querySelector('[aria-expanded]')).not.toBeInTheDocument()
	})

	it('keeps the same ledger rule as the expanding variant', () => {
		const { container } = render(
			<UnifiedListItem summaryContent={<span>Athletics</span>} />,
		)
		expect(container.querySelector('.cs-ledger-row')).toBeInTheDocument()
	})

	it('leaves its own controls reachable', async () => {
		const onClick = vi.fn()
		render(
			<UnifiedListItem
				summaryContent={
					<button type="button" onClick={onClick}>
						delete
					</button>
				}
			/>,
		)
		await userEvent.click(screen.getByRole('button', { name: 'delete' }))
		expect(onClick).toHaveBeenCalled()
	})
})

/**
 * M13 S7 — a summary control must not toggle the row it sits in.
 *
 * The summary line is a button, so every click inside it bubbled to the disclosure: ticking
 * an item's wear pip collapsed the row, and opening a companion's HP editor toggled it on the
 * way. Call sites were patching this individually or not at all.
 */
describe('UnifiedListItem — controls inside the summary', () => {
	it('does not toggle the row when a summary control is clicked', async () => {
		const onControl = vi.fn()
		render(
			<UnifiedListItem
				summaryContent={
					<>
						<span>Bronze Spear</span>
						<button type="button" onClick={onControl}>
							pip
						</button>
					</>
				}
				detailsContent={<span>details</span>}
			/>,
		)
		const summary = screen.getByRole('button', { name: /Bronze Spear/ })
		expect(summary).toHaveAttribute('aria-expanded', 'false')

		await userEvent.click(screen.getByRole('button', { name: 'pip' }))

		expect(onControl).toHaveBeenCalledTimes(1)
		expect(summary).toHaveAttribute('aria-expanded', 'false')
	})

	it('still toggles when the row itself is clicked', async () => {
		render(
			<UnifiedListItem
				summaryContent={
					<>
						<span>Bronze Spear</span>
						<button type="button">pip</button>
					</>
				}
				detailsContent={<span>details</span>}
			/>,
		)
		const summary = screen.getByRole('button', { name: /Bronze Spear/ })

		await userEvent.click(screen.getByText('Bronze Spear'))

		expect(summary).toHaveAttribute('aria-expanded', 'true')
	})

	it('does not toggle when a control is operated from the keyboard', async () => {
		const onControl = vi.fn()
		render(
			<UnifiedListItem
				summaryContent={
					<>
						<span>Bronze Spear</span>
						<button type="button" onClick={onControl}>
							pip
						</button>
					</>
				}
				detailsContent={<span>details</span>}
			/>,
		)
		const summary = screen.getByRole('button', { name: /Bronze Spear/ })

		screen.getByRole('button', { name: 'pip' }).focus()
		await userEvent.keyboard('{Enter}')

		expect(onControl).toHaveBeenCalledTimes(1)
		expect(summary).toHaveAttribute('aria-expanded', 'false')
	})
})

/**
 * M13 S7 (round 2) — why there is no test for a portalled control here.
 *
 * React bubbles through the component tree, so a `Menu` rendered as a child of
 * `summaryContent` reaches the summary's handlers even though its DOM node is on
 * `document.body`. `UnifiedListItem` stops such events, and it is still not enough in
 * practice — MUI's own `Accordion` toggles from a handler the guard cannot get in front of.
 *
 * The rule is therefore structural rather than testable here: **a portalled surface does not
 * go inside a row summary.** `CompanionRow` renders its HP editor as a sibling of the row and
 * anchors it from the trigger, which is the arrangement to copy. If a future row nests one
 * anyway, the symptom is unmistakable — opening or dismissing the popover toggles the row.
 */
