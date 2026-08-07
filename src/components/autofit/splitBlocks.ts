/**
 * The card body as a list of blocks (M18 D3).
 *
 * A continuation card splits at a **block boundary** — a paragraph, a `<br/>`,
 * a list — and never mid-sentence. `effect` is an HTML string in the JSON, and
 * the blocks in it are separated by `<br/>`; a `<ul>` is one block, because a
 * list broken across two cards reads as two lists.
 *
 * The split is on the string rather than on `html-react-parser`'s nodes, and
 * deliberately so: each half is parsed independently, so each card gets
 * well-formed markup instead of a node list cut in half.
 */

/** A `<br/>` in any of the forms the content and the parser produce. */
const BREAK = /<br\s*\/?>/gi

/**
 * Split a body's HTML into blocks, in order.
 *
 * Empty blocks are dropped: the content carries `<br/><br/>` in places, which
 * the cards used to collapse by hand before measuring the uncollapsed string
 * (M18 F1).
 */
export function splitHtmlBlocks(html: string): string[] {
	if (!html) return []
	return html
		.split(BREAK)
		.map((block) => block.trim())
		.filter((block) => block.length > 0 && block !== '-')
}

/** A body block and which of the card's sections it belongs to. */
export interface BodyBlock {
	html: string
	/**
	 * The section heading this block sits under. A continuation card that starts
	 * mid-section redraws the rule above it, so a reader never meets a rank
	 * clause with no idea what it modifies.
	 */
	section: 'effect' | 'heightened'
}

/**
 * The body of a spell-shaped card: its effect, then its heightened clauses.
 *
 * Each heightened clause is its own block and carries its own `(Rank n)` label,
 * so splitting between two of them cannot orphan a heading from its text — the
 * rule D3 states, satisfied by the shape of the content rather than by a check.
 */
export function bodyBlocks(effect: string, heightened?: string): BodyBlock[] {
	const blocks: BodyBlock[] = splitHtmlBlocks(effect).map((html) => ({
		html,
		section: 'effect' as const,
	}))
	if (heightened && heightened !== '-') {
		splitHtmlBlocks(heightened).forEach((html) =>
			blocks.push({ html, section: 'heightened' }),
		)
	}
	return blocks
}
