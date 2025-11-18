import {
	Button,
	Checkbox,
	Divider,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { MagicItem, MagicItemCategory } from '@site/src/types/MagicItem'
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
	const muiTheme = useTheme()
	const [magicItems, setMagicItems] = React.useState<MagicItem[]>([])
	const [selectedItems, setSelectedItems] = React.useState<string[]>([])
	const [categoryFilter, setCategoryFilter] =
		React.useState<MagicItemCategory | 'all'>('all')
	const [jsonString, setJsonString] = React.useState<string>('')
	const [parseError, setParseError] = React.useState<string>('')

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

	return (
		<>
			<style type="text/css" media="print">
				{
					'\
        @page { size: 192mm 267mm; }\
      '
				}
			</style>
			<Stack
				flexDirection="column"
				gap={2}
				sx={{
					mb: 2,
					py: 2,
					px: 3,
					backgroundColor:
						muiTheme.palette.mode === 'dark' ? '#1e1e1e' : 'white',
					borderRadius: '8px',
				}}
			>
				<Typography variant="h6" component="h2">
					Magic Item Card Printing
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Upload magic items as JSON to print them as cards. Supports single
					items or arrays of items. Cards will be formatted for easy printing
					and cutting.
				</Typography>

				<Divider sx={{ my: 1 }} />

				<TextField
					multiline
					minRows={5}
					maxRows={10}
					fullWidth
					label="Upload Magic Items as JSON"
					value={jsonString}
					onChange={(event) => handleJsonUpload(event.target.value)}
					placeholder='Paste JSON here (single item or array)...'
					helperText={
						parseError ||
						'Upload one or more magic items in JSON format. See documentation for format details.'
					}
					error={parseError.includes('Failed')}
				/>

				<Divider sx={{ my: 1 }} />

				<Stack flexDirection="row" gap={1} alignItems="center" flexWrap="wrap">
					<Button
						variant="contained"
						size="large"
						onClick={handlePrint}
						disabled={filteredItems.length === 0}
					>
						PRINT
					</Button>
					<FormControl sx={{ m: 1, width: 150 }}>
						<InputLabel>Category</InputLabel>
						<Select
							value={categoryFilter}
							onChange={handleCategoryFilterChange}
							input={<OutlinedInput label="Category" />}
							sx={{
								backgroundColor:
									muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
							}}
						>
							<MenuItem value="all">All Categories</MenuItem>
							<MenuItem value="Weapon">Weapons</MenuItem>
							<MenuItem value="Wearable">Wearables</MenuItem>
							<MenuItem value="Consumable">Consumables</MenuItem>
							<MenuItem value="Spell Scroll">Spell Scrolls</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, width: 300 }}>
						<InputLabel>Magic Items</InputLabel>
						<Select
							multiple
							value={selectedItems}
							onChange={handleChange}
							input={<OutlinedInput label="Magic Items" />}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
							sx={{
								backgroundColor:
									muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
							}}
						>
							{availableItems.map(({ name, category }) => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={selectedItems.indexOf(name) > -1} />
									<ListItemText primary={name} secondary={category} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button variant="outlined" size="small" onClick={selectAll}>
						Select all
					</Button>
					<Button variant="outlined" size="small" onClick={deselectAll}>
						Deselect all
					</Button>
				</Stack>
			</Stack>
			<Typography variant="subtitle1" sx={{ mb: 2 }}>
				{filteredItems.length} Magic Item{filteredItems.length !== 1 ? 's' : ''}{' '}
				will be printed:
			</Typography>
			<div className="magic-items--container" ref={componentRef}>
				{filteredItems.map((item, index) => (
					<React.Fragment key={item.name}>
						<MagicItemCard {...item} />
						{Boolean(index % 9 === 8) && <div className="page-break" />}
					</React.Fragment>
				))}
				{!filteredItems.length && (
					<Typography variant="body2">
						Upload magic items above to include them for printing.
					</Typography>
				)}
			</div>
		</>
	)
}
