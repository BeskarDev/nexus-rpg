import { describe, it, expect } from 'vitest'
import {
	computeItemUpdates,
	computeSpellUpdates,
	computeTalentUpdates,
	computeWeaponUpdates,
	formatDamage,
} from '../computeContentUpdates'
import { Ability, Item, Spell, Weapon } from '../../../../types/Character'
import {
	buildItemFromSource,
	buildWeaponFromData,
	findItemSource,
	findWeaponSource,
	isMagicItemName,
	normalizeContentName,
} from '../itemFactory'
import { buildSpellFromData, findSpellSource } from '../spellFactory'
import { findTalentSource, buildTalentFields } from '../talentFactory'

const emptyDamage = {
	base: '' as const,
	weapon: 0,
	other: 0,
	otherWeak: 0,
	otherStrong: 0,
	otherCritical: 0,
	type: 'physical' as const,
	staticDamage: false,
}

describe('computeSpellUpdates', () => {
	it('flags a spell whose stored fields drifted from the JSON source', () => {
		const src = findSpellSource('Flickering Flame', 'Arcana')
		expect(src).not.toBeNull()

		const stale: Spell = {
			id: 'spell-1',
			name: 'Flickering Flame',
			rank: 0,
			cost: 0,
			target: '',
			range: '',
			properties: '-',
			dealsDamage: false, // stale: source deals damage
			damage: emptyDamage, // stale: source parses fire damage
			effect: 'outdated wording',
		}

		const updates = computeSpellUpdates([stale], 'Arcana')
		expect(updates).toHaveLength(1)
		const fields = updates[0].changes.map((c) => c.field)
		expect(fields).toContain('Effect')
		expect(fields).toContain('Damage')
		// next equals what a fresh import would produce (damage re-detected)
		expect(updates[0].next).toEqual(buildSpellFromData(src!.data, 'Arcana'))
		expect(updates[0].next.dealsDamage).toBe(true)
	})

	it('returns nothing when a spell already matches the source', () => {
		const src = findSpellSource('Flickering Flame', 'Arcana')!
		const current: Spell = {
			id: 'spell-1',
			...buildSpellFromData(src.data, 'Arcana'),
		}
		expect(computeSpellUpdates([current], 'Arcana')).toHaveLength(0)
	})

	it('skips homebrew spells not present in the source', () => {
		const homebrew: Spell = {
			id: 'x',
			name: 'Totally Made Up Spell',
			rank: 1,
			cost: 1,
			target: '',
			range: '',
			properties: '',
			dealsDamage: false,
			damage: emptyDamage,
			effect: 'whatever',
		}
		expect(computeSpellUpdates([homebrew], 'Arcana')).toHaveLength(0)
	})
})

describe('computeTalentUpdates', () => {
	it('flags a talent with an outdated description and preserves rank', () => {
		const src = findTalentSource('Battle Mage')
		expect(src).not.toBeNull()

		const stale: Ability = {
			id: 't-1',
			title: 'Battle Mage',
			description: 'old text',
			tag: 'Talent',
			rank: 3,
			skill: 'Arcana',
		}
		const updates = computeTalentUpdates([stale])
		expect(updates).toHaveLength(1)
		expect(updates[0].changes.map((c) => c.field)).toContain('Description')
		expect(updates[0].next).toEqual(buildTalentFields(src!))
	})

	it('ignores non-talent abilities', () => {
		const ability: Ability = {
			id: 'a',
			title: 'Battle Mage',
			description: 'old text',
			tag: 'Combat Art',
		}
		expect(computeTalentUpdates([ability])).toHaveLength(0)
	})
})

describe('formatDamage', () => {
	it('summarizes a scaling weapon-damage spell', () => {
		expect(
			formatDamage({ ...emptyDamage, base: 'MND', weapon: 2, type: 'fire' }),
		).toBe('MND, weapon x2 (fire)')
	})
})

describe('computeItemUpdates / computeWeaponUpdates', () => {
	const baseItem = (overrides: Partial<Item>): Item => ({
		id: 'item-1',
		name: '',
		properties: [],
		cost: 0,
		container: 'backpack',
		amount: 1,
		location: 'carried',
		uses: 0,
		durability: '',
		...overrides,
	})

	const importItem = (name: string, overrides: Partial<Item> = {}): Item => {
		const source = findItemSource({ name })
		if (!source) throw new Error(`no source for ${name}`)
		return baseItem({ ...buildItemFromSource(source), ...overrides })
	}

	const importWeapon = (name: string, overrides: Partial<Weapon> = {}) => {
		const source = findWeaponSource({ name })
		if (!source) throw new Error(`no source for ${name}`)
		return {
			id: 'weapon-1',
			location: 'worn',
			uses: 0,
			durability: '',
			...buildWeaponFromData(source),
			...overrides,
		} as Weapon
	}

	it('normalises names: apostrophes, whitespace, case and a bracketed tag', () => {
		expect(normalizeContentName('  Healer‘s   KIT [MW] ')).toBe("healer's kit")
		expect(normalizeContentName('Healer’s Kit')).toBe("healer's kit")
		expect(isMagicItemName('Bronze Longsword +1')).toBe(true)
		expect(isMagicItemName('Healing Salve (weak)')).toBe(false)
	})

	it('flags the saved Healer‘s Kit against the current table entry', () => {
		const saved = {
			id: 'hk',
			name: 'Healer‘s Kit',
			properties: 'q2',
			description:
				'Has 5 uses. Spend 1 use when you attempt to treat a Wound. You don’t have to make a Supply check.',
			load: 1,
			cost: 100,
			container: 'backpack',
			location: 'carried',
			amount: 1,
			uses: 0,
			durability: '',
		} as unknown as Item

		const [update, ...rest] = computeItemUpdates([saved])
		expect(rest).toHaveLength(0)
		expect(update.kind).toBe('equipment')
		expect(update.name).toBe('Healer‘s Kit')
		const fields = update.changes.map((c) => c.field)
		expect(fields).toEqual(
			expect.arrayContaining(['Description', 'Properties', 'Cost']),
		)
		expect(fields).not.toContain('Load')
		expect(update.next.properties).toEqual([])
		expect(update.next.sourceName).toBe('Healer’s Kit')
		expect(update.next.description).toContain('spend 1 use')
		expect(update.next.load).toBe(1)
		expect(update.next).not.toHaveProperty('weight')
	})

	it('matches a bracket-tagged, upper-cased name', () => {
		const item = importItem('Healer’s Kit', {
			name: 'HEALER’S KIT [MW]',
			description: 'old',
		})
		const updates = computeItemUpdates([item])
		expect(updates).toHaveLength(1)
		expect(updates[0].name).toBe('HEALER’S KIT [MW]')
	})

	it('prefers the recorded sourceName over the display name', () => {
		const item = importItem('Healer’s Kit', {
			name: 'Grandmother’s bag',
			description: 'old',
		})
		expect(computeItemUpdates([item])).toHaveLength(1)
	})

	it('skips homebrew and Magic Item Builder names', () => {
		const homebrew = baseItem({ name: 'Lucky Pebble', cost: 99 })
		const magic = baseItem({ name: 'Leather +1', cost: 1 })
		const magicWeapon = {
			...importWeapon('Longsword'),
			name: 'Bronze Longsword +1',
			sourceName: undefined,
			cost: 1,
		}
		expect(computeItemUpdates([homebrew, magic])).toEqual([])
		expect(computeWeaponUpdates([magicWeapon])).toEqual([])
	})

	it('yields nothing for freshly imported items and weapons', () => {
		const items = [
			importItem('Healer’s Kit'),
			importItem('Scale Mail'),
			importItem('Traveler’s Backpack'),
		]
		const weapons = [importWeapon('Longsword'), importWeapon('Shortbow')]
		expect(computeItemUpdates(items)).toEqual([])
		expect(computeWeaponUpdates(weapons)).toEqual([])
	})

	it('treats <br/> versus newline and legacy string properties as equal', () => {
		const fresh = importItem('Healer’s Kit')
		const asNewlines = {
			...fresh,
			description: `${String(fresh.description).replace(/<br\/>/g, '\n')}\n`,
		}
		const armor = importItem('Scale Mail')
		const legacyArmor = {
			...armor,
			properties: 'AV +4, heavy (d6), rigid 1',
			sourceName: undefined,
			load: 3,
		} as unknown as Item
		expect(computeItemUpdates([asNewlines, legacyArmor])).toEqual([])
	})

	it('normalises legacy string properties to an array in next', () => {
		const armor = {
			...importItem('Scale Mail'),
			properties: 'AV +3',
		} as unknown as Item
		const [update] = computeItemUpdates([armor])
		expect(update.next.properties).toEqual(['AV +4', 'heavy (d6)', 'rigid 1'])
		// Armor has no table description, so the player's note is not touched.
		expect(update.next).not.toHaveProperty('description')
	})

	it('never overwrites player-owned fields', () => {
		const item = importItem('Healer’s Kit', {
			id: 'mine',
			name: 'Healer’s Kit [MW]',
			amount: 3,
			location: 'mount',
			container: 'quick',
			slot: 'neck',
			uses: 2,
			durability: 'd8',
			quality: 4,
			mountInfo: 'saddlebag',
			description: 'old',
		})
		const [update] = computeItemUpdates([item])
		for (const key of [
			'id',
			'name',
			'amount',
			'location',
			'container',
			'slot',
			'uses',
			'durability',
			'quality',
			'mountInfo',
			'storageInfo',
		]) {
			expect(update.next).not.toHaveProperty(key)
		}

		const weapon = importWeapon('Longsword', {
			quality: 5,
			damage: {
				...importWeapon('Longsword').damage,
				base: 'AGI',
				weapon: 1,
				other: 2,
			},
		})
		const [wUpdate] = computeWeaponUpdates([weapon])
		expect(wUpdate.changes.map((c) => c.field)).toEqual(['Damage'])
		expect(wUpdate.next.damage.base).toBe('AGI')
		expect(wUpdate.next.damage.other).toBe(2)
		expect(wUpdate.next.damage.weapon).toBe(
			importWeapon('Longsword').damage.weapon,
		)
		expect(wUpdate.next).not.toHaveProperty('quality')
		expect(wUpdate.next).not.toHaveProperty('description')
	})
})
