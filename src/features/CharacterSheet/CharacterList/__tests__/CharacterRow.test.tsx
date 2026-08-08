import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CharacterRow } from '../CharacterRow'
import { CHARACTER_HEADINGS, CHARACTER_TEMPLATE } from '../characterColumns'
import { createMockCharacter } from '@site/src/dev/mockData'

/**
 * The character list's row (M13 S12).
 *
 * Two things are worth pinning. The row is a LINK — a `ListItemButton` inside an
 * anchor was the old construction, and nesting the two is what makes middle-click
 * and keyboard activation behave differently from each other. And its grid has to
 * declare as many tracks as the header above it, which is the S8c defect class:
 * a template and its headings drift apart and the columns silently stop lining up.
 */
const character = createMockCharacter()

describe('CharacterRow', () => {
	it('is a link to that character, not a button', () => {
		render(<CharacterRow character={character} onDelete={vi.fn()} />)
		const link = screen.getByRole('link')
		expect(link.tagName).toBe('A')
		expect(link.getAttribute('href')).toContain(
			`${character.collectionId}-${character.docId}`,
		)
	})

	it('shows the four facts the list is scanned by', () => {
		const { container } = render(
			<CharacterRow character={character} onDelete={vi.fn()} />,
		)
		const row = container.querySelector('.cs-character-row')!
		expect(row.textContent).toContain(character.personal.name)
		expect(row.textContent).toContain(character.personal.folk)
		expect(row.textContent).toContain(character.personal.background)
	})

	it('keeps the delete control outside the link', () => {
		// A button cannot live inside an anchor, and a delete that navigates on a
		// mis-click is the worst version of this control.
		const { container } = render(
			<CharacterRow character={character} onDelete={vi.fn()} />,
		)
		expect(container.querySelector('.cs-character-row button')).toBeNull()
		expect(
			container.querySelector('.cs-character-line__actions button'),
		).toBeTruthy()
	})

	it('confirms before deleting', () => {
		const onDelete = vi.fn()
		const { container } = render(
			<CharacterRow character={character} onDelete={onDelete} />,
		)
		fireEvent.click(
			container.querySelector('.cs-character-line__actions button')!,
		)
		expect(onDelete).not.toHaveBeenCalled()
		fireEvent.click(screen.getByRole('button', { name: 'Delete character' }))
		expect(onDelete).toHaveBeenCalledTimes(1)
	})

	it('fills the portrait plate with the portrait when there is one', () => {
		// The owner's report: the avatar is meant to carry the character's picture.
		// It always did — the mock characters ship `profilePicture: ''`, so every
		// row in a dev screenshot falls back to the mark. This pins the branch.
		const { container } = render(
			<CharacterRow
				character={{
					...character,
					personal: { ...character.personal, profilePicture: '/portrait.png' },
				}}
				onDelete={vi.fn()}
			/>,
		)
		const portrait = container.querySelector('.cs-character-row__portrait')
		expect(portrait).toBeTruthy()
		expect(portrait?.getAttribute('src')).toBe('/portrait.png')
		// And the plate is still drawn around it, so the column has one geometry.
		expect(container.querySelector('.cs-character-row__mark')).toBeTruthy()
	})

	it('keeps the plate and shows the folk mark when there is no portrait', () => {
		const { container } = render(
			<CharacterRow
				character={{
					...character,
					personal: { ...character.personal, profilePicture: '' },
				}}
				onDelete={vi.fn()}
			/>,
		)
		expect(container.querySelector('.cs-character-row__portrait')).toBeNull()
		expect(container.querySelector('.cs-character-row__mark svg')).toBeTruthy()
	})

	it('declares as many tracks as the header has headings', () => {
		// The S8c failure mode: a template and its headings drift, and every column
		// after the drift is silently one place out.
		const tracks = CHARACTER_TEMPLATE.replace(/minmax\([^)]*\)/g, 'minmax')
			.split(/\s+/)
			.filter(Boolean)
		expect(tracks).toHaveLength(CHARACTER_HEADINGS.length)
	})
})
