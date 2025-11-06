import React from 'react'
import Layout from '@theme/Layout'
import { Box, Container, Typography, Alert } from '@mui/material'
import { UserManagementPanel } from '@site/src/components/UserManagementPanel'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'

export default function AdminPanel() {
	const { userLoggedIn, isAdmin } = useAuth()

	if (!userLoggedIn) {
		return (
			<Layout title="Admin Panel" description="Admin panel for user management">
				<Container maxWidth="lg" sx={{ py: 4 }}>
					<Alert severity="warning">
						You must be logged in to access the admin panel.
					</Alert>
				</Container>
			</Layout>
		)
	}

	if (!isAdmin) {
		return (
			<Layout title="Admin Panel" description="Admin panel for user management">
				<Container maxWidth="lg" sx={{ py: 4 }}>
					<Alert severity="error">
						You do not have permission to access the admin panel.
					</Alert>
				</Container>
			</Layout>
		)
	}

	return (
		<Layout title="Admin Panel" description="Admin panel for user management">
			<Container maxWidth="lg" sx={{ py: 4 }}>
				<Box sx={{ mb: 4 }}>
					<Typography variant="h3" component="h1" gutterBottom>
						Admin Panel
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Manage users, send invitations, and trigger password resets.
					</Typography>
				</Box>

				<UserManagementPanel />
			</Container>
		</Layout>
	)
}
