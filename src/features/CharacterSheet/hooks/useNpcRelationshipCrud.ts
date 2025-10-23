import { DropResult } from '@hello-pangea/dnd'
import { NpcRelationship } from '../../../types/Character'
import { characterSheetActions } from '../characterSheetReducer'
import { useAppDispatch } from './useAppDispatch'

export type NpcRelationshipCrudActions = {
	addNew: () => void
	update: (update: Partial<NpcRelationship>, index: number) => void
	delete: (index: number) => void
	onReorder: (result: DropResult) => void
}

/**
 * Hook for CRUD operations on NPC relationships
 */
export function useNpcRelationshipCrud(): NpcRelationshipCrudActions {
	const dispatch = useAppDispatch()

	const addNew = () => {
		dispatch(characterSheetActions.addNewNpcRelationship())
	}

	const update = (update: Partial<NpcRelationship>, index: number) => {
		dispatch(characterSheetActions.updateNpcRelationship({ update, index }))
	}

	const deleteItem = (index: number) => {
		dispatch(characterSheetActions.deleteNpcRelationship(index))
	}

	const onReorder = ({ source, destination }: DropResult) => {
		if (!destination) return

		dispatch(
			characterSheetActions.reorderNpcRelationship({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	return {
		addNew,
		update,
		delete: deleteItem,
		onReorder,
	}
}
