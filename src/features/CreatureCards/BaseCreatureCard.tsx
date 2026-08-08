import React from 'react'
import { PlayingCard } from '@site/src/components/PlayingCard'
import CardTag from '@site/src/components/codex/CardTag'
import type { FitResult } from '@site/src/components/autofit'
import type { Creature } from '@site/src/types/Creature'
import { CreatureStatPanel } from './CreatureStatPanel'

interface BaseCreatureCardProps {
	creature: Creature
	/** 1-based part number, for the `1/2` mark on a spilled creature (D3). */
	part?: number
	totalParts?: number
	/** The autofit's content key (M18 D2, trap 9) — see `PlayingCard`. */
	fitKey?: string
	onFitted?: (result: FitResult) => void
	children: React.ReactNode
}

/**
 * The creature card's shell — and the FIRST family to use `PlayingCard`'s
 * `header` slot (M21 D4).
 *
 * The slot has existed unused since M18 S4. It exists so the head sits OUTSIDE
 * the measured region, and the shell's own doc says why: measuring the whole
 * card *"would conflate 'the title wrapped onto a second line' with 'the rules
 * text is long' and shrink the wrong one"* — which is exactly what a nine-stat
 * panel inside the measured box was doing.
 *
 * **The head is three tiers, and only the NAME repeats** (owner, Q4). D4 first
 * had the stat panel repeating on every card, on the argument that a
 * continuation carrying abilities against no defenses is unusable. The owner
 * ruled the other way and the reason outranks it: repeated furniture costs space
 * on every card it appears on, and the creatures that spill are exactly the
 * Lords and high-tier monsters that would then run to a massive number of cards.
 * The goal is the FEWEST cards that cut no content and stay above the reading
 * floor (D8).
 *
 * So a continuation's head is one name line, which leaves most of the card free
 * for body — that is what makes continuations rarer, and making them rarer is
 * the mitigation for the trade-off, not reprinting the panel.
 */
export const BaseCreatureCard: React.FC<BaseCreatureCardProps> = ({
	creature,
	part = 1,
	totalParts = 1,
	fitKey,
	onFitted,
	children,
}) => {
	const isContinuation = part > 1

	return (
		<PlayingCard
			keystone="bull"
			fitKey={fitKey}
			onFitted={onFitted}
			header={
				<>
					<div className="pc-card__head-row">
						<span className="pc-card__name">
							{creature.name}
							{totalParts > 1 && (
								<span className="pc-card__part">
									{' '}
									({part}/{totalParts})
								</span>
							)}
						</span>
						{/* Tier and category are one fact — "a tier 2 Elite" — so they
						    ride in one tag rather than as a number and a mark that have
						    to be read together. Same reading as the screen's tier chip. */}
						{/* `T{n}` in small caps set the numeral as a small cap too, so
						    "T0 Basic" read as the WORD "To Basic" (owner, 2026-08-07).
						    The numeral takes its own class: full caps, tabular, and a
						    hair of letter-spacing after the T, which separates the two
						    without spending a character on a space. */}
						{!isContinuation && (
							<CardTag>
								T<span className="pc-card__tier-num">{creature.tier}</span>{' '}
								{creature.category}
							</CardTag>
						)}
					</div>
					{!isContinuation && (
						<>
							<div className="pc-card__meta">{creature.type}</div>
							<CreatureStatPanel creature={creature} />
						</>
					)}
				</>
			}
		>
			{/* `height: 100%` with `overflow: hidden` was here, and it was the thing
			    that lost a long creature's text in silence (M18 F4). It also blinds
			    the autofit: a child that clips its own overflow makes the body's
			    `scrollHeight` equal its `clientHeight` at every size, so the search
			    concludes that everything fits at 9pt (trap 4). The shell's body
			    region owns the clipping now.

			    The `<Box sx={{ p: 1 }}>` that replaced it is gone too (M21 F8, D8):
			    8px of MUI padding on all four sides, INSIDE the measured box, on top
			    of the shell's own 6.5mm — and this was the only card family paying
			    it. */}
			{children}
		</PlayingCard>
	)
}
