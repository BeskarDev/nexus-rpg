/**
 * The spell ledger's column tracks (M13 S5).
 *
 * One template, used by the section's column header and by every row under it —
 * the same mechanism `ledgerColumns.ts` carries for the Items tab, and for the same
 * reason: a header that declares its own widths and rows that declare theirs are two
 * sources of truth for one alignment, and they drift the first time a column moves.
 *
 * Spells need only ONE shape, unlike items — every spell has the same facts. So
 * there is no shape map here, no reserved tracks, and no blank headings.
 *
 * `minmax(0, …)` on every flexible track: a grid track keeps an automatic minimum of
 * its content, so a long spell name would otherwise push its column past its share
 * and break the alignment for the whole list.
 */

/**
 * The cast rune, and the "Cost" heading above it.
 *
 * Sized by whichever is wider — the same correction the Companions ledger's wound track
 * needed (S7): a track carrying a column heading cannot be sized to its control alone, or the
 * heading clips while the control has room. `Cost` in the small-caps heading register is about
 * 30px, the rune is 30px, so this holds both with a little air.
 */
const CAST = '3rem'
const RANK = '2.5rem'
const TARGET = '5rem'
const RANGE = '5.5rem'
/**
 * The damage ladder with its type mark, reserved whether or not this spell deals
 * damage (S5, owner review).
 *
 * Properties and damage shared one track in the first pass — a spell showed one or the
 * other, under a heading that said "Effect" and meant neither. But properties
 * (`concentrate`, `quick`, `ritual`) is how a player finds the spell they can cast
 * right now, so it cannot be the thing that gets dropped when a spell deals damage.
 * Two tracks, and the damage one is reserved for the same reason the Items ledger
 * reserves its variant track: alignment across rows beats reclaiming the width.
 */
const DAMAGE = '7.5rem'

/**
 * `Cast | Rank | Name | Target | Range | Properties | Damage`.
 *
 * Cast leads because it is the only control on the row and the only thing touched
 * mid-fight; everything after it is read. That is the opposite of the Items ledger,
 * where the control (the wear pips) trails — and the difference is deliberate: a
 * weapon's pips are a consequence of use, while casting is the ACTION the row exists
 * for, so it sits where the eye starts.
 */
/*
	Name bounded, properties fluid (M13 S11) — the same call the items ledger makes,
	for the same reason. Both tracks were `fr`, which split the slack evenly once
	the column went fluid and left a spell's name floating in ~320px of air.
*/
export const SPELL_TEMPLATE = `${CAST} ${RANK} minmax(8rem, 18rem) ${TARGET} ${RANGE} minmax(0, 1fr) ${DAMAGE}`

export type SpellHeading = { label: string; align: 'left' | 'center' }

const L = (label: string): SpellHeading => ({ label, align: 'left' })
const C = (label: string): SpellHeading => ({ label, align: 'center' })

export const SPELL_HEADINGS: SpellHeading[] = [
	C('Cost'),
	C('Rank'),
	L('Name'),
	L('Target'),
	L('Range'),
	L('Properties'),
	L('Damage'),
]

/**
 * The header repeats the row's tracks plus the chevron gutter the rows leave.
 *
 * Same 10px as the Items ledger, for the same measured reason recorded there: the
 * chevron occupies 18px beside the row, 8px of which is paid for by the extra column
 * gap this track introduces.
 */
export const spellHeaderTemplate = () => `${SPELL_TEMPLATE} 10px`
