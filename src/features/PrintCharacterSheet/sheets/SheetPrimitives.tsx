import React from 'react'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import type { SigilName } from '@site/src/components/codex/sigil-paths'
import { SHEET_SIGIL, STAT_SIGIL } from '@site/src/components/codex/stat-sigils'
import type {
	SheetSigilName,
	StatSigilName,
} from '@site/src/components/codex/stat-sigils'
import { ActionGlyph } from '../../CharacterSheet/CharacterSheetTabs/01_Skills/components/ActionMark'
import type { ActionType } from '@site/src/types/ActionType'

/**
 * What a printed label can be marked with.
 *
 * Either a GAME slot the sheet already has a mark for (`parry`, `hp`, `folk`) —
 * resolved through the same two tables the digital sheet uses, so the two
 * surfaces can never drift apart — or a depictive sigil name directly, for the
 * handful of printed groups that have no screen equivalent to borrow from.
 */
export type SigilSlot = StatSigilName | SheetSigilName | SigilName

const SLOT: Record<string, SigilName> = { ...STAT_SIGIL, ...SHEET_SIGIL }

export const Mark: React.FC<{ name: SigilSlot; size: string }> = ({
	name,
	size,
}) => <SigilIcon name={SLOT[name] ?? (name as SigilName)} size={size} />

/**
 * A small-caps label with its codex mark, or without one.
 *
 * The mark is decorative by the theme's accessibility rule — the word is always
 * beside it — and on paper it does a second job: it is the fastest way to find
 * the HP box on a sheet you are holding at arm's length.
 */
export const MarkLabel: React.FC<{ label: string; sigil?: SigilSlot }> = ({
	label,
	sigil,
}) => (
	/*
		ALWAYS the same box, marked or not (owner review).

		This used to return a bare inline span when there was no sigil and a flex
		row when there was, so two fields side by side put their words at different
		heights and different left edges for no reason but whether one of them had
		a mark. Where there is no mark there is now an empty slot the same width,
		so a row of labels reads as one line.
	*/
	<span className="pc-label pc-mark-label">
		{sigil ? (
			<Mark name={sigil} size="1.6em" />
		) : (
			<span className="pc-mark-label__gap" aria-hidden="true" />
		)}
		{label}
	</span>
)

/**
 * A resource the player strikes through with a pen (owner review).
 *
 * Wounds, Resolve, Fatigue and an item's Uses print as marks rather than as
 * numbers, because that is what they are during play: a thing you cross off, not
 * a figure you erase and rewrite in a 4mm box. The digital sheet reached the same
 * conclusion — all four are `PipRow`s — so this uses the same marks for the same
 * four resources and draws nothing new (M17 D4).
 *
 * The empty state is the mark's OUTLINE, not a lighter copy of it: a printed fact
 * may never depend on a wash to be read, and a hollow mark is also simply a
 * better thing to put a biro through. See `.pc-pip--empty`.
 */
export const Pips: React.FC<{
	count: number
	filled: number
	/** The mark for a spent pip. */
	sigil: SigilSlot
	/** The mark for an unspent one. Defaults to `sigil`; pass it for a pair
	    that tells a story, as `hp` to `wound` does for a wound or a worn item. */
	emptySigil?: SigilSlot
	size?: string
	/** Wrap into a block instead of one row — six fatigue pips as 3 x 2. */
	wrap?: boolean
}> = ({ count, filled, sigil, emptySigil, size = '3.2mm', wrap }) => (
	<span className={wrap ? 'pc-pips pc-pips--wrap' : 'pc-pips'}>
		{Array.from({ length: count }, (_, i) => {
			const spent = i < filled
			return (
				<span key={i} className={spent ? 'pc-pip' : 'pc-pip pc-pip--empty'}>
					<Mark name={spent ? sigil : (emptySigil ?? sigil)} size={size} />
				</span>
			)
		})}
	</span>
)

/**
 * A pip row standing where a stat cell would, so a band's labels keep one
 * baseline whether the value under them is a number or a track of marks.
 */
export const PipStat: React.FC<{
	label: string
	sigil?: SigilSlot
	count: number
	filled: number
	pip: SigilSlot
	emptyPip?: SigilSlot
	width?: string
	wrap?: boolean
}> = ({ label, sigil, count, filled, pip, emptyPip, width, wrap }) => (
	<div className="pc-pipstat" style={{ width }}>
		<MarkLabel label={label} sigil={sigil} />
		<Pips
			count={count}
			filled={filled}
			sigil={pip}
			emptySigil={emptyPip}
			wrap={wrap}
		/>
	</div>
)

/**
 * The printed sheet's vocabulary (M16 S1).
 *
 * Four pieces, and nothing else is needed to set any of the four pages:
 * a FIELD (a label over a value), a GROUP (a wash band naming what follows),
 * a TABLE of rows, and the OVERFLOW note.
 *
 * ## Why these are not MUI
 *
 * The sheet used `TextField variant="outlined"` for every value, which draws a
 * rounded rectangle around each one — a screen form photocopied onto paper. On
 * paper a value does not need a box to say it is a value; it needs a label above
 * it and a baseline under it, which is how a printed form has worked since long
 * before there were forms on screens.
 *
 * These render plain elements against the register in `src/css/print-codex.css`,
 * so nothing here carries a size or a colour of its own.
 */

export const Field: React.FC<{
	label: string
	value?: React.ReactNode
	width?: string
	/**
	 * Take the remaining width of a ROW.
	 *
	 * Only ever inside a horizontal row. The sheet itself is a column, so a field
	 * given this at the top level grows along the column instead — which is what
	 * put 33.7mm of blank paper under the character's name (owner review).
	 */
	grow?: boolean
	sigil?: SigilSlot
	/** The one field on the page that is a title: the character's name. */
	title?: boolean
}> = ({ label, value, width, grow, sigil, title }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '0.3mm',
			width,
			flexGrow: grow ? 1 : 0,
			minWidth: 0,
		}}
	>
		<MarkLabel label={label} sigil={sigil} />
		<span className={`pc-slot${title ? ' pc-slot--title' : ''}`}>
			{value === '' || value === undefined || value === null ? ' ' : value}
		</span>
	</div>
)

/**
 * A number read at a glance: a die, a defense, a pool.
 *
 * These were rounded outlined MUI inputs with a 3px border, a
 * floating notched label and a helper line. On paper that is four devices doing
 * the work of one. Here the label sits above in small caps and the value sits in
 * a washed cell, and the only thing that varies between a die and a defense is
 * how much ink the cell carries.
 */
export const Stat: React.FC<{
	label: string
	value: React.ReactNode
	width?: string
	/** A footnote under the value: the wound box, a maximum. */
	note?: string
	sigil?: SigilSlot
	/** The value draws its own container (an attribute die), so the cell does not. */
	bare?: boolean
}> = ({ label, value, width = '15mm', note, sigil, bare }) => (
	<div
		style={{ display: 'flex', flexDirection: 'column', gap: '0.3mm', width }}
	>
		<MarkLabel label={label} sigil={sigil} />
		<span className={`pc-stat${bare ? ' pc-stat--die' : ''}`}>
			{value === '' || value === undefined || value === null ? ' ' : value}
		</span>
		{note && (
			<span className="pc-label" style={{ textAlign: 'center' }}>
				{note}
			</span>
		)}
	</div>
)

/**
 * A block of the player's own words, or the ruled space to write them in.
 *
 * Prose that is already there prints; whatever is left of the block stays ruled,
 * because the Personal sheet is the one page whose whole job is to be added to
 * during play.
 */
export const Prose: React.FC<{
	label: string
	children?: React.ReactNode
	sigil?: SigilSlot
	/** Its share of the page against its siblings. Physical description is worth
	    less of the Personal sheet than relationships or notes are. */
	weight?: number
}> = ({ label, children, weight = 1, sigil }) => (
	<section
		style={{
			display: 'flex',
			flexDirection: 'column',
			flexGrow: weight,
			flexBasis: 0,
			minHeight: 0,
		}}
	>
		<div className="pc-group__head pc-mark-label">
			{sigil && <Mark name={sigil} size="1.5em" />}
			{label}
		</div>
		<div className="pc-prose">{children}</div>
		<WriteLines />
	</section>
)

/**
 * A named band of stats that sizes to its contents (M17 S2).
 *
 * `Group` grows to fill what is left of the page, which is right for a list and
 * wrong for the header blocks: attributes, defenses and vitality are the densest
 * and most-read part of the sheet, and they used to run as flat unnamed rows of
 * fields with nothing saying where one reading ended and the next began. A band
 * gives each its carved heading and takes only the height it needs.
 */
export const Band: React.FC<{
	name: string
	children: React.ReactNode
	sigil?: SigilSlot
	grow?: boolean
}> = ({ name, children, sigil, grow }) => (
	<section
		style={{
			display: 'flex',
			flexDirection: 'column',
			flexGrow: grow ? 1 : 0,
			minWidth: 0,
		}}
	>
		<div className="pc-group__head pc-mark-label">
			{sigil && <Mark name={sigil} size="1.5em" />}
			{name}
		</div>
		{/*
			Aligned to the TOP, so every label in the band sits on one line.

			This was `flex-end`, which lines the VALUES up instead — right while
			every cell is the same height, and wrong the moment one is not. Fatigue's
			six pips wrap to two rows, so bottom-alignment pushed its label a row
			higher than Resolve's beside it (owner review). Only one of the two can
			be aligned; the labels are what the eye reads across.
		*/}
		<div
			style={{
				display: 'flex',
				gap: '1.5mm',
				padding: '0.5mm 1.5mm 0',
				alignItems: 'flex-start',
			}}
		>
			{children}
		</div>
	</section>
)

export const Group: React.FC<{
	name: string
	children: React.ReactNode
	sigil?: SigilSlot
}> = ({ name, children, sigil }) => (
	<section
		style={{
			display: 'flex',
			flexDirection: 'column',
			flexGrow: 1,
			minHeight: 0,
		}}
	>
		<div className="pc-group__head pc-mark-label">
			{sigil && <Mark name={sigil} size="1.5em" />}
			{name}
		</div>
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				minHeight: 0,
			}}
		>
			{children}
		</div>
	</section>
)

/**
 * The ruled remainder of a block, however much of it there is.
 *
 * The first attempt counted lines per sheet — `Math.max(3, 47 - relationships * 3)`
 * and four more like it — and every one of those numbers had to be re-tuned by
 * hand against a rendered page, for one character, at one content length. That is
 * a layout constant standing in for a layout rule.
 *
 * The rule: blank lines are DECORATION, and clipping decoration loses nothing.
 * So the block emits more lines than can ever fit and the container clips them.
 *
 * ## Where these are still legitimate (M17 D3, S4)
 *
 * **Only `Prose`.** M16 spread write-lines across every block, because with the
 * old reservations in place a typical character printed 70% white and ruled
 * nothing looked better than white nothing. M17 removed the reservations, so
 * there is real content to put there instead, and D3 settles which is the better
 * use: the printed sheet is a REFERENCE, not a worksheet.
 *
 * A ruled line where a hand actually writes is a printed form's one legitimate
 * use of a rule. Ruled lines as filler are exactly what made the sheet read as a
 * form it is not — so `Rows` no longer offers them and `AbilityWriteLines` is
 * gone. The Personal sheet keeps them because adding to it between sessions is
 * that page's whole job.
 */
const WriteLines: React.FC = () => (
	<div className="pc-fill">
		{Array.from({ length: 60 }, (_, i) => (
			<div key={i} className="pc-writeline" />
		))}
	</div>
)

/**
 * Every row on a printed sheet is the same height, filled or blank.
 *
 * 4mm is what an 8pt line needs plus room for a pencil, and holding it constant
 * is what lets the alternating wash read as a ruled table rather than as stripes
 * of two different sizes.
 */
const ROW_HEIGHT = '4mm'

export type Column = {
	label: string
	/** A flex-basis, so the columns hold their alignment down the page. */
	width: string
	align?: 'left' | 'right' | 'center'
}

/**
 * A table of printed rows.
 *
 * `limit` is the number of rows the page has room for, and it is REQUIRED —
 * the sheet is four pages and a fold (constraint 1), so a list cannot flow onto
 * a fifth. What it can do, and what the old fixed-height `overflow: hidden`
 * boxes did not, is SAY what did not fit.
 *
 * ## Why the zebra is opt-in now (M17 S4)
 *
 * Every row of every list used to carry the alternating wash, and that uniform
 * treatment is most of what made the sheet read as a spreadsheet: a three-column
 * skill list 36mm wide got the same banding as a four-column weapons table twice
 * its width, so the device stopped meaning anything and just added ink.
 *
 * A wash is for tracking the eye ACROSS a wide line. `track` says a table is
 * wide enough to need that; a narrow list groups by spacing and by its heading
 * band instead, which is how the codex groups everywhere else.
 *
 * `reserve` renders the block at a minimum row count even when the data is
 * shorter, for the lists whose height must not jump between characters. It never
 * caps: more rows than reserved simply print, up to `limit`.
 */
export const Rows: React.FC<{
	columns: Column[]
	rows: React.ReactNode[][]
	limit: number
	noun: string
	/** The line is wide enough that the eye needs help crossing it. */
	track?: boolean
	/** Hold at least this many row heights, filled or not. */
	reserve?: number
}> = ({ columns, rows, limit, noun, track, reserve = 0 }) => {
	const shown = rows.slice(0, limit)
	const dropped = rows.length - shown.length
	const blanks = Math.max(0, reserve - shown.length)

	const cells = (row: React.ReactNode[]) =>
		row.map((cell, j) => (
			<span
				key={j}
				style={{
					width: columns[j].width,
					textAlign: columns[j].align ?? 'left',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}
			>
				{cell}
			</span>
		))

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				minHeight: 0,
			}}
		>
			<div className="pc-rows__head">
				{columns.map((c) => (
					<span
						key={c.label}
						className="pc-label"
						style={{ width: c.width, textAlign: c.align ?? 'left' }}
					>
						{c.label}
					</span>
				))}
			</div>
			<div className={track ? 'pc-rows pc-rows--track' : 'pc-rows'}>
				{[
					...shown,
					...Array.from({ length: blanks }, () => columns.map(() => ' ')),
				].map((row, i) => (
					<div key={i} className="pc-row" style={{ height: ROW_HEIGHT }}>
						{cells(row)}
					</div>
				))}
			</div>
			{dropped > 0 && (
				<div className="pc-overflow-note">
					+ {dropped} more {noun} — see the app
				</div>
			)}
		</div>
	)
}

/**
 * The same table, set in two tracks (owner review).
 *
 * Carried inventory is a short name and three narrow values, so a single track
 * left half the width of page two white down its entire length. Two tracks
 * double what the block holds in the same height without touching the type.
 *
 * Two `Rows` side by side rather than one grid of two columns: a grid would make
 * one set of column headings serve both tracks, paint the zebra across the grid
 * as a checkerboard rather than down each track, and read left-right-left-right
 * instead of down one column and on to the next. All three come out right for
 * free this way.
 *
 * The overflow note belongs to the BLOCK, not to a track, so the split is done
 * against the limit and the note is printed once underneath.
 */
export const SplitRows: React.FC<{
	columns: Column[]
	rows: React.ReactNode[][]
	limit: number
	noun: string
	track?: boolean
}> = ({ columns, rows, limit, noun, track }) => {
	const shown = rows.slice(0, limit)
	const dropped = rows.length - shown.length
	// The left track fills first, so an odd count leaves the gap at the bottom
	// right — where a reader expects a list to end.
	const half = Math.ceil(shown.length / 2)

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				minHeight: 0,
			}}
		>
			<div className="pc-split">
				{[shown.slice(0, half), shown.slice(half)].map((part, i) => (
					<Rows
						key={i}
						columns={columns}
						rows={part}
						// Already sliced against the block's limit, and the note is
						// printed once below rather than once per track.
						limit={part.length}
						noun={noun}
						track={track}
					/>
				))}
			</div>
			{dropped > 0 && (
				<div className="pc-overflow-note">
					+ {dropped} more {noun} — see the app
				</div>
			)}
		</div>
	)
}

/**
 * What each action mark means, printed once (owner review).
 *
 * The action marks are the one place on this sheet where a glyph is genuinely
 * the only carrier of its meaning. Everywhere else the theme's rule holds — the
 * word sits beside the mark — but an ability list has no room for six repeated
 * words, and on paper there is no hover to fall back on. So the key is printed
 * once, full width, under the two blocks that need it.
 */
export const ActionLegend: React.FC<{ types: readonly ActionType[] }> = ({
	types,
}) => (
	/* No "Actions" heading. Six marks each sitting beside their own name is
	   already a key and nothing else on the sheet looks like one, so the word was
	   labelling something self-evident (owner review). */
	<div className="pc-legend">
		{types.map((type) => (
			<span key={type} className="pc-legend__item">
				<ActionGlyph actionType={type} size={11} />
				<span className="pc-label">{type}</span>
			</span>
		))}
	</div>
)

/**
 * A block whose row count is a GAME RULE, not a page budget (M17 D2).
 *
 * Skills are the case this exists for. The old block reserved forty rows in a
 * 60mm column on a system where sixteen skills exist and one character can hold
 * twelve — a limit that exceeded what the page could even render, held for
 * entries the rules make unreachable, with the remainder ruled as write-lines.
 * Half a page of a four-page sheet spent on ruled nothing.
 *
 * So this is not a list with a limit. It is a grid of exactly `count` places,
 * every one of them a place the character has or could have. An empty place is
 * a visible empty place, which is information; a fortieth place is not.
 *
 * More entries than places would mean the game rule moved, so they print rather
 * than vanish — the grid grows and the page is honest about it.
 */
export const FixedGrid: React.FC<{
	count: number
	columns: Column[]
	rows: React.ReactNode[][]
}> = ({ count, columns, rows }) => {
	const filled = rows.slice()
	while (filled.length < count) filled.push(columns.map(() => ' '))

	return (
		<div className="pc-grid">
			<div className="pc-rows__head">
				{columns.map((c) => (
					<span
						key={c.label}
						className="pc-label"
						style={{ width: c.width, textAlign: c.align ?? 'left' }}
					>
						{c.label}
					</span>
				))}
			</div>
			{filled.map((row, i) => (
				<div key={i} className="pc-row" style={{ height: ROW_HEIGHT }}>
					{row.map((cell, j) => (
						<span
							key={j}
							style={{
								width: columns[j].width,
								textAlign: columns[j].align ?? 'left',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							}}
						>
							{cell}
						</span>
					))}
				</div>
			))}
		</div>
	)
}

/**
 * The eight worn slots, each in its own labelled place (M17 S3, F4).
 *
 * Worn equipment and backpack inventory used to be one undifferentiated list
 * with the slot spelled out in a text column — the question "what am I wearing
 * on my hands?" answered by reading a whole table instead of looking at one
 * place. `stat-sigils.ts` already maps all eight slots to drawn marks, so this
 * needed a layout and no new assets (D4).
 *
 * An empty slot prints as an empty slot. That is the panel's whole argument: a
 * missing helmet is a fact about the character, and a list cannot state it.
 *
 * ## What the owner's review added
 *
 * - **A second line per cell**, carrying the item's properties with its load and
 *   cost pushed right. The first cut printed a name and nothing else, so three
 *   numbers the row had room for sent the player back to the app.
 * - **Worn kit with NO slot assigned appears here too**, appended after the
 *   eight as extra places. It used to be swept into carried inventory and marked
 *   with a location glyph, which is the wrong answer to the right question: it is
 *   worn, so it belongs in the worn panel, and the panel grows to say so.
 */
export interface WornSlot {
	key: string
	label: string
	sigil: SigilSlot
	item?: string
	properties?: string
	load?: number
	cost?: number
}

export const SlotPanel: React.FC<{ slots: WornSlot[] }> = ({ slots }) => (
	<div className="pc-slots">
		{slots.map(({ key, label, sigil, item, properties, load, cost }) => (
			<div key={key} className="pc-slots__cell">
				<Mark name={sigil} size="3.4mm" />
				<span className="pc-slots__name">
					<span className="pc-label">{label}</span>
					<span className="pc-slots__item">{item || ' '}</span>
					{/* Always rendered, empty or not: a cell that grows a line when it
						has one puts the panel's two columns out of step. */}
					<span className="pc-slots__meta">
						<span className="pc-slots__props">{properties || ' '}</span>
						<span className="pc-slots__numbers">
							{item
								? [
										load !== undefined ? `${load} load` : '',
										cost ? `${cost}c` : '',
									]
										.filter(Boolean)
										.join('  ') || ' '
								: ' '}
						</span>
					</span>
				</span>
			</div>
		))}
	</div>
)

/**
 * A list of named things, set in two columns and marked with what they cost to
 * use (M17 S5, F5).
 *
 * Abilities printed as one narrow column of bare names: short names in a 60mm
 * column, so each line was mostly white and the block ran out of vertical room
 * long before it ran out of horizontal. Two columns at the D1 width roughly
 * triples what fits, and the `ActionMark` the creature builder already draws
 * says whether a thing is an action, a reaction or always on — one glyph of
 * width for the question most often asked of an ability mid-turn.
 *
 * Grouping is by wash band and spacing, never by a ruled cell (S4).
 */
export const MarkedList: React.FC<{
	groups: {
		name: string
		entries: { key: string; label: string; action?: ActionType }[]
	}[]
}> = ({ groups }) => (
	<div className="pc-marked">
		{groups.map((group) => (
			<div key={group.name} className="pc-marked__group">
				<div className="pc-marked__head pc-label">{group.name}</div>
				{group.entries.map((entry) => (
					<div key={entry.key} className="pc-marked__entry">
						<span className="pc-marked__mark">
							{entry.action ? (
								// 11px is 2.9mm at the 96dpi print also resolves absolute
								// units at — the register's 3mm floor for a drawn mark.
								<ActionGlyph actionType={entry.action} size={11} />
							) : null}
						</span>
						{entry.label}
					</div>
				))}
			</div>
		))}
	</div>
)
