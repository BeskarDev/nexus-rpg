import { describe, it, expect } from 'vitest'
import archetypesJson from '@site/src/utils/data/json/archetypes.json'
import {
	derive,
	deriveAll,
	deriveCombatArts,
	deriveEquipment,
	deriveFocusPool,
	deriveSkills,
	deriveSpellsKnown,
	requiredCombatArts,
	STANDARD_GEAR_LOAD,
	STARTING_COINS,
	type ArchetypeRecord,
} from '../archetype-derivation'

const records = archetypesJson as unknown as ArchetypeRecord[]

function record(name: string): ArchetypeRecord {
	const found = records.find((a) => a.name === name)
	if (!found) throw new Error(`no archetype named ${name}`)
	return JSON.parse(JSON.stringify(found)) as ArchetypeRecord
}

describe('archetype derivation', () => {
	it('derives all 25 archetypes without a failure', () => {
		const all = deriveAll()
		expect(all).toHaveLength(25)
		// alphabetical: the order the sidebar and the overview table both use
		const names = all.map((a) => a.record.name)
		expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
	})

	it('leaves every archetype with exactly 3 rank 1 and 4 rank 0 skills', () => {
		for (const a of deriveAll()) {
			expect(a.skills.rank1, a.record.name).toHaveLength(3)
			expect(a.skills.rank0, a.record.name).toHaveLength(4)
		}
	})

	it('keeps every kit inside the coin budget and the carry capacity', () => {
		for (const a of deriveAll()) {
			expect(a.equipment.coinsRemaining, a.record.name).toBeGreaterThanOrEqual(
				0,
			)
			expect(a.equipment.coinsSpent, a.record.name).toBeLessThanOrEqual(
				STARTING_COINS,
			)
			expect(a.equipment.totalLoad, a.record.name).toBe(
				a.equipment.equipmentLoad + STANDARD_GEAR_LOAD,
			)
			expect(a.equipment.totalLoad, a.record.name).toBeLessThanOrEqual(
				a.equipment.carryCapacity,
			)
		}
	})

	it('grants one free unit of ammunition to a weapon that needs it', () => {
		// Ranger's longbow (M22 F12): arrows cost 15 and are granted, so the
		// stated 85 coins only works if the rule is applied.
		const ranger = deriveEquipment(record('Ranger'))
		const arrows = ranger.items.find((i) => i.name === 'Arrows (d6)')
		expect(arrows?.free).toBe(true)
		expect(arrows?.cost).toBe(0)
		expect(ranger.coinsRemaining).toBe(85)

		// Nothing free without an `ammo` weapon in the kit.
		const fighter = deriveEquipment(record('Fighter'))
		expect(fighter.items.every((i) => !i.free)).toBe(true)
	})

	it('counts combat arts from the weapon skills, rank 0 included', () => {
		// 02-character-creation.md: two per weapon skill at rank 1, one at rank 0.
		expect(requiredCombatArts(record('Fighter'))).toBe(3) // Fighting 1 + Archery 0
		expect(requiredCombatArts(record('Ranger'))).toBe(3) // Archery 1 + Fighting 0
		expect(requiredCombatArts(record('Gladiator'))).toBe(2) // Fighting 1 only
		expect(requiredCombatArts(record('Sorcerer'))).toBe(0) // no weapon skill
	})

	it('matches every recommended art to a weapon the archetype carries', () => {
		for (const a of deriveAll())
			expect(a.combatArts.arts, a.record.name).toHaveLength(
				a.combatArts.required,
			)
		// The Monk fights unarmed, which only counts because of Pugilist.
		const monk = deriveCombatArts(record('Monk'))
		expect(monk.arts.map((x) => x.name)).toContain('Knockout')
	})

	it('sizes an Arcana focus pool off Mind and a Mysticism pool off Spirit', () => {
		expect(deriveFocusPool(record('Sorcerer'))).toEqual({
			attribute: 'MND',
			value: 8,
			total: 8,
		})
		expect(deriveFocusPool(record('Druid'))).toEqual({
			attribute: 'SPI',
			value: 8,
			total: 8,
		})
		expect(deriveFocusPool(record('Fighter'))).toBeNull()
	})

	it('counts spells known per choice mode', () => {
		// devotion takes ONE option's set; balance draws across both
		expect(record('Champion').spellData?.mode).toBe('devotion')
		expect(deriveSpellsKnown(record('Champion'))).toBe(6)
		expect(record('Druid').spellData?.mode).toBe('balance')
		expect(deriveSpellsKnown(record('Druid'))).toBe(4)
		expect(deriveSpellsKnown(record('Fighter'))).toBeNull()
	})

	it('marks a skill the upbringing and background did not suggest', () => {
		// The rule applies at BOTH ranks. The hand-written pages did not: the
		// Apothecary marked its rank 1 Archery, the Druid left its rank 1
		// Survival unmarked, and neither upbringing nor background grants it.
		const druid = deriveSkills(record('Druid'))
		expect([...druid.customised].sort()).toEqual([
			'Athletics',
			'Perception',
			'Survival',
		])
		expect(druid.background.startingItem).toBe('Living seed necklace')
	})
})

describe('archetype derivation fails loud', () => {
	it('rejects an equipment name the catalogues do not carry', () => {
		const bad = record('Fighter')
		bad.startingEquipment = [{ item: 'Leather Armor' }] // catalogue says "Leather"
		expect(() => deriveEquipment(bad)).toThrow(/matches no entry/)
	})

	it('rejects an unknown upbringing', () => {
		const bad = record('Apothecary')
		bad.upbringing = 'Apprenticed' // the name M22 F6 found and corrected
		expect(() => deriveSkills(bad)).toThrow(/not in upbringings.json/)
	})

	it('rejects a kit that costs more than the budget', () => {
		const bad = record('Fighter')
		bad.startingEquipment = [{ item: 'Plate Harness' }]
		expect(() => deriveEquipment(bad)).toThrow(/matches no entry|against a 350/)
	})

	it('rejects the wrong number of combat arts', () => {
		const bad = record('Fighter')
		bad.recommendedCombatArts = bad.recommendedCombatArts!.slice(0, 2)
		expect(() => deriveCombatArts(bad)).toThrow(/grant 3/)
	})

	it('rejects an art the kit carries no weapon for', () => {
		const bad = record('Sorcerer')
		bad.recommendedCombatArts = [{ name: 'Cleave', gloss: 'x' }]
		expect(() => deriveCombatArts(bad)).toThrow(/weapon skills grant 0/)
	})

	it('rejects rank 0 skills that do not come to four', () => {
		const bad = record('Fighter')
		bad.suggestedSkills = 'Fighting, Athletics, Fortitude, Perception'
		expect(() => deriveSkills(bad)).toThrow(/rank 0 skills, not 4/)
	})

	it('rejects a talent with no gloss', () => {
		const bad = record('Fighter')
		bad.recommendedTalents[0] = { name: 'Shield Mastery', gloss: '' }
		expect(() => derive(bad)).toThrow(/has no gloss/)
	})

	it('rejects devotion options a player could not fairly choose between', () => {
		const bad = record('Champion')
		bad.spellData!.options[1].spells = bad.spellData!.options[1].spells.slice(
			0,
			2,
		)
		expect(() => deriveSpellsKnown(bad)).toThrow(/differ in size/)
	})
})
