import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CharacterDocument } from '@site/src/types/Character'
import { CharacterMultiSelector } from '../CharacterMultiSelector'

/**
 * The roster control at an ADMIN's scale (owner, 2026-09-14).
 *
 * Signed in as themselves an owner sees their own handful of characters; signed
 * in as an admin they see every player's, and the flat unscrolled column that
 * served four names pushed the categories and the print verb off the screen at
 * twenty. These are the behaviours that make that bearable, and they are worth
 * a test because every one of them is invisible until the roster is big.
 */
const roster = vi.hoisted(() => ({ characters: [] as CharacterDocument[] }))

vi.mock('../useCharacterRoster', async () => {
	const actual = await vi.importActual<typeof import('../useCharacterRoster')>(
		'../useCharacterRoster',
	)
	return {
		...actual,
		useCharacterRoster: () => ({
			characters: roster.characters,
			loading: false,
			error: null,
			userLoggedIn: true,
		}),
	}
})

const character = (name: string, playerName: string): CharacterDocument =>
	({
		docId: `${playerName}-${name}`.toLowerCase(),
		collectionId: playerName.toLowerCase(),
		personal: { name, playerName },
	}) as unknown as CharacterDocument

const PLAYERS = ['Tamar', 'Ur-Nammu', 'Zaid']
const many = (): CharacterDocument[] =>
	PLAYERS.flatMap((player) =>
		Array.from({ length: 8 }, (_, index) =>
			character(`${player} Hero ${index + 1}`, player),
		),
	)

const setup = (characters: CharacterDocument[]) => {
	roster.characters = characters
	const onChange = vi.fn()
	render(<CharacterMultiSelector selectedKeys={[]} onChange={onChange} />)
	return { onChange }
}

beforeEach(() => {
	roster.characters = []
	vi.clearAllMocks()
})

describe('CharacterMultiSelector', () => {
	it('stays a plain list for a small roster', () => {
		setup([character('Ana', 'Tamar'), character('Bo', 'Zaid')])
		// A search box over two names is furniture asking to be ignored.
		expect(screen.queryByLabelText('Search characters')).toBeNull()
		expect(
			screen.getByRole('group', { name: 'Characters' }).className,
		).not.toContain('is-scrolling')
	})

	it('offers search and a scroll box once the roster is long', () => {
		setup(many())
		expect(screen.getByLabelText('Search characters')).toBeTruthy()
		expect(
			screen.getByRole('group', { name: 'Characters' }).className,
		).toContain('is-scrolling')
	})

	it('filters by player name as well as by character name', async () => {
		const user = userEvent.setup()
		setup(many())
		await user.type(screen.getByLabelText('Search characters'), 'ur-nammu')

		const list = screen.getByRole('group', { name: 'Characters' })
		expect(within(list).getAllByRole('checkbox')).toHaveLength(8)
		expect(screen.getByText(/8 shown/)).toBeTruthy()
	})

	it('selects only what the search is showing, leaving the rest alone', async () => {
		const user = userEvent.setup()
		const { onChange } = setup(many())
		await user.type(screen.getByLabelText('Search characters'), 'zaid')
		await user.click(screen.getByRole('button', { name: 'Select shown' }))

		const [documents, keys] = onChange.mock.calls.at(-1)!
		expect(keys).toHaveLength(8)
		expect(
			(documents as CharacterDocument[]).every(
				(entry) => entry.personal.playerName === 'Zaid',
			),
		).toBe(true)
	})

	it('keeps a ticked character that the search then hides', async () => {
		const user = userEvent.setup()
		roster.characters = many()
		const onChange = vi.fn()
		const selected = [`tamar-tamar hero 1`]
		render(
			<CharacterMultiSelector selectedKeys={selected} onChange={onChange} />,
		)

		await user.type(screen.getByLabelText('Search characters'), 'zaid')
		// Out of sight, still in the deck — which is exactly why the tally counts
		// the whole selection rather than the visible rows.
		expect(screen.getByText(/1 of 24 selected/)).toBeTruthy()

		await user.click(screen.getByRole('button', { name: 'Deselect shown' }))
		const [, keys] = onChange.mock.calls.at(-1)!
		expect(keys).toEqual(selected)
	})

	it('groups the roster by player, then by character', () => {
		setup(many())
		const labels = screen
			.getAllByRole('checkbox')
			.map((box) => box.closest('label')?.textContent ?? '')
		const players = labels.map(
			(label) => PLAYERS.find((player) => label.includes(player)) ?? '',
		)
		// Every one of a player's characters sits together: the roster's order is
		// the printed deck's order, and a player's cards belong in one run.
		expect(players).toEqual([...players].sort())
	})

	it('says nothing matched rather than showing an empty box', async () => {
		const user = userEvent.setup()
		setup(many())
		await user.type(screen.getByLabelText('Search characters'), 'nobody')
		expect(screen.getByText('No character matches that search.')).toBeTruthy()
		expect(screen.getByRole('button', { name: 'Select shown' })).toBeDisabled()
	})
})
