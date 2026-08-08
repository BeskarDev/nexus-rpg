import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setupStore } from '../store'
import { characterSheetActions } from '../characterSheetReducer'
import { createMockCharacter } from '@site/src/dev/mockData'
import { AbilityRow } from '../CharacterSheetTabs/01_Skills/AbilityRow'
import { ItemRow } from '../CharacterSheetTabs/02_Items/ItemRow'
import { WeaponRow } from '../CharacterSheetTabs/02_Items/WeaponRow'
import { SpellRow } from '../CharacterSheetTabs/03_Spells/SpellRow'
import { NpcRow } from '../CharacterSheetTabs/04_Personal/NpcRow'
import { CompanionRow } from '../CharacterSheetTabs/05_Companions/components/CompanionRow'

/**
 * One row behaviour, six tabs (M13 S10).
 *
 * ## Why this is not one assertion on `UnifiedListItem`
 *
 * The primitive has its own tests and they pass. What they cannot see is a ROW
 * that reached the primitive with the wrong props, or stopped reaching it at all —
 * and that is the defect class this milestone keeps finding. S8c shipped ability
 * rows that stacked vertically with `tsc` clean and 396 tests green, because the
 * row asked for a grid class and never passed the template. M9's stat-card bugs
 * were per-card for the same reason, and its log records that a shared helper
 * would have hidden which one regressed.
 *
 * So: each tab's real row component, rendered with real data, asserted
 * separately. When one breaks, the failure names the tab.
 *
 * ## What is pinned
 *
 * Four behaviours, from the milestone's own wording: **starts collapsed**, **first
 * activation expands**, **Escape collapses**, **reachable from the keyboard**.
 */
const noop = vi.fn()

/** Read for prop data only. The store gets its own copy — see `withStore`. */
const character = createMockCharacter()

/**
 * Rows read the active character out of the store, so give them a real one.
 *
 * A FRESH character per render, not one shared module-level object: Redux Toolkit
 * freezes what it stores, and `migrateCharacterData` writes `character.companions`
 * on the way in — so the second render of a shared object throws
 * `Cannot assign to read only property 'companions'`.
 */
const withStore = (ui: React.ReactNode) => {
	const store = setupStore()
	store.dispatch(characterSheetActions.setCharacter(createMockCharacter()))
	return render(<Provider store={store}>{ui}</Provider>)
}

type RowCase = {
	tab: string
	/** Text that appears in the summary, used to find the disclosure. */
	name: RegExp
	render: () => ReturnType<typeof render>
}

const ability = character.skills.abilities[0]
const item = character.items.items[0]
const weapon = character.items.weapons[0]
const spell = character.spells.spells[0]

const CASES: RowCase[] = [
	{
		tab: 'Skills — ability',
		name: new RegExp(ability.title),
		render: () =>
			withStore(
				<AbilityRow
					title={ability.title}
					description={ability.description}
					tag={ability.tag}
					actionType={ability.actionType}
					rank={ability.rank}
					skill={ability.skill}
					availableTags={['Talent']}
					updateAbility={noop}
					moveToCategory={noop}
					deleteAbility={noop}
					abilityId={ability.id}
				/>,
			),
	},
	{
		tab: 'Items — item',
		name: new RegExp(item.name),
		render: () =>
			withStore(<ItemRow item={item} updateItem={noop} deleteItem={noop} />),
	},
	{
		tab: 'Items — weapon',
		name: new RegExp(weapon.name),
		render: () =>
			withStore(
				<WeaponRow weapon={weapon} updateWeapon={noop} deleteWeapon={noop} />,
			),
	},
	{
		tab: 'Spells — spell',
		name: new RegExp(spell.name),
		render: () =>
			withStore(
				<SpellRow spell={spell} updateSpell={noop} deleteSpell={noop} />,
			),
	},
	{
		tab: 'Personal — NPC',
		name: /Kesh the Bronzewright/,
		render: () =>
			withStore(
				<NpcRow
					npcRelationship={{
						id: 'npc-1',
						name: 'Kesh the Bronzewright',
						role: 'ally',
						disposition: 'friendly',
						description: 'Forged the spear.',
					}}
					updateNpc={noop}
					deleteNpc={noop}
				/>,
			),
	},
	{
		tab: 'Companions — companion',
		name: /Ashen/,
		render: () =>
			withStore(
				<CompanionRow
					companion={{
						id: 'companion-1',
						name: 'Ashen',
						type: 'Mount',
						markdown: '',
						currentHp: 10,
						maxHp: 10,
						wounded: false,
					}}
					updateCompanion={noop}
					updateWithAutoHP={noop}
					deleteCompanion={noop}
				/>,
			),
	},
]

describe('every ledger row behaves alike', () => {
	beforeEach(() => {
		noop.mockClear()
	})

	for (const testCase of CASES) {
		describe(testCase.tab, () => {
			it('starts collapsed and opens on first activation', async () => {
				testCase.render()
				const summary = screen.getAllByRole('button', {
					name: testCase.name,
				})[0]
				expect(summary).toHaveAttribute('aria-expanded', 'false')

				await userEvent.click(summary)
				expect(summary).toHaveAttribute('aria-expanded', 'true')
			})

			it('collapses on Escape', async () => {
				testCase.render()
				const summary = screen.getAllByRole('button', {
					name: testCase.name,
				})[0]
				await userEvent.click(summary)
				expect(summary).toHaveAttribute('aria-expanded', 'true')

				await userEvent.keyboard('{Escape}')
				expect(summary).toHaveAttribute('aria-expanded', 'false')
			})

			it('is reachable and operable from the keyboard', async () => {
				const { container } = testCase.render()
				const summary = within(container).getAllByRole('button', {
					name: testCase.name,
				})[0]

				summary.focus()
				expect(summary).toHaveFocus()

				await userEvent.keyboard('{Enter}')
				expect(summary).toHaveAttribute('aria-expanded', 'true')
			})
		})
	}
})
