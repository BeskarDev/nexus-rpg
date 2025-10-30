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

    it('should contain overview section', () => {
      expect(content).toContain('## Overview')
      expect(content).toContain('When you blunder an arcane spell roll')
      expect(content).toContain('roll 1d100')
    })

    it('should contain resolution procedure', () => {
      expect(content).toContain('### Resolution')
      expect(content).toContain('Roll 1d100')
      expect(content).toContain('Determine Effect Intensity')
      expect(content).toContain('Apply the Effect')
    })

    it('should contain targeting rules', () => {
      expect(content).toContain('### Targeting Rules')
      expect(content).toContain('Nearest by Distance')
      expect(content).toContain('Default to Caster')
    })

    it('should contain intensity scaling table', () => {
      expect(content).toContain('### Intensity Scaling by Spell Rank')
      expect(content).toContain('| **Rank** | **Intensity**')
      expect(content).toContain('| 0 | Light')
      expect(content).toContain('| 5 | Extreme')
    })
  })

  describe('Table Entries', () => {
    it('should have entries for 1-10 (Elemental Chaos)', () => {
      expect(content).toContain('### 1-10: Elemental Chaos')
      expect(content).toContain('**1. Chromatic Explosion')
      expect(content).toContain('**10. Pyroclasm')
    })

    it('should have entries for 11-20 (Force and Motion)', () => {
      expect(content).toContain('### 11-20: Force and Motion')
      expect(content).toContain('**11. Gravity Reversal')
      expect(content).toContain('**20. Telekinetic Slam')
    })

    it('should have entries for 21-30 (Teleportation)', () => {
      expect(content).toContain('### 21-30: Teleportation and Displacement')
      expect(content).toContain('**21. Random Teleport')
      expect(content).toContain('**30. Dimensional Door')
    })

    it('should have entries for 31-40 (Transformation)', () => {
      expect(content).toContain('### 31-40: Transformation and Polymorphing')
      expect(content).toContain('**31. Random Polymorph')
      expect(content).toContain('**40. Limb Multiplication')
    })

    it('should have entries for 41-50 (Mental)', () => {
      expect(content).toContain('### 41-50: Mental and Illusion Effects')
      expect(content).toContain('**41. Mind Swap')
      expect(content).toContain('**50. Psychic Scream')
    })

    it('should have entries for 51-60 (Summoning)', () => {
      expect(content).toContain('### 51-60: Summoning and Conjuration')
      expect(content).toContain('**51. Random Summon')
      expect(content).toContain('**60. Trap Conjuration')
    })

    it('should have entries for 61-70 (Environmental)', () => {
      expect(content).toContain('### 61-70: Environmental and Weather Effects')
      expect(content).toContain('**61. Earthquake')
      expect(content).toContain('**70. Lava Pool')
    })

    it('should have entries for 71-80 (Magical Disruption)', () => {
      expect(content).toContain('### 71-80: Magical Disruption and Alteration')
      expect(content).toContain('**71. Antimagic Pulse')
      expect(content).toContain('**80. Spell Echo')
    })

    it('should have entries for 81-90 (Healing)', () => {
      expect(content).toContain('### 81-90: Healing and Vitality Effects')
      expect(content).toContain('**81. Healing Burst')
      expect(content).toContain('**90. Revitalize')
    })

    it('should have entries for 91-100 (Time)', () => {
      expect(content).toContain('### 91-100: Time and Reality Warping')
      expect(content).toContain('**91. Time Hiccup')
      expect(content).toContain('**100. Reality Ripple')
    })
  })

  describe('Entry Format', () => {
    const exampleEntry = content.match(/\*\*1\. Chromatic Explosion\*\*[\s\S]*?(?=\*\*2\.)/)?.[0]

    it('should have numbered entries with names', () => {
      expect(content).toMatch(/\*\*1\. Chromatic Explosion\*\*/)
      expect(content).toMatch(/\*\*50\. Psychic Scream\*\*/)
      expect(content).toMatch(/\*\*100\. Reality Ripple\*\*/)
    })

    it('should have effect descriptions', () => {
      if (exampleEntry) {
        expect(exampleEntry).toContain('- **Effect**:')
      } else {
        throw new Error('Could not extract example entry from table')
      }
    })

    it('should have rank scaling', () => {
      if (exampleEntry) {
        expect(exampleEntry).toContain('- **By Rank**:')
      } else {
        throw new Error('Could not extract example entry from table')
      }
    })

    it('should reference spell ranks 0-5 in scaling', () => {
      // Check that rank scaling includes values for all 6 ranks (0-5)
      const rankScalingPattern = /By Rank.*?\d+\/\d+\/\d+\/\d+\/\d+\/\d+/s
      expect(content).toMatch(rankScalingPattern)
    })
  })

  describe('Talent Interaction Rules', () => {
    it('should contain talent interaction section', () => {
      expect(content).toContain('## Talent Interaction Rules')
      expect(content).toContain('### Default: No Direct Influence')
    })

    it('should contain optional influence guidelines', () => {
      expect(content).toContain('### Optional: Limited Influence')
      expect(content).toContain('rare, costly, and bounded')
    })

    it('should provide example talents', () => {
      expect(content).toContain('**Wild Luck**')
      expect(content).toContain('**Chaos Channeling**')
    })
  })

  describe('Deliberate Triggers', () => {
    it('should contain deliberate triggers section', () => {
      expect(content).toContain('## Deliberate Triggers and Random Downside Hooks')
    })

    it('should contain trigger patterns', () => {
      expect(content).toContain('### Trigger Patterns')
      expect(content).toContain('**Overchannel**')
      expect(content).toContain('**Unstable Focus**')
    })

    it('should contain implementation guidelines', () => {
      expect(content).toContain('### Implementation Guidelines')
      expect(content).toContain('opt-in')
    })

    it('should contain example optional talents', () => {
      expect(content).toContain('### Example Optional Talents')
      expect(content).toContain('Wild Surge')
    })
  })

  describe('Template and Extension', () => {
    it('should contain template section', () => {
      expect(content).toContain('## Template for New Entries')
      expect(content).toContain('[Number]. [Effect Name]')
    })

    it('should contain extension guidelines', () => {
      expect(content).toContain('### Extending the Table')
      expect(content).toContain('GMs can create custom entries')
    })

    it('should provide template example', () => {
      expect(content).toContain('**Example**:')
      expect(content).toContain('Gravity Storm')
    })
  })

  describe('Content Coverage', () => {
    it('should reference various conditions from the game', () => {
      // Check for mentions of game conditions
      expect(content).toMatch(/stunned|slowed|frightened|charmed|confused/i)
    })

    it('should reference damage types', () => {
      expect(content).toMatch(/fire|frost|lightning|acid|necrotic|radiant|psychic/i)
    })

    it('should reference distance categories', () => {
      expect(content).toMatch(/close|short|medium|long|very long|extreme/i)
    })

    it('should reference duration categories', () => {
      expect(content).toMatch(/briefly|short|medium|long/i)
    })
  })

  describe('Balance and Design', () => {
    it('should emphasize temporary effects', () => {
      expect(content).toContain('temporary')
      expect(content).toContain('Duration')
      expect(content).toMatch(/Non-Permanence|temporary|always temporary/i)
    })

    it('should have diverse target types', () => {
      expect(content).toContain('caster')
      expect(content).toMatch(/ally|allies/i)
      expect(content).toMatch(/enemy|enemies/i)
      expect(content).toMatch(/area|radius/i)
    })

    it('should scale with spell rank', () => {
      expect(content).toMatch(/rank 0|rank 1|rank 2|rank 3|rank 4|rank 5/i)
      expect(content).toContain('spell rank')
      expect(content).toContain('blundered spell')
    })
  })

  describe('Integration with Core Rules', () => {
    it('should reference the spell blunder mechanic', () => {
      expect(content).toContain('blunder')
      expect(content).toContain('1d100')
    })

    it('should mention Focus Cost', () => {
      expect(content).toContain('Focus Cost')
    })

    it('should integrate with existing spell system', () => {
      expect(content).toMatch(/arcane|spell|cast/i)
    })
  })

  describe('Complete Table Coverage', () => {
    it('should have exactly 100 numbered entries', () => {
      // Count all numbered entries from **1. to **100.
      const entryPattern = /\*\*(\d+)\.\s+[A-Z]/g
      const matches = content.match(entryPattern)
      
      expect(matches).not.toBeNull()
      if (matches) {
        const numbers = matches.map(m => {
          const num = m.match(/\d+/)
          return num ? parseInt(num[0]) : 0
        })
        
        // Check we have 100 entries
        expect(numbers.length).toBe(100)
        
        // Check they're numbered 1-100
        expect(Math.min(...numbers)).toBe(1)
        expect(Math.max(...numbers)).toBe(100)
        
        // Check all numbers are present
        for (let i = 1; i <= 100; i++) {
          expect(numbers).toContain(i)
        }
      }
    })

    it('should organize entries in groups of 10', () => {
      // Verify the category headers
      expect(content).toMatch(/### 1-10:/)
      expect(content).toMatch(/### 11-20:/)
      expect(content).toMatch(/### 21-30:/)
      expect(content).toMatch(/### 31-40:/)
      expect(content).toMatch(/### 41-50:/)
      expect(content).toMatch(/### 51-60:/)
      expect(content).toMatch(/### 61-70:/)
      expect(content).toMatch(/### 71-80:/)
      expect(content).toMatch(/### 81-90:/)
      expect(content).toMatch(/### 91-100:/)
    })
  })
})
