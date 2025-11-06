import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK
admin.initializeApp()

/**
 * Cloud Function to invite a user by creating a Firebase Auth account
 * and sending a password reset email.
 * 
 * This function can only be called by authenticated admin users.
 * 
 * @param email - The email address of the user to invite
 * @returns Object with success status and message
 */
export const inviteUser = functions.https.onCall(async (data, context) => {
	// Verify the user is authenticated
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'User must be authenticated to invite users.'
		)
	}

	// Verify the user is an admin
	const isAdmin = await checkIsAdmin(context.auth.uid)
	if (!isAdmin) {
		throw new functions.https.HttpsError(
			'permission-denied',
			'User must be an admin to invite users.'
		)
	}

	const { email } = data

	// Validate email
	if (!email || typeof email !== 'string' || !email.includes('@')) {
		throw new functions.https.HttpsError(
			'invalid-argument',
			'A valid email address is required.'
		)
	}

	try {
		// Check if user already exists
		let user
		try {
			user = await admin.auth().getUserByEmail(email)
			// User exists, just send a password reset email
			await admin.auth().generatePasswordResetLink(email)
			return {
				success: true,
				message: `User ${email} already exists. Password reset email sent.`,
				userId: user.uid,
				existingUser: true,
			}
		} catch (error: any) {
			// User doesn't exist, create new user
			if (error.code === 'auth/user-not-found') {
				// Generate a random temporary password
				const tempPassword = generateTempPassword()
				
				// Create the user with email and temporary password
				user = await admin.auth().createUser({
					email: email,
					password: tempPassword,
					emailVerified: false,
				})

				// Send password reset email so user can set their own password
				await admin.auth().generatePasswordResetLink(email)

				// Create user document in Firestore if needed
				const userDoc = admin.firestore().doc(`${user.uid}/player-info`)
				await userDoc.set({
					email: email,
					allowedCollections: [],
					createdAt: admin.firestore.FieldValue.serverTimestamp(),
					invitedBy: context.auth.uid,
				}, { merge: true })

				return {
					success: true,
					message: `User ${email} invited successfully. Password reset email sent.`,
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
			`Failed to invite user: ${error.message}`
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
export const triggerPasswordReset = functions.https.onCall(async (data, context) => {
	// Verify the user is authenticated
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'User must be authenticated to trigger password resets.'
		)
	}

	// Verify the user is an admin
	const isAdmin = await checkIsAdmin(context.auth.uid)
	if (!isAdmin) {
		throw new functions.https.HttpsError(
			'permission-denied',
			'User must be an admin to trigger password resets.'
		)
	}

	const { email } = data

	// Validate email
	if (!email || typeof email !== 'string' || !email.includes('@')) {
		throw new functions.https.HttpsError(
			'invalid-argument',
			'A valid email address is required.'
		)
	}

	try {
		// Verify user exists
		const user = await admin.auth().getUserByEmail(email)

		// Generate and send password reset email
		await admin.auth().generatePasswordResetLink(email)

		return {
			success: true,
			message: `Password reset email sent to ${email}.`,
			userId: user.uid,
		}
	} catch (error: any) {
		console.error('Error triggering password reset:', error)
		
		if (error.code === 'auth/user-not-found') {
			throw new functions.https.HttpsError(
				'not-found',
				`No user found with email: ${email}`
			)
		}
		
		throw new functions.https.HttpsError(
			'internal',
			`Failed to trigger password reset: ${error.message}`
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
export const listUsers = functions.https.onCall(async (data, context) => {
	// Verify the user is authenticated
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'User must be authenticated to list users.'
		)
	}

	// Verify the user is an admin
	const isAdmin = await checkIsAdmin(context.auth.uid)
	if (!isAdmin) {
		throw new functions.https.HttpsError(
			'permission-denied',
			'User must be an admin to list users.'
		)
	}

	const maxResults = Math.min(data.maxResults || 100, 1000)
	const pageToken = data.pageToken

	try {
		const listUsersResult = await admin.auth().listUsers(maxResults, pageToken)

		const users = listUsersResult.users.map(user => ({
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			emailVerified: user.emailVerified,
			disabled: user.disabled,
			metadata: {
				creationTime: user.metadata.creationTime,
				lastSignInTime: user.metadata.lastSignInTime,
			},
		}))

		return {
			success: true,
			users: users,
			pageToken: listUsersResult.pageToken,
		}
	} catch (error: any) {
		console.error('Error listing users:', error)
		throw new functions.https.HttpsError(
			'internal',
			`Failed to list users: ${error.message}`
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
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
	const length = 20
	let password = ''
	for (let i = 0; i < length; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return password
}

/**
 * Cloud Function to set a user as admin (callable by existing admins only)
 * 
 * @param targetEmail - Email of the user to make admin
 * @returns Success status
 */
export const setAdminRole = functions.https.onCall(async (data, context) => {
	// Verify the user is authenticated
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'User must be authenticated.'
		)
	}

	// Verify the user is an admin
	const isAdmin = await checkIsAdmin(context.auth.uid)
	if (!isAdmin) {
		throw new functions.https.HttpsError(
			'permission-denied',
			'User must be an admin to set admin roles.'
		)
	}

	const { targetEmail } = data

	if (!targetEmail || typeof targetEmail !== 'string') {
		throw new functions.https.HttpsError(
			'invalid-argument',
			'Target email is required.'
		)
	}

	try {
		// Get the target user
		const user = await admin.auth().getUserByEmail(targetEmail)

		// Set custom claim
		await admin.auth().setCustomUserClaims(user.uid, { admin: true })

		// Also create a document in admins collection
		await admin.firestore().doc(`admins/${user.uid}`).set({
			email: targetEmail,
			grantedBy: context.auth.uid,
			grantedAt: admin.firestore.FieldValue.serverTimestamp(),
		})

		return {
			success: true,
			message: `Admin role granted to ${targetEmail}`,
		}
	} catch (error: any) {
		console.error('Error setting admin role:', error)
		throw new functions.https.HttpsError(
			'internal',
			`Failed to set admin role: ${error.message}`
		)
	}
})
