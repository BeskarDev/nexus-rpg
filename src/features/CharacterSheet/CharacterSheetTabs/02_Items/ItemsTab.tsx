import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	Theme,
	Tooltip,
} from '@mui/material'
import React, { useMemo, useState, useEffect } from 'react'

import { AddCircle, ExpandMore, HelpOutline, Search } from '@mui/icons-material'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Item, Weapon } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'

import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { ItemRow } from './ItemRow'
import { WeaponRow } from './WeaponRow'
import { WeaponSearchDialog, EquipmentSearchDialog } from './SearchDialog'

export const ItemsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { coins, encumbrance, weapons, items } = useMemo(
		() => activeCharacter.items,
		[activeCharacter.items],
	)
	const [weaponSearchOpen, setWeaponSearchOpen] = useState(false)
	const [equipmentSearchOpen, setEquipmentSearchOpen] = useState(false)

	// Auto-update AV values when armor, helmet, or shield items change
	useEffect(() => {
		let armorAV = 0
		let helmetAV = 0
		let shieldAV = 0

		// Check worn equipment for armor and helmet
		items.forEach((item) => {
			if (item.container === 'worn' && item.properties) {
				// Look for both "AV +X" and "+X AV" patterns
				const avMatch = item.properties.match(/(?:AV\s*\+(\d+)|\+(\d+)\s*AV)/i)
				if (avMatch) {
					const av = parseInt(avMatch[1] || avMatch[2])
					if (item.slot === 'body') {
						armorAV = av
					} else if (item.slot === 'head') {
						helmetAV = av
					}
				}
			}
		})

		// Check weapons for shields
		weapons.forEach((weapon) => {
			if (weapon.properties) {
				// Look for shield indicators in properties or name
				const isShield =
					weapon.properties.toLowerCase().includes('shield') ||
					weapon.name.toLowerCase().includes('shield')

				if (isShield) {
					// Look for both "AV +X" and "+X AV" patterns
					const avMatch = weapon.properties.match(
						/(?:AV\s*\+(\d+)|\+(\d+)\s*AV)/i,
					)
					if (avMatch) {
						shieldAV = parseInt(avMatch[1] || avMatch[2])
					}
				}
			}
		})

		// Update AV values if they changed
		const currentAV = activeCharacter.statistics.av
		if (
			currentAV.armor !== armorAV ||
			currentAV.helmet !== helmetAV ||
			currentAV.shield !== shieldAV
		) {
			dispatch(
				characterSheetActions.updateCharacter({
					statistics: {
						av: {
							armor: armorAV,
							helmet: helmetAV,
							shield: shieldAV,
						},
					},
				}),
			)
		}
	}, [items, weapons, activeCharacter.statistics.av])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const currentLoad: number = useMemo(() => {
		const weaponLoad = weapons
			.map((w) => w.load)
			.reduce((partialSum, a) => partialSum + a, 0)
		const itemLoad = items
			.map((i) => i.load * i.amount)
			.reduce((partialSum, a) => partialSum + a, 0)
		const newCurrentLoad = weaponLoad + itemLoad
		if (newCurrentLoad != encumbrance.currentLoad) {
			updateCharacter({
				items: { encumbrance: { currentLoad: newCurrentLoad } },
			})
		}
		return newCurrentLoad
	}, [activeCharacter])

	const carryCapacity = useMemo(
		() =>
			{
        console.log('Calculating carry capacity:', {
          strength: activeCharacter.statistics.strength.value,
          carryModifier: encumbrance.carryModifier,
        })
        const result = Number(activeCharacter.statistics.strength.value) / 2 +
          8 +
          Number(encumbrance.carryModifier || 0)
        console.log('Carry capacity:', result)
        return result
      },
		[activeCharacter.statistics.strength, encumbrance.carryModifier],
	)

	const maxCapacity = useMemo(
		() => carryCapacity * 2,
		[carryCapacity],
	)

	const addNewWeapon = () => {
		dispatch(characterSheetActions.addNewWeapon())
	}

	const importWeapons = (weapons: Partial<Weapon>[]) => {
		dispatch(characterSheetActions.importWeapons(weapons))
	}

	const importEquipment = (equipment: Partial<Item>[]) => {
		dispatch(characterSheetActions.importItems(equipment))
	}

	const updateWeapon = (update: Partial<Weapon>, index: number) => {
		dispatch(characterSheetActions.updateWeapon({ update, index }))
	}

	const deleteWeapon = (weapon: Weapon) => {
		dispatch(characterSheetActions.deleteWeapon(weapon))
	}

	const onWeaponReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		dispatch(
			characterSheetActions.reorderWeapon({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	const addNewItem = () => {
		dispatch(characterSheetActions.addNewItem())
	}

	const updateItem = (update: Partial<Item>, index: number) => {
		dispatch(characterSheetActions.updateItem({ update, index }))
	}

	const deleteItem = (item: Item) => {
		dispatch(characterSheetActions.deleteItem(item))
	}

	const onItemReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		dispatch(
			characterSheetActions.reorderItem({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	const getLoadColor = (theme: Theme) => {
		if (currentLoad >= maxCapacity) {
			return theme.palette.error.main
		} else if (currentLoad >= carryCapacity) {
			return theme.palette.warning.main
		}
		return theme.palette.text.primary
	}

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
				maxWidth: '47rem',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					mb: 1,
					columnGap: 1,
				}}
			>
				<AttributeField
					type="number"
					size="medium"
					value={coins}
					onChange={(event) =>
						updateCharacter({ items: { coins: Number(event.target.value) } })
					}
					label="Coins"
					sx={{
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
					disabled
					size="medium"
					value={currentLoad}
					label="Current Load"
					sx={{
						maxWidth: '6rem',
						'& .MuiFormLabel-root.MuiInputLabel-root.Mui-disabled': {
							color: (theme) => getLoadColor(theme),
						},
						'& .MuiOutlinedInput-root': {
							'& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
								color: (theme) => getLoadColor(theme),
								['-webkit-text-fill-color']: (theme) => getLoadColor(theme),
							},
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: (theme) => getLoadColor(theme),
								borderWidth: '2px',
							},
						},
					}}
				/>
				<AttributeField
					type="number"
					size="small"
					value={carryCapacity}
					disabled
					label="Carry Capacity"
					helperText="½ STR + 8"
					sx={{
						maxWidth: '6rem',
					}}
				/>
				<AttributeField
					type="number"
					size="small"
					value={encumbrance.carryModifier}
					onChange={(event) =>
						updateCharacter({
							items: {
								encumbrance: { carryModifier: Number(event.target.value) },
							},
						})
					}
					label="Mod"
					helperText=" "
					sx={{
						maxWidth: '3.5rem',
					}}
				/>
				<AttributeField
					type="number"
					size="small"
					value={maxCapacity}
					disabled
					label="Max"
					helperText=" "
					sx={{
						maxWidth: '3.5rem',
					}}
				/>
				<Tooltip
					title={
						<>
							<b>Encumbered.</b> While encumbered, you suffer the following
							effects:
							<br />
							- You suffer +1 bane on Strength/Agility rolls for any kind of
							movement (climbing, swimming, jumping, …)
							<br />
							- You can’t take the Dash Action or the Evade Quick Action
							<br />- Whenever you suffer Fatigue during travel, you suffer +1
							Fatigue
							<br />
							You can never physically carry more than 2 x your carrying
							capacity.
						</>
					}
				>
					<HelpOutline fontSize="small" sx={{ mt: 1, mb: 'auto' }} />
				</Tooltip>
			</Box>

			<Box sx={{ width: '100%', flexGrow: 1 }} />

			<Accordion defaultExpanded sx={{ maxWidth: '65rem', flexGrow: 1, mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMore />}>
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
						<IconButton
							size="small"
							onClick={(event) => {
								addNewWeapon()
								event.stopPropagation()
							}}
							sx={{ mb: 0.75 }}
						>
							<AddCircle />
						</IconButton>
						<Tooltip title="Search weapons from database">
							<IconButton
								size="small"
								onClick={(event) => {
									setWeaponSearchOpen(true)
									event.stopPropagation()
								}}
								sx={{ ml: -1, mb: 0.75 }}
							>
								<Search />
							</IconButton>
						</Tooltip>
					</Box>
				</AccordionSummary>
				<AccordionDetails
					sx={{ overflowY: 'auto', maxHeight: { sm: '20vh', sx: '35vh' } }}
				>
					<DynamicList droppableId="weapons" onDragEnd={onWeaponReorder}>
						{weapons.map((w, index) => (
							<DynamicListItem
								key={w.id}
								id={w.id}
								index={index}
								sx={{ alignItems: 'baseline' }}
							>
								<WeaponRow
									key={w.id}
									weapon={w}
									updateWeapon={(update) => updateWeapon(update, index)}
									deleteWeapon={() => deleteWeapon(w)}
								/>
							</DynamicListItem>
						))}
					</DynamicList>
				</AccordionDetails>
			</Accordion>

			<Box sx={{ width: '100%', flexGrow: 1 }} />

			<Accordion defaultExpanded sx={{ maxWidth: '65rem', flexGrow: 1, mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							alignItems: 'center',
						}}
					>
						<SectionHeader>Equipment & Items</SectionHeader>
						<IconButton
							size="small"
							onClick={(event) => {
								addNewItem()
								event.stopPropagation()
							}}
							sx={{ mb: 0.75 }}
						>
							<AddCircle />
						</IconButton>
						<Tooltip title="Search Equipment & Items">
							<IconButton
								size="small"
								onClick={(event) => {
									setEquipmentSearchOpen(true)
									event.stopPropagation()
								}}
								sx={{ ml: -1, mb: 0.75 }}
							>
								<Search />
							</IconButton>
						</Tooltip>
					</Box>
				</AccordionSummary>
				<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '42.5vh' }}>
					<DynamicList droppableId="items" onDragEnd={onItemReorder}>
						{items.map((i, index) => (
							<DynamicListItem
								key={i.id}
								id={i.id}
								index={index}
								sx={{ alignItems: 'baseline' }}
							>
								<ItemRow
									key={i.id}
									item={i}
									updateItem={(update) => updateItem(update, index)}
									deleteItem={() => deleteItem(i)}
								/>
							</DynamicListItem>
						))}
					</DynamicList>
				</AccordionDetails>
			</Accordion>

			<WeaponSearchDialog
				open={weaponSearchOpen}
				onClose={() => setWeaponSearchOpen(false)}
				onImportWeapons={importWeapons}
				character={activeCharacter}
			/>

			<EquipmentSearchDialog
				open={equipmentSearchOpen}
				onClose={() => setEquipmentSearchOpen(false)}
				onImportEquipment={importEquipment}
				character={activeCharacter}
			/>
		</Box>
	)
}
