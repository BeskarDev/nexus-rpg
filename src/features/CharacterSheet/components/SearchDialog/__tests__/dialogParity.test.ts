import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * The nine search dialogs stay aligned (M13 S8b, F11.6).
 *
 * F11 found the drift the shared component invites but cannot enforce: one of
 * nine callers set `defaultSort`, so four dialogs still opened in JSON authoring
 * order — the exact defect the owner reported for spells during S8, fixed only for
 * the dialog that was reported. Seven filter facets were seven hand-built `Select`
 * trees, which is why `displayEmpty` was missing from all of them until the
 * running app showed seven blank boxes.
 *
 * A source-text test is a blunt instrument and it is the right one here: the thing
 * being protected is that nine FILES agree, which no runtime assertion about one
 * component can see. It reads the callers rather than rendering them, so it stays
 * fast and it fails on the day a tenth dialog is added without the shared pieces.
 */

const ROOT = path.resolve(__dirname, '../../../..')

/** Every dialog that puts rulebook content in front of a player. */
const DIALOGS = [
	'CharacterSheet/CharacterSheetTabs/01_Skills/CombatArtsSearchDialog.tsx',
	'CharacterSheet/CharacterSheetTabs/02_Items/SearchDialog/TalentsSearchDialog.tsx',
	'CharacterSheet/CharacterSheetTabs/02_Items/SearchDialog/EquipmentSearchDialog.tsx',
	'CharacterSheet/CharacterSheetTabs/02_Items/SearchDialog/WeaponSearchDialog.tsx',
	'CharacterSheet/CharacterSheetTabs/03_Spells/SpellsSearchDialog.tsx',
	'CharacterSheet/components/FolkSelectionDialog.tsx',
	'CharacterSheet/components/UpbringingSelectionDialog.tsx',
	'CharacterSheet/components/BackgroundSelectionDialog.tsx',
	'CharacterSheet/components/ArchetypeSelectionDialog.tsx',
]

/** The five that import rulebook content onto the sheet, as opposed to picking one. */
const IMPORT_DIALOGS = DIALOGS.slice(0, 5)

const read = (relative: string) =>
	fs.readFileSync(path.join(ROOT, relative), 'utf8')

const offenders = (files: string[], predicate: (source: string) => boolean) =>
	files.filter((file) => !predicate(read(file))).map((f) => path.basename(f))

describe('search dialog parity', () => {
	it('every dialog opens in a decided order, not the JSON’s', () => {
		expect(offenders(DIALOGS, (s) => s.includes('defaultSort'))).toEqual([])
	})

	it('every import dialog answers for the character it was opened from', () => {
		// F11.2: all five declared `character` and never read it.
		expect(offenders(IMPORT_DIALOGS, (s) => s.includes('getStanding'))).toEqual(
			[],
		)
	})

	it('every import dialog can show the whole of an entry', () => {
		// F11.1: the deciding fact was a three-line clamp with no way past it.
		expect(
			offenders(IMPORT_DIALOGS, (s) => s.includes('renderDetails')),
		).toEqual([])
	})

	it('no dialog hand-builds a filter facet any more', () => {
		// Seven copies of `FormControl` + `Select` + `MenuItem`, and a fix to one was
		// six files out of date. Anything with filters uses `FilterSelect`.
		const handBuilt = DIALOGS.filter((file) => {
			const source = read(file)
			return source.includes('<Select') || source.includes('<ListItemText')
		}).map((f) => path.basename(f))

		expect(handBuilt).toEqual([])
	})

	it('every dialog with filters can clear them', () => {
		// Talents was the one with a facet and no way out of it (F11.6).
		const withFilters = DIALOGS.filter((file) =>
			read(file).includes('<FilterSelect'),
		)
		expect(offenders(withFilters, (s) => s.includes('Clear filters'))).toEqual(
			[],
		)
	})

	it('no dialog puts a raw content string into the DOM', () => {
		// The owner found this rendering on screen: `{item.description}` prints the
		// JSON verbatim, React escapes it, and a `<br/>` in the source becomes the
		// literal characters `<br/>` mid-sentence. Every content string has to pass
		// through `entrySummary` (flattened) or `EntryProse` (parsed) first.
		//
		// The lookbehind matters. `source={talent.description}` is the string going
		// INTO a parser and is correct; `${item.properties}` is string building.
		// Only a bare JSX child is the defect.
		const RAW =
			/(?<![=$])\{(?:item|weapon|spell|talent|art|combatArt)\.(?:description|effect|properties)\}/
		const leaking = DIALOGS.filter((file) => RAW.test(read(file))).map((f) =>
			path.basename(f),
		)

		expect(leaking).toEqual([])
	})

	it('no row cell preserves newlines it cannot afford', () => {
		// The clamp was never the bug — Combat Arts clamps `weapons` ("Axe, Mace")
		// and Folk clamps `quote`, both short and markup-free, and both are fine. The
		// bug was `white-space: pre-line` on a CLAMPED cell: `sanitizeHtml` turns
		// every `<br/>` into a newline, so a talent's rank breaks spent one or two of
		// the three visible lines on blank space.
		//
		// A first version of this test banned every clamp instead, which is the
		// mistake in the other direction: it would have failed two legitimate cells
		// while the actual defect — Equipment's raw two-line cell — was caught by the
		// assertion above rather than by this one.
		const preserving = DIALOGS.filter((file) =>
			read(file).includes("whiteSpace: 'pre-line'"),
		).map((f) => path.basename(f))

		expect(preserving).toEqual([])
	})
})
