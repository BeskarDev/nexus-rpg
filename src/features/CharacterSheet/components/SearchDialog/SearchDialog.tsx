import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState, useMemo, ReactNode } from 'react'
import { Chevron } from '../Chevron'
import { MarkButton } from '../MarkButton'
import { UnifiedListItem } from '../DynamicList'

export type SearchDialogColumn<T> = {
	key: keyof T
	label: string
	align?: 'left' | 'center' | 'right'
	sortable?: boolean
	render?: (value: any, item: T) => ReactNode
	/**
	 * The column's grid track. Defaults to `minmax(0, 1fr)`.
	 *
	 * `minmax(0, …)` on every flexible track for the reason `spellColumns.ts`
	 * records: a grid track keeps an automatic minimum of its content, so one long
	 * description would push its column past its share and break the alignment for
	 * the whole list.
	 */
	width?: string
}

export type SearchDialogProps<T> = {
	open: boolean
	onClose: () => void
	title: string
	data: T[]
	columns: SearchDialogColumn<T>[]
	searchFields: (keyof T)[]
	selectedItems: Set<string>
	onSelectionChange: (selected: Set<string>) => void
	onImport: () => void
	getItemKey: (item: T) => string
	importButtonText?: string
	searchPlaceholder?: string
	filters?: ReactNode
	/**
	 * What the list holds, lower-case and singular — "spell", "weapon".
	 *
	 * Used by the count line and the empty state, so a reader is told what is
	 * missing rather than that "0 items" were found.
	 */
	itemNoun?: string
	/**
	 * The plural, when `${itemNoun}s` is wrong.
	 *
	 * Added for the rulebook pickers: the plural of *folk* is *folk*, and a dialog
	 * that says "2 folks" is a dialog that has not read the book it is quoting.
	 */
	itemNounPlural?: string
	/**
	 * How the list is ordered before the reader touches a heading.
	 *
	 * Without it a dialog shows the JSON's own order, which is an authoring
	 * artefact rather than a reading order — the arcane spell list came out grouped
	 * by discipline with ranks interleaved, so "find me a rank 2 I can cast" meant
	 * scanning 202 rows. Pressing the sorted heading still takes over, and closing
	 * the dialog returns to this rather than to no order at all.
	 */
	defaultSort?: { key: keyof T; order?: 'asc' | 'desc' }
	/**
	 * How many rows a reader may choose (M13 S8, the selection half).
	 *
	 * `multiple` is the import dialogs: pick a set, bring it in. `single` is the
	 * rulebook pickers — a character has one folk — where choosing a second row
	 * replaces the first rather than adding to it.
	 *
	 * The wire format is a `Set` either way, so a caller never has two shapes to
	 * handle; `single` simply guarantees it holds at most one. This is what let
	 * `SingleSelectionDialog` stop being a second copy of this component's table.
	 */
	selectionMode?: 'multiple' | 'single'
}

/** The selection gutter's mark plus the row's own gap, so the header lines up. */
const SELECT_GUTTER = '18px'

/**
 * Compare two rows on one column.
 *
 * Numeric when BOTH sides are genuinely numeric, string otherwise.
 *
 * Two things the obvious version gets wrong, both found by sorting real columns:
 *
 * - `!isNaN(Number(v))` is not a numeric test. `Number('')`, `Number(null)` and
 *   `Number([])` are all `0`, so every empty cell sorted as the number zero, in
 *   among the figures.
 * - The game's money is written with thousands separators — `'2,500'` — and
 *   `Number('2,500')` is `NaN`. Cost therefore fell to a string compare, where
 *   `'2,500'` sorts before `'5'`. Separators are stripped before parsing, so a
 *   price sorts as a price. A bare `'-'` still does not: it means *none*, has no
 *   digits, and stays on the string side.
 */
const compareBy = <T,>(
	a: T,
	b: T,
	key: keyof T,
	order: 'asc' | 'desc',
): number => {
	const raw = (value: unknown) =>
		value === null || value === undefined ? '' : value
	const aRaw = raw(a[key])
	const bRaw = raw(b[key])

	const asNumber = (value: unknown) => {
		if (typeof value === 'number') return Number.isFinite(value) ? value : null
		if (typeof value !== 'string') return null
		const trimmed = value.trim()
		// At least one digit, optional sign, optional grouped thousands, optional
		// decimal. Anything else — `-`, `special`, `1d6` — is text.
		if (!/^[+-]?[\d,\s]*\d(\.\d+)?$/.test(trimmed)) return null
		const n = Number(trimmed.replace(/[,\s]/g, ''))
		return Number.isFinite(n) ? n : null
	}

	const aNum = asNumber(aRaw)
	const bNum = asNumber(bRaw)

	let result: number
	if (aNum !== null && bNum !== null) {
		result = aNum - bNum
	} else {
		// `localeCompare` rather than `<`: it orders accented and case-mixed names
		// the way a reader expects, where the raw operators order them by code point.
		result = String(aRaw).localeCompare(String(bRaw), undefined, {
			sensitivity: 'base',
			numeric: true,
		})
	}

	return order === 'asc' ? result : -result
}

export function SearchDialog<T>({
	open,
	onClose,
	title,
	data,
	columns,
	searchFields,
	selectedItems,
	onSelectionChange,
	onImport,
	getItemKey,
	importButtonText = 'Import',
	searchPlaceholder = 'Search...',
	filters,
	itemNoun = 'entry',
	itemNounPlural,
	defaultSort,
	selectionMode = 'multiple',
}: SearchDialogProps<T>) {
	const isSingle = selectionMode === 'single'
	const plural = itemNounPlural ?? `${itemNoun}s`
	const countNoun = (n: number) => (n === 1 ? itemNoun : plural)
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState<keyof T | null>(defaultSort?.key ?? null)
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
		defaultSort?.order ?? 'asc',
	)

	/**
	 * The tiebreaker: whatever the first column names, usually the entity's name.
	 *
	 * Sorting by one key alone leaves everything sharing that key in source order,
	 * so "sort by rank" produced six unordered heaps rather than six alphabetised
	 * groups. The tiebreaker is what makes a sorted column read as GROUPS — and it
	 * always sorts ascending, because a reversed primary sort does not imply the
	 * reader wants the names backwards inside each group.
	 */
	const tiebreakKey = columns[0]?.key

	/**
	 * `getItemKey` must be UNIQUE, and this says so out loud when it is not.
	 *
	 * It was not, once, and the failure was invisible in the code and bizarre on
	 * screen: `arcane-spells.json` holds two spells called *Astral Body* (one
	 * Conjuration, one Telepathy), the spell dialog keyed rows by name, and React
	 * therefore had two children with the same key. Filtering to rank 5 then showed
	 * **17 rows for 16 spells**, with a rank 4 spell stranded at the top — a node
	 * React kept because it could not tell which of the two it belonged to.
	 *
	 * Nothing about that symptom points at the key, which is why it is worth a
	 * check. The key also decides what SELECTION means: two rows sharing one key
	 * are one selection and, for a dialog that imports by key, one import that
	 * brings in both. Dev-only — it costs a Set per render.
	 */
	if (process.env.NODE_ENV !== 'production') {
		const keys = data.map(getItemKey)
		if (new Set(keys).size !== keys.length) {
			const seen = new Set<string>()
			const dupes = keys.filter((k) =>
				seen.has(k) ? true : (seen.add(k), false),
			)
			// eslint-disable-next-line no-console
			console.error(
				`SearchDialog "${title}": getItemKey is not unique — ${[...new Set(dupes)].join(', ')}. ` +
					'Rows will render and select incorrectly; key on a field combination that is unique.',
			)
		}
	}

	const filteredData = useMemo(() => {
		let filtered = data

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase()
			filtered = filtered.filter((item) =>
				searchFields.some((field) =>
					String(item[field]).toLowerCase().includes(query),
				),
			)
		}

		// Sort the filtered results
		if (sortBy) {
			// `slice()` first: `data` is the caller's own memoised array, and sorting
			// in place mutates the list every other consumer of that memo sees.
			return filtered.slice().sort((a, b) => {
				const primary = compareBy(a, b, sortBy, sortOrder)
				if (primary !== 0) return primary
				if (!tiebreakKey || tiebreakKey === sortBy) return 0
				return compareBy(a, b, tiebreakKey, 'asc')
			})
		}

		return filtered
	}, [data, searchQuery, searchFields, sortBy, sortOrder, tiebreakKey])

	/**
	 * One template for the header and every row (M13 S8).
	 *
	 * The same mechanism the tab ledgers carry (`ledgerColumns.ts`,
	 * `spellColumns.ts`) — a header declaring its own widths and rows declaring
	 * theirs are two sources of truth for one alignment. Here the tracks come from
	 * the caller's column list rather than from a constant, because each dialog
	 * shows a different set of facts, but the rule is the same one.
	 */
	const rowTemplate = useMemo(
		() => columns.map((column) => column.width ?? 'minmax(0, 1fr)').join(' '),
		[columns],
	)

	const handleSort = (column: keyof T) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(column)
			setSortOrder('asc')
		}
	}

	const handleItemToggle = (itemKey: string) => {
		// A single-choice list REPLACES rather than accumulates, and a second press
		// on the chosen row clears it — the same "press it again to undo" the
		// multiple mode gives, which is the one behaviour a reader can rely on
		// without being told which mode they are in.
		if (isSingle) {
			onSelectionChange(
				selectedItems.has(itemKey) ? new Set() : new Set([itemKey]),
			)
			return
		}
		const newSelected = new Set(selectedItems)
		if (newSelected.has(itemKey)) {
			newSelected.delete(itemKey)
		} else {
			newSelected.add(itemKey)
		}
		onSelectionChange(newSelected)
	}

	const allSelected =
		filteredData.length > 0 && selectedItems.size === filteredData.length

	const handleSelectAll = () => {
		onSelectionChange(
			allSelected ? new Set() : new Set(filteredData.map(getItemKey)),
		)
	}

	const handleClose = () => {
		onSelectionChange(new Set())
		setSearchQuery('')
		// Back to the DEFAULT order, not to no order — reopening the dialog should
		// look the way it looked the first time.
		setSortBy(defaultSort?.key ?? null)
		setSortOrder(defaultSort?.order ?? 'asc')
		onClose()
	}

	const handleImport = () => {
		onImport()
		handleClose()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="md"
			fullWidth
			// Portaled outside `.character-sheet-page`, so without `cs-tokens` every
			// sheet-scoped rule the ledger and the chips depend on resolves to nothing
			// — the same reason `FocusField` and `StatusEffects` carry it.
			PaperProps={{ className: 'cs-tokens cs-search-dialog' }}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent sx={{ pt: 2 }}>
				{/* A plain themed `TextField`, not `SheetInput`: that preset is 5rem wide
					with centred content, built for a value cell in a dense row, and a
					full-measure prose field is the one shape it is not. */}
				<TextField
					autoFocus
					label="Search"
					variant="outlined"
					placeholder={searchPlaceholder}
					fullWidth
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					sx={{ mb: 1.5 }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								{/* The search mark, drawn rather than Material: a ring with its
									handle, which is the same lens the site's own search control
									shows. Decorative — the field's label says what it is. */}
								<Box
									aria-hidden="true"
									component="svg"
									viewBox="0 0 16 16"
									sx={{ width: 14, height: 14, color: 'primary.main' }}
								>
									<circle
										cx="6.75"
										cy="6.75"
										r="4.5"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
									<path
										d="M10.2 10.2 L14 14"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="square"
									/>
								</Box>
							</InputAdornment>
						),
					}}
				/>

				{filters && <Box className="cs-search-filters">{filters}</Box>}

				{/* The list's meta line, in the band register the tabs use for the same
					job: what is in front of you, and the one control that acts on all of
					it. Select-all was a checkbox in a table header before — a header cell
					that was secretly a control, in a header that is otherwise labels. */}
				<Box className="cs-search-meta">
					<Typography component="span" className="cs-search-meta__count">
						{filteredData.length} {countNoun(filteredData.length)}
						{selectedItems.size > 0 && ` · ${selectedItems.size} chosen`}
					</Typography>
					{/* Choose-all belongs to a list you may take all of. A single-choice
						list has no such action, and offering one that immediately
						contradicts the mode is worse than offering nothing. */}
					{!isSingle && filteredData.length > 0 && (
						<Button
							variant="text"
							size="small"
							onClick={handleSelectAll}
							className="cs-search-meta__all"
						>
							{allSelected ? 'Clear selection' : 'Choose all'}
						</Button>
					)}
				</Box>

				{/* The tracks are declared ONCE here, as a custom property, and read by
					the header and by every row from the stylesheet. Not through `sx` on
					each: the columns only exist above the ledger breakpoint, and a
					breakpoint belongs in a media query rather than in a prop that cannot
					express one — the same split `characterSheet.css` already makes for the
					tab ledgers. */}
				<Box
					className="cs-search-ledger"
					style={
						{
							'--cs-search-cols': rowTemplate,
							'--cs-search-head-cols': `${SELECT_GUTTER} ${rowTemplate}`,
						} as React.CSSProperties
					}
				>
					{filteredData.length > 0 && (
						<Box className="cs-search-ledger__head">
							{/* The selection gutter's own track. Blank rather than labelled:
								the mark under it is a control, and a heading over a control
								names a column of facts that is not there. */}
							<span aria-hidden="true" />
							{columns.map((column) =>
								column.sortable === false ? (
									<span
										key={String(column.key)}
										style={{ textAlign: column.align ?? 'left' }}
									>
										{column.label}
									</span>
								) : (
									<button
										key={String(column.key)}
										type="button"
										onClick={() => handleSort(column.key)}
										aria-label={`Sort by ${column.label}`}
										data-active={sortBy === column.key ? 'true' : undefined}
										style={{ justifyContent: alignToFlex(column.align) }}
									>
										{column.label}
										{sortBy === column.key && (
											<Box
												component="span"
												sx={{
													display: 'flex',
													transform:
														sortOrder === 'asc' ? 'rotate(180deg)' : 'none',
												}}
											>
												<Chevron size={8} />
											</Box>
										)}
									</button>
								),
							)}
						</Box>
					)}

					<Box
						className="cs-search-ledger__rows"
						role="listbox"
						{...(!isSingle && { 'aria-multiselectable': true })}
						aria-label={title}
					>
						{filteredData.map((item) => {
							const itemKey = getItemKey(item)
							return (
								<UnifiedListItem
									key={itemKey}
									maxWidth="none"
									selected={selectedItems.has(itemKey)}
									onSelectedChange={() => handleItemToggle(itemKey)}
									summaryClassName="cs-search-row"
									sx={{ minHeight: '44px' }}
									summaryContent={columns.map((column) => (
										<Box
											key={String(column.key)}
											sx={{
												minWidth: 0,
												textAlign: column.align ?? 'left',
											}}
										>
											{column.render
												? column.render(item[column.key], item)
												: String(item[column.key])}
										</Box>
									))}
								/>
							)
						})}
					</Box>

					{filteredData.length === 0 && (
						/* The designed empty state. No mark: nothing in the sigil set means
							"absence", and F7's budget is not worth spending on the one screen a
							reader wants to leave. What it does instead is tell them WHICH
							constraint emptied the list, and give them the control that undoes
							it — the failure a bare "No results" never explains. */
						<Box className="cs-search-empty">
							<Typography component="p" className="cs-search-empty__line">
								No {itemNoun} matches
								{searchQuery.trim()
									? ` “${searchQuery.trim()}”`
									: ' these filters'}
							</Typography>
							{searchQuery.trim() && (
								<MarkButton
									glyph="×"
									label="Clear the search"
									onClick={() => setSearchQuery('')}
								/>
							)}
						</Box>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					onClick={handleImport}
					variant="contained"
					disabled={selectedItems.size === 0}
				>
					{/* A count on a single-choice button restates what the mode already
						guarantees — "Select Folk 1 folk". The verb alone. */}
					{isSingle ? (
						importButtonText
					) : (
						<>
							{importButtonText} {selectedItems.size}{' '}
							{countNoun(selectedItems.size)}
						</>
					)}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const alignToFlex = (align?: 'left' | 'center' | 'right') =>
	align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'
