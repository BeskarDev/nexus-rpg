import { useState, useCallback } from 'react'

export interface UseDropdownSelectionProps<T> {
	availableItems: T[]
	selectedItems: T[]
	onAdd: (item: T) => void
	onRemove: (item: T) => void
}

export interface UseDropdownSelectionReturn {
	isOpen: boolean
	open: () => void
	close: () => void
	handleAdd: (item: any) => void
	handleRemove: (item: any) => void
}

export const useDropdownSelection = <T>({
	availableItems,
	selectedItems,
	onAdd,
	onRemove,
}: UseDropdownSelectionProps<T>): UseDropdownSelectionReturn => {
	const [isOpen, setIsOpen] = useState(false)

	const open = useCallback(() => setIsOpen(true), [])
	const close = useCallback(() => setIsOpen(false), [])

	const handleAdd = useCallback(
		(item: T) => {
			onAdd(item)
			setIsOpen(false)
		},
		[onAdd],
	)

	const handleRemove = useCallback(
		(item: T) => {
			onRemove(item)
		},
		[onRemove],
	)

	return {
		isOpen,
		open,
		close,
		handleAdd,
		handleRemove,
	}
}