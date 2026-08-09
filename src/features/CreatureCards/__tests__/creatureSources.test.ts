import { describe, expect, it } from 'vitest'
import creaturesJson from '@site/src/utils/data/json/creatures.json'
import {
	adaptCreature,
	catalogueId,
	companionId,
	creatureEntries,
} from '../creatureSources'

const raw = creaturesJson as unknown[]

/**
 * Fixtures rather than the live catalogue.
 *
 * These assertions used to read `creatures.json` and hard-code counts from it
 * (402 abilities, Manticore appearing twice). That coupled the adapter's tests
 * to roster content, so replacing the roster broke tests that had nothing to do
 * with the change. What is under test is the adapter, so the adapter gets its
 * own inputs.
 */
const FIXTURES: unknown[] = [
	{
		name: 'Cat',
		tier: 0,
		category: 'Basic',
		attacks: [
			{ name: 'Claw', properties: ['agile', 'light'], text: '4/6/8 damage.' },
		],
		abilities: [{ name: 'Keen Scent', qualifier: 'Passive', text: 'Smells you.' }],
	},
	{
		name: 'Manticore',
		tier: 3,
		category: 'Elite',
		abilities: [{ name: 'Savage Fury', qualifier: 'Elite Trigger', text: 'Rage.' }],
	},
	{
		name: 'Manticore',
		tier: 4,
		category: 'Basic',
		attacks: [
			{
				name: 'Eye Rays',
				text: 'Shoots two rays:',
				details: ['1. One ray.', '2. Another ray.'],
			},
		],
	},
	{
		name: 'Mummy',
		tier: 4,
		category: 'Basic',
		lore: { narrative: 'Wrapped and waiting.' },
	},
]

describe('creatureEntries', () => {
	it('adapts every creature it is given without loss', () => {
		const { entries, errors } = creatureEntries(FIXTURES)
		expect(errors).toEqual([])
		expect(entries).toHaveLength(FIXTURES.length)

		// Every ability's qualifier reaches the app type — the fact the card was
		// dropping (M21 F4).
		const abilities = entries.flatMap((e) => e.creature.abilities)
		expect(abilities.every((a) => Boolean(a.qualifier))).toBe(true)

		const everyEntry = entries.flatMap((e) => [
			...e.creature.abilities,
			...(e.creature.quickActions ?? []),
		])
		expect(everyEntry.every((a) => Boolean(a.name && a.description))).toBe(true)
	})

	it('adapts the live catalogue without errors, whatever is in it', () => {
		// The roster is rebuilt tier by tier, so its size is not asserted — only
		// that everything present survives adaptation.
		const { entries, errors } = creatureEntries()
		expect(errors).toEqual([])
		expect(entries).toHaveLength(raw.length)
	})

	it('sorts by tier then name', () => {
		const { entries } = creatureEntries(FIXTURES)
		const keys = entries.map((e) => [e.creature.tier, e.creature.name] as const)
		const sorted = [...keys].sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]))
		expect(keys).toEqual(sorted)
	})

	it('splits an attack into its damage triple and the prose after it', () => {
		const { entries } = creatureEntries(FIXTURES)
		const cat = entries.find((e) => e.creature.name === 'Cat')!
		// The literal word "damage" is dropped, as the docs generator drops it: the
		// ladder's own W/S/C ticks already say what the three numbers are.
		expect(cat.creature.attacks[0]).toEqual({
			name: 'Claw',
			properties: ['agile', 'light'],
			damage: '4/6/8',
		})
	})

	it('keeps a typed triple’s damage type for the ladder', () => {
		const adapted = adaptCreature({
			name: 'X',
			tier: 1,
			category: 'Basic',
			attacks: [{ name: 'Bite', text: '4/6/8 fire damage. On a strong hit, burn.' }],
		})
		expect('creature' in adapted && adapted.creature.attacks[0]).toEqual({
			name: 'Bite',
			properties: [],
			damage: '4/6/8',
			damageType: 'fire',
			description: 'On a strong hit, burn.',
		})
	})

	it('carries an attack sub-list through', () => {
		const { entries } = creatureEntries(FIXTURES)
		const withRays = entries.find((e) => e.creature.tier === 4 && e.creature.attacks.length > 0)!
		const withDetails = withRays.creature.attacks.find((a) => a.details)
		expect(withDetails?.details?.length).toBeGreaterThan(1)
	})

	it('carries lore through without printing it', () => {
		const { entries } = creatureEntries(FIXTURES)
		const mummy = entries.find((e) => e.creature.name === 'Mummy')!
		expect(mummy.creature.lore).toBeTruthy()
	})

	it('gives a companion and a catalogue creature of the same name two IDs', () => {
		expect(catalogueId(0, 'Wolf')).not.toBe(companionId('doc-1', 'Wolf'))
	})

	it('gives every catalogue record its own ID, duplicate names included', () => {
		// Manticore is two different creatures (T3 Elite, T4 Basic), so a name is
		// not a key even inside one catalogue.
		const { entries } = creatureEntries(FIXTURES)
		expect(new Set(entries.map((e) => e.id)).size).toBe(entries.length)
		expect(entries.filter((e) => e.creature.name === 'Manticore')).toHaveLength(2)
	})

	it('reports a malformed entry rather than dropping it silently', () => {
		const { entries, errors } = creatureEntries([
			{ name: 'Fine', tier: 1, category: 'Basic' },
			{ tier: 1, category: 'Basic' },
			{ name: 'No tier', category: 'Basic' },
		])
		expect(entries.map((e) => e.creature.name)).toEqual(['Fine'])
		expect(errors).toHaveLength(2)
		expect(errors[0].reason).toBe('missing name')
		expect(errors[1].reason).toBe('missing or non-numeric tier')
	})

	it('adapts an ability with no qualifier without inventing one', () => {
		const adapted = adaptCreature({
			name: 'X',
			tier: 0,
			category: 'Basic',
			abilities: [{ name: 'A', text: 'B' }],
		})
		expect('creature' in adapted && adapted.creature.abilities[0]).toEqual({
			name: 'A',
			description: 'B',
		})
	})
})
