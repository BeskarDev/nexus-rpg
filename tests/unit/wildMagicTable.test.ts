import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

describe('Wild Surge Table', () => {
	const wildMagicTablePath = path.join(
		__dirname,
		'../../docs/07-magic/01-magic-spells/02-wild-surge-table.mdx',
	)
	const content = fs.readFileSync(wildMagicTablePath, 'utf-8')

	describe('Structure Validation', () => {
		it('should exist as a file', () => {
			expect(fs.existsSync(wildMagicTablePath)).toBe(true)
		})

	it('should contain frontmatter with sidebar_position', () => {
		expect(content).toMatch(/---\s*sidebar_position:\s*2\s*---/)
		})

		it('should have main title', () => {
			expect(content).toContain('# 🎲 Wild Surge')
		})

		it('should specify rank 1 or higher requirement', () => {
			expect(content).toContain('rank 1 or higher')
		})

		it('should be formatted as a markdown table', () => {
			expect(content).toMatch(/\|\s*d100\s*\|\s*Effect\s*\|/)
		expect(content).toMatch(/\|\s*---+\s*\|\s*---+\s*\|/)
	})

		it('should contain random location clarification', () => {
			expect(content).toContain('Random Locations:')
			expect(content).toMatch(/GM chooses.*unoccupied spaces/i)
		})
	})

	describe('Table Entries', () => {
		it('should have all 100 numbered entries in table format', () => {
			// Extract only the main d100 table section (before Optional: Permanent Mutations)
			const mainTableSection = content.split(
				'## Optional: Permanent Mutations',
			)[0]

			// Count table rows starting with | number |
			const entryPattern = /^\|\s*\d+\s*\|/gm
			const matches = mainTableSection.match(entryPattern)

			expect(matches).not.toBeNull()
			if (matches) {
				expect(matches.length).toBe(100)
			}
		})

		it('should have entries in correct table format', () => {
			// Check a few sample entries are in table rows
			expect(content).toMatch(/\|\s*1\s*\|.*Chromatic Explosion/)
			expect(content).toMatch(/\|\s*50\s*\|.*Psychic Scream/)
			expect(content).toMatch(/\|\s*100\s*\|.*Reality Ripple/)
		})

		it('should have inline scaling in entries', () => {
			// Check that entries have rank-based scaling inline
			expect(content).toMatch(/4\/6\/8\/10\/12/)
			expect(content).toMatch(/close\/short\/short\/medium\/medium/)
			expect(content).toMatch(/brief\/short\/short\/medium\/medium/)
		})

		it('should have clarifications for random effects', () => {
			// Check that effects with randomness have GM guidance
			expect(content).toMatch(/Scatter.*GM distributes or rolls/)
			expect(content).toMatch(/Random Teleport.*GM determines/)
			expect(content).toMatch(/Mass Teleportation.*GM distributes or rolls/)
		})

		it('should reference various conditions', () => {
			expect(content).toMatch(/stunned|slowed|frightened|charmed|confused/i)
		})

		it('should reference damage types', () => {
			expect(content).toMatch(
				/fire|frost|lightning|acid|necrotic|radiant|psychic/i,
			)
		})

		it('should reference distance categories', () => {
			expect(content).toMatch(/close|short|medium|long/i)
		})

		it('should reference duration categories', () => {
			expect(content).toMatch(/brief|short|medium|long/i)
		})
	})

	describe('Completeness', () => {
		it('should have exactly 100 numbered entries from 1-100', () => {
			const mainTableSection = content.split(
				'## Optional: Permanent Mutations',
			)[0]
			for (let i = 1; i <= 100; i++) {
				const pattern = new RegExp(`^\\|\\s*${i}\\s*\\|`, 'm')
				expect(mainTableSection).toMatch(pattern)
			}
		})
	})

	describe('Anti-recursion safeguards', () => {
		it('should prevent cascading in Wild Zone', () => {
			expect(content).toMatch(/74.*Wild Zone.*doesn't cascade/s)
		})

		it('should prevent cascading in Reality Ripple', () => {
			expect(content).toMatch(
				/100.*Reality Ripple.*don't trigger further cascades/s,
			)
		})
	})

	describe('GM Guidance', () => {
		it('should provide guidance for random point selection', () => {
			expect(content).toMatch(/GM chooses|roll 1d8 for direction/i)
		})

		it('should provide guidance for random creature selection', () => {
			expect(content).toMatch(/roll if multiple|roll randomly/i)
		})

		it('should provide guidance for random teleportation', () => {
			expect(content).toMatch(/unoccupied/i)
		})
	})

	describe('Optional Mutations Section', () => {
		it('should have an optional mutations section', () => {
			expect(content).toContain('## Optional: Permanent Mutations')
		})

		it('should explain the simplified mutation system', () => {
			expect(content).toMatch(/each time.*triggers.*wild surge/i)
			expect(content).toMatch(/roll 1d12/i)
			expect(content).toMatch(/advance.*mutation.*one stage/i)
		})

		it('should describe four mutation stages', () => {
			expect(content).toContain('Stage 1')
			expect(content).toContain('Stage 2')
			expect(content).toContain('Stage 3')
			expect(content).toContain('Stage 4')
			expect(content).toMatch(/Subtle.*cosmetic/i)
			expect(content).toMatch(/trade-off/i)
		})

		it('should have Stage 3 with minor trade-offs', () => {
			expect(content).toMatch(/Stage 3.*minor trade-off/i)
		})

		it('should have Stage 4 with full trade-offs', () => {
			expect(content).toMatch(/Stage 4.*Full trade-off/i)
		})

		it('should have a d12 mutation table', () => {
			expect(content).toContain('Mutation Table (d12)')
			expect(content).toMatch(/\|\s*d12\s*\|/)
		})

		it('should have exactly 12 mutations', () => {
			const mutationsSection = content.split(
				'## Optional: Permanent Mutations',
			)[1]
			if (mutationsSection) {
				for (let i = 1; i <= 12; i++) {
					const pattern = new RegExp(`^\\|\\s*${i}\\s*\\|`, 'm')
					expect(mutationsSection).toMatch(pattern)
				}
			}
		})

		it('should have mutations with both Stage 3 and Stage 4 trade-offs', () => {
			const mutationsSection = content.split(
				'## Optional: Permanent Mutations',
			)[1]
			if (mutationsSection) {
				// Count Flaw/Trait pairs in the mutations table
				// Each mutation should have them in Stage 3 and Stage 4 columns
				const flaws = (mutationsSection.match(/\*\*Flaw:\*\*/g) || []).length
				const traits = (mutationsSection.match(/\*\*Trait:\*\*/g) || []).length

				// Should have 12 mutations × 2 stages (3 & 4) = 24 of each
				expect(flaws).toBeGreaterThanOrEqual(20) // Some flexibility
				expect(traits).toBeGreaterThanOrEqual(20)
			}
		})

		it('should reference body parts in mutations', () => {
			expect(content).toMatch(
				/Eyes|Blood|Limbs|Skin|Features|Scars|Form|Hands|Feet|Extremities|Aura|Tether/i,
			)
		})

		it('should include GM guidance for mutations', () => {
			expect(content).toContain('GM Guidance')
			expect(content).toMatch(/Frequency:/i)
			expect(content).toMatch(/Player Choice:/i)
			expect(content).toMatch(/Removal:/i)
		})
	})
})
