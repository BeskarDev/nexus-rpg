import React, { useEffect, useState } from 'react'
import Layout from '@theme/Layout'
import {
	Box,
	Container,
	Typography,
	Alert,
	CircularProgress,
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { UserManagementPanel } from '@site/src/components/UserManagementPanel'
import { useAuth, AuthProvider } from '@site/src/hooks/firebaseAuthContext'
import { useHistory } from '@docusaurus/router'
import { theme } from '@site/src/hooks/createTheme'

/**
 * Admin Panel Page
 *
 * Security: This page is only accessible by authenticated admin users.
 * - User must be logged in
 * - User must have admin privileges (checked via custom claims or Firestore)
 * - Non-admin users will see an access denied message
 * - Not linked in navigation - only accessible by direct URL
 */
function AdminPanelContent() {
	const { userLoggedIn, isAdmin, currentUser } = useAuth()
	const [isVerifying, setIsVerifying] = useState(true)
	const history = useHistory()

	// Verify admin status with a delay to ensure auth is fully loaded
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVerifying(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	// Render content based on authentication state
	let content: React.ReactNode

	if (isVerifying) {
		content = (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '50vh',
				}}
			>
				<CircularProgress />
			</Box>
		)
	} else if (!userLoggedIn || !currentUser) {
		content = (
			<Alert severity="warning">
				You must be logged in to access the admin panel.
				<Typography variant="body2" sx={{ mt: 1 }}>
					Please log in and try again. If you believe you should have
					access, contact your administrator.
				</Typography>
			</Alert>
		)
	} else if (!isAdmin) {
		content = (
			<Alert severity="error">
				Access Denied: You do not have permission to access the admin panel.
				<Typography variant="body2" sx={{ mt: 1 }}>
					This page is restricted to administrators only. If you believe you
					should have access, please contact your system administrator.
				</Typography>
			</Alert>
		)
	} else {
		// Only render admin panel for verified admin users
		content = (
			<>
				<Alert severity="info" sx={{ mb: 3 }}>
					<Typography variant="body2">
						<strong>Security Notice:</strong> You are accessing the admin panel.
						All actions are logged and audited.
					</Typography>
				</Alert>

				<Box sx={{ mb: 4 }}>
					<Typography variant="h3" component="h1" gutterBottom>
						Admin Panel
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Manage users, send invitations, and trigger password resets.
					</Typography>
				</Box>

				<UserManagementPanel />
			</>
		)
	}

	return (
		<Layout title="Admin Panel" description="Admin panel for user management">
			<Container maxWidth="lg" sx={{ py: 4 }}>
				{content}
			</Container>
		</Layout>
	)
}

export default function AdminPanel() {
	const customTheme = experimental_extendTheme(theme)

	return (
		<AuthProvider>
			<Experimental_CssVarsProvider theme={customTheme}>
				<AdminPanelContent />
			</Experimental_CssVarsProvider>
		</AuthProvider>
	)
}
