import { describe, expect, it } from 'vitest'
import {
	deckDocumentTitle,
	isoDate,
	sheetDocumentTitle,
	slug,
} from '../printDocumentTitle'

const DAY = new Date(2026, 7, 7)

describe('slug', () => {
	it('lowercases and hyphenates', () => {
		expect(slug('Combat Arts')).toBe('combat-arts')
	})

	it('collapses runs of separators and trims them', () => {
		expect(slug('  Spells —  Arcane  ')).toBe('spells-arcane')
	})

	it('folds accents, so one character files under one name', () => {
		expect(slug('Ereshkígal')).toBe('ereshkigal')
	})

	it('drops characters a filesystem would argue about', () => {
		expect(slug('Ka/Ra: the "Bright" One?')).toBe('ka-ra-the-bright-one')
	})
})

describe('isoDate', () => {
	it('pads to a sortable date', () => {
		expect(isoDate(new Date(2026, 0, 9))).toBe('2026-01-09')
	})
})

describe('deckDocumentTitle', () => {
	it('names the deck and what came out of the printer', () => {
		expect(deckDocumentTitle({ kind: 'spells', count: 26, date: DAY })).toBe(
			'nexus-spells-26-cards-2026-08-07',
		)
	})

	it('names the character when the deck is for one', () => {
		expect(
			deckDocumentTitle({
				kind: 'combat-arts',
				count: 8,
				subject: 'Ashfoot the Swift',
				date: DAY,
			}),
		).toBe('nexus-combat-arts-ashfoot-the-swift-8-cards-2026-08-07')
	})

	it('says card, not cards, for one', () => {
		expect(deckDocumentTitle({ kind: 'creatures', count: 1, date: DAY })).toBe(
			'nexus-creatures-1-card-2026-08-07',
		)
	})

	it('leaves the subject out rather than inventing one', () => {
		expect(
			deckDocumentTitle({ kind: 'spells', count: 3, subject: '', date: DAY }),
		).toBe('nexus-spells-3-cards-2026-08-07')
	})
})

describe('sheetDocumentTitle', () => {
	it('names the character', () => {
		expect(sheetDocumentTitle('Nabu-shum', DAY)).toBe(
			'nexus-character-sheet-nabu-shum-2026-08-07',
		)
	})

	it('has a name for the blank sheet', () => {
		// It read `undefined-character-sheet` before: printing a blank sheet for
		// the table is a real use, not a missing character.
		expect(sheetDocumentTitle(undefined, DAY)).toBe(
			'nexus-character-sheet-blank-2026-08-07',
		)
	})
})
