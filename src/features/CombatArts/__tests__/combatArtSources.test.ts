import { describe, expect, it } from 'vitest'
import type { Character } from '@site/src/types/Character'
import type { CombatArt } from '@site/src/types/CombatArt'
import {
	characterCombatArtNames,
	characterCombatArts,
	combatArtCatalogue,
} from '../combatArtSources'

const CATALOGUE: CombatArt[] = [
	{
		name: 'Shield Wall',
		category: 'Basic',
		weapons: 'shields',
		effect: 'Catalogue text.',
	},
	{
		name: 'Whirlwind',
		category: 'Supreme',
		weapons: 'axes',
		effect: 'It sweeps.',
	},
]

const character = (titles: string[], name = 'Gilgamesh') =>
	({
		personal: { name },
		skills: {
			abilities: titles.map((title, index) => ({
				id: `a${index}`,
				title,
				description: 'The sheet says something else.',
			})),
		},
	}) as unknown as Character

describe('combatArtCatalogue', () => {
	it('is the shipped list', () => {
		expect(combatArtCatalogue().length).toBeGreaterThan(0)
		expect(combatArtCatalogue()[0]).toHaveProperty('effect')
	})
})

describe('characterCombatArtNames', () => {
	it('keeps only ability titles the catalogue knows', () => {
		expect(
			characterCombatArtNames(
				character(['Shield Wall', 'Stone Hide']),
				CATALOGUE,
			),
		).toEqual(['Shield Wall'])
	})

	it('matches by title, so a sheet with no tags still prints its arts', () => {
		// The `Combat Art` tag is newer than the sheets. A pre-tag document has
		// ability rows and nothing else, and it must not print an empty deck.
		expect(
			characterCombatArtNames(character(['Whirlwind']), CATALOGUE),
		).toEqual(['Whirlwind'])
	})

	it('survives a sheet with no abilities', () => {
		expect(characterCombatArtNames({} as Character, CATALOGUE)).toEqual([])
	})
})

describe('characterCombatArts', () => {
	it('prints the CATALOGUE text, not the sheet row', () => {
		const arts = characterCombatArts(character(['Shield Wall']), CATALOGUE)
		expect(arts).toHaveLength(1)
		expect(arts[0].effect).toBe('Catalogue text.')
		expect(arts[0].characterName).toBe('Gilgamesh')
	})
})
