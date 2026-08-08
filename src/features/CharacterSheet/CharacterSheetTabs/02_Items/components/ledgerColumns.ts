/**
 * The inventory ledger's column tracks (M13 S4, extended in S4b).
 *
 * One template per row shape, used by BOTH the section's column header and every
 * row under it — that shared constant is the whole mechanism. A header that
 * declares its own widths and rows that declare theirs is two sources of truth
 * for one alignment, and they drift the first time a column is added.
 *
 * `minmax(0, …)` on every flexible track: a grid track keeps an automatic
 * minimum of its content, so a long item name would otherwise push its column
 * past its share and break the alignment for the whole list. This is the same
 * trap the Status Conditions grid hit in S1.
 */

/**
 * `worn` exists because the equipment section is the only one where an item can
 * occupy a body slot.
 *
 * **`location` is not a column in any shape** (S4b): the section heading already
 * states it — "On Mount" *is* the location — so a column repeating it inside that
 * section said nothing and cost the row a seventh of its width.
 */
export type LedgerShape = 'item' | 'worn' | 'weapon'

/**
 * Where the columns switch on, as an `sx` media query.
 *
 * The same 45rem `characterSheet.css` uses for `.cs-ledger-cols`. Exported so a
 * cell can style its wrapped and its columned form without reaching for MUI's
 * `md` (56.25rem), which is the wrong number and leaves an 11rem window where the
 * grid is live and the cells are still dressed for the wrapped row.
 */
export const LEDGER_BREAKPOINT = '@media (min-width: 45rem)'

/**
 * The trailing track that clears the row's disclosure chevron.
 *
 * The chevron occupies 18px beside the row (`AccordionSummary`'s `gap: 1` plus
 * `Chevron`'s 10px glyph) — but 8px of that is already paid for here by the
 * EXTRA COLUMN GAP this track introduces, since the header has one more track
 * than the row and therefore one more gap. So the track itself is 10px.
 *
 * Measured in the browser rather than reasoned about once: the first two
 * attempts (36px, then 18px) both left every numeric column a few pixels off its
 * heading, and the residual is invisible unless you diff the two element lists.
 */
const CHEVRON = '10px'

/**
 * A heading is aligned to the CONTENT of its column, not uniformly: names and
 * properties are prose and set flush left, every numeric value is centred, and a
 * heading that disagrees with the column under it reads as a misalignment rather
 * than as a heading.
 */
export type LedgerHeading = { label: string; align: 'left' | 'center' }

const L = (label: string): LedgerHeading => ({ label, align: 'left' })
const C = (label: string): LedgerHeading => ({ label, align: 'center' })
/** A track this shape reserves but does not fill — see `LEDGER_TEMPLATE`. */
const BLANK: LedgerHeading = { label: '', align: 'left' }

/**
 * Three pips, each one interactive floor wide, so the column is three floors and
 * follows the token rather than restating its number.
 *
 * **Not `auto`.** That was the first attempt and it broke the alignment
 * everywhere: an `auto` track sizes to its own content, and the header's word
 * "Uses" is narrower than three pips — so the header and the row resolved
 * different widths for the same column and every flexible track either side
 * redistributed differently. A shared template only shares anything if every
 * track is content-independent.
 */
const USES = 'calc(var(--nexus-target) * 3)'
const NUM = '2.75rem'
/**
 * Was 3.5rem to hold a bordered field; amount is read-only text now (S4d, owner
 * call), so it needs no more room than cost or load.
 */
const AMOUNT = NUM
/**
 * The one column a shape gets to itself — damage on a weapon, body slot on worn
 * equipment, nothing on a plain item.
 *
 * **They share a track** (S4d, second pass). Reserving both cost every section
 * 9rem of air and it showed: Properties clipped to "reach, two-handed, arcane
 * catal…" on a weapon while a slot column it can never fill sat empty beside it.
 * No shape has both, so one track serves both and the heading names whichever the
 * section actually uses. Alignment is untouched — every shape still declares the
 * same seven tracks.
 *
 * Sized for the wider of the two contents: the damage ladder (`6ᵂ/9ˢ/12ᶜ` — the
 * success-level ticks cost about a rem over plain `6/9/12`) plus its 14px type
 * mark, which also clears a two-word slot name ("main hand").
 */
const VARIANT = '6.25rem'

/**
 * ONE template for every shape (M13 S4d).
 *
 * The three shapes used to declare three templates, so only the trailing
 * fixed-width tracks (cost, load, amount, uses) landed on the same x-positions
 * across sections — the `fr` tracks before them resolved against a different
 * leftover width in each section, and Name/Properties/Damage stepped left and
 * right as you read down the tab. Six ruled lists whose columns nearly agree
 * reads as a misprint, not as six lists.
 *
 * So every section reserves every column, and a shape that has no value for one
 * leaves it EMPTY rather than dropping the track — dropping it is what re-flowed
 * the neighbours. The only reserved track left is `VARIANT`, because damage and
 * slot were folded into one (see below); a plain inventory row spends 4.75rem on
 * air, and one vertical grid runs the length of the tab in exchange.
 *
 * A blank track still carries a blank heading, not the column's name: naming a
 * column no row under it fills would be worse than the gap.
 */
/*
	The name track is BOUNDED, the properties track is not (M13 S11).

	Both used to be `fr`, which was right when the column was 608px and wrong the
	moment it became fluid: at 1068px a 1.3fr name track is ~330px, so "Spellbook"
	sat in a third of a screen of air with its properties stranded on the far side
	of the gap. Names are short and roughly uniform; properties are the long,
	variable content. So the name gets a sane band and the SLACK all goes to
	properties, which is the only track that can spend it on something.
*/
export const LEDGER_TEMPLATE = `minmax(8rem, 18rem) ${VARIANT} minmax(0, 1fr) ${NUM} ${NUM} ${AMOUNT} ${USES}`

export const LEDGER_COLUMNS: Record<
	LedgerShape,
	{ headings: LedgerHeading[] }
> = {
	item: {
		headings: [
			L('Name'),
			BLANK,
			L('Properties'),
			C('Cost'),
			C('Load'),
			C('Amount'),
			C('Uses'),
		],
	},
	worn: {
		headings: [
			L('Name'),
			// Flush LEFT, not centred like the other short values: it shares the
			// `VARIANT` track with the damage ladder, and a heading centred in that
			// track sat a few characters right of the ladder's own left edge one
			// section above it. A shared track needs a shared alignment or the
			// sharing is visible (S4d, owner review).
			L('Slot'),
			L('Properties'),
			C('Cost'),
			C('Load'),
			C('Amount'),
			C('Uses'),
		],
	},
	weapon: {
		headings: [
			L('Name'),
			L('Damage'),
			L('Properties'),
			C('Cost'),
			C('Load'),
			C('Amount'),
			C('Uses'),
		],
	},
}

/** The header repeats the row's tracks plus the chevron gutter the rows leave. */
export const headerTemplate = () => `${LEDGER_TEMPLATE} ${CHEVRON}`
