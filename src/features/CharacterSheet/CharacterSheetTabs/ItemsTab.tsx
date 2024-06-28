import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useMemo } from 'react'

import { AddCircle, HelpOutline } from '@mui/icons-material'
import { AttributeField, SectionHeader } from '../CharacterSheet'
import { DeepPartial } from '../CharacterSheetContainer'
import { Character, Item, Weapon } from '../types/Character'

import { EquipmentRow } from './EquipmentRow'
import { ItemRow } from './ItemRow'
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
			.map((k) =>
				k !== 'rings'
					? Number(equipment[k].load)
					: equipment[k]
							.map((r) => r.load)
							.reduce((partialSum, a) => partialSum + a, 0),
			)
			.reduce((partialSum, a) => partialSum + a, 0)
		const itemLoad = items
			.map((i) => i.load * i.amount)
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

	const addNewItem = () => {
		items.push({
			name: 'new item',
			properties: '',
			cost: 0,
			load: 0,
			amount: 0,
		})
		updateCharacter({
			items: { coins, encumbrance, weapons, equipment, items },
		})
	}

	const updateItem = (update: Partial<Item>, index: number) => {
		const newItems = [...items]
		newItems[index] = { ...items[index], ...update }
		return updateCharacter({
			items: { items: newItems },
		})
	}

	const deleteItem = (item: Item) => {
		const newItems = [...items].filter((s) => s != item)
		updateCharacter({
			items: { coins, encumbrance, weapons, equipment, items: newItems },
		})
		items.pop()
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

			<Box sx={{ width: '100%', flexGrow: 1 }} />

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

			<Box sx={{ width: '100%', flexGrow: 1 }} />

			<Box sx={{ mb: 2, maxWidth: '28rem' }}>
				<SectionHeader>Equipment</SectionHeader>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<EquipmentRow
						label="Head"
						equipment={equipment.head}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: { head: { ...equipment.head, ...update } },
								},
							})
						}
					/>
					<EquipmentRow
						label="Neck"
						equipment={equipment.neck}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: { neck: { ...equipment.neck, ...update } },
								},
							})
						}
					/>
					<EquipmentRow
						label="Back"
						equipment={equipment.back}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: { neck: { ...equipment.neck, ...update } },
								},
							})
						}
					/>
					<EquipmentRow
						label="Body"
						equipment={equipment.body}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: { body: { ...equipment.body, ...update } },
								},
							})
						}
					/>
					<EquipmentRow
						label="Hands"
						equipment={equipment.hands}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: { hands: { ...equipment.hands, ...update } },
								},
							})
						}
					/>
					<EquipmentRow
						label="Ring 1"
						equipment={equipment.rings[0]}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: {
										rings: [
											{ ...equipment.rings[0], ...update },
											equipment.rings[1],
											equipment.rings[2],
										],
									},
								},
							})
						}
					/>
					<EquipmentRow
						label="Ring 2"
						equipment={equipment.rings[1]}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: {
										rings: [
											equipment.rings[0],
											{ ...equipment.rings[1], ...update },
											equipment.rings[2],
										],
									},
								},
							})
						}
					/>
					<EquipmentRow
						label="Ring 3"
						equipment={equipment.rings[2]}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: {
										rings: [
											equipment.rings[0],
											equipment.rings[1],
											{ ...equipment.rings[2], ...update },
										],
									},
								},
							})
						}
					/>
					<EquipmentRow
						label="Waist"
						equipment={equipment.waist}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: { waist: { ...equipment.waist, ...update } },
								},
							})
						}
					/>
					<EquipmentRow
						label="Feet"
						equipment={equipment.feet}
						updateEquipment={(update) =>
							updateCharacter({
								items: {
									equipment: { feet: { ...equipment.feet, ...update } },
								},
							})
						}
					/>
				</Box>
			</Box>

			<Box sx={{ mb: 2 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Items</SectionHeader>
					<IconButton onClick={addNewItem} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{items.map((i, index) => (
						<ItemRow
							key={i.name + index}
							item={i}
							updateItem={(update) => updateItem(update, index)}
							deleteItem={() => deleteItem(i)}
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}
