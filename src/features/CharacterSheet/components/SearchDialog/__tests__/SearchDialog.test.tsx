import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React, { useState } from 'react'
import { SearchDialog, SearchDialogColumn } from '../SearchDialog'

/**
 * M13 S8 — the search dialog as a ledger.
 *
 * The behaviour asserted here is what the MUI `Table` used to provide and what the
 * rebuild had to keep: search narrows, headings sort, rows are chosen, and the
 * import button counts what was chosen. The rest of the slice is visual and is
 * verified in the running app, not here.
 */

type Row = { name: string; rank: string }

const DATA: Row[] = [
	{ name: 'Fire Bolt', rank: '1' },
	{ name: 'Ice Shard', rank: '3' },
	{ name: 'Stone Skin', rank: '2' },
]

/**
 * Ranks that repeat, so the tiebreaker has something to break, and a rank that is
 * two digits, so a string sort would put it in the wrong place.
 */
const RANKED: Row[] = [
	{ name: 'Zephyr', rank: '2' },
	{ name: 'Bulwark', rank: '10' },
	{ name: 'Aegis', rank: '2' },
	{ name: 'Cinder', rank: '1' },
]

const COLUMNS: SearchDialogColumn<Row>[] = [
	{ key: 'name', label: 'Name' },
	{ key: 'rank', label: 'Rank', width: '4rem' },
]

const Harness: React.FC<{
	onImport?: () => void
	selectionMode?: 'multiple' | 'single'
	itemNoun?: string
	itemNounPlural?: string
	data?: Row[]
	defaultSort?: { key: keyof Row; order?: 'asc' | 'desc' }
}> = ({
	onImport = vi.fn(),
	selectionMode = 'multiple',
	itemNoun = 'spell',
	itemNounPlural,
	data = DATA,
	defaultSort,
}) => {
	const [selected, setSelected] = useState<Set<string>>(new Set())
	return (
		<SearchDialog
			open
			onClose={vi.fn()}
			title="Search Spells"
			data={data}
			columns={COLUMNS}
			defaultSort={defaultSort}
			searchFields={['name']}
			selectedItems={selected}
			onSelectionChange={setSelected}
			onImport={onImport}
			getItemKey={(row) => row.name}
			selectionMode={selectionMode}
			itemNoun={itemNoun}
			itemNounPlural={itemNounPlural}
		/>
	)
}

const rowNames = () =>
	screen.getAllByRole('option').map((option) => option.textContent?.trim())

describe('SearchDialog', () => {
	it('lists every entry as a ledger option under a listbox', () => {
		render(<Harness />)
		const list = screen.getByRole('listbox', { name: 'Search Spells' })
		expect(list).toHaveAttribute('aria-multiselectable', 'true')
		expect(within(list).getAllByRole('option')).toHaveLength(3)
	})

	it('narrows the list from the search field and says how many are left', async () => {
		render(<Harness />)
		expect(screen.getByText(/3 spells/)).toBeInTheDocument()

		await userEvent.type(screen.getByLabelText('Search'), 'ice')

		expect(rowNames()).toEqual(['Ice Shard3'])
		expect(screen.getByText(/1 spell$/)).toBeInTheDocument()
	})

	it('sorts from a column heading, and reverses on a second press', async () => {
		render(<Harness />)
		expect(rowNames()).toEqual(['Fire Bolt1', 'Ice Shard3', 'Stone Skin2'])

		await userEvent.click(screen.getByRole('button', { name: 'Sort by Rank' }))
		expect(rowNames()).toEqual(['Fire Bolt1', 'Stone Skin2', 'Ice Shard3'])

		await userEvent.click(screen.getByRole('button', { name: 'Sort by Rank' }))
		expect(rowNames()).toEqual(['Ice Shard3', 'Stone Skin2', 'Fire Bolt1'])
	})

	it('chooses rows, counts them, and imports only what was chosen', async () => {
		const onImport = vi.fn()
		render(<Harness onImport={onImport} />)

		const importButton = screen.getByRole('button', {
			name: /^Import 0 spells$/,
		})
		expect(importButton).toBeDisabled()

		await userEvent.click(screen.getByRole('option', { name: /Fire Bolt/ }))

		expect(screen.getByRole('option', { name: /Fire Bolt/ })).toHaveAttribute(
			'aria-selected',
			'true',
		)
		expect(screen.getByText(/1 chosen/)).toBeInTheDocument()

		await userEvent.click(
			screen.getByRole('button', { name: /^Import 1 spell$/ }),
		)
		expect(onImport).toHaveBeenCalledTimes(1)
	})

	it('chooses and clears every visible row from one control', async () => {
		render(<Harness />)

		await userEvent.click(screen.getByRole('button', { name: 'Choose all' }))
		expect(
			screen
				.getAllByRole('option')
				.every((o) => o.getAttribute('aria-selected') === 'true'),
		).toBe(true)

		await userEvent.click(
			screen.getByRole('button', { name: 'Clear selection' }),
		)
		expect(
			screen
				.getAllByRole('option')
				.every((o) => o.getAttribute('aria-selected') === 'false'),
		).toBe(true)
	})

	it('names the constraint when nothing matches, and offers the way out', async () => {
		render(<Harness />)
		await userEvent.type(screen.getByLabelText('Search'), 'zzz')

		// The empty state says WHICH constraint emptied the list — a bare "no results"
		// leaves the reader to guess between the search and the filters.
		expect(screen.getByText(/No spell matches “zzz”/)).toBeInTheDocument()

		await userEvent.click(
			screen.getByRole('button', { name: 'Clear the search' }),
		)
		expect(screen.getAllByRole('option')).toHaveLength(3)
	})

	it('replaces rather than accumulates in single-choice mode', async () => {
		render(<Harness selectionMode="single" />)

		// No multi-select affordance: neither the ARIA flag nor the choose-all
		// control, both of which would contradict the mode.
		const list = screen.getByRole('listbox', { name: 'Search Spells' })
		expect(list).not.toHaveAttribute('aria-multiselectable')
		expect(
			screen.queryByRole('button', { name: 'Choose all' }),
		).not.toBeInTheDocument()

		await userEvent.click(screen.getByRole('option', { name: /Fire Bolt/ }))
		await userEvent.click(screen.getByRole('option', { name: /Ice Shard/ }))

		expect(screen.getByRole('option', { name: /Fire Bolt/ })).toHaveAttribute(
			'aria-selected',
			'false',
		)
		expect(screen.getByRole('option', { name: /Ice Shard/ })).toHaveAttribute(
			'aria-selected',
			'true',
		)

		// Pressing the chosen row again clears it — the same undo the multiple mode
		// gives, so a reader needs to know which mode they are in for neither.
		await userEvent.click(screen.getByRole('option', { name: /Ice Shard/ }))
		expect(screen.getByRole('option', { name: /Ice Shard/ })).toHaveAttribute(
			'aria-selected',
			'false',
		)
	})

	it('does not count on a single-choice confirm button', async () => {
		render(<Harness selectionMode="single" />)
		await userEvent.click(screen.getByRole('option', { name: /Fire Bolt/ }))
		// "Import 1 spell" restates what the mode guarantees.
		expect(screen.getByRole('button', { name: /^Import$/ })).toBeEnabled()
	})

	it('names one thing correctly when its plural is irregular', () => {
		const { rerender } = render(<Harness />)
		expect(screen.getByText(/3 spells/)).toBeInTheDocument()

		rerender(<Harness itemNounPlural="folk" itemNoun="folk" />)
		expect(screen.getByText(/3 folk/)).toBeInTheDocument()
	})

	/**
	 * M13 S8 (owner report) — the search dialogs' ordering.
	 *
	 * Reported as "filtering to rank 5 still shows a rank 4 spell at the top" and
	 * "the default view is not sorted or grouped at all". The first was not a filter
	 * fault at all: the filter returned 16 rows and the DOM held 17, because
	 * `arcane-spells.json` has two spells named *Astral Body* and the dialog keyed
	 * rows by name. These are the three behaviours that came out of it.
	 */
	describe('ordering', () => {
		it('opens in the given default order, name-ascending within ties', () => {
			render(<Harness data={RANKED} defaultSort={{ key: 'rank' }} />)
			expect(rowNames()).toEqual(['Cinder1', 'Aegis2', 'Zephyr2', 'Bulwark10'])
		})

		it('compares numerically, not as text', () => {
			render(<Harness data={RANKED} defaultSort={{ key: 'rank' }} />)
			// A string sort puts '10' between '1' and '2'.
			expect(rowNames()?.at(-1)).toBe('Bulwark10')
		})

		it('reads thousands separators as part of the number', async () => {
			// The game writes money as `2,500`, and `Number('2,500')` is NaN — which
			// dropped cost to a string compare, where '2,500' sorts before '5'.
			render(
				<Harness
					data={[
						{ name: 'Backpack', rank: '2,500' },
						{ name: 'Pouch', rank: '5' },
						{ name: 'Torch', rank: '750' },
					]}
					defaultSort={{ key: 'rank' }}
				/>,
			)
			expect(rowNames()).toEqual(['Pouch5', 'Torch750', 'Backpack2,500'])
		})

		it('keeps a non-numeric cell out of the figures', () => {
			// `-` means "none" on a load column. It has no digits, so it stays text
			// rather than being read as the number zero.
			render(
				<Harness
					data={[
						{ name: 'Rope', rank: '3' },
						{ name: 'Coin', rank: '-' },
						{ name: 'Anvil', rank: '25' },
					]}
					defaultSort={{ key: 'rank' }}
				/>,
			)
			expect(rowNames()?.[0]).toBe('Coin-')
		})

		it('reverses the primary column without reversing the tiebreak', async () => {
			render(<Harness data={RANKED} defaultSort={{ key: 'rank' }} />)

			await userEvent.click(
				screen.getByRole('button', { name: 'Sort by Rank' }),
			)
			// Rank descending — but Aegis still precedes Zephyr inside rank 2, because
			// reversing a rank sort does not mean the reader wants names backwards.
			expect(rowNames()).toEqual(['Bulwark10', 'Aegis2', 'Zephyr2', 'Cinder1'])
		})

		it('keeps the caller data unmutated while sorting', async () => {
			const data = [...RANKED]
			render(<Harness data={data} />)
			await userEvent.click(
				screen.getByRole('button', { name: 'Sort by Rank' }),
			)
			expect(data).toEqual(RANKED)
		})

		it('shows exactly as many rows as the count line claims', async () => {
			// The reported symptom, as an assertion: 17 rows for 16 spells. The row
			// count and the count line read the same array, so they can only disagree
			// when React keeps a node it should have dropped — which is what a
			// duplicate `getItemKey` causes.
			render(<Harness />)
			await userEvent.type(screen.getByLabelText('Search'), 'S')
			const listed = screen.getAllByRole('option').length
			expect(
				screen.getByText(new RegExp(`^${listed} spell`)),
			).toBeInTheDocument()
		})

		it('reports a non-unique item key instead of rendering a phantom row', () => {
			const error = vi.spyOn(console, 'error').mockImplementation(() => {})
			render(
				<Harness
					data={[
						{ name: 'Astral Body', rank: '4' },
						{ name: 'Astral Body', rank: '4' },
					]}
				/>,
			)
			expect(error).toHaveBeenCalledWith(
				expect.stringContaining('getItemKey is not unique'),
			)
			error.mockRestore()
		})
	})

	it('drops the column header along with the rows', async () => {
		render(<Harness />)
		expect(
			screen.getByRole('button', { name: 'Sort by Name' }),
		).toBeInTheDocument()

		await userEvent.type(screen.getByLabelText('Search'), 'zzz')
		// Headings over an empty grid name columns that are not there.
		expect(
			screen.queryByRole('button', { name: 'Sort by Name' }),
		).not.toBeInTheDocument()
	})
})
