import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'

import { AddCircle, HelpOutline } from '@mui/icons-material'
import { SectionHeader } from '../CharacterSheet'
import { DeepPartial } from '../CharacterSheetContainer'
import { Character, Weapon } from '../types/Character'

import { WeaponRow } from './WeaponRow'

export type ItemsTabProps = {
	character: Character
	updateCharacter: (update: DeepPartial<Character>) => void
}

export const ItemsTab: React.FC<ItemsTabProps> = ({
	character,
	updateCharacter,
}) => {
	const { coins, encumbrance, weapons, equipment, items } = character.items

	const addNewWeapon = () => {
		weapons.push({
			name: 'new weapon',
			damage: '',
			properties: '',
			cost: 0,
			load: 0,
		})
		updateCharacter({
			items: { coins, encumbrance, weapons, equipment, items },
		})
	}

	const updateWeapon = (update: Partial<Weapon>, index: number) => {
		const newWeapons = [...weapons]
		newWeapons[index] = { ...weapons[index], ...update }
		return updateCharacter({
			items: { weapons: newWeapons },
		})
	}

	const deleteWeapon = (weapon: Weapon) => {
		const newWeapons = [...weapons].filter((s) => s != weapon)
		updateCharacter({
			items: { coins, encumbrance, weapons: newWeapons, equipment, items },
		})
		weapons.pop()
	}

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			<Box sx={{ mb: 2 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Weapons</SectionHeader>
					<Tooltip
						title={
							<>
								damage = base + (weapon * SL) + other
								<br />
								base = ½ STR (melee), ½ AGI (ranged), ½ SPI (mysticism), ½ MND
								(arcana)
							</>
						}
					>
						<HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
					</Tooltip>
					<IconButton onClick={addNewWeapon} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{weapons.map((w, index) => (
						<WeaponRow
							key={w.name + index}
							weapon={w}
							updateWeapon={(update) => updateWeapon(update, index)}
							deleteWeapon={() => deleteWeapon(w)}
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}
