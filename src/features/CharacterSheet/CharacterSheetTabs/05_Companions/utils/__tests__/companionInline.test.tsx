import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import React from 'react'
import { renderCompanionInline } from '../companionInline'

/**
 * M13 S7 — a companion's stat block has to read like a creature's.
 *
 * The docs get chips, entry names and damage ladders from the MDX pipeline; a companion's block
 * is a string, so these transforms are applied at render time instead. The keyword table is
 * shared with `table-chips-plugin`, so these assertions are about the RENDERING.
 */
const html = (text: string) => {
	const { container } = render(<div>{renderCompanionInline(text)}</div>)
	return container
}

describe('renderCompanionInline', () => {
	it('makes the leading bold run the entry name, and later ones emphasis', () => {
		const container = html('**Bite** hits hard and **really** hurts')
		expect(container.querySelectorAll('.cs-entry-name')).toHaveLength(1)
		expect(container.querySelector('.cs-entry-name')?.textContent).toBe('Bite')
		expect(container.querySelector('strong')?.textContent).toBe('really')
	})

	it('turns an italic qualifier into a property badge', () => {
		const container = html('**Bolt** *Quick Action* moves away')
		expect(container.querySelector('.cs-entry-badge')?.textContent).toBe(
			'Quick Action',
		)
	})

	it('renders a damage triple as the shared ladder', () => {
		const container = html('**Hooves** 7/11/15 physical damage')
		// The ladder marks each level with its initial; the plain text would not.
		expect(container.textContent).toContain('7')
		expect(container.textContent).toContain('W')
		expect(container.querySelectorAll('.chip--damage')).toHaveLength(1)
	})

	it('chips a skill and pulls its rank inside the chip', () => {
		const container = html('Athletics (2), Perception (2)')
		const chips = container.querySelectorAll('.chip--skill')
		expect(chips).toHaveLength(2)
		expect(chips[0].textContent).toBe('Athletics2')
		expect(container.textContent).not.toContain('(2)')
	})

	it('badges the qualifier after an entry name and drops its brackets', () => {
		const container = html('**Slam** (agile, crush). On a strong hit, pushed close.')
		const badge = container.querySelector('.cs-entry-badge')
		expect(badge?.textContent).toBe('agile, crush')
		// The brackets were printed around the badge before this — the owner's report.
		expect(container.textContent).not.toContain('(agile')
	})

	it('keeps a nested qualifier whole', () => {
		const container = html('**Lightning Strike** (thrown (medium)). 3/4/5 lightning damage')
		expect(container.querySelector('.cs-entry-badge')?.textContent).toBe(
			'thrown (medium)',
		)
	})

	it('leaves a later parenthetical as prose', () => {
		// The builder writes `damage (2 base + 1 weapon)`; an arithmetic aside is not a
		// property, so only the group directly after the entry name is badged.
		const container = html('**Bite** 3/4/5 damage (2 base + 1 weapon)')
		expect(container.textContent).toContain('(2 base + 1 weapon)')
		expect(container.querySelectorAll('.cs-entry-badge')).toHaveLength(0)
	})

	it('leaves ordinary words alone', () => {
		expect(html('moves its full movement away').querySelectorAll('.chip')).toHaveLength(0)
	})
})
