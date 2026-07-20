/**
 * Shared tokenizer and longest-match iteration for the auto-keyword and
 * table-chips remark plugins.
 *
 * Both plugins split a text node into words + delimiters, scan left-to-right
 * for the longest registered phrase starting at each word, and rebuild the
 * node's children. That scanning logic was previously duplicated byte-for-byte
 * in each plugin. It lives here now, driven by two callbacks so each plugin
 * keeps building its own node types (links vs. chips) and its own opt-out
 * handling with no behavior change.
 */

/** Splits text into words and the delimiters between them, preserving both. */
const SPLIT_REGEX = /(\s+|[.,!?;:"'(){}[\]/\\+*])/

/**
 * A single-character token that is whitespace or punctuation and should be
 * emitted verbatim. Includes '-' so hyphens between words pass through.
 */
const DELIMITER_TOKEN_REGEX = /^[.,!?;:"'(){}[\]/\\+*-]$/

/**
 * A delimiter allowed to appear *inside* a multi-word phrase key (e.g. the
 * '/' in "melee/close"). Note this intentionally omits '-' so hyphenated
 * keys like "re-roll" and "two-handed" are matched via the split segments,
 * matching the original plugin behavior exactly.
 */
const PHRASE_DELIMITER_REGEX = /^[.,!?;:"'(){}[\]/\\+*]$/

/** Any generic node the plugins push into a parent's children array. */
export type InlineNode = { type: string; value?: string; [key: string]: any }

/** Splits a text node value into alternating word / delimiter segments. */
export function tokenize(value: string): string[] {
	return value.split(SPLIT_REGEX)
}

/**
 * True when the token at `index` should be emitted as-is (whitespace at odd
 * indices, or a standalone punctuation/hyphen token).
 */
export function isDelimiterToken(token: string, index: number): boolean {
	return index % 2 === 1 || DELIMITER_TOKEN_REGEX.test(token)
}

/**
 * From position `start`, finds the longest phrase in `keyMap` built from the
 * word segments (and phrase-internal delimiters). Returns the matched key and
 * how many `tokens` segments it spans, or a null match.
 */
export function findLongestMatch(
	tokens: string[],
	start: number,
	keyMap: Map<string, unknown>,
): { match: string | null; matchLength: number } {
	let match: string | null = null
	let matchLength = 0

	for (let j = start; j < tokens.length; j += 2) {
		const phrase = tokens
			.slice(start, j + 1)
			.filter(
				(_, idx) => idx % 2 === 0 || PHRASE_DELIMITER_REGEX.test(tokens[idx]),
			)
			.join(' ')

		if (keyMap.has(phrase)) {
			// Always prioritize the longest match.
			match = phrase
			matchLength = j - start + 1
		}
	}

	return { match, matchLength }
}

/**
 * Text surrounding a match within the same text node, for context heuristics
 * (e.g. "is there a damage number nearby?"). `precedingText` is everything
 * before the match in this node; `followingText` is everything after it.
 */
export interface MatchContext {
	precedingText: string
	followingText: string
}

/**
 * Callbacks that decide what nodes a matched keyword or plain word becomes.
 *
 * - `onKeyword` is called for every longest-match hit, with the surrounding
 *   text context. Return the replacement node(s) to emit a real conversion
 *   (advances past the whole phrase), or null to decline (the first word is
 *   treated as plain text and the rest is re-scanned) — declining is how the
 *   context heuristics (zone gating, damage context, first-occurrence) skip a
 *   match without converting it.
 * - `onText` turns a single non-matched (or declined) word into node(s).
 */
export interface ProcessHandlers {
	onKeyword: (keyword: string, context: MatchContext) => InlineNode[] | null
	onText: (word: string) => InlineNode[]
}

/**
 * Runs the shared tokenize + longest-match + rebuild loop over a text value.
 * Returns the rebuilt child nodes and whether any real conversion happened
 * (i.e. `onKeyword` returned nodes at least once). When `changed` is false the
 * caller should leave the original node untouched, exactly as before.
 */
export function processText(
	value: string,
	keyMap: Map<string, unknown>,
	handlers: ProcessHandlers,
): { nodes: InlineNode[]; changed: boolean } {
	const tokens = tokenize(value)
	const nodes: InlineNode[] = []
	let changed = false
	let i = 0

	while (i < tokens.length) {
		const current = tokens[i]

		if (isDelimiterToken(current, i)) {
			nodes.push({ type: 'text', value: current, processed: true })
			i++
			continue
		}

		const { match, matchLength } = findLongestMatch(tokens, i, keyMap)

		if (match) {
			const context: MatchContext = {
				precedingText: tokens.slice(0, i).join(''),
				followingText: tokens.slice(i + matchLength).join(''),
			}
			const replacement = handlers.onKeyword(match, context)
			if (replacement) {
				nodes.push(...replacement)
				changed = true
				i += matchLength
				continue
			}
			// Declined by a heuristic: treat the first word as plain text and
			// re-scan the remainder, advancing only one segment.
			nodes.push(...handlers.onText(current))
			i++
			continue
		}

		nodes.push(...handlers.onText(current))
		i++
	}

	return { nodes, changed }
}
