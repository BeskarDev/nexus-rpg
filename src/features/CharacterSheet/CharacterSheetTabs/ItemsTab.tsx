import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useMemo } from 'react'

import { AddCircle, HelpOutline } from '@mui/icons-material'
import { AttributeField, SectionHeader } from '../CharacterSheet'
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

	const currentLoad: number = useMemo(() => {
		const weaponLoad = weapons
			.map((w) => w.load)
			.reduce((partialSum, a) => partialSum + a, 0)
		const equipmentLoad = Object.keys(equipment)
			.map((k) => Number(equipment[k].load))
			.reduce((partialSum, a) => partialSum + a, 0)
		const itemLoad = items
			.map((i) => i.load)
			.reduce((partialSum, a) => partialSum + a, 0)
		return weaponLoad + equipmentLoad + itemLoad
	}, [character])

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
			<Box>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Coins & Encumbrance</SectionHeader>
					<Tooltip
						title={
							<>
								<b>Encumbered.</b> You suffer +1 bane on Strength or Agility
								rolls for movement, such as climbing or swimming, and during
								travel.
								<br />
								<b>Over-Encumbered.</b> You can‘t move. You can‘t use any
								Actions or do any rolls for physical activity.
							</>
						}
					>
						<HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
					</Tooltip>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
					<AttributeField
						type="number"
						size="medium"
						value={coins}
						onChange={(event) =>
							updateCharacter({ items: { coins: Number(event.target.value) } })
						}
						label="Coins"
						sx={{
							mr: 1,
							maxWidth: '12rem',
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
						inputProps={{
							sx: {
								textAlign: 'right',
							},
						}}
					/>
					<AttributeField
						size="medium"
						value={currentLoad}
						label="Current Load"
						sx={{
							mr: 1,
							maxWidth: '7rem',
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
					<AttributeField
						type="number"
						size="small"
						value={encumbrance.encumberedAt}
						onChange={(event) =>
							updateCharacter({
								items: {
									encumbrance: { encumberedAt: Number(event.target.value) },
								},
							})
						}
						label="Encumbered"
						helperText="2 * Strength"
						sx={{
							maxWidth: '6.5rem',
						}}
					/>
					<AttributeField
						type="number"
						size="small"
						value={encumbrance.overencumberedAt}
						onChange={(event) =>
							updateCharacter({
								items: {
									encumbrance: { encumberedAt: Number(event.target.value) },
								},
							})
						}
						label="Overencumbered"
						helperText="3 * Strength"
						sx={{
							maxWidth: '7.5rem',
						}}
					/>
				</Box>
			</Box>
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
