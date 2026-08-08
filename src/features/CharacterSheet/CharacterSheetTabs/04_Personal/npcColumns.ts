/**
 * The NPC ledger's column tracks (M13 S6).
 *
 * `Name | Role | Disposition | Notes`. One shape — every relationship has the same four
 * facts — so as on the Spells tab there is no shape map, no reserved track and no blank
 * heading.
 *
 * Disposition is the widest fixed track because its value is a WORD PLUS A NUMBER
 * ("friendly +1"): the number is what the rules use and the word is what a player reads,
 * and dropping either would make the column need a tooltip to be legible.
 */
const ROLE = '7rem'
const DISPOSITION = '9rem'

export const NPC_TEMPLATE = `minmax(0, 1.2fr) ${ROLE} ${DISPOSITION} minmax(0, 1.6fr)`

export type NpcHeading = { label: string; align: 'left' | 'center' }

export const NPC_HEADINGS: NpcHeading[] = [
	{ label: 'Name', align: 'left' },
	{ label: 'Role', align: 'left' },
	{ label: 'Disposition', align: 'left' },
	{ label: 'Notes', align: 'left' },
]

/** The header repeats the row's tracks plus the chevron gutter the rows leave. */
export const npcHeaderTemplate = () => `${NPC_TEMPLATE} 10px`
