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

    it('should contain targeting rules', () => {
      expect(content).toContain('**Targeting:**')
      expect(content).toContain('nearest')
    })

    it('should contain scaling explanation', () => {
      expect(content).toContain('**Scaling:**')
      expect(content).toContain('1/2/3/4/5')
    })
  })

  describe('Table Entries', () => {
    it('should have all 100 numbered entries', () => {
      const entryPattern = /^\d+\.\s+\*\*/gm
      const matches = content.match(entryPattern)
      
      expect(matches).not.toBeNull()
      if (matches) {
        expect(matches.length).toBe(100)
      }
    })

    it('should have entries in correct format', () => {
      // Check a few sample entries
      expect(content).toMatch(/1\.\s+\*\*Chromatic Explosion\.\*\*/)
      expect(content).toMatch(/50\.\s+\*\*Psychic Scream\.\*\*/)
      expect(content).toMatch(/100\.\s+\*\*Reality Ripple\.\*\*/)
    })

    it('should have inline scaling in entries', () => {
      // Check that entries have rank-based scaling inline
      expect(content).toMatch(/4\/6\/8\/10\/12/)
      expect(content).toMatch(/close\/short\/short\/medium\/medium/)
      expect(content).toMatch(/brief\/short\/short\/medium\/medium/)
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
        const pattern = new RegExp(`^${i}\\.\\s+\\*\\*`, 'm')
        expect(content).toMatch(pattern)
      }
    })

    it('should be concise (under 20k characters)', () => {
      // Verify the file is much shorter than the original verbose version
      expect(content.length).toBeLessThan(20000)
    })
  })

  describe('Anti-recursion safeguards', () => {
    it('should prevent cascading in Wild Zone', () => {
      expect(content).toMatch(/74\.\s+\*\*Wild Zone\.\*\*.*doesn't cascade/s)
    })

    it('should prevent cascading in Reality Ripple', () => {
      expect(content).toMatch(/100\.\s+\*\*Reality Ripple\.\*\*.*don't trigger further cascades/s)
    })
  })

  describe('Consistency', () => {
    it('should have consistent entry format', () => {
      // All entries should follow pattern: "N. **Name.** Description..."
      const entries = content.match(/^\d+\.\s+\*\*[^*]+\.\*\*/gm)
      expect(entries).not.toBeNull()
      if (entries) {
        // Each entry should end with period before closing **
        entries.forEach(entry => {
          expect(entry).toMatch(/\.\*\*$/)
        })
      }
    })
  })
})
