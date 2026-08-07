import CardTag from '@site/src/components/codex/CardTag'
import { type FitResult } from '@site/src/components/autofit'
import React from 'react'
import { AbilityCardShell } from './AbilityPrintCard'
import { abilityBody, bodyChunks } from './abilityBody'
import { rankSpan } from './abilitySources'

export interface TalentPrintCardProps {
	name: string
	/**
	 * The ladder to print, ALREADY trimmed to the ranks being shown (D5). The
	 * card draws what it is given; which rungs those are is the tool's decision,
	 * because only the tool knows whether the full-ladder toggle is on.
	 */
	description: string
	/** The talent's `skill requirement`, or the sheet's owning skill. */
	skill?: string
	start?: number
	end?: number
	part?: number
	totalParts?: number
	onFitted?: (result: FitResult) => void
}

/**
 * One talent, one card (M20 D1, D2).
 *
 * A talent's description is a SPELL-SIZED body — median 675 characters against
 * the arcane deck's 639, max 1970 against its 1947 — so one talent per card
 * with the existing autofit is the right unit, and the M18 spill machinery
 * covers the tail exactly as it covers a long spell.
 *
 * **The ladder splits at rank boundaries for free.** `splitHtmlBlocks` cuts on
 * `<br/>`, and the corpus separates every rank section with
 * `<br/><br/><strong>(Rank N)</strong>` — so the blocks come out as *preamble,
 * rank 1, rank 2, …* with each rung carrying its own label inside the block.
 * That is structurally identical to the property that made spell heightened
 * clauses safe to cut (M18 D3): a rung can never be orphaned from its heading,
 * because the heading is inside it. No new splitter was needed.
 *
 * The keystone is the stepped ziggurat — `TalentCard` on screen already carries
 * it, so the printed card inherits its own family mark at zero cost (D3).
 */
export const TalentPrintCard: React.FC<TalentPrintCardProps> = ({
	name,
	description,
	skill,
	start,
	end,
	part,
	totalParts,
	onFitted,
}) => {
	// `bodyChunks` rather than `splitHtmlBlocks` directly: the catalogue's ladder
	// is HTML and splits on `<br/>` as before, but a sheet-edited talent can come
	// back as plain text, and it should still cut at its own boundaries.
	const blocks = React.useMemo(
		() => bodyChunks(description).map((chunk) => abilityBody(chunk)),
		[description],
	)
	// What is actually ON this card, not what the talent could grow into: a card
	// printed for play should not claim ranks the reader cannot find on it.
	const span = React.useMemo(() => rankSpan(description), [description])

	return (
		<AbilityCardShell
			name={name}
			keystone="ziggurat"
			tag={skill ? <CardTag>{skill}</CardTag> : undefined}
			meta={span || undefined}
			blocks={blocks}
			contentKey={description}
			start={start}
			end={end}
			part={part}
			totalParts={totalParts}
			onFitted={onFitted}
		/>
	)
}
