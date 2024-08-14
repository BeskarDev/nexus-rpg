import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	Theme,
	Tooltip,
} from '@mui/material'
import React, { useMemo } from 'react'

import { AddCircle, ExpandMore, HelpOutline } from '@mui/icons-material'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Item, Weapon } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'

import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { EquipmentRow } from './EquipmentRow'
import { ItemRow } from './ItemRow'
import { WeaponRow } from './WeaponRow'

export const ItemsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { coins, encumbrance, weapons, equipment, items } = useMemo(
		() => activeCharacter.items,
		[activeCharacter.items],
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

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
		const newCurrentLoad = weaponLoad + equipmentLoad + itemLoad
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
		return theme.palette.common.white
	}

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
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
					helperText="STR + 4"
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
					helperText="2 * STR + 4"
					sx={{
						maxWidth: '6rem',
					}}
				/>
				<Tooltip
					title={
						<>
							<b>Encumbered.</b> You suffer +1 bane on Strength or Agility rolls
							for movement, such as climbing or swimming, and during travel.
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

			<Accordion sx={{ maxWidth: '65rem', flexGrow: 1, mb: 1 }}>
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
							onClick={(event) => {
								addNewWeapon()
								event.stopPropagation()
							}}
							sx={{ mb: 0.75 }}
						>
							<AddCircle />
						</IconButton>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					<DynamicList droppableId="weapons" onDragEnd={onWeaponReorder}>
						{weapons.map((w, index) => (
							<DynamicListItem key={w.id} id={w.id} index={index}>
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

			<Accordion sx={{ maxWidth: '31rem', flexGrow: 1, mb: 2 }}>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<SectionHeader>Equipment</SectionHeader>
				</AccordionSummary>
				<AccordionDetails
					sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
				>
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
				</AccordionDetails>
			</Accordion>

			<Accordion sx={{ maxWidth: '38rem', flexGrow: 1, mb: 2 }}>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
						<SectionHeader>Items</SectionHeader>
						<IconButton
							onClick={(event) => {
								addNewItem()
								event.stopPropagation()
							}}
							sx={{ mb: 0.75 }}
						>
							<AddCircle />
						</IconButton>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					<DynamicList droppableId="items" onDragEnd={onItemReorder}>
						{items.map((i, index) => (
							<DynamicListItem key={i.id} id={i.id} index={index}>
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
		</Box>
	)
}
