import React from 'react'
/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { MagicItemBuilderDialog } from '../MagicItemBuilderDialog'
import { CharacterDocument } from '../../../../../../types/Character'

// Mock character data
const mockCharacter: CharacterDocument = {
	docRef: {} as any,
	docId: 'test-char',
	collectionId: 'characters',
	personal: {
		name: 'Test Character',
		playerName: 'Test Player',
		folk: 'Human',
		upbringing: 'City',
		background: 'Scholar',
		height: '6ft',
		weight: '180lbs',
		age: '25',
		description: 'A test character',
		motivation: 'Testing',
		allies: [],
		contacts: [],
		rivals: [],
		npcRelationships: [],
		notes: '',
	},
	statistics: {} as any,
	skills: {} as any,
	items: {
		coins: 1000,
		encumbrance: {
			encumberedAt: 10,
			overencumberedAt: 20,
			carryModifier: 0,
			currentLoad: 0,
			mountMaxLoad: 0,
			storageMaxLoad: 0,
		},
		weapons: [],
		items: [],
	},
	spells: {} as any,
	companions: [],
}

/**
 * The builder's behaviour, driven through the ledgers that replaced the stepper
 * (M13 S8).
 *
 * ## What changed here, and what deliberately did not
 *
 * The INTERACTION is new: there is no `Stepper`, no category `combobox` and no
 * Next/Back, because a settled register now states its answer and the next one
 * opens. Every assertion about the OUTCOME is unchanged — the generated name, the
 * cost arithmetic, the damage, the description and the location are the contract
 * this tool has to keep, and they are what these tests are for.
 *
 * The one test that was rewritten rather than re-pointed is the helmet AV case: it
 * was a tree of `if (element)` guards ending in `expect(true).toBe(true)`, so it
 * could pass without asserting anything. It asserts now.
 */
describe('MagicItemBuilderDialog', () => {
	const mockOnClose = vi.fn()
	const mockOnCreateItem = vi.fn()

	beforeEach(() => {
		mockOnClose.mockClear()
		mockOnCreateItem.mockClear()
	})

	const renderDialog = (open = true) =>
		render(
			<MagicItemBuilderDialog
				open={open}
				onClose={mockOnClose}
				onCreateItem={mockOnCreateItem}
				character={mockCharacter}
			/>,
		)

	/** A ledger row, chosen by the name in its first cell. */
	const row = (name: string | RegExp) =>
		screen
			.getAllByRole('option')
			.find((option) =>
				typeof name === 'string'
					? option.textContent?.startsWith(name)
					: name.test(option.textContent ?? ''),
			)!

	const chooseQuality = (label: string) =>
		screen.getByRole('radio', { name: label })

	/**
	 * Keep the base item's own name and move on to quality.
	 *
	 * The appearance register sits directly behind the base item, so every path
	 * through the builder passes it. Its first row is always the standard form.
	 */
	const keepStandardName = () => screen.getAllByRole('option')[0]

	const createButton = () =>
		screen.getByRole('button', { name: /add to inventory/i })

	/** Reopen a settled register by pressing its summary row. */
	const reopen = (label: string) => {
		const register = screen
			.getAllByText(label)
			.map((node) => node.closest('.cb-register'))
			.find(Boolean)!
		return register.querySelector('.cb-register__summary') as HTMLElement
	}

	it('renders its first register, and nothing when closed', () => {
		const { unmount } = renderDialog()
		expect(screen.getByText('Magic Item Builder')).toBeInTheDocument()
		expect(screen.getByText('Base item')).toBeInTheDocument()
		unmount()

		renderDialog(false)
		expect(screen.queryByText('Magic Item Builder')).not.toBeInTheDocument()
	})

	it('opens the next register as each choice is made', async () => {
		const user = userEvent.setup()
		renderDialog()

		// The quality register is locked until there is an item to price.
		expect(screen.getByText('Choose a base item first')).toBeInTheDocument()

		await user.click(row('Shortsword'))
		// Choosing the item settles register I and opens APPEARANCE, which the base
		// item alone answers.
		expect(row('Gladius')).toBeVisible()
		// …and the settled answer is still on screen, with the way back to it.
		expect(screen.getAllByText('Change')[0]).toBeInTheDocument()

		// Appearance opens the quality rail.
		await user.click(keepStandardName())
		expect(screen.getByRole('radio', { name: 'Q4 (formidable)' })).toBeVisible()

		// Quality opens the ENCHANTMENT, which is the interesting choice.
		await user.click(chooseQuality('Q4 (formidable)'))
		expect(row('No enchantment')).toBeVisible()

		// And the enchantment opens the MATERIAL, which used to be reachable only
		// through its `Change` control (owner review).
		await user.click(row('Flaming'))
		expect(row('Bronze')).toBeVisible()
	})

	it('names the item after the cultural type chosen for it', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Longsword'))
		await user.click(row('Bastard Sword'))
		await user.click(chooseQuality('Q4 (formidable)'))

		await user.click(createButton())
		// The appearance replaces the base item's name and NOTHING else: a Longsword
		// costs 100 base + 1,000 magic base either way.
		expect(mockOnCreateItem).toHaveBeenCalledWith(
			expect.objectContaining({ name: 'Bronze Bastard Sword +1', cost: 1100 }),
		)
	})

	it('offers no appearance for an item with no cultural variants', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Buckler'))
		expect(
			screen.getByText('A Buckler has no cultural variants'),
		).toBeInTheDocument()
	})

	it('closes and clears the draft once the item is added', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Shortsword'))
		await user.click(keepStandardName())
		await user.click(chooseQuality('Q4 (formidable)'))
		await user.click(createButton())

		expect(mockOnCreateItem).toHaveBeenCalledTimes(1)
		// Adding ENDS the commission — no confirm-discard prompt, because the draft
		// was committed rather than lost.
		expect(mockOnClose).toHaveBeenCalledTimes(1)
		expect(screen.queryByText('Unsaved changes')).not.toBeInTheDocument()
		// …and the builder is back to its first register, so reopening it does not
		// show an item that already exists.
		expect(screen.getByText('Choose a base item')).toBeInTheDocument()
	})

	it('creates a weapon with the right name, cost, damage and description', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Shortsword'))
		await user.click(keepStandardName())
		await user.click(chooseQuality('Q4 (formidable)'))
		// Quality opens the ENCHANTMENT: the material is required but already
		// answered with the plain one, and the enchantment is the interesting choice.
		await user.click(row('Flaming'))
		await user.click(createButton())

		expect(mockOnCreateItem).toHaveBeenCalledWith(
			expect.objectContaining({
				name: expect.stringMatching(/Flaming.*Shortsword \+1$/),
				// 50 base + 1000 magic base + 0 material (Bronze is a base material)
				// + 1000 enchantment
				cost: 2050,
				damage: expect.objectContaining({
					// A Shortsword is a Blade, so Strength — `agile` grants an option the
					// player takes per attack, it does not move the base (owner report:
					// the builder wrote an empty base attribute for every weapon).
					base: 'STR',
					weapon: 3, // 2 base + 1 quality bonus (Q2 -> Q4)
					type: 'physical',
				}),
				description: expect.stringContaining('While holding this weapon'),
				location: 'carried',
			}),
		)
	})

	it('creates an item with only a base material and no enchantment', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Shortsword'))
		await user.click(keepStandardName())
		await user.click(chooseQuality('Q4 (formidable)'))
		// A base material is chosen for you, so the item is complete without
		// touching the material or enchantment registers.
		expect(createButton()).toBeEnabled()

		await user.click(createButton())
		expect(mockOnCreateItem).toHaveBeenCalledWith(
			expect.objectContaining({ cost: 1050 }),
		)
	})

	it('creates a wearable, which skips the magic-item base cost', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Amulet'))
		await user.click(chooseQuality('Q4 (formidable)'))
		await user.click(row('of Ogre Strength'))
		await user.click(createButton())

		expect(mockOnCreateItem).toHaveBeenCalledWith(
			expect.objectContaining({
				name: expect.stringMatching(/Amulet of Ogre Strength$/),
				// 50 base + 0 magic base (wearables skip it) + 0 material + 1000
				// enchantment
				cost: 1050,
				location: 'carried',
				description: expect.stringContaining('While wearing this item'),
			}),
		)
	})

	it('prices a special material and an enchantment together, and shows the total', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Shortsword'))
		await user.click(keepStandardName())
		await user.click(chooseQuality('Q4 (formidable)'))
		// Choosing the enchantment opens the MATERIAL register, so a special material
		// is walked into rather than reopened.
		await user.click(row('Flaming'))
		await user.click(row('Iron'))

		// 50 base + 1000 magic base + 500 material + 1000 enchantment
		expect(screen.getByText('2,550')).toBeInTheDocument()

		await user.click(createButton())
		expect(mockOnCreateItem).toHaveBeenCalledWith(
			expect.objectContaining({
				name: 'Flaming Iron Shortsword +1',
				cost: 2550,
			}),
		)
	})

	it('resets back to an empty commission', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Shortsword'))
		await user.click(keepStandardName())
		await user.click(chooseQuality('Q4 (formidable)'))
		await user.click(screen.getByRole('button', { name: /reset/i }))

		expect(screen.getByText('Choose a base item')).toBeInTheDocument()
		expect(screen.getByText('Choose a base item first')).toBeInTheDocument()
	})

	it('filters materials and enchantments by category and quality', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(row('Amulet'))
		await user.click(chooseQuality('Q5 (exceptional)'))

		// Wearables take suffix enchantments; `Flaming` is a weapon's.
		expect(row('of Protection')).toBeDefined()
		expect(row('of Ogre Strength')).toBeDefined()
		expect(
			screen.queryAllByRole('option').some((o) => o.textContent === 'Flaming'),
		).toBe(false)

		// …and a wearable-and-Q5 material is in the register behind it.
		await user.click(reopen('Material'))
		expect(row('Phantom-Silk')).toBeDefined()
	})

	it('writes a helmet’s AV once, not twice', async () => {
		const user = userEvent.setup()
		renderDialog()

		// The only helmet in the data; the register filters to it by name.
		await user.click(row(/^Helmet/))
		await user.click(keepStandardName())
		await user.click(chooseQuality('Q5 (exceptional)'))
		await user.click(createButton())

		expect(mockOnCreateItem).toHaveBeenCalled()
		const created = mockOnCreateItem.mock.calls[0][0]
		expect(created.quality).toBe(5)

		const properties = Array.isArray(created.properties)
			? created.properties.join(', ')
			: (created.properties ?? '')
		// The bug this guards: `AV +2, AV +1` from the bonus being appended rather
		// than replacing the base value.
		expect(properties.match(/AV \+\d+/g) ?? []).toHaveLength(1)
	})
})
