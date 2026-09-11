import { describe, expect, it } from 'vitest'
import { buildSpellFromData } from '../spellFactory'

const base = {
	name: 'Test Spell',
	rank: '2',
	focus: '1',
	target: 'vs. Dodge',
	range: 'Medium',
	properties: '-',
	effect: 'It does a thing.',
}

/**
 * The import path reads the authored block and nothing else. Before M19 it read
 * the effect text, which flagged every transformation that granted a damage
 * bonus (*Law of the Strongest*) and missed every attack spell that stated its
 * damage without a verb (*Knife Behind the Mask*).
 */
describe('buildSpellFromData', () => {
	it('carries an authored scaling block onto the sheet', () => {
		const spell = buildSpellFromData(
			{ ...base, damage: { type: 'fire', weak: 2, strong: 4, critical: 6 } },
			'Arcana',
		)

		expect(spell.dealsDamage).toBe(true)
		expect(spell.damage).toMatchObject({
			base: 'MND',
			weapon: 2,
			type: 'fire',
			staticDamage: false,
		})
	})

	it('scales a mystic spell off Spirit', () => {
		const spell = buildSpellFromData(
			{ ...base, damage: { type: 'radiant', weak: 3, strong: 6, critical: 9 } },
			'Mysticism',
		)

		expect(spell.damage.base).toBe('SPI')
	})

	it('deals no damage when no block is authored', () => {
		const spell = buildSpellFromData(
			{
				...base,
				effect:
					'They grow one Size larger. - You deal +2 damage with Strength-based attacks.',
			},
			'Arcana',
		)

		expect(spell.dealsDamage).toBe(false)
		expect(spell.damage).toMatchObject({ base: '', weapon: 0, other: 0 })
	})
})
