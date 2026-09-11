/**
 * Split a player's own writing into the units a panel may cut between (M19).
 *
 * `splitHtmlBlocks` serves the card decks, whose bodies come from the content
 * JSON and separate their blocks with `<br/>` alone. A character sheet's prose
 * comes from a rich-text field and a paste buffer instead: paragraphs, list
 * items, hard breaks, and plain text with nothing but newlines in it. That
 * splitter is left alone rather than widened, because the cards' cut points are
 * settled and this is not their problem.
 *
 * Everything else is preserved as written. The blocks are re-parsed
 * independently, so each one has to close what it opens — which is why the split
 * is on block-level boundaries and never inside a tag.
 */
const BLOCK_BOUNDARY = /<\/p>|<\/li>|<\/div>|<br\s*\/?>|\n{2,}/gi

export function splitProseBlocks(source: string): string[] {
	if (!source) return []
	return source
		.split(BLOCK_BOUNDARY)
		.map((block) => block.trim())
		// A boundary leaves the opening tag on the front of its block; a block that
		// is nothing BUT markup carried no words and is dropped with the empties.
		.filter((block) => block.length > 0 && block !== '-')
		.filter((block) => block.replace(/<[^>]*>/g, '').trim().length > 0)
}
