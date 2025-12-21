import { HeartBroken, HeartBrokenOutlined } from '@mui/icons-material'
import {
	Box,
	Checkbox,
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

// Get attribute abbreviation and color
export const getAttributeInfo = (label: string) => {
	switch (label) {
		case 'Strength':
			return { abbr: 'STR', color: '#e57373' } // red
		case 'Agility':
			return { abbr: 'AGI', color: '#81c784' } // green
		case 'Spirit':
			return { abbr: 'SPI', color: '#64b5f6' } // blue
		case 'Mind':
			return { abbr: 'MND', color: '#ba68c8' } // purple
		default:
			return { abbr: label.substring(0, 3).toUpperCase(), color: '#9e9e9e' }
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

	const { abbr, color } = getAttributeInfo(label)
	const isWounded = attribute.wounded

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				minWidth: '4rem',
				maxWidth: '4.5rem',
				flex: '1 1 auto',
				borderRadius: 1,
				border: (theme) =>
					`1px solid ${isWounded ? theme.palette.error.main : alpha(theme.palette.divider, 0.2)}`,
				bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
				p: 0.5,
				transition: 'border-color 0.2s ease-in-out',
				'&:hover': {
					borderColor: isWounded ? undefined : alpha(color, 0.6),
				},
			}}
		>
			{/* Attribute Label with Icon - Compact */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 0.25,
				}}
			>
				<Box sx={{ fontSize: '0.7rem', color: color, display: 'flex' }}>
					{icon}
				</Box>
				<Typography
					variant="caption"
					sx={{
						fontWeight: 700,
						fontSize: '0.6rem',
						color: color,
						textTransform: 'uppercase',
						letterSpacing: '0.5px',
					}}
				>
					{abbr}
				</Typography>
			</Box>

			{/* Die Value Display - Centered */}
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
						fontSize: '0.95rem',
						textAlign: 'center',
						justifyContent: 'center',
						'& .MuiSelect-select': {
							py: 0,
							pr: '16px',
							textAlign: 'center',
						},
					},
				}}
				sx={{
					maxWidth: '3.5rem',
					'& .MuiInput-root': {
						justifyContent: 'center',
					},
				}}
			>
				{attributeTypeArray.map((at) => (
					<MenuItem key={at} value={at} sx={{ fontSize: '0.75rem' }}>
						d{at}
					</MenuItem>
				))}
			</AttributeField>

			{/* Wound Checkbox - Compact */}
			<Tooltip title={getWoundTooltip(label)} placement="bottom">
				<Checkbox
					size="small"
					icon={<HeartBrokenOutlined sx={{ fontSize: '0.8rem' }} />}
					checkedIcon={<HeartBroken color="error" sx={{ fontSize: '0.8rem' }} />}
					checked={attribute.wounded}
					disabled={!attribute.wounded && totalWounds >= 3}
					onChange={handleWoundChange}
					sx={{ p: 0, mt: 0 }}
				/>
			</Tooltip>
		</Box>
	)
}
