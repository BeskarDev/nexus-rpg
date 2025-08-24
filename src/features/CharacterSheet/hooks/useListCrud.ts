import { DropResult } from 'react-beautiful-dnd'
import { characterSheetActions } from '../characterSheetReducer'
import { useAppDispatch } from './useAppDispatch'

export type ListCrudActions = {
	addNew: () => void
	update: (update: string, index: number) => void
	delete: (index: number) => void
	onReorder: (result: DropResult) => void
}

/**
 * Reusable hook for CRUD operations on character lists (allies, contacts, rivals)
 */
export function useListCrud(listType: 'ally' | 'contact' | 'rival'): ListCrudActions {
	const dispatch = useAppDispatch()

	const addNew = () => {
		switch (listType) {
			case 'ally':
				dispatch(characterSheetActions.addNewAlly())
				break
			case 'contact':
				dispatch(characterSheetActions.addNewContact())
				break
			case 'rival':
				dispatch(characterSheetActions.addNewRival())
				break
		}
	}

	const update = (update: string, index: number) => {
		switch (listType) {
			case 'ally':
				dispatch(characterSheetActions.updateAlly({ update, index }))
				break
			case 'contact':
				dispatch(characterSheetActions.updateContact({ update, index }))
				break
			case 'rival':
				dispatch(characterSheetActions.updateRival({ update, index }))
				break
		}
	}

	const deleteItem = (index: number) => {
		switch (listType) {
			case 'ally':
				dispatch(characterSheetActions.deleteAlly(index))
				break
			case 'contact':
				dispatch(characterSheetActions.deleteContact(index))
				break
			case 'rival':
				dispatch(characterSheetActions.deleteRival(index))
				break
		}
	}

	const onReorder = ({ source, destination }: DropResult) => {
		if (!destination) return

		switch (listType) {
			case 'ally':
				dispatch(
					characterSheetActions.reorderAlly({
						source: source.index,
						destination: destination.index,
					}),
				)
				break
			case 'contact':
				dispatch(
					characterSheetActions.reorderContact({
						source: source.index,
						destination: destination.index,
					}),
				)
				break
			case 'rival':
				dispatch(
					characterSheetActions.reorderRival({
						source: source.index,
						destination: destination.index,
					}),
				)
				break
		}
	}

	return {
		addNew,
		update,
		delete: deleteItem,
		onReorder,
	}
}