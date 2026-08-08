import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { signIn, signOut } from '../config/auth'
import { useAuth } from '../hooks/firebaseAuthContext'

export const LoginComponent: React.FC = () => {
	const { userLoggedIn, currentUser } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSigningIn, setIsSigningIn] = useState(false)
	const [error, setError] = useState(false)

	if (userLoggedIn && currentUser?.email && !error) {
		return (
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Typography>Hello there {currentUser?.email ?? ''}</Typography>
				<Button variant="contained" color="primary" onClick={() => signOut()}>
					Sign out
				</Button>
			</Box>
		)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		if (!isSigningIn) {
			setIsSigningIn(true)
			await signIn(email, password)
				.then(() => setError(false))
				.catch(() => setError(true))
			setIsSigningIn(false)
		}
	}

	return (
		<Box
			component="form"
			onSubmit={onSubmit}
			className="cs-account-panel"
			sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
		>
			{error && (
				<Alert severity="error">
					Error during login! Please check your credentials.
				</Alert>
			)}
			{/* The panel says what it is in the sheet's caption register (M13 S13),
				not as an h6 — a heading level inside a portalled popover is a document
				structure that does not exist. */}
			<Typography className="cs-account-panel__caption">Sign in</Typography>
			<TextField
				required
				type="email"
				label="Email"
				placeholder="you@example.com"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value)
				}}
				onKeyDown={(event) => {
					if (event.key === 'Tab') {
						event.stopPropagation()
					}
				}}
			/>
			<TextField
				required
				type="password"
				label="Password"
				placeholder="your password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value)
				}}
				onKeyDown={(event) => {
					if (event.key === 'Tab') {
						event.stopPropagation()
					}
				}}
			/>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={isSigningIn}
			>
				Sign in
			</Button>
		</Box>
	)
}
