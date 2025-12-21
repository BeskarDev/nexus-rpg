import { HeartBroken, HeartBrokenOutlined } from '@mui/icons-material'
import {
	Box,
	Checkbox,
	InputAdornment,
	MenuItem,
	Tooltip,
	Typography,
	alpha,
} from '@mui/material'
import {
	Attribute,
	AttributeType,
	attributeTypeArray,
} from '@site/src/types/Character'
import React from 'react'
import { AttributeField } from '../../CharacterSheet'

export type AttributeColumnProps = {
	attribute: Attribute
	label: string
	icon: React.ReactNode
	updateAttribute: (update: Partial<Attribute>) => void
	totalWounds: number
}

const getWoundTooltip = (label: string) => {
	switch (label) {
		case 'Strength':
			return 'Broken Bone (upper body): +1 bane on STR rolls'
		case 'Agility':
			return 'Broken Bone (legs): +1 bane on AGI rolls'
		case 'Spirit':
			return 'Head Injury: +1 bane on SPI rolls'
		case 'Mind':
			return 'Concussion: +1 bane on MND rolls'
		default:
			return 'Wound: +1 bane on rolls'
	}
}

// Get attribute abbreviation
const getAttributeAbbreviation = (label: string) => {
	switch (label) {
		case 'Strength':
			return 'STR'
		case 'Agility':
			return 'AGI'
		case 'Spirit':
			return 'SPI'
		case 'Mind':
			return 'MND'
		default:
			return label.substring(0, 3).toUpperCase()
	}
}

export const AttributeColumn: React.FC<AttributeColumnProps> = ({
	attribute,
	label,
	icon,
	updateAttribute,
	totalWounds,
}) => {
	const handleWoundChange = () => {
		if (!attribute.wounded) {
			// Adding a wound
			if (totalWounds >= 3) return // Max 3 wounds
			updateAttribute({ wounded: true })
		} else {
			// Removing a wound
			updateAttribute({ wounded: false })
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '6rem',
				borderRadius: 2,
				border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.3)}`,
				bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
				p: 0.75,
				transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
				'&:hover': {
					borderColor: (theme) => alpha(theme.palette.primary.main, 0.5),
					boxShadow: (theme) => `0 0 8px ${alpha(theme.palette.primary.main, 0.15)}`,
				},
			}}
		>
			{/* Attribute Label with Icon */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 0.5,
					mb: 0.5,
				}}
			>
				<Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
					{icon}
				</Box>
				<Typography
					variant="caption"
					sx={{
						fontWeight: 600,
						color: 'text.secondary',
						textTransform: 'uppercase',
						letterSpacing: '0.5px',
					}}
				>
					{getAttributeAbbreviation(label)}
				</Typography>
			</Box>

			{/* Die Value Display - Game UI Style */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<AttributeField
					select
					value={attribute.value}
					onChange={(event) =>
						updateAttribute({
							value: Number(event.target.value) as AttributeType,
						})
					}
					variant="standard"
					InputProps={{
						disableUnderline: true,
						sx: {
							fontWeight: 'bold',
							fontSize: '1.25rem',
							textAlign: 'center',
							'& .MuiSelect-select': {
								py: 0.25,
								pr: '20px',
								textAlign: 'center',
							},
						},
					}}
					sx={{
						maxWidth: '4.5rem',
						'& .MuiInput-root': {
							justifyContent: 'center',
						},
					}}
				>
					{attributeTypeArray.map((at) => (
						<MenuItem key={at} value={at}>
							d{at}
						</MenuItem>
					))}
				</AttributeField>
			</Box>

			{/* Wound Checkbox */}
			<Box
				sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 0.5 }}
			>
				<Tooltip title={getWoundTooltip(label)} placement="bottom">
					<Checkbox
						size="small"
						icon={<HeartBrokenOutlined sx={{ fontSize: '1rem' }} />}
						checkedIcon={<HeartBroken color="error" sx={{ fontSize: '1rem' }} />}
						checked={attribute.wounded}
						disabled={!attribute.wounded && totalWounds >= 3}
						onChange={handleWoundChange}
						sx={{ p: 0.25 }}
					/>
				</Tooltip>
			</Box>
		</Box>
	)
}
