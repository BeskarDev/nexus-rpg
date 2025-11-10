import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Typography,
	Box,
	CircularProgress,
} from '@mui/material'

interface PlayerNameDialogProps {
	open: boolean
	onSubmit: (name: string) => Promise<void>
}

export const PlayerNameDialog: React.FC<PlayerNameDialogProps> = ({
	open,
	onSubmit,
}) => {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim()) return

		setLoading(true)
		setError(null)

		try {
			await onSubmit(name.trim())
		} catch (err: any) {
			setError(err.message || 'Failed to save player name')
			setLoading(false)
		}
	}

	return (
		<Dialog
			open={open}
			maxWidth="sm"
			fullWidth
			disableEscapeKeyDown
			onClose={(event, reason) => {
				// Prevent closing by clicking outside or pressing escape
				if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
					return
				}
			}}
		>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Welcome! Set Your Player Name</DialogTitle>
				<DialogContent>
					<Box sx={{ pt: 2 }}>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							Please enter your name to get started with the character sheet.
							This name will be visible to the game master.
						</Typography>
						<TextField
							autoFocus
							fullWidth
							label="Player Name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							disabled={loading}
							placeholder="John Doe"
							error={!!error}
							helperText={error}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						type="submit"
						variant="contained"
						disabled={loading || !name.trim()}
						startIcon={loading ? <CircularProgress size={20} /> : null}
					>
						Continue
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
