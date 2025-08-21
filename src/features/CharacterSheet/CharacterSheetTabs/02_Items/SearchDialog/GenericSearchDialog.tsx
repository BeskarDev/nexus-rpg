import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableSortLabel,
	InputAdornment,
} from '@mui/material'
import React, { useState, useMemo, ReactNode } from 'react'
import { Search } from '@mui/icons-material'

export type SearchDialogColumn<T> = {
	key: keyof T
	label: string
	align?: 'left' | 'center' | 'right'
	sortable?: boolean
	render?: (value: any, item: T) => ReactNode
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
}: SearchDialogProps<T>) {
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState<keyof T | null>(null)
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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
			return filtered.sort((a, b) => {
				let aValue: any = a[sortBy]
				let bValue: any = b[sortBy]

				// Convert to numbers if they look like numbers
				const aNum = Number(aValue)
				const bNum = Number(bValue)
				if (!isNaN(aNum) && !isNaN(bNum)) {
					aValue = aNum
					bValue = bNum
				} else {
					aValue = String(aValue).toLowerCase()
					bValue = String(bValue).toLowerCase()
				}

				if (sortOrder === 'asc') {
					return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
				} else {
					return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
				}
			})
		}

		return filtered
	}, [data, searchQuery, searchFields, sortBy, sortOrder])

	const handleSort = (column: keyof T) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(column)
			setSortOrder('asc')
		}
	}

	const handleItemToggle = (itemKey: string) => {
		const newSelected = new Set(selectedItems)
		if (newSelected.has(itemKey)) {
			newSelected.delete(itemKey)
		} else {
			newSelected.add(itemKey)
		}
		onSelectionChange(newSelected)
	}

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			onSelectionChange(new Set(filteredData.map(getItemKey)))
		} else {
			onSelectionChange(new Set())
		}
	}

	const handleClose = () => {
		onSelectionChange(new Set())
		setSearchQuery('')
		setSortBy(null)
		setSortOrder('asc')
		onClose()
	}

	const handleImport = () => {
		onImport()
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Search"
					placeholder={searchPlaceholder}
					fullWidth
					variant="outlined"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					sx={{ mb: 2 }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						),
					}}
				/>

				<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
					{filteredData.length} item{filteredData.length !== 1 ? 's' : ''} found
					{selectedItems.size > 0 && ` · ${selectedItems.size} selected`}
				</Typography>

				<TableContainer
					component={Paper}
					sx={{ maxHeight: '450px', overflow: 'auto' }}
				>
					<Table stickyHeader size="small">
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										indeterminate={
											selectedItems.size > 0 &&
											selectedItems.size < filteredData.length
										}
										checked={
											filteredData.length > 0 &&
											selectedItems.size === filteredData.length
										}
										onChange={(e) => handleSelectAll(e.target.checked)}
									/>
								</TableCell>
								{columns.map((column) => (
									<TableCell
										key={String(column.key)}
										align={column.align || 'left'}
										style={{ width: column.width }}
									>
										{column.sortable !== false ? (
											<TableSortLabel
												active={sortBy === column.key}
												direction={sortBy === column.key ? sortOrder : 'asc'}
												onClick={() => handleSort(column.key)}
											>
												{column.label}
											</TableSortLabel>
										) : (
											column.label
										)}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredData.map((item) => {
								const itemKey = getItemKey(item)
								return (
									<TableRow
										key={itemKey}
										hover
										selected={selectedItems.has(itemKey)}
										onClick={() => handleItemToggle(itemKey)}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell
											padding="checkbox"
											onClick={(e) => e.stopPropagation()}
										>
											<Checkbox
												checked={selectedItems.has(itemKey)}
												onChange={() => handleItemToggle(itemKey)}
											/>
										</TableCell>
										{columns.map((column) => (
											<TableCell
												key={String(column.key)}
												align={column.align || 'left'}
											>
												{column.render
													? column.render(item[column.key], item)
													: String(item[column.key])}
											</TableCell>
										))}
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					onClick={handleImport}
					variant="contained"
					disabled={selectedItems.size === 0}
				>
					{importButtonText} {selectedItems.size} item
					{selectedItems.size !== 1 ? 's' : ''}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
