import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMockCharacter } from '@site/src/dev/mockData'
import type { CharacterDocument } from '@site/src/types/Character'

/**
 * The admin's view of the list (M13 S12).
 *
 * A player sees one shelf; an admin sees every player's shelf, grouped and
 * collapsible. That branch has no dev fixture — the mock service returns four
 * characters under one player — so it was rebuilt on `ListSection` without ever
 * being rendered. This renders it.
 */
const auth = {
	isAdmin: true,
	viewAsAdmin: true,
	currentUser: { uid: 'mock-collection' },
}

vi.mock('@site/src/hooks/firebaseAuthContext', () => ({
	useAuth: () => auth,
}))

const { CharacterList } = await import('../CharacterList')

const forPlayer = (playerName: string, name: string): CharacterDocument => {
	const base = createMockCharacter()
	return {
		...base,
		docId: `${playerName}-${name}`,
		personal: { ...base.personal, name, playerName },
	}
}

const characters = [
	forPlayer('Mara', 'Ysra of the Reeds'),
	forPlayer('Sam', 'Bardun Ninefold'),
	forPlayer('Sam', 'Ashen Vell'),
]

describe('CharacterList — admin view', () => {
	beforeEach(() => {
		auth.isAdmin = true
		auth.viewAsAdmin = true
	})

	it('groups every player onto their own shelf', () => {
		render(
			<CharacterList characters={characters} handleDeleteCharacter={vi.fn()} />,
		)
		// `ListSection`'s header carries the label and the count.
		expect(screen.getByText('Mara')).toBeTruthy()
		expect(screen.getByText('Sam')).toBeTruthy()

		/*
			Only the admin's OWN shelf is open at load — the rest stay collapsed, and
			a collapsed `ListSection` unmounts its rows. That is the behaviour the
			list has always had and the reason this assertion is not "every character
			is on screen": on a table with a dozen players, opening all of them would
			be the wall of rows the grouping exists to avoid.
		*/
		expect(screen.getByText('Ysra of the Reeds')).toBeTruthy()
		expect(screen.queryByText('Bardun Ninefold')).toBeNull()

		const samShelf = screen.getByRole('button', { name: /Expand Sam/ })
		fireEvent.click(samShelf)
		expect(screen.getByText('Bardun Ninefold')).toBeTruthy()
		expect(screen.getByText('Ashen Vell')).toBeTruthy()
	})

	it('sorts the players, so the shelves do not reorder between loads', () => {
		render(
			<CharacterList characters={characters} handleDeleteCharacter={vi.fn()} />,
		)
		const labels = screen
			.getAllByRole('button', { name: /Collapse|Expand/ })
			.map((button) => button.getAttribute('aria-label') ?? '')
		expect(labels.join(' ')).toMatch(/Mara[\s\S]*Sam/)
	})

	it('collapses a shelf on its own caret', () => {
		render(
			<CharacterList characters={characters} handleDeleteCharacter={vi.fn()} />,
		)
		const toggle = screen.getAllByRole('button', {
			name: /Collapse|Expand/,
		})[0]
		const before = toggle.getAttribute('aria-expanded')
		fireEvent.click(toggle)
		expect(toggle.getAttribute('aria-expanded')).not.toBe(before)
	})

	it('falls back to one shelf when the admin is not viewing as admin', () => {
		auth.viewAsAdmin = false
		render(
			<CharacterList characters={characters} handleDeleteCharacter={vi.fn()} />,
		)
		expect(screen.getByText('Characters')).toBeTruthy()
		expect(screen.queryByText('Mara')).toBeNull()
	})
})
