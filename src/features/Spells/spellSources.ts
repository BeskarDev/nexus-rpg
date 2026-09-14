/**
 * Where a spell card's content comes from (M22 S1).
 *
 * Two catalogues and a character's sheet, the same shape `abilitySources.ts`
 * already gives the ability deck. This existed only as inline state inside
 * `Spells.tsx`, which was fine while one tool printed spells; the Print
 * Everything page is a second caller, and "the character's spells" has to mean
 * exactly one thing in both places.
 *
 * Pure: no React, no JSX, no DOM. The tools render it and the tests exercise it
 * directly.
 */
import type { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import type { Character } from '@site/src/types/Character'
import type { MysticSpell } from '@site/src/types/MysticSpell'
import arcaneSpellData from '../../utils/data/json/arcane-spells.json'
import mysticSpellData from '../../utils/data/json/mystic-spells.json'

/** A spell from either catalogue, with what the card needs to print it. */
export type UnifiedSpell = {
	/**
	 * `arcane:Acid Splash`. Five spell names exist in BOTH lists — Acid Splash,
	 * Chain Lightning, Cone of Cold, Haste, True Strike — as genuinely different
	 * spells with a discipline and a tradition of their own. Selecting by name
	 * resolved both entries to whichever came first, so "Select all" printed the
	 * arcane one twice and the mystic one never (owner, 2026-08-07).
	 */
	id: string
	name: string
	type: SpellType
	/** The discipline or the tradition, whichever this spell has. */
	category: string
} & (ArcaneSpell | MysticSpell)

export type SpellType = 'arcane' | 'mystic'

/** A spell entry that knows whose sheet it came off. */
export type CharacterSpell = UnifiedSpell & { characterName: string }

/**
 * Both catalogues as one list, sorted by name.
 *
 * Module-level rather than a hook: the JSON is a frozen import, so the list is
 * the same object for every caller and no tool has to memoise it.
 */
const CATALOGUE: UnifiedSpell[] = [
	...(arcaneSpellData as ArcaneSpell[]).map((spell): UnifiedSpell => ({
		...spell,
		id: `arcane:${spell.name}`,
		type: 'arcane',
		category: spell.discipline,
	})),
	...(mysticSpellData as MysticSpell[]).map((spell): UnifiedSpell => ({
		...spell,
		id: `mystic:${spell.name}`,
		type: 'mystic',
		category: spell.tradition,
	})),
].sort((a, b) => a.name.localeCompare(b.name))

export const spellCatalogue = (): UnifiedSpell[] => CATALOGUE

/**
 * The catalogue ids of the spells on a character's sheet.
 *
 * A character NAMES its spells; the deck selects them by id. Where a name
 * exists in both catalogues the arcane one wins, which is what the spell tool
 * did before ids existed. A spell the character has that no catalogue holds —
 * a GM's one-off — has no card to print and is dropped.
 */
export function characterSpellIds(
	character: Pick<Character, 'spells'>,
	catalogue: UnifiedSpell[] = CATALOGUE,
): string[] {
	return (character?.spells?.spells ?? [])
		.map((spell) => catalogue.find((entry) => entry.name === spell.name)?.id)
		.filter((id): id is string => Boolean(id))
}

/**
 * A character's spells as printable entries, attributed to them.
 *
 * The id-returning form above is what the spell tool wants, because its
 * selection state IS a set of ids. The Print Everything page has no selection
 * state to fold into — it builds the deck from the characters directly — so it
 * wants the entries themselves.
 */
export function characterSpells(
	character: Pick<Character, 'personal' | 'spells'>,
	catalogue: UnifiedSpell[] = CATALOGUE,
): CharacterSpell[] {
	const characterName = character?.personal?.name || 'Uploaded Character'
	return characterSpellIds(character, catalogue)
		.map((id) => catalogue.find((entry) => entry.id === id))
		.filter((spell): spell is UnifiedSpell => Boolean(spell))
		.map((spell) => ({ ...spell, characterName }))
}
