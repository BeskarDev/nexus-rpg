import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { theme } from '@site/src/hooks/createTheme'

/**
 * The interactive-floor contract (M13 S3.5).
 *
 * ## What this test is, and what it deliberately is not
 *
 * F8 measured the sheet in a real browser and found 58% of the Items tab's
 * controls under WCAG 2.2 SC 2.5.8's 24x24 minimum. The obvious guard against
 * that returning is to measure again in a test — and it cannot be written here,
 * because **jsdom has no layout engine**: `getBoundingClientRect()` returns zeros
 * for everything, so a pixel assertion would pass forever regardless of the CSS.
 * Writing one would be worse than writing none, because it would look like cover.
 *
 * So this asserts the *mechanism* instead: that the floor is declared, that it
 * steps up for touch, and that the components which carry the sheet's controls
 * are wired to it. That catches the realistic regression — someone deleting or
 * overriding a `minHeight` while tidying — and it does not catch a control that
 * finds a new way to be small. **The browser re-measure in the S3.5 checklist is
 * the real verification and this does not replace it.**
 */

const repoRoot = join(__dirname, '../../../..')
const customCss = readFileSync(join(repoRoot, 'src/css/custom.css'), 'utf8')
const sheetCss = readFileSync(
	join(repoRoot, 'src/features/CharacterSheet/characterSheet.css'),
	'utf8',
)

describe('the interactive floor is declared', () => {
	it('defines --nexus-target at the WCAG AA minimum', () => {
		expect(customCss).toMatch(/--nexus-target:\s*24px/)
	})

	it('does NOT step the floor up for touch pointers', () => {
		// S3.5 stepped the token to 44px under `pointer: coarse`; S4d removed that
		// (owner call). The step grew the header control strips, the field heights
		// and the gap between a pip row's sigils, so the same tab read as a looser
		// design on a phone than on a laptop. 24px meets SC 2.5.8 AA on every
		// pointer; a touch complaint gets solved per-control from here.
		expect(customCss).not.toMatch(/@media \(pointer: coarse\)/)
	})
})

describe('the sheet’s controls are wired to the floor', () => {
	const overrides = theme.components as Record<
		string,
		{ styleOverrides?: Record<string, Record<string, unknown>> }
	>

	it.each([
		['MuiIconButton', 'root', 'minHeight'],
		['MuiIconButton', 'root', 'minWidth'],
		['MuiCheckbox', 'root', 'minHeight'],
		['MuiCheckbox', 'root', 'minWidth'],
		['MuiButton', 'root', 'minHeight'],
		['MuiInputBase', 'root', 'minHeight'],
	])('%s %s.%s reads the floor token', (component, slot, prop) => {
		expect(overrides[component]?.styleOverrides?.[slot]?.[prop]).toBe(
			'var(--nexus-target)',
		)
	})

	it('sizes MarkButton from the token rather than a literal', () => {
		const block = sheetCss.slice(sheetCss.indexOf('.cs-mark-button'))
		expect(block).toMatch(/width:\s*var\(--nexus-target\)/)
		expect(block).toMatch(/height:\s*var\(--nexus-target\)/)
	})

	it('does not shrink a field below the floor for the "small" size', () => {
		// `small` is a TYPE step. It shrank the box everywhere it was used, which
		// is how 173 call sites each took a little off the target.
		const variants = (
			overrides.MuiInputBase as unknown as {
				variants?: { style?: Record<string, unknown> }[]
			}
		).variants
		const smallStyle = JSON.stringify(variants?.[0]?.style ?? {})
		expect(smallStyle).not.toMatch(/height/i)
	})
})

describe('type comes from the scale, not from literals', () => {
	it('has no hardcoded sub-body rem font sizes left in the sheet', () => {
		const files: string[] = []
		const walk = (dir: string) => {
			for (const e of readdirSync(join(repoRoot, dir), {
				withFileTypes: true,
			})) {
				if (e.isDirectory()) walk(join(dir, e.name))
				else if (e.name.endsWith('.tsx')) files.push(join(dir, e.name))
			}
		}
		walk('src/features/CharacterSheet')

		const offenders: string[] = []
		for (const rel of files) {
			const src = readFileSync(join(repoRoot, rel), 'utf8')
			for (const [i, line] of src.split('\n').entries()) {
				// Comments are exempt: several document the literals they replaced.
				if (/^\s*(\*|\/\/)/.test(line)) continue
				if (/fontSize:\s*'0\.\d+rem'/.test(line)) {
					offenders.push(`${rel}:${i + 1}`)
				}
			}
		}
		expect(offenders).toEqual([])
	})
})
