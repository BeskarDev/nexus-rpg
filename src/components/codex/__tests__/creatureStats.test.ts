import { describe, expect, it } from 'vitest'

import { armorAbbr, splitAv, splitHp } from '../creatureStats'

describe('armorAbbr', () => {
	it('abbreviates worn armor', () => {
		expect(armorAbbr('light armor')).toBe('L')
		expect(armorAbbr('heavy armor')).toBe('H')
	})

	it('abbreviates natural armor separately from worn', () => {
		expect(armorAbbr('natural light')).toBe('NL')
		expect(armorAbbr('natural heavy')).toBe('NH')
	})

	it('appends +S when a shield contributes', () => {
		expect(armorAbbr('light armor and shield')).toBe('L+S')
		expect(armorAbbr('heavy armor and shield')).toBe('H+S')
		expect(armorAbbr('natural light and shield')).toBe('NL+S')
		expect(armorAbbr('natural heavy and shield')).toBe('NH+S')
	})

	it('ignores case and surrounding space', () => {
		expect(armorAbbr('  Light Armor And Shield ')).toBe('L+S')
	})

	it('returns an unrecognised note verbatim rather than guessing', () => {
		expect(armorAbbr('none')).toBe('none')
		expect(armorAbbr('chitin plate')).toBe('chitin plate')
		expect(armorAbbr('chitin plate and shield')).toBe('chitin plate and shield')
	})
})

describe('splitAv', () => {
	it('splits the numeral from its parenthetical', () => {
		expect(splitAv('3 (light armor and shield)')).toEqual({
			value: '3',
			note: 'light armor and shield',
		})
	})

	it('leaves a bare value alone', () => {
		expect(splitAv('5')).toEqual({ value: '5' })
	})
})

describe('splitHp', () => {
	it('splits life pools from pool size', () => {
		expect(splitHp('3x100')).toEqual({ value: '100', pools: 3 })
		expect(splitHp('2×40')).toEqual({ value: '40', pools: 2 })
	})

	it('treats a single pool as one', () => {
		expect(splitHp('20')).toEqual({ value: '20', pools: 1 })
	})
})
