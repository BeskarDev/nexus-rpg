import { describe, expect, it } from 'vitest'
import type { Character } from '@site/src/types/Character'
import {
	characterSpellIds,
	characterSpells,
	spellCatalogue,
	type UnifiedSpell,
} from '../spellSources'

/**
 * A catalogue small enough to reason about, including the one shape that has
 * bitten this code: a name held by BOTH lists.
 */
const CATALOGUE = [
	{
		id: 'arcane:Fireball',
		name: 'Fireball',
		type: 'arcane',
		category: 'Evocation',
		discipline: 'Evocation',
		rank: '3',
		focus: '2',
		target: 'Dodge',
		range: 'far',
		properties: '',
		effect: 'It burns.',
	},
	{
		id: 'arcane:Haste',
		name: 'Haste',
		type: 'arcane',
		category: 'Transmutation',
		discipline: 'Transmutation',
		rank: '3',
		focus: '2',
		target: 'self',
		range: 'self',
		properties: '',
		effect: 'Arcane haste.',
	},
	{
		id: 'mystic:Haste',
		name: 'Haste',
		type: 'mystic',
		category: 'Storm',
		tradition: 'Storm',
		rank: '3',
		focus: '2',
		target: 'self',
		range: 'self',
		properties: '',
		effect: 'Mystic haste.',
	},
] as unknown as UnifiedSpell[]

const character = (names: string[], name = 'Ereshkigal') =>
	({
		personal: { name },
		spells: { spells: names.map((spellName) => ({ name: spellName })) },
	}) as unknown as Character

describe('spellCatalogue', () => {
	it('carries both lists, with a type and an id on every entry', () => {
		const catalogue = spellCatalogue()
		expect(catalogue.length).toBeGreaterThan(0)
		expect(catalogue.every((spell) => /^(arcane|mystic):/.test(spell.id))).toBe(
			true,
		)
		expect(catalogue.some((spell) => spell.type === 'arcane')).toBe(true)
		expect(catalogue.some((spell) => spell.type === 'mystic')).toBe(true)
	})

	it('gives the five double-listed names one entry per list', () => {
		const haste = spellCatalogue().filter((spell) => spell.name === 'Haste')
		expect(haste).toHaveLength(2)
		expect(new Set(haste.map((spell) => spell.id)).size).toBe(2)
	})

	it('sorts by name', () => {
		const names = spellCatalogue().map((spell) => spell.name)
		expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
	})
})

describe('characterSpellIds', () => {
	it('resolves a sheet name to a catalogue id', () => {
		expect(characterSpellIds(character(['Fireball']), CATALOGUE)).toEqual([
			'arcane:Fireball',
		])
	})

	it('drops a spell no catalogue holds rather than printing a blank card', () => {
		expect(characterSpellIds(character(['A GM invention']), CATALOGUE)).toEqual(
			[],
		)
	})

	it('resolves a name held by both lists to the arcane one', () => {
		expect(characterSpellIds(character(['Haste']), CATALOGUE)).toEqual([
			'arcane:Haste',
		])
	})

	it('survives a sheet with no spell list at all', () => {
		expect(characterSpellIds({} as Character, CATALOGUE)).toEqual([])
	})
})

describe('characterSpells', () => {
	it('attributes every entry to the character', () => {
		const spells = characterSpells(
			character(['Fireball', 'Haste'], 'Ninsun'),
			CATALOGUE,
		)
		expect(spells.map((spell) => spell.name)).toEqual(['Fireball', 'Haste'])
		expect(spells.every((spell) => spell.characterName === 'Ninsun')).toBe(true)
	})

	it('names an unnamed sheet rather than printing cards for nobody', () => {
		const spells = characterSpells(
			{
				personal: {},
				spells: { spells: [{ name: 'Fireball' }] },
			} as unknown as Character,
			CATALOGUE,
		)
		expect(spells[0].characterName).toBe('Uploaded Character')
	})
})
