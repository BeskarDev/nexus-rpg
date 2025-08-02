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
			'worn': [],
			'carried': [],
			'mount': [],
			'storage': []
		}

		// Add weapons to their locations (with fallback for existing data without location)
		weapons.forEach((weapon) => {
			let location: ItemLocation
			// Migration logic for existing data
			if (weapon.location) {
				// Map old location names to new ones
				switch (weapon.location) {
					case 'weapons':
					case 'Equipped Weapons':
						location = 'worn'
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
						location = weapon.location as ItemLocation
				}
			} else {
				location = 'worn' // Default for weapons without location
			}
			organized[location].push(weapon)
		})

		// Add items to their locations (with fallback for existing data without location)
		items.forEach((item) => {
			let location: ItemLocation
			
			// Migration logic for existing data
			if (item.location) {
				// Map old location names to new ones
				switch (item.location) {
					case 'weapons':
					case 'Equipped Weapons':
						location = 'worn'
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
		
		// Count weapons from worn and carried items
		const carriedWeapons = [
			...itemsByLocation['worn'].filter(item => 'damage' in item),
			...itemsByLocation['carried'].filter(item => 'damage' in item)
		] as Weapon[]
		
		const weaponLoad = carriedWeapons
			.map((w) => w.load)
			.reduce((partialSum, a) => partialSum + a, 0)
		
		// Count items from worn and carried items
		const carriedItems = [
			...itemsByLocation['worn'].filter(item => !('damage' in item)),
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
	const addNewWeaponToLocation = (location: ItemLocation = 'worn') => {
		dispatch(characterSheetActions.addNewWeaponToLocation(location))
	}

	const addNewItemToLocation = (location: ItemLocation = 'carried') => {
		dispatch(characterSheetActions.addNewItemToLocation(location))
	}

	const getLoadColor = (theme: Theme) => {
		if (currentLoad >= maxCapacity) {
			return theme.palette.error.main
		} else if (currentLoad >= carryCapacity) {
			return theme.palette.warning.main
		}
		return theme.palette.text.primary
	}

	// Calculate load for a specific location
	const calculateLocationLoad = (location: ItemLocation): number => {
		const locationItems = itemsByLocation[location]
		const weaponLoad = locationItems
			.filter(item => 'damage' in item)
			.map((w) => (w as Weapon).load)
			.reduce((sum, load) => sum + load, 0)
		
		const itemLoad = locationItems
			.filter(item => !('damage' in item))
			.map((i) => (i as Item).load * (i as Item).amount)
			.reduce((sum, load) => sum + load, 0)
		
		return weaponLoad + itemLoad
	}

	// Component for displaying location load info
	const LocationLoadDisplay: React.FC<{ 
		location: ItemLocation, 
		name: string, 
		currentLoad: number, 
		maxLoad: number,
		onNameChange: (name: string) => void,
		onMaxLoadChange: (maxLoad: number) => void 
	}> = ({ location, name, currentLoad, maxLoad, onNameChange, onMaxLoadChange }) => {
		const getLoadColor = (theme: Theme) => {
			if (maxLoad > 0) {
				if (currentLoad >= maxLoad) {
					return theme.palette.error.main
				} else if (currentLoad >= maxLoad * 0.8) {
					return theme.palette.warning.main
				}
			}
			return theme.palette.text.primary
		}

		return (
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
				<AttributeField
					size="small"
					value={name}
					onChange={(event) => onNameChange(event.target.value)}
					label={location === 'mount' ? 'Mount Name' : 'Storage Name'}
					sx={{ maxWidth: '10rem' }}
				/>
				<AttributeField
					disabled
					size="small"
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
					value={maxLoad}
					onChange={(event) => onMaxLoadChange(Number(event.target.value))}
					label="Max Load"
					sx={{ maxWidth: '6rem' }}
				/>
			</Box>
		)
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
					<MenuItem dense>
						<FormControlLabel
							control={
								<Checkbox
									checked={itemLocationVisibility?.['worn'] ?? true}
									onChange={() => {
										toggleLocationVisibility('worn')
									}}
									size="small"
								/>
							}
							label="Weapons & Equipment"
							sx={{ width: '100%', margin: 0 }}
						/>
					</MenuItem>
					<MenuItem dense>
						<FormControlLabel
							control={
								<Checkbox
									checked={itemLocationVisibility?.['carried'] ?? true}
									onChange={() => {
										toggleLocationVisibility('carried')
									}}
									size="small"
								/>
							}
							label="Inventory"
							sx={{ width: '100%', margin: 0 }}
						/>
					</MenuItem>
					<MenuItem dense>
						<FormControlLabel
							control={
								<Checkbox
									checked={itemLocationVisibility?.['mount'] ?? true}
									onChange={() => {
										toggleLocationVisibility('mount')
									}}
									size="small"
								/>
							}
							label="On Mount"
							sx={{ width: '100%', margin: 0 }}
						/>
					</MenuItem>
					<MenuItem dense>
						<FormControlLabel
							control={
								<Checkbox
									checked={itemLocationVisibility?.['storage'] ?? true}
									onChange={() => {
										toggleLocationVisibility('storage')
									}}
									size="small"
								/>
							}
							label="In Storage"
							sx={{ width: '100%', margin: 0 }}
						/>
					</MenuItem>
				</Menu>
			</Box>
			
			{/* Categorized inventory sections */}
			{/* Weapons Section (from worn location) */}
			{(itemLocationVisibility?.['worn'] ?? true) && (
				<Accordion 
					key="weapons-section"
					defaultExpanded 
					sx={{ flexGrow: 1, mb: 1 }}
				>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<SectionHeader sx={{ mb: 0 }}>Weapons</SectionHeader>
							<Tooltip title="damage = base + (weapon * SL) + other, base = ½ STR (melee), ½ AGI (ranged), ½ SPI (mysticism), ½ MND (arcana)">
								<HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
							</Tooltip>
							<IconButton
								size="small"
								onClick={(event) => {
									addNewWeaponToLocation('worn')
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
					<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
						<DynamicList 
							droppableId="items-weapons" 
							onDragEnd={onItemReorder}
						>
							{itemsByLocation['worn'].filter(item => 'damage' in item).map((weapon, index) => (
								<DynamicListItem
									key={weapon.id}
									id={weapon.id}
									index={index}
									sx={{ alignItems: 'baseline' }}
								>
									<WeaponRow
										key={weapon.id}
										weapon={weapon as Weapon}
										updateWeapon={(update) => updateWeapon(update, weapons.findIndex(w => w.id === weapon.id))}
										deleteWeapon={() => deleteWeapon(weapon as Weapon)}
									/>
								</DynamicListItem>
							))}
						</DynamicList>
					</AccordionDetails>
				</Accordion>
			)}

			{/* Equipment Section (non-weapon items from worn location) */}
			{(itemLocationVisibility?.['worn'] ?? true) && (
				<Accordion 
					key="equipment-section"
					defaultExpanded 
					sx={{ flexGrow: 1, mb: 1 }}
				>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<SectionHeader sx={{ mb: 0 }}>Equipment</SectionHeader>
							<IconButton
								size="small"
								onClick={(event) => {
									addNewItemToLocation('worn')
									event.stopPropagation()
								}}
								sx={{ mb: 0.75 }}
							>
								<AddCircle />
							</IconButton>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
						<DynamicList 
							droppableId="items-equipment" 
							onDragEnd={onItemReorder}
						>
							{itemsByLocation['worn'].filter(item => !('damage' in item)).map((item, index) => (
								<DynamicListItem
									key={item.id}
									id={item.id}
									index={index}
									sx={{ alignItems: 'baseline' }}
								>
									<ItemRow
										key={item.id}
										item={item as Item}
										updateItem={(update) => updateItem(update, items.findIndex(i => i.id === item.id))}
										deleteItem={() => deleteItem(item as Item)}
									/>
								</DynamicListItem>
							))}
						</DynamicList>
					</AccordionDetails>
				</Accordion>
			)}

			{/* Inventory Section (carried items) */}
			{(itemLocationVisibility?.['carried'] ?? true) && (
				<Accordion 
					key="inventory-section"
					defaultExpanded 
					sx={{ flexGrow: 1, mb: 1 }}
				>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<SectionHeader sx={{ mb: 0 }}>Inventory</SectionHeader>
							<IconButton
								size="small"
								onClick={(event) => {
									addNewItemToLocation('carried')
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
					<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
						<DynamicList 
							droppableId="items-carried" 
							onDragEnd={onItemReorder}
						>
							{itemsByLocation['carried'].map((item, index) => (
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
			)}

			{/* Mount Section */}
			{(itemLocationVisibility?.['mount'] ?? true) && (
				<Accordion 
					key="mount-section"
					defaultExpanded 
					sx={{ flexGrow: 1, mb: 1 }}
				>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<SectionHeader sx={{ mb: 0 }}>On Mount</SectionHeader>
							<IconButton
								size="small"
								onClick={(event) => {
									addNewItemToLocation('mount')
									event.stopPropagation()
								}}
								sx={{ mb: 0.75 }}
							>
								<AddCircle />
							</IconButton>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
						<LocationLoadDisplay
							location="mount"
							name={itemsByLocation['mount'][0]?.mountInfo || ''}
							currentLoad={calculateLocationLoad('mount')}
							maxLoad={0} // TODO: Add mount max load to character data
							onNameChange={(name) => {
								// Update all items in this location with the new mount name
								itemsByLocation['mount'].forEach((item) => {
									if ('damage' in item) {
										updateWeapon({ mountInfo: name }, weapons.findIndex(w => w.id === item.id))
									} else {
										updateItem({ mountInfo: name }, items.findIndex(i => i.id === item.id))
									}
								})
							}}
							onMaxLoadChange={(maxLoad) => {
								// TODO: Add mount max load storage to character data
							}}
						/>
						<DynamicList 
							droppableId="items-mount" 
							onDragEnd={onItemReorder}
						>
							{itemsByLocation['mount'].map((item, index) => (
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
			)}

			{/* Storage Section */}
			{(itemLocationVisibility?.['storage'] ?? true) && (
				<Accordion 
					key="storage-section"
					defaultExpanded 
					sx={{ flexGrow: 1, mb: 1 }}
				>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<SectionHeader sx={{ mb: 0 }}>In Storage</SectionHeader>
							<IconButton
								size="small"
								onClick={(event) => {
									addNewItemToLocation('storage')
									event.stopPropagation()
								}}
								sx={{ mb: 0.75 }}
							>
								<AddCircle />
							</IconButton>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
						<LocationLoadDisplay
							location="storage"
							name={itemsByLocation['storage'][0]?.storageInfo || ''}
							currentLoad={calculateLocationLoad('storage')}
							maxLoad={0} // TODO: Add storage max load to character data
							onNameChange={(name) => {
								// Update all items in this location with the new storage name
								itemsByLocation['storage'].forEach((item) => {
									if ('damage' in item) {
										updateWeapon({ storageInfo: name }, weapons.findIndex(w => w.id === item.id))
									} else {
										updateItem({ storageInfo: name }, items.findIndex(i => i.id === item.id))
									}
								})
							}}
							onMaxLoadChange={(maxLoad) => {
								// TODO: Add storage max load storage to character data
							}}
						/>
						<DynamicList 
							droppableId="items-storage" 
							onDragEnd={onItemReorder}
						>
							{itemsByLocation['storage'].map((item, index) => (
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
			)}

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

