import {
	HeartBroken,
	HeartBrokenOutlined,
} from '@mui/icons-material'
import { Box, Checkbox, InputAdornment, MenuItem, Tooltip, Typography } from '@mui/material'
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
				label={label}
				InputProps={{
					startAdornment: (
						<InputAdornment
							position="start"
							sx={{ pr: 0.5, fontSize: '0.75rem' }}
						>
							{icon}
						</InputAdornment>
					),
					sx: {
						px: 1,
						fontWeight: 'bold',
					},
				}}
				sx={{
					maxWidth: '6rem',
				}}
			>
				{attributeTypeArray.map((at) => (
					<MenuItem key={at} value={at}>
						d{at}
					</MenuItem>
				))}
			</AttributeField>
			
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Tooltip title={getWoundTooltip(label)} placement="bottom">
					<Checkbox
						size="small"
						icon={<HeartBrokenOutlined />}
						checkedIcon={<HeartBroken color="error" />}
						checked={attribute.wounded}
						disabled={!attribute.wounded && totalWounds >= 3}
						onChange={handleWoundChange}
						sx={{ p: 0.25 }}
					/>
				</Tooltip>
				{attribute.wounded && (
					<Typography variant="caption" color="error" sx={{ textAlign: 'center', lineHeight: 1 }}>
						+1 bane
					</Typography>
				)}
			</Box>
		</Box>
	)
}
