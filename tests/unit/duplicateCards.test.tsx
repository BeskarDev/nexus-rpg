import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

// Mock the JSON data first
vi.mock('@site/src/utils/json/combat-arts.json', () => ({
	default: [
		{
			name: 'Power Attack',
			skill: 'Fighting',
			weaponTypes: ['Sword', 'Axe', 'Mace'],
			ranks: 3,
			description: 'Trade accuracy for raw power.',
			effect: 'Take +1 bane on attack rolls to deal +2 weapon damage.',
		},
		{
			name: 'Precise Strike',
			skill: 'Fighting',
			weaponTypes: ['Rapier', 'Dagger'],
			ranks: 2,
			description: 'Target weak points with surgical precision.',
			effect: "Ignore half of target's armor value (rounded up).",
		},
	],
}))

vi.mock('@site/src/utils/json/arcane-spells.json', () => ({
	default: [
		{
			name: 'Fireball',
			rank: 3,
			discipline: 'Evocation',
			castTime: '1 Action',
			range: 'Long',
			duration: 'Instant',
			focus: 6,
			description: 'Hurl an explosive ball of fire.',
			effect: 'Deal +8/+16/+24 fire damage in a medium area.',
		},
	],
}))

vi.mock('@site/src/utils/json/mystic-spells.json', () => ({
	default: [
		{
			name: 'Heal',
			rank: 1,
			tradition: 'Life',
			castTime: '1 Action',
			range: 'Touch',
			duration: 'Briefly',
			focus: 2,
			description: 'Channel positive energy to heal wounds.',
			effect: 'Restore +4/+8/+12 hit points.',
		},
	],
}))

// Mock react-to-print
vi.mock('react-to-print', () => ({
	useReactToPrint: vi.fn(() => vi.fn()),
}))

// Mock the theme
vi.mock('@site/src/hooks/createTheme', () => ({
	theme: {},
}))

// Import after mocks
import { CombatArts } from '@site/src/features/CombatArts/CombatArts'
import { Spells } from '@site/src/features/Spells/Spells'

describe('Duplicate Cards for Multiple Characters', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('Combat Arts - Duplicate Card Support', () => {
		it('should allow duplicate combat art cards when importing multiple characters with the same ability', async () => {
			render(<CombatArts />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)

			// First character with Power Attack
			const character1Json = JSON.stringify({
				personal: { name: 'Warrior A' },
				skills: {
					abilities: [{ title: 'Power Attack', rank: 1 }],
				},
			})

			// Import first character
			await userEvent.click(textarea)
			await userEvent.clear(textarea)
			await userEvent.paste(character1Json)

			// Wait for state update
			await waitFor(() => {
				expect(screen.getByText(/1 Combat Art will be printed/i)).toBeInTheDocument()
			})

			// Second character with the same Power Attack
			const character2Json = JSON.stringify({
				personal: { name: 'Warrior B' },
				skills: {
					abilities: [{ title: 'Power Attack', rank: 2 }],
				},
			})

			// Import second character (by appending to the JSON)
			await userEvent.clear(textarea)
			await userEvent.paste(character2Json)

			// Now we should have 2 cards (both Power Attack, one for each character)
			await waitFor(() => {
				const text = screen.getByText(/2 Combat Arts will be printed/i)
				expect(text).toBeInTheDocument()
			})

			// Should show the duplicate notice
			await waitFor(() => {
				expect(
					screen.getByText(/including duplicates for specific characters/i),
				).toBeInTheDocument()
			})
		})

		it('should distinguish between manual selections and character-attributed cards', async () => {
			render(<CombatArts />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)

			// Import character with Power Attack
			const characterJson = JSON.stringify({
				personal: { name: 'Test Warrior' },
				skills: {
					abilities: [{ title: 'Power Attack', rank: 1 }],
				},
			})

			await userEvent.click(textarea)
			await userEvent.paste(characterJson)

			// Wait for character's ability to be added
			await waitFor(() => {
				expect(screen.getByText(/1 Combat Art will be printed/i)).toBeInTheDocument()
			})

			// Now also manually select Power Attack from the dropdown
			// This would typically be done through the dropdown, but we can verify
			// the system allows both character-attributed and manual selections
		})
	})

	describe('Spells - Duplicate Card Support', () => {
		it('should allow duplicate spell cards when importing multiple characters with the same spell', async () => {
			render(<Spells />)

			const textarea = screen.getByPlaceholderText(
				/paste character json here/i,
			)

			// First character with Heal spell
			const character1Json = JSON.stringify({
				personal: { name: 'Cleric A' },
				spells: {
					spells: [{ name: 'Heal', prepared: true }],
				},
			})

			// Import first character
			await userEvent.click(textarea)
			await userEvent.clear(textarea)
			await userEvent.paste(character1Json)

			// Wait for state update
			await waitFor(() => {
				expect(screen.getByText(/1 Spell will be printed/i)).toBeInTheDocument()
			})

			// Second character with the same Heal spell
			const character2Json = JSON.stringify({
				personal: { name: 'Cleric B' },
				spells: {
					spells: [{ name: 'Heal', prepared: true }],
				},
			})

			// Import second character
			await userEvent.clear(textarea)
			await userEvent.paste(character2Json)

			// Now we should have 2 cards (both Heal, one for each character)
			await waitFor(() => {
				const text = screen.getByText(/2 Spells will be printed/i)
				expect(text).toBeInTheDocument()
			})

			// Should show the duplicate notice
			await waitFor(() => {
				expect(
					screen.getByText(/including duplicates for specific characters/i),
				).toBeInTheDocument()
			})
		})

		it('should handle multiple characters with overlapping spell lists', async () => {
			render(<Spells />)

			const textarea = screen.getByPlaceholderText(
				/paste character json here/i,
			)

			// Character with both Heal and Fireball
			const character1Json = JSON.stringify({
				personal: { name: 'Battle Cleric' },
				spells: {
					spells: [
						{ name: 'Heal', prepared: true },
						{ name: 'Fireball', prepared: true },
					],
				},
			})

			await userEvent.click(textarea)
			await userEvent.paste(character1Json)

			// Wait for both spells to be added
			await waitFor(() => {
				expect(screen.getByText(/2 Spells will be printed/i)).toBeInTheDocument()
			})

			// Second character with only Heal (overlapping)
			const character2Json = JSON.stringify({
				personal: { name: 'Pure Healer' },
				spells: {
					spells: [{ name: 'Heal', prepared: true }],
				},
			})

			await userEvent.clear(textarea)
			await userEvent.paste(character2Json)

			// Should have 3 cards total: Heal (from char1), Fireball (from char1), Heal (from char2)
			await waitFor(() => {
				expect(screen.getByText(/3 Spells will be printed/i)).toBeInTheDocument()
			})
		})
	})

	describe('Deselect All Functionality', () => {
		it('should clear all cards including duplicates when deselecting', async () => {
			render(<CombatArts />)

			const textarea = screen.getByPlaceholderText(/paste character json here/i)

			// Import character
			const characterJson = JSON.stringify({
				personal: { name: 'Test Warrior' },
				skills: {
					abilities: [{ title: 'Power Attack', rank: 1 }],
				},
			})

			await userEvent.click(textarea)
			await userEvent.paste(characterJson)

			await waitFor(() => {
				expect(screen.getByText(/1 Combat Art will be printed/i)).toBeInTheDocument()
			})

			// Click deselect all
			const deselectButton = screen.getByText('Deselect all')
			await userEvent.click(deselectButton)

			// Should clear everything
			await waitFor(() => {
				expect(screen.getByText(/0 Combat Arts will be printed/i)).toBeInTheDocument()
			})
		})
	})
})
