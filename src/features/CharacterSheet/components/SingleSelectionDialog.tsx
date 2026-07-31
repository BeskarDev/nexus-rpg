import React, { useMemo } from 'react'
import { SearchDialog, SearchDialogColumn } from './SearchDialog'

/**
 * A column of the picker's ledger.
 *
 * The same type the search dialogs use — kept under this name because the four
 * rulebook pickers declare their columns with it and renaming it would be churn
 * in four files for no reader's benefit.
 */
export type SingleSelectionDialogColumn<T> = SearchDialogColumn<T>

export type SingleSelectionDialogProps<T> = {
	open: boolean
	onClose: () => void
	title: string
	data: T[]
	columns: SingleSelectionDialogColumn<T>[]
	searchFields: (keyof T)[]
	selectedItem?: string | null
	onSelectionChange: (selectedKey: string | null) => void
	onConfirm: () => void
	getItemKey: (item: T) => string
	confirmButtonText?: string
	searchPlaceholder?: string
	/** What the list holds, lower-case and singular — "folk", "background". */
	itemNoun?: string
	/** The plural, when `${itemNoun}s` is wrong — "folk". */
	itemNounPlural?: string
	/** Initial ordering; see `SearchDialog`. Omit to keep the rulebook's own order. */
	defaultSort?: { key: keyof T; order?: 'asc' | 'desc' }
}

/**
 * Choose ONE published thing from the rulebook — a folk, an upbringing, a
 * background, an archetype.
 *
 * ## What this was, and why it is thirty lines now
 *
 * It was a near-verbatim copy of the search dialogs' component: the same MUI
 * `Table` with `stickyHeader`, the same `TableSortLabel`, the same search field
 * and the same sort reducer, differing only in a `Radio` where the other had a
 * `Checkbox`. Two implementations of one list, which is exactly the drift M13 S2
 * set out to end — and the copy is why the S8 search pass improved five dialogs
 * and left these four looking like the app they used to be part of.
 *
 * `SearchDialog` carries a `selectionMode` now, so the ledger, the column
 * template, the sortable headings and the designed empty state are one
 * implementation. What remains here is the shape conversion: the pickers speak in
 * one key or `null`, the ledger speaks in a `Set`, and this translates between
 * them. The four call sites are untouched.
 */
export function SingleSelectionDialog<T>({
	open,
	onClose,
	title,
	data,
	columns,
	searchFields,
	selectedItem,
	onSelectionChange,
	onConfirm,
	getItemKey,
	confirmButtonText = 'Select',
	searchPlaceholder = 'Search...',
	itemNoun = 'entry',
	itemNounPlural,
	defaultSort,
}: SingleSelectionDialogProps<T>) {
	const selectedItems = useMemo(
		() => new Set(selectedItem ? [selectedItem] : []),
		[selectedItem],
	)

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title={title}
			data={data}
			columns={columns}
			searchFields={searchFields}
			selectionMode="single"
			selectedItems={selectedItems}
			onSelectionChange={(next) =>
				onSelectionChange(next.values().next().value ?? null)
			}
			onImport={onConfirm}
			getItemKey={getItemKey}
			importButtonText={confirmButtonText}
			searchPlaceholder={searchPlaceholder}
			itemNoun={itemNoun}
			itemNounPlural={itemNounPlural}
			defaultSort={defaultSort}
		/>
	)
}
