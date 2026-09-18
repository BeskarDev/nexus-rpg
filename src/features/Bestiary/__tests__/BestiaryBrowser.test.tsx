import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// `@docusaurus/Link` is a build-time alias with no vitest resolution, and the
// detail panel's "full entry" link is the only thing that needs it.
vi.mock('@docusaurus/Link', () => ({
	default: ({ to, children }: { to: string; children: React.ReactNode }) => (
		<a href={to}>{children}</a>
	),
}))

const { BestiaryBrowser } = await import('../BestiaryBrowser')

/**
 * The browser driven the way a GM drives it.
 *
 * `bestiaryFilters.test.ts` pins the rules; this pins that the controls are
 * actually wired to them — a facet that filters nothing and a pager that pages
 * nothing both look perfectly correct in a unit test of the pure functions.
 * Assertions are written against the REAL roster, so they say what a GM would
 * see rather than what a fixture was built to say.
 */
const rows = () =>
	within(screen.getByRole('table')).getAllByRole('row').slice(1)

const rowNames = () =>
	rows()
		.map((row) => within(row).queryByRole('button', { expanded: false }))
		.filter(Boolean)
		.map((button) => button!.textContent?.replace(/^[▸▾]\s*/, '') ?? '')

/**
 * Tick one option in a filter menu.
 *
 * The filters live behind buttons now, and `Type`, `Role` and `Tier` are also
 * column headers — so the menu is reached through the named filter group rather
 * than by role and name alone.
 */
const filterMenu = () => within(screen.getByRole('group', { name: 'Filters' }))

const pick = async (
	user: ReturnType<typeof userEvent.setup>,
	menu: string,
	option: string,
) => {
	await user.click(
		filterMenu().getByRole('button', { name: new RegExp(`^${menu}`) }),
	)
	await user.click(filterMenu().getByRole('button', { name: option }))
}

beforeEach(() => {
	window.history.replaceState(null, '', '/docs/creatures/creatures/overview')
})

describe('BestiaryBrowser', () => {
	it('lists the roster with a result count', async () => {
		render(<BestiaryBrowser />)
		expect(screen.getByText(/of 25$/)).toBeInTheDocument()
		expect(rowNames()).toContain('Jackal')
	})

	it('shows the defenses and attribute dice without opening a creature', async () => {
		render(<BestiaryBrowser />)
		const jackal = rows().find((row) => row.textContent?.includes('Jackal'))!
		const cells = within(jackal)
			.getAllByRole('cell')
			.map((cell) => cell.textContent)
		// Parry 5, Dodge 8, Resist 6, then d4 / d6 / d4 / d4. Deciding whether a
		// creature suits a scene should not require expanding it.
		expect(cells).toEqual(
			expect.arrayContaining(['5', '8', '6', 'd4', 'd6', 'd4']),
		)
	})

	it('filters by what a creature does, not just its name', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.type(screen.getByLabelText('Search creatures'), 'grappled')
		// The Ghoul has no "grapple" in its name or tags; the word is in its
		// attack text.
		expect(rowNames()).toContain('Grave Husk')
		expect(rowNames()).not.toContain('Goblin Archer')
	})

	it('keeps the filter options behind a button until asked', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		// Seven facets laid out flat cost more height than the table they filter.
		expect(filterMenu().queryByRole('button', { name: 'Undead' })).toBeNull()

		const typeButton = filterMenu().getByRole('button', { name: /^Type/ })
		await user.click(typeButton)
		expect(typeButton).toHaveAttribute('aria-expanded', 'true')
		expect(filterMenu().getByRole('button', { name: 'Undead' })).toBeVisible()

		await user.keyboard('{Escape}')
		expect(typeButton).toHaveAttribute('aria-expanded', 'false')
		// Focus returns to the button that opened the panel, or a keyboard user
		// restarts from the top of the document.
		expect(typeButton).toHaveFocus()
	})

	it('narrows to a region and site at once', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		const before = rowNames().length
		await pick(user, 'Region', 'Desert')
		await pick(user, 'Site', 'Tomb')
		const after = rowNames()
		expect(after.length).toBeLessThan(before)
		expect(after).toContain('Mummy')
		// Ticking two axes intersects. The Ogre is in neither.
		expect(after).not.toContain('Ogre')
	})

	it('opens a stat block in place', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		// `expanded` narrows to the name toggle: every row also carries an "Add
		// <name> to the encounter" button now.
		const jackal = screen.getByRole('button', {
			name: /Jackal/,
			expanded: false,
		})
		expect(jackal).toHaveAttribute('aria-expanded', 'false')
		await user.click(jackal)
		expect(jackal).toHaveAttribute('aria-expanded', 'true')
		expect(screen.getByText('Bite')).toBeInTheDocument()
		// The whole card, not just the entries: a GM opening a creature needs the
		// Parry to aim at and the dice to roll, which a hand-built panel omitted.
		// The band's labels double as column headers, so two of each is the proof
		// that the card carries its own.
		expect(screen.getByText('Small Beast (Mammal)')).toBeInTheDocument()
		expect(screen.getAllByText('Parry')).toHaveLength(2)
		expect(screen.getAllByText('MND')).toHaveLength(2)
		expect(screen.getByText('Tier 0')).toBeInTheDocument()
		// Traits resolve to their shared text rather than shipping per creature.
		expect(
			screen.getByText(/While an ally is in melee range/),
		).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /Full entry/ })).toHaveAttribute(
			'href',
			'/docs/creatures/creatures/tier-0#jackal',
		)
	})

	it('pages the table and keeps the readout honest', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.selectOptions(screen.getByLabelText('Show'), '10')
		expect(rowNames()).toHaveLength(10)
		expect(screen.getByText('1–10 of 25')).toBeInTheDocument()

		await user.click(screen.getByRole('button', { name: 'Next' }))
		expect(screen.getByText('11–20 of 25')).toBeInTheDocument()
		await user.click(screen.getByRole('button', { name: '3' }))
		expect(screen.getByText('21–25 of 25')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
	})

	it('returns to page 1 when a filter changes', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.selectOptions(screen.getByLabelText('Show'), '10')
		await user.click(screen.getByRole('button', { name: 'Next' }))
		await pick(user, 'Type', 'Undead')
		// Page 3 of a five-row result is the classic filtered-table dead end.
		expect(screen.getByText(/^1–/)).toBeInTheDocument()
	})

	it('writes the view to the URL and reads it back', async () => {
		// `window.location` is a plain object in the shared test setup, so
		// `replaceState` cannot move it. The write is asserted on the call and the
		// read is set up by hand, which is also the honest split: they are two
		// separate behaviours that happen to meet in the address bar.
		const replaceState = vi.spyOn(window.history, 'replaceState')
		const user = userEvent.setup()
		const { unmount } = render(<BestiaryBrowser />)
		await pick(user, 'Type', 'Undead')
		expect(replaceState).toHaveBeenLastCalledWith(
			null,
			'',
			expect.stringContaining('type=Undead'),
		)
		// An untouched view writes a bare path, with no defaults spelled out.
		expect(replaceState.mock.calls[0][2]).toBe('/')
		unmount()
		replaceState.mockRestore()

		window.location.search = '?type=Undead'
		render(<BestiaryBrowser />)
		// The count rides on the collapsed button, so a restored filter is visible
		// without opening anything.
		expect(
			filterMenu().getByRole('button', { name: /^Type/ }),
		).toHaveTextContent('Type1')
		expect(rowNames()).not.toContain('Jackal')
		window.location.search = ''
	})

	it('explains an empty result instead of showing a blank table', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.type(screen.getByLabelText('Search creatures'), 'sphinx')
		expect(screen.getByText(/Nothing matches every filter/)).toBeInTheDocument()
		expect(screen.getByText('No creatures match')).toBeInTheDocument()
	})

	it('builds an encounter from the table and prices it', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		expect(screen.queryByRole('region', { name: 'Encounter' })).toBeNull()

		await user.click(
			screen.getByRole('button', { name: 'Add Ghoul to the encounter' }),
		)
		const panel = within(screen.getByRole('region', { name: 'Encounter' }))
		await user.selectOptions(panel.getByLabelText('Party level'), '2')

		// One at-tier Basic against a party of four: 1 TP, well under Easy.
		expect(panel.getByText(/^1 TP against a budget of/)).toBeInTheDocument()
		expect(panel.getByText('Trivial')).toBeInTheDocument()

		// Four more, fighting separately: 5 TP of creatures taking five turns a
		// round against the party's four, so the action multiplier makes it 7.
		for (let i = 0; i < 4; i++)
			await user.click(panel.getByRole('button', { name: 'One more Ghoul' }))
		expect(panel.getByText(/^7 TP against/)).toBeInTheDocument()
		// Gathered into a troop they take one turn between them and lose the
		// multiplier, which is most of why a troop is cheaper.
		await user.click(panel.getByRole('button', { name: 'Separate' }))
		expect(panel.getByText(/^3 TP against/)).toBeInTheDocument()
	})

	it('minimises to its verdict and back', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.click(
			screen.getByRole('button', { name: 'Add Ghoul to the encounter' }),
		)
		const panel = within(screen.getByRole('region', { name: 'Encounter' }))
		const toggle = panel.getByRole('button', { name: /Encounter/ })
		expect(toggle).toHaveAttribute('aria-expanded', 'true')

		await user.click(toggle)
		expect(toggle).toHaveAttribute('aria-expanded', 'false')
		// The roster goes; the answer stays on the header line.
		expect(panel.queryByLabelText('Number of Ghoul')).not.toBeVisible()
		expect(panel.getByText(/1 creature,/)).toBeInTheDocument()

		await user.click(toggle)
		expect(panel.getByLabelText('Number of Ghoul')).toBeVisible()
	})

	it('steps the difficulty for circumstances', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		// Ten rows to a page, so a tier 4 creature is reached by searching rather
		// than by being on the first page.
		await user.type(screen.getByLabelText('Search creatures'), 'elder ghoul')
		await user.click(
			screen.getByRole('button', { name: 'Add Elder Ghoul to the encounter' }),
		)
		const panel = within(screen.getByRole('region', { name: 'Encounter' }))
		await user.selectOptions(panel.getByLabelText('Party level'), '4')
		// A tier 4 Lord against a level 4 party of four is 12 TP: three life pools
		// and two turns a round, which is a Deadly duel. Circumstances cannot push
		// past the top band, and the panel says so rather than promising a step.
		expect(panel.getByText('Deadly')).toBeInTheDocument()
		await user.click(panel.getByRole('button', { name: /Creatures surprise/ }))
		expect(
			panel.getByText(/Circumstances cannot push this past Deadly/),
		).toBeInTheDocument()

		// Down a step from the top does move.
		await user.click(panel.getByRole('button', { name: /Creatures surprise/ }))
		await user.click(panel.getByRole('button', { name: /dedicated healer/ }))
		expect(panel.getByText('Hard')).toBeInTheDocument()
		expect(panel.getByText(/1 step down from Deadly/)).toBeInTheDocument()
	})

	it('prices a crowd on its action economy', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.click(
			screen.getByRole('button', { name: 'Add Ghoul to the encounter' }),
		)
		const panel = within(screen.getByRole('region', { name: 'Encounter' }))
		await user.selectOptions(panel.getByLabelText('Party level'), '2')
		for (let i = 0; i < 7; i++)
			await user.click(panel.getByRole('button', { name: 'One more Ghoul' }))
		// Eight at-tier Basics: 8 TP on their own, taking twice the party's turns,
		// so 12. Being outnumbered two to one by creatures who can all hurt you is
		// a Deadly fight.
		expect(panel.getByText(/^12 TP against/)).toBeInTheDocument()
		expect(panel.getByText('Deadly')).toBeInTheDocument()
		expect(panel.getByText(/multiplies the cost by 1.5/)).toBeInTheDocument()
	})

	it('adds a designed group in one click', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.click(
			screen.getByRole('button', { name: /Jackal/, expanded: false }),
		)
		// The Jackal's own organisation block offers a pack of four to nine.
		await user.click(
			screen.getByRole('button', {
				name: /Add 4-6 to the encounter as a Pack/,
			}),
		)
		const panel = within(screen.getByRole('region', { name: 'Encounter' }))
		expect(panel.getByLabelText('Number of Jackal')).toHaveValue(4)
	})

	it('carries the encounter in the page address', async () => {
		const replaceState = vi.spyOn(window.history, 'replaceState')
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.click(
			screen.getByRole('button', { name: 'Add Ghoul to the encounter' }),
		)
		expect(replaceState).toHaveBeenLastCalledWith(
			null,
			'',
			expect.stringContaining('enc=Ghoul'),
		)
		replaceState.mockRestore()
	})

	it('hands the encounter to the print deck', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.click(
			screen.getByRole('button', { name: 'Add Ghoul to the encounter' }),
		)
		await user.type(screen.getByLabelText('Search creatures'), 'mummy')
		await user.click(
			screen.getByRole('button', { name: 'Add Mummy to the encounter' }),
		)
		const panel = within(screen.getByRole('region', { name: 'Encounter' }))
		// Keyed by name and tier, not by roster position, so the link still prints
		// the right cards after the bestiary grows.
		expect(
			panel.getByRole('link', { name: 'Print these cards' }),
		).toHaveAttribute(
			'href',
			'/docs/gm-tools/printing/creature-cards?print=Ghoul~2%2CMummy~4',
		)
	})

	it('sorts by a column and flips on a second click', async () => {
		const user = userEvent.setup()
		render(<BestiaryBrowser />)
		await user.click(screen.getByRole('button', { name: /^HP/ }))
		const ascending = rowNames()
		await user.click(screen.getByRole('button', { name: /^HP/ }))
		expect(rowNames()[0]).not.toBe(ascending[0])
		// The Elder Ghoul is 3×40, the most life in the roster.
		expect(rowNames()[0]).toBe('Elder Ghoul')
	})
})
