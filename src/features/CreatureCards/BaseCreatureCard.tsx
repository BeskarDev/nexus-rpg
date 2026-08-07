import { Box } from '@mui/material'
import React from 'react'
import { PlayingCard } from '@site/src/components/PlayingCard'
import CardTag from '@site/src/components/codex/CardTag'
import type { FitResult } from '@site/src/components/autofit'

interface BaseCreatureCardProps {
	name: string
	tier: number
	category: string
	type: string
	/** 1-based part number, for the `1/2` mark on a spilled creature (D3). */
	part?: number
	totalParts?: number
	/** The autofit's content key (M18 D2, trap 9) — see `PlayingCard`. */
	fitKey?: string
	onFitted?: (result: FitResult) => void
	children: React.ReactNode
}

export const BaseCreatureCard: React.FC<BaseCreatureCardProps> = ({
	name,
	tier,
	category,
	type,
	part = 1,
	totalParts = 1,
	fitKey,
	onFitted,
	children,
}) => {
	return (
		<PlayingCard keystone="bull" fitKey={fitKey} onFitted={onFitted}>
			{/* `height: 100%` with `overflow: hidden` was here, and it was the thing
			    that lost a long creature's text in silence (M18 F4). It also blinds
			    the autofit: a child that clips its own overflow makes the body's
			    `scrollHeight` equal its `clientHeight` at every size, so the search
			    concludes that everything fits at 9pt (trap 4). The shell's body
			    region owns the clipping now. */}
			<Box sx={{ p: 1 }}>
				<div className="pc-card__head-row">
					<span className="pc-card__name">
						{name}
						{totalParts > 1 && (
							<span className="pc-card__part">
								{' '}
								({part}/{totalParts})
							</span>
						)}
					</span>
					{/* Tier and category are one fact — "a tier 2 Elite" — so they ride
					    in one tag rather than as a number and a mark that have to be
					    read together. Same reading as the screen's tier chip. */}
					<CardTag>
						T{tier} {category}
					</CardTag>
				</div>
				<div className="pc-card__meta">{type}</div>
				{children}
			</Box>
		</PlayingCard>
	)
}
