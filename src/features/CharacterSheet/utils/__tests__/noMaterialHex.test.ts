import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

/**
 * No colour literal anywhere the sheet renders (M13 S10).
 *
 * ## Why this is a test and not an audit
 *
 * M9's S1 audited for Material colour and declared the sheet clean, and
 * `getHpBarColor.ts` survived it — the audit was scoped to the files being
 * re-skinned, and that one was not. It put the HP label at **2.36:1** and stayed
 * there until M9's verification pass caught it by measuring instead of reading.
 *
 * A hex literal is the failure mode itself, whatever its value: it cannot track
 * the two themes, so it is right in at most one of them. Everything the sheet
 * draws resolves through a token (`--nexus-*`, `--cs-*`), which is what lets one
 * declaration be correct on parchment and on obsidian.
 *
 * ## The one legal place
 *
 * `createTheme.ts` DEFINES the palette — bronze, parchment, obsidian, reading ink.
 * Those anchors have to be literals; they are what every token ultimately resolves
 * to. It is excluded here by name, deliberately and visibly, rather than by a
 * pattern that would quietly excuse the next file too.
 */
// `src/`, four levels up from this file.
const SRC = path.resolve(__dirname, '../../../..')

/**
 * Everything the character sheet renders, and the shared modules it draws from.
 *
 * `components/codex` is listed FILE BY FILE rather than as a directory, because
 * the sheet imports fourteen of its modules and the rest are docs-page cards it
 * never mounts. Scoping a colour audit to "the files being re-skinned" is exactly
 * how `getHpBarColor.ts` slipped through M9, so the list is explicit and the
 * omissions are visible: `SpellCodexCard.module.css` and the ornament kit's
 * `.module.css` both mix toward `#000`/`#fff`, which breaks the palette rule (mix
 * toward `--ifm-font-color-base` so both themes track) and is a DOCS finding,
 * logged for its own milestone rather than silently swept into this one.
 */
const SCANNED = [
	'features/CharacterSheet',
	'components/codex/CheckMark.tsx',
	'components/codex/CreatureStatBlock.tsx',
	'components/codex/DamageLadder.tsx',
	'components/codex/DamageSigil.tsx',
	'components/codex/DieToken.tsx',
	'components/codex/MagicItemCard.tsx',
	'components/codex/SigilIcon.tsx',
	'components/codex/StatSigil.tsx',
	'components/codex/SuccessLevel.tsx',
	'components/codex/condition-sigils.ts',
	'components/codex/creature-trait-sigils.ts',
	'components/codex/ornaments.tsx',
	'components/codex/sigil-geometry.ts',
	'components/codex/sigil-paths.ts',
	'components/codex/stat-sigils.ts',
	'utils/colors.ts',
	'constants/skills.ts',
]

const walk = (target: string): string[] => {
	const full = path.join(SRC, target)
	if (!fs.existsSync(full)) return []
	if (fs.statSync(full).isFile()) return [full]
	return fs.readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
		const next = path.join(target, entry.name)
		if (entry.isDirectory()) {
			return entry.name === '__tests__' ? [] : walk(next)
		}
		return /\.(tsx?|css)$/.test(entry.name) ? walk(next) : []
	})
}

/**
 * Comments are prose about colour, not colour. `characterSheet.css` names the
 * four surface anchors in its header note explaining what they are.
 */
const stripComments = (source: string): string =>
	source.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ')

const HEX = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/g

describe('no colour literals where the sheet renders', () => {
	it('finds no hex outside the palette definition', () => {
		const offenders = SCANNED.flatMap(walk).flatMap((file) => {
			const matches = stripComments(fs.readFileSync(file, 'utf8')).match(HEX)
			return matches
				? [`${path.relative(SRC, file)}: ${[...new Set(matches)].join(' ')}`]
				: []
		})

		expect(offenders).toEqual([])
	})

	it('scans a real tree', () => {
		// Same floor the icon ledger carries: a scan whose paths have gone stale
		// matches nothing and passes forever.
		expect(SCANNED.flatMap(walk).length).toBeGreaterThan(100)
		// And the named files are really there — a renamed module would otherwise
		// drop out of the audit without a sound.
		for (const target of SCANNED) {
			expect(walk(target).length, target).toBeGreaterThan(0)
		}
	})
})
