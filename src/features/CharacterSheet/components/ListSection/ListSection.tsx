import { Box, Collapse, IconButton } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { Chevron } from '../Chevron'
import { ListSectionHeader, ListSectionHeaderProps } from './ListSectionHeader'

export interface ListSectionProps
	extends Omit<ListSectionHeaderProps, 'leading' | 'sx'> {
	/** The rows. */
	children: ReactNode
	/** Give the section a disclosure control. */
	collapsible?: boolean
	/** Uncontrolled initial state; ignored when `expanded` is passed. */
	defaultExpanded?: boolean
	/** Controlled state. */
	expanded?: boolean
	onExpandedChange?: (expanded: boolean) => void
	sx?: object
	headerSx?: object
}

/**
 * A full-width group of ledger rows under one ruled heading (M13 S2, F5).
 *
 * ## Why this is not `CharacterSheetCard`
 *
 * Because that card is a **tile** container and nothing in its name or props
 * says so. Status Conditions found this twice in one review cycle: the card
 * wraps its children in a centred flex row (built for a tile holding one value),
 * so a heading plus a list laid out side by side; and its `p: 0.5` is sized for
 * content that never approaches the frame, so a full-width child sat against it.
 * Both were fixed locally there, and both would have been rediscovered by every
 * list tab in S3–S7. This is the sibling the S1 log asked for.
 *
 * ## Collapsing
 *
 * Four of the five ad-hoc groupings were MUI `Accordion`s purely to get a
 * collapse — which brought a paper surface, an elevation and a Material chevron
 * along with it, none of which a section header wants. Here the collapse is a
 * `Collapse` and a disclosure button, so an open section is visually identical
 * to a section that never collapses.
 */
export const ListSection: React.FC<ListSectionProps> = ({
	children,
	collapsible = false,
	defaultExpanded = true,
	expanded: controlledExpanded,
	onExpandedChange,
	sx,
	headerSx,
	label,
	...headerProps
}) => {
	const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
	const isExpanded =
		controlledExpanded !== undefined ? controlledExpanded : internalExpanded

	const toggle = () => {
		if (controlledExpanded === undefined) {
			setInternalExpanded(!isExpanded)
		}
		onExpandedChange?.(!isExpanded)
	}

	return (
		<Box sx={{ width: '100%', px: 1, py: 0.5, ...sx }}>
			<ListSectionHeader
				label={label}
				{...headerProps}
				sx={headerSx}
				leading={
					collapsible ? (
						<IconButton
							size="small"
							onClick={toggle}
							aria-expanded={isExpanded}
							aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${label}`}
							sx={{
								p: 0.25,
								transform: isExpanded ? 'none' : 'rotate(-90deg)',
								transition: 'transform 120ms linear',
							}}
						>
							<Chevron size={9} />
						</IconButton>
					) : undefined
				}
			/>
			<Collapse in={isExpanded} timeout={120} unmountOnExit>
				<Box sx={{ width: '100%' }}>{children}</Box>
			</Collapse>
		</Box>
	)
}
