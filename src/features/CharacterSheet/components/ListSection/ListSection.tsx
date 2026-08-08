import { Box, Collapse, IconButton } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { Chevron } from '../Chevron'
import { ListSectionHeader, ListSectionHeaderProps } from './ListSectionHeader'

export interface ListSectionProps extends Omit<
	ListSectionHeaderProps,
	'leading' | 'sx'
> {
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
	/** Class for the section container — see `UnifiedListItem.summaryClassName`. */
	className?: string
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
 * ## Why the header sits on a wash (S4e)
 *
 * The ruled heading alone was enough on a wide window and not on a phone: with the
 * ledger's columns collapsed, every row wraps onto two or three lines, and six
 * sections of wrapped rows separated by one hairline rule read as one long list with
 * occasional labels in it. The owner's report was that you cannot tell which rows
 * belong to which category.
 *
 * The heading takes a bronze WASH now — the theme's own grouping device, and the same
 * one the meta band and the record plate use — so a section visibly BEGINS somewhere,
 * and the gap between sections is wider than the gap between rows inside one. Not a
 * frame around the whole section: nesting every row inside a second box is the
 * box-in-a-box this theme keeps removing, and the rows already carry their own rules.
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
	className,
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
		<Box
			className={className ? `cs-list-section ${className}` : 'cs-list-section'}
			sx={{ width: '100%', px: 1, py: 0.5, ...sx }}
		>
			<ListSectionHeader
				label={label}
				{...headerProps}
				className="cs-section-head"
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
