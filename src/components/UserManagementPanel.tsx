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
	Tooltip,
} from '@mui/material'
import {
	PersonAdd as PersonAddIcon,
	LockReset as LockResetIcon,
	Refresh as RefreshIcon,
	VerifiedUser as VerifiedUserIcon,
	Delete as DeleteIcon,
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
	onInvite: (email: string, displayName: string) => void
	loading: boolean
	onSuccess?: () => void
}

const InviteUserDialog: React.FC<InviteUserDialogProps> = ({
	open,
	onClose,
	onInvite,
	loading,
	onSuccess,
}) => {
	const [email, setEmail] = useState('')
	const [displayName, setDisplayName] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (email.trim()) {
			onInvite(email.trim(), displayName.trim())
		}
	}

	const handleClose = () => {
		if (!loading) {
			setEmail('')
			setDisplayName('')
			onClose()
		}
	}

	// Clear form when successfully invited
	React.useEffect(() => {
		if (onSuccess) {
			setEmail('')
			setDisplayName('')
		}
	}, [onSuccess])

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Invite New User</DialogTitle>
				<DialogContent>
					<Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
						<TextField
							fullWidth
							label="Player Name (Optional)"
							type="text"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							disabled={loading}
							placeholder="John Doe"
							helperText="If not provided, the user will be prompted to set their name on first login"
						/>
						<Typography variant="body2" color="text.secondary">
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
						startIcon={
							loading ? <CircularProgress size={20} /> : <PersonAddIcon />
						}
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
					startIcon={
						loading ? <CircularProgress size={20} /> : <LockResetIcon />
					}
				>
					Send Reset Email
				</Button>
			</DialogActions>
		</Dialog>
	)
}

interface VerifyEmailDialogProps {
	open: boolean
	onClose: () => void
	onVerify: () => void
	loading: boolean
	userEmail: string
}

const VerifyEmailDialog: React.FC<VerifyEmailDialogProps> = ({
	open,
	onClose,
	onVerify,
	loading,
	userEmail,
}) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Verify User Email</DialogTitle>
			<DialogContent>
				<Typography variant="body1" gutterBottom>
					Manually verify the email for:
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
					{userEmail}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					This will mark the user's email as verified without requiring them to
					click a verification link.
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button
					onClick={onVerify}
					variant="contained"
					color="success"
					disabled={loading}
					startIcon={
						loading ? <CircularProgress size={20} /> : <VerifiedUserIcon />
					}
				>
					Verify Email
				</Button>
			</DialogActions>
		</Dialog>
	)
}

interface DeleteUserDialogProps {
	open: boolean
	onClose: () => void
	onDelete: () => void
	loading: boolean
	userEmail: string
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
	open,
	onClose,
	onDelete,
	loading,
	userEmail,
}) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Delete User</DialogTitle>
			<DialogContent>
				<Alert severity="warning" sx={{ mb: 2 }}>
					<strong>Warning:</strong> This action cannot be undone!
				</Alert>
				<Typography variant="body1" gutterBottom>
					Are you sure you want to permanently delete this user?
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
					{userEmail}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					This will delete:
				</Typography>
				<ul>
					<li>
						<Typography variant="body2" color="text.secondary">
							The user's authentication account
						</Typography>
					</li>
					<li>
						<Typography variant="body2" color="text.secondary">
							All associated Firestore data (characters, settings, etc.)
						</Typography>
					</li>
					<li>
						<Typography variant="body2" color="text.secondary">
							Admin privileges (if any)
						</Typography>
					</li>
				</ul>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button
					onClick={onDelete}
					variant="contained"
					color="error"
					disabled={loading}
					startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}
				>
					Delete User
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
	const [verifyDialogOpen, setVerifyDialogOpen] = useState(false)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [resetLink, setResetLink] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [inviteSuccess, setInviteSuccess] = useState(false)

	// Configure functions to use Europe region (Frankfurt, Germany)
	const functions = getFunctions(app, 'europe-west3')

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
			setError(
				err.message ||
					'Failed to load users. Make sure you have admin permissions.',
			)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadUsers()
	}, [])

	const handleInviteUser = async (email: string, displayName: string) => {
		setLoading(true)
		setError(null)
		setSuccess(null)
		setResetLink(null)
		setInviteSuccess(false)
		try {
			const inviteUserFunction = httpsCallable(functions, 'inviteUser')
			const result = await inviteUserFunction({ email, displayName })
			const data = result.data as any
			if (data.success) {
				setSuccess(data.message)
				if (data.resetLink) {
					setResetLink(data.resetLink)
				}
				setInviteSuccess(true)
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
				'triggerPasswordReset',
			)
			const result = await triggerPasswordResetFunction({
				email: selectedUser.email,
			})
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

	const handleVerifyEmail = async () => {
		if (!selectedUser?.email) return

		setLoading(true)
		setError(null)
		setSuccess(null)
		try {
			const verifyEmailFunction = httpsCallable(functions, 'verifyUserEmail')
			const result = await verifyEmailFunction({ email: selectedUser.email })
			const data = result.data as any

			if (data.success) {
				setSuccess(data.message)
				setVerifyDialogOpen(false)
				setSelectedUser(null)
				// Reload users to show updated status
				await loadUsers()
			}
		} catch (err: any) {
			console.error('Error verifying email:', err)
			setError(err.message || 'Failed to verify email')
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteUser = async () => {
		if (!selectedUser?.email) return

		setLoading(true)
		setError(null)
		setSuccess(null)
		try {
			const deleteUserFunction = httpsCallable(functions, 'deleteUser')
			const result = await deleteUserFunction({ email: selectedUser.email })
			const data = result.data as any

			if (data.success) {
				setSuccess(data.message)
				setDeleteDialogOpen(false)
				setSelectedUser(null)
				// Reload users to show updated list
				await loadUsers()
			}
		} catch (err: any) {
			console.error('Error deleting user:', err)
			setError(err.message || 'Failed to delete user')
		} finally {
			setLoading(false)
		}
	}

	const filteredUsers = users.filter(
		(user) =>
			user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()),
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
								title="Refresh user list"
							>
								Refresh
							</Button>
							<Button
								variant="contained"
								startIcon={<PersonAddIcon />}
								onClick={() => setInviteDialogOpen(true)}
								disabled={loading}
								title="Invite a new user"
							>
								Invite User
							</Button>
						</Box>
					</Box>

					{error && (
						<Alert
							severity="error"
							sx={{ mb: 2 }}
							onClose={() => setError(null)}
						>
							{error}
						</Alert>
					)}

					{success && (
						<Alert
							severity="success"
							sx={{ mb: 2 }}
							onClose={() => {
								setSuccess(null)
								setResetLink(null)
							}}
						>
							<Box>
								<Typography>{success}</Typography>
								{resetLink && (
									<Box sx={{ mt: 2 }}>
										<Typography variant="body2" sx={{ mb: 1 }}>
											<strong>Password Reset Link:</strong>
										</Typography>
										<TextField
											fullWidth
											value={resetLink}
											size="small"
											InputProps={{
												readOnly: true,
											}}
											sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
										/>
										<Typography
											variant="caption"
											color="text.secondary"
											sx={{ mt: 1, display: 'block' }}
										>
											Copy this link and send it to the user via email or
											another secure channel.
										</Typography>
									</Box>
								)}
							</Box>
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
															<Chip
																label="Disabled"
																color="error"
																size="small"
															/>
														)}
													</Box>
												</TableCell>
												<TableCell>
													{user.metadata.lastSignInTime
														? new Date(
																user.metadata.lastSignInTime,
															).toLocaleDateString()
														: 'Never'}
												</TableCell>
												<TableCell align="right">
													<Box
														sx={{
															display: 'flex',
															gap: 0.5,
															justifyContent: 'flex-end',
														}}
													>
														{!user.emailVerified && (
															<Tooltip title="Manually verify this user's email">
																<IconButton
																	size="small"
																	onClick={() => {
																		setSelectedUser(user)
																		setVerifyDialogOpen(true)
																	}}
																>
																	<VerifiedUserIcon />
																</IconButton>
															</Tooltip>
														)}
														<Tooltip title="Send password reset email to this user">
															<IconButton
																size="small"
																onClick={() => {
																	setSelectedUser(user)
																	setResetDialogOpen(true)
																}}
															>
																<LockResetIcon />
															</IconButton>
														</Tooltip>
														<Tooltip title="Delete this user permanently">
															<IconButton
																size="small"
																color="error"
																onClick={() => {
																	setSelectedUser(user)
																	setDeleteDialogOpen(true)
																}}
															>
																<DeleteIcon />
															</IconButton>
														</Tooltip>
													</Box>
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
				onSuccess={inviteSuccess ? () => setInviteSuccess(false) : undefined}
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

			<VerifyEmailDialog
				open={verifyDialogOpen}
				onClose={() => {
					setVerifyDialogOpen(false)
					setSelectedUser(null)
				}}
				onVerify={handleVerifyEmail}
				loading={loading}
				userEmail={selectedUser?.email || ''}
			/>

			<DeleteUserDialog
				open={deleteDialogOpen}
				onClose={() => {
					setDeleteDialogOpen(false)
					setSelectedUser(null)
				}}
				onDelete={handleDeleteUser}
				loading={loading}
				userEmail={selectedUser?.email || ''}
			/>
		</Box>
	)
}
