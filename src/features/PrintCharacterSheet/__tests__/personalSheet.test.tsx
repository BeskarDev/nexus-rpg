import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PersonalSheet } from '../sheets/4_Personal'
import { overflowNote } from '../sheets/SheetPrimitives'
import { splitProseBlocks } from '../sheets/splitProseBlocks'
import { emptyCharacter } from '../assets/emptyCharacter'
import { Character } from '@site/src/types/Character'

const base = (): Character => JSON.parse(emptyCharacter)

const withNpcs = (count: number, description = 'owes a debt'): Character => {
	const char = base()
	char.personal.npcRelationships = Array.from({ length: count }, (_, i) => ({
		id: `npc-${i}`,
		name: `Ninsun ${i}`,
		role: 'Artisan',
		disposition: (i % 3) - 1,
		description,
	}))
	return char
}

const blocks = (container: HTMLElement) =>
	container.querySelectorAll('[data-sheet-block]')

describe('overflowNote', () => {
	const noun = { one: 'relationship', many: 'relationships' }

	it('says nothing when the panel printed everything', () => {
		expect(overflowNote(5, 5, noun, false)).toBe('')
	})

	it('counts what it dropped', () => {
		expect(overflowNote(3, 8, noun, false)).toBe(
			'+ 5 more relationships — see the app',
		)
	})

	it('reads as a singular when one was dropped', () => {
		expect(overflowNote(7, 8, noun, false)).toBe(
			'+ 1 more relationship — see the app',
		)
	})

	it('says where a too-long entry breaks off', () => {
		expect(overflowNote(1, 1, noun, true)).toBe('breaks off here — see the app')
	})

	it('says both when the first entry is cut AND others were dropped', () => {
		expect(overflowNote(1, 4, noun, true)).toBe(
			'breaks off here, + 3 more relationships — see the app',
		)
	})
})

describe('splitProseBlocks', () => {
	it('cuts at paragraphs, list items and hard breaks', () => {
		expect(
			splitProseBlocks('<p>one</p><p>two</p><ul><li>three</li></ul>'),
		).toEqual(['<p>one', '<p>two', '<ul><li>three'])
	})

	it('cuts plain text at blank lines, which is all a paste gives it', () => {
		expect(splitProseBlocks('first note\n\nsecond note')).toEqual([
			'first note',
			'second note',
		])
	})

	it('drops blocks that carry no words', () => {
		expect(splitProseBlocks('<p></p><p>real</p><br/>-')).toEqual(['<p>real'])
	})

	it('has nothing to say about an empty field', () => {
		expect(splitProseBlocks('')).toEqual([])
	})
})

describe('PersonalSheet relationships', () => {
	it('renders one cuttable block per relationship', () => {
		const { container } = render(<PersonalSheet char={withNpcs(6)} />)
		// Six relationship blocks; the notes panel adds none for empty notes.
		expect(blocks(container)).toHaveLength(6)
	})

	/**
	 * The legacy lists number their entries from 1 INDEPENDENTLY, so allies,
	 * contacts and rivals each hold an id "1". Flattened into one list those were
	 * duplicate React keys, and the panel rendered a mix of stale and current
	 * nodes — 26 blocks for 12 relationships.
	 */
	it('keeps legacy ids from colliding across the three lists', () => {
		const warn = vi.spyOn(console, 'error').mockImplementation(() => {})
		const char = base()
		char.personal.npcRelationships = []
		const entry = (id: string, description: string) => ({ id, description })
		char.personal.allies = [entry('1', 'Shamhat, who vouched for us')]
		char.personal.contacts = [entry('1', 'the gate scribe')]
		char.personal.rivals = [entry('1', 'Zimri of the salt road')]

		const { container } = render(<PersonalSheet char={char} />)

		expect(blocks(container)).toHaveLength(3)
		expect(
			warn.mock.calls.some((call) => String(call[0]).includes('same key')),
		).toBe(false)
		warn.mockRestore()
	})

	it('drops the blank placeholder entries the empty sheet ships with', () => {
		const { container } = render(<PersonalSheet char={base()} />)
		// Seven blank allies, contacts and rivals each: none of them is a relationship.
		expect(blocks(container)).toHaveLength(0)
	})

	it('gives the physical description its own cuttable blocks', () => {
		const char = base()
		char.personal.description = 'lean and sun-dark\n\na river scar'
		const { container } = render(<PersonalSheet char={char} />)
		expect(blocks(container)).toHaveLength(2)
	})

	it('heads each disposition group once', () => {
		render(<PersonalSheet char={withNpcs(6)} />)
		expect(screen.getAllByText('Friendly (+1)')).toHaveLength(1)
	})
})
