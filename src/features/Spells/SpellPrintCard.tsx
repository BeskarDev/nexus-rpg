import { PlayingCard } from '@site/src/components/PlayingCard'
import CardDivider from '@site/src/components/codex/CardDivider'
import CardBoss from '@site/src/components/codex/CardBoss'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import {
	bodyBlocks,
	FIT_BLOCK_ATTRIBUTE,
	type FitResult,
} from '@site/src/components/autofit'
import parse from 'html-react-parser'
import React from 'react'

export interface SpellPrintCardProps {
	name: string
	focus: string
	rank: string | number
	/** The discipline, the tradition, or the sheet variant's `category` (F5). */
	category: string
	target: string
	range: string
	properties: string
	effect: string
	heightened?: string
	/** First body block on this card. 0 unless this is a continuation (D3). */
	start?: number
	/** One past the last body block, or the end of the body. */
	end?: number
	/** 1-based part number, for the `1/2` mark. */
	part?: number
	/** How many cards this spell prints as. 1 for the ordinary case. */
	totalParts?: number
	/** Reports the fit, so the tool's plan learns where to cut (D3). */
	onFitted?: (result: FitResult) => void
}

/**
 * The one printed spell card (M18 D4, F5).
 *
 * `ArcaneSpellCard`, `MysticSpellCard` and `Spells/SpellCard` were the same
 * file three times over, differing in a type import and in one field name —
 * `discipline` / `tradition` / `category` — and each carried its own copy of
 * the character-count ladder. Three copies of a fitting bug is how M18 started,
 * so they are now three adapters over this.
 *
 * The body is a list of BLOCKS rather than a string (D3). A spell that will not
 * fit at the type floor prints as two cards cut at a block boundary, and the
 * continuation carries a compact header so a card found loose on the table
 * still says what it is.
 */
export const SpellPrintCard: React.FC<SpellPrintCardProps> = ({
	name,
	focus,
	rank,
	category,
	target,
	range,
	properties,
	effect,
	heightened = '-',
	start = 0,
	end,
	part = 1,
	totalParts = 1,
	onFitted,
}) => {
	const blocks = React.useMemo(
		() => bodyBlocks(effect, heightened),
		[effect, heightened],
	)
	// `concentrate, ritual (minutes)` is a LIST of properties, and each one is a
	// separate rule the caster has to hold. Set as slabs they can be counted at a
	// glance instead of parsed out of a comma run.
	const propertyList = React.useMemo(
		() =>
			properties && properties !== '-'
				? properties
						.split(',')
						.map((property) => property.trim())
						.filter(Boolean)
				: [],
		[properties],
	)
	const shown = blocks.slice(start, end)
	const isContinuation = part > 1

	return (
		<PlayingCard
			keystone="winged"
			// Seated on the parchment in the corner rather than in the column: an
			// ornament that costs the rules text height is an ornament in the way.
			badge={
				isContinuation ? undefined : <CardBoss value={focus} label="Focus" />
			}
			// The cut is part of the content: a continuation measures its own half,
			// which is why neither half stays at the floor when it need not (D3).
			fitKey={`${name}|${start}|${end ?? ''}|${effect}|${heightened}`}
			onFitted={onFitted}
		>
			{isContinuation ? (
				<div className="pc-spell__head pc-spell__head--continued">
					{/* The same mark, in the same place, as the card this one continues
					    from: a corner plaque here and an inline mark there made two
					    halves of one spell read as two different cards (owner). */}
					<span className="pc-card__name">
						{name}
						<span className="pc-card__part">
							{' '}
							({part}/{totalParts})
						</span>
					</span>
				</div>
			) : (
				<>
					{/*
					 * THE HEAD (M18 S4, owner review).
					 *
					 * It was a centred name between two spacer boxes, with everything
					 * else run together in one grey caption — `R5 Telepathy, vs.
					 * Resist, medium range`. Four facts of different kinds in one
					 * comma list, and nothing to look at.
					 *
					 * Now it composes: every row is flush left, the focus boss is a
					 * stamp in the top-right corner outside the column, and the
					 * mechanics drop to a labelled strip that reads the way the
					 * creature card's stat rows do. A GM scanning a spread of cards
					 * finds the same fact in the same place on every one of them.
					 *
					 * The `1/2` mark rides with the NAME rather than in the corner,
					 * because the corner is the boss's now — a spilled spell would
					 * otherwise print its part mark underneath its focus cost.
					 */}
					<div className="pc-spell__head">
						<div className="pc-spell__title">
							<div className="pc-card__name">
								{name}
								{/* Inline, because the corner the tag used to sit in now
								    holds the focus boss. */}
								{totalParts > 1 && (
									<span className="pc-card__part">
										{' '}
										({part}/{totalParts})
									</span>
								)}
							</div>
							<div className="pc-spell__rank">
								<span className="pc-spell__rank-num">R{rank}</span> {category}
							</div>
						</div>
					</div>
					{/* The mechanics, as labelled cells rather than a comma list —
					    the same voice the creature card states HP and AV in. */}
					{/* Marks rather than words for the two labels the deck repeats on
					    every card: `target` and `measuring-rod` are the kit's own, and
					    at this size the label was costing more room than the value it
					    named. The reading is carried by an `srOnly` label, as
					    `DieToken` does with its numeral. */}
					<div className="pc-strip">
						<span className="pc-cell">
							<SigilIcon
								name="target"
								size="1.15em"
								className="pc-cell__mark"
							/>
							<span className="pc-cell__name">Target </span>
							{target}
						</span>
						<span className="pc-cell">
							<SigilIcon
								name="measuring-rod"
								size="1.15em"
								className="pc-cell__mark"
							/>
							<span className="pc-cell__name">Range </span>
							{range.toLowerCase()}
						</span>
					</div>
					{propertyList.length > 0 && (
						<div className="pc-slabs">
							{propertyList.map((property) => (
								<span className="pc-slab" key={property}>
									{property}
								</span>
							))}
						</div>
					)}
				</>
			)}
			<CardDivider className="pc-card__divider" />
			{shown.map((block, index) => {
				// The rule that separates the effect from its heightened clauses,
				// drawn wherever the boundary falls — including at the top of a
				// continuation card that starts inside the heightened section.
				const opensHeightened =
					block.section === 'heightened' &&
					(index === 0
						? blocks[start - 1]?.section !== 'heightened'
						: shown[index - 1].section !== 'heightened')
				return (
					<React.Fragment key={start + index}>
						{opensHeightened && <CardDivider className="pc-card__divider" />}
						{/* The unit the continuation card is cut on. The engine hides
						    trailing blocks to find where the body stops fitting, so
						    every splittable block has to be findable (D3). */}
						<div className="pc-fit" {...{ [FIT_BLOCK_ATTRIBUTE]: '' }}>
							{parse(block.html)}
						</div>
					</React.Fragment>
				)
			})}
		</PlayingCard>
	)
}
