import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QuickRefEntry, QuickRefEntryItem } from '../QuickRefEntry'

/**
 * The split between summary and detail is the whole point of the rework (M13 S8c,
 * owner review 5): the previous card printed every pinned entry's rule text at
 * once, which is what made the board unusable at ten pins.
 *
 * A test cannot judge whether the board FEELS quick. It can hold the contract:
 * the rule text is out of the resting line, the line still carries the two facts
 * a player scans by, and the detail is rendered-and-hidden rather than unmounted.
 */
const entry: QuickRefEntryItem = {
	id: 'w1',
	name: 'Bronze Khopesh',
	description: 'A curved blade. On a strong hit, the target is knocked prone.',
	source: 'weapon',
	sourceCategory: 'Weapon',
	actionType: 'Action',
	damage: '4/7/10 physical',
}

const renderEntry = (
	overrides: Partial<React.ComponentProps<typeof QuickRefEntry>> = {},
) =>
	render(
		<QuickRefEntry
			item={entry}
			expanded={false}
			onToggle={vi.fn()}
			onRemove={vi.fn()}
			onActionTypeChange={vi.fn()}
			{...overrides}
		/>,
	)

describe('QuickRefEntry', () => {
	it('shows the name and the figure at rest, and not the rule', () => {
		const { container } = renderEntry()
		const summary = container.querySelector('.cs-playrow__summary')!
		expect(summary.textContent).toContain('Bronze Khopesh')
		expect(summary.textContent).toContain('4/7/10 physical')
		// The failure this catches is the one that was shipped: the rule text
		// creeping back into the resting line.
		expect(summary.textContent).not.toContain('curved blade')
	})

	it('keeps the collapsed detail rendered and hidden, not unmounted', () => {
		const { container } = renderEntry()
		const detail = container.querySelector('.cs-playrow__detail')!
		expect(detail).toBeTruthy()
		expect(detail).toHaveAttribute('hidden')
		expect(detail.textContent).toContain('curved blade')
	})

	it('declares the disclosure it controls', () => {
		const { container } = renderEntry({ expanded: true })
		const summary = screen.getByRole('button', { expanded: true })
		const detail = container.querySelector('.cs-playrow__detail')!
		expect(summary.getAttribute('aria-controls')).toBe(detail.id)
		expect(detail).not.toHaveAttribute('hidden')
	})

	it('toggles from the whole line, which is the only disclosure target', () => {
		const onToggle = vi.fn()
		const { container } = renderEntry({ onToggle })
		fireEvent.click(container.querySelector('.cs-playrow__summary')!)
		expect(onToggle).toHaveBeenCalledTimes(1)
	})

	it('joins properties rather than letting React concatenate them', () => {
		// `['agile','pierce']` interpolated into JSX renders as `agilepierce`.
		const { container } = renderEntry({
			item: {
				...entry,
				damage: undefined,
				properties: ['agile', 'pierce'],
			},
		})
		expect(container.querySelector('.cs-playrow__figure')?.textContent).toBe(
			'agile, pierce',
		)
	})

	it('leads with the first words of the rule when there is no figure', () => {
		// Every ability lands here: no damage, no properties, so the line was a name
		// and empty space (owner review 7).
		const { container } = renderEntry({
			item: {
				...entry,
				damage: undefined,
				source: 'ability',
				sourceCategory: 'Talent',
				description:
					'<strong>(Rank 1)</strong> While you have taken damage, gain a boon.',
			},
		})
		const lead = container.querySelector('.cs-playrow__figure--lead')!
		expect(lead.textContent).toBe('While you have taken damage, gain a boon.')
		// The rank label goes: the numeral to its left already says it.
		expect(lead.textContent).not.toContain('Rank 1')
		// Owner review 8: it sits in the figure's column, so it takes the figure's
		// face. Two type registers down one column read as two columns.
		expect(lead.classList.contains('cs-playrow__figure')).toBe(true)
	})

	it('does not lead where a figure already carries the cue', () => {
		// Two things competing for one glance is worse than either alone.
		const { container } = renderEntry()
		expect(container.querySelector('.cs-playrow__figure--lead')).toBeNull()
	})

	it('keeps unpinning out of the summary control but in the head', () => {
		// A button cannot nest a button, and unpinning is play-adjacent — so the
		// tools are siblings of the disclosure, revealed on hover and focus.
		const { container } = renderEntry()
		const summary = container.querySelector('.cs-playrow__summary')!
		expect(summary.querySelector('.cs-playrow__tools')).toBeNull()
		expect(
			container.querySelector('.cs-playrow__head .cs-playrow__tools'),
		).toBeTruthy()
	})

	it('files the action-type control in the detail, not the scanned line', () => {
		// Owner review 6: re-typing is re-filing, done once, and it had no business
		// in the line a player reads mid-turn.
		const { container } = renderEntry()
		expect(
			container.querySelector('.cs-playrow__head .cs-playrow__retype'),
		).toBeNull()
		expect(
			container.querySelector('.cs-playrow__detail .cs-playrow__retype'),
		).toBeTruthy()
	})

	it('shows the action type in words where there is room for them', () => {
		// A bare 12px glyph reads as a control; the value spelled out reads as the
		// fact it is.
		const { container } = renderEntry({ expanded: true })
		expect(
			container.querySelector('.cs-playrow__retype')?.textContent,
		).toContain('Action')
	})
})
