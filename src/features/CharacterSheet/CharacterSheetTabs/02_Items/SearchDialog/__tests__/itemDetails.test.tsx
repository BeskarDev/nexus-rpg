import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { WeaponSearchDialog } from '../WeaponSearchDialog'
import { EquipmentSearchDialog } from '../EquipmentSearchDialog'
import type { CharacterDocument } from '@site/src/types/Character'

/**
 * The details panel is a BAND, not a plate (M13 S8b, owner review).
 *
 * `RecordPlate` is the sheet's shape for an entity's facts when there are eight
 * of them and half carry a control. Equipment and weapons have five short
 * read-only values, and five ruled courses at a 6.5rem label measure made a tall
 * sparse column out of "Load 1, Cost 25".
 */

const character = {
	items: { coins: 100, weapons: [], items: [] },
	skills: { abilities: [], skills: [] },
	spells: { spells: [] },
} as unknown as CharacterDocument

const openDialog = (kind: 'weapon' | 'equipment') =>
	kind === 'weapon'
		? render(
				<WeaponSearchDialog
					open
					onClose={vi.fn()}
					onImportWeapons={vi.fn()}
					character={character}
				/>,
			)
		: render(
				<EquipmentSearchDialog
					open
					onClose={vi.fn()}
					onImportEquipment={vi.fn()}
					character={character}
				/>,
			)

describe.each(['weapon', 'equipment'] as const)('%s details', (kind) => {
	it('presents its facts as one band rather than a column of courses', () => {
		openDialog(kind)

		// The band exists…
		expect(document.querySelector('.cs-meta-band--sub')).toBeTruthy()
		// …and the plate it replaced does not.
		expect(document.querySelector('.cs-record-plate')).toBeNull()
	})

	it('names every fact in the band', () => {
		openDialog(kind)

		const band = document.querySelector('.cs-meta-band--sub') as HTMLElement
		const labels = Array.from(
			band.querySelectorAll('.cs-meta-band__label'),
		).map((node) => node.textContent?.trim())

		expect(labels).toContain('Quality')
		expect(labels).toContain('Load')
		expect(labels).toContain('Cost')
	})

	/**
	 * The owner's screenshot: *Alchemist's Supplies* rendered the literal characters
	 * `<br/>` twice, in the details panel and again inside the clamped row cell.
	 * `{item.description}` puts the JSON string in the DOM and React escapes it, so
	 * the tag arrives as text. 20 of the 105 equipment descriptions carry `<br/>`.
	 */
	it('never prints a markup tag as text', () => {
		openDialog(kind)
		expect(document.body.textContent).not.toContain('<br')
		expect(document.body.textContent).not.toContain('</')
	})

	it('opens the row rather than leaving the panel unreachable', () => {
		openDialog(kind)
		// A disclosure per row: the choice is the checkbox, the row is the opener.
		expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0)
		expect(screen.queryByRole('listbox')).toBeNull()
	})
})

/**
 * Guards the assertion above from passing for the wrong reason.
 *
 * "No `<br` in the document" is trivially true if no `<br/>`-bearing entry is on
 * screen. 20 of the 105 equipment descriptions carry one, the list is unpaged and
 * unvirtualised, so one must be rendered — and its words must survive the parse.
 */
describe('the markup guard is not vacuous', () => {
	it('renders an entry whose source actually contains a <br/>', async () => {
		const equipment = (await import('@site/src/utils/data/json/equipment.json'))
			.default as { name: string; description: string }[]

		const withBreak = equipment.filter((entry) =>
			/<br\s*\/?>/i.test(entry.description ?? ''),
		)
		expect(withBreak.length).toBeGreaterThan(0)

		openDialog('equipment')

		// The entry is on screen…
		const sample = withBreak[0]
		expect(screen.getAllByText(sample.name).length).toBeGreaterThan(0)
		// …and the words either side of the break survived, rather than the tag.
		const firstWords = sample.description
			.replace(/<[^>]+>/g, ' ')
			.trim()
			.split(/\s+/)
			.slice(0, 4)
			.join(' ')
		expect(document.body.textContent).toContain(firstWords)
	})
})
