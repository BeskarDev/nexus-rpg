import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import React from 'react'
import {
	renderCompanionEntry,
	renderCompanionInline,
} from '@site/src/utils/typescript/companion/companionInline'

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

	it('drops the entry name’s trailing period, and keeps a parenthetical inside it', () => {
		// None of the 811 `<EntryName>`s on the creature pages ends in a period; the
		// source writes the name as a sentence opener. The parenthetical STAYS — creature
		// pages do the same (`<EntryName>Blindsense (Close)</EntryName>`), and only an
		// attack's properties become badges, which the source marks with `<em>` outside
		// the bold.
		const container = html(
			'**Darkvision (medium/long).** This creature can see in the dark.',
		)
		expect(container.querySelector('.cs-entry-name')?.textContent).toBe(
			'Darkvision (medium/long)',
		)
		expect(container.querySelectorAll('.cs-entry-badge')).toHaveLength(0)
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
		const container = html(
			'**Slam** (agile, crush). On a strong hit, pushed close.',
		)
		const badges = container.querySelectorAll('.cs-entry-badge')
		// ONE BADGE PER PROPERTY, as `renderBadges` emits on a creature page — not one
		// badge holding the whole list (M13 S8, owner review).
		expect([...badges].map((badge) => badge.textContent)).toEqual([
			'agile',
			'crush',
		])
		// The brackets were printed around the badge before this — the owner's report.
		expect(container.textContent).not.toContain('(agile')
	})

	it('strips the markdown emphasis the builder wraps its properties in', () => {
		// `<em>agile, pierce</em>` survives `convertHtmlToMarkdown` as `*agile, pierce*`,
		// and the bracket branch matched before the emphasis branch could — so the badge
		// printed its own markup. Every attack the builder has ever produced hit this.
		const container = html('**Bite** (*agile, pierce*). 9/13/17 damage')
		expect(
			[...container.querySelectorAll('.cs-entry-badge')].map(
				(badge) => badge.textContent,
			),
		).toEqual(['agile', 'pierce'])
		expect(container.textContent).not.toContain('*')
	})

	/**
	 * These two assert on the text OUTSIDE the ladder.
	 *
	 * `DamageLadder` carries its own screen-reader label — ` damage (Weak 3, …)` —
	 * so the string "damage" is always in `textContent` and asserting against the
	 * whole container tests the ladder rather than this module. A creature page
	 * renders exactly the same label.
	 */
	const outsideLadder = (container: HTMLElement) => {
		const clone = container.cloneNode(true) as HTMLElement
		clone.querySelectorAll('[class*="ladder"]').forEach((el) => el.remove())
		return clone.textContent ?? ''
	}

	it('folds the damage type into the ladder and drops the word "damage"', () => {
		// What a creature page does: the ladder's W/S/C ticks already say these are
		// damage figures, so the word beside it is a second statement of the same fact.
		const container = html(
			'**Bite** 3/4/5 lightning damage (2 base + 1 weapon)',
		)
		// The type moved INSIDE the ladder, as `<DamageLadder>poison</DamageLadder>`.
		expect(
			container.querySelector('[class*="ladderKind"]')?.textContent?.trim(),
		).toBe('lightning')
		// …and neither it nor the word "damage" is left loose beside it. The builder's
		// own arithmetic aside is kept — that is it showing its working.
		expect(outsideLadder(container)).not.toContain('lightning')
		expect(outsideLadder(container)).not.toContain('damage')
		expect(outsideLadder(container)).toContain('(2 base + 1 weapon)')
	})

	it('drops a bare "damage" after the ladder when there is no type', () => {
		const container = html('**Slam** 3/4/5 damage (2 base + 1 weapon)')
		expect(outsideLadder(container)).not.toContain('damage')
		expect(outsideLadder(container)).toContain('(2 base + 1 weapon)')
	})

	it('drops the sentence period stranded after a badge group', () => {
		const container = html('**Bite** (*pierce*). 9/13/17 damage')
		// A creature page runs name, badge and ladder together with no punctuation; the
		// builder's source is a sentence, which left a " . " floating after the badge.
		expect(container.textContent).not.toMatch(/pierce\s*\./)
	})

	it('keeps a nested qualifier whole', () => {
		const container = html(
			'**Lightning Strike** (thrown (medium)). 3/4/5 lightning damage',
		)
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

	describe('renderCompanionEntry — numbered sub-options', () => {
		const entry = [
			'**Eye Rays.** Roll once per eye ray and apply the effects:',
			'**1. Dazing Ray.** Compare the result vs. Resist.',
			'**2. Fear Ray.** On a success, the target is briefly frightened.',
		].join('\n')

		it('renders the options as an ordered list, not one run-on paragraph', () => {
			const { container } = render(<div>{renderCompanionEntry(entry)}</div>)
			const items = container.querySelectorAll('ol.cs-entry-options > li')
			// The fault this fixes: the four outcomes ran together inside the parent
			// paragraph — `…apply the effects:1. Dazing Ray. Compare…`.
			expect(items).toHaveLength(2)
			expect(items[0].textContent).toContain('Dazing Ray.')
			// The list supplies the numeral (a CSS counter), so the source's own `1. `
			// is dropped — otherwise every option reads "1. 1. Dazing Ray."
			expect(items[0].textContent).not.toMatch(/^\s*1\./)
		})

		it('keeps the entry name above the options and does not repeat the register', () => {
			const { container } = render(<div>{renderCompanionEntry(entry)}</div>)
			// One entry NAME for the entry itself; an option's lead is emphasis, so four
			// options cannot read as four more attacks.
			expect(container.querySelectorAll('.cs-entry-name')).toHaveLength(1)
			// No trailing period on an entry name — the creature pages' convention.
			expect(container.querySelector('.cs-entry-name')?.textContent).toBe(
				'Eye Rays',
			)
			expect(
				container.querySelectorAll('ol.cs-entry-options strong'),
			).toHaveLength(2)
		})

		it('is unchanged for an entry with no options', () => {
			const { container } = render(
				<div>{renderCompanionEntry('**Bite** (*crush*). 3/4/5 damage')}</div>,
			)
			expect(container.querySelector('ol.cs-entry-options')).toBeNull()
			expect(container.querySelector('.cs-entry-name')?.textContent).toBe(
				'Bite',
			)
		})
	})

	it('leaves ordinary words alone', () => {
		expect(
			html('moves its full movement away').querySelectorAll('.chip'),
		).toHaveLength(0)
	})
})
