import { describe, expect, it } from 'vitest'
import type { Character, Item, Weapon } from '@site/src/types/Character'
import {
	characterTreasure,
	inferCategory,
	inlineEmphasis,
	isTreasureCandidate,
} from '../characterTreasure'

const weapon = (overrides: Partial<Weapon> = {}): Weapon =>
	({
		id: 'w1',
		name: 'Bronze Khopesh',
		properties: 'slash, versatile',
		description: '',
		cost: 40,
		load: 2,
		uses: 0,
		...overrides,
	}) as Weapon

const item = (overrides: Partial<Item> = {}): Item =>
	({
		id: 'i1',
		name: 'Rope, 15m',
		container: 'backpack',
		amount: 1,
		uses: 0,
		...overrides,
	}) as Item

const character = (
	weapons: Weapon[] = [],
	items: Item[] = [],
	name = 'Nabu-shum',
): Pick<Character, 'personal' | 'items'> =>
	({
		personal: { name },
		items: { weapons, items },
	}) as Pick<Character, 'personal' | 'items'>

describe('isTreasureCandidate', () => {
	it('takes anything with rules text', () => {
		expect(isTreasureCandidate({ description: 'Burns on a strong hit.' })).toBe(
			true,
		)
	})

	it('leaves catalogue gear out', () => {
		expect(isTreasureCandidate({ description: '' })).toBe(false)
		expect(isTreasureCandidate({ description: '   ' })).toBe(false)
	})
})

describe('characterTreasure', () => {
	it('maps a weapon onto a card', () => {
		const [entry] = characterTreasure(
			character([weapon({ description: 'Wreathed in flame.', quality: 5 })]),
		)
		expect(entry.item).toMatchObject({
			name: 'Bronze Khopesh',
			category: 'Weapon',
			quality: 5,
			cost: 40,
			load: 2,
			properties: 'slash, versatile',
			description: 'Wreathed in flame.',
		})
		expect(entry.candidate).toBe(true)
	})

	it('NEVER maps the sheet’s uses onto a card’s charges', () => {
		// On the sheet `uses` is a 0–3 damage state and 3 means broken; on a card
		// it is charges. Connecting them prints "3 uses" on a shattered sword.
		const [entry] = characterTreasure(
			character([weapon({ uses: 3, description: 'Notched and blackened.' })]),
		)
		expect(entry.item.uses).toBeUndefined()
	})

	it('takes the name as the type, having no other source', () => {
		const [entry] = characterTreasure(character([weapon()]))
		expect(entry.item.type).toBe('Bronze Khopesh')
		expect(entry.item.material).toBeUndefined()
	})

	it('returns catalogue gear too, marked as no candidate', () => {
		const entries = characterTreasure(character([weapon()], [item()]))
		expect(entries).toHaveLength(2)
		expect(entries.every((entry) => entry.candidate)).toBe(false)
	})

	it('reads rules text out of `special` when there is no description', () => {
		const [entry] = characterTreasure(
			character([], [item({ special: 'Never gutters in wind.' })]),
		)
		expect(entry.item.description).toBe('Never gutters in wind.')
		expect(entry.candidate).toBe(true)
	})

	it('keys every entry by the sheet’s id and the character', () => {
		// Two characters' "Bronze Khopesh" are different objects. Selecting by
		// name is the duplicate bug M18 fixed on the spell tool.
		const [mine] = characterTreasure(character([weapon()], [], 'Nabu-shum'))
		const [theirs] = characterTreasure(character([weapon()], [], 'Ereshkigal'))
		expect(mine.key).not.toBe(theirs.key)
		expect(mine.id).toBe(theirs.id)
	})

	it('falls back to weight when an item has no load', () => {
		const [entry] = characterTreasure(character([], [item({ weight: 3 })]))
		expect(entry.item.load).toBe(3)
	})

	it('joins an item’s property list into the card’s one line', () => {
		const [entry] = characterTreasure(
			character([], [item({ properties: ['worn', 'fragile'] })]),
		)
		expect(entry.item.properties).toBe('worn, fragile')
	})

	it('survives a character with nothing at all', () => {
		expect(characterTreasure(character())).toEqual([])
		expect(
			characterTreasure({} as Pick<Character, 'personal' | 'items'>),
		).toEqual([])
	})
})

describe('inferCategory', () => {
	const cases: Array<[string, Partial<Item>, string]> = [
		['a scroll', { name: 'Scroll of Haste' }, 'Spell Scroll'],
		['a wand', { name: 'Wand of Embers' }, 'Wand'],
		['a staff', { name: 'Staff of the Reeds' }, 'Staff'],
		['a shield', { name: 'Bronze Buckler' }, 'Shield'],
		['armour', { name: 'Scale Cuirass' }, 'Armor'],
		['a helm', { name: 'Bronze Helm' }, 'Armor'],
		['ammunition', { name: 'Barbed Arrows', amount: 12 }, 'Ammo'],
		['a potion', { name: 'Healing Draught' }, 'Consumable'],
		['anything worn', { name: 'Ward Amulet', slot: 'neck' }, 'Wearable'],
		['a lantern', { name: 'Storm Lantern' }, 'Utility'],
	]

	cases.forEach(([label, overrides, expected]) => {
		it(`reads ${label} as ${expected}`, () => {
			expect(inferCategory(item(overrides))).toBe(expected)
		})
	})

	it('reads a quick-slot stack as something spent', () => {
		expect(inferCategory(item({ container: 'quick', amount: 5 }))).toBe(
			'Consumable',
		)
	})

	it('prefers the sheet’s own answer — a slot — over the item’s name', () => {
		// `slot` is data; the name is free text. Where they disagree, trust data.
		expect(inferCategory(item({ name: 'Lantern Ring', slot: 'ring' }))).toBe(
			'Wearable',
		)
	})
})

describe('the weapon damage line', () => {
	it('states what the WEAPON adds, not what a character deals', () => {
		// A character's damage is the weapon plus their attribute and talents, and
		// only the sheet can be right about that (D7). The card carries what
		// belongs to the object.
		const [entry] = characterTreasure(
			character([
				weapon({
					description: 'Wreathed in flame.',
					damage: {
						base: 'STR',
						weapon: 4,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'physical',
					},
				} as Partial<Weapon>),
			]),
		)
		expect(entry.item.damage).toBe('+4')
	})

	it('states the bonus alone, with no attribute and no type', () => {
		const [entry] = characterTreasure(
			character([
				weapon({
					description: 'x',
					damage: {
						base: 'AGI',
						weapon: 3,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'fire',
					},
				} as Partial<Weapon>),
			]),
		)
		// `AGI +3 fire` implies a sum the card cannot finish: the attribute is the
		// character's, not the weapon's.
		expect(entry.item.damage).toBe('+3')
	})

	it('says nothing when the weapon has nothing to say', () => {
		const [entry] = characterTreasure(
			character([weapon({ description: 'x', damage: undefined })]),
		)
		expect(entry.item.damage).toBeUndefined()
	})
})

describe('inlineEmphasis', () => {
	it('renders the emphasis a player actually types', () => {
		// A sheet description is a textarea, and people write `*Ember Lash*` in a
		// textarea. The card body is HTML, so left alone it prints its asterisks.
		expect(inlineEmphasis('Casts *Ember Lash* at rank 2.')).toBe(
			'Casts <em>Ember Lash</em> at rank 2.',
		)
		expect(inlineEmphasis('**Trigger.** Then the effect.')).toBe(
			'<strong>Trigger.</strong> Then the effect.',
		)
	})

	it('leaves HTML alone, and is not a markdown parser', () => {
		expect(inlineEmphasis('Already <em>marked</em> up.')).toBe(
			'Already <em>marked</em> up.',
		)
		expect(inlineEmphasis('# Not a heading')).toBe('# Not a heading')
		expect(inlineEmphasis('3 * 4 = 12')).toBe('3 * 4 = 12')
	})
})
