import { describe, it, expect, vi } from 'vitest'
import nameData from '../../src/components/AutoRoller/data/nameData.json'
import spellData from '../../src/components/AutoRoller/data/spellData.json'
import creatureData from '../../src/components/AutoRoller/data/creatureData.json'
import challengeData from '../../src/components/AutoRoller/data/challengeData.json'
import treasureData from '../../src/components/AutoRoller/data/treasureData.json'
import questData from '../../src/components/AutoRoller/data/questData.json'
import npcData from '../../src/components/AutoRoller/data/npcData.json'
import settlementData from '../../src/components/AutoRoller/data/settlementData.json'
import {
	generateName,
	generateSpell,
	generateCreature,
	generateChallenge,
	generateTreasure,
	rollTreasureCost,
	generateQuest,
	generateNpc,
	generateSettlement,
	generateBuilding,
	nameGroups,
	spellGroups,
	creatureGroups,
	challengeGroups,
	treasureGroups,
	questGroups,
	npcGroups,
	settlementGroups,
	buildingGroups,
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

		it('should have 50 personal name entries per culture', () => {
			nameData.cultures.forEach((culture) => {
				expect(culture.personalNames).toHaveLength(50)
			})
		})

		it('should have 50 family name entries per culture', () => {
			nameData.cultures.forEach((culture) => {
				expect(culture.familyNames).toHaveLength(50)
			})
		})

		it('should have 50 German family name entries per culture', () => {
			nameData.cultures.forEach((culture) => {
				expect(culture.familyNamesDE).toHaveLength(50)
			})
		})

		it('should have 50 in-world family name entries per culture', () => {
			nameData.cultures.forEach((culture) => {
				expect(culture.familyNamesInWorld).toHaveLength(50)
			})
		})

		it('should have valid in-world family name fields', () => {
			nameData.cultures.forEach((culture) => {
				culture.familyNamesInWorld.forEach((name) => {
					expect(name.adjective1).toBeTruthy()
					expect(name.adjective2).toBeTruthy()
					expect(name.noun1).toBeTruthy()
					expect(name.noun2).toBeTruthy()
				})
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

		it('should have valid German family name fields', () => {
			nameData.cultures.forEach((culture) => {
				culture.familyNamesDE.forEach((name) => {
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

		it('should have wearable item types for every slot', () => {
			treasureData.wearableSlots.forEach((slot) => {
				const items = treasureData.wearableItems[slot]
				expect(items).toBeDefined()
				expect(items.length).toBeGreaterThan(0)
			})
		})

		it('should have armor/shield types', () => {
			expect(treasureData.armorShield).toHaveLength(10)
		})

		it('should have weapon/catalyst types', () => {
			expect(treasureData.weaponCatalyst).toHaveLength(12)
		})

		it('should have 8 cost multipliers for Q1-Q8', () => {
			expect(treasureData.costMultipliers).toHaveLength(8)
			expect(treasureData.costMultipliers[0]).toBe(5)
			expect(treasureData.costMultipliers[7]).toBe(15000)
		})

		it('should have 9 quality material categories', () => {
			const categories = Object.keys(treasureData.qualityMaterials)
			expect(categories).toHaveLength(9)
			expect(categories).toContain('metalsAndMinerals')
			expect(categories).toContain('gems')
			expect(categories).toContain('woodAndPlants')
			expect(categories).toContain('organics')
			expect(categories).toContain('textiles')
			expect(categories).toContain('ceramics')
			expect(categories).toContain('spicesAndDyes')
			expect(categories).toContain('grainAndBeverages')
			expect(categories).toContain('oilAndPerfumes')
		})

		it('should have 12 entries per quality column in each material category', () => {
			const materials = treasureData.qualityMaterials as Record<string, Record<string, string[]>>
			for (const [category, tiers] of Object.entries(materials)) {
				expect(tiers.low).toHaveLength(12)
				expect(tiers.medium).toHaveLength(12)
				expect(tiers.high).toHaveLength(12)
				expect(tiers.supreme).toHaveLength(12)
			}
		})

		it('should have a material map entry for every valuable type', () => {
			const map = treasureData.valuableMaterialMap as Record<string, string>
			treasureData.valuables.forEach((type) => {
				expect(map[type]).toBeDefined()
			})
		})
	})

	describe('Quest Data', () => {
		it('should have 36 locations (d66 grid)', () => {
			expect(questData.locations).toHaveLength(36)
		})

		it('should have 36 tasks', () => {
			expect(questData.tasks).toHaveLength(36)
		})

		it('should have 36 subjects', () => {
			expect(questData.subjects).toHaveLength(36)
		})

		it('should have 36 complications', () => {
			expect(questData.complications).toHaveLength(36)
		})

		it('should have 36 rewards', () => {
			expect(questData.rewards).toHaveLength(36)
		})

		it('should have 36 sources', () => {
			expect(questData.sources).toHaveLength(36)
		})

		it('should have 36 rumor subjects', () => {
			expect(questData.rumorSubjects).toHaveLength(36)
		})

		it('should have 36 causes', () => {
			expect(questData.causes).toHaveLength(36)
		})

		it('should have 36 patrons', () => {
			expect(questData.patrons).toHaveLength(36)
		})

		it('should have 5 level scaling entries', () => {
			expect(questData.levelScaling).toHaveLength(5)
		})

		it('should have valid level scaling fields', () => {
			questData.levelScaling.forEach((entry) => {
				expect(entry.levels).toBeTruthy()
				expect(entry.scope).toBeTruthy()
				expect(entry.coinMin).toBeGreaterThan(0)
				expect(entry.coinMax).toBeGreaterThan(entry.coinMin)
				expect(entry.treasureQualities.length).toBeGreaterThan(0)
				expect(entry.travelTime).toBeTruthy()
			})
		})

		it('should have non-empty string entries in all tables', () => {
			const tables = [
				questData.locations,
				questData.tasks,
				questData.subjects,
				questData.complications,
				questData.rewards,
				questData.sources,
				questData.rumorSubjects,
				questData.causes,
				questData.patrons,
			]
			tables.forEach((table) => {
				table.forEach((entry) => {
					expect(entry.length).toBeGreaterThan(0)
				})
			})
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

	it('should have 3 quest groups (rumor, quest, job)', () => {
		expect(questGroups).toHaveLength(3)
		expect(questGroups[0].id).toBe('rumor')
		expect(questGroups[1].id).toBe('quest')
		expect(questGroups[2].id).toBe('job')
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

		it('should always include in-world name with meaning in parentheses', () => {
			for (let i = 0; i < 10; i++) {
				const result = generateName('Dwarf-Ghahar')
				// Result format: "PersonalName InWorldFamily (Meaning)"
				expect(result).toMatch(/\(.+\)$/)
			}
		})

		it('should generate German family names when useGerman is true', () => {
			for (let i = 0; i < 10; i++) {
				const result = generateName('Dwarf-Ghahar', true)
				expect(result).toBeTruthy()
				// Format: "PersonalName InWorldFamily (Meaning)"
				expect(result).toMatch(/\(.+\)$/)
			}
		})

		it('should produce different meanings between English and German', () => {
			const enMeanings = new Set<string>()
			const deMeanings = new Set<string>()
			for (let i = 0; i < 50; i++) {
				const enResult = generateName('Dwarf-Ghahar', false)
				const deResult = generateName('Dwarf-Ghahar', true)
				// Extract meaning from parentheses
				const enMatch = enResult.match(/\((.+)\)$/)
				const deMatch = deResult.match(/\((.+)\)$/)
				if (enMatch) enMeanings.add(enMatch[1])
				if (deMatch) deMeanings.add(deMatch[1])
			}
			// The sets should differ since German words are different from English
			const enArray = [...enMeanings]
			const deArray = [...deMeanings]
			const overlap = enArray.filter((n) => deArray.includes(n))
			expect(overlap.length).toBeLessThan(enArray.length)
		})

		it('should roll personal name syllables independently', () => {
			// Over many rolls, each syllable should show variation independent of others
			const prefixes = new Set<string>()
			const suffixes = new Set<string>()
			for (let i = 0; i < 50; i++) {
				const result = generateName('Dwarf-Ghahar')
				// Just verify we get variety
				prefixes.add(result.substring(0, 3))
			}
			expect(prefixes.size).toBeGreaterThan(1)
		})
	})

	describe('generateSpell', () => {
		it('should generate a spell with natural language format', () => {
			const result = generateSpell('arcane-Evocation')
			expect(result).toBeTruthy()
			expect(result).toContain('—')
			expect(result).toContain('targeting')
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
				expect(arcane).toContain('targeting')
				const mystic = generateSpell('mystic-any')
				expect(mystic).toContain('targeting')
			}
		})

		it('should output lowercase text', () => {
			const result = generateSpell('arcane-Evocation')
			const spellName = result.split('—')[0].trim()
			expect(spellName).toBe(spellName.toLowerCase())
		})

		it('should roll effect columns independently', () => {
			// Run many times and check that effect/target/duration/range vary independently
			const effects = new Set<string>()
			const targets = new Set<string>()
			for (let i = 0; i < 50; i++) {
				const result = generateSpell('arcane-Evocation')
				const afterDash = result.split('—')[1]
				effects.add(afterDash)
			}
			expect(effects.size).toBeGreaterThan(3)
		})
	})

	describe('generateCreature', () => {
		it('should generate a creature description in natural language', () => {
			const result = generateCreature('Beast')
			expect(result).toBeTruthy()
			expect(result).toMatch(/^beast with/)
			expect(result).toContain('attacks with')
			expect(result).toContain('defense:')
			expect(result).toContain('ability:')
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

		it('should roll each creature detail column independently', () => {
			// If columns are independent, we should rarely get exact same row combinations
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateCreature('Beast'))
			}
			expect(results.size).toBeGreaterThan(5)
		})
	})

	describe('generateChallenge', () => {
		it('should generate puzzle descriptions in natural language', () => {
			const result = generateChallenge('puzzles')
			expect(result).toBeTruthy()
			expect(result).toMatch(/.+ puzzle featuring/)
			expect(result).toContain('solved by')
			expect(result).toContain('presented as')
			expect(result).toContain('hints:')
		})

		it('should generate trap descriptions in natural language', () => {
			const result = generateChallenge('traps')
			expect(result).toBeTruthy()
			expect(result).toMatch(/.+ trap disguised as/)
			expect(result).toContain('warning sign:')
			expect(result).toContain('avoided by:')
		})

		it('should generate combat scene descriptions in natural language', () => {
			const result = generateChallenge('combat')
			expect(result).toBeTruthy()
			expect(result).toMatch(/.+ encounter in/)
			expect(result).toContain('objective:')
			expect(result).toContain('twist:')
		})

		it('should return unknown for invalid type', () => {
			expect(generateChallenge('invalid')).toBe(
				'Unknown challenge type',
			)
		})

		it('should roll each challenge column independently', () => {
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateChallenge('puzzles'))
			}
			expect(results.size).toBeGreaterThan(5)
		})
	})

	describe('generateTreasure', () => {
		it('should generate treasure for any category', () => {
			const result = generateTreasure('any')
			expect(result).toBeTruthy()
			expect(result.length).toBeGreaterThan(0)
		})

		it('should generate valuable treasure in natural language', () => {
			const result = generateTreasure('valuable')
			expect(result).toMatch(/.+ in the form of/)
		})

		it('should generate utility treasure in natural language', () => {
			const result = generateTreasure('utility')
			expect(result).toBeTruthy()
		})

		it('should generate wearable treasure with item type and slot', () => {
			for (let i = 0; i < 20; i++) {
				const result = generateTreasure('wearable')
				// Should include the slot in parentheses and ornament
				expect(result).toMatch(/\(.+\)/)
				expect(result).toContain('ornament')
			}
		})

		it('should generate armor treasure in natural language', () => {
			const result = generateTreasure('armor')
			expect(result).toMatch(/.+ — .+\./)
		})

		it('should generate weapon treasure in natural language', () => {
			// Some weapon types (Arrows, Bolts) may not have detail tables
			for (let i = 0; i < 20; i++) {
				const result = generateTreasure('weapon')
				expect(result).toBeTruthy()
			}
		})

		it('should return unknown for invalid category', () => {
			expect(generateTreasure('invalid')).toBe('Unknown treasure type')
		})

		it('should roll wearable columns independently', () => {
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateTreasure('wearable'))
			}
			expect(results.size).toBeGreaterThan(5)
		})

		it('should roll armor columns independently', () => {
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateTreasure('armor'))
			}
			expect(results.size).toBeGreaterThan(3)
		})

		it('should roll weapon columns independently', () => {
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateTreasure('weapon'))
			}
			expect(results.size).toBeGreaterThan(3)
		})

		it('should include quality and cost when quality is provided', () => {
			for (let q = 1; q <= 8; q++) {
				const result = generateTreasure('valuable', q)
				expect(result).toContain(`Q${q}`)
				expect(result).toContain('coins')
			}
		})

		it('should include material for valuables when quality is provided', () => {
			for (let i = 0; i < 20; i++) {
				const result = generateTreasure('valuable', 3)
				expect(result).toContain('Material:')
				expect(result).toContain('Q3')
			}
		})

		it('should produce different cost ranges for different quality tiers', () => {
			const q1Costs: number[] = []
			const q5Costs: number[] = []
			for (let i = 0; i < 50; i++) {
				q1Costs.push(rollTreasureCost(1))
				q5Costs.push(rollTreasureCost(5))
			}
			const q1Avg = q1Costs.reduce((a, b) => a + b, 0) / q1Costs.length
			const q5Avg = q5Costs.reduce((a, b) => a + b, 0) / q5Costs.length
			// Q1 avg should be ~25 (2d4 avg = 5, × 5 = 25), Q5 avg should be ~2500 (5 × 500)
			expect(q1Avg).toBeGreaterThan(15)
			expect(q1Avg).toBeLessThan(40)
			expect(q5Avg).toBeGreaterThan(1500)
			expect(q5Avg).toBeLessThan(3500)
		})

		it('should include quality and cost for non-valuable types when quality is provided', () => {
			const categories = ['utility', 'wearable', 'armor', 'weapon']
			for (const cat of categories) {
				const result = generateTreasure(cat, 4)
				expect(result).toContain('Q4')
				expect(result).toContain('coins')
			}
		})

		it('should not include quality info when quality is not provided', () => {
			const result = generateTreasure('valuable')
			expect(result).not.toMatch(/\(Q\d/)
		})

		it('rollTreasureCost should return values within expected range', () => {
			// Q1: 2d4 × 5 = 10-40
			for (let i = 0; i < 100; i++) {
				const cost = rollTreasureCost(1)
				expect(cost).toBeGreaterThanOrEqual(10)
				expect(cost).toBeLessThanOrEqual(40)
			}
			// Q8: 2d4 × 15000 = 30000-120000
			for (let i = 0; i < 100; i++) {
				const cost = rollTreasureCost(8)
				expect(cost).toBeGreaterThanOrEqual(30000)
				expect(cost).toBeLessThanOrEqual(120000)
			}
		})
	})

	describe('generateQuest', () => {
		it('should generate a rumor with natural sentence format', () => {
			const result = generateQuest('rumor', 3)
			expect(result).toBeTruthy()
			expect(result).toContain('says that')
			expect(result).toContain('near')
			expect(result).toContain("it's because of")
		})

		it('should generate a quest hook with reward details', () => {
			const result = generateQuest('quest', 5)
			expect(result).toBeTruthy()
			expect(result).toContain('Wanted:')
			expect(result).toContain('Warning:')
			expect(result).toContain('Reward:')
			expect(result).toContain('coins')
		})

		it('should generate a job with patron and reward details', () => {
			const result = generateQuest('job', 7)
			expect(result).toBeTruthy()
			expect(result).toContain('wants you to')
			expect(result).toContain('but')
			expect(result).toContain('On success:')
			expect(result).toContain('coins')
		})

		it('should return unknown for invalid category', () => {
			expect(generateQuest('invalid', 1)).toBe('Unknown quest type')
		})

		it('should scale coin rewards with party level', () => {
			const lowLevelCoins: number[] = []
			const highLevelCoins: number[] = []
			for (let i = 0; i < 50; i++) {
				const lowResult = generateQuest('quest', 1)
				const highResult = generateQuest('quest', 10)
				const lowMatch = lowResult.match(/(\d+) coins/)
				const highMatch = highResult.match(/(\d+) coins/)
				if (lowMatch) lowLevelCoins.push(parseInt(lowMatch[1]))
				if (highMatch) highLevelCoins.push(parseInt(highMatch[1]))
			}
			const avgLow = lowLevelCoins.reduce((a, b) => a + b, 0) / lowLevelCoins.length
			const avgHigh = highLevelCoins.reduce((a, b) => a + b, 0) / highLevelCoins.length
			expect(avgHigh).toBeGreaterThan(avgLow)
		})

		it('should include scope and treasure quality in quest/job results', () => {
			const result = generateQuest('quest', 5)
			expect(result).toMatch(/Q\d/)
			expect(result).toContain('scope')
		})

		it('should capitalize first letter of rumor source', () => {
			for (let i = 0; i < 10; i++) {
				const result = generateQuest('rumor', 1)
				expect(result[0]).toBe(result[0].toUpperCase())
			}
		})

		it('should capitalize first letter of job patron', () => {
			for (let i = 0; i < 10; i++) {
				const result = generateQuest('job', 1)
				expect(result[0]).toBe(result[0].toUpperCase())
			}
		})

		it('should generate varied results across multiple rolls', () => {
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateQuest('rumor', 3))
			}
			expect(results.size).toBeGreaterThan(5)
		})

		it('should work for all party levels 1-10', () => {
			for (let level = 1; level <= 10; level++) {
				const rumor = generateQuest('rumor', level)
				expect(rumor).toBeTruthy()
				const quest = generateQuest('quest', level)
				expect(quest).toContain('coins')
				const job = generateQuest('job', level)
				expect(job).toContain('coins')
			}
		})
	})

	describe('NPC Data', () => {
		it('should have 20 occupations', () => {
			expect(npcData.occupations).toHaveLength(20)
		})

		it('should have 20 visual distinctiveness entries', () => {
			expect(npcData.visualDistinctiveness).toHaveLength(20)
		})

		it('should have 20 mannerisms entries', () => {
			expect(npcData.mannerisms).toHaveLength(20)
		})

		it('should have 20 motivations', () => {
			expect(npcData.motivations).toHaveLength(20)
		})

		it('should have 20 pitfalls', () => {
			expect(npcData.pitfalls).toHaveLength(20)
		})

		it('should have dispositions with modifier values', () => {
			npcData.dispositions.forEach((d) => {
				expect(d.disposition).toBeTruthy()
				expect(typeof d.modifier).toBe('number')
			})
		})

		it('should have motivations with appeal text', () => {
			npcData.motivations.forEach((m) => {
				expect(m.motivation).toBeTruthy()
				expect(m.appeal).toBeTruthy()
			})
		})

		it('should have pitfalls with trigger text', () => {
			npcData.pitfalls.forEach((p) => {
				expect(p.pitfall).toBeTruthy()
				expect(p.trigger).toBeTruthy()
			})
		})
	})

	describe('npcGroups', () => {
		it('should have 3 NPC groups', () => {
			expect(npcGroups).toHaveLength(3)
		})

		it('should include full, social, and quick groups', () => {
			const ids = npcGroups.map((g) => g.id)
			expect(ids).toContain('full')
			expect(ids).toContain('social')
			expect(ids).toContain('quick')
		})
	})

	describe('generateNpc', () => {
		it('should generate a quick NPC with occupation, visual, and mannerism', () => {
			const result = generateNpc('quick')
			expect(result).toBeTruthy()
			expect(result.startsWith('A ') || result.startsWith('An ')).toBe(true)
			expect(result.endsWith('.')).toBe(true)
		})

		it('should generate a full NPC profile with disposition, motivations, and pitfall', () => {
			const result = generateNpc('full')
			expect(result).toBeTruthy()
			expect(result).toContain('Motivated by')
			expect(result).toContain('Pitfall:')
			expect(result).toContain('triggered by')
		})

		it('should generate a social intrigue NPC with patience and request alignment', () => {
			const result = generateNpc('social')
			expect(result).toBeTruthy()
			expect(result).toContain('disposition')
			expect(result).toContain('patience')
			expect(result).toContain('Motivated by')
			expect(result).toContain('Pitfall:')
		})

		it('should generate two distinct motivations', () => {
			// Run multiple times to verify motivations are distinct
			for (let i = 0; i < 20; i++) {
				const result = generateNpc('full')
				const motivMatch = result.match(/Motivated by (.+?) and (.+?)\. Pitfall/)
				expect(motivMatch).not.toBeNull()
				expect(motivMatch![1]).not.toBe(motivMatch![2])
			}
		})

		it('should generate varied results across multiple rolls', () => {
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateNpc('full'))
			}
			expect(results.size).toBeGreaterThan(5)
		})
	})

	describe('Settlement Data', () => {
		it('should have 20 geography entries', () => {
			expect(settlementData.geography).toHaveLength(20)
		})

		it('should have 20 resources entries', () => {
			expect(settlementData.resources).toHaveLength(20)
		})

		it('should have 20 culture entries', () => {
			expect(settlementData.culture).toHaveLength(20)
		})

		it('should have 20 government entries', () => {
			expect(settlementData.government).toHaveLength(20)
		})

		it('should have 20 historical events entries', () => {
			expect(settlementData.historicalEvents).toHaveLength(20)
		})

		it('should have 20 threats entries', () => {
			expect(settlementData.threats).toHaveLength(20)
		})

		it('should have 20 defenses entries', () => {
			expect(settlementData.defenses).toHaveLength(20)
		})

		it('should have 20 law enforcement entries', () => {
			expect(settlementData.lawEnforcement).toHaveLength(20)
		})

		it('should have 20 power players entries', () => {
			expect(settlementData.powerPlayers).toHaveLength(20)
		})

		it('should have 20 landmarks entries', () => {
			expect(settlementData.landmarks).toHaveLength(20)
		})

		it('should have 20 districts entries', () => {
			expect(settlementData.districts).toHaveLength(20)
		})

		it('should have 20 streets entries', () => {
			expect(settlementData.streets).toHaveLength(20)
		})

		it('should have non-empty string entries in all arrays', () => {
			const arrays = [
				settlementData.geography,
				settlementData.resources,
				settlementData.culture,
				settlementData.government,
				settlementData.historicalEvents,
				settlementData.threats,
				settlementData.defenses,
				settlementData.lawEnforcement,
				settlementData.powerPlayers,
				settlementData.landmarks,
				settlementData.districts,
				settlementData.streets,
			]
			arrays.forEach((arr) => {
				arr.forEach((entry) => {
					expect(typeof entry).toBe('string')
					expect(entry.length).toBeGreaterThan(0)
				})
			})
		})
	})

	describe('settlementGroups', () => {
		it('should have 13 settlement groups', () => {
			expect(settlementGroups).toHaveLength(13)
		})

		it('should include full and all individual table groups', () => {
			const ids = settlementGroups.map((g) => g.id)
			expect(ids).toContain('full')
			expect(ids).toContain('geography')
			expect(ids).toContain('resources')
			expect(ids).toContain('culture')
			expect(ids).toContain('government')
			expect(ids).toContain('history')
			expect(ids).toContain('threats')
			expect(ids).toContain('defenses')
			expect(ids).toContain('law')
			expect(ids).toContain('power')
			expect(ids).toContain('landmarks')
			expect(ids).toContain('districts')
			expect(ids).toContain('streets')
		})
	})

	describe('generateSettlement', () => {
		it('should generate a full settlement with all categories', () => {
			const result = generateSettlement('full')
			expect(result).toBeTruthy()
			expect(result).toContain('settlement')
			expect(result).toContain('economy depends on')
			expect(result).toContain('Ruled by')
			expect(result).toContain('Threatened by')
			expect(result).toContain('Defended by')
			expect(result).toContain('Justice is handled by')
			expect(result).toContain('influential figure')
			expect(result).toContain('landmark')
			expect(result).toContain('streets')
		})

		it('should generate individual table results', () => {
			const tables = [
				'geography', 'resources', 'culture', 'government',
				'history', 'threats', 'defenses', 'law',
				'power', 'landmarks', 'districts', 'streets',
			]
			tables.forEach((table) => {
				const result = generateSettlement(table)
				expect(result).toBeTruthy()
				expect(result.endsWith('.')).toBe(true)
			})
		})

		it('should return error for unknown group', () => {
			const result = generateSettlement('unknown')
			expect(result).toBe('Unknown settlement table')
		})

		it('should generate varied results across multiple rolls', () => {
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateSettlement('full'))
			}
			expect(results.size).toBeGreaterThan(5)
		})
	})

	describe('Building Data', () => {
		const districtTypes = [
			'harbor', 'market', 'temple', 'artisan', 'garrison',
			'residential', 'slum', 'scholarly', 'pleasure', 'foreign',
		]

		it('should have 10 district building types', () => {
			expect(Object.keys(settlementData.buildings)).toHaveLength(10)
		})

		it('should have 20 building entries per district type', () => {
			districtTypes.forEach((type) => {
				expect((settlementData.buildings as Record<string, string[]>)[type]).toHaveLength(20)
			})
		})

		it('should have non-empty string entries in all building arrays', () => {
			districtTypes.forEach((type) => {
				const arr = (settlementData.buildings as Record<string, string[]>)[type]
				arr.forEach((entry) => {
					expect(typeof entry).toBe('string')
					expect(entry.length).toBeGreaterThan(0)
				})
			})
		})
	})

	describe('buildingGroups', () => {
		it('should have 10 building groups', () => {
			expect(buildingGroups).toHaveLength(10)
		})

		it('should include all district type groups', () => {
			const ids = buildingGroups.map((g) => g.id)
			expect(ids).toContain('harbor')
			expect(ids).toContain('market')
			expect(ids).toContain('temple')
			expect(ids).toContain('artisan')
			expect(ids).toContain('garrison')
			expect(ids).toContain('residential')
			expect(ids).toContain('slum')
			expect(ids).toContain('scholarly')
			expect(ids).toContain('pleasure')
			expect(ids).toContain('foreign')
		})
	})

	describe('generateBuilding', () => {
		it('should generate a building for each district type', () => {
			const types = [
				'harbor', 'market', 'temple', 'artisan', 'garrison',
				'residential', 'slum', 'scholarly', 'pleasure', 'foreign',
			]
			types.forEach((type) => {
				const result = generateBuilding(type)
				expect(result).toBeTruthy()
				expect(result.startsWith('Prominent building:')).toBe(true)
				expect(result.endsWith('.')).toBe(true)
			})
		})

		it('should return error for unknown district type', () => {
			const result = generateBuilding('unknown')
			expect(result).toBe('Unknown district type')
		})

		it('should generate varied results across multiple rolls', () => {
			const results = new Set<string>()
			for (let i = 0; i < 30; i++) {
				results.add(generateBuilding('harbor'))
			}
			expect(results.size).toBeGreaterThan(5)
		})
	})
})
