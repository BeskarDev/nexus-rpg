import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import React from 'react'
import { ListSection, ListSectionHeader } from '../ListSection'

describe('ListSectionHeader', () => {
	it('renders the label, the count and the rule', () => {
		const { container } = render(<ListSectionHeader label="Worn" count={4} />)

		expect(screen.getByText('Worn')).toBeVisible()
		expect(screen.getByText('4')).toBeVisible()
		// The rule is decorative: present in the DOM, hidden from the a11y tree.
		expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)
	})

	it('omits the count when the group does not supply one', () => {
		render(<ListSectionHeader label="Worn" />)
		expect(screen.getByText('Worn')).toBeVisible()
		expect(screen.queryByText('0')).not.toBeInTheDocument()
	})

	it('renders trailing actions', () => {
		render(
			<ListSectionHeader
				label="Worn"
				actions={<button type="button">add</button>}
			/>,
		)
		expect(screen.getByRole('button', { name: 'add' })).toBeVisible()
	})
})

describe('ListSection', () => {
	it('shows its rows and no disclosure control by default', () => {
		render(
			<ListSection label="Worn">
				<span>Bronze Spear</span>
			</ListSection>,
		)
		expect(screen.getByText('Bronze Spear')).toBeVisible()
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
	})

	it('collapses and re-expands when collapsible', async () => {
		render(
			<ListSection label="Worn" collapsible>
				<span>Bronze Spear</span>
			</ListSection>,
		)

		const toggle = screen.getByRole('button', { name: 'Collapse Worn' })
		expect(toggle).toHaveAttribute('aria-expanded', 'true')

		await userEvent.click(toggle)
		expect(
			screen.getByRole('button', { name: 'Expand Worn' }),
		).toHaveAttribute('aria-expanded', 'false')
		// `unmountOnExit` drops the rows once the collapse transition finishes.
		await waitForElementToBeRemoved(() => screen.queryByText('Bronze Spear'))
	})

	it('keeps its heading visible while collapsed', async () => {
		render(
			<ListSection label="Worn" count={1} collapsible>
				<span>Bronze Spear</span>
			</ListSection>,
		)
		await userEvent.click(screen.getByRole('button', { name: 'Collapse Worn' }))
		expect(screen.getByText('Worn')).toBeVisible()
		expect(screen.getByText('1')).toBeVisible()
	})
})
