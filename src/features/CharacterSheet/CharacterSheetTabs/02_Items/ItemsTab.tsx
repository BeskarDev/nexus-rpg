import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	Theme,
	Tooltip,
	Menu,
	MenuItem,
	FormControlLabel,
	Checkbox,
} from '@mui/material'
import React, { useMemo, useState, useEffect } from 'react'

import { AddCircle, ExpandMore, HelpOutline, Search, Build } from '@mui/icons-material'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Item, Weapon } from '../../../../types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '../../../../types/ItemLocation'
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
	const { coins, encumbrance, weapons, items, itemLocationVisibility } = useMemo(
		() => activeCharacter.items,
		[activeCharacter.items],
	)
	const [weaponSearchOpen, setWeaponSearchOpen] = useState(false)
	const [equipmentSearchOpen, setEquipmentSearchOpen] = useState(false)
	const [settingsMenuAnchor, setSettingsMenuAnchor] = useState<null | HTMLElement>(null)

	// Organize items and weapons by location
	const itemsByLocation = useMemo(() => {
		const organized: Record<ItemLocation, (Item | Weapon)[]> = {
			'weapons': [],
			'worn': [],
			'carried': [],
			'mount': [],
			'storage': []
		}

		// Add weapons to their locations (with fallback for existing data without location)
		weapons.forEach((weapon) => {
			const location = weapon.location || 'weapons'
			organized[location].push(weapon)
		})

		// Add items to their locations (with fallback for existing data without location)
		items.forEach((item) => {
			let location: ItemLocation
			
			// Migration logic for existing data
			if (item.location) {
				// Map old location names to new ones
				switch (item.location) {
					case 'Equipped Weapons':
						location = 'weapons'
						break
					case 'Equipped Gear':
						location = 'worn'
						break
					case 'Carried Items':
						location = 'carried'
						break
					case 'On Mount':
						location = 'mount'
						break
					case 'In Storage':
						location = 'storage'
						break
					default:
						location = item.location as ItemLocation
				}
			} else if (item.container === 'worn') {
				location = 'worn'
			} else {
				location = 'carried'
			}
			
			organized[location].push(item)
		})

		return organized
	}, [weapons, items])

	// Auto-update AV values when armor, helmet, or shield items change
	useEffect(() => {
		let armorAV = 0
		let helmetAV = 0
		let shieldAV = 0

		// Check equipped gear for armor and helmet
		const equippedGear = itemsByLocation['worn'] as Item[]
		equippedGear.forEach((item) => {
			if (item.properties) {
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

		// Check equipped weapons for shields
		const equippedWeapons = itemsByLocation['weapons'] as Weapon[]
		equippedWeapons.forEach((weapon) => {
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
	}, [itemsByLocation, activeCharacter.statistics.av])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const currentLoad: number = useMemo(() => {
		// Only count items and weapons that are carried (not on mount or in storage)
		let totalLoad = 0
		
		// Count weapons from equipped weapons and carried items
		const carriedWeapons = [
			...itemsByLocation['weapons'],
			...itemsByLocation['carried'].filter(item => 'damage' in item)
		] as Weapon[]
		
		const weaponLoad = carriedWeapons
			.map((w) => w.load)
			.reduce((partialSum, a) => partialSum + a, 0)
		
		// Count items from equipped gear and carried items
		const carriedItems = [
			...itemsByLocation['worn'],
			...itemsByLocation['carried'].filter(item => !('damage' in item))
		] as Item[]
		
		const itemLoad = carriedItems
			.map((i) => i.load * i.amount)
			.reduce((partialSum, a) => partialSum + a, 0)
		
		const newCurrentLoad = weaponLoad + itemLoad
		if (newCurrentLoad != encumbrance.currentLoad) {
			updateCharacter({
				items: { encumbrance: { currentLoad: newCurrentLoad } },
			})
		}
		return newCurrentLoad
	}, [itemsByLocation, encumbrance.currentLoad])

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

	// Location toggle functions
	const toggleLocationVisibility = (location: ItemLocation) => {
		dispatch(characterSheetActions.toggleItemLocationVisibility(location))
	}

	const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setSettingsMenuAnchor(event.currentTarget)
	}

	const handleSettingsMenuClose = () => {
		setSettingsMenuAnchor(null)
	}

	// Add new items to specific locations
	const addNewWeaponToLocation = (location: ItemLocation = 'weapons') => {
		dispatch(characterSheetActions.addNewWeapon())
		// The weapon will be created with the default location
	}

	const addNewItemToLocation = (location: ItemLocation = 'carried') => {
		dispatch(characterSheetActions.addNewItem())
		// The item will be created with the default location
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
				flexDirection: 'column',
				maxWidth: '65rem',
			}}
		>
			{/* Header with coins and load info */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					mb: 2,
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
							- You can't take the Dash Action or the Evade Quick Action
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

			{/* Header with settings menu */}
			<Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
				<SectionHeader sx={{ mb: 0}}>
					Items & Equipment
				</SectionHeader>
				<Tooltip title="toggle inventory categories">
					<IconButton
						size="small"
						onClick={handleSettingsMenuOpen}
						sx={{ 
							border: '1px solid',
							borderColor: 'divider',
						}}
					>
						<Build fontSize="inherit" />
					</IconButton>
				</Tooltip>
				
				<Menu
					anchorEl={settingsMenuAnchor}
					open={Boolean(settingsMenuAnchor)}
					onClose={handleSettingsMenuClose}
					transformOrigin={{ horizontal: 'left', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
				>
					{ITEM_LOCATIONS.map((location) => {
						const isVisible = itemLocationVisibility?.[location] ?? true
						return (
							<MenuItem key={location} dense>
								<FormControlLabel
									control={
										<Checkbox
											checked={isVisible}
											onChange={() => {
												toggleLocationVisibility(location)
											}}
											size="small"
										/>
									}
									label={location}
									sx={{ width: '100%', margin: 0 }}
								/>
							</MenuItem>
						)
					})}
				</Menu>
			</Box>
			
			{/* Categorized inventory sections */}
			{ITEM_LOCATIONS.map((location) => {
				const locationItems = itemsByLocation[location]
				const isVisible = itemLocationVisibility?.[location] ?? true
				
				if (!isVisible) {
					return null
				}

				// Define location display names and headers
				const getLocationDisplayName = (loc: ItemLocation) => {
					switch (loc) {
						case 'weapons': return 'Weapons'
						case 'worn': return 'Worn Equipment'
						case 'carried': return 'Carried Items'
						case 'mount': return 'On Mount'
						case 'storage': return 'In Storage'
						default: return loc
					}
				}
				
				return (
					<Accordion 
						key={location}
						defaultExpanded 
						sx={{ flexGrow: 1, mb: 1 }}
					>
						<AccordionSummary expandIcon={<ExpandMore />}>
							<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
								<SectionHeader sx={{ mb: 0 }}>{getLocationDisplayName(location)}</SectionHeader>
								{location === 'weapons' && (
									<>
										<Tooltip title="damage = base + (weapon * SL) + other, base = ½ STR (melee), ½ AGI (ranged), ½ SPI (mysticism), ½ MND (arcana)">
											<HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
										</Tooltip>
										<IconButton
											size="small"
											onClick={(event) => {
												addNewWeaponToLocation('weapons')
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
									</>
								)}
								{location !== 'weapons' && (
									<>
										<IconButton
											size="small"
											onClick={(event) => {
												addNewItemToLocation(location)
												event.stopPropagation()
											}}
											sx={{ mb: 0.75 }}
										>
											<AddCircle />
										</IconButton>
										{location === 'worn' && (
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
										)}
									</>
								)}
							</Box>
						</AccordionSummary>
						<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
							<DynamicList 
								droppableId={`items-${location}`} 
								onDragEnd={onItemReorder}
							>
								{locationItems.map((item, index) => (
									<DynamicListItem
										key={item.id}
										id={item.id}
										index={index}
										sx={{ alignItems: 'baseline' }}
									>
										{'damage' in item ? (
											<WeaponRow
												key={item.id}
												weapon={item as Weapon}
												updateWeapon={(update) => updateWeapon(update, weapons.findIndex(w => w.id === item.id))}
												deleteWeapon={() => deleteWeapon(item as Weapon)}
											/>
										) : (
											<ItemRow
												key={item.id}
												item={item as Item}
												updateItem={(update) => updateItem(update, items.findIndex(i => i.id === item.id))}
												deleteItem={() => deleteItem(item as Item)}
											/>
										)}
									</DynamicListItem>
								))}
							</DynamicList>
						</AccordionDetails>
					</Accordion>
				)
			})}

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

