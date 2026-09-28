/* eslint-disable @typescript-eslint/no-explicit-any */
import { CharacterDocument, Item } from '@site/src/types/Character'
import {
	createBasicCharacter,
	createCharacterDocument,
} from '../../../../../tests/utils/character-test-fixtures'

const item = (overrides: Partial<Item> & Record<string, any>): Item =>
	({
		id: crypto.randomUUID(),
		name: 'Item',
		properties: [],
		cost: 0,
		container: 'backpack',
		amount: 1,
		location: 'carried',
		uses: 0,
		durability: '',
		...overrides,
	}) as Item

/**
 * A character whose STORED derived copies are all wrong, so any reader that
 * trusts storage instead of deriving gives a different number.
 *
 * Expected derivations (worked by hand, and asserted in `deriveCharacter.test.ts`):
 *
 * - Skills: Fighting 18 XP (rank 3), Athletics 8 (2), Perception 3 (1),
 *   Mysticism 6 (2, stored as 0). Spent XP 35, so level 5. Total XP 60 would
 *   read as level 7.
 * - HP: d10 STR base 22, +8 for level 5, +2 from a talent (`health.auto` is
 *   absent), +1 modifier = 33. Two Fatigue = 29 effective.
 * - Defences get +2 at level 5. Parry 7 + 3 + 2 + 0 shield + 1 other = 13.
 *   Dodge has no details (legacy) and a stored 13, so it stays 13. Resist
 *   5 + 4 + 2 = 11, ignoring a stale stored base of 99.
 * - AV: worn Leather Armor (AV +2) + Stoneskin 1 + other 1 = 4 (stored armor 7).
 * - Focus: Mysticism with SPI d8 = 8 - 2 + 2*2 = 10, +1 modifier, +2 talent = 13.
 * - Load: longsword 2 and leather armor 1 (worn), rope 1, torch 1 x3, rations 1,
 *   a legacy waterskin with only `weight: 2`, and a carried dagger 1 with amount
 *   10 (ammunition semantics, counted once) = 11. The tent (load 5) is on the
 *   mount and does not count. Capacity 10/2 + 8 = 13, max 26.
 */
export const createDerivationFixture = (): CharacterDocument => {
	const base = createBasicCharacter()
	return createCharacterDocument({
		...base,
		statistics: {
			...base.statistics,
			health: { current: 20, temp: 0, maxHpModifier: 1 } as any,
			fatigue: { current: 2, max: 6 },
			av: { armor: 7, helmet: 3, shield: 0, other: 1 },
			strength: { value: 10, wounded: false },
			agility: { value: 8, wounded: false },
			spirit: { value: 8, wounded: false },
			mind: { value: 6, wounded: false },
			parry: 99,
			dodge: 13,
			resist: 42,
			parryDetails: { base: 1, levelBonus: 0, shieldBonus: 5, other: 1 },
			resistDetails: { base: 99, levelBonus: 7, other: 0 },
		},
		skills: {
			...base.skills,
			xp: { total: 60, spend: 60 },
			skills: [
				{ id: 's1', name: 'Fighting', rank: 3, xp: 18 },
				{ id: 's2', name: 'Athletics', rank: 2, xp: 8 },
				{ id: 's3', name: 'Perception', rank: 1, xp: 3 },
				{ id: 's4', name: 'Mysticism', rank: 0, xp: 6 },
			],
			abilities: [
				{
					id: 'a1',
					title: 'Bulwark',
					description: '(Rank 1) Gain +2 HP. (Rank 2) Gain +2 HP.',
					tag: 'Talent',
					rank: 1,
				},
				{
					id: 'a2',
					title: 'Deep Well',
					description: '(Rank 1) Gain +2 Focus.',
					tag: 'Talent',
					rank: 1,
				},
				{
					id: 'a3',
					title: 'Stoneskin',
					description: 'Your skin is hard as stone.',
					tag: 'Folk',
				},
			],
		},
		items: {
			...base.items,
			weapons: [
				{
					...base.items.weapons[0],
					load: 2,
					location: 'worn',
				},
				{
					...base.items.weapons[0],
					id: 'dagger',
					name: 'Dagger',
					load: 1,
					amount: 10,
					location: 'carried',
				},
			],
			items: [
				item({
					name: 'Leather Armor',
					properties: ['AV +2'],
					load: 1,
					location: 'worn',
					container: 'worn',
					slot: 'body',
				}),
				item({ name: 'Rope', load: 1 }),
				item({ name: 'Torch', load: 1, amount: 3 }),
				item({ name: 'Rations', load: 1 }),
				item({ name: 'Waterskin', load: 2 }),
				item({ name: 'Tent', load: 5, location: 'mount' }),
			],
			encumbrance: {
				encumberedAt: 0,
				overencumberedAt: 0,
				carryModifier: 0,
				currentLoad: 1,
				mountMaxLoad: 0,
				storageMaxLoad: 0,
			},
		},
		spells: {
			magicSkill: 'Mysticism',
			specialization: '',
			focus: { total: 4, current: 3 },
			focusDetails: { maxFocusModifier: 1 },
			spellCatalystDamage: 1,
			spells: [
				{
					id: 'sp1',
					name: 'Smite',
					rank: 1,
					cost: 2,
					target: 'Single',
					range: 'Melee',
					properties: '',
					dealsDamage: true,
					damage: {
						base: 'SPI',
						weapon: 2,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'radiant',
					},
					description: '',
				} as any,
			],
		},
	})
}
