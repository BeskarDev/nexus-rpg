import { Box, Checkbox, MenuItem } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import DieToken from '@site/src/components/codex/DieToken'
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
	/**
	 * The die Select is driven open by the card, not only by clicking the token —
	 * so entering edit state is the same gesture here as on every other stat card.
	 */
	const [dieMenuOpen, setDieMenuOpen] = React.useState(false)

	return (
		<CharacterSheetCard
			// M9 S6: a column inside the attribute plate, which supplies the single
			// frame for all four. A wounded attribute still draws its own red keyline
			// (borderColor), since that is state rather than decoration.
			weight="column"
			onConfigClick={() => setDieMenuOpen(true)}
			editLabel={`Change ${label} die`}
			minWidth="3.5rem"
			maxWidth="5rem"
			info={`${getAttributeDescription(label)} — Wound: ${getWoundTooltip(label)}`}
			infoLabel={`About ${label}`}
			// M9 S6: no bespoke hover here. Attributes used to signal clickability
			// with a coloured keyline while the defence band used a wash — two
			// languages for one meaning. CharacterSheetCard's wash is now the single
			// affordance for every card.
			sx={{ flex: '1 1 auto' }}
			borderColor={isWounded ? 'error.main' : undefined}
			header={<CardHeader icon={icon} label={abbr} color={color} />}
			footer={
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
				// M9 S6: the die token IS the control. `renderValue` swaps the "d8"
				// text for `DieToken`, whose polygon side-count encodes the die size —
				// shape is preattentive in a way four same-face numerals are not, so a
				// glance reads the spread across all four attributes.
				//
				// Editing costs no more taps than before: the token opens the same menu
				// the old text did. Dropping `IconComponent` removes the dropdown arrow
				// and the 16px of padding it reserved, which is the space this slice
				// reclaims. The affordance is the same hover wash every other stat card
				// uses, and the menu is driven open by the card as well as the token.
				SelectProps={{
					IconComponent: () => null,
					renderValue: (value) => <DieToken value={`d${value}`} />,
					open: dieMenuOpen,
					onOpen: () => setDieMenuOpen(true),
					onClose: () => setDieMenuOpen(false),
				}}
				InputProps={{
					disableUnderline: true,
					sx: {
						justifyContent: 'center',
						cursor: 'pointer',
						'& .MuiSelect-select': {
							py: 0,
							pr: '0 !important',
							display: 'flex',
							justifyContent: 'center',
						},
					},
				}}
				sx={{
					maxWidth: '3.5rem',
					'& .MuiInput-root': { justifyContent: 'center' },
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
