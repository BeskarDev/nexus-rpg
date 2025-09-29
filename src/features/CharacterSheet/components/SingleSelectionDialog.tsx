import {
	Button,
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
	Radio,
} from '@mui/material'
import React, { useState, useMemo, ReactNode } from 'react'
import { Search } from '@mui/icons-material'

export type SingleSelectionDialogColumn<T> = {
	key: keyof T
	label: string
	align?: 'left' | 'center' | 'right'
	sortable?: boolean
	render?: (value: any, item: T) => ReactNode
	width?: string
}

export type SingleSelectionDialogProps<T> = {
	open: boolean
	onClose: () => void
	title: string
	data: T[]
	columns: SingleSelectionDialogColumn<T>[]
	searchFields: (keyof T)[]
	selectedItem?: string
	onSelectionChange: (selectedKey: string | null) => void
	onConfirm: () => void
	getItemKey: (item: T) => string
	confirmButtonText?: string
	searchPlaceholder?: string
}

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
}: SingleSelectionDialogProps<T>) {
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
		// For single selection, if the same item is clicked, deselect it, otherwise select it
		if (selectedItem === itemKey) {
			onSelectionChange(null)
		} else {
			onSelectionChange(itemKey)
		}
	}

	const handleClose = () => {
		onSelectionChange(null)
		setSearchQuery('')
		setSortBy(null)
		setSortOrder('asc')
		onClose()
	}

	const handleConfirm = () => {
		onConfirm()
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
					{selectedItem && ` · 1 selected`}
				</Typography>

				<TableContainer
					component={Paper}
					sx={{ maxHeight: '450px', overflow: 'auto' }}
				>
					<Table stickyHeader size="small">
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									{/* Header for radio button column */}
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
										selected={selectedItem === itemKey}
										onClick={() => handleItemToggle(itemKey)}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell
											padding="checkbox"
											onClick={(e) => e.stopPropagation()}
										>
											<Radio
												checked={selectedItem === itemKey}
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
					onClick={handleConfirm}
					variant="contained"
					disabled={!selectedItem}
				>
					{confirmButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
