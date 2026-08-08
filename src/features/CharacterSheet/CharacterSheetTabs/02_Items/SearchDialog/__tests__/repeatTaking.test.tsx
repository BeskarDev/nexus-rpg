import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TalentsSearchDialog } from '../TalentsSearchDialog'
import talentsData from '@site/src/utils/data/json/talents.json'
import type { CharacterDocument } from '@site/src/types/Character'

/**
 * Taking a thing twice (M13 S8b).
 *
 * `importAbilities` unshifts with a fresh UUID and no duplicate check, so the
 * sheet would happily hold two copies of a talent the rules allow once. The
 * obvious fix — dedupe on import — is WRONG: four of the 148 talents say "You can
 * choose this Talent multiple times" in so many words, and for those a second copy
 * is the rules working as written.
 *
 * So the dialog says which is which, read from the description rather than from a
 * hand-kept list.
 */

const talents = talentsData as { name: string; description: string }[]

const REPEATABLE = talents
	.filter((t) => /multiple times/i.test(t.description))
	.map((t) => t.name)

const ONCE_ONLY = talents
	.filter((t) => !/multiple times/i.test(t.description))
	.map((t) => t.name)

const characterHolding = (titles: string[]): CharacterDocument =>
	({
		skills: {
			abilities: titles.map((title, index) => ({
				id: `a${index}`,
				title,
				description: '',
				tag: 'Talent',
				rank: 1,
			})),
			// Trained everywhere and flush with points, so the only bar that can fire
			// is the one under test.
			skills: [
				'Arcana',
				'Mysticism',
				'Insight',
				'Lore',
				'Fighting',
				'Athletics',
			].map((name) => ({ id: name, name, rank: 5, xp: 40 })),
		},
		items: { coins: 0, weapons: [], items: [] },
		spells: { spells: [] },
	}) as unknown as CharacterDocument

const open = (character: CharacterDocument) =>
	render(
		<TalentsSearchDialog
			open
			onClose={vi.fn()}
			onImportTalents={vi.fn()}
			character={character}
		/>,
	)

/** The standing mark sitting beside a given talent's name. */
const markFor = (name: string) => {
	const cell = screen.getByText(name).closest('div')
	return cell?.querySelector('.cs-standing--blocked')?.textContent ?? null
}

describe('taking a talent twice', () => {
	it('the corpus really does contain both kinds', () => {
		// Guards every assertion below from being vacuous.
		expect(REPEATABLE.length).toBe(4)
		expect(ONCE_ONLY.length).toBeGreaterThan(100)
	})

	it('bars a talent already held that may be taken only once', () => {
		const held = ONCE_ONLY[0]
		open(characterHolding([held]))

		expect(markFor(held)).toBe('already taken')
	})

	it('does NOT bar one the rulebook says may be taken again', () => {
		// The half a blanket dedupe on import would have broken.
		const held = REPEATABLE[0]
		open(characterHolding([held]))

		expect(markFor(held)).toBeNull()
		// Still reported as held, so "hide what I have" keeps working on it.
		expect(
			screen
				.getByText(held)
				.closest('div')
				?.querySelector('.cs-standing--owned'),
		).toBeTruthy()
	})

	it('leaves an unheld talent unmarked', () => {
		open(characterHolding([]))

		expect(markFor(ONCE_ONLY[0])).toBeNull()
		expect(markFor(REPEATABLE[0])).toBeNull()
	})
})
