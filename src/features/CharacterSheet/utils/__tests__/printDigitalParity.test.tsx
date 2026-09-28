import { render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import { describe, expect, it } from 'vitest'
import { StatisticsSheet } from '@site/src/features/PrintCharacterSheet/sheets/1_Statistics'
import { EquipmentSheet } from '@site/src/features/PrintCharacterSheet/sheets/2_Equipment'
import { SpellsSheet } from '@site/src/features/PrintCharacterSheet/sheets/3_Spells'
import { prepareStoredCharacter } from '@site/src/features/PrintingTools/useCharacterRoster'
import { HpCard } from '../../CharacterSheetTabs/00_Statistics/HpCard'
import { AvCard } from '../../CharacterSheetTabs/00_Statistics/AvCard'
import { ParryCard } from '../../CharacterSheetTabs/00_Statistics/ParryCard'
import { DodgeCard } from '../../CharacterSheetTabs/00_Statistics/DodgeCard'
import { ResistCard } from '../../CharacterSheetTabs/00_Statistics/ResistCard'
import {
	createInitialState,
	createTestStore,
} from '../../../../../tests/utils/character-test-helpers'
import { calculateDamageValue } from '../calculateDamageDisplay'
import { deriveCharacter } from '../deriveCharacter'
import { createDerivationFixture } from './deriveCharacterFixture'

/**
 * The printed sheet and the digital sheet must state the same numbers (owner
 * report: the print showed "1/11" load and a different HP from the app).
 *
 * Both now read `deriveCharacter`, and this pins it: every computed value the
 * print sheets show is read off the rendered page and compared with the
 * derivation, and so are the digital stat cards. The fixture's stored copies are
 * all deliberately wrong, so a surface that reads storage instead fails here.
 */

/** The value printed under a labelled `Stat`. */
const printedStat = (container: HTMLElement, label: string): string => {
	for (const value of Array.from(container.querySelectorAll('.pc-stat'))) {
		const labelText = value.parentElement
			?.querySelector('.pc-label')
			?.textContent?.trim()
		if (labelText === label) return value.textContent?.trim() ?? ''
	}
	throw new Error(`No printed stat labelled "${label}"`)
}

describe('print sheets read deriveCharacter', () => {
	const char = createDerivationFixture()
	const derived = deriveCharacter(char)

	it('Statistics: HP, level, XP and defences', () => {
		const { container } = render(<StatisticsSheet char={char} />)
		// The effective max, after Fatigue, as the digital HP card shows it.
		expect(printedStat(container, 'Max')).toBe(`${derived.hp.effectiveMax}`)
		expect(printedStat(container, 'Level')).toBe(`${derived.level}`)
		expect(printedStat(container, 'XP')).toBe(
			`${derived.spentXp} / ${char.skills.xp.total}`,
		)
		expect(printedStat(container, 'AV')).toBe(`${derived.av.total}`)
		expect(printedStat(container, 'Parry')).toBe(`${derived.parry.total}`)
		expect(printedStat(container, 'Dodge')).toBe(`${derived.dodge.total}`)
		expect(printedStat(container, 'Resist')).toBe(`${derived.resist.total}`)
	})

	it('Statistics: skill ranks come from XP', () => {
		const { container } = render(<StatisticsSheet char={char} />)
		const mysticismRow = Array.from(container.querySelectorAll('.pc-row')).find(
			(row) => row.textContent?.includes('Mysticism'),
		)
		expect(mysticismRow?.textContent).toMatch(/^2\s*Mysticism\s*6$/)
	})

	it('Statistics: a talent prints its rank beside its name', () => {
		const withRanks = createDerivationFixture()
		withRanks.skills.abilities[0].rank = 2
		render(<StatisticsSheet char={withRanks} />)
		expect(screen.getByLabelText('Rank 2')).toHaveTextContent('2')
		// A talent with no stored rank is rank 1; a folk ability has no rank.
		expect(screen.getByLabelText('Rank 1')).toHaveTextContent('1')
		expect(screen.getAllByLabelText(/^Rank \d$/)).toHaveLength(2)
	})

	it('Equipment: load and capacity', () => {
		const { container } = render(<EquipmentSheet char={char} />)
		expect(printedStat(container, 'Load')).toBe(`${derived.load.current}`)
		expect(printedStat(container, 'Encumbered At')).toBe(
			`${derived.load.carryCapacity}`,
		)
		expect(printedStat(container, 'Max Load')).toBe(
			`${derived.load.maxCapacity}`,
		)
	})

	it('Equipment: a carried row prints its whole load', () => {
		const { container } = render(<EquipmentSheet char={char} />)
		const torch = Array.from(container.querySelectorAll('.pc-row')).find(
			(row) => row.textContent?.includes('Torch'),
		)
		// Torch x3 at load 1 each: name, uses, load, cost.
		const cells = Array.from(torch?.children ?? []).map((cell) =>
			cell.textContent?.trim(),
		)
		expect(cells[0]).toBe('Torch ×3')
		expect(cells[2]).toBe('3')
	})

	it('Equipment: weapon damage is the shared formula', () => {
		const { container } = render(<EquipmentSheet char={char} />)
		const weapon = char.items.weapons[0]
		expect(container.textContent).toContain(
			calculateDamageValue(weapon.damage, 'weapon', char),
		)
	})

	it('Spells: max Focus and spell damage', () => {
		const { container } = render(<SpellsSheet char={char} />)
		expect(printedStat(container, 'Max Focus')).toBe(`${derived.focus.max}`)
		// Spirit d8 / 2 = 4, plus weapon 2 and catalyst 1 once, twice, three times.
		expect(container.textContent).toContain('7/10/13')
	})

	it('a stored document prepared for print derives the same values', () => {
		const prepared = prepareStoredCharacter(createDerivationFixture())
		const fromPrepared = deriveCharacter(prepared)
		expect(fromPrepared.hp).toEqual(derived.hp)
		expect(fromPrepared.load).toEqual(derived.load)
		expect(fromPrepared.parry.total).toBe(derived.parry.total)
		expect(fromPrepared.dodge.total).toBe(derived.dodge.total)
		expect(fromPrepared.resist.total).toBe(derived.resist.total)
		// And the stored ranks are corrected the way the app corrects them.
		expect(
			prepared.skills.skills.find((s) => s.name === 'Mysticism')?.rank,
		).toBe(2)
	})
})

describe('digital stat cards read deriveCharacter', () => {
	const char = createDerivationFixture()
	const derived = deriveCharacter(char)

	const withStore = (ui: React.ReactNode) =>
		render(
			<Provider
				store={createTestStore({
					characterSheet: createInitialState({ activeCharacter: char }),
				})}
			>
				{ui}
			</Provider>,
		)

	it('HP shows current over the effective max', () => {
		withStore(<HpCard />)
		expect(
			screen.getByText(
				`${char.statistics.health.current}/${derived.hp.effectiveMax}`,
			),
		).toBeInTheDocument()
	})

	it.each([
		['AV', <AvCard key="av" />, derived.av.total],
		['Parry', <ParryCard key="parry" />, derived.parry.total],
		['Dodge', <DodgeCard key="dodge" />, derived.dodge.total],
		['Resist', <ResistCard key="resist" />, derived.resist.total],
	])('%s shows the derived total', (label, ui, total) => {
		withStore(ui)
		const button = screen.getByRole('button', { name: `Edit ${label}` })
		expect(within(button).getByText(`${total}`)).toBeInTheDocument()
	})
})

/**
 * A character picked for printing is the stored Firestore document, not the
 * app's Redux copy, so it can predate every migration (owner requirement: the
 * print must be up to date the moment a character is selected). The roster runs
 * `prepareStoredCharacter` on each document, and the sheets derive from that.
 * This stores the fixture the way an old document holds it and checks the
 * print still matches the up-to-date character.
 */
describe('a legacy stored document prints up to date', () => {
	const current = createDerivationFixture()
	const expected = deriveCharacter(current)

	const legacy = () => {
		const stored = JSON.parse(JSON.stringify(current))
		// Item load under the legacy `weight` field.
		stored.items.items = stored.items.items.map(
			({ load, ...item }: { load?: number }) => ({ ...item, weight: load }),
		)
		// HP from before it was derived: a hand-typed total, no modifier.
		stored.statistics.health = {
			total: expected.hp.max,
			current: 20,
			temp: 0,
		}
		// Stale stored skill ranks.
		stored.skills.skills = stored.skills.skills.map(
			(skill: { rank: number }) => ({ ...skill, rank: 0 }),
		)
		return prepareStoredCharacter(stored)
	}

	it('migrates the document on selection', () => {
		const prepared = legacy()
		for (const item of prepared.items.items) {
			expect(item).not.toHaveProperty('weight')
		}
		expect(prepared.statistics.health.maxHpModifier).toBe(
			current.statistics.health.maxHpModifier,
		)
	})

	it('prints the same HP, load and ranks as the current character', () => {
		const prepared = legacy()
		const stats = render(<StatisticsSheet char={prepared} />).container
		expect(printedStat(stats, 'Max')).toBe(`${expected.hp.effectiveMax}`)
		const mysticismRow = Array.from(stats.querySelectorAll('.pc-row')).find(
			(row) => row.textContent?.includes('Mysticism'),
		)
		expect(mysticismRow?.textContent).toMatch(/^2\s*Mysticism\s*6$/)

		const equipment = render(<EquipmentSheet char={prepared} />).container
		expect(printedStat(equipment, 'Load')).toBe(`${expected.load.current}`)
	})
})
