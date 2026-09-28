import { describe, expect, it } from 'vitest'
import { migrateItemLoad } from '../migrateItemLoad'
import { migrateStoredCharacter } from '../migrateDoc'

describe('migrateItemLoad', () => {
	it('renames weight to load', () => {
		expect(migrateItemLoad({ name: 'Rope', weight: 1 })).toEqual({
			name: 'Rope',
			load: 1,
		})
	})

	it('keeps load when both exist, and drops weight', () => {
		expect(migrateItemLoad({ name: 'Tent', load: 5, weight: 3 })).toEqual({
			name: 'Tent',
			load: 5,
		})
	})

	it('reads a string weight as a number, and junk as 0', () => {
		expect(migrateItemLoad({ weight: '2' })).toEqual({ load: 2 })
		expect(migrateItemLoad({ weight: '-' })).toEqual({ load: 0 })
	})

	it('leaves an item without weight untouched', () => {
		const item = { name: 'Torch', load: 1 }
		expect(migrateItemLoad(item)).toBe(item)
	})

	it('runs when a stored document is loaded, so the save drops weight', () => {
		const migrated = migrateStoredCharacter({
			items: {
				items: [{ id: 'i', name: 'Rope', weight: 1, container: 'backpack' }],
				weapons: [],
			},
		} as any)

		expect(migrated.items.items[0]).toMatchObject({ load: 1 })
		expect(migrated.items.items[0]).not.toHaveProperty('weight')
	})
})
