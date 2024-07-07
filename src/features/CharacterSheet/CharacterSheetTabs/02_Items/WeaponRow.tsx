import { Box, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'
import { Weapon } from '../../../../types/Character'
import { AttributeField } from '../../CharacterSheet'
import { DamageFields } from '../DamageFields'

export type WeaponRowProps = {
	weapon: Weapon
	updateWeapon: (update: Partial<Weapon>) => void
	deleteWeapon: () => void
}

export const WeaponRow: React.FC<WeaponRowProps> = ({
	weapon: initialWeapon,
	updateWeapon,
	deleteWeapon,
}) => {
	const [weapon, setWeapon] = useState<Weapon>(initialWeapon)

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				columnGap: 1,
				pb: 1,
			}}
		>
			<TextField
				variant="standard"
				value={weapon.name}
				onChange={(event) =>
					setWeapon((w) => ({ ...w, name: event.target.value }))
				}
				onBlur={() => updateWeapon({ name: weapon.name })}
				label="Name"
				sx={{
					maxWidth: { sm: '13rem', xs: '100%' },
					flexGrow: 1,
				}}
			/>
			<DamageFields
				type="weapon"
				damage={initialWeapon.damage}
				updateDamage={(update) =>
					updateWeapon({ damage: { ...initialWeapon.damage, ...update } })
				}
			/>
			<TextField
				variant="standard"
				multiline
				minRows={1}
				maxRows={1}
				value={weapon.properties}
				onChange={(event) =>
					setWeapon((w) => ({ ...w, properties: event.target.value }))
				}
				onBlur={() => updateWeapon({ properties: weapon.properties })}
				label="Properties"
				sx={{ maxWidth: { sm: '20rem', xs: '100%' }, flexGrow: 1 }}
				inputProps={{ sx: { fontSize: 12 } }}
			/>
			<AttributeField
				type="number"
				size="small"
				value={initialWeapon.cost}
				onChange={(event) => updateWeapon({ cost: Number(event.target.value) })}
				label="Cost"
				sx={{ maxWidth: '6rem', flexGrow: 0 }}
				inputProps={{
					sx: {
						textAlign: 'right',
					},
				}}
			/>
			<AttributeField
				type="number"
				size="small"
				value={initialWeapon.load}
				onChange={(event) => updateWeapon({ load: Number(event.target.value) })}
				label="Load"
				sx={{ maxWidth: '4rem', flexGrow: 0 }}
			/>
			<IconButton
				size="small"
				edge="end"
				aria-label="delete"
				onClick={deleteWeapon}
				sx={{ my: 'auto' }}
			>
				<Delete />
			</IconButton>
		</Box>
	)
}
