import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * A gridded row needs BOTH halves, and missing one fails silently (M13 S8c).
 *
 * `.cs-ledger-cols .cs-ledger-row-grid` sets `display: grid` and nothing else —
 * the column template comes from the row's own `summarySx`. Pass the class without
 * the template and you get a **single-column grid**, which stacks every cell
 * vertically while the column header above it, which carries its template inline,
 * grids correctly. That is exactly what shipped on the ability rows: `tsc` was
 * clean, all 396 tests passed, and the tab was unusable.
 *
 * Nothing in the type system connects the two, so this connects them.
 */

const ROOT = path.resolve(__dirname, '..')

/** Every row component that opts into the ledger grid. */
const ROWS = [
	'CharacterSheetTabs/01_Skills/AbilityRow.tsx',
	'CharacterSheetTabs/02_Items/ItemRow.tsx',
	'CharacterSheetTabs/02_Items/WeaponRow.tsx',
	'CharacterSheetTabs/03_Spells/SpellRow.tsx',
]

const read = (relative: string) => {
	const full = path.join(ROOT, relative)
	return fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null
}

describe('ledger grid parity', () => {
	it('every row asking for the grid also supplies its columns', () => {
		const broken = ROWS.filter((file) => {
			const source = read(file)
			if (source === null) return false // row moved or renamed; not this test's job
			if (!source.includes('cs-ledger-row-grid')) return false
			return !source.includes('gridTemplateColumns')
		})

		expect(broken).toEqual([])
	})

	it('finds the rows it claims to check', () => {
		// Guards the filter above from passing because every path is wrong.
		const present = ROWS.filter((file) => read(file) !== null)
		expect(present.length).toBeGreaterThanOrEqual(2)
		expect(
			present.filter((file) => read(file)!.includes('cs-ledger-row-grid'))
				.length,
		).toBeGreaterThanOrEqual(2)
	})
})
