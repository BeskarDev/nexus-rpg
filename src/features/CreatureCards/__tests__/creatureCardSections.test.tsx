import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Creature } from '@site/src/types/Creature'
import { sectionForQualifier } from '@site/src/utils/typescript/creature/creatureSections'
import { CreatureBlocks, creatureBlocks } from '../creatureBlocks'

/**
 * The printed card groups by WHEN A GM USES AN ENTRY, exactly as the docs card
 * does (D-147, Q8T4.23).
 *
 * The two surfaces disagreed for as long as the grouping lived inside
 * `generate-creatures.ts`: the docs card said Actions / Quick Actions /
 * Triggers / Passives while the print tool still said Attacks / Abilities /
 * Quick Actions, which is the shape of the RECORD rather than of a turn. A GM
 * holding a printed Mummy met a different stat block from the one on the page.
 */
const CREATURE: Creature = {
	name: 'Mummy',
	tier: 4,
	category: 'Basic',
	type: 'Undead',
	armor: 'Light',
	hp: '50',
	av: '4',
	str: 'd10',
	agi: 'd6',
	spi: 'd8',
	mnd: 'd8',
	parry: 9,
	dodge: 8,
	resist: 10,
	skills: ['Fighting (2)'],
	immunities: ['bleeding'],
	resistances: [],
	weaknesses: ['fire'],
	attacks: [{ name: 'Rotting Fist', properties: [], damage: '11/17/23' }],
	abilities: [
		{
			name: 'Mummy Rot',
			description: 'A magical disease.',
			qualifier: 'Passive',
		},
		{
			name: 'Dread Gaze',
			description: 'Roll Spirit + Influence vs. Resist.',
			qualifier: 'Quick Action',
		},
		{
			name: 'Grave Wind',
			description: 'Sweeps the chamber.',
			qualifier: 'Action, 3/day',
		},
		{
			name: 'Rise Again',
			description: 'On its first Wound.',
			qualifier: 'Elite Trigger',
		},
	],
}

const sectionsOf = (creature: Creature) => [
	...new Set(creatureBlocks(creature).map((block) => block.section)),
]

const sectionOf = (creature: Creature, key: string) =>
	creatureBlocks(creature).find((block) => block.key === key)?.section

describe('creature card sections (D-147)', () => {
	it('names the four sections in the order a fight needs them', () => {
		expect(sectionsOf(CREATURE)).toEqual([
			// The trait rows carry no section: they are the stat band, not entries.
			undefined,
			'Actions',
			'Quick Actions',
			'Triggers',
			'Passives',
		])
	})

	it('puts an attack and an `Action` ability under one heading', () => {
		expect(sectionOf(CREATURE, 'attack-0')).toBe('Actions')
		expect(sectionOf(CREATURE, 'ability-2')).toBe('Actions')
	})

	it('reads the section off the qualifier, not the array', () => {
		expect(sectionOf(CREATURE, 'ability-1')).toBe('Quick Actions')
		expect(sectionOf(CREATURE, 'ability-3')).toBe('Triggers')
		expect(sectionOf(CREATURE, 'ability-0')).toBe('Passives')
	})

	it('folds the markdown path’s legacy `quickActions` list in by its heading', () => {
		// Companion Traits writes a `**Quick Actions:**` section whose entries
		// carry no inline qualifier. The heading supplies one (D-005: a quick
		// action is an ability whose qualifier says so).
		const withLegacy: Creature = {
			...CREATURE,
			abilities: [],
			quickActions: [{ name: 'Sidestep', description: 'Shifts one zone.' }],
		}
		expect(sectionOf(withLegacy, 'ability-0')).toBe('Quick Actions')
	})

	it('groups an unrecognised qualifier rather than dropping the entry', () => {
		// `**Flying (hover).**` puts a property where a qualifier goes, and the
		// print tool is fed hand-written markdown, so a card must never lose a
		// line it cannot classify.
		const companion: Creature = {
			...CREATURE,
			attacks: [],
			abilities: [
				{ name: 'Flying', description: 'Can hover.', qualifier: 'hover' },
			],
		}
		expect(sectionOf(companion, 'ability-0')).toBe('Passives')
		expect(sectionForQualifier('hover')).toBeNull()
	})

	it('drops the qualifier badge the heading already says, and keeps the limiter', () => {
		const blocks = creatureBlocks(CREATURE)
		const { container } = render(<CreatureBlocks blocks={blocks} />)
		const slabs = [...container.querySelectorAll('.pc-slab')].map(
			(node) => node.textContent,
		)
		expect(slabs).toEqual(['3/day'])
		expect(container.textContent).toContain('Grave Wind')
	})
})
