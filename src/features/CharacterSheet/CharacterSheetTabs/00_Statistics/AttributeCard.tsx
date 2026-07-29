import { Box, Checkbox, MenuItem, Tooltip } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import {
	Attribute,
	AttributeType,
	attributeTypeArray,
} from '@site/src/types/Character'
import React from 'react'
import { AttributeField } from '../../CharacterSheet'
import { CharacterSheetCard, CardHeader } from '../../components'

export type AttributeCardProps = {
	attribute: Attribute
	label: string
	icon: React.ReactNode
	updateAttribute: (update: Partial<Attribute>) => void
	totalWounds: number
	color: string
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

const getAttributeDescription = (label: string) => {
	switch (label) {
		case 'Strength':
			return 'Strength: Physical power, melee damage, carrying capacity'
		case 'Agility':
			return 'Agility: Speed, reflexes, ranged accuracy, dodging'
		case 'Spirit':
			return 'Spirit: Willpower, perception, mystic magic, initiative'
		case 'Mind':
			return 'Mind: Intelligence, knowledge, arcane magic, tactics'
		default:
			return label
	}
}

// Get attribute abbreviation
export const getAttributeAbbr = (label: string) => {
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

export const AttributeCard: React.FC<AttributeCardProps> = ({
	attribute,
	label,
	icon,
	updateAttribute,
	totalWounds,
	color,
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

	const abbr = getAttributeAbbr(label)
	const isWounded = attribute.wounded

	return (
		<CharacterSheetCard
			minWidth="4rem"
			maxWidth="5rem"
			tooltip={getAttributeDescription(label)}
			sx={{
				flex: '1 1 auto',
				transition: 'border-color 0.2s ease-in-out',
				'&:hover': {
					borderColor: isWounded ? undefined : color,
				},
			}}
			borderColor={isWounded ? 'error.main' : undefined}
			header={<CardHeader icon={icon} label={abbr} color={color} />}
			footer={
				<Tooltip title={getWoundTooltip(label)} placement="bottom">
					<Checkbox
						size="small"
						// The vessel of life, intact, then split: the same jar the HP
						// card carries, cracked through once the attribute is wounded.
						icon={
							<Box sx={{ display: 'flex', color: 'text.disabled', opacity: 0.55 }}>
								<StatSigil name="hp" size="0.8rem" />
							</Box>
						}
						checkedIcon={
							<Box sx={{ display: 'flex', color: 'error.main' }}>
								<StatSigil name="wound" size="0.8rem" />
							</Box>
						}
						checked={attribute.wounded}
						disabled={!attribute.wounded && totalWounds >= 3}
						onChange={handleWoundChange}
						sx={{ p: 0, mt: 0 }}
					/>
				</Tooltip>
			}
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
						ml: 1.5,
						mr: -1.5,
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
		</CharacterSheetCard>
	)
}
