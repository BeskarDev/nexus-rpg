/**
 * The character list's column tracks (M13 S12).
 *
 * The list is the sheet's ONLY list that was never re-cut as a ledger: M9 S8 made
 * it a contents page (ruled rows, name in the display serif, a level tag) and
 * M13 re-cut every list on the sheet itself around it. The result was a page whose
 * rows carried the right facts in the wrong shape — a name and a `folk · background`
 * subtitle, with the level stranded at the far right of a 1400px row, which is the
 * same "unrelated fragment" fault S4e fixed on the load band.
 *
 * So: the same tracks, the same headings, the same cells as every other list on
 * the sheet. Four facts, four columns, one vertical grid down the page.
 */

/**
 * The portrait plate. The track is the plate's own width, not a padded slot: the
 * ledger grid forces its children to `width: 100%`, so a track wider than the
 * plate stretches it into a rectangle.
 */
const MARK = '1.9rem'
/** Folk and background are short, closed vocabularies — sized to the words. */
const FOLK = '8rem'
const BACKGROUND = '9rem'
/** One numeral under a centred heading, as Rank is on the ability ledger. */
const LEVEL = '4rem'
/** The delete control, which sits outside the row's link. */
const ACTIONS = '2.25rem'

/**
 * Name is BOUNDED rather than `fr` (the S11 call, applied here from the start).
 * Character names are short and roughly uniform; letting the name track take all
 * the slack of a 1400px page puts `Kael Stormwind` in a third of a screen of air
 * with its folk stranded across the gap.
 */
export const CHARACTER_TEMPLATE = `${MARK} minmax(8rem, 20rem) ${FOLK} ${BACKGROUND} ${LEVEL} minmax(0, 1fr) ${ACTIONS}`

export type CharacterHeading = { label: string; align: 'left' | 'center' }

export const CHARACTER_HEADINGS: CharacterHeading[] = [
	// Blank over the portrait: naming a column of faces states nothing.
	{ label: '', align: 'center' },
	{ label: 'Name', align: 'left' },
	{ label: 'Folk', align: 'left' },
	{ label: 'Background', align: 'left' },
	{ label: 'Level', align: 'center' },
	// The slack track, so the four facts stay together on a wide page and the
	// delete control stays on the right edge where every other list keeps it.
	{ label: '', align: 'left' },
	{ label: '', align: 'center' },
]
