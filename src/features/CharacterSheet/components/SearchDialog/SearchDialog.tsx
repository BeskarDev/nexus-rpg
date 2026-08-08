import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { ReactNode, useMemo, useState } from 'react'
import { Chevron } from '../Chevron'
import { UnifiedListItem } from '../DynamicList'
import { MarkButton } from '../MarkButton'

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
	/**
	 * The rest of the entry, revealed when the reader opens the row (F11.1, S8b).
	 *
	 * **Pass this and the row becomes a disclosure.** An arcane spell's effect is a
	 * median of 558 characters and the ledger shows it through a three-line clamp,
	 * so the fact a player actually chooses on was about a fifth visible with no way
	 * to reach the rest — you picked by name recognition, or imported, read it on the
	 * sheet, and deleted it.
	 *
	 * S8 made the selectable row and the expanding row mutually exclusive, and that
	 * rule holds: one activation gesture must not have two meanings. This is the
	 * resolution `RefreshUpdatesDialog` already settled for the same collision —
	 * **the row expands, and the choice becomes an explicit control in the summary**
	 * — rather than an exception to it.
	 */
	renderDetails?: (item: T) => ReactNode
	/**
	 * Where this entry stands with respect to THIS character (F11.2, S8b).
	 *
	 * Every import dialog already receives a `character` prop, and every one of them
	 * destructured it and threw it away — so "do I already have this", "can I cast
	 * it yet" and "can I afford it" were all answerable from data sitting inside the
	 * component, and none of them were answered.
	 *
	 * The caller answers, because only the caller knows what its content type means
	 * by owned or by out of reach. Passing it is what puts the two standing filters
	 * in the meta line; without it the dialog behaves exactly as it did.
	 */
	getStanding?: (item: T) => SearchDialogStanding
}

/** What a dialog can say about an entry once it knows whose sheet it is. */
export type SearchDialogStanding = {
	/** The character already holds this. */
	owned?: boolean
	/**
	 * Why the character cannot take it yet — a SHORT phrase, shown as the reason.
	 *
	 * A phrase rather than a boolean because "rank 5" and "needs Stealth" are
	 * different problems with different fixes, and a row that only says *no* sends
	 * the reader back to the rulebook to find out why.
	 */
	blocked?: string
}

/**
 * A filter that is one binary fact, as a pressed stamp rather than a dropdown.
 *
 * The builder shell has carried `FilterChip` since S8; this is the sheet-scoped
 * twin, because a portalled dialog cannot reach `.codex-builder`'s stylesheet and
 * the two surfaces should not share a class across that boundary. `aria-pressed`
 * rather than a checkbox: it is a toggle button acting on the list, not a value
 * being collected.
 */
const FilterToggle: React.FC<{
	pressed: boolean
	onClick: () => void
	children: ReactNode
}> = ({ pressed, onClick, children }) => (
	<button
		type="button"
		className="cs-search-toggle"
		aria-pressed={pressed}
		onClick={onClick}
	>
		{children}
	</button>
)

/** The selection gutter's mark plus the row's own gap, so the header lines up. */
const SELECT_GUTTER = '18px'

/**
 * The tracks an expanding row needs that a selectable one does not.
 *
 * A selectable row carries its `CheckMark` OUTSIDE the summary grid, in the row's
 * own gutter — hence `SELECT_GUTTER` on the header alone. A disclosure carries a
 * real checkbox INSIDE the summary (it is a control, not the row's state), and the
 * chevron rides outside on the other side, so both ends need reserving. Same two
 * constants `RefreshUpdatesDialog` arrived at, for the same two reasons.
 */
const CHOICE_TRACK = '30px'
const CHEVRON_RESERVE = '18px'
/** `CheckMark` is 18px and MUI pads a checkbox by 9; 6px lands it on the track. */
const CHOICE_SX = { p: '6px' }

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
	renderDetails,
	getStanding,
}: SearchDialogProps<T>) {
	// `noSsr` is deliberate: without it the first client render assumes the query is
	// false, so a phone paints the windowed dialog and then swaps to full screen.
	const fullScreen = useMediaQuery('(max-width:699.98px)', { noSsr: true })
	const isSingle = selectionMode === 'single'
	const expands = renderDetails !== undefined
	const knowsCharacter = getStanding !== undefined
	const [hideOwned, setHideOwned] = useState(false)
	const [onlyEligible, setOnlyEligible] = useState(false)
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

			console.error(
				`SearchDialog "${title}": getItemKey is not unique — ${[...new Set(dupes)].join(', ')}. ` +
					'Rows will render and select incorrectly; key on a field combination that is unique.',
			)
		}
	}

	const filteredData = useMemo(() => {
		let filtered = data

		/*
			The standing filters run FIRST, before the text search and the sort.

			They are the cheapest cut and the one a player leaves on: "the things I
			could actually take" is a smaller list to then search within, and running
			them last would mean sorting rows that are about to be dropped.
		*/
		if (getStanding && (hideOwned || onlyEligible)) {
			filtered = filtered.filter((item) => {
				const standing = getStanding(item)
				if (hideOwned && standing.owned) return false
				if (onlyEligible && standing.blocked) return false
				return true
			})
		}

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
	}, [
		data,
		searchQuery,
		searchFields,
		sortBy,
		sortOrder,
		tiebreakKey,
		getStanding,
		hideOwned,
		onlyEligible,
	])

	/**
	 * One template for the header and every row (M13 S8).
	 *
	 * The same mechanism the tab ledgers carry (`ledgerColumns.ts`,
	 * `spellColumns.ts`) — a header declaring its own widths and rows declaring
	 * theirs are two sources of truth for one alignment. Here the tracks come from
	 * the caller's column list rather than from a constant, because each dialog
	 * shows a different set of facts, but the rule is the same one.
	 */
	/*
		Roving focus over the list (M13 S8b.2, F11.3).

		Every row was `tabIndex: 0`, so a mystic list of 285 rows put 285 tab stops
		between the search field and the Import button — and with S8b.1's checkbox in
		each expanded row, nearer 570. Both patterns this dialog uses say the same
		thing: ONE stop for the whole list, arrows to move inside it.

		The index lives here rather than in the row because only the container knows
		which sibling is current. Focus is applied by querying the rendered rows — the
		focusable element differs by variant (the row itself when it is an `option`,
		the summary button when it is a disclosure) and a ref array would have to know
		that too.
	*/
	const fieldRef = React.useRef<HTMLInputElement | null>(null)
	const rowsRef = React.useRef<HTMLDivElement | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	// A narrowing search can leave the active index past the end of the list.
	const clampedActive = Math.min(
		activeIndex,
		Math.max(filteredData.length - 1, 0),
	)

	const focusRow = (index: number) => {
		const container = rowsRef.current
		if (!container) return
		const rows = container.querySelectorAll<HTMLElement>(
			expands ? '.MuiAccordionSummary-root' : '[role="option"]',
		)
		const target = rows[index]
		if (!target) return
		setActiveIndex(index)
		target.focus()
	}

	const onListKeyDown = (event: React.KeyboardEvent) => {
		const last = filteredData.length - 1
		if (last < 0) return
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault()
				focusRow(Math.min(clampedActive + 1, last))
				break
			case 'ArrowUp':
				event.preventDefault()
				// Off the top goes back to the search field rather than wrapping: the
				// field is where the reader came from, and a wrap to row 285 is never
				// what the press meant.
				if (clampedActive === 0) fieldRef.current?.focus()
				else focusRow(clampedActive - 1)
				break
			case 'Home':
				event.preventDefault()
				focusRow(0)
				break
			case 'End':
				event.preventDefault()
				focusRow(last)
				break
			default:
		}
	}

	const rowTemplate = useMemo(() => {
		const tracks = columns.map((column) => column.width ?? 'minmax(0, 1fr)')
		// A disclosure's checkbox is a cell of the summary grid; a selectable row's
		// mark is not (it sits in the row's own gutter, outside it).
		return (expands ? [CHOICE_TRACK, ...tracks] : tracks).join(' ')
	}, [columns, expands])

	/*
		The header's template. A selectable row prefixes the gutter the row carries
		outside its grid; a disclosure already has the choice track in `rowTemplate`
		and instead reserves the chevron on the far side.
	*/
	const headTemplate = expands
		? `${rowTemplate} ${CHEVRON_RESERVE}`
		: `${SELECT_GUTTER} ${rowTemplate}`

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
		// The standing toggles reset with everything else, for the reason the sort
		// does: reopening the dialog should look the way opening it did.
		setHideOwned(false)
		setOnlyEligible(false)
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
			/*
				Full screen on a phone (F11.4).

				A `maxWidth="md" fullWidth` dialog on a 430px viewport is the phone minus
				MUI's 32px margins, and it spends the rest of the height on the backdrop
				around it — for a list of 285 rows, where every line of the viewport is
				a row the reader does not have to scroll for. The breakpoint is the same
				700px the column grid uses, so the frame changes at the same width the
				tracks do rather than at a second, unrelated one.
			*/
			fullScreen={fullScreen}
			// Portaled outside `.character-sheet-page`, so without `cs-tokens` every
			// sheet-scoped rule the ledger and the chips depend on resolves to nothing
			// — the same reason `FocusField` and `StatusEffects` carry it.
			PaperProps={{ className: 'cs-tokens cs-search-dialog' }}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent sx={{ pt: 2 }}>
				{/* A carved field, not a MUI `TextField` (M13 S8b, F11.5).

					The builder shell replaced its own `TextField` in S8 and its docblock
					names the reason: restyling one means fighting the notched-outline
					machinery — a `<fieldset>` with a legend gap, a hairline in Material's
					grey, a 40px box the type sits lost inside — and it was "the one place
					a Material component still showed through the dialog". This was that
					same place, still unfixed, on the surface a player opens most.

					A bare `<input>` in a keylined plate. The lens is drawn rather than
					Material and sits INSIDE the keyline as an engraved fixture, because
					pressing it does nothing.

					A sheet-scoped twin of `.cb-search` rather than the builder's own
					component: a portalled dialog cannot reach `.codex-builder`'s
					stylesheet, and giving this paper that class to borrow one field would
					drag the whole builder frame with it. Same call as `FilterToggle`
					against the builder's `FilterChip`. */}
				<Box className="cs-search-field">
					<Box
						aria-hidden="true"
						component="svg"
						viewBox="0 0 16 16"
						className="cs-search-field__mark"
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
					<input
						// Autofocus is right here and nowhere else on the sheet: the dialog
						// exists to be typed into, and it is opened by a deliberate press.
						autoFocus
						ref={fieldRef}
						type="text"
						className="cs-search-field__input"
						placeholder={searchPlaceholder}
						aria-label={`Search ${plural}`}
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						onKeyDown={(event) => {
							// Down out of the field and into the list. The field autofocuses,
							// so without this a keyboard reader has to Tab past it to reach
							// the rows at all.
							if (event.key === 'ArrowDown') {
								event.preventDefault()
								focusRow(0)
								return
							}
							// Enter used to do nothing at all: you typed a name, got one
							// row, and reached for the mouse. It takes what the list has
							// narrowed to when that is unambiguous, and otherwise leaves
							// the field alone rather than guessing at row one.
							if (event.key !== 'Enter') return
							if (filteredData.length !== 1) return
							event.preventDefault()
							handleItemToggle(getItemKey(filteredData[0]))
						}}
					/>
					{searchQuery && (
						<MarkButton
							glyph="×"
							label="Clear the search"
							onClick={() => setSearchQuery('')}
						/>
					)}
				</Box>

				{(filters || knowsCharacter) && (
					<Box className="cs-search-filters">
						{filters}
						{/* The two filters that need no configuring, because the dialog is
							already holding the character (F11.2). They are toggles rather
							than another dropdown: each is one binary fact, and a dropdown
							would hide its own state behind a closed box.

							Only rendered when the caller answers `getStanding` — a dialog
							that cannot tell owned from unowned must not offer to hide the
							owned ones. */}
						{knowsCharacter && (
							<>
								<FilterToggle
									pressed={hideOwned}
									onClick={() => setHideOwned(!hideOwned)}
								>
									Hide what I have
								</FilterToggle>
								<FilterToggle
									pressed={onlyEligible}
									onClick={() => setOnlyEligible(!onlyEligible)}
								>
									Only what I can take
								</FilterToggle>
							</>
						)}
					</Box>
				)}

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
							'--cs-search-head-cols': headTemplate,
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
							{/* The disclosure mark's reserve. It rides outside the summary
								grid, so without a track here the header's last column stops
								agreeing with the rows under it. */}
							{expands && <span aria-hidden="true" />}
						</Box>
					)}

					<Box
						ref={rowsRef}
						onKeyDown={onListKeyDown}
						className="cs-search-ledger__rows"
						/*
							A list of disclosures is not a listbox. When the row expands, the
							choice is a real checkbox inside it and the row's own job is
							opening — so `role="option"` would name the wrong thing, and
							`aria-selected` would duplicate the checkbox's state in the tree.
							`RefreshUpdatesDialog` reached the same shape for the same reason.
						*/
						{...(expands
							? { role: 'group', 'aria-label': title }
							: {
									role: 'listbox',
									'aria-label': title,
									...(!isSingle && { 'aria-multiselectable': true }),
								})}
					>
						{filteredData.map((item, rowIndex) => {
							const itemKey = getItemKey(item)
							const standing = getStanding?.(item)
							const cells = columns.map((column, index) => (
								<Box
									key={String(column.key)}
									sx={{ minWidth: 0, textAlign: column.align ?? 'left' }}
								>
									{column.render
										? column.render(item[column.key], item)
										: String(item[column.key])}
									{/* The standing marks ride in the FIRST cell, beside the
										name they qualify, rather than in a track of their own —
										a column that is empty on most rows costs every row its
										width to say nothing. */}
									{index === 0 && standing?.owned && (
										<Typography
											component="span"
											className="cs-standing cs-standing--owned"
										>
											have
										</Typography>
									)}
									{index === 0 && standing?.blocked && (
										<Typography
											component="span"
											className="cs-standing cs-standing--blocked"
										>
											{standing.blocked}
										</Typography>
									)}
								</Box>
							))

							if (!expands) {
								return (
									<UnifiedListItem
										key={itemKey}
										maxWidth="none"
										rowTabIndex={rowIndex === clampedActive ? 0 : -1}
										selected={selectedItems.has(itemKey)}
										onSelectedChange={() => handleItemToggle(itemKey)}
										summaryClassName="cs-search-row"
										sx={{ minHeight: '44px' }}
										summaryContent={cells}
									/>
								)
							}

							return (
								<UnifiedListItem
									key={itemKey}
									maxWidth="none"
									rowTabIndex={rowIndex === clampedActive ? 0 : -1}
									summaryClassName="cs-search-row"
									detailsContent={renderDetails(item)}
									detailsSx={{ display: 'block' }}
									summaryContent={
										<>
											<Checkbox
												checked={selectedItems.has(itemKey)}
												onChange={() => handleItemToggle(itemKey)}
												sx={CHOICE_SX}
												inputProps={{
													'aria-label': `Choose ${String(item[columns[0].key])}`,
												}}
											/>
											{cells}
										</>
									}
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
							{/* No clear button here as of S8b, which reverses an S8 decision on
								purpose. The carved search field carries its own `×` now, forty
								pixels above this line, so a second one put two controls with the
								SAME accessible name on screen at once. The way out has not been
								removed — it moved to where the text being cleared actually is. */}
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
