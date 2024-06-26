import React, { useContext, useState, useEffect, createContext } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

const AuthContext = createContext<{
	userLoggedIn: boolean
	isEmailUser: boolean
	currentUser: User
	setCurrentUser: (user: User) => void
}>({
	userLoggedIn: false,
	isEmailUser: false,
	currentUser: {} as User,
	setCurrentUser: () => {},
})

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [userLoggedIn, setUserLoggedIn] = useState(false)
	const [isEmailUser, setIsEmailUser] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initializeUser)
		return unsubscribe
	}, [])

	async function initializeUser(user: User) {
		if (user) {
			setCurrentUser({ ...user })

			// check if provider is email and password login
			const isEmail = user.providerData.some(
				(provider) => provider.providerId === 'password',
			)
			setIsEmailUser(isEmail)

			setUserLoggedIn(true)
		} else {
			setCurrentUser(null)
			setUserLoggedIn(false)
		}

		setLoading(false)
	}

	const value = {
		userLoggedIn,
		isEmailUser,
		currentUser,
		setCurrentUser,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
