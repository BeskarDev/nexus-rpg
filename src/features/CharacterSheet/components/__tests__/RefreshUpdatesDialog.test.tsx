import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RefreshUpdatesDialog } from '../RefreshUpdatesDialog'
import type { RefreshUpdateEntry } from '../RefreshUpdatesDialog'

/**
 * The behaviours the second pass added (M13 S3): the choose-all control, the
 * named meta tracks, and the column header. The diff plate and the
 * expand-plus-choose row are S8's and are covered by the row primitive's own
 * tests — what is pinned here is that a caller's columns reach both the header
 * and every row, because that agreement is the whole point of the shared
 * template.
 */
const entry = (
	id: string,
	name: string,
	skill: string,
): RefreshUpdateEntry => ({
	id,
	name,
	meta: [skill, '2'],
	changes: [{ field: 'Description', before: 'old', after: 'new' }],
})

const COLUMNS = [
	{ label: 'Skill', width: 'minmax(0, 1fr)' },
	{ label: 'Rank', width: '3.5rem' },
]

const renderDialog = (entries: RefreshUpdateEntry[]) => {
	const onConfirm = vi.fn()
	render(
		<RefreshUpdatesDialog
			open
			onClose={vi.fn()}
			title="Refresh talents from rulebook"
			itemNoun="talent"
			metaColumns={COLUMNS}
			entries={entries}
			onConfirm={onConfirm}
		/>,
	)
	return { onConfirm }
}

const ENTRIES = [
	entry('a', 'Parry', 'Fighting'),
	entry('b', 'Riposte', 'Fighting'),
	entry('c', 'Spell Shield', 'Arcana'),
]

describe('RefreshUpdatesDialog', () => {
	it('names every track in the header, plus the caller’s meta columns', () => {
		renderDialog(ENTRIES)

		const head = document.querySelector(
			'.cs-search-ledger__head',
		) as HTMLElement
		expect(within(head).getByText('talent')).toBeTruthy()
		expect(within(head).getByText('Skill')).toBeTruthy()
		expect(within(head).getByText('Rank')).toBeTruthy()
		expect(within(head).getByText('Changes')).toBeTruthy()
	})

	it('hands the header and the rows ONE template, so the columns agree', () => {
		renderDialog(ENTRIES)

		const ledger = document.querySelector('.cs-search-ledger') as HTMLElement
		const rowCols = ledger.style.getPropertyValue('--cs-search-cols')
		const headCols = ledger.style.getPropertyValue('--cs-search-head-cols')

		// One track per caller column, between the name and the change count.
		expect(rowCols).toContain('minmax(0, 1fr)')
		expect(rowCols).toContain('3.5rem')
		// The header is the row's template plus the reserve for the chevron, which
		// rides outside the summary grid.
		expect(headCols.startsWith(rowCols)).toBe(true)
		expect(headCols.slice(rowCols.length).trim()).toBe('18px')
	})

	it('starts with every entry chosen and reports the count', () => {
		renderDialog(ENTRIES)

		expect(screen.getByText('3 talents · 3 chosen')).toBeTruthy()
		expect(
			screen.getByRole('button', { name: /Update 3 talents/ }),
		).toBeTruthy()
	})

	it('clears and restores the whole selection from one control', () => {
		renderDialog(ENTRIES)

		fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }))
		expect(screen.getByText('3 talents · 0 chosen')).toBeTruthy()
		// Nothing chosen means nothing to confirm. The verb stays put and goes
		// dead rather than vanishing, so the strip does not reflow under the hand
		// that just emptied it.
		expect(
			screen.getByRole('button', { name: 'Update 0 talents' }),
		).toHaveProperty('disabled', true)

		fireEvent.click(screen.getByRole('button', { name: 'Choose all' }))
		expect(screen.getByText('3 talents · 3 chosen')).toBeTruthy()
	})

	it('confirms only the entries still checked', () => {
		const { onConfirm } = renderDialog(ENTRIES)

		fireEvent.click(screen.getByRole('checkbox', { name: 'Update Riposte' }))
		fireEvent.click(screen.getByRole('button', { name: /Update 2 talents/ }))

		expect(onConfirm).toHaveBeenCalledTimes(1)
		expect(onConfirm.mock.calls[0][0].sort()).toEqual(['a', 'c'])
	})

	it('says what is not there rather than showing an empty ledger', () => {
		renderDialog([])

		expect(screen.getByText('Every talent matches the rulebook')).toBeTruthy()
		expect(document.querySelector('.cs-search-ledger')).toBeNull()
		// No ledger, so no verb over it.
		expect(screen.queryByRole('button', { name: /talents$/ })).toBeNull()
	})
})
