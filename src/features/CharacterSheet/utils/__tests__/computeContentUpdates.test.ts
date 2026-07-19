import { describe, it, expect } from 'vitest'
import {
	computeSpellUpdates,
	computeTalentUpdates,
	formatDamage,
} from '../computeContentUpdates'
import { Ability, Spell } from '../../../../types/Character'
import { buildSpellFromData, findSpellSource } from '../spellFactory'
import { findTalentSource, buildTalentFields } from '../talentFactory'

const emptyDamage = {
	base: '' as const,
	weapon: 0,
	other: 0,
	otherWeak: 0,
	otherStrong: 0,
	otherCritical: 0,
	type: 'physical' as const,
	staticDamage: false,
}

describe('computeSpellUpdates', () => {
	it('flags a spell whose stored fields drifted from the JSON source', () => {
		const src = findSpellSource('Flickering Flame', 'Arcana')
		expect(src).not.toBeNull()

		const stale: Spell = {
			id: 'spell-1',
			name: 'Flickering Flame',
			rank: 0,
			cost: 0,
			target: '',
			range: '',
			properties: '-',
			dealsDamage: false, // stale: source deals damage
			damage: emptyDamage, // stale: source parses fire damage
			effect: 'outdated wording',
		}

		const updates = computeSpellUpdates([stale], 'Arcana')
		expect(updates).toHaveLength(1)
		const fields = updates[0].changes.map((c) => c.field)
		expect(fields).toContain('Effect')
		expect(fields).toContain('Damage')
		// next equals what a fresh import would produce (damage re-detected)
		expect(updates[0].next).toEqual(buildSpellFromData(src!.data, 'Arcana'))
		expect(updates[0].next.dealsDamage).toBe(true)
	})

	it('returns nothing when a spell already matches the source', () => {
		const src = findSpellSource('Flickering Flame', 'Arcana')!
		const current: Spell = {
			id: 'spell-1',
			...buildSpellFromData(src.data, 'Arcana'),
		}
		expect(computeSpellUpdates([current], 'Arcana')).toHaveLength(0)
	})

	it('skips homebrew spells not present in the source', () => {
		const homebrew: Spell = {
			id: 'x',
			name: 'Totally Made Up Spell',
			rank: 1,
			cost: 1,
			target: '',
			range: '',
			properties: '',
			dealsDamage: false,
			damage: emptyDamage,
			effect: 'whatever',
		}
		expect(computeSpellUpdates([homebrew], 'Arcana')).toHaveLength(0)
	})
})

describe('computeTalentUpdates', () => {
	it('flags a talent with an outdated description and preserves rank', () => {
		const src = findTalentSource('Battle Mage')
		expect(src).not.toBeNull()

		const stale: Ability = {
			id: 't-1',
			title: 'Battle Mage',
			description: 'old text',
			tag: 'Talent',
			rank: 3,
			skill: 'Arcana',
		}
		const updates = computeTalentUpdates([stale])
		expect(updates).toHaveLength(1)
		expect(updates[0].changes.map((c) => c.field)).toContain('Description')
		expect(updates[0].next).toEqual(buildTalentFields(src!))
	})

	it('ignores non-talent abilities', () => {
		const ability: Ability = {
			id: 'a',
			title: 'Battle Mage',
			description: 'old text',
			tag: 'Combat Art',
		}
		expect(computeTalentUpdates([ability])).toHaveLength(0)
	})
})

describe('formatDamage', () => {
	it('summarizes a scaling weapon-damage spell', () => {
		expect(
			formatDamage({ ...emptyDamage, base: 'MND', weapon: 2, type: 'fire' }),
		).toBe('MND, weapon x2 (fire)')
	})
})
