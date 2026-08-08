import { describe, it, expect } from 'vitest'
import { getBaseDamageType } from '../weaponDamage'
import { baseItems } from '../magicItemsConfig'
import weaponsData from '../../../../../../utils/data/json/weapons.json'
import { baseDamageTypeArray } from '../../../../../../types/Character'

type WeaponRecord = { name: string; type: string; properties: string }

/**
 * Every weapon the tools can hand a character, and the attribute its damage is
 * based on.
 *
 * The defect this pins: the Magic Item Builder wrote a hardcoded `''`, so every
 * weapon it ever made landed with no base attribute. Asserting the whole table
 * rather than a sample, because the fault was per-weapon and a spot check would
 * have missed the Cleaver that found it.
 */
describe('getBaseDamageType', () => {
	const weapons = weaponsData as WeaponRecord[]

	it('gives Agility to bows, crossbows and thrown weapons', () => {
		const ranged = weapons
			.filter((weapon) => getBaseDamageType(weapon.type) === 'AGI')
			.map((weapon) => weapon.name)

		expect(ranged.sort()).toEqual(
			[
				'Shortbow',
				'Longbow',
				'Warbow',
				'Light Crossbow',
				'Heavy Crossbow',
				'Blowpipe',
				'Bola',
				'Spear Thrower',
				'Sling',
			].sort(),
		)
	})

	it('gives Strength to every other weapon in the table', () => {
		for (const weapon of weapons) {
			if (['Bow', 'Crossbow', 'Thrown'].includes(weapon.type)) continue
			expect(getBaseDamageType(weapon.type), weapon.name).toBe('STR')
		}
	})

	it('does not let `agile` or `thrown` move the base off the rules default', () => {
		/*
			Both properties grant an OPTION the player exercises per attack — "you CAN
			roll attacks with Agility instead of Strength" — they do not restate what
			the weapon's base is. The Cleaver that surfaced this is an appearance of the
			Hatchet, which is `agile, light, slash`.
		*/
		const hatchet = weapons.find((weapon) => weapon.name === 'Hatchet')!
		expect(hatchet.properties).toContain('agile')
		expect(getBaseDamageType(hatchet.type)).toBe('STR')

		// A Throwing Axe is an Axe you happen to throw. A Sling is not.
		const throwingAxe = weapons.find(
			(weapon) => weapon.name === 'Throwing Axe',
		)!
		expect(throwingAxe.properties).toContain('thrown')
		expect(getBaseDamageType(throwingAxe.type)).toBe('STR')
		expect(getBaseDamageType('Thrown')).toBe('AGI')
	})

	it('answers for every base item the Magic Item Builder treats as a weapon', () => {
		const builderWeapons = [
			...baseItems['one-handed-weapon'],
			...baseItems['two-handed-weapon'],
			...baseItems.shield,
		]
		expect(builderWeapons.length).toBeGreaterThan(0)

		for (const item of builderWeapons) {
			const base = getBaseDamageType(item.weaponCategory)
			// Never the empty string, which is what the builder used to write.
			expect(base, item.name).not.toBe('')
			expect(baseDamageTypeArray).toContain(base)
		}
	})

	it('falls back to Strength rather than to nothing for an unknown type', () => {
		expect(getBaseDamageType(undefined)).toBe('STR')
		expect(getBaseDamageType(null)).toBe('STR')
		expect(getBaseDamageType('')).toBe('STR')
		expect(getBaseDamageType('Axe')).toBe('STR')
		// Case and padding come from hand-maintained JSON, so they are handled.
		expect(getBaseDamageType('  bow ')).toBe('AGI')
	})
})
