import { describe, expect, it } from 'vitest'
import {
	spellDamageToSheetDamage,
	validateSpellDamage,
} from '../../typescript/spellDamage'
import { checkSpellDamage, damageClaimsFromEffect } from '../spell-damage-check'

const effect = (body: string) => body

describe('validateSpellDamage', () => {
	it('accepts a scaling block', () => {
		expect(
			validateSpellDamage(
				{ type: 'fire', weak: 2, strong: 4, critical: 6 },
				'x',
			),
		).toEqual({ type: 'fire', weak: 2, strong: 4, critical: 6 })
	})

	it('accepts a flat block', () => {
		expect(validateSpellDamage({ type: 'psychic', flat: 10 }, 'x')).toEqual({
			type: 'psychic',
			flat: 10,
		})
	})

	it('rejects a half-stated scaling block', () => {
		expect(() =>
			validateSpellDamage({ type: 'fire', weak: 2, strong: 4 }, 'x'),
		).toThrow(/needs all of weak\/strong\/critical/)
	})

	it('rejects mixing the two shapes', () => {
		expect(() =>
			validateSpellDamage(
				{ type: 'fire', flat: 4, weak: 2, strong: 4, critical: 6 },
				'x',
			),
		).toThrow(/pick one shape/)
	})

	it('rejects a damage type the rules do not publish', () => {
		expect(() =>
			validateSpellDamage(
				{ type: 'sonic', weak: 1, strong: 2, critical: 3 },
				'x',
			),
		).toThrow(/damage.type must be one of/)
	})

	it('rejects an unknown field, so a typo cannot sit silently', () => {
		expect(() =>
			validateSpellDamage(
				{ type: 'fire', weak: 2, strong: 4, critical: 6, attribut: true },
				'x',
			),
		).toThrow(/unknown field "attribut"/)
	})
})

describe('spellDamageToSheetDamage', () => {
	it('maps X/2X/3X onto the weapon field, so the catalyst scales with it', () => {
		expect(
			spellDamageToSheetDamage(
				{ type: 'fire', weak: 2, strong: 4, critical: 6 },
				'Arcana',
			),
		).toMatchObject({ base: 'MND', weapon: 2, otherWeak: 0, type: 'fire' })
	})

	it('carries a non-proportional triple per level', () => {
		expect(
			spellDamageToSheetDamage(
				{ type: 'necrotic', weak: 0, strong: 4, critical: 8 },
				'Mysticism',
			),
		).toMatchObject({
			base: 'SPI',
			weapon: 0,
			otherWeak: 0,
			otherStrong: 4,
			otherCritical: 8,
		})
	})

	it('makes flat damage static and attribute-free by default', () => {
		expect(
			spellDamageToSheetDamage({ type: 'psychic', flat: 10 }, 'Arcana'),
		).toMatchObject({ base: '', other: 10, staticDamage: true })
	})

	it('honours an explicit attribute override', () => {
		expect(
			spellDamageToSheetDamage(
				{ type: 'fire', weak: 2, strong: 4, critical: 6, attribute: false },
				'Arcana',
			).base,
		).toBe('')
	})
})

describe('damageClaimsFromEffect', () => {
	it('reads the number through an AV parenthetical', () => {
		const claims = damageClaimsFromEffect(
			effect(
				'Blast them.<br/><strong>Weak.</strong> Deal +2 blast (ignore 1/2 AV) damage.' +
					'<br/><strong>Strong.</strong> Deal +4 blast damage.' +
					'<br/><strong>Critical.</strong> Deal +6 blast damage.',
			),
			'test',
		)
		expect(claims.levels.weak).toEqual([2])
	})

	it('keeps prose damage out of the success levels', () => {
		const claims = damageClaimsFromEffect(
			effect('They take 10 psychic damage when the door is blocked.'),
			'test',
		)
		expect(claims.prose).toEqual([10])
		expect(claims.levels.weak).toEqual([])
	})

	it('counts the success-level runs a mode list has', () => {
		const claims = damageClaimsFromEffect(
			effect(
				'Choose one.<br/><strong>Weak.</strong> Deal +4 force damage.' +
					'<br/><strong>Strong.</strong> Deal +8 force damage.' +
					'<br/><strong>Critical.</strong> Deal +12 force damage.' +
					'<br/>Slam.<br/><strong>Weak.</strong> Deal +6 force damage.' +
					'<br/><strong>Strong.</strong> Deal +12 force damage.' +
					'<br/><strong>Critical.</strong> Deal +18 force damage.',
			),
			'test',
		)
		expect(claims.successRuns).toBe(2)
	})
})

describe('checkSpellDamage', () => {
	const spell = (effectText: string, damage?: unknown) => ({
		name: 'Test Spell',
		effect: effectText,
		damage,
		magicType: 'Arcana' as const,
	})

	const full =
		'<strong>Weak.</strong> Deal +2 fire damage.' +
		'<br/><strong>Strong.</strong> Deal +4 fire damage.' +
		'<br/><strong>Critical.</strong> Deal +6 fire damage.'

	it('passes when block and text agree', () => {
		expect(
			checkSpellDamage(
				spell(full, { type: 'fire', weak: 2, strong: 4, critical: 6 }),
				'test',
			),
		).toEqual([])
	})

	it('fails a spell that states success-level damage with no block', () => {
		expect(checkSpellDamage(spell(full), 'test')[0]).toMatch(
			/no "damage" block/,
		)
	})

	it('fails a number that disagrees with its clause', () => {
		expect(
			checkSpellDamage(
				spell(full, { type: 'fire', weak: 3, strong: 4, critical: 6 }),
				'test',
			)[0],
		).toMatch(/damage.weak is 3, but the weak clause states 2/)
	})

	it('fails a type that disagrees with the clause', () => {
		expect(
			checkSpellDamage(
				spell(full, { type: 'frost', weak: 2, strong: 4, critical: 6 }),
				'test',
			)[0],
		).toMatch(/damage.type is "frost", but the effect says "fire"/)
	})

	it('fails a block on a spell whose text never mentions damage', () => {
		expect(
			checkSpellDamage(
				spell('You conjure a light.', {
					type: 'fire',
					weak: 2,
					strong: 4,
					critical: 6,
				}),
				'test',
			)[0],
		).toMatch(/never mentions damage/)
	})

	it('leaves a damage bonus granted to attacks alone', () => {
		expect(
			checkSpellDamage(
				spell('They grow larger. - You deal +2 damage with Strength attacks.'),
				'test',
			),
		).toEqual([])
	})

	it('does not force a block on a spell with several mode runs', () => {
		const modes =
			full +
			'<br/>Slam.<br/><strong>Weak.</strong> Deal +6 fire damage.' +
			'<br/><strong>Strong.</strong> Deal +12 fire damage.' +
			'<br/><strong>Critical.</strong> Deal +18 fire damage.'
		expect(checkSpellDamage(spell(modes), 'test')).toEqual([])
	})

	it('accepts a scaling block stated as a prose triple', () => {
		expect(
			checkSpellDamage(
				spell('On a hit, each target takes +2/4/6 force damage.', {
					type: 'force',
					weak: 2,
					strong: 4,
					critical: 6,
				}),
				'test',
			),
		).toEqual([])
	})

	it('reads "N weapon damage" as the 1/2/3 scale it means', () => {
		expect(
			checkSpellDamage(
				spell(
					'On a hit, the object deals 2 weapon damage in addition to your spell base damage.',
					{ type: 'physical', weak: 2, strong: 4, critical: 6 },
				),
				'test',
			),
		).toEqual([])
	})

	it('fails a scaling block the prose triple contradicts', () => {
		expect(
			checkSpellDamage(
				spell('On a hit, each target takes +2/4/6 force damage.', {
					type: 'force',
					weak: 3,
					strong: 6,
					critical: 9,
				}),
				'test',
			)[0],
		).toMatch(/matches neither a success-level clause nor a scaling triple/)
	})

	it('fails a flat number the text never states', () => {
		expect(
			checkSpellDamage(
				spell('They take 10 psychic damage.', { type: 'psychic', flat: 8 }),
				'test',
			)[0],
		).toMatch(/appears nowhere in the effect text/)
	})

	it('accepts a partial run, where one level deals nothing', () => {
		expect(
			checkSpellDamage(
				spell(
					'<strong>Weak.</strong> You nullify the spell.' +
						'<br/><strong>Strong.</strong> Deal +2 psychic damage.' +
						'<br/><strong>Critical.</strong> Deal +4 psychic damage.',
					{ type: 'psychic', weak: 0, strong: 2, critical: 4 },
				),
				'test',
			),
		).toEqual([])
	})
})
