import { useMemo, useEffect } from 'react'
import { DropResult } from '@hello-pangea/dnd'
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
import { calculateFolkAvBonus } from '../../../utils/calculateFolkAvBonus'

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

	// Auto-update AV values when armor, helmet, or shield items change, or when folk abilities change
	useEffect(() => {
		const { armorAV, helmetAV, shieldAV } = extractArmorValues(itemsByLocation)

		// Calculate folk AV bonus (Stoneskin, Thick Scales)
		// Thick Scales gives +3 AV if no armor, or +1 if wearing armor
		const hasArmorEquipped = armorAV > 0
		const folkAvBonus = calculateFolkAvBonus(
			activeCharacter.skills.abilities,
			hasArmorEquipped,
		)

		// Update AV values if they changed (folkBonus is stored separately, other remains user-editable)
		const currentAV = activeCharacter.statistics.av
		if (
			currentAV.armor !== armorAV ||
			currentAV.helmet !== helmetAV ||
			currentAV.shield !== shieldAV ||
			currentAV.folkBonus !== folkAvBonus
		) {
			dispatch(
				characterSheetActions.updateCharacter({
					statistics: {
						av: {
							armor: armorAV ?? currentAV.armor,
							helmet: helmetAV ?? currentAV.helmet,
							shield: shieldAV ?? currentAV.shield,
							folkBonus: folkAvBonus,
						},
					},
				}),
			)
		}
	}, [itemsByLocation, activeCharacter.skills.abilities])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const currentLoad: number = useMemo(() => {
		return calculateCurrentLoad(itemsByLocation)
	}, [itemsByLocation])

	// Update currentLoad in store when it changes
	useEffect(() => {
		if (currentLoad !== encumbrance.currentLoad) {
			updateCharacter({
				items: { encumbrance: { currentLoad: currentLoad } },
			})
		}
	}, [currentLoad, encumbrance.currentLoad])

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
