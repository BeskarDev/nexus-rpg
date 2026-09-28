import { describe, expect, it } from 'vitest'
import type { CompanionBond, CompanionTrait } from '../../../../types/companion'
import companionTraits from '../../../data/json/companion-traits.json'
import { calculateStats } from '../companionCalculations'
import { generateMarkdown } from '../companionFormatting'
import {
	NO_BOND,
	bondFromOwner,
	bondTierLimit,
	ownerFromCharacter,
} from '../companionBond'
import { parseCompanionMarkdown } from '../../../../features/CharacterSheet/CharacterSheetTabs/05_Companions/utils/parseCompanionMarkdown'
import { parseCreatureMarkdown } from '../../../../features/CreatureCards/parseCreatureMarkdown'
import type { Character } from '../../../../types/Character'

/**
 * The owner's bond: Animal Companion (talents.json, Nature) and the Wild Companion
 * spell (mystic-spells.json), applied to a built companion and carried through the
 * markdown into both readers (the sheet's and the print card's).
 */
const BEAR = (companionTraits as CompanionTrait[]).find(
	(trait) => trait.name === 'Bear',
)!

const bond = (update: Partial<CompanionBond>): CompanionBond => ({
	...NO_BOND,
	...update,
})

const build = (b: CompanionBond = NO_BOND, tier = 2) => {
	const calculatedStats = calculateStats(tier, 'Medium', BEAR, b)
	return {
		stats: calculatedStats,
		markdown: generateMarkdown({
			tier,
			size: 'Medium',
			trait: BEAR,
			calculatedStats,
		}),
	}
}

describe('companion without a bond', () => {
	it('keeps the shape it always had', () => {
		const { stats, markdown } = build()
		expect(stats.type).toBe('Animal')
		expect(stats.bond).toBe('')
		expect(stats.combatArts).toEqual([])
		expect(markdown).not.toContain('**Bond:**')
		expect(markdown).not.toContain('**Combat Arts:**')
		expect(
			markdown
				.trimEnd()
				.endsWith(
					'Powerful Build.** Add +2 to this creature’s carrying capacity.',
				),
		).toBe(true)
	})
})

describe('Animal Companion rank 1', () => {
	it('adds the Nature note with the owner’s rank', () => {
		const { stats } = build(bond({ talentRank: 1, nature: 3 }))
		const bonded = stats.abilities.find((a) => a.includes('Bonded'))
		expect(bonded).toContain('Nature (3) instead of the required skill')
		expect(bonded).toContain('can see and hear')
		expect(bonded).not.toMatch(/[;—–]/)
	})

	it('falls back to “the owner’s Nature” when the rank is unknown', () => {
		const { stats } = build(bond({ talentRank: 1 }))
		expect(stats.abilities.join(' ')).toContain('the owner’s Nature instead')
	})

	it('caps the Tier at Nature, or Nature - 1 with two companions', () => {
		expect(bondTierLimit(bond({ talentRank: 1, nature: 3 }))).toBe(3)
		expect(
			bondTierLimit(
				bond({ talentRank: 2, nature: 3, rank2Choice: 'two-companions' }),
			),
		).toBe(2)
		// The rank 2 option does not count below rank 2.
		expect(
			bondTierLimit(
				bond({ talentRank: 1, nature: 3, rank2Choice: 'two-companions' }),
			),
		).toBe(3)
		expect(bondTierLimit(bond({ talentRank: 1 }))).toBeNull()
		expect(bondTierLimit(bond({ nature: 3 }))).toBeNull()
	})
})

describe('Animal Companion rank 3, +4 damage', () => {
	it('adds +4 to every attack’s total damage at every success level', () => {
		const plain = build().stats.attacks
		const boosted = build(
			bond({ talentRank: 3, nature: 3, rank3Choice: 'damage' }),
		).stats.attacks
		expect(plain[0]).toContain('7/10/13 damage (4 base + 3 weapon)')
		expect(boosted[0]).toContain(
			'11/14/17 damage (4 base + 3 weapon + 4 bonus)',
		)
		// The claw deals -1 weapon damage.
		expect(plain[1]).toContain('6/8/10 damage')
		expect(boosted[1]).toContain('10/12/14 damage')
	})

	it('does nothing below rank 3', () => {
		const { stats } = build(bond({ talentRank: 2, rank3Choice: 'damage' }))
		expect(stats.attacks[0]).toContain('7/10/13 damage')
	})

	it('writes pack coordination as an ability instead', () => {
		const { stats } = build(
			bond({ talentRank: 3, rank3Choice: 'pack-coordination' }),
		)
		expect(stats.abilities.join(' ')).toContain('+1 boon on attacks')
		expect(stats.attacks[0]).toContain('7/10/13 damage')
	})
})

describe('Wild Companion', () => {
	it('makes a primal spirit with +1d Spirit, +1d Mind and +1 Resist', () => {
		const plain = build().stats
		const wild = build(
			bond({ talentRank: 1, nature: 2, wildCompanion: true }),
		).stats
		expect(plain.attributes.spi).toBe('d6')
		expect(plain.attributes.mnd).toBe('d4-1')
		expect(wild.type).toBe('Spirit (primal)')
		expect(wild.attributes.spi).toBe('d8')
		expect(wild.attributes.mnd).toBe('d4')
		expect(wild.defenses.resist).toBe(plain.defenses.resist + 1)
		expect(wild.abilities.join(' ')).toContain('Psychic Connection')
		expect(wild.abilities.join(' ')).not.toContain('Spirit Casting')
	})

	it('needs the Animal Companion talent', () => {
		const { stats } = build(bond({ wildCompanion: true }))
		expect(stats.type).toBe('Animal')
		expect(stats.attributes.spi).toBe('d6')
	})

	it('casts the owner’s spells at rank 2 and 3, with their Nature filled in', () => {
		const rank2 = build(
			bond({
				talentRank: 1,
				nature: 3,
				wildCompanion: true,
				wildCompanionRank: 2,
			}),
		).stats.abilities.join(' ')
		expect(rank2).toContain('any rank 0 or 1 spells their owner knows')
		expect(rank2).toContain('Spirit + the owner’s Nature (3)')
		expect(rank2).toContain(
			'rank 1 spells per day equal to the owner’s Nature (3)',
		)

		const rank3 = build(
			bond({
				talentRank: 1,
				nature: 3,
				wildCompanion: true,
				wildCompanionRank: 3,
			}),
		).stats.abilities.join(' ')
		expect(rank3).toContain('any rank 0, 1 or 2 spells')
		expect(rank3).toContain('heightened to rank 2')
	})
})

describe('the markdown, read back', () => {
	const full = bond({
		talentRank: 3,
		nature: 3,
		rank2Choice: 'combat-arts',
		rank3Choice: 'damage',
		combatArts: ['Feint', 'Brutal Strike'],
		wildCompanion: true,
		wildCompanionRank: 2,
	})
	const { markdown } = build(full)

	it('says which options it was built with', () => {
		expect(markdown).toContain(
			'**Bond:** Animal Companion rank 3 (two Combat Arts, +4 damage). Combat Arts work only while under the owner’s control, by the normal rules for Combat Arts. Wild Companion rank 2. Owner’s Nature 3.',
		)
		expect(markdown).toContain('#### **Bear** (Medium Spirit (primal))')
	})

	it('writes each Combat Art on one line with its full effect', () => {
		const section = markdown.split('**Combat Arts:**\n')[1]
		const lines = section.split('\n')
		expect(lines).toHaveLength(2)
		expect(lines[0]).toMatch(/^- \*\*Feint\.\*\* If you don’t move/)
		// Brutal Strike's Weak / Strong / Critical outcomes stay with their art.
		expect(lines[1]).toMatch(
			/^- \*\*Brutal Strike\.\*\* .*\*\*Weak\.\*\*.*\*\*Strong\.\*\*/,
		)
	})

	it('ignores more than two arts, and arts outside the Basic list', () => {
		const { stats } = build(
			bond({
				talentRank: 2,
				rank2Choice: 'combat-arts',
				combatArts: ['Feint', 'Flurry', 'Charge'],
			}),
		)
		expect(stats.combatArts).toHaveLength(2)
		const supreme = build(
			bond({
				talentRank: 2,
				rank2Choice: 'combat-arts',
				combatArts: ['Supreme Feint'],
			}),
		).stats
		expect(supreme.combatArts).toEqual([])
	})

	it('renders Bond and Combat Arts on the sheet', () => {
		const block = parseCompanionMarkdown(markdown)!
		expect(block).not.toBeNull()
		expect(block.type).toBe('Medium Spirit (primal)')
		expect(block.spi).toBe('d8')
		expect(block.traits.find((t) => t.label === 'Bond')?.value).toContain(
			'Animal Companion rank 3',
		)
		expect(block.sections.map((s) => s.label)).toEqual([
			'Attacks',
			'Abilities',
			'Combat Arts',
		])
		expect(block.sections[2].items).toHaveLength(2)
	})

	it('prints Combat Arts as their own group, not as abilities', () => {
		const [creature] = parseCreatureMarkdown(markdown)
		expect(creature.type).toBe('Medium Spirit (primal)')
		expect(creature.combatArts?.map((art) => art.name)).toEqual([
			'Feint',
			'Brutal Strike',
		])
		const abilityNames = creature.abilities.map((a) => a.name)
		expect(abilityNames).toContain('Bonded')
		expect(abilityNames).toContain('Spirit Casting')
		expect(abilityNames).not.toContain('Feint')
		expect(creature.attacks[0].damage).toBe('11/14/17')
	})
})

describe('owner prefill from the character', () => {
	const character = {
		skills: {
			skills: [{ id: 'n', name: 'Nature', rank: 2, xp: 0 }],
			abilities: [
				{
					id: 'a',
					title: 'Animal Companion',
					description: '',
					tag: 'Talent',
					rank: 2,
				},
			],
		},
		spells: { spells: [{ name: 'Wild Companion' }] },
	} as unknown as Character

	it('reads the talent rank, Nature and the spell', () => {
		const owner = ownerFromCharacter(character)
		expect(owner).toEqual({
			talentRank: 2,
			nature: 2,
			knowsWildCompanion: true,
		})
		expect(bondFromOwner(owner!)).toMatchObject({
			talentRank: 2,
			nature: 2,
			wildCompanion: true,
			rank2Choice: null,
		})
	})

	it('has no bond for a character without the talent', () => {
		const owner = ownerFromCharacter({
			skills: { skills: [], abilities: [] },
			spells: { spells: [] },
		} as unknown as Character)
		expect(owner).toEqual({
			talentRank: 0,
			nature: null,
			knowsWildCompanion: false,
		})
	})
})
