import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { parseSpellEffect } from '@site/src/utils/content-gen/spell-effect-parser'

const JSON_FILE = path.resolve(__dirname, '../../src/utils/data/json/combat-arts.json')

interface CombatArt {
	name: string
	category: string
	weapons: string
	effect: string
}

const arts: CombatArt[] = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))

const CATEGORIES = new Set(['Basic', 'Supreme'])

describe('combat arts content generation', () => {
	it('has a well-formed record for every combat art', () => {
		expect(arts.length).toBeGreaterThan(0)
		for (const a of arts) {
			for (const field of ['name', 'category', 'weapons', 'effect'] as const) {
				expect(typeof a[field]).toBe('string')
				expect(a[field].trim()).not.toBe('')
			}
			// An unknown category would silently drop the art from every page.
			expect(CATEGORIES.has(a.category)).toBe(true)
		}
	})

	it('parses every combat art effect without throwing (fail-loud corpus guard)', () => {
		for (const a of arts) {
			const parsed = parseSpellEffect(a.effect, a.name, { allowPartialRuns: true })
			expect(parsed.nodes.length).toBeGreaterThan(0)
		}
	})

	it('allows a partial success run, which combat arts legitimately use', () => {
		// The prose above the run is the base case that lands on any hit, so a run
		// may start at strong (see Deep Cut). Spells must still use all three.
		const effect =
			'Inflict bleeding.<br/><strong>Strong.</strong> Rolls to end it are hard.' +
			'<br/><strong>Critical.</strong> Rolls to end it are very hard.'
		expect(() => parseSpellEffect(effect, 'Deep Cut', { allowPartialRuns: true })).not.toThrow()
		expect(() => parseSpellEffect(effect, 'Deep Cut')).toThrow(/weak→strong→critical/)
	})

	it('still rejects a scrambled or duplicated success run', () => {
		const scrambled =
			'<strong>Critical.</strong> a<br/><strong>Weak.</strong> b'
		const duplicated = '<strong>Weak.</strong> a<br/><strong>Weak.</strong> b'
		for (const bad of [scrambled, duplicated]) {
			expect(() => parseSpellEffect(bad, 'Bad', { allowPartialRuns: true })).toThrow(
				/must ascend/,
			)
		}
	})
})
