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
					LOGOUT
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
			sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
		>
			{error && (
				<Alert severity="error">
					Error during login! Please check your credentials.
				</Alert>
			)}
			<Typography variant="h6">Login</Typography>
			<TextField
				required
				type="email"
				label="email"
				placeholder="type your email"
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
				label="password"
				placeholder="type your password"
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
				LOGIN
			</Button>
		</Box>
	)
}
