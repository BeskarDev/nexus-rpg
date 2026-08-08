import React from 'react'
import SigilIcon from './SigilIcon'
import {
	SHEET_SIGIL,
	STAT_SIGIL,
	SheetSigilName,
	StatSigilName,
} from './stat-sigils'

const SIGIL = { ...STAT_SIGIL, ...SHEET_SIGIL }

/**
 * The mark on a stat tile — a character sheet card header, or a creature card's
 * figure row. Also carries the sheet's non-stat chrome slots (`folk`, `party`,
 * `location-mount`), which resolve through `SHEET_SIGIL` the same way (M9 S8).
 *
 * A thin wrapper over `SigilIcon`: it takes a **game** name (`parry`, `focus`)
 * and resolves it through `STAT_SIGIL` to the **depictive** name of a sigil
 * (`blades`, `orb`). That indirection is the point — call sites stay readable in
 * game terms, the marks keep names that describe their own geometry per the
 * sigil law, and reassigning a stat to a different mark is a one-line change in
 * `stat-sigils.ts` rather than an edit across 17 files.
 *
 * Replaced the old `StatGlyph`, which carried its own stroked-outline
 * construction on a 24 grid. See `stat-sigils.ts` for why that went away.
 *
 * Decorative: the stat's text label always sits beside it, so the mark is never
 * the sole carrier of meaning.
 */
export interface StatSigilProps {
	name: StatSigilName | SheetSigilName
	/**
	 * Size of the square mark. A number is pixels; a string is a CSS length, so
	 * `size="1.15em"` inherits the surrounding font-size.
	 */
	size?: number | string
	className?: string
}

export default function StatSigil({
	name,
	size = 15,
	className,
}: StatSigilProps) {
	return <SigilIcon name={SIGIL[name]} size={size} className={className} />
}
