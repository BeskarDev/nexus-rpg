import { describe, expect, it } from 'vitest'
import { createReviewMockCharacter } from '@site/src/dev/mockData'
import { characterTreasure, inferCategory } from '../characterTreasure'

describe('Everith Fullsheet as a card fixture (M19 S4)', () => {
	const character = createReviewMockCharacter()
	const entries = characterTreasure(character)
	const candidates = entries.filter((entry) => entry.candidate)
	const byName = (name: string) =>
		entries.find((entry) => entry.item.name === name)!

	it('offers a card for everything with rules text and nothing without', () => {
		expect(candidates.length).toBeGreaterThanOrEqual(11)
		expect(byName('Spare Bronze Dagger').candidate).toBe(false)
		expect(byName('Bedroll').candidate).toBe(false)
	})

	it('reaches every category the inference can produce', () => {
		const reached = new Set(candidates.map((entry) => entry.item.category))
		;[
			'Weapon',
			'Spell Scroll',
			'Wand',
			'Staff',
			'Shield',
			'Ammo',
			'Consumable',
			'Utility',
		].forEach((category) => expect(reached).toContain(category))
	})

	it('never turns a damaged item into a card with charges', () => {
		// `Notched Bronze Khopesh` carries `uses: 3` — broken, not three charges.
		expect(byName('Notched Bronze Khopesh').item.uses).toBeUndefined()
	})

	it('covers the card shapes a reviewer needs to see', () => {
		// No quality, so the card drops its quality cell.
		expect(byName('Storm Lantern').item.quality).toBe(0)
		// Rules text from `special` rather than `description`.
		expect(byName('Barbed Arrows').item.description).toContain('bleeds')
		// Long body, for the continuation card; long name, for the wrap.
		const crown = byName('The Weeping Crown of Ninsun-Who-Waited')
		expect(crown.item.description.length).toBeGreaterThan(400)
		expect(crown.item.quality).toBe(8)
		// Properties: none, one, and enough to wrap the slab row.
		expect(byName('Storm Lantern').item.properties).toBeUndefined()
		expect(crown.item.properties?.split(',')).toHaveLength(3)
	})
})
