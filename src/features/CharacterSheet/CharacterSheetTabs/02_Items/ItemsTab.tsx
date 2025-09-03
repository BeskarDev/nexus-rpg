import React, { useState } from 'react'
import { Box } from '@mui/material'

import { Item, Weapon } from '../../../../types/Character'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { WeaponSearchDialog, EquipmentSearchDialog, MagicItemBuilderDialog } from './SearchDialog'
import { ItemsHeader, ItemsSettingsMenu, InventorySection } from './components'
import { useItemManagement } from './hooks'

export const ItemsTab: React.FC = () => {
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const dispatch = useAppDispatch()
	const [weaponSearchOpen, setWeaponSearchOpen] = useState(false)
	const [equipmentSearchOpen, setEquipmentSearchOpen] = useState(false)
	const [magicItemBuilderOpen, setMagicItemBuilderOpen] = useState(false)
	const [settingsMenuAnchor, setSettingsMenuAnchor] =
		useState<null | HTMLElement>(null)

	// Get Quick Ref selections
	const quickRefSelections = activeCharacter.skills.quickRefSelections || { 
		abilities: [], 
		weapons: [], 
		items: [], 
		spells: [] 
	}

	// Quick Ref handlers
	const handleToggleWeaponQuickRef = (weaponId: string) => {
		dispatch(characterSheetActions.toggleQuickRefWeapon(weaponId))
	}

	const handleToggleItemQuickRef = (itemId: string) => {
		dispatch(characterSheetActions.toggleQuickRefItem(itemId))
	}

	const handleCreateMagicItem = (item: Partial<Item> | Partial<Weapon>) => {
		if ('damage' in item && item.damage) {
			// It's a weapon
			dispatch(characterSheetActions.importWeapons([item as Partial<Weapon>]))
		} else {
			// It's an item
			dispatch(characterSheetActions.importItems([item as Partial<Item>]))
		}
	}

	const {
		coins,
		encumbrance,
		weapons,
		items,
		itemLocationVisibility,
		itemsByLocation,
		currentLoad,
		carryCapacity,
		maxCapacity,
		updateCharacter,
		importWeapons,
		importEquipment,
		updateWeapon,
		deleteWeapon,
		onItemReorder,
		updateItem,
		deleteItem,
		toggleLocationVisibility,
		addNewWeaponToLocation,
		addNewItemToLocation,
		getLocationLoad,
	} = useItemManagement(activeCharacter)

	const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setSettingsMenuAnchor(event.currentTarget)
	}

	const handleSettingsMenuClose = () => {
		setSettingsMenuAnchor(null)
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
			<ItemsHeader
				coins={coins}
				currentLoad={currentLoad}
				carryCapacity={carryCapacity}
				maxCapacity={maxCapacity}
				carryModifier={encumbrance.carryModifier}
				updateCharacter={updateCharacter}
			/>

			{/* Header with settings menu */}
			<ItemsSettingsMenu
				itemLocationVisibility={itemLocationVisibility}
				settingsMenuAnchor={settingsMenuAnchor}
				onSettingsMenuOpen={handleSettingsMenuOpen}
				onSettingsMenuClose={handleSettingsMenuClose}
				onToggleLocationVisibility={toggleLocationVisibility}
				onOpenMagicItemBuilder={() => setMagicItemBuilderOpen(true)}
			/>

			{/* Weapons Section */}
			{(itemLocationVisibility?.['worn'] ?? true) && (
				<InventorySection
					title="Weapons"
					location="worn"
					items={itemsByLocation['worn']}
					weapons={weapons}
					allItems={items}
					showWeaponsOnly
					showSearchButton
					helpTooltip="damage = base + (weapon * SL) + other, base = ½ STR (melee), ½ AGI (ranged), ½ SPI (mysticism), ½ MND (arcana)"
					onAddNewWeapon={() => addNewWeaponToLocation('worn')}
					onSearchClick={() => setWeaponSearchOpen(true)}
					onItemReorder={onItemReorder}
					updateWeapon={updateWeapon}
					deleteWeapon={deleteWeapon}
					updateItem={updateItem}
					deleteItem={deleteItem}
					weaponsInQuickRef={quickRefSelections.weapons}
					itemsInQuickRef={quickRefSelections.items}
					onToggleWeaponQuickRef={handleToggleWeaponQuickRef}
					onToggleItemQuickRef={handleToggleItemQuickRef}
				/>
			)}

			{/* Equipment Section */}
			{(itemLocationVisibility?.['worn'] ?? true) && (
				<InventorySection
					title="Equipment"
					location="worn"
					items={itemsByLocation['worn']}
					weapons={weapons}
					allItems={items}
					showItemsOnly
					onAddNewItem={() => addNewItemToLocation('worn')}
					onItemReorder={onItemReorder}
					updateWeapon={updateWeapon}
					deleteWeapon={deleteWeapon}
					updateItem={updateItem}
					deleteItem={deleteItem}
					weaponsInQuickRef={quickRefSelections.weapons}
					itemsInQuickRef={quickRefSelections.items}
					onToggleWeaponQuickRef={handleToggleWeaponQuickRef}
					onToggleItemQuickRef={handleToggleItemQuickRef}
				/>
			)}

			{/* Inventory Section */}
			{(itemLocationVisibility?.['carried'] ?? true) && (
				<InventorySection
					title="Inventory"
					location="carried"
					items={itemsByLocation['carried']}
					weapons={weapons}
					allItems={items}
					showSearchButton
					onAddNewItem={() => addNewItemToLocation('carried')}
					onSearchClick={() => setEquipmentSearchOpen(true)}
					onItemReorder={onItemReorder}
					updateWeapon={updateWeapon}
					deleteWeapon={deleteWeapon}
					updateItem={updateItem}
					deleteItem={deleteItem}
					weaponsInQuickRef={quickRefSelections.weapons}
					itemsInQuickRef={quickRefSelections.items}
					onToggleWeaponQuickRef={handleToggleWeaponQuickRef}
					onToggleItemQuickRef={handleToggleItemQuickRef}
				/>
			)}

			{/* Mount Section */}
			{(itemLocationVisibility?.['mount'] ?? true) && (
				<InventorySection
					title="On Mount"
					location="mount"
					items={itemsByLocation['mount']}
					weapons={weapons}
					allItems={items}
					showLoadDisplay
					currentLoad={getLocationLoad('mount')}
					maxLoad={encumbrance.mountMaxLoad || 0}
					locationName={itemsByLocation['mount'][0]?.mountInfo || ''}
					onAddNewItem={() => addNewItemToLocation('mount')}
					onItemReorder={onItemReorder}
					updateWeapon={updateWeapon}
					deleteWeapon={deleteWeapon}
					updateItem={updateItem}
					deleteItem={deleteItem}
					weaponsInQuickRef={quickRefSelections.weapons}
					itemsInQuickRef={quickRefSelections.items}
					onToggleWeaponQuickRef={handleToggleWeaponQuickRef}
					onToggleItemQuickRef={handleToggleItemQuickRef}
					onLocationNameChange={(name) => {
						itemsByLocation['mount'].forEach((item) => {
							if ('damage' in item) {
								updateWeapon(
									{ mountInfo: name },
									weapons.findIndex((w) => w.id === item.id),
								)
							} else {
								updateItem(
									{ mountInfo: name },
									items.findIndex((i) => i.id === item.id),
								)
							}
						})
					}}
					onMaxLoadChange={(maxLoad) => {
						updateCharacter({
							items: {
								encumbrance: { mountMaxLoad: maxLoad },
							},
						})
					}}
				/>
			)}

			{/* Storage Section */}
			{(itemLocationVisibility?.['storage'] ?? true) && (
				<InventorySection
					title="In Storage"
					location="storage"
					items={itemsByLocation['storage']}
					weapons={weapons}
					allItems={items}
					showLoadDisplay
					currentLoad={getLocationLoad('storage')}
					maxLoad={encumbrance.storageMaxLoad || 0}
					locationName={itemsByLocation['storage'][0]?.storageInfo || ''}
					onAddNewItem={() => addNewItemToLocation('storage')}
					onItemReorder={onItemReorder}
					updateWeapon={updateWeapon}
					deleteWeapon={deleteWeapon}
					updateItem={updateItem}
					deleteItem={deleteItem}
					weaponsInQuickRef={quickRefSelections.weapons}
					itemsInQuickRef={quickRefSelections.items}
					onToggleWeaponQuickRef={handleToggleWeaponQuickRef}
					onToggleItemQuickRef={handleToggleItemQuickRef}
					onLocationNameChange={(name) => {
						itemsByLocation['storage'].forEach((item) => {
							if ('damage' in item) {
								updateWeapon(
									{ storageInfo: name },
									weapons.findIndex((w) => w.id === item.id),
								)
							} else {
								updateItem(
									{ storageInfo: name },
									items.findIndex((i) => i.id === item.id),
								)
							}
						})
					}}
					onMaxLoadChange={(maxLoad) => {
						updateCharacter({
							items: {
								encumbrance: { storageMaxLoad: maxLoad },
							},
						})
					}}
				/>
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

			<MagicItemBuilderDialog
				open={magicItemBuilderOpen}
				onClose={() => setMagicItemBuilderOpen(false)}
				onCreateItem={handleCreateMagicItem}
				character={activeCharacter}
			/>
		</Box>
	)
}
