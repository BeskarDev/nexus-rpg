import React, { useEffect, useState } from 'react'
import { signIn, signOut } from '../config/auth'
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
	useColorScheme,
} from '@mui/material'
import { useAuth } from '../hooks/firebaseAuthContext'

export const LoginComponent: React.FC = () => {
	const { userLoggedIn, currentUser } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSigningIn, setIsSigningIn] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	if (userLoggedIn && currentUser?.email) {
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
			await signIn(email, password).catch((reason) => setErrorMessage(reason))
			setIsSigningIn(false)
		}
	}

	return (
		<Box
			component="form"
			onSubmit={onSubmit}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
		>
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
			/>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={isSigningIn}
			>
				LOGIN
			</Button>
			{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
		</Box>
	)
}
