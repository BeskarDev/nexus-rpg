import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK
admin.initializeApp()

// Configure region for all functions (Frankfurt, Germany)
const region = 'europe-west3'

/**
 * Cloud Function to invite a user by creating a Firebase Auth account
 * and sending a password reset email.
 *
 * This function can only be called by authenticated admin users.
 *
 * @param email - The email address of the user to invite
 * @param displayName - The display name for the user
 * @returns Object with success status and message
 */
export const inviteUser = functions
	.region(region)
	.https.onCall(async (data, context) => {
		// Verify the user is authenticated
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'User must be authenticated to invite users.',
			)
		}

		// Verify the user is an admin
		const isAdmin = await checkIsAdmin(context.auth.uid)
		if (!isAdmin) {
			throw new functions.https.HttpsError(
				'permission-denied',
				'User must be an admin to invite users.',
			)
		}

		const { email, displayName } = data

		// Validate email
		if (!email || typeof email !== 'string' || !email.includes('@')) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'A valid email address is required.',
			)
		}

		// Validate displayName if provided (optional) - only check type if it exists
		if (displayName && typeof displayName !== 'string') {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'Display name must be a string if provided.',
			)
		}

		// Use displayName if provided and not empty, otherwise extract from email
		const finalDisplayName =
			displayName &&
			typeof displayName === 'string' &&
			displayName.trim().length > 0
				? displayName.trim()
				: email.split('@')[0]

		try {
			// Check if user already exists
			let user
			try {
				user = await admin.auth().getUserByEmail(email)
				// User exists, send password reset email using Firebase's built-in system
				// Firebase will automatically send the email using the configured template
				const actionCodeSettings = {
					url: 'https://nexus-rpg-d04d1.web.app', // Your app URL
					handleCodeInApp: false,
				}
				const resetLink = await admin
					.auth()
					.generatePasswordResetLink(email, actionCodeSettings)

				return {
					success: true,
					message: `Password reset email sent to ${email}.`,
					resetLink: resetLink, // Include as backup
					userId: user.uid,
					existingUser: true,
				}
			} catch (error: any) {
				// User doesn't exist, create new user
				if (error.code === 'auth/user-not-found') {
					// Generate a random temporary password
					const tempPassword = generateTempPassword()

					// Create the user with email and temporary password
					// Set emailVerified to true since this is an admin-invited user
					user = await admin.auth().createUser({
						email: email,
						password: tempPassword,
						emailVerified: true, // Auto-verify admin-invited users
						displayName: finalDisplayName,
					})

					// Generate and send password reset email using Firebase's built-in system
					const actionCodeSettings = {
						url: 'https://nexus-rpg-d04d1.web.app', // Your app URL
						handleCodeInApp: false,
					}
					const resetLink = await admin
						.auth()
						.generatePasswordResetLink(email, actionCodeSettings)

					// Create user document in Firestore at {userId}/player-info
					// This structure is used by the character sheet tool
					const userDoc = admin.firestore().doc(`${user.uid}/player-info`)
					await userDoc.set(
						{
							email: email,
							name: finalDisplayName, // Character sheet reads this field
							allowedCollections: [],
							createdAt: admin.firestore.FieldValue.serverTimestamp(),
							invitedBy: context.auth.uid,
						},
						{ merge: true },
					)

					return {
						success: true,
						message: `User ${email} invited successfully.`,
						resetLink: resetLink, // Include the reset link in the response
						userId: user.uid,
						existingUser: false,
					}
				} else {
					throw error
				}
			}
		} catch (error: any) {
			console.error('Error inviting user:', error)
			throw new functions.https.HttpsError(
				'internal',
				`Failed to invite user: ${error.message}`,
			)
		}
	})

/**
 * Cloud Function to trigger a password reset for a user.
 *
 * This function can only be called by authenticated admin users.
 * Users cannot trigger password resets themselves.
 *
 * @param email - The email address of the user
 * @returns Object with success status and message
 */
export const triggerPasswordReset = functions
	.region(region)
	.https.onCall(async (data, context) => {
		// Verify the user is authenticated
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'User must be authenticated to trigger password resets.',
			)
		}

		// Verify the user is an admin
		const isAdmin = await checkIsAdmin(context.auth.uid)
		if (!isAdmin) {
			throw new functions.https.HttpsError(
				'permission-denied',
				'User must be an admin to trigger password resets.',
			)
		}

		const { email } = data

		// Validate email
		if (!email || typeof email !== 'string' || !email.includes('@')) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'A valid email address is required.',
			)
		}

		try {
			// Verify user exists
			const user = await admin.auth().getUserByEmail(email)

			// Generate password reset link
			const actionCodeSettings = {
				url: 'https://nexus-rpg-d04d1.web.app', // Your app URL
				handleCodeInApp: false,
			}
			const resetLink = await admin
				.auth()
				.generatePasswordResetLink(email, actionCodeSettings)

			return {
				success: true,
				message: `Password reset link generated for ${email}.`,
				resetLink: resetLink,
				userId: user.uid,
			}
		} catch (error: any) {
			console.error('Error triggering password reset:', error)

			if (error.code === 'auth/user-not-found') {
				throw new functions.https.HttpsError(
					'not-found',
					`No user found with email: ${email}`,
				)
			}

			throw new functions.https.HttpsError(
				'internal',
				`Failed to trigger password reset: ${error.message}`,
			)
		}
	})

/**
 * Cloud Function to verify a user's email manually.
 *
 * This function can only be called by authenticated admin users.
 *
 * @param email - The email address of the user to verify
 * @returns Object with success status and message
 */
export const verifyUserEmail = functions
	.region(region)
	.https.onCall(async (data, context) => {
		// Verify the user is authenticated
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'User must be authenticated to verify emails.',
			)
		}

		// Verify the user is an admin
		const isAdmin = await checkIsAdmin(context.auth.uid)
		if (!isAdmin) {
			throw new functions.https.HttpsError(
				'permission-denied',
				'User must be an admin to verify emails.',
			)
		}

		const { email } = data

		// Validate email
		if (!email || typeof email !== 'string' || !email.includes('@')) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'A valid email address is required.',
			)
		}

		try {
			// Verify user exists
			const user = await admin.auth().getUserByEmail(email)

			// Update user to mark email as verified
			await admin.auth().updateUser(user.uid, {
				emailVerified: true,
			})

			return {
				success: true,
				message: `Email ${email} has been verified.`,
				userId: user.uid,
			}
		} catch (error: any) {
			console.error('Error verifying email:', error)

			if (error.code === 'auth/user-not-found') {
				throw new functions.https.HttpsError(
					'not-found',
					`No user found with email: ${email}`,
				)
			}

			throw new functions.https.HttpsError(
				'internal',
				`Failed to verify email: ${error.message}`,
			)
		}
	})

/**
 * Cloud Function to delete a user.
 *
 * This function can only be called by authenticated admin users.
 *
 * @param email - The email address of the user to delete
 * @returns Object with success status and message
 */
export const deleteUser = functions
	.region(region)
	.https.onCall(async (data, context) => {
		// Verify the user is authenticated
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'User must be authenticated to delete users.',
			)
		}

		// Verify the user is an admin
		const isAdmin = await checkIsAdmin(context.auth.uid)
		if (!isAdmin) {
			throw new functions.https.HttpsError(
				'permission-denied',
				'User must be an admin to delete users.',
			)
		}

		const { email } = data

		// Validate email
		if (!email || typeof email !== 'string' || !email.includes('@')) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'A valid email address is required.',
			)
		}

		// Prevent admin from deleting themselves
		const currentUserEmail = (await admin.auth().getUser(context.auth.uid))
			.email
		if (email === currentUserEmail) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'You cannot delete your own account.',
			)
		}

		try {
			// Get user by email
			const user = await admin.auth().getUserByEmail(email)

			// Delete user from Firebase Auth
			await admin.auth().deleteUser(user.uid)

			// Delete user's Firestore data
			// Delete the entire user collection
			const userCollectionRef = admin.firestore().collection(user.uid)
			const snapshot = await userCollectionRef.get()

			const batch = admin.firestore().batch()
			snapshot.docs.forEach((doc) => {
				batch.delete(doc.ref)
			})
			await batch.commit()

			// Delete admin document if exists
			const adminDocRef = admin.firestore().collection('admins').doc(user.uid)
			const adminDoc = await adminDocRef.get()
			if (adminDoc.exists) {
				await adminDocRef.delete()
			}

			return {
				success: true,
				message: `User ${email} has been deleted.`,
				userId: user.uid,
			}
		} catch (error: any) {
			console.error('Error deleting user:', error)

			if (error.code === 'auth/user-not-found') {
				throw new functions.https.HttpsError(
					'not-found',
					`No user found with email: ${email}`,
				)
			}

			throw new functions.https.HttpsError(
				'internal',
				`Failed to delete user: ${error.message}`,
			)
		}
	})

/**
 * Cloud Function to list all users (admin only)
 *
 * @param maxResults - Maximum number of results to return (default 100, max 1000)
 * @param pageToken - Token for pagination
 * @returns Object with users array and next page token
 */
export const listUsers = functions
	.region(region)
	.https.onCall(async (data, context) => {
		// Verify the user is authenticated
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'User must be authenticated to list users.',
			)
		}

		// Verify the user is an admin
		const isAdmin = await checkIsAdmin(context.auth.uid)
		if (!isAdmin) {
			throw new functions.https.HttpsError(
				'permission-denied',
				'User must be an admin to list users.',
			)
		}

		const maxResults = Math.min(data.maxResults || 100, 1000)
		const pageToken = data.pageToken

		try {
			const listUsersResult = await admin
				.auth()
				.listUsers(maxResults, pageToken)

			// Fetch player info from Firestore for each user
			const usersWithPlayerInfo = await Promise.all(
				listUsersResult.users.map(async (user) => {
					let playerName = user.displayName

					// Try to get player name from Firestore
					try {
						const playerInfoDoc = await admin
							.firestore()
							.collection(user.uid)
							.doc('player-info')
							.get()

						if (playerInfoDoc.exists) {
							const playerData = playerInfoDoc.data()
							playerName = playerData?.name || user.displayName
						}
					} catch (error) {
						// If Firestore fetch fails, fall back to Auth displayName
						console.warn(`Could not fetch player info for ${user.uid}:`, error)
					}

					return {
						uid: user.uid,
						email: user.email,
						displayName: playerName,
						emailVerified: user.emailVerified,
						disabled: user.disabled,
						metadata: {
							creationTime: user.metadata.creationTime,
							lastSignInTime: user.metadata.lastSignInTime,
						},
					}
				}),
			)

			return {
				success: true,
				users: usersWithPlayerInfo,
				pageToken: listUsersResult.pageToken,
			}
		} catch (error: any) {
			console.error('Error listing users:', error)
			throw new functions.https.HttpsError(
				'internal',
				`Failed to list users: ${error.message}`,
			)
		}
	})

/**
 * Helper function to check if a user is an admin.
 * In development, all authenticated users are considered admins.
 * In production, checks a custom claim or Firestore document.
 *
 * @param uid - The user ID to check
 * @returns true if user is admin, false otherwise
 */
async function checkIsAdmin(uid: string): Promise<boolean> {
	try {
		// Check custom claims first
		const user = await admin.auth().getUser(uid)
		if (user.customClaims?.admin === true) {
			return true
		}

		// Fall back to checking Firestore document
		const adminDoc = await admin.firestore().doc(`admins/${uid}`).get()
		return adminDoc.exists
	} catch (error) {
		console.error('Error checking admin status:', error)
		return false
	}
}

/**
 * Helper function to generate a temporary password
 * @returns A random temporary password
 */
function generateTempPassword(): string {
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
	const length = 20
	let password = ''
	for (let i = 0; i < length; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return password
}
