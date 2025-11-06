import React, { useContext, useState, useEffect, createContext } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext<{
	userLoggedIn: boolean
	isEmailUser: boolean
	currentUser: User
	setCurrentUser: (user: User) => void
	isAdmin: boolean
	setIsAdmin: (isAdmin: boolean) => void
	viewAsAdmin: boolean
	setViewAsAdmin: (viewAsAdmin: boolean) => void
}>({
	userLoggedIn: false,
	isEmailUser: false,
	currentUser: {} as User,
	setCurrentUser: () => {},
	isAdmin: false,
	setIsAdmin: () => {},
	viewAsAdmin: true,
	setViewAsAdmin: () => {},
})

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [userLoggedIn, setUserLoggedIn] = useState(false)
	const [isEmailUser, setIsEmailUser] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [viewAsAdmin, setViewAsAdmin] = useState(true)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (auth?.currentUser) {
			initializeUser(auth.currentUser)
		}
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

			// Check admin status from custom claims and Firestore
			await checkAdminStatus(user)
		} else {
			setCurrentUser(null)
			setUserLoggedIn(false)
			setIsAdmin(false)
		}

		setLoading(false)
	}

	async function checkAdminStatus(user: User) {
		try {
			// First check custom claims (requires token refresh)
			const idTokenResult = await user.getIdTokenResult()
			
			if (idTokenResult.claims.admin === true) {
				setIsAdmin(true)
				return
			}

			// Fall back to checking Firestore
			const adminDoc = await getDoc(doc(db, 'admins', user.uid))
			
			if (adminDoc.exists()) {
				setIsAdmin(true)
				// Force token refresh to update custom claims
				await user.getIdToken(true)
			} else {
				setIsAdmin(false)
			}
		} catch (error) {
			console.error('Error checking admin status:', error)
			setIsAdmin(false)
		}
	}

	const value = {
		userLoggedIn,
		isEmailUser,
		currentUser,
		setCurrentUser,
		isAdmin,
		setIsAdmin,
		viewAsAdmin,
		setViewAsAdmin,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
