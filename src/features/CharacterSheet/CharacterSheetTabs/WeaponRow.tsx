import { Box, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'
import { AttributeField } from '../CharacterSheet'
import { Weapon } from '../types/Character'

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
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				pb: 1,
				borderBottom: 1,
				borderColor: 'divider',
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
				sx={{ maxWidth: '14rem', flexGrow: 1 }}
			/>
			<TextField
				variant="standard"
				value={weapon.damage}
				onChange={(event) =>
					setWeapon((w) => ({ ...w, damage: event.target.value }))
				}
				onBlur={() => updateWeapon({ damage: weapon.damage })}
				label="Damage"
				sx={{ maxWidth: '8rem', flexGrow: 0 }}
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
				sx={{ maxWidth: '20rem', flexGrow: 1 }}
				inputProps={{ sx: { fontSize: 12 } }}
			/>
			<AttributeField
				type="number"
				size="small"
				value={initialWeapon.cost}
				onChange={(event) => updateWeapon({ cost: Number(event.target.value) })}
				label="Cost"
				sx={{ maxWidth: '8rem', flexGrow: 0 }}
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
			>
				<Delete />
			</IconButton>
		</Box>
	)
}
