import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Box,
} from '@mui/material'

export interface ConflictResolutionDialogProps {
	open: boolean
	onClose: () => void
	onUseLocal: () => void
	onUseServer: () => void
	localNotes: string
	serverNotes: string
}

export const ConflictResolutionDialog: React.FC<ConflictResolutionDialogProps> = ({
	open,
	onClose,
	onUseLocal,
	onUseServer,
	localNotes,
	serverNotes,
}) => {
	const handleUseLocal = () => {
		onUseLocal()
		onClose()
	}

	const handleUseServer = () => {
		onUseServer()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>Conflicting Changes Detected</DialogTitle>
			<DialogContent>
				<Typography variant="body1" mb={2}>
					Both your local notes and the server have been modified. Please choose
					which version to keep:
				</Typography>

				<Box mb={2}>
					<Typography variant="h6" gutterBottom>
						Your Local Changes:
					</Typography>
					<Box
						sx={{
							p: 2,
							border: '1px solid',
							borderColor: 'divider',
							borderRadius: 1,
							backgroundColor: 'rgba(25, 118, 210, 0.08)',
							maxHeight: 200,
							overflow: 'auto',
						}}
					>
						<Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
							{localNotes || '(empty)'}
						</Typography>
					</Box>
				</Box>

				<Box mb={2}>
					<Typography variant="h6" gutterBottom>
						Server Version:
					</Typography>
					<Box
						sx={{
							p: 2,
							border: '1px solid',
							borderColor: 'divider',
							borderRadius: 1,
							backgroundColor: 'rgba(46, 125, 50, 0.08)',
							maxHeight: 200,
							overflow: 'auto',
						}}
					>
						<Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
							{serverNotes || '(empty)'}
						</Typography>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="inherit">
					Cancel
				</Button>
				<Button onClick={handleUseServer} color="success" variant="outlined">
					Use Server Version
				</Button>
				<Button onClick={handleUseLocal} color="primary" variant="contained">
					Keep My Changes
				</Button>
			</DialogActions>
		</Dialog>
	)
}