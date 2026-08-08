import React from 'react'
import {
	arcBandD,
	boxD,
	circleD,
	path,
} from '@site/src/components/codex/sigil-geometry'

/**
 * The "there is a rule behind this" affordance: a query carved out of a struck
 * bronze disc.
 *
 * ## Why this is NOT a sigil (M13 S1)
 *
 * It deliberately sits outside `sigil-paths.ts` and outside `sigils:check`.
 * Every mark in that set **depicts an object** — a stat, a resource, a place —
 * and the design law is written for exactly that: the determinative logic of a
 * sign list, where a reader identifies a thing and carries its meaning. This
 * mark names an *interaction*, which no sign list has a depiction for.
 *
 * The slot previously held `stylus`, and the whole failure mode was trying to
 * make the sign list cover UI chrome. A stylus depicts the act of WRITING, and
 * M9 S6 made every card body its own editor — so a writing tool in the corner of
 * an editable card read as "edit this", which is the one thing this affordance
 * does not do. A drawn oil lamp was tried next and failed worse: "lamp" → "light"
 * → "illumination" → "explanation" is three inferences deep, and at the corner
 * size it read as a boat.
 *
 * So this breaks the codex style on purpose, and the tool wins, per the M13
 * governing constraint. But it breaks it in ONE axis only. The `?` is the
 * universal, pre-learned glyph for "there is more to know here" — that is the
 * part that has to be instant. Everything else stays in the codex's material
 * language: a solid disc of `currentColor` mass with the query as a real carved
 * void, no stroke and no rounded corners, so it reads as a stamped bronze token
 * next to the sigils rather than as an icon from another pack. That is the same
 * failure M9 S4 killed `StatGlyph` over, and a hairline `InfoOutlined` would
 * have walked straight back into it.
 *
 * ## Sizing
 *
 * `size` defaults to 13, not the 10 the stylus rendered at. A void has to survive
 * the raster, and 10px was measured (on the sigil rasteriser) to mush the query
 * into a grey blob — the hook and the stem merge. 13px resolves it. That is why
 * the disc is the outer form: a bare `?` reads at 10px, but it reads as *text*
 * rather than as a control, and it gives hover nothing to land on.
 */

/** Hook centre. Above the box centre, since the stem and point hang below it. */
const HOOK_CY = 11
/** Outer and inner radius of the hook band. */
const HOOK_OUTER = 7.5
const HOOK_INNER = 3
/** Width of the neck and the point. */
const STEM = 5
/** Where the point starts, leaving a real gap under the neck. */
const POINT_TOP = 22

/**
 * The query, as the shape to be REMOVED from the disc.
 *
 * The hook is 270 degrees of a band starting due west and sweeping clockwise —
 * y-down, so clockwise runs west → north → east → south. That leaves the
 * bottom-left quadrant open, which is what makes it a query hook rather than an
 * arch, and it lands the terminal due south of the hook centre, directly on the
 * neck, so no separate join is needed.
 */
const QUERY =
	arcBandD(16, HOOK_CY, HOOK_OUTER, HOOK_INNER, 180, 450) +
	boxD(16 - STEM / 2, HOOK_CY, 16 + STEM / 2, POINT_TOP - 3) +
	boxD(16 - STEM / 2, POINT_TOP, 16 + STEM / 2, POINT_TOP + STEM)

/** Disc minus query, as one even-odd path so the query is a true void. */
const GLOSS_INNER = path(circleD(16, 16, 15) + QUERY, true)

export interface GlossMarkProps {
	/** Pixels, or a CSS length. See the sizing note above before lowering it. */
	size?: number | string
	className?: string
}

export const GlossMark: React.FC<GlossMarkProps> = ({
	size = 13,
	className,
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 32 32"
		fill="currentColor"
		className={className}
		aria-hidden
		dangerouslySetInnerHTML={{ __html: GLOSS_INNER }}
	/>
)
