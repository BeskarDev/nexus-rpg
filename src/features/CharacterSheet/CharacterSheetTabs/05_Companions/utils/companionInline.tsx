import React from 'react'
import { DamageLadder } from '@site/src/components/codex/DamageLadder'
import { chipMappings } from '@site/src/remark/table-chips-plugin/chip-mappings'

/**
 * Renders a companion's inline markdown the way the docs' creature pages do (M13 S7, owner
 * review).
 *
 * ## Why this exists
 *
 * A creature page's stat block goes through the MDX pipeline: the generator emits
 * `<EntryName>`, `<StatBadge>` and `<DamageLadder>` explicitly, and the remark chip plugin turns
 * every skill, damage type and weapon category into a chip. A companion's block is a **string in
 * Firestore** — none of that pipeline runs on it, so `ReactMarkdown` gave plain bold text, plain
 * `6/9/12`, and no chips. The card's frame looked right and its contents did not.
 *
 * So this is the same set of transforms, applied at render time:
 *
 * - `**Bite**` at the start of an item becomes the entry NAME, in the register the docs use.
 * - `*Passive*` becomes a property badge.
 * - `6/9/12` becomes a `DamageLadder`, the same component the weapon rows and creature attacks
 *   use.
 * - Skills, damage types, weapon categories and attributes become chips, and a trailing `(2)`
 *   is pulled INSIDE the skill chip — exactly what `table-chips-plugin` does, for the reason
 *   recorded there: chipping the name and leaving the rank outside strands the one number that
 *   matters.
 *
 * ## Sharing the keyword table, not the plugin
 *
 * The keywords come from `chipMappings`, the plugin's own table, so the sheet and the docs cannot
 * disagree about what a skill is or what colour it takes. The plugin itself is a remark
 * transform over an mdast tree and cannot run in the browser against a plain string, which is
 * why this is a second implementation of the RENDERING and not of the vocabulary.
 */

/** `Fighting (2)` — the rank is absorbed into the chip, as the plugin does. */
const RANK = /^\s*\((\d+)\)/

const chipFor = (word: string, rank?: string, key?: React.Key) => {
	const chip = chipMappings[word]
	if (!chip) return null
	return (
		<span
			key={key}
			className={`chip chip--${chip.color} chip--${chip.type}`}
			data-chip-type={chip.type}
			aria-label={`${chip.type}: ${word}`}
		>
			{chip.displayText || word}
			{rank && <span className="chip__rank">{rank}</span>}
		</span>
	)
}

/**
 * Splits on the tokens we transform, keeping the delimiters.
 *
 * The parenthesised group is here because a builder attack reads
 * `**Slam** (agile, crush). On a strong hit…` — the qualifier in brackets is what a creature
 * page renders as a property badge, brackets DROPPED. Leaving them printed the badge inside
 * literal parentheses, which is how the owner spotted it. `[^()]*(?:\([^()]*\)[^()]*)*` so a
 * nested pair survives: `(thrown (medium))` is one qualifier, not two.
 */
const TOKENS =
	/(\*\*[^*]+\*\*|\*[^*]+\*|\([^()]*(?:\([^()]*\)[^()]*)*\)|\b\d+\/\d+\/\d+\b|[A-Za-z][\w-]*)/g

export const renderCompanionInline = (text: string): React.ReactNode[] => {
	const parts = text.split(TOKENS).filter((part) => part !== '')
	const out: React.ReactNode[] = []
	let boldSeen = false

	parts.forEach((part, index) => {
		// `**Name**` — the first one is the entry's name, any later one is emphasis.
		const bold = part.match(/^\*\*([^*]+)\*\*$/)
		if (bold) {
			const value = bold[1].trim()
			if (!boldSeen) {
				boldSeen = true
				out.push(
					<span key={index} className="cs-entry-name">
						{value}
					</span>,
				)
			} else {
				out.push(<strong key={index}>{value}</strong>)
			}
			return
		}

		// `*Passive*` — a property badge, as `StatBadge` is on a creature page.
		const italic = part.match(/^\*([^*]+)\*$/)
		if (italic) {
			out.push(
				<span key={index} className="cs-entry-badge">
					{italic[1].trim()}
				</span>,
			)
			return
		}

		/**
		 * `(agile, crush)` — a badge, and the brackets go.
		 *
		 * Only the group that follows the entry NAME: a later parenthetical is prose (the
		 * builder writes `damage (2 base + 1 weapon)`), and badging that would turn an
		 * arithmetic aside into a property.
		 */
		const bracketed = part.match(/^\(([\s\S]*?)\)$/)
		if (bracketed && boldSeen && out.length <= 2) {
			out.push(
				<span key={index} className="cs-entry-badge">
					{bracketed[1].trim()}
				</span>,
			)
			return
		}

		// `6/9/12` — the ladder, so a companion's attack reads like every other attack.
		if (/^\d+\/\d+\/\d+$/.test(part)) {
			out.push(<DamageLadder key={index} values={part} />)
			return
		}

		/**
		 * A keyword, possibly followed by its rank.
		 *
		 * The look-ahead SKIPS whitespace runs. Once brackets became their own token,
		 * `Athletics (2)` split as `['Athletics', ' ', '(2)']`, so the immediate next part was
		 * a space and the rank was dropped — the split changed and the look-ahead did not.
		 */
		let rankAt = index + 1
		while (typeof parts[rankAt] === 'string' && parts[rankAt].trim() === '')
			rankAt++
		const next = parts[rankAt]
		const rankMatch = typeof next === 'string' ? next.match(RANK) : null
		const chip = chipFor(part, rankMatch?.[1], index)
		if (chip) {
			out.push(chip)
			// The rank was consumed into the chip; drop it, and the space that led to it, from
			// what still has to be rendered.
			if (rankMatch) {
				for (let i = index + 1; i < rankAt; i++) parts[i] = ''
				parts[rankAt] = next.replace(RANK, '')
			}
			return
		}

		out.push(part)
	})

	return out
}
