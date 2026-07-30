import React from 'react'
import { TextField } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface SimpleTextCardProps {
	value: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
	label: string
	icon: React.ReactNode
	minWidth?: string
	maxWidth?: string
	multiline?: boolean
}

export const SimpleTextCard: React.FC<SimpleTextCardProps> = ({
	value,
	onChange,
	onBlur,
	error,
	label,
	icon,
	minWidth = '5rem',
	maxWidth = '8rem',
	multiline = false,
}) => {
	return (
		<CharacterSheetCard
			header={
				<CardHeader icon={icon} label={label} color={UI_COLORS.greyBlue} />
			}
			minWidth={minWidth}
			maxWidth={maxWidth}
			// M9 S3: these are identity cards (name, folk, background...) — the
			// cartouche keystone's "this encloses a name" motif fits here more than
			// anywhere else in the sheet, and the Personal tab's grid gap already
			// clears the overhang.
			frame
		>
			<TextField
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				error={!!error}
				placeholder={`your ${label.toLowerCase()}`}
				multiline={multiline}
				minRows={multiline ? 2 : undefined}
				maxRows={multiline ? 4 : undefined}
				variant="standard"
				sx={{
					'& .MuiInput-root': {
						'&:before, &:after': { display: 'none' },
					},
					'& input, & textarea': {
						textAlign: multiline ? 'left' : 'center',
            mx: 1,
					},
				}}
			/>
		</CharacterSheetCard>
	)
}

// Convenience exports for common use cases
export const HeightCard: React.FC<
	Omit<SimpleTextCardProps, 'label' | 'icon'>
> = (props) => (
	<SimpleTextCard
		{...props}
		label="Height"
		icon={<StatSigil name="height" size="1.15em" />}
	/>
)

export const WeightCard: React.FC<
	Omit<SimpleTextCardProps, 'label' | 'icon'>
> = (props) => (
	<SimpleTextCard
		{...props}
		label="Weight"
		icon={<StatSigil name="weight" size="1.15em" />}
	/>
)

export const AgeCard: React.FC<
	Omit<SimpleTextCardProps, 'label' | 'icon'>
> = (props) => (
	<SimpleTextCard
		{...props}
		label="Age"
		icon={<StatSigil name="age" size="1.15em" />}
	/>
)

export const DescriptionCard: React.FC<
	Omit<
		SimpleTextCardProps,
		'label' | 'icon' | 'multiline' | 'minWidth' | 'maxWidth'
	>
> = (props) => (
	<SimpleTextCard
		{...props}
		label="Description"
		icon={<StatSigil name="description" size="1.15em" />}
		minWidth="19.5rem"
		multiline
	/>
)
