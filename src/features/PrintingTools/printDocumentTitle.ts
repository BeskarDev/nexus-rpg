/**
 * What the browser calls the PDF (M18, owner request).
 *
 * Chrome's "Save as PDF" takes its filename from `document.title`, so every
 * tool produced the page's own title — five decks and a character sheet all
 * landing in the download folder as some variant of "Nexus RPG". A GM printing
 * a spell deck for one character, then the same deck a week later, could not
 * tell the two files apart without opening them.
 *
 * The shape is `nexus-<what>[-<who>]-<n>-cards-<date>`, all lowercase and
 * hyphenated: it sorts by deck, then by subject, then by date, and it survives
 * every filesystem.
 */

/** Lowercase, hyphenated, no run of separators — safe as a filename anywhere. */
export function slug(value: string): string {
	return (
		value
			.normalize('NFKD')
			// Strip combining marks, so "Ereshkígal" files next to "Ereshkigal".
			.replace(/[̀-ͯ]/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
	)
}

/** `2026-08-07` — sortable, and the same string in every locale. */
export function isoDate(date: Date = new Date()): string {
	const pad = (part: number) => String(part).padStart(2, '0')
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export interface DeckTitleOptions {
	/** What the deck is: `spells`, `combat-arts`, `magic-items`, `creatures`. */
	kind: string
	/** How many cards will actually print, continuations included (D3). */
	count: number
	/**
	 * Who it is for, when the deck came from one character. Several characters,
	 * or none, and the deck is not about a person — the name is left out rather
	 * than guessed at.
	 */
	subject?: string
	date?: Date
}

/**
 * The filename for a printed deck.
 *
 * The count is the PRINTED count, not the selected one: a deck of 24 spells
 * that spills to 26 cards is 26 sheets of paper, and the file should say what
 * came out of the printer rather than what went into the tool.
 */
export function deckDocumentTitle({
	kind,
	count,
	subject,
	date,
}: DeckTitleOptions): string {
	const parts = ['nexus', slug(kind)]
	const who = subject ? slug(subject) : ''
	if (who) parts.push(who)
	parts.push(String(count), count === 1 ? 'card' : 'cards', isoDate(date))
	return parts.join('-')
}

/**
 * The filename for a printed character sheet.
 *
 * The sheet tool already set a title, and it read `undefined-character-sheet`
 * whenever no character was loaded — a template printed for the table is a
 * legitimate use, so the nameless case gets a name of its own.
 */
export function sheetDocumentTitle(
	characterName?: string,
	date?: Date,
): string {
	const who = characterName ? slug(characterName) : ''
	return ['nexus', 'character-sheet', who || 'blank', isoDate(date)]
		.filter(Boolean)
		.join('-')
}
