import { Typography } from '@mui/material'
import parse from 'html-react-parser'
import React from 'react'
import { FIT_BLOCK_ATTRIBUTE } from './useAutofit'
import { splitHtmlBlocks } from './splitBlocks'

export interface FittedBodyProps {
	/** The body's HTML, as it comes out of the JSON. */
	html: string
	/** First block on this card. 0 unless this is a continuation (M18 D3). */
	start?: number
	/** One past the last block, or the end of the body. */
	end?: number
}

/**
 * A card body of plain prose, as the blocks a continuation card can cut at.
 *
 * Every block carries `data-fit-block`, which is how the engine finds where the
 * body stops fitting: it hides the trailing blocks and re-measures, so the cut
 * is taken from the laid-out card rather than guessed from the text's length.
 *
 * Families whose body has sections (a spell's heightened clauses) draw their
 * own blocks so they can put a rule at the boundary — see `SpellPrintCard`.
 */
export const FittedBody: React.FC<FittedBodyProps> = ({
	html,
	start = 0,
	end,
}) => {
	const blocks = React.useMemo(() => splitHtmlBlocks(html), [html])
	return (
		<>
			{blocks.slice(start, end).map((block, index) => (
				<Typography
					key={start + index}
					variant="body1"
					className="pc-fit"
					{...{ [FIT_BLOCK_ATTRIBUTE]: '' }}
				>
					{parse(block)}
				</Typography>
			))}
		</>
	)
}
