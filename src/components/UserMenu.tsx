import React, { useState, useEffect } from 'react'
import {
	Box,
	Typography,
	Button,
	Divider,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	CircularProgress,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Alert,
} from '@mui/material'
import {
	Person as PersonIcon,
	Edit as EditIcon,
	Logout as LogoutIcon,
	AdminPanelSettings as AdminIcon,
} from '@mui/icons-material'
import { signOut } from '../config/auth'
import { useAuth } from '../hooks/firebaseAuthContext'
import { db } from '../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { logger } from '../features/CharacterSheet/utils'

interface EditNameDialogProps {
	open: boolean
	currentName: string
	onClose: () => void
	onSave: (name: string) => Promise<void>
}

const EditNameDialog: React.FC<EditNameDialogProps> = ({
	open,
	currentName,
	onClose,
	onSave,
}) => {
	const [name, setName] = useState(currentName)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setName(currentName)
	}, [currentName, open])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim()) return

		setLoading(true)
		setError(null)

		try {
			await onSave(name.trim())
			onClose()
		} catch (err: any) {
			setError(err.message || 'Failed to update name')
		} finally {
			setLoading(false)
		}
	}

	const handleClose = () => {
		if (!loading) {
			setError(null)
			onClose()
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Edit Player Name</DialogTitle>
				<DialogContent>
					<Box sx={{ pt: 2 }}>
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
							helperText={error || 'This name will be visible to the game master'}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} disabled={loading}>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={loading || !name.trim() || name.trim() === currentName}
						startIcon={loading ? <CircularProgress size={20} /> : null}
					>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

export const UserMenu: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
	const { userLoggedIn, currentUser, isAdmin } = useAuth()
	const [playerName, setPlayerName] = useState<string>('')
	const [loading, setLoading] = useState(true)
	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const [updateSuccess, setUpdateSuccess] = useState(false)

	useEffect(() => {
		if (userLoggedIn && currentUser) {
			loadPlayerName()
		}
	}, [userLoggedIn, currentUser])

	const loadPlayerName = async () => {
		if (!currentUser) return

		setLoading(true)
		try {
			const userInfoDoc = await getDoc(doc(db, `${currentUser.uid}/player-info`))
			if (userInfoDoc.exists()) {
				const data = userInfoDoc.data()
				setPlayerName(data.name || '')
			}
		} catch (error) {
			logger.error('Error loading player name', error)
		} finally {
			setLoading(false)
		}
	}

	const handleSaveName = async (name: string) => {
		if (!currentUser) return

		try {
			const userInfoRef = doc(db, `${currentUser.uid}/player-info`)
			await setDoc(
				userInfoRef,
				{
					name: name,
					email: currentUser.email,
				},
				{ merge: true }
			)
			setPlayerName(name)
			setUpdateSuccess(true)
			setTimeout(() => setUpdateSuccess(false), 3000)
		} catch (error) {
			logger.error('Error saving player name', error)
			throw error
		}
	}

	const handleLogout = async () => {
		await signOut()
		if (onClose) onClose()
	}

	const handleAdminClick = () => {
		window.location.href = '/admin'
		if (onClose) onClose()
	}

	if (!userLoggedIn || !currentUser) {
		return null
	}

	return (
		<Box sx={{ minWidth: 280, p: 2 }}>
			<EditNameDialog
				open={editDialogOpen}
				currentName={playerName}
				onClose={() => setEditDialogOpen(false)}
				onSave={handleSaveName}
			/>

			{/* User Info Section */}
			<Box sx={{ mb: 2 }}>
				<Typography variant="subtitle2" color="text.secondary" gutterBottom>
					Logged in as
				</Typography>
				<Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
					{currentUser.email}
				</Typography>
				
				{loading ? (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
						<CircularProgress size={16} />
						<Typography variant="body2" color="text.secondary">
							Loading...
						</Typography>
					</Box>
				) : (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<PersonIcon fontSize="small" color="action" />
						<Typography variant="body2">
							{playerName || 'No name set'}
						</Typography>
					</Box>
				)}

				{isAdmin && (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
						<AdminIcon fontSize="small" color="primary" />
						<Typography variant="body2" color="primary">
							Admin User
						</Typography>
					</Box>
				)}
			</Box>

			{updateSuccess && (
				<Alert severity="success" sx={{ mb: 2 }}>
					Name updated successfully!
				</Alert>
			)}

			<Divider sx={{ my: 2 }} />

			{/* Menu Options */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				<MenuItem
					onClick={() => setEditDialogOpen(true)}
					disabled={loading}
					sx={{ borderRadius: 1 }}
				>
					<ListItemIcon>
						<EditIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Edit Player Name" />
				</MenuItem>

				{isAdmin && (
					<MenuItem
						onClick={handleAdminClick}
						sx={{ borderRadius: 1 }}
					>
						<ListItemIcon>
							<AdminIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Admin Panel" />
					</MenuItem>
				)}

				<Divider sx={{ my: 1 }} />

				<MenuItem
					onClick={handleLogout}
					sx={{ borderRadius: 1, color: 'error.main' }}
				>
					<ListItemIcon>
						<LogoutIcon fontSize="small" color="error" />
					</ListItemIcon>
					<ListItemText primary="Logout" />
				</MenuItem>
			</Box>
		</Box>
	)
}
