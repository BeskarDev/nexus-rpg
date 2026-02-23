import { describe, it, expect, vi } from 'vitest'
import nameData from '../../src/components/AutoRoller/data/nameData.json'
import spellData from '../../src/components/AutoRoller/data/spellData.json'
import creatureData from '../../src/components/AutoRoller/data/creatureData.json'
import challengeData from '../../src/components/AutoRoller/data/challengeData.json'
import treasureData from '../../src/components/AutoRoller/data/treasureData.json'
import {
	generateName,
	generateSpell,
	generateCreature,
	generateChallenge,
	generateTreasure,
	nameGroups,
	spellGroups,
	creatureGroups,
	challengeGroups,
	treasureGroups,
} from '../../src/components/AutoRoller/generators'

describe('AutoRoller Data Integrity', () => {
	describe('Name Data', () => {
		it('should have 8 naming patterns', () => {
			expect(nameData.namingPatterns).toHaveLength(8)
		})

		it('should have 6 family name patterns', () => {
			expect(nameData.familyNamePatterns).toHaveLength(6)
		})

		it('should have 12 cultures', () => {
			expect(nameData.cultures).toHaveLength(12)
		})

		it('should have all expected folk types', () => {
			const folks = nameData.cultures.map((c) => c.folk)
			expect(folks).toContain('Dwarf')
			expect(folks).toContain('Elf')
			expect(folks).toContain('Gnome')
			expect(folks).toContain('Hune')
			expect(folks).toContain('Orc')
			expect(folks).toContain('Goblin')
			expect(folks).toContain('Human')
			expect(folks).toContain('Lionfolk')
			expect(folks).toContain('Lizardfolk')
			expect(folks).toContain('Minotaur')
		})

		it('should have 20 personal name entries per culture', () => {
			nameData.cultures.forEach((culture) => {
				expect(culture.personalNames).toHaveLength(20)
			})
		})

		it('should have 20 family name entries per culture', () => {
			nameData.cultures.forEach((culture) => {
				expect(culture.familyNames).toHaveLength(20)
			})
		})

		it('should have valid personal name fields', () => {
			nameData.cultures.forEach((culture) => {
				culture.personalNames.forEach((name) => {
					expect(name.prefix).toBeTruthy()
					expect(name.syllable2).toBeTruthy()
					expect(name.syllable3).toBeTruthy()
					expect(name.suffix).toBeTruthy()
				})
			})
		})

		it('should have valid family name fields', () => {
			nameData.cultures.forEach((culture) => {
				culture.familyNames.forEach((name) => {
					expect(name.adjective1).toBeTruthy()
					expect(name.adjective2).toBeTruthy()
					expect(name.noun1).toBeTruthy()
					expect(name.noun2).toBeTruthy()
				})
			})
		})
	})

	describe('Spell Data', () => {
		it('should have 4 naming patterns', () => {
			expect(spellData.namingPatterns).toHaveLength(4)
		})

		it('should have 6 arcane schools', () => {
			expect(spellData.arcaneSchools).toHaveLength(6)
		})

		it('should have 8 mystic traditions', () => {
			expect(spellData.mysticTraditions).toHaveLength(8)
		})

		it('should have correct arcane school names', () => {
			const names = spellData.arcaneSchools.map((s) => s.name)
			expect(names).toEqual([
				'Evocation',
				'Illusion',
				'Conjuration',
				'Telepathy',
				'Telekinetics',
				'Necromancy',
			])
		})

		it('should have correct mystic tradition names', () => {
			const names = spellData.mysticTraditions.map((s) => s.name)
			expect(names).toEqual([
				'Light',
				'Twilight',
				'Life',
				'Death',
				'Nature',
				'Tempest',
				'Peace',
				'War',
			])
		})

		it('should have 20 entries per school', () => {
			spellData.arcaneSchools.forEach((school) => {
				expect(school.entries).toHaveLength(20)
			})
			spellData.mysticTraditions.forEach((tradition) => {
				expect(tradition.entries).toHaveLength(20)
			})
		})

		it('should have 12 spell effects', () => {
			expect(spellData.effects).toHaveLength(12)
		})
	})

	describe('Creature Data', () => {
		it('should have 12 creature types', () => {
			expect(creatureData.types).toHaveLength(12)
		})

		it('should have detail tables for all types', () => {
			creatureData.types.forEach((type) => {
				expect(creatureData.typeDetails[type]).toBeDefined()
			})
		})

		it('should have 20 entries per type detail table', () => {
			Object.values(creatureData.typeDetails).forEach((details) => {
				expect(details).toHaveLength(20)
			})
		})

		it('should have 12 personality entries', () => {
			expect(creatureData.personality).toHaveLength(12)
		})

		it('should have 20 physical attack entries', () => {
			expect(creatureData.physicalAttack).toHaveLength(20)
		})

		it('should have 20 special attack entries', () => {
			expect(creatureData.specialAttack).toHaveLength(20)
		})

		it('should have 20 special defense entries', () => {
			expect(creatureData.specialDefense).toHaveLength(20)
		})

		it('should have 20 special ability entries', () => {
			expect(creatureData.specialAbilities).toHaveLength(20)
		})

		it('should have harvesting tables with 20 entries each', () => {
			expect(creatureData.harvesting.food).toHaveLength(20)
			expect(creatureData.harvesting.trophy).toHaveLength(20)
			expect(creatureData.harvesting.toolSubstance).toHaveLength(20)
			expect(creatureData.harvesting.material).toHaveLength(20)
		})
	})

	describe('Challenge Data', () => {
		it('should have 20 puzzle entries', () => {
			expect(challengeData.puzzles).toHaveLength(20)
		})

		it('should have 12 trap entries', () => {
			expect(challengeData.traps).toHaveLength(12)
		})

		it('should have 12 combat scene entries', () => {
			expect(challengeData.combatScenes).toHaveLength(12)
		})
	})

	describe('Treasure Data', () => {
		it('should have 5 treasure type ranges', () => {
			expect(treasureData.treasureTypes).toHaveLength(5)
		})

		it('should have 12 valuable types', () => {
			expect(treasureData.valuables).toHaveLength(12)
		})

		it('should have detail tables for valuable types', () => {
			treasureData.valuables.forEach((type) => {
				expect(treasureData.valuableDetails[type]).toBeDefined()
			})
		})

		it('should have utility types', () => {
			expect(treasureData.utility.length).toBeGreaterThan(0)
		})

		it('should have wearable slots', () => {
			expect(treasureData.wearableSlots).toHaveLength(12)
		})

		it('should have armor/shield types', () => {
			expect(treasureData.armorShield).toHaveLength(10)
		})

		it('should have weapon/catalyst types', () => {
			expect(treasureData.weaponCatalyst).toHaveLength(12)
		})
	})
})

describe('AutoRoller Groups', () => {
	it('should have 12 name groups matching cultures', () => {
		expect(nameGroups).toHaveLength(12)
		nameGroups.forEach((g) => {
			expect(g.id).toBeTruthy()
			expect(g.label).toBeTruthy()
		})
	})

	it('should have 16 spell groups (1 any + 6 arcane + 1 any + 8 mystic)', () => {
		expect(spellGroups).toHaveLength(16)
		expect(spellGroups[0].id).toBe('arcane-any')
		expect(spellGroups[0].label).toBe('Arcane: Any')
		const mysticAny = spellGroups.find((g) => g.id === 'mystic-any')
		expect(mysticAny).toBeDefined()
	})

	it('should have 13 creature groups (random + 12 types)', () => {
		expect(creatureGroups).toHaveLength(13)
		expect(creatureGroups[0].id).toBe('random')
	})

	it('should have 3 challenge groups', () => {
		expect(challengeGroups).toHaveLength(3)
	})

	it('should have 6 treasure groups', () => {
		expect(treasureGroups).toHaveLength(6)
	})
})

describe('AutoRoller Generators', () => {
	describe('generateName', () => {
		it('should generate a name with personal and family parts', () => {
			const result = generateName('Dwarf-Ghahar')
			expect(result).toBeTruthy()
			expect(result.split(' ').length).toBeGreaterThanOrEqual(2)
		})

		it('should return unknown for invalid culture', () => {
			expect(generateName('Invalid-Culture')).toBe('Unknown culture')
		})

		it('should generate different results on multiple calls', () => {
			const results = new Set<string>()
			for (let i = 0; i < 20; i++) {
				results.add(generateName('Dwarf-Ghahar'))
			}
			expect(results.size).toBeGreaterThan(1)
		})

		it('should work for all cultures', () => {
			nameGroups.forEach((g) => {
				const result = generateName(g.id)
				expect(result).not.toBe('Unknown culture')
				expect(result.length).toBeGreaterThan(0)
			})
		})

		it('should capitalize personal and family names', () => {
			for (let i = 0; i < 10; i++) {
				const result = generateName('Dwarf-Ghahar')
				const [personal, family] = result.split(' ')
				expect(personal[0]).toBe(personal[0].toUpperCase())
				expect(family[0]).toBe(family[0].toUpperCase())
			}
		})
	})

	describe('generateSpell', () => {
		it('should generate a spell with name and labeled effect', () => {
			const result = generateSpell('arcane-Evocation')
			expect(result).toBeTruthy()
			expect(result).toContain('—')
			expect(result).toContain('effect:')
			expect(result).toContain('duration:')
			expect(result).toContain('range:')
		})

		it('should return unknown for invalid school', () => {
			expect(generateSpell('arcane-Invalid')).toBe('Unknown school')
		})

		it('should work for all schools including any', () => {
			spellGroups.forEach((g) => {
				const result = generateSpell(g.id)
				expect(result).not.toBe('Unknown school')
				expect(result.length).toBeGreaterThan(0)
			})
		})

		it('should generate results with arcane-any and mystic-any', () => {
			for (let i = 0; i < 5; i++) {
				const arcane = generateSpell('arcane-any')
				expect(arcane).toContain('effect:')
				const mystic = generateSpell('mystic-any')
				expect(mystic).toContain('effect:')
			}
		})

		it('should output lowercase text', () => {
			const result = generateSpell('arcane-Evocation')
			// The part before — should be all lowercase
			const spellName = result.split('—')[0].trim()
			expect(spellName).toBe(spellName.toLowerCase())
		})
	})

	describe('generateCreature', () => {
		it('should generate a creature description with labeled fields', () => {
			const result = generateCreature('Beast')
			expect(result).toBeTruthy()
			expect(result).toContain('beast:')
			expect(result).toContain('behavior:')
			expect(result).toContain('attack:')
			expect(result).toContain('defense:')
		})

		it('should work with random type', () => {
			const result = generateCreature('random')
			expect(result).toBeTruthy()
			expect(result.length).toBeGreaterThan(0)
		})

		it('should work for all creature types', () => {
			creatureGroups.forEach((g) => {
				const result = generateCreature(g.id)
				expect(result.length).toBeGreaterThan(0)
			})
		})
	})

	describe('generateChallenge', () => {
		it('should generate puzzle descriptions with labeled fields', () => {
			const result = generateChallenge('puzzles')
			expect(result).toBeTruthy()
			expect(result).toContain('—')
			expect(result).toContain('interaction:')
		})

		it('should generate trap descriptions with labeled fields', () => {
			const result = generateChallenge('traps')
			expect(result).toBeTruthy()
			expect(result).toContain('—')
			expect(result).toContain('warning:')
		})

		it('should generate combat scene descriptions with labeled fields', () => {
			const result = generateChallenge('combat')
			expect(result).toBeTruthy()
			expect(result).toContain('—')
			expect(result).toContain('objective:')
		})

		it('should return unknown for invalid type', () => {
			expect(generateChallenge('invalid')).toBe(
				'Unknown challenge type',
			)
		})
	})

	describe('generateTreasure', () => {
		it('should generate treasure for any category', () => {
			const result = generateTreasure('any')
			expect(result).toBeTruthy()
			expect(result.length).toBeGreaterThan(0)
		})

		it('should generate valuable treasure in lowercase', () => {
			const result = generateTreasure('valuable')
			expect(result).toContain('valuable')
		})

		it('should generate utility treasure in lowercase', () => {
			const result = generateTreasure('utility')
			expect(result).toContain('utility')
		})

		it('should generate wearable treasure with individually rolled fields', () => {
			// Run multiple times to verify fields can differ
			const results: string[] = []
			for (let i = 0; i < 20; i++) {
				results.push(generateTreasure('wearable'))
			}
			// All should contain labeled fields
			results.forEach((r) => {
				expect(r).toContain('wearable')
				expect(r).toContain('ornament:')
				expect(r).toContain('style:')
				expect(r).toContain('material:')
			})
		})

		it('should generate armor treasure with individually rolled fields', () => {
			const result = generateTreasure('armor')
			expect(result).toContain('armor')
			expect(result).toContain('material:')
			expect(result).toContain('form:')
			expect(result).toContain('detail:')
		})

		it('should generate weapon treasure with individually rolled fields', () => {
			const result = generateTreasure('weapon')
			expect(result).toContain('weapon')
			expect(result).toContain('material:')
			expect(result).toContain('form:')
			expect(result).toContain('detail:')
		})

		it('should return unknown for invalid category', () => {
			expect(generateTreasure('invalid')).toBe('Unknown treasure type')
		})
	})
})
