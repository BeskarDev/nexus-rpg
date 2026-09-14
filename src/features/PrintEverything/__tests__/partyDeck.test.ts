import { describe, expect, it } from 'vitest'
import type { CharacterDocument } from '@site/src/types/Character'
import {
	buildPartyDeck,
	deckByDeckPageCount,
	partyDocumentTitle,
	CARD_CATEGORIES,
	PRINT_CATEGORIES,
	type PrintCategory,
} from '../partyDeck'

/**
 * Two characters who overlap on purpose.
 *
 * Both know *Flickering Flame* and both have *Aimed Shot*, because the whole
 * question this page had to answer was what happens then: a card each, not a
 * shared card in the middle of the table (owner's ruling).
 */
const character = (
	docId: string,
	name: string,
	overrides: Partial<CharacterDocument> = {},
): CharacterDocument =>
	({
		docId,
		collectionId: 'party',
		personal: { name, folk: 'Human' },
		spells: { spells: [{ name: 'Flickering Flame' }] },
		skills: {
			abilities: [
				{ id: 'ab1', title: 'Aimed Shot', description: 'From the sheet.' },
				{
					id: 'ab2',
					title: 'Stone Hide',
					description: 'Gain AV.',
					tag: 'Talent',
					skill: 'Fortitude',
				},
			],
		},
		items: {
			weapons: [],
			items: [
				{
					id: 'i1',
					name: 'Sunstone Lantern',
					description: 'It burns without fuel.',
					container: 'worn',
				},
				// No description: catalogue gear, and the page's paper rule says no
				// card for it.
				{ id: 'i2', name: 'Bedroll', description: '', container: 'carried' },
			],
		},
		companions: [],
		...overrides,
	}) as unknown as CharacterDocument

const ALL = PRINT_CATEGORIES

describe('buildPartyDeck', () => {
	it('prints a card each when two characters share a spell', () => {
		const deck = buildPartyDeck(
			[character('a', 'Ana'), character('b', 'Bo')],
			['spells'],
		)
		expect(deck.cards).toHaveLength(2)
		expect(deck.cards.map((card) => card.characterName)).toEqual(['Ana', 'Bo'])
		// Distinct keys, or React renders one and drops the other.
		expect(new Set(deck.cards.map((card) => card.key)).size).toBe(2)
	})

	it('orders by character first, then by category', () => {
		const deck = buildPartyDeck(
			[character('a', 'Ana'), character('b', 'Bo')],
			ALL,
		)
		const names = deck.cards.map((card) => card.characterName)
		// Ana's whole hand comes before Bo's first card.
		expect(names.lastIndexOf('Ana')).toBeLessThan(names.indexOf('Bo'))

		const anaCategories = deck.cards
			.filter((card) => card.characterName === 'Ana')
			.map((card) => card.category)
		const order = CARD_CATEGORIES as PrintCategory[]
		const positions = anaCategories.map((category) => order.indexOf(category))
		expect(positions).toEqual([...positions].sort((x, y) => x - y))
	})

	it('sends a combat art to its own category and not to the abilities deck', () => {
		const deck = buildPartyDeck([character('a', 'Ana')], ALL)
		const arts = deck.cards.filter((card) => card.category === 'combatArts')
		const abilities = deck.cards.filter((card) => card.category === 'abilities')
		expect(arts.map((card) => card.key)).toHaveLength(1)
		expect(
			abilities.some(
				(card) => card.kind === 'ability' && card.entry.title === 'Aimed Shot',
			),
		).toBe(false)
	})

	it('prints only items with rules text', () => {
		const deck = buildPartyDeck([character('a', 'Ana')], ['magicItems'])
		expect(deck.cards).toHaveLength(1)
		expect(deck.cards[0].kind === 'magicItem' && deck.cards[0].item.name).toBe(
			'Sunstone Lantern',
		)
	})

	it('includes nothing for a category that is switched off', () => {
		const deck = buildPartyDeck([character('a', 'Ana')], ['spells'])
		expect(deck.cards.every((card) => card.category === 'spells')).toBe(true)
		expect(deck.counts.magicItems).toBe(0)
		expect(deck.sheets).toEqual([])
	})

	it('holds the sheets separately from the cards', () => {
		const deck = buildPartyDeck(
			[character('a', 'Ana'), character('b', 'Bo')],
			['characterSheets'],
		)
		expect(deck.cards).toEqual([])
		expect(deck.sheets.map((sheet) => sheet.personal.name)).toEqual([
			'Ana',
			'Bo',
		])
	})

	it('counts what each category contributed', () => {
		const deck = buildPartyDeck([character('a', 'Ana')], ALL)
		const counted = Object.values(deck.counts).reduce(
			(total, count) => total + count,
			0,
		)
		expect(counted).toBe(deck.cards.length)
	})

	it('keeps one character out of the party empty-handed without failing', () => {
		const bare = {
			docId: 'c',
			collectionId: 'party',
			personal: { name: 'Cy' },
		} as unknown as CharacterDocument
		const deck = buildPartyDeck([bare, character('a', 'Ana')], ALL)
		expect(deck.cards.some((card) => card.characterName === 'Cy')).toBe(false)
		expect(deck.cards.some((card) => card.characterName === 'Ana')).toBe(true)
	})

	it('reports a character whose companions cannot be read', () => {
		// A `companions` field that is not a list at all — a corrupted document,
		// or a hand-edited import. One player's broken data must not take the
		// party's deck with it.
		const broken = character('d', 'Dara', {
			companions: 'not a list',
		} as unknown as Partial<CharacterDocument>)
		const deck = buildPartyDeck([broken], ['companions'])
		expect(deck.companionErrors).toEqual(['Dara'])
		expect(deck.cards).toEqual([])
	})
})

describe('deckByDeckPageCount', () => {
	it('charges each deck its own part-filled last page', () => {
		// Four decks of one card each: four pages one tool at a time, one page
		// packed together.
		expect(
			deckByDeckPageCount(
				{
					spells: 1,
					combatArts: 1,
					abilities: 1,
					magicItems: 1,
					companions: 0,
				},
				9,
			),
		).toBe(4)
	})

	it('is zero for an empty deck', () => {
		expect(
			deckByDeckPageCount(
				{
					spells: 0,
					combatArts: 0,
					abilities: 0,
					magicItems: 0,
					companions: 0,
				},
				9,
			),
		).toBe(0)
	})
})

describe('partyDocumentTitle', () => {
	const date = new Date(2026, 8, 14)

	it('names one character', () => {
		expect(partyDocumentTitle(['Ereshkígal'], 12, 0, date)).toBe(
			'nexus-print-everything-ereshkigal-12-cards-2026-09-14',
		)
	})

	it('counts a party rather than naming whoever was first', () => {
		expect(partyDocumentTitle(['Ana', 'Bo', 'Cy'], 40, 6, date)).toBe(
			'nexus-print-everything-3-characters-40-cards-6-sheets-2026-09-14',
		)
	})

	it('leaves out what is not being printed', () => {
		expect(partyDocumentTitle([], 0, 2, date)).toBe(
			'nexus-print-everything-2-sheets-2026-09-14',
		)
	})
})
