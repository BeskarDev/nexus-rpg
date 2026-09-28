import { useMemo } from 'react'
import { DropResult } from '@hello-pangea/dnd'
import { CharacterDocument, Item, Weapon } from '../../../../../types/Character'
import { ItemLocation } from '../../../../../types/ItemLocation'
import { DeepPartial } from '../../../CharacterSheetContainer'
import { characterSheetActions } from '../../../characterSheetReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useDerivedCharacter } from '../../../utils/deriveCharacter'

export const useItemManagement = (activeCharacter: CharacterDocument) => {
	const dispatch = useAppDispatch()

	const {
		coins,
		encumbrance,
		weapons = [],
		items = [],
		itemLocationVisibility,
	} = useMemo(() => activeCharacter.items, [activeCharacter.items])

	/*
		Every number here comes from `deriveCharacter`, the same derivation the print
		sheets read. This hook used to own two write-back effects (AV from worn armor,
		and `encumbrance.currentLoad`) and its own capacity formula; the stored copies
		are now mirrored once at the sheet's root by `useSyncDerivedCharacter`.
	*/
	const derived = useDerivedCharacter(activeCharacter)
	const { itemsByLocation } = derived
	const {
		current: currentLoad,
		carryCapacity,
		maxCapacity,
		byLocation,
	} = derived.load

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	// Action handlers
	const addNewWeapon = () => {
		dispatch(characterSheetActions.addNewWeapon())
	}

	const importWeapons = (weapons: Partial<Weapon>[]) => {
		dispatch(characterSheetActions.importWeapons(weapons))
	}

	const importEquipment = (equipment: Partial<Item>[]) => {
		dispatch(characterSheetActions.importItems(equipment))
	}

	const importEquipmentToLocation = (
		equipment: Partial<Item>[],
		location: ItemLocation,
	) => {
		if (location === 'worn') {
			// Use slot conflict resolution for worn items
			dispatch(
				characterSheetActions.importItemsWithSlotConflictResolution({
					items: equipment,
					location,
				}),
			)
		} else {
			// Use normal import for other locations
			dispatch(
				characterSheetActions.importItemsToLocation({
					items: equipment,
					location,
				}),
			)
		}
	}

	const updateWeapon = (update: Partial<Weapon>, index: number) => {
		dispatch(characterSheetActions.updateWeapon({ update, index }))
	}

	const deleteWeapon = (weapon: Weapon) => {
		dispatch(characterSheetActions.deleteWeapon(weapon))
	}

	const onWeaponReorder = ({ source, destination }: DropResult) => {
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
		if (!destination) return
		dispatch(
			characterSheetActions.reorderItem({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	const toggleLocationVisibility = (location: ItemLocation) => {
		dispatch(characterSheetActions.toggleItemLocationVisibility(location))
	}

	const addNewWeaponToLocation = (location: ItemLocation = 'worn') => {
		dispatch(characterSheetActions.addNewWeaponToLocation(location))
	}

	const addNewItemToLocation = (location: ItemLocation = 'carried') => {
		dispatch(characterSheetActions.addNewItemToLocation(location))
	}

	const getLocationLoad = (location: ItemLocation): number =>
		byLocation[location]

	return {
		// State
		coins,
		encumbrance,
		weapons,
		items,
		itemLocationVisibility,
		itemsByLocation,
		currentLoad,
		carryCapacity,
		maxCapacity,

		// Actions
		updateCharacter,
		addNewWeapon,
		importWeapons,
		importEquipment,
		importEquipmentToLocation,
		updateWeapon,
		deleteWeapon,
		onWeaponReorder,
		addNewItem,
		updateItem,
		deleteItem,
		onItemReorder,
		toggleLocationVisibility,
		addNewWeaponToLocation,
		addNewItemToLocation,
		getLocationLoad,
	}
}
