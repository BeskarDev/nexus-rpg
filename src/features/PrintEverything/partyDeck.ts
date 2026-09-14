/**
 * One party's whole printable deck, in one list (M22 S3).
 *
 * The six print tools each answer "what does this character own, of MY kind",
 * and each answers it for one character at a time onto paper of its own. A GM
 * printing for a table therefore made six trips and spent six part-filled
 * pages. This asks all six questions of every selected character and returns a
 * single flat list, which `PrintPages` then packs continuously — only the last
 * card page is part empty, whatever the party looks like.
 *
 * Everything here is pure: no React, no JSX, no DOM. The page renders it and
 * the tests exercise it directly.
 */
import type { Character, CharacterDocument } from '@site/src/types/Character'
import type { CombatArt } from '@site/src/types/CombatArt'
import type { Creature } from '@site/src/types/Creature'
import type { MagicItem } from '@site/src/types/MagicItem'
import { characterAbilities, type DeckEntry } from '../Abilities/abilitySources'
import {
	characterCombatArtNames,
	characterCombatArts,
} from '../CombatArts/combatArtSources'
import { companionEntries } from '../CreatureCards/creatureSources'
import { characterTreasure } from '../MagicItems/characterTreasure'
import { isoDate, slug } from '../PrintingTools'
import { characterSpells, type UnifiedSpell } from '../Spells/spellSources'

/**
 * What can be printed for a character.
 *
 * `characterSheets` is in the same list as the five card kinds even though it
 * is not a card: it is one of the things the owner is choosing to include or
 * leave out, and a separate control for it would say it is a different sort of
 * decision than the rest. It is not — "I want the cards but not the sheets" is
 * the exact case this page was asked for.
 */
export type PrintCategory =
	| 'spells'
	| 'combatArts'
	| 'abilities'
	| 'magicItems'
	| 'companions'
	| 'characterSheets'

/**
 * Print order, and the order the toggles are listed in.
 *
 * Cards first, sheets last: the two live on different paper (192 x 267mm
 * portrait against A4 landscape), and a job that alternates between them is a
 * job whose output cannot be guillotined in one pass.
 */
export const PRINT_CATEGORIES: PrintCategory[] = [
	'spells',
	'combatArts',
	'abilities',
	'magicItems',
	'companions',
	'characterSheets',
]

export const CATEGORY_LABELS: Record<PrintCategory, string> = {
	spells: 'Spells',
	combatArts: 'Combat Arts',
	abilities: 'Abilities',
	magicItems: 'Magic Items',
	companions: 'Companions',
	characterSheets: 'Character Sheets',
}

/** The five card kinds. `characterSheets` produces sheets, not cards. */
export const CARD_CATEGORIES = PRINT_CATEGORIES.filter(
	(category) => category !== 'characterSheets',
)

/** One card's worth of content, whichever deck it would have come from. */
export type CardEntry = {
	/**
	 * Unique across the whole deck: `<docId>:<category>:<local id>`.
	 *
	 * The document id leads, because the same spell on two characters' sheets is
	 * two cards here — each player gets their own copy — and every id below it
	 * is only unique within its own character. Keying by anything narrower
	 * collapses the party's shared spells onto one card, which is the bug the
	 * spell deck already paid for once by name (M18 F8).
	 */
	key: string
	/** Whose card this is. Printed on the card and used for the file name. */
	characterName: string
	category: Exclude<PrintCategory, 'characterSheets'>
} & (
	| { kind: 'spell'; spell: UnifiedSpell }
	| { kind: 'combatArt'; art: CombatArt }
	| { kind: 'ability'; entry: DeckEntry }
	| { kind: 'magicItem'; item: MagicItem }
	| { kind: 'companion'; creature: Creature }
)

export interface PartyDeck {
	/** Every card, in party then category order, ready to paginate. */
	cards: CardEntry[]
	/** The characters whose sheets to print, in roster order. Empty if excluded. */
	sheets: CharacterDocument[]
	/** How many cards each selected category contributed. For the count line. */
	counts: Record<Exclude<PrintCategory, 'characterSheets'>, number>
	/**
	 * Companions that could not be parsed out of a character's markdown, by
	 * character name. Reported rather than dropped: a druid whose whole animal
	 * roster is missing should be told, not left to count cards.
	 */
	companionErrors: string[]
}

/** A character document's own id, with a fallback for a pasted document. */
const docIdOf = (character: CharacterDocument): string =>
	character.docId || character.personal?.name || 'character'

const nameOf = (character: CharacterDocument): string =>
	character.personal?.name || 'Unnamed'

/**
 * Build the party's deck.
 *
 * Ordered by CHARACTER first and category second, so a cut stack sorts into
 * player piles in one pass even though the pages themselves are packed tight
 * and mix everyone together. The alternative — grouping by category — makes the
 * stack sort by kind, which is the wrong axis: nobody deals a table a pile of
 * everyone's spells.
 */
export function buildPartyDeck(
	characters: CharacterDocument[],
	categories: readonly PrintCategory[],
): PartyDeck {
	const selected = new Set(categories)
	const cards: CardEntry[] = []
	const companionErrors: string[] = []
	const counts = {
		spells: 0,
		combatArts: 0,
		abilities: 0,
		magicItems: 0,
		companions: 0,
	}

	characters.forEach((document) => {
		const docId = docIdOf(document)
		const characterName = nameOf(document)
		// The stored document IS a character for every reader below; the extra
		// fields a document carries (`docId`, `collectionId`) are not in the way.
		const character = document as unknown as Character

		if (selected.has('spells')) {
			characterSpells(character).forEach((spell) => {
				cards.push({
					key: `${docId}:spells:${spell.id}`,
					characterName,
					category: 'spells',
					kind: 'spell',
					spell,
				})
				counts.spells += 1
			})
		}

		if (selected.has('combatArts')) {
			characterCombatArts(character).forEach((art) => {
				cards.push({
					key: `${docId}:combatArts:${art.name}`,
					characterName,
					category: 'combatArts',
					kind: 'combatArt',
					art,
				})
				counts.combatArts += 1
			})
		}

		if (selected.has('abilities')) {
			/*
			 * The two decks overlap on an UNTAGGED sheet, and printing both at once
			 * is what exposes it.
			 *
			 * `characterAbilities` drops a row tagged `Combat Art`, because the
			 * combat art deck owns those. The combat art deck matches by TITLE
			 * instead, so that a sheet written before the tag existed still prints
			 * its arts. An untagged `Aimed Shot` therefore satisfies both: one card
			 * from each deck, the same art twice, which no single tool could ever
			 * have shown.
			 *
			 * The art's own card wins — it has the catalogue's text — so the
			 * ability side stands down, and only while the combat art category is
			 * actually being printed. Switch combat arts off and an untagged art
			 * still prints as an ability rather than vanishing.
			 */
			const ownedArts = selected.has('combatArts')
				? new Set(characterCombatArtNames(character))
				: new Set<string>()
			characterAbilities(character, docId)
				.entries.filter((entry) => !ownedArts.has(entry.title))
				.forEach((entry) => {
					cards.push({
						key: `${docId}:abilities:${entry.id}`,
						characterName,
						category: 'abilities',
						kind: 'ability',
						entry,
					})
					counts.abilities += 1
				})
		}

		if (selected.has('magicItems')) {
			// Candidates only: an item with no description has no rules text to
			// reference, and a party's worth of bedrolls and rations is exactly the
			// wasted paper this page exists to stop. The magic item tool's "show all
			// items" escape hatch stays there, where one character is in view.
			characterTreasure(character)
				.filter((treasure) => treasure.candidate)
				.forEach((treasure) => {
					cards.push({
						key: `${docId}:magicItems:${treasure.id}`,
						characterName,
						category: 'magicItems',
						kind: 'magicItem',
						item: treasure.item,
					})
					counts.magicItems += 1
				})
		}

		if (selected.has('companions')) {
			try {
				companionEntries(docId, character.companions).forEach((entry) => {
					cards.push({
						key: `${docId}:companions:${entry.id}`,
						characterName,
						category: 'companions',
						kind: 'companion',
						creature: entry.creature,
					})
					counts.companions += 1
				})
			} catch (error) {
				// One character's malformed companion markdown must not take the
				// party's deck with it.
				console.error(`Failed to parse companions for ${characterName}:`, error)
				companionErrors.push(characterName)
			}
		}
	})

	return {
		cards,
		sheets: selected.has('characterSheets') ? [...characters] : [],
		counts,
		companionErrors,
	}
}

/**
 * What the printed file is called.
 *
 * One character's deck is named after them, exactly as every other tool names
 * its own; a party's is named by its size, because a file called after whoever
 * happened to be first is worse than one that admits it holds several.
 */
export function partyDocumentTitle(
	characterNames: string[],
	cardCount: number,
	sheetCount: number,
	date?: Date,
): string {
	const parts = ['nexus', 'print-everything']
	if (characterNames.length === 1) {
		parts.push(slug(characterNames[0]))
	} else if (characterNames.length > 1) {
		parts.push(`${characterNames.length}-characters`)
	}
	if (cardCount > 0) {
		parts.push(`${cardCount}-${cardCount === 1 ? 'card' : 'cards'}`)
	}
	if (sheetCount > 0) {
		parts.push(`${sheetCount}-${sheetCount === 1 ? 'sheet' : 'sheets'}`)
	}
	parts.push(isoDate(date))
	return parts.filter(Boolean).join('-')
}

/**
 * How many card pages the SIX TOOLS would have used for the same cards.
 *
 * Each deck starts its own page, so each ends on a part-filled one. The
 * difference against a single packed run is what the page saves, and it is
 * counted here rather than asserted on screen.
 *
 * Continuations are not in it: the count is of selected cards, and a spill
 * lands on both sides of the comparison alike.
 */
export function deckByDeckPageCount(
	counts: PartyDeck['counts'],
	perPage: number,
): number {
	return Object.values(counts).reduce(
		(pages, count) => pages + Math.ceil(count / perPage),
		0,
	)
}
