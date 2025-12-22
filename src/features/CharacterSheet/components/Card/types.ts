import { SxProps, Theme } from '@mui/material'
import React from 'react'

export interface CardHeaderProps {
	/** Icon element (MUI icon component) */
	icon?: React.ReactNode

	/** Label text */
	label: string

	/** Theme color for icon and label */
	color?: string

	/** Additional sx props */
	sx?: SxProps<Theme>

	/** Test ID */
	'data-testid'?: string
}

export interface CardContentProps {
	/** Display value */
	value: string | number | React.ReactNode

	/** Additional sx props */
	sx?: SxProps<Theme>

	/** Text color (for status indicators) */
	color?: string

	/** Test ID */
	'data-testid'?: string
}

export interface CharacterSheetCardProps {
	/** Content for the header section (typically icon + label) */
	header?: React.ReactNode

	/** Main content area - can be any React component */
	children: React.ReactNode

	/** Optional footer content below main area */
	footer?: React.ReactNode

	/** Optional tooltip text for the entire card */
	tooltip?: string

	/** Optional config menu element (typically a Menu component) */
	configMenu?: React.ReactNode

	/** Callback when config button is clicked */
	onConfigClick?: (event: React.MouseEvent<HTMLElement>) => void

	/** Whether to show the config button */
	showConfigButton?: boolean

	/** Minimum width of the card */
	minWidth?: string | number

	/** Maximum width of the card */
	maxWidth?: string | number

	/** Additional sx props for the container */
	sx?: SxProps<Theme>

	/** Custom border color (when highlighted, errored, etc.) */
	borderColor?: string

	/** Test ID for testing purposes */
	'data-testid'?: string
}
