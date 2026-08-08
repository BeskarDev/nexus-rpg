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

/**
 * One stat-block entry, which may carry a numbered list of sub-options
 * (M13 S8, owner review).
 *
 * Most entries are a single line and render exactly as before. A few — the
 * Floating Eye's *Eye Rays* is the only one in the current data — offer several
 * outcomes, and the source marks them with `<br/>` plus `<strong>1. Name.</strong>`.
 * Both the builder and the sheet used to flatten that into one paragraph, so the
 * options ran together mid-sentence: `…apply the effects:1. Dazing Ray. Compare…`.
 *
 * The break survives the pipeline now (see `convertHtmlToMarkdown`), so an entry
 * arrives as a lead line followed by its options, and this renders them as the
 * ordered list they always were. Each option's own bold lead is a `<strong>` rather
 * than an entry NAME — the entry is the thing above them, and giving four options
 * the same register as their parent would flatten the hierarchy again.
 */
export const renderCompanionEntry = (text: string): React.ReactNode => {
	const [lead, ...options] = text.split('\n')
	if (options.length === 0) return renderCompanionInline(text)
	return (
		<>
			{renderCompanionInline(lead)}
			<ol className="cs-entry-options">
				{options.map((option, index) => (
					<li key={index}>
						{renderCompanionInline(
							// The source numbers its own options (`**1. Dazing Ray.**`) and the
							// list numbers them too, so the leading numeral is dropped here —
							// otherwise every option reads "1. 1. Dazing Ray."
							option.replace(/^\*\*\s*\d+[.)]\s*/, '**'),
							{ entryName: false },
						)}
					</li>
				))}
			</ol>
		</>
	)
}

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

/** Unwrap paired markdown emphasis. `*crush*` is the badge's text, not its markup. */
const unemphasise = (text: string): string =>
	text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1')

/**
 * Split a property list on its TOP-LEVEL commas only.
 *
 * `range (close, medium)` is one property whose own parenthetical contains a
 * comma; splitting naively would tear it in half. Mirrors `renderBadges` in
 * `generate-creatures.ts`, which is the behaviour being matched.
 */
const splitProperties = (text: string): string[] => {
	const out: string[] = []
	let depth = 0
	let current = ''
	for (const char of text) {
		if (char === '(') depth += 1
		else if (char === ')') depth -= 1
		if (char === ',' && depth === 0) {
			out.push(current)
			current = ''
		} else {
			current += char
		}
	}
	out.push(current)
	return out.map((entry) => entry.trim()).filter(Boolean)
}

export const renderCompanionInline = (
	text: string,
	/**
	 * Whether the first bold run is this entry's NAME.
	 *
	 * False for a sub-option inside an entry: the entry is the thing above them, and
	 * giving four options the same small-caps bronze register as their parent would
	 * flatten the hierarchy the list exists to show. Their lead stays a `<strong>`.
	 */
	{ entryName = true }: { entryName?: boolean } = {},
): React.ReactNode[] => {
	const parts = text.split(TOKENS).filter((part) => part !== '')
	const out: React.ReactNode[] = []
	let boldSeen = !entryName
	/**
	 * Set when a property group has just been badged, so the sentence-ending period
	 * that followed its closing bracket can be dropped.
	 *
	 * A creature page emits `<EntryName>Bite</EntryName> <StatBadge>pierce</StatBadge>
	 * <DamageLadder …/>` with no punctuation between; the builder's source text is a
	 * sentence — `**Bite** (*pierce*). 9/13/17 damage` — so without this the badge is
	 * followed by a stranded " . ".
	 */
	let periodAfterBadges = false

	parts.forEach((part, index) => {
		// `**Name**` — the first one is the entry's name, any later one is emphasis.
		const bold = part.match(/^\*\*([^*]+)\*\*$/)
		if (bold) {
			const value = bold[1].trim()
			if (!boldSeen) {
				boldSeen = true
				out.push(
					<span key={index} className="cs-entry-name">
						{/*
							The trailing period goes (M13 S8, owner review).

							The source writes an entry name as a sentence opener —
							`<strong>Darkvision (medium/long). </strong>` — and **none of the 811
							`<EntryName>`s on the creature pages ends in a period**. The name is a
							label, and the register it is set in already separates it from the
							prose that follows.

							A parenthetical INSIDE the name is kept, deliberately: creature pages do
							the same (`<EntryName>Blindsense (Close)</EntryName>`). Only an
							attack's properties become badges, and those the source puts outside
							the bold in `<em>` — the data draws that distinction itself.
						*/}
						{value.replace(/\.$/, '')}
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
		 * `(agile, crush)` — badges, and the brackets go.
		 *
		 * Only the group that follows the entry NAME: a later parenthetical is prose (the
		 * builder writes `damage (2 base + 1 weapon)`), and badging that would turn an
		 * arithmetic aside into a property.
		 *
		 * **One badge PER property, and the markdown stripped** (M13 S8, owner review).
		 * Both were wrong before, and both are visible against a creature page rendering
		 * the same attack:
		 *
		 * - The builder's source is `(<em>agile, pierce</em>)`, which
		 *   `convertHtmlToMarkdown` turns into `(*agile, pierce*)`. This branch matched the
		 *   whole bracket first, so the emphasis markers never reached the `*…*` branch
		 *   above and the badge printed the literal text `*agile, pierce*`.
		 * - A creature page emits one `<StatBadge>` per property (`renderBadges` in
		 *   `generate-creatures.ts`, split on comma). One badge holding the whole list is
		 *   a different shape for the same information.
		 */
		const bracketed = part.match(/^\(([\s\S]*?)\)$/)
		if (bracketed && boldSeen && out.length <= 2) {
			const properties = splitProperties(unemphasise(bracketed[1]))
			properties.forEach((property, propertyIndex) =>
				out.push(
					<span key={`${index}-${propertyIndex}`} className="cs-entry-badge">
						{property}
					</span>,
				),
			)
			periodAfterBadges = properties.length > 0
			return
		}

		/**
		 * `6/9/12` — the ladder, so a companion's attack reads like every other attack.
		 *
		 * The damage TYPE is folded in as the ladder's children and the literal word
		 * "damage" is dropped, which is what `generate-creatures.ts` does and why: the
		 * ladder's own W/S/C ticks already say these are damage figures, so the word is
		 * a second statement of it. Without this the row read
		 * `8ʷ/11ˢ/14ᶜ damage (5 base + 3 weapon)` against a creature page's
		 * `8ʷ/11ˢ/14ᶜ poison` — the same fact in two shapes.
		 *
		 * The arithmetic that follows (`(5 base + 3 weapon)`) is KEPT: it is the
		 * builder showing its working, which a published creature page has no reason
		 * to carry.
		 */
		if (/^\d+\/\d+\/\d+$/.test(part)) {
			// Look ahead past whitespace for `[type] damage`, e.g. `lightning damage`.
			let at = index + 1
			while (typeof parts[at] === 'string' && parts[at].trim() === '') at += 1
			let type: string | undefined
			if (typeof parts[at] === 'string' && parts[at] !== 'damage') {
				let after = at + 1
				while (typeof parts[after] === 'string' && parts[after].trim() === '')
					after += 1
				if (parts[after] === 'damage') {
					type = parts[at]
					for (let i = index + 1; i <= after; i++) parts[i] = ''
				}
			} else if (parts[at] === 'damage') {
				for (let i = index + 1; i <= at; i++) parts[i] = ''
			}
			out.push(
				<DamageLadder key={index} values={part}>
					{type ? chipFor(type, undefined, `${index}-type`) || type : undefined}
				</DamageLadder>,
			)
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

		// The badge group's trailing sentence period, dropped so the badge is followed by
		// the damage rather than by a stranded " . ".
		if (periodAfterBadges) {
			periodAfterBadges = false
			const trimmed = part.replace(/^(\s*)\.\s*/, '$1')
			if (trimmed.trim() === '') {
				out.push(' ')
				return
			}
			out.push(trimmed)
			return
		}

		out.push(part)
	})

	return out
}
