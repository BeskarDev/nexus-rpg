import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { MATERIAL_ICON_LEDGER } from '../materialIconLedger'

/**
 * The gate on the icon ledger (M13 S9).
 *
 * M9 logged three Material icons in a component docblock and called that the
 * acceptable outcome. It was — for those three. What it could not do is stop the
 * next five from arriving unlogged, which is exactly what M13 found. Prose cannot
 * be checked; this can.
 *
 * Both directions matter. An unlisted icon is a decision nobody made. A listed
 * icon that is gone is a reason drifting away from the code, which is how a
 * ledger becomes fiction.
 */
const SHEET_ROOT = path.resolve(__dirname, '../..')

/**
 * The account panel renders INSIDE the sheet's masthead but lives in
 * `src/components` (M13 S13), so the ledger has to see it too — otherwise the two
 * files that draw the header's own menu are the one place an unlogged icon can
 * still arrive.
 */
const ALSO_SCANNED = [
	path.resolve(SHEET_ROOT, '../../components/UserMenu.tsx'),
	path.resolve(SHEET_ROOT, '../../components/LoginComponent.tsx'),
]

const walk = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name)
		if (entry.isDirectory()) {
			return entry.name === '__tests__' ? [] : walk(full)
		}
		return /\.tsx?$/.test(entry.name) ? [full] : []
	})

/** Every `@mui/icons-material` name the sheet imports, with where it came from. */
const importedIcons = (): Map<string, string[]> => {
	const found = new Map<string, string[]>()
	const record = (name: string, file: string) => {
		const sites = found.get(name) ?? []
		sites.push(path.relative(SHEET_ROOT, file))
		found.set(name, sites)
	}
	for (const file of [...walk(SHEET_ROOT), ...ALSO_SCANNED]) {
		const source = fs.readFileSync(file, 'utf8')
		for (const match of source.matchAll(
			/import\s+\{([^}]*)\}\s+from\s+'@mui\/icons-material'/g,
		)) {
			for (const raw of match[1].split(',')) {
				// `Person as PersonIcon` — the ledger keys on the ICON, not the local
				// alias, or one file renaming its imports would hide them all.
				const name = raw.split(/\sas\s/)[0].trim()
				if (name) record(name, file)
			}
		}
		for (const match of source.matchAll(
			/import\s+\w+\s+from\s+'@mui\/icons-material\/(\w+)'/g,
		)) {
			record(match[1], file)
		}
	}
	return found
}

describe('Material icon ledger', () => {
	it('lists every Material icon the sheet imports', () => {
		const unlogged = [...importedIcons().entries()]
			.filter(([name]) => !(name in MATERIAL_ICON_LEDGER))
			.map(([name, sites]) => `${name} (${sites.join(', ')})`)

		expect(unlogged).toEqual([])
	})

	it('lists nothing the sheet has stopped importing', () => {
		const used = importedIcons()
		const stale = Object.keys(MATERIAL_ICON_LEDGER).filter(
			(name) => !used.has(name),
		)

		expect(stale).toEqual([])
	})

	it('scans a real tree, so neither assertion can pass on an empty set', () => {
		// The failure mode both tests above share: a path that has gone stale
		// matches nothing and reports success forever (the lesson of the S8c
		// grid-parity test).
		const used = importedIcons()
		expect(used.size).toBeGreaterThanOrEqual(15)
		expect(walk(SHEET_ROOT).length).toBeGreaterThan(100)
		// The two named files really exist, so a rename cannot drop them silently.
		for (const file of ALSO_SCANNED) expect(fs.existsSync(file)).toBe(true)
	})

	it('gives every entry a verb and a reason', () => {
		const thin = Object.entries(MATERIAL_ICON_LEDGER)
			.filter(([, entry]) => entry.verb.length < 3 || entry.why.length < 20)
			.map(([name]) => name)

		expect(thin).toEqual([])
	})
})
