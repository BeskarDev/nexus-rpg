/**
 * The party ledger's column tracks (M13 S7).
 *
 * `Adventurer | Player | Folk | Level | ` — the trailing track is the member's own
 * controls (leave, remove, delete the party), which is the one list on the sheet where
 * the available action depends on WHO the row is: yourself, someone else, or the last
 * member standing.
 */
const LEVEL = '4rem'
const ACTIONS = 'calc(var(--nexus-target) + 8px)'

export const PARTY_TEMPLATE = `minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr) ${LEVEL} ${ACTIONS}`

export const PARTY_HEADINGS: { label: string; align: 'left' | 'center' }[] = [
	{ label: 'Adventurer', align: 'left' },
	{ label: 'Player', align: 'left' },
	{ label: 'Folk', align: 'left' },
	{ label: 'Level', align: 'center' },
	{ label: '', align: 'center' },
]

/** No chevron gutter here: a member row does not expand — there is nothing inside it. */
export const partyHeaderTemplate = () => PARTY_TEMPLATE
