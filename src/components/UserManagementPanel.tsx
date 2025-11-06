import React, { useState, useEffect } from 'react'
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
	Alert,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Chip,
} from '@mui/material'
import {
	PersonAdd as PersonAddIcon,
	LockReset as LockResetIcon,
	Refresh as RefreshIcon,
} from '@mui/icons-material'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from '../config/firebase'

interface User {
	uid: string
	email: string
	displayName?: string
	emailVerified: boolean
	disabled: boolean
	metadata: {
		creationTime: string
		lastSignInTime?: string
	}
}

interface InviteUserDialogProps {
	open: boolean
	onClose: () => void
	onInvite: (email: string) => void
	loading: boolean
}

const InviteUserDialog: React.FC<InviteUserDialogProps> = ({
	open,
	onClose,
	onInvite,
	loading,
}) => {
	const [email, setEmail] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (email.trim()) {
			onInvite(email.trim())
		}
	}

	const handleClose = () => {
		setEmail('')
		onClose()
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Invite New User</DialogTitle>
				<DialogContent>
					<Box sx={{ pt: 2 }}>
						<TextField
							autoFocus
							fullWidth
							label="Email Address"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={loading}
							placeholder="user@example.com"
						/>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							The user will receive an email with instructions to set their
							password and complete their account setup.
						</Typography>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} disabled={loading}>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={loading || !email.trim()}
						startIcon={loading ? <CircularProgress size={20} /> : <PersonAddIcon />}
					>
						Send Invitation
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

interface PasswordResetDialogProps {
	open: boolean
	onClose: () => void
	onReset: () => void
	loading: boolean
	userEmail: string
}

const PasswordResetDialog: React.FC<PasswordResetDialogProps> = ({
	open,
	onClose,
	onReset,
	loading,
	userEmail,
}) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Trigger Password Reset</DialogTitle>
			<DialogContent>
				<Typography variant="body1" gutterBottom>
					Send a password reset email to:
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
					{userEmail}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					The user will receive an email with a link to reset their password.
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button
					onClick={onReset}
					variant="contained"
					disabled={loading}
					startIcon={loading ? <CircularProgress size={20} /> : <LockResetIcon />}
				>
					Send Reset Email
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export const UserManagementPanel: React.FC = () => {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(false)
	const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
	const [resetDialogOpen, setResetDialogOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')

	const functions = getFunctions(app)

	const loadUsers = async () => {
		setLoading(true)
		setError(null)
		try {
			const listUsersFunction = httpsCallable(functions, 'listUsers')
			const result = await listUsersFunction({})
			const data = result.data as any
			if (data.success) {
				setUsers(data.users)
			} else {
				setError('Failed to load users')
			}
		} catch (err: any) {
			console.error('Error loading users:', err)
			setError(err.message || 'Failed to load users. Make sure you have admin permissions.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadUsers()
	}, [])

	const handleInviteUser = async (email: string) => {
		setLoading(true)
		setError(null)
		setSuccess(null)
		try {
			const inviteUserFunction = httpsCallable(functions, 'inviteUser')
			const result = await inviteUserFunction({ email })
			const data = result.data as any
			if (data.success) {
				setSuccess(data.message)
				setInviteDialogOpen(false)
				loadUsers() // Refresh user list
			} else {
				setError('Failed to invite user')
			}
		} catch (err: any) {
			console.error('Error inviting user:', err)
			setError(err.message || 'Failed to invite user')
		} finally {
			setLoading(false)
		}
	}

	const handleTriggerPasswordReset = async () => {
		if (!selectedUser) return

		setLoading(true)
		setError(null)
		setSuccess(null)
		try {
			const triggerPasswordResetFunction = httpsCallable(
				functions,
				'triggerPasswordReset'
			)
			const result = await triggerPasswordResetFunction({ email: selectedUser.email })
			const data = result.data as any
			if (data.success) {
				setSuccess(data.message)
				setResetDialogOpen(false)
				setSelectedUser(null)
			} else {
				setError('Failed to trigger password reset')
			}
		} catch (err: any) {
			console.error('Error triggering password reset:', err)
			setError(err.message || 'Failed to trigger password reset')
		} finally {
			setLoading(false)
		}
	}

	const filteredUsers = users.filter(
		(user) =>
			user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<Box>
			<Card>
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: 3,
						}}
					>
						<Typography variant="h5" component="h2">
							User Management
						</Typography>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								variant="outlined"
								startIcon={<RefreshIcon />}
								onClick={loadUsers}
								disabled={loading}
							>
								Refresh
							</Button>
							<Button
								variant="contained"
								startIcon={<PersonAddIcon />}
								onClick={() => setInviteDialogOpen(true)}
								disabled={loading}
							>
								Invite User
							</Button>
						</Box>
					</Box>

					{error && (
						<Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
							{error}
						</Alert>
					)}

					{success && (
						<Alert
							severity="success"
							sx={{ mb: 2 }}
							onClose={() => setSuccess(null)}
						>
							{success}
						</Alert>
					)}

					<TextField
						fullWidth
						label="Search users"
						variant="outlined"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						sx={{ mb: 2 }}
						placeholder="Search by email or name..."
					/>

					{loading && users.length === 0 ? (
						<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
							<CircularProgress />
						</Box>
					) : (
						<TableContainer component={Paper} variant="outlined">
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Email</TableCell>
										<TableCell>Display Name</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Last Sign In</TableCell>
										<TableCell align="right">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredUsers.length === 0 ? (
										<TableRow>
											<TableCell colSpan={5} align="center">
												<Typography color="text.secondary">
													{searchTerm
														? 'No users match your search'
														: 'No users found'}
												</Typography>
											</TableCell>
										</TableRow>
									) : (
										filteredUsers.map((user) => (
											<TableRow key={user.uid}>
												<TableCell>{user.email}</TableCell>
												<TableCell>{user.displayName || '-'}</TableCell>
												<TableCell>
													<Box sx={{ display: 'flex', gap: 1 }}>
														{user.emailVerified ? (
															<Chip
																label="Verified"
																color="success"
																size="small"
															/>
														) : (
															<Chip
																label="Unverified"
																color="warning"
																size="small"
															/>
														)}
														{user.disabled && (
															<Chip label="Disabled" color="error" size="small" />
														)}
													</Box>
												</TableCell>
												<TableCell>
													{user.metadata.lastSignInTime
														? new Date(
																user.metadata.lastSignInTime
														  ).toLocaleDateString()
														: 'Never'}
												</TableCell>
												<TableCell align="right">
													<IconButton
														size="small"
														onClick={() => {
															setSelectedUser(user)
															setResetDialogOpen(true)
														}}
														title="Trigger password reset"
													>
														<LockResetIcon />
													</IconButton>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</CardContent>
			</Card>

			<InviteUserDialog
				open={inviteDialogOpen}
				onClose={() => setInviteDialogOpen(false)}
				onInvite={handleInviteUser}
				loading={loading}
			/>

			<PasswordResetDialog
				open={resetDialogOpen}
				onClose={() => {
					setResetDialogOpen(false)
					setSelectedUser(null)
				}}
				onReset={handleTriggerPasswordReset}
				loading={loading}
				userEmail={selectedUser?.email || ''}
			/>
		</Box>
	)
}
