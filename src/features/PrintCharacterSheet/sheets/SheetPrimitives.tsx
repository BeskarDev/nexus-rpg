import React from 'react'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import type { SigilName } from '@site/src/components/codex/sigil-paths'
import { SHEET_SIGIL, STAT_SIGIL } from '@site/src/components/codex/stat-sigils'
import type {
	SheetSigilName,
	StatSigilName,
} from '@site/src/components/codex/stat-sigils'

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

const Mark: React.FC<{ name: SigilSlot; size: string }> = ({ name, size }) => (
	<SigilIcon name={SLOT[name] ?? (name as SigilName)} size={size} />
)

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
}) =>
	sigil ? (
		<span className="pc-label pc-mark-label">
			<Mark name={sigil} size="1.6em" />
			{label}
		</span>
	) : (
		<span className="pc-label">{label}</span>
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
	/** A value the player changes during play, so the box invites a pencil. */
	write?: boolean
	width?: string
	grow?: boolean
	sigil?: SigilSlot
}> = ({ label, value, write, width, grow, sigil }) => (
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
		<span className={write ? 'pc-slot pc-slot--write' : 'pc-slot'}>
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
	/** A pool the player writes into all session (HP, focus, fatigue). */
	write?: boolean
	width?: string
	/** A footnote under the value: the wound box, a maximum. */
	note?: string
	sigil?: SigilSlot
	/** The value draws its own container (an attribute die), so the cell does not. */
	bare?: boolean
}> = ({ label, value, write, width = '15mm', note, sigil, bare }) => (
	<div
		style={{ display: 'flex', flexDirection: 'column', gap: '0.3mm', width }}
	>
		<MarkLabel label={label} sigil={sigil} />
		<span
			className={`pc-stat${write ? ' pc-stat--write' : ''}${bare ? ' pc-stat--die' : ''}`}
		>
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
 * Data rows keep their honest `limit` and their overflow note, because clipping
 * those would lose something. The distinction is the whole design.
 */
export const AbilityWriteLines: React.FC = () => <WriteLines />

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
 */
export const Rows: React.FC<{
	columns: Column[]
	rows: React.ReactNode[][]
	limit: number
	noun: string
	/**
	 * Rule the rest of the block for writing in.
	 *
	 * A printed sheet is not a report — things are acquired, spent and crossed out
	 * during play, and a table that stops at the last printed row leaves the player
	 * writing into blank paper with no columns to write in. It is also what stops
	 * a typical character printing 70% white.
	 */
	fill?: boolean
}> = ({ columns, rows, limit, noun, fill }) => {
	const shown = rows.slice(0, limit)
	const dropped = rows.length - shown.length

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				minHeight: 0,
			}}
		>
			<div style={{ display: 'flex', gap: '1mm', padding: '0.3mm 1mm' }}>
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
			{shown.map((row, i) => (
				<div
					key={i}
					className="pc-row"
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '1mm',
						height: ROW_HEIGHT,
						padding: '0 1mm',
						fontSize: 'var(--pc-text-dense)',
						lineHeight: 'var(--pc-leading-dense)',
					}}
				>
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
			{dropped > 0 && (
				<div className="pc-overflow-note">
					+ {dropped} more {noun} — see the app
				</div>
			)}
			{fill && dropped === 0 && <WriteLines />}
		</div>
	)
}
