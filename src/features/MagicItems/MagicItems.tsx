import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from '@mui/material'
import { MagicItem, MagicItemCategory } from '@site/src/types/MagicItem'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	CARD_PAGE,
	CARD_PAGE_MARGIN,
	CARD_SIZE,
	itemsPerPage,
	PrintPages,
	PrintToolShell,
} from '../PrintingTools'
import { MagicItemCard } from './MagicItemCard'
import './magicItemsStyles.css'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

export const MagicItems: React.FC = () => {
	const [magicItems, setMagicItems] = React.useState<MagicItem[]>([])
	const [selectedItems, setSelectedItems] = React.useState<string[]>([])
	const [categoryFilter, setCategoryFilter] = React.useState<
		MagicItemCategory | 'all'
	>('all')
	const [jsonString, setJsonString] = React.useState<string>('')
	const [parseError, setParseError] = React.useState<string>('')
	const [showJsonImport, setShowJsonImport] = React.useState(true)

	const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
		const {
			target: { value },
		} = event
		setSelectedItems(typeof value === 'string' ? value.split(',') : value)
	}

	const handleCategoryFilterChange = (
		event: SelectChangeEvent<MagicItemCategory | 'all'>,
	) => {
		setCategoryFilter(event.target.value as MagicItemCategory | 'all')
	}

	const handleJsonUpload = (jsonStr: string) => {
		setJsonString(jsonStr)
		setParseError('')
		try {
			if (jsonStr.trim()) {
				const parsed = JSON.parse(jsonStr)
				// Handle both single item and array of items
				const items: MagicItem[] = Array.isArray(parsed) ? parsed : [parsed]

				// Validate that items have required fields
				const validItems = items.filter(
					(item) => item.name && item.category && item.description,
				)

				if (validItems.length === 0) {
					setParseError(
						'No valid items found. Each item must have at least: name, category, and description.',
					)
					return
				}

				setMagicItems((prev) => {
					// Merge with existing items, avoiding duplicates by name
					const existingNames = new Set(prev.map((item) => item.name))
					const newItems = validItems.filter(
						(item) => !existingNames.has(item.name),
					)
					return [...prev, ...newItems]
				})

				// Automatically select newly added items
				const newItemNames = validItems.map((item) => item.name)
				setSelectedItems((prev) => {
					const existingSet = new Set(prev)
					newItemNames.forEach((name) => existingSet.add(name))
					return Array.from(existingSet)
				})

				setParseError(
					`Successfully loaded ${validItems.length} magic item${validItems.length !== 1 ? 's' : ''}.`,
				)
			}
		} catch (error) {
			console.error('Failed to parse magic items JSON:', error)
			setParseError(
				'Failed to parse JSON. Please check the format and try again.',
			)
		}
	}

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})

	const availableItems = useMemo(() => {
		if (categoryFilter === 'all') return magicItems
		return magicItems.filter((item) => item.category === categoryFilter)
	}, [magicItems, categoryFilter])

	const filteredItems = useMemo(
		() => availableItems.filter((item) => selectedItems.includes(item.name)),
		[availableItems, selectedItems],
	)

	const selectAll = () =>
		setSelectedItems(availableItems.map((item) => item.name))
	const deselectAll = () => setSelectedItems([])

	// From the card and page geometry rather than a hand-written 9 — the same
	// call the preview paginates by, so the count and the pages cannot drift.
	const sheetCount = Math.ceil(
		filteredItems.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	return (
		<>
			<style type="text/css" media="print">
				{'@page { size: 192mm 267mm; }'}
			</style>
			<PrintToolShell
				controlsLabel="Select Items"
				previewLabel="Preview"
				controls={
					<>
						<div className="pt-section">
							<div className="pt-section__head">
								<span className="pt-section__step">I</span>
								<span className="pt-section__label">Source</span>
							</div>
							<button
								type="button"
								className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
								onClick={() => setShowJsonImport(!showJsonImport)}
								aria-expanded={showJsonImport}
								aria-controls="pt-import-magic-items"
							>
								<span className="pt-import-toggle__caret" aria-hidden="true" />
								Paste magic items JSON
							</button>
							<div
								id="pt-import-magic-items"
								className={`pt-import-body${showJsonImport ? '' : ' is-hidden'}`}
							>
								<textarea
									value={jsonString}
									onChange={(event) => handleJsonUpload(event.target.value)}
									placeholder="Paste magic items JSON here (single item or array)…"
									aria-label="Magic items JSON import"
								/>
								{parseError && (
									<p
										style={{
											fontSize: 'var(--nexus-text-xs)',
											margin: '0.25rem 0 0',
										}}
									>
										{parseError}
									</p>
								)}
							</div>
						</div>
						<div className="pt-section">
							<div className="pt-section__head">
								<span className="pt-section__step">II</span>
								<span className="pt-section__label">Selection</span>
							</div>
							<FormControl size="small" fullWidth sx={{ mb: 0.5 }}>
								<InputLabel>Category</InputLabel>
								<Select
									value={categoryFilter}
									onChange={handleCategoryFilterChange}
									input={<OutlinedInput label="Category" />}
								>
									<MenuItem value="all">All Categories</MenuItem>
									<MenuItem value="Weapon">Weapons</MenuItem>
									<MenuItem value="Wearable">Wearables</MenuItem>
									<MenuItem value="Consumable">Consumables</MenuItem>
									<MenuItem value="Spell Scroll">Spell Scrolls</MenuItem>
								</Select>
							</FormControl>
							<FormControl size="small" fullWidth>
								<InputLabel>Magic Items</InputLabel>
								<Select
									multiple
									value={selectedItems}
									onChange={handleChange}
									input={<OutlinedInput label="Magic Items" />}
									renderValue={(selected) => `${selected.length} selected`}
									MenuProps={MenuProps}
								>
									{availableItems.map(({ name, category }) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={selectedItems.indexOf(name) > -1} />
											<ListItemText primary={name} secondary={category} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<div className="pt-select-row">
								<button
									type="button"
									className="pt-verb-quiet"
									onClick={selectAll}
								>
									Select all
								</button>
								<button
									type="button"
									className="pt-verb-quiet"
									onClick={deselectAll}
								>
									Deselect all
								</button>
							</div>
						</div>
						<div className="pt-section">
							<div className="pt-count">
								<strong>{filteredItems.length}</strong>{' '}
								{filteredItems.length === 1 ? 'card' : 'cards'} selected
								{filteredItems.length > 0 && (
									<>
										{' '}
										· <strong>{sheetCount}</strong>{' '}
										{sheetCount === 1 ? 'sheet' : 'sheets'}
									</>
								)}
							</div>
							<button
								type="button"
								className="pt-print-verb"
								onClick={handlePrint}
								disabled={filteredItems.length === 0}
							>
								Print
							</button>
						</div>
					</>
				}
				preview={
					<div ref={componentRef}>
						<PrintPages
							page={CARD_PAGE}
							item={CARD_SIZE}
							margin={CARD_PAGE_MARGIN}
							empty={
								<p className="pt-empty">
									Paste magic items JSON in the controls panel to preview them
									here.
								</p>
							}
						>
							{filteredItems.map((item) => (
								<MagicItemCard key={item.name} {...item} />
							))}
						</PrintPages>
					</div>
				}
			/>
		</>
	)
}
