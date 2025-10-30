import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

describe('Wild Magic Table', () => {
  const wildMagicTablePath = path.join(__dirname, '../../docs/07-magic/06-wild-magic-table.md')
  const content = fs.readFileSync(wildMagicTablePath, 'utf-8')

  describe('Structure Validation', () => {
    it('should exist as a file', () => {
      expect(fs.existsSync(wildMagicTablePath)).toBe(true)
    })

    it('should contain frontmatter with sidebar_position', () => {
      expect(content).toMatch(/---\s*sidebar_position:\s*6\s*---/)
    })

    it('should have main title', () => {
      expect(content).toContain('# 🎲 Wild Magic Table')
    })

    it('should specify rank 1 or higher requirement', () => {
      expect(content).toContain('rank 1 or higher')
    })

    it('should be formatted as a markdown table', () => {
      expect(content).toMatch(/\|\s*d100\s*\|\s*Effect\s*\|/)
      expect(content).toMatch(/\|---+\|---+\|/)
    })

    it('should contain random location clarification', () => {
      expect(content).toContain('Random Locations:')
      expect(content).toMatch(/GM chooses.*unoccupied spaces/i)
    })
  })

  describe('Table Entries', () => {
    it('should have all 100 numbered entries in table format', () => {
      // Count table rows starting with | number |
      const entryPattern = /^\|\s*\d+\s*\|/gm
      const matches = content.match(entryPattern)
      
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
      expect(content).toMatch(/fire|frost|lightning|acid|necrotic|radiant|psychic/i)
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
      for (let i = 1; i <= 100; i++) {
        const pattern = new RegExp(`^\\|\\s*${i}\\s*\\|`, 'm')
        expect(content).toMatch(pattern)
      }
    })

    it('should be reasonably concise', () => {
      // Table format might be slightly longer but still reasonable
      expect(content.length).toBeLessThan(25000)
    })
  })

  describe('Anti-recursion safeguards', () => {
    it('should prevent cascading in Wild Zone', () => {
      expect(content).toMatch(/74.*Wild Zone.*doesn't cascade/s)
    })

    it('should prevent cascading in Reality Ripple', () => {
      expect(content).toMatch(/100.*Reality Ripple.*don't trigger further cascades/s)
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
})
