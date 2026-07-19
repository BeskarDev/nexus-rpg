import React, { useEffect, useState } from 'react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	Box,
	Button,
	Checkbox,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { FieldChange } from '../utils/computeContentUpdates'

export type RefreshUpdateEntry = {
	id: string
	name: string
	sublabel?: string
	changes: FieldChange[]
}

export type RefreshUpdatesDialogProps = {
	open: boolean
	onClose: () => void
	title: string
	/** singular noun, e.g. "spell" or "talent" */
	itemNoun: string
	entries: RefreshUpdateEntry[]
	onConfirm: (selectedIds: string[]) => void
}

const ChangeTable: React.FC<{ changes: FieldChange[] }> = ({ changes }) => (
	<Table size="small">
		<TableBody>
			{changes.map((c) => (
				<TableRow key={c.field} sx={{ verticalAlign: 'top' }}>
					<TableCell sx={{ fontWeight: 600, width: '8rem', border: 0 }}>
						{c.field}
					</TableCell>
					<TableCell sx={{ border: 0 }}>
						<Typography
							variant="caption"
							component="div"
							sx={{
								color: 'error.main',
								textDecoration: 'line-through',
								whiteSpace: 'pre-wrap',
								opacity: 0.8,
							}}
						>
							{c.before || '(empty)'}
						</Typography>
						<Typography
							variant="caption"
							component="div"
							sx={{ color: 'success.main', whiteSpace: 'pre-wrap' }}
						>
							{c.after || '(empty)'}
						</Typography>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
)

export const RefreshUpdatesDialog: React.FC<RefreshUpdatesDialogProps> = ({
	open,
	onClose,
	title,
	itemNoun,
	entries,
	onConfirm,
}) => {
	const [selected, setSelected] = useState<Set<string>>(new Set())

	// Select everything by default whenever the dialog (re)opens with new data.
	// Keyed on the entry ids (not the array reference) so unrelated re-renders
	// while the dialog is open don't wipe the user's checkbox choices.
	const entryIdKey = entries.map((e) => e.id).join('|')
	useEffect(() => {
		if (open) {
			setSelected(new Set(entryIdKey ? entryIdKey.split('|') : []))
		}
	}, [open, entryIdKey])

	const toggle = (id: string) => {
		setSelected((prev) => {
			const next = new Set(prev)
			if (next.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}
			return next
		})
	}

	const nothingToUpdate = entries.length === 0

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>
				{nothingToUpdate ? (
					<Typography variant="body2">
						All {itemNoun}s are up to date with the latest rulebook versions.
					</Typography>
				) : (
					<>
						<Alert severity="warning" sx={{ mb: 2 }}>
							<strong>Back up your character before updating.</strong> This
							replaces the selected {itemNoun}s with their latest versions from
							the rulebook, including recalculated damage values. This cannot be
							undone.
						</Alert>
						{entries.map((entry) => (
							<Accordion key={entry.id} disableGutters>
								<AccordionSummary expandIcon={<ExpandMore />}>
									<FormControlLabel
										onClick={(e) => e.stopPropagation()}
										onFocus={(e) => e.stopPropagation()}
										control={
											<Checkbox
												checked={selected.has(entry.id)}
												onChange={() => toggle(entry.id)}
											/>
										}
										label={
											<Box
												sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
											>
												<Typography sx={{ fontWeight: 600 }}>
													{entry.name}
												</Typography>
												{entry.sublabel && (
													<Typography variant="caption" color="text.secondary">
														{entry.sublabel}
													</Typography>
												)}
												<Chip
													size="small"
													label={`${entry.changes.length} change${entry.changes.length === 1 ? '' : 's'}`}
													color="info"
													variant="outlined"
												/>
											</Box>
										}
									/>
								</AccordionSummary>
								<AccordionDetails>
									<ChangeTable changes={entry.changes} />
								</AccordionDetails>
							</Accordion>
						))}
					</>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				{!nothingToUpdate && (
					<Button
						variant="contained"
						disabled={selected.size === 0}
						onClick={() => onConfirm(Array.from(selected))}
					>
						Update {selected.size} {itemNoun}
						{selected.size === 1 ? '' : 's'}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	)
}
