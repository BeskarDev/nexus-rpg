import { describe, it, expect } from 'vitest'
import { createInitialCharacter } from '@site/src/features/CharacterSheet/utils/createInitialCharacter'
import type { ArchetypeData } from '@site/src/features/CharacterSheet/components'
import archetypesJson from '@site/src/utils/json/archetypes.json'

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
			(a) => a.name === 'Barbarian'
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
			(a) => a.name === 'Ranger'
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
			(a) => a.name === 'Sorcerer'
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
			(a) => a.name === 'Fighter'
		) as ArchetypeData

		const character = createInitialCharacter('Test Fighter', 'Test Player', {
			archetype: fighterArchetype,
		})

		// Check that talents are added individually with 'Talent' tag
		const talentAbilities = character.skills.abilities.filter((a) => a.tag === 'Talent')
		const talentNames = talentAbilities.map(a => a.title)
		
		expect(talentNames).toContain('Shield Mastery')
		expect(talentNames).toContain('Stand your Ground')
		expect(talentNames).toContain('Second Wind')
	})

	it('should calculate correct initial HP based on archetype strength', () => {
		const barbarianArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Barbarian'
		) as ArchetypeData

		const character = createInitialCharacter('Test Barbarian', 'Test Player', {
			archetype: barbarianArchetype,
		})

		// HP should be 12 (base) + 8 (STR) + 2 (Bulky talent rank 1) = 22
		expect(character.statistics.health.current).toBe(22)
	})

	it('should use default attributes when no archetype selected', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {})

		expect(character.statistics.strength.value).toBe(6)
		expect(character.statistics.agility.value).toBe(6)
		expect(character.statistics.spirit.value).toBe(6)
		expect(character.statistics.mind.value).toBe(6)
		expect(character.statistics.health.current).toBe(18) // 12 + 6
	})

	it('should combine archetype skills with upbringing and background skills', () => {
		const rogueArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Rogue'
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
		const stealthCount = skillNames.filter(s => s === 'Stealth').length
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

	it('should create familiar for Summoner with Conjure Familiar spell', () => {
		const summonerArchetype: ArchetypeData = archetypesJson.find(
			(a) => a.name === 'Summoner'
		) as ArchetypeData

		const character = createInitialCharacter('Test Summoner', 'Test Player', {
			archetype: summonerArchetype,
			selectedFamiliar: 'Bat',
		})

		// Should have Conjure Familiar spell
		const hasConjureFamiliar = character.spells.spells.some(
			spell => spell.name === 'Conjure Familiar'
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
			(a) => a.name === 'Summoner'
		) as ArchetypeData

		const character = createInitialCharacter('Test Summoner', 'Test Player', {
			archetype: summonerArchetype,
			// No selectedFamiliar provided
		})

		// Should have Conjure Familiar spell
		const hasConjureFamiliar = character.spells.spells.some(
			spell => spell.name === 'Conjure Familiar'
		)
		expect(hasConjureFamiliar).toBe(true)

		// Should NOT have a companion because no familiar was selected
		expect(character.companions.length).toBe(0)
	})
})
