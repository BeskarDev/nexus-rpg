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
 * See docs/analysis/_archive_/keyword-chip-detection-plan.md (Phase 4b, §5.3).
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

/**
 * A row-label cell: the FIRST body column of a table.
 *
 * By table convention the first column is the key the row is about — the
 * property being defined, the action being described, the success level being
 * ruled on. Linking it points the reader at the definition of the thing they
 * are already reading the definition of, so every properties table linked its
 * own rows back to itself ("reach", "crush", "two-handed" in
 * 04-equipment/05-armor-weapon-properties.md), and every SL table linked
 * "Weak"/"Strong"/"Critical" to the success-level page from inside the
 * success-level rules.
 *
 * Suppressing the whole first column rather than a list of header names was
 * measured against the docs tree: of 113 keyword links that landed in a first
 * body column, all were this self-referential shape. It also improves the
 * first-occurrence-per-page budget — a term whose first hit was a row label now
 * spends its one link on the prose occurrence instead.
 */
export function isRowLabelCell(
	ancestors: (Parent & { type: string })[],
): boolean {
	const cell = getTableCellContext(ancestors)
	return cell.inTableCell && !cell.isHeaderRow && cell.columnIndex === 0
}

/**
 * A name cell: a body cell under a header that names entries rather than
 * describing them ("Name", "Title", "Item Name", ...).
 *
 * The first-column rule above misses these whenever the table leads with an
 * index column, which the catalogs all do (`| d100 | Name | Quality | ... |`) —
 * 69 tables in the docs tree put Name at column 1 or later. An entry's own name
 * is never a reference to a keyword, even when it happens to contain one.
 */
export function isNameColumnCell(
	ancestors: (Parent & { type: string })[],
): boolean {
	const cell = getTableCellContext(ancestors)
	if (!cell.inTableCell || cell.isHeaderRow) return false
	const header = cell.columnHeader.toLowerCase().replace(/[*_`]/g, '').trim()
	return header === 'name' || header === 'title' || header.endsWith(' name')
}

/**
 * JSX elements whose text is a NAME, not rules prose, and must never be
 * converted by the keyword or chip plugins.
 *
 * Both plugins already skip `strong`, which used to cover this: stat-block entry
 * names were emitted as `**Undead Nature**`. The creature card renders them as
 * `<EntryName>` instead, to hold the name in its own typographic register — and
 * that silently dropped them out of the guard, so "Undead Nature" started
 * chipping "Nature" as a skill. Keeping the list here means both plugins share
 * one definition and a future name container only has to be added once.
 */
export const NAME_ELEMENTS = new Set(['EntryName'])

/** True when any ancestor is a JSX element that holds a name rather than prose. */
export function inNameElement(
	ancestors: { type?: string; name?: string }[],
): boolean {
	return ancestors.some(
		(ancestor) =>
			ancestor.type?.startsWith('mdxJsx') &&
			typeof ancestor.name === 'string' &&
			NAME_ELEMENTS.has(ancestor.name),
	)
}

/**
 * JSX elements that render an `<a>` around their own children.
 *
 * The keyword plugin already refuses to link inside a markdown `link` node,
 * because a nested anchor is invalid HTML. It could not see THESE: the anchor
 * is created by the React component at render time, long after remark has run.
 * `ToolEntry` wraps its blurb in the row's link, so every keyword in a GM-tools
 * contents blurb became an `<a>` inside an `<a>` and the build's HTML minifier
 * reported it on every entry.
 *
 * A contents row should navigate to its own target anyway, not offer a second
 * destination inside its description.
 */
export const LINK_ELEMENTS = new Set(['ToolEntry'])

/** True when any ancestor is a JSX element that renders its own anchor. */
export function inLinkElement(
	ancestors: { type?: string; name?: string }[],
): boolean {
	return ancestors.some(
		(ancestor) =>
			ancestor.type?.startsWith('mdxJsx') &&
			typeof ancestor.name === 'string' &&
			LINK_ELEMENTS.has(ancestor.name),
	)
}
