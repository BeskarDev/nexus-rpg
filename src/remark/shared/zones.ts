/**
 * Zone gating for ambiguous single-word keywords.
 *
 * A handful of keyword links are common English words that are also mechanical
 * terms: "light"/"heavy"/"reach" (properties), "close"/"short"/"long"/"medium"
 * (ranges & durations), "tiny"/"large"/"huge" (sizes), etc. In narrative prose
 * they are almost always flavor ("a shimmer of light", "a huge temple") and
 * linking them is noise. In mechanical zones they are almost always the term.
 *
 * So these BARE words link only inside a mechanical zone. Unambiguous
 * multi-word forms ("short duration", "close range", "small size") are NOT in
 * this set and link anywhere — and since the tokenizer prefers the longest
 * match, "short duration" links as the phrase while a bare "short" in prose is
 * gated out.
 *
 * See docs/analysis/keyword-chip-detection-plan.md (Phase 4b, §5.3).
 */

import { Parent } from 'unist'
import { getTableCellContext } from './table-context'

/**
 * Bare single-word keyword terms that only link inside a mechanical zone.
 * Case-sensitive: includes both casings a term appears in (e.g. armor category
 * "Light"/"Heavy" and the lowercase property forms).
 */
export const ZONE_GATED_TERMS = new Set<string>([
	// weapon / armor properties
	'light',
	'Light',
	'heavy',
	'Heavy',
	'reach',
	'agile',
	'crush',
	'slash',
	'pierce',
	'narrowed',
	// ranges & durations (bare forms only)
	'close',
	'short',
	'medium',
	'long',
	// creature sizes (bare forms only)
	'tiny',
	'large',
	'huge',
	// condition / misc flavor collisions
	'burning',
])

/**
 * A mechanical zone is a table body cell (not a header row). This is where
 * these bare words are reliably the mechanical term — armor/size/property
 * tables and stat blocks.
 *
 * A bold-led paragraph is deliberately NOT treated as mechanical: spell and
 * ability entries are written as `**Name.** long descriptive effect...`, so
 * their whole prose body sits in a bold-led paragraph. Treating that as
 * mechanical would let flavor words ("a shimmer of light", "close by") link
 * throughout spell text. Genuinely mechanical values there are either in tables
 * or use unambiguous multi-word forms ("short duration", "close range") that
 * are not zone-gated at all.
 */
export function isMechanicalZone(
	ancestors: (Parent & { type: string })[],
): boolean {
	const cell = getTableCellContext(ancestors)
	return cell.inTableCell && !cell.isHeaderRow
}
