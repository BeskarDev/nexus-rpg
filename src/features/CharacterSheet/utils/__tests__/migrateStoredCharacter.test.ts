import { describe, expect, it } from 'vitest'
import { migrateStoredCharacter } from '../migrateDoc'

/**
 * A document saved before items carried `location` (owner-reported): the item
 * states only its `container`, and every surface that prints or lists it filters
 * on `location`. Unmigrated, such an item is worn nowhere and carried nowhere,
 * so it silently vanishes from the printed sheet.
 */
const legacyItem = {
	id: 'f79d523d-bfd0-4231-beba-086de066a632',
	uses: 0,
	load: 0,
	container: 'backpack',
	name: 'Flamepaste 3/5',
	properties: '',
	description: '',
	slot: '',
	amount: 1,
	durability: '',
	cost: 0,
}

describe('migrateStoredCharacter', () => {
	it('gives a container-only item the location its container implies', () => {
		const migrated = migrateStoredCharacter({
			items: { items: [legacyItem], weapons: [] },
		} as any)

		expect(migrated.items.items[0].location).toBe('carried')
	})

	it('maps the legacy quick and worn containers onto worn', () => {
		const migrated = migrateStoredCharacter({
			items: {
				items: [
					{ ...legacyItem, id: 'a', container: 'quick' },
					{ ...legacyItem, id: 'b', container: 'worn' },
				],
				weapons: [],
			},
		} as any)

		expect(migrated.items.items.map((i) => i.location)).toEqual([
			'worn',
			'worn',
		])
	})

	it('keeps a location the document already states', () => {
		const migrated = migrateStoredCharacter({
			items: {
				items: [{ ...legacyItem, container: 'backpack', location: 'storage' }],
				weapons: [],
			},
		} as any)

		expect(migrated.items.items[0].location).toBe('storage')
	})

	it('defaults a weapon with no location to worn, where the sheet prints it', () => {
		const migrated = migrateStoredCharacter({
			items: { items: [], weapons: [{ id: 'w', name: 'Spear' }] },
		} as any)

		expect(migrated.items.weapons[0].location).toBe('worn')
	})

	it('leaves personal alone, since its migration needs the app URL', () => {
		const personal = { name: 'Ninsun' }
		const migrated = migrateStoredCharacter({ personal } as any)

		expect(migrated.personal).toBe(personal)
	})
})
