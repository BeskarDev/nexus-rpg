/**
 * Where a combat art card's content comes from (M22 S1).
 *
 * A combat art lands on a character sheet as an ordinary ABILITY row — there is
 * no combat arts list on the sheet — so "the character's combat arts" means the
 * ability titles that match a catalogue entry. That rule lived inline in
 * `CombatArts.tsx`, and the ability deck's own rule (`abilitySources.ts`, which
 * drops `Combat Art`-tagged rows because they belong to this deck) is its other
 * half. The two now sit one import apart.
 *
 * Pure: no React, no JSX, no DOM.
 */
import type { Character } from '@site/src/types/Character'
import type { CombatArt } from '@site/src/types/CombatArt'
import combatArtsData from '../../utils/data/json/combat-arts.json'

/** A combat art that knows whose sheet it came off. */
export type CharacterCombatArt = CombatArt & { characterName: string }

const CATALOGUE = combatArtsData as CombatArt[]

export const combatArtCatalogue = (): CombatArt[] => CATALOGUE

/**
 * The names of the catalogue combat arts a character holds.
 *
 * Matched by TITLE, not by the `Combat Art` tag: the tag is newer than the
 * sheets, and a pre-tag document would otherwise print no arts at all. An
 * ability whose title is not in the catalogue is not a combat art and is left
 * for the ability deck.
 */
export function characterCombatArtNames(
	character: Pick<Character, 'skills'>,
	catalogue: CombatArt[] = CATALOGUE,
): string[] {
	return (character?.skills?.abilities ?? [])
		.map((ability) => ability.title)
		.filter((title) => catalogue.some((art) => art.name === title))
}

/**
 * A character's combat arts as printable entries, attributed to them.
 *
 * The catalogue's text wins here, unlike the ability deck, where the SHEET's
 * text wins: an ability row is where a player's own wording lives, but a combat
 * art row on a sheet is a pointer to a catalogue entry, and the catalogue is
 * the thing being referenced mid-fight.
 */
export function characterCombatArts(
	character: Pick<Character, 'personal' | 'skills'>,
	catalogue: CombatArt[] = CATALOGUE,
): CharacterCombatArt[] {
	const characterName = character?.personal?.name || 'Uploaded Character'
	return characterCombatArtNames(character, catalogue)
		.map((name) => catalogue.find((art) => art.name === name))
		.filter((art): art is CombatArt => Boolean(art))
		.map((art) => ({ ...art, characterName }))
}
