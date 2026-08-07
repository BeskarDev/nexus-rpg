import React from 'react'
import { Creature } from '@site/src/types/Creature'
import type { FitResult } from '@site/src/components/autofit'
import { BaseCreatureCard } from './BaseCreatureCard'
import { CreatureBlocks, creatureBlocks } from './creatureBlocks'

export type CreatureCompactCardProps = Creature & {
	/** First body block on this card. 0 unless this is a continuation (D3). */
	start?: number
	end?: number
	part?: number
	totalParts?: number
	onFitted?: (result: FitResult) => void
}

/**
 * A creature on one printed card — or on two, if it will not fit on one.
 *
 * There is no longer a compact / detail split decided from content length: the
 * creature is its blocks, and the measured spill decides where a card stops
 * (M18 D3, and see `creatureBlocks`).
 */
export const CreatureCompactCard: React.FC<CreatureCompactCardProps> = ({
	start = 0,
	end,
	part = 1,
	totalParts = 1,
	onFitted,
	...creature
}) => {
	const blocks = React.useMemo(() => creatureBlocks(creature), [creature])

	return (
		<BaseCreatureCard
			creature={creature}
			part={part}
			totalParts={totalParts}
			fitKey={`${JSON.stringify(creature)}|${start}|${end ?? ''}`}
			onFitted={onFitted}
		>
			<CreatureBlocks blocks={blocks} start={start} end={end} />
		</BaseCreatureCard>
	)
}
