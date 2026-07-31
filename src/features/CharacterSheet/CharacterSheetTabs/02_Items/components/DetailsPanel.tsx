import { Box } from '@mui/material'
import React from 'react'
import { FieldGroupLabel, SheetInput, SheetInputProps } from '../../../components'

/**
 * The frame every expanded inventory row opens into (M13 S4b).
 *
 * Before this the details panel was a flat run of fields in source order —
 * description, quality, location, slot, uses, durability, then two buttons —
 * with no statement of what belonged with what. Twelve controls in one line-wrap
 * is a form, and a form is what a player has to read every time they open a row
 * to change one thing.
 *
 * Grouped by what a field IS: identity, numbers, placement, condition. Under
 * `FieldGroupLabel`, which is the S1 device — a named group says what the group
 * is, where a rule only cuts the panel into strips and says nothing. The
 * destructive and quick-ref controls sit apart at the end, so the thing that
 * deletes an item is never adjacent to the thing that renames it.
 */

/**
 * A field in a details panel.
 *
 * `SheetInput` centres its value, which is right for a stat tile and wrong for a
 * name or a list of properties — prose reads flush left. It also caps at 5rem,
 * so every call site was overriding `maxWidth` just to hold a word. This sets
 * both once and takes a plain `width`.
 */
export const DetailField: React.FC<
	SheetInputProps & { width?: string; align?: 'left' | 'center' }
> = ({ width = '4.5rem', align = 'left', sx, ...props }) => (
	<SheetInput
		{...props}
		inputProps={{ ...props.inputProps, sx: { textAlign: align } }}
		sx={{ width, maxWidth: 'none', m: 0, ...sx }}
	/>
)

export interface DetailsGroupProps {
	label: string
	/** Spans the panel's full width — for prose that wants the whole measure. */
	wide?: boolean
	children: React.ReactNode
}

export const DetailsGroup: React.FC<DetailsGroupProps> = ({
	label,
	wide,
	children,
}) => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			gap: 0.5,
			...(wide ? { flex: '1 1 100%' } : { flex: '0 1 auto' }),
		}}
	>
		<FieldGroupLabel>{label}</FieldGroupLabel>
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'flex-start',
				gap: 1,
			}}
		>
			{children}
		</Box>
	</Box>
)

export interface DetailsPanelProps {
	children: React.ReactNode
	/** Quick-ref and delete — kept away from the fields they act on. */
	actions?: React.ReactNode
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
	children,
	actions,
}) => (
	<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'flex-start',
				gap: 2,
			}}
		>
			{children}
		</Box>
		{actions && (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					gap: 0.5,
					pt: 0.5,
					borderTop:
						'1px solid color-mix(in srgb, var(--nexus-bronze) 18%, transparent)',
				}}
			>
				{actions}
			</Box>
		)}
	</Box>
)
