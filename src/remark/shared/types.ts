/**
 * Unified registry entry shape for game-term detection.
 *
 * Phase 1 introduces this type as the common target for both the auto-keyword
 * links and the table-chips styling. The heuristic fields (context, proper-name
 * suppression, column policy, first-occurrence) are declared here but are NOT
 * yet consumed — later phases wire them into the plugins. Keeping them optional
 * means the existing `keywords` and `chipMappings` data can migrate onto this
 * shape incrementally without any behavior change.
 *
 * See docs/analysis/keyword-chip-detection-plan.md for the phased rollout.
 */

/** Whether a term renders as a navigable link or a styled mechanical chip. */
export type TermKind = 'link' | 'chip'

/**
 * Context predicate a term may require before it converts (Phase 3+).
 * - 'damage-number': a number, dice notation, or the word "damage" nearby.
 */
export type ContextPredicate = 'damage-number'

export interface RegistryEntry {
	/** The literal term (or multi-word phrase) to match in text. */
	term: string
	/** Link vs. chip. */
	kind: TermKind

	// --- link fields (kind === 'link') ---
	/** Destination for a link term. */
	url?: string

	// --- chip fields (kind === 'chip') ---
	/** CSS color token for a chip term. */
	color?: string
	/** Semantic category for a chip term (damage, skill, weapon, attribute). */
	type?: string
	/** Overrides the displayed text (e.g. "Strength" shown as "STR"). */
	displayText?: string

	// --- heuristic fields (declared now, consumed in later phases) ---
	/** Match only when this token exactly matches the source casing. */
	caseSensitive?: boolean
	/** Require this context predicate to be satisfied before converting. */
	requireContext?: ContextPredicate
	/** Suppress conversion inside a Title-Case proper name / bold ability line. */
	suppressInProperName?: boolean
	/** Per-column policy keyed by table header text. */
	columns?: Record<string, TermKind | 'skip'>
	/** Convert only the first occurrence per page. */
	firstOnlyPerPage?: boolean
}
