import { render, screen } from '@testing-library/react'
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
		expect(container.querySelectorAll('svg')).toHaveLength(1) // the chevron

		rerender(
			<UnifiedListItem
				summaryContent={<span>Bronze Spear</span>}
				detailsContent={<span>details</span>}
				sigil="strength"
			/>,
		)
		expect(container.querySelectorAll('svg')).toHaveLength(2)
	})
})

describe('UnifiedListItem — non-expanding variant', () => {
	it('renders no disclosure control when there is nothing to disclose', () => {
		render(<UnifiedListItem summaryContent={<span>Athletics</span>} />)

		expect(screen.getByText('Athletics')).toBeVisible()
		// No accordion summary, so no button and no aria-expanded — a row that
		// opens onto nothing is what this variant exists to avoid (F4).
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
		expect(
			document.querySelector('[aria-expanded]'),
		).not.toBeInTheDocument()
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
