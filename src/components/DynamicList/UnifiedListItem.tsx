import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Divider,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import React, { useState, ReactNode } from 'react'

export type UnifiedListItemProps = {
	/** Content displayed in the collapsed summary row */
	summaryContent: ReactNode
	/** Content displayed when expanded */
	detailsContent: ReactNode
	/** Initial expanded state */
	defaultExpanded?: boolean
	/** Controlled expanded state */
	expanded?: boolean
	/** Callback when expand state changes */
	onExpandChange?: (expanded: boolean) => void
	/** Custom max width (defaults to --cs-max-width-lg) */
	maxWidth?: string
	/** Show divider at bottom of details when expanded */
	showDivider?: boolean
	/** Reverse icon position (icon on left) */
	reverseIcon?: boolean
	/** Additional styling for the accordion */
	sx?: object
	/** Additional styling for the summary content box */
	summarySx?: object
	/** Additional styling for the details content box */
	detailsSx?: object
}

/**
 * UnifiedListItem - A unified expandable list item component for character sheet lists.
 * Provides consistent styling and behavior across abilities, weapons, items, spells, etc.
 */
export const UnifiedListItem: React.FC<UnifiedListItemProps> = ({
	summaryContent,
	detailsContent,
	defaultExpanded = false,
	expanded: controlledExpanded,
	onExpandChange,
	maxWidth = 'var(--cs-max-width-lg)',
	showDivider = true,
	reverseIcon = true,
	sx,
	summarySx,
	detailsSx,
}) => {
	const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
	
	// Use controlled state if provided, otherwise use internal state
	const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded
	
	const handleChange = (_: React.SyntheticEvent, newExpanded: boolean) => {
		if (controlledExpanded === undefined) {
			setInternalExpanded(newExpanded)
		}
		onExpandChange?.(newExpanded)
	}

	return (
		<Accordion
			expanded={isExpanded}
			onChange={handleChange}
			disableGutters
			sx={{
				flexGrow: 1,
				maxWidth,
				mt: 0,
				...sx,
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				sx={{
					gap: 1,
					pt: 0,
					px: 0,
					flexDirection: reverseIcon ? 'row-reverse' : 'row',
					'& .MuiAccordionSummary-content': {
						display: 'block',
					},
					...summarySx,
				}}
			>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						columnGap: 1,
					}}
				>
					{summaryContent}
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						columnGap: 1,
						...detailsSx,
					}}
				>
					{detailsContent}
				</Box>
				{showDivider && <Divider sx={{ mt: 1, opacity: 0.5 }} />}
			</AccordionDetails>
		</Accordion>
	)
}
