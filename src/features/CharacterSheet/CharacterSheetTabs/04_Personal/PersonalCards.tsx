import React from 'react'
import { TextField } from '@mui/material'
import { Height, Scale, Cake, Description } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface SimpleTextCardProps {
	value: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
	label: string
	icon: React.ReactNode
	tooltip: string
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
	tooltip,
	minWidth = '5rem',
	maxWidth = '8rem',
	multiline = false,
}) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={icon} label={label} color={UI_COLORS.greyBlue} />}
			tooltip={tooltip}
			minWidth={minWidth}
			maxWidth={maxWidth}
		>
			<TextField
				variant="standard"
				size="small"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				error={!!error}
				multiline={multiline}
				minRows={multiline ? 2 : 1}
				maxRows={multiline ? 5 : 1}
				InputProps={{
					disableUnderline: true,
					sx: {
						fontSize: '0.85rem',
						'& input, & textarea': {
							textAlign: multiline ? 'left' : 'center',
							p: 0.5,
						},
					},
				}}
				sx={{ width: '100%' }}
			/>
		</CharacterSheetCard>
	)
}

// Convenience exports for common use cases
export const HeightCard: React.FC<Omit<SimpleTextCardProps, 'label' | 'icon' | 'tooltip'>> = (props) => (
	<SimpleTextCard
		{...props}
		label="Height"
		icon={<Height />}
		tooltip="Character's height"
		minWidth="5rem"
		maxWidth="7rem"
	/>
)

export const WeightCard: React.FC<Omit<SimpleTextCardProps, 'label' | 'icon' | 'tooltip'>> = (props) => (
	<SimpleTextCard
		{...props}
		label="Weight"
		icon={<Scale />}
		tooltip="Character's weight"
		minWidth="5rem"
		maxWidth="7rem"
	/>
)

export const AgeCard: React.FC<Omit<SimpleTextCardProps, 'label' | 'icon' | 'tooltip'>> = (props) => (
	<SimpleTextCard
		{...props}
		label="Age"
		icon={<Cake />}
		tooltip="Character's age"
		minWidth="5rem"
		maxWidth="7rem"
	/>
)

export const DescriptionCard: React.FC<Omit<SimpleTextCardProps, 'label' | 'icon' | 'tooltip' | 'multiline' | 'minWidth' | 'maxWidth'>> = (props) => (
	<SimpleTextCard
		{...props}
		label="Description"
		icon={<Description />}
		tooltip="Character's physical description"
		minWidth="12rem"
		maxWidth="20rem"
		multiline
	/>
)
