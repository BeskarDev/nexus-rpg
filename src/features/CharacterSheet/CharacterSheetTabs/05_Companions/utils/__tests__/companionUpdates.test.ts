import { describe, expect, it } from 'vitest'
import type {
	Character,
	CharacterDocument,
	Companion,
} from '@site/src/types/Character'
import type {
	CompanionBuild,
	CompanionOwner,
	CompanionTrait,
} from '@site/src/types/companion'
import companionTraits from '@site/src/utils/data/json/companion-traits.json'
import {
	bondFromBuild,
	buildFromBuilder,
	companionMarkdown,
	parseCompanionBuild,
	regenerateCompanion,
} from '@site/src/utils/typescript/companion/companionBuild'
import {
	NO_BOND,
	bondFromOwner,
	ownerFromCharacter,
} from '@site/src/utils/typescript/companion/companionBond'
import { migrateCharacterData } from '../../../../utils/characterMigration'
import {
	applyCompanionBuild,
	computeCompanionUpdates,
} from '../companionUpdates'

const trait = (name: string) =>
	(companionTraits as CompanionTrait[]).find((entry) => entry.name === name)!

const OWNER: CompanionOwner = {
	talentRank: 3,
	nature: 3,
	knowsWildCompanion: true,
}

/** The markdown the builder produces for a commission, with the owner prefilled. */
const builderOutput = (
	name: string,
	tier: number,
	size: string,
	owner: CompanionOwner | undefined,
	choices: Partial<typeof NO_BOND> = {},
) => {
	const bond = { ...(owner ? bondFromOwner(owner) : NO_BOND), ...choices }
	const { markdown } = companionMarkdown(tier, size, trait(name), bond)
	return {
		markdown,
		build: buildFromBuilder(tier, size, trait(name), bond, owner),
	}
}

const companion = (update: Partial<Companion>): Companion => ({
	id: 'c1',
	name: 'Snapjaw',
	markdown: '',
	currentHP: 10,
	maxHP: 20,
	wounds: 1,
	...update,
})

/**
 * A crocodile imported by an old builder: the pre-M13 `**Diet:** undefined` line
 * and a Death Roll from before it became a Quick Action follow-up.
 */
const LEGACY_CROCODILE = (() => {
	const { markdown } = builderOutput('Crocodile', 2, 'Medium', undefined)
	return markdown
		.replace(
			/- \*\*Death Roll\.\*\*[^\n]*/,
			'- **Death Roll.** While grappling a target, this creature can use their Action to roll, dealing normal weapon damage.',
		)
		.replace('**Skills:**', '**Diet:** undefined\n\n**Skills:**')
})()

describe('parseCompanionBuild', () => {
	it('recovers the commission from a legacy builder block', () => {
		expect(LEGACY_CROCODILE).toContain('**Diet:** undefined')
		expect(parseCompanionBuild(LEGACY_CROCODILE)).toEqual({
			trait: 'Crocodile',
			tier: 2,
			size: 'Medium',
			rank2Choice: null,
			rank3Choice: null,
			combatArts: [],
			wildCompanion: false,
			wildCompanionRank: 1,
		})
	})

	it('reads the Bond line and the Combat Arts back', () => {
		const { markdown, build } = builderOutput('Bear', 2, 'Medium', OWNER, {
			rank2Choice: 'combat-arts',
			rank3Choice: 'damage',
			combatArts: ['Feint', 'Brutal Strike'],
			wildCompanionRank: 2,
		})
		expect(parseCompanionBuild(markdown)).toEqual(build)
	})

	it('does not claim a hand-written block', () => {
		expect(
			parseCompanionBuild(
				'#### **Ashfoot** (Medium Beast)\n\n**Tier:** 2 (Veteran)\n\n| HP | AV |',
			),
		).toBeNull()
		expect(parseCompanionBuild('A loyal dog named Rex.')).toBeNull()
		// A real creature at a size its tier cannot reach.
		expect(
			parseCompanionBuild(
				'#### **Bear** (Huge Animal)\n\n**Tier:** 1 (Capable)',
			),
		).toBeNull()
	})
})

describe('migrateCharacterData', () => {
	const migrate = (companions: Companion[]) =>
		migrateCharacterData({
			companions,
		} as unknown as CharacterDocument).companions

	it('gives a legacy builder companion a build and leaves its block alone', () => {
		const [migrated] = migrate([companion({ markdown: LEGACY_CROCODILE })])
		expect(migrated.build?.trait).toBe('Crocodile')
		expect(migrated.markdown).toBe(LEGACY_CROCODILE)
		expect(migrated.currentHP).toBe(10)
		expect(migrated.maxHP).toBe(20)
	})

	it('leaves a hand-written companion without a build', () => {
		const [migrated] = migrate([
			companion({ markdown: '#### **Rex** (Medium Dog)\n\n**Tier:** 1' }),
		])
		expect(migrated.build).toBeUndefined()
	})

	it('keeps a build that is already there', () => {
		const build: CompanionBuild = {
			...parseCompanionBuild(LEGACY_CROCODILE)!,
			tier: 1,
			size: 'Small',
		}
		const [migrated] = migrate([
			companion({ markdown: LEGACY_CROCODILE, build }),
		])
		expect(migrated.build).toBe(build)
	})
})

describe('regenerateCompanion', () => {
	it('reproduces the builder’s output exactly', () => {
		const { markdown, build } = builderOutput('Bear', 3, 'Large', OWNER, {
			rank2Choice: 'combat-arts',
			rank3Choice: 'pack-coordination',
			combatArts: ['Feint'],
			wildCompanion: true,
			wildCompanionRank: 3,
		})
		const regenerated = regenerateCompanion(build, OWNER)!
		expect(regenerated.markdown).toBe(markdown)
		expect(regenerated.build).toEqual(build)
	})

	it('takes the owner values from the current character', () => {
		const { build } = builderOutput('Bear', 2, 'Medium', {
			talentRank: 1,
			nature: 2,
			knowsWildCompanion: false,
		})
		const character = {
			skills: {
				skills: [{ id: 'n', name: 'Nature', rank: 4, xp: 0 }],
				abilities: [
					{
						id: 't',
						title: 'Animal Companion',
						description: '',
						tag: 'Talent',
						rank: 1,
					},
				],
			},
			spells: { spells: [] },
		} as unknown as Character
		const regenerated = regenerateCompanion(
			build,
			ownerFromCharacter(character),
		)!
		expect(regenerated.markdown).toContain('the owner’s Nature (4)')
		expect(regenerated.build.builtWith?.nature).toBe(4)
	})

	it('drops saved choices the owner can no longer make', () => {
		const { build } = builderOutput('Bear', 2, 'Medium', OWNER, {
			rank2Choice: 'combat-arts',
			rank3Choice: 'damage',
			combatArts: ['Feint'],
			wildCompanion: true,
		})
		const demoted: CompanionOwner = {
			talentRank: 1,
			nature: 3,
			knowsWildCompanion: false,
		}
		expect(bondFromBuild(build, demoted)).toMatchObject({
			talentRank: 1,
			rank2Choice: null,
			rank3Choice: null,
			combatArts: [],
			wildCompanion: false,
		})
		const regenerated = regenerateCompanion(build, demoted)!
		expect(regenerated.markdown).not.toContain('**Combat Arts:**')
		expect(regenerated.markdown).not.toContain('+ 4 bonus')
		expect(regenerated.build).toMatchObject({
			rank2Choice: null,
			rank3Choice: null,
			combatArts: [],
			wildCompanion: false,
		})
	})

	it('returns null for a creature that is gone', () => {
		const build = parseCompanionBuild(LEGACY_CROCODILE)!
		expect(regenerateCompanion({ ...build, trait: 'Dodo' }, OWNER)).toBeNull()
	})
})

describe('computeCompanionUpdates', () => {
	it('offers the legacy crocodile its new Death Roll', () => {
		const legacy = companion({
			markdown: LEGACY_CROCODILE,
			build: parseCompanionBuild(LEGACY_CROCODILE)!,
		})
		const [update] = computeCompanionUpdates([legacy], undefined)
		expect(update.id).toBe('c1')
		expect(update.trait).toBe('Crocodile')
		const fields = update.changes.map((change) => change.field)
		expect(fields).toContain('Attacks')
		expect(fields).toContain('Diet')
		const attacks = update.changes.find((change) => change.field === 'Attacks')!
		expect(attacks.before).toContain('use their Action to roll')
		expect(attacks.after).toContain('Quick Action')
	})

	it('offers nothing for an up-to-date or hand-written companion', () => {
		const current = builderOutput('Crocodile', 2, 'Medium', OWNER)
		expect(
			computeCompanionUpdates(
				[
					// Whitespace differences alone do not count.
					companion({
						markdown: current.markdown.replace(/\n/g, '\n\n'),
						build: current.build,
					}),
					companion({ id: 'c2', markdown: '#### **Rex** (Medium Dog)' }),
				],
				OWNER,
			),
		).toEqual([])
	})

	it('flags a companion whose owner gained a Nature rank', () => {
		const current = builderOutput('Crocodile', 2, 'Medium', OWNER)
		const [update] = computeCompanionUpdates(
			[companion({ markdown: current.markdown, build: current.build })],
			{ ...OWNER, nature: 4 },
		)
		expect(update.changes.map((change) => change.field)).toEqual(
			expect.arrayContaining(['Bond', 'Abilities']),
		)
	})
})

describe('applyCompanionBuild', () => {
	it('keeps name, id and wounds, and clamps current HP to the new max', () => {
		const { markdown, build } = builderOutput('Crocodile', 1, 'Small', OWNER)
		const before = companion({ currentHP: 18, maxHP: 20, wounds: 1 })
		const after = applyCompanionBuild(before, { markdown, build })
		expect(after.id).toBe('c1')
		expect(after.name).toBe('Snapjaw')
		expect(after.wounds).toBe(1)
		expect(after.maxHP).toBe(10)
		expect(after.currentHP).toBe(10)
		expect(after.markdown).toBe(markdown)
		expect(after.build).toBe(build)
	})

	it('does not heal when the max goes up', () => {
		const { markdown, build } = builderOutput('Crocodile', 3, 'Large', OWNER)
		const after = applyCompanionBuild(companion({ currentHP: 4, maxHP: 20 }), {
			markdown,
			build,
		})
		expect(after.maxHP).toBe(30)
		expect(after.currentHP).toBe(4)
	})
})
