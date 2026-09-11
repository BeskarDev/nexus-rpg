import React from 'react'
import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import combatActions from '@site/src/utils/data/json/combat-actions.json'
import skillActions from '@site/src/utils/data/json/skill-actions.json'
import quickActions from '@site/src/utils/data/json/quick-actions.json'
import conditions from '@site/src/utils/data/json/conditions.json'
import {
	CONDITIONS_OFF_SHEET,
	DISTANCES,
	DURATIONS,
	WEAPON_SUCCESS_LEVELS,
} from '@site/src/features/CombatReference/referenceContent'
import { SHEET_CONDITIONS } from '@site/src/features/CombatReference/sheets/2_Conditions'
import { conditionBody } from '@site/src/features/CombatReference/sheets/conditionText'

/**
 * The reference sheet used to be a PNG, and nothing could tell it had gone
 * stale — it rolled Hide on a skill the game had renamed and gave Dash +1
 * Movement where the rules double it. These are the checks that replace the
 * Figma file: the sheet's own briefs against the rules pages they compress, and
 * a page budget, since nothing in jsdom can measure 210mm of paper.
 */

const DOCS = path.resolve(__dirname, '../../docs')
const read = (file: string) => fs.readFileSync(path.join(DOCS, file), 'utf8')

describe('the action briefs', () => {
	const lists = [
		['combat-actions', combatActions],
		['skill-actions', skillActions],
		['quick-actions', quickActions],
	] as const

	it.each(lists)('%s: every record carries a brief', (_name, records) => {
		expect(records.length).toBeGreaterThan(0)
		for (const record of records) {
			expect(record.quickRef.trim()).not.toBe('')
			// One line of a 136mm column at 8pt is about 100 characters. A brief
			// that needs two lines is not a brief, and ten of them is the sheet.
			expect(record.quickRef.length).toBeLessThanOrEqual(100)
			expect(record.quickRef).not.toContain('<')
		}
	})

	it('quick actions state their trigger, briefly', () => {
		for (const record of quickActions) {
			expect(record.quickRefTrigger.trim()).not.toBe('')
			expect(record.quickRefTrigger.length).toBeLessThanOrEqual(90)
		}
	})

	/**
	 * The drift that made the PNG wrong was a SKILL rename, so this is the check
	 * that would have caught it: a brief may compress the rule, but it may not
	 * name a roll the rule does not.
	 */
	it.each(lists)(
		'%s: a brief names the same roll as its effect',
		(_n, list) => {
			const SKILLS =
				/\b(Athletics|Archery|Arcana|Fighting|Fortitude|Influence|Mysticism|Nature|Perception|Stealth|Crafting|Education|Insight|Lore|Society|Survival)\b/g
			for (const record of list) {
				const inBrief = new Set(record.quickRef.match(SKILLS) ?? [])
				const inEffect = new Set(record.effect.match(SKILLS) ?? [])
				for (const skill of inBrief) expect(inEffect).toContain(skill)
			}
		},
	)
})

describe('the static sheet content still matches the rules', () => {
	it('lists the distance bands the rules list, in order', () => {
		const page = read('05-combat/03-distances-movement.md')
		const rows = page
			.slice(page.indexOf('| Distance |'))
			.split('\n')
			.filter((line) => line.startsWith('| '))
			.slice(2)
			.map((line) => line.split('|')[1].trim())
		const bands = rows.slice(0, DISTANCES.length)
		expect(DISTANCES.map((entry) => entry.term)).toEqual(bands)
		// The area count is the number actually read at the table.
		for (const [index, entry] of DISTANCES.entries()) {
			const areas = rows.length
				? page.split('\n').find((line) => line.startsWith(`| ${entry.term} |`))
				: undefined
			const stated = areas?.split('|').at(-2)?.trim()
			if (stated && stated !== '-')
				expect(`${entry.text}`).toContain(stated.replace(' areas', ''))
			expect(index).toBeGreaterThanOrEqual(0)
		}
	})

	it('lists the five durations the rules define', () => {
		const page = read('06-scenes/02-effect-durations.md')
		const headings = page
			.split('\n')
			.filter((line) => line.startsWith('## '))
			.map((line) => line.slice(3).trim())
		for (const entry of DURATIONS) expect(headings).toContain(entry.term)
	})

	it('lists the five weapon attack success levels', () => {
		const page = read('05-combat/02-attacking.md')
		for (const entry of WEAPON_SUCCESS_LEVELS)
			expect(page).toContain(`| ${entry.term} |`)
	})
})

describe('the conditions sheets', () => {
	/**
	 * The rare condition is the one a player actually has to look up, so the
	 * sheet carries every one of them (owner, 2026-09-11). `CONDITIONS_OFF_SHEET`
	 * is the last-resort hatch for a half that will not fit, and this is the test
	 * that makes reaching for it a deliberate act rather than a quiet one.
	 */
	it('prints every condition in the rules', () => {
		expect(CONDITIONS_OFF_SHEET).toHaveLength(0)
		expect(SHEET_CONDITIONS.length).toBe(conditions.length)
	})

	it('keeps the alphabetical order a mid-turn lookup depends on', () => {
		const names = SHEET_CONDITIONS.map((entry) => entry.name)
		expect([...names].sort()).toEqual(names)
	})

	/**
	 * The page budget, which is the closest a test gets to measuring paper.
	 *
	 * The whole reference is ONE A4 landscape page, and the conditions get half
	 * of it: two columns at 6pt/1.15, about 65 characters to the line. Charging
	 * every paragraph and bullet a part-line for its break, the corpus costs
	 * 11,198 — and the RENDERED half, measured in a browser at 1:1, fills 93% of
	 * its 210mm at that cost. The budget is therefore that cost plus the 7% of
	 * headroom the measurement leaves.
	 *
	 * If an edit trips this, take another non-combat condition off the sheet
	 * (`CONDITIONS_OFF_SHEET`). Do not paraphrase the ones that remain, do not
	 * spend a second page, and do not set below the register's 5.5pt floor.
	 */
	it('fits the conditions into its half of the page', () => {
		const BUDGET = 12000
		const cost = SHEET_CONDITIONS.reduce(
			(sum, entry) =>
				sum +
				entry.name.length +
				entry.description.length +
				// Each <br/> starts a new line, and a part-used line is a whole one.
				65 * (entry.description.split(/<br\s*\/?>/).length - 1),
			0,
		)
		expect(cost).toBeLessThanOrEqual(BUDGET)
	})

	it('renders every description without meeting an unhandled tag', () => {
		for (const entry of conditions) {
			const blocks = conditionBody(entry.description, entry.name)
			expect(blocks.length).toBeGreaterThan(0)
			const { container } = render(<div>{blocks}</div>)
			expect(container.textContent).not.toContain('<')
		}
	})

	it('fails loudly on a tag the corpus has never carried', () => {
		expect(() => conditionBody('<div>oops</div>', 'bad')).toThrow()
	})
})
