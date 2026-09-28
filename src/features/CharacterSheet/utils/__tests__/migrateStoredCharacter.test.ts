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

	// A document from before HP was derived (owner-reported): `health.total` was typed
	// by hand and already held the level bonus. The migration read level 1, so the
	// level bonus landed in the modifier as well and a level 4 character with a
	// correct 24 HP printed and played at 30.
	it('keeps a hand-typed legacy HP total instead of adding the level bonus twice', () => {
		const migrated = migrateStoredCharacter({
			statistics: {
				strength: { value: 6, wounded: false },
				agility: { value: 8, wounded: false },
				spirit: { value: 10, wounded: false },
				mind: { value: 4, wounded: false },
				health: { total: 24, current: 24, temp: 0 },
			},
			skills: {
				xp: { total: 30, spend: 30 },
				skills: [
					{ id: 's1', name: 'Nature', xp: 20 },
					{ id: 's2', name: 'Survival', xp: 10 },
				],
				abilities: [],
			},
		} as any)

		expect(migrated.statistics.health.maxHpModifier).toBe(0)
	})

	it('keeps the part of a legacy total above the derived HP as the modifier', () => {
		const migrated = migrateStoredCharacter({
			statistics: {
				strength: { value: 6, wounded: false },
				agility: { value: 8, wounded: false },
				spirit: { value: 10, wounded: false },
				mind: { value: 4, wounded: false },
				health: { total: 27, current: 27, temp: 0 },
			},
			skills: {
				skills: [{ id: 's1', name: 'Nature', xp: 30 }],
				abilities: [],
			},
		} as any)

		expect(migrated.statistics.health.maxHpModifier).toBe(3)
	})
})
