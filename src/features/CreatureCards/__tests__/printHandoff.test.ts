import { describe, it, expect } from 'vitest'
import { creatureEntries, entryIdsForKeys } from '../creatureSources'

/**
 * The bestiary's encounter builder hands this tool an encounter as
 * `?print=<name>~<tier>,…`. These pin the resolution, which is the join
 * between two features that do not otherwise know about each other.
 */
const catalogue = creatureEntries()

describe('print hand-off', () => {
	it('resolves a key to the catalogue entry it names', () => {
		const [id] = entryIdsForKeys(catalogue.entries, 'Jackal~0')
		const entry = catalogue.entries.find((candidate) => candidate.id === id)
		expect(entry?.creature.name).toBe('Jackal')
		expect(entry?.creature.tier).toBe(0)
	})

	it('keeps the order the encounter listed', () => {
		const ids = entryIdsForKeys(catalogue.entries, 'Mummy~4,Jackal~0')
		const names = ids.map(
			(id) => catalogue.entries.find((entry) => entry.id === id)?.creature.name,
		)
		expect(names).toEqual(['Mummy', 'Jackal'])
	})

	it('separates two creatures that share a name', () => {
		// Name alone would collapse them. The tier is what tells them apart.
		const jackal = entryIdsForKeys(catalogue.entries, 'Jackal~0')
		const wrongTier = entryIdsForKeys(catalogue.entries, 'Jackal~4')
		expect(jackal).toHaveLength(1)
		expect(wrongTier).toEqual([])
	})

	it('prints what a stale link can still resolve', () => {
		// A GM clicking a month-old link should get the cards that still exist,
		// not an error in front of a table.
		expect(
			entryIdsForKeys(catalogue.entries, 'Sphinx~6,Jackal~0'),
		).toHaveLength(1)
	})

	it('asks for each creature once', () => {
		expect(
			entryIdsForKeys(catalogue.entries, 'Jackal~0,Jackal~0'),
		).toHaveLength(1)
	})

	it('ignores an empty parameter', () => {
		expect(entryIdsForKeys(catalogue.entries, '')).toEqual([])
	})
})
