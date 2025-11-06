import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserManagementPanel } from '../../../src/components/UserManagementPanel'

// Mock Firebase functions
vi.mock('firebase/functions', () => ({
	getFunctions: vi.fn(() => ({})),
	httpsCallable: vi.fn((functions, name) => {
		return vi.fn(async (data) => {
			if (name === 'listUsers') {
				return {
					data: {
						success: true,
						users: [
							{
								uid: 'user1',
								email: 'user1@example.com',
								displayName: 'User One',
								emailVerified: true,
								disabled: false,
								metadata: {
									creationTime: '2024-01-01T00:00:00Z',
									lastSignInTime: '2024-01-05T00:00:00Z',
								},
							},
							{
								uid: 'user2',
								email: 'user2@example.com',
								displayName: 'User Two',
								emailVerified: false,
								disabled: false,
								metadata: {
									creationTime: '2024-01-02T00:00:00Z',
								},
							},
						],
						pageToken: null,
					},
				}
			}
			if (name === 'inviteUser') {
				return {
					data: {
						success: true,
						message: `User ${data.email} invited successfully. Password reset email sent.`,
						userId: 'new-user-id',
						existingUser: false,
					},
				}
			}
			if (name === 'triggerPasswordReset') {
				return {
					data: {
						success: true,
						message: `Password reset email sent to ${data.email}.`,
						userId: 'user1',
					},
				}
			}
			return { data: { success: false } }
		})
	}),
}))

// Mock Firebase config
vi.mock('@site/src/config/firebase', () => ({
	app: {},
}))

describe('UserManagementPanel', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should render user management panel', async () => {
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('User Management')).toBeInTheDocument()
		})
	})

	it('should load and display users', async () => {
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('user1@example.com')).toBeInTheDocument()
			expect(screen.getByText('user2@example.com')).toBeInTheDocument()
			expect(screen.getByText('User One')).toBeInTheDocument()
			expect(screen.getByText('User Two')).toBeInTheDocument()
		})
	})

	it('should show verified status chips', async () => {
		render(<UserManagementPanel />)

		await waitFor(() => {
			const verifiedChips = screen.getAllByText('Verified')
			const unverifiedChips = screen.getAllByText('Unverified')
			expect(verifiedChips.length).toBeGreaterThan(0)
			expect(unverifiedChips.length).toBeGreaterThan(0)
		})
	})

	it('should open invite dialog when clicking invite button', async () => {
		const user = userEvent.setup()
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('Invite User')).toBeInTheDocument()
		})

		const inviteButton = screen.getByRole('button', { name: /invite user/i })
		await user.click(inviteButton)

		await waitFor(() => {
			expect(screen.getByText('Invite New User')).toBeInTheDocument()
			expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
		})
	})

	it('should filter users based on search term', async () => {
		const user = userEvent.setup()
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('user1@example.com')).toBeInTheDocument()
			expect(screen.getByText('user2@example.com')).toBeInTheDocument()
		})

		const searchInput = screen.getByPlaceholderText(/search by email or name/i)
		await user.type(searchInput, 'user1')

		await waitFor(() => {
			expect(screen.getByText('user1@example.com')).toBeInTheDocument()
			expect(screen.queryByText('user2@example.com')).not.toBeInTheDocument()
		})
	})

	it('should show no results message when search has no matches', async () => {
		const user = userEvent.setup()
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('user1@example.com')).toBeInTheDocument()
		})

		const searchInput = screen.getByPlaceholderText(/search by email or name/i)
		await user.type(searchInput, 'nonexistent')

		await waitFor(() => {
			expect(screen.getByText('No users match your search')).toBeInTheDocument()
		})
	})

	it('should have refresh button', async () => {
		render(<UserManagementPanel />)

		await waitFor(() => {
			const refreshButton = screen.getByRole('button', { name: /refresh/i })
			expect(refreshButton).toBeInTheDocument()
		})
	})

	it('should display last sign in times', async () => {
		render(<UserManagementPanel />)

		await waitFor(() => {
			// user1 has lastSignInTime, user2 doesn't
			const dates = screen.getAllByText(/\//)
			expect(dates.length).toBeGreaterThan(0)
			expect(screen.getByText('Never')).toBeInTheDocument()
		})
	})

	it('should render password reset icons for each user', async () => {
		render(<UserManagementPanel />)

		await waitFor(() => {
			const lockResetIcons = screen.getAllByRole('button', {
				name: /send password reset email to this user/i,
			})
			expect(lockResetIcons.length).toBe(2) // Two users
		})
	})
})

describe('InviteUserDialog', () => {
	it('should submit invite form with email', async () => {
		const user = userEvent.setup()
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('User Management')).toBeInTheDocument()
		})

		// Open dialog
		const inviteButton = screen.getByRole('button', { name: /invite user/i })
		await user.click(inviteButton)

		await waitFor(() => {
			expect(screen.getByText('Invite New User')).toBeInTheDocument()
		})

		// Fill in email
		const emailInput = screen.getByLabelText(/email address/i)
		await user.type(emailInput, 'newuser@example.com')

		// Submit
		const sendButton = screen.getByRole('button', { name: /send invitation/i })
		await user.click(sendButton)

		// Success message should appear
		await waitFor(
			() => {
				expect(
					screen.getByText(/invited successfully/i)
				).toBeInTheDocument()
			},
			{ timeout: 3000 }
		)
	})

	it('should close dialog on cancel', async () => {
		const user = userEvent.setup()
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('User Management')).toBeInTheDocument()
		})

		// Open dialog
		const inviteButton = screen.getByRole('button', { name: /invite user/i })
		await user.click(inviteButton)

		await waitFor(() => {
			expect(screen.getByText('Invite New User')).toBeInTheDocument()
		})

		// Click cancel
		const cancelButton = screen.getByRole('button', { name: /cancel/i })
		await user.click(cancelButton)

		// Dialog should close
		await waitFor(() => {
			expect(screen.queryByText('Invite New User')).not.toBeInTheDocument()
		})
	})
})

describe('PasswordResetDialog', () => {
	it('should open password reset dialog when clicking reset icon', async () => {
		const user = userEvent.setup()
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('user1@example.com')).toBeInTheDocument()
		})

		// Click the first password reset icon
		const resetIcons = screen.getAllByRole('button', {
			name: /send password reset email to this user/i,
		})
		await user.click(resetIcons[0])

		await waitFor(() => {
			expect(screen.getByText('Trigger Password Reset')).toBeInTheDocument()
			// Email appears in both table and dialog, so we check for the dialog text
			expect(
				screen.getByText(/send a password reset email to:/i)
			).toBeInTheDocument()
		})
	})

	it('should show confirmation text in password reset dialog', async () => {
		const user = userEvent.setup()
		render(<UserManagementPanel />)

		await waitFor(() => {
			expect(screen.getByText('user1@example.com')).toBeInTheDocument()
		})

		const resetIcons = screen.getAllByRole('button', {
			name: /send password reset email to this user/i,
		})
		await user.click(resetIcons[0])

		await waitFor(() => {
			expect(
				screen.getByText(/send a password reset email to:/i)
			).toBeInTheDocument()
		})
	})
})
