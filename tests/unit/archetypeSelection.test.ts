import { describe, it, expect } from 'vitest'
import { createInitialCharacter } from '@site/src/features/CharacterSheet/utils/createInitialCharacter'
import type { ArchetypeData } from '@site/src/features/CharacterSheet/components'
import archetypesJson from '@site/src/utils/data/json/archetypes.json'
import weaponsJson from '@site/src/utils/data/json/weapons.json'
import armorJson from '@site/src/utils/data/json/armor.json'
import equipmentJson from '@site/src/utils/data/json/equipment.json'

describe('Archetype Selection', () => {
	it('should load all 25 archetypes from JSON', () => {
		expect(archetypesJson).toBeDefined()
		expect(archetypesJson.length).toBe(25)
	})

	it('should have valid structure for each archetype', () => {
		archetypesJson.forEach((archetype) => {
			expect(archetype).toHaveProperty('name')
			expect(archetype).toHaveProperty('role')
			expect(archetype).toHaveProperty('description')
			expect(archetype).toHaveProperty('bestFor')
			expect(archetype).toHaveProperty('primarySkills')
			expect(archetype).toHaveProperty('attributes')
			expect(archetype).toHaveProperty('suggestedSkills')
			expect(archetype).toHaveProperty('recommendedTalents')
			expect(archetype).toHaveProperty('startingEquipment')
			expect(archetype).toHaveProperty('playstyle')
			expect(archetype).toHaveProperty('advancement')

			// M22 D2: a talent carries the gloss its docs page prints beside it
			archetype.recommendedTalents.forEach((talent) => {
				expect(talent.name).toBeTruthy()
				expect(talent.gloss).toBeTruthy()
			})

			// M22 D4: equipment is a catalogue reference, never a display string
			archetype.startingEquipment.forEach((entry) => {
				expect(entry.item).toBeTruthy()
				expect(entry.item).not.toMatch(/\sx\d+$/)
			})

			// Validate attributes
			expect(archetype.attributes).toHaveProperty('STR')
			expect(archetype.attributes).toHaveProperty('AGI')
			expect(archetype.attributes).toHaveProperty('SPI')
			expect(archetype.attributes).toHaveProperty('MND')

			// Validate attribute values are valid die sizes
			const validDieSizes = [4, 6, 8, 10, 12]
			expect(validDieSizes).toContain(archetype.attributes.STR)
			expect(validDieSizes).toContain(archetype.attributes.AGI)
			expect(validDieSizes).toContain(archetype.attributes.SPI)
			expect(validDieSizes).toContain(archetype.attributes.MND)
		})
	})

	it('should create character with archetype attributes', () => {
		const barbarianArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Barbarian',
		) as ArchetypeData

		const character = createInitialCharacter('Test Barbarian', 'Test Player', {
			archetype: barbarianArchetype,
		})

		expect(character.statistics.strength.value).toBe(8)
		expect(character.statistics.agility.value).toBe(6)
		expect(character.statistics.spirit.value).toBe(6)
		expect(character.statistics.mind.value).toBe(4)
	})

	it('should create character with archetype skills', () => {
		const rangerArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Ranger',
		) as ArchetypeData

		const character = createInitialCharacter('Test Ranger', 'Test Player', {
			archetype: rangerArchetype,
		})

		const skillNames = character.skills.skills.map((s) => s.name)
		expect(skillNames).toContain('Archery')
		expect(skillNames).toContain('Survival')
		expect(skillNames).toContain('Nature')
	})

	it('should add archetype information to character notes', () => {
		const sorcererArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Sorcerer',
		) as ArchetypeData

		const character = createInitialCharacter('Test Sorcerer', 'Test Player', {
			archetype: sorcererArchetype,
		})

		expect(character.personal.description).toContain('Sorcerer')
		expect(character.personal.description).toContain('Striker')
		expect(character.personal.notes).toContain('Archetype: Sorcerer')
		expect(character.personal.notes).toContain('Devastating offensive magic')
	})

	it('should add recommended talents to abilities', () => {
		const fighterArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Fighter',
		) as ArchetypeData

		const character = createInitialCharacter('Test Fighter', 'Test Player', {
			archetype: fighterArchetype,
		})

		// Check that talents are added individually with 'Talent' tag
		const talentAbilities = character.skills.abilities.filter(
			(a) => a.tag === 'Talent',
		)
		const talentNames = talentAbilities.map((a) => a.title)

		// Data-driven: the sheet must carry whatever the archetype recommends, so a
		// design change to the Fighter's talents is not a test failure. Naming them
		// here meant every archetype review broke this test.
		const recommended = fighterArchetype.recommendedTalents.map((t) => t.name)
		expect(recommended.length).toBe(3)
		for (const name of recommended) expect(talentNames).toContain(name)
	})

	it('should calculate correct initial HP based on archetype strength', () => {
		const barbarianArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Barbarian',
		) as ArchetypeData

		const character = createInitialCharacter('Test Barbarian', 'Test Player', {
			archetype: barbarianArchetype,
		})

		// HP should be 12 (base) + 8 (STR) + 2 (Bulky talent rank 1) = 22
		expect(character.statistics.health.current).toBe(22)
	})

	it('should use default attributes when no archetype selected', () => {
		const character = createInitialCharacter(
			'Test Character',
			'Test Player',
			{},
		)

		expect(character.statistics.strength.value).toBe(6)
		expect(character.statistics.agility.value).toBe(6)
		expect(character.statistics.spirit.value).toBe(6)
		expect(character.statistics.mind.value).toBe(6)
		expect(character.statistics.health.current).toBe(18) // 12 + 6
	})

	it('should combine archetype skills with upbringing and background skills', () => {
		const rogueArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Rogue',
		) as ArchetypeData

		const character = createInitialCharacter('Test Rogue', 'Test Player', {
			archetype: rogueArchetype,
			upbringing: {
				name: 'Criminal',
				description: 'Street-raised',
				'suggested skills': 'Insight, Stealth, Streetwise',
			} as any,
		})

		const skillNames = character.skills.skills.map((s) => s.name)

		// Should have archetype skills
		expect(skillNames).toContain('Fighting')
		expect(skillNames).toContain('Stealth')
		expect(skillNames).toContain('Streetwise')

		// Should have upbringing skills (no duplicates)
		expect(skillNames).toContain('Insight')

		// Should not have duplicates
		const stealthCount = skillNames.filter((s) => s === 'Stealth').length
		expect(stealthCount).toBe(1)
	})

	it('should have all major archetypes represented', () => {
		const archetypeNames = archetypesJson.map((a) => a.name)

		// Check for key archetypes mentioned in the documentation
		const keyArchetypes = [
			'Barbarian',
			'Fighter',
			'Ranger',
			'Rogue',
			'Sorcerer',
			'Priest',
			'Druid',
			'Monk',
			'Champion',
			'Warlock',
		]

		keyArchetypes.forEach((name) => {
			expect(archetypeNames).toContain(name)
		})
	})

	it('should resolve every equipment reference against the catalogues', () => {
		// M22 F5: nine names resolved to nothing before the migration, so the
		// sheet silently created no item for them.
		const catalogue = new Set([
			...weaponsJson.map((w) => w.name),
			...armorJson.map((a) => a.name),
			...equipmentJson.map((e) => e.name),
		])
		archetypesJson.forEach((archetype) => {
			archetype.startingEquipment.forEach((entry) => {
				expect(
					catalogue.has(entry.item),
					`${archetype.name}: unresolved item "${entry.item}"`,
				).toBe(true)
			})
			if (archetype.toolkit) {
				expect(
					catalogue.has(archetype.toolkit),
					`${archetype.name}: unresolved toolkit "${archetype.toolkit}"`,
				).toBe(true)
			}
		})
	})

	it('should recommend exactly the number of combat arts the rules grant', () => {
		// M22 D9 / 02-character-creation.md: two per weapon skill at rank 1, one
		// at rank 0, summed over Fighting and Archery.
		archetypesJson.forEach((archetype) => {
			const suggested = archetype.suggestedSkills
				.split(',')
				.map((s) => s.trim())
			const required =
				(['Fighting', 'Archery'] as const)
					.filter((skill) => suggested.includes(skill))
					.reduce(
						(sum, skill) =>
							sum + (archetype.primarySkills.includes(skill) ? 2 : 1),
						0,
					) +
				// Art of Fighting rank 1 grants two more melee arts.
				(archetype.recommendedTalents.some((t) => t.name === 'Art of Fighting')
					? 2
					: 0)
			expect(
				archetype.recommendedCombatArts?.length ?? 0,
				`${archetype.name} should recommend ${required} combat arts`,
			).toBe(required)
		})
	})

	it('should give a devotion caster only its chosen option, not every option', () => {
		// M22 F7: the flattened array started a Champion with all 12 spells.
		const champion: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Champion',
		) as ArchetypeData

		const character = createInitialCharacter('Test Champion', 'Test Player', {
			archetype: champion,
			selectedSpellPath: 'War',
		})

		const names = character.spells.spells.map((s) => s.name)
		expect(champion.spellData?.mode).toBe('devotion')
		expect(names).toContain('Battle Surge')
		expect(names).not.toContain('Dazzling Light')
		expect(names.length).toBe(6)
	})

	it('should size an Arcana focus pool off Mind, not Spirit', () => {
		// M22 F11: every Arcana caster got a Spirit-based pool.
		const sorcerer: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Sorcerer',
		) as ArchetypeData

		const character = createInitialCharacter('Test Sorcerer', 'Test Player', {
			archetype: sorcerer,
		})

		// Sorcerer is MND d8, SPI d6 — (8 - 2) + 2 = 8
		expect(character.spells.focus.total).toBe(8)
	})

	it('should create familiar for Summoner with Conjure Familiar spell', () => {
		const summonerArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Summoner',
		) as ArchetypeData

		const character = createInitialCharacter('Test Summoner', 'Test Player', {
			archetype: summonerArchetype,
			selectedFamiliar: 'Bat',
		})

		// Should have Conjure Familiar spell
		const hasConjureFamiliar = character.spells.spells.some(
			(spell) => spell.name === 'Conjure Familiar',
		)
		expect(hasConjureFamiliar).toBe(true)

		// Should have a familiar companion
		expect(character.companions.length).toBeGreaterThan(0)
		const familiar = character.companions[0]
		expect(familiar.name).toBe('Bat')
		expect(familiar.markdown).toBeDefined()
		expect(familiar.markdown.length).toBeGreaterThan(0)
		expect(familiar.currentHP).toBeGreaterThan(0)
		expect(familiar.maxHP).toBeGreaterThan(0)
	})

	it('should not create familiar when none is selected', () => {
		const summonerArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Summoner',
		) as ArchetypeData

		const character = createInitialCharacter('Test Summoner', 'Test Player', {
			archetype: summonerArchetype,
			// No selectedFamiliar provided
		})

		// Should have Conjure Familiar spell
		const hasConjureFamiliar = character.spells.spells.some(
			(spell) => spell.name === 'Conjure Familiar',
		)
		expect(hasConjureFamiliar).toBe(true)

		// Should NOT have a companion because no familiar was selected
		expect(character.companions.length).toBe(0)
	})
})
