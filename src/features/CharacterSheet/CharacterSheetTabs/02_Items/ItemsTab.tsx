import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	Theme,
	Tooltip,
} from '@mui/material'
import React, { useMemo, useState } from 'react'

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
		if (currentLoad >= encumbrance.overencumberedAt) {
			return theme.palette.error.main
		} else if (currentLoad >= encumbrance.encumberedAt) {
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
						maxWidth: '7rem',
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
					value={encumbrance.encumberedAt}
					onChange={(event) =>
						updateCharacter({
							items: {
								encumbrance: { encumberedAt: Number(event.target.value) },
							},
						})
					}
					label="Encumbered"
					helperText="STR + 6"
					sx={{
						maxWidth: '5rem',
					}}
				/>
				<AttributeField
					type="number"
					size="small"
					value={encumbrance.overencumberedAt}
					onChange={(event) =>
						updateCharacter({
							items: {
								encumbrance: { overencumberedAt: Number(event.target.value) },
							},
						})
					}
					label="Overencumbered"
					helperText="2 * STR + 6"
					sx={{
						maxWidth: '6rem',
					}}
				/>
				<Tooltip
					title={
						<>
							<b>Encumbered.</b> You suffer +1 bane on Strength or Agility rolls
							for movement, such as climbing or swimming, and during travel. You
							also can’t take the Dash Action or the Evade Quick Action.
							<br />
							<b>Over-Encumbered.</b> You can‘t move. You can‘t use any Actions
							or do any rolls for physical activity.
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
