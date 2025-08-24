import { useMemo, useEffect } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Item, Weapon } from '../../../../../types/Character'
import { ItemLocation } from '../../../../../types/ItemLocation'
import { DeepPartial } from '../../../CharacterSheetContainer'
import { characterSheetActions } from '../../../characterSheetReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {
	organizeItemsByLocation,
	calculateCurrentLoad,
	extractArmorValues,
	OrganizedItems,
	calculateLocationLoad,
} from '../utils/itemUtils'
import { logger } from '../../../utils'

export const useItemManagement = (activeCharacter: CharacterDocument) => {
	const dispatch = useAppDispatch()

	const {
		coins,
		encumbrance,
		weapons = [],
		items = [],
		itemLocationVisibility,
	} = useMemo(() => activeCharacter.items, [activeCharacter.items])

	// Organize items and weapons by location
	const itemsByLocation = useMemo(
		() => organizeItemsByLocation(weapons, items),
		[weapons, items],
	)

	// Auto-update AV values when armor, helmet, or shield items change
	useEffect(() => {
		const { armorAV, helmetAV, shieldAV } = extractArmorValues(itemsByLocation)

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
							armor: armorAV ?? currentAV.armor,
							helmet: helmetAV ?? currentAV.helmet,
							shield: shieldAV ?? currentAV.shield,
						},
					},
				}),
			)
		}
	}, [itemsByLocation])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const currentLoad: number = useMemo(() => {
		const newCurrentLoad = calculateCurrentLoad(itemsByLocation)
		if (newCurrentLoad !== encumbrance.currentLoad) {
			updateCharacter({
				items: { encumbrance: { currentLoad: newCurrentLoad } },
			})
		}
		return newCurrentLoad
	}, [itemsByLocation, encumbrance.currentLoad])

	const carryCapacity = useMemo(() => {
		logger.debug('Calculating carry capacity:', {
			strength: activeCharacter.statistics.strength.value,
			carryModifier: encumbrance.carryModifier,
		})
		const result =
			Number(activeCharacter.statistics.strength.value) / 2 +
			8 +
			Number(encumbrance.carryModifier || 0)
		logger.debug('Carry capacity:', result)
		return result
	}, [activeCharacter.statistics.strength, encumbrance.carryModifier])

	const maxCapacity = useMemo(() => carryCapacity * 2, [carryCapacity])

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

	const getLocationLoad = (location: ItemLocation): number => {
		return calculateLocationLoad(itemsByLocation[location])
	}

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
