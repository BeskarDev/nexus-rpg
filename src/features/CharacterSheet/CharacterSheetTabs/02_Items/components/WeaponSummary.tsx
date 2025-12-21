import { TextField } from '@mui/material'
import React from 'react'
import { Weapon } from '@site/src/types/Character'
import { AttributeField } from '@site/src/features/CharacterSheet/CharacterSheet'
import { DamageFields } from '../../DamageFields'

export type WeaponSummaryProps = {
	weapon: Weapon
	onNameChange: (name: string) => void
	onNameBlur: () => void
	onDamageUpdate: (update: Partial<Weapon['damage']>) => void
	onPropertiesChange: (properties: string) => void
	onPropertiesBlur: () => void
}

/**
 * WeaponSummary - The collapsed summary view for a weapon row.
 */
export const WeaponSummary: React.FC<WeaponSummaryProps> = ({
	weapon,
	onNameChange,
	onNameBlur,
	onDamageUpdate,
	onPropertiesChange,
	onPropertiesBlur,
}) => {
	return (
		<>
			<TextField
				size="small"
				variant="standard"
				value={weapon.name}
				onChange={(event) => onNameChange(event.target.value)}
				onBlur={onNameBlur}
				label="Name"
				sx={{
					maxWidth: { sm: '10rem', xs: '7.5rem' },
				}}
			/>
			<DamageFields
				type="weapon"
				damage={weapon.damage}
				updateDamage={onDamageUpdate}
			/>
			<TextField
				size="small"
				variant="standard"
				value={weapon.properties}
				onChange={(event) => onPropertiesChange(event.target.value)}
				onBlur={onPropertiesBlur}
				label="Properties"
				sx={{ maxWidth: '14rem' }}
			/>
			<AttributeField
				disabled
				size="small"
				variant="standard"
				value={`${3 - (weapon.uses || 0)}/3`}
				label="Uses"
				sx={{
					maxWidth: '2.5rem',
				}}
				InputProps={{
					sx: {
						color:
							(weapon.uses || 0) === 3
								? 'error.main'
								: (weapon.uses || 0) === 2
									? 'warning.main'
									: 'text.primary',
					},
				}}
			/>
		</>
	)
}
